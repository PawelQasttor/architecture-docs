# Asset Instance (Equipment Documentation)

## What This Is

An **Asset Instance** file documents one piece of physical equipment. Examples: "Air Handling Unit 01 (Serial: SR11-2026-04782)", "Elevator 1A".

::: tip For Architects
**Problem:** Facilities manager asks "When does the warranty expire on AHU-01?" or "What filters do we need to order?"

**Old way:** Hunt through equipment submittal files, check O&M manuals, email mechanical contractor.

**With asset instances:** Open `assets/ai-ahu-01.md` — warranty date, spare parts, maintenance schedule all in one file. **No hunting.**

**One asset file = all equipment info (warranty, maintenance, specs) tracked automatically.**
:::

An **Asset Instance** represents a specific piece of physical equipment with maintenance data, warranty information, and operational monitoring. Asset instances enable facilities management, CMMS integration, and digital twin runtime monitoring.

## Purpose

Asset instances track:
- Physical equipment identity (manufacturer, model, serial number)
- Installation location (space, level, building)
- Maintenance schedules and service history
- Warranty and lifecycle information
- Spare parts inventory
- IoT sensor bindings for runtime monitoring

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique asset identifier | `"AI-AHU-01"` |
| `entityType` | string | Must be `"asset_instance"` | `"asset_instance"` |
| `documentType` | string | Must be `"asset_instance"` | `"asset_instance"` |
| `assetName` | string | Human-readable name | `"Air Handling Unit 01"` |
| `assetType` | string | Equipment type (see categories below) | `"ahu"` |
| `systemId` | string | Parent system ID | `"SYS-HVAC-01"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Equipment identifier (e.g., `AI-AHU-01`)
- **assetName**: What you call it ("Air Handling Unit 01", "Elevator 1A")
- **assetType**: Equipment category — `ahu`, `pump`, `elevator`, `fire_alarm_panel`
- **systemId**: Which MEP system this belongs to (e.g., `SYS-HVAC-01`)
- **buildingId**: Which building
- **version**: Track changes

**You only NEED these 6 fields.** The rest (warranty, maintenance, specs) are optional but useful for facilities management.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `spaceId` | string | Installation space ID |
| `levelId` | string | Installation level ID |
| `manufacturer` | string | Equipment manufacturer |
| `modelNumber` | string | Model/part number |
| `serialNumber` | string | Serial number |
| `installationDate` | string | Installation date (ISO 8601) |
| `warrantyExpiry` | string | Warranty end date (ISO 8601) |
| `expectedLifespan` | number | Expected lifespan in years |
| `maintenanceSchedule` | object | Maintenance tasks and frequencies |
| `spareParts` | array | Recommended spare parts inventory |
| `specifications` | object | Technical specifications |
| `supplier` | object | Supplier contact information |
| `assetTag` | string | Physical asset tag/QR code |
| `cost` | object | Purchase and installation cost |
| `energyRating` | string | Energy efficiency rating |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For handover to facilities (most important):**
- **manufacturer** + **modelNumber** + **serialNumber** — Identify exact equipment
- **installationDate** + **warrantyExpiry** — Track warranties
- **maintenanceSchedule** — When to service equipment (quarterly filter changes, annual inspections)
- **assetTag** — Physical label on equipment (for QR codes)

**For cost tracking:**
- **cost** — Purchase and installation costs
- **expectedLifespan** — How long before replacement

**For replacement parts:**
- **spareParts** — What parts to keep in stock (filters, belts, etc.)
- **supplier** — Who to call for service

**For energy compliance:**
- **specifications** — Technical specs (capacity, power consumption)
- **energyRating** — Energy efficiency class

**Most architects only fill:** manufacturer, model, serial number, installation date, warranty. Facilities team fills the rest.
:::

## Asset Type Categories

```typescript
// HVAC Equipment
type HVACAssetType =
  | "ahu"              // Air Handling Unit
  | "fcu"              // Fan Coil Unit
  | "vav_box"          // VAV Terminal Box
  | "exhaust_fan"      // Exhaust Fan
  | "heat_pump"        // Heat Pump
  | "chiller"          // Chiller
  | "boiler"           // Boiler
  | "pump"             // Pump
  | "cooling_tower";   // Cooling Tower

// Electrical Equipment
type ElectricalAssetType =
  | "transformer"      // Transformer
  | "switchgear"       // Switchgear
  | "panel_board"      // Electrical Panel
  | "ups"              // Uninterruptible Power Supply
  | "generator"        // Emergency Generator
  | "lighting_fixture"; // Lighting Fixture

// Plumbing Equipment
type PlumbingAssetType =
  | "water_heater"     // Water Heater
  | "domestic_pump"    // Domestic Water Pump
  | "pressure_tank"    // Pressure Tank
  | "backflow_preventer"; // Backflow Preventer

