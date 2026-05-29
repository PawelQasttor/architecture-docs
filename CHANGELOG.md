# Changelog

All notable changes to the Semantic Building Model (SBM) standard.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [2.4.0] - 2026-05-29 — Delivery & approval process layer: permit + approval_gate + regulatory_inspection

Opens the **"how the building gets BUILT"** dimension that the original
`SBM-EVALUATION-v1.1.md` named as the model's #1 remaining weakness. Where
v2.2/v2.3 modelled *how the building performs* (operational analytics), v2.4
models the **regulatory delivery & approval process** — permits, phase-gate
milestones, and statutory inspections — grounded in the Polish building-delivery
research (`docs/deep-research-report.md`). Additive only — every v2.3-conforming
model is also v2.4-conforming. Brings the standard to **34 entity types**.

### Added

- **New `permit` entity type (32nd).** Regulatory authorizations / administrative
  decisions: `permitType` covers zoning_decision (WZ), local_plan_extract (MPZP),
  environmental_decision, building_permit, notification (zgłoszenie),
  demolition_permit, occupancy_permit, completion_notice, heritage_approval,
  utility_connection_conditions. Carries an inline `issuingAuthority` (typed
  authority enum incl. PINB/WINB/conservator), `status` lifecycle (incl.
  `silent_consent` for the silence-rule routes), `statutoryDeadlineDays`, decision
  dates, `conditions[]`, fee, and supersession/appeal chain. ID `^PERMIT-...$`.
- **New `approval_gate` entity type (33rd).** Phase-gate go/no-go milestones
  (design_freeze, permit_ready, construction_start, completion_authorized,
  operational_readiness, …) with `decisionOwner`, a `prerequisites[]` checklist,
  `deliverableRefs`, `blockingIssueIds`, and `relatedPermitIds`. ID `^GATE-...$`.
- **New `regulatory_inspection` entity type (34th).** Statutory periodic
  inspections (annual / 5-year per Prawo Budowlane Art. 62, plus chimney/gas/
  electrical/fire/lift) with `statutoryBasis`, schedule, inspector, result +
  deficiencies, and a `cKobEntry` link to the digital building logbook (c-KOB —
  Cyfrowa Książka Obiektu Budowlanego). ID `^INSP-...$`.
- **`schemas/sbm-schema-v2.4.json`** — new schema file (v2.0 / v2.2 / v2.3 stay
  frozen for reference).
- **10 v2.4 entities demonstrated across all 3 sibling examples (EN + PL):**
  green-terrace — `PERMIT-WZ-001`, `PERMIT-PB-001`, `GATE-DESIGN-FREEZE-CD`,
  `GATE-PERMIT-READY`; green-terrace-2028 — `PERMIT-OCCUPANCY-001`,
  `GATE-COMPLETION-AUTHORIZED`, `INSP-ANNUAL-2027`, `INSP-5YEAR-DUE-2028`
  (c-KOB recorded); green-terrace-park — `PERMIT-CAMPUS-MASTER`,
  `GATE-CAMPUS-PLANNING` (campus-level coordination, blocked by
  `ISS-CAMPUS-PLANNING-001`).
- **New sidebar entries** for every new page, in both locales.

### Changed

- `sbm_version` "2.3" → "2.4" in compiler output + schema const.
- Compiler `VERSION` 2.3.0 → 2.4.0.
- New `V2_4_ENTITY_TYPES` set in constants; `ALL_ENTITY_TYPES` extended; parse
  `validTypes` extended.
- Normalize: 3 new buckets + 3 output spread entries + 3 metadata count entries.
- Validate: light v2.4 cross-entity rules (dangling `relatedEntityIds` / permit /
  issue refs → warning; permit `expiryDate < validFrom` → error; a `passed`
  approval_gate with an unmet prerequisite → warning).
- Quality: profiles added for all 3 new entity types.
- Targets: `compliance-report` gains a `deliveryAndApprovals` section (permits /
  gates / inspections with outstanding-item rollups); `twin-schema` surfaces the
  `regulatory_inspections` schedule; `html-report` gains a bilingual
  "Delivery & approvals" section.
- Tests: 3 new `describe` blocks (12 tests) in `validate.test.mjs`; `sbm_version`
  fixtures bumped 2.3 → 2.4. **130/130 pass** (was 118).

### Migration

