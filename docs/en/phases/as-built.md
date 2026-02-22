# Phase 7: As-Built Documentation (LOD 500)

::: tip Phase Overview
**What you do:** Document actual as-constructed conditions
**BIM LOD:** LOD 500 - Verified field measurements, actual installed products
**Timeline:** 2-4 weeks after construction completion
**Deliverables:** As-built BIM model, as-built drawings, verified specifications, test protocols, certificates
:::

::: info Why As-Built?
As-built documentation reflects **reality**, not design. Construction always differs from design drawings due to:
- Field conditions
- Product substitutions
- Change orders
- Installation variations
:::

---

## What Happens in This Phase

As-Built Documentation is where you:
1. Update BIM model with actual as-constructed dimensions
2. Document all installed products (manufacturers, serial numbers, batch numbers)
3. Verify specifications against what was actually installed
4. Collect all test results and certificates
5. Create final as-built drawing set
6. Prepare documentation for building handover

**This documentation is critical for:**
- Building operation and maintenance
- Future renovations
- Warranty claims
- Regulatory compliance verification

---

## BIM Requirements - LOD 500

### Level of Development
**LOD 500 = Verified field measurements, actual installed products**

At this level, BIM elements represent:
- **Geometry:** Verified dimensions from field measurements
- **Properties:** Actually installed products with serial/batch numbers
- **Dates:** Installation dates
- **Verification:** Survey data, photos, certificates

```yaml
bimLOD: "LOD_500"
asBuiltVerification:
  method: "field_survey"
  date: "2026-06-15"
  verifiedBy: "John Smith, architect"
  surveyAccuracy: "±5mm"

elements:
  externalWall_TypeA:
    ifcEntity: "IfcWallStandardCase"
    objectType: "ExternalWall_TypeA"
    globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
    asBuilt: true
    verifiedDimensions:
      thickness: 417  # mm (measured, not design 415mm)
      height: 2985    # mm (measured)
    installedMaterials:
      - layer: "XPS Insulation"
        manufacturer: "BASF Polska"
        productCode: "STY-3035-CS-150"
        batchNumber: "20260515-A"
        installationDate: "2026-05-20"
        certificate: "cert-xps-20260515.pdf"
    verification:
      thermalTesting:
        method: "Thermography"
        date: "2026-06-10"
        result: "No thermal bridges detected"
        report: "thermography-report-2026-06-10.pdf"
```

