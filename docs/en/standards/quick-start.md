# Quick Start: Your First Space Document

## The Problem You Already Know

If you've worked on a building project before, you know this frustration:

- **Room specifications scattered everywhere** — some in AutoCAD text notes, some in a Word document, some in an Excel spreadsheet, some in emails you can't find anymore
- **Information gets out of sync** — the drawings show 2.70m ceiling height, but the specs document says 2.80m, and nobody knows which one is correct
- **The same data entered five times** — you type room area into AutoCAD, then Excel, then Word, then email it to the mechanical engineer, then the builder asks again
- **Compliance mysteries** — three weeks before the permit deadline, you discover nobody documented which rooms are in which fire zone
- **The vanishing maintenance manual** — two years after handover, the facility manager calls: "Where's the boiler serial number?" and you have no idea which folder it's in

**If this sounds familiar, this standard is built for you.**

---

## Why This Matters (What You Gain)

Switching to structured documentation isn't about learning new software. It's about solving problems that cost you time and money on every project:

| Problem You Face Today | How SBM Solves It |
|------------------------|-------------------|
| **"Which rooms need fire doors?"** | Search all space files for `zoneIds: ZONE-FIRE-ZL-IV`. Done in 2 seconds. No manual checking. |
| **"Did we document the boiler serial number?"** | Every asset has a file. If `boiler-01.md` exists, it has the serial number. If it doesn't exist, you know it's missing. |
| **"The specs say 2.80m but the drawing shows 2.70m"** | Impossible. One file, one height value. Export to BIM, export to PDF — same number everywhere. |
| **"The contractor is asking about bedroom finishes again"** | Send them `bedroom-01.md`. One file, all info: area, height, finishes, equipment, compliance status. |
| **"Where's the as-built documentation?"** | Same files you created in concept phase. You've been updating them through construction. They're already as-built. |
| **"We need to redo the fire compliance report"** | Run the compiler. It reads all zone files, checks all spaces, generates the report automatically. 5 minutes, not 5 days. |

**Time saved per project:** Architects report 20-40% less time spent on documentation and coordination when information lives in one structured place.

---

## What This Changes

Imagine if every room, every fire zone, every piece of equipment lived in **one simple text file** that:

- ✅ **You can edit with any text editor** — no special software required, works with Notepad, VS Code, or anything you already use
- ✅ **Stores in Google Drive or Dropbox** — just folders and files, like you already work
- ✅ **Humans can read** — looks like a document with tables and descriptions
- ✅ **Computers can read** — the same file feeds into Revit, compliance reports, equipment registers, and maintenance systems
- ✅ **Stays consistent automatically** — if Bedroom 01 says it's in Fire Zone ZL-IV, and that zone doesn't exist, the system tells you
- ✅ **Grows with your project** — start with a rough room list in the concept phase, add details as you go, finish with a complete as-built record

**One file. One truth. No synchronization headaches.**

This is what the **Semantic Building Model (SBM)** standard does. You write simple text files following a clear structure. Those files serve architects, engineers, contractors, inspectors, and facility managers — all from the same source.

---

## Before and After: A Real Example

### The Old Way (What You Might Do Now)

**Documenting Bedroom 01 across multiple tools:**

1. **AutoCAD drawing** — geometry, dimensions, room tag "1.01"
2. **Excel room schedule** — area, height, finishes (separate file)
3. **Word specification** — fire rating requirements, acoustic requirements (separate file)
4. **Email to MEP engineer** — "Bedroom 01 needs heating, see attached room schedule" (another copy of the data)
5. **Handover folder** — maintenance manual mentions "bedrooms on first floor" but no link to specific rooms

**Result:** 5 places storing overlapping information. Change the ceiling height? Update 5 files. Find the fire rating? Open 3 files and hope they agree.

### The New Way (With SBM)

**Define common properties once in `levels/level-01.md`:**

```yaml
---
id: "LVL-01"
levelName: "Level 01"
typicalCeilingHeight: 2.70  # All rooms inherit this
typicalFinishes:
  floor: "Oak engineered"
  walls: "Paint white"
---
```

**Then create `spaces/bedroom-01.md` (only unique data):**

```markdown
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
levelId: "LVL-01"  # Inherits ceiling height, finishes from level
designArea: 14.5
zoneIds: ["ZONE-FIRE-ZL-IV"]
---

# Space: Bedroom 01

Standard bedroom, north-facing window, fire zone ZL-IV.
See `level-01.md` for ceiling height and finishes.
```

**Result:**
- ✅ The same file feeds AutoCAD (via IFC import)
- ✅ The same file generates the room schedule automatically
- ✅ The same file shows fire zone assignment (linked to the zone document)
- ✅ The MEP engineer reads the same file (no email attachments)
- ✅ The facility manager finds maintenance info linked from this file
- ✅ **NEW:** 50 bedrooms inherit ceiling height from level - change once, update all

**One source. One truth. Six uses. 90% less repetition.**

---

## Think of It Like...

| Familiar Tool | How SBM Relates |
|---------------|-----------------|
| **AutoCAD layers** | Just like layers organize geometry, SBM document types organize information. Spaces in one folder, fire zones in another, equipment in another. |
| **Excel spreadsheet** | Each room could be a row in Excel. With SBM, each room is its own file. Edit one without opening a massive spreadsheet. Search, filter, version control. |
| **Google Docs** | You write text that humans read. But unlike a blank Word doc, the computer can also extract structured data (area, height, zone assignment) automatically. |
| **Folders on your computer** | That's exactly what this is. A folder called `spaces/`, another called `zones/`, filled with `.md` text files. No database, no proprietary format. |

