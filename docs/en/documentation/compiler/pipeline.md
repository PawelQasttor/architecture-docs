# Compilation Pipeline

The SBM compiler v0.2.0 processes building entities through a 5-stage pipeline. This document explains each stage in detail.

## Pipeline Overview

```
Markdown Files → Parse → Normalize → Validate → Quality → Compile → 6 Outputs
   (Input)        ↓         ↓           ↓          ↓         ↓      (Targets)
               Stage 1   Stage 2    Stage 3    Stage 3.5  Stage 4
```

## Stage 1: Parse

**Purpose:** Load and extract entity data from Markdown files

**Input:**
- Directory containing `.md` files with YAML frontmatter

**Process:**
1. Scan input directory recursively for `.md` files
2. Read each file and extract YAML frontmatter
3. Filter by valid `documentType` (11 entity types + 4 type templates + legacy)
4. Track file paths for error reporting

**Recognized entity types:**
- Instances: `space`, `zone`, `system`, `asset_instance`, `requirement`, `building`, `level`
- Type templates: `space_type`, `zone_type`, `system_type`, `asset_type`
- Legacy: `element_specification`, `project_specification`

**Implementation:** `scripts/compiler/stages/parse.mjs`

### Example Parse Flow

**Input file:** `bedroom-01.md`
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
levelId: "LVL-01"
buildingId: "BLD-01"
designArea: 14.5
version: "2.0.0"
---
```

**Parsed output:**
```javascript
{
  documentType: "space",
  entityType: "space",
  id: "SP-BLD-01-L01-001",
  spaceName: "Bedroom 01",
  spaceTypeId: "ST-BEDROOM-STANDARD-A",
  levelId: "LVL-01",
  designArea: 14.5,
  // ... other fields from frontmatter
}
```

---

## Stage 2: Normalize, Enrich & Resolve Inheritance

**Purpose:** Group entities, resolve inheritance chains, compute relationships, load jurisdiction pack

**Input:** Raw entity collection from Stage 1

**Process:**

### 2.1 Group Entities by Type

Entities are grouped into 11 arrays: `buildings`, `levels`, `spaces`, `zones`, `systems`, `asset_instances`, `requirements`, `space_types`, `zone_types`, `system_types`, `asset_types`.

### 2.2 Resolve Type → Instance Inheritance

For each instance with a `typeId`, copy template fields from the type entity if not explicitly set on the instance.

**Space Type → Space:**
- Inheritable fields: `designArea`, `designHeight`, `spaceType`, `electricalSafetyGroup`, `accessibilityLevel`
- Inheritable objects: `finishes`, `environmentalConditions`, `occupancy`
- Requirements: **merged** (type requirements added to instance requirements)

**Zone Type → Zone:** `zoneCategory`, `regulatoryBasis`

**System Type → System:** `systemCategory`, `designLifeYears`

**Asset Type → Asset Instance:** `manufacturer`, `modelNumber`, `expectedLifeYears`

Inherited fields get `_meta` with `resolution: "type_default"`:
```json
{
  "designHeight": 2.70,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "type_default",
    "inheritedFrom": "ST-BEDROOM-STANDARD-A",
    "inheritedField": "designHeight"
  }
}
```

### 2.3 Resolve Level → Space Inheritance

For each space with a `levelId`, inherit level-typical properties:

| Level Field | Space Field | Behavior |
|-------------|------------|----------|
| `typicalCeilingHeight` | `designHeight` | Copied if not set by type or explicit |
| `typicalFinishes` | `finishes` | Copied if not set |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Copied if not set |
| `levelRequirements` | `requirements` | **Merged** (added, not replaced) |

**Resolution order:** (1) Explicit value, (2) Type template, (3) Level inheritance, (4) No default.

Inherited fields get `_meta` with `resolution: "inherited"`:
```json
{
  "designHeight": 2.70,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "inherited",
    "inheritedFrom": "LVL-01",
    "inheritedField": "typicalCeilingHeight"
  }
}
```

When requirements are merged from multiple sources, `_meta` tracks the merge chain:
```json
{
  "requirements_meta": {
    "confidence": "specified",
    "resolution": "merged",
    "mergedFrom": [
      { "source": "SP-BLD-01-L01-001", "type": "explicit" },
      { "source": "ST-BEDROOM-STANDARD-A", "type": "type_default", "added": ["REQ-1"] },
      { "source": "LVL-01", "type": "inherited", "added": ["REQ-2", "REQ-3"] }
    ]
  }
}
```

### 2.4 Compute Reverse Relationships
- `space.zoneIds` → `zone.spaceIds`
- `asset.systemId` → `system.assetInstanceIds`

### 2.5 Load Jurisdiction Pack
- Always load `scripts/requirements/global/`
- Load `scripts/requirements/{country}/` if country specified
- Merge with requirements from Markdown files (Markdown version wins on ID conflict)

### 2.6 Extract Project Metadata
- Read from `project_specification` entity or construct from CLI options
- Includes: project ID, name, country, phase, language, units

**Implementation:** `scripts/compiler/stages/normalize.mjs`

---

## Stage 3: Validate

**Purpose:** Ensure data integrity, provenance, and phase-appropriate quality

**Input:** Normalized entity graph from Stage 2

**Process:**

### 3.1 JSON Schema Validation
- Validates against `schemas/sbm-schema-v0.2.json`
- Uses AJV with format validation
- Checks required fields, data types, enum values, ID patterns

### 3.2 Referential Integrity
- All referenced IDs must exist
- Checks: `spaceTypeId`, `levelId`, `buildingId`, `zoneIds`, `systemTypeId`, `zoneTypeId`, `assetTypeId`
- Missing assets referenced by systems generate warnings (may not be defined yet)

### 3.3 Business Rules
- Every space should have at least one zone assignment
- Every space should have at least one requirement

### 3.4 Data Provenance <Badge type="tip" text="v0.2.0" />

**Rule 1: Source required for high confidence**
If `_meta.confidence` is `measured`, `calculated`, or `specified` and `_meta.source` is missing (and the field isn't inherited), emit a warning.

**Rule 2: Null without explanation**
If a field is null with no `_meta` annotation, emit a warning. Fields should either have a value or have `_meta` with `confidence: "unknown"` explaining why.

### 3.5 Phase Gate Enforcement <Badge type="tip" text="v0.2.0" />

| Phase | Rule | Severity |
|-------|------|----------|
| 1-3 | All confidence levels accepted | - |
| 4 | `assumed` fields flagged | Warning |
| 5-6 | `assumed` fields blocked | **Error** |
| 7-8 | `estimated` on safety-critical blocked | **Error** |

Safety-critical fields: `electricalSafetyGroup`, `radiologicalShielding`, `fireRating`, `structuralLoad`.

**Implementation:** `scripts/compiler/stages/validate.mjs`

---

## Stage 3.5: Quality Summaries <Badge type="tip" text="v0.2.0" />

**Purpose:** Compute per-entity quality blocks and project-wide quality summary

**Input:** Validated entity graph from Stage 3

**Process:**

For each entity:
1. Count all fields with `_meta` annotations
2. Group by confidence level (`measured`, `calculated`, `specified`, `estimated`, `assumed`, `unknown`)
3. Compute completeness (non-null fields / total fields)
4. Find lowest confidence level
5. Identify safety-critical fields and their confidence
6. Generate warnings

**Per-entity `_quality` block:**
```json
{
  "_quality": {
    "totalFields": 26,
    "fieldsByConfidence": {
      "measured": 0, "calculated": 0, "specified": 4,
      "estimated": 0, "assumed": 0, "unknown": 0
    },
    "completeness": 1.0,
    "lowestConfidence": "specified",
    "safetyCritical": [
      {
        "field": "environmentalConditions.pressurization",
        "value": "neutral",
        "confidence": "specified"
      }
    ]
  }
}
```

**Project-wide quality summary:**
```json
{
  "totalEntities": 21,
  "averageCompleteness": 1.0,
  "fieldsByConfidence": { "specified": 84, ... },
  "safetyCriticalFields": {
    "total": 3, "verified": 3, "unverified": 0
  }
}
```

**Implementation:** `scripts/compiler/stages/quality.mjs`

---

## Stage 4: Compile Targets

**Purpose:** Generate practical outputs for BIM, compliance, FM, digital twin, and quality assurance

**Input:** Validated entity graph with `_quality` blocks from Stage 3.5

### 4.1 BIM Mapping Target
**Generator:** `scripts/compiler/targets/bim-mapping.mjs`
**Output:** `bim_mapping.json`

### 4.2 Compliance Report Target
**Generator:** `scripts/compiler/targets/compliance-report.mjs`
**Output:** `compliance_report.json`

### 4.3 Asset Register Target
**Generator:** `scripts/compiler/targets/asset-register.mjs`
**Output:** `asset_register.json`

### 4.4 Digital Twin Schema Target
**Generator:** `scripts/compiler/targets/twin-schema.mjs`
**Output:** `twin_schema.json`

### 4.5 Quality Report Target <Badge type="tip" text="v0.2.0" />

**Generator:** `scripts/compiler/targets/quality-report.mjs`
**Output:** `quality_report.json`

**Sections:**
- **Phase readiness** - Blockers and warnings for advancing to next phase
- **Safety audit** - Every safety-critical field with its confidence and source
- **Provenance gaps** - Fields without `_meta` or without source references
- **Entity cards** - Per-entity quality breakdown (sorted worst-first)
- **Recommendations** - Prioritized list of what to fix (critical → high → medium)

```json
{
  "phaseReadiness": {
    "currentPhase": 3,
    "nextPhase": 4,
    "ready": true,
    "blockers": [],
    "warnings": [
      {
        "rule": "Assumed fields generate warnings from Phase 4",
        "count": 5,
        "action": "Plan verification for 5 assumed field(s)"
      }
    ]
  },
  "safetyAudit": {
    "totalFields": 3,
    "verified": 3,
    "unverified": 0
  },
  "recommendations": [
    {
      "priority": "high",
      "category": "provenance",
      "message": "269 field(s) have values but no provenance tracking",
      "action": "Add _meta annotations with confidence level and source reference"
    }
  ]
}
```

---

## Pipeline Performance

Measured on Green Terrace example (16 entities: 3 spaces, 3 zones, 1 system, 3 zone types, 1 system type, 1 asset type, 1 asset instance, 1 level, 7 jurisdiction requirements):

| Stage | Description |
|-------|-------------|
| Parse | ~15ms |
| Normalize + Inheritance | ~25ms |
| Validate + Provenance + Phase Gates | ~30ms |
| Quality Summaries | ~5ms |
| Compile 5 Targets | ~55ms |
| **Total** | **~130ms** |

## See Also

- **[Compiler Overview](/en/documentation/compiler/)** - High-level architecture
- **[Getting Started](/en/documentation/compiler/getting-started)** - First compilation
- **[Data Provenance Guide](/en/guides/data-provenance)** - How to track data sources with `_meta`
- **[Entity Types](/en/documentation/entities/)** - Entities that can be compiled
