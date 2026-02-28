# Vertical Circulation

A **Vertical Circulation** entity describes a building element that connects levels: staircases, elevators, ramps, escalators, service lifts, and fire escape stairs. It captures physical dimensions, accessibility features, fire escape properties, elevator specifications, and egress capacity calculations.

## When to Use This Entity

- You need to document staircases, elevators, ramps, or escalators
- Fire safety analysis requires escape route documentation with travel distances and egress capacity
- Accessibility audits need wheelchair-accessible routes between levels documented
- Hospital/care buildings require stretcher-capable elevator documentation
- Building permit submissions require vertical circulation details

::: tip Start Simple
For most residential projects, you need 1-2 vertical circulation files (one staircase, one elevator). Add fire escape details and egress calculations when preparing for permit submission.
:::

---

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique ID with `VC-` prefix (e.g., `VC-STAIR-A`) |
| `entityType` | string | Must be `"vertical_circulation"` |
| `circulationName` | string | Human-readable name (e.g., "Staircase A") |
| `circulationType` | enum | One of: `staircase`, `elevator`, `escalator`, `ramp`, `ladder`, `service_lift`, `dumbwaiter`, `fire_escape_stair` |
| `buildingId` | string | Reference to the parent building (`BLD-xx`) |
| `connectedLevelIds` | array | Level IDs this element connects (minimum 2) |
| `version` | string | Semantic version (e.g., `"1.0.0"`) |

---

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `servedSpaceIds` | array of strings | Space IDs of lobbies, landings, vestibules served |
| `isFireEscape` | boolean | Designated fire escape route |
| `isAccessible` | boolean | Meets wheelchair/mobility accessibility requirements |
| `isStretcher` | boolean | Can accommodate a stretcher (hospital buildings) |
| `isEvacuationLift` | boolean | Elevator rated for evacuation use |
| `fireProperties` | object | Fire safety: protected staircase, fire rating, pressurization, smoke ventilation, emergency lighting, travel distance |
| `dimensions` | object | Flight width, landing depth, headroom, riser/going, gradient, shaft dimensions |
| `elevatorProperties` | object | Load/person capacity, speed, cab dimensions, door dimensions, drive type, stops |
| `accessibility` | object | Handrails, tactile warnings, contrast nosings, braille, audio announcements, turning circle |
| `egressCapacity` | object | Occupant capacity, flow rate, evacuation time |
| `regulatoryCompliance` | array | Regulatory checks (regulation, section, requirement, status) |
| `cost` | object | Cost tracking (estimatedTotal, currency, breakdown) |
| `ifcMapping` | object | IFC entity mapping (IfcStairFlight, IfcStair, IfcTransportElement, IfcRamp) |
| `tags` | array of strings | Labels for filtering |

---

## Minimal Example (Staircase)

```yaml
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
version: "1.0.0"
---

# Staircase A

Main staircase serving all residential levels.
```

---

## Complete Example (Elevator)

```yaml
---
id: "VC-ELEV-01"
entityType: "vertical_circulation"
circulationName: "Passenger Elevator 1"
circulationType: "elevator"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
servedSpaceIds:
  - "SP-BLD-01-L00-LOBBY"
  - "SP-BLD-01-L01-LOBBY"
isFireEscape: false
isAccessible: true
isStretcher: true
isEvacuationLift: false

dimensions:
  shaftWidth: 1800
  shaftDepth: 2100
  pitDepth: 1200
  overrun: 3600
  totalRise: 16200

elevatorProperties:
  loadCapacity: 1000
  personCapacity: 13
  speed: 1.0
  cabWidth: 1100
  cabDepth: 1400
  cabHeight: 2200
  doorWidth: 900
  doorHeight: 2100
  driveType: "mrl"
  doorType: "center_opening"
  stops: 6
  manufacturer: "KONE"
  model: "MonoSpace 500"

accessibility:
  handrails: "both_sides"
  handrailHeight: 900
  brailleControls: true
  audioAnnouncements: true
  turningCircle: 1500

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 54"
    requirement: "Elevator required in buildings > 4 stories"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 193"
    requirement: "Minimum cab dimensions for stretcher access"
    status: "compliant"

cost:
  estimatedTotal: 85000
  currency: "EUR"
  breakdown:
    equipment: 65000
    installation: 15000
    shaft_construction: 5000

ifcMapping:
  ifcEntity: "IfcTransportElement"
  objectType: "PassengerElevator_01"
  predefinedType: "ELEVATOR"

version: "1.0.0"
tags: ["accessibility", "stretcher", "residential"]
---

# Passenger Elevator 1

KONE MonoSpace 500 machine-room-less passenger elevator serving all levels.
```

