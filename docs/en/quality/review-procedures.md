---
title: Review Procedures
description: Step-by-step review workflows for design, coordination, documentation, BIM, and client reviews in architecture projects.
---

# Review Procedures

Reviews are where quality is built. This page defines five review types used across the project lifecycle. Each type has a different focus, different participants, and a different output. Together, they ensure that design intent, technical coordination, documentation quality, and client expectations are all addressed before work proceeds.

For the overall QA framework, see [Quality Assurance](/en/quality/). For phase-specific requirements, see [Phase Gate Checklists](/en/quality/phase-gates).

## Overview of Review Types

| Review Type | Purpose | Typical Participants | Frequency |
|---|---|---|---|
| Internal Design Review | Verify design quality and intent | Project architect, design lead, senior reviewer | At each phase milestone |
| Coordination Review | Identify conflicts between disciplines | Architect, structural engineer, MEP engineers | Biweekly during DD and CD phases |
| Documentation Review | Check document completeness and consistency | Document author, QA lead | Before each phase gate |
| BIM Coordination Review | Detect and resolve model clashes | BIM coordinator, discipline modelers | Weekly during DD and CD phases |
| Client Review | Present work and capture feedback | Project architect, client representative | At each phase gate, plus interim sessions |

---

## 1. Internal Design Review

**Purpose:** Evaluate the design for quality, functionality, and alignment with the project brief. This is the team's opportunity to challenge assumptions and improve the design before external review.

**When to conduct:** At least once during each design phase (Concept, Schematic, Design Development). More frequent reviews are appropriate for complex projects.

**Participants:**
- Project architect (presents)
- Senior architect or design principal (reviews)
- At least one team member not directly involved in the design (fresh perspective)

**What to check:**

- [ ] Design responds to the client brief and Requirement documents
- [ ] Spatial relationships and adjacencies are logical and functional
- [ ] Circulation is clear and meets accessibility requirements
- [ ] Natural light, views, and orientation are considered
- [ ] Material selections are appropriate for use, budget, and context
- [ ] Design is consistent across plans, sections, and elevations
- [ ] Building and Level documents reflect the current design accurately

::: tip
The most valuable feedback in a design review comes from asking "why" questions, not "what" questions. Focus on design intent and whether the proposed solution truly solves the problem.
:::

**Output:** A written review summary listing findings, recommendations, and any required changes. Each finding should be assigned to a team member with a target resolution date.

---

## 2. Coordination Review

**Purpose:** Identify and resolve conflicts between architectural, structural, and MEP designs before they become construction problems. This review is about physical coordination --- making sure things fit.

**When to conduct:** Biweekly during Design Development and Construction Documents phases. More frequently during periods of intensive design change.

**Participants:**
- Project architect
- Structural engineer
- Mechanical engineer
- Electrical engineer
- Plumbing / fire protection engineer
- BIM coordinator (if using BIM)

**What to check:**

- [ ] Structural grid and column locations align with architectural plans
- [ ] Floor-to-floor heights accommodate structural depth, MEP routing, and ceiling heights
- [ ] Mechanical duct and pipe routes do not conflict with structure or architectural features
- [ ] Electrical panel locations and conduit paths are coordinated
- [ ] Plumbing risers and horizontal runs have adequate space and access
- [ ] Fire protection system layout clears structural and architectural elements
- [ ] Penetrations through rated assemblies are identified and detailed
- [ ] System documents across disciplines reference consistent Space and Zone identifiers

::: warning
Coordination reviews only work when all disciplines bring current information. If a discipline's design is out of date, the review will produce false results. Confirm all teams are working from the latest documents before each session.
:::

**Output:** A coordination issues log with each conflict described, its location (referencing Space or Level identifiers), its severity (critical, major, minor), and its assigned owner and resolution deadline.

| Severity | Definition | Resolution Deadline |
|---|---|---|
| Critical | Physical clash or code violation --- blocks construction | Within 5 business days |
| Major | Significant conflict affecting design intent or cost | Within 10 business days |
| Minor | Cosmetic or preference-level issue | Before next phase gate |

---

## 3. Documentation Review

**Purpose:** Verify that all project documents are complete, consistent, correctly formatted, and properly cross-referenced. This review focuses on the documentation itself, not on the design.

**When to conduct:** Before every phase gate. A lighter version should be part of each author's self-check routine.

**Participants:**
- Document author (prepares documents for review)
- QA lead or designated reviewer

**What to check:**

- [ ] YAML frontmatter is complete --- all required fields populated (title, phase, status, author, date)
- [ ] Document type is correct (Space, Zone, Requirement, System, Asset, Building, or Level)
- [ ] Cross-references to other documents use valid identifiers and resolve correctly
- [ ] Phase status matches the current project phase
- [ ] Compliance references link to the correct [regulations](/en/regulations/)
- [ ] Version history is recorded per [document control](/en/project-management/document-control) procedures
- [ ] File naming follows the project naming convention
- [ ] No orphaned documents (documents that nothing references and that reference nothing)
- [ ] No broken references (links to documents that do not exist)
- [ ] Numeric data is consistent (areas in Space documents sum to Building totals, levels are sequential)

