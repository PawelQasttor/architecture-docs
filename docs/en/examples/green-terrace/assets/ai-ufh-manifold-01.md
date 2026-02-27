---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-UFH-MANIFOLD-01"
assetName: "Underfloor Heating Manifold - Level 01"
projectPhase: "construction"
bimLOD: "LOD_400"

assetTypeId: "AT-UFH-MANIFOLD-12ZONE"
category: "hvac"

# Instance identifiers
identifiers:
  assetTag: "UFH-MAN-01"
  serial: "UFH-MAN-2024-001567"
  barcode: "7612345678925"

# Location
buildingId: "BLD-01"
locatedInSpaceId: "SP-BLD-01-L01-CORR"
systemId: "SYS-HVAC-01"

# Technical Specifications
specifications:
  zones: 12  # Number of controlled zones
  flowTemperature: 35  # °C design flow temperature
  maxFlowRate: 1200  # L/h total
  pipeConnections: "3/4 inch Euroconus"
  actuatorType: "230V NC (normally closed)"
  mixingValveType: "3-way thermostatic"
  pumpType: "Wilo Yonos PARA RS 25/6"
  dimensions:
    width: 850
    depth: 150
    height: 600
    unit: "mm"

# Zone Configuration
zoneConfiguration:
  - zoneNumber: 1
    zoneName: "Bedroom 01"
    spaceId: "SP-BLD-01-L01-001"
    loopLength: 80  # m
    flowRate: 100  # L/h
    actuatorId: "ACT-UFH-Z01"
    thermostatId: "TSTAT-ROOM-001"

  - zoneNumber: 2
    zoneName: "Bedroom 02"
    spaceId: "SP-BLD-01-L01-002"
    loopLength: 75  # m
    flowRate: 95  # L/h
    actuatorId: "ACT-UFH-Z02"
    thermostatId: "TSTAT-ROOM-002"

  - zoneNumber: 3
    zoneName: "Corridor"
    spaceId: "SP-BLD-01-L01-CORR"
    loopLength: 120  # m
    flowRate: 150  # L/h
    actuatorId: "ACT-UFH-Z03"
    thermostatId: "TSTAT-CORR-001"

  # Zones 4-12 for other units (not detailed in this example)

# Installation data
installationData:
  installationDate: "2024-04-20"
  installedBy: "Heating Solutions Sp. z o.o."
  installer: "Marek Wiśniewski (certified plumber #PL-8901)"
  commissioningDate: "2024-04-25"
  commissionedBy: "Heating Solutions Sp. z o.o."
  commissioningNotes: |
    - All 12 zones pressure tested (6 bar, 24 hours) - no leaks
    - Flow rates balanced to design values
    - Actuators tested and calibrated
    - Mixing valve set to 35°C
    - Pump speed optimized for flow distribution
    - All thermostats paired and tested

# Warranty and service
warranty:
  warrantyStart: "2024-04-20"
  warrantyEnd: "2029-04-20"
  warrantyProvider: "Heating Solutions Sp. z o.o."
  warrantyTerms: "5 years parts and labor, 2-year pump warranty"

maintenance:
  lastServiceDate: "2024-10-20"
  nextServiceDue: "2025-04-20"
  maintenanceContractor: "Heating Solutions Sp. z o.o."
  serviceIntervalMonths: 12
  maintenanceSchedule:
    - interval: "12 months"
      task: "Actuator operation test, pump inspection, mixing valve check, pressure test"
    - interval: "24 months"
      task: "Full system flush and cleaning, pump replacement (if needed)"
  expectedLifetimeYears: 20

# Service history
serviceHistory:
  - date: "2024-04-25"
    type: "commissioning"
    performedBy: "Heating Solutions Sp. z o.o."
    notes: "Initial commissioning - all zones balanced, 6-bar pressure test passed"
  - date: "2024-10-20"
    type: "6month_inspection"
    performedBy: "Heating Solutions Sp. z o.o."
    notes: "All actuators operating correctly, pump performance good, no leaks detected"

