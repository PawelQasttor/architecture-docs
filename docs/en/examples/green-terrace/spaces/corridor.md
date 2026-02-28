---
entityType: "space"
id: "SP-BLD-01-L01-CORR"
version: "0.4.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "First Floor Corridor"
spaceType: "corridor"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"

designArea: 8.2
# designHeight: 2.70  ← INHERITED from LVL-01.typicalCeilingHeight (v0.1.4)
# finishes: ceramic tile ← OVERRIDE needed (different from level's oak floor)
designVolume: 22.1
unit: "m"

# Finishes override (corridor needs tile, not oak from level)
finishOverrides:
  floor: "Ceramic tiles non-slip R10"  # Override level's oak floor
  # walls: white paint ← INHERITED from level
  # ceiling: white paint ← INHERITED from level

# NEW v0.4: Cost tracking
cost:
  totalCost: 11890
  currency: "EUR"
  basis: "calculated_custom"
  breakdown:
    construction: 6560   # 8.2m² × €800/m² (lower - circulation space)
    fitout: 4920        # 8.2m² × €600/m² (higher - durable tile finish)
    equipment: 410      # 8.2m² × €50/m² (minimal - emergency lighting only)
  _meta:
    confidence: "estimated"
    source: "custom_calculation"
    sourceRef: "corridor_cost_profile"
    calculatedDate: "2026-02-27T11:00:00Z"
    notes: "Circulation spaces have lower construction cost but higher fitout cost (durable finishes)"

# NEW v0.4: Performance targets (reduced for circulation space)
performanceTargets:
  daylighting:
    daylightFactor: 1.0  # Lower requirement for circulation
    illuminanceTarget: 100  # Lower than bedrooms
    uniformityRatio: 0.3
    emergencyLighting: true
    emergencyLightingDuration: 90  # minutes
    basis: "EN 17037:2018 (circulation category)"

  indoorAirQuality:
    co2Maximum: 1200  # Higher acceptable (transient occupancy)
    outdoorAirPerPerson: 20  # Lower than occupied spaces
    airChangeEffectiveness: 0.7
    basis: "ASHRAE 62.1 (circulation)"

  acousticPerformance:
    backgroundNoise: 40  # Higher acceptable than bedrooms
    reverberation:
      t60: 0.6
      target: "speech_clarity"
    soundIsolation:
      doorRw: 38  # Acoustic doors to bedrooms
    privacyRating: "medium"
    basis: "ISO 140 series (circulation)"

  thermalComfort:
    winterDesignTemp: 20  # Lower than bedrooms
    summerDesignTemp: 25
    operativeTemperature:
      min: 18
      max: 27
    basis: "ISO 7730 (circulation - Category II)"

  energyPerformance:
    heatingDemand: 40  # Lower than bedrooms
    coolingDemand: 10
    lightingDemand: 5  # Minimal occupancy
    totalEnergyUse: 55
    primaryEnergyRating: "A"
    basis: "NZEB_target"

  embodiedCarbon:
    construction:
      structuralFrame: 120
      envelope: 60
      finishes: 80  # Higher due to durable tile
      services: 40  # Minimal
      total: 300
    operations:
      annualOperationalCarbon: 10
      lifespan: 60
      totalOperational: 600
    endOfLife:
      deconstruction: -40
    wholeLife:
      total: 860
      target: 1000
      status: "compliant"
    basis: "RICS Whole Life Carbon + LETI targets"

# NEW v0.4: Simulations
simulations:
  - id: "SIM-EMERGENCY-LIGHTING-CORRIDOR"
    type: "emergency_lighting"
    tool: "DIALux"
    version: "10.2"
    status: "completed"
    executionDate: "2026-03-10T10:00:00Z"
    executedBy: "anna.nowak@architecture.pl"

    inputs:
      luminaireType: "LED_emergency_90min"
      luminaireCount: 2
      mountingHeight: 2.70
      reflectances:
        floor: 0.30  # Tile
        walls: 0.70
        ceiling: 0.80

    targets:
      minIlluminance: 1.0  # lux (emergency path)
      uniformity: 0.25

    results:
      minIlluminance: 1.2
      avgIlluminance: 3.5
      uniformity: 0.34
      outcome: "compliant"

    files:
      inputModel: "simulations/corridor-emergency-light.ldt"
      resultImages:
        - "simulations/corridor-emergency-false-color.png"
      resultData: "simulations/corridor-emergency-results.csv"
      report: "simulations/corridor-emergency-report.pdf"

    _meta:
      confidence: "measured"
      source: "DIALux_simulation"
      validator: "anna.nowak@architecture.pl"
      validationDate: "2026-03-10T11:00:00Z"

