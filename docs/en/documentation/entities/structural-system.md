# Structural System (Structural Documentation)

## What This Is

A **Structural System** file describes the load-bearing configuration of a building: structural frame type, foundations, lateral stability system, design loads, and seismic design. Examples: "Reinforced Concrete Frame with Strip Foundations", "Steel Frame with Concrete Core".

::: tip For Architects
**Problem:** The structural engineer sends calculations as a PDF, the column grid as a DWG, and the steel specification in an Excel spreadsheet. Coordinating changes (e.g., changing the column spacing from 6m to 7.2m) requires updating 4 different documents across 3 disciplines.

**Old way:** Structural information is scattered across discipline drawings, structural calculations, specifications, and load schedules. Checking whether a floor meets imposed load requirements means searching through 3 files.

**With Structural System:** One file per structural subsystem (superstructure, foundation, floor). Design parameters, loads, column grid, and materials in one place. The compiler automatically links the system to the building, levels, and material types.

**One structural system file = a complete structural specification with design parameters.**
:::

A **Structural System** represents a load-bearing subsystem of a building — from foundations through the main frame to the roof. It contains design parameters, loads, structural grid, and material references. It enables coordination between architect and structural engineer within a single data model.

## Purpose

Structural Systems define:
- Structural frame type (reinforced concrete, steel, timber, masonry)
- Design parameters (design life, importance class, exposure class, fire resistance)
- Design loads (dead, imposed, snow, wind)
- Structural grid (column spacings, grid modules)
- Foundations (type, founding depth, bearing capacity)
- References to material types
- Seismic design category (where applicable)
- Links to levels and construction packages

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique structural system identifier | `"STR-FRAME-01"` |
| `entityType` | string | Must be `"structural_system"` | `"structural_system"` |
| `systemName` | string | Human-readable name | `"RC Frame - Main Building"` |
| `structuralCategory` | string | System category (see enum) | `"superstructure"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `version` | string | Semantic version | `"2.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Identifier with `STR-` prefix. Use descriptive suffixes: `STR-FRAME-01` (frame), `STR-FOUND-01` (foundation), `STR-ROOF-01` (roof structure)
- **systemName**: What you call it ("RC Frame", "Strip Foundations", "Timber Roof Structure")
- **structuralCategory**: Category — `superstructure`, `foundation`, `lateral_system`, `roof_structure`
- **buildingId**: Which building
- **version**: Track changes

**You only NEED these 6 fields.** Design parameters, loads, and grid are added as the project progresses.
:::

### Structural Category Enum

| Value | Purpose | Examples |
|-------|---------|----------|
| `superstructure` | Above-ground structural frame | RC frame, steel frame, timber frame, loadbearing masonry |
| `foundation` | Foundations and substructure | Strip, pad, raft, piled, basement walls |
| `lateral_system` | Lateral stability system | Concrete core, shear walls, portal frames |
| `roof_structure` | Roof structure | Roof trusses, purlins, glulam beams, flat roof |
| `floor_structure` | Floor structure | RC slabs, composite steel-concrete, post-tensioned |
| `retaining` | Retaining structures | Retaining walls, gabions |
| `other` | Other structural systems | Special structures, temporary works |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Structural system description and purpose |
| `parentStructuralSystemId` | string | Parent structural system ID |
| `structuralType` | string | Specific frame type (see enum) |
| `designParameters` | object | Design parameters (design life, class, exposure) |
| `loads` | object | Design loads (dead, imposed, snow, wind) |
| `foundationDetails` | object | Foundation details (type, depth, bearing capacity) |
| `gridSystem` | object | Structural grid (axes, spacings) |
| `materialTypeIds` | array | Material type IDs used in the structure |
| `servedLevelIds` | array | Level IDs served by this system |
| `requirements` | array | Structural requirement IDs |
| `constructionPackageId` | string | Construction package ID |
| `responsibility` | object | Responsibility (designer, checker) |
| `cost` | object | Cost tracking (entityCost) |
| `ifcMapping` | object | IFC object mapping |
| `tags` | array | Classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For coordination with the structural engineer:**
- **structuralType** — Frame type (`reinforced_concrete_frame`, `steel_frame`, `timber_frame`)
- **designParameters** — Design life, importance class, exposure class
- **loads** — Loads: dead, imposed, snow, wind (kPa)
- **gridSystem** — Column grid (spacings, axes)

**For building permits:**
- **designParameters.fireResistance** — Required fire resistance (R 60, R 120)
- **designParameters.seismicDesignCategory** — Seismic design category (where applicable)
- **foundationDetails** — Foundation type and depth

**For cost estimation:**
- **materialTypeIds** — References to material types (concrete, steel, timber)
- **cost** — Structural element costs
- **constructionPackageId** — Link to construction package

