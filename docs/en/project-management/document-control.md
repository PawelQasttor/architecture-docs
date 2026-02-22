---
title: Document Control
description: Folder structures, file naming conventions, revision tracking, approval gates, and status codes for architecture project documentation.
---

# Document Control

Document control ensures that every team member is working with the correct version of the correct file. In architecture projects, where a single outdated drawing can lead to construction errors, this is not administrative overhead -- it is risk management.

## Folder Structure

Organise your project folder to mirror the structure of the documentation standard. The recommended layout below works for both local file systems and the [Common Data Environment](/en/bim-integration/cde).

```
project-root/
  01-initiation/
  02-concept/
  03-schematic/
  04-design-development/
  05-construction-docs/
  06-construction/
  07-as-built/
  08-handover/
  templates/
  registers/
    decision-log.md
    risk-register.md
    change-log.md
    stakeholder-register.md
  bim/
```

Within each phase folder, group files by document type:

```
03-schematic/
  spaces/
  zones/
  requirements/
  systems/
  assets/
  buildings/
  levels/
```

::: tip
This structure aligns with the 7 document types in the standard (Space, Zone, Requirement, System, Asset, Building, Level) and the [8 project phases](/en/phases/initiation). Teams using a CDE should map these folders to the CDE container structure defined in the [BIM Execution Plan](/en/bim-integration/bep).
:::

## File Naming Convention

Every Markdown documentation file follows this pattern:

```
{TYPE}-{BUILDING}-{ZONE}-{LEVEL}-{SEQ}_{description}_{version}.md
```

### Field Definitions

| Field | Description | Examples |
|---|---|---|
| TYPE | Two-letter document type code | SP (Space), ZN (Zone), RQ (Requirement), SY (System), AS (Asset), BL (Building), LV (Level) |
| BUILDING | Building identifier | BLD-01, BLD-02 |
| ZONE | Zone identifier | L01 (Level 01 zone), EXT (External), COM (Common) |
| LEVEL | Level identifier | L00, L01, LR (Roof) |
| SEQ | Three-digit sequence number | 001, 002, 015 |
| description | Short human-readable name, lowercase, hyphens | bedroom-01, hvac-ahu-3, main-entrance |
| version | Version number | v1.0, v1.1, v2.0 |

### Examples

| File name | What it describes |
|---|---|
| `SP-BLD-01-L01-001_bedroom-01_v1.0.md` | Space card for Bedroom 01, Level 01, Building 01, version 1.0 |
| `SY-BLD-01-COM-000_hvac-system_v2.1.md` | System card for the HVAC system, common zone, version 2.1 |
| `RQ-BLD-01-L00-003_fire-egress_v1.0.md` | Requirement card for fire egress on Ground Level |
| `ZN-BLD-01-EXT-000_entrance-zone_v1.2.md` | Zone card for the main entrance zone, external |
| `AS-BLD-02-L03-012_lift-motor_v1.0.md` | Asset card for a lift motor on Level 03, Building 02 |

::: warning
Never use spaces, special characters, or uppercase letters in the description field. Use hyphens to separate words. This ensures compatibility across operating systems and the [CDE](/en/bim-integration/cde).
:::

## Revision Tracking

### Version Numbering Scheme

This standard uses a two-part version number: **Major.Minor**.

| Change type | Version change | Example | When to use |
|---|---|---|---|
| Minor update | Increment minor | v1.0 to v1.1 | Corrections, clarifications, minor additions that do not change design intent |
| Major revision | Increment major, reset minor | v1.3 to v2.0 | Design changes, scope changes, phase transitions, changes from [Change Requests](./change-management) |

### Version History in YAML Frontmatter

Every document file includes a version history in its YAML frontmatter:

```yaml
---
id: SP-BLD-01-L01-001
title: Bedroom 01
type: space
phase: schematic
status: approved
version: 1.2
version_history:
  - version: 1.0
    date: 2025-01-10
    author: A. Chen
    note: Initial draft
  - version: 1.1
    date: 2025-02-14
    author: A. Chen
    note: Updated area after structural review
  - version: 1.2
    date: 2025-03-20
    author: M. Okafor
    note: Added acoustic requirement per RQ-BLD-01-L01-007
---
```

## Status Codes

Every document carries a status in its YAML frontmatter. The four permitted statuses are:

| Status | Code | Meaning | Who can set it |
|---|---|---|---|
| Draft | `draft` | Work in progress; not ready for review | Author |
| For Review | `for_review` | Issued for comment or checking | Author |
| Approved | `approved` | Reviewed and accepted at a [phase gate](/en/quality/phase-gates) | Reviewer (per RACI) |
| Superseded | `superseded` | Replaced by a newer version; retained for audit trail | System / Author |

### Status Lifecycle

```
Draft --> For Review --> Approved --> Superseded (when new version is approved)
                   \--> Draft (if review returns comments requiring rework)
```

::: info
A document can cycle between Draft and For Review multiple times. It only reaches Approved when it passes the [review procedure](/en/quality/review-procedures) and the reviewer with authority (the **A** in the [RACI matrix](./governance)) signs off.
:::

## Approval Gates by Phase

Different phases require different levels of sign-off. The table below shows the minimum approval required to close each [phase gate](/en/quality/phase-gates).

| Phase | Documents requiring approval | Primary approver | Secondary approver |
|---|---|---|---|
| [Initiation](/en/phases/initiation) | Project brief, stakeholder register | Client | Project Manager |
| [Concept](/en/phases/concept) | Building cards, initial zone cards | Client | Lead Architect |
| [Schematic](/en/phases/schematic) | All space cards, requirement cards | Lead Architect | Client |
| [Design Development](/en/phases/design-development) | System cards, updated requirement cards | Lead Architect | Structural / MEP leads |
| [Construction Docs](/en/phases/construction-docs) | All document types, compliance checks | Lead Architect | All consultants |
| [Construction](/en/phases/construction) | Site instructions, variation orders | Project Manager | Contractor |
| [As-Built](/en/phases/as-built) | Updated cards reflecting built conditions | Lead Architect | Contractor |
| [Handover](/en/phases/handover) | Complete documentation set, O&M manuals | Client | Facility Manager |

## Document Control Checklist

Use this checklist when setting up document control for a new project:

- [ ] Folder structure created per the recommended layout above
- [ ] File naming convention communicated to all team members
- [ ] Version numbering rules agreed
- [ ] Status codes explained and YAML frontmatter templates distributed
- [ ] Approval authorities defined in the [RACI matrix](./governance)
- [ ] [CDE](/en/bim-integration/cde) configured to mirror the folder structure (if applicable)
- [ ] [Templates](/en/templates/) distributed to all contributors
- [ ] Backup and archiving procedure established

## Related Pages

- [Project Management Overview](./)
- [Governance](./governance) -- RACI matrix that defines approval authorities
- [Change Management](./change-management) -- How changes trigger version updates
- [Common Data Environment](/en/bim-integration/cde) -- CDE setup for BIM-enabled projects
- [Templates](/en/templates/) -- Starter templates for all 7 document types
