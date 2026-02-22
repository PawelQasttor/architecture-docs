---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"
description: "Standard residential bedroom for 1-2 occupants in Green Terrace building. North or south-facing with natural daylight, acoustic privacy, and mechanical ventilation."

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# FINISHES (standard for this type)
finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Engineered oak flooring, natural finish"
    thickness: "14mm"
    underlay: "3mm impact sound insulation"

  walls:
    material: "MAT-WALL-PAINT-WHITE"
    description: "Painted gypsum plasterboard, white RAL 9010"
    finish: "Matt emulsion"
    fireRating: "A2-s1, d0"

  ceiling:
    material: "MAT-CEILING-PAINT-WHITE"
    description: "Painted gypsum plasterboard, white RAL 9010"
    finish: "Matt emulsion"
    height: "2.70m clear"

  door:
    specification: "DOOR-INT-AC-01"
    size: "830×2050mm"
    soundReduction: "Rw = 38 dB"
    fireRating: "EI 30"

  window:
    specification: "WINDOW-TYPE-A"
    type: "PVC double-glazed window"
    size: "1200×1400mm"
    uValue: "0.9 W/(m²·K)"
    soundReduction: "Rw = 36 dB"

# EQUIPMENT (standard for this type)
equipment:
  - category: "safety"
    description: "Optical smoke detector (ceiling-mounted, mains-powered with battery backup)"
    specification: "AS PER FIRE SAFETY STANDARD"
    quantity: 1

  - category: "climate"
    description: "Individual room thermostat for underfloor heating"
    specification: "PROGRAMMABLE DIGITAL THERMOSTAT"
    quantity: 1

  - category: "ventilation"
    description: "MVHR supply diffuser (ceiling-mounted, adjustable)"
    specification: "AS PER HVAC SYSTEM DESIGN"
    quantity: 1

  - category: "electrical"
    description: "Double socket outlet (bedside)"
    specification: "230V STANDARD OUTLET"
    quantity: 2

  - category: "electrical"
    description: "Double socket outlet (desk area)"
    specification: "230V STANDARD OUTLET"
    quantity: 1

  - category: "electrical"
    description: "Ceiling light fixture"
    specification: "LED COMPATIBLE FIXTURE"
    quantity: 1

  - category: "electrical"
    description: "Wall-mounted reading light (optional)"
    specification: "LED COMPATIBLE FIXTURE"
    quantity: 1

# OCCUPANCY PROFILE (standard for this type)
occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# AREA GUIDANCE
typicalArea:
  min: 10.0
  max: 18.0
  typical: 14.0
  unit: "m2"

typicalHeight:
  min: 2.50
  typical: 2.70
  unit: "m"

# METADATA
version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "green-terrace"
  - "standard-type"

authors:
  - name: "Architecture Documentation Standard Team"
    role: "standard-template"
---

# Space Type: Standard Bedroom - Type A

## Description

Standard residential bedroom designed for the Green Terrace building. Suitable for 1-2 occupants with natural daylight, enhanced acoustic privacy, mechanical ventilation with heat recovery, and underfloor heating. This type definition serves as the template for all standard bedrooms in the project.

## Design Intent

The bedroom is designed to provide a comfortable and healthy sleeping environment:

- **Daylight & Views:** North or south-facing window provides consistent natural light without excessive direct sun glare, with views to landscaped courtyard or street
- **Acoustic Privacy:** Enhanced acoustic insulation from corridor and adjacent apartments ensures undisturbed sleep (minimum Rw 50 dB party wall construction)
- **Thermal Comfort:** Underfloor heating combined with mechanical ventilation with heat recovery (MVHR) maintains comfortable temperatures year-round (21-24°C)
- **Air Quality:** Continuous fresh air supply via MVHR system ensures healthy indoor air quality (30 m³/h per person minimum)
- **Fire Safety:** Part of protected fire zone ZL-IV with escape route via protected corridor to staircase (maximum 10m escape distance)

## Finishes Specification

### Floor

- **Material:** Engineered oak flooring, natural finish (MAT-FLOOR-OAK-01)
- **Thickness:** 14mm
- **Acoustic Underlay:** 3mm impact sound insulation
- **Installation:** Floating installation on underfloor heating
- **Maintenance:** Annual inspection, refinishing every 10 years

