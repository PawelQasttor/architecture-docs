# Dual-Format Documentation

::: tip Core Principle
Every architectural document exists in **TWO formats**:
1. **Human-readable** - Markdown with YAML frontmatter (for architects)
2. **Machine-readable** - Pure JSON (for AI and software)
:::

---

## Why Two Formats?

Traditional documentation forces a choice:
- **Human-readable** (Word, PDF) - Good for people, opaque to machines
- **Machine-readable** (XML, JSON) - Good for software, hard for humans

**This standard provides both** - write once, consume in multiple ways.

---

## The Architecture

### Source Format: Markdown + YAML

**What architects write:**

```markdown
---
# Machine-readable metadata (YAML)
documentType: "element_specification"
elementType: "external_wall"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "compliant"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  unit: "W/(m²·K)"
version: "1.0.0"
---

# External Wall Type A

## Layer Build-up

**Layers (outside to inside):**
1. Exterior render, 15mm - Ceresit CT 60
2. Concrete block, 200mm - Solbet class 400
3. XPS insulation, 150mm - Styrodur 3035 CS
4. Air gap, 40mm
5. Gypsum board, 12.5mm - Rigips RB

## Thermal Performance

Calculated U-value: **0.18 W/(m²·K)**
Required max U-value: 0.20 W/(m²·K) (WT 2021 § 328)

✅ **Status: Compliant**

## Fire Resistance

Required: REI 60 (building class ZL III)
Provided: REI 90 (certified system)

✅ **Status: Compliant**
```

### Derived Format: Pure JSON

**What AI/software consumes:**

```json
{
  "_metadata": {
    "sourceFile": "examples/green-terrace/external-wall-type-a.md",
    "extractedAt": "2026-02-20T20:35:00.000Z",
    "format": "yaml-frontmatter"
  },
  "documentType": "element_specification",
  "elementType": "external_wall",
  "bimLOD": "LOD_400",
  "ifcMapping": {
    "ifcEntity": "IfcWallStandardCase",
    "objectType": "ExternalWall_TypeA",
    "globalId": "3vB2YO$rLBxv3VxEu2LPxQ"
  },
  "regulatoryCompliance": [
    {
      "standard": "WT_2021",
      "section": "§ 328",
      "status": "compliant"
    }
  ],
  "thermalPerformance": {
    "calculatedUValue": 0.18,
    "maxAllowedUValue": 0.20,
    "unit": "W/(m²·K)"
  },
  "version": "1.0.0"
}
```

---

## Extraction Process

### Automatic Extraction

Extract YAML frontmatter from all markdown files to JSON:

```bash
# Extract all documentation to JSON
npm run extract:json

# Extract only examples
npm run extract:examples

# Build website + extract JSON
npm run build:all
```

**Output structure:**
```
docs/public/json/
├── index.json                    # Master index
├── all-documents.json            # All frontmatter in one file
├── by-document-type.json         # Grouped by documentType
├── by-project-phase.json         # Grouped by projectPhase
└── en/
    └── examples/
        └── green-terrace/
            ├── project-specification.json
            └── external-wall-type-a.json
```

---

## Usage Scenarios

### For Human Architects

**Read/Write:** Markdown files
**Tools:** Any text editor (VS Code, Notepad++, vim)
**Version Control:** Git
**Export:** PDF via Pandoc

```bash
# Edit documentation
code docs/en/examples/green-terrace/external-wall-type-a.md

# Commit to version control
git add .
git commit -m "Update wall specification"

# Export to PDF
pandoc external-wall-type-a.md -o external-wall-type-a.pdf
```

---

### For AI Agents

**Read:** JSON files
**Access:** HTTP/file system
**Parse:** Standard JSON parsers

```javascript
// Fetch JSON directly
const response = await fetch('/json/en/examples/green-terrace/external-wall-type-a.json');
const wallSpec = await response.json();

// Access structured data
console.log(wallSpec.thermalPerformance.calculatedUValue); // 0.18
console.log(wallSpec.bimLOD); // "LOD_400"
console.log(wallSpec.ifcMapping.ifcEntity); // "IfcWallStandardCase"
```

---

### For BIM Software

**Read:** JSON files
**Import:** Property updates to IFC models

```python
import json
import ifcopenshell

# Read specification from JSON
with open('external-wall-type-a.json') as f:
    spec = json.load(f)

# Open IFC model
ifc = ifcopenshell.open('building.ifc')

# Find wall by GlobalId
wall = ifc.by_guid(spec['ifcMapping']['globalId'])

# Update properties from JSON
pset = ifcopenshell.api.run("pset.add_pset", ifc,
    product=wall,
    name="Pset_WallCommon"
)

# Set thermal transmittance from spec
ifcopenshell.api.run("pset.edit_pset", ifc,
    pset=pset,
    properties={
        "ThermalTransmittance": spec['thermalPerformance']['calculatedUValue']
    }
)
```

---

### For Quality Control

**Read:** JSON index files
**Validate:** Against schemas

