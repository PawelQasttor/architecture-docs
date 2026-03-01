/**
 * Compilation Target: BIM Mapping
 *
 * Generates BIM integration artifacts:
 * - Revit shared parameters file (.txt)
 * - IFC property set definitions (JSON)
 * - Parameter mapping rules (SBM → BIM)
 */

/**
 * Generate Revit shared parameters configuration
 */
function generateRevitSharedParameters(sbm) {
  const groups = [];

  // Group 1: SBM Identification
  const identificationGroup = {
    name: "SBM_Identification",
    parameters: [
      {
        name: "SBM_Entity_ID",
        guid: "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5g6h7",
        dataType: "Text",
        description: "Semantic Building Model entity identifier",
        visible: true,
        userModifiable: false
      },
      {
        name: "SBM_Entity_Type",
        guid: "b2c3d4e5-f6a7-4890-b1c2-d3e4f5g6h7i8",
        dataType: "Text",
        description: "SBM entity type (space, zone, system, asset)",
        visible: true,
        userModifiable: false
      },
      {
        name: "SBM_Version",
        guid: "c3d4e5f6-a7b8-4901-c2d3-e4f5g6h7i8j9",
        dataType: "Text",
        description: "SBM entity version (semantic versioning)",
        visible: true,
        userModifiable: false
      }
    ]
  };
  groups.push(identificationGroup);

  // Group 2: SBM Requirements
  const requirementsGroup = {
    name: "SBM_Requirements",
    parameters: [
      {
        name: "SBM_Requirements",
        guid: "d4e5f6a7-b8c9-4012-d3e4-f5g6h7i8j9k0",
        dataType: "Text",
        description: "Semicolon-separated list of requirement IDs",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_Compliance_Status",
        guid: "e5f6a7b8-c9d0-4123-e4f5-g6h7i8j9k0l1",
        dataType: "Text",
        description: "Overall compliance status (compliant, pending, non-compliant)",
        visible: true,
        userModifiable: false
      }
    ]
  };
  groups.push(requirementsGroup);

  // Group 3: SBM Zones (for spaces)
  const zonesGroup = {
    name: "SBM_Zones",
    parameters: [
      {
        name: "SBM_Fire_Zone",
        guid: "f6a7b8c9-d0e1-4234-f5g6-h7i8j9k0l1m2",
        dataType: "Text",
        description: "Fire zone ID",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_HVAC_Zone",
        guid: "a7b8c9d0-e1f2-4345-g6h7-i8j9k0l1m2n3",
        dataType: "Text",
        description: "HVAC zone ID",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_Acoustic_Zone",
        guid: "b8c9d0e1-f2a3-4456-h7i8-j9k0l1m2n3o4",
        dataType: "Text",
        description: "Acoustic zone ID",
        visible: true,
        userModifiable: true
      }
    ]
  };
  groups.push(zonesGroup);

  // Group 4: SBM Metadata
  const metadataGroup = {
    name: "SBM_Metadata",
    parameters: [
      {
        name: "SBM_Project_Phase",
        guid: "c9d0e1f2-a3b4-4567-i8j9-k0l1m2n3o4p5",
        dataType: "Text",
        description: "Project phase (concept, schematic, design_development, etc.)",
        visible: true,
        userModifiable: false
      },
      {
        name: "SBM_BIM_LOD",
        guid: "d0e1f2a3-b4c5-4678-j9k0-l1m2n3o4p5q6",
        dataType: "Text",
        description: "BIM Level of Development (LOD_100 to LOD_500)",
        visible: true,
        userModifiable: false
      }
    ]
  };
  groups.push(metadataGroup);

  // Group 5: SBM v0.3 Properties
  const v03Group = {
    name: "SBM_v03_Properties",
    parameters: [
      {
        name: "SBM_RoomNumber",
        guid: "e1f2a3b4-c5d6-4789-k0l1-m2n3o4p5q6r7",
        dataType: "Text",
        description: "Room number from architectural drawings",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_AccessibilityLevel",
        guid: "f2a3b4c5-d6e7-4890-l1m2-n3o4p5q6r7s8",
        dataType: "Text",
        description: "Accessibility level",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_DepartmentId",
        guid: "a3b4c5d6-e7f8-4901-m2n3-o4p5q6r7s8t9",
        dataType: "Text",
        description: "Functional department identifier",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_ElectricalSafetyGroup",
        guid: "b4c5d6e7-f8a9-4012-n3o4-p5q6r7s8t9u0",
        dataType: "Text",
        description: "IEC 60364-7-710 electrical safety group",
        visible: true,
        userModifiable: true
      },
      {
        name: "SBM_LifecycleState",
        guid: "c5d6e7f8-a9b0-4123-o4p5-q6r7s8t9u0v1",
        dataType: "Text",
        description: "Lifecycle state",
        visible: true,
        userModifiable: false
      },
      {
        name: "SBM_Pressurization",
        guid: "d6e7f8a9-b0c1-4234-p5q6-r7s8t9u0v1w2",
        dataType: "Text",
        description: "Space pressurization type",
        visible: true,
        userModifiable: true
      }
    ]
  };
  groups.push(v03Group);

  return { groups };
}

