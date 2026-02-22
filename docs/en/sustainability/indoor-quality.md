---
title: Indoor Environment Quality
description: Daylight, ventilation, thermal comfort, and acoustic requirements for building documentation per WT 2021 and European standards.
---

# Indoor Environment Quality

Indoor Environment Quality (IEQ) covers four areas that directly affect occupant health, comfort, and productivity: **daylight**, **ventilation**, **thermal comfort**, and **acoustics**. Polish regulations — primarily [WT 2021](/en/regulations/wt-2021) — set minimum requirements for each. This page provides practical guidance for documenting IEQ in your building projects.

## Daylight

### WT 2021 Requirements

The fundamental daylight requirement in Polish regulations is:

- **Minimum window-to-floor area ratio: 1:8** — the glazed area of windows in a habitable room must be at least 1/8 of the floor area of that room.
- This ratio refers to the **light-transmitting area** of the window (glass only, excluding frame), though common practice uses the full window opening area with a correction factor.
- Rooms used exclusively at night (e.g. hotel bedrooms used only for sleeping) and utility rooms may be exempt, but this must be documented and justified.

### Daylight Factor

Beyond the simple area ratio, best practice is to verify the **daylight factor (DF)** — the ratio of indoor illuminance to outdoor illuminance under overcast sky conditions.

| Room Type | Minimum DF (recommended) | Target DF (good practice) |
|---|---|---|
| Living room | 1.0% | 2.0% |
| Bedroom | 0.5% | 1.5% |
| Kitchen | 1.0% | 2.0% |
| Classroom | 2.0% | 3.0% |
| Office — general | 2.0% | 3.0% |
| Office — deep plan | 1.5% | 2.5% |
| Hospital ward | 1.0% | 2.0% |
| Corridor / circulation | No requirement | 0.5% (if glazed) |

::: info
The daylight factor is a static metric. For a more complete picture, consider climate-based daylight modelling (CBDM), which accounts for actual sky conditions, orientation, and seasonal variation. CBDM is required for BREEAM and LEED credits.
:::

### Daylight Documentation

For each habitable room, document in the relevant Space card:

1. Window area and floor area (with ratio calculation)
2. Window orientation and any external obstructions (adjacent buildings, balconies)
3. Daylight factor analysis results (for projects requiring simulation)
4. Glare assessment for south and west-facing glazing
5. Shading strategy (external, internal, or integrated) and its impact on daylight access

## Ventilation

### Natural vs Mechanical Ventilation

Polish regulations recognise two primary ventilation strategies:

| Feature | Natural (Gravity) Ventilation | Mechanical Ventilation |
|---|---|---|
| Driving force | Temperature difference and wind | Fans |
| Air supply | Through window openings and trickle vents | Through ductwork with filtration |
| Extract | Vertical ducts with gravity flow | Mechanical extract or balanced system |
| Heat recovery | Not possible | 70-90% efficiency with heat exchanger |
| Control | Limited — depends on weather | Precise — adjustable flow rates |
| CO2 monitoring | Not standard | Recommended; enables demand-controlled ventilation |
| WT 2021 status | Permitted for residential | Required where natural is insufficient |
| Best suited for | Low-rise residential, mild climates | All building types, urban environments |

::: warning
Natural ventilation relies on adequate duct height and cross-section. In buildings under 3 storeys, gravity ventilation may not generate sufficient airflow in warm months. Document your ventilation strategy with calculations showing compliance in worst-case conditions (summer, no wind).
:::

### CO2 Monitoring

For mechanically ventilated buildings, CO2 sensors enable demand-controlled ventilation, which adjusts airflow based on actual occupancy rather than assumed maximum levels. This reduces energy consumption while maintaining air quality.

- **Target CO2 concentration:** below 1000 ppm in occupied spaces (Category II per EN 16798-1)
- **Sensor placement:** at breathing height (1.1-1.5 m), away from direct supply air jets
- **Data logging:** connect to the building management system for trend analysis

For guidance on sensor specification and integration, see [Sensors & IoT](/en/bim-integration/sensors-iot).

### Minimum Ventilation Rates

| Room Type | Minimum Airflow Rate | Notes |
|---|---|---|
| Kitchen (gas stove) | 70 m3/h | Continuous or intermittent with boost |
| Kitchen (electric stove) | 50 m3/h | Continuous or intermittent with boost |
| Bathroom (with WC) | 50 m3/h | Continuous operation |
| Separate WC | 30 m3/h | Continuous or intermittent |
| Living room / bedroom | 20 m3/h per person | Supply air; minimum 0.5 ACH |
| Office — per person | 30 m3/h per person | Per PN-EN 16798-1, Category II |
| Classroom | 20 m3/h per person | Minimum; 25-30 recommended |
| Meeting room | 30 m3/h per person | Higher occupancy density |
| Corridor / circulation | 2-3 ACH | Transfer air acceptable |

