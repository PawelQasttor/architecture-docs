---
entityType: "space"
id: "SP-OPTA-BED-01"
version: "2.5.0"
projectPhase: "schematic_design"

spaceName: "Sypialnia (wariant A, 16 m²)"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 16.0
unit: "m"

# v2.5: należy do wariantu projektowego A (wyłączona z rollupu bazowego)
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

# Przestrzeń: Sypialnia — wariant A (16 m²)

Reprezentatywna sypialnia w **wybranym** układzie
[Wariant A](../warianty-projektowe/OPT-SCHEME-A). Oznaczona
`designOptionId: "OPT-SCHEME-A"`, więc jest rozliczana pod Wariantem A w
`option_comparison.json` i **wyłączona z sum bazowych modelu** — istniejące
pomieszczenia bazowe (np. [Sypialnia 01](./sypialnia-01)) pozostają bez zmian.

Jej [odpowiednik z Wariantu B](./sypialnia-wariant-b-01) to alternatywa 12 m².
