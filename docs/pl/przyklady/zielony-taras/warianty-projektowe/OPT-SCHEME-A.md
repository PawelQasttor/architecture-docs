---
entityType: "design_option"
id: "OPT-SCHEME-A"
version: "2.5.0"
projectPhase: "schematic_design"

optionName: "Wariant A — większe sypialnie (16 m²)"
status: "selected"
description: |
  Układ mieszkania preferujący mniej, ale większych sypialni (po 16 m²) z dużą
  ilością światła dziennego i miejsca do przechowywania, kosztem jednej sypialni
  mniej na lokal.
rationale: |
  Wybrany na przeglądzie koncepcji: lepszy współczynnik światła dziennego i
  wartość rynkowa przeważyły nad mniejszą liczbą pomieszczeń. Ślad węglowy na m²
  porównywalny; całkowity capex niższy niż w Wariancie B dla tego samego rzutu.
decisionOwner:
  role: "investor"
  name: "Zielony Taras Sp. z o.o."
decisionDate: "2025-08-12"
comparison:
  gfa: 16
  unitCount: 1
  capexEur: 25085
  embodiedCarbon: 1250
  notes: "Na reprezentatywny wariant sypialni (SP-OPTA-BED-01); zob. rollup option-comparison dla sum baseline + wariant."
relatedEntityIds:
  - "BLD-01"
  - "SP-OPTA-BED-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Wariant projektowy: Wariant A — większe sypialnie

**Wybrany** wariant. Bada układ z mniejszą liczbą większych (16 m²) sypialni.

## Rola w modelu

Ten `design_option` jest kontenerem jednej badanej alternatywy. Encje należące
wyłącznie do tego wariantu noszą `designOptionId: "OPT-SCHEME-A"` — tutaj
reprezentatywne pomieszczenie [SP-OPTA-BED-01](../przestrzenie/sypialnia-wariant-a-01).
Kompilator **wyłącza encje oznaczone wariantem z rolllupu bazowego** i raportuje
je per wariant w `option_comparison.json` (baseline + Wariant A vs baseline +
[Wariant B](./OPT-SCHEME-B)).

| Atrybut | Wartość |
|---------|---------|
| Status | ✅ Wybrany (2025-08-12) |
| Rozmiar sypialni | 16 m² |
| Decydent | Inwestor |
| Odpowiednik | [Wariant B](./OPT-SCHEME-B) (odrzucony) |
