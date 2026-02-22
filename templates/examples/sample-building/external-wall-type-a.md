---
documentType: "element_specification"
elementType: "external_wall"
elementReference: "EW-01"
projectName: "Residential Building Green Terrace"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
  materialLayerSet: "ExternalWall_TypeA_Layers"
bimLOD: "LOD_400"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Safe and durable construction"
    status: "compliant"
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Complete technical specification"
    status: "compliant"
  - standard: "WT_2021"
    section: "§ 328"
    requirement: "U-value ≤ 0.20 W/(m²·K)"
    status: "compliant"
  - standard: "WT_2021"
    section: "§ 234"
    requirement: "Fire rating REI 60 (building height 18.5m)"
    status: "compliant"
  - standard: "PN-EN_1996"
    description: "Masonry structures design"
    status: "verified"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  unit: "W/(m²·K)"
  status: "compliant"
  margin: 0.02
  calculationMethod: "PN-EN ISO 6946"
fireResistance:
  requiredRating: "REI 60"
  designRating: "REI 90"
  testCertificate: "FR2024-1234"
  status: "compliant"
acousticPerformance:
  soundInsulation: 55
  unit: "dB"
  testCertificate: "AC2024-5678"
version: "1.5.0"
lastReviewed: "2026-02-20"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# External Wall - Type A

## 1. Element Overview

**Element Reference:** EW-01
**Element Type:** External load-bearing wall
**Location:** All exterior facades
**Typical Height:** 2.70m (floor-to-ceiling)
**Total Area:** ~1,245 m²

---

## 2. BIM Information

### 2.1 IFC Mapping

**IFC Entity:** `IfcWallStandardCase`
**Object Type:** ExternalWall_TypeA
**Global ID (GUID):** `3vB2YO$rLBxv3VxEu2LPxQ`
**Material Layer Set:** ExternalWall_TypeA_Layers

**LOD:** 400 (Construction Documentation)

### 2.2 IFC Properties (Pset_WallCommon)

| Property | Value | Unit | Notes |
|----------|-------|------|-------|
| **LoadBearing** | Yes | - | Structural wall |
| **IsExternal** | Yes | - | Building envelope |
| **FireRating** | REI 90 | - | Exceeds REI 60 requirement |
| **ThermalTransmittance** | 0.18 | W/(m²·K) | U-value |
| **AcousticRating** | 55 | dB | Rw |
| **Reference** | EW-01 | - | Type reference |
| **Status** | NEW | - | New construction |
| **ExtendToStructure** | true | - | Extends to slab above |

### 2.3 Quantities (Qto_WallBaseQuantities)

| Property | Value | Unit |
|----------|-------|------|
| **Length** | Varies | m |
| **Width** | 0.4475 | m |
| **Height** | 2.70 | m (typical) |
| **GrossSideArea** | 1,245 | m² (total) |
| **NetSideArea** | 1,050 | m² (openings deducted) |
| **GrossVolume** | 557 | m³ (total) |
| **NetVolume** | 470 | m³ |

---

## 3. Material Layer Specification

### 3.1 Layer Assembly (IfcMaterialLayerSet)

**Total Thickness:** 447.5 mm

| Layer | Material | Thickness | λ [W/(m·K)] | Manufacturer | Product Code |
|-------|----------|-----------|-------------|--------------|--------------|
| **1** | Mineral render | 15 mm | 0.82 | Baumit | MVR Uni |
| **2** | Concrete block (hollow) | 200 mm | 0.55 | Ytong | PP4/0.6 |
| **3** | XPS insulation board | 180 mm | 0.035 | BASF Styrodur | 3035 CS |
| **4** | Ventilated air cavity | 40 mm | - | - | - |
| **5** | Gypsum plasterboard | 12.5 mm | 0.21 | Rigips | RB 12.5mm |

### 3.2 Layer Details

#### Layer 1: External Render

**Product:** Baumit MVR Uni mineral render
**Thickness:** 15mm (±2mm)
**Color:** Warm gray (custom tint)
**Finish:** Scraped texture, 2.0mm grain
**Application:** Two-coat system over mesh
- Base coat: 10mm with embedded mesh
- Finish coat: 5mm

**Properties:**
- Water vapor permeability: sd < 0.5m
- Freeze-thaw resistant
- UV stable

#### Layer 2: Structural Masonry

**Product:** Ytong PP4/0.6 autoclaved aerated concrete blocks
**Dimensions:** 200×240×599 mm (H×W×L)
**Compressive Strength:** 4.0 MPa
**Bulk Density:** 600 kg/m³
**Thermal Conductivity:** λ = 0.55 W/(m·K)

**Mortar:**
- Type: Thin-bed mortar (Ytong)
- Joint thickness: 2-3mm
- Strength class: M5

**Construction:**
- First course: On waterproof DPC
- Vertical joints: Tongue-and-groove (no mortar)
- Horizontal joints: Thin-bed mortar
- Wall ties: Stainless steel, 4/m²

#### Layer 3: Thermal Insulation

