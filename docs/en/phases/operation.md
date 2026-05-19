# Operation

::: tip Phase: `operation` — 8 of 10
**What you do:** Hand over and run the building: O&M, maintenance,
monitoring, asset management.
**Typical BIM LOD:** LOD 500 — maintained as-built / digital twin
**Key deliverables:** O&M manual, maintenance plan, asset register,
warranties, performance monitoring
**Replaces (legacy):** *Handover & Maintenance*
:::

> The SBM lifecycle has 10 unified phases: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → **operation** → renovation →
> decommissioned. [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

1. Hand over: O&M manual, training, warranties, keys/access.
2. Run the **maintenance plan** (planned + reactive).
3. Maintain the **asset register** (serials, service history).
4. Monitor performance (energy, comfort, faults) against targets.
5. Keep the as-built model current as a living digital twin.

---

## SBM entities at this phase

| Entity | Maturity at `operation` |
|--------|--------------------------|
| `asset` | Live register: service history, condition |
| `system` | Operating parameters, monitored performance |
| `commissioning_test` | Periodic re-test / re-balance records |
| `issue` | Operational faults & remedials |
| `requirement` | Ongoing compliance (inspections, certificates) |

```yaml
entityType: "asset"
projectPhase: "operation"
serviceHistory:
  - date: "2026-09-01"
    type: "planned_maintenance"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 500

The LOD 500 model becomes the operational digital twin — kept current
as assets are serviced, replaced or modified.

[Sensors & IoT →](/en/bim-integration/sensors-iot)

---

## Regulatory focus

- Mandatory periodic inspections (building, fire, installations).
- Energy-performance recertification.
- Statutory record-keeping.

[Building operations →](/en/operations/) ·
[Maintenance planning →](/en/operations/maintenance)

---

## Compiler & quality gate

The strictest regime stays in force (from `commissioning`): `assumed`
errors, and `estimated` errors on safety-critical fields. Operational
data should be `measured` with dated sources (service records, BMS logs).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase operation
```

[Lifecycle gate table →](/en/phases/#compiler-phase-gates)

---

## Workflow

```bash
mkdir 08-operation && cd 08-operation
# om-manual.md, maintenance-plan.md, asset-register.md, warranties.md
git add . && git commit -m "Operation — handover pack + maintenance plan"
git tag handover-v1.0
```

---

## Worked example — Green Terrace

[Green Terrace project →](/en/examples/green-terrace/) ·
[asset register output →](/en/documentation/compiler/)

---

## Phase-gate checklist

Operational readiness:

- [ ] O&M manual issued and client trained
- [ ] Maintenance plan active (planned + reactive)
- [ ] Asset register live with serials & warranties
- [ ] Performance monitoring against design targets
- [ ] Statutory inspection schedule running
- [ ] Digital twin kept current
- [ ] Operations review cadence set — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

[← `commissioning`](/en/phases/commissioning) ·
[**Lifecycle overview**](/en/phases/) ·
[`renovation` →](/en/phases/renovation)

[Complete document-by-document workflow →](/en/standards/document-structure)
