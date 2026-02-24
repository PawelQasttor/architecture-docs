# Space Type

A **Space Type** is a reusable template that defines common specifications for similar spaces. Space instances reference a type to inherit requirements, finishes, equipment, and occupancy profiles.

::: tip When to Use
Use Space Types when you have **multiple similar spaces** (e.g., 20 identical bedrooms, 50 office cubicles). Define specifications once in the type, then create lightweight instances that reference it.

**Benefits:**
- ✅ Define requirements, finishes, equipment once
- ✅ Guaranteed consistency across all instances
- ✅ Update one file → affects all instances
- ✅ 26-33% reduction in documentation for repeating elements
:::

## Purpose

Space Types define **template specifications** that apply to all instances:
- Requirements (daylight, acoustic, thermal, regulatory)
- Finishes (floor, walls, ceiling, doors, windows)
- Equipment (safety, climate, electrical fixtures)
- Occupancy profiles (typical usage patterns)
- Area and height guidance

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique type identifier | `"ST-BEDROOM-STANDARD-A"` |
| `entityType` | string | Must be `"space_type"` | `"space_type"` |
| `documentType` | string | Must be `"space_type"` | `"space_type"` |
| `typeName` | string | Human-readable type name | `"Standard Bedroom - Type A"` |
| `spaceType` | string | Functional category (see enum) | `"sleeping_space"` |
| `version` | string | Semantic version | `"1.0.0"` |

## Space Type Enum

