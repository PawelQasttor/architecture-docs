# Commissioning Test (Commissioning and Acceptance)

## What This Is

A **Commissioning Test file** documents a single commissioning or acceptance test. Examples: "Blower door test -- building air tightness", "Acoustic measurement between apartments A-01 and A-02".

::: tip For Architects
**Problem:** The building inspector asks "Did the building pass the air tightness test?" or "Where is the acoustic measurement report?" -- you search through binders, emails from the lab, and scanned PDFs.

**Old way:** Test reports in paper folders, measurement results in Excel, certificates as loose PDFs. Every subcontractor delivers documents in a different format.

**With commissioning tests:** Open `tests/ct-airtight-01.md` -- procedure, results, comparison against requirements, certificate all in one file. **Full audit trail from test planning to certification.**

**One test file = complete test documentation from procedure to result.**
:::

A **Commissioning Test** represents a formal commissioning or acceptance test performed on a building, system, or building element. It links measurement results to the requirements they verify, tracks pass/fail statuses, records deficiencies, and stores certificates. It is critical for the building handover process.

## Purpose

Commissioning tests define:
- System commissioning results (startup, regulation, balancing)
- Performance measurements (air tightness, acoustics, thermal imaging)
- Regulatory requirement verification (fire resistance, structural loads)
- Pressure and water tests
- Pass/fail tracking with deviations
- Deficiencies found during tests with links to issues
- Certificates and test reports
- Test and retest scheduling

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique test identifier | `"CT-AIRTIGHT-01"` |
| `entityType` | string | Must be `"commissioning_test"` | `"commissioning_test"` |
| `testName` | string | Human-readable test name | `"Blower door test -- building air tightness"` |
| `testCategory` | string | Test category (see enum below) | `"air_tightness"` |
| `status` | string | Current status (see enum below) | `"passed"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Test identifier with `CT-` prefix (e.g., `CT-AIRTIGHT-01`, `CT-ACOUSTIC-A01-A02`, `CT-FIRE-EW01`)
- **testName**: Readable name ("Blower door test", "Inter-apartment acoustic measurement")
- **testCategory**: What you are testing -- `air_tightness` (blower door), `acoustic_measurement` (acoustics), `pressure_test` (pressure), `fire_test` (fire resistance)
- **status**: Test state -- `planned`, `scheduled`, `passed`, `failed`, `conditional_pass`
- **version**: Track changes

**You need ONLY these 5 fields.** Measurement results, certificates, and deficiencies are added after the test is performed.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `buildingId` | string | Reference to a building |
| `testedEntityIds` | array | IDs of tested entities (spaces, systems, envelopes) |
| `requirementIds` | array | IDs of requirements verified by this test |
| `testProcedure` | object | Test procedure (standard, method, equipment) |
| `scheduledDate` | string | Planned test date (ISO 8601) |
| `executedDate` | string | Actual test execution date (ISO 8601) |
| `executedBy` | object | Who performed the test (name, organization, qualification) |
| `witnessedBy` | array | Test witnesses (name, organization, role) |
| `results` | object | Measurement results (measuredValue, requiredValue, unit, passed, deviation) |
| `deficiencies` | array | Deficiencies found during the test (description, severity, issueId) |
| `certificate` | object | Certificate/report (number, issuedBy, issuedDate) |
| `retestRequired` | boolean | Whether a retest is required |
| `retestDate` | string | Retest date (ISO 8601) |
| `attachments` | array | Attachments (reports, photos, protocols) |
| `tags` | array | Arbitrary classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For acceptance documentation (most important):**
- **results** -- Measured value vs. requirement (e.g., n50 = 0.4 h-1 vs. required <= 0.6 h-1)
- **certificate** -- Certificate number, who issued it, when
- **executedBy** -- Who performed the test (qualifications are important for test validity)
- **requirementIds** -- Which requirements this test verifies

**For process tracking:**
- **scheduledDate** / **executedDate** -- Test planning and execution
- **deficiencies** -- Deficiencies found during the test (linked to issues)
- **retestRequired** -- Whether the test must be repeated after deficiency repair

**For audit trail:**
- **testProcedure** -- Which standard, what method, what equipment
- **witnessedBy** -- Who witnessed (inspector, owner's representative)

**Most commonly:** Fill in `results`, `executedBy`, `executedDate`, `certificate`. Add the rest as needed.
:::

## Test Categories (Enum)

```typescript
type TestCategory =
  | "functional_performance"     // Functional performance test
  | "pressure_test"              // Pressure test
  | "air_tightness"              // Air tightness test (blower door)
  | "acoustic_measurement"       // Acoustic measurement
  | "thermal_imaging"            // Thermal imaging / thermography
  | "fire_test"                  // Fire resistance test
  | "electrical_test"            // Electrical test (insulation, grounding)
  | "water_test"                 // Water test (plumbing, waterproofing)
  | "commissioning_sequence"     // System startup sequence
  | "balancing"                  // System balancing (HVAC, hydronic)
  | "controls_verification"      // Controls / BMS verification
  | "emergency_systems"          // Emergency systems test (fire alarm, smoke extraction, lighting)
  | "accessibility_audit"        // Accessibility audit
  | "environmental_measurement"  // Environmental measurement (noise, pollutants)
  | "structural_load_test"       // Structural load test
  | "other";                     // Other test type
