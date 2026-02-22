# Authoring Guide

The Semantic Building Model uses **human-friendly Markdown with YAML frontmatter** for authoring building documents. This guide shows you how to create spaces, zones, requirements, systems, and assets.

## Why Markdown + YAML?

Traditional BIM authoring happens entirely in visual tools (Revit, ArchiCAD). SBM separates **semantic intent** (what the building should do) from **geometric implementation** (how it looks).

**Benefits:**
- **Version control friendly** - Track changes with Git
- **AI-readable** - LLMs can generate and modify documents
- **Human-readable** - Architects can read and edit directly
- **Compiler-driven** - Automatic validation and BIM sync

## Authoring Workflow

```
1. Choose Document Type
   ↓
2. Copy Template
   ↓
3. Fill YAML Frontmatter
   ↓
4. Add Markdown Description
   ↓
5. Compile & Validate
   ↓
6. Review Outputs
```

## Quick Start Example

Let's create a bedroom space:

### Step 1: Create File

```bash
# Create file in your project
touch docs/en/examples/my-project/spaces/bedroom-01.md
```

### Step 2: Add YAML Frontmatter

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

designArea: 14.5
designHeight: 2.70
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Bedroom 01

Standard bedroom with north-facing window providing natural daylight.

## Design Parameters

- Floor area: 14.5 m²
- Clear height: 2.70 m
- Window area: 3.2 m² (22% of floor area)

## Requirements

This space must satisfy:
- Minimum daylight factor 2% (EN 17037)
- Acoustic Class B insulation (ISO 140-4)
- Room height ≥ 2.50 m (WT 2021 § 132)
```

### Step 3: Compile

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose
```

### Step 4: Review Output

```bash
# Check canonical model
cat build/my-project/sbm.json | jq '.entities.spaces[0]'

# Check compliance
cat build/my-project/compliance_report.json | jq '.summary'
```

## Document Types

Choose the right document type for what you're documenting:

