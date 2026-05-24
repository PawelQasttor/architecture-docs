---
entityType: "space"
id: "SP-BLD-01-L04-002"
version: "2.1.0"
projectPhase: "operation"

spaceName: "Bedroom 01 in Apartment 4.02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
roomNumber: "4.02.1"
accessibilityLevel: "standard"

buildingId: "BLD-01"
levelId: "LVL-04"
# Zone memberships inherited from the design model — not duplicated here.
# Operation example focuses on what changes in operation, not what was
# specified at design.

designArea: 14.5
designVolume: 39.15
unit: "m"

# Operation-phase data — the actual measured conditions in this space
operationalData:
  occupancyStartDate: "2026-04-15"
  monthsOccupied: 21
  measuredEnvironment:
    avgCO2_ppm: 1180          # vs design target 1000 — anomaly flagged
    avgCO2_basis: "rolling 90-day mean from BMS sensor BMS-CO2-402-001"
    avgWinterTemp_C: 21.3     # within design 21-24°C
    avgSummerTemp_C: 25.8     # design 21-24°C — slightly exceeds in summer
    measurementPeriod: "2026-06 to 2028-01"
    dataSource: "external CSV: telemetry/SP-BLD-01-L04-002-bms-2026-06-to-2028-01.csv"
  occupantFeedback:
    surveyDate: "2027-09"
    overallSatisfaction: 4    # of 5
    flaggedConcerns:
      - "stuffy_air_at_night"
      - "summer_overheating"
    notes: "Occupant reports waking with headache 2-3 times a month, consistently after warmer days."

# Active operation-phase issue tied to this space
activeIssueIds:
  - "ISS-ANOMALY-CO2-001"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase bedroom — anchor space for the CO2 anomaly and occupant-feedback narrative"
---

# Bedroom 01, Apartment 4.02 — Operation Phase

The bedroom that triggered the operation-phase **CO₂ sensor anomaly**
and **occupant feedback about stuffy air**. Same space type as the
[design example's Bedroom 01](/en/examples/green-terrace/spaces/bedroom-01)
(both inherit from `ST-BEDROOM-STANDARD-A`).

| Property | Value |
|---|---|
| Months occupied | 21 |
| Avg CO₂ (BMS, 90-day rolling) | **1,180 ppm** (target: ≤ 1,000) |
| Avg winter temperature | 21.3 °C (target: 21-24) |
| Avg summer temperature | 25.8 °C (target: 21-24 — exceeds) |
| Occupant satisfaction | 4 / 5 |
| Flagged concerns | Stuffy air at night, summer overheating |
| Active issue | [ISS-ANOMALY-CO2-001](../issues/ISS-ANOMALY-CO2-001) |

## Why this matters

The room is **performing within the regulatory envelope** (CO₂ < 1,500 ppm
hard limit), but it is **falling short of the design target** (≤ 1,000 ppm).
The retro-commissioning recommendation
([`ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001)) proposes that
the MVHR airflow to this apartment cluster be re-balanced upward by 15 %
and the result re-measured for one month.

## The telemetry-shape gap

The `operationalData.measuredEnvironment.dataSource` field references an
**external CSV file** because SBM v2.0 has no first-class entity for
time-series telemetry. A proper `telemetry_stream` entity (proposed
in [SCHEMA-GAPS](../SCHEMA-GAPS)) would let the compiler:

- Compute the 90-day rolling means itself rather than reading our summary
- Detect threshold breaches automatically
- Render trend lines in the HTML report

For now, the summary statistics in `measuredEnvironment` are
human-asserted from the external CSV.
