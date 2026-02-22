---
title: Risk Management
description: Risk registers, assessment matrices, mitigation strategies, and phase-specific risk guidance for architecture projects.
---

# Risk Management

Every architecture project carries risk. Sites present unexpected ground conditions, planning authorities impose new requirements, costs escalate, and contractors encounter problems. Risk management does not eliminate these uncertainties -- it ensures they are identified early, evaluated honestly, and addressed before they become crises.

## Common Architecture Project Risks

The following risks appear frequently across projects of all sizes. Use this list as a starting point when populating your risk register.

| Category | Risk example |
|---|---|
| Planning and approvals | Planning permission refused or delayed; listed building consent conditions |
| Budget | Cost overrun due to material price increases or scope creep |
| Programme | Delays from late consultant input, slow client decisions, or procurement lead times |
| Site conditions | Contaminated land, unexpected ground conditions, neighbouring structure constraints |
| Regulatory | Mid-project changes to building regulations or fire safety codes |
| Design coordination | Clashes between structural and MEP designs discovered late |
| Contractor | Contractor insolvency, quality issues, or disputes over variations |
| Supply chain | Long lead times for specified materials; product discontinuation |
| Stakeholder | Change of client representative; conflicting stakeholder priorities |
| Environmental | Flood risk, protected species on site, noise restrictions |

## Risk Register Template

The risk register is the central record of all identified risks, their assessment, and their mitigation. Maintain it as a living document, reviewed at every steering meeting and updated at each [phase gate](/en/quality/phase-gates).

### Register Fields

| Field | Description | Example |
|---|---|---|
| Risk ID | Unique identifier | RSK-014 |
| Date identified | When the risk was first recorded | 2025-02-10 |
| Category | Classification (see table above) | Site conditions |
| Description | Clear statement of what could go wrong | Ground investigation may reveal rock at foundation depth, requiring piled foundations instead of strip footings |
| Probability | Likelihood of occurrence: Low / Medium / High | Medium |
| Impact | Consequence if it occurs: Low / Medium / High | High |
| Risk rating | Derived from probability x impact (see matrix below) | High |
| Mitigation | Actions to reduce probability or impact | Commission ground investigation before end of Concept phase; include piling contingency in budget |
| Owner | Person responsible for managing this risk | Structural Engineer (P. Novak) |
| Status | Open / Mitigating / Closed | Open |
| Related documents | Documentation files linked to this risk | RQ-BLD-01-L00-002_foundation-type_v1.0.md |
| Last reviewed | Date of most recent review | 2025-03-15 |

### Example Risk Register Entries

| Risk ID | Description | Prob. | Impact | Rating | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|
| RSK-001 | Planning authority may require additional heritage assessment | High | Medium | High | Engage heritage consultant in Initiation phase | Lead Architect | Mitigating |
| RSK-002 | Steel prices may increase by more than 10% before procurement | Medium | High | High | Obtain early quotes; include 15% contingency on steelwork | QS | Open |
| RSK-003 | Client may request additional floor during Design Development | Low | High | Medium | Clarify brief scope in writing; agree change freeze date | PM | Open |
| RSK-004 | Acoustic requirements may not be met with current wall build-up | Medium | Medium | Medium | Request acoustic consultant review at Schematic phase gate | Lead Architect | Open |

## Risk Assessment Matrix

Use this matrix to determine the overall risk rating from the combination of probability and impact.

| | **Low Impact** | **Medium Impact** | **High Impact** |
|---|:---:|:---:|:---:|
| **High Probability** | Medium | High | Critical |
| **Medium Probability** | Low | Medium | High |
| **Low Probability** | Low | Low | Medium |

### How to Respond by Rating

| Rating | Required response |
|---|---|
| **Critical** | Immediate action required. Escalate to Client and PM. Cannot proceed to next phase gate without a mitigation plan in place. |
| **High** | Active mitigation required. Assign an owner and a deadline. Review weekly. Report at steering meetings. |
| **Medium** | Monitor and plan. Assign an owner. Review at each phase gate. |
| **Low** | Accept and monitor. Record in the register but no active mitigation needed unless circumstances change. |

