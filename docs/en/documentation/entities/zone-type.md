# Zone Type

A **Zone Type** is a reusable template that defines common specifications for similar zones. Zone instances reference a type to inherit requirements, properties, and boundaries.

::: tip When to Use
Use Zone Types when you have **multiple similar zones** (e.g., identical fire zones on each floor, HVAC zones in multiple buildings). Define specifications once in the type, then create lightweight instances that reference it.

**Benefits:**
- ✅ Define requirements, properties, boundaries once
- ✅ Guaranteed consistency across all zones
- ✅ Update one file → affects all zone instances
- ✅ Simplified zone management across floors/buildings
:::

## Purpose

Zone Types define **template specifications** that apply to all zone instances:
- Requirements (fire safety, acoustic, HVAC performance, security)
- Properties (zone-specific parameters and thresholds)
- Boundaries and spatial constraints
- Performance criteria

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique type identifier | `"ZT-FIRE-ZL-IV"` |
| `entityType` | string | Must be `"zone_type"` | `"zone_type"` |
| `documentType` | string | Must be `"zone_type"` | `"zone_type"` |
| `typeName` | string | Human-readable type name | `"Fire Zone ZL-IV Standard"` |
| `zoneType` | string | Zone category (see enum below) | `"fire"` |
| `version` | string | Semantic version | `"1.0.0"` |

### Zone Type Enumeration

The `zoneType` field must be one of these values:

| Value | Purpose | Typical Properties |
|-------|---------|-------------------|
| `fire` | Fire safety zones | Fire resistance, escape distance, compartmentation |
| `acoustic` | Acoustic control zones | Sound insulation requirements, background noise limits |
| `hvac` | Climate control zones | Temperature setpoints, ventilation rates, humidity |
| `security` | Security zones | Access control levels, surveillance requirements |
| `lighting` | Lighting zones | Illuminance levels, daylight integration, controls |
| `thermal` | Thermal zones | Insulation requirements, thermal mass, solar control |
| `access_control` | Access restriction zones | Security levels, authentication methods, logging |
| `medical_electrical` | IEC 60364-7-710 medical zones | Safety group (0/1/2), IT power supply, equipotential bonding |
| `radiation_protection` | Radiological shielding zones | Shielding material, Pb equivalent, controlled area boundaries |
| `cleanroom` | ISO 14644 cleanroom zones | ISO class, air changes, filtration, gowning |
| `infection_control` | Infection prevention zones | Isolation type, PPE requirements, airflow direction |
| `pressure_cascade` | Pressure gradient zones | Pressure differential (Pa), flow direction (clean-to-dirty) |

## Template Fields

These fields define the **template specifications** inherited by all zone instances:

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Type description and purpose |
| `requirements` | array | Requirement IDs that apply to ALL zone instances |
| `properties` | object | Zone-specific properties (varies by zoneType) |
| `tags` | array | Classification tags |

## Properties Object Structure

The `properties` object varies by zone type. Here are recommended structures:

### Fire Zone Properties

```yaml
properties:
  fireResistance: "REI 60"          # Fire resistance rating
  maxEscapeDistance: 10.0           # Maximum escape distance (m)
  compartmentationRequired: true    # Compartmentation needed?
  smokeControlStrategy: "natural"   # natural, mechanical, pressurization
  evacuationStrategy: "single_stage" # single_stage, phased
  fireDetectionType: "smoke"        # smoke, heat, flame
```

### Acoustic Zone Properties

```yaml
properties:
  acousticClass: "A"                # Acoustic classification
  soundInsulationRequirement: "Rw ≥ 52 dB"  # Airborne sound insulation
  impactSoundRequirement: "Ln,w ≤ 53 dB"    # Impact sound insulation
  backgroundNoiseLimit: "NR 25"     # Background noise rating
  reverbTimeTarget: "0.5s"          # Reverberation time (s)
```

### HVAC Zone Properties

