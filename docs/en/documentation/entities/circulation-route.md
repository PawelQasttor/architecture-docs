# Circulation Route (Egress Routes and Accessibility)

## What This Is

A **Circulation Route file** documents a single pedestrian movement path in a building -- an egress route, accessible route, or service corridor. It describes the sequence of spaces and vertical circulation elements the route passes through, along with distances, widths, and regulatory compliance.

::: tip For Architects
**Problem:** The fire marshal asks "What is the maximum travel distance from patient room 204 to stairwell A?" or "Does the egress route meet IBC Chapter 10 requirements?"

**Old way:** Measure on drawings, search through specifications, check calculations in Excel, look for fire review protocols.

**With circulation routes:** Open `routes/cr-egress-01.md` -- route waypoints, travel distances, widths, signage, regulatory compliance all in one file. **Egress verification without the search.**

**One route file = complete egress/accessible route documentation for the building permit application.**
:::

A **Circulation Route** represents a logical pedestrian movement path connecting spaces and vertical circulation elements. Routes enable egress analysis, accessibility verification, signage planning, and fire safety regulatory compliance checking.

## Purpose

Circulation routes define:
- Egress routes (primary, secondary, fire escape)
- Accessible routes for persons with disabilities
- Service and delivery corridors
- Patient, staff, and visitor circulation paths
- Sequences of spaces and stairwells along the route
- Travel distances and evacuation times
- Regulatory compliance (IBC, ADA, local fire codes)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier with `CR-` prefix | `"CR-EGRESS-01"` |
| `entityType` | string | Must be `"circulation_route"` | `"circulation_route"` |
| `routeName` | string | Human-readable name | `"Egress route from patient room 204 to stairwell A"` |
| `routeType` | enum | Route type (see enum below) | `"primary_egress"` |
| `buildingId` | string | Reference to parent building (`BLD-xx`) | `"BLD-01"` |
| `version` | string | Semantic version | `"2.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Route identifier with `CR-` prefix. Use descriptive suffixes: `CR-EGRESS-01` (egress), `CR-ACCESS-01` (accessible), `CR-SERVICE-01` (service)
- **routeName**: How you refer to it ("Egress route from room 204 to stairwell A")
- **routeType**: Route category -- `primary_egress`, `accessible_route`, `service_route`, etc.
- **buildingId**: Which building it belongs to
- **version**: Track changes

**You need ONLY these 5 fields.** Add waypoints, distances, and regulatory compliance as the design develops.
:::

## Route Types (Enum)

| Value | Description |
|-------|-------------|
| `primary_egress` | Primary egress route |
| `secondary_egress` | Secondary/alternate egress route |
| `fire_escape` | Fire escape (protected stairwell) |
| `accessible_route` | Accessible route for persons with disabilities |
| `service_route` | Service/maintenance corridor |
| `patient_evacuation` | Patient evacuation route (healthcare) |
| `visitor_circulation` | Visitor circulation path |
| `staff_circulation` | Staff circulation path |
| `goods_delivery` | Goods/delivery route |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `levelIds` | string[] | Levels the route passes through |
| `waypoints` | array | Ordered sequence of route waypoints (see below) |
| `totalTravelDistance` | number | Total route length in meters |
| `maxTravelDistance` | number | Maximum allowable travel distance per code (m) |
| `minimumWidth` | number | Narrowest width along the route in mm |
| `requiredWidth` | number | Required minimum width per code in mm |
| `isAccessible` | boolean | Route meets accessibility requirements |
| `isFireEscape` | boolean | Route is a designated fire egress route |
| `occupantCapacity` | number | Maximum number of occupants evacuated via this route |
| `estimatedEvacuationTime` | number | Estimated evacuation time in minutes |
| `obstacles` | array | Obstacles along the route: `step`, `narrow_point`, `heavy_door`, `level_change` |
| `signage` | object | Signage: exitSigns, photoluminescent, emergencyLighting |
| `regulatoryCompliance` | array | Regulatory checks (regulation, section, status) |
| `requirements` | string[] | Requirement IDs applicable to this route |
| `cost` | object | Cost tracking (signage, emergency lighting) |
| `tags` | string[] | Labels for filtering |

::: tip For Architects: Which Optional Fields Matter Most?

**For building permit application (most important):**
- **waypoints** -- Sequence of route waypoints (rooms, corridors, stairwells)
- **totalTravelDistance** + **maxTravelDistance** -- Travel distance vs. allowable per IBC Chapter 10
- **minimumWidth** + **requiredWidth** -- Narrowest point vs. required width
- **regulatoryCompliance** -- Compliance checks against IBC Sections 1004-1030

**For fire safety:**
- **isFireEscape** -- Whether this is a designated fire egress route
- **occupantCapacity** -- How many occupants evacuate via this route
- **estimatedEvacuationTime** -- Estimated evacuation time
- **obstacles** -- Obstacles that impede evacuation

**For accessibility:**
- **isAccessible** -- Whether the route is accessible for persons with disabilities
- **obstacles** -- Steps, narrow points, heavy doors

**Most architects fill in:** waypoints, totalTravelDistance, minimumWidth, and regulatoryCompliance. The rest at detailed fire safety design.
:::

## Waypoints (Route Points)

The `waypoints` array describes an ordered sequence of points the route passes through:

```yaml
waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-CORRIDOR"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "VC-STAIR-A"
    entityType: "vertical_circulation"
    sequence: 3
    isDecisionPoint: false
