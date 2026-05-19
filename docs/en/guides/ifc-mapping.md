# IFC Mapping: Connecting SBM to BIM Models

::: tip What This Guide Covers
How the `ifcMapping` field connects your SBM entities to IFC properties for Revit/ArchiCAD import/export.
:::

## What is IFC Mapping?

**IFC (Industry Foundation Classes)** is the standard format for BIM data exchange. When you export from Revit or ArchiCAD, you get an IFC file.

**`ifcMapping`** tells the SBM compiler:
- Which IFC class this entity corresponds to
- Which IFC property sets (Psets) to populate
- Which SBM fields map to which IFC properties

**Result**: Your Markdown documentation → automatically generates IFC-compatible data → imports into Revit/ArchiCAD with parameters populated.

---

## Basic Structure

Every entity can have an `ifcMapping` field:

```yaml
ifcMapping:
  ifcClass: "IfcSpace"           # Which IFC class
  psetName: "Pset_SpaceCommon"   # Which property set
  properties:                     # Field mappings
    - name: "NetFloorArea"
      source: "designArea"
    - name: "FinishCeilingHeight"
      source: "designHeight"
```

**How to read this**:
- This entity maps to **IfcSpace** (IFC class for rooms)
- Properties go in **Pset_SpaceCommon** (standard property set)
- SBM's `designArea` → IFC's `NetFloorArea`
- SBM's `designHeight` → IFC's `FinishCeilingHeight`

---

## Complete Example: Space

```yaml
# spaces/bedroom-01.md
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
designHeight: 2.70
spaceType: "sleeping_space"

ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "NetFloorArea"
      source: "designArea"
      unit: "m²"
    - name: "FinishCeilingHeight"
      source: "designHeight"
      unit: "m"
    - name: "Category"
      source: "spaceType"
    - name: "Reference"
      source: "id"
---

# Bedroom 01
...
```

**When compiled**, the BIM mapping output contains:

```json
{
  "ifcEntity": {
    "type": "IfcSpace",
    "globalId": "generated-guid",
    "name": "Bedroom 01",
    "properties": {
      "Pset_SpaceCommon": {
        "NetFloorArea": { "value": 14.5, "unit": "m²" },
        "FinishCeilingHeight": { "value": 2.70, "unit": "m" },
        "Category": "sleeping_space",
        "Reference": "SP-BLD-01-L01-001"
      }
    }
  }
}
```

**This JSON** is used by IFC export scripts to populate Revit/ArchiCAD parameters.

---

## Common IFC Classes by Entity Type

| SBM Entity | IFC Class | Common Pset |
|------------|-----------|-------------|
| **Site** | `IfcSite` | `Pset_SiteCommon` |
| **Building** | `IfcBuilding` | `Pset_BuildingCommon` |
| **Level** | `IfcBuildingStorey` | `Pset_BuildingStoreyCommon` |
| **Space** | `IfcSpace` | `Pset_SpaceCommon` |
| **Envelope** (wall) | `IfcWall` | `Pset_WallCommon` |
| **Envelope** (slab) | `IfcSlab` | `Pset_SlabCommon` |
| **Envelope** (roof) | `IfcRoof` | `Pset_RoofCommon` |
| **Opening** (window) | `IfcWindow` | `Pset_WindowCommon` |
| **Opening** (door) | `IfcDoor` | `Pset_DoorCommon` |
| **Vertical Circulation** (stair) | `IfcStair` | `Pset_StairCommon` |
| **System** (HVAC) | `IfcSystem` | `Pset_SystemCommon` |
| **Asset** (equipment) | `IfcDistributionElement` | Varies by type |
| **Zone** | `IfcZone` | `Pset_ZoneCommon` |

---

## Property Mapping Patterns

### Pattern 1: Direct Mapping (1:1)

**SBM field** → **IFC property** (same concept, different name)

```yaml
ifcMapping:
  properties:
    - name: "NetFloorArea"      # IFC property name
      source: "designArea"      # SBM field name
      unit: "m²"
```

### Pattern 2: Constant Value

**Fixed value** → **IFC property** (not from SBM field)

```yaml
ifcMapping:
  properties:
    - name: "IsExternal"
      value: false              # ← Constant, not from a field
```

### Pattern 3: Computed Value

**Expression** → **IFC property** (calculated from multiple fields)

