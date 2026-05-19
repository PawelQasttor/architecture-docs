# Property Inheritance: How Values Flow Through Your Project

::: tip Introduced in SBM v0.1.4
Property inheritance reduces documentation by 40-60% for projects with repeating patterns.
:::

## The Problem This Solves

Without inheritance, you repeat the same values across hundreds of files:

```yaml
# bedroom-01.md
designHeight: 2.70
finishes:
  floor: "Oak engineered"
  walls: "Paint white"

# bedroom-02.md
designHeight: 2.70  # ← Repeated
finishes:           # ← Repeated
  floor: "Oak engineered"
  walls: "Paint white"

# ... repeat for 50 bedrooms
```

**Problem**: Update ceiling height → edit 50 files. Miss one → inconsistent data.

**Solution**: Define once at the level, inherit everywhere.

---

## How Inheritance Works

Values **flow down** through the hierarchy:

```
Site (plot-level defaults)
  ↓
Building (building-wide settings)
  ↓
Level (floor-typical values)
  ↓
Space Type (template for similar rooms)
  ↓
Space (specific room instance)
```

### Example: Ceiling Height

```yaml
# levels/level-01.md
typicalCeilingHeight: 2.70  # ← Define once for the floor
```

```yaml
# spaces/bedroom-01.md
# No designHeight specified → inherits 2.70 from level
levelId: "LVL-01"
designArea: 14.5
```

```yaml
# spaces/bathroom-01.md
# Override: bathroom has lower ceiling
levelId: "LVL-01"
designHeight: 2.40  # ← Explicit value takes precedence
designArea: 8.2
```

**Result:**
- Bedroom 01: `designHeight = 2.70` (inherited from level)
- Bathroom 01: `designHeight = 2.40` (explicit override)

---

## Precedence Rules (Who Wins?)

When the same field appears at multiple levels, **the most specific value wins**:

```
Space (explicit) > Space Type (template) > Level (floor-typical) > Building > Site
```

### Precedence Examples

#### Example 1: Ceiling Height Override

```yaml
# levels/level-01.md
typicalCeilingHeight: 2.70

# space-types/standard-bedroom.md
# No height specified → would inherit from level

# spaces/bedroom-double-height.md
spaceTypeId: "ST-STANDARD-BEDROOM"
levelId: "LVL-01"
designHeight: 5.40  # ← Explicit wins over level's 2.70
```

**Effective height**: `5.40m` (Space explicit beats Level typical)

#### Example 2: Three-Level Inheritance

```yaml
# levels/level-02.md
typicalCeilingHeight: 2.70
typicalFinishes:
  walls: "Paint white"

# space-types/operating-room.md
# Inherits ceiling height from level
finishes:
  walls: "Ceramic tile"  # ← Overrides level's "Paint white"

# spaces/operating-room-01.md
spaceTypeId: "ST-OPERATING-ROOM"
levelId: "LVL-02"
designHeight: 3.20  # ← Overrides both type and level
```

**Effective values:**
- `designHeight = 3.20` (Space explicit)
- `finishes.walls = "Ceramic tile"` (Space Type overrides Level)

---

## Inheritable Fields (What Can Flow Down?)

### From Level → Space

| Field | What It Means | Example |
|-------|--------------|---------|
| `typicalCeilingHeight` | Default ceiling height for all spaces on this floor | `2.70` |
| `typicalFinishes` | Standard floor/wall/ceiling materials | `floor: "Oak"` |
| `environmentalConditions` | Temperature, humidity, air changes | `temperature: 21` |

### From Space Type → Space

| Field | What It Means | Example |
|-------|--------------|---------|
| `requirements` | Regulations that apply to this type | `["REQ-HEIGHT-MIN"]` |
| `finishes` | Standard finishes for this room type | `walls: "Paint"` |
| `occupancyProfile` | Typical occupancy pattern | `maxOccupants: 2` |
| `equipment` | Standard equipment list | `["Smoke detector"]` |