/**
 * Generate IFC property set definitions
 */
function generateIfcPropertySets(sbm) {
  const propertySets = [];

  // Property Set 1: Pset_SBM_Space
  const spacePropertySet = {
    name: "Pset_SBM_Space",
    applicableTo: ["IfcSpace"],
    properties: [
      {
        name: "SBM_ID",
        dataType: "IfcLabel",
        description: "Semantic Building Model space identifier"
      },
      {
        name: "SBM_SpaceType",
        dataType: "IfcLabel",
        description: "Semantic space type (sleeping_space, living_space, etc.)"
      },
      {
        name: "SBM_Requirements",
        dataType: "IfcText",
        description: "Semicolon-separated requirement IDs"
      },
      {
        name: "SBM_ZoneIds",
        dataType: "IfcText",
        description: "Semicolon-separated zone IDs (fire, HVAC, acoustic)"
      },
      {
        name: "SBM_DesignArea",
        dataType: "IfcAreaMeasure",
        description: "Design area in m²"
      },
      {
        name: "SBM_DesignHeight",
        dataType: "IfcLengthMeasure",
        description: "Design clear height in meters"
      },
      {
        name: "SBM_DesignVolume",
        dataType: "IfcVolumeMeasure",
        description: "Design volume in m³"
      },
      {
        name: "SBM_MaxOccupants",
        dataType: "IfcInteger",
        description: "Maximum occupancy count"
      },
      // v0.3 fields
      {
        name: "SBM_RoomNumber",
        dataType: "IfcLabel",
        description: "Room number from architectural drawings"
      },
      {
        name: "SBM_AccessibilityLevel",
        dataType: "IfcLabel",
        description: "Accessibility level (standard/mobility/visual/hearing/full)"
      },
      {
        name: "SBM_DepartmentId",
        dataType: "IfcLabel",
        description: "Functional department identifier"
      },
      {
        name: "SBM_LifecycleState",
        dataType: "IfcLabel",
        description: "Lifecycle state (planned/design/under_construction/operational/renovation/decommissioned)"
      },
      {
        name: "SBM_ElectricalSafetyGroup",
        dataType: "IfcLabel",
        description: "IEC 60364-7-710 electrical safety group (standard/group_0/group_1/group_2)"
      },
      {
        name: "SBM_Pressurization",
        dataType: "IfcLabel",
        description: "Space pressurization type (positive/negative/neutral)"
      },
      {
        name: "SBM_ShieldingRequired",
        dataType: "IfcBoolean",
        description: "Whether radiological or RF shielding is required"
      }
    ]
  };
  propertySets.push(spacePropertySet);

  // Property Set 2: Pset_SBM_Zone
  const zonePropertySet = {
    name: "Pset_SBM_Zone",
    applicableTo: ["IfcZone"],
    properties: [
      {
        name: "SBM_ID",
        dataType: "IfcLabel",
        description: "Semantic Building Model zone identifier"
      },
      {
        name: "SBM_ZoneName",
        dataType: "IfcLabel",
        description: "Zone name"
      },
      {
        name: "SBM_ZoneType",
        dataType: "IfcLabel",
        description: "Zone type (fire, acoustic, hvac, security, etc.)"
      },
      {
        name: "SBM_SpaceIds",
        dataType: "IfcText",
        description: "Semicolon-separated space IDs in this zone"
      },
      {
        name: "SBM_Requirements",
        dataType: "IfcText",
        description: "Semicolon-separated requirement IDs"
      }
    ]
  };
  propertySets.push(zonePropertySet);

  // Property Set 3: Pset_SBM_System
  const systemPropertySet = {
    name: "Pset_SBM_System",
    applicableTo: ["IfcSystem", "IfcDistributionSystem"],
    properties: [
      {
        name: "SBM_ID",
        dataType: "IfcLabel",
        description: "Semantic Building Model system identifier"
      },
      {
        name: "SBM_SystemName",
        dataType: "IfcLabel",
        description: "System name"
      },
      {
        name: "SBM_SystemType",
        dataType: "IfcLabel",
        description: "System type (detailed classification)"
      },
      {
        name: "SBM_SystemCategory",
        dataType: "IfcLabel",
        description: "System category (hvac, electrical, plumbing, etc.)"
      },
      {
        name: "SBM_ServedSpaceIds",
        dataType: "IfcText",
        description: "Semicolon-separated space IDs served by this system"
      }
    ]
  };
  propertySets.push(systemPropertySet);

  // Property Set 4: Pset_SBM_Asset
  const assetPropertySet = {
    name: "Pset_SBM_Asset",
    applicableTo: ["IfcElement", "IfcDistributionElement"],
    properties: [
      {
        name: "SBM_ID",
        dataType: "IfcLabel",
        description: "Semantic Building Model asset identifier"
      },
      {
        name: "SBM_AssetName",
        dataType: "IfcLabel",
        description: "Asset instance name"
      },
      {
        name: "SBM_SystemID",
        dataType: "IfcLabel",
        description: "Parent system identifier"
      },
      {
        name: "SBM_Tag",
        dataType: "IfcLabel",
        description: "Asset tag (equipment number)"
      },
      {
        name: "SBM_ServiceInterval",
        dataType: "IfcInteger",
        description: "Maintenance service interval in months"
      },
      {
        name: "SBM_ExpectedLifetime",
        dataType: "IfcInteger",
        description: "Expected lifetime in years"
      }
    ]
  };
  propertySets.push(assetPropertySet);

  // Property Set 5: Pset_SBM_Opening (v1.1)
  const openingPropertySet = {
    name: "Pset_SBM_Opening",
    description: "SBM Opening properties for windows, doors, and other openings",
    applicableEntities: ["IfcWindow", "IfcDoor", "IfcOpeningElement"],
    properties: [
      { name: "SBM_ID", dataType: "IfcIdentifier", description: "SBM entity identifier" },
      { name: "SBM_OpeningCategory", dataType: "IfcLabel", description: "Opening classification" },
      { name: "SBM_EnvelopeId", dataType: "IfcIdentifier", description: "Parent envelope reference" },
      { name: "SBM_UValue", dataType: "IfcThermalTransmittanceMeasure", description: "U-value in W/(m2·K)" },
      { name: "SBM_GValue", dataType: "IfcReal", description: "Solar heat gain coefficient" },
      { name: "SBM_AcousticRw", dataType: "IfcSoundPowerMeasure", description: "Sound reduction Rw in dB" },
      { name: "SBM_FireRating", dataType: "IfcLabel", description: "Fire resistance rating" },
      { name: "SBM_ClearWidth", dataType: "IfcLengthMeasure", description: "Clear opening width in mm" },
      { name: "SBM_Operability", dataType: "IfcLabel", description: "Opening operation type" }
    ]
  };
  propertySets.push(openingPropertySet);

  // Property Set 6: Pset_SBM_SiteFeature (v1.1)
  const siteFeaturePropertySet = {
    name: "Pset_SBM_SiteFeature",
    description: "SBM Site Feature properties for landscape and site elements",
    applicableEntities: ["IfcGeographicElement", "IfcCivilElement", "IfcBuildingElementProxy"],
    properties: [
      { name: "SBM_ID", dataType: "IfcIdentifier", description: "SBM entity identifier" },
      { name: "SBM_FeatureCategory", dataType: "IfcLabel", description: "Site feature classification" },
      { name: "SBM_SiteId", dataType: "IfcIdentifier", description: "Parent site reference" },
      { name: "SBM_Area", dataType: "IfcAreaMeasure", description: "Feature area in m2" },
      { name: "SBM_Condition", dataType: "IfcLabel", description: "Current condition" }
    ]
  };
  propertySets.push(siteFeaturePropertySet);

  // Property Set 7: Pset_SBM_ConstructionPackage (v1.1)
  const constructionPackagePropertySet = {
    name: "Pset_SBM_ConstructionPackage",
    description: "SBM Construction Package properties for work scheduling",
    applicableEntities: ["IfcWorkSchedule", "IfcWorkPlan"],
    properties: [
      { name: "SBM_ID", dataType: "IfcIdentifier", description: "SBM entity identifier" },
      { name: "SBM_PackageName", dataType: "IfcLabel", description: "Package name" },
      { name: "SBM_Sequence", dataType: "IfcInteger", description: "Execution order" },
      { name: "SBM_Status", dataType: "IfcLabel", description: "Package status" },
      { name: "SBM_PlannedStart", dataType: "IfcDate", description: "Planned start date" },
      { name: "SBM_PlannedEnd", dataType: "IfcDate", description: "Planned end date" }
    ]
  };
  propertySets.push(constructionPackagePropertySet);

  return { propertySets };
}

