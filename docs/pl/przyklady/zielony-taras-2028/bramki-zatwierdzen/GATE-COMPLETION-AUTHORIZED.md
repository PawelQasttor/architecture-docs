---
entityType: "approval_gate"
id: "GATE-COMPLETION-AUTHORIZED"
version: "2.4.0"
projectPhase: "operation"

gateType: "completion_authorized"
gateTitle: "Autoryzacja zakończenia — pozwolenie na użytkowanie wydane, przekazanie do eksploatacji"
gatePhase: "commissioning"
status: "passed"
decisionOwner:
  role: "authority"
  name: "PINB (Powiatowy Nadzór Budowlany)"
decisionDate: "2026-06-19"
prerequisites:
  - description: "Pozwolenie na użytkowanie wydane"
    met: true
    evidenceRef: "PERMIT-OCCUPANCY-001"
  - description: "Wszystkie testy rozruchowe wykonane (MVHR, szczelność, próbna ewakuacja)"
    met: true
    evidenceRef: "CT-MVHR-001"
  - description: "Cyfrowa Książka Obiektu Budowlanego (c-KOB) założona"
    met: true
  - description: "Instrukcje O&M + gwarancje przekazane zarządcy budynku"
    met: true
deliverableRefs:
  - "PERMIT-OCCUPANCY-001"
relatedPermitIds:
  - "PERMIT-OCCUPANCY-001"
relatedEntityIds:
  - "BLD-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Bramka zatwierdzenia: Autoryzacja zakończenia

Zawias cyklu życia między **budową/rozruchem a eksploatacją**. Przejście tej
bramki oznaczało formalne przekazanie Zielonego Tarasu jego operatorowi.

## Decyzja

**Status: ZALICZONA** (2026-06-19, decyzja PINB przy wydaniu pozwolenia na
użytkowanie).

| Warunek | Spełniony |
|---------|-----------|
| [Pozwolenie na użytkowanie](../pozwolenia/PERMIT-OCCUPANCY-001) wydane | ✅ |
| Testy rozruchowe wykonane | ✅ |
| Cyfrowa Książka Obiektu (c-KOB) założona | ✅ |
| Instrukcje O&M + gwarancje przekazane | ✅ |

Założenie c-KOB na tym etapie umożliwia rejestrowanie eksploatacyjnych
[przeglądów ustawowych](../przeglady/INSP-ANNUAL-2027) w ustawowym rejestrze
od pierwszego dnia.
