---
entityType: "system_type"
id: "SYT-HVAC-RESIDENTIAL-MVHR"
typeName: "Residential HVAC - MVHR + Heat Pump"
systemCategory: "hvac"
description: "Standard residential HVAC system combining mechanical ventilation with heat recovery (MVHR), air-to-water heat pump heating, and underfloor heating distribution for energy-efficient residential buildings"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-HVAC-VENTILATION-RATE"
  - "REQ-HVAC-HEAT-RECOVERY"
  - "REQ-ENERGY-EFFICIENCY-HVAC"
  - "REQ-ACOUSTIC-HVAC-NOISE"
  - "REQ-THERMAL-COMFORT-001"

# COMPONENTS (standard configuration)
components:
  - category: "air_handling"
    description: "Heat recovery ventilation unit (MVHR)"
    specification: "MVHR with 90% heat recovery efficiency, EC fans, F7 filters"
    quantity: 1

  - category: "heating"
    description: "Air-to-water heat pump"
    specification: "12 kW heating capacity, COP 4.2 at A7/W35, R-32 refrigerant"
    quantity: 1

  - category: "heating"
    description: "Underfloor heating manifold with zone valves"
    specification: "8-zone manifold with thermostatic controls, mixing valve"
    quantity: 1

  - category: "heating"
    description: "Circulation pump (heating)"
    specification: "Class A high-efficiency pump, variable speed"
    quantity: 1

  - category: "ventilation"
    description: "Supply air diffusers"
    specification: "Ceiling-mounted adjustable diffusers, low-noise"
    quantity: 8

  - category: "ventilation"
    description: "Extract air grilles"
    specification: "Bathroom/kitchen extract grilles with acoustic dampers"
    quantity: 4

  - category: "controls"
    description: "Room thermostats"
    specification: "Wireless programmable thermostats, LCD display"
    quantity: 8

  - category: "controls"
    description: "MVHR control panel"
    specification: "Wall-mounted with boost/holiday/night modes"
    quantity: 1

  - category: "controls"
    description: "Weather compensation controller"
    specification: "Outdoor sensor + controller for heat pump optimization"
    quantity: 1

# TYPICAL PERFORMANCE
typicalPerformance:
  heatingCapacity: "12 kW"
  ventilationRate: "0.5 ACH"
  heatRecovery: "90%"
  energyEfficiency: "A+++"
  copHeating: 4.2
  noiseLevel: "25 dB(A)"
  designTemperatureHeating: "21-24°C"
  relativeHumidity: "40-60%"
  flowTemperatureUFH: "35°C"
  returnTemperatureUFH: "30°C"

version: "1.0.0"
tags:
  - "residential"
  - "mvhr"
  - "heat-pump"
  - "underfloor-heating"
  - "energy-efficient"
---

# System Type: Residential HVAC - MVHR + Heat Pump

## Overview

Integrated HVAC system for residential buildings combining:
- **Mechanical Ventilation with Heat Recovery (MVHR)** - Continuous fresh air with 90% heat recovery
- **Air-to-Water Heat Pump** - Efficient low-temperature heating
- **Underfloor Heating** - Radiant heating distribution
- **Individual Room Controls** - Programmable thermostats per zone

**Target Application:** Energy-efficient residential apartments and houses with high insulation standards.

## System Description

### Primary Functions

1. **Ventilation:**
   - Continuous balanced ventilation (supply + extract)
   - 90% heat recovery efficiency
   - F7 filtration (PM2.5 protection)
   - 0.5 ACH minimum (residential standard)

2. **Heating:**
   - Air-to-water heat pump (12 kW capacity)
   - Low-temperature distribution (35°C flow)
   - Underfloor heating in all habitable spaces
   - Individual room temperature control

3. **Summer Comfort:**
   - MVHR bypass mode (free cooling)
   - Night cooling ventilation
   - No active mechanical cooling

## Components Detail

### 1. MVHR Unit

**Specification:**
- Type: Plate heat exchanger (counterflow)
- Heat recovery efficiency: 90% (per EN 13141-7)
- Airflow range: 100-350 m³/h (modulating)
- Fans: EC technology (high efficiency, low noise)
- Filters: F7 supply, G4 extract
- Summer bypass: Automatic damper
- Defrost: Electric preheater (winter operation)

**Typical Product:** Systemair SAVE VTR 300 or equivalent

**Performance:**
- Power consumption: 40-80W (depends on airflow)
- Noise level: <25 dB(A) at 1m
- External pressure: 150-200 Pa available
- Heat recovery: 315W at 0°C outdoor, 21°C extract, 350 m³/h

### 2. Air-to-Water Heat Pump

