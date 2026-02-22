# Documentation Scripts

Scripts for processing and validating documentation.

---

## extract-frontmatter-to-json.js

**Purpose:** Extract YAML frontmatter from markdown files and generate JSON for AI/machine consumption.

### Usage

```bash
# Extract all documentation to JSON
npm run extract:json

# Extract only examples
npm run extract:examples

# Custom extraction
node scripts/extract-frontmatter-to-json.js [input-dir] [output-dir]
```

### What it does

1. **Scans** all `.md` files in input directory
2. **Extracts** YAML frontmatter from each file
3. **Generates** individual JSON files maintaining directory structure
4. **Creates** aggregated files:
   - `all-documents.json` - All frontmatter in one file
   - `index.json` - Master index with metadata
   - `by-document-type.json` - Grouped by document type
   - `by-project-phase.json` - Grouped by project phase

### Output Structure

```
docs/public/json/
├── index.json                    # Master index
├── all-documents.json            # All documents
├── by-document-type.json         # By type
├── by-project-phase.json         # By phase
└── en/
    └── examples/
        └── green-terrace/
            ├── project-specification.json
            └── external-wall-type-a.json
```

### Example

**Input:** `docs/en/examples/green-terrace/external-wall-type-a.md`
```markdown
---
documentType: "element_specification"
bimLOD: "LOD_400"
thermalPerformance:
  calculatedUValue: 0.18
---

# External Wall Type A
...
```

**Output:** `docs/public/json/en/examples/green-terrace/external-wall-type-a.json`
```json
{
  "_metadata": {
    "sourceFile": "en/examples/green-terrace/external-wall-type-a.md",
    "extractedAt": "2026-02-20T20:35:00.000Z",
    "format": "yaml-frontmatter"
  },
  "documentType": "element_specification",
  "bimLOD": "LOD_400",
  "thermalPerformance": {
    "calculatedUValue": 0.18
  }
}
```

---

## validate-frontmatter.js

**Purpose:** Validate YAML frontmatter against required schemas.

### Usage

```bash
# Validate all documentation
npm run validate

# Validate examples only
npm run validate:examples

# Custom validation
node scripts/validate-frontmatter.js [directory]
```

### What it validates

- Required fields per document type
- Valid BIM LOD values
- Valid IFC entity names
- Version format (semver)
- Date formats
- Regulatory compliance structure

### Example

```bash
$ npm run validate

Validating: docs/en/examples/green-terrace/external-wall-type-a.md
✅ Valid - documentType: element_specification
✅ Valid - bimLOD: LOD_400
✅ Valid - thermalPerformance present

Validation complete: 24 files processed, 0 errors
```

---

## Workflow

### During Development

```bash
# 1. Write documentation in markdown
code docs/en/examples/my-project/wall-spec.md

# 2. Validate frontmatter
npm run validate

# 3. Extract to JSON
npm run extract:json

# 4. Commit both formats
git add docs/en/examples/my-project/wall-spec.md
git add docs/public/json/en/examples/my-project/wall-spec.json
git commit -m "Add wall specification"
```

### Before Build/Deploy

```bash
# Build everything (extract + build site)
npm run build:all
```

This ensures:
- All JSON is up-to-date
- Website is built with latest docs
- JSON files are available for API access

---

## Integration with CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/build.yml
- name: Validate documentation
  run: npm run validate

- name: Extract JSON
  run: npm run extract:json

- name: Build site
  run: npm run docs:build
```

---

## API Access

JSON files are served at:

```
https://your-site.com/json/index.json
https://your-site.com/json/all-documents.json
https://your-site.com/json/by-document-type.json
https://your-site.com/json/en/examples/green-terrace/external-wall-type-a.json
```

**Example queries:**

```bash
# Get all LOD 400 specifications
curl https://your-site.com/json/all-documents.json | \
  jq '.[] | select(.bimLOD == "LOD_400")'

# Get construction phase documents
curl https://your-site.com/json/by-project-phase.json | \
  jq '.construction_docs'
```

---

## For More Information

See: [Dual-Format Documentation Guide](/en/standards/dual-format)
