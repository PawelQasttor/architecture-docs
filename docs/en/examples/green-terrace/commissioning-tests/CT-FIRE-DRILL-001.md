---
entityType: "commissioning_test"
id: "CT-FIRE-DRILL-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "Whole-building fire evacuation drill"
testCategory: "emergency_systems"
status: "planned"

buildingId: "BLD-01"
testedEntityIds:
  - "VC-STAIR-A"
  - "SP-BLD-01-L01-CORR"
  - "CR-FIRE-EGRESS-L01"
requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"

testProcedure:
  standard: "PD 7974-6 — Human factors: Life safety strategies"
  method: |
    Simulated worst-case evacuation: full building occupancy of 54 persons
    (volunteer occupants if pre-handover; actual residents if post-handover),
    fire alarm initiated from worst-case room of origin (Bedroom on Level 05),
    stairwell A artificially declared "blocked" so all occupants must use
    stairwell B. Timed from alarm activation to last occupant out of building.
    Repeat under same conditions but with stairwell B blocked.
  equipment:
    - "Stopwatch + headcount sheets at all egress points"
    - "Fire alarm test panel (manufacturer's test mode)"
    - "Video recording of decision points (with occupant consent)"
  conditions: |
    Conducted during daylight hours for occupant safety. Local fire brigade
    notified in advance. All assistive-evacuation equipment (evacuation
    chairs in stairwells) physically demonstrated, not just visually inspected.

scheduledDate: "2026-02-25"
executedBy:
  name: "Anna Zielińska"
  organization: "Zielińska Fire Safety Consultancy"
  qualification: "PIIB fire-safety specialist + IFE Member"
  certificationNumber: "MZ-7891"
witnessedBy:
  - name: "Captain (TBC)"
    organization: "Warsaw Fire Brigade — local station"
    role: "regulatory observer"
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architect of Record"

results:
  expected:
    maxEvacuationTimeMinutes: 2.5
    pathfinderRSET: 2.1
  measured: null
  passCriteria:
    actualEvacuationTimeMinutes: 2.5
    noOccupantStranded: true
    allAssistiveEquipmentFunctional: true
  outcome: "pending"

constructionPackageId: "CP-MEP"

sources:
  - id: "SRC-CT-FIRE-DRILL-001-01"
    title: "Green Terrace — Commissioning Plan §6.1 (Fire Drill)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Anna Zielińska + Anna Nowak"

tags:
  - "commissioning-artifact"
  - "safety-critical"

notes: |
  This is the **real-world counterpart** to the Pathfinder simulation
  recorded in REQ-FIRE-EGRESS-TIME-001 (2.1 min RSET). Simulation gives
  *design-phase confidence*; the drill gives *handover-phase verification*.

  If actual evacuation time exceeds 2.5 minutes, a non-conformance issue
  must be opened and the building cannot be handed over until either
  (a) the path is rectified and the drill re-run, or (b) operating
  procedures (e.g., reduced occupancy) are adopted with regulatory approval.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — links the design-phase egress simulation to a commissioning-phase verification"
---

# Commissioning Test — Fire evacuation drill (CT-FIRE-DRILL-001)

The **real-world counterpart** to the Pathfinder egress simulation. Verifies
under actual conditions what the simulation projected analytically: full
building evacuation in ≤ 2.5 minutes with one stairwell blocked.

| Field | Value |
|---|---|
| Category | Emergency systems |
| Status | Planned (2026-02-25) |
| Tested entities | Stairwell A, Level 01 corridor, CR-FIRE-EGRESS-L01 |
| Verifies | REQ-FIRE-EGRESS-TIME-001 (2.5 min limit) |
| Witnessed | Fire Brigade + Architect |
| Outcome | Pending — populated after drill |

## Why this entity exists

The Green Terrace example previously had a fire-egress *requirement* with
a Pathfinder simulation result — but **no record of the physical drill**
that would actually verify the building meets the requirement in practice.

This `commissioning_test` entity closes the loop from design-phase
simulation (`REQ-FIRE-EGRESS-TIME-001.simulationResults`) through
construction-phase verification (`CR-FIRE-EGRESS-L01.verification`) to
commissioning-phase **drill** — three different artefacts at three
different lifecycle phases, all referring to the same regulatory limit.

## Related

- [Requirement `REQ-FIRE-EGRESS-TIME-001`](../requirements/REQ-FIRE-EGRESS-TIME-001) — the 2.5 min RSET limit
- [Circulation Route `CR-FIRE-EGRESS-L01`](../circulation-routes/CR-FIRE-EGRESS-L01) — the path the drill follows
- [Vertical Circulation `VC-STAIR-A`](../staircase-a) — the protected stairwell