- Bump the `sbm_version` field to `"2.4"`. No other changes required — additive
  schema only. All v2.0 / v2.2 / v2.3 models validate cleanly under v2.4.

### Significance

The SBM standard now spans the full lifecycle question set: *what the building
**is*** (design/spatial entities), *how it **performs*** (operational analytics,
v2.2/v2.3), and *how it gets **built and governed*** (regulatory delivery &
approval, v2.4). The Polish examples show the same entity types at three
lifecycle phases — front-end permitting, post-handover occupancy + statutory
inspection, and multi-building campus coordination.

## [2.3.0] - 2026-05-24 — All operation-phase SCHEMA-GAPS resolved: occupant_survey + energy_verification_record + retrocx_recommendation

Second schema bump in one day. Closes the remaining 3 gaps from the
operation-phase SCHEMA-GAPS inventory. **All 5 gaps that triggered the
v2.x operation-phase work are now resolved with first-class entities.**
Additive only — every v2.2-conforming model is also v2.3-conforming.

### Added

- **New `occupant_survey` entity type (29th).** Structured Likert-scale
  + free-text occupant feedback with anonymised quotes carrying
  `affectedEntityId` + `triggeredIssueId` cross-links. ID `^SURVEY-...$`.
- **New `energy_verification_record` entity type (30th).** In-use energy
  reconciliation with measured vs designTargets blocks, verdict enum, and
  `deltaAnalysis` per-factor attribution to assets / entities / related
  issues. ID `^EVR-...$`.
- **New `retrocx_recommendation` entity type (31st).** Retro-commissioning
  as a first-class lifecycle distinct from generic Issue.
  `triggeredByIssueIds` + `triggeredBySurveyId` + `triggeredByTelemetryStreamId`
  capture the full causal chain; `expectedOutcome` + `verificationPlan`
  add a typed verification loop. ID `^RCX-...$`.
- **`schemas/sbm-schema-v2.3.json`** — new schema file (v2.0 + v2.2 stay
  frozen for reference).
- **3 v2.3 entities retrofitted into Green Terrace 2028** (EN + PL):
  `SURVEY-BLD-01-IEQ-2027`, `EVR-BLD-01-2027` (with 3-factor delta
  attribution to HP COP drift / MVHR HR drift / air-tightness slip),
  `RCX-MVHR-001` (linking telemetry → issue → survey → recommendation →
  verification as one structured record).
- **3 new sidebar entries per locale** under the operation-phase example.

### Changed

- `sbm_version` "2.2" → "2.3" in compiler output + schema const.
- Compiler `VERSION` 2.2.0 → 2.3.0.
- New `V2_3_ENTITY_TYPES` set in constants; `ALL_ENTITY_TYPES` extended.
- Normalize: 3 new buckets + 3 new output spread entries + 3 new
  metadata count entries.
- Tests: 3 test files updated to assert `sbm_version: '2.3'`. 104/104 pass.
- SCHEMA-GAPS.md gap-resolution banner updated to **"ALL FIVE GAPS RESOLVED"**.
- Narrative companion pages (`tenant-survey-summary`, `energy-verification`)
  kept alongside their v2.3 entity counterparts as reader-friendly summaries.

### Migration

- Bump `sbm_version` field to `"2.3"`. No other changes required
  (additive schema only). All v2.0 + v2.2 models validate cleanly under v2.3.

### Significance

This release **completes the operation-phase modelling story** that
started with the Green Terrace 2028 example. The SBM standard now has
typed entities for every operation-phase pattern surfaced by that
example: time-series telemetry, asset operational history, occupant
feedback, in-use energy verification, and retro-commissioning. Future
operation-phase examples can be authored entirely in structured form.

---

## [2.2.0] - 2026-05-24 — Operation-phase schema extensions: telemetry_stream + asset.operationalHistory

The first schema bump since v2.0. Additive only — every v2.0-conforming
model is also v2.2-conforming. Resolves the top two gaps from the
`SCHEMA-GAPS.md` inventory surfaced by the Green Terrace 2028
operation-phase example.

### Added