```yaml
properties:
  heatingSetpoint: 21.0             # Heating setpoint (°C)
  coolingSetpoint: 24.0             # Cooling setpoint (°C)
  ventilationRate: "0.5 ACH"        # Air changes per hour
  humidityRange: "40-60%"           # Relative humidity range
  controlStrategy: "VAV"            # VAV, CAV, VRF, etc.
  occupancyControl: true            # Occupancy-based control?
```

### Security Zone Properties

```yaml
properties:
  securityLevel: "medium"           # low, medium, high, critical
  accessMethod: "card+pin"          # card, pin, card+pin, biometric
  surveillanceRequired: true        # CCTV required?
  intrusionDetection: true          # Intrusion alarm required?
  accessLogging: "24/7"             # Access logging requirement
```

### Lighting Zone Properties

```yaml
properties:
  illuminanceTarget: "500 lux"      # Target illuminance (lux)
  daylightIntegration: true         # Daylight-responsive dimming?
  occupancyControl: true            # Occupancy detection?
  controlType: "DALI"               # DALI, DMX, 0-10V, etc.
  emergencyLightingRequired: true   # Emergency lighting?
```

### Thermal Zone Properties

```yaml
properties:
  thermalMassCategory: "heavy"      # light, medium, heavy
  insulation_U_value: "0.15 W/(m²·K)"  # Thermal transmittance
  solarHeatGainCoeff: 0.35          # Solar heat gain coefficient
  thermalBridgingControl: "high"    # low, medium, high
```

### Access Control Zone Properties

```yaml
properties:
  authenticationLevel: "two-factor" # single, two-factor, biometric
  accessSchedule: "business_hours"  # 24/7, business_hours, custom
  visitorManagement: true           # Visitor registration required?
  antiPassbackEnabled: true         # Prevent passback?
  evacuationOverride: true          # Emergency unlock on alarm?
```

### Medical Electrical Zone Properties (v0.3.0)

```yaml
properties:
  safetyGroup: "group_2"              # IEC 60364-7-710 group
  itPowerSupply: true                 # IT medical power supply required
  switchoverTime: "0.5s"              # Max switchover time
  equipotentialBonding: "medical"     # medical, supplementary
  rcdMonitoring: true                 # RCD monitoring required
```

### Radiation Protection Zone Properties (v0.3.0)

```yaml
properties:
  shieldingMaterial: "lead sheet"     # Primary shielding material
  equivalentPbMm: 2.0                # Lead equivalent in mm
  controlledArea: true                # Controlled radiation area
  supervisedArea: false               # Supervised area boundary
  dosimetryRequired: true             # Personal dosimetry required
```

### Cleanroom Zone Properties (v0.3.0)

```yaml
properties:
  isoClass: "ISO 7"                   # ISO 14644 cleanroom class
  airChangesPerHour: 25               # Required ACH
  filtrationClass: "HEPA H14"         # Filtration requirement
  gowningRequired: true               # Gowning/PPE required
  pressureDifferentialPa: 15          # Pressure vs. adjacent space
```

### Infection Control Zone Properties (v0.3.0)

```yaml
properties:
  isolationType: "airborne"           # airborne, contact, droplet
  pressurization: "negative"          # Negative pressure for isolation
  anteroomRequired: true              # Anteroom/airlock required
  hepaExhaust: true                   # HEPA filter on exhaust
  ppeRequirements: ["N95", "gown", "gloves", "face_shield"]
```

### Pressure Cascade Zone Properties (v0.3.0)

```yaml
properties:
  cascadeDirection: "clean_to_dirty"  # Pressure gradient direction
  pressureSteps:                      # Pressure at each step (Pa relative to reference)
    - zone: "clean_corridor"
      pressurePa: 15
    - zone: "anteroom"
      pressurePa: 10
    - zone: "patient_room"
      pressurePa: 5
    - zone: "dirty_corridor"
      pressurePa: 0
  monitoringRequired: true            # Continuous pressure monitoring
```

