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
designHeight: 2.70
designVolume: 22.1
unit: "m"

requirements:
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

version: "1.0.0"
tags:
  - "circulation"
  - "fire-egress"
  - "protected"
---

# Space: First Floor Corridor

Protected circulation space connecting bedrooms to staircase.

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

- **Floor:** Ceramic tiles (non-slip, easy to clean)
- **Walls:** Painted gypsum plaster on fire-rated construction
- **Ceiling:** Painted gypsum plaster
- **Doors:** Fire-rated timber doors with vision panels

## Accessibility

- **Level Access:** No steps or thresholds
- **Door Width:** 90 cm clear opening (wheelchair accessible)
- **Circulation Space:** Adequate maneuvering space at door swings
