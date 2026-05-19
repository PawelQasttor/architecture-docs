# Campus (Multi-Building Complex)

## What This Is

A **Campus file** describes a multi-building complex: a hospital campus, university campus, residential estate, or business park. It groups multiple sites with shared infrastructure. You create **one campus file per complex**.

::: tip For Architects
**Problem:** You are designing a hospital complex with 5 buildings across 3 sites. Shared district heating, internal roads, multi-storey car park -- but each building has a different design team. Data about shared infrastructure is scattered across 5 separate documents.

**Old way:** Each design team maintains their own spreadsheets. Nobody knows the total GFA for the whole complex. Shared infrastructure costs are split "by eye" in Excel.

**With campus file:** A single `campus.md` groups all sites. The compiler automatically collects buildings, sums areas, and aggregates costs. Shared infrastructure is documented once -- visible to all teams.

**One campus file = one source of truth for the entire multi-building complex.**
:::

A **Campus** represents a top-level container above Sites. It enables modelling of multi-building projects where multiple sites share infrastructure, management, and investment identity.

## Purpose

Campuses define:
- Grouping of multiple sites into a single development
- Shared infrastructure (roads, utilities, networks, parking)
- Aggregate area and GFA for the entire complex
- Master plan with phased delivery schedule
- Allocation of shared costs across buildings/sites
- Organisational structure and management responsibility

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique campus identifier with `CAM-` prefix | `"CAM-REGIONAL-HOSPITAL"` |
| `entityType` | string | Must be `"campus"` | `"campus"` |
| `campusName` | string | Human-readable name | `"Regional Hospital Campus"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Campus identifier with `CAM-` prefix (e.g. `CAM-REGIONAL-HOSPITAL`)
- **campusName**: Name of the complex ("Regional Hospital Campus")
- **version**: Track changes

**You only NEED these 3 fields.** Add sites, infrastructure, and master plan as the project evolves.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `campusType` | string | Campus type: `hospital_complex`, `university`, `mixed_use_estate`, `industrial_park`, `business_park`, `military`, `residential_estate`, `other` |
| `siteIds` | array | Auto-computed: sites belonging to this campus |
| `totalArea` | number | Total campus land area in m² |
| `totalGFA` | number | Total gross floor area across all buildings in m² |
| `sharedInfrastructure` | array | Shared infrastructure (roads, networks, parking) |
| `masterPlan` | object | Master plan: phases, schedule, target development |
| `location` | object | GPS coordinates (latitude, longitude) |
| `address` | object | Address (street, city, postalCode, region, country) |
| `classification` | object | Functional and administrative classification |
| `responsibility` | object | Management: investor, administrator, operator |
| `cost` | object | Aggregate campus costs (buildings + shared infrastructure) |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For master planning:**
- **campusType** -- Type of campus (hospital complex, university, estate)
- **totalArea** -- Total land area
- **totalGFA** -- Total GFA (compiler can auto-calculate from sites)
- **masterPlan** -- Delivery phases and schedule

**For infrastructure coordination:**
- **sharedInfrastructure** -- Roads, district heating, parking, lighting
- **responsibility** -- Who manages, who is responsible for maintenance

**For administrative documentation:**
- **address** -- Main address of the complex
- **classification** -- Zoning/planning designation

**Most common:** Start with campusType, totalArea, and sharedInfrastructure. Add the rest as the master plan develops.
:::

## Shared Infrastructure

Document resources shared across campus sites:

```yaml
sharedInfrastructure:
  - type: "road_network"
    name: "Campus internal roads"
    description: "2.4 km of internal roads with LED lighting"
    servingSiteIds: ["SITE-HOSPITAL-MAIN", "SITE-HOSPITAL-DIAG", "SITE-PARKING"]
    cost:
      estimatedTotal: 750000
      currency: "USD"

  - type: "district_heating"
    name: "Campus district heating network"
    description: "Central gas boiler plant 2.4 MW"
    servingSiteIds: ["SITE-HOSPITAL-MAIN", "SITE-HOSPITAL-DIAG"]

  - type: "parking"
    name: "Multi-storey car park P1"
    description: "320 spaces, 4 levels"
    capacity: 320
    servingSiteIds: ["SITE-HOSPITAL-MAIN", "SITE-HOSPITAL-DIAG"]

  - type: "green_area"
    name: "Therapeutic garden"
    description: "Healing garden with walking paths"
    area: 4500
```

**Infrastructure types:** `road_network` (roads), `district_heating` (heating), `electrical_grid` (electrical network), `water_network` (water supply), `sewage_network` (sewage), `stormwater` (stormwater drainage), `parking` (parking), `green_area` (green spaces), `security` (security), `telecom` (telecommunications), `waste_management` (waste management), `other` (other)

## Example 1: First Campus File (Minimal)

**Simplest campus file to get started:**

::: code-group

```md [Markdown]
File: campus.md

