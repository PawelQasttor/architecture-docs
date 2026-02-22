---
title: Energy & Carbon
description: Energy performance documentation, EP indicator, U-value requirements, embodied carbon assessment, and LCA guidance for building projects.
---

# Energy & Carbon

Energy and carbon documentation covers two distinct but related areas: **operational energy** (how much energy a building uses during its lifetime) and **embodied carbon** (the carbon emissions associated with materials, construction, and demolition). Both must be addressed in modern building documentation.

## Operational Energy: The EP Indicator

In Poland, the primary measure of building energy performance is the **EP indicator** — expressed in kWh per square metre of usable area per year (kWh/m2 per year). It combines:

- **EP_H+W** — energy for heating and domestic hot water
- **EP_C** — energy for cooling
- **EP_L** — energy for lighting (non-residential buildings only)

The EP indicator is calculated according to the methodology in the Regulation on the energy performance of buildings (Rozporzadzenie w sprawie metodologii wyznaczania charakterystyki energetycznej budynku) and forms the basis for the energy certificate.

::: info
The EP indicator uses **primary energy**, not delivered energy. This means the energy source matters: a heat pump using grid electricity has a different primary energy factor than a gas boiler. Primary energy factors are defined in the regulation and updated periodically.
:::

### EP Thresholds per WT 2021

| Building Type | EP_H+W Max (kWh/m2 per year) | Notes |
|---|---|---|
| Single-family residential | 70 | Including domestic hot water |
| Multi-family residential | 65 | Including domestic hot water |
| Office building | 65 | Excluding lighting |
| Educational facility | 80 | Including ventilation energy |
| Healthcare facility | 290 | Higher due to 24h operation |
| Warehouse / industrial | 70 | Heated spaces only |

For the complete set of thresholds, see the [WT 2021 reference](/en/regulations/wt-2021).

## U-Value Requirements

The thermal transmittance coefficient (U-value) defines how much heat passes through a building element. Lower values indicate better insulation. [WT 2021](/en/regulations/wt-2021) sets maximum U-values for all envelope elements.

### Maximum U-Values (WT 2021, current)

| Building Element | U-max (W/m2K) | Practical Target | Documentation Location |
|---|---|---|---|
| External wall | 0.20 | 0.15 - 0.18 | Envelope specification, Zone cards |
| Roof / flat roof | 0.15 | 0.10 - 0.13 | Envelope specification, Zone cards |
| Floor on ground | 0.30 | 0.20 - 0.25 | Envelope specification |
| Windows | 0.90 | 0.70 - 0.80 | Window schedule, Space cards |
| Roof windows | 1.10 | 0.90 - 1.00 | Window schedule |
| External doors | 1.30 | 1.00 - 1.10 | Door schedule |

::: tip
The "Practical Target" column shows values typically needed to meet the overall EP indicator comfortably. Designing exactly to the U-max limit leaves no margin for thermal bridges or construction tolerances.
:::

### Documenting U-Values

For each envelope element, document:

1. **Layer composition** — material, thickness, thermal conductivity (lambda)
2. **Calculated U-value** — according to PN-EN ISO 6946
3. **Thermal bridge assessment** — linear thermal transmittance (psi values)
4. **Condensation check** — temperature factor at internal surface (fRsi)

## Nearly Zero Energy Buildings (nZEB)

Polish regulations already require all new buildings to meet nZEB standards (budynek o niskim zuzyciu energii). Key nZEB characteristics:

- EP indicator at or below the WT 2021 thresholds listed above
- High-performance envelope with U-values meeting current limits
- Efficient heating and cooling systems
- A share of energy from renewable sources (on-site or nearby)

::: warning
The EPBD recast will replace nZEB with a zero-emission building (ZEB) standard for new public buildings from 2028 and all new buildings from 2030. ZEB goes beyond nZEB by requiring zero on-site fossil fuel emissions. Begin planning for ZEB compliance now — document your renewable energy strategy and fossil fuel elimination pathway starting at the [concept phase](/en/phases/concept).
:::

### Passive Design Strategies That Affect Documentation

Passive strategies reduce energy demand before active systems are sized. These decisions are made early and must be documented because they directly influence EP calculations:

| Strategy | Documentation Impact | Phase |
|---|---|---|
| Building orientation | Solar gain calculations, window schedule annotations | [Concept](/en/phases/concept) |
| Compact form factor | Surface-to-volume ratio in energy model inputs | [Concept](/en/phases/concept) |
| High-performance insulation | Wall, roof, and floor U-value specifications | [Schematic](/en/phases/schematic) |
| Triple-glazed windows | Window schedule U-values, g-values, frame factors | [Design Development](/en/phases/design-development) |
| Thermal mass utilisation | Material specifications, night ventilation strategy | [Design Development](/en/phases/design-development) |
| Airtightness | Target n50 value, airtightness test protocol | [Construction Documents](/en/phases/construction-docs) |
| Solar shading | Shading device specifications, solar gain calculations | [Design Development](/en/phases/design-development) |

