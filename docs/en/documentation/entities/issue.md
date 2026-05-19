# Issue (Construction Administration)

## What This Is

An **Issue file** documents a single administrative event on the construction site: a request for information (RFI), change order, submittal, inspection, punch list item, field observation, non-conformance report, or design clarification. Examples: "RFI-007: Basement wall layer composition", "CO-003: Window specification change".

::: tip For Architects
**Problem:** The construction manager asks "How many RFIs are open?" or "Does the window change affect the schedule?" -- you dig through emails, Excel spreadsheets, and PlanGrid.

**Old way:** Separate RFI logs in Excel, change orders in PDF, punch lists on paper forms. Every stakeholder has a different version of the truth.

**With issues:** Open `issues/iss-rfi-007.md` -- status, assignment, response, cost and schedule impact all in one file. **A single source of truth for all construction administration.**

**One issue file = full case history from submission to close-out.**
:::

An **Issue** represents a formal administrative event in the construction process. It covers requests for information (RFIs), change orders, submittals, inspections, punch list items, field observations, non-conformance reports, and design clarifications. Issues enable tracking of correspondence, cost and schedule impact, and integration with the BCF format for BIM coordination.

## Purpose

Issues define:
- Formal construction correspondence (RFIs, change orders, submittals)
- Status tracking and responsibility assignment
- Cost and schedule impact of changes
- Inspections and acceptance protocols
- Punch list items and close-out observations
- Field observations and non-conformance reports
- Integration with BCF (BIM Collaboration Format) for model coordination

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique issue identifier | `"ISS-RFI-007"` |
| `entityType` | string | Must be `"issue"` | `"issue"` |
| `issueTitle` | string | Human-readable issue title | `"Basement wall layer composition"` |
| `issueType` | string | Issue type (see enum below) | `"rfi"` |
| `status` | string | Current status (see enum below) | `"submitted"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: Issue identifier with `ISS-` prefix (e.g., `ISS-RFI-007`, `ISS-CO-003`, `ISS-PL-012`)
- **issueTitle**: Short, descriptive title ("Basement wall layer composition", "Window specification change")
- **issueType**: Category -- `rfi` (request for information), `change_order` (change), `submittal` (submission for approval), `inspection` (inspection), `punch_list` (deficiency)
- **status**: Current state -- `draft`, `submitted`, `under_review`, `responded`, `approved`, `rejected`, `closed`, `void`
- **version**: Track changes

**You need ONLY these 5 fields.** Assignment, response, cost impact -- all optional, added as the case evolves.
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `issueNumber` | number | Sequential number within the type (e.g., 7 for RFI-007) |
| `priority` | string | Priority: `low`, `medium`, `high`, `critical` |
| `description` | string | Detailed issue description |
| `buildingId` | string | Reference to a building |
| `relatedEntityIds` | array | IDs of related entities (spaces, systems, assets) |
| `constructionPackageId` | string | Reference to a construction package |
| `initiatedBy` | object | Who raised it (name, organization, role, date) |
| `assignedTo` | object | Who is responsible (name, organization, role) |
| `dueDate` | string | Response/resolution deadline (ISO 8601) |
| `response` | object | Response (respondedBy, responseDate, responseText) |
| `costImpact` | object | Cost impact (estimatedCost, approvedCost, currency) |
| `scheduleImpact` | object | Schedule impact (estimatedDays, criticalPath) |
| `bcfReference` | object | BCF reference (topicGuid, viewpointGuid, serverUrl) |
| `attachments` | array | Attachments (fileName, fileType, url, description) |
| `tags` | array | Arbitrary classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For correspondence tracking (most important):**
- **initiatedBy** -- Who raised the issue and when (name, organization, role, date)
- **assignedTo** -- Who is responsible for the response
- **dueDate** -- Deadline for the response
- **response** -- Response text with date and author

**For change control:**
- **costImpact** -- Estimated and approved cost of the change
- **scheduleImpact** -- How many days of delay, whether on the critical path
- **constructionPackageId** -- Which work package is affected

**For BIM coordination:**
- **bcfReference** -- Link to a BCF topic in the BIM model
- **relatedEntityIds** -- Related spaces, systems, assets

**Most commonly:** Fill in `initiatedBy`, `assignedTo`, `dueDate`. Add the rest as the case develops.
:::

## Issue Types (Enum)

```typescript
type IssueType =
  | "rfi"                    // Request for Information
  | "change_order"           // Change Order
  | "submittal"              // Submittal (material, equipment for approval)
  | "inspection"             // Inspection
  | "punch_list"             // Punch list item / close-out deficiency
  | "field_observation"      // Field observation
  | "non_conformance"        // Non-conformance with design/specification
  | "design_clarification";  // Design clarification