The `spaceType` field on a Space Type uses the same enumeration as the Space entity. In v0.3.0, this was expanded with 30 new values for healthcare and infrastructure. See the full list in [Space: Space Types (Enum)](/en/documentation/entities/space#space-types-enum).

## Template Fields

These fields define the **template specifications** inherited by all instances:

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Type description and purpose |
| `requirements` | array | Requirement IDs that apply to ALL instances |
| `finishes` | object | Standard finishes (floor, walls, ceiling, door, window) -- supports structured format (v0.3.0) |
| `equipment` | array | Standard equipment list with specifications |
| `accessibilityLevel` | string | Default accessibility: `standard` / `mobility` / `visual` / `hearing` / `full` |
| `occupancyProfile` | object | Typical occupancy (maxOccupants, bedCount, usagePattern, hours) |
| `environmentalConditions` | object | Temperature, humidity, ventilation, pressurization template -- expanded in v0.3.0 |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `shielding` | object | Radiological, RF, and acoustic shielding requirements (v0.3.0) |
| `typicalArea` | object | Area range guidance (min, max, typical in m²) |
| `typicalHeight` | object | Height range guidance (min, typical in m) |
| `tags` | array | Classification tags |

## Example: Space Type Definition

**File:** `templates/space-types/standard-bedroom-type-a.md`

```markdown
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"
description: "Standard residential bedroom for 1-2 occupants"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# FINISHES (standard for type)
finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Engineered oak flooring"
    thickness: "14mm"
  walls:
    material: "MAT-WALL-PAINT-WHITE"
    description: "Painted gypsum plasterboard"
  ceiling:
    material: "MAT-CEILING-PAINT-WHITE"
  door:
    specification: "DOOR-INT-AC-01"
    size: "830×2050mm"
    soundReduction: "Rw = 38 dB"
  window:
    specification: "WINDOW-TYPE-A"
    size: "1200×1400mm"
    uValue: "0.9 W/(m²·K)"

# EQUIPMENT (standard for type)
equipment:
  - category: "safety"
    description: "Optical smoke detector (ceiling-mounted)"
    quantity: 1
  - category: "climate"
    description: "Room thermostat for underfloor heating"
    quantity: 1
  - category: "ventilation"
    description: "MVHR supply diffuser"
    quantity: 1
  - category: "electrical"
    description: "Double socket outlet (bedside)"
    quantity: 2

# ACCESSIBILITY
accessibilityLevel: "standard"  # Default for this type

# OCCUPANCY PROFILE
occupancyProfile:
  maxOccupants: 2
  bedCount: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# AREA GUIDANCE
typicalArea:
  min: 10.0
  max: 18.0
  typical: 14.0
  unit: "m2"

typicalHeight:
  min: 2.50
  typical: 2.70
  unit: "m"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "standard-type"
---

# Space Type: Standard Bedroom - Type A

## Description

Standard residential bedroom for 1-2 occupants with natural daylight, acoustic privacy, mechanical ventilation, and underfloor heating.

## Design Intent

[Complete design intent, finishes specifications, equipment details...]

## Requirements Summary

[Full requirements documentation...]

## Usage Guidelines

### When to Use This Type
- ✅ Standard bedrooms 10-18 m²
- ✅ North or south-facing orientation
- ✅ Underfloor heating + MVHR ventilation

### When NOT to Use
- ❌ Accessible bedrooms (wheelchair) - create separate type
- ❌ Master bedrooms with en-suite - create separate type
- ❌ Children's bedrooms with special safety requirements
```

## ID Naming Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| `ST-{DESCRIPTOR}` | `ST-BEDROOM-STANDARD-A` | Space type identifier |
| `ST-{FUNCTION}-{VARIANT}` | `ST-OFFICE-OPEN-PLAN` | Function + variant |
| `ST-{FUNCTION}-{SIZE}` | `ST-MEETING-ROOM-SMALL` | Function + size category |

**Guidelines:**
- Use uppercase for consistency
- Descriptive names (avoid codes like ST-001)
- Include variant suffix when multiple types exist (A, B, C)

## Space Type Catalog Examples

| Type ID | Type Name | Purpose | Typical Area |
|---------|-----------|---------|--------------|
| `ST-BEDROOM-STANDARD-A` | Standard Bedroom Type A | Residential bedrooms | 10-18 m² |
| `ST-CORRIDOR-RESIDENTIAL` | Residential Corridor | Apartment corridors | 10-40 m² |
| `ST-BATHROOM-STANDARD` | Standard Bathroom | Residential bathrooms | 4-8 m² |
| `ST-OFFICE-SINGLE` | Single Office | Individual offices | 9-15 m² |
| `ST-OFFICE-OPEN-PLAN` | Open Plan Office | Desk areas | 6-10 m²/person |
| `ST-MEETING-ROOM-SMALL` | Small Meeting Room | 4-6 person meetings | 12-18 m² |
| `ST-CLASSROOM-STANDARD` | Standard Classroom | 20-30 student classrooms | 50-70 m² |

## Compiled Output

When compiled, Space Types are stored separately from instances:

```json
{
  "entities": {
    "space_types": [
      {
        "id": "ST-BEDROOM-STANDARD-A",
        "entityType": "space_type",
        "typeName": "Standard Bedroom - Type A",
        "spaceType": "sleeping_space",
        "requirements": [...],
        "finishes": {...},
        "equipment": [...],
        "occupancyProfile": {...},
        "typicalArea": {...}
      }
    ],
    "spaces": [
      {
        "id": "SP-BLD-01-L01-001",
        "spaceName": "Bedroom 01",
        "spaceTypeId": "ST-BEDROOM-STANDARD-A",
        "designArea": 14.5,
        "levelId": "LVL-01"
        // Compiler merges type specifications here
      }
    ]
  }
}
```

## Compiler Behavior

The compiler **resolves type references** and merges specifications:

1. **Load type definition** from `spaceTypeId`
2. **Merge type specifications** into instance:
   - Requirements: `type.requirements` + `instance.requirementOverrides`
   - Finishes: `type.finishes` + `instance.finishOverrides`
   - Equipment: `type.equipment`
   - Occupancy: `instance.occupancy` || `type.occupancyProfile`
3. **Validate instance** against type constraints:
   - Area within `typicalArea.min` - `typicalArea.max` (warning if outside)
   - Height ≥ `typicalHeight.min`
4. **Output complete space** with all properties flattened

## Validation Rules

| Rule | Check | Severity |
|------|-------|----------|
| Type exists | `spaceTypeId` must reference valid space_type | Error |
| Area range | `designArea` should be within `typicalArea` range | Warning |
| Height minimum | `designHeight` ≥ `typicalHeight.min` | Warning |
| Version compatibility | Instance and type versions should align | Info |
| No conflicts | Instance overrides must not conflict with type constraints | Error |

## Override Mechanisms

Instances can override type specifications when needed:

### Example: Different Flooring

```markdown
---
spaceName: "Bedroom 02 (Accessible)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# Override flooring for wheelchair accessibility
finishOverrides:
  floor:
    material: "MAT-FLOOR-TILE-01"
    description: "Ceramic tile (wheelchair accessible)"
    reason: "Accessibility requirement"

# Additional requirement beyond type
requirementOverrides:
  - "REQ-ACCESSIBILITY-WHEELCHAIR-001"
---
```

The compiler will:
- Use `MAT-FLOOR-TILE-01` instead of `MAT-FLOOR-OAK-01` for floor
- Keep all other finishes from type (walls, ceiling, door, window)
- Add `REQ-ACCESSIBILITY-WHEELCHAIR-001` to the requirements list

## Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| New equipment added | Patch (1.0.0 → 1.0.1) | Add reading light |
| Finish specification changed | Minor (1.0.1 → 1.1.0) | Change door to Rw 40 dB |
| Requirements changed | Minor (1.1.0 → 1.2.0) | Add new requirement |
| Major redesign | Major (1.2.0 → 2.0.0) | Complete type overhaul |

**Instance compatibility:**
- Instances reference type by ID (not version)
- Compiler uses latest version of referenced type
- Breaking changes require new type ID (e.g., `ST-BEDROOM-STANDARD-B`)

## Migration Path

### Existing Projects
1. **Identify repeating patterns** - Find similar spaces
2. **Create type definition** - Extract common specifications
3. **Migrate instances** - Add `spaceTypeId`, remove repeated data
4. **Validate** - Run compiler to verify merge correctness

### Example Migration

**Before:**
```markdown
# bedroom-01.md (210 lines with full specs)
# bedroom-02.md (210 lines with identical specs)
```

**After:**
```markdown
# standard-bedroom-type-a.md (525 lines - ONCE)
# bedroom-01.md (147 lines - instance data only)
# bedroom-02.md (118 lines - instance data only)

Savings: -31% for 2 bedrooms
Savings: -26% for 20 bedrooms
Savings: -33% for 50 bedrooms
```

## Environmental Conditions & Electrical Safety

Space Types can define template environmental conditions and electrical safety classification inherited by all instances:

```yaml
# Healthcare example: ICU Ward type
---
id: "ST-ICU-WARD-STANDARD"
typeName: "ICU Ward - Standard"
spaceType: "healthcare"
accessibilityLevel: "full"
electricalSafetyGroup: "group_2"  # Life-critical medical equipment

environmentalConditions:
  temperatureRange: { min: 20, max: 24, unit: "C" }
  humidityRange: { min: 30, max: 60 }
  ventilationRate: { value: 6, unit: "ACH" }
  pressurization: "positive"

occupancyProfile:
  maxOccupants: 2
  bedCount: 1
---
```

Instances inherit these values and can override them when needed (e.g., an isolation room with negative pressurization).

## Structured Finishes (v0.3.0)

**NEW in v0.3.0:** Finish fields now accept either a simple string (backward compatible) or a structured object with detailed material properties. The structured format is essential for healthcare, cleanroom, and industrial space types.

### Simple Format (backward compatible)

```yaml
finishes:
  floor: "oak_engineered_natural"
  walls: "paint_white_matte"
  ceiling: "paint_white_matte"
```

### Structured Format (v0.3.0)

```yaml
finishes:
  floor:
    material: "seamless vinyl"
    productCode: "Tarkett iQ Granit SD"
    fireClass: "Bfl-s1"
    slipResistance: "R10"
    antimicrobial: true
    esdProtection: true
    chemicalResistance: "hospital-grade disinfectants"
    cleanability: "cleanroom"
    coveBase: true
    seamless: true
  walls:
    material: "HPL panel"
    fireClass: "B-s1,d0"
    antimicrobial: true
    cleanability: "medical"
    seamless: true
  ceiling:
    material: "sealed metal tile"
    fireClass: "A2-s1,d0"
    cleanability: "cleanroom"
```

### Structured Finish Fields

| Field | Type | Description |
|-------|------|-------------|
| `material` | string | Material name (required in structured format) |
| `productCode` | string | Manufacturer product code |
| `fireClass` | string | Fire reaction class (e.g., "Bfl-s1", "A2-s1,d0") |
| `slipResistance` | string | Slip resistance rating (e.g., "R10", "R11") |
| `antimicrobial` | boolean | Whether the finish has antimicrobial properties |
| `esdProtection` | boolean | Whether ESD protection is provided |
| `chemicalResistance` | string | Chemical resistance level |
| `cleanability` | enum | Cleaning regime: `standard` / `medical` / `cleanroom` |
| `coveBase` | boolean | Rounded floor-wall junction required |
| `seamless` | boolean | Finish must be seamless (no joints) |

### Example: Operating Room Type with Structured Finishes

```yaml
---
id: "ST-OR-CLASS-IA"
entityType: "space_type"
documentType: "space_type"
typeName: "Operating Room - DIN 1946-4 Class Ia"
spaceType: "operating_room"
version: "1.0.0"

electricalSafetyGroup: "group_2"

finishes:
  floor:
    material: "seamless conductive vinyl"
    fireClass: "Bfl-s1"
    slipResistance: "R10"
    antimicrobial: true
    esdProtection: true
    cleanability: "cleanroom"
    coveBase: true
    seamless: true
  walls:
    material: "stainless steel / HPL hybrid"
    fireClass: "A2-s1,d0"
    antimicrobial: true
    cleanability: "cleanroom"
    seamless: true
  ceiling:
    material: "sealed laminar flow canopy"
    fireClass: "A2-s1,d0"
    cleanability: "cleanroom"

environmentalConditions:
  temperatureRange: { min: 18, max: 24, unit: "C" }
  humidityRange: { min: 30, max: 60 }
  pressurization: "positive"
  cleanlinessClass: "ISO 7"
  airChangesPerHour: 20
  freshAirPercentage: 100
  filtrationClass: "HEPA H14"
  pressureDifferentialPa: 15
  laminarFlow: true
  operatingRoomClass: "class_ia"

shielding:
  radiological:
    required: false
  rfShielding:
    required: false
  acousticIsolation:
    requiredRw: 50

requirements:
  - "REQ-OR-CLASS-IA-001"
  - "REQ-FIRE-SEPARATION-OR"
  - "REQ-HVAC-OR-LAMINAR"

typicalArea:
  min: 36.0
  max: 55.0
  typical: 42.0
  unit: "m2"

typicalHeight:
  min: 2.80
  typical: 3.00
  unit: "m"
---
```

## Expanded Environmental Conditions (v0.3.0)

Space Types can now define 6 additional environmental condition fields for healthcare and cleanroom applications. These are inherited by all instances:

| Field | Type | Description |
|-------|------|-------------|
| `airChangesPerHour` | number | Total ACH (per ASHRAE 170 for healthcare) |
| `freshAirPercentage` | number (0-100) | Minimum % outside air. 100 = no recirculation |
| `filtrationClass` | string | Air filtration class (e.g., "HEPA H14") |
| `pressureDifferentialPa` | number | Pressure difference in Pa vs. corridor |
| `laminarFlow` | boolean | Whether unidirectional airflow is required |
| `operatingRoomClass` | enum | DIN 1946-4: `class_ia` / `class_ib` / `class_ii` / `not_applicable` |

See [Space: Environmental Conditions](/en/documentation/entities/space#environmental-conditions) for the full reference and typical values by space type.

## Shielding (v0.3.0)

Space Types can define shielding requirements inherited by all instances. This covers radiological protection, RF shielding, and acoustic isolation.

```yaml
# Diagnostic imaging room type
shielding:
  radiological:
    required: true
    material: "lead sheet"
    thicknessMm: 2.0
    equivalentPbMm: 2.0
    protectedDirections: ["walls", "floor", "ceiling", "door", "window"]
  rfShielding:
    required: false
  acousticIsolation:
    requiredRw: 45
```

See [Space: Shielding](/en/documentation/entities/space#shielding-v0-3-0) for the full field reference.

## See Also

- **[Space](/en/documentation/entities/space)** - Space instances that reference types
- **[Zone Type](/en/documentation/entities/zone-type)** - Zone templates
- **[System Type](/en/documentation/entities/system-type)** - System templates
- **[Asset Type](/en/documentation/entities/asset-type)** - Asset/product templates
- **[Authoring Guide](/en/documentation/authoring/creating-entities)** - Create type definitions
