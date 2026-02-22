---
documentType: "technical_reference"
subject: "BIM_LOD"
standard: "AIA_G202_2013"
lastUpdated: "2026-02-20"
---

# Level of Development (LOD) Definitions

LOD specifications define the level of completeness and detail to which a building element is modeled and documented at various stages of the design and construction process.

## LOD Overview

| LOD | Name | Geometry | Information | Documentation | Typical Phase |
|-----|------|----------|-------------|---------------|---------------|
| **100** | Conceptual | Symbolic | Generic | High-level | Concept Design |
| **200** | Approximate | Approximate size/shape | Generic systems | Type specs | Schematic Design |
| **300** | Precise | Specific size/shape | Specific assemblies | Detailed specs | Design Development |
| **400** | Fabrication | Precise representation | Complete specs | Construction docs | Construction Docs |
| **500** | As-Built | Verified dimensions | Verified data | As-built records | Post-Construction |

---

## LOD 100 - Conceptual

### Description

Elements are modeled as **symbols or generic placeholders** representing the existence and approximate location of building components.

### Characteristics

**Geometry:**
- Symbolic or generic representation
- Not to scale
- Approximate location and orientation
- Simple volumes or 2D symbols

**Information:**
- Generic information only
- No specific properties
- Cost estimates based on area/volume
- Conceptual parameters

### Documentation Requirements

```yaml
bimLOD: "LOD_100"
geometryDetail: "symbolic"
informationDetail: "generic"
```

### Example: Wall at LOD 100

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_100"
projectPhase: "concept_design"
ifcMapping:
  ifcEntity: "IfcWall"
---

## External Wall (Conceptual)

### LOD 100 Information

**Representation:** Generic wall line
**Thickness:** Approximate (400mm typical)
**Height:** Floor-to-floor

**Properties:**
- Type: External wall (insulated)
- Approximate U-value: 0.20 W/(m²·K) (target)
- Cost estimate: €120/m² (indicative)

**Use:** Concept design, massing studies, area calculations
```

### Typical Uses

- Conceptual design
- Massing models
- Area and volume calculations
- High-level cost estimates
- Site planning

---

## LOD 200 - Approximate

### Description

Elements are modeled as **generalized systems or assemblies** with approximate quantities, size, shape, location, and orientation.

### Characteristics

**Geometry:**
- Approximate size and shape
- Correct location and orientation
- Generic representation of type
- Major dimensions indicated

**Information:**
- Generic system type information
- Approximate performance data
- Cost estimates per system type
- Generic material types

### Documentation Requirements

```yaml
bimLOD: "LOD_200"
geometryDetail: "approximate"
informationDetail: "generic_systems"
```

### Example: Wall at LOD 200

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_200"
projectPhase: "schematic_design"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_Generic"
---

## External Wall - Type A (Schematic)

### LOD 200 Information

**Geometry:**
- Thickness: 450mm
- Height: Floor-to-floor (2.70m typical)
- Location: Per design drawings

**Generic Properties:**
| Property | Value | Notes |
|----------|-------|-------|
| Wall type | Insulated masonry | Generic system |
| U-value target | ≤ 0.20 W/(m²·K) | WT 2021 requirement |
| Fire rating | REI 60 | Building code requirement |
| Approximate cost | €180/m² | Including finishes |

**Material concept:**
- Exterior: Rendered finish
- Structure: Masonry
- Insulation: To achieve U-value
- Interior: Plaster finish

**Use:** Schematic design, code compliance review, preliminary cost estimates
```

### Typical Uses

- Schematic design
- Design alternatives comparison
- Code compliance review
- Preliminary cost estimates
- System coordination

---

## LOD 300 - Precise

### Description

Elements are modeled as **specific assemblies** accurate in terms of quantity, size, shape, location, and orientation.

### Characteristics

**Geometry:**
- Specific size, shape, and location
- Correct dimensions
- Actual assembly representation
- Connections and interfaces shown

**Information:**
- Specific product types or assemblies
- Detailed performance data
- Manufacturer information (generic)
- Specific materials and thicknesses

### Documentation Requirements

```yaml
bimLOD: "LOD_300"
geometryDetail: "specific"
informationDetail: "detailed_assemblies"
```

### Example: Wall at LOD 300

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_300"
projectPhase: "design_development"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
---

## External Wall - Type A (Design Development)

### LOD 300 Information

**Geometry:**
- Total thickness: 447.5mm
- Height: 2,700mm (floor-to-ceiling)
- Modeled with accurate geometry

**Material Layers:**

| Layer | Material | Thickness | λ [W/(m·K)] |
|-------|----------|-----------|-------------|
| 1 | Mineral render | 15mm | 0.82 |
| 2 | Concrete block (hollow) | 200mm | 0.55 |
| 3 | XPS insulation board | 180mm | 0.035 |
| 4 | Air cavity (ventilated) | 40mm | - |
| 5 | Gypsum plasterboard | 12.5mm | 0.21 |