### Walls

- **Material:** Painted gypsum plasterboard, white RAL 9010 (MAT-WALL-PAINT-WHITE)
- **Finish:** Matt emulsion paint
- **Fire Rating:** A2-s1, d0 (non-combustible)
- **Construction:** 12.5mm plasterboard on metal studs for internal partitions
- **Maintenance:** Touch-up as needed, repaint every 5-7 years

### Ceiling

- **Material:** Painted gypsum plasterboard, white RAL 9010 (MAT-CEILING-PAINT-WHITE)
- **Finish:** Matt emulsion paint
- **Clear Height:** 2.70m (complies with WT 2021 § 132: minimum 2.50m)
- **Construction:** 12.5mm plasterboard on ceiling grid
- **Maintenance:** Repaint every 7-10 years

### Door

- **Specification:** Acoustic internal door (DOOR-INT-AC-01)
- **Size:** 830×2050mm (single leaf)
- **Sound Reduction:** Rw = 38 dB (enhanced acoustic performance)
- **Fire Rating:** EI 30 (30 minutes fire resistance)
- **Hardware:** Lever handle, 3-point locking, adjustable hinges
- **Threshold:** Level threshold for accessibility

### Window

- **Specification:** PVC double-glazed window (WINDOW-TYPE-A)
- **Size:** 1200×1400mm (1.68 m² glazing area)
- **U-Value:** 0.9 W/(m²·K) (exceeds WT 2021 requirement of ≤0.9)
- **Sound Reduction:** Rw = 36 dB
- **Construction:** PVC frame, double glazing with argon fill
- **Opening:** Tilt-and-turn mechanism for ventilation and cleaning
- **Maintenance:** Annual seal inspection, hardware lubrication

## Equipment & Fixtures Specification

### Safety Equipment

- **Smoke Detector:** Optical smoke detector, ceiling-mounted
  - Power: Mains-powered with battery backup
  - Standard: EN 14604 compliant
  - Maintenance: Monthly visual check, annual battery replacement
  - Integration: Connected to building fire alarm system

### Climate Control

- **Room Thermostat:** Individual programmable digital thermostat for underfloor heating
  - Temperature Range: 15-30°C, adjustable in 0.5°C increments
  - Programming: 7-day schedule capability
  - Location: Wall-mounted at 1.2m height, away from direct sunlight
  - Maintenance: Annual calibration check

### Ventilation

- **MVHR Supply Diffuser:** Ceiling-mounted adjustable supply diffuser
  - Airflow: 30-60 m³/h (adjustable for 1-2 occupants)
  - Type: Circular ceiling diffuser with adjustable blades
  - Location: Ceiling-mounted, positioned to avoid drafts on bed
  - Noise Level: <25 dB(A) at minimum flow
  - Maintenance: 6-month filter replacement (system-level)

### Electrical Fixtures

- **Bedside Socket Outlets:** 2× double socket outlets (230V)
  - Location: Both sides of bed area, 300mm above floor level
  - Type: Standard European socket with earth
  - Protection: RCD protected circuit

- **Desk Socket Outlet:** 1× double socket outlet (230V)
  - Location: Desk/work area wall, 300mm above desk height
  - Type: Standard European socket with earth
  - Protection: RCD protected circuit

- **Ceiling Light:** 1× ceiling light fixture
  - Type: LED-compatible central ceiling fixture
  - Control: Wall switch at door entry
  - Lamp: LED bulb, 3000K warm white, dimmable
  - Maintenance: LED replacement every 25,000 hours

- **Reading Light:** 1× wall-mounted reading light (optional)
  - Type: Adjustable wall-mounted fixture
  - Location: Bedside wall, 1200mm above floor
  - Control: Integrated switch
  - Lamp: LED, 3000K warm white

## Requirements Summary

This space type meets the following performance requirements. All instances of this type inherit these requirements:

### Global Requirements

#### REQ-DAYLIGHT-SLEEPING-001: Minimum Daylight Factor
- **Target:** DF ≥ 2.0% at center of room, work plane height (0.85m)
- **Verification:** Simulation via DIVA for Rhino or equivalent
- **Phase:** Design Development
- **Status:** To be verified per instance (window size 1.68 m² typically achieves 2-3% DF)

