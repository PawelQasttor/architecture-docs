/**
 * Compilation Target: Compliance Report
 *
 * Generates regulatory compliance reports:
 * - Poland: WT 2021 (Warunki Techniczne) compliance
 * - EU directives (if applicable)
 * - Global performance standards
 * - Qualitative requirement checklists (v0.3)
 */

/**
 * Metric → space field resolver map
 *
 * Each entry maps a requirement metric to a function that extracts
 * the comparable value from a space entity. Returns null if the
 * value cannot be determined from design data (requires simulation/testing).
 */
const METRIC_TO_FIELD = {
  'room_height_clear': (space) => space.designHeight,
  'room_area_minimum': (space) => space.designArea,
  'room_volume_minimum': (space) => space.designVolume,
  'operative_temperature': (space) => {
    const tr = space.environmentalConditions?.temperatureRange;
    return tr ? { min: tr.min, max: tr.max } : null;
  },
  'temperature': (space) => {
    const tr = space.environmentalConditions?.temperatureRange;
    return tr ? { min: tr.min, max: tr.max } : null;
  },
  'relative_humidity': (space) => {
    const hr = space.environmentalConditions?.humidityRange;
    return hr ? { min: hr.min, max: hr.max } : null;
  },
  'air_change_rate': (space) => space.environmentalConditions?.airChangesPerHour,
  'fresh_air_rate_per_person': (space) => space.environmentalConditions?.freshAirPercentage,
  'pressure_differential_pa': (space) => space.environmentalConditions?.pressureDifferentialPa,
  'electrical_safety_group': (space) => space.electricalSafetyGroup,
  'daylight_factor': () => null,
  'airborne_sound_insulation': () => null,
  'fire_resistance_rating': () => null,
  'co2_level': () => null,
  'illuminance': () => null
};

/**
 * Group requirements by regulation
 */
function groupRequirementsByRegulation(requirements) {
  const grouped = {
    global: [],
    poland_wt_2021: [],
    poland_rozp_mz: [],
    poland_prawo_budowlane: [],
    eu_directives: []
  };

  for (const req of requirements) {
    if (req.countryScope === 'poland_specific') {
      if (req.legalBasis) {
        const hasWT2021 = req.legalBasis.some(basis =>
          basis.regulation && basis.regulation.includes('WT_2021')
        );
        const hasRozpMZ = req.legalBasis.some(basis =>
          basis.regulation && basis.regulation.includes('Rozp_MZ')
        );
        const hasPrawoBudowlane = req.legalBasis.some(basis =>
          basis.regulation && basis.regulation.includes('Prawo_budowlane')
        );

        if (hasWT2021) {
          grouped.poland_wt_2021.push(req);
        } else if (hasRozpMZ) {
          grouped.poland_rozp_mz.push(req);
        } else if (hasPrawoBudowlane) {
          grouped.poland_prawo_budowlane.push(req);
        } else {
          grouped.poland_wt_2021.push(req);
        }
      } else {
        grouped.poland_wt_2021.push(req);
      }
    } else if (req.countryScope === 'eu_specific') {
      grouped.eu_directives.push(req);
    } else {
      grouped.global.push(req);
    }
  }

  return grouped;
}

/**
 * Check space compliance with requirements
 */