```

## Test Statuses (Enum)

```typescript
type TestStatus =
  | "planned"           // Planned -- not yet scheduled
  | "scheduled"         // Scheduled -- date and executor confirmed
  | "in_progress"       // In progress
  | "passed"            // Passed -- results meet requirements
  | "failed"            // Failed -- retest required
  | "conditional_pass"  // Conditionally passed -- minor deviations accepted
  | "deferred"          // Deferred -- reason documented
  | "cancelled";        // Cancelled -- no longer applicable
```

## Example 1: First Test File (Minimal)

**Simplest test -- blower door air tightness test:**

::: code-group

```md [Markdown]
File: tests/ct-airtight-01.md

---
id: "CT-AIRTIGHT-01"
entityType: "commissioning_test"
testName: "Blower door test -- building air tightness"
testCategory: "air_tightness"
status: "passed"
version: "1.0.0"

# Context
buildingId: "BLD-01"
requirementIds:
  - "REQ-IECC-AIRTIGHT-001"

testProcedure:
  standard: "ASTM E779 / ISO 9972:2015"
  method: "Method B -- building envelope test"
  equipment: "Minneapolis Blower Door Model 4"

executedDate: "2026-11-20"
executedBy:
  name: "Thomas Greene"
  organization: "National Building Testing Labs Inc."
  qualification: "Certified blower door operator RESNET #BD-2024-0156"

results:
  measuredValue: 0.4
  requiredValue: 0.6
  unit: "h-1"
  metric: "n50"
  passed: true
  deviation: -0.2

certificate:
  number: "NBTL/BD/2026/0847"
  issuedBy: "National Building Testing Labs Inc."
  issuedDate: "2026-11-22"
---

# Blower Door Test -- Building Air Tightness

Building air tightness test per ASTM E779 / ISO 9972.
Result: n50 = 0.4 h-1 (requirement: <= 0.6 h-1) -- **PASSED**.
```

```yaml [YAML]
id: "CT-AIRTIGHT-01"
entityType: "commissioning_test"
testName: "Blower door test -- building air tightness"
testCategory: "air_tightness"
status: "passed"
version: "1.0.0"
buildingId: "BLD-01"
requirementIds:
  - "REQ-IECC-AIRTIGHT-001"
testProcedure:
  standard: "ASTM E779 / ISO 9972:2015"
  method: "Method B -- building envelope test"
  equipment: "Minneapolis Blower Door Model 4"
