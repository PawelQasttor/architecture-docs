# Phase 1: Project Initiation

::: tip Phase Overview
**What you do:** Start a new architectural project, gather requirements, analyze site conditions
**Timeline:** 1-2 weeks
**Deliverables:** Project brief, site analysis, functional program, preliminary budget
:::

---

## What Happens in This Phase

Project initiation is where you:
1. Meet with the client to understand their needs
2. Analyze the site and its context
3. Define the functional program (space requirements)
4. Establish preliminary budget constraints
5. Review zoning and planning regulations
6. Set project goals and success criteria

---

## Documents to Create

### Project Brief
**Purpose:** Define project scope, goals, and constraints

**YAML Configuration:**
```yaml
---
documentType: "project_brief"
projectPhase: "initiation"
version: "1.0.0"
lastReviewed: "2026-02-20"
projectInfo:
  name: "Your Project Name"
  location: "City, Poland"
  clientName: "Client Name"
authors:
  - name: "Architect Name"
    role: "lead architect"
    license: "IARP XXXX"
---
```

**Key sections to include:**
- Client requirements and vision
- Site location and characteristics
- Functional program (rooms, areas, purposes)
- Budget range
- Timeline expectations
- Special requirements or constraints

Project Brief Template (future)

---

### Site Analysis
**Purpose:** Document existing site conditions

**What to document:**
- Site dimensions and topography
- Existing structures or vegetation
- Access roads and utilities
- Solar orientation
- Neighboring buildings
- Environmental constraints

**YAML Configuration:**
```yaml
---
documentType: "site_analysis"
projectPhase: "initiation"
siteInfo:
  area: "1200 m²"
  zoning: "residential"
  coordinates:
    lat: 52.2297
    lon: 21.0122
---
```

Site Analysis Template (future)

---

### Functional Program
**Purpose:** Define space requirements and relationships

**Example structure:**
```yaml
---
documentType: "functional_program"
projectPhase: "initiation"
spaces:
  - name: "Living Room"
    area: "35 m²"
    requirements: ["natural light", "south-facing"]
  - name: "Kitchen"
    area: "15 m²"
    requirements: ["ventilation", "utilities"]
---
```

---

## Regulations to Check

At this early stage, verify:

### Zoning Requirements
- **What to check:** Local zoning plan (MPZP) or land development conditions (WZ)
- **Why:** Determines what can be built on the site
- **Key parameters:**
  - Allowed building types
  - Maximum height
  - Building coverage ratio
  - Distance from property lines

### Planning Permission
- **Prawo budowlane Art. 29** - When is building permit required?
- **Prawo budowlane Art. 30** - When only notification is needed?

[Read more about Prawo budowlane →](/en/regulations/prawo-budowlane)

---

## BIM Requirements

### LOD: Not applicable yet
At this stage, BIM modeling is typically not started. Focus on:
- Site context (can use simple 2D/3D massing)
- Conceptual space diagrams
- Site analysis diagrams

---

## Tools & Workflows

### Recommended tools for this phase:
- **Site surveys:** Total station, GPS, or photogrammetry
- **Documentation:** Markdown editor (VS Code, Obsidian)
- **Diagrams:** Draw.io, Miro, or hand sketches
- **Photos:** Site photography with geotags

### Git workflow:
```bash
# Start new project
mkdir my-project
cd my-project
git init

# Create phase folder
mkdir 01-initiation
cd 01-initiation

# Create documents
touch project-brief.md
touch site-analysis.md
touch functional-program.md

# Commit
git add .
git commit -m "Initial project documentation"
git tag initiation-v1.0
```

---

## Example Project

See how this phase was executed in our sample project:

**Green Terrace Building - Project Initiation**
- [Green Terrace Project →](/en/examples/green-terrace/project-specification)
- [Green Terrace Example →](/en/examples/green-terrace/)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

At project initiation, the Semantic Building Model begins to take shape with foundational document types:

- **Building** document type created with basic project metadata (name, location, client, building type)
- **Space** document types drafted as part of the preliminary space program, capturing approximate areas and intended uses

These document types form the seed of the SBM and will be progressively refined in later phases.

**Example: Building document at initiation phase**
```yaml
entity: Building
id: building-001
name: "Green Terrace Residential Building"
location:
  city: "Warsaw"
  country: "Poland"
  coordinates:
    lat: 52.2297
    lon: 21.0122
buildingType: "residential"
client: "Green Development Sp. z o.o."
projectPhase: "initiation"
```

Learn more about the [Semantic Building Model](/en/documentation/overview).

---

## Project Controls at This Phase

### Governance Setup
Establish project governance from day one. Define roles, communication channels, and decision-making authority.
- [Set up RACI matrix and communication plan →](/en/project-management/governance)
- [Create document control procedures →](/en/project-management/document-control)

### Stakeholder Analysis
Identify all project stakeholders: client, authorities, neighbors, utility providers.
- [Stakeholder register template →](/en/project-management/governance#stakeholder-register)

### Zoning & Planning Check
Verify MPZP or apply for WZ decision before investing in design work.
- [MPZP & WZ guide →](/en/regulations/zoning-mpzp-wz)

### Risk Register
Create the initial risk register capturing planning permission risks, budget risks, and site condition risks.
- [Risk management framework →](/en/project-management/risk-management)

---

## Next Steps

Once project initiation is complete:

**Continue to Phase 2:**
[→ Concept Design (LOD 100)](/en/phases/concept)

**Or review complete workflow:**
[← View all phases](/en/standards/document-structure)

---

## Checklist

Before moving to Concept Design, ensure you have:

- [ ] Completed project brief with client sign-off
- [ ] Site analysis with photos and measurements
- [ ] Functional program with space requirements
- [ ] Preliminary budget estimate
- [ ] Zoning verification completed
- [ ] All documents committed to Git
- [ ] Client approval to proceed to concept design