```

## Issue Statuses (Enum)

```typescript
type IssueStatus =
  | "draft"          // Draft -- not submitted
  | "submitted"      // Submitted -- awaiting review
  | "under_review"   // Under review
  | "responded"      // Response provided
  | "approved"       // Approved (for changes, submittals)
  | "rejected"       // Rejected
  | "closed"         // Closed -- matter resolved
  | "void";          // Void -- no longer applicable
```

## Example 1: First Issue File (Minimal)

**Simplest issue -- an RFI about a structural detail:**

::: code-group

```md [Markdown]
File: issues/iss-rfi-007.md

---
id: "ISS-RFI-007"
entityType: "issue"
issueTitle: "Basement wall layer composition"
issueType: "rfi"
status: "submitted"
version: "1.0.0"

# Context
issueNumber: 7
priority: "high"
description: "Please confirm the layer composition of the basement wall at the junction with the foundation slab. Drawings A-201 and S-105 show different solutions."
buildingId: "BLD-01"

initiatedBy:
  name: "James Wilson"
  organization: "Turner Construction Co."
  role: "site manager"
  date: "2026-09-15"

assignedTo:
  name: "Sarah Chen"
  organization: "Foster + Partners"
  role: "project architect"

dueDate: "2026-09-22"
---

# RFI-007: Basement Wall Layer Composition

Please confirm the layer composition of the basement wall.
Drawings A-201 and S-105 show different solutions.
```

```yaml [YAML]
id: "ISS-RFI-007"
entityType: "issue"
issueTitle: "Basement wall layer composition"
issueType: "rfi"
status: "submitted"
version: "1.0.0"
issueNumber: 7
priority: "high"
description: "Please confirm the layer composition of the basement wall at the junction with the foundation slab. Drawings A-201 and S-105 show different solutions."
buildingId: "BLD-01"
initiatedBy:
  name: "James Wilson"
  organization: "Turner Construction Co."
  role: "site manager"
  date: "2026-09-15"
assignedTo:
  name: "Sarah Chen"
  organization: "Foster + Partners"
  role: "project architect"
dueDate: "2026-09-22"
```

```json [JSON]
{
  "id": "ISS-RFI-007",
  "entityType": "issue",
  "issueTitle": "Basement wall layer composition",
  "issueType": "rfi",
  "status": "submitted",
  "version": "1.0.0",
  "issueNumber": 7,
  "priority": "high",
  "description": "Please confirm the layer composition of the basement wall at the junction with the foundation slab. Drawings A-201 and S-105 show different solutions.",
  "buildingId": "BLD-01",
  "initiatedBy": {
    "name": "James Wilson",
    "organization": "Turner Construction Co.",
    "role": "site manager",
    "date": "2026-09-15"
  },
  "assignedTo": {
    "name": "Sarah Chen",
    "organization": "Foster + Partners",
    "role": "project architect"
  },
  "dueDate": "2026-09-22"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "issueTitle", "issueType", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ISS-" },
    "entityType": { "const": "issue" },
    "issueTitle": { "type": "string" },
    "issueType": {
      "type": "string",
      "enum": ["rfi", "change_order", "submittal", "inspection", "punch_list", "field_observation", "non_conformance", "design_clarification"]
    },
    "status": {
      "type": "string",
      "enum": ["draft", "submitted", "under_review", "responded", "approved", "rejected", "closed", "void"]
    },
    "version": { "type": "string" }
  }
}
```

:::

**That is all.** Response, cost and schedule impact are added as the case develops.

---

## Example 2: Full Issue (Change Order)

**File:** `issues/iss-co-003.md`

::: code-group

```md [Markdown]
---
entityType: "issue"
id: "ISS-CO-003"
issueTitle: "Window specification change -- north zone"
issueType: "change_order"
status: "approved"
version: "1.0.0"

issueNumber: 3
priority: "high"
description: "Change window specification in the north zone from aluminum to uPVC due to thermal performance requirements per IBC 2021 and cost optimization. Affects 24 windows on floors 1-4."
buildingId: "BLD-01"
relatedEntityIds:
  - "ENV-EW-01"
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
constructionPackageId: "CP-FACADE"

initiatedBy:
  name: "Robert Clarke"
  organization: "Foster + Partners"
  role: "lead designer"
  date: "2026-08-20"

assignedTo:
  name: "David Mitchell"
  organization: "Turner Construction Co."
  role: "site manager"

dueDate: "2026-09-03"

