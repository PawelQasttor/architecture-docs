---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"
projectPhase: "design_development"
bimLOD: "LOD_300"

# Basic Properties
spaceName: "Bedroom 02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
roomNumber: "1.01.2"
accessibilityLevel: "standard"
departmentId: "DEPT-RESIDENTIAL-A"

# Instance-Specific Location Data
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

# Lifecycle
lifecycleState: "design"

# Instance-Specific Spatial Data
designArea: 12.8
# designHeight: 2.70  ← INHERITED from LVL-01.typicalCeilingHeight (v0.1.4)
# finishes: oak/white ← INHERITED from LVL-01.typicalFinishes (v0.1.4)
# environmentalConditions ← INHERITED from LVL-01.typicalEnvironmentalConditions (v0.1.4)
designVolume: 34.6
unit: "m"

# FM/Maintenance
maintenanceZone: "MZ-RESIDENTIAL-01"
accessRestrictions: "private"

# Instance-Specific Relationships
adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxR"
  objectType: "Bedroom"

# Metadata
version: "2.1.0"
lastReviewed: "2026-02-23"
tags:
  - "residential"
  - "sleeping"
  - "north-facing"
changelog:
  - version: "2.1.0"
    date: "2026-02-23"
    description: "Updated to use property inheritance (v0.1.4)"
  - version: "2.0.0"
    date: "2026-02-22"
    description: "Migrated to type/instance pattern"
---

# Space: Bedroom 02

**Type:** Standard Bedroom - Type A (see `#.md`)

Second bedroom in apartment unit 01 on first floor of the Green Terrace residential building. North-facing room suitable for 1-2 occupants.

::: tip Type-Based + Level Inheritance (v0.1.4)
This bedroom inherits from **Space Type + Level**:
- ✅ **From Type:** Requirements, equipment, occupancy profile
- ✅ **From Level:** 2.70m ceiling, oak/white finishes, 20-24°C environment
- ✅ **Merged Requirements:** Type + Level requirements combined
- ✅ **Instance-Only:** Area (12.8 m²), adjacencies, zones

Same specifications as Bedroom 01, but with less floor area (12.8 m² vs 14.5 m²).
:::

## Instance-Specific Details

### Location & Dimensions
- **Building:** BLD-01 (Green Terrace)
- **Level:** L01 (First Floor)
- **Area:** 12.8 m² (within type range: 10-18 m²) ✅
- **Height:** 2.70 m clear (exceeds minimum 2.50m) ✅
- **Volume:** 34.6 m³
- **Orientation:** North-facing

### Adjacencies
- **West:** [Bedroom 01](./bedroom-01) - Shared internal wall (standard acoustic partition)
- **East:** [Corridor](./corridor) - Access via acoustic door (Rw 38 dB)
- **Above:** Similar apartment on Level 02
- **Below:** Living room of apartment on ground floor

### Zones
This bedroom is part of:
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md) - Fire safety zone
- [HVAC North Zone](../zones/hvac-zone-north.md) - North wing climate control
- [Acoustic Night Zone](../zones/acoustic-zone-night.md) - Enhanced acoustic privacy

## Design Features

### Daylight & Views
- **Window Area:** 1.68 m² (1200×1400mm standard per type)
- **Window-to-Floor Ratio:** 13.1% (slightly higher than Bedroom 01 due to smaller floor area)
- **Expected Daylight Factor:** 2.5-3.5% (north-facing, favorable ratio)
- **Views:** Landscaped courtyard
- **Verification:** DIVA simulation planned for March 2026

### Systems Integration
- **Heating:** Underfloor heating (SYS-HVAC-UFH-01)
- **Ventilation:** MVHR supply diffuser (SYS-HVAC-MVHR-01)
  - Supply airflow: 60 m³/h for 2 occupants
- **Fire Detection:** Optical smoke detector per type specification

## Compliance Status

All requirements inherited from [Standard Bedroom Type A](#):

| Requirement | Status | Notes |
|-------------|--------|-------|
| REQ-DAYLIGHT-SLEEPING-001 | ⏳ Pending | Higher window ratio favorable |
| REQ-ACOUSTIC-SLEEPING-001 | ⏳ Pending | Post-construction testing |
| REQ-THERMAL-COMFORT-001 | ✅ Design OK | UFH + MVHR compliant |
| REQ-VENTILATION-OCCUPIED-001 | ✅ Design OK | 60 m³/h supply |
| REQ-PL-WT-ROOM-HEIGHT-001 | ✅ Compliant | 2.70m > 2.50m |
| REQ-FIRE-ZL-IV-001 | ✅ Compliant | Within escape distance |

## Related Documentation

### Type Definition
- [Standard Bedroom - Type A](#) - Complete specifications

### Spatial Context
- Apartment Unit 01 - Parent residential unit
- [Bedroom 01](./bedroom-01) - Adjacent bedroom (same apartment)
- [Corridor](./corridor) - Access circulation

### Zones
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md)
- [HVAC North Zone](../zones/hvac-zone-north.md)
- [Acoustic Night Zone](../zones/acoustic-zone-night.md)

## Instance Notes

**Smaller but Efficient:** At 12.8 m², this bedroom is at the lower end of the type's range (10-18 m²) but still provides comfortable accommodation for 1-2 occupants. The slightly higher window-to-floor ratio (13.1% vs 11.6% in Bedroom 01) may result in better daylight performance.

**Internal Adjacency:** Shares wall with Bedroom 01 (same apartment), so standard acoustic partition is sufficient. Party wall construction with adjacent apartments provides enhanced Rw ≥50 dB acoustic isolation.

---

**Document Status:** Design Development (LOD 300)
**Pattern Version:** Type/Instance v2.0.0 + Property Inheritance v0.1.4
**Last Review:** 2026-02-23
**Next Review:** Design freeze before construction documentation phase
**Compliance Status:** On track; simulation/testing verification pending