**Most architects fill in:** frame type, column grid, loads, materials. Detailed calculations are completed by the structural engineer.
:::

### Structural Type Enum

| Value | Description |
|-------|-------------|
| `reinforced_concrete_frame` | RC frame (columns + beams + slabs) |
| `precast_concrete_frame` | Precast concrete frame |
| `steel_frame` | Steel frame |
| `timber_frame` | Timber frame (traditional) |
| `clt_panel` | Cross-laminated timber panels (CLT) |
| `glulam_frame` | Glued laminated timber frame (glulam) |
| `masonry_loadbearing` | Loadbearing masonry (clay brick, calcium silicate, AAC) |
| `composite_steel_concrete` | Composite steel-concrete structure |
| `reinforced_concrete_wall` | Loadbearing RC walls |
| `hybrid` | Hybrid structure (e.g., steel frame + concrete core) |

## Design Parameters Object Structure

```yaml
designParameters:
  designLife: 50                     # Design life in years
  importanceClass: "II"              # Building importance class (I-IV)
  exposureClass: "XC1"               # Concrete exposure class per EN 206
  fireResistance: "R 120"            # Required fire resistance
  seismicDesignCategory: "A"         # Seismic design category (A-F)
  seismicZone: null                  # Seismic zone (where applicable)
  groundType: "B"                    # Ground type per Eurocode 8
  reliabilityClass: "RC2"            # Reliability class per EN 1990
```

## Loads Object Structure

```yaml
loads:
  deadLoadKPa: 5.5                   # Dead load (kN/m2)
  liveLoadKPa: 2.0                   # Imposed load (kN/m2)
  snowLoadKPa: 1.2                   # Snow load (kN/m2)
  windPressureKPa: 0.75              # Wind pressure (kN/m2)
  imposedRoofLoadKPa: 0.4            # Imposed roof load (kN/m2)
  partitionAllowanceKPa: 0.8         # Partition allowance (kN/m2)
  loadCombination: "EN 1990"         # Load combination standard
```

## Foundation Details Object Structure

```yaml
foundationDetails:
  foundationType: "strip"             # Type: strip, pad, raft, piled, combined
  foundationDepth: 1.2                # Founding depth (m)
  bearingCapacity: 200                # Bearing capacity (kPa)
  groundwaterLevel: 3.5               # Groundwater level (m below ground)
  soilType: "Sandy clay"              # Soil type
  frostDepth: 1.0                     # Frost depth (m)
  waterproofing: "bituminous"         # Waterproofing type
```

## Grid System Object Structure

```yaml
gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]     # Spacings in meters
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"
```

## Responsibility Object Structure

```yaml
responsibility:
  structuralEngineer: "James Mitchell, PE"
  designCompany: "Mitchell Structural Engineers Ltd."
  verifier: "Dr. Sarah Chen, PE"
  designDate: "2026-03-15"
  lastReviewDate: "2026-06-01"
```

## Example 1: First Structural System File (Minimal)

**The simplest structural system file to get started:**

::: code-group

```markdown [Markdown]
File: structural-systems/str-frame-01.md

---
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "RC Frame - Main Building"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

# Basic parameters
structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  fireResistance: "R 120"
  exposureClass: "XC1"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
---

# RC Frame - Main Building

Cast-in-place reinforced concrete frame with C30/37 concrete and Grade 500 rebar.
Column grid 6.0 x 5.4 m, 4 above-ground stories.
```

```yaml [YAML]
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "RC Frame - Main Building"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  fireResistance: "R 120"
  exposureClass: "XC1"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
```

```json [JSON]
{
  "id": "STR-FRAME-01",
  "entityType": "structural_system",
  "systemName": "RC Frame - Main Building",
  "structuralCategory": "superstructure",
  "buildingId": "BLD-01",
  "version": "2.0.0",
  "structuralType": "reinforced_concrete_frame",
  "designParameters": {
    "designLife": 50,
    "fireResistance": "R 120",
    "exposureClass": "XC1"
  },
  "loads": {
    "deadLoadKPa": 5.5,
    "liveLoadKPa": 2.0,
    "snowLoadKPa": 1.2
  }
}
```

```json [Schema]
{
  "required": ["id", "entityType", "systemName", "structuralCategory", "buildingId", "version"]
}
```

:::

**That's it.** Column grid, foundations, and material details are added by the structural engineer in later phases.

---

## Example 2: Full Structural System (All Details)

**File:** `structural-systems/str-frame-01-full.md`

::: code-group

