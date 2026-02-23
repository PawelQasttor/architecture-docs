---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-CORR"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "First Floor Corridor"
spaceType: "corridor"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"

designArea: 8.2
# designHeight: 2.70  ← INHERITED from LVL-01.typicalCeilingHeight (v0.1.4)
# finishes: ceramic tile ← OVERRIDE needed (different from level's oak floor)
designVolume: 22.1
unit: "m"

# Finishes override (corridor needs tile, not oak from level)
finishOverrides:
  floor: "Ceramic tiles non-slip R10"  # Override level's oak floor
  # walls: white paint ← INHERITED from level
  # ceiling: white paint ← INHERITED from level

# Requirements merged: Level requirements + Instance requirements (v0.1.4)
requirements:
  # From LVL-01.levelRequirements (MERGED):
  #   - REQ-PL-WT-ROOM-HEIGHT-001 (2.50m minimum)
  #   - REQ-LEVEL-FIRE-RATING
  #   - REQ-LEVEL-ACOUSTIC-B
  # Plus instance-specific requirements:
  - "REQ-PL-WT-CORRIDOR-WIDTH-001"
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-PL-FIRE-SEPARATION-001"

occupancy:
  maxOccupants: 4
  usagePattern: "circulation"
  hoursPerDay: 2
  daysPerWeek: 7

maintenanceZone: "MZ-RESIDENTIAL-01"
accessRestrictions: "residents"

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "connects_via_door"
  - id: "SP-BLD-01-L01-002"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxS"
  objectType: "Corridor"

version: "1.1.0"
tags:
  - "circulation"
  - "fire-egress"
  - "protected"
changelog:
  - version: "1.1.0"
    date: "2026-02-23"
    description: "Updated to use property inheritance (v0.1.4) - ceiling height inherited, floor finish overridden"
  - version: "1.0.0"
    date: "2026-02-22"
    description: "Initial creation"
---

# Space: First Floor Corridor

Protected circulation space connecting bedrooms to staircase.

::: tip Level Inheritance (v0.1.4)
This corridor inherits from **Level 01**:
- ✅ **Ceiling Height:** 2.70m (inherited, no need to specify)
- ✅ **Finishes:** White painted walls/ceiling (inherited)
- ⚠️ **Floor Override:** Ceramic tile (overrides level's oak floor for durability)
- ✅ **Requirements:** Merged with level requirements (height, fire, acoustic)

No space type used — pure level inheritance.
:::

## Dimensions

- **Floor Area:** 8.2 m²
- **Clear Width:** ≥ 1.20 m (compliant with WT 2021 § 69)
- **Clear Height:** 2.70 m
- **Length:** Approximately 6.5 m

## Function

Internal corridor providing access to:
- Bedroom 01 (east)
- Bedroom 02 (west)
- Staircase to ground floor (south)
- Bathroom (not yet modeled)

## Fire Safety Role

This corridor is part of the protected egress route from bedrooms to the staircase.

### Fire Protection Requirements

- **Fire Doors:** All doors to bedrooms must be EI 30 with self-closers
- **Wall Construction:** Fire-rated partitions (REI 60)
- **Smoke Detection:** Automatic smoke detector required
- **Emergency Lighting:** Battery-backed LED luminaires with 90-minute autonomy
- **Maximum Travel Distance:** 40 m to protected staircase (compliant)

## Requirements Summary

| Requirement | Target Value | Verification Method |
|-------------|--------------|---------------------|
| Corridor width | ≥ 1.20 m | Measurement (WT 2021 § 69) |
| Fire door rating | EI 30 | Certification |
| Emergency lighting | 90 min autonomy | Testing |
| Smoke detection | Automatic | Inspection |

## Systems

- **Fire Detection:** Optical smoke detector (part of SYS-FIRE-ALARM-01)
- **Emergency Lighting:** LED emergency luminaires with central battery
- **Ventilation:** Natural ventilation via openable window at corridor end
- **Electrical:** Minimal power outlets (cleaning)

## Finishes

::: info Inheritance Pattern
Most finishes inherited from Level 01, with floor overridden for circulation use.
:::

- **Floor:** Ceramic tiles non-slip R10 (⚠️ **OVERRIDE** — level specifies oak, but corridor needs durable tile)
- **Walls:** Acrylic paint white RAL 9010 (✅ **INHERITED** from level)
- **Ceiling:** Acrylic paint white RAL 9010 (✅ **INHERITED** from level)
- **Baseboard:** MDF white baseboard 80mm (✅ **INHERITED** from level)
- **Doors:** Fire-rated timber doors EI 30 with vision panels

## Accessibility

- **Level Access:** No steps or thresholds
- **Door Width:** 90 cm clear opening (wheelchair accessible)
- **Circulation Space:** Adequate maneuvering space at door swings