executedDate: "2026-11-20"
executedBy:
  name: "Thomas Greene"
  organization: "National Building Testing Labs Inc."
  qualification: "Certified blower door operator RESNET #BD-2024-0156"
results:
  measuredValue: 0.4
  requiredValue: 0.6
  unit: "h-1"
  metric: "n50"
  passed: true
  deviation: -0.2
certificate:
  number: "NBTL/BD/2026/0847"
  issuedBy: "National Building Testing Labs Inc."
  issuedDate: "2026-11-22"
```

```json [JSON]
{
  "id": "CT-AIRTIGHT-01",
  "entityType": "commissioning_test",
  "testName": "Blower door test -- building air tightness",
  "testCategory": "air_tightness",
  "status": "passed",
  "version": "1.0.0",
  "buildingId": "BLD-01",
  "requirementIds": ["REQ-IECC-AIRTIGHT-001"],
  "testProcedure": {
    "standard": "ASTM E779 / ISO 9972:2015",
    "method": "Method B -- building envelope test",
    "equipment": "Minneapolis Blower Door Model 4"
  },
  "executedDate": "2026-11-20",
  "executedBy": {
    "name": "Thomas Greene",
    "organization": "National Building Testing Labs Inc.",
    "qualification": "Certified blower door operator RESNET #BD-2024-0156"
  },
  "results": {
    "measuredValue": 0.4,
    "requiredValue": 0.6,
    "unit": "h-1",
    "metric": "n50",
    "passed": true,
    "deviation": -0.2
  },
  "certificate": {
    "number": "NBTL/BD/2026/0847",
    "issuedBy": "National Building Testing Labs Inc.",
    "issuedDate": "2026-11-22"
  }
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "testName", "testCategory", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CT-" },
    "entityType": { "const": "commissioning_test" },
    "testName": { "type": "string" },
    "testCategory": {
      "type": "string",
      "enum": ["functional_performance", "pressure_test", "air_tightness", "acoustic_measurement", "thermal_imaging", "fire_test", "electrical_test", "water_test", "commissioning_sequence", "balancing", "controls_verification", "emergency_systems", "accessibility_audit", "environmental_measurement", "structural_load_test", "other"]
    },
    "status": {
      "type": "string",
      "enum": ["planned", "scheduled", "in_progress", "passed", "failed", "conditional_pass", "deferred", "cancelled"]
    },
    "version": { "type": "string" }
  }
}
```

:::

**That is all.** Test planned, executed, result documented. Deficiencies and retests are added if needed.

---

## Example 2: Full Test (Acoustic Measurement with Deficiencies)

**File:** `tests/ct-acoustic-a01-a02.md`

::: code-group

```md [Markdown]
---
entityType: "commissioning_test"
id: "CT-ACOUSTIC-A01-A02"
testName: "Airborne sound insulation measurement between apartments A-01 and A-02"
testCategory: "acoustic_measurement"
status: "failed"
version: "1.0.0"

buildingId: "BLD-01"
testedEntityIds:
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
  - "ENV-IW-01"
requirementIds:
  - "REQ-IBC-ACOUSTIC-WALL-001"

testProcedure:
  standard: "ASTM E336 / ISO 16283-1:2014"
  method: "Field measurement of airborne sound insulation"
  equipment: "Bruel & Kjaer 2270 sound level meter, Bruel & Kjaer 4292 sound source"

scheduledDate: "2026-11-10"
executedDate: "2026-11-12"

executedBy:
  name: "Dr. Maria Alvarez"
  organization: "Acoustic Testing Associates LLC"
  qualification: "Board-certified acoustical consultant INCE #0234/2020"

witnessedBy:
  - name: "Christopher Ward"
    organization: "Langan Engineering"
    role: "construction inspector"
  - name: "Angela Brooks"
    organization: "Green Terrace Housing Co."
    role: "owner's representative"