// Fire Safety Equipment
type FireSafetyAssetType =
  | "fire_alarm_panel" // Fire Alarm Control Panel
  | "smoke_detector"   // Smoke Detector
  | "heat_detector"    // Heat Detector
  | "sprinkler_head"   // Sprinkler Head
  | "fire_pump"        // Fire Pump
  | "fire_extinguisher"; // Fire Extinguisher

// Vertical Transport
type VerticalTransportAssetType =
  | "elevator"         // Elevator
  | "escalator";       // Escalator
```

## Example 1: Your First Asset File (Minimal)

**The simplest equipment file for handover:**

```markdown
File: assets/ai-ahu-01.md

---
id: "AI-AHU-01"
entityType: "asset_instance"
documentType: "asset_instance"
assetName: "Air Handling Unit 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
version: "1.0.0"

# For facilities handover
manufacturer: "Systemair"
modelNumber: "Topvex SR11 EL"
serialNumber: "SR11-2026-04782"
installationDate: "2026-08-15"
warrantyExpiry: "2028-08-15"
---

# Air Handling Unit 01

Rooftop HVAC unit serving north zone.
Warranty expires 2028-08-15.
```

**That's it.** Facilities team can add maintenance schedules and spare parts later.

---

## Example 2: Complete Asset (Full Details)

**File:** `docs/en/examples/green-terrace/assets/ai-ahu-01.md`

```markdown
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-AHU-01"
projectPhase: "construction"
bimLOD: "LOD_350"

assetName: "Air Handling Unit 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
spaceId: "SP-BLD-01-ROOF-MECH"
levelId: "LVL-ROOF"

manufacturer: "Systemair"
modelNumber: "Topvex SR11 EL"
serialNumber: "SR11-2026-04782"
assetTag: "GT-AHU-001"

installationDate: "2026-08-15"
warrantyExpiry: "2028-08-15"
expectedLifespan: 20

specifications:
  airflow: 12000
  airflowUnit: "m3/h"
  coolingCapacity: 85
  heatingCapacity: 75
  capacityUnit: "kW"
  filterClass: "F7"
  powerConsumption: 15.5
  powerUnit: "kW"
  weight: 1850
  weightUnit: "kg"
  dimensions:
    length: 4200
    width: 2100
    height: 2400
    unit: "mm"

maintenanceSchedule:
  tasks:
    - taskId: "MAINT-AHU-FILTER"
      taskName: "Replace air filters"
      frequency: "quarterly"
      estimatedDuration: 2
      durationUnit: "hours"
      skillRequired: "HVAC technician"

    - taskId: "MAINT-AHU-ANNUAL"
      taskName: "Annual inspection and performance test"
      frequency: "yearly"
      estimatedDuration: 8
      durationUnit: "hours"
      skillRequired: "Certified HVAC engineer"

    - taskId: "MAINT-AHU-BEARING"
      taskName: "Lubricate fan bearings"
      frequency: "semi_annual"
      estimatedDuration: 1
      durationUnit: "hours"
      skillRequired: "HVAC technician"

spareParts:
  - partName: "Air filter F7"
    partNumber: "SF-F7-600x600"
    quantity: 4
    reorderLevel: 2
    unitCost: 145
    currency: "PLN"

  - partName: "Fan belt"
    partNumber: "BELT-SR11-STD"
    quantity: 2
    reorderLevel: 1
    unitCost: 89
    currency: "PLN"

supplier:
  name: "Systemair Polska Sp. z o.o."
  contact: "serwis@systemair.pl"
  phone: "+48 22 123 4567"
  emergencyPhone: "+48 22 123 4568"

cost:
  purchase: 125000
  installation: 18000
  total: 143000
  currency: "PLN"

energyRating: "A+"

ifcMapping:
  ifcEntity: "IfcUnitaryEquipment"
  globalId: "0M1dG7$pJ9ws1VwCt0KMyO"
  objectType: "AirHandlingUnit"

version: "1.0.0"
tags:
  - "hvac"
  - "air_handling_unit"
  - "rooftop"
  - "high_efficiency"
---

# Asset: Air Handling Unit 01

Rooftop air handling unit serving north zone HVAC system.

## Equipment Details

- **Manufacturer:** Systemair
- **Model:** Topvex SR11 EL
- **Serial:** SR11-2026-04782
- **Asset Tag:** GT-AHU-001
- **Location:** Rooftop mechanical room

## Technical Specifications

- **Airflow:** 12,000 m³/h
- **Cooling:** 85 kW
- **Heating:** 75 kW
- **Filter:** F7 class (4x 600x600mm)
- **Power:** 15.5 kW
- **Energy rating:** A+

## Maintenance

### Quarterly (4x per year)
- Replace air filters
- Check damper operation
- Inspect condensate drain

