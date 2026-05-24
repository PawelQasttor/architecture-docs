---
entityType: "commissioning_test"
id: "CT-AIRTIGHTNESS-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "Test szczelności powietrznej całego budynku (blower-door)"
testCategory: "air_tightness"
status: "scheduled"

buildingId: "BLD-01"
testedEntityIds:
  - "ENV-EW-01"
requirementIds:
  - "REQ-PL-WT-328-001"
  - "REQ-ENERGY-PERFORMANCE-001"

testProcedure:
  standard: "PN-EN ISO 9972 (zastępuje PN-EN 13829)"
  method: |
    Metoda 1 (test budynku w użyciu) — podciśnienie i nadciśnienie w całym
    budynku do ±50 Pa za pomocą kalibrowanego urządzenia blower-door
    uszczelnionego w wejściu głównym, z rejestracją wskaźnika nieszczelności
    w odstępach co 10 Pa od 50 Pa w dół do 10 Pa, następnie wyliczenie
    wskaźnika n50 (krotność wymian powietrza przy 50 Pa). Wszystkie celowe
    otwory (kratki wyciągowe, czerpnia/wyrzutnia MVHR) uszczelnione
    podczas testu zgodnie z normą.
  equipment:
    - "Minneapolis Blower Door Model 3 + manometr DG-1000"
    - "Rejestrator danych środowiskowych TESTO 480"
    - "Ołówek dymowy + kamera termowizyjna do identyfikacji nieszczelności"
  conditions: |
    Prędkość wiatru zewnętrznego < 6 m/s. Różnica temperatur wewnątrz-na zewnątrz
    ≥ 5 °C zalecana dla wizualizacji nieszczelności dymem/termowizją. Budynek
    w znaczącym stopniu ukończony (przegrody w pełni uszczelnione, brak otworów
    budowlanych).

scheduledDate: "2026-02-20"
executedBy:
  name: "Marek Lis"
  organization: "PowietrzPro Sp. z o.o."
  qualification: "Tester szczelności poziomu 2 ATTMA"
  certificationNumber: "ATTMA-2456"
witnessedBy:
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architekt odpowiedzialny"

results:
  expected:
    n50: 1.5
    aT50: 1.2
  measured: null
  passCriteria:
    n50Max: 2.5
    targetN50: 1.5
  outcome: "pending"

constructionPackageId: "CP-ENVELOPE"

sources:
  - id: "SRC-CT-AIRTIGHTNESS-001-01"
    title: "Zielony Taras — Plan rozruchu §4.2 (Przegrody)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Anna Nowak + PowietrzPro Sp. z o.o."

tags:
  - "artefakt-fazy-rozruchu"
  - "charakterystyka-energetyczna"

notes: |
  Szczelność powietrzna jest decydującym testem dla klasy energetycznej budynku.
  Przy n50 ≤ 1,5 projekt wspiera Klasę Energetyczną B (45 kWh/m²/rok ogrzewania);
  przy n50 > 2,5 budynek nie spełnia WT 2021. Margines 1,0 ACH między celem
  a limitem regulacyjnym daje pewną tolerancję wykonawczą, ale źle wykonany
  ościeże lub przeoczone uszczelnienie obwodowe mogą łatwo podwoić n50 —
  dlatego test odbywa się podczas rozruchu, a nie przy przekazaniu.

  Jeśli n50 > 2,5, termowizja w trybie awaryjnym (dym + kamera termowizyjna)
  identyfikuje lokalizacje nieszczelności i musi zostać zgłoszone `non_conformance`
  dla podwykonawcy przegród do naprawy przed ponownym testem.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — drugi test z fazy rozruchu demonstrujący weryfikację przegród"
---

# Test rozruchowy — szczelność powietrzna blower-door (CT-AIRTIGHTNESS-001)

Test blower-door całego budynku weryfikujący szczelność powietrzną przegród
względem celu projektowego Klasy Energetycznej B i limitu regulacyjnego WT 2021 § 328.

| Pole | Wartość |
|---|---|
| Kategoria | Szczelność powietrzna (PN-EN ISO 9972) |
| Status | Zaplanowano (2026-02-20) |
| Testowana encja | ENV-EW-01 + wszystkie inne układy przegród |
| Kryteria zaliczenia | n50 ≤ 2,5 (regulacyjne), ≤ 1,5 (cel projektowy) |
| Wynik | W oczekiwaniu |

## Powiązane

- [Przegroda `ENV-EW-01`](../przegroda-sciana-zewnetrzna-typ-a) — główny układ przegrody
- [Pakiet wykonawczy `CP-ENVELOPE`](../pakiety-budowlane/cp-przegroda)
