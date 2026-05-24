---
entityType: "building"
id: "BLD-02"
name: "Słoneczny Półksiężyc — blok rodzinny"
version: "2.1.0"
projectPhase: "construction"
bimLOD: "LOD_400"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 2400
netFloorArea: 2160
footprintArea: 480

numberOfStoreys:
  aboveGround: 5
  belowGround: 0
  total: 5
buildingHeight: 16.5
eaveHeight: 14.5
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "standard"

unitMix:
  oneBedroom: 4
  twoBedroom: 12
  threeBedroom: 8
  totalUnits: 24

cost:
  totalCost: 2200000
  currency: "EUR"
  basis: "as_construction_progresses"
  _meta:
    confidence: "estimated"
    source: "Harmonogram wartości wykonawcy Fazy 2a"

constructionProgress:
  startDate: "2026-09-01"
  expectedCompletion: "2027-09-15"
  currentMilestone: "Konstrukcja zakończona, przegrody 60%"
  percentComplete: 55

tags:
  - "campus-example"
  - "sibling-building"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodany z przykładem Kampusu — siostrzany budynek w fazie konstrukcji"
---

# BLD-02 — Słoneczny Półksiężyc

5-kondygnacyjny, 24-mieszkaniowy blok rodzinny, obecnie w budowie.
Jeden z trzech siostrzanych budynków do BLD-01 w [kampusie Zielony Taras Park](../kampus).

| Właściwość | Wartość |
|---|---|
| Faza | `construction` (55% ukończone) |
| Kondygnacje | 5 (tylko nadziemne) |
| Powierzchnia użytkowa brutto | 2 400 m² |
| Mieszkania | 24 (4× 1-pok. + 12× 2-pok. + 8× 3-pok. — mix rodzinny) |
| Wysokość | 16,5 m |
| Koszt powykonawczy (prognoza) | €2,2M |
| Oczekiwane ukończenie | 2027-09-15 |

## Szkieletowy szczegół

To jest **szerokościowy rodzeństwo** w przykładzie Kampusu. Encja budynku
niesie wystarczająco, by zademonstrować przynależność do Kampusu,
wariancję faz i wariację mieszanki mieszkań. Pełna per-budynkowa
szczegółowość (kondygnacje, przestrzenie, systemy, przegrody, ...)
nie jest dostarczona — dla tego wzorca patrz
[projektowy budynek flagowy](/pl/przyklady/zielony-taras/budynek).