### Semi-Annual (2x per year)
- Lubricate fan bearings
- Check belt tension
- Clean heat exchangers

### Annual (1x per year)
- Full performance test
- Calibrate sensors
- Verify control sequences
- Inspect electrical connections

## Warranty

- **Installation:** 2026-08-15
- **Warranty expires:** 2028-08-15 (2 years)
- **Expected lifespan:** 20 years (replacement ~2046)

## Spare Parts Inventory

Maintain minimum stock:
- Air filters F7: 2 sets (4 filters each)
- Fan belts: 1 spare
- Control board: 1 spare (expensive, order on failure)
```

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "assetInstances": [
      {
        "documentType": "asset_instance",
        "entityType": "asset_instance",
        "id": "AI-AHU-01",
        "assetName": "Air Handling Unit 01",
        "assetType": "ahu",
        "systemId": "SYS-HVAC-01",
        "buildingId": "BLD-01",
        "spaceId": "SP-BLD-01-ROOF-MECH",
        "levelId": "LVL-ROOF",
        "manufacturer": "Systemair",
        "modelNumber": "Topvex SR11 EL",
        "serialNumber": "SR11-2026-04782",
        "assetTag": "GT-AHU-001",
        "installationDate": "2026-08-15",
        "warrantyExpiry": "2028-08-15",
        "expectedLifespan": 20,
        "specifications": {
          "airflow": 12000,
          "airflowUnit": "m3/h",
          "coolingCapacity": 85,
          "heatingCapacity": 75,
          "capacityUnit": "kW",
          "filterClass": "F7",
          "powerConsumption": 15.5,
          "powerUnit": "kW",
          "weight": 1850,
          "weightUnit": "kg",
          "dimensions": {
            "length": 4200,
            "width": 2100,
            "height": 2400,
            "unit": "mm"
          }
        },
        "maintenanceSchedule": {
          "tasks": [
            {
              "taskId": "MAINT-AHU-FILTER",
              "taskName": "Replace air filters",
              "frequency": "quarterly",
              "estimatedDuration": 2,
              "durationUnit": "hours",
              "skillRequired": "HVAC technician"
            }
          ]
        },
        "spareParts": [
          {
            "partName": "Air filter F7",
            "partNumber": "SF-F7-600x600",
            "quantity": 4,
            "reorderLevel": 2,
            "unitCost": 145,
            "currency": "PLN"
          }
        ],
        "supplier": {
          "name": "Systemair Polska Sp. z o.o.",
          "contact": "serwis@systemair.pl",
          "phone": "+48 22 123 4567",
          "emergencyPhone": "+48 22 123 4568"
        },
        "cost": {
          "purchase": 125000,
          "installation": 18000,
          "total": 143000,
          "currency": "PLN"
        },
        "energyRating": "A+",
        "ifcMapping": {
          "ifcEntity": "IfcUnitaryEquipment",
          "globalId": "0M1dG7$pJ9ws1VwCt0KMyO",
          "objectType": "AirHandlingUnit"
        },
        "version": "1.0.0",
        "tags": ["hvac", "air_handling_unit", "rooftop", "high_efficiency"]
      }
    ]
  }
}
```

## BIM Mapping

