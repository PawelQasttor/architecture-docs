/**
 * Compilation Target: Data Quality Report
 *
 * Generates a quality assurance report:
 * - Per-entity quality cards (confidence breakdown, warnings)
 * - Safety-critical field audit
 * - Provenance gap analysis (fields without sources)
 * - Phase readiness assessment
 * - Data collection recommendations
 */

/**
 * Confidence levels ordered from strongest to weakest
 */
const CONFIDENCE_ORDER = ['measured', 'calculated', 'specified', 'estimated', 'assumed', 'unknown'];

/**
 * Resolve a human-readable name for any entity type
 */
function resolveEntityName(entity) {
  return entity.spaceName || entity.zoneName || entity.systemName
    || entity.assetName || entity.levelName || entity.name
    || entity.requirementName || entity.spaceTypeName
    || entity.zoneTypeName || entity.systemTypeName || entity.assetTypeName
    || entity.identifiers?.assetTag || entity.id;
}

/**
 * Generate per-entity quality cards
 */
function generateEntityCards(sbm) {
  const cards = [];

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      if (!entity._quality) continue;

      const q = entity._quality;
      cards.push({
        entityId: entity.id,
        entityType,
        name: resolveEntityName(entity),
        completeness: q.completeness,
        lowestConfidence: q.lowestConfidence,
        fieldsByConfidence: q.fieldsByConfidence,
        unresolvedFields: q.unresolvedFields || [],
        warningCount: q.warnings ? q.warnings.length : 0,
        warnings: q.warnings || []
      });
    }
  }

  // Sort: lowest completeness first (worst quality on top)
  cards.sort((a, b) => a.completeness - b.completeness);

  return cards;
}

/**
 * Generate safety-critical field audit
 *
 * Lists every safety-critical field across all entities with its confidence level.
 */
function generateSafetyAudit(sbm) {
  const audit = [];

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      if (!entity._quality || !entity._quality.safetyCritical) continue;

      for (const sc of entity._quality.safetyCritical) {
        audit.push({
          entityId: entity.id,
          entityType,
          field: sc.field,
          value: sc.value,
          confidence: sc.confidence,
          source: sc.source,
          verified: ['measured', 'calculated', 'specified'].includes(sc.confidence)
        });
      }
    }
  }

  return {
    totalFields: audit.length,
    verified: audit.filter(a => a.verified).length,
    unverified: audit.filter(a => !a.verified).length,
    fields: audit
  };
}

/**
 * Generate provenance gap analysis
 *
 * Finds fields that lack source references despite having data values.
 */
function generateProvenanceGaps(sbm) {
  const gaps = [];
  const HIGH_CONFIDENCE = new Set(['measured', 'calculated', 'specified']);

  for (const [entityType, entities] of Object.entries(sbm.entities || {})) {
    if (!Array.isArray(entities)) continue;

    for (const entity of entities) {
      const keys = Object.keys(entity);

      for (const key of keys) {
        if (key.startsWith('_') || key.endsWith('_meta') || key === 'version' ||
            key === 'documentType' || key === 'entityType' || key === 'id') {
          continue;
        }

        const meta = entity[`${key}_meta`];
        const value = entity[key];

        // Gap: has value but no _meta at all
        if (value !== null && value !== undefined && !meta) {
          gaps.push({
            entityId: entity.id,
            entityType,
            field: key,
            issue: 'no_meta',
            description: 'Field has a value but no _meta provenance annotation'
          });
        }

        // Gap: high confidence but no source
        if (meta && HIGH_CONFIDENCE.has(meta.confidence) && !meta.source &&
            meta.resolution !== 'inherited' && meta.resolution !== 'type_default') {
          gaps.push({
            entityId: entity.id,
            entityType,
            field: key,
            issue: 'no_source',
            description: `Field has '${meta.confidence}' confidence but no source reference`
          });
        }

        // Gap: null with no explanation
        if ((value === null || value === undefined) && !meta) {
          gaps.push({
            entityId: entity.id,
            entityType,
            field: key,
            issue: 'null_unexplained',
            description: 'Field is null with no _meta explanation'
          });
        }
      }
    }
  }

  return {
    totalGaps: gaps.length,
    byIssue: {
      no_meta: gaps.filter(g => g.issue === 'no_meta').length,
      no_source: gaps.filter(g => g.issue === 'no_source').length,
      null_unexplained: gaps.filter(g => g.issue === 'null_unexplained').length
    },
    gaps
  };
}

/**
 * Generate phase readiness assessment
 *
 * Determines if the project data quality is sufficient for the next phase.
 */
