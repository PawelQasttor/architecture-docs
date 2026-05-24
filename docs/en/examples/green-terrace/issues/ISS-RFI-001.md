---
entityType: "issue"
id: "ISS-RFI-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "RFI 001 — slab edge condition at Level 05 green terrace upstand"
issueType: "rfi"
issueNumber: "RFI-001"
status: "responded"
priority: "high"

description: |
  During formwork installation on Level 05 (the green terrace level),
  the framework contractor identified that the construction documents
  show the slab edge upstand as 300 mm tall (Detail 12/A-503), but the
  structural drawings show it as 250 mm (Detail S-403). The discrepancy
  affects the rebar schedule and the green-roof drainage detail. Site
  is currently paused on the upstand pour pending clarification.

buildingId: "BLD-01"
constructionPackageId: "CP-STRUCTURE"
relatedEntityIds:
  - "STR-GREEN-TERRACE"
  - "ENV-EW-01"

initiatedBy:
  name: "Marek Nowicki"
  organization: "Budimex S.A. (general contractor)"
  role: "Site Engineer"
  date: "2026-04-22"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "Architect of Record"
dueDate: "2026-04-25"
responseDate: "2026-04-24"

response:
  respondedBy: "Anna Nowak (architecture) + Piotr Kowalski (structure)"
  responseDate: "2026-04-24"
  responseText: |
    The correct upstand height is 300 mm, matching the architectural detail.
    The structural drawing S-403 will be revised (issue date 2026-04-26).
    Reason: the 300 mm height is driven by the green-roof drainage build-up
    (75 mm drainage + 150 mm growing medium + 75 mm freeboard above finished
    growing medium) — it is dimensionally fixed and cannot be reduced.
    Proceed with formwork and rebar to 300 mm. Cost-impact and schedule-impact
    assessed as nil (formwork not yet stripped; rebar schedule revised before
    bar fabrication).
  attachments:
    - "RFI-001-Response-Sketch.pdf"
    - "S-403-Rev-B.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "structural_subcontract"
  notes: "No additional cost — rebar revision absorbed by detailer."

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Resolved within 48 h; no critical-path impact."

sources:
  - id: "SRC-ISS-RFI-001-01"
    title: "Green Terrace — RFI 001"
    type: "other"
    documentType: "rfi"
    date: "2026-04-22"
    author: "Budimex S.A."

tags:
  - "construction-artifact"

notes: |
  Demonstrates the value of cross-discipline coordination at the Document-
  Discovery stage of the example: the contractor flagged a mismatch the
  designers had missed, and the response references both the architectural
  and structural entities so the BIM federation can be updated consistently.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — first construction-phase RFI"
---

# Issue — RFI 001: slab edge upstand height (ISS-RFI-001)

A **construction-phase** Request For Information. The contractor identified
a mismatch between architectural and structural details. Resolved in 48 hours
with no cost or schedule impact.

| Field | Value |
|---|---|
| Type | RFI |
| Number | RFI-001 |
| Status | Responded |
| Initiated | 2026-04-22 (Budimex site engineer) |
| Responded | 2026-04-24 |
| Cost impact | €0 |
| Schedule impact | 0 days |

## Related

- [Structural System `STR-GREEN-TERRACE`](../structural-systems/STR-GREEN-TERRACE)
- [Envelope `ENV-EW-01`](../envelope-external-wall-type-a)
- [Construction Package `CP-STRUCTURE`](../construction-packages/cp-structure)
