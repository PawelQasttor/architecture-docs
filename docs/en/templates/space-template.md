# Space Document Template

Use this template to document individual rooms and spaces in your building project.

## Template File

**Filename pattern:** `spaces/[space-name].md`
**Example:** `spaces/bedroom-01.md`, `spaces/conference-room-a.md`

---

## YAML Frontmatter Template

```yaml
---
# Document Identification
documentType: "space"
entityType: "space"
id: "SP-[BLD-ID]-[LEVEL]-[SEQ]"  # Example: SP-BLD-01-L00-001
projectPhase: "design_development"  # concept | schematic | design_development | construction_documentation
bimLOD: "LOD_300"  # LOD_100 | LOD_200 | LOD_300 | LOD_400 | LOD_500

# Basic Properties
spaceName: "Name of the space"
spaceType: "space_type"  # See Space Types section below
buildingId: "BLD-01"
levelId: "LVL-00"

# Zone Assignments
zoneIds:
  - "ZONE-FIRE-[ID]"
  - "ZONE-HVAC-[ID]"

# Spatial Data
designArea: 0.0
designHeight: 0.0
unit: "m"

# Requirements
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Occupancy Profile
occupancy:
  maxOccupants: 0
  usagePattern: "usage"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "GENERATE_ON_IMPORT"

# Metadata
version: "1.0.0"
lastReviewed: "YYYY-MM-DD"
authors:
  - name: "Architect Name"
    role: "architect"
---

# Space: [Space Name]

[Description and content here...]
```

---

## Space Types

### Residential
- `sleeping_space` / `bedroom`
- `living_space` / `living_room`
- `kitchen`
- `bathroom`

### Office
- `office`
- `meeting_room`
- `open_office`

### Circulation
- `corridor`
- `staircase`
- `entrance`

---

## Example: Bedroom

See [Green Terrace Example](../examples/green-terrace/spaces/bedroom-01.md) for a complete working example.
