---
entityType: "issue"
id: "ISS-WARRANTY-HP-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Heat pump compressor seizure under warranty — replaced"
issueType: "non_conformance"
issueNumber: "WAR-HP-001"
status: "closed"
priority: "high"

description: |
  Heat pump AST-HP-01 compressor seized at month 14 of operation
  (~9,800 runtime hours). Loss of heating to apartments served by the
  primary heating loop for ~6 hours while diagnosis was conducted;
  emergency electric resistance backup carried the load.

  Bosch authorised service investigated and confirmed a manufacturer
  batch defect on Generation 3 compressors produced Q3 2025. Compressor
  was replaced under warranty at zero cost to client. Post-replacement
  COP measured 3.50 — slightly below the pre-failure baseline of 3.55
  and trending downward since (see [AST-HP-01 operational record](../assets/ai-hp-01-ops)).

buildingId: "BLD-01"
relatedEntityIds:
  - "AST-HP-01"
  - "SYS-HVAC-01"

initiatedBy:
  name: "Building maintenance (Adam Lis)"
  organization: "GreenFM Sp. z o.o. (FM contractor)"
  role: "FM technician — reported BMS alarm"
  date: "2027-05-02"
assignedTo:
  name: "Bosch authorised service"
  organization: "BoschService PL"
  role: "warranty repair contractor"
dueDate: "2027-05-09"
responseDate: "2027-05-04"
closedDate: "2027-05-04"

response:
  respondedBy: "Marek Kałuża (Bosch authorised service)"
  responseDate: "2027-05-04"
  responseText: |
    Diagnosis: compressor seizure consistent with batch defect (Bosch
    bulletin BCB-2026-03 on Generation 3 compressors Q3 2025 production
    run). Replaced compressor under warranty (no cost). Refrigerant
    recharged to specification. Post-replacement test: COP 3.50, system
    pressure nominal. Recommend monitoring COP trend at quarterly
    inspections — minor degradation may be expected for 4-6 weeks as
    new compressor beds in.
  attachments:
    - "Bosch-BCB-2026-03-batch-defect-bulletin.pdf"
    - "Warranty-claim-WAR-HP-001-resolution.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "warranty"
  notes: "Replacement parts + labour covered by manufacturer warranty. No cost to client."

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Resolved in 2 days. Heating restored within 6 hours of initial fault via emergency backup."

sources:
  - id: "SRC-ISS-WARRANTY-HP-001-01"
    title: "BMS alarm log — heat pump fault 2027-05-02"
    type: "other"
    documentType: "bms_alarm_log"
    date: "2027-05-02"
    author: "GreenFM Sp. z o.o."

tags:
  - "operation-phase-example"
  - "warranty"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase warranty issue — compressor batch defect, replaced at zero cost, downstream COP drift triggers ongoing monitoring"
---

# Issue — Heat pump compressor warranty replacement (ISS-WARRANTY-HP-001)

A real warranty event during operation. Diagnosed and replaced in 48 hours
at zero cost to client, but the post-replacement performance has trended
downward — a slow-burn issue that the FM team is now actively monitoring.

| Field | Value |
|---|---|
| Type | Non-conformance / warranty |
| Status | Closed (warranty claim resolved) |
| Initiated | 2027-05-02 (BMS alarm) |
| Resolved | 2027-05-04 |
| Cost | €0 (warranty) |
| Service impact | 6 hours reduced heating; no tenant complaint |

## Related

- [AST-HP-01 operational record](../assets/ai-hp-01-ops) — the post-replacement COP trend that this issue triggered
- [SYS-HVAC-01](../systems/sys-hvac-01) — system-level performance summary

## What this entity shows

The issue is **closed** (warranty resolved) but its downstream effect is
**ongoing**. The asset record carries the COP trend; this issue carries
the root-cause narrative. Cross-referencing both gives the FM team a
complete picture: "we know why COP is drifting — it's the post-warranty
compressor; the original is a batch defect, not a building-design issue."
