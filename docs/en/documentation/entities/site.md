# Site (Plot / Parcel)

## What This Is

A **Site** file describes the land parcel where your building sits: plot area, setbacks, utility connections, soil conditions, zoning constraints. You create **one site file per project** (or per parcel if multiple plots).

::: tip For Architects
**Problem:** Site data is scattered across cadastral maps, geotechnical reports, zoning decisions, utility surveys.

**Old way:** Hunt through 6 different PDFs to find the setback distance or soil bearing capacity.

**With site file:** All site constraints, utilities, and topography in one place. The compiler automatically links buildings to their site.

**One site file = all plot data in one place.**
:::

A **Site** represents the land parcel — the physical context above which buildings are placed. It captures zoning constraints, utility availability, topography, and geographic location.

## Purpose

Sites define:
- Plot boundaries and areas (total, buildable, green)
- Zoning constraints (setbacks, height limits, coverage ratios)
- Utility connections at the site boundary
- Topography and geotechnical data
- Geographic coordinates and address
- Local planning designation (MPZP, WZ, development plan)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique site identifier | `"SITE-GREEN-TERRACE"` |
| `entityType` | string | Must be `"site"` | `"site"` |
| `siteName` | string | Human-readable name | `"Green Terrace Plot"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Site identifier with `SITE-` prefix
- **siteName**: Project site name ("Green Terrace Plot")
- **version**: Track changes

**You only NEED these 3 fields.** Add address, area, constraints as you gather them.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `address` | object | Street address (street, city, postalCode, region, country) |
| `location` | object | GPS coordinates (latitude, longitude, elevation) |
| `siteArea` | number | Total plot area in m² |
| `buildableArea` | number | Area available for building footprint in m² |
| `greenArea` | number | Required green/open area in m² |
| `buildingIds` | array | Auto-computed: buildings on this site |
| `siteConstraints` | array | Setbacks, easements, heritage zones, flood zones |
| `utilities` | array | Water, sewage, electrical, gas connections |
| `topography` | object | Elevation, slope, soil type, bearing capacity, groundwater |
| `zoningDesignation` | object | Local planning designation (MPZP, WZ, etc.) |
| `cost` | object | Site-related costs (land, preparation, infrastructure) |
| `ifcMapping` | object | IFC mapping (IfcSite) |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For permit submission:**
- **address** — Street address for official correspondence
- **siteArea** — Total plot area (from cadastral survey)
- **buildableArea** — Buildable area after setbacks
- **zoningDesignation** — MPZP or WZ reference number
- **siteConstraints** — Setback distances per MPZP

**For design:**
- **topography** — Elevation, slope, soil type
- **utilities** — What's available at the boundary
- **location** — GPS coordinates for orientation/solar studies

**Most common:** Start with address, siteArea, and siteConstraints. Add topography and utilities when geotechnical and utility surveys arrive.
:::

## Site Constraints

Constraints describe what limits your design:

```yaml
siteConstraints:
  - type: "setback"
    direction: "north"
    distance: 4.0
    regulation: "MPZP §12.3"

  - type: "setback"
    direction: "east"
    distance: 3.0
    regulation: "MPZP §12.3"

  - type: "height_limit"
    value: "25m"
    regulation: "MPZP §8.1"

  - type: "coverage_limit"
    value: "40%"
    regulation: "MPZP §9.2"

  - type: "heritage_zone"
    description: "Conservation area buffer - 50m from listed monument"
    regulation: "WKZ/2024/1234"

  - type: "flood_zone"
    description: "100-year flood zone boundary crosses NE corner"
    regulation: "RZGW/2023/567"
```

**Constraint types:** `setback`, `easement`, `heritage_zone`, `flood_zone`, `environmental`, `height_limit`, `coverage_limit`, `other`

## Utilities

Track what's available at the site boundary:

```yaml
utilities:
  - type: "water"
    connectionPoint: "north_boundary"
    capacity: "DN100"
    provider: "MPWiK Warszawa"
    status: "available"

  - type: "sewage"
    connectionPoint: "north_boundary"
    capacity: "DN150"
    status: "available"

  - type: "electrical"
    connectionPoint: "east_boundary"
    capacity: "40kW"
    provider: "innogy Stoen"
    status: "available"

  - type: "gas"
    connectionPoint: "east_boundary"
    capacity: "10 m³/h"
    status: "available"

  - type: "district_heating"
    connectionPoint: "west_boundary"
    capacity: "120 kW"
    provider: "Veolia Warszawa"
    status: "requires_extension"

  - type: "fiber"
    connectionPoint: "east_boundary"
    provider: "Orange Polska"
    status: "available"
```

**Utility types:** `water`, `sewage`, `stormwater`, `electrical`, `gas`, `district_heating`, `telecom`, `fiber`

**Status values:** `available`, `planned`, `requires_extension`, `unavailable`

## Zoning Designation

For Polish projects, this is typically the MPZP or WZ decision:

```yaml
zoningDesignation:
  planType: "mpzp"
  planReference: "MPZP Mokotów Stegny, Uchwała Nr XLII/1234/2023"
  allowedUse:
    - "residential_multifamily"
    - "services"
    - "retail_ground_floor"
  maxHeight: 25
  maxCoverage: 0.4
  maxFAR: 2.5
  minGreenRatio: 0.25
