# Zone Document Template

Use this template to document fire, acoustic, HVAC, and other building zones.

## Template File

**Filename pattern:** `zones/[zone-type]-[zone-name].md`
**Example:** `zones/fire-zone-zl-iv.md`, `zones/hvac-zone-north.md`

---

## YAML Frontmatter Template

```yaml
---
documentType: "zone"
entityType: "zone"
id: "ZONE-[TYPE]-[ID]"  # Example: ZONE-FIRE-ZL-IV
projectPhase: "design_development"

# Zone Properties
zoneName: "Zone Name"
zoneType: "zone_type"  # fire | acoustic | hvac | security | lighting | thermal
buildingId: "BLD-01"
levelIds:  # Zones can span multiple levels
  - "LVL-00"
  - "LVL-01"

# Spaces in This Zone
spaceIds:
  - "SP-[SPACE-ID-1]"
  - "SP-[SPACE-ID-2]"

# Zone-Specific Properties
properties:
  # Add zone-specific properties here
  # For fire zones: fireClassification, requiredRating, maxEvacuationDistance
  # For HVAC zones: temperatureSetpoint, ventilationRate
  # For acoustic zones: soundTransmissionClass, impactInsulationClass

# Requirements
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Regulatory Compliance
regulatoryCompliance:
  - regulation: "Regulation Name"
    section: "Section"
    requirement: "Requirement Description"
    status: "compliant"  # compliant | non_compliant | pending
    countryScope: "poland_specific"  # global | poland_specific

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "GENERATE_ON_IMPORT"

# Metadata
version: "1.0.0"
---

# Zone: [Zone Name]

[Description and content here...]
```

---

## Zone Types

- `fire` - Fire safety zones
- `acoustic` - Acoustic separation zones
- `hvac` - HVAC/climate control zones
- `security` - Security/access control zones
- `lighting` - Lighting control zones
- `thermal` - Thermal zones

---

## Example: Fire Zone

See [Green Terrace Example](../examples/green-terrace/zones/fire-zone-zl-iv.md) for a complete working example.
