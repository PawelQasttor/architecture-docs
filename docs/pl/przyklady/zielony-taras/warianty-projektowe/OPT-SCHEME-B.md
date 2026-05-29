---
entityType: "design_option"
id: "OPT-SCHEME-B"
version: "2.5.0"
projectPhase: "schematic_design"

optionName: "Wariant B — kompaktowe sypialnie (12 m²)"
status: "rejected"
description: |
  Układ mieszkania preferujący więcej mniejszych sypialni (po 12 m²) w celu
  maksymalizacji liczby pomieszczeń na rzut.
rationale: |
  Odrzucony na przeglądzie koncepcji: mimo większej liczby sypialni, pokoje 12 m²
  nie spełniały oczekiwań co do światła dziennego i przechowywania dla rynku
  docelowego, a dodatkowe ścianki/instalacje podniosły ślad węglowy i capex na
  użytkowy m².
decisionOwner:
  role: "investor"
  name: "Zielony Taras Sp. z o.o."
decisionDate: "2025-08-12"
supersededByOptionId: "OPT-SCHEME-A"
comparison:
  gfa: 12
  unitCount: 1
  capexEur: 20640
  embodiedCarbon: 1040
  notes: "Na reprezentatywny wariant sypialni (SP-OPTB-BED-01); mniejszy pokój, ale więcej ścianek/instalacji na użytkowy m²."
relatedEntityIds:
  - "BLD-01"
  - "SP-OPTB-BED-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Wariant projektowy: Wariant B — kompaktowe sypialnie

**Odrzucona** alternatywa, zachowana w modelu jako zapis decyzji.

## Rola w modelu

Jej reprezentatywny wariant [SP-OPTB-BED-01](../przestrzenie/sypialnia-wariant-b-01)
nosi `designOptionId: "OPT-SCHEME-B"` oraz `variantOf: "SP-OPTA-BED-01"`, łącząc go
z odpowiednikiem z Wariantu A. Ponieważ jest oznaczony wariantem, nigdy nie zanieca
sum bazowych; pojawia się tylko w kolumnie Wariant B w `option_comparison.json`.

| Atrybut | Wartość |
|---------|---------|
| Status | ❌ Odrzucony (2025-08-12) |
| Zastąpiony przez | [Wariant A](./OPT-SCHEME-A) |
| Rozmiar sypialni | 12 m² |
| Odpowiednik | [SP-OPTA-BED-01](../przestrzenie/sypialnia-wariant-a-01) |
