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
