---
documentType: "project"
entityType: "project"
id: "PRJ-GREEN-TERRACE"
version: "0.4.0"

# Project Identity
projectName: "Residential Building Green Terrace"
projectLocation: "Warsaw, Poland"
country: "PL"
phase: 4  # Phase 4: Construction Documentation

# Building Classification
buildingClassification:
  category: "A"
  type: "residential_multi_family"
  description: "Apartment building"

# Building Data
buildingData:
  height: 18.5
  floors: 6
  grossFloorArea: 1800
  usableArea: 1620
  dwellingUnits: 18
  estimatedOccupants: 54

# NEW v0.4: Budget & Cost Tracking
budget:
  totalBudget: 1800000
  currency: "EUR"
  contingency: 90000  # 5%
  contingencyPercent: 5

  breakdown:
    foundation_structure: 540000  # 30%
    envelope: 360000              # 20%
    mep_systems: 450000           # 25%
    finishes: 270000              # 15%
    external_works: 90000         # 5%

  forecast:
    totalForecast: 1750000
    variance: -50000  # 2.8% under budget
    variancePercent: -2.8
    status: "on_track"
    lastUpdated: "2026-02-27"

  tracking:
    committed: 850000  # Contracts signed
    spent: 540000      # Payments made
    remaining: 960000
    percentComplete: 30

  costPerArea:
    grossArea: 1000    # €/m² (1,800,000 / 1,800m²)
    usableArea: 1111   # €/m² (1,800,000 / 1,620m²)

  _meta:
    confidence: "estimated"
    source: "quantity_surveyor_estimate"
    sourceRef: "QS-2026-02-20-v2.xlsx"
    estimateDate: "2026-02-20"
    estimateClass: "Class 2 (Budget estimate, -10% to +15%)"

# NEW v0.4: Simulation Strategy
simulationStrategy:
  energyModeling:
    required: true
    tool: "EnergyPlus"
    version: "23.1"
    phases:
      - phase: "design_development"
        status: "completed"
        completionDate: "2025-11-15"
        result: "45 kWh/m²/year heating demand"
      - phase: "construction_documentation"
        status: "completed"
        completionDate: "2026-02-10"
        result: "Confirmed 45 kWh/m²/year, Energy class B"
    weatherFile: "POL_Warsaw_123750_IWEC.epw"

  daylightAnalysis:
    required: true
    tool: "DIVA"
    version: "5.0"
    phases:
      - phase: "schematic_design"
        status: "completed"
        completionDate: "2025-09-20"
        result: "All units meet DF ≥2.0%"
      - phase: "design_development"
        status: "completed"
        completionDate: "2026-01-15"
        result: "Detailed per-room analysis, 18/18 units compliant"
    standard: "EN 17037:2018"

  thermalComfort:
    required: true
    tool: "EnergyPlus + ASHRAE 55"
    phases:
      - phase: "design_development"
        status: "completed"
        completionDate: "2025-12-01"
        result: "All spaces meet PMV ±0.5, PPD <10%"

  acousticModeling:
    required: true
    tool: "CadnaA"
    phases:
      - phase: "design_development"
        status: "completed"
        completionDate: "2025-11-30"
        result: "Facade Rw ≥36 dB, party walls Rw ≥52 dB"

  cfdAnalysis:
    required: false
    reason: "Standard residential, no special ventilation requirements"

  structuralAnalysis:
    required: true
    tool: "Robot Structural Analysis"
    phases:
      - phase: "design_development"
        status: "completed"
        completionDate: "2025-10-30"
      - phase: "construction_documentation"
        status: "completed"
        completionDate: "2026-02-15"

  fireSmoke:
    required: false
    reason: "Standard egress design, no performance-based approach needed"

