# System Type

A **System Type** is a reusable template that defines common specifications for similar MEP systems. System instances reference a type to inherit requirements, components, and performance characteristics.

::: tip When to Use
Use System Types when you have **multiple similar systems** (e.g., identical HVAC systems across buildings, standard electrical distribution systems on each floor). Define specifications once in the type, then create lightweight instances that reference it.

**Benefits:**
- ✅ Define components, performance criteria, requirements once
- ✅ Guaranteed consistency across all system instances
- ✅ Update one file → affects all system instances
- ✅ Simplified system specifications across projects
:::

## Purpose

System Types define **template specifications** that apply to all system instances:
- Requirements (performance, efficiency, safety, compliance)
- Components (standard equipment and quantities)
- Typical performance characteristics
- Maintenance and operational parameters

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique type identifier | `"SYT-HVAC-RESIDENTIAL"` |
| `entityType` | string | Must be `"system_type"` | `"system_type"` |
| `documentType` | string | Must be `"system_type"` | `"system_type"` |
| `typeName` | string | Human-readable type name | `"Standard HVAC System - Residential"` |
| `systemCategory` | string | System category (see enum below) | `"hvac"` |
| `version` | string | Semantic version | `"1.0.0"` |

### System Category Enumeration

The `systemCategory` field must be one of these values:

| Value | Purpose | Typical Components |
|-------|---------|-------------------|
| `hvac` | Heating, ventilation, air conditioning | AHUs, boilers, heat pumps, ductwork, controls |
| `electrical` | Electrical power distribution | Switchboards, panels, cables, outlets, lighting |
| `plumbing` | Water supply and drainage | Pumps, pipes, fixtures, water heaters, drainage |
| `fire_safety` | Fire detection and suppression | Detectors, alarms, sprinklers, extinguishers |
| `security` | Security and access control | Cameras, access control, intrusion detection |
| `communication` | Data and communication networks | Structured cabling, Wi-Fi, telecom, AV |
| `bms` | Building management systems | Controllers, sensors, actuators, software |
| `renewable_energy` | Renewable energy systems | Solar PV, wind, geothermal, energy storage |

## Template Fields

These fields define the **template specifications** inherited by all system instances:

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | System type description and purpose |
| `requirements` | array | Requirement IDs that apply to ALL system instances |
| `components` | array | Standard component list (category, description, specification, quantity) |
| `typicalPerformance` | object | Performance characteristics (varies by systemCategory) |
| `tags` | array | Classification tags |

## Components Array Structure

Each component in the `components` array has this structure:

```yaml
components:
  - category: "air_handling"           # Component category
    description: "Heat recovery unit"   # Human-readable description
    specification: "MVHR 90% efficiency" # Technical specification
    quantity: 1                         # Typical quantity (optional)
```

### Component Categories by System Type

**HVAC Systems:**
- `air_handling` - AHUs, MVHR units, heat recovery
- `heating` - Boilers, heat pumps, radiators, underfloor heating
- `cooling` - Chillers, cooling towers, fan coils
- `ventilation` - Fans, ductwork, diffusers, grilles
- `controls` - Thermostats, sensors, BMS integration

**Electrical Systems:**
- `distribution` - Switchboards, distribution panels, transformers
- `protection` - Circuit breakers, RCDs, surge protection
- `wiring` - Cables, conduits, cable trays
- `lighting` - Fixtures, controls, emergency lighting
- `power` - Outlets, dedicated circuits, UPS

**Plumbing Systems:**
- `water_supply` - Pumps, pipes, valves, pressure vessels
- `drainage` - Waste pipes, vents, traps, manholes
- `fixtures` - Sinks, toilets, showers, taps
- `heating` - Water heaters, cylinders, circulation pumps
- `treatment` - Filters, softeners, UV treatment

**Fire Safety Systems:**
- `detection` - Smoke detectors, heat detectors, control panel
- `alarm` - Sounders, strobes, call points
- `suppression` - Sprinklers, extinguishers, hydrants
- `ventilation` - Smoke extraction, pressurization

