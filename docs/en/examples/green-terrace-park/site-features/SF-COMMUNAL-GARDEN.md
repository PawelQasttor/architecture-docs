---
entityType: "site_feature"
id: "SF-COMMUNAL-GARDEN"
version: "2.1.0"
projectPhase: "construction"

featureName: "Campus communal garden"
featureType: "garden"
featureCategory: "vegetation"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Native-planted communal garden + raised allotment beds connecting the
  4 campus buildings. ~800 m² total, with 24 allotment beds (one per
  apartment for the smaller buildings, two-tier waiting list for the
  larger ones). Drought-tolerant native species reduce irrigation
  to <5 L/m²/week in summer.

# Spatial
area: 800
allotmentBeds: 24
unit: "m"

# Sustainability hook
biodiversityFeatures:
  - "20% native flowering species for pollinators"
  - "Insect hotel + bat box on north boundary fence"
  - "Bird feeder + bath stations (operated by residents committee)"
  - "Compost system (3 bays, rotating)"

# Maintenance
maintenanceResponsibility: "Residents' garden committee + quarterly landscape contractor visits"
expectedAnnualOpex: 4200      # EUR

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 42000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"
  - "biodiversity"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus communal garden — added with Campus showcase"
---

# Campus communal garden (SF-COMMUNAL-GARDEN)

A ~800 m² shared garden with 24 allotment beds, native planting,
and biodiversity features.

| Property | Value |
|---|---|
| Area | 800 m² |
| Allotment beds | 24 |
| Maintenance | Residents committee + quarterly landscape contract |
| Annual OPEX | €4,200 |
| Cost (capital) | €42,000 |

The garden is **co-managed** — a residents' committee handles day-to-day
care of the allotment beds + biodiversity features, with a quarterly
landscape contractor for harder pruning / tree work. This is reflected
in `maintenanceResponsibility` so the operation-phase compliance check
knows where to route any future garden-related issue.
