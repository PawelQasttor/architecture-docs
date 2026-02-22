---
documentType: "technical_reference"
subject: "IFC_entities"
ifcVersion: "IFC4"
lastUpdated: "2026-02-20"
---

# IFC Entity Reference

Comprehensive reference for common IFC (Industry Foundation Classes) building elements used in architectural BIM models.

## Overview

IFC entities represent building components in a standardized, machine-readable format. This reference shows how to document these entities in markdown for human readability while maintaining BIM compatibility.

---

## IfcWall / IfcWallStandardCase

Represents walls in building models.

### Entity Hierarchy

```
IfcRoot
  └─ IfcObjectDefinition
      └─ IfcObject
          └─ IfcProduct
              └─ IfcElement
                  └─ IfcBuildingElement
                      └─ IfcWall
                          └─ IfcWallStandardCase
```

### Common Property Sets (Psets)

#### Pset_WallCommon

Standard properties for all walls:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **LoadBearing** | Boolean | Is wall load-bearing? | true |
| **IsExternal** | Boolean | Is wall external? | true |
| **FireRating** | String | Fire resistance rating | "REI 60" |
| **ThermalTransmittance** | Real | U-value [W/(m²·K)] | 0.18 |
| **AcousticRating** | Integer | Sound insulation [dB] | 55 |
| **Reference** | String | Wall type reference | "EW-01" |
| **Status** | Enum | Construction status | "EXISTING" |
| **ExtendToStructure** | Boolean | Extend to structure above? | true |

### Documentation Template

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
---

## External Wall - Type A

### IFC Properties

**Entity:** `IfcWallStandardCase`
**Object Type:** ExternalWall_TypeA
**GUID:** 3vB2YO$rLBxv3VxEu2LPxQ

### Pset_WallCommon

| Property | Value | Unit |
|----------|-------|------|
| LoadBearing | Yes | - |
| IsExternal | Yes | - |
| FireRating | REI 60 | - |
| ThermalTransmittance | 0.18 | W/(m²·K) |
| AcousticRating | 55 | dB |
| Reference | EW-01 | - |

### Material Layer Set

**IfcMaterialLayerSet:** ExternalWall_TypeA_Layers

| Layer # | Material | Thickness | Thermal λ |
|---------|----------|-----------|-----------|
| 1 | External Render | 15 mm | 0.82 W/(m·K) |
| 2 | Concrete Block | 200 mm | 0.55 W/(m·K) |
| 3 | XPS Insulation | 180 mm | 0.035 W/(m·K) |
| 4 | Air Cavity | 40 mm | - |
| 5 | Gypsum Board | 12.5 mm | 0.21 W/(m·K) |

**Total Thickness:** 447.5 mm
```

### Advanced Properties

#### Quantities (Qto_WallBaseQuantities)

| Property | Type | Description |
|----------|------|-------------|
| **Length** | Real | Wall length [m] |
| **Width** | Real | Wall thickness [m] |
| **Height** | Real | Wall height [m] |
| **GrossFootprintArea** | Real | Footprint area [m²] |
| **NetFootprintArea** | Real | Net footprint (openings deducted) [m²] |
| **GrossSideArea** | Real | Total side area [m²] |
| **NetSideArea** | Real | Net side area [m²] |
| **GrossVolume** | Real | Total volume [m³] |
| **NetVolume** | Real | Net volume [m³] |

---

## IfcSlab / IfcSlabStandardCase

Represents floor slabs, roofs, and landing platforms.

### Entity Hierarchy

```
IfcRoot
  └─ IfcObjectDefinition
      └─ IfcObject
          └─ IfcProduct
              └─ IfcElement
                  └─ IfcBuildingElement
                      └─ IfcSlab
                          └─ IfcSlabStandardCase
```

### Slab Types (PredefinedType)

| Type | Description |
|------|-------------|
| **FLOOR** | Standard floor slab |
| **ROOF** | Roof slab |
| **LANDING** | Stair landing |
| **BASESLAB** | Foundation slab |
| **APPROACH_SLAB** | Approach or ramp slab |

### Common Property Sets

#### Pset_SlabCommon

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **LoadBearing** | Boolean | Is slab load-bearing? | true |
| **IsExternal** | Boolean | Is slab external? | false |
| **FireRating** | String | Fire resistance | "REI 60" |
| **ThermalTransmittance** | Real | U-value [W/(m²·K)] | 0.14 |
| **AcousticRating** | Integer | Sound insulation [dB] | 58 |
| **Reference** | String | Slab type reference | "FL-01" |
| **PitchAngle** | Real | Slope angle [degrees] | 0.0 |

### Documentation Template

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcSlabStandardCase"
  objectType: "FloorSlab_TypeA"
  predefinedType: "FLOOR"
bimLOD: "LOD_400"
---

## Floor Slab - Type A (Typical Floor)

### IFC Properties

**Entity:** `IfcSlabStandardCase`
**Predefined Type:** FLOOR
**Object Type:** FloorSlab_TypeA

### Pset_SlabCommon

| Property | Value | Unit |
|----------|-------|------|
| LoadBearing | Yes | - |
| IsExternal | No | - |
| FireRating | REI 60 | - |
| ThermalTransmittance | N/A | - |
| AcousticRating | 58 | dB |
| Reference | FL-01 | - |

### Material Layer Set

**IfcMaterialLayerSet:** FloorSlab_TypeA_Layers

| Layer # | Material | Thickness |
|---------|----------|-----------|
| 1 | Ceramic Tile | 10 mm |
| 2 | Screed | 50 mm |
| 3 | Impact Sound Insulation | 30 mm |
| 4 | Reinforced Concrete | 200 mm |
| 5 | Ceiling Plaster | 15 mm |

**Total Thickness:** 305 mm
```