```markdown [Markdown]
---
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "RC Frame - Main Building"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

description: "Cast-in-place RC frame with 6.0 x 5.4 m column grid. 4 above-ground stories + 1 basement. C30/37 concrete, Grade 500 rebar."

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  importanceClass: "II"
  exposureClass: "XC1"
  fireResistance: "R 120"
  reliabilityClass: "RC2"
  seismicDesignCategory: "A"
  groundType: "B"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
  windPressureKPa: 0.75
  partitionAllowanceKPa: 0.8
  loadCombination: "EN 1990"

gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"

materialTypeIds:
  - "MT-CONCRETE-C30-37"
  - "MT-REBAR-GR500"

servedLevelIds:
  - "LVL-B1"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"

requirements:
  - "REQ-STRUCT-FIRE-R120"
  - "REQ-STRUCT-DEFLECTION"

constructionPackageId: "CP-STRUCTURE"

responsibility:
  structuralEngineer: "James Mitchell, PE"
  designCompany: "Mitchell Structural Engineers Ltd."
  verifier: "Dr. Sarah Chen, PE"
  designDate: "2026-03-15"

cost:
  totalCost: 720000
  currency: "USD"
  basis: "structural_estimate_phase_4"

ifcMapping:
  ifcEntity: "IfcStructuralAnalysisModel"
  globalId: "2Xk9pM$rNCxv3WxEt2MOwR"
  objectType: "ReinforcedConcreteFrame"

tags:
  - "rc-frame"
  - "cast-in-place"
  - "building-01"
  - "structure"
---

# RC Frame - Main Building

Cast-in-place reinforced concrete frame with 6.0 x 5.4 m column grid.
4 above-ground stories + 1 basement.
C30/37 concrete, Grade 500 rebar. Fire resistance R 120.
```

```yaml [YAML]
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "RC Frame - Main Building"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

description: "Cast-in-place RC frame with 6.0 x 5.4 m column grid. 4 above-ground stories + 1 basement. C30/37 concrete, Grade 500 rebar."

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  importanceClass: "II"
  exposureClass: "XC1"
  fireResistance: "R 120"
  reliabilityClass: "RC2"
  seismicDesignCategory: "A"
  groundType: "B"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
  windPressureKPa: 0.75
  partitionAllowanceKPa: 0.8
  loadCombination: "EN 1990"

gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"

materialTypeIds:
  - "MT-CONCRETE-C30-37"
  - "MT-REBAR-GR500"

servedLevelIds:
  - "LVL-B1"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"

requirements:
  - "REQ-STRUCT-FIRE-R120"
  - "REQ-STRUCT-DEFLECTION"

constructionPackageId: "CP-STRUCTURE"

responsibility:
  structuralEngineer: "James Mitchell, PE"
  designCompany: "Mitchell Structural Engineers Ltd."
  verifier: "Dr. Sarah Chen, PE"
  designDate: "2026-03-15"

cost:
  totalCost: 720000
  currency: "USD"
  basis: "structural_estimate_phase_4"

ifcMapping:
  ifcEntity: "IfcStructuralAnalysisModel"
  globalId: "2Xk9pM$rNCxv3WxEt2MOwR"
  objectType: "ReinforcedConcreteFrame"

tags:
  - "rc-frame"
  - "cast-in-place"
  - "building-01"
  - "structure"
```

```json [JSON]
{
  "id": "STR-FRAME-01",
  "entityType": "structural_system",
  "systemName": "RC Frame - Main Building",
  "structuralCategory": "superstructure",
  "buildingId": "BLD-01",
  "version": "2.0.0",
  "description": "Cast-in-place RC frame with 6.0 x 5.4 m column grid. 4 above-ground stories + 1 basement. C30/37 concrete, Grade 500 rebar.",
  "structuralType": "reinforced_concrete_frame",
  "designParameters": {
    "designLife": 50,
    "importanceClass": "II",
    "exposureClass": "XC1",
    "fireResistance": "R 120",
    "reliabilityClass": "RC2",
    "seismicDesignCategory": "A",
    "groundType": "B"
  },
  "loads": {
    "deadLoadKPa": 5.5,
    "liveLoadKPa": 2.0,
    "snowLoadKPa": 1.2,
    "windPressureKPa": 0.75,
    "partitionAllowanceKPa": 0.8,
    "loadCombination": "EN 1990"
  },
  "gridSystem": {
    "axes": [
      {
        "direction": "x",
        "labels": ["A", "B", "C", "D", "E"],
        "spacings": [6.0, 6.0, 6.0, 6.0]
      },
      {
        "direction": "y",
        "labels": ["1", "2", "3", "4"],
        "spacings": [5.4, 5.4, 5.4]
      }
    ],
    "columnSize": "400x400 mm",
    "beamDepth": "600 mm"
  },
  "materialTypeIds": [
    "MT-CONCRETE-C30-37",
    "MT-REBAR-GR500"
  ],
  "servedLevelIds": [
    "LVL-B1",
    "LVL-01",
    "LVL-02",
    "LVL-03",
    "LVL-04"
  ],
  "requirements": [
    "REQ-STRUCT-FIRE-R120",
    "REQ-STRUCT-DEFLECTION"
  ],
  "constructionPackageId": "CP-STRUCTURE",
  "responsibility": {
    "structuralEngineer": "James Mitchell, PE",
    "designCompany": "Mitchell Structural Engineers Ltd.",
    "verifier": "Dr. Sarah Chen, PE",
    "designDate": "2026-03-15"
  },
  "cost": {
    "totalCost": 720000,
    "currency": "USD",
    "basis": "structural_estimate_phase_4"
  },
  "ifcMapping": {
    "ifcEntity": "IfcStructuralAnalysisModel",
    "globalId": "2Xk9pM$rNCxv3WxEt2MOwR",
    "objectType": "ReinforcedConcreteFrame"
  },
  "tags": [
    "rc-frame",
    "cast-in-place",
    "building-01",
    "structure"
  ]
}
```

