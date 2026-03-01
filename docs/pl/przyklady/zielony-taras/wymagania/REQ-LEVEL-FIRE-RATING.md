---
entityType: requirement
id: REQ-LEVEL-FIRE-RATING
requirementName: "Level Fire Resistance Rating"
description: "Fire resistance rating for structural elements and fire compartmentation at Level 01"
requirementType: safety
countryScope: poland_specific
priority: high

# Applicability
scope:
  entityType: space
  spaceTypes:
    - bedroom
    - corridor
    - common_area

# Qualitative Description
qualitativeDescription: |
  Level 01 structural elements and compartmentation must achieve:
  - Floor slab: REI 60 (60 minutes fire resistance)
  - Corridor walls: EI 30 (30 minutes integrity and insulation)
  - Unit separation walls: REI 60 (60 minutes full protection)
  - Apartment entry doors: EI 30 (30 minutes)
  - Fire doors to stairwell: EI 60-C (60 minutes, self-closing)

# Acceptance Criteria (Array format for v0.3)
acceptanceCriteria:
  - "Floor slab: REI 60 (60 minutes fire resistance)"
  - "Corridor walls: EI 30 (30 minutes integrity and insulation)"
  - "Unit separation walls: REI 60 (60 minutes full protection)"
  - "Apartment entry doors: EI 30 (30 minutes)"
  - "Fire doors to stairwell: EI 60-C (60 minutes, self-closing)"

evidenceRequired:
  - "Product technical datasheets for fire-rated assemblies"
  - "Third-party test reports (PN-EN 13501-2)"
  - "As-built construction details showing fire barrier continuity"
  - "Fire door installation certificates"
  - "Building inspection approval"

# Phase Requirements
phases:
  - phase: design_development
    status: specified
    deliverable: "Fire-rated assembly specifications"

  - phase: construction_documentation
    status: specified
    deliverable: "Construction details showing fire barrier details"

  - phase: construction
    status: specified
    deliverable: "Product submittals and test reports"

  - phase: handover
    status: pending
    deliverable: "Final fire safety certification"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 234"
    description: "Fire compartmentation requirements for residential buildings"
    status: applicable

  - code: "PN-EN 13501-2"
    section: "Classification of construction products"
    description: "Fire resistance testing and classification"
    status: applicable

# Verification Method
verification:
  method: inspection
  phase:
    - construction_documentation
    - construction
    - as_built
  frequency: one_time
  standard: "PN-EN 13501-2"
  responsible: "Fire Safety Engineer / Building Inspector"

# Related Requirements
relatedRequirements:
  - REQ-FIRE-EGRESS-TIME-001
  - REQ-SMOKE-CONTROL

# Cost Impact
estimatedCostImpact:
  description: "Fire-rated construction adds approximately 8-12% to structural and partition costs"
  magnitude: medium

# Notes
notes: |
  This requirement applies to all spaces on Level 01. Individual spaces
  may have additional fire safety requirements based on occupancy type.

  Fire resistance ratings follow European classification:
  - R: Load-bearing capacity
  - E: Integrity (no flames/hot gases)
  - I: Insulation (temperature rise limits)
  - C: Self-closing (for doors)

createdBy: "Fire Safety Engineer"
lastModified: "2026-02-27"
version: "1.0.0"
---

# Odporność ogniowa kondygnacji

To wymaganie definiuje klasę odporności ogniowej dla elementów konstrukcyjnych i podziału na strefy pożarowe na Poziomie 01 budynku Green Terrace.
