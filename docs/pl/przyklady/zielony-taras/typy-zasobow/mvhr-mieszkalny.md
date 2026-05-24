---
entityType: "asset_type"
id: "AT-MVHR-RESIDENTIAL"
typeName: "Residential MVHR Unit"
category: "hvac"
version: "2.1.0"
description: "Centrala wentylacyjna z odzyskiem ciepła (MVHR) dla lokali mieszkalnych — zrównoważony nawiew/wywiew z wysokosprawnym wymiennikiem przeciwprądowym."

manufacturer: "Generyczny / klasy specyfikacyjnej"
model: "MVHR-RES"

specifications:
  airflowRange: "100–350 m³/h"
  heatRecoveryEfficiency: "≥ 90%"
  specificFanPower: "≤ 0,45 W/(m³/h)"
  filterClass: "ISO ePM1 (F7) nawiew, ISO Coarse wywiew"
  soundPressureLevel: "≤ 32 dB(A) @ 3 m"
  electricalSupply: "230 V / 50 Hz"

maintenanceProfile:
  filterChangeInterval: "6 miesięcy"
  serviceInterval: "12 miesięcy"
---

# Centrala MVHR dla lokali mieszkalnych (AT-MVHR-RESIDENTIAL)

Szablon typu dla central wentylacyjnych z odzyskiem ciepła na poziomie
lokalu. Instancje (np. `AST-MVHR-01`) należą do systemu `SYS-HVAC-01`
i dziedziczą tę specyfikację.
