---
entityType: "permit"
id: "PERMIT-WZ-001"
version: "2.4.0"
projectPhase: "construction_documents"

permitType: "zoning_decision"
permitTitle: "Decyzja o warunkach zabudowy (WZ) — Green Terrace"
status: "valid"
referenceNumber: "WZ/2025/0142"
issuingAuthority:
  name: "Prezydent Miasta — Wydział Architektury i Urbanistyki"
  nameEn: "City President — Department of Architecture and Urban Planning"
  authorityType: "municipal"
  jurisdiction: "Warszawa"
gatesPhase: "concept"
statutoryDeadlineDays: 60
submittedDate: "2025-01-20"
decisionDate: "2025-04-08"
validFrom: "2025-04-22"
conditions:
  - text: "Maximum building height 5 storeys / 16.0 m to eaves"
    status: "met"
  - text: "Minimum 25% biologically active (green) plot area"
    status: "met"
  - text: "Frontage line set 6.0 m from the northern plot boundary"
    status: "met"
prerequisiteDocuments:
  - "Site location map 1:500 (PODGiK extract)"
  - "Utility connection statements (water, sewer, power, district heating)"
  - "Conceptual development description"
feePaid:
  amount: 598
  currency: "PLN"
relatedEntityIds:
  - "BLD-01"
responsibility:
  discipline: "architectural"
  organization: "Pracownia Architektoniczna (lead designer)"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Permit: Land Development Conditions Decision (WZ)

Because no local zoning plan (MPZP) is in force for this plot, the project
followed the **WZ route** — a `decyzja o warunkach zabudowy` issued by the
municipal authority establishing the planning parameters that bound the
design.

## Role in delivery

This permit **gates the concept phase**: its parameters (height, green-area
ratio, frontage line) became the fixed envelope constraints carried forward
into [Building BLD-01](../building) and every downstream design decision. It
is a prerequisite document for the [building permit](./PERMIT-PB-001).

| Attribute | Value |
|-----------|-------|
| Instrument | Decyzja o warunkach zabudowy (WZ) |
| Authority | City President — Architecture & Urban Planning (municipal) |
| Statutory deadline | 60 days |
| Decision | 2025-04-08, final 2025-04-22 |
| Status | Valid |

All three conditions are met by the current design and verified at the
[Permit-ready gate](../approval-gates/GATE-PERMIT-READY).