**Security Systems:**
- `access_control` - Card readers, locks, controllers
- `surveillance` - CCTV cameras, DVR/NVR, monitors
- `intrusion` - Motion sensors, door contacts, control panel
- `intercom` - Entry stations, monitors, door release

## Typical Performance Object Structure

The `typicalPerformance` object varies by system category:

### HVAC Performance

```yaml
typicalPerformance:
  heatingCapacity: "12 kW"              # Heating capacity
  coolingCapacity: "10 kW"              # Cooling capacity (if applicable)
  ventilationRate: "0.5 ACH"            # Air changes per hour
  heatRecovery: "90%"                   # Heat recovery efficiency
  energyEfficiency: "A+++"              # Energy class
  copHeating: 4.2                       # Coefficient of performance (heating)
  copCooling: 3.8                       # Coefficient of performance (cooling)
  noiseLevel: "35 dB(A)"                # Maximum noise level
```

### Electrical Performance

```yaml
typicalPerformance:
  totalLoad: "50 kW"                    # Total electrical load
  voltage: "230/400V"                   # Voltage configuration
  phases: 3                             # Number of phases
  frequency: "50 Hz"                    # Frequency
  powerFactor: 0.95                     # Power factor
  shortCircuitCapacity: "25 kA"         # Short circuit rating
  mainBreakerRating: "125 A"            # Main breaker size
```

### Plumbing Performance

```yaml
typicalPerformance:
  flowRate: "12 L/min"                  # Design flow rate
  pressure: "3.0 bar"                   # Operating pressure
  hotWaterCapacity: "200 L"             # Hot water storage
  recoveryTime: "45 minutes"            # Hot water recovery
  efficiency: "92%"                     # Boiler/heater efficiency
```

### Fire Safety Performance

```yaml
typicalPerformance:
  detectionType: "optical_smoke"        # Detector type
  coverage: "60 m²/detector"            # Coverage area per detector
  responseTime: "< 30 seconds"          # Alarm response time
  sprinklerDensity: "5 mm/min"          # Sprinkler discharge density
  hydrantFlow: "1000 L/min"             # Hydrant flow rate
```

## Example: System Type Definition

**File:** `templates/system-types/hvac-residential-mvhr.md`

