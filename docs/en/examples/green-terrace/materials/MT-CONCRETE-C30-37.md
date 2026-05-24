---
entityType: "material_type"
id: "MT-CONCRETE-C30-37"
version: "2.1.0"
projectPhase: "design_development"

materialName: "Concrete C30/37 — exposure XC1/XC4"
materialCategory: "concrete"
description: |
  Cast-in-place ready-mix concrete, strength class C30/37 per PN-EN 206-1,
  used for all loadbearing walls and flat slabs in the Green Terrace
  structure. Exposure class is XC1 for interior elements and XC4 for
  externally-exposed faces (parapets, terrace upstands).

manufacturer: "Lafarge Polska (planned supplier)"
productCode: "Agilia C30/37 XC4"
standard: "PN-EN 206-1"

physicalProperties:
  density: 2400              # kg/m³
  thermalConductivity: 1.65  # W/(m·K) — typical for normal-weight reinforced concrete
  specificHeatCapacity: 880  # J/(kg·K)
  compressiveStrength: 30    # MPa characteristic cylinder strength (fck)
  tensileStrength: 2.9       # MPa fctm
  modulusOfElasticity: 33    # GPa Ecm

fireProperties:
  reactionToFire: "A1"       # non-combustible per PN-EN 13501-1
  fireResistance: "REI 90"   # at design thickness 200 mm

sustainability:
  embodiedCarbonKgCO2ePerM3: 320   # typical A1-A3 GWP for C30/37, OPC blend
  epdReference: "Lafarge EPD-AGILIA-2024-01"
  recycledContent: 8                # % recycled aggregate (current Lafarge mix)
  responsibleSourcing: "BES 6001 Very Good"

constructionPackageId: "CP-STRUCTURE"

sources:
  - id: "SRC-MT-CONCRETE-C30-37-01"
    title: "Green Terrace — Structural Specification §3.2"
    type: "other"
    documentType: "material_specification"
    date: "2026-02-15"
    author: "Piotr Kowalski"
  - id: "SRC-MT-CONCRETE-C30-37-02"
    title: "Lafarge Agilia EPD"
    type: "manufacturer_spec"
    documentType: "manufacturer_epd"
    date: "2024-06-01"
    author: "Lafarge Polska"

tags:
  - "design-development-artifact"

notes: |
  Embodied carbon is the dominant sustainability concern for this material.
  At 2,400 kg/m³ × 320 kgCO₂e/m³ × estimated 380 m³ structural concrete,
  the structure carries roughly **122 tCO₂e A1-A3** — about 30 % of the
  building's total upfront embodied carbon. Specifying a CEM II/B blended
  binder (rather than pure OPC) could cut this by ~25 %.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — surfaces the dominant structural material as a reusable spec"
---

# Concrete C30/37 (MT-CONCRETE-C30-37)

Ready-mix C30/37 concrete is the primary loadbearing material for the Green
Terrace structure — walls, slabs, foundations. This `material_type` entity
makes the spec **reusable**: every Construction Package or Structural System
that needs C30/37 references this single ID.

| Property | Value |
|---|---|
| Strength class | C30/37 (fck = 30 MPa) |
| Density | 2,400 kg/m³ |
| Thermal conductivity | 1.65 W/(m·K) |
| Modulus of elasticity | 33 GPa |
| Fire reaction | A1 (non-combustible) |
| Embodied carbon | 320 kgCO₂e/m³ (A1-A3) |
| Recycled content | 8 % |

## Why this entity exists

Before v2.1, "C30/37" appeared in narrative across three different files
(project-specification, building, structural CAD callouts) — and nobody
could be sure they all meant the **same** mix design. Extracting it as
a `material_type` entity gives:

- **One source of truth** for strength, density, fire class, embodied carbon
- **Procurement aggregation** — the compiler can sum total m³ across CPs
- **Sustainability reporting** — swap the EPD reference and the whole building's GWP updates

## Used by

- [Structural System `STR-GREEN-TERRACE`](../structural-systems/STR-GREEN-TERRACE) — primary loadbearing
- [Construction Package `CP-STRUCTURE`](../construction-packages/cp-structure)
