# Phase 8: Handover & Maintenance

::: tip Phase Overview
**What you do:** Hand over building to client/owner, provide operation manuals, establish maintenance plans
**BIM LOD:** LOD 500 (for FM - Facility Management)
**Timeline:** 1-2 weeks
**Deliverables:** Building manual (O&M), maintenance plan, warranties, BIM model for FM, training
:::

::: success Final Phase
This is the final phase of the architect's workflow. After handover, the building enters operation and maintenance, with periodic reviews.
:::

---

## What Happens in This Phase

Handover & Maintenance is where you:
1. Prepare comprehensive building operation manual (O&M Manual)
2. Create maintenance plan with inspection schedules
3. Compile all warranties and guarantees
4. Prepare BIM model for facility management
5. Provide supplier contact information
6. Train building operators/facility managers
7. Establish periodic inspection schedules

**This documentation enables:**
- Proper building operation
- Preventive maintenance
- Energy efficiency
- Long building lifespan
- Future renovation planning

---

## Documents to Create

### 1. Building Operation & Maintenance Manual (O&M)
**Purpose:** Comprehensive guide for building operators

**YAML structure:**
```yaml
---
documentType: "building_manual"
purpose: "operation_maintenance"
projectPhase: "handover"
buildingInfo:
  name: "Green Terrace Building"
  address: "ul. Przykładowa 10, Warszawa"
  completionDate: "2026-06-01"
  certificateOfOccupancy: "CO/2026/1234"
  totalArea: "1,800 m²"
  buildingUse: "Residential (18 apartments)"
owner:
  name: "Owner Name"
  contact: "+48 XX XXX XXXX"
facilityManager:
  name: "FM Company"
  contact: "+48 XX XXX XXXX"
version: "1.0.0"
---

# Building Operation & Maintenance Manual

## 1. Building Overview

**Building Description:**
6-story residential building with 18 apartments, underground parking,
and rooftop terrace. Concrete frame structure with energy-efficient
envelope.

**Key Building Data:**
- Total area: 1,800 m²
- Heating: Central gas boiler
- Ventilation: Natural + mechanical in wet rooms
- Hot water: Central gas boiler
- Electricity: Main supply 3x63A

## 2. Building Systems

### 2.1 Structural System
- Reinforced concrete frame
- No special maintenance required
- Periodic inspection: Every 5 years

### 2.2 Building Envelope
- External walls: Insulated concrete block system
- Windows: PVC triple-glazed
- Roof: Flat roof with membrane waterproofing
- **Maintenance:** See section 3.1

### 2.3 Heating System
- Type: Central gas boiler, radiators
- Boiler: [Manufacturer, Model, S/N]
- Capacity: 120 kW
- **Maintenance:** Annual servicing required
- **Service provider:** [Company name, contact]

### 2.4 Ventilation
- Natural ventilation via windows
- Mechanical exhaust in bathrooms and kitchens
- **Maintenance:** Filter cleaning quarterly

### 2.5 Electrical System
- Main distribution panel: Floor 0
- Sub-panels: Each floor
- Emergency lighting: Battery backup
- **Maintenance:** Annual inspection

## 3. Maintenance Procedures

### 3.1 Roof Maintenance
**Frequency:** Every 6 months

**Inspection checklist:**
- [ ] Check waterproofing membrane for damage
- [ ] Clear drains and gutters
- [ ] Inspect roof penetrations (vents, pipes)
- [ ] Check expansion joints
- [ ] Inspect parapet coping
- [ ] Document any damage with photos

**Critical:** Roof must be inspected after major storms

### 3.2 Façade Maintenance
**Frequency:** Annually

**Inspection checklist:**
- [ ] Check render for cracks
- [ ] Inspect window seals
- [ ] Check balcony waterproofing
- [ ] Inspect balcony railings for corrosion
- [ ] Clean windows and frames

### 3.3 MEP Systems Maintenance
**See detailed schedules in Section 4**

## 4. Inspection Schedules

**Annual Inspections:**
- Heating system servicing
- Electrical system inspection
- Fire safety equipment
- Elevator inspection
- Facade inspection

**5-Year Inspections:**
- Structural inspection
- Roof membrane inspection
- Building envelope thermography

## 5. Emergency Procedures

### 5.1 Water Leak
1. Locate and shut off water supply valve (Floor 0, Room 01)
2. Contact plumber: [Emergency contact]
3. Document damage with photos
4. Notify building owner

### 5.2 Heating System Failure
1. Check boiler error code
2. Contact heating service: [Emergency contact]
3. If winter, arrange temporary heating

### 5.3 Electrical Failure
1. Check main circuit breakers (Floor 0)
2. If main supply failure, contact: [Utility company]
3. Emergency electrician: [Contact]

## 6. Contact Information

**Emergency Services:**
- Fire: 998
- Police: 997
- Ambulance: 999

**Building Services:**
- Heating service: [Company, phone]
- Electrical service: [Company, phone]
- Plumbing service: [Company, phone]
- Elevator service: [Company, phone]

**Suppliers:**
- Window manufacturer: [Company, phone]
- Roof membrane: [Company, phone]
- Boiler manufacturer: [Company, phone]

## 7. Warranties

**See separate warranty documentation folder**

- Structural: 10 years (expires 2036-06-01)
- Roof waterproofing: 5 years (expires 2031-06-01)
- Windows: 5 years (expires 2031-06-01)
- Heating boiler: 2 years (expires 2028-06-01)
- Elevator: 2 years (expires 2028-06-01)
```

