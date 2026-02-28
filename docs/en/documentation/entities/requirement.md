# Requirement (Rules & Regulations)

## What This Is

A **Requirement** file documents one rule that your building must follow. Examples: "Bedroom ceiling height must be >= 2.50m" (WT 2021), "Living room needs minimum 2% daylight factor" (EN 17037).

::: tip For Architects
**Problem:** Inspector asks "Does this bedroom meet WT 2021 §132 height requirement?"

**Old way:** Hunt through specifications, hope you documented it, manually check if 2.70m >= 2.50m.

**With requirements:** The system automatically checks every bedroom against `REQ-PL-WT-ROOM-HEIGHT-001` and tells you pass/fail. **No manual checking.**

**One requirement file = automatic compliance checking for every relevant room.**
:::

A **Requirement** defines a performance, regulatory, or design rule that documents must satisfy. Requirements drive compliance checking, verification planning, and digital twin runtime monitoring.

## Purpose

Requirements specify:
- Performance targets (daylight factor, thermal comfort, acoustic insulation)
- Regulatory compliance (WT 2021, Prawo budowlane, EN standards)
- Dimensional constraints (room heights, corridor widths)
- System performance (ventilation rates, fire resistance)
- Verification methods and responsibilities

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique requirement identifier | `"REQ-DAYLIGHT-SLEEPING-001"` |
| `entityType` | string | Must be `"requirement"` | `"requirement"` |
| `documentType` | string | Must be `"requirement"` | `"requirement"` |
| `requirementName` | string | Human-readable name | `"Minimum daylight factor for sleeping spaces"` |
| `requirementType` | string | Type (see enum below) | `"performance"` |
| `version` | string | Semantic version | `"1.0.0"` |

### Conditional Fields (Numeric Requirements)

These fields are **required for numeric requirements** but **optional since v0.3.0** (not needed for qualitative requirements):

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `metric` | string | Measurable metric | `"daylight_factor"` |
| `operator` | string | Comparison operator | `">="`, `"<="`, `"=="`, `"range"` |
| `value` | number/object | Target value or range | `2.0` or `{ "min": 20, "max": 26 }` |
| `unit` | string | Measurement unit | `"%"`, `"m"`, `"dB"`, `"°C"` |

### Qualitative Requirement Fields (v0.3.0)

For non-numeric requirements (e.g., procedural rules, separation concepts), use these instead of metric/operator/value:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `qualitativeDescription` | string | Plain-text description of the requirement | `"Clean and dirty flows must not cross"` |
| `acceptanceCriteria` | array of strings | Specific criteria that must be met | `["Separate corridors for clean/dirty", ...]` |
| `evidenceRequired` | array of strings | Evidence needed for verification | `["Floor plan with flow arrows", ...]` |

::: tip For Architects: What These Required Fields Mean
- **id**: Requirement identifier (e.g., `REQ-PL-WT-ROOM-HEIGHT-001`)
- **requirementName**: Plain English description ("Minimum room height per WT 2021")
- **requirementType**: Category -- `performance`, `dimensional`, `regulatory`, `safety`, `qualitative` (new in v0.3.0)
- **metric**: What you're measuring (e.g., `height`, `daylight_factor`, `fire_resistance`). **Optional since v0.3.0** -- omit for qualitative requirements.
- **operator**: How to compare -- `>=` (greater than or equal), `<=` (less than or equal), `==` (equals), `range` (between min and max). **Optional since v0.3.0**.
- **value**: Target value (e.g., `2.5` for 2.50m) or range (e.g., `{min: 20, max: 26}` for temperature). **Optional since v0.3.0**.
- **unit**: What unit (e.g., `"m"` for meters, `"%"` for percentage, `"°C"` for Celsius). **Optional since v0.3.0**.

**Example (numeric):** Room height >= 2.50m becomes:
```yaml
metric: "height"
operator: ">="
value: 2.5
unit: "m"
```

**Example (qualitative):** Clean/dirty separation becomes:
```yaml
requirementType: "qualitative"
qualitativeDescription: "Clean and dirty material flows must not cross"
acceptanceCriteria:
  - "Separate corridors for clean and dirty transport"
  - "Airlock between clean and dirty zones"
evidenceRequired:
  - "Floor plan with clean/dirty flow arrows"
  - "Operational procedure document"
```
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `countryScope` | string | "global" or "poland_specific", etc. |
| `scope` | object | Applicability scope (document types, space types) |
| `verification` | object | Verification method, tools, phase, responsible party |
| `legalBasis` | array | Legal references (regulation, section, article) |
| `technicalBasis` | array | Technical standard references (EN, ISO, ASHRAE) |
| `description` | string | Detailed explanation |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For permit compliance:**
- **legalBasis** — Which law/regulation (e.g., WT 2021 §132, Prawo Budowlane Art. 5)
- **scope** — Which rooms this applies to (e.g., only bedrooms, only residential spaces)
- **description** — Plain explanation for inspectors

