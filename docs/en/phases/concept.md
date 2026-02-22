# Phase 2: Concept Design (LOD 100)

::: tip Phase Overview
**What you do:** Basic massing studies, approximate dimensions, design concept
**BIM LOD:** LOD 100 - Symbolic representation
**Timeline:** 2-3 weeks
**Deliverables:** Architectural concept, massing models, preliminary code compliance, cost estimates
:::

---

## What Happens in This Phase

Concept design is where you:
1. Develop 2-3 design concepts based on the brief
2. Create massing studies (building volume and form)
3. Establish approximate dimensions
4. Test concepts against zoning requirements
5. Prepare preliminary cost estimates
6. Present concepts to client for selection

---

## BIM Requirements - LOD 100

### Level of Development
**LOD 100 = Symbolic representation**

At this level, BIM elements are:
- **Geometry:** Approximate size and location
- **Properties:** Generic, not specific
- **Purpose:** Volume studies, spatial relationships
- **Example:** Simple box representing a building

### What to model:
```yaml
bimLOD: "LOD_100"
elements:
  - type: "Building Volume"
    geometry: "Approximate massing"
    dimensions: "Overall height, width, length"
    properties: "Generic"
```

**Example in BIM:**
- Walls: Simple planes showing building envelope
- Floors: Horizontal planes at correct levels
- Roof: Basic shape (flat, pitched, etc.)
- No details, no specific materials

[Learn more about LOD definitions →](/en/bim-integration/lod-definitions)

---

## Documents to Create

### Conceptual Design Document
**Purpose:** Present design concept and rationale

**YAML Configuration:**
```yaml
---
documentType: "conceptual_design"
projectPhase: "concept"
bimLOD: "LOD_100"
version: "1.0.0"
designConcept:
  name: "Concept A - Courtyard Building"
  mainIdea: "Building organized around central green courtyard"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 5"
    status: "preliminary_check"
---
```

**Key sections:**
- Design concept description and rationale
- Massing diagrams (3D views, sections)
- Approximate floor areas
- Spatial organization
- Solar studies
- Preliminary materials concept

[Space Entity Template →](/en/templates/space-template)

---

### Massing Studies
**Purpose:** Explore building form and volume

**What to include:**
- Multiple concept options (typically 2-3)
- 3D massing models
- Site context showing neighbors
- Building height and footprint
- Approximate GFA (Gross Floor Area)

**Example documentation:**
```markdown
## Massing Option A

**Building Footprint:** 450 m²
**Height:** 18.5 m (6 floors)
**Total GFA:** ~1,800 m²
**Building Coverage:** 37.5%

**Form Concept:**
Rectangular volume with central courtyard for natural
light and ventilation to all apartments.
```

---

### Preliminary Code Compliance
**Purpose:** Verify concept meets basic regulatory requirements

**What to verify:**

#### Zoning Compliance
```yaml
regulatoryCompliance:
  - regulation: "Local_Zoning_Plan"
    parameters:
      maxHeight: "20 m"
      actualHeight: "18.5 m"
      status: "compliant"
      maxCoverage: "40%"
      actualCoverage: "37.5%"
      status: "compliant"
```

#### Construction Law - Art. 5
Basic requirements for buildings:
- Structural safety (preliminary check)
- Fire safety (basic compliance)
- Usage safety
- Accessibility (if applicable)

[Review Construction Law requirements →](/en/regulations/prawo-budowlane)

---

### Cost Estimates
**Purpose:** Preliminary budget verification

**Estimation method at LOD 100:**
- Cost per m² based on building type
- Rough order of magnitude (±30%)

**Example:**
```yaml
costEstimate:
  method: "cost_per_sqm"
  gfa: "1800 m²"
  costPerSqm: "4500 PLN/m²"
  totalEstimate: "8,100,000 PLN"
  accuracy: "±30%"
  currency: "PLN"
```

---

## Regulations to Check

### Construction Law
**Article 5 - General Technical Requirements**
- Structural integrity
- Fire safety
- Health and safety
- Accessibility
- Energy efficiency (basic considerations)

