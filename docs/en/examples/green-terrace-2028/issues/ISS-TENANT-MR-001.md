---
entityType: "issue"
id: "ISS-TENANT-MR-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Tenant maintenance request — bathroom waste leak, apartment 4.02"
issueType: "field_observation"
issueNumber: "TMR-001"
status: "closed"
priority: "medium"

description: |
  Tenant of apartment 4.02 reported a slow leak from the bathroom waste
  pipe at the floor-to-wall junction. Water ingress not visible to
  apartments below (caught by waterproofing membrane). Plumbing
  subcontractor returned under 12-month workmanship guarantee.

buildingId: "BLD-01"
relatedEntityIds:
  - "SP-BLD-01-L04-002"
  - "SYS-HVAC-01"

initiatedBy:
  name: "Tenant (apartment 4.02)"
  organization: "Resident"
  role: "occupant"
  date: "2026-09-08"
assignedTo:
  name: "PlumbingPro Sp. z o.o."
  organization: "Original plumbing subcontractor"
  role: "12-month workmanship guarantee"
dueDate: "2026-09-15"
responseDate: "2026-09-11"
closedDate: "2026-09-12"

response:
  respondedBy: "PlumbingPro Sp. z o.o."
  responseDate: "2026-09-11"
  responseText: |
    Inspected apartment 4.02 bathroom 2026-09-09. Confirmed slow leak at
    P-trap connection (incorrect compression-fit during install). Joint
    reworked + pressure-tested. No remedial work required on waterproofing
    membrane — caught the leak before any structural penetration. Repair
    covered under 12-month workmanship guarantee.

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "12_month_warranty"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Resolved in 3 days. Apartment 4.02 bathroom out of service for 2 hours during repair."

tags:
  - "operation-phase-example"
  - "tenant-request"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Tenant maintenance request — bathroom waste leak, resolved under 12-month workmanship guarantee"
---

# Issue — Tenant maintenance request, apartment 4.02 (ISS-TENANT-MR-001)

A routine **tenant-initiated** operation-phase issue. Caught early by the
tenant, resolved under workmanship guarantee, no damage downstream.

| Field | Value |
|---|---|
| Type | Field observation / tenant request |
| Status | Closed |
| Initiated | 2026-09-08 (tenant) |
| Closed | 2026-09-12 |
| Cost | €0 (12-month guarantee) |

The example includes this issue to demonstrate that **tenant-reported
maintenance requests** are first-class operation-phase entities — they
belong in the model alongside warranty claims and non-conformances. In
a real building these accumulate by the dozen per year.
