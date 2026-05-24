---
entityType: "structural_system"
id: "STR-GREEN-TERRACE"
version: "2.1.0"
projectPhase: "design_development"

systemName: "Green Terrace — main structure"
structuralCategory: "superstructure"
buildingId: "BLD-01"
description: |
  Cast-in-place reinforced-concrete loadbearing wall + flat slab system
  for the 6-storey Green Terrace residential building. Strip foundations on
  cohesive subsoil. Designed to Eurocodes (PN-EN 1990 / PN-EN 1992 /
  PN-EN 1997 / PN-EN 1998-1).

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50               # years (Class S4 per PN-EN 1990 Annex A.1)
  importanceClass: "CC2"       # standard residential consequence class
  exposureClass: "XC1"         # interior, dry — external faces are XC4
  fireResistance: "REI 90"     # loadbearing walls/slabs (exceeds WT 2021 min REI 60)
  seismicDesignCategory: "low_seismicity"
  peakGroundAcceleration: 0.4  # m/s² — Warsaw is in low-seismicity zone
  soilCategory: "C"            # PN-EN 1998-1 ground type (deep deposits of medium-dense sand/gravel)
  windZone: "PL_Zone_I"        # PN-EN 1991-1-4 NA (vb,0 = 22 m/s)
  snowZone: "PL_Zone_2"        # PN-EN 1991-1-3 NA (sk = 0.9 kN/m²)

loads:
  deadLoadKPa: 5.0             # typical slab + screed + finishes
  liveLoadKPa: 2.0             # residential (PN-EN 1991-1-1, Cat. A)
  roofLiveLoadKPa: 0.4
  snowLoadKPa: 0.9
  windPressureKPa: 0.6

foundationDetails:
  type: "strip"
  depth: 1.8                   # m below grade (below frost depth for Warsaw)
  bearingCapacity: 250         # kPa allowable
  groundwaterManagement: "Perimeter drainage to municipal storm system"

gridSystem:
  xSpacing: [6.0, 6.0, 6.0, 6.0, 6.0]   # m — five 6 m bays in plan length
  ySpacing: [5.5, 5.5]                  # m — two 5.5 m bays in plan depth
  origin: "Grid intersection 1/A at building NE corner"

materials:
  - materialTypeId: "MT-CONCRETE-C30-37"
    role: "primary_loadbearing"
  - materialTypeId: "MT-REBAR-B500SP"
    role: "reinforcement"

# Verification
verification:
  designedBy:
    name: "Piotr Kowalski"
    organization: "Kowalski Structural Engineering Sp. z o.o."
    qualification: "PZITB 1234, design rights for general construction"
  checkedBy:
    name: "Independent third-party reviewer (TBD at bidding)"
  software: "Robot Structural Analysis 2025"
  lastAnalysisDate: "2026-02-15"

constructionPackageId: "CP-STRUCTURE"

sources:
  - id: "SRC-STR-GREEN-TERRACE-01"
    title: "Green Terrace — Structural Design Report, Rev. C"
    type: "structural_drawing"
    documentType: "structural_design_report"
    date: "2026-02-15"
    author: "Piotr Kowalski"

tags:
  - "design-development-artifact"

notes: |
  Structure was implicit in the example before v2.1 — the building file
  mentioned "construction class C" and "reinforced concrete" in prose, but no
  entity carried the load cases, exposure classes, or seismic parameters
  that the MEP and envelope teams need to reference. This `structural_system`
  entity makes them explicit, machine-readable, and version-controlled.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — extracts structural design data from prose into a queryable entity"
---

# Structural System — Green Terrace (STR-GREEN-TERRACE)

Cast-in-place reinforced-concrete loadbearing wall + flat slab system on
strip foundations. Designed to Eurocodes with Polish National Annexes
(PN-EN 1990 / 1991 / 1992 / 1997 / 1998-1).

| Parameter | Value |
|---|---|
| Structural type | RC loadbearing walls + flat slabs |
| Foundation | Strip footings, depth 1.8 m, bearing 250 kPa |
| Design life | 50 years (Class S4) |
| Consequence class | CC2 |
| Exposure (interior) | XC1 |
| Fire resistance | REI 90 (exceeds WT 2021 min REI 60) |
| Seismic | Low — PGA 0.4 m/s², soil C |
| Snow zone | PL Zone 2 (sk = 0.9 kN/m²) |
| Wind zone | PL Zone I (vb,0 = 22 m/s) |
| Live load (residential) | 2.0 kPa |
| Grid | 6 m × 5.5 m typical |

## Why this entity exists

Before v2.1 the example carried structural data **only in prose** inside
`project-specification.md`. That worked for a human reader, but meant:

- The MEP team had to re-derive slab dead loads to size their hangers.
- The envelope team had to look up the exposure class from the structural PDF.
- The cost rollup couldn't tag concrete quantities to a specific design.

By extracting the structure as a first-class `structural_system` entity, every
discipline references the same numbers — and a change in, say, the live load
propagates through the model automatically.

## Materials used

- [`MT-CONCRETE-C30-37`](../materials/MT-CONCRETE-C30-37) — primary loadbearing concrete
- `MT-REBAR-B500SP` — Polish-standard ribbed reinforcement bar (separate material file not yet authored)

## Related

- [Building `BLD-01`](../building) — references this structural system
- [Construction Package `CP-STRUCTURE`](../construction-packages/cp-structure) — sequences the structural work
- [REQ-LEVEL-FIRE-RATING](../requirements/REQ-LEVEL-FIRE-RATING) — the REI 60 minimum that this design exceeds with REI 90