O&M Manual Template (future)

---

### 2. Maintenance Plan
**Purpose:** Detailed schedule of all maintenance activities

```yaml
---
documentType: "maintenance_plan"
projectPhase: "handover"
buildingName: "Green Terrace Building"
version: "1.0.0"
---

# Maintenance Plan

## Monthly Tasks

**Heating System (during heating season):**
- Check boiler pressure
- Verify proper operation
- Check for leaks

**Elevator:**
- Visual inspection
- Report any unusual noises

**Common Areas:**
- Clean all common areas
- Check lighting
- Inspect entrance door operation

## Quarterly Tasks

**Ventilation:**
- Clean/replace filters in mechanical ventilation
- Check fan operation

**Fire Safety:**
- Test fire alarm system
- Check fire extinguisher pressure
- Inspect emergency lighting

## Semi-Annual Tasks (Every 6 Months)

**Roof:**
- Complete roof inspection (see O&M manual)
- Clean gutters and drains
- Check waterproofing integrity

**Drainage:**
- Clean storm drains
- Check for blockages

## Annual Tasks

**Heating System:**
- Professional servicing by certified technician
- Boiler efficiency test
- Safety inspection
- Cleaning and maintenance

**Electrical System:**
- Inspection by certified electrician
- Test RCDs (residual current devices)
- Inspect main panel
- Test emergency lighting

**Façade:**
- Complete façade inspection
- Check render condition
- Inspect window seals
- Check balcony condition

**Elevator:**
- Annual safety inspection (legally required)
- Maintenance by certified technician

## 5-Year Tasks

**Structural:**
- Structural inspection by engineer
- Check for cracks or settlement
- Inspect load-bearing elements

**Roof:**
- Professional roof inspection
- Waterproofing membrane condition assessment
- Consider re-coating if needed

**Building Envelope:**
- Thermography inspection
- Check insulation performance
- Identify any thermal bridges

**Façade:**
- Detailed façade inspection
- Consider cleaning/repainting

## 10-Year Tasks

**Major Systems Review:**
- Heating system replacement assessment
- Window condition assessment
- Roof membrane replacement planning

**Building Performance Review:**
- Energy consumption analysis
- Consider energy efficiency upgrades
```

[Asset Document Template →](/en/templates/asset-template) *(includes maintenance schedules)*

---

### 3. Warranty and Guarantee Documentation
**Purpose:** Compile all warranties for easy reference

**Organize warranties:**
```
08-handover/
└── warranties/
    ├── structural-warranty.pdf (10 years)
    ├── roof-waterproofing-warranty.pdf (5 years)
    ├── windows-warranty.pdf (5 years)
    ├── heating-boiler-warranty.pdf (2 years)
    ├── elevator-warranty.pdf (2 years)
    ├── insulation-manufacturer-warranty.pdf
    └── paint-warranty.pdf
```

**Warranty tracking document:**
```yaml
---
documentType: "warranty_tracker"
projectPhase: "handover"
---

# Warranty Register

| Item | Manufacturer | Warranty Period | Expiry Date | Contact |
|------|--------------|-----------------|-------------|---------|
| Structural | - | 10 years | 2036-06-01 | Contractor |
| Roof membrane | BASF | 5 years | 2031-06-01 | +48 XX XXX |
| Windows | WindowCo | 5 years | 2031-06-01 | +48 XX XXX |
| Heating boiler | BoilerCo | 2 years | 2028-06-01 | +48 XX XXX |
| Elevator | ElevatorCo | 2 years | 2028-06-01 | +48 XX XXX |
```

