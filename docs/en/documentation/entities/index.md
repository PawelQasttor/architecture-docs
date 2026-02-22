# Document Types

SBM defines structured document types that represent different aspects of a building. Each document type has a specific purpose and set of required fields.

## Core Document Types

### Spatial Document Types

- **[Space](/en/documentation/entities/space)** - Rooms and functional areas (instances)
- **[Space Type](/en/documentation/entities/space-type)** - Space templates for repeating room types
- **[Zone](/en/documentation/entities/zone)** - Functional zones (fire, acoustic, HVAC, security)
- **[Zone Type](/en/documentation/entities/zone-type)** - Zone templates for standard zone configurations
- **[Level](/en/documentation/entities/level)** - Building floors/storeys
- **[Building](/en/documentation/entities/building)** - Building-level metadata

### Technical Document Types

- **[System](/en/documentation/entities/system)** - MEP systems (HVAC, electrical, plumbing, fire safety)
- **[System Type](/en/documentation/entities/system-type)** - System templates for standard configurations
- **[Asset Instance](/en/documentation/entities/asset-instance)** - Physical equipment with maintenance data
- **[Asset Type](/en/documentation/entities/asset-type)** - Product specifications and templates

### Governance Document Types

- **[Requirement](/en/documentation/entities/requirement)** - Performance and regulatory rules

## Document Type Hierarchy

```
Project
  └─ Building
      ├─ Level
      │   └─ Space (instance) → references Space Type (template)
      │       ├─ Child Space (parentSpaceId → parent)
      │       └─ Asset Instance → references Asset Type (product spec)
      ├─ Zone (instance) → references Zone Type (template)
      └─ System (instance) → references System Type (template)
          └─ Asset Instance → references Asset Type
```

### Type/Instance Pattern

SBM v0.1.1 introduces a **type/instance pattern** to eliminate repetition:

- **Types** (templates): Define specifications once (e.g., "Standard Bedroom Type A")
- **Instances** (occurrences): Reference the type and add location/context data

**Benefits:**
- ✅ Define requirements, finishes, equipment once
- ✅ Guaranteed consistency across similar spaces
- ✅ Update one type file → affects all instances
- ✅ 26-33% reduction in documentation for repeating elements

## Common Fields

All document types share these common fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (hierarchical format) |
| `entityType` | string | ✅ | Document type name |
| `documentType` | string | ✅ | Document type (usually same as entityType) |
| `version` | string | ✅ | Semantic version (e.g., "1.0.0") |
| `tags` | array | ❌ | Free-form tags for classification |
| `ifcMapping` | object | ❌ | IFC mapping |

## ID Naming Conventions

SBM uses hierarchical, human-readable IDs:

| Document Type | Format | Example |
|--------|--------|---------|
| Building | `BLD-{sequence}` | `BLD-01` |
| Level | `LVL-{sequence}` | `LVL-01` |
| **Space Type** | `ST-{descriptor}` | `ST-BEDROOM-STANDARD-A` |
| Space | `SP-{building}-{level}-{sequence}` | `SP-BLD-01-L01-001` |
| **Zone Type** | `ZT-{descriptor}` | `ZT-FIRE-ZL-IV` |
| Zone | `ZONE-{type}-{descriptor}` | `ZONE-FIRE-ZL-IV` |
| **System Type** | `SYT-{descriptor}` | `SYT-HVAC-RESIDENTIAL` |
| System | `SYS-{category}-{sequence}` | `SYS-HVAC-01` |
| **Asset Type** | `AT-{descriptor}` | `AT-BOSCH-HP-300` |
| Asset Instance | `AI-{type}-{sequence}` | `AI-AHU-01` |
| Requirement | `REQ-{scope}-{descriptor}-{sequence}` | `REQ-DAYLIGHT-SLEEPING-001` |

## Relationships

Documents reference each other via IDs:

```yaml
# Space references Zone, Level, Building, Requirements
space:
  id: "SP-BLD-01-L01-001"
  buildingId: "BLD-01"
  levelId: "LVL-01"
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
  requirements: ["REQ-DAYLIGHT-SLEEPING-001"]

# Zone references Building (reverse relationship computed automatically)
zone:
  id: "ZONE-FIRE-ZL-IV"
  buildingId: "BLD-01"
  spaceIds: []  # Auto-computed by compiler
```

The compiler automatically computes **reverse relationships**:
- `space.zoneIds` → `zone.spaceIds`
- `space.parentSpaceId` → `space.childSpaceIds`
- `asset.systemId` → `system.assetInstanceIds`

## Next Steps

- **[Space](/en/documentation/entities/space)** - Learn about room/area document types
- **[Requirement](/en/documentation/entities/requirement)** - Learn about rules and constraints
- **[Authoring Guide](/en/documentation/authoring/)** - Create your first document
