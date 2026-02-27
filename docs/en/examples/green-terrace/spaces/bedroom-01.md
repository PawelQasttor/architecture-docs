---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
version: "0.4.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

# Basic Properties
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
roomNumber: "1.01.1"
accessibilityLevel: "standard"
departmentId: "DEPT-RESIDENTIAL-A"

# Instance-Specific Location Data
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

# Instance-Specific Spatial Data
designArea: 14.5
# designHeight: 2.70  ← INHERITED from LVL-01.typicalCeilingHeight (v0.1.4)
# finishes: oak/white ← INHERITED from LVL-01.typicalFinishes (v0.1.4)
# environmentalConditions ← INHERITED from LVL-01.typicalEnvironmentalConditions (v0.1.4)
# requirements (partial) ← MERGED with LVL-01.levelRequirements + type requirements (v0.1.4)
designVolume: 39.15
unit: "m"

# NEW v0.4: Cost tracking
cost:
  totalCost: 25085
  currency: "EUR"
  basis: "calculated_from_type"
  breakdown:
    construction: 17400  # 14.5m² × €1200/m²
    fitout: 5075        # 14.5m² × €350/m²
    equipment: 2610     # 14.5m² × €180/m²
  _meta:
    confidence: "estimated"
    source: "space_type_cost_profile"
    sourceRef: "ST-BEDROOM-STANDARD-A"
    calculatedDate: "2026-02-27T10:00:00Z"

# NEW v0.4: Performance targets
performanceTargets:
  daylighting:
    daylightFactor: 2.0
    spatialDaylightAutonomy: 75
    annualSunlightExposure: 10
    illuminanceTarget: 300
    uniformityRatio: 0.4
    viewQuality: "exterior_views_required"
    glareControl: "manual_blinds"
    basis: "EN 17037:2018"

  indoorAirQuality:
    co2Maximum: 1000
    vocMaximum: 400
    particulatePM25: 10
    particulatePM10: 20
    outdoorAirPerPerson: 30
    airChangeEffectiveness: 0.8
    basis: "ASHRAE 62.1 + WHO guidelines"

  acousticPerformance:
    backgroundNoise: 35
    reverberation:
      t60: 0.5
      target: "speech_intelligibility"
    soundIsolation:
      airborneRw: 52
      impactLnw: 58
      facadeRw: 36
      frequencyRange: "50-5000Hz"
    privacyRating: "high"
    basis: "ISO 140 series"

  thermalComfort:
    winterDesignTemp: 21
    summerDesignTemp: 24
    operativeTemperature:
      min: 20
      max: 26
    relativeHumidity:
      min: 30
      max: 60
    airVelocity: 0.15
    radiantAsymmetry: 5
    verticalTempGradient: 3
    thermalMass:
      effectiveMass: 150
      thermalLag: 8
      passiveSurvivability: 48
    basis: "ISO 7730 PMV/PPD"

  energyPerformance:
    heatingDemand: 45
    coolingDemand: 15
    lightingDemand: 8
    plugLoadDemand: 12
    totalEnergyUse: 80
    renewableGeneration: 15
    netEnergyUse: 65
    primaryEnergyRating: "A"
    basis: "NZEB_target"

  embodiedCarbon:
    construction:
      structuralFrame: 180
      envelope: 95
      finishes: 45
      services: 80
      total: 400
    operations:
      annualOperationalCarbon: 15
      lifespan: 60
      totalOperational: 900
    endOfLife:
      deconstruction: -50
    wholeLife:
      total: 1250
      target: 1000
      status: "needs_improvement"
    basis: "RICS Whole Life Carbon + LETI targets"

