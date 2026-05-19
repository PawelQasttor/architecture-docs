/**
 * Shared constants for the SBM Compiler v2.0
 *
 * Unified safety-critical field sets used by validate and quality stages.
 */

/**
 * Fields considered safety-critical — errors here can cause physical harm.
 * These get stricter phase gate enforcement (Phase 7+: must be measured/calculated/specified).
 */
export const SAFETY_CRITICAL_FIELDS = new Set([
  'electricalSafetyGroup',
  'radiologicalShielding',
  'fireRating',
  'structuralLoad',
  'pressurization',
  'shielding',
  'firePerformance',
  // v2.0 additions
  'seismicDesignCategory',
  'loadCapacity',
  'occupancyClassification',
  'constructionClass'
]);

/**
 * Fields that are nested inside environmentalConditions and are safety-critical
 */
export const SAFETY_CRITICAL_ENV_FIELDS = new Set([
  'pressurization',
  'cleanlinessClass',
  'pressureDifferentialPa',
  'filtrationClass',
  'airChangesPerHour'
]);

/**
 * Unified lifecycle phases — canonical vocabulary for SBM v2.0
 * Replaces the three inconsistent phase sets from v1.x
 */
export const UNIFIED_PHASES = [
  'concept',
  'schematic_design',
  'design_development',
  'construction_documents',
  'bidding_procurement',
  'construction',
  'commissioning',
  'operation',
  'renovation',
  'decommissioned'
];

/**
 * Legacy numeric phase (1-8, the pre-v2.0 LOD vocabulary) → unified phase.
 * Back-compat only: old `--phase 4`, legacy `project.phase: 4`, and existing
 * fixtures still resolve to a unified phase with identical gate semantics.
 */
export const LEGACY_PHASE_MAP = {
  1: 'concept',
  2: 'schematic_design',
  3: 'design_development',
  4: 'construction_documents',
  5: 'bidding_procurement',
  6: 'construction',
  7: 'commissioning',
  8: 'operation'
};

/** Default phase when none is declared (matches the Green Terrace example). */
export const DEFAULT_PHASE = 'design_development';

/**
 * Confidence-gate strictness, keyed to the unified phase at which each rule
 * starts applying. Thresholds preserve the pre-v2.0 numeric gate behaviour
 * (old Phase 4 → construction_documents, 5 → bidding_procurement,
 * 7 → commissioning).
 */
export const PHASE_GATE = {
  warnAssumedFrom: 'construction_documents',
  errorAssumedFrom: 'bidding_procurement',
  errorSafetyEstimatedFrom: 'commissioning'
};

/**
 * Resolve any phase value (unified name, legacy number, numeric string, or
 * empty) to its 0-based ordinal in UNIFIED_PHASES.
 */
export function phaseRank(phase) {
  if (phase === undefined || phase === null || phase === '') {
    phase = DEFAULT_PHASE;
  }
  if (typeof phase === 'number' || /^\d+$/.test(String(phase))) {
    phase = LEGACY_PHASE_MAP[Number(phase)] || DEFAULT_PHASE;
  }
  const idx = UNIFIED_PHASES.indexOf(phase);
  return idx === -1 ? UNIFIED_PHASES.indexOf(DEFAULT_PHASE) : idx;
}

/** Resolve any phase value to its canonical unified phase name. */
export function phaseName(phase) {
  return UNIFIED_PHASES[phaseRank(phase)];
}

/**
 * v2.0 entity types recognized by the compiler
 */
export const V2_ENTITY_TYPES = new Set([
  'campus', 'space_program', 'material_type', 'material',
  'structural_system', 'issue', 'commissioning_test', 'circulation_route'
]);

/**
 * All entity types recognized by the compiler (v1.x + v2.0)
 */
export const ALL_ENTITY_TYPES = new Set([
  'site', 'building', 'level', 'space', 'zone', 'system', 'asset', 'requirement',
  'envelope', 'vertical_circulation', 'opening', 'site_feature', 'construction_package',
  'space_type', 'zone_type', 'system_type', 'asset_type', 'opening_type', 'site_feature_type',
  // v2.0
  'campus', 'space_program', 'material_type', 'material',
  'structural_system', 'issue', 'commissioning_test', 'circulation_route'
]);