```markdown
---
documentType: "system_type"
entityType: "system_type"
id: "SYT-HVAC-RESIDENTIAL-MVHR"
typeName: "Residential HVAC - MVHR System"
systemCategory: "hvac"
description: "Standard residential HVAC system with mechanical ventilation and heat recovery, underfloor heating, and individual room controls"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-HVAC-VENTILATION-RATE"        # Minimum ventilation rate
  - "REQ-HVAC-HEAT-RECOVERY"           # Heat recovery efficiency
  - "REQ-ENERGY-EFFICIENCY-HVAC"       # Energy performance
  - "REQ-ACOUSTIC-HVAC-NOISE"          # Noise limits

# COMPONENTS (standard configuration)
components:
  - category: "air_handling"
    description: "Heat recovery ventilation unit"
    specification: "MVHR with 90% heat recovery efficiency"
    quantity: 1

  - category: "heating"
    description: "Air-to-water heat pump"
    specification: "12 kW heating capacity, COP 4.2"
    quantity: 1

  - category: "heating"
    description: "Underfloor heating manifold with zone valves"
    specification: "8-zone manifold with thermostatic controls"
    quantity: 1

  - category: "ventilation"
    description: "Supply air diffusers"
    specification: "Ceiling-mounted adjustable diffusers"
    quantity: 8

  - category: "ventilation"
    description: "Extract air grilles"
    specification: "Bathroom/kitchen extract grilles"
    quantity: 4

  - category: "controls"
    description: "Room thermostats"
    specification: "Wireless programmable thermostats"
    quantity: 8

  - category: "controls"
    description: "MVHR control panel"
    specification: "Wall-mounted with boost/holiday modes"
    quantity: 1

# TYPICAL PERFORMANCE
typicalPerformance:
  heatingCapacity: "12 kW"
  ventilationRate: "0.5 ACH"
  heatRecovery: "90%"
  energyEfficiency: "A+++"
  copHeating: 4.2
  noiseLevel: "25 dB(A)"
  designTemperature: "21-24°C"
  relativeHumidity: "40-60%"

version: "1.0.0"
tags:
  - "residential"
  - "mvhr"
  - "heat-pump"
  - "underfloor-heating"
---

# System Type: Residential HVAC - MVHR System

## Description

Standard residential HVAC system combining mechanical ventilation with heat recovery (MVHR), air-to-water heat pump heating, and underfloor heating distribution. Designed for residential apartments and houses with high energy efficiency requirements.

## Design Intent

This system type provides:
- Continuous fresh air supply with heat recovery (90% efficiency)
- Low-temperature heating via underfloor loops
- Individual room temperature control
- Quiet operation suitable for residential use
- High energy efficiency (A+++ rating)

## Components Summary

### Air Handling
- **MVHR Unit:** 90% heat recovery efficiency, balanced ventilation
- **Ductwork:** Insulated supply/extract ductwork to all rooms
- **Diffusers/Grilles:** 8 supply diffusers, 4 extract grilles

### Heating
- **Heat Pump:** 12 kW air-to-water, COP 4.2 at A7/W35
- **Underfloor Heating:** 8-zone manifold with individual zone valves
- **Circulation Pump:** Variable speed, weather compensated

### Controls
- **Room Thermostats:** 8 wireless programmable thermostats (one per zone)
- **MVHR Controller:** Wall-mounted with boost/holiday/night modes
- **Weather Compensation:** Outdoor sensor for heat pump optimization

## Performance Summary

| Parameter | Value | Notes |
|-----------|-------|-------|
| Heating Capacity | 12 kW | At -7°C outdoor, 35°C flow temp |
| Ventilation Rate | 0.5 ACH | Meets residential ventilation code |
| Heat Recovery | 90% | Certified performance |
| COP (Heating) | 4.2 | At A7/W35 test condition |
| Noise Level | ≤25 dB(A) | In occupied spaces |
| Energy Class | A+++ | EU energy label |

## Requirements Summary

### REQ-HVAC-VENTILATION-RATE
- **Criterion:** Minimum 0.5 air changes per hour
- **Compliance:** MVHR unit sized for building volume
- **Verification:** Airflow measurements, commissioning report

### REQ-HVAC-HEAT-RECOVERY
- **Criterion:** Minimum 85% heat recovery efficiency
- **Compliance:** MVHR unit certified at 90% efficiency
- **Verification:** Product certification, performance testing

### REQ-ENERGY-EFFICIENCY-HVAC
- **Criterion:** A++ energy rating or better
- **Compliance:** Heat pump COP 4.2, MVHR 90% efficiency
- **Verification:** Energy calculations, SAP/PHPP modeling

### REQ-ACOUSTIC-HVAC-NOISE
- **Criterion:** Maximum 30 dB(A) in bedrooms, 35 dB(A) in living areas
- **Compliance:** MVHR unit ≤25 dB(A), ductwork acoustic lining
- **Verification:** Acoustic testing, commissioning measurements

## Usage Guidelines

### When to Use This Type
- ✅ New residential buildings (apartments, houses)
- ✅ Energy-efficient buildings (Passivhaus, near-zero-energy)
- ✅ Buildings with underfloor heating
- ✅ Continuous ventilation requirement

### When NOT to Use
- ❌ Radiator-based heating - use different type
- ❌ Natural ventilation preferred - use hybrid system type
- ❌ Cooling required - use MVHR + cooling system type
- ❌ Commercial buildings - use commercial HVAC type
```

## ID Naming Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| `SYT-{CATEGORY}-{TYPE}` | `SYT-HVAC-RESIDENTIAL` | System category + building type |
| `SYT-{CATEGORY}-{TECHNOLOGY}` | `SYT-HVAC-VRF` | System category + technology |
| `SYT-{CATEGORY}-{VARIANT}` | `SYT-ELECTRICAL-STANDARD-A` | System category + variant |

