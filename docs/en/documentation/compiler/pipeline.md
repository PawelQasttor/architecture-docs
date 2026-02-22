# Compilation Pipeline

The SBM compiler processes building entities through a 4-stage pipeline. This document explains each stage in detail.

## Pipeline Overview

```
Markdown Files → Parse → Normalize → Validate → Compile → 5 Outputs
   (Input)        ↓         ↓          ↓          ↓      (Targets)
                Stage 1   Stage 2   Stage 3   Stage 4
```

## Stage 1: Parse

**Purpose:** Load and extract entity data from Markdown files

**Input:**
- Directory containing `.md` files with YAML frontmatter
- CSV schedules (optional)

**Process:**
1. Scan input directory recursively for `.md` files
2. Read each file and extract YAML frontmatter
3. Parse frontmatter using `gray-matter`
4. Group entities by `entityType`
5. Track file paths for error reporting

**Output:**
```javascript
{
  spaces: [...],
  zones: [...],
  systems: [...],
  assetInstances: [...],
  requirements: [...],
  buildings: [...],
  levels: [...]
}
```

**Implementation:** `scripts/compiler/stages/parse.mjs`

### Example Parse Flow

**Input file:** `bedroom-01.md`
```markdown
---
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
designArea: 14.5
---

# Bedroom 01
Content here...
```

**Parsed output:**
```javascript
{
  entityType: "space",
  id: "SP-BLD-01-L01-001",
  spaceName: "Bedroom 01",
  spaceType: "sleeping_space",
  designArea: 14.5,
  _sourcePath: "spaces/bedroom-01.md"  // Added by parser
}
```

### Parse Stage Logging

```
🔍 Scanning for entity files...
   Found: spaces/bedroom-01.md
   Found: spaces/bedroom-02.md
   Found: zones/fire-zone-zl-iv.md
✓ Parsed 3 spaces, 2 zones, 1 building, 1 level
```

---

## Stage 2: Normalize & Enrich

**Purpose:** Standardize data and add computed relationships

**Input:** Raw entity collection from Stage 1

**Process:**
1. **Load jurisdiction pack** based on `project.country`
   - Always load `scripts/requirements/global/`
   - Load `scripts/requirements/{country}/` if country specified
2. **Normalize units** (convert to standard units)
3. **Generate missing IDs** (deterministic fallback)
4. **Normalize enums** (lowercase, underscore)
5. **Compute reverse relationships**:
   - `space.zoneIds` → `zone.spaceIds`
   - `asset.systemId` → `system.assetInstanceIds`
   - `space.levelId` → `level.spaceIds`
6. **Merge requirements** from jurisdiction pack + Markdown

**Output:**
```javascript
{
  spaces: [...],        // Normalized
  zones: [...],         // With computed spaceIds
  systems: [...],       // With computed assetInstanceIds
  assetInstances: [...],
  requirements: [...],  // Global + country-specific + project
  buildings: [...],
  levels: [...]         // With computed spaceIds
}
```

**Implementation:** `scripts/compiler/stages/normalize.mjs`

### Jurisdiction Pack Loading

```javascript
// Building defines country
{
  "country": "PL"
}

// Stage 2 automatically loads:
// 1. scripts/requirements/global/ (always)
//    - REQ-DAYLIGHT-SLEEPING-001
//    - REQ-ACOUSTIC-SLEEPING-001
//    - REQ-THERMAL-COMFORT-001
//    - REQ-VENTILATION-OCCUPIED-001
//
// 2. scripts/requirements/pl/ (because country = "PL")
//    - REQ-PL-WT-ROOM-HEIGHT-001
//    - REQ-PL-WT-CORRIDOR-WIDTH-001
//    - REQ-PL-FIRE-SEPARATION-001
```

### Reverse Relationship Computation

**Before normalization:**
```javascript
// Spaces reference zones
{
  id: "SP-BLD-01-L01-001",
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
}

// Zone has no spaceIds
{
  id: "ZONE-FIRE-ZL-IV",
  spaceIds: []  // Empty
}
```

