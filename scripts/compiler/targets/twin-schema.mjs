/**
 * Compilation Target: Digital Twin Schema
 *
 * Generates digital twin integration artifacts:
 * - Sensor bindings (space → sensors) derived from environmentalConditions & requirements
 * - BMS integration mappings
 * - Runtime requirement evaluation rules
 * - IoT device registry
 */

/**
 * Requirement metric → sensor type mapping
 */
const METRIC_TO_SENSOR = {
  'operative_temperature': 'temperature',
  'temperature': 'temperature',
  'relative_humidity': 'humidity',
  'co2_level': 'co2',
  'co2_concentration': 'co2',
  'illuminance': 'illuminance',
  'daylight_factor': 'illuminance',
  'air_change_rate': 'co2',
  'fresh_air_rate_per_person': 'co2'
};

/**
 * Default thresholds used when entity data provides no values
 */
const DEFAULT_THRESHOLDS = {
  temperature: { min: 18, max: 26, optimal: { min: 20, max: 24 } },
  humidity: { min: 30, max: 60, optimal: { min: 40, max: 50 } },
  co2: { min: 400, max: 1000, optimal: { min: 400, max: 800 } },
  illuminance: { min: 200, max: 1000, optimal: { min: 300, max: 500 } },
  differential_pressure: { min: -50, max: 50 },
  particle_count: { min: 0, max: 3520 }
};

/**
 * Default sampling intervals in seconds
 */
const SAMPLING_INTERVALS = {
  temperature: 300,
  humidity: 300,
  co2: 300,
  illuminance: 600,
  occupancy: 60,
  motion: 5,
  differential_pressure: 60,
  particle_count: 300
};

/**
 * Space types considered storage/technical (no occupancy sensor)
 */
const NON_OCCUPIED_TYPES = new Set([
  'storage', 'technical', 'mechanical_room', 'electrical_room',
  'generator_room', 'water_treatment', 'waste_management', 'server_room'
]);

/**
 * Space types that benefit from motion detection
 */
const MOTION_TYPES = new Set([
  'corridor', 'staircase', 'entrance', 'loading_dock', 'parking'
]);

/**
 * Generate sensor bindings for spaces
 */
function generateSpaceSensorBindings(spaces, requirementMap, logger) {
  const bindings = [];

  for (const space of spaces) {
    const spaceBinding = {
      entityId: space.id,
      entityType: 'space',
      entityName: space.spaceName,
      spaceType: space.spaceType || null,

      // Location context
      buildingId: space.buildingId,
      levelId: space.levelId,
      zoneIds: space.zoneIds || [],

      // Sensor specifications
      sensors: []
    };

    const requiredSensors = determineSensorsForSpace(space, requirementMap);
    spaceBinding.sensors = requiredSensors;

    bindings.push(spaceBinding);
  }

  logger.debug(`Generated sensor bindings for ${bindings.length} spaces`);
  return bindings;
}

/**
 * Create a sensor object
 */
function makeSensor(type, space, thresholds, dataSource) {
  const bacnetType = ['occupancy', 'motion'].includes(type) ? 'BI' : 'AI';
  const unit = {
    temperature: 'C', humidity: '%', co2: 'ppm', illuminance: 'lux',
    occupancy: 'boolean', motion: 'boolean', differential_pressure: 'Pa',
    particle_count: 'particles/m3'
  }[type] || '';
  const measurementType = {
    temperature: 'air_temperature', humidity: 'relative_humidity',
    co2: 'carbon_dioxide', illuminance: 'illuminance',
    occupancy: 'presence', motion: 'motion_detected',
    differential_pressure: 'pressure_differential',
    particle_count: 'airborne_particles'
  }[type] || type;

  const sensor = {
    sensorType: type,
    sensorId: `${type.toUpperCase().replace('_', '-')}-${space.id}`,
    location: space.spaceName,
    measurementType,
    unit,
    samplingInterval: SAMPLING_INTERVALS[type] || 300,
    protocol: 'BACnet',
    dataPoint: `${bacnetType}-${space.id}-${type.toUpperCase().replace('_', '-')}`,
    dataSource: dataSource || 'default'
  };

  if (thresholds) {
    sensor.thresholds = thresholds;
  }

  return sensor;
}

