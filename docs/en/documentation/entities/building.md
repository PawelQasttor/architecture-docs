# Building (Project Information)

## What This Is

A **Building** file contains project-level information: building name, address, area, number of floors. You create **one building file per project**.

::: tip For Architects
**Problem:** Basic project information scattered across title blocks, cover sheets, Excel summaries.

**Old way:** Update building name in 6 different places when client changes project name.

**With building file:** Change once in `building.md` — all reports, room schedules, and documentation update automatically.

**One building file = all project metadata in one place.**
:::

A **Building** represents the top-level container for all building documents. It provides project-level metadata, location information, and regulatory context.

## Purpose

Buildings define:
- Project identification and metadata
- Geographic location and climate data
- Regulatory jurisdiction (country, region)
- Building classification and use type
- Project phase and completion status

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique building identifier | `"BLD-01"` |
| `entityType` | string | Must be `"building"` | `"building"` |
| `documentType` | string | Must be `"building"` | `"building"` |
| `buildingName` | string | Human-readable name | `"Green Terrace Apartments"` |
| `buildingType` | string | Building use type (see enum below) | `"residential_multifamily"` |
| `country` | string | ISO 3166-1 alpha-2 country code | `"PL"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Building identifier (e.g., `BLD-01`)
- **buildingName**: Project name ("Green Terrace Apartments")
- **buildingType**: Use type — `residential_multifamily`, `office`, `retail`, `healthcare`
- **country**: Country code — `PL` (Poland), `DE` (Germany), `GB` (UK), `US` (USA)
- **version**: Track changes

**You only NEED these 5 fields.** The country code automatically loads the right building codes (WT 2021 for Poland, Building Regulations for UK, etc.).
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `siteId` | string | Reference to parent site entity |
| `projectId` | string | Project identifier |
| `address` | object | Street address |
| `location` | object | Geographic coordinates |
| `climateZone` | string | Climate classification |
| `grossFloorArea` | number | Total GFA in m² |
| `numberOfLevels` | number | Total number of levels |
| `numberOfUnits` | number | Residential units (if applicable) |
| `occupancyType` | string | Occupancy classification |
| `constructionType` | string | Building construction type |
| `yearBuilt` | number | Year of construction/completion |
| `projectPhase` | string | Current project phase |
| `certifications` | array | Green building certifications |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For permit submission:**
- **address** — Street address, city, postal code
- **grossFloorArea** — Total GFA in m²
- **numberOfLevels** — How many floors
- **numberOfUnits** — Number of apartments/units (for residential)
- **occupancyType** — Occupancy classification (R-2, B, M, etc.)
- **constructionType** — Construction type (Type_VA, Type_IIA, etc.)

**For energy compliance:**
- **climateZone** — Climate classification (affects insulation requirements)
- **certifications** — BREEAM, LEED, WELL targets

**For location/context:**
- **location** — GPS coordinates (latitude, longitude)
- **yearBuilt** — Year of construction

**Most common:** Just fill address, gross floor area, number of levels. The rest can be added later as needed.
:::

## Building Types (Enum)

```typescript
type BuildingType =
  | "residential_single_family"
  | "residential_multifamily"
  | "residential_mixed_use"
  | "office"
  | "retail"
  | "industrial"
  | "warehouse"
  | "educational"
  | "healthcare"
  | "hospitality"
  | "assembly"
  | "government"
  | "mixed_use";
```

## Example 1: Your First Building File (Minimal)

**The simplest building file to get started:**

```markdown
File: building.md

---
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"
country: "PL"
version: "1.0.0"

# For permit submission
address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32
---

# Green Terrace Apartments

32-unit residential building in Warsaw.
4 levels, 4,850 m² GFA.
```

**That's it.** You can add energy certifications, climate zone, and GPS coordinates later.

---

## Example 2: Complete Building (Full Details)

**File:** `docs/en/examples/green-terrace/building.md`

```markdown
---
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

projectId: "PRJ-GREEN-TERRACE-2026"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"

country: "PL"
address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
  region: "Mazowieckie"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100
  elevationUnit: "m"

climateZone: "Dfb"  # Köppen classification
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

occupancyType: "R-2"  # IBC classification
constructionType: "Type_VA"
yearBuilt: 2026

certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
  - name: "LEED"
    level: "Silver"
    status: "planned"

ifcMapping:
  ifcEntity: "IfcBuilding"
  globalId: "3K4hJ1$rMCxv2WxEt1LNxQ"
  objectType: "Residential"

version: "1.0.0"
tags:
  - "residential"
  - "multifamily"
  - "sustainable"
  - "warsaw"
---

# Building: Green Terrace Apartments

Sustainable multifamily residential building in Warsaw city center.

## Project Overview

