---
entityType: construction_package
id: CP-STRUCTURE
packageName: "Structural Works"
description: "Substructure and superstructure including foundations, RC frame, floor slabs, stairwell core, and structural walls."
sequence: 1
scope: "All reinforced concrete structural elements: pad foundations, ground beams, columns, floor slabs (LVL-00 to LVL-05 + roof), stairwell core walls, lintels."

status: "completed"
plannedStart: "2024-01-15"
plannedEnd: "2024-06-30"
actualStart: "2024-01-20"
actualEnd: "2024-07-05"

duration:
  planned: 120
  actual: 118

progress:
  percentComplete: 100
  earnedValue: 480000
  plannedValue: 480000
  actualCost: 495000

dependencies: []

contractor:
  company: "BudStruct Sp. z o.o."
  contact: "Tomasz Nowak, +48 22 123 4567"
  contractRef: "GT-2024-STRUCT-001"
  contractValue: 480000

costBreakdown:
  labor: 180000
  materials: 240000
  equipment: 35000
  overhead: 15000
  contingency: 10000
  total: 480000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 480000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-STRUCT-001"

version: "1.0.0"
tags:
  - "structure"
  - "foundations"
  - "rc-frame"
  - "completed"
---

# Construction Package: Structural Works

Substructure and superstructure for Green Terrace, including foundations, RC frame, floor slabs, and stairwell core.

## Scope

- Pad foundations and ground beams
- RC columns and beams (6 storeys)
- Floor slabs (LVL-00 through roof)
- Stairwell core walls (REI 120)
- Structural lintels

## Schedule

| | Planned | Actual |
|---|---------|--------|
| Start | 2024-01-15 | 2024-01-20 |
| End | 2024-06-30 | 2024-07-05 |
| Duration | 120 days | 118 days |

## Cost

- **Contract value:** EUR 480,000
- **Actual cost:** EUR 495,000 (+3.1%)
- **Contractor:** BudStruct Sp. z o.o.

## Status

Completed. All structural elements installed and inspected.

---

**Last Updated:** 2026-03-01
