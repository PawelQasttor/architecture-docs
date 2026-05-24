---
entityType: "building"
id: "BLD-04"
name: "Pawilon Dębowy — blok 1-pokojowy"
version: "2.1.0"
projectPhase: "schematic_design"
bimLOD: "LOD_200"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1200
netFloorArea: 1080
footprintArea: 240

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
  oneBedroom: 9
  twoBedroom: 3
  threeBedroom: 0
  totalUnits: 12

cost:
  totalCost: 1300000
  currency: "EUR"
  basis: "SD_placeholder"
  _meta:
    confidence: "assumed"
    source: "Wycena rzędu wielkości fazy SD, Klasa 5"

designProgress:
  sdStarted: "2026-05-01"
  sdTargetCompletion: "2026-12-31"
  planningSubmission: "2027-02-15"
  planningApprovalExpected: "2027-08-15"
  ddTargetStart: "2027-09-01"
  expectedHandover: "2029-12-15"

notes: |
  Zależny od tempa sprzedaży BLD-03 — jeśli BLD-03 nie sprzeda się przedsprzedaży
  w co najmniej 60% mieszkań w ciągu 6 miesięcy od uruchomienia marketingu,
  zakres/koszt BLD-04 może zostać zrewidowany lub projekt odroczony.
  Konstrukcja nie jest zobowiązana.

tags:
  - "campus-example"
  - "sibling-building"
  - "schematic-stage"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodany z przykładem Kampusu — siostrzany budynek w najwcześniejszej fazie reprezentowanej w kampusie"
---

# BLD-04 — Pawilon Dębowy

5-kondygnacyjny, 12-mieszkaniowy **1-pokojowy** budynek mieszkalny
celujący w młodszych singli i pary. Obecnie w projekcie schematycznym —
**najwcześniejsza faza cyklu życia** w kampusie Zielony Taras Park.
Jeden z trzech siostrzanych budynków do BLD-01.

| Właściwość | Wartość |
|---|---|
| Faza | `schematic_design` |
| Kondygnacje | 5 (tylko nadziemne) |
| Powierzchnia brutto | 1 200 m² (cel — może ewoluować) |
| Mieszkania | 12 (9× 1-pok. + 3× 2-pok. — przewaga 1-pok.) |
| Pewność kosztu | `assumed` (wycena Klasa 5 SD) |
| Oczekiwane przekazanie | 2029-12-15 (zależne od tempa przedsprzedaży BLD-03) |

## Dlaczego BLD-04 jest "przyszłym dzieckiem"

W kontroli gotowości fazowej SBM Kampus jest "gotowy do przejścia do"
fazy *najmniej zaawansowanego dziecka*. BLD-04 w `schematic_design`
przyczepia cały Kampus do tego poziomu. To jest poprawne zachowanie:
plan generalny kampusu nie może być uznany za "gotowy do budowy", podczas
gdy jeden z jego budynków wciąż potrzebuje zatwierdzenia planistycznego.
