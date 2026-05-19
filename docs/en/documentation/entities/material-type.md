# Material Type (Material Specification)

## What This Is

A **Material Type** file defines a reusable building material specification: physical, fire, and sustainability properties. Examples: "Concrete C30/37", "Mineral Wool 035 (Knauf)".

::: tip For Architects
**Problem:** The C30/37 concrete specification is repeated across 12 envelope files — walls, slabs, foundations. Change the exposure class? Edit 12 files and hope you don't miss one.

**Old way:** Each envelope contains the full material specification inline — density, thermal conductivity, fire reaction class, manufacturer, product code. 12 envelopes x 15 lines of material data = **180 lines** of repetition.

**With Material Type:** **One template** (60 lines) defines all properties for C30/37 concrete. 12 envelopes reference `MT-CONCRETE-C30-37` in their `materialTypeIds` array. That's **67% less documentation**. Change the exposure class? Edit one file — it affects all envelopes.

**One material type = a complete specification (physical, fire, environmental) defined once.**
:::

A **Material Type** represents a reusable building material specification template. It defines physical properties, fire parameters, environmental data, and cost information. Envelopes, structural systems, and finishes reference material types instead of duplicating specifications.

## Purpose

Material Types define:
- Physical material properties (density, thermal conductivity, strength)
- Fire parameters (reaction to fire, fire resistance)
- Sustainability data (embodied carbon, EPD, recycled content)
- Manufacturer and product code information
- Standards compliance (EN, ASTM, ISO)
- Unit costs with currency

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique material type identifier | `"MT-CONCRETE-C30-37"` |
| `entityType` | string | Must be `"material_type"` | `"material_type"` |
| `materialName` | string | Material name | `"Concrete C30/37"` |
| `materialCategory` | string | Material category (see enum) | `"concrete"` |
| `version` | string | Semantic version | `"2.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Identifier with `MT-` prefix. Use descriptive suffixes: `MT-CONCRETE-C30-37` (concrete), `MT-MW-035` (mineral wool), `MT-STEEL-S355` (steel)
- **materialName**: Full trade or technical name
- **materialCategory**: Material category — `concrete`, `steel`, `timber`, `insulation`, `glass`
- **version**: Track specification changes

**You only NEED these 5 fields.** Add physical, fire, and environmental properties as the project progresses.
:::

### Material Category Enum

| Value | Purpose | Examples |
|-------|---------|----------|
| `concrete` | Concrete and mortar | Concrete C30/37, C25/30, lightweight concrete |
| `steel` | Structural steels | S235, S355, stainless steel |
| `timber` | Wood and engineered timber | Glulam GL24h, CLT, LVL |
| `masonry` | Masonry units and blocks | Clay brick, calcium silicate block, AAC block |
| `glass` | Architectural glass | Tempered glass, IGU, laminated glass |
| `insulation` | Thermal and acoustic insulation | Mineral wool, XPS, EPS, PIR |
| `membrane` | Membranes and films | Roofing membrane, PE film, vapor barrier |
| `plaster` | Plasters and renders | Gypsum plaster, cement-lime render |
| `paint` | Paints and coatings | Latex paint, emulsion paint, intumescent coating |
| `stone` | Natural and artificial stone | Granite, marble, sandstone |
| `ceramic` | Building ceramics | Porcelain tile, clinker, terracotta |
| `composite` | Composite materials | HPL laminates, composite panels |
| `plastic` | Plastics | PVC, HDPE, polycarbonate |
| `metal` | Non-ferrous metals and alloys | Aluminum, copper, zinc, titanium |
| `bitumen` | Bituminous materials | Torch-on membrane, SBS, asphalt |
| `other` | Other materials | Specialty materials, non-standard |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Material description and intended use |
| `manufacturer` | string | Material manufacturer |
| `productCode` | string | Manufacturer product code / SKU |
| `standard` | string | Technical standard (e.g., EN 206, ASTM C150) |
| `physicalProperties` | object | Physical properties (density, conductivity, strength) |
| `fireProperties` | object | Fire parameters (reaction to fire, fire resistance) |
| `sustainability` | object | Sustainability data (embodied carbon, EPD, recycling) |
| `cost` | object | Unit price with currency |
| `classification` | object | Classification (Uniclass, OmniClass, CSI code) |
| `tags` | array | Classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For technical specification:**
- **physicalProperties** — Density, thermal conductivity, compressive strength
- **standard** — Standard reference (EN 206 for concrete, EN 10025 for steel)
- **manufacturer** + **productCode** — Specific product identification

**For fire protection:**
- **fireProperties** — Reaction to fire (A1, A2-s1,d0), fire resistance (REI 120)

**For sustainability certification (BREEAM, LEED):**
- **sustainability** — Embodied carbon (kgCO2e/kg), EPD declaration, recycled content

**For cost estimation:**
- **cost** — Unit price per m3, m2, kg with currency

**Most architects start with:** name, category, thermal conductivity, and fire class. Full EPD and cost data are added in later phases.
:::

## Physical Properties Object Structure

```yaml
physicalProperties:
  density: 2400                    # kg/m3
  thermalConductivity: 1.70        # W/(m-K)
  specificHeatCapacity: 1000       # J/(kg-K)
  compressiveStrength: 30          # MPa (class C30)
  tensileStrength: 2.9             # MPa
  elasticModulus: 33000            # MPa
  porosity: 0.15                   # 0-1
  waterAbsorption: 5               # % by mass
  vapourResistanceFactor: 130      # mu (-)
