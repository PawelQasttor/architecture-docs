---
documentType: requirement
entityType: requirement
id: REQ-FIRE-EGRESS-TIME-001
requirementName: "Fire Egress Time Limit"
description: "Maximum evacuation time from any point on Level 01 to protected stairwell"
requirementType: safety
countryScope: poland_specific
priority: critical

# Applicability
scope:
  entityType: space
  spaceTypes:
    - corridor
    - bedroom
    - living_room
    - common_area

# Egress Time Requirement
egressTime:
  metric: egress_time
  operator: "<="
  value: 2.5
  unit: minutes
  testMethod: "Simulation (Pathfinder / RSET calculation)"
  description: "Maximum time to reach protected stairwell from any occupied space"

# Travel Distance Requirement
travelDistance:
  metric: egress_distance
  operator: "<="
  value: 40.0
  unit: m
  testMethod: "Measured along escape route centerline"
  description: "Maximum travel distance to nearest stairwell"

# Corridor Width Requirement
corridorWidth:
  metric: corridor_width
  operator: ">="
  value: 1.40
  unit: m
  testMethod: "As-built measurement"
  description: "Minimum clear width for primary escape corridor"

# Door Width Requirement
doorWidth:
  metric: door_clear_width
  operator: ">="
  value: 0.90
  unit: m
  testMethod: "As-built measurement"
  description: "Minimum clear opening width for escape route doors"

# Acceptance Criteria (Array format for v0.3)
acceptanceCriteria:
  - "Egress Time: Maximum 2.5 minutes RSET to protected stairwell"
  - "Travel Distance: Maximum 40 meters along escape route"
  - "Corridor Capacity: Primary corridor ≥1.40m clear width"
  - "Door Performance: Minimum 0.90m clear opening width with self-closing fire doors (EI 30)"
  - "Stairwell Capacity: Minimum 1.20m clear width in protected enclosure (REI 60)"

qualitativeDescription: |
  Level 01 fire egress must meet the following performance criteria:
  1. Egress Time: Maximum 2.5 minutes RSET (Required Safe Egress Time) from any occupied point to protected stairwell entrance (assumes walking speed 1.2 m/s, door delay 2 sec)
  2. Travel Distance: Maximum 40 meters measured along escape route from furthest point in any dwelling unit to nearest protected stairwell door
  3. Corridor Capacity: Primary corridor ≥1.40m clear width, Secondary corridors ≥1.20m clear width, No obstructions in escape routes
  4. Door Performance: Minimum 0.90m clear opening width, Self-closing fire doors (EI 30 minimum), Direction of escape opening, Panic hardware on stairwell doors (if required)
  5. Stairwell Capacity: Minimum 1.20m clear width, Adequate capacity for simultaneous evacuation, Protected enclosure (REI 60)

evidenceRequired:
  - "Fire egress simulation report (Pathfinder or equivalent)"
  - "As-built drawings showing escape routes and distances"
  - "Door schedule with clear opening dimensions"
  - "Fire door installation certificates"
  - "Stairwell pressurization test results (if applicable)"
  - "Emergency lighting test certificate"
  - "Evacuation drill report"

# Design Assumptions
designAssumptions:
  occupantDensity: 0.02  # persons/m² for residential
  walkingSpeed: 1.2  # m/s
  doorFlowRate: 1.33  # persons/second/meter of width
  doorDelay: 2.0  # seconds per door
  preMovementTime: 60  # seconds (residential occupancy)
  safetyFactor: 1.5  # applied to calculated RSET

# Phase Requirements
phases:
  - phase: schematic_design
    status: completed
    deliverable: "Preliminary egress analysis and layout"

  - phase: design_development
    status: completed
    deliverable: "Fire egress simulation (Pathfinder)"

  - phase: construction_documentation
    status: completed
    deliverable: "Escape route details and door schedules"

  - phase: construction
    status: in_progress
    deliverable: "As-built verification of egress routes"

  - phase: handover
    status: pending
    deliverable: "Evacuation drill and final certification"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 256"
    description: "Escape routes in residential buildings"
    status: applicable

  - code: "WT 2021"
    section: "§ 257"
    description: "Doors on escape routes"
    status: applicable

  - code: "WT 2021"
    section: "§ 234"
    description: "Fire compartmentation and protection"
    status: applicable

  - code: "PD 7974-6"
    section: "Human factors: Life safety strategies"
    description: "RSET calculation methodology"
    status: reference

# Verification Method
verification:
  method: simulation
  phase:
    - schematic
    - design_development
    - construction_documentation
    - as_built
  frequency: pre_occupancy
  tool: "Pathfinder"
  standard: "PD 7974-6"
  responsible: "Fire Safety Engineer"

# Simulation Results
simulationResults:
  software: "Pathfinder 2024"
  scenario: "Simultaneous evacuation of Level 01 (worst case)"
  results:
    maxRSET: 2.1  # minutes
    maxTravelDistance: 38.5  # meters
    bottleneck: "Corridor junction near units 5-6"
    status: PASS

# Related Requirements
relatedRequirements:
  - REQ-LEVEL-FIRE-RATING
  - REQ-EMERGENCY-LIGHTING
  - REQ-SMOKE-CONTROL

# Cost Impact
estimatedCostImpact:
  description: "Egress requirements impact corridor width and door specifications"
  magnitude: low
  value: 5000
  currency: EUR

# Critical Safety Requirement
safetyCritical: true
failureMode: "Delayed evacuation, potential loss of life"
mitigationMeasures:
  - "Dual egress routes from each dwelling unit"
  - "Self-closing fire doors on all escape routes"
  - "Emergency lighting with 3-hour battery backup"
  - "Smoke detection and alarm system"
  - "Annual evacuation drills"

# Notes
notes: |
  This is a CRITICAL safety requirement. Any changes to Level 01 layout
  that affect egress routes MUST be re-evaluated.

  RSET calculation includes:
  - Detection time: 30 seconds (smoke detectors)
  - Pre-movement time: 60 seconds (residential occupancy)
  - Travel time: ~70 seconds (38.5m at 1.2 m/s + door delays)
  - Safety factor: ×1.5
  - Total RSET: 2.1 minutes (within 2.5 minute limit)

  Simulation verified under worst-case scenario:
  - Simultaneous evacuation of all 18 units on Level 01
  - Single stairwell blocked (residents use secondary route)
  - No bottleneck exceeded 2.5 minute threshold

createdBy: "Fire Safety Engineer"
lastModified: "2026-02-27"
version: "1.0.0"
---

# Fire Egress Time Limit

This requirement establishes maximum evacuation time from any point on Level 01 to the protected stairwell, ensuring safe egress in fire emergency scenarios.