function checkSpaceCompliance(space, requirementMap, logger) {
  const results = [];

  if (!space.requirements || space.requirements.length === 0) {
    return results;
  }

  for (const reqId of space.requirements) {
    const requirement = requirementMap.get(reqId);

    if (!requirement) {
      results.push({
        requirementId: reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        status: 'pending',
        note: 'Requirement not yet loaded (jurisdiction pack pending)'
      });
      continue;
    }

    // Handle qualitative requirements (v0.3)
    if (requirement.requirementType === 'qualitative' || requirement.acceptanceCriteria || requirement.evidenceRequired) {
      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName,
        spaceId: space.id,
        spaceName: space.spaceName,
        status: 'review_required',
        requirementType: 'qualitative',
        acceptanceCriteria: requirement.acceptanceCriteria || [],
        evidenceRequired: requirement.evidenceRequired || [],
        note: 'Qualitative requirement — requires manual review of evidence'
      });
      continue;
    }

    // Numeric requirements: resolve metric to space field
    if (!requirement.metric) {
      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName || reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        status: 'pending',
        note: 'Requirement has no metric defined'
      });
      continue;
    }

    const resolver = METRIC_TO_FIELD[requirement.metric];
    const spaceValue = resolver ? resolver(space) : undefined;

    if (spaceValue == null) {
      // Cannot resolve — need simulation, testing, or data not yet available
      const reason = resolver
        ? `Metric '${requirement.metric}' requires simulation or testing`
        : `Unknown metric '${requirement.metric}' — no space field mapping`;
      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName || reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        metric: requirement.metric,
        status: 'pending',
        statusReason: reason,
        note: 'Verification pending (requires simulation, testing, or data not yet available)'
      });
      continue;
    }

    // We have both a space value and a requirement target — check compliance
    if (requirement.value == null || requirement.operator == null) {
      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName || reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        metric: requirement.metric,
        measuredValue: spaceValue,
        status: 'pending',
        statusReason: 'Requirement has no target value or operator defined',
        note: 'Cannot verify — requirement missing value/operator'
      });
      continue;
    }

    const compliant = checkOperator(spaceValue, requirement.operator, requirement.value);

    const statusReason = compliant
      ? `${requirement.metric}: ${formatValue(spaceValue)} ${requirement.operator} ${formatValue(requirement.value)} ${requirement.unit || ''}`
      : `${requirement.metric}: ${formatValue(spaceValue)} does NOT satisfy ${requirement.operator} ${formatValue(requirement.value)} ${requirement.unit || ''}`;

    results.push({
      requirementId: reqId,
      requirementName: requirement.requirementName,
      spaceId: space.id,
      spaceName: space.spaceName,
      metric: requirement.metric,
      targetValue: requirement.value,
      unit: requirement.unit,
      measuredValue: spaceValue,
      operator: requirement.operator,
      status: compliant ? 'compliant' : 'non-compliant',
      statusReason,
      margin: typeof spaceValue === 'number' && typeof requirement.value === 'number'
        ? spaceValue - requirement.value
        : null
    });
  }

  return results;
}

/**
 * Format a value for display (handles range objects)
 */
function formatValue(value) {
  if (value && typeof value === 'object' && value.min != null) {
    return `[${value.min}, ${value.max}]`;
  }
  return String(value);
}

/**
 * Helper: Check operator compliance
 */
function checkOperator(value, operator, target) {
  switch (operator) {
    case '>=': return value >= target;
    case '<=': return value <= target;
    case '==': return value === target;
    case '>': return value > target;
    case '<': return value < target;
    case '!=': return value !== target;
    case 'in_range':
      // Range-vs-range: if value is a range object, check containment
      if (typeof value === 'object' && value.min != null && value.max != null) {
        return value.min >= target.min && value.max <= target.max;
      }
      return value >= target.min && value <= target.max;
    default:
      return null;
  }
}

/**
 * Analyze verification status from actual compliance results
 */
function analyzeVerificationStatus(complianceResults, totalRequirements) {
  const verified = complianceResults.filter(r =>
    r.status === 'compliant' || r.status === 'non-compliant'
  ).length;
  const pending = complianceResults.filter(r => r.status === 'pending').length;
  const reviewRequired = complianceResults.filter(r => r.status === 'review_required').length;

  return {
    total: totalRequirements,
    verified,
    pendingVerification: pending,
    reviewRequired,
    notApplicable: 0
  };
}

/**
 * Determine worst status from a list
 */
function worstStatus(statuses) {
  const order = ['non-compliant', 'pending', 'review_required', 'partial', 'compliant', 'not_applicable'];
  for (const s of order) {
    if (statuses.includes(s)) return s;
  }
  return 'not_applicable';
}

/**
 * Generate Poland WT 2021 compliance section
 */