response:
  respondedBy:
    name: "David Mitchell"
    organization: "Turner Construction Co."
  responseDate: "2026-08-28"
  responseText: "Change approved. Supplier confirms availability of Schuco uPVC profiles within 3 weeks. Material cost reduced by $4,500, labor unchanged."

costImpact:
  estimatedCost: -4500
  approvedCost: -4500
  currency: "USD"
  description: "Material savings -- uPVC profiles cheaper than aluminum"

scheduleImpact:
  estimatedDays: 5
  criticalPath: false
  description: "5-day delay for uPVC profile delivery, but not on critical path"

bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  serverUrl: "https://bim.project-xyz.com/bcf"

attachments:
  - fileName: "window-comparison-alu-vs-upvc.pdf"
    fileType: "application/pdf"
    description: "Comparative analysis of aluminum vs uPVC -- thermal performance and cost"
  - fileName: "schuco-upvc-datasheet.pdf"
    fileType: "application/pdf"
    description: "Technical datasheet for Schuco uPVC profiles"

tags:
  - "change_order"
  - "facade"
  - "windows"
  - "cost_saving"
  - "thermal_performance"
---

# Change Order CO-003: Window Specification Change

Change window specification in the north zone from aluminum to uPVC.

## Justification

- Improved thermal performance (Uw from 1.3 to 0.9 W/m2K)
- Cost saving of $4,500 on materials
- Better compliance with energy code requirements

## Scope of Change

- 24 windows on floors 1-4 in the north zone
- Aluminum profiles replaced with Schuco uPVC
- No changes to opening dimensions
```

```yaml [YAML]
entityType: "issue"
id: "ISS-CO-003"
issueTitle: "Window specification change -- north zone"
issueType: "change_order"
status: "approved"
version: "1.0.0"
issueNumber: 3
priority: "high"
description: "Change window specification in the north zone from aluminum to uPVC due to thermal performance requirements per IBC 2021 and cost optimization. Affects 24 windows on floors 1-4."
buildingId: "BLD-01"
relatedEntityIds:
  - "ENV-EW-01"
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
constructionPackageId: "CP-FACADE"
initiatedBy:
  name: "Robert Clarke"
  organization: "Foster + Partners"
  role: "lead designer"
  date: "2026-08-20"
assignedTo:
  name: "David Mitchell"
  organization: "Turner Construction Co."
  role: "site manager"
dueDate: "2026-09-03"
response:
  respondedBy:
    name: "David Mitchell"
    organization: "Turner Construction Co."
  responseDate: "2026-08-28"
  responseText: "Change approved. Supplier confirms availability of Schuco uPVC profiles within 3 weeks. Material cost reduced by $4,500, labor unchanged."
costImpact:
  estimatedCost: -4500
  approvedCost: -4500
  currency: "USD"
  description: "Material savings -- uPVC profiles cheaper than aluminum"
scheduleImpact:
  estimatedDays: 5
  criticalPath: false
  description: "5-day delay for uPVC profile delivery, but not on critical path"
bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  serverUrl: "https://bim.project-xyz.com/bcf"
attachments:
  - fileName: "window-comparison-alu-vs-upvc.pdf"
    fileType: "application/pdf"
    description: "Comparative analysis of aluminum vs uPVC -- thermal performance and cost"
  - fileName: "schuco-upvc-datasheet.pdf"
    fileType: "application/pdf"
    description: "Technical datasheet for Schuco uPVC profiles"
tags:
  - "change_order"
  - "facade"
  - "windows"
  - "cost_saving"
  - "thermal_performance"
