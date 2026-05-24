---
entityType: "issue"
id: "ISS-INSPECTION-FD-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Annual fire inspection — Level 02 fire door perimeter seal degradation"
issueType: "inspection"
issueNumber: "INSP-2027-04"
status: "responded"
priority: "high"

description: |
  Annual fire inspection conducted by Warsaw Fire Brigade Station 12 on
  2027-11-15 identified perimeter seal wear on the EI 30 fire door at
  Level 02 stairwell entry (door OPN-DOOR-STAIR-02). Seal compression
  measured 40 % of as-installed value, dropping the door's effective fire
  rating from EI 30 to an estimated EI 20 (below regulatory minimum).

  Replacement seal ordered + installed within 14 days; re-inspection
  scheduled to confirm restoration to EI 30.

buildingId: "BLD-01"
relatedEntityIds:
  - "OPN-DOOR-STAIR-01"
  - "VC-STAIR-A"
  - "CR-FIRE-EGRESS-L01"

initiatedBy:
  name: "Captain Krzysztof Borowski"
  organization: "Warsaw Fire Brigade — Station 12"
  role: "regulatory inspector"
  date: "2027-11-15"
assignedTo:
  name: "GreenFM Sp. z o.o."
  organization: "FM contractor"
  role: "remediation"
dueDate: "2027-11-29"
responseDate: "2027-11-28"

response:
  respondedBy: "GreenFM Sp. z o.o."
  responseDate: "2027-11-28"
  responseText: |
    Replacement EI 30 perimeter seal kit ordered from original door
    manufacturer 2027-11-16. Installed 2027-11-26. Seal compression
    re-measured post-installation: nominal as-installed value. Re-inspection
    by Warsaw Fire Brigade scheduled 2027-12-10.

costImpact:
  estimatedDeltaEur: 320
  appliesTo: "operations_budget"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Resolved within regulatory 14-day remediation window."

tags:
  - "operation-phase-example"
  - "regulatory-inspection"
  - "safety-critical"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Annual fire inspection finding — seal wear, replaced within regulatory window. Demonstrates regular-inspection lifecycle."
---

# Issue — Annual fire inspection, fire-door seal degradation (ISS-INSPECTION-FD-001)

A **regulatory inspection** issue. Annual fire-brigade inspection found a
component degradation that, while not catastrophic, would have failed
a fire test. Remediated within the 14-day regulatory window.

| Field | Value |
|---|---|
| Type | Inspection (regulatory) |
| Status | Responded (re-inspection scheduled) |
| Initiated | 2027-11-15 (Warsaw Fire Brigade) |
| Resolved | 2027-11-28 |
| Cost | €320 (seal kit + labour) |

## What this issue shows

Operation-phase models need to capture **regulatory-inspection events**,
not just discovered defects. The annual fire inspection is a *scheduled*
event that may or may not generate findings; this one did. The issue
references both the affected opening and the upstream circulation route —
so a query like "what issues have ever affected our primary fire egress?"
returns this record.
