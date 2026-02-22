# Document Structure

> **Note:** This page describes the traditional phase-based project workflow. For document-type-based documentation using the Semantic Building Model, see [SBM Overview](/en/documentation/overview).

## Complete Architect Workflow

The Architecture Documentation Standard is organized according to the actual workflow of an architect - from project initiation through to maintenance documentation.

---

## Project Phases

### 1. Project Initiation
**What you do:** Start a new architectural project

**Documents to create:**
- Project brief
- Site analysis
- Functional program
- Preliminary budget

**In this standard:**
```yaml
documentType: "project_brief"
projectPhase: "initiation"
```

*For project brief documentation, see the [Authoring Guide](/en/documentation/authoring/).*

---

### 2. Concept Design (LOD 100)
**What you do:** Basic massing, approximate dimensions, concept

**Documents:**
- Architectural concept
- Massing studies
- Preliminary code compliance
- Cost estimates

**BIM:**
- LOD 100 - Symbolic representation
- Approximate geometry
- Generic parameters

**Regulations to check:**
- Construction Law Art. 5
- Zoning requirements
- Building codes

```yaml
documentType: "conceptual_design"
projectPhase: "concept"
bimLOD: "LOD_100"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 5"
```

*For concept design documentation, see the [Authoring Guide](/en/documentation/authoring/).*

---

### 3. Schematic Design (LOD 200)
**What you do:** Schematic design, functional layouts, generic systems

**Documents:**
- Floor plans (1:100)
- Sections (1:100)
- Elevations (1:100)
- Preliminary material specs
- System specifications (general)

**BIM:**
- LOD 200 - Approximate shapes
- Generic systems
- Basic properties

**Regulations:**
- WT 2021 § 328 (target U-values)
- WT 2021 § 234 (fire requirements)
- WT 2021 § 55 (accessibility)

```yaml
documentType: "schematic_design"
projectPhase: "schematic"
bimLOD: "LOD_200"
regulatoryCompliance:
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55"]
```

**Export documents:**
- Plans → PDF
- Specs → PDF for client

*For schematic design documentation, see the [Space template](/en/templates/space-template) and [Zone template](/en/templates/zone-template).*

---

### 4. Design Development / Building Permit (LOD 300)
**What you do:** Detailed design, building permit application

**REQUIRED Documents:**
- Architectural design (detailed)
- Structural design
- MEP designs
- Technical specifications for all elements
- Calculations (thermal, acoustic, structural)
- **Compliance checklist**

**BIM:**
- LOD 300 - Precise geometries
- Specific assemblies
- Detailed properties

**Regulations - FULL COMPLIANCE:**
- Construction Law Art. 34 (scope of design)
- WT 2021 all required sections
- PN-EN standards for structures

```yaml
documentType: "building_permit_set"
projectPhase: "design_development"
bimLOD: "LOD_300"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 34"
    status: "compliant"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
    status: "verified"
```

**Export:**
- Complete PDF set for authorities
- Calculations PDF
- Compliance checklist

*For building permit documentation, see the [Requirement template](/en/templates/requirement-template).*
*For regulatory verification, see [Requirement document type](/en/documentation/entities/requirement).*

---

### 5. Construction Documentation (LOD 400)
**What you do:** Documentation for contractors, fabrication details

**Documents:**
- Detailed construction drawings
- Construction details
- **Element specifications** (every type!)
- Material specifications (manufacturers, product codes)
- Installation instructions
- Quality control procedures

**BIM:**
- LOD 400 - Fabrication geometry
- Complete specifications
- All properties
- Manufacturers and codes

**For EVERY element:**

```yaml
documentType: "element_specification"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWall"
  objectType: "ExternalWall_TypeA"
  globalId: "..."
```

**Example elements to document:**
- All wall types (external, internal)
- All floor types
- All window and door types
- Stairs
- Roof
- Floors
- Ceilings

[Space template (element specification)](/en/templates/space-template) | [Creating Documents](/en/documentation/authoring/creating-entities)
[Asset template (material specification)](/en/templates/asset-template)

**BIM Sync:**
```bash
# Export IFC from Revit/ArchiCAD
# Generate documentation
python bim-sync/ifc-to-markdown.py project.ifc
```

---

### 6. Construction Phase
**What you do:** Site supervision, construction diary, changes

**Documents:**
- Meeting minutes
- Supervision diary
- RFIs (Requests for Information)
- Change documentation
- Stage completion protocols

```yaml
documentType: "construction_supervision"
projectPhase: "construction"
```