::: warning
Never leave a Critical or High risk without an assigned owner and a mitigation action. Risks without owners do not get managed.
:::

## Phase-Specific Risks

Different project phases carry different risk profiles. The table below highlights the dominant risks at each phase, so you can focus your attention where it matters most.

| Phase | Key risks | Recommended actions |
|---|---|---|
| [Initiation](/en/phases/initiation) | Unclear brief, unrealistic budget, unknown site constraints | Validate the brief with the client; commission site surveys; benchmark costs |
| [Concept](/en/phases/concept) | Planning refusal, stakeholder disagreement on design direction | Early pre-application discussion with planning authority; stakeholder workshops |
| [Schematic](/en/phases/schematic) | Design does not meet spatial or regulatory requirements | Cross-check space cards against [requirement cards](/en/templates/); conduct compliance review |
| [Design Development](/en/phases/design-development) | Coordination clashes between disciplines, scope creep | Run clash detection in the [BIM model](/en/bim-integration/); enforce [change management](./change-management) |
| [Construction Docs](/en/phases/construction-docs) | Incomplete or inconsistent documentation, late consultant input | Use the [quality review procedure](/en/quality/review-procedures) checklist; set consultant deadlines |
| [Construction](/en/phases/construction) | Contractor delays, quality defects, unforeseen site conditions | Weekly site inspections; maintain a defects log; review [risk register](./risk-management) at site meetings |
| [As-Built](/en/phases/as-built) | Documentation does not reflect what was actually built | Require contractor to submit as-built mark-ups; verify against BIM model |
| [Handover](/en/phases/handover) | Missing O&M manuals, incomplete training, defects at handover | Start handover checklist early; tie final payment to documentation completeness |

## How Risks Connect to Documentation

Risks do not exist in isolation. They are linked to specific parts of the building documentation.

### Linking Risks to Requirement Cards

When a risk relates to a specific building requirement, reference the requirement card in the risk register's "Related documents" field. For example:

- **RSK-004** (acoustic risk) links to `RQ-BLD-01-L01-007_acoustic-performance_v1.0.md`
- **RSK-001** (heritage risk) links to `RQ-BLD-01-EXT-001_heritage-compliance_v1.0.md`

This link serves two purposes:

1. When reviewing a requirement card, you can check whether any open risks affect it.
2. When reviewing the risk register, you can quickly navigate to the requirement that is at stake.

### Linking Risks to Compliance Checks

For risks related to [regulations](/en/regulations/), connect the risk register entry to the relevant compliance check. If a regulation changes mid-project, raise a [Change Request](./change-management) and update both the risk register and the affected requirement cards.

::: tip
During each [phase gate review](/en/quality/phase-gates), include a risk register summary. The gate should not close if any Critical risks remain open without a mitigation plan, or if High risks have no assigned owner.
:::

## Risk Management Checklist

Use this checklist to confirm your risk management process is active and effective:

- [ ] Risk register created and populated at project start
- [ ] All risks assigned an owner
- [ ] Risk assessment matrix applied to every entry
- [ ] Critical and High risks have documented mitigation actions
- [ ] Risk register reviewed at every steering meeting
- [ ] Risk register updated at every [phase gate](/en/quality/phase-gates)
- [ ] Risks linked to relevant documentation files (requirement cards, system cards)
- [ ] New risks from [Change Requests](./change-management) added to the register
- [ ] Closed risks retained in the register for audit trail
- [ ] Risk report included in monthly reporting per the [communication plan](./governance#communication-plan)

## Related Pages

- [Project Management Overview](./)
- [Governance](./governance) -- Roles responsible for risk ownership and escalation
- [Change Management](./change-management) -- How changes introduce or resolve risks
- [Phase Gates](/en/quality/phase-gates) -- Gate criteria that reference risk status
- [Regulations](/en/regulations/) -- Regulatory risks and compliance tracking
- [BIM Integration](/en/bim-integration/) -- Using the model to identify coordination risks