## Energy Performance Certificate

Every new building in Poland requires an energy performance certificate (swiadectwo charakterystyki energetycznej) before occupancy. The process:

1. **Design stage** — architect calculates preliminary EP based on design documentation
2. **Construction** — contractor builds according to specification; any changes affecting energy performance must be documented
3. **Completion** — qualified energy assessor prepares the certificate based on as-built conditions
4. **Registration** — certificate is registered in the central register (centralny rejestr)
5. **Handover** — certificate is included in the [handover package](/en/phases/handover)

::: warning
The energy certificate must reflect the **as-built** condition, not just the design intent. If materials or systems changed during construction, the certificate must be updated accordingly. Track changes through the [construction documents](/en/phases/construction-docs) phase.
:::

## Embodied Carbon

Embodied carbon accounts for all greenhouse gas emissions from:

- Raw material extraction
- Manufacturing and transport
- Construction processes
- Maintenance and replacement over building lifetime
- End-of-life demolition and disposal

### Why It Matters

As operational energy decreases (through better insulation, efficient systems, and renewable sources), embodied carbon becomes a larger share of a building's total lifecycle emissions — often 30-50% for new energy-efficient buildings. The EU Taxonomy and upcoming EPBD requirements will increasingly require whole-life carbon assessment.

### Lifecycle Assessment (LCA) Basics

LCA follows the EN 15978 standard, which defines lifecycle stages:

| Stage | Code | Description | Architect's Role |
|---|---|---|---|
| Product | A1-A3 | Raw material supply, transport, manufacturing | Specify low-carbon materials |
| Construction | A4-A5 | Transport to site, construction/installation | Coordinate with contractor |
| Use | B1-B7 | Use, maintenance, repair, replacement, energy | Specify durable materials, efficient systems |
| End of life | C1-C4 | Demolition, transport, waste processing, disposal | Design for disassembly |
| Beyond lifecycle | D | Reuse, recovery, recycling potential | Document recyclability |

### Material Choices and Carbon Impact

| Material | Typical Embodied Carbon (kgCO2e/kg) | Low-Carbon Alternative |
|---|---|---|
| Concrete (standard) | 0.10 - 0.15 | Low-clinker concrete, geopolymer |
| Steel (virgin) | 1.50 - 2.00 | Recycled steel (0.40 - 0.80) |
| Aluminium (virgin) | 8.00 - 12.00 | Recycled aluminium (0.50 - 1.50) |
| Brick (fired clay) | 0.20 - 0.30 | Unfired earth blocks, timber |
| Timber (softwood) | -1.00 to -0.50 | Carbon-storing; prefer certified sources |
| Insulation (EPS) | 3.00 - 4.00 | Mineral wool (1.00), cellulose (0.10) |

::: info
Timber stores carbon during its growth phase, which is why its embodied carbon value can be negative. However, this benefit only counts if the timber comes from sustainably managed forests and remains in use long-term.
:::

## Documenting Energy Targets in YAML Frontmatter

Use the project's YAML frontmatter to record energy and carbon targets for each building or zone. This ensures targets are machine-readable and can be tracked across phases.

```yaml
sustainability:
  energy:
    ep_target: 55           # kWh/m2 per year — design target
    ep_regulatory_max: 70   # kWh/m2 per year — WT 2021 limit
    ep_h_w: null            # calculated value — populated after energy modelling
    ep_c: null              # calculated value
    ep_l: null              # calculated value (non-residential)
    energy_source: "heat pump + PV"
    renewable_share: 40     # percentage
  envelope:
    wall_u: 0.18            # W/m2K
    roof_u: 0.12            # W/m2K
    floor_u: 0.22           # W/m2K
    window_u: 0.80          # W/m2K
    window_g: 0.50          # solar heat gain coefficient
    airtightness_n50: 1.5   # 1/h — target at 50 Pa
  carbon:
    lca_scope: "A1-A3"      # stages assessed
    embodied_target: 500    # kgCO2e/m2 GFA
    assessment_tool: "One Click LCA"
```

::: tip
Update these values at each design phase. The concept-phase values are estimates; the [schematic design](/en/phases/schematic) values should be based on preliminary calculations; [design development](/en/phases/design-development) values on detailed modelling. See [BIM Integration](/en/bim-integration/) for linking these targets to your model.
:::

## Key Energy Parameters: Where They Appear in Documentation