## Example: Zone Type Definition

**File:** `templates/zone-types/fire-zone-zl-iv.md`

```markdown
---
documentType: "zone_type"
entityType: "zone_type"
id: "ZT-FIRE-ZL-IV"
typeName: "Fire Zone ZL-IV Standard"
zoneType: "fire"
description: "Standard fire safety zone for residential buildings per Polish regulations (ZL-IV category)"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-FIRE-ZL-IV-001"           # Max escape distance 10m
  - "REQ-FIRE-COMPARTMENTATION-001" # Fire compartmentation
  - "REQ-FIRE-DETECTION-001"        # Smoke detection required

# FIRE ZONE PROPERTIES
properties:
  fireResistance: "REI 60"
  maxEscapeDistance: 10.0
  compartmentationRequired: true
  smokeControlStrategy: "natural"
  evacuationStrategy: "single_stage"
  fireDetectionType: "smoke"
  emergencyLightingRequired: true
  fireExtinguishersRequired: true

version: "1.0.0"
tags:
  - "fire-safety"
  - "residential"
  - "polish-code"
---

# Zone Type: Fire Zone ZL-IV Standard

## Description

Standard fire safety zone for residential buildings according to Polish building regulations. Category ZL-IV (Kategoria Zagrożenia Ludzi) applies to residential buildings up to 25m height with occupants capable of self-evacuation.

## Design Intent

This zone type ensures:
- Maximum escape distance of 10 meters to protected corridor or stairwell
- REI 60 fire resistance for compartmentation elements
- Automatic smoke detection in all habitable spaces
- Natural smoke control (openable windows in escape routes)
- Single-stage evacuation strategy

## Requirements Summary

### REQ-FIRE-ZL-IV-001: Maximum Escape Distance
- **Criterion:** Every point in the zone must be ≤ 10m from protected corridor or exit
- **Compliance:** Measured along shortest walking route
- **Verification:** Floor plan analysis, escape route diagrams

### REQ-FIRE-COMPARTMENTATION-001: Fire Compartmentation
- **Criterion:** Zone boundaries must have REI 60 fire resistance
- **Compliance:** Walls, floors, fire doors with appropriate ratings
- **Verification:** Product specifications, installation certificates

### REQ-FIRE-DETECTION-001: Smoke Detection
- **Criterion:** Optical smoke detectors in all habitable spaces
- **Compliance:** Ceiling-mounted, mains-powered with battery backup
- **Verification:** System design, installation certificates, testing

## Usage Guidelines

### When to Use This Type
- ✅ Residential buildings (apartments, dormitories)
- ✅ Buildings up to 25m height
- ✅ Occupants capable of self-evacuation
- ✅ Polish building code compliance required

### When NOT to Use
- ❌ High-rise residential (>25m) - use ZL-III
- ❌ Care homes, hospitals - use ZL-II or ZL-I
- ❌ Commercial, office - different fire zone categories
- ❌ Industrial buildings - separate fire safety codes
```

## ID Naming Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| `ZT-{TYPE}-{DESCRIPTOR}` | `ZT-FIRE-ZL-IV` | Zone type + code/standard |
| `ZT-{TYPE}-{LEVEL}` | `ZT-SECURITY-HIGH` | Zone type + security level |
| `ZT-{TYPE}-{VARIANT}` | `ZT-HVAC-RESIDENTIAL-A` | Zone type + building type + variant |

**Guidelines:**
- Use uppercase for consistency
- Include standard/code reference when applicable (ZL-IV, NR-25, etc.)
- Descriptive names (avoid codes like ZT-001)
- Include variant suffix when multiple configurations exist (A, B, C)

## Zone Type Catalog Examples