```

## Fire Properties Object Structure

```yaml
fireProperties:
  reactionToFire: "A1"             # Euroclass (A1, A2-s1,d0, B-s1,d0, ...)
  fireResistance: "REI 120"        # Fire resistance class
  meltingPoint: null               # deg C (if applicable)
  smokeProduction: "s1"            # s1, s2, s3
  flamingDroplets: "d0"            # d0, d1, d2
```

## Sustainability Object Structure

```yaml
sustainability:
  embodiedCarbonKgCO2ePerKg: 0.13  # kgCO2e per kg of material
  embodiedCarbonKgCO2ePerM3: 312   # kgCO2e per m3
  epdReference: "EPD-XYZ-2025-001" # EPD declaration number
  epdUrl: "https://epd-online.com/..."
  recycledContent: 0.30            # 0-1 (30% recycled content)
  recyclability: 0.85              # 0-1 (85% recyclable)
  renewableContent: 0.0            # 0-1
  biogenicCarbonKgCO2ePerKg: 0.0   # biogenic kgCO2e
  lifeCycleStage: "A1-A3"          # Life cycle stages per EN 15804
```

## Cost Object Structure

```yaml
cost:
  unitPrice: 150                   # Unit price
  unit: "m3"                       # Unit: m3, m2, kg, pcs
  currency: "USD"                  # ISO 4217 currency code
  priceDate: "2026-01"             # Price effective date
```

## Example 1: First Material Type File (Minimal)

**The simplest material type file to get started:**

::: code-group

```markdown [Markdown]
File: material-types/mt-concrete-c30-37.md

---
id: "MT-CONCRETE-C30-37"
entityType: "material_type"
materialName: "Concrete C30/37"
materialCategory: "concrete"
version: "2.0.0"

# Basic properties
physicalProperties:
  density: 2400
  thermalConductivity: 1.70
  compressiveStrength: 30

fireProperties:
  reactionToFire: "A1"

standard: "EN 206"
---

# Concrete C30/37

Ready-mix concrete class C30/37 for structural elements.
Exposure class: XC1.
```

```yaml [YAML]
id: "MT-CONCRETE-C30-37"
entityType: "material_type"
materialName: "Concrete C30/37"
materialCategory: "concrete"
version: "2.0.0"

physicalProperties:
  density: 2400
  thermalConductivity: 1.70
  compressiveStrength: 30

fireProperties:
  reactionToFire: "A1"

