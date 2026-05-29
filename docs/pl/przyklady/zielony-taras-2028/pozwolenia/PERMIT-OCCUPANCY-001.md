---
entityType: "permit"
id: "PERMIT-OCCUPANCY-001"
version: "2.4.0"
projectPhase: "operation"

permitType: "occupancy_permit"
permitTitle: "Pozwolenie na użytkowanie — Zielony Taras (BLD-01)"
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
  - text: "Obowiązkowa kontrola PINB zakończona (budynek > 4 kondygnacji)"
    status: "met"
  - text: "Geodezyjna inwentaryzacja powykonawcza zarejestrowana w PODGiK"
    status: "met"
  - text: "Odbiór przeciwpożarowy straży pożarnej w aktach"
    status: "met"
prerequisiteDocuments:
  - "Dziennik budowy (eksport EDB)"
  - "Oświadczenia kierownika budowy o zakończeniu i uporządkowaniu"
  - "Geodezyjna inwentaryzacja powykonawcza (PODGiK)"
  - "Świadectwo charakterystyki energetycznej"
  - "Protokoły badań: elektryczne, gazowe, kominowe/wentylacja, wodne"
feePaid:
  amount: 135
  currency: "PLN"
relatedEntityIds:
  - "BLD-01"
responsibility:
  discipline: "other"
  organization: "Zielony Taras Sp. z o.o. (inwestor)"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Pozwolenie: Pozwolenie na użytkowanie

Ponieważ Zielony Taras ma **ponad 4 kondygnacje**, projekt wymagał **ścieżki
pozwolenia na użytkowanie** (a nie lżejszej ścieżki zawiadomienia o
zakończeniu budowy): PINB przeprowadził obowiązkową kontrolę przed
dopuszczeniem do użytkowania.

## Rola w procesie realizacji

To pozwolenie jest **bramą do fazy eksploatacji** — dopuściło budynek do
użytkowania i uruchomiło ustawowy reżim przeglądów śledzony teraz przez
przeglądy [roczny](../przeglady/INSP-ANNUAL-2027) i
[pięcioletni](../przeglady/INSP-5YEAR-DUE-2028).

| Atrybut | Wartość |
|---------|---------|
| Instrument | Pozwolenie na użytkowanie |
| Organ | PINB (nadzór budowlany) |
| Ścieżka | Pozwolenie na użytkowanie (obowiązkowa kontrola) |
| Opłata | 135 PLN (25% opłaty za pozwolenie na budowę) |
| Decyzja | 2026-06-19, ważne od 2026-07-03 |
| Status | Ważne |

> Przekazanie do eksploatacji potwierdzono na
> [bramce autoryzacji zakończenia](../bramki-zatwierdzen/GATE-COMPLETION-AUTHORIZED).