---

## Fire Escape Staircase Example

```yaml
---
id: "VC-STAIR-FIRE-B"
entityType: "vertical_circulation"
circulationName: "Fire Escape Staircase B"
circulationType: "fire_escape_stair"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
isFireEscape: true
isAccessible: true

fireProperties:
  isProtectedStaircase: true
  fireRating: "REI 120"
  pressurization: true
  smokeVentilation: "mechanical"
  emergencyLighting: true
  maxTravelDistance: 25.0
  vestibuleRequired: true

dimensions:
  flightWidth: 1200
  flightWidthRequired: 1200
  landingDepth: 1500
  headroom: 2200
  riserHeight: 175
  goingDepth: 280
  totalRise: 2700
  numberOfFlights: 2
  numberOfSteps: 16

accessibility:
  handrails: "both_sides"
  handrailHeight: 900
  tactileWarnings: true
  contrastNosings: true

egressCapacity:
  occupantCapacity: 120
  flowRate: 60
  evacuationTime: 4.5
  requiredCapacity: 100

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 256"
    requirement: "Protected staircase in buildings > 25m"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 242"
    requirement: "Minimum stair width 1.2m for escape routes"
    status: "compliant"

version: "1.0.0"
tags: ["fire-escape", "protected", "pressurized"]
---

# Fire Escape Staircase B

Protected, pressurized fire escape staircase on the east side of the building.
```

---

## Compiler Behavior

The SBM Compiler handles vertical circulation entities as follows:

| Feature | Behavior |
|---------|----------|
| **Parsing** | Recognized as `vertical_circulation` entity type with `VC-` ID prefix |
| **Grouping** | Collected into `entities.vertical_circulations` array |
| **Reverse relationships** | Building gets `verticalCirculationIds` array auto-computed |
| **Referential integrity** | Warns if `buildingId`, `connectedLevelIds`, or `servedSpaceIds` reference missing entities |
| **Cost rollup** | Vertical circulation costs included in building-level aggregation |
| **IFC mapping** | Maps to IfcStairFlight, IfcStair, IfcTransportElement, IfcRamp |

---

## IFC Mapping Reference

| Circulation Type | IFC Entity | Predefined Type |
|-----------------|------------|-----------------|
| staircase | IfcStair / IfcStairFlight | STRAIGHT_RUN, SPIRAL, etc. |
| fire_escape_stair | IfcStair | STRAIGHT_RUN |
| elevator | IfcTransportElement | ELEVATOR |
| service_lift | IfcTransportElement | ELEVATOR |
| dumbwaiter | IfcTransportElement | ELEVATOR |
| escalator | IfcTransportElement | ESCALATOR |
| ramp | IfcRamp / IfcRampFlight | STRAIGHT_RUN, SPIRAL |
| ladder | IfcStairFlight | LADDER |

---

## Relationships

```
Building (BLD-01)
  ├─ Vertical Circulation (VC-STAIR-A)
  │    ├─ connects Level (LVL-00)
  │    ├─ connects Level (LVL-01)
  │    └─ connects Level (LVL-02)
  ├─ Vertical Circulation (VC-ELEV-01)
  │    ├─ connects Level (LVL-00) ... (LVL-05)
  │    └─ serves Space (SP-BLD-01-L00-LOBBY)
  └─ Level (LVL-01)
       └─ Space (Bedroom 01)
```

**Forward references (you write):**
- `buildingId` → which building this element belongs to
- `connectedLevelIds` → which levels it connects
- `servedSpaceIds` → which lobbies/landings it serves

**Reverse references (compiler computes):**
- Building gets `verticalCirculationIds` listing all its circulation elements

---

::: tip When to Add Vertical Circulation Files
- **Phase 2 (Concept):** Create staircase/elevator files with basic type and connected levels
- **Phase 3 (Schematic):** Add dimensions, accessibility flags
- **Phase 4 (Design Development):** Add fire properties, egress calculations, regulatory compliance
- **Phase 5 (Construction Docs):** Add elevator specifications (manufacturer, model, cab dimensions)
:::
