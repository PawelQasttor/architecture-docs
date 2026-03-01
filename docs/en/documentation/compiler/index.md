# Compiler Overview

The **SBM Compiler v1.0.0** transforms human-authored Markdown entities into a validated, machine-readable JSON format with **hierarchical cost aggregation**, **simulation tracking**, **performance monitoring**, **multi-level spaces**, **system hierarchy**, and **construction phasing**, generating multiple compilation targets for BIM, compliance, facilities management, digital twin integration, and data quality assurance.

## What Does the Compiler Do?

The compiler bridges the gap between human-friendly authoring and machine-processable building data:

**Input:**
- Markdown files with YAML frontmatter (spaces, zones, requirements, systems, assets, **type templates**)
- CSV schedules (optional bulk data)
- Project configuration

**Output:**
- `sbm.json` - Validated canonical building model with provenance tracking
- `bim_mapping.json` - Revit parameters and IFC property sets
- `compliance_report.json` - Regulatory compliance tracking
- `asset_register.json` - Facilities management data
- `twin_schema.json` - Digital twin sensor bindings
- `quality_report.json` - **Data quality audit and phase readiness** (new in v0.2.0)

## 5-Stage Pipeline

```
┌─────────────────────────────────────────────────┐
│ STAGE 1: PARSE                                  │
│ • Load Markdown files from input directory      │
│ • Extract YAML frontmatter                      │
│ • Recognize 14 entity types + 4 type templates  │
│ Output: Raw entity collection                   │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ STAGE 2: NORMALIZE, ENRICH & RESOLVE            │
│ • Resolve type→instance inheritance             │
│   (Space Type → Space, Zone Type → Zone, etc.)  │
│ • Resolve level→space property inheritance      │
│   (typicalCeilingHeight, typicalFinishes, etc.) │
│ • Track inheritance provenance (_meta)          │
│ • Load jurisdiction pack (global + country)     │
│ • Compute reverse relationships                 │
│ • ⭐ Multi-level space resolution                │
│ • ⭐ System hierarchy (subsystem rollup)         │
│ • ⭐ COST ROLLUP: Aggregate costs               │
│   (spaces→levels→buildings→sites→project,       │
│    assets→subsystems→systems→project)           │
│ • ⭐ SIMULATION TRACKING: Aggregate             │
│   simulation results and calculate completion   │
│ • ⭐ PERFORMANCE AGGREGATION: Track             │
│   performance targets and calculate metrics     │
│ • ⭐ Construction package cost summaries         │
│ Output: Normalized entity graph with provenance │
│         + cost/simulation/performance summaries │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ STAGE 3: VALIDATE                               │
│ • JSON Schema validation (v1.0)                 │
│   - 14 entity types, cost tracking, simulations │
│     performance targets, BIM integration        │
│ • Referential integrity (all IDs exist?)        │
│ • Data provenance checks                        │
│   - Source required for high confidence         │
│   - Null fields must have _meta explanation     │
│ • Phase gate enforcement                        │
│   - Phase 4+: warn for 'assumed' fields         │
│   - Phase 5+: error for 'assumed' fields        │
│   - Phase 7+: error for 'estimated' on safety   │
│ Output: Validation report + validated graph     │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ STAGE 3.5: QUALITY SUMMARIES                    │
│ • Compute _quality block per entity             │
│   (confidence breakdown, completeness, warnings)│
│ • Identify safety-critical fields               │
│ • Generate project-wide quality summary         │
│ Output: Entities enriched with _quality blocks  │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ STAGE 4: COMPILE TARGETS (Parallel)             │
│ • Generate BIM mapping                          │
│ • Generate compliance report                    │
│ • Generate asset register                       │
│ • Generate digital twin schema                  │
│ • Generate quality report (safety audit,        │
│   provenance gaps, phase readiness)             │
│ Output: 6 compilation targets                   │
└─────────────────────────────────────────────────┘
```

## Basic Usage

```bash
# Compile a project (Phase 3 default)
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose

# Compile with strict Phase 5 enforcement
node scripts/compiler/index.mjs compile \
  --input project/entities \
  --output build/project \
  --phase 5 --country PL --verbose

# Validate only (no output files generated)
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --verbose

# Outputs generated:
# build/green-terrace/sbm.json
# build/green-terrace/bim_mapping.json
# build/green-terrace/compliance_report.json
# build/green-terrace/asset_register.json
# build/green-terrace/twin_schema.json
# build/green-terrace/quality_report.json
```

