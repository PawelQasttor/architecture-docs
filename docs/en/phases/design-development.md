# Phase 4: Design Development / Building Permit (LOD 300)

::: tip Phase Overview
**What you do:** Create detailed design for building permit application
**BIM LOD:** LOD 300 - Precise geometry, specific assemblies
**Timeline:** 6-8 weeks
**Deliverables:** Complete permit set, calculations, compliance documentation, detailed specifications
:::

::: danger Critical Phase
This phase produces **legally binding documents** for building permit. All designs must comply with Polish Construction Law (Prawo budowlane) and Technical Conditions (WT 2021).
:::

---

## What Happens in This Phase

Design Development / Building Permit is where you:
1. Create complete architectural design with precise dimensions
2. Coordinate with structural, MEP engineers
3. Develop detailed specifications for all elements
4. Perform detailed compliance calculations (thermal, acoustic, structural)
5. Prepare complete building permit documentation
6. Submit to building authorities for approval

**This is the most documentation-intensive phase.**

---

## BIM Requirements - LOD 300

### Level of Development
**LOD 300 = Precise geometry with specific assemblies**

At this level, BIM elements are:
- **Geometry:** Precise dimensions and locations
- **Properties:** Specific assemblies and products
- **Purpose:** Construction coordination, permit documentation
- **Accuracy:** Fabrication-ready geometry

### What to model:

```yaml
bimLOD: "LOD_300"
elements:
  walls:
    type: "specific"
    layers: "Detailed layer build-up"
    example: "External wall Type A: render 15mm + concrete block 200mm + XPS 150mm + air gap 40mm + gypsum 12.5mm"
    uValue: "Calculated: 0.18 W/(m²·K)"

  floors:
    type: "specific"
    layers: "Detailed construction"
    example: "Floor Type A: tiles 10mm + screed 50mm + insulation 100mm + RC slab 200mm + ceiling 15mm"

  windows:
    type: "specific"
    manufacturer: "Specific or equivalent"
    properties: "Full technical specs (U-value, Rw, fire rating)"
    example: "PVC window 120x150cm, U=0.80 W/(m²·K), Rw=35dB"

  systems:
    structural: "Specific concrete grades, rebar details"
    mechanical: "Specific equipment with capacities"
    electrical: "Specific panel schedules and loads"
```

**IFC Entity Mapping:**
```yaml
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  properties:
    - Pset_WallCommon:
        LoadBearing: true
        IsExternal: true
        ThermalTransmittance: 0.18
        FireRating: "REI 60"
```

