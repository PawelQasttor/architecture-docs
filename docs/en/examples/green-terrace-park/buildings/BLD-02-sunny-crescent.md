---
entityType: "building"
id: "BLD-02"
name: "Sunny Crescent — family-block residential building"
version: "2.1.0"
projectPhase: "construction"
bimLOD: "LOD_400"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 2400
netFloorArea: 2160
footprintArea: 480

numberOfStoreys:
  aboveGround: 5
  belowGround: 0
  total: 5
buildingHeight: 16.5
eaveHeight: 14.5
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "standard"

# Unit mix tuned for families: more 3BR / fewer 1BR than BLD-01
unitMix:
  oneBedroom: 4
  twoBedroom: 12
  threeBedroom: 8
  totalUnits: 24

cost:
  totalCost: 2200000
  currency: "EUR"
  basis: "as_construction_progresses"
  _meta:
    confidence: "estimated"
    source: "Phase 2a contractor schedule of values"

# Construction phase status
constructionProgress:
  startDate: "2026-09-01"
  expectedCompletion: "2027-09-15"
  currentMilestone: "Structure complete, envelope at 60%"
  percentComplete: 55

tags:
  - "campus-example"
  - "sibling-building"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of Campus showcase example — sibling building in construction phase"
---

# BLD-02 — Sunny Crescent

A 5-storey, 24-unit family-block residential building, currently in
construction. One of three sibling buildings to BLD-01 in the
[Green Terrace Park campus](../campus).

| Property | Value |
|---|---|
| Phase | `construction` (55% complete) |
| Storeys | 5 (above-ground only) |
| Gross floor area | 2,400 m² |
| Dwelling units | 24 (4× 1BR + 12× 2BR + 8× 3BR — family mix) |
| Height | 16.5 m |
| As-built cost (forecast) | €2.2M |
| Expected completion | 2027-09-15 |

## Scaffolded detail

This is a **breadth-first sibling** in the Campus example. The building
entity carries enough to demonstrate Campus membership, phase variance,
and unit-mix variation. Full per-building detail (levels, spaces, systems,
envelope, …) is not provided — for that pattern see the
[design-phase flagship](/en/examples/green-terrace/building).
