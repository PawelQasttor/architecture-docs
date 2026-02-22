---
title: Change Management
description: Change request templates, impact analysis, approval workflows, and documentation update procedures for architecture projects.
---

# Change Management

Change is inevitable in architecture projects. Clients refine their requirements, site surveys reveal unexpected conditions, regulations are updated, and budgets are revised. The purpose of change management is not to prevent change but to ensure every change is evaluated, approved, and recorded before it affects the project.

## When Changes Happen

Changes arise from many sources across the project lifecycle. The most common triggers are:

| Trigger | Example | Typical phase |
|---|---|---|
| Client request | "We need two additional meeting rooms on Level 3" | Any phase, most common in [Concept](/en/phases/concept) and [Design Development](/en/phases/design-development) |
| Site conditions | Ground investigation reveals rock where piling was planned | [Schematic](/en/phases/schematic) to [Construction](/en/phases/construction) |
| Regulation update | Updated fire safety code requires wider corridors | Any phase |
| Cost constraint | Value engineering to reduce cladding specification | [Design Development](/en/phases/design-development) to [Construction Docs](/en/phases/construction-docs) |
| Coordination clash | Structural beam conflicts with ductwork route | [Design Development](/en/phases/design-development) to [Construction](/en/phases/construction) |
| Planning condition | Local authority requires additional landscaping | [Concept](/en/phases/concept) to [Construction Docs](/en/phases/construction-docs) |

::: info
The later a change occurs, the more expensive it is. A room layout change during Concept may cost hours of documentation work. The same change during Construction may cost weeks and significant money. This is why the [phase gate](/en/quality/phase-gates) process exists -- to lock down decisions before the cost of change escalates.
:::

## Change Request Template

Every proposed change must be submitted as a formal Change Request (CR). The following fields are required:

| Field | Description | Example |
|---|---|---|
| CR Number | Unique identifier, sequential | CR-017 |
| Date raised | Date the change was first proposed | 2025-04-02 |
| Raised by | Person or organisation proposing the change | Client (J. Martinez) |
| Priority | Critical / High / Medium / Low (see definitions below) | High |
| Description | Clear statement of the proposed change | Add two meeting rooms (20m each) to Level 3 east wing, replacing open plan office area |
| Reason | Why the change is needed | Client's operational review identified a shortage of enclosed meeting spaces |
| Affected documents | List of document files that would need updating | SP-BLD-01-L03-008, SP-BLD-01-L03-009, ZN-BLD-01-L03-002, RQ-BLD-01-L03-005 |
| Affected BIM elements | Model elements requiring modification (if applicable) | Level 3 floor plan, partition walls, M&E routes |
| Status | Submitted / Under Review / Approved / Rejected / Deferred | Submitted |

### Priority Levels

| Priority | Definition | Expected response time |
|---|---|---|
| Critical | Stops construction or creates a safety risk | Within 24 hours |
| High | Affects the project programme or budget significantly | Within 1 week |
| Medium | Affects design intent but does not delay the programme | Within 2 weeks |
| Low | Minor improvement or clarification; no programme or cost impact | Next scheduled review meeting |

## Impact Analysis

Before a change is approved, its impact must be assessed across five areas. This prevents approving a change without understanding its consequences.

### Impact Assessment Checklist

| Area | Questions to answer | Who assesses |
|---|---|---|
| **Cost** | What is the estimated cost impact? Does it affect the contingency? | Cost Consultant / QS |
| **Schedule** | Does this delay any milestones? Does it affect the critical path? | Project Manager |
| **Compliance** | Does the change affect building regulations, planning conditions, or accessibility requirements? See [Regulations](/en/regulations/). | Lead Architect / Compliance lead |
| **BIM model** | Which model elements change? Are there new clashes? Is the [BIM Execution Plan](/en/bim-integration/bep) affected? | BIM Manager |
| **Documentation** | Which document files need a new version? Which requirement cards need updating? What status changes are needed? | Lead Architect / Document controller |

::: warning
Never approve a change without completing the impact analysis. A change that looks simple -- such as moving a door -- can affect fire escape routes, accessibility compliance, structural openings, and multiple document files.
:::

