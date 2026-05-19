# Material (Material Application Documentation)

## What This Is

A **Material** file documents a specific material application in a project. Examples: "200 m² mineral wool on external walls", "450 m² porcelain tile in lobbies". Each file tracks quantity, supplier, delivery date, and procurement status.

::: tip For Architects
**Problem:** The site manager asks "How much mineral wool do we need to order?" or "What's the delivery status for tiles on Floor 2?"

**Old way:** Search through bill of quantities, check material schedules in Excel, call the supplier, hunt through email quotes.

**With Materials:** Open `materials/mat-mw-ext-01.md` — quantity (200 m²), supplier (Knauf), procurement status (ordered), delivery date (2026-07-15) in one file. **Order tracking without the search.**

**One material file = quantity + supplier + procurement status + link to envelopes.**
:::

A **Material** represents a specific building material application in a project. Materials enable order aggregation, delivery tracking, cost control, and sustainability reporting. Each material references a Material Type (the template) and specifies which entities it is applied to.

## Purpose

Materials define:
- Specific material applications (wall insulation, floor finishes, coatings)
- Quantities and units (m², m³, kg, pcs)
- Procurement data (supplier, delivery date, status)
- Entity links (envelopes, spaces, systems)
- Material costs and delivery logistics
- Classification (Uniclass, OmniClass, CPV codes)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier with `MAT-` prefix | `"MAT-MW-EXT-01"` |
| `entityType` | string | Must be `"material"` | `"material"` |
| `materialName` | string | Human-readable name | `"Knauf Insulation TP 115 Mineral Wool 035 180mm"` |
| `materialTypeId` | string | Reference to Material Type | `"MT-MW-035-KNAUF"` |
| `version` | string | Semantic version | `"2.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Material identifier with `MAT-` prefix. Use descriptive suffixes: `MAT-MW-EXT-01` (mineral wool on external wall), `MAT-TILE-LOBBY-01` (tile in lobby)
- **materialName**: Specific product with manufacturer name and model
- **materialTypeId**: Reference to the Material Type template (`MT-MW-035-KNAUF`) — defines shared physical properties for all applications of this material
- **version**: Track changes

**You only NEED these 5 fields.** Add quantities, supplier, and order tracking as the project progresses.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `buildingId` | string | Building where material is applied |
| `application` | string | Application description ("External wall thermal insulation") |
| `appliedToEntityIds` | string[] | IDs of entities where material is applied |
| `quantity` | object | Quantity: `value` (number) + `unit` (unit) |
| `supplier` | object | Supplier data: name, contact, quote reference |
| `leadTime` | string | Order lead time (e.g., "4 weeks") |
| `deliveryDate` | string | Planned delivery date (ISO 8601) |
| `procurementStatus` | enum | Order status (see enum below) |
| `constructionPackageId` | string | Reference to construction package |
| `cost` | object | Material cost (unit cost, total, currency) |
| `classification` | object | Classification (Uniclass, OmniClass, CPV) |
| `ifcMapping` | object | IFC mapping (IfcMaterial, IfcMaterialLayerSetUsage) |
| `tags` | string[] | Tags for filtering |

::: tip For Architects: Which Optional Fields Matter Most?

**For procurement tracking (most important):**
- **quantity** — How much material is needed (e.g., `{ value: 200, unit: "m2" }`)
- **supplier** — Who supplies it (company name, contact)
- **procurementStatus** — Current status: `not_specified`, `specified`, `quoted`, `ordered`, `delivered`, `installed`
- **deliveryDate** — When material must be on site

**For project coordination:**
- **appliedToEntityIds** — Which envelopes/spaces it's applied to (e.g., `["ENV-EW-01", "ENV-EW-02"]`)
- **constructionPackageId** — Which construction package (e.g., `"CP-INSULATION"`)
- **application** — Plain-language description of the application

**For cost estimation:**
- **cost** — Unit price and total cost
- **quantity** — Quantity for pricing

**Most architects fill in:** quantity, supplier, procurementStatus, and appliedToEntityIds. The rest is filled in during construction.
:::

## Procurement Status Enum

| Value | Description |
|-------|-------------|
| `not_specified` | Material not yet specified |
| `specified` | Material specified in drawings |
| `quoted` | Quote received from supplier |
| `ordered` | Purchase order placed |
| `delivered` | Material delivered to site |
| `installed` | Material installed/applied |

## Example 1: First Material File (Minimal)

**The simplest material file to track an order:**

::: code-group

```markdown [Markdown]
---
id: "MAT-MW-EXT-01"
entityType: "material"
materialName: "Knauf Insulation TP 115 Mineral Wool 035 180mm"
materialTypeId: "MT-MW-035-KNAUF"
buildingId: "BLD-01"
application: "External wall thermal insulation"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
procurementStatus: "ordered"
version: "2.0.0"
---

