---
entityType: "space"
id: "SP-OPTB-BED-01"
version: "2.5.0"
projectPhase: "schematic_design"

spaceName: "Bedroom (Scheme B variant, 12 m²)"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 12.0
unit: "m"

# v2.5: belongs to design option Scheme B; variant of its Scheme A counterpart
designOptionId: "OPT-SCHEME-B"
variantOf: "SP-OPTA-BED-01"

cost:
  totalCost: 20640
  currency: "PLN"
  basis: "calculated_from_type"

authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Space: Bedroom — Scheme B variant (12 m²)

The 12 m² alternative bedroom from the **rejected** [Scheme B](../design-options/OPT-SCHEME-B)
layout. `variantOf: "SP-OPTA-BED-01"` links it to its
[Scheme A counterpart](./bedroom-opt-a-01); `designOptionId: "OPT-SCHEME-B"` keeps
it out of the baseline and in the Scheme B comparison column.

Smaller room, but Scheme B needed more of them plus extra partitions/services —
the trade-off captured in the [option comparison](../design-options/OPT-SCHEME-B).
