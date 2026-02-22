# System

A **System** represents a building technical system (HVAC, electrical, plumbing, fire safety) that contains and coordinates multiple asset instances. Systems enable lifecycle management, energy analysis, and operational monitoring.

## Purpose

Systems define:
- MEP system hierarchies (AHUs, distribution, terminals)
- System-level performance requirements
- Energy consumption targets
- Maintenance coordination across assets
- BMS integration points

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique system identifier | `"SYS-HVAC-01"` |
| `entityType` | string | Must be `"system"` | `"system"` |
| `documentType` | string | Must be `"system"` | `"system"` |
| `systemName` | string | Human-readable name | `"HVAC System 01 - North Zone"` |
| `systemCategory` | string | System category (see enum below) | `"hvac"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `systemTypeId` | string | Reference to system_type for template properties |
| `assetInstanceIds` | array | Asset instance IDs (auto-computed) |
| `servedZoneIds` | array | Zone IDs served by this system |
| `servedSpaceIds` | array | Space IDs served by this system |
| `systemType` | string | Specific system type (e.g., "variable_air_volume") |
| `requirementOverrides` | array | Additional requirements beyond system type |
| `performance` | object | Instance-specific performance data (overrides type) |
| `capacity` | object | System capacity (cooling, heating, power) |
| `efficiency` | object | Efficiency ratings (COP, SEER, EER) |
| `energySource` | string | Primary energy source |
| `controlStrategy` | string | Control approach (BMS, local, manual) |
| `maintenanceSchedule` | object | System-level maintenance plan |
| `designCriteria` | object | Design parameters and targets |
| `requirements` | array | Requirement IDs applicable to system |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

## System Categories (Enum)

```typescript
type SystemCategory =
  | "hvac"              // Heating, ventilation, air conditioning
  | "electrical"        // Power distribution, lighting
  | "plumbing"          // Domestic water, drainage
  | "fire_safety"       // Fire alarm, suppression, smoke control
  | "security"          // Access control, surveillance, intrusion detection
  | "lighting"          // Lighting control systems
  | "communications"    // Data, voice, audio-visual
  | "vertical_transport" // Elevators, escalators
  | "renewable_energy"; // Solar PV, wind, geothermal
```

## Example: Markdown Source

**File:** `docs/en/examples/green-terrace/systems/sys-hvac-01.md`

```markdown
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"
systemType: "variable_air_volume"
buildingId: "BLD-01"

servedZoneIds:
  - "ZONE-HVAC-NORTH"

capacity:
  cooling: 85
  heating: 75
  unit: "kW"

efficiency:
  cooling_cop: 3.2
  heating_cop: 3.8
  seer: 16.5

energySource: "electricity_heat_pump"
controlStrategy: "bms_ddc"

designCriteria:
  outdoorAirRate: 30
  outdoorAirRateUnit: "m3/h/person"
  minFreshAir: 0.5
  minFreshAirUnit: "ACH"
  supplyAirTemp: 16
  supplyAirTempUnit: "°C"

maintenanceSchedule:
  filterReplacement: "quarterly"
  annualInspection: true
  predictiveMaintenance: true

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC-001"

ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "1N2eH8$qKAxt2WxDu1LNyP"
  objectType: "HVAC"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
  - "variable_air_volume"
  - "energy_efficient"
---

# HVAC System 01: North Zone

Variable air volume (VAV) heat pump system serving north zone residential spaces.

## System Description

- **Type:** VAV with heat pump
- **Cooling capacity:** 85 kW
- **Heating capacity:** 75 kW
- **Efficiency:** SEER 16.5, COP 3.2 (cooling) / 3.8 (heating)
- **Energy source:** Air-source heat pump

## Served Areas

- Zone: HVAC-NORTH
- Spaces: Bedrooms, living rooms (north-facing)
- Total floor area: 450 m²
- Design occupancy: 180 people (peak)

## Distribution

- **Air handling unit:** AHU-01 (rooftop)
- **VAV boxes:** 12 terminal units with reheat
- **Ductwork:** Galvanized steel, insulated
- **Controls:** BACnet DDC via central BMS

## Maintenance

