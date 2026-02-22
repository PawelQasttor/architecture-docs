# Compiler Overview

The **SBM Compiler** transforms human-authored Markdown entities into a validated, machine-readable JSON format and generates multiple compilation targets for BIM, compliance, facilities management, and digital twin integration.

## What Does the Compiler Do?

The compiler bridges the gap between human-friendly authoring and machine-processable building data:

**Input:**
- Markdown files with YAML frontmatter (spaces, zones, requirements, systems, assets)
- CSV schedules (optional bulk data)
- Project configuration

**Output:**
- `sbm.json` - Validated canonical building model
- `bim_mapping.json` - Revit parameters and IFC property sets
- `compliance_report.json` - Regulatory compliance tracking
- `asset_register.json` - Facilities management data
- `twin_schema.json` - Digital twin sensor bindings

## 4-Stage Pipeline

```
┌─────────────────────────────────────────────┐
│ STAGE 1: PARSE                              │
│ • Load Markdown files from input directory  │
│ • Extract YAML frontmatter                  │
│ • Group entities by type                    │
│ Output: Raw entity collection               │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ STAGE 2: NORMALIZE & ENRICH                │
│ • Auto-generate missing IDs                 │
│ • Normalize units (m, m², m³, °C)           │
│ • Load jurisdiction pack (global + country) │
│ • Compute reverse relationships             │
│   - space.zoneIds → zone.spaceIds           │
│   - asset.systemId → system.assetInstanceIds│
│ Output: Normalized entity graph             │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ STAGE 3: VALIDATE                           │
│ • JSON Schema validation                    │
│ • Referential integrity (all IDs exist?)    │
│ • Business rules validation                 │
│   - Requirements applicable to scope?       │
│   - Required fields present?                │
│ Output: Validation report + validated graph │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ STAGE 4: COMPILE TARGETS (Parallel)        │
│ • Generate BIM mapping                      │
│ • Generate compliance report                │
│ • Generate asset register                   │
│ • Generate digital twin schema              │
│ Output: 5 compilation targets               │
└─────────────────────────────────────────────┘
```

## Basic Usage

```bash
# Compile a project
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose

# Outputs generated:
# build/green-terrace/sbm.json
# build/green-terrace/bim_mapping.json
# build/green-terrace/compliance_report.json
# build/green-terrace/asset_register.json
# build/green-terrace/twin_schema.json
```

## Command-Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `--input` | Input directory with Markdown files | `docs/en/examples/green-terrace` |
| `--output` | Output directory for compiled files | `build/green-terrace` |
| `--country` | ISO 3166-1 country code (triggers jurisdiction pack) | `PL`, `DE`, `GB`, `US` |
| `--verbose` | Show detailed logging | `--verbose` |
| `--validate-only` | Run validation without generating targets | `--validate-only` |
| `--targets` | Generate specific targets only | `--targets bim,compliance` |

## Compilation Targets

### 1. BIM Mapping (`bim_mapping.json`)

Maps SBM entities to BIM platforms:

**Use cases:**
- Generate Revit shared parameters
- Configure IFC export property sets
- Populate BIM properties via Dynamo/Grasshopper

**Key features:**
- Revit parameter definitions
- IFC Pset definitions (Pset_SBM_Space, Pset_SBM_Zone, etc.)
- Property mapping rules (SBM → Revit → IFC)

### 2. Compliance Report (`compliance_report.json`)

Tracks regulatory compliance:

**Use cases:**
- Permit submission documentation
- Regulatory audits
- Project compliance dashboards

**Key features:**
- Requirements grouped by regulation (WT 2021, Prawo budowlane, EN standards)
- Space-by-space compliance checks
- Poland WT 2021 section breakdown (§ 132, § 234, § 69, etc.)
- Verification status and methods

### 3. Asset Register (`asset_register.json`)

Facilities management data:

**Use cases:**
- CMMS import (Maximo, SAP PM, Archibus)
- Maintenance planning
- Lifecycle cost analysis
- Spare parts inventory

**Key features:**
- Asset inventory with serial numbers and tags
- 24-month maintenance calendar
- Spare parts inventory
- Warranty tracking
- CMMS-ready export formats

