# Sensors & IoT

Modern buildings generate data throughout their operational life. This page explains how sensor systems, IoT devices, and building management systems connect to the architectural documentation standard -- ensuring that the handover from design to operation is seamless.

## Why Sensors Matter for Architecture

Sensors and IoT devices are building components, just like walls and windows. They must be:

- **Specified** during design (from [Design Development](/en/phases/design-development) onward)
- **Documented** in the BIM model (at [LOD 500](/en/bim-integration/lod-loi) for as-built)
- **Mapped** to building management systems during [Construction](/en/phases/construction)
- **Handed over** with complete data as part of [Handover](/en/phases/handover) deliverables

::: info
This standard treats sensors as assets. Each sensor is documented using an Asset card within the project database, linked to its location (Room, Zone, Floor) and the system it serves (Installation).
:::

## Sensor Types in Buildings

| Sensor type | What it measures | Typical location | Related system |
|---|---|---|---|
| Temperature sensor | Air or surface temperature (C) | Rooms, ducts, pipe surfaces | HVAC |
| Humidity sensor | Relative humidity (%) | Rooms, air handling units | HVAC |
| CO2 sensor | Carbon dioxide concentration (ppm) | Meeting rooms, open offices, classrooms | Ventilation |
| Occupancy sensor | Presence or people count | Rooms, corridors, entrances | Lighting, HVAC, security |
| Light level sensor | Illuminance (lux) | Workspaces, facades | Lighting control |
| Energy meter | Electricity consumption (kWh) | Distribution boards, individual circuits | Electrical |
| Water meter | Water flow (m3/h or litres) | Main supply, risers, plant rooms | Plumbing |
| Gas meter | Gas consumption (m3/h) | Gas supply entry, boiler room | Heating |
| Pressure sensor | Air or water pressure (Pa or bar) | Ductwork, pipe systems | HVAC, plumbing |
| Smoke detector | Smoke particles | All occupied spaces per fire code | Fire safety |
| Motion sensor | Movement detection | Corridors, external areas | Security, lighting |
| Window/door contact | Open/closed state | Openable windows, external doors | Security, HVAC |

## BMS Integration

A Building Management System (BMS) collects data from sensors, controls building systems, and provides operational visibility. The architectural documentation must support BMS integration through the following deliverables.

### What the Architect Provides

| Deliverable | Phase | Description |
|---|---|---|
| Sensor location plans | [Design Development](/en/phases/design-development) | Floor plans showing sensor positions by type |
| Sensor schedule | [Construction Docs](/en/phases/construction-docs) | Table listing every sensor: type, location, system, data point ID |
| Cable routing coordination | [Construction Docs](/en/phases/construction-docs) | Coordinated with MEP routing in the BIM model |
| As-built sensor model | [As-Built](/en/phases/as-built) | BIM model with all sensors at LOD 500 |
| Asset data handover | [Handover](/en/phases/handover) | Complete Asset cards for every sensor and meter |

### Data Points Mapping

Every sensor produces one or more data points. These must be mapped in the documentation:

| Data point field | Description | Example |
|---|---|---|
| Point ID | Unique identifier used by BMS | AHU-01.SAT |
| Description | Human-readable name | Supply Air Temperature, Air Handling Unit 1 |
| Unit | Measurement unit | Celsius |
| Range | Expected value range | 10 -- 35 |
| Alarm low | Threshold for low alarm | 14 |
| Alarm high | Threshold for high alarm | 30 |
| Polling interval | How often the value is read | 60 seconds |
| Location reference | Link to Room or Zone card | Room 2.14, Zone B |
| Asset reference | Link to the sensor Asset card | ASSET-TEMP-0042 |

::: tip
Agree on the data point naming convention during [Design Development](/en/phases/design-development). Using a consistent convention (e.g., System-Equipment-Parameter) avoids expensive remapping during commissioning.
:::

## Digital Twin Concept

A digital twin is a live digital replica of the physical building, fed by real-time sensor data. This standard supports digital twin workflows by ensuring that:

1. **Every sensor has an Asset card** -- documenting type, location, manufacturer, installation date, calibration schedule, and data point mapping.
2. **Asset cards link to BIM elements** -- the sensor in the 3D model is connected to the Asset card in the database via [bidirectional sync](/en/bim-integration/bidirectional-sync).
3. **Data points are standardised** -- consistent naming and units allow dashboards and analytics tools to consume data without manual transformation.
4. **IFC export includes sensor data** -- sensors are exported as IfcSensor entities with property sets matching the data point mapping. See [IFC Entities](/en/bim-integration/ifc-entities).

### Digital Twin Maturity Levels

