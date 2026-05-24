---
entityType: "commissioning_test"
id: "CT-AIRTIGHTNESS-001"
version: "2.1.0"
projectPhase: "operation"

testName: "Whole-building air-tightness test (blower-door) — EXECUTED + RETEST"
testCategory: "air_tightness"
status: "conditional_pass"

buildingId: "BLD-01"
testedEntityIds:
  - "ENV-EW-01"
requirementIds:
  - "REQ-PL-WT-328-001"
  - "REQ-ENERGY-PERFORMANCE-001"

testProcedure:
  standard: "PN-EN ISO 9972 (replaces PN-EN 13829)"
  method: "Method 1 — building in use. Two test runs: initial (2026-02-20) and 18-month retest (2027-08-25)."

scheduledDate: "2026-02-20"
executedDate: "2026-02-20"
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
    n50: 1.5
    aT50: 1.2
  measured:
    n50_initial: 1.6           # at handover — slightly above design target but well below regulatory
    n50_retest: 1.7            # at 18 months — degradation
    aT50_initial: 1.28
    aT50_retest: 1.36
    retestDate: "2027-08-25"
    retestReason: "Routine 18-month verification per commissioning plan. Result triggered NCR."
    measurementDate: "2026-02-20"
    notes: |
      Initial test 1.6 ACH at handover — exceeds design target 1.5 but
      comfortably within regulatory 2.5 limit. 18-month retest showed
      degradation to 1.7 ACH, traced to perimeter-seal wear on
      Level 04 south-facing window reveals (consistent with summer
      thermal-cycling stress).
  passCriteria:
    n50Max: 2.5
    targetN50: 1.5
  outcome: "conditional_pass"
  outcomeNotes: |
    Regulatory pass (1.7 ACH < 2.5 limit). Design-target failure (1.7 > 1.5).
    NCR raised — see ISS-NC-AIRTIGHTNESS-001.

constructionPackageId: "CP-ENVELOPE"

followUpIssueIds:
  - "ISS-NC-AIRTIGHTNESS-001"

sources:
  - id: "SRC-CT-AIRTIGHTNESS-001-OPS-01"
    title: "Green Terrace — Air-tightness Initial Test Report"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-20"
    author: "Marek Lis / PowietrzPro Sp. z o.o."
  - id: "SRC-CT-AIRTIGHTNESS-001-OPS-02"
    title: "Green Terrace — Air-tightness 18-month Retest Report"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2027-08-25"
    author: "Marek Lis / PowietrzPro Sp. z o.o."

tags:
  - "operation-phase-example"
  - "executed-test"
  - "energy-performance"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase execution of CT-AIRTIGHTNESS-001 — initial 1.6 ACH, 18-month retest 1.7 ACH, NCR raised"
---

# CT-AIRTIGHTNESS-001 — Executed (2026-02-20) + Retest (2027-08-25) — Conditional Pass

The whole-building air-tightness test scheduled in the
[design model](/en/examples/green-terrace/commissioning-tests/CT-AIRTIGHTNESS-001).
**Conditional pass**: the building meets WT 2021 § 328 with margin, but
both the initial test (1.6 ACH) and the 18-month retest (1.7 ACH) exceed
the 1.5 ACH design target needed to underwrite Class B energy performance
with the original margin.

| Measurement | Design target | Pass | Regulatory limit | Result |
|---|---|---|---|---|
| n50 at handover (2026-02) | 1.5 | conditional | ≤ 2.5 | **1.6** — pass regulatory, exceed design |
| n50 at 18 months (2027-08) | 1.5 | conditional | ≤ 2.5 | **1.7** — pass regulatory, exceed design (worse than initial) |

## Why this matters

The building still **meets the regulation** (n50 < 2.5), but the **design
margin has compressed**. The original energy calculation assumed n50 = 1.5
to deliver 45 kWh/m²/year. Measured 47 kWh/m²/year ([energy
verification](../energy-verification)) reflects this air-tightness slip.

The retest at 18 months also showed **degradation** — 0.1 ACH worse than
the handover number — which traced to perimeter-seal wear on Level 04
south-facing window reveals. The non-conformance issue
([ISS-NC-AIRTIGHTNESS-001](../issues/ISS-NC-AIRTIGHTNESS-001))
requires the envelope subcontractor to remediate before re-test at
36 months.