**Product:** BASF Styrodur 3035 CS extruded polystyrene (XPS)
**Thickness:** 180mm (2× 90mm layers, staggered joints)
**Thermal Conductivity:** λD = 0.035 W/(m·K)
**Compressive Strength:** 300 kPa
**Water Absorption:** < 0.7% by volume

**Fixings:**
- Type: Fischer DIPK 8/60-90 insulation anchors
- Density: 6 fixings per m²
- Additional: Adhesive (2-3 dabs per board)

**Installation:**
- Stagger joints vertically and horizontally
- Tight-fitting, no gaps
- Cut boards, not compressed

#### Layer 4: Ventilated Air Cavity

**Width:** 40mm
**Type:** Ventilated cavity
**Function:**
- Moisture drainage
- Pressure equalization
- Ventilation

**Vents:**
- Bottom: Open weep holes, 10mm dia., 450mm c/c
- Top: Continuous vent strip under eaves

#### Layer 5: Interior Finish

**Product:** Rigips RB standard gypsum plasterboard
**Thickness:** 12.5mm
**Dimensions:** 1,200×2,600 mm sheets

**Mounting:**
- Adhesive dabs (Rigips Rimano) to blockwork
- 300mm spacing vertically and horizontally
- Joints: Taped and jointed (Rigips Vario)

**Finish:**
- Prime: Rigips Latex primer
- Paint: Interior latex (by others)

---

## 4. Performance Specifications

### 4.1 Thermal Performance

**Calculation per PN-EN ISO 6946:**

| Layer | Material | d [m] | λ [W/(m·K)] | R [m²·K/W] |
|-------|----------|-------|-------------|------------|
| Rsi | Internal surface | - | - | 0.13 |
| 5 | Gypsum board | 0.0125 | 0.21 | 0.06 |
| 4 | Air cavity | 0.040 | - | 0.18 |
| 3 | XPS insulation | 0.180 | 0.035 | 5.14 |
| 2 | Concrete block | 0.200 | 0.55 | 0.36 |
| 1 | Mineral render | 0.015 | 0.82 | 0.02 |
| Rse | External surface | - | - | 0.04 |
| **Total** | | | **RT** | **5.93** |

**U-value:** U = 1 / RT = **0.17 W/(m²·K)**

**Compliance:**
- **Calculated:** 0.17 W/(m²·K)
- **Design (with safety margin):** 0.18 W/(m²·K)
- **Required (WT § 328):** ≤ 0.20 W/(m²·K)
- **Status:** ✅ **Compliant** (margin: 0.02 W/(m²·K))

**Thermal Bridge Mitigation:**
- Continuous insulation layer
- No penetrations through insulation
- Window installation in insulation plane
- Foundation transition detail: See DT-001

### 4.2 Fire Resistance

**Required Rating (WT § 234):** REI 60 (building height 18.5m)
**Design Rating:** REI 90

**Material Fire Classification:**

| Layer | Material | Euroclass | Contribution |
|-------|----------|-----------|--------------|
| 1 | Mineral render | A1 | Non-combustible |
| 2 | AAC blocks | A1 | Non-combustible |
| 3 | XPS insulation | E | Combustible (protected) |
| 5 | Gypsum board | A2-s1,d0 | Non-combustible |

**Fire Test:**
- Certificate: FR2024-1234
- Test standard: PN-EN 13501-2
- Test date: 2024-06-15
- Result: REI 90

**Fire Barriers:**
- Cavity barriers at each floor level
- Firestop sealant at penetrations

### 4.3 Acoustic Performance

**Sound Insulation:** Rw = 55 dB

**Measurement:**
- Test standard: PN-EN ISO 140-3
- Test certificate: AC2024-5678
- Test date: 2024-07-20

**Contributing Factors:**
- Mass of masonry layer: 120 kg/m²
- Air cavity: Decoupling
- Multiple layers: Sound absorption

### 4.4 Moisture Control

**Water Penetration:**
- Rain screen principle
- Ventilated cavity drainage
- Weep holes at base
- Waterproof DPC at foundation

**Vapor Control:**
- Diffusion-open exterior (render, sd < 0.5m)
- Diffusion calculation per PN-EN ISO 13788
- No condensation risk
- Glaser diagram: Available in calculations folder

**Airtightness:**
- Target: 0.6 ACH @ 50 Pa (passive house standard)
- Continuous air barrier: Interior plaster + sealed joints
- Penetrations: Sealed with expanding foam + tape

---

## 5. Construction Details

### 5.1 Connections

**Wall-to-Foundation:**
- Detail: DT-001
- DPC: Bitumen membrane, lapped 150mm
- Starter course: Level on mortar bed
- Insulation: Continuous to foundation insulation

**Wall-to-Floor Slab:**
- Detail: DT-002
- Bearing: Full width of block (200mm)
- Fire barrier: At cavity, each floor
- Acoustic isolation: Resilient strip under slab

**Wall-to-Roof:**
- Detail: DT-003
- Parapet height: 600mm above roof
- Coping: Aluminum, sloped
- Flashing: Under coping, over insulation

**Corners:**
- Detail: DT-004
- Masonry: Interlocking bond
- Insulation: Continuous, wrapped corners
- Render mesh: Wrapped corners + corner bead

