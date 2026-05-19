# Space Program (Room Schedule)

## What This Is

A **Space Program file** defines how many rooms of each type are needed in a building, before design even begins. Think of it as a "shopping list" for rooms: 50 patient rooms, 4 operating theatres, 2 waiting areas. The compiler automatically compares designed spaces against requirements and reports compliance.

::: tip For Architects
**Problem:** You are designing a regional hospital. The client requires 50 patient rooms at 20 m² each, 4 operating theatres at 45 m², 12 consultation rooms at 15 m². How do you verify you have designed everything that is needed?

**Old way:** An Excel table -- the "Room Schedule" -- manually maintained. You compare drawings against the table at the end of each design stage. Someone forgets to add 2 consultation rooms because Excel does not check automatically.

**With Space Program:** Define requirements in `program.md`. Create space files in `spaces/`. The compiler automatically counts: "Required 50 patient rooms -- designed 48. Deficit: 2." No room slips through the cracks.

**One program file = automatic room schedule with validation.**
:::

A **Space Program** is an entity defining quantitative and area requirements for rooms before design commences. The compiler compares designed spaces against program requirements and calculates compliance.

## Purpose

Space programs define:
- How many rooms of each type are required (e.g. 50 patient rooms)
- What total area they should occupy (e.g. 1,000 m² for patient rooms)
- What the required unit area is (e.g. 20 m² per room)
- Priority of each requirement (critical, important, standard)
- Automatic schedule: designed vs. required
- Compliance report at building and department level

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique program identifier with `PROG-` prefix | `"PROG-HOSPITAL-MAIN"` |
| `entityType` | string | Must be `"space_program"` | `"space_program"` |
| `programName` | string | Human-readable name | `"Space Program — Main Hospital"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Program identifier with `PROG-` prefix (e.g. `PROG-HOSPITAL-MAIN`)
- **programName**: Name of the program ("Space Program -- Main Hospital")
- **version**: Track changes -- each program revision should increment the version

**You only NEED these 3 fields.** Add program items (required rooms) in the `programItems` array.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `buildingId` | string | Reference to the building this program applies to |
| `departmentId` | string | Reference to a department (if program covers a single department) |
| `programItems` | array | Program items: required space types with quantities and areas |
| `totalRequiredArea` | number | Total required program area in m² |
| `totalDesignedArea` | number | Auto-computed: total designed area in m² |
| `overallCompliance` | object | Auto-computed: degree of compliance with the program |
| `approvalStatus` | string | Program approval status: `draft`, `approved`, `revised` |
| `approvedBy` | string | Who approved the program |
| `approvalDate` | string | Approval date (ISO 8601) |
| `notes` | string | Notes and comments |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For defining requirements:**
- **programItems** -- The heart of the program: list of required space types with quantities and areas
- **buildingId** -- Links the program to a specific building
- **departmentId** -- Links to a hospital ward or organisational department

**For tracking status:**
- **approvalStatus** -- Whether the client has approved the program (`draft` -> `approved`)
- **totalRequiredArea** -- Total required area

**Auto-computed by the compiler:**
- **totalDesignedArea** -- Compiler calculates from actually designed spaces
- **overallCompliance** -- Compliance percentage (designed / required)

**Most common:** Start with buildingId and programItems. Add approvalStatus after client approval.
:::

## Program Items (programItems)

Each program item describes one room type:

```yaml
programItems:
  - spaceTypeId: "ST-PATIENT-ROOM"
    spaceType: "patient_room"
    label: "Double patient room"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "At least 50% of rooms with balcony access"
