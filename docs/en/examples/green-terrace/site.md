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
    provider: "MPWiK Warszawa"
    status: "available"
  - type: "stormwater"
    connectionPoint: "north_boundary"
    capacity: "DN200"
    status: "available"
  - type: "electrical"
    connectionPoint: "east_boundary"
    capacity: "40kW"
    provider: "innogy Stoen"
    status: "available"
  - type: "gas"
    connectionPoint: "east_boundary"
    capacity: "10 m³/h"
    provider: "PSG"
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
    - "retail_ground_floor"
  maxHeight: 25
  maxCoverage: 0.4
  maxFAR: 2.5
  minGreenRatio: 0.25

ifcMapping:
  ifcEntity: "IfcSite"
  globalId: "1a2B3c4D5e6F7g8H9i0JkL"

cost:
  totalCost: 625000
  currency: "PLN"
  basis: "land_acquisition"
  breakdown:
    land: 500000
    sitePreparation: 75000
    utilityConnections: 50000

version: "1.0.0"
tags:
  - "residential"
  - "warsaw"
  - "mokotow"
---

# Site: Green Terrace

## Plot Overview

- **Location:** ul. Słoneczna 45, 02-495 Warsaw, Poland
- **Plot Area:** 1,250 m²
- **Building Footprint:** 450 m² (36% coverage, max 40%)
- **Green Area:** 312.5 m² (25% of plot)
- **Elevation:** 100 m a.s.l.

## Zoning (MPZP)

- **Plan:** MPZP Mokotów Stegny
- **Max Height:** 25 m
- **Max Coverage:** 40%
- **Max FAR:** 2.5
- **Min Green:** 25%
- **Allowed Use:** Residential multifamily, services, ground-floor retail

## Setbacks

| Direction | Distance | Regulation |
|-----------|----------|------------|
| North | 4.0 m | MPZP §12.3 |
| South | 4.0 m | MPZP §12.3 |
| East | 3.0 m | MPZP §12.3 |
| West | 3.0 m | MPZP §12.3 |

## Geotechnical Summary

| Parameter | Value |
|-----------|-------|
| **Soil Type** | Clay loam |
| **Bearing Capacity** | 250 kPa |
| **Groundwater** | 3.2 m below grade |
| **Slope** | 1.5° (nearly flat) |

## Utility Connections

| Utility | Point | Capacity | Provider | Status |
|---------|-------|----------|----------|--------|
| Water | North | DN100 | MPWiK | Available |
| Sewage | North | DN150 | MPWiK | Available |
| Stormwater | North | DN200 | — | Available |
| Electrical | East | 40 kW | innogy Stoen | Available |
| Gas | East | 10 m³/h | PSG | Available |
| District Heating | West | 120 kW | Veolia | Requires extension |
| Fiber | East | — | Orange | Available |

## Site Costs

| Item | Amount (PLN) |
|------|-------------|
| Land acquisition | 500,000 |
| Site preparation | 75,000 |
| Utility connections | 50,000 |
| **Total** | **625,000** |