**Window Integration:**
- Detail: DT-005, DT-006, DT-007
- Sill: Sloped precast concrete
- Jamb: Window frame in insulation plane
- Head: Precast lintel, thermally broken

### 5.2 Installation Sequence

1. **Prepare substrate**
   - Clean foundation top
   - Install DPC membrane
   - Level mortar bed (if needed)

2. **Masonry construction**
   - Lay first course: Check level and plumb
   - Subsequent courses: Thin-bed mortar
   - Install wall ties at 4/m²
   - Window/door lintels: As per structural drawings

3. **Insulation installation**
   - Clean masonry surface
   - Apply adhesive dabs
   - Install first layer: Stagger joints
   - Install second layer: Offset joints from first
   - Mechanical fasteners: 6/m²
   - Cut tight to openings

4. **Render base coat**
   - Mesh: Embedded in base coat
   - Thickness: 10mm
   - Cure: Minimum 48 hours

5. **Render finish coat**
   - Thickness: 5mm
   - Texture: Scraped, 2.0mm
   - Cure: Per manufacturer

6. **Interior finish**
   - Plasterboard: Adhesive dabs
   - Joint treatment
   - Prime and paint (by others)

### 5.3 Quality Control

**Inspections Required:**

| Stage | Inspection | Requirement | Responsible |
|-------|------------|-------------|-------------|
| Foundation | DPC installation | Continuous, lapped | Site supervisor |
| Masonry | Plumb and alignment | ±5mm in 3m | Site engineer |
| Masonry | Mortar joints | 2-3mm thickness | Site supervisor |
| Insulation | Continuous layer | No gaps > 2mm | Thermal specialist |
| Insulation | Fixings | 6/m², flush mounted | Site supervisor |
| Render | Thickness | 15mm ±2mm | Applicator |
| Airtightness | Blower door test | ≤ 0.6 ACH @ 50 Pa | Testing company |

**Testing:**
- Thermal imaging: After insulation, before render
- Blower door test: Before interior finishes
- Visual inspection: Each stage

---

## 6. Regulatory Compliance Summary

| Requirement | Standard | Required Value | Design Value | Status |
|-------------|----------|----------------|--------------|--------|
| **Thermal insulation** | WT § 328 | U ≤ 0.20 W/(m²·K) | U = 0.18 W/(m²·K) | ✅ Compliant |
| **Fire resistance** | WT § 234 | REI 60 | REI 90 | ✅ Compliant |
| **Acoustic insulation** | PN-B-02151 | Rw ≥ 50 dB | Rw = 55 dB | ✅ Compliant |
| **Structural design** | PN-EN 1996 | Verified | Verified | ✅ Compliant |
| **Moisture control** | PN-EN ISO 13788 | No condensation | No condensation | ✅ Compliant |

---

## 7. Sustainability

**Environmental Performance:**
- Embodied carbon: 85 kg CO₂e/m²
- Recyclable content: 40% (AAC, XPS)
- Local materials: Blocks (Poland), Insulation (Germany)

**Service Life:**
- Design life: 50+ years
- Render: 25 years (maintenance at 15 years)
- Insulation: Life of building
- Blocks: Life of building

**Maintenance:**
- Visual inspection: Annual
- Render: Every 5 years
- Major refurbishment: 25-30 years

---

## 8. Cost Estimate

| Item | Quantity | Unit | Rate | Cost |
|------|----------|------|------|------|
| **Masonry** | 560 m² | m² | €45 | €25,200 |
| **Insulation** | 1,245 m² | m² | €35 | €43,575 |
| **Render** | 1,245 m² | m² | €55 | €68,475 |
| **Interior finish** | 1,245 m² | m² | €25 | €31,125 |
| **Lintels & misc** | 1 | lot | €15,000 | €15,000 |
| **Subtotal** | | | | **€183,375** |
| **Contingency (5%)** | | | | €9,169 |
| **Total** | | | | **€192,544** |

**Cost per m²:** €155/m² (gross wall area)

---

## 9. Related Documents

**Drawings:**
- A-101: Floor plans
- A-201: Elevations
- A-301: Sections
- A-401: Wall details DT-001 through DT-007

**Specifications:**
- [Project Specification](project-specification.md)
- [Materials Specification](materials.md)
- [Window Type A](window-type-a.md)

**Calculations:**
- TC-01: Thermal performance calculation
- SC-01: Structural capacity calculation
- MC-01: Moisture analysis (Glaser diagram)

**Certificates:**
- FR2024-1234: Fire resistance test
- AC2024-5678: Acoustic performance test

**BIM Model:**
- `/bim/green-terrace/green-terrace-architecture.ifc`

---

## 10. Approvals

| Role | Name | License | Signature | Date |
|------|------|---------|-----------|------|
| **Architect** | Anna Nowak | IARP #5678 | [Digital] | 2026-02-20 |
| **Structural Engineer** | Piotr Kowalski | PZITB #1234 | [Digital] | 2026-02-20 |

---

**Document Version:** 1.5.0
**Last Updated:** 2026-02-20
**BIM LOD:** 400
**Status:** Construction Documentation
