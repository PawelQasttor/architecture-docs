# Site Feature (Landscape / Parking / Green Infrastructure)

## What This Is

A **Site Feature** file describes a landscape element, parking area, green infrastructure, drainage feature, or other site-level element. Site features are linked to their parent site and can reference a site feature type for inherited specifications.

::: tip For Architects
**Problem:** Landscape plans, parking layouts, and drainage calculations are in separate drawings. The sustainability assessor asks "What's your total permeable area?" and you're measuring from multiple drawings.

**Old way:** Landscape plan (PDF), parking layout (DWG), drainage calculation (Excel), planting schedule (Word).

**With site features:** One file per feature. Area, materials, sustainability metrics, maintenance schedule — all structured and machine-readable. The compiler rolls up permeability and biodiversity metrics across the entire site.

**One site feature file = complete feature specification with sustainability data.**
:::

## Purpose

Site features define:
- Classification (vegetation, hardscape, parking, drainage, etc.)
- Dimensions and location within the site
- Materials and planting specifications
- Sustainability metrics (permeability, carbon sequestration, biodiversity)
- Maintenance schedules
- Construction package assignment
- IFC mapping (IfcGeographicElement, IfcCivilElement)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique site feature ID (`SF-` prefix) | `"SF-GARDEN-01"` |
| `entityType` | string | Must be `"site_feature"` | `"site_feature"` |
| `featureName` | string | Human-readable name | `"North Garden"` |
| `featureCategory` | string | Classification (see categories) | `"vegetation"` |
| `siteId` | string | Parent site reference | `"SITE-GREEN-TERRACE"` |
| `version` | string | Semantic version | `"1.0.0"` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `siteFeatureTypeId` | string | Reference to site_feature_type |
| `location` | object | Position description, coordinates, zone |
| `dimensions` | object | Length, width, height, area |
| `materials` | array | Materials with quantities and suppliers |
| `condition` | string | Current condition (new, good, fair, poor, replacement_needed) |
| `installationData` | object | Installation date, installer, supplier |
| `maintenanceSchedule` | object | Frequency, last/next maintenance, contractor |
| `sustainabilityMetrics` | object | Carbon sequestration, permeability, biodiversity, rainfall retention |
| `constructionPackageId` | string | Construction work package reference |
| `cost` | object | Feature cost |
| `ifcMapping` | object | IFC entity and GlobalId |

## Feature Categories

| Category | Description |
|----------|-------------|
| `vegetation` | Gardens, planting, trees, lawns |
| `hardscape` | Paving, paths, patios, retaining walls |
| `water_feature` | Ponds, fountains, rain gardens |
| `parking` | Vehicle parking areas |
| `playground` | Play areas and equipment |
| `fencing` | Boundary fencing and gates |
| `retaining_wall` | Retaining structures |
| `drainage` | Surface drainage, channels, soakaways |
| `lighting` | External lighting |
| `site_furniture` | Benches, bins, cycle racks |
| `signage` | Wayfinding, safety signs |
| `suds` | Sustainable drainage systems |
| `green_infrastructure` | Green roofs, living walls, bioswales |
| `utility_structure` | Substations, bin stores, cycle shelters |

## Type / Instance Pattern

Define common specifications in a **Site Feature Type** (`site_feature_type`) and reference it from instances via `siteFeatureTypeId`.

```yaml
# Site Feature Type (template)
entityType: site_feature_type
id: SFT-PERMEABLE-PAVING
featureTypeName: "Permeable Block Paving"
featureCategory: hardscape
expectedLifeYears: 30

# Site Feature Instance
entityType: site_feature
id: SF-PARKING-01
featureName: "Resident Parking Area"
featureCategory: parking
siteId: "SITE-GREEN-TERRACE"
siteFeatureTypeId: "SFT-PERMEABLE-PAVING"
```

## Example

See the Green Terrace example: [North Garden](/en/examples/green-terrace/site-features/sf-north-garden), [Parking Area](/en/examples/green-terrace/site-features/sf-parking)