**After normalization:**
```javascript
// Space unchanged
{
  id: "SP-BLD-01-L01-001",
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
}

// Zone auto-populated with spaceIds
{
  id: "ZONE-FIRE-ZL-IV",
  spaceIds: [
    "SP-BLD-01-L01-001",
    "SP-BLD-01-L01-002",
    "SP-BLD-01-L01-003"
  ]  // Auto-computed!
}
```

### Normalize Stage Logging

```
🔍 Loading jurisdiction pack...
   ✓ Loaded 4 global requirements
   ✓ Loaded 3 PL-specific requirements
🔧 Normalizing entities...
   ✓ Generated 2 missing IDs
   ✓ Normalized 12 units
🔗 Computing relationships...
   ✓ Computed zone.spaceIds (2 zones)
   ✓ Computed system.assetInstanceIds (1 system)
   ✓ Computed level.spaceIds (4 levels)
✓ Normalized 3 spaces, 2 zones, 7 requirements
```

---

## Stage 3: Validate

**Purpose:** Ensure data integrity and compliance with schema

**Input:** Normalized entity graph from Stage 2

**Process:**

### 3.1 JSON Schema Validation
- Validate each entity against `schemas/sbm-schema-v0.1.json`
- Check required fields, data types, enum values
- Uses Ajv validator (JSON Schema Draft 07)

### 3.2 Referential Integrity
- Verify all ID references exist
- Check:
  - `space.zoneIds` → zones exist
  - `space.levelId` → level exists
  - `space.buildingId` → building exists
  - `space.requirements` → requirements exist
  - `asset.systemId` → system exists

### 3.3 Business Rules
- Requirements applicable to scope?
  ```javascript
  // Example: Sleeping space requirement
  requirement: {
    id: "REQ-DAYLIGHT-SLEEPING-001",
    scope: {
      entityType: "space",
      spaceTypes: ["sleeping_space", "bedroom"]
    }
  }

  // ✓ Valid: Bedroom references this requirement
  space: {
    id: "SP-BLD-01-L01-001",
    spaceType: "bedroom",
    requirements: ["REQ-DAYLIGHT-SLEEPING-001"]
  }

  // ✗ Invalid: Office references sleeping requirement
  space: {
    id: "SP-BLD-01-L02-001",
    spaceType: "office",
    requirements: ["REQ-DAYLIGHT-SLEEPING-001"]  // Error!
  }
  ```

**Output:**
```javascript
{
  valid: true/false,
  errors: [...],
  warnings: [...]
}
```

**Implementation:** `scripts/compiler/stages/validate.mjs`

### Validation Error Types

**Schema Errors:**
```
[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
  - Invalid value for designArea: "14.5" (expected number)
  - Invalid enum value for unit: "meter" (expected "m", "mm", "cm")
```

**Referential Integrity Errors:**
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid zoneId reference: ZONE-FIRE-INVALID (does not exist)
  - Invalid levelId reference: LVL-99 (does not exist)
```

**Business Rule Errors:**
```
[ERROR] Space SP-BLD-01-L02-001 (Office):
  - Requirement REQ-DAYLIGHT-SLEEPING-001 not applicable
    (requires spaceType: sleeping_space or bedroom)
```

### Validation Warnings

Non-critical issues that don't block compilation:

```
[WARNING] Space SP-BLD-01-L01-001:
  - No requirements assigned
  - designVolume not provided (recommend calculating from area × height)

[WARNING] Requirement REQ-CUSTOM-001:
  - No spaces reference this requirement (unused)
```

### Validate Stage Logging

```
🔍 Validating entities...
   ✓ JSON Schema validation: 0 errors
   ✓ Referential integrity: 0 errors
   ✓ Business rules: 0 errors
   ⚠ 2 warnings (non-blocking)
