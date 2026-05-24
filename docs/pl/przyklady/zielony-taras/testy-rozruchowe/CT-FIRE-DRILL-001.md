---
entityType: "commissioning_test"
id: "CT-FIRE-DRILL-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "Próbna ewakuacja pożarowa całego budynku"
testCategory: "emergency_systems"
status: "planned"

buildingId: "BLD-01"
testedEntityIds:
  - "VC-STAIR-A"
  - "SP-BLD-01-L01-CORR"
  - "CR-FIRE-EGRESS-L01"
requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"

testProcedure:
  standard: "PD 7974-6 — Human factors: Life safety strategies"
  method: |
    Symulowana ewakuacja najgorszego scenariusza: pełne obciążenie budynku
    54 osobami (ochotnicy przed przekazaniem; rzeczywiści mieszkańcy po
    przekazaniu), uruchomienie alarmu pożarowego z najgorszego pomieszczenia
    pochodzenia (sypialnia na Poziomie 05), klatka schodowa A sztucznie
    zadeklarowana jako "zablokowana", więc wszyscy mieszkańcy muszą użyć
    klatki B. Mierzony czas od aktywacji alarmu do wyjścia ostatniego
    mieszkańca z budynku. Powtórzyć w tych samych warunkach, ale z zablokowaną
    klatką B.
  equipment:
    - "Stoper + arkusze do liczenia osób przy wszystkich wyjściach ewakuacyjnych"
    - "Panel testowy alarmu pożarowego (tryb testowy producenta)"
    - "Nagranie wideo punktów decyzyjnych (za zgodą mieszkańców)"
  conditions: |
    Przeprowadzone w godzinach dziennych dla bezpieczeństwa mieszkańców.
    Lokalna straż pożarna powiadomiona z wyprzedzeniem. Cały sprzęt do
    ewakuacji wspomaganej (krzesła ewakuacyjne w klatkach schodowych)
    fizycznie zademonstrowany, nie tylko sprawdzony wzrokowo.

scheduledDate: "2026-02-25"
executedBy:
  name: "Anna Zielińska"
  organization: "Zielińska Fire Safety Consultancy"
  qualification: "Specjalista ds. bezpieczeństwa pożarowego PIIB + członek IFE"
  certificationNumber: "MZ-7891"
witnessedBy:
  - name: "Kapitan (TBC)"
    organization: "Komenda Miejska PSP w Warszawie"
    role: "obserwator regulacyjny"
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architekt odpowiedzialny"

results:
  expected:
    maxEvacuationTimeMinutes: 2.5
    pathfinderRSET: 2.1
  measured: null
  passCriteria:
    actualEvacuationTimeMinutes: 2.5
    noOccupantStranded: true
    allAssistiveEquipmentFunctional: true
  outcome: "pending"

constructionPackageId: "CP-MEP"

sources:
  - id: "SRC-CT-FIRE-DRILL-001-01"
    title: "Zielony Taras — Plan rozruchu §6.1 (Próbna ewakuacja)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Anna Zielińska + Anna Nowak"

tags:
  - "artefakt-fazy-rozruchu"
  - "krytyczne-bezpieczeństwo"

notes: |
  To jest **rzeczywisty odpowiednik** symulacji Pathfinder zarejestrowanej
  w REQ-FIRE-EGRESS-TIME-001 (RSET 2,1 min). Symulacja daje *zaufanie
  z fazy projektowej*; próbna ewakuacja daje *weryfikację z fazy przekazania*.

  Jeśli rzeczywisty czas ewakuacji przekroczy 2,5 minuty, musi zostać
  otwarte zgłoszenie niezgodności i budynek nie może być przekazany,
  dopóki: (a) droga zostanie naprawiona i próbna ewakuacja powtórzona,
  albo (b) procedury operacyjne (np. zmniejszona pojemność) zostaną
  przyjęte za zgodą organów.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — łączy symulację ewakuacji z fazy projektowej z weryfikacją w fazie rozruchu"
---

# Test rozruchowy — próbna ewakuacja pożarowa (CT-FIRE-DRILL-001)

**Rzeczywisty odpowiednik** symulacji ewakuacji Pathfinder. Weryfikuje
w warunkach rzeczywistych to, co symulacja przewidziała analitycznie:
ewakuacja całego budynku w ≤ 2,5 minuty przy jednej zablokowanej klatce schodowej.

| Pole | Wartość |
|---|---|
| Kategoria | Systemy awaryjne |
| Status | Zaplanowano (2026-02-25) |
| Testowane encje | Klatka A, korytarz Poziomu 01, CR-FIRE-EGRESS-L01 |
| Weryfikuje | REQ-FIRE-EGRESS-TIME-001 (limit 2,5 min) |
| Świadkowie | Straż Pożarna + Architekt |
| Wynik | W oczekiwaniu — wypełniany po próbie |

## Powiązane

- [Wymaganie `REQ-FIRE-EGRESS-TIME-001`](../wymagania/REQ-FIRE-EGRESS-TIME-001) — limit RSET 2,5 min
- [Droga cyrkulacji `CR-FIRE-EGRESS-L01`](../drogi-cyrkulacji/CR-FIRE-EGRESS-L01) — ścieżka próby ewakuacji
- [Komunikacja pionowa `VC-STAIR-A`](../klatka-schodowa-a) — chroniona klatka schodowa