```json [Schema]
{
  "required": ["id", "entityType", "systemName", "structuralCategory", "buildingId", "version"]
}
```

:::

## Compiled Output

```json
{
  "entities": {
    "structural_systems": [
      {
        "id": "STR-FRAME-01",
        "entityType": "structural_system",
        "systemName": "RC Frame - Main Building",
        "structuralCategory": "superstructure",
        "buildingId": "BLD-01",
        "structuralType": "reinforced_concrete_frame",
        "designParameters": {
          "designLife": 50,
          "fireResistance": "R 120"
        },
        "loads": {
          "deadLoadKPa": 5.5,
          "liveLoadKPa": 2.0,
          "snowLoadKPa": 1.2
        },
        "materialTypeIds": [
          "MT-CONCRETE-C30-37",
          "MT-REBAR-GR500"
        ]
      }
    ]
  }
}
```

## Structural System Hierarchy

Structural systems can form hierarchies using `parentStructuralSystemId`:

```yaml
# Parent system: entire load-bearing structure
---
id: "STR-MAIN-01"
entityType: "structural_system"
systemName: "Main Building Structure"
structuralCategory: "superstructure"
buildingId: "BLD-01"
---

# Subsystem: foundations
---
id: "STR-FOUND-01"
entityType: "structural_system"
systemName: "Foundations - RC Strip Footings"
structuralCategory: "foundation"
parentStructuralSystemId: "STR-MAIN-01"
buildingId: "BLD-01"
---

# Subsystem: roof structure
---
id: "STR-ROOF-01"
entityType: "structural_system"
systemName: "Roof Structure - Timber Trusses"
structuralCategory: "roof_structure"
parentStructuralSystemId: "STR-MAIN-01"
buildingId: "BLD-01"
---
```

**Benefits:**
- Decompose complex structures into logical subsystems
- Track costs and materials separately per subsystem
- Independent construction phases (foundations, frame, roof)
- Coordinate with construction packages

## Integration with Material Types

Structural systems reference material types through `materialTypeIds`:

```yaml
# Structural system uses material types
materialTypeIds:
  - "MT-CONCRETE-C30-37"    # Concrete for columns and beams
  - "MT-REBAR-GR500"        # Reinforcement bar
  - "MT-CONCRETE-C25-30"    # Concrete for slabs

# The compiler automatically:
# 1. Verifies each materialTypeId exists
# 2. Retrieves fire data from material types
# 3. Includes embodied carbon in LCA calculations
```

## BIM Mapping

Structural Systems map to IFC structural analysis models:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_StructuralSystem.SBM_ID` |
| `systemName` | `Structural System Name` | `IfcStructuralAnalysisModel.Name` |
| `structuralCategory` | `SBM_Structural_Category` | `Pset_SBM_StructuralSystem.Category` |
| `structuralType` | `Structural Type` | `IfcStructuralAnalysisModel.PredefinedType` |
| `designParameters.fireResistance` | `Fire Rating` | `Pset_StructuralMember.FireRating` |
| `loads.deadLoadKPa` | `Dead Load` | `Pset_StructuralSurfaceMember.SelfWeightLoad` |
| `loads.liveLoadKPa` | `Live Load` | `Pset_StructuralSurfaceMember.ImposedLoad` |
| `gridSystem` | `Grid` | `IfcGrid` |

## See Also

- **[Building](/en/documentation/entities/building)** - Buildings containing structural systems
- **[Material Type](/en/documentation/entities/material-type)** - Materials used in the structure
- **[Level](/en/documentation/entities/level)** - Levels served by the system
- **[Envelope](/en/documentation/entities/envelope)** - Envelope elements working with the structure
- **[Requirement](/en/documentation/entities/requirement)** - Structural and fire requirements
- **Schema:** `sbm-schema-v2.0.json` - Structural System definition
