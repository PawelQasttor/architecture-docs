---
entityType: "asset_type"
id: "AT-UFH-MANIFOLD-12ZONE"
typeName: "12-Zone Underfloor Heating Manifold"
category: "hvac"
version: "2.0.0"
description: "Stainless-steel underfloor heating distribution manifold with 12 individually actuated loop circuits, flow meters, and balancing valves."

manufacturer: "Generic / specification-grade"
model: "UFH-MAN-12Z"

specifications:
  circuits: 12
  material: "Stainless steel AISI 304"
  connectionSize: "1\" BSP"
  loopConnections: "3/4\" Eurocone"
  maxFlowTemperature: "55 °C"
  maxOperatingPressure: "6 bar"
  actuation: "230 V thermoelectric, normally closed"

maintenanceProfile:
  serviceInterval: "12 months"
  inspection: "Annual flow-balancing check"
---

# 12-Zone Underfloor Heating Manifold (AT-UFH-MANIFOLD-12ZONE)

Type template for the underfloor-heating distribution manifolds.
Instances (e.g. `AST-UFH-MANIFOLD-01`) belong to system `SYS-HVAC-01`
and inherit these specifications.
