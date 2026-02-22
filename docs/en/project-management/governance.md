---
title: Governance
description: RACI matrices, communication plans, decision logs, and stakeholder management for architecture projects.
---

# Governance

Governance defines who makes decisions, how information flows, and how accountability is maintained throughout the project. Clear governance prevents the most common source of project failure: ambiguity about who is responsible for what.

## RACI Matrix

A RACI matrix assigns one of four roles to each stakeholder for each key activity:

- **R -- Responsible:** Does the work
- **A -- Accountable:** Has final authority and sign-off (one person only)
- **C -- Consulted:** Provides input before a decision is made
- **I -- Informed:** Notified after a decision is made

### Template: Architecture Project RACI

| Activity | Client | Project Manager | Lead Architect | Structural Engineer | MEP Consultant | Contractor |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Define project brief | A | R | C | I | I | -- |
| Approve concept design | A | I | R | C | C | -- |
| Produce space documentation | I | I | R/A | C | C | -- |
| Structural calculations | I | I | C | R/A | C | -- |
| MEP system design | I | I | C | C | R/A | -- |
| Submit planning application | A | R | R | C | C | -- |
| Review construction docs | A | R | R | C | C | C |
| Approve change requests | A | R | C | C | C | C |
| Site inspection sign-off | I | R | C | C | C | R |
| Handover documentation | A | R | R | C | C | R |

::: tip
Every activity must have exactly one **A** (Accountable). If two people share accountability, nobody is accountable. Adjust this template to match your project's actual team structure.
:::

## Communication Plan

A communication plan removes guesswork about when meetings happen, what gets reported, and to whom.

### Recommended Meeting Cadence

| Meeting | Frequency | Attendees | Purpose | Output |
|---|---|---|---|---|
| Project steering | Monthly | Client, PM, Lead Architect | Strategic decisions, budget review, risk escalation | Steering meeting minutes |
| Design coordination | Fortnightly | Lead Architect, Structural, MEP | Technical coordination, clash resolution | Action log update |
| Progress review | Weekly | PM, Lead Architect | Track deliverables, schedule, open issues | Weekly status report |
| Site meeting | Weekly (during construction) | PM, Contractor, Lead Architect | Progress, quality, safety | Site meeting minutes |
| Document review | As needed | Reviewers per RACI | Review and approve documents at [phase gates](/en/quality/phase-gates) | Review comments, approval records |

### Reporting Schedule

| Report | Frequency | Author | Audience | Content |
|---|---|---|---|---|
| Project status report | Weekly | Project Manager | Client, Lead Architect | Progress, risks, issues, upcoming milestones |
| Design progress report | Fortnightly | Lead Architect | PM, Client | Document completion status, design decisions |
| Cost report | Monthly | Project Manager / QS | Client, Steering group | Budget vs. actual, forecast, change order impact |
| Risk report | Monthly | Project Manager | Steering group | Updated [risk register](./risk-management), new risks, closed risks |

::: info
All reports should reference document versions and status codes from the [Document Control](./document-control) system. This creates a traceable link between what was reported and the actual state of the documentation.
:::

## Decision Log

Decisions made verbally in meetings or emails are easily lost. A decision log creates a permanent, searchable record.

### What to Record

Every decision that affects scope, cost, schedule, design intent, or regulatory compliance should be logged. Examples include:

- Client selects a cladding material
- Team agrees to reduce the number of car parking spaces
- Structural engineer confirms a column grid change
- Planning authority requests a design amendment

### Decision Log Template

| Field | Description | Example |
|---|---|---|
| Decision ID | Unique identifier | DEC-042 |
| Date | Date the decision was made | 2025-03-15 |
| Decision | Clear statement of what was decided | Client approved stone cladding for the main facade |
| Rationale | Why this option was chosen | Preferred aesthetic; within budget; meets planning guidance |
| Made by | Person with authority (the **A** in RACI) | Jane Smith (Client) |
| Participants | Who was present or consulted | Lead Architect, PM, Cost Consultant |
| Impact | What documents, costs, or schedules are affected | Updates to facade system cards; cost increase of 12% on cladding package |
| Related documents | Links to affected documentation | `SY-BLD-01-EXT-003_facade-system_v2.1.md` |
| Status | Open / Confirmed / Superseded | Confirmed |

::: warning
A decision log is not a wish list. Only record decisions that have been **confirmed** by the accountable person. Pending items belong in the action log or [change management](./change-management) process.
:::

## Stakeholder Register

The stakeholder register identifies everyone with an interest in the project and records how to engage them.

### Stakeholder Register Template

| Field | Description |
|---|---|
| Name | Full name of the individual or organisation |
| Organisation | Company or body they represent |
| Role | Their function on the project (e.g., Client Representative, Planning Officer) |
| Interest | What they care about (e.g., budget, aesthetics, compliance, programme) |
| Influence | High / Medium / Low -- their power to affect decisions |
| Engagement level | Keep satisfied / Manage closely / Monitor / Keep informed |
| Contact | Email, phone |
| Notes | Any relevant context (e.g., "Reviews all facade designs personally") |

### Engagement Strategy by Quadrant

Use the classic influence-interest grid to determine your approach:

| | **Low Interest** | **High Interest** |
|---|---|---|
| **High Influence** | **Keep satisfied.** Provide regular summaries; involve in key decisions only. | **Manage closely.** Frequent communication; active involvement in reviews and decisions. |
| **Low Influence** | **Monitor.** Minimal effort; keep records up to date. | **Keep informed.** Regular updates; invite to reviews where relevant. |

::: tip
Update the stakeholder register at every phase transition. New stakeholders (such as the contractor) join mid-project, and influence levels shift as the project moves from design to construction.
:::

## Governance Checklist

Use this checklist at the start of each project to confirm governance is in place:

- [ ] RACI matrix drafted and agreed by all parties
- [ ] Communication plan issued to all stakeholders
- [ ] Meeting schedule set up with calendar invitations
- [ ] Decision log created and accessible to the team
- [ ] Stakeholder register populated with all known parties
- [ ] Reporting templates agreed and distributed
- [ ] Governance documents stored in the project folder per [Document Control](./document-control) conventions
- [ ] Alignment confirmed with [BIM Execution Plan](/en/bim-integration/bep) if applicable

## Related Pages

- [Project Management Overview](./)
- [Document Control](./document-control) -- How documents are named, versioned, and stored
- [Quality: Review Procedures](/en/quality/review-procedures) -- How reviews and approvals are conducted
- [Phase Gates](/en/quality/phase-gates) -- Gate criteria that governance activities feed into