```

**Waypoint rules:**
- `sequence` -- ordinal number (starting from 1)
- `entityType` -- entity type of the waypoint: `"space"` or `"vertical_circulation"`
- `isDecisionPoint` -- a point where the evacuee makes a directional decision (e.g., corridor with a branch)

## Example 1: First Route File (Minimal)

**Simplest egress route for a building permit application:**

::: code-group

```yaml [Markdown]
---
id: "CR-EGRESS-01"
entityType: "circulation_route"
routeName: "Egress route from patient room 204 to stairwell A"
routeType: "primary_egress"
buildingId: "BLD-01"
isFireEscape: true
isAccessible: false
totalTravelDistance: 28.5
maxTravelDistance: 61.0
minimumWidth: 1400
requiredWidth: 1120
version: "2.0.0"
---

# Egress Route from Room 204 to Stairwell A

Primary egress route from patient room through corridor to stairwell A.
Travel distance 28.5 m (allowable 61.0 m per IBC Section 1017.1).
```

```yaml [YAML]
id: "CR-EGRESS-01"
entityType: "circulation_route"
routeName: "Egress route from patient room 204 to stairwell A"
routeType: "primary_egress"
buildingId: "BLD-01"
isFireEscape: true
isAccessible: false
totalTravelDistance: 28.5
maxTravelDistance: 61.0
minimumWidth: 1400
requiredWidth: 1120
version: "2.0.0"
```

```json [JSON]
{
  "id": "CR-EGRESS-01",
  "entityType": "circulation_route",
  "routeName": "Egress route from patient room 204 to stairwell A",
  "routeType": "primary_egress",
  "buildingId": "BLD-01",
  "isFireEscape": true,
  "isAccessible": false,
  "totalTravelDistance": 28.5,
  "maxTravelDistance": 61.0,
  "minimumWidth": 1400,
  "requiredWidth": 1120,
  "version": "2.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "routeName", "routeType", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CR-" },
    "entityType": { "const": "circulation_route" },
    "routeName": { "type": "string" },
    "routeType": {
      "type": "string",
      "enum": [
        "primary_egress", "secondary_egress", "fire_escape",
        "accessible_route", "service_route", "patient_evacuation",
        "visitor_circulation", "staff_circulation", "goods_delivery"
      ]
    },
    "buildingId": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

:::

**That is all.** Add waypoints and regulatory compliance as the design develops.

---

## Example 2: Full Egress Route (All Details)

**Complete egress route documentation with waypoints and regulatory compliance:**

::: code-group