- **New `telemetry_stream` entity type (28th entity).** Wraps a
  continuous numeric data stream (BMS point, sub-meter, IoT device) with:
  a `dataReference` (file path or live protocol: file_csv, bacnet, mqtt, etc.),
  human-asserted or compiler-computed `summaryStatistics` (min/max/mean/median
  + rolling means over arbitrary windows), explicit `thresholds` (design
  target, regulatory limit, operator alarm, energy baseline, comfort band)
  with `currentlyExceeded` state + `exceededSince` date, and `qualityMetadata`
  (coverage fraction, outage events, calibration valid-until).
  ID pattern `^TEL-[A-Z0-9-]+$`. Each stream references its measured entity
  via `measuredEntityId` + `measuredEntityType` (space, system, asset,
  building, level, envelope, site_feature).
- **`asset.operationalHistory` structured sub-schema.** Adds typed fields
  to the `asset` entity for: `runtimeHours` + `runtimeHoursAsOf`,
  `cycleCount`, `energyConsumed_kWh`, `filterChangeCount`,
  `zoneValveReplacements`, a chronological `servicedAt` array (date, type
  enum [planned_inspection / warranty_repair / unplanned_repair /
  parts_replacement / filter_change / rebalancing / zone_valve_replacement /
  recommissioning / decommission / other], technician, findings, cost_eur,
  relatedIssueId), `performanceTrend` (asset-type-specific via
  additionalProperties), and `dataSource` (link to underlying telemetry).
  Previously these fields had to live in opaque `additionalProperties`
  blobs — now they're typed + queryable.
- **`asset.activeIssueIds`** — array of operation-phase issue IDs currently
  affecting the asset. Lets the compiler render cross-entity lineage in
  the asset register target.
- **`schemas/sbm-schema-v2.2.json`** — new schema file (the v2.0 schema
  stays frozen for reference, per convention).
- **2 telemetry_stream entities** retrofitted into the Green Terrace 2028
  example (EN + PL): `TEL-CO2-402-001` (driving the CO₂ anomaly issue)
  and `TEL-HP-COP-001` (driving the post-warranty COP drift narrative).
  Replaces the v2.0 "narrative + external CSV reference" pattern with
  first-class queryable entities.

### Changed

- **`sbm_version` bumped to "2.2"** in compiler output + schema const.
  The compiler now emits and validates against the v2.2 schema by default.
- **Compiler version**: 2.1.0 → 2.2.0
- **Constants**: new `V2_2_ENTITY_TYPES` set with `telemetry_stream`;
  `ALL_ENTITY_TYPES` extended. `parse.mjs validTypes` extended.
- **Normalize stage**: `telemetry_streams` bucket added to `grouped`,
  to the output `entities:` spread, and to `metadata.entitiesByType`
  counts (following the same pattern as the v2.0 bucket fix from the
  previous Unreleased section).
- **Tests**: 3 test files updated to assert against `sbm_version: '2.2'`
  instead of `'2.0'`. 104/104 tests still pass.
- **SCHEMA-GAPS.md** in the 2028 example now notes gaps #1 (telemetry_stream)
  and #2 (asset.operationalHistory) as **RESOLVED in v2.2**. Gaps #3-#5
  (occupant_survey, energy_verification_record, retrocx_recommendation as
  first-class lifecycle) remain candidates for v2.3+.

### Migration

- Existing v2.0 models continue to validate cleanly under the v2.2 schema
  (additive changes only). Just bump the `sbm_version` field to `"2.2"`.
- To opt into the new `telemetry_stream` entity, create `TEL-*.md` files
  in your input directory under a `telemetry-streams/` folder (or any
  folder — the compiler scans recursively).
- To opt into typed `asset.operationalHistory`, replace any opaque
  `additionalProperties` representation with the typed sub-schema.

---

## [Unreleased] — Green Terrace v2.1 example refresh + operation-phase showcase + compiler v2.0 bucket fix

Post-2.1.0. Three bundled changes: (a) full normalization of the
Green Terrace flagship example to v2.0 schema + 10-phase lifecycle
coverage with 11 new v2.0 entities, (b) new sibling example
**Green Terrace 2028** demonstrating the operation lifecycle phase
with measured commissioning results, asset operational history,
6 operation-phase issues, and a SCHEMA-GAPS inventory listing v2.2
proposals, (c) compiler bug fix where v2.0 entity buckets
(`space_programs`, `material_types`, `materials`, `structural_systems`,
`issues`, `commissioning_tests`, `circulation_routes`, `campuses`) were
grouped during normalize but never emitted to sbm.json output.
SBM standard itself unchanged (sbm_version stays 2.0).

