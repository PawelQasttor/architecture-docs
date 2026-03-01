# Getting Started with the Compiler

This guide walks you through installing and running the SBM compiler for the first time.

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**
- A code editor (VS Code recommended)
- Basic command-line knowledge

## Installation

### 1. Clone or Download the Repository

```bash
git clone https://github.com/architecture-docs/standard.git
cd standard
```

### 2. Install Dependencies

```bash
npm install
```

This installs the compiler dependencies:
- `js-yaml` - YAML frontmatter parsing
- `ajv` / `ajv-formats` - JSON Schema validation

### 3. Verify Installation

```bash
node scripts/compiler/index.mjs version
```

Expected output:
```
Semantic Building Model Compiler v1.0.0
```

## Your First Compilation

Let's compile the included Green Terrace example project.

### Step 1: Examine the Input

The example project is located at:
```
docs/en/examples/green-terrace/
├── project-specification.md
├── levels/
│   └── level-01.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   └── corridor.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   ├── acoustic-zone-night.md
│   └── hvac-zone-north.md
├── zone-types/
│   ├── fire-zone-zl-iv.md
│   ├── acoustic-zone-night.md
│   └── hvac-zone-residential.md
├── systems/
│   └── sys-hvac-01.md
├── system-types/
│   └── hvac-residential-mvhr.md
├── assets/
│   └── ai-hp-01.md
└── asset-types/
    └── bosch-heat-pump-7000i.md
```

### Step 2: Run the Compiler

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose
```

**What these options mean:**
- `compile` - Run full compilation pipeline
- `--input` - Directory containing Markdown entity files
- `--output` - Where to save compiled outputs
- `--country PL` - Load Poland jurisdiction pack (WT 2021)
- `--verbose` - Show detailed logging

### Quick Validate (No Output Files)

If you just want to check your entities are valid without generating output files:

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --verbose
```

The `validate` command runs stages 1-3 (parse, normalize, validate) and exits with code 0 on success, 1 on failure.

### Step 3: Check the Output

Expected console output:
```
ℹ️  Semantic Building Model Compiler v1.0.0
ℹ️  Input: docs/en/examples/green-terrace
ℹ️  Output: build/green-terrace
ℹ️  Country: PL
ℹ️  Phase: 3

📍 Stage 1: Parse
✅ Parsed 16 entities

📍 Stage 2: Normalize, Enrich & Resolve Inheritance
✅ Normalized 3 spaces, 3 zones, 7 requirements

📍 Stage 3: Validate
✅ Validation passed - no errors

📍 Stage 3.5: Quality Summaries
✅ Quality: avg completeness 1, 21 entities analyzed

📍 Stage 4: Compile Targets
✅ Generated 5 compilation targets
✅ Generated: build/green-terrace/sbm.json
✅ Generated: build/green-terrace/quality_report.json
...

✨ Compilation complete in 0.13s
✅ Phase readiness: Project is ready to advance to Phase 4
```

### Step 4: Inspect the Outputs

**Canonical SBM:**
```bash
node -e "const s = require('./build/green-terrace/sbm.json'); console.log('Version:', s.sbm_version, '| Entities:', Object.keys(s.entities).join(', '))"
```

**Quality Report (summary):**
```bash
node -e "const q = require('./build/green-terrace/quality_report.json'); console.log('Phase readiness:', q.phaseReadiness.summary); console.log('Safety audit:', q.safetyAudit.totalFields, 'fields,', q.safetyAudit.verified, 'verified')"
```

**Compliance Report (summary):**
```bash
node -e "console.log(JSON.stringify(require('./build/green-terrace/compliance_report.json').summary, null, 2))"
```

## Understanding Compiler Output

### 1. sbm.json (Canonical Model)

The validated, enriched building model with provenance tracking:

```json
{
  "sbm_version": "1.0",
  "compiler": { "version": "1.0.0", "mode": "production" },
  "project": {
    "id": "PRJ-GREEN-TERRACE-2026",
    "name": "Residential Building Green Terrace",
    "country": "PL",
    "phase": 3
  },
  "entities": {
    "levels": [...],
    "spaces": [...],      // Each with _quality block
    "zones": [...],
    "systems": [...],
    "zone_types": [...],  // Type templates
    "system_types": [...],
    "asset_types": [...]
  }
}
```

Spaces include inherited values with provenance:
```json
{
  "id": "SP-BLD-01-L01-001",
  "designHeight": 2.7,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "inherited",
    "inheritedFrom": "LVL-01",
    "inheritedField": "typicalCeilingHeight"
  },
  "_quality": {
    "totalFields": 26,
    "completeness": 1.0,
    "lowestConfidence": "specified"
  }
}
```

### 2. quality_report.json
Data quality audit:

```json
{
  "phaseReadiness": {
    "currentPhase": 3,
    "ready": true,
    "summary": "Project is ready to advance to Phase 4"
  },
  "safetyAudit": {
    "totalFields": 3,
    "verified": 3,
    "unverified": 0
  },
  "recommendations": [
    {
      "priority": "high",
      "message": "269 field(s) have values but no provenance tracking",
      "action": "Add _meta annotations with confidence level and source reference"
    }
  ]
}
```

### 3-6. Other Targets

See [Compiler Overview](/en/documentation/compiler/) for details on `bim_mapping.json`, `compliance_report.json`, `asset_register.json`, and `twin_schema.json`.

## Phase Gate Workflow

Use the `--phase` option to enforce data quality standards:

```bash
# Phase 3 (design development) - permissive
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 3

# Phase 5 (construction docs) - strict
# Will ERROR if any field has 'assumed' confidence
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 5

# Phase 7 (as-built) - strictest
# Will ERROR if safety-critical fields have 'estimated' confidence
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 7
```

## Troubleshooting

### Error: "No entities found in input directory"

**Solution:** Verify input path is correct, files have `.md` extension, and contain YAML frontmatter with `documentType` field.

### Schema validation errors

**Solution:** Check entity documentation for required fields. Common missing fields:
- Level: `buildingId`, `version`
- Space: `buildingId`, `levelId`, `version`
- All entities: `id`, `entityType`

### Warning: "Field has 'specified' confidence but no source reference"

**Solution:** Add `source` and `sourceRef` to the field's `_meta`:
```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "ARCH-001"
  sourceRef: "Room schedule, page 12"
```

### Phase gate errors at Phase 5+

**Solution:** Either verify the data (upgrade from `assumed` to `specified` with a source reference) or compile at a lower phase while data is still being collected.

## Development Workflow

```bash
# 1. Create/modify entities
vim project/spaces/bedroom-01.md

# 2. Compile and check quality
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ \
  --country PL --verbose

# 3. Review quality report
node -e "const q = require('./build/quality_report.json'); \
  console.log(q.phaseReadiness.summary); \
  q.recommendations.forEach(r => console.log(r.priority, '-', r.message))"

# 4. Fix issues flagged by quality report

# 5. Advance phase when ready
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ \
  --phase 5 --country PL
```

## Next Steps

1. **[Understand the Pipeline](/en/documentation/compiler/pipeline)** - Learn how each stage works
2. **[Data Provenance Guide](/en/guides/data-provenance)** - How to track data sources with `_meta`
3. **[Create Your Own Entities](/en/documentation/authoring/)** - Start authoring semantic entities
4. **[Entity Types](/en/documentation/entities/)** - All 11 entity types and 4 type templates