| Type ID | Type Name | Zone Type | Purpose | Typical Properties |
|---------|-----------|-----------|---------|-------------------|
| `ZT-FIRE-ZL-IV` | Fire Zone ZL-IV Standard | fire | Residential fire zones | REI 60, 10m escape |
| `ZT-ACOUSTIC-RESIDENTIAL` | Residential Acoustic Zone | acoustic | Bedroom zones | Rw ≥52 dB, NR 25 |
| `ZT-HVAC-RESIDENTIAL` | Residential HVAC Zone | hvac | Apartment climate zones | 21-24°C, 0.5 ACH |
| `ZT-HVAC-OFFICE` | Office HVAC Zone | hvac | Office climate zones | 21-23°C, 6 ACH |
| `ZT-SECURITY-PUBLIC` | Public Security Zone | security | Public areas | Low security, CCTV |
| `ZT-SECURITY-RESTRICTED` | Restricted Security Zone | security | Secure areas | High security, access control |
| `ZT-LIGHTING-OFFICE` | Office Lighting Zone | lighting | Office lighting | 500 lux, daylight dimming |

## Compiled Output

When compiled, Zone Types are stored separately from zone instances:

```json
{
  "entities": {
    "zone_types": [
      {
        "id": "ZT-FIRE-ZL-IV",
        "entityType": "zone_type",
        "typeName": "Fire Zone ZL-IV Standard",
        "zoneType": "fire",
        "requirements": [
          "REQ-FIRE-ZL-IV-001",
          "REQ-FIRE-COMPARTMENTATION-001",
          "REQ-FIRE-DETECTION-001"
        ],
        "properties": {
          "fireResistance": "REI 60",
          "maxEscapeDistance": 10.0,
          "compartmentationRequired": true,
          "smokeControlStrategy": "natural"
        },
        "version": "1.0.0"
      }
    ],
    "zones": [
      {
        "id": "ZONE-FIRE-NORTH-L01",
        "zoneName": "Fire Zone North Wing Level 01",
        "zoneTypeId": "ZT-FIRE-ZL-IV",
        "buildingId": "BLD-01",
        "levelIds": ["LVL-01"],
        "spaceIds": ["SP-001", "SP-002", "SP-003"]
        // Compiler merges type specifications here
      }
    ]
  }
}
```

## Compiler Behavior

The compiler **resolves type references** and merges specifications:

1. **Load type definition** from `zoneTypeId`
2. **Merge type specifications** into zone instance:
   - Requirements: `type.requirements` + `instance.requirementOverrides`
   - Properties: `type.properties` + `instance.propertyOverrides`
3. **Validate zone instance** against type constraints:
   - Properties conform to type expectations
   - No conflicting overrides
4. **Output complete zone** with all properties flattened

### Merge Example

**Zone Type:** `ZT-FIRE-ZL-IV` has `requirements: ["REQ-FIRE-ZL-IV-001"]`

**Zone Instance:** `ZONE-FIRE-NORTH-L01` references type, no overrides

**Compiled Output:**
```json
{
  "id": "ZONE-FIRE-NORTH-L01",
  "zoneName": "Fire Zone North Wing Level 01",
  "zoneType": "fire",
  "requirements": ["REQ-FIRE-ZL-IV-001"],  // Inherited from type
  "properties": {
    "fireResistance": "REI 60",             // Inherited from type
    "maxEscapeDistance": 10.0               // Inherited from type
  }
}
```

## Validation Rules

| Rule | Check | Severity |
|------|-------|----------|
| Type exists | `zoneTypeId` must reference valid zone_type | Error |
| Zone type match | Instance `zoneType` should match type `zoneType` | Warning |
| Version compatibility | Instance and type versions should align | Info |
| No conflicts | Instance overrides must not conflict with type constraints | Error |
| Properties valid | Properties match expected structure for zone type | Warning |

## Override Mechanisms

Zone instances can override type specifications when needed:

### Example: Stricter Fire Requirements

