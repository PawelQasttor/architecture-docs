# SBM Schema v0.1.1 - Type/Instance Pattern Update

**Release Date:** 2026-02-22
**Version:** 0.1.1 (from 0.1.0)

## Overview

This release adds **type/instance pattern** support to eliminate repetition when documenting similar spaces, systems, zones, and assets.

## What Changed

### New Entity Types (Templates)

Added four new entity type arrays to `entities`:

1. **`space_types`** - Templates for space instances (e.g., "Standard Bedroom Type A")
2. **`zone_types`** - Templates for zone instances (e.g., "Fire Zone ZL-IV Standard")
3. **`system_types`** - Templates for system instances (e.g., "Standard HVAC - Residential")
4. **`asset_types`** - Product specifications for asset instances (e.g., "Bosch HP-300 Heat Pump")

### New Type Definitions

#### `space_type` (ID pattern: `ST-*`)
```json
{
  "id": "ST-BEDROOM-STANDARD-A",
  "typeName": "Standard Bedroom - Type A",
  "spaceType": "sleeping_space",
  "requirements": [...],      // Apply to all instances
  "finishes": {...},          // Standard finishes
  "equipment": [...],         // Standard equipment
  "occupancyProfile": {...},  // Typical occupancy
  "typicalArea": {...},       // Area guidance
  "typicalHeight": {...}      // Height guidance
}
```

#### `zone_type` (ID pattern: `ZT-*`)
```json
{
  "id": "ZT-FIRE-ZL-IV",
  "typeName": "Fire Zone ZL-IV Standard",
  "zoneType": "fire",
  "requirements": [...],   // Apply to all instances
  "properties": {...}      // Type-level properties
}
```

#### `system_type` (ID pattern: `SYT-*`)
```json
{
  "id": "SYT-HVAC-RESIDENTIAL",
  "typeName": "Standard HVAC System - Residential",
  "systemCategory": "hvac",
  "requirements": [...],          // Apply to all instances
  "typicalPerformance": {...},    // Performance characteristics
  "components": [...]             // Standard components
}
```

#### `asset_type` (ID pattern: `AT-*`)
```json
{
  "id": "AT-BOSCH-HP-300",
  "typeName": "Bosch HP-300 Heat Pump",
  "category": "hvac",
  "manufacturer": "Bosch",
  "model": "HP-300",
  "productCode": "12345",
  "specifications": {...},
  "performanceData": {...},
  "maintenanceProfile": {...},   // Standard maintenance
  "requirements": [...],
  "cost": {...}
}
```

### Updated Instance Definitions

All instance types now support optional type references:

#### `space` - Added fields:
- **`spaceTypeId`** (optional) - Reference to space_type
- **`requirementOverrides`** - Additional requirements beyond type
- **`finishOverrides`** - Override specific finishes from type

#### `zone` - Added fields:
- **`zoneTypeId`** (optional) - Reference to zone_type
- **`requirementOverrides`** - Additional requirements beyond type

#### `system` - Added fields:
- **`systemTypeId`** (optional) - Reference to system_type
- **`requirementOverrides`** - Additional requirements beyond type

#### `asset_instance` - Enhanced:
- **`assetTypeId`** (already existed, now fully specified)
- **`installationData`** - Instance-specific installation info
- Distinguished between type-level specs and instance-level data

### Backward Compatibility

✅ **Fully backward compatible** - All existing fields remain valid.

- Instances can still be defined without type references (standalone mode)
- All original fields (`requirements`, `manufacturer`, etc.) still work
- Type references are **optional** - use only when beneficial

## Migration Guide

### Option 1: Keep Existing Files (No Changes Needed)

Your existing space/zone/system/asset files work as-is.

### Option 2: Adopt Type/Instance Pattern

#### Step 1: Create Type Definitions

Create a new directory for types:

```
templates/
  space-types/
    standard-bedroom-type-a.md
  zone-types/
    fire-zone-zl-iv.md
  system-types/
    hvac-residential-standard.md
  asset-types/
    bosch-hp-300.md
```

#### Step 2: Define Your Types

**Example:** `templates/space-types/standard-bedroom-type-a.md`

```yaml
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"

finishes:
  floor: "MAT-FLOOR-OAK-01"
  walls: "MAT-WALL-PAINT-WHITE"
  ceiling: "MAT-CEILING-PAINT-WHITE"

equipment:
  - category: "safety"
    description: "Smoke detector"
    quantity: 1

occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

version: "1.0.0"
---

# Standard Bedroom Type A

[Full specification here...]
```

#### Step 3: Reference Type in Instances

**Example:** `spaces/bedroom-01.md`

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"

# Reference to type (inherits requirements, finishes, equipment)
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# Instance-specific data only
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]

designArea: 14.5
designHeight: 2.70
designVolume: 39.15

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"

version: "1.0.0"
---

# Bedroom 01

Inherits specifications from [Standard Bedroom Type A](../space-types/standard-bedroom-type-a).

**Instance Details:**
- Area: 14.5 m²
- Location: Level 01, North wing
```

## Benefits

### Before (Repetitive)
```
bedroom-01.md: 210 lines (full specs)
bedroom-02.md: 210 lines (full specs, 95% identical)
bedroom-03.md: 210 lines (full specs, 95% identical)
...
bedroom-20.md: 210 lines (full specs, 95% identical)

Total: 4,200 lines
```

### After (DRY)
```
space-types/standard-bedroom-type-a.md: 150 lines (once)
bedroom-01.md: 30 lines (instance data only)
bedroom-02.md: 30 lines (instance data only)
...
bedroom-20.md: 30 lines (instance data only)

Total: 720 lines (83% reduction!)
```

### Maintenance
- **Update requirement:** 1 file vs 20 files
- **Consistency:** Guaranteed identical specs across all instances
- **Flexibility:** Can still override per instance when needed

## Compiler Behavior

The SBM compiler will:

1. **Resolve references:** Load type definitions and merge with instance data
2. **Flatten output:** Generate complete SBM JSON with all properties
3. **Validate:** Ensure instance properties are within type constraints

**Example compilation:**

```javascript
// Input: bedroom-01.md references ST-BEDROOM-STANDARD-A
// Output: Merged object in sbm.json
{
  "id": "SP-BLD-01-L01-001",
  "spaceName": "Bedroom 01",
  "spaceType": "sleeping_space",      // From type
  "designArea": 14.5,                  // From instance
  "requirements": [...],               // From type
  "finishes": {...},                   // From type
  "equipment": [...],                  // From type
  "occupancy": {...}                   // From type
}
```

## Validation Rules

1. **Type exists:** `spaceTypeId` must reference a valid `space_type`
2. **Area range:** Instance `designArea` should be within type's `typicalArea` range (warning if outside)
3. **No conflicts:** Instance overrides must not conflict with type constraints
4. **Version compatibility:** Instance and type versions should align

## Examples

See full examples in:
- `docs/en/examples/green-terrace-type-instance/` (coming soon)
- `templates/examples/type-instance-pattern/` (coming soon)

## Breaking Changes

**None.** This is a fully backward-compatible enhancement.

## Next Steps

1. ✅ Schema updated (this release)
2. ⏳ Update compiler to resolve type references
3. ⏳ Create example space/zone/system/asset types
4. ⏳ Update documentation with type/instance examples
5. ⏳ Create migration tools (optional)

## Questions?

See:
- [Type/Instance Pattern Proposal](./sbm-schema-type-instance-proposal.md)
- [Schema Definition](./sbm-schema-v0.1.json)
- Documentation: `/en/documentation/type-instance-pattern` (coming soon)

---

**Version:** 0.1.1
**Status:** Released
**Date:** 2026-02-22
