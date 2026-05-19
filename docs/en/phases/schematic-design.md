# Schematic Design

::: tip Phase: `schematic_design` — 2 of 10
**What you do:** Firm up the spatial layout, fix the structural concept,
set the systems strategy, refine cost.
**Typical BIM LOD:** LOD 200 — generic elements, approximate quantities
**Key deliverables:** Developed plan/section/elevation, structural &
MEP strategy, refined cost estimate (±20%)
**Replaces (legacy):** *Schematic Design (LOD 200)*
:::

> The SBM lifecycle has 10 unified phases: concept → **schematic_design** →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

The selected concept becomes a coherent, buildable scheme.

1. Develop the plan, section and elevation from the chosen concept.
2. Fix the **structural concept** (grid, system, primary spans).
3. Set the **MEP strategy** (heating/ventilation/electrical approach).
4. Confirm space program against the brief (areas, adjacencies).
5. Refine the cost estimate to ±20%.
6. Resolve major code questions (egress, fire strategy outline).

---

## SBM entities at this phase

| Entity | Maturity at `schematic_design` |
|--------|---------------------------------|
| `space` | Firm areas, adjacencies, space types confirmed |
| `zone` | Fire & HVAC zones defined with boundaries |
| `system` / `system_type` | Strategy-level systems created |
| `structural_system` | Concept: frame type, grid, primary spans |
| `space_program` | Brief-to-design compliance first checked |
| `requirement` | Key regulatory requirements attached |

```yaml
entityType: "space"
projectPhase: "schematic_design"
designArea: 14.2
unit: "m"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 200

LOD 200 = **generic** elements with approximate size, shape and location.
Walls/floors/roofs as generic assemblies; systems as generic routes.

```yaml
bimLOD: "LOD_200"
```

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- Egress strategy and travel-distance outline.
- Fire-zone concept (ZL classification per WT 2021).
- Daylight / room-dimension minima checked against the program.

[WT 2021 →](/en/regulations/wt-2021) ·
[Construction Law →](/en/regulations/prawo-budowlane)

---

## Compiler & quality gate

`schematic_design` still **accepts all confidence levels** — gates first
tighten at `construction_documents`. Use this phase to drive `assumed`
fields toward `estimated`/`specified` ahead of the gate.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase schematic_design
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 02-schematic-design && cd 02-schematic-design
git add . && git commit -m "Schematic design — scheme + structural/MEP strategy"
git tag schematic-design-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[structural system →](/en/documentation/entities/structural-system)

---

## Phase-gate checklist

Before advancing to `design_development`:

- [ ] Plan/section/elevation developed and internally consistent
- [ ] Structural concept fixed (grid, system, spans)
- [ ] MEP strategy set
- [ ] Space program compliance checked
- [ ] Cost refined to ±20%
- [ ] Fire/egress strategy outlined
- [ ] Schematic gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `concept`](/en/phases/concept) ·
[**Lifecycle overview**](/en/phases/) ·
[`design_development` →](/en/phases/design-development)

[Complete document-by-document workflow →](/en/standards/document-structure)
