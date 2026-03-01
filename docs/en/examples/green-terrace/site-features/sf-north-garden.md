---
entityType: site_feature
id: SF-GARDEN-01
featureName: "North Garden"
featureCategory: vegetation
siteId: "SITE-GREEN-TERRACE"

location:
  description: "North side of the building, between the building facade and the site boundary"
  zone: "north garden"

dimensions:
  length: 25
  width: 8
  area: 200

materials:
  - material: "Topsoil (300mm depth)"
    quantity: 60
    unit: "m3"
    supplier: "Ogrodnik Sp. z o.o."
  - material: "Native shrub mix"
    quantity: 45
    unit: "plants"
    supplier: "Szkółka Zielona Sp. z o.o."
  - material: "Lawn seed (shade-tolerant)"
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
  - "garden"
  - "vegetation"
  - "north"
  - "biodiversity"
---

# Site Feature: North Garden

Landscaped garden area on the north side of the building, providing green space for residents and biodiversity habitat.

## Dimensions

- **Area:** 200 m2 (25m x 8m)
- **Topsoil depth:** 300 mm

## Planting

- 45 native shrubs (shade-tolerant species mix)
- Shade-tolerant lawn seed
- Native groundcover

## Sustainability

- **CO2 sequestration:** 120 kg/year
- **Rainwater retention:** 45 litres/m2
- **Permeability:** 95%
- **Biodiversity:** Medium (native species)

## Maintenance

Monthly during growing season (Apr-Oct), quarterly in winter. Contractor: Ogrodnik Sp. z o.o.

---

**Status:** Established
**Last Updated:** 2026-03-01
