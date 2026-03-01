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

# Podsystem: Wentylacja (MVHR)

**System nadrzędny:** [SYS-HVAC-01](sys-hvac-01.md)

Podsystem wentylacji mechanicznej z odzyskiem ciepła (MVHR) zapewniający ciągły nawiew świeżego powietrza i wywiew z 92% sprawnością odzysku ciepła.

## Urządzenia

1. **Centrala MVHR** ([AST-MVHR-01](../zasoby/ai-mvhr-01.md))
   - Systemair SAVE VTR 300
   - Odzysk ciepła: 92% (przetestowany po instalacji)

## Dystrybucja powietrza

| Przestrzeń | Typ | Przepływ |
|------------|-----|----------|
| Sypialnia 01 | Nawiew | 60 m³/h |
| Sypialnia 02 | Nawiew | 60 m³/h |
| Salon | Nawiew | 50 m³/h |
| Kuchnia | Wywiew | 70 m³/h |
| Łazienka | Wywiew | 50 m³/h |

---

**Status:** Operacyjny
**Ostatnia aktualizacja:** 2026-02-28