**Specification:**
- Type: Air-to-water, inverter-driven
- Heating capacity: 12 kW at A7/W35
- COP: 4.2 at A7/W35 (coefficient of performance)
- Refrigerant: R-32 (low GWP)
- Modulation range: 20-100%
- Flow temperature: 25-55°C (max)
- Ambient range: -20°C to +35°C

**Typical Product:** Bosch Compress 7000i AW or Daikin Altherma 3

**Performance at Design Conditions:**
- A7/W35: 12 kW heating, COP 4.2
- A-7/W35: 9.5 kW heating, COP 3.0
- A-15/W35: 7.2 kW heating, COP 2.3 (bivalent backup may be required)

### 3. Underfloor Heating Manifold

**Specification:**
- Zones: 8 circuits
- Manifold: Stainless steel with flowmeters
- Zone valves: 230V thermal actuators (NC)
- Mixing valve: 3-way motorized (weather compensated)
- Circulation pump: Class A, variable speed (Wilo Yonos PARA or equivalent)
- Flow temperature sensor
- Return temperature sensor

**Control:**
- Weather compensation: Outdoor sensor adjusts flow temperature
- Room thermostats: Control zone valves per room
- Pump speed: Modulates based on number of open zones

### 4. Ductwork and Terminals

**Supply Air Distribution:**
- Ductwork: Rigid circular ducts (Ø125-160mm), acoustic insulation
- Diffusers: 8 units, ceiling-mounted adjustable (bedrooms, living spaces)
- Airflow balancing: Dampers at each diffuser

**Extract Air:**
- Ductwork: Rigid circular ducts (Ø100-125mm)
- Grilles: Kitchen (Ø125mm, 70 m³/h), 2 bathrooms (Ø100mm, 50 m³/h each)
- Backdraft dampers: Prevent reverse flow when MVHR off

### 5. Controls and Sensors

**Room Controls:**
- 8 × Wireless programmable thermostats
- LCD display, 7-day programming
- Manual boost function
- Battery-powered (2 × AA)

**MVHR Control Panel:**
- Wall-mounted (typically in corridor or kitchen)
- Modes: Auto, Boost (high airflow), Holiday (low airflow), Night (reduced)
- Filter change indicator (pressure differential switch)
- Fault alarms

**Weather Compensation:**
- Outdoor temperature sensor
- Adjusts heat pump flow temperature based on outdoor conditions
- Heating curve: 35°C at 7°C outdoor, 40°C at -15°C outdoor

## Performance Characteristics

### Heating Performance

**Design Heat Load:**
- Apartment size: 80-120 m²
- Heat loss: 50-60 W/m² (well-insulated building)
- Total heat load: 4,000-7,200 W
- Heat pump capacity: 12,000 W (adequate with margin)

**Seasonal Performance:**
- SCOP (Seasonal COP): 4.5 (medium temperature application)
- Annual heating energy: ~3,500 kWh (for 100 m² apartment)
- Electricity consumption: ~780 kWh/year (heating only)
- Energy class: A+++

### Ventilation Performance

**Airflow Rates:**
- Design occupancy: 4 people
- Bedroom 1: 60 m³/h (2 people × 30 m³/h)
- Bedroom 2: 60 m³/h (2 people × 30 m³/h)
- Living room: 60 m³/h (2 people × 30 m³/h)
- Kitchen extract: 70 m³/h
- Bathroom 1 extract: 50 m³/h
- Bathroom 2 extract: 50 m³/h
- **Total:** ~350 m³/h at boost mode

**Heat Recovery:**
- Winter (-10°C outdoor): Recovers ~2,800W
- Annual heat saved: ~4,200 kWh
- Electricity consumption (fans): ~350 kWh/year
- Net energy savings: ~3,850 kWh/year

### Acoustic Performance

**Noise Levels:**
- MVHR unit: <30 dB(A) at 1m
- In bedrooms: <25 dB(A) (with acoustic ductwork)
- Heat pump outdoor unit: 35 dB(A) at 1m
- Underfloor heating: Silent (no moving parts in rooms)

## Requirements Summary

### REQ-HVAC-VENTILATION-RATE
- Minimum 0.5 ACH continuous
- Occupancy-based: 30 m³/h per person
- Kitchen extract: 70 m³/h
- Bathroom extract: 50 m³/h

### REQ-HVAC-HEAT-RECOVERY
- Minimum 85% heat recovery efficiency
- This system: 90% (exceeds requirement)

### REQ-ENERGY-EFFICIENCY-HVAC
- Heat pump COP ≥4.0 at A7/W35
- This system: COP 4.2 (exceeds requirement)
- Circulation pumps: Class A
- MVHR fans: EC technology

### REQ-ACOUSTIC-HVAC-NOISE
- Bedrooms: ≤30 dB(A)
- Living areas: ≤35 dB(A)
- This system: ≤25 dB(A) in bedrooms (exceeds requirement)

