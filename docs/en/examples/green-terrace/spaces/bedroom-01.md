---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

# Basic Properties
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
roomNumber: "1.01.1"
accessibilityLevel: "standard"
departmentId: "DEPT-RESIDENTIAL-A"

# Instance-Specific Location Data
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

# Lifecycle & Regulatory
lifecycleState: "design"
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 132"
    description: "Minimum room height 2.50m for residential"
    status: "compliant"
  - code: "WT 2021"
    section: "§ 155"
    description: "Minimum bedroom area 8m² (single) or 12m² (double)"
    status: "compliant"

# Instance-Specific Spatial Data
designArea: 14.5
designHeight: 2.70
designVolume: 39.15
unit: "m"

# FM/Maintenance
maintenanceZone: "MAINT-ZONE-RESIDENTIAL"
accessRestrictions: "tenant_only"

# Instance-Specific Relationships
adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

# Metadata
version: "2.0.0"
lastReviewed: "2026-02-22"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Space: Bedroom 01

**Type:** Standard Bedroom - Type A (see `#.md`)

Standard bedroom in apartment unit 01 on first floor of the Green Terrace residential building. North-facing room with single window providing natural daylight and ventilation. This space is part of a 2-bedroom apartment designed for a small family.

::: tip Type-Based Design
This bedroom inherits all specifications from the **Standard Bedroom - Type A** template, including:
- ✅ 6 requirements (daylight, acoustic, thermal, ventilation, fire, height)
- ✅ Standard finishes (oak floor, painted walls, acoustic door, PVC window)
- ✅ Equipment (smoke detector, thermostat, MVHR, electrical outlets)
- ✅ Occupancy profile (2 people, 8h/day, residential sleeping)

See the [type definition](#) for complete specifications.
:::

## Instance-Specific Details

### Location & Dimensions
- **Building:** BLD-01 (Green Terrace)
- **Level:** L01 (First Floor)
- **Area:** 14.5 m² (within type range: 10-18 m²) ✅
- **Height:** 2.70 m clear (exceeds minimum 2.50m) ✅
- **Volume:** 39.15 m³
- **Orientation:** North-facing

### Adjacencies
- **East:** [Bedroom 02](./bedroom-02) - Shared party wall (Rw ≥50 dB acoustic partition)
- **West:** [Corridor](./corridor) - Access via acoustic door (Rw 38 dB)
- **Above:** Similar apartment on Level 02
- **Below:** Living room of apartment on ground floor

### Zones
This bedroom is part of:
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md) - Fire safety zone (6m to protected corridor)
- [HVAC North Zone](../zones/hvac-zone-north.md) - North wing climate control
- [Acoustic Night Zone](../zones/acoustic-zone-night.md) - Enhanced acoustic privacy

## Design Features

### Daylight & Views
- **Window Area:** 1.68 m² (1200×1400mm)
- **Window-to-Floor Ratio:** 11.6%
- **Expected Daylight Factor:** 2-3% (north-facing)
- **Views:** Landscaped courtyard with mature trees
- **Sun Exposure:** Minimal direct sun (north orientation) - ideal for sleeping comfort
- **Verification:** DIVA simulation planned for March 2026

### Acoustic Performance
- **Party Wall:** Rw ≥52 dB (exceeds requirement of Rw 50 dB)
  - Construction: 200mm concrete + 100mm insulation + air gap + gypsum board
- **Door to Corridor:** Rw 38 dB acoustic door with perimeter seals
- **Window:** Rw 36 dB double-glazed with acoustic laminate
- **Expected Performance:** Undisturbed sleep quality, suitable for urban location
- **Verification:** Post-construction acoustic testing required

### Systems Integration
- **Heating:** Underfloor heating (SYS-HVAC-UFH-01)
  - Individual room thermostat control
  - Design temperature: 21-24°C

- **Ventilation:** MVHR supply diffuser (SYS-HVAC-MVHR-01)
  - Supply airflow: 60 m³/h (30 m³/h per person × 2)
  - Ceiling-mounted diffuser positioned away from bed
  - Noise level: <25 dB(A)

- **Fire Detection:** Optical smoke detector
  - Mains-powered with battery backup
  - Connected to building alarm system
  - Positioned per manufacturer guidelines

## Compliance Status

All requirements inherited from [Standard Bedroom Type A](#) are applicable:

| Requirement | Status | Notes |
|-------------|--------|-------|
| REQ-DAYLIGHT-SLEEPING-001 | ⏳ Pending | Simulation scheduled March 2026 |
| REQ-ACOUSTIC-SLEEPING-001 | ⏳ Pending | Post-construction testing |
| REQ-THERMAL-COMFORT-001 | ✅ Design OK | UFH + MVHR system compliant |
| REQ-VENTILATION-OCCUPIED-001 | ✅ Design OK | 60 m³/h supply confirmed |
| REQ-PL-WT-ROOM-HEIGHT-001 | ✅ Compliant | 2.70m > 2.50m requirement |
| REQ-FIRE-ZL-IV-001 | ✅ Compliant | 6m < 10m escape distance |

## Maintenance Access

- **Standard Access:** Via apartment entrance (tenant coordination required)
- **Emergency Access:** Master key access for fire/flood emergencies
- **Service Access:** Scheduled maintenance via building management
  - Smoke detector annual check
  - Thermostat calibration
  - Window seal inspection (5-year cycle)

## Related Documentation

### Type Definition
- [Standard Bedroom - Type A](#) - Complete specifications

### Spatial Context
- Apartment Unit 01 - Parent residential unit
- [Bedroom 02](./bedroom-02) - Adjacent bedroom
- [Corridor](./corridor) - Access circulation

### Zones
- [Fire Zone ZL-IV](../zones/fire-zone-zl-iv.md)
- [HVAC North Zone](../zones/hvac-zone-north.md)
- [Acoustic Night Zone](../zones/acoustic-zone-night.md)

### Systems
- SYS-HVAC-UFH-01 - Underfloor heating
- SYS-HVAC-MVHR-01 - Mechanical ventilation with heat recovery
- SYS-FIRE-DETECTION-01 - Fire detection and alarm

## Instance Notes

**North Orientation Advantage:** The north-facing orientation provides consistent natural light throughout the day without excessive direct sun exposure, which is ideal for a sleeping space. This reduces overheating risk in summer and glare issues year-round.

**Courtyard Views:** Window overlooks the landscaped courtyard with mature trees, providing pleasant green views and visual privacy from neighboring buildings.

**Acoustic Consideration:** Shared wall with Bedroom 02 (same apartment) requires standard acoustic insulation. Party wall construction with adjacent apartments exceeds minimum requirements to ensure privacy.

---

**Document Status:** Design Development (LOD 300)
**Migration Note:** Migrated to type/instance pattern v2.0.0 (2026-02-22)
**Last Review:** 2026-02-22
**Next Review:** Design freeze before construction documentation phase
**Compliance Status:** On track; simulation/testing verification pending
