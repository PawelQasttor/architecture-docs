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
  rowCountAsOf: 61320
  periodStart: "2026-02-12T00:00:00Z"
  periodEnd: "2028-01-31T23:59:59Z"

summaryStatistics:
  basis: "human_asserted"
  min: 2.85
  max: 4.20
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
      currentlyExceeded: true
      exceededSince: "2027-05-04"
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
  - "telemetria"
  - "v2-2-feature"

changelog:
  - version: "2.2.0"
    date: "2026-05-24"
    description: "Strumień telemetrii COP pompy ciepła — napędza narrację spadku wydajności po gwarancji i analizę delty weryfikacji energetycznej"
---

# Strumień telemetrii — COP pompy ciepła (TEL-HP-COP-001)

90-dniowa krocząca średnia COP dla pompy ciepła. Trend spadkowy widoczny
w progresji średnich kroczących (3,46 → 3,37 → 3,34) to dane stojące za
dyskusją spadku wydajności po gwarancji na [`AST-HP-01`](../zasoby/ai-hp-01-ops)
i analizą delty weryfikacji energetycznej w użyciu.

| Statystyka | Wartość |
|---|---|
| Średnia (22 miesiące) | 3,42 |
| 1-roczna krocząca średnia | 3,46 |
| 90-dniowa krocząca średnia | 3,37 |
| 30-dniowa krocząca średnia | **3,34** |
| Cel projektowy | 3,60 (przekroczony od 2027-05-04) |
| Bazowa energetyczna | 3,20 (nieprzekroczona) |

Obecnie przekroczony próg celu projektowego to mechanizm v2.2, który
pozwala kompilatorowi podnosić automatyczne ostrzeżenie "drift"
w czasie kompilacji, zamiast polegać na człowieku zauważającym trend.