```yaml
ifcMapping:
  properties:
    - name: "Volume"
      expression: "designArea * designHeight"  # ← Computed
      unit: "m³"
```

### Pattern 4: Nested Field

**SBM nested object** → **IFC property**

```yaml
# SBM has:
cost:
  design: 50000

# Map to IFC:
ifcMapping:
  properties:
    - name: "DesignCost"
      source: "cost.design"     # ← Dot notation for nested
      unit: "EUR"
```

---

## Example Mappings by Entity Type

### Space (Room)

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "NetFloorArea"
      source: "designArea"
      unit: "m²"
    - name: "FinishCeilingHeight"
      source: "designHeight"
      unit: "m"
    - name: "GrossFloorArea"
      source: "grossArea"
      unit: "m²"
    - name: "OccupancyType"
      source: "spaceType"
```

### Envelope (External Wall)

```yaml
ifcMapping:
  ifcClass: "IfcWall"
  psetName: "Pset_WallCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "IsExternal"
      value: true                # ← Constant
    - name: "ThermalTransmittance"
      source: "uValue"
      unit: "W/(m²·K)"
    - name: "FireRating"
      source: "fireRating"
    - name: "LoadBearing"
      source: "isLoadBearing"
```

### System (HVAC)

```yaml
ifcMapping:
  ifcClass: "IfcSystem"
  psetName: "Pset_SystemCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "SystemCategory"
      source: "systemCategory"
    - name: "HeatingCapacity"
      source: "capacity.heatingCapacityKW"
      unit: "kW"
    - name: "CoolingCapacity"
      source: "capacity.coolingCapacityKW"
      unit: "kW"
```

### Asset (Heat Pump)

```yaml
ifcMapping:
  ifcClass: "IfcUnitaryEquipment"
  psetName: "Pset_UnitaryEquipmentTypeCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "SerialNumber"
      source: "serialNumber"
    - name: "Manufacturer"
      source: "manufacturer"
    - name: "ModelReference"
      source: "model"
    - name: "InstallationDate"
      source: "installationDate"
    - name: "NominalCapacity"
      source: "capacity.heatingCapacityKW"
      unit: "kW"
```

---

## Custom Property Sets

You can define **custom property sets** (not IFC standard):

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  customPsets:
    - name: "Pset_CustomProjectInfo"    # ← Custom Pset
      properties:
        - name: "ProjectPhase"
          source: "lifecycle.phase"
        - name: "QualityScore"
          source: "_quality.completeness"
        - name: "DataConfidence"
          source: "designArea_meta.confidence"
```

**Use case**: Pass SBM-specific data (quality scores, provenance, compliance status) to BIM model for reporting.

---

## Multiple Property Sets

One entity can populate **multiple Psets**:

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psets:
    - name: "Pset_SpaceCommon"
      properties:
        - name: "NetFloorArea"
          source: "designArea"
    - name: "Pset_SpaceFireSafetyRequirements"
      properties:
        - name: "FireRating"
          source: "fireRating"
        - name: "SprinklerProtection"
          source: "sprinklerProtected"
    - name: "Pset_SpaceThermalRequirements"
      properties:
        - name: "SpaceTemperatureMin"
          source: "environmentalConditions.temperature.min"
        - name: "SpaceTemperatureMax"
          source: "environmentalConditions.temperature.max"
```

---

## When to Use ifcMapping

### ✅ Use When:

1. **You export to Revit/ArchiCAD** — IFC mapping ensures parameters populate correctly
2. **BIM coordination** — Architects, MEP engineers share IFC models
3. **Client requires BIM deliverables** — Many clients mandate IFC models
4. **Digital twin integration** — Building management systems read IFC

### ❌ Skip When:

1. **You don't use BIM tools** — If your workflow is pure documentation, skip `ifcMapping`
2. **Early concept phase** — Wait until schematic design (LOD 200+)
3. **No IFC export planned** — Only add if you actually export to IFC

---

## How the Compiler Uses ifcMapping

When you run:
```bash
npm run compile -- bim-mapping
```

The compiler:
1. **Reads** all entity files
2. **Finds** `ifcMapping` fields
3. **Generates** `output/bim-mapping.json` with IFC-compatible structure
4. **Python script** (`bim-sync/export-to-ifc.py`) reads this JSON → creates IFC file
5. **Import** the IFC file into Revit/ArchiCAD → parameters auto-populate

---

## IFC Export Workflow

```
┌──────────────────────┐
│ SBM Markdown Files   │
│ (with ifcMapping)    │
└──────────┬───────────┘
           │
           │ npm run compile -- bim-mapping
           ▼
