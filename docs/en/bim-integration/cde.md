# Common Data Environment (CDE)

A Common Data Environment is a single source of truth for all project information. It is the agreed digital space where models, drawings, documents, and data are stored, managed, and shared throughout the project lifecycle.

## Why a CDE Matters

Without a CDE, project teams rely on email attachments, local drives, and informal file sharing. This leads to version conflicts, lost documents, and coordination failures. A CDE eliminates these risks by providing:

- **Single source of truth** -- everyone accesses the same current files
- **Controlled access** -- permissions ensure the right people see the right documents
- **Audit trail** -- every upload, review, and approval is logged
- **Status tracking** -- documents move through defined workflow states

::: tip
Establish the CDE during the [Initiation phase](/en/phases/initiation), before any design files are created. This should be defined in the [BIM Execution Plan](/en/bim-integration/bep).
:::

## Folder Structure

The CDE is organised into four primary containers, following ISO 19650 principles:

| Container | Purpose | Who can access | Typical contents |
|---|---|---|---|
| **Work In Progress (WIP)** | Active development area for each discipline | Discipline team members only | Draft models, sketches, internal calculations |
| **Shared (SHR)** | Cross-discipline coordination area | All project team members | Coordinated models, shared drawings, clash reports |
| **Published (PUB)** | Approved deliverables for client and authorities | Client, project manager, authorities | Approved drawings, reports, submissions |
| **Archived (ARC)** | Superseded versions retained for audit | BIM Manager, Information Manager | Previous revisions, closed-out documents |

### Detailed Folder Hierarchy

Within each container, organise files by discipline and type:

```
WIP/
  ARC/          (Architecture)
    Models/
    Drawings/
    Schedules/
  STR/          (Structure)
    Models/
    Calculations/
  MEP/          (Mechanical, Electrical, Plumbing)
    Models/
    Specifications/
  LAN/          (Landscape)
SHR/
  Coordination/
    Clash Reports/
    Combined Models/
  Meetings/
PUB/
  Client Deliverables/
  Authority Submissions/
  BEP/
ARC/
  Superseded/
  Closed Out/
```

::: warning
Never store files outside the defined folder structure. Orphaned files undermine the purpose of the CDE and create confusion about document status.
:::

## Access Permissions by Role

| Role | WIP (own discipline) | WIP (other disciplines) | Shared | Published | Archived |
|---|---|---|---|---|---|
| BIM Manager | Full access | Read | Full access | Full access | Full access |
| BIM Coordinator | Full access | Read | Upload + read | Read | Read |
| Model Author | Full access | No access | Read | Read | No access |
| Project Manager | Read | Read | Read | Full access | Read |
| Client | No access | No access | No access | Read | Read |
| Contractor | No access | No access | Read (selected) | Read | No access |

::: info
Access permissions should be reviewed at each phase gate. As the project moves from [Design Development](/en/phases/design-development) to [Construction Docs](/en/phases/construction-docs), contractors may need broader Shared access.
:::

## File Naming in the CDE

All files in the CDE must follow the naming convention defined in the [BEP](/en/bim-integration/bep). The standard pattern is:

```
[Project]-[Discipline]-[Zone]-[Level]-[Type]-[Status]-[Revision]
```

**Status codes used in the CDE:**

| Code | Status | Meaning |
|---|---|---|
| S0 | Work In Progress | Being developed, not for coordination |
| S1 | Coordination | Suitable for cross-discipline review |
| S2 | Information | For information only, not for design use |
| S3 | Review and Comment | Issued for formal review |
| S4 | Approved | Formally approved for the current stage |
| S5 | Construction | Approved for construction use |
| S6 | As-Built | Reflects the completed building |
| S7 | Archived | Superseded, retained for records |

## Review Workflows

Documents move through the CDE following a defined review process:

### Standard Review Workflow

```
Author uploads to WIP (S0)
    |
Author self-checks and moves to Shared (S1)
    |
BIM Coordinator reviews for discipline compliance
    |
    +-- Rejected: returns to WIP with comments
    |
    +-- Accepted: BIM Manager reviews for cross-discipline coordination
            |
            +-- Rejected: returns to Shared with comments
            |
            +-- Accepted: moves to Published (S4 or S5)
```

### Review Responsibilities

| Review stage | Reviewer | Checks for |
|---|---|---|
| Self-check | Model Author | Completeness, naming compliance, LOD met |
| Discipline check | BIM Coordinator | Internal consistency, standard compliance |
| Coordination check | BIM Manager | Cross-discipline clashes, data completeness |
| Client review | Project Manager / Client | Design intent, brief compliance |
| Authority submission | Information Manager | Regulatory compliance, submission format |

### Review Timeframes

| Document type | Review period | Escalation after |
|---|---|---|
| Model files | 5 working days | 7 working days |
| Drawings | 3 working days | 5 working days |
| Specifications | 5 working days | 7 working days |
| Clash reports | 2 working days | 3 working days |
| RFIs | 3 working days | 5 working days |

::: warning
Reviews that exceed the escalation timeframe must be flagged in the project tracker. Persistent delays should be raised at the next project meeting. See [Project Management](/en/project-management/) for escalation procedures.
:::

## Popular CDE Platforms

| Platform | Strengths | Considerations |
|---|---|---|
| Autodesk Construction Cloud (BIM 360) | Deep integration with Revit, robust clash detection | Licence costs, primarily Autodesk ecosystem |
| Trimble Connect | Good IFC support, works across software platforms | Smaller market share, fewer integrations |
| Dalux | Strong field management features, easy mobile access | Less suited for large complex models |
| Aconex (Oracle) | Extensive document control, strong in infrastructure | Complex setup, higher administration overhead |
| Nextcloud / SharePoint | Flexible, can be self-hosted, familiar interface | Requires manual workflow configuration |

::: info
The choice of CDE platform should be agreed in the [BEP](/en/bim-integration/bep) during the [Initiation phase](/en/phases/initiation). Consider the software ecosystem already in use and the technical capability of all project participants.
:::

## Connecting the CDE to Document Control

This standard treats the CDE as the backbone of project document control. Every document referenced in phase deliverables (see [phases overview](/en/phases/initiation)) must exist in the CDE with correct status codes.

Key integration points:

- **Phase gate reviews** -- only documents with Published status (S4+) count as deliverables
- **Clash detection** -- reports are stored in the Shared area and linked to model versions
- **[Bidirectional sync](/en/bim-integration/bidirectional-sync)** -- data exchanged between BIM models and this standard database follows CDE naming and versioning rules
- **[Asset data](/en/bim-integration/sensors-iot)** -- sensor and equipment data mapped during handover is archived in the CDE for facilities management use

## CDE Setup Checklist

- [ ] Platform selected and licences procured
- [ ] Folder structure created per the standard hierarchy
- [ ] Access permissions configured for all team members
- [ ] Naming convention documented and communicated
- [ ] Review workflow configured in the platform
- [ ] Status codes mapped to platform workflow states
- [ ] Training provided to all users
- [ ] BEP updated with CDE details
- [ ] Backup and disaster recovery plan confirmed

## Related Pages

- [BIM Execution Plan (BEP)](/en/bim-integration/bep)
- [LOD/LOI Matrix](/en/bim-integration/lod-loi)
- [IFC Entities](/en/bim-integration/ifc-entities)
- [Bidirectional Sync](/en/bim-integration/bidirectional-sync)
- [Project Management](/en/project-management/)