# NEW v0.4: BIM integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"

    # IFC reference
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "2O3fG9$rLBxv3VxEu2LPxS"
    ifcEntity: "IfcSpace"

    # DWG reference (secondary)
    dwgFile: "../cad/Level-01-Floor-Plan.dwg"
    dwgLayer: "A-WALL-CORRIDOR"
    dwgHandle: "1A32"

    # Sync metadata
    lastSyncDate: "2026-02-27T10:35:00Z"
    syncedProperties:
      - "area"
      - "height"
      - "adjacencies"
      - "width"
    syncStatus: "current"

    # IFC extracted properties
    ifcExtractedProperties:
      area: 8.15
      height: 2.70
      volume: 22.0
      width: 1.25  # Critical for egress compliance
      lastExtracted: "2026-02-27T10:35:00Z"

    # Validation results
    validation:
      areaMatch: true  # 8.2 ≈ 8.15 (within ±2% tolerance)
      heightMatch: true
      widthMatch: true  # 1.25m > 1.20m requirement ✅
      lastValidated: "2026-02-27T10:35:00Z"

    # BCF issues (empty = no issues)
    bcfIssues: []

  # Minimal 2D outline (extracted from IFC)
  outline2D:
    coordinates:
      - [0.0, 0.0]
      - [6.50, 0.0]
      - [6.50, 1.25]
      - [0.0, 1.25]
    unit: "m"
    origin: "level_origin"
    elevation: 3.20
    azimuth: 90
    source: "extracted_from_ifc"
    confidence: "measured"

  # Centroid for diagrams
  centroid: [3.25, 0.625]

  # Bounding box for clash detection
  bounds:
    min: [0.0, 0.0, 3.20]
    max: [6.50, 1.25, 5.90]

# Requirements merged: Level requirements + Instance requirements (v0.1.4)
requirements:
  # From LVL-01.levelRequirements (MERGED):
  #   - REQ-PL-WT-ROOM-HEIGHT-001 (2.50m minimum)
  #   - REQ-LEVEL-FIRE-RATING
  #   - REQ-LEVEL-ACOUSTIC-B
  # Plus instance-specific requirements:
  - "REQ-PL-WT-CORRIDOR-WIDTH-001"
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-PL-FIRE-SEPARATION-001"

requirements_meta:
  confidence: "specified"
  source: "Green Terrace Design Requirements Specification"
  specifiedBy: "Architect - Project Team"
  date: "2026-02-27"
  notes: "Requirements specified by design team and merged with level requirements and jurisdiction pack auto-assignment"

occupancy:
  maxOccupants: 4
  usagePattern: "circulation"
  hoursPerDay: 2
  daysPerWeek: 7

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "connects_via_door"
    boundaryType: "fire_wall"
    fireRating: "EI 30"

  - id: "SP-BLD-01-L01-002"
    relationship: "connects_via_door"
    boundaryType: "fire_wall"
    fireRating: "EI 30"

maintenanceZone: "MZ-RESIDENTIAL-01"
accessRestrictions: "residents"
lifecycleState: "design"

tags:
  - "circulation"
  - "fire-egress"
  - "protected"
lastReviewed: "2026-02-27"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
changelog:
  - version: "0.4.0"
    date: "2026-02-27"
    description: "Updated to v0.4.0 with cost tracking, performance targets (circulation-appropriate), emergency lighting simulation, and enhanced BIM integration"
  - version: "1.1.0"
    date: "2026-02-23"
    description: "Updated to use property inheritance (v0.1.4) - ceiling height inherited, floor finish overridden"
  - version: "1.0.0"
    date: "2026-02-22"
    description: "Initial creation"
---

# Space: First Floor Corridor

Protected circulation space connecting bedrooms to staircase.

