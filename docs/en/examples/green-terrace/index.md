# Green Terrace Residential Building

A complete, real-world example demonstrating the Architecture Documentation Standard for a 6-story residential building in Warsaw, Poland.

## Project Overview

**Project Name:** Residential Building "Green Terrace"
**Location:** ul. Słoneczna 45, Warsaw, Poland
**Building Class:** A (Residential Multi-family)
**Height:** 18.5m (6 stories)
**Gross Floor Area:** 1,800 m²
**Dwelling Units:** 18 apartments
**BIM LOD:** 400 (Construction Documentation)

---

## Documentation Set

This example includes complete construction documentation following the Architecture Documentation Standard:

### 1. Site & Project Documentation

#### [Site →](./site)
Plot and parcel information
- Site area: 1,250 m², buildable area: 500 m²
- Zoning: MPZP Mokotów Stegny (max height 25m, max coverage 40%)
- Setbacks, utilities, topography, geotechnical data
- IFC mapping (IfcSite)

#### [Project Specification →](./project-specification)
Complete project overview and technical description
- Building data and classification
- Regulatory framework (Prawo budowlane, WT 2021)
- Architectural and structural design
- Technical systems (HVAC, plumbing, electrical)
- Full compliance verification
- BIM integration (IFC 4.0, LOD 400)
- Cost estimates and schedule

### 2. Vertical Circulation

#### [Staircase A →](./staircase-a)
Protected staircase connecting all 6 levels
- Type: Two-flight dog-leg with intermediate landings
- Fire escape route: protected staircase, REI 60, natural smoke ventilation
- Dimensions: 1,200 mm flight width, 169/290 mm rise/going
- Egress: 80 persons, 3.2 min evacuation time
- Accessibility: handrails both sides, tactile warnings, contrast nosings
- Regulatory compliance: WT 2021 §68, §69, §242, §256 (all compliant)
- Cost: EUR 42,000
- IFC mapping (IfcStair)

### 3. Spaces (v0.6: Multi-Level)

#### [Stairwell Void →](./spaces/stairwell-void)
Multi-level space spanning two floors (v0.6 feature)
- Spans LVL-00 + LVL-01 (primary level: LVL-01)
- `isMultiLevel: true` (auto-computed by compiler)
- Fire zone: ZONE-FIRE-ZL-IV
- Construction package: CP-STRUCTURE

### 4. Envelope Elements

#### [Envelope: External Wall Type A →](./envelope-external-wall-type-a)
Semantic envelope entity (v0.5) for external insulated masonry wall
- Full construction layers (5 layers, 447.5 mm total)
- Thermal: U = 0.18 W/(m²·K) (required ≤ 0.20) ✅
- Fire: REI 90 (required REI 60) ✅
- Acoustic: Rw = 55 dB (required ≥ 50) ✅
- Openings, glazing ratio, cost breakdown
- IFC mapping (IfcWallStandardCase), provenance tracking

### 5. Systems (v0.6: Hierarchy)

#### [HVAC System →](./systems/sys-hvac-01)
Parent HVAC system with subsystem hierarchy (v0.6 feature)
- Root system: SYS-HVAC-01 with 2 subsystems
- Construction package: CP-MEP

#### [Heating Subsystem →](./systems/sys-hvac-01-heating)
Heat pump + underfloor heating subsystem
- Parent: SYS-HVAC-01
- Assets: AST-HP-01, AST-UFH-MANIFOLD-01

#### [Ventilation Subsystem →](./systems/sys-hvac-01-vent)
MVHR ventilation subsystem
- Parent: SYS-HVAC-01
- Assets: AST-MVHR-01

### 6. Element Specifications (Legacy)

#### [External Wall - Type A →](./external-wall-type-a)
Legacy `element_specification` format (pre-v0.5)
- Complete IFC mapping (IfcWallStandardCase)
- 5-layer material specification
- Thermal performance: U = 0.18 W/(m²·K) ✅
- Fire resistance: REI 90 ✅
- Acoustic performance: Rw = 55 dB ✅
- Construction details and QC procedures

#### Floor Slab - Type A
Reinforced concrete floor slab specification
- IFC mapping (IfcSlabStandardCase)
- Material layers and reinforcement
- Fire resistance: REI 60 ✅
- Acoustic performance: Rw = 58 dB ✅

#### Window - Type A
PVC window specification
- IFC mapping (IfcWindow)
- Thermal performance: Uw = 0.85 W/(m²·K) ✅
- Acoustic rating: 35 dB

---

## Key Features Demonstrated

### ✅ Structured Metadata (AI-Readable)

Every document includes comprehensive YAML frontmatter:

```yaml
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "compliant"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  status: "compliant"
---
```

### ✅ Polish Regulatory Compliance

**Prawo budowlane (Construction Law):**
- Art. 5 - General requirements ✅
- Art. 20 - Technical documentation ✅
- Art. 34 - Design requirements ✅

**WT 2021 (Technical Conditions):**
- § 328 - Thermal insulation ✅
- § 234 - Fire safety ✅
- § 55 - Accessibility ✅
- § 206 - Sanitary facilities ✅
- § 132 - Room heights ✅

### ✅ BIM Integration (IFC 4.0)

**IFC Entities:**
- IfcBuilding: "GreenTerrace"
- IfcWallStandardCase - External walls
- IfcSlabStandardCase - Floor slabs
- IfcWindow - Windows and doors