### Ventilation Documentation

For each zone or room, record in the relevant Zone card or Space card:

- Ventilation type (natural, mechanical supply, mechanical extract, balanced)
- Design airflow rate (m3/h) and basis for calculation
- Air change rate (ACH)
- Filter class (for mechanical systems)
- Heat recovery efficiency (for balanced systems)
- CO2 monitoring provision (sensor type, location, setpoint)
- Duct routing and sizing basis

## Thermal Comfort

### Operative Temperature Ranges

For mechanically conditioned buildings, design to these operative temperature ranges:

| Season | Heating Setpoint | Cooling Setpoint | Notes |
|---|---|---|---|
| Winter | 20-22 C | Not applicable | Minimum 18 C in bedrooms |
| Summer | Not applicable | 24-26 C | Maximum 28 C for short periods |
| Transition | 20-24 C (free-running) | 20-24 C (free-running) | Comfort depends on clothing and activity |

### Adaptive Comfort Model

For naturally ventilated buildings, the adaptive comfort model (EN 16798-1) is more appropriate than fixed temperature setpoints. It allows indoor comfort temperatures to vary with outdoor conditions.

| Comfort Category | Acceptable Range from Optimal | Applicability |
|---|---|---|
| Category I (high expectation) | +/- 2 C | Hospitals, care homes, sensitive occupants |
| Category II (normal expectation) | +/- 3 C | Offices, schools, residential |
| Category III (moderate expectation) | +/- 4 C | Temporary accommodation, storage |

### Overheating Risk Assessment

Overheating is an increasing concern, especially in well-insulated buildings with large glazing areas. Document your overheating prevention strategy:

- **External shading** — most effective; reduces solar gain before it enters the building
- **Glazing specification** — solar control glass (g-value below 0.35 for south/west facades)
- **Night ventilation** — purging heat from exposed thermal mass during cooler night hours
- **Thermal mass** — heavy internal elements (concrete, masonry) to absorb and release heat slowly
- **Orientation** — limit west-facing glazing; favour north-south building orientation

::: tip
WT 2021 does not set explicit overheating limits, but building certification systems (BREEAM, LEED) and the EPBD recast increasingly require overheating risk assessment. Document your strategy now to future-proof your design. Consider using [IoT temperature sensors](/en/bim-integration/sensors-iot) during operations to validate thermal comfort performance.
:::

## Acoustics

### Sound Insulation Requirements per WT 2021

WT 2021 defines acoustic requirements through reference to Polish standards (PN-B-02151 series). Requirements are expressed as sound classes and measured values.

| Parameter | Residential (between units) | Office (between rooms) | Classroom |
|---|---|---|---|
| Airborne sound insulation R'w | >= 50 dB | >= 45 dB | >= 50 dB |
| Impact sound level L'n,w | <= 58 dB | <= 58 dB | <= 55 dB |
| Facade sound insulation R'A,2 | Per noise zone | Per noise zone | Per noise zone |
| Reverberation time T (s) | -- | <= 0.8 s (open plan) | <= 0.6 s |
| Background noise LA,eq | <= 30 dB(A) night | <= 40 dB(A) | <= 35 dB(A) |

### Facade Acoustic Requirements

Facade acoustic insulation depends on the external noise level at the site. Document the noise zone classification from the local environmental noise map and calculate the required facade R'A,2:

| External Noise Level at Facade | Required Facade R'A,2 (residential) |
|---|---|
| <= 55 dB(A) | >= 20 dB |
| 56 - 60 dB(A) | >= 25 dB |
| 61 - 65 dB(A) | >= 30 dB |
| 66 - 70 dB(A) | >= 33 dB |
| 71 - 75 dB(A) | >= 35 dB |
| > 75 dB(A) | Site-specific assessment required |

### Acoustic Documentation

For each separating element, record in the Zone card:

- Required acoustic class or R'w value
- Wall or floor construction and calculated R'w
- Impact sound level L'n,w (for floors)
- Flanking transmission assessment for critical junctions
- Facade R'A,2 requirement and window acoustic rating

## How IEQ Maps to Space and Zone Documents

IEQ requirements are documented at two levels within the standard:

| Document Type | IEQ Data Recorded | Example |
|---|---|---|
| **Zone card** | Acoustic separation requirements between zones, ventilation system serving the zone, facade acoustic class, thermal zone definition | "Residential Zone A: R'w >= 50 dB party walls, balanced mechanical ventilation, facade R'A,2 >= 30 dB" |
| **Space card** | Room-level daylight factor, ventilation rate, temperature setpoint, background noise limit, window-to-floor ratio | "Bedroom 01: DF 1.5%, 40 m3/h supply, 20-26 C, <= 25 dB(A) night" |

