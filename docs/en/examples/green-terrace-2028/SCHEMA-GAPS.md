# SBM v2.2 — schema gaps surfaced by the operation-phase example

> **Update 2026-05-24 (later same day):** **ALL FIVE GAPS RESOLVED.**
> - Gaps #1 (`telemetry_stream`) + #2 (`asset.operationalHistory`)
>   shipped in SBM v2.2 (see `telemetry-streams/`).
> - Gaps #3 (`occupant_survey`) + #4 (`energy_verification_record`) +
>   #5 (`retrocx_recommendation`) shipped in SBM v2.3 (see
>   `occupant-surveys/`, `energy-verification-records/`,
>   `retrocx-recommendations/`).
>
> This document is kept as the historical record of why each entity
> type was added. The narrative companion pages
> (`tenant-survey-summary`, `energy-verification`) remain alongside
> the v2.3 entities as reader-friendly summaries.

Building the Green Terrace 2028 example revealed five places where the
v2.0 schema doesn't cleanly model what the operation phase needs. None
is fatal — every gap has a workable v2.0 representation — but each is
load-bearing enough that a proper v2.2 entity or field extension would
improve both authoring ergonomics and compiler capability.

This document is the **input list for a v2.2 standard review**. Each gap
has: (1) what it is, (2) where in the 2028 example it bit, (3) the v2.0
workaround used here, (4) the proposed v2.2 shape.

---

## 1. Time-series telemetry / sensor data

### What it is

Continuous numeric data streams from BMS, sub-meters, IoT devices —
the raw measurements that operation-phase analytics consume.

### Where it bit

Almost everywhere in this example:
- [`AST-HP-01`](./assets/ai-hp-01-ops): COP and runtime hours over 22 months
- [`AST-MVHR-01`](./assets/ai-mvhr-01-ops): heat-recovery efficiency trend
- [`SP-BLD-01-L04-002`](./spaces/bedroom-402): CO₂ 90-day rolling mean
- [`SYS-HVAC-01`](./systems/sys-hvac-01): system-wide uptime + COP
- Energy verification document: monthly meter readings for the year

### v2.0 workaround

A `dataSource` field pointing to an external CSV file path, with
human-asserted summary statistics (averages, trends) inline in the entity.
The compiler can't validate the underlying data, can't compute the
summaries itself, and can't detect threshold breaches.

### Proposed v2.2 shape

```yaml
entityType: "telemetry_stream"
id: "TEL-CO2-402-001"
sensorChannel: "co2_ppm"
sourceDeviceId: "BMS-CO2-402-001"
measuredEntityId: "SP-BLD-01-L04-002"
measuredEntityType: "space"
samplingFrequency: "5min"
unit: "ppm"
dataReference:
  protocol: "file_csv"          # or "bacnet" / "mqtt" / "api"
  path: "telemetry/SP-BLD-01-L04-002-co2-2026-04-to-2028-01.csv"
  fingerprint: "sha256:abc..."  # optional content hash
  rowCountAsOf: 184320
  periodStart: "2026-04-01T00:00:00Z"
  periodEnd: "2028-01-31T23:59:59Z"
summaryStatistics:                 # compiler-computed if data accessible; else human-asserted
  basis: "human_asserted"          # or "compiler_computed"
  rollingMeans:
    - window: "90d"
      value: 1180
      asOf: "2028-01-31"
  thresholds:
    - kind: "design_target"
      operator: "<="
      value: 1000
      currentlyExceeded: true
    - kind: "regulatory_limit"
      operator: "<="
      value: 1500
      currentlyExceeded: false
```

The compiler can then:
- Validate threshold-breach state across all telemetry streams
- Generate operation-phase compliance reports from real data
- Plot trends in the HTML report

---

## 2. Asset operational history

### What it is

Time-keyed records of runtime hours, service events, performance
parameters, parts replacements over an asset's life.

### Where it bit

