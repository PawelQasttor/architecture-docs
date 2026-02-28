# Retrofit & Upgrades

Buildings require periodic upgrades to remain efficient, compliant, and fit for purpose. Retrofit planning draws on operational data -- energy records, maintenance logs, comfort complaints, and inspection reports -- to identify what needs improvement and justify the investment.

## When to Consider Retrofit

Retrofit is not only about fixing problems. It is a planned response to changing conditions:

- **Energy performance gaps** -- actual energy consumption significantly exceeds design predictions or regulatory benchmarks (see [Energy & Carbon](/en/sustainability/energy-carbon))
- **Changing regulations** -- new energy performance standards, fire safety requirements, or accessibility rules that the building does not meet (see [Regulations](/en/regulations/completion-occupancy))
- **Occupant complaints** -- persistent comfort issues (temperature, air quality, noise, lighting) that cannot be resolved through operational adjustments
- **Rising maintenance costs** -- when repair costs for ageing equipment approach or exceed replacement costs
- **End-of-life equipment** -- systems reaching the end of their expected service life
- **Change of use** -- building repurposing that requires different environmental conditions or services
- **Sustainability targets** -- organizational or regulatory commitments to reduce carbon emissions

::: info
Early indicators of retrofit need often appear in maintenance data. Track your maintenance costs per system over time -- a sharp upward trend is a reliable signal that replacement should be considered.
:::

## Performance Monitoring

Effective retrofit decisions depend on reliable baseline data. Monitor these metrics continuously or at regular intervals:

| Metric | Data Source | Review Frequency |
|---|---|---|
| Total energy consumption (kWh) | Utility meters, BMS | Monthly |
| Energy use intensity (kWh/m2/year) | Calculated from meter data and floor area | Annually |
| Heating/cooling degree days vs. consumption | Weather data + meter data | Seasonally |
| Comfort complaints by zone | Occupant feedback log | Monthly |
| Indoor air quality (CO2, humidity) | [IoT sensors](/en/bim-integration/sensors-iot) | Continuous |
| Maintenance cost per system | Maintenance records | Quarterly |
| Equipment downtime hours | Incident log (see [Incident Management](./incidents)) | Monthly |
| Water consumption | Utility meters | Monthly |

::: tip
Compare your building's energy use intensity (EUI) against published benchmarks for your building type and climate zone. In Poland, the energy performance certificate (*swiadectwo charakterystyki energetycznej*) provides a regulatory baseline.
:::

## Building Energy Audit

A building energy audit systematically evaluates how energy is used and identifies opportunities for savings.

### Audit Levels

| Level | Scope | Output |
|---|---|---|
| Walk-through audit | Visual inspection, review of utility bills, quick identification of waste | Priority list of low-cost measures |
| Standard audit | Detailed analysis of systems, sub-metering data, occupancy patterns | Quantified savings estimates, cost-benefit analysis |
| Investment-grade audit | Comprehensive modelling, monitoring, and measurement | Bankable feasibility study for financing |

### Polish Requirements

Under the Energy Efficiency Act (*Ustawa o efektywnosci energetycznej*), large enterprises in Poland must conduct energy audits every four years. Public buildings above 250 m2 require an energy performance certificate. The audit should reference the building's [as-built documentation](/en/phases/as-built) and current [System cards](/en/documentation/entities/system) for accurate assessment.

## Upgrade Feasibility: Cost-Benefit Analysis

Before committing to a retrofit, evaluate each intervention on three dimensions:

1. **Capital cost** -- total investment including design, procurement, installation, and disruption
2. **Operational savings** -- reduced energy, maintenance, and repair costs per year
3. **Non-financial benefits** -- improved comfort, regulatory compliance, increased asset value, reduced carbon emissions

### Payback Period Calculation

```
Simple payback (years) = Capital cost / Annual savings
```

::: warning
Simple payback does not account for the time value of money, energy price changes, or maintenance cost escalation. For major investments (over 100,000 PLN), use discounted cash flow analysis or net present value (NPV) to make a sound decision.
:::

## Common Retrofit Interventions

### Insulation Upgrade

- **Scope:** External wall insulation (ETICS), roof/attic insulation, floor insulation
- **Typical savings:** 20--40% reduction in heating demand
- **Considerations:** Moisture management, fire rating of insulation material, facade appearance, building permit requirements

### Window and Door Replacement

- **Scope:** Replace single or early double-glazed units with modern triple-glazed windows
- **Typical savings:** 10--25% reduction in heating demand
- **Considerations:** Frame material (PVC, aluminium, timber), U-value targets, acoustic performance, ventilation strategy

### HVAC Modernization

- **Scope:** Replace or upgrade heating plant, cooling systems, ventilation units, controls
- **Typical savings:** 15--35% reduction in HVAC energy use
- **Considerations:** Heat pump suitability, refrigerant regulations, ductwork condition, BMS integration