### From Building → Level/Space

| Field | What It Means | Example |
|-------|--------------|---------|
| `unit` | Measurement unit for the project | `"m"` |
| `lifecycle.phase` | Current project phase | `"schematic"` |

---

## Array Fields: Merging vs Replacing

### Arrays **Merge** (Requirements, Tags, Equipment)

```yaml
# space-types/bedroom.md
requirements:
  - "REQ-HEIGHT-MIN-250"
  - "REQ-DAYLIGHT-SLEEPING"

# spaces/bedroom-accessible.md
spaceTypeId: "ST-BEDROOM"
requirements:
  - "REQ-ACCESSIBILITY-WHEELCHAIR"  # ← Adds to type's requirements
```

**Effective requirements:**
```yaml
requirements:
  - "REQ-HEIGHT-MIN-250"        # From type
  - "REQ-DAYLIGHT-SLEEPING"     # From type
  - "REQ-ACCESSIBILITY-WHEELCHAIR"  # From instance
```

Arrays **concatenate** — instance adds to type, doesn't replace.

### Objects **Replace** (Finishes, Environmental Conditions)

```yaml
# levels/level-01.md
typicalFinishes:
  floor: "Oak"
  walls: "Paint white"
  ceiling: "Smooth plaster"

# spaces/bathroom-01.md
levelId: "LVL-01"
finishes:
  floor: "Ceramic tile"  # ← Replaces entire finishes object
  walls: "Ceramic tile"
```

**Effective finishes:**
```yaml
finishes:
  floor: "Ceramic tile"
  walls: "Ceramic tile"
  # ceiling is NOT inherited — entire object replaced
```

::: warning Objects Replace, Not Merge
When you specify `finishes` at the space level, it **replaces** the level's `typicalFinishes` entirely. To keep some inherited values, repeat them explicitly.
:::

---

## How to Check Effective Values (Compiler Output)

The compiler annotates inherited values with provenance:

```json
{
  "id": "SP-BLD-01-L01-001",
  "spaceName": "Bedroom 01",
  "designHeight": 2.70,
  "designHeight_meta": {
    "provenance": "inherited_from_level",  // ← Shows inheritance source
    "sourceId": "LVL-01",
    "sourceField": "typicalCeilingHeight"
  }
}
```

### Reading Provenance

| Provenance Value | Meaning |
|------------------|---------|
| `explicit` | Value set directly in this entity file |
| `inherited_from_level` | Value came from Level's `typical*` field |
| `inherited_from_type` | Value came from Space/Zone/System Type |
| `inherited_from_building` | Value came from Building defaults |
| `default` | Compiler-provided default (e.g., `unit: "m"`) |

---

## Common Patterns

### Pattern 1: Typical Floor with Exceptions

```yaml
# levels/level-01.md
levelName: "Level 01"
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Oak engineered"
  walls: "Paint white"
```

```yaml
# spaces/bedroom-01.md (90% of rooms)
levelId: "LVL-01"
designArea: 14.5
# Inherits height and finishes
```

```yaml
# spaces/bathroom-01.md (exceptions)
levelId: "LVL-01"
designHeight: 2.40  # Lower ceiling
designArea: 6.8
finishes:
  floor: "Ceramic tile"  # Different finishes
  walls: "Ceramic tile"
```

**Result**: 45 rooms inherit defaults, 5 rooms override.

### Pattern 2: Space Types for Repeating Rooms

```yaml
# space-types/standard-bedroom.md
id: "ST-BEDROOM-STANDARD"
requirements:
  - "REQ-HEIGHT-MIN-250"
  - "REQ-DAYLIGHT-SLEEPING"
  - "REQ-ACOUSTIC-CLASS-B"
equipment:
  - "Smoke detector"
  - "Radiator"
```

