/**
 * Shared constants for the SBM Compiler
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
  'firePerformance'
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