```

| Item Field | Type | Description |
|------------|------|-------------|
| `spaceTypeId` | string | Reference to a Space Type (optional) |
| `spaceType` | string | Functional room type |
| `label` | string | Human-readable label |
| `requiredQuantity` | number | Required number of rooms |
| `designedQuantity` | number | Auto-computed: how many have been designed |
| `requiredAreaPerUnit` | number | Required area per room in m² |
| `requiredTotalArea` | number | Required total area in m² |
| `designedTotalArea` | number | Auto-computed: total designed area in m² |
| `compliance` | object | Auto-computed: `{ quantityMet: true, areaMet: false, percentage: 96 }` |
| `priority` | string | `critical`, `important`, `standard`, `optional` |
| `departmentId` | string | Department these rooms belong to |
| `levelPreference` | array | Preferred levels |
| `notes` | string | Notes (e.g. specific requirements) |

## Example 1: First Program File (Minimal)

**Simplest space program to get started:**

::: code-group

```md [Markdown]
File: program.md

---
id: "PROG-HOSPITAL-MAIN"
entityType: "space_program"
programName: "Space Program — Main Hospital"
buildingId: "BLD-HOSPITAL-MAIN"

programItems:
  - spaceType: "patient_room"
    label: "Patient room"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    priority: "critical"

  - spaceType: "operating_room"
    label: "Operating theatre"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    priority: "critical"

  - spaceType: "consultation_room"
    label: "Consultation room"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    priority: "important"

version: "1.0.0"
---

# Space Program — Main Hospital

Room schedule for the regional hospital:
- 50 patient rooms (20 m² each)
- 4 operating theatres (45 m² each)
- 12 consultation rooms (15 m² each)
```

```yaml [YAML]
id: "PROG-HOSPITAL-MAIN"
entityType: "space_program"
programName: "Space Program — Main Hospital"
buildingId: "BLD-HOSPITAL-MAIN"

programItems:
  - spaceType: "patient_room"
    label: "Patient room"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    priority: "critical"

  - spaceType: "operating_room"
    label: "Operating theatre"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    priority: "critical"

  - spaceType: "consultation_room"
    label: "Consultation room"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    priority: "important"

version: "1.0.0"
```

```json [JSON]
{
  "id": "PROG-HOSPITAL-MAIN",
  "entityType": "space_program",
  "programName": "Space Program — Main Hospital",
  "buildingId": "BLD-HOSPITAL-MAIN",
  "programItems": [
    {
      "spaceType": "patient_room",
      "label": "Patient room",
      "requiredQuantity": 50,
      "requiredAreaPerUnit": 20,
      "priority": "critical"
    },
    {
      "spaceType": "operating_room",
      "label": "Operating theatre",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 45,
      "priority": "critical"
    },
    {
      "spaceType": "consultation_room",
      "label": "Consultation room",
      "requiredQuantity": 12,
      "requiredAreaPerUnit": 15,
      "priority": "important"
    }
  ],
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "programName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^PROG-" },
    "entityType": { "const": "space_program" },
    "programName": { "type": "string" },
    "buildingId": { "type": "string" },
    "programItems": { "type": "array" },
    "version": { "type": "string" }
  }
}
```

:::

**That's it.** The compiler automatically counts designed rooms and compares them against requirements.

---

## Example 2: Full Space Program (All Details)

**Hospital space program with department breakdown, priorities, and approval status:**

::: code-group

```md [Markdown]
---
id: "PROG-REGIONAL-HOSPITAL"
entityType: "space_program"
programName: "Functional Brief — Regional Hospital"
buildingId: "BLD-HOSPITAL-MAIN"

approvalStatus: "approved"
approvedBy: "Hospital Board of Directors"
approvalDate: "2026-01-15"

