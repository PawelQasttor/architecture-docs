# Phase 5: Construction Documentation (LOD 400)

::: tip Phase Overview
**What you do:** Create detailed construction drawings and specifications for contractors
**BIM LOD:** LOD 400 - Fabrication-ready geometry, complete specifications
**Timeline:** 4-6 weeks
**Deliverables:** Detailed drawings, element specifications, material specifications, installation instructions
:::

---

## What Happens in This Phase

Construction Documentation is where you:
1. Create fabrication-ready details for all building elements
2. Document every wall type, floor type, window type, door type
3. Specify exact manufacturers and product codes
4. Provide installation instructions for contractors
5. Create quality control procedures
6. Prepare tender/bid documentation

**This documentation goes to contractors for pricing and construction.**

---

## BIM Requirements - LOD 400

### Level of Development
**LOD 400 = Fabrication geometry with complete specifications**

At this level, BIM elements have:
- **Geometry:** Fabrication-ready, exact dimensions
- **Properties:** Complete specifications, manufacturers, product codes
- **Purpose:** Construction, procurement, fabrication
- **Detail:** Sufficient for contractor to order and install

```yaml
bimLOD: "LOD_400"
elements:
  externalWall_TypeA:
    ifcEntity: "IfcWallStandardCase"
    objectType: "ExternalWall_TypeA"
    globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
    layers:
      - material: "Ceresit CT 60 render"
        manufacturer: "Henkel Polska"
        productCode: "CT-60-WHITE"
        thickness: 15
        unit: "mm"
      - material: "Solbet AAC block"
        manufacturer: "Solbet"
        productCode: "SOLBET-400-200"
        thickness: 200
        unit: "mm"
    properties:
      Pset_WallCommon:
        LoadBearing: true
        IsExternal: true
        ThermalTransmittance: 0.18
        FireRating: "REI 60"
        AcousticRating: "Rw 55 dB"
```

