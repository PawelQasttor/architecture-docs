---
entityType: "design_option"
id: "OPT-SCHEME-A"
version: "2.5.0"
projectPhase: "schematic_design"

optionName: "Scheme A — larger bedrooms (16 m²)"
status: "selected"
description: |
  Apartment layout favouring fewer, larger bedrooms (16 m² each) with generous
  daylight and storage, at the cost of one fewer bedroom per unit.
rationale: |
  Selected at SD review: better daylight factor and resale value in the target
  market outweighed the lower unit count. Embodied carbon per m² is comparable;
  total capex is lower than Scheme B for the same floor plate.
decisionOwner:
  role: "investor"
  name: "Green Terrace Sp. z o.o."
decisionDate: "2025-08-12"
comparison:
  gfa: 16
  unitCount: 1
  capexEur: 25085
  embodiedCarbon: 1250
  notes: "Per representative bedroom variant (SP-OPTA-BED-01); see option-comparison rollup for baseline + option totals."
relatedEntityIds:
  - "BLD-01"
  - "SP-OPTA-BED-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Design Option: Scheme A — larger bedrooms

The **selected** scheme. Explores a layout with fewer, larger (16 m²) bedrooms.

## Role in the model

This `design_option` is the container for one explored alternative. Entities that
belong only to this scheme carry `designOptionId: "OPT-SCHEME-A"` — here, the
representative variant room [SP-OPTA-BED-01](../spaces/bedroom-opt-a-01). The
compiler **excludes option-tagged entities from the baseline rollup** and instead
reports them per option in `option_comparison.json` (baseline + Scheme A vs
baseline + [Scheme B](./OPT-SCHEME-B)).

| Attribute | Value |
|-----------|-------|
| Status | ✅ Selected (2025-08-12) |
| Bedroom size | 16 m² |
| Decision owner | Investor |
| Counterpart | [Scheme B](./OPT-SCHEME-B) (rejected) |
