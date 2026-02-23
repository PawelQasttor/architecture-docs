# Creating Documents

This guide walks you through creating each type of SBM document with real-world examples.

## Creating a Building

The building document defines project-level metadata and regulatory jurisdiction.

### When to Create

- Start of every project
- One building per project (multi-building projects use multiple building documents)

### Step-by-Step

**1. Create file:** `building.md`

**2. Add metadata:**
```yaml
---
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"

buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"
country: "PL"  # ← Triggers jurisdiction pack loading

address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"

grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

version: "1.0.0"
---
```

**3. Compile and verify:**
```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

---

## Creating Levels

Levels organize spaces vertically and define **typical properties** that cascade to all spaces on that floor.

### When to Create

- After creating building
- One level per floor/storey

### Step-by-Step

**1. Create file:** `levels/level-01.md`

**2. Add level data with inheritable properties:**
```yaml
---
documentType: "level"
entityType: "level"
id: "LVL-01"

levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
levelNumber: 0

elevation: 0.0
elevationUnit: "m"

levelHeight: 3.20
levelHeightUnit: "m"

# Property Inheritance (v0.1.4) - Define once, inherit in all spaces
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Oak engineered 3-layer 15mm"
  walls: "Acrylic paint white RAL 9010"
  ceiling: "Acrylic paint white RAL 9010"
  baseboard: "MDF white baseboard 80mm"

typicalEnvironmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 0.5
    unit: "ACH"
  pressurization: "neutral"

levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
  - "REQ-LEVEL-FIRE-RATING"
  - "REQ-LEVEL-ACOUSTIC-B"

grossFloorArea: 1250
areaUnit: "m2"

version: "1.0.0"
---
```

**Important:**
- `elevation` is relative to building base point
- `levelHeight` is floor-to-floor height (not ceiling height)
- Level numbering: Ground = 0, Basement = -1, First floor = 1

**NEW in v0.1.4: Inheritable Properties**
- `typicalCeilingHeight` - All spaces on this level inherit this as `designHeight` (unless explicitly overridden)
- `typicalFinishes` - All spaces inherit these finishes (unless overridden via `finishOverrides`)
- `typicalEnvironmentalConditions` - All spaces inherit HVAC settings (unless explicitly specified)
- `levelRequirements` - Merged with space-specific requirements (not replaced)

**When to define typical properties:**
- ✅ **Yes, if 80%+ of rooms share the same value** (e.g., all bedrooms have 2.70m ceiling)
- ✅ **Yes, for standard residential/office floors** (consistent finishes across floor)
- ❌ **No, if every room is different** (mixed-use floors with varied ceiling heights)

---

## Creating Spaces

Spaces are rooms and functional areas. **Most properties inherit from the level** - only specify what's different.

### When to Create

- After creating levels
- One space per room/area

### Common Space Types

- **Residential:** `bedroom`, `living_room`, `kitchen`, `bathroom`
- **Commercial:** `office`, `meeting_room`, `break_room`
- **Circulation:** `corridor`, `staircase`, `elevator_lobby`
- **Support:** `storage`, `technical`

### Property Inheritance Pattern (v0.1.4)

::: tip Key Principle: Don't Repeat Yourself
If a property is the same for most rooms on the floor, define it **once at the level** - all spaces inherit automatically.
:::

**Decision Matrix:**

| Property | Define at Level? | Override in Space? |
|----------|-----------------|-------------------|
| Ceiling height (2.70m for all bedrooms) | ✅ Yes (`typicalCeilingHeight`) | Only if different (e.g., bathroom 2.40m) |
| Finishes (oak floor for all rooms) | ✅ Yes (`typicalFinishes`) | Only if different (e.g., bathroom tile) |
| Environmental (20-24°C residential) | ✅ Yes (`typicalEnvironmentalConditions`) | Only if different (e.g., server room) |
| Floor area | ❌ No | ✅ Always specify (unique per room) |
| Zone assignments | ❌ No | ✅ Specify per room (varies) |

### Step-by-Step Example: Bedroom (Using Inheritance)

**1. Create file:** `spaces/bedroom-01.md`

**2. Define space (only instance-specific data):**
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"

# Instance-specific spatial data
designArea: 14.5
# designHeight: 2.70  ← INHERITED from LVL-01.typicalCeilingHeight
# finishes ← INHERITED from LVL-01.typicalFinishes
# environmentalConditions ← INHERITED from LVL-01.typicalEnvironmentalConditions
designVolume: 39.15
unit: "m"

zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  # REQ-PL-WT-ROOM-HEIGHT-001 ← MERGED from LVL-01.levelRequirements

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Bedroom 01

Standard bedroom with north-facing window.

::: tip Inherits from Level
See `levels/level-01.md` for inherited ceiling height, finishes, environmental conditions, and base requirements.
:::

## Requirements
- Minimum daylight factor 2%
- Acoustic Class B insulation
- Room height ≥ 2.50 m (WT 2021 § 132)
```