---

### 4. Supplier and Service Provider Contacts
**Purpose:** Quick reference for all building service providers

```markdown
# Supplier & Service Contact List

## Product Manufacturers

**Windows - WindowCo Poland**
- Contact: Jan Kowalski
- Phone: +48 22 XXX XXXX
- Email: service@windowco.pl
- Product: PVC windows, triple glazed
- Warranty: 5 years

**Roof Membrane - BASF Polska**
- Contact: Anna Nowak
- Phone: +48 22 XXX XXXX
- Email: technical@basf.pl
- Product: Waterproofing membrane
- Warranty: 5 years

**Boiler - BoilerCo**
- Contact: Technical Support
- Phone: +48 22 XXX XXXX
- Email: support@boilerco.pl
- Product: Gas boiler 120kW
- Warranty: 2 years

## Service Providers

**Heating System Service**
- Company: HVAC Service Ltd
- Phone: +48 XXX XXX XXX (24/7)
- Email: emergency@hvacservice.pl
- Contract: Annual maintenance

**Electrical Service**
- Company: Electric Pro
- Phone: +48 XXX XXX XXX (24/7)
- Email: service@electricpro.pl
- License: EEE/1234/2025

**Elevator Service**
- Company: ElevatorCo Service
- Phone: +48 XXX XXX XXX (24/7)
- Email: service@elevatorco.pl
- Contract: Annual inspection + maintenance

**Plumbing Service**
- Company: PlumbPro
- Phone: +48 XXX XXX XXX (24/7)
- Email: emergency@plumbpro.pl
```

---

### 5. BIM Model for Facility Management
**Purpose:** Provide BIM model for ongoing facility management

**Prepare FM-ready BIM model:**
```yaml
---
documentType: "bim_for_fm"
bimLOD: "LOD_500"
purpose: "facility_management"
---

# BIM Model for Facility Management

**Model File:** as-built-model-fm.ifc (IFC 4.0)

**FM-Specific Properties Added:**

**Equipment:**
- Boiler: Manufacturer, model, serial number, installation date, warranty expiry
- Elevator: Manufacturer, model, serial number, installation date, inspection dates
- Fire extinguishers: Locations, expiry dates

**Maintenance Zones:**
- Roof zones defined
- Façade maintenance zones
- Common area zones

**Access Information:**
- Technical room access codes
- Key locations
- Utility shut-off valve locations

**Service Schedules:**
- Linked to maintenance plan
- Inspection due dates

**Usage:**
Import this IFC model into FM software (e.g., Autodesk BIM 360, Archibus, Spacewell)
for ongoing facility management.
```

---

## Training and Handover Meeting

### Facility Manager Training
**Purpose:** Train building operators on systems and maintenance

**Training agenda:**
1. **Building tour** - Show all technical rooms, shut-off valves
2. **System operation** - Demonstrate boiler, ventilation controls
3. **O&M manual walkthrough** - Review key sections
4. **Emergency procedures** - Practice emergency shut-offs
5. **Maintenance schedule review** - Explain periodic tasks
6. **BIM model demo** - Show how to use FM model (if applicable)
7. **Q&A session**

**Document training:**
```yaml
---
documentType: "training_record"
trainingDate: "2026-06-25"
attendees:
  - "Facility Manager Name"
  - "Building Owner"
  - "Architect (trainer)"
topics:
  - "Building systems overview"
  - "O&M manual review"
  - "Emergency procedures"
  - "Maintenance schedules"
  - "Warranty information"
completionStatus: "complete"
---
```

---

## Git Workflow

```bash
# Create handover folder
mkdir 08-handover
cd 08-handover

# Create documents
touch om-manual.md
touch maintenance-plan.md
touch supplier-contacts.md
touch warranty-tracker.md
touch training-record.md

# Create warranty folder
mkdir warranties
# Add all warranty PDFs

# Add BIM model for FM
mkdir bim
cp ../07-as-built/bim/as-built-model.ifc bim/as-built-model-fm.ifc

# Commit handover documentation
git add .
git commit -m "Handover documentation complete - O&M manual and maintenance plan"
git tag handover-v1.0

# Final project commit
cd ..
git commit -m "Project complete - all phases documented"
git tag project-complete-v1.0
```

---

## Example Project

**Green Terrace Building - Handover**
- [Green Terrace Project →](/en/examples/green-terrace/)
- [Green Terrace Project →](/en/examples/green-terrace/)

