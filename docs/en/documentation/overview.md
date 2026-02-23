# Building Information in Text Files

## The Problem This Solves

When you document a building project, information ends up scattered:

- **Room dimensions** → AutoCAD
- **Room schedule** → Excel
- **Fire ratings** → Word specification
- **Equipment specs** → Email threads
- **Maintenance info** → ??? (good luck finding it 2 years later)

Change a ceiling height? Update 5 different files and hope you don't miss one.

**This standard fixes that.** Every room, every fire zone, every piece of equipment gets **one text file** containing everything about it.

::: tip For Architects
Think of it like this: Instead of spreading room information across CAD, Excel, and Word, you have **one file per room**. That file is both a readable document (for humans) and structured data (for computers).
:::

---

## What Is the Semantic Building Model (SBM)?

**Simple version:** A way to organize building information in text files so both humans and computers can read it.

**Longer version:** Every room, zone, system, and piece of equipment is described in a simple text file with two parts:

1. **Structured table** (at the top) — Easy for computers to read
2. **Normal text** (below) — Easy for humans to read

The same file serves:
- ✅ Architects (readable documentation)
- ✅ BIM software (Revit parameters, IFC properties)
- ✅ Inspectors (compliance reports)
- ✅ Facility managers (maintenance schedules)

---

## How It Works (The Simple Version)

### Step 1: You Write Text Files

Create one file per room in a folder:

```
my-project/
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   └── kitchen-01.md
├── zones/
│   └── fire-zone-zl-iv.md
└── requirements/
    └── room-height-min.md
```

### Step 2: Each File Has Two Parts

**Part 1: Structured data** (top of file — like filling out a form)

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
---
```

**Part 2: Human description** (rest of file — like a Word document)

```markdown
# Bedroom 01

Standard bedroom with north-facing window.
Meets WT 2021 minimum height (2.50m) with 20cm margin.
```

### Step 3: The System Checks Your Work (Optional)

Run a validation tool (we call it the "compiler" but don't worry about that name). It:

- ✅ Checks if Bedroom 01 references a fire zone that actually exists
- ✅ Verifies ceiling height meets the requirement (2.70m >= 2.50m minimum)
- ✅ Finds broken links before they become problems

### Step 4: Get Automatic Outputs

The same files generate:

| Output | What It Does | Use Case |
|--------|--------------|----------|
| **BIM parameters** | Populates Revit/ArchiCAD properties | Design coordination |
| **Compliance report** | Shows which rooms pass/fail regulations | Permit submission |
| **Equipment register** | Lists all installed equipment with maintenance schedules | Facility management |
| **Room schedules** | Excel-style tables of all rooms | Documentation |

**One source. Multiple outputs. Zero re-entering data.**

---

## The Three Layers (For Reference)

Don't worry about understanding this diagram now. It shows how information flows:

```
┌─────────────────────────────────────┐
│ Layer 1: Your Text Files           │  ← You write these
│ (One file per room/zone/system)     │
└──────────────┬──────────────────────┘
               │ Validation tool checks them
               ▼
┌─────────────────────────────────────┐
│ Layer 2: BIM Model (Revit/ArchiCAD)│  ← Receives parameters
│ (Geometry + Properties)             │     from your text files
└──────────────┬──────────────────────┘
               │ Building operates
               ▼
┌─────────────────────────────────────┐
│ Layer 3: Live Building              │  ← Uses equipment info
│ (Sensors + Maintenance)             │     for operations
└─────────────────────────────────────┘
```

**Key point:** You only work in Layer 1 (text files). Layers 2 and 3 use data from your files.

---

## 11 Types of Building Information

The standard defines **11 document types**. Each one describes a different aspect of your building:

| Type | What You're Describing | Example |
|------|----------------------|---------|
| **Building** | The whole building | "Green Terrace, ul. Słoneczna 45, Warsaw" |
| **Level** | A floor | "Ground floor, +0.00m" |
| **Space** | A room | "Bedroom 01, 14.5m², 2.70m height" |
| **Space Type** | Template for similar rooms | "Standard bedroom template (use for all bedrooms)" |
| **Zone** | Group of rooms sharing a characteristic | "Fire zone ZL-IV covering levels 1-6" |
| **Zone Type** | Template for zone configurations | "Fire zone ZL-IV standard (residential building)" |
| **System** | Building installation | "Central heating system with gas boiler" |
| **System Type** | Template for MEP systems | "Residential HVAC with heat recovery" |
| **Asset Instance** | Specific equipment | "Boiler #12345, installed 2024-03-15" |
| **Asset Type** | Product specification | "Vaillant ecoTEC plus 306 (generic spec)" |
| **Requirement** | Regulation to meet | "Room height >= 2.50m per WT 2021 §132" |

::: tip Templates vs Actual Things
**Types** = Templates (define specs once)
**Instances** = Actual things (reference template, add location)

If you have 20 identical bedrooms, create **1 Space Type** (template) and **20 Space instances** (actual rooms).
Update the template → all 20 rooms update automatically. **26-33% less documentation.**
:::

---

## Key Principles

### 1. Human-Friendly Writing

You write in normal Markdown with a structured table at the top. If you can edit a text file, you can do this.

**Example:** A bedroom file

```markdown
---
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
designHeight: 2.70
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Space: Bedroom 01