standard: "EN 206"
```

```json [JSON]
{
  "id": "MT-CONCRETE-C30-37",
  "entityType": "material_type",
  "materialName": "Concrete C30/37",
  "materialCategory": "concrete",
  "version": "2.0.0",
  "physicalProperties": {
    "density": 2400,
    "thermalConductivity": 1.70,
    "compressiveStrength": 30
  },
  "fireProperties": {
    "reactionToFire": "A1"
  },
  "standard": "EN 206"
}
```

```json [Schema]
{
  "required": ["id", "entityType", "materialName", "materialCategory", "version"]
}
```

:::

**That's it.** EPD data, costs, and detailed physical properties can be added in later project phases.

---

## Example 2: Full Material Type (All Details)

**File:** `material-types/mt-mw-035-knauf.md`

::: code-group

```markdown [Markdown]
---
id: "MT-MW-035-KNAUF"
entityType: "material_type"
materialName: "Knauf Insulation TP 115 Mineral Wool 035"
materialCategory: "insulation"
version: "2.0.0"

description: "Glass mineral wool batt for thermal and acoustic insulation of walls, roofs, and floors. Declared lambda 0.035 W/(m-K)."

manufacturer: "Knauf Insulation"
productCode: "TP-115-035-150"
standard: "EN 13162"

physicalProperties:
  density: 15
  thermalConductivity: 0.035
  specificHeatCapacity: 840
  vapourResistanceFactor: 1
  waterAbsorption: 1

fireProperties:
  reactionToFire: "A1"
  smokeProduction: "s1"
  flamingDroplets: "d0"
  meltingPoint: 1000

sustainability:
  embodiedCarbonKgCO2ePerKg: 1.35
  epdReference: "EPD-KNI-2025-038"
  recycledContent: 0.80
  recyclability: 0.90
  lifeCycleStage: "A1-A3"

cost:
  unitPrice: 8.50
  unit: "m2"
  currency: "USD"
  priceDate: "2026-01"

classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"

tags:
  - "thermal-insulation"
  - "mineral-wool"
  - "knauf"
  - "a1-non-combustible"
---

# Knauf Insulation TP 115 Mineral Wool 035

Glass mineral wool batt for thermal and acoustic insulation.
Declared lambda: 0.035 W/(m-K). Reaction to fire class: A1.
```

```yaml [YAML]
id: "MT-MW-035-KNAUF"
entityType: "material_type"
materialName: "Knauf Insulation TP 115 Mineral Wool 035"
materialCategory: "insulation"
version: "2.0.0"

description: "Glass mineral wool batt for thermal and acoustic insulation of walls, roofs, and floors. Declared lambda 0.035 W/(m-K)."

manufacturer: "Knauf Insulation"
productCode: "TP-115-035-150"
standard: "EN 13162"

physicalProperties:
  density: 15
  thermalConductivity: 0.035
  specificHeatCapacity: 840
  vapourResistanceFactor: 1
  waterAbsorption: 1

fireProperties:
  reactionToFire: "A1"
  smokeProduction: "s1"
  flamingDroplets: "d0"
  meltingPoint: 1000

sustainability:
  embodiedCarbonKgCO2ePerKg: 1.35
  epdReference: "EPD-KNI-2025-038"
  recycledContent: 0.80
  recyclability: 0.90
  lifeCycleStage: "A1-A3"

cost:
  unitPrice: 8.50
  unit: "m2"
  currency: "USD"
  priceDate: "2026-01"

classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"

tags:
  - "thermal-insulation"
  - "mineral-wool"
  - "knauf"
  - "a1-non-combustible"