✅ Validation passed
```

---

## Stage 4: Compile Targets

**Purpose:** Generate practical outputs for BIM, compliance, FM, and digital twin

**Input:** Validated entity graph from Stage 3

**Process:**

Targets are generated **in parallel** for performance:

```javascript
await Promise.all([
  generateBimMapping(entities, options),
  generateComplianceReport(entities, options),
  generateAssetRegister(entities, options),
  generateTwinSchema(entities, options)
]);
```

### 4.1 BIM Mapping Target

**Generator:** `scripts/compiler/targets/bim-mapping.mjs`

**Output:** `bim_mapping.json`

**Contents:**
- Revit shared parameter definitions
- IFC property set definitions (Pset_SBM_*)
- Property mapping rules (SBM → Revit → IFC)

**Use cases:**
- Import parameters into Revit
- Configure IFC export
- Populate properties via Dynamo

### 4.2 Compliance Report Target

**Generator:** `scripts/compiler/targets/compliance-report.mjs`

**Output:** `compliance_report.json`

**Contents:**
- Summary (total requirements, compliance rate)
- Requirements grouped by regulation
- Poland WT 2021 section breakdown
- Space-by-space compliance details
- Verification status and methods

**Use cases:**
- Permit submission
- Regulatory audits
- Compliance dashboards

### 4.3 Asset Register Target

**Generator:** `scripts/compiler/targets/asset-register.mjs`

**Output:** `asset_register.json`

**Contents:**
- Asset inventory with serial numbers
- 24-month maintenance calendar
- Spare parts inventory
- Warranty tracking
- CMMS-ready export

**Use cases:**
- CMMS import (Maximo, SAP PM)
- Maintenance planning
- Lifecycle cost analysis

### 4.4 Digital Twin Schema Target

**Generator:** `scripts/compiler/targets/twin-schema.mjs`

**Output:** `twin_schema.json`

**Contents:**
- Sensor bindings (space → sensors)
- BMS integration (BACnet device registry)
- Runtime requirement evaluation rules
- Alarm and threshold configuration

**Use cases:**
- BMS configuration
- IoT sensor deployment
- Real-time compliance monitoring

### Compile Stage Logging

```
🔧 Generating compilation targets...
   ✓ BIM mapping (12.5 KB)
   ✓ Compliance report (45.3 KB)
   ✓ Asset register (8.2 KB)
   ✓ Digital twin schema (15.7 KB)
✅ 4 targets generated in 0.08s
```

---

## Pipeline Performance

Measured on Green Terrace example (3 spaces, 2 zones, 1 system, 7 requirements):

| Stage | Time | Percentage |
|-------|------|------------|
| Parse | 15ms | 12.5% |
| Normalize | 25ms | 20.8% |
| Validate | 30ms | 25.0% |
| Compile | 50ms | 41.7% |
| **Total** | **120ms** | **100%** |

**Optimization opportunities:**
- Caching parsed entities (skip re-parsing unchanged files)
- Parallel validation of independent entity types
- Incremental compilation (only regenerate changed targets)

## Error Recovery

The compiler provides clear error messages at each stage:

### Parse Errors

```
[ERROR] Failed to parse spaces/bedroom-01.md:
  - Invalid YAML frontmatter (line 3: unexpected token)

🔧 Fix: Check YAML syntax, ensure proper indentation
```

### Normalize Errors

```
[ERROR] Failed to load jurisdiction pack for country "XX":
  - Directory scripts/requirements/xx/ does not exist

🔧 Fix: Use supported country code (PL, DE, GB, US) or create custom pack
```

### Validate Errors

```
[ERROR] Validation failed with 3 errors (see above)

🔧 Fix errors and re-run compilation
```

### Compile Errors

```
[ERROR] Failed to generate compliance report:
  - No requirements loaded (check jurisdiction pack)

🔧 Fix: Ensure country is specified or add custom requirements
```

## Incremental Compilation (Future)

Planned optimization for large projects:

```bash
# First compilation: Full
node scripts/compiler/index.mjs compile --input ... --output ...
# Time: 5.2s (200 entities)

# Modify one space
vim spaces/bedroom-01.md

# Incremental compilation: Only changed entities
node scripts/compiler/index.mjs compile --input ... --output ... --incremental
# Time: 0.3s (1 entity changed, relationships recomputed, targets regenerated)
```

**How it works:**
1. Hash each source file (MD5)
2. Compare with previous compilation hashes
3. Only re-parse changed files
4. Recompute affected relationships
5. Regenerate only affected targets

## See Also

- **[Compiler Overview](/en/documentation/compiler/)** - High-level architecture
- **[Getting Started](/en/documentation/compiler/getting-started)** - First compilation
- **[Compilation Targets](/en/documentation/compiler/)** - Deep dive into outputs
- **[Entity Types](/en/documentation/entities/)** - Entities that can be compiled