Standard bedroom with north-facing window.
Floor: oak, Walls: painted white, Ceiling: smooth finish.
```

### 2. Automatic Consistency Checking

The validation tool reads all your files and checks:

- ✅ Does Bedroom 01 reference a fire zone that exists?
- ✅ Does the 2.70m ceiling meet the 2.50m requirement?
- ✅ Are there any broken links between files?

**Result:** Catches mistakes before construction, not during inspection.

### 3. Works Worldwide (But Knows Polish Rules)

The system automatically loads regulations based on your project location:

- **Poland:** WT 2021, Prawo budowlane load automatically
- **Other countries:** Add files for Germany (`/requirements/de/`), France (`/requirements/fr/`), etc.
- **Global standards:** EN, ISO, ASHRAE available regardless of location

---

## What You Get (Outputs)

### 1. BIM Parameters

**What it is:** Data file that Revit/ArchiCAD can import

**Use case:** Instead of manually entering room areas into Revit, import them from your text files. One click, all parameters populated.

### 2. Compliance Report

**What it is:** Shows which rooms pass/fail regulatory requirements

**Example:**
```
Bedroom 01: ✅ PASS
- Height: 2.70m (>= 2.50m required by WT 2021 §132)
- Daylight: 3.2m² window (meets requirement)

Bedroom 02: ❌ FAIL
- Height: 2.40m (< 2.50m required by WT 2021 §132)
```

**Use case:** Attach to permit application, show inspector during approval

### 3. Equipment Register

**What it is:** List of all installed equipment with maintenance schedules

**Example:**
```
Boiler HP-01 (Vaillant ecoTEC plus 306)
- Location: Basement, Room 0.01
- Serial: 12345-67890
- Installed: 2024-03-15
- Next service: 2025-03-15 (annual checkup)
```

**Use case:** Hand to facility manager at building handover. They know what equipment exists, where it is, when to service it.

### 4. Digital Twin Schema

**What it is:** Connects building sensors to rooms

**Use case:** Temperature sensor in Bedroom 01 logs data. The system knows "this sensor belongs to Bedroom 01" and can check if temperature meets requirements.

---

## When You Use This In Your Project

### Design Phase
1. You create space files in Markdown (one file per room)
2. Validation tool checks if you meet WT 2021 requirements
3. Export BIM parameters to Revit
4. Generate compliance report for permit submission

### Construction Phase
1. Update files with as-built measurements
2. Add equipment files when boiler/HVAC units installed
3. Record serial numbers and installation dates
4. Compliance report tracks what's been verified

### Operation Phase (After Handover)
1. Facility manager has equipment register with maintenance schedules
2. Building sensors linked to room IDs
3. Maintenance events tracked against original specifications
4. Equipment lifecycle recorded from installation to replacement

---

## Getting Started

**Choose your path:**

| I want to... | Go here |
|-------------|---------|
| **Understand what types of files to create** | [Document Types](/en/documentation/entities/) |
| **Create my first file** | [Quick Start](/en/standards/quick-start) |
| **See a complete example** | [Green Terrace Building](/en/examples/green-terrace/) |
| **Use ready-made templates** | [Templates](/en/templates/) |
| **Learn about validation** | [Compiler Guide](/en/documentation/compiler/) |

---

## Current Version

**SBM v0.1.3** (2026-02-22)

Recent additions:
- Environmental conditions (temperature, humidity, air quality)
- Electrical safety groups (IEC 60364-7-710)
- Regulatory reference tracking
- Building lifecycle states
- Room numbers, accessibility levels, parent/child spaces
- Template system (Space Types, Zone Types, System Types, Asset Types)

**What changed:** More fields to track real-world project data. If you're just starting, ignore these advanced features until you need them.

::: tip Start Simple
You don't need to use every field. Start with:
- Room name, area, height
- One fire zone
- One requirement (height minimum)

That's enough for your first file. Add complexity as your project needs it.
:::