programItems:
  # --- Surgery Department ---
  - spaceTypeId: "ST-OPERATING-ROOM"
    spaceType: "operating_room"
    label: "Operating theatre"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    requiredTotalArea: 180
    priority: "critical"
    departmentId: "DEPT-SURGERY"
    levelPreference: ["LVL-02"]
    notes: "Including 1 hybrid theatre with angiography"

  - spaceType: "pre_op_room"
    label: "Pre-operative preparation room"
    requiredQuantity: 2
    requiredAreaPerUnit: 25
    requiredTotalArea: 50
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceType: "recovery_room"
    label: "Post-anaesthesia recovery room"
    requiredQuantity: 1
    requiredAreaPerUnit: 60
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  # --- Internal Medicine Ward ---
  - spaceTypeId: "ST-PATIENT-ROOM"
    spaceType: "patient_room"
    label: "Double patient room"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "At least 50% of rooms with balcony access"

  - spaceType: "patient_room_single"
    label: "Single patient room (isolation)"
    requiredQuantity: 8
    requiredAreaPerUnit: 18
    requiredTotalArea: 144
    priority: "important"
    departmentId: "DEPT-INTERNAL"
    notes: "Isolation rooms with anteroom and en-suite bathroom"

  # --- Emergency Department ---
  - spaceType: "triage_room"
    label: "Triage room"
    requiredQuantity: 2
    requiredAreaPerUnit: 12
    requiredTotalArea: 24
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "resuscitation_bay"
    label: "Resuscitation bay"
    requiredQuantity: 2
    requiredAreaPerUnit: 30
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "examination_room"
    label: "Examination room"
    requiredQuantity: 6
    requiredAreaPerUnit: 15
    requiredTotalArea: 90
    priority: "important"
    departmentId: "DEPT-EMERGENCY"

  # --- Diagnostics ---
  - spaceType: "ct_room"
    label: "CT scanner room"
    requiredQuantity: 2
    requiredAreaPerUnit: 40
    requiredTotalArea: 80
    priority: "critical"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Radiation shielding per IEC 61331"

  - spaceType: "mri_room"
    label: "MRI scanner room"
    requiredQuantity: 1
    requiredAreaPerUnit: 55
    requiredTotalArea: 55
    priority: "important"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Faraday cage, vibration isolation requirements"

  # --- Administration ---
  - spaceType: "consultation_room"
    label: "Consultation room"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    requiredTotalArea: 180
    priority: "important"
    departmentId: "DEPT-ADMIN"

  - spaceType: "office"
    label: "Administrative office"
    requiredQuantity: 6
    requiredAreaPerUnit: 18
    requiredTotalArea: 108
    priority: "standard"
    departmentId: "DEPT-ADMIN"

  # --- Common areas ---
  - spaceType: "waiting_area"
    label: "Waiting area"
    requiredQuantity: 4
    requiredAreaPerUnit: 35
    requiredTotalArea: 140
    priority: "important"

  - spaceType: "staff_room"
    label: "Staff break room"
    requiredQuantity: 3
    requiredAreaPerUnit: 20
    requiredTotalArea: 60
    priority: "standard"

totalRequiredArea: 2231
notes: "Program approved by Hospital Board. Revision after completion of concept design stage."

version: "2.0.0"
tags:
  - "hospital"
  - "program"
  - "room-schedule"
  - "healthcare"
---

# Functional Brief — Regional Hospital

Room schedule approved by the Hospital Board on 2026-01-15.

## Summary

| Department | Required rooms | Required area |
|------------|---------------|---------------|
| Surgery | 7 | 290 m² |
| Internal Medicine | 58 | 1,144 m² |
| Emergency | 10 | 174 m² |
| Diagnostics | 3 | 135 m² |
| Administration | 18 | 288 m² |
| Common areas | 7 | 200 m² |
| **Total** | **103** | **2,231 m²** |

## Status

- **Approval:** Yes (2026-01-15, Hospital Board)
- **Next revision:** After completion of concept design stage
```

```yaml [YAML]
id: "PROG-REGIONAL-HOSPITAL"
entityType: "space_program"
programName: "Functional Brief — Regional Hospital"
buildingId: "BLD-HOSPITAL-MAIN"

approvalStatus: "approved"
approvedBy: "Hospital Board of Directors"
approvalDate: "2026-01-15"