**Common documentation errors:**

| Error | Example | How to Catch |
|---|---|---|
| Missing frontmatter field | Space document without `zone` reference | Automated validation or manual checklist |
| Inconsistent identifiers | Space called "S-101" in one file and "SP-101" in another | Search across all documents for the identifier |
| Stale phase status | Document still shows "Concept" during Design Development | Filter documents by status and compare to current phase |
| Broken cross-reference | Requirement links to a System document that was deleted | Validate all references resolve to existing files |
| Area mismatch | Space areas total 4,200 m2 but Building document says 4,500 m2 | Sum Space areas and compare to Building document |

**Output:** A documentation issues list. Each item includes the file path, the issue description, and the required correction. The author resolves all items before the phase gate review.

---

## 4. BIM Coordination Review

**Purpose:** Use the BIM model to detect physical clashes, verify model quality, and confirm that model data aligns with the written documentation.

**When to conduct:** Weekly during Design Development and Construction Documents. Run clash detection before each coordination review meeting.

**Participants:**
- BIM coordinator (leads)
- Discipline modelers (architectural, structural, MEP)
- Project architect (reviews critical clashes)

**What to check:**

- [ ] Clash detection run between all discipline models --- results categorized and assigned
- [ ] Model elements carry correct identifiers matching Space, Zone, and System documents
- [ ] Level datums in the model match Level documents
- [ ] Element classification follows the agreed standard (Uniclass, OmniClass, or project-specific)
- [ ] Model file structure and naming follow the [BIM Execution Plan](/en/bim-integration/bep)
- [ ] LOD requirements for the current phase are met (see [Phase Gate Checklists](/en/quality/phase-gates))
- [ ] Model performance is acceptable (file size, load time) for the team's hardware

::: info
Clash detection tools report many false positives. The BIM coordinator should filter and categorize results before presenting them to the team. Focus review time on critical and major clashes.
:::

**Clash categories:**

| Category | Description | Action |
|---|---|---|
| Hard clash | Two elements occupy the same space | Must be resolved --- assign to responsible discipline |
| Soft clash | Elements are too close (insufficient clearance for access or maintenance) | Evaluate and resolve if access is required |
| Workflow clash | Construction sequence conflict (e.g., element cannot be installed in the planned order) | Flag for constructability review |

**Output:** A clash report linked to the coordination issues log. Each clash includes a screenshot or model view, the elements involved, their discipline owners, and the resolution status.

---

## 5. Client Review

**Purpose:** Present the current state of the design to the client, gather feedback, and obtain formal approval where required by the [phase gate](/en/quality/phase-gates).

**When to conduct:** At each phase gate, and at agreed interim milestones.

**Participants:**
- Project architect (presents)
- Client representative (reviews)
- Other stakeholders as appropriate (end users, facility managers, consultants)

**What to present:**
- Design progress relative to the project brief and Requirement documents
- Key decisions made since the last review, with rationale
- Items requiring client decision or direction
- Updated project schedule and budget status
- Any compliance issues or risks identified

**How to record feedback:**
- Assign one team member to take notes during the session
- Record each feedback item with its source, the related document or space, and whether it is a direction (must do), a preference (should consider), or a question (needs answer)
- Distribute the meeting record to all attendees within two business days
- Log action items with owners and deadlines in the project tracker
- Update Requirement documents if client feedback changes the brief

::: tip
Separate client feedback into "decisions" and "preferences" immediately. Decisions change the project scope or direction and must be documented formally. Preferences are input for the design team to evaluate and respond to.
:::

**Output:** A client review record documenting all feedback, decisions, and action items. This record becomes part of the project archive under [document control](/en/project-management/document-control).

---

## Review Checklist Template

Use this general-purpose checklist to prepare for any review session.

**Before the review:**
- [ ] Confirm the review type, scope, and objective
- [ ] Distribute materials to reviewers at least two business days in advance
- [ ] Confirm all participants and schedule the session
- [ ] Prepare a focused agenda --- list the specific items to be reviewed

**During the review:**
- [ ] State the review objective at the start of the session
- [ ] Walk through each item systematically --- do not skip ahead
- [ ] Record every finding with its location, severity, and owner
- [ ] Distinguish between required corrections and optional suggestions
- [ ] Confirm next steps and deadlines before closing

**After the review:**
- [ ] Distribute the review record to all participants
- [ ] Enter findings into the project issues log
- [ ] Track resolution of each finding to completion
- [ ] File the completed review record per [document control](/en/project-management/document-control) procedures
- [ ] Confirm all critical findings are resolved before the next [phase gate](/en/quality/phase-gates)

::: warning
A review without follow-through is wasted time. Every finding must be tracked to resolution. Assign an owner, set a deadline, and verify the fix.
:::
