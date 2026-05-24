---
entityType: "material_type"
id: "MT-INSULATION-PIR-150"
version: "2.1.0"
projectPhase: "design_development"

materialName: "PIR rigid insulation board, 150 mm"
materialCategory: "insulation"
description: |
  Polyisocyanurate (PIR) rigid foam insulation board with mineral-fibre
  facings, 150 mm thick. Used as primary insulation layer in the
  Type A external wall and as roof insulation under the green roof
  build-up. Chosen for the combination of low U-value, dimensional
  stability, and compatibility with the ventilated cavity construction.

manufacturer: "Kingspan Insulation"
productCode: "Kooltherm K15 — 150 mm"
standard: "PN-EN 13165"

physicalProperties:
  density: 35                # kg/m³
  thermalConductivity: 0.022 # W/(m·K) — declared λD
  specificHeatCapacity: 1400 # J/(kg·K)
  vaporResistanceFactor: 60  # µ
  waterAbsorption: 0.5       # % by mass after 28 days immersion

fireProperties:
  reactionToFire: "B-s1,d0"  # Euroclass per PN-EN 13501-1

sustainability:
  embodiedCarbonKgCO2ePerM3: 280   # A1-A3, modern PIR with reduced-GWP blowing agent
  epdReference: "Kingspan EPD-KOOLTHERM-K15-2024"
  recycledContent: 0
  responsibleSourcing: "Kingspan IMS — ISO 14001 + ISO 50001"
  endOfLife: "Mechanical recycling pilot programme; default route is energy recovery"

constructionPackageId: "CP-ENVELOPE"

sources:
  - id: "SRC-MT-INSULATION-PIR-150-01"
    title: "Green Terrace — Envelope Spec §4.1, External Wall Type A"
    type: "other"
    documentType: "envelope_specification"
    date: "2026-01-20"
    author: "Anna Nowak"
  - id: "SRC-MT-INSULATION-PIR-150-02"
    title: "Kingspan Kooltherm K15 EPD"
    type: "manufacturer_spec"
    documentType: "manufacturer_epd"
    date: "2024-09-01"
    author: "Kingspan Insulation"

tags:
  - "design-development-artifact"

notes: |
  Contribution to wall U-value: at λ = 0.022 W/(m·K) and 150 mm thickness,
  PIR alone contributes R = 6.82 m²K/W to the assembly — accounting for
  about 90 % of the wall's total thermal resistance. The reaction-to-fire
  class B-s1,d0 satisfies WT 2021 for a 6-storey residential building
  with a ventilated cavity (height < 25 m).

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — extracts envelope insulation as reusable material entity"
---

# PIR insulation board, 150 mm (MT-INSULATION-PIR-150)

The dominant thermal layer in the Green Terrace envelope. This
`material_type` lets every envelope build-up and procurement schedule
reference the same product spec, EPD, and embodied-carbon figure.

| Property | Value |
|---|---|
| Thickness | 150 mm |
| Density | 35 kg/m³ |
| Thermal conductivity (λD) | 0.022 W/(m·K) |
| Thermal resistance | R = 6.82 m²K/W |
| Vapour resistance (µ) | 60 |
| Fire reaction | B-s1,d0 |
| Embodied carbon | 280 kgCO₂e/m³ (A1-A3) |

## Used by

- [Envelope `ENV-EW-01`](../envelope-external-wall-type-a) — External Wall Type A
- [Construction Package `CP-ENVELOPE`](../construction-packages/cp-envelope)
- Roof build-up (separate Envelope entity not yet authored)