### Added
- **Green Terrace v2.1 refresh** — 11 new v2.0 entities cover the
  remaining lifecycle phases: `PROG-BEDROOM-STANDARD` (concept brief),
  `STR-GREEN-TERRACE` + `MT-CONCRETE-C30-37` + `MT-INSULATION-PIR-150`
  (DD-phase structural + materials extracted from prose into queryable
  entities), `CR-FIRE-EGRESS-L01` (CD-phase circulation route),
  3 Issues spanning bidding + construction, 3 scheduled
  Commissioning Tests. Updated index narrative with a Lifecycle
  Walkthrough table mapping every phase to its example entity.
  Bedrooms 4.02 ↔ corridor inheritance + brief-to-design check now
  trigger an intentional under_provision warning (2 designed of 27
  programmed — pedagogical scope, documented in PROG entity notes).
- **Green Terrace 2028 sibling example** — same BLD-01, 22 months
  post-handover. 45 files (EN + PL parity). All 3 commissioning tests
  have `results.measured` populated; one came back as a conditional
  pass and triggered a downstream non-conformance issue. 3 assets
  carry 22 months of operational history (runtime hours, service
  events, performance trend). 6 operation-phase issues span warranty
  (HP compressor batch defect), tenant maintenance request, BMS-detected
  CO₂ anomaly, retro-commissioning recommendation, annual fire
  inspection finding, and an 18-month air-tightness NCR. Post-occupancy
  energy verification (47 vs 45 kWh/m²/year — Class B confirmed) and
  tenant IEQ survey summary as narrative docs.
- **SCHEMA-GAPS.md inventory** in the 2028 example — 5 places where
  v2.0 doesn't cleanly model operation-phase needs, with proposed v2.2
  shapes: `telemetry_stream`, `asset.operationalHistory` sub-schema,
  `occupant_survey`, `energy_verification_record`, and
  `retrocx_recommendation`. Input to v2.2 standard discussion.
- **npm scripts**: `sbm:validate:2028` + `sbm:compile:2028` (uses
  `--phase operation` to opt into operation-phase gate behaviour).
- **VitePress sidebar**: new "Green Terrace 2028 (Operation Phase)"
  collapsible section in both locales.

### Fixed
- **Compiler: v2.0 entity buckets dropped from sbm.json output.**
  `scripts/compiler/stages/normalize.mjs` grouped v2.0 entities
  (campuses, space_programs, material_types, materials, structural_systems,
  issues, commissioning_tests, circulation_routes) correctly but the
  `entities:` spread and `metadata.entitiesByType` block only listed v1
  buckets. v2.0 entities parsed + validated but disappeared from output.
  Now all 8 v2.0 buckets are conditionally emitted alongside v1 buckets.
  Surfaced by the v2.1 example refresh.
- **Green Terrace example**: every entity bumped to `version: "2.1.0"`
  (was patchwork of "0.4.0" / "1.0.0" / "2.0.0"). project-specification.md
  legacy `documentType: "project"` removed (entityType retained) and
  legacy numeric `phase: 4` normalized to canonical `phase: "construction_documents"`.
  Requirement files: non-canonical phase strings (`construction_documentation`,
  `handover`, `schematic`, `as_built`) normalized to the 10-phase enum.
  Stripped "NEW v0.4" / "SBM v0.4 Summary" labelling cruft from
  project-specification.

### Earlier post-2.1.0 work (Polish localization + Project-at-a-glance diagrams)

Already-merged work since v2.1.0, kept in this Unreleased section pending
the next tagged release. Closes the bilingual-parity gaps surfaced after
the report i18n fix and adds three schematic SVG diagrams to the report.
SBM standard unchanged.

### Added
- **Project-at-a-glance diagrams** — new compiler target `targets/diagrams.mjs`
  generating three SVGs derived from existing data (no schema changes):
  - **Massing (LOD 100)** — oblique axonometric extruded box from
    building.footprintArea / buildingHeight / numberOfStoreys, with
    floor lines at level elevations + eave marker.
  - **Stacking** — vertical level bands sized by floor-to-floor height,
    coloured by predominant space type, labelled with elevation, level
    name, space count and area.
  - **Adjacency & connections** — space node-link graph from
    openings.spaceIds, with zone-membership chips (fire/HVAC/acoustic)
    per space.
  - Embedded in `report.html` as a "Project at a glance" panel at the
    top; localised per project.language (EN/PL).

