---
title: Data Governance
description: How to capture, process, and trace raw project data from emails, PDFs, audio recordings, site surveys, and other sources into structured SBM entities.
---

# Data Governance

An SBM model is only as reliable as the data that feeds it. In practice, building data does not arrive in neat YAML frontmatter -- it comes as client emails, PDF room schedules, audio recordings from site walks, scanned consultant reports, and photos taken on a phone. Without clear rules for capturing, filing, and tracing that raw data, errors creep in and nobody can tell where a number came from six months later.

This page defines how raw project data enters the documentation system, how it is processed into SBM entities, and how every data point stays traceable back to its source.

## Data Source Types

| Source | Typical format | Origin | Primary phases | SBM target |
|--------|---------------|--------|---------------|------------|
| Client brief | PDF, Word | Client / investor | Initiation | Spaces, Requirements, Building |
| Room schedule | Excel, PDF | Client / architect | Initiation, Concept | Spaces (bulk) |
| Site survey | DWG, PDF, point cloud | Surveyor | Initiation, As-Built | Building, Levels, Spaces |
| Design meeting | Audio, handwritten notes | Project team | All phases | Requirements, design decisions |
| Consultant report | PDF | Structural / MEP / fire | Schematic, Design Dev. | Zones, Systems, Requirements |
| Manufacturer spec sheet | PDF | Supplier / distributor | Design Dev. | Asset Types, Asset Instances |
| Email correspondence | EML, MSG, PDF print | Any stakeholder | All phases | Requirements, change requests |
| Site photos / video | JPG, MP4 | Site team | Construction, As-Built | Verification evidence |
| Regulatory documents | PDF | Government / standards body | Initiation, Schematic | Requirements |
| BIM model | IFC, RVT, PLN | BIM team | Schematic onward | Spaces, Zones (via bim-sync) |
| LiDAR / 3D scan | LAS, E57, RCP | Survey team | As-Built | Verified dimensions |

::: tip
Not every project uses every source type. Scale this framework to your project. A small residential project may only deal with client briefs, emails, and photos. A hospital project will use all of the above.
:::

## Collection Standards by Source Type

### Text Documents (Briefs, Reports, Schedules)

**Naming convention:** `{YYYY-MM-DD}_{source}_{description}.{ext}`

Examples:
- `2026-01-15_client_functional-program-v2.pdf`
- `2026-02-10_structural_column-grid-report.pdf`
- `2026-03-01_mep_hvac-load-calculations.xlsx`

**Storage:** `raw-data/client-briefs/` or `raw-data/consultant-reports/{discipline}/`

**Extraction checklist:**

| Document type | Data to extract | Target SBM entity |
|--------------|----------------|-------------------|
| Client brief | Project name, scope, budget, timeline | Building, project metadata |
| Room schedule | Room names, areas, heights, functions | Spaces (one card per room) |
| Functional program | Occupancy requirements, adjacencies | Spaces, Requirements |
| Structural report | Load-bearing zones, column grids | Zones, Requirements |
| MEP report | HVAC zones, electrical loads, plumbing | Systems, Zones |
| Fire safety report | Fire zones, evacuation routes, ratings | Zones, Requirements |

**Source attribution in YAML:**

```yaml
dataSource:
  type: "document"
  file: "raw-data/client-briefs/2026-01-15_client_functional-program-v2.pdf"
  page: 12
  extractedBy: "Jan Kowalski"
  extractedDate: "2026-01-20"
```

### Audio Recordings (Site Walks, Meetings)

**Naming convention:** `{YYYY-MM-DD}_{type}_{description}.{ext}`

Examples:
- `2026-03-15_site-walk_level-01-inspection.m4a`
- `2026-03-20_design-meeting_hvac-zoning.m4a`

**Storage:** `raw-data/meeting-notes/audio/` with companion transcripts in `raw-data/meeting-notes/transcripts/`