```

```json [JSON]
{
  "entityType": "issue",
  "id": "ISS-CO-003",
  "issueTitle": "Window specification change -- north zone",
  "issueType": "change_order",
  "status": "approved",
  "version": "1.0.0",
  "issueNumber": 3,
  "priority": "high",
  "description": "Change window specification in the north zone from aluminum to uPVC due to thermal performance requirements per IBC 2021 and cost optimization. Affects 24 windows on floors 1-4.",
  "buildingId": "BLD-01",
  "relatedEntityIds": ["ENV-EW-01", "SP-BLD-01-L01-001", "SP-BLD-01-L01-002"],
  "constructionPackageId": "CP-FACADE",
  "initiatedBy": {
    "name": "Robert Clarke",
    "organization": "Foster + Partners",
    "role": "lead designer",
    "date": "2026-08-20"
  },
  "assignedTo": {
    "name": "David Mitchell",
    "organization": "Turner Construction Co.",
    "role": "site manager"
  },
  "dueDate": "2026-09-03",
  "response": {
    "respondedBy": {
      "name": "David Mitchell",
      "organization": "Turner Construction Co."
    },
    "responseDate": "2026-08-28",
    "responseText": "Change approved. Supplier confirms availability of Schuco uPVC profiles within 3 weeks. Material cost reduced by $4,500, labor unchanged."
  },
  "costImpact": {
    "estimatedCost": -4500,
    "approvedCost": -4500,
    "currency": "USD",
    "description": "Material savings -- uPVC profiles cheaper than aluminum"
  },
  "scheduleImpact": {
    "estimatedDays": 5,
    "criticalPath": false,
    "description": "5-day delay for uPVC profile delivery, but not on critical path"
  },
  "bcfReference": {
    "topicGuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "serverUrl": "https://bim.project-xyz.com/bcf"
  },
  "attachments": [
    {
      "fileName": "window-comparison-alu-vs-upvc.pdf",
      "fileType": "application/pdf",
      "description": "Comparative analysis of aluminum vs uPVC -- thermal performance and cost"
    },
    {
      "fileName": "schuco-upvc-datasheet.pdf",
      "fileType": "application/pdf",
      "description": "Technical datasheet for Schuco uPVC profiles"
    }
  ],
  "tags": ["change_order", "facade", "windows", "cost_saving", "thermal_performance"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "issueTitle", "issueType", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ISS-" },
    "entityType": { "const": "issue" },
    "issueTitle": { "type": "string" },
    "issueType": {
      "type": "string",
      "enum": ["rfi", "change_order", "submittal", "inspection", "punch_list", "field_observation", "non_conformance", "design_clarification"]
    },
    "status": {
      "type": "string",
      "enum": ["draft", "submitted", "under_review", "responded", "approved", "rejected", "closed", "void"]
    },
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"]
    },
    "issueNumber": { "type": "integer" },
    "buildingId": { "type": "string" },
    "constructionPackageId": { "type": "string" },
    "costImpact": { "type": "object" },
    "scheduleImpact": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

## Status Flow

Typical issue status flow:

```
draft -> submitted -> under_review -> responded -> closed
                                    -> approved -> closed
                                    -> rejected -> closed
                         (at any time) -> void
```

**For RFIs:** `draft` -> `submitted` -> `under_review` -> `responded` -> `closed`

**For change orders:** `draft` -> `submitted` -> `under_review` -> `approved`/`rejected` -> `closed`

**For punch list items:** `draft` -> `submitted` -> `under_review` -> `responded` (resolved) -> `closed`

## BCF Integration

Issues can be linked to BCF (BIM Collaboration Format) topics for model coordination:

```yaml
bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  viewpointGuid: "f9e8d7c6-b5a4-3210-fedc-ba0987654321"
  serverUrl: "https://bim.project-xyz.com/bcf"
```

**What this provides:**
- Clicking an issue opens the corresponding view in the BIM model
- Geometric context for every issue
- Status synchronization between SBM and the BCF platform

## Cost Impact Tracking

Issues of type `change_order` track budget impact:

```yaml
costImpact:
  estimatedCost: -4500      # Negative = savings
  approvedCost: -4500
  currency: "USD"
  description: "Material savings"
```

**Aggregation logic:** The compiler sums `approvedCost` from all approved change orders and updates the total project budget.

## BIM Mapping

Issues do not have a direct IFC equivalent -- they connect to the BIM model through the BCF format:

| SBM Field | BCF Format | Description |
|-----------|------------|-------------|
| `id` | `Topic.ReferenceLink` | Reference to the SBM issue |
| `issueTitle` | `Topic.Title` | BCF topic title |
| `issueType` | `Topic.TopicType` | Topic type |
| `status` | `Topic.TopicStatus` | Topic status |
| `priority` | `Topic.Priority` | Priority |
| `assignedTo` | `Topic.AssignedTo` | Assignment |
| `dueDate` | `Topic.DueDate` | Deadline |
| `description` | `Topic.Description` | Description |
| `bcfReference.topicGuid` | `Topic.Guid` | BCF topic identifier |
| `bcfReference.viewpointGuid` | `Viewpoint.Guid` | Viewpoint identifier |

## See Also

- **[Construction Package](/en/documentation/entities/construction-package)** -- Issues relate to work packages
- **[Commissioning Test](/en/documentation/entities/commissioning-test)** -- Tests verify requirements, issues record problems
- **[Requirement](/en/documentation/entities/requirement)** -- Issues may concern requirement compliance
- **[Envelope](/en/documentation/entities/envelope)** -- RFIs often concern structural details
- **[System](/en/documentation/entities/system)** -- Change orders may affect MEP systems
