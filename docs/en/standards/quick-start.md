# Quick Start: Your First Space Document

::: tip 5-Minute Guide
Create your first building document and see the standard in action.
:::

## What You'll Create

In this guide, you will create a **Space document** -- a bedroom -- described with structured YAML metadata inside a Markdown file. Spaces are the fundamental building blocks of the **Semantic Building Model (SBM)**. Every room, corridor, and area in a building is represented as a Space document.

::: tip New in v0.1.1: Type/Instance Pattern
For projects with many similar spaces, you can use **Space Types** to define specifications once and reference them from instances. This guide shows the standalone approach. See [Type/Instance Pattern](#next-steps-type-instance-pattern) below for advanced usage.
:::

By the end, you will have two connected documents and a clear picture of how the entire standard works.

**Here is the finished file you will create:**

```markdown
spaces/bedroom-01.md
```

**And here is what the SBM compiler produces from it:**

```json
{
  "entityType": "space",
  "id": "SP-BLD-01-L01-001",
  "spaceName": "Bedroom 01",
  "designArea": 14.5,
  "zones": ["ZONE-FIRE-ZL-IV"],
  "requirements": ["REQ-PL-WT-ROOM-HEIGHT-001"],
  "complianceStatus": "pass"
}
```

One source file. Two audiences -- humans and machines.

---

## Prerequisites

- **A text editor** -- VS Code, Sublime Text, Notepad++, or anything you are comfortable with
- **Node.js** (optional) -- only needed if you want to run the SBM compiler for validation
- **Basic familiarity with Markdown** -- headings, lists, tables, and code blocks

::: info No Special Tools Required
The standard is built on plain-text Markdown. You do not need any proprietary software or plugins to get started.
:::

---

## Step 1: Set Up Your Project

Create a simple folder structure. Each document type gets its own directory:

```bash
mkdir my-project
mkdir my-project/spaces
mkdir my-project/zones
mkdir my-project/requirements
```

Your project should look like this:

```
my-project/
├── spaces/
├── zones/
└── requirements/
```

That is all you need. No configuration files, no build tools -- just folders and Markdown files.

---

## Step 2: Create a Space File

Create a new file at `spaces/bedroom-01.md` and paste the following content:

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
designArea: 14.5
designHeight: 2.70
unit: "m"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Space: Bedroom 01

A standard bedroom on the first floor with north-facing window.

## Design Parameters

| Parameter | Value | Unit |
|-----------|-------|------|
| Floor area | 14.5 | m² |
| Clear height | 2.70 | m |
| Window area | 3.2 | m² |

## Requirements

- Room height >= 2.50 m (WT 2021 § 132)
- Natural daylight required
- Acoustic insulation Class B
```

### Understanding the YAML Fields

Each field in the frontmatter serves a specific purpose:

| Field | Purpose | Example |
|-------|---------|---------|
| `entityType` | Declares what kind of document type this is (space, zone, system, etc.) | `"space"` |
| `id` | Unique identifier following the pattern `SP-{building}-{level}-{sequence}` | `"SP-BLD-01-L01-001"` |
| `spaceName` | Human-readable name for the space | `"Bedroom 01"` |
| `spaceType` | Classification from the standard's vocabulary | `"sleeping_space"` |
| `buildingId` | Which building this space belongs to | `"BLD-01"` |
| `levelId` | Which floor or storey this space sits on | `"LVL-01"` |
| `zoneIds` | List of zones that contain this space (fire, acoustic, HVAC, etc.) | `["ZONE-FIRE-ZL-IV"]` |
| `designArea` | Planned floor area in the specified unit | `14.5` |
| `designHeight` | Planned clear height in the specified unit | `2.70` |
| `requirements` | List of requirement IDs that apply to this space | `["REQ-PL-WT-ROOM-HEIGHT-001"]` |
| `version` | Semantic version for change tracking | `"1.0.0"` |
| `tags` | Freeform labels for filtering and search | `["residential", "sleeping"]` |

---

## Step 3: Understand the Structure

Every document file has two distinct parts:

### YAML Frontmatter (Machine-Readable)

The content between the `---` markers is structured YAML metadata. This is what the SBM compiler, AI agents, and BIM software read. It follows a strict schema so that tools can reliably extract building data.

```yaml
---
entityType: "space"
id: "SP-BLD-01-L01-001"
designArea: 14.5
# ... more structured fields
---
```

### Markdown Body (Human-Readable)

Everything after the closing `---` is standard Markdown. This is what architects, engineers, and clients read. It provides context, explanations, and visual tables that make sense to people.

```markdown
# Space: Bedroom 01

A standard bedroom on the first floor with north-facing window.
```

::: tip The Core Principle
Write once, serve both humans and machines. The YAML frontmatter and the Markdown body live in a single file. There is no duplication, no synchronization burden, and no drift between what the machine knows and what the human reads.
:::

---

## Step 4: Add a Zone

Documents become powerful when they reference each other. Create a second file at `zones/fire-zone-zl-iv.md`:

```markdown
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
levelIds:
  - "LVL-01"
  - "LVL-02"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 234"
    requirement: "Fire resistance REI 60"
version: "1.0.0"
---

# Zone: Fire Zone ZL-IV

Residential fire zone classification for the main building volume.

## Fire Requirements

| Element | Required Rating | Standard |
|---------|----------------|----------|
| Load-bearing walls | REI 60 | WT 2021 § 234 |
| Floor slabs | REI 60 | WT 2021 § 234 |
| Staircase walls | REI 120 | WT 2021 § 234 |
```

### How Are These Two Documents Connected?

Look back at your Bedroom 01 file. The `zoneIds` field includes `"ZONE-FIRE-ZL-IV"` -- that is the `id` of the zone you just created. This forward reference tells the compiler that Bedroom 01 belongs to Fire Zone ZL-IV.

The compiler automatically computes the reverse relationship too: Fire Zone ZL-IV **contains** Bedroom 01. You only declare the link in one place, and the full graph is built for you.

::: info Bidirectional References
You do not need to manually list every space inside a zone. The compiler reads the `zoneIds` from each space and assembles the complete membership list. This eliminates duplication and prevents inconsistencies.
:::

---

## Step 5: See It All Together

With just two files, you have already built a small piece of the Semantic Building Model:

```
Building (BLD-01)
└── Level 01 (LVL-01)
    └── Bedroom 01 (SP-BLD-01-L01-001)
        ├── Zone: Fire Zone ZL-IV
        └── Requirement: Room Height WT 2021
```

This is the **Semantic Building Model (SBM)** in action. Every room, zone, system, and requirement is a structured document that references other documents by ID. As you add more files -- more rooms, more zones, MEP systems, equipment -- the graph grows.

### What the Compiler Produces

When you run the SBM compiler across your project, it validates all references and generates several output files:

| Output | Purpose |
|--------|---------|
| `bim_mapping.json` | Parameters ready for import into Revit, ArchiCAD, and other BIM tools |
| `compliance_report.json` | Regulatory compliance status for every document and requirement |
| `asset_register.json` | Equipment and maintenance data for facility management |
| `twin_schema.json` | Digital twin sensor bindings and live-data mappings |

::: warning Broken References
If Bedroom 01 references a zone ID that does not exist in any zone file, the compiler will flag it as an error. This is intentional -- it catches mistakes early, before they reach the construction site.
:::

---

## Next Steps: Type/Instance Pattern

::: tip Advanced: For Projects with Many Similar Spaces
If you have **multiple similar rooms** (e.g., 20 identical bedrooms, 50 office cubicles), use the **type/instance pattern** introduced in SBM v0.1.1.
:::

### The Problem

Creating 20 bedrooms the way shown above means repeating the same requirements, finishes, and equipment specs 20 times. This is repetitive and hard to maintain.

### The Solution: Space Types

**1. Create a Space Type** (template - define once):

```markdown
templates/space-types/standard-bedroom.md
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD"
typeName: "Standard Bedroom"
spaceType: "sleeping_space"

# Requirements inherited by ALL instances
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# Standard finishes for this type
finishes:
  floor: "MAT-FLOOR-OAK-01"
  walls: "MAT-WALL-PAINT-WHITE"

# Occupancy profile
occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"

version: "1.0.0"
---
```

**2. Create Lightweight Instances** (reference the type):

```markdown
spaces/bedroom-01.md
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD"  # ← Reference to type!

# Only instance-specific data
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 14.5  # Actual area for this bedroom
---
```

### Benefits

| Approach | 20 Bedrooms | Maintenance |
|----------|-------------|-------------|
| **Without types** | 4,200 lines | Edit 20 files |
| **With types** | 3,125 lines (-26%) | Edit 1 type file |

✅ Define specs once
✅ Guaranteed consistency
✅ Update type → affects all instances

Learn more: [Space Types](/en/documentation/entities/space-type)

---

## What's Next

You have created your first space document and connected it to a fire zone. Here is where to go from here:

- [How It All Fits Together](/en/standards/how-it-works) -- Understand the full picture of the standard
- [Document Types Reference](/en/documentation/entities/) -- Learn about all document types including Space Types
- [Space Types](/en/documentation/entities/space-type) -- Use templates for repeating spaces
- [Browse Templates](/en/templates/) -- Copy-paste templates for every document type
- [See a Complete Example](/en/examples/green-terrace/) -- The Green Terrace building project with type/instance examples
- [Explore Project Phases](/en/standards/document-structure) -- The 8-phase workflow from concept to demolition

::: tip Keep Going
The best way to learn the standard is to model a real room from a project you are working on. Pick a space, create the file, and connect it to a zone. The structure will start to feel natural very quickly.
:::