/**
 * Determine required sensors for a space — data-driven
 *
 * Sources (in priority order):
 * 1. space.environmentalConditions — each present sub-field implies a sensor
 * 2. space.requirements — look up each requirement; if metric maps to sensor, add it
 * 3. Fallback — non-storage spaces get occupancy sensor
 */
function determineSensorsForSpace(space, requirementMap) {
  const sensors = [];
  const addedTypes = new Set();

  function addSensor(type, thresholds, dataSource) {
    if (addedTypes.has(type)) return;
    addedTypes.add(type);
    sensors.push(makeSensor(type, space, thresholds, dataSource));
  }

  // Source 1: environmentalConditions
  const env = space.environmentalConditions;
  if (env) {
    // Temperature
    if (env.temperatureRange) {
      const tr = env.temperatureRange;
      addSensor('temperature', {
        min: tr.min, max: tr.max,
        optimal: { min: tr.min, max: tr.max }
      }, 'environmentalConditions');
    }

    // Humidity
    if (env.humidityRange) {
      const hr = env.humidityRange;
      addSensor('humidity', {
        min: hr.min, max: hr.max,
        optimal: { min: hr.min, max: hr.max }
      }, 'environmentalConditions');
    }

    // Air quality (ACH or ventilation implies CO2 monitoring)
    if (env.airChangesPerHour || env.ventilationRate) {
      addSensor('co2', DEFAULT_THRESHOLDS.co2, 'environmentalConditions');
    }

    // Differential pressure
    if (env.pressurization && env.pressurization !== 'neutral') {
      const dpThresholds = env.pressureDifferentialPa
        ? { target: env.pressureDifferentialPa, tolerance: 2, unit: 'Pa' }
        : DEFAULT_THRESHOLDS.differential_pressure;
      addSensor('differential_pressure', dpThresholds, 'environmentalConditions');
    }

    // Particle count (cleanroom/filtration)
    if (env.filtrationClass || env.cleanlinessClass) {
      addSensor('particle_count', DEFAULT_THRESHOLDS.particle_count, 'environmentalConditions');
    }
  }

  // Source 2: requirements
  if (space.requirements && requirementMap) {
    for (const reqId of space.requirements) {
      const req = requirementMap.get(reqId);
      if (!req || !req.metric) continue;

      const sensorType = METRIC_TO_SENSOR[req.metric];
      if (!sensorType) continue;

      // Build thresholds from requirement value/operator
      let thresholds = DEFAULT_THRESHOLDS[sensorType] || null;
      if (req.value != null && req.operator) {
        if (req.operator === 'in_range' && typeof req.value === 'object') {
          thresholds = { min: req.value.min, max: req.value.max, optimal: req.value };
        } else if (req.operator === '>=' || req.operator === '>') {
          thresholds = { ...thresholds, min: req.value };
        } else if (req.operator === '<=' || req.operator === '<') {
          thresholds = { ...thresholds, max: req.value };
        }
      }

      addSensor(sensorType, thresholds, 'requirement');
    }
  }

  // Occupancy sensor for occupied spaces (unless storage/technical)
  const st = space.spaceType || '';
  if (!NON_OCCUPIED_TYPES.has(st)) {
    addSensor('occupancy', null, env ? 'default' : 'none');
  }

  // Motion sensor for circulation spaces
  if (MOTION_TYPES.has(st)) {
    addSensor('motion', null, 'spaceType');
  }

  return sensors;
}

/**
 * Generate BMS integration mappings
 */
function generateBMSIntegration(sbm, spaceSensorBindings, logger) {
  const integration = {
    controllerType: 'BACnet',
    networkConfiguration: {
      networkNumber: 1,
      deviceInstanceRangeStart: 1000,
      deviceInstanceRangeEnd: 9999
    },

    deviceRegistry: [],
    pointMapping: []
  };

  // Create device entries for sensor groups
  let deviceInstance = 1000;
  const spacesPerController = 10;

  for (let i = 0; i < spaceSensorBindings.length; i += spacesPerController) {
    const controllerSpaces = spaceSensorBindings.slice(i, i + spacesPerController);

    integration.deviceRegistry.push({
      deviceType: 'room_controller',
      deviceInstance: deviceInstance++,
      deviceName: `RC-${Math.floor(i / spacesPerController) + 1}`,
      spaces: controllerSpaces.map(s => s.entityId),
      ipAddress: null,
      ipNote: 'Assigned during BMS commissioning',
      protocol: 'BACnet/IP',
      status: 'planned'
    });
  }

  // Create point mappings for all sensors
  for (const spaceBinding of spaceSensorBindings) {
    for (const sensor of spaceBinding.sensors) {
      integration.pointMapping.push({
        pointId: sensor.dataPoint,
        sensorId: sensor.sensorId,
        spaceId: spaceBinding.entityId,
        spaceName: spaceBinding.entityName,
        objectType: getBACnetObjectType(sensor.sensorType),
        objectInstance: null,
        description: `${sensor.measurementType} in ${spaceBinding.entityName}`,
        unit: sensor.unit,
        samplingInterval: sensor.samplingInterval
      });
    }
  }

  logger.debug(`Generated BMS integration: ${integration.deviceRegistry.length} devices, ${integration.pointMapping.length} points`);
  return integration;
}

