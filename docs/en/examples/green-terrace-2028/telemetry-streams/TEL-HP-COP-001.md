---
entityType: "telemetry_stream"
id: "TEL-HP-COP-001"
version: "2.2.0"
projectPhase: "operation"

sensorChannel: "heat_pump_cop"
sourceDeviceId: "BMS-HP-01-COP"
measuredEntityId: "AST-HP-01"
measuredEntityType: "asset"
samplingFrequency: "15min"
unit: "COP"
buildingId: "BLD-01"

dataReference:
  protocol: "file_csv"
  path: "telemetry/AST-HP-01-runtime-and-cop-2026-04-to-2028-01.csv"
  rowCountAsOf: 61320       # ~22 months of 15-min samples
  periodStart: "2026-02-12T00:00:00Z"
  periodEnd: "2028-01-31T23:59:59Z"

summaryStatistics:
  basis: "human_asserted"
  min: 2.85                 # cold-weather minimum
  max: 4.20                 # mild-day peak
  mean: 3.42
  rollingMeans:
    - window: "30d"
      value: 3.34
      asOf: "2028-01-31"
    - window: "90d"
      value: 3.37
      asOf: "2028-01-31"
    - window: "1y"
      value: 3.46
      asOf: "2028-01-31"
  thresholds:
    - kind: "design_target"
      operator: ">="
      value: 3.60
      currentlyExceeded: true     # currently below target
      exceededSince: "2027-05-04"  # post-warranty replacement
    - kind: "energy_baseline"
      operator: ">="
      value: 3.20
      currentlyExceeded: false

qualityMetadata:
  coverage: 0.995
  outageEvents: 2
  calibrationDate: "2026-02-12"
  calibrationDue: "2028-02-12"

tags:
  - "operation-phase-example"
  - "telemetry"
  - "v2-2-feature"

changelog:
  - version: "2.2.0"
    date: "2026-05-24"
    description: "Heat pump COP telemetry stream — drives the post-warranty performance drift narrative and the energy verification delta analysis"
---

# Telemetry stream — Heat pump COP (TEL-HP-COP-001)

90-day rolling mean COP for the heat pump. The downward trend visible in
the rolling-means progression (3.46 → 3.37 → 3.34) is the data backing
the post-warranty performance drift discussion on
[`AST-HP-01`](../assets/ai-hp-01-ops) and the in-use energy verification's
delta analysis.

| Statistic | Value |
|---|---|
| Mean (22 months) | 3.42 |
| 1-year rolling mean | 3.46 |
| 90-day rolling mean | 3.37 |
| 30-day rolling mean | **3.34** |
| Design target | 3.60 (breached since 2027-05-04) |
| Energy baseline | 3.20 (not breached) |

The currently-exceeded design-target threshold is the v2.2 mechanism
that would let the compiler raise an automatic "drift" warning at
compile time, rather than relying on a human to notice the trend.