/**
 * Generate parameter mapping rules
 */
function generateParameterMappings(sbm) {
  const mappings = {
    spaces: {
      sbmIdParameter: "SBM_Entity_ID",
      revitCategory: "Rooms",
      ifcEntity: "IfcSpace",
      propertyMappings: [
        {
          sbmProperty: "id",
          revitParameter: "SBM_Entity_ID",
          ifcProperty: "Pset_SBM_Space.SBM_ID",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "spaceName",
          revitParameter: "Name",
          ifcProperty: "Pset_SpaceCommon.Reference",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "spaceType",
          revitParameter: "SBM_Entity_Type",
          ifcProperty: "Pset_SBM_Space.SBM_SpaceType",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "designArea",
          revitParameter: "Area",
          ifcProperty: "Pset_SBM_Space.SBM_DesignArea",
          dataType: "number",
          unit: "m2"
        },
        {
          sbmProperty: "designHeight",
          revitParameter: "Limit Offset",
          ifcProperty: "Pset_SBM_Space.SBM_DesignHeight",
          dataType: "number",
          unit: "m"
        },
        {
          sbmProperty: "requirements",
          revitParameter: "SBM_Requirements",
          ifcProperty: "Pset_SBM_Space.SBM_Requirements",
          dataType: "string_array",
          separator: ";"
        },
        {
          sbmProperty: "zoneIds",
          revitParameter: "SBM_Requirements",
          ifcProperty: "Pset_SBM_Space.SBM_ZoneIds",
          dataType: "string_array",
          separator: ";"
        },
        {
          sbmProperty: "occupancy.maxOccupants",
          revitParameter: "Occupancy",
          ifcProperty: "Pset_SBM_Space.SBM_MaxOccupants",
          dataType: "integer"
        },
        // v0.3 mappings
        {
          sbmProperty: "roomNumber",
          revitParameter: "Number",
          ifcProperty: "Pset_SBM_Space.SBM_RoomNumber",
          dataType: "string"
        },
        {
          sbmProperty: "accessibilityLevel",
          revitParameter: "SBM_AccessibilityLevel",
          ifcProperty: "Pset_SBM_Space.SBM_AccessibilityLevel",
          dataType: "string"
        },
        {
          sbmProperty: "departmentId",
          revitParameter: "SBM_DepartmentId",
          ifcProperty: "Pset_SBM_Space.SBM_DepartmentId",
          dataType: "string"
        },
        {
          sbmProperty: "electricalSafetyGroup",
          revitParameter: "SBM_ElectricalSafetyGroup",
          ifcProperty: "Pset_SBM_Space.SBM_ElectricalSafetyGroup",
          dataType: "string"
        },
        {
          sbmProperty: "lifecycleState",
          revitParameter: "SBM_LifecycleState",
          ifcProperty: "Pset_SBM_Space.SBM_LifecycleState",
          dataType: "string"
        },
        {
          sbmProperty: "environmentalConditions.pressurization",
          revitParameter: "SBM_Pressurization",
          ifcProperty: "Pset_SBM_Space.SBM_Pressurization",
          dataType: "string"
        }
      ]
    },
    zones: {
      sbmIdParameter: "SBM_Entity_ID",
      revitCategory: "Zones",
      ifcEntity: "IfcZone",
      propertyMappings: [
        {
          sbmProperty: "id",
          revitParameter: "SBM_Entity_ID",
          ifcProperty: "Pset_SBM_Zone.SBM_ID",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "zoneName",
          revitParameter: "Name",
          ifcProperty: "Name",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "zoneType",
          revitParameter: "SBM_Entity_Type",
          ifcProperty: "Pset_SBM_Zone.SBM_ZoneType",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "spaceIds",
          revitParameter: "SBM_Requirements",
          ifcProperty: "Pset_SBM_Zone.SBM_SpaceIds",
          dataType: "string_array",
          separator: ";"
        }
      ]
    },
    systems: {
      sbmIdParameter: "SBM_Entity_ID",
      revitCategory: "Mechanical Equipment",
      ifcEntity: "IfcSystem",
      propertyMappings: [
        {
          sbmProperty: "id",
          revitParameter: "SBM_Entity_ID",
          ifcProperty: "Pset_SBM_System.SBM_ID",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "systemName",
          revitParameter: "Name",
          ifcProperty: "Name",
          dataType: "string",
          required: true
        },
        {
          sbmProperty: "systemCategory",
          revitParameter: "SBM_Entity_Type",
          ifcProperty: "Pset_SBM_System.SBM_SystemCategory",
          dataType: "string",
          required: true
        }
      ]
    }
  };

  return { mappings };
}

