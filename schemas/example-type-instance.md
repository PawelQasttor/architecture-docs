# Type/Instance Pattern - Practical Example

This example shows how to refactor the Green Terrace bedrooms using the type/instance pattern.

## Before: Repetitive Approach

### bedroom-01.md (210 lines)
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"

designArea: 14.5
designHeight: 2.70
designVolume: 39.15

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# ... plus 180 lines of finishes, equipment, etc.
---

# Bedroom 01
[Full specifications repeated...]
```

### bedroom-02.md (210 lines)
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"
spaceName: "Bedroom 02"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"

designArea: 12.8  # ← ONLY DIFFERENCE
designHeight: 2.70
designVolume: 34.6

requirements:  # ← SAME AS BEDROOM 01
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:  # ← SAME AS BEDROOM 01
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# ... plus 180 lines of identical finishes, equipment, etc.
---

# Bedroom 02
[Full specifications repeated...]
```

**Problem:** 95% identical content repeated across files!

---

## After: Type/Instance Pattern

### Step 1: Create Type Definition (ONCE)

**File:** `templates/space-types/standard-bedroom-type-a.md`

```yaml
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"
description: "Standard residential bedroom for 1-2 occupants in Green Terrace building"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# FINISHES (standard for this type)
finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Engineered oak flooring, natural finish"
    thickness: "14mm"
    underlay: "3mm impact sound insulation"

  walls:
    material: "MAT-WALL-PAINT-WHITE"
    description: "Painted gypsum plasterboard, white RAL 9010"
    finish: "Matt emulsion"
    fireRating: "A2-s1, d0"

  ceiling:
    material: "MAT-CEILING-PAINT-WHITE"
    description: "Painted gypsum plasterboard, white RAL 9010"
    finish: "Matt emulsion"

  door:
    specification: "DOOR-INT-AC-01"
    size: "830×2050mm"
    soundReduction: "Rw = 38 dB"
    fireRating: "EI 30"

  window:
    specification: "WINDOW-TYPE-A"
    size: "1200×1400mm"
    uValue: "0.9 W/(m²·K)"
    soundReduction: "Rw = 36 dB"

# EQUIPMENT (standard for this type)
equipment:
  - category: "safety"
    description: "Optical smoke detector (ceiling-mounted, mains-powered with battery backup)"
    quantity: 1

  - category: "climate"
    description: "Individual room thermostat for underfloor heating"
    quantity: 1

  - category: "ventilation"
    description: "MVHR supply diffuser (ceiling-mounted, adjustable)"
    quantity: 1

  - category: "electrical"
    description: "Double socket outlet (bedside)"
    quantity: 2

  - category: "electrical"
    description: "Double socket outlet (desk area)"
    quantity: 1

  - category: "electrical"
    description: "Ceiling light fixture"
    quantity: 1

# OCCUPANCY PROFILE (standard for this type)
occupancyProfile:
  maxOccupants: 2
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
  - "green-terrace"
---

# Space Type: Standard Bedroom - Type A

## Description

Standard residential bedroom designed for Green Terrace building. Suitable for 1-2 occupants with natural daylight, acoustic privacy, and mechanical ventilation.

## Design Intent

The bedroom is designed to provide a comfortable and healthy sleeping environment:

- **Daylight & Views:** North or south-facing window provides natural light with views to landscaped areas
- **Acoustic Privacy:** Enhanced acoustic insulation from corridor and adjacent apartments ensures undisturbed sleep
- **Thermal Comfort:** Underfloor heating combined with MVHR maintains comfortable temperatures year-round
- **Air Quality:** Continuous fresh air supply via MVHR system ensures healthy indoor air quality
- **Fire Safety:** Part of protected fire zone ZL-IV with escape route via protected corridor to staircase

## Finishes Specification

[Full details once - applies to ALL bedroom instances...]

## Equipment Specification

[Full details once - applies to ALL bedroom instances...]

## Requirements Summary

[Full details once - applies to ALL bedroom instances...]

## Maintenance & Operations

- **Smoke detector:** Monthly visual check, annual battery replacement
- **Thermostat:** Annual calibration check
- **MVHR diffuser:** 6-month filter replacement (system-level)
- **Window seals:** 5-year inspection

---

**Type Status:** Approved for use in Green Terrace project
**Version:** 1.0.0
**Last Updated:** 2026-02-22
```

### Step 2: Create Lightweight Instances

**File:** `spaces/bedroom-01.md` (35 lines - was 210!)

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"

# REFERENCE TO TYPE (inherits all specs)
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# INSTANCE-SPECIFIC DATA ONLY
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
---

# Space: Bedroom 01

**Type:** [Standard Bedroom - Type A](../space-types/standard-bedroom-type-a)

Inherits all specifications from the space type definition. See type definition for:
- Requirements (6 items)
- Finishes (floor, walls, ceiling, door, window)
- Equipment (smoke detector, thermostat, MVHR, electrical outlets)
- Occupancy profile
- Maintenance procedures

