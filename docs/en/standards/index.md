# Standards Overview

The Architecture Documentation Standard defines a structured methodology for creating architectural documentation that is simultaneously human-readable, AI-parseable, BIM-compatible, and regulation-compliant.

## Core Principles

### 1. Markdown-First

All documentation is written in **plain Markdown** with structured YAML frontmatter. This ensures:

- ✅ Human readability - No special tools required
- ✅ Version control - Git-friendly plain text
- ✅ Future-proof - Open format, widely supported
- ✅ Easy editing - Any text editor works

### 2. Structured Metadata

Every document includes **YAML frontmatter** with standardized fields:

```yaml
---
documentType: "technical_specification"
projectPhase: "detailed_design"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "PN-ISO_9001"
    section: "4.2.3"
ifcMapping:
  ifcEntity: "IfcWall"
  properties:
    - Pset_WallCommon
version: "1.2.0"
lastReviewed: "2026-02-15"
authors:
  - name: "Jan Kowalski"
    role: "architect"
    license: "IARP 1234"
---
```

### 3. AI-Parseable Structure

The standard includes:

- **JSON schemas** - Define valid frontmatter structures
- **Consistent formatting** - Tables, lists, headings
- **Semantic markup** - Clear hierarchy and relationships
- **Machine-readable exports** - JSON/XML for AI consumption

### 4. BIM Integration

Documentation references **IFC entities** and **property sets**:

```markdown
**IFC Mapping:**
- Entity: `IfcWall`
- ObjectType: `ExternalWall_TypeA`
- Properties: `Pset_WallCommon`
```

### 5. Regulatory Compliance

Built-in references to:

- Polish regulations (Prawo budowlane, WT 2021)
- International standards (PN-ISO, PN-EN)
- Compliance checklists

## Semantic Building Model (SBM)

The **Semantic Building Model (SBM)** is now the primary structured data model for architectural documentation. SBM organizes building information into **7 document types**:

| Document Type | ID Pattern | Description |
|-------------|-----------|-------------|
| Building | `BLD-*` | Top-level building document type |
| Level | `LVL-*` | Floors / storeys within a building |
| Zone | `ZONE-*` | Fire, acoustic, HVAC, security, and other zone groupings |
| Space | `SP-*` | Individual rooms and areas |
| System | `SYS-*` | MEP and building systems (HVAC, electrical, plumbing, etc.) |
| Asset Instance | `AI-*` | Individual installed equipment and components |
| Requirement | `REQ-*` | Performance, dimensional, regulatory, and safety requirements |

An SBM compiler validates Markdown source files against the schema and produces a unified JSON model of the entire building. This model is machine-readable, BIM-compatible, and regulation-aware.

For a full introduction, see the [SBM Documentation Overview](/en/documentation/overview).

---

## Document Types

The standard supports various architectural documents:

| Document Type | Description | Template / Reference |
|--------------|-------------|----------------------|
| `technical_specification` | Detailed technical specs | (See SBM document templates: [Space](/en/templates/space-template), [System](/en/templates/system-template)) |
| `material_specification` | Material properties | (See SBM document templates: [Asset](/en/templates/asset-template)) |
| `compliance_checklist` | Regulatory compliance | (See [Requirement template](/en/templates/requirement-template)) |
| `project_specification` | Overall project specs | [Authoring Guide](/en/documentation/authoring/) |
| `as_built_documentation` | As-built records | [Authoring Guide](/en/documentation/authoring/) |

## Next Steps

- [Document Structure](/en/standards/document-structure) - Learn the phase-based standard format
- [Frontmatter Schema](/en/standards/frontmatter-schema) - Understand metadata fields and the SBM schema
- [Templates](/en/templates/) - Start with ready-made SBM document templates
- [BIM Integration](/en/bim-integration/) - Connect with BIM workflows
- [SBM Documentation](/en/documentation/overview) - Explore the Semantic Building Model and its compiler
