---
entityType: site_feature
id: SF-PARKING-01
featureName: "Resident Parking Area"
featureCategory: parking
siteId: "SITE-GREEN-TERRACE"
siteFeatureTypeId: "SFT-PERMEABLE-PAVING"

location:
  description: "South-west corner of the site, accessed from ul. Słoneczna"
  zone: "parking"

dimensions:
  length: 30
  width: 12
  area: 360

materials:
  - material: "Permeable concrete blocks (80mm)"
    quantity: 360
    unit: "m2"
    supplier: "Semmelrock"
  - material: "Line marking paint (thermoplastic)"
    quantity: 1
    unit: "set"
  - material: "Bollards (steel, reflective)"
    quantity: 6
    unit: "pcs"

condition: "new"

installationData:
  installationDate: "2024-09-01"
  installedBy: "BudDrog Sp. z o.o."
  supplier: "Semmelrock"

maintenanceSchedule:
  frequency: "quarterly"
  lastMaintenance: "2025-01-10"
  nextMaintenance: "2025-04-10"
  contractor: "BudDrog Sp. z o.o."

sustainabilityMetrics:
  permeability: 0.85
  biodiversityScore: "none"
  rainfallRetention: 25

constructionPackageId: "CP-FINISHES"

cost:
  totalCost: 28000
  currency: "EUR"
  basis: "contractor_quote"
cost_meta:
  confidence: "estimated"
  source: "contractor_quote"

ifcMapping:
  ifcEntity: IfcCivilElement
  globalId: "5xSF-PARKING-SW-001"

version: "1.0.0"
tags:
  - "parking"
  - "permeable-paving"
  - "accessible"
---

# Site Feature: Resident Parking Area

Permeable block-paved parking area for 18 residents plus 2 accessible spaces, located at the south-west corner of the site.

## Layout

- **Area:** 360 m2 (30m x 12m)
- **Spaces:** 18 standard + 2 accessible (WT 2021 SS 55)
- **Surface:** [Permeable Block Paving](../site-feature-types/sft-permeable-paving)
- **Access:** From ul. Sloneczna via dropped kerb

## Accessibility

- 2 accessible spaces (3.6m wide) nearest to building entrance
- Flush kerb transitions
- Tactile paving at pedestrian crossings

## Sustainability

- **Permeability:** 85% (SuDS compliant)
- **Rainwater retention:** 25 litres/m2

## Maintenance

Quarterly inspection and cleaning. Annual jointing aggregate top-up.

---

**Status:** Operational
**Last Updated:** 2026-03-01