**Calculated Performance:**
- U-value: 0.18 W/(m²·K) ✅ (≤ 0.20 required)
- Fire rating: REI 60 ✅
- Acoustic rating: 55 dB

**Openings:**
- Window sills and lintels detailed
- Reveals and jambs specified
- Thermal bridge details shown

**Use:** Design development, detailed cost estimation, permit applications
```

### Typical Uses

- Design development
- Building permit applications
- Detailed cost estimates
- Initial construction planning
- Coordination drawings

---

## LOD 400 - Fabrication

### Description

Elements are modeled with **sufficient detail and accuracy** for fabrication and installation of the component.

### Characteristics

**Geometry:**
- Precise dimensions for fabrication
- Complete assembly details
- All connections detailed
- Shop drawing level detail

**Information:**
- Specific products and manufacturers
- Complete specifications
- Installation details
- Fabrication information
- All required properties

### Documentation Requirements

```yaml
bimLOD: "LOD_400"
geometryDetail: "fabrication"
informationDetail: "complete_specifications"
```

### Example: Wall at LOD 400

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_400"
projectPhase: "construction_documentation"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "WT_2021"
    section: "§ 234"
---

## External Wall - Type A (Construction Documentation)

### LOD 400 Information

**Geometry:**
- Total thickness: 447.5mm (including tolerances)
- Height: 2,700mm floor-to-ceiling
- Complete 3D model with all details

**Material Layers (Specified Products):**

| Layer | Product Specification | Thickness | λ [W/(m·K)] | Supplier |
|-------|----------------------|-----------|-------------|----------|
| 1 | Baumit MVR Uni mineral render | 15mm | 0.82 | Baumit |
| 2 | Ytong PP4/0.6 concrete blocks | 200mm | 0.55 | Ytong |
| 3 | Styrodur 3035 CS XPS boards | 180mm | 0.035 | BASF |
| 4 | Ventilated air cavity | 40mm | - | - |
| 5 | Rigips RB 12.5mm plasterboard | 12.5mm | 0.21 | Rigips |

**Connections:**
- Wall-to-foundation: See detail DT-001
- Wall-to-slab: See detail DT-002
- Wall-to-roof: See detail DT-003
- Corners: See detail DT-004

**Fasteners and Accessories:**
- Insulation fixings: Fischer DIPK 8/60-90
- Render mesh: Baumit StarTex (glass fiber)
- Vapor barrier: Where required per drawings

**Installation Sequence:**
1. Concrete block masonry (mortar: M5)
2. XPS insulation boards (staggered joints)
3. Mechanical fixings
4. Render mesh
5. Base coat
6. Finish coat

**Quality Control:**
- Thermal imaging after insulation
- Blower door test
- Visual inspection per PN-B-10425

**Performance Verification:**
- U-value (calculated): 0.18 W/(m²·K) ✅
- U-value (tested): Per PN-EN ISO 6946
- Fire rating: REI 60 (test cert. #FR2024-1234) ✅
- Acoustic: 55 dB (test cert. #AC2024-5678) ✅

**Use:** Construction documentation, shop drawings, installation, procurement
```

### Typical Uses

- Construction documents
- Shop drawings
- Fabrication
- Procurement (specific products)
- Installation instructions
- Quality control

---

## LOD 500 - As-Built

### Description

Elements are modeled as **verified representations** of the actual constructed conditions, including all modifications made during construction.

### Characteristics

**Geometry:**
- Actual, field-verified dimensions
- As-constructed conditions
- All changes from design documented
- Surveyed or laser-scanned accuracy

**Information:**
- Verified product information
- Actual manufacturers/models installed
- Warranty information
- Maintenance requirements
- Operation data

### Documentation Requirements

```yaml
bimLOD: "LOD_500"
geometryDetail: "as_built_verified"
informationDetail: "verified_complete"
asBuiltVerification:
  method: "field_survey"
  date: "2026-02-15"
  surveyedBy: "Jan Kowalski"
```

### Example: Wall at LOD 500

