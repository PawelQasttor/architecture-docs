---
documentType: "zone_type"
entityType: "zone_type"
id: "ZT-HVAC-RESIDENTIAL"
typeName: "HVAC Zone - Residential Standard"
zoneType: "hvac"
description: "Standard residential HVAC zone with underfloor heating and mechanical ventilation for thermal comfort"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-PL-THERMAL-WALLS-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC"

# HVAC ZONE PROPERTIES
properties:
  heatingSystem: "underfloor_heating"
  coolingSystem: "mechanical_ventilation"
  ventilationStrategy: "balanced_mechanical"
  heatingSetpoint: 21.0
  coolingSetpoint: 26.0
  airChangeRate: 0.5
  controlStrategy: "individual_room_thermostats"
  occupancyControl: false
  nightSetback: 18.0

version: "1.0.0"
tags:
  - "hvac"
  - "residential"
  - "thermal-comfort"
  - "underfloor-heating"
---

# Zone Type: HVAC Zone - Residential Standard

## Description

Standard residential HVAC zone providing thermal comfort through underfloor heating and mechanical ventilation with heat recovery (MVHR). Designed for apartment buildings with continuous fresh air supply, individual room temperature control, and high energy efficiency.

## Design Intent

This zone type ensures:
- Thermal comfort per PN-EN 16798-1 (Category II)
- Continuous fresh air supply (0.5 ACH minimum)
- Individual room temperature control
- Energy-efficient operation (heat recovery, low-temperature heating)
- Quiet operation suitable for residential use

## Classification

**System Type:** Low-temperature heating + mechanical ventilation
**Application:** Residential (apartments, houses)
**Climate Control:**
- Winter: Heating via underfloor system
- Summer: Passive cooling via mechanical ventilation (no active cooling)
- Year-round: Fresh air via MVHR

## HVAC Requirements

### REQ-THERMAL-COMFORT-001: Thermal Comfort
**Criterion:** Maintain comfortable temperatures per PN-EN 16798-1
**Compliance:**
- **Heating season (Oct-Apr):** 20-22°C (operative temperature)
- **Cooling season (May-Sep):** 23-26°C (passive, no active cooling)
- **Temperature uniformity:** ≤3°C vertical gradient (floor to head)
- **Radiant asymmetry:** ≤10°C (floor vs ceiling)

**Control:**
- Individual room thermostats (programmable)
- Weather compensation for heat pump/boiler
- Night setback: 18°C (23:00-06:00)

**Verification:** Post-occupancy comfort survey, spot temperature measurements

### REQ-VENTILATION-OCCUPIED-001: Ventilation Rate
**Criterion:** Minimum fresh air supply per WT 2021 § 134
**Compliance:**
- **Bedrooms:** 30 m³/h per person (minimum)
- **Living rooms:** 30 m³/h per person
- **Kitchens:** 70 m³/h (extract)
- **Bathrooms:** 50 m³/h (extract)
- **Continuous ventilation:** 0.5 ACH minimum (24/7)

**System:**
- Balanced mechanical ventilation (supply + extract)
- Heat recovery efficiency ≥85%
- Filtration: F7 minimum (PM2.5 protection)

**Verification:** Airflow measurements, commissioning report, annual maintenance

### REQ-PL-THERMAL-WALLS-001: Thermal Insulation
**Criterion:** External walls meet WT 2021 § 328 requirements
**Compliance:**
- **External walls:** U ≤ 0.20 W/(m²·K)
- **Roof:** U ≤ 0.15 W/(m²·K)
- **Ground floor:** U ≤ 0.30 W/(m²·K)
- **Windows:** Uw ≤ 0.9 W/(m²·K)
- **Thermal bridging:** Ψ-values minimized, no condensation risk

**Verification:** Thermal calculations per PN-EN ISO 13789, energy performance certificate

### REQ-ENERGY-EFFICIENCY-HVAC: Energy Performance
**Criterion:** High-efficiency HVAC systems
**Compliance:**
- **Heat pump COP:** ≥4.0 at A7/W35 (if heat pump used)
- **Boiler efficiency:** ≥92% (if gas boiler used)
- **Heat recovery:** ≥85% efficiency (MVHR)
- **Circulation pumps:** Class A (high efficiency)
- **Controls:** Weather compensation, room-by-room control

**Verification:** Product certifications, energy performance calculations