::: info
Zone cards define the shared systems and boundaries. Space cards define the room-specific performance targets. Together they provide a complete IEQ specification that can be verified during construction and [operations](/en/operations/).
:::

## Comprehensive Requirements Table by Space Type

| Space Type | Daylight (min DF) | Ventilation (m3/h) | Temp. Range (C) | R'w (dB) | Max Background Noise dB(A) |
|---|---|---|---|---|---|
| Living room | 1.0% | 20/person | 20-26 | >= 50 | 35 |
| Bedroom | 0.5% | 20/person | 18-26 | >= 50 | 25 (night) |
| Kitchen | 1.0% | 50-70 | 18-26 | >= 50 | 40 |
| Bathroom | -- | 50 | 24-28 | >= 50 | 40 |
| Office | 2.0% | 30/person | 20-26 | >= 45 | 40 |
| Classroom | 2.0% | 20-30/person | 20-26 | >= 50 | 35 |
| Hospital ward | 1.0% | 40/person | 22-26 | >= 50 | 30 |
| Meeting room | 1.5% | 30/person | 20-26 | >= 45 | 35 |
| Corridor | -- | 2-3 ACH | 18-22 | >= 45 | 45 |
| Server room | -- | Per heat load | 18-27 | >= 45 | -- |

## IEQ Documentation Per Phase

| Phase | IEQ Documentation Tasks |
|---|---|
| [Concept](/en/phases/concept) | Define IEQ targets in project brief; preliminary orientation and massing analysis for daylight; identify site noise sources |
| [Schematic Design](/en/phases/schematic) | Initial daylight studies, ventilation concept (natural vs mechanical), acoustic zoning, preliminary thermal comfort strategy |
| [Design Development](/en/phases/design-development) | Daylight simulation (DF or CBDM), ventilation calculations with airflow rates, acoustic specifications for separating elements, thermal comfort and overheating analysis |
| [Construction Documents](/en/phases/construction-docs) | Detailed glazing specifications, ductwork and diffuser layout, acoustic construction details, shading device specifications, CO2 sensor locations |
| Construction | Airtightness testing, acoustic testing of separating elements (R'w and L'n,w), ventilation commissioning and balancing |
| [Handover](/en/phases/handover) | Test reports included in handover package, [sensor commissioning](/en/bim-integration/sensors-iot), occupant comfort guide, [maintenance schedules](/en/operations/maintenance) for ventilation filters |
| [Operations](/en/operations/) | Post-occupancy comfort surveys, indoor air quality monitoring via [IoT sensors](/en/bim-integration/sensors-iot), seasonal HVAC adjustments |

## IEQ Documentation Checklist

### Concept Phase
- [ ] IEQ targets defined in project brief (daylight, ventilation, thermal, acoustic)
- [ ] Site noise assessment obtained (environmental noise map or measurement)
- [ ] Building orientation assessed for daylight and solar gain
- [ ] Ventilation strategy decision: natural, mechanical, or hybrid

### Schematic Design Phase
- [ ] Preliminary daylight analysis (window-to-floor ratios for all habitable rooms)
- [ ] Ventilation concept documented with system type per zone
- [ ] Acoustic zoning plan showing required R'w and L'n,w at each boundary
- [ ] Thermal comfort strategy: conditioning type, setpoints, overheating approach

### Design Development Phase
- [ ] Daylight factor simulation completed for all habitable spaces
- [ ] Ventilation calculations with airflow rates per room documented in Space cards
- [ ] Acoustic specifications for all separating elements in Zone cards
- [ ] Overheating risk assessment completed (south and west facades)
- [ ] Glare analysis for critical spaces
- [ ] CO2 sensor locations defined

### Construction Documents Phase
- [ ] Window schedule includes acoustic rating, U-value, g-value, and light transmittance
- [ ] Ventilation system fully specified: ductwork, diffusers, controls, filter class
- [ ] Acoustic details drawn for all rated constructions (walls, floors, junctions)
- [ ] Shading device specifications finalised
- [ ] [Phase gate](/en/quality/phase-gates) review confirms IEQ compliance

### Handover and Operations
- [ ] Acoustic test results (R'w, L'n,w) meet specifications
- [ ] Ventilation system balanced and flow rates verified
- [ ] Airtightness test result documented
- [ ] [Sensors commissioned](/en/bim-integration/sensors-iot) (CO2, temperature, humidity)
- [ ] Occupant guide explains ventilation controls and thermal comfort
- [ ] [Maintenance schedule](/en/operations/maintenance) covers filter replacement, duct cleaning, sensor calibration

::: warning
IEQ parameters interact with each other and with energy performance. Large windows improve daylight but may cause overheating and acoustic weak points. Document trade-offs and design decisions explicitly. See [BIM Integration](/en/bim-integration/) for combining IEQ data with your building model.
:::