| Level | Name | Description | This standard supports |
|---|---|---|---|
| Level 0 | Static model | 3D model without live data | Yes -- via BIM model |
| Level 1 | Connected model | Model linked to live sensor feeds | Yes -- via Asset cards and data point mapping |
| Level 2 | Analytical twin | Model with historical data analysis and predictions | Partially -- data structure supports analytics |
| Level 3 | Autonomous twin | Self-optimising building systems | Foundation only -- requires specialised platforms |

## How Asset Cards Document Sensors

Each sensor or IoT device in the building gets its own Asset card in the project database. The Asset card captures:

| Field | Description | Example |
|---|---|---|
| Asset ID | Unique identifier | ASSET-TEMP-0042 |
| Asset name | Descriptive name | Temperature Sensor, Room 2.14 |
| Asset type | Category from standard taxonomy | Temperature Sensor |
| Manufacturer | Device manufacturer | Siemens |
| Model | Product model number | QAM2120.040 |
| Serial number | Unique serial from manufacturer | SN-29847561 |
| Installation date | When installed on site | 2025-06-14 |
| Location -- Building | Link to Building card | Main Library Building |
| Location -- Floor | Link to Floor card | Level 2 |
| Location -- Room | Link to Room card | Room 2.14 -- Reading Room |
| Location -- Zone | Link to Zone card | Zone B -- Public Areas |
| Serving system | Link to Installation card | AHU-01 -- Air Handling Unit 1 |
| Data point IDs | List of BMS data points | AHU-01.SAT, AHU-01.SAT.AL |
| Calibration interval | Required calibration frequency | 12 months |
| Next calibration | Scheduled calibration date | 2026-06-14 |
| Warranty expiry | End of manufacturer warranty | 2028-06-14 |
| O&M manual | Reference to operations manual | Doc ref: OM-HVAC-042 |

::: warning
Missing Asset cards at handover create long-term problems. Facilities teams cannot maintain sensors they do not know about. Ensure every sensor is documented before [Handover](/en/phases/handover) sign-off.
:::

## Dashboard Examples

Well-documented sensor data enables operational dashboards. Common dashboard views include:

### Building Overview Dashboard

| Widget | Data source | Purpose |
|---|---|---|
| Floor plan heatmap | Temperature sensors per room | Visualise thermal comfort across the building |
| Energy consumption chart | Energy meters per floor/zone | Track daily, weekly, monthly energy use |
| Occupancy summary | Occupancy sensors per zone | Show real-time and historical occupancy patterns |
| Alarm list | All sensors with active alarms | Highlight systems requiring attention |
| System status | BMS controller status | Confirm all systems are operational |

### Zone-Level Dashboard

| Widget | Data source | Purpose |
|---|---|---|
| Temperature trend | Zone temperature sensors | Show temperature over time with setpoint overlay |
| Humidity trend | Zone humidity sensors | Monitor humidity with comfort range markers |
| CO2 level | Zone CO2 sensors | Ensure ventilation meets air quality targets |
| Lighting status | Light level sensors + controls | Show current lighting levels and control mode |
| Occupancy count | Zone occupancy sensors | Display current versus capacity |

## IoT Protocol Considerations

| Protocol | Common use | Notes |
|---|---|---|
| BACnet | HVAC, lighting, fire systems | Most common in commercial buildings |
| Modbus | Industrial equipment, older systems | Widely supported, simpler protocol |
| KNX | Lighting, blinds, room automation | Common in European commercial and residential |
| MQTT | IoT sensors, cloud-connected devices | Lightweight, suited for high-volume data |
| LoRaWAN | Wireless sensors in large buildings | Long range, low power, good for retrofit |
| Zigbee / Z-Wave | Small-scale building automation | More common in residential |

::: info
The communication protocol used by each sensor should be recorded in the Asset card. This information is essential for facilities teams when troubleshooting or expanding the building management system.
:::

## Checklist for Sensor Documentation

- [ ] Sensor types identified per room and zone
- [ ] Sensor schedule created with data point mapping
- [ ] Data point naming convention agreed with BMS integrator
- [ ] Sensors included in BIM model at appropriate LOD (see [LOD/LOI Matrix](/en/bim-integration/lod-loi))
- [ ] Asset cards created for all sensors and meters
- [ ] Asset cards linked to Room, Zone, Floor, and Installation cards
- [ ] IFC export includes IfcSensor entities with property sets
- [ ] Commissioning data recorded in Asset cards
- [ ] O&M manuals linked to Asset cards
- [ ] Dashboard requirements defined with facilities team

## Related Pages

- [BIM Execution Plan (BEP)](/en/bim-integration/bep)
- [LOD/LOI Matrix](/en/bim-integration/lod-loi)
- [IFC Entities](/en/bim-integration/ifc-entities)
- [Bidirectional Sync](/en/bim-integration/bidirectional-sync)
- [Handover Phase](/en/phases/handover)
- [BIM Integration Overview](/en/bim-integration/)
