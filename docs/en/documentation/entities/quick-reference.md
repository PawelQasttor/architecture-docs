# Quick Reference: All 27 Entity Types

::: tip SBM v2.0.0
One-page overview of all entity types. Click any type to see full documentation. New in v2.0: Campus, Space Program, Material Type/Material, Structural System, Issue, Commissioning Test, Circulation Route.
:::

## Spatial Entities (9 types)

### [Site](/en/documentation/entities/site)
**What**: Land parcel/plot
**When**: Plot constraints, utilities, zoning
**ID**: `SITE-{descriptor}` (e.g., `SITE-GREEN-TERRACE`)
**Key Fields**: `siteArea`, `buildingFootprint`, `setbacks`

### [Building](/en/documentation/entities/building)
**What**: The whole building structure
**When**: Building metadata, multi-building projects
**ID**: `BLD-{number}` (e.g., `BLD-01`)
**Key Fields**: `buildingName`, `address`, `grossFloorArea`

### [Level](/en/documentation/entities/level)
**What**: A floor/storey
**When**: Multi-level buildings, typical floor properties
**ID**: `LVL-{number}` (e.g., `LVL-01`)
**Key Fields**: `levelName`, `elevation`, `typicalCeilingHeight`
**🔑 Inherits to**: Spaces (ceiling height, finishes)

### [Space](/en/documentation/entities/space)
**What**: A room or functional area
**When**: Every room in your project
**ID**: `SP-{building}-{level}-{number}` (e.g., `SP-BLD-01-L01-001`)
**Key Fields**: `spaceName`, `designArea`, `designHeight`, `spaceType`, `zoneIds`
**Most Common Entity**: Start here!

### [Space Type](/en/documentation/entities/space-type)
**What**: Template for similar spaces
**When**: 3+ similar rooms (bedrooms, offices, patient rooms)
**ID**: `ST-{descriptor}` (e.g., `ST-BEDROOM-STANDARD-A`)
**Key Fields**: `typeName`, `spaceType`, `requirements`, `finishes`
**🔑 Inherits to**: Spaces (requirements, finishes, equipment)

### [Envelope](/en/documentation/entities/envelope)
**What**: Wall, roof, floor slab, curtain wall assembly
**When**: Thermal/fire/acoustic performance tracking
**ID**: `ENV-{type}-{number}` (e.g., `ENV-EW-01`)
**Key Fields**: `envelopeName`, `uValue`, `fireRating`, `layers`

### [Opening](/en/documentation/entities/opening)
**What**: Specific window, door, or skylight
**When**: Tracking individual fenestration
**ID**: `OPN-{type}-{location}-{number}` (e.g., `OPN-WIN-N-001`)
**Key Fields**: `openingName`, `openingTypeId`, `width`, `height`, `orientation`

### Opening Type
**What**: Template for window/door specs
**When**: Repeating window/door products
**ID**: `OT-{descriptor}` (e.g., `OT-INTERNORM-KF410`)
**Key Fields**: `typeName`, `manufacturer`, `model`, `uValue`, `fireRating`
**🔑 Inherits to**: Openings (thermal performance, fire rating)

### [Vertical Circulation](/en/documentation/entities/vertical-circulation)
**What**: Staircase, elevator, ramp, escalator
**When**: Egress analysis, accessibility, multi-level connections
**ID**: `VC-{type}-{descriptor}` (e.g., `VC-STAIR-A`)
**Key Fields**: `circulationName`, `circulationType`, `levelIds`, `width`, `fireRating`

---

## Zoning & Requirements (4 types)

### [Zone](/en/documentation/entities/zone)
**What**: Group of spaces by functional/regulatory criteria
**When**: Fire zones, HVAC zones, acoustic zones
**ID**: `ZONE-{type}-{descriptor}` (e.g., `ZONE-FIRE-ZL-IV`)
**Key Fields**: `zoneName`, `zoneType`, `spaceIds` (auto-computed)
**Note**: Spaces declare `zoneIds` → Zone gets `spaceIds` automatically

