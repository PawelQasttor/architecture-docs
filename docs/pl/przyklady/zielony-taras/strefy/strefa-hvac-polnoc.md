---
entityType: "zone"
id: "ZONE-HVAC-NORTH"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "HVAC Zone North"
zoneType: "hvac"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"

properties:
  orientation: "north"
  heatingSystem: "underfloor_heating"
  coolingSystem: "mechanical_ventilation"
  ventilationStrategy: "balanced_mechanical"
  airChangeRate: 0.5
  designTemperatureHeating: 20
  designTemperatureCooling: 26
  unit: "C"

requirements:
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-PL-THERMAL-WALLS-001"

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P4gH0$sLByv4WyFv3MQyS"

version: "1.0.0"
tags:
  - "hvac"
  - "north-facing"
  - "thermal-zone"
---

# Strefa HVAC: Północ

Strefa cieplna i wentylacyjna obejmująca przestrzenie od strony północnej na pierwszym piętrze.

## Charakterystyka Cieplna

- **Orientacja:** Północna (ograniczone zyski solarne)
- **Temperatura projektowa (ogrzewanie):** 20°C
- **Temperatura projektowa (chłodzenie):** 26°C
- **Obciążenie cieplne:** Umiarkowane (ekspozycja północna)

## Instalacje Obsługujące Tę Strefę

- **Ogrzewanie:** Instalacja ogrzewania podłogowego (SYS-HVAC-UFH-01)
- **Wentylacja:** Zrównoważona wentylacja mechaniczna z odzyskiem ciepła (SYS-HVAC-VENT-01)
- **Krotność wymian powietrza:** Minimum 0,5 ACH (standard mieszkalny)

## Przestrzenie Zawarte

- Sypialnia 01 (SP-BLD-01-L01-001)
- Sypialnia 02 (SP-BLD-01-L01-002)

## Strategia Sterowania

- Indywidualne termostaty pokojowe do sterowania ogrzewaniem
- Scentralizowane sterowanie wentylacją z monitoringiem CO2
- Temperatura nocna obniżona: 18°C

## Wymagania Dotyczące Parametrów

- Utrzymanie komfortu cieplnego wg PN-EN 16798-1
- Minimalny dopływ świeżego powietrza: 30 m³/h na osobę (WT 2021 § 134)
- Wartość U ściany: ≤ 0,20 W/(m²·K) (WT 2021 § 328)