```yaml
# spaces/bedroom-01.md
spaceTypeId: "ST-BEDROOM-STANDARD"  # ← Inherits all requirements, equipment
levelId: "LVL-01"  # ← Inherits ceiling height, finishes
designArea: 14.5  # ← Instance-specific
```

**Effective values:**
- `requirements`: 3 from type
- `equipment`: 2 from type
- `designHeight`: inherited from level
- `finishes`: inherited from level
- `designArea`: explicit

### Pattern 3: Building-Wide Settings

```yaml
# buildings/building-01.md
unit: "m"  # All measurements in meters
lifecycle:
  phase: "schematic"
defaultAccessibilityLevel: "barrier_free"
```

All spaces, levels, systems inherit `unit`, `lifecycle.phase`, and `defaultAccessibilityLevel`.

---

## Debugging Inheritance Issues

### Problem: "My space isn't inheriting ceiling height"

**Checklist:**
1. ✅ Does the space specify `levelId`?
2. ✅ Does the level file exist with that ID?
3. ✅ Does the level define `typicalCeilingHeight`?
4. ✅ Does the space have an explicit `designHeight` that overrides it?

**How to check:**
```bash
# Run compiler with verbose output
npm run compile -- --verbose

# Look for inheritance warnings
```

### Problem: "Space has wrong finishes"

**Likely cause:** You specified `finishes` at the space level, which **replaces** the entire object from the level.

**Solution:**
```yaml
# Don't do this (replaces all finishes):
finishes:
  floor: "Tile"

# Do this (keep inherited walls/ceiling):
finishes:
  floor: "Tile"
  walls: "Paint white"  # ← Repeat from level
  ceiling: "Smooth plaster"  # ← Repeat from level
```

### Problem: "Requirements not merging"

Requirements **should** merge. If they're not:
- Check that both type and instance use `requirements` (array), not `requirement` (typo)
- Run compiler validation — it will report schema errors

---

## Visual Summary

```
┌─────────────────────────────────┐
│ Site Defaults                   │  (Rarely used)
│ • Plot-level settings           │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│ Building Defaults               │
│ • unit: "m"                     │  ← Inherited by all below
│ • lifecycle.phase               │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│ Level                           │
│ • typicalCeilingHeight: 2.70    │  ← Inherited by spaces on this floor
│ • typicalFinishes               │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│ Space Type (Template)           │
│ • requirements (merge)          │  ← Inherited by all instances of this type
│ • equipment (merge)             │
│ • finishes (replace if set)     │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│ Space (Instance)                │
│ • Explicit values WIN           │  ← Most specific
│ • Arrays MERGE with type        │
│ • Objects REPLACE from type     │
└─────────────────────────────────┘
```

---

## When to Use Inheritance

| Scenario | Use Inheritance? | How? |
|----------|------------------|------|
| **50 identical bedrooms** | ✅ Yes | Space Type with requirements, equipment → 50 lightweight instances |
| **One floor, typical ceiling** | ✅ Yes | Level `typicalCeilingHeight` → all spaces inherit |
| **Unique rooms (kitchen, gym, lobby)** | ❌ No | Each space fully specified, no type |
| **Healthcare: 20 patient rooms** | ✅ Yes | Space Type "Patient Room" → 20 instances |
| **Mixed-use building** | ✅ Partial | Levels have typical values, but many spaces override |

**Rule of thumb:** If you're copy-pasting the same field values 3+ times, use inheritance.

---

## Next Steps

- **[Data Provenance Guide](/en/guides/data-provenance)** — Track where every value came from
- **[Space Type Reference](/en/documentation/entities/space-type)** — Create templates for repeating rooms
- **[Level Reference](/en/documentation/entities/level)** — Define floor-typical values
- **[Compiler Overview](/en/documentation/compiler/)** — How the compiler resolves inheritance

::: tip Best Practice
Start explicit, refactor to inheritance later. Once you've created 5-10 similar spaces, create a Space Type and reference it. Don't over-engineer inheritance on day one.
:::