# Knauf Mineral Wool 035 — External Walls

External wall thermal insulation for Building 01.
200 m², purchase order placed.
```

```yaml [YAML]
id: "MAT-MW-EXT-01"
entityType: "material"
materialName: "Knauf Insulation TP 115 Mineral Wool 035 180mm"
materialTypeId: "MT-MW-035-KNAUF"
buildingId: "BLD-01"
application: "External wall thermal insulation"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
procurementStatus: "ordered"
version: "2.0.0"
```

```json [JSON]
{
  "id": "MAT-MW-EXT-01",
  "entityType": "material",
  "materialName": "Knauf Insulation TP 115 Mineral Wool 035 180mm",
  "materialTypeId": "MT-MW-035-KNAUF",
  "buildingId": "BLD-01",
  "application": "External wall thermal insulation",
  "appliedToEntityIds": ["ENV-EW-01", "ENV-EW-02"],
  "quantity": {
    "value": 200,
    "unit": "m2"
  },
  "procurementStatus": "ordered",
  "version": "2.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "materialName", "materialTypeId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^MAT-" },
    "entityType": { "const": "material" },
    "materialName": { "type": "string" },
    "materialTypeId": { "type": "string", "pattern": "^MT-" },
    "version": { "type": "string" }
  }
}
```

:::

**That's it.** Add supplier data and costs as procurement progresses.

---

## Example 2: Full Material File (All Details)

**Complete material documentation with order tracking and classification:**

::: code-group

```markdown [Markdown]
---
id: "MAT-MW-EXT-01"
entityType: "material"
materialName: "Knauf Insulation TP 115 Mineral Wool 035 180mm"
materialTypeId: "MT-MW-035-KNAUF"
buildingId: "BLD-01"

application: "External wall thermal insulation, types A and B"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"

quantity:
  value: 200
  unit: "m2"

supplier:
  name: "BuildTech Supply Co."
  contactPerson: "John Smith"
  phone: "+1 555 123 4567"
  email: "j.smith@buildtech.com"
  quoteReference: "QT/2026/04/1234"

leadTime: "3 weeks"
deliveryDate: "2026-07-15"
procurementStatus: "ordered"

constructionPackageId: "CP-INSULATION"

cost:
  unitCost: 8.50
  totalCost: 1700.00
  currency: "USD"
  basis: "Quote QT/2026/04/1234"

classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"

ifcMapping:
  ifcEntity: "IfcMaterialLayerSetUsage"
  materialName: "KnaufMW035_180mm"
  layerSetName: "ExternalWallInsulation"

version: "2.0.0"
tags:
  - "insulation"
  - "mineral-wool"
  - "external-wall"
  - "knauf"
---

# Knauf Mineral Wool 035 — External Walls

Thermal insulation for external wall types A and B, Building 01.

## Specification

- **Manufacturer:** Knauf Insulation
- **Product:** TP 115 Mineral Wool 035
- **Thickness:** 180 mm
- **Thermal conductivity:** λ = 0.035 W/(m·K)
- **Reaction to fire:** A1 (non-combustible)
- **Density:** 15 kg/m³

## Application

- External wall type A (ENV-EW-01): 120 m²
- External wall type B (ENV-EW-02): 80 m²
- **Total:** 200 m²

## Procurement

