# Asset Type

An **Asset Type** is a product specification template that defines common specifications for equipment and assets. Asset instances reference a type to inherit manufacturer details, specifications, performance data, and maintenance profiles.

::: tip When to Use
Use Asset Types when you have **multiple identical equipment items** (e.g., 50 identical heat pumps, 100 identical smoke detectors). Define product specifications once in the type, then create lightweight instances that add serial numbers, locations, and installation data.

**Benefits:**
- ✅ Define product specs, maintenance schedules, costs once
- ✅ Guaranteed consistency for identical equipment
- ✅ Update product info → affects all instances
- ✅ Simplified procurement and bulk ordering
- ✅ Centralized spare parts and maintenance procedures
:::

## Purpose

Asset Types define **product specifications** that apply to all asset instances:
- Manufacturer and model information
- Technical specifications and performance data
- Maintenance profiles and service intervals
- Expected lifetime and warranty terms
- Typical costs (purchase, installation)
- Requirements for installation and operation

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique type identifier | `"AT-BOSCH-HP-300"` |
| `entityType` | string | Must be `"asset_type"` | `"asset_type"` |
| `documentType` | string | Must be `"asset_type"` | `"asset_type"` |
| `typeName` | string | Product name | `"Bosch HP-300 Heat Pump"` |
| `category` | string | Asset category | `"hvac"` |
| `version` | string | Semantic version | `"1.0.0"` |

### Asset Category

Common `category` values (not exhaustive):

| Category | Purpose | Examples |
|----------|---------|----------|
| `hvac` | HVAC equipment | Heat pumps, AHUs, boilers, chillers, VAV boxes |
| `electrical` | Electrical equipment | Switchgear, transformers, UPS, panels |
| `plumbing` | Plumbing equipment | Pumps, water heaters, pressure vessels, valves |
| `fire_safety` | Fire protection | Detectors, extinguishers, sprinklers, alarms |
| `security` | Security equipment | Cameras, access control, intrusion detectors |
| `lighting` | Lighting fixtures | LED fixtures, emergency lights, controls |
| `bms` | Building controls | Controllers, sensors, actuators, gateways |
| `renewable_energy` | Renewable energy | Solar panels, inverters, batteries, wind turbines |
| `elevator` | Vertical transport | Elevators, escalators, lifts |
| `it` | IT infrastructure | Servers, switches, routers, access points |

## Template Fields

These fields define the **product specifications** inherited by all asset instances:

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Product description and purpose |
| `manufacturer` | string | Manufacturer name |
| `model` | string | Model number/designation |
| `productCode` | string | Manufacturer product code/SKU |
| `specifications` | object | Technical specifications (varies by category) |
| `performanceData` | object | Performance characteristics |
| `maintenanceProfile` | object | Service intervals, lifetime, warranty, procedures |
| `requirements` | array | Installation/operation requirement IDs |
| `cost` | object | Purchase price, installation cost, currency |
| `tags` | array | Classification tags |

## Specifications Object Structure

The `specifications` object varies by asset category:

### HVAC Asset Specifications

```yaml
specifications:
  heatingCapacity: "12 kW"
  coolingCapacity: "10 kW"
  refrigerant: "R-32"
  refrigerantCharge: "1.8 kg"
  flowTemperature: "35°C"
  returnTemperature: "30°C"
  powerInput: "2.8 kW"
  soundPressureLevel: "35 dB(A)"
  dimensions: "800×600×1200 mm (H×W×D)"
  weight: "85 kg"
  ipRating: "IP24"
```

### Electrical Asset Specifications

```yaml
specifications:
  voltage: "230/400V"
  current: "125 A"
  phases: 3
  frequency: "50 Hz"
  shortCircuitRating: "25 kA"
  protectionClass: "IP65"
  earthingSystem: "TN-S"
  dimensions: "600×400×200 mm"
  weight: "42 kg"
```

### Lighting Asset Specifications

```yaml
specifications:
  lumenOutput: "3000 lm"
  colorTemperature: "4000 K"
  cri: ">80"
  powerConsumption: "25 W"
  beamAngle: "120°"
  ipRating: "IP20"
  dimmable: true
  mountingType: "surface"
  dimensions: "600×600×50 mm"
```

### Fire Safety Asset Specifications

