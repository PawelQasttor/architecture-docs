---
entityType: "issue"
id: "ISS-BID-001"
version: "2.1.0"
projectPhase: "bidding_procurement"

issueTitle: "Bid Addendum 01 — clarify ventilated-cavity ties for External Wall Type A"
issueType: "design_clarification"
issueNumber: "BA-001"
status: "closed"
priority: "medium"

description: |
  During the open bid period, two of the three short-listed envelope
  subcontractors asked which proprietary cavity-tie system was assumed
  by the structural calculations for the ventilated-cavity rainscreen
  on External Wall Type A. The construction documents named "stainless-steel
  helical ties to manufacturer's specification" without naming a manufacturer,
  which left bidders to price three different products with materially
  different cost and installation rates.

  Addendum 01 resolves the ambiguity by naming Halfen HK4 as the basis-of-
  design product, while explicitly allowing equivalent products subject to
  structural-engineer approval. This levels the bid playing field without
  locking the contract to a single supplier.

buildingId: "BLD-01"
constructionPackageId: "CP-ENVELOPE"
relatedEntityIds:
  - "ENV-EW-01"

initiatedBy:
  name: "Tendering subcontractors (PolFasada Sp. z o.o. and Stylbud Sp. z o.o.)"
  organization: "External — bidding period"
  role: "bidder"
  date: "2026-03-08"
assignedTo:
  name: "Piotr Kowalski"
  organization: "Kowalski Structural Engineering"
  role: "Structural Engineer of Record"
dueDate: "2026-03-15"
responseDate: "2026-03-12"
closedDate: "2026-03-15"

response:
  respondedBy: "Piotr Kowalski"
  responseDate: "2026-03-12"
  responseText: |
    Basis-of-design product is Halfen HK4 stainless-steel helical cavity tie
    at 600 mm horizontal × 450 mm vertical centres (additional ties at
    openings per detail 04/A-501). Equivalent products from Ancon, Wienerberger
    or other manufacturers are acceptable subject to: (a) declared characteristic
    tensile + compressive resistance ≥ Halfen HK4 values per ETA-12/0260,
    (b) stainless-steel grade A4 (or equivalent), (c) submission of an EAD-compliant
    ETA + manufacturer installation guide as part of the subcontractor submittal.
  attachments:
    - "Addendum-01-CavityTies.pdf"
    - "Detail-04-A-501-Updated.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "envelope_subcontract"
  notes: "Equalises bids — does not change the project budget."

scheduleImpact:
  estimatedDelayDays: 0

sources:
  - id: "SRC-ISS-BID-001-01"
    title: "Green Terrace — Bid Addendum 01"
    type: "other"
    documentType: "addendum"
    date: "2026-03-12"
    author: "Project Architect (Anna Nowak) + Structural Engineer (Piotr Kowalski)"

tags:
  - "bidding-procurement-artifact"

notes: |
  Issued during the 3-week open bid period (2026-03-01 → 2026-03-22).
  Resolved before bids were due, so no extension was required.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — first bidding-phase artifact in the example"
---

# Issue — Bid Addendum 01: cavity ties (ISS-BID-001)

A **bidding-phase** design clarification triggered by subcontractor questions.
Resolved within the bid period without delaying the schedule or changing the
budget.

| Field | Value |
|---|---|
| Type | Design clarification (Addendum) |
| Number | BA-001 |
| Status | Closed |
| Initiated | 2026-03-08 (subcontractor RFI during bid period) |
| Responded | 2026-03-12 |
| Closed | 2026-03-15 |
| Cost impact | €0 — equalises bids |
| Schedule impact | 0 days |

## Why this entity exists

A real building project generates dozens of bid-phase clarifications. Before
v2.1 the example had **no `issue` entities at all**, even though they are a
first-class v2.0 entity type. Adding one **bidding-phase** issue shows how
the type/instance pattern extends to construction-administration artifacts:

- The issue references the **envelope construction package** (`CP-ENVELOPE`)
- And the specific **envelope entity** (`ENV-EW-01`) the clarification affects
- So the BIM federation and the asset register can later show *which*
  documents in a subcontractor submittal are responding to this clarification

## Related

- [Envelope `ENV-EW-01`](../envelope-external-wall-type-a)
- [Construction Package `CP-ENVELOPE`](../construction-packages/cp-envelope)
