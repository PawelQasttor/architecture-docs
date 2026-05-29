# CLAUDE.md — Semantic Building Model (SBM) Documentation Standard

## What this project is

An **AI-ready documentation standard for architecture** (the *Semantic Building Model*,
SBM), published as a **VitePress documentation site** with a companion **Node.js
compiler** that turns Markdown+frontmatter building models into validated structured
output.

This is **NOT a backend/application project**. There is no Xano, no API server, no
database. It is a docs site + a static-analysis compiler over Markdown. Do not add
backend scaffolding, XanoScript, `apis/`, `functions/`, `tables/`, etc. — that material
was contamination and has been removed.

## Tech stack

- **Docs site:** VitePress 1.6 (Vue 3), bilingual EN + **PL (Polish is the primary
  language — author PL first, then mirror to EN)**
- **Compiler:** Node.js ESM (`"type": "module"`), `node:test` runner, `ajv` + `ajv-formats`
  for JSON Schema validation. No build step for the compiler — run the `.mjs` directly.
- **Schema:** JSON Schema at `schemas/sbm-schema-v2.5.json` (version 2.5.0,
  `sbm_version` const `"2.5"`). Older schemas (v0.1–v2.4) kept frozen for reference.

> Note: tooling (`package.json` + compiler `VERSION`) is at `2.6.0`, while the
> **spec** (schema file + `sbm_version`) is at `2.5`. The offset comes from the
> tooling-only v2.5.0 release (knowledge-graph target, spec unchanged); the spec
> then advanced to 2.5 in the temporal/design-options release (tooling 2.6.0).
> Tooling is now `2.7.0` (query + diff CLI, spec unchanged at 2.5). The compiler
> `VERSION` / schema `sbm_version` remain the source of truth per layer.

## Common commands

```bash
npm run docs:dev          # VitePress dev server (localhost:5173)
npm run docs:build        # Production build — ALSO the dead-link checker (CI gate)
npm test                  # Compiler test suite — node:test, 168 tests
npm run sbm:validate      # Validate the Green Terrace example against the schema
npm run sbm:compile       # Compile Green Terrace -> build/green-terrace
npm run extract:json      # Extract all frontmatter -> docs/public/json
npm run build:all         # extract:json + sbm:compile + docs:build

# Interrogate a compiled model (tooling v2.7, offline):
npm run sbm:query -- "list spaces where designArea > 14"   # query DSL over build/green-terrace
node scripts/compiler/index.mjs query --input build/green-terrace "neighbors SP-BLD-01-L01-001 must_satisfy out"
node scripts/compiler/index.mjs diff --from build/gt-sd --to build/gt-cd --format text  # semantic diff
```

**Before any commit:** run `npm test` (must be 104/104) **and** `npm run docs:build`
(catches dead links — VitePress fails the build on broken internal links).

## Repository structure

```
docs/
  en/   bim-integration documentation examples guides operations phases
        project-management quality regulations standards sustainability templates
  pl/   integracja-bim dokumentacja przyklady przewodniki eksploatacja fazy
        zarzadzanie-projektem jakosc przepisy standardy zrownowazonosc szablony
  .vitepress/config.ts   # sidebar + nav for BOTH locales — update on every doc add
  en/examples/green-terrace   # canonical worked example (PL: pl/.../przyklady/zielony-taras)
schemas/sbm-schema-v2.5.json  # current JSON Schema (v2.0–v2.4 frozen for reference)
scripts/
  compiler/
    index.mjs              # entry point — compile / validate / query / diff modes
    constants.mjs          # phases, entity-type set, safety-critical fields
    query.mjs              # query DSL over a compiled sbm.json (v2.7, offline)
    model-diff.mjs         # semantic diff between two compiled snapshots (v2.7)
    stages/                # pipeline: parse -> normalize -> validate -> quality
    enrichers/             # jurisdiction-pack.mjs (country-specific enrichment)
    targets/               # output generators: asset-register, bim-mapping,
                           #   compliance-report, quality-report, twin-schema,
                           #   html-report, diagrams, knowledge-graph (JSON-LD),
                           #   option-comparison (per-design-option rollups)
    tests/*.test.mjs       # node:test (parse/normalize/validate/quality/integration)
  validate-frontmatter.js          # standalone frontmatter validator
  extract-frontmatter-to-json.mjs  # frontmatter -> JSON exporter
  migrate-prose-to-frontmatter.mjs # migration helper
CHANGELOG.md               # version history (v0.1.0 -> v2.0.0), Keep a Changelog format
```

## SBM model essentials