```yaml
specifications:
  detectorType: "optical_smoke"
  detectionArea: "60 m²"
  operatingVoltage: "230V AC"
  batteryBackup: "9V alkaline"
  batteryLifetime: "12 months"
  alarmSound: "> 85 dB(A) at 3m"
  temperature: "-10°C to +50°C"
  ipRating: "IP40"
  certification: "EN 14604"
```

## Performance Data Object Structure

The `performanceData` object contains performance characteristics:

### HVAC Performance Data

```yaml
performanceData:
  copHeating: 4.2                    # At A7/W35 test condition
  copCooling: 3.8                    # At A35/W7 test condition
  energyClass: "A+++"                # EU energy label
  seasonalCOP: 4.5                   # Seasonal coefficient of performance
  maxWorkingPressure: "30 bar"       # Maximum operating pressure
  noiseLevel: "35 dB(A)"             # At 1m distance
  efficiencyRating: "93%"            # Combustion/conversion efficiency
```

### Electrical Performance Data

```yaml
performanceData:
  efficiency: "98.5%"                # Transformer efficiency
  powerFactor: 0.95                  # Power factor
  harmonics: "THD < 5%"              # Total harmonic distortion
  insulation: "Class F"              # Insulation class
  temperatureRise: "< 80K"           # Temperature rise
```

### Lighting Performance Data

```yaml
performanceData:
  efficacy: "120 lm/W"               # Luminous efficacy
  lifetime: "50,000 hours"           # L70 lifetime
  powerFactor: "> 0.95"              # Power factor
  startTime: "< 0.5 seconds"         # Instant start
  colorConsistency: "MacAdam 3"      # Color consistency
```

## Maintenance Profile Structure

The `maintenanceProfile` defines standard service requirements:

```yaml
maintenanceProfile:
  serviceIntervalMonths: 12          # Service every 12 months
  expectedLifetimeYears: 15          # Expected operational lifetime
  warrantyYears: 5                   # Manufacturer warranty period

  sparePartsRequired:                # Common spare parts
    - "Filter set (annual replacement)"
    - "Expansion vessel membrane"
    - "Pressure sensor"

  maintenanceProcedures:             # Standard procedures
    - "Annual filter replacement"
    - "Quarterly visual inspection"
    - "Check refrigerant pressure"
    - "Clean heat exchanger coils"
    - "Verify electrical connections"
    - "Test safety cutouts"
```

## Cost Structure

The `cost` object captures typical pricing:

```yaml
cost:
  purchasePrice: 8500              # Equipment purchase price
  installationCost: 1200           # Typical installation labor
  currency: "EUR"                  # Currency code (ISO 4217)
```

## Example: Asset Type Definition

**File:** `templates/asset-types/bosch-heat-pump-hp300.md`