/**
 * Get BACnet object type for sensor type
 */
function getBACnetObjectType(sensorType) {
  const mapping = {
    'temperature': 'analog-input',
    'humidity': 'analog-input',
    'co2': 'analog-input',
    'illuminance': 'analog-input',
    'differential_pressure': 'analog-input',
    'particle_count': 'analog-input',
    'occupancy': 'binary-input',
    'motion': 'binary-input'
  };
  return mapping[sensorType] || 'analog-input';
}

/**
 * Generate runtime requirement evaluation rules
 */
function generateRequirementEvaluationRules(sbm, spaceSensorBindings, logger) {
  const rules = [];
  const requirements = sbm.entities.requirements || [];
  const spaces = sbm.entities.spaces || [];

  for (const space of spaces) {
    if (!space.requirements || space.requirements.length === 0) {
      continue;
    }

    const spaceBinding = spaceSensorBindings.find(b => b.entityId === space.id);
    if (!spaceBinding) {
      continue;
    }

    for (const reqId of space.requirements) {
      const requirement = requirements.find(r => r.id === reqId);
      if (!requirement) {
        continue;
      }

      const rule = generateEvaluationRule(requirement, space, spaceBinding);
      if (rule) {
        rules.push(rule);
      }
    }
  }

  logger.debug(`Generated ${rules.length} runtime evaluation rules`);
  return rules;
}

/**
 * Generate evaluation rule for a requirement
 */
function generateEvaluationRule(requirement, space, spaceBinding) {
  const sensorType = METRIC_TO_SENSOR[requirement.metric];
  if (!sensorType) {
    return null;
  }

  const sensor = spaceBinding.sensors.find(s => s.sensorType === sensorType);
  if (!sensor) {
    return null;
  }

  return {
    ruleId: `RULE-${requirement.id}-${space.id}`,
    requirementId: requirement.id,
    requirementName: requirement.requirementName,
    spaceId: space.id,
    spaceName: space.spaceName,

    evaluation: {
      sensorId: sensor.sensorId,
      dataPoint: sensor.dataPoint,
      metric: requirement.metric,
      operator: requirement.operator,
      targetValue: requirement.value,
      unit: requirement.unit,
      tolerance: requirement.tolerance || 0
    },

    actions: {
      onCompliance: 'log',
      onViolation: 'alert',
      alertRecipients: ['bms_operator', 'fm_manager'],
      alertSeverity: requirement.requirementType === 'safety' ? 'high' : 'medium'
    },

    evaluationSchedule: {
      frequency: 'continuous',
      samplingInterval: sensor.samplingInterval,
      aggregation: 'average',
      aggregationWindow: 3600
    }
  };
}

/**
 * Generate IoT device registry
 */
function generateIoTDeviceRegistry(spaceSensorBindings, bmsIntegration, logger) {
  const devices = [];

  const allSensors = spaceSensorBindings.flatMap(binding =>
    binding.sensors.map(sensor => ({
      ...sensor,
      spaceId: binding.entityId,
      spaceName: binding.entityName
    }))
  );

  for (const sensor of allSensors) {
    devices.push({
      deviceId: sensor.sensorId,
      deviceType: sensor.sensorType,
      manufacturer: 'TBD',
      model: 'TBD',
      firmwareVersion: '',

      location: {
        spaceId: sensor.spaceId,
        spaceName: sensor.spaceName,
        installationNotes: `Mount at standard height for ${sensor.sensorType} sensors`
      },

      connectivity: {
        protocol: sensor.protocol,
        dataPoint: sensor.dataPoint,
        ipAddress: '',
        networkSegment: 'BMS-VLAN'
      },

      configuration: {
        samplingInterval: sensor.samplingInterval,
        unit: sensor.unit,
        thresholds: sensor.thresholds || {}
      },

      dataSource: sensor.dataSource || 'default',
      status: 'planned',
      installationDate: null,
      commissioningDate: null,
      lastMaintenanceDate: null,
      nextMaintenanceDate: null
    });
  }

  logger.debug(`Generated IoT device registry with ${devices.length} devices`);
  return devices;
}

