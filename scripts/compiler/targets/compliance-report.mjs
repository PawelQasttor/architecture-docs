/**
 * Compilation Target: Compliance Report
 *
 * Generates regulatory compliance reports:
 * - Poland: WT 2021 (Warunki Techniczne) compliance
 * - EU directives (if applicable)
 * - Global performance standards
 */

/**
 * Group requirements by regulation
 */
function groupRequirementsByRegulation(requirements) {
  const grouped = {
    global: [],
    poland_wt_2021: [],
    poland_prawo_budowlane: [],
    eu_directives: []
  };

  for (const req of requirements) {
    if (req.countryScope === 'poland_specific') {
      // Check legal basis for specific regulations
      if (req.legalBasis) {
        const hasWT2021 = req.legalBasis.some(basis =>
          basis.regulation && basis.regulation.includes('WT_2021')
        );
        const hasPrawoBudowlane = req.legalBasis.some(basis =>
          basis.regulation && basis.regulation.includes('Prawo_budowlane')
        );

        if (hasWT2021) {
          grouped.poland_wt_2021.push(req);
        } else if (hasPrawoBudowlane) {
          grouped.poland_prawo_budowlane.push(req);
        } else {
          grouped.poland_wt_2021.push(req); // Default Poland-specific to WT 2021
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
 * Analyze requirement verification status
 */
function analyzeVerificationStatus(requirements, entities) {
  const summary = {
    total: requirements.length,
    verified: 0,
    pendingVerification: 0,
    notApplicable: 0
  };

  for (const req of requirements) {
    // Check if requirement has been verified
    // For Phase 3, we'll mark requirements that could be verified from design data
    const canVerifyFromDesign = ['dimensional', 'performance'].includes(req.requirementType);
    const requiresPhysicalTest = ['testing', 'measurement', 'certification'].includes(
      req.verification?.method
    );

    if (canVerifyFromDesign && !requiresPhysicalTest) {
      // Could potentially verify from current data
      summary.verified++;
    } else {
      // Requires later-stage verification
      summary.pendingVerification++;
    }
  }

  return summary;
}

/**
 * Check space compliance with requirements
 */
function checkSpaceCompliance(space, requirements, logger) {
  const results = [];

  if (!space.requirements || space.requirements.length === 0) {
    return results;
  }

  for (const reqId of space.requirements) {
    const requirement = requirements.find(r => r.id === reqId);

    if (!requirement) {
      // Requirement not found (may be in jurisdiction pack)
      results.push({
        requirementId: reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        status: 'pending',
        note: 'Requirement not yet loaded (jurisdiction pack pending)'
      });
      continue;
    }

    // Check dimensional requirements
    if (requirement.metric === 'room_height_clear' && space.designHeight) {
      const compliant = checkOperator(
        space.designHeight,
        requirement.operator,
        requirement.value
      );

      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName,
        spaceId: space.id,
        spaceName: space.spaceName,
        metric: requirement.metric,
        targetValue: requirement.value,
        unit: requirement.unit,
        measuredValue: space.designHeight,
        operator: requirement.operator,
        status: compliant ? 'compliant' : 'non-compliant',
        margin: space.designHeight - requirement.value
      });
    } else {
      // Requirement applicable but cannot verify yet (needs jurisdiction pack or simulation)
      results.push({
        requirementId: reqId,
        requirementName: requirement.requirementName || reqId,
        spaceId: space.id,
        spaceName: space.spaceName,
        status: 'pending',
        note: 'Verification pending (requires simulation, testing, or jurisdiction pack data)'
      });
    }
  }

  return results;
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
      return value >= target.min && value <= target.max;
    default:
      return null; // Unknown operator
  }
}

/**
 * Generate Poland WT 2021 compliance section
 */
function generatePolandWT2021Compliance(requirements, spaces, logger) {
  const wt2021Requirements = requirements.filter(r =>
    r.legalBasis?.some(basis => basis.regulation?.includes('WT_2021'))
  );

  logger.debug(`Found ${wt2021Requirements.length} WT 2021 requirements`);

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
            status: 'compliant'
          };
        }
        sections[section].requirements.push({
          id: req.id,
          requirementName: req.requirementName,
          status: 'verified', // Placeholder - would check actual compliance
          affectedEntities: spaces.filter(s =>
            s.requirements?.includes(req.id)
          ).length
        });
      }
    }
  }

  const overallStatus = Object.values(sections).every(s => s.status === 'compliant')
    ? 'compliant'
    : 'pending';

  return {
    regulation: "WT_2021",
    fullName: "Rozporządzenie Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie",
    sections: Object.values(sections),
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

  // Group requirements by regulation
  const groupedRequirements = groupRequirementsByRegulation(requirements);
  logger.debug(`Requirements: ${groupedRequirements.global.length} global, ${groupedRequirements.poland_wt_2021.length} Poland WT 2021`);

  // Analyze verification status
  const verificationSummary = analyzeVerificationStatus(requirements, sbm.entities);

  // Check space compliance
  const spaceComplianceResults = [];
  for (const space of spaces) {
    const results = checkSpaceCompliance(space, requirements, logger);
    spaceComplianceResults.push(...results);
  }

  logger.debug(`Checked compliance for ${spaces.length} spaces: ${spaceComplianceResults.length} checks performed`);

  // Generate Poland-specific compliance (if applicable)
  let polandSpecificCompliance = null;
  if (sbm.project.country === 'PL') {
    polandSpecificCompliance = generatePolandWT2021Compliance(
      requirements,
      spaces,
      logger
    );
    logger.debug('Generated Poland WT 2021 compliance section');
  }

  const complianceRate = spaceComplianceResults.length > 0
    ? (spaceComplianceResults.filter(r => r.status === 'compliant').length / spaceComplianceResults.length * 100).toFixed(1)
    : 0;

  const complianceReport = {
    version: "0.1",
    generatedAt: new Date().toISOString(),
    projectId: sbm.project.id,
    projectName: sbm.project.name,
    projectPhase: sbm.entities.spaces?.[0]?.projectPhase || 'design_development',

    summary: {
      totalRequirements: requirements.length,
      globalRequirements: groupedRequirements.global.length,
      countrySpecificRequirements:
        groupedRequirements.poland_wt_2021.length +
        groupedRequirements.poland_prawo_budowlane.length,
      verified: verificationSummary.verified,
      pendingVerification: verificationSummary.pendingVerification,
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
      }))
    },

    spaceComplianceDetails: spaceComplianceResults,

    verificationPlan: {
      currentPhase: sbm.entities.spaces?.[0]?.projectPhase || 'design_development',
      verificationsCompleted: spaceComplianceResults.filter(r =>
        r.status === 'compliant' || r.status === 'non-compliant'
      ).length,
      verificationsPending: spaceComplianceResults.filter(r =>
        r.status === 'pending'
      ).length,
      nextSteps: [
        "Complete jurisdiction pack loading (Phase 4) to enable all requirement checks",
        "Run energy simulation for thermal performance verification",
        "Run daylight simulation for natural lighting verification",
        "Schedule acoustic testing during construction phase",
        "Plan as-built verification measurements"
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

  // Check for non-compliant items
  const nonCompliant = complianceResults.filter(r => r.status === 'non-compliant');
  if (nonCompliant.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'non-compliance',
      message: `${nonCompliant.length} spaces have non-compliant requirements`,
      action: 'Review and adjust design to meet minimum requirements',
      affectedSpaces: nonCompliant.map(r => r.spaceId)
    });
  }

  // Check for missing requirements
  const spacesWithoutRequirements = (sbm.entities.spaces || []).filter(s =>
    !s.requirements || s.requirements.length === 0
  );
  if (spacesWithoutRequirements.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'missing-requirements',
      message: `${spacesWithoutRequirements.length} spaces have no requirements assigned`,
      action: 'Review space types and assign applicable requirements',
      affectedSpaces: spacesWithoutRequirements.map(s => s.id)
    });
  }

  // Check for pending verifications
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
