# Asset Document Template

Use this template to document individual equipment items with maintenance data.

## Template File

**Filename pattern:** `assets/ast-[asset-type]-[name].md`
**Example:** `assets/ast-ahu-01.md`, `assets/ast-boiler-main.md`

---

## YAML Frontmatter Template

```yaml
---
documentType: "asset"
entityType: "asset"
id: "AST-[ASSET-TYPE]-[SEQ]"  # Example: AST-AHU-01
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

# Asset: [Asset Name]

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
- `AST-AHU-` - Air handling units
- `AST-HRV-` - Heat recovery ventilators
- `AST-BOILER-` - Boilers
- `AST-CHILLER-` - Chillers
- `AST-PUMP-` - Pumps
- `AST-FAN-` - Fans

### Electrical
- `AST-PANEL-` - Electrical panels
- `AST-TRANS-` - Transformers
- `AST-GEN-` - Generators
- `AST-UPS-` - UPS systems

### Plumbing
- `AST-TANK-` - Water tanks
- `AST-HEATER-` - Water heaters
- `AST-PUMP-` - Pumps

### Fire Safety
- `AST-SPRINKLER-` - Sprinkler systems
- `AST-ALARM-` - Fire alarm panels
- `AST-EXTINGUISHER-` - Fire extinguishers