[Read Construction Law Art. 5 →](/en/regulations/prawo-budowlane#art-5)

### Zoning Requirements
Verify your concept against:
- Building height limits
- Building coverage ratio
- Distance from property lines
- Distance from neighboring buildings
- Parking requirements
- Green space requirements

---

## Client Presentation

### Presentation materials:
1. **Concept boards** - Visual presentation of each option
2. **3D renderings** - Photorealistic or sketch style
3. **Site plans** - Showing building placement
4. **Comparison matrix** - Comparing concept options

### Export to PDF:
```bash
cd 02-concept/
pandoc concept.md -o concept-presentation.pdf \
  --template=../templates/pandoc/architectural-doc.latex
```

[Learn about PDF export →](/en/guides/pdf-export)

---

## Git Workflow

```bash
# Create concept phase folder
mkdir 02-concept
cd 02-concept

# Create documents
touch concept.md
touch massing-studies.md
touch code-compliance.md

# Add BIM files (if using)
mkdir bim
# Add your .rvt, .pln, or .ifc files

# Commit
git add .
git commit -m "Concept design - 3 options developed"
git tag concept-design-v1.0
```

---

## Example Project

See how this phase was executed:

**Green Terrace Building - Concept Design**
- [Green Terrace Project →](/en/examples/green-terrace/)
- [Green Terrace Spaces →](/en/examples/green-terrace/spaces/bedroom-01)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## Tools for This Phase

### BIM Software (LOD 100):
- **Revit:** Conceptual Mass families
- **ArchiCAD:** Morph tool for massing
- **SketchUp:** Quick massing studies
- **Rhino:** Complex forms

### Visualization:
- **Enscape:** Real-time rendering from Revit/ArchiCAD
- **Lumion:** Quick visualizations
- **Blender:** Free, powerful rendering

### Diagrams:
- **Adobe Illustrator / Inkscape:** Diagram creation
- **Grasshopper (Rhino):** Parametric massing

---

## SBM Documents at This Phase

During concept design, the Semantic Building Model expands significantly:

- **Building** document type refined with location details, classification, and overall height
- **Level** document types created with floor-to-floor heights and approximate elevations
- **Space** document types created for individual rooms with approximate areas and space types assigned
- **Zone** document types started for preliminary fire zones and HVAC zones
- **Requirement** document types begin to be referenced as regulatory context becomes clearer

**Example: Space document at concept phase**
```yaml
entity: Space
id: space-bedroom-01
name: "Bedroom 01"
spaceType: "bedroom"
level: level-01
approximateArea: "14.5 m²"
requirements:
  - "natural light"
  - "minimum 8 m² per WT 2021"
projectPhase: "concept"
```

Learn more about the [Semantic Building Model](/en/documentation/overview) and explore [SBM entity definitions](/en/documentation/entities/).

---

## Project Controls at This Phase

### Design Options Review
Document design alternatives and the rationale for chosen direction. Record in the decision log.
- [Decision log template →](/en/project-management/governance#decision-log)

### Early Coordination
Begin inter-discipline coordination: structural feasibility, MEP routing concepts, fire strategy.
- [Review procedures →](/en/quality/review-procedures)

### Sustainability Targets
Set energy performance targets and environmental goals early — they shape the entire design.
- [Sustainability overview →](/en/sustainability/)
- [Energy & carbon targets →](/en/sustainability/energy-carbon)

### Concept Gate Review
Before moving to Schematic Design, conduct a formal concept gate review.
- [Phase gate checklists →](/en/quality/phase-gates)

---

## Next Steps

Once client approves the concept:

**Continue to Phase 3:**
[→ Schematic Design (LOD 200)](/en/phases/schematic)

**Or go back:**
[← Phase 1: Project Initiation](/en/phases/initiation)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

Before moving to Schematic Design:

- [ ] Client has selected preferred concept
- [ ] Massing model created (LOD 100)
- [ ] Approximate dimensions established
- [ ] Preliminary zoning compliance verified
- [ ] Preliminary cost estimate prepared
- [ ] Design concept documented in markdown
- [ ] All materials committed to Git
- [ ] Client sign-off on selected concept