# NEW v0.4: BIM Integration Configuration
bimIntegration:
  ifc:
    enabled: true
    version: "IFC4"
    lod: "LOD_400"

    models:
      - discipline: "architecture"
        file: "bim/green-terrace/green-terrace-architecture.ifc"
        status: "current"
        lastExport:
          date: "2026-02-27T10:00:00Z"
          software: "Revit 2025"
          exportedBy: "anna.nowak@architecture.pl"

      - discipline: "structure"
        file: "bim/green-terrace/green-terrace-structure.ifc"
        status: "current"
        lastExport:
          date: "2026-02-26T15:30:00Z"
          software: "Revit 2025"
          exportedBy: "piotr.kowalski@structure.pl"

      - discipline: "mep"
        file: "bim/green-terrace/green-terrace-mep.ifc"
        status: "current"
        lastExport:
          date: "2026-02-25T14:00:00Z"
          software: "Revit 2025"
          exportedBy: "jan.wisniewski@mep.pl"

      - discipline: "federated"
        file: "bim/green-terrace/green-terrace-federated.ifc"
        status: "current"
        lastExport:
          date: "2026-02-27T11:00:00Z"
          software: "Solibri Office"
          exportedBy: "anna.nowak@architecture.pl"

    propertyMapping:
      enabled: true
      customPropertySets:
        - "Pset_GreenTerrace_Thermal"
        - "Pset_GreenTerrace_Compliance"
        - "Pset_GreenTerrace_Materials"
        - "Pset_GreenTerrace_Cost"

    validation:
      enabled: true
      lastValidation: "2026-02-27T11:30:00Z"
      tool: "IfcOpenShell + SBM Validator"
      issues: 0
      warnings: 3

  ids:
    enabled: true
    version: "1.0"

    specifications:
      - name: "Green Terrace Thermal Requirements"
        file: "requirements/thermal-requirements.ids"
        status: "active"
        requirements: 15

      - name: "Green Terrace Fire Safety"
        file: "requirements/fire-safety.ids"
        status: "active"
        requirements: 8

      - name: "Green Terrace Accessibility"
        file: "requirements/accessibility.ids"
        status: "active"
        requirements: 12

    validationResults:
      lastRun: "2026-02-27T12:00:00Z"
      totalRequirements: 35
      passed: 35
      failed: 0
      warnings: 0

  bcf:
    enabled: true
    version: "3.0"

    topics:
      open: 0
      resolved: 147
      total: 147

    lastSync: "2026-02-27T12:30:00Z"

    categories:
      - name: "Thermal Performance"
        open: 0
        resolved: 22
      - name: "Fire Safety"
        open: 0
        resolved: 15
      - name: "Accessibility"
        open: 0
        resolved: 8
      - name: "Coordination"
        open: 0
        resolved: 102

  collaboration:
    platform: "BIM 360"
    modelCoordination: "weekly"
    clashDetection:
      frequency: "weekly"
      lastRun: "2026-02-26"
      clashes:
        critical: 0
        major: 0
        minor: 2

    designReviews:
      frequency: "bi-weekly"
      participants:
        - "Architecture"
        - "Structure"
        - "MEP"
        - "Client"
        - "Contractor"

# Regulatory Compliance
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    articles: ["Art. 5", "Art. 20", "Art. 34"]
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
  - standard: "PN-EN_1996"
  - standard: "PN-EN_1992"

# BIM Configuration
bimLOD: "LOD_400"

# Metadata
lastReviewed: "2026-02-27"
authors:
  - name: "Anna Nowak"
    role: "lead_architect"
    license: "IARP 5678"
  - name: "Piotr Kowalski"
    role: "structural_engineer"
    license: "PZITB 1234"
  - name: "Jan Wiśniewski"
    role: "mep_engineer"
    license: "PZITB 5678"

changelog:
  - version: "0.4.0"
    date: "2026-02-27"
    description: "Updated to SBM v0.4.0 with budget tracking, simulation strategy, and comprehensive BIM integration configuration"
  - version: "2.0.0"
    date: "2026-02-20"
    description: "Construction documentation phase update"
  - version: "1.0.0"
    date: "2025-06-01"
    description: "Initial project specification"
---

# Project Specification: Residential Building "Green Terrace"

## 1. Project Overview

### 1.1 General Information

**Project Name:** Residential Building "Green Terrace"
**Location:** ul. Słoneczna 45, 02-495 Warsaw, Poland
**Plot Area:** 1,250 m²
**Building Footprint:** 450 m²

