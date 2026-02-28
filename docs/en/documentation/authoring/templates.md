# Document Templates

Copy-paste templates for all SBM document types. Replace placeholder values with your project data.

## Space Template {#space}

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"  # See entity docs for full enum
buildingId: "BLD-01"
levelId: "LVL-01"

zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

designArea: 14.5
designHeight: 2.70
designVolume: 39.15
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "north-facing"
---

# Space: Bedroom 01

Brief description of the space.

## Design Parameters

- Floor area: 14.5 m²
- Clear height: 2.70 m
- Volume: 39.15 m³

## Requirements

This space must satisfy:
- Minimum daylight factor 2% (EN 17037)
- Acoustic Class B insulation (ISO 140-4)
- Room height ≥ 2.50 m (WT 2021 § 132)
```

## Zone Template {#zone}

```markdown
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"  # fire, hvac, acoustic, security, maintenance
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"

description: >
  Residential fire zone with low fire load (ZL-IV per WT 2021 § 234).
  Requires REI 60 walls and floors, EI 30 fire doors.

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P5hJ2$sNDxw4YzFv3MQyR"
  objectType: "FireZone"

version: "1.0.0"
tags:
  - "fire_safety"
  - "residential"
  - "zl_iv"
---

# Zone: Fire Zone ZL-IV

Brief description of the zone.

## Requirements

- **Fire resistance:** REI 60 for walls and floors
- **Door rating:** EI 30 for fire doors
- **Egress:** Maximum travel distance 40m
```

## Requirement Template {#requirement}

```markdown
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-PROJECT-CUSTOM-001"

requirementName: "Project-specific requirement name"
requirementType: "performance"  # performance, dimensional, regulatory, design
countryScope: "project_specific"  # global, poland_specific, project_specific

scope:
  entityType: "space"
  spaceTypes: ["office", "meeting_room"]

metric: "room_height_clear"
operator: ">="  # >=, <=, ==, range
value: 3.00
unit: "m"

verification:
  method: "measurement"  # simulation, calculation, measurement, testing, certification
  tool: "Laser distance meter"
  phase: ["design_development", "as_built"]
  responsible: "architect"

description: >
  Detailed description of the requirement and its rationale.

version: "1.0.0"
tags:
  - "dimensional"
  - "custom"
---

# Requirement: Custom Project Requirement

Explanation of why this requirement exists and how to verify it.
```

## System Template {#system}

```markdown
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"  # hvac, electrical, plumbing, fire_safety
systemType: "variable_air_volume"
buildingId: "BLD-01"

servedZoneIds:
  - "ZONE-HVAC-NORTH"

capacity:
  cooling: 85
  heating: 75
  unit: "kW"

efficiency:
  cooling_cop: 3.2
  heating_cop: 3.8
  seer: 16.5

energySource: "electricity_heat_pump"
controlStrategy: "bms_ddc"

designCriteria:
  outdoorAirRate: 30
  outdoorAirRateUnit: "m3/h/person"
  minFreshAir: 0.5
  minFreshAirUnit: "ACH"

maintenanceSchedule:
  filterReplacement: "quarterly"
  annualInspection: true

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"

ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "1N2eH8$qKAxt2WxDu1LNyP"
  objectType: "HVAC"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
  - "variable_air_volume"
---

# System: HVAC System 01

Brief description of the system.

## System Components

- **AHU:** Rooftop air handling unit
- **VAV boxes:** 12 terminal units
- **Controls:** BACnet DDC via BMS
```

## Asset Template {#asset}

```markdown
---
documentType: "asset"
entityType: "asset"
id: "AST-AHU-01"
projectPhase: "construction"
bimLOD: "LOD_350"

assetName: "Air Handling Unit 01"
assetType: "ahu"  # See entity docs for full list
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
levelId: "LVL-ROOF"

manufacturer: "Systemair"
modelNumber: "Topvex SR11 EL"
serialNumber: "SR11-2026-04782"
assetTag: "GT-AHU-001"

installationDate: "2026-08-15"
warrantyExpiry: "2028-08-15"
expectedLifespan: 20

specifications:
  airflow: 12000
  airflowUnit: "m3/h"
  coolingCapacity: 85
  heatingCapacity: 75
  capacityUnit: "kW"
  powerConsumption: 15.5
  powerUnit: "kW"

maintenanceSchedule:
  tasks:
    - taskId: "MAINT-AHU-FILTER"
      taskName: "Replace air filters"
      frequency: "quarterly"
      estimatedDuration: 2
      durationUnit: "hours"
      skillRequired: "HVAC technician"

    - taskId: "MAINT-AHU-ANNUAL"
      taskName: "Annual inspection"
      frequency: "yearly"
      estimatedDuration: 8
      durationUnit: "hours"
      skillRequired: "Certified HVAC engineer"

spareParts:
  - partName: "Air filter F7"
    partNumber: "SF-F7-600x600"
    quantity: 4
    reorderLevel: 2
    unitCost: 145
    currency: "PLN"

supplier:
  name: "Systemair Polska Sp. z o.o."
  contact: "serwis@systemair.pl"
  phone: "+48 22 123 4567"

cost:
  purchase: 125000
  installation: 18000
  total: 143000
  currency: "PLN"

energyRating: "A+"

ifcMapping:
  ifcEntity: "IfcUnitaryEquipment"
  globalId: "0M1dG7$pJ9ws1VwCt0KMyO"
  objectType: "AirHandlingUnit"

version: "1.0.0"
tags:
  - "hvac"
  - "air_handling_unit"
  - "rooftop"
---

# Asset: Air Handling Unit 01

Brief description of the asset.