### [Zone Type](/en/documentation/entities/zone-type)
**What**: Template for zone configurations
**When**: Standard zone specs (residential fire zones, cleanrooms)
**ID**: `ZT-{descriptor}` (e.g., `ZT-FIRE-ZL-IV`)
**Key Fields**: `typeName`, `zoneType`, `requirements`
**🔑 Inherits to**: Zones (requirements, properties)

### [Requirement](/en/documentation/entities/requirement)
**What**: Performance/regulatory rule to satisfy
**When**: Compliance tracking (height, daylight, fire rating)
**ID**: `REQ-{scope}-{descriptor}-{number}` (e.g., `REQ-PL-WT-HEIGHT-001`)
**Key Fields**: `requirementName`, `requirementType`, `metric/operator/value` (numeric) OR `qualitativeDescription` (qualitative)
**⚠️ Choose ONE**: Numeric XOR qualitative, never both

### Site Feature Type
**What**: Template for site element specs
**When**: Standard landscape/paving specifications
**ID**: `SFT-{descriptor}` (e.g., `SFT-PERMEABLE-PAVING`)
**Key Fields**: `typeName`, `materials`, `maintenance`
**🔑 Inherits to**: Site Features (materials, performance)

---

## Systems & Equipment (4 types)

### [System](/en/documentation/entities/system)
**What**: Building installation (HVAC, electrical, plumbing)
**When**: MEP coordination, facilities management
**ID**: `SYS-{category}-{number}` (e.g., `SYS-HVAC-01`)
**Key Fields**: `systemName`, `systemCategory`, `servedZoneIds`, `capacity`, `cost`
**Hierarchy**: Can have `parentSystemId` (subsystems roll up costs)

### [System Type](/en/documentation/entities/system-type)
**What**: Template for MEP system configurations
**When**: Standard system specs (residential HVAC, hospital medical gas)
**ID**: `SYT-{descriptor}` (e.g., `SYT-HVAC-RESIDENTIAL-MVHR`)
**Key Fields**: `typeName`, `systemCategory`, `capacity`, `efficiency`
**🔑 Inherits to**: Systems (capacity, efficiency, maintenance)

### [Asset](/en/documentation/entities/asset)
**What**: Specific installed equipment
**When**: Equipment tracking, maintenance, warranties
**ID**: `AST-{type}-{number}` (e.g., `AST-HP-01`)
**Key Fields**: `assetName`, `assetTypeId`, `serialNumber`, `installationDate`, `systemId`

### [Asset Type](/en/documentation/entities/asset-type)
**What**: Product specification template
**When**: Manufacturer/model specs (boilers, heat pumps, fixtures)
**ID**: `AT-{descriptor}` (e.g., `AT-VAILLANT-ECOTEC-306`)
**Key Fields**: `typeName`, `manufacturer`, `model`, `capacity`, `maintenanceSchedule`
**🔑 Inherits to**: Assets (capacity, maintenance schedule)

---

## Site & Construction (2 types)

### [Site Feature](/en/documentation/entities/site-feature)
**What**: Landscape element, parking, green infrastructure
**When**: Gardens, paving, parking lots, green roofs
**ID**: `SF-{descriptor}` (e.g., `SF-NORTH-GARDEN`, `SF-PARKING`)
**Key Fields**: `featureName`, `featureType`, `area`, `materials`, `siteId`

### [Construction Package](/en/documentation/entities/construction-package)
**What**: Phase of construction work
**When**: Scheduling, cost tracking, trade coordination
**ID**: `CP-{descriptor}` (e.g., `CP-STRUCTURE`, `CP-ENVELOPE`)
**Key Fields**: `packageName`, `trades`, `startDate`, `endDate`, `cost`, `dependencies`

---

## Common Patterns

### Type/Instance Pattern (6 type-instance pairs)

| Type (Template) | Instance (Actual) | Use When |
|-----------------|-------------------|----------|
| Space Type → | Space | 3+ similar rooms |
| Zone Type → | Zone | Standard zone configs |
| System Type → | System | Repeating system specs |
| Asset Type → | Asset | Same product installed multiple times |
| Opening Type → | Opening | Same window/door model used repeatedly |
| Site Feature Type → | Site Feature | Standard landscape elements |

