---
entityType: "system"
id: "SYS-DH-LOOP-CAMPUS"
version: "2.1.0"
projectPhase: "construction"

systemName: "Campus district heating loop"
systemCategory: "hvac"

# Schema requires singular buildingId; primary location is BLD-01 central plant
buildingId: "BLD-01"

# Campus-scope membership + cross-building reach
campusId: "CAM-GREEN-TERRACE-PARK"
buildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

description: |
  Central air-source heat-pump plant + buried pre-insulated mains feeding
  all 4 Green Terrace Park buildings. Plant is sized at 320 kW nominal
  with hydraulic capacity for 400 kW so the BLD-04 connection can be made
  in 2029 without main-plant replacement.

# System-level configuration
configuration:
  plantType: "air_source_heat_pump_cascade"
  plantLocation: "Central plant room, semi-buried under shared parking"
  nominalCapacityKW: 320
  expandableCapacityKW: 400
  primaryFlowTempC: 65
  primaryReturnTempC: 45
  secondaryFlowTempC: 55      # per-building substation lowers to suit UFH
  ductMaterial: "Pre-insulated steel, 200 mm DN"
  serviceLifeYears: 25

# Buildings served — connection status varies by building lifecycle phase
buildingConnections:
  - buildingId: "BLD-01"
    status: "connected_operational"
    connectionDate: "2026-02-12"
    designLoadKW: 75
  - buildingId: "BLD-02"
    status: "connected_pending_commissioning"
    expectedConnectionDate: "2027-08-01"
    designLoadKW: 90
  - buildingId: "BLD-03"
    status: "design_phase"
    expectedConnectionDate: "2028-05-01"
    designLoadKW: 80
  - buildingId: "BLD-04"
    status: "scope_pending"
    expectedConnectionDate: "2029-10-01"
    designLoadKW: 60

# Construction package for the campus-wide DH mains
constructionPackageId: "CP-SITE-INFRASTRUCTURE"

tags:
  - "campus-example"
  - "cross-building-system"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus-wide district heating system — added with the Campus showcase example. Demonstrates a System with multiple buildingIds."
---

# District heating loop — campus-wide (SYS-DH-LOOP-CAMPUS)

A **single System spanning all 4 buildings** in the Green Terrace Park
campus. Central air-source heat-pump plant + buried pre-insulated mains
delivering 65 °C primary flow to per-building substations.

| Parameter | Value |
|---|---|
| Plant type | Cascade air-source heat pump |
| Nominal capacity | 320 kW thermal |
| Expandable capacity | 400 kW (for BLD-04 connection in 2029) |
| Primary flow temp | 65 °C |
| Service life | 25 years |
| Buildings served | 4 (1 operational, 1 pending commissioning, 1 in DD, 1 in SD) |
| Construction package | [CP-SITE-INFRASTRUCTURE](../construction-packages/CP-SITE-INFRASTRUCTURE) |

## What this entity demonstrates

Most Systems belong to **one** Building. This one belongs to **four**.
The schema's `buildingIds` array (vs the singular `buildingId` on
building-specific systems) is what makes this work cleanly. The compiler
treats it as a campus-scope resource:

- Cost rollup attributes the system cost to the Campus, not to any one Building
- Asset register groups assets under this system separately
- BIM mapping outputs a "campus-system" layer rather than nesting under a building model

## Connection status — varies by building phase

| Building | Phase | DH connection status | Design load |
|---|---|---|---|
| BLD-01 | operation | connected + operational since 2026-02-12 | 75 kW |
| BLD-02 | construction | connected, awaiting commissioning | 90 kW |
| BLD-03 | DD | substation in design | 80 kW |
| BLD-04 | SD | scope under review | 60 kW |

Total committed connected load: 235 kW (well within 320 kW nominal).
BLD-04 at 60 kW pushes to 295 kW — leaves 25 kW headroom on nominal
plant + the 80 kW expandability margin.
