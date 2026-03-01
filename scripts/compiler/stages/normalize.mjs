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
    sites: [],
    envelopes: [],
    vertical_circulations: [],
    buildings: [],
    levels: [],
    zones: [],
    spaces: [],
    systems: [],
    assets: [],
    requirements: [],
    space_types: [],
    zone_types: [],
    system_types: [],
    asset_types: [],
    openings: [],
    opening_types: [],
    site_features: [],
    site_feature_types: [],
    construction_packages: [],
    other: [] // For legacy document types
  };

  for (const entity of entities) {
    const type = entity.documentType;

    if (type === 'site') {
      grouped.sites.push(normalizeEntity(entity));
    } else if (type === 'envelope') {
      grouped.envelopes.push(normalizeEntity(entity));
    } else if (type === 'vertical_circulation') {
      grouped.vertical_circulations.push(normalizeEntity(entity));
    } else if (type === 'building') {
      grouped.buildings.push(normalizeEntity(entity));
    } else if (type === 'level') {
      grouped.levels.push(normalizeEntity(entity));
    } else if (type === 'zone') {
      grouped.zones.push(normalizeEntity(entity));
    } else if (type === 'space') {
      grouped.spaces.push(normalizeEntity(entity));
    } else if (type === 'system') {
      grouped.systems.push(normalizeEntity(entity));
    } else if (type === 'asset' || type === 'asset_instance') {
      grouped.assets.push(normalizeEntity(entity));
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
    } else if (type === 'opening') {
      grouped.openings.push(normalizeEntity(entity));
    } else if (type === 'opening_type') {
      grouped.opening_types.push(normalizeEntity(entity));
    } else if (type === 'site_feature') {
      grouped.site_features.push(normalizeEntity(entity));
    } else if (type === 'site_feature_type') {
      grouped.site_feature_types.push(normalizeEntity(entity));
    } else if (type === 'construction_package') {
      grouped.construction_packages.push(normalizeEntity(entity));
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
  // Build site → buildings reverse mapping
  if (grouped.sites && grouped.buildings) {
    for (const site of grouped.sites) {
      if (!site.buildingIds) {
        site.buildingIds = [];
      }

      // Find all buildings that reference this site
      for (const building of grouped.buildings) {
        if (building.siteId === site.id) {
          if (!site.buildingIds.includes(building.id)) {
            site.buildingIds.push(building.id);
          }
        }
      }
    }
  }

  // Build building → envelopes reverse mapping
  if (grouped.buildings && grouped.envelopes) {
    for (const building of grouped.buildings) {
      if (!building.envelopeIds) {
        building.envelopeIds = [];
      }

      for (const envelope of grouped.envelopes) {
        if (envelope.buildingId === building.id) {
          if (!building.envelopeIds.includes(envelope.id)) {
            building.envelopeIds.push(envelope.id);
          }
        }
      }
    }
  }

  // Build building → vertical_circulations reverse mapping
  if (grouped.buildings && grouped.vertical_circulations) {
    for (const building of grouped.buildings) {
      if (!building.verticalCirculationIds) {
        building.verticalCirculationIds = [];
      }

      for (const vc of grouped.vertical_circulations) {
        if (vc.buildingId === building.id) {
          if (!building.verticalCirculationIds.includes(vc.id)) {
            building.verticalCirculationIds.push(vc.id);
          }
        }
      }
    }
  }

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
  if (grouped.systems && grouped.assets) {
    for (const system of grouped.systems) {
      if (!system.assetIds) {
        system.assetIds = [];
      }

      // Find all assets that reference this system
      for (const asset of grouped.assets) {
        if (asset.systemId === system.id) {
          if (!system.assetIds.includes(asset.id)) {
            system.assetIds.push(asset.id);
          }
        }
      }
    }
  }

  // Build system → subsystems reverse mapping (parent → children)
  if (grouped.systems) {
    for (const system of grouped.systems) {
      if (!system.subsystemIds) {
        system.subsystemIds = [];
      }

      for (const other of grouped.systems) {
        if (other.parentSystemId === system.id) {
          if (!system.subsystemIds.includes(other.id)) {
            system.subsystemIds.push(other.id);
          }
        }
      }
    }
  }

  // Build level → spaces reverse mapping (using levelIds for multi-level support)
  if (grouped.levels && grouped.spaces) {
    for (const level of grouped.levels) {
      if (!level.spaceIds) {
        level.spaceIds = [];
      }

      for (const space of grouped.spaces) {
        const spaceLevelIds = space.levelIds || (space.levelId ? [space.levelId] : []);
        if (spaceLevelIds.includes(level.id)) {
          if (!level.spaceIds.includes(space.id)) {
            level.spaceIds.push(space.id);
          }
        }
      }
    }
  }

  // Build envelope → openings reverse mapping (v1.1)
  if (grouped.envelopes && grouped.openings) {
    for (const envelope of grouped.envelopes) {
      if (!envelope.openingIds) {
        envelope.openingIds = [];
      }

      for (const opening of grouped.openings) {
        if (opening.envelopeId === envelope.id) {
          if (!envelope.openingIds.includes(opening.id)) {
            envelope.openingIds.push(opening.id);
          }
        }
      }
    }
  }

  // Build site → site_features reverse mapping (v1.1)
  if (grouped.sites && grouped.site_features) {
    for (const site of grouped.sites) {
      if (!site.siteFeatureIds) {
        site.siteFeatureIds = [];
      }

      for (const feature of grouped.site_features) {
        if (feature.siteId === site.id) {
          if (!site.siteFeatureIds.includes(feature.id)) {
            site.siteFeatureIds.push(feature.id);
          }
        }
      }
    }
  }

  // Build construction_package → assignedEntityIds reverse mapping (v1.1)
  if (grouped.construction_packages && grouped.construction_packages.length > 0) {
    const allTaggable = [
      ...(grouped.spaces || []),
      ...(grouped.systems || []),
      ...(grouped.assets || []),
      ...(grouped.envelopes || []),
      ...(grouped.openings || []),
      ...(grouped.site_features || [])
    ];

    for (const pkg of grouped.construction_packages) {
      if (!pkg.assignedEntityIds) {
        pkg.assignedEntityIds = [];
      }

      for (const entity of allTaggable) {
        if (entity.constructionPackageId === pkg.id) {
          if (!pkg.assignedEntityIds.includes(entity.id)) {
            pkg.assignedEntityIds.push(entity.id);
          }
        }
      }
    }
  }

  return grouped;
}

/**
 * Resolve multi-level spaces
 *
 * For each space:
 * - If levelIds is provided, validate levelId is in it and set isMultiLevel
 * - If levelIds is not provided, auto-compute as [levelId]
 */
function resolveMultiLevelSpaces(grouped, logger) {
  let multiLevelCount = 0;

  for (const space of grouped.spaces) {
    if (space.levelIds && space.levelIds.length > 0) {
      // Validate levelId is in levelIds
      if (space.levelId && !space.levelIds.includes(space.levelId)) {
        space.levelIds.unshift(space.levelId);
        logger.debug(`Space ${space.id}: prepended primary levelId to levelIds`);
      }
      space.isMultiLevel = space.levelIds.length > 1;
      if (space.isMultiLevel) multiLevelCount++;
    } else {
      // Auto-compute levelIds from levelId
      space.levelIds = space.levelId ? [space.levelId] : [];
      space.isMultiLevel = false;
    }
  }

  if (multiLevelCount > 0) {
    logger.debug(`Resolved ${multiLevelCount} multi-level space(s)`);
  }
}

/**
 * Resolve construction packages: validate references and compute per-package cost summaries.
 * Supports both standalone construction_package entities (v1.1) and legacy project.constructionPackages (v0.6).
 */
function resolveConstructionPackages(grouped, project, logger) {
  // Migrate legacy inline packages to standalone entities if no standalone entities exist
  const legacyPackages = project.constructionPackages || [];
  if (legacyPackages.length > 0 && grouped.construction_packages.length === 0) {
    const existingIds = new Set(grouped.construction_packages.map(p => p.id));
    for (const pkg of legacyPackages) {
      if (!existingIds.has(pkg.id)) {
        grouped.construction_packages.push({
          id: pkg.id,
          entityType: 'construction_package',
          documentType: 'construction_package',
          packageName: pkg.name,
          description: pkg.description,
          sequence: pkg.sequence,
          plannedStart: pkg.plannedStart,
          plannedEnd: pkg.plannedEnd,
          actualStart: pkg.actualStart,
          actualEnd: pkg.actualEnd,
          status: pkg.status,
          version: '1.0.0',
          _migrated: true
        });
        logger.debug(`Migrated legacy construction package ${pkg.id} to standalone entity`);
      }
    }
  }

  const packages = grouped.construction_packages;
  if (packages.length === 0) return;

  const packageMap = new Map(packages.map(p => [p.id, p]));
  const packageCosts = new Map();
  for (const pkg of packages) {
    packageCosts.set(pkg.id, { totalCost: 0, currency: null, entityCount: 0 });
  }

  // Collect entities that can have constructionPackageId (v1.1: includes openings and site_features)
  const taggedEntities = [
    ...(grouped.spaces || []),
    ...(grouped.systems || []),
    ...(grouped.assets || []),
    ...(grouped.envelopes || []),
    ...(grouped.openings || []),
    ...(grouped.site_features || [])
  ];

  for (const entity of taggedEntities) {
    if (!entity.constructionPackageId) continue;
    const summary = packageCosts.get(entity.constructionPackageId);
    if (!summary) {
      logger.debug(`  Warning: ${entity.id} references unknown construction package ${entity.constructionPackageId}`);
      continue;
    }
    summary.entityCount++;
    if (entity.cost?.totalCost) {
      summary.totalCost += entity.cost.totalCost;
      if (entity.cost.currency) summary.currency = entity.cost.currency;
    }
  }

  // Write summaries to standalone package entities
  for (const pkg of packages) {
    const summary = packageCosts.get(pkg.id);
    if (summary.entityCount > 0) {
      pkg.costSummary = {
        totalCost: summary.totalCost,
        currency: summary.currency || project.budget?.currency || 'EUR',
        entityCount: summary.entityCount
      };
    }
  }

  // Also update legacy project packages if they exist (backward compatibility)
  if (legacyPackages.length > 0) {
    for (const pkg of legacyPackages) {
      const summary = packageCosts.get(pkg.id);
      if (summary && summary.entityCount > 0) {
        pkg.costSummary = {
          totalCost: summary.totalCost,
          currency: summary.currency || project.budget?.currency || 'EUR',
          entityCount: summary.entityCount
        };
      }
    }
  }

  logger.debug(`✓ Construction packages: ${packages.length} packages, ${taggedEntities.filter(e => e.constructionPackageId).length} tagged entities`);
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
  if (grouped.assets.length > 0 && grouped.asset_types.length > 0) {
    const typeMap = new Map(grouped.asset_types.map(t => [t.id, t]));

    for (const asset of grouped.assets) {
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

  // Opening Type → Opening (v1.1)
  if (grouped.openings.length > 0 && grouped.opening_types.length > 0) {
    const typeMap = new Map(grouped.opening_types.map(t => [t.id, t]));

    for (const opening of grouped.openings) {
      const typeId = opening.openingTypeId;
      if (!typeId) continue;

      const openingType = typeMap.get(typeId);
      if (!openingType) {
        logger.warn(`Opening ${opening.id} references unknown opening type: ${typeId}`);
        continue;
      }

      for (const field of ['frameMaterial', 'glazingType', 'operability', 'manufacturer', 'productCode', 'expectedLifeYears', 'securityRating']) {
        if (inheritField(opening, field, openingType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }

      // Inherit nested objects
      for (const objField of ['thermalPerformance', 'acousticPerformance', 'firePerformance', 'accessibilityCompliance']) {
        if (openingType[objField] && !opening[objField]) {
          opening[objField] = { ...openingType[objField] };
          opening[`${objField}_meta`] = {
            confidence: 'specified',
            resolution: 'type_default',
            inheritedFrom: typeId,
            inheritedField: objField
          };
          inherited++;
        }
      }
    }
  }

  // Site Feature Type → Site Feature (v1.1)
  if (grouped.site_features.length > 0 && grouped.site_feature_types.length > 0) {
    const typeMap = new Map(grouped.site_feature_types.map(t => [t.id, t]));

    for (const feature of grouped.site_features) {
      const typeId = feature.siteFeatureTypeId;
      if (!typeId) continue;

      const featureType = typeMap.get(typeId);
      if (!featureType) {
        logger.warn(`Site feature ${feature.id} references unknown site feature type: ${typeId}`);
        continue;
      }

      for (const field of ['manufacturer', 'expectedLifeYears']) {
        if (inheritField(feature, field, featureType[field], 'type_default', typeId, field)) {
          inherited++;
        }
      }

      // Inherit nested objects
      for (const objField of ['maintenanceRequirements', 'sustainabilityMetrics']) {
        const targetField = objField === 'maintenanceRequirements' ? 'maintenanceSchedule' : 'sustainabilityMetrics';
        if (featureType[objField] && !feature[targetField]) {
          feature[targetField] = { ...featureType[objField] };
          feature[`${targetField}_meta`] = {
            confidence: 'specified',
            resolution: 'type_default',
            inheritedFrom: typeId,
            inheritedField: objField
          };
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
  // Look for project_specification document (legacy documentType or entityType: project)
  const projectSpec = entities.find(e =>
    e.documentType === 'project_specification' ||
    e.entityType === 'project' ||
    e.entityType === 'project_specification'
  );

  if (projectSpec) {
    const result = {
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
    // Pass through constructionPackages if defined (v0.6)
    if (projectSpec.constructionPackages) {
      result.constructionPackages = projectSpec.constructionPackages;
    }
    // Pass through departments if defined (v0.3)
    if (projectSpec.departments) {
      result.departments = projectSpec.departments;
    }
    return result;
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

  // Step 2.5: Aggregate building costs to sites
  if (grouped.sites && grouped.buildings) {
    for (const site of grouped.sites) {
      let siteCost = 0;
      const contributingBuildings = [];

      for (const building of grouped.buildings) {
        if (building.siteId === site.id && building.cost?.totalCost) {
          siteCost += building.cost.totalCost;
          contributingBuildings.push({
            id: building.id,
            name: building.buildingName || building.name || building.id,
            cost: building.cost.totalCost
          });
        }
      }

      if (siteCost > 0) {
        site.cost = site.cost || {};
        site.cost.totalCost = siteCost;
        site.cost.currency = currency;
        site.cost.basis = 'rollup_from_buildings';
        site.cost._meta = {
          confidence: 'calculated',
          source: 'compiler_cost_rollup',
          resolution: 'calculated',
          notes: `Aggregated from ${contributingBuildings.length} buildings`,
          contributingEntities: contributingBuildings
        };
      }
    }
  }

  // Step 2.75: Aggregate envelope costs to buildings
  if (grouped.buildings && grouped.envelopes) {
    for (const building of grouped.buildings) {
      let envelopeCost = 0;
      const contributingEnvelopes = [];

      for (const envelope of grouped.envelopes) {
        if (envelope.buildingId === building.id && envelope.cost?.totalCost) {
          envelopeCost += envelope.cost.totalCost;
          contributingEnvelopes.push({
            id: envelope.id,
            name: envelope.envelopeName || envelope.id,
            cost: envelope.cost.totalCost
          });
        }
      }

      if (envelopeCost > 0) {
        // Add to existing building cost (from space→level rollup) or create
        const existingCost = building.cost?.totalCost || 0;
        building.cost = building.cost || {};
        building.cost.totalCost = existingCost + envelopeCost;
        building.cost.currency = currency;
        if (!building.cost._meta) {
          building.cost.basis = 'rollup_from_envelopes';
          building.cost._meta = {
            confidence: 'calculated',
            source: 'compiler_cost_rollup',
            resolution: 'calculated',
            notes: `Aggregated from ${contributingEnvelopes.length} envelopes`,
            contributingEntities: contributingEnvelopes
          };
        } else {
          // Merge envelope costs into existing building meta
          building.cost._meta.notes += ` + ${contributingEnvelopes.length} envelopes`;
          if (building.cost._meta.contributingEntities) {
            building.cost._meta.contributingEntities.push(...contributingEnvelopes);
          }
        }
      }
    }
  }

  // Step 3: Aggregate asset costs to systems
  if (grouped.systems && grouped.assets) {
    for (const system of grouped.systems) {
      let systemCost = 0;
      const contributingAssets = [];

      for (const asset of grouped.assets) {
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

  // Step 3.5: Aggregate subsystem costs to parent systems (bottom-up)
  if (grouped.systems) {
    const systemMap = new Map(grouped.systems.map(s => [s.id, s]));

    // Compute depth for topological ordering (leaves first)
    function getSystemDepth(sys, visited = new Set()) {
      if (visited.has(sys.id)) return 0;
      visited.add(sys.id);
      if (!sys.subsystemIds || sys.subsystemIds.length === 0) return 0;
      return 1 + Math.max(...sys.subsystemIds.map(id => {
        const child = systemMap.get(id);
        return child ? getSystemDepth(child, visited) : 0;
      }));
    }

    const sorted = [...grouped.systems].sort((a, b) => getSystemDepth(a) - getSystemDepth(b));

    for (const system of sorted) {
      if (!system.subsystemIds || system.subsystemIds.length === 0) continue;

      let subsystemCost = 0;
      const contributingSubsystems = [];

      for (const subId of system.subsystemIds) {
        const sub = systemMap.get(subId);
        if (sub?.cost?.totalCost) {
          subsystemCost += sub.cost.totalCost;
          contributingSubsystems.push({
            id: sub.id, name: sub.systemName, cost: sub.cost.totalCost
          });
        }
      }

      if (subsystemCost > 0) {
        system.cost = system.cost || {};
        const existing = system.cost.totalCost || 0;
        system.cost.totalCost = existing + subsystemCost;
        system.cost.currency = currency;
        if (system.cost._meta) {
          system.cost._meta.notes += ` + ${contributingSubsystems.length} subsystems`;
          system.cost._meta.contributingEntities = [
            ...(system.cost._meta.contributingEntities || []),
            ...contributingSubsystems
          ];
        } else {
          system.cost.basis = 'rollup_from_subsystems';
          system.cost._meta = {
            confidence: 'calculated',
            source: 'compiler_cost_rollup',
            resolution: 'calculated',
            notes: `Aggregated from ${contributingSubsystems.length} subsystem(s)`,
            contributingEntities: contributingSubsystems
          };
        }
        logger.debug(`  System ${system.id}: ${currency} ${system.cost.totalCost} (includes ${contributingSubsystems.length} subsystems)`);
      }
    }
  }

  // Step 4: Aggregate building + system costs to project
  let projectConstructionCost = 0;
  let projectEquipmentCost = 0;
  const contributingBuildings = [];
  const contributingSystems = [];

  // Prefer sites if available, else use buildings directly
  if (grouped.sites && grouped.sites.length > 0) {
    for (const site of grouped.sites) {
      if (site.cost?.totalCost) {
        projectConstructionCost += site.cost.totalCost;
        contributingBuildings.push({
          id: site.id,
          name: site.siteName || site.id,
          cost: site.cost.totalCost,
          type: 'site'
        });
      }
    }
  } else if (grouped.buildings) {
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
    // Only count root systems (no parentSystemId) to avoid double-counting
    for (const system of grouped.systems) {
      if (system.parentSystemId) continue;
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
 * Perform simulation tracking (v0.4 feature)
 *
 * Aggregates simulation results from spaces → project
 * Tracks simulation status, results, and compliance
 *
 * @param {object} grouped - Grouped entities
 * @param {object} project - Project metadata
 * @param {object} logger - Logger instance
 */
function performSimulationTracking(grouped, project, logger) {
  const simulationTypes = ['daylighting', 'thermal', 'acoustic', 'cfd', 'airflow', 'energy'];
  const simulationSummary = {
    totalSimulations: 0,
    byType: {},
    byStatus: {
      planned: 0,
      in_progress: 0,
      completed: 0,
      failed: 0
    },
    bySpace: [],
    completionRate: 0
  };

  // Initialize type tracking
  for (const type of simulationTypes) {
    simulationSummary.byType[type] = {
      total: 0,
      completed: 0,
      failed: 0,
      pending: 0,
      spaces: []
    };
  }

  // Collect all simulations from spaces
  if (grouped.spaces) {
    for (const space of grouped.spaces) {
      if (space.simulations && Array.isArray(space.simulations) && space.simulations.length > 0) {
        simulationSummary.totalSimulations += space.simulations.length;

        for (const sim of space.simulations) {
          const type = sim.type || 'unknown';
          const status = sim.status || 'planned';

          // Track by status
          if (simulationSummary.byStatus[status] !== undefined) {
            simulationSummary.byStatus[status]++;
          }

          // Track by type
          if (simulationSummary.byType[type]) {
            simulationSummary.byType[type].total++;

            if (status === 'completed') {
              simulationSummary.byType[type].completed++;
            } else if (status === 'failed') {
              simulationSummary.byType[type].failed++;
            } else {
              simulationSummary.byType[type].pending++;
            }

            simulationSummary.byType[type].spaces.push({
              spaceId: space.id,
              spaceName: space.spaceName,
              simulationId: sim.id,
              status: status,
              tool: sim.tool,
              executionDate: sim.executionDate
            });
          }
        }

        simulationSummary.bySpace.push({
          spaceId: space.id,
          spaceName: space.spaceName,
          simulationCount: space.simulations.length,
          types: [...new Set(space.simulations.map(s => s.type))]
        });
      }
    }
  }

  // Calculate completion rate
  if (simulationSummary.totalSimulations > 0) {
    simulationSummary.completionRate =
      (simulationSummary.byStatus.completed / simulationSummary.totalSimulations * 100).toFixed(1);
  }

  // Add to project if any simulations found
  if (simulationSummary.totalSimulations > 0) {
    project.simulationSummary = {
      ...simulationSummary,
      _meta: {
        confidence: 'calculated',
        source: 'compiler_simulation_tracking',
        resolution: 'calculated',
        notes: `Aggregated from ${simulationSummary.bySpace.length} spaces`,
        timestamp: new Date().toISOString()
      }
    };

    logger.debug(`✓ Simulation tracking: ${simulationSummary.totalSimulations} simulations, ${simulationSummary.completionRate}% complete`);
  } else {
    logger.debug('! No simulation data found for tracking');
  }
}

/**
 * Perform performance targets aggregation (v0.4 feature)
 *
 * Aggregates performance targets from spaces → project
 * Calculates averages, ranges, and compliance metrics
 *
 * @param {object} grouped - Grouped entities
 * @param {object} project - Project metadata
 * @param {object} logger - Logger instance
 */
function performPerformanceAggregation(grouped, project, logger) {
  const performanceCategories = ['daylighting', 'indoorAirQuality', 'acousticPerformance', 'thermalComfort', 'energyPerformance', 'embodiedCarbon'];
  const performanceSummary = {
    spacesWithTargets: 0,
    totalSpaces: 0,
    targetCoverage: 0,
    byCategory: {}
  };

  // Initialize category tracking
  for (const category of performanceCategories) {
    performanceSummary.byCategory[category] = {
      spacesWithTargets: 0,
      spaces: []
    };
  }

  // Collect performance targets from spaces
  if (grouped.spaces) {
    performanceSummary.totalSpaces = grouped.spaces.length;

    for (const space of grouped.spaces) {
      let spaceHasTargets = false;

      if (space.performanceTargets) {
        for (const category of performanceCategories) {
          if (space.performanceTargets[category]) {
            spaceHasTargets = true;
            performanceSummary.byCategory[category].spacesWithTargets++;
            performanceSummary.byCategory[category].spaces.push({
              spaceId: space.id,
              spaceName: space.spaceName,
              targets: space.performanceTargets[category]
            });
          }
        }
      }

      if (spaceHasTargets) {
        performanceSummary.spacesWithTargets++;
      }
    }

    // Calculate coverage
    if (performanceSummary.totalSpaces > 0) {
      performanceSummary.targetCoverage =
        (performanceSummary.spacesWithTargets / performanceSummary.totalSpaces * 100).toFixed(1);
    }
  }

  // Calculate aggregated metrics for each category
  for (const category of performanceCategories) {
    const categoryData = performanceSummary.byCategory[category];

    if (categoryData.spacesWithTargets > 0) {
      // Add aggregated metrics based on category
      if (category === 'energyPerformance') {
        let totalHeating = 0;
        let totalCooling = 0;
        let totalEnergy = 0;
        let count = 0;

        for (const spaceData of categoryData.spaces) {
          const targets = spaceData.targets;
          if (targets.heatingDemand) {
            totalHeating += targets.heatingDemand;
            count++;
          }
          if (targets.coolingDemand) {
            totalCooling += targets.coolingDemand;
          }
          if (targets.totalEnergyUse) {
            totalEnergy += targets.totalEnergyUse;
          }
        }

        if (count > 0) {
          categoryData.aggregated = {
            averageHeatingDemand: (totalHeating / count).toFixed(2),
            averageCoolingDemand: (totalCooling / count).toFixed(2),
            projectTotalEnergy: totalEnergy.toFixed(2),
            unit: 'kWh/m²/year'
          };
        }
      } else if (category === 'embodiedCarbon') {
        let totalConstruction = 0;
        let totalOperational = 0;
        let count = 0;

        for (const spaceData of categoryData.spaces) {
          const targets = spaceData.targets;
          if (targets.construction?.total) {
            totalConstruction += targets.construction.total;
            count++;
          }
          if (targets.operations?.totalOperational) {
            totalOperational += targets.operations.totalOperational;
          }
        }

        if (count > 0) {
          categoryData.aggregated = {
            totalConstructionCarbon: totalConstruction.toFixed(2),
            totalOperationalCarbon: totalOperational.toFixed(2),
            totalWholeLifeCarbon: (totalConstruction + totalOperational).toFixed(2),
            unit: 'kgCO2e'
          };
        }
      }
    }
  }

  // Add to project if any performance targets found
  if (performanceSummary.spacesWithTargets > 0) {
    project.performanceSummary = {
      ...performanceSummary,
      _meta: {
        confidence: 'calculated',
        source: 'compiler_performance_aggregation',
        resolution: 'calculated',
        notes: `Aggregated from ${performanceSummary.spacesWithTargets} spaces with performance targets`,
        timestamp: new Date().toISOString()
      }
    };

    const categoriesWithData = performanceCategories.filter(c =>
      performanceSummary.byCategory[c].spacesWithTargets > 0
    ).length;

    logger.debug(`✓ Performance aggregation: ${performanceSummary.spacesWithTargets} spaces, ${categoriesWithData} categories tracked`);
  } else {
    logger.debug('! No performance target data found for aggregation');
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
  logger.debug(`Grouped: ${grouped.sites.length} sites, ${grouped.envelopes.length} envelopes, ${grouped.spaces.length} spaces, ${grouped.zones.length} zones, ${grouped.requirements.length} requirements, ${grouped.space_types.length} space types, ${grouped.openings.length} openings, ${grouped.site_features.length} site features, ${grouped.construction_packages.length} construction packages`);

  // Resolve type→instance inheritance (before relationships, so inherited fields participate)
  grouped = resolveTypeInheritance(grouped, logger);

  // Resolve level→space inheritance (after type, so type values take priority over level)
  grouped = resolveLevelInheritance(grouped, logger);

  // Resolve multi-level spaces (compute levelIds and isMultiLevel)
  resolveMultiLevelSpaces(grouped, logger);

  // Compute derived relationships
  grouped = computeRelationships(grouped);
  logger.debug('Computed reverse relationships (zone→spaces, system→assets, level→spaces)');

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

  // Stage 2.6: Simulation Tracking (v0.4 feature)
  logger.debug('Aggregating simulation results...');
  performSimulationTracking(grouped, project, logger);

  // Stage 2.7: Performance Targets Aggregation (v0.4 feature)
  logger.debug('Aggregating performance targets...');
  performPerformanceAggregation(grouped, project, logger);

  // Stage 2.8: Construction Packages (v0.6 feature)
  resolveConstructionPackages(grouped, project, logger);

  // Build normalized output structure
  const normalized = {
    project,
    entities: {
      ...(grouped.sites.length > 0 && { sites: grouped.sites }),
      ...(grouped.envelopes.length > 0 && { envelopes: grouped.envelopes }),
      ...(grouped.vertical_circulations.length > 0 && { vertical_circulations: grouped.vertical_circulations }),
      ...(grouped.buildings.length > 0 && { buildings: grouped.buildings }),
      ...(grouped.levels.length > 0 && { levels: grouped.levels }),
      ...(grouped.zones.length > 0 && { zones: grouped.zones }),
      ...(grouped.spaces.length > 0 && { spaces: grouped.spaces }),
      ...(grouped.systems.length > 0 && { systems: grouped.systems }),
      ...(grouped.assets.length > 0 && { assets: grouped.assets }),
      ...(grouped.requirements.length > 0 && { requirements: grouped.requirements }),
      ...(grouped.space_types.length > 0 && { space_types: grouped.space_types }),
      ...(grouped.zone_types.length > 0 && { zone_types: grouped.zone_types }),
      ...(grouped.system_types.length > 0 && { system_types: grouped.system_types }),
      ...(grouped.asset_types.length > 0 && { asset_types: grouped.asset_types }),
      ...(grouped.openings.length > 0 && { openings: grouped.openings }),
      ...(grouped.opening_types.length > 0 && { opening_types: grouped.opening_types }),
      ...(grouped.site_features.length > 0 && { site_features: grouped.site_features }),
      ...(grouped.site_feature_types.length > 0 && { site_feature_types: grouped.site_feature_types }),
      ...(grouped.construction_packages.length > 0 && { construction_packages: grouped.construction_packages })
    },
    metadata: {
      totalEntities: rawEntities.length,
      entitiesByType: {
        sites: grouped.sites.length,
        envelopes: grouped.envelopes.length,
        vertical_circulations: grouped.vertical_circulations.length,
        buildings: grouped.buildings.length,
        levels: grouped.levels.length,
        zones: grouped.zones.length,
        spaces: grouped.spaces.length,
        systems: grouped.systems.length,
        assets: grouped.assets.length,
        requirements: grouped.requirements.length,
        space_types: grouped.space_types.length,
        zone_types: grouped.zone_types.length,
        system_types: grouped.system_types.length,
        asset_types: grouped.asset_types.length,
        openings: grouped.openings.length,
        opening_types: grouped.opening_types.length,
        site_features: grouped.site_features.length,
        site_feature_types: grouped.site_feature_types.length,
        construction_packages: grouped.construction_packages.length
      }
    }
  };

  return normalized;
}
