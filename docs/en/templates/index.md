# Document Templates

Templates are copy-paste-ready Markdown files with structured YAML frontmatter for each SBM (Spatial Building Model) document type. Each template provides the correct schema, required fields, and inline guidance so you can create building documents consistently and without guesswork.

All templates follow the same pattern: a YAML frontmatter block defining structured data, followed by a Markdown body for free-form description and notes.

::: tip Before You Start
If this is your first time working with SBM documents, read the [Quick Start Guide](/en/standards/quick-start) to understand the overall workflow before diving into templates.
:::

---

## Available Templates

### Space Template

**What it's for:** Documenting rooms and functional areas -- bedrooms, offices, corridors, kitchens, storage rooms, and any defined spatial unit within a building.

**When to use:** Architectural programming, space planning, design development, and as-built documentation.

**Link:** [Space Template](/en/templates/space-template)

```yaml
---
entity: space
name: "Room Name"
space_code: "SP-001"
floor: "Level 1"
area_m2: 0.0
function: "residential | office | circulation | service"
zone_refs: []
---
```

---

### Zone Template

**What it's for:** Documenting overlay zones that group spaces by regulatory or environmental criteria -- fire zones, acoustic zones, HVAC zones, lighting zones, and security zones.

**When to use:** Fire safety planning, acoustic design, HVAC zoning, and regulatory compliance documentation.

**Link:** [Zone Template](/en/templates/zone-template)

```yaml
---
entity: zone
name: "Zone Name"
zone_code: "ZN-001"
zone_type: "fire | acoustic | hvac | lighting | security"
classification: ""
space_refs: []
requirement_refs: []
---
```

---

### Requirement Template

**What it's for:** Documenting performance rules, regulatory constraints, and design criteria that spaces, zones, or systems must satisfy -- fire resistance ratings, acoustic limits, ventilation rates, and building code clauses.

**When to use:** Regulatory analysis, design brief definition, compliance tracking, and handover documentation.

**Link:** [Requirement Template](/en/templates/requirement-template)

```yaml
---
entity: requirement
name: "Requirement Name"
requirement_code: "REQ-001"
category: "fire | acoustic | thermal | ventilation | structural"
source: "Building Code / Standard Reference"
target_value: ""
unit: ""
---
```

---

### System Template

**What it's for:** Documenting MEP (mechanical, electrical, plumbing) systems and their design parameters -- HVAC distribution, electrical circuits, plumbing networks, and fire suppression systems.

**When to use:** MEP design, system specification, commissioning planning, and operations documentation.

**Link:** [System Template](/en/templates/system-template)

```yaml
---
entity: system
name: "System Name"
system_code: "SYS-001"
system_type: "hvac | electrical | plumbing | fire_suppression"
serving_zones: []
asset_refs: []
requirement_refs: []
---
```

---

### Asset Template

**What it's for:** Documenting individual equipment instances with operational and maintenance data -- boilers, air handling units, pumps, switchboards, and any maintainable device installed in the building.

**When to use:** Equipment specification, procurement, commissioning, asset management, and maintenance planning.

**Link:** [Asset Template](/en/templates/asset-template)

```yaml
---
entity: asset
name: "Asset Name"
asset_code: "AST-001"
asset_type: "boiler | ahu | pump | switchboard"
manufacturer: ""
model: ""
system_ref: ""
location_space_ref: ""
---
```

---

## Which Template?

Use this table to find the right template for what you need to document.

| I need to document... | Use this template |
|---|---|
| A room, bedroom, office, corridor | [Space Template](/en/templates/space-template) |
| A fire zone, acoustic zone, HVAC zone | [Zone Template](/en/templates/zone-template) |
| A performance rule or regulation | [Requirement Template](/en/templates/requirement-template) |
| An HVAC, electrical, or plumbing system | [System Template](/en/templates/system-template) |
| A specific piece of equipment (boiler, AHU, pump) | [Asset Template](/en/templates/asset-template) |

::: tip Cross-References Between Documents
Documents reference each other through `_refs` fields. For example, a Zone references its Spaces via `space_refs`, and a System references its Assets via `asset_refs`. These references are validated by the compiler to ensure consistency across your project.
:::

---

## How to Use a Template

Follow these four steps to create a new document from any template.

**Step 1 -- Copy the template file.**
Duplicate the template Markdown file into the appropriate folder in your project. Rename it to match your document (e.g., `bedroom-01.md`, `fire-zone-zl-iv.md`).

**Step 2 -- Fill in the YAML frontmatter fields.**
Replace the placeholder values with your actual data. Required fields are indicated in each template. Use the [Frontmatter Schema](/en/standards/frontmatter-schema) reference for field definitions and allowed values.

**Step 3 -- Add a Markdown description below the frontmatter.**
Write a plain-language description of the document. Include design intent, notable constraints, relevant photos, or any context that structured fields alone cannot capture.

**Step 4 -- Validate with the compiler.**
Run the SBM compiler against your project to check that all required fields are present, cross-references resolve correctly, and values conform to the schema.

::: tip Validation Catches Mistakes Early
Always validate after adding or modifying a document. The compiler will flag missing required fields, broken cross-references, and invalid enumeration values before they cause problems downstream.
:::

---

## Examples in Practice

See completed documents built from these templates in the Green Terrace example project.

| Template | Example Document |
|---|---|
| Space | [Bedroom 01 (Green Terrace)](/en/examples/green-terrace/spaces/bedroom-01) |
| Zone | [Fire Zone ZL-IV (Green Terrace)](/en/examples/green-terrace/zones/fire-zone-zl-iv) |

These examples show real frontmatter values, properly formed cross-references, and descriptive Markdown content that follows the [Authoring Guide](/en/documentation/authoring/) conventions.

---

## Related Resources

| Resource | Description |
|---|---|
| [Quick Start Guide](/en/standards/quick-start) | Create your first document from scratch |
| [Authoring Guide](/en/documentation/authoring/) | Detailed writing instructions and conventions |
| [Frontmatter Schema](/en/standards/frontmatter-schema) | Complete field reference for all document types |
| [PDF Export Guide](/en/guides/pdf-export) | Generate professional PDFs from your documents |