**Recording requirements:**
- State date, time, location, and participants at the start of each recording
- When recording site conditions, state the space ID or room number for reference
- Maximum 60 minutes per file -- split longer sessions

**Transcription workflow:**
1. Record audio during meeting or site walk
2. Transcribe (manual or AI-assisted)
3. Review transcript for accuracy -- flag uncertain passages
4. Extract actionable data points into an extraction log
5. Create or update SBM entities with extracted data
6. Reference the transcript file in entity YAML

**Extraction log template:**

| Timestamp | Speaker | Data point | Confidence | Target entity | Action |
|-----------|---------|-----------|------------|--------------|--------|
| 00:12:30 | Architect | "Bedroom needs minimum 14 m2" | High | SP-BLD-01-L01-001 | Update designArea |
| 00:15:45 | Fire eng. | "This corridor is ZL-IV" | High | ZONE-FIRE-ZL-IV | Create zone card |
| 00:22:10 | Client | "Maybe 3 bedrooms, maybe 4" | Low | -- | Log as open question |

**Source attribution:**

```yaml
dataSource:
  type: "audio"
  file: "raw-data/meeting-notes/audio/2026-03-15_site-walk_level-01-inspection.m4a"
  transcript: "raw-data/meeting-notes/transcripts/2026-03-15_site-walk_level-01-inspection.md"
  timestamp: "00:12:30"
  speaker: "Architect"
  extractedBy: "Anna Nowak"
  extractedDate: "2026-03-16"
```

### Email Correspondence

**Archiving workflow:**
1. Save the email as PDF or EML to `raw-data/correspondence/emails/`
2. Name: `{YYYY-MM-DD}_{sender-surname}_{subject-slug}.pdf`
3. If the email contains attachments with project data, save those separately in the appropriate `raw-data/` subfolder

Examples:
- `2026-02-05_kowalski_room-schedule-update.pdf`
- `2026-02-05_kowalski_room-schedule-v3.xlsx` (attachment, saved to `raw-data/client-briefs/`)

**What to extract:** Decisions, requirement changes, dimensional data, approval confirmations, scope changes.

::: warning
Emails are informal by nature. Always confirm verbal or email-based decisions in a formal document (meeting minutes, change request) before updating SBM entities. Mark email-sourced data with confidence level `stated` or `estimated` unless formally confirmed.
:::

**Source attribution:**

```yaml
dataSource:
  type: "email"
  file: "raw-data/correspondence/emails/2026-02-05_kowalski_room-schedule-update.pdf"
  sender: "Jan Kowalski"
  date: "2026-02-05"
  subject: "Updated room schedule for Level 01"
  extractedBy: "Anna Nowak"
  extractedDate: "2026-02-06"
```

### PDFs and Scanned Documents

**OCR requirements:** Scanned documents must be OCR-processed before filing. Save the OCR version alongside the original scan. Name the OCR version with a `_ocr` suffix.

**Filing convention:**
- Manufacturer specs: `raw-data/manufacturer-specs/{manufacturer}_{product}.pdf`
- Regulatory: `raw-data/regulatory/{code}_{section}.pdf`
- Consultant: `raw-data/consultant-reports/{discipline}/{date}_{description}.pdf`

**Extraction checklist by type:**

| PDF type | Key data points to extract |
|----------|---------------------------|
| Manufacturer spec | Model number, dimensions, weight, power, maintenance intervals, warranty |
| Regulatory document | Section numbers, limit values, verification methods, applicable space types |
| Consultant report | Zone boundaries, system capacities, load values, compliance status |
| As-built drawing | Verified dimensions, material specs, installation details |

### Photos, Videos and Site Scans

**Photo naming:** `{YYYY-MM-DD}_{building}_{level}_{space}_{seq}.jpg`

Examples:
- `2026-06-10_BLD-01_L01_SP-001_01.jpg`
- `2026-06-10_BLD-01_L01_SP-001_02.jpg`
- `2026-06-10_BLD-01_L01_corridor_01.jpg`