```

**Plan types:** `mpzp` (local plan), `wz` (zoning decision), `zoning_ordinance`, `development_plan`, `other`

## Example 1: Minimal Site File

```markdown
File: site.md

---
id: "SITE-GREEN-TERRACE"
entityType: "site"
siteName: "Green Terrace Plot"
siteArea: 1250
address:
  street: "ul. Słoneczna 45"
  city: "Warsaw"
  postalCode: "02-495"
  country: "PL"
version: "1.0.0"
---

# Site: Green Terrace

1,250 m² plot on ul. Słoneczna, Warsaw.
```

## Example 2: Complete Site (Full Details)

```markdown
---
id: "SITE-GREEN-TERRACE"
entityType: "site"
siteName: "Green Terrace Plot"

address:
  street: "ul. Słoneczna 45"
  city: "Warsaw"
  postalCode: "02-495"
  region: "Mazowieckie"
  country: "PL"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100

siteArea: 1250
buildableArea: 500
greenArea: 312.5

siteConstraints:
  - type: "setback"
    direction: "north"
    distance: 4.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "south"
    distance: 4.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "east"
    distance: 3.0
    regulation: "MPZP §12.3"
  - type: "setback"
    direction: "west"
    distance: 3.0
    regulation: "MPZP §12.3"
  - type: "height_limit"
    value: "25m"
    regulation: "MPZP §8.1"
  - type: "coverage_limit"
    value: "40%"
    regulation: "MPZP §9.2"

utilities:
  - type: "water"
    connectionPoint: "north_boundary"
    capacity: "DN100"
    provider: "MPWiK Warszawa"
    status: "available"
  - type: "sewage"
    connectionPoint: "north_boundary"
    capacity: "DN150"
    status: "available"
  - type: "electrical"
    connectionPoint: "east_boundary"
    capacity: "40kW"
    provider: "innogy Stoen"
    status: "available"
  - type: "district_heating"
    connectionPoint: "west_boundary"
    capacity: "120 kW"
    provider: "Veolia Warszawa"
    status: "requires_extension"

topography:
  elevation: 100
  slope: 1.5
  soilType: "clay_loam"
  bearingCapacity: 250
  groundwaterLevel: 3.2

zoningDesignation:
  planType: "mpzp"
  planReference: "MPZP Mokotów Stegny, Uchwała Nr XLII/1234/2023"
  allowedUse:
    - "residential_multifamily"
    - "services"
  maxHeight: 25
  maxCoverage: 0.4
  maxFAR: 2.5
  minGreenRatio: 0.25

ifcMapping:
  ifcEntity: "IfcSite"
  globalId: "1a2B3c4D5e6F7g8H9i0JkL"

version: "1.0.0"
tags:
  - "residential"
  - "warsaw"
  - "mokotow"
---

# Site: Green Terrace

## Plot Overview

- **Location:** ul. Słoneczna 45, Warsaw
- **Plot Area:** 1,250 m²
- **Buildable Area:** 500 m² (40% coverage)
- **Green Area:** 312.5 m² (25% minimum)
- **MPZP:** Mokotów Stegny, max height 25m, FAR 2.5

## Geotechnical Summary

- **Soil:** Clay loam, bearing capacity 250 kPa
- **Groundwater:** 3.2m below grade
- **Slope:** 1.5° (nearly flat)

## Utility Connections

All major utilities available at boundary. District heating requires 15m extension from west.
```

## How Site Connects to Other Entities

```
Site (Green Terrace Plot)
  └─ Building (Green Terrace Apartments)  ← via building.siteId
      └─ Level (Ground Floor)
          └─ Space (Bedroom 01)
```

Buildings reference their site using the `siteId` field:

```yaml
# In building.md
---
id: "BLD-01"
entityType: "building"
siteId: "SITE-GREEN-TERRACE"  # ← links to site
buildingName: "Green Terrace Apartments"
---
```

The compiler auto-computes the reverse: the site's `buildingIds` array lists all buildings that reference it.

## BIM Mapping

Sites map to **IfcSite** entities:

| SBM Field | IFC Property |
|-----------|--------------|
| `id` | `Pset_SBM_Site.SBM_ID` |
| `siteName` | `Name` |
| `siteArea` | `Pset_SiteCommon.TotalArea` |
| `buildableArea` | `Pset_SiteCommon.BuildableArea` |
| `location.latitude` | `RefLatitude` |
| `location.longitude` | `RefLongitude` |
| `location.elevation` | `RefElevation` |

## Cost Tracking

The compiler performs hierarchical cost rollup:

```
spaces → levels → buildings → sites → project
```

If a site has buildings with rolled-up costs, the site total is automatically computed.

## See Also

- **[Building](/en/documentation/entities/building)** — Buildings belong to sites
- **[Level](/en/documentation/entities/level)** — Levels belong to buildings
- **[Compiler Guide](/en/documentation/compiler/)** — Site-level compilation
