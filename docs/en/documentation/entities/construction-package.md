# Construction Package (Work Package)

## What This Is

A **Construction Package** file describes a work package for phased construction delivery. It tracks scope, schedule, costs, dependencies, and contractor information. Entities reference their construction package via `constructionPackageId`.

::: tip For Architects
**Problem:** The project manager asks "How much of the envelope package is done?" and you're cross-referencing Gantt charts with cost reports with contractor claims.

**Old way:** Programme in Primavera/MS Project, cost report in Excel, scope in a contract document, progress in site meeting minutes.

**With construction packages:** One file per work package. Scope, schedule, cost breakdown, dependencies, progress — all linked to the actual building entities assigned to that package. The compiler auto-computes which entities belong to each package and aggregates costs.

**One construction package file = scope + schedule + cost + progress in one place.**
:::

## Purpose

Construction packages define:
- Work package scope and sequence
- Schedule (planned/actual start and end dates)
- Cost breakdown (labor, materials, equipment, overhead)
- Dependencies between packages
- Contractor information
- Progress tracking (percent complete, earned value)
- Auto-computed assigned entities (from `constructionPackageId` references)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique package ID (`CP-` prefix) | `"CP-STRUCTURE"` |
| `entityType` | string | Must be `"construction_package"` | `"construction_package"` |
| `packageName` | string | Human-readable name | `"Structural Works"` |
| `sequence` | integer | Execution order (1 = first) | `1` |
| `version` | string | Semantic version | `"1.0.0"` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Detailed package description |
| `scope` | string | Scope of work |
| `status` | string | Package status (planned, in_progress, completed, on_hold, cancelled) |
| `plannedStart` / `plannedEnd` | string | Planned dates (ISO 8601) |
| `actualStart` / `actualEnd` | string | Actual dates (ISO 8601) |
| `duration` | object | Planned and actual duration in working days |
| `progress` | object | Percent complete, earned value, actual cost |
| `dependencies` | array | Dependencies on other packages (see below) |
| `contractor` | object | Company, contact, contract reference, value |
| `costBreakdown` | object | Labor, materials, equipment, overhead, contingency |
| `costSummary` | object | Auto-computed: aggregated costs from assigned entities |
| `assignedEntityIds` | array | Auto-computed: entities referencing this package |
| `buildingId` | string | Building this package is scoped to |
| `cost` | object | Total package cost |
| `ifcMapping` | object | IFC entity (IfcWorkSchedule / IfcWorkPlan) |

## Dependencies

Dependencies between packages use standard scheduling relationships:

```yaml
dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"  # Most common
    lag: -30                  # 30-day lead time (negative = start before finish)
```

| Type | Description |
|------|-------------|
| `finish_to_start` | B starts after A finishes (most common) |
| `start_to_start` | B starts when A starts |
| `finish_to_finish` | B finishes when A finishes |
| `start_to_finish` | B finishes when A starts (rare) |

The compiler validates dependency references and detects circular dependencies.

## Auto-Computed Fields

The compiler automatically computes:
- **`assignedEntityIds`** — All entities that reference this package via `constructionPackageId`
- **`costSummary`** — Aggregated costs from assigned entities

## Migration from Inline Packages

In v1.0, construction packages were defined inline as `project.constructionPackages[]`. In v1.1, they are first-class entities. The compiler auto-migrates inline packages to standalone entities with `_migrated: true`.

## Example

See the Green Terrace example: [Structure](/en/examples/green-terrace/construction-packages/cp-structure), [Envelope](/en/examples/green-terrace/construction-packages/cp-envelope), [MEP](/en/examples/green-terrace/construction-packages/cp-mep), [Finishes](/en/examples/green-terrace/construction-packages/cp-finishes)
