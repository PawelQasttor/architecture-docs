# Phase 6: Construction Phase

::: tip Phase Overview
**What you do:** Site supervision, construction diary, respond to RFIs, document changes
**BIM LOD:** LOD 400 (updated as changes occur)
**Timeline:** Project-dependent (6-18 months typical)
**Deliverables:** Meeting minutes, supervision diary, RFIs, change orders, stage completion protocols
:::

---

## What Happens in This Phase

Construction Phase is where you:
1. Supervise construction to ensure compliance with design
2. Maintain construction diary (dziennik budowy)
3. Respond to contractor questions (RFIs - Requests for Information)
4. Review and approve shop drawings
5. Document all changes to the design
6. Conduct stage inspections and issue completion protocols
7. Coordinate with consultants

**Your role:** Author's supervision (nadzór autorski) - ensure construction matches design intent

---

## Documents to Create

### 1. Construction Supervision Diary
**Purpose:** Record all site visits and observations

**YAML structure:**
```yaml
---
documentType: "construction_supervision"
projectPhase: "construction"
visitNumber: 15
visitDate: "2026-05-10"
attendees:
  - "Architect Name - architect"
  - "Site Manager - contractor"
weather:
  conditions: "sunny"
  temperature: "18°C"
---

## Construction Progress

**Current Stage:** External walls - floor 3

**Observations:**
- External wall Type A installation proceeding according to spec
- Insulation properly installed with staggered joints
- Mechanical fasteners installed per specification

**Issues Identified:**
- Window Type A delivery delayed
- Proposed alternative: Window Type B (equivalent performance)
- Decision: Approved pending client confirmation

**Next Visit:** 2026-05-17
```

---

### 2. Meeting Minutes
**Purpose:** Document decisions from site meetings

```yaml
---
documentType: "meeting_minutes"
projectPhase: "construction"
meetingNumber: 8
meetingDate: "2026-05-05"
meetingType: "coordination"
attendees:
  - name: "Architect Name"
    role: "Author's supervision"
  - name: "Engineer Name"
    role: "Structural supervision"
  - name: "Contractor Name"
    role: "General contractor"
---

## Agenda Items

### 1. Progress Review
- Foundation complete
- Structural frame at floor 3
- Timeline: On schedule

### 2. Material Submissions
- Approved: XPS insulation - Styrodur 3035 CS
- Pending: Window samples for testing

### 3. RFIs
- RFI-005: Stairwell dimension conflict - RESOLVED
- RFI-006: Balcony railing detail - PENDING architect response

### Action Items
- [ ] Architect to respond to RFI-006 by 2026-05-08
- [ ] Contractor to submit window samples by 2026-05-12
```

---

### 3. RFI Responses (Requests for Information)
**Purpose:** Answer contractor questions about construction

```yaml
---
documentType: "rfi_response"
rfiNumber: "RFI-006"
dateReceived: "2026-05-03"
dateResponded: "2026-05-07"
subject: "Balcony Railing - Glass vs Metal"
status: "closed"
---

## Question from Contractor

"Drawing A-301 shows glass railing for balconies. Local supplier
cannot provide specified glass thickness (12mm tempered).
Alternative options:
- Option A: 10mm tempered glass + additional posts
- Option B: Metal railing per code requirements

Please advise."

## Response from Architect

**Decision:** Option A - 10mm tempered glass with additional posts

**Reasoning:**
- Maintains design intent (transparent railing)
- Meets safety requirements with additional posts
- Option B would change visual appearance significantly

**Requirements:**
- Use 10mm tempered safety glass (EN 12150)
- Add intermediate post every 800mm (instead of 1200mm)
- Submit revised shop drawings for approval

**Approved by:** [Architect name and license]
**Date:** 2026-05-07
```

RFI Response Template (future)

---

### 4. Change Orders
**Purpose:** Document changes to original design

```yaml
---
documentType: "change_order"
changeNumber: "CO-001"
dateIssued: "2026-05-15"
status: "approved"
initiatedBy: "contractor"
reason: "unforeseen_conditions"
projectPhase: "construction"

impact:
  cost: "+€5,000"
  schedule: "+3 days"
  regulatory: "no impact"
---

## Change Description

**Original Design:**
Foundation Type A - strip footings at 1.2m depth

**Changed To:**
Foundation Type B - strip footings at 1.8m depth with additional reinforcement

**Reason:**
Groundwater level higher than indicated in soil report. Requires deeper
foundations and waterproofing membrane.

## Impact Analysis

**Cost Impact:** +€5,000
- Additional excavation: €1,500
- Additional concrete: €2,000
- Waterproofing membrane: €1,500

**Schedule Impact:** +3 days
- Additional excavation time: 2 days
- Concrete curing: 1 day

**Regulatory Impact:** None
- Updated foundation design reviewed by structural engineer
- Meets all building code requirements

## Approvals
- [x] Architect approval
- [x] Structural engineer approval
- [x] Client approval (cost increase)
- [x] Building authority notification (if required)
```

Change Order Template (future)

---

### 5. Stage Completion Protocols
**Purpose:** Document completion of construction stages

```yaml
---
documentType: "stage_completion_protocol"
projectPhase: "construction"
stage: "structural_frame"
completionDate: "2026-06-01"
---

## Stage: Structural Frame

**Scope:**
- Foundation complete
- Structural columns and beams installed (all floors)
- Floor slabs poured (all levels)
- Roof structure complete

**Inspections Performed:**
- [x] Concrete strength tests - all passed
- [x] Reinforcement inspection - approved
- [x] Dimensional survey - within tolerance
- [x] Structural engineer sign-off

**Quality Control:**
- Concrete: C30/37 - test results compliant
- Reinforcement: As per structural drawings
- Dimensional accuracy: ±15mm (acceptable)

**Defects/Punch List:**
- None identified

**Status:** APPROVED for next stage

**Signed:**
- Architect: [Name, Date]
- Structural Engineer: [Name, Date]
- Contractor: [Name, Date]
```