## Properties Explained

### Heating System: Underfloor Heating
**Advantages:**
- Low flow temperature (35-40°C) → high heat pump efficiency
- Comfortable radiant heating (uniform temperature distribution)
- No radiators → more usable wall space
- Silent operation
- Suitable for low-energy buildings

**Typical Configuration:**
- Manifold with zone valves (one per room or group of rooms)
- PE-Xa pipes 16-20mm diameter, 100-150mm spacing
- Screed depth: 45-60mm (heat distribution)
- Surface temperature: 23-29°C (floor finish dependent)

**Control:**
- Room thermostats → manifold zone valves
- Weather compensation → heat pump/boiler setpoint
- Night setback available

### Ventilation Strategy: Balanced Mechanical
**Mechanical Ventilation with Heat Recovery (MVHR):**
- Supply air: Filtered fresh air from outside
- Extract air: Stale air from wet rooms (kitchen, bathroom)
- Heat recovery: 85-92% efficiency (winter heat, summer bypass)
- Air distribution: Supply to dry rooms (bedrooms, living), extract from wet rooms

**Benefits:**
- Continuous fresh air (no window opening required)
- Heat recovery saves energy
- Filtered air (allergen, PM2.5 protection)
- Controlled indoor air quality (CO₂, humidity)

**Summer Operation:**
- Bypass mode: Fresh air not preheated (free cooling)
- Night cooling: Increased airflow at night
- No active mechanical cooling

### Air Change Rate: 0.5 ACH
**0.5 ACH** = Air Changes per Hour
- Entire zone air volume replaced every 2 hours
- Meets residential ventilation standards
- Balances fresh air supply with energy efficiency

**Example:**
- Bedroom 14.5 m² × 2.7m = 39 m³
- Required airflow: 39 m³ × 0.5 ACH = 19.5 m³/h
- For 2 occupants: 2 × 30 m³/h = 60 m³/h
- **Use higher value:** 60 m³/h (occupancy-based)

### Control Strategy: Individual Room Thermostats
**Room-by-Room Control:**
- Wireless programmable thermostats (one per room or zone)
- Control manifold zone valves (underfloor heating)
- Programmable schedules (different for bedrooms vs living areas)
- User override available

**Zone Manifold:**
- Central manifold (typically in plant room or corridor ceiling)
- Motorized zone valves (24V, normally closed)
- Mixing valve for flow temperature control
- Flow meter per zone

### Heating/Cooling Setpoints

**Heating Setpoint: 21°C**
- Design temperature for heating season
- Comfort range: 20-22°C
- Night setback: 18°C (energy saving, occupants under blankets)

**Cooling Setpoint: 26°C**
- No active cooling (passive building design)
- Acceptable upper limit per PN-EN 16798-1
- Controlled via:
  - External shading (prevent solar gains)
  - Night ventilation (cool down overnight)
  - Thermal mass (delay temperature rise)

**Overheating Risk:**
- North-facing bedrooms: Low risk
- South-facing living rooms: Moderate risk (shading required)
- Roof-level apartments: Higher risk (roof insulation critical)

## System Configuration

### Heating System Components

**Heat Source (Building-Level):**
Option 1 - Air-to-Water Heat Pump:
- Capacity: 12-16 kW (depends on building size)
- COP: 4.0-4.5 at A7/W35
- Flow temperature: 35-40°C (underfloor heating)
- Modulating compressor (20-100%)

Option 2 - Gas Condensing Boiler:
- Efficiency: 92-96%
- Modulating burner
- Flow temperature: 35-45°C (condensing mode)

**Distribution (Zone-Level):**
- Underfloor heating manifold (8-12 zones typical)
- Circulation pump (weather-compensated speed)
- Mixing valve (if high-temp source)
- Zone valves (thermal actuators, 24V)

**Control (Room-Level):**
- Wireless room thermostats
- Programmable schedules
- Manual override

### Ventilation System Components

**MVHR Unit (Building-Level):**
- Heat recovery efficiency: 85-92%
- Airflow: 0.5-0.7 ACH at design occupancy
- F7 filters (supply side)
- EC fans (high efficiency, variable speed)
- Summer bypass damper

**Ductwork (Zone-Level):**
- Supply ducts to bedrooms, living room
- Extract ducts from kitchen, bathrooms
- Acoustic insulation (noise <25 dB(A))
- Airtight connections