**Owner:** Green Development Sp. z o.o.
**Lead Architect:** Anna Nowak, IARP #5678
**Structural Engineer:** Piotr Kowalski, PZITB #1234

### 1.2 Building Data

| Parameter | Value | Unit |
|-----------|-------|------|
| **Building Height** | 18.5 | m |
| **Number of Stories** | 6 | - |
| **Gross Floor Area** | 1,800 | m² |
| **Usable Area** | 1,620 | m² |
| **Dwelling Units** | 18 | apartments |
| **Estimated Occupants** | 54 | persons |
| **Parking Spaces** | 22 | (2 accessible) |

### 1.3 SBM v0.4 Features Summary

**✅ Budget & Cost Tracking**
- **Total Budget:** €1,800,000 (€1,000/m² gross area)
- **Contingency:** €90,000 (5%)
- **Forecast:** €1,750,000 (2.8% under budget) ✅
- **Status:** On track - 30% complete, €540,000 spent

**✅ Simulation Strategy**
- **Energy:** EnergyPlus - 45 kWh/m²/year ✅ COMPLIANT
- **Daylighting:** DIVA - 18/18 units meet DF ≥2.0% ✅ COMPLIANT
- **Thermal Comfort:** All spaces PMV ±0.5 ✅ COMPLIANT
- **Acoustic:** Facade Rw ≥36 dB, Party walls Rw ≥52 dB ✅ COMPLIANT

**✅ BIM Integration**
- **IFC Models:** 4 models (architecture, structure, MEP, federated) - LOD 400
- **IDS Validation:** 35/35 requirements passed ✅
- **BCF Issues:** 0 open, 147 resolved ✅
- **Clash Detection:** 0 critical, 0 major, 2 minor ✅

### 1.4 Building Classification

**Per Prawo budowlane:**
- **Category:** A - Residential
- **Type:** Multi-family residential building
- **Height Category:** Mid-rise (12-25m)
- **Fire Safety Class:** ZL III

---

## 2. Regulatory Framework

### 2.1 Applicable Regulations

**Primary Regulations:**

- **Prawo budowlane** (Construction Law, Dz.U. 1994 Nr 89 poz. 414)
  - Art. 5 - General requirements
  - Art. 20 - Technical documentation requirements
  - Art. 34 - Design documentation content
  - Art. 41 - Construction execution
  - Art. 57 - Building completion

- **WT 2021** (Technical Conditions)
  - § 328 - Thermal insulation requirements
  - § 234 - Fire safety requirements
  - § 55 - Accessibility requirements
  - § 206 - Sanitary facilities
  - § 132 - Room heights

### 2.2 Technical Standards

**European Standards (PN-EN):**
- PN-EN 1996 - Design of masonry structures
- PN-EN 1992 - Design of concrete structures
- PN-EN ISO 6946 - Thermal performance calculation
- PN-EN 13501 - Fire classification

**ISO Standards:**
- PN-ISO 9001 - Quality management
- PN-ISO 19650 - BIM information management

---

## 3. Design Description

### 3.1 Architectural Concept

**Design Intent:**
Contemporary residential building with focus on:
- Energy efficiency
- Natural light
- Green terraces on upper floors
- Accessible design for all users

**Façade Composition:**
- Warm gray brick cladding
- Large windows for natural light
- Integrated balconies
- Green terrace on 6th floor

### 3.2 Structural System

**Foundation:**
- Reinforced concrete strip footings
- Depth: 1.8m below grade
- Bearing capacity: 250 kPa
- Foundation design per PN-EN 1997

**Load-Bearing System:**
- Reinforced concrete walls (200mm)
- Reinforced concrete floor slabs (200mm)
- Design per PN-EN 1992-1-1

**Roof:**
- Flat roof with parapet
- Green roof system (extensive)
- Waterproofing: PVC membrane

### 3.3 Building Envelope

**External Walls:**
- Type A: Insulated masonry system
- Total thickness: 447.5mm
- U-value: 0.18 W/(m²·K)
- Fire rating: REI 60
- See [External Wall Type A specification](external-wall-type-a.md)

**Roof:**
- Green roof assembly
- U-value: 0.14 W/(m²·K)
- Waterproofing + insulation + drainage + vegetation

