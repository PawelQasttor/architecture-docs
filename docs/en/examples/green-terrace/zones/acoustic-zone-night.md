---
documentType: "zone"
entityType: "zone"
id: "ZONE-ACOUSTIC-NIGHT"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Acoustic Zone - Night"
zoneType: "acoustic"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"

properties:
  acousticClass: "B"
  usageType: "sleeping_spaces"
  soundInsulationRequirement: 52
  impactSoundRequirement: 53
  unit: "dB"

requirements:
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-ACOUSTIC-PARTITION-001"

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P4gH0$sLByv4WyFv3MQyT"

version: "1.0.0"
tags:
  - "acoustic"
  - "sleeping"
  - "class-b"
---

# Acoustic Zone: Night (Sleeping Spaces)

Acoustic zone grouping bedrooms requiring enhanced sound insulation.

## Acoustic Classification

- **Class:** B (Enhanced acoustic comfort per PN-B-02151-3)
- **Usage Type:** Sleeping spaces (bedrooms)
- **Protection Level:** High (nighttime use)

## Sound Insulation Requirements

### Airborne Sound Insulation (R'w)
- **Between apartments:** ≥ 52 dB
- **From external noise:** ≥ 30 dB (Rw of facade)
- **From internal sources (corridors, stairs):** ≥ 47 dB

### Impact Sound Insulation (L'n,w)
- **From spaces above:** ≤ 53 dB
- **Floor construction:** Floating floor with resilient layer

## Construction Requirements

### Partition Walls
- Mass: ≥ 220 kg/m² (double-wythe masonry or equivalent)
- No rigid connections between wall layers
- Acoustic sealing at all penetrations

### Doors
- Acoustic doors with seals (Rw ≥ 32 dB)
- No undercut gaps

### Windows
- Double glazing minimum: 6mm + 16mm air + 6mm
- Laminated glass for external facades

## Regulatory Compliance

- **PN-B-02151-3:2015:** Acoustic protection in buildings - Requirements for residential spaces
- **WT 2021 § 323:** Sound insulation requirements
- **WHO Night Noise Guidelines:** Background noise ≤ 30 dB(A)