programItems:
  - spaceTypeId: "ST-OPERATING-ROOM"
    spaceType: "operating_room"
    label: "Operating theatre"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    requiredTotalArea: 180
    priority: "critical"
    departmentId: "DEPT-SURGERY"
    levelPreference: ["LVL-02"]
    notes: "Including 1 hybrid theatre with angiography"

  - spaceType: "pre_op_room"
    label: "Pre-operative preparation room"
    requiredQuantity: 2
    requiredAreaPerUnit: 25
    requiredTotalArea: 50
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceType: "recovery_room"
    label: "Post-anaesthesia recovery room"
    requiredQuantity: 1
    requiredAreaPerUnit: 60
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceTypeId: "ST-PATIENT-ROOM"
    spaceType: "patient_room"
    label: "Double patient room"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "At least 50% of rooms with balcony access"

  - spaceType: "patient_room_single"
    label: "Single patient room (isolation)"
    requiredQuantity: 8
    requiredAreaPerUnit: 18
    requiredTotalArea: 144
    priority: "important"
    departmentId: "DEPT-INTERNAL"
    notes: "Isolation rooms with anteroom and en-suite bathroom"

  - spaceType: "triage_room"
    label: "Triage room"
    requiredQuantity: 2
    requiredAreaPerUnit: 12
    requiredTotalArea: 24
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "resuscitation_bay"
    label: "Resuscitation bay"
    requiredQuantity: 2
    requiredAreaPerUnit: 30
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "examination_room"
    label: "Examination room"
    requiredQuantity: 6
    requiredAreaPerUnit: 15
    requiredTotalArea: 90
    priority: "important"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "ct_room"
    label: "CT scanner room"
    requiredQuantity: 2
    requiredAreaPerUnit: 40
    requiredTotalArea: 80
    priority: "critical"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Radiation shielding per IEC 61331"

  - spaceType: "mri_room"
    label: "MRI scanner room"
    requiredQuantity: 1
    requiredAreaPerUnit: 55
    requiredTotalArea: 55
    priority: "important"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Faraday cage, vibration isolation requirements"

  - spaceType: "consultation_room"
    label: "Consultation room"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    requiredTotalArea: 180
    priority: "important"
    departmentId: "DEPT-ADMIN"

  - spaceType: "office"
    label: "Administrative office"
    requiredQuantity: 6
    requiredAreaPerUnit: 18
    requiredTotalArea: 108
    priority: "standard"
    departmentId: "DEPT-ADMIN"

  - spaceType: "waiting_area"
    label: "Waiting area"
    requiredQuantity: 4
    requiredAreaPerUnit: 35
    requiredTotalArea: 140
    priority: "important"

  - spaceType: "staff_room"
    label: "Staff break room"
    requiredQuantity: 3
    requiredAreaPerUnit: 20
    requiredTotalArea: 60
    priority: "standard"

totalRequiredArea: 2231
notes: "Program approved by Hospital Board. Revision after completion of concept design stage."

version: "2.0.0"
tags:
  - "hospital"
  - "program"
  - "room-schedule"
  - "healthcare"