**Ground Floor:**
- Insulated concrete slab on ground
- U-value: 0.28 W/(m²·K)

**Windows:**
- Type A: PVC frames, double glazing
- Uw = 0.85 W/(m²·K)
- See Window Type A specification

### 3.4 Apartment Layout

**Unit Mix:**
- 6× One-bedroom apartments (45 m² each)
- 9× Two-bedroom apartments (65 m² each)
- 3× Three-bedroom apartments (85 m² each)

**All apartments include:**
- Living room with kitchen
- Bedroom(s)
- Bathroom
- Balcony or terrace access

---

## 4. Technical Systems

### 4.1 HVAC System

**Heating:**
- District heating connection
- Individual apartment metering
- Underfloor heating in bathrooms
- Radiators in other rooms

**Ventilation:**
- Mechanical ventilation with heat recovery (MVHR)
- Supply and extract in each apartment
- Heat recovery efficiency: 85%

**Cooling:**
- Passive cooling via night ventilation
- Optional split units (prepared installation)

### 4.2 Plumbing

**Water Supply:**
- Municipal water connection
- Individual apartment metering
- Hot water: Central gas boiler

**Sanitary Drainage:**
- Gravity drainage system
- Connection to municipal sewage

**Stormwater:**
- Green roof retention
- Overflow to municipal storm system

### 4.3 Electrical

**Power Supply:**
- 3-phase 400V connection
- Main switchboard in basement
- Sub-panels per floor

**Lighting:**
- LED lighting throughout
- Daylight and motion sensors in common areas

**Low Voltage:**
- Structured cabling (Cat 6)
- Fiber optic to each apartment
- Video intercom system

---

## 5. Regulatory Compliance

### 5.1 Thermal Performance (WT 2021 § 328)

All envelope elements meet or exceed requirements:

| Element | U-value | Required | Status |
|---------|---------|----------|--------|
| External walls | 0.18 W/(m²·K) | ≤ 0.20 | ✅ Compliant |
| Roof | 0.14 W/(m²·K) | ≤ 0.15 | ✅ Compliant |
| Ground floor | 0.28 W/(m²·K) | ≤ 0.30 | ✅ Compliant |
| Windows | 0.85 W/(m²·K) | ≤ 0.90 | ✅ Compliant |
| Entrance door | 1.20 W/(m²·K) | ≤ 1.30 | ✅ Compliant |

**Energy Performance:**
- Annual heating demand: 45 kWh/(m²·year)
- Energy class: B

### 5.2 Fire Safety (WT 2021 § 234)

Building height 18.5m requires:

| Element | Required Rating | Designed | Status |
|---------|----------------|----------|--------|
| Load-bearing walls | REI 60 | REI 90 | ✅ Compliant |
| Floor slabs | REI 60 | REI 90 | ✅ Compliant |
| Staircase enclosure | REI 60 | REI 120 | ✅ Compliant |

**Fire Safety Features:**
- Two independent escape routes
- Protected staircase with fire doors
- Smoke extraction in corridors
- Fire detection and alarm system

### 5.3 Accessibility (WT 2021 § 55)

**Universal Design Features:**
- ✅ Level entrance from street
- ✅ Elevator to all floors (110×145 cm cabin)
- ✅ Corridor width: 140 cm minimum
- ✅ Doorway width: 95 cm clear
- ✅ Accessible parking: 2 spaces (360 cm wide)
- ✅ Accessible WC on ground floor

**Elevator:**
- Manufacturer: KONE
- Type: MonoSpace 500
- Capacity: 630 kg (8 persons)
- Speed: 1.0 m/s

### 5.4 Room Requirements

**Heights (WT 2021 § 132):**
- Living rooms: 2.70m ✅ (min 2.50m)
- Bedrooms: 2.70m ✅ (min 2.50m)
- Kitchens: 2.50m ✅ (min 2.20m)
- Bathrooms: 2.40m ✅ (min 2.20m)

**Sanitary Facilities (WT 2021 § 206):**
Per apartment:
- ✅ 1× WC with mechanical ventilation
- ✅ 1× Bathroom with mechanical ventilation
- ✅ Kitchen with mechanical ventilation

