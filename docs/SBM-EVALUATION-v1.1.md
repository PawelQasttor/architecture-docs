# SBM v1.1.0 — Semantic Model Evaluation

## Evaluation Methodology

This evaluation maps the SBM against **real AEC (Architecture, Engineering, Construction) workflows** across the full project lifecycle, identifying what works well, what's missing, and what needs refinement. Each finding is rated:

- **Critical** — Blocks real-world adoption or produces incorrect results
- **Important** — Significant gap that limits usefulness in professional practice
- **Enhancement** — Valuable improvement for completeness

---

## PART 1: What Works Exceptionally Well

These are competitive advantages. Protect them.

| Strength | Why It Matters |
|----------|----------------|
| **Data provenance (6-level confidence)** | No AEC tool tracks field-level data origin. This alone justifies the standard. |
| **Type/Instance pattern** | 26-33% documentation reduction. Matches how architects think (template → instance). |
| **Property inheritance (Level→Space)** | Eliminates 90% of repetition in room schedules. Auto-tagged with `_meta.resolution: inherited`. |
| **Phase gates** | Progressive quality enforcement (assumed→specified→measured) is unique in AEC. |
| **Cost rollup with provenance** | Every EUR traceable from asset → system → building → site → project. Enterprise-grade. |
| **Requirements as first-class entities** | Scoped, versioned, multi-phase verification. Better than any compliance tool. |
| **System hierarchy** | Parent/subsystem with topological sort for cost — no double-counting. |
| **Markdown authoring model** | Human-readable + machine-processable. Git-friendly. Architect-accessible. |
| **Compiler pipeline** | Parse→Normalize→Validate→Quality is architecturally sound and extensible. |

---

## PART 2: Critical Gaps

### 2.1 Building Entity Is Anemic

**Current state**: Building only has `id`, `entityType`, `name`, `version`, `siteId`, `usage`, `cost`, `sources`, `tags`.

**What every real project needs on Building**:

| Missing Field | Why Critical |
|---------------|--------------|
| `grossFloorArea` / `netFloorArea` / `rentableArea` | Core metric for zoning, leasing, feasibility. Every building code requires GFA. |
| `buildingHeight` / `numberOfStoreys` | Zoning compliance, fire code, structural category. |
| `floorAreaRatio` (FAR) / `buildingCoverageRatio` (BCR) | Zoning compliance — determines if building is legally buildable. |
| `structuralSystem` (frame, loadbearing, hybrid) | Fundamental classification for engineering and cost. |
| `occupancyClassification` | Building code classification (residential, commercial, assembly, etc.). |
| `constructionType` | Fire resistance classification (e.g., Type I-V per IBC, or REI rating per Eurocode). |
| `yearBuilt` / `yearRenovated` | Essential for existing buildings, renovation projects. |
| `energyPerformanceCertificate` | Mandatory in EU (EPC/EPBD). |
| `accessibilityCompliance` | Building-level accessibility standard met. |

**Impact**: Cannot perform zoning analysis, building code compliance, or feasibility studies without these. Architects can't use SBM for pre-design if the Building entity is this sparse.

**Recommendation**: Extend Building schema with at minimum `grossFloorArea`, `numberOfStoreys`, `buildingHeight`, `occupancyClassification`, `structuralSystem`.

---

### 2.2 No Structural Entities

**Current coverage by discipline**:
- Architectural (spaces, finishes, adjacencies) ✅ Excellent
- MEP (systems, assets, performance) ✅ Excellent
- Fire Safety (zones, requirements, egress) ✅ Excellent
- Building Envelope (thermal, acoustic, fire) ✅ Excellent
- Structural ❌ **Zero coverage**

**What's missing**:

| Concept | IFC Equivalent | Purpose |
|---------|----------------|---------|
| Foundation | IfcFooting, IfcPile | Load path, geotechnical |
| Column | IfcColumn | Structural grid, load bearing |
| Beam | IfcBeam | Span, load distribution |
| Structural Slab | IfcSlab (structural context) | Floor loading, spans |
| Shear Wall | IfcWall (structural context) | Lateral system |
| Structural System | — | Frame type, material, lateral system |

**Impact**: Structural engineering is ~15-20% of design effort and ~25-40% of construction cost. Not modeling it means SBM can't serve as a true building information model.

**Recommendation**: At minimum, add a `structural_system` entity type that captures: system type (steel frame, concrete frame, timber, masonry loadbearing, hybrid), lateral system (shear walls, braced frame, moment frame), foundation type, seismic category, and design parameters. Full structural element entities (columns, beams) can be a later addition.

---

### 2.3 Phase Model Inconsistencies

Three different phase vocabularies exist:

| Context | Phases | Count |
|---------|--------|-------|
| **Project phases** | initiation, schematic_design, design_development, construction_documents, bidding, construction, post_occupancy, renovation | 8 |
| **Verification phases** | concept, schematic, design_development, construction_documentation, construction, as_built, operation | 7 |
| **Space lifecycle** | planned, design, under_construction, operational, renovation, decommissioned | 6 |

**Problems**:
- `bidding` exists in project phases but not verification (yet bidding involves requirement verification)
- `as_built` exists in verification but not project phases (yet as-built is a critical project milestone)
- `post_occupancy` vs `operation` — same concept, different names
- `initiation` vs `concept` — same concept, different names
- `decommissioned` only in space lifecycle (but buildings and systems also get decommissioned)
- `renovation` appears in both project phases and space lifecycle with different semantics

**Impact**: Confusing for users. Can't reliably map between phase contexts. Phase gate logic may not trigger correctly when phases don't align.

**Recommendation**: Unify to a single canonical phase vocabulary with clear mappings. Suggested:
```
concept → schematic_design → design_development → construction_documents →
bidding_procurement → construction → commissioning → operation → renovation → decommissioned
```

---

### 2.4 Cost Currency Inconsistency

**Current behavior**: Cost rollup sums `totalCost` values across entities without validating currency consistency.

**Scenario**: Building has cost in EUR, but one asset has cost in PLN, another in USD. The rollup produces a meaningless sum.

**Impact**: Incorrect cost aggregation in international projects or projects with imported products.

**Recommendation**: Either:
- (a) Enforce single currency per project (validate in compiler), or
- (b) Add currency conversion at rollup time with explicit exchange rates

---

### 2.5 Adjacent Space Relationship Not Validated Bidirectionally

**Current state**: If Space A declares `adjacentSpaces: [{id: "SP-B", relationship: "shares_wall"}]`, the compiler does NOT check that Space B also declares adjacency to Space A.

**Impact**: Inconsistent adjacency graphs. Spatial analysis outputs may be wrong.

**Recommendation**: Add bidirectional adjacency validation warning in compiler. At minimum, warn when adjacency is one-directional.

---

## PART 3: Important Gaps

### 3.1 No Space Program / Quantitative Brief

**Problem**: Space Types define *what* a bedroom looks like, but there's no entity to say *"this project needs 50 bedrooms, 10 operating rooms, and 3 lobbies"*.

In real practice, **space programming** (functional brief → area requirements) is the first design activity. Architects need:
- Required quantity per space type
- Required total area per type
- Planned vs designed quantities
- Compliance check: "did we design all required spaces?"

**Current workaround**: Project entity has no structured space program. Users must track this externally.

**Recommendation**: Add a `space_program` entity or extend Space Type with `requiredQuantity`, `requiredTotalArea` fields, and add a compiler check that counts designed instances vs programmed requirements.

---

### 3.2 No Sustainability / Carbon Framework

Modern EU projects increasingly require:

| Missing Concept | Driver |
|----------------|--------|
| Embodied carbon per material/assembly | EPBD, Level(s), national codes |
| Operational carbon target per building | EPBD, net-zero targets |
| Lifecycle Assessment (LCA) reference | EN 15978, Level(s) |
| BREEAM/LEED/DGNB credit tracking | Client requirements |
| Carbon budget per entity | Science-based targets |
| Circular economy indicators | EU Taxonomy |

**Current coverage**: Only `Site Feature` has `sustainabilityMetrics`. Envelope has material layers but no carbon data.

**Impact**: SBM cannot support sustainability reporting, which is becoming mandatory for building permits in EU member states.

**Recommendation**: Add sustainability fields to Envelope (embodied carbon per m²), Building (operational carbon target, EPC class), and potentially a `SustainabilityTarget` cross-cutting entity similar to Requirement.

---

### 3.3 No Classification System Integration

**Problem**: No reference to standard classification systems:
- **Uniclass 2015** (UK/international BIM classification)
- **OmniClass** (North America)
- **CSI MasterFormat** (specification divisions)
- **CI/SfB** (European legacy)

**Impact**: Cannot map SBM entities to specification systems. Difficult to integrate with cost databases, specification writers, or BIM authoring tools that use standard classifications.

**Recommendation**: Add optional `classification` field to all entities:
```yaml
classification:
  uniclass: "Ss_20_05_30"  # Rooms & spaces > Residential spaces > Bedrooms
  omniclass: "13-31 21 17"  # Bedroom Space
  csiDivision: "01 00 00"   # General Requirements
```

---

### 3.4 No Construction Administration Entities

The construction phase is well-modeled for **planning** (Construction Packages) but lacks **execution tracking**:

| Missing Entity | Purpose | Industry Standard |
|----------------|---------|-------------------|
| RFI (Request for Information) | Track design clarifications during construction | AIA G716 |
| Change Order | Track scope/cost/schedule changes | AIA G701 |
| Submittal | Track product data submissions and approvals | AIA G810 |
| Inspection | Track site inspections and test results | — |
| Punch List / Deficiency | Track completion items before handover | — |

**Impact**: SBM covers design and planning but drops off during construction administration — the phase where most problems (and costs) occur.

**Recommendation**: These could be a v1.2 or v2.0 addition. At minimum, consider an `Issue` entity that covers RFIs, deficiencies, and change orders as subtypes.

---

### 3.5 No Temporal Entity Versioning

**Current state**: The `version` field is the SBM schema version (e.g., "1.1.0"), not an entity revision counter.

**Problem**: In real projects, room schedules go through 10-20 revisions. Architects need:
- Who changed the area from 14.5m² to 16.0m²?
- When was the fire rating changed from EI30 to EI60?
- What was the cost estimate at schematic design vs. at CD?

**Current workaround**: Git history provides this, but it's not accessible to non-developer users and not available in compiled output.

**Impact**: No audit trail within the compiled SBM. Compliance teams can't trace decisions.

**Recommendation**: Add optional `revision` field (integer counter) and `revisionHistory` array to all entities:
```yaml
revision: 3
revisionHistory:
  - rev: 1
    date: "2025-06-15"
    author: "J. Kowalski"
    summary: "Initial design"
  - rev: 2
    date: "2025-09-20"
    author: "M. Nowak"
    summary: "Area increased per client request"
```

---

### 3.6 Requirement Scope Not Validated

**Current state**: Space.requirements[] can reference ANY Requirement entity. The compiler validates that the Requirement entity exists but does NOT check whether the Requirement's `scope.entityType`, `scope.spaceTypes[]`, or `scope.countries[]` actually match the referencing entity.

**Example**: A hospital-only requirement (`scope.spaceTypes: ["operating_room"]`) applied to a residential bedroom — no error.

**Impact**: Requirements may be incorrectly applied. Compliance reports may include irrelevant requirements.

**Recommendation**: Add scope-matching validation in the compiler's business rules stage. At minimum, warn when a requirement's scope doesn't match the referencing entity.

---

## PART 4: Enhancements

### 4.1 No Design Option Comparison

Real projects explore multiple options: "Option A has 3 bedrooms at 16m², Option B has 4 bedrooms at 12m²". SBM cannot model alternatives.

**Recommendation**: Support optional `designOption` tag on entities, with compiler able to produce separate rollups per option.

---

### 4.2 No Material Entity

Materials appear inline in envelope layers and finishes, but there's no reusable Material entity. Same material specification is duplicated across entities.

**Recommendation**: Add `material` / `material_type` entities referenced by envelope layers, finishes, and structural elements. Would enable:
- Material procurement aggregation
- Embodied carbon calculation
- Sustainability reporting

---

### 4.3 No Stakeholder/Responsibility Tracking

No way to assign entities to disciplines (architectural, structural, MEP, landscape) or responsible parties (lead architect, MEP consultant, contractor).

**Recommendation**: Add optional `responsibility` field:
```yaml
responsibility:
  discipline: "architectural"
  organization: "Studio ABC"
  contact: "j.kowalski@studio-abc.pl"
  role: "lead_designer"
```

---

### 4.4 No FF&E (Furniture, Fixtures & Equipment) Distinction

Assets cover mechanical equipment well but don't distinguish between:
- **FF (Furniture & Fixtures)**: desks, chairs, shelving — interior design
- **E (Equipment)**: HVAC units, generators — mechanical engineering

In practice, these have different procurement paths, budgets, and responsible parties.

**Recommendation**: Add `assetCategory` enum to Asset: `equipment`, `furniture`, `fixture`, `fitting`, `signage`.

---

### 4.5 Compiler Validation Gaps

Identified gaps in the compiler's validation:

| Gap | Current Behavior | Recommended |
|-----|-------------------|-------------|
| **Circular adjacent spaces** | Not detected | Detect and warn (A↔B↔C↔A) |
| **Duplicate asset-system** | Asset in parent + subsystem → double-count cost | Validate exclusivity |
| **Construction phase overlaps** | No temporal validation | Warn on schedule conflicts |
| **Envelope boundary closure** | No topological check | Validate that envelopes form coherent boundaries |
| **Opening area vs envelope area** | No validation | Warn if sum(opening areas) > envelope netArea |
| **Level ordering** | No validation of `order` field continuity | Warn on gaps or duplicates |

---

### 4.6 Horizontal Circulation