[Learn about LOD 400 →](/en/bim-integration/lod-definitions#lod-400)

---

## Documents to Create

### Element Specifications
**Purpose:** Detailed specification for EVERY building element type

**Document every element:**
- All wall types (external walls, internal walls, partitions)
- All floor/ceiling types
- All window types
- All door types
- Stairs
- Roof assembly
- Foundation details

**Example structure:**

```yaml
---
documentType: "element_specification"
elementType: "external_wall"
elementName: "External Wall Type A"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
version: "1.0.0"
---
```

**Contents of each specification:**
1. Element description
2. IFC mapping (IFC class, GUID, properties)
3. Layer-by-layer build-up with manufacturers
4. Technical performance (thermal, fire, acoustic)
5. Installation instructions
6. Quality control criteria
7. Related details and drawings

[See complete element specification example →](/en/examples/green-terrace/external-wall-type-a)
[Space Document Template →](/en/templates/space-template)

---

### Material Specifications
**Purpose:** Detailed specifications for all materials

**YAML structure:**
```yaml
---
documentType: "material_specification"
materialName: "XPS Insulation - Styrodur 3035 CS"
bimLOD: "LOD_400"
version: "1.0.0"

manufacturer:
  name: "BASF Polska"
  website: "https://www.basf.com"
  contact: "+48 22 XXX XXXX"

product:
  productName: "Styrodur 3035 CS"
  productCode: "STY-3035-CS-150"
  standard: "PN-EN 13164"

technical:
  thermalConductivity: 0.034  # W/(m·K)
  compressiveStrength: 300    # kPa
  waterAbsorption: "< 0.2%"
  fireClass: "E"

procurement:
  supplierRecommended: "Supplier Name"
  leadTime: "2 weeks"
  costPerSqm: "45 PLN/m²"
---
```

[Asset Document Template →](/en/templates/asset-template)

---

### Construction Details
**Purpose:** Large-scale detail drawings showing connections

**Typical details needed:**
- Wall-to-foundation connection
- Wall-to-floor connection
- Wall-to-roof connection
- Window installation detail
- Door installation detail
- Balcony connection
- Waterproofing details
- Thermal bridge mitigation

**Scale:** Typically 1:5 or 1:10

---

### Installation Instructions
**Purpose:** Guide contractors on proper installation

**Example for External Wall:**

```markdown
## Installation Procedure - External Wall Type A

### 1. Preparation
- Verify foundation is level and clean
- Check moisture barrier is in place

### 2. Block Installation
- Lay Solbet AAC blocks with thin-bed mortar
- Maximum joint thickness: 3mm
- Ensure plumb and level

### 3. Insulation Installation
- Apply Styrodur XPS boards with PU adhesive
- Mechanical fastening: 6 fasteners per m²
- Stagger joints between boards

### 4. Render Application
- Apply Ceresit CT 60 render
- Minimum thickness: 15mm
- Cure time: 7 days before painting

### 5. Quality Control
- Verify thermal bridge-free installation
- Check waterproofing at all penetrations
- Thermography inspection recommended
```

---

### Quality Control Procedures
**Purpose:** Define inspection and testing requirements

```yaml
---
documentType: "quality_control"
projectPhase: "construction_docs"

inspections:
  - stage: "Foundation"
    tests:
      - "Concrete strength test"
      - "Reinforcement inspection"
    frequency: "Every pour"

  - stage: "External walls"
    tests:
      - "Thermal bridge inspection"
      - "Blower door test (airtightness)"
    frequency: "Upon completion"

  - stage: "Windows"
    tests:
      - "Installation quality check"
      - "Water penetration test (sample)"
    frequency: "Every floor"
---
```

---

## BIM Workflow - LOD 400

### Create Fabrication-Ready Model:

**In Revit:**
1. All wall types with exact layer thicknesses
2. Specific manufacturer families for windows/doors
3. Detailed connections and assemblies
4. Complete property sets (Psets)
5. Material specifications in model
6. Export to IFC 4.0

### Synchronize BIM → Markdown:

```bash
# Export IFC from BIM tool
# File > Export > IFC 4.0 > construction-docs.ifc

# Generate element specifications
python ../bim-sync/ifc-to-markdown.py \
  --input construction-docs.ifc \
  --output 05-construction-docs/specifications/ \
  --lod LOD_400 \
  --include-all-properties \
  --include-manufacturers

# Review generated specifications
cd 05-construction-docs/specifications/
ls -l
# external-wall-type-a.md
# external-wall-type-b.md
# floor-slab-type-a.md
# window-type-a.md
# ...

# Review and commit
git diff
git add .
git commit -m "Sync BIM specifications to markdown - LOD 400"
```

[Learn about BIM to Markdown →](/en/bim-integration/bidirectional-sync)

---

## Export for Contractors

### PDF Export for Tender:
```bash
cd 05-construction-docs/

# Export all specifications
for file in specifications/*.md; do
  pandoc "$file" -o "specifications/$(basename "$file" .md).pdf" \
    --template=../templates/pandoc/architectural-doc.latex \
    --pdf-engine=xelatex
done

# Create complete specification book
pdftk specifications/*.pdf cat output specification-book.pdf
```

[Complete PDF export guide →](/en/guides/pdf-export)

---

## Git Workflow

```bash
# Create construction docs folder
mkdir 05-construction-docs
cd 05-construction-docs

# Create structure
mkdir specifications
mkdir materials
mkdir details
mkdir bim

# Create specifications for ALL elements
touch specifications/external-wall-type-a.md
touch specifications/external-wall-type-b.md
touch specifications/floor-slab-type-a.md
touch specifications/floor-slab-type-b.md
touch specifications/window-type-a.md
touch specifications/door-type-a.md
touch specifications/stairs.md
touch specifications/roof-assembly.md
# ... etc for ALL element types

# Create material specs
touch materials/concrete-c3037.md
touch materials/xps-insulation.md
touch materials/window-pvc-profile.md
# ... etc

# Commit incrementally
git add specifications/external-wall-type-a.md
git commit -m "Add external wall type A specification - LOD 400"

# Final commit when complete
git add .
git commit -m "Construction documentation complete - all elements at LOD 400"
git tag construction-docs-v1.0
```

---

## Example Project

**Green Terrace Building - Construction Documentation**
- [External Wall Type A →](/en/examples/green-terrace/external-wall-type-a)
- [Complete Specifications →](/en/examples/green-terrace/)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

The [Semantic Building Model (SBM)](/en/documentation/overview) reaches full specification depth during Construction Documentation. At this phase, document types contain fabrication-ready data for procurement and construction.

### Asset Instance Documents
Equipment is fully specified with manufacturer, model, and product codes. Asset Instance document types are created for all mechanical, electrical, and plumbing (MEP) equipment.

[Learn about Asset Instance documents →](/en/documentation/entities/asset-instance)

### System Documents
System document types for HVAC, electrical, and plumbing are fully specified with component lists, sizing calculations, and performance requirements.

[Learn about System documents →](/en/documentation/entities/system)

### Space Documents at LOD 400
Space document types contain fabrication-ready specifications including exact finishes, performance requirements, and equipment schedules.

### Compiler Output
The SBM compiler generates `bim_mapping.json` with Revit shared parameters, enabling direct BIM synchronization from document type definitions.

[Learn about the SBM compiler →](/en/documentation/compiler/)

### Example: Asset Instance Document

```yaml
entity: asset_instance
id: asset-boiler-01
name: "Central Gas Boiler"
system: system-heating-central
location: space-technical-room-01

manufacturer:
  name: "Viessmann"
  model: "Vitodens 200-W"
  productCode: "B2HF-120"
  capacity: "120 kW"
  efficiency: "98%"

specifications:
  fuelType: "natural_gas"
  flowTemperature: "80°C"
  returnTemperature: "60°C"
  electricalSupply: "230V/50Hz"
  flueType: "concentric"
  weight: "89 kg"

procurement:
  leadTime: "4 weeks"
  supplier: "Viessmann Polska"
  estimatedCost: "€8,500"

compliance:
  standard: "PN-EN 15502"
  certification: "CE"
  energyLabel: "A"
```

[View SBM document type documentation →](/en/documentation/entities/)
[View SBM authoring guide →](/en/documentation/authoring/)

---

## Project Controls at This Phase

### Drawing Quality Assurance
All construction drawings must pass QA review before issue. Check dimensions, annotations, cross-references.
- [Review procedures →](/en/quality/review-procedures)
- [Document control →](/en/project-management/document-control)

### Tender Support
If competitive tendering, prepare bill of quantities and specification packages from documentation.
- [Document control →](/en/project-management/document-control)

### Permit Tracking
Monitor building permit application status. Respond to authority queries promptly.
- [Building permit process →](/en/regulations/building-permit)

### LOD/LOI Verification
Verify BIM model meets LOD 400 requirements with specific products and fabrication details.
- [LOD/LOI matrix →](/en/bim-integration/lod-loi)

---

## Next Steps

Once construction documentation is complete:

**Continue to Phase 6:**
[→ Construction Phase](/en/phases/construction)

**Or go back:**
[← Phase 4: Design Development](/en/phases/design-development)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

Before releasing to contractors:

- [ ] Specification created for EVERY element type used
- [ ] All specifications include manufacturers and product codes
- [ ] BIM model complete at LOD 400
- [ ] All material specifications documented
- [ ] Installation instructions provided for critical elements
- [ ] Quality control procedures defined
- [ ] All details drawn at appropriate scale (1:5, 1:10)
- [ ] BIM synchronized to markdown specifications
- [ ] All specifications exported to PDF
- [ ] Complete specification book assembled
- [ ] All documents reviewed by consultants
- [ ] Documents ready for tender/bid
