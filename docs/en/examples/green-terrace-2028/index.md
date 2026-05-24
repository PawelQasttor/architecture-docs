# Green Terrace, January 2028 — Operation Phase

The same building from the [Green Terrace design example](/en/examples/green-terrace/),
22 months after handover. Occupied since March 2026. This example shows
what the SBM model carries when a project advances into the **`operation`**
phase: measured commissioning results, asset operational history, real
issues (warranty, tenant maintenance, sensor anomalies), retro-commissioning
recommendations, and post-occupancy energy verification.

**The building:** [`BLD-01`](/en/examples/green-terrace-2028/building) — same
six-storey residential block, now occupied. For the full design model see
the [design-phase example](/en/examples/green-terrace/).

**Lifecycle position:** `operation` — all design and construction artifacts
are inherited (read-only) from the design model; operation-phase entities
are the new layer.

---

## What this example demonstrates

- **Commissioning test results, populated.** The three tests scheduled in the
  design model ([MVHR balancing](/en/examples/green-terrace/commissioning-tests/CT-MVHR-001),
  [air-tightness](/en/examples/green-terrace/commissioning-tests/CT-AIRTIGHTNESS-001),
  [fire drill](/en/examples/green-terrace/commissioning-tests/CT-FIRE-DRILL-001))
  have been executed. The `results.measured` blocks now carry real numbers,
  and one test came back as a **conditional pass** that triggered a follow-up
  non-conformance issue.
- **Asset operational history.** [Heat pump `AST-HP-01`](/en/examples/green-terrace-2028/assets/ai-hp-01-ops)
  has logged ~18,000 runtime hours, has had one warranty compressor
  replacement, and shows a 7 % efficiency drop that needs investigation.
  MVHR + UFH manifold similarly carry service history.
- **Real operation-phase issues**, six of them — covering warranty,
  tenant maintenance, sensor anomaly, retro-commissioning, annual fire
  inspection, and a non-conformance traced back to the air-tightness retest.
- **Energy class verification, post-occupancy.** Measured 47 kWh/m²/year
  vs design 45 — still Class B, but the design margin is narrower than
  expected.
- **Tenant comfort feedback.** 12 of 18 apartments returned the 2027 IEQ
  survey; overall satisfaction is high, with one apartment cluster flagging
  a consistent overheating issue tied to the south facade in summer.
- **A `SCHEMA-GAPS.md` inventory.** The v2.0 schema covers most of the
  above cleanly, but the operation phase reveals gaps that warrant a
  v2.2 discussion: time-series telemetry as a first-class entity,
  occupant surveys, asset operational history shape, and retro-commissioning
  lifecycle distinct from generic Issues.

## Walkthrough — what changed in 22 months

| Aspect | At handover (March 2026) | January 2028 (now) | What it shows |
|---|---|---|---|
| MVHR balancing | Scheduled | **Executed** — η 83 % vs target 85 %, conditional pass after rebalance | `commissioning_test.results.measured` populated |
| Air-tightness | Scheduled | **Conditional pass** — n50 1.7 vs target 1.5, regulatory n50 ≤ 2.5 met | NCR follow-up issue raised |
| Fire drill | Scheduled | **Passed** — 2.3 min vs 2.5 limit (Pathfinder predicted 2.1) | Design simulation vs reality, 0.2 min adverse delta — within tolerance |
| Heat pump runtime | 0 h | **18,420 h**, 1 warranty compressor replacement at month 14 | Asset operational history |
| Energy class | Design B (45 kWh/m²/year) | Measured B (47 kWh/m²/year) | In-use verification narrower than design margin |
| Tenant feedback | n/a | 12/18 apartments surveyed | Post-occupancy IEQ |
| Open issues | 0 | 4 of 6 still open (1 resolved, 1 closed-with-rec) | Operation-phase issue lifecycle |

## Navigation

| Area | Start here |
|------|-----------|
| Building & context | [`BLD-01` (operation phase)](/en/examples/green-terrace-2028/building) · [Level 04 (most ops issues)](/en/examples/green-terrace-2028/levels/level-04) |
| Operational assets | [Heat pump operational record](/en/examples/green-terrace-2028/assets/ai-hp-01-ops) · [MVHR](/en/examples/green-terrace-2028/assets/ai-mvhr-01-ops) · [UFH manifold](/en/examples/green-terrace-2028/assets/ai-ufh-manifold-01-ops) |
| Commissioning results | [MVHR — executed](/en/examples/green-terrace-2028/commissioning-tests/CT-MVHR-001) · [Air-tightness — conditional pass](/en/examples/green-terrace-2028/commissioning-tests/CT-AIRTIGHTNESS-001) · [Fire drill — passed](/en/examples/green-terrace-2028/commissioning-tests/CT-FIRE-DRILL-001) |
| Operation-phase issues | [Heat pump warranty](/en/examples/green-terrace-2028/issues/ISS-WARRANTY-HP-001) · [Tenant request](/en/examples/green-terrace-2028/issues/ISS-TENANT-MR-001) · [CO₂ anomaly](/en/examples/green-terrace-2028/issues/ISS-ANOMALY-CO2-001) · [Retro-cx](/en/examples/green-terrace-2028/issues/ISS-RETROCX-MVHR-001) · [Fire inspection](/en/examples/green-terrace-2028/issues/ISS-INSPECTION-FD-001) · [Air-tightness NCR](/en/examples/green-terrace-2028/issues/ISS-NC-AIRTIGHTNESS-001) |
| Post-occupancy reports | [Energy verification 2027](/en/examples/green-terrace-2028/energy-verification) · [Tenant IEQ survey](/en/examples/green-terrace-2028/tenant-survey-summary) |
| For the v2.2 standard | [Schema gaps surfaced by this example](/en/examples/green-terrace-2028/SCHEMA-GAPS) |

## Why this is a separate example (not an in-place update)

The [design-phase Green Terrace](/en/examples/green-terrace/) is a
teaching artifact pinned at `construction_documents`. Advancing it
in-place to `operation` would destroy that teaching artifact. Side-by-side
the two examples answer different questions:

- **green-terrace/** — "What does an SBM model look like at the end of design?"
- **green-terrace-2028/** — "What does it look like 22 months into operation?"

Same building, two snapshots, two phases. Real projects accumulate both —
the SBM model is the durable carrier for the entire lifecycle.

## Notes on the data

This example is **synthetic but grounded** — measured numbers are plausible
for a residential MVHR + heat-pump building in Warsaw climate, and the
issues are the kinds of things that genuinely happen in the first two
years post-handover. All names + organisations match the design example.

Sensor telemetry and tenant-survey responses are represented as
**narrative summaries with references to external files** (CSV exports);
the SBM v2.0 schema does not yet have first-class entities for time-series
or occupant feedback. See [SCHEMA-GAPS](/en/examples/green-terrace-2028/SCHEMA-GAPS)
for the proposed v2.2 shapes.
