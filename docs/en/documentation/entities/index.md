# Document Types: What Files Do You Need?

## The Question You're Asking

"I want to document my building project. What files do I create?"

This page answers that. There are **14 types of files** you can create. Each type describes a different aspect of your building.

::: tip You Don't Need All 14 Types
Most projects start with 3-4 types:
- **Spaces** (rooms)
- **Zones** (fire zones, acoustic zones)
- **Requirements** (regulations like minimum ceiling height)
- **Building** (project metadata)

That's enough to get started. Add other types when you need them.
:::

---

## The 14 Document Types (Organized By What They Describe)

### **Describing Spaces (Where People Are)**

| Type | When You Use It | Example File |
|------|----------------|--------------|
| **[Site](/en/documentation/entities/site)** | The land parcel / plot | `site.md` |
| **[Building](/en/documentation/entities/building)** | The whole building | `buildings/green-terrace.md` |
| **[Level](/en/documentation/entities/level)** | Each floor in your building | `levels/ground-floor.md` |
| **[Space](/en/documentation/entities/space)** | Every room, corridor, area | `spaces/bedroom-01.md` |
| **[Space Type](/en/documentation/entities/space-type)** | Template for similar rooms (e.g., "standard bedroom") | `space-types/standard-bedroom.md` |
| **[Envelope](/en/documentation/entities/envelope)** | Wall, roof, floor slab, curtain wall (construction layers + performance) | `envelopes/external-wall-type-a.md` |
| **[Vertical Circulation](/en/documentation/entities/vertical-circulation)** | Staircase, elevator, ramp, escalator (connecting levels) | `vertical-circulations/staircase-a.md` |

**Start here:** If you're new, begin with **Space** (one file per room). Add **Level** and **Building** when you have multiple floors or buildings. Add **Site** when you need plot constraints. Add **Envelope** when you need to track wall buildups and thermal/fire performance. Add **Vertical Circulation** when you need to document stairs, elevators, and fire escape routes.

---

### **Describing Rules & Groupings**

| Type | When You Use It | Example File |
|------|----------------|--------------|
| **[Zone](/en/documentation/entities/zone)** | Group of rooms sharing a characteristic (fire zone, acoustic zone, HVAC zone) | `zones/fire-zone-zl-iv.md` |
| **[Zone Type](/en/documentation/entities/zone-type)** | Template for zone configurations | `zone-types/fire-zl-iv-standard.md` |
| **[Requirement](/en/documentation/entities/requirement)** | A regulation or rule that must be met | `requirements/height-minimum-250cm.md` |

**When you need zones:** Permit submission (fire zones required), MEP coordination (HVAC zones), acoustic design

---

### **Describing Systems & Equipment**

| Type | When You Use It | Example File |
|------|----------------|--------------|
| **[System](/en/documentation/entities/system)** | A building installation (heating, ventilation, plumbing) | `systems/central-heating.md` |
| **[System Type](/en/documentation/entities/system-type)** | Template for MEP system configurations | `system-types/residential-hvac-mvhr.md` |
| **[Asset](/en/documentation/entities/asset)** | A specific installed piece of equipment | `assets/boiler-hp-01.md` |
| **[Asset Type](/en/documentation/entities/asset-type)** | Product specification (model, performance, maintenance) | `asset-types/vaillant-ecotec-306.md` |

**When you need these:** Construction phase (equipment being installed), handover (facility manager needs asset register)

---

## How Files Connect To Each Other

Files reference each other using IDs. Think of it like hyperlinks between documents:

```
Site (Green Terrace Plot)
  └─ Building (Green Terrace)
      ├─ Envelope (External Wall Type A)  ← separates spaces
      ├─ Vertical Circulation (Staircase A)  ← connects levels
      │    ├─ connects Level (Ground Floor)
      │    └─ connects Level (First Floor)
      └─ Level (Ground Floor)
          └─ Space (Bedroom 01)
              ├─ bounded by Envelope (External Wall Type A)
              ├─ belongs to Zone (Fire Zone ZL-IV)
              ├─ must meet Requirement (height >= 2.50m)
              └─ contains Asset (Radiator RAD-01)
```