### Fixed
- **Report fully localized.** Recommendation/blocker text and compliance
  status values were English even for Polish projects. `quality-report.mjs`
  now emits stable machine `code`s; `html-report.mjs` renders
  recommendations/blockers/status in the project language. The Polish
  Green Terrace report is now 100% Polish (chrome + recommendations +
  status); JSON targets stay English/stable for machine consumers.
- **PL docs English sweep.** Pre-existing untracked English prose (verbatim
  EN copies) in the Polish flagship example and reference/authoring pages
  translated to domain-accurate Polish: the 3 requirement specs
  (REQ-FIRE-EGRESS / ACOUSTIC-B / FIRE-RATING), system/asset/zone/space
  type examples, `encje/wymaganie` & `encje/poziom` JSON example blocks,
  `tworzenie/*` authoring examples — descriptions, requirements, warranty
  terms, maintenance tasks, deliverables, notes, role titles. Canonical
  schema vocabulary (entityType/documentType/usage/status enums, phase &
  confidence identifiers) intentionally remains identical in both locales,
  as in the standard.

---

## [2.1.0] - 2026-05-19 — Coherence, demoability & presentation

A tooling + documentation release. The **SBM standard itself is unchanged**
(`sbm_version` stays `2.0`, schema `2.0.0`) — this release makes the v2.0
substance internally consistent, demoable, and easy to present/explore.
Covers Tracks A (coherence), B (demoable), and C (streamlined IA).

### Changed
- **Canonical name** is now **"Semantic Building Model"** everywhere
  (schema v2.0 title, CHANGELOG, site/locale titles, CLAUDE.md). Frozen
  historical schemas (v0.4/v1.0/v1.1) intentionally keep their original title.
- **Phase model fully unified to the 10 named lifecycle phases.** The
  pre-v2.0 8-step LOD vocabulary and the compiler's numeric `phase` are
  retired in favour of `concept … decommissioned`:
  - Compiler emits named phases (`phaseRank`/`phaseName`, `PHASE_GATE`,
    `DEFAULT_PHASE=design_development`); legacy numeric `--phase`/`phase:`
    still accepted via `LEGACY_PHASE_MAP`.
  - Schema `project.phase` → `oneOf(unified-name enum | legacy int 1-8)`.
  - `docs/{en/phases,pl/fazy}/`: 8 legacy pages → 10 unified-phase pages +
    a canonical lifecycle index (old→new migration + gate tables); full
    EN/PL parity. Nav/sidebars rebuilt; triplicated "workflow" links removed;
    241 cross-references remapped.
- Landing pages: "8 Project Phases" → 10-phase lifecycle; "19 types" → 27.

### Fixed
- Compiler dropped a declared `project.budget`, forcing PL projects to
  PLN and producing spurious cross-entity currency warnings — now respects
  declared currency (country only as fallback).
- Green Terrace flagship: budget migrated v0.4→v2.0 shape; missing
  `building`/levels/asset-types added; dangling refs fixed
  (25 → 7 warnings; the 7 are legitimate requirement-scope info).
- `.gitignore` un-anchored `examples/` rule was silently un-tracking the
  flagship example under `docs/en/examples/`.

### Added
- **Human-readable HTML report** compiler target (`report.html`) — a
  self-contained printable page (lifecycle position, requirement
  verification progress, data quality, regulatory compliance) for
  clients/principals. `npm run sbm:report` one-command showcase; a live
  sample is published at `/green-terrace-report.html`.

### Removed
- Unrelated XanoScript scaffold (340 untracked files) that had been
  dumped into this docs repo.

### Track B notes
- Output reframed: pre-`construction_documents` pending verification is
  presented as expected progress, not a compliance-failure score.
  Requirement scope-filter notes moved from warnings to `--verbose`
  debug; Green Terrace flagship now validates with zero warnings.

### Track C notes — present & explore
- **Quick-start** cut from 742 lines to a true ~110-line 5-minute path
  (one file → references → compile → HTML report); EN/PL parity restored.
- **Pitch deduplicated**: the "why" lived verbatim on the landing,
  `introduction.md` and the quick-start. `introduction.md` is now the
  single canonical rationale; landing trimmed 293→~115 (hero + features +
  teaser + persona routing); quick-start links out instead of repeating.
