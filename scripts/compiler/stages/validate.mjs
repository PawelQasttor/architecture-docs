/**
 * Stage 3: Validate
 *
 * - Validate against JSON schema (v1.0)
 * - Check referential integrity (all referenced IDs exist)
 * - Check business rules (requirements applicable to scope)
 * - Check data provenance (source required for high confidence)
 * - Enforce phase gates (stricter rules at later project phases)
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { SAFETY_CRITICAL_FIELDS, SAFETY_CRITICAL_ENV_FIELDS } from '../constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load JSON schema
 */
async function loadSchema() {
  const schemaPath = path.join(__dirname, '../../../schemas/sbm-schema-v1.1.json');
  const schemaContent = await fs.readFile(schemaPath, 'utf-8');
  return JSON.parse(schemaContent);
}

/**
 * Validate against JSON schema
 */
async function validateSchema(sbm, logger) {
  logger.debug('Loading JSON schema (v1.0)...');
  const schema = await loadSchema();

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(sbm);

  if (!valid) {
    return {
      valid: false,
      errors: validate.errors.map(err => ({
        path: err.instancePath || '(root)',
        message: err.message,
        params: err.params
      }))
    };
  }

  logger.debug('✓ JSON schema validation passed (v1.1)');
  return { valid: true, errors: [] };
}

/**
 * Check referential integrity
 *
 * Ensures all referenced IDs actually exist in the model
 */
