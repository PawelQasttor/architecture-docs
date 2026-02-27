---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-MVHR-01"
assetName: "MVHR Unit - Level 01"
projectPhase: "construction"
bimLOD: "LOD_400"

assetTypeId: "AT-MVHR-RESIDENTIAL"
category: "hvac"

# Instance identifiers
identifiers:
  assetTag: "MVHR-01"
  serial: "MVHR-2024-L01-789"
  barcode: "7612345678918"

# Location
buildingId: "BLD-01"
locatedInSpaceId: "SP-BLD-01-L01-TECH"
systemId: "SYS-HVAC-01"

# Technical Specifications
specifications:
  airflow: 300  # m³/h at design conditions
  heatRecoveryEfficiency: 92  # %
  filterClass: "F7 / G4"
  powerConsumption: 65  # W at medium speed
  soundPressureLevel: 28  # dB(A) at 3m
  dimensions:
    width: 800
    depth: 600
    height: 400
    unit: "mm"

# Installation data
installationData:
  installationDate: "2024-05-10"
  installedBy: "Ventilation Systems Sp. z o.o."
  installer: "Piotr Nowak (certified MVHR installer #VT-5678)"
  commissioningDate: "2024-05-15"
  commissionedBy: "Ventilation Systems Sp. z o.o."
  commissioningNotes: |
    - Airflow balanced to 300 m³/h
    - Heat recovery efficiency tested: 92.3%
    - Pressure tested, no leaks detected
    - All ductwork sealed and insulated
    - Bypass damper operation verified

# Warranty and service
warranty:
  warrantyStart: "2024-05-10"
  warrantyEnd: "2029-05-10"
  warrantyProvider: "MVHR Manufacturer"
  warrantyTerms: "5 years parts and labor, extended heat exchanger warranty (10 years)"

maintenance:
  lastServiceDate: "2024-11-10"
  nextServiceDue: "2025-05-10"
  maintenanceContractor: "Ventilation Systems Sp. z o.o."
  serviceIntervalMonths: 6
  maintenanceSchedule:
    - interval: "3 months"
      task: "Filter inspection and cleaning (user)"
    - interval: "6 months"
      task: "Filter replacement (G4 supply filter)"
    - interval: "12 months"
      task: "Filter replacement (F7 extract filter), heat exchanger inspection, fan cleaning"
  expectedLifetimeYears: 15

# Service history
serviceHistory:
  - date: "2024-05-15"
    type: "commissioning"
    performedBy: "Ventilation Systems Sp. z o.o."
    notes: "Initial commissioning - heat recovery efficiency 92.3%, all tests passed"
  - date: "2024-08-10"
    type: "filter_replacement"
    performedBy: "Building Manager"
    notes: "G4 supply filter replaced (3-month interval)"
  - date: "2024-11-10"
    type: "annual_service"
    performedBy: "Ventilation Systems Sp. z o.o."
    notes: "F7 extract filter replaced, heat exchanger cleaned, fan inspected - no issues"

# Spare parts
spareParts:
  - partName: "G4 Supply Filter 800x600"
    partNumber: "MVHR-F-G4-800x600"
    quantity: 2
    location: "Technical room shelf"
  - partName: "F7 Extract Filter 800x600"
    partNumber: "MVHR-F-F7-800x600"
    quantity: 1
    location: "Technical room shelf"

# Performance data
performanceData:
  measuredEfficiency: 92.3  # %
  measuredAirflow: 305  # m³/h (supply)
  extractAirflow: 300  # m³/h
  powerDraw: 62  # W at medium speed
  measuredDate: "2024-05-15"

# BIM Integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "3M4vK1$tNCzw5XzGw4NRaU"
    ifcEntity: "IfcFlowMovingDevice"

    ifcExtractedProperties:
      nominalAirflow: 300
      dimensions: [800, 600, 400]
      lastExtracted: "2026-02-27T10:30:00Z"

    validation:
      locationMatch: true
      dimensionsMatch: true
      lastValidated: "2026-02-27T10:30:00Z"