### REQ-THERMAL-COMFORT-001
- Heating season: 20-22°C
- Temperature uniformity: ≤3°C vertical gradient
- This system: Underfloor heating provides excellent uniformity

## Installation Guidelines

### MVHR Unit Location
- Plant room, utility room, or loft space
- Level installation (critical for condensate drainage)
- Access for filter maintenance
- Condensate drainage to waste or external

### Heat Pump Location
- Outdoor unit: External wall or ground pad
- Clearances: 500mm front, 300mm sides, 600mm rear
- Protection from prevailing wind
- Avoid direct view from bedrooms (noise)
- Refrigerant pipework: <15m to avoid efficiency loss

### Underfloor Heating
- Manifold: Plant room, cupboard, or ceiling void
- Accessible for maintenance
- Pipe spacing: 100-150mm (bedrooms), 150-200mm (living areas)
- Screed depth: 45-60mm above pipes
- Edge insulation: Perimeter strips 10mm thick

### Ductwork Routing
- Concealed in ceiling voids or service risers
- Acoustic lining in bedroom supply ducts
- Airtight connections (minimize leakage)
- Thermal insulation in unconditioned spaces

## Commissioning Requirements

**MVHR:**
- Airflow measurements at each terminal (±10% of design)
- Pressure tests (ductwork airtightness)
- Heat recovery efficiency test
- Noise measurements in habitable spaces
- Filter installation check

**Heat Pump:**
- Refrigerant charge verification
- Flow and return temperature verification
- COP measurement at design conditions
- Defrost cycle test
- Safety cutout tests (high/low pressure, freeze protection)

**Underfloor Heating:**
- Pressure test before screed (6 bar, 24 hours)
- Flow balancing at manifold
- Temperature verification (floor surface, flow/return)
- Control sequence verification

**Controls:**
- Thermostat calibration
- Weather compensation curve adjustment
- Zone valve operation check
- Interlock testing (pump, valves, sensors)

## Maintenance Schedule

**Monthly:**
- Visual inspection of MVHR, heat pump
- Check for unusual noise or leaks

**Every 6 Months:**
- MVHR filter replacement (F7 supply, G4 extract)
- Heat pump outdoor unit cleaning (coil, fan)

**Annual:**
- Full MVHR service: Fan cleaning, heat exchanger inspection, condensate drainage
- Heat pump service: Refrigerant pressure check, electrical connections, safety tests
- Underfloor heating: System pressure, pump efficiency, flow balancing
- Controls: Battery replacement (thermostats), software updates

**Every 3 Years:**
- Ductwork inspection and cleaning (if required)
- Heat exchanger deep clean (MVHR)

**Every 5 Years:**
- Refrigerant leak test (F-gas regulation)
- Comprehensive system performance test
- Energy efficiency verification

## Typical Costs (2026, EUR)

**Equipment:**
- MVHR unit: €2,500
- Heat pump (12 kW): €8,500
- Underfloor heating (8 zones): €2,000
- Ductwork and terminals: €1,500
- Controls: €1,000
- **Subtotal Equipment:** €15,500

**Installation:**
- MVHR installation: €2,000
- Heat pump installation: €1,200
- Underfloor heating installation: €3,500
- Ductwork installation: €2,500
- Commissioning: €800
- **Subtotal Installation:** €10,000

**Total System Cost:** ~€25,500 (for 100 m² apartment)

**Annual Operating Costs:**
- Heating electricity: €170 (780 kWh × €0.22/kWh)
- Ventilation electricity: €75 (350 kWh × €0.22/kWh)
- Maintenance (annual service): €250
- **Total Annual:** ~€495

## Usage Guidelines

### When to Use This System Type
- ✅ New residential buildings (apartments, houses)
- ✅ High insulation standards (U-values ≤0.20 W/(m²·K))
- ✅ Continuous ventilation requirement (airtight construction)
- ✅ Low-temperature heating suitable (underfloor, low-temp radiators)
- ✅ Energy efficiency priority

### When NOT to Use
- ❌ Existing buildings with high-temp radiators (use different system type)
- ❌ Buildings requiring active cooling (add chiller or use VRF system type)
- ❌ Very large buildings (>500 m²) - consider multiple systems
- ❌ Buildings with poor insulation (heat pump may not be efficient)

## System Variants

**Variant A: Standard (This Type)**
- 12 kW heat pump, 8-zone UFH, 90% MVHR

**Variant B: Larger Capacity**
- 16 kW heat pump, 12-zone UFH, 90% MVHR
- For larger apartments (120-150 m²)

**Variant C: With Domestic Hot Water**
- Adds 200L hot water cylinder
- Heat pump provides DHW + heating
- Priority control (DHW first)

---

**Document Status:** System Type Template
**Version:** 1.0.0
**Target Application:** Residential buildings 80-120 m²
**Energy Class:** A+++
**Last Review:** 2026-02-22
