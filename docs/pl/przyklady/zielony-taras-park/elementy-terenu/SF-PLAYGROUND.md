---
entityType: "site_feature"
id: "SF-PLAYGROUND"
version: "2.1.0"
projectPhase: "construction"

featureName: "Wspólnotowy plac zabaw kampusu"
featureType: "playground"
featureCategory: "playground"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Wspólnotowy plac zabaw w centrum działki Fazy 2, zaprojektowany dla
  dzieci w wieku 3-12 lat ze wszystkich 4 budynków kampusu. W przybliżeniu
  równo oddalony od wejść 4 budynków. Wyposażenie zgodne z EN 1176
  + nawierzchnia amortyzująca uderzenia zgodna z EN 1177.

area: 220
unit: "m"

designStandards:
  - "EN 1176 — Bezpieczeństwo wyposażenia placów zabaw"
  - "EN 1177 — Nawierzchnie amortyzujące uderzenia"
  - "WT 2021 § 40 — Strefy zabaw dzieci w osiedlach mieszkaniowych"

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"
expectedDailyUsers: 45

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 28000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Wspólnotowy plac zabaw — dodany z przykładem Kampusu, demonstruje Element Terenu należący do Kampusu"
---

# Plac zabaw kampusu (SF-PLAYGROUND)

220 m² wspólnotowy plac zabaw w centrum działki Fazy 2, obsługujący
dzieci ze wszystkich 4 budynków Zielony Taras Park.

| Właściwość | Wartość |
|---|---|
| Powierzchnia | 220 m² |
| Standardy projektowe | EN 1176, EN 1177, WT 2021 § 40 |
| Obsługiwane budynki | wszystkie 4 |
| Koszt | €28 000 (przetarg rozstrzygnięty) |
