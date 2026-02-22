# Dual-Format Documentation Architecture

## ✅ What's Been Implemented

You're absolutely right - documentation should exist in **two forms**:

### 1. Human-Readable Format (Markdown + YAML)
**For architects to write/edit:**
```markdown
---
documentType: "element_specification"
bimLOD: "LOD_400"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
---

# External Wall Type A
U-value: 0.18 W/(m²·K) ✅ Compliant
```

### 2. Machine-Readable Format (Pure JSON)
**For AI/software to parse:**
```json
{
  "_metadata": {
    "sourceFile": "green-terrace/external-wall-type-a.md",
    "extractedAt": "2026-02-20T20:48:19.883Z"
  },
  "documentType": "element_specification",
  "bimLOD": "LOD_400",
  "thermalPerformance": {
    "calculatedUValue": 0.18,
    "maxAllowedUValue": 0.20
  }
}
```

---

## 🛠️ What's Been Created

### 1. Extraction Script
**Location:** `scripts/extract-frontmatter-to-json.mjs`

**What it does:**
- Scans all markdown files
- Extracts YAML frontmatter
- Generates JSON files (maintains directory structure)
- Creates aggregated indexes

**Usage:**
```bash
# Extract all documentation
npm run extract:json

# Extract only examples
npm run extract:examples
```

### 2. Generated JSON Files

**Output structure:**
```
docs/public/json/
├── index.json                    # Master index of all docs
├── all-documents.json            # All frontmatter aggregated
├── by-document-type.json         # Grouped by type
├── by-project-phase.json         # Grouped by phase
└── examples/
    └── green-terrace/
        ├── external-wall-type-a.json
        └── project-specification.json
```

### 3. Documentation Pages

**New pages created:**
- `/en/standards/dual-format` - Complete guide to dual-format approach
- `scripts/README.md` - Scripts documentation
- Updated homepage to highlight dual-format

### 4. NPM Scripts

**Added to package.json:**
```json
{
  "extract:json": "Extract all docs to JSON",
  "extract:examples": "Extract examples to JSON",
  "build:all": "Extract + build website"
}
```

---

## 🎯 How It Works

### Workflow

```
1. Architect writes:          2. Script extracts:        3. AI/software consumes:

   wall-spec.md                    ↓                          wall-spec.json
   (Markdown + YAML)          [extraction]                  (Pure JSON)
                                   ↓
                              JSON files are:
                              • Indexed
                              • Searchable
                              • Queryable
                              • API-ready
```

### Example: Wall Specification

**Source (Markdown):** `docs/en/examples/green-terrace/external-wall-type-a.md`
- Human writes/reads this
- Version controlled in Git
- Exports to PDF via Pandoc

**Output (JSON):** `docs/public/json/examples/green-terrace/external-wall-type-a.json`
- AI parses this
- BIM software imports this
- Quality control tools query this
- Available via HTTP API

---

## 📊 Index Files

### index.json
Master index with metadata:
```json
{
  "generatedAt": "2026-02-20T20:48:19.878Z",
  "totalDocuments": 2,
  "documents": [
    {
      "file": "green-terrace/external-wall-type-a.json",
      "documentType": "element_specification",
      "projectPhase": "construction_docs",
      "title": "External Wall - Type A"
    }
  ]
}
```

### by-document-type.json
Organized by type:
```json
{
  "element_specification": [
    {
      "sourceFile": "green-terrace/external-wall-type-a.md",
      "bimLOD": "LOD_400"
    }
  ],
  "project_specification": [...]
}
```

### by-project-phase.json
Organized by phase:
```json
{
  "construction_docs": [
    {
      "sourceFile": "green-terrace/external-wall-type-a.md",
      "documentType": "element_specification"
    }
  ]
}
```

---

## 🚀 Usage Examples

### For AI Agents

```javascript
// Fetch all documentation as JSON
const docs = await fetch('/json/all-documents.json').then(r => r.json());

// Find all LOD 400 specifications
const lod400 = docs.filter(d => d.bimLOD === 'LOD_400');

// Find non-compliant documents
const issues = docs.filter(d =>
  d.regulatoryCompliance?.some(c => c.status !== 'compliant')
);
```

### For BIM Integration

```python
import json
import ifcopenshell

# Read JSON specification
with open('external-wall-type-a.json') as f:
    spec = json.load(f)

# Update IFC model
ifc = ifcopenshell.open('building.ifc')
wall = ifc.by_guid(spec['ifcMapping']['globalId'])

# Set thermal properties from JSON
pset = ifcopenshell.api.run("pset.add_pset", ifc,
    product=wall, name="Pset_WallCommon")
ifcopenshell.api.run("pset.edit_pset", ifc, pset=pset,
    properties={
        "ThermalTransmittance": spec['thermalPerformance']['calculatedUValue']
    })
```

### For Quality Control

```bash
# Query all documents
curl http://localhost:5173/json/all-documents.json

# Find all construction docs
curl http://localhost:5173/json/by-project-phase.json | jq '.construction_docs'

# Check specific specification
curl http://localhost:5173/json/examples/green-terrace/external-wall-type-a.json
```

---

## 📖 Benefits Summary

### ✅ For Architects
- Write simple markdown (human-friendly)
- Version control with Git (plain text)
- Export to PDF when needed
- No special software required

### ✅ For AI/Software
- Parse structured JSON (machine-friendly)
- Query and filter easily
- Index and search efficiently
- Automated processing

### ✅ For BIM Integration
- Bi-directional sync (Markdown ↔ IFC)
- Property updates from JSON
- Automated compliance checking
- Round-trip workflows

### ✅ For Quality Control
- Automated validation
- Completeness checking
- Consistency enforcement
- Real-time monitoring

---

## 🎓 Learn More

**Documentation:**
- [Dual-Format Guide](/en/standards/dual-format) - Complete explanation
- [Scripts README](scripts/README.md) - Technical details
- [Complete Workflow](/en/standards/document-structure) - Full architect workflow

**Try it:**
```bash
# View current site
http://localhost:5174/

# View dual-format docs
http://localhost:5174/en/standards/dual-format

# View generated JSON
http://localhost:5174/json/examples/index.json
http://localhost:5174/json/examples/green-terrace/external-wall-type-a.json
```

---

## 🔄 Next Steps

### Already Working
- ✅ Extraction script functional
- ✅ JSON generation working
- ✅ Index files created
- ✅ Documentation written
- ✅ Examples extracted

### To Expand
- Create JSON schema validation
- Add API documentation
- Create more example projects
- Add GraphQL API layer (optional)
- Integrate with BIM sync tools

---

## Summary

**You were absolutely right** - documentation needs two forms:

1. **Markdown + YAML** = Source of truth (human writes/edits)
2. **Pure JSON** = Derived format (machines parse/process)

This dual-format architecture enables:
- Human-friendly authoring
- Machine-friendly consumption
- Bi-directional BIM sync
- Automated validation
- API access
- Quality control

**Write once, consume everywhere.** 🎯
