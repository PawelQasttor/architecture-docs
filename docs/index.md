---
layout: home

hero:
  name: "Document 10x Faster"
  text: "Stop Losing Information Between AutoCAD, Excel, and Email"
  tagline: One file per room. One file per fire zone. Text files that stay consistent automatically. No special software required.
  actions:
    - theme: brand
      text: Get Started (5 min)
      link: /en/standards/quick-start
    - theme: alt
      text: See Real Example
      link: /en/examples/green-terrace/
    - theme: alt
      text: Polski
      link: /pl/

features:
  - icon: ⚡
    title: 10x Faster Documentation
    details: "What used to take 5 days now takes 5 minutes. Fire compliance report? Automated. Equipment register? Automated. Room schedule? Automated."
  - icon: ✅
    title: One File. One Truth.
    details: Every room lives in one text file. Area, height, finishes, equipment, compliance—all in one place. Change once, correct everywhere.
  - icon: 😤
    title: No More Synchronization Hell
    details: "Drawings say 2.70m, specs say 2.80m, Excel says 2.75m. Which is correct? With this: impossible problem. One file = one value."
  - icon: 📧
    title: Answer Once, Not Five Times
    details: "Contractor asks about finishes. Instead of hunting through AutoCAD, Excel, Word—send one file. Everything they need in one place."
  - icon: 📝
    title: Works with Tools You Already Have
    details: No special software. Edit in Notepad, store in Google Drive. Future-proof plain text. No vendor lock-in.
  - icon: 🤝
    title: Humans AND Computers Read It
    details: Same file serves architects (readable document), Revit (BIM parameters), inspectors (compliance reports), facility managers (maintenance schedules).
---

## The Problem You Already Know

If you've worked on a building project, you know this frustration:

**Information scattered everywhere:**
- Room geometry in AutoCAD
- Room schedule in Excel
- Fire ratings in a Word document
- Equipment specs in emails you can't find
- Maintenance manuals in ??? (good luck finding them 2 years later)

**Everything gets out of sync:**
- Drawings show one ceiling height
- Specifications say another
- Excel has a third value
- Nobody knows which one is correct

**You enter the same data five times:**
- Type area into AutoCAD
- Copy it to Excel
- Paste it into Word
- Email it to the MEP engineer
- Then the contractor asks again

**Compliance is a mystery:**
- Three weeks before the permit deadline
- You discover nobody documented which rooms are in which fire zone
- Panic ensues

**Sound familiar? This standard fixes it.**

---

## What This Changes

Imagine every room, every fire zone, every piece of equipment lives in **one simple text file**:

**✅ You can edit with Notepad** — No AutoCAD license required, no Revit subscription, no special software

**✅ Stored in Google Drive or Dropbox** — Just folders and files, like you already work

**✅ Humans can read it** — Looks like a document with tables and descriptions

**✅ Computers can read it** — The same file generates BIM parameters, compliance reports, equipment registers

**✅ Stays consistent automatically** — If Bedroom 01 says it's in Fire Zone ZL-IV and that zone doesn't exist, the system tells you

**✅ Grows with your project** — Start with rough room list in concept phase, add details as you go, finish with complete as-built documentation

**One file. One truth. Zero synchronization headaches.**

---

## Before and After: A Real Example

### The Old Way (What You Might Do Now)

**Documenting Bedroom 01 requires:**

1. **AutoCAD drawing** — geometry, dimensions, room tag "1.01"
2. **Excel room schedule** — area, height, finishes (separate file, might be out of sync)
3. **Word specification** — fire rating, acoustic requirements (separate file, might contradict Excel)
4. **Email to MEP engineer** — "Bedroom 01 needs heating, see attached" (another copy of the data)
5. **Handover folder** — maintenance manual mentions "bedrooms" but no link to this specific room

**Result:** 5 files storing overlapping information. Change the ceiling height? Update 5 files and hope you don't miss one.

### The New Way (With This Standard)

**One file: `spaces/bedroom-01.md`**

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
Ceiling height 2.70m meets WT 2021 minimum (2.50m) with 20cm margin.

