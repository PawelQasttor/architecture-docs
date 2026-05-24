---
entityType: "occupant_survey"
id: "SURVEY-BLD-01-IEQ-2027"
version: "2.3.0"
projectPhase: "operation"

surveyType: "ieq_satisfaction"
surveyTitle: "Green Terrace 2027 annual IEQ survey"
buildingId: "BLD-01"

period:
  start: "2027-09-01"
  end: "2027-10-15"

responseRate:
  invited: 18
  returned: 12
  percent: 67

dimensions:
  - name: "overall_satisfaction"
    scaleMax: 5
    meanScore: 4.3
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "thermal_comfort_winter"
    scaleMax: 5
    meanScore: 4.4
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "thermal_comfort_summer"
    scaleMax: 5
    meanScore: 3.7
    percentSatisfied: 67
    flagged: true            # below 75% internal threshold
    satisfactionThreshold: 4
  - name: "indoor_air_quality"
    scaleMax: 5
    meanScore: 4.0
    percentSatisfied: 75
    flagged: false
    satisfactionThreshold: 4
  - name: "acoustic_privacy"
    scaleMax: 5
    meanScore: 4.5
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "daylight"
    scaleMax: 5
    meanScore: 4.6
    percentSatisfied: 100
    flagged: false
    satisfactionThreshold: 4
  - name: "lighting_artificial"
    scaleMax: 5
    meanScore: 4.3
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4

freeTextHighlights:
  - text: "Bedroom gets stuffy at night, especially in summer"
    respondentApartmentId: "APT-4.02-ANON"
    affectedEntityId: "SP-BLD-01-L04-002"
    affectedEntityType: "space"
    triggeredIssueId: "ISS-ANOMALY-CO2-001"
  - text: "Summer is too warm — afternoon temperature reaches 26-27 C"
    respondentApartmentId: "APT-4.01-4.02-4.03-CLUSTER-ANON"
    affectedEntityId: "LVL-04"
    affectedEntityType: "level"
    triggeredIssueId: null    # study commissioned but no Issue yet
  - text: "Heat pump makes a noise when starting"
    respondentApartmentId: "APT-3.04-ANON"
    affectedEntityId: "AST-HP-01"
    affectedEntityType: "asset"
    triggeredIssueId: "ISS-WARRANTY-HP-001"

methodology:
  scale: "5-point Likert"
  conductor: "GreenFM Sp. z o.o."
  incentive: "none"
  deliveryMethod: "hybrid"     # paper + online

dataReference:
  protocol: "file_csv"
  path: "surveys/BLD-01-IEQ-2027-responses.csv"

preparedBy: "GreenFM Sp. z o.o."
reviewedBy: "Anna Nowak (Architect of Record)"

tags:
  - "operation-phase-example"
  - "occupant-feedback"
  - "v2-3-feature"

changelog:
  - version: "2.3.0"
    date: "2026-05-24"
    description: "First occupant_survey entity in the example — replaces the narrative tenant-survey-summary with a queryable v2.3 entity. The summary narrative remains as a reader-friendly companion page."
---

# Occupant survey — Green Terrace 2027 annual IEQ (SURVEY-BLD-01-IEQ-2027)

An `occupant_survey` entity (**new in SBM v2.3**) wrapping the 2027
annual IEQ survey results. Replaces the v2.0/v2.2 narrative-only
[tenant-survey-summary](../tenant-survey-summary) (which stays as a
readable companion page) with a queryable first-class entity.

| Field | Value |
|---|---|
| Survey type | IEQ satisfaction |
| Period | 2027-09-01 → 2027-10-15 |
| Response rate | **12 of 18 apartments** (67 %) |
| Dimensions scored | 7 |
| Flagged dimensions | 1 (thermal_comfort_summer — 67 % satisfied, below 75 % threshold) |
| Free-text highlights | 3, each linked to affected entity + triggered issue (where applicable) |
| Conductor | GreenFM Sp. z o.o. |
| Delivery | Paper + online (hybrid) |

## What v2.3 makes possible

Before v2.3 this information lived as a narrative summary table. The
compiler couldn't:
- **Aggregate** dimensions across multiple surveys (year-on-year trending)
- **Cross-link** flagged free-text responses to the entities + Issues they triggered
- **Query** "show me every space with a flagged occupant complaint in the last 12 months"

With the v2.3 `occupant_survey` entity, each `freeTextHighlights` entry
carries an `affectedEntityId` + `triggeredIssueId` — so the survey
response that complained about "stuffy bedroom" is now machine-linked
to space `SP-BLD-01-L04-002` and Issue `ISS-ANOMALY-CO2-001`.

## Related

- [Tenant survey summary narrative](../tenant-survey-summary) — the
  reader-friendly companion page (kept alongside this entity)
- [`SP-BLD-01-L04-002`](../spaces/bedroom-402) — affected space (CO₂ anomaly)
- [`ISS-ANOMALY-CO2-001`](../issues/ISS-ANOMALY-CO2-001) — triggered by this survey
- [`RCX-MVHR-001`](../retrocx-recommendations/RCX-MVHR-001) — retro-cx response that this survey corroborated
