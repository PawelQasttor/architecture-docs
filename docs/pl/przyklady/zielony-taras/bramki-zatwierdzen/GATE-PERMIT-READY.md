---
entityType: "approval_gate"
id: "GATE-PERMIT-READY"
version: "2.4.0"
projectPhase: "construction_documents"

gateType: "permit_ready"
gateTitle: "Gotowość do pozwolenia — pozwolenie na budowę uzyskane, lista kontrolna przed budową"
gatePhase: "construction_documents"
status: "passed_with_actions"
decisionOwner:
  role: "investor"
  name: "Zielony Taras Sp. z o.o."
decisionDate: "2025-12-03"
prerequisites:
  - description: "Decyzja WZ ostateczna"
    met: true
    evidenceRef: "PERMIT-WZ-001"
  - description: "Pozwolenie na budowę wydane i ostateczne"
    met: true
    evidenceRef: "PERMIT-PB-001"
  - description: "Kierownik budowy ustanowiony"
    met: false
  - description: "Dziennik budowy (EDB) zarejestrowany"
    met: false
deliverableRefs:
  - "PERMIT-PB-001"
relatedPermitIds:
  - "PERMIT-WZ-001"
  - "PERMIT-PB-001"
relatedEntityIds:
  - "BLD-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Bramka zatwierdzenia: Gotowość do pozwolenia

Potwierdza, że projekt posiada ważne pozwolenie na budowę i domyka pozostałe
czynności przed rozpoczęciem robót na placu budowy.

## Decyzja

**Status: ZALICZONA Z DZIAŁANIAMI** (2025-12-03, właściciel: inwestor).

Autoryzacje administracyjne są na miejscu; dwa warunki operacyjne pozostają
otwarte i przechodzą do mobilizacji:

| Warunek | Spełniony |
|---------|-----------|
| [Decyzja WZ](../pozwolenia/PERMIT-WZ-001) ostateczna | ✅ |
| [Pozwolenie na budowę](../pozwolenia/PERMIT-PB-001) ostateczne | ✅ |
| Kierownik budowy ustanowiony | ⏳ otwarte |
| Dziennik budowy (EDB) zarejestrowany | ⏳ otwarte |

Dwa otwarte punkty odzwierciedlają warunki na
[PERMIT-PB-001](../pozwolenia/PERMIT-PB-001) i muszą zostać domknięte przed
bramką rozpoczęcia budowy.
