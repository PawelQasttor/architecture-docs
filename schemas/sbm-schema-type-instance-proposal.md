# SBM Schema Enhancement: Type/Instance Pattern

## Problem Statement

Currently, similar spaces (e.g., 20 identical hotel rooms or office spaces) require full documentation repetition for each instance. This violates DRY principles and makes maintenance difficult.

**Example:**
- 20 identical bedrooms = 20 full documents with repeated requirements, finishes, equipment specs
- Change to acoustic requirement = 20 files to update

## Proposed Solution

Introduce a **two-tier hierarchy** for all entity types:

```
Entity Type (Class/Template)
    ↓ instantiates
Entity Instance (Actual occurrence)
```

---

## Schema Changes

### 1. New Entity: Space Types

```json
{
  "entities": {
    "space_types": {
      "type": "array",
      "items": { "$ref": "#/definitions/space_type" }
    },
    "spaces": {
      "type": "array",
      "items": { "$ref": "#/definitions/space" }
    }
  }
}
```

### 2. Space Type Definition

```json
{
  "space_type": {
    "type": "object",
    "required": ["id", "entityType", "typeName", "spaceType"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^ST-[A-Z0-9-]+$",
        "description": "Space Type ID"
      },
      "entityType": { "type": "string", "const": "space_type" },
      "typeName": {
        "type": "string",
        "description": "Human-readable type name",
        "example": "Standard Bedroom - Type A"
      },
      "spaceType": {
        "type": "string",
        "enum": ["sleeping_space", "bedroom", "living_space", ...],
        "description": "Base functional space category"
      },

      // TEMPLATE DATA (applies to all instances)
      "requirements": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Requirements that apply to ALL instances of this type"
      },
      "finishes": {
        "type": "object",
        "properties": {
          "floor": { "type": "string" },
          "walls": { "type": "string" },
          "ceiling": { "type": "string" },
          "door": { "type": "string" },
          "window": { "type": "string" }
        },
        "description": "Standard finishes for this type"
      },
      "equipment": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "category": { "type": "string" },
            "description": { "type": "string" },
            "quantity": { "type": "integer" }
          }
        },
        "description": "Standard equipment list"
      },
      "occupancyProfile": {
        "type": "object",
        "properties": {
          "maxOccupants": { "type": "integer" },
          "usagePattern": { "type": "string" },
          "hoursPerDay": { "type": "number" },
          "daysPerWeek": { "type": "integer" }
        },
        "description": "Typical occupancy for this space type"
      },
      "typicalArea": {
        "type": "object",
        "properties": {
          "min": { "type": "number" },
          "max": { "type": "number" },
          "typical": { "type": "number" },
          "unit": { "type": "string", "default": "m2" }
        },
        "description": "Area range for this type"
      },
      "typicalHeight": {
        "type": "object",
        "properties": {
          "min": { "type": "number" },
          "typical": { "type": "number" },
          "unit": { "type": "string", "default": "m" }
        }
      }
    }
  }
}
```

### 3. Simplified Space Instance

```json
{
  "space": {
    "type": "object",
    "required": ["id", "entityType", "spaceName", "spaceTypeId", "buildingId", "levelId"],
    "properties": {
      "id": { "type": "string", "pattern": "^SP-[A-Z0-9-]+$" },
      "entityType": { "type": "string", "const": "space" },
      "spaceName": { "type": "string" },

      // REFERENCE TO TYPE
      "spaceTypeId": {
        "type": "string",
        "description": "Reference to space_type that defines template properties"
      },

      // INSTANCE-SPECIFIC DATA ONLY
      "buildingId": { "type": "string" },
      "levelId": { "type": "string" },
      "zoneIds": { "type": "array", "items": { "type": "string" } },

      "actualArea": { "type": "number", "description": "As-designed area for THIS instance" },
      "actualHeight": { "type": "number", "description": "As-designed height for THIS instance" },
      "actualVolume": { "type": "number" },
      "unit": { "type": "string" },

      "adjacentSpaces": {
        "type": "array",
        "description": "Instance-specific adjacencies"
      },

      // OVERRIDES (optional)
      "requirementOverrides": {
        "type": "array",
        "description": "Additional requirements beyond the type"
      },
      "finishOverrides": {
        "type": "object",
        "description": "Overrides to standard finishes (e.g., different floor in one room)"
      },

      "ifcMapping": { "$ref": "#/definitions/ifcMapping" },
      "version": { "type": "string" }
    }
  }
}
```

---

## Example Usage

### Define Space Type Once

**File:** `templates/space-types/standard-bedroom-type-a.md`

