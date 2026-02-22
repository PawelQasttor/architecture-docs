# LOD/LOI Matrix

This page provides a detailed matrix mapping Level of Development (LOD) and Level of Information (LOI) requirements to each project phase and element type. Use this matrix to set expectations in the [BIM Execution Plan](/en/bim-integration/bep) and to verify model deliverables at each phase gate.

## Definitions

**Level of Development (LOD)** describes the geometric completeness and reliability of a model element. It ranges from a conceptual placeholder (LOD 100) to an as-built verified representation (LOD 500).

**Level of Information (LOI)** describes the non-geometric data attached to a model element -- specifications, performance data, manufacturer details, maintenance schedules, and similar attributes.

::: info
LOD and LOI advance together but are tracked separately. An element may have detailed geometry (high LOD) but lack maintenance data (lower LOI) if the project has not yet reached the handover stage.
:::

## LOD Scale Overview

| LOD | Name | Description | Typical phase |
|---|---|---|---|
| LOD 100 | Conceptual | Symbolic representation, approximate size and location | [Concept](/en/phases/concept) |
| LOD 200 | Approximate | Generic element with approximate dimensions, shape, and orientation | [Schematic](/en/phases/schematic) |
| LOD 300 | Precise | Specific element with accurate dimensions, shape, and position | [Design Development](/en/phases/design-development) |
| LOD 350 | Construction-ready | LOD 300 plus interfaces and connections to other elements | [Construction Docs](/en/phases/construction-docs) |
| LOD 400 | Fabrication | Detailed enough for fabrication or procurement | [Construction](/en/phases/construction) |
| LOD 500 | As-Built | Verified field representation of the installed element | [As-Built](/en/phases/as-built) |

## LOI Scale Overview

| LOI level | Data scope | Examples |
|---|---|---|
| LOI Basic | Type and function only | Wall type: external load-bearing |
| LOI Defined | Material and key performance values | U-value, fire rating, acoustic rating |
| LOI Detailed | Specific product selections and compliance data | Manufacturer, product code, test certificate reference |
| LOI Complete | Full lifecycle data including maintenance and operation | Warranty period, maintenance intervals, replacement cost, sensor mapping |

## Full LOD/LOI Matrix by Element Type

### Walls

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Massing volumes or single-line placeholders | Basic | Internal / external designation, approximate height |
| Schematic | 200 | Generic wall with approximate thickness | Defined | Wall type, target U-value, fire rating class |
| Design Development | 300 | Accurate thickness, openings positioned, layer build-up | Detailed | Material layers, confirmed U-value, acoustic performance, product specification |
| Construction Docs | 350 | Connections to floors, roofs, and adjacent walls shown | Detailed | Fixing details, movement joints, cavity barriers referenced |
| Construction | 400 | Shop drawing level of detail where required | Complete | Supplier, delivery schedule, installation method |
| As-Built | 500 | Verified geometry matching installed condition | Complete | Installed product, test results, warranty info |

### Floors and Slabs

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Floor plate outline, level datum | Basic | Structural or non-structural designation |
| Schematic | 200 | Generic slab with nominal thickness | Defined | Structural system type, target load capacity |
| Design Development | 300 | Accurate build-up, openings, edge conditions | Detailed | Concrete grade, reinforcement type, finish specification |
| Construction Docs | 350 | Connections to beams, columns, and walls | Detailed | Pour sequence, construction joint locations |
| Construction | 400 | Reinforcement layout, embed locations | Complete | Reinforcement schedule, supplier, pour records |
| As-Built | 500 | As-constructed geometry with survey verification | Complete | Concrete test certificates, as-built levels |

### Roofs

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Roof outline and general form (flat, pitched) | Basic | Roof type classification |
| Schematic | 200 | Approximate shape with pitch and overhang indicated | Defined | Waterproofing strategy, target U-value |
| Design Development | 300 | Full build-up with layers, drainage points, roof lights positioned | Detailed | Membrane type, insulation type, drainage calculations reference |
| Construction Docs | 350 | Edge details, penetration interfaces, expansion joints | Detailed | Detail drawings referenced, flashing specifications |
| Construction | 400 | Installation sequence, temporary works requirements | Complete | Manufacturer, installation method statement |
| As-Built | 500 | Verified roof geometry and installed materials | Complete | Warranty certificates, inspection records |

### Doors

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Opening indicated in wall, no leaf detail | Basic | Door function (entry, internal, fire) |
| Schematic | 200 | Generic door panel with approximate dimensions | Defined | Door type, fire rating, approximate size |
| Design Development | 300 | Accurate dimensions, swing direction, frame indicated | Detailed | Material, glazing type, hardware set, acoustic rating |
| Construction Docs | 350 | Frame-to-wall junction, threshold detail | Detailed | Door schedule reference, ironmongery schedule |
| Construction | 400 | Full door assembly with hardware positions | Complete | Manufacturer, product code, lead time |
| As-Built | 500 | Installed door verified on site | Complete | Serial number, installation date, warranty |

