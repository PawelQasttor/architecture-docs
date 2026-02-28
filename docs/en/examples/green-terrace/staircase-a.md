---
id: "VC-STAIR-A"
entityType: "vertical_circulation"
circulationName: "Staircase A"
circulationType: "staircase"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
isFireEscape: true
isAccessible: false
isStretcher: false

fireProperties:
  isProtectedStaircase: true
  fireRating: "REI 60"
  pressurization: false
  smokeVentilation: "natural"
  emergencyLighting: true
  maxTravelDistance: 30.0
  vestibuleRequired: false
  fireRating_meta:
    confidence: "specified"
    source: "ARCH-GT-05"
    sourceRef: "section 3.4 Fire Strategy"

dimensions:
  flightWidth: 1200
  flightWidthRequired: 1200
  landingDepth: 1500
  headroom: 2200
  riserHeight: 169
  goingDepth: 290
  totalRise: 2700
  numberOfFlights: 2
  numberOfSteps: 16
  flightWidth_meta:
    confidence: "specified"
    source: "ARCH-GT-03"
    sourceRef: "drawing A-301 Staircase Plan"

accessibility:
  handrails: "both_sides"
  handrailHeight: 900
  tactileWarnings: true
  contrastNosings: true

egressCapacity:
  occupantCapacity: 80
  flowRate: 50
  evacuationTime: 3.2
  requiredCapacity: 60
  evacuationTime_meta:
    confidence: "calculated"
    source: "FIRE-GT-01"
    sourceRef: "Appendix B Egress Calculation"

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 68"
    requirement: "Minimum stair width 1.2m in residential buildings > 3 stories"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 69"
    requirement: "Maximum riser height 175mm, minimum going 250mm"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 242"
    requirement: "Escape route width >= 1.2m for buildings with >50 occupants"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 256"
    requirement: "Protected staircase with fire-rated enclosure"
    status: "compliant"

cost:
  estimatedTotal: 42000
  currency: "EUR"
  breakdown:
    structure: 28000
    finishes: 8000
    handrails: 4000
    fire_protection: 2000
  cost_meta:
    confidence: "estimated"
    source: "QS-GT-01"
    sourceRef: "Preliminary Cost Estimate Rev.2"

ifcMapping:
  ifcEntity: "IfcStair"
  objectType: "Staircase_A_Protected"
  globalId: "2xYzPQ$rLBxv5TxEu4MPwR"
  predefinedType: "STRAIGHT_RUN"

sources:
  - id: "ARCH-GT-03"
    title: "Architectural Drawings Package"
    author: "Green Terrace Architects"
    date: "2025-11-15"
    type: "structural_drawing"
  - id: "FIRE-GT-01"
    title: "Fire Safety Strategy Report"
    author: "ABC Fire Consultants"
    date: "2025-10-20"
    type: "other"

version: "1.0.0"
tags: ["fire-escape", "protected", "residential"]
---

# Staircase A

Main protected staircase serving all 6 levels of the Green Terrace residential building. Located centrally, adjacent to the elevator shaft, providing both everyday access and fire escape route.

## Design Summary

- **Type:** Two-flight dog-leg staircase with intermediate landings
- **Enclosure:** REI 60 fire-rated walls on all sides
- **Smoke control:** Natural ventilation via rooftop smoke vent (1.0 m² free area)
- **Emergency lighting:** LED maintained luminaires at each landing and flight
- **Handrails:** Stainless steel, both sides, continuous from ground to top floor
- **Finishes:** Non-slip ceramic tile on treads, painted plaster on walls
- **Step geometry:** 169mm rise x 290mm going (2R + G = 628mm, within 600-640mm comfort range)

## Egress Calculation

| Parameter | Value | Requirement | Status |
|-----------|-------|-------------|--------|
| Flight width | 1,200 mm | >= 1,200 mm (WT §68) | Compliant |
| Riser height | 169 mm | <= 175 mm (WT §69) | Compliant |
| Going depth | 290 mm | >= 250 mm (WT §69) | Compliant |
| Headroom | 2,200 mm | >= 2,000 mm (WT §68) | Compliant |
| Max travel distance | 30.0 m | <= 60 m (WT §256, fire_zone ZL-IV) | Compliant |
| Evacuation time | 3.2 min | < 5 min target | Compliant |
