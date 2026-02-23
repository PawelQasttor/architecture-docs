---
documentType: "level"
entityType: "level"
id: "LVL-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

levelName: "First Floor"
levelNumber: 1
buildingId: "BLD-01"

# Spatial data
elevation: 3.20
floorToFloorHeight: 3.20
unit: "m"

# Property Inheritance (v0.1.4) - These properties cascade to all spaces on this level
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Oak engineered 3-layer 15mm"
  walls: "Acrylic paint white RAL 9010"
  ceiling: "Acrylic paint white RAL 9010"
  baseboard: "MDF white baseboard 80mm"

typicalEnvironmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 0.5
    unit: "ACH"
  pressurization: "neutral"

levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"  # WT 2021 § 132: Minimum 2.50m height
  - "REQ-LEVEL-FIRE-RATING"       # Fire resistance rating for level
  - "REQ-LEVEL-ACOUSTIC-B"        # Acoustic class B for residential

# Spaces on this level
spaceIds:
  - "SP-BLD-01-L01-001"  # Bedroom 01
  - "SP-BLD-01-L01-002"  # Bedroom 02
  - "SP-BLD-01-L01-CORR" # Corridor

# Zones spanning this level
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-ACOUSTIC-NIGHT"
  - "ZONE-HVAC-NORTH"

ifcMapping:
  ifcEntity: "IfcBuildingStorey"
  globalId: "2P3gH0$sLByv4WyFv3MQzT"
  name: "Level 01"

version: "2.0.0"
tags:
  - "residential"
  - "first-floor"
---

# Level: First Floor

First floor of Building 01 containing residential apartments.

::: tip Property Inheritance (v0.1.4)
This level defines **typical properties** that automatically cascade to all spaces on this floor:
- ✅ **Ceiling Height:** 2.70m clear (all bedrooms and corridor inherit)
- ✅ **Finishes:** Oak floor, white painted walls/ceiling (all spaces inherit)
- ✅ **Environmental:** 20-24°C, 40-60% humidity (residential comfort)
- ✅ **Requirements:** Height, fire, acoustic requirements (merged with space-specific)

Individual spaces only need to override these values when different (e.g., bathroom with lower ceiling).
:::

## Level Data

- **Elevation:** +3.20m above ground level
- **Floor-to-Floor Height:** 3.20m
- **Typical Ceiling Height:** 2.70m (inherited by all spaces)
- **Area:** Approximately 450 m²

## Spaces

- [Bedroom 01](../spaces/bedroom-01.md) - 14.5 m²
- [Bedroom 02](../spaces/bedroom-02.md) - 12.8 m²
- [Corridor](../spaces/corridor.md) - Access circulation

## Zones

- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md) - Fire safety compartmentation
- [Acoustic Zone Night](../zones/acoustic-zone-night.md) - Enhanced acoustic comfort
- [HVAC Zone North](../zones/hvac-zone-north.md) - Thermal and ventilation control

## Structure

- **Floor Construction:** 200mm reinforced concrete slab
- **Ceiling:** Suspended gypsum board, 2.70m clear height
- **Load Capacity:** 2.0 kN/m² (residential)

---

**Document Status:** Design Development (LOD 300)
**Last Review:** 2026-02-22