---
id: "CAM-REGIONAL-HOSPITAL"
entityType: "campus"
campusName: "Regional Hospital Campus"
campusType: "hospital_complex"
totalArea: 42000
address:
  street: "15 Medical Drive"
  city: "Cambridge"
  postalCode: "CB2 0QQ"
  country: "GB"
version: "1.0.0"
---

# Regional Hospital Campus

Hospital complex on a 4.2 ha site with the main building, diagnostic centre, and parking.
```

```yaml [YAML]
id: "CAM-REGIONAL-HOSPITAL"
entityType: "campus"
campusName: "Regional Hospital Campus"
campusType: "hospital_complex"
totalArea: 42000
address:
  street: "15 Medical Drive"
  city: "Cambridge"
  postalCode: "CB2 0QQ"
  country: "GB"
version: "1.0.0"
```

```json [JSON]
{
  "id": "CAM-REGIONAL-HOSPITAL",
  "entityType": "campus",
  "campusName": "Regional Hospital Campus",
  "campusType": "hospital_complex",
  "totalArea": 42000,
  "address": {
    "street": "15 Medical Drive",
    "city": "Cambridge",
    "postalCode": "CB2 0QQ",
    "country": "GB"
  },
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "campusName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CAM-" },
    "entityType": { "const": "campus" },
    "campusName": { "type": "string" },
    "campusType": { "type": "string" },
    "totalArea": { "type": "number" },
    "version": { "type": "string" }
  }
}
```

:::

**That's it.** Shared infrastructure, master plan, and costs can be added later.

---

## Example 2: Full Campus (All Details)

**University campus with multiple sites, shared infrastructure, and master plan:**

::: code-group

```md [Markdown]
---
id: "CAM-NORTHFIELD-UNIVERSITY"
entityType: "campus"
campusName: "Northfield University Campus — West Precinct"
campusType: "university"

address:
  street: "100 University Avenue"
  city: "Edinburgh"
  postalCode: "EH8 9AG"
  region: "Scotland"
  country: "GB"

location:
  latitude: 55.9445
  longitude: -3.1892

totalArea: 85000
totalGFA: 62000

sharedInfrastructure:
  - type: "road_network"
    name: "Campus internal roads"
    description: "1.8 km of roads and footpaths with lighting"
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]
    cost:
      estimatedTotal: 650000
      currency: "GBP"

  - type: "district_heating"
    name: "Campus heating plant"
    description: "Central connection to city district heating, 4.8 MW"
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]

  - type: "parking"
    name: "Underground car park P1"
    description: "180 spaces beneath Main Library"
    capacity: 180
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]

  - type: "green_area"
    name: "Campus quadrangle"
    description: "Central courtyard with pathways and green spaces"
    area: 6200

  - type: "security"
    name: "Access control system"
    description: "CCTV monitoring, vehicle barriers, 24/7 security"

masterPlan:
  totalPhases: 3
  currentPhase: 2
  phases:
    - phase: 1
      name: "School of Architecture renovation"
      status: "completed"
      completionDate: "2025-06-30"
      siteIds: ["SITE-ARCHITECTURE"]

    - phase: 2
      name: "New Engineering building"
      status: "in_progress"
      targetDate: "2027-12-31"
      siteIds: ["SITE-ENGINEERING"]

    - phase: 3
      name: "Main Library extension"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-LIBRARY"]

classification:
  primaryUse: "educational"
  secondaryUse: "research"
  administrativeCategory: "public_university"

responsibility:
  investor: "Northfield University"
  administrator: "University Estates Department"
  operator: "West Precinct Campus Management"

cost:
  estimatedTotal: 42000000
  currency: "GBP"
  breakdown:
    - category: "buildings"
      amount: 32000000
    - category: "shared_infrastructure"
      amount: 6500000
    - category: "landscaping"
      amount: 3500000

ifcMapping:
  ifcEntity: "IfcProject"
  objectType: "CampusDevelopment"
  description: "Aggregation of IfcSite entities at campus level"

version: "2.0.0"
tags:
  - "university"
  - "campus"
  - "edinburgh"
  - "education"
  - "multi-building"
---

# Northfield University Campus — West Precinct

University campus with a total area of 8.5 ha comprising three faculties
and a main library. Modernisation in 3 phases through 2029.

## Overview

- **Location:** University Avenue, Edinburgh
- **Type:** University campus
- **Total land area:** 85,000 m²
- **Total GFA:** 62,000 m²
- **Sites:** 3 (Architecture, Engineering, Library)
- **Delivery phases:** 3 (phase 1 complete, phase 2 in progress)

## Shared Infrastructure

