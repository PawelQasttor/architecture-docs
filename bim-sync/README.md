# BIM Bi-directional Sync Tools

Python scripts for bi-directional synchronization between IFC building models and markdown documentation.

## Overview

These tools enable:
- **IFC → Markdown**: Extract building element data from IFC files into human-readable markdown
- **Markdown → IFC** *(Coming soon)*: Update IFC properties from markdown specifications

## Prerequisites

### Python 3.8+

```bash
python --version
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

**Key dependency:** `ifcopenshell` - IFC parsing library

## Quick Start

### 1. Export IFC from BIM Tool

From Revit, ArchiCAD, or other BIM software:
- Export to IFC 4.0 format
- Include property sets (Psets)
- Include quantity sets (Qtos)
- Include material information

### 2. Convert IFC to Markdown

```bash
# Convert all walls, slabs, windows, doors
python ifc-to-markdown.py building.ifc

# Convert only walls
python ifc-to-markdown.py building.ifc --entity IfcWall

# Specify output directory
python ifc-to-markdown.py building.ifc --output ../docs/elements/

# Convert multiple entity types
python ifc-to-markdown.py building.ifc -e IfcWall -e IfcSlab
```

### 3. Review Generated Markdown

Generated files will be in `./output/` (or specified directory):

```
output/
├── IfcWall/
│   ├── ifcwall-ExternalWall_TypeA.md
│   └── ifcwall-InternalWall_TypeB.md
├── IfcSlab/
│   ├── ifcslab-FloorSlab_TypeA.md
│   └── ifcslab-RoofSlab.md
└── ...
```

Each markdown file includes:
- ✅ YAML frontmatter with metadata
- ✅ IFC entity information (GUID, ObjectType)
- ✅ Property sets (Pset_WallCommon, etc.)
- ✅ Quantity sets (Qto_WallBaseQuantities, etc.)
- ✅ Material layers
- ✅ Compliance checklist placeholders

### 4. Edit and Version Control

```bash
# Review changes
git diff

# Commit documentation
git add output/
git commit -m "Update specs from BIM model v2.3"
```

## Configuration

Edit `config.yaml` to customize:

### Entity Mappings

Which IFC entities to process and what properties to extract:

```yaml
entity_mappings:
  IfcWall:
    extract_properties:
      - Pset_WallCommon.LoadBearing
      - Pset_WallCommon.FireRating
      - Pset_WallCommon.ThermalTransmittance
    extract_materials: true
    extract_layers: true
```

### Output Settings

Where and how to save markdown files:

```yaml
output:
  output_directory: "../docs/generated/"
  filename_pattern: "{entity_type}-{reference}.md"
  overwrite_existing: false
```

### Regulatory Mappings

Auto-map IFC properties to Polish regulations:

```yaml
regulatory_mappings:
  thermal_performance:
    ifc_property: "Pset_WallCommon.ThermalTransmittance"
    regulation: "WT_2021"
    section: "§ 328"
    max_value: 0.20
```

## Generated Markdown Format

### Frontmatter (YAML)

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
version: "1.0.0"
lastReviewed: "2026-02-20"
---
```

### Content (Markdown)

- IFC Information
- Property Sets (tables)
- Quantity Sets (tables)
- Material Layers (table)
- Compliance checklist

## Workflow Examples

### Example 1: Initial Documentation from BIM

```bash
# Architect creates BIM model in Revit
# Export: building_v1.0.ifc

# Generate documentation
python ifc-to-markdown.py building_v1.0.ifc -o ../docs/v1.0/

# Review and edit
cd ../docs/v1.0/
# Edit files, add compliance info, calculations

# Commit
git add .
git commit -m "Initial documentation from BIM v1.0"
```

### Example 2: Update After Design Changes

```bash
# Architect updates BIM model
# Export: building_v1.1.ifc

# Regenerate documentation
python ifc-to-markdown.py building_v1.1.ifc -o ../docs/v1.1/

# Compare versions
diff -r ../docs/v1.0/ ../docs/v1.1/

# Review changes in Git
git diff

# Merge important manual edits from v1.0
# Commit updated docs
git commit -m "Update from BIM v1.1 - wall thickness increased"
```

### Example 3: Extract Specific Elements

```bash
# Only extract external walls for permit submission
python ifc-to-markdown.py building.ifc \
  --entity IfcWall \
  --output ../docs/permit-submission/walls/

# Only extract slabs for structural review
python ifc-to-markdown.py building.ifc \
  --entity IfcSlab \
  --output ../docs/structural/slabs/
```

## Features

### ✅ Currently Supported

- IFC 2x3, IFC 4, IFC 4.3 reading
- IfcWall, IfcSlab, IfcWindow, IfcDoor extraction
- Property Sets (Psets) extraction
- Quantity Sets (Qtos) extraction
- Material layer extraction
- YAML frontmatter generation
- Markdown content generation
- Configurable entity mappings

### 🚧 Coming Soon

- Markdown → IFC property updates
- Custom property set creation
- Compliance auto-verification
- Change detection and merging
- Batch processing multiple IFC files
- IFC 4.3 advanced features

## Troubleshooting

### "ifcopenshell not installed"

```bash
pip install ifcopenshell
```

If installation fails, try:
```bash
# Windows
pip install --upgrade pip
pip install ifcopenshell

# macOS/Linux
pip3 install ifcopenshell
```

### "IFC file not found"

Check file path:
```bash
python ifc-to-markdown.py /full/path/to/building.ifc
```

### "No elements found"

Ensure IFC file contains the specified entity types:
- Check export settings in your BIM tool
- Verify IFC version (IFC 4.0 recommended)
- Check if elements have the correct IFC class

### Empty Property Sets

Some BIM tools don't export all Psets by default:
- In Revit: Check IFC export settings → Property Sets
- In ArchiCAD: Ensure Psets are mapped in translator
- Verify property sets exist in source model

## Advanced Usage

### Custom Entity Filtering

Edit `ifc-to-markdown.py` to add custom filters:

```python
# Only external walls
def is_external_wall(element, psets):
    wall_common = psets.get('Pset_WallCommon', {})
    return wall_common.get('IsExternal') == True

# Only load-bearing elements
def is_load_bearing(element, psets):
    common = psets.get('Pset_WallCommon') or psets.get('Pset_SlabCommon')
    return common.get('LoadBearing') == True if common else False
```

### Batch Processing

```bash
# Process all IFC files in a directory
for ifc in *.ifc; do
    python ifc-to-markdown.py "$ifc" -o "../docs/${ifc%.ifc}/"
done
```

## Integration with VitePress Site

To include generated docs in the website:

```bash
# Generate in docs folder
python ifc-to-markdown.py building.ifc -o ../docs/en/examples/my-project/

# Add to VitePress config sidebar
# Edit docs/.vitepress/config.ts
```

## Resources

- **IfcOpenShell Docs**: http://ifcopenshell.org/
- **IFC Specification**: https://standards.buildingsmart.org/IFC/
- **Property Sets Reference**: https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/annex/annex-b/alphabeticalorder_psets.htm

## License

MIT License - See LICENSE file
