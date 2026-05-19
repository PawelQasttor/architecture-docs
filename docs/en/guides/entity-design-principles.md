# Entity Design Principles: When to Split vs Keep Inline

::: tip Core Question
"Should this data be a separate entity file, or stay inline in an existing entity?"
:::

## The Problem

You're documenting a building and wonder:
- Should finishes be a separate entity type, or stay as fields in Space?
- Should occupancy be its own entity, or inline in Space?
- Should equipment be separate (Asset), or just listed in System?

**This guide answers when to split vs keep inline.**

---

## The Three Criteria for Splitting

Create a **new entity** (separate file) when **any** of these apply:

### 1. Multiple Entities Reference It (Reusability)

**Question**: "Do 3+ other entities need to reference the same data?"

✅ **Split** if multiple entities share the same specification.

**Example - Space Types:**
```yaml
# ❌ WITHOUT SPLIT (Repetitive)
# spaces/bedroom-01.md
requirements: ["REQ-HEIGHT-MIN", "REQ-DAYLIGHT"]
finishes: { floor: "Oak", walls: "Paint" }

# spaces/bedroom-02.md
requirements: ["REQ-HEIGHT-MIN", "REQ-DAYLIGHT"]  # ← Repeated
finishes: { floor: "Oak", walls: "Paint" }        # ← Repeated

# ... repeat for 50 bedrooms
```

```yaml
# ✅ WITH SPLIT (Reusable)
# space-types/standard-bedroom.md
id: "ST-BEDROOM-STANDARD"
requirements: ["REQ-HEIGHT-MIN", "REQ-DAYLIGHT"]  # ← Define once
finishes: { floor: "Oak", walls: "Paint" }

# spaces/bedroom-01.md
spaceTypeId: "ST-BEDROOM-STANDARD"  # ← Reference template
designArea: 14.5  # Only instance-specific data

# spaces/bedroom-02.md
spaceTypeId: "ST-BEDROOM-STANDARD"  # ← Reference template
designArea: 15.2
```

**Benefit**: Update 1 Space Type → 50 bedrooms update automatically.

---

### 2. Independent Lifecycle (Versioning)

**Question**: "Does this data change independently from its parent?"

✅ **Split** if it has a separate lifecycle or versioning needs.

**Example - Assets vs inline equipment:**

```yaml
# ❌ INLINE (Tightly coupled)
# systems/sys-hvac-01.md
systemName: "HVAC System"
equipment:
  - name: "Heat Pump HP-01"
    serialNumber: "ABC-12345"
    installationDate: "2024-03-15"
    warranty: "5 years"
    maintenanceSchedule: "Annual checkup"
```

**Problem**: If heat pump needs servicing, you edit the system file. If heat pump is replaced, you lose history. Can't track equipment independently.

```yaml
# ✅ SPLIT (Independent lifecycle)
# assets/ai-hp-01.md
id: "AST-HP-01"
assetName: "Heat Pump HP-01"
serialNumber: "ABC-12345"
installationDate: "2024-03-15"
replacementDate: "2029-03-20"  # ← Equipment has its own history
systemId: "SYS-HVAC-01"
version: "2.0.0"  # ← Equipment can version independently
```

**Benefit**: Track equipment lifecycle separately from system. Replace asset → system reference updates, history preserved.

---

### 3. Complex Relationships (Graph Node)

**Question**: "Does this data connect multiple other entities?"

✅ **Split** if it's a hub connecting many relationships.

**Example - Zones:**

```yaml
# ❌ INLINE (Hard to query)
# spaces/bedroom-01.md
fireZone: "ZL-IV"
hvacZone: "North Zone"
acousticZone: "Night Zone"

# spaces/bedroom-02.md
fireZone: "ZL-IV"
hvacZone: "North Zone"
acousticZone: "Night Zone"
```

**Problem**: Inspector asks "Which rooms are in Fire Zone ZL-IV?" → You grep 50 space files. No single source of truth.

```yaml
# ✅ SPLIT (Central hub)
# zones/fire-zone-zl-iv.md
id: "ZONE-FIRE-ZL-IV"
zoneName: "Fire Zone ZL-IV"
spaceIds: [...]  # ← Auto-computed from spaces referencing this zone

# spaces/bedroom-01.md
zoneIds: ["ZONE-FIRE-ZL-IV"]  # ← Forward reference

# spaces/bedroom-02.md
zoneIds: ["ZONE-FIRE-ZL-IV"]  # ← Forward reference
```

