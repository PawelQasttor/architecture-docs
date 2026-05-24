---
entityType: "site_feature"
id: "SF-EV-HUB"
version: "2.1.0"
projectPhase: "construction"

featureName: "Hub ładowania EV kampusu"
featureType: "ev_charging"
featureCategory: "other"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Wspólny hub ładowania EV w obrębie kampusowego parkingu: 12 stanowisk
  AC 22 kW (24 złącza) + 2 szybkie ładowarki DC 50 kW. Wymiarowany
  na ~30% penetrację EV w 64 miejscach parkingowych kampusu, z rurami
  ułożonymi pod kolejne 12 stanowisk AC w miarę wzrostu adopcji.

loadManagement:
  totalInstalledKW: 364
  managedPeakKW: 200
  managementStrategy: "Dynamiczne balansowanie obciążenia — dziennie limit 100 kW, nocą 200 kW, dyspozycja przez sieć smart-ładowarek"

connectorMix:
  ac22kw: 12
  dc50kw: 2
  futureExpandableAcPosts: 12

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 78000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"
  - "dekarbonizacja"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Hub ładowania EV kampusu — dodany z przykładem Kampusu"
---

# Hub ładowania EV kampusu (SF-EV-HUB)

Wspólne urządzenie ładowania EV wspierające elektryfikację transportu
w całym kampusie.

| Właściwość | Wartość |
|---|---|
| Stanowiska (dziś) | 12 × 22 kW AC + 2 × 50 kW DC |
| Złącza | 26 |
| Zarządzane szczytowe obciążenie | 200 kW (dynamiczne) |
| Gotowe do rozszerzenia | +12 stanowisk AC (rury ułożone) |
| Koszt | €78 000 |
