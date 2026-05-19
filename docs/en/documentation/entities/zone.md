# Zone (Grouping Rooms By Rules)

## What This Is

A **Zone** groups rooms that share a common characteristic. The most common example: a **fire zone** groups all rooms that share the same fire safety classification.

::: tip For Architects
**Problem:** The building inspector asks "Which rooms are in Fire Zone ZL-IV?"

**Old way:** Hunt through drawings, check room schedules, hope you didn't miss any.

**With zones:** Open `zones/fire-zone-zl-iv.md` — it automatically lists all rooms that reference it.

**One zone file = all rooms in that zone automatically tracked.**
:::

A **Zone** groups spaces by functional criteria (fire safety, HVAC, acoustic treatment, security access). Zones enable regulatory compliance tracking and building system design.

## Purpose

Zones define:
- Fire compartments (ZL-IV, smoke control areas)
- HVAC distribution zones (thermal control)
- Acoustic treatment zones (sound insulation requirements)
- Security access zones (access control levels)
- Maintenance zones (facilities management)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique zone identifier | `"ZONE-FIRE-ZL-IV"` |
| `entityType` | string | Must be `"zone"` | `"zone"` |
| `documentType` | string | Must be `"zone"` | `"zone"` |
| `zoneName` | string | Human-readable name | `"Fire Zone ZL-IV (Residential)"` |
| `zoneType` | string | Functional type (see enum below) | `"fire"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Zone identifier (e.g., `ZONE-FIRE-ZL-IV`)
- **zoneName**: What you call it ("Fire Zone ZL-IV", "HVAC Zone North")
- **zoneType**: Category — `fire`, `hvac`, `acoustic`, `security`, `maintenance`
- **buildingId**: Which building
- **version**: Track changes

**You only NEED these 5 fields.** The system automatically tracks which rooms are in this zone (you don't manually list them).
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `zoneTypeId` | string | Reference to zone_type for template properties |
| `levelIds` | array | Level IDs where this zone exists |
| `spaceIds` | array | Space IDs in this zone (auto-computed) |
| `requirements` | array | Requirement IDs applicable to this zone |
| `requirementOverrides` | array | Additional requirements beyond zone type |
| `properties` | object | Zone-specific properties (varies by zoneType) |
| `zoneClassification` | string | Regulatory classification (e.g., "ZL-IV") |
| `fireRating` | string | Fire resistance rating (e.g., "REI 60") |
| `hvacSystemId` | string | HVAC system serving this zone |
| `acousticClass` | string | Acoustic performance class (e.g., "Class B") |
| `securityLevel` | string | Access control level |
| `description` | string | Detailed description |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For fire zones (permit submission):**
- **zoneClassification** — e.g., "ZL-IV" (Polish fire classification)
- **fireRating** — e.g., "REI 60" (wall/floor fire resistance)
- **requirements** — Which fire safety regulations apply
- **levelIds** — Which floors this zone covers (e.g., [LVL-01, LVL-02, LVL-03])

**For HVAC zones (MEP coordination):**
- **hvacSystemId** — Which HVAC system serves this zone
- **levelIds** — Which floors
- **requirements** — Temperature/ventilation requirements

**For acoustic zones:**
- **acousticClass** — e.g., "Class B" (insulation requirement)
- **requirements** — Acoustic performance requirements

**Note:** `spaceIds` is **automatically computed**. You don't list rooms here — they list the zone, and the system tracks the reverse relationship. See [How Bidirectional References Work](#how-bidirectional-references-work) below.
:::

## How Bidirectional References Work

::: info Compiler Automation
You **never** manually populate `spaceIds` in zone files. The compiler automatically computes reverse relationships from forward references.
:::

### The Forward Reference (You Write This)

In each **Space** file, you declare which zones it belongs to:

```yaml
# spaces/bedroom-01.md
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"  # ← You write this
  - "ZONE-HVAC-NORTH"  # ← You write this