function generatePhaseReadiness(sbm, projectQuality) {
  const currentPhase = sbm.project?.phase || 3;
  const nextPhase = currentPhase + 1;

  const blockers = [];
  const warnings = [];

  // Check for assumed fields (blocks Phase 5+)
  const assumedCount = projectQuality.fieldsByConfidence?.assumed || 0;
  if (nextPhase >= 5 && assumedCount > 0) {
    blockers.push({
      rule: 'No assumed fields permitted from Phase 5',
      count: assumedCount,
      action: `Verify or re-classify ${assumedCount} assumed field(s) before advancing to Phase ${nextPhase}`
    });
  } else if (nextPhase >= 4 && assumedCount > 0) {
    warnings.push({
      rule: 'Assumed fields generate warnings from Phase 4',
      count: assumedCount,
      action: `Plan verification for ${assumedCount} assumed field(s)`
    });
  }

  // Check for safety-critical unverified
  const unverifiedSafety = projectQuality.safetyCriticalFields?.unverified || 0;
  if (nextPhase >= 7 && unverifiedSafety > 0) {
    blockers.push({
      rule: 'All safety-critical fields must be measured/calculated/specified from Phase 7',
      count: unverifiedSafety,
      action: `Verify ${unverifiedSafety} safety-critical field(s) with authoritative sources`
    });
  } else if (unverifiedSafety > 0) {
    warnings.push({
      rule: 'Safety-critical fields should be verified as early as possible',
      count: unverifiedSafety,
      action: `Schedule verification for ${unverifiedSafety} safety-critical field(s)`
    });
  }

  // Check completeness
  const avgCompleteness = projectQuality.averageCompleteness || 0;
  if (avgCompleteness < 0.8 && nextPhase >= 5) {
    warnings.push({
      rule: 'Average completeness below 80% at Phase 5+',
      value: avgCompleteness,
      action: 'Fill missing fields or explicitly mark as unknown with _meta'
    });
  }

  return {
    currentPhase,
    nextPhase,
    ready: blockers.length === 0,
    blockers,
    warnings,
    summary: blockers.length === 0
      ? `Project is ready to advance to Phase ${nextPhase}`
      : `${blockers.length} blocker(s) must be resolved before Phase ${nextPhase}`
  };
}

/**
 * Generate data collection recommendations
 *
 * Suggests what to measure/verify next based on current gaps.
 */
function generateRecommendations(safetyAudit, provenanceGaps, phaseReadiness) {
  const recommendations = [];

  // Priority 1: Unverified safety-critical fields
  const unverifiedSafety = safetyAudit.fields.filter(f => !f.verified);
  if (unverifiedSafety.length > 0) {
    recommendations.push({
      priority: 'critical',
      category: 'safety',
      message: `${unverifiedSafety.length} safety-critical field(s) need verification from authoritative sources`,
      action: 'Locate source documents and add _meta annotations with source references',
      fields: unverifiedSafety.map(f => `${f.entityId}/${f.field} (${f.confidence})`)
    });
  }

  // Priority 2: Fields with no provenance at all
  const noMeta = provenanceGaps.byIssue.no_meta;
  if (noMeta > 0) {
    recommendations.push({
      priority: 'high',
      category: 'provenance',
      message: `${noMeta} field(s) have values but no provenance tracking`,
      action: 'Add _meta annotations with confidence level and source reference for each field'
    });
  }

  // Priority 3: High confidence without source
  const noSource = provenanceGaps.byIssue.no_source;
  if (noSource > 0) {
    recommendations.push({
      priority: 'high',
      category: 'provenance',
      message: `${noSource} field(s) claim high confidence but have no source reference`,
      action: 'Add source and sourceRef to _meta for each field, or downgrade confidence to estimated'
    });
  }

  // Priority 4: Phase gate blockers
  for (const blocker of phaseReadiness.blockers) {
    recommendations.push({
      priority: 'high',
      category: 'phase_gate',
      message: blocker.rule,
      action: blocker.action
    });
  }

  return recommendations;
}

/**
 * Main quality report generator
 *
 * @param {object} sbm - Semantic Building Model
 * @param {object} projectQuality - Project quality summary from quality stage
 * @param {object} logger - Logger instance
 * @returns {object} - Quality report
 */
export function generateQualityReport(sbm, projectQuality, logger) {
  logger.debug('Generating quality report...');

  const entityCards = generateEntityCards(sbm);
  const safetyAudit = generateSafetyAudit(sbm);
  const provenanceGaps = generateProvenanceGaps(sbm);
  const phaseReadiness = generatePhaseReadiness(sbm, projectQuality);
  const recommendations = generateRecommendations(safetyAudit, provenanceGaps, phaseReadiness);

  logger.debug(`Quality report: ${entityCards.length} entities, ${safetyAudit.totalFields} safety fields, ${provenanceGaps.totalGaps} gaps`);

  return {
    version: '0.2',
    generatedAt: new Date().toISOString(),
    projectId: sbm.project?.id || 'PRJ-UNKNOWN',
    projectName: sbm.project?.name || 'Unknown',
    projectPhase: sbm.project?.phase || 3,

    projectQuality,

    phaseReadiness,

    safetyAudit,

    provenanceGaps: {
      totalGaps: provenanceGaps.totalGaps,
      byIssue: provenanceGaps.byIssue,
      // Only include first 50 gaps in report to avoid massive files
      gaps: provenanceGaps.gaps.slice(0, 50),
      truncated: provenanceGaps.gaps.length > 50
    },

    entityCards,

    recommendations
  };
}
