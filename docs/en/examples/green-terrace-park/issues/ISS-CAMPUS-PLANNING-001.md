---
entityType: "issue"
id: "ISS-CAMPUS-PLANNING-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "Planning condition 14b — Phase-2 wayfinding signage scheme"
issueType: "design_clarification"
issueNumber: "PC-14B"
status: "responded"
priority: "medium"

description: |
  Warsaw city planning condition 14b (attached to the campus master plan
  approval, 2024-11-20) requires a coordinated wayfinding signage scheme
  covering all 4 campus buildings + shared amenities, to be submitted
  for approval before Phase-2a building (BLD-02) handover. Scheme must
  use a single visual identity across all buildings, comply with PN-EN
  ISO 7010 pictograms, and address accessibility per WT 2021 § 56.

  This is a **campus-scope issue** — it affects all 4 buildings but
  belongs to none of them individually. The Campus entity is the right
  owner.

# Campus-scope, not building-scope
campusId: "CAM-GREEN-TERRACE-PARK"
relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"
  - "SF-PLAYGROUND"
  - "SF-BIKE-STORAGE"
  - "SF-EV-HUB"
  - "SF-COMMUNAL-GARDEN"

initiatedBy:
  name: "Warsaw City Planning Department"
  organization: "Wydział Architektury i Budownictwa, m.st. Warszawa"
  role: "planning authority"
  date: "2024-11-20"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "campus design coordinator"
dueDate: "2027-06-30"
responseDate: "2027-04-15"

response:
  respondedBy: "Anna Nowak + brand-consultancy (Studio Marka)"
  responseDate: "2027-04-15"
  responseText: |
    Coordinated wayfinding scheme submitted to Wydział Architektury 2027-04-15.
    Scheme uses the Green Terrace brand identity (sage green + dark wood)
    consistently across all 4 buildings. PN-EN ISO 7010 pictograms used
    throughout. Tactile + Braille signage at accessible-route decision
    points (compliant with WT 2021 § 56). Awaiting approval.

costImpact:
  estimatedDeltaEur: 14500
  appliesTo: "operations_budget"
  notes: "Design + production cost spread across all 4 buildings"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Planning condition was always inside the BLD-02 commissioning critical path; no slippage."

sources:
  - id: "SRC-ISS-CAMPUS-PC-14B-01"
    title: "Decyzja o pozwoleniu na budowę — Zielony Taras Park, warunek 14b"
    type: "regulatory_code"
    documentType: "planning_decision"
    date: "2024-11-20"
    author: "Wydział Architektury, m.st. Warszawa"

tags:
  - "campus-example"
  - "campus-scope-issue"
  - "regulatory"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus-scope planning condition — demonstrates an Issue owned by the Campus, not by any single Building"
---

# Issue — Planning condition 14b, wayfinding signage (ISS-CAMPUS-PLANNING-001)

A **campus-scope** Issue — it affects all 4 buildings but belongs to none
of them individually. Warsaw city planning attached a coordinated-wayfinding
condition to the master plan approval; the response is a single signage
scheme spanning the whole campus.

| Field | Value |
|---|---|
| Type | Design clarification (planning condition) |
| Status | Responded (awaiting approval) |
| Initiated | 2024-11-20 (planning decision) |
| Responded | 2027-04-15 (scheme submitted) |
| Due | 2027-06-30 (before BLD-02 handover) |
| Cost | €14,500 (spread across 4 buildings) |

## Why this Issue belongs to the Campus

A Building-scope Issue would only show against one building. A regulatory
condition that requires a *coordinated* response across multiple buildings
sits structurally above all of them. The Campus entity is the right owner.

This is the same pattern as `SF-PLAYGROUND` or `CP-SITE-INFRASTRUCTURE` —
things that genuinely don't belong to any one Building, modelled
explicitly at Campus scope rather than awkwardly assigned to "whichever
building was nearest".
