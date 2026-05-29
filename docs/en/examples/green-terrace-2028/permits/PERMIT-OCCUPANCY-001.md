---
entityType: "permit"
id: "PERMIT-OCCUPANCY-001"
version: "2.4.0"
projectPhase: "operation"

permitType: "occupancy_permit"
permitTitle: "Pozwolenie na użytkowanie — Green Terrace (BLD-01)"
status: "valid"
referenceNumber: "PINB.5142.0098.2026"
issuingAuthority:
  name: "Powiatowy Inspektorat Nadzoru Budowlanego (PINB)"
  nameEn: "County Building Control Authority (PINB)"
  authorityType: "building_control_pinb"
  jurisdiction: "Warszawa"
gatesPhase: "operation"
statutoryDeadlineDays: 60
submittedDate: "2026-05-04"
decisionDate: "2026-06-19"
validFrom: "2026-07-03"
conditions:
  - text: "Mandatory PINB occupancy inspection passed (>4 storeys building)"
    status: "met"
  - text: "As-built geodetic survey registered with PODGiK"
    status: "met"
  - text: "Fire-protection acceptance from straż pożarna on file"
    status: "met"
prerequisiteDocuments:
  - "Construction log (EDB export)"
  - "Site manager completion + cleanup declarations"
  - "As-built geodetic survey (PODGiK)"
  - "Energy performance certificate"
  - "Test protocols: electrical, gas, chimney/ventilation, water"
feePaid:
  amount: 135
  currency: "PLN"
relatedEntityIds:
  - "BLD-01"
responsibility:
  discipline: "other"
  organization: "Green Terrace Sp. z o.o. (investor)"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Permit: Occupancy Permit (Pozwolenie na użytkowanie)

Because Green Terrace is **over 4 storeys**, the project required the
**occupancy-permit route** (not the lighter completion-notice route): PINB
conducted a mandatory inspection before authorizing occupation.

## Role in delivery

This permit is the **gate into the operation phase** — it authorized the
building to be occupied and triggered the start of the statutory inspection
regime now tracked by the
[annual](../inspections/INSP-ANNUAL-2027) and
[5-year](../inspections/INSP-5YEAR-DUE-2028) inspections.

| Attribute | Value |
|-----------|-------|
| Instrument | Pozwolenie na użytkowanie |
| Authority | PINB (building control) |
| Route | Occupancy permit (mandatory inspection) |
| Fee | 135 PLN (25% of building-permit fee) |
| Decision | 2026-06-19, valid from 2026-07-03 |
| Status | Valid |

> Handover to operation was confirmed at the
> [Completion-authorized gate](../approval-gates/GATE-COMPLETION-AUTHORIZED).
