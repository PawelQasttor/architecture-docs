# Post-occupancy energy verification — Green Terrace, 2027 annual

A non-entity narrative document summarising the 2027 annual energy
verification for Green Terrace. Wraps a reference to the external
metered-energy CSV.

> **Schema gap.** SBM v2.0 does not yet have a first-class entity for
> *in-use energy verification* (distinct from the design-phase energy
> simulation). The closest match is to extend the `commissioning_test`
> entity with an annual variant, or to introduce a new
> `energy_verification_record` entity. See [SCHEMA-GAPS](./SCHEMA-GAPS)
> §4 for the proposed shape.

## Headline result

| Metric | Design target | Measured 2027 | Status |
|---|---|---|---|
| Annual heating demand | 45 kWh/(m²·year) | **47 kWh/(m²·year)** | Class B confirmed; design margin narrower than expected |
| Annual cooling demand | 15 kWh/(m²·year) | 13 kWh/(m²·year) | Better than design |
| Primary energy | 85 kWh/(m²·year) | 88 kWh/(m²·year) | Within Class B band |
| Energy class | B | **B (confirmed)** | Pass |
| Renewable generation | 15 kWh/(m²·year) | 14 kWh/(m²·year) | Slightly below design |
| Net energy use | 65 kWh/(m²·year) | 70 kWh/(m²·year) | Within Class B band |

## Method

- **Measured energy**: full year of district-heating billing data (Jan-Dec 2027) + electricity billing data
- **Normalised** for actual occupant numbers, actual outside temperatures, actual hot-water consumption
- **Compared** against the design-phase EnergyPlus simulation result of 45 kWh/(m²·year)

## Why the result is 2 kWh/m²/year above design

Three factors contribute, roughly equally:

1. **Heat pump COP drift** — measured average COP 3.4 vs design 3.6 (see [AST-HP-01](./assets/ai-hp-01-ops))
2. **MVHR heat recovery drift** — measured 83 % vs design 85 % (see [AST-MVHR-01](./assets/ai-mvhr-01-ops))
3. **Air-tightness slip** — measured n50 1.7 vs design 1.5 (see [CT-AIRTIGHTNESS](./commissioning-tests/CT-AIRTIGHTNESS-001))

None is alarming alone; the cumulative effect is exactly the 2 kWh/m²/year
overage observed. Open work on all three is tracked via the operation-phase
issues (see [index](./)).

## Reference data

Underlying meter data: `telemetry/BLD-01-energy-meters-2027-annual.csv`
(external file; not part of the SBM model).

## Document metadata

| Field | Value |
|---|---|
| Period | 2027-01-01 → 2027-12-31 |
| Prepared by | Jan Wiśniewski (MEP Engineer of Record) |
| Reviewed by | Anna Nowak (Architect of Record) + GreenFM |
| Issued | 2028-02-10 |
| Status | Final |
