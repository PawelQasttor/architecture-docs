---
entityType: "system"
id: "SYS-HVAC-01-VENT"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "Ventilation Subsystem (MVHR)"
systemCategory: "hvac"
parentSystemId: "SYS-HVAC-01"
buildingId: "BLD-01"
constructionPackageId: "CP-MEP"

# Assets in this subsystem
assetIds:
  - "AST-MVHR-01"

performance:
  heatRecoveryEfficiency: "92%"
  totalAirflow: "220 m³/h"
  airChangeRate: "0.53 ACH"

version: "1.0.0"
tags:
  - "hvac"
  - "ventilation"
  - "mvhr"
  - "heat-recovery"
---

# Subsystem: Ventilation (MVHR)

**Parent System:** [SYS-HVAC-01](sys-hvac-01.md)

Mechanical ventilation with heat recovery (MVHR) subsystem providing continuous fresh air supply and exhaust with 92% heat recovery efficiency.

## Equipment

1. **MVHR Unit** ([AST-MVHR-01](../assets/ai-mvhr-01.md))
   - Systemair SAVE VTR 300
   - Heat recovery: 92% (tested post-installation)

## Airflow Distribution

| Space | Type | Flow Rate |
|-------|------|-----------|
| Bedroom 01 | Supply | 60 m³/h |
| Bedroom 02 | Supply | 60 m³/h |
| Living room | Supply | 50 m³/h |
| Kitchen | Extract | 70 m³/h |
| Bathroom | Extract | 50 m³/h |

---

**Status:** Operational
**Last Updated:** 2026-02-28