## Command-Line Options

| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `--input` | Input directory with Markdown files | *(required)* | `docs/en/examples/green-terrace` |
| `--output` | Output directory for compiled files | *(required)* | `build/green-terrace` |
| `--country` | ISO 3166-1 country code (triggers jurisdiction pack) | `PL` | `PL`, `DE`, `GB`, `US` |
| `--phase` | Project phase 1-8 for phase gate enforcement | `3` | `5` |
| `--verbose` | Show detailed logging | `false` | `--verbose` |
| `--mode` | Compilation mode | `production` | `development` |

## Phase Gate Enforcement

The `--phase` option controls how strictly the compiler validates data confidence:

| Phase | Behavior |
|-------|----------|
| 1-3 | All confidence levels accepted |
| 4 | Warns for `assumed` confidence fields |
| 5-6 | **Errors** for `assumed` confidence on any field |
| 7-8 | **Errors** for `estimated` confidence on safety-critical fields |

**Safety-critical fields** that get stricter enforcement at Phase 7+:
- `electricalSafetyGroup` (IEC 60364-7-710 group)
- `radiologicalShielding` (radiation protection)
- `fireRating` (fire resistance)
- `structuralLoad` (load-bearing capacity)

## Compilation Targets

### 1. BIM Mapping (`bim_mapping.json`)

Maps SBM entities to BIM platforms:

**Use cases:**
- Generate Revit shared parameters
- Configure IFC export property sets
- Populate BIM properties via Dynamo/Grasshopper

### 2. Compliance Report (`compliance_report.json`)

Tracks regulatory compliance:

**Use cases:**
- Permit submission documentation
- Regulatory audits
- Project compliance dashboards

### 3. Asset Register (`asset_register.json`)

Facilities management data:

**Use cases:**
- CMMS import (Maximo, SAP PM, Archibus)
- Maintenance planning
- Lifecycle cost analysis

### 4. Digital Twin Schema (`twin_schema.json`)

Runtime monitoring configuration:

**Use cases:**
- BMS integration (BACnet, Modbus, MQTT)
- IoT sensor binding
- Real-time compliance monitoring

### 5. Quality Report (`quality_report.json`)
Data quality audit and phase readiness assessment:

**Use cases:**
- Architect review before phase advancement
- Safety-critical field audit
- Provenance gap analysis (what data lacks source references?)
- Data collection planning (what to measure/verify next?)

**Key sections:**
- **Phase readiness** - Can the project advance to the next phase?
- **Safety audit** - List of all safety-critical fields with confidence levels
- **Provenance gaps** - Fields without `_meta` annotations or source references
- **Entity cards** - Per-entity quality breakdown (sorted by worst quality first)
- **Recommendations** - Prioritized list of what to fix next

## Type/Instance Inheritance Resolution

The compiler resolves two inheritance chains during normalization:

### Type → Instance

When a Space references a `spaceTypeId`, the compiler copies template fields to the instance (if not explicitly set):

```yaml
# Space Type defines defaults
id: ST-BEDROOM-STANDARD-A
designArea: 14.5
designHeight: 2.70

# Space references type
id: SP-BLD-01-L01-001
spaceTypeId: ST-BEDROOM-STANDARD-A
# designArea and designHeight inherited automatically
```

Inherited fields get `_meta` with `resolution: "type_default"`.

### Level → Space

When a Space references a `levelId`, the compiler inherits level-typical properties:

| Level Field | Space Field | Behavior |
|-------------|------------|----------|
| `typicalCeilingHeight` | `designHeight` | Copied if not set |
| `typicalFinishes` | `finishes` | Copied if not set |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Copied if not set |
| `levelRequirements` | `requirements` | **Merged** (added, not replaced) |

Inherited fields get `_meta` with `resolution: "inherited"`.

**Resolution order:** (1) Explicit value on entity, (2) Type template, (3) Level inheritance, (4) No default.

## Jurisdiction Packs

The compiler automatically loads requirements based on project country:

**Available packs:**
- **Global** (4 requirements) - Daylight, acoustic, thermal, ventilation
- **Poland** (3 requirements) - WT 2021 § 132, § 234, § 69

