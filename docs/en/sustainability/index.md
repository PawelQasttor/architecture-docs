---
title: Sustainability
description: Sustainable building documentation — energy, carbon, indoor quality, and water management guidance for architects.
---

# Sustainability

Sustainable design is no longer optional. European and Polish regulations require architects to document energy performance, carbon impact, indoor environment quality, and water management at every project phase. This section provides practical guidance for meeting those requirements within the documentation standard.

## Why Sustainability Matters in Building Documentation

Buildings account for roughly 40% of energy consumption and 36% of CO2 emissions in the EU. Regulatory pressure, client expectations, and financing conditions now demand that sustainability is embedded in project documentation from day one.

Good sustainability documentation:

- Proves regulatory compliance at permit stage
- Supports energy certificate applications
- Provides a baseline for post-occupancy evaluation
- Satisfies investor and lender ESG requirements
- Enables future renovation planning
- Feeds operational data into [maintenance planning](/en/operations/maintenance)

::: tip
Start sustainability documentation at the [concept phase](/en/phases/concept). Early decisions on orientation, massing, and envelope have the greatest impact on energy performance. Gate reviews at each stage should verify sustainability targets — see [Phase Gates](/en/quality/phase-gates).
:::

## European Regulatory Framework

| Regulation | Scope | Key Requirement |
|---|---|---|
| EPBD (Energy Performance of Buildings Directive) | All EU member states | Nearly zero-energy buildings (nZEB) standard for all new buildings |
| EPBD recast | New buildings from 2028/2030 | Zero-emission building (ZEB) targets |
| EU Taxonomy Regulation | Projects seeking green financing | Technical screening criteria for climate change mitigation |
| Energy Efficiency Directive (EED) | Public and large commercial buildings | Long-term renovation strategies, energy audits |
| Construction Products Regulation (CPR) | Building materials | Environmental product declarations (EPDs) |

::: info
The EPBD recast introduces zero-emission building (ZEB) targets starting from 2028 for public buildings and 2030 for all new buildings. Document your compliance pathway early and track it through [phase gate reviews](/en/quality/phase-gates).
:::

## Polish Regulatory Context

Polish sustainability requirements are primarily defined in:

- **Warunki Techniczne (WT 2021)** — sets U-value limits, EP indicator thresholds, daylight requirements, ventilation standards, and acoustic classes. See the [full WT 2021 reference](/en/regulations/wt-2021).
- **Ustawa o charakterystyce energetycznej budynkow** — governs energy performance certificates.
- **Prawo wodne** — defines rainwater retention and drainage requirements.
- **Ustawa o efektywnosci energetycznej** — applies to public sector and large enterprises.

These regulations translate EU directives into specific Polish thresholds. The WT 2021 values are referenced throughout this section.

## How Sustainability Integrates with the Documentation Standard

Sustainability data is embedded in the documentation standard through YAML frontmatter on project, building, zone, and space documents. This makes targets and performance values machine-readable, trackable across phases, and exportable for reporting.

```yaml
sustainability:
  energy:
    ep_target: 55            # kWh/m2 per year — design target
    ep_regulatory_max: 70    # kWh/m2 per year — WT 2021 limit
  envelope:
    wall_u: 0.18             # W/m2K
    roof_u: 0.12             # W/m2K
    window_u: 0.80           # W/m2K
  water:
    retention_volume: 45     # m3
    permeable_ratio: 0.40    # fraction of plot area
  ieq:
    ventilation_type: "balanced_mechanical"
    daylight_target: "DF 2.0%"
```

These fields are populated progressively: estimates at [concept](/en/phases/concept), refined during [schematic design](/en/phases/schematic) and [design development](/en/phases/design-development), finalised in [construction documents](/en/phases/construction-docs), and verified at [handover](/en/phases/handover).

## Three Focus Areas

This section is organised around three interconnected topics:

### 1. Energy & Carbon

Energy performance targets, U-value requirements, the EP indicator, energy certificates, embodied carbon, and lifecycle assessment basics.

**Key question:** How much energy will this building consume, and how much carbon is embedded in its materials?

[Read more: Energy & Carbon](./energy-carbon)

### 2. Indoor Environment Quality

