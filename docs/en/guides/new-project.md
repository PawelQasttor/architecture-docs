# Starting a New Project

This guide walks you through setting up a new architecture project using the documentation standard. Follow these steps in order to ensure nothing is missed and your project begins on solid foundations.

::: info Prerequisites
Before starting, make sure you have access to the [templates library](/en/templates/) and have read the [quick-start guide](/en/standards/quick-start).
:::

## Step 1: Create the Folder Structure

Set up a standardized folder hierarchy for your project. Consistent naming ensures every team member can find documents quickly.

| Folder | Purpose |
|---|---|
| `01_ADMIN` | Contracts, correspondence, meeting notes |
| `02_BRIEF` | Client brief, functional program |
| `03_DESIGN` | Drawings, models, specifications |
| `04_CONSULTANTS` | Structural, MEP, specialist reports |
| `05_SURVEYS` | Site surveys, geotechnical, environmental |
| `06_REGULATORY` | Zoning decisions, permits, approvals |
| `07_QA` | Checklists, review records, audit logs |
| `08_BIM` | BIM models, clash reports, BEP |

See [Document Control](/en/project-management/document-control) for naming conventions and version control rules.

## Step 2: Set Up Governance

Define who is responsible, accountable, consulted, and informed for each project activity.

1. **Create a RACI matrix** covering all project phases and key deliverables.
2. **Draft a communication plan** specifying meeting cadence, reporting channels, and escalation paths.
3. **Assign project roles**: lead architect, project manager, BIM coordinator, QA lead.

Refer to the [Governance guide](/en/project-management/governance) for RACI templates and role definitions.

## Step 3: Create the Building Card

The Building card is the central metadata record for your project. Fill in:

1. Project name and unique identifier
2. Site address and geographic coordinates
3. Building typology and use class
4. Gross floor area (estimated)
5. Number of storeys (above and below ground)
6. Key dates: project start, target completion

::: tip
Start with what you know. The Building card evolves through each phase -- you do not need every field completed on day one.
:::

## Step 4: Write the Project Brief

Document the client's requirements, constraints, and aspirations. The brief should cover:

1. Project objectives and success criteria
2. Target users and occupancy profiles
3. Budget envelope and funding milestones
4. Site constraints and opportunities
5. Sustainability targets and certification goals

Link the brief to the Building card so they remain connected throughout the project lifecycle.

## Step 5: Verify Zoning (MPZP/WZ)

Before investing design effort, confirm the regulatory framework:

1. Check whether the site is covered by a Local Spatial Development Plan (MPZP).
2. If no MPZP exists, determine whether a Zoning Decision (WZ) is required.
3. Record applicable parameters: building height, building line, plot coverage ratio, floor area ratio.

::: warning
Zoning verification is a critical-path activity. Delays in obtaining WZ decisions can stall an entire project. Start early.
:::

See [Zoning Regulations (MPZP/WZ)](/en/regulations/zoning-mpzp-wz) for detailed guidance.

## Step 6: Define the Functional Program

Translate the brief into measurable spatial requirements:

1. List all required functions and activities.
2. Assign area targets to each function.
3. Define adjacency and separation requirements.
4. Create initial **Space cards** for primary spaces, recording name, target area, and functional requirements.

## Step 7: Set Up the BIM Execution Plan

Establish BIM workflows before modelling begins:

1. Define LOD requirements per phase.
2. Agree on software, file formats, and exchange protocols.
3. Set up the Common Data Environment (CDE).
4. Assign BIM roles and responsibilities.

Follow the [BIM Execution Plan (BEP)](/en/bim-integration/bep) template.

## Step 8: Establish QA Procedures

Quality assurance prevents costly rework:

1. Select applicable checklists from the [Quality section](/en/quality/).
2. Define review and approval workflows for each deliverable type.
3. Schedule phase gate reviews aligned with project milestones.

See [Phase Gates](/en/quality/phase-gates) for review criteria at each stage.

## Step 9: Create the Risk Register

Identify and assess risks from the outset:

1. Brainstorm risks across categories: site, regulatory, design, budget, schedule, stakeholder.
2. Score each risk by likelihood and impact.
3. Assign risk owners and define mitigation actions.
4. Schedule regular risk review sessions.

Use the [Risk Management](/en/project-management/risk-management) framework and templates.

## Step 10: First Commit and Phase Gate Review

Finalize the initiation phase:

1. Commit all documents to the project repository with proper version tags.
2. Conduct the [Initiation Phase](/en/phases/initiation) gate review.
3. Obtain sign-off from the client and project leadership.
4. Proceed to the concept design phase.

---

## Project Setup Checklist

Use this checklist to verify completeness before moving to the next phase.

| # | Task | Status |
|---|---|---|
| 1 | Folder structure created per standard | :white_large_square: |
| 2 | RACI matrix and communication plan approved | :white_large_square: |
| 3 | Building card created with basic metadata | :white_large_square: |
| 4 | Project brief written and accepted by client | :white_large_square: |
| 5 | Zoning status verified (MPZP or WZ) | :white_large_square: |
| 6 | Functional program defined, initial Space cards created | :white_large_square: |
| 7 | BIM Execution Plan agreed with all parties | :white_large_square: |
| 8 | QA procedures and checklists selected | :white_large_square: |
| 9 | Risk register populated and owners assigned | :white_large_square: |
| 10 | Initiation phase gate review completed | :white_large_square: |

::: info Next Steps
Once the checklist is complete, move to the [Initiation Phase](/en/phases/initiation) documentation to begin concept design work. For ongoing project governance, see [Project Management](/en/project-management/).
:::