**3. Compile to verify relationships:**
```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL
```

**4. Check that zone references resolved:**
```bash
cat build/my-project/sbm.json | jq '.entities.zones[] | select(.id == "ZONE-FIRE-ZL-IV") | .spaceIds'
```

Expected output:
```json
[
  "SP-BLD-01-L01-001"
]
```

---

### Override Example: Bathroom (Different Ceiling & Finishes)

When a space needs **different values** from the level defaults, use explicit properties or `finishOverrides`:

**1. Create file:** `spaces/bathroom-01.md`

**2. Override what's different:**
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"

spaceName: "Bathroom 01"
spaceType: "bathroom"
buildingId: "BLD-01"
levelId: "LVL-01"

designArea: 4.2
designHeight: 2.40  # ← OVERRIDE: Dropped ceiling (not 2.70m from level)

# Override finishes (bathroom needs tile, not oak from level)
finishOverrides:
  floor: "Ceramic tiles 30x60 non-slip"
  walls: "Ceramic tiles 30x60 glossy"
  # ceiling: white paint ← INHERITED from level
  # baseboard: MDF white ← INHERITED from level

# environmentalConditions ← INHERITED from level (20-24°C is fine)

version: "1.0.0"
---

# Bathroom 01

::: tip Inherits from Level (Partially)
See `levels/level-01.md` - inherits ceiling finish, environmental conditions.
Overrides: ceiling height (2.40m), floor/wall finishes (ceramic tile).
:::
```

**Result:**
- Ceiling height: 2.40m (overridden)
- Floor: Ceramic tile (overridden)
- Walls: Ceramic tile (overridden)
- Ceiling: White paint (inherited from level)
- Environmental: 20-24°C (inherited from level)

---

## Creating Zones

Zones group spaces by functional criteria (fire, HVAC, acoustic, security).

### When to Create

- After planning space layout
- Create zones before referencing them in spaces

### Common Zone Types

- **Fire zones:** `"fire"` - Fire compartments, smoke control
- **HVAC zones:** `"hvac"` - Thermal control areas
- **Acoustic zones:** `"acoustic"` - Sound insulation areas
- **Security zones:** `"security"` - Access control levels

### Step-by-Step Example: Fire Zone

**1. Create file:** `zones/fire-zone-zl-iv.md`

**2. Define zone:**
```yaml
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"

description: >
  Residential fire zone with low fire load (ZL-IV per WT 2021 § 234).
  Requires REI 60 walls and floors, EI 30 fire doors.

version: "1.0.0"
tags:
  - "fire_safety"
  - "residential"
---

# Fire Zone ZL-IV

Low fire load residential zone per WT 2021 requirements.

## Fire Safety Requirements
- **Fire resistance:** REI 60 for walls and floors
- **Door rating:** EI 30 for fire doors
- **Egress:** Maximum travel distance 40m
```

**Note:** The `spaceIds` field will be auto-computed when you compile.

---

## Creating Systems

Systems represent MEP systems (HVAC, electrical, plumbing).

### When to Create

- During design development (LOD 300)
- After defining zones (systems typically serve zones)

### Common System Categories

- `"hvac"` - Heating, ventilation, air conditioning
- `"electrical"` - Power distribution, lighting
- `"plumbing"` - Water supply, drainage
- `"fire_safety"` - Fire alarm, suppression

### Step-by-Step Example: HVAC System

**1. Create file:** `systems/sys-hvac-01.md`

**2. Define system:**
```yaml
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"

systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"
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

energySource: "electricity_heat_pump"

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
---

# HVAC System 01

VAV heat pump system serving north zone.

## System Components
- **AHU:** Rooftop air handling unit (AI-AHU-01)
- **VAV boxes:** 12 terminal units
- **Controls:** BACnet DDC via BMS
```

---

## Creating Asset Instance Documents

Asset instances are physical equipment with maintenance data.

### When to Create

- During construction documents (LOD 400)
- As equipment is specified/purchased

### Common Asset Types

- **HVAC:** `"ahu"`, `"vav_box"`, `"heat_pump"`, `"pump"`
- **Electrical:** `"transformer"`, `"panel_board"`, `"ups"`
- **Plumbing:** `"water_heater"`, `"pump"`
- **Fire:** `"fire_alarm_panel"`, `"smoke_detector"`

### Step-by-Step Example: Air Handling Unit

**1. Create file:** `assets/ai-ahu-01.md`

**2. Define asset:**
```yaml
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-AHU-01"

assetName: "Air Handling Unit 01"
assetType: "ahu"
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

