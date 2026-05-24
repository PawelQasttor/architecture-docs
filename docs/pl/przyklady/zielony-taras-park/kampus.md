---
entityType: "campus"
id: "CAM-GREEN-TERRACE-PARK"
version: "2.1.0"
projectPhase: "construction"

campusName: "Zielony Taras Park"
campusType: "residential_estate"
description: |
  4-budynkowe osiedle mieszkaniowe na 5 400 m² działce w południowej Warszawie.
  Flagowy blok Zielony Taras (BLD-01) zasiedlony marzec 2026; trzy siostrzane
  bloki (BLD-02, BLD-03, BLD-04) są w progresywnie wcześniejszych etapach
  projektowania i konstrukcji, w miarę jak osiedle rozwija się 2026-2029.

siteIds:
  - "SITE-GREEN-TERRACE"
  - "SITE-GTP-PHASE-2"

totalArea: 5400
totalGFA: 7200

sharedInfrastructure:
  - type: "district_heating"
    description: "Centralna pompa ciepła powietrze-woda zasilająca wszystkie 4 budynki przez izolowane magistrale podziemne"
    capacity: "320 kW nominalnie, rozszerzalne do 400 kW dla podłączenia BLD-04"
    servedBuildingIds: ["BLD-01", "BLD-02", "BLD-03", "BLD-04"]
  - type: "shared_parking"
    description: "Naziemny parking na 64 samochody (22 BLD-01 + 28 BLD-02 + 14 BLD-03/04 wspólne)"
    capacity: "64 miejsca, w tym 6 dla niepełnosprawnych + 12 EV-ready"
    servedBuildingIds: ["BLD-01", "BLD-02", "BLD-03", "BLD-04"]
  - type: "stormwater"
    description: "SuDS — nawierzchnia przepuszczalna, niecki, podziemny zbiornik retencyjny z odpływem dyspersyjnym"
    capacity: "Burza 1 na 100 lat z 30% rezerwą na zmiany klimatu"
    servedBuildingIds: ["BLD-01", "BLD-02", "BLD-03", "BLD-04"]
  - type: "data_network"
    description: "Światłowód do mieszkania przez wspólne centrum kampusu; jeden ISP na pokładzie, drugi TBC"
    servedBuildingIds: ["BLD-01", "BLD-02", "BLD-03", "BLD-04"]

masterPlan:
  reference: "Zielony Taras Park — Plan generalny, Rew. C (Zatwierdzony 2024-11-20)"
  date: "2024-11-20"
  phasingStrategy: |
    Faza 1: BLD-01 (Zielony Taras) — przekazanie marzec 2026 (ukończone)
    Faza 2a: BLD-02 (Słoneczny Półksiężyc) — przekazanie wrzesień 2027
    Faza 2b: BLD-03 (Dziedziniec Lipowy) — przekazanie czerwiec 2028
    Faza 3:  BLD-04 (Pawilon Dębowy) — przekazanie grudzień 2029 (zależne od tempa sprzedaży BLD-03)

location:
  latitude: 52.1843
  longitude: 20.9712

address:
  street: "ul. Słoneczna 45-51"
  city: "Warszawa"
  postalCode: "02-495"
  country: "PL"

classification:
  system: "Uniclass2015"
  code: "Co_25_30"
  title: "Osiedla mieszkaniowe"

tags:
  - "campus-example"
  - "phase-rollup-demo"

sources:
  - id: "SRC-CAM-GTP-MASTER-001"
    title: "Plan generalny Zielony Taras Park Rew. C"
    type: "other"
    documentType: "master_plan"
    date: "2024-11-20"
    author: "Green Development Sp. z o.o. + Nowak Architecture"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Pierwotna encja Kampus — dodana z przykładem Kampusu, zamyka ostatnią lukę 1-z-27 typów encji"
---

# Zielony Taras Park (CAM-GREEN-TERRACE-PARK)

4-budynkowe osiedle mieszkaniowe, gdzie Zielony Taras BLD-01 to jeden
z czterech siostrzanych bloków. Encja Kampus siedzi na **szczycie
hierarchii SBM**, agregując działki, budynki, wspólną infrastrukturę
i systemy obejmujące cały kampus.

| Właściwość | Wartość |
|---|---|
| Typ kampusu | Osiedle mieszkaniowe |
| Całkowita powierzchnia działki | 5 400 m² |
| Całkowite GFA we wszystkich budynkach | 7 200 m² |
| Mieszkania (suma) | ~72 |
| Działki | 2 (Faza 1 + Faza 2) |
| Wspólna infrastruktura | Ciepłownictwo, parking, deszczówka, sieć danych |
| Budynki | 4 (w 4 różnych fazach cyklu życia) |
| Plan generalny | Zatwierdzony 2024-11-20 |

## 4-fazowy rollup

To, co czyni ten przykład interesującym, to fakt że 4 budynki są w
**różnych fazach cyklu życia jednocześnie**:

| Budynek | Typ | Lokale | Faza | GFA |
|---|---|---|---|---|
| [BLD-01](/pl/przyklady/zielony-taras/budynek) Zielony Taras | flagowy | 18 | `commissioning` / `operation` | 1 800 m² |
| [BLD-02 Słoneczny Półksiężyc](./budynki/BLD-02-sloneczny-polksiezyc) | blok rodzinny | 24 | `construction` | 2 400 m² |
| [BLD-03 Dziedziniec Lipowy](./budynki/BLD-03-dziedziniec-lipowy) | dostępność | 18 | `design_development` | 1 800 m² |
| [BLD-04 Pawilon Dębowy](./budynki/BLD-04-pawilon-debowy) | 1-pokojowe | 12 | `schematic_design` | 1 200 m² |

Kampus niesie je wszystkie. Migawka `Campus` w dowolnym momencie pokazuje
dzieci w mieszanej fazie, co kontrola gotowości fazowej kompilatora
traktuje poprawnie: Kampus jest "gotowy do przejścia do" fazy
*najmniej zaawansowanego* dziecka.

## Wspólna infrastruktura

Rzeczy, które nie należą do żadnego pojedynczego Budynku, żyją na Kampusie:

- **Pętla ciepłownicza** (`SYS-DH-LOOP-CAMPUS`) — jeden System z
  `buildingIds: [BLD-01, BLD-02, BLD-03, BLD-04]`
- **Ogród wspólnotowy, plac zabaw, ładowanie EV, schowek na rowery** —
  Elementy Terenu należące do Kampusu
- **Ogólnokampusowe roboty ziemne + magistrale DH** — Pakiet Wykonawczy
  `CP-SITE-INFRASTRUCTURE` zamiast per-budynkowy CP
- **Warunek planistyczny** — zgłoszenie o zasięgu kampusu wpływające na
  wszystkie 4 budynki

To jest problem **"rzeczy, które nie są budynkiem"**, który encja Kampusu
rozwiązuje czysto.