function checkReferentialIntegrity(sbm, logger) {
  const errors = [];
  const warnings = [];

  // Build ID index
  const allIds = new Set();
  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (Array.isArray(entities)) {
      entities.forEach(entity => {
        if (entity.id) {
          allIds.add(entity.id);
        }
      });
    }
  }

  logger.debug(`ID index built: ${allIds.size} unique IDs`);

  // Check building → site references
  if (sbm.entities.buildings) {
    for (const building of sbm.entities.buildings) {
      if (building.siteId && !allIds.has(building.siteId)) {
        warnings.push({
          path: `buildings/${building.id}/siteId`,
          message: `Referenced site "${building.siteId}" does not exist`
        });
      }
    }
  }

  // Check space → zone references
  if (sbm.entities.spaces) {
    for (const space of sbm.entities.spaces) {
      if (space.zoneIds) {
        for (const zoneId of space.zoneIds) {
          if (!allIds.has(zoneId)) {
            errors.push({
              path: `spaces/${space.id}/zoneIds`,
              message: `Referenced zone "${zoneId}" does not exist`
            });
          }
        }
      }

      // Check requirement references
      if (space.requirements) {
        for (const reqId of space.requirements) {
          if (!allIds.has(reqId)) {
            warnings.push({
              path: `spaces/${space.id}/requirements`,
              message: `Referenced requirement "${reqId}" does not exist (may be in jurisdiction pack)`
            });
          }
        }
      }

      // Check adjacent space references
      if (space.adjacentSpaces) {
        for (const adj of space.adjacentSpaces) {
          if (!allIds.has(adj.id)) {
            errors.push({
              path: `spaces/${space.id}/adjacentSpaces`,
              message: `Referenced adjacent space "${adj.id}" does not exist`
            });
          }
        }
      }

      // Check spaceTypeId reference
      if (space.spaceTypeId && !allIds.has(space.spaceTypeId)) {
        warnings.push({
          path: `spaces/${space.id}/spaceTypeId`,
          message: `Referenced space type "${space.spaceTypeId}" does not exist`
        });
      }

      // Check levelId reference
      if (space.levelId && !allIds.has(space.levelId)) {
        warnings.push({
          path: `spaces/${space.id}/levelId`,
          message: `Referenced level "${space.levelId}" does not exist`
        });
      }

      // Check levelIds references (multi-level spaces)
      if (space.levelIds) {
        for (const levelId of space.levelIds) {
          if (!allIds.has(levelId)) {
            warnings.push({
              path: `spaces/${space.id}/levelIds`,
              message: `Referenced level "${levelId}" does not exist`
            });
          }
        }
      }
    }
  }

  // Check system → asset references
  if (sbm.entities.systems) {
    for (const system of sbm.entities.systems) {
      if (system.assetIds) {
        for (const assetId of system.assetIds) {
          if (!allIds.has(assetId)) {
            warnings.push({
              path: `systems/${system.id}/assetIds`,
              message: `Referenced asset "${assetId}" does not exist (may not be defined yet)`
            });
          }
        }
      }

      // Check systemTypeId reference
      if (system.systemTypeId && !allIds.has(system.systemTypeId)) {
        warnings.push({
          path: `systems/${system.id}/systemTypeId`,
          message: `Referenced system type "${system.systemTypeId}" does not exist`
        });
      }

      // Check parentSystemId reference
      if (system.parentSystemId) {
        if (!allIds.has(system.parentSystemId)) {
          warnings.push({
            path: `systems/${system.id}/parentSystemId`,
            message: `Referenced parent system "${system.parentSystemId}" does not exist`
          });
        } else if (system.parentSystemId === system.id) {
          errors.push({
            path: `systems/${system.id}/parentSystemId`,
            message: `System references itself as parent (circular reference)`
          });
        }
      }
    }

    // Detect circular system hierarchies (A→B→C→A) with precise cycle reporting
    const systemMap = new Map(sbm.entities.systems.map(s => [s.id, s]));
    for (const system of sbm.entities.systems) {
      if (!system.parentSystemId) continue;
      const visited = [];
      let current = system;
      while (current?.parentSystemId) {
        if (visited.includes(current.id)) {
          const cycleStart = visited.indexOf(current.id);
          const cyclePath = visited.slice(cycleStart);
          errors.push({
            path: `systems/${system.id}/parentSystemId`,
            message: `Circular system hierarchy detected: ${cyclePath.join(' → ')} → ${current.id}`
          });
          break;
        }
        visited.push(current.id);
        current = systemMap.get(current.parentSystemId);
      }
    }
  }

  // Check envelope → building and boundarySpaceIds references
  if (sbm.entities.envelopes) {
    for (const envelope of sbm.entities.envelopes) {
      if (envelope.buildingId && !allIds.has(envelope.buildingId)) {
        warnings.push({
          path: `envelopes/${envelope.id}/buildingId`,
          message: `Referenced building "${envelope.buildingId}" does not exist`
        });
      }

      if (envelope.boundarySpaceIds) {
        for (const spaceId of envelope.boundarySpaceIds) {
          if (!allIds.has(spaceId)) {
            warnings.push({
              path: `envelopes/${envelope.id}/boundarySpaceIds`,
              message: `Referenced boundary space "${spaceId}" does not exist`
            });
          }
        }
      }

      if (envelope.levelIds) {
        for (const levelId of envelope.levelIds) {
          if (!allIds.has(levelId)) {
            warnings.push({
              path: `envelopes/${envelope.id}/levelIds`,
              message: `Referenced level "${levelId}" does not exist`
            });
          }
        }
      }
    }
  }

  // Check vertical_circulation → building, level, space references
  if (sbm.entities.vertical_circulations) {
    for (const vc of sbm.entities.vertical_circulations) {
      if (vc.buildingId && !allIds.has(vc.buildingId)) {
        warnings.push({
          path: `vertical_circulations/${vc.id}/buildingId`,
          message: `Referenced building "${vc.buildingId}" does not exist`
        });
      }

      if (vc.connectedLevelIds) {
        for (const levelId of vc.connectedLevelIds) {
          if (!allIds.has(levelId)) {
            warnings.push({
              path: `vertical_circulations/${vc.id}/connectedLevelIds`,
              message: `Referenced level "${levelId}" does not exist`
            });
          }
        }
      }

      if (vc.servedSpaceIds) {
        for (const spaceId of vc.servedSpaceIds) {
          if (!allIds.has(spaceId)) {
            warnings.push({
              path: `vertical_circulations/${vc.id}/servedSpaceIds`,
              message: `Referenced space "${spaceId}" does not exist`
            });
          }
        }
      }
    }
  }

  // Check zone → zoneTypeId references
  if (sbm.entities.zones) {
    for (const zone of sbm.entities.zones) {
      if (zone.zoneTypeId && !allIds.has(zone.zoneTypeId)) {
        warnings.push({
          path: `zones/${zone.id}/zoneTypeId`,
          message: `Referenced zone type "${zone.zoneTypeId}" does not exist`
        });
      }
    }
  }

  // Check opening references (v1.1)
  if (sbm.entities.openings) {
    for (const opening of sbm.entities.openings) {
      if (opening.envelopeId && !allIds.has(opening.envelopeId)) {
        errors.push({
          path: `openings/${opening.id}/envelopeId`,
          message: `Referenced envelope "${opening.envelopeId}" does not exist`
        });
      }
      if (opening.openingTypeId && !allIds.has(opening.openingTypeId)) {
        warnings.push({
          path: `openings/${opening.id}/openingTypeId`,
          message: `Referenced opening type "${opening.openingTypeId}" does not exist`
        });
      }
      if (opening.levelId && !allIds.has(opening.levelId)) {
        warnings.push({
          path: `openings/${opening.id}/levelId`,
          message: `Referenced level "${opening.levelId}" does not exist`
        });
      }
      if (opening.spaceIds) {
        for (const spaceId of opening.spaceIds) {
          if (!allIds.has(spaceId)) {
            warnings.push({
              path: `openings/${opening.id}/spaceIds`,
              message: `Referenced space "${spaceId}" does not exist`
            });
          }
        }
      }
    }
  }

  // Check site_feature references (v1.1)
  if (sbm.entities.site_features) {
    for (const feature of sbm.entities.site_features) {
      if (feature.siteId && !allIds.has(feature.siteId)) {
        errors.push({
          path: `site_features/${feature.id}/siteId`,
          message: `Referenced site "${feature.siteId}" does not exist`
        });
      }
      if (feature.siteFeatureTypeId && !allIds.has(feature.siteFeatureTypeId)) {
        warnings.push({
          path: `site_features/${feature.id}/siteFeatureTypeId`,
          message: `Referenced site feature type "${feature.siteFeatureTypeId}" does not exist`
        });
      }
    }
  }

  // Check construction_package references (v1.1)
  if (sbm.entities.construction_packages) {
    const cpMap = new Map(sbm.entities.construction_packages.map(cp => [cp.id, cp]));

    for (const pkg of sbm.entities.construction_packages) {
      if (pkg.buildingId && !allIds.has(pkg.buildingId)) {
        warnings.push({
          path: `construction_packages/${pkg.id}/buildingId`,
          message: `Referenced building "${pkg.buildingId}" does not exist`
        });
      }

      if (pkg.dependencies) {
        for (const dep of pkg.dependencies) {
          if (!cpMap.has(dep.packageId)) {
            errors.push({
              path: `construction_packages/${pkg.id}/dependencies`,
              message: `Referenced dependency package "${dep.packageId}" does not exist`
            });
          }
        }
      }
    }

    // Detect circular construction package dependencies
    for (const pkg of sbm.entities.construction_packages) {
      if (!pkg.dependencies || pkg.dependencies.length === 0) continue;
      const visited = [];
      let currentId = pkg.id;
      let hasCircle = false;

      while (currentId) {
        if (visited.includes(currentId)) {
          const cycleStart = visited.indexOf(currentId);
          const cyclePath = visited.slice(cycleStart);
          errors.push({
            path: `construction_packages/${pkg.id}/dependencies`,
            message: `Circular dependency detected: ${cyclePath.join(' → ')} → ${currentId}`
          });
          hasCircle = true;
          break;
        }
        visited.push(currentId);
        const current = cpMap.get(currentId);
        if (!current?.dependencies || current.dependencies.length === 0) break;
        currentId = current.dependencies[0].packageId;
      }
    }
  }

  // Check constructionPackageId references on entities (v1.1: includes standalone packages)
  const packageIds = new Set([
    ...(sbm.project?.constructionPackages || []).map(p => p.id),
    ...(sbm.entities.construction_packages || []).map(p => p.id)
  ]);
  if (packageIds.size > 0) {
    const checkableEntities = [
      ...(sbm.entities.spaces || []).map(e => ({ ...e, _type: 'spaces' })),
      ...(sbm.entities.systems || []).map(e => ({ ...e, _type: 'systems' })),
      ...(sbm.entities.assets || []).map(e => ({ ...e, _type: 'assets' })),
      ...(sbm.entities.envelopes || []).map(e => ({ ...e, _type: 'envelopes' })),
      ...(sbm.entities.openings || []).map(e => ({ ...e, _type: 'openings' })),
      ...(sbm.entities.site_features || []).map(e => ({ ...e, _type: 'site_features' }))
    ];
    for (const entity of checkableEntities) {
      if (entity.constructionPackageId && !packageIds.has(entity.constructionPackageId)) {
        warnings.push({
          path: `${entity._type}/${entity.id}/constructionPackageId`,
          message: `Referenced construction package "${entity.constructionPackageId}" does not exist`
        });
      }
    }
  }

  if (errors.length === 0) {
    logger.debug('✓ Referential integrity check passed');
  } else {
    logger.debug(`✗ Referential integrity check found ${errors.length} errors`);
  }

  return { errors, warnings };
}

