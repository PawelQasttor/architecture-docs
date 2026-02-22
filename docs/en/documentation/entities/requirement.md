# Requirement

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
| `metric` | string | Measurable metric | `"daylight_factor"` |
| `operator` | string | Comparison operator | `">="`, `"<="`, `"=="`, `"range"` |
| `value` | number/object | Target value or range | `2.0` or `{ "min": 20, "max": 26 }` |
| `unit` | string | Measurement unit | `"%"`, `"m"`, `"dB"`, `"°C"` |
| `version` | string | Semantic version | `"1.0.0"` |

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

## Requirement Types (Enum)

```typescript
type RequirementType =
  | "performance"     // Functional performance targets
  | "dimensional"     // Size, height, width constraints
  | "regulatory"      // Legal compliance requirements
  | "design"          // Design standards and guidelines
  | "operational"     // Runtime operational requirements
  | "safety"          // Health and safety requirements
  | "sustainability"; // Environmental performance targets
```

## Example: Global Requirement (Markdown Source)

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

## Authoring Requirements

### Global Requirements (JSON)
Place in `scripts/requirements/global/` - automatically loaded for all projects.

### Country-Specific Requirements (JSON)
Place in `scripts/requirements/{country_code}/` - loaded when `project.country` matches.

### Project-Specific Requirements (Markdown)
Place in `docs/en/examples/{project}/requirements/` - loaded for that project only.

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
