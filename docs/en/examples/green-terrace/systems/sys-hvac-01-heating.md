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

# Subsystem: Heating (Heat Pump + UFH)

**Parent System:** [SYS-HVAC-01](sys-hvac-01.md)

Heating subsystem providing space heating via air-source heat pump and underfloor distribution manifold.

## Equipment

1. **Heat Pump** ([AST-HP-01](../assets/ai-hp-01.md))
   - Bosch Compress 7000i AW 12kW
   - COP: 4.3 (measured at A7/W35)

2. **UFH Manifold** (AST-UFH-MANIFOLD-01)
   - 5 circuits: 2 bedrooms, corridor, bathroom, living room
   - Flow temperature: 35°C

## Performance

- Design heat load: 4,750 W
- Installed capacity: 12 kW (2.5× safety factor)
- Measured COP: 4.3

---

**Status:** Operational
**Last Updated:** 2026-02-28