**Benefit**: Define once in Type → instances inherit automatically

### Hierarchy Patterns

```
Site
  └─ Building
      ├─ Level
      │   └─ Space (inherits ceiling height, finishes from Level)
      │       └─ Asset
      └─ Envelope (walls, roofs separating spaces)
      └─ Opening (windows, doors in envelopes)
      └─ Vertical Circulation (stairs, elevators connecting levels)
      └─ System
          └─ Subsystem (parentSystemId for hierarchy)
              └─ Asset (belongs to system)
```

### Grouping & Rules

```
Zone (fire, HVAC, acoustic)
  ← spaces reference via zoneIds
  → Zone.spaceIds auto-computed

Requirement
  ← entities reference via requirements array
  → Compiler checks compliance
```

---

## How to Choose (Decision Tree)

### "Which entity type do I need?"

```
Is it a physical space?
├─ YES → Is it a room/area?
│   ├─ YES → Space
│   └─ NO → Is it connecting levels?
│       ├─ YES → Vertical Circulation
│       └─ NO → Is it a wall/roof?
│           ├─ YES → Envelope
│           └─ NO → Is it a window/door?
│               └─ YES → Opening
├─ NO → Is it equipment?
│   ├─ YES → Asset
│   └─ NO → Is it a system?
│       ├─ YES → System
│       └─ NO → Is it a grouping?
│           ├─ YES → Zone
│           └─ NO → Is it a rule?
│               ├─ YES → Requirement
│               └─ NO → Is it the building itself?
│                   ├─ YES → Building
│                   └─ NO → Is it the plot?
│                       ├─ YES → Site
│                       └─ NO → Is it landscape?
│                           ├─ YES → Site Feature
│                           └─ NO → Is it a work package?
│                               └─ YES → Construction Package
```

---

## Field Cheatsheet

### Every Entity Has

```yaml
id: "unique-identifier"        # Required
entityType: "space"            # Required (canonical field)
version: "1.0.0"               # Required
tags: ["tag1", "tag2"]         # Optional
```

### Common Optional Fields

```yaml
# Data Provenance (any field)
fieldName: value
fieldName_meta:
  confidence: "measured"       # measured/calculated/specified/estimated/assumed/unknown
  source: "document-reference"

# Lifecycle
lifecycle:
  phase: "schematic"           # initiation/concept/schematic/design_dev/construction_docs/construction/as_built/handover
  status: "in_progress"

# BIM Integration
ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"

# Cost
cost:
  design: 50000
  actual: 52000
```

---

## When to Use What

| Task | Entity Types to Use |
|------|-------------------|
| **Document all rooms** | Building, Level, Space |
| **Fire permit submission** | Zone (fire), Space, Requirement, Vertical Circulation |
| **MEP coordination** | System, Asset, Zone (HVAC), Space |
| **Equipment handover** | Asset, Asset Type, System |
| **Thermal analysis** | Envelope, Opening, Space |
| **Accessibility compliance** | Space, Vertical Circulation, Requirement |
| **Construction scheduling** | Construction Package, System, Asset |
| **Site/landscape design** | Site, Site Feature, Site Feature Type |

---

## Quick Links

- **[Full Entity Documentation](/en/documentation/entities/)** — Detailed reference for each type
- **[Property Inheritance Guide](/en/guides/property-inheritance)** — How values flow through hierarchies
- **[Glossary](/en/standards/glossary)** — Define every term
- **[Quick Start](/en/standards/quick-start)** — Create your first entity in 5 minutes
- **[Green Terrace Example](/en/examples/green-terrace/)** — Complete project with all 19 types

---

::: tip Start Simple
Don't use all 19 types on day one. Start with:
1. **Building** (project metadata)
2. **Level** (each floor)
3. **Space** (each room)
4. **Zone** (fire zones for permit)
5. **Requirement** (height minimums, fire ratings)

Add other types as your project needs them.
:::
