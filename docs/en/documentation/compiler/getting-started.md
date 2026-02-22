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
- `gray-matter` - YAML frontmatter parsing
- `ajv` - JSON Schema validation
- `fast-glob` - File pattern matching

### 3. Verify Installation

```bash
node scripts/compiler/index.mjs --version
```

Expected output:
```
SBM Compiler v0.1.0
```

## Your First Compilation

Let's compile the included Green Terrace example project.

### Step 1: Examine the Input

The example project is located at:
```
docs/en/examples/green-terrace/
├── building.md
├── levels/
│   └── level-01.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   └── living-room-01.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   └── hvac-zone-north.md
└── systems/
    └── sys-hvac-01.md
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

### Step 3: Check the Output

Expected console output:
```
🚀 SBM Compiler v0.1.0

📂 Input:  docs/en/examples/green-terrace
📂 Output: build/green-terrace
🌍 Country: PL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 1: PARSE
🔍 Scanning for entity files...
✓ Found 3 spaces, 2 zones, 1 system, 1 building, 1 level

STAGE 2: NORMALIZE & ENRICH
🔍 Loading jurisdiction pack...
✓ Loaded 4 global requirements
✓ Loaded 3 PL-specific requirements
✓ Auto-computed reverse relationships

STAGE 3: VALIDATE
✓ JSON Schema validation passed
✓ Referential integrity checks passed
✓ Business rules validation passed

STAGE 4: COMPILE TARGETS
✓ Generated BIM mapping (12.5 KB)
✓ Generated compliance report (45.3 KB)
✓ Generated asset register (8.2 KB)
✓ Generated digital twin schema (15.7 KB)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Compilation complete in 0.12s

📦 Outputs:
   build/green-terrace/sbm.json
   build/green-terrace/bim_mapping.json
   build/green-terrace/compliance_report.json
   build/green-terrace/asset_register.json
   build/green-terrace/twin_schema.json
```

### Step 4: Inspect the Outputs

**Canonical SBM:**
```bash
cat build/green-terrace/sbm.json
```

**Compliance Report (summary):**
```bash
node -e "console.log(JSON.stringify(require('./build/green-terrace/compliance_report.json').summary, null, 2))"
```

Expected output:
```json
{
  "totalRequirements": 7,
  "globalRequirements": 4,
  "polandSpecificRequirements": 3,
  "verified": 5,
  "pendingVerification": 2,
  "complianceRate": 71.4
}
```

## Common Workflows

### Validate Without Compiling

Check for errors without generating outputs:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --country PL \
  --validate-only
```

### Generate Specific Targets Only

Only generate BIM mapping and compliance report:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --targets bim,compliance
```

### Watch Mode (Development)

Automatically recompile when files change:

```bash
# Using nodemon (install first: npm install -g nodemon)
nodemon --watch docs/en/examples/green-terrace \
  --exec "node scripts/compiler/index.mjs compile --input docs/en/examples/green-terrace --output build/green-terrace --country PL"