| Parameter | YAML Field | Document Type | Phase First Set |
|---|---|---|---|
| EP target | `sustainability.energy.ep_target` | Project / Building | [Concept](/en/phases/concept) |
| EP regulatory max | `sustainability.energy.ep_regulatory_max` | Project / Building | [Concept](/en/phases/concept) |
| Wall U-value | `sustainability.envelope.wall_u` | Zone card | [Schematic](/en/phases/schematic) |
| Roof U-value | `sustainability.envelope.roof_u` | Zone card | [Schematic](/en/phases/schematic) |
| Window U-value | `sustainability.envelope.window_u` | Space card / Window schedule | [Design Development](/en/phases/design-development) |
| Airtightness target | `sustainability.envelope.airtightness_n50` | Building document | [Design Development](/en/phases/design-development) |
| LCA scope | `sustainability.carbon.lca_scope` | Project / Building | [Concept](/en/phases/concept) |
| Embodied carbon target | `sustainability.carbon.embodied_target` | Project / Building | [Concept](/en/phases/concept) |
| Renewable share | `sustainability.energy.renewable_share` | Building / System card | [Schematic](/en/phases/schematic) |

## Phase-by-Phase Energy Impact

| Phase | Key Decisions | Impact on EP |
|---|---|---|
| [Concept](/en/phases/concept) | Building orientation, form factor (compactness), glazing ratio | 30-40% of final EP determined |
| [Schematic Design](/en/phases/schematic) | Envelope concept, system strategy, renewable energy approach | 20-30% of final EP determined |
| [Design Development](/en/phases/design-development) | Envelope specification, HVAC system selection, renewable energy sources | 20-30% of final EP determined |
| [Construction Documents](/en/phases/construction-docs) | Detailed thermal bridge analysis, airtightness specification, lighting design | 10-20% refinement |
| Construction | Quality of insulation installation, airtightness execution, commissioning | Determines gap between design and actual performance |
| [Handover](/en/phases/handover) | Energy certificate, sensor commissioning, O&M manuals | Baseline for operational monitoring |
| [Operations](/en/operations/) | Building management settings, occupant behaviour, [maintenance](/en/operations/maintenance) | Ongoing optimisation |

## Energy Documentation Checklist

### Concept Phase
- [ ] EP target established and recorded in YAML frontmatter
- [ ] Site orientation and solar access analysed
- [ ] Building form factor (compactness) evaluated
- [ ] Preliminary glazing ratio strategy defined
- [ ] LCA scope and embodied carbon target set

### Schematic Design Phase
- [ ] U-values for all envelope elements specified
- [ ] Heating and cooling system concept selected
- [ ] Preliminary energy model created
- [ ] Renewable energy strategy defined (PV, heat pump, etc.)
- [ ] Preliminary material choices assessed for embodied carbon

### Design Development Phase
- [ ] Detailed energy model completed with validated EP calculation
- [ ] Thermal bridge catalogue prepared
- [ ] Window schedule with U-values, g-values, and frame factors
- [ ] HVAC system specified with efficiency ratings
- [ ] Airtightness target set and testing protocol defined
- [ ] Environmental Product Declarations (EPDs) requested from suppliers

### Construction Documents Phase
- [ ] Full thermal bridge details drawn and psi values calculated
- [ ] Airtightness strategy documented (critical junctions, materials, testing plan)
- [ ] Energy certificate input data package prepared
- [ ] Material specifications include embodied carbon data
- [ ] [Quality gate](/en/quality/phase-gates) review confirms EP compliance

### Construction and Handover
- [ ] Airtightness test completed and results documented
- [ ] As-built U-values verified against design
- [ ] Energy certificate issued and registered
- [ ] [Sensor and monitoring systems](/en/bim-integration/sensors-iot) commissioned
- [ ] Energy monitoring baseline established — see [Operations](/en/operations/)
- [ ] [Handover package](/en/phases/handover) includes energy certificate, monitoring access, and maintenance schedules

## Practical Recommendations

1. **Set targets early** — define EP and embodied carbon targets in the project brief at the [concept phase](/en/phases/concept).
2. **Calculate, do not guess** — use energy modelling software from [schematic design](/en/phases/schematic) onward.
3. **Consider the whole envelope** — thermal bridges can add 10-30% to calculated heat loss if not addressed.
4. **Request EPDs** — ask suppliers for Environmental Product Declarations to support your LCA.
5. **Track changes** — document any specification change that affects energy or carbon performance through [phase gate reviews](/en/quality/phase-gates).
6. **Prepare for the certificate** — coordinate with the energy assessor before construction completion.
7. **Plan for operations** — define the monitoring strategy during design so [sensors and IoT systems](/en/bim-integration/sensors-iot) are included in the construction scope.

::: warning
Do not rely solely on U-value compliance. A building can meet all individual U-value limits and still fail the overall EP indicator if the form factor is unfavourable or if thermal bridges are excessive.
:::
