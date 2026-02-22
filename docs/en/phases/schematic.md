# Phase 3: Schematic Design (LOD 200)

::: tip Phase Overview
**What you do:** Develop floor plans, sections, elevations with approximate dimensions
**BIM LOD:** LOD 200 - Approximate geometry, generic systems
**Timeline:** 3-4 weeks
**Deliverables:** Floor plans (1:100), sections, elevations, preliminary specifications, system concepts
:::

---

## What Happens in This Phase

Schematic design is where you:
1. Develop detailed floor plans with room layouts
2. Create building sections and elevations
3. Define generic building systems (structural, MEP concepts)
4. Establish approximate dimensions (not final)
5. Select preliminary materials and finishes
6. Verify compliance with thermal and fire regulations
7. Refine cost estimates

---

## BIM Requirements - LOD 200

### Level of Development
**LOD 200 = Approximate geometry with generic systems**

At this level, BIM elements are:
- **Geometry:** Approximate size, shape, location
- **Properties:** Generic system types
- **Purpose:** Design development, coordination
- **Dimensions:** Approximate, not fabrication-ready

### What to model:

```yaml
bimLOD: "LOD_200"
elements:
  walls:
    type: "generic"
    thickness: "approximate"
    example: "External wall - 350mm (generic layers)"
  floors:
    type: "generic"
    thickness: "approximate"
    example: "Floor slab - 250mm (generic)"
  windows:
    type: "generic"
    size: "approximate"
    example: "Window 120x150cm (generic type)"
  systems:
    structural: "Generic concrete frame"
    mechanical: "Generic HVAC zones"
    electrical: "Generic distribution concept"
```

**Example in BIM:**
- Walls: Generic wall types with approximate thickness
- Floors/Slabs: Generic slab types
- Windows/Doors: Generic families with approximate sizes
- Structure: Generic columns and beams (approximate locations)
- MEP: System zones and concepts (not detailed routing)