#### REQ-ACOUSTIC-SLEEPING-001: Acoustic Class B Sound Insulation
- **Target:** Rw ≥ 50 dB from adjacent apartments (party walls)
- **Verification:** Post-construction testing per PN-EN ISO 140-4
- **Phase:** As-Built
- **Design:** 200mm concrete block + 100mm acoustic insulation + air gap + gypsum board (designed for Rw >50 dB)

#### REQ-THERMAL-COMFORT-001: Thermal Comfort Range
- **Target:** 21-24°C in winter, individually controllable
- **Verification:** Temperature monitoring, thermostat calibration
- **Phase:** Operation
- **Design:** Underfloor heating with individual room thermostat

#### REQ-VENTILATION-OCCUPIED-001: Fresh Air Ventilation
- **Target:** 30 m³/h per person (60 m³/h total for 2 occupants)
- **Verification:** Airflow measurement at diffuser
- **Phase:** Commissioning
- **Design:** MVHR system with adjustable diffuser (30-60 m³/h range)

### Poland-Specific Requirements (WT 2021)

#### REQ-PL-WT-ROOM-HEIGHT-001: Minimum Room Height
- **Regulation:** WT 2021 § 132
- **Requirement:** ≥ 2.50m clear height for habitable rooms
- **Design:** 2.70m clear height (0.20m safety margin)
- **Status:** Compliant
- **Verification:** Measurement during construction

#### REQ-FIRE-ZL-IV-001: Fire Zone ZL-IV Requirements
- **Regulation:** WT 2021 § 234
- **Requirement:** REI 60 separation, maximum 10m to protected escape route
- **Design:** REI 90 walls (exceeds requirement), 6m to corridor/staircase
- **Status:** Compliant
- **Verification:** Fire resistance test certificates, escape route measurement

## Space Use & Occupancy

- **Primary Use:** Sleeping (nighttime)
- **Secondary Use:** Dressing, reading, personal activities, work/study
- **Occupancy:** 1-2 persons maximum
- **Usage Pattern:** 8 hours/day typical (22:00-06:00)
- **Frequency:** 7 days/week
- **Access:** Private (tenant only)
- **Accessibility:** Standard (non-accessible by default; can be adapted)

## Maintenance & Operations

### Maintenance Zone
- **Zone:** Residential standard cleaning schedule
- **Access:** Via apartment access (tenant coordination required)
- **Frequency:** Tenant-maintained (daily cleaning by occupant)

### Critical Systems Maintenance

| System | Maintenance Task | Frequency | Responsible |
|--------|-----------------|-----------|-------------|
| Smoke detector | Visual check | Monthly | Tenant |
| Smoke detector | Battery replacement | Annual | Building management |
| Smoke detector | Full replacement | 10 years | Building management |
| Room thermostat | Calibration check | Annual | HVAC contractor |
| MVHR diffuser | Filter replacement | 6 months | HVAC contractor (system-level) |
| MVHR diffuser | Cleaning | Annual | HVAC contractor |
| Window seals | Inspection | 5 years | Building management |
| Window hardware | Lubrication | Annual | Building management |
| Floor finish | Inspection | Annual | Building management |
| Floor refinishing | Refinishing | 10 years | Contractor |
| Paint (walls) | Touch-up as needed | As needed | Tenant/management |
| Paint (walls) | Full repaint | 5-7 years | Building management |

## Design Compliance Notes

### Daylight Analysis
Window size (1200×1400mm = 1.68 m²) provides window-to-floor ratio of 11.6% for typical 14 m² bedroom. This typically achieves 2-3% daylight factor for north-facing rooms and 3-5% for south-facing rooms. Final verification via DIVA simulation required per instance during Design Development phase.

### Acoustic Design
Party wall construction designed to exceed Rw 50 dB requirement:
- 200mm concrete block base wall
- 100mm acoustic mineral wool insulation
- 50mm air gap
- Metal stud frame with 12.5mm gypsum board finish
- Expected performance: Rw 52-55 dB

