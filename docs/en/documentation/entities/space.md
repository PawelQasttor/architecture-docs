# Space (Room Documentation)

## What This Is

A **Space** file documents one room or functional area in your building. Think of it as a digital room card that contains everything about that room: dimensions, fire zone assignment, compliance requirements, and equipment.

::: tip For Architects
Instead of maintaining room information across:
- AutoCAD (geometry)
- Excel (room schedule)
- Word (specifications)
- Email (coordination notes)

...you create **one file per room**. That file is both a readable document and structured data.

**Example:** `spaces/bedroom-01.md` contains everything about Bedroom 01 in one place.
:::

A **Space** represents a room or functional area within a building. Spaces are the primary spatial unit for design requirements, compliance checking, and operational monitoring.

::: tip Type/Instance Pattern (SBM v0.1.1+)
Spaces can reference a **[Space Type](/en/documentation/entities/space-type)** to inherit common specifications. This eliminates repetition when documenting similar rooms (e.g., 20 identical bedrooms).

- **Space Type** (template): Defines requirements, finishes, equipment **once**
- **Space** (instance): References type + adds location-specific data

See [example below](#example-using-space-type) for the type/instance pattern.
:::

## Purpose

Spaces define:
- Functional areas (bedrooms, offices, corridors)
- Design parameters (area, height, volume)
- Performance requirements (daylight, acoustic, thermal)
- Zone assignments (fire, HVAC, acoustic)
- Adjacency relationships (doors, shared walls)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique space identifier | `"SP-BLD-01-L01-001"` |
| `entityType` | string | Must be `"space"` | `"space"` |
| `documentType` | string | Must be `"space"` | `"space"` |
| `spaceName` | string | Human-readable name | `"Bedroom 01"` |
| `spaceType` | string | Functional type (see enum below) | `"sleeping_space"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `levelId` | string | Parent level ID | `"LVL-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Room identifier (like a drawing number, but for the room itself)
- **spaceName**: What you call it ("Bedroom 01", "Kitchen", "Corridor A")
- **spaceType**: Category from the list below (bedroom, office, corridor, etc.)
- **buildingId**: Which building (important for multi-building projects)
- **levelId**: Which floor (Ground floor = LVL-01, First floor = LVL-02, etc.)
- **version**: Track changes (1.0.0 = first version, 1.1.0 = minor update)

**You only NEED these 6 fields to create a valid space file.** Everything else is optional.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `spaceTypeId` | string | **Reference to Space Type** (inherits specifications) |
| `roomNumber` | string | Human-readable room number from drawings (e.g., `"0.06.1"`) |
| `accessibilityLevel` | string | Accessibility: `standard` / `mobility` / `visual` / `hearing` / `full` |
| `parentSpaceId` | string | Parent space for sub-spaces (e.g., bathroom → bedroom) |
| `departmentId` | string | Functional department grouping (e.g., `"DEPT-SPA"`) |
| `zoneIds` | array | Fire, HVAC, acoustic zone IDs |
| `designArea` | number | Floor area (m²) |
| `designHeight` | number | **[INHERITABLE v0.1.4]** Clear height (m) — inherits from `level.typicalCeilingHeight` if not specified |
| `designVolume` | number | Volume (m³) |
| `unit` | string | Measurement unit (`"m"`, `"mm"`) |
| `finishes` | object | Floor, wall, ceiling finishes — inherits from `level.typicalFinishes` or space type |
| `finishOverrides` | object | Override specific inherited finishes (only specify what's different) |
| `requirements` | array | **[INHERITABLE v0.1.4]** Requirement IDs — merged with `level.levelRequirements` and type requirements |
| `requirementOverrides` | array | Additional requirements beyond type |
| `occupancy` | object | Occupancy data including `bedCount` (overrides type if present) |
| `environmentalConditions` | object | **[INHERITABLE v0.1.4]** Temperature, humidity, ventilation — inherits from `level.typicalEnvironmentalConditions` if not specified |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `regulatoryReferences` | array | Building code references with compliance status |
| `lifecycleState` | string | `planned` / `design` / `under_construction` / `operational` / `renovation` / `decommissioned` |
| `finishOverrides` | object | Override specific finishes from type |
| `maintenanceZone` | string | FM maintenance zone |
| `accessRestrictions` | string | Access control level |
| `adjacentSpaces` | array | Adjacent space relationships |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Should You Use?

**⭐ NEW: Property Inheritance (v0.1.4) — Don't repeat yourself!**

These fields can be inherited from your Level (floor):
- **designHeight** — If your level defines `typicalCeilingHeight: 2.70`, all rooms inherit 2.70m automatically
- **finishes** — Standard floor/wall finishes defined once on level, inherited by all rooms
- **environmentalConditions** — HVAC settings (temperature, humidity) from level
- **requirements** — Level-wide requirements merged with room-specific ones

**Only specify these fields when a room is DIFFERENT** (bathroom with 2.40m ceiling, server room with special temperature).

**Start with these (most useful for permits and coordination):**
- **designArea** — Room area in m² (required for room schedules)
- **designHeight** — Ceiling height (or inherit from level!)
- **zoneIds** — Which fire/acoustic/HVAC zones (required for permits)
- **requirements** — Which regulations apply (or inherit from level!)

**Add these when you have the information:**
- **roomNumber** — Room number from your drawings (e.g., "1.01", "0.06")
- **occupancy** — How many people, usage pattern (for MEP calculations)
- **accessibilityLevel** — Accessibility requirements (standard, mobility, full)

**Advanced fields (use when needed):**
- **spaceTypeId** — Reference to template (if you have 20 identical bedrooms)
- **parentSpaceId** — For nested spaces (bathroom inside bedroom)
- **environmentalConditions** — Temperature, humidity requirements
- **electricalSafetyGroup** — For healthcare/wet areas (IEC 60364-7-710)

**You can add these fields gradually.** Start simple, add detail as your project progresses.
:::

## Space Types (Enum)

```typescript
type SpaceType =
  | "sleeping_space"
  | "bedroom"
  | "living_space"
  | "living_room"
  | "dining_space"
  | "dining_room"
  | "kitchen"
  | "bathroom"
  | "wet_room"
  | "corridor"
  | "staircase"
  | "storage"
  | "technical"
  | "office"
  | "meeting_room"
  | "open_office"
  | "break_room"
  | "elevator_lobby"
  | "entrance"
  | "classroom"
  | "retail"
  | "healthcare"
  | "assembly";
```

## Property Inheritance (Level → Space)

**NEW in v0.1.4:** Spaces automatically inherit properties from their parent Level. This eliminates the need to specify the same ceiling height, finishes, and environmental conditions in every room file.

### How Inheritance Works

When you create a space, the compiler resolves properties in this order:

1. **Explicit value in space file** (highest priority) — if you specify it here, this wins
2. **Space Type template** — if space references `spaceTypeId`, inherits from type
3. **Level inheritance** — from parent level's `typical*` properties
4. **No default** — validation warning if required

### Inheritable Properties

| Space Property | Inherits From | When To Override |
|----------------|---------------|------------------|
| `designHeight` | `level.typicalCeilingHeight` | Dropped ceiling, double-height space |
| `finishes` | `level.typicalFinishes` or space type | Bathroom (tile), server room (special flooring) |
| `environmentalConditions` | `level.typicalEnvironmentalConditions` or space type | Server room (18-22°C), cold storage |
| `requirements` | `level.levelRequirements` (merged) | Always merged, never overridden |

### Example: Ceiling Height Inheritance

Instead of this (BEFORE v0.1.4):
```yaml
# bedroom-01.md
designHeight: 2.70

# bedroom-02.md
designHeight: 2.70

# bedroom-03.md
designHeight: 2.70

# ... 47 more bedrooms with same 2.70m height
```

Do this (AFTER v0.1.4):
```yaml
# level-02.md (DEFINE ONCE)
typicalCeilingHeight: 2.70

# bedroom-01.md (INHERITS)
levelId: "LVL-02"
# designHeight inherited = 2.70m ✓

# bedroom-02.md (INHERITS)
levelId: "LVL-02"
# designHeight inherited = 2.70m ✓

# bathroom-01.md (OVERRIDE ONLY WHEN DIFFERENT)
levelId: "LVL-02"
designHeight: 2.40  # ← dropped ceiling, override inherited value
```

**Result:** 50 bedrooms inherit automatically, only 2 bathrooms need overrides. **96% reduction in repetition.**

### Example: Finish Inheritance

```yaml
# level-02.md
typicalFinishes:
  floor: "oak_engineered_natural"
  walls: "paint_white_matte"
  ceiling: "paint_white_matte"

# bedroom-01.md
levelId: "LVL-02"
# All finishes inherited from level ✓

# bathroom-01.md (partial override)
levelId: "LVL-02"
finishOverrides:
  floor: "ceramic_tile"  # ← only floor different
  walls: "ceramic_tile"  # ← only walls different
  # ceiling inherited from level ✓
```

**Compiled output for bathroom:**
```json
{
  "finishes": {
    "floor": "ceramic_tile",        // overridden
    "walls": "ceramic_tile",        // overridden
    "ceiling": "paint_white_matte"  // inherited from level
  }
}
```

### Example: Requirement Merging

```yaml
# level-02.md
levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"    # min 2.50m
  - "REQ-FIRE-FLOOR-RATING-REI-60" # REI 60 floor

# bedroom-01.md
levelId: "LVL-02"
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"    # daylight for bedrooms

# Compiled: bedroom has ALL THREE requirements
# 1. REQ-PL-WT-ROOM-HEIGHT-001 (from level)
# 2. REQ-FIRE-FLOOR-RATING-REI-60 (from level)
# 3. REQ-DAYLIGHT-SLEEPING-001 (from space)
```

### Combined Inheritance: Type + Level

When a space uses BOTH `spaceTypeId` AND inherits from level:

```yaml
# Space Type (template for all bedrooms)
ST-BEDROOM-STANDARD:
  finishes:
    floor: "carpet"
    walls: "paint"
  requirements:
    - "REQ-BEDROOM-GENERAL"

# Level (typical for floor)
LVL-02:
  typicalCeilingHeight: 2.70
  levelRequirements:
    - "REQ-LEVEL-FIRE-RATING"

# Space (inherits from BOTH)
bedroom-01:
  levelId: "LVL-02"
  spaceTypeId: "ST-BEDROOM-STANDARD"

# Compiled result:
{
  "designHeight": 2.70,           // from level
  "finishes": {
    "floor": "carpet",            // from space type
    "walls": "paint"              // from space type
  },
  "requirements": [
    "REQ-BEDROOM-GENERAL",        // from space type
    "REQ-LEVEL-FIRE-RATING"       // from level
  ]
}
```

**Resolution order when both type and level exist:**
- **designHeight**: Space type first, then level, then explicit value
- **finishes**: Space type first, then level, then finishOverrides
- **requirements**: ALL MERGED (space type + level + explicit)

---

## Example 1: Your First Space File (Minimal)

**The simplest possible space file** — just the 6 required fields:

```markdown
File: spaces/bedroom-01.md

---
id: "SP-BLD-01-L01-001"
entityType: "space"
documentType: "space"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
version: "1.0.0"
---

# Bedroom 01

Standard bedroom on ground floor.
```

**That's it.** This is a valid space file. You can add more details later.

---

## Example 2: Practical Space File (Permit-Ready)

**Adding the fields you need for permit submission:**

```markdown
File: spaces/bedroom-01.md

---
id: "SP-BLD-01-L01-001"
entityType: "space"
documentType: "space"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
version: "1.0.0"

# Added for permit compliance
designArea: 14.5
designHeight: 2.70
unit: "m"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Bedroom 01

Standard bedroom, ground floor, north-facing window.
Floor area: 14.5 m², Clear height: 2.70 m.
Fire zone ZL-IV. Meets WT 2021 minimum height (2.50 m).
```

**Use case:** This file now generates:
- ✅ Room schedule entry (area, height)
- ✅ Fire zone assignment (for permit drawings)
- ✅ Compliance check (height vs. WT 2021 requirement)

---

## Example 3: Complete Space File (Full Details)

**File:** `docs/en/examples/green-terrace/spaces/bedroom-01.md`

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

designArea: 14.5
designHeight: 2.70
designVolume: 39.15
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

maintenanceZone: "MAINT-ZONE-RESIDENTIAL"
accessRestrictions: "tenant_only"

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "north-facing"
---

# Space: Bedroom 01

Standard bedroom with north-facing window providing natural daylight.

## Design Parameters

- Floor area: 14.5 m²
- Clear height: 2.70 m
- Volume: 39.15 m³

## Requirements

This space must satisfy:
- Minimum daylight factor 2% (EN 17037)
- Acoustic Class B insulation (ISO 140-4)
- Room height ≥ 2.50 m (WT 2021 § 132)
- Thermal comfort 20-26°C (EN 16798-1)

## Zone Assignments

- **Fire Zone:** ZL-IV (low fire load, residential)
- **HVAC Zone:** North (balanced mechanical ventilation)
- **Acoustic Zone:** Night (enhanced acoustic protection)
```

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "spaces": [
      {
        "documentType": "space",
        "entityType": "space",
        "id": "SP-BLD-01-L01-001",
        "spaceName": "Bedroom 01",
        "spaceType": "sleeping_space",
        "buildingId": "BLD-01",
        "levelId": "LVL-01",
        "zoneIds": [
          "ZONE-FIRE-ZL-IV",
          "ZONE-HVAC-NORTH",
          "ZONE-ACOUSTIC-NIGHT"
        ],
        "designArea": 14.5,
        "designHeight": 2.7,
        "designVolume": 39.15,
        "unit": "m",
        "requirements": [
          "REQ-DAYLIGHT-SLEEPING-001",
          "REQ-ACOUSTIC-SLEEPING-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-PL-WT-ROOM-HEIGHT-001"
        ],
        "occupancy": {
          "maxOccupants": 2,
          "usagePattern": "residential_sleeping",
          "hoursPerDay": 8,
          "daysPerWeek": 7
        },
        "adjacentSpaces": [
          {
            "id": "SP-BLD-01-L01-002",
            "relationship": "shares_wall"
          },
          {
            "id": "SP-BLD-01-L01-CORR",
            "relationship": "connects_via_door"
          }
        ],
        "ifcMapping": {
          "ifcEntity": "IfcSpace",
          "globalId": "2O3fG9$rLBxv3VxEu2LPxQ",
          "objectType": "Bedroom"
        },
        "version": "1.0.0",
        "tags": ["residential", "sleeping", "north-facing"]
      }
    ]
  }
}
```

## Adjacency Relationships

Spaces can reference adjacent spaces with relationship types:

```yaml
adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"      # Shares a partition wall
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door" # Connected by door
  - id: "SP-BLD-01-L02-001"
    relationship: "above"             # Space above
  - id: "SP-BLD-01-L00-001"
    relationship: "below"             # Space below
```

## BIM Mapping

Spaces map to **IfcSpace** entities and Revit Rooms:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Space.SBM_ID` |
| `spaceName` | `Name` | `Name` |
| `spaceType` | `SBM_Space_Type` | `Pset_SBM_Space.SBM_SpaceType` |
| `designArea` | `Area` | `Pset_SBM_Space.SBM_DesignArea` |
| `designHeight` | `Limit Offset` | `Pset_SBM_Space.SBM_DesignHeight` |
| `requirements` | `SBM_Requirements` | `Pset_SBM_Space.SBM_Requirements` |
| `zoneIds` | `SBM_Zone_IDs` | `Pset_SBM_Space.SBM_ZoneIds` |

## Compliance Checking

The compiler validates spaces against assigned requirements:

```json
{
  "spaceComplianceDetails": [
    {
      "requirementId": "REQ-PL-WT-ROOM-HEIGHT-001",
      "spaceId": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "metric": "room_height_clear",
      "targetValue": 2.50,
      "measuredValue": 2.70,
      "operator": ">=",
      "status": "compliant",
      "margin": 0.20
    }
  ]
}
```

## Digital Twin Integration

Sensors bind to space IDs for runtime monitoring:

```json
{
  "spaceSensorBindings": [
    {
      "entityId": "SP-BLD-01-L01-001",
      "entityName": "Bedroom 01",
      "sensors": [
        {
          "sensorType": "temperature",
          "sensorId": "TEMP-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP",
          "thresholds": { "min": 18, "max": 26 }
        },
        {
          "sensorType": "co2",
          "sensorId": "CO2-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-CO2",
          "thresholds": { "min": 400, "max": 1000 }
        }
      ]
    }
  ]
}
```

## Example: Using Space Type

**For projects with many similar spaces**, use the type/instance pattern:

### 1. Create Space Type Once

**File:** `templates/space-types/standard-bedroom-type-a.md`

```markdown
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"

# TEMPLATE SPECIFICATIONS (inherited by all instances)
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

finishes:
  floor: "MAT-FLOOR-OAK-01"
  walls: "MAT-WALL-PAINT-WHITE"
  ceiling: "MAT-CEILING-PAINT-WHITE"
  door: "DOOR-INT-AC-01"
  window: "WINDOW-TYPE-A"

equipment:
  - category: "safety"
    description: "Optical smoke detector"
    quantity: 1

occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8

typicalArea:
  min: 10.0
  max: 18.0
  typical: 14.0
  unit: "m2"

version: "1.0.0"
---

# Space Type: Standard Bedroom - Type A

[Complete specifications defined once...]
```

### 2. Create Lightweight Instances

**File:** `spaces/bedroom-01.md`

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"

spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Reference to type!

# INSTANCE-SPECIFIC DATA ONLY
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]

designArea: 14.5  # Actual area for this instance
designHeight: 2.70
designVolume: 39.15

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"

version: "2.0.0"
---

# Space: Bedroom 01

**Type:** Standard Bedroom - Type A (see type definition file)

Inherits all specifications from type. See type definition for complete requirements, finishes, and equipment.

## Instance Details
- Area: 14.5 m² (within type range)
- Location: Building 01, Level 01
- Orientation: North-facing
```

**File:** `spaces/bedroom-02.md`

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"
spaceName: "Bedroom 02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Same type!

buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 12.8  # Different area

version: "2.0.0"
---

# Space: Bedroom 02

**Type:** Standard Bedroom - Type A (see type definition file)

Inherits specifications from type.
```

### Benefits

| Approach | 20 Bedrooms | Maintenance |
|----------|-------------|-------------|
| **Without types** | 4,200 lines | Edit 20 files per change |
| **With types** | 3,125 lines (-26%) | Edit 1 type file |

✅ **DRY:** Specifications defined once
✅ **Consistency:** All bedrooms guaranteed identical
✅ **Maintainability:** Update type → affects all instances

### Override Mechanism

When a space needs different finishes than the type default, use `finishOverrides`:

**Type defines default finishes:**
```yaml
# ST-BEDROOM-STANDARD-A
finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Engineered oak flooring"
  walls:
    material: "MAT-WALL-PAINT-WHITE"
  door:
    specification: "DOOR-INT-AC-01"
    soundReduction: "Rw = 38 dB"
```

**Instance overrides floor finish:**
```yaml
# Bedroom 03 (Accessible) - needs wheelchair-accessible flooring
---
spaceName: "Bedroom 03 (Accessible)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# Override flooring only
finishOverrides:
  floor:
    material: "MAT-FLOOR-TILE-01"
    description: "Ceramic tile (wheelchair accessible)"
    reason: "Accessibility requirement - easier wheelchair movement"

# Additional requirement
requirementOverrides:
  - "REQ-ACCESSIBILITY-WHEELCHAIR-001"
---
```

**Compiler merges type + overrides:**
```json
{
  "id": "SP-BLD-01-L01-003",
  "spaceName": "Bedroom 03 (Accessible)",
  "finishes": {
    "floor": {
      "material": "MAT-FLOOR-TILE-01",          // ← OVERRIDDEN
      "description": "Ceramic tile (wheelchair accessible)"
    },
    "walls": {
      "material": "MAT-WALL-PAINT-WHITE"        // ← FROM TYPE (unchanged)
    },
    "door": {
      "specification": "DOOR-INT-AC-01",        // ← FROM TYPE (unchanged)
      "soundReduction": "Rw = 38 dB"
    }
  },
  "requirements": [
    "REQ-DAYLIGHT-SLEEPING-001",                 // From type
    "REQ-ACOUSTIC-SLEEPING-001",                 // From type
    "REQ-THERMAL-COMFORT-001",                   // From type
    "REQ-ACCESSIBILITY-WHEELCHAIR-001"           // ← ADDED via override
  ]
}
```

**When to use overrides:**
- ✅ Accessible rooms (different flooring, wider doors)
- ✅ Corner units (different window specifications)
- ✅ Special requirements (fire-rated finishes in specific zones)
- ❌ Widespread differences → create new type instead

## Parent/Child Spaces

Spaces can form parent/child hierarchies using `parentSpaceId`. This is common for attached dependent rooms (bathrooms, vestibules, wardrobes).

```yaml
# Parent room
---
id: "SP-BLD-01-L00-006-1"
spaceName: "Room 0.06.1"
roomNumber: "0.06.1"
spaceType: "sleeping_space"
designArea: 18.5
---

# Attached bathroom (child space)
---
id: "SP-BLD-01-L00-006-2"
spaceName: "Bathroom 0.06.2"
roomNumber: "0.06.2"
spaceType: "bathroom"
parentSpaceId: "SP-BLD-01-L00-006-1"  # ← Links to parent room
designArea: 4.2
---
```

The compiler auto-computes `childSpaceIds` on the parent:

```json
{
  "id": "SP-BLD-01-L00-006-1",
  "spaceName": "Room 0.06.1",
  "childSpaceIds": ["SP-BLD-01-L00-006-2"]  // ← auto-computed
}
```

## Accessibility

The `accessibilityLevel` field classifies spaces by accessibility requirements:

| Level | Description | Typical Use |
|-------|-------------|-------------|
| `standard` | No special requirements (default) | Regular rooms |
| `mobility` | Wheelchair/mobility accessible | Wide doors, no thresholds, grab bars |
| `visual` | Visual impairment accommodations | Tactile markings, contrast signage |
| `hearing` | Hearing impairment accommodations | Visual alarms, induction loops |
| `full` | All accessibility features | Universal design rooms |

```yaml
---
spaceName: "Bedroom 03 (Accessible)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
accessibilityLevel: "mobility"  # Overrides type default
roomNumber: "0.06.3"
departmentId: "DEPT-RESIDENTIAL-A"
---
```

When `accessibilityLevel` is set on a Space Type, all instances inherit it unless overridden.

## Departments

The `departmentId` field groups spaces by functional department or unit:

```yaml
# Hospital ward
departmentId: "DEPT-OIOM"        # Intensive care unit

# Senior home sections
departmentId: "DEPT-SPA"         # SPA/wellness section
departmentId: "DEPT-ADMIN"       # Administration wing
departmentId: "DEPT-RESIDENTIAL-A"  # Residential wing A
```

This enables filtering and reporting by organizational unit without requiring a separate entity.

## Environmental Conditions

The `environmentalConditions` object specifies temperature, humidity, ventilation, and air pressure requirements. Can be set on Space Type (template) and overridden per instance.

```yaml
environmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 6
    unit: "ACH"          # Air Changes per Hour
  pressurization: "positive"  # positive/negative/neutral
  cleanlinessClass: "ISO 7"   # ISO 14644 class
```

**Typical values by space type:**

| Space | Temperature | Humidity | Ventilation | Pressure |
|-------|-------------|----------|-------------|----------|
| Operating room | 18-24°C | 30-60% | 20 ACH | positive |
| ICU ward | 20-24°C | 30-60% | 6 ACH | positive |
| Patient room | 20-24°C | 30-70% | 2 ACH | neutral |
| Residential bedroom | 18-22°C | 40-60% | 0.5 ACH | neutral |
| Isolation room | 20-24°C | 30-60% | 12 ACH | negative |

## Electrical Safety Groups

The `electricalSafetyGroup` field classifies spaces per IEC 60364-7-710 (electrical installations in medical locations):

| Group | Description | Example Spaces |
|-------|-------------|----------------|
| `standard` | No medical electrical equipment (default) | Offices, corridors, residential |
| `group_0` | Medical location, no applied parts | Waiting rooms, massage rooms |
| `group_1` | Applied parts, not life-critical | Examination rooms, patient wards |
| `group_2` | Life-critical applied parts | Operating rooms, ICU, cardiac catheterization |

```yaml
---
spaceName: "Operating Room 01"
spaceType: "healthcare"
electricalSafetyGroup: "group_2"
environmentalConditions:
  temperatureRange: { min: 18, max: 24, unit: "C" }
  ventilationRate: { value: 20, unit: "ACH" }
  pressurization: "positive"
  cleanlinessClass: "ISO 7"
---
```

**Requirements by group:**
- **Group 1:** IT medical power supply within 15 seconds, equipotential bonding
- **Group 2:** IT medical power supply within 0.5 seconds, medical equipotential bonding, RCD monitoring

## Regulatory References

The `regulatoryReferences` array tracks applicable building codes and their compliance status per space:

```yaml
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 132"
    description: "Minimum room height 2.50m for residential"
    status: "compliant"
  - code: "PN-B-02151-3:2015"
    section: "Table 1"
    description: "Acoustic insulation Rw ≥ 50 dB between apartments"
    status: "compliant"
  - code: "Dz.U. 2012 poz. 1426"
    section: "§ 14"
    description: "Fire safety requirements for residential buildings"
    status: "applicable"
```

**Status values:**

| Status | Meaning |
|--------|---------|
| `applicable` | Regulation applies, not yet verified |
| `compliant` | Verified compliant |
| `non_compliant` | Known non-compliance (action required) |
| `waiver_granted` | Non-compliant but waiver obtained |
| `not_applicable` | Explicitly marked as not applying |

## Lifecycle State

The `lifecycleState` field tracks the current phase of a space:

| State | Description |
|-------|-------------|
| `planned` | In master plan, not yet designed |
| `design` | Active design phase (schematic/DD/CD) |
| `under_construction` | Being built or fitted out |
| `operational` | In use, handed over to operations |
| `renovation` | Undergoing renovation or refurbishment |
| `decommissioned` | Taken out of service |

```yaml
---
spaceName: "Bedroom 01"
lifecycleState: "design"
---
```

This enables filtering spaces by phase - useful for phased construction projects and portfolio management.

## See Also

- **[Space Type](/en/documentation/entities/space-type)** - Create reusable space templates
- **[Zone](/en/documentation/entities/zone)** - Group spaces into functional zones
- **[Requirement](/en/documentation/entities/requirement)** - Define space requirements
- **[Authoring Template](/en/documentation/authoring/)** - Space Markdown template