```

```json [JSON]
{
  "id": "PROG-REGIONAL-HOSPITAL",
  "entityType": "space_program",
  "programName": "Functional Brief — Regional Hospital",
  "buildingId": "BLD-HOSPITAL-MAIN",
  "approvalStatus": "approved",
  "approvedBy": "Hospital Board of Directors",
  "approvalDate": "2026-01-15",
  "programItems": [
    {
      "spaceTypeId": "ST-OPERATING-ROOM",
      "spaceType": "operating_room",
      "label": "Operating theatre",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 45,
      "requiredTotalArea": 180,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY",
      "levelPreference": ["LVL-02"],
      "notes": "Including 1 hybrid theatre with angiography"
    },
    {
      "spaceType": "pre_op_room",
      "label": "Pre-operative preparation room",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 25,
      "requiredTotalArea": 50,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY"
    },
    {
      "spaceType": "recovery_room",
      "label": "Post-anaesthesia recovery room",
      "requiredQuantity": 1,
      "requiredAreaPerUnit": 60,
      "requiredTotalArea": 60,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY"
    },
    {
      "spaceTypeId": "ST-PATIENT-ROOM",
      "spaceType": "patient_room",
      "label": "Double patient room",
      "requiredQuantity": 50,
      "requiredAreaPerUnit": 20,
      "requiredTotalArea": 1000,
      "priority": "critical",
      "departmentId": "DEPT-INTERNAL",
      "levelPreference": ["LVL-02", "LVL-03", "LVL-04"],
      "notes": "At least 50% of rooms with balcony access"
    },
    {
      "spaceType": "patient_room_single",
      "label": "Single patient room (isolation)",
      "requiredQuantity": 8,
      "requiredAreaPerUnit": 18,
      "requiredTotalArea": 144,
      "priority": "important",
      "departmentId": "DEPT-INTERNAL",
      "notes": "Isolation rooms with anteroom and en-suite bathroom"
    },
    {
      "spaceType": "triage_room",
      "label": "Triage room",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 12,
      "requiredTotalArea": 24,
      "priority": "critical",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "resuscitation_bay",
      "label": "Resuscitation bay",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 30,
      "requiredTotalArea": 60,
      "priority": "critical",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "examination_room",
      "label": "Examination room",
      "requiredQuantity": 6,
      "requiredAreaPerUnit": 15,
      "requiredTotalArea": 90,
      "priority": "important",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "ct_room",
      "label": "CT scanner room",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 40,
      "requiredTotalArea": 80,
      "priority": "critical",
      "departmentId": "DEPT-RADIOLOGY",
      "notes": "Radiation shielding per IEC 61331"
    },
    {
      "spaceType": "mri_room",
      "label": "MRI scanner room",
      "requiredQuantity": 1,
      "requiredAreaPerUnit": 55,
      "requiredTotalArea": 55,
      "priority": "important",
      "departmentId": "DEPT-RADIOLOGY",
      "notes": "Faraday cage, vibration isolation requirements"
    },
    {
      "spaceType": "consultation_room",
      "label": "Consultation room",
      "requiredQuantity": 12,
      "requiredAreaPerUnit": 15,
      "requiredTotalArea": 180,
      "priority": "important",
      "departmentId": "DEPT-ADMIN"
    },
    {
      "spaceType": "office",
      "label": "Administrative office",
      "requiredQuantity": 6,
      "requiredAreaPerUnit": 18,
      "requiredTotalArea": 108,
      "priority": "standard",
      "departmentId": "DEPT-ADMIN"
    },
    {
      "spaceType": "waiting_area",
      "label": "Waiting area",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 35,
      "requiredTotalArea": 140,
      "priority": "important"
    },
    {
      "spaceType": "staff_room",
      "label": "Staff break room",
      "requiredQuantity": 3,
      "requiredAreaPerUnit": 20,
      "requiredTotalArea": 60,
      "priority": "standard"
    }
  ],
  "totalRequiredArea": 2231,
  "notes": "Program approved by Hospital Board. Revision after completion of concept design stage.",
  "version": "2.0.0",
  "tags": ["hospital", "program", "room-schedule", "healthcare"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "programName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^PROG-" },
    "entityType": { "const": "space_program" },
    "programName": { "type": "string" },
    "buildingId": { "type": "string" },
    "programItems": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "spaceType": { "type": "string" },
          "requiredQuantity": { "type": "integer" },
          "requiredAreaPerUnit": { "type": "number" },
          "priority": { "type": "string", "enum": ["critical", "important", "standard", "optional"] }
        }
      }
    },
    "version": { "type": "string" }
  }
}
```

:::

## Compiler Behaviour

The SBM compiler handles space program entities as follows:

| Feature | Behaviour |
|---------|-----------|
| **Parsing** | Recognises entity type `space_program` with ID prefix `PROG-` |
| **Grouping** | Collects into the `entities.space_programs` array |
| **Designed count** | Counts Space entities matching each `spaceType` in `programItems` and sets `designedQuantity` |
| **Area calculation** | Sums `netArea` of matching spaces into `designedTotalArea` |
| **Compliance** | Calculates `compliance` per item: `quantityMet`, `areaMet`, `percentage` |
| **Overall compliance** | Calculates `overallCompliance` with priority weighting (critical 3x, important 2x, standard 1x) |
| **Referential integrity** | Warns when `buildingId`, `departmentId`, or `spaceTypeId` references missing entities |

## Program Compliance Report

After compilation the compiler generates a report comparing requirements against the design:

```json
{
  "programCompliance": {
    "programId": "PROG-HOSPITAL-MAIN",
    "overallPercentage": 94,
    "status": "partial",
    "items": [
      {
        "spaceType": "patient_room",
        "label": "Patient room",
        "required": 50,
        "designed": 48,
        "quantityMet": false,
        "deficit": 2,
        "requiredArea": 1000,
        "designedArea": 972,
        "areaMet": false,
        "priority": "critical"
      },
      {
        "spaceType": "operating_room",
        "label": "Operating theatre",
        "required": 4,
        "designed": 4,
        "quantityMet": true,
        "deficit": 0,
        "requiredArea": 180,
        "designedArea": 185,
        "areaMet": true,
        "priority": "critical"
      }
    ]
  }
}
```

**Compliance statuses:** `full` (100% of requirements met), `partial` (>80%), `insufficient` (<80%)

## How Space Program Connects to Other Entities

```
Space Program (PROG-HOSPITAL-MAIN)
  +-- Building (BLD-HOSPITAL-MAIN)          <-- via buildingId
  +-- requires: Space Type (ST-OPERATING-ROOM)  <-- via spaceTypeId
  +-- requires: Space Type (ST-PATIENT-ROOM)
  +-- compiler compares against:
       +-- Space (SP-...-OR-01)    <-- spaceType = "operating_room"
       +-- Space (SP-...-OR-02)    <-- spaceType = "operating_room"
       +-- Space (SP-...-PAT-01)   <-- spaceType = "patient_room"
       +-- ... (48 patient rooms)
       +-- Space (SP-...-PAT-48)
