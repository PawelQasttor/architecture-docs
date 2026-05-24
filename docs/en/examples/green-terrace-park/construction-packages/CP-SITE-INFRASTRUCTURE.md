---
entityType: "construction_package"
id: "CP-SITE-INFRASTRUCTURE"
version: "2.1.0"
projectPhase: "construction"

packageName: "Campus site infrastructure"
sequence: 1   # Campus-spanning, runs ahead of per-building CPs
campusId: "CAM-GREEN-TERRACE-PARK"

# Cross-building — no buildingId, spans the whole campus
description: |
  Campus-wide groundworks + buried services: district heating mains,
  stormwater SuDS network, shared parking + EV hub conduits, fibre
  data network. Excludes any building-specific connections (those
  are in each building's own CPs).

scope: "District heating buried mains (DN200 pre-insulated steel, ~280 m), stormwater SuDS network (swales + permeable paving + underground attenuation), shared parking surface (64 spaces) + EV charging cable trays, fibre data network from campus head-end to each building riser, communal garden hardscaping + raised allotment beds, playground sub-base + EN 1177 impact-attenuating surface, secure bike storage shelter + concrete pad."

# Phase tracking — campus-wide CP, started with Phase 1 and runs through Phase 3
plannedStart: "2025-03-01"   # with BLD-01 groundworks
plannedEnd: "2029-09-30"     # before BLD-04 final connection
status: "in_progress"
percentComplete: 65

# Cost
cost:
  totalCost: 320000
  currency: "EUR"
  basis: "construction_contract"

# References
relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
  - "SYS-DH-LOOP-CAMPUS"
  - "SF-PLAYGROUND"
  - "SF-EV-HUB"
  - "SF-BIKE-STORAGE"
  - "SF-COMMUNAL-GARDEN"

tags:
  - "campus-example"
  - "cross-building"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus-wide site infrastructure CP — added with Campus showcase, demonstrates a Construction Package that spans multiple buildings"
---

# Site infrastructure CP (CP-SITE-INFRASTRUCTURE)

A **campus-spanning Construction Package** for all site infrastructure
that doesn't belong to any one Building. Runs from 2025-03 (with BLD-01
groundworks) through 2029-09 (before BLD-04 final connection).

| Property | Value |
|---|---|
| Phase | `construction` (65% complete) |
| Start | 2025-03-01 |
| Expected end | 2029-09-30 |
| Cost | €320,000 |
| Scope | DH mains, SuDS, parking + EV conduits, fibre, garden, playground, bike storage |

## Why this CP exists at Campus scope

In a single-building project, every CP belongs to one Building (see the
4 CPs in the [design example](/en/examples/green-terrace/construction-packages/cp-structure)).
In a multi-building campus, *site* CPs serve multiple buildings — and the
SBM model treats them as Campus-owned, not Building-owned.

This is the cleanest separation: per-building CPs handle the building
itself; campus-wide CPs handle the connecting infrastructure.