**Adding new countries:**
1. Create `scripts/requirements/{country_code}/`
2. Add requirements as JSON files
3. Compiler automatically loads when `project.country` matches

## Key Features

### Cost Rollup

Automatically aggregates costs from bottom-up across the building hierarchy:

**Construction costs:** Spaces → Levels → Buildings → Sites → Project
**Equipment costs:** Assets → Subsystems → Systems → Project

**Example output:**
```json
{
  "budget": {
    "totalBudget": 9000,
    "currency": "PLN",
    "breakdown": {
      "structure": { "actual": 0 },
      "equipment": { "actual": 9000 }
    },
    "_meta": {
      "confidence": "calculated",
      "source": "compiler_cost_rollup",
      "contributingEntities": [...]
    }
  }
}
```

### Simulation Tracking

Aggregates simulation results from spaces and tracks project-wide simulation progress:

**Tracked types:** daylighting, thermal, acoustic, CFD, airflow, energy
**Status tracking:** planned → in_progress → completed → failed

**Example output:**
```json
{
  "simulationSummary": {
    "totalSimulations": 5,
    "completionRate": "60.0",
    "byType": {
      "daylighting": { "total": 2, "completed": 2, "failed": 0 }
    },
    "byStatus": {
      "planned": 2,
      "completed": 3,
      "failed": 0
    }
  }
}
```

### Performance Aggregation

Tracks performance targets across spaces and calculates project-level metrics:

**Tracked categories:** daylighting, IAQ, acoustics, thermal comfort, energy, embodied carbon

**Example output:**
```json
{
  "performanceSummary": {
    "spacesWithTargets": 3,
    "targetCoverage": "100.0",
    "byCategory": {
      "energyPerformance": {
        "aggregated": {
          "averageHeatingDemand": "15.00",
          "averageCoolingDemand": "5.00",
          "unit": "kWh/m²/year"
        }
      }
    }
  }
}
```

## Validation Layers

The compiler validates on five levels:

### 1. JSON Schema Validation
- Validates entity structure against `schemas/sbm-schema-v1.0.json`
- Checks required fields, data types, enum values
- Supports all 14 entity types: cost tracking, simulations, performance targets

### 2. Referential Integrity
- All referenced IDs must exist
- Checks: `spaceTypeId`, `levelId`, `zoneIds`, `systemTypeId`, `assetTypeId`

### 3. Business Rules
- Requirements applicable to scope?
- Spaces should have zones and requirements

### 4. Data Provenance- Fields with `measured`/`calculated`/`specified` confidence must have `source` reference
- Null fields without `_meta` explanation generate warnings
- Ensures data quality tracking is complete

### 5. Phase Gates- Enforces confidence requirements based on project phase
- Prevents projects from advancing with unverified data
- Safety-critical fields get stricter enforcement

## Compiler Architecture

```
scripts/compiler/
├── index.mjs                  # Main entry point, CLI (v1.0.0)
├── stages/
│   ├── parse.mjs              # Stage 1: Parse Markdown (14 entity types)
│   ├── normalize.mjs          # Stage 2: Normalize, inheritance, relationships
│   │                          #   + Multi-level spaces, system hierarchy
│   │                          #   + Cost rollup, simulation tracking
│   │                          #   + Performance aggregation, construction packages
│   ├── validate.mjs           # Stage 3: Schema v1.0, provenance, phase gates
│   └── quality.mjs            # Stage 3.5: Quality summary generation
├── targets/
│   ├── bim-mapping.mjs        # BIM mapping generator
│   ├── compliance-report.mjs  # Compliance report generator
│   ├── asset-register.mjs     # Asset register generator
│   ├── twin-schema.mjs        # Digital twin schema generator
│   └── quality-report.mjs     # Quality report generator
├── enrichers/
│   └── jurisdiction-pack.mjs  # Jurisdiction pack loader
```

## See Also

- **[Getting Started](/en/documentation/compiler/getting-started)** - Installation and first compilation
- **[Compilation Pipeline](/en/documentation/compiler/pipeline)** - Detailed pipeline documentation
- **[Data Provenance Guide](/en/guides/data-provenance)** - How to track data sources
- **[Entity Types](/en/documentation/entities/)** - Entities that can be compiled
- **[Authoring Guide](/en/documentation/authoring/)** - Creating compilable entities
