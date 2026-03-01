/**
 * Stage 3.5: Quality Summary Generation
 *
 * Runs after validation, before target generation.
 * Computes per-entity _quality blocks and project-wide quality summary.
 *
 * For each entity:
 * - Counts fields with _meta annotations
 * - Groups by confidence level
 * - Computes completeness (non-null / total)
 * - Identifies safety-critical fields and their confidence
 * - Generates warnings
 */

import { SAFETY_CRITICAL_FIELDS, SAFETY_CRITICAL_ENV_FIELDS } from '../constants.mjs';

/**
 * Confidence levels ordered from strongest to weakest
 */
const CONFIDENCE_ORDER = ['measured', 'calculated', 'specified', 'estimated', 'assumed', 'unknown'];

/**
 * Fields to skip when counting (internal/meta fields)
 */
function isSkippableField(key) {
  return key.startsWith('_') || key.endsWith('_meta') || key === 'version' ||
    key === 'documentType' || key === 'entityType' || key === 'id';
}

/**
 * Quality profiles: expected fields per entity type with criticality weights.
 * Critical (weight 3), Important (weight 2), Standard (weight 1).
 */
const QUALITY_PROFILES = {
  space: {
    critical: ['spaceName', 'spaceType', 'buildingId', 'levelId'],
    important: ['area', 'designArea', 'zoneIds', 'requirements', 'cost']
  },
  building: {
    critical: ['buildingName', 'siteId'],
    important: ['classification', 'grossFloorArea', 'cost']
  },
  level: {
    critical: ['levelName', 'buildingId', 'levelNumber'],
    important: ['elevation', 'grossArea']
  },
  zone: {
    critical: ['zoneName', 'zoneCategory'],
    important: ['spaceIds', 'buildingId']
  },
  system: {
    critical: ['systemName', 'systemCategory', 'buildingId'],
    important: ['assetIds', 'cost']
  },
  asset: {
    critical: ['assetName', 'assetType', 'buildingId'],
    important: ['systemId', 'manufacturer', 'cost']
  },
  envelope: {
    critical: ['envelopeName', 'envelopeType', 'buildingId'],
    important: ['thermalPerformance', 'firePerformance', 'grossArea']
  },
  site: {
    critical: ['siteName'],
    important: ['siteArea', 'buildableArea']
  },
  requirement: {
    critical: ['requirementName', 'requirementType', 'scope', 'verification'],
    important: ['metric', 'value']
  },
  vertical_circulation: {
    critical: ['circulationName', 'circulationType', 'buildingId', 'connectedLevelIds'],
    important: ['capacity']
  },
  opening: {
    critical: ['openingName', 'openingCategory', 'envelopeId'],
    important: ['dimensions', 'thermalPerformance', 'firePerformance']
  },
  site_feature: {
    critical: ['featureName', 'featureCategory', 'siteId'],
    important: ['dimensions', 'cost']
  },
  construction_package: {
    critical: ['packageName', 'sequence'],
    important: ['status', 'plannedStart', 'plannedEnd', 'costBreakdown']
  }
};

/**
 * Get field weight: 3 for critical, 2 for important, 1 for standard
 */
function getFieldWeight(field, entityType) {
  const profile = QUALITY_PROFILES[entityType];
  if (!profile) return 1;
  if (profile.critical && profile.critical.includes(field)) return 3;
  if (profile.important && profile.important.includes(field)) return 2;
  return 1;
}

/**
 * Compute quality summary for a single entity
 */
