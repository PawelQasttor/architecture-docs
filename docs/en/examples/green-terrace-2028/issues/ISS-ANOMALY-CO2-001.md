---
entityType: "issue"
id: "ISS-ANOMALY-CO2-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "CO₂ sensor anomaly — apartment 4.02 Bedroom 01 consistently above design target"
issueType: "field_observation"
issueNumber: "ANOM-CO2-001"
status: "under_review"
priority: "medium"

description: |
  CO₂ sensor BMS-CO2-402-001 in apartment 4.02 Bedroom 01 has been logging
  90-day rolling mean of 1,180 ppm, against the design target of ≤1,000 ppm
  (regulatory hard limit 1,500 ppm — building is compliant). Tenant has
  separately reported "stuffy air at night" in the 2027 IEQ survey,
  corroborating the sensor data.

  Root cause hypothesised to be **insufficient MVHR supply** to this
  bedroom — the original commissioning test (CT-MVHR-001) confirmed
  supply at 54 m³/h (10 % below the 60 m³/h design), at the bottom of
  the ±10 % tolerance band. See related retro-commissioning
  recommendation ISS-RETROCX-MVHR-001.

buildingId: "BLD-01"
relatedEntityIds:
  - "SP-BLD-01-L04-002"
  - "AST-MVHR-01"
  - "SYS-HVAC-01"

initiatedBy:
  name: "GreenFM BMS analytics"
  organization: "GreenFM Sp. z o.o."
  role: "automated anomaly detection (90-day rolling threshold)"
  date: "2027-07-15"
assignedTo:
  name: "Jan Wiśniewski + Krzysztof Wójcik"
  organization: "MEP Engineer of Record + VentBalance"
  role: "diagnostic investigation"

# Open issue — no closed date
dueDate: "2027-09-30"

costImpact:
  estimatedDeltaEur: 1200
  appliesTo: "operations_budget"
  notes: "Rebalance cost — see ISS-RETROCX-MVHR-001 for the execution"

tags:
  - "operation-phase-example"
  - "sensor-anomaly"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase anomaly — CO2 sensor consistently above design target, tied to design-marginal MVHR supply; triggered retro-cx recommendation"
---

# Issue — CO₂ anomaly, apartment 4.02 Bedroom 01 (ISS-ANOMALY-CO2-001)

A **sensor-driven** operation-phase issue: automated 90-day rolling-mean
detection flagged this bedroom as systematically above the design CO₂
target. Tenant survey response 2 months later corroborated.

| Field | Value |
|---|---|
| Type | Field observation (sensor anomaly) |
| Status | Under review (rebalance executed; awaiting 1-month re-measure) |
| Initiated | 2027-07-15 (BMS analytics) |
| Due | 2027-09-30 |
| Linked to | [CT-MVHR-001 conditional pass](../commissioning-tests/CT-MVHR-001), [tenant survey](../tenant-survey-summary), [ISS-RETROCX-MVHR-001](./ISS-RETROCX-MVHR-001) |

## What this issue shows

The chain of evidence is **what makes SBM useful in operation**:
- Original commissioning test flagged this apartment at the bottom of the tolerance band.
- BMS detected the consequence (CO₂ drift) 16 months later.
- Tenant survey independently corroborated 2 months after that.
- Retro-cx issue raised to rebalance; rebalance executed; awaiting verification.

Without the cross-entity references this would be three disconnected
observations. With them it's one diagnosable story.
