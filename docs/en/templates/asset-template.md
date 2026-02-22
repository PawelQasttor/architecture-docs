# Asset Instance Document Template

Use this template to document individual equipment items with maintenance data.

## Template File

**Filename pattern:** `assets/ai-[asset-type]-[name].md`
**Example:** `assets/ai-ahu-01.md`, `assets/ai-boiler-main.md`

---

## YAML Frontmatter Template

```yaml
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-[ASSET-TYPE]-[SEQ]"  # Example: AI-AHU-01
projectPhase: "construction_documentation"
bimLOD: "LOD_400"

# Asset Properties
assetName: "Asset Name"
assetTypeId: "AT-[ASSET-TYPE]"  # Reference to asset type definition
systemId: "SYS-[SYSTEM-ID]"
buildingId: "BLD-01"
locatedInSpaceId: "SP-[SPACE-ID]"

# Identification
identifiers:
  tag: "TAG-001"  # Asset tag number
  serial: "TBD_ON_INSTALLATION"
  barcode: "TBD_ON_INSTALLATION"  # Optional

# Product Specification
manufacturer: "Manufacturer Name"
model: "Model Number"
productCode: "Product Code"

# Performance Data (optional)
performanceData:
  # Add equipment-specific performance specs

# FM Data
maintenanceData:
  serviceIntervalMonths: 6
  expectedLifetimeYears: 15
  warrantyYears: 2
  sparePartsRequired:
    - "Part name 1"
    - "Part name 2"

# Requirements
requirements:
  - "REQ-[REQUIREMENT-ID]"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcBuildingElement"  # Or specific element type
  globalId: "GENERATE_ON_IMPORT"

# Installation Data
installation:
  installationDate: "TBD"
  installer: "TBD"
  commissioningDate: "TBD"
  commissioningReport: "TBD"

# Metadata
version: "1.0.0"
---

# Asset Instance: [Asset Name]

## Equipment Description

Brief description of the equipment, its function, and role in the system.

## Technical Specifications

- Key technical specifications
- Performance ratings
- Operational parameters

## Installation Requirements

- Mounting requirements
- Access clearances
- Power/utility connections
- Controls integration

## Maintenance Schedule

### Every [Period]
- Maintenance task 1
- Maintenance task 2

### Annually
- Annual maintenance tasks

## Supplier Information

- Supplier name and contact
- Technical support contact
- Spare parts availability

## Documentation

- Link to installation manual
- Link to O&M manual
- Link to spare parts catalog
```

---

## Asset Type Prefixes

### HVAC
- `AI-AHU-` - Air handling units
- `AI-HRV-` - Heat recovery ventilators
- `AI-BOILER-` - Boilers
- `AI-CHILLER-` - Chillers
- `AI-PUMP-` - Pumps
- `AI-FAN-` - Fans

### Electrical
- `AI-PANEL-` - Electrical panels
- `AI-TRANS-` - Transformers
- `AI-GEN-` - Generators
- `AI-UPS-` - UPS systems

### Plumbing
- `AI-TANK-` - Water tanks
- `AI-HEATER-` - Water heaters
- `AI-PUMP-` - Pumps

### Fire Safety
- `AI-SPRINKLER-` - Sprinkler systems
- `AI-ALARM-` - Fire alarm panels
- `AI-EXTINGUISHER-` - Fire extinguishers
