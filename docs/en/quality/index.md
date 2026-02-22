---
title: Quality Assurance
description: QA framework for architecture documentation — self-checks, peer reviews, and phase gates across all project stages.
---

# Quality Assurance

Every architecture project produces hundreds of documents, drawings, and model files. Without a structured quality process, errors slip through. A missing fire-rating note costs minutes to fix during design but weeks during construction. A non-compliant egress calculation can halt a permit review entirely.

This QA framework gives your team a repeatable method to catch problems early, maintain compliance, and keep documentation consistent from initiation through handover.

## Why Quality Assurance Matters

::: warning Cost of Late Corrections
Industry data consistently shows that fixing a documentation error during construction costs 10 to 50 times more than catching it during design. A disciplined QA process is not overhead --- it is the most cost-effective activity on any project.
:::

- **Permit delays.** Incomplete or inconsistent submissions are the leading cause of permit rejection. QA checks prevent resubmission cycles.
- **Construction disputes.** Ambiguous or conflicting documents lead to RFIs, change orders, and claims. Clear documentation reduces risk.
- **Regulatory compliance.** Building codes, accessibility standards, and energy regulations change frequently. Systematic checks keep your documents current.
- **Client confidence.** Delivering well-organized, error-free documentation demonstrates professionalism and builds trust.

## The Three-Layer QA Model

Quality assurance in this standard operates on three layers. Each layer catches different kinds of issues.

| Layer | Who Performs It | When | What It Catches |
|---|---|---|---|
| **Self-Check** | Document author | Before any submission | Typos, missing fields, broken cross-references, incomplete YAML frontmatter |
| **Peer Review** | A qualified colleague | Before phase gate review | Design errors, coordination gaps, code interpretation issues |
| **Phase Gate** | Project lead + stakeholders | At each phase transition | Completeness of deliverables, stakeholder alignment, readiness to proceed |

::: info
The self-check layer is the most important. It takes the least time and catches the most common errors. Make it a habit, not an afterthought.
:::

## How QA Connects to the Project Phases

The standard defines [eight project phases](/en/phases/initiation). Each phase produces specific documents and ends with a phase gate --- a formal checkpoint where the team confirms everything is complete before moving forward.

The table below summarizes what QA activities apply at each phase.

| Phase | Key Documents to Review | Primary QA Focus |
|---|---|---|
| [Initiation](/en/phases/initiation) | Building brief, site analysis | Scope definition, stakeholder requirements captured |
| [Concept](/en/phases/concept) | Space documents, zone definitions | Design intent, spatial relationships, feasibility |
| [Schematic](/en/phases/schematic) | Requirement docs, system outlines | Code compliance, structural and MEP feasibility |
| [Design Development](/en/phases/design-development) | System docs, asset specifications | Coordination between disciplines, detail accuracy |
| [Construction Docs](/en/phases/construction-docs) | Full document set, BIM model | Completeness, constructability, permit readiness |
| [Construction](/en/phases/construction) | RFI responses, submittals | Field accuracy, change tracking |
| [As-Built](/en/phases/as-built) | As-built documents, updated model | Accuracy against constructed conditions |
| [Handover](/en/phases/handover) | O&M manuals, asset registers | Completeness for facility management |

## QA and Document Types

Each of the seven document types has specific fields and relationships that must be verified. Common checks include:

- **Space documents** --- Do all spaces have assigned zones? Are areas consistent with the building total?
- **Zone documents** --- Are fire zones, acoustic zones, and climate zones properly defined?
- **Requirement documents** --- Is every requirement linked to a regulation or client brief?
- **System documents** --- Are systems assigned to the correct spaces and zones?
- **Asset documents** --- Do assets reference valid system and space identifiers?
- **Building documents** --- Is the building metadata (address, classification, gross area) complete?
- **Level documents** --- Are levels numbered consistently? Do floor-to-floor heights match structural documents?

## QA and BIM Integration

If your project uses BIM, the QA process extends to model files. See [BIM Integration](/en/bim-integration/) for full details.

- Model elements must carry the same identifiers used in the markdown documents.
- Clash detection results feed into the [coordination review process](/en/quality/review-procedures).
- The [BIM Execution Plan](/en/bim-integration/bep) should define model-checking responsibilities and frequency.

## Quick Links

| Page | Description |
|---|---|
| [Phase Gate Checklists](/en/quality/phase-gates) | Printable checklists for every phase transition |
| [Review Procedures](/en/quality/review-procedures) | Step-by-step review workflows for design, coordination, documentation, and client reviews |
| [Document Control](/en/project-management/document-control) | Version control, naming conventions, and file management |
| [Governance](/en/project-management/governance) | Roles, responsibilities, and decision-making authority |

## Getting Started

1. Assign a QA lead for your project. This is typically the project architect or a senior team member.
2. Review the [Phase Gate Checklists](/en/quality/phase-gates) and adapt them to your project scope.
3. Establish a peer review schedule --- at minimum, before each phase gate.
4. Set up a review log to track findings and resolutions (see [Review Procedures](/en/quality/review-procedures)).
5. Integrate QA milestones into your [project management](/en/project-management/) timeline.

::: tip
Start with the self-check layer. Even on small projects with no formal peer review, a consistent self-check habit will eliminate the majority of documentation errors.
:::
