---
title: Project Management
description: Governance, document control, change management, and risk management for architecture projects following the documentation standard.
---

# Project Management

Architecture projects involve dozens of stakeholders, hundreds of documents, and decisions that span months or years. Without structured project management, information gets lost, decisions go unrecorded, and costly rework follows.

This section provides the frameworks and templates you need to keep your project organised, traceable, and under control from initiation through handover.

## What This Section Covers

| Sub-section | Purpose |
|---|---|
| [Governance](./governance) | Roles and responsibilities, communication plans, decision logs, stakeholder register |
| [Document Control](./document-control) | Folder structure, file naming, version tracking, approval gates |
| [Change Management](./change-management) | Change requests, impact analysis, approval workflows |
| [Risk Management](./risk-management) | Risk registers, assessment matrices, mitigation strategies |

## Why Structured PM Matters for This Standard

This documentation standard uses Markdown files with YAML frontmatter to describe every space, zone, system, and asset in a building. Each file carries metadata -- its phase, status, version, and relationships to other documents. Project management processes ensure that:

- Every document moves through a clear lifecycle (Draft, For Review, Approved, Superseded)
- Changes are recorded and traceable
- The right people review and sign off at the right time
- Risks are identified early and linked to the documents they affect

::: tip
Think of project management as the operating system for your documentation. The [8-phase workflow](/en/phases/initiation) defines **what** gets produced. Project management defines **how** it gets produced, reviewed, and controlled.
:::

## How PM Activities Map to the 8 Phases

Not every PM activity runs at the same intensity throughout the project. The table below shows where each activity is most critical.

| PM Activity | [Initiation](/en/phases/initiation) | [Concept](/en/phases/concept) | [Schematic](/en/phases/schematic) | [Design Dev.](/en/phases/design-development) | [Construction Docs](/en/phases/construction-docs) | [Construction](/en/phases/construction) | [As-Built](/en/phases/as-built) | [Handover](/en/phases/handover) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Stakeholder register | High | Medium | Low | Low | Low | Low | Low | Low |
| RACI matrix setup | High | Medium | -- | -- | -- | -- | -- | -- |
| Communication plan | High | High | Medium | Medium | Medium | Medium | Low | Low |
| Decision logging | Medium | High | High | High | Medium | Medium | Low | Low |
| Document control | Medium | Medium | High | High | High | High | High | Medium |
| Change management | Low | Low | Medium | High | High | High | Medium | Low |
| Risk management | High | High | Medium | Medium | Medium | High | Low | Low |
| Quality gates | -- | High | High | High | High | High | High | High |

::: info
Quality gates are covered in detail under [Quality Management](/en/quality/) and [Phase Gates](/en/quality/phase-gates). PM activities feed directly into those gates -- a phase cannot close if outstanding changes or unmitigated risks remain.
:::

## Getting Started

If you are setting up a new project, follow this sequence:

1. **Create the stakeholder register** -- Identify who is involved and what their interests are. See [Governance](./governance).
2. **Define roles with a RACI matrix** -- Clarify who is Responsible, Accountable, Consulted, and Informed for each deliverable.
3. **Set up the folder structure and naming conventions** -- Before anyone creates a document, agree on how files are organised. See [Document Control](./document-control).
4. **Establish the change request process** -- Agree on how changes will be proposed, reviewed, and approved. See [Change Management](./change-management).
5. **Populate the initial risk register** -- Capture known risks from the brief, site, and regulatory context. See [Risk Management](./risk-management).
6. **Align with BIM processes** -- If the project uses BIM, coordinate document control with the [BIM Execution Plan](/en/bim-integration/bep) and the [Common Data Environment](/en/bim-integration/cde).

::: warning
Do not skip the setup steps during Initiation. Retrofitting governance and document control mid-project is far more expensive than establishing it at the start.
:::

## Key Principles

- **Single source of truth.** Every document lives in one place, follows one naming convention, and has one current version.
- **Traceability.** Every decision, change, and risk is recorded with a date, an owner, and a reason.
- **Phase alignment.** PM activities are tied to the [8-phase workflow](/en/phases/initiation). Documents mature through phases, and controls tighten as the project advances.
- **Proportionality.** Scale the PM effort to the project. A small residential renovation needs lighter governance than a hospital complex. The frameworks here can be adapted.

## Related Sections

- [Quality Management](/en/quality/) -- Review procedures and phase gate checklists
- [BIM Integration](/en/bim-integration/) -- How document control interacts with the Common Data Environment
- [Regulations](/en/regulations/) -- Compliance tracking that feeds into risk and change management
- [Templates](/en/templates/) -- Ready-to-use templates for registers, logs, and checklists