**Example:** Bedroom 01's file says "I'm in Fire Zone ZL-IV". The system automatically updates Fire Zone ZL-IV to say "Bedroom 01 is in me". You only write the link once; the reverse link is computed automatically.

---

## Templates vs Actual Things (Type/Instance Pattern)

This is **optional** but very useful if you have many similar rooms.

### The Problem

You have 20 bedrooms. All need:
- Same minimum height (2.50m)
- Same daylight requirement
- Same fire door specification
- Same smoke detector

**Old way:** Write those specs 20 times (once per bedroom file)
**New way:** Write specs once in a **Type** file, reference it from 20 **Instance** files

### The Solution

**Step 1: Create Space Type** (template - define once)

```markdown
File: space-types/standard-bedroom.md
---
id: "ST-BEDROOM-STANDARD-A"
requirements:
  - "REQ-HEIGHT-MIN-250"
  - "REQ-DAYLIGHT-SLEEPING"
  - "REQ-FIRE-DOOR-EI30"
equipment:
  - "Smoke detector"
  - "Radiator"
---

# Space Type: Standard Bedroom A

All residential bedrooms follow this specification.
```

**Step 2: Create 20 Space Instances** (reference the template)

```markdown
File: spaces/bedroom-01.md
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Inherits all specs from template!
designArea: 14.5  # Instance-specific: actual area
levelId: "LVL-01"  # Instance-specific: which floor
---

# Bedroom 01

North-facing bedroom on ground floor.
```

**Result:**
- ✅ Define specs once (in the Type file)
- ✅ Update Type → all 20 bedrooms update automatically
- ✅ **26-33% less documentation** for projects with repeating rooms

**When to use types:** Projects with >5 similar rooms/zones/systems

---

## File Naming (How IDs Work)

Every file needs a unique ID. Here's the pattern:

| Document Type | ID Format | Example |
|--------------|-----------|---------|
| **Site** | `SITE-{descriptor}` | `SITE-GREEN-TERRACE` |
| **Building** | `BLD-{number}` | `BLD-01` |
| **Level** | `LVL-{number}` | `LVL-01` (ground floor) |
| **Envelope** | `ENV-{type}-{number}` | `ENV-EW-01` (external wall 01) |
| **Vertical Circulation** | `VC-{type}-{descriptor}` | `VC-STAIR-A` (staircase A) |
| **Space** | `SP-{building}-{level}-{number}` | `SP-BLD-01-L01-001` |
| **Space Type** | `ST-{descriptor}` | `ST-BEDROOM-STANDARD-A` |
| **Zone** | `ZONE-{type}-{descriptor}` | `ZONE-FIRE-ZL-IV` |
| **Zone Type** | `ZT-{descriptor}` | `ZT-FIRE-ZL-IV` |
| **System** | `SYS-{category}-{number}` | `SYS-HVAC-01` |
| **System Type** | `SYT-{descriptor}` | `SYT-HVAC-RESIDENTIAL-MVHR` |
| **Asset** | `AST-{type}-{number}` | `AST-HP-01` (heat pump 01) |
| **Asset Type** | `AT-{descriptor}` | `AT-VAILLANT-ECOTEC-306` |
| **Requirement** | `REQ-{scope}-{descriptor}-{number}` | `REQ-PL-WT-HEIGHT-001` |

::: tip Why These IDs?
- **Human-readable:** `SP-BLD-01-L01-001` means "Space in Building 01, Level 01, number 001"
- **Sortable:** Files sort logically (all Level 01 spaces group together)
- **Traceable:** You can see building/level/sequence from the ID alone
:::

---

## Fields Every File Has

No matter which type, every file includes these basic fields:

```yaml
---
id: "SP-BLD-01-L01-001"  # Unique identifier
entityType: "space"  # What type of file this is (canonical field)
version: "1.0.0"  # Semantic version (increment when you update)
tags: ["residential", "sleeping"]  # Optional: labels for filtering
---
```

::: info `entityType` is the canonical field
The `entityType` field is the primary identifier for the file type. A legacy `documentType` field may also appear in older files but is deprecated -- the compiler treats `entityType` as authoritative with `documentType` as a fallback.
:::

