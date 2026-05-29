---
entityType: "permit"
id: "PERMIT-PB-001"
version: "2.4.0"
projectPhase: "construction_documents"

permitType: "building_permit"
permitTitle: "Pozwolenie na budowę — Green Terrace (BLD-01)"
status: "valid"
referenceNumber: "AB.6740.0337.2025"
issuingAuthority:
  name: "Starosta — Organ Administracji Architektoniczno-Budowlanej"
  nameEn: "County Architecture-and-Building Administration Authority"
  authorityType: "architecture_building_admin"
  jurisdiction: "Warszawa"
gatesPhase: "construction"
statutoryDeadlineDays: 65
submittedDate: "2025-09-15"
decisionDate: "2025-11-18"
validFrom: "2025-12-03"
expiryDate: "2028-12-03"
appealDeadline: "2025-12-02"
conditions:
  - text: "Kierownik budowy (site manager) must be appointed before works start"
    status: "open"
  - text: "Construction log (EDB) registered before first works entry"
    status: "open"
prerequisiteDocuments:
  - "PERMIT-WZ-001 (zoning decision, final)"
  - "PZT — site development plan"
  - "PAB — architectural & construction design"
  - "Right-to-build statement (oświadczenie o prawie do dysponowania nieruchomością)"
  - "Geotechnical opinion"
feePaid:
  amount: 539
  currency: "PLN"
appealOfPermitId: "PERMIT-WZ-001"
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

# Permit: Building Permit (Pozwolenie na budowę)

The main authorizing decision for the project. Issued by the county
architecture-and-building administration authority within the statutory
**65-day** window from a complete application.

## Role in delivery

This permit **gates the construction phase** — no works may legally begin
until it is final and the two outstanding conditions (site-manager
appointment, construction-log registration) are satisfied. Those conditions
are tracked as prerequisites on the
[Permit-ready gate](../approval-gates/GATE-PERMIT-READY).

| Attribute | Value |
|-----------|-------|
| Instrument | Pozwolenie na budowę (PB-1) |
| Authority | County architecture-and-building admin |
| Statutory deadline | 65 days |
| Decision | 2025-11-18, final 2025-12-03 |
| Valid until | 2028-12-03 (works must start within 3 years) |
| Status | Valid |

> Built on the final [WZ decision](./PERMIT-WZ-001), whose planning
> parameters this permit confirms as satisfied.