results:
  measuredValue: 48
  requiredValue: 52
  unit: "dB"
  metric: "R'w"
  passed: false
  deviation: -4

deficiencies:
  - description: "Insufficient airborne sound insulation of the inter-apartment wall -- R'w = 48 dB vs. required 52 dB. Probable cause: acoustic bridge at plumbing penetration through the wall."
    severity: "major"
    issueId: "ISS-NCR-008"
  - description: "Visible gap between the wall and ceiling in apartment A-02 (approx. 3 mm). May serve as an additional sound transmission path."
    severity: "minor"
    issueId: "ISS-PL-015"

retestRequired: true
retestDate: "2026-12-15"

attachments:
  - fileName: "acoustic-report-a01-a02.pdf"
    fileType: "application/pdf"
    description: "Full acoustic measurement report with frequency analysis charts"
  - fileName: "photos-acoustic-bridges.zip"
    fileType: "application/zip"
    description: "Photographic documentation of identified acoustic bridges"

tags:
  - "acoustic"
  - "failed"
  - "retest_required"
  - "inter_apartment_wall"
---

# Acoustic Measurement A-01 / A-02

Airborne sound insulation measurement of the inter-apartment wall between apartments A-01 and A-02.

## Result

- **Measured:** R'w = 48 dB
- **Required:** R'w >= 52 dB (IBC Section 1206)
- **Status:** FAILED (deviation: -4 dB)

## Deficiencies

1. Acoustic bridge at plumbing penetration through the wall
2. Gap between wall and ceiling in A-02

## Next Steps

- Repair acoustic bridges by 2026-12-01
- Retest scheduled for 2026-12-15
```

```yaml [YAML]
entityType: "commissioning_test"
id: "CT-ACOUSTIC-A01-A02"
testName: "Airborne sound insulation measurement between apartments A-01 and A-02"
testCategory: "acoustic_measurement"
status: "failed"
version: "1.0.0"
buildingId: "BLD-01"
testedEntityIds:
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
  - "ENV-IW-01"
requirementIds:
  - "REQ-IBC-ACOUSTIC-WALL-001"
testProcedure:
  standard: "ASTM E336 / ISO 16283-1:2014"
  method: "Field measurement of airborne sound insulation"
  equipment: "Bruel & Kjaer 2270 sound level meter, Bruel & Kjaer 4292 sound source"
scheduledDate: "2026-11-10"
executedDate: "2026-11-12"
executedBy:
  name: "Dr. Maria Alvarez"
  organization: "Acoustic Testing Associates LLC"
  qualification: "Board-certified acoustical consultant INCE #0234/2020"
witnessedBy:
  - name: "Christopher Ward"
    organization: "Langan Engineering"
    role: "construction inspector"
  - name: "Angela Brooks"
    organization: "Green Terrace Housing Co."
    role: "owner's representative"
results:
  measuredValue: 48
  requiredValue: 52
  unit: "dB"
  metric: "R'w"
  passed: false
  deviation: -4
deficiencies:
  - description: "Insufficient airborne sound insulation of the inter-apartment wall -- R'w = 48 dB vs. required 52 dB. Probable cause: acoustic bridge at plumbing penetration through the wall."
    severity: "major"
    issueId: "ISS-NCR-008"
  - description: "Visible gap between the wall and ceiling in apartment A-02 (approx. 3 mm). May serve as an additional sound transmission path."
    severity: "minor"
    issueId: "ISS-PL-015"
retestRequired: true
retestDate: "2026-12-15"
attachments:
  - fileName: "acoustic-report-a01-a02.pdf"
    fileType: "application/pdf"
    description: "Full acoustic measurement report with frequency analysis charts"
  - fileName: "photos-acoustic-bridges.zip"
    fileType: "application/zip"
    description: "Photographic documentation of identified acoustic bridges"
tags:
  - "acoustic"
  - "failed"
  - "retest_required"
  - "inter_apartment_wall"
