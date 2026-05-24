---
entityType: "building"
id: "BLD-03"
name: "Dziedziniec Lipowy — blok o podwyższonej dostępności"
version: "2.1.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 360

numberOfStoreys:
  aboveGround: 5
  belowGround: 0
  total: 5
buildingHeight: 16.5
eaveHeight: 14.5
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "enhanced"

unitMix:
  oneBedroom: 8
  twoBedroom: 8
  threeBedroom: 2
  totalUnits: 18
  accessibilityNotes: |
    100% mieszkań zaprojektowanych do polskiej specyfikacji
    "Lokal Dostępny" o podwyższonej dostępności: kręgi obrotu 1500 mm,
    drzwi szerokości w świetle 950 mm, dostępne WC i łazienka,
    dostęp do tarasu zewnętrznego na poziomie parteru po stronie dostępnej drogi.

cost:
  totalCost: 1900000
  currency: "EUR"
  basis: "DD_estimate"
  _meta:
    confidence: "estimated"
    source: "Wycena QS fazy DD, Klasa 3"

designProgress:
  ddStarted: "2026-04-01"
  ddTargetCompletion: "2026-10-31"
  cdTargetStart: "2026-11-01"
  expectedHandover: "2028-06-15"

tags:
  - "campus-example"
  - "sibling-building"
  - "accessible-design"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodany z przykładem Kampusu — siostrzany budynek w fazie DD, wariant o podwyższonej dostępności"
---

# BLD-03 — Dziedziniec Lipowy

5-kondygnacyjny, 18-mieszkaniowy budynek mieszkalny **zaprojektowany
do podwyższonej dostępności**. Obecnie w fazie projektu budowlanego.
Jeden z trzech siostrzanych budynków w [kampusie Zielony Taras Park](../kampus).

| Właściwość | Wartość |
|---|---|
| Faza | `design_development` |
| Kondygnacje | 5 (tylko nadziemne) |
| Powierzchnia brutto | 1 800 m² |
| Mieszkania | 18 (8× 1-pok. + 8× 2-pok. + 2× 3-pok. — przewaga 1-pok. dla singli/seniorów) |
| Zgodność dostępności | **podwyższona** (100% Lokal Dostępny) |
| Oczekiwane przekazanie | 2028-06-15 |

## Dlaczego ten wariant istnieje w przykładzie

Kampus byłby nieprzekonujący, gdyby każde rodzeństwo było kopią BLD-01.
Dziedziniec Lipowy pokazuje, że siostrzane budynki w tym samym Kampusie
mogą mieć **różne zamiary projektowe** — tutaj podwyższona dostępność
dla starszych i poruszających się na wózkach mieszkańców. Encja Kampusu
nie ma to znaczenia; po prostu je agreguje.
