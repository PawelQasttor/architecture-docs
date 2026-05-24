---
entityType: "asset"
id: "AST-UFH-MANIFOLD-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "UFH manifold 01 (operational)"
assetTypeId: "AT-UFH-MANIFOLD-12-ZONE"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-11-20"
commissioningDate: "2026-02-10"
warrantyExpiry: "2028-02-10"

operationalHistory:
  runtimeHours: 6200           # heating season only (intermittent)
  runtimeHoursAsOf: "2028-01-31"
  zoneValveCycles: 89000       # aggregate across 12 zones
  energyConsumed_kWh: 95       # the manifold itself — pumps/actuators — minor
  zoneValveReplacements: 2     # of 12 total zones

  servicedAt:
    - date: "2026-09-15"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "All 12 zones cycling correctly. Pressure 1.2 bar."
      cost_eur: 90
    - date: "2027-02-08"
      type: "zone_valve_replacement"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: |
        Zone 6 (apartment 3.02 bathroom) valve actuator failed to close
        at end of heating call. Replaced under warranty. ~4,500 cycles
        before failure — normal end-of-life range is 30,000+ cycles, so
        this is an early-life failure (probable manufacturing defect).
      cost_eur: 0
      relatedIssueId: null
    - date: "2027-09-18"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Zones cycling correctly. Pressure 1.2 bar. No issues noted."
      cost_eur: 90
    - date: "2027-11-30"
      type: "zone_valve_replacement"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: |
        Zone 11 (apartment 5.03 bathroom) actuator sticking. Replaced.
        Under warranty (~7,200 cycles — also early-life). Bosch
        investigating actuator batch quality.
      cost_eur: 0

  performanceTrend:
    notes: |
      Hydraulic performance stable. Two zone-valve early-life failures
      from same actuator batch may indicate a wider quality issue —
      Bosch monitoring. No customer-visible heating performance impact
      because the failures were detected and replaced before degrading
      apartment temperature.

  dataSource: "external CSV: telemetry/AST-UFH-MANIFOLD-01-cycles-2026-04-to-2028-01.csv"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Operation-phase UFH manifold record — 6,200 runtime hours, 2 early-life zone-valve failures from same batch"
---

# UFH manifold AST-UFH-MANIFOLD-01 — Operational Record (Jan 2028)

12-zone underfloor heating manifold after two heating seasons. Hydraulic
performance stable; **two early-life zone-valve failures** from the same
actuator batch, both replaced under warranty.

| Metric | Value |
|---|---|
| Runtime hours | 6,200 (heating season only) |
| Aggregate zone-valve cycles | 89,000 |
| Energy consumed (controls/pumps) | 95 kWh |
| Zone-valve replacements | 2 (zones 6 and 11) — both early-life failures |
| Service events | 4 (2 planned + 2 replacements) |
| Total service cost | €180 (replacements were warranty) |

## What this asset tells us

The two zone-valve failures at ~4,500 and ~7,200 cycles are **both well
short of the normal 30,000+ cycle end-of-life threshold**, and both came
from the same actuator manufacturing batch. Bosch is monitoring the wider
batch quality. From a building-operations perspective the failures were
caught by routine inspection before any tenant-visible heating problem
occurred — but a `telemetry_stream` entity (see [SCHEMA-GAPS](../SCHEMA-GAPS))
would let the BMS detect "valve failed to close at end of heat call"
events in real time, rather than relying on quarterly inspections.

## Related

- [System `SYS-HVAC-01`](../systems/sys-hvac-01)
- Design-phase counterpart: [`AST-UFH-MANIFOLD-01` in design model](/en/examples/green-terrace/assets/ai-ufh-manifold-01)