```

```json [JSON]
{
  "entityType": "commissioning_test",
  "id": "CT-ACOUSTIC-A01-A02",
  "testName": "Airborne sound insulation measurement between apartments A-01 and A-02",
  "testCategory": "acoustic_measurement",
  "status": "failed",
  "version": "1.0.0",
  "buildingId": "BLD-01",
  "testedEntityIds": ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002", "ENV-IW-01"],
  "requirementIds": ["REQ-IBC-ACOUSTIC-WALL-001"],
  "testProcedure": {
    "standard": "ASTM E336 / ISO 16283-1:2014",
    "method": "Field measurement of airborne sound insulation",
    "equipment": "Bruel & Kjaer 2270 sound level meter, Bruel & Kjaer 4292 sound source"
  },
  "scheduledDate": "2026-11-10",
  "executedDate": "2026-11-12",
  "executedBy": {
    "name": "Dr. Maria Alvarez",
    "organization": "Acoustic Testing Associates LLC",
    "qualification": "Board-certified acoustical consultant INCE #0234/2020"
  },
  "witnessedBy": [
    {
      "name": "Christopher Ward",
      "organization": "Langan Engineering",
      "role": "construction inspector"
    },
    {
      "name": "Angela Brooks",
      "organization": "Green Terrace Housing Co.",
      "role": "owner's representative"
    }
  ],
  "results": {
    "measuredValue": 48,
    "requiredValue": 52,
    "unit": "dB",
    "metric": "R'w",
    "passed": false,
    "deviation": -4
  },
  "deficiencies": [
    {
      "description": "Insufficient airborne sound insulation of the inter-apartment wall -- R'w = 48 dB vs. required 52 dB. Probable cause: acoustic bridge at plumbing penetration through the wall.",
      "severity": "major",
      "issueId": "ISS-NCR-008"
    },
    {
      "description": "Visible gap between the wall and ceiling in apartment A-02 (approx. 3 mm). May serve as an additional sound transmission path.",
      "severity": "minor",
      "issueId": "ISS-PL-015"
    }
  ],
  "retestRequired": true,
  "retestDate": "2026-12-15",
  "attachments": [
    {
      "fileName": "acoustic-report-a01-a02.pdf",
      "fileType": "application/pdf",
      "description": "Full acoustic measurement report with frequency analysis charts"
    },
    {
      "fileName": "photos-acoustic-bridges.zip",
      "fileType": "application/zip",
      "description": "Photographic documentation of identified acoustic bridges"
    }
  ],
  "tags": ["acoustic", "failed", "retest_required", "inter_apartment_wall"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "testName", "testCategory", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CT-" },
    "entityType": { "const": "commissioning_test" },
    "testName": { "type": "string" },
    "testCategory": {
      "type": "string",
      "enum": ["functional_performance", "pressure_test", "air_tightness", "acoustic_measurement", "thermal_imaging", "fire_test", "electrical_test", "water_test", "commissioning_sequence", "balancing", "controls_verification", "emergency_systems", "accessibility_audit", "environmental_measurement", "structural_load_test", "other"]
    },
    "status": {
      "type": "string",
      "enum": ["planned", "scheduled", "in_progress", "passed", "failed", "conditional_pass", "deferred", "cancelled"]
    },
    "results": {
      "type": "object",
      "properties": {
        "measuredValue": { "type": "number" },
        "requiredValue": { "type": "number" },
        "unit": { "type": "string" },
        "metric": { "type": "string" },
        "passed": { "type": "boolean" },
        "deviation": { "type": "number" }
      }
    },
    "version": { "type": "string" }
  }
}
```

:::

## Status Flow

Typical commissioning test status flow:

```
planned -> scheduled -> in_progress -> passed -> (closed)
                                     -> failed -> (retest) -> passed
                                     -> conditional_pass -> (closed)
                        (at any time) -> deferred
                        (at any time) -> cancelled