# Digital Twin Integration
iotDevices:
  - deviceId: "sensor_mvhr01_supply_temp"
    type: "temperature_sensor"
    location: "supply_duct"
    dataPoint: "supply_air_temperature"
  - deviceId: "sensor_mvhr01_extract_temp"
    type: "temperature_sensor"
    location: "extract_duct"
    dataPoint: "extract_air_temperature"
  - deviceId: "sensor_mvhr01_outdoor_temp"
    type: "temperature_sensor"
    location: "outdoor_intake"
    dataPoint: "outdoor_air_temperature"
  - deviceId: "sensor_mvhr01_exhaust_temp"
    type: "temperature_sensor"
    location: "exhaust_duct"
    dataPoint: "exhaust_air_temperature"
  - deviceId: "sensor_mvhr01_supply_pressure"
    type: "pressure_sensor"
    location: "supply_duct"
    dataPoint: "supply_duct_pressure"
  - deviceId: "sensor_mvhr01_extract_pressure"
    type: "pressure_sensor"
    location: "extract_duct"
    dataPoint: "extract_duct_pressure"

# Cost data
cost:
  purchasePrice: 3500
  installationCost: 1200
  totalCost: 4700
  currency: "EUR"

version: "1.0.0"
tags:
  - "mvhr"
  - "ventilation"
  - "heat-recovery"
  - "building-01"
  - "level-01"
  - "commissioned"
---

# Asset Instance: MVHR Unit - Level 01

**Type:** Mechanical Ventilation with Heat Recovery Unit
**Category:** HVAC - Ventilation
**System:** [SYS-HVAC-01](../systems/sys-hvac-01.md)

Whole-house MVHR unit serving all 18 dwelling units on Level 01, providing continuous fresh air supply with heat recovery.

## Installation Details

- **Serial Number:** MVHR-2024-L01-789
- **Asset Tag:** MVHR-01
- **Location:** Technical room, Level 01
- **Installation Date:** 2024-05-10
- **Installer:** Ventilation Systems Sp. z o.o. (Piotr Nowak #VT-5678)
- **Commissioning Date:** 2024-05-15

## Technical Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| **Airflow (design)** | 300 | m³/h |
| **Heat Recovery Efficiency** | 92% | - |
| **Filter Class** | F7 / G4 | - |
| **Power Consumption** | 65 | W (medium speed) |
| **Sound Level** | 28 | dB(A) at 3m |
| **Dimensions** | 800×600×400 | mm (W×D×H) |

## Performance

- **Measured Efficiency:** 92.3% (exceeds rated 92%)
- **Supply Airflow:** 305 m³/h (measured)
- **Extract Airflow:** 300 m³/h (measured)
- **Power Draw:** 62 W at medium speed

## Operating Principles

### Airflow Path
1. **Outdoor Air Intake** → G4 filter → heat exchanger (warmed) → supply fan → **Supply to dwelling units**
2. **Extract from dwelling units** → extract fan → F7 filter → heat exchanger (cooled) → **Exhaust outdoors**

### Heat Recovery
- Counter-flow heat exchanger
- Heat from warm extract air transferred to cold supply air
- Efficiency: 92% (winter conditions)
- Bypass damper for summer night cooling

## Maintenance Schedule

| Interval | Task | Responsible |
|----------|------|-------------|
| **3 months** | G4 supply filter inspection/cleaning | Building Manager |
| **6 months** | G4 filter replacement | Building Manager |
| **12 months** | F7 filter replacement, heat exchanger inspection, fan cleaning | Service Contractor |

## Service History

| Date | Type | Performed By | Notes |
|------|------|--------------|-------|
| 2024-05-15 | Commissioning | Ventilation Systems | Efficiency 92.3%, all tests passed ✅ |
| 2024-08-10 | Filter replacement | Building Manager | G4 supply filter replaced |
| 2024-11-10 | Annual service | Ventilation Systems | F7 filter replaced, heat exchanger cleaned ✅ |
| 2025-05-10 | Annual service (due) | - | Full inspection scheduled |

## Spare Parts On-Site

- **G4 Supply Filter 800×600** (Qty: 2) - Location: Technical room shelf
- **F7 Extract Filter 800×600** (Qty: 1) - Location: Technical room shelf

## Warranty

- **Start:** 2024-05-10
- **End:** 2029-05-10 (5 years parts and labor)
- **Heat Exchanger:** 10-year extended warranty
- **Provider:** MVHR Manufacturer

## Digital Twin Integration

**6 sensors connected:**
- Supply air temperature
- Extract air temperature
- Outdoor air temperature
- Exhaust air temperature
- Supply duct pressure
- Extract duct pressure

**Data logging:** All parameters logged every 5 minutes to BMS

## Cost Summary

| Item | Cost (EUR) |
|------|------------|
| Equipment | €3,500 |
| Installation | €1,200 |
| **Total** | **€4,700** |

---

**Status:** ✅ Operational
**Next Service:** 2025-05-10
**Expected Lifetime:** 15 years (until ~2039)
**Last Updated:** 2026-02-27