function generatePolandWT2021Compliance(requirements, spaceComplianceResults, logger) {
  const wt2021Requirements = requirements.filter(r =>
    r.legalBasis?.some(basis => basis.regulation?.includes('WT_2021'))
  );

  logger.debug(`Found ${wt2021Requirements.length} WT 2021 requirements`);

  // Build a lookup: requirementId → compliance results
  const resultsByReq = new Map();
  for (const result of spaceComplianceResults) {
    if (!resultsByReq.has(result.requirementId)) {
      resultsByReq.set(result.requirementId, []);
    }
    resultsByReq.get(result.requirementId).push(result);
  }

  // Group by section
  const sections = {};
  for (const req of wt2021Requirements) {
    if (req.legalBasis) {
      for (const basis of req.legalBasis) {
        const section = basis.section || 'Unspecified';
        if (!sections[section]) {
          sections[section] = {
            section,
            description: basis.description || '',
            requirements: [],
            status: 'not_applicable'
          };
        }

        const reqResults = resultsByReq.get(req.id) || [];
        const reqStatuses = reqResults.map(r => r.status);
        let reqStatus;
        if (reqResults.length === 0) {
          reqStatus = 'not_applicable';
        } else {
          reqStatus = worstStatus(reqStatuses);
        }

        sections[section].requirements.push({
          id: req.id,
          requirementName: req.requirementName,
          status: reqStatus,
          affectedEntities: reqResults.length,
          compliant: reqResults.filter(r => r.status === 'compliant').length,
          nonCompliant: reqResults.filter(r => r.status === 'non-compliant').length,
          pending: reqResults.filter(r => r.status === 'pending').length
        });
      }
    }
  }

  // Derive section status from its requirements
  for (const section of Object.values(sections)) {
    const reqStatuses = section.requirements.map(r => r.status);
    section.status = worstStatus(reqStatuses);
  }

  const sectionValues = Object.values(sections);
  const overallStatus = sectionValues.length > 0
    ? worstStatus(sectionValues.map(s => s.status))
    : 'not_applicable';

  return {
    regulation: "WT_2021",
    fullName: "Rozporządzenie Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie",
    sections: sectionValues,
    overallStatus
  };
}

/**
 * Main compliance report generator
 *
 * @param {object} sbm - Semantic Building Model
 * @param {object} logger - Logger instance
 * @returns {object} - Compliance report
 */
