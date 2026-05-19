# The SBM Lifecycle — 10 Unified Phases

The Semantic Building Model uses **one** phase vocabulary across the whole
standard: the documentation, the schema, and the compiler all speak these
ten phases. There is no separate "LOD phase", "RIBA stage", or numeric
phase to reconcile — this page is the single source of truth.

::: tip One vocabulary, everywhere
A project's current phase is declared once (`projectPhase:` on entities,
`phase:` on the project) and the compiler enforces data-quality gates
against it. See [Compiler phase gates](#compiler-phase-gates) below.
:::

---

## The ten phases

| # | Phase | What it covers | Typical BIM LOD |
|---|-------|----------------|-----------------|
| 1 | [`concept`](/en/phases/concept) | Brief, feasibility, massing, design concepts | LOD 100 |
| 2 | [`schematic_design`](/en/phases/schematic-design) | Spatial layout, systems strategy, structural concept | LOD 200 |
| 3 | [`design_development`](/en/phases/design-development) | Coordinated design, building-permit set | LOD 300 |
| 4 | [`construction_documents`](/en/phases/construction-documents) | Tender/works set, full specifications | LOD 400 |
| 5 | [`bidding_procurement`](/en/phases/bidding-procurement) | Tendering, bid evaluation, contractor award | LOD 400 |
| 6 | [`construction`](/en/phases/construction) | Site execution, RFIs, change orders, inspections | LOD 400 |
| 7 | [`commissioning`](/en/phases/commissioning) | Testing, balancing, as-built record, acceptance | LOD 500 |
| 8 | [`operation`](/en/phases/operation) | Handover, O&M, maintenance, monitoring | LOD 500 |
| 9 | [`renovation`](/en/phases/renovation) | Retrofit, refurbishment, change of use | LOD 300–500 |
| 10 | [`decommissioned`](/en/phases/decommissioned) | End of life, deconstruction, material recovery | — |

Phases are an **ordered lifecycle**. A project advances through them; data
maturity and the compiler's strictness increase as it does.

---

## Migrating from the old 8-phase model

Pre-v2.0 the standard used an 8-step LOD-based vocabulary. Those steps map
onto the unified phases as follows:

| Legacy phase (pre-v2.0) | Unified phase |
|--------------------------|---------------|
| Project Initiation | folded into **`concept`** |
| Concept Design (LOD 100) | **`concept`** |
| Schematic Design (LOD 200) | **`schematic_design`** |
| Design Development (LOD 300) | **`design_development`** |
| Construction Docs (LOD 400) | **`construction_documents`** |
| Construction Phase | **`construction`** |
| As-Built (LOD 500) | **`commissioning`** |
| Handover & Maintenance | **`operation`** |
| *(new)* | **`bidding_procurement`** |
| *(new)* | **`renovation`** |
| *(new)* | **`decommissioned`** |

Legacy numeric phases (`phase: 1`–`8`) are still accepted by the compiler
and mapped automatically — but new projects should use the unified names.

---

## Compiler phase gates

The compiler tightens data-quality requirements as the project matures.
Run it with `--phase <name>` (or rely on the entity `projectPhase:`):

| From phase | Gate |
|------------|------|
| before `construction_documents` | all confidence levels accepted |
| from `construction_documents` | warns on `assumed` confidence |
| from `bidding_procurement` | errors on `assumed` confidence |
| from `commissioning` | errors on `estimated` confidence for safety-critical fields |

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase design_development
```

See the [Compiler documentation](/en/documentation/compiler/) for detail.

---

## Next

Start at [`concept`](/en/phases/concept), or jump to any phase above.
For the document-by-document workflow across the whole lifecycle, see the
[Complete Workflow](/en/standards/document-structure).
