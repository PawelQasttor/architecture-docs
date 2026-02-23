---
title: Data Provenance
description: How to track where every data point comes from in your SBM model using field-level annotations, confidence levels, and source references.
---

# Data Provenance Guide

**SBM v0.2.0** introduces a provenance model that answers the question every architect dreads: *"Where did this number come from?"*

Without provenance, every field in your model looks equally trustworthy. A radiation shielding value of 0.3 mm Pb (from the architect's specification) looks identical to one of 2.0 mm Pb (guessed by someone who never read the source). In a hospital project, that 7x error is safety-critical.

This guide explains how to annotate your SBM entities so every data point is traceable back to its source.

## The Problem

In a real Polish hospital project (KPCPULM Blok D), an architect reviewed auto-generated room files and found:

- **CT room radiation shielding** documented as 2.0 mm Pb when the source document says **0.3 mm Pb** (7x error)
- **Operating room walls** documented as ceramic tiles when the source specifies **stainless steel cleanroom panels**
- **Autopsy room walls** documented as glazed ceramic when the source specifies **PCV thermoweldable cladding**

None of these errors were detectable from the SBM files alone, because there was no mechanism to distinguish verified data from fabricated data.

## Three Layers of Provenance

### Layer 1: Field-Level Annotations (you write these)

For any field `X`, add a companion `X_meta` object:

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela parter, linia 240"
  extractedBy: "auto-generator"
  extractedDate: "2026-02-23"
```

For unknown values, use `null` with explanation:

```yaml
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Not specified per-room in source. Level typical height (3.30m) available via inheritance."
```

### Layer 2: Inheritance Provenance (compiler generates this)

When the compiler resolves inherited values, it annotates the compiled output:

```yaml
# Compiled output for Space 3.25
designHeight: 3.00
designHeight_meta:
  confidence: specified
  resolution: inherited
  inheritedFrom: "LVL-KPCPULM-D-PIETRO-02"
  inheritedField: "typicalCeilingHeight"
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.4"
```

### Layer 3: Entity Quality Summary (compiler generates this)

Each compiled entity gets a `_quality` block:

```yaml
_quality:
  totalFields: 14
  fieldsByConfidence:
    measured: 0
    calculated: 0
    specified: 8
    estimated: 2
    assumed: 3
    unknown: 1
  completeness: 0.93
  lowestConfidence: assumed
  unresolvedFields: ["designHeight"]
  warnings:
    - "3 fields have 'assumed' confidence -- require verification before phase 5"
```

## Confidence Levels

| Level | Label | Meaning | Source required? | Example |
|-------|-------|---------|-----------------|---------|
| 1 | `measured` | Field-verified measurement | Yes | Surveyor measured room at 30.45 m2 |
| 2 | `calculated` | Derived from measured data | Yes | Volume = 30.45 m2 x 3.30 m |
| 3 | `specified` | From authoritative document | Yes | Room schedule says 30.45 m2 |
| 4 | `estimated` | Professional judgment | No | "Approximately 30 m2" |
| 5 | `assumed` | No source, reasonable guess | No | Default assumed from similar rooms |
| 6 | `unknown` | Value not available | No | Field set to null |

**Key rule:** `measured`, `calculated`, and `specified` require `source` and `sourceRef` fields. `estimated` and `assumed` do not (but are flagged for verification). `unknown` means the value is explicitly not available.

## Source References

### Declaring Document Sources

Each entity can declare its sources in the `sources` array:

```yaml
sources:
  - id: "PULM-PW-04.05.11"
    title: "Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii"
    type: architectural_description
    date: "2011-05-04"
    author: "Projektant"
```

### Citing Sources in _meta

Reference the source `id` in field-level `_meta`:

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela parter, poz. 1.24"
```

### Source Reference Patterns

Use consistent patterns for `sourceRef`:

| Source type | Pattern | Example |
|------------|---------|---------|
| Document section | `sekcja X.Y.Z` | `sekcja 4.5, tabela parter` |
| Page number | `strona N` | `strona 12` |
| Table entry | `tabela N, poz. X` | `tabela wykończeń, poz. 2.46` |
| Drawing detail | `rys. N, detal X` | `rys. A-07, detal 3` |
| Audio timestamp | `HH:MM:SS` | `00:12:30` |
| Email | `email z DD.MM.YYYY` | `email z 05.02.2026` |

## Compiler Validation Rules

### Rule 1: Source Required for High Confidence

If `confidence` is `measured`, `calculated`, or `specified`, then `source` and `sourceRef` must be present. Compiler emits warning if missing.

### Rule 2: Inheritance Duplication Detection

If a space specifies a value identical to what it would inherit from its level, the compiler warns:

```
WARNING: designHeight on SPC-xxx (3.00m) matches inherited value from LVL-xxx.
Consider removing to use inheritance.
```

### Rule 3: Phase Gate Enforcement

| Phase | Rule |
|-------|------|
| 1-3 (Initiation through Schematic) | All confidence levels accepted |
| 4 (Design Development) | Warning for `assumed` fields |
| 5 (Construction Docs) | Error for `assumed` fields on required properties |
| 7+ (As-Built) | Error for `estimated` fields on safety-critical properties |

**Safety-critical properties** include: `electricalSafetyGroup`, `environmentalConditions.pressurization`, `cleanlinessClass`, and any field related to radiation shielding, fire rating, or structural capacity.

### Rule 4: Null Field Tracking

- `null` with `confidence: unknown` is valid but tracked in quality summary
- `null` WITHOUT `_meta` emits warning: "Field X is null with no explanation"

### Rule 5: Confidence Inheritance

When a value is inherited, confidence inherits too. If the parent entity lacks confidence metadata, default to `estimated`.

## Example: CT Room with Full Provenance

This example shows how the CT room from the KPCPULM hospital project should be documented with provenance:

```yaml
id: SPC-KPCPULM-D-1-24
entityType: Space
spaceName: "Pracownia tomografu komputerowego (CT)"
roomNumber: "1.24"
levelId: LVL-KPCPULM-D-PARTER
buildingId: BLD-KPCPULM-BLOK-D

sources:
  - id: "PULM-PW-04.05.11"
    title: "Opis techniczny do projektu wykonawczego"
    type: architectural_description
    date: "2011-05-04"

designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter"

# Height NOT specified per-room in source -- explicitly unknown
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Not specified per-room. Level typical: 3.30m (medical rooms)."

# Radiation shielding -- safety-critical, sourced precisely
radiologicalShielding:
  wallEquivalent_mmPb: 0.3
  wallEquivalent_mmPb_meta:
    confidence: specified
    source: "PULM-PW-04.05.11"
    sourceRef: "sekcja 4.4.3"
  windowEquivalent_mmPb: 0.5
  windowEquivalent_mmPb_meta:
    confidence: specified
    source: "PULM-PW-04.05.11"
    sourceRef: "sekcja 4.6, okno podglądowe do sterowni"

electricalSafetyGroup: group_1
electricalSafetyGroup_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4, linia 130"
```

Notice:
- **0.3 mm Pb** is the correct value with a precise source reference (section 4.4.3)
- The height is explicitly `null` with `confidence: unknown` rather than guessed
- Every safety-critical field has a source

## In Markdown Files

In your SBM Markdown documentation files, you can express provenance in two ways:

### 1. YAML Frontmatter (for compiled entities)

```yaml
---
id: "SPC-KPCPULM-D-1-24"
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2"
---
```

### 2. Inline Annotations (for human-readable docs)

In the Markdown body, use blockquotes to cite sources:

```markdown
## Radiation Shielding

> Source: PULM-PW-04.05.11, sekcja 4.4.3

- Wall shielding: **0.3 mm Pb** equivalent
- Window to control room: **0.5 mm Pb** equivalent (sekcja 4.6)
```

## When to Use Each Confidence Level

### `measured` -- Use for as-built data

```yaml
designArea: 14.32
designArea_meta:
  confidence: measured
  source: "SURVEY-2026-06-10"
  sourceRef: "LiDAR scan, room SP-001"
  extractedBy: "Jan Kowalski, surveyor"
```

### `calculated` -- Use for derived values

```yaml
designVolume: 47.26
designVolume_meta:
  confidence: calculated
  source: "SURVEY-2026-06-10"
  note: "14.32 m2 (measured) x 3.30 m (measured) = 47.26 m3"
```

### `specified` -- Use for design-phase data from documents

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter"
```

### `estimated` -- Use for professional judgment

```yaml
designArea: 15.0
designArea_meta:
  confidence: estimated
  note: "Architect estimate from sketch. To be confirmed in schematic phase."
```

### `assumed` -- Use for placeholders

```yaml
designHeight: 2.70
designHeight_meta:
  confidence: assumed
  note: "Standard residential height assumed. No source document yet."
```

### `unknown` -- Use when data is not available

```yaml
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Not specified in any available document."
```

## Common Mistakes

### Mistake 1: Inventing data without marking it

**Wrong:**
```yaml
radiologicalShielding:
  wallEquivalent_mmPb: 2.0  # Looks authoritative but is fabricated
```

**Correct:**
```yaml
radiologicalShielding:
  wallEquivalent_mmPb: 0.3
  wallEquivalent_mmPb_meta:
    confidence: specified
    source: "PULM-PW-04.05.11"
    sourceRef: "sekcja 4.4.3"
```

### Mistake 2: Repeating inherited values

**Wrong:**
```yaml
# Space file duplicates level data
designHeight: 3.00  # Same as level typical -- unnecessary
```

**Correct:**
```yaml
# Omit field; compiler inherits from level
# designHeight inherited from LVL-KPCPULM-D-PIETRO-02 (3.00m)
```

### Mistake 3: Null without explanation

**Wrong:**
```yaml
designHeight: null  # Why? Missing? Not applicable? Pending?
```

**Correct:**
```yaml
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Per-room height not specified in source. Uses level typical (3.30m)."
```

## Migration from v0.1.x

Existing v0.1.x entities work without changes. Provenance is additive:

1. **No `_meta` fields** -- Entity works as before, but quality summary shows all fields as "no provenance"
2. **Add `sources` array** -- Declare the documents your entity data came from
3. **Add `_meta` to critical fields** -- Start with safety-critical fields (shielding, electrical safety, fire ratings)
4. **Add `_meta` to remaining fields** -- Gradually annotate all fields

The compiler gracefully handles mixed entities (some fields with `_meta`, some without).

## See Also

- [Data Governance](/en/project-management/data-governance) -- Raw data capture and processing pipeline
- [Space](/en/documentation/entities/space) -- Space entity with provenance section
- [Level](/en/documentation/entities/level) -- Level entity with inheritance provenance
- [Document Types](/en/documentation/entities/) -- Overview of all entity types