**Why versions?** Track changes over time. `1.0.0` = initial design, `1.1.0` = minor update, `2.0.0` = major redesign

---

## Your Next Steps

**Choose based on what you want to do:**

| I want to... | Go here |
|-------------|---------|
| **Document all rooms in my project** | [Space documentation](/en/documentation/entities/space) |
| **Set up fire zones for permit** | [Zone documentation](/en/documentation/entities/zone) |
| **Track building regulations** | [Requirement documentation](/en/documentation/entities/requirement) |
| **Document MEP systems** | [System documentation](/en/documentation/entities/system) |
| **Track installed equipment** | [Asset documentation](/en/documentation/entities/asset) |
| **See all 14 types with examples** | Scroll down to see the complete list below |

---

## Complete List of All 14 Document Types

Click any type to see detailed documentation:

### Spatial
1. **[Site](/en/documentation/entities/site)** - Plot/parcel context (area, setbacks, utilities, zoning)
2. **[Building](/en/documentation/entities/building)** - Building-level metadata (name, address, classification)
3. **[Level](/en/documentation/entities/level)** - Floor information (elevation, gross area)
4. **[Space](/en/documentation/entities/space)** - Rooms and functional areas (bedrooms, offices, corridors)
5. **[Space Type](/en/documentation/entities/space-type)** - Templates for repeating room types
6. **[Envelope](/en/documentation/entities/envelope)** - Walls, roofs, slabs, curtain walls (construction layers + performance)
7. **[Vertical Circulation](/en/documentation/entities/vertical-circulation)** - Staircases, elevators, ramps, escalators (connecting levels, egress, accessibility)

### Zoning
8. **[Zone](/en/documentation/entities/zone)** - Functional groupings (fire, acoustic, HVAC, security)
9. **[Zone Type](/en/documentation/entities/zone-type)** - Templates for standard zone configurations

### Technical Systems
10. **[System](/en/documentation/entities/system)** - MEP systems (HVAC, electrical, plumbing)
11. **[System Type](/en/documentation/entities/system-type)** - Templates for standard system configurations
12. **[Asset](/en/documentation/entities/asset)** - Physical equipment (boilers, pumps, sensors)
13. **[Asset Type](/en/documentation/entities/asset-type)** - Product specifications and templates

### Governance
14. **[Requirement](/en/documentation/entities/requirement)** - Performance and regulatory rules (height minimums, fire ratings, daylight)

::: details Supplementary Document Types
In addition to the 13 core entity types, the SBM standard recognizes supplementary document types that are not semantic entities but provide supporting technical information:

- **`element_specification`** -- Legacy detailed construction element documentation (wall buildups, roof assemblies, floor constructions). Since v0.5, the **Envelope** entity type is preferred for walls, roofs, and slabs as it participates in the compiler's entity graph, relationships, cost rollup, and validation pipeline. Existing `element_specification` files can coexist alongside envelope entities.

Supplementary documents use the same Markdown + YAML frontmatter format and can be included alongside entity files in your project folder.
:::

---

## How References Work (Behind The Scenes)

When you write a Space file, you reference other files by ID:

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
buildingId: "BLD-01"  # Which building
levelId: "LVL-01"  # Which floor
zoneIds:  # Which zones
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
requirements:  # Which regulations
  - "REQ-HEIGHT-MIN-250"
---
```

The system automatically computes **reverse relationships**:

- You write: `bedroom-01.md` says "I'm in Zone FIRE-ZL-IV"
- System computes: `fire-zone-zl-iv.md` gets updated to say "Bedroom 01 is in me"

**Result:** You never manually maintain "which spaces are in this zone" — it's computed from the space files.

---

## Data Quality & Provenance (v0.2.0)

**NEW in v0.2.0:** Every field in every entity can carry provenance metadata -- where the data came from, how confident you are, and who verified it.

### Why This Matters

Without provenance, a radiation shielding value of 0.3 mm Pb (from the architect's specification) looks identical to 2.0 mm Pb (guessed by someone who never read the source). The SBM model cannot tell the difference.

### How It Works

For any field `X`, add a companion `X_meta`:

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified        # measured/calculated/specified/estimated/assumed/unknown
  source: "PULM-PW-04.05.11"  # which document
  sourceRef: "sekcja 4.1.2.2"  # where in the document
```