function computeEntityQuality(entity, entityType) {
  const fieldsByConfidence = {
    measured: 0,
    calculated: 0,
    specified: 0,
    estimated: 0,
    assumed: 0,
    unknown: 0
  };

  let totalFields = 0;
  let nonNullFields = 0;
  let lowestConfidenceIndex = -1;
  const unresolvedFields = [];
  const warnings = [];
  const safetyCritical = [];

  const keys = Object.keys(entity).filter(k => !isSkippableField(k));

  for (const key of keys) {
    totalFields++;
    const value = entity[key];
    const metaKey = `${key}_meta`;
    const meta = entity[metaKey];

    if (value !== null && value !== undefined) {
      nonNullFields++;
    } else {
      unresolvedFields.push(key);
    }

    if (meta && meta.confidence) {
      const idx = CONFIDENCE_ORDER.indexOf(meta.confidence);
      if (idx !== -1) {
        fieldsByConfidence[meta.confidence]++;
        if (idx > lowestConfidenceIndex) {
          lowestConfidenceIndex = idx;
        }
      }
    }

    // Check safety-critical fields
    if (SAFETY_CRITICAL_FIELDS.has(key)) {
      safetyCritical.push({
        field: key,
        value: value,
        confidence: meta?.confidence || 'no_meta',
        source: meta?.source || null
      });
    }
  }

  // Check nested environmentalConditions for safety-critical sub-fields
  if (entity.environmentalConditions && typeof entity.environmentalConditions === 'object') {
    for (const subKey of Object.keys(entity.environmentalConditions)) {
      if (SAFETY_CRITICAL_ENV_FIELDS.has(subKey)) {
        const envMeta = entity.environmentalConditions_meta;
        safetyCritical.push({
          field: `environmentalConditions.${subKey}`,
          value: entity.environmentalConditions[subKey],
          confidence: envMeta?.confidence || 'no_meta',
          source: envMeta?.source || null
        });
      }
    }
  }

  // Generate warnings
  if (unresolvedFields.length > 0) {
    warnings.push(`${unresolvedFields.length} field(s) are null: ${unresolvedFields.join(', ')}`);
  }

  const assumedCount = fieldsByConfidence.assumed;
  if (assumedCount > 0) {
    warnings.push(`${assumedCount} field(s) have 'assumed' confidence — require verification`);
  }

  const unverifiedSafety = safetyCritical.filter(f =>
    f.confidence === 'assumed' || f.confidence === 'estimated' || f.confidence === 'unknown' || f.confidence === 'no_meta'
  );
  if (unverifiedSafety.length > 0) {
    warnings.push(`${unverifiedSafety.length} safety-critical field(s) not fully verified: ${unverifiedSafety.map(f => f.field).join(', ')}`);
  }

  // Weighted completeness (v1.1)
  let weightedNonNull = 0;
  let weightedTotal = 0;
  for (const key of keys) {
    const weight = getFieldWeight(key, entityType);
    weightedTotal += weight;
    if (entity[key] !== null && entity[key] !== undefined) {
      weightedNonNull += weight;
    }
  }
  const weightedCompleteness = weightedTotal > 0
    ? parseFloat((weightedNonNull / weightedTotal).toFixed(2))
    : 1.0;

  // Profile completeness (v1.1)
  const profile = QUALITY_PROFILES[entityType];
  let profileCompleteness = null;
  let missingExpected = undefined;
  if (profile) {
    const expected = [...(profile.critical || []), ...(profile.important || [])];
    const missing = expected.filter(f => entity[f] === undefined || entity[f] === null);
    profileCompleteness = expected.length > 0
      ? parseFloat(((expected.length - missing.length) / expected.length).toFixed(2))
      : 1.0;
    if (missing.length > 0) {
      missingExpected = missing;
    }
  }

  return {
    totalFields,
    fieldsByConfidence,
    completeness: totalFields > 0 ? parseFloat((nonNullFields / totalFields).toFixed(2)) : 1.0,
    weightedCompleteness,
    ...(profileCompleteness !== null && { profileCompleteness }),
    ...(missingExpected && { missingExpected }),
    lowestConfidence: lowestConfidenceIndex >= 0 ? CONFIDENCE_ORDER[lowestConfidenceIndex] : null,
    unresolvedFields: unresolvedFields.length > 0 ? unresolvedFields : undefined,
    safetyCritical: safetyCritical.length > 0 ? safetyCritical : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

/**
 * Compute project-wide quality summary
 */
function computeProjectQuality(allQualities) {
  const totals = {
    measured: 0, calculated: 0, specified: 0,
    estimated: 0, assumed: 0, unknown: 0
  };

  let totalCompleteness = 0;
  let totalWeightedCompleteness = 0;
  const byLowestConfidence = {};
  const allSafetyCritical = [];

  for (const { entityId, quality } of allQualities) {
    // Aggregate confidence counts
    for (const level of CONFIDENCE_ORDER) {
      totals[level] += quality.fieldsByConfidence[level] || 0;
    }

    // Aggregate completeness
    totalCompleteness += quality.completeness;
    totalWeightedCompleteness += quality.weightedCompleteness || quality.completeness;

    // Count by lowest confidence
    const lowest = quality.lowestConfidence || 'none';
    byLowestConfidence[lowest] = (byLowestConfidence[lowest] || 0) + 1;

    // Collect safety-critical
    if (quality.safetyCritical) {
      for (const sc of quality.safetyCritical) {
        allSafetyCritical.push({ entityId, ...sc });
      }
    }
  }

  const verifiedSafety = allSafetyCritical.filter(f =>
    f.confidence === 'measured' || f.confidence === 'calculated' || f.confidence === 'specified'
  );

  return {
    totalEntities: allQualities.length,
    averageCompleteness: allQualities.length > 0
      ? parseFloat((totalCompleteness / allQualities.length).toFixed(2))
      : 1.0,
    averageWeightedCompleteness: allQualities.length > 0
      ? parseFloat((totalWeightedCompleteness / allQualities.length).toFixed(2))
      : 1.0,
    fieldsByConfidence: totals,
    entitiesByLowestConfidence: byLowestConfidence,
    safetyCriticalFields: {
      total: allSafetyCritical.length,
      verified: verifiedSafety.length,
      unverified: allSafetyCritical.length - verifiedSafety.length,
      unverifiedDetails: allSafetyCritical.filter(f =>
        f.confidence !== 'measured' && f.confidence !== 'calculated' && f.confidence !== 'specified'
      )
    }
  };
}

/**
 * Main quality stage
 *
 * Attaches _quality blocks to each entity and returns project-wide summary.
 *
 * @param {object} sbm - Normalized SBM structure (mutated in-place)
 * @param {object} logger - Logger instance
 * @returns {object} - Project quality summary
 */
export function generateQuality(sbm, logger) {
  logger.debug('Computing quality summaries...');

  const allQualities = [];

  // Process all entity arrays
  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      const quality = computeEntityQuality(entity, entity.entityType || entity.documentType);
      entity._quality = quality;

      allQualities.push({
        entityId: entity.id || 'unknown',
        entityType,
        quality
      });
    }
  }

  // Compute project-wide summary
  const projectQuality = computeProjectQuality(allQualities);

  logger.debug(`Quality: ${allQualities.length} entities analyzed, avg completeness ${projectQuality.averageCompleteness}`);

  if (projectQuality.safetyCriticalFields.unverified > 0) {
    logger.warn(`${projectQuality.safetyCriticalFields.unverified} safety-critical field(s) not fully verified`);
  }

  return projectQuality;
}
