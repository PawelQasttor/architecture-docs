# Incident Management

Building incidents -- from minor equipment faults to major system failures -- require a structured response. Proper incident management reduces downtime, prevents recurrence, and maintains a reliable record for warranty claims, insurance, and regulatory compliance.

## What Counts as an Incident

An incident is any unplanned event that disrupts normal building operation or poses a risk to occupants, property, or the environment. Common categories include:

- **Equipment failure** -- motor burnout, pump seizure, control board malfunction
- **Water events** -- pipe burst, roof leak, flooding from external sources
- **HVAC breakdown** -- loss of heating or cooling, ventilation failure, refrigerant leak
- **Electrical faults** -- power outage, circuit breaker trip, distribution board failure
- **Structural issues** -- cracking, settlement, facade panel detachment
- **Fire safety** -- alarm activation, sprinkler discharge, fire door failure
- **Security** -- access control failure, break-in, vandalism
- **Environmental** -- hazardous material release, contamination, pest infestation

::: warning
Any incident involving risk to life, structural safety, or hazardous materials must be reported to the relevant authorities immediately, regardless of the internal reporting process. In Poland, structural incidents may require notification to PINB (building supervision inspectorate).
:::

## Incident Severity Levels

Classify every incident by severity to determine response priority and escalation requirements.

| Level | Severity | Description | Response Time | Examples |
|---|---|---|---|---|
| 1 | Critical | Immediate risk to life or major property damage | Within 1 hour | Structural failure, gas leak, fire, complete power loss |
| 2 | High | Significant disruption to building operations | Within 4 hours | Heating failure in winter, major water leak, elevator breakdown |
| 3 | Medium | Partial system degradation, workaround available | Within 24 hours | One AHU down (redundancy available), minor leak contained, partial lighting failure |
| 4 | Low | Minor issue, no immediate operational impact | Within 5 working days | Cosmetic damage, non-critical sensor fault, minor fixture issue |

::: tip
Response times should be adjusted to your building type and occupancy. A hospital requires faster response at every level than a warehouse. Define your response targets during the [handover phase](/en/phases/handover) and include them in the building's O&M documentation.
:::

## Incident Reporting Workflow

Follow these five stages for every incident:

### 1. Detect

Incidents are identified through:
- Occupant reports (phone, email, building management app)
- Building Management System (BMS) alarms
- IoT sensor alerts (see [Sensors & IoT](/en/bim-integration/sensors-iot))
- Routine inspections or maintenance rounds
- Third-party reports (utility companies, neighbours)

### 2. Report

Capture the following information at the point of reporting:

| Field | Description |
|---|---|
| Date and time | When the incident was observed |
| Location | Building, floor, room, or zone |
| Reporter | Name and contact details |
| Description | What happened, what was observed |
| Affected system | HVAC, electrical, plumbing, structure, etc. |
| Severity assessment | Initial classification (Level 1--4) |
| Immediate actions taken | Any emergency response already performed |
| Photos/evidence | Photographs of damage or conditions |

### 3. Assess

- Confirm or adjust the severity level
- Identify the affected assets and systems using [Asset Instance cards](/en/documentation/entities/asset-instance) and [System cards](/en/documentation/entities/system)
- Determine if the issue is covered by warranty
- Check if similar incidents have occurred before (review incident log)
- Assign responsibility for repair

### 4. Repair

- Carry out the repair or arrange contractor response
- Document all work performed, parts used, and time spent
- If temporary measures are applied, schedule the permanent fix
- Test the repaired system to confirm normal operation

### 5. Document

- Update the [Asset Instance card](/en/documentation/entities/asset-instance) with the incident record and any condition changes
- Add notes to the relevant [System card](/en/documentation/entities/system) if the incident affects system performance
- Record the incident in the building logbook (KOB) if required
- File the completed incident report
- Update as-built documentation if any modifications were made (see [As-Built](/en/phases/as-built))

## Root Cause Analysis

For recurring or significant incidents (severity Level 1--2, or any incident that occurs more than twice), conduct a root cause analysis to prevent recurrence.

### The 5 Whys Method

Ask "why" repeatedly until you reach the underlying cause. Example:

1. **Why** did the office flood? -- A pipe burst.
2. **Why** did the pipe burst? -- It froze overnight.
3. **Why** did it freeze? -- The heating in the riser was turned off.
4. **Why** was the heating turned off? -- It was switched off during a maintenance task and not restored.
5. **Why** was it not restored? -- There is no post-maintenance checklist for the riser heating.