**Minimum metadata:**
- Date and time (embedded EXIF or in filename)
- Building and level identifier
- Space or area identifier
- Photographer name (in extraction log or companion file)

**360-degree scans:** Store in `raw-data/site-surveys/scans/` with a companion JSON or CSV linking scan positions to SBM space IDs.

### Point Cloud and Survey Data

**File formats:** LAS, LAZ (compressed), E57, RCP (Autodesk Recap)

**Storage:** `raw-data/site-surveys/point-clouds/`

**Accuracy documentation:** Every survey dataset must include:
- Equipment used (scanner model, total station)
- Accuracy specification (e.g., +/- 2mm at 10m)
- Survey date and surveyor name
- Coordinate system and datum

**How survey data feeds SBM:**
- Space `designArea` and `designHeight` updated from measured values
- Space `lifecycleState` changed from `design` to `operational` or `as_built`
- Confidence level set to `measured`

## Data Processing Pipeline

```
Raw Sources                          Structured SBM
(emails, PDFs, audio, photos)        (Markdown + YAML)

  1. CAPTURE
     Save to raw-data/ folder
     Apply naming convention
     ↓
  2. EXTRACT
     Pull structured data points
     Fill extraction log
     Assign confidence level
     ↓
  3. AUTHOR
     Create/update SBM Markdown
     Add dataSource reference
     Set confidence level
     ↓
  4. VALIDATE
     Run compiler (--validate-only)
     Check required fields
     Cross-reference relationships
     ↓
  5. REVIEW
     Peer review of new/changed
     Verify source attribution
     QA gate sign-off
     ↓
  6. COMPILE
     Full compilation → sbm.json
     Generate outputs
```

::: info
Steps 1-2 (Capture and Extract) are where data governance adds value. Steps 3-6 are covered by the existing [Authoring Guide](/en/documentation/authoring/), [Compiler](/en/documentation/compiler/), and [Review Procedures](/en/quality/review-procedures).
:::

## Data Quality Framework

| Dimension | Definition | How to verify |
|-----------|-----------|---------------|
| **Accuracy** | Data matches physical reality or stated intent | Cross-check against source documents; survey verification for dimensions |
| **Completeness** | All required fields are filled | Compiler validation; phase gate checklists |
| **Consistency** | No contradictions between entities | Compiler cross-reference checks; coordination reviews |
| **Timeliness** | Data reflects current state, not outdated information | Check `lastReviewed` dates; flag data older than phase threshold |
| **Traceability** | Source is documented for every data point | Verify `dataSource` field present; audit trail review |

### Confidence Levels

Assign a confidence level to data based on how it was obtained:

| Level | Label | Description | Example |
|-------|-------|-------------|---------|
| 1 | **Measured** | Verified by physical measurement or survey | As-built survey: area = 14.32 m2 |
| 2 | **Calculated** | Derived from measured inputs using known formulas | Volume = area x height |
| 3 | **Specified** | Stated in formal project documents (brief, specs) | Client brief: "bedroom min. 14 m2" |
| 4 | **Estimated** | Professional judgement, not formally documented | Architect estimate: "approximately 15 m2" |
| 5 | **Assumed** | Placeholder pending confirmation | Default: standard bedroom = 14 m2 |

**In YAML frontmatter:**

```yaml
designArea: 14.5
dataConfidence:
  designArea: "specified"    # From client brief
  designHeight: "measured"   # From site survey
  maxOccupants: "assumed"    # Pending fire engineer input
```

::: warning
Data at confidence level 4 (estimated) or 5 (assumed) must be flagged for verification before the project passes the relevant phase gate. No assumed data should remain after the Construction Documents phase.
:::

## Data Traceability

Every SBM entity should be traceable to its source. The `dataSource` field in YAML frontmatter links the entity back to the raw data.