**Vertical Circulation** (stairs, elevators) is a first-class entity, but **horizontal circulation** (corridors, lobbies, ramps) is just modeled as spaces with `spaceType: "corridor"`.

This means:
- No way to model a circulation network/path
- No egress route calculation (only egress capacity per vertical circulation)
- No accessibility route verification

**Recommendation**: Either extend Space with circulation-specific fields (`isCirculationPath`, `egressRouteId`, `travelDistance`) or add a `circulation_route` entity that connects spaces and vertical circulations into paths.

---

### 4.7 Multi-Building Campus Model

Site→Building is 1:many, but there's no campus-level aggregation:
- Shared infrastructure between buildings (district heating, shared parking)
- Campus-wide systems (security, fire alarm, access control)
- Multi-building cost rollup
- Site features shared across buildings

**Current workaround**: A single Site contains multiple Buildings, which works for simple campuses but not for large developments with multiple sites.

**Recommendation**: Consider a `Campus` or `Development` entity above Site for multi-site projects.

---

## PART 5: Workflow Coverage Matrix

| AEC Workflow | SBM Coverage | Notes |
|---|---|---|
| **Pre-Design / Programming** | ⚠️ Partial | Space Types exist but no quantitative program |
| **Site Analysis** | ✅ Good | Site entity with constraints, utilities, topography |
| **Concept Design** | ⚠️ Partial | Building entity too sparse for massing/feasibility |
| **Schematic Design** | ✅ Good | Spaces, levels, zones, initial requirements |
| **Design Development** | ✅ Excellent | Detailed specs, performance targets, simulations |
| **Construction Documents** | ✅ Good | Requirements, construction packages, cost |
| **Bidding / Procurement** | ⚠️ Partial | Construction packages but no BOQ/bid comparison |
| **Construction Admin** | ❌ Missing | No RFI, change order, submittal, inspection |
| **Commissioning** | ⚠️ Partial | Verification methods but no test result entity |
| **Handover** | ✅ Good | Asset register, maintenance data, warranties |
| **Facility Management** | ⚠️ Partial | Asset data good but no work orders, condition tracking |
| **Renovation** | ⚠️ Partial | Phase exists but no demolition/retention modeling |
| **Sustainability** | ❌ Missing | No carbon, LCA, certification tracking |
| **Structural Design** | ❌ Missing | Zero structural entities |
| **Fire Engineering** | ✅ Excellent | Zones, requirements, egress, ratings |
| **Acoustic Design** | ✅ Good | Zone types, performance targets, boundary types |
| **MEP Design** | ✅ Excellent | Systems, subsystems, assets, performance |
| **Landscape / External** | ✅ Good | Site features with sustainability metrics |
| **BIM Coordination** | ✅ Good | IFC mapping, BCF templates, IDS validation |

---

## PART 6: Prioritized Roadmap

### v1.2 — Foundation Fixes (Quick Wins)
1. **Extend Building entity** with GFA, height, storeys, occupancy, structural system
2. **Unify phase vocabulary** across project/verification/lifecycle
3. **Add currency validation** in cost rollup
4. **Add bidirectional adjacency validation**
5. **Add requirement scope matching** validation
6. **Add classification field** (Uniclass/OmniClass optional)
7. **Fix compiler validation gaps** (circular adjacency, level ordering, etc.)

### v1.3 — Completeness
8. **Add Space Program entity** for quantitative programming
9. **Add sustainability fields** (embodied carbon, EPC, LCA reference)
10. **Add entity revision tracking** (revision counter + history)
11. **Add stakeholder/responsibility fields**
12. **Add material entity** for reusable material specifications
13. **Add assetCategory** enum for FF&E distinction

### v2.0 — Full Lifecycle
14. **Add structural system entity** (at minimum building-level structural description)
15. **Add construction administration entities** (RFI, Change Order, Submittal, Inspection)
16. **Add commissioning/test result entity**
17. **Add circulation route entity** for egress path modeling
18. **Add design option tagging** for alternatives comparison
19. **Add campus/development entity** for multi-site projects

---

## Summary

**SBM v1.1.0 is strong in design-phase documentation** — spaces, zones, systems, requirements, and cost rollup are enterprise-grade. The data provenance system is best-in-class.

**Primary gaps are**:
1. Building entity is too sparse for pre-design/feasibility
2. No structural modeling at all
3. Phase vocabularies are inconsistent
4. Construction administration workflows are absent
5. Sustainability/carbon is not modeled
6. Several compiler validation gaps allow inconsistent data

The model excels at "what the building IS" (semantic description) but struggles with "how the building gets BUILT" (process/workflow tracking) and "how the building PERFORMS" (operational data).

Addressing the v1.2 items would significantly improve professional adoption with minimal schema disruption.
