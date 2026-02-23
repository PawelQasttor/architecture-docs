# How It All Fits Together

This standard helps you write building documentation in Markdown files. But unlike a blank Word document, every file you create follows a clear structure. That structure comes from three simple ideas.

## The Three Pillars

- **Phases** tell you **when** to write each document
- **Document types** tell you **what** to describe in each document
- **BIM integration** tells you **how** the document connects to your Revit or ArchiCAD model

That's the whole idea. The rest of this page explains each one.

---

## Pillar 1: Phases — When You Write

Every architecture project moves through stages: brief, concept, design development, permit, construction, handover. You already work this way.

The standard formalizes this into **8 phases**:

| Phase | What you're doing | What you're writing |
|-------|-------------------|---------------------|
| 1. Initiation | Meeting the client, visiting the site | Project brief, site notes |
| 2. Concept | Sketching massing, exploring options | Building description, rough room list |
| 3. Schematic Design | Drawing plans, sections, elevations | Room dimensions, fire zones, acoustic zones |
| 4. Design Development | Preparing permit documents | Full specifications, compliance checks |
| 5. Construction Documents | Detailing for builders | Equipment specs, installation details |
| 6. Construction | Supervising the site | Change records, as-built notes |
| 7. As-Built | Measuring what was actually built | Verified dimensions, final conditions |
| 8. Handover | Giving keys to the owner | Maintenance manuals, equipment registers |

**Why this matters:** Each phase has a checklist. You know exactly what documents should exist before moving on. No more discovering missing specs during construction.

[See the full 8-phase workflow →](/en/standards/document-structure)

---

## Pillar 2: Document Types — What You Describe

When you write a document, you're describing something specific: a room, a fire zone, a heating system, a boiler. The standard defines **7 document types** — ready-made templates that tell you what to fill in:

| Document type | What you're describing | Example |
|---------------|----------------------|---------|
| **Building** | The whole building | "Green Terrace, ul. Sloneczna 45, Warsaw" |
| **Level** | A floor or storey | "Ground floor, +0.00m" |
| **Space** | A room or area | "Bedroom 01, 14.5 m², 2.70m height" |
| **Zone** | A group of rooms sharing a common characteristic | "Fire zone ZL-IV covering floors 1-6" |
| **Requirement** | A specific regulation that must be met | "Room height >= 2.50m per WT 2021 §132" |
| **System** | A building installation | "Central heating, gas boiler, radiators" |
| **Asset** | A specific installed product | "Vaillant ecoTEC plus 306, serial #12345" |

Each document type has a **template** — a ready-made file you fill in. The template tells you what information goes where, so every bedroom description has the same structure, every fire zone has the same fields, and every piece of equipment is documented the same way.

**Why this matters:** Consistent structure means anyone on your team (or an AI tool) can find the fire rating of any wall, the area of any room, or the maintenance schedule of any boiler — without searching through 200-page PDFs.

[See all document types →](/en/documentation/entities/)
[Use the templates →](/en/templates/)

---

## Pillar 3: BIM Integration — How It Connects to Your Model

Your Markdown files aren't isolated from your BIM model. Each document maps to IFC properties, so information flows between your documentation and Revit/ArchiCAD.

**In practice:**

- You export an IFC file from Revit → a script reads it and updates your Markdown files with the latest geometry and properties
- You update a wall specification in Markdown → a script generates an IFC property update you can import back into Revit

The standard also defines **LOD levels** (Level of Development) for each phase, so your model detail stays in sync with your documentation:

| Phase | BIM LOD | What it means |
|-------|---------|---------------|
| Concept | LOD 100 | Approximate geometry, placeholder objects |
| Schematic | LOD 200 | Correct sizes and locations |
| Permit | LOD 300 | Exact geometry, real materials assigned |
| Construction | LOD 400 | Fabrication-ready, specific products |
| As-Built | LOD 500 | Verified against what was actually built |

**Why this matters:** Your documentation and your BIM model tell the same story. Change one, update the other. No more discrepancies between your drawings and your specs.

[Learn about BIM integration →](/en/bim-integration/)
[See LOD definitions →](/en/bim-integration/lod-definitions)

---

## How the Three Pillars Work Together

Here's a concrete example. You're in **Phase 4 (Design Development)**, preparing permit documents.

The phase tells you: "All rooms must have verified compliance checks by now."

So you open the **Space document** for Bedroom 01. The template tells you what to fill in: area, height, window size, fire zone assignment.

You write: height = 2.70m. The **Requirement document** for WT 2021 §132 says minimum height is 2.50m. Your documentation now proves compliance.

The **BIM integration** maps that height to an IFC property (`Pset_SpaceCommon.Height`), so Revit shows the same value.

One room. Three pillars working together: the phase told you *when*, the document type told you *what*, and the BIM mapping told you *how* it connects to your model.

---

## When Documents Appear in the Project

Not everything is documented from day one. Simple things come first, details come later:

```
Phase:    1         2         3         4         5         6-8
          Brief     Concept   Schematic Permit    Construction...

Building  ●─────────────────────────────────────────────────>
Level               ●────────────────────────────────────────>
Space     ●─────────────────────────────────────────────────>
Zone                ●────────────────────────────────────────>
Requirement                   ●──────────────────────────────>
System                                  ●────────────────────>
Asset                                             ●──────────>

BIM LOD:  —         100       200       300       400     500
```

**●** = first created. **→** = refined in later phases.

Your Building and Space files start as rough sketches in Phase 1 and grow more detailed over time. Asset documents only appear when the design is detailed enough to specify products.

::: info The same file evolves
You don't create a new file each phase. The same `bedroom-01.md` file gains more detail as the project progresses — approximate area becomes exact dimensions, missing fields get filled in, compliance status gets verified.
:::

---

## The Compiler (Optional Automation)

If you want, a compiler tool can read your Markdown files and automatically generate:

- **BIM parameter file** — for importing into Revit/ArchiCAD
- **Compliance report** — showing which requirements pass or fail
- **Equipment register** — a list of all installed products and where they are
- **Digital twin schema** — for connecting to building management systems (BMS)

This is optional. Your Markdown files work perfectly well on their own as human-readable documentation. The compiler just adds machine-readable outputs on top.

---

## Where to Go Next

| I want to... | Go here |
|---|---|
| Try it hands-on (5 minutes) | [Quick Start](/en/standards/quick-start) |
| Follow the full project workflow | [8-Phase Workflow](/en/standards/document-structure) |
| See a real building example | [Green Terrace Project](/en/examples/green-terrace/) |
| Browse document types | [Document Type Reference](/en/documentation/entities/) |
| Start using templates | [Templates](/en/templates/) |
| Integrate with BIM | [BIM Integration](/en/bim-integration/) |
| Check Polish regulations | [Regulations](/en/regulations/) |
| Export to PDF | [PDF Export Guide](/en/guides/pdf-export) |

::: tip New to the standard?
Start with the [Quick Start](/en/standards/quick-start). You'll create your first room file in 5 minutes.
:::