**Benefit**: Zone file is central source of truth. Compiler auto-computes `spaceIds`. Query: "Open zone file → see all rooms."

---

## Keep Inline When None Apply

**Keep inline** (as fields in parent entity) when:
- ❌ Only 1-2 entities use this data
- ❌ Lifecycle is coupled to parent (changes together)
- ❌ No complex relationships (simple parent-child)

**Example - Space finishes (when NOT repeating):**

```yaml
# ✅ INLINE (Unique finishes, not reused)
# spaces/lobby.md
finishes:
  floor: "Marble tile"         # ← Unique to this lobby
  walls: "Polished concrete"   # ← Won't be reused elsewhere
  ceiling: "Exposed structure"
```

No need for `FinishSpecification` entity — these finishes are unique to the lobby.

---

## Real-World Decision Examples

### Case 1: Occupancy Data

**Scenario**: You want to track max occupants, usage patterns, and schedules.

**Analysis**:
- Multiple entities? **No** — only the space has occupancy data
- Independent lifecycle? **No** — occupancy changes with space function
- Complex relationships? **No** — simple property of space

**Decision**: ✅ **Keep inline** as `occupancyProfile` field in Space

```yaml
# spaces/meeting-room.md
occupancyProfile:
  maxOccupants: 12
  usagePattern: "office_meeting"
  operatingHours: "8:00-18:00"
```

---

### Case 2: Door Specifications

**Scenario**: You have 50 doors, 10 of which are the same fire door model.

**Analysis**:
- Multiple entities? **Yes** — 10 doors share the same spec
- Independent lifecycle? **Yes** — doors can be replaced independently
- Complex relationships? **No** — but reusability wins

**Decision**: ✅ **Split** into Opening Type (template) + Opening (instance)

```yaml
# opening-types/fire-door-ei30.md
id: "OT-FIRE-DOOR-EI30"
typeName: "Fire Door EI30"
manufacturer: "Acme Doors"
model: "FD-300"
fireRating: "EI30"
uValue: 1.8

# openings/door-stair-01.md (instance 1)
id: "OPN-DOOR-STAIR-01"
openingTypeId: "OT-FIRE-DOOR-EI30"  # ← References template
width: 0.9
height: 2.1

# openings/door-stair-02.md (instance 2)
openingTypeId: "OT-FIRE-DOOR-EI30"  # ← References same template
width: 0.9
height: 2.1
```

---

### Case 3: Room Numbers

**Scenario**: Each space has a room number (e.g., "1.01", "1.02").

**Analysis**:
- Multiple entities? **No** — each room has unique number
- Independent lifecycle? **No** — room number changes with space
- Complex relationships? **No** — simple property

**Decision**: ✅ **Keep inline** as `roomNumber` field in Space

```yaml
# spaces/bedroom-01.md
roomNumber: "1.01"
spaceName: "Bedroom 01"
```

---

### Case 4: Maintenance Schedules

**Scenario**: Assets need maintenance schedules (annual servicing, filter changes).

**Analysis**:
- Multiple entities? **Partial** — some assets share schedules (e.g., all HVAC filters)
- Independent lifecycle? **Yes** — schedules can change without changing asset
- Complex relationships? **No**

**Decision**: 🤔 **Hybrid approach** — use Asset Type for shared schedules, instance-specific overrides inline

```yaml
# asset-types/mvhr-unit-standard.md (template)
maintenanceSchedule:
  - interval: "6 months"
    task: "Replace filters"
  - interval: "Annual"
    task: "Inspect heat exchanger"

# assets/mvhr-01.md (instance with override)
assetTypeId: "AT-MVHR-STANDARD"
maintenanceSchedule:  # ← Overrides template for THIS unit
  - interval: "3 months"  # More frequent for high-traffic area
    task: "Replace filters"
```

---

### Case 5: Environmental Conditions

**Scenario**: Operating rooms need 19-26°C, 45-60% RH, 15 air changes/hour.

**Analysis**:
- Multiple entities? **Partial** — some space types share same conditions
- Independent lifecycle? **No** — conditions tied to space function
- Complex relationships? **No**

**Decision**: ✅ **Keep inline** at Space Type level (inherited by instances)

```yaml
# space-types/operating-room-standard.md
environmentalConditions:
  temperature: { min: 19, max: 26, unit: "°C" }
  relativeHumidity: { min: 45, max: 60, unit: "%" }
  airChangesPerHour: 15
  pressureDifferentialPa: 10

# spaces/operating-room-01.md
spaceTypeId: "ST-OPERATING-ROOM-STANDARD"  # ← Inherits conditions
```

