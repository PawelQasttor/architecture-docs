---
entityType: "retrocx_recommendation"
id: "RCX-MVHR-001"
version: "2.3.0"
projectPhase: "operation"

recommendationTitle: "MVHR airflow rebalance for Level 04 south-facing apartments"
buildingId: "BLD-01"

# What motivated this recommendation — the full causal chain
triggeredByIssueIds:
  - "ISS-ANOMALY-CO2-001"
triggeredBySurveyId: "SURVEY-BLD-01-IEQ-2027"
triggeredByTelemetryStreamId: "TEL-CO2-402-001"

# What the intervention affects
affectedSystemIds:
  - "SYS-HVAC-01"
affectedSpaceIds:
  - "SP-BLD-01-L04-002"      # only this one is in the example, but the rebalance
                              # in reality also covered SP-BLD-01-L04-001 and SP-BLD-01-L04-003
affectedAssetIds:
  - "AST-MVHR-01"

proposedIntervention: |
  Increase bedroom-diffuser supply on apartments 4.01, 4.02, 4.03 (Level
  04 south-facing cluster) from the original 60 m³/h to 70 m³/h
  (17 % increase). No hardware change required — purely a control + damper
  setting adjustment performed by the rebalancing contractor.

expectedOutcome:
  metric: "co2_90day_mean"
  affectedSpaceIds:
    - "SP-BLD-01-L04-002"
  currentValue: 1180          # ppm at time of recommendation (Aug 2027)
  targetValue: 1000           # design target — return to compliant
  unit: "ppm"

verificationPlan:
  method: |
    Re-measure 90-day rolling mean of CO2 in apartment 4.02 Bedroom 01
    one month after rebalance. If still > 1000 ppm, escalate to deeper
    investigation (MVHR fan curve, duct losses, occupant patterns).
  verificationTestId: null    # would be a CT-* entity if formal test scheduled
  verificationDueDate: "2027-09-30"

costEstimate_eur: 1200

status: "executed_awaiting_verification"
proposedDate: "2027-08-04"
executedDate: "2027-08-30"

tags:
  - "operation-phase-example"
  - "retrocx"
  - "v2-3-feature"

changelog:
  - version: "2.3.0"
    date: "2026-05-24"
    description: "First retrocx_recommendation entity — replaces the awkward use of generic Issue (issueType: design_clarification) with a proper retro-cx lifecycle entity. The original ISS-RETROCX-MVHR-001 stays as the contractor-facing work-order narrative; this entity is the data-quality + verification narrative."
---

# Retro-cx recommendation — MVHR rebalance (RCX-MVHR-001)

A `retrocx_recommendation` entity (**new in SBM v2.3**) for the
operation-phase pattern where measured performance triggers a corrective
intervention without changing the hardware design. Replaces the awkward
use of generic `issue` (`issueType: design_clarification`) in
[`ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001) with a
purpose-built lifecycle entity.

| Field | Value |
|---|---|
| Status | Executed, awaiting verification |
| Proposed | 2027-08-04 |
| Executed | 2027-08-30 |
| Verification due | 2027-09-30 |
| Cost | €1,200 |

## The full causal chain (only possible with v2.3)

This entity is the first place in the model where the **complete chain
of evidence + action** can be expressed as a single queryable record:

```
TEL-CO2-402-001  ← telemetry stream flagged threshold breach (Jun 2027)
       │
       ↓ triggered
ISS-ANOMALY-CO2-001  ← BMS analytics raised anomaly (Jul 2027)
       │
       ↓ corroborated by
SURVEY-BLD-01-IEQ-2027  ← occupant survey returned "stuffy" complaint (Sep 2027)
       │
       ↓ triggered
RCX-MVHR-001 (this entity)  ← retro-cx recommendation (Aug 2027)
       │
       ↓ executed by
[VentBalance rebalance work-order]  ← physical intervention (Aug 2027)
       │
       ↓ to be verified by
[1-month CO2 re-measure]  ← awaiting (due 2027-09-30)
```

`triggeredByIssueIds`, `triggeredBySurveyId`, `triggeredByTelemetryStreamId`,
`expectedOutcome`, and `verificationPlan` are all structured fields the
compiler can validate. Before v2.3 every link in this chain was a free-text
sentence in an Issue's `notes`.

## Status semantics

The `status` enum is **retro-cx specific**, not Issue-generic:

| Status | Meaning |
|---|---|
| `proposed` | Recommendation drafted; awaiting review |
| `under_review` | Being reviewed by design team / FM / client |
| `approved` | Authorised but not yet executed |
| `executed_awaiting_verification` | **← we are here** |
| `verified_successful` | Re-measure confirms expected outcome |
| `verified_failed` | Re-measure shows intervention didn't work; escalate |
| `rejected` | Not authorised |
| `deferred` | Authorised but deferred to future date |

## Related

- [`ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001) — the
  contractor-facing work-order narrative (kept as Issue; this RCX
  entity is the data-quality + lifecycle narrative)
- [`TEL-CO2-402-001`](../telemetry-streams/TEL-CO2-402-001) — telemetry source
- [`SURVEY-BLD-01-IEQ-2027`](../occupant-surveys/SURVEY-BLD-01-IEQ-2027) — survey corroboration
- [`ISS-ANOMALY-CO2-001`](../issues/ISS-ANOMALY-CO2-001) — original anomaly Issue
- [`SP-BLD-01-L04-002`](../spaces/bedroom-402) — affected space
