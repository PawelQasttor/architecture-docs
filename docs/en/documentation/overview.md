# Overview

The **Semantic Building Model (SBM)** is a structured, machine-readable format for defining building intent, requirements, and relationships throughout the entire building lifecycle.

## What is SBM?

SBM separates **semantic intent** (what the building should do) from **geometric implementation** (how it looks in BIM). This creates a single source of truth that:

- Survives design changes and renovations
- Drives BIM, compliance reports, asset registers, and digital twins
- Enables AI reasoning about buildings
- Maintains regulatory traceability

## The Three Layers

```
┌─────────────────────────────────────┐
│ Layer 1: Semantic Building Model   │  ← Source of Truth
│ (Markdown + YAML → JSON)            │     (Intent, Rules, Requirements)
└──────────────┬──────────────────────┘
               │ Compiler
               ▼
┌─────────────────────────────────────┐
│ Layer 2: BIM (Revit/ArchiCAD/IFC)  │  ← Compiled Output
│ (Geometry + Properties)             │     (Design Implementation)
└──────────────┬──────────────────────┘
               │ Runtime
               ▼
┌─────────────────────────────────────┐
│ Layer 3: Digital Twin (Sensors)    │  ← Operational State
│ (Live Monitoring + BMS)             │     (Performance Validation)
└─────────────────────────────────────┘
```

## Key Principles

### 1. Human-Friendly Authoring

Architects write **Markdown** with structured YAML frontmatter:

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
designArea: 14.5
designHeight: 2.70
unit: "m"
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Space: Bedroom 01

Standard bedroom with north-facing window...
```

### 2. Machine-Compilable

The compiler transforms Markdown → JSON → compilation targets:

```
Markdown documents
    ↓ (Parse)
Raw JSON documents
    ↓ (Normalize)
Enriched SBM graph
    ↓ (Validate)
Validated SBM
    ↓ (Compile)
├─→ BIM mapping
├─→ Compliance report
├─→ Asset register
└─→ Digital twin schema
```

### 3. Jurisdiction-Aware

Requirements automatically load based on project country:

- **Global requirements**: Daylight, thermal comfort, ventilation (EN, ISO, ASHRAE)
- **Poland requirements**: WT 2021, Prawo budowlane (automatically loaded when `project.country = "PL"`)
- **Other countries**: Add `/requirements/de/`, `/requirements/fr/`, etc.

## Document Types

SBM defines **core document types** with **type/instance pattern** support (v0.1.1+):

| Document Type | Purpose | Example ID |
|-------------|---------|------------|
| **Space Type** | Space templates (repeating rooms) | `ST-BEDROOM-STANDARD-A` |
| **Space** | Rooms and functional areas | `SP-BLD-01-L01-001` |
| **Zone Type** | Zone templates (standard configurations) | `ZT-FIRE-ZL-IV` |
| **Zone** | Fire, acoustic, HVAC, security zones | `ZONE-FIRE-ZL-IV` |
| **System Type** | System templates (standard MEP configs) | `SYT-HVAC-RESIDENTIAL` |
| **System** | MEP systems (HVAC, electrical, plumbing) | `SYS-HVAC-01` |
| **Asset Type** | Product specifications (equipment templates) | `AT-BOSCH-HP-300` |
| **Asset Instance** | Physical equipment with maintenance data | `AI-AHU-01` |
| **Requirement** | Performance and regulatory rules | `REQ-DAYLIGHT-SLEEPING-001` |
| **Building** | Building-level metadata | `BLD-01` |
| **Level** | Floor/storey information | `LVL-01` |

### Type/Instance Pattern (v0.1.1+)

**Types** define specifications once. **Instances** reference types and add location/context:

```markdown
# Space Type (template - define once)
---
id: "ST-BEDROOM-STANDARD-A"
requirements: [REQ-1, REQ-2, REQ-3]
finishes: {floor, walls, ceiling}
equipment: [smoke detector, thermostat]
---

# Space Instance (reference type)
---
id: "SP-BLD-01-L01-001"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Inherits all specs
designArea: 14.5  # Instance-specific data
---
```

**Benefits:** 26-33% reduction in documentation for repeating elements.

## Compilation Targets

The compiler generates **4 practical outputs**:

### 1. BIM Mapping (`bim_mapping.json`)

- Revit shared parameters
- IFC property sets (Pset_SBM_Space, Pset_SBM_Zone, etc.)
- Parameter mapping rules (SBM → Revit → IFC)

**Use cases:** Import parameters into Revit, configure IFC exports, populate properties via Dynamo

### 2. Compliance Report (`compliance_report.json`)

- Requirements grouped by regulation (WT 2021, Prawo budowlane, EN standards)
- Space-by-space compliance checks
- Verification status and methods
- Poland WT 2021 section breakdown (§ 132, § 234, § 69, etc.)

**Use cases:** Permit submission documentation, regulatory audits, compliance dashboards

### 3. Asset Register (`asset_register.json`)

- Asset inventory with maintenance schedules
- 24-month maintenance calendar
- Spare parts inventory
- CMMS-ready export (Maximo, SAP PM compatible)

**Use cases:** Facilities management, maintenance planning, lifecycle cost analysis

### 4. Digital Twin Schema (`twin_schema.json`)

- Sensor bindings (space → sensors)
- BMS integration (BACnet device registry, point mapping)
- Runtime requirement evaluation rules
- IoT device registry

**Use cases:** BMS configuration, digital twin deployment, real-time compliance monitoring

## Workflow Integration

### Design Phase

1. Architect creates space documents in Markdown
2. Compiler validates against requirements
3. BIM mapping populates Revit parameters
4. Compliance report checks WT 2021 sections

### Construction Phase

1. As-built measurements update space documents
2. Asset instances added during equipment installation
3. Serial numbers and tags recorded
4. Compliance report tracks verification completion

### Operation Phase

1. Digital twin binds sensors to space IDs
2. Real-time monitoring validates requirements
3. Maintenance calendar triggers service events
4. Asset register tracks equipment lifecycle

## Backward Compatibility

SBM coexists with legacy document types:

- `element_specification` (e.g., external wall specifications)
- `project_specification` (project metadata)

Both formats compile into the same `sbm.json` output.

## Getting Started

1. **[Document Types Reference](/en/documentation/entities/)** - Learn about spaces, zones, requirements
2. **[Authoring Guide](/en/documentation/authoring/)** - Write your first Markdown document
3. **[Compiler Guide](/en/documentation/compiler/)** - Run the compilation pipeline
4. **[Examples](/en/examples/)** - See the Green Terrace example project

## Version

**Current version:** SBM v0.1.3

- JSON schema: `sbm-schema-v0.1.json`
- Compiler: `v0.1.0` (type resolution support pending)
- **v0.1.3 (2026-02-22):** Environmental conditions, electrical safety groups (IEC 60364-7-710), regulatory references, lifecycle state
- **v0.1.2 (2026-02-22):** Room numbers, accessibility levels, parent/child spaces, departments, bed count
- **v0.1.1 (2026-02-22):** Added type/instance pattern for spaces, zones, systems, assets
- **v0.1.0:** First stable release with core document types