/**
 * Check business rules
 */
function checkBusinessRules(sbm, logger) {
  const warnings = [];

  // Check: Every space should have at least one zone
  if (sbm.entities.spaces) {
    for (const space of sbm.entities.spaces) {
      if (!space.zoneIds || space.zoneIds.length === 0) {
        warnings.push({
          path: `spaces/${space.id}`,
          message: 'Space has no zone assignments (should belong to at least a fire zone)'
        });
      }
    }
  }

  // Check: Every space should have at least one requirement
  if (sbm.entities.spaces) {
    for (const space of sbm.entities.spaces) {
      if (!space.requirements || space.requirements.length === 0) {
        warnings.push({
          path: `spaces/${space.id}`,
          message: 'Space has no requirements assigned'
        });
      }
    }
  }

  // Check: Spaces with area but no cost estimate (v1.1)
  if (sbm.entities.spaces) {
    for (const space of sbm.entities.spaces) {
      const area = space.area || space.designArea;
      if (area && area > 0 && !space.cost) {
        warnings.push({
          path: `spaces/${space.id}`,
          message: `Space has area (${area} m2) but no cost estimate — cost rollup will be incomplete`,
          rule: 'business:cost_completeness'
        });
      }
    }
  }

  // Check: Duplicate zone membership — space in multiple zones of same type (v1.1)
  if (sbm.entities.zones && sbm.entities.spaces) {
    const zonesByType = {};
    for (const zone of sbm.entities.zones) {
      const zt = zone.zoneCategory || zone.zoneType || 'unknown';
      if (!zonesByType[zt]) zonesByType[zt] = [];
      zonesByType[zt].push(zone);
    }

    for (const [zoneType, zones] of Object.entries(zonesByType)) {
      if (zones.length < 2) continue;
      const spaceToZones = {};
      for (const zone of zones) {
        for (const spaceId of (zone.spaceIds || [])) {
          if (!spaceToZones[spaceId]) spaceToZones[spaceId] = [];
          spaceToZones[spaceId].push(zone.id);
        }
      }
      for (const [spaceId, zoneIds] of Object.entries(spaceToZones)) {
        if (zoneIds.length > 1) {
          warnings.push({
            path: `spaces/${spaceId}`,
            message: `Space belongs to ${zoneIds.length} zones of type "${zoneType}": ${zoneIds.join(', ')}`,
            rule: 'business:duplicate_zone_membership'
          });
        }
      }
    }
  }

  if (warnings.length === 0) {
    logger.debug('✓ Business rules check passed');
  } else {
    logger.debug(`! Business rules check found ${warnings.length} warnings`);
  }

  return warnings;
}

