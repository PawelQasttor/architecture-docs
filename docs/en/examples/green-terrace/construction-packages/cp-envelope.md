---
entityType: construction_package
id: CP-ENVELOPE
packageName: "Envelope & Facade"
description: "External walls, insulation, render, windows, doors, roof covering, and all weatherproofing elements."
sequence: 2
scope: "AAC masonry, XPS insulation, mineral render, all windows and external doors, roof membrane and insulation, DPC and waterproofing."

status: "completed"
plannedStart: "2024-05-01"
plannedEnd: "2024-09-30"
actualStart: "2024-05-15"
actualEnd: "2024-10-10"

duration:
  planned: 110
  actual: 108

progress:
  percentComplete: 100
  earnedValue: 350000
  plannedValue: 350000
  actualCost: 362000

dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"
    lag: -30

contractor:
  company: "FasadPol Sp. z o.o."
  contact: "Maria Kowalska, +48 22 987 6543"
  contractRef: "GT-2024-ENV-001"
  contractValue: 350000

costBreakdown:
  labor: 120000
  materials: 185000
  equipment: 20000
  overhead: 12000
  contingency: 13000
  total: 350000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 350000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-ENVLP-001"

version: "1.0.0"
tags:
  - "envelope"
  - "facade"
  - "windows"
  - "insulation"
  - "completed"
---

# Construction Package: Envelope & Facade

All external building envelope elements: walls, insulation, windows, doors, and roof.

## Scope

- AAC block masonry (external walls)
- XPS insulation (180mm)
- Mineral render (external finish)
- All windows ([Internorm KF 410](../opening-types/internorm-kf410-window))
- External doors and fire doors
- Roof membrane and insulation
- DPC and waterproofing

## Dependencies

- Depends on: **CP-STRUCTURE** (finish-to-start, 30-day lead)

## Schedule

| | Planned | Actual |
|---|---------|--------|
| Start | 2024-05-01 | 2024-05-15 |
| End | 2024-09-30 | 2024-10-10 |
| Duration | 110 days | 108 days |

## Cost

- **Contract value:** EUR 350,000
- **Actual cost:** EUR 362,000 (+3.4%)
- **Contractor:** FasadPol Sp. z o.o.

## Status

Completed. Airtightness test passed (0.55 ACH @ 50 Pa).

---

**Last Updated:** 2026-03-01
