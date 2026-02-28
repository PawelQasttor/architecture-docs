# Building Operations

A building's operational phase accounts for the vast majority of its lifecycle. While design and construction typically span 2--5 years, the operational life of a building runs 30--60 years or more. Documentation created during design and construction only delivers value if it remains accurate, accessible, and useful throughout those decades of daily operation.

This section covers the three core areas of operational documentation:

- [Maintenance Planning](./maintenance) -- preventive schedules, service records, and the building logbook
- [Incident Management](./incidents) -- fault tracking, root cause analysis, and corrective actions
- [Retrofit & Upgrades](./retrofit) -- performance monitoring, energy audits, and modernization planning

## Why Operational Documentation Matters

Poor operational documentation leads to measurable consequences:

- **Increased maintenance costs** -- without service histories, technicians repeat diagnostics and replace parts unnecessarily.
- **Shortened equipment life** -- missed preventive maintenance accelerates wear and leads to premature failure.
- **Regulatory non-compliance** -- missing inspection records can result in fines or occupancy restrictions.
- **Knowledge loss** -- when facility staff change, undocumented building knowledge disappears with them.

::: tip
The cost of maintaining documentation is small compared to the cost of a single major equipment failure caused by missing service records. Budget 2--4 hours per month for documentation upkeep in a typical commercial building.
:::

## Post-Occupancy Evaluation (POE)

Post-occupancy evaluation is a structured assessment of how a building performs once it is occupied and in regular use. It compares actual performance against design intent.

### When to Conduct a POE

| Timing | Purpose |
|---|---|
| 3--6 months after occupancy | Identify commissioning issues, calibrate systems, gather early occupant feedback |
| 12 months after occupancy | Full seasonal cycle review: energy use, comfort, system performance |
| 3--5 years after occupancy | Medium-term review: maintenance trends, space utilization, operational costs |
| Before major retrofit | Baseline assessment to justify and scope planned upgrades |

### What to Measure

- **Energy performance** -- actual consumption vs. design predictions (see [Energy & Carbon](/en/sustainability/energy-carbon))
- **Thermal comfort** -- temperature, humidity, and draught complaints by zone
- **Indoor air quality** -- CO2 levels, ventilation rates, occupant satisfaction
- **Lighting quality** -- illuminance levels, glare, daylight factor
- **Acoustic performance** -- background noise, speech privacy, reverberation
- **Space utilization** -- occupancy patterns, underused areas, overcrowding
- **Maintenance burden** -- frequency and cost of repairs by system

::: info
POE results should be recorded in the project documentation and linked to relevant [System cards](/en/documentation/entities/system). This creates a feedback loop between operational reality and design assumptions.
:::

## How the Documentation Standard Supports Operations

This standard provides structured formats for capturing operational data:

- **[Asset Instance cards](/en/documentation/entities/asset)** -- store warranty dates, service intervals, manufacturer contacts, and maintenance history for individual pieces of equipment.
- **[System cards](/en/documentation/entities/system)** -- document how systems (HVAC, electrical, plumbing) are configured, how they should perform, and what maintenance they require.
- **YAML metadata** -- machine-readable fields for warranty expiry, next service date, and condition status enable automated alerts and reporting.
- **[As-built documentation](/en/phases/as-built)** -- provides the baseline reference for all operational activities.

::: warning
Operational documentation is only useful if it is kept current. Assign clear responsibility for documentation updates as part of every maintenance, repair, and modification activity.
:::

## Operations Documentation by Lifecycle Stage

| Lifecycle Stage | Documentation Activity | Key Outputs |
|---|---|---|
| [Handover](/en/phases/handover) | Verify completeness of O&M manuals, warranties, training records | Handover checklist, defects list |
| First year of operation | Commission seasonal systems, conduct initial POE, establish maintenance schedules | POE report, maintenance calendar |
| Ongoing operations | Record maintenance activities, track incidents, update asset condition | Service logs, incident reports |
| Periodic reviews (3--5 years) | Reassess maintenance strategy, conduct energy audits, review system performance | Audit reports, updated schedules |
| Pre-retrofit assessment | Document current state, identify performance gaps, evaluate upgrade options | Condition survey, feasibility study |
| Post-retrofit | Update as-built records, reset maintenance schedules, conduct new POE | Revised asset/system cards |

## Integration with BIM and IoT

When a building uses BIM models for facility management, operational data should feed back into the model. See [BIM Integration](/en/bim-integration/) for guidance on linking documentation to model elements, and [Sensors & IoT](/en/bim-integration/sensors-iot) for connecting live sensor data to asset and system records.

## Regulatory Context

Building operations are subject to periodic inspection and compliance requirements. The [Completion & Occupancy](/en/regulations/completion-occupancy) section covers the regulatory obligations that apply once a building is in use, including mandatory inspections and the building logbook (KOB).

## Quick Reference: Key Templates

| Template | Purpose |
|---|---|
| [Asset Template](/en/templates/asset-template) | Record equipment details, warranty, and maintenance data |
| [System Template](/en/templates/system-template) | Document system configuration, performance targets, and service requirements |

## Getting Started

1. Verify that [handover documentation](/en/phases/handover) is complete and all O&M manuals are available.
2. Set up the maintenance calendar using the guidance in [Maintenance Planning](./maintenance).
3. Establish an incident reporting workflow as described in [Incident Management](./incidents).
4. Schedule the first post-occupancy evaluation for 3--6 months after occupancy.
5. Review the [Retrofit & Upgrades](./retrofit) section when planning any building modifications.
