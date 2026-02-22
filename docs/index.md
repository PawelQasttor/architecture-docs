---
layout: home

hero:
  name: "Architecture Documentation Standard"
  text: "AI-Ready Documentation for Modern Architects"
  tagline: Write building documentation in Markdown. Structured for AI, BIM-compatible, regulation-compliant.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/standards/quick-start
    - theme: alt
      text: How It Works
      link: /en/standards/how-it-works
    - theme: alt
      text: Polski
      link: /pl/

features:
  - icon: 📝
    title: Markdown-Based
    details: Write documentation in plain markdown - easy to edit, version control friendly, and future-proof
  - icon: 🤖
    title: AI-Parseable
    details: Structured YAML frontmatter and JSON schemas enable AI agents to understand and process your documentation
  - icon: 🏗️
    title: BIM-Compatible
    details: Text representation of IFC entities, property sets, and bi-directional sync with BIM tools (Revit, ArchiCAD)
  - icon: ✅
    title: Regulation-Compliant
    details: Built-in support for Polish building codes (Prawo budowlane, WT 2021) and international standards
  - icon: 📄
    title: PDF Export
    details: Professional PDF generation using Pandoc templates - ready for official submissions
  - icon: 🔄
    title: Version Control
    details: Git-friendly plain text format enables full version history and collaboration workflows
---

## What Is This?

The **Architecture Documentation Standard** is a methodology for creating building documentation that is simultaneously **human-readable**, **machine-parseable**, and **BIM-compatible**.

You write documentation in plain Markdown with structured YAML metadata. The same file serves architects (readable text), AI agents (structured JSON), BIM software (IFC property sets), and regulators (PDF export).

## The Three Pillars

The standard is built on three complementary pillars:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PHASES        │  │  SBM ENTITIES   │  │  BIM            │
│   (When)        │  │  (What)         │  │  (How)          │
│                 │  │                 │  │                 │
│ 8 project       │  │ 7 entity types  │  │ IFC sync        │
│ phases from     │  │ that describe   │  │ LOD levels      │
│ initiation to   │  │ every aspect    │  │ Revit/ArchiCAD  │
│ handover        │  │ of a building   │  │ integration     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

- **[Phases](/en/standards/document-structure)** define the 8-step project workflow - from initial brief to building handover
- **[SBM Entities](/en/documentation/overview)** define the 7 types of building data - spaces, zones, systems, requirements, and more
- **[BIM Integration](/en/bim-integration/)** connects your documentation to Revit, ArchiCAD, and IFC

[Learn how they work together →](/en/standards/how-it-works)

## What Does a Document Look Like?

Every document has two parts: **YAML metadata** (for machines) and **Markdown content** (for humans).

```yaml
---
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
designArea: 14.5
designHeight: 2.70
unit: "m"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
version: "1.0.0"
---
```

```markdown
# Space: Bedroom 01

Standard bedroom on the first floor with north-facing window.

## Design Parameters

| Parameter | Value | Unit |
|-----------|-------|------|
| Floor area | 14.5 | m² |
| Clear height | 2.70 | m |
| Window area | 3.2 | m² |

## Requirements

- Room height >= 2.50 m (WT 2021 § 132) -- Compliant
- Natural daylight required -- Verified
```

The compiler reads these files and generates:
- **BIM parameters** for Revit/ArchiCAD
- **Compliance reports** for permit submissions
- **Asset registers** for facilities management
- **Digital twin schemas** for building management systems

## The Project Workflow

The standard covers all 8 phases of architectural work:

| Phase | What You Do | BIM LOD |
|-------|-------------|---------|
| [1. Initiation](/en/phases/initiation) | Client brief, site analysis, functional program | -- |
| [2. Concept (LOD 100)](/en/phases/concept) | Massing studies, preliminary design | LOD 100 |
| [3. Schematic (LOD 200)](/en/phases/schematic) | Floor plans, sections, elevations | LOD 200 |
| [4. Design Development (LOD 300)](/en/phases/design-development) | Building permit documentation | LOD 300 |
| [5. Construction Docs (LOD 400)](/en/phases/construction-docs) | Fabrication-ready specifications | LOD 400 |
| [6. Construction](/en/phases/construction) | Site supervision, RFIs, change orders | LOD 400 |
| [7. As-Built (LOD 500)](/en/phases/as-built) | Verified field conditions | LOD 500 |
| [8. Handover](/en/phases/handover) | O&M manuals, maintenance plans | LOD 500 |

Each phase tells you what documents to create, what entities to define, and what regulations to check.

[View complete workflow →](/en/standards/document-structure)

## The Semantic Building Model

The **Semantic Building Model (SBM)** organizes all building information into 7 entity types:

| Entity | What It Describes | Example |
|--------|-------------------|---------|
| **Space** | Rooms and functional areas | Bedroom, office, corridor |
| **Zone** | Fire, acoustic, HVAC groupings | Fire Zone ZL-IV |
| **Requirement** | Performance and regulatory rules | Room height >= 2.50 m |
| **System** | MEP systems | Central heating, ventilation |
| **Asset Instance** | Installed equipment | Boiler, air handling unit |
| **Building** | Building-level metadata | Name, location, classification |
| **Level** | Floor/storey information | Ground floor, Level 01 |

Entities reference each other (a Space belongs to Zones, has Requirements, contains Assets), creating a connected model of the entire building.

[Learn about SBM →](/en/documentation/overview)

## Get Started

Choose your path:

| I want to... | Go here |
|-------------|---------|
| **Try it now** (5 minutes) | [Quick Start Guide](/en/standards/quick-start) |
| **Understand the full picture** | [How It All Fits Together](/en/standards/how-it-works) |
| **Follow the project workflow** | [8-Phase Workflow](/en/standards/document-structure) |
| **See a real example** | [Green Terrace Building](/en/examples/green-terrace/) |
| **Use templates** | [Entity Templates](/en/templates/) |
| **Integrate with BIM** | [BIM Integration](/en/bim-integration/) |
| **Check Polish regulations** | [Regulations](/en/regulations/) |
| **Export to PDF** | [PDF Export Guide](/en/guides/pdf-export) |

---

**Language:** [English](/) | [Polski](/pl/)
