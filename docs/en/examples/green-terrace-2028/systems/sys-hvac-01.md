---
entityType: "system"
id: "SYS-HVAC-01"
version: "2.1.0"
projectPhase: "operation"

systemName: "HVAC system — main"
systemTypeId: "SYS-HVAC-RESIDENTIAL-MVHR"
buildingId: "BLD-01"
systemCategory: "hvac"

# Operation-phase performance summary
operationalSummary:
  monthsOperational: 22
  measuredEfficiency:
    heatPumpAvgCOP: 3.4         # design target 3.6 — 5.5% below target
    mvhrAvgHeatRecovery: 83     # % — design target 85
    overallSystemUptime: 99.2   # % over 22 months
  serviceEvents:
    plannedMaintenance: 4       # quarterly inspections, all complete
    unplannedInterventions: 2   # warranty compressor + one tenant call-out
    rebalancingEvents: 1        # MVHR airflow rebalance at month 18
  dataSource: "external CSV: telemetry/SYS-HVAC-01-bms-2026-04-to-2028-01.csv"

# Active operation-phase issues affecting this system
activeIssueIds:
  - "ISS-WARRANTY-HP-001"        # heat pump compressor replacement (resolved)
  - "ISS-RETROCX-MVHR-001"       # MVHR rebalance recommendation (open)
  - "ISS-ANOMALY-CO2-001"        # bedroom CO2 anomaly (open)

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase HVAC system — carries measured efficiency, service-event tallies, and refs to active operation issues"
---

# HVAC System (operation phase) — SYS-HVAC-01

22 months of operational performance for the building-wide HVAC system.
For the system design see the [design example](/en/examples/green-terrace/systems/sys-hvac-01).

| Metric | Measured (22 mo) | Design target | Delta |
|---|---|---|---|
| Heat pump avg COP | 3.4 | 3.6 | −5.5 % |
| MVHR avg heat recovery | 83 % | 85 % | −2 pp |
| Overall system uptime | 99.2 % | (none) | n/a |
| Planned maintenance | 4 quarterly inspections | 8 over 22 mo | half-rate (post-warranty period reduced) |
| Unplanned interventions | 2 | (target 0) | 1 warranty + 1 tenant call-out |
| Rebalancing events | 1 (at month 18) | (none) | tied to ISS-RETROCX |

## What the numbers say

The system is **performing within tolerance** for uptime and heat recovery,
but the heat-pump COP is **5.5 % below design target**. The 7 % efficiency
drop on the heat pump itself (see [`AST-HP-01`](../assets/ai-hp-01-ops))
explains most of this gap; the post-warranty compressor replacement is
believed to have introduced a refrigerant-charge anomaly that requires
investigation.

## Telemetry source

The measured efficiency figures are 90-day rolling means from the BMS,
exported as CSV at the file path in `operationalSummary.dataSource`.
The SBM v2.0 schema doesn't model time-series natively — see
[SCHEMA-GAPS](../SCHEMA-GAPS) for the proposed `telemetry_stream`
entity that would replace the external-file reference.
