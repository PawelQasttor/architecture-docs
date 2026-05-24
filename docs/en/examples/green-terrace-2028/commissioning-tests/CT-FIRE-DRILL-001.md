---
entityType: "commissioning_test"
id: "CT-FIRE-DRILL-001"
version: "2.1.0"
projectPhase: "operation"

testName: "Whole-building fire evacuation drill — EXECUTED"
testCategory: "emergency_systems"
status: "passed"

buildingId: "BLD-01"
testedEntityIds:
  - "VC-STAIR-A"
  - "SP-BLD-01-L01-CORR"
  - "CR-FIRE-EGRESS-L01"
requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"

testProcedure:
  standard: "PD 7974-6 — Human factors: Life safety strategies"
  method: "Pre-handover simulated evacuation with volunteer occupants representing full building load. Per design-phase commissioning plan."

scheduledDate: "2026-02-25"
executedDate: "2026-02-25"
executedBy:
  name: "Anna Zielińska"
  organization: "Zielińska Fire Safety Consultancy"
  qualification: "PIIB fire-safety specialist + IFE Member"
  certificationNumber: "MZ-7891"
witnessedBy:
  - name: "Captain Krzysztof Borowski"
    organization: "Warsaw Fire Brigade — Station 12"
    role: "regulatory observer"
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architect of Record"

results:
  expected:
    maxEvacuationTimeMinutes: 2.5
    pathfinderRSET: 2.1
  measured:
    scenario1_StairABlocked_minutes: 2.3      # all occupants use stairwell B
    scenario2_StairBBlocked_minutes: 2.2      # all use stairwell A
    averageEvacuationTime: 2.25
    bottleneckLocation: "Stairwell B landing at Level 02 — minor congestion at 110-120 s"
    measurementDate: "2026-02-25"
    notes: |
      Pathfinder predicted 2.1 min worst-case. Real-world result 2.3 min —
      9 % adverse delta from prediction (within the typical 10-15 % real-vs-sim
      adverse delta for residential evacuations). Two volunteer occupants
      required staff prompting at decision points; no actual delay caused.
      Fire brigade observer recorded no rule-of-engagement breaches.
  passCriteria:
    actualEvacuationTimeMinutes: 2.5
    noOccupantStranded: true
    allAssistiveEquipmentFunctional: true
  outcome: "passed"
  outcomeNotes: |
    Worst-case 2.3 minutes ≤ 2.5 minute regulatory limit. No occupants
    stranded; all 4 evacuation chairs demonstrated successfully.
    Recommended that a similar drill be repeated at 36 months with
    actual residents to validate behaviour now that occupancy has
    settled in.

constructionPackageId: "CP-MEP"

# This is one of the few operation-phase tests that came back clean
followUpIssueIds: []

sources:
  - id: "SRC-CT-FIRE-DRILL-001-OPS-01"
    title: "Green Terrace — Fire Evacuation Drill Report"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-25"
    author: "Anna Zielińska / Zielińska Fire Safety Consultancy"
  - id: "SRC-CT-FIRE-DRILL-001-OPS-02"
    title: "Warsaw Fire Brigade — Observation Report, Station 12"
    type: "regulatory_code"
    documentType: "fire_brigade_observation"
    date: "2026-02-26"
    author: "Captain Krzysztof Borowski, KM PSP Warszawa"

tags:
  - "operation-phase-example"
  - "executed-test"
  - "safety-critical"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase execution of CT-FIRE-DRILL-001 — passed at 2.3 min vs 2.5 limit; 9% adverse delta vs Pathfinder prediction"
---

# CT-FIRE-DRILL-001 — Executed (2026-02-25) — Passed

The pre-handover fire evacuation drill **executed**. Worst-case scenario
(Stairwell A blocked, all occupants using Stairwell B) cleared the building
in **2.3 minutes** — within the 2.5-minute regulatory limit and 9 % above
the 2.1-minute Pathfinder prediction. Warsaw Fire Brigade observed with
no rule-of-engagement breaches.

| Scenario | Result | Limit | Outcome |
|---|---|---|---|
| Stairwell A blocked (Stair B only) | **2.3 min** | 2.5 min | Pass |
| Stairwell B blocked (Stair A only) | 2.2 min | 2.5 min | Pass |
| Pathfinder prediction (worst case) | 2.1 min | 2.5 min | Pass (predicted) |

## Why a 9% adverse delta is normal

Pathfinder simulation assumes ideal occupant behaviour. Real drills
typically show 10-15 % adverse delta — volunteer occupants pause at decision
points, take time to recognise the alarm is real, and (sometimes) start
moving in the wrong direction before correcting. 9 % is at the **better
end of normal**.

## Recommendation

The 36-month retest should use **actual residents** rather than volunteers,
now that occupancy has settled in and tenants know the building. That gives
the most accurate evacuation-time number for the actual operating
population.