Daylight access, ventilation rates, thermal comfort, and acoustic performance — all with reference to WT 2021 requirements.

**Key question:** Will occupants be comfortable, healthy, and productive?

[Read more: Indoor Environment Quality](./indoor-quality)

### 3. Water Management

Rainwater retention, permeable surfaces, green infrastructure, water-efficient fixtures, and greywater recycling.

**Key question:** How does this project manage water responsibly?

[Read more: Water Management](./water)

## Sustainability Across Project Phases

| Phase | Sustainability Actions | Documentation Output |
|---|---|---|
| [Concept](/en/phases/concept) | Site analysis, orientation study, massing options, preliminary energy targets | Sustainability brief, preliminary EP estimate |
| [Schematic Design](/en/phases/schematic) | Envelope strategy, system concepts, daylight studies, water strategy outline | Updated YAML targets, initial energy model, daylight analysis |
| [Design Development](/en/phases/design-development) | Envelope specification, system selection, daylight simulation, water retention sizing | Energy model, material schedule with EPDs, IEQ analysis reports |
| [Construction Documents](/en/phases/construction-docs) | Detailed specifications, thermal bridge catalogue, acoustic details, fixture schedules | Complete specifications, energy certificate input data, retention calculations |
| Construction | Material verification, airtightness testing, acoustic testing, commissioning | Test reports, as-built energy model, energy certificate |
| [Handover](/en/phases/handover) | Energy certificate, O&M manuals, monitoring setup, occupant guides | Completed energy certificate, sensor commissioning report, maintenance schedule |
| [Operations](/en/operations/) | Post-occupancy evaluation, energy monitoring, maintenance | Monitoring reports, performance benchmarks |

::: warning
Each phase gate should verify that sustainability targets remain on track. Changes to orientation, envelope, or systems after concept phase can have significant knock-on effects on EP compliance. See [Phase Gates](/en/quality/phase-gates) for gate review criteria.
:::

## Integrating Sustainability with BIM

Building Information Modelling provides a natural platform for sustainability data. Material properties, thermal values, and environmental data can be embedded directly in the model.

See [BIM Integration](/en/bim-integration/) for guidance on:

- Embedding U-values and thermal properties in BIM objects
- Running energy simulations from BIM models
- Tracking embodied carbon through material schedules
- Generating sustainability reports from model data
- Connecting to [IoT sensors](/en/bim-integration/sensors-iot) for post-occupancy performance validation

## Documentation Checklist

Use this checklist to verify sustainability documentation completeness at project level:

- [ ] Energy performance targets defined (EP indicator) in YAML frontmatter
- [ ] U-values specified for all envelope elements
- [ ] Energy certificate application prepared
- [ ] Daylight analysis completed for habitable rooms
- [ ] Ventilation strategy documented with flow rates
- [ ] Acoustic requirements defined per room type
- [ ] Rainwater retention strategy and calculations included
- [ ] Water-efficient fixtures specified in schedules
- [ ] Material choices documented with environmental data (EPDs)
- [ ] Post-occupancy monitoring plan outlined — see [Operations](/en/operations/) and [Sensors & IoT](/en/bim-integration/sensors-iot)
- [ ] Phase gate sustainability criteria met — see [Phase Gates](/en/quality/phase-gates)

## Quick Reference: Key Polish Thresholds (WT 2021)

| Parameter | Residential | Office | Education |
|---|---|---|---|
| EP indicator (kWh/m2 per year) | 70 | 65 | 80 |
| External wall U-value (W/m2K) | 0.20 | 0.20 | 0.20 |
| Roof U-value (W/m2K) | 0.15 | 0.15 | 0.15 |
| Window U-value (W/m2K) | 0.90 | 0.90 | 0.90 |
| Daylight — window-to-floor ratio | 1:8 | 1:8 | 1:8 |

For full WT 2021 requirements, see the [WT 2021 reference page](/en/regulations/wt-2021).

::: tip
These thresholds represent minimum requirements. Many investors and certification systems (BREEAM, LEED, HQE) demand values 20-40% better than regulatory minimums. Set your project targets accordingly during the [concept phase](/en/phases/concept).
:::
