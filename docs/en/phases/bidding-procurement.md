# Bidding & Procurement

::: tip Phase: `bidding_procurement` — 5 of 10
**What you do:** Issue the tender, evaluate bids, award the contract — the
design is frozen; this phase is commercial, not design.
**Typical BIM LOD:** LOD 400 — the issued works set, unchanged
**Key deliverables:** Tender package, bid evaluation, contractor award,
signed contract, procurement schedule
**Replaces (legacy):** *(new phase — was implicit between CD and construction)*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → **bidding_procurement** →
> construction → commissioning → operation → renovation → decommissioned.
> [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Issue the tender package to bidders.
2. Run the Q&A / clarification (RFI) process during tender.
3. Evaluate bids — price, programme, competence, compliance.
4. Award the contract; record the decision and rationale.
5. Establish the procurement schedule for long-lead items.

The design **does not change** here. Any change is a documented exception
fed back through `design_development` / `construction_documents`.

---

## SBM entities at this phase

| Entity | Maturity at `bidding_procurement` |
|--------|------------------------------------|
| `construction_package` | Priced; awarded contractor recorded |
| `material` / `asset` | Procurement status, lead times |
| `issue` | Tender clarifications captured as RFIs |
| `requirement` | Frozen — must be verified, never `assumed` |

```yaml
entityType: "construction_package"
projectPhase: "bidding_procurement"
procurement:
  status: "awarded"
  leadTimeWeeks: 12
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 400

No new modelling — the issued LOD 400 set is the contractual basis.
Bidders may produce their own LOD 400 fabrication models post-award.

---

## Regulatory focus

- Public-procurement rules where applicable (PZP for public clients).
- Contract form and compliance obligations fixed.

[Construction formalities →](/en/regulations/construction-formalities)

---

## Compiler & quality gate

**The gate hardens here.** From `bidding_procurement` the compiler
**errors on any `assumed` confidence** — you cannot tender or contract on
assumed data. The model must be fully verified before award.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase bidding_procurement
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 05-bidding-procurement && cd 05-bidding-procurement
# tender-package/, bid-evaluation.md, award-decision.md
git add . && git commit -m "Bidding & procurement — contract awarded"
git tag contract-award-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[construction packages →](/en/examples/green-terrace/construction-packages/cp-mep)

---

## Phase-gate checklist

Before advancing to `construction`:

- [ ] Tender package issued
- [ ] Tender clarifications logged as `issue` (RFI) entities
- [ ] Bids evaluated against price/programme/competence
- [ ] Contract awarded; decision recorded
- [ ] Procurement schedule for long-lead items established
- [ ] No `assumed`-confidence errors (gate is hard here)
- [ ] Award gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `construction_documents`](/en/phases/construction-documents) ·
[**Lifecycle overview**](/en/phases/) ·
[`construction` →](/en/phases/construction)

[Complete document-by-document workflow →](/en/standards/document-structure)
