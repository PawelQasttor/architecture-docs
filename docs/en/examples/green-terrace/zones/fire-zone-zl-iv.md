---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
levelIds:
  - "LVL-00"
  - "LVL-01"

properties:
  fireResistanceClass: "ZL-IV"
  evacuationStrategy: "protected_egress"
  fireLoadDensity: "low"
  compartmentArea: 450
  maxTravelDistance: 40
  unit: "m"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-EGRESS-TIME-001"

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P4gH0$sLByv4WyFv3MQyR"

version: "1.0.0"
tags:
  - "fire-safety"
  - "zl-iv"
  - "residential"
---

# Fire Zone: ZL-IV (Category IV)

Fire safety zone encompassing residential spaces on ground and first floor.

## Classification

- **Fire Load Category:** ZL-IV (Low fire load)
- **Occupancy Type:** Residential (sleeping spaces)
- **Fire Resistance Requirement:** REI 60 (doors), EI 60 (walls)

## Boundaries

- **Levels:** Ground floor (L00) and First floor (L01)
- **Area:** Approximately 450 m²
- **Spaces Included:** Bedrooms, corridors, bathrooms

## Fire Safety Strategy

- Protected egress routes via fire-rated corridors
- Maximum travel distance to protected staircase: 40m (compliant with WT 2021 § 234)
- Automatic smoke detection in all spaces
- Emergency lighting in corridors

## Regulatory Compliance

- **WT 2021 § 234:** Fire zone separation requirements
- **WT 2021 § 271:** Evacuation routes
- **Polish Building Code Art. 5:** Fire safety of buildings
