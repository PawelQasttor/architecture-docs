# BIM Execution Plan (BEP)

A BIM Execution Plan is the foundational document that defines how Building Information Modelling will be used on a project. It sets expectations, assigns responsibilities, and establishes workflows before any modelling begins.

## When to Create a BEP

The BEP should be drafted during the [Initiation phase](/en/phases/initiation) and finalised no later than the [Concept phase](/en/phases/concept). Waiting longer introduces coordination risks that become costly to resolve.

::: tip
Start the BEP as a draft when the project team is first assembled. Refine it as the scope, software, and team structure become clearer.
:::

## Purpose

The BEP serves three goals:

1. **Alignment** -- all parties agree on modelling standards, deliverables, and exchange formats before work begins.
2. **Accountability** -- roles and responsibilities are documented and traceable.
3. **Quality control** -- clash detection schedules, LOD requirements, and review milestones are defined upfront.

## Core Contents of a BEP

### 1. Project Information

| Field | Description | Example |
|---|---|---|
| Project name | Official name used across all documents | City Library Extension |
| Project number | Unique identifier per [governance rules](/en/project-management/governance) | 2025-ARC-0042 |
| Client | Commissioning organisation | Municipality of Greenfield |
| Location | Site address or coordinates | 12 Park Avenue, Greenfield |
| Project type | New build, renovation, extension, interior fit-out | Extension |
| Gross floor area | Approximate area in m² | 4,200 m² |
| Planned phases | Which phases are covered by this BEP | Concept through Construction Docs |

### 2. Roles and Responsibilities

| Role | Responsibility | Typical assignment |
|---|---|---|
| BIM Manager | Oversees the entire BIM process, maintains standards, manages the CDE | Lead design firm |
| BIM Coordinator | Coordinates models within a single discipline, runs clash detection | Each discipline lead |
| Information Manager | Ensures data quality and compliance with the BEP | Client-side or PM firm |
| Model Author | Creates and maintains model content | Individual designers |

::: info
For multi-firm projects, each firm should appoint its own BIM Coordinator. The BIM Manager sits above all coordinators and resolves cross-discipline issues. See [Project Management](/en/project-management/) for team structure guidance.
:::

### 3. Software and Versions

List every software tool that will produce or consume BIM data:

| Discipline | Software | Version | File format |
|---|---|---|---|
| Architecture | Revit | 2024 | .rvt, .ifc |
| Structure | Tekla Structures | 2024 | .ifc |
| MEP | Revit MEP | 2024 | .rvt, .ifc |
| Coordination | Navisworks | 2024 | .nwd, .nwf |
| Cost estimation | CostX | 8.1 | .ifc import |

### 4. File Exchange Formats

All model exchanges between disciplines must use open formats where possible. IFC (Industry Foundation Classes) is the primary exchange format. See [IFC Entities](/en/bim-integration/ifc-entities) for mapping guidance.

| Exchange type | Format | Frequency |
|---|---|---|
| Cross-discipline coordination | IFC 4.0 | Weekly |
| Internal discipline sharing | Native (.rvt, .pln) | As needed |
| Client deliverables | IFC + PDF | Per milestone |
| Quantity take-off | IFC or .xlsx | Per phase |

### 5. Naming Conventions

A consistent naming convention prevents confusion and supports automated workflows in the [CDE](/en/bim-integration/cde).

**File naming pattern:**

```
[Project]-[Discipline]-[Zone]-[Level]-[Type]-[Status]-[Revision]
```

| Component | Values | Example |
|---|---|---|
| Project | Project code | CLE |
| Discipline | ARC, STR, MEP, LAN | ARC |
| Zone | ZN01, ZN02 or ALL | ZN01 |
| Level | L00, L01, LRF | L01 |
| Type | MOD (model), DWG (drawing), SCH (schedule) | MOD |
| Status | WIP, SHR, PUB, ARC | SHR |
| Revision | P01, P02 (preliminary) / C01 (construction) | P03 |