- **Entities (WHAT):** **35 entity types** using a **type/instance pattern**
  (e.g. Space Type → Space, System Type → System). `entityType` is the canonical
  frontmatter field; `documentType` is deprecated (fallback only). Layers: 27
  design/spatial (v2.0) + 4 operational (v2.2 telemetry_stream, v2.3
  occupant_survey / energy_verification_record / retrocx_recommendation) + 3
  delivery & approval (v2.4 permit / approval_gate / regulatory_inspection) + 1
  design-options (v2.5 design_option). v2.5 also adds two optional cross-cutting
  axes on *every* entity: temporal (`revision` + `revisionHistory`) and
  design-option tagging (`designOptionId` + `variantOf`).
- **Phases (WHEN):** a single unified **10-phase lifecycle** — concept,
  schematic_design, design_development, construction_documents,
  bidding_procurement, construction, commissioning, operation, renovation,
  decommissioned. (v2.0 replaced three inconsistent v1.x phase vocabularies.)
- **Cross-cutting:** classification (Uniclass/OmniClass/CSI/CI-SfB), responsibility,
  and a sustainability framework (embodied/operational carbon, EPC, certifications)
  are optional fields available on all entities.
- The **schema and CHANGELOG are the source of truth** for entity fields and IDs —
  consult `schemas/sbm-schema-v2.5.json` before asserting what a field does.

## Compiler pipeline

`index.mjs` runs entity Markdown through: **parse** (frontmatter → objects) →
**normalize** (derive reverse relationships, hierarchy, space-program compliance) →
**validate** (JSON Schema + cross-entity rules: currency consistency, bidirectional
adjacency, requirement scope, level ordering) → **quality** (per-entity-type quality
profiles, weighted scoring). `targets/` then render structured outputs.

When changing the schema or a pipeline stage, update the matching test in
`scripts/compiler/tests/` and keep `npm test` green.

## Conventions & gotchas

- **PL is primary.** Write/update Polish docs first, then mirror to EN. PL paths use
  Polish slugs (e.g. `/pl/przyklady/zielony-taras/`, not `green-terrace`).
- **All internal links must include the locale prefix** (`/en/...` or `/pl/...`).
  The `docs:build` dead-link checker is unforgiving.
- **Adding a doc page:** also add it to `docs/.vitepress/config.ts` (both locales)
  and keep EN/PL at parity.
- **Adding a required schema field:** update *every* example file in *both*
  sibling examples (green-terrace/ + green-terrace-2028/, EN + PL) or
  `sbm:validate` and `sbm:validate:2028` will fail.
- **Three sibling examples exist:**
  - `green-terrace/` — design-phase reference (CD / LOD 400, 60 files per locale)
  - `green-terrace-2028/` — operation-phase sibling (22 months post-handover, ~30 files per locale)
  - `green-terrace-park/` — Campus showcase (4 buildings at 4 different lifecycle phases, 13 files per locale)
  Each compiles to its own `build/<name>/sbm.json` via dedicated npm scripts
  (`sbm:compile`, `sbm:compile:2028`, `sbm:compile:park` and matching `:validate`).
- **Versioning:** follow Keep a Changelog in `CHANGELOG.md`; releases are committed
  directly to `master` with a `feat(schema)!: SBM vX.Y.Z` message and tagged
  with `git tag -a vX.Y.Z` (linear history). Schema files are frozen at major
  versions (`schemas/sbm-schema-v2.0.json`, `v2.2.json`, `v2.3.json`, `v2.4.json`);
  the current schema is `v2.5.json`.

## Known open work

(All operation-phase SCHEMA-GAPS resolved as of v2.3.0; the delivery & approval
process layer — permit / approval_gate / regulatory_inspection — shipped in
v2.4.0. The example inventory is complete: 34 of 34 entity types have working
examples across the three sibling examples.)

- Pre-handover BIM consumer pilots (real Revit / Solibri / IFC validators)
  would shake out any pset-mapping issues in the v2.2/v2.3 PSets added
  to `bim-mapping.mjs`. No known issue today; just untested in tooling
  outside the SBM project itself.
- The **entity reference manual** (`docs/{en,pl}/documentation/entities/*`,
  plus `creating-entities.md` / `data-governance.md`) still carries
  pre-v2.0 feature-provenance markers like `(v0.3.0)`, `(v0.2.0)`,
  `(v0.6)` on field/section headings. These are arguably intentional
  ("field introduced in version X"), so they were left as-is — a future
  pass could either rebase them onto the v2.x numbering or drop them.
  (The green-terrace *example* entities were fully swept to a v2.x voice
  in commits `8a83380` + `f667c7e`.)
