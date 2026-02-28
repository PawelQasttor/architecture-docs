# Envelope (Wall / Roof / Slab)

## What This Is

An **Envelope** file describes a physical building element that separates spaces: walls, roofs, floor slabs, curtain walls, below-grade walls. Each file captures the full construction assembly — layer by layer — plus thermal, acoustic, and fire performance.

::: tip For Architects
**Problem:** Wall buildups, U-value calculations, and fire ratings live in separate spreadsheets, PDFs, and BIM models. Checking if a facade meets WT 2021 § 328 means hunting through 3 different files.

**Old way:** Specification text references a drawing detail, which references a calculation sheet, which references a product data sheet.

**With envelope file:** One file per element type. All layers, all performance values, all compliance checks in one place. The compiler links it to the spaces it separates and the building it belongs to.

**One envelope file = complete assembly specification.**
:::

An **Envelope** represents a physical construction element — the material assembly that forms walls, roofs, floors, and facades. It captures what the element is made of, how it performs, and which spaces it separates.

## Purpose

Envelopes define:
- Construction layer assembly (materials, thicknesses, thermal conductivity)
- Thermal performance (U-value calculated vs. required)
- Acoustic performance (Rw, impact sound Ln,w)
- Fire resistance (design rating vs. required rating)
- Moisture control (vapor, airtightness, waterproofing)
- Openings (windows, doors with their own performance data)
- Boundary spaces (which rooms are on each side)
- IFC mapping (IfcWallStandardCase, IfcSlab, IfcRoof, IfcCurtainWall)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique envelope identifier | `"ENV-EW-01"` |
| `entityType` | string | Must be `"envelope"` | `"envelope"` |
| `envelopeName` | string | Human-readable name | `"External Wall Type A"` |
| `envelopeType` | string | Classification | `"external_wall"` |
| `buildingId` | string | Parent building reference | `"BLD-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Element identifier with `ENV-` prefix. Use descriptive suffixes: `ENV-EW-01` (external wall), `ENV-RF-01` (roof), `ENV-FS-GF` (ground floor slab)
- **envelopeType**: What kind of element — see the enum list below
- **buildingId**: Which building this element belongs to

**You only NEED these fields.** Add layers, performance data, and openings as the design develops.
:::

## Envelope Types

| Value | Description | IFC Entity |
|-------|-------------|------------|
| `external_wall` | Exterior load-bearing or non-bearing wall | `IfcWallStandardCase` |
| `internal_wall` | Interior wall between different spaces | `IfcWallStandardCase` |
| `partition` | Non-load-bearing interior divider | `IfcWall` |
| `roof` | Pitched or sloped roof assembly | `IfcRoof` |
| `flat_roof` | Flat or low-slope roof | `IfcRoof` |
| `green_roof` | Vegetated roof assembly | `IfcRoof` |
| `floor_slab` | Intermediate floor between levels | `IfcSlab` |
| `ground_floor_slab` | Ground-contact floor slab | `IfcSlab` |
| `curtain_wall` | Non-structural glazed facade system | `IfcCurtainWall` |
| `below_grade_wall` | Basement / retaining wall | `IfcWall` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `boundarySpaceIds` | string[] | Space IDs on each side (1 for external, 2 for internal) |
| `levelIds` | string[] | Levels this element spans |
| `orientation` | string | Cardinal direction: N, NE, E, SE, S, SW, W, NW, horizontal |
| `isExternal` | boolean | True if part of the building exterior |
| `isLoadBearing` | boolean | True if structural function |
| `grossArea` | number | Gross area in m² (before openings) |
| `netArea` | number | Net area in m² (after openings) |
| `totalThickness` | number | Total assembly thickness in mm |
| `construction` | object | Layer-by-layer specification (see below) |
| `thermalPerformance` | object | U-value, condensation risk, thermal bridges |
| `acousticPerformance` | object | Rw, impact sound, test certificates |
| `firePerformance` | object | Fire rating, reaction to fire class |
| `moistureControl` | object | Vapor control, airtightness, waterproofing |
| `openings` | array | Windows, doors, rooflights in this element |
| `glazingRatio` | number | Window-to-wall ratio (0-1) |
| `regulatoryCompliance` | array | Regulation checks with status |
| `cost` | object | Cost tracking (v0.4 entityCost) |
| `ifcMapping` | object | IFC entity, globalId, materialLayerSet |
| `tags` | string[] | Labels for filtering |

## Construction Layers

The `construction.layers` array describes each material layer from outside to inside:

```yaml
construction:
  assemblyType: "ventilated_cavity"
  layers:
    - order: 1
      material: "Mineral render"
      thickness: 15
      thermalConductivity: 0.82
      function: "finish"
      fireClass: "A1"
    - order: 2
      material: "AAC blocks (Ytong PP4/0.6)"
      thickness: 200
      thermalConductivity: 0.55
      density: 600
      function: "structural"
      manufacturer: "Ytong"
      productCode: "PP4/0.6"
      fireClass: "A1"
    - order: 3
      material: "XPS insulation (Styrodur 3035 CS)"
      thickness: 180
      thermalConductivity: 0.035
      function: "insulation"
      manufacturer: "BASF"
      productCode: "3035 CS"
      fireClass: "E"
    - order: 4
      material: "Ventilated air cavity"
      thickness: 40
      function: "cavity"
    - order: 5
      material: "Gypsum plasterboard (Rigips RB)"
      thickness: 12.5
      thermalConductivity: 0.21
      function: "finish"
      manufacturer: "Rigips"
      productCode: "RB 12.5mm"
      fireClass: "A2"