Completion Protocol Template (future)

---

## BIM Updates During Construction

### Update BIM Model with Changes:

When changes occur during construction, update the BIM model:

```yaml
# Document the change in markdown first
---
documentType: "change_order"
changeNumber: "CO-003"
elementAffected: "ExternalWall_TypeA"
change: "XPS insulation thickness increased from 150mm to 200mm"
---

# Then update BIM model
# Update wall Type A in Revit/ArchiCAD
# Export updated IFC

# Sync changes to markdown specifications
python ../bim-sync/markdown-to-ifc.py \
  --update specifications/external-wall-type-a.md

# Commit changes
git add .
git commit -m "CO-003: External wall insulation increased to 200mm"
```

**Keep BIM model current** - it becomes the basis for As-Built documentation (Phase 7)

---

## Git Workflow

```bash
# Create construction folder
mkdir 06-construction
cd 06-construction

# Create subfolder structure
mkdir diary
mkdir meetings
mkdir rfis
mkdir changes
mkdir protocols

# Add documents as construction progresses
touch diary/visit-001-2026-04-15.md
touch meetings/meeting-001-2026-04-10.md
touch rfis/rfi-001.md
touch changes/co-001.md

# Commit regularly (weekly recommended)
git add diary/visit-001-2026-04-15.md
git commit -m "Site visit #1 - foundation excavation"

git add changes/co-001.md
git commit -m "Change Order CO-001 - deeper foundations"

# Track progression
git log --oneline 06-construction/
```

---

## Regulations During Construction

### Construction Law Requirements

**Dziennik budowy (Construction Diary):**
- Required for all construction projects
- Must be kept on site
- All inspections recorded
- Authority inspections documented

**Author's Supervision (Nadzór autorski):**
- Architect must supervise construction
- Ensure compliance with approved design
- Document all changes
- Sign stage completion protocols

**Building Inspector Visits:**
- Document all official inspections
- Address any non-compliance issues
- Obtain required approvals for stages

[Learn about Construction Law →](/en/regulations/prawo-budowlane)

---

## SBM Documents at This Phase

The [Semantic Building Model (SBM)](/en/documentation/overview) is updated throughout construction as actual conditions are documented. Document types evolve from design specifications to reflect installed reality.

### Asset Instance Documents Updated
As equipment is installed on site, Asset Instance documents are updated with serial numbers, installation dates, and commissioning data.

[Learn about Asset Instance documents →](/en/documentation/entities/asset-instance)

### Space Documents Tracked
Space documents begin tracking as-built measurements as construction progresses. Actual dimensions, finishes, and conditions are recorded.

### System Documents Updated
System documents are updated with actual routing, connections, and verified performance. Field changes (e.g., duct rerouting, pipe resizing) are captured.

[Learn about System documents →](/en/documentation/entities/system)

### Example: Asset Instance Updated with Installation Data

```yaml
entity: asset_instance
id: asset-boiler-01
name: "Central Gas Boiler"
system: system-heating-central
location: space-technical-room-01

manufacturer:
  name: "Viessmann"
  model: "Vitodens 200-W"
  productCode: "B2HF-120"

installation:
  serialNumber: "7846231-2026-PL"
  installationDate: "2026-05-15"
  installedBy: "HVAC Service Ltd"
  commissioningDate: "2026-05-18"
  commissioningReport: "commissioning-boiler-01-20260518.pdf"

commissioning:
  flowTemperatureVerified: "79.5°C"
  returnTemperatureVerified: "59.8°C"
  efficiencyMeasured: "97.5%"
  gasLeakTest: "PASS"
  safetyValveTest: "PASS"
  status: "operational"
```

[View SBM document type documentation →](/en/documentation/entities/)
[View SBM authoring guide →](/en/documentation/authoring/)

---

## Project Controls at This Phase

### Shop Drawing Review
Review contractor shop drawings against design intent. Document approvals and comments.
- [Review procedures →](/en/quality/review-procedures)

### Non-Conformance Reports
Track deviations from design. Assess whether changes are significant (requiring permit amendment) or minor.
- [Change management →](/en/project-management/change-management)

### Polish Construction Formalities
Ensure kierownik budowy is appointed, dziennik budowy is maintained, and all notifications are filed.
- [Construction formalities →](/en/regulations/construction-formalities)

### Site Change Control
All site changes must be documented. Update documentation version and BIM model accordingly.
- [Change management →](/en/project-management/change-management)
- [Risk management →](/en/project-management/risk-management)

---

## Next Steps

Once construction is complete:

**Continue to Phase 7:**
[→ As-Built Documentation (LOD 500)](/en/phases/as-built)

**Or go back:**
[← Phase 5: Construction Documentation](/en/phases/construction-docs)

**View complete workflow:**
[View all phases →](/en/standards/document-structure)

---

## Checklist

During construction phase:

- [ ] Site visits conducted regularly
- [ ] Construction diary maintained
- [ ] All RFIs responded to promptly
- [ ] All changes documented in change orders
- [ ] BIM model updated with all changes
- [ ] All stage inspections completed
- [ ] Completion protocols issued
- [ ] All documents committed to Git regularly
- [ ] Ready to begin As-Built documentation upon completion