All three operation-phase assets:
- [`AST-HP-01`](./assets/ai-hp-01-ops) — 5 service events + COP trend
- [`AST-MVHR-01`](./assets/ai-mvhr-01-ops) — 5 service events + heat-recovery trend
- [`AST-UFH-MANIFOLD-01`](./assets/ai-ufh-manifold-01-ops) — 4 service events + 2 zone-valve failures

### v2.0 workaround

Custom `operationalHistory` block added to the `asset` entity (the
schema allows `additionalProperties: true` on `asset` so the block validates
as opaque data). The compiler doesn't understand its contents.

### Proposed v2.2 shape

Extend the `asset` schema definition with an explicit
`operationalHistory` sub-schema:

```yaml
operationalHistory:
  required: false
  type: object
  properties:
    runtimeHours: { type: number, minimum: 0 }
    runtimeHoursAsOf: { type: string, format: date }
    cycleCount: { type: integer, minimum: 0 }
    energyConsumed_kWh: { type: number, minimum: 0 }
    servicedAt:
      type: array
      items:
        type: object
        required: [date, type]
        properties:
          date: { type: string, format: date }
          type: { type: string, enum: [planned_inspection, warranty_repair, unplanned_repair, parts_replacement, filter_change, rebalancing, recommissioning, decommission] }
          technician: { type: string }
          findings: { type: string }
          cost_eur: { type: number, minimum: 0 }
          relatedIssueId: { type: string }
    performanceTrend:
      type: object
      additionalProperties: true   # asset-type-specific
```

With this, the compiler's asset register target can:
- Compute total maintenance cost per asset
- Flag assets approaching end-of-life by cycle count
- Cross-link service events to the issues they resolved

---

## 3. Occupant survey / IEQ feedback

### What it is

Structured questionnaire responses from building occupants, scored
across multiple comfort/satisfaction dimensions.

### Where it bit

The [tenant survey summary](./tenant-survey-summary) — 12 of 18
apartments returned 12-dimension Likert-scale responses.

### v2.0 workaround

A narrative markdown document with a summary table; no entity backing.
Compiler can't aggregate, cross-reference, or trend survey scores
across years.

### Proposed v2.2 shape

```yaml
entityType: "occupant_survey"
id: "SURVEY-BLD-01-IEQ-2027"
surveyType: "ieq_satisfaction"
buildingId: "BLD-01"
period:
  start: "2027-09-01"
  end: "2027-10-15"
responseRate:
  invited: 18
  returned: 12
  percent: 67
dimensions:
  - name: "thermal_comfort_summer"
    scaleMax: 5
    meanScore: 3.7
    percentSatisfied: 67          # responses ≥ 4
    flagged: true                  # below internal threshold of 75 %
  - name: "thermal_comfort_winter"
    scaleMax: 5
    meanScore: 4.4
    percentSatisfied: 92
    flagged: false
  # ... etc
freeTextHighlights:                # optional anonymised quotes
  - text: "Bedroom gets stuffy at night"
    affectedEntityId: "SP-BLD-01-L04-002"
    triggeredIssueId: "ISS-ANOMALY-CO2-001"
dataReference:
  path: "surveys/BLD-01-IEQ-2027-responses.csv"
methodology:
  scale: "5-point Likert"
  conductor: "GreenFM Sp. z o.o."
  incentive: "none"
```

With this, the compiler can:
- Generate year-over-year trend reports
- Link flagged dimensions to triggered Issues
- Identify space clusters with shared complaints

---

## 4. In-use energy verification

### What it is

The annual energy reconciliation: measured energy use vs design prediction,
normalised for actual occupancy/weather, with a verdict on energy class.

### Where it bit

The [energy verification document](./energy-verification) — separate
from the design-phase EnergyPlus simulation, separate from the
commissioning-phase air-tightness test.

### v2.0 workaround

A narrative markdown document. The closest schema-recognised concept is
the design-phase `simulationStrategy` in `project-specification`, but
that captures *design predictions*, not *measured verifications*.

### Proposed v2.2 shape