### Windows

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Opening indicated, approximate size | Basic | Window function (fixed, openable) |
| Schematic | 200 | Generic frame with glazing zone indicated | Defined | Target U-value (frame + glass), solar gain target |
| Design Development | 300 | Accurate dimensions, mullion layout, opening type | Detailed | Glass specification, frame material, confirmed U-value and g-value |
| Construction Docs | 350 | Frame-to-wall interface, sill and head details | Detailed | Installation method, weather seal specification |
| Construction | 400 | Fabrication-ready detail with hardware | Complete | Manufacturer, product code, delivery date |
| As-Built | 500 | Installed window verified | Complete | Test certificates, warranty, maintenance instructions |

### MEP (Mechanical, Electrical, Plumbing)

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | -- | Not typically modelled | -- | -- |
| Schematic | 100 | Schematic layout, zone allocations, riser positions | Basic | System type (HVAC, electrical, plumbing) |
| Design Development | 200 | Approximate routing, equipment placeholders with clearance zones | Defined | Capacity requirements, system performance targets |
| Construction Docs | 300 | Accurate duct/pipe/cable tray routing, equipment with dimensions | Detailed | Equipment schedules, pressure drops, circuit details |
| Construction | 400 | Fabrication-level detail, spool drawings, panel schedules | Complete | Supplier, model number, installation sequence |
| As-Built | 500 | Verified installed positions and connections | Complete | Commissioning data, sensor IDs (see [Sensors and IoT](/en/bim-integration/sensors-iot)), O&M data |

::: tip
For MEP elements at LOD 500, ensure that all sensors and meters are tagged with unique identifiers that align with the building management system. This enables [digital twin](/en/bim-integration/sensors-iot) functionality after handover.
:::

### Structural Elements (Beams, Columns, Foundations)

| Phase | LOD | Geometry detail | LOI | Information required |
|---|---|---|---|---|
| Concept | 100 | Structural grid and indicative spans | Basic | Structural system type (steel, concrete, timber) |
| Schematic | 200 | Generic members with approximate sizes on grid | Defined | Material grade, approximate member sizes, target load capacity |
| Design Development | 300 | Accurate cross-sections, connections indicated | Detailed | Confirmed sizes, connection types, design loads |
| Construction Docs | 350 | Connection details, reinforcement outlines, hold-down locations | Detailed | Connection schedules, reinforcement schedules |
| Construction | 400 | Fabrication detail: rebar bending schedules, steel fabrication models | Complete | Fabricator, shop drawing reference, erection sequence |
| As-Built | 500 | As-constructed geometry verified by survey | Complete | Material test certificates, inspection records, as-built deviations |

## Phase-to-LOD Summary Table

| Element type | Concept | Schematic | Design Dev. | Const. Docs | Construction | As-Built |
|---|---|---|---|---|---|---|
| Walls | 100 | 200 | 300 | 350 | 400 | 500 |
| Floors | 100 | 200 | 300 | 350 | 400 | 500 |
| Roofs | 100 | 200 | 300 | 350 | 400 | 500 |
| Doors | 100 | 200 | 300 | 350 | 400 | 500 |
| Windows | 100 | 200 | 300 | 350 | 400 | 500 |
| MEP | -- | 100 | 200 | 300 | 400 | 500 |
| Structure | 100 | 200 | 300 | 350 | 400 | 500 |

## How to Use This Matrix

1. **During BEP preparation** -- reference this matrix to set LOD/LOI expectations for each discipline. See [BIM Execution Plan](/en/bim-integration/bep).
2. **At phase gates** -- check delivered models against the required LOD/LOI. Models that do not meet the required level must be returned for rework before phase sign-off.
3. **For IFC export** -- ensure that the information required at each LOI level is mapped to IFC property sets. See [IFC Entities](/en/bim-integration/ifc-entities) for mapping tables.
4. **For [bidirectional sync](/en/bim-integration/bidirectional-sync)** -- the LOI level determines which data fields are synchronised between the BIM model and the project database.

::: warning
Do not over-model. Providing LOD 400 detail during the Schematic phase wastes effort and may lock in design decisions prematurely. Follow the matrix to keep modelling effort aligned with project progress.
:::

## Related Pages

- [BIM Execution Plan (BEP)](/en/bim-integration/bep)
- [LOD Definitions](/en/bim-integration/lod-definitions)
- [IFC Entities](/en/bim-integration/ifc-entities)
- [Bidirectional Sync](/en/bim-integration/bidirectional-sync)
- [Sensors and IoT](/en/bim-integration/sensors-iot)
