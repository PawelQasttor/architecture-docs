# Property Inheritance System (SBM v0.1.4)

## Overview

**Version:** 0.1.4
**Date:** 2026-02-23
**Feature:** Hierarchical property inheritance from parent entities (Level → Space)

## Problem Solved

In real architectural projects, most rooms on a floor share common properties:
- Same ceiling height (e.g., 2.70m for all bedrooms)
- Same finishes (oak floor, painted walls)
- Same HVAC settings (20-26°C temperature range)

Previously, architects had to specify these properties **manually in every single room file**, even when 95% of rooms were identical. This caused:
- Massive repetition (ceiling height specified 50 times for 50 rooms)
- Update errors (change ceiling height, miss 3 rooms, compliance fails)
- Tedious documentation work

## Solution: Level → Space Inheritance

Levels can now define **typical properties** that automatically cascade to all spaces on that floor. Similar to OOP class inheritance.

### Inheritable Properties

| Level Property | Inherited by Space | Description |
|----------------|-------------------|-------------|
| `typicalCeilingHeight` | `designHeight` | Default clear ceiling height |
| `typicalFinishes` | `finishes` | Default floor/wall/ceiling finishes |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Default HVAC settings |
| `levelRequirements` | `requirements` | Requirements that apply to all spaces (merged) |

### Inheritance Resolution Order

When the compiler resolves a property for a space:

1. **Explicit value on space** (highest priority) — always wins
2. **Space type template** — if space references a `spaceTypeId`
3. **Level inheritance** — from level's typical properties
4. **No default** — validation warning if required field

## Example Usage

### Before (v0.1.3): Repetitive

```yaml
# bedroom-01.md
---
designHeight: 2.70
finishes:
  floor: "oak_engineered"
  walls: "paint_white"
  ceiling: "paint_white"
---

# bedroom-02.md
---
designHeight: 2.70        # ← REPEATED
finishes:                  # ← REPEATED
  floor: "oak_engineered"  # ← REPEATED
  walls: "paint_white"     # ← REPEATED
  ceiling: "paint_white"   # ← REPEATED
---

# bedroom-03.md
---
designHeight: 2.70        # ← REPEATED
finishes:                  # ← REPEATED
  floor: "oak_engineered"  # ← REPEATED
  # ... 50 more rooms with same properties
```

### After (v0.1.4): DRY

```yaml
# level-02.md (DEFINE ONCE)
---
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "oak_engineered"
  walls: "paint_white"
  ceiling: "paint_white"
---

# bedroom-01.md (INHERITS)
---
levelId: "LVL-02"
# designHeight inherited from level ✓
# finishes inherited from level ✓
---

# bedroom-02.md (INHERITS)
---
levelId: "LVL-02"
# designHeight inherited from level ✓
# finishes inherited from level ✓
---

# bathroom-01.md (OVERRIDE ONLY WHAT'S DIFFERENT)
---
levelId: "LVL-02"
designHeight: 2.40          # ← OVERRIDE: dropped ceiling
finishOverrides:
  floor: "ceramic_tile"     # ← OVERRIDE: only floor
  walls: "ceramic_tile"     # ← OVERRIDE: only walls
  # ceiling inherited from level ✓
---
```

**Result:** 50 bedrooms inherit automatically, only 2 bathrooms need overrides. **90% reduction in repetition.**

## Schema Changes

### Level Entity (NEW fields)

```json
{
  "typicalCeilingHeight": {
    "type": "number",
    "description": "Default clear ceiling height for spaces on this level"
  },
  "typicalFinishes": {
    "type": "object",
    "properties": {
      "floor": { "type": "string" },
      "walls": { "type": "string" },
      "ceiling": { "type": "string" },
      "baseboard": { "type": "string" }
    }
  },
  "typicalEnvironmentalConditions": {
    "type": "object",
    "properties": {
      "temperatureRange": { "..." },
      "humidityRange": { "..." },
      "ventilationRate": { "..." }
    }
  },
  "levelRequirements": {
    "type": "array",
    "items": { "type": "string" },
    "description": "Requirements that apply to all spaces on this level"
  }
}
```

### Space Entity (UPDATED descriptions)

```json
{
  "designHeight": {
    "description": "Inheritance: (1) Explicit value (highest), (2) Space type, (3) Level.typicalCeilingHeight, (4) No default"
  },
  "finishOverrides": {
    "description": "Override inherited finishes from space type or level. Only override what's different."
  },
  "environmentalConditions": {
    "description": "Inheritance: (1) Explicit value, (2) Space type, (3) Level.typicalEnvironmentalConditions"
  },
  "requirements": {
    "description": "Merged from: (1) Space type, (2) Level.levelRequirements, (3) Explicit requirements. All combined (union)."
  }
}
```