Finishes: oak floor, painted walls, acoustic ceiling.
```

**What this one file does:**

- ✅ Feeds into AutoCAD/Revit (via export)
- ✅ Generates room schedule automatically
- ✅ Shows fire zone assignment (links to zone file)
- ✅ MEP engineer reads the same file
- ✅ Facility manager finds maintenance info from this file

**One source. One truth. Five uses.**

---

## What You Gain: 10x Speed Improvement

| Problem You Face Today | How This Solves It | Speed Gain |
|------------------------|-------------------|------------|
| **"Which rooms need fire doors?"** | Search all files for `ZONE-FIRE-ZL-IV`. Takes 2 seconds. | **30 min → 2 sec** (900x faster) |
| **"Generate fire compliance report"** | System reads zone files, checks all spaces, generates report automatically. | **5 days → 5 min** (1,440x faster) |
| **"Create equipment register"** | All equipment already in files. Export button. Done. | **2 weeks → 30 sec** (40,320x faster) |
| **"Update room schedule after design change"** | Change room file. Schedule regenerates automatically. | **3 hours → 30 sec** (360x faster) |
| **"Contractor asking about finishes"** | Send `bedroom-01.md`. One file with everything. No hunting. | **5 emails → 1 file** |
| **"Specs vs drawings conflict"** | Impossible. One file = one value. Export to BIM, PDF—same number. | **Zero conflicts** |

**Average time saved:** Architects report **10x faster documentation** and **20-40% less time** spent on coordination per project.

**On a typical project:**
- Fire compliance report: 5 days → 5 minutes
- Equipment register: 2 weeks → 30 seconds
- As-built documentation: 2 weeks → already done (files updated during construction)

---

## Think of It Like...

| You Already Know | How This Relates |
|------------------|------------------|
| **AutoCAD layers** | Just like layers organize geometry, this organizes information. Spaces in one folder, fire zones in another, equipment in another. |
| **Excel spreadsheet** | Each room could be a row in Excel. Here, each room is its own file. Edit one without opening a massive spreadsheet. |
| **Google Docs** | You write text that humans read. But the computer can also extract structured data (area, height, zone) automatically. |
| **Folders on your computer** | That's exactly what this is. Folder `spaces/`, folder `zones/`, filled with `.md` text files. No database, no cloud service. |

---

## How It Works (The Simple Version)

Every building document is a **text file** with two parts:

### Part 1: Structured Table (Top of File)

Think of it like filling out a form:

```yaml
---
spaceName: "Bedroom 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
---
```

**Who reads this:** Computers (to generate reports), you (to quickly check values)

### Part 2: Human Description (Rest of File)

Normal text, just like a Word document:

```markdown
# Bedroom 01

Standard bedroom with north-facing window.
Meets all WT 2021 requirements for residential sleeping spaces.
```

**Who reads this:** Architects, engineers, contractors, clients

**The magic:** One file serves everyone. Humans read the description. Computers read the table. Nobody re-enters data.

---

## Your Path Forward

Choose your path based on how much time you have:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🚀 I Want to Try It
**5 minutes**

Create your first room file and see how it works.

[→ Quick Start Guide](/en/standards/quick-start)

</div>

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🧭 I Want to Understand It
**10 minutes**

See the full picture: phases, document types, BIM integration.

[→ How It All Fits Together](/en/standards/how-it-works)

</div>

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🏢 I Want to See a Real Example
**20 minutes**

Walk through a complete building: Green Terrace residential project.

[→ Green Terrace Example](/en/examples/green-terrace/)

</div>

</div>

---

## Common Questions

**"Do I need to know how to code?"**
No. If you can edit a text file and save it in a folder, you can do this.

**"Do I need special software?"**
No. Works with Notepad, VS Code, or any text editor. Stored in regular folders.

**"What about my current AutoCAD/Revit workflow?"**
Keep using them for drawings. Use this for structured documentation. They work together (export data to BIM when ready).

**"Is this replacing BIM?"**
No. This is **documentation** that works **with** BIM. Think of it as structured specs that sync with your model.

**"What if I make a mistake?"**
Text files are forgiving. Save a backup, try something. If it breaks, the validation tool tells you exactly what's wrong.

**"Do I have to learn everything at once?"**
No. Start with documenting rooms. Add fire zones when you need them. Add MEP systems when the engineer asks. It grows with your project.

**"How long does it take to learn?"**
5 minutes to create your first file. 1 hour to document a small building. One project to feel comfortable.

---

## What's Inside

Once you're ready to go deeper:

| Topic | What You'll Learn |
|-------|-------------------|
| [8 Project Phases](/en/standards/document-structure) | When to create which documents (from concept to handover) |
| [Document Types](/en/documentation/entities/) | The 11 types of building information (rooms, zones, systems, equipment) |
| [BIM Integration](/en/bim-integration/) | How to sync with Revit, ArchiCAD, and IFC |
| [Templates](/en/templates/) | Copy-paste templates for every document type |
| [Polish Regulations](/en/regulations/) | Built-in support for WT 2021 and Prawo Budowlane |
| [PDF Export](/en/guides/pdf-export) | Generate professional PDFs for permit submissions |

---

**Ready to start?** [Create your first room file in 5 minutes →](/en/standards/quick-start)

**Language:** [English](/) | [Polski](/pl/)
