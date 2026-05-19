# What is the Semantic Building Model?

**The Semantic Building Model (SBM) is a documentation standard for building projects.** You describe every room, zone, system, and piece of equipment in simple text files. Those files serve architects, engineers, contractors, inspectors, and facility managers — all from the same source.

No special software. No database. Just folders and text files.

---

## The 30-Second Version

Here is the entire idea:

1. **One file per thing** — every room gets a file, every fire zone gets a file, every boiler gets a file
2. **Two parts per file** — structured data at the top (for computers), human description below (for people)
3. **Files reference each other** — Bedroom 01 says it belongs to Fire Zone ZL-IV. The system knows the connection.
4. **A compiler checks everything** — missing references, incomplete data, regulatory compliance. It catches mistakes before the construction site does.
5. **Automatic outputs** — BIM parameters, compliance reports, equipment registers, room schedules. Generated from your text files. No re-entering data.

That's it. The rest is details.

---

## Who Is This For?

SBM is built for anyone involved in building documentation:

| Role | What SBM gives you |
|------|---------------------|
| **Architects** | One place for all room specs, finishes, compliance status. No more scattered Word/Excel/AutoCAD. |
| **Structural engineers** | Clear building and level data, construction packages with scheduling. |
| **MEP engineers** | System and asset documentation linked to the spaces they serve. |
| **Contractors** | One file per room with everything: dimensions, finishes, equipment, fire zone. No hunting through emails. |
| **Building inspectors** | Automated compliance reports against WT 2021, Prawo Budowlane, and other regulations. |
| **Facility managers** | Equipment registers, maintenance schedules, and serial numbers — all from the same files used during design. |

You don't need to know how to code. If you can edit a text file and save it in a folder, you can use SBM.

---

## Why It Was Created

If you've worked on a building project, you know these problems:

- **Room data lives in 5 places** — AutoCAD, Excel, Word, emails, handover folders. Change one, forget the others.
- **Documents contradict each other** — drawings say 2.70m, specs say 2.80m, nobody knows which is right.
- **Compliance is discovered, not planned** — three weeks before the permit deadline, someone realizes fire zones weren't documented.
- **The same data is entered over and over** — area into AutoCAD, then Excel, then Word, then emailed to the MEP engineer, then the contractor asks again.
- **After handover, information vanishes** — two years later, the facility manager calls asking for the boiler serial number. Good luck finding it.

SBM solves this by putting all information in one place, in one format, that everyone can read.

---

## What a File Looks Like

Every SBM file has two parts. Here is a bedroom:

```markdown
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
requirements: ["REQ-HEIGHT-MIN-250"]
---

# Bedroom 01

Standard bedroom, north-facing window, fire zone ZL-IV.
Ceiling height 2.70m meets WT 2021 minimum (2.50m).

Finishes: oak floor, painted walls, acoustic ceiling.
```

**Top section** (between `---` marks): structured data that computers read. Area, height, zone assignment — always in the same fields, so software can find them reliably.

**Bottom section**: normal text that humans read. Design intent, context, notes — the things numbers alone can't tell you.

**One file. Two audiences. Zero duplication.**

---

## What the Standard Covers

SBM defines **19 types of building information** — ready-made templates that tell you what to document and how:

| Category | Entity types |
|----------|-------------|
| **Physical structure** | Site, Building, Level, Envelope, Opening, Vertical Circulation |
| **Spaces and zones** | Space, Zone (fire, acoustic, HVAC, etc.) |
| **Building systems** | System (HVAC, electrical, plumbing), Asset (specific installed products) |
| **Templates** | Space Type, Zone Type, System Type, Asset Type, Opening Type, Site Feature Type |
| **Site and construction** | Site Feature, Construction Package |
| **Compliance** | Requirement (linked to specific regulations) |

Each type has a template. You copy it, fill in your data, save the file. The structure is already there — you're just filling in the blanks, like a form.

---

## How to Navigate This Site

Depending on where you are, choose your path:

### "I just want to understand the big picture"

Read [How It All Fits Together](/en/standards/how-it-works) — a 10-minute overview of the three pillars: **Phases** (when you write), **Document Types** (what you describe), and **BIM Integration** (how it connects to your model).

### "I want to try it right now"

Follow the [Quick Start Guide](/en/standards/quick-start) — create your first room file in 5 minutes. No installation needed, just a text editor.

### "I want to see what a real project looks like"

Browse the [Green Terrace Example](/en/examples/green-terrace/) — a complete residential building with 69 documented entities: rooms, fire zones, HVAC systems, equipment, construction packages, and more.

### "I want to start using it on my project"

Read [Starting a New Project](/en/guides/new-project) — a step-by-step guide for setting up SBM on a real project, from folder structure to first compilation.

---

## Core Concepts at a Glance

Three ideas organize the entire standard:

**1. Phases tell you WHEN** — 8 project phases from initiation to handover. Each phase has a checklist of what should be documented. You always know what's expected. [See all 8 phases](/en/standards/document-structure)

**2. Entity types tell you WHAT** — 19 templates for rooms, zones, systems, equipment, and more. Each template has the same structure, so information is always easy to find. [See all entity types](/en/documentation/entities/)

**3. BIM integration tells you HOW** — Your text files map to IFC properties. Export to Revit, import from ArchiCAD. Documentation and model tell the same story. [See BIM integration](/en/bim-integration/)

---

## Ready?

| Time | Action |
|------|--------|
| **3 min** | You just read this page. You know what SBM is. |
| **5 min** | [Create your first room file](/en/standards/quick-start) |
| **10 min** | [Understand the full picture](/en/standards/how-it-works) |
| **20 min** | [Walk through a real building](/en/examples/green-terrace/) |
| **1 hour** | Document a small building from your own practice |

Start wherever feels right. The standard grows with your project — you don't need to learn everything on day one.