- Filter replacement: Quarterly
- Annual inspection: Full system performance test
- Predictive maintenance: Vibration monitoring on compressors
```

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "systems": [
      {
        "documentType": "system",
        "entityType": "system",
        "id": "SYS-HVAC-01",
        "systemName": "HVAC System 01 - North Zone",
        "systemCategory": "hvac",
        "systemType": "variable_air_volume",
        "buildingId": "BLD-01",
        "servedZoneIds": ["ZONE-HVAC-NORTH"],
        "capacity": {
          "cooling": 85,
          "heating": 75,
          "unit": "kW"
        },
        "efficiency": {
          "cooling_cop": 3.2,
          "heating_cop": 3.8,
          "seer": 16.5
        },
        "energySource": "electricity_heat_pump",
        "controlStrategy": "bms_ddc",
        "designCriteria": {
          "outdoorAirRate": 30,
          "outdoorAirRateUnit": "m3/h/person",
          "minFreshAir": 0.5,
          "minFreshAirUnit": "ACH",
          "supplyAirTemp": 16,
          "supplyAirTempUnit": "°C"
        },
        "maintenanceSchedule": {
          "filterReplacement": "quarterly",
          "annualInspection": true,
          "predictiveMaintenance": true
        },
        "requirements": [
          "REQ-VENTILATION-OCCUPIED-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-ENERGY-EFFICIENCY-HVAC-001"
        ],
        "assetInstanceIds": [
          "AI-AHU-01",
          "AI-VAV-NORTH-01",
          "AI-VAV-NORTH-02",
          "AI-VAV-NORTH-03"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcSystem",
          "globalId": "1N2eH8$qKAxt2WxDu1LNyP",
          "objectType": "HVAC"
        },
        "version": "1.0.0",
        "tags": ["hvac", "heat_pump", "variable_air_volume", "energy_efficient"]
      }
    ]
  }
}
```

## Reverse Relationships

The compiler **auto-computes** `system.assetInstanceIds` from asset references:

**Input:** Assets reference systems
```yaml
# ai-ahu-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-02.md
systemId: "SYS-HVAC-01"
```

**Output:** System automatically contains asset list
```json
{
  "id": "SYS-HVAC-01",
  "assetInstanceIds": [
    "AI-AHU-01",
    "AI-VAV-NORTH-01",
    "AI-VAV-NORTH-02"
  ]
}
```

## Type/Instance Pattern

Systems can reference **System Types** to inherit standard components, performance characteristics, and requirements:

**System Type (Template):**
```yaml
# hvac-residential-mvhr-type.md
---
id: "SYT-HVAC-RESIDENTIAL-MVHR"
entityType: "system_type"
typeName: "Residential HVAC - MVHR + Heat Pump"
systemCategory: "hvac"
requirements:
  - "REQ-HVAC-VENTILATION-RATE"
  - "REQ-HVAC-HEAT-RECOVERY"
  - "REQ-ENERGY-EFFICIENCY-HVAC"
components:
  - category: "air_handling"
    description: "MVHR unit"
    specification: "90% heat recovery efficiency"
  - category: "heating"
    description: "Air-to-water heat pump"
    specification: "12 kW, COP 4.2"
typicalPerformance:
  heatingCapacity: "12 kW"
  heatRecovery: "90%"
  copHeating: 4.2
---
```

**System Instance (References Type):**
```yaml
# sys-hvac-01.md
---
id: "SYS-HVAC-01"
entityType: "system"
systemName: "HVAC System Building 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"  # Inherits components & performance
systemCategory: "hvac"
buildingId: "BLD-01"

# Instance-specific data
servedZoneIds: ["ZONE-HVAC-NORTH"]
assetInstanceIds: ["AI-MVHR-01", "AI-HP-01"]
performance:
  measuredCOP: 4.3  # Override: actual measured performance
---
```

**Compiled Output:**
```json
{
  "id": "SYS-HVAC-01",
  "systemName": "HVAC System Building 01",
  "systemCategory": "hvac",
  "requirements": [
    "REQ-HVAC-VENTILATION-RATE",      // From type
    "REQ-HVAC-HEAT-RECOVERY",          // From type
    "REQ-ENERGY-EFFICIENCY-HVAC"       // From type
  ],
  "components": [                       // From type
    {"category": "air_handling", "description": "MVHR unit"},
    {"category": "heating", "description": "Air-to-water heat pump"}
  ],
  "performance": {
    "heatingCapacity": "12 kW",        // From type
    "heatRecovery": "90%",             // From type
    "measuredCOP": 4.3                 // Instance override
  },
  "assetInstanceIds": ["AI-MVHR-01", "AI-HP-01"]  // Instance-specific
}
```

**Benefits:**
- Define system configuration once (SYT-HVAC-RESIDENTIAL-MVHR)
- Reuse across multiple buildings with same system type
- Update type → all instances inherit changes
- Reduce documentation by 50-90% for repeating systems

See [System Type](/en/documentation/entities/system-type) for complete documentation.