---

## Common Anti-Patterns

### ❌ Anti-Pattern 1: Over-Splitting (Too Many Entity Types)

**Symptom**: Creating entity types for everything.

**Example**: `FinishSpecification` entity for floor/wall/ceiling finishes

```yaml
# ❌ OVER-ENGINEERED
# finish-specifications/lobby-finishes.md
id: "FINISH-LOBBY-01"
floor: "Marble tile"
walls: "Polished concrete"

# spaces/lobby.md
finishSpecificationId: "FINISH-LOBBY-01"
```

**Problem**: Extra file with no reuse or complex relationships → unnecessary complexity.

**Fix**: Keep inline unless 3+ spaces share the same finishes.

---

### ❌ Anti-Pattern 2: Under-Splitting (Mega-Entities)

**Symptom**: One giant entity file with hundreds of lines.

**Example**: Storing all equipment inline in system file

```yaml
# ❌ MEGA-ENTITY
# systems/sys-hvac-01.md (500 lines)
equipment:
  - { name: "HP-01", serial: "...", install: "...", warranty: "..." }
  - { name: "MVHR-01", serial: "...", install: "...", warranty: "..." }
  - { name: "UFH-01", serial: "...", install: "...", warranty: "..." }
  # ... 20 more equipment items
```

**Problem**: Can't track equipment independently. Can't version equipment separately. Hard to maintain.

**Fix**: Split into Asset entities (one file per equipment).

---

### ❌ Anti-Pattern 3: Circular References

**Symptom**: Creating entities that reference each other in circles.

**Example**:
```yaml
# spaces/room-01.md
adjacentSpaces: ["room-02"]

# spaces/room-02.md
adjacentSpaces: ["room-01"]  # ← Circular!
```

**Problem**: Compiler can't resolve order. Maintenance nightmare.

**Fix**: Use unidirectional references. Space → Zone (forward), Zone ← Space (reverse, auto-computed).

---

## Decision Flowchart

```
Is this data used by 3+ entities?
├─ YES → Split into Type (template) + Instance
└─ NO → Does it have independent lifecycle/versioning?
    ├─ YES → Split into separate entity
    └─ NO → Is it a hub connecting many relationships?
        ├─ YES → Split (Zone, System, Building)
        └─ NO → Keep inline in parent entity
```

---

## When to Refactor (From Inline → Split)

**Start inline**. Split later when you hit these thresholds:

| Threshold | Action |
|-----------|--------|
| **3+ entities with identical data** | Extract to Type entity |
| **Data needs independent versioning** | Split into separate entity |
| **Querying "which X contain Y" is hard** | Create hub entity (Zone-like) |
| **File exceeds 200 lines** | Split complex sub-objects into related entities |

**Example refactoring path**:
1. **Day 1**: 3 bedrooms, each with inline `requirements`, `finishes`
2. **Day 5**: 10 bedrooms, copy-pasting same data → **Create Space Type**, migrate to type/instance
3. **Day 10**: Adding equipment inline in 20 spaces → **Extract to Asset entities**

---

## Summary Table

| Scenario | Keep Inline? | Split? | Why |
|----------|-------------|--------|-----|
| Unique room finishes | ✅ Yes | | Not reused |
| 20 identical bedrooms | | ✅ Yes (Space Type) | Reusability |
| Room numbers | ✅ Yes | | Simple property, no reuse |
| Fire zones | | ✅ Yes (Zone) | Complex relationships, reused |
| Equipment (boilers, pumps) | | ✅ Yes (Asset) | Independent lifecycle |
| Operating hours | ✅ Yes | | Coupled to space, not reused |
| Standard door specs | | ✅ Yes (Opening Type) | Reusability |
| One-off custom door | ✅ Yes | | Not reused |

---

## See Also

- **[Quick Reference](/en/documentation/entities/quick-reference)** — All 19 entity types
- **[Property Inheritance](/en/guides/property-inheritance)** — How types inherit to instances
- **[Entity Documentation](/en/documentation/entities/)** — Full reference for each type
- **[Glossary](/en/standards/glossary)** — Type vs Instance pattern explained

::: tip Start Simple, Refactor Later
Don't over-engineer on day one. Start with inline data. Split when you **actually need** reusability, independent lifecycle, or complex relationships. Premature abstraction is worse than duplication.
:::
