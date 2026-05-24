---
entityType: "site_feature"
id: "SF-BIKE-STORAGE"
version: "2.1.0"
projectPhase: "construction"

featureName: "Campus secure bike storage"
featureType: "bike_storage"
featureCategory: "other"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Covered, secure-access bike storage for campus residents. 96 standard
  stands (~1.3 bikes per apartment) + 12 cargo-bike / e-bike stands
  (oversize, with charging sockets) + 4 visitor stands at the campus entry.

# Capacity
standardStands: 96
cargoEbikeStands: 12
visitorStands: 4
totalCapacity: 112

# Standards
designStandards:
  - "PN-EN 1991-1-1 (live loads)"
  - "Polish Cyclists' Association best-practice guide (2024)"

# Access
accessControl: "Key fob (campus-wide credentials)"
security: "CCTV on entry + per-bay LED occupancy lights"

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 35000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"
  - "active-travel"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Campus bike storage — added with Campus showcase"
---

# Campus bike storage (SF-BIKE-STORAGE)

Secure covered bike storage serving all 4 buildings. 96 standard stands
+ 12 cargo/e-bike stands (with charging sockets) + 4 visitor stands.

| Property | Value |
|---|---|
| Capacity | 112 stands total |
| Cargo/e-bike (charging) | 12 |
| Access | Campus key-fob credentials |
| Cost | €35,000 |
