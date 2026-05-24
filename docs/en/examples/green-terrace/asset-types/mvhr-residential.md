---
entityType: "asset_type"
id: "AT-MVHR-RESIDENTIAL"
typeName: "Residential MVHR Unit"
category: "hvac"
version: "2.1.0"
description: "Mechanical ventilation with heat recovery unit for residential dwellings — balanced supply/extract with high-efficiency counter-flow heat exchanger."

manufacturer: "Generic / specification-grade"
model: "MVHR-RES"

specifications:
  airflowRange: "100–350 m³/h"
  heatRecoveryEfficiency: "≥ 90%"
  specificFanPower: "≤ 0.45 W/(m³/h)"
  filterClass: "ISO ePM1 (F7) supply, ISO Coarse extract"
  soundPressureLevel: "≤ 32 dB(A) @ 3 m"
  electricalSupply: "230 V / 50 Hz"

maintenanceProfile:
  filterChangeInterval: "6 months"
  serviceInterval: "12 months"
---

# Residential MVHR Unit (AT-MVHR-RESIDENTIAL)

Type template for the dwelling-level mechanical ventilation with heat
recovery units. Instances (e.g. `AST-MVHR-01`) belong to system
`SYS-HVAC-01` and inherit these specifications.