/**
 * Check data provenance
 *
 * Rule 1: Source required for confidence > estimated
 *   If _meta.confidence is measured/calculated/specified AND _meta.source is missing → warning
 *
 * Rule 2: Null without explanation
 *   If field is null AND no _meta with confidence: unknown → warning
 *
 * Rule 3: Inheritance duplication detection
 *   If space explicitly sets a value identical to its inherited value → info
 */
function checkProvenance(sbm, logger) {
  const warnings = [];
  const HIGH_CONFIDENCE = new Set(['measured', 'calculated', 'specified']);

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      const entityId = entity.id || 'unknown';
      const keys = Object.keys(entity);

      for (const key of keys) {
        // Skip internal fields
        if (key.startsWith('_') || key.endsWith('_meta') || key === 'version' ||
            key === 'documentType' || key === 'entityType' || key === 'id') {
          continue;
        }

        const metaKey = `${key}_meta`;
        const meta = entity[metaKey];
        const value = entity[key];

        // Rule 1: High confidence requires source
        if (meta && HIGH_CONFIDENCE.has(meta.confidence) && !meta.source && meta.resolution !== 'inherited' && meta.resolution !== 'type_default') {
          warnings.push({
            path: `${entityType}/${entityId}/${key}`,
            message: `Field has '${meta.confidence}' confidence but no source reference`,
            rule: 'provenance:source_required'
          });
        }

        // Rule 2: Null without explanation
        if ((value === null || value === undefined) && !meta) {
          // Only warn for non-optional structural fields
          // Skip arrays and objects that might just be empty
          if (typeof value !== 'object') {
            warnings.push({
              path: `${entityType}/${entityId}/${key}`,
              message: `Field is null with no _meta explanation (add ${metaKey} with confidence: 'unknown')`,
              rule: 'provenance:null_unexplained'
            });
          }
        }
      }
    }
  }

  if (warnings.length === 0) {
    logger.debug('✓ Provenance check passed');
  } else {
    logger.debug(`! Provenance check found ${warnings.length} warnings`);
  }

  return warnings;
}

