# BIM Integration Overview

The Architecture Documentation Standard integrates seamlessly with Building Information Modeling (BIM) workflows, enabling bi-directional synchronization between human-readable markdown documentation and IFC-based BIM models.

## Integration Strategy

### Hybrid Metadata Sync

- **BIM tools** (Revit, ArchiCAD) = Source of truth for **geometry/design**
- **Markdown docs** = Source of truth for **specifications/compliance/requirements**
- **Sync properties and metadata**, not geometry

This approach allows:
- ✅ BIM models remain authoritative for 3D geometry
- ✅ Documentation provides human-readable specifications
- ✅ Changes in either system can update the other
- ✅ Full audit trail via Git for documentation changes

## Text Representation of BIM Data

Instead of requiring BIM software to view specifications, represent building data in markdown:

```markdown
## Building Element: External Wall Type A

**IFC Mapping:**
- Entity: `IfcWallStandardCase`
- ObjectType: `ExternalWall_TypeA`
- GUID: `3vB2YO$rLBxv3VxEu2LPxQ`

**Properties (Pset_WallCommon):**
| Property | Value | Unit |
|----------|-------|------|
| LoadBearing | Yes | - |
| IsExternal | Yes | - |
| ThermalTransmittance | 0.24 | W/m²K |
| FireRating | REI 60 | - |

**Layer Structure:**
1. External Render (15mm)
2. Concrete Block (200mm)
3. XPS Insulation (150mm)
4. Air Gap (40mm)
5. Gypsum Board (12.5mm)
```

This format is:
- ✅ Human-readable
- ✅ AI-parseable
- ✅ Version-controllable (Git)
- ✅ BIM-compatible (IFC references)

## Bi-directional Sync Workflows

### BIM → Markdown (Export)

Extract data from BIM models to create/update documentation:

```bash
# Export IFC from Revit/ArchiCAD
File > Export > IFC 4.0

# Run sync script
python bim-sync/ifc-to-markdown.py building.ifc

# Review changes in Git
git diff

# Commit updated documentation
git add . && git commit -m "Update specs from BIM model"
```

**Use cases:**
- Generate documentation from existing BIM models
- Update specs after design changes
- Create as-built documentation
- Extract quantities and properties

### Markdown → BIM (Import)

Update BIM model properties from documentation specifications:

```bash
# Edit specifications in markdown
vim docs/specifications/wall-type-a.md

# Generate IFC property update
python bim-sync/markdown-to-ifc.py wall-type-a.md

# Import into Revit/ArchiCAD
# (Properties update, geometry unchanged)
```

**Use cases:**
- Update BIM properties from written specifications
- Apply regulatory requirements to models
- Sync material specifications
- Update compliance data

### SBM → IFC (Generate)

Generate a valid IFC4 file from compiled SBM JSON data, viewable in any IFC viewer:

```bash
# Generate IFC from SBM data
python bim-sync/sbm-to-ifc.py \
  --input build/green-terrace/sbm.json \
  --output build/green-terrace/green-terrace.ifc
```

**What it generates:**
- Spatial hierarchy: IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey
- IfcSpace with polygon-extruded geometry (from `geometry.outline` data)
- IfcWall elements along room boundaries (interior/exterior auto-detected)
- IfcSlab floor element covering the storey footprint
- IfcDoor + IfcOpeningElement for connections between spaces
- IfcZone grouping spaces, property sets (Pset_SBM_Space, Pset_SBM_Zone)

**Use cases:**
- Visualize SBM spatial data in 3D
- Validate room layouts and adjacencies
- Generate IFC for coordination with BIM tools
- Quick prototyping before detailed BIM modeling

## IFC Entity Support

The standard includes comprehensive documentation for common IFC entities:

- **IfcWall** / IfcWallStandardCase
- **IfcSlab** / IfcSlabStandardCase
- **IfcBeam** / IfcColumn
- **IfcWindow** / IfcDoor
- **IfcSpace** / IfcZone
- **IfcMaterial** / IfcMaterialLayerSet

Each entity includes:
- Property Sets (Psets)
- Common attributes
- Relationships
- Example markdown representations

## Level of Development (LOD)

The standard maps documentation requirements to BIM LOD levels:

| LOD | Geometry | Information | Documentation Level |
|-----|----------|-------------|---------------------|
| **LOD 100** | Conceptual | General | High-level specs |
| **LOD 200** | Approximate | Generic | Type specifications |
| **LOD 300** | Precise | Specific | Detailed specs |
| **LOD 400** | Fabrication | Complete | Construction docs |
| **LOD 500** | As-built | Verified | As-built records |

## Tools & Scripts

### IfcOpenShell (Python)

Industry-standard library for IFC parsing:

```python
import ifcopenshell

# Open IFC file
ifc_file = ifcopenshell.open("building.ifc")

# Get all walls
walls = ifc_file.by_type("IfcWall")

# Extract properties
for wall in walls:
    psets = ifcopenshell.util.element.get_psets(wall)
    # Generate markdown...
```

### IFC.js (JavaScript/Web)

Browser-based IFC viewer for documentation:

```vue
<template>
  <IFCViewer :src="/examples/building.ifc" />
</template>
```

## Next Steps

- 📖 [IFC Entities](/en/bim-integration/ifc-entities) - Entity reference documentation
- 📏 [LOD Definitions](/en/bim-integration/lod-definitions) - Level of Development guide
- 🔄 [Bi-directional Sync](/en/bim-integration/bidirectional-sync) - Setup and workflow
