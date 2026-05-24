# Green Terrace Park — Campus showcase

A **multi-building residential campus** with Green Terrace BLD-01 as one
of four sibling blocks. Demonstrates the **Campus entity** (the last of
27 SBM v2.0 entity types to get a worked example) plus shared site
infrastructure, cross-building systems, and **siblings at different
lifecycle phases**.

**The campus:** [`CAM-GREEN-TERRACE-PARK`](/en/examples/green-terrace-park/campus) ·
4 buildings · ~7,200 m² total GFA · ~72 dwelling units · shared district
heating loop · communal garden, playground, EV charging hub, bike storage.

**Lifecycle position:** mixed — buildings are at different phases as
the campus rolls out in sequence:

| Building | Phase | Notes |
|---|---|---|
| **BLD-01 — Green Terrace** | `commissioning` / `operation` | The flagship — see the [design](/en/examples/green-terrace/) and [operation](/en/examples/green-terrace-2028/) example examples |
| **BLD-02 — Sunny Crescent** | `construction` | Family-block, 24 units, structure complete |
| **BLD-03 — Linden Court** | `design_development` | Accessible-design block, 18 units, DD-stage |
| **BLD-04 — Oak Pavilion** | `schematic_design` | 1BR-heavy block, 12 units, planning approval pending |

---

## What this example demonstrates

- **The `Campus` entity** — top of the hierarchy. Aggregates sites,
  shared infrastructure, and campus-wide systems.
- **Phase rollup across siblings** — the Campus carries buildings at
  four different lifecycle phases simultaneously. Compiler reports
  campus-level readiness as the *minimum* of its children's phase
  readiness.
- **Cross-building systems** — one district heating loop with multiple
  `buildingIds`, demonstrating how a System can span buildings.
- **Shared site infrastructure** — playground, EV charging hub, bike
  storage, communal garden — referenced from the Campus rather than
  any one Building.
- **Sibling Construction Package** — `CP-SITE-INFRASTRUCTURE` covers
  campus-wide groundworks + DH mains, distinct from per-building CPs.
- **Campus-scope Issue** — a planning condition affecting all 4
  buildings, owned by the Campus rather than any one Building.

## Navigation

| Area | Start here |
|------|-----------|
| Campus root | [`CAM-GREEN-TERRACE-PARK`](/en/examples/green-terrace-park/campus) |
| Buildings | [BLD-01 (flagship)](/en/examples/green-terrace/building) · [BLD-02 Sunny Crescent](/en/examples/green-terrace-park/buildings/BLD-02-sunny-crescent) · [BLD-03 Linden Court](/en/examples/green-terrace-park/buildings/BLD-03-linden-court) · [BLD-04 Oak Pavilion](/en/examples/green-terrace-park/buildings/BLD-04-oak-pavilion) |
| Shared system | [District heating loop](/en/examples/green-terrace-park/systems/SYS-DH-LOOP-CAMPUS) |
| Shared site features | [Playground](/en/examples/green-terrace-park/site-features/SF-PLAYGROUND) · [EV charging](/en/examples/green-terrace-park/site-features/SF-EV-HUB) · [Bike storage](/en/examples/green-terrace-park/site-features/SF-BIKE-STORAGE) · [Communal garden](/en/examples/green-terrace-park/site-features/SF-COMMUNAL-GARDEN) |
| Shared CP | [Site infrastructure CP](/en/examples/green-terrace-park/construction-packages/CP-SITE-INFRASTRUCTURE) |
| Campus issue | [Planning condition](/en/examples/green-terrace-park/issues/ISS-CAMPUS-PLANNING-001) |

## Why this is a separate example

The single-building Green Terrace examples (design + operation) intentionally
stay tightly scoped. A campus shows *different* mechanics:
- Multi-building hierarchy
- Cross-building systems
- Site infrastructure that doesn't belong to any one building
- Phase variance across siblings

Trying to fold this into the design example would either bloat it or
muddle the type/instance teaching narrative ("Follow Bedroom 01") that
makes it work.

## Notes on the data

This is a **scaffolded** example — BLD-02/03/04 carry minimal data,
just enough to compile and demonstrate the Campus mechanics. The
flagship building (BLD-01) is the depth-first example; the others are
breadth-first siblings. If you need to see what full per-building
detail looks like, the [design-phase Green Terrace example](/en/examples/green-terrace/)
is the place.