Asset instances map to specific IFC equipment entities:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Asset.SBM_ID` |
| `assetName` | `Type Name` | `Name` |
| `assetType` | `Family` | `ObjectType` |
| `manufacturer` | `Manufacturer` | `Pset_ManufacturerTypeInformation.Manufacturer` |
| `modelNumber` | `Model` | `Pset_ManufacturerTypeInformation.ModelReference` |
| `serialNumber` | `Serial Number` | `Pset_ManufacturerOccurrence.SerialNumber` |
| `assetTag` | `Mark` | `Pset_SBM_Asset.AssetTag` |
| `installationDate` | `SBM_Installation_Date` | `Pset_ServiceLife.InstallationDate` |
| `warrantyExpiry` | `SBM_Warranty_Expiry` | `Pset_Warranty.WarrantyEndDate` |

## Asset Register Integration

Asset instances populate the **asset register** compilation target:

```json
{
  "assetInventory": [
    {
      "assetId": "AI-AHU-01",
      "assetName": "Air Handling Unit 01",
      "assetType": "ahu",
      "systemName": "HVAC System 01 - North Zone",
      "location": "Rooftop mechanical room",
      "manufacturer": "Systemair",
      "model": "Topvex SR11 EL",
      "serial": "SR11-2026-04782",
      "assetTag": "GT-AHU-001",
      "installationDate": "2026-08-15",
      "warrantyExpiry": "2028-08-15",
      "expectedReplacement": "2046-08-15",
      "purchaseCost": 125000,
      "replacementReserve": {
        "annualContribution": 6250,
        "currency": "PLN"
      }
    }
  ],

  "maintenanceCalendar": [
    {
      "month": "2026-03",
      "tasks": [
        {
          "assetId": "AI-AHU-01",
          "taskId": "MAINT-AHU-FILTER",
          "taskName": "Replace air filters",
          "scheduledDate": "2026-03-15",
          "estimatedDuration": 2,
          "skillRequired": "HVAC technician",
          "estimatedCost": 580
        }
      ]
    }
  ],

  "sparePartsInventory": [
    {
      "partNumber": "SF-F7-600x600",
      "partName": "Air filter F7",
      "applicableAssets": ["AI-AHU-01"],
      "currentStock": 8,
      "reorderLevel": 2,
      "unitCost": 145,
      "totalValue": 1160
    }
  ]
}
```

## Digital Twin Integration

Asset instances bind to IoT sensors and BMS points:

```json
{
  "assetSensorBindings": [
    {
      "entityId": "AI-AHU-01",
      "entityName": "Air Handling Unit 01",
      "bmsIntegration": {
        "protocol": "BACnet",
        "deviceId": "BACnet:201",
        "objectIdentifier": "device,201"
      },
      "sensors": [
        {
          "sensorType": "supply_air_temperature",
          "sensorId": "TEMP-AHU-01-SA",
          "dataPoint": "AI-AHU-01-SA-TEMP",
          "bacnetPoint": "analog-input,1",
          "unit": "°C",
          "normalRange": { "min": 14, "max": 18 }
        },
        {
          "sensorType": "return_air_temperature",
          "sensorId": "TEMP-AHU-01-RA",
          "dataPoint": "AI-AHU-01-RA-TEMP",
          "bacnetPoint": "analog-input,2",
          "unit": "°C"
        },
        {
          "sensorType": "supply_fan_status",
          "sensorId": "STATUS-AHU-01-SF",
          "dataPoint": "AI-AHU-01-SF-STATUS",
          "bacnetPoint": "binary-input,1",
          "values": { "0": "off", "1": "on" }
        },
        {
          "sensorType": "power_consumption",
          "sensorId": "POWER-AHU-01",
          "dataPoint": "AI-AHU-01-POWER",
          "bacnetPoint": "analog-input,10",
          "unit": "kW"
        },
        {
          "sensorType": "filter_pressure_drop",
          "sensorId": "PRESSURE-AHU-01-FILTER",
          "dataPoint": "AI-AHU-01-FILTER-DP",
          "bacnetPoint": "analog-input,5",
          "unit": "Pa",
          "alarmThreshold": { "max": 250 }
        }
      ],
      "alarms": [
        {
          "alarmId": "AI-AHU-01-FILTER-CLOGGED",
          "condition": "filter_pressure_drop > 250",
          "severity": "warning",
          "action": "schedule_filter_replacement"
        },
        {
          "alarmId": "AI-AHU-01-FAN-FAULT",
          "condition": "supply_fan_status == off AND hvac_system_enabled == true",
          "severity": "critical",
          "action": "notify_emergency_contact"
        }
      ]
    }
  ]
}
```

## Maintenance Frequencies

Standard maintenance frequency values:

| Frequency | Description | Times per Year |
|-----------|-------------|----------------|
| `daily` | Every day | 365 |
| `weekly` | Every week | 52 |
| `monthly` | Every month | 12 |
| `quarterly` | Every 3 months | 4 |
| `semi_annual` | Every 6 months | 2 |
| `yearly` | Once per year | 1 |
| `biennial` | Every 2 years | 0.5 |
| `on_condition` | When condition triggers | Variable |

## CMMS Export

Asset instances export to **CMMS** (Computerized Maintenance Management System) formats:

**Maximo Format:**
```csv
ASSETNUM,DESCRIPTION,ASSETTYPE,LOCATION,MANUFACTURER,MODELNUM,SERIALNUM,INSTALLDATE,WARRANTY,REPLACECOST
AI-AHU-01,Air Handling Unit 01,AHU,ROOF-MECH,Systemair,Topvex SR11 EL,SR11-2026-04782,2026-08-15,2028-08-15,125000
```

**SAP PM Format:**
```xml
<Equipment>
  <EquipmentNumber>AI-AHU-01</EquipmentNumber>
  <Description>Air Handling Unit 01</Description>
  <TechnicalIdentNo>SR11-2026-04782</TechnicalIdentNo>
  <Manufacturer>Systemair</Manufacturer>
  <Model>Topvex SR11 EL</Model>
  <FunctionalLocation>BLD-01/ROOF/MECH</FunctionalLocation>
</Equipment>
```

## See Also

- **[System](/en/documentation/entities/system)** - Asset instances belong to systems
- **[Space](/en/documentation/entities/space)** - Asset installation locations
- **[Compiler Guide](/en/documentation/compiler/)** - Asset compilation and sensor binding generation