---
```

### The Reverse Reference (Compiler Computes)

When you compile, the compiler:

1. **Reads** all Space files
2. **Finds** all references to `"ZONE-FIRE-ZL-IV"`
3. **Populates** `spaceIds` in the Zone file automatically

**Compiled output:**

```json
{
  "id": "ZONE-FIRE-ZL-IV",
  "zoneName": "Fire Zone ZL-IV",
  "spaceIds": [
    "SP-BLD-01-L01-001",  // ← Compiler found this reference
    "SP-BLD-01-L01-002",  // ← Compiler found this reference
    "SP-BLD-01-L01-003"   // ← Compiler found this reference
  ]
}
```

### Why This Matters

**Without automatic reverse links:**
- You'd manually maintain both `Space.zoneIds` AND `Zone.spaceIds`
- Risk: Space says it's in Zone A, but Zone A doesn't list the space → data inconsistency
- Maintenance nightmare: Add a room → update 2 files, remove a room → update 2 files

**With automatic reverse links:**
- ✅ Write the link once (in Space)
- ✅ Compiler maintains consistency
- ✅ Impossible to have mismatched references

### How to Verify It Worked

#### Method 1: Check Compiler Output

```bash
npm run compile

# Look for zone summary:
# Zone ZONE-FIRE-ZL-IV: 12 spaces
```

#### Method 2: Read the Quality Report

```bash
npm run compile -- quality-report

# Output shows:
# Zone ZONE-FIRE-ZL-IV:
#   spaceIds: 12 items (auto-computed ✓)
```

#### Method 3: Inspect the JSON Output

```bash
cat output/compiled-project.json | jq '.zones[] | select(.id == "ZONE-FIRE-ZL-IV") | .spaceIds'

# Output:
# [
#   "SP-BLD-01-L01-001",
#   "SP-BLD-01-L01-002",
#   ...
# ]
```

### Troubleshooting: "My zone has no spaceIds"

**Problem:** You compiled, but `Zone.spaceIds` is empty.

**Checklist:**

1. ✅ **Do any spaces reference this zone?**
   ```bash
   grep -r "ZONE-FIRE-ZL-IV" spaces/
   ```
   If no results → no spaces reference this zone yet.

2. ✅ **Is the zone ID exactly correct?**
   - Space says: `"ZONE-FIRE-ZL-IV"`
   - Zone file ID must match exactly (case-sensitive, no spaces)
   - Common mistake: `ZONE-FIRE-ZL-4` vs `ZONE-FIRE-ZL-IV`

3. ✅ **Did you run the compiler?**
   ```bash
   npm run compile
   ```
   The reverse links are computed during compilation, not when you save files.

4. ✅ **Are there validation errors?**
   ```bash
   npm run compile -- validate
   ```
   If a space references a zone that doesn't exist, the compiler reports an error and skips populating `spaceIds`.

### Other Bidirectional Relationships

The same pattern applies to other entity relationships:

| Forward Reference | Reverse Reference | Auto-Computed |
|-------------------|-------------------|---------------|
| `Space.levelId` → Level | `Level.spaceIds` ← Space | ✅ Yes |
| `Space.buildingId` → Building | `Building.spaceIds` ← Space | ✅ Yes |
| `Asset.spaceId` → Space | `Space.assetIds` ← Asset | ✅ Yes |
| `System.parentSystemId` → System | `System.subsystemIds` ← System | ✅ Yes |
| `Space.zoneIds` → Zone | `Zone.spaceIds` ← Space | ✅ Yes |

::: tip Best Practice
Always write forward references (from child → parent or from member → container). The compiler handles reverse links. **Never** manually edit auto-computed fields.
:::

---

## Zone Types (Enum)

```typescript
type ZoneType =
  | "fire"                // Fire compartments, smoke control
  | "hvac"                // HVAC thermal zones
  | "acoustic"            // Acoustic treatment zones
  | "security"            // Access control zones
  | "maintenance"         // Facilities management zones
  | "lighting"            // Lighting control zones
  | "ventilation"         // Natural/mechanical ventilation zones
  | "plumbing"            // Plumbing risers and distribution
  | "electrical"          // Electrical distribution zones
  // v0.3.0 additions:
  | "medical_electrical"  // IEC 60364-7-710 medical electrical zones (Group 1/2)
  | "radiation_protection" // Radiological shielding zones (X-ray, CT, gamma)
  | "cleanroom"           // ISO 14644 cleanroom zones
  | "infection_control"   // Infection control zones (isolation, barrier nursing)
  | "pressure_cascade";   // Pressure cascade zones (clean→dirty gradient)