- **Green Terrace** reframed from a 376-line flat file dump into a ~95-line
  guided tour that follows one bedroom (instance → type/level inheritance →
  overlapping zones → cascaded requirements → cost rollup → HTML report).
- **Information architecture**: overlapping nav sprawl collapsed to six
  clear groups — Start · Model · Lifecycle · Compiler · Example ·
  Reference (EN+PL). Content directories unchanged on disk.

---

## [2.0.0] - 2026-03-17

### Added
- **8 new entity types** (27 total, up from 19):
  - `campus` — Multi-site development container (CAM- prefix)
  - `space_program` — Quantitative space programming with brief-to-design compliance checking (PROG- prefix)
  - `material_type` / `material` — Reusable material specifications with sustainability tracking (MT-/MAT- prefixes)
  - `structural_system` — Structural engineering: frame type, foundations, loads, seismic design (STR- prefix)
  - `issue` — Construction administration: RFIs, change orders, submittals, inspections, punch lists (ISS- prefix)
  - `commissioning_test` — Commissioning and acceptance test results with pass/fail tracking (CT- prefix)
  - `circulation_route` — Egress and accessibility path modeling with travel distance validation (CR- prefix)
- **Building entity major extension**: grossFloorArea, netFloorArea, footprintArea, numberOfStoreys, buildingHeight, eaveHeight, floorAreaRatio, buildingCoverageRatio, occupancyClassification (ZL I-V/PM/IN), constructionClass (A-E), structuralSystem, sustainability (energy performance, embodied carbon, certifications, circular economy), yearBuilt, yearRenovated, accessibilityCompliance, campusId
- **Unified lifecycle phases** (10 phases): concept, schematic_design, design_development, construction_documents, bidding_procurement, construction, commissioning, operation, renovation, decommissioned — replaces 3 inconsistent phase vocabularies from v1.x
- **Classification system integration**: optional `classification` field (Uniclass, OmniClass, CSI MasterFormat, CI/SfB) on all entities
- **Responsibility tracking**: optional `responsibility` field (discipline, organization, contact, role) on all entities
- **Sustainability framework**: embodied carbon, operational carbon, EPC class, LCA reference, BREEAM/LEED/DGNB/WELL tracking, circular economy indicators
- **Asset FF&E distinction**: `assetCategory` enum (equipment, furniture, fixture, fitting, signage, artwork, appliance, it_equipment)
- **New compiler validations (v2.0)**:
  - Currency consistency: warns when entity cost currency differs from project currency
  - Bidirectional adjacency: warns when adjacency declarations are one-directional
  - Requirement scope matching: warns when requirement scope doesn't match referencing entity
  - Level order continuity: detects duplicate level order values
  - Space program compliance: warns on under-provisioned programs
- **Reverse relationships**: campus→siteIds, building→structuralSystemIds, structural system hierarchy
- **Space program auto-computation**: designedQuantity, designedTotalArea, compliance status
- **Safety-critical fields expanded**: seismicDesignCategory, loadCapacity, occupancyClassification, constructionClass
- **Quality profiles** for all 8 new entity types

### Changed
- **Schema** `sbm-schema-v1.1.json` -> `sbm-schema-v2.0.json`, version `2.0.0`, `sbm_version` const `"2.0"`
- **Compiler version** `1.1.0` -> `2.0.0`
- **Project phases** unified from 3 vocabularies (8+7+6 phases) to single 10-phase vocabulary
- **Requirement verification phases** aligned with project phases
- **Space lifecycle states** aligned with project phases
- **Building quality profile** expanded: critical fields now include buildingType, occupancyClassification
- **Construction package taggable entities** expanded: materials and structural systems now tracked

---

## [1.1.0] - 2026-03-01

### Added
- **5 new entity types** (19 total, up from 14):
  - `opening` / `opening_type` — Windows, doors, skylights as first-class entities (promoted from inline `envelope.openings[]`)
  - `site_feature` / `site_feature_type` — Landscape elements, parking, green infrastructure
  - `construction_package` — Construction work packages (promoted from inline `project.constructionPackages[]`)
