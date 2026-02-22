# Frontmatter Schema Reference

The Semantic Building Model (SBM) uses **YAML frontmatter** at the top of every Markdown document. This frontmatter provides structured metadata that the SBM compiler validates, indexes, and compiles into the unified building model.

The canonical schema definition is maintained as a JSON Schema file:

**Schema file:** [`schemas/sbm-schema-v0.1.json`](/schemas/sbm-schema-v0.1.json)

---

## Common Fields

Every SBM document includes the following common frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier with a document-type prefix (e.g., `SP-001`, `ZONE-FIRE-01`) |
| `entityType` | `string` | Yes | One of: `building`, `level`, `zone`, `space`, `system`, `asset_instance`, `requirement` |
| `version` | `string` | Yes | Semantic version in `MAJOR.MINOR.PATCH` format (e.g., `1.0.0`) |
| `tags` | `string[]` | No | Freeform tags for categorisation and filtering |
| `ifcMapping` | `object` | No | IFC entity mapping (see [IFC Mapping](#ifc-mapping) below) |

### IFC Mapping

The `ifcMapping` object connects the document to BIM data:

```yaml
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "3cUkl32yn9qRSPvBJKz_12"
  objectType: "Office_TypeA"
```

| Sub-field | Type | Description |
|-----------|------|-------------|
| `ifcEntity` | `string` | IFC entity class (e.g., `IfcSpace`, `IfcZone`, `IfcSystem`) |
| `globalId` | `string` | IFC GlobalId for linking to a specific BIM object |
| `objectType` | `string` | IFC ObjectType classification |

---

## Document-Type-Specific Fields

### Building

Represents a top-level building within a project.

**ID pattern:** `BLD-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `BLD-MAIN` |
| `entityType` | `string` | Yes | Must be `"building"` |
| `name` | `string` | Yes | Human-readable building name |
| `siteId` | `string` | No | Reference to a site identifier |
| `usage` | `string` | No | Primary building usage (e.g., `"residential"`, `"office"`) |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Example:**

```yaml
---
id: "BLD-MAIN"
entityType: "building"
name: "Main Office Building"
siteId: "SITE-01"
usage: "office"
version: "1.0.0"
tags: ["office", "headquarters"]
---
```

---

### Level

Represents a floor or storey within a building.

**ID pattern:** `LVL-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `LVL-GF` |
| `entityType` | `string` | Yes | Must be `"level"` |
| `name` | `string` | Yes | Level name (e.g., `"Ground Floor"`) |
| `buildingId` | `string` | Yes | Reference to the parent building |
| `order` | `integer` | Yes | Sort order (0 = ground, -1 = basement, 1 = first floor, etc.) |
| `elevation` | `number` | No | Level elevation in project units |
| `height` | `number` | No | Floor-to-floor height |
| `unit` | `string` | No | Unit of measurement (e.g., `"mm"`) |
| `version` | `string` | Yes | Semantic version |

**Example:**

```yaml
---
id: "LVL-GF"
entityType: "level"
name: "Ground Floor"
buildingId: "BLD-MAIN"
order: 0
elevation: 0
height: 3500
unit: "mm"
version: "1.0.0"
---
```

---

### Space

Represents an individual room or area within a building.

**ID pattern:** `SP-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `SP-101` |
| `entityType` | `string` | Yes | Must be `"space"` |
| `spaceName` | `string` | Yes | Room or space name |
| `spaceType` | `string` | Yes | Type classification (see allowed values below) |
| `buildingId` | `string` | Yes | Parent building reference |
| `levelId` | `string` | Yes | Parent level reference |
| `zoneIds` | `string[]` | No | Zones this space belongs to |
| `designArea` | `number` | No | Design area (minimum 0) |
| `designHeight` | `number` | No | Design ceiling height (minimum 0) |
| `designVolume` | `number` | No | Design volume (minimum 0) |
| `unit` | `string` | No | Unit of measurement |
| `requirements` | `string[]` | No | Requirement IDs that apply to this space |
| `occupancy` | `object` | No | Occupancy details (see below) |
| `maintenanceZone` | `string` | No | Maintenance zone assignment |
| `accessRestrictions` | `string` | No | Access restriction description |
| `adjacentSpaces` | `object[]` | No | Adjacent space relationships |
| `ifcMapping` | `object` | No | IFC mapping |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Allowed `spaceType` values:** `sleeping_space`, `bedroom`, `living_space`, `living_room`, `dining_space`, `dining_room`, `kitchen`, `bathroom`, `wet_room`, `corridor`, `staircase`, `storage`, `technical`, `office`, `meeting_room`, `open_office`, `break_room`, `elevator_lobby`, `entrance`, `classroom`, `retail`, `healthcare`, `assembly`

**Occupancy object:**

| Sub-field | Type | Description |
|-----------|------|-------------|
| `maxOccupants` | `integer` | Maximum number of occupants |
| `usagePattern` | `string` | Description of usage pattern |
| `hoursPerDay` | `number` | Operating hours (0--24) |
| `daysPerWeek` | `integer` | Operating days (0--7) |

**Example:**

```yaml
---
id: "SP-101"
entityType: "space"
spaceName: "Open Plan Office"
spaceType: "open_office"
buildingId: "BLD-MAIN"
levelId: "LVL-01"
zoneIds: ["ZONE-HVAC-01", "ZONE-FIRE-01"]
designArea: 120.5
designHeight: 2800
unit: "mm"
requirements: ["REQ-TEMP-01", "REQ-LIGHT-01"]
occupancy:
  maxOccupants: 25
  usagePattern: "standard_office"
  hoursPerDay: 10
  daysPerWeek: 5
ifcMapping:
  ifcEntity: "IfcSpace"
  objectType: "OpenOffice_TypeA"
version: "1.0.0"
tags: ["office", "open-plan"]
---
```

**Template:** [Space template](/en/templates/space-template) | **Docs:** [Space document type](/en/documentation/entities/space)

---

### Zone

Represents a grouping of spaces by function (fire, acoustic, HVAC, etc.).

**ID pattern:** `ZONE-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `ZONE-FIRE-01` |
| `entityType` | `string` | Yes | Must be `"zone"` |
| `zoneName` | `string` | Yes | Zone name |
| `zoneType` | `string` | Yes | Zone classification (see allowed values below) |
| `buildingId` | `string` | Yes | Parent building reference |
| `levelIds` | `string[]` | No | Levels this zone spans |
| `spaceIds` | `string[]` | No | Spaces contained in this zone |
| `requirements` | `string[]` | No | Requirement IDs that apply |
| `properties` | `object` | No | Freeform zone-specific properties |
| `ifcMapping` | `object` | No | IFC mapping |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Allowed `zoneType` values:** `fire`, `acoustic`, `hvac`, `security`, `lighting`, `thermal`, `access_control`

**Example:**

```yaml
---
id: "ZONE-FIRE-01"
entityType: "zone"
zoneName: "Fire Zone A - Ground Floor"
zoneType: "fire"
buildingId: "BLD-MAIN"
levelIds: ["LVL-GF"]
spaceIds: ["SP-001", "SP-002", "SP-003"]
requirements: ["REQ-FIRE-01"]
properties:
  fireRating: "REI 60"
  maxArea: 2500
ifcMapping:
  ifcEntity: "IfcZone"
version: "1.0.0"
tags: ["fire-safety", "ground-floor"]
---
```

**Template:** [Zone template](/en/templates/zone-template) | **Docs:** [Zone document type](/en/documentation/entities/zone)

---

### System

Represents a building system (HVAC, electrical, plumbing, etc.).

**ID pattern:** `SYS-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `SYS-HVAC-01` |
| `entityType` | `string` | Yes | Must be `"system"` |
| `systemName` | `string` | Yes | System name |
| `systemType` | `string` | Yes | Specific system type |
| `systemCategory` | `string` | Yes | Category (see allowed values below) |
| `buildingId` | `string` | Yes | Parent building reference |
| `servedZoneIds` | `string[]` | No | Zones this system serves |
| `servedSpaceIds` | `string[]` | No | Spaces this system serves |
| `assetInstanceIds` | `string[]` | No | Assets that belong to this system |
| `requirements` | `string[]` | No | Requirement IDs that apply |
| `performance` | `object` | No | Freeform performance data |
| `ifcMapping` | `object` | No | IFC mapping |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Allowed `systemCategory` values:** `hvac`, `electrical`, `plumbing`, `fire_safety`, `security`, `communication`, `bms`, `renewable_energy`

**Example:**

```yaml
---
id: "SYS-HVAC-01"
entityType: "system"
systemName: "Central Air Handling Unit 1"
systemType: "air_handling_unit"
systemCategory: "hvac"
buildingId: "BLD-MAIN"
servedZoneIds: ["ZONE-HVAC-01"]
servedSpaceIds: ["SP-101", "SP-102", "SP-103"]
assetInstanceIds: ["AI-AHU-01", "AI-FILTER-01"]
requirements: ["REQ-TEMP-01", "REQ-VENT-01"]
performance:
  airflowRate: 5000
  airflowUnit: "m3/h"
  coolingCapacity: 50
  coolingUnit: "kW"
ifcMapping:
  ifcEntity: "IfcSystem"
  objectType: "AHU_TypeA"
version: "1.0.0"
tags: ["hvac", "ahu", "central"]
---
```

**Template:** [System template](/en/templates/system-template) | **Docs:** [System document type](/en/documentation/entities/system)

---

### Asset Instance

Represents an individual installed component or piece of equipment.

**ID pattern:** `AI-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `AI-AHU-01` |
| `entityType` | `string` | Yes | Must be `"asset_instance"` |
| `assetName` | `string` | Yes | Asset name |
| `assetTypeId` | `string` | No | Reference to an asset type catalogue entry |
| `systemId` | `string` | Yes | Parent system reference |
| `buildingId` | `string` | Yes | Parent building reference |
| `locatedInSpaceId` | `string` | No | Space where the asset is physically located |
| `identifiers` | `object` | No | Tag, serial number, barcode |
| `manufacturer` | `string` | No | Manufacturer name |
| `model` | `string` | No | Product model |
| `productCode` | `string` | No | Manufacturer product code |
| `maintenanceData` | `object` | No | Service intervals, lifetime, warranty, spare parts |
| `requirements` | `string[]` | No | Requirement IDs that apply |
| `ifcMapping` | `object` | No | IFC mapping |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Identifiers object:**

| Sub-field | Type | Description |
|-----------|------|-------------|
| `tag` | `string` | Equipment tag (e.g., `AHU-01`) |
| `serial` | `string` | Serial number |
| `barcode` | `string` | Barcode or QR code value |

**Maintenance data object:**

| Sub-field | Type | Description |
|-----------|------|-------------|
| `serviceIntervalMonths` | `integer` | Service interval in months |
| `expectedLifetimeYears` | `integer` | Expected operational lifetime |
| `warrantyYears` | `integer` | Warranty period in years |
| `sparePartsRequired` | `string[]` | List of required spare parts |

**Example:**

```yaml
---
id: "AI-AHU-01"
entityType: "asset_instance"
assetName: "Air Handling Unit - Main"
assetTypeId: "ATYPE-AHU-DAIKIN-D-AHU"
systemId: "SYS-HVAC-01"
buildingId: "BLD-MAIN"
locatedInSpaceId: "SP-TECH-01"
identifiers:
  tag: "AHU-01"
  serial: "DK-2026-00142"
  barcode: "4901234567890"
manufacturer: "Daikin"
model: "D-AHU P500"
productCode: "DAHU-P500-EU"
maintenanceData:
  serviceIntervalMonths: 6
  expectedLifetimeYears: 20
  warrantyYears: 5
  sparePartsRequired: ["filter_F7", "belt_V_A68"]
ifcMapping:
  ifcEntity: "IfcUnitaryEquipment"
  objectType: "AHU_Daikin_P500"
version: "1.0.0"
tags: ["hvac", "ahu", "daikin"]
---
```

**Template:** [Asset template](/en/templates/asset-template) | **Docs:** [Asset Instance](/en/documentation/entities/asset-instance)

---

### Requirement

Represents a performance, dimensional, regulatory, or safety requirement.

**ID pattern:** `REQ-[A-Z0-9-]+`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | e.g., `REQ-TEMP-01` |
| `entityType` | `string` | Yes | Must be `"requirement"` |
| `requirementName` | `string` | Yes | Human-readable requirement name |
| `requirementType` | `string` | Yes | Classification (see allowed values below) |
| `countryScope` | `string` | Yes | Geographic applicability (see allowed values below) |
| `scope` | `object` | Yes | What this requirement applies to |
| `metric` | `string` | Yes | The measured quantity (e.g., `"indoor_temperature"`) |
| `operator` | `string` | Yes | Comparison operator |
| `value` | `number / string / boolean / object` | Yes | Target value or range |
| `unit` | `string` | No | Unit of measurement |
| `tolerance` | `number` | No | Acceptable tolerance |
| `verification` | `object` | Yes | How to verify compliance |
| `legalBasis` | `object[]` | No | References to laws and regulations |
| `technicalBasis` | `object[]` | No | References to technical standards |
| `version` | `string` | Yes | Semantic version |
| `tags` | `string[]` | No | Tags |

**Allowed `requirementType` values:** `performance`, `dimensional`, `operational`, `regulatory`, `safety`, `functional`

**Allowed `countryScope` values:** `global`, `poland_specific`, `eu_specific`

**Allowed `operator` values:** `>=`, `<=`, `==`, `>`, `<`, `!=`, `in_range`

**Scope object:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `entityType` | `string` | Yes | Document type the requirement applies to |
| `spaceTypes` | `string[]` | No | Applicable space types |
| `spaceIds` | `string[]` | No | Specific space IDs |

**Verification object:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | `string` | Yes | One of: `simulation`, `calculation`, `measurement`, `inspection`, `testing`, `certification`, `sensor` |
| `tool` | `string` | No | Verification tool or software |
| `standard` | `string` | No | Reference standard |
| `phase` | `string[]` | Yes | Project phases: `concept`, `schematic`, `design_development`, `construction_documentation`, `construction`, `as_built`, `operation` |
| `frequency` | `string` | No | Verification frequency (e.g., `"annual"`) |
| `responsible` | `string` | No | Responsible party |

**Example:**

```yaml
---
id: "REQ-TEMP-01"
entityType: "requirement"
requirementName: "Office Indoor Temperature Range"
requirementType: "performance"
countryScope: "eu_specific"
scope:
  entityType: "space"
  spaceTypes: ["office", "open_office", "meeting_room"]
metric: "indoor_temperature"
operator: "in_range"
value:
  min: 20
  max: 26
unit: "C"
tolerance: 1.0
verification:
  method: "sensor"
  tool: "BMS temperature sensors"
  standard: "PN-EN 16798-1"
  phase: ["design_development", "as_built", "operation"]
  frequency: "continuous"
  responsible: "facilities_manager"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 134"
    description: "Thermal conditions in buildings"
technicalBasis:
  - standard: "PN-EN 16798-1"
    section: "Table NA.2"
    description: "Indoor environmental input parameters"
version: "1.0.0"
tags: ["thermal", "comfort", "office"]
---
```

**Template:** [Requirement template](/en/templates/requirement-template) | **Docs:** [Requirement document type](/en/documentation/entities/requirement)

---

## Validation

The SBM compiler validates every document's frontmatter against the JSON schema before compilation. Common validation checks include:

- **ID format** -- Each document type has a required pattern (e.g., `SP-` prefix for spaces)
- **Required fields** -- Missing required fields cause a compilation error
- **Reference integrity** -- `buildingId`, `levelId`, `systemId`, and other references must point to existing documents
- **Enum values** -- Fields like `spaceType`, `zoneType`, `systemCategory`, and `operator` must use allowed values
- **Version format** -- Must match the `MAJOR.MINOR.PATCH` pattern

For details on running the compiler, see [Compiler Getting Started](/en/documentation/compiler/getting-started).

---

## Further Reading

- [SBM Documentation Overview](/en/documentation/overview) -- Introduction to the Semantic Building Model
- [Document Type Reference](/en/documentation/entities/) -- Detailed documentation for each document type
- [Authoring Guide](/en/documentation/authoring/) -- How to create and manage SBM documents
- [Templates](/en/templates/) -- Ready-made templates for each document type
