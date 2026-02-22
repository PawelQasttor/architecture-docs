/**
 * Compilation Target: Digital Twin Schema
 *
 * Generates digital twin integration artifacts:
 * - Sensor bindings (space → sensors)
 * - BMS integration mappings
 * - Runtime requirement evaluation rules
 * - IoT device registry
 */

/**
 * Generate sensor bindings for spaces
 */
function generateSpaceSensorBindings(spaces, logger) {
  const bindings = [];

  for (const space of spaces) {
    const spaceBinding = {
      entityId: space.id,
      entityType: 'space',
      entityName: space.spaceName,
      spaceType: space.spaceType,

      // Location context
      buildingId: space.buildingId,
      levelId: space.levelId,
      zoneIds: space.zoneIds || [],

      // Sensor specifications
      sensors: []
    };

    // Determine required sensors based on space type and requirements
    const requiredSensors = determineSensorsForSpace(space);
    spaceBinding.sensors = requiredSensors;

    bindings.push(spaceBinding);
  }

  logger.debug(`Generated sensor bindings for ${bindings.length} spaces`);
  return bindings;
}

/**
 * Determine required sensors for a space
 */
function determineSensorsForSpace(space) {
  const sensors = [];

  // Temperature sensor (all occupied spaces)
  if (['sleeping_space', 'bedroom', 'living_space', 'living_room', 'office', 'classroom'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'temperature',
      sensorId: `TEMP-${space.id}`,
      location: space.spaceName,
      measurementType: 'air_temperature',
      unit: 'C',
      samplingInterval: 300, // 5 minutes
      thresholds: {
        min: 18,
        max: 26,
        optimal: { min: 20, max: 24 }
      },
      protocol: 'BACnet',
      dataPoint: `AI-${space.id}-TEMP`
    });
  }

  // Humidity sensor (bedrooms, bathrooms)
  if (['sleeping_space', 'bedroom', 'bathroom', 'wet_room'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'humidity',
      sensorId: `HUM-${space.id}`,
      location: space.spaceName,
      measurementType: 'relative_humidity',
      unit: '%',
      samplingInterval: 300,
      thresholds: {
        min: 30,
        max: 60,
        optimal: { min: 40, max: 50 }
      },
      protocol: 'BACnet',
      dataPoint: `AI-${space.id}-HUM`
    });
  }

  // CO2 sensor (occupied spaces)
  if (['sleeping_space', 'bedroom', 'living_space', 'office', 'classroom', 'meeting_room'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'co2',
      sensorId: `CO2-${space.id}`,
      location: space.spaceName,
      measurementType: 'carbon_dioxide',
      unit: 'ppm',
      samplingInterval: 300,
      thresholds: {
        min: 400,
        max: 1000,
        optimal: { min: 400, max: 800 }
      },
      protocol: 'BACnet',
      dataPoint: `AI-${space.id}-CO2`
    });
  }

  // Occupancy sensor (all spaces except technical/storage)
  if (!['storage', 'technical'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'occupancy',
      sensorId: `OCC-${space.id}`,
      location: space.spaceName,
      measurementType: 'presence',
      unit: 'boolean',
      samplingInterval: 60, // 1 minute
      protocol: 'BACnet',
      dataPoint: `BI-${space.id}-OCC`
    });
  }

  // Motion sensor (corridors, staircases for safety)
  if (['corridor', 'staircase', 'entrance'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'motion',
      sensorId: `MOT-${space.id}`,
      location: space.spaceName,
      measurementType: 'motion_detected',
      unit: 'boolean',
      samplingInterval: 5, // 5 seconds
      protocol: 'BACnet',
      dataPoint: `BI-${space.id}-MOT`
    });
  }

  // Light level sensor (spaces with daylight requirements)
  if (['sleeping_space', 'bedroom', 'living_space', 'office', 'classroom'].includes(space.spaceType)) {
    sensors.push({
      sensorType: 'illuminance',
      sensorId: `LUX-${space.id}`,
      location: space.spaceName,
      measurementType: 'illuminance',
      unit: 'lux',
      samplingInterval: 600, // 10 minutes
      thresholds: {
        min: 200,
        max: 1000,
        optimal: { min: 300, max: 500 }
      },
      protocol: 'BACnet',
      dataPoint: `AI-${space.id}-LUX`
    });
  }

  return sensors;
}

/**
 * Generate BMS integration mappings
 */