## Instance Details

- **Area:** 14.5 m² (within type range: 10-18 m²)
- **Location:** Building 01, Level 01, North wing
- **Orientation:** North-facing
- **Adjacent Spaces:**
  - East: Bedroom 02 (shared wall, acoustic partition)
  - West: Corridor (acoustic door)

## Instance-Specific Notes

Window provides views to landscaped courtyard. Direct sunlight exposure minimal due to north orientation - ideal for sleeping comfort.
```

**File:** `spaces/bedroom-02.md` (30 lines - was 210!)

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"
spaceName: "Bedroom 02"

# REFERENCE TO SAME TYPE
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# INSTANCE-SPECIFIC DATA ONLY
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

designArea: 12.8   # ← Different area
designHeight: 2.70
designVolume: 34.6
unit: "m"

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxR"

version: "1.0.0"
---

# Space: Bedroom 02

**Type:** [Standard Bedroom - Type A](../space-types/standard-bedroom-type-a)

Inherits all specifications from the space type definition.

## Instance Details

- **Area:** 12.8 m² (within type range: 10-18 m²)
- **Location:** Building 01, Level 01, North wing
- **Adjacent Spaces:**
  - West: Bedroom 01 (shared wall, acoustic partition)
  - East: Corridor (acoustic door)
```

---

## Results

### File Size Comparison

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| Type definition | - | 150 lines | (new) |
| bedroom-01.md | 210 lines | 35 lines | -83% |
| bedroom-02.md | 210 lines | 30 lines | -86% |
| **Total (2 bedrooms)** | **420 lines** | **215 lines** | **-49%** |

### Scaling to 20 Bedrooms

| Approach | Total Lines | Change Requirements | Consistency |
|----------|-------------|---------------------|-------------|
| **Before** | 4,200 lines | Edit 20 files | ⚠️ Can drift |
| **After** | 720 lines | Edit 1 file | ✅ Guaranteed |
| **Savings** | **-83%** | **-95% effort** | **100% sync** |

---

## Advanced: Override Example

Sometimes one bedroom needs a special finish:

**File:** `spaces/bedroom-02.md` (with override)

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"
spaceName: "Bedroom 02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# Instance data...
designArea: 12.8

# OVERRIDE: Different flooring in this room
finishOverrides:
  floor:
    material: "MAT-FLOOR-TILE-01"
    description: "Ceramic tile flooring (accessible unit)"
    reason: "Wheelchair accessibility requirement"

# ADDITIONAL requirement beyond type
requirementOverrides:
  - "REQ-ACCESSIBILITY-WHEELCHAIR-001"

version: "1.0.0"
---

# Bedroom 02 (Accessible Unit)

**Type:** [Standard Bedroom - Type A](../space-types/standard-bedroom-type-a)

Inherits standard bedroom specifications with the following modifications:

## Overrides

- **Flooring:** Ceramic tile instead of oak (wheelchair accessibility)
- **Additional Requirement:** REQ-ACCESSIBILITY-WHEELCHAIR-001

[Rest of instance details...]
```

---

## Compiler Output

When the compiler processes these files, it generates complete SBM JSON:

```json
{
  "entities": {
    "spaces": [
      {
        "id": "SP-BLD-01-L01-001",
        "spaceName": "Bedroom 01",
        "spaceType": "sleeping_space",
        "designArea": 14.5,
        "designHeight": 2.70,

        // FROM TYPE:
        "requirements": [
          "REQ-DAYLIGHT-SLEEPING-001",
          "REQ-ACOUSTIC-SLEEPING-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-VENTILATION-OCCUPIED-001",
          "REQ-FIRE-ZL-IV-001",
          "REQ-PL-WT-ROOM-HEIGHT-001"
        ],
        "finishes": {
          "floor": { "material": "MAT-FLOOR-OAK-01", ... },
          "walls": { "material": "MAT-WALL-PAINT-WHITE", ... }
        },
        "equipment": [...],
        "occupancy": {
          "maxOccupants": 2,
          "usagePattern": "residential_sleeping",
          "hoursPerDay": 8,
          "daysPerWeek": 7
        }
      },
      {
        "id": "SP-BLD-01-L01-002",
        "spaceName": "Bedroom 02",
        "designArea": 12.8,  // Different

        // SAME INHERITED DATA FROM TYPE:
        "requirements": [...],
        "finishes": {...},
        "equipment": [...]
      }
    ]
  }
}
```

---

## Summary

✅ **DRY:** Define once, use many times
✅ **Consistency:** All bedrooms guaranteed identical specs
✅ **Maintenance:** Change requirement in 1 place
✅ **Flexibility:** Can override when needed
✅ **Scalability:** Scales to 100s of similar spaces

**Next:** Apply same pattern to systems, zones, and assets!
