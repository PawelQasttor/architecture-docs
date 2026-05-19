# Construction

::: tip Phase: `construction` — 6 of 10
**What you do:** Build it. Administer the contract: RFIs, change orders,
inspections, progress, quality.
**Typical BIM LOD:** LOD 400 — fabrication, progressively as-built
**Key deliverables:** RFI/change-order log, inspection records, progress
reports, quality records
**Replaces (legacy):** *Construction Phase*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> **construction** → commissioning → operation → renovation →
> decommissioned. [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Administer the works: site instructions, progress, payments.
2. Manage **RFIs and change orders** as tracked `issue` entities.
3. Run inspections and hold points; record outcomes.
4. Capture quality and material-conformance records.
5. Begin progressive as-built capture (feeds `commissioning`).

---

## SBM entities at this phase

| Entity | Maturity at `construction` |
|--------|-----------------------------|
| `issue` | RFIs, change orders, inspections, NCRs, punch list |
| `construction_package` | Actual progress, committed/spent cost |
| `asset` | Delivered/installed status, serials |
| `commissioning_test` | Scheduled; early tests begun |
| `requirement` | Conformance evidence accumulating |

```yaml
entityType: "issue"
projectPhase: "construction"
issueType: "rfi"
status: "open"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 400

The LOD 400 model is maintained; deviations are logged as `issue`
entities and reflected as the basis for the as-built record.

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- Construction-phase formalities, site logbook (dziennik budowy).
- Inspections and mandatory hold points.
- Change control against the permitted design.

[Construction formalities →](/en/regulations/construction-formalities)

---

## Compiler & quality gate

The hard `assumed`-confidence error remains in force (since
`bidding_procurement`). New construction data (progress, installed
assets) should be recorded at `measured`/`specified` confidence with
sources (site records, delivery dockets).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase construction
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 06-construction && cd 06-construction
# rfi-log.md, change-orders/, inspections/, progress/
git add . && git commit -m "Construction — progress + RFI/change log"
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[issue entity →](/en/documentation/entities/issue)

---

## Phase-gate checklist

Before advancing to `commissioning`:

- [ ] RFIs and change orders logged and resolved (`issue` entities)
- [ ] Inspections and hold points recorded
- [ ] Quality / material conformance captured
- [ ] Progressive as-built data being captured
- [ ] Construction-phase formalities maintained
- [ ] Pre-commissioning gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `bidding_procurement`](/en/phases/bidding-procurement) ·
[**Lifecycle overview**](/en/phases/) ·
[`commissioning` →](/en/phases/commissioning)

[Complete document-by-document workflow →](/en/standards/document-structure)
