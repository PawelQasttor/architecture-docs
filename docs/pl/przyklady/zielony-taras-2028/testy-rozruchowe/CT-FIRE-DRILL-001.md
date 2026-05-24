---
entityType: "commissioning_test"
id: "CT-FIRE-DRILL-001"
version: "2.1.0"
projectPhase: "operation"

testName: "Próbna ewakuacja pożarowa całego budynku — WYKONANO"
testCategory: "emergency_systems"
status: "passed"

buildingId: "BLD-01"
testedEntityIds:
  - "VC-STAIR-A"
  - "SP-BLD-01-L01-CORR"
  - "CR-FIRE-EGRESS-L01"
requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"

testProcedure:
  standard: "PD 7974-6"
  method: "Symulowana ewakuacja przed przekazaniem z ochotnikami reprezentującymi pełne obciążenie budynku. Wg planu rozruchu z fazy projektowej."

scheduledDate: "2026-02-25"
executedDate: "2026-02-25"
executedBy:
  name: "Anna Zielińska"
  organization: "Zielińska Fire Safety Consultancy"
  qualification: "Specjalista ds. bezpieczeństwa pożarowego PIIB + członek IFE"
  certificationNumber: "MZ-7891"
witnessedBy:
  - name: "Kapitan Krzysztof Borowski"
    organization: "Komenda Miejska PSP Warszawa — Stacja 12"
    role: "obserwator regulacyjny"
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architekt odpowiedzialny"

results:
  expected:
    maxEvacuationTimeMinutes: 2.5
    pathfinderRSET: 2.1
  measured:
    scenario1_StairABlocked_minutes: 2.3
    scenario2_StairBBlocked_minutes: 2.2
    averageEvacuationTime: 2.25
    bottleneckLocation: "Półpiętro klatki B na Poziomie 02 — drobny zator na 110-120 s"
    measurementDate: "2026-02-25"
    notes: |
      Pathfinder przewidywał 2,1 min najgorszego scenariusza. Wynik realny 2,3 min —
      9 % niekorzystna różnica od prognozy (w typowych 10-15 % niekorzystnej różnicy
      realne-vs-symulacja dla ewakuacji mieszkalnych). Dwóch ochotników wymagało
      podpowiedzi personelu w punktach decyzyjnych; brak rzeczywistego opóźnienia.
      Obserwator straży pożarnej nie odnotował naruszeń reguł zaangażowania.
  passCriteria:
    actualEvacuationTimeMinutes: 2.5
    noOccupantStranded: true
    allAssistiveEquipmentFunctional: true
  outcome: "passed"
  outcomeNotes: |
    Najgorszy scenariusz 2,3 minuty ≤ 2,5 minuty limitu regulacyjnego.
    Żaden mieszkaniec nie został pozostawiony; wszystkie 4 krzesła
    ewakuacyjne pomyślnie zademonstrowane. Zalecane, by podobna próbna
    ewakuacja została powtórzona po 36 miesiącach z rzeczywistymi
    mieszkańcami, by zweryfikować zachowanie teraz, gdy zasiedlenie
    się ustabilizowało.

constructionPackageId: "CP-MEP"

followUpIssueIds: []

sources:
  - id: "SRC-CT-FIRE-DRILL-001-OPS-01"
    title: "Zielony Taras — Raport próbnej ewakuacji pożarowej"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-25"
    author: "Anna Zielińska / Zielińska Fire Safety Consultancy"
  - id: "SRC-CT-FIRE-DRILL-001-OPS-02"
    title: "Komenda Miejska PSP Warszawa — Raport obserwacji, Stacja 12"
    type: "regulatory_code"
    documentType: "fire_brigade_observation"
    date: "2026-02-26"
    author: "Kapitan Krzysztof Borowski, KM PSP Warszawa"

tags:
  - "operation-phase-example"
  - "wykonany-test"
  - "krytyczne-bezpieczeństwo"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Wykonanie CT-FIRE-DRILL-001 w fazie eksploatacji — zaliczono przy 2,3 min wobec limitu 2,5; 9% niekorzystna różnica od prognozy Pathfinder"
---

# CT-FIRE-DRILL-001 — wykonano (2026-02-25) — zaliczono

Próbna ewakuacja pożarowa przed przekazaniem **wykonana**. Najgorszy
scenariusz (Klatka A zablokowana, wszyscy mieszkańcy używają Klatki B)
opróżnił budynek w **2,3 minuty** — w limicie regulacyjnym 2,5 min i 9 %
powyżej prognozy Pathfinder wynoszącej 2,1 min. Komenda Miejska PSP
obserwowała bez naruszeń reguł zaangażowania.

| Scenariusz | Wynik | Limit | Ocena |
|---|---|---|---|
| Klatka A zablokowana (tylko Klatka B) | **2,3 min** | 2,5 min | Zaliczone |
| Klatka B zablokowana (tylko Klatka A) | 2,2 min | 2,5 min | Zaliczone |
| Prognoza Pathfinder (najgorszy scenariusz) | 2,1 min | 2,5 min | Zaliczone (prognozowane) |

## Dlaczego 9 % niekorzystna różnica jest normalna

Symulacja Pathfinder zakłada idealne zachowanie mieszkańców. Rzeczywiste
próbne ewakuacje zazwyczaj pokazują 10-15 % niekorzystną różnicę —
ochotnicy zatrzymują się w punktach decyzyjnych, potrzebują czasu, by
rozpoznać, że alarm jest prawdziwy, a (czasami) zaczynają poruszać się
w złym kierunku przed korektą. 9 % jest na **lepszym końcu normalnego**.

## Zalecenie

Powtórny test po 36 miesiącach powinien używać **rzeczywistych mieszkańców**
zamiast ochotników, teraz gdy zasiedlenie się ustabilizowało, a najemcy
znają budynek. To daje najdokładniejszą liczbę czasu ewakuacji dla
rzeczywistej populacji operacyjnej.
