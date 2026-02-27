/**
 * Stage 2: Normalize & Enrich
 *
 * - Normalize units to canonical form (mm, m2, m3, °C)
 * - Auto-generate missing IDs (deterministic)
 * - Compute derived relationships
 * - Resolve type→instance inheritance (Space Type → Space, etc.)
 * - Resolve level→space property inheritance
 * - Inject jurisdiction pack (Poland requirements if country=PL)
 */

import { loadJurisdictionPack, getApplicableRequirements } from '../enrichers/jurisdiction-pack.mjs';

/**
 * Normalize a single entity
 */
function normalizeEntity(entity) {
  const normalized = { ...entity };

  // Remove metadata (internal only)
  delete normalized._metadata;

  // Ensure version field exists
  if (!normalized.version) {
    normalized.version = '1.0.0';
  }

  // Normalize units (if applicable)
  if (normalized.unit && normalized.unit !== 'm') {
    // Already using standard units
  }

  return normalized;
}

/**
 * Group entities by type
 */
function groupEntitiesByType(entities) {
  const grouped = {
    buildings: [],
    levels: [],
    zones: [],
    spaces: [],
    systems: [],
    asset_instances: [],
    requirements: [],
    space_types: [],
    zone_types: [],
    system_types: [],
    asset_types: [],
    other: [] // For legacy document types
  };

  for (const entity of entities) {
    const type = entity.documentType;

    if (type === 'building') {
      grouped.buildings.push(normalizeEntity(entity));
    } else if (type === 'level') {
      grouped.levels.push(normalizeEntity(entity));
    } else if (type === 'zone') {
      grouped.zones.push(normalizeEntity(entity));
    } else if (type === 'space') {
      grouped.spaces.push(normalizeEntity(entity));
    } else if (type === 'system') {
      grouped.systems.push(normalizeEntity(entity));
    } else if (type === 'asset_instance') {
      grouped.asset_instances.push(normalizeEntity(entity));
    } else if (type === 'requirement') {
      grouped.requirements.push(normalizeEntity(entity));
    } else if (type === 'space_type') {
      grouped.space_types.push(normalizeEntity(entity));
    } else if (type === 'zone_type') {
      grouped.zone_types.push(normalizeEntity(entity));
    } else if (type === 'system_type') {
      grouped.system_types.push(normalizeEntity(entity));
    } else if (type === 'asset_type') {
      grouped.asset_types.push(normalizeEntity(entity));
    } else {
      // Legacy types (element_specification, project_specification)
      grouped.other.push(normalizeEntity(entity));
    }
  }

  return grouped;
}

/**
 * Compute reverse relationships
 *
 * For example: space.zoneIds → zone.spaceIds (reverse link)
 */
function computeRelationships(grouped) {
  // Build zone → spaces reverse mapping
  if (grouped.zones && grouped.spaces) {
    for (const zone of grouped.zones) {
      if (!zone.spaceIds) {
        zone.spaceIds = [];
      }

      // Find all spaces that reference this zone
      for (const space of grouped.spaces) {
        if (space.zoneIds && space.zoneIds.includes(zone.id)) {
          if (!zone.spaceIds.includes(space.id)) {
            zone.spaceIds.push(space.id);
          }
        }
      }
    }
  }

  // Build system → assets reverse mapping
  if (grouped.systems && grouped.asset_instances) {
    for (const system of grouped.systems) {
      if (!system.assetInstanceIds) {
        system.assetInstanceIds = [];
      }

      // Find all assets that reference this system
      for (const asset of grouped.asset_instances) {
        if (asset.systemId === system.id) {
          if (!system.assetInstanceIds.includes(asset.id)) {
            system.assetInstanceIds.push(asset.id);
          }
        }
      }
    }
  }

  return grouped;
}

