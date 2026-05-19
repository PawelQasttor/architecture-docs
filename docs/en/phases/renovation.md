# Renovation

::: tip Phase: `renovation` — 9 of 10
**What you do:** Retrofit, refurbish or change use — a design loop run
against an existing, occupied asset.
**Typical BIM LOD:** LOD 300–500 — survey of existing + new design
**Key deliverables:** Condition survey, retrofit scope & design,
permit (if required), updated as-built
**Replaces (legacy):** *(new phase)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → **renovation** →
> decommissioned. [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

`renovation` re-enters the design→construction→commissioning loop, but
constrained by an existing building and (often) continued occupation.

1. Survey existing condition (the model is the baseline).
2. Define the retrofit scope (energy, change of use, refurbishment).
3. Design and, where required, re-permit the changes.
4. Construct and re-commission the affected parts.
5. Update the as-built / digital twin to the new reality.

---

## SBM entities at this phase

| Entity | Maturity at `renovation` |
|--------|---------------------------|
| `building` / `space` | Existing baseline vs proposed delta |
| `envelope` / `system` | Retrofit specs, improved performance |
| `commissioning_test` | Re-test of modified systems |
| `issue` | Survey findings, deviations |
| `requirement` | Current-code compliance for the scope |

```yaml
entityType: "envelope"
projectPhase: "renovation"
renovation:
  baseline: "ENV-EW-01@operation"
  measure: "external_wall_insulation"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 300–500

Existing fabric is surveyed to verified as-built (LOD 500); proposed
changes are designed to LOD 300+ then taken back up to LOD 500 on
completion.

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- Renovation may trigger current-code upgrade obligations.
- Permit/notification depending on scope and change of use.
- Energy-upgrade and heritage constraints where applicable.

[Retrofit & upgrades →](/en/operations/retrofit) ·
[Building Permit →](/en/regulations/building-permit)

---

## Compiler & quality gate

Strict regime applies (a renovation acts on a real asset): `assumed`
errors and `estimated` errors on safety-critical fields. Survey data
must be `measured`; proposed-design data follows the same maturity path
as a new build for the scope in hand.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase renovation
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 09-renovation && cd 09-renovation
# condition-survey.md, retrofit-scope.md, design/, recommissioning.md
git add . && git commit -m "Renovation — survey + retrofit scope"
git tag renovation-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[retrofit & upgrades →](/en/operations/retrofit)

---

## Phase-gate checklist

Before returning to `operation` (or proceeding to `decommissioned`):

- [ ] Condition survey complete (measured baseline)
- [ ] Retrofit scope defined and justified
- [ ] Design (and permit if required) complete for the scope
- [ ] Works constructed and modified systems re-commissioned
- [ ] As-built / digital twin updated to the new reality
- [ ] Renovation gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `operation`](/en/phases/operation) ·
[**Lifecycle overview**](/en/phases/) ·
[`decommissioned` →](/en/phases/decommissioned)

[Complete document-by-document workflow →](/en/standards/document-structure)