```javascript
// Load all documents
const allDocs = await fetch('/json/all-documents.json').then(r => r.json());

// Find all LOD 400 specifications
const lod400Specs = allDocs.filter(doc => doc.bimLOD === 'LOD_400');

// Check compliance status
const nonCompliant = allDocs.filter(doc =>
  doc.regulatoryCompliance?.some(c => c.status !== 'compliant')
);

console.log(`Total LOD 400 specs: ${lod400Specs.length}`);
console.log(`Non-compliant documents: ${nonCompliant.length}`);
```

---

## JSON Index Files

### index.json
Master index of all extracted documents:

```json
{
  "generatedAt": "2026-02-20T20:35:00.000Z",
  "totalDocuments": 24,
  "documents": [
    {
      "file": "en/examples/green-terrace/project-specification.json",
      "documentType": "project_specification",
      "projectPhase": "design_development",
      "title": "Green Terrace Building - Project Specification"
    }
  ]
}
```

### by-document-type.json
Documents grouped by type:

```json
{
  "element_specification": [
    {
      "sourceFile": "en/examples/green-terrace/external-wall-type-a.md",
      "projectPhase": "construction_docs",
      "bimLOD": "LOD_400"
    }
  ],
  "project_specification": [...],
  "material_specification": [...]
}
```

### by-project-phase.json
Documents grouped by phase:

```json
{
  "initiation": [...],
  "concept": [...],
  "schematic": [...],
  "design_development": [...],
  "construction_docs": [
    {
      "sourceFile": "en/examples/green-terrace/external-wall-type-a.md",
      "documentType": "element_specification",
      "bimLOD": "LOD_400"
    }
  ]
}
```

---

## Benefits of Dual Format

### For Architects
- ✅ Write in simple, readable markdown
- ✅ Version control friendly (plain text)
- ✅ Easy collaboration (Git)
- ✅ Export to PDF when needed
- ✅ No special software required

### For AI
- ✅ Parse structured data easily
- ✅ Query and filter documents
- ✅ Validate against schemas
- ✅ Index and search efficiently
- ✅ Generate reports automatically

### For BIM Integration
- ✅ Update IFC properties from JSON
- ✅ Sync documentation ↔ model
- ✅ Automated compliance checking
- ✅ Property set validation
- ✅ Round-trip workflows

### For Quality Control
- ✅ Automated validation
- ✅ Compliance checking
- ✅ Completeness verification
- ✅ Consistency enforcement
- ✅ Audit trail via Git

---

## JSON Schema Validation

Validate JSON against schemas to ensure data quality:

```bash
# Validate extracted JSON
npm run validate:json
```

**Schema example:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["documentType", "bimLOD", "version"],
  "properties": {
    "documentType": {
      "type": "string",
      "enum": ["element_specification", "material_specification", "project_specification"]
    },
    "bimLOD": {
      "type": "string",
      "enum": ["LOD_100", "LOD_200", "LOD_300", "LOD_400", "LOD_500"]
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    }
  }
}
```

---

## API Endpoints (Future)

The JSON files can be served via HTTP for API access:

```
GET /json/index.json
GET /json/all-documents.json
GET /json/by-document-type.json
GET /json/by-project-phase.json
GET /json/en/examples/green-terrace/external-wall-type-a.json
```

**Query examples:**
```bash
# Get all LOD 400 specifications
curl https://docs.example.com/json/all-documents.json | \
  jq '.[] | select(.bimLOD == "LOD_400")'

# Get all construction phase documents
curl https://docs.example.com/json/by-project-phase.json | \
  jq '.construction_docs'

# Get specific wall specification
curl https://docs.example.com/json/en/examples/green-terrace/external-wall-type-a.json
```

---

## Best Practices

### 1. Always Write Frontmatter
Every markdown document should have YAML frontmatter:

```yaml
---
documentType: "element_specification"
bimLOD: "LOD_400"
version: "1.0.0"
# ... more metadata
---
```

### 2. Extract Before Publishing
Always extract JSON before deploying:

```bash
npm run build:all
```

### 3. Validate Extracted JSON
Ensure data quality:

```bash
npm run extract:json
npm run validate:json
```

### 4. Version Both Formats
Commit both markdown and JSON to Git:

```bash
git add docs/en/examples/*.md
git add docs/public/json/**/*.json
git commit -m "Update wall specification"
```

---

## Next Steps

- **For writing docs:** [Use templates](/en/templates/)
- **For extraction:** See script at `scripts/extract-frontmatter-to-json.js`
- **For validation:** [Frontmatter schema](/en/standards/frontmatter-schema)
- **For BIM sync:** [Bi-directional sync guide](/en/bim-integration/bidirectional-sync)

---

## Summary

**The dual-format approach enables:**

```
Markdown + YAML          →  Human-readable source
      ↓ (extraction)
   Pure JSON             →  Machine-readable data
      ↓ (consumption)
Multiple Use Cases:
  - AI parsing
  - BIM integration
  - Quality control
  - API access
  - Automated validation
```

**Write once in markdown, consume everywhere as JSON.**