```

## Understanding Compiler Output

### 1. sbm.json (Canonical Model)

The validated, enriched building model:

```json
{
  "version": "0.1",
  "metadata": {
    "compiledAt": "2026-02-20T14:32:15Z",
    "compiler": "SBM Compiler v0.1.0",
    "projectId": "PRJ-GREEN-TERRACE-2026",
    "country": "PL"
  },
  "entities": {
    "buildings": [ {...} ],
    "levels": [ {...} ],
    "spaces": [ {...} ],
    "zones": [ {...} ],
    "systems": [ {...} ],
    "assetInstances": [ {...} ],
    "requirements": [ {...} ]
  }
}
```

**Use this for:**
- AI/LLM queries about the building
- Custom analysis scripts
- Integration with other tools

### 2. bim_mapping.json

Revit and IFC property mappings:

```json
{
  "revitSharedParameters": {
    "file": "SBM_SharedParameters.txt",
    "groups": [
      {
        "name": "SBM_Identification",
        "parameters": [
          { "name": "SBM_Space_ID", "dataType": "Text" },
          { "name": "SBM_Zone_ID", "dataType": "Text" }
        ]
      }
    ]
  },
  "customPropertySets": [
    {
      "name": "Pset_SBM_Space",
      "applicableTo": "IfcSpace",
      "properties": [...]
    }
  ]
}
```

**Use this for:**
- Importing parameters into Revit
- Configuring IFC exports
- Dynamo/Grasshopper scripts

### 3. compliance_report.json

Regulatory compliance tracking:

```json
{
  "polandSpecificCompliance": {
    "regulation": "WT_2021",
    "sections": [
      {
        "section": "§ 132",
        "description": "Wysokość pomieszczeń",
        "requirements": [...],
        "status": "compliant"
      }
    ]
  },
  "spaceComplianceDetails": [...]
}
```

**Use this for:**
- Permit submissions
- Compliance dashboards
- Regulatory audits

### 4. asset_register.json

Facilities management data:

```json
{
  "assetInventory": [...],
  "maintenanceCalendar": [
    {
      "month": "2026-03",
      "tasks": [
        {
          "assetId": "AI-AHU-01",
          "taskName": "Replace air filters",
          "scheduledDate": "2026-03-15"
        }
      ]
    }
  ],
  "sparePartsInventory": [...]
}
```

**Use this for:**
- CMMS import (Maximo, SAP PM)
- Maintenance planning
- Lifecycle cost analysis

### 5. twin_schema.json

Digital twin configuration:

```json
{
  "spaceSensorBindings": [
    {
      "entityId": "SP-BLD-01-L01-001",
      "sensors": [
        {
          "sensorType": "temperature",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP",
          "thresholds": { "min": 18, "max": 26 }
        }
      ]
    }
  ],
  "runtimeEvaluationRules": [...]
}
```

**Use this for:**
- BMS configuration
- IoT sensor deployment
- Real-time compliance monitoring

## Troubleshooting

### Error: "No entities found in input directory"

**Problem:** Compiler can't find Markdown files

**Solution:**
- Verify input path is correct
- Ensure files have `.md` extension
- Check that files contain YAML frontmatter with `entityType` field

### Error: "Missing required field: spaceType"

**Problem:** Entity missing required fields

**Solution:**
- Check entity documentation for required fields
- Add missing fields to YAML frontmatter
- Example:
  ```yaml
  ---
  entityType: "space"
  spaceType: "bedroom"  # Add this
  ---
  ```

### Error: "Invalid reference: ZONE-FIRE-001 (does not exist)"

**Problem:** Entity references non-existent ID

**Solution:**
- Check that referenced entity exists
- Verify ID spelling matches exactly
- Entity must be in input directory

### Warning: "Requirement REQ-DAYLIGHT-001 not found (may be in jurisdiction pack)"

**Problem:** Space references requirement that isn't loaded

**Solution:**
- Requirement might be in jurisdiction pack for different country
- Add custom requirement to project
- Or remove reference if not needed

### Performance Issues

**Problem:** Compilation takes too long

**Solution:**
- Use `--targets` to generate only needed outputs
- Split large projects into sub-projects
- Use incremental compilation (future feature)

## Next Steps

Now that you've successfully compiled your first project:

1. **[Understand the Pipeline](/en/documentation/compiler/pipeline)** - Learn how each stage works
2. **[Create Your Own Entities](/en/documentation/authoring/)** - Start authoring semantic entities
3. **[Explore Compilation Targets](/en/documentation/compiler/pipeline)** - Deep dive into each output format
4. **[Add Custom Requirements](/en/documentation/authoring/creating-entities)** - Create project-specific rules

## Development Workflow

Recommended workflow for working with the compiler:

```bash
# 1. Create/modify entities
vim docs/en/examples/my-project/spaces/bedroom-01.md

# 2. Validate changes
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only

# 3. If valid, generate full outputs
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose

# 4. Review outputs
cat build/my-project/compliance_report.json | jq '.summary'
```

## Getting Help

- **Documentation:** [Compiler Overview](/en/documentation/compiler/)
- **Examples:** See `docs/en/examples/green-terrace/`
- **Issues:** Report bugs at GitHub Issues
- **Community:** Join discussions on GitHub Discussions