```

### Healthcare Zone Types (v0.3.0)

| Value | Purpose | Typical Properties |
|-------|---------|-------------------|
| `medical_electrical` | Electrical safety groupings per IEC 60364-7-710 | Safety group (0/1/2), IT power supply requirements |
| `radiation_protection` | Radiological protection zones | Shielding material, Pb equivalent, controlled area boundaries |
| `cleanroom` | ISO 14644 cleanroom classifications | ISO class, air changes, filtration, gowning requirements |
| `infection_control` | Infection prevention and control zones | Isolation type (airborne/contact/droplet), PPE requirements |
| `pressure_cascade` | Pressure relationships between connected spaces | Pressure differential (Pa), flow direction (clean-to-dirty) |

## Example 1: Your First Zone File (Minimal)

**The simplest fire zone for permit submission:**

::: code-group

```markdown [Markdown]
File: zones/fire-zone-zl-iv.md

---
id: "ZONE-FIRE-ZL-IV"
entityType: "zone"
documentType: "zone"
zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
version: "1.0.0"

# For permit compliance
zoneClassification: "ZL-IV"
fireRating: "REI 60"
levelIds:
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
---

# Fire Zone ZL-IV

Residential fire zone covering levels 1-3.
Fire resistance: REI 60 walls and floors.
Fire doors: EI 30.
```

```yaml [YAML]
id: "ZONE-FIRE-ZL-IV"
entityType: "zone"
documentType: "zone"
zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
version: "1.0.0"

# For permit compliance
zoneClassification: "ZL-IV"
fireRating: "REI 60"
levelIds:
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
```

```json [JSON]
{
  "id": "ZONE-FIRE-ZL-IV",
  "entityType": "zone",
  "documentType": "zone",
  "zoneName": "Fire Zone ZL-IV",
  "zoneCategory": "fire",
  "buildingId": "BLD-01",
  "version": "1.0.0",
  "zoneClassification": "ZL-IV",
  "fireRating": "REI 60",
  "levelIds": [
    "LVL-01",
    "LVL-02",
    "LVL-03"
  ]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "zoneName", "zoneCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ZONE-[A-Z0-9-]+$" },
    "entityType": { "const": "zone" },
    "zoneName": { "type": "string" },
    "zoneCategory": {
      "type": "string",
      "enum": ["fire", "hvac", "acoustic", "lighting", "security", "cleanroom", "electrical", "smoke"]
    },
    "zoneTypeId": { "type": "string" },
    "buildingId": { "type": "string" },
    "containedSpaceIds": { "type": "array", "items": { "type": "string" } },
    "requirements": { "type": "array", "items": { "type": "string" } },
    "version": { "type": "string" }
  }
}
```

:::

**That's it.** When rooms reference `ZONE-FIRE-ZL-IV`, they automatically appear in this zone's room list.

---

## Example 2: Complete Fire Zone (Full Details)

**File:** `docs/en/examples/green-terrace/zones/fire-zone-zl-iv.md`

::: code-group

```markdown [Markdown]
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-ZL-IV-001"

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

# Fire Zone: ZL-IV (Residential)

Low fire load residential zone per WT 2021 requirements.

## Fire Safety Requirements

- **Fire resistance:** REI 60 for walls and floors
- **Door rating:** EI 30 for fire doors
- **Smoke control:** Natural ventilation via windows
- **Egress:** Maximum travel distance 40m to protected stairwell

