# Level (Floor/Storey Documentation)

## What This Is

A **Level** file documents one floor in your building. Examples: "Level 01 (Ground)", "Level 02", "Basement 01".

::: tip For Architects
**Problem:** Floor numbering, elevations, and floor areas scattered across drawings, schedules, and BIM models.

**Old way:** Update floor elevation in 4 places when structural engineer changes slab height.

**With level files:** Change elevation once in `levels/level-01.md` — all room schedules, section drawings, and area calculations update automatically.

**One level file per floor = all floor info (elevation, height, area) in one place.**
:::

A **Level** represents a building floor or storey. Levels organize spaces vertically and provide elevation reference for building elements.

## Purpose

Levels define:
- Floor elevation and height
- Level naming and numbering
- Vertical organization of spaces
- Story-level requirements (ceiling heights, fire rating)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique level identifier | `"LVL-01"` |
| `entityType` | string | Must be `"level"` | `"level"` |
| `documentType` | string | Must be `"level"` | `"level"` |
| `levelName` | string | Human-readable name | `"Level 01 (Ground)"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `elevation` | number | Level elevation | `0.0` |
| `elevationUnit` | string | Elevation unit | `"m"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Level identifier (e.g., `LVL-01`, `LVL-ROOF`)
- **levelName**: What you call it ("Level 01 (Ground)", "Basement 01", "Roof")
- **buildingId**: Which building
- **elevation**: Height above base point in meters (0.0 for ground, negative for basements)
- **elevationUnit**: Usually `"m"` (meters)
- **version**: Track changes

