---
entityType: "design_option"
id: "OPT-SCHEME-B"
version: "2.5.0"
projectPhase: "schematic_design"

optionName: "Scheme B — compact bedrooms (12 m²)"
status: "rejected"
description: |
  Apartment layout favouring more, smaller bedrooms (12 m² each) to maximise
  unit count per floor plate.
rationale: |
  Rejected at SD review: although it raised the bedroom count, the 12 m² rooms
  fell short on daylight and storage for the target market, and the extra
  partitions/services raised embodied carbon and capex per usable m².
decisionOwner:
  role: "investor"
  name: "Green Terrace Sp. z o.o."
decisionDate: "2025-08-12"
supersededByOptionId: "OPT-SCHEME-A"
comparison:
  gfa: 12
  unitCount: 1
  capexEur: 20640
  embodiedCarbon: 1040
  notes: "Per representative bedroom variant (SP-OPTB-BED-01); smaller room, but more partitions/services per usable m²."
relatedEntityIds:
  - "BLD-01"
  - "SP-OPTB-BED-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Design Option: Scheme B — compact bedrooms

The **rejected** alternative, kept in the model as a record of the decision.

## Role in the model

Its representative variant [SP-OPTB-BED-01](../spaces/bedroom-opt-b-01) carries
`designOptionId: "OPT-SCHEME-B"` and `variantOf: "SP-OPTA-BED-01"`, linking it to
its Scheme A counterpart. Because it is option-tagged, it never pollutes the
baseline totals; it only appears in the Scheme B column of
`option_comparison.json`.

| Attribute | Value |
|-----------|-------|
| Status | ❌ Rejected (2025-08-12) |
| Superseded by | [Scheme A](./OPT-SCHEME-A) |
| Bedroom size | 12 m² |
| Counterpart | [SP-OPTA-BED-01](../spaces/bedroom-opt-a-01) |
