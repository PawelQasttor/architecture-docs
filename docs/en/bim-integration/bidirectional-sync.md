# Bi-directional Sync Workflow

Complete guide to synchronizing between BIM models (IFC) and markdown documentation.

## Overview

The Architecture Documentation Standard enables bi-directional data flow:

- **BIM → Markdown**: Extract element data from IFC models into documentation
- **Markdown → BIM** *(future)*: Update BIM properties from specifications

This creates a single source of truth that exists in both formats:
- BIM models for geometry and 3D coordination
- Markdown for specifications and regulatory compliance

---

## Prerequisites

### Software Required

**For BIM → Markdown:**
- Python 3.8 or later
- IfcOpenShell library
- YAML processor

**Installation:**
```bash
cd bim-sync/
pip install -r requirements.txt
```

**For BIM Models:**
- Revit, ArchiCAD, or other BIM tool
- IFC 4.0 export capability
- Property set configuration

---

## Workflow 1: BIM → Markdown (Extract)

Extract building element specifications from IFC models into markdown documentation.

### Step 1: Prepare BIM Model

**In Revit:**
1. Ensure elements have proper type names
2. Fill in property sets (Psets):
   - Pset_WallCommon
   - Pset_SlabCommon
   - Etc.
3. Add material layers
4. Verify quantities are calculated

**In ArchiCAD:**
1. Configure property mappings
2. Ensure IFC classifications are set
3. Fill in element properties
4. Configure material layers

### Step 2: Export IFC

**Export Settings:**
- **Format**: IFC 4.0 (or IFC 2x3)
- **Include**: Property sets
- **Include**: Quantity sets
- **Include**: Material definitions
- **Include**: Type information

**Revit Export:**
```
File > Export > IFC
- IFC Version: IFC 4
- Property Sets: Export schedules as property sets
- Level of Detail: Medium or Fine
```

**ArchiCAD Export:**
```
File > Save As > IFC
- Version: IFC 4
- Translator: Ensure Psets are mapped
- Geometry: Detailed
```

### Step 3: Convert to Markdown

```bash
# Navigate to bim-sync directory
cd bim-sync/

# Convert all walls, slabs, windows, doors
python ifc-to-markdown.py ../path/to/building.ifc

# Output: ./output/IfcWall/*.md, ./output/IfcSlab/*.md, etc.
```

**Advanced Options:**
```bash
# Only specific entity types
python ifc-to-markdown.py building.ifc --entity IfcWall --entity IfcSlab

# Custom output directory
python ifc-to-markdown.py building.ifc --output ../docs/elements/

# Use custom configuration
python ifc-to-markdown.py building.ifc --config my-config.yaml
```

### Step 4: Review Generated Documentation

Each generated markdown file contains:

**YAML Frontmatter:**
```yaml
---
documentType: "element_specification"
elementType: "wall"
ifcMapping:
  ifcEntity: "IfcWall"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
thermalPerformance:
  calculatedUValue: 0.18
  unit: "W/(m²·K)"
---
```

**Markdown Content:**
- IFC information (entity, GUID)
- Property sets (tables)
- Quantities (tables)
- Material layers (table)
- Compliance placeholders

### Step 5: Enhance Documentation

Add information not in BIM model:

1. **Regulatory compliance**:
   ```yaml
   regulatoryCompliance:
     - standard: "WT_2021"
       section: "§ 328"
       status: "compliant"
   ```

2. **Detailed specifications**:
   - Manufacturer details
   - Installation instructions
   - Quality control procedures
   - Test certificates

3. **Calculations**:
   - Thermal performance calculations
   - Structural verifications
   - Fire resistance documentation

### Step 6: Version Control

```bash
# Check what changed
git diff

# Review changes
git status

# Commit updated documentation
git add docs/elements/
git commit -m "Update specs from BIM model v2.3"

# Tag version
git tag -a v2.3 -m "BIM model v2.3 documentation"
```

---

## Workflow 2: Markdown → BIM *(Future)*

Update BIM model properties from markdown specifications.

### Concept

```bash
# Parse markdown specifications
python markdown-to-ifc.py wall-spec.md

# Generate IFC property update file
# Output: wall-updates.ifc

# Import to BIM tool
# Properties updated, geometry unchanged
```

**Use Cases:**
- Update U-values from calculations
- Add fire ratings from certifications
- Update material specifications
- Add regulatory compliance data

**Status:** Future release

---

## Bi-directional Sync Strategy

### What Lives Where

**BIM Model (Geometry Authority):**
- 3D geometry
- Spatial relationships
- Quantities (automated)
- Basic properties (type, dimensions)

**Markdown Documentation (Specification Authority):**
- Detailed specifications
- Regulatory compliance
- Calculations and justifications
- Installation instructions
- Quality control procedures
- Test certificates and approvals

**Synchronized Data:**
- Material specifications
- Thermal performance (U-values)
- Fire ratings
- Acoustic ratings
- Basic element properties