# NEW v0.4: Simulations
simulations:
  - id: "SIM-DAYLIGHT-BEDROOM-01"
    type: "daylighting"
    tool: "DIVA"
    version: "5.0"
    status: "completed"
    executionDate: "2026-03-15T14:30:00Z"
    executedBy: "anna.nowak@architecture.pl"

    inputs:
      weatherFile: "POL_Warsaw_123750_IWEC.epw"
      analysisGrid: "0.5m_grid_work_plane_0.75m_height"
      blindControl: "manual"
      occupancySchedule: "residential_bedroom_8h_night"
      reflectances:
        floor: 0.20
        walls: 0.70
        ceiling: 0.80
        ground: 0.15
      glazing:
        area: 1.68
        visibleTransmittance: 0.68
        uValue: 1.1
        gValue: 0.55

    targets:
      daylightFactor: 2.0
      spatialDaylightAutonomy: 75
      annualSunlightExposure: 10

    results:
      daylightFactor: 2.3
      spatialDaylightAutonomy: 78
      annualSunlightExposure: 8
      outcome: "compliant"

    files:
      inputModel: "simulations/bedroom-01-daylight-model.rad"
      weatherData: "simulations/POL_Warsaw.epw"
      resultImages:
        - "simulations/bedroom-01-df-false-color.png"
        - "simulations/bedroom-01-sda-annual.png"
      resultData: "simulations/bedroom-01-results.csv"
      report: "simulations/bedroom-01-daylight-report.pdf"

    _meta:
      confidence: "measured"
      source: "DIVA_simulation"
      validator: "anna.nowak@architecture.pl"
      validationDate: "2026-03-15T15:00:00Z"

  - id: "SIM-THERMAL-BEDROOM-01"
    type: "thermal"
    tool: "EnergyPlus"
    version: "23.1"
    status: "planned"
    scheduledDate: "2026-04-01"

    targets:
      heatingDemand: 45
      coolingDemand: 15
      peakHeatingLoad: 850
      peakCoolingLoad: 420

# NEW v0.4: BIM integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"

    # IFC reference
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "2O3fG9$rLBxv3VxEu2LPxQ"
    ifcEntity: "IfcSpace"

    # DWG reference (secondary)
    dwgFile: "../cad/Level-01-Floor-Plan.dwg"
    dwgLayer: "A-WALL-BEDROOM-01"
    dwgHandle: "1A2F"

    # Sync metadata
    lastSyncDate: "2026-02-27T10:35:00Z"
    syncedProperties:
      - "area"
      - "height"
      - "adjacencies"
    syncStatus: "current"

    # IFC extracted properties
    ifcExtractedProperties:
      area: 14.52
      height: 2.70
      volume: 39.2
      lastExtracted: "2026-02-27T10:35:00Z"

    # Validation results
    validation:
      areaMatch: true  # 14.5 ≈ 14.52 (within ±2% tolerance)
      heightMatch: true
      lastValidated: "2026-02-27T10:35:00Z"

    # BCF issues (empty = no issues)
    bcfIssues: []

  # Minimal 2D outline (extracted from IFC)
  outline2D:
    coordinates:
      - [0.0, 0.0]
      - [4.03, 0.0]
      - [4.03, 3.60]
      - [0.0, 3.60]
    unit: "m"
    origin: "level_origin"
    elevation: 3.20
    azimuth: 0
    source: "extracted_from_ifc"
    confidence: "measured"

  # Centroid for diagrams
  centroid: [2.015, 1.80]

  # Bounding box for clash detection
  bounds:
    min: [0.0, 0.0, 3.20]
    max: [4.03, 3.60, 5.90]

# Instance-Specific Relationships
adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
    boundaryType: "standard_wall"
    fireRating: "EI 60"

  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

# FM/Maintenance
maintenanceZone: "MAINT-ZONE-RESIDENTIAL"
accessRestrictions: "tenant_only"

# Lifecycle & Regulatory
lifecycleState: "design"
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 132"
    description: "Minimum room height 2.50m for residential"
    status: "compliant"
  - code: "WT 2021"
    section: "§ 155"
    description: "Minimum bedroom area 8m² (single) or 12m² (double)"
    status: "compliant"

# Metadata
lastReviewed: "2026-02-27"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
changelog:
  - version: "0.4.0"
    date: "2026-02-27"
    description: "Updated to v0.4.0 with cost tracking, performance targets, simulations, and enhanced BIM integration"
  - version: "2.1.0"
    date: "2026-02-23"
    description: "Updated to use property inheritance (v0.1.4) - removed designHeight, finishes (now inherited from level)"
  - version: "2.0.0"
    date: "2026-02-22"
    description: "Migrated to type/instance pattern"
---

# Space: Bedroom 01

**Type:** Standard Bedroom - Type A (see `#.md`)

Standard bedroom in apartment unit 01 on first floor of the Green Terrace residential building. North-facing room with single window providing natural daylight and ventilation. This space is part of a 2-bedroom apartment designed for a small family.

::: tip Type-Based + Level Inheritance (v0.1.4)
This bedroom inherits specifications from **two sources**:

**From Space Type (ST-BEDROOM-STANDARD-A):**
- ✅ 6 requirements (daylight, acoustic, thermal, ventilation, fire, height)
- ✅ Equipment (smoke detector, thermostat, MVHR, electrical outlets)
- ✅ Occupancy profile (2 people, 8h/day, residential sleeping)