**Terminals (Room-Level):**
- Supply diffusers: Adjustable ceiling or wall-mounted
- Extract grilles: Kitchen (70 m³/h), bathrooms (50 m³/h)

## Thermal Performance

### Design Conditions

**Winter (Heating):**
- Outdoor: -20°C (design temperature for Warsaw region)
- Indoor: 21°C (setpoint)
- Heat loss: ~50 W/m² (well-insulated building)

**Summer (No Cooling):**
- Outdoor: 30°C (design temperature)
- Indoor: 26°C (acceptable limit)
- Passive cooling strategies: Shading, night ventilation, thermal mass

### Heating Load Calculation

**Example Bedroom (14.5 m²):**
- Transmission losses: 350W (external wall, window)
- Ventilation losses: 150W (fresh air)
- **Total heat loss:** 500W
- **Specific heat loss:** 34 W/m²

**Underfloor Heating Output:**
- Floor temperature: 26°C (surface)
- Room temperature: 21°C (setpoint)
- Output: 35-40 W/m² (sufficient for well-insulated spaces)

### Ventilation Performance

**Heat Recovery Example:**
- Outdoor air: -20°C
- Extract air: 21°C
- Heat recovery efficiency: 90%
- Supply air after heat recovery: +17°C (approx.)
- Remaining heating: Underfloor system (+17°C → +21°C)

**Energy Savings:**
- Without HR: Heat all fresh air from -20°C to +21°C = 41°C rise
- With 90% HR: Heat from +17°C to +21°C = 4°C rise
- **Energy saved:** 90% of ventilation heat loss

## Compliance References

**Polish Regulations:**
- **WT 2021 § 134:** Ventilation requirements (air change rates)
- **WT 2021 § 328:** Thermal insulation requirements
- **WT 2021 § 267:** Heating system requirements

**European Standards:**
- **PN-EN 16798-1:** Indoor environmental parameters (thermal comfort)
- **PN-EN 1264:** Underfloor heating systems
- **PN-EN 13141-7:** Ventilation components (MVHR units)
- **PN-EN ISO 13789:** Thermal performance calculations

**Energy Performance:**
- **EU Directive 2010/31/EU:** Energy performance of buildings
- **Polish energy performance methodology:** Per WT 2021 Annex 2

## Usage Guidelines

### When to Use This Type
- ✅ Residential apartments (new construction)
- ✅ Low-energy buildings (high insulation)
- ✅ Buildings with heat pump heating
- ✅ Continuous ventilation requirement (airtight construction)
- ✅ Quiet operation priority (no fan coils, silent MVHR)

### When NOT to Use
- ❌ High cooling load buildings (use active cooling system type)
- ❌ Existing buildings with radiators (use different zone type)
- ❌ Natural ventilation preferred (use hybrid system type)
- ❌ Commercial buildings (different occupancy patterns)

## Example Instances

This zone type can be used for:

**North-Facing Zone:**
```yaml
id: "ZONE-HVAC-NORTH-L01"
zoneTypeId: "ZT-HVAC-RESIDENTIAL"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002"]
properties:
  orientation: "north"
  heatingLoad: 1200  # W, calculated
  overheatingRisk: "low"
```

**South-Facing Zone (Higher Solar Gains):**
```yaml
id: "ZONE-HVAC-SOUTH-L01"
zoneTypeId: "ZT-HVAC-RESIDENTIAL"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-003", "SP-BLD-01-L01-004"]
properties:
  orientation: "south"
  heatingLoad: 900   # W, lower due to solar gains
  overheatingRisk: "moderate"
  shadingRequired: true
```

## Commissioning and Maintenance

**Commissioning:**
- Underfloor heating: Pressure test, flow balancing, temperature verification
- MVHR: Airflow measurements, heat recovery efficiency test, noise test
- Controls: Thermostat calibration, schedule programming

**Annual Maintenance:**
- MVHR: Filter replacement (F7 every 6-12 months)
- MVHR: Fan cleaning, heat exchanger inspection
- Heating: System pressure check, pump efficiency check
- Controls: Thermostat battery replacement, schedule review

---

**Document Status:** Zone Type Template
**Version:** 1.0.0
**Applicable Standards:** WT 2021, PN-EN 16798-1
**Last Review:** 2026-02-22
**Next Review:** Energy regulation update or system technology change