/**
 * Main digital twin schema generator
 *
 * @param {object} sbm - Semantic Building Model
 * @param {object} logger - Logger instance
 * @returns {object} - Digital twin schema
 */
export function generateDigitalTwinSchema(sbm, logger) {
  logger.debug('Generating digital twin schema...');

  const spaces = sbm.entities.spaces || [];

  if (spaces.length === 0) {
    logger.debug('No spaces found - generating placeholder twin schema');
    return {
      version: "0.2",
      generatedAt: new Date().toISOString(),
      projectId: sbm.project.id,
      projectName: sbm.project.name,
      status: 'no_spaces',
      message: 'No spaces found in semantic model. Digital twin schema will be populated when spaces are defined.',
      placeholderData: true
    };
  }

  // Build requirement lookup map for sensor derivation
  const requirements = sbm.entities.requirements || [];
  const requirementMap = new Map(requirements.map(r => [r.id, r]));

  const spaceSensorBindings = generateSpaceSensorBindings(spaces, requirementMap, logger);
  const bmsIntegration = generateBMSIntegration(sbm, spaceSensorBindings, logger);
  const evaluationRules = generateRequirementEvaluationRules(sbm, spaceSensorBindings, logger);
  const iotDeviceRegistry = generateIoTDeviceRegistry(spaceSensorBindings, bmsIntegration, logger);

  const totalSensors = spaceSensorBindings.reduce((sum, b) => sum + b.sensors.length, 0);

  // Count sensors by type dynamically
  const sensorsByType = {};
  for (const d of iotDeviceRegistry) {
    sensorsByType[d.deviceType] = (sensorsByType[d.deviceType] || 0) + 1;
  }

  const twinSchema = {
    version: "0.2",
    generatedAt: new Date().toISOString(),
    projectId: sbm.project.id,
    projectName: sbm.project.name,

    summary: {
      totalSpaces: spaces.length,
      totalSensors: totalSensors,
      sensorsByType,
      evaluationRules: evaluationRules.length,
      bmsDevices: bmsIntegration.deviceRegistry.length
    },

    spaceSensorBindings,
    bmsIntegration,
    evaluationRules,
    iotDeviceRegistry,

    runtimeArchitecture: {
      dataFlow: [
        "1. IoT sensors measure environmental conditions (temperature, humidity, CO2, etc.)",
        "2. BMS controllers collect sensor data via BACnet protocol",
        "3. Data aggregation and storage in time-series database",
        "4. Runtime evaluation engine applies requirement rules",
        "5. Violations trigger alerts to FM operators",
        "6. Dashboard visualizes real-time compliance status"
      ],
      components: [
        {
          component: 'BACnet Gateway',
          purpose: 'Protocol translation and data collection',
          technology: 'BACnet/IP to MQTT bridge'
        },
        {
          component: 'Time-Series Database',
          purpose: 'Historical sensor data storage',
          technology: 'InfluxDB or TimescaleDB'
        },
        {
          component: 'Rule Engine',
          purpose: 'Runtime requirement evaluation',
          technology: 'Node-RED or custom service'
        },
        {
          component: 'Dashboard',
          purpose: 'Real-time monitoring and alerts',
          technology: 'Grafana or custom web app'
        }
      ]
    },

    deploymentGuide: {
      phase1_installation: [
        "Install IoT sensors per device registry specifications",
        "Configure BMS controllers and assign BACnet device instances",
        "Establish network connectivity (BMS VLAN)"
      ],
      phase2_commissioning: [
        "Verify sensor readings and calibrate if needed",
        "Test BACnet communication and point mapping",
        "Load requirement evaluation rules into runtime engine"
      ],
      phase3_operation: [
        "Monitor real-time compliance dashboard",
        "Respond to requirement violation alerts",
        "Analyze historical trends for optimization"
      ]
    }
  };

  logger.debug('✓ Digital twin schema complete');
  return twinSchema;
}
