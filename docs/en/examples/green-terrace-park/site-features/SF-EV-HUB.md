---
entityType: "site_feature"
id: "SF-EV-HUB"
version: "2.1.0"
projectPhase: "construction"

featureName: "Campus EV charging hub"
featureType: "ev_charging"
featureCategory: "other"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Shared EV charging hub within the campus parking area: 12 AC 22 kW
  posts (24 connectors) + 2 DC 50 kW rapid chargers. Sized to support
  ~30% EV penetration across the campus's 64 parking spaces, with
  conduits laid for a further 12 AC posts as adoption grows.

# 12 AC posts × 22 kW + 2 DC × 50 kW = 364 kW peak (load-managed to 200 kW)
loadManagement:
  totalInstalledKW: 364
  managedPeakKW: 200
  managementStrategy: "Dynamic load balancing — daytime cap 100 kW, overnight 200 kW, dispatch via smart-charger network"

connectorMix:
  ac22kw: 12       # type 2, 22 kW AC
  dc50kw: 2        # CCS Combo, 50 kW DC
  futureExpandableAcPosts: 12

# Usage scope (campus-wide)
servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

# Linked to electrical infrastructure
constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 78000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"
  - "decarbonisation"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus EV charging hub — added with Campus showcase, demonstrates a load-managed shared amenity"
---

# Campus EV charging hub (SF-EV-HUB)

A shared EV charging facility supporting campus-wide electrified transport.

| Property | Value |
|---|---|
| Posts (today) | 12 × 22 kW AC + 2 × 50 kW DC |
| Connectors | 26 |
| Peak managed load | 200 kW (dynamic) |
| Expansion ready | +12 AC posts (conduits installed) |
| Cost | €78,000 |

## Load management

The installed posts could pull 364 kW peak (12 × 22 + 2 × 50). The
campus electrical supply is sized for **200 kW** peak EV load with
dynamic load balancing — daytime cap 100 kW, overnight 200 kW.
Conduits are laid for 12 more AC posts but no electrical upsize is
needed until campus EV penetration crosses ~50 %.
