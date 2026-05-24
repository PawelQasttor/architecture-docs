---
entityType: "circulation_route"
id: "CR-FIRE-EGRESS-L01"
version: "2.1.0"
projectPhase: "construction_documents"

routeName: "Primary fire egress route — Level 01"
routeType: "primary_egress"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"

# Sequence: room of origin → corridor → fire door → protected stairwell
waypoints:
  - sequence: 1
    entityId: "SP-BLD-01-L01-001"        # Bedroom 01 (worst-case room of origin)
    entityType: "space"
    isDecisionPoint: false
  - sequence: 2
    entityId: "OPN-DOOR-CORR-001"        # Bedroom-to-corridor door (acoustic, not fire-rated)
    entityType: "opening"
    isDecisionPoint: false
  - sequence: 3
    entityId: "SP-BLD-01-L01-CORR"       # Common corridor on Level 01
    entityType: "space"
    isDecisionPoint: true                # bidirectional — occupants could choose either stairwell
  - sequence: 4
    entityId: "OPN-DOOR-STAIR-01"        # Fire door EI 30 into protected stairwell
    entityType: "opening"
    isDecisionPoint: false
  - sequence: 5
    entityId: "VC-STAIR-A"               # Protected stairwell A
    entityType: "vertical_circulation"
    isDecisionPoint: false

totalTravelDistance: 38.5          # m — measured along centreline from worst-case Bedroom 01
maxTravelDistance: 40.0            # m — per WT 2021 § 256 for residential
minimumWidth: 1400                 # mm — corridor narrowest point
requiredWidth: 1400                # mm — WT 2021 minimum for primary residential egress
isAccessible: true                 # wheelchair-accessible: doors ≥ 900 mm clear, no thresholds
isFireEscape: true
occupantCapacity: 54               # full building occupant load (worst-case simultaneous evacuation)
estimatedEvacuationTime: 2.1       # minutes — RSET from Pathfinder simulation

# Verification against requirements
requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-PL-WT-256-001"            # WT 2021 max travel distance from jurisdiction pack
  - "REQ-PL-WT-CORRIDOR-WIDTH-001" # WT 2021 min corridor width

verification:
  method: "simulation"
  tool: "Pathfinder 2024"
  standard: "PD 7974-6"
  responsible: "Fire Safety Engineer (Anna Zielińska)"
  lastVerified: "2026-02-10"
  result: "PASS — 2.1 min RSET vs 2.5 min limit; 38.5 m travel vs 40 m limit"

regulatoryReferences:
  - code: "WT 2021"
    section: "§ 256"
    description: "Maksymalna długość drogi ewakuacyjnej w budynkach mieszkalnych"
  - code: "WT 2021"
    section: "§ 257"
    description: "Drzwi na drogach ewakuacyjnych"

sources:
  - id: "SRC-CR-FIRE-EGRESS-L01-01"
    title: "Green Terrace — Fire Safety Strategy, Rev. B"
    type: "other"
    documentType: "fire_safety_report"
    date: "2026-02-10"
    author: "Anna Zielińska, Fire Safety Engineer"
  - id: "SRC-CR-FIRE-EGRESS-L01-02"
    title: "Pathfinder Simulation — Worst-Case Level 01 Evacuation"
    type: "other"
    documentType: "egress_simulation"
    date: "2026-02-08"
    author: "Fire Safety Consultancy"

tags:
  - "construction-documents-artifact"
  - "safety-critical"

notes: |
  This is the **worst-case** Level 01 egress path: from the furthest bedroom
  (Bedroom 01, north end of the corridor) to the nearest protected
  stairwell. The route has 38.5 m of travel distance against a 40 m
  regulatory limit, giving 1.5 m of margin — narrow enough that any future
  layout change on Level 01 must re-verify this route.

  Pathfinder simulation (2026-02-08) confirmed 2.1 minutes RSET under
  simultaneous evacuation of all 18 units assuming one stairwell blocked
  (a worst-case assumption beyond code requirements).

  Other levels share the same general route topology but each must be
  modelled separately because room layouts and corridor lengths differ.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — extracts the egress path from REQ narrative into a queryable circulation route"
---

# Circulation Route — Primary Fire Egress, Level 01 (CR-FIRE-EGRESS-L01)

The **worst-case** Level 01 fire egress path: from Bedroom 01 (furthest from
any stairwell) to the protected Stairwell A enclosure.

| Property | Value |
|---|---|
| Route type | Primary egress |
| Travel distance | **38.5 m** (limit: 40 m per WT 2021 § 256) |
| Narrowest width | 1,400 mm (matches the regulatory minimum) |
| Estimated RSET | **2.1 min** (limit: 2.5 min) |
| Wheelchair-accessible | Yes |
| Occupant capacity | 54 persons (full building load) |
| Verification | Pathfinder 2024 simulation, 2026-02-10 — PASS |

## The path, step by step

1. **[Bedroom 01](../spaces/bedroom-01)** — worst-case room of origin
2. **[Acoustic door (OPN-DOOR-CORR-001)](../openings/opn-door-stair-01)** — bedroom into common corridor
3. **[Corridor (SP-BLD-01-L01-CORR)](../spaces/corridor)** — decision point: either stairwell is reachable
4. **[Fire door EI 30 (OPN-DOOR-STAIR-01)](../openings/opn-door-stair-01)** — into protected enclosure
5. **[Stairwell A (VC-STAIR-A)](../staircase-a)** — protected escape route, REI 120 enclosure

## Why this entity exists

Before v2.1 the egress path was described in **prose** inside
`REQ-FIRE-EGRESS-TIME-001` — text like "from Bedroom 01 through the corridor
to the protected stairwell, 38.5 m total". That's fine for an architect
reading the requirement; it's useless to a compiler trying to:

- **Verify** that every waypoint exists and is reachable
- **Re-check** travel distance automatically when a level is replanned
- **Tag** openings on the path with fire-rating requirements
- **Surface** the route in the BIM federation as an explicit IFC entity

By extracting the path as a `circulation_route` entity, every waypoint
becomes a referenced Space / Opening / VerticalCirculation ID, and the
compiler can flag a regression the moment one of those IDs changes.

## Verifies

- [`REQ-FIRE-EGRESS-TIME-001`](../requirements/REQ-FIRE-EGRESS-TIME-001) — 2.5 min RSET limit (passes at 2.1 min)
- WT 2021 § 256 — 40 m max travel distance (passes at 38.5 m)
- WT 2021 § 257 — door clear width ≥ 900 mm (passes)