```yaml [Markdown]
---
id: "CR-EGRESS-01"
entityType: "circulation_route"
routeName: "Egress route from patient room 204 to stairwell A"
routeType: "primary_egress"
buildingId: "BLD-01"

levelIds:
  - "LVL-02"
  - "LVL-01"
  - "LVL-00"

waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-CORRIDOR"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "SP-BLD-01-L02-LOBBY-A"
    entityType: "space"
    sequence: 3
    isDecisionPoint: false
  - entityId: "VC-STAIR-A"
    entityType: "vertical_circulation"
    sequence: 4
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L00-EXIT"
    entityType: "space"
    sequence: 5
    isDecisionPoint: false

totalTravelDistance: 28.5
maxTravelDistance: 61.0
minimumWidth: 1400
requiredWidth: 1120
isAccessible: false
isFireEscape: true
occupantCapacity: 45
estimatedEvacuationTime: 3.5

obstacles:
  - type: "heavy_door"
    location: "Fire-rated door EI 30 at stairwell A"
    entityId: "OPN-DOOR-FP-A"
  - type: "level_change"
    location: "Stairs from level 2 to ground floor (3 stories)"
    entityId: "VC-STAIR-A"

signage:
  exitSigns: true
  photoluminescent: true
  emergencyLighting: true

regulatoryCompliance:
  - regulation: "IBC 2021"
    section: "Section 1017.1"
    requirement: "Maximum travel distance in sprinklered I-2 occupancy"
    status: "compliant"
    note: "28.5 m < 61.0 m (allowable)"
  - regulation: "IBC 2021"
    section: "Section 1005.1"
    requirement: "Minimum egress width"
    status: "compliant"
    note: "1400 mm > 1120 mm (required)"
  - regulation: "IBC 2021"
    section: "Section 1008"
    requirement: "Emergency illumination along means of egress"
    status: "compliant"

requirements:
  - "REQ-IBC-EGRESS-DISTANCE-001"
  - "REQ-IBC-EGRESS-WIDTH-001"

cost:
  estimatedTotal: 3200
  currency: "USD"
  breakdown:
    - item: "Exit signage"
      cost: 900
    - item: "Emergency lighting"
      cost: 2300

version: "2.0.0"
tags:
  - "egress"
  - "fire_safety"
  - "I-2_occupancy"
  - "stairwell-A"
---

# Egress Route from Room 204 to Stairwell A

Primary egress route from patient room 204 (floor 2) through the corridor
and lobby to protected stairwell A, then down to the ground floor exit.

## Route Path

1. **Patient room 204** (start) -> door to corridor
2. **Floor 2 corridor** (decision point) -> toward stairwell A
3. **Lobby at stairwell A** -> fire-rated door EI 30
4. **Stairwell A** (protected, REI 120) -> 3 stories down
5. **Exit discharge** (ground floor) -> to building exterior

## Compliance Verification

- Travel distance: **28.5 m** (allowable: 61.0 m per IBC 2021 Section 1017.1) -- COMPLIANT
- Minimum width: **1400 mm** (required: 1120 mm per IBC 2021 Section 1005.1) -- COMPLIANT
- Emergency lighting: YES (per IBC 2021 Section 1008) -- COMPLIANT
```

```yaml [YAML]
id: "CR-EGRESS-01"
entityType: "circulation_route"
routeName: "Egress route from patient room 204 to stairwell A"
routeType: "primary_egress"
buildingId: "BLD-01"
levelIds:
  - "LVL-02"
  - "LVL-01"
  - "LVL-00"
waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-CORRIDOR"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "SP-BLD-01-L02-LOBBY-A"
    entityType: "space"
    sequence: 3
    isDecisionPoint: false
  - entityId: "VC-STAIR-A"
    entityType: "vertical_circulation"
    sequence: 4
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L00-EXIT"
    entityType: "space"
    sequence: 5
    isDecisionPoint: false
totalTravelDistance: 28.5
maxTravelDistance: 61.0
minimumWidth: 1400
requiredWidth: 1120
isAccessible: false
isFireEscape: true
occupantCapacity: 45
estimatedEvacuationTime: 3.5
obstacles:
  - type: "heavy_door"
    location: "Fire-rated door EI 30 at stairwell A"
    entityId: "OPN-DOOR-FP-A"
  - type: "level_change"
    location: "Stairs from level 2 to ground floor (3 stories)"
    entityId: "VC-STAIR-A"
signage:
  exitSigns: true
  photoluminescent: true
  emergencyLighting: true
regulatoryCompliance:
  - regulation: "IBC 2021"
    section: "Section 1017.1"
    requirement: "Maximum travel distance in sprinklered I-2 occupancy"
    status: "compliant"
    note: "28.5 m < 61.0 m (allowable)"
  - regulation: "IBC 2021"
    section: "Section 1005.1"
    requirement: "Minimum egress width"
    status: "compliant"
    note: "1400 mm > 1120 mm (required)"
  - regulation: "IBC 2021"
    section: "Section 1008"
    requirement: "Emergency illumination along means of egress"
    status: "compliant"
requirements:
  - "REQ-IBC-EGRESS-DISTANCE-001"
  - "REQ-IBC-EGRESS-WIDTH-001"
cost:
  estimatedTotal: 3200
  currency: "USD"
  breakdown:
    - item: "Exit signage"
      cost: 900
    - item: "Emergency lighting"
      cost: 2300
version: "2.0.0"
tags:
  - "egress"
  - "fire_safety"
  - "I-2_occupancy"
  - "stairwell-A"
```

