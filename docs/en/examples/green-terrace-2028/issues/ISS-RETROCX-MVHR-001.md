---
entityType: "issue"
id: "ISS-RETROCX-MVHR-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Retro-commissioning recommendation — MVHR airflow rebalance for Level 04 apartments"
issueType: "design_clarification"
issueNumber: "RCX-001"
status: "responded"
priority: "medium"

description: |
  Following the CO₂ anomaly (ISS-ANOMALY-CO2-001) in apartment 4.02
  and corroborating tenant feedback from the 2027 IEQ survey,
  GreenFM and the MEP Engineer of Record jointly recommend a partial
  retro-commissioning of MVHR airflows to the three Level 04 south-facing
  apartments (4.01, 4.02, 4.03).

  Proposed: increase bedroom-diffuser supply on these apartments from
  the original 60 m³/h to 70 m³/h (17 % increase, taking them from the
  bottom of the tolerance band to the top). Whole-building SFP rechecked
  to ensure regulatory compliance maintained.

buildingId: "BLD-01"
relatedEntityIds:
  - "AST-MVHR-01"
  - "SYS-HVAC-01"
  - "SP-BLD-01-L04-002"

initiatedBy:
  name: "Jan Wiśniewski + GreenFM"
  organization: "MEP Engineer + FM contractor"
  role: "joint recommendation"
  date: "2027-08-04"
assignedTo:
  name: "Krzysztof Wójcik"
  organization: "VentBalance Sp. z o.o."
  role: "rebalancing contractor"
dueDate: "2027-09-15"
responseDate: "2027-08-30"

response:
  respondedBy: "Krzysztof Wójcik (VentBalance)"
  responseDate: "2027-08-30"
  responseText: |
    Full rebalance executed 2027-08-30 per recommendation. Bedroom diffuser
    supply increased from 60 to 70 m³/h on apartments 4.01, 4.02, 4.03.
    Whole-building SFP rechecked at 0.48 W/(l/s) — marginally above
    design 0.45 but well within 0.5 regulatory limit. Cost €1,200.

    Awaiting 1-month re-measure of CO₂ levels in apartment 4.02 Bedroom 01
    to confirm anomaly resolved (target ≤1,000 ppm 90-day rolling mean).

costImpact:
  estimatedDeltaEur: 1200
  appliesTo: "operations_budget"

scheduleImpact:
  estimatedDelayDays: 0

tags:
  - "operation-phase-example"
  - "retro-commissioning"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Retro-commissioning recommendation that became a rebalance — demonstrates the operation-phase action loop"
---

# Issue — Retro-commissioning recommendation, MVHR rebalance (ISS-RETROCX-MVHR-001)

A **retro-commissioning recommendation** — the operation-phase pattern
where measured performance drives a corrective intervention without any
hardware change.

| Field | Value |
|---|---|
| Type | Design clarification (retro-cx) |
| Status | Responded (rebalance executed; awaiting re-measure) |
| Initiated | 2027-08-04 (joint MEP + FM) |
| Executed | 2027-08-30 |
| Cost | €1,200 |

## The schema-gap angle

Retro-commissioning fits awkwardly inside the `issue` entity type — it's
neither an RFI (no question) nor a change order (no design change) nor a
non-conformance (the building isn't out of spec). A first-class
`retrocx_recommendation` entity in v2.2 would have:

- Explicit `triggeredBy` field (links to issues + tests that motivated it)
- `expectedOutcome` field (the measurable result this should produce)
- `verificationPlan` field (how + when the outcome will be measured)
- Tighter cross-link to the affected systems' baseline performance

See [SCHEMA-GAPS](../SCHEMA-GAPS) for the proposed shape.
