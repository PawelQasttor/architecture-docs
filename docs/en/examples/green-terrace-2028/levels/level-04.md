---
entityType: "level"
id: "LVL-04"
version: "2.1.0"
projectPhase: "operation"

levelName: "Level 04 — Fourth Floor"
levelNumber: 4
elevation: 12.20             # m above LVL-00
buildingId: "BLD-01"

typicalCeilingHeight: 2.70
unit: "m"

# Operation-phase context: this is where most operation issues clustered
operationalNotes: |
  Level 04 has been the source of more than half the operation-phase
  issues to date: the south-facing apartments (4.01, 4.02, 4.03) report
  overheating in summer, the heat pump warranty claim originated from a
  Level 04 zone, and the CO2 anomaly is in Bedroom 01 of apartment 4.02.
  Whether this is a Level 04 problem or a "top-of-stack" effect (Level 05
  has a green roof) is still being investigated.

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase Level 04 — added to give the operation example a level context where the issues cluster"
---

# Level 04 — Operation Phase

Level 04 carries most of the operation-phase issues in this example.
For the full level design model see the [design-phase Level 01](/en/examples/green-terrace/levels/level-01)
(LVL-04 is identical in design — only its operation context differs).

## Why Level 04 specifically

The summer 2027 IEQ survey returned a cluster of overheating complaints
from south-facing apartments on this floor. The CO₂ sensor anomaly is
in this floor's apartment 4.02. The heat pump warranty claim originated
from an air-handling unit serving Level 04. Whether this is a "Level 04
issue" or a "top-of-stack" effect with Level 05's green roof acting as
thermal mass is the question this example's retro-commissioning Issue
([`ISS-RETROCX-MVHR-001`](../issues/ISS-RETROCX-MVHR-001)) is trying
to answer.
