---
entityType: "commissioning_test"
id: "CT-AIRTIGHTNESS-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "Whole-building air-tightness test (blower-door)"
testCategory: "air_tightness"
status: "scheduled"

buildingId: "BLD-01"
testedEntityIds:
  - "ENV-EW-01"
requirementIds:
  - "REQ-PL-WT-328-001"            # WT 2021 § 328 envelope air permeability
  - "REQ-ENERGY-PERFORMANCE-001"   # implicit — energy class B depends on air-tightness

testProcedure:
  standard: "PN-EN ISO 9972 (replaces PN-EN 13829)"
  method: |
    Method 1 (test of the building in use) — depressurise + pressurise the
    whole building to ±50 Pa using a calibrated blower-door rig sealed into
    the main entrance, recording air-leakage rate at 10 Pa intervals from
    50 Pa down to 10 Pa, then derive n50 air-change rate at 50 Pa.
    All intentional openings (extract grilles, MVHR intake/exhaust) sealed
    during the test per the standard.
  equipment:
    - "Minneapolis Blower Door Model 3 + DG-1000 manometer"
    - "TESTO 480 environmental data logger"
    - "Smoke pencil + thermal camera for leak identification"
  conditions: |
    External wind speed < 6 m/s. Internal-external temperature differential
    ≥ 5 °C preferred for smoke/thermal leak visualisation. Building substantially
    complete (envelope fully sealed, no construction openings).

scheduledDate: "2026-02-20"
executedBy:
  name: "Marek Lis"
  organization: "PowietrzPro Sp. z o.o."
  qualification: "ATTMA Level 2 air-tightness tester"
  certificationNumber: "ATTMA-2456"
witnessedBy:
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architect of Record"

results:
  expected:
    n50: 1.5                       # air changes per hour at 50 Pa
    aT50: 1.2                      # m³/(h·m²) at 50 Pa, envelope area basis
  measured: null
  passCriteria:
    n50Max: 2.5                    # WT 2021 § 328 max for residential with MVHR
    targetN50: 1.5                 # design target for Energy Class B
  outcome: "pending"

constructionPackageId: "CP-ENVELOPE"

sources:
  - id: "SRC-CT-AIRTIGHTNESS-001-01"
    title: "Green Terrace — Commissioning Plan §4.2 (Envelope)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Anna Nowak + PowietrzPro Sp. z o.o."

tags:
  - "commissioning-artifact"
  - "energy-performance"

notes: |
  Air-tightness is the make-or-break test for the building's energy class.
  At n50 ≤ 1.5 the design supports Energy Class B (45 kWh/m²/year heating);
  at n50 > 2.5 the building fails to meet WT 2021. The 1.0 ACH margin
  between target and regulatory limit gives some construction tolerance,
  but a poorly-detailed reveal or a missed perimeter seal can easily double
  n50 — which is why the test happens during commissioning, not at handover.

  If n50 > 2.5, the failed-region thermography (smoke + thermal camera)
  identifies leak locations and a `non_conformance` issue must be raised
  for the envelope subcontractor to rectify before re-test.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — second commissioning-phase test demonstrating envelope verification"
---

# Commissioning Test — Air-tightness blower-door (CT-AIRTIGHTNESS-001)

Whole-building blower-door test to verify envelope air-tightness against
the Energy Class B design target and WT 2021 § 328 regulatory limit.

| Field | Value |
|---|---|
| Category | Air-tightness (PN-EN ISO 9972) |
| Status | Scheduled (2026-02-20) |
| Tested entity | ENV-EW-01 + all other envelope assemblies |
| Pass criteria | n50 ≤ 2.5 (regulatory), ≤ 1.5 (design target) |
| Outcome | Pending |

## Related

- [Envelope `ENV-EW-01`](../envelope-external-wall-type-a) — primary envelope assembly
- [Construction Package `CP-ENVELOPE`](../construction-packages/cp-envelope)