```

```json [JSON]
{
  "id": "MT-MW-035-KNAUF",
  "entityType": "material_type",
  "materialName": "Knauf Insulation TP 115 Mineral Wool 035",
  "materialCategory": "insulation",
  "version": "2.0.0",
  "description": "Glass mineral wool batt for thermal and acoustic insulation of walls, roofs, and floors. Declared lambda 0.035 W/(m-K).",
  "manufacturer": "Knauf Insulation",
  "productCode": "TP-115-035-150",
  "standard": "EN 13162",
  "physicalProperties": {
    "density": 15,
    "thermalConductivity": 0.035,
    "specificHeatCapacity": 840,
    "vapourResistanceFactor": 1,
    "waterAbsorption": 1
  },
  "fireProperties": {
    "reactionToFire": "A1",
    "smokeProduction": "s1",
    "flamingDroplets": "d0",
    "meltingPoint": 1000
  },
  "sustainability": {
    "embodiedCarbonKgCO2ePerKg": 1.35,
    "epdReference": "EPD-KNI-2025-038",
    "recycledContent": 0.80,
    "recyclability": 0.90,
    "lifeCycleStage": "A1-A3"
  },
  "cost": {
    "unitPrice": 8.50,
    "unit": "m2",
    "currency": "USD",
    "priceDate": "2026-01"
  },
  "classification": {
    "uniclass": "Pr_25_71_52_49",
    "omniclass": "23-13 21 17"
  },
  "tags": [
    "thermal-insulation",
    "mineral-wool",
    "knauf",
    "a1-non-combustible"
  ]
}
```

```json [Schema]
{
  "required": ["id", "entityType", "materialName", "materialCategory", "version"]
}
```

:::

## Compiled Output

```json
{
  "entities": {
    "material_types": [
      {
        "id": "MT-CONCRETE-C30-37",
        "entityType": "material_type",
        "materialName": "Concrete C30/37",
        "materialCategory": "concrete",
        "physicalProperties": {
          "density": 2400,
          "thermalConductivity": 1.70,
          "compressiveStrength": 30
        },
        "fireProperties": {
          "reactionToFire": "A1"
        }
      },
      {
        "id": "MT-MW-035-KNAUF",
        "entityType": "material_type",
        "materialName": "Knauf Insulation TP 115 Mineral Wool 035",
        "materialCategory": "insulation",
        "sustainability": {
          "embodiedCarbonKgCO2ePerKg": 1.35,
          "recycledContent": 0.80
        }
      }
    ]
  }
}
```

## Integration with Envelopes

Envelopes reference material types in their construction layers:

```yaml
# Envelope with material type references
construction:
  layers:
    - order: 1
      materialTypeId: "MT-PLASTER-CEMENT-LIME"
      thickness: 15
      function: "finish"
    - order: 2
      materialTypeId: "MT-CONCRETE-C30-37"
      thickness: 200
      function: "structural"
    - order: 3
      materialTypeId: "MT-MW-035-KNAUF"
      thickness: 180
      function: "insulation"
```

**Benefits:**
- Changing a material specification automatically affects all envelopes
- Project-level LCA calculations (summing embodied carbon)
- Consistent fire data across all building elements

## BIM Mapping

Material Types map to IFC material objects:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_MaterialType.SBM_ID` |
| `materialName` | `Material Name` | `IfcMaterial.Name` |
| `materialCategory` | `Material Class` | `IfcMaterial.Category` |
| `physicalProperties.density` | `Density` | `IfcMaterialProperties.MassDensity` |
| `physicalProperties.thermalConductivity` | `Thermal Conductivity` | `IfcMaterialProperties.ThermalConductivity` |
| `fireProperties.reactionToFire` | `Fire Rating` | `Pset_MaterialFire.ReactionToFire` |
| `sustainability.embodiedCarbonKgCO2ePerKg` | `Embodied Carbon` | `Pset_EnvironmentalImpact.TotalPrimaryEnergyConsumption` |

## See Also

- **[Envelope](/en/documentation/entities/envelope)** - Envelopes using material types in their layers
- **[Structural System](/en/documentation/entities/structural-system)** - Structural systems referencing materials
- **[Requirement](/en/documentation/entities/requirement)** - Requirements for material parameters
- **Schema:** `sbm-schema-v2.0.json` - Material Type definition
