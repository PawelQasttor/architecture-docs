---
entityType: "issue"
id: "ISS-CO-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "Change Order 001 — substitute PIR insulation product"
issueType: "change_order"
issueNumber: "CO-001"
status: "approved"
priority: "medium"

description: |
  The envelope subcontractor proposed substituting the specified Kingspan
  Kooltherm K15 PIR insulation (`MT-INSULATION-PIR-150`) with Recticel
  Powerline-PIR-DUR at equal 150 mm thickness. Both products carry
  PN-EN 13165 declaration; Recticel is available 4 weeks earlier from a
  Polish distributor, and at approximately €3.40/m² less. The proposed
  alternative has equal or better declared λ (0.022 W/(m·K)), equal
  reaction-to-fire class (B-s1,d0), and a published EPD.

  Architect and Structural Engineer reviewed the substitution against the
  envelope U-value calculation and the fire-strategy report. Approved with
  the conditions noted in the response.

buildingId: "BLD-01"
constructionPackageId: "CP-ENVELOPE"
relatedEntityIds:
  - "ENV-EW-01"
  - "MT-INSULATION-PIR-150"

initiatedBy:
  name: "Tomasz Maj"
  organization: "PolFasada Sp. z o.o. (envelope subcontractor)"
  role: "Project Manager"
  date: "2026-04-30"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "Architect of Record"
dueDate: "2026-05-07"
responseDate: "2026-05-06"
closedDate: "2026-05-06"

response:
  respondedBy: "Anna Nowak"
  responseDate: "2026-05-06"
  responseText: |
    Substitution APPROVED subject to:
    (a) submission of full ETA + EPD prior to delivery,
    (b) update of `MT-INSULATION-PIR-150` material entity to reference the
        Recticel EPD instead of Kingspan EPD (compiler will recompute
        embodied carbon — verify the project total remains within target),
    (c) green-roof drainage detail reviewed for compatibility (no impact
        on dimensions; same 150 mm thickness),
    (d) credit of €3.40/m² × 1,245 m² gross wall area = approximately
        €4,230 to be reflected in the next monthly valuation.
  attachments:
    - "Recticel-EPD-2024.pdf"
    - "ETA-13-0142-Powerline.pdf"
    - "CO-001-Approval-Letter.pdf"

costImpact:
  estimatedDeltaEur: -4230
  appliesTo: "envelope_subcontract"
  notes: "Credit to client — reflected in May 2026 valuation."

scheduleImpact:
  estimatedDelayDays: -28
  notes: "Saves 4 weeks of lead time vs. original Kingspan supplier."

sources:
  - id: "SRC-ISS-CO-001-01"
    title: "Green Terrace — Change Order 001"
    type: "other"
    documentType: "change_order"
    date: "2026-05-06"
    author: "PolFasada Sp. z o.o. + Nowak Architecture"

tags:
  - "construction-artifact"

notes: |
  This change order has a downstream effect that the compiler can track
  automatically: when `MT-INSULATION-PIR-150` is updated to point at the
  Recticel EPD, the embodied-carbon recalculation for the envelope cascades
  into the whole-building sustainability report. That cross-entity ripple
  is exactly why issues reference both the **construction package** and
  the **specific entities** they affect.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Added as part of v2.1.0 example refresh — demonstrates a construction-phase change order with knock-on material/sustainability changes"
---

# Issue — Change Order 001: PIR insulation substitution (ISS-CO-001)

A **construction-phase** change order that swaps one PIR product for another
to capture a 4-week lead-time saving and a €4,230 credit. Approved with
documentation conditions.

| Field | Value |
|---|---|
| Type | Change order |
| Number | CO-001 |
| Status | Approved + closed |
| Initiated | 2026-04-30 (envelope subcontractor) |
| Approved | 2026-05-06 |
| Cost impact | **−€4,230** (credit to client) |
| Schedule impact | **−28 days** (lead time saved) |

## Related

- [Envelope `ENV-EW-01`](../envelope-external-wall-type-a) — the wall assembly affected
- [Material `MT-INSULATION-PIR-150`](../materials/MT-INSULATION-PIR-150) — entity to be updated with Recticel EPD reference
- [Construction Package `CP-ENVELOPE`](../construction-packages/cp-envelope)