- **Location:** Warsaw, Mazowieckie, Poland
- **Type:** Residential multifamily (32 units)
- **Gross Floor Area:** 4,850 m²
- **Levels:** 4 above grade, 1 basement
- **Completion:** Q3 2026

## Sustainability

- **BREEAM:** Very Good (in progress)
- **LEED:** Silver (planned)
- **Energy:** Nearly Zero Energy Building (nZEB) per WT 2021
- **Renewables:** Rooftop solar PV (50 kWp)

## Regulatory Context

- **Country:** Poland
- **Jurisdiction:** City of Warsaw
- **Building code:** WT 2021 (Warunki Techniczne)
- **Planning:** MPZP approval received 2025-11-15
```

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "buildings": [
      {
        "documentType": "building",
        "entityType": "building",
        "id": "BLD-01",
        "projectId": "PRJ-GREEN-TERRACE-2026",
        "buildingName": "Green Terrace Apartments",
        "buildingType": "residential_multifamily",
        "country": "PL",
        "address": {
          "street": "ul. Słoneczna 42",
          "city": "Warsaw",
          "postalCode": "00-001",
          "region": "Mazowieckie"
        },
        "location": {
          "latitude": 52.2297,
          "longitude": 21.0122,
          "elevation": 100,
          "elevationUnit": "m"
        },
        "climateZone": "Dfb",
        "grossFloorArea": 4850,
        "numberOfLevels": 4,
        "numberOfUnits": 32,
        "occupancyType": "R-2",
        "constructionType": "Type_VA",
        "yearBuilt": 2026,
        "projectPhase": "design_development",
        "certifications": [
          {
            "name": "BREEAM",
            "level": "Very Good",
            "status": "in_progress"
          },
          {
            "name": "LEED",
            "level": "Silver",
            "status": "planned"
          }
        ],
        "ifcMapping": {
          "ifcEntity": "IfcBuilding",
          "globalId": "3K4hJ1$rMCxv2WxEt1LNxQ",
          "objectType": "Residential"
        },
        "version": "1.0.0",
        "tags": ["residential", "multifamily", "sustainable", "warsaw"]
      }
    ]
  }
}
```

## Jurisdiction Pack Loading

The `country` field triggers **jurisdiction pack loading**:

```javascript
// Building defines country
{
  "country": "PL"  // ISO 3166-1 alpha-2 code
}

// Compiler automatically loads:
// - scripts/requirements/global/ (always)
// - scripts/requirements/pl/ (because country = "PL")
```

**Supported country codes:**
- `PL` → Poland (WT 2021, Prawo budowlane)
- `DE` → Germany (DIN, EnEV) - future
- `GB` → United Kingdom (Building Regulations) - future
- `US` → United States (IBC, ASHRAE) - future
- `FR` → France (RT 2020) - future

## BIM Mapping

Buildings map to **IfcBuilding** entities:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Building.SBM_ID` |
| `buildingName` | `Building Name` | `Name` |
| `buildingType` | `SBM_Building_Type` | `Pset_SBM_Building.BuildingType` |
| `country` | `SBM_Country` | `Pset_SBM_Building.Country` |
| `grossFloorArea` | `Gross Building Area` | `Pset_BuildingCommon.GrossPlannedArea` |
| `numberOfLevels` | `Number of Storeys` | `Pset_BuildingCommon.NumberOfStoreys` |
| `yearBuilt` | `Year Constructed` | `Pset_BuildingCommon.YearOfConstruction` |

## Climate Zone Classification

Use Köppen climate classification:

| Zone | Description | Examples |
|------|-------------|----------|
| `Dfb` | Humid continental, warm summer | Warsaw, Moscow, Montreal |
| `Cfb` | Oceanic, warm summer | London, Paris, Brussels |
| `Csa` | Mediterranean, hot summer | Athens, Rome, Lisbon |
| `BSk` | Cold semi-arid | Denver, Madrid interior |
| `Dfc` | Subarctic | Helsinki, Stockholm |

Climate zone affects:
- Heating/cooling degree days
- Insulation requirements (WT 2021 § 328)
- Renewable energy potential
- Weatherproofing strategies

## Occupancy Type

Use IBC (International Building Code) occupancy classifications:

| Code | Description | Examples |
|------|-------------|----------|
| `R-2` | Multifamily residential | Apartments, dormitories |
| `R-1` | Residential transient | Hotels, motels |
| `B` | Business | Offices, banks |
| `M` | Mercantile | Retail stores, markets |
| `A-1` | Assembly, fixed seats | Theaters, concert halls |
| `E` | Educational | Schools, universities |
| `I-2` | Institutional, medical | Hospitals, nursing homes |

Occupancy type affects:
- Fire safety requirements
- Egress requirements
- Accessibility requirements
- MEP system design

## Construction Type

Use IBC construction type classification:

| Type | Description | Fire Resistance |
|------|-------------|-----------------|
| `Type_IA` | Fire-resistive, non-combustible | High |
| `Type_IB` | Fire-resistive, non-combustible | High |
| `Type_IIA` | Non-combustible | Moderate |
| `Type_IIB` | Non-combustible | Low |
| `Type_IIIA` | Ordinary, protected combustible | Moderate |
| `Type_IIIB` | Ordinary, unprotected combustible | Low |
| `Type_VA` | Wood frame, protected | Moderate |
| `Type_VB` | Wood frame, unprotected | Low |

## Certifications

Track green building certifications:

```yaml
certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
    assessor: "BRE Global"
    targetScore: 65

  - name: "LEED"
    version: "v4.1 BD+C"
    level: "Silver"
    status: "planned"
    targetPoints: 55

  - name: "WELL"
    version: "v2"
    level: "Gold"
    status: "design_review"