**From Level (LVL-01):**
- ✅ Ceiling height: 2.70m (no need to specify per room!)
- ✅ Finishes: Oak floor, white painted walls/ceiling
- ✅ Environmental: 20-24°C, 40-60% humidity, 0.5 ACH
- ✅ Requirements: Merged with type requirements (height, fire, acoustic)

**Result:** Only instance-specific properties (area, adjacencies, zones) need to be defined here.
:::

## Instance-Specific Details

### Location & Dimensions
- **Building:** BLD-01 (Green Terrace)
- **Level:** L01 (First Floor)
- **Area:** 14.5 m² (within type range: 10-18 m²) ✅
- **Height:** 2.70 m clear (exceeds minimum 2.50m) ✅
- **Volume:** 39.15 m³
- **Orientation:** North-facing

### Adjacencies
- **East:** [Bedroom 02](./bedroom-02) - Shared party wall (Rw ≥50 dB acoustic partition)
- **West:** [Corridor](./corridor) - Access via acoustic door (Rw 38 dB)
- **Above:** Similar apartment on Level 02
- **Below:** Living room of apartment on ground floor

### Zones
This bedroom is part of:
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md) - Fire safety zone (6m to protected corridor)
- [HVAC North Zone](../zones/hvac-zone-north.md) - North wing climate control
- [Acoustic Night Zone](../zones/acoustic-zone-night.md) - Enhanced acoustic privacy

## Design Features

### Daylight & Views
- **Window Area:** 1.68 m² (1200×1400mm)
- **Window-to-Floor Ratio:** 11.6%
- **Expected Daylight Factor:** 2-3% (north-facing)
- **Views:** Landscaped courtyard with mature trees
- **Sun Exposure:** Minimal direct sun (north orientation) - ideal for sleeping comfort
- **Verification:** DIVA simulation planned for March 2026

### Acoustic Performance
- **Party Wall:** Rw ≥52 dB (exceeds requirement of Rw 50 dB)
  - Construction: 200mm concrete + 100mm insulation + air gap + gypsum board
- **Door to Corridor:** Rw 38 dB acoustic door with perimeter seals
- **Window:** Rw 36 dB double-glazed with acoustic laminate
- **Expected Performance:** Undisturbed sleep quality, suitable for urban location
- **Verification:** Post-construction acoustic testing required

### Systems Integration
- **Heating:** Underfloor heating (SYS-HVAC-UFH-01)
  - Individual room thermostat control
  - Design temperature: 21-24°C

- **Ventilation:** MVHR supply diffuser (SYS-HVAC-MVHR-01)
  - Supply airflow: 60 m³/h (30 m³/h per person × 2)
  - Ceiling-mounted diffuser positioned away from bed
  - Noise level: <25 dB(A)

- **Fire Detection:** Optical smoke detector
  - Mains-powered with battery backup
  - Connected to building alarm system
  - Positioned per manufacturer guidelines

## Compliance Status (v0.4 Enhanced)

