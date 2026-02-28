---
id: "ENV-EW-01"
entityType: "envelope"
envelopeName: "External Wall Type A"
envelopeType: "external_wall"
buildingId: "BLD-01"
boundarySpaceIds:
  - "SP-BLD-01-L01-001"
levelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
orientation: "N"
isExternal: true
isLoadBearing: true
grossArea: 1245
netArea: 1050
totalThickness: 447.5
construction:
  assemblyType: "ventilated_cavity"
  layers:
    - order: 1
      material: "Mineral render (Baumit MVR Uni)"
      thickness: 15
      thermalConductivity: 0.82
      function: "finish"
      fireClass: "A1"
      manufacturer: "Baumit"
      productCode: "MVR Uni"
    - order: 2
      material: "AAC blocks (Ytong PP4/0.6)"
      thickness: 200
      thermalConductivity: 0.55
      density: 600
      function: "structural"
      manufacturer: "Ytong"
      productCode: "PP4/0.6"
      fireClass: "A1"
    - order: 3
      material: "XPS insulation (BASF Styrodur 3035 CS)"
      thickness: 180
      thermalConductivity: 0.035
      function: "insulation"
      manufacturer: "BASF"
      productCode: "3035 CS"
      fireClass: "E"
    - order: 4
      material: "Ventilated air cavity"
      thickness: 40
      function: "cavity"
    - order: 5
      material: "Gypsum plasterboard (Rigips RB 12.5mm)"
      thickness: 12.5
      thermalConductivity: 0.21
      function: "finish"
      manufacturer: "Rigips"
      productCode: "RB 12.5mm"
      fireClass: "A2"
thermalPerformance:
  uValue: 0.18
  uValueRequired: 0.20
  calculationMethod: "PN-EN ISO 6946"
  condensationRisk: false
  thermalBridgePsi: 0.05
thermalPerformance_meta:
  confidence: "calculated"
  source: "TC-01 Thermal calculation"
  sourceRef: "PN-EN ISO 6946 layer method"
acousticPerformance:
  rw: 55
  rwRequired: 50
  testCertificate: "AC2024-5678"
acousticPerformance_meta:
  confidence: "measured"
  source: "AC2024-5678"
  sourceRef: "PN-EN ISO 140-3 test"
firePerformance:
  fireRating: "REI 90"
  fireRatingRequired: "REI 60"
  reactionToFire: "A2-s1,d0"
  testCertificate: "FR2024-1234"
firePerformance_meta:
  confidence: "measured"
  source: "FR2024-1234"
  sourceRef: "PN-EN 13501-2 test"
moistureControl:
  vaporControl: "Diffusion-open exterior (render sd < 0.5m), Glaser analysis per PN-EN ISO 13788"
  airtightnessTarget: "0.6 ACH @ 50 Pa (passive house standard)"
  waterproofing: "DPC bitumen membrane at foundation, lapped 150mm"
openings:
  - id: "WIN-EW01-N-001"
    openingType: "window"
    width: 1200
    height: 1500
    area: 1.8
    uValue: 0.90
    gValue: 0.50
    acousticRw: 35
    manufacturer: "Internorm"
    productCode: "KF 410"
  - id: "WIN-EW01-N-002"
    openingType: "window"
    width: 1800
    height: 1500
    area: 2.7
    uValue: 0.90
    gValue: 0.50
    acousticRw: 35
    manufacturer: "Internorm"
    productCode: "KF 410"
glazingRatio: 0.157
regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 328"
    requirement: "U ≤ 0.20 W/(m²·K) for external walls"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 234"
    requirement: "REI 60 for building height 18.5m"
    status: "compliant"
  - regulation: "PN-B-02151"
    section: "-"
    requirement: "Rw ≥ 50 dB for external walls"
    status: "compliant"
  - regulation: "PN-EN ISO 13788"
    section: "-"
    requirement: "No interstitial condensation"
    status: "compliant"
cost:
  totalCost: 192544
  currency: "EUR"
  basis: "architect_estimate_phase_4"
  breakdown:
    masonry: 25200
    insulation: 43575
    render: 68475
    interiorFinish: 31125
    lintels: 15000
    contingency: 9169
cost_meta:
  confidence: "estimated"
  source: "architect_cost_estimate"
  sourceRef: "Green Terrace cost analysis v1.5"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
  materialLayerSet: "ExternalWall_TypeA_Layers"
version: "1.5.0"
tags:
  - "external-wall"
  - "load-bearing"
  - "ventilated-cavity"
  - "building-01"
  - "all-facades"
---

# External Wall Type A

Load-bearing external wall with ventilated cavity, used on all facades of Building 01 (Green Terrace).

## Assembly Summary

- **Total thickness:** 447.5 mm
- **5 layers:** mineral render + AAC blocks + XPS insulation + air cavity + gypsum board
- **U-value:** 0.18 W/(m²·K) (required ≤ 0.20)
- **Fire rating:** REI 90 (required REI 60)
- **Sound insulation:** Rw 55 dB (required ≥ 50 dB)

## Compliance

All regulatory checks pass: thermal (WT § 328), fire (WT § 234), acoustic (PN-B-02151), and moisture (PN-EN ISO 13788).

## Cost

Total estimated cost: EUR 192,544 (EUR 155/m² gross area). Includes masonry, insulation, render, interior finish, lintels, and 5% contingency.
