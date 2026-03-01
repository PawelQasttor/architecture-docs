---
entityType: site_feature_type
id: SFT-PERMEABLE-PAVING
featureTypeName: "Permeable Block Paving"
featureCategory: hardscape
description: "Permeable interlocking concrete block paving for pedestrian and light vehicle areas. Allows rainwater infiltration, reducing surface runoff."

materials:
  - material: "Interlocking concrete blocks (80mm)"
    quantity: 1
    unit: "m2"
  - material: "Jointing aggregate (2-5mm gravel)"
    quantity: 0.01
    unit: "m3/m2"
  - material: "Bedding layer (grit 4-6mm)"
    quantity: 0.05
    unit: "m3/m2"
  - material: "Sub-base (MOT Type 3)"
    quantity: 0.25
    unit: "m3/m2"

manufacturer: "Semmelrock"
expectedLifeYears: 30

maintenanceRequirements:
  frequency: "annual"
  tasks:
    - "Inspect for settlement and heave"
    - "Re-level displaced blocks"
    - "Clean jointing aggregate"
    - "Check drainage outlets"
  seasonalTasks:
    - "Spring: clear winter debris, check for frost damage"
    - "Autumn: remove fallen leaves from joints"

sustainabilityMetrics:
  permeability: 0.85
  biodiversityValue: "low"
  heatIslandReduction: true

cost:
  totalCost: 65
  currency: "EUR"
  basis: "per_m2_installed"

ifcMapping:
  ifcEntity: IfcCivilElement
  globalId: "4xSFT-PERM-PAVE-001"

version: "1.0.0"
tags:
  - "paving"
  - "permeable"
  - "suds"
  - "hardscape"
---

# Site Feature Type: Permeable Block Paving

Interlocking concrete block paving designed for rainwater infiltration. Used for pedestrian paths and light vehicle areas at Green Terrace.

## Key Specifications

- **Material:** 80mm interlocking concrete blocks
- **Permeability:** 85% surface infiltration rate
- **Load class:** Pedestrian + light vehicles
- **Expected life:** 30 years
- **Manufacturer:** Semmelrock

## Sustainability

- Reduces surface runoff by 85%
- Contributes to heat island reduction
- Qualifies as SuDS feature under WT 2021