```

## Departments (v0.3.0)

**NEW in v0.3.0:** The project can define a `departments` array to organize spaces into functional departments. This is especially useful for hospitals, large office buildings, and institutional projects where spaces belong to organizational units.

### Department Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Department identifier (DEPT-xxx) | `"DEPT-OIOM"` |
| `name` | string | Yes | Department name | `"Intensive Care Unit"` |
| `description` | string | No | Detailed description | `"12-bed ICU with isolation bays"` |
| `levelIds` | array | No | Levels where department is located | `["LVL-02", "LVL-03"]` |
| `headOfDepartment` | string | No | Department head name/role | `"Dr. Anna Kowalska"` |
| `operatingHours` | string | No | Operating schedule | `"24/7"` |
| `staffCount` | integer | No | Number of staff | `45` |

### Example: Hospital Departments

```yaml
---
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Regional Hospital - Building D"
buildingType: "healthcare"
country: "PL"
version: "1.0.0"

departments:
  - id: "DEPT-OIOM"
    name: "Intensive Care Unit (OIOM)"
    description: "12-bed ICU with 2 isolation bays"
    levelIds: ["LVL-02"]
    headOfDepartment: "Dr. Anna Kowalska"
    operatingHours: "24/7"
    staffCount: 45

  - id: "DEPT-SURGERY"
    name: "Surgery Department"
    description: "6 operating rooms + recovery"
    levelIds: ["LVL-03"]
    headOfDepartment: "Dr. Piotr Nowak"
    operatingHours: "Mon-Fri 07:00-19:00, emergency 24/7"
    staffCount: 60

  - id: "DEPT-RADIOLOGY"
    name: "Radiology Department"
    description: "X-ray, CT, MRI, fluoroscopy"
    levelIds: ["LVL-01"]
    operatingHours: "Mon-Fri 07:00-20:00, on-call 24/7"
    staffCount: 25

  - id: "DEPT-ADMIN"
    name: "Administration"
    description: "Hospital administration and records"
    levelIds: ["LVL-01"]
    operatingHours: "Mon-Fri 08:00-16:00"
    staffCount: 15
---

# Regional Hospital - Building D

Main clinical building with ICU, surgery, radiology, and admin departments.
```

### Referencing Departments from Spaces

Spaces reference their department using the `departmentId` field:

```yaml
# An ICU patient room
---
id: "SP-BLD-01-L02-001"
spaceName: "ICU Bay 01"
spaceType: "icu"
departmentId: "DEPT-OIOM"    # References the department defined on building
levelId: "LVL-02"
buildingId: "BLD-01"
---
```

The compiler can then generate reports grouped by department, such as total area per department, staff-to-space ratios, and equipment inventories by department.

---

## Compilation Report Integration

Building metadata populates compliance report header:

```json
{
  "projectMetadata": {
    "projectId": "PRJ-GREEN-TERRACE-2026",
    "buildingName": "Green Terrace Apartments",
    "country": "PL",
    "jurisdiction": "WT_2021",
    "projectPhase": "design_development",
    "bimLOD": "LOD_300",
    "complianceDate": "2026-02-20"
  }
}
```

## Site Relationship

Buildings can reference a parent site using `siteId`:

```yaml
---
id: "BLD-01"
entityType: "building"
siteId: "SITE-GREEN-TERRACE"  # Links to parent site
buildingName: "Green Terrace Apartments"
---
```

The compiler auto-computes the reverse: the site's `buildingIds` array lists all buildings that reference it. Cost rollup flows: spaces → levels → buildings → sites → project.

## See Also

- **[Site](/en/documentation/entities/site)** - Buildings belong to sites
- **[Level](/en/documentation/entities/level)** - Buildings contain levels
- **[Space](/en/documentation/entities/space)** - Spaces belong to buildings
- **[Compiler Guide](/en/documentation/compiler/)** - Building-level compilation
- **[Jurisdiction Packs](/en/documentation/compiler/)** - Country-specific requirements
