---
entityType: opening
id: OPN-WIN-N-001
openingName: "North Bedroom Window 01"
openingCategory: window
envelopeId: "ENV-EW-01"
openingTypeId: "OT-INTERNORM-KF410"
levelId: "LVL-01"
spaceIds:
  - "SP-BLD-01-L01-001"

dimensions:
  width: 1200
  height: 1500
  area: 1.8

sillHeight: 900
orientation: "N"

thermalPerformance:
  uValue: 0.90
  uValueRequired: 0.90
  gValue: 0.50
thermalPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"
  sourceRef: "Internorm KF 410 product data"

acousticPerformance:
  rw: 35
  rwRequired: 25
acousticPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-08-10"
  installedBy: "Okna Plus Sp. z o.o."
  commissioningDate: "2024-08-12"

warranty:
  warrantyStart: "2024-08-10"
  warrantyEnd: "2034-08-10"
  warrantyProvider: "Internorm"

manufacturer: "Internorm"
productCode: "KF410-TT-1200x1500"

cost:
  totalCost: 950
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcWindow
  globalId: "2xB3YO$rLBxv3VxEu2WIN1"
  objectType: "Window_Internorm_KF410_1200x1500"

version: "1.0.0"
tags:
  - "window"
  - "north-facade"
  - "bedroom"
  - "level-01"
---

# Opening: North Bedroom Window 01

Triple-glazed tilt-turn window on the north facade, serving Bedroom 01.

## Specifications

- **Type:** [Internorm KF 410](../opening-types/internorm-kf410-window)
- **Size:** 1200 x 1500 mm (1.8 m2)
- **Sill height:** 900 mm
- **Orientation:** North
- **U-value:** 0.90 W/(m2K)
- **g-value:** 0.50
- **Rw:** 35 dB

## Location

- **Envelope:** [External Wall Type A](../envelope-external-wall-type-a)
- **Level:** [Level 01](../levels/level-01)
- **Space:** [Bedroom 01](../spaces/bedroom-01)

## Installation

- **Installed:** 2024-08-10 by Okna Plus Sp. z o.o.
- **Warranty:** 10 years (Internorm), expires 2034-08-10

---

**Status:** Installed
**Last Updated:** 2026-03-01
