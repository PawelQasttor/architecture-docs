/**
 * Stage 3: Validate
 *
 * - Validate against JSON schema
 * - Check referential integrity (all referenced IDs exist)
 * - Check business rules (requirements applicable to scope)
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load JSON schema
 */
async function loadSchema() {
  const schemaPath = path.join(__dirname, '../../../schemas/sbm-schema-v0.1.json');
  const schemaContent = await fs.readFile(schemaPath, 'utf-8');
  return JSON.parse(schemaContent);
}

/**
 * Validate against JSON schema
 */
async function validateSchema(sbm, logger) {
  logger.debug('Loading JSON schema...');
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

  logger.debug('✓ JSON schema validation passed');
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
    }
  }

  // Check system → asset references
  if (sbm.entities.systems) {
    for (const system of sbm.entities.systems) {
      if (system.assetInstanceIds) {
        for (const assetId of system.assetInstanceIds) {
          if (!allIds.has(assetId)) {
            errors.push({
              path: `systems/${system.id}/assetInstanceIds`,
              message: `Referenced asset "${assetId}" does not exist`
            });
          }
        }
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

  if (warnings.length === 0) {
    logger.debug('✓ Business rules check passed');
  } else {
    logger.debug(`! Business rules check found ${warnings.length} warnings`);
  }

  return warnings;
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

  // All validation passed
  return {
    valid: true,
    errors: [],
    warnings: [...integrityResult.warnings, ...businessWarnings]
  };
}