```markdown
---
zoneName: "Fire Zone Stairwell A"
zoneTypeId: "ZT-FIRE-ZL-IV"

# Additional requirement beyond type
requirementOverrides:
  - "REQ-FIRE-STAIR-PRESSURIZATION-001"  # Add pressurization requirement

# Stricter property
propertyOverrides:
  smokeControlStrategy: "pressurization"  # Override from "natural" to "pressurization"
  maxEscapeDistance: 8.0                   # Stricter than type's 10.0m
---
```

The compiler will:
- Keep all requirements from type (`REQ-FIRE-ZL-IV-001`, etc.)
- Add `REQ-FIRE-STAIR-PRESSURIZATION-001` to requirements list
- Override `smokeControlStrategy` to `"pressurization"`
- Override `maxEscapeDistance` to `8.0` (stricter)
- Keep all other properties from type unchanged

## Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Property refinement | Patch (1.0.0 → 1.0.1) | Add emergency lighting property |
| Property changed | Minor (1.0.1 → 1.1.0) | Change max escape distance |
| Requirement added | Minor (1.1.0 → 1.2.0) | Add new fire safety requirement |
| Major redesign | Major (1.2.0 → 2.0.0) | Complete zone type overhaul |

**Instance compatibility:**
- Zone instances reference type by ID (not version)
- Compiler uses latest version of referenced type
- Breaking changes require new type ID (e.g., `ZT-FIRE-ZL-IV-V2`)

## Migration Path

### Existing Projects
1. **Identify repeating zone patterns** - Find zones with identical requirements
2. **Create zone type definition** - Extract common specifications
3. **Migrate zone instances** - Add `zoneTypeId`, remove repeated data
4. **Validate** - Run compiler to verify merge correctness

### Example Migration

**Before:**
```markdown
# fire-zone-north-l01.md (180 lines with full requirements)
# fire-zone-south-l01.md (180 lines with identical requirements)
# fire-zone-north-l02.md (180 lines with identical requirements)
# fire-zone-south-l02.md (180 lines with identical requirements)
```

**After:**
```markdown
# fire-zone-zl-iv-type.md (250 lines - ONCE)
# fire-zone-north-l01.md (80 lines - instance data only)
# fire-zone-south-l01.md (80 lines - instance data only)
# fire-zone-north-l02.md (80 lines - instance data only)
# fire-zone-south-l02.md (80 lines - instance data only)

Total: 250 + (4 × 80) = 570 lines
Before: 4 × 180 = 720 lines
Savings: -150 lines (-21%)

For 20 identical zones: -55% reduction
For 50 identical zones: -63% reduction
```

## Common Zone Type Patterns

### Multi-Floor Buildings

Create zone types that apply to multiple floors:

```yaml
# Fire zones repeated on each floor
ZT-FIRE-ZL-IV → ZONE-FIRE-L01, ZONE-FIRE-L02, ZONE-FIRE-L03

# HVAC zones per wing
ZT-HVAC-RESIDENTIAL → ZONE-HVAC-NORTH-L01, ZONE-HVAC-NORTH-L02
                    → ZONE-HVAC-SOUTH-L01, ZONE-HVAC-SOUTH-L02
```

### Multi-Building Projects

Create zone types used across buildings:

```yaml
# Standard fire zones for all buildings
ZT-FIRE-ZL-IV → BLD-01: ZONE-FIRE-A, ZONE-FIRE-B
              → BLD-02: ZONE-FIRE-A, ZONE-FIRE-B
              → BLD-03: ZONE-FIRE-A, ZONE-FIRE-B
```

## See Also

- **[Zone](/en/documentation/entities/zone)** - Zone instances that reference types
- **[Space Type](/en/documentation/entities/space-type)** - Space templates (similar pattern)
- **[System Type](/en/documentation/entities/system-type)** - System templates
- **[Requirement](/en/documentation/entities/requirement)** - Requirements referenced by zones
- **Schema:** `sbm-schema-v0.3.json` - Zone Type definition