┌──────────────────────┐
│ bim-mapping.json     │
│ (IFC-compatible)     │
└──────────┬───────────┘
           │
           │ python bim-sync/export-to-ifc.py
           ▼
┌──────────────────────┐
│ project.ifc          │
│ (IFC 2x3 / 4)        │
└──────────┬───────────┘
           │
           │ Import
           ▼
┌──────────────────────┐
│ Revit / ArchiCAD     │
│ (Parameters filled)  │
└──────────────────────┘
```

---

## Bidirectional Sync (Advanced)

**Scenario**: You update dimensions in Revit → want to sync back to SBM Markdown.

**Solution**: IFC import script

```bash
# Export from Revit
# File → Export → IFC → project.ifc

# Sync back to Markdown
python bim-sync/import-from-ifc.py project.ifc

# Updates Markdown files with actual dimensions
# Creates _meta provenance: { confidence: "measured", source: "IFC import 2024-03-15" }
```

**Result**: `designArea` → `actualArea`, provenance tracked.

---

## Standard IFC Property References

### Pset_SpaceCommon

| IFC Property | Typical SBM Source |
|--------------|-------------------|
| `Reference` | `id` |
| `NetFloorArea` | `designArea` |
| `GrossFloorArea` | `grossArea` |
| `FinishCeilingHeight` | `designHeight` |
| `FinishFloorHeight` | `floorElevation` |
| `IsExternal` | `isExternal` |
| `OccupancyType` | `spaceType` |
| `OccupancyNumber` | `occupancyProfile.maxOccupants` |

### Pset_WallCommon

| IFC Property | Typical SBM Source |
|--------------|-------------------|
| `Reference` | `id` |
| `IsExternal` | `isExternal` |
| `LoadBearing` | `isLoadBearing` |
| `ThermalTransmittance` | `uValue` |
| `FireRating` | `fireRating` |
| `AcousticRating` | `acousticRating` |

### Pset_DoorCommon

| IFC Property | Typical SBM Source |
|--------------|-------------------|
| `Reference` | `id` |
| `FireRating` | `fireRating` |
| `AcousticRating` | `acousticRating` |
| `IsExternal` | `isExternal` |
| `ThermalTransmittance` | `uValue` |

---

## Troubleshooting

### Problem: "IFC import shows empty parameters"

**Checklist**:
1. ✅ Did you define `ifcMapping` in your entity files?
2. ✅ Did you run `npm run compile -- bim-mapping`?
3. ✅ Did the Python script run successfully?
4. ✅ Are the IFC property names spelled exactly as IFC spec requires?

**Fix**: Check `output/bim-mapping.json` — if properties are missing there, the mapping is wrong.

### Problem: "Wrong unit in Revit"

**Cause**: Missing or incorrect `unit` in `ifcMapping.properties`

**Fix**:
```yaml
# ❌ Wrong (no unit)
- name: "NetFloorArea"
  source: "designArea"

# ✅ Correct (unit specified)
- name: "NetFloorArea"
  source: "designArea"
  unit: "m²"
```

### Problem: "Compiler ignores ifcMapping"

**Cause**: You ran `npm run compile` without `-- bim-mapping` target

**Fix**:
```bash
# ❌ Wrong (doesn't generate BIM mapping)
npm run compile

# ✅ Correct (generates bim-mapping.json)
npm run compile -- bim-mapping
```

---

## See Also

- **[BIM Integration Overview](/en/bim-integration/)** — Full BIM workflow
- **[LOD Definitions](/en/bim-integration/lod-definitions)** — Level of Development by phase
- **[IFC Entities Reference](/en/bim-integration/ifc-entities)** — Complete IFC class mapping
- **[Bidirectional Sync Guide](/en/bim-integration/bidirectional-sync)** — Two-way Markdown ↔ IFC sync

::: tip Start Simple
Don't map every field to IFC on day one. Start with the essentials (ID, area, height) and add more mappings as your BIM coordination needs grow.
:::