[Learn about LOD 500 →](/en/bim-integration/lod-definitions#lod-500)

---

## Documents to Create

### 1. As-Built Documentation Record
**Purpose:** Master document listing all as-built updates

**YAML structure:**
```yaml
---
documentType: "as_built_documentation"
projectPhase: "as_built"
bimLOD: "LOD_500"
version: "1.0.0"
asBuiltVerification:
  method: "field_survey"
  surveyDate: "2026-06-15"
  verifiedBy: "Architect Name, IARP 1234"
  surveyFirm: "Survey Company Ltd"
  accuracy: "±5mm"
completionDate: "2026-06-01"
certificateOfOccupancy:
  issued: "2026-06-20"
  authority: "Urząd Miejski w Warszawie"
  number: "CO/2026/1234"
---

## As-Built Documentation Package

This package contains verified as-constructed information:

### 1. As-Built BIM Model
- File: `as-built-model.ifc`
- LOD: 500 (verified dimensions)
- Last updated: 2026-06-15

### 2. As-Built Drawings
- Floor plans (all levels) - verified dimensions
- Sections - verified
- Elevations - verified
- Details - verified

### 3. Verified Specifications
All element specifications updated with:
- Actual installed products
- Manufacturer batch/serial numbers
- Installation dates
- Material certificates

### 4. Test Results
- Thermal performance (thermography)
- Airtightness (blower door test)
- Acoustic performance
- Structural testing

### 5. Material Certificates
- Concrete test certificates
- Insulation certificates
- Window performance certificates
- All product certifications
```

[Space Document Template →](/en/templates/space-template) *(update version to as-built)*

---

### 2. Field Survey Report
**Purpose:** Document verification methodology

```markdown
## Field Survey Report

**Survey Date:** 2026-06-15
**Survey Method:** Total station + laser measurement
**Accuracy:** ±5mm
**Surveyor:** Survey Company Ltd

### Elements Surveyed

**Structural Elements:**
- All column locations verified
- All floor elevations verified
- All beam dimensions verified
- Deviation from design: max 12mm (within tolerance)

**Envelope Elements:**
- All wall thicknesses measured
- All window locations verified
- All door locations verified

### Deviations from Design

| Element | Design Dimension | As-Built Dimension | Deviation | Status |
|---------|-----------------|-------------------|-----------|---------|
| Wall Type A thickness | 415mm | 417mm | +2mm | Acceptable |
| Floor 3 elevation | +9.00m | +9.01m | +10mm | Acceptable |
| Window W01 width | 1200mm | 1198mm | -2mm | Acceptable |

**Conclusion:** All deviations within acceptable tolerances.
```

---

### 3. Updated Element Specifications
**Purpose:** Update specifications with actual installed products

**Example - Update External Wall Type A:**

```yaml
---
documentType: "element_specification"
elementType: "external_wall"
elementName: "External Wall Type A - AS-BUILT"
bimLOD: "LOD_500"
asBuilt: true
verificationDate: "2026-06-15"

ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
---

## AS-BUILT Wall Assembly

**Measured Total Thickness:** 417mm (design: 415mm)

**Installed Layers (outside to inside):**

1. **Exterior Render**
   - Product: Ceresit CT 60 White
   - Batch: CT60-20260510-B
   - Installed: 2026-05-25
   - Thickness: 16mm (measured)
   - Certificate: cert-render-20260525.pdf

2. **Concrete Block**
   - Product: Solbet AAC 400, 200mm
   - Batch: SOLBET-20260415-C
   - Installed: 2026-04-20 to 2026-05-10
   - Thickness: 201mm (measured)
   - Certificate: cert-solbet-20260420.pdf

3. **XPS Insulation**
   - Product: BASF Styrodur 3035 CS, 150mm
   - Batch: 20260515-A
   - Installed: 2026-05-20
   - Thickness: 151mm (measured)
   - Certificate: cert-xps-20260515.pdf

4. **Air Gap**
   - Measured: 38mm (design: 40mm)

5. **Gypsum Board**
   - Product: Rigips RB 12.5mm
   - Batch: RB-20260601-A
   - Installed: 2026-06-01
   - Thickness: 11mm (measured)

## Verification Testing

**Thermal Performance:**
- Method: Thermography scan
- Date: 2026-06-10
- Result: No thermal bridges detected
- Calculated U-value (as-built): 0.17 W/(m²·K)
- Design U-value: 0.18 W/(m²·K)
- Status: ✅ Better than design

**Airtightness:**
- Method: Blower door test
- Date: 2026-06-12
- Result: n50 = 0.8 h⁻¹
- Required: n50 ≤ 1.0 h⁻¹
- Status: ✅ Compliant
```

---

### 4. Test and Inspection Protocols

**Thermal Testing:**
```yaml
---
documentType: "test_protocol"
testType: "thermography"
testDate: "2026-06-10"
standard: "PN-EN 13187"
---

## Thermography Inspection

**Tested:** Entire building envelope
**Conditions:**
- Indoor temp: 20°C
- Outdoor temp: 5°C
- Weather: Clear, calm

**Results:**
- No significant thermal bridges detected
- Minor anomaly at balcony connection (acceptable)
- All wall assemblies performing as designed

**Conclusion:** PASS

**Report:** thermography-full-report-20260610.pdf
```

**Blower Door Test:**
```yaml
---
documentType: "test_protocol"
testType: "blower_door"
testDate: "2026-06-12"
standard: "PN-EN 13829"
---

## Airtightness Test (Blower Door)

**Building Volume:** 5,400 m³
**Envelope Area:** 2,100 m²

**Test Results:**
- Air change rate at 50 Pa: n50 = 0.8 h⁻¹
- Required: n50 ≤ 1.0 h⁻¹
- Status: ✅ PASS

**Leakage Points Identified:**
- Minor: Window frame joints (sealed during test)
- Minor: Electrical penetrations (sealed)

**Conclusion:** Building exceeds airtightness requirements

**Report:** blower-door-report-20260612.pdf
```

---

### 5. Material Certificates Collection
**Purpose:** Compile all product certificates

**Organize certificates:**
```
07-as-built/
└── certificates/
    ├── concrete/
    │   ├── foundation-c3037-batch-A.pdf
    │   ├── slab-c3037-batch-B.pdf
    │   └── columns-c3037-batch-C.pdf
    ├── insulation/
    │   ├── xps-styrodur-batch-20260515-A.pdf
    │   └── mineral-wool-batch-20260518-B.pdf
    ├── windows/
    │   ├── window-type-a-performance-cert.pdf
    │   └── window-type-b-performance-cert.pdf
    └── finishes/
        ├── render-ceresit-batch-CT60-20260510-B.pdf
        └── paint-batch-20260605-A.pdf
```

---

## BIM Workflow - Create As-Built Model

### Update BIM Model with Field Data:

```bash
# 1. Obtain field survey data
# Survey firm provides: survey-data.csv

# 2. Update BIM model in Revit/ArchiCAD
# - Import survey points
# - Adjust element dimensions to match survey
# - Update all product properties with actual installed products
# - Add batch/serial numbers
# - Add installation dates

# 3. Export as-built IFC
# File > Export > IFC 4.0 > as-built-model.ifc

# 4. Generate as-built specifications from IFC
python ../bim-sync/ifc-to-markdown.py \
  --input as-built-model.ifc \
  --output 07-as-built/specifications-verified/ \
  --lod LOD_500 \
  --as-built true

# 5. Review generated specs
cd 07-as-built/specifications-verified/
ls -l
# external-wall-type-a-as-built.md
# floor-slab-type-a-as-built.md
# etc.

# 6. Commit as-built model
git add 07-as-built/
git commit -m "As-built documentation complete - LOD 500"
git tag as-built-v1.0
```

[Learn about BIM to Markdown sync →](/en/bim-integration/bidirectional-sync)

---

## Regulations - Final Compliance

### Certificate of Occupancy
**Required by:** Prawo budowlane Art. 57

Before building can be occupied, obtain:
- Pozwolenie na użytkowanie (Certificate of Occupancy)
- Requires final inspection by building authority
- Requires as-built documentation showing compliance

### Final Inspections Required:
- Building authority final inspection
- Fire safety inspection
- Sanitary inspection (if applicable)
- Electrical installation acceptance
- Gas installation acceptance (if applicable)

[Learn about final inspections →](/en/regulations/prawo-budowlane#final-inspections)

---

## Git Workflow

```bash
# Create as-built folder
mkdir 07-as-built
cd 07-as-built

# Create structure
mkdir specifications-verified
mkdir certificates
mkdir test-reports
mkdir bim

# Copy and update specifications
cp ../05-construction-docs/specifications/*.md specifications-verified/
# Update each file with as-built information

# Add test reports
cp thermography-report.pdf test-reports/
cp blower-door-report.pdf test-reports/

# Add certificates
# Organize by material type

# Add as-built BIM model
cp as-built-model.ifc bim/

# Commit as-built documentation
git add .
git commit -m "As-built documentation complete - verified field conditions"
git tag as-built-v1.0
```

---

## Example Project

**Green Terrace Building - As-Built**
- [Green Terrace Spaces →](/en/examples/green-terrace/spaces/bedroom-01)
- [Green Terrace Project →](/en/examples/green-terrace/)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

The [Semantic Building Model (SBM)](/en/documentation/overview) reaches its verified state at As-Built. All document types are validated against actual constructed conditions, forming the authoritative record of the building.

### All Documents Verified Against As-Built Conditions
Every SBM document type is reviewed and updated to reflect verified, as-constructed reality rather than design intent.

### Space Documents Updated
Space documents are updated with measured areas, verified ceiling heights, confirmed finishes, and actual equipment present in each space.

### Asset Instance Documents Completed
Asset Instance documents receive verified serial numbers, final test results, warranty information, and confirmed operational parameters.

[Learn about Asset Instance documents →](/en/documentation/entities/asset-instance)

### Requirements Verified
Requirement documents are checked against measured values -- thermal performance from thermography, acoustic ratings from testing, and fire ratings from certificates. Each requirement records its compliance status.

### Compiler Output
The SBM compiler generates a complete `compliance_report.json` with verified status for every requirement, linking measured values to their corresponding test reports and certificates.

[Learn about the SBM compiler →](/en/documentation/compiler/)

### Example: Space Document with As-Built Measurements

```yaml
entity: space
id: space-bedroom-01
name: "Bedroom 01"
level: level-02
zone_memberships:
  - zone-fire-zl-iv
  - zone-acoustic-night
  - zone-hvac-north

as_built:
  verificationDate: "2026-06-15"
  verifiedBy: "John Smith, architect"
  surveyMethod: "laser_measurement"
  surveyAccuracy: "±5mm"

dimensions:
  designArea: 16.5     # m² (from design)
  measuredArea: 16.62  # m² (field survey)
  designHeight: 2.80   # m
  measuredHeight: 2.79 # m
  deviation: "within tolerance"

finishes:
  floor:
    specified: "Oak engineered flooring"
    installed: "Oak engineered flooring"
    manufacturer: "Barlinek"
    batchNumber: "BRK-2026-0515-A"
    status: "verified"
  walls:
    specified: "Gypsum board, painted"
    installed: "Gypsum board, painted"
    status: "verified"
  ceiling:
    specified: "Gypsum board, painted"
    installed: "Gypsum board, painted"
    status: "verified"

compliance:
  thermal:
    required: "U ≤ 0.18 W/(m²·K)"
    measured: "U = 0.17 W/(m²·K)"
    testReport: "thermography-report-20260610.pdf"
    status: "PASS"
  acoustic:
    required: "Rw ≥ 50 dB"
    measured: "Rw = 55 dB"
    testReport: "acoustic-report-20260612.pdf"
    status: "PASS"
```

[View Green Terrace Bedroom 01 →](/en/examples/green-terrace/spaces/bedroom-01)
[View SBM document type documentation →](/en/documentation/entities/)

---

## Project Controls at This Phase

### As-Built Markup Collection
Collect red-line markups from site. Systematic room-by-room verification of actual vs designed dimensions.
- [Document control →](/en/project-management/document-control)

### Record Model Update
Update BIM model to reflect actual construction. Verify LOD 500 requirements.
- [LOD/LOI matrix →](/en/bim-integration/lod-loi)
- [Bi-directional sync →](/en/bim-integration/bidirectional-sync)

### Compliance Verification
Re-verify compliance for any elements that changed during construction.
- [Phase gate checklists →](/en/quality/phase-gates)

---

## Next Steps

Once as-built documentation is complete:

**Continue to Phase 8:**
[→ Handover & Maintenance](/en/phases/handover)

**Or go back:**
[← Phase 6: Construction Phase](/en/phases/construction)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

Before handover to client:

- [ ] Field survey completed
- [ ] BIM model updated to LOD 500 (verified dimensions)
- [ ] All element specifications updated with as-built info
- [ ] All material batch/serial numbers documented
- [ ] All certificates collected and organized
- [ ] Thermal testing complete (thermography)
- [ ] Airtightness testing complete (blower door)
- [ ] Acoustic testing complete (if required)
- [ ] Structural testing complete (if required)
- [ ] Certificate of Occupancy obtained
- [ ] As-built drawing set complete
- [ ] All documentation committed to Git
- [ ] Ready for handover to client