**Root cause:** Missing post-maintenance verification procedure.
**Corrective action:** Add riser heating to the post-maintenance checklist.

### Fishbone Diagram (Ishikawa)

For complex incidents, organize potential causes into categories:

| Category | Potential Causes |
|---|---|
| Equipment | Age, defect, incorrect specification, lack of redundancy |
| Maintenance | Missed service, incorrect procedure, untrained technician |
| Environment | Extreme weather, flooding, contamination |
| Design | Undersized system, poor accessibility, inadequate drainage |
| Human factors | Operator error, miscommunication, incorrect settings |
| Materials | Defective component, wrong replacement part, corrosion |

::: info
Document the root cause analysis results in the incident report and link them to any corrective actions. This creates a knowledge base that facility managers can reference when similar issues arise.
:::

## Warranty Claims

When an incident involves equipment or work still under warranty, follow this process:

1. **Check warranty status** -- review the `warranty_expiry` field in the [Asset Instance card](/en/documentation/entities/asset-instance).
2. **Notify the manufacturer or contractor** within the warranty notification period (typically 7--14 days).
3. **Preserve evidence** -- do not discard failed components or modify the installation before the warranty inspection.
4. **Document the claim** -- record the claim reference, correspondence, and outcome.
5. **Track resolution** -- follow up until the claim is resolved and the repair is completed.

| Warranty Documentation | Where to Record |
|---|---|
| Warranty certificate and terms | Asset Instance card, attachments |
| Claim notification (date, reference) | Incident report |
| Manufacturer response | Incident report |
| Repair or replacement details | Asset Instance card, service log |
| Claim outcome (accepted/rejected) | Incident report, asset notes |

::: warning
Warranty claims often have strict notification deadlines. Missing these deadlines can void the warranty even if the defect is genuine. Track all warranty expiry dates in your asset documentation and set alerts at least 30 days before expiry.
:::

## How Incidents Update Documentation

Every incident is an opportunity to improve your building documentation:

| Event | Documentation Update |
|---|---|
| Equipment replaced | New [Asset Instance card](/en/documentation/entities/asset-instance), updated system diagram |
| Component repaired | Updated condition status, service log entry |
| Root cause identified | Revised maintenance procedure or schedule |
| Design defect found | Note added to [System card](/en/documentation/entities/system), flagged for retrofit review |
| Recurring issue | New preventive maintenance task created |

## Incident Report Template

Use this structure for all incident reports:

```markdown
## Incident Report

**Report ID:** INC-[YYYY]-[NNN]
**Date/Time of Incident:** [YYYY-MM-DD HH:MM]
**Date/Time Reported:** [YYYY-MM-DD HH:MM]
**Location:** [Building / Floor / Room]
**Reported By:** [Name, Contact]
**Severity Level:** [1 -- Critical / 2 -- High / 3 -- Medium / 4 -- Low]

### Description
[What happened, what was observed, conditions at the time]

### Affected Assets/Systems
| Asset/System ID | Description | Current Status |
|-----------------|-------------|----------------|
|                 |             |                |

### Immediate Actions Taken
- [List any emergency response or containment measures]

### Root Cause (if determined)
[Analysis method used, findings]

### Repair Actions
| Date | Action | Performed By | Parts/Materials | Duration |
|------|--------|-------------|-----------------|----------|
|      |        |             |                 |          |

### Warranty Applicable
- [ ] Yes -- Claim reference: [number]
- [ ] No

### Follow-Up Required
- [ ] Update Asset Instance card
- [ ] Update System card
- [ ] Update maintenance schedule
- [ ] Update as-built documentation
- [ ] Report to authorities (KOB / PINB)
- [ ] Insurance notification

### Sign-Off
| Role | Name | Date |
|------|------|------|
| Facility Manager |  |  |
| Technician |  |  |
| Building Owner (if Level 1--2) |  |  |
```

## Linking Incidents to the Broader Documentation System

Incident data connects to multiple areas of the documentation standard:

- **[Maintenance Planning](./maintenance)** -- recurring incidents indicate gaps in preventive maintenance
- **[Retrofit & Upgrades](./retrofit)** -- patterns of failure signal that equipment or systems may need replacement rather than continued repair
- **[Sustainability](/en/sustainability/)** -- incidents affecting energy systems should be reflected in performance tracking
- **[Regulations](/en/regulations/completion-occupancy)** -- certain incidents trigger mandatory reporting or re-inspection
