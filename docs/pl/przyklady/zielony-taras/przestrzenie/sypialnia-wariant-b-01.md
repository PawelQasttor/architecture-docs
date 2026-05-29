---
entityType: "space"
id: "SP-OPTB-BED-01"
version: "2.5.0"
projectPhase: "schematic_design"

spaceName: "Sypialnia (wariant B, 12 m²)"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 12.0
unit: "m"

# v2.5: należy do wariantu B; wariant swojego odpowiednika z Wariantu A
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

# Przestrzeń: Sypialnia — wariant B (12 m²)

Alternatywna sypialnia 12 m² z **odrzuconego** układu
[Wariant B](../warianty-projektowe/OPT-SCHEME-B). `variantOf: "SP-OPTA-BED-01"`
łączy ją z [odpowiednikiem z Wariantu A](./sypialnia-wariant-a-01);
`designOptionId: "OPT-SCHEME-B"` utrzymuje ją poza bazą i w kolumnie porównania
Wariantu B.

Mniejszy pokój, ale Wariant B potrzebował ich więcej oraz dodatkowych
ścianek/instalacji — kompromis ujęty w [porównaniu wariantów](../warianty-projektowe/OPT-SCHEME-B).
