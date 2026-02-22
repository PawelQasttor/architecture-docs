---
title: Phase Gate Checklists
description: Printable checklists of required deliverables, reviews, and compliance checks for each project phase transition.
---

# Phase Gate Checklists

A phase gate is a formal checkpoint between two project phases. No work on the next phase should begin until the gate criteria are satisfied. This page provides a concrete, printable checklist for each of the eight phase transitions.

::: tip How to Use These Checklists
Print or copy the relevant gate checklist at the start of each phase. Assign responsibility for each item. Review the completed checklist as a team before requesting sign-off. Incomplete gates lead to rework --- take them seriously.
:::

For background on the QA framework, see [Quality Assurance](/en/quality/). For review workflows, see [Review Procedures](/en/quality/review-procedures).

---

## Gate 1: Initiation Complete

Transition from [Initiation](/en/phases/initiation) to [Concept](/en/phases/concept).

**Required documents:**
- [ ] Building document created with site address, classification, and project metadata
- [ ] Client brief captured as Requirement documents (functional requirements, target areas)
- [ ] Site analysis summary (access, orientation, constraints, utilities)
- [ ] Stakeholder register and contact information recorded

**Required reviews:**
- [ ] Client confirms brief is accurately captured
- [ ] Project lead approves scope definition
- [ ] Legal or planning advisor confirms zoning feasibility

**BIM model requirements:**
- [ ] LOD 100 --- massing model or site context model, if BIM is in scope
- [ ] [BIM Execution Plan](/en/bim-integration/bep) drafted with roles, software, and exchange formats

**Compliance checks:**
- [ ] Applicable [regulations](/en/regulations/) identified and listed
- [ ] Zoning and land-use restrictions confirmed with local authority
- [ ] Environmental or heritage constraints documented

---

## Gate 2: Concept Complete

Transition from [Concept](/en/phases/concept) to [Schematic](/en/phases/schematic).

**Required documents:**
- [ ] Space documents created for all major spaces (with areas and functions)
- [ ] Zone documents defined (functional zones at minimum)
- [ ] At least two concept options documented and evaluated
- [ ] Selected concept approved by client in writing

**Required reviews:**
- [ ] Internal design review of concept options (see [Review Procedures](/en/quality/review-procedures))
- [ ] Client presentation and written approval of preferred concept
- [ ] Cost advisor confirms concept is within budget range

**BIM model requirements:**
- [ ] LOD 100 --- building massing, site boundaries, major spatial volumes
- [ ] Model file naming follows [document control](/en/project-management/document-control) conventions

**Compliance checks:**
- [ ] Gross floor area within zoning allowance
- [ ] Building height within local limits
- [ ] Setback and coverage requirements verified
- [ ] Preliminary egress strategy reviewed against fire code

---

## Gate 3: Schematic Design Complete

Transition from [Schematic](/en/phases/schematic) to [Design Development](/en/phases/design-development).

**Required documents:**
- [ ] All Space documents updated with refined areas and adjacency relationships
- [ ] Zone documents expanded to include fire zones and accessibility zones
- [ ] Requirement documents linked to applicable regulations
- [ ] System documents initiated for primary systems (structural, HVAC, electrical, plumbing)
- [ ] Level documents created with floor-to-floor heights

**Required reviews:**
- [ ] Peer review of spatial layout and circulation
- [ ] Structural engineer confirms feasibility of proposed form
- [ ] MEP engineer confirms feasibility of primary systems
- [ ] Client sign-off on schematic floor plans, sections, and elevations

**BIM model requirements:**
- [ ] LOD 200 --- approximate geometry of major building elements
- [ ] Spatial elements carry identifiers matching Space documents
- [ ] Model coordination meeting held between disciplines

**Compliance checks:**
- [ ] Egress widths and travel distances checked against fire code
- [ ] Accessibility routes verified for compliance
- [ ] Energy performance targets established and documented
- [ ] Preliminary stormwater and site drainage strategy confirmed

---

## Gate 4: Design Development Complete

Transition from [Design Development](/en/phases/design-development) to [Construction Docs](/en/phases/construction-docs).

**Required documents:**
- [ ] System documents completed for all building systems
- [ ] Asset documents initiated for specified products and materials
- [ ] Requirement documents updated with performance criteria and test methods
- [ ] Interior finish schedules documented
- [ ] Door, window, and hardware schedules initiated

**Required reviews:**
- [ ] Full coordination review across architecture, structure, and MEP (see [Review Procedures](/en/quality/review-procedures))
- [ ] Specification writer reviews material selections for completeness
- [ ] Client approves design development package including material selections
- [ ] Cost estimate reconciled against budget --- approved by client

**BIM model requirements:**
- [ ] LOD 300 --- accurate geometry, correct quantities, defined assemblies
- [ ] Clash detection run between architectural, structural, and MEP models
- [ ] All critical clashes resolved or assigned for resolution
- [ ] Model audit completed per [BIM Execution Plan](/en/bim-integration/bep)

