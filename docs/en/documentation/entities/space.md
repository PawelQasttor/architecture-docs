# Space

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
| `designHeight` | number | Clear height (m) |
| `designVolume` | number | Volume (m³) |
| `unit` | string | Measurement unit (`"m"`, `"mm"`) |
| `requirements` | array | Requirement IDs (merged with type requirements) |
| `requirementOverrides` | array | Additional requirements beyond type |
| `occupancy` | object | Occupancy data including `bedCount` (overrides type if present) |
| `environmentalConditions` | object | Temperature, humidity, ventilation, pressurization |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `regulatoryReferences` | array | Building code references with compliance status |
| `lifecycleState` | string | `planned` / `design` / `under_construction` / `operational` / `renovation` / `decommissioned` |
| `finishOverrides` | object | Override specific finishes from type |
| `maintenanceZone` | string | FM maintenance zone |
| `accessRestrictions` | string | Access control level |
| `adjacentSpaces` | array | Adjacent space relationships |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

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

## Example: Markdown Source

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
