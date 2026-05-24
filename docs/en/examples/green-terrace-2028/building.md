---
entityType: "building"
id: "BLD-01"
name: "Green Terrace Residential Building (in operation)"
version: "2.1.0"
projectPhase: "operation"
bimLOD: "LOD_500"

siteId: "SITE-GREEN-TERRACE"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 320

numberOfStoreys:
  aboveGround: 6
  belowGround: 0
  total: 6
buildingHeight: 18.0
eaveHeight: 16.0
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "standard"

# Operation-phase additions
operationalStatus:
  handoverDate: "2026-03-15"
  occupiedSince: "2026-04-01"
  monthsInOperation: 22
  occupancyRate: 1.0          # 18 / 18 apartments occupied
  notes: "Fully let from month 2; one short tenant rotation in apartment 3.04 (month 11→12)."

cost:
  totalCost: 1745800          # final as-built cost, marginally below forecast €1,750,000
  currency: "EUR"
  basis: "as_built"
  _meta:
    confidence: "measured"
    source: "final_cost_account_2026-04"

tags:
  - "operation-phase-example"
  - "flagship-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase snapshot of BLD-01 — same building as design example, advanced 22 months post-handover"
---

# Green Terrace BLD-01 — Operation Phase (January 2028)

The same six-storey, 18-unit residential building from the
[design example](/en/examples/green-terrace/building), now 22 months into
occupied operation. Final as-built cost €1,745,800 (forecast €1,750,000;
budget €1,800,000 — landed 3.0 % under budget).

| Property | Value |
|---|---|
| Operation status | Occupied since 2026-04-01 (22 months) |
| Occupancy rate | 100 % (18 / 18 apartments let) |
| As-built cost | €1,745,800 (under budget by €54,200) |
| Bim LOD | 500 (As-built / record model) |
| All other properties | Inherited from [design model](/en/examples/green-terrace/building) |

## What changed vs the design entity

Only two field groups are different from the design-phase building entity:

1. **`projectPhase: operation`** (was `design_development` / `construction_documents`)
2. **New `operationalStatus` block** — handover date, occupancy rate, months in operation
3. **`cost.basis: as_built`** with `confidence: measured` (was `project_budget` / `estimated`)
4. **`bimLOD: LOD_500`** — As-built record model (was LOD 400)

Everything else — areas, storeys, occupancy classification, construction class —
is unchanged from the design model. That's the point: the building's
*identity* doesn't change at handover, only its *phase context* and the
data it carries.
