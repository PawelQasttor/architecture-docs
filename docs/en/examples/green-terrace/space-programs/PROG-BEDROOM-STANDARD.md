---
entityType: "space_program"
id: "PROG-BEDROOM-STANDARD"
version: "2.1.0"
projectPhase: "concept"

# What the brief asked for, before any plan was drawn
programName: "Standard Bedrooms (Brief)"
description: |
  Concept-phase quantitative brief for standard bedrooms in the Green Terrace
  residential development. Captures the client's program requirement — how many
  bedrooms of what size — independent of any specific floor plan. The compiler
  cross-checks designed bedroom instances against this target.

buildingId: "BLD-01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
spaceType: "bedroom"

# 18 apartments × average ~1.83 bedrooms (6×1BR + 9×2BR + 3×3BR = 33 beds total).
# Of those, ~27 are "standard" bedrooms; the remaining 6 are master/larger.
requiredQuantity: 27
requiredTotalArea: 405          # 27 × ~15 m² typical
requiredAreaPerUnit:
  min: 10
  max: 18
  typical: 15

priority: "critical"

classification:
  system: "Uniclass2015"
  code: "SL_25_10_05"
  title: "Bedrooms"

sources:
  - id: "SRC-PROG-BEDROOM-STANDARD-01"
    title: "Green Terrace — Client Brief v1.0"
    type: "other"
    documentType: "client_brief"
    date: "2025-04-15"
    author: "Green Development Sp. z o.o."

tags:
  - "concept-phase-artifact"
  - "brief-to-design"

notes: |
  Programmed at concept phase (2025-04). Carries forward through schematic
  design, design development and construction documents — every later phase
  is judged against it. `designedQuantity`, `designedTotalArea`, and the
  `compliance` block are auto-computed by the SBM compiler from designed
  Space instances that reference `spaceTypeId: ST-BEDROOM-STANDARD-A`.

  **Expected compiler warning in this example.** The Green Terrace docs ship
  with only TWO sample bedroom files (`bedroom-01`, `bedroom-02`) for
  pedagogical brevity, not the full 27. The compiler correctly flags this
  as `under_provision` — that IS the brief-to-design check working. In a
  real project all 27 bedroom instances would exist and the compliance
  status would flip to `compliant`. The warning is intentional in the
  example; it demonstrates the check fires.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — surfaces the concept-phase brief artifact that anchors the rest of the model"
---

# Space Program — Standard Bedrooms (PROG-BEDROOM-STANDARD)

The Green Terrace **client brief** (April 2025, concept phase) asked for **27
standard bedrooms** totalling roughly **405 m²**, with typical room area
around **15 m²** (range 10–18 m²).

This Space Program entity captures that brief as a measurable, machine-readable
target. Every later phase — schematic design, design development, construction
documents — is checked against it. When designed Space instances are added that
reference `spaceTypeId: ST-BEDROOM-STANDARD-A`, the compiler computes:

| Field | Source |
|---|---|
| `designedQuantity` | Count of designed bedroom instances |
| `designedTotalArea` | Sum of their `designArea` values |
| `compliance.quantityMet` | `designedQuantity ≥ requiredQuantity` |
| `compliance.areaMet` | `designedTotalArea ≥ requiredTotalArea` (within tolerance) |
| `compliance.status` | `compliant` · `over_provision` · `under_provision` · `not_started` |

That is the brief-to-design check the SBM compiler performs automatically.

## Why this entity exists in the example

The earlier Green Terrace example jumped straight to **design development**
content — bedrooms with finishes, levels with ceiling heights, zones with
fire ratings. The missing concept-phase entity made it look like the model
"begins with geometry". In reality every project begins with a **program**,
and that program is the durable source of truth the design owes back.

By keeping the program as a first-class entity:

- **Architects** can see whether the design still meets the original brief
  after late-stage changes.
- **Clients** can audit promised quantities at any phase.
- **Compilers** can flag a regression the moment a bedroom is removed.

## Related

- [Space Type `ST-BEDROOM-STANDARD-A`](../space-types/ST-BEDROOM-STANDARD-A) — the template every designed bedroom inherits from
- [Bedroom 01](../spaces/bedroom-01) — one of the designed instances counted against this program