**Property Sets:**
- Pset_WallCommon - Wall properties
- Pset_SlabCommon - Slab properties
- Pset_WindowCommon - Window properties
- Qto_*BaseQuantities - Quantity takeoffs

**LOD 400 Specifications:**
- Fabrication-level detail
- Complete specifications
- All products specified
- Installation instructions

### ✅ Professional Quality

**Complete for Construction:**
- Material specifications with products
- Supplier information
- Installation sequences
- Quality control procedures
- Test certificates referenced

**Ready for Permits:**
- All regulatory requirements verified
- Calculations documented
- Compliance status clear
- Professional formatting

---

## Compliance Verification

### Thermal Performance Summary

| Element | U-value | Required (WT § 328) | Status |
|---------|---------|---------------------|--------|
| External walls | 0.18 W/(m²·K) | ≤ 0.20 W/(m²·K) | ✅ Compliant |
| Roof | 0.14 W/(m²·K) | ≤ 0.15 W/(m²·K) | ✅ Compliant |
| Ground floor | 0.28 W/(m²·K) | ≤ 0.30 W/(m²·K) | ✅ Compliant |
| Windows | 0.85 W/(m²·K) | ≤ 0.90 W/(m²·K) | ✅ Compliant |

**Energy Performance:**
- Annual heating demand: 45 kWh/(m²·year)
- Energy class: B

### Fire Safety Summary

Building height 18.5m requires REI 60:

| Element | Required | Designed | Status |
|---------|----------|----------|--------|
| Load-bearing walls | REI 60 | REI 90 | ✅ Compliant |
| Floor slabs | REI 60 | REI 90 | ✅ Compliant |
| Staircase | REI 60 | REI 120 | ✅ Compliant |

### Accessibility Summary

- ✅ Level entrance from street
- ✅ Elevator to all floors (110×145 cm)
- ✅ Corridor width: 140 cm minimum
- ✅ Accessible parking: 2 spaces

---

## How to Use This Example

### For Learning

1. **Study the structure** - See how documentation is organized
2. **Review frontmatter** - Understand metadata structure
3. **Check compliance** - See how regulations are verified
4. **Examine BIM data** - Learn IFC integration

### For Your Project

1. **Copy as template** - Use as starting point
2. **Update metadata** - Change project details in frontmatter
3. **Adapt content** - Modify for your building
4. **Verify compliance** - Update for your requirements
5. **Export to PDF** - Generate submission documents

### Key Learnings

**From Project Specification:**
- How to structure project overview
- Regulatory framework setup
- BIM model organization
- Cost and schedule integration

**From Element Specifications:**
- Material layer documentation
- Performance calculations
- IFC property mapping
- Quality control procedures

---

## Technical Highlights

### Material Specifications

All materials fully specified with:
- Manufacturer and product codes
- Technical properties
- Test certificates
- Installation requirements

**Example - External Wall:**
- Baumit MVR Uni mineral render
- Ytong PP4/0.6 AAC blocks
- BASF Styrodur 3035 CS XPS insulation
- Rigips RB plasterboard

### Performance Calculations

**Thermal:** Per PN-EN ISO 6946
```
U = 1 / RT = 1 / 5.93 = 0.17 W/(m²·K)
Design value (with margin): 0.18 W/(m²·K)
```

**Fire:** Per PN-EN 13501-2
- Test certificate: FR2024-1234
- Result: REI 90

**Acoustic:** Per PN-EN ISO 140-3
- Test certificate: AC2024-5678
- Result: Rw = 55 dB

---

## BIM Model Information

**IFC Files:**
- `green-terrace-architecture.ifc` - Architectural model
- `green-terrace-structure.ifc` - Structural model
- `green-terrace-mep.ifc` - MEP model

**Model Statistics:**
- Total elements: 3,450
- Walls: 245
- Slabs: 42
- Windows: 126
- Doors: 95

**Bi-directional Sync:**
- IFC → Markdown: Extract properties
- Markdown → IFC: Update specifications
- Version controlled via Git

---

## Export to PDF

All documents can be exported to professional PDFs:

```bash
# Single document
pandoc project-specification.md -o project-spec.pdf

# All documents
./build-pdf.sh
```

Generated PDFs are ready for:
- Building permit applications
- Client presentations
- Contractor submissions
- Regulatory reviews

---

## Project Team

| Role | Name | License |
|------|------|---------|
| **Lead Architect** | Anna Nowak | IARP #5678 |
| **Structural Engineer** | Piotr Kowalski | PZITB #1234 |
| **MEP Engineer** | Jan Wiśniewski | PZITB #5678 |
| **Client** | Green Development Sp. z o.o. | - |

---

## Related Documentation

**Standards & Regulations:**
- [Prawo Budowlane →](/en/regulations/prawo-budowlane)
- [WT 2021 →](/en/regulations/wt-2021)
- [Standards Overview →](/en/standards/)

**BIM Integration:**
- [IFC Entities →](/en/bim-integration/ifc-entities)
- [LOD Definitions →](/en/bim-integration/lod-definitions)
- [Bi-directional Sync →](/en/bim-integration/bidirectional-sync)

**Templates:**
- Project Specification Template
- Element Specification Template
- Compliance Checklist Template

---

## Download

Want to use this example for your project?

- Download all files (ZIP) -- (available in a future release)
- View on GitHub -- (available in a future release)
- Clone repository -- (available in a future release)

---

**Status:** Construction Documentation (LOD 400)
**Last Updated:** 2026-02-20
**Version:** 2.0.0
