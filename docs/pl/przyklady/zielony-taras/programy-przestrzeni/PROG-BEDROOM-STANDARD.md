---
entityType: "space_program"
id: "PROG-BEDROOM-STANDARD"
version: "2.1.0"
projectPhase: "concept"

# Czego brief żądał, zanim narysowano jakikolwiek rzut
programName: "Sypialnie standardowe (brief)"
description: |
  Brief z fazy koncepcyjnej dla sypialni standardowych w inwestycji mieszkaniowej
  Zielony Taras. Określa wymaganie ilościowe inwestora — ile sypialni jakiej
  wielkości — niezależnie od konkretnego rzutu. Kompilator porównuje
  zaprojektowane instancje sypialni z tym celem.

buildingId: "BLD-01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
spaceType: "bedroom"

# 18 mieszkań × średnio ~1,83 sypialni (6×1-pok. + 9×2-pok. + 3×3-pok. = 33 sypialnie ogółem).
# Z tego ~27 to sypialnie "standardowe"; pozostałe 6 to większe/master.
requiredQuantity: 27
requiredTotalArea: 405          # 27 × ~15 m² typowo
requiredAreaPerUnit:
  min: 10
  max: 18
  typical: 15

priority: "critical"

classification:
  system: "Uniclass2015"
  code: "SL_25_10_05"
  title: "Sypialnie"

sources:
  - id: "SRC-PROG-BEDROOM-STANDARD-01"
    title: "Zielony Taras — brief klienta v1.0"
    type: "other"
    documentType: "client_brief"
    date: "2025-04-15"
    author: "Green Development Sp. z o.o."

tags:
  - "artefakt-fazy-koncepcyjnej"
  - "brief-do-projektu"

notes: |
  Programowany w fazie koncepcyjnej (2025-04). Przechodzi przez kolejne fazy —
  projekt schematyczny, projekt budowlany, dokumentację wykonawczą — każda
  faza jest mierzona względem niego. Pola `designedQuantity`, `designedTotalArea`
  oraz blok `compliance` są automatycznie wyliczane przez kompilator SBM
  z zaprojektowanych instancji Przestrzeni, które referują
  `spaceTypeId: ST-BEDROOM-STANDARD-A`.

  **Spodziewane ostrzeżenie kompilatora w tym przykładzie.** Dokumentacja
  Zielonego Tarasu zawiera tylko DWA przykładowe pliki sypialni
  (`sypialnia-01`, `sypialnia-02`) dla zwięzłości dydaktycznej, nie wszystkie 27.
  Kompilator poprawnie sygnalizuje to jako `under_provision` — to JEST
  działająca kontrola brief-do-projektu. W rzeczywistym projekcie wszystkie 27
  instancji sypialni istniałoby i status zgodności zmieniłby się na `compliant`.
  Ostrzeżenie jest intencjonalne w przykładzie; demonstruje, że kontrola działa.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — uwidacznia artefakt briefu z fazy koncepcyjnej, który kotwiczy resztę modelu"
---

# Program przestrzeni — sypialnie standardowe (PROG-BEDROOM-STANDARD)

**Brief klienta** dla Zielonego Tarasu (kwiecień 2025, faza koncepcyjna)
zażądał **27 sypialni standardowych** o łącznej powierzchni około **405 m²**,
z typową powierzchnią pokoju około **15 m²** (zakres 10–18 m²).

Ta encja Programu Przestrzeni utrwala brief jako mierzalny, czytelny
maszynowo cel. Każda kolejna faza — projekt schematyczny, projekt
budowlany, dokumentacja wykonawcza — jest weryfikowana względem niego.
Gdy dodawane są zaprojektowane instancje Przestrzeni odwołujące się do
`spaceTypeId: ST-BEDROOM-STANDARD-A`, kompilator wylicza:

| Pole | Źródło |
|---|---|
| `designedQuantity` | Liczba zaprojektowanych instancji sypialni |
| `designedTotalArea` | Suma ich pól `designArea` |
| `compliance.quantityMet` | `designedQuantity ≥ requiredQuantity` |
| `compliance.areaMet` | `designedTotalArea ≥ requiredTotalArea` (w granicach tolerancji) |
| `compliance.status` | `compliant` · `over_provision` · `under_provision` · `not_started` |

To jest automatyczna kontrola brief-do-projektu wykonywana przez kompilator SBM.

## Dlaczego ta encja istnieje w przykładzie

Wcześniejszy przykład Zielonego Tarasu zaczynał od razu od treści **fazy
projektu budowlanego** — sypialnie z wykończeniami, kondygnacje z wysokościami
sufitów, strefy z odpornością pożarową. Brak encji z fazy koncepcyjnej
sprawiał wrażenie, jakby model "zaczynał się od geometrii". W rzeczywistości
każdy projekt zaczyna się od **programu**, a ten program jest trwałym
źródłem prawdy, do którego projekt jest zobowiązany.

Trzymając program jako encję pierwszej klasy:

- **Architekci** mogą sprawdzić, czy projekt nadal spełnia oryginalny brief
  po późnych zmianach.
- **Inwestorzy** mogą audytować obiecane ilości w dowolnej fazie.
- **Kompilatory** mogą zgłosić regresję w momencie usunięcia sypialni.

## Powiązane

- [Typ przestrzeni `ST-BEDROOM-STANDARD-A`](../typy-przestrzeni/ST-BEDROOM-STANDARD-A) — szablon, który dziedziczy każda zaprojektowana sypialnia
- [Sypialnia 01](../przestrzenie/sypialnia-01) — jedna z zaprojektowanych instancji liczona w tym programie