```json [JSON]
{
  "id": "CR-EGRESS-01",
  "entityType": "circulation_route",
  "routeName": "Egress route from patient room 204 to stairwell A",
  "routeType": "primary_egress",
  "buildingId": "BLD-01",
  "levelIds": ["LVL-02", "LVL-01", "LVL-00"],
  "waypoints": [
    {
      "entityId": "SP-BLD-01-L02-204",
      "entityType": "space",
      "sequence": 1,
      "isDecisionPoint": false
    },
    {
      "entityId": "SP-BLD-01-L02-CORRIDOR",
      "entityType": "space",
      "sequence": 2,
      "isDecisionPoint": true
    },
    {
      "entityId": "SP-BLD-01-L02-LOBBY-A",
      "entityType": "space",
      "sequence": 3,
      "isDecisionPoint": false
    },
    {
      "entityId": "VC-STAIR-A",
      "entityType": "vertical_circulation",
      "sequence": 4,
      "isDecisionPoint": false
    },
    {
      "entityId": "SP-BLD-01-L00-EXIT",
      "entityType": "space",
      "sequence": 5,
      "isDecisionPoint": false
    }
  ],
  "totalTravelDistance": 28.5,
  "maxTravelDistance": 61.0,
  "minimumWidth": 1400,
  "requiredWidth": 1120,
  "isAccessible": false,
  "isFireEscape": true,
  "occupantCapacity": 45,
  "estimatedEvacuationTime": 3.5,
  "obstacles": [
    {
      "type": "heavy_door",
      "location": "Fire-rated door EI 30 at stairwell A",
      "entityId": "OPN-DOOR-FP-A"
    },
    {
      "type": "level_change",
      "location": "Stairs from level 2 to ground floor (3 stories)",
      "entityId": "VC-STAIR-A"
    }
  ],
  "signage": {
    "exitSigns": true,
    "photoluminescent": true,
    "emergencyLighting": true
  },
  "regulatoryCompliance": [
    {
      "regulation": "IBC 2021",
      "section": "Section 1017.1",
      "requirement": "Maximum travel distance in sprinklered I-2 occupancy",
      "status": "compliant",
      "note": "28.5 m < 61.0 m (allowable)"
    },
    {
      "regulation": "IBC 2021",
      "section": "Section 1005.1",
      "requirement": "Minimum egress width",
      "status": "compliant",
      "note": "1400 mm > 1120 mm (required)"
    },
    {
      "regulation": "IBC 2021",
      "section": "Section 1008",
      "requirement": "Emergency illumination along means of egress",
      "status": "compliant"
    }
  ],
  "requirements": [
    "REQ-IBC-EGRESS-DISTANCE-001",
    "REQ-IBC-EGRESS-WIDTH-001"
  ],
  "cost": {
    "estimatedTotal": 3200,
    "currency": "USD",
    "breakdown": [
      { "item": "Exit signage", "cost": 900 },
      { "item": "Emergency lighting", "cost": 2300 }
    ]
  },
  "version": "2.0.0",
  "tags": ["egress", "fire_safety", "I-2_occupancy", "stairwell-A"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "routeName", "routeType", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CR-" },
    "entityType": { "const": "circulation_route" },
    "routeName": { "type": "string" },
    "routeType": {
      "type": "string",
      "enum": [
        "primary_egress", "secondary_egress", "fire_escape",
        "accessible_route", "service_route", "patient_evacuation",
        "visitor_circulation", "staff_circulation", "goods_delivery"
      ]
    },
    "buildingId": { "type": "string" },
    "waypoints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "entityId": { "type": "string" },
          "entityType": { "type": "string", "enum": ["space", "vertical_circulation"] },
          "sequence": { "type": "integer" },
          "isDecisionPoint": { "type": "boolean" }
        }
      }
    },
    "totalTravelDistance": { "type": "number" },
    "maxTravelDistance": { "type": "number" },
    "minimumWidth": { "type": "number" },
    "requiredWidth": { "type": "number" },
    "isAccessible": { "type": "boolean" },
    "isFireEscape": { "type": "boolean" },
    "occupantCapacity": { "type": "integer" },
    "estimatedEvacuationTime": { "type": "number" },
    "version": { "type": "string" }
  }
}
```