```markdown
---
documentType: "asset_type"
entityType: "asset_type"
id: "AT-BOSCH-HP-300"
typeName: "Bosch HP-300 Heat Pump"
category: "hvac"
description: "Air-to-water heat pump for residential heating, 12 kW heating capacity, R-32 refrigerant"

# MANUFACTURER INFORMATION
manufacturer: "Bosch Thermotechnology"
model: "HP-300"
productCode: "8738207145"

# TECHNICAL SPECIFICATIONS
specifications:
  heatingCapacity: "12 kW"
  coolingCapacity: "10 kW"
  refrigerant: "R-32"
  refrigerantCharge: "1.8 kg"
  flowTemperature: "35°C"
  returnTemperature: "30°C"
  powerInput: "2.8 kW"
  soundPressureLevel: "35 dB(A)"
  dimensions: "800×600×1200 mm (H×W×D)"
  weight: "85 kg"
  ipRating: "IP24"
  ambientTemperatureRange: "-20°C to +35°C"

# PERFORMANCE DATA
performanceData:
  copHeating: 4.2                    # At A7/W35 test condition
  copCooling: 3.8                    # At A35/W7 test condition
  energyClass: "A+++"                # EU energy label
  seasonalCOP: 4.5                   # SCOP for medium temperature application
  maxWorkingPressure: "30 bar"
  noiseLevel: "35 dB(A)"
  modulationRange: "20-100%"

# MAINTENANCE PROFILE
maintenanceProfile:
  serviceIntervalMonths: 12
  expectedLifetimeYears: 15
  warrantyYears: 5

  sparePartsRequired:
    - "Filter set (annual replacement)"
    - "Expansion vessel membrane"
    - "Pressure sensor"
    - "Flow switch"
    - "Compressor contactor"

  maintenanceProcedures:
    - "Annual service: filter replacement, pressure check"
    - "Quarterly visual inspection"
    - "Check refrigerant pressure and leakage"
    - "Clean heat exchanger coils (annual)"
    - "Verify electrical connections"
    - "Test safety cutouts and controls"
    - "Check condensate drainage"
    - "Inspect outdoor unit for debris"

# REQUIREMENTS
requirements:
  - "REQ-HVAC-HEAT-PUMP-INSTALLATION"  # Installation requirements
  - "REQ-REFRIGERANT-HANDLING"          # F-gas certified installer
  - "REQ-ELECTRICAL-SAFETY"             # Electrical safety compliance

# COST DATA
cost:
  purchasePrice: 8500
  installationCost: 1200
  currency: "EUR"

version: "1.0.0"
tags:
  - "heat-pump"
  - "heating"
  - "cooling"
  - "r32"
  - "residential"
---

# Asset Type: Bosch HP-300 Heat Pump

## Product Description

Air-to-water heat pump designed for residential heating and domestic hot water applications. Features R-32 refrigerant, inverter-driven compressor with modulation 20-100%, and A+++ energy rating.

## Technical Overview

### Heating Performance
- **Heating Capacity:** 12 kW at A7/W35 (outdoor 7°C, water flow 35°C)
- **COP (Heating):** 4.2 at A7/W35 test condition
- **Seasonal COP:** 4.5 (medium temperature application)
- **Modulation:** 20-100% capacity modulation
- **Flow Temperature:** Up to 65°C (reduced capacity)

### Cooling Performance (Optional)
- **Cooling Capacity:** 10 kW at A35/W7
- **COP (Cooling):** 3.8 at A35/W7 test condition
- **Suitable for:** Radiant cooling applications

### Physical Characteristics
- **Dimensions:** 800mm (H) × 600mm (W) × 1200mm (D)
- **Weight:** 85 kg (dry weight)
- **Noise Level:** 35 dB(A) at 1m distance (low noise mode)
- **IP Rating:** IP24 (outdoor installation)

### Refrigeration System
- **Refrigerant:** R-32 (low GWP, high efficiency)
- **Charge:** 1.8 kg
- **Compressor:** Inverter-driven scroll compressor
- **Working Pressure:** Maximum 30 bar
- **Ambient Range:** -20°C to +35°C outdoor temperature

## Installation Requirements

### Electrical Connection
- Supply: 230V single-phase, 50 Hz
- Maximum current: 15 A
- Circuit protection: Type C 16A MCB + 30mA RCD
- Power consumption: 2.8 kW at nominal capacity

### Hydraulic Connection
- Flow/return: 1" BSP female connections
- System pressure: 1-3 bar operating
- Flow rate: 2,000 L/h at design condition
- Expansion vessel: External 18L minimum

### Placement Requirements
- Outdoor installation (IP24 rated)
- Minimum clearances: 500mm front, 300mm sides, 600mm rear
- Level concrete pad or wall bracket mounting
- Drainage connection for condensate
- Protection from direct wind and weather

## Maintenance Schedule

### Annual Service (12 months)
- Replace air filters
- Check refrigerant pressure and inspect for leaks
- Clean heat exchanger coils (if required)
- Verify electrical connections and tighten terminals
- Test safety cutouts (high/low pressure, freeze protection)
- Check expansion vessel pressure
- Inspect condensate drainage
- Update control software if available

### Quarterly Inspection (3 months)
- Visual inspection of outdoor unit
- Check for unusual noise or vibration
- Verify proper operation and temperature readings
- Clear debris from air intake

### Five-Year Service
- Comprehensive inspection by certified technician
- Refrigerant system leak test
- Compressor oil analysis (if applicable)
- Electrical insulation testing

## Spare Parts Inventory

**Critical spares (recommended on-site for quick replacement):**
- Air filter set (annual replacement)
- Pressure sensor
- Flow switch

**Recommended spares (central stock for multiple units):**
- Expansion vessel membrane
- Compressor contactor
- PCB controller (backup)
- Refrigerant charge (F-gas certified handling)

## Requirements Summary

### REQ-HVAC-HEAT-PUMP-INSTALLATION
- **Criterion:** Installed by qualified HVAC engineer
- **Compliance:** MCS certified installer (UK) or equivalent
- **Verification:** Installation certificate, commissioning report

### REQ-REFRIGERANT-HANDLING
- **Criterion:** F-gas certified technician for refrigerant work
- **Compliance:** EU F-Gas Regulation 517/2014 or equivalent
- **Verification:** Technician certification, leak testing records

### REQ-ELECTRICAL-SAFETY
- **Criterion:** Electrical installation per local codes
- **Compliance:** BS 7671 (UK) or IEC 60364 (international)
- **Verification:** Electrical safety certificate

## Procurement Information

### Typical Costs (EUR, 2026)
- **Equipment:** €8,500
- **Installation:** €1,200 (typical residential installation)
- **Commissioning:** €300
- **Annual service:** €200
- **Total initial cost:** €10,000

### Lead Times
- **Standard delivery:** 2-4 weeks
- **Bulk order (10+ units):** 6-8 weeks

### Warranty
- **Equipment warranty:** 5 years parts and labor
- **Compressor warranty:** 7 years
- **Extended warranty:** Available up to 10 years

## Usage Guidelines

### When to Use This Type
- ✅ Residential heating applications (houses, apartments)
- ✅ Underfloor heating systems (low flow temperature 35°C)
- ✅ Buildings with heat demand 8-15 kW
- ✅ Locations with outdoor temps down to -20°C

### When NOT to Use
- ❌ High-temperature systems (radiators >55°C) - use high-temp model
- ❌ Heat demand >15 kW - use larger model or cascade
- ❌ Extreme cold climates (<-20°C) - use ground source or bivalent system
- ❌ Commercial buildings - use commercial-grade equipment
```