# Spare parts
spareParts:
  - partName: "Actuator 230V NC"
    partNumber: "ACT-UFH-NC-230V"
    quantity: 2
    location: "Manifold cabinet"
  - partName: "Pump Wilo RS 25/6"
    partNumber: "WILO-RS-25-6"
    quantity: 0
    notes: "Order when needed (24-hour delivery)"

# Performance data
performanceData:
  supplyTemperature: 35.2  # °C (measured at manifold)
  returnTemperature: 30.8  # °C (measured at manifold)
  deltaT: 4.4  # °C
  totalFlowRate: 1180  # L/h (measured)
  pumpSpeed: 3  # speed setting (1-6)
  powerDraw: 35  # W
  measuredDate: "2024-10-20"

# BIM Integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "2N5wL2$uMDax6YaHx5OSbV"
    ifcEntity: "IfcFlowController"

    ifcExtractedProperties:
      numberOfZones: 12
      dimensions: [850, 150, 600]
      lastExtracted: "2026-02-27T10:30:00Z"

    validation:
      locationMatch: true
      dimensionsMatch: true
      zoneCountMatch: true
      lastValidated: "2026-02-27T10:30:00Z"

# Digital Twin Integration
iotDevices:
  - deviceId: "sensor_ufh_manifold_supply_temp"
    type: "temperature_sensor"
    location: "supply_header"
    dataPoint: "manifold_supply_temperature"
  - deviceId: "sensor_ufh_manifold_return_temp"
    type: "temperature_sensor"
    location: "return_header"
    dataPoint: "manifold_return_temperature"
  - deviceId: "sensor_ufh_manifold_supply_pressure"
    type: "pressure_sensor"
    location: "supply_header"
    dataPoint: "manifold_supply_pressure"
  - deviceId: "sensor_ufh_manifold_return_pressure"
    type: "pressure_sensor"
    location: "return_header"
    dataPoint: "manifold_return_pressure"
  - deviceId: "flowmeter_ufh_manifold_total"
    type: "flow_meter"
    location: "supply_header"
    dataPoint: "total_flow_rate"

# Actuator devices (12 zones)
actuators:
  - actuatorId: "ACT-UFH-Z01"
    zone: 1
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_01"
  - actuatorId: "ACT-UFH-Z02"
    zone: 2
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_02"
  - actuatorId: "ACT-UFH-Z03"
    zone: 3
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_03"
  # Actuators 4-12 for other zones

# Cost data
cost:
  purchasePrice: 2800  # Manifold + actuators + pump
  installationCost: 1500  # Labor + materials
  totalCost: 4300
  currency: "EUR"

version: "1.0.0"
tags:
  - "underfloor-heating"
  - "manifold"
  - "distribution"
  - "building-01"
  - "level-01"
  - "commissioned"
---

# Asset Instance: Underfloor Heating Manifold - Level 01

**Type:** Underfloor Heating Distribution Manifold (12-zone)
**Category:** HVAC - Heating Distribution
**System:** [SYS-HVAC-01](../systems/sys-hvac-01.md)

Central distribution manifold controlling 12 underfloor heating zones on Level 01, receiving heated water from the heat pump and distributing to individual dwelling units.

## Installation Details