```

**Test passed:** `planned` -> `scheduled` -> `in_progress` -> `passed`

**Test failed with retest:** `planned` -> `scheduled` -> `in_progress` -> `failed` -> (deficiency repair) -> new test `CT-*-RETEST` -> `passed`

**Test conditionally passed:** `planned` -> `scheduled` -> `in_progress` -> `conditional_pass` (minor deviations accepted)

## Linking to Requirements

Commissioning tests close the requirement verification loop:

```yaml
# Requirement defines the TARGET
# (requirement.md)
id: "REQ-IECC-AIRTIGHT-001"
metric: "n50"
operator: "<="
value: 0.6
unit: "h-1"
verification:
  method: "testing"
  standard: "ASTM E779 / ISO 9972"

# Commissioning test provides the EVIDENCE
# (ct-airtight-01.md)
id: "CT-AIRTIGHT-01"
requirementIds: ["REQ-IECC-AIRTIGHT-001"]
results:
  measuredValue: 0.4
  requiredValue: 0.6
  passed: true
```

**Compiler logic:** When a test is `passed` and `requirementIds` includes a given requirement, the compiler marks that requirement as **verified** in the compliance report.

## Linking to Issues

Deficiencies found during tests create links to issues:

```yaml
deficiencies:
  - description: "Acoustic bridge at plumbing penetration"
    severity: "major"
    issueId: "ISS-NCR-008"  # Link to non-conformance issue
```

**Flow:** Test `failed` -> deficiency with `issueId` -> issue `ISS-NCR-008` (status: `submitted`) -> repair -> retest `CT-ACOUSTIC-A01-A02-R1` -> `passed` -> issue `closed`.

## Compliance Report Integration

Commissioning tests populate the verification section of the compliance report:

```json
{
  "verificationResults": [
    {
      "requirementId": "REQ-IECC-AIRTIGHT-001",
      "requirementName": "Building air tightness",
      "testId": "CT-AIRTIGHT-01",
      "testDate": "2026-11-20",
      "measuredValue": 0.4,
      "requiredValue": 0.6,
      "unit": "h-1",
      "status": "verified",
      "certificateNumber": "NBTL/BD/2026/0847"
    },
    {
      "requirementId": "REQ-IBC-ACOUSTIC-WALL-001",
      "requirementName": "Inter-apartment wall sound insulation",
      "testId": "CT-ACOUSTIC-A01-A02",
      "testDate": "2026-11-12",
      "measuredValue": 48,
      "requiredValue": 52,
      "unit": "dB",
      "status": "failed",
      "retestRequired": true,
      "retestDate": "2026-12-15"
    }
  ]
}
```

## BIM Mapping

Commissioning tests do not have a direct IFC equivalent -- they connect to the model through requirement verification:

| SBM Field | IFC Relation | Description |
|-----------|-------------|-------------|
| `testedEntityIds` | References to IFC entities | Tested elements (spaces, envelopes, systems) |
| `requirementIds` | `IfcConstraint` | Requirements verified by the test |
| `results.metric` | `IfcPropertySingleValue` | Measured value as an IFC property |
| `certificate.number` | `IfcDocumentInformation` | Certificate as a linked document |

**Note:** The IFC standard does not define a dedicated entity for commissioning tests. Test results are stored as custom properties (`Pset_SBM_CommissioningTest`) associated with the tested elements.

## See Also

- **[Requirement](/en/documentation/entities/requirement)** -- Tests verify requirement compliance
- **[Issue](/en/documentation/entities/issue)** -- Test deficiencies create issues
- **[System](/en/documentation/entities/system)** -- Commissioning applies to MEP systems
- **[Envelope](/en/documentation/entities/envelope)** -- Acoustic and thermal tests apply to envelopes
- **[Construction Package](/en/documentation/entities/construction-package)** -- Tests linked to work packages
