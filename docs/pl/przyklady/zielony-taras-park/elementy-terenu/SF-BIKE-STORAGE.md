---
entityType: "site_feature"
id: "SF-BIKE-STORAGE"
version: "2.1.0"
projectPhase: "construction"

featureName: "Kampusowy schowek na rowery z bezpiecznym dostępem"
featureType: "bike_storage"
featureCategory: "other"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Zadaszony schowek na rowery z bezpiecznym dostępem dla mieszkańców
  kampusu. 96 standardowych stojaków (~1,3 roweru na mieszkanie)
  + 12 stojaków na rowery towarowe / e-rowery (przewymiarowane,
  z gniazdami ładowania) + 4 stojaki gości przy wejściu do kampusu.

standardStands: 96
cargoEbikeStands: 12
visitorStands: 4
totalCapacity: 112

designStandards:
  - "PN-EN 1991-1-1 (obciążenia użytkowe)"
  - "Przewodnik dobrych praktyk Polskiego Towarzystwa Rowerowego (2024)"

accessControl: "Karta-klucz (kampusowe poświadczenia)"
security: "CCTV przy wejściu + diody LED zajętości na stanowisko"

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 35000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Schowek na rowery kampusu — dodany z przykładem Kampusu"
---

# Schowek na rowery kampusu (SF-BIKE-STORAGE)

Bezpieczny zadaszony schowek na rowery obsługujący wszystkie 4 budynki.
96 standardowych stojaków + 12 stojaków na rowery towarowe/e-rowery
(z gniazdami ładowania) + 4 stojaki gości.

| Właściwość | Wartość |
|---|---|
| Pojemność | 112 stojaków łącznie |
| Rower towarowy/e-rower (ładowanie) | 12 |
| Dostęp | Karty-klucz kampusu |
| Koszt | €35 000 |
