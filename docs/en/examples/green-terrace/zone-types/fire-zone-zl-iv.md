---
entityType: "zone_type"
id: "ZT-FIRE-ZL-IV"
typeName: "Fire Zone ZL-IV Standard"
zoneType: "fire"
description: "Standard fire safety zone for residential buildings per Polish regulations (ZL-IV category)"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-FIRE-COMPARTMENTATION-001"
  - "REQ-FIRE-DETECTION-SMOKE-001"

# FIRE ZONE PROPERTIES
properties:
  fireResistanceClass: "ZL-IV"
  fireResistanceRating: "REI 60"
  maxEscapeDistance: 40.0
  compartmentationRequired: true
  smokeControlStrategy: "natural"
  evacuationStrategy: "protected_egress"
  fireDetectionType: "smoke"
  emergencyLightingRequired: true
  fireLoadCategory: "low"

version: "1.0.0"
tags:
  - "fire-safety"
  - "residential"
  - "polish-code"
  - "zl-iv"
---

# Zone Type: Fire Zone ZL-IV Standard

## Description

Standard fire safety zone for residential buildings according to Polish building regulations. Category ZL-IV (Kategoria Zagrożenia Ludzi IV) applies to residential buildings with occupants capable of self-evacuation, typical for apartment buildings up to medium height.

## Design Intent

This zone type ensures:
- Maximum escape distance of 40 meters to protected corridor or stairwell
- REI 60 fire resistance for compartmentation elements
- Automatic smoke detection in all habitable spaces
- Natural smoke control (openable windows in escape routes)
- Protected egress strategy with fire-rated corridors

## Classification

**Fire Load Category:** ZL-IV (Low fire load)
- Residential occupancy (sleeping spaces)
- Occupants capable of self-evacuation
- Low fire load density (furniture, textiles)
- Single or few-stage evacuation

**Applicable Buildings:**
- Residential buildings (apartments, dormitories)
- Buildings where occupants are familiar with escape routes
- Low-rise and mid-rise residential (typically up to 25m)

## Fire Safety Requirements

### REQ-PL-FIRE-SEPARATION-001: Fire Compartmentation
**Criterion:** Zone boundaries must provide REI 60 fire resistance
**Compliance:**
- Walls: REI 60 (masonry or concrete)
- Floors: REI 60
- Fire doors: EI₂60-C (self-closing with smoke seals)
- Penetrations: Fire-stopped to maintain rating

**Verification:** Product specifications, installation certificates, fire safety inspection

### REQ-FIRE-EGRESS-TIME-001: Escape Distance
**Criterion:** Maximum travel distance to protected exit
**Compliance:**
- Any point in zone: ≤ 40m to protected corridor or staircase
- Measured along shortest walking route
- Protected route: Fire-rated corridor/stairwell

**Verification:** Floor plan analysis, escape route diagrams, regulatory approval

### REQ-FIRE-COMPARTMENTATION-001: Zone Separation
**Criterion:** Fire zones separated by fire-rated construction
**Compliance:**
- Vertical separation: REI 60 floor slabs
- Horizontal separation: REI 60 walls
- Service penetrations: Fire-stopped (EI 60)

**Verification:** Construction drawings, fire stopping schedule, inspection

### REQ-FIRE-DETECTION-SMOKE-001: Smoke Detection
**Criterion:** Optical smoke detectors in all habitable spaces
**Compliance:**
- Ceiling-mounted optical smoke detectors
- Mains-powered with battery backup
- Interconnected to building alarm system
- Coverage: All bedrooms, living spaces, corridors

**Verification:** Fire alarm system design, installation certificates, testing records

## Properties Explained

### Fire Resistance Class: ZL-IV
Polish fire safety classification based on occupancy and evacuation capability:
- **ZL-I:** Hospitals, care homes (highest protection)
- **ZL-II:** Hotels, schools (high protection)
- **ZL-III:** Offices, commercial (medium protection)
- **ZL-IV:** Residential apartments (standard protection) ← **This type**
- **ZL-V:** Industrial, storage (variable protection)

### Fire Resistance Rating: REI 60
- **R** - Load-bearing capacity: 60 minutes
- **E** - Integrity (no flames/hot gases): 60 minutes
- **I** - Insulation (temperature rise): 60 minutes

