# Glossary of Terms

::: tip Quick Reference
This glossary clarifies terms used throughout the SBM standard. If a concept seems confusing, check here first.
:::

---

## Core Concepts

### Entity
A structured document describing one aspect of your building (a space, zone, system, asset, requirement, etc.). Each entity has a unique ID and follows a defined schema.

**Example**: `bedroom-01.md` is a Space entity, `fire-zone-zl-iv.md` is a Zone entity.

### Entity Type
The category of an entity, defining what it represents. SBM v1.1.0 has **19 entity types**: Site, Building, Level, Space, Space Type, Envelope, Opening, Opening Type, Vertical Circulation, Zone, Zone Type, System, System Type, Asset, Asset Type, Site Feature, Site Feature Type, Construction Package, Requirement.

**Important**: `entityType` is the **canonical field** in frontmatter (e.g., `entityType: "space"`). The legacy `documentType` field is deprecated but accepted as a fallback.

### Frontmatter
The structured data section at the top of a Markdown file, enclosed by `---` markers. Contains machine-readable fields like ID, name, area, and relationships.

**Example**:
```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
---
```

### Markdown Body
The human-readable narrative section below the frontmatter. Contains descriptions, explanations, and context for architects and engineers.

---

## Type/Instance Pattern

### Type (Template)
A reusable template that defines specifications shared by multiple instances. Examples: Space Type, Zone Type, System Type, Asset Type.

**Purpose**: Define requirements, finishes, equipment once → 50 instances inherit automatically.

**Example**: `ST-BEDROOM-STANDARD` (Space Type) defines standard bedroom specs → 20 bedroom instances reference it.

### Instance (Actual Entity)
A specific occurrence of an entity with its own unique ID and location. References a Type for inherited properties.

**Example**: `SP-BLD-01-L01-001` (Bedroom 01, a Space) references `ST-BEDROOM-STANDARD` (Space Type).

### spaceType vs spaceTypeId (CRITICAL DISTINCTION)

**⚠️ These are different fields with different purposes:**

| Field | Purpose | Type | Example |
|-------|---------|------|---------|
| `spaceType` | **Functional classification** (enum value) | string (enum) | `"sleeping_space"`, `"kitchen"`, `"corridor"` |
| `spaceTypeId` | **Template reference** (links to Space Type entity) | string (ID) | `"ST-BEDROOM-STANDARD-A"` |

**Example**:
```yaml
# spaces/bedroom-01.md
spaceType: "sleeping_space"        # ← Enum: What kind of space is this?
spaceTypeId: "ST-BEDROOM-STANDARD" # ← ID: Which template defines its specs?
```

**Same pattern for other entities:**
- `zoneType` (enum: `"fire"`, `"hvac"`) vs `zoneTypeId` (ID: `"ZT-FIRE-ZL-IV"`)
- `systemCategory` (enum: `"hvac"`, `"electrical"`) vs `systemTypeId` (ID: `"SYT-HVAC-RESIDENTIAL"`)

---

## Spatial Hierarchy

### Site
The land parcel or plot. Contains buildings, site features (landscape, parking), and plot-level constraints (setbacks, zoning).

**ID Format**: `SITE-{descriptor}` (e.g., `SITE-GREEN-TERRACE`)

### Building
The whole building structure. Contains levels, systems, and envelope assemblies.

**ID Format**: `BLD-{number}` (e.g., `BLD-01`)

### Level
A floor or storey in a building. Contains spaces and defines typical properties (ceiling height, finishes) that spaces inherit.

**ID Format**: `LVL-{number}` (e.g., `LVL-01` for ground floor, `LVL-02` for first floor)

### Space
A room, area, or functional zone within a level. The fundamental unit of spatial organization.

**ID Format**: `SP-{building}-{level}-{number}` (e.g., `SP-BLD-01-L01-001`)

**Aliases**: Room, Area, Zone (in non-technical usage — but avoid "zone" to prevent confusion with the Zone entity type)

### Envelope
A wall, roof, floor slab, or curtain wall assembly. Defines construction layers, thermal performance, fire resistance, and acoustic properties.

**ID Format**: `ENV-{type}-{number}` (e.g., `ENV-EW-01` for external wall 01)

### Opening
A specific window, door, or skylight instance. Promoted to first-class entity in v1.1.0 (previously embedded in envelope).

**ID Format**: `OPN-{type}-{location}-{number}` (e.g., `OPN-WIN-N-001` for window north 001)

### Vertical Circulation
A staircase, elevator, ramp, or escalator connecting multiple levels. Includes egress analysis and accessibility.

**ID Format**: `VC-{type}-{descriptor}` (e.g., `VC-STAIR-A` for Staircase A)

---

## Zoning & Grouping

### Zone
A group of spaces that share a common functional, regulatory, or technical characteristic.

**Examples**: Fire zone ZL-IV (fire safety compartment), HVAC Zone North (thermal control), Acoustic Zone Night (sound insulation)

**ID Format**: `ZONE-{type}-{descriptor}` (e.g., `ZONE-FIRE-ZL-IV`, `ZONE-HVAC-NORTH`)