maintenanceSchedule:
  tasks:
    - taskId: "MAINT-AHU-FILTER"
      taskName: "Replace air filters"
      frequency: "quarterly"
      estimatedDuration: 2
      durationUnit: "hours"

spareParts:
  - partName: "Air filter F7"
    partNumber: "SF-F7-600x600"
    quantity: 4
    reorderLevel: 2
    unitCost: 145
    currency: "PLN"

version: "1.0.0"
---

# Air Handling Unit 01

Rooftop AHU serving north zone HVAC system.

## Maintenance Schedule
### Quarterly
- Replace air filters

### Annual
- Full performance test
- Calibrate sensors
```

---

## Creating Requirements

Requirements define performance, regulatory, or design rules.

### When to Create

Most requirements come from jurisdiction packs (global + country-specific).

**Create custom requirements for:**
- Project-specific client requirements
- Special performance targets
- Custom design standards

### Requirement Types

- `"performance"` - Functional targets (daylight, thermal)
- `"dimensional"` - Size constraints (room height, corridor width)
- `"regulatory"` - Legal compliance (WT 2021, building codes)
- `"design"` - Design standards

### Step-by-Step Example: Custom Client Requirement

**1. Create file:** `requirements/req-client-ceiling-height-001.md`

**2. Define requirement:**
```yaml
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-CLIENT-CEILING-HEIGHT-001"

requirementName: "Client-specified office ceiling height"
requirementType: "dimensional"
countryScope: "project_specific"

scope:
  entityType: "space"
  spaceTypes: ["office", "meeting_room"]

metric: "room_height_clear"
operator: ">="
value: 3.00
unit: "m"

verification:
  method: "measurement"
  phase: ["as_built"]
  responsible: "contractor"

description: >
  Client requires 3.00m clear height for all office spaces
  (exceeds code minimum of 2.50m) to allow for exposed
  mechanical systems with dropped ceilings.

version: "1.0.0"
tags:
  - "dimensional"
  - "client_requirement"
---

# Client Requirement: Office Ceiling Height

Custom requirement exceeding building code minimum.

## Justification
Exposed mechanical systems require additional clearance
above dropped ceiling for maintenance access.
```

**3. Reference in spaces:**
```yaml
# office-01.md
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"  # Code minimum (2.50m)
  - "REQ-CLIENT-CEILING-HEIGHT-001"  # Client requirement (3.00m)
```

---

## Workflow: Building a Complete Project

### 1. Start with Building

```bash
# Create building entity
vim docs/en/examples/my-project/building.md
```

### 2. Add Levels

```bash
# Create levels
vim docs/en/examples/my-project/levels/level-01.md
vim docs/en/examples/my-project/levels/level-02.md
```

### 3. Plan Zones

```bash
# Create zones
vim docs/en/examples/my-project/zones/fire-zone-zl-iv.md
vim docs/en/examples/my-project/zones/hvac-zone-north.md
```

### 4. Create Spaces

```bash
# Create spaces with zone references
vim docs/en/examples/my-project/spaces/bedroom-01.md
vim docs/en/examples/my-project/spaces/living-room-01.md
```

### 5. Add Systems (Design Development)

```bash
# Create systems
vim docs/en/examples/my-project/systems/sys-hvac-01.md
```

### 6. Add Assets (Construction Docs)

```bash
# Create asset instances
vim docs/en/examples/my-project/assets/ai-ahu-01.md
```

### 7. Compile & Validate

```bash
# Full compilation
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose
```

### 8. Review Outputs

```bash
# Check compliance
cat build/my-project/compliance_report.json | jq '.summary'

# Check BIM mapping
cat build/my-project/bim_mapping.json | jq '.revitSharedParameters'

# Check asset register
cat build/my-project/asset_register.json | jq '.assetInventory | length'
```

---

## Tips for Efficient Authoring

### Use Templates

Copy templates from existing documents:

```bash
# Copy space template
cp docs/en/examples/green-terrace/spaces/bedroom-01.md \
   docs/en/examples/my-project/spaces/bedroom-02.md

# Edit copy
vim docs/en/examples/my-project/spaces/bedroom-02.md
```

### Validate Frequently

Run validation after creating each document:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

### Use Consistent IDs

Follow naming conventions:
- Spaces: `SP-{building}-{level}-{seq}`
- Zones: `ZONE-{type}-{descriptor}`
- Systems: `SYS-{category}-{seq}`
- Assets: `AI-{type}-{seq}`

### Version Control Integration

Commit documents to Git as you create them:

```bash
git add docs/en/examples/my-project/spaces/bedroom-01.md
git commit -m "Add bedroom 01 space document"
```

---

## See Also

- **[Document Templates](/en/documentation/authoring/templates)** - Copy-paste templates
- **[Document Type Reference](/en/documentation/entities/)** - Complete field documentation
- **[Compiler Guide](/en/documentation/compiler/)** - Compiling documents