**You only NEED these 6 fields.** The system automatically tracks which rooms are on this floor (you don't manually list them).
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `spaceIds` | array | Space IDs on this level (auto-computed) |
| `levelNumber` | number | Numeric level index (0 = ground, negative = basement) |
| `levelHeight` | number | Floor-to-floor height |
| `levelHeightUnit` | string | Height unit |
| `typicalCeilingHeight` | number | **[INHERITED BY SPACES]** Default clear ceiling height for spaces on this level |
| `typicalFinishes` | object | **[INHERITED BY SPACES]** Default finish specifications (floor, walls, ceiling, baseboard) |
| `typicalEnvironmentalConditions` | object | **[INHERITED BY SPACES]** Default HVAC settings (temperature, humidity, ventilation) |
| `levelRequirements` | array | **[INHERITED BY SPACES]** Requirements that apply to all spaces on this level |
| `grossFloorArea` | number | Total GFA for this level |
| `areaUnit` | string | Area unit |
| `levelType` | string | Level type (see enum below) |
| `description` | string | Detailed description |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**⭐ NEW: Inheritable Properties (v0.1.4) — Define once, inherit everywhere!**

These fields automatically cascade to all rooms on this floor:
- **typicalCeilingHeight** — Default ceiling height (e.g., 2.70m) → all bedrooms inherit this
- **typicalFinishes** — Standard finishes (oak floor, painted walls) → all rooms use these unless overridden
- **typicalEnvironmentalConditions** — HVAC settings (20-26°C, 30-60% humidity) → all rooms inherit
- **levelRequirements** — Level-wide requirements → merged with room-specific requirements

**Why this matters:** Instead of specifying ceiling height 50 times for 50 rooms, specify it ONCE here. Rooms inherit it automatically unless they need something different (bathroom with dropped ceiling at 2.40m).

**For permit/area schedules:**
- **grossFloorArea** — Total floor area in m²
- **levelHeight** — Floor-to-floor height (e.g., 3.20m, different from ceiling height!)
- **levelNumber** — Numeric index (0 = ground, negative = basement)
- **levelType** — Category: `ground`, `basement`, `typical`, `roof`

**Note:** `spaceIds` is **automatically computed**. You don't list rooms here — rooms list the level, and the system tracks the reverse relationship.
:::

## Level Types (Enum)

```typescript
type LevelType =
  | "basement"      // Below grade
  | "ground"        // Grade level
  | "typical"       // Standard floor
  | "roof"          // Roof level
  | "mechanical"    // Mechanical penthouse
  | "parking";      // Parking level
```

## Property Inheritance (Level → Space)

**NEW in v0.1.4:** Levels can define typical properties that automatically cascade to all spaces on that floor. This eliminates repetition — define ceiling height once, not 50 times.

### Inheritance Resolution Order

When the compiler resolves a property for a space:

1. **Explicit value on space** (highest priority) — always wins
2. **Space type template** — if space references a `spaceTypeId`
3. **Level inheritance** — from `level.typicalCeilingHeight`, `level.typicalFinishes`, etc.
4. **No default** — validation warning if required field missing

### Example: Ceiling Height Inheritance

```yaml
# Level defines typical ceiling height
LVL-02:
  id: "LVL-02"
  levelName: "Level 02"
  elevation: 3.20
  levelHeight: 3.00                 # floor-to-floor
  typicalCeilingHeight: 2.70        # ← DEFAULT for all rooms on this floor

# Most rooms inherit automatically
bedroom-01:
  id: "SP-BLD-01-L02-001"
  levelId: "LVL-02"
  # designHeight: 2.70  ← INHERITED from level, no need to specify!

bedroom-02:
  id: "SP-BLD-01-L02-002"
  levelId: "LVL-02"
  # designHeight: 2.70  ← INHERITED from level

living-room:
  id: "SP-BLD-01-L02-003"
  levelId: "LVL-02"
  # designHeight: 2.70  ← INHERITED from level

# Exception rooms override
bathroom-01:
  id: "SP-BLD-01-L02-004"
  levelId: "LVL-02"
  designHeight: 2.40  # ← OVERRIDE: dropped ceiling for ducts
```

**Result:** 3 rooms inherit 2.70m automatically, only 1 room needs explicit override.

### Example: Finish Inheritance

```yaml
# Level defines typical finishes
LVL-02:
  id: "LVL-02"
  typicalFinishes:
    floor: "oak_engineered_natural"
    walls: "paint_white_matte"
    ceiling: "paint_white_matte"
    baseboard: "mdf_white_120mm"

# Most rooms inherit finishes
bedroom-01:
  levelId: "LVL-02"
  # All finishes inherited from level

bedroom-02:
  levelId: "LVL-02"
  # All finishes inherited from level

# Bathroom overrides only what's different
bathroom-01:
  levelId: "LVL-02"
  finishOverrides:
    floor: "ceramic_tile_300x600_grey"     # override floor only
    walls: "ceramic_tile_300x600_grey"     # override walls only
    # ceiling and baseboard inherited from level
```

**Compiled output for bathroom-01:**
```json
{
  "id": "SP-BLD-01-L02-004",
  "finishes": {
    "floor": "ceramic_tile_300x600_grey",      // from override
    "walls": "ceramic_tile_300x600_grey",      // from override
    "ceiling": "paint_white_matte",            // inherited from level
    "baseboard": "mdf_white_120mm"             // inherited from level
  }
}
```

### Example: Structured Finishes on Level (v0.3.0)

**NEW in v0.3.0:** Finish fields accept either simple strings or structured objects. Structured finishes are useful for healthcare levels where fire class, antimicrobial properties, and cleanability matter.

```yaml
# Hospital Level 03 - Operating Theatre Suite
LVL-03:
  id: "LVL-03"
  levelName: "Level 03 (Operating Theatres)"
  typicalFinishes:
    floor:
      material: "seamless vinyl"
      productCode: "Tarkett iQ Granit SD"
      fireClass: "Bfl-s1"
      slipResistance: "R10"
      antimicrobial: true
      chemicalResistance: "hospital-grade disinfectants"
      cleanability: "medical"
      coveBase: true
      seamless: true
    walls:
      material: "HPL panel"
      fireClass: "B-s1,d0"
      antimicrobial: true
      cleanability: "medical"
    ceiling:
      material: "sealed metal tile"
      fireClass: "A2-s1,d0"
      cleanability: "medical"

# Operating room overrides to cleanroom-grade
or-01:
  levelId: "LVL-03"
  finishOverrides:
    floor:
      material: "seamless conductive vinyl"
      esdProtection: true
      cleanability: "cleanroom"  # upgrade from medical to cleanroom
    ceiling:
      material: "sealed laminar flow canopy"
      cleanability: "cleanroom"
    # walls inherited from level (medical grade HPL)
```

The structured format fields are documented in [Space Type: Structured Finishes](/en/documentation/entities/space-type#structured-finishes-v0-3-0).

### Example: Environmental Conditions Inheritance

```yaml
# Level defines typical HVAC settings
LVL-02:
  typicalEnvironmentalConditions:
    temperatureRange:
      min: 20
      max: 26
      unit: "C"
    humidityRange:
      min: 30
      max: 60
    ventilationRate:
      value: 30
      unit: "m3/h/person"

# All residential rooms inherit these settings
bedroom-01:
  levelId: "LVL-02"
  # environmentalConditions inherited from level

# Server room overrides
server-room:
  levelId: "LVL-02"
  environmentalConditions:    # complete override
    temperatureRange:
      min: 18
      max: 22
      unit: "C"
    humidityRange:
      min: 40
      max: 50
```

### Example: Expanded Environmental Conditions on Level (v0.3.0)

**NEW in v0.3.0:** Six new fields for healthcare and cleanroom levels. These are inherited by all spaces on the level unless overridden.

```yaml
# Hospital Level 03 - Operating Theatre Suite
LVL-03:
  typicalEnvironmentalConditions:
    temperatureRange: { min: 18, max: 24, unit: "C" }
    humidityRange: { min: 30, max: 60 }
    pressurization: "positive"
    # v0.3.0 fields:
    airChangesPerHour: 15            # baseline for surgical floor
    freshAirPercentage: 100          # no recirculation
    filtrationClass: "HEPA H13"      # baseline filtration
    pressureDifferentialPa: 10       # vs. adjacent corridors

# Operating rooms override to Class Ia standard
or-01:
  levelId: "LVL-03"
  environmentalConditions:
    temperatureRange: { min: 18, max: 24, unit: "C" }
    humidityRange: { min: 30, max: 60 }
    pressurization: "positive"
    airChangesPerHour: 20            # higher than level baseline
    freshAirPercentage: 100
    filtrationClass: "HEPA H14"      # upgraded filtration
    pressureDifferentialPa: 15       # higher pressure
    laminarFlow: true                # laminar flow over surgical zone
    operatingRoomClass: "class_ia"

# Recovery rooms use level defaults (15 ACH, H13, +10 Pa)
recovery-01:
  levelId: "LVL-03"
  # environmentalConditions inherited from level
```

| Field | Type | Description |
|-------|------|-------------|
| `airChangesPerHour` | number | Total ACH (per ASHRAE 170 for healthcare) |
| `freshAirPercentage` | number (0-100) | Minimum % outside air. 100 = no recirculation |
| `filtrationClass` | string | Air filtration class (e.g., "HEPA H14", "F9") |
| `pressureDifferentialPa` | number | Pressure difference in Pa vs. corridor |
| `laminarFlow` | boolean | Whether unidirectional airflow is required |
| `operatingRoomClass` | enum | DIN 1946-4: `class_ia` / `class_ib` / `class_ii` / `not_applicable` |

See [Space: Environmental Conditions](/en/documentation/entities/space#environmental-conditions) for the full reference and typical values by space type.

### Example: Requirement Merging

```yaml
# Level-wide requirements (apply to ALL rooms)
LVL-02:
  levelRequirements:
    - "REQ-PL-WT-ROOM-HEIGHT-001"      # min 2.50m ceiling
    - "REQ-FIRE-FLOOR-RATING-REI-60"   # REI 60 floor

# Room adds specific requirements
bedroom-01:
  levelId: "LVL-02"
  requirements:
    - "REQ-DAYLIGHT-SLEEPING-001"      # daylight for bedrooms

# Compiled: merged requirements
# bedroom-01 has ALL THREE requirements:
# 1. REQ-PL-WT-ROOM-HEIGHT-001 (from level)
# 2. REQ-FIRE-FLOOR-RATING-REI-60 (from level)
# 3. REQ-DAYLIGHT-SLEEPING-001 (from space)
```

---

## Example 1: Your First Level File (Minimal)

**The simplest level file — ground floor:**

```markdown
File: levels/level-01.md

---
id: "LVL-01"
entityType: "level"
documentType: "level"
levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
elevation: 0.0
elevationUnit: "m"
version: "1.0.0"

# For permit/schedules
levelNumber: 0
levelHeight: 3.20
grossFloorArea: 1250
---

# Level 01: Ground Floor

Main entrance level with lobby and residential units.
```

**That's it.** When rooms reference `LVL-01`, they automatically appear on this floor's room list.

---

## Example 2: Level with Inheritable Properties (Recommended)

**Define typical properties once — all rooms inherit them:**

```markdown
File: levels/level-02.md

---
id: "LVL-02"
entityType: "level"
documentType: "level"
levelName: "Level 02"
buildingId: "BLD-01"
elevation: 3.20
elevationUnit: "m"
version: "1.0.0"

levelNumber: 1
levelHeight: 3.00
grossFloorArea: 1200

# ⭐ Inheritable properties (NEW v0.1.4)
typicalCeilingHeight: 2.70    # All rooms inherit this as designHeight
typicalFinishes:
  floor: "oak_engineered_natural"
  walls: "paint_white_matte"
  ceiling: "paint_white_matte"
  baseboard: "mdf_white_120mm"

typicalEnvironmentalConditions:
  temperatureRange:
    min: 20
    max: 26
    unit: "C"
  humidityRange:
    min: 30
    max: 60

levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
  - "REQ-FIRE-FLOOR-RATING-REI-60"
---

# Level 02: Typical Residential Floor

Standard residential floor with 8 units.

All rooms on this floor automatically get:
- 2.70m ceiling height (unless overridden)
- Oak floor and painted walls (unless overridden)
- 20-26°C temperature range
- Floor-wide requirements (fire rating, minimum height)

Only rooms that need something different (like bathrooms with ceramic tile) specify overrides.
```

**Benefit:** Instead of specifying ceiling height and finishes in 40 room files, specify once here. Saves 90% of repetition.

---

## Example 3: Complete Level (Full Details)

**File:** `docs/en/examples/green-terrace/levels/level-01.md`

```markdown
---
documentType: "level"
entityType: "level"
id: "LVL-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
levelNumber: 0

elevation: 0.0
elevationUnit: "m"

levelHeight: 3.20
levelHeightUnit: "m"

grossFloorArea: 1250
areaUnit: "m2"

levelType: "ground"

description: >
  Ground floor with main entrance, lobby, and 8 residential units.
  Includes bike storage and mail room.

ifcMapping:
  ifcEntity: "IfcBuildingStorey"
  globalId: "2L3gI9$sNEyv4XzGv2MPzR"
  objectType: "Ground Floor"

version: "1.0.0"
tags:
  - "ground_floor"
  - "entrance"
  - "residential"
---

# Level 01: Ground Floor

Main entrance level with lobby and residential units.

## Level Details

- **Elevation:** 0.00 m (grade level)
- **Floor-to-floor height:** 3.20 m
- **Gross floor area:** 1,250 m²
- **Units:** 8 residential units

## Spaces on This Level

- **Entrance lobby:** 45 m²
- **Mail room:** 12 m²
- **Bike storage:** 35 m²
- **Residential units:** 8 units (900 m² total)
- **Corridors:** 120 m²
- **Stairwells:** 2 × 15 m² = 30 m²
- **Elevator lobby:** 18 m²

## Vertical Circulation

- **Stairwells:** 2 protected stairwells (fire-rated)
- **Elevators:** 1 elevator serving all floors
- **Access:** Main entrance from street level
```

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "levels": [
      {
        "documentType": "level",
        "entityType": "level",
        "id": "LVL-01",
        "levelName": "Level 01 (Ground)",
        "buildingId": "BLD-01",
        "levelNumber": 0,
        "elevation": 0.0,
        "elevationUnit": "m",
        "levelHeight": 3.20,
        "levelHeightUnit": "m",
        "grossFloorArea": 1250,
        "areaUnit": "m2",
        "levelType": "ground",
        "description": "Ground floor with main entrance, lobby, and 8 residential units. Includes bike storage and mail room.",
        "spaceIds": [
          "SP-BLD-01-L01-001",
          "SP-BLD-01-L01-002",
          "SP-BLD-01-L01-003",
          "SP-BLD-01-L01-LOBBY",
          "SP-BLD-01-L01-MAIL",
          "SP-BLD-01-L01-BIKE",
          "SP-BLD-01-L01-CORR"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcBuildingStorey",
          "globalId": "2L3gI9$sNEyv4XzGv2MPzR",
          "objectType": "Ground Floor"
        },
        "version": "1.0.0",
        "tags": ["ground_floor", "entrance", "residential"]
      }
    ]
  }
}
```

## Reverse Relationships

The compiler **auto-computes** `level.spaceIds` from space references:

**Input:** Spaces reference levels
```yaml
# bedroom-01.md
levelId: "LVL-01"

# bedroom-02.md
levelId: "LVL-01"

# lobby.md
levelId: "LVL-01"
```

**Output:** Level automatically contains space list
```json
{
  "id": "LVL-01",
  "spaceIds": [
    "SP-BLD-01-L01-001",  // bedroom-01
    "SP-BLD-01-L01-002",  // bedroom-02
    "SP-BLD-01-L01-LOBBY" // lobby
  ]
}
```

## Level Numbering Convention

Recommended level numbering:

| Level Number | Level Name | Typical Use |
|--------------|------------|-------------|
| `-2` | Basement 02 | Deep parking, mechanical |
| `-1` | Basement 01 | Parking, storage |
| `0` | Ground | Entrance, lobby, retail |
| `1` | Level 01 | First floor above ground |
| `2` | Level 02 | Second floor |
| `...` | ... | Typical floors |
| `ROOF` | Roof | Rooftop access, mechanical |

**Note:** Ground level numbering varies by region:
- **Europe:** Ground = 0, first floor = 1
- **North America:** Ground = 1, first floor = 1

## BIM Mapping

Levels map to **IfcBuildingStorey** entities and Revit Levels:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Level.SBM_ID` |
| `levelName` | `Name` | `Name` |
| `elevation` | `Elevation` | `Elevation` |
| `levelHeight` | `Height` | `Pset_BuildingStoreyCommon.NominalHeight` |
| `grossFloorArea` | `Gross Area` | `Pset_BuildingStoreyCommon.GrossFloorArea` |
| `levelNumber` | `SBM_Level_Number` | `Pset_SBM_Level.LevelNumber` |
| `spaceIds` | `SBM_Space_IDs` | `Pset_SBM_Level.SpaceIDs` |

## Elevation Reference

All elevations are relative to a project base point:

```yaml
# Building establishes base point
building:
  id: "BLD-01"
  location:
    elevation: 100  # meters above sea level

# Levels are relative to building base
level:
  id: "LVL-01"
  elevation: 0.0  # ground level = 100m ASL

level:
  id: "LVL-02"
  elevation: 3.20  # 103.20m ASL

level:
  id: "LVL-B01"
  elevation: -3.50  # basement = 96.50m ASL
```

## Floor-to-Floor Height

**Level height** = distance from this level to level above:

```yaml
LVL-01:
  elevation: 0.0
  levelHeight: 3.20  # 3.20m to LVL-02

LVL-02:
  elevation: 3.20
  levelHeight: 3.00  # 3.00m to LVL-03

LVL-03:
  elevation: 6.20
  levelHeight: 3.00  # 3.00m to LVL-04
```

This differs from **clear room height** (space.designHeight):

```yaml
# Space on LVL-02
SP-BLD-01-L02-001:
  levelId: "LVL-02"
  designHeight: 2.70  # clear height (ceiling to floor)

# Level
LVL-02:
  levelHeight: 3.00  # floor-to-floor height

# Difference: 3.00 - 2.70 = 0.30m (structural depth + finishes)
```

## Area Calculations

Level gross floor area should match sum of space areas:

```javascript
// Validation check during compilation
const levelArea = level.grossFloorArea;
const spacesOnLevel = spaces.filter(s => s.levelId === level.id);
const sumSpaceAreas = spacesOnLevel.reduce((sum, s) => sum + s.designArea, 0);

if (Math.abs(levelArea - sumSpaceAreas) > tolerance) {
  warnings.push(`Level ${level.id} area mismatch: ${levelArea} vs ${sumSpaceAreas}`);
}
```

## Compliance Checking

Level-specific requirements (fire rating, floor loading):

```json
{
  "levelComplianceDetails": [
    {
      "requirementId": "REQ-FIRE-FLOOR-RATING",
      "levelId": "LVL-01",
      "levelName": "Level 01 (Ground)",
      "metric": "floor_fire_rating",
      "targetValue": "REI 60",
      "measuredValue": "REI 90",
      "operator": ">=",
      "status": "compliant"
    }
  ]
}
```

## Typical vs Custom Levels

**Typical levels** share common characteristics:

```yaml
# Create template for typical residential levels
typical_residential_level:
  levelHeight: 3.00
  levelHeightUnit: "m"
  levelType: "typical"
  grossFloorArea: 1200
  areaUnit: "m2"

# Apply to multiple levels
LVL-02:
  <<: *typical_residential_level
  levelName: "Level 02"
  elevation: 3.20

LVL-03:
  <<: *typical_residential_level
  levelName: "Level 03"
  elevation: 6.20
```

**Custom levels** have unique properties:

```yaml
LVL-ROOF:
  levelName: "Roof"
  levelType: "roof"
  elevation: 12.20
  levelHeight: 2.50
  description: "Mechanical penthouse and rooftop access"
```

## Inheritance Provenance (v0.2.0)

**NEW in v0.2.0:** When the compiler resolves inherited values from level to space, it annotates the compiled output with provenance tracking.

### How Inheritance Provenance Works

When a space inherits `typicalCeilingHeight` from its level, the compiled output records exactly where the value came from:

```yaml
# Compiled output for Space 3.25 (patient room)
designHeight: 3.00
designHeight_meta:
  confidence: specified
  resolution: inherited
  inheritedFrom: "LVL-KPCPULM-D-PIETRO-02"
  inheritedField: "typicalCeilingHeight"
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.4"
```

The `resolution` field tells you how the value was obtained:

| Resolution | Meaning |
|-----------|---------|
| `explicit` | Value set directly on the space |
| `inherited` | Value came from this level's `typical*` fields |
| `type_default` | Value came from the space's Space Type template |
| `merged` | Requirements merged from multiple sources |

### Level-Level Provenance

Level properties themselves should carry `_meta` annotations:

```yaml
typicalCeilingHeight: 3.00
typicalCeilingHeight_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.4 -- II piętro, sale chorych"
```

When a space inherits this value, the source reference chains through: you can trace `Space.designHeight` -> `Level.typicalCeilingHeight` -> source document section.

### Duplication Detection

The compiler detects when a space explicitly sets a value that matches what it would inherit:

```
WARNING: designHeight on SPC-xxx (3.00m) matches inherited value from LVL-xxx.
Consider removing to use inheritance and reduce duplication.
```

### Requirement Merge Provenance

When requirements are merged from level + space type + space, the compiled output tracks all sources:

```yaml
requirements: ["REQ-HEIGHT-MIN", "REQ-FIRE-RATING", "REQ-DAYLIGHT"]
requirements_meta:
  confidence: specified
  resolution: merged
  mergedFrom:
    - entityId: "LVL-02"
      field: "levelRequirements"
    - entityId: "ST-BEDROOM-STANDARD"
      field: "requirements"
    - entityId: "SP-BLD-01-L02-001"
      field: "requirements"
```

For the full provenance guide, see [Data Provenance Guide](/en/guides/data-provenance).

## See Also

- **[Building](/en/documentation/entities/building)** - Levels belong to buildings
- **[Space](/en/documentation/entities/space)** - Spaces belong to levels
- **[Data Provenance Guide](/en/guides/data-provenance)** - Full guide to tracking data sources
- **[Compiler Guide](/en/documentation/compiler/)** - Level-to-IFC mapping