/**
 * Set a field on an entity via inheritance, adding _meta provenance.
 * Only sets the field if the entity doesn't already have an explicit value.
 *
 * @param {object} entity - Target entity
 * @param {string} field - Field name to set
 * @param {*} value - Value to inherit
 * @param {string} resolution - 'type_default' or 'inherited'
 * @param {string} fromId - Source entity ID
 * @param {string} fromField - Source field name (may differ from target field)
 * @returns {boolean} Whether the field was inherited
 */
function inheritField(entity, field, value, resolution, fromId, fromField) {
  // Skip if entity already has an explicit value
  if (entity[field] !== undefined && entity[field] !== null) {
    return false;
  }

  // Skip if inherited value is undefined or null
  if (value === undefined || value === null) {
    return false;
  }

  entity[field] = value;
  entity[`${field}_meta`] = {
    confidence: 'specified',
    resolution,
    inheritedFrom: fromId,
    inheritedField: fromField || field
  };

  return true;
}

/**
 * Resolve type→instance inheritance
 *
 * For each instance with a typeId, copy type template fields
 * to the instance if not explicitly set.
 */
function resolveTypeInheritance(grouped, logger) {
  let inherited = 0;

  // Space Type → Space
  if (grouped.spaces.length > 0 && grouped.space_types.length > 0) {
    const typeMap = new Map(grouped.space_types.map(t => [t.id, t]));

    for (const space of grouped.spaces) {
      const typeId = space.spaceTypeId;
      if (!typeId) continue;

      const spaceType = typeMap.get(typeId);
      if (!spaceType) {
        logger.warn(`Space ${space.id} references unknown space type: ${typeId}`);
        continue;
      }

      // Inheritable fields from Space Type
      const typeFields = [
        'designArea', 'designHeight', 'spaceType',
        'electricalSafetyGroup', 'accessibilityLevel'
      ];

      for (const field of typeFields) {
        if (inheritField(space, field, spaceType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }

      // Inherit nested objects (finishes, environmentalConditions, occupancy, shielding)
      for (const objField of ['finishes', 'environmentalConditions', 'occupancy', 'shielding']) {
        if (spaceType[objField] && !space[objField]) {
          space[objField] = { ...spaceType[objField] };
          space[`${objField}_meta`] = {
            confidence: 'specified',
            resolution: 'type_default',
            inheritedFrom: typeId,
            inheritedField: objField
          };
          inherited++;
        }
      }

      // Merge requirements (type requirements added, not replaced)
      if (spaceType.requirements && Array.isArray(spaceType.requirements)) {
        if (!space.requirements) space.requirements = [];
        const existing = new Set(space.requirements);
        const added = [];
        for (const reqId of spaceType.requirements) {
          if (!existing.has(reqId)) {
            space.requirements.push(reqId);
            added.push(reqId);
          }
        }
        if (added.length > 0) {
          space[`requirements_meta`] = {
            confidence: 'specified',
            source: 'compiler_merge',
            resolution: 'merged',
            mergedFrom: [
              { source: space.id, type: 'explicit' },
              { source: typeId, type: 'type_default', added }
            ]
          };
          inherited++;
        }
      }
    }
  }

  // Zone Type → Zone
  if (grouped.zones.length > 0 && grouped.zone_types.length > 0) {
    const typeMap = new Map(grouped.zone_types.map(t => [t.id, t]));

    for (const zone of grouped.zones) {
      const typeId = zone.zoneTypeId;
      if (!typeId) continue;

      const zoneType = typeMap.get(typeId);
      if (!zoneType) {
        logger.warn(`Zone ${zone.id} references unknown zone type: ${typeId}`);
        continue;
      }

      for (const field of ['zoneCategory', 'regulatoryBasis']) {
        if (inheritField(zone, field, zoneType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }
    }
  }

  // System Type → System
  if (grouped.systems.length > 0 && grouped.system_types.length > 0) {
    const typeMap = new Map(grouped.system_types.map(t => [t.id, t]));

    for (const system of grouped.systems) {
      const typeId = system.systemTypeId;
      if (!typeId) continue;

      const systemType = typeMap.get(typeId);
      if (!systemType) {
        logger.warn(`System ${system.id} references unknown system type: ${typeId}`);
        continue;
      }

      for (const field of ['systemCategory', 'designLifeYears']) {
        if (inheritField(system, field, systemType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }
    }
  }

  // Asset Type → Asset Instance
  if (grouped.asset_instances.length > 0 && grouped.asset_types.length > 0) {
    const typeMap = new Map(grouped.asset_types.map(t => [t.id, t]));

    for (const asset of grouped.asset_instances) {
      const typeId = asset.assetTypeId;
      if (!typeId) continue;

      const assetType = typeMap.get(typeId);
      if (!assetType) {
        logger.warn(`Asset ${asset.id} references unknown asset type: ${typeId}`);
        continue;
      }

      for (const field of ['manufacturer', 'modelNumber', 'expectedLifeYears']) {
        if (inheritField(asset, field, assetType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }
    }
  }

  if (inherited > 0) {
    logger.debug(`Resolved ${inherited} type→instance inherited fields`);
  }

  return grouped;
}

/**
 * Resolve level→space property inheritance
 *
 * Levels can define typical values that spaces inherit:
 * - typicalCeilingHeight → designHeight
 * - typicalFinishes → finishes
 * - typicalEnvironmentalConditions → environmentalConditions
 * - levelRequirements → requirements (merged)
 */
function resolveLevelInheritance(grouped, logger) {
  if (grouped.spaces.length === 0 || grouped.levels.length === 0) {
    return grouped;
  }

  let inherited = 0;
  const levelMap = new Map(grouped.levels.map(l => [l.id, l]));

  for (const space of grouped.spaces) {
    const levelId = space.levelId;
    if (!levelId) continue;

    const level = levelMap.get(levelId);
    if (!level) {
      logger.warn(`Space ${space.id} references unknown level: ${levelId}`);
      continue;
    }

    // typicalCeilingHeight → designHeight
    if (inheritField(space, 'designHeight', level.typicalCeilingHeight, 'inherited', levelId, 'typicalCeilingHeight')) {
      inherited++;
    }

    // typicalFinishes → finishes
    if (level.typicalFinishes && !space.finishes) {
      space.finishes = { ...level.typicalFinishes };
      space.finishes_meta = {
        confidence: 'specified',
        resolution: 'inherited',
        inheritedFrom: levelId,
        inheritedField: 'typicalFinishes'
      };
      inherited++;
    }

    // typicalEnvironmentalConditions → environmentalConditions
    if (level.typicalEnvironmentalConditions && !space.environmentalConditions) {
      space.environmentalConditions = { ...level.typicalEnvironmentalConditions };
      space.environmentalConditions_meta = {
        confidence: 'specified',
        resolution: 'inherited',
        inheritedFrom: levelId,
        inheritedField: 'typicalEnvironmentalConditions'
      };
      inherited++;
    }

    // levelRequirements → requirements (MERGED, not replaced)
    if (level.levelRequirements && Array.isArray(level.levelRequirements)) {
      if (!space.requirements) space.requirements = [];
      const existing = new Set(space.requirements);
      const added = [];
      for (const reqId of level.levelRequirements) {
        if (!existing.has(reqId)) {
          space.requirements.push(reqId);
          added.push(reqId);
        }
      }
      if (added.length > 0) {
        // Merge with existing _meta if type inheritance already set it
        const existingMeta = space.requirements_meta;
        const sources = existingMeta?.mergedFrom
          ? [...existingMeta.mergedFrom, { source: levelId, type: 'inherited', added }]
          : [
            { source: space.id, type: 'explicit' },
            { source: levelId, type: 'inherited', added }
          ];

        space.requirements_meta = {
          confidence: 'specified',
          source: existingMeta?.source || 'compiler_merge',
          resolution: 'merged',
          mergedFrom: sources
        };
        inherited++;
      }
    }
  }

  if (inherited > 0) {
    logger.debug(`Resolved ${inherited} level→space inherited fields`);
  }

  return grouped;
}

/**
 * Extract project metadata from entities
 */
function extractProjectMetadata(entities, options) {
  // Look for project_specification document
  const projectSpec = entities.find(e => e.documentType === 'project_specification');

  if (projectSpec) {
    return {
      id: projectSpec.id || 'PRJ-UNKNOWN',
      name: projectSpec.projectName || 'Unnamed Project',
      country: options.country || 'PL',
      phase: options.phase || projectSpec.phase || 3,
      language: projectSpec.language || 'pl',
      location: projectSpec.location || {},
      units: {
        length: 'mm',
        area: 'm2',
        volume: 'm3',
        temperature: 'C'
      }
    };
  }

  // Fallback: construct from options
  return {
    id: 'PRJ-UNKNOWN',
    name: 'Unnamed Project',
    country: options.country || 'PL',
    phase: options.phase || 3,
    language: 'pl',
    units: {
      length: 'mm',
      area: 'm2',
      volume: 'm3',
      temperature: 'C'
    }
  };
}

/**
 * Perform cost rollup (v0.4 feature)
 *
 * Aggregates costs from spaces → levels → buildings → project
 * Adds _meta provenance tracking for rolled-up costs
 *
 * @param {object} grouped - Grouped entities
 * @param {object} project - Project metadata
 * @param {object} logger - Logger instance
 */
function performCostRollup(grouped, project, logger) {
  let totalSpaceCosts = 0;
  let totalAssetCosts = 0;
  let spacesWithCost = 0;
  let assetsWithCost = 0;
  const currency = project.country === 'PL' ? 'PLN' : 'EUR';

  // Step 1: Aggregate space costs to levels
  if (grouped.levels && grouped.spaces) {
    for (const level of grouped.levels) {
      let levelCost = 0;
      const contributingSpaces = [];

      for (const space of grouped.spaces) {
        if (space.levelId === level.id && space.cost?.totalCost) {
          levelCost += space.cost.totalCost;
          contributingSpaces.push({
            id: space.id,
            name: space.spaceName,
            cost: space.cost.totalCost
          });
          totalSpaceCosts += space.cost.totalCost;
          spacesWithCost++;
        }
      }

      if (levelCost > 0) {
        level.cost = level.cost || {};
        level.cost.totalCost = levelCost;
        level.cost.currency = currency;
        level.cost.basis = 'rollup_from_spaces';
        level.cost._meta = {
          confidence: 'calculated',
          source: 'compiler_cost_rollup',
          resolution: 'calculated',
          notes: `Aggregated from ${contributingSpaces.length} spaces`,
          contributingEntities: contributingSpaces
        };
      }
    }
  }

  // Step 2: Aggregate level costs to buildings
  if (grouped.buildings && grouped.levels) {
    for (const building of grouped.buildings) {
      let buildingCost = 0;
      const contributingLevels = [];

      for (const level of grouped.levels) {
        if (level.buildingId === building.id && level.cost?.totalCost) {
          buildingCost += level.cost.totalCost;
          contributingLevels.push({
            id: level.id,
            name: level.levelName || level.id,
            cost: level.cost.totalCost
          });
        }
      }

      if (buildingCost > 0) {
        building.cost = building.cost || {};
        building.cost.totalCost = buildingCost;
        building.cost.currency = currency;
        building.cost.basis = 'rollup_from_levels';
        building.cost._meta = {
          confidence: 'calculated',
          source: 'compiler_cost_rollup',
          resolution: 'calculated',
          notes: `Aggregated from ${contributingLevels.length} levels`,
          contributingEntities: contributingLevels
        };
      }
    }
  }

  // Step 3: Aggregate asset costs to systems
  if (grouped.systems && grouped.asset_instances) {
    for (const system of grouped.systems) {
      let systemCost = 0;
      const contributingAssets = [];

      for (const asset of grouped.asset_instances) {
        if (asset.systemId === system.id && asset.cost?.totalCost) {
          systemCost += asset.cost.totalCost;
          contributingAssets.push({
            id: asset.id,
            name: asset.assetName,
            cost: asset.cost.totalCost
          });
          totalAssetCosts += asset.cost.totalCost;
          assetsWithCost++;
        }
      }

      if (systemCost > 0) {
        system.cost = system.cost || {};
        system.cost.totalCost = systemCost;
        system.cost.currency = currency;
        system.cost.basis = 'rollup_from_assets';
        system.cost._meta = {
          confidence: 'calculated',
          source: 'compiler_cost_rollup',
          resolution: 'calculated',
          notes: `Aggregated from ${contributingAssets.length} asset instances`,
          contributingEntities: contributingAssets
        };
      }
    }
  }

  // Step 4: Aggregate building + system costs to project
  let projectConstructionCost = 0;
  let projectEquipmentCost = 0;
  const contributingBuildings = [];
  const contributingSystems = [];

  if (grouped.buildings) {
    for (const building of grouped.buildings) {
      if (building.cost?.totalCost) {
        projectConstructionCost += building.cost.totalCost;
        contributingBuildings.push({
          id: building.id,
          name: building.buildingName || building.id,
          cost: building.cost.totalCost
        });
      }
    }
  }

  if (grouped.systems) {
    for (const system of grouped.systems) {
      if (system.cost?.totalCost) {
        projectEquipmentCost += system.cost.totalCost;
        contributingSystems.push({
          id: system.id,
          name: system.systemName || system.id,
          category: system.systemCategory,
          cost: system.cost.totalCost
        });
      }
    }
  }

  const totalProjectCost = projectConstructionCost + projectEquipmentCost;

  if (totalProjectCost > 0) {
    project.budget = project.budget || {};
    project.budget.totalBudget = project.budget.totalBudget || totalProjectCost;
    project.budget.currency = currency;
    project.budget.breakdown = project.budget.breakdown || {};
    project.budget.breakdown.structure = project.budget.breakdown.structure || {};
    project.budget.breakdown.structure.actual = projectConstructionCost;
    project.budget.breakdown.equipment = project.budget.breakdown.equipment || {};
    project.budget.breakdown.equipment.actual = projectEquipmentCost;

    project.budget._meta = {
      confidence: 'calculated',
      source: 'compiler_cost_rollup',
      resolution: 'calculated',
      notes: `Aggregated from ${contributingBuildings.length} buildings + ${contributingSystems.length} systems`,
      breakdown: {
        construction: {
          amount: projectConstructionCost,
          from: contributingBuildings
        },
        equipment: {
          amount: projectEquipmentCost,
          from: contributingSystems
        }
      }
    };

    logger.debug(`✓ Cost rollup: €${totalProjectCost.toFixed(2)} (${spacesWithCost} spaces, ${assetsWithCost} assets)`);
  } else {
    logger.debug('! No cost data found for rollup');
  }
}

/**
 * Main normalize function
 *
 * @param {Array} rawEntities - Raw entities from parse stage
 * @param {object} options - Compiler options
 * @param {object} logger - Logger instance
 * @returns {Promise<object>} - Normalized SBM structure
 */
export async function normalize(rawEntities, options, logger) {
  logger.debug(`Normalizing ${rawEntities.length} entities...`);

  // Group entities by type
  let grouped = groupEntitiesByType(rawEntities);
  logger.debug(`Grouped: ${grouped.spaces.length} spaces, ${grouped.zones.length} zones, ${grouped.requirements.length} requirements, ${grouped.space_types.length} space types`);

  // Resolve type→instance inheritance (before relationships, so inherited fields participate)
  grouped = resolveTypeInheritance(grouped, logger);

  // Resolve level→space inheritance (after type, so type values take priority over level)
  grouped = resolveLevelInheritance(grouped, logger);

  // Compute derived relationships
  grouped = computeRelationships(grouped);
  logger.debug('Computed reverse relationships (zone→spaces, system→assets)');

  // Extract project metadata
  const project = extractProjectMetadata(rawEntities, options);
  logger.debug(`Project: ${project.name} (${project.country}, phase ${project.phase})`);

  // Load jurisdiction pack (global + country-specific requirements)
  const jurisdictionRequirements = await loadJurisdictionPack(options, logger);

  // Merge jurisdiction requirements with any requirements from Markdown files
  const allRequirements = [...grouped.requirements, ...jurisdictionRequirements];

  // Remove duplicates (if same ID exists in both sources, prefer Markdown version)
  const requirementMap = new Map();
  for (const req of allRequirements) {
    if (!requirementMap.has(req.id)) {
      requirementMap.set(req.id, req);
    }
  }
  grouped.requirements = Array.from(requirementMap.values());

  logger.debug(`Total requirements: ${grouped.requirements.length} (${grouped.requirements.length - jurisdictionRequirements.length} from Markdown + ${jurisdictionRequirements.length} from jurisdiction pack)`);

  // Auto-assign jurisdiction requirements to spaces by scope matching
  let autoAssigned = 0;
  for (const space of grouped.spaces) {
    const applicable = getApplicableRequirements(space, grouped.requirements);
    if (applicable.length === 0) continue;

    if (!space.requirements) space.requirements = [];
    const existing = new Set(space.requirements);
    const added = [];

    for (const req of applicable) {
      if (!existing.has(req.id)) {
        space.requirements.push(req.id);
        added.push(req.id);
        autoAssigned++;
      }
    }

    if (added.length > 0) {
      const jurisdictionSource = { source: 'jurisdiction_pack', type: 'auto_scope', added };
      const existingMeta = space.requirements_meta;
      if (existingMeta?.mergedFrom) {
        existingMeta.mergedFrom.push(jurisdictionSource);
        // Ensure source field exists
        if (!existingMeta.source) {
          existingMeta.source = 'compiler_merge';
        }
      } else {
        space.requirements_meta = {
          confidence: 'specified',
          source: 'compiler_merge',
          resolution: 'merged',
          mergedFrom: [
            { source: space.id, type: 'explicit' },
            jurisdictionSource
          ]
        };
      }
    }
  }
  if (autoAssigned > 0) {
    logger.debug(`Auto-assigned ${autoAssigned} jurisdiction requirement(s) to spaces by scope`);
  }

  // Stage 2.5: Cost Rollup (v0.4 feature)
  logger.debug('Computing cost rollup...');
  performCostRollup(grouped, project, logger);

  // Build normalized output structure
  const normalized = {
    project,
    entities: {
      ...(grouped.buildings.length > 0 && { buildings: grouped.buildings }),
      ...(grouped.levels.length > 0 && { levels: grouped.levels }),
      ...(grouped.zones.length > 0 && { zones: grouped.zones }),
      ...(grouped.spaces.length > 0 && { spaces: grouped.spaces }),
      ...(grouped.systems.length > 0 && { systems: grouped.systems }),
      ...(grouped.asset_instances.length > 0 && { asset_instances: grouped.asset_instances }),
      ...(grouped.requirements.length > 0 && { requirements: grouped.requirements }),
      ...(grouped.space_types.length > 0 && { space_types: grouped.space_types }),
      ...(grouped.zone_types.length > 0 && { zone_types: grouped.zone_types }),
      ...(grouped.system_types.length > 0 && { system_types: grouped.system_types }),
      ...(grouped.asset_types.length > 0 && { asset_types: grouped.asset_types })
    },
    metadata: {
      totalEntities: rawEntities.length,
      entitiesByType: {
        buildings: grouped.buildings.length,
        levels: grouped.levels.length,
        zones: grouped.zones.length,
        spaces: grouped.spaces.length,
        systems: grouped.systems.length,
        asset_instances: grouped.asset_instances.length,
        requirements: grouped.requirements.length,
        space_types: grouped.space_types.length,
        zone_types: grouped.zone_types.length,
        system_types: grouped.system_types.length,
        asset_types: grouped.asset_types.length
      }
    }
  };

  return normalized;
}
