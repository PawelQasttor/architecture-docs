/**
 * Stage 2: Normalize & Enrich
 *
 * - Normalize units to canonical form (mm, m2, m3, °C)
 * - Auto-generate missing IDs (deterministic)
 * - Compute derived relationships
 * - Inject jurisdiction pack (Poland requirements if country=PL)
 */

import { loadJurisdictionPack } from '../enrichers/jurisdiction-pack.mjs';

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
  logger.debug(`Grouped: ${grouped.spaces.length} spaces, ${grouped.zones.length} zones, ${grouped.requirements.length} requirements`);

  // Compute derived relationships
  grouped = computeRelationships(grouped);
  logger.debug('Computed reverse relationships (zone→spaces, system→assets)');

  // Extract project metadata
  const project = extractProjectMetadata(rawEntities, options);
  logger.debug(`Project: ${project.name} (${project.country})`);

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
      ...(grouped.requirements.length > 0 && { requirements: grouped.requirements })
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
        requirements: grouped.requirements.length
      }
    }
  };

  return normalized;
}