[View complete Green Terrace project →](/en/examples/green-terrace/)

---

## SBM Documents at This Phase

The [Semantic Building Model (SBM)](/en/documentation/overview) delivers its full value at Handover. The SBM compiler produces structured outputs that integrate directly into facility management systems, BMS platforms, and regulatory archives.

### Asset Register Complete
The compiler generates `asset_register.json` containing every Asset Instance document with manufacturer data, serial numbers, warranty dates, and maintenance schedules. This file imports directly into CMMS platforms.

[Learn about Asset Instance documents →](/en/documentation/entities/asset-instance)

### Digital Twin Schema Generated
The compiler produces `twin_schema.json` with sensor bindings and BMS (Building Management System) integration points, enabling real-time monitoring of building systems.

### All Compliance Verified
The `compliance_report.json` output shows full verification status for every Requirement document type, with links to test reports and certificates.

### Compilation Targets for Handover

The SBM compiler produces four key outputs that support different handover needs:

| Output File | Purpose | Consumer |
|---|---|---|
| `bim_mapping.json` | Revit shared parameters, IFC property mappings | FM team loads into BIM tools |
| `compliance_report.json` | Requirement verification with measured values | Regulatory documentation |
| `asset_register.json` | Complete equipment register with maintenance data | CMMS import (Maximo, SAP PM) |
| `twin_schema.json` | Sensor bindings, BMS integration points | BMS configuration, digital twin |

[Learn about the SBM compiler →](/en/documentation/compiler/)

### Example: Compilation Command

```yaml
# Compile all SBM entities for handover
sbm compile \
  --source ./entities/ \
  --target bim_mapping \
  --target compliance_report \
  --target asset_register \
  --target twin_schema \
  --output ./08-handover/compiled/ \
  --format json \
  --verify true

# Output files:
# ./08-handover/compiled/bim_mapping.json
# ./08-handover/compiled/compliance_report.json
# ./08-handover/compiled/asset_register.json
# ./08-handover/compiled/twin_schema.json
```

[View SBM document type documentation →](/en/documentation/entities/)
[View SBM authoring guide →](/en/documentation/authoring/)

---

## Project Controls at This Phase

### Polish Completion Procedures
File completion notification (zawiadomienie) or apply for occupancy permit (pozwolenie na użytkowanie).
- [Completion & occupancy guide →](/en/regulations/completion-occupancy)
- [Administrative fees →](/en/regulations/fees)

### Post-Occupancy Evaluation
Plan for POE at 3-6 months after handover. Define what to measure and who is responsible.
- [Building operations overview →](/en/operations/)
- [Sensor & IoT planning →](/en/bim-integration/sensors-iot)

### Building Logbook
Prepare the building logbook (książka obiektu budowlanego) with all maintenance schedules and equipment registers.
- [Maintenance planning →](/en/operations/maintenance)

### Handover Gate
Final quality gate -- verify all documentation is complete, all As-Built records updated, all manuals delivered.
- [Phase gate checklists →](/en/quality/phase-gates)

---

## Post-Handover

### Periodic Reviews
**Recommended schedule:**
- **1-year review:** Check all systems, address any defects
- **5-year review:** Major systems review, update maintenance plan
- **10-year review:** Major renovation planning

### Building Performance Monitoring
- Track energy consumption
- Monitor maintenance costs
- Review building performance vs. design

### Future Renovations
- All as-built documentation (LOD 500 BIM model) serves as basis
- Return to appropriate phase for renovation scope

---

## Complete Workflow

**Congratulations! You've completed all 8 phases of the architect workflow.**

**Review complete workflow:**
[← View all phases from start to finish](/en/standards/document-structure)

**Start a new project:**
[→ Begin with Phase 1: Project Initiation](/en/phases/initiation)

**Reference materials:**
- [Regulations →](/en/regulations/)
- [BIM Integration →](/en/bim-integration/)
- [Templates →](/en/templates/)
- [Examples →](/en/examples/)

---

## Final Checklist

Before project completion:

- [ ] O&M manual complete and delivered to client
- [ ] Maintenance plan with all schedules complete
- [ ] All warranties collected and organized
- [ ] Supplier contact list provided
- [ ] BIM model for FM prepared (LOD 500)
- [ ] Facility manager training completed
- [ ] Training record documented
- [ ] Certificate of occupancy obtained
- [ ] Final payment from client received
- [ ] All documentation committed to Git
- [ ] Project archived for future reference
- [ ] 1-year review scheduled in calendar

**Project complete!** 🎉
