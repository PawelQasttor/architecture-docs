# Decommissioned

::: tip Phase: `decommissioned` — 10 of 10
**What you do:** End of life: decommission, deconstruct, recover materials,
archive the record.
**Typical BIM LOD:** — (the model becomes a historical & material record)
**Key deliverables:** Decommissioning plan, pre-demolition audit, material
recovery record, final archived model
**Replaces (legacy):** *(new phase)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation →
> **decommissioned**. [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Decommission systems safely (isolate, drain, make safe).
2. Run a **pre-demolition / pre-deconstruction audit**.
3. Plan material recovery and reuse (circular economy).
4. Deconstruct; record actual diversion from landfill.
5. Archive the final model as a permanent record.

---

## SBM entities at this phase

| Entity | Maturity at `decommissioned` |
|--------|-------------------------------|
| `material` | Recovery/reuse status, diversion rate |
| `asset` | Decommissioned / removed / recovered |
| `building` | Final status; sustainability close-out |
| `issue` | Hazardous-material findings, closures |

```yaml
entityType: "material"
projectPhase: "decommissioned"
endOfLife:
  route: "reuse"
  diversionFromLandfill: 0.82
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements

No new modelling. The as-built model is frozen and archived; it doubles
as a **material passport** for recovery and future reference.

---

## Regulatory focus

- Demolition permit / notification.
- Hazardous-material (e.g. asbestos) survey and removal duties.
- Waste-management and circular-economy reporting.

[Construction formalities →](/en/regulations/construction-formalities)

---

## Compiler & quality gate

Strictest regime applies: recorded end-of-life data must be `measured`
with sources (audit reports, waste transfer notes). This closes the
data-provenance chain begun at `concept`.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase decommissioned
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 10-decommissioned && cd 10-decommissioned
# decommissioning-plan.md, pre-demolition-audit.md, material-recovery.md
git add . && git commit -m "Decommissioned — audit + material recovery record"
git tag decommissioned-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[material entity →](/en/documentation/entities/material)

---

## Phase-gate checklist

End-of-life close-out:

- [ ] Systems safely decommissioned
- [ ] Pre-demolition audit complete
- [ ] Material recovery / reuse plan executed
- [ ] Actual landfill-diversion recorded (`measured`)
- [ ] Hazardous materials surveyed and cleared
- [ ] Final model archived as permanent record
- [ ] Close-out review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `renovation`](/en/phases/renovation) ·
[**Lifecycle overview**](/en/phases/) ·
*(lifecycle end)*

[Complete document-by-document workflow →](/en/standards/document-structure)
