# Requirement Document Template

Use this template to document performance requirements, regulatory constraints, and design rules.

## Template File

**Filename pattern:** `requirements/[scope]/req-[name].md`
**Example:** `requirements/global/req-daylight-sleeping-001.md`
**Example:** `requirements/pl/req-pl-wt-room-height-001.md`

**Scopes:**
- `global/` - Universal requirements applicable to all countries
- `pl/` - Poland-specific requirements (WT 2021, Prawo budowlane)
- `de/` - Germany-specific requirements (future)
- `fr/` - France-specific requirements (future)

---

## YAML Frontmatter Template

```yaml
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-[SCOPE]-[NAME]-[SEQ]"  # Example: REQ-DAYLIGHT-SLEEPING-001

# Requirement Identification
requirementName: "Descriptive name of requirement"
requirementType: "type"  # performance | dimensional | operational | regulatory | safety | functional
countryScope: "global"  # global | poland_specific | eu_specific

# Applicability
scope:
  entityType: "entity"  # space | zone | system | asset | element
  spaceTypes:  # If applicable to specific space types
    - "space_type_1"
    - "space_type_2"
  # OR
  spaceIds:  # If applicable to specific spaces
    - "SP-[SPACE-ID]"

# Performance Criteria
metric: "metric_name"  # daylight_factor_percent | room_height_clear | temperature | etc.
operator: ">="  # >= | <= | == | > | < | != | in_range
value: 0.0  # Numeric value, string, or object with min/max
unit: "unit"  # %, m, C, dB, W/m2K, etc.
tolerance: 0.0  # Optional tolerance

# Verification
verification:
  method: "method"  # simulation | calculation | measurement | inspection | testing | certification | sensor
  tool: "Tool name (optional)"
  standard: "Standard reference"  # EN_17037, WT_2021, etc.
  phase:
    - "concept"
    - "design_development"
  frequency: "frequency"  # once_per_design_revision | annually | etc.
  responsible: "role"  # architect | engineer | consultant | contractor

# Legal/Technical Basis
legalBasis:  # Optional
  - regulation: "Regulation Name"
    section: "Section"
    article: "Article"
    description: "Description"

technicalBasis:  # Optional
  - standard: "Standard Name"
    section: "Section"
    description: "Description"

# Metadata
version: "1.0.0"
---

# Requirement: [Requirement Name]

## Intent

Explanation of why this requirement exists and what it aims to achieve.

## Performance Target

- Clear statement of performance criteria
- Measured at [location/conditions]
- Under [specific conditions]

## Verification Method

1. Step-by-step verification procedure
2. Tools or methods required
3. Acceptance criteria

## Remediation Strategies

If requirement is not met:
- Strategy 1
- Strategy 2
- Strategy 3

## References

- Link to relevant standards
- Link to design guides
- Link to calculation methods
