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

# HVAC Zone: North

Thermal and ventilation zone covering north-facing spaces on first floor.

## Thermal Characteristics

- **Orientation:** North (limited solar gains)
- **Design Temperature (Heating):** 20°C
- **Design Temperature (Cooling):** 26°C
- **Heating Load:** Moderate (north exposure)

## Systems Serving This Zone

- **Heating:** Underfloor heating system (SYS-HVAC-UFH-01)
- **Ventilation:** Balanced mechanical ventilation with heat recovery (SYS-HVAC-VENT-01)
- **Air Change Rate:** 0.5 ACH minimum (residential standard)

## Spaces Included

- Bedroom 01 (SP-BLD-01-L01-001)
- Bedroom 02 (SP-BLD-01-L01-002)

## Control Strategy

- Individual room thermostats for heating control
- Centralized ventilation control with CO2 monitoring
- Night setback temperature: 18°C

## Performance Requirements

- Maintain thermal comfort per PN-EN 16798-1
- Minimum fresh air: 30 m³/h per person (WT 2021 § 134)
- Wall U-value: ≤ 0.20 W/(m²·K) (WT 2021 § 328)