- **Supplier:** BuildTech Supply (Quote QT/2026/04/1234)
- **Status:** Ordered
- **Delivery:** 2026-07-15
- **Cost:** $1,700 ($8.50/m²)
```

```yaml [YAML]
id: "MAT-MW-EXT-01"
entityType: "material"
materialName: "Knauf Insulation TP 115 Mineral Wool 035 180mm"
materialTypeId: "MT-MW-035-KNAUF"
buildingId: "BLD-01"
application: "External wall thermal insulation, types A and B"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
supplier:
  name: "BuildTech Supply Co."
  contactPerson: "John Smith"
  phone: "+1 555 123 4567"
  email: "j.smith@buildtech.com"
  quoteReference: "QT/2026/04/1234"
leadTime: "3 weeks"
deliveryDate: "2026-07-15"
procurementStatus: "ordered"
constructionPackageId: "CP-INSULATION"
cost:
  unitCost: 8.50
  totalCost: 1700.00
  currency: "USD"
  basis: "Quote QT/2026/04/1234"
classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"
ifcMapping:
  ifcEntity: "IfcMaterialLayerSetUsage"
  materialName: "KnaufMW035_180mm"
  layerSetName: "ExternalWallInsulation"
version: "2.0.0"
tags:
  - "insulation"
  - "mineral-wool"
  - "external-wall"
  - "knauf"
```

```json [JSON]
{
  "id": "MAT-MW-EXT-01",
  "entityType": "material",
  "materialName": "Knauf Insulation TP 115 Mineral Wool 035 180mm",
  "materialTypeId": "MT-MW-035-KNAUF",
  "buildingId": "BLD-01",
  "application": "External wall thermal insulation, types A and B",
  "appliedToEntityIds": ["ENV-EW-01", "ENV-EW-02"],
  "quantity": { "value": 200, "unit": "m2" },
  "supplier": {
    "name": "BuildTech Supply Co.",
    "contactPerson": "John Smith",
    "quoteReference": "QT/2026/04/1234"
  },
  "leadTime": "3 weeks",
  "deliveryDate": "2026-07-15",
  "procurementStatus": "ordered",
  "constructionPackageId": "CP-INSULATION",
  "cost": {
    "unitCost": 8.50,
    "totalCost": 1700.00,
    "currency": "USD"
  },
  "classification": {
    "uniclass": "Pr_25_71_52_49",
    "omniclass": "23-13 21 17"
  },
  "version": "2.0.0",
  "tags": ["insulation", "mineral-wool", "external-wall", "knauf"]
}
```

:::

---

## Compiler Behavior

The SBM compiler handles Material entities as follows:

| Feature | Behavior |
|---------|----------|
| **Parsing** | Recognizes entity type `material` with `MAT-` ID prefix |
| **Grouping** | Collects into `entities.materials` array |
| **Back-references** | Building automatically receives a computed `materialIds` array |
| **Referential integrity** | Warns when `materialTypeId`, `buildingId`, `appliedToEntityIds`, or `constructionPackageId` reference missing entities |
| **Cost aggregation** | Material costs included in building-level and construction package aggregations |
| **Order aggregation** | Materials sharing the same `materialTypeId` can be aggregated in a procurement report |

---

## Relationships

```
Building (BLD-01)
  ├─ Material (MAT-MW-EXT-01)
  │    ├─ type: Material Type (MT-MW-035-KNAUF)
  │    ├─ applied to: Envelope (ENV-EW-01)
  │    ├─ applied to: Envelope (ENV-EW-02)
  │    └─ package: Construction Package (CP-INSULATION)
  ├─ Material (MAT-TILE-LOBBY-01)
  │    ├─ type: Material Type (MT-PORCELAIN-TILE)
  │    └─ applied to: Space (SP-BLD-01-L00-LOBBY)
  └─ Envelope (ENV-EW-01)
       └─ insulation layer → Material (MAT-MW-EXT-01)
