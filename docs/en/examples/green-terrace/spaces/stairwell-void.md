---
entityType: "space"
id: "SP-BLD-01-VOID-STAIR"

spaceName: "Stairwell Void"
spaceType: "staircase"
levelId: "LVL-01"
levelIds:
  - "LVL-01"
  - "LVL-00"
buildingId: "BLD-01"

zoneIds:
  - "ZONE-FIRE-ZL-IV"

designArea: 8.4
designHeight: 6.0
designVolume: 50.4
unit: "m2"

# A stairwell void is open volume within the stair core — it has no
# independent construction cost; its fabric cost is carried by the
# vertical circulation (VC-STAIR-A) and the structure package.
cost:
  totalCost: 0
  currency: "EUR"
  basis: "override"
  override: "Void has no independent construction cost — fabric cost carried by VC-STAIR-A / CP-STRUCTURE"
  _meta:
    confidence: "specified"
    source: "Cost carried by VC-STAIR-A / CP-STRUCTURE"

constructionPackageId: "CP-STRUCTURE"

version: "2.1.0"
tags:
  - "multi-level"
  - "void"
  - "stairwell"
  - "fire-safety"
---

# Stairwell Void

**Multi-level space** spanning Level 00 (Ground) and Level 01 (First Floor).

This void forms the vertical circulation opening for the main staircase [VC-STAIR-A](../staircase-a.md), allowing visual connectivity between floors while maintaining fire compartmentation.

## Multi-Level Configuration

| Property | Value |
|----------|-------|
| **Primary Level** | LVL-01 (for inheritance and cost rollup) |
| **All Levels** | LVL-00, LVL-01 |
| **isMultiLevel** | `true` (auto-computed) |
| **Total Height** | 6.0 m (2 stories) |
| **Floor Area** | 8.4 m² (per level) |

## Fire Safety

- **Fire zone:** ZONE-FIRE-ZL-IV
- **Smoke extraction:** Natural ventilation via roof vent
- **Fire rating:** REI 120 (stairwell enclosure walls)
- **Smoke barriers:** At each level landing

## Related Entities

- **Vertical Circulation:** [VC-STAIR-A](../staircase-a.md)
- **Level 00:** Ground floor
- **Level 01:** [Level 01](../levels/level-01.md)
- **Construction Package:** CP-STRUCTURE

---

**Last Updated:** 2026-02-28
