# Green Terrace — A Guided Tour

A complete, real Semantic Building Model: **Green Terrace**, a 6-storey,
18-unit residential building in Warsaw. Rather than list ~50 files, this
page **follows one bedroom** through the model so you can see how the
pieces connect — then ends at the report the compiler generates from them.

**The building:** [`BLD-01`](/en/examples/green-terrace/building) ·
1,800 m² · 6 storeys (`LVL-00`–`LVL-05`) · 18 dwellings · occupancy ZL IV
(WT 2021) · compiled `--country PL`.

---

## Follow Bedroom 01

### 1. The room states only what is specific to it

Open [**`spaces/bedroom-01`**](/en/examples/green-terrace/spaces/bedroom-01).
It declares its area, its building/level, and the zones it sits in — and
almost nothing else. No finishes, no ceiling height, no requirement list
copied in. Those are **inherited**, not repeated.

### 2. ← It inherits from a type and a level

- [**Space Type `ST-BEDROOM-STANDARD-A`**](/en/examples/green-terrace/space-types/ST-BEDROOM-STANDARD-A)
  — the template: standard finishes, occupancy profile, requirement set
  shared by *every* standard bedroom. Change it once, every bedroom updates.
- [**Level `LVL-01`**](/en/examples/green-terrace/levels/level-01) —
  cascades typical ceiling height, finishes and level-wide requirements to
  every space on the floor.

This is the type/instance pattern: the room file stays tiny; the shared
truth lives in one place.

### 3. → It belongs to zones

The same room is simultaneously in three overlapping
[zones](/en/examples/green-terrace/zones/fire-zone-zl-iv):

- [**Fire zone `ZL-IV`**](/en/examples/green-terrace/zones/fire-zone-zl-iv) — fire compartment / egress
- [**HVAC zone North**](/en/examples/green-terrace/zones/hvac-zone-north) — ventilation grouping
- [**Acoustic zone Night**](/en/examples/green-terrace/zones/acoustic-zone-night) — night-time sound criteria

One room, three orthogonal groupings — no duplicated geometry.

### 4. → It must satisfy requirements

Requirements are not pasted onto the room. They **cascade** from the level,
the space type and the Poland jurisdiction pack (WT 2021), e.g.
[**fire egress time**](/en/examples/green-terrace/requirements/REQ-FIRE-EGRESS-TIME-001)
and [**acoustic class B**](/en/examples/green-terrace/requirements/REQ-LEVEL-ACOUSTIC-B).
The compiler resolves which apply to a bedroom and which do not.

### 5. → Its cost rolls up

The room carries a cost; the compiler aggregates space → level →
building → project budget, so a change to one room reflects in the
project total automatically. (The
[stairwell void](/en/examples/green-terrace/spaces/stairwell-void) shows
the opposite case — explicitly zero, cost carried by the structure.)

### 6. → It all becomes one report

Run `npm run sbm:report` and the whole model — phase readiness,
requirement-verification progress, data quality and WT 2021 compliance —
renders as one printable page:

**[→ View the generated report](/green-terrace-report.html)**

That is the payoff: plain-text files in, a client-ready report out, with
zero re-entry.

---

## Now explore the rest

The full model is in the sidebar. Grouped entry points:

| Area | Start here |
|------|-----------|
| Site & building | [`SITE-GREEN-TERRACE`](/en/examples/green-terrace/site) · [`BLD-01`](/en/examples/green-terrace/building) |
| Spaces | [Bedroom 01](/en/examples/green-terrace/spaces/bedroom-01) · [Corridor](/en/examples/green-terrace/spaces/corridor) |
| Zones & types | [Fire ZL-IV](/en/examples/green-terrace/zones/fire-zone-zl-iv) · [HVAC type](/en/examples/green-terrace/zone-types/hvac-zone-residential) |
| Systems & assets | [HVAC system](/en/examples/green-terrace/systems/sys-hvac-01) · [Heat pump](/en/examples/green-terrace/assets/ai-hp-01) |
| Envelope & openings | [External wall](/en/examples/green-terrace/envelope-external-wall-type-a) · [Window type](/en/examples/green-terrace/opening-types/internorm-kf410-window) |
| Construction packages | [Structure](/en/examples/green-terrace/construction-packages/cp-structure) · [MEP](/en/examples/green-terrace/construction-packages/cp-mep) |

## What this example demonstrates

- **Type/instance inheritance** — tiny instance files, shared truth in types
- **Multi-level building** with cost rollup to a project budget
- **Overlapping zones** (fire / HVAC / acoustic) without duplicated geometry
- **Jurisdiction-driven compliance** — WT 2021 requirements applied automatically
- **One source, many outputs** — BIM mapping, asset register, compliance, and the HTML report

New here? Start with [What is SBM?](/en/standards/introduction) or the
[5-minute Quick Start](/en/standards/quick-start).
