---
entityType: "asset_type"
id: "AT-UFH-MANIFOLD-12ZONE"
typeName: "12-Zone Underfloor Heating Manifold"
category: "hvac"
version: "2.1.0"
description: "Rozdzielacz ogrzewania podłogowego ze stali nierdzewnej z 12 indywidualnie sterowanymi obwodami pętli, przepływomierzami i zaworami równoważącymi."

manufacturer: "Generyczny / klasy specyfikacyjnej"
model: "UFH-MAN-12Z"

specifications:
  circuits: 12
  material: "Stal nierdzewna AISI 304"
  connectionSize: "1\" BSP"
  loopConnections: "3/4\" Eurokonus"
  maxFlowTemperature: "55 °C"
  maxOperatingPressure: "6 bar"
  actuation: "Termoelektryczna 230 V, normalnie zamknięta"

maintenanceProfile:
  serviceInterval: "12 miesięcy"
  inspection: "Coroczna kontrola równoważenia przepływu"
---

# Rozdzielacz ogrzewania podłogowego 12-strefowy (AT-UFH-MANIFOLD-12ZONE)

Szablon typu dla rozdzielaczy ogrzewania podłogowego. Instancje (np.
`AST-UFH-MANIFOLD-01`) należą do systemu `SYS-HVAC-01` i dziedziczą tę
specyfikację.
