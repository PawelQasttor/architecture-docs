---
entityType: "asset"
id: "AST-MVHR-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "MVHR unit 01 (operational)"
assetTypeId: "AT-MVHR-RESIDENTIAL"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-12-08"
commissioningDate: "2026-02-15"
warrantyExpiry: "2028-02-15"

operationalHistory:
  runtimeHours: 19200          # near-continuous operation (vs heat pump's intermittent)
  runtimeHoursAsOf: "2028-01-31"
  filterChangeCount: 5
  energyConsumed_kWh: 1480

  servicedAt:
    - date: "2026-06-15"
      type: "filter_change"
      technician: "Building maintenance (Adam Lis)"
      findings: "First scheduled F7 filter change at 4 months. Filters moderately soiled. Heat recovery measured 84.2 %."
      cost_eur: 65
    - date: "2026-12-04"
      type: "filter_change"
      technician: "Building maintenance (Adam Lis)"
      findings: "Quarterly F7 change. Heat recovery 83.9 %."
      cost_eur: 65
    - date: "2027-03-22"
      type: "filter_change"
      technician: "Building maintenance (Adam Lis)"
      findings: "Filter change + duct inspection. Found loose insulation on duct to apartment 4.02 — secured."
      cost_eur: 110
    - date: "2027-08-30"
      type: "rebalancing"
      technician: "VentBalance Sp. z o.o. (Krzysztof Wójcik, TR-1234)"
      findings: |
        Full system rebalance per ISS-RETROCX-MVHR-001. Apartment 4.02 supply
        increased from 60 to 70 m³/h on bedroom diffusers; whole-building
        SFP rechecked at 0.48 W/(l/s) (slightly above design 0.45).
      cost_eur: 1200
      relatedIssueId: "ISS-RETROCX-MVHR-001"
    - date: "2027-12-04"
      type: "filter_change"
      technician: "Building maintenance (Adam Lis)"
      findings: "Filter change. Heat recovery 83.1 % (lower than baseline). Heat exchanger surface inspection recommended at 36-month service."
      cost_eur: 65

  performanceTrend:
    baselineHeatRecovery: 85   # design target
    postCommissioningHR: 84.2  # measured at month 4
    currentHR: 83.1            # at month 22
    deltaPct: -2.2             # vs design target
    notes: "Within tolerance overall. Slight downward trend; heat-exchanger fouling suspected. Scheduled deep clean at 36-month service."

  dataSource: "external CSV: telemetry/AST-MVHR-01-airflow-and-hr-2026-04-to-2028-01.csv"

activeIssueIds:
  - "ISS-RETROCX-MVHR-001"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase MVHR record — 19,200 runtime hours, 4 filter changes + 1 rebalance, heat recovery trending -2 % from baseline"
---

# MVHR AST-MVHR-01 — Operational Record (Jan 2028)

The MVHR unit after 22 months and 19,200 runtime hours. Heat recovery
trending **2.2 % below design target** with one rebalance event at
month 18.

| Metric | Value |
|---|---|
| Runtime hours | 19,200 (near-continuous) |
| Filter changes | 5 |
| Energy consumed | 1,480 kWh |
| Service events | 5 (4 filter changes + 1 rebalance) |
| Current heat recovery | 83.1 % (target 85, baseline 84.2) |
| Total service cost (22 mo) | €1,505 |
| Active issue | [ISS-RETROCX-MVHR-001](../issues/ISS-RETROCX-MVHR-001) |

## Performance trend

The slow heat-recovery decline (84.2 → 83.1 % over 18 months) is consistent
with **heat-exchanger surface fouling** despite the F7 filtration upstream.
A deep clean is scheduled at the 36-month service.

The rebalance at month 18 ([`ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001))
increased supply airflow to the Level 04 apartments where occupants
reported stuffy air — addressing the CO₂ anomaly at the source while
the heat-recovery investigation continues.

## Related

- [System `SYS-HVAC-01`](../systems/sys-hvac-01)
- [Issue `ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001)
- Design-phase counterpart: [`AST-MVHR-01` in design model](/en/examples/green-terrace/assets/ai-mvhr-01)
