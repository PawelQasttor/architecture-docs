# Error Reference

The SBM compiler emits **errors** (which block compilation) and **warnings** (informational, do not block). This page lists all error and warning codes by category.

## Schema Validation Errors

Emitted when entity frontmatter fails JSON Schema validation against `schemas/sbm-schema-v1.1.json`.

| Error | Cause | Fix |
|-------|-------|-----|
| Missing required field | A required field is absent from frontmatter | Add the field. Check entity docs for required fields |
| Invalid type | Field value has wrong data type (e.g., string instead of number) | Correct the value type |
| Invalid enum value | Value not in allowed set (e.g., `spaceType: "invalid"`) | Check schema for allowed values |
| Invalid ID pattern | ID doesn't match expected prefix pattern | Use correct prefix: `SP-`, `AST-`, `OPN-`, `CP-`, etc. |
| Additional properties | Unknown field in frontmatter | Remove or rename the field |

**Example:**
```
ERROR [schema] SP-BLD-01-L01-001: must have required property 'spaceName'
```

---

## Referential Integrity Errors

Emitted when an entity references an ID that doesn't exist in the compiled model.

| Check | Field(s) | Description |
|-------|----------|-------------|
| Space → Type | `spaceTypeId` | Space type must exist |
| Space → Level | `levelId` | Level must exist |
| Space → Building | `buildingId` | Building must exist |
| Space → Zones | `zoneIds[]` | Each zone must exist |
| Zone → Type | `zoneTypeId` | Zone type must exist |
| System → Type | `systemTypeId` | System type must exist |
| Asset → Type | `assetTypeId` | Asset type must exist |
| Asset → System | `systemId` | System must exist |
| Opening → Envelope | `envelopeId` | Envelope must exist |
| Opening → Type | `openingTypeId` | Opening type must exist |
| Site Feature → Site | `siteId` | Site must exist |
| Site Feature → Type | `siteFeatureTypeId` | Site feature type must exist |
| Construction Package | `dependencies[].packageId` | Dependency package must exist |
| Any → Package | `constructionPackageId` | Construction package must exist |

**Example:**
```
ERROR [ref] Opening OPN-WIN-N-001 references envelope ENV-MISSING which does not exist
```

---

## Business Rule Warnings

Warnings about potential data quality issues. These do not block compilation.

| Warning | Description | Resolution |
|---------|-------------|------------|
| No zone assignment | Space has no `zoneIds` | Assign space to at least one zone |
| No requirements | Space has no requirements | Add applicable requirements |
| Cost without area | Space has area but no cost estimate | Add cost data when available |
| Duplicate zone membership | Space appears in multiple zones of same type | Review zone assignments |

**Example:**
```
WARN [business] Space SP-BLD-01-L01-001 has no zone assignments
```

---

## Circular Dependency Errors

Emitted when circular references are detected.

| Check | Description |
|-------|-------------|
| System hierarchy | `parentSystemId` → `subsystemIds` circular chain |
| Construction packages | `dependencies[].packageId` circular chain |

The compiler reports the cycle path: e.g., `CP-A → CP-B → CP-C → CP-A`.

**Example:**
```
ERROR [cycle] Circular system hierarchy detected: SYS-A → SYS-B → SYS-A
ERROR [cycle] Circular construction package dependency: CP-MEP → CP-FINISHES → CP-MEP
```

---

## Provenance Warnings

Emitted when data provenance tracking is incomplete.

| Warning | Condition | Resolution |
|---------|-----------|------------|
| Source required | `_meta.confidence` is `measured`/`calculated`/`specified` but `_meta.source` is missing | Add `source` to `_meta` |
| Null without explanation | Field is `null` with no `_meta` annotation | Add `_meta` with `confidence: "unknown"` |

**Example:**
```
WARN [provenance] SP-BLD-01-L01-001.designArea: confidence is "measured" but no source provided
```

---

## Phase Gate Errors

Enforced based on the project's `projectPhase`. Strictness increases in later phases.

| Phase | Rule | Severity |
|-------|------|----------|
| 1-3 (Initiation → Schematic) | All confidence levels accepted | -- |
| 4 (Design Development) | `assumed` fields flagged | Warning |
| 5-6 (Construction Docs/Phase) | `assumed` fields blocked | **Error** |
| 7-8 (As-Built / Handover) | `estimated` on safety-critical fields blocked | **Error** |

**Safety-critical fields** (from `scripts/compiler/constants.mjs`):
- `electricalSafetyGroup`, `radiologicalShielding`, `fireRating`, `structuralLoad`, `pressurization`, `shielding`, `firePerformance`
- Environmental: `pressurization`, `cleanlinessClass`, `pressureDifferentialPa`, `filtrationClass`, `airChangesPerHour`

**Example:**
```
ERROR [phase] SP-BLD-01-L01-001.electricalSafetyGroup: "estimated" not allowed for safety-critical field in Phase 7
```

---

## See Also

- **[Compilation Pipeline](/en/documentation/compiler/pipeline)** - Full pipeline documentation
- **[Compiler Overview](/en/documentation/compiler/)** - High-level architecture
- **[Getting Started](/en/documentation/compiler/getting-started)** - First compilation