### Impact Summary Template

After assessment, summarise the impact in a single table attached to the Change Request:

| Impact area | Assessment | Detail |
|---|---|---|
| Cost | +GBP 18,000 | Additional partitioning, M&E rerouting, ceiling modifications |
| Schedule | +5 days | Affects Level 3 fit-out package; no critical path impact |
| Compliance | No impact | Meets minimum room sizes; no effect on escape routes |
| BIM model | 12 elements affected | Partition walls, 2 door openings, lighting layout, HVAC diffusers |
| Documentation | 6 files to update | 2 Space cards, 1 Zone card, 1 Requirement card, 1 System card, 1 Level card |

## Approval Workflow

The approval process follows a defined path. The people involved depend on the change priority and the project phase.

### Approval Steps

1. **Submit** -- The person requesting the change completes the CR template and submits it to the Project Manager.
2. **Log** -- The PM records the CR in the change log with a unique CR number.
3. **Assess** -- The PM distributes the CR to the relevant team members for impact analysis (see checklist above).
4. **Review** -- The PM compiles the impact assessment and presents it at the next design coordination meeting (or immediately for Critical priority).
5. **Decide** -- The accountable person (per the [RACI matrix](./governance)) approves, rejects, or defers the change.
6. **Implement** -- If approved, the Lead Architect assigns document updates to the responsible team members.
7. **Verify** -- The PM confirms all documentation has been updated and the change log is closed.

### Approval Authority by Priority

| Priority | Reviewer | Approver |
|---|---|---|
| Critical | PM + Lead Architect | Client |
| High | PM + Lead Architect | Client |
| Medium | Lead Architect | PM |
| Low | Lead Architect | Lead Architect |

## How Changes Update the Documentation

When a Change Request is approved, the following documentation updates are required:

### Version and Status Updates

1. **Identify affected files** from the CR's "Affected documents" field.
2. **Create new versions** of each affected file. Follow the [version numbering rules](./document-control#revision-tracking):
   - Design-intent changes trigger a **major** version bump (e.g., v1.2 to v2.0).
   - Corrections or clarifications trigger a **minor** version bump (e.g., v1.2 to v1.3).
3. **Update YAML frontmatter** in each file:
   - Increment the `version` field.
   - Add an entry to `version_history` referencing the CR number.
   - Set `status` to `draft` until the update is reviewed.
4. **Mark the previous version** as `superseded` once the new version is approved.

### Example: YAML Frontmatter After a Change

```yaml
---
id: SP-BLD-01-L03-008
title: Meeting Room 01
type: space
phase: design-development
status: draft
version: 2.0
version_history:
  - version: 1.0
    date: 2025-02-01
    author: A. Chen
    note: Initial draft as open plan office area
  - version: 2.0
    date: 2025-04-10
    author: A. Chen
    note: Converted to meeting room per CR-017
---
```

::: tip
Always reference the CR number in the version history note. This creates a direct link between the document change and the reason for that change, which is essential for audit trails and [quality reviews](/en/quality/review-procedures).
:::

## Change Log

Maintain a central change log as a project register. This is a single file (or spreadsheet) that lists every CR with its current status.

| CR No. | Date | Raised by | Description | Priority | Status | Decision date | Approved by |
|---|---|---|---|---|---|---|---|
| CR-015 | 2025-03-18 | Structural Eng. | Increase column size at grid C-4 | Medium | Approved | 2025-03-25 | Lead Architect |
| CR-016 | 2025-03-22 | Client | Add balcony to Unit 5 | High | Rejected | 2025-04-01 | Client |
| CR-017 | 2025-04-02 | Client | Add 2 meeting rooms, Level 3 | High | Under Review | -- | -- |

## Related Pages

- [Project Management Overview](./)
- [Document Control](./document-control) -- Version numbering and status codes
- [Governance](./governance) -- RACI matrix and decision authority
- [Risk Management](./risk-management) -- Changes that introduce new risks
- [Phase Gates](/en/quality/phase-gates) -- Gate criteria affected by open changes
- [BIM Execution Plan](/en/bim-integration/bep) -- Model change coordination