---

## What You'll Create

In this guide, you will create a **Space document** — a bedroom — described in a simple text file. Spaces are the fundamental building blocks of the **Semantic Building Model (SBM)**. Every room, corridor, and area in a building gets one file.

::: tip New in v0.1.1: Type/Instance Pattern
For projects with many similar spaces, you can use **Space Types** to define specifications once and reference them from instances. This guide shows the standalone approach. See [Type/Instance Pattern](#next-steps-type-instance-pattern) below for advanced usage.
:::

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

## What You Need to Get Started

**The bare minimum (all you really need):**
- **Any text editor** — even Windows Notepad works. If you've edited a `.txt` file, you can do this.
- **A folder on your computer** — or Google Drive, Dropbox, network share, anywhere you store files.

**Nice to have (but not required):**
- **VS Code or Notepad++** — free text editors with better formatting (but Notepad is fine)
- **Node.js** — only needed if you want automated validation (you can skip this for now)

**Do you need to know Markdown?**
Not really. If you've ever written a Word document with **bold text**, headings, or bullet lists, you already know 90% of what Markdown does. We'll show you the rest as we go.

::: info No Special Software Required
This standard uses **plain text files** (`.md` extension). No AutoCAD plugin. No Revit add-in. No proprietary software. Just text files in folders — the most future-proof format that exists.
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

That's it. No configuration files, no build tools, no database setup — just folders and text files.

::: info This Should Feel Familiar
This is exactly how you probably organize AutoCAD files already: one folder for floor plans, one for sections, one for details. Same idea, but for documentation instead of drawings.
:::

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

### Understanding the Fields (The Table at the Top)

The content between the `---` markers is called **frontmatter** — think of it as a structured table that both you and the computer can read. Each field serves a specific purpose:

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

## Step 3: Understand the Structure (Two Parts, One File)

Look at the file you just created. It has two parts — but they're in the same file, so they can never get out of sync:

### Part 1: Structured Data (Between the `---` Markers)

This is the table-like section at the top. Think of it like filling out a form:

```yaml
---
entityType: "space"
id: "SP-BLD-01-L01-001"
designArea: 14.5
# ... more structured fields
---
```

**Who reads this part:**
- The computer (to generate BIM parameters, compliance reports, equipment lists)
- AI tools (to answer questions like "which rooms are taller than 3 meters?")
- You (when you need to quickly check the assigned zone or area)

**Why it's structured:** So software can reliably find information. If every file puts area in the same field, a script can collect all areas automatically. No hunting through paragraphs.

### Part 2: Human-Readable Description (After the `---`)

This is normal text, just like a Word document:

```markdown
# Space: Bedroom 01

A standard bedroom on the first floor with north-facing window.
```

**Who reads this part:**
- Architects (to understand design intent)
- Engineers (to see context and constraints)
- Contractors (to understand what they're building)
- Clients (to review and approve)

**Why it matters:** Numbers in a table don't tell the whole story. The narrative explains *why* the room is 14.5m² (minimum bedroom size per regulations) or *why* the window faces north (afternoon sun avoidance).

::: tip The Core Principle
**Write once, serve everyone.** The structured data and the human description live in a single file. You edit one place. Everyone — people and computers — reads the same truth. No duplication, no synchronization burden, no drift.
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

This is the **Semantic Building Model (SBM)** in action. Every room, zone, system, and requirement is a structured document that references other documents by ID. As you add more files — more rooms, more zones, MEP systems, equipment — the graph grows.

**Why this matters:**

Imagine you have 50 bedrooms. All of them reference `ZONE-FIRE-ZL-IV`. Later, the fire inspector says Zone ZL-IV needs upgraded fire doors.

- **The old way:** Search through 50 room specs (Word docs? Excel rows? AutoCAD notes?) to find which rooms are affected.
- **With SBM:** Open `fire-zone-zl-iv.md`. The system already knows which rooms reference it. Update the zone file with the new requirement. Done.

The connections work both ways automatically. You never lose track of what's linked to what.

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

---

## What If I Get Stuck?

**"This feels overwhelming."**
Start small. Model one room. Just one. Use the template above, change the room name and area, save the file. That's it. You don't need to do zones, systems, or compliance on day one.

**"I don't understand YAML/frontmatter/Markdown."**
You don't need to. Copy the template, change the values (room name, area, height), and save. The structure is already there. You're just filling in the blanks, like a form.

**"What if I make a mistake?"**
Text files are very forgiving. Save a backup copy (or use Git if you know it). Try something. If it breaks, you can always go back. The worst that happens is a file won't validate — and the compiler will tell you exactly what's wrong.

**"How do I know if I'm doing it right?"**
If you can answer these questions by opening one file, you're doing it right:
- What's the area of Bedroom 01?
- Which fire zone is it in?
- What's the minimum height requirement?

If the answers are all in `bedroom-01.md`, you've succeeded.

**"Do I have to learn the whole standard at once?"**
No. Start with spaces. Add zones when you need them. Add systems when the MEP engineer asks for specs. Add equipment during construction. The standard grows with your project.

**"Can I mix this with my current workflow?"**
Absolutely. Keep using AutoCAD for drawings. Keep using Word for contracts. Use SBM for structured documentation. Export SBM data to IFC and import into Revit when you're ready. It's additive, not replacement.

::: info You're Not Alone
Thousands of architects started exactly where you are: comfortable with AutoCAD, unfamiliar with structured documentation. Within one project, it becomes second nature. The time savings start immediately.
:::