function generateBMSIntegration(sbm, spaceSensorBindings, logger) {
  const systems = sbm.entities.systems || [];

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
  const spacesPerController = 10; // Group spaces into controllers

  for (let i = 0; i < spaceSensorBindings.length; i += spacesPerController) {
    const controllerSpaces = spaceSensorBindings.slice(i, i + spacesPerController);

    integration.deviceRegistry.push({
      deviceType: 'room_controller',
      deviceInstance: deviceInstance++,
      deviceName: `RC-${Math.floor(i / spacesPerController) + 1}`,
      spaces: controllerSpaces.map(s => s.entityId),
      ipAddress: `192.168.1.${100 + Math.floor(i / spacesPerController)}`,
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
        objectInstance: null, // To be assigned during commissioning
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

    // Find sensor bindings for this space
    const spaceBinding = spaceSensorBindings.find(b => b.entityId === space.id);
    if (!spaceBinding) {
      continue;
    }

    for (const reqId of space.requirements) {
      const requirement = requirements.find(r => r.id === reqId);

      // Skip if requirement not found (may be in jurisdiction pack)
      if (!requirement) {
        continue;
      }

      // Generate evaluation rule if requirement is measurable via sensors
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
  // Map requirement metrics to sensor types
  const metricToSensor = {
    'temperature': 'temperature',
    'relative_humidity': 'humidity',
    'co2_level': 'co2',
    'illuminance': 'illuminance'
  };

  const sensorType = metricToSensor[requirement.metric];
  if (!sensorType) {
    return null; // Cannot evaluate via sensors
  }

  // Find matching sensor
  const sensor = spaceBinding.sensors.find(s => s.sensorType === sensorType);
  if (!sensor) {
    return null; // No sensor available
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
      aggregation: 'average', // average, min, max, current
      aggregationWindow: 3600 // 1 hour
    }
  };
}

/**
 * Generate IoT device registry
 */
function generateIoTDeviceRegistry(spaceSensorBindings, bmsIntegration, logger) {
  const devices = [];

  // Extract all unique sensors
  const allSensors = spaceSensorBindings.flatMap(binding =>
    binding.sensors.map(sensor => ({
      ...sensor,
      spaceId: binding.entityId,
      spaceName: binding.entityName
    }))
  );

  // Group sensors by type and create device entries
  for (const sensor of allSensors) {
    devices.push({
      deviceId: sensor.sensorId,
      deviceType: sensor.sensorType,
      manufacturer: 'TBD', // To be specified during procurement
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
        ipAddress: '', // To be assigned during installation
        networkSegment: 'BMS-VLAN'
      },

      configuration: {
        samplingInterval: sensor.samplingInterval,
        unit: sensor.unit,
        thresholds: sensor.thresholds || {}
      },

      status: 'planned', // planned | installed | commissioned | operational | maintenance | faulty
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
      version: "0.1",
      generatedAt: new Date().toISOString(),
      projectId: sbm.project.id,
      projectName: sbm.project.name,
      status: 'no_spaces',
      message: 'No spaces found in semantic model. Digital twin schema will be populated when spaces are defined.',
      placeholderData: true
    };
  }

  const spaceSensorBindings = generateSpaceSensorBindings(spaces, logger);
  const bmsIntegration = generateBMSIntegration(sbm, spaceSensorBindings, logger);
  const evaluationRules = generateRequirementEvaluationRules(sbm, spaceSensorBindings, logger);
  const iotDeviceRegistry = generateIoTDeviceRegistry(spaceSensorBindings, bmsIntegration, logger);

  const totalSensors = spaceSensorBindings.reduce((sum, b) => sum + b.sensors.length, 0);

  const twinSchema = {
    version: "0.1",
    generatedAt: new Date().toISOString(),
    projectId: sbm.project.id,
    projectName: sbm.project.name,

    summary: {
      totalSpaces: spaces.length,
      totalSensors: totalSensors,
      sensorsByType: {
        temperature: iotDeviceRegistry.filter(d => d.deviceType === 'temperature').length,
        humidity: iotDeviceRegistry.filter(d => d.deviceType === 'humidity').length,
        co2: iotDeviceRegistry.filter(d => d.deviceType === 'co2').length,
        occupancy: iotDeviceRegistry.filter(d => d.deviceType === 'occupancy').length,
        motion: iotDeviceRegistry.filter(d => d.deviceType === 'motion').length,
        illuminance: iotDeviceRegistry.filter(d => d.deviceType === 'illuminance').length
      },
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
