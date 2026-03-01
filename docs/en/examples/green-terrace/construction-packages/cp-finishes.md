---
entityType: construction_package
id: CP-FINISHES
packageName: "Interior Finishes & Landscaping"
description: "Interior finishes (floors, walls, ceilings), kitchens, bathrooms, landscaping, parking, and external works."
sequence: 4
scope: "Gypsum boarding, plastering, painting, floor finishes, kitchen and bathroom fit-out, landscaping, permeable paving, site furniture."

status: "planned"
plannedStart: "2024-11-01"
plannedEnd: "2025-03-31"

duration:
  planned: 105

progress:
  percentComplete: 0
  plannedValue: 250000

dependencies:
  - packageId: "CP-ENVELOPE"
    type: "finish_to_start"
    lag: 0
  - packageId: "CP-MEP"
    type: "finish_to_start"
    lag: -15

contractor:
  company: "WykDom Sp. z o.o."
  contact: "Anna Zielinska, +48 22 777 8899"
  contractRef: "GT-2024-FIN-001"
  contractValue: 250000

costBreakdown:
  labor: 110000
  materials: 105000
  equipment: 10000
  overhead: 12000
  contingency: 13000
  total: 250000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 250000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-FINISH-001"

version: "1.0.0"
tags:
  - "finishes"
  - "landscaping"
  - "fit-out"
  - "planned"
---

# Construction Package: Interior Finishes & Landscaping

All interior finishes and external landscaping works.

## Scope

- **Interior:** Gypsum board, plastering, painting, engineered wood floors, tiling
- **Kitchens:** Cabinetry, worktops, appliances
- **Bathrooms:** Sanitaryware, tiling, accessories
- **Landscaping:** [North Garden](../site-features/sf-north-garden), planting
- **External:** [Parking area](../site-features/sf-parking), fencing, site furniture

## Dependencies

- Depends on: **CP-ENVELOPE** (finish-to-start)
- Depends on: **CP-MEP** (finish-to-start, 15-day lead for second fix)

## Schedule

| | Planned |
|---|---------|
| Start | 2024-11-01 |
| End | 2025-03-31 |
| Duration | 105 days |

## Cost

- **Contract value:** EUR 250,000
- **Contractor:** WykDom Sp. z o.o.

## Status

Planned. Awaiting completion of envelope and MEP packages.

---

**Last Updated:** 2026-03-01
