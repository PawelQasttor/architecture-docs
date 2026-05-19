---
entityType: "building"
id: "BLD-01"
name: "Budynek Mieszkalny Zielony Taras"
version: "2.0.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

siteId: "SITE-GREEN-TERRACE"
usage: "residential"
buildingType: "residential_multifamily"

# Powierzchnie (m²)
grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 320

# Bryła
numberOfStoreys:
  aboveGround: 6
  belowGround: 0
  total: 6
buildingHeight: 18.0
eaveHeight: 16.0
unit: "m"

# Klasyfikacja regulacyjna (PL — WT 2021)
occupancyClassification: "ZL_IV"   # mieszkalna
constructionClass: "C"

accessibilityCompliance: "standard"

cost:
  totalCost: 1800000
  currency: "EUR"
  basis: "project_budget"
  _meta:
    confidence: "estimated"
    source: "project_specification.budget"

tags:
  - "flagship-example"
---

# Budynek Mieszkalny Zielony Taras (BLD-01)

Jedyny budynek inwestycji Zielony Taras na działce
`SITE-GREEN-TERRACE`. Sześciokondygnacyjny wielorodzinny budynek
mieszkalny: parter i pięć kondygnacji nadziemnych (`LVL-00` … `LVL-05`),
18 lokali mieszkalnych, ~54 mieszkańców.

| Właściwość | Wartość |
|---|---|
| Powierzchnia całkowita | 1 800 m² |
| Powierzchnia netto | 1 620 m² |
| Powierzchnia zabudowy | 320 m² |
| Kondygnacje | 6 (LVL-00 parter → LVL-05) |
| Wysokość | 18,0 m (okap 16,0 m) |
| Kategoria zagrożenia ludzi | ZL IV (mieszkalna, WT 2021) |
| Klasa konstrukcji | C |

Wszystkie przestrzenie, kondygnacje, przegrody i pakiety budowlane w tym
przykładzie odwołują się do budynku przez `buildingId: "BLD-01"`.
