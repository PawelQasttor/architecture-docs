---
entityType: "approval_gate"
id: "GATE-PERMIT-READY"
version: "2.4.0"
projectPhase: "construction_documents"

gateType: "permit_ready"
gateTitle: "Permit-ready — building permit obtained, pre-construction checklist"
gatePhase: "construction_documents"
status: "passed_with_actions"
decisionOwner:
  role: "investor"
  name: "Green Terrace Sp. z o.o."
decisionDate: "2025-12-03"
prerequisites:
  - description: "WZ decision final"
    met: true
    evidenceRef: "PERMIT-WZ-001"
  - description: "Building permit issued and final"
    met: true
    evidenceRef: "PERMIT-PB-001"
  - description: "Kierownik budowy (site manager) appointed"
    met: false
  - description: "Construction log (EDB) registered"
    met: false
deliverableRefs:
  - "PERMIT-PB-001"
relatedPermitIds:
  - "PERMIT-WZ-001"
  - "PERMIT-PB-001"
relatedEntityIds:
  - "BLD-01"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Approval Gate: Permit-Ready

Confirms the project holds a valid building permit and is clearing the
remaining pre-construction actions before works start on site.

## Decision

**Status: PASSED WITH ACTIONS** (2025-12-03, owner: investor).

The regulatory authorizations are in place; two operational prerequisites
remain open and carry into mobilization:

| Prerequisite | Met |
|--------------|-----|
| [WZ decision](../permits/PERMIT-WZ-001) final | ✅ |
| [Building permit](../permits/PERMIT-PB-001) final | ✅ |
| Site manager appointed | ⏳ open |
| Construction log (EDB) registered | ⏳ open |

The two open items mirror the conditions on
[PERMIT-PB-001](../permits/PERMIT-PB-001) and must be closed before the
construction-start gate.
