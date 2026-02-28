---
entityType: requirement
id: REQ-LEVEL-ACOUSTIC-B
requirementName: "Acoustic Performance - Class B"
description: "Enhanced acoustic insulation requirements for residential spaces on Level 01"
requirementType: performance
countryScope: poland_specific
priority: high

# Applicability
scope:
  entityType: space
  spaceTypes:
    - bedroom
    - living_room
    - bathroom

# Airborne Sound Insulation (between units)
airborneInsulation:
  metric: airborne_sound_insulation
  operator: ">="
  value: 52
  unit: dB
  testMethod: "PN-EN ISO 717-1"
  description: "Weighted sound reduction index (Rw) between dwelling units"

# Impact Sound Insulation (floor/ceiling)
impactInsulation:
  metric: impact_sound_insulation
  operator: "<="
  value: 53
  unit: dB
  testMethod: "PN-EN ISO 717-2"
  description: "Weighted impact sound pressure level (L'nw) for floors"

# Façade Sound Insulation
facadeInsulation:
  metric: facade_sound_insulation
  operator: ">="
  value: 33
  unit: dB
  testMethod: "PN-EN ISO 717-1"
  description: "Weighted façade insulation (D2m,nT,w) against external noise"

# Background Noise Limits
backgroundNoise:
  metric: background_noise_level
  operator: "<="
  value: 30
  unit: dBA
  testMethod: "PN-EN ISO 1996-2"
  description: "Maximum background noise level in bedrooms at night"

# Acceptance Criteria (Array format for v0.3)
acceptanceCriteria:
  - "Airborne sound insulation (between units): Rw ≥ 52 dB"
  - "Impact sound insulation (floors): L'nw ≤ 53 dB"
  - "Façade sound insulation: D2m,nT,w ≥ 33 dB"
  - "Background noise: ≤ 30 dBA in bedrooms, ≤ 35 dBA in living rooms"

qualitativeDescription: |
  Level 01 residential spaces must achieve Class B acoustic performance:
  1. Airborne sound insulation (between units): Rw ≥ 52 dB (exceeds minimum WT 2021 requirement of 50 dB)
  2. Impact sound insulation (floors): L'nw ≤ 53 dB (exceeds minimum WT 2021 requirement of 58 dB)
  3. Façade sound insulation: D2m,nT,w ≥ 33 dB (appropriate for suburban location)
  4. Background noise (HVAC, services): ≤ 30 dBA in bedrooms, ≤ 35 dBA in living rooms

evidenceRequired:
  - "Acoustic test reports (pre-completion testing per PN-B-02151-4)"
  - "Product technical datasheets for sound-rated assemblies"
  - "Construction details showing acoustic separation"
  - "HVAC system noise calculation report"
  - "Final acoustic commissioning report"

# Construction Requirements
constructionRequirements:
  partitions:
    description: "Double-stud walls or concrete block with acoustic treatment"
    specification: "Rw ≥ 52 dB"

  floors:
    description: "Concrete slab with floating floor finish and resilient layer"
    specification: "L'nw ≤ 53 dB"

  windows:
    description: "Double-glazed units with laminated glass and asymmetric cavity"
    specification: "Rw ≥ 33 dB"

  doors:
    description: "Solid core doors with acoustic seals"
    specification: "Rw ≥ 32 dB"

# Phase Requirements
phases:
  - phase: design_development
    status: completed
    deliverable: "Acoustic design calculations and assembly specifications"

  - phase: construction_documentation
    status: completed
    deliverable: "Construction details with acoustic seal continuity"

  - phase: construction
    status: in_progress
    deliverable: "Product submittals and installation supervision"

  - phase: handover
    status: pending
    deliverable: "Acoustic commissioning test reports"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 323"
    description: "Acoustic protection in residential buildings"
    status: applicable

  - code: "PN-B-02151-4"
    section: "Building acoustics"
    description: "Requirements for acoustic insulation in buildings"
    status: applicable

# Verification Method
verification:
  method: testing
  phase:
    - design_development
    - construction
    - as_built
  frequency: pre_completion
  standard: "PN-B-02151-4"
  responsible: "Acoustic Consultant"

# Related Requirements
relatedRequirements:
  - REQ-BEDROOM-MIN-AREA
  - REQ-HVAC-NOISE-LEVEL

# Cost Impact
estimatedCostImpact:
  description: "Enhanced acoustic performance adds approximately 5-7% to partition and floor costs compared to code minimum"
  magnitude: medium
  value: 15000
  currency: EUR

# Performance Class
performanceClass:
  standard: "PN-B-02151-4"
  class: "B"
  description: "Enhanced acoustic comfort - suitable for high-quality residential"

# Notes
notes: |
  Class B acoustic performance exceeds minimum Polish building code
  requirements (Class C) to provide enhanced residential comfort.

  Key improvements over code minimum:
  - Airborne insulation: 52 dB vs 50 dB minimum (+2 dB)
  - Impact insulation: 53 dB vs 58 dB maximum (-5 dB improvement)

  Testing protocol:
  - Pre-completion testing on 10% of units (minimum 2 units)
  - Any failures require remediation and re-testing
  - Final acceptance requires 100% pass rate

createdBy: "Acoustic Consultant"
lastModified: "2026-02-27"
version: "1.0.0"
---

# Acoustic Performance - Class B

This requirement defines enhanced acoustic insulation standards for residential spaces on Level 01, exceeding minimum code requirements to provide superior acoustic comfort.
