# Level

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

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `spaceIds` | array | Space IDs on this level (auto-computed) |
| `levelNumber` | number | Numeric level index (0 = ground, negative = basement) |
| `levelHeight` | number | Floor-to-floor height |
| `levelHeightUnit` | string | Height unit |
| `grossFloorArea` | number | Total GFA for this level |
| `areaUnit` | string | Area unit |
| `levelType` | string | Level type (see enum below) |
| `description` | string | Detailed description |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

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

## Example: Markdown Source

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

## See Also

- **[Building](/en/documentation/entities/building)** - Levels belong to buildings
- **[Space](/en/documentation/entities/space)** - Spaces belong to levels
- **[Compiler Guide](/en/documentation/compiler/)** - Level-to-IFC mapping
