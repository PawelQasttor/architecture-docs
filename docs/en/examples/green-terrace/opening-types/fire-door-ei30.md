---
entityType: opening_type
id: OT-FIRE-DOOR-EI30
openingTypeName: "Fire Door EI 30 - Steel Frame"
category: door
description: "Fire-rated steel-frame door with intumescent seals, self-closing mechanism, and smoke control. Used for apartment entrance doors and stairwell access."

frameMaterial: steel
glazingType: none
operability: hinged

firePerformance:
  fireRating: "EI 30"
  smokeControl: true
  selfClosing: true

acousticPerformance:
  rw: 37

securityRating: "RC3"

accessibilityCompliance:
  clearWidth: 900
  threshold: flush
  closingForce: 22
  visionPanel: true

manufacturer: "Hormann"
modelNumber: "T30-1 H8-5"
productCode: "HOR-T30-1-900"
expectedLifeYears: 30

cost:
  totalCost: 1200
  currency: "EUR"
  basis: "manufacturer_list_price"

ifcMapping:
  ifcEntity: IfcDoorType
  objectType: "FireDoor_EI30_Steel"

version: "1.0.0"
tags:
  - "fire-door"
  - "ei30"
  - "steel"
  - "self-closing"
---

# Opening Type: Fire Door EI 30

Steel-frame fire-rated door used for apartment entrances and stairwell access points. Provides 30 minutes fire integrity with smoke control.

## Key Specifications

- **Frame:** Steel
- **Fire rating:** EI 30
- **Smoke control:** Yes (intumescent seals + smoke gaskets)
- **Self-closing:** Yes (concealed overhead closer, EN 1154)
- **Sound insulation:** Rw 37 dB
- **Security:** RC3 rated
- **Clear width:** 900 mm (accessible)
- **Expected life:** 30 years

## Compliance

- WT 2021 SS 232: Fire resistance for apartment doors
- WT 2021 SS 256: Stairwell access fire separation
- PN-EN 1634-1: Fire resistance test

See: [Entity documentation](/en/documentation/entities/)