The compiler uses `_meta` to:
- Generate a **quality summary** per entity (how many fields are verified vs. assumed)
- Enforce **phase gates** (no assumed data after Construction Docs phase)
- Track **inheritance provenance** (did this value come from the level, the space type, or was it set explicitly?)

**Learn more:** [Data Provenance Guide](/en/guides/data-provenance)

---

## v0.3.0 Changes

SBM v0.3.0 adds comprehensive support for healthcare, infrastructure, and industrial building types. Here are the 9 changes:

1. **spaceType enum expanded** -- 30 new values for healthcare (operating_room, icu, patient_room, etc.) and infrastructure (server_room, mechanical_room, parking, etc.). See [Space](/en/documentation/entities/space), [Space Type](/en/documentation/entities/space-type).

2. **zoneType enum expanded** -- 5 new values: medical_electrical, radiation_protection, cleanroom, infection_control, pressure_cascade. See [Zone](/en/documentation/entities/zone), [Zone Type](/en/documentation/entities/zone-type).

3. **Structured finishes** -- Finish fields now accept either a simple string OR a structured object with material, fireClass, slipResistance, antimicrobial, cleanability, and more. See [Space Type](/en/documentation/entities/space-type), [Space](/en/documentation/entities/space), [Level](/en/documentation/entities/level).

4. **Environmental conditions expanded** -- 6 new fields: airChangesPerHour, freshAirPercentage, filtrationClass, pressureDifferentialPa, laminarFlow, operatingRoomClass (DIN 1946-4). See [Space](/en/documentation/entities/space), [Space Type](/en/documentation/entities/space-type), [Level](/en/documentation/entities/level).

5. **Requirements flexibility** -- metric, operator, and value are now optional. New `qualitative` requirement type with qualitativeDescription, acceptanceCriteria, and evidenceRequired for non-numeric rules. See [Requirement](/en/documentation/entities/requirement).

6. **Departments** -- New optional `departments` array on the project/building level with id, name, description, levelIds, headOfDepartment, operatingHours, staffCount. See [Building](/en/documentation/entities/building).

7. **Adjacent spaces expanded** -- 9 new relationship values (connects_via_airlock, clean_supply_to, patient_flow_to, etc.) and new optional boundaryType and fireRating fields per adjacency item. See [Space](/en/documentation/entities/space).

8. **Shielding** -- New optional `shielding` object for radiological protection, RF shielding, and acoustic isolation. See [Space](/en/documentation/entities/space), [Space Type](/en/documentation/entities/space-type).

9. **System categories expanded** -- 5 new values: medical_gas, nurse_call, pneumatic_tube, medical_waste, it_network. See [System](/en/documentation/entities/system), [System Type](/en/documentation/entities/system-type).

---

## Common Questions

**"Do I need to create all 14 types?"**
No. Start with 3-4 types (Space, Zone, Requirement, Building). Add Site, Envelope, Vertical Circulation, and others when you need them.

**"What if I have 50 identical bedrooms?"**
Use the Type/Instance pattern. Create 1 Space Type (template), 50 Space instances (actual rooms).

**"Can I add my own custom fields?"**
Yes. The schema is extensible. Add custom fields in a `properties` object.

**"What if I make a mistake in the ID?"**
The validation tool will tell you if you reference an ID that doesn't exist. Fix it before it becomes a problem.

**"How do I know which type to use?"**
Ask: "Am I describing a physical room?" → **Space**
"Am I describing a group of rooms?" → **Zone**
"Am I describing equipment?" → **Asset**
"Am I describing a rule?" → **Requirement**

---

::: tip Ready to Create Your First File?
Go to the [Quick Start](/en/standards/quick-start) to create your first Space file in 5 minutes.

Or browse [Templates](/en/templates/) to copy-paste ready-made examples.
:::