```

### Assembly Types

| Value | Description |
|-------|-------------|
| `solid` | Single-layer or bonded multi-layer (masonry, concrete) |
| `cavity` | Traditional cavity wall with air gap |
| `ventilated_cavity` | Drained and ventilated rainscreen |
| `rain_screen` | Pressure-equalized rainscreen facade |
| `etics` | External Thermal Insulation Composite System |
| `framed` | Timber or steel frame with infill |
| `sandwich_panel` | Factory-assembled sandwich panels |
| `green_assembly` | Vegetated assembly (green roof/wall) |

### Layer Functions

| Value | Description |
|-------|-------------|
| `structural` | Load-bearing layer (masonry, concrete, steel) |
| `insulation` | Thermal insulation |
| `finish` | Interior or exterior finish |
| `vapor_barrier` | Vapor control layer |
| `air_barrier` | Airtightness layer |
| `drainage` | Water drainage layer |
| `substrate` | Base layer for finishes |
| `cladding` | External cladding |
| `sheathing` | Structural sheathing |
| `cavity` | Air gap (ventilated or static) |

## Performance Objects

### Thermal Performance

```yaml
thermalPerformance:
  uValue: 0.18
  uValueRequired: 0.20
  calculationMethod: "PN-EN ISO 6946"
  condensationRisk: false
  thermalBridgePsi: 0.05
```

### Acoustic Performance

```yaml
acousticPerformance:
  rw: 55
  rwRequired: 50
  impactSoundLn: null  # only for floors
  testCertificate: "AC2024-5678"
```

### Fire Performance

```yaml
firePerformance:
  fireRating: "REI 90"
  fireRatingRequired: "REI 60"
  reactionToFire: "A2-s1,d0"
  testCertificate: "FR2024-1234"
```

## Openings

Windows, doors, and other penetrations are part of the envelope:

```yaml
openings:
  - id: "WIN-EW01-001"
    openingType: "window"
    width: 1200
    height: 1500
    area: 1.8
    uValue: 0.90
    gValue: 0.50
    acousticRw: 35
    manufacturer: "Internorm"
    productCode: "KF 410"
  - id: "DOOR-EW01-001"
    openingType: "door"
    width: 1000
    height: 2100
    area: 2.1
    uValue: 1.30
    fireRating: "EI 30"