### Sync Frequency

**Recommended Workflow:**

| Project Phase | Sync Frequency | Direction |
|---------------|----------------|-----------|
| **Concept Design** | Weekly | BIM → MD (initial) |
| **Schematic Design** | Weekly | BIM → MD |
| **Design Development** | Bi-weekly | BIM → MD |
| **Construction Docs** | As needed | BIM → MD |
| **Construction** | Monthly | Both directions |
| **As-Built** | Final | BIM → MD (verified) |

---

## Configuration

### config.yaml Settings

**Entity Mapping:**
```yaml
entity_mappings:
  IfcWall:
    document_type: "element_specification"
    extract_properties:
      - Pset_WallCommon.LoadBearing
      - Pset_WallCommon.ThermalTransmittance
    extract_materials: true
    extract_layers: true
```

**Regulatory Mapping:**
```yaml
regulatory_mappings:
  thermal_performance:
    ifc_property: "Pset_WallCommon.ThermalTransmittance"
    regulation: "WT_2021"
    section: "§ 328"
    max_value: 0.20
```

---

## Best Practices

### 1. Use Consistent Naming

**In BIM:**
- Use meaningful type names: "ExternalWall_TypeA" not "Wall 1"
- Use consistent object types
- Fill in Reference parameter

**In Markdown:**
- Use same names as BIM
- Reference IFC GUIDs
- Link related documents

### 2. Maintain Property Sets

**Essential Psets:**
- Pset_WallCommon - All walls
- Pset_SlabCommon - All slabs
- Pset_WindowCommon - All windows
- Pset_DoorCommon - All doors

**Fill in Critical Properties:**
- LoadBearing
- IsExternal
- FireRating
- ThermalTransmittance

### 3. Version Everything

**BIM Models:**
```
building_v1.0.ifc
building_v1.1.ifc
building_v2.0.ifc
```

**Documentation:**
```bash
git tag v1.0 -m "Schematic design documentation"
git tag v2.0 -m "Design development documentation"
```

### 4. Review Before Committing

```bash
# Always review changes
git diff

# Check frontmatter is valid
npm run validate:examples

# Verify compliance checkboxes
# Ensure calculations are updated
```

### 5. Keep Manual Edits Separate

**Strategy:**
- Generated sections: Can be overwritten
- Manual sections: Keep in separate files or clearly marked

**Example:**
```markdown
<!-- AUTO-GENERATED: Do not edit below this line -->
## IFC Properties
[Auto-generated content]

<!-- MANUAL CONTENT: Edit below -->
## Installation Instructions
[Manual content safe from regeneration]
```

---

## Troubleshooting

### "No elements found in IFC"

**Check:**
- IFC file is valid (open in viewer)
- Entity type name is correct (IfcWall not Ifc_Wall)
- Elements actually exist in model
- Export settings included elements

### "Missing property sets"

**Fix in BIM tool:**
- Revit: Fill in Type Properties
- ArchiCAD: Check property mappings
- Ensure Pset export is enabled

### "Material layers not extracted"

**Requirements:**
- Material must be IfcMaterialLayerSet type
- Layers must have thicknesses
- Material must be associated with type

### "Changes lost after regeneration"

**Solution:**
- Don't edit auto-generated sections
- Add manual content in separate sections
- Use Git to track and merge changes
- Consider selective regeneration

---

## Advanced Workflows

### Selective Sync

```bash
# Only update walls that changed
python ifc-to-markdown.py building.ifc \
  --entity IfcWall \
  --filter "ExternalWall_Type*"

# Only specific floor
python ifc-to-markdown.py building.ifc \
  --entity IfcWall \
  --filter-story "Level 1"
```

### Diff-Based Updates

```bash
# Export current version
python ifc-to-markdown.py building_v1.ifc -o v1/

# Export new version
python ifc-to-markdown.py building_v2.ifc -o v2/

# Compare
diff -r v1/ v2/

# Merge important changes
```

### Integration with CI/CD

```yaml
# .github/workflows/sync-bim.yml
name: Sync BIM Documentation
on:
  push:
    paths:
      - '**.ifc'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
      - name: Install dependencies
        run: pip install -r bim-sync/requirements.txt
      - name: Sync documentation
        run: python bim-sync/ifc-to-markdown.py models/*.ifc
      - name: Commit changes
        run: |
          git add docs/
          git commit -m "Auto-sync from BIM model"
          git push
```

---

## Next Steps

- [IFC Entities Reference →](/en/bim-integration/ifc-entities)
- [LOD Definitions →](/en/bim-integration/lod-definitions)
- [Example: Green Terrace Building →](/en/examples/green-terrace/)

---

## Resources

- **IfcOpenShell**: http://ifcopenshell.org/
- **IFC Specification**: https://standards.buildingsmart.org/IFC/
- **BIM Sync Tools**: `/bim-sync/` directory in repository
