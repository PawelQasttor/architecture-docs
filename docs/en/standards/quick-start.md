# Quick Start (5 minutes)

Go from nothing to a rendered building report in five minutes. New to the
idea? Read **[What is SBM?](/en/standards/introduction)** first (2 min) —
this page is hands-on only.

---

## 1. One file = one thing

Every room, zone, system and piece of equipment is **one text file**: a
structured block (for computers) and a human description below it. Create
`bedroom-01.md`:

```markdown
---
entityType: "space"
id: "SP-L01-001"
projectPhase: "concept"
spaceName: "Bedroom 01"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 14.5
unit: "m"
---

# Bedroom 01

South-facing double bedroom. Finishes and requirements are inherited
from the level and space type — this file only states what is specific
to *this* room.
```

That's a valid SBM entity. No database, no special software — Notepad and
a folder are enough.

## 2. Files reference each other

`bedroom-01.md` says `buildingId: "BLD-01"`. Create the building it points
to (`building.md`), and a level (`level-01.md`):

```markdown
---
entityType: "building"
id: "BLD-01"
name: "My Building"
version: "2.0.0"
---
```
```markdown
---
entityType: "level"
id: "LVL-01"
buildingId: "BLD-01"
version: "2.0.0"
levelName: "First Floor"
---
```

The compiler resolves the links, the inheritance, and the regulatory
requirements for you.

## 3. Compile → get a report

Point the compiler at the folder:

```bash
node scripts/compiler/index.mjs compile \
  --input ./my-project --output ./build --country PL
```

It validates everything, then writes JSON targets **and a human-readable
`report.html`** — phase readiness, requirement progress, data quality and
compliance on one printable page.

> Want to see it without authoring anything? Run `npm run sbm:report` and
> open `build/green-terrace/report.html`, or view the
> [live sample report](/green-terrace-report.html).

## 4. That's the whole loop

Author plain text → compile → get BIM parameters, compliance reports,
asset registers and the HTML report. Same files serve architects,
engineers, inspectors and facility managers. Change a value once; it is
correct everywhere.

---

## Where to go next

| Goal | Page |
|------|------|
| Understand *why* this exists | [What is SBM?](/en/standards/introduction) |
| See a complete real project | [Green Terrace — guided tour](/en/examples/green-terrace/) |
| The 27 entity types | [Document Types](/en/documentation/entities/) |
| Type/instance inheritance (templates) | [Space Type](/en/documentation/entities/space-type) · [Property Inheritance](/en/guides/property-inheritance) |
| When to create what | [The 10-Phase Lifecycle](/en/phases/) |
| How the compiler works | [Compiler](/en/documentation/compiler/) |

Stuck? Every entity type has a reference page with a copy-paste template
under [Document Types](/en/documentation/entities/).
