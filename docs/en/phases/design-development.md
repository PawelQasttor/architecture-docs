# Design Development

::: tip Phase: `design_development` — 3 of 10
**What you do:** Coordinate all disciplines into a permit-ready design.
**Typical BIM LOD:** LOD 300 — specific elements, precise geometry
**Key deliverables:** Coordinated design, building-permit set, full
regulatory compliance, calculations
**Replaces (legacy):** *Design Development / Building Permit (LOD 300)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> **design_development** → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

The scheme becomes a fully coordinated design suitable for the building
permit application.

1. Coordinate architecture, structure and MEP (clash-free).
2. Specify element types (walls, floors, roof, openings) precisely.
3. Complete regulatory calculations (energy, acoustics, fire).
4. Produce the **building-permit set**.
5. Achieve **full regulatory compliance** — not preliminary.
6. Lock the cost plan (±10%).

---

## SBM entities at this phase

| Entity | Maturity at `design_development` |
|--------|----------------------------------|
| `envelope` | Specific build-ups, U-values, performance |
| `opening` / `opening_type` | Specified products/types |
| `structural_system` | Sized members, foundations, loads |
| `requirement` | Full compliance verified, not `assumed` |
| `material` / `material_type` | Specified with performance data |

```yaml
entityType: "envelope"
projectPhase: "design_development"
bimLOD: "LOD_300"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 300

LOD 300 = **specific** elements: precise geometry, specified assemblies,
accurate quantities for permit and coordination.

```yaml
bimLOD: "LOD_300"
```

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus — full compliance required

- WT 2021: room dimensions, daylight, thermal, acoustic, fire.
- Construction Law: complete permit documentation.
- Energy performance certificate basis.

[WT 2021 →](/en/regulations/wt-2021) ·
[Building Permit →](/en/regulations/building-permit)

---

## Compiler & quality gate

`design_development` is the **last phase that accepts all confidence
levels** — the gate tightens immediately after. Resolve `assumed`
fields here; from `construction_documents` they generate warnings.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase design_development
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 03-design-development && cd 03-design-development
git add . && git commit -m "Design development — coordinated permit set"
git tag design-development-v1.0
```

[PDF export of the permit set →](/en/guides/pdf-export)

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[envelope: external wall →](/en/examples/green-terrace/envelope-external-wall-type-a)

---

## Phase-gate checklist

Before advancing to `construction_documents`:

- [ ] All disciplines coordinated (clash-free)
- [ ] Element types specified (envelope, openings, structure)
- [ ] Regulatory calculations complete
- [ ] Building-permit set produced
- [ ] Full regulatory compliance verified (no `assumed` on requirements)
- [ ] Cost plan locked (±10%)
- [ ] Permit gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `schematic_design`](/en/phases/schematic-design) ·
[**Lifecycle overview**](/en/phases/) ·
[`construction_documents` →](/en/phases/construction-documents)

[Complete document-by-document workflow →](/en/standards/document-structure)
