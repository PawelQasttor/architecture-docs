---
entityType: "approval_gate"
id: "GATE-CAMPUS-PLANNING"
version: "2.4.0"
projectPhase: "design_development"

gateType: "planning_path_confirmed"
gateTitle: "Campus planning path confirmed — phasing & shared-infrastructure sequencing"
gatePhase: "concept"
status: "in_progress"
decisionOwner:
  role: "investor"
  name: "Green Terrace Park Development"
prerequisites:
  - description: "Campus environmental decision obtained"
    met: true
    evidenceRef: "PERMIT-CAMPUS-MASTER"
  - description: "Shared district-heating loop capacity confirmed for all 4 buildings"
    met: true
    evidenceRef: "SYS-DH-LOOP-CAMPUS"
  - description: "Building phasing sequence agreed (which building permits in which order)"
    met: false
  - description: "Shared site-infrastructure construction package sequenced"
    met: false
    evidenceRef: "CP-SITE-INFRASTRUCTURE"
deliverableRefs:
  - "PERMIT-CAMPUS-MASTER"
  - "CP-SITE-INFRASTRUCTURE"
blockingIssueIds:
  - "ISS-CAMPUS-PLANNING-001"
relatedPermitIds:
  - "PERMIT-CAMPUS-MASTER"
relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Approval Gate: Campus Planning Path Confirmed

The campus-level coordination gate that must clear before the four buildings
can proceed on their independent permitting/construction tracks.

## Decision

**Status: IN PROGRESS** — two prerequisites still open, and the gate is
**blocked** by an open campus-planning issue.

| Prerequisite | Met |
|--------------|-----|
| [Campus environmental decision](../permits/PERMIT-CAMPUS-MASTER) | ✅ |
| Shared district-heating capacity confirmed | ✅ |
| Building phasing sequence agreed | ⏳ open |
| Shared site-infrastructure sequenced | ⏳ open |

This gate is held open by [ISS-CAMPUS-PLANNING-001](../issues/ISS-CAMPUS-PLANNING-001),
demonstrating how an `approval_gate` links its blocking `issue` and the
shared `permit` across a multi-building campus.
