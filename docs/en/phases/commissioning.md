# Commissioning

::: tip Phase: `commissioning` — 7 of 10
**What you do:** Test, balance and prove the building; capture the
as-built record; obtain acceptance.
**Typical BIM LOD:** LOD 500 — verified as-built
**Key deliverables:** Commissioning test results, as-built model & records,
deficiency (snag) list, acceptance certificate
**Replaces (legacy):** *As-Built Documentation (LOD 500)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → **commissioning** → operation → renovation →
> decommissioned. [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Commission systems: functional tests, balancing, performance proof.
2. Run acceptance tests (airtightness, thermography, water, fire systems).
3. Capture the **as-built record** — model and documents reflect reality.
4. Manage the deficiency / snag list to closure.
5. Obtain formal acceptance and the occupancy basis.

---

## SBM entities at this phase

| Entity | Maturity at `commissioning` |
|--------|------------------------------|
| `commissioning_test` | Results with pass/fail, certificates |
| `asset` | As-installed: serials, test data |
| `envelope` / `space` | As-built dimensions verified |
| `issue` | Deficiencies/snags tracked to closure |
| safety-critical fields | Must be `measured`/`calculated`/`specified` |

```yaml
entityType: "commissioning_test"
projectPhase: "commissioning"
result: "pass"
certificateRef: "AIRTIGHTNESS-2026-014"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 500

LOD 500 = **verified as-built** — field-confirmed geometry and data,
suitable for handover and operation.

```yaml
bimLOD: "LOD_500"
```

[LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- Completion & occupancy formalities (odbiór).
- Mandatory acceptance tests and certificates.
- Fire-systems commissioning sign-off.

[Completion & occupancy →](/en/regulations/completion-occupancy)

---

## Compiler & quality gate

**Strictest gate.** From `commissioning` the compiler **errors on
`estimated` confidence for safety-critical fields** (in addition to the
`assumed` error in force since `bidding_procurement`). Safety-critical
data must be `measured`/`calculated`/`specified` — backed by test
evidence.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase commissioning
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 07-commissioning && cd 07-commissioning
# test-results/, as-built/, deficiency-list.md, acceptance-certificate.md
git add . && git commit -m "Commissioning — tests passed, as-built captured"
git tag acceptance-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[commissioning test entity →](/en/documentation/entities/commissioning-test)

---

## Phase-gate checklist

Before advancing to `operation`:

- [ ] All systems commissioned and balanced
- [ ] Acceptance tests passed (airtightness, thermography, fire, water)
- [ ] As-built model & records reflect reality (LOD 500)
- [ ] Deficiency list closed
- [ ] Safety-critical data `measured`/`calculated`/`specified`
- [ ] Acceptance / occupancy certificate obtained
- [ ] Commissioning gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `construction`](/en/phases/construction) ·
[**Lifecycle overview**](/en/phases/) ·
[`operation` →](/en/phases/operation)

[Complete document-by-document workflow →](/en/standards/document-structure)
