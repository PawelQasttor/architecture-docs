---
entityType: construction_package
id: CP-MEP
packageName: "MEP Installations"
description: "Mechanical, electrical, and plumbing installations including HVAC, electrical distribution, water supply, drainage, and fire safety systems."
sequence: 3
scope: "Heat pump and UFH system, MVHR ventilation, electrical distribution and lighting, water supply and drainage, fire detection and alarm."

status: "in_progress"
plannedStart: "2024-07-01"
plannedEnd: "2024-12-15"
actualStart: "2024-07-10"

duration:
  planned: 120

progress:
  percentComplete: 85
  earnedValue: 272000
  plannedValue: 320000
  actualCost: 285000

dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"
    lag: 0

contractor:
  company: "HVAC Services Ltd."
  contact: "Jan Kowalski, +48 22 555 1234"
  contractRef: "GT-2024-MEP-001"
  contractValue: 320000

costBreakdown:
  labor: 130000
  materials: 145000
  equipment: 25000
  overhead: 10000
  contingency: 10000
  total: 320000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 320000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-MEP-001"

version: "1.0.0"
tags:
  - "mep"
  - "hvac"
  - "electrical"
  - "plumbing"
  - "in-progress"
---

# Construction Package: MEP Installations

All mechanical, electrical, and plumbing systems for Green Terrace.

## Scope

- **HVAC:** Heat pump ([AST-HP-01](../assets/ai-hp-01)), underfloor heating, MVHR ventilation
- **Electrical:** Distribution boards, wiring, lighting, EV charging
- **Plumbing:** Water supply, drainage, rainwater harvesting
- **Fire safety:** Detection, alarm, emergency lighting

## Dependencies

- Depends on: **CP-STRUCTURE** (finish-to-start)

## Schedule

| | Planned | Actual |
|---|---------|--------|
| Start | 2024-07-01 | 2024-07-10 |
| End | 2024-12-15 | In progress |
| Duration | 120 days | - |

## Progress

- **85% complete** (as of 2026-03-01)
- Heat pump and UFH: Commissioned
- MVHR: Installed, commissioning pending
- Electrical: First fix complete, second fix 70%
- Plumbing: Complete

## Cost

- **Contract value:** EUR 320,000
- **Spent to date:** EUR 285,000

---

**Last Updated:** 2026-03-01