### Reinforcement (for concrete slabs)

```markdown
### Reinforcement Specification

**IfcReinforcingBar properties:**

| Layer | Bar Size | Spacing | Direction |
|-------|----------|---------|-----------|
| Bottom | Ø12 mm | 150 mm c/c | Longitudinal |
| Bottom | Ø12 mm | 200 mm c/c | Transverse |
| Top | Ø10 mm | 200 mm c/c | Longitudinal |
| Top | Ø10 mm | 250 mm c/c | Transverse |

**Cover:** 25 mm (bottom), 20 mm (top)
**Concrete Grade:** C30/37
```

---

## IfcWindow

Represents windows in building models.

### Common Properties

#### Pset_WindowCommon

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Reference** | String | Window type reference | "W-01" |
| **FireRating** | String | Fire resistance | "E 30" |
| **AcousticRating** | Integer | Sound insulation [dB] | 35 |
| **ThermalTransmittance** | Real | U-value [W/(m²·K)] | 0.80 |
| **GlazingAreaFraction** | Real | Glazing ratio | 0.75 |
| **IsExternal** | Boolean | Is external? | true |

### Documentation Template

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWindow"
  objectType: "Window_TypeA"
---

## Window - Type A

### IFC Properties

**Entity:** `IfcWindow`
**Object Type:** Window_TypeA

### Pset_WindowCommon

| Property | Value | Unit |
|----------|-------|------|
| Reference | W-01 | - |
| ThermalTransmittance | 0.80 | W/(m²·K) |
| AcousticRating | 35 | dB |
| GlazingAreaFraction | 0.75 | - |
| IsExternal | Yes | - |

### Dimensions

- **Width:** 1,200 mm
- **Height:** 1,400 mm
- **Frame depth:** 70 mm

### Glazing

- **Type:** Double glazing, low-E
- **Glass:** 4mm + 16mm argon + 4mm
- **U-value (center):** 1.1 W/(m²·K)
- **U-value (whole unit):** 0.80 W/(m²·K)
```

---

## IfcDoor

Represents doors in building models.

### Common Properties

#### Pset_DoorCommon

| Property | Type | Description |
|----------|------|-------------|
| **Reference** | String | Door type reference |
| **FireRating** | String | Fire resistance |
| **AcousticRating** | Integer | Sound insulation [dB] |
| **ThermalTransmittance** | Real | U-value [W/(m²·K)] |
| **IsExternal** | Boolean | Is external? |
| **HandicapAccessible** | Boolean | Wheelchair accessible? |

---

## Using IFC Entities in Documentation

### Complete Building Element Example

```markdown
---
documentType: "element_specification"
elementType: "external_wall"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "WT_2021"
    section: "§ 234"
---

## External Wall - Type A

### BIM Information

**IFC Entity:** `IfcWallStandardCase`
**Object Type:** ExternalWall_TypeA
**GUID:** 3vB2YO$rLBxv3VxEu2LPxQ
**LOD:** 400 (Construction Documentation)

### Properties (Pset_WallCommon)

| Property | Value | Unit | Compliance |
|----------|-------|------|------------|
| LoadBearing | Yes | - | - |
| IsExternal | Yes | - | - |
| ThermalTransmittance | 0.18 | W/(m²·K) | ✅ WT § 328 (≤0.20) |
| FireRating | REI 60 | - | ✅ WT § 234 |
| AcousticRating | 55 | dB | - |

### Material Layers (IfcMaterialLayerSet)

| # | Material | Thickness | λ [W/(m·K)] | Function |
|---|----------|-----------|-------------|----------|
| 1 | External Render | 15 mm | 0.82 | Protection |
| 2 | Concrete Block | 200 mm | 0.55 | Structure |
| 3 | XPS Insulation | 180 mm | 0.035 | Thermal |
| 4 | Air Cavity | 40 mm | - | Ventilation |
| 5 | Gypsum Board | 12.5 mm | 0.21 | Finish |

**Total:** 447.5 mm

### Quantities (Qto_WallBaseQuantities)

- **Length:** Varies per instance
- **Width:** 447.5 mm
- **Height:** 2,700 mm (typical)
- **Net Volume:** ~1.2 m³ per linear meter

### Regulatory Compliance

- ✅ **WT 2021 § 328** - Thermal: U = 0.18 ≤ 0.20 W/(m²·K)
- ✅ **WT 2021 § 234** - Fire: REI 60 (for building height 18.5m)
- ✅ **PN-EN 1996** - Structural design verified

### BIM Integration

**Export from Revit/ArchiCAD:**
- IFC 4.0 format
- Include Pset_WallCommon
- Include material layer information
- Include geometric representation

**Import to documentation:**
```bash
python bim-sync/ifc-to-markdown.py building.ifc --filter IfcWall
```
```

---

## IFC Resources

- **Official Specification:** [buildingSMART IFC Documentation](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/)
- **Property Sets:** [IFC Pset Definitions](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/annex/annex-b/alphabeticalorder_psets.htm)
- **Python Library:** [IfcOpenShell](http://ifcopenshell.org/)
- **JavaScript Library:** [IFC.js](https://ifcjs.github.io/info/)

---

## Related Documentation

- [LOD Definitions →](/en/bim-integration/lod-definitions)
- [Bi-directional Sync →](/en/bim-integration/bidirectional-sync)
- [Element Templates →](/en/templates/)
