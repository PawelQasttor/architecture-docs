# Tenant IEQ survey 2027 — Green Terrace

A non-entity narrative document summarising the 2027 Indoor Environmental
Quality survey returned by 12 of 18 apartments (67 % response rate).

> **Schema gap.** SBM v2.0 does not yet have a first-class entity for
> *occupant feedback / IEQ surveys*. The closest match is to extend
> `commissioning_test` with a survey variant, or to introduce a new
> `occupant_survey` entity. See [SCHEMA-GAPS](./SCHEMA-GAPS) §3 for the
> proposed shape.

## Headline results (n = 12 of 18 apartments)

| Dimension | Mean score (1-5) | % satisfied (≥ 4) | Notes |
|---|---|---|---|
| Overall apartment satisfaction | 4.3 | 92 % | High |
| Thermal comfort, winter | 4.4 | 92 % | High |
| Thermal comfort, summer | 3.7 | 67 % | **Flagged** — south-facing apartments overheat |
| Indoor air quality | 4.0 | 75 % | Generally good; apartment 4.02 reports "stuffy" |
| Acoustic privacy | 4.5 | 92 % | Design Class B paying off |
| Daylight | 4.6 | 100 % | Best-scoring dimension |
| Lighting (artificial) | 4.3 | 92 % | Common areas well-rated |

## Flagged concerns (verbatim, anonymised)

1. **"Bedroom gets stuffy at night, especially in summer"** — apartment 4.02
   (corroborates the [CO₂ sensor anomaly](./issues/ISS-ANOMALY-CO2-001))
2. **"Summer is too warm — afternoon temperature reaches 26-27 °C"** —
   apartments 4.01, 4.02, 4.03 (south-facing Level 04)
3. **"Heat pump makes a noise when starting"** — apartment 3.04 (after
   warranty replacement; consistent with [ISS-WARRANTY-HP-001](./issues/ISS-WARRANTY-HP-001))

## What's been actioned

- The CO₂ + stuffy-air feedback drove the [retro-commissioning issue](./issues/ISS-RETROCX-MVHR-001) — MVHR rebalanced 2027-08-30.
- The summer-overheating feedback prompted a study (commissioned 2027-10) into possible external shading retrofit. Study ongoing.
- The heat-pump noise feedback was tracked under the existing warranty issue; not a new action.

## What hasn't (yet)

- The summer-overheating cluster on Level 04 may need either external shading (capital cost) or operational adjustment (free cooling via night purge — needs control change). No decision yet.

## Method

- Paper + online survey, distributed 2027-09-01, closing date 2027-10-15
- 5-point Likert scale on 12 dimensions, plus free-text "biggest concern"
- Conducted by independent FM (GreenFM) — no incentive offered

## Reference data

Underlying anonymised responses: `surveys/BLD-01-IEQ-2027-responses.csv`
(external file; not part of the SBM model).

## Document metadata

| Field | Value |
|---|---|
| Survey period | 2027-09-01 → 2027-10-15 |
| Prepared by | GreenFM Sp. z o.o. |
| Reviewed by | Anna Nowak (Architect of Record) |
| Issued | 2027-11-30 |
| Status | Final |