- **Weighted completeness** in quality stage: critical fields (weight 3), important (weight 2), standard (weight 1)
- **Entity-type profiles** in quality stage: `profileCompleteness` and `missingExpected` per entity
- **Safety-critical tracking** for `firePerformance` on openings (fire doors)
- **Shared constants** (`scripts/compiler/constants.mjs`) for safety-critical field sets
- **New validation rules**: cost completeness warnings, duplicate zone membership detection, circular dependency detection for construction packages
- **New referential integrity checks**: opening→envelope, site_feature→site, construction_package dependencies
- **Opening type inheritance**: opening_type→opening field propagation
- **Site feature type inheritance**: site_feature_type→site_feature field propagation
- **Reverse relationships**: envelope→openingIds, site→siteFeatureIds, construction_package→assignedEntityIds
- **Legacy migration**: inline `envelope.openings[]` and `project.constructionPackages[]` auto-migrated to standalone entities
- **Asset register**: includes openings with maintenance/warranty data
- **BIM mapping**: Pset_SBM_Opening, Pset_SBM_SiteFeature, Pset_SBM_ConstructionPackage
- **Green Terrace example**: 12 new files (EN + PL each): 2 opening types, 3 openings, 1 site feature type, 2 site features, 4 construction packages
- **Entity documentation**: opening.md, site-feature.md, construction-package.md (EN + PL)
- **36 new tests** (104 total, up from 68): parse, normalize, validate, quality, integration

### Changed
- **Schema** `sbm-schema-v1.0.json` → `sbm-schema-v1.1.json`, version `1.1.0`, `sbm_version` const `"1.1"`
- **Compiler version** `1.0.0` → `1.1.0`
- **Green Terrace** entities: 57 → 69 (12 new entities from 5 new types)
- Quality stage uses unified constants from `constants.mjs`
- Validation stage uses unified constants from `constants.mjs`

---

## [1.0.0] - 2026-02-28

### Added
- **Automated test suite** using Node.js built-in test runner (`node --test`)
- **`validate` CLI subcommand** — runs parse/normalize/validate without generating output files
- **CHANGELOG.md** documenting all versions

### Changed
- **Schema renamed** from `sbm-schema-v0.4.json` to `sbm-schema-v1.0.json`
- **Schema version** updated to `1.0.0`, `sbm_version` const to `"1.0"`
- **Compiler version** updated to `1.0.0`
- **Asset entity** now requires `assetName` field
- Removed versioned description annotations (`(v0.4)`, `(v0.6)`) from schema
- Updated all compiler documentation references (EN + PL)
- Completed PL Green Terrace example translations (29/29 files)

### Fixed
- `sbm:validate` npm script now uses `validate` subcommand instead of duplicating `compile`

---

## [0.6.0] - 2026-02-28

### Added
- **Multi-level spaces**: `levelIds` array, `isMultiLevel` auto-computed flag (atriums, voids, double-height rooms)
- **System hierarchy**: `parentSystemId` / `subsystemIds` for HVAC decomposition (e.g., HVAC → Heating + Ventilation)
- **Construction phasing**: `constructionPackages` on project (CP- prefix), `constructionPackageId` on space/system/asset/envelope
- **Requirement scoping fix**: `spaceIds` and `departments` matching in `isRequirementApplicable()`
- Green Terrace examples: stairwell void (multi-level), heating/ventilation subsystems, 4 construction packages
- Circular system hierarchy detection in validate stage
- Per-package cost summary aggregation

### Changed
- Cost rollup extended: assets → leaf systems → parent systems → project (no double-counting)
- Level→spaces reverse relationship uses `levelIds` (not just `levelId`)
- Project-level system cost aggregation filters to root systems only

---

## [0.5.0] - 2026-02-28

### Added
- **Site entity** (`entityType: "site"`): plot/parcel context with address, siteArea, buildableArea, greenArea, siteConstraints, utilities, topography, zoningDesignation
- **Envelope entity** (`entityType: "envelope"`): wall/roof/slab construction layers, thermal/acoustic/fire performance, moisture control, openings
- **Vertical Circulation entity** (`entityType: "vertical_circulation"`): staircases, elevators, ramps, escalators with capacity, accessibility, fire escape, egress calculations
- Cost rollup extended: spaces → levels → buildings → **sites** → project
- Green Terrace examples: site, envelope (external wall type A), staircase A

### Changed
- Entity count: 11 → 14 types
- Removed ghost entities (`site`, `space_program`) from entity index — replaced with real implementations

---

## [0.4.0] - 2026-02-27