---

## 6. BIM Integration

### 6.1 IFC Model Information

**IFC Version:** IFC 4.0
**LOD (Level of Development):** LOD 400
**Model Organization:**
- IfcBuilding: "GreenTerrace"
- IfcBuildingStorey: Floors 0-6
- IfcSpace: Individual rooms
- IfcBuildingElement: Walls, slabs, etc.

**Key IFC Entities:**
- IfcWallStandardCase - External and internal walls
- IfcSlabStandardCase - Floor slabs
- IfcWindow - Windows
- IfcDoor - Doors
- IfcColumn - Structural columns
- IfcStair - Staircases

### 6.2 Property Sets

All elements include:
- **Pset_WallCommon** - Wall properties
- **Pset_SlabCommon** - Slab properties
- **Pset_WindowCommon** - Window properties
- **Qto_*BaseQuantities** - Quantity takeoffs

**Custom Property Sets:**
- Pset_GreenTerrace_Thermal - Thermal performance data
- Pset_GreenTerrace_Compliance - Regulatory compliance
- Pset_GreenTerrace_Materials - Material specifications

### 6.3 Model Files (UPDATED v0.4)

**Location:** `/bim/green-terrace/`

| File | Discipline | Status | Last Export | LOD |
|------|------------|--------|-------------|-----|
| `green-terrace-architecture.ifc` | Architecture | ✅ Current | 2026-02-27 | 400 |
| `green-terrace-structure.ifc` | Structure | ✅ Current | 2026-02-26 | 400 |
| `green-terrace-mep.ifc` | MEP | ✅ Current | 2026-02-25 | 400 |
| `green-terrace-federated.ifc` | Federated | ✅ Current | 2026-02-27 | 400 |

### 6.4 IDS Validation (NEW v0.4)

**IDS (Information Delivery Specification)** - Machine-checkable requirements

| Specification | Requirements | Status |
|--------------|--------------|--------|
| Thermal Requirements | 15 | ✅ 15/15 passed |
| Fire Safety | 8 | ✅ 8/8 passed |
| Accessibility | 12 | ✅ 12/12 passed |
| **Total** | **35** | **✅ 35/35 passed** |

**Last validation:** 2026-02-27 12:00:00
**Tool:** IfcOpenShell + SBM IDS Validator

**Example IDS checks:**
- All external walls have U-value ≤0.20 W/(m²·K) ✅
- All load-bearing walls have fire rating ≥REI 60 ✅
- All apartment doors have clear width ≥95 cm ✅
- All corridors have width ≥140 cm ✅

### 6.5 BCF Issue Tracking (NEW v0.4)

**BCF (BIM Collaboration Format)** - Issue tracking system

| Category | Open | Resolved | Total |
|----------|------|----------|-------|
| Thermal Performance | 0 | 22 | 22 |
| Fire Safety | 0 | 15 | 15 |
| Accessibility | 0 | 8 | 8 |
| Coordination (clashes) | 0 | 102 | 102 |
| **Total** | **0** | **147** | **147** |

**Status:** ✅ **All issues resolved**
**Last sync:** 2026-02-27 12:30:00

### 6.6 Clash Detection

**Frequency:** Weekly
**Last run:** 2026-02-26
**Tool:** Solibri Office + Navisworks

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 0 | ✅ Clear |
| Major | 0 | ✅ Clear |
| Minor | 2 | ⏳ Tracked |

**Minor clashes:**
1. Electrical conduit/structural beam clearance (basement) - Under review
2. HVAC duct/sprinkler head spacing (Level 3) - Resolved in model, pending sync

---

## 7. Sustainability

### 7.1 Energy Efficiency

- Heating demand: 45 kWh/(m²·year)
- Primary energy: 85 kWh/(m²·year)
- Energy class: B
- MVHR system: 85% heat recovery

### 7.2 Green Features

- Green roof (extensive): 450 m²
- Rainwater retention: 50 m³
- Native plant species
- Biodiversity enhancement

### 7.3 Materials

- Low-VOC materials
- Recycled content where possible
- Locally sourced materials preference

---

## 8. Construction Schedule