[Learn more about LOD 300 →](/en/bim-integration/lod-definitions#lod-300)
[See IFC entities →](/en/bim-integration/ifc-entities)

---

## Required Documents

### 1. Architectural Design (Projekt architektoniczny)
**Legal requirement:** Prawo budowlane Art. 34

**YAML Configuration:**
```yaml
---
documentType: "building_permit_set"
projectPhase: "design_development"
bimLOD: "LOD_300"
version: "1.0.0"
permitApplication:
  submissionDate: "2026-03-15"
  authority: "Urząd Miejski w Warszawie"
  applicationNumber: "BP/2026/1234"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 34"
    status: "compliant"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
    status: "verified"
  - standard: "PN-EN_1992"
    description: "Eurocode 2 - Concrete structures"
    status: "compliant"
---
```

**Contents:**
- Title page with architect license number
- Site plan with geodetic measurements
- Floor plans (all levels) - precise dimensions
- Roof plan
- All elevations (all sides)
- Building sections (minimum 2, showing all levels)
- Detail sections (key assemblies)
- Door/window schedule
- Finish schedule

[Requirement Entity Template →](/en/templates/requirement-template)

---

### 2. Structural Design (Projekt konstrukcyjny)
**Prepared by:** Structural engineer
**Must include:**
- Foundation design
- Structural frame calculations
- Floor slab design
- Roof structure
- Seismic analysis (if applicable)

---

### 3. MEP Designs (Projekty branżowe)
**Prepared by:** MEP engineers

**Required projects:**
- Sanitary and plumbing
- HVAC (heating, ventilation)
- Electrical systems
- Fire protection systems
- Other (gas, telecom, etc.)

---

### 4. Technical Specifications
**Purpose:** Detailed specifications for all building elements

**What to document:**
- Wall types (all variants)
- Floor types (all variants)
- Roof assembly
- Window and door specifications
- Finish specifications
- Material specifications with manufacturers

**Example structure:**
```markdown
## Wall Type A - External Wall

**IFC Mapping:**
- Entity: `IfcWallStandardCase`
- ObjectType: `ExternalWall_TypeA`
- GUID: `3vB2YO$rLBxv3VxEu2LPxQ`

**Layer Build-up (outside to inside):**
1. Exterior render, 15mm - Ceresit CT 60
2. Concrete block, 200mm - Solbet class 400
3. XPS insulation, 150mm - Styrodur 3035 CS
4. Air gap, 40mm
5. Gypsum board, 12.5mm - Rigips RB

**Thermal Performance:**
- Calculated U-value: 0.18 W/(m²·K)
- Required max U-value: 0.20 W/(m²·K) (WT 2021 § 328)
- Status: ✅ Compliant

**Fire Resistance:**
- Required: REI 60 (building class ZL III)
- Provided: REI 90 (certified system)
- Status: ✅ Compliant
```

[See complete wall specification example →](/en/examples/green-terrace/external-wall-type-a)

---

### 5. Calculations (Obliczenia)

#### Thermal Calculations
**Required by:** WT 2021 § 328

**What to calculate:**
- U-values for all envelope elements (walls, roof, floor, windows)
- Annual heating demand
- Compliance verification

**Example:**
```yaml
thermalCalculations:
  standard: "WT_2021"
  section: "§ 328"
  elements:
    externalWall_TypeA:
      layers:
        - {material: "Render", thickness: 0.015, lambda: 0.82}
        - {material: "Concrete", thickness: 0.200, lambda: 0.55}
        - {material: "XPS", thickness: 0.150, lambda: 0.034}
        - {material: "Air gap", thickness: 0.040, R: 0.18}
        - {material: "Gypsum", thickness: 0.0125, lambda: 0.25}
      calculatedU: 0.18
      maxAllowedU: 0.20
      status: "compliant"
```

Thermal Calculation Template (future)

---

#### Acoustic Calculations
**Required by:** WT 2021 § 323, § 324

**What to calculate:**
- Airborne sound insulation (R'w) for walls and floors
- Impact sound insulation (L'n,w) for floors
- Acoustic performance of windows

---

#### Structural Calculations
**Prepared by:** Structural engineer
**Required:** All load-bearing elements

---

### 6. Compliance Checklist
**Purpose:** Systematic verification of all regulatory requirements

```yaml
---
documentType: "compliance_checklist"
projectPhase: "design_development"
verificationDate: "2026-03-10"

compliance:
  constructionLaw:
    - article: "Art. 5"
      requirement: "General technical requirements"
      status: "verified"
      verifiedBy: "Architect name"

    - article: "Art. 34"
      requirement: "Design scope"
      status: "complete"
      documentsProvided:
        - "Architectural design"
        - "Structural design"
        - "MEP designs"

  wt2021:
    - section: "§ 328"
      requirement: "Thermal insulation"
      status: "compliant"
      calculation: "thermal-calc-2026-03.pdf"

    - section: "§ 234"
      requirement: "Fire safety"
      status: "compliant"
      fireClass: "ZL III"
      requiredResistance: "REI 60"
---
```

[SBM Compiler - Compliance Report →](/en/documentation/compiler/)

---

## Regulations - FULL COMPLIANCE Required

### Construction Law (Prawo budowlane)

**Art. 34 - Design Requirements**

Building permit design must include:
1. Architectural design
2. Structural design
3. MEP designs (sanitary, electrical, HVAC, etc.)
4. Fire safety concept
5. Technical specifications
6. Cost estimate

[Read Construction Law Art. 34 →](/en/regulations/prawo-budowlane#art-34)

---

### WT 2021 - All Required Sections

**§ 328 - Thermal Insulation**
- Maximum U-values for all envelope elements
- Annual energy demand calculation
- **Status:** Mandatory calculation required

**§ 234 - Fire Protection**
- Fire resistance requirements by building class
- Escape route requirements
- Fire separation requirements
- **Status:** Full compliance verification required

**§ 55 - Accessibility**
- Access for persons with disabilities (if applicable)
- Elevator requirements
- Accessible WC specifications
- **Status:** Compliance required if building serves public

**§ 206 - Sanitary Facilities**
- Minimum WC and washbasin requirements
- Ventilation requirements

**§ 132 - Room Heights**
- Minimum clear height requirements by room type

[Complete WT 2021 reference →](/en/regulations/wt-2021)

---

### PN-EN Standards for Structures

**Required standards:**
- PN-EN 1992 (Eurocode 2) - Concrete structures
- PN-EN 1993 (Eurocode 3) - Steel structures
- PN-EN 1997 (Eurocode 7) - Geotechnical design
- PN-EN 1991 (Eurocode 1) - Actions on structures

---

## Export Complete Permit Set to PDF

```bash
cd 04-building-permit/

# Export main architectural design
pandoc architectural-design.md -o architectural-design.pdf \
  --template=../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex

# Export all calculations
pandoc calculations/thermal.md -o calculations/thermal.pdf
pandoc calculations/acoustic.md -o calculations/acoustic.pdf

# Export compliance checklist
pandoc compliance-checklist.md -o compliance-checklist.pdf

# Create complete set
pdftk architectural-design.pdf \
      calculations/*.pdf \
      compliance-checklist.pdf \
      cat output complete-permit-set.pdf
```

[Complete PDF export guide →](/en/guides/pdf-export)

---

## BIM Workflow - LOD 300

### Create Detailed Model:

**Revit workflow:**
1. Create specific wall types with exact layers
2. Add precise dimensions
3. Create detailed floor plans
4. Add all windows/doors with specifications
5. Coordinate with structural model
6. Coordinate with MEP models
7. Run clash detection
8. Export to IFC 4.0

### Export BIM to Documentation:
```bash
# Export IFC from Revit/ArchiCAD
# File > Export > IFC 4.0

# Generate specifications from IFC
python ../bim-sync/ifc-to-markdown.py \
  --input permit-model.ifc \
  --output 04-building-permit/specifications/ \
  --lod LOD_300 \
  --include-properties Pset_WallCommon,Pset_SlabCommon

# Review generated markdown
git diff
```

[Learn about BIM to Markdown sync →](/en/bim-integration/bidirectional-sync)

---

## Git Workflow

```bash
# Create design development folder
mkdir 04-building-permit
cd 04-building-permit

# Create subfolder structure
mkdir calculations
mkdir specifications
mkdir bim

# Create main documents
touch architectural-design.md
touch compliance-checklist.md
touch calculations/thermal.md
touch calculations/acoustic.md

# Commit regularly during development
git add .
git commit -m "Building permit design - thermal calculations complete"

# Final commit and tag when ready to submit
git add .
git commit -m "Building permit set complete - ready for submission"
git tag building-permit-v1.0
```

---

## Example Project

**Green Terrace Building - Building Permit**
- [Complete Permit Set →](/en/examples/green-terrace/project-specification)
- [External Wall Specification →](/en/examples/green-terrace/external-wall-type-a)
- [Green Terrace Fire Zone →](/en/examples/green-terrace/zones/fire-zone-zl-iv)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

At design development, the Semantic Building Model reaches full specification. All seven document types are now present and detailed:

- **Space** document types fully detailed with exact areas, precise ceiling heights, and all applicable requirements linked
- **Zone** document types complete with fire zone classifications verified, all Spaces assigned to their respective Zones
- **Requirement** document types verified through compliance checks against WT 2021, EN standards, and Polish Construction Law
- **System** document types created for HVAC, electrical, and plumbing systems with capacities and routing concepts
- **Asset Instance** document types begin to appear as specific products and assemblies are selected
- **Building and Level** document types finalized with confirmed dimensions and elevations

The SBM Compiler can now generate output artifacts such as `compliance_report.json` and `bim_mapping.json`.

**Example: Fully specified Space document**
```yaml
entity: Space
id: space-bedroom-01
name: "Bedroom 01"
spaceType: "bedroom"
level: level-01
area: "14.72 m²"
ceilingHeight: "2.70 m"
zones:
  - zone-fire-zl-iv
  - zone-hvac-north
  - zone-acoustic-night
requirements:
  - req-thermal-wall-ext
  - req-fire-rei60
  - req-acoustic-rw50
systems:
  - system-hvac-central
  - system-electrical-floor1
finishes:
  floor: "Oak parquet 15mm"
  walls: "Gypsum plaster, painted"
  ceiling: "Gypsum board 12.5mm, painted"
projectPhase: "design_development"
```

Learn more about the [Semantic Building Model](/en/documentation/overview) and explore the [SBM Compiler documentation](/en/documentation/compiler/).

---

## Project Controls at This Phase

### Clash Detection & Coordination
Run systematic clash detection between architectural, structural, and MEP models.
- [BIM coordination review →](/en/quality/review-procedures#bim-coordination-review)
- [LOD/LOI requirements →](/en/bim-integration/lod-loi)

### Permit Preparation
Prepare the full building permit package: architectural project, structural, MEP, fire safety.
- [Building permit guide →](/en/regulations/building-permit)
- [Zoning verification →](/en/regulations/zoning-mpzp-wz)

### Design Development Gate
The most critical gate — all compliance must be verified before permit submission.
- [Phase gate checklists →](/en/quality/phase-gates)

### Change Control
Establish formal change management — design changes after this phase are expensive.
- [Change management →](/en/project-management/change-management)

---

## Next Steps

Once building permit is approved:

**Continue to Phase 5:**
[→ Construction Documentation (LOD 400)](/en/phases/construction-docs)

**Or go back:**
[← Phase 3: Schematic Design](/en/phases/schematic)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

Before submitting building permit:

- [ ] Complete architectural design with all required drawings
- [ ] Structural design completed by licensed engineer
- [ ] All MEP designs completed by licensed engineers
- [ ] Thermal calculations complete and compliant
- [ ] Acoustic calculations complete (if required)
- [ ] Fire safety compliance verified
- [ ] Accessibility compliance verified (if applicable)
- [ ] Complete compliance checklist prepared
- [ ] All specifications documented
- [ ] BIM model at LOD 300 complete
- [ ] All documents exported to PDF
- [ ] Complete permit set reviewed by all consultants
- [ ] Application forms completed
- [ ] All documents signed and stamped by licensed professionals
- [ ] Ready for submission to building authority