:::

---

## Compiler Behavior

The SBM compiler handles circulation route entities as follows:

| Feature | Behavior |
|---------|----------|
| **Parsing** | Recognizes entity type `circulation_route` with `CR-` ID prefix |
| **Grouping** | Collects into the `entities.circulation_routes` array |
| **Back-references** | Building automatically receives a computed `circulationRouteIds` array |
| **Referential integrity** | Warns when `buildingId`, `levelIds`, or `waypoints[].entityId` reference missing entities |
| **Waypoint validation** | Checks `sequence` ordering and `entityType` correctness in waypoints |
| **Cost aggregation** | Route costs included in building-level cost aggregation |

---

## Relationships

```
Building (BLD-01)
  +-- Circulation Route (CR-EGRESS-01)
  |    +-- waypoint 1: Space (SP-BLD-01-L02-204)
  |    +-- waypoint 2: Space (SP-BLD-01-L02-CORRIDOR)
  |    +-- waypoint 3: Space (SP-BLD-01-L02-LOBBY-A)
  |    +-- waypoint 4: Vertical Circulation (VC-STAIR-A)
  |    +-- waypoint 5: Space (SP-BLD-01-L00-EXIT)
  +-- Circulation Route (CR-ACCESS-01)
  |    +-- ...
  +-- Level (LVL-02)
       +-- Space (Patient Room 204)
```

**Forward references (you write):**
- `buildingId` -> which building the route belongs to
- `levelIds` -> which levels the route passes through
- `waypoints[].entityId` -> which spaces/stairwells the route traverses
- `requirements` -> which requirements must be met

**Back-references (compiler computes):**
- Building receives `circulationRouteIds` listing all its routes

---

## BIM Mapping

Circulation routes do not have a direct IFC equivalent. They are computed from relationships between IFC entities:

| SBM Field | IFC Source | Description |
|-----------|-----------|-------------|
| `waypoints` (space) | `IfcSpace` | Spaces along the route |
| `waypoints` (vertical_circulation) | `IfcStair` / `IfcTransportElement` | Stairwells and elevators along the route |
| `minimumWidth` | `IfcDoor.OverallWidth` / `IfcSpace` | Narrowest width along the route |
| `totalTravelDistance` | Computed from geometry | Sum of distances between waypoints |

::: tip BIM Mapping
Circulation routes are **analytical** entities -- they do not exist as separate objects in the IFC model. They are reconstructed from `IfcSpace` -> `IfcRelSpaceBoundary` -> `IfcDoor` -> `IfcSpace` relationships and associations with `IfcStair`/`IfcTransportElement`. The SBM compiler generates them as separate entities for egress analysis and accessibility verification.
:::

---

::: tip When to Add Circulation Route Files
- **Phase 2 (Concept):** Identify main egress routes, determine travel distances
- **Phase 3 (Schematic Design):** Add waypoints, widths, accessibility flags
- **Phase 4 (Design Development):** Add full IBC Chapter 10 compliance, evacuation calculations
- **Phase 5 (Construction Documents):** Add signage, emergency lighting, costs
:::

---

## See Also

- **[Vertical Circulation](/en/documentation/entities/vertical-circulation)** -- Stairwells and elevators along routes
- **[Space](/en/documentation/entities/space)** -- Rooms as route waypoints
- **[Requirement](/en/documentation/entities/requirement)** -- Egress route regulations
- **[Opening](/en/documentation/entities/opening)** -- Fire-rated doors along routes
