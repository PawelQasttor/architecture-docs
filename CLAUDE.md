# CLAUDE.md — Structured Building Model (SBM) Documentation Standard

## What this project is

An **AI-ready documentation standard for architecture** (the *Structured Building Model*,
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
- **Schema:** JSON Schema at `schemas/sbm-schema-v2.0.json` (version 2.0.0,
  `sbm_version` const `"2.0"`). Older schemas (v0.1–v1.1) kept for reference only.

> Note: `package.json` `version` still reads `1.1.0` while the schema/compiler are
> `2.0.0` — bump it when convenient; the compiler version is the source of truth.

## Common commands

```bash
npm run docs:dev          # VitePress dev server (localhost:5173)
npm run docs:build        # Production build — ALSO the dead-link checker (CI gate)
npm test                  # Compiler test suite — node:test, 104 tests
npm run sbm:validate      # Validate the Green Terrace example against the schema
npm run sbm:compile       # Compile Green Terrace -> build/green-terrace
npm run extract:json      # Extract all frontmatter -> docs/public/json
npm run build:all         # extract:json + sbm:compile + docs:build
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
schemas/sbm-schema-v2.0.json  # current JSON Schema
scripts/
  compiler/
    index.mjs              # entry point — `compile` and `validate` modes
    constants.mjs          # phases, entity-type set, safety-critical fields
    stages/                # pipeline: parse -> normalize -> validate -> quality
    enrichers/             # jurisdiction-pack.mjs (country-specific enrichment)
    targets/               # output generators: asset-register, bim-mapping,
                           #   compliance-report, quality-report, twin-schema
    tests/*.test.mjs       # node:test (parse/normalize/validate/quality/integration)
  validate-frontmatter.js          # standalone frontmatter validator
  extract-frontmatter-to-json.mjs  # frontmatter -> JSON exporter
  migrate-prose-to-frontmatter.mjs # migration helper
CHANGELOG.md               # version history (v0.1.0 -> v2.0.0), Keep a Changelog format
```

## SBM model essentials

- **Entities (WHAT):** 27 entity types using a **type/instance pattern**
  (e.g. Space Type → Space, System Type → System). `entityType` is the canonical
  frontmatter field; `documentType` is deprecated (fallback only).
- **Phases (WHEN):** a single unified **10-phase lifecycle** — concept,
  schematic_design, design_development, construction_documents,
  bidding_procurement, construction, commissioning, operation, renovation,
  decommissioned. (v2.0 replaced three inconsistent v1.x phase vocabularies.)
- **Cross-cutting:** classification (Uniclass/OmniClass/CSI/CI-SfB), responsibility,
  and a sustainability framework (embodied/operational carbon, EPC, certifications)
  are optional fields available on all entities.
- The **schema and CHANGELOG are the source of truth** for entity fields and IDs —
  consult `schemas/sbm-schema-v2.0.json` before asserting what a field does.

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
- **Adding a required schema field:** update *every* example file (Green Terrace,
  41 EN / 42 PL files) or `sbm:validate` and tests will fail.
- **Versioning:** follow Keep a Changelog in `CHANGELOG.md`; releases are committed
  directly to `master` with a `Release SBM vX.Y.Z: …` message (linear history).

## Known open work

- **Green Terrace example is still at v1.1.0** and needs a v2.0 refresh
  (recompile against `sbm-schema-v2.0.json`, update changed/required fields).
