---
entityType: "building"
id: "BLD-01"
name: "Green Terrace Residential Building"
version: "2.0.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

siteId: "SITE-GREEN-TERRACE"
usage: "residential"
buildingType: "residential_multifamily"

# Areas (m²)
grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 320

# Massing
numberOfStoreys:
  aboveGround: 6
  belowGround: 0
  total: 6
buildingHeight: 18.0
eaveHeight: 16.0
unit: "m"

# Regulatory classification (PL — WT 2021)
occupancyClassification: "ZL_IV"   # residential / mieszkalna (WT 2021)
constructionClass: "C"

accessibilityCompliance: "standard"

cost:
  totalCost: 1800000
  currency: "EUR"
  basis: "project_budget"
  _meta:
    confidence: "estimated"
    source: "project_specification.budget"

tags:
  - "flagship-example"
---

# Green Terrace Residential Building (BLD-01)

The single building of the Green Terrace development on site
`SITE-GREEN-TERRACE`. A six-storey multi-family residential block:
ground floor plus five upper floors (`LVL-00` … `LVL-05`), 18 dwelling
units, ~54 occupants.

| Property | Value |
|---|---|
| Gross floor area | 1,800 m² |
| Net floor area | 1,620 m² |
| Footprint | 320 m² |
| Storeys | 6 (LVL-00 ground → LVL-05) |
| Height | 18.0 m (eave 16.0 m) |
| Occupancy | ZL IV (residential, WT 2021) |
| Construction class | C |

All spaces, levels, envelopes, and construction packages in this example
reference this building via `buildingId: "BLD-01"`.
