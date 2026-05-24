---
entityType: "site_feature"
id: "SF-PLAYGROUND"
version: "2.1.0"
projectPhase: "construction"

featureName: "Campus communal playground"
featureType: "playground"
featureCategory: "playground"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Communal playground at the centre of the Phase 2 plot, designed to serve
  children aged 3-12 from all 4 campus buildings. Approximately equidistant
  from all 4 building entrances. EN 1176 compliant equipment + EN 1177
  impact-attenuating surface.

# Spatial
area: 220                  # m²
unit: "m"

# Compliance / design parameters
designStandards:
  - "EN 1176 — Playground equipment safety"
  - "EN 1177 — Impact-attenuating surfaces"
  - "WT 2021 § 40 — Children's play areas in residential developments"

# Usage scope (campus-wide)
servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"
expectedDailyUsers: 45    # ~25% of campus children at peak hours

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
    description: "Communal playground — added with the Campus showcase example, demonstrates a Site Feature owned by the Campus"
---

# Campus playground (SF-PLAYGROUND)

A 220 m² communal playground at the centre of the Phase 2 plot, serving
children from all 4 Green Terrace Park buildings.

| Property | Value |
|---|---|
| Area | 220 m² |
| Design standards | EN 1176, EN 1177, WT 2021 § 40 |
| Served buildings | all 4 (BLD-01, BLD-02, BLD-03, BLD-04) |
| Cost | €28,000 (tender awarded) |

## Why this is on the Campus rather than a Building

A playground physically sits *between* buildings and serves *all of them*.
Assigning it to any one Building would be wrong. The Campus entity is
the right owner — it can hold `Site Feature` entries that aren't tied
to any single building.
