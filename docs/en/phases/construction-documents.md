# Construction Documents

::: tip Phase: `construction_documents` — 4 of 10
**What you do:** Produce the complete tender/works set — every detail and
specification a contractor needs to price and build.
**Typical BIM LOD:** LOD 400 — fabrication-level detail
**Key deliverables:** Full specifications, details, schedules, IFC export,
element specifications
**Replaces (legacy):** *Construction Documentation (LOD 400)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → **construction_documents** → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Produce fabrication-level details and junctions.
2. Complete all specifications and schedules.
3. Finalise element specifications (every wall/floor/opening type).
4. Export coordinated IFC for the works set.
5. Issue the tender/works documentation.

---

## SBM entities at this phase

| Entity | Maturity at `construction_documents` |
|--------|---------------------------------------|
| `envelope` / `opening` | Fabrication-level, product-specific |
| `construction_package` | Scoped, sequenced, costed |
| `material` | Final products with procurement data |
| `asset` / `asset_type` | Specified equipment selections |
| every requirement | Verified — `assumed` now generates **warnings** |

```yaml
entityType: "construction_package"
projectPhase: "construction_documents"
bimLOD: "LOD_400"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 400

LOD 400 = **fabrication**: detailing, assembly and installation
information sufficient for manufacture and construction.

```yaml
bimLOD: "LOD_400"
```

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- Specifications cite the governing standards/clauses.
- Fire-stopping, acoustic and thermal details demonstrated.
- Compliance evidence packaged with the works set.

[WT 2021 →](/en/regulations/wt-2021)

---

## Compiler & quality gate

**The first gate engages here.** From `construction_documents` the
compiler **warns on every `assumed` confidence field** — the tender set
must not rest on assumptions. Drive remaining `assumed` data to
`estimated`/`specified`/`measured`.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase construction_documents
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 04-construction-documents && cd 04-construction-documents
# Export IFC 4.0 from the BIM tool; generate element specifications
git add . && git commit -m "Construction documents — full works set"
git tag construction-documents-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[construction packages →](/en/examples/green-terrace/construction-packages/cp-structure)

---

## Phase-gate checklist

Before advancing to `bidding_procurement`:

- [ ] Fabrication-level details complete
- [ ] All specifications & schedules finalised
- [ ] Element specifications issued
- [ ] Coordinated IFC exported
- [ ] No `assumed`-confidence warnings outstanding
- [ ] Tender/works set issued
- [ ] CD gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `design_development`](/en/phases/design-development) ·
[**Lifecycle overview**](/en/phases/) ·
[`bidding_procurement` →](/en/phases/bidding-procurement)

[Complete document-by-document workflow →](/en/standards/document-structure)