- Internal roads 1.8 km with lighting
- District heating plant 4.8 MW
- Underground car park 180 spaces
- CCTV monitoring and access control 24/7
```

```yaml [YAML]
id: "CAM-NORTHFIELD-UNIVERSITY"
entityType: "campus"
campusName: "Northfield University Campus — West Precinct"
campusType: "university"

address:
  street: "100 University Avenue"
  city: "Edinburgh"
  postalCode: "EH8 9AG"
  region: "Scotland"
  country: "GB"

location:
  latitude: 55.9445
  longitude: -3.1892

totalArea: 85000
totalGFA: 62000

sharedInfrastructure:
  - type: "road_network"
    name: "Campus internal roads"
    description: "1.8 km of roads and footpaths with lighting"
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]
    cost:
      estimatedTotal: 650000
      currency: "GBP"

  - type: "district_heating"
    name: "Campus heating plant"
    description: "Central connection to city district heating, 4.8 MW"
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]

  - type: "parking"
    name: "Underground car park P1"
    description: "180 spaces beneath Main Library"
    capacity: 180
    servingSiteIds: ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]

  - type: "green_area"
    name: "Campus quadrangle"
    description: "Central courtyard with pathways and green spaces"
    area: 6200

  - type: "security"
    name: "Access control system"
    description: "CCTV monitoring, vehicle barriers, 24/7 security"

masterPlan:
  totalPhases: 3
  currentPhase: 2
  phases:
    - phase: 1
      name: "School of Architecture renovation"
      status: "completed"
      completionDate: "2025-06-30"
      siteIds: ["SITE-ARCHITECTURE"]

    - phase: 2
      name: "New Engineering building"
      status: "in_progress"
      targetDate: "2027-12-31"
      siteIds: ["SITE-ENGINEERING"]

    - phase: 3
      name: "Main Library extension"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-LIBRARY"]

classification:
  primaryUse: "educational"
  secondaryUse: "research"
  administrativeCategory: "public_university"

responsibility:
  investor: "Northfield University"
  administrator: "University Estates Department"
  operator: "West Precinct Campus Management"

cost:
  estimatedTotal: 42000000
  currency: "GBP"
  breakdown:
    - category: "buildings"
      amount: 32000000
    - category: "shared_infrastructure"
      amount: 6500000
    - category: "landscaping"
      amount: 3500000

ifcMapping:
  ifcEntity: "IfcProject"
  objectType: "CampusDevelopment"
  description: "Aggregation of IfcSite entities at campus level"

version: "2.0.0"
tags:
  - "university"
  - "campus"
  - "edinburgh"
  - "education"
  - "multi-building"
```

```json [JSON]
{
  "id": "CAM-NORTHFIELD-UNIVERSITY",
  "entityType": "campus",
  "campusName": "Northfield University Campus — West Precinct",
  "campusType": "university",
  "address": {
    "street": "100 University Avenue",
    "city": "Edinburgh",
    "postalCode": "EH8 9AG",
    "region": "Scotland",
    "country": "GB"
  },
  "location": {
    "latitude": 55.9445,
    "longitude": -3.1892
  },
  "totalArea": 85000,
  "totalGFA": 62000,
  "sharedInfrastructure": [
    {
      "type": "road_network",
      "name": "Campus internal roads",
      "description": "1.8 km of roads and footpaths with lighting",
      "servingSiteIds": ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"],
      "cost": {
        "estimatedTotal": 650000,
        "currency": "GBP"
      }
    },
    {
      "type": "district_heating",
      "name": "Campus heating plant",
      "description": "Central connection to city district heating, 4.8 MW",
      "servingSiteIds": ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]
    },
    {
      "type": "parking",
      "name": "Underground car park P1",
      "description": "180 spaces beneath Main Library",
      "capacity": 180,
      "servingSiteIds": ["SITE-ARCHITECTURE", "SITE-ENGINEERING", "SITE-LIBRARY"]
    },
    {
      "type": "green_area",
      "name": "Campus quadrangle",
      "description": "Central courtyard with pathways and green spaces",
      "area": 6200
    },
    {
      "type": "security",
      "name": "Access control system",
      "description": "CCTV monitoring, vehicle barriers, 24/7 security"
    }
  ],
  "masterPlan": {
    "totalPhases": 3,
    "currentPhase": 2,
    "phases": [
      {
        "phase": 1,
        "name": "School of Architecture renovation",
        "status": "completed",
        "completionDate": "2025-06-30",
        "siteIds": ["SITE-ARCHITECTURE"]
      },
      {
        "phase": 2,
        "name": "New Engineering building",
        "status": "in_progress",
        "targetDate": "2027-12-31",
        "siteIds": ["SITE-ENGINEERING"]
      },
      {
        "phase": 3,
        "name": "Main Library extension",
        "status": "planned",
        "targetDate": "2029-06-30",
        "siteIds": ["SITE-LIBRARY"]
      }
    ]
  },
  "classification": {
    "primaryUse": "educational",
    "secondaryUse": "research",
    "administrativeCategory": "public_university"
  },
  "responsibility": {
    "investor": "Northfield University",
    "administrator": "University Estates Department",
    "operator": "West Precinct Campus Management"
  },
  "cost": {
    "estimatedTotal": 42000000,
    "currency": "GBP",
    "breakdown": [
      { "category": "buildings", "amount": 32000000 },
      { "category": "shared_infrastructure", "amount": 6500000 },
      { "category": "landscaping", "amount": 3500000 }
    ]
  },
  "ifcMapping": {
    "ifcEntity": "IfcProject",
    "objectType": "CampusDevelopment",
    "description": "Aggregation of IfcSite entities at campus level"
  },
  "version": "2.0.0",
  "tags": ["university", "campus", "edinburgh", "education", "multi-building"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "campusName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CAM-" },
    "entityType": { "const": "campus" },
    "campusName": { "type": "string" },
    "campusType": { "type": "string" },
    "totalArea": { "type": "number" },
    "totalGFA": { "type": "number" },
    "sharedInfrastructure": { "type": "array" },
    "masterPlan": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