### LED Lighting Retrofit

- **Scope:** Replace fluorescent and halogen fixtures with LED, add occupancy and daylight sensors
- **Typical savings:** 40--60% reduction in lighting energy use
- **Considerations:** Colour temperature, dimming compatibility, emergency lighting compliance, control system

### Solar Panel Installation

- **Scope:** Rooftop or facade-mounted photovoltaic panels
- **Typical generation:** 100--150 kWh/m2/year (in Polish climate)
- **Considerations:** Roof structural capacity, orientation and shading, grid connection, net metering regulations

### Building Management System Upgrade

- **Scope:** Replace or extend BMS to cover all major systems with modern controls
- **Typical savings:** 10--20% reduction in overall energy use through better scheduling and optimization
- **Considerations:** Protocol compatibility, sensor coverage, integration with existing systems, cybersecurity

## Retrofit Interventions: Payback Comparison

| Intervention | Typical Capital Cost | Annual Savings | Simple Payback | Service Life |
|---|---|---|---|---|
| LED lighting | Low--Medium | High | 2--4 years | 15--20 years |
| BMS upgrade/optimization | Medium | Medium | 3--6 years | 10--15 years |
| Insulation (walls) | High | Medium--High | 8--15 years | 30--40 years |
| Window replacement | High | Medium | 10--18 years | 25--35 years |
| HVAC modernization | High | Medium--High | 7--14 years | 15--25 years |
| Solar PV | Medium--High | Medium | 8--12 years | 25--30 years |
| Heat pump (replacing gas boiler) | High | Medium | 8--14 years | 15--20 years |

::: tip
Start with quick-win measures (LED lighting, BMS optimization) to generate savings that can fund longer-payback interventions. This staged approach reduces financial risk and demonstrates results to stakeholders.
:::

## Decision Framework: Repair vs. Replace vs. Upgrade

When equipment fails or performance drops, use this framework to choose the right response:

| Factor | Repair | Replace (Like-for-Like) | Upgrade (Improved Spec) |
|---|---|---|---|
| Equipment age vs. expected life | Less than 60% of life used | Over 75% of life used | Over 60% of life used |
| Repair cost vs. replacement cost | Repair below 40% of replacement | Repair exceeds 50% of replacement | Any |
| Failure frequency | First or second occurrence | Third or more occurrence | Recurring pattern |
| Regulatory compliance | Current spec meets regulations | Current spec meets regulations | Current spec does not meet regulations |
| Energy performance | Acceptable | Acceptable | Below current standards |
| Parts availability | Readily available | Becoming scarce | Obsolete or discontinued |
| Recommended action | Repair and continue monitoring | Replace with equivalent | Upgrade to current standard |

### Decision Process

1. **Gather data** -- review the [Asset Instance card](/en/documentation/entities/asset) for age, maintenance history, and condition.
2. **Assess costs** -- compare repair estimate against replacement and upgrade options.
3. **Check compliance** -- verify whether current regulations require a higher specification (see [Regulations](/en/regulations/completion-occupancy)).
4. **Evaluate synergies** -- determine whether upgrading one component enables savings elsewhere (e.g., a more efficient boiler may allow smaller radiators).
5. **Document the decision** -- record the analysis and chosen path in the system or asset documentation.

## Retrofit Documentation

When a retrofit is carried out, the documentation must be updated to reflect the new state of the building:

| Action | Documentation Update |
|---|---|
| Equipment replaced | Create new [Asset Instance card](/en/documentation/entities/asset), archive old card with end-of-service date |
| System modified | Update [System card](/en/documentation/entities/system) with revised configuration, performance targets |
| Building fabric changed | Update [as-built drawings](/en/phases/as-built), revise U-values and thermal models |
| New technology added | Create new asset/system cards, update [BIM model](/en/bim-integration/) if applicable |
| Energy performance changed | Update energy baseline in [sustainability records](/en/sustainability/) |
| Regulatory compliance achieved | Record certification or compliance evidence |

::: warning
After any retrofit, reset the maintenance schedules for affected equipment and systems. New equipment has different service intervals, warranty terms, and operational parameters. Carry forward the old maintenance history in an archived record, but start fresh schedules for the new installations.
:::

## Linking Retrofit to the Documentation Lifecycle

Retrofit closes the loop in the building documentation lifecycle:

1. **[Construction](/en/phases/construction)** created the original asset and system records.
2. **[Handover](/en/phases/handover)** delivered those records to the operations team.
3. **[Maintenance](./maintenance)** and **[incident data](./incidents)** reveal where performance has degraded.
4. **Retrofit** restores or improves performance and generates updated documentation.
5. The cycle begins again with new baseline records for the next operational period.

This feedback loop ensures that building documentation remains a living record that reflects the actual state of the building throughout its entire service life.
