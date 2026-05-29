---
entityType: "space"
id: "SP-OPTA-BED-01"
version: "2.5.0"
projectPhase: "schematic_design"

spaceName: "Bedroom (Scheme A variant, 16 m²)"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 16.0
unit: "m"

# v2.5: belongs to design option Scheme A (excluded from baseline rollups)
designOptionId: "OPT-SCHEME-A"

cost:
  totalCost: 25085
  currency: "PLN"
  basis: "calculated_from_type"

authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Space: Bedroom — Scheme A variant (16 m²)

A representative bedroom in the **selected** [Scheme A](../design-options/OPT-SCHEME-A)
layout. Tagged `designOptionId: "OPT-SCHEME-A"`, so it is rolled up under Scheme A
in `option_comparison.json` and **excluded from the baseline model totals** — the
existing baseline rooms (e.g. [Bedroom 01](./bedroom-01)) are unaffected.

Its [Scheme B counterpart](./bedroom-opt-b-01) is the 12 m² alternative.
