---
documentType: "project_specification"
projectName: "Residential Building Green Terrace"
projectLocation: "Warsaw, Poland"
projectPhase: "construction_documentation"
buildingClassification:
  category: "A"
  type: "residential_multi_family"
  description: "Apartment building"
buildingData:
  height: 18.5
  floors: 6
  grossFloorArea: 1800
  usableArea: 1620
  dwellingUnits: 18
  estimatedOccupants: 54
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    articles: ["Art. 5", "Art. 20", "Art. 34"]
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
  - standard: "PN-EN_1996"
  - standard: "PN-EN_1992"
bimLOD: "LOD_400"
version: "2.0.0"
lastReviewed: "2026-02-20"
authors:
  - name: "Anna Nowak"
    role: "lead_architect"
    license: "IARP 5678"
  - name: "Piotr Kowalski"
    role: "structural_engineer"
    license: "PZITB 1234"
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

### 1.3 Building Classification

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

### 6.3 Model Files

**Location:** `/bim/green-terrace/`
- `green-terrace-architecture.ifc` - Architectural model
- `green-terrace-structure.ifc` - Structural model
- `green-terrace-mep.ifc` - MEP model
- `green-terrace-federated.ifc` - Combined model

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

## 9. Cost Estimate

| Category | Cost | % |
|----------|------|---|
| **Foundation & structure** | €540,000 | 30% |
| **Building envelope** | €360,000 | 20% |
| **MEP systems** | €450,000 | 25% |
| **Finishes** | €270,000 | 15% |
| **External works** | €90,000 | 5% |
| **Contingency** | €90,000 | 5% |
| **Total** | **€1,800,000** | **100%** |

**Cost per m² (gross):** €1,000/m²

---

## 10. Related Documentation

- [External Wall Type A →](external-wall-type-a.md)
- Floor Slab Type A
- Window Type A
- Materials Specification
- Compliance Checklist

---

## 11. Approvals

| Role | Name | License | Signature | Date |
|------|------|---------|-----------|------|
| **Lead Architect** | Anna Nowak | IARP #5678 | [Digital] | 2026-02-20 |
| **Structural Engineer** | Piotr Kowalski | PZITB #1234 | [Digital] | 2026-02-20 |
| **MEP Engineer** | Jan Wiśniewski | PZITB #5678 | [Digital] | 2026-02-20 |
| **Client Approval** | Green Development | - | [Digital] | 2026-02-20 |

---

**Document Version:** 2.0.0
**Last Updated:** 2026-02-20
**Status:** Construction Documentation (LOD 400)
