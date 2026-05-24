---
entityType: "building"
id: "BLD-03"
name: "Linden Court — accessible-design residential building"
version: "2.1.0"
projectPhase: "design_development"
bimLOD: "LOD_300"

siteId: "SITE-GTP-PHASE-2"
campusId: "CAM-GREEN-TERRACE-PARK"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 360

numberOfStoreys:
  aboveGround: 5
  belowGround: 0
  total: 5
buildingHeight: 16.5
eaveHeight: 14.5
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "enhanced"   # higher than BLD-01/BLD-02 default

# Designed for older + wheelchair-using residents
unitMix:
  oneBedroom: 8
  twoBedroom: 8
  threeBedroom: 2
  totalUnits: 18
  accessibilityNotes: |
    100% of apartments designed to Polish "Lokal Dostępny" enhanced
    accessibility spec: 1500 mm turning circles, 950 mm clear doorways,
    accessible WC + bathroom, ground-floor outdoor terrace access on
    accessible-route side.

cost:
  totalCost: 1900000
  currency: "EUR"
  basis: "DD_estimate"
  _meta:
    confidence: "estimated"
    source: "DD-phase QS estimate, Class 3"

# DD-phase status
designProgress:
  ddStarted: "2026-04-01"
  ddTargetCompletion: "2026-10-31"
  cdTargetStart: "2026-11-01"
  expectedHandover: "2028-06-15"

tags:
  - "campus-example"
  - "sibling-building"
  - "accessible-design"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of Campus showcase example — sibling building in DD phase, accessible-design variant"
---

# BLD-03 — Linden Court

A 5-storey, 18-unit residential building **designed for enhanced
accessibility**. Currently in design development. One of three sibling
buildings in the [Green Terrace Park campus](../campus).

| Property | Value |
|---|---|
| Phase | `design_development` |
| Storeys | 5 (above-ground only) |
| Gross floor area | 1,800 m² |
| Dwelling units | 18 (8× 1BR + 8× 2BR + 2× 3BR — 1BR-heavy for solo/older residents) |
| Accessibility compliance | **enhanced** (100% Lokal Dostępny) |
| Expected handover | 2028-06-15 |

## Why this variant exists in the example

The Campus would be unconvincing if every sibling were a copy of BLD-01.
Linden Court shows that sibling buildings in the same Campus can have
**different design intents** — here, enhanced accessibility for older
and wheelchair-using residents. The Campus entity doesn't care; it just
aggregates them.