| Phase | Duration | Dates |
|-------|----------|-------|
| **Excavation & Foundation** | 6 weeks | Mar-Apr 2025 |
| **Structure (to roof)** | 20 weeks | Apr-Sep 2025 |
| **Building envelope** | 12 weeks | Sep-Nov 2025 |
| **MEP rough-in** | 8 weeks | Oct-Nov 2025 |
| **Finishes** | 12 weeks | Dec 2025-Feb 2026 |
| **Commissioning** | 4 weeks | Feb 2026 |
| **Completion** | - | Mar 2026 |

**Total Duration:** 52 weeks

---

## 9. Budget & Cost Tracking (NEW v0.4)

### 9.1 Budget Breakdown

| Category | Budget | % | Forecast | Variance |
|----------|--------|---|----------|----------|
| **Foundation & structure** | €540,000 | 30% | €530,000 | -€10,000 ✅ |
| **Building envelope** | €360,000 | 20% | €355,000 | -€5,000 ✅ |
| **MEP systems** | €450,000 | 25% | €445,000 | -€5,000 ✅ |
| **Finishes** | €270,000 | 15% | €265,000 | -€5,000 ✅ |
| **External works** | €90,000 | 5% | €90,000 | €0 |
| **Contingency** | €90,000 | 5% | €65,000 | -€25,000 ✅ |
| **Total** | **€1,800,000** | **100%** | **€1,750,000** | **-€50,000** ✅ |

**Cost per m²:**
- Gross area (1,800 m²): €1,000/m²
- Usable area (1,620 m²): €1,111/m²

### 9.2 Budget Status (as of 2026-02-27)

| Item | Amount | % of Budget |
|------|--------|-------------|
| **Total Budget** | €1,800,000 | 100% |
| **Committed (contracts)** | €850,000 | 47.2% |
| **Spent (payments)** | €540,000 | 30.0% |
| **Remaining** | €960,000 | 53.3% |
| **Forecast Total** | €1,750,000 | 97.2% |
| **Expected Savings** | €50,000 | 2.8% ✅ |

**Status:** ✅ **ON TRACK** - Project trending 2.8% under budget

**Estimate Accuracy:** Class 2 (Budget estimate, -10% to +15%)
**Source:** Quantity Surveyor Estimate (2026-02-20)

---

## 10. Simulation Strategy & Results (NEW v0.4)

### 10.1 Energy Modeling

**Tool:** EnergyPlus v23.1 | **Weather:** POL_Warsaw_123750_IWEC.epw

| Phase | Status | Completion | Result |
|-------|--------|------------|--------|
| Design Development | ✅ Complete | 2025-11-15 | 45 kWh/m²/year heating demand |
| Construction Docs | ✅ Complete | 2026-02-10 | Confirmed 45 kWh/m²/year, **Energy Class B** |

**Performance:**
- Annual heating demand: 45 kWh/(m²·year) ✅
- Annual cooling demand: 15 kWh/(m²·year) ✅
- Primary energy: 85 kWh/(m²·year) ✅
- Energy class: **B** ✅

### 10.2 Daylighting Analysis

**Tool:** DIVA v5.0 | **Standard:** EN 17037:2018

| Phase | Status | Completion | Result |
|-------|--------|------------|--------|
| Schematic Design | ✅ Complete | 2025-09-20 | All units meet DF ≥2.0% |
| Design Development | ✅ Complete | 2026-01-15 | 18/18 units compliant (detailed analysis) |

**Results:**
- All 18 dwelling units meet daylight factor ≥2.0% ✅
- Spatial Daylight Autonomy (sDA) >75% in living spaces ✅
- Annual Sunlight Exposure (ASE) <10% (glare control) ✅

### 10.3 Thermal Comfort

**Tool:** EnergyPlus + ASHRAE 55 | **Status:** ✅ Complete (2025-12-01)

**Results:**
- All spaces meet PMV ±0.5 (Predicted Mean Vote) ✅
- All spaces meet PPD <10% (Predicted Percentage Dissatisfied) ✅
- Operative temperature 20-26°C maintained year-round ✅

### 10.4 Acoustic Modeling

