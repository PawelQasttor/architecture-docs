# Concept

::: tip Phase: `concept` — 1 of 10
**What you do:** Establish the brief, test feasibility, develop 2–3 design
concepts and massing studies, sanity-check against zoning.
**Typical BIM LOD:** LOD 100 — symbolic massing
**Key deliverables:** Project brief, feasibility note, massing options,
preliminary code & cost check, selected concept
**Replaces (legacy):** *Project Initiation* + *Concept Design (LOD 100)*
:::

> The SBM lifecycle has 10 unified phases: **concept** → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [See the full lifecycle →](/en/phases/)

---

## Purpose & activities

The `concept` phase takes a project from "we have a site and an intention"
to "we have a chosen design direction".

**Initiation & brief** (folded in from the former separate phase)

- Capture the client brief: purpose, accommodation schedule, budget envelope, programme.
- Confirm site facts: plot, zoning instrument (MPZP/WZ), constraints, utilities.
- Record a feasibility position: is the brief deliverable on this site within budget?

**Concept design**

1. Develop 2–3 design concepts responding to the brief.
2. Create massing studies (volume, form, orientation).
3. Establish approximate dimensions and gross floor area.
4. Test concepts against zoning (height, coverage, setbacks).
5. Prepare order-of-magnitude cost estimates (±30%).
6. Present concepts; record the client's selection and rationale.

---

## SBM entities at this phase

The model is intentionally coarse here — breadth over depth:

| Entity | Maturity at `concept` |
|--------|------------------------|
| `project` | Brief, country, budget envelope, `phase: concept` |
| `site` | Plot, zoning instrument, key constraints |
| `building` | Approximate GFA, storeys, height, occupancy intent |
| `level` | Created with approximate elevations / floor-to-floor |
| `space` | Rough rooms with `designArea`, space type assigned |
| `zone` | Preliminary fire / HVAC zones started |
| `requirement` | Regulatory context begins to be referenced |

```yaml
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "concept"
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
designArea: 14.5            # approximate — confidence: assumed is fine here
unit: "m"
```

[Explore SBM entity definitions →](/en/documentation/entities/)

---

## BIM requirements — LOD 100

LOD 100 is **symbolic**: approximate size and location, generic properties.
Massing volumes, level planes, basic roof form — no specific materials or
details.

```yaml
bimLOD: "LOD_100"
```

[Learn more about LOD definitions →](/en/bim-integration/lod-definitions)

---

## Regulatory focus

- **Construction Law, Art. 5** — preliminary check of structural, fire,
  safety, accessibility and energy considerations.
- **Zoning (MPZP / WZ)** — height limit, coverage ratio, setbacks,
  parking and green-space minima.

[Construction Law →](/en/regulations/prawo-budowlane) ·
[Zoning: MPZP & WZ →](/en/regulations/zoning-mpzp-wz)

---

## Compiler & quality gate

At `concept`, the compiler accepts **all confidence levels** — `assumed`
data is expected this early. Gates only tighten from
`construction_documents` onward (see the
[lifecycle gate table](/en/phases/#compiler-phase-gates)).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase concept
```

So the rule at this phase is simply: **annotate confidence honestly**
(`_meta.confidence: assumed`) rather than over-claiming precision.

---

## Workflow

```bash
mkdir 01-concept && cd 01-concept
# brief.md, feasibility.md, massing-options.md, concept.md
git add . && git commit -m "Concept design — 3 options, selection recorded"
git tag concept-v1.0
```

[PDF export →](/en/guides/pdf-export)

---

## Worked example — Green Terrace

See the chosen concept carried through the model:
[Green Terrace project →](/en/examples/green-terrace/) ·
[a space at design maturity →](/en/examples/green-terrace/spaces/bedroom-01)

---

## Phase-gate checklist

Before advancing to `schematic_design`:

- [ ] Brief and accommodation schedule recorded
- [ ] Feasibility position documented
- [ ] Client has selected a preferred concept (decision logged)
- [ ] Massing model created (LOD 100)
- [ ] Approximate dimensions & GFA established
- [ ] Preliminary zoning compliance verified
- [ ] Order-of-magnitude cost estimate prepared
- [ ] Confidence annotated honestly on early data
- [ ] Concept gate review passed — [phase-gate checklists →](/en/quality/phase-gates)

---

## Navigation

← *(lifecycle start)* ·
[**Lifecycle overview**](/en/phases/) ·
[`schematic_design` →](/en/phases/schematic-design)

[Complete document-by-document workflow →](/en/standards/document-structure)