## Regulatory Basis

- **WT 2021 § 234:** Fire separation requirements
- **WT 2021 § 235:** Fire resistance of building elements
- **Prawo budowlane Art. 5:** Fire safety provisions

## Spaces in Zone

This zone contains all residential spaces on levels L00-L02:
- Bedrooms, living rooms, kitchens
- Excludes: stairwells (separate fire zone)
```

```yaml [YAML]
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-ZL-IV-001"

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
```

```json [JSON]
{
  "id": "ZONE-FIRE-ZL-IV",
  "entityType": "zone",
  "documentType": "zone",
  "projectPhase": "design_development",
  "bimLOD": "LOD_300",
  "zoneName": "Fire Zone ZL-IV (Residential)",
  "zoneCategory": "fire",
  "buildingId": "BLD-01",
  "zoneClassification": "ZL-IV",
  "fireRating": "REI 60",
  "requirements": [
    "REQ-PL-FIRE-SEPARATION-001",
    "REQ-FIRE-ZL-IV-001"
  ],
  "description": "Residential fire zone with low fire load (ZL-IV per WT 2021 § 234). Requires REI 60 walls and floors, EI 30 fire doors.",
  "ifcMapping": {
    "ifcEntity": "IfcZone",
    "globalId": "3P5hJ2$sNDxw4YzFv3MQyR",
    "objectType": "FireZone"
  },
  "version": "1.0.0",
  "tags": ["fire_safety", "residential", "zl_iv"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "zoneName", "zoneCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ZONE-[A-Z0-9-]+$" },
    "entityType": { "const": "zone" },
    "zoneName": { "type": "string" },
    "zoneCategory": {
      "type": "string",
      "enum": ["fire", "hvac", "acoustic", "lighting", "security", "cleanroom", "electrical", "smoke"]
    },
    "zoneTypeId": { "type": "string" },
    "buildingId": { "type": "string" },
    "containedSpaceIds": { "type": "array", "items": { "type": "string" } },
    "requirements": { "type": "array", "items": { "type": "string" } },
    "version": { "type": "string" }
  }
}
```

:::

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "zones": [
      {
        "documentType": "zone",
        "entityType": "zone",
        "id": "ZONE-FIRE-ZL-IV",
        "zoneName": "Fire Zone ZL-IV (Residential)",
        "zoneType": "fire",
        "buildingId": "BLD-01",
        "zoneClassification": "ZL-IV",
        "fireRating": "REI 60",
        "requirements": [
          "REQ-PL-FIRE-SEPARATION-001",
          "REQ-FIRE-ZL-IV-001"
        ],
        "description": "Residential fire zone with low fire load (ZL-IV per WT 2021 § 234). Requires REI 60 walls and floors, EI 30 fire doors.",
        "spaceIds": [
          "SP-BLD-01-L01-001",
          "SP-BLD-01-L01-002",
          "SP-BLD-01-L01-003",
          "SP-BLD-01-L02-001",
          "SP-BLD-01-L02-002"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcZone",
          "globalId": "3P5hJ2$sNDxw4YzFv3MQyR",
          "objectType": "FireZone"
        },
        "version": "1.0.0",
        "tags": ["fire_safety", "residential", "zl_iv"]
      }
    ]
  }
}
```

## Reverse Relationships

The compiler **auto-computes** `zone.spaceIds` from space references:

**Input:** Spaces reference zones
```yaml
# bedroom-01.md
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

# bedroom-02.md
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
```

**Output:** Zone automatically contains space list
```json
{
  "id": "ZONE-FIRE-ZL-IV",
  "spaceIds": [
    "SP-BLD-01-L01-001",  // bedroom-01
    "SP-BLD-01-L01-002"   // bedroom-02
  ]
}
```

**Why this matters:** Architects author space → zone relationships (natural workflow). Compiler computes zone → spaces automatically (for compliance reports).