**For design verification:**
- **verification** — How to check this (simulation, calculation, inspection)
- **technicalBasis** — Which technical standard (e.g., EN 17037, ISO 140-4)

**For compliance reports:**
- **countryScope** — "poland_specific" (loads only for Polish projects) or "global" (always loads)

**Most common:** Just add `legalBasis` and `scope`. The system handles the rest.
:::

## Requirement Types (Enum)

```typescript
type RequirementType =
  | "performance"     // Functional performance targets
  | "dimensional"     // Size, height, width constraints
  | "regulatory"      // Legal compliance requirements
  | "design"          // Design standards and guidelines
  | "operational"     // Runtime operational requirements
  | "safety"          // Health and safety requirements
  | "sustainability"  // Environmental performance targets
  | "qualitative";    // Non-numeric, descriptive requirements (v0.3.0)
```

## Example: Qualitative Requirement (v0.3.0)

**For requirements that cannot be expressed as metric >= value**, use the qualitative type. This is common in healthcare (clean/dirty separation), infection control, and operational procedures.

```yaml
---
id: "REQ-HC-CLEAN-DIRTY-SEPARATION-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Clean/dirty flow separation in CSSD"
requirementType: "qualitative"

# No metric, operator, or value needed!
qualitativeDescription: >
  Clean and dirty material flows within the Central Sterile Supply Department
  must be physically separated to prevent cross-contamination. One-way workflow
  from dirty reception through decontamination to clean packing and sterile storage.

acceptanceCriteria:
  - "Separate corridors for clean and dirty transport"
  - "Physical barrier (wall with pass-through hatch) between dirty and clean zones"
  - "Airlock or anteroom between decontamination and clean packing"
  - "One-way workflow with no backtracking of dirty instruments through clean areas"
  - "Separate staff changing areas for dirty and clean zones"

evidenceRequired:
  - "Floor plan with clean/dirty flow arrows and zone boundaries"
  - "Operational workflow procedure document"
  - "Infection control officer sign-off"

scope:
  entityType: "space"
  spaceTypes: ["sterilization"]

legalBasis:
  - regulation: "EN ISO 17665-1"
    section: "4.3"
    description: "Sterilization workflow requirements"

version: "1.0.0"
tags: ["healthcare", "infection-control", "cssd", "qualitative"]
---

# Requirement: Clean/Dirty Flow Separation in CSSD

Clean and dirty material flows must be physically separated.
```

**Key difference from numeric requirements:**
- No `metric`, `operator`, `value`, or `unit` fields
- Uses `qualitativeDescription` for the rule text
- Uses `acceptanceCriteria` as a checklist of conditions to verify
- Uses `evidenceRequired` to specify what documentation proves compliance

---

## Example 1: Simple Requirement (Minimal)

**The simplest requirement -- room height minimum:**

```yaml
File: requirements/pl/room-height-min.json

{
  "id": "REQ-PL-WT-ROOM-HEIGHT-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimum room height per WT 2021",
  "requirementType": "dimensional",

  "metric": "height",
  "operator": ">=",
  "value": 2.5,
  "unit": "m",

  "legalBasis": [
    {
      "regulation": "WT_2021",
      "section": "§ 132",
      "article": "Minimum room height"
    }
  ],

  "version": "1.0.0"
}
```

**What this does:**
- Every room that references `REQ-PL-WT-ROOM-HEIGHT-001` is automatically checked
- If room height < 2.5m → **FAIL**
- If room height >= 2.5m → **PASS**
- Compliance report generated automatically

---

## Example 2: Global Requirement (With Technical Standards)

**File:** `scripts/requirements/global/req-daylight-sleeping-001.json`

```json
{
  "id": "REQ-DAYLIGHT-SLEEPING-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimum daylight factor for sleeping spaces",
  "requirementType": "performance",
  "countryScope": "global",

  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom"]
  },

  "metric": "daylight_factor",
  "operator": ">=",
  "value": 2.0,
  "unit": "%",

  "verification": {
    "method": "simulation",
    "tool": "DIVA, Ladybug, Radiance",
    "standard": "EN_17037",
    "phase": ["schematic", "design_development"],
    "responsible": "lighting_designer"
  },

  "technicalBasis": [
    {
      "standard": "EN_17037:2018",
      "section": "5.2",
      "description": "Daylight in Buildings - Minimum recommendation",
      "url": "https://standards.cen.eu"
    },
    {
      "standard": "BREEAM_HEA_01",
      "section": "Daylighting",
      "description": "2% average daylight factor for living spaces"
    },
    {
      "standard": "WELL_L03",
      "section": "Circadian Lighting Design",
      "description": "Daylight access for sleep-wake cycle regulation"
    }
  ],

  "description": "Sleeping spaces require minimum 2% daylight factor to support circadian rhythm regulation and visual comfort. Verified through simulation at design stage.",

  "version": "1.0.0",
  "tags": ["daylight", "performance", "global", "circadian_health"]
}
```

