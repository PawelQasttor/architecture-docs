# Maintenance Planning

Effective maintenance planning extends equipment life, reduces operating costs, and keeps buildings safe and compliant. This page covers how to structure maintenance schedules, what to record, and how the documentation standard supports ongoing building upkeep.

## Preventive vs. Reactive Maintenance

| Aspect | Preventive Maintenance | Reactive Maintenance |
|---|---|---|
| Trigger | Scheduled interval or condition threshold | Equipment failure or reported fault |
| Cost profile | Lower per-event cost, predictable budgeting | Higher per-event cost, unpredictable spending |
| Equipment impact | Extends service life, reduces breakdowns | May cause secondary damage from delayed action |
| Documentation | Planned and recorded in advance | Captured after the event |
| Staffing | Scheduled during normal hours | Often requires emergency callout |

::: tip
A well-run building targets an 80/20 split: 80% preventive maintenance, 20% reactive. If your reactive maintenance exceeds 40%, review your preventive schedules for gaps.
:::

## Maintenance Schedule Structure

Every maintenance task should define four things:

1. **What** -- the specific asset or system component to be serviced
2. **When** -- the frequency (daily, weekly, monthly, quarterly, annually) or condition trigger
3. **Who** -- the responsible party (in-house staff, specialist contractor, manufacturer service)
4. **How** -- the procedure to follow, referencing the O&M manual or standard procedure

### Sample Schedule Entry

```yaml
asset_id: AHU-B1-01
task: Replace air filters
frequency: quarterly
responsible: HVAC contractor
procedure: See O&M manual section 4.3
next_due: 2025-04-15
estimated_duration: 45 min
```

## Building Logbook (KOB)

In Poland, the building logbook (*ksiazka obiektu budowlanego*, KOB) is a mandatory document required under the Building Law (*Prawo budowlane*). Since 2023, it can be maintained in digital form through the GUNB (General Office of Building Supervision) system.

### KOB Requirements

| Requirement | Details |
|---|---|
| Who must maintain it | Building owner or manager |
| When to start | From the date of occupancy permit |
| What to record | Inspections, repairs, modifications, maintenance events, control protocols |
| Mandatory inspections | Annual (installations, chimney), five-year (structural, building condition) |
| Retention | For the lifetime of the building |
| Digital option | Available through GUNB e-KOB system since 2023 |

::: warning
Failure to maintain the building logbook or to conduct mandatory inspections can result in fines and, in serious cases, restrictions on building use. Ensure that all inspection dates are tracked in your maintenance calendar.
:::

## Asset Cards for Maintenance

Each piece of equipment should have an [Asset Instance card](/en/documentation/entities/asset) that stores maintenance-relevant data. Use the [Asset Template](/en/templates/asset-template) as a starting point.

### Key Fields for Maintenance

| Field | Example Value | Purpose |
|---|---|---|
| `manufacturer` | Carrier | Identify correct parts and service contacts |
| `model` | 30RBP-039 | Reference correct O&M procedures |
| `serial_number` | CRR2024-08851 | Track warranty and service history |
| `installation_date` | 2024-03-15 | Calculate equipment age |
| `warranty_expiry` | 2029-03-15 | Flag warranty claims before expiry |
| `service_interval` | 6 months | Schedule next preventive maintenance |
| `last_service_date` | 2024-09-20 | Track maintenance compliance |
| `condition` | good | Monitor degradation over time |

## System Cards for Maintenance Planning

[System cards](/en/documentation/entities/system) document how building systems are configured and what maintenance they require as a whole. Use the [System Template](/en/templates/system-template) to record system-level maintenance needs.

Examples of system-level maintenance tasks:

- **HVAC system** -- seasonal changeover, refrigerant level checks, ductwork inspection
- **Electrical system** -- thermal imaging of distribution boards, RCD testing, emergency lighting checks
- **Plumbing system** -- backflow preventer testing, hot water temperature checks, drain clearing
- **Fire safety system** -- alarm panel testing, sprinkler flow tests, extinguisher servicing