## Type/Instance Pattern

Zones can reference **Zone Types** to inherit standard properties and requirements:

**Zone Type (Template):**
```yaml
# fire-zone-zl-iv-type.md
---
id: "ZT-FIRE-ZL-IV"
entityType: "zone_type"
typeName: "Fire Zone ZL-IV Standard"
zoneType: "fire"
requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-ZL-IV-001"
properties:
  fireResistance: "REI 60"
  maxEscapeDistance: 40.0
  smokeControlStrategy: "natural"
---
```

**Zone Instance (References Type):**

::: code-group

```markdown [Markdown]
# fire-zone-north.md
---
id: "ZONE-FIRE-NORTH"
entityType: "zone"
zoneName: "Fire Zone North Wing"
zoneTypeId: "ZT-FIRE-ZL-IV"  # Inherits requirements & properties
zoneType: "fire"
buildingId: "BLD-01"
levelIds: ["LVL-01", "LVL-02"]

# Instance-specific data
spaceIds: ["SP-001", "SP-002", "SP-003"]
---
```

```yaml [YAML]
id: "ZONE-FIRE-NORTH"
entityType: "zone"
zoneName: "Fire Zone North Wing"
zoneTypeId: "ZT-FIRE-ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"
  - "LVL-02"
spaceIds:
  - "SP-001"
  - "SP-002"
  - "SP-003"
```

```json [JSON]
{
  "id": "ZONE-FIRE-NORTH",
  "entityType": "zone",
  "zoneName": "Fire Zone North Wing",
  "zoneTypeId": "ZT-FIRE-ZL-IV",
  "zoneCategory": "fire",
  "buildingId": "BLD-01",
  "levelIds": ["LVL-01", "LVL-02"],
  "containedSpaceIds": ["SP-001", "SP-002", "SP-003"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "zoneName", "zoneCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ZONE-[A-Z0-9-]+$" },
    "entityType": { "const": "zone" },
    "zoneName": { "type": "string" },
    "zoneCategory": {
      "type": "string",
      "enum": ["fire", "hvac", "acoustic", "lighting", "security", "cleanroom", "electrical", "smoke"]
    },
    "zoneTypeId": { "type": "string" },
    "buildingId": { "type": "string" },
    "containedSpaceIds": { "type": "array", "items": { "type": "string" } },
    "requirements": { "type": "array", "items": { "type": "string" } },
    "version": { "type": "string" }
  }
}
```

:::

**Compiled Output:**
```json
{
  "id": "ZONE-FIRE-NORTH",
  "zoneName": "Fire Zone North Wing",
  "zoneType": "fire",
  "requirements": [
    "REQ-PL-FIRE-SEPARATION-001",  // From type
    "REQ-FIRE-ZL-IV-001"            // From type
  ],
  "properties": {
    "fireResistance": "REI 60",          // From type
    "maxEscapeDistance": 40.0,           // From type
    "smokeControlStrategy": "natural"    // From type
  },
  "levelIds": ["LVL-01", "LVL-02"]      // Instance-specific
}
```

**Benefits:**
- Define fire zone properties once (ZT-FIRE-ZL-IV)
- Reuse across multiple buildings or floors
- Update type → all instances inherit changes
- Reduce documentation by 20-60% for repeating zones

See [Zone Type](/en/documentation/entities/zone-type) for complete documentation.

## BIM Mapping

