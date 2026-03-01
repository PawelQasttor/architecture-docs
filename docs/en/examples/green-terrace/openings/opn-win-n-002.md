---
entityType: opening
id: OPN-WIN-N-002
openingName: "North Living Room Window"
openingCategory: window
envelopeId: "ENV-EW-01"
openingTypeId: "OT-INTERNORM-KF410"
levelId: "LVL-01"
spaceIds:
  - "SP-BLD-01-L01-001"

dimensions:
  width: 1800
  height: 1500
  area: 2.7

sillHeight: 900
orientation: "N"

thermalPerformance:
  uValue: 0.90
  uValueRequired: 0.90
  gValue: 0.50
thermalPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"

acousticPerformance:
  rw: 35
  rwRequired: 25

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-08-11"
  installedBy: "Okna Plus Sp. z o.o."
  commissioningDate: "2024-08-12"

warranty:
  warrantyStart: "2024-08-11"
  warrantyEnd: "2034-08-11"
  warrantyProvider: "Internorm"

manufacturer: "Internorm"
productCode: "KF410-TT-1800x1500"

cost:
  totalCost: 1350
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcWindow
  globalId: "2xB3YO$rLBxv3VxEu2WIN2"
  objectType: "Window_Internorm_KF410_1800x1500"

version: "1.0.0"
tags:
  - "window"
  - "north-facade"
  - "living-room"
  - "level-01"
---

# Opening: North Living Room Window

Large triple-glazed tilt-turn window on the north facade, providing natural light to the living area.

## Specifications

- **Type:** [Internorm KF 410](../opening-types/internorm-kf410-window)
- **Size:** 1800 x 1500 mm (2.7 m2)
- **Sill height:** 900 mm
- **Orientation:** North
- **U-value:** 0.90 W/(m2K)
- **g-value:** 0.50
- **Rw:** 35 dB

## Location

- **Envelope:** [External Wall Type A](../envelope-external-wall-type-a)
- **Level:** [Level 01](../levels/level-01)

## Installation

- **Installed:** 2024-08-11 by Okna Plus Sp. z o.o.
- **Warranty:** 10 years (Internorm), expires 2034-08-11

---

**Status:** Installed
**Last Updated:** 2026-03-01
