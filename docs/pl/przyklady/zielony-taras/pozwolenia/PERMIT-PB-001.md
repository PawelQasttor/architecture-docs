---
entityType: "permit"
id: "PERMIT-PB-001"
version: "2.4.0"
projectPhase: "construction_documents"

permitType: "building_permit"
permitTitle: "Pozwolenie na budowę — Zielony Taras (BLD-01)"
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
  - text: "Kierownik budowy musi zostać ustanowiony przed rozpoczęciem robót"
    status: "open"
  - text: "Dziennik budowy (EDB) zarejestrowany przed pierwszym wpisem robót"
    status: "open"
prerequisiteDocuments:
  - "PERMIT-WZ-001 (decyzja WZ, ostateczna)"
  - "PZT — projekt zagospodarowania terenu"
  - "PAB — projekt architektoniczno-budowlany"
  - "Oświadczenie o prawie do dysponowania nieruchomością na cele budowlane"
  - "Opinia geotechniczna"
feePaid:
  amount: 539
  currency: "PLN"
appealOfPermitId: "PERMIT-WZ-001"
relatedEntityIds:
  - "BLD-01"
responsibility:
  discipline: "architectural"
  organization: "Pracownia Architektoniczna (główny projektant)"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Pozwolenie: Pozwolenie na budowę

Główna decyzja autoryzująca projekt. Wydana przez organ administracji
architektoniczno-budowlanej w ustawowym terminie **65 dni** od kompletnego
wniosku.

## Rola w procesie realizacji

To pozwolenie **otwiera fazę budowy** — żadne roboty nie mogą się legalnie
rozpocząć, dopóki nie jest ostateczne i dopóki nie zostaną spełnione dwa
otwarte warunki (ustanowienie kierownika budowy, rejestracja dziennika
budowy). Warunki te są śledzone jako wymagania na
[bramce gotowości do pozwolenia](../bramki-zatwierdzen/GATE-PERMIT-READY).

| Atrybut | Wartość |
|---------|---------|
| Instrument | Pozwolenie na budowę (PB-1) |
| Organ | Administracja architektoniczno-budowlana (powiat) |
| Termin ustawowy | 65 dni |
| Decyzja | 2025-11-18, ostateczna 2025-12-03 |
| Ważne do | 2028-12-03 (roboty muszą ruszyć w ciągu 3 lat) |
| Status | Ważne |

> Oparte na ostatecznej [decyzji WZ](./PERMIT-WZ-001), której parametry
> planistyczne to pozwolenie potwierdza jako spełnione.
