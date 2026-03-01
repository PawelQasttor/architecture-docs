---
entityType: site_feature
id: SF-GARDEN-01
featureName: "Ogród Północny"
featureCategory: vegetation
siteId: "SITE-GREEN-TERRACE"

location:
  description: "Północna strona budynku, między elewacją a granicą działki"
  zone: "ogród północny"

dimensions:
  length: 25
  width: 8
  area: 200

materials:
  - material: "Ziemia urodzajna (300mm głębokości)"
    quantity: 60
    unit: "m3"
    supplier: "Ogrodnik Sp. z o.o."
  - material: "Mieszanka rodzimych krzewów"
    quantity: 45
    unit: "szt."
    supplier: "Szkółka Zielona Sp. z o.o."
  - material: "Nasiona trawnikowe (gatunek cieniolubny)"
    quantity: 10
    unit: "kg"
    supplier: "Barenbrug"

condition: "new"

installationData:
  installationDate: "2024-09-15"
  installedBy: "Ogrodnik Sp. z o.o."
  supplier: "Szkółka Zielona Sp. z o.o."

maintenanceSchedule:
  frequency: "monthly_growing_season"
  lastMaintenance: "2025-01-15"
  nextMaintenance: "2025-04-01"
  contractor: "Ogrodnik Sp. z o.o."

sustainabilityMetrics:
  carbonSequestration: 120
  permeability: 0.95
  biodiversityScore: "medium"
  rainfallRetention: 45

constructionPackageId: "CP-FINISHES"

cost:
  totalCost: 12000
  currency: "EUR"
  basis: "landscape_contractor_quote"
cost_meta:
  confidence: "estimated"
  source: "landscape_quote"

ifcMapping:
  ifcEntity: IfcGeographicElement
  globalId: "5xSF-GARDEN-N-001"

version: "1.0.0"
tags:
  - "ogrod"
  - "roslinnosc"
  - "polnoc"
  - "bioroznorodnosc"
---

# Element Terenu: Ogród Północny

Zagospodarowany teren zieleni po północnej stronie budynku, zapewniający przestrzeń rekreacyjną dla mieszkańców i siedlisko bioróżnorodności.

## Wymiary

- **Powierzchnia:** 200 m2 (25m x 8m)
- **Głębokość ziemi urodzajnej:** 300 mm

## Nasadzenia

- 45 rodzimych krzewów (mieszanka gatunków cieniolubnych)
- Nasiona trawnikowe cieniolubne
- Rodzime rośliny okrywowe

## Zrównoważony Rozwój

- **Sekwestracja CO2:** 120 kg/rok
- **Retencja wody deszczowej:** 45 litrów/m2
- **Przepuszczalność:** 95%
- **Bioróżnorodność:** Średnia (gatunki rodzime)

## Utrzymanie

Co miesiąc w sezonie wegetacyjnym (kwi-paź), co kwartał w zimie. Wykonawca: Ogrodnik Sp. z o.o.

---

**Status:** Założony
**Ostatnia aktualizacja:** 2026-03-01
