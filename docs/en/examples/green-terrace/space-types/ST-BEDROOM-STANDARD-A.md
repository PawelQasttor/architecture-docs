---
documentType: space_type
entityType: space_type
id: ST-BEDROOM-STANDARD-A
typeName: "Standard Bedroom Type A"
description: "Standard bedroom layout for Green Terrace residential units - 15m² single occupancy with ensuite bathroom access"
spaceType: bedroom

# Geometric Properties
areaProfile:
  minArea: 14.0
  targetArea: 15.0
  maxArea: 16.0
  unit: m²

dimensionProfile:
  minWidth: 3.0
  targetWidth: 3.5
  minLength: 4.0
  targetLength: 4.5
  ceilingHeight: 2.70
  unit: m

# Occupancy Profile
occupancyProfile:
  maxOccupants: 1
  bedCount: 1
  occupancyType: permanent_residential
  accessibilityLevel: standard

# Environmental Conditions
environmentalConditions:
  temperature:
    heating: 20.0
    cooling: 26.0
    unit: celsius
  humidity:
    min: 30
    max: 60
    unit: percent
  ventilation:
    type: mechanical_balanced
    rate: 30.0
    unit: m³/h/person
  pressurization: neutral
  cleanlinessClass: standard

# Finishes Specification
finishes:
  floor:
    material: engineered_wood
    fireClass: Cfl-s1
    finish: matte_lacquer
    color: natural_oak

  walls:
    material: gypsum_board
    fireClass: A2-s1,d0
    finish: paint
    color: white_9010

  ceiling:
    material: gypsum_board
    fireClass: A2-s1,d0
    finish: paint
    color: white_9010

# Equipment & Fixtures
typicalEquipment:
  - type: radiator
    model: "Panel Radiator Type 22"
    power: 1200
    unit: W
    quantity: 1

  - type: supply_diffuser
    model: "Circular Ceiling Diffuser Ø125"
    airflow: 30
    unit: m³/h
    quantity: 1

  - type: extract_grille
    model: "Door Transfer Grille"
    airflow: 15
    unit: m³/h
    quantity: 1

  - type: lighting
    model: "LED Downlight 12W 3000K"
    power: 12
    unit: W
    quantity: 2

# Requirements Template
requirementTemplate:
  - id: REQ-BEDROOM-MIN-AREA
    name: "Minimum Bedroom Area"
    jurisdiction: poland
    source: "WT 2021 § 76"
    metric: area
    operator: ">="
    value: 9.0
    unit: m²

  - id: REQ-BEDROOM-MIN-HEIGHT
    name: "Minimum Room Height"
    jurisdiction: poland
    source: "WT 2021 § 132"
    metric: ceilingHeight
    operator: ">="
    value: 2.50
    unit: m

  - id: REQ-BEDROOM-DAYLIGHT
    name: "Daylight Factor"
    jurisdiction: poland
    source: "WT 2021 § 57"
    metric: daylightFactor
    operator: ">="
    value: 2.0
    unit: percent

  - id: REQ-BEDROOM-VENTILATION
    name: "Ventilation Rate"
    jurisdiction: poland
    source: "WT 2021 § 152"
    metric: ventilationRate
    operator: ">="
    value: 30.0
    unit: m³/h

# Electrical Safety
electricalSafetyGroup: standard

# Regulatory References
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 76"
    description: "Minimum bedroom area requirements"
    status: compliant

  - code: "WT 2021"
    section: "§ 132"
    description: "Minimum ceiling height for habitable rooms"
    status: compliant

# Cost Estimation
costProfile:
  perSquareMeter:
    finishes: 180
    equipment: 120
    mep: 200
    total: 500
  currency: EUR

# Performance Targets
performanceTargets:
  thermal:
    target: "Operative temperature 20-26°C"
    priority: high

  acoustic:
    target: "Airborne sound insulation ≥52 dB (between units)"
    priority: high

  iaq:
    target: "CO₂ < 1000 ppm during occupancy"
    priority: medium

  daylightFactor:
    target: "DF ≥ 2.0% at task plane"
    priority: high

# BIM Integration
bimIntegration:
  revitFamily: "Green-Terrace-Bedroom-Type-A"
  revitCategory: Rooms

  spacePlanning:
    clearZone: 10.5  # m² clear circulation
    furnitureLayout: "single_bed_desk_wardrobe"

  ids:
    requirements:
      - "Thermal comfort requirements"
      - "Acoustic isolation requirements"
      - "Daylight requirements"

# Usage Notes
notes: |
  Standard bedroom type used in Green Terrace residential project.
  Designed for single occupancy with compact ensuite bathroom.
  Meets Polish WT 2021 requirements for habitable rooms.

  Typical layout:
  - Single bed (0.9×2.0m) along long wall
  - Desk/workspace near window
  - Built-in wardrobe
  - Door to ensuite bathroom

  All instances inherit these specifications and can override specific
  properties as needed (e.g., finishes for accessible units).

createdBy: "Green Terrace Design Team"
lastModified: "2026-02-27"
version: "1.0.0"
---

# Standard Bedroom Type A

This space type defines the standard bedroom layout used throughout the Green Terrace residential project. All bedroom instances reference this type template and inherit its specifications unless explicitly overridden.