```yaml
---
documentType: "space_type"
entityType: "space_type"
id: "ST-BEDROOM-STANDARD-A"

typeName: "Standard Bedroom - Type A"
spaceType: "sleeping_space"
description: "Standard residential bedroom for 1-2 occupants"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# FINISHES (standard for type)
finishes:
  floor: "MAT-FLOOR-OAK-01"
  walls: "MAT-WALL-PAINT-WHITE"
  ceiling: "MAT-CEILING-PAINT-WHITE"
  door: "DOOR-INT-AC-01"
  window: "WINDOW-TYPE-A"

# EQUIPMENT (standard for type)
equipment:
  - category: "safety"
    description: "Optical smoke detector (ceiling-mounted)"
    quantity: 1
  - category: "climate"
    description: "Underfloor heating thermostat"
    quantity: 1
  - category: "ventilation"
    description: "MVHR supply diffuser"
    quantity: 1
  - category: "electrical"
    description: "Double socket outlet (bedside)"
    quantity: 2

# OCCUPANCY PROFILE (standard for type)
occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# AREA GUIDANCE
typicalArea:
  min: 10.0
  max: 18.0
  typical: 14.0
  unit: "m2"

typicalHeight:
  min: 2.50
  typical: 2.70
  unit: "m"

version: "1.0.0"
---

# Space Type: Standard Bedroom Type A

## Description
Standard residential bedroom suitable for 1-2 occupants. North or south-facing with natural daylight and ventilation.

## Design Intent
- Acoustic privacy from adjacent spaces
- Natural daylight (min 2% DF)
- Thermal comfort via underfloor heating + MVHR
- Fire safety per ZL-IV requirements

## Finishes Specification
[Full details once, applies to ALL instances...]

## Equipment Specification
[Full details once, applies to ALL instances...]
```

### Instantiate Multiple Times

**File:** `spaces/bedroom-01.md`

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"

spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Reference to type

# INSTANCE-SPECIFIC DATA ONLY
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

actualArea: 14.5
actualHeight: 2.70
actualVolume: 39.15
unit: "m"

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

version: "1.0.0"
---

# Space: Bedroom 01

Inherits all specifications from [Standard Bedroom Type A](../space-types/standard-bedroom-type-a).

## Instance Details
- **Area:** 14.5 m² (within type range: 10-18 m²)
- **Location:** Building 01, Level 01, North wing
- **Adjacent to:** Bedroom 02 (east), Corridor (west)
```

**File:** `spaces/bedroom-02.md`

```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"

spaceName: "Bedroom 02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # ← Same type!

buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

actualArea: 12.8  # ← Different area
actualHeight: 2.70
actualVolume: 34.6
unit: "m"

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxR"

version: "1.0.0"
---

# Space: Bedroom 02

Inherits all specifications from [Standard Bedroom Type A](../space-types/standard-bedroom-type-a).

## Instance Details
- **Area:** 12.8 m² (within type range: 10-18 m²)
- **Location:** Building 01, Level 01, North wing
```

---

## Benefits

### 1. DRY Principle
✅ Requirements defined once
✅ Finishes specified once
✅ Equipment list maintained once

### 2. Easy Maintenance
**Change acoustic requirement for all bedrooms:**
- Old way: Edit 20 files
- New way: Edit 1 type definition

### 3. Consistency
✅ All instances guaranteed to have same base specs
✅ Changes propagate automatically

### 4. Flexibility
✅ Can override specific properties per instance
✅ Can add instance-specific requirements

### 5. Better Reporting
```sql
-- How many bedrooms of each type?
SELECT spaceTypeId, COUNT(*)
FROM spaces
GROUP BY spaceTypeId;

-- Total area by space type
SELECT st.typeName, SUM(s.actualArea)
FROM spaces s
JOIN space_types st ON s.spaceTypeId = st.id
GROUP BY st.typeName;
```

---

## Migration Strategy

### Phase 1: Add Type Definitions
1. Identify repeating patterns in current spaces
2. Create space_type definitions for common patterns
3. No breaking changes - types are additive

### Phase 2: Reference Types
1. Add `spaceTypeId` to existing space instances
2. Remove redundant data from instances (optional)
3. Maintain backward compatibility

### Phase 3: Compiler Support
1. Compiler resolves spaceTypeId references
2. Generates complete space object (type + instance data merged)
3. Outputs to SBM JSON with all properties flattened

---

## Applies to Other Entities Too

Same pattern for:
- **System Types** (e.g., "Standard HVAC System for Residential")
- **Asset Types** (e.g., "Bosch ABC-123 Heat Pump" type → 3 instances)
- **Zone Types** (e.g., "Fire Zone ZL-IV Standard")
- **Requirement Types** (groups of related requirements)

---

## Compiler Behavior

```javascript
// Input: Space instance references type
{
  "id": "SP-001",
  "spaceTypeId": "ST-BEDROOM-A",
  "actualArea": 14.5
}

// Compiler resolves reference
const spaceType = loadType("ST-BEDROOM-A");

// Output: Merged object in SBM JSON
{
  "id": "SP-001",
  "spaceType": "sleeping_space",
  "actualArea": 14.5,
  "requirements": [...],  // ← From type
  "finishes": {...},      // ← From type
  "equipment": [...],     // ← From type
  "occupancy": {...}      // ← From type
}
```

---

## Validation Rules

1. **Required:** spaceTypeId must reference valid space_type
2. **Area Check:** actualArea should be within type's min/max range (warning if outside)
3. **No Conflicts:** Instance overrides must not conflict with type-level constraints
4. **Version Compatibility:** Instance and type versions should be compatible

---

## Next Steps

1. **Review & Feedback** on this proposal
2. **Update JSON Schema** with type definitions
3. **Create Example Space Types** for common patterns
4. **Update Compiler** to resolve type references
5. **Migration Guide** for existing projects
6. **Documentation** on when to use types vs instances

---

**Status:** Proposal
**Author:** Architecture Standard Team
**Date:** 2026-02-22
**Version:** 0.1