**Example:** `CLE-ARC-ZN01-L01-MOD-SHR-P03.ifc`

### 6. Clash Detection Schedule

| Phase | Frequency | Scope | Led by |
|---|---|---|---|
| [Concept](/en/phases/concept) | Bi-weekly | Architecture vs. Structure | BIM Manager |
| [Schematic](/en/phases/schematic) | Weekly | All disciplines | BIM Manager |
| [Design Development](/en/phases/design-development) | Weekly | All disciplines + site | BIM Coordinator per discipline |
| [Construction Docs](/en/phases/construction-docs) | Twice weekly | Full model incl. fabrication detail | BIM Manager |

::: warning
Clash detection is not optional. Unresolved clashes at the end of each phase must be documented as open issues in the project tracker. They become blockers for phase sign-off.
:::

### 7. LOD Requirements per Phase

The BEP must reference the project's [LOD definitions](/en/bim-integration/lod-definitions) and specify what level of development is required for each element category at each phase. See the full [LOD/LOI Matrix](/en/bim-integration/lod-loi) for detailed requirements.

| Phase | Architectural elements | Structural elements | MEP elements |
|---|---|---|---|
| Concept | LOD 100 | LOD 100 | -- |
| Schematic | LOD 200 | LOD 200 | LOD 100 |
| Design Development | LOD 300 | LOD 300 | LOD 200 |
| Construction Docs | LOD 350 | LOD 400 | LOD 300 |
| As-Built | LOD 500 | LOD 500 | LOD 500 |

### 8. Deliverables per Phase

| Phase | Deliverables | Format |
|---|---|---|
| [Initiation](/en/phases/initiation) | BEP draft, project setup in CDE | .docx / CDE |
| [Concept](/en/phases/concept) | Massing model, site context model | .ifc, .pdf |
| [Schematic](/en/phases/schematic) | Coordinated design model, preliminary clash report | .ifc, .bcf, .pdf |
| [Design Development](/en/phases/design-development) | Detailed model, updated specifications, resolved clash report | .ifc, .xlsx, .pdf |
| [Construction Docs](/en/phases/construction-docs) | Construction-ready model, full drawing set, quantity schedules | .ifc, .pdf, .xlsx |
| [Construction](/en/phases/construction) | Updated model with site changes, RFI log | .ifc, .bcf |
| [As-Built](/en/phases/as-built) | As-built model reflecting constructed conditions | .ifc |
| [Handover](/en/phases/handover) | Final model, asset data, O&M manuals | .ifc, .cobie, .pdf |

## BEP Template Checklist

Use this checklist to verify your BEP is complete before finalising:

- [ ] Project information section filled in
- [ ] All team roles assigned with named individuals
- [ ] Software and version list confirmed by all parties
- [ ] File naming convention agreed and documented
- [ ] Clash detection schedule established
- [ ] LOD requirements per phase defined
- [ ] Deliverable list per phase agreed
- [ ] CDE folder structure and access rights set (see [CDE](/en/bim-integration/cde))
- [ ] Model origin point and coordinate system defined
- [ ] Review and approval workflow documented

## Maintaining the BEP

The BEP is a living document. Review it at every phase gate. Update it when:

- New disciplines join the project
- Software versions change
- The scope of modelling changes significantly
- Clash detection processes need adjustment

::: info
Store the current BEP in the Published area of your [CDE](/en/bim-integration/cde). Keep previous versions in the Archived area for audit trail purposes.
:::

## Related Pages

- [Common Data Environment (CDE)](/en/bim-integration/cde)
- [LOD/LOI Matrix](/en/bim-integration/lod-loi)
- [IFC Entities](/en/bim-integration/ifc-entities)
- [Bidirectional Sync](/en/bim-integration/bidirectional-sync)
- [Project Governance](/en/project-management/governance)