## Technical Specifications

- **Airflow:** 12,000 m³/h
- **Cooling:** 85 kW
- **Heating:** 75 kW
- **Power:** 15.5 kW

## Maintenance Schedule

### Quarterly
- Replace air filters

### Annual
- Full performance test
- Calibrate sensors
```

## Building Template {#building}

```markdown
---
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

projectId: "PRJ-MY-PROJECT-2026"
buildingName: "My Building Name"
buildingType: "residential_multifamily"  # See entity docs for full enum

country: "PL"  # ISO 3166-1 alpha-2 code
address:
  street: "ul. Example Street 42"
  city: "Warsaw"
  postalCode: "00-001"
  region: "Mazowieckie"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100
  elevationUnit: "m"

climateZone: "Dfb"  # Köppen classification
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

occupancyType: "R-2"  # IBC classification
constructionType: "Type_VA"
yearBuilt: 2026

certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
  - name: "LEED"
    level: "Silver"
    status: "planned"

ifcMapping:
  ifcEntity: "IfcBuilding"
  globalId: "3K4hJ1$rMCxv2WxEt1LNxQ"
  objectType: "Residential"

version: "1.0.0"
tags:
  - "residential"
  - "multifamily"
  - "sustainable"
---

# Building: My Building Name

Brief project description.

## Project Overview

- **Location:** City, Region, Country
- **Type:** Building type
- **GFA:** Total floor area
- **Completion:** Estimated completion date

## Sustainability

- **BREEAM:** Very Good (in progress)
- **Energy:** Nearly Zero Energy Building (nZEB)
```

## Level Template {#level}

```markdown
---
documentType: "level"
entityType: "level"
id: "LVL-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
levelNumber: 0

elevation: 0.0
elevationUnit: "m"

levelHeight: 3.20
levelHeightUnit: "m"

grossFloorArea: 1250
areaUnit: "m2"

levelType: "ground"  # basement, ground, typical, roof, mechanical

description: >
  Ground floor with main entrance, lobby, and residential units.

ifcMapping:
  ifcEntity: "IfcBuildingStorey"
  globalId: "2L3gI9$sNEyv4XzGv2MPzR"
  objectType: "Ground Floor"

version: "1.0.0"
tags:
  - "ground_floor"
  - "entrance"
---

# Level 01: Ground Floor

Brief level description.

## Level Details

- **Elevation:** 0.00 m (grade level)
- **Floor-to-floor height:** 3.20 m
- **Gross floor area:** 1,250 m²

## Spaces on This Level

- Entrance lobby: 45 m²
- Residential units: 8 units
- Corridors and circulation
```

---

## Minimal Templates

For quick authoring, use these minimal templates with only required fields:

### Minimal Space

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "bedroom"
buildingId: "BLD-01"
levelId: "LVL-01"
version: "1.0.0"
---

# Bedroom 01
```

### Minimal Zone

```yaml
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
version: "1.0.0"
---

# Fire Zone ZL-IV
```

### Minimal System

```yaml
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
systemName: "HVAC System 01"
systemCategory: "hvac"
buildingId: "BLD-01"
version: "1.0.0"
---

# HVAC System 01
```

### Minimal Asset

```yaml
---
documentType: "asset"
entityType: "asset"
id: "AST-AHU-01"
assetName: "Air Handling Unit 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
version: "1.0.0"
---

# Air Handling Unit 01
```

### Minimal Building

```yaml
---
documentType: "building"
entityType: "building"
id: "BLD-01"
buildingName: "My Building"
buildingType: "residential_multifamily"
country: "PL"
version: "1.0.0"
---

# My Building
```

### Minimal Level

```yaml
---
documentType: "level"
entityType: "level"
id: "LVL-01"
levelName: "Level 01"
buildingId: "BLD-01"
elevation: 0.0
elevationUnit: "m"
version: "1.0.0"
---

# Level 01
```

---

## Template Usage Tips

### 1. Start Minimal, Add Details Later

Begin with minimal template, compile to ensure structure is valid, then add optional fields:

```bash
# Step 1: Create minimal document
vim spaces/bedroom-01.md  # Use minimal template

# Step 2: Validate structure
node scripts/compiler/index.mjs compile --validate-only

# Step 3: Add optional fields
vim spaces/bedroom-01.md  # Add designArea, requirements, etc.
```

### 2. Copy Existing Documents

Fastest way to create similar documents:

```bash
# Copy bedroom-01 to bedroom-02
cp spaces/bedroom-01.md spaces/bedroom-02.md

# Edit IDs and names
sed -i 's/001/002/g' spaces/bedroom-02.md
sed -i 's/Bedroom 01/Bedroom 02/g' spaces/bedroom-02.md
```

### 3. Use Editor Snippets

Create snippets in VS Code for faster authoring:

```json
{
  "SBM Space Entity": {
    "prefix": "sbm-space",
    "body": [
      "---",
      "documentType: \"space\"",
      "entityType: \"space\"",
      "id: \"${1:SP-BLD-01-L01-001}\"",
      "spaceName: \"${2:Space Name}\"",
      "spaceType: \"${3:bedroom}\"",
      "buildingId: \"${4:BLD-01}\"",
      "levelId: \"${5:LVL-01}\"",
      "version: \"1.0.0\"",
      "---",
      "",
      "# ${2:Space Name}",
      ""
    ]
  }
}
```

---

## See Also

- **[Document Type Reference](/en/documentation/entities/)** - Complete field documentation
- **[Creating Documents](/en/documentation/authoring/creating-entities)** - Step-by-step guides
- **[Compiler Guide](/en/documentation/compiler/)** - Compiling your documents