```

**Forward references (you write):**
- `buildingId` -- which building this program applies to
- `programItems[].spaceTypeId` -- reference to a Space Type
- `programItems[].departmentId` -- reference to a department

**Back-references (compiler computes):**
- `designedQuantity` -- how many rooms of each type actually exist
- `designedTotalArea` -- total area of designed rooms
- `compliance` -- object with compliance status

::: tip When to Add a Space Program
- **Phase 1 (Initiation):** Create an initial program with client requirements (requiredQuantity, priority)
- **Phase 2 (Concept):** Add areas (requiredAreaPerUnit) and level preferences
- **Phase 3 (Preliminary design):** Program approved by client. Compiler starts reporting compliance
- **Phase 4-5 (Detailed/Technical design):** Verify that designed >= required. Revise the program if requirements have changed
:::

## BIM Mapping

The Space Program has no direct IFC counterpart -- it is an informational entity for design validation:

| SBM Field | IFC Property |
|-----------|-------------|
| `id` | No counterpart -- purely informational entity |
| `programName` | None -- the program exists only in SBM |
| `programItems[].spaceType` | Linked via `IfcSpace.ObjectType` of designed spaces |
| `compliance` | None -- calculated on the SBM side, can be exported to a report |

::: tip For Architects: Why No IFC Mapping?
The space program is a pre-design tool -- it defines **what should be built**, not **what exists** in the BIM model. IFC mapping applies to designed spaces (IfcSpace), not programmatic requirements. The compiler compares the program against the actual IfcSpace entities in the model.
:::

## See Also

- **[Space Type](/en/documentation/entities/space-type)** -- Specification templates for room types
- **[Space](/en/documentation/entities/space)** -- Designed rooms that the compiler compares against the program
- **[Building](/en/documentation/entities/building)** -- The building this program applies to (with departments field)
