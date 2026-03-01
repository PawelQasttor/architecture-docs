---
entityType: "system"
id: "SYS-HVAC-01-HEATING"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "Heating Subsystem (Heat Pump + UFH)"
systemCategory: "hvac"
parentSystemId: "SYS-HVAC-01"
buildingId: "BLD-01"
constructionPackageId: "CP-MEP"

# Assets in this subsystem
assetIds:
  - "AST-HP-01"
  - "AST-UFH-MANIFOLD-01"

performance:
  installedHeatingCapacity: "12 kW"
  measuredCOP: 4.3
  flowTemperature: "35°C"
  designHeatLoad: "4750 W"

version: "1.0.0"
tags:
  - "hvac"
  - "heating"
  - "heat-pump"
  - "underfloor-heating"
---

# Podsystem: Ogrzewanie (pompa ciepła + ogrzewanie podłogowe)

**System nadrzędny:** [SYS-HVAC-01](sys-hvac-01.md)

Podsystem grzewczy zapewniający ogrzewanie pomieszczeń za pomocą powietrznej pompy ciepła i rozdzielacza ogrzewania podłogowego.

## Urządzenia

1. **Pompa ciepła** ([AST-HP-01](../zasoby/ai-hp-01.md))
   - Bosch Compress 7000i AW 12kW
   - COP: 4,3 (zmierzony przy A7/W35)

2. **Rozdzielacz ogrzewania podłogowego** (AST-UFH-MANIFOLD-01)
   - 5 obiegów: 2 sypialnie, korytarz, łazienka, salon
   - Temperatura zasilania: 35°C

## Wydajność

- Projektowe obciążenie cieplne: 4 750 W
- Zainstalowana moc: 12 kW (współczynnik bezpieczeństwa 2,5x)
- Zmierzony COP: 4,3

---

**Status:** Operacyjny
**Ostatnia aktualizacja:** 2026-02-28