### Max Escape Distance: 40m
Per WT 2021 § 234, maximum distance from any point to:
- Protected corridor (fire-rated)
- Protected staircase (fire-rated and enclosed)
- External exit (direct to outside)

### Smoke Control Strategy: Natural
- Openable windows in corridors and staircases
- Smoke vents at high level
- Natural air flow to prevent smoke accumulation
- No mechanical smoke extraction required for ZL-IV

### Evacuation Strategy: Protected Egress
- Fire-rated corridors provide protected escape routes
- Protected staircases (enclosed, fire-rated)
- Emergency lighting and signage
- Single-stage evacuation (all occupants evacuate simultaneously)

## Typical Zone Configuration

**Spaces Included:**
- Bedrooms
- Living rooms
- Kitchens (if not open-plan to corridor)
- Bathrooms
- Corridors (within zone)
- Storage rooms

**Spaces Excluded (Separate Fire Zones):**
- Protected staircases (separate fire zone)
- Plant rooms (mechanical, electrical)
- Refuse storage
- Parking (if applicable)

## Boundary Requirements

**Vertical Boundaries:**
- Floor slabs: REI 60 minimum
- Service risers: Fire-stopped at floor penetrations

**Horizontal Boundaries:**
- Walls to other zones: REI 60
- Walls to protected corridor: REI 60
- Apartment entrance doors: EI₂30-C minimum (often EI₂60-C)

**Openings:**
- All doors in fire-rated walls: Fire-rated and self-closing
- Glazing (if required): EI 60 fire-rated glass
- Ventilation ducts: Fire dampers (EI 60) at zone boundaries

## Compliance References

**Polish Regulations:**
- **WT 2021 (Warunki Techniczne) § 234:** Fire zone separation requirements
- **WT 2021 § 235:** Fire resistance of building elements
- **WT 2021 § 271:** Evacuation routes and escape distances
- **Polish Building Code Art. 5:** Fire safety of buildings
- **PN-B-02852:** Fire protection of buildings - Smoke control

**European Standards:**
- **EN 1991-1-2:** Actions on structures - Fire actions
- **EN 13501-2:** Fire classification - Classification using data from fire resistance tests

## Usage Guidelines

### When to Use This Type
- ✅ Residential apartment buildings (typical multi-family)
- ✅ Residential occupancy where residents are familiar with building
- ✅ Buildings with escape distances ≤ 40m
- ✅ Low-rise to mid-rise residential (ground to ~8 floors)
- ✅ Polish building code compliance required

### When NOT to Use
- ❌ High-rise residential (>25m height) - use ZL-III with stricter requirements
- ❌ Care homes, assisted living - use ZL-II (higher protection)
- ❌ Hotels, guest houses - use ZL-II (occupants unfamiliar with building)
- ❌ Buildings with escape distances >40m - requires additional fire zones or protected routes
- ❌ Commercial, office, retail - use ZL-III

## Example Instances

This zone type can be used for:

**Ground Floor Apartment Zone:**
```yaml
id: "ZONE-FIRE-GROUND"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-00"]
properties:
  compartmentArea: 380  # m²
  maxTravelDistance: 35  # Actual measured distance
```

**First Floor Apartment Zone:**
```yaml
id: "ZONE-FIRE-FIRST"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-01"]
properties:
  compartmentArea: 450  # m²
  maxTravelDistance: 40  # Actual measured distance
```

**Multi-Level Zone (Duplex Apartments):**
```yaml
id: "ZONE-FIRE-DUPLEX"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-02", "LVL-03"]
properties:
  compartmentArea: 520  # m² (two levels)
  internalStairNotProtected: true  # Internal stairs within apartment
```

## Maintenance and Testing

**Annual Inspection:**
- Fire door self-closing mechanisms
- Fire door seals and intumescent strips
- Fire stopping at service penetrations
- Emergency lighting function test

**Smoke Detection System:**
- Weekly: Visual indicator check
- Monthly: Detector function test
- Annual: Full system test and certification

**Five-Year Review:**
- Fire resistance integrity of elements
- Regulatory compliance review
- Update for code changes

---

**Document Status:** Zone Type Template
**Version:** 1.0.0
**Applicable Regulations:** WT 2021, Polish Building Code
**Last Review:** 2026-02-22
**Next Review:** Code update or building regulation change