## BIM Mapping

Systems map to **IfcSystem** entities and Revit MEP Systems:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_System.SBM_ID` |
| `systemName` | `System Name` | `Name` |
| `systemCategory` | `System Classification` | `Pset_SBM_System.Category` |
| `systemType` | `System Type` | `Pset_SBM_System.SystemType` |
| `capacity` | `SBM_Capacity` | `Pset_SBM_System.Capacity` |
| `efficiency` | `SBM_Efficiency` | `Pset_SBM_System.Efficiency` |
| `energySource` | `SBM_Energy_Source` | `Pset_SBM_System.EnergySource` |

## System Categories by Discipline

### HVAC Systems
- **Types:** VAV, CAV, fan coil, radiant, VRF, heat pump
- **Capacity:** Cooling/heating in kW or tons
- **Efficiency:** COP, SEER, EER, AFUE
- **Standards:** EN 16798-1, ASHRAE 90.1, WT 2021 § 328

### Electrical Systems
- **Types:** Main distribution, lighting control, emergency power
- **Capacity:** Power in kW or kVA
- **Voltage:** 230V, 400V, etc.
- **Standards:** IEC 60364, NEC, WT 2021 § 192

### Plumbing Systems
- **Types:** Domestic hot water, cold water, drainage, rainwater
- **Capacity:** Flow rates in L/min or m³/h
- **Pressure:** Operating pressure in bar or PSI
- **Standards:** EN 806, WT 2021 § 145

### Fire Safety Systems
- **Types:** Fire alarm, sprinkler, smoke control, fire suppression
- **Coverage:** Detection zones, sprinkler zones
- **Standards:** EN 54, NFPA, WT 2021 § 234-235

## Asset Register Integration

Systems aggregate asset data for facilities management:

```json
{
  "systemSummary": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "totalAssets": 15,
      "assetBreakdown": {
        "ahu": 1,
        "vav_box": 12,
        "pump": 2
      },
      "maintenanceCalendar": [
        {
          "taskType": "filter_replacement",
          "frequency": "quarterly",
          "affectedAssets": ["AI-AHU-01"],
          "nextDue": "2026-04-01"
        },
        {
          "taskType": "annual_inspection",
          "frequency": "yearly",
          "affectedAssets": ["AI-AHU-01", "AI-VAV-NORTH-*"],
          "nextDue": "2026-06-15"
        }
      ],
      "totalMaintenanceCost": {
        "annual": 4500,
        "currency": "PLN"
      }
    }
  ]
}
```

## Digital Twin Integration

Systems enable aggregated monitoring and control:

```json
{
  "systemMonitoring": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "bmsIntegration": {
        "protocol": "BACnet",
        "deviceId": "BACnet:201",
        "objectIdentifier": "device,201"
      },
      "kpis": [
        {
          "metric": "system_cop",
          "dataPoints": [
            "AI-AHU-01-POWER-IN",
            "AI-AHU-01-COOLING-OUT",
            "AI-AHU-01-HEATING-OUT"
          ],
          "calculation": "(cooling_out + heating_out) / power_in",
          "target": 3.2,
          "currentValue": 3.15
        },
        {
          "metric": "total_energy_consumption",
          "dataPoints": ["AI-AHU-01-ENERGY"],
          "aggregation": "sum",
          "period": "daily",
          "target": 850,
          "targetUnit": "kWh/day"
        }
      ],
      "alarms": [
        {
          "alarmId": "SYS-HVAC-01-LOW-COP",
          "condition": "system_cop < 2.5",
          "severity": "warning",
          "action": "notify_facilities_team"
        }
      ]
    }
  ]
}
```

## Energy Analysis

Systems with capacity and efficiency data enable energy modeling:

```json
{
  "energyModel": {
    "systemId": "SYS-HVAC-01",
    "annualEnergyUse": {
      "cooling": 45000,
      "heating": 38000,
      "fans": 12000,
      "total": 95000,
      "unit": "kWh/year"
    },
    "peakDemand": {
      "cooling": 85,
      "heating": 75,
      "unit": "kW"
    },
    "operatingHours": {
      "cooling": 1500,
      "heating": 2200,
      "unit": "hours/year"
    },
    "energyCost": {
      "annual": 38000,
      "currency": "PLN"
    }
  }
}
```

## See Also

- **[Asset Instance](/en/documentation/entities/asset-instance)** - Assets belong to systems
- **[Zone](/en/documentation/entities/zone)** - Systems serve zones
- **[Compiler Guide](/en/documentation/compiler/)** - System maintenance planning and monitoring