/**
 * Detect which non-standard properties actually exist in project entities
 */
function detectDynamicProperties(sbm) {
  const SKIP_FIELDS = new Set([
    'id', 'documentType', 'entityType', 'version', '_quality', '_metadata'
  ]);

  const result = {};

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities) || entities.length === 0) continue;

    const fieldSet = new Set();
    for (const entity of entities) {
      for (const key of Object.keys(entity)) {
        if (!SKIP_FIELDS.has(key) && !key.endsWith('_meta') && !key.startsWith('_')) {
          fieldSet.add(key);
        }
      }
    }
    result[entityType] = [...fieldSet].sort();
  }

  return result;
}

/**
 * Main BIM mapping generator
 *
 * @param {object} sbm - Semantic Building Model
 * @param {object} logger - Logger instance
 * @returns {object} - BIM mapping configuration
 */
export function generateBimMapping(sbm, logger) {
  logger.debug('Generating BIM mapping configuration...');

  const revitSharedParameters = generateRevitSharedParameters(sbm);
  logger.debug(`Generated ${revitSharedParameters.groups.length} Revit shared parameter groups`);

  const ifcPropertySets = generateIfcPropertySets(sbm);
  logger.debug(`Generated ${ifcPropertySets.propertySets.length} IFC property sets`);

  const parameterMappings = generateParameterMappings(sbm);
  logger.debug(`Generated parameter mappings for ${Object.keys(parameterMappings.mappings).length} entity types`);

  const dynamicProperties = detectDynamicProperties(sbm);

  const bimMapping = {
    version: "0.2",
    generatedAt: new Date().toISOString(),
    targetPlatform: "revit_ifc",
    projectId: sbm.project.id,
    projectName: sbm.project.name,

    revitSharedParameters: {
      file: "SBM_SharedParameters.txt",
      groups: revitSharedParameters.groups
    },

    ifcPropertySets: {
      version: "IFC4",
      customPropertySets: ifcPropertySets.propertySets
    },

    parameterMappings: parameterMappings.mappings,

    dynamicProperties,

    instructions: {
      revit: [
        "1. Import SBM_SharedParameters.txt into Revit shared parameters",
        "2. Add parameters to appropriate categories (Rooms, Zones, Mechanical Equipment)",
        "3. Use Dynamo or API to populate parameter values from sbm.json",
        "4. Export to IFC with property sets enabled"
      ],
      ifc: [
        "1. Ensure IFC exporter includes custom property sets",
        "2. Map Revit parameters to IFC properties using this mapping",
        "3. Validate IFC export contains Pset_SBM_* property sets",
        "4. Use IFC validation tools to verify completeness"
      ]
    }
  };

  logger.debug('✓ BIM mapping configuration complete');
  return bimMapping;
}