## Example: Poland-Specific Requirement

**File:** `scripts/requirements/pl/req-pl-wt-room-height-001.json`

```json
{
  "id": "REQ-PL-WT-ROOM-HEIGHT-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimum room height per WT 2021",
  "requirementType": "dimensional",
  "countryScope": "poland_specific",

  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom", "living_space", "living_room", "kitchen"]
  },

  "metric": "room_height_clear",
  "operator": ">=",
  "value": 2.50,
  "unit": "m",

  "verification": {
    "method": "measurement",
    "tool": "Laser distance meter",
    "standard": "WT_2021",
    "phase": ["design_development", "as_built"],
    "responsible": "architect"
  },

  "legalBasis": [
    {
      "regulation": "WT_2021",
      "section": "§ 132",
      "article": "ust. 1",
      "description": "Wysokość pomieszczeń mieszkalnych",
      "fullText": "Wysokość pomieszczeń w budynkach mieszkalnych, mierzona od podłogi do najniższego elementu stropu lub konstrukcji dachu, nie może być mniejsza niż 2,50 m",
      "effectiveDate": "2021-09-20"
    },
    {
      "regulation": "Prawo_budowlane",
      "section": "Art. 7",
      "article": "ust. 1 pkt 1",
      "description": "Wymagania podstawowe dotyczące obiektów budowlanych"
    }
  ],

  "technicalBasis": [
    {
      "standard": "EN_16798-1",
      "section": "6.4",
      "description": "Room height for adequate air quality and thermal comfort"
    }
  ],

  "description": "Residential rooms (bedrooms, living rooms, kitchens) must have clear height ≥ 2.50 m per WT 2021 § 132. Measured from floor to lowest ceiling or roof structure element.",

  "version": "1.0.0",
  "tags": ["dimensional", "poland", "wt_2021", "regulatory"]
}
```

## Scope Definition

Requirements use `scope` to define applicability:

```json
{
  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom"],
    "conditions": {
      "buildingType": "residential",
      "occupancyCategory": "R-2"
    }
  }
}
```

**Scope matching logic:**
- `entityType`: Which document type this requirement applies to
- `spaceTypes`: Specific space types (for space requirements)
- `zoneTypes`: Specific zone types (for zone requirements)
- `conditions`: Additional filters (building type, occupancy, etc.)

## Verification Methods

Requirements specify how to verify compliance:

| Method | Description | Typical Phase | Example |
|--------|-------------|---------------|---------|
| `simulation` | Computational analysis | Schematic, DD | Daylight simulation |
| `calculation` | Formula-based computation | DD, CD | U-value calculation |
| `measurement` | Physical measurement | As-built, operation | Room height measurement |
| `testing` | Laboratory/field testing | Construction | Acoustic testing |
| `certification` | Third-party certification | Construction | Fire door certification |
| `inspection` | Visual inspection | As-built | Installation verification |
| `monitoring` | Continuous sensor data | Operation | Temperature monitoring |

## Operators and Values

### Simple Comparison

```json
{
  "metric": "room_height_clear",
  "operator": ">=",
  "value": 2.50,
  "unit": "m"
}
```

### Range

```json
{
  "metric": "operative_temperature",
  "operator": "range",
  "value": { "min": 20, "max": 26 },
  "unit": "°C"
}
```

### Equality

```json
{
  "metric": "fire_resistance_rating",
  "operator": "==",
  "value": "REI 60",
  "unit": null
}
```

## Compliance Checking

The compiler evaluates requirements against documents:

```json
{
  "spaceComplianceDetails": [
    {
      "requirementId": "REQ-PL-WT-ROOM-HEIGHT-001",
      "spaceId": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "metric": "room_height_clear",
      "targetValue": 2.50,
      "measuredValue": 2.70,
      "operator": ">=",
      "status": "compliant",
      "margin": 0.20,
      "unit": "m"
    },
    {
      "requirementId": "REQ-DAYLIGHT-SLEEPING-001",
      "spaceId": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "metric": "daylight_factor",
      "targetValue": 2.0,
      "measuredValue": null,
      "operator": ">=",
      "status": "pending_verification",
      "verificationMethod": "simulation",
      "unit": "%"
    }
  ]
}
```

