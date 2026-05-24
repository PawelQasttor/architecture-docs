---
entityType: "site"
id: "SITE-GREEN-TERRACE"
version: "2.1.0"
projectPhase: "operation"

siteName: "Green Terrace site"
country: "PL"
address:
  street: "ul. Słoneczna 45"
  city: "Warszawa"
  postalCode: "02-495"
  country: "PL"

# Single-building site (campus example would extend this with multiple buildings)
buildingIds:
  - "BLD-01"

plotArea: 1250
buildingFootprint: 320

operationalStatus:
  handoverDate: "2026-03-15"
  monthsInOperation: 22

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase site entity — minimal context for the 2028 example"
---

# Green Terrace site — Operation Phase

Same plot as the [design example site](/en/examples/green-terrace/site).
Included here only so the compiler can resolve `BLD-01.siteId` and
generate the operation-phase outputs.