::: info
System-level maintenance covers tasks that affect the system as a whole, not just individual components. Both system cards and asset cards should be updated after each maintenance event.
:::

## Seasonal Maintenance Calendar

### Spring (March--May)

- Inspect roof and drainage after winter
- Service cooling equipment before summer
- Check exterior sealants and weatherproofing
- Test irrigation systems
- Clean exterior glazing
- Inspect car park surfaces for frost damage

### Summer (June--August)

- Monitor cooling system performance
- Check refrigerant levels
- Inspect and clean condensate drains
- Service exterior shading and blinds
- Conduct legionella risk assessment for water systems
- Inspect green roofs and planted areas

### Autumn (September--November)

- Service heating equipment before winter
- Clean gutters and downpipes
- Inspect and seal building envelope before wet season
- Test heating system controls and thermostats
- Check emergency lighting and backup power systems
- Clear leaves from drains and flat roofs

### Winter (December--February)

- Monitor heating system performance
- Check for frozen or burst pipes in exposed areas
- Inspect insulation in roof spaces and risers
- Test snow and ice management systems
- Verify frost protection on external water systems
- Conduct annual KOB inspection (structural and installations)

## Maintenance Items by Building System

| System | Component | Task | Frequency |
|---|---|---|---|
| HVAC | Air handling units | Filter replacement | Quarterly |
| HVAC | Chillers | Refrigerant check, coil cleaning | Annually |
| HVAC | Boilers | Combustion analysis, safety valve test | Annually |
| HVAC | Ductwork | Inspection, cleaning | Every 2--3 years |
| Electrical | Distribution boards | Thermal imaging, connection check | Annually |
| Electrical | Emergency lighting | Function test / full duration test | Monthly / annually |
| Electrical | RCDs | Trip test | Quarterly |
| Electrical | Lightning protection | Inspection and resistance test | Annually |
| Plumbing | Hot water system | Temperature check, legionella flush | Monthly |
| Plumbing | Backflow preventers | Certified test | Annually |
| Plumbing | Drains | CCTV survey, cleaning | Every 2--3 years |
| Envelope | Roof covering | Visual inspection, drainage check | Bi-annually |
| Envelope | Facade sealants | Inspection, replacement if degraded | Every 3--5 years |
| Envelope | Windows and doors | Hardware check, seal inspection | Annually |
| Fire Safety | Fire alarm system | Panel test, detector check | Quarterly |
| Fire Safety | Sprinkler system | Flow test, valve inspection | Quarterly / annually |
| Fire Safety | Fire extinguishers | Visual check / full service | Monthly / annually |
| Fire Safety | Smoke ventilation | Function test | Bi-annually |

## Template: Monthly Maintenance Report

Use this structure for monthly maintenance reporting:

```markdown
## Monthly Maintenance Report -- [Month, Year]

### Summary
- Total planned tasks: [number]
- Completed on time: [number]
- Overdue: [number]
- Unplanned/reactive tasks: [number]

### Completed Tasks
| Date | Asset/System | Task | Performed By | Notes |
|------|-------------|------|-------------|-------|
|      |             |      |             |       |

### Overdue Tasks
| Original Due Date | Asset/System | Task | Reason for Delay | New Due Date |
|-------------------|-------------|------|-------------------|-------------|
|                   |             |      |                   |             |

### Issues Identified
- [List any issues found during maintenance that require follow-up]

### Next Month Priorities
- [List key tasks scheduled for the coming month]
```

## Linking Maintenance to Construction Records

Maintenance planning should reference [as-built documentation](/en/phases/as-built) and [construction phase](/en/phases/construction) records. When a component is replaced or modified, update both the maintenance records and the as-built documentation to keep them aligned.

For buildings with BIM models, maintenance data can be linked to model elements. See [BIM Integration](/en/bim-integration/) for details on connecting maintenance records to the digital model.
