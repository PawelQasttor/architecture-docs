# System Document Template

Use this template to document building systems (HVAC, electrical, plumbing, fire safety, etc.).

## Template File

**Filename pattern:** `systems/sys-[system-type]-[name].md`
**Example:** `systems/sys-hvac-01.md`, `systems/sys-electrical-main.md`

---

## YAML Frontmatter Template

```yaml
---
documentType: "system"
entityType: "system"
id: "SYS-[CATEGORY]-[SEQ]"  # Example: SYS-HVAC-01
projectPhase: "construction_documentation"
bimLOD: "LOD_400"

# System Properties
systemName: "System Name"
systemType: "system_type"  # hvac_ventilation | hvac_heating | hvac_cooling | electrical_power | plumbing_water | etc.
systemCategory: "category"  # hvac | electrical | plumbing | fire_safety | security | communication | bms
buildingId: "BLD-01"

# Served Zones and Spaces
servedZoneIds:
  - "ZONE-[TYPE]-[ID]"
servedSpaceIds:
  - "SP-[SPACE-ID]"

# Asset Instances (equipment in this system)
assetInstanceIds:
  - "AI-[ASSET-ID]"

# Performance Specifications (optional)
performance:
  # Add system-specific performance data
  # For HVAC: airflow rates, efficiency, etc.
  # For electrical: voltage, capacity, etc.

# Requirements
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Regulatory Compliance
regulatoryCompliance:
  - regulation: "Regulation Name"
    section: "Section"
    requirement: "Requirement Description"
    status: "compliant"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "GENERATE_ON_IMPORT"
  objectType: "System_Type"

# Metadata
version: "1.0.0"
---

# System: [System Name]

## System Overview

Description of system purpose, function, and role in the building.

## Major Components

1. Component 1
2. Component 2

## Operation Strategy

- Normal operation parameters
- Control logic
- Setpoints and schedules

## Maintenance Requirements

- Routine maintenance tasks
- Service intervals
- Responsible parties

## Related Documentation

- Link to asset instances
- Link to served spaces/zones
- Link to requirements
```

---

## System Categories

- `hvac` - Heating, ventilation, air conditioning
- `electrical` - Electrical power and lighting
- `plumbing` - Water supply, drainage, sanitary
- `fire_safety` - Fire suppression, detection, alarms
- `security` - Access control, CCTV, alarms
- `communication` - Data, telecom, AV systems
- `bms` - Building management system
- `renewable_energy` - Solar, geothermal, wind

---

## System Types

### HVAC
- `hvac_ventilation`
- `hvac_heating`
- `hvac_cooling`
- `hvac_heat_recovery`

### Electrical
- `electrical_power_main`
- `electrical_lighting`
- `electrical_emergency`

### Plumbing
- `plumbing_water_supply`
- `plumbing_drainage`
- `plumbing_hvac_piping`