Zones map to **IfcZone** entities and Revit System Zones:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Zone.SBM_ID` |
| `zoneName` | `Name` | `Name` |
| `zoneType` | `SBM_Zone_Type` | `Pset_SBM_Zone.SBM_ZoneType` |
| `zoneClassification` | `SBM_Zone_Classification` | `Pset_SBM_Zone.Classification` |
| `fireRating` | `Fire Rating` | `Pset_FireProtectionCommon.FireRating` |
| `requirements` | `SBM_Requirements` | `Pset_SBM_Zone.SBM_Requirements` |
| `spaceIds` | `SBM_Space_IDs` | `Pset_SBM_Zone.SBM_SpaceIDs` |

## Zone Types by Discipline

### Fire Safety Zones
- **Purpose:** Fire compartments, smoke control
- **Requirements:** Fire resistance ratings, egress distances, smoke extraction
- **Standards:** WT 2021 § 234-235, Prawo budowlane Art. 5

### HVAC Zones
- **Purpose:** Thermal control areas
- **Requirements:** Temperature ranges, air change rates, humidity control
- **Standards:** EN 16798-1, WT 2021 § 328

### Acoustic Zones
- **Purpose:** Sound insulation areas
- **Requirements:** Airborne/impact sound insulation classes
- **Standards:** ISO 140-4, EN 12354-1

### Security Zones
- **Purpose:** Access control levels
- **Requirements:** Badge access, restricted entry, surveillance
- **Standards:** Project-specific security policies

## Compliance Checking

The compiler validates zones against assigned requirements:

```json
{
  "zoneComplianceDetails": [
    {
      "requirementId": "REQ-PL-FIRE-SEPARATION-001",
      "zoneId": "ZONE-FIRE-ZL-IV",
      "zoneName": "Fire Zone ZL-IV (Residential)",
      "metric": "fire_resistance_rating",
      "targetValue": "REI 60",
      "measuredValue": "REI 60",
      "operator": ">=",
      "status": "compliant"
    }
  ]
}
```

## Digital Twin Integration

Zones can aggregate sensor data from all contained spaces:

```json
{
  "zoneAggregations": [
    {
      "entityId": "ZONE-HVAC-NORTH",
      "entityName": "HVAC Zone North",
      "aggregatedMetrics": [
        {
          "metric": "average_temperature",
          "sourceSpaces": [
            "SP-BLD-01-L01-001",
            "SP-BLD-01-L01-002",
            "SP-BLD-01-L01-003"
          ],
          "aggregationMethod": "mean",
          "currentValue": 21.5,
          "threshold": { "min": 20, "max": 26 }
        },
        {
          "metric": "max_co2",
          "sourceSpaces": [
            "SP-BLD-01-L01-001",
            "SP-BLD-01-L01-002",
            "SP-BLD-01-L01-003"
          ],
          "aggregationMethod": "max",
          "currentValue": 850,
          "threshold": { "max": 1000 }
        }
      ]
    }
  ]
}
```

---

## Common Mistakes

::: danger ❌ Mistake #1: Manually Populating spaceIds
**Problem**: Trying to list spaces in the zone file

**Why it's bad**: `spaceIds` is auto-computed. Your manual list gets overwritten.

**Fix**: Spaces declare `zoneIds` → Compiler populates Zone's `spaceIds`
:::

::: danger ❌ Mistake #2: Zone ID Typo (Case-Sensitive)
**Problem**: Space references `"ZONE-FIRE-ZL-4"` but zone is `"ZONE-FIRE-ZL-IV"`

**Fix**: Match exactly (case-sensitive, Roman numerals)
:::

::: danger ❌ Mistake #3: Forgetting to Run Compiler
**Problem**: Zone's `spaceIds` is empty after adding space references

**Fix**: Run `npm run compile` to compute reverse relationships
:::

::: danger ❌ Mistake #4: Creating Unused Zones
**Problem**: Zone exists but no spaces reference it

**Fix**: Check `grep -r "ZONE-ID" spaces/` to verify references exist
:::

::: danger ❌ Mistake #5: Wrong zoneType Enum
**Problem**: Using `"fire-compartment"` instead of `"fire"`

**Fix**: Use exact enum values from [Zone Types](#zone-types-enum)
:::

---

## See Also

- **[Space](/en/documentation/entities/space)** - Spaces belong to zones
- **[Requirement](/en/documentation/entities/requirement)** - Define zone requirements
- **[Authoring Template](/en/documentation/authoring/)** - Zone Markdown template