## ID Naming Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| `AT-{MANUFACTURER}-{MODEL}` | `AT-BOSCH-HP-300` | Manufacturer + model |
| `AT-{MANUFACTURER}-{PRODUCT}` | `AT-SYSTEMAIR-MVHR-350` | Manufacturer + product line |
| `AT-{CATEGORY}-{DESCRIPTOR}` | `AT-DETECTOR-SMOKE-OPTICAL` | Category + type |

**Guidelines:**
- Use uppercase for consistency
- Include manufacturer and model for uniqueness
- Avoid special characters (use hyphens instead)
- Keep IDs concise but descriptive

## Asset Type Catalog Examples

| Type ID | Type Name | Category | Manufacturer | Typical Use |
|---------|-----------|----------|--------------|-------------|
| `AT-BOSCH-HP-300` | Bosch HP-300 Heat Pump | hvac | Bosch | Residential heating |
| `AT-SYSTEMAIR-SR11` | Systemair SR-11 MVHR | hvac | Systemair | Residential ventilation |
| `AT-DETECTOR-SMOKE-AICO` | Aico Ei650 Smoke Detector | fire_safety | Aico | Residential fire detection |
| `AT-PANEL-HAGER-VML` | Hager VML Distribution Panel | electrical | Hager | Residential electrical |
| `AT-PUMP-GRUNDFOS-UPS2` | Grundfos UPS2 Circulation Pump | plumbing | Grundfos | Heating circulation |

## Compiled Output

When compiled, Asset Types are stored separately from asset instances:

```json
{
  "entities": {
    "asset_types": [
      {
        "id": "AT-BOSCH-HP-300",
        "entityType": "asset_type",
        "typeName": "Bosch HP-300 Heat Pump",
        "category": "hvac",
        "manufacturer": "Bosch Thermotechnology",
        "model": "HP-300",
        "specifications": {
          "heatingCapacity": "12 kW",
          "copHeating": 4.2
        },
        "maintenanceProfile": {
          "serviceIntervalMonths": 12,
          "expectedLifetimeYears": 15,
          "warrantyYears": 5
        },
        "cost": {
          "purchasePrice": 8500,
          "currency": "EUR"
        },
        "version": "1.0.0"
      }
    ],
    "asset_instances": [
      {
        "id": "AI-HP-01",
        "assetTypeId": "AT-BOSCH-HP-300",
        "identifiers": {
          "serial": "HP300-2024-001234",
          "tag": "HP-01"
        },
        "installationData": {
          "installationDate": "2024-06-15"
        }
        // Compiler merges type specifications here
      }
    ]
  }
}
```

## Compiler Behavior