**Change documentation:**
```yaml
documentType: "change_order"
changeNumber: "CO-001"
dateIssued: "2026-03-15"
impact:
  cost: "+€5000"
  schedule: "+3 days"
  regulatory: "no impact"
```

*For construction phase documentation, see the [Authoring Guide](/en/documentation/authoring/).*

---

### 7. As-Built Documentation (LOD 500)
**What you do:** Document actual as-constructed conditions

**Documents:**
- As-built BIM model (verified)
- As-built drawings
- **Verified specifications**
- Test and inspection protocols
- Material certificates
- Operation manuals

**BIM:**
- LOD 500 - Verified dimensions
- Actually installed products
- Material batch numbers
- Installation dates

```yaml
documentType: "as_built_documentation"
bimLOD: "LOD_500"
asBuiltVerification:
  method: "field_survey"
  date: "2026-06-15"
  verifiedBy: "John Smith, architect"
```

**Verification:**
- Thermography (insulation)
- Blower door test (airtightness)
- Acoustic measurements
- Structural testing

*For as-built documentation, use SBM document templates: [Space](/en/templates/space-template), [System](/en/templates/system-template), and [Asset](/en/templates/asset-template).*

---

### 8. Handover & Maintenance
**What you do:** Hand over building, document maintenance

**Documents:**
- Building operation manual (O&M)
- Maintenance plan
- Inspection schedules
- Warranties and certificates
- Supplier contacts
- BIM model for FM

```yaml
documentType: "building_manual"
purpose: "operation_maintenance"
```

**Manual contents:**
- Building systems description
- Maintenance schedules
- Emergency procedures
- Contact information
- Warranties

**Maintenance plan:**
- Annual inspections
- 5-year inspections
- Roof maintenance
- Façade maintenance
- MEP servicing

*For O&M and maintenance documentation, see the [System template](/en/templates/system-template) and [Asset template](/en/templates/asset-template).*

---

## Project File Structure

```
my-project/
├── 01-brief/
│   └── project-brief.md
├── 02-concept/
│   ├── concept.md
│   └── site-analysis.md
├── 03-schematic/
│   ├── design.md
│   ├── general-specs.md
│   └── budget.md
├── 04-building-permit/
│   ├── architectural-design.md
│   ├── compliance-checklist.md
│   └── calculations/
├── 05-construction-docs/
│   ├── specifications/
│   │   ├── external-wall-type-a.md
│   │   ├── floor-slab-type-a.md
│   │   └── ...
│   ├── materials/
│   └── details/
├── 06-construction/
│   ├── diary/
│   ├── changes/
│   └── protocols/
├── 07-as-built/
│   ├── model-as-built.ifc
│   ├── specifications-verified/
│   └── certificates/
└── 08-handover/
    ├── om-manual.md
    ├── maintenance-plan.md
    └── warranties/
```

---

## Version Control (Git)

```bash
# Tag each phase
git tag concept-design-v1.0
git tag schematic-design-v1.0
git tag building-permit-v1.0
git tag construction-docs-v1.0
git tag as-built-v1.0
```

---

## PDF Export - Different Phases

### For Client (Concept)
```bash
pandoc 02-concept/concept.md -o presentation.pdf
```

### For Authorities (Permit)
```bash
cd 04-building-permit/
./export-complete-set.sh
# Generates all required PDFs
```

### For Contractor (Construction Docs)
```bash
cd 05-construction-docs/
./export-specifications.sh
# All specs → PDF
```

---

## Next Steps

**If starting a new project:**
1. Start with the [Authoring Guide](/en/documentation/authoring/) to create your first documents
2. Define spaces and zones using [Space template](/en/templates/space-template) and [Zone template](/en/templates/zone-template)

**If in design phase:**
3. Document requirements with the [Requirement template](/en/templates/requirement-template)
4. Specify building systems using the [System template](/en/templates/system-template)

**If preparing construction docs:**
5. Create asset instances with the [Asset template](/en/templates/asset-template)
6. [BIM integration](/en/bim-integration/) -- connect with IFC workflows

**If in construction:**
7. Track systems and assets using SBM documents -- see [Creating Documents](/en/documentation/authoring/creating-entities)
8. Document changes by versioning document files

**If completing project:**
9. Update document versions to reflect as-built conditions
10. Use [System](/en/templates/system-template) and [Asset](/en/templates/asset-template) templates for O&M handover

---

## See Also

- [SBM Documentation Overview](/en/documentation/overview) -- Introduction to the Semantic Building Model
- [Authoring Guide](/en/documentation/authoring/) -- How to create and manage SBM documents