**Compliance checks:**
- [ ] Full code compliance review (fire, accessibility, structural, energy)
- [ ] Fire-resistance ratings assigned to all rated assemblies
- [ ] Acoustic requirements verified for rated partitions
- [ ] Sustainability and energy targets confirmed with current design

::: warning
Gate 4 is the most common point of failure. Insufficient coordination review here causes the majority of construction-phase RFIs and change orders. Allow adequate time for clash detection and resolution.
:::

---

## Gate 5: Construction Documents Complete

Transition from [Construction Docs](/en/phases/construction-docs) to [Construction](/en/phases/construction).

**Required documents:**
- [ ] Complete set of all seven document types, fully populated
- [ ] All cross-references between documents verified and valid
- [ ] Specifications finalized and coordinated with drawings
- [ ] Permit application package assembled

**Required reviews:**
- [ ] Documentation review --- YAML frontmatter completeness, naming conventions, version control
- [ ] Independent code review or plan check (internal or third-party)
- [ ] Client final approval of construction document set
- [ ] Contractor review for constructability (if available)

**BIM model requirements:**
- [ ] LOD 350 --- detailed elements with connection and interface information
- [ ] Final clash detection with zero critical clashes remaining
- [ ] Model exported in required exchange formats (IFC, PDF, DWG as needed)
- [ ] Drawing sheets generated from model are consistent with document set

**Compliance checks:**
- [ ] Permit submission checklist complete per local authority requirements
- [ ] All [regulatory requirements](/en/regulations/) addressed and documented
- [ ] Accessibility compliance report finalized
- [ ] Energy compliance documentation complete (calculations, HVAC sizing)

---

## Gate 6: Construction Phase Complete

Transition from [Construction](/en/phases/construction) to [As-Built](/en/phases/as-built).

**Required documents:**
- [ ] All RFIs logged with responses and document impacts recorded
- [ ] Change orders documented with updated drawings and specifications
- [ ] Submittal log complete --- all submittals reviewed and accepted
- [ ] Inspection reports filed and deficiencies resolved

**Required reviews:**
- [ ] Project architect confirms substantial completion
- [ ] Contractor provides punch list; items verified as resolved
- [ ] Building official issues certificate of occupancy (or equivalent)

**BIM model requirements:**
- [ ] Construction model updated with significant field changes
- [ ] As-built survey data collected for critical dimensions

**Compliance checks:**
- [ ] All required inspections passed (structural, fire, electrical, plumbing, elevator)
- [ ] Life-safety systems tested and commissioned (fire alarm, sprinkler, smoke control)
- [ ] Certificate of occupancy obtained

---

## Gate 7: As-Built Documentation Complete

Transition from [As-Built](/en/phases/as-built) to [Handover](/en/phases/handover).

**Required documents:**
- [ ] All document types updated to reflect as-built conditions
- [ ] Space documents updated with measured areas
- [ ] System documents updated with installed equipment data
- [ ] Asset documents updated with actual products, serial numbers, warranty dates

**Required reviews:**
- [ ] Architect verifies as-built documents against field conditions
- [ ] MEP engineers confirm system documents match installed systems
- [ ] Facility management team reviews documents for completeness and usability

**BIM model requirements:**
- [ ] LOD 500 --- as-built model reflecting verified field conditions
- [ ] Model elements carry final asset identifiers and maintenance data
- [ ] Model delivered in formats specified in the [BIM Execution Plan](/en/bim-integration/bep)

**Compliance checks:**
- [ ] As-built conditions still meet code requirements (no unauthorized deviations)
- [ ] Fire-safety system as-built drawings match commissioning records
- [ ] Accessibility features verified as constructed

---

## Gate 8: Handover Complete

Transition from [Handover](/en/phases/handover) to facility operations.

**Required documents:**
- [ ] Operations and maintenance manuals delivered
- [ ] Asset register complete with warranty and maintenance schedules
- [ ] Training records for building systems documented
- [ ] Final project archive assembled per [document control](/en/project-management/document-control) procedures

**Required reviews:**
- [ ] Facility management team accepts documentation package
- [ ] Client confirms all contractual deliverables received
- [ ] Project lead conducts lessons-learned review with team

**BIM model requirements:**
- [ ] Final as-built model delivered to owner in agreed formats
- [ ] Model handover includes viewer software or access instructions
- [ ] Facility management platform populated from model data (if applicable)

**Compliance checks:**
- [ ] All regulatory close-out documents filed with authorities
- [ ] Warranty start dates confirmed and recorded
- [ ] Post-occupancy evaluation schedule established (if required)

::: info
Keep a signed copy of each completed gate checklist in the project archive. These records demonstrate due diligence and support the team in the event of any future dispute or audit.
:::