```markdown
---
documentType: "as_built_documentation"
bimLOD: "LOD_500"
projectPhase: "post_construction"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
asBuiltVerification:
  method: "field_measurement"
  date: "2026-02-15"
  verifiedBy: "Jan Kowalski, architect"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "verified_compliant"
---

## External Wall - Type A (As-Built)

### LOD 500 As-Built Information

**Verification:**
- Survey date: 2026-02-15
- Survey method: Field measurement + thermal imaging
- Verified by: Jan Kowalski, architect (IARP #1234)

**As-Installed Dimensions:**
- Total thickness: 448mm (±2mm variation)
- Height: 2,698mm (actual floor-to-ceiling)
- Area: 1,245 m² (total external wall area)

**As-Installed Materials:**

| Layer | Product Installed | Thickness | Lot/Batch | Install Date |
|-------|------------------|-----------|-----------|--------------|
| 1 | Baumit MVR Uni render | 15mm | Batch #45678 | 2025-11-20 |
| 2 | Ytong PP4/0.6 blocks | 200mm | Lot #YT-2025-234 | 2025-09-15 |
| 3 | Styrodur 3035 CS | 180mm | Batch #ST-45-23 | 2025-10-10 |
| 4 | Air cavity | 40mm | - | - |
| 5 | Rigips RB plasterboard | 12.5mm | Batch #RG-890 | 2025-11-05 |

**Verified Performance:**
- **U-value:** 0.17 W/(m²·K) (thermography test 2026-01-15)
  - Certificate: TH-2026-001
  - Status: ✅ Exceeds requirement (0.20)

- **Fire rating:** REI 60
  - Certificate: FR2024-1234
  - Verification: Visual inspection + cert review

- **Airtightness:**
  - Blower door test: 0.8 ACH @ 50 Pa
  - Date: 2026-01-20
  - Certificate: BD-2026-045

**Deviations from Design:**
- None significant
- Minor: Insulation thickness 180mm actual vs 180mm design (within tolerance)

**Warranties:**
- Render system: 10 years (Baumit warranty #W-2025-8901)
- Insulation: 25 years (BASF product warranty)
- Plasterboard: 2 years (Rigips standard)

**Maintenance Requirements:**
- Visual inspection: Annual
- Render maintenance: Every 5 years
- Expected service life: 50+ years

**Documentation:**
- Construction photos: Folder /photos/walls/
- Test certificates: Folder /certificates/walls/
- Warranty documents: Folder /warranties/

**Use:** Facility management, maintenance planning, renovation planning, warranty claims
```

### Typical Uses

- As-built records
- Facility management (FM) handover
- Operations and maintenance (O&M) manuals
- Future renovation planning
- Warranty management
- Building performance verification

---

## LOD Progression Example

### Wall Type A Through All LODs

| LOD | Thickness | Materials | U-value | Cost | Documentation |
|-----|-----------|-----------|---------|------|---------------|
| **100** | ~400mm | Generic insulated wall | Target: 0.20 | €120/m² | Concept |
| **200** | 450mm | Insulated masonry | ≤0.20 | €180/m² | Schematic |
| **300** | 447.5mm | Specified layers | Calc: 0.18 | €195/m² | DD specs |
| **400** | 447.5mm | Products specified | Calc: 0.18 | €198/m² | CD details |
| **500** | 448mm | As-installed products | Test: 0.17 | Actual: €196/m² | As-built |

---

## Using LOD in Documentation

### Specify LOD in Frontmatter

```yaml
---
documentType: "element_specification"
bimLOD: "LOD_400"
lodRequirements:
  geometry: "fabrication_detail"
  information: "complete_specifications"
  uses: ["construction", "procurement", "installation"]
---
```

### LOD Progression Tracking

```markdown
## Wall Type A - LOD History

| Phase | LOD | Date | Author | Notes |
|-------|-----|------|--------|-------|
| Concept | 100 | 2025-03-01 | A. Nowak | Initial concept |
| Schematic | 200 | 2025-04-15 | A. Nowak | System selected |
| Design Dev | 300 | 2025-06-30 | A. Nowak | Detailed spec |
| Const Docs | 400 | 2025-09-01 | A. Nowak | For construction |
| As-Built | 500 | 2026-02-15 | J. Kowalski | Survey complete |
```

---

## LOD Best Practices

### 1. Define LOD Requirements Early

Establish LOD requirements in BIM Execution Plan (BEP):
- What LOD for each element at each phase?
- Who is responsible for modeling?
- What information is required?

### 2. Document LOD Clearly

Always specify LOD in documentation:
- Use `bimLOD` field in frontmatter
- State geometry and information detail levels
- Clarify intended uses

### 3. LOD ≠ Level of Detail

LOD is **Level of Development**, not "Level of Detail":
- Development = completeness and reliability
- Detail = geometric detail only
- LOD includes both geometry AND information

### 4. Progress LOD Logically

Don't skip LOD levels:
- Each LOD builds on the previous
- Information should become more specific
- Geometry should become more precise

---

## Resources

- **AIA G202-2013:** Building Information Modeling Protocol
- **BIMForum LOD Spec:** [bimforum.org/lod](https://bimforum.org/lod/)
- **buildingSMART:** IFC LOD definitions

---

## Related Documentation

- [IFC Entities →](/en/bim-integration/ifc-entities)
- [Bi-directional Sync →](/en/bim-integration/bidirectional-sync)
- [Element Templates →](/en/templates/)