## Compiler Behaviour

The SBM compiler handles campus entities as follows:

| Feature | Behaviour |
|---------|-----------|
| **Parsing** | Recognises entity type `campus` with ID prefix `CAM-` |
| **Grouping** | Collects into the `entities.campuses` array |
| **Back-references** | Campus receives an auto-computed `siteIds` array from all sites with a matching `campusId` |
| **Area aggregation** | `totalGFA` auto-calculated from the sum of site GFAs (if not explicitly provided) |
| **Cost aggregation** | Campus costs = sum of site costs + shared infrastructure costs |
| **Referential integrity** | Warns when `sharedInfrastructure[].servingSiteIds` references missing sites |

## How Campus Connects to Other Entities

```
Campus (CAM-REGIONAL-HOSPITAL)
  +-- Site (SITE-HOSPITAL-MAIN)        <-- via site.campusId
  |    +-- Building (BLD-HOSPITAL-MAIN)
  |    |    +-- Level (LVL-00) ... (LVL-04)
  |    |    +-- Spaces (wards, offices, ...)
  |    +-- Site Feature (SF-GARDEN-01)
  +-- Site (SITE-HOSPITAL-DIAG)
  |    +-- Building (BLD-DIAGNOSTIC-CTR)
  +-- Site (SITE-PARKING)
       +-- Building (BLD-CARPARK-P1)
```

**Forward references (you write):**
- Sites reference the campus via the `campusId` field

**Back-references (compiler computes):**
- Campus receives `siteIds` listing all associated sites

Example reference from a site file:

```yaml
# In site.md
---
id: "SITE-HOSPITAL-MAIN"
entityType: "site"
campusId: "CAM-REGIONAL-HOSPITAL"  # <-- links to campus
siteName: "Main Hospital Site"
---
```

## Master Plan

The master plan documents phased delivery of the campus:

```yaml
masterPlan:
  totalPhases: 3
  currentPhase: 1
  phases:
    - phase: 1
      name: "Main hospital building"
      status: "in_progress"
      targetDate: "2027-06-30"
      siteIds: ["SITE-HOSPITAL-MAIN"]
      budget: 22000000

    - phase: 2
      name: "Diagnostic centre"
      status: "planned"
      targetDate: "2028-12-31"
      siteIds: ["SITE-HOSPITAL-DIAG"]

    - phase: 3
      name: "Car park and landscaping"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-PARKING"]
```

**Phase statuses:** `planned`, `in_progress`, `completed`, `on_hold`

## BIM Mapping

Campuses do not have a direct IFC counterpart. They are mapped through aggregation of IfcProject or IfcSite objects:

| SBM Field | IFC Property |
|-----------|-------------|
| `id` | `Pset_SBM_Campus.SBM_ID` |
| `campusName` | `IfcProject.Name` or `Pset_SBM_Campus.CampusName` |
| `campusType` | `Pset_SBM_Campus.CampusType` |
| `totalArea` | `Pset_SBM_Campus.TotalArea` |
| `totalGFA` | `Pset_SBM_Campus.TotalGFA` |
| `siteIds` | Aggregation of `IfcSite` within `IfcProject` |

::: tip For Architects: BIM Mapping in Practice
In Revit/ArchiCAD a campus is modelled as a project (IfcProject) containing multiple IfcSite objects. The `Pset_SBM_Campus.SBM_ID` field maintains the link between the BIM model and SBM documentation.
:::

## See Also

- **[Site](/en/documentation/entities/site)** -- Sites belong to campuses
- **[Building](/en/documentation/entities/building)** -- Buildings belong to sites within a campus
- **[Construction Package](/en/documentation/entities/construction-package)** -- Phased delivery at the package level
