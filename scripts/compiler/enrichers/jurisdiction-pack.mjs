/**
 * Jurisdiction Pack Loader
 *
 * Automatically loads requirement libraries based on project country:
 * - Global requirements (always loaded)
 * - Country-specific requirements (loaded if project.country matches)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load all JSON files from a directory
 */
async function loadRequirementsFromDirectory(dir, logger) {
  try {
    const files = await fs.readdir(dir);
    const requirements = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const requirement = JSON.parse(content);

        // Validate requirement structure
        if (requirement.id && requirement.entityType === 'requirement') {
          requirements.push(requirement);
          logger.debug(`  Loaded: ${requirement.id} (${requirement.requirementName})`);
        } else {
          logger.warn(`  Skipped: ${file} (invalid requirement structure)`);
        }
      }
    }

    return requirements;
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger.debug(`  Directory not found: ${dir}`);
      return [];
    }
    throw error;
  }
}

/**
 * Load global requirements (always loaded)
 */
async function loadGlobalRequirements(logger) {
  const globalDir = path.join(__dirname, '../../requirements/global');
  logger.debug('Loading global requirements...');
  const requirements = await loadRequirementsFromDirectory(globalDir, logger);
  logger.debug(`Loaded ${requirements.length} global requirements`);
  return requirements;
}

/**
 * Load country-specific requirements
 */
async function loadCountryRequirements(countryCode, logger) {
  const countryDir = path.join(__dirname, `../../requirements/${countryCode.toLowerCase()}`);
  logger.debug(`Loading ${countryCode} requirements...`);
  const requirements = await loadRequirementsFromDirectory(countryDir, logger);
  logger.debug(`Loaded ${requirements.length} ${countryCode}-specific requirements`);
  return requirements;
}

/**
 * Get country code from ISO code
 */
function getCountryPackCode(countryISOCode) {
  const mapping = {
    'PL': 'pl',    // Poland
    'DE': 'de',    // Germany
    'FR': 'fr',    // France
    'GB': 'gb',    // United Kingdom
    'US': 'us',    // United States
    'ES': 'es',    // Spain
    'IT': 'it',    // Italy
    'NL': 'nl'     // Netherlands
  };

  return mapping[countryISOCode] || null;
}

/**
 * Main jurisdiction pack loader
 *
 * @param {object} options - Compiler options
 * @param {object} logger - Logger instance
 * @returns {Promise<Array>} - Array of requirements
 */
export async function loadJurisdictionPack(options, logger) {
  logger.debug('Loading jurisdiction pack...');

  const requirements = [];

  // Always load global requirements
  const globalRequirements = await loadGlobalRequirements(logger);
  requirements.push(...globalRequirements);

  // Load country-specific requirements if country is specified
  if (options.country) {
    const countryPackCode = getCountryPackCode(options.country);

    if (countryPackCode) {
      try {
        const countryRequirements = await loadCountryRequirements(countryPackCode, logger);
        requirements.push(...countryRequirements);
      } catch (error) {
        logger.warn(`Could not load ${options.country} jurisdiction pack: ${error.message}`);
        logger.debug('Continuing with global requirements only');
      }
    } else {
      logger.warn(`No jurisdiction pack available for country: ${options.country}`);
      logger.debug('Continuing with global requirements only');
    }
  }

  logger.debug(`✓ Jurisdiction pack loaded: ${requirements.length} total requirements (${globalRequirements.length} global + ${requirements.length - globalRequirements.length} country-specific)`);

  return requirements;
}

/**
 * Validate requirement against scope
 *
 * Check if a requirement is applicable to a given entity
 */
export function isRequirementApplicable(requirement, entity) {
  if (!requirement.scope) {
    return false;
  }

  // Check entity type
  if (requirement.scope.entityType !== entity.entityType) {
    return false;
  }

  // Check space types (if applicable)
  if (requirement.scope.spaceTypes && entity.spaceType) {
    if (!requirement.scope.spaceTypes.includes(entity.spaceType)) {
      return false;
    }
  }

  // Check zone types (if applicable)
  if (requirement.scope.zoneTypes && entity.zoneType) {
    if (!requirement.scope.zoneTypes.includes(entity.zoneType)) {
      return false;
    }
  }

  return true;
}

/**
 * Get applicable requirements for an entity
 */
export function getApplicableRequirements(entity, allRequirements) {
  return allRequirements.filter(req => isRequirementApplicable(req, entity));
}