### Added
- **Hierarchical cost rollup**: spaces → levels → buildings → project, assets → systems → project
- **Simulation tracking**: aggregate simulation results, completion rates, status tracking
- **Performance aggregation**: per-space performance targets rolled up to project metrics
- **Enhanced BIM integration**: project-level BIM settings, IDS mapping, BCF issue tracking
- New schema: `sbm-schema-v0.4.json`

### Changed
- Compiler upgraded from v0.3.0 to v0.4.0
- Full provenance tracking for all rolled-up costs (`confidence: calculated`, `source: compiler_cost_rollup`)

---

## [0.3.0] - 2026-02-24

### Added
- **Healthcare completeness overhaul**: 9 gaps fixed from hospital stress-test
- `spaceType` enum: 22 → 52 values (+17 healthcare, +13 infrastructure)
- `zoneType` enum: 7 → 12 (+medical_electrical, radiation_protection, cleanroom, infection_control, pressure_cascade)
- `systemCategory` enum: 8 → 13 (+medical_gas, nurse_call, pneumatic_tube, medical_waste, it_network)
- Structured `finishSpec` (material, fireClass, antimicrobial, seamless, etc.)
- Extended `environmentalConditions` (+airChangesPerHour, freshAirPercentage, filtrationClass, pressureDifferentialPa, laminarFlow, operatingRoomClass)
- Qualitative requirements (acceptanceCriteria, evidenceRequired)
- `adjacentSpaces` with 9 relationship types, boundaryType, fireRating
- `shieldingSpec` (radiological, rfShielding, acousticIsolation)
- Departments array on project
- **24 Polish jurisdiction requirements** (WT 2021 + Rozporządzenie Ministra Zdrowia)

### Changed
- Requirement metric/operator/value now optional
- New schema: `sbm-schema-v0.3.json`

---

## [0.2.0] - 2026-02-23

### Added
- **Data provenance tracking**: field-level `_meta` annotations with 6-level confidence
- **Phase gate enforcement**: Phase 4 warns assumed, Phase 5+ errors assumed, Phase 7+ errors estimated on safety-critical
- **Quality stage** (Stage 3.5): per-entity `_quality` blocks, project quality summary
- **Quality report target**: safety audit, provenance gaps, phase readiness
- `fieldMeta`, `documentSource`, `qualitySummary` shared definitions
- New schema: `sbm-schema-v0.2.json`

### Changed
- Compiler upgraded from v0.1.0 to v0.2.0
- Parser recognizes 4 type entities (space_type, zone_type, system_type, asset_type)
- Normalize stage adds inheritance provenance (`_meta` annotations)

---

## [0.1.4] - 2026-02-23

### Added
- **Property inheritance**: OOP-style Level → Space inheritance
- 4 inheritable properties on Level: `typicalCeilingHeight`, `typicalFinishes`, `typicalEnvironmentalConditions`, `levelRequirements`
- Requirements merged (union) from type, level, and explicit sources

---

## [0.1.3] - 2026-02-22

### Added
- `environmentalConditions` (Space + Space Type): temperature, humidity, ventilation, pressurization, cleanlinessClass
- `electricalSafetyGroup` (Space + Space Type): IEC 60364-7-710
- `regulatoryReferences` (Space): array of code/section/description/status
- `lifecycleState` (Space): planned/design/under_construction/operational/renovation/decommissioned

---

## [0.1.2] - 2026-02-22

### Added
- `roomNumber` (Space): human-readable room number from drawings
- `accessibilityLevel` (Space + Space Type): standard/mobility/visual/hearing/full
- `parentSpaceId` (Space): parent/child hierarchy
- `departmentId` (Space): functional department grouping
- `bedCount` (Space occupancy + Space Type occupancyProfile)

---

## [0.1.1] - 2026-02-22

### Added
- **Type/Instance pattern**: Space Type, Zone Type, System Type, Asset Type entities
- Type templates define specs once, instances reference via `spaceTypeId`, `zoneTypeId`, `systemTypeId`, `assetTypeId`
- 26-33% documentation reduction for projects with repeated room types

---

## [0.1.0] - 2026-02-21

### Added
- Initial SBM schema with 7 entity types: building, level, space, zone, system, asset, requirement
- SBM Compiler v0.1.0 with 4-stage pipeline (parse, normalize, validate, targets)
- 5 compilation targets: BIM mapping, compliance report, asset register, digital twin schema
- VitePress documentation site (EN + PL)
- Green Terrace example project
