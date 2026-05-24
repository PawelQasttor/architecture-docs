---
entityType: "structural_system"
id: "STR-GREEN-TERRACE"
version: "2.1.0"
projectPhase: "design_development"

systemName: "Zielony Taras — konstrukcja główna"
structuralCategory: "superstructure"
buildingId: "BLD-01"
description: |
  Monolityczna konstrukcja żelbetowa: ściany nośne i stropy płytowe dla
  6-kondygnacyjnego budynku mieszkalnego Zielony Taras. Fundamenty
  paskowe na gruntach spoistych. Projekt zgodny z Eurokodami i polskimi
  załącznikami krajowymi (PN-EN 1990 / 1991 / 1992 / 1997 / 1998-1).

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50               # lat (Klasa S4 wg PN-EN 1990 Załącznik A.1)
  importanceClass: "CC2"       # standardowa klasa konsekwencji dla budownictwa mieszkalnego
  exposureClass: "XC1"         # wnętrze, suche — strona zewnętrzna XC4
  fireResistance: "REI 90"     # ściany/stropy nośne (powyżej min. WT 2021 REI 60)
  seismicDesignCategory: "low_seismicity"
  peakGroundAcceleration: 0.4  # m/s² — Warszawa w strefie niskiej sejsmiczności
  soilCategory: "C"            # typ podłoża PN-EN 1998-1 (głębokie pokłady średnio zagęszczonego piasku/żwiru)
  windZone: "PL_Zone_I"        # PN-EN 1991-1-4 NA (vb,0 = 22 m/s)
  snowZone: "PL_Zone_2"        # PN-EN 1991-1-3 NA (sk = 0,9 kN/m²)

loads:
  deadLoadKPa: 5.0             # typowy strop + jastrych + wykończenie
  liveLoadKPa: 2.0             # mieszkalne (PN-EN 1991-1-1, kategoria A)
  roofLiveLoadKPa: 0.4
  snowLoadKPa: 0.9
  windPressureKPa: 0.6

foundationDetails:
  type: "strip"
  depth: 1.8                   # m poniżej terenu (poniżej głębokości przemarzania dla Warszawy)
  bearingCapacity: 250         # kPa nośność dopuszczalna
  groundwaterManagement: "Drenaż obwodowy do miejskiej kanalizacji deszczowej"

gridSystem:
  xSpacing: [6.0, 6.0, 6.0, 6.0, 6.0]
  ySpacing: [5.5, 5.5]
  origin: "Przecięcie osi 1/A w narożniku NE budynku"

materials:
  - materialTypeId: "MT-CONCRETE-C30-37"
    role: "primary_loadbearing"
  - materialTypeId: "MT-REBAR-B500SP"
    role: "reinforcement"

verification:
  designedBy:
    name: "Piotr Kowalski"
    organization: "Kowalski Structural Engineering Sp. z o.o."
    qualification: "PZITB 1234, uprawnienia projektowe w specjalności konstrukcyjno-budowlanej"
  checkedBy:
    name: "Niezależny weryfikator zewnętrzny (TBD na etapie przetargu)"
  software: "Robot Structural Analysis 2025"
  lastAnalysisDate: "2026-02-15"

constructionPackageId: "CP-STRUCTURE"

sources:
  - id: "SRC-STR-GREEN-TERRACE-01"
    title: "Zielony Taras — Raport projektu konstrukcyjnego, Rew. C"
    type: "structural_drawing"
    documentType: "structural_design_report"
    date: "2026-02-15"
    author: "Piotr Kowalski"

tags:
  - "artefakt-fazy-projektu-budowlanego"

notes: |
  Konstrukcja przed v2.1 istniała w przykładzie tylko niejawnie —
  plik budynku wspominał "klasę konstrukcyjną C" oraz "żelbet" prozą,
  ale żadna encja nie nosiła parametrów obciążeń, klas ekspozycji ani
  parametrów sejsmicznych, do których referencji potrzebują zespoły MEP
  i przegród. Ta encja `structural_system` czyni je jawnymi,
  czytelnymi maszynowo i objętymi kontrolą wersji.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — przenosi dane projektowe konstrukcji z prozy do encji"
---

# System konstrukcyjny — Zielony Taras (STR-GREEN-TERRACE)

Monolityczna konstrukcja żelbetowa: ściany nośne i stropy płytowe na
fundamentach paskowych. Projekt zgodny z Eurokodami i polskimi
załącznikami krajowymi (PN-EN 1990 / 1991 / 1992 / 1997 / 1998-1).

| Parametr | Wartość |
|---|---|
| Typ konstrukcji | Żelbet — ściany nośne + stropy płytowe |
| Fundamenty | Ławy fundamentowe, gł. 1,8 m, nośność 250 kPa |
| Trwałość projektowa | 50 lat (Klasa S4) |
| Klasa konsekwencji | CC2 |
| Ekspozycja (wnętrze) | XC1 |
| Odporność ogniowa | REI 90 (powyżej min. WT 2021 REI 60) |
| Sejsmika | Niska — PGA 0,4 m/s², grunt C |
| Strefa śnieżna | PL strefa 2 (sk = 0,9 kN/m²) |
| Strefa wiatrowa | PL strefa I (vb,0 = 22 m/s) |
| Obciążenie użytkowe (mieszkalne) | 2,0 kPa |
| Siatka | 6 m × 5,5 m typowa |

## Dlaczego ta encja istnieje

Przed v2.1 przykład niósł dane konstrukcyjne **tylko prozą** wewnątrz
`specyfikacja-projektu.md`. To wystarczało czytelnikowi, ale oznaczało:

- Zespół MEP musiał ręcznie wyprowadzać obciążenia stałe stropu do doboru wieszaków.
- Zespół przegród musiał szukać klasy ekspozycji w PDF konstrukcyjnym.
- Zliczanie kosztów nie mogło powiązać ilości betonu z konkretnym projektem.

Wydobywając konstrukcję jako encję pierwszej klasy `structural_system`,
każda branża referuje do tych samych liczb — a zmiana np. obciążenia
użytkowego propaguje się przez model automatycznie.

## Użyte materiały

- [`MT-CONCRETE-C30-37`](../materialy/MT-CONCRETE-C30-37) — beton konstrukcyjny
- `MT-REBAR-B500SP` — pręty zbrojeniowe żebrowane B500SP (osobny plik materiału nie został jeszcze opracowany)

## Powiązane

- [Budynek `BLD-01`](../budynek) — referuje do tego systemu konstrukcyjnego
- [Pakiet wykonawczy `CP-STRUCTURE`](../pakiety-budowlane/cp-konstrukcja) — sekwencjonuje roboty konstrukcyjne
- [REQ-LEVEL-FIRE-RATING](../wymagania/REQ-LEVEL-FIRE-RATING) — minimum REI 60 przekroczone projektem REI 90