**Critical**: Zones are **not physical spaces** — they are **groupings** that spaces belong to. One space can be in multiple zones (fire zone + HVAC zone + acoustic zone).

### Zone Type
A template for zone configurations. Defines standard requirements and properties for a zone category.

**ID Format**: `ZT-{descriptor}` (e.g., `ZT-FIRE-ZL-IV`)

---

## Systems & Equipment

### System
A building installation or MEP system. Examples: central heating, electrical distribution, plumbing, ventilation.

**ID Format**: `SYS-{category}-{number}` (e.g., `SYS-HVAC-01`)

**Hierarchy**: Systems can have parent-child relationships (e.g., `SYS-HVAC-01` parent with `SYS-HVAC-01-HEATING` and `SYS-HVAC-01-VENT` subsystems).

### System Type
A template for MEP system configurations. Defines standard performance, capacity, and equipment for a system category.

**ID Format**: `SYT-{descriptor}` (e.g., `SYT-HVAC-RESIDENTIAL-MVHR`)

### Asset
A specific installed piece of equipment. Examples: Boiler #12345, Heat Pump HP-01, Radiator RAD-01.

**ID Format**: `AST-{type}-{number}` (e.g., `AST-HP-01` for heat pump 01)

**Aliases**: Equipment, Fixture (in non-technical usage)

### Asset Type
A product specification template. Defines manufacturer, model, performance data, and maintenance requirements.

**ID Format**: `AT-{descriptor}` (e.g., `AT-VAILLANT-ECOTEC-306`)

---

## Site Elements (v1.1.0)

### Site Feature
A landscape element, parking area, or green infrastructure. Examples: gardens, paved areas, green roofs, parking lots.

**ID Format**: `SF-{descriptor}` (e.g., `SF-NORTH-GARDEN`, `SF-PARKING`)

### Site Feature Type
A template for site element specifications. Defines materials, maintenance, and performance.

**ID Format**: `SFT-{descriptor}` (e.g., `SFT-PERMEABLE-PAVING`)

---

## Construction & Regulations

### Construction Package
A phase of construction work with assigned trades, schedule, and budget. Examples: Structure, Envelope, MEP, Finishes.

**ID Format**: `CP-{descriptor}` (e.g., `CP-STRUCTURE`, `CP-ENVELOPE`)

### Requirement
A performance rule, regulatory constraint, or design criterion that entities must satisfy.

**Types**:
- **Numeric**: Measurable (e.g., height >= 2.50 m, daylight factor >= 2%)
- **Qualitative**: Procedural or conceptual (e.g., clean/dirty flows must not cross)

**ID Format**: `REQ-{scope}-{descriptor}-{number}` (e.g., `REQ-PL-WT-HEIGHT-001`)

---

## Relationships & References

### Forward Reference
A link from one entity to another, written explicitly in the source file.

**Example**: Space file says `zoneIds: ["ZONE-FIRE-ZL-IV"]` (forward reference from Space → Zone)

### Reverse Reference (Auto-Computed)
The opposite direction of a forward reference, automatically computed by the compiler.

**Example**: Compiler reads all Space files → populates Zone's `spaceIds` array automatically (reverse reference from Zone ← Space)

**Key point**: You **never manually write** reverse references. The compiler maintains them.

### Bidirectional Reference
A pair of forward and reverse references that connect two entities in both directions.

**Example**: `Space.zoneIds` (forward) ↔ `Zone.spaceIds` (reverse)

---

## Data Quality & Provenance

### Provenance
The origin and history of a data value. Tracks where data came from, who extracted it, and how confident we are.

**Stored in**: `{field}_meta` companion fields (e.g., `designArea: 30.45` has `designArea_meta: { confidence: "measured", source: "PW-04.05.11" }`)

### Confidence Levels
A 6-level scale indicating data quality:

| Level | Meaning | Example |
|-------|---------|---------|
| `measured` | Physically measured on site | As-built dimension from laser scan |
| `calculated` | Derived from measured values | Area computed from measured dimensions |
| `specified` | From official specification | Room height from approved architectural drawings |
| `estimated` | Educated guess from expert | Estimated equipment weight based on similar models |
| `assumed` | Placeholder without basis | Default value used before actual data available |
| `unknown` | Confidence level not documented | Legacy data without source information |

### Inheritance Provenance
Tracks whether a value was explicitly set or inherited from parent entities.

**Example**: Space has `designHeight: 2.70` with `designHeight_meta: { provenance: "inherited_from_level" }` means the value came from `Level.typicalCeilingHeight`, not set explicitly in the Space file.

### Property Inheritance
Values flowing from parent entities to children. Examples:
- `Level.typicalCeilingHeight` → `Space.designHeight`
- `Space Type.requirements` → `Space.requirements`
- `Building.unit` → all entities in the building

**Precedence**: Instance (explicit) > Type (template) > Level (floor-typical) > Building > Site

**See**: [Property Inheritance Guide](/en/guides/property-inheritance)

---

## BIM Integration