- **Serial Number:** UFH-MAN-2024-001567
- **Asset Tag:** UFH-MAN-01
- **Location:** Corridor technical cupboard, Level 01
- **Installation Date:** 2024-04-20
- **Installer:** Heating Solutions Sp. z o.o. (Marek Wiśniewski #PL-8901)
- **Commissioning Date:** 2024-04-25

## Technical Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| **Number of Zones** | 12 | - |
| **Flow Temperature** | 35 | °C |
| **Max Flow Rate** | 1,200 | L/h |
| **Pipe Connections** | 3/4" Euroconus | - |
| **Actuators** | 230V NC (normally closed) | - |
| **Pump** | Wilo Yonos PARA RS 25/6 | - |
| **Dimensions** | 850×150×600 | mm (W×D×H) |

## Zone Configuration

| Zone | Room | Space ID | Loop Length | Flow Rate | Actuator | Thermostat |
|------|------|----------|-------------|-----------|----------|------------|
| 1 | Bedroom 01 | SP-BLD-01-L01-001 | 80m | 100 L/h | ACT-UFH-Z01 | TSTAT-ROOM-001 |
| 2 | Bedroom 02 | SP-BLD-01-L01-002 | 75m | 95 L/h | ACT-UFH-Z02 | TSTAT-ROOM-002 |
| 3 | Corridor | SP-BLD-01-L01-CORR | 120m | 150 L/h | ACT-UFH-Z03 | TSTAT-CORR-001 |
| 4-12 | Other units | - | - | - | - | - |

**Total flow rate (12 zones):** 1,180 L/h (measured)

## System Operation

### Flow Path
1. **Heat Pump** (AI-HP-01) → primary circuit @ 35°C
2. **Mixing Valve** → maintains 35°C supply temperature
3. **Manifold Supply Header** → distributes to 12 zones
4. **Zone Actuators** → open/close based on room thermostat demand
5. **Underfloor Loops** → heat transfer to floor slab
6. **Manifold Return Header** → collects return water (~31°C)
7. **Pump** → circulates water through distribution circuit
8. Return to heat pump

### Control Logic
- **Room thermostats** call for heat → open zone actuator
- **Mixing valve** maintains 35°C supply temperature
- **Pump** runs when any zone is open
- **BMS monitoring** logs temperatures, pressures, flow rates

## Performance

| Parameter | Design | Measured | Status |
|-----------|--------|----------|--------|
| Supply Temperature | 35.0°C | 35.2°C | ✅ OK |
| Return Temperature | 31.0°C | 30.8°C | ✅ OK |
| ΔT | 4.0°C | 4.4°C | ✅ OK |
| Total Flow Rate | 1,200 L/h | 1,180 L/h | ✅ OK |
| Pump Speed | 3 | 3 | ✅ OK |
| Power Draw | - | 35 W | ✅ OK |

## Maintenance Schedule

| Interval | Task | Responsible |
|----------|------|-------------|
| **12 months** | Actuator test, pump inspection, mixing valve check, pressure test | Service Contractor |
| **24 months** | Full system flush and cleaning | Service Contractor |

## Service History

| Date | Type | Performed By | Notes |
|------|------|--------------|-------|
| 2024-04-25 | Commissioning | Heating Solutions | 6-bar pressure test passed, all zones balanced ✅ |
| 2024-10-20 | 6-month inspection | Heating Solutions | All actuators OK, pump good, no leaks ✅ |
| 2025-04-20 | Annual service (due) | - | Full inspection scheduled |

## Spare Parts On-Site

- **Actuator 230V NC** (Qty: 2) - Location: Manifold cabinet
- **Pump Wilo RS 25/6** - Order when needed (24h delivery)

## Warranty

- **Start:** 2024-04-20
- **End:** 2029-04-20 (5 years parts and labor)
- **Pump:** 2-year manufacturer warranty
- **Provider:** Heating Solutions Sp. z o.o.

## Digital Twin Integration

**5 sensors connected:**
- Manifold supply temperature
- Manifold return temperature
- Supply header pressure
- Return header pressure
- Total flow rate

**12 actuator control points** (BMS-controlled, one per zone)

**Data logging:** All parameters logged every 5 minutes to BMS

## Cost Summary

| Item | Cost (EUR) |
|------|------------|
| Manifold + actuators + pump | €2,800 |
| Installation | €1,500 |
| **Total** | **€4,300** |

## Integration with Heat Pump

This manifold receives heated water from the **Bosch Compress 7000i Heat Pump** (AI-HP-01):
- Heat pump provides 35°C flow temperature (low-temperature design)
- COP ~4.3 at these operating conditions (very efficient)
- Heat pump capacity: 12 kW (sufficient for all 12 zones)

---

**Status:** ✅ Operational
**Next Service:** 2025-04-20
**Expected Lifetime:** 20 years (until ~2044)
**Last Updated:** 2026-02-27