**Tool:** CadnaA | **Status:** ✅ Complete (2025-11-30)

**Results:**
- Facade sound insulation: Rw ≥36 dB ✅ (requirement: 36 dB)
- Party walls: Rw ≥52 dB ✅ (requirement: 50 dB)
- Impact sound: Ln,w ≤58 dB ✅ (requirement: 58 dB)

### 10.5 Structural Analysis

**Tool:** Robot Structural Analysis | **Status:** ✅ Complete (2026-02-15)

**Results:**
- All structural elements within code limits (PN-EN 1992) ✅
- Deflections within acceptable limits ✅
- Foundation bearing capacity verified ✅

### 10.6 Simulation Summary

| Simulation Type | Tool | Status | Compliance |
|----------------|------|--------|------------|
| Energy | EnergyPlus | ✅ Complete | ✅ Energy Class B |
| Daylighting | DIVA | ✅ Complete | ✅ 18/18 units compliant |
| Thermal Comfort | EnergyPlus/ASHRAE 55 | ✅ Complete | ✅ PMV/PPD compliant |
| Acoustic | CadnaA | ✅ Complete | ✅ All requirements met |
| Structural | Robot | ✅ Complete | ✅ Code compliant |

**All simulations complete and compliant** ✅

---

## 11. Related Documentation

- [External Wall Type A →](external-wall-type-a.md)
- Floor Slab Type A
- Window Type A
- Materials Specification
- Compliance Checklist

---

## 12. Approvals

| Role | Name | License | Signature | Date |
|------|------|---------|-----------|------|
| **Lead Architect** | Anna Nowak | IARP #5678 | [Digital] | 2026-02-27 |
| **Structural Engineer** | Piotr Kowalski | PZITB #1234 | [Digital] | 2026-02-27 |
| **MEP Engineer** | Jan Wiśniewski | PZITB #5678 | [Digital] | 2026-02-27 |
| **Client Approval** | Green Development | - | [Digital] | 2026-02-27 |

---

## SBM v0.4 Summary

**Document Version:** v0.4.0
**Last Updated:** 2026-02-27
**Status:** Construction Documentation (LOD 400)

### New v0.4 Features

**✅ Budget & Cost Tracking**
- Total budget: €1,800,000 (€1,000/m² gross)
- Forecast: €1,750,000 (2.8% under budget)
- Status: On track - 30% complete, €540k spent
- Cost breakdown by category with variance tracking

**✅ Simulation Strategy**
- 5 simulation types completed and compliant
- Energy: 45 kWh/m²/year ✅ Energy Class B
- Daylighting: 18/18 units DF ≥2.0% ✅
- Thermal comfort: PMV/PPD compliant ✅
- Acoustic: All requirements met ✅
- Structural: Code compliant ✅

**✅ BIM Integration**
- 4 IFC models (architecture, structure, MEP, federated) - LOD 400
- IDS validation: 35/35 requirements passed ✅
- BCF tracking: 0 open issues, 147 resolved ✅
- Clash detection: 0 critical, 0 major, 2 minor ✅
- Weekly coordination meetings

### Project Status Dashboard

| Category | Status | Details |
|----------|--------|---------|
| **Budget** | ✅ On track | 2.8% under budget |
| **Schedule** | ✅ On track | 30% complete (foundation/structure phase) |
| **Quality** | ✅ Compliant | All simulations passed |
| **BIM Coordination** | ✅ Clean | 0 critical clashes |
| **Requirements** | ✅ Met | 35/35 IDS checks passed |
| **Issues** | ✅ Clear | 0 open BCF issues |

### Next Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Structure to roof | Sep 2025 | ✅ Complete |
| Building envelope | Nov 2025 | ✅ Complete |
| MEP rough-in | Nov 2025 | ✅ Complete |
| Finishes | Feb 2026 | 🔄 In progress (80%) |
| Commissioning | Feb 2026 | ⏳ Upcoming |
| **Completion** | **Mar 2026** | ⏳ On schedule |

---

**SBM Version:** v0.4.0 - Complete semantic model with cost, performance, simulation, and BIM integration
**Build Status:** ✅ All validations passed
**Compliance:** ✅ All regulatory requirements met
