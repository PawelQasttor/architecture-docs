---
entityType: opening
id: OPN-DOOR-STAIR-01
openingName: "Stairwell Fire Door - Level 01"
openingCategory: door
envelopeId: "ENV-EW-01"
openingTypeId: "OT-FIRE-DOOR-EI30"
levelId: "LVL-01"
spaceIds:
  - "SP-STAIRWELL-VOID"
  - "SP-BLD-01-L01-CORR"

dimensions:
  width: 1000
  height: 2100
  area: 2.1

orientation: "not_applicable"
frameMaterial: steel
glazingType: none
operability: hinged

firePerformance:
  fireRating: "EI 30"
  fireRatingRequired: "EI 30"
  smokeControl: true
  selfClosing: true
  testCertificate: "FR2024-5678"
firePerformance_meta:
  confidence: "measured"
  source: "FR2024-5678"
  sourceRef: "PN-EN 1634-1 fire test"

acousticPerformance:
  rw: 37
  rwRequired: 30
  testCertificate: "AC2024-9012"

hardware:
  hingeType: "concealed_3d_adjustable"
  lockType: "panic_bar_EN1125"
  handleType: "lever_handle_stainless"
  closerType: "concealed_overhead_EN1154"
  threshold: "flush_intumescent"
  holdOpen: false
  intumescentStrip: true

accessibilityData:
  clearWidth: 900
  thresholdHeight: 0
  closingForce: 22
  visionPanelHeight: 800
  automatedOpener: false

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-07-20"
  installedBy: "Doors & More Sp. z o.o."
  commissioningDate: "2024-07-22"

warranty:
  warrantyStart: "2024-07-20"
  warrantyEnd: "2029-07-20"
  warrantyProvider: "Hormann"

maintenance:
  lastServiceDate: "2024-12-20"
  nextServiceDue: "2025-06-20"
  maintenanceContractor: "Doors & More Sp. z o.o."

manufacturer: "Hormann"
productCode: "HOR-T30-1-1000"

cost:
  totalCost: 1450
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcDoor
  globalId: "2xB3YO$rLBxv3VxEu2DR01"
  objectType: "FireDoor_EI30_Stairwell_L01"

version: "1.0.0"
tags:
  - "fire-door"
  - "stairwell"
  - "ei30"
  - "level-01"
  - "safety-critical"
---

# Opening: Stairwell Fire Door - Level 01

Fire-rated door separating the Level 01 corridor from the protected stairwell. Provides 30 minutes fire integrity with smoke control and self-closing mechanism.

## Specifications

- **Type:** [Fire Door EI 30](../opening-types/fire-door-ei30)
- **Size:** 1000 x 2100 mm
- **Fire rating:** EI 30 (tested per PN-EN 1634-1)
- **Smoke control:** Intumescent seals + smoke gaskets
- **Self-closing:** Concealed overhead closer (EN 1154)
- **Sound insulation:** Rw 37 dB
- **Security:** RC3

## Accessibility

- **Clear width:** 900 mm (compliant with WT 2021 SS 55)
- **Threshold:** Flush with intumescent seal
- **Closing force:** 22 N (below 30 N max)
- **Vision panel:** 800 mm height zone

## Location

- **Envelope:** [External Wall Type A](../envelope-external-wall-type-a)
- **Level:** [Level 01](../levels/level-01)
- **Connects:** [Stairwell](../spaces/stairwell-void) to [Corridor](../spaces/corridor)

## Service History

| Date | Type | Performed By | Notes |
|------|------|--------------|-------|
| 2024-07-22 | Commissioning | Doors & More | All tests passed |
| 2024-12-20 | 6-month inspection | Doors & More | Closer adjusted, seals OK |
| 2025-06-20 | Annual service (due) | - | Full hardware inspection |

---

**Status:** Operational
**Last Updated:** 2026-03-01
