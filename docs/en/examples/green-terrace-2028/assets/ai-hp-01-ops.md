---
entityType: "asset"
id: "AST-HP-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "Heat pump unit 01 (operational)"
assetTypeId: "AT-BOSCH-COMPRESS-7000I"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-12-10"
commissioningDate: "2026-02-12"
warrantyExpiry: "2028-02-12"   # 2 years from commissioning, currently expired

# Operation-phase data: runtime, service history, performance drift
operationalHistory:
  runtimeHours: 18420
  runtimeHoursAsOf: "2028-01-31"
  cycleCount: 14672
  energyConsumed_kWh: 11250

  servicedAt:
    - date: "2026-09-15"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Filtry czyste; refrigerant charge nominal; COP measured 3.55."
      cost_eur: 180
    - date: "2027-03-22"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Sound levels increased ~3 dBA from baseline; refrigerant charge nominal; COP 3.42."
      cost_eur: 180
    - date: "2027-05-04"
      type: "warranty_repair"
      technician: "Bosch authorized service (Marek Kałuża)"
      findings: |
        Compressor seizure at month 14 (4,500 hours cumulative). Root cause:
        manufacturer-confirmed batch defect on Generation 3 compressors
        produced Q3 2025. Replaced under warranty at zero cost to client.
        Post-replacement: COP measured 3.50, ~0.05 below pre-failure baseline.
      cost_eur: 0
      relatedIssueId: "ISS-WARRANTY-HP-001"
    - date: "2027-09-18"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "COP measured 3.38; refrigerant pressure slightly low; topped up 80 g R-32. Recommend retest at next quarterly."
      cost_eur: 220
    - date: "2027-12-19"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "COP measured 3.34; refrigerant pressure stable since top-up; investigating leak path. Heat exchanger fouling 8% — within 10% service threshold."
      cost_eur: 240

  performanceTrend:
    baselineCOP: 3.60         # design target
    postCommissioningCOP: 3.55 # measured at handover
    currentCOP: 3.34          # at month 22
    deltaPct: -7.2            # vs design target
    notes: "Steady degradation post-compressor-replacement consistent with refrigerant leak; under active investigation."

  dataSource: "external CSV: telemetry/AST-HP-01-runtime-and-cop-2026-04-to-2028-01.csv"

# Active issue tracking this asset
activeIssueIds:
  - "ISS-WARRANTY-HP-001"

tags:
  - "operation-phase-example"
  - "out-of-warranty"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase asset record — 22 months of runtime, 5 service events, compressor replacement under warranty, post-warranty performance drift"
---

# Heat pump AST-HP-01 — Operational Record (Jan 2028)

The Bosch Compress 7000i heat pump after 22 months and 18,420 runtime
hours. Out of warranty (expired Feb 2028). Currently performing **7.2 %
below design target COP**, with steady degradation since the warranty
compressor replacement at month 14.

| Metric | Value |
|---|---|
| Runtime hours | 18,420 |
| Cycle count | 14,672 |
| Energy consumed | 11,250 kWh |
| Service events | 5 (4 planned + 1 warranty repair) |
| Current COP | 3.34 (target 3.6, baseline 3.55) |
| Warranty status | **EXPIRED** (Feb 2028) |
| Active issue | [ISS-WARRANTY-HP-001](../issues/ISS-WARRANTY-HP-001) |

## Performance trend

| Date | Runtime hours | COP | Notes |
|---|---|---|---|
| 2026-02-12 (commissioning) | 0 | 3.55 | At handover — slightly below design 3.6 |
| 2026-09-15 (mo 6) | ~4,200 | 3.55 | First quarterly inspection — stable |
| 2027-03-22 (mo 12) | ~8,400 | 3.42 | Sound increase noted; charge nominal |
| 2027-05-04 (mo 14) | ~9,800 | — | **Compressor failure; warranty replacement** |
| 2027-05-04 (post-repair) | 9,800 | 3.50 | Post-replacement baseline |
| 2027-09-18 (mo 18) | ~13,200 | 3.38 | 80 g R-32 top-up |
| 2027-12-19 (mo 21) | ~16,800 | 3.34 | Pressure stable; investigating leak |
| 2028-01-31 (now) | 18,420 | 3.34 | Current |

## What this entity makes possible

The compiler's **digital twin schema** target picks up `operationalHistory`
references to sensor data; the **asset register** target sums runtime
hours and service costs across all assets; the **CMMS export** target
generates a maintenance calendar.

What the compiler **can't** do yet (see [SCHEMA-GAPS](../SCHEMA-GAPS)):
detect the COP-drift trend automatically. The `performanceTrend` block
is human-summarised from the external CSV; a `telemetry_stream` entity
in v2.2 would let the compiler raise the warning itself when COP drift
exceeds a threshold.

## Related

- [System `SYS-HVAC-01`](../systems/sys-hvac-01) — the system this asset belongs to
- [Issue `ISS-WARRANTY-HP-001`](../issues/ISS-WARRANTY-HP-001) — the warranty replacement narrative
- Design-phase counterpart: [`AST-HP-01` in design model](/en/examples/green-terrace/assets/ai-hp-01)
