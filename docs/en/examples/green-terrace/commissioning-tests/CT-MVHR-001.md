---
entityType: "commissioning_test"
id: "CT-MVHR-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "MVHR airflow + heat-recovery efficiency — full-building balance"
testCategory: "balancing"
status: "scheduled"

buildingId: "BLD-01"
testedEntityIds:
  - "SYS-HVAC-MVHR-01"
  - "AI-MVHR-01"
requirementIds:
  - "REQ-VENTILATION-OCCUPIED-001"

testProcedure:
  standard: "PN-EN 12599 (HVAC commissioning) + ISO 5801 (fan testing)"
  method: |
    Per-apartment supply/extract airflow measurement at each diffuser using
    a calibrated balometer (TSI 8380). Whole-building heat-recovery efficiency
    measured by paired upstream/downstream temperature + humidity sensors over
    a 24-hour winter period (target Δt > 15 °C across the unit). System then
    balanced against the design schedule and the as-balanced report issued.
  equipment:
    - "TSI 8380 balometer (calibration valid 2026-12)"
    - "Vaisala HMP155 T/RH probes (×4)"
    - "TESTO 480 multifunction meter"
  conditions: |
    External temperature ≤ 5 °C for the 24-hour heat-recovery measurement.
    All apartment doors closed. Bathroom extract dampers fully open.
    Test sequence to be repeated on 6 random apartments + the worst-case
    apartment (top floor, north-facing).

scheduledDate: "2026-02-15"
executedBy:
  name: "Krzysztof Wojcik"
  organization: "VentBalance Sp. z o.o."
  qualification: "TR/TR 2/2018 certified balancer"
  certificationNumber: "TR-1234"
witnessedBy:
  - name: "Jan Wiśniewski"
    organization: "MEP Engineer of Record"
    role: "design representative"
  - name: "Site engineer (TBC)"
    organization: "Budimex S.A."
    role: "contractor representative"

results:
  expected:
    perApartmentSupply: 60          # m³/h per occupied bedroom
    perApartmentExtract: 110        # m³/h whole-flat
    heatRecoveryEfficiency: 85      # % at design conditions
    specificFanPower: 0.45          # W/(l/s)
  measured: null                    # populated post-test
  passCriteria:
    airflowTolerance: 10            # % deviation from design
    heatRecoveryMinimum: 80         # %
    specificFanPowerMax: 0.5        # W/(l/s)
  outcome: "pending"

constructionPackageId: "CP-MEP"

sources:
  - id: "SRC-CT-MVHR-001-01"
    title: "Green Terrace — Commissioning Plan §5.3 (MVHR)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Jan Wiśniewski + VentBalance Sp. z o.o."

tags:
  - "commissioning-artifact"

notes: |
  This test verifies the **design assumption** from the bedroom-01 entity:
  60 m³/h fresh-air supply per occupant. If measured airflow is below the
  10 % tolerance, the system requires re-balancing before final acceptance.

  Heat-recovery efficiency below 80 % triggers a non-conformance issue
  (`issue` entity, type `non_conformance`) and re-test after rectification.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — first commissioning-phase test in the example"
---

# Commissioning Test — MVHR balancing (CT-MVHR-001)

The full-building **MVHR balancing test** scheduled for the commissioning
phase. Verifies that the as-installed mechanical ventilation system delivers
the airflows and heat-recovery efficiency assumed in design.

| Field | Value |
|---|---|
| Category | Balancing (PN-EN 12599) |
| Status | Scheduled (2026-02-15) |
| Tested entity | SYS-HVAC-MVHR-01 + AI-MVHR-01 asset |
| Verifies | REQ-VENTILATION-OCCUPIED-001 (60 m³/h per occupant) |
| Pass criteria | Airflow ±10 %, η ≥ 80 %, SFP ≤ 0.5 W/(l/s) |
| Outcome | Pending — populated after test |

## Why this entity exists

Before v2.1, **commissioning data was implicit**: the requirements specified
verification methods, but there was no entity to record that a test had been
scheduled, who would witness it, what equipment would be used, or what the
pass/fail outcome was.

A `commissioning_test` entity closes that loop. After the test executes, the
`results.measured` and `results.outcome` fields are populated, and downstream
the compliance report can show:

- Which requirements have been *verified* (test passed)
- Which are *pending verification* (test scheduled but not executed)
- Which have *failed verification* and need a non-conformance issue

## Related

- [System `SYS-HVAC-MVHR-01`](../systems/sys-hvac-01-vent) — MVHR ventilation system
- [Asset `AI-MVHR-01`](../assets/ai-mvhr-01) — installed MVHR unit
- [Construction Package `CP-MEP`](../construction-packages/cp-mep)
