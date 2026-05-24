---
entityType: "issue"
id: "ISS-NC-AIRTIGHTNESS-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Non-conformance — 18-month air-tightness retest degraded from 1.6 to 1.7 ACH"
issueType: "non_conformance"
issueNumber: "NCR-001"
status: "under_review"
priority: "medium"

description: |
  The 18-month air-tightness retest (CT-AIRTIGHTNESS-001 second run) measured
  n50 = 1.7 ACH, against handover value of 1.6 and design target of 1.5.
  Building still meets WT 2021 § 328 regulatory limit (n50 ≤ 2.5) with
  comfortable margin, but the design margin has compressed and the in-use
  energy class (47 kWh/m²/year measured vs 45 design) reflects this slip.

  Inspection by envelope subcontractor + ATTMA tester traced the
  degradation to perimeter-seal wear on Level 04 south-facing window
  reveals — consistent with summer thermal-cycling stress on the
  silicone bead. Remediation scope: replace 12 perimeter seals
  (~€2,800), then retest. To be completed before 36-month service.

buildingId: "BLD-01"
relatedEntityIds:
  - "ENV-EW-01"
  - "CT-AIRTIGHTNESS-001"

initiatedBy:
  name: "Marek Lis"
  organization: "PowietrzPro Sp. z o.o."
  role: "air-tightness tester"
  date: "2027-08-25"
assignedTo:
  name: "PolFasada Sp. z o.o."
  organization: "Original envelope subcontractor"
  role: "remediation under 2-year defects period"
dueDate: "2028-02-15"            # before warranty end + retest at 36 months
responseDate: "2027-09-10"

response:
  respondedBy: "PolFasada Sp. z o.o."
  responseDate: "2027-09-10"
  responseText: |
    Inspection 2027-09-05 confirmed perimeter seal degradation on 12 of
    18 south-facing Level 04 window reveals. Cause: thermal cycling
    accelerated wear on the silicone bead specified for the original
    install (not a workmanship issue). Will replace 12 affected seals
    + add allowance for the remaining 6 if degradation continues.
    Estimated cost €2,800 — within 2-year defects period, no client charge.
    Scheduled work week 2028-01-15.

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "defects_period"
  notes: "Within 2-year envelope defects period — no charge to client."

scheduleImpact:
  estimatedDelayDays: 0

tags:
  - "operation-phase-example"
  - "non-conformance"
  - "energy-performance"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Non-conformance raised from 18-month retest, traced to seal wear, remediation under defects period — demonstrates the test→NCR→remediation→retest loop"
---

# Issue — Air-tightness non-conformance, perimeter seal degradation (ISS-NC-AIRTIGHTNESS-001)

A **non-conformance issue** raised from a routine retest. The building is
**still compliant with the regulation** but **out of conformance with the
design target** — and the design target matters because the in-use energy
class depends on it.

| Field | Value |
|---|---|
| Type | Non-conformance |
| Status | Under review (remediation scheduled) |
| Initiated | 2027-08-25 (CT-AIRTIGHTNESS retest result) |
| Remediation scheduled | 2028-01-15 |
| Cost | €0 (within 2-year defects period) |

## The lifecycle this issue exposes

A non-conformance traces back to a **scheduled test** that was set up
during commissioning, which itself was specified in the original
**design requirement**. The retest *is* the design's voice in operation —
without it, the air-tightness slip would have gone unnoticed for years
and the energy-class slip with it.

This is exactly the loop SBM is built to carry: requirement → test plan →
test execution → retest → non-conformance → remediation → retest. Each
step is a discrete entity; together they form the audit trail.
