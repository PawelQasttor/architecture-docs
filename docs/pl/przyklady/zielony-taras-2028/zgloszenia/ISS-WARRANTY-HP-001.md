---
entityType: "issue"
id: "ISS-WARRANTY-HP-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Zatarcie sprężarki pompy ciepła w ramach gwarancji — wymieniono"
issueType: "non_conformance"
issueNumber: "WAR-HP-001"
status: "closed"
priority: "high"

description: |
  Sprężarka pompy ciepła AST-HP-01 zatarła się w 14 miesiącu eksploatacji
  (~9 800 godzin pracy). Utrata ogrzewania do mieszkań obsługiwanych przez
  pierwotny obieg grzewczy przez ~6 godzin podczas diagnozy; awaryjna
  rezystancja elektryczna utrzymała obciążenie. Autoryzowany serwis Bosch
  potwierdził defekt partii i wymienił w ramach gwarancji bezkosztowo.

buildingId: "BLD-01"
relatedEntityIds:
  - "AST-HP-01"
  - "SYS-HVAC-01"

initiatedBy:
  name: "Konserwacja budynku (Adam Lis)"
  organization: "GreenFM Sp. z o.o."
  role: "Technik FM"
  date: "2027-05-02"
assignedTo:
  name: "Autoryzowany serwis Bosch"
  organization: "BoschService PL"
  role: "wykonawca naprawy gwarancyjnej"
dueDate: "2027-05-09"
responseDate: "2027-05-04"
closedDate: "2027-05-04"

response:
  respondedBy: "Marek Kałuża (autoryzowany serwis Bosch)"
  responseDate: "2027-05-04"
  responseText: |
    Diagnoza: zatarcie sprężarki spójne z defektem partii (biuletyn Bosch
    BCB-2026-03 na sprężarkach Generation 3 z produkcji Q3 2025).
    Wymieniono sprężarkę w ramach gwarancji (bez kosztów). Doładowano
    czynnik chłodniczy do specyfikacji. Test po wymianie: COP 3,50,
    ciśnienie systemu nominalne.
  attachments:
    - "Bosch-BCB-2026-03-biuletyn-defekt-partii.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "warranty"
  notes: "Części zamienne + robocizna pokryte gwarancją producenta. Brak kosztów dla inwestora."

scheduleImpact:
  estimatedDelayDays: 0

sources:
  - id: "SRC-ISS-WARRANTY-HP-001-01"
    title: "Log alarmów BMS — awaria pompy ciepła 2027-05-02"
    type: "other"
    documentType: "bms_alarm_log"
    date: "2027-05-02"
    author: "GreenFM Sp. z o.o."

tags:
  - "operation-phase-example"
  - "gwarancja"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zgłoszenie gwarancyjne fazy eksploatacji — defekt partii sprężarki, wymiana bezkosztowo, następczy spadek COP wywołuje stały monitoring"
---

# Zgłoszenie — Wymiana sprężarki pompy ciepła w ramach gwarancji (ISS-WARRANTY-HP-001)

Rzeczywiste zdarzenie gwarancyjne podczas eksploatacji. Zdiagnozowane
i wymienione w 48 godzin bezkosztowo dla inwestora, ale wydajność po
wymianie ma trend spadkowy — wolnopalące się zagadnienie, które zespół FM
teraz aktywnie monitoruje.

| Pole | Wartość |
|---|---|
| Typ | Niezgodność / gwarancja |
| Status | Zamknięte |
| Zgłoszono | 2027-05-02 (alarm BMS) |
| Rozwiązano | 2027-05-04 |
| Koszt | €0 (gwarancja) |

## Powiązane

- [Zapis eksploatacji AST-HP-01](../zasoby/ai-hp-01-ops) — trend COP po wymianie wywołany przez to zgłoszenie
- [SYS-HVAC-01](../systemy/sys-hvac-01)