The compiler **resolves type references** and merges specifications:

1. **Load type definition** from `assetTypeId`
2. **Merge type specifications** into asset instance:
   - Manufacturer, model, product code inherited
   - Specifications inherited
   - Performance data inherited
   - Maintenance profile inherited
   - Requirements inherited
   - Cost data available for reporting
3. **Add instance-specific data:**
   - Serial number, asset tag
   - Installation date, location, installer
   - Warranty start date
   - Service history
4. **Output complete asset** with full product details

### Merge Example

**Asset Type:** `AT-BOSCH-HP-300` has full specifications

**Asset Instance:** `AI-HP-01` adds serial number and location

**Compiled Output:**
```json
{
  "id": "AI-HP-01",
  "assetTag": "HP-01",
  "serial": "HP300-2024-001234",
  "manufacturer": "Bosch Thermotechnology",  // From type
  "model": "HP-300",                         // From type
  "specifications": {                        // From type
    "heatingCapacity": "12 kW",
    "copHeating": 4.2
  },
  "maintenanceProfile": {                    // From type
    "serviceIntervalMonths": 12,
    "nextServiceDue": "2025-06-15"          // Calculated from install date
  },
  "installationDate": "2024-06-15",          // Instance-specific
  "buildingId": "BLD-01",                    // Instance-specific
  "locatedInSpaceId": "SP-PLANT-ROOM"        // Instance-specific
}
```

## Validation Rules

| Rule | Check | Severity |
|------|-------|----------|
| Type exists | `assetTypeId` must reference valid asset_type | Error |
| Category match | Instance category should match type category | Warning |
| Version compatibility | Instance and type versions should align | Info |
| Serial unique | Serial number unique across all assets | Error |
| Installation complete | Installation date, location, installer specified | Warning |

## Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Specification clarification | Patch (1.0.0 → 1.0.1) | Add missing dimension |
| Performance data updated | Minor (1.0.1 → 1.1.0) | Updated COP rating |
| Maintenance schedule changed | Minor (1.1.0 → 1.2.0) | New service interval |
| New product revision | Major (1.2.0 → 2.0.0) | HP-300 → HP-400 |

**Instance compatibility:**
- Asset instances reference type by ID (not version)
- Compiler uses latest version of referenced type
- Product revisions require new type ID (e.g., `AT-BOSCH-HP-400`)

## Migration Path

### Existing Projects
1. **Identify identical equipment** - Find assets with same make/model
2. **Create asset type definition** - Extract common product specs
3. **Migrate asset instances** - Add `assetTypeId`, remove repeated data
4. **Validate** - Run compiler to verify merge correctness

### Example Migration

**Before:**
```markdown
# ai-hp-01.md (280 lines with full specs)
# ai-hp-02.md (280 lines with identical specs)
# ai-hp-03.md (280 lines with identical specs)
```

**After:**
```markdown
# bosch-hp-300-type.md (350 lines - ONCE)
# ai-hp-01.md (90 lines - serial, location, install date only)
# ai-hp-02.md (90 lines - serial, location, install date only)
# ai-hp-03.md (90 lines - serial, location, install date only)

Total: 350 + (3 × 90) = 620 lines
Before: 3 × 280 = 840 lines
Savings: -220 lines (-26%)

For 50 identical heat pumps: -86% reduction
For 100 identical heat pumps: -93% reduction
```

## Common Asset Type Patterns

### Bulk Equipment Procurement

Create asset types for bulk orders:

```yaml
# 50 identical smoke detectors
AT-DETECTOR-SMOKE-AICO → AI-DET-001, AI-DET-002, ..., AI-DET-050
```

### Product Families

Create types for product variants:

```yaml
# Heat pump family
AT-BOSCH-HP-200 → 8 kW models
AT-BOSCH-HP-300 → 12 kW models
AT-BOSCH-HP-400 → 16 kW models
```

## See Also

- **[Asset Instance](/en/documentation/entities/asset-instance)** - Asset instances that reference types
- **[System](/en/documentation/entities/system)** - Systems containing assets
- **[System Type](/en/documentation/entities/system-type)** - System templates
- **[Space Type](/en/documentation/entities/space-type)** - Space templates (similar pattern)
- **[Requirement](/en/documentation/entities/requirement)** - Requirements for assets
- **Schema:** `sbm-schema-v0.2.json` - Asset Type definition