::: tip Level Inheritance (v0.1.4)
This corridor inherits from **Level 01**:
- ✅ **Ceiling Height:** 2.70m (inherited, no need to specify)
- ✅ **Finishes:** White painted walls/ceiling (inherited)
- ⚠️ **Floor Override:** Ceramic tile (overrides level's oak floor for durability)
- ✅ **Requirements:** Merged with level requirements (height, fire, acoustic)

No space type used — pure level inheritance.
:::

## Dimensions

- **Floor Area:** 8.2 m²
- **Clear Width:** ≥ 1.20 m (compliant with WT 2021 § 69)
- **Clear Height:** 2.70 m
- **Length:** Approximately 6.5 m

## Function

Internal corridor providing access to:
- Bedroom 01 (east)
- Bedroom 02 (west)
- Staircase to ground floor (south)
- Bathroom (not yet modeled)

## Fire Safety Role

This corridor is part of the protected egress route from bedrooms to the staircase.

### Fire Protection Requirements

- **Fire Doors:** All doors to bedrooms must be EI 30 with self-closers
- **Wall Construction:** Fire-rated partitions (REI 60)
- **Smoke Detection:** Automatic smoke detector required
- **Emergency Lighting:** Battery-backed LED luminaires with 90-minute autonomy
- **Maximum Travel Distance:** 40 m to protected staircase (compliant)

## Compliance Status (v0.4 Enhanced)

| Requirement | Target Value | Actual Value | Status |
|-------------|--------------|--------------|--------|
| Corridor width (WT 2021 § 69) | ≥ 1.20 m | 1.25 m | ✅ COMPLIANT (IFC validated) |
| Fire door rating | EI 30 | EI 30 | ✅ COMPLIANT |
| Emergency lighting | ≥1.0 lux, 90 min | 1.2 lux avg, 90 min | ✅ COMPLIANT (DIALux verified) |
| Smoke detection | Automatic | Optical detector | ✅ COMPLIANT |
| Ceiling height | ≥ 2.50 m | 2.70 m | ✅ COMPLIANT |
| Egress time | < 2.5 min | Estimated 1.2 min | ✅ COMPLIANT |

### Performance Summary

| Category | Target | Status | Notes |
|----------|--------|--------|-------|
| **Emergency Lighting** | ≥1.0 lux | ✅ Compliant | DIALux simulation: 1.2 lux min, 3.5 lux avg |
| **IAQ** | CO₂ ≤1200 ppm | ✅ Design OK | Natural ventilation + transient occupancy |
| **Acoustic** | Rw 38 dB doors | ✅ Design OK | Acoustic doors to bedrooms |
| **Thermal** | 18-27°C | ✅ OK | Minimal heating, natural ventilation |
| **Energy** | ≤40/10 kWh/m²/year | ✅ Target | Lower than bedrooms (circulation) |
| **Embodied Carbon** | ≤1000 kgCO₂e/m² | ✅ Compliant | 860 kgCO₂e/m² (below target) |

### Cost Breakdown (NEW v0.4)

| Category | Cost | €/m² | % of Total | Notes |
|----------|------|------|------------|-------|
| Construction | €6,560 | €800/m² | 55.2% | Lower (circulation space) |
| Fitout (finishes) | €4,920 | €600/m² | 41.4% | Higher (durable tile) |
| Equipment | €410 | €50/m² | 3.4% | Minimal (emergency lights) |
| **Total** | **€11,890** | **€1,450/m²** | **100%** | Lower overall than bedrooms |

**Cost comparison:** Corridor costs €1,450/m² vs bedrooms €1,730/m² (-16% due to lower construction/equipment requirements, but higher finishes for durability)

### BIM Integration Status (NEW v0.4)

| Item | Source | SBM Value | IFC Value | Match |
|------|--------|-----------|-----------|-------|
| Area | IFC validation | 8.2 m² | 8.15 m² | ✅ Yes (±2% tolerance) |
| Height | IFC validation | 2.70 m | 2.70 m | ✅ Yes (exact) |
| Width | IFC validation | - | 1.25 m | ✅ > 1.20m requirement |
| Volume | IFC validation | 22.1 m³ | 22.0 m³ | ✅ Yes |
| Last sync | IFC file | - | 2026-02-27 | ✅ Current |
| BCF issues | Validation | - | 0 open | ✅ No issues |

## Requirements Summary

## Systems

- **Fire Detection:** Optical smoke detector (part of SYS-FIRE-ALARM-01)
- **Emergency Lighting:** LED emergency luminaires with central battery
- **Ventilation:** Natural ventilation via openable window at corridor end
- **Electrical:** Minimal power outlets (cleaning)

## Finishes

::: info Inheritance Pattern
Most finishes inherited from Level 01, with floor overridden for circulation use.
:::

- **Floor:** Ceramic tiles non-slip R10 (⚠️ **OVERRIDE** — level specifies oak, but corridor needs durable tile)
- **Walls:** Acrylic paint white RAL 9010 (✅ **INHERITED** from level)
- **Ceiling:** Acrylic paint white RAL 9010 (✅ **INHERITED** from level)
- **Baseboard:** MDF white baseboard 80mm (✅ **INHERITED** from level)
- **Doors:** Fire-rated timber doors EI 30 with vision panels

## Accessibility

- **Level Access:** No steps or thresholds
- **Door Width:** 90 cm clear opening (wheelchair accessible)
- **Circulation Space:** Adequate maneuvering space at door swings
- **Clear Width:** 1.25m (exceeds 1.20m minimum) ✅

---

**Document Status:** Design Development (LOD 300)
**SBM Version:** v0.4.0
**Last Review:** 2026-02-27
**Next Review:** Design freeze before construction documentation phase

**v0.4 Features:**
- ✅ **Cost Tracking:** €11,890 total (€1,450/m²) - 16% lower than bedrooms
- ✅ **Performance Targets:** 6 categories adapted for circulation space
- ✅ **Simulations:** DIALux emergency lighting completed (COMPLIANT)
- ✅ **BIM Integration:** IFC GlobalId validation, width validation (1.25m > 1.20m requirement)
- ✅ **Property Inheritance:** Level→Space cascade with floor finish override (tile vs oak)
- ✅ **No Space Type:** Pure level inheritance pattern demonstrated

**Compliance Status:**
- Emergency lighting: ✅ COMPLIANT (1.2 lux min, DIALux verified)
- Width requirement: ✅ COMPLIANT (1.25m > 1.20m requirement, IFC validated)
- Embodied carbon: ✅ COMPLIANT (860 vs 1000 kgCO₂e/m² target)
- Fire egress: ✅ COMPLIANT (EI 30 doors, smoke detection, emergency lighting)

**Next Steps:**
1. Post-construction: Verify emergency lighting performance
2. Post-construction: Verify smoke detector integration with building alarm system
3. Commission fire doors and self-closers