### 4. Digital Twin Schema (`twin_schema.json`)

Runtime monitoring configuration:

**Use cases:**
- BMS integration (BACnet, Modbus, MQTT)
- IoT sensor binding
- Real-time compliance monitoring
- Building performance analytics

**Key features:**
- Sensor bindings (space → sensors)
- BMS device registry and point mapping
- Runtime requirement evaluation rules
- Alarm and threshold configuration

## Jurisdiction Packs

The compiler automatically loads requirements based on project country:

```javascript
// Project defines country
{
  "country": "PL"
}

// Compiler automatically loads:
// - scripts/requirements/global/ (always)
// - scripts/requirements/pl/ (Poland-specific)
```

**Available packs:**
- **Global** (4 requirements) - Daylight, acoustic, thermal, ventilation
- **Poland** (3 requirements) - WT 2021 § 132, § 234, § 69

**Adding new countries:**
1. Create `scripts/requirements/{country_code}/`
2. Add requirements as JSON files
3. Compiler automatically loads when `project.country` matches

## Validation Layers

The compiler validates on three levels:

### 1. JSON Schema Validation
- Validates entity structure against `schemas/sbm-schema-v0.1.json`
- Checks required fields, data types, enum values
- Fast, automatic validation

### 2. Referential Integrity
- All referenced IDs must exist
- Example: `space.zoneIds` must reference valid zones
- Detects broken references and orphaned entities

### 3. Business Rules
- Requirements must be applicable to their scope
- Example: Sleeping space requirement only applies to bedrooms
- Prevents logical errors in model

## Error Handling

Compiler provides clear, actionable error messages:

```bash
❌ Validation failed with 3 errors:

[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
  - Invalid zoneId reference: ZONE-FIRE-INVALID (does not exist)

[ERROR] Requirement REQ-DAYLIGHT-SLEEPING-001:
  - Scope mismatch: Applied to office space (requires sleeping_space)

🔧 Fix these errors and re-run compilation
```

## Performance

Compiler performance targets:

| Project Size | Entity Count | Compile Time |
|--------------|--------------|--------------|
| Small | < 50 entities | < 1 second |
| Medium | 50-200 entities | 1-5 seconds |
| Large | 200-1000 entities | 5-15 seconds |
| Very Large | > 1000 entities | 15-60 seconds |

**Optimization techniques:**
- Incremental compilation (only changed files)
- Parallel target generation
- Entity caching
- Lazy loading of jurisdiction packs

## Continuous Integration

Integrate compiler into CI/CD pipelines:

```yaml
# GitHub Actions example
name: Validate SBM
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: |
          node scripts/compiler/index.mjs compile \
            --input docs/en/examples/green-terrace \
            --output build/green-terrace \
            --country PL \
            --validate-only
```

## Compiler Architecture

```
scripts/compiler/
├── index.mjs                  # Main entry point, CLI
├── stages/
│   ├── parse.mjs              # Stage 1: Parse Markdown
│   ├── normalize.mjs          # Stage 2: Normalize & enrich
│   ├── validate.mjs           # Stage 3: Validate
│   └── compile.mjs            # Stage 4: Generate targets
├── targets/
│   ├── bim-mapping.mjs        # BIM mapping generator
│   ├── compliance-report.mjs  # Compliance report generator
│   ├── asset-register.mjs     # Asset register generator
│   └── twin-schema.mjs        # Digital twin schema generator
├── enrichers/
│   └── jurisdiction-pack.mjs  # Jurisdiction pack loader
└── utils/
    ├── logger.mjs             # Logging utilities
    ├── file-utils.mjs         # File I/O helpers
    └── id-generator.mjs       # Deterministic ID generation
```

## See Also

- **[Getting Started](/en/documentation/compiler/getting-started)** - Installation and first compilation
- **[Compilation Pipeline](/en/documentation/compiler/pipeline)** - Detailed pipeline documentation
- **[Entity Types](/en/documentation/entities/)** - Entities that can be compiled
- **[Authoring Guide](/en/documentation/authoring/)** - Creating compilable entities