/**
 * Enforce phase gates
 *
 * Phase 1-3: All confidence levels accepted
 * Phase 4:   Warn for 'assumed' fields
 * Phase 5+:  Error for 'assumed' on required properties
 * Phase 7+:  Error for 'estimated' on safety-critical properties
 */
function checkPhaseGates(sbm, logger) {
  const phase = sbm.project?.phase || 3;
  const errors = [];
  const warnings = [];

  if (phase < 4) {
    logger.debug(`✓ Phase ${phase}: all confidence levels accepted`);
    return { errors, warnings };
  }

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      const entityId = entity.id || 'unknown';
      const keys = Object.keys(entity);

      for (const key of keys) {
        if (key.startsWith('_') || key.endsWith('_meta') || key === 'version' ||
            key === 'documentType' || key === 'entityType' || key === 'id') {
          continue;
        }

        const metaKey = `${key}_meta`;
        const meta = entity[metaKey];
        if (!meta || !meta.confidence) continue;

        const confidence = meta.confidence;

        // Phase 4+: Warn for assumed
        if (phase >= 4 && confidence === 'assumed') {
          warnings.push({
            path: `${entityType}/${entityId}/${key}`,
            message: `Phase ${phase}: field has 'assumed' confidence — verification needed`,
            rule: 'phase_gate:assumed_warning'
          });
        }

        // Phase 5+: Error for assumed on any field
        if (phase >= 5 && confidence === 'assumed') {
          errors.push({
            path: `${entityType}/${entityId}/${key}`,
            message: `Phase ${phase}: 'assumed' confidence not permitted (must be estimated or better)`,
            rule: 'phase_gate:assumed_error'
          });
        }

        // Phase 7+: Error for estimated on safety-critical
        if (phase >= 7 && confidence === 'estimated' && SAFETY_CRITICAL_FIELDS.has(key)) {
          errors.push({
            path: `${entityType}/${entityId}/${key}`,
            message: `Phase ${phase}: safety-critical field '${key}' has 'estimated' confidence (must be measured/calculated/specified)`,
            rule: 'phase_gate:safety_critical'
          });
        }
      }
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    logger.debug(`✓ Phase gate check passed (phase ${phase})`);
  } else {
    if (errors.length > 0) logger.debug(`✗ Phase gate: ${errors.length} errors`);
    if (warnings.length > 0) logger.debug(`! Phase gate: ${warnings.length} warnings`);
  }

  return { errors, warnings };
}

/**
 * Main validate function
 *
 * @param {object} sbm - Normalized SBM structure
 * @param {object} logger - Logger instance
 * @returns {Promise<object>} - Validation result
 */
export async function validate(sbm, logger) {
  // Step 1: JSON Schema validation
  const schemaResult = await validateSchema(sbm, logger);
  if (!schemaResult.valid) {
    return {
      valid: false,
      errors: schemaResult.errors,
      warnings: []
    };
  }

  // Step 2: Referential integrity
  const integrityResult = checkReferentialIntegrity(sbm, logger);
  if (integrityResult.errors.length > 0) {
    return {
      valid: false,
      errors: integrityResult.errors,
      warnings: integrityResult.warnings
    };
  }

  // Step 3: Business rules
  const businessWarnings = checkBusinessRules(sbm, logger);

  // Step 4: Data provenance
  const provenanceWarnings = checkProvenance(sbm, logger);

  // Step 5: Phase gates
  const phaseResult = checkPhaseGates(sbm, logger);
  if (phaseResult.errors.length > 0) {
    return {
      valid: false,
      errors: phaseResult.errors,
      warnings: [
        ...integrityResult.warnings,
        ...businessWarnings,
        ...provenanceWarnings,
        ...phaseResult.warnings
      ]
    };
  }

  // All validation passed
  return {
    valid: true,
    errors: [],
    warnings: [
      ...integrityResult.warnings,
      ...businessWarnings,
      ...provenanceWarnings,
      ...phaseResult.warnings
    ]
  };
}