[Learn more about LOD 200 →](/en/bim-integration/lod-definitions#lod-200)

---

## Documents to Create

### Schematic Design Document
**Purpose:** Present detailed design with floor plans and elevations

**YAML Configuration:**
```yaml
---
documentType: "schematic_design"
projectPhase: "schematic"
bimLOD: "LOD_200"
version: "1.0.0"
drawingScale: "1:100"
regulatoryCompliance:
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55"]
    status: "preliminary_compliance"
---
```

**Key sections:**
- Floor plans (all levels) at 1:100 scale
- Building sections (2-3 minimum)
- All elevations (north, south, east, west)
- Roof plan
- Site plan with context

---

### Preliminary Material Specifications
**Purpose:** Define generic material choices

**Example:**
```yaml
---
documentType: "material_specification"
projectPhase: "schematic"
specificationType: "preliminary"

materials:
  externalWalls:
    type: "generic"
    system: "Concrete block with external insulation"
    thermalResistance: "R = 5.0 m²K/W (approximate)"

  roofing:
    type: "generic"
    system: "Flat roof with waterproofing"
    thermalResistance: "R = 6.0 m²K/W (approximate)"

  windows:
    type: "generic"
    system: "PVC windows, triple glazed"
    uValue: "U ≤ 0.9 W/m²K"
---
```

---

### System Specifications (Generic)
**Purpose:** Define building systems concepts

**Structural System:**
```markdown
## Structural Concept

**System Type:** Reinforced concrete frame
**Column Grid:** ~5m x 5m (approximate)
**Floor System:** RC flat slabs, 250mm (generic)
**Foundations:** Strip footings or mat foundation (TBD pending soil report)
```

**MEP Systems Concept:**
```markdown
## Mechanical Systems

**Heating:** Central gas boiler with radiators
**Ventilation:** Natural + mechanical in wet rooms
**Cooling:** Not required (residential)

## Electrical Systems

**Distribution:** Main panel + floor sub-panels
**Load:** ~15 kW per apartment (preliminary)
```

---

## Regulations to Check

### WT 2021 - Thermal Performance
**§ 328 - Thermal Insulation Requirements**

Verify U-values for all envelope elements:

| Element | Max U-value (WT 2021) | Typical Design Value |
|---------|----------------------|---------------------|
| External walls | 0.20 W/(m²·K) | 0.18 W/(m²·K) |
| Roof | 0.15 W/(m²·K) | 0.13 W/(m²·K) |
| Floor over unheated space | 0.25 W/(m²·K) | 0.22 W/(m²·K) |
| Windows | 0.90 W/(m²·K) | 0.80 W/(m²·K) |

**At LOD 200:** Use generic calculations, not detailed layer-by-layer

[Read WT 2021 § 328 requirements →](/en/regulations/wt-2021#328-thermal-insulation)

---

### WT 2021 - Fire Safety
**§ 234 - Fire Requirements**

Verify fire resistance for building class:

**Example: Residential building, 18.5m height (ZL III)**

| Element | Required Fire Resistance |
|---------|-------------------------|
| Load-bearing walls | REI 60 |
| Floors/Ceilings | REI 60 |
| Stairs/Escape routes | REI 60 |
| Non-load-bearing walls | EI 30 |

**At LOD 200:** Verify generic system compliance, not specific products

[Read WT 2021 § 234 requirements →](/en/regulations/wt-2021#234-fire-protection)

---

### WT 2021 - Accessibility
**§ 55 - Accessibility Requirements**

If building requires accessibility:
- Entrance ramps (max 6% slope)
- Elevator dimensions (min 110 x 140 cm cabin)
- Door widths (min 90cm clear)
- Accessible WC dimensions

[Read WT 2021 § 55 requirements →](/en/regulations/wt-2021#55-accessibility)

---

## Cost Estimate Refinement

**Estimation method at LOD 200:**
- Detailed takeoff from floor plans
- Cost per m² refined by building system
- Accuracy: ±20%

**Example:**
```yaml
costEstimate:
  method: "detailed_takeoff"
  breakdown:
    structure: "2,500,000 PLN"
    envelope: "1,800,000 PLN"
    interior: "1,200,000 PLN"
    mep: "1,600,000 PLN"
    sitework: "400,000 PLN"
    softCosts: "600,000 PLN"
  totalEstimate: "8,100,000 PLN"
  accuracy: "±20%"
  priceDate: "2026-02-20"
```

---

## Export Documents to PDF

### For Client Presentation:
```bash
cd 03-schematic/
pandoc schematic-design.md -o schematic-presentation.pdf \
  --template=../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

### For Internal Review:
```bash
# Export all specifications
pandoc general-specs.md -o specs.pdf
pandoc budget.md -o budget.pdf
```

[Complete PDF export guide →](/en/guides/pdf-export)

---

## BIM Workflow

### Create Schematic Model (LOD 200):

**In Revit:**
1. Create generic wall types (approximate layers)
2. Place walls using approximate thicknesses
3. Create floor plans at 1:100 scale
4. Generate sections and elevations
5. Add generic windows/doors
6. Export to IFC 4.0

**In ArchiCAD:**
1. Create composite walls (generic layers)
2. Develop floor plans
3. Generate sections/elevations
4. Add generic library objects
5. Export to IFC 4.0

### Export BIM to Documentation:
```bash
# Export IFC from your BIM tool
# File > Export > IFC 4.0

# Generate markdown from IFC
python ../bim-sync/ifc-to-markdown.py \
  --input schematic-model.ifc \
  --output 03-schematic/specifications/ \
  --lod LOD_200
```

[Learn about BIM sync →](/en/bim-integration/bidirectional-sync)

---

## Git Workflow

```bash
# Create schematic phase folder
mkdir 03-schematic
cd 03-schematic

# Create documents
touch design.md
touch general-specs.md
touch budget.md

# Add drawings/BIM (if needed)
mkdir drawings
mkdir bim

# Commit
git add .
git commit -m "Schematic design complete - all drawings at 1:100"
git tag schematic-design-v1.0
```

---

## Example Project

**Green Terrace Building - Schematic Design**
- [Green Terrace Spaces →](/en/examples/green-terrace/spaces/bedroom-01)
- [External Wall Type A →](/en/examples/green-terrace/external-wall-type-a)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

During schematic design, the Semantic Building Model becomes well-defined:

- **Space** document types refined with confirmed areas, ceiling heights, and specific space types
- **Zone** document types defined in detail: fire zones classified per WT 2021, HVAC zones mapped to mechanical concepts, acoustic zones identified for noise-sensitive areas
- **Requirement** document types applied with specific standards linked to Spaces (WT 2021 thermal and fire requirements, EN acoustic standards)

**Example: Zone document at schematic phase**
```yaml
entity: Zone
id: zone-fire-zl-iv
name: "Fire Zone ZL IV"
zoneType: "fire"
classification: "ZL IV"
fireResistance: "REI 60"
standard: "WT 2021 § 234"
spaces:
  - space-bedroom-01
  - space-bedroom-02
  - space-corridor
projectPhase: "schematic"
```

Learn more about the [Semantic Building Model](/en/documentation/overview) and see [Zone entity template](/en/templates/zone-template).

---

## Project Controls at This Phase

### BIM Execution Plan
Establish the BEP before detailed modeling begins: roles, software, naming conventions, exchange schedules.
- [BIM Execution Plan guide →](/en/bim-integration/bep)
- [Common Data Environment →](/en/bim-integration/cde)

### Schematic Gate Review
Verify all spaces are defined, zones assigned, and preliminary compliance checked.
- [Phase gate checklists →](/en/quality/phase-gates)
- [Review procedures →](/en/quality/review-procedures)

### Indoor Environment Planning
Define daylight, ventilation, and acoustic requirements for each space type.
- [Indoor environment quality →](/en/sustainability/indoor-quality)

### Document Control
Ensure all files follow naming conventions and revision tracking is active.
- [Document control procedures →](/en/project-management/document-control)

---

## Next Steps

Once schematic design is approved:

**Continue to Phase 4:**
[→ Design Development / Building Permit (LOD 300)](/en/phases/design-development)

**Or go back:**
[← Phase 2: Concept Design](/en/phases/concept)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

Before moving to Design Development:

- [ ] All floor plans completed at 1:100 scale
- [ ] Building sections (minimum 2) completed
- [ ] All elevations completed
- [ ] Generic BIM model created (LOD 200)
- [ ] Preliminary thermal compliance verified (WT 2021 § 328)
- [ ] Preliminary fire compliance verified (WT 2021 § 234)
- [ ] Generic material specifications documented
- [ ] Cost estimate refined (±20% accuracy)
- [ ] All documents committed to Git
- [ ] Client approval to proceed to detailed design