## Documentation Updates

### Files Modified

1. **Schema:** `schemas/sbm-schema-v0.1.json`
   - Version bumped to 0.1.4
   - Added 4 inheritable fields to Level
   - Updated inheritance descriptions for Space

2. **Documentation:** `docs/en/documentation/entities/level.md`
   - Added "Property Inheritance" section with examples
   - Updated optional fields table
   - Added inheritance examples (ceiling height, finishes, environmental, requirements)
   - Updated "For Architects" callout to highlight inheritance

3. **This file:** `PROPERTY-INHERITANCE-v0.1.4.md`
   - Summary of changes for reference

## Compiler Implementation Notes

The compiler will need to implement inheritance resolution:

```javascript
function resolveSpaceProperty(space, level, spaceType, propertyName) {
  // 1. Explicit value on space (highest priority)
  if (space[propertyName] !== undefined) {
    return space[propertyName];
  }

  // 2. Space type template
  if (space.spaceTypeId && spaceType && spaceType[propertyName] !== undefined) {
    return spaceType[propertyName];
  }

  // 3. Level inheritance
  const levelPropertyName = getLevelInheritablePropertyName(propertyName);
  if (level[levelPropertyName] !== undefined) {
    return level[levelPropertyName];
  }

  // 4. No default
  return undefined;
}

function getLevelInheritablePropertyName(spacePropertyName) {
  const mapping = {
    'designHeight': 'typicalCeilingHeight',
    'finishes': 'typicalFinishes',
    'environmentalConditions': 'typicalEnvironmentalConditions'
  };
  return mapping[spacePropertyName] || null;
}

// Special case: Requirements are merged, not replaced
function resolveSpaceRequirements(space, level, spaceType) {
  const requirements = new Set();

  // Add from space type
  if (spaceType?.requirements) {
    spaceType.requirements.forEach(r => requirements.add(r));
  }

  // Add from level
  if (level.levelRequirements) {
    level.levelRequirements.forEach(r => requirements.add(r));
  }

  // Add from space
  if (space.requirements) {
    space.requirements.forEach(r => requirements.add(r));
  }

  return Array.from(requirements);
}
```

## Future Extensions

This establishes the pattern for other parent-child relationships:

- **Building → Level:** Building-wide defaults (construction type, fire ratings)
- **Building → all entities:** Global defaults (units, standards)
- **System → Asset Instance:** System-level specifications
- **Parent Space → Child Space:** Bathroom inherits from bedroom

## Benefits

1. **90% reduction in repetition** for typical properties
2. **Consistency guaranteed** across floor
3. **Easy updates** — change once in level, all rooms update
4. **Familiar pattern** — works like OOP class inheritance
5. **Flexible overrides** — rooms can still be different when needed
6. **Backward compatible** — existing files without inheritance still work

## Migration Path

Existing projects work as-is (no breaking changes). To adopt inheritance:

1. Identify repeated properties across spaces on same level
2. Move common values to level's `typical*` fields
3. Remove those properties from spaces
4. Keep overrides in spaces that need different values

Example migration script:
```javascript
// Pseudo-code for migration tool
const roomsOnLevel = spaces.filter(s => s.levelId === 'LVL-02');
const mostCommonCeilingHeight = mode(roomsOnLevel.map(s => s.designHeight));

// Add to level
level.typicalCeilingHeight = mostCommonCeilingHeight;

// Remove from rooms that match
roomsOnLevel.forEach(room => {
  if (room.designHeight === mostCommonCeilingHeight) {
    delete room.designHeight;  // Will inherit from level
  }
});
```

## Status

- [x] Schema updated (v0.1.4)
- [x] English documentation updated (Level entity)
- [x] Polish documentation (Level entity) — COMPLETE
- [x] English documentation (Space entity) — COMPLETE
- [x] Polish documentation (Space entity) — COMPLETE
- [x] Example files updated — COMPLETE
  - [x] Level 01: Added inheritable properties (typicalCeilingHeight, typicalFinishes, typicalEnvironmentalConditions, levelRequirements)
  - [x] Bedroom 01: Removed explicit designHeight, added inheritance comments
  - [x] Bedroom 02: Removed explicit designHeight, added inheritance comments
  - [x] Corridor: Removed explicit designHeight, added finishOverrides example (tile floor override)
- [ ] Compiler implementation — pending
- [ ] Migration guide — pending

## See Also

- Schema: `schemas/sbm-schema-v0.1.json`
- Level docs: `docs/en/documentation/entities/level.md`
- Space docs: `docs/en/documentation/entities/space.md`
