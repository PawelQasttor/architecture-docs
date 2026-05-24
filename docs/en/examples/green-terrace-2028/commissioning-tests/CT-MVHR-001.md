---
entityType: "commissioning_test"
id: "CT-MVHR-001"
version: "2.1.0"
projectPhase: "operation"

testName: "MVHR airflow + heat-recovery efficiency — full-building balance (EXECUTED)"
testCategory: "balancing"
status: "conditional_pass"

buildingId: "BLD-01"
testedEntityIds:
  - "SYS-HVAC-01"
  - "AST-MVHR-01"
requirementIds:
  - "REQ-VENTILATION-OCCUPIED-001"

testProcedure:
  standard: "PN-EN 12599 (HVAC commissioning) + ISO 5801 (fan testing)"
  method: "As scheduled — see design-phase CT-MVHR-001."

scheduledDate: "2026-02-15"
executedDate: "2026-02-15"
executedBy:
  name: "Krzysztof Wójcik"
  organization: "VentBalance Sp. z o.o."
  qualification: "TR/TR 2/2018 certified balancer"
  certificationNumber: "TR-1234"
witnessedBy:
  - name: "Jan Wiśniewski"
    organization: "MEP Engineer of Record"
    role: "design representative"
  - name: "Maciej Szymański"
    organization: "Budimex S.A."
    role: "contractor representative"

results:
  expected:
    perApartmentSupply: 60
    perApartmentExtract: 110
    heatRecoveryEfficiency: 85
    specificFanPower: 0.45
  measured:
    perApartmentSupply_min: 54        # worst apartment (4.02)
    perApartmentSupply_avg: 58.5
    perApartmentSupply_max: 63
    perApartmentExtract_min: 102
    perApartmentExtract_avg: 108
    perApartmentExtract_max: 116
    heatRecoveryEfficiency: 83        # whole-building measured at design winter conditions
    specificFanPower: 0.47
    measurementDate: "2026-02-15"
    notes: "Apartment 4.02 supply 10 % low vs design; recommended further investigation."
  passCriteria:
    airflowTolerance: 10
    heatRecoveryMinimum: 80
    specificFanPowerMax: 0.5
  outcome: "conditional_pass"
  outcomeNotes: |
    All apartments within ±10 % tolerance for airflow. Heat recovery 83 %
    exceeds the 80 % minimum pass criterion but falls short of the 85 %
    design target. SFP 0.47 marginally above design 0.45 but within the
    0.5 W/(l/s) regulatory limit.

    Apartment 4.02 supply at the bottom of the tolerance band (60 - 10 % = 54 m³/h,
    measured exactly 54). This proves to be the apartment that later
    surfaces the CO₂ anomaly (see ISS-ANOMALY-CO2-001) and was
    rebalanced upward 18 months later under ISS-RETROCX-MVHR-001.

constructionPackageId: "CP-MEP"

# Operation-phase follow-up
followUpIssueIds:
  - "ISS-RETROCX-MVHR-001"     # rebalance recommendation 18 months in
  - "ISS-ANOMALY-CO2-001"      # downstream consequence in apartment 4.02

sources:
  - id: "SRC-CT-MVHR-001-OPS-01"
    title: "Green Terrace — MVHR Commissioning Test Report, 2026-02-15"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-15"
    author: "Krzysztof Wójcik / VentBalance Sp. z o.o."

tags:
  - "operation-phase-example"
  - "executed-test"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase execution of CT-MVHR-001 — conditional pass, surfaces the apartment 4.02 weakness that becomes the CO2 anomaly 21 months later"
---

# CT-MVHR-001 — Executed (2026-02-15) — Conditional Pass

The MVHR balancing test scheduled in the [design model](/en/examples/green-terrace/commissioning-tests/CT-MVHR-001),
**now executed**. Conditional pass: all 6 apartments tested within tolerance,
but apartment 4.02 sits at the bottom of the band and heat recovery (83 %)
exceeds the 80 % regulatory minimum but falls short of the 85 % design target.

| Metric | Design target | Pass criterion | Measured | Result |
|---|---|---|---|---|
| Per-apartment supply | 60 m³/h | ±10 % (54-66) | 54-63 (avg 58.5) | within tolerance |
| Per-apartment extract | 110 m³/h | ±10 % (99-121) | 102-116 (avg 108) | within tolerance |
| Heat recovery | 85 % | ≥ 80 % | **83 %** | pass (below design target) |
| Specific fan power | 0.45 W/(l/s) | ≤ 0.5 | 0.47 | pass |

## What this test produced

Two **downstream operation-phase issues**:

1. **[ISS-RETROCX-MVHR-001](../issues/ISS-RETROCX-MVHR-001)** — retro-commissioning recommendation 18 months later, to rebalance apartment 4.02 upward. Rebalance was executed 2027-08-30.
2. **[ISS-ANOMALY-CO2-001](../issues/ISS-ANOMALY-CO2-001)** — CO₂ readings in apartment 4.02 Bedroom 01 above design target, traced back to this test's low supply.

The compiler can now show the full chain: **test executed (cond pass) → tenant complaint surfaces 21 months later → CO₂ anomaly issue raised → retro-cx issue raised → rebalance executed → re-measure pending**. That kind of cross-entity lineage is exactly what the SBM model is built to carry.
