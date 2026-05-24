---
entityType: "building"
id: "BLD-04"
name: "Oak Pavilion — 1BR-heavy residential building"
version: "2.1.0"
projectPhase: "schematic_design"
bimLOD: "LOD_200"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1200          # smaller — SD-phase target, may evolve
netFloorArea: 1080
footprintArea: 240

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

# 1BR-heavy: target audience is younger singles / couples without kids
unitMix:
  oneBedroom: 9
  twoBedroom: 3
  threeBedroom: 0
  totalUnits: 12

cost:
  totalCost: 1300000           # placeholder SD estimate
  currency: "EUR"
  basis: "SD_placeholder"
  _meta:
    confidence: "assumed"
    source: "SD-phase order-of-magnitude estimate, Class 5"

# SD-phase status
designProgress:
  sdStarted: "2026-05-01"
  sdTargetCompletion: "2026-12-31"
  planningSubmission: "2027-02-15"
  planningApprovalExpected: "2027-08-15"
  ddTargetStart: "2027-09-01"
  expectedHandover: "2029-12-15"

# Notes that this is the most speculative building in the campus
notes: |
  Subject to BLD-03 sales velocity — if BLD-03 does not pre-sell at
  least 60% of units within 6 months of marketing launch, BLD-04
  scope/cost may be revised or the project deferred. Construction is
  not committed.

tags:
  - "campus-example"
  - "sibling-building"
  - "schematic-stage"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of Campus showcase example — sibling building at the earliest lifecycle phase represented in the campus"
---

# BLD-04 — Oak Pavilion

A 5-storey, 12-unit **1BR-heavy** residential building targeting younger
singles and couples. Currently at schematic design — the **earliest
lifecycle phase** in the Green Terrace Park campus. One of three sibling
buildings to BLD-01.

| Property | Value |
|---|---|
| Phase | `schematic_design` |
| Storeys | 5 (above-ground only) |
| Gross floor area | 1,200 m² (target — may evolve) |
| Dwelling units | 12 (9× 1BR + 3× 2BR — 1BR-heavy) |
| Cost confidence | `assumed` (Class 5 SD estimate) |
| Expected handover | 2029-12-15 (subject to BLD-03 pre-sale velocity) |

## Why BLD-04 is "the future child"

In the SBM phase-readiness check, the Campus is "ready to advance to"
the phase of its *least-advanced child*. BLD-04 at `schematic_design`
pins the whole Campus to that level. This is the correct behaviour:
a campus master plan can't be considered "ready for construction" while
one of its buildings still needs planning approval.