```

**Forward references (you write):**
- `materialTypeId` → material type template
- `buildingId` → which building it belongs to
- `appliedToEntityIds` → which envelopes/spaces it's applied to
- `constructionPackageId` → which construction package

**Back-references (compiler computes):**
- Building receives `materialIds` listing all its materials
- Construction Package receives `materialIds` listing package materials

---

## Type/Instance Pattern

Materials reference **Material Types** to inherit shared physical properties:

**Material Type (Template):**
```yaml
# MT-MW-035-KNAUF
id: "MT-MW-035-KNAUF"
entityType: "material_type"
materialName: "Knauf Insulation TP 115 Mineral Wool 035"
materialCategory: "insulation"
physicalProperties:
  thermalConductivity: 0.035
  density: 15
fireProperties:
  reactionToFire: "A1"
```

**Material Instance (References the Type):**
```yaml
id: "MAT-MW-EXT-01"
entityType: "material"
materialName: "Knauf Mineral Wool 035 180mm"
materialTypeId: "MT-MW-035-KNAUF"   # Inherits λ, fire class, density
quantity:
  value: 200
  unit: "m2"
```

**Benefits:** Physical properties (λ, fire class, density) are defined once in the type. Each instance adds only project-specific data: quantity, supplier, application.

## BIM Mapping

Materials map to IFC material objects:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Material.SBM_ID` |
| `materialName` | `Material Name` | `IfcMaterial.Name` |
| `materialTypeId` | `Material Type` | `IfcMaterialDefinition.Category` |
| `quantity.value` | `SBM_Quantity` | `IfcQuantityArea.AreaValue` |
| `supplier` | `SBM_Supplier` | `Pset_SBM_Material.Supplier` |
| `procurementStatus` | `SBM_Procurement_Status` | `Pset_SBM_Material.ProcurementStatus` |
| `cost.totalCost` | `SBM_Material_Cost` | `Pset_SBM_Material.TotalCost` |

---

## Procurement Aggregation Report

Materials enable a project-wide procurement summary:

```json
{
  "procurementSummary": [
    {
      "materialTypeId": "MT-MW-035-KNAUF",
      "typeName": "Knauf Insulation TP 115 Mineral Wool 035",
      "totalQuantity": 450,
      "unit": "m2",
      "instances": [
        { "id": "MAT-MW-EXT-01", "quantity": 200, "status": "ordered" },
        { "id": "MAT-MW-EXT-02", "quantity": 150, "status": "quoted" },
        { "id": "MAT-MW-ROOF-01", "quantity": 100, "status": "specified" }
      ],
      "totalCost": 3825.00,
      "currency": "USD",
      "earliestDelivery": "2026-07-15",
      "latestDelivery": "2026-08-20"
    }
  ]
}
```

---

::: tip When to Add Material Files
- **Phase 3 (Schematic Design):** Identify key materials (insulation, structure) — types and approximate quantities
- **Phase 4 (Design Development):** Add accurate quantities, product specifications, classification
- **Phase 5 (Construction Documents):** Add supplier data, quotes, costs
- **Phase 6 (Construction):** Update procurement status (ordered → delivered → installed)
:::

---

## Common Mistakes

### Don't Confuse Material with Material Type

**Problem:** Creating a material file with physical properties (λ, density) instead of referencing a type.

**Solution:** Physical properties go in the **Material Type** (`MT-`), project-specific data goes in the **Material** (`MAT-`).

```yaml
# Wrong: Physical properties in the instance
id: "MAT-MW-EXT-01"
thermalConductivity: 0.035  # This belongs in Material Type!
density: 15                  # This belongs in Material Type!

# Correct: Reference the type + project-specific data
id: "MAT-MW-EXT-01"
materialTypeId: "MT-MW-035-KNAUF"  # Physical properties in type
quantity:
  value: 200
  unit: "m2"
supplier:
  name: "BuildTech Supply"
```

---

## See Also

- **[Material Type](/en/documentation/entities/material-type)** — Material specification templates
- **[Envelope](/en/documentation/entities/envelope)** — Envelopes containing material layers
- **[Construction Package](/en/documentation/entities/construction-package)** — Packages grouping materials
- **[Requirement](/en/documentation/entities/requirement)** — Requirements for material parameters (fire class, thermal)