## Jurisdiction Packs

Requirements are organized into jurisdiction packs:

```
scripts/requirements/
├── global/                    # International standards (always loaded)
│   ├── req-daylight-sleeping-001.json
│   ├── req-acoustic-sleeping-001.json
│   ├── req-thermal-comfort-001.json
│   └── req-ventilation-occupied-001.json
│
├── pl/                        # Poland-specific (loaded when country = "PL")
│   ├── req-pl-wt-room-height-001.json
│   ├── req-pl-wt-corridor-width-001.json
│   ├── req-pl-fire-separation-001.json
│   └── req-pl-thermal-walls-001.json
│
├── de/                        # Germany (future)
│   └── req-de-enev-...json
│
└── gb/                        # UK (future)
    └── req-gb-building-regs-...json
```

**Auto-loading logic:**
```javascript
// Global requirements always loaded
const globalReqs = await loadRequirements('global');

// Country-specific requirements loaded based on project.country
if (project.country === 'PL') {
  const plReqs = await loadRequirements('pl');
  allRequirements = [...globalReqs, ...plReqs];
}
```

## Compliance Report Integration

Requirements populate the compliance report with regulatory sections:

```json
{
  "polandSpecificCompliance": {
    "regulation": "WT_2021",
    "sections": [
      {
        "section": "§ 132",
        "description": "Wysokość pomieszczeń",
        "requirements": [
          {
            "id": "REQ-PL-WT-ROOM-HEIGHT-001",
            "status": "verified",
            "affectedSpaces": 54,
            "verifiedSpaces": 54,
            "failedSpaces": 0
          }
        ],
        "status": "compliant"
      }
    ]
  }
}
```

## Digital Twin Runtime Evaluation

Requirements with `monitoring` verification generate runtime rules:

```json
{
  "runtimeEvaluationRules": [
    {
      "requirementId": "REQ-THERMAL-COMFORT-001",
      "metric": "operative_temperature",
      "operator": "range",
      "targetRange": { "min": 20, "max": 26 },
      "unit": "°C",
      "evaluationFrequency": "5min",
      "applicableSpaces": [
        {
          "spaceId": "SP-BLD-01-L01-001",
          "sensorId": "TEMP-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP"
        }
      ],
      "alertThresholds": {
        "warning": { "min": 18, "max": 28 },
        "critical": { "min": 16, "max": 30 }
      }
    }
  ]
}
```

## Requirement Sources (Dual Format)

Requirements exist in **two formats by design**, each serving a different purpose:

| Format | Location | Purpose | Who Authors |
|--------|----------|---------|-------------|
| **JSON files** | `scripts/requirements/{country}/` | Jurisdiction templates shared across all projects | Standard maintainers |
| **Markdown files** | `{project}/requirements/` | Project-specific requirements authored by the design team | Architects, engineers |

**JSON (jurisdiction templates)** are reusable rule packs loaded automatically by the compiler based on the project's country code. They encode building codes (WT 2021, DIN, Building Regs) as machine-readable rules with scope matching -- the compiler auto-assigns them to spaces by `spaceType`. You do not need to reference them manually from each space file.

**Markdown (project instances)** are project-specific requirements written alongside your other entity files. They follow the same YAML frontmatter format as all other SBM entities and can contain narrative documentation in the Markdown body. Use these for client-specific rules, design targets, or custom requirements that go beyond code minimums.

Both formats produce identical requirement entities in the compiled `sbm.json` -- the distinction is purely about authoring workflow and reusability.

## Authoring Requirements

### Global Requirements (JSON)
Place in `scripts/requirements/global/` - automatically loaded for all projects.

### Country-Specific Requirements (JSON)
Place in `scripts/requirements/{country_code}/` - loaded when `project.country` matches.

### Project-Specific Requirements (Markdown)
Place in `{project}/requirements/` - loaded for that project only.

```markdown
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-PROJECT-CUSTOM-001"
requirementName: "Project-specific ceiling height"
requirementType: "dimensional"
metric: "room_height_clear"
operator: ">="
value: 3.00
unit: "m"
scope:
  entityType: "space"
  spaceTypes: ["office"]
verification:
  method: "measurement"
  phase: ["as_built"]
  responsible: "contractor"
version: "1.0.0"
---

# Custom Requirement: Office Ceiling Height

Client requires 3.00m clear height for all office spaces (exceeds code minimum of 2.50m).
```

## See Also

- **[Space](/en/documentation/entities/space)** - Spaces reference requirements
- **[Zone](/en/documentation/entities/zone)** - Zones reference requirements
- **[Compiler Guide](/en/documentation/compiler/)** - Requirement evaluation logic
- **[Compliance Report](/en/documentation/compiler/)** - Compliance checking output