Door specified as Rw 38 dB acoustic door with perimeter seals. Post-construction testing required to verify compliance.

### Fire Safety
All finishes specified as A2-s1, d0 or better (non-combustible). Door rated EI 30, compliant with residential fire safety requirements per WT 2021. Escape distance maximum 6m to protected corridor, well within 10m maximum for ZL-IV zone.

### Thermal Performance
- External wall U-value: 0.18 W/(m²·K) (exceeds WT 2021 § 328 requirement of ≤0.20)
- Window U-value: 0.9 W/(m²·K) (meets WT 2021 requirement of ≤0.90)
- Underfloor heating provides responsive thermal comfort
- MVHR system maintains fresh air without heat loss

## Related Documentation

### Material Specifications
- [MAT-FLOOR-OAK-01] Engineered Oak Flooring
- [MAT-WALL-PAINT-WHITE] White Paint RAL 9010
- [MAT-CEILING-PAINT-WHITE] Ceiling Paint RAL 9010
- [DOOR-INT-AC-01] Acoustic Internal Door
- [WINDOW-TYPE-A] PVC Double-Glazed Window Type A

### Requirements
- [REQ-DAYLIGHT-SLEEPING-001] Daylight for Sleeping Spaces
- [REQ-ACOUSTIC-SLEEPING-001] Acoustic Insulation Class B
- [REQ-THERMAL-COMFORT-001] Thermal Comfort Range
- [REQ-VENTILATION-OCCUPIED-001] Fresh Air Ventilation
- [REQ-PL-WT-ROOM-HEIGHT-001] Minimum Room Height (WT 2021)
- [REQ-FIRE-ZL-IV-001] Fire Zone ZL-IV Requirements

### Systems
- [SYS-HVAC-UFH-01] Underfloor Heating System
- [SYS-HVAC-MVHR-01] Mechanical Ventilation with Heat Recovery
- [SYS-FIRE-DETECTION-01] Fire Detection and Alarm System

### Zone Types
- [ZT-FIRE-ZL-IV] Fire Zone ZL-IV Standard (to be created)
- [ZT-HVAC-RESIDENTIAL] HVAC Zone Residential (to be created)
- [ZT-ACOUSTIC-NIGHT] Acoustic Night Zone (to be created)

## Usage Guidelines

### When to Use This Type
Use "Standard Bedroom - Type A" for:
- ✅ Standard bedrooms in residential apartments (Green Terrace project)
- ✅ Bedrooms with 10-18 m² area range
- ✅ North or south-facing bedrooms
- ✅ Standard accessibility (non-wheelchair)
- ✅ Underfloor heating + MVHR ventilation

### When NOT to Use This Type
Do not use this type for:
- ❌ Accessible bedrooms (wheelchair users) - create separate type
- ❌ Master bedrooms with en-suite bathroom - create separate type
- ❌ Children's bedrooms with special safety requirements - create separate type
- ❌ Guest bedrooms with different finishes - create separate type or use overrides
- ❌ Studio apartments where bedroom is combined with living - use different type

### Creating Instances
When creating a bedroom instance that uses this type:

1. **Required instance data:**
   - `spaceName`: Unique identifier (e.g., "Bedroom 01")
   - `buildingId`: Building reference
   - `levelId`: Level reference
   - `zoneIds`: Specific zone assignments
   - `designArea`: Actual area (should be within 10-18 m² range)
   - `designHeight`: Actual height (typically 2.70m)
   - `adjacentSpaces`: Specific adjacencies
   - `ifcMapping`: IFC GUID for BIM sync

2. **Optional overrides:**
   - `finishOverrides`: Different finishes (e.g., tile floor for accessible unit)
   - `requirementOverrides`: Additional requirements beyond type
   - `occupancy`: Override if different from 2 occupants

3. **Validation:**
   - Area should be within typicalArea range (warning if outside 10-18 m²)
   - Height should be ≥ 2.50m (WT 2021 requirement)
   - All zone references must be valid

---

**Type Status:** ✅ Approved for Green Terrace Project
**Version:** 1.0.0
**Last Updated:** 2026-02-22
**Next Review:** At project completion for lessons learned
**Instances Using This Type:** To be tracked via compiler