| Document Type | When to Use | Template |
|-------------|-------------|----------|
| **Space** | Rooms, functional areas | [Space Template](/en/documentation/authoring/templates#space) |
| **Zone** | Fire, HVAC, acoustic, security zones | [Zone Template](/en/documentation/authoring/templates#zone) |
| **Requirement** | Performance rules, regulatory compliance | [Requirement Template](/en/documentation/authoring/templates#requirement) |
| **System** | MEP systems (HVAC, electrical, plumbing) | [System Template](/en/documentation/authoring/templates#system) |
| **Asset Instance** | Physical equipment with maintenance data | [Asset Template](/en/documentation/authoring/templates#asset-instance) |
| **Building** | Building-level metadata | [Building Template](/en/documentation/authoring/templates#building) |
| **Level** | Floor/storey information | [Level Template](/en/documentation/authoring/templates#level) |

## YAML Frontmatter Rules

### Required Fields

Every document **must** have:

```yaml
---
documentType: "space"   # Entity category
entityType: "space"     # Entity type
id: "SP-BLD-01-L01-001" # Unique identifier
version: "1.0.0"        # Semantic version
---
```

### ID Naming Conventions

Use hierarchical, human-readable IDs:

| Document Type | Format | Example |
|--------|--------|---------|
| Building | `BLD-{seq}` | `BLD-01` |
| Level | `LVL-{seq}` | `LVL-01` |
| Space | `SP-{building}-{level}-{seq}` | `SP-BLD-01-L01-001` |
| Zone | `ZONE-{type}-{descriptor}` | `ZONE-FIRE-ZL-IV` |
| System | `SYS-{category}-{seq}` | `SYS-HVAC-01` |
| Asset | `AI-{type}-{seq}` | `AI-AHU-01` |
| Requirement | `REQ-{scope}-{descriptor}-{seq}` | `REQ-DAYLIGHT-SLEEPING-001` |

### Data Types

```yaml
# String
spaceName: "Bedroom 01"

# Number
designArea: 14.5

# Boolean
maintenanceRequired: true

# Array
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

# Object
occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"

# Date (ISO 8601)
installationDate: "2026-08-15"
```

### Units

Always specify units for measurements:

```yaml
# Length
designHeight: 2.70
unit: "m"  # or "mm", "cm"

# Area
designArea: 14.5
areaUnit: "m2"  # or "m²", "ft2"

# Volume
designVolume: 39.15
volumeUnit: "m3"  # or "m³", "ft3"

# Temperature
temperature: 21.5
temperatureUnit: "C"  # or "°C", "F"
```

## Markdown Body

After the frontmatter, add human-readable documentation:

```markdown
---
# YAML frontmatter here
---

# Document Name

Brief description of the document.

## Section 1

Details about the entity...

## Section 2

More details...
```

**Best practices:**
- **Heading 1 (`#`)** - Document name
- **Heading 2 (`##`)** - Major sections
- **Bullets** - Lists of requirements, features
- **Tables** - Technical specifications
- **Links** - Reference other documents or external docs

## Relationships Between Documents

Documents reference each other via IDs:

### Forward References (You Define)

```yaml
# Space references its parent and zones
space:
  id: "SP-BLD-01-L01-001"
  buildingId: "BLD-01"           # Parent building
  levelId: "LVL-01"              # Parent level
  zoneIds:                       # Zones containing this space
    - "ZONE-FIRE-ZL-IV"
    - "ZONE-HVAC-NORTH"
  requirements:                  # Requirements for this space
    - "REQ-DAYLIGHT-SLEEPING-001"

# Asset references its parent system
asset:
  id: "AI-AHU-01"
  systemId: "SYS-HVAC-01"        # Parent system
```

### Reverse References (Auto-Computed)

The compiler automatically computes reverse relationships:

```yaml
# Zone automatically gets list of contained spaces
zone:
  id: "ZONE-FIRE-ZL-IV"
  spaceIds:  # Auto-computed from space.zoneIds
    - "SP-BLD-01-L01-001"
    - "SP-BLD-01-L01-002"

# System automatically gets list of assets
system:
  id: "SYS-HVAC-01"
  assetInstanceIds:  # Auto-computed from asset.systemId
    - "AI-AHU-01"
    - "AI-VAV-01"

# Level automatically gets list of spaces
level:
  id: "LVL-01"
  spaceIds:  # Auto-computed from space.levelId
    - "SP-BLD-01-L01-001"
    - "SP-BLD-01-L01-002"
```

**Why this matters:** You define natural relationships (space -> zone), and the compiler fills in reverse lookups automatically.

## File Organization

Organize documents by type in subdirectories:

```
docs/en/examples/my-project/
├── building.md                 # Building metadata
├── levels/
│   ├── level-01.md
│   ├── level-02.md
│   └── level-roof.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   ├── living-room-01.md
│   └── kitchen-01.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   ├── hvac-zone-north.md
│   └── acoustic-zone-night.md
├── systems/
│   ├── sys-hvac-01.md
│   ├── sys-elec-01.md
│   └── sys-plumbing-01.md
└── assets/
    ├── ai-ahu-01.md
    ├── ai-vav-01.md
    └── ai-pump-01.md
```

**Benefits:**
- Easy to find documents
- Clear project structure
- Git-friendly (one document per file = minimal merge conflicts)

## Validation During Authoring

Use the compiler's `--validate-only` flag to check for errors without generating outputs:

```bash
# Quick validation check
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

**Common validation errors:**

### Missing Required Fields
```
[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
```

**Fix:** Add the required field:
```yaml
spaceType: "sleeping_space"
```

### Invalid References
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid zoneId: ZONE-FIRE-INVALID (does not exist)
```

**Fix:** Use correct zone ID or create the referenced zone.

### Invalid Enum Values
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid spaceType: "dormitory" (expected one of: sleeping_space, bedroom, ...)
```

**Fix:** Use valid enum value from document type documentation.

## Versioning Documents

Use semantic versioning for documents:

```yaml
version: "1.0.0"  # Major.Minor.Patch
```

**When to increment:**
- **Major (1.0.0 → 2.0.0)** - Breaking changes (ID change, document type change)
- **Minor (1.0.0 → 1.1.0)** - New fields added
- **Patch (1.0.0 → 1.0.1)** - Corrections, typo fixes

## Next Steps

- **[Creating Documents](/en/documentation/authoring/creating-entities)** - Detailed guide for each document type
- **[Document Templates](/en/documentation/authoring/templates)** - Copy-paste templates
- **[Document Type Reference](/en/documentation/entities/)** - Complete field documentation
- **[Compiler Guide](/en/documentation/compiler/)** - Compiling your documents
