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

**Note:** `spaceIds` is **automatically computed**. You don't list rooms here — they list the zone, and the system tracks the reverse relationship.
:::

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

```markdown
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

**That's it.** When rooms reference `ZONE-FIRE-ZL-IV`, they automatically appear in this zone's room list.

---

## Example 2: Complete Fire Zone (Full Details)

**File:** `docs/en/examples/green-terrace/zones/fire-zone-zl-iv.md`

```markdown
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
```yaml
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

## See Also

- **[Space](/en/documentation/entities/space)** - Spaces belong to zones
- **[Requirement](/en/documentation/entities/requirement)** - Define zone requirements
- **[Authoring Template](/en/documentation/authoring/)** - Zone Markdown template
