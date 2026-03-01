# Changelog

All notable changes to the Structured Building Model (SBM) standard.

Format based on [Keep a Changelog](https://keepachangelog.com/).

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
