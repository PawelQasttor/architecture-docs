---
id: "SITE-GREEN-TERRACE"
entityType: "site"
siteName: "Green Terrace Plot"

address:
  street: "ul. Słoneczna 45"
  city: "Warsaw"
  postalCode: "02-495"
  region: "Mazowieckie"
  country: "PL"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100

siteArea: 1250
buildableArea: 500
greenArea: 312.5

siteConstraints:
  - type: "setback"
    direction: "north"
    distance: 4.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "south"
    distance: 4.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "east"
    distance: 3.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "west"
    distance: 3.0
    regulation: "MPZP §12.3"
  - type: "height_limit"
    value: "25m"
    regulation: "MPZP §8.1"
  - type: "coverage_limit"
    value: "40%"
    regulation: "MPZP §9.2"

utilities:
  - type: "water"
    connectionPoint: "north_boundary"
    capacity: "DN100"
    provider: "MPWiK Warszawa"
    status: "available"
  - type: "sewage"
    connectionPoint: "north_boundary"
    capacity: "DN150"
    provider: "MPWiK Warszawa"
    status: "available"
  - type: "stormwater"
    connectionPoint: "north_boundary"
    capacity: "DN200"
    status: "available"
  - type: "electrical"
    connectionPoint: "east_boundary"
    capacity: "40kW"
    provider: "innogy Stoen"
    status: "available"
  - type: "gas"
    connectionPoint: "east_boundary"
    capacity: "10 m³/h"
    provider: "PSG"
    status: "available"
  - type: "district_heating"
    connectionPoint: "west_boundary"
    capacity: "120 kW"
    provider: "Veolia Warszawa"
    status: "requires_extension"
  - type: "fiber"
    connectionPoint: "east_boundary"
    provider: "Orange Polska"
    status: "available"

topography:
  elevation: 100
  slope: 1.5
  soilType: "clay_loam"
  bearingCapacity: 250
  groundwaterLevel: 3.2

zoningDesignation:
  planType: "mpzp"
  planReference: "MPZP Mokotów Stegny, Uchwała Nr XLII/1234/2023"
  allowedUse:
    - "residential_multifamily"
    - "services"
    - "retail_ground_floor"
  maxHeight: 25
  maxCoverage: 0.4
  maxFAR: 2.5
  minGreenRatio: 0.25

ifcMapping:
  ifcEntity: "IfcSite"
  globalId: "1a2B3c4D5e6F7g8H9i0JkL"

cost:
  totalCost: 625000
  currency: "PLN"
  basis: "land_acquisition"
  breakdown:
    land: 500000
    sitePreparation: 75000
    utilityConnections: 50000

version: "1.0.0"
tags:
  - "residential"
  - "warsaw"
  - "mokotow"
---

# Działka: Green Terrace

## Przegląd działki

- **Lokalizacja:** ul. Słoneczna 45, 02-495 Warszawa, Polska
- **Powierzchnia działki:** 1 250 m²
- **Zabudowa:** 450 m² (36% pokrycia, maks. 40%)
- **Tereny zielone:** 312,5 m² (25% działki)
- **Wysokość n.p.m.:** 100 m n.p.m.

## Zagospodarowanie przestrzenne (MPZP)

- **Plan:** MPZP Mokotów Stegny
- **Maks. wysokość:** 25 m
- **Maks. pokrycie:** 40%
- **Maks. intensywność zabudowy:** 2,5
- **Min. zieleń:** 25%
- **Dozwolone przeznaczenie:** Zabudowa wielorodzinna, usługi, handel na parterze

## Linie zabudowy

| Kierunek | Odległość | Regulacja |
|----------|-----------|-----------|
| Północ | 4,0 m | MPZP §12.3 |
| Południe | 4,0 m | MPZP §12.3 |
| Wschód | 3,0 m | MPZP §12.3 |
| Zachód | 3,0 m | MPZP §12.3 |

## Podsumowanie geotechniczne

| Parametr | Wartość |
|----------|---------|
| **Rodzaj gruntu** | Glina pylasta |
| **Nośność** | 250 kPa |
| **Wody gruntowe** | 3,2 m poniżej terenu |
| **Nachylenie** | 1,5° (prawie płaski) |

## Przyłącza mediów

| Medium | Punkt | Przepustowość | Dostawca | Status |
|--------|-------|---------------|----------|--------|
| Woda | Północ | DN100 | MPWiK | Dostępne |
| Kanalizacja | Północ | DN150 | MPWiK | Dostępne |
| Wody opadowe | Północ | DN200 | — | Dostępne |
| Elektryczność | Wschód | 40 kW | innogy Stoen | Dostępne |
| Gaz | Wschód | 10 m³/h | PSG | Dostępne |
| Ciepło sieciowe | Zachód | 120 kW | Veolia | Wymaga rozbudowy |
| Światłowód | Wschód | — | Orange | Dostępne |

## Koszty działki

| Pozycja | Kwota (PLN) |
|---------|-------------|
| Zakup gruntu | 500 000 |
| Przygotowanie terenu | 75 000 |
| Przyłącza mediów | 50 000 |
| **Razem** | **625 000** |