**Guidelines:**
- Use uppercase for consistency
- Include technology/method when applicable (MVHR, VRF, PV, etc.)
- Descriptive names (avoid codes like SYT-001)
- Include variant suffix when multiple configurations exist (A, B, C)

## System Type Catalog Examples

| Type ID | Type Name | Category | Purpose | Typical Capacity |
|---------|-----------|----------|---------|------------------|
| `SYT-HVAC-RESIDENTIAL-MVHR` | Residential HVAC - MVHR | hvac | Apartment ventilation + heating | 12 kW heating |
| `SYT-HVAC-VRF-OFFICE` | VRF HVAC - Office | hvac | Office cooling + heating | 20-100 kW |
| `SYT-ELECTRICAL-RESIDENTIAL` | Residential Electrical | electrical | Apartment distribution | 50 kW load |
| `SYT-PLUMBING-RESIDENTIAL` | Residential Plumbing | plumbing | Apartment water/drainage | 12 L/min |
| `SYT-FIRE-RESIDENTIAL` | Residential Fire Safety | fire_safety | Apartment fire detection | Smoke + alarm |
| `SYT-SECURITY-RESIDENTIAL` | Residential Security | security | Apartment security | Access + CCTV |
| `SYT-SOLAR-PV-ROOF` | Rooftop Solar PV | renewable_energy | Solar electricity generation | 10 kWp |

## Compiled Output

When compiled, System Types are stored separately from system instances:

```json
{
  "entities": {
    "system_types": [
      {
        "id": "SYT-HVAC-RESIDENTIAL-MVHR",
        "entityType": "system_type",
        "typeName": "Residential HVAC - MVHR System",
        "systemCategory": "hvac",
        "requirements": ["REQ-HVAC-VENTILATION-RATE", "REQ-HVAC-HEAT-RECOVERY"],
        "components": [
          {
            "category": "air_handling",
            "description": "Heat recovery ventilation unit",
            "specification": "MVHR with 90% heat recovery efficiency",
            "quantity": 1
          }
        ],
        "typicalPerformance": {
          "heatingCapacity": "12 kW",
          "heatRecovery": "90%",
          "copHeating": 4.2
        },
        "version": "1.0.0"
      }
    ],
    "systems": [
      {
        "id": "SYS-HVAC-01",
        "systemName": "HVAC System Building 01",
        "systemTypeId": "SYT-HVAC-RESIDENTIAL-MVHR",
        "buildingId": "BLD-01",
        "servedZoneIds": ["ZONE-HVAC-NORTH"],
        "assetInstanceIds": ["AI-MVHR-01", "AI-HP-01"]
        // Compiler merges type specifications here
      }
    ]
  }
}
```

## Compiler Behavior

The compiler **resolves type references** and merges specifications:

1. **Load type definition** from `systemTypeId`
2. **Merge type specifications** into system instance:
   - Requirements: `type.requirements` + `instance.requirementOverrides`
   - Components: `type.components` (reference list)
   - Performance: `instance.performance` || `type.typicalPerformance`
3. **Validate system instance** against type constraints:
   - Components match expected configuration
   - Performance within expected ranges
4. **Link assets** to system based on component categories
5. **Output complete system** with all properties flattened

### Merge Example

**System Type:** `SYT-HVAC-RESIDENTIAL-MVHR` has 7 components and 4 requirements

**System Instance:** `SYS-HVAC-01` references type, adds building-specific data

**Compiled Output:**
```json
{
  "id": "SYS-HVAC-01",
  "systemName": "HVAC System Building 01",
  "systemCategory": "hvac",
  "requirements": [
    "REQ-HVAC-VENTILATION-RATE",
    "REQ-HVAC-HEAT-RECOVERY",
    "REQ-ENERGY-EFFICIENCY-HVAC",
    "REQ-ACOUSTIC-HVAC-NOISE"
  ],
  "components": [/* 7 components from type */],
  "performance": {
    "heatingCapacity": "12 kW",
    "heatRecovery": "90%",
    "copHeating": 4.2
  },
  "assetInstanceIds": ["AI-MVHR-01", "AI-HP-01"]
}
```

## Validation Rules