All requirements inherited from [Standard Bedroom Type A](#) are applicable, with simulation verification:

| Requirement | Target | Actual | Status |
|-------------|--------|--------|--------|
| REQ-DAYLIGHT-SLEEPING-001 | DF ≥2.0%, sDA ≥75% | DF 2.3%, sDA 78% | ✅ COMPLIANT (DIVA verified) |
| REQ-ACOUSTIC-SLEEPING-001 | Rw ≥52 dB | Design OK | ⏳ Post-construction testing |
| REQ-THERMAL-COMFORT-001 | 21-24°C | Design OK | ✅ COMPLIANT (UFH + MVHR) |
| REQ-VENTILATION-OCCUPIED-001 | 60 m³/h | 60 m³/h | ✅ COMPLIANT (confirmed) |
| REQ-PL-WT-ROOM-HEIGHT-001 | ≥2.50m | 2.70m | ✅ COMPLIANT |
| REQ-FIRE-ZL-IV-001 | <10m escape | 6m | ✅ COMPLIANT |

### Performance Summary

| Category | Target | Status | Notes |
|----------|--------|--------|-------|
| **Daylighting** | DF ≥2.0%, sDA ≥75% | ✅ Exceeds | DIVA simulation: DF 2.3%, sDA 78% |
| **IAQ** | CO₂ ≤1000 ppm | ✅ Design OK | 60 m³/h fresh air supply |
| **Acoustic** | Rw ≥52 dB | ⏳ Verify | Post-construction testing required |
| **Thermal** | 21-24°C | ✅ OK | Thermal mass 150 kg/m², 8h lag |
| **Energy** | ≤45/15 kWh/m²/year | ⏳ Simulate | EnergyPlus simulation planned April 2026 |
| **Embodied Carbon** | ≤1000 kgCO₂e/m² | ⚠️ Over | 1250 kgCO₂e/m² - needs improvement |

### Cost Breakdown (NEW v0.4)

| Category | Cost | €/m² | % of Total |
|----------|------|------|------------|
| Construction | €17,400 | €1,200/m² | 69.4% |
| Fitout (finishes) | €5,075 | €350/m² | 20.2% |
| Equipment | €2,610 | €180/m² | 10.4% |
| **Total** | **€25,085** | **€1,730/m²** | **100%** |

### BIM Integration Status (NEW v0.4)

| Item | Source | SBM Value | IFC Value | Match |
|------|--------|-----------|-----------|-------|
| Area | IFC validation | 14.5 m² | 14.52 m² | ✅ Yes (±2% tolerance) |
| Height | IFC validation | 2.70 m | 2.70 m | ✅ Yes (exact) |
| Volume | IFC validation | 39.15 m³ | 39.2 m³ | ✅ Yes |
| Last sync | IFC file | - | 2026-02-27 | ✅ Current |
| BCF issues | Validation | - | 0 open | ✅ No issues |

## Maintenance Access

- **Standard Access:** Via apartment entrance (tenant coordination required)
- **Emergency Access:** Master key access for fire/flood emergencies
- **Service Access:** Scheduled maintenance via building management
  - Smoke detector annual check
  - Thermostat calibration
  - Window seal inspection (5-year cycle)

## Related Documentation

### Type Definition
- [Standard Bedroom - Type A](#) - Complete specifications

### Spatial Context
- Apartment Unit 01 - Parent residential unit
- [Bedroom 02](./bedroom-02) - Adjacent bedroom
- [Corridor](./corridor) - Access circulation

### Zones
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md)
- [HVAC North Zone](../zones/hvac-zone-north.md)
- [Acoustic Night Zone](../zones/acoustic-zone-night.md)

### Systems
- SYS-HVAC-UFH-01 - Underfloor heating
- SYS-HVAC-MVHR-01 - Mechanical ventilation with heat recovery
- SYS-FIRE-DETECTION-01 - Fire detection and alarm

## Instance Notes

**North Orientation Advantage:** The north-facing orientation provides consistent natural light throughout the day without excessive direct sun exposure, which is ideal for a sleeping space. This reduces overheating risk in summer and glare issues year-round.

**Courtyard Views:** Window overlooks the landscaped courtyard with mature trees, providing pleasant green views and visual privacy from neighboring buildings.

**Acoustic Consideration:** Shared wall with Bedroom 02 (same apartment) requires standard acoustic insulation. Party wall construction with adjacent apartments exceeds minimum requirements to ensure privacy.

---

**Document Status:** Design Development (LOD 300)
**SBM Version:** v0.4.0
**Last Review:** 2026-02-27
**Next Review:** Design freeze before construction documentation phase

**v0.4 Features:**
- ✅ **Cost Tracking:** €25,085 total (€1,730/m²) with breakdown
- ✅ **Performance Targets:** 6 categories (daylighting, IAQ, acoustic, thermal, energy, carbon)
- ✅ **Simulations:** DIVA daylighting completed (COMPLIANT), EnergyPlus thermal planned
- ✅ **BIM Integration:** IFC GlobalId validation, 2D outline, centroid, bounds
- ✅ **Property Inheritance:** Level→Space cascade (ceiling, finishes, environment)
- ✅ **Type/Instance Pattern:** ST-BEDROOM-STANDARD-A template reference

**Compliance Status:**
- Daylighting: ✅ COMPLIANT (DF 2.3%, sDA 78% exceeds targets)
- Energy: ⏳ Pending thermal simulation (April 2026)
- Carbon: ⚠️ Needs improvement (1250 vs 1000 kgCO₂e/m² target)

**Next Steps:**
1. Run EnergyPlus thermal simulation (scheduled 2026-04-01)
2. Reduce embodied carbon to meet 1000 kgCO₂e/m² target
3. Post-construction: Verify acoustic performance (Rw measurement)
