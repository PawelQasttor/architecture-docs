---
entityType: opening_type
id: OT-INTERNORM-KF410
openingTypeName: "Internorm KF 410 Triple-Glazed Window"
category: window
description: "High-performance triple-glazed PVC window system with tilt-turn operation. Passive house suitable, Uw 0.90 W/(m2K)."

frameMaterial: pvc
glazingType: triple
operability: tilt_turn

thermalPerformance:
  uValue: 0.90
  gValue: 0.50
  psiInstallation: 0.04

acousticPerformance:
  rw: 35

securityRating: "RC2"

accessibilityCompliance:
  clearWidth: 900
  threshold: flush
  closingForce: 30

manufacturer: "Internorm"
modelNumber: "KF 410"
productCode: "KF410-TT-1200x1500"
expectedLifeYears: 40

cost:
  totalCost: 850
  currency: "EUR"
  basis: "manufacturer_list_price"

ifcMapping:
  ifcEntity: IfcWindowType
  objectType: "Internorm_KF410_Triple"

version: "1.0.0"
tags:
  - "window"
  - "triple-glazed"
  - "passive-house"
  - "pvc"
---

# Opening Type: Internorm KF 410 Triple-Glazed Window

High-performance triple-glazed PVC window system used throughout the Green Terrace residential building. Tilt-turn operation, passive house suitable.

## Key Specifications

- **Frame:** PVC, 6-chamber profile
- **Glazing:** Triple (4/16Ar/4/16Ar/4)
- **U-value:** 0.90 W/(m2K) (required: 0.90)
- **g-value:** 0.50
- **Sound insulation:** Rw 35 dB
- **Security:** RC2 rated
- **Expected life:** 40 years

## Usage

All standard window openings in the Green Terrace project reference this type. Individual instances may override dimensions and orientation.

See: [Entity documentation](/en/documentation/entities/)
