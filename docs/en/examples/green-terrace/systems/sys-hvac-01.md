---
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System Building 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"
systemCategory: "hvac"
buildingId: "BLD-01"
constructionPackageId: "CP-MEP"

# Served zones
servedZoneIds:
  - "ZONE-HVAC-NORTH"

# Subsystem hierarchy (v0.6) — assets moved to subsystems
# subsystemIds auto-computed by compiler: ["SYS-HVAC-01-HEATING", "SYS-HVAC-01-VENT"]

# Instance-specific performance
performance:
  installedHeatingCapacity: "12 kW"
  actualHeatRecovery: "92%"
  measuredCOP: 4.3
  servedArea: 95.0
  unit: "m2"

version: "1.0.0"
tags:
  - "hvac"
  - "heat-pump"
  - "mvhr"
  - "building-01"
---

# System: HVAC System Building 01

**Type:** [Residential HVAC - MVHR + Heat Pump](../system-types/hvac-residential-mvhr.md)

Integrated HVAC system serving apartments on first floor of Building 01, providing heating via heat pump and underfloor distribution, plus continuous mechanical ventilation with heat recovery.

## System Overview

- **Building:** BLD-01 (Green Terrace)
- **Served Zones:** ZONE-HVAC-NORTH (north wing, first floor)
- **Served Area:** 95 m² (2 × bedrooms + corridor + bathroom + living)
- **Occupancy:** Up to 4 people

## Equipment Installed

### Primary Equipment

1. **MVHR Unit** (AST-MVHR-01)
   - Location: Ceiling void above corridor
   - Model: Systemair SAVE VTR 300
   - Heat recovery: 92% (tested)

2. **Heat Pump** ([AST-HP-01](../assets/ai-hp-01.md))
   - Location: External wall (north side, ground level)
   - Model: Bosch Compress 7000i AW 12kW
   - COP: 4.3 (measured at A7/W35)

3. **Underfloor Heating Manifold** (AST-UFH-MANIFOLD-01)
   - Location: Service cupboard, first floor corridor
   - Zones: 5 circuits (bedroom 01, bedroom 02, corridor, bathroom, living room)

## Performance Data

**Heating:**
- Installed capacity: 12 kW
- Measured COP: 4.3 at design conditions
- Flow temperature: 35°C (underfloor heating)
- Design heat load: 4,750W (calculated)

**Ventilation:**
- Heat recovery efficiency: 92% (tested post-installation)
- Total airflow: 220 m³/h at design (0.53 ACH)
- Supply: Bedrooms + living room (fresh air)
- Extract: Kitchen + bathroom (stale air)

## Served Spaces

- SP-BLD-01-L01-001 (Bedroom 01): 60 m³/h supply
- SP-BLD-01-L01-002 (Bedroom 02): 60 m³/h supply
- Kitchen: 70 m³/h extract
- Bathroom: 50 m³/h extract

## Commissioning Results

- **Date:** 2024-06-20
- **Commissioning Engineer:** HVAC Services Ltd.
- **Results:** All performance targets met
  - Airflow within ±8% of design
  - Heat recovery 92% (exceeds 90% target)
  - Acoustic levels ≤24 dB(A) in bedrooms (exceeds ≤25 dB(A) target)
  - COP 4.3 (exceeds 4.2 target)

**Certificate:** HVAC-COMM-BLD-01-2024-06-20

## Maintenance Schedule

- **Next service due:** 2025-06-20 (annual)
- **Filter change:** Every 6 months (January, July)
- **Last inspection:** 2024-12-15 (interim check)

## Related Documentation

- **System Type:** [SYT-HVAC-RESIDENTIAL-MVHR](../system-types/hvac-residential-mvhr.md)
- **Zones:** [ZONE-HVAC-NORTH](../zones/hvac-zone-north.md)
- **Assets:** AST-MVHR-01, [AST-HP-01](../assets/ai-hp-01.md), AST-UFH-MANIFOLD-01
- **Building:** [BLD-01](../project-specification.md)

---

**Status:** Operational
**Installation Date:** 2024-06-15
**Warranty Expires:** 2029-06-15 (5 years)
**Last Updated:** 2026-02-22