**Example: Tracing a space area value**

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
dataSource:
  type: "document"
  file: "raw-data/client-briefs/2026-01-15_client_functional-program-v2.pdf"
  page: 12
  extractedBy: "Jan Kowalski"
  extractedDate: "2026-01-20"
dataConfidence:
  designArea: "specified"
---
```

**Audit trail:** When data is updated, the previous source should be recorded in the version history:

```yaml
version: "1.2"
version_history:
  - version: "1.2"
    date: "2026-06-15"
    author: "Anna Nowak"
    note: "Updated designArea from 14.5 to 14.32 based on as-built survey"
    dataSource:
      type: "survey"
      file: "raw-data/site-surveys/point-clouds/2026-06-10_BLD-01_L01.las"
  - version: "1.0"
    date: "2026-01-20"
    author: "Jan Kowalski"
    note: "Initial creation from client functional program"
```

## Phase-Specific Data Requirements

| Phase | Primary data sources | Key data to collect | Responsible |
|-------|---------------------|--------------------|--------------------|
| 1. Initiation | Client brief, site survey | Project scope, site constraints, functional program | Project Manager |
| 2. Concept | Design workshops, sketches | Spatial program, massing, preliminary areas | Architect |
| 3. Schematic | Consultant reports, code analysis | Zone definitions, system requirements, regulatory refs | Design Team |
| 4. Design Dev. | Manufacturer specs, coordination meetings | Asset specifications, detailed system design | Discipline Leads |
| 5. Construction Docs | Final specifications, coordination | Complete SBM with all cross-references | BIM Coordinator |
| 6. Construction | Site photos, field measurements, RFIs | Progress verification, issue documentation | Site Supervisor |
| 7. As-Built | Survey data, point clouds, commissioning | Verified dimensions, installed equipment data | Surveyor + FM |
| 8. Handover | O&M manuals, commissioning certificates | Asset register, maintenance schedules, warranties | FM Manager |

## Folder Structure for Raw Data

```
raw-data/
├── client-briefs/                    # Client-provided documents
├── consultant-reports/               # Third-party reports
│   ├── structural/
│   ├── mep/
│   ├── fire-safety/
│   └── acoustic/
├── meeting-notes/                    # Meeting records
│   ├── audio/                        # Audio recordings
│   └── transcripts/                  # Text transcripts
├── site-surveys/                     # Survey and measurement data
│   ├── dwg/                          # CAD drawings
│   ├── point-clouds/                 # LiDAR / 3D scan data
│   ├── photos/                       # Site photographs
│   └── scans/                        # 360-degree scans
├── manufacturer-specs/               # Product specification sheets
├── regulatory/                       # Regulatory documents
└── correspondence/                   # Project communication
    └── emails/                       # Archived email threads
```

::: tip
Create this folder structure at project start during Phase 1 (Initiation). Add it to your [Document Control](./document-control) register so all team members know where to file incoming data.
:::

## Data Governance Checklist

Use this checklist at project start and verify at each phase gate:

- [ ] Raw data folder structure created and shared with team
- [ ] File naming conventions documented and agreed
- [ ] Data source attribution (`dataSource` field) required in all SBM entities
- [ ] Audio recording protocol defined (naming, storage, transcription)
- [ ] Email archiving workflow documented
- [ ] Photo naming and metadata standards set
- [ ] Confidence levels defined and marking agreed
- [ ] Data quality review step included in [phase gate checklists](/en/quality/phase-gates)
- [ ] Roles assigned: who captures, who extracts, who reviews
- [ ] Backup and retention policy for raw data established

## Related Pages

- [Document Control](./document-control) -- File naming, versioning, and approval gates
- [Governance](./governance) -- RACI matrix defining who captures and reviews data
- [Change Management](./change-management) -- How data changes trigger change requests
- [Review Procedures](/en/quality/review-procedures) -- Peer review includes data source verification
- [Authoring Guide](/en/documentation/authoring/) -- How to create SBM entity cards from extracted data
- [Compiler](/en/documentation/compiler/) -- Validation and compilation pipeline