### IFC (Industry Foundation Classes)
An open standard for BIM data exchange. SBM entities map to IFC classes for Revit/ArchiCAD import/export.

**Example**: `Space` → `IfcSpace`, `System` → `IfcSystem`, `Asset` → `IfcDistributionElement`

### ifcMapping
A field in entities that defines how the entity maps to IFC properties and classes.

**Example**:
```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "NetFloorArea"
      source: "designArea"
```

### LOD (Level of Development)
The degree of detail and accuracy in a BIM model, progressing through project phases.

| LOD | Phase | Detail | Example |
|-----|-------|--------|---------|
| LOD 100 | Concept | Approximate volumes | Box massing |
| LOD 200 | Schematic | Correct sizes/locations | Rooms with accurate areas |
| LOD 300 | Design Development | Exact geometry, real materials | Walls with actual thickness |
| LOD 400 | Construction Docs | Fabrication-ready | Specific products specified |
| LOD 500 | As-Built | Field-verified | Measured as actually built |

---

## Compiler & Validation

### Compiler
The tool that reads SBM Markdown files, validates them, computes relationships, and generates output files (BIM parameters, compliance reports, asset registers).

**Run with**: `npm run compile`

### Schema
The JSON Schema definition of valid entity structure. Defines required fields, optional fields, data types, and validation rules.

**Current version**: `schemas/sbm-schema-v1.1.json`

### Validation
The process of checking that entities conform to the schema and referential integrity rules.

**Checks**:
- All required fields present
- Field types correct (string, number, array, object)
- References point to existing entities (no broken links)
- Phase gates enforced (no assumed data after Construction Docs)

### Quality Scoring
A weighted completeness metric for entities based on field presence and provenance.

**Weights**:
- **Critical fields** (3×): Safety-critical (fire ratings, structural capacity, emergency systems)
- **Important fields** (2×): Required for permits (areas, heights, regulatory compliance)
- **Standard fields** (1×): Everything else

**Output**: Quality report shows per-entity completeness scores and field profiles.

---

## Project Phases

### Lifecycle Phases
The 8 stages of a building project:

1. **Project Initiation** — Client brief, site visit
2. **Concept Design (LOD 100)** — Massing, rough room list
3. **Schematic Design (LOD 200)** — Plans, sections, fire zones
4. **Design Development (LOD 300)** — Permit documents, full specs
5. **Construction Docs (LOD 400)** — Fabrication-ready details
6. **Construction** — Site supervision, as-built updates
7. **As-Built (LOD 500)** — Field-verified dimensions
8. **Handover & Maintenance** — Facility handover, maintenance manuals

### Phase Gates
Validation checkpoints that block progression if data quality is insufficient.

**Example**: Cannot advance to As-Built phase if safety-critical fields (fire ratings, egress widths) have `confidence: "assumed"`.

---

## Common Abbreviations

| Abbreviation | Full Term | Meaning |
|--------------|-----------|---------|
| **SBM** | Semantic Building Model | The standard defined in this documentation |
| **MEP** | Mechanical, Electrical, Plumbing | Building systems |
| **HVAC** | Heating, Ventilation, Air Conditioning | Climate control systems |
| **BIM** | Building Information Modeling | 3D model-based design process |
| **IFC** | Industry Foundation Classes | BIM data exchange standard |
| **LOD** | Level of Development | BIM model detail progression |
| **REI** | Résistance, Étanchéité, Isolation | Fire resistance rating (e.g., REI 60) |
| **WT 2021** | Warunki Techniczne 2021 | Polish technical building regulations |
| **ZL-IV** | Strefa Liniowa IV | Polish fire zone classification (height-based) |
| **COP** | Coefficient of Performance | Heat pump efficiency metric |
| **SEER** | Seasonal Energy Efficiency Ratio | Cooling efficiency metric |
| **MVHR** | Mechanical Ventilation with Heat Recovery | Ventilation system type |
| **UFH** | Underfloor Heating | Radiant heating system |

---

## Field Naming Conventions

### design* vs actual* Prefixes

| Prefix | When Used | Example |
|--------|-----------|---------|
| `design*` | Planned/specified values during design phases | `designArea`, `designHeight` |
| `actual*` | Field-verified values after construction | `actualArea`, `actualHeight` |

### Singular vs Plural

| Form | When Used | Example |
|------|-----------|---------|
| **Singular** | Reference to one entity (many-to-one) | `levelId`, `buildingId`, `spaceId` |
| **Plural** | References to multiple entities (many-to-many or one-to-many) | `zoneIds`, `requirements`, `spaceIds` |

**Exception**: `spaceIds` is plural because a zone can contain many spaces (one-to-many).

---

## See Also

- [Property Inheritance Guide](/en/guides/property-inheritance) — How values flow through hierarchies
- [Data Provenance Guide](/en/guides/data-provenance) — Tracking data quality and sources
- [Entity Types Reference](/en/documentation/entities/) — Complete list of all 19 entity types
- [Compiler Overview](/en/documentation/compiler/) — How the compiler works

::: tip Still Confused?
If a term isn't listed here or needs more explanation, please open an issue on GitHub.
:::