```yaml
entityType: "energy_verification_record"
id: "EVR-BLD-01-2027"
buildingId: "BLD-01"
period:
  start: "2027-01-01"
  end: "2027-12-31"
  normalisedFor: ["actual_occupancy", "actual_weather", "actual_hwd"]
measured:
  heatingDemand: 47               # kWh/(m²·year)
  coolingDemand: 13
  primaryEnergy: 88
  netEnergyUse: 70
  renewableGeneration: 14
  energyClass: "B"
designTargets:
  heatingDemand: 45
  coolingDemand: 15
  primaryEnergy: 85
  netEnergyUse: 65
  energyClass: "B"
verdict: "design_target_exceeded_class_confirmed"
deltaAnalysis:
  - factor: "heat_pump_cop_drift"
    contribution_kWh_per_m2: 0.7
    attributedToAssetId: "AST-HP-01"
  - factor: "mvhr_hr_drift"
    contribution_kWh_per_m2: 0.5
    attributedToAssetId: "AST-MVHR-01"
  - factor: "airtightness_slip"
    contribution_kWh_per_m2: 0.8
    attributedToEntityId: "ENV-EW-01"
    relatedIssueId: "ISS-NC-AIRTIGHTNESS-001"
dataReference:
  path: "telemetry/BLD-01-energy-meters-2027-annual.csv"
```

---

## 5. Retro-commissioning recommendation as a first-class lifecycle

### What it is

The operation-phase pattern of "measured performance triggers a corrective
intervention without changing the hardware design". Sits in the awkward
space between Issue, Change Order, and Commissioning Test.

### Where it bit

[`ISS-RETROCX-MVHR-001`](./issues/ISS-RETROCX-MVHR-001) — currently
shoehorned into the generic `issue` entity with `issueType: design_clarification`.

### v2.0 workaround

Use `issue` entity with `issueType: "design_clarification"` and a
narrative body explaining what was retro-commissioned. Loses the
structured fields that would make retro-cx queryable.

### Proposed v2.2 shape

Either a new entity:

```yaml
entityType: "retrocx_recommendation"
id: "RCX-MVHR-001"
recommendationTitle: "MVHR airflow rebalance for Level 04 apartments"
triggeredByIssueIds: ["ISS-ANOMALY-CO2-001"]
triggeredBySurveyId: "SURVEY-BLD-01-IEQ-2027"
affectedSystemIds: ["SYS-HVAC-01"]
affectedSpaceIds: ["SP-BLD-01-L04-002", "SP-BLD-01-L04-001", "SP-BLD-01-L04-003"]
proposedIntervention: "Increase bedroom-diffuser supply from 60 to 70 m³/h"
expectedOutcome:
  metric: "co2_90day_mean"
  affectedSpaceIds: ["SP-BLD-01-L04-002"]
  currentValue: 1180
  targetValue: 1000
  unit: "ppm"
verificationPlan:
  method: "re-measure after 1 month of normal operation"
  verificationTestId: "CT-RECX-CO2-001"   # forward-link to the verification test
costEstimate_eur: 1200
status: "executed_awaiting_verification"
executedDate: "2027-08-30"
verificationDueDate: "2027-09-30"
```

Or as a sub-type of `issue` with a structured `retrocx` sub-block.

---

## Summary

| # | Gap | Priority for v2.2 | Workaround cost in v2.0 |
|---|---|---|---|
| 1 | Time-series telemetry | **High** — everything depends on it | Loose external-file references; no compiler validation |
| 2 | Asset operational history | **High** — touches every operational asset | Opaque object; loses compiler asset-register summaries |
| 3 | Occupant surveys | Medium | Narrative-only; no cross-year trending |
| 4 | In-use energy verification | Medium | Narrative-only; no auto-derived delta analysis |
| 5 | Retro-cx as first-class lifecycle | Low-medium | Generic Issue works but loses structured cross-links |

Items 1 and 2 are the **load-bearing** gaps — they constrain everything
else. A v2.2 standard release that addressed just those two would move
operation-phase modelling from "narrative + external files" to "compilable
+ queryable".
