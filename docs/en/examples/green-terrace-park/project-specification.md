---
entityType: "project"
id: "PRJ-GREEN-TERRACE-PARK"
version: "2.1.0"
phase: "construction"

projectName: "Green Terrace Park residential campus"
projectLocation: "Warsaw, Poland"
country: "PL"

# Campus-scope project — currency in EUR matches all entity costs in this example
budget:
  totalBudget: 7900000      # ~€2.2M (BLD-02) + €1.9M (BLD-03) + €1.3M (BLD-04) + €320k (CP-SITE-INFRA) + ~€2.18M (BLD-01 as-built)
  currency: "EUR"

bimLOD: "LOD_300"

authors:
  - name: "Anna Nowak"
    role: "lead_architect"
    license: "IARP 5678"

tags:
  - "campus-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Minimal project entity for the Campus showcase example — fixes EUR/PLN currency mismatch warnings"
---

# Project specification — Green Terrace Park

Minimal project-spec wrapper so the Campus example compiles with EUR as
the project currency. The substantive project data lives in the
[Campus entity](./campus) and per-building entities.

| Property | Value |
|---|---|
| Project | Green Terrace Park residential campus |
| Phase (overall) | `construction` (rollup of mixed-phase children) |
| Country | PL |
| Currency | EUR |
| Total budget (4 buildings + site infrastructure) | €7.9M |
