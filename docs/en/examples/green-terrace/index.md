# Green Terrace — A Guided Tour

A complete, real Semantic Building Model: **Green Terrace**, a 6-storey,
18-unit residential building in Warsaw. Rather than list ~60 files, this
page **follows one bedroom** through the model so you can see how the
pieces connect — then ends at the report the compiler generates from them.

**The building:** [`BLD-01`](/en/examples/green-terrace/building) ·
1,800 m² · 6 storeys (`LVL-00`–`LVL-05`) · 18 dwellings · occupancy ZL IV
(WT 2021) · compiled `--country PL`.

**Lifecycle position:** Green Terrace is currently at the
**`construction_documents`** phase (LOD 400) — design is complete,
bidding has closed, and the example carries forward artifacts from every
prior phase plus first construction-phase Issues and scheduled commissioning
tests. See [Lifecycle walkthrough](#lifecycle-walkthrough) below.

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
| Brief & structure | [Space Program](/en/examples/green-terrace/space-programs/PROG-BEDROOM-STANDARD) · [Structural System](/en/examples/green-terrace/structural-systems/STR-GREEN-TERRACE) · [Materials](/en/examples/green-terrace/materials/MT-CONCRETE-C30-37) |
| Egress & coordination | [Fire egress route](/en/examples/green-terrace/circulation-routes/CR-FIRE-EGRESS-L01) · [Bid addendum](/en/examples/green-terrace/issues/ISS-BID-001) · [Construction RFI](/en/examples/green-terrace/issues/ISS-RFI-001) |
| Commissioning | [MVHR balancing](/en/examples/green-terrace/commissioning-tests/CT-MVHR-001) · [Air-tightness](/en/examples/green-terrace/commissioning-tests/CT-AIRTIGHTNESS-001) · [Fire drill](/en/examples/green-terrace/commissioning-tests/CT-FIRE-DRILL-001) |

## Lifecycle walkthrough

A real project doesn't live at one lifecycle phase — it accumulates artifacts
from every prior phase as it advances. Green Terrace currently sits at the
**`construction_documents`** phase. Here is what each phase contributed:

| Phase | What this phase contributes | Example entity |
|---|---|---|
| **`concept`** | The client brief — what the project must deliver, expressed as measurable targets, before any geometry exists | [`PROG-BEDROOM-STANDARD`](/en/examples/green-terrace/space-programs/PROG-BEDROOM-STANDARD) — 27 standard bedrooms at ~15 m² each |
| **`schematic_design`** | Site response, massing, structural strategy, fire strategy — coarse but coherent | Captured implicitly across [`SITE-GREEN-TERRACE`](/en/examples/green-terrace/site) and [`BLD-01`](/en/examples/green-terrace/building); the [Pathfinder egress simulation](/en/examples/green-terrace/requirements/REQ-FIRE-EGRESS-TIME-001) starts here |
| **`design_development`** | Detailed types, structural sizing, material specs, energy and acoustic targets | [`STR-GREEN-TERRACE`](/en/examples/green-terrace/structural-systems/STR-GREEN-TERRACE), [`MT-CONCRETE-C30-37`](/en/examples/green-terrace/materials/MT-CONCRETE-C30-37), all level + space + system files |
| **`construction_documents`** | Coordinated set ready to build — envelope details, MEP routing, egress routes, construction packages | [`CR-FIRE-EGRESS-L01`](/en/examples/green-terrace/circulation-routes/CR-FIRE-EGRESS-L01), [`ENV-EW-01`](/en/examples/green-terrace/envelope-external-wall-type-a), [`CP-STRUCTURE`](/en/examples/green-terrace/construction-packages/cp-structure) and the other CPs |
| **`bidding_procurement`** | Bid clarifications + addenda issued during the tender period | [`ISS-BID-001`](/en/examples/green-terrace/issues/ISS-BID-001) — cavity-tie clarification |
| **`construction`** | RFIs, change orders, submittals, field observations | [`ISS-RFI-001`](/en/examples/green-terrace/issues/ISS-RFI-001) (slab edge), [`ISS-CO-001`](/en/examples/green-terrace/issues/ISS-CO-001) (PIR substitution), MEP assets [`AI-HP-01`](/en/examples/green-terrace/assets/ai-hp-01), [`AI-MVHR-01`](/en/examples/green-terrace/assets/ai-mvhr-01) |
| **`commissioning`** | Verifiable test results: balancing, air-tightness, fire drill | [`CT-MVHR-001`](/en/examples/green-terrace/commissioning-tests/CT-MVHR-001), [`CT-AIRTIGHTNESS-001`](/en/examples/green-terrace/commissioning-tests/CT-AIRTIGHTNESS-001), [`CT-FIRE-DRILL-001`](/en/examples/green-terrace/commissioning-tests/CT-FIRE-DRILL-001) — all scheduled |
| **`operation`** | Maintenance records, sensor data, operational issues, retro-commissioning | *Not yet authored — Green Terrace has not been handed over* |
| **`renovation`** | Future major works (e.g. PV retrofit, MVHR upgrade at end of service life) | *Future phase — to be added when planned* |
| **`decommissioned`** | End-of-life: deconstruction plan, material recovery, embodied-carbon end-of-life accounting | *Future phase — 50+ years out for this building* |

### What "current at CD" means in practice

- The **building, levels, spaces, systems and assets** carry `projectPhase: design_development` because their design was substantially complete by the end of DD — the CD phase added coordination and details, not new entities.
- The **circulation route and envelope** carry `projectPhase: construction_documents` because they only become coherent once the design is closed out.
- The **construction-phase issues** are partial — three real entries from the live job — and will grow as construction continues.
- The **commissioning tests** are *scheduled* (status `planned`/`scheduled`), not executed. Their `results.measured` blocks are `null` until the contractor and witnesses run them.

The compiler treats this snapshot as legitimate v2.0 input — every phase
that should have entities by CD has them, and the phase gate (see
[Lifecycle Phases](/en/phases/)) confirms the project is ready to advance.

## What this example demonstrates

- **Type/instance inheritance** — tiny instance files, shared truth in types
- **Multi-level building** with cost rollup to a project budget
- **Overlapping zones** (fire / HVAC / acoustic) without duplicated geometry
- **Jurisdiction-driven compliance** — WT 2021 requirements applied automatically
- **Brief-to-design check** — Space Program entities verify quantities and areas against the client brief
- **Lifecycle continuity** — artifacts from concept through commissioning live together in one queryable model
- **One source, many outputs** — BIM mapping, asset register, compliance, and the HTML report

New here? Start with [What is SBM?](/en/standards/introduction) or the
[5-minute Quick Start](/en/standards/quick-start).