export function generateComplianceReport(sbm, logger) {
  logger.debug('Generating compliance report...');

  const requirements = sbm.entities.requirements || [];
  const spaces = sbm.entities.spaces || [];
  const zones = sbm.entities.zones || [];

  // Build requirement lookup map
  const requirementMap = new Map(requirements.map(r => [r.id, r]));

  // Group requirements by regulation
  const groupedRequirements = groupRequirementsByRegulation(requirements);
  logger.debug(`Requirements: ${groupedRequirements.global.length} global, ${groupedRequirements.poland_wt_2021.length} Poland WT 2021, ${groupedRequirements.poland_rozp_mz.length} Poland Rozp. MZ`);

  // Check space compliance
  const spaceComplianceResults = [];
  for (const space of spaces) {
    const results = checkSpaceCompliance(space, requirementMap, logger);
    spaceComplianceResults.push(...results);
  }

  logger.debug(`Checked compliance for ${spaces.length} spaces: ${spaceComplianceResults.length} checks performed`);

  // Analyze verification status from actual results
  const verificationSummary = analyzeVerificationStatus(spaceComplianceResults, requirements.length);

  // Generate Poland-specific compliance (if applicable)
  let polandSpecificCompliance = null;
  if (sbm.project.country === 'PL') {
    polandSpecificCompliance = generatePolandWT2021Compliance(
      requirements,
      spaceComplianceResults,
      logger
    );
    logger.debug('Generated Poland WT 2021 compliance section');
  }

  const complianceRate = spaceComplianceResults.length > 0
    ? (spaceComplianceResults.filter(r => r.status === 'compliant').length / spaceComplianceResults.length * 100).toFixed(1)
    : 0;

  const complianceReport = {
    version: "0.2",
    generatedAt: new Date().toISOString(),
    projectId: sbm.project.id,
    projectName: sbm.project.name,
    projectPhase: sbm.project.phase || 3,

    summary: {
      totalRequirements: requirements.length,
      globalRequirements: groupedRequirements.global.length,
      countrySpecificRequirements:
        groupedRequirements.poland_wt_2021.length +
        groupedRequirements.poland_rozp_mz.length +
        groupedRequirements.poland_prawo_budowlane.length,
      verified: verificationSummary.verified,
      pendingVerification: verificationSummary.pendingVerification,
      reviewRequired: verificationSummary.reviewRequired,
      complianceRate: parseFloat(complianceRate),
      complianceChecksPerformed: spaceComplianceResults.length
    },

    ...(polandSpecificCompliance && {
      polandSpecificCompliance
    }),

    requirementsByCategory: {
      global: groupedRequirements.global.map(r => ({
        id: r.id,
        name: r.requirementName,
        type: r.requirementType,
        scope: r.scope,
        verificationMethod: r.verification?.method
      })),
      polandWT2021: groupedRequirements.poland_wt_2021.map(r => ({
        id: r.id,
        name: r.requirementName,
        type: r.requirementType,
        legalBasis: r.legalBasis
      })),
      polandRozpMZ: groupedRequirements.poland_rozp_mz.map(r => ({
        id: r.id,
        name: r.requirementName,
        type: r.requirementType,
        legalBasis: r.legalBasis
      }))
    },

    spaceComplianceDetails: spaceComplianceResults,

    verificationPlan: {
      currentPhase: sbm.project.phase || 3,
      verificationsCompleted: spaceComplianceResults.filter(r =>
        r.status === 'compliant' || r.status === 'non-compliant'
      ).length,
      verificationsPending: spaceComplianceResults.filter(r =>
        r.status === 'pending'
      ).length,
      reviewRequired: spaceComplianceResults.filter(r =>
        r.status === 'review_required'
      ).length,
      nextSteps: [
        "Complete jurisdiction pack loading (Phase 4) to enable all requirement checks",
        "Run energy simulation for thermal performance verification",
        "Run daylight simulation for natural lighting verification",
        "Schedule acoustic testing during construction phase",
        "Plan as-built verification measurements",
        "Collect evidence for qualitative requirements"
      ]
    },

    recommendations: generateRecommendations(spaceComplianceResults, sbm)
  };

  logger.debug('✓ Compliance report complete');
  return complianceReport;
}

/**
 * Generate recommendations based on compliance results
 */
function generateRecommendations(complianceResults, sbm) {
  const recommendations = [];

  const nonCompliant = complianceResults.filter(r => r.status === 'non-compliant');
  if (nonCompliant.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'non-compliance',
      message: `${nonCompliant.length} space-requirement checks are non-compliant`,
      action: 'Review and adjust design to meet minimum requirements',
      affectedSpaces: [...new Set(nonCompliant.map(r => r.spaceId))]
    });
  }

  const spacesWithoutRequirements = (sbm.entities.spaces || []).filter(s =>
    !s.requirements || s.requirements.length === 0
  );
  if (spacesWithoutRequirements.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'missing-requirements',
      message: `${spacesWithoutRequirements.length} spaces have no requirements assigned`,
      action: 'Review space types and assign applicable requirements',
      affectedSpaces: spacesWithoutRequirements.slice(0, 20).map(s => s.id),
      truncated: spacesWithoutRequirements.length > 20
    });
  }

  const reviewRequired = complianceResults.filter(r => r.status === 'review_required');
  if (reviewRequired.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'qualitative-review',
      message: `${reviewRequired.length} qualitative requirements need manual evidence review`,
      action: 'Collect and review evidence per acceptanceCriteria and evidenceRequired fields'
    });
  }

  const pending = complianceResults.filter(r => r.status === 'pending');
  if (pending.length > 0) {
    recommendations.push({
      priority: 'low',
      category: 'pending-verification',
      message: `${pending.length} requirements pending verification`,
      action: 'Complete jurisdiction pack loading (Phase 4) or schedule testing',
      note: 'Most pending items require jurisdiction pack or simulation/testing'
    });
  }

  return recommendations;
}