```

## Compiler Behavior

The SBM Compiler handles envelopes as follows:

| Stage | What Happens |
|-------|-------------|
| **Parse** | Extracts `entityType: "envelope"` from Markdown frontmatter |
| **Normalize** | Groups envelopes, computes building→envelope reverse relationship (`building.envelopeIds`), rolls up envelope costs into building costs |
| **Validate** | Checks `ENV-` ID pattern, verifies `buildingId` exists, verifies `boundarySpaceIds` reference valid spaces, verifies `levelIds` reference valid levels |
| **Quality** | Generates `_quality` summary per envelope (field completeness, confidence levels) |
| **Targets** | Includes envelopes in BIM mapping output and twin schema |

## IFC Mapping

| Envelope Type | IFC Entity | Pset |
|---------------|-----------|------|
| External wall | `IfcWallStandardCase` | `Pset_WallCommon` |
| Internal wall | `IfcWallStandardCase` | `Pset_WallCommon` |
| Partition | `IfcWall` | `Pset_WallCommon` |
| Roof | `IfcRoof` | `Pset_RoofCommon` |
| Floor slab | `IfcSlab` | `Pset_SlabCommon` |
| Curtain wall | `IfcCurtainWall` | `Pset_CurtainWallCommon` |

## Complete Example

```yaml
---
id: "ENV-EW-01"
entityType: "envelope"
envelopeName: "External Wall Type A"
envelopeType: "external_wall"
buildingId: "BLD-01"
boundarySpaceIds:
  - "SP-BLD-01-L01-001"
levelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
orientation: "N"
isExternal: true
isLoadBearing: true
grossArea: 1245
netArea: 1050
totalThickness: 447.5
construction:
  assemblyType: "ventilated_cavity"
  layers:
    - order: 1
      material: "Mineral render"
      thickness: 15
      thermalConductivity: 0.82
      function: "finish"
      fireClass: "A1"
    - order: 2
      material: "AAC blocks"
      thickness: 200
      thermalConductivity: 0.55
      function: "structural"
      fireClass: "A1"
    - order: 3
      material: "XPS insulation"
      thickness: 180
      thermalConductivity: 0.035
      function: "insulation"
      fireClass: "E"
    - order: 4
      material: "Ventilated air cavity"
      thickness: 40
      function: "cavity"
    - order: 5
      material: "Gypsum plasterboard"
      thickness: 12.5
      thermalConductivity: 0.21
      function: "finish"
      fireClass: "A2"
thermalPerformance:
  uValue: 0.18
  uValueRequired: 0.20
  calculationMethod: "PN-EN ISO 6946"
  condensationRisk: false
acousticPerformance:
  rw: 55
  rwRequired: 50
  testCertificate: "AC2024-5678"
firePerformance:
  fireRating: "REI 90"
  fireRatingRequired: "REI 60"
  reactionToFire: "A2-s1,d0"
  testCertificate: "FR2024-1234"
moistureControl:
  vaporControl: "Diffusion-open exterior, sd < 0.5m"
  airtightnessTarget: "0.6 ACH @ 50 Pa"
openings:
  - id: "WIN-EW01-001"
    openingType: "window"
    width: 1200
    height: 1500
    area: 1.8
    uValue: 0.90
    gValue: 0.50
glazingRatio: 0.157
cost:
  totalCost: 192544
  currency: "EUR"
  basis: "architect_estimate_phase_4"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
  materialLayerSet: "ExternalWall_TypeA_Layers"
regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 328"
    requirement: "U ≤ 0.20 W/(m²·K)"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 234"
    requirement: "REI 60 (building height 18.5m)"
    status: "compliant"
version: "1.0.0"
tags:
  - "external-wall"
  - "load-bearing"
  - "building-01"
---

# External Wall Type A

Load-bearing external wall with ventilated cavity, spanning all facades of Building 01.
```

## See Also

- [Building](/en/documentation/entities/building) — the parent entity
- [Space](/en/documentation/entities/space) — spaces separated by envelopes
- [Level](/en/documentation/entities/level) — levels the envelope spans
- [Requirement](/en/documentation/entities/requirement) — regulations that apply to envelope performance
- [BIM Integration](/en/bim-integration/) — IFC property mapping for walls, roofs, slabs