| Rule | Check | Severity |
|------|-------|----------|
| Type exists | `systemTypeId` must reference valid system_type | Error |
| Category match | Instance `systemCategory` must match type `systemCategory` | Error |
| Version compatibility | Instance and type versions should align | Info |
| Components complete | Instance should reference assets for all required components | Warning |
| Performance valid | Performance values within expected ranges | Warning |
| No conflicts | Instance overrides must not conflict with type constraints | Error |

## Override Mechanisms

System instances can override type specifications when needed:

### Example: Higher Capacity System

```markdown
---
systemName: "HVAC System Building 02 (Larger)"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"

# Override performance for larger building
performanceOverrides:
  heatingCapacity: "18 kW"  # Larger than type's 12 kW
  ventilationRate: "0.6 ACH"  # Higher than type's 0.5 ACH

# Additional requirement
requirementOverrides:
  - "REQ-HVAC-ZONE-CONTROL-001"  # Add zone control requirement
---
```

The compiler will:
- Keep all components from type (may need larger equipment)
- Override performance values to 18 kW and 0.6 ACH
- Add zone control requirement to requirements list
- Flag that asset instances should match higher capacity

## Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Component added | Patch (1.0.0 → 1.0.1) | Add humidity sensor |
| Component specification changed | Minor (1.0.1 → 1.1.0) | Upgrade MVHR to 92% efficiency |
| Requirement changed | Minor (1.1.0 → 1.2.0) | Add new performance requirement |
| Major redesign | Major (1.2.0 → 2.0.0) | Switch to VRF system |

**Instance compatibility:**
- System instances reference type by ID (not version)
- Compiler uses latest version of referenced type
- Breaking changes require new type ID (e.g., `SYT-HVAC-RESIDENTIAL-VRF`)

## Migration Path

### Existing Projects
1. **Identify repeating system patterns** - Find systems with identical configurations
2. **Create system type definition** - Extract common specifications
3. **Migrate system instances** - Add `systemTypeId`, remove repeated data
4. **Link assets** - Update asset instances to reference system
5. **Validate** - Run compiler to verify merge correctness

### Example Migration

**Before:**
```markdown
# sys-hvac-bld-01.md (320 lines with full component list)
# sys-hvac-bld-02.md (320 lines with identical specs)
# sys-hvac-bld-03.md (320 lines with identical specs)
```

**After:**
```markdown
# hvac-residential-mvhr-type.md (450 lines - ONCE)
# sys-hvac-bld-01.md (120 lines - instance data only)
# sys-hvac-bld-02.md (120 lines - instance data only)
# sys-hvac-bld-03.md (120 lines - instance data only)

Total: 450 + (3 × 120) = 810 lines
Before: 3 × 320 = 960 lines
Savings: -150 lines (-16%)

For 10 identical systems: -47% reduction
For 20 identical systems: -58% reduction
```

## Common System Type Patterns

### Multi-Building Projects

Create system types used across buildings:

```yaml
# Standard HVAC for all residential buildings
SYT-HVAC-RESIDENTIAL-MVHR → BLD-01: SYS-HVAC-01
                           → BLD-02: SYS-HVAC-02
                           → BLD-03: SYS-HVAC-03
```

### Multi-Floor Systems

Create system types for floor-by-floor replication:

```yaml
# Electrical distribution per floor
SYT-ELECTRICAL-FLOOR-STANDARD → LVL-01: SYS-ELEC-L01
                               → LVL-02: SYS-ELEC-L02
                               → LVL-03: SYS-ELEC-L03
```

## See Also

- **[System](/en/documentation/entities/system)** - System instances that reference types
- **[Asset Type](/en/documentation/entities/asset-type)** - Product/equipment templates
- **[Asset Instance](/en/documentation/entities/asset-instance)** - Equipment within systems
- **[Space Type](/en/documentation/entities/space-type)** - Space templates (similar pattern)
- **[Requirement](/en/documentation/entities/requirement)** - Requirements referenced by systems
- **Schema:** `sbm-schema-v0.1.json` - System Type definition (lines 394-434)
