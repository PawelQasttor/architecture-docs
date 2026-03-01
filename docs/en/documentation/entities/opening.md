# Opening (Window / Door / Skylight)

## What This Is

An **Opening** file describes a single window, door, skylight, vent, or access panel within an envelope element. Openings were promoted from inline arrays in envelope files to first-class entities in v1.1.

::: tip For Architects
**Problem:** Window schedules, door schedules, and fire door inspections live in separate spreadsheets. When the fire officer asks "Which doors are EI 30 and when were they last inspected?" you're hunting through multiple documents.

**Old way:** Window schedule in Excel, door schedule in another Excel, fire door certs in a folder, U-values in the energy calculation.

**With openings:** One file per opening. Thermal, acoustic, fire performance, hardware, accessibility, maintenance — all in one place. The compiler links it to its envelope, level, and spaces.

**One opening file = complete window/door specification with maintenance tracking.**
:::

## Purpose

Openings define:
- Classification (window, door, rooflight, vent, etc.)
- Dimensions and position (width, height, sill height, orientation)
- Thermal performance (U-value, g-value)
- Acoustic performance (Rw)
- Fire performance (fire rating, smoke control, self-closing)
- Hardware specification (hinges, locks, closers, threshold)
- Accessibility data (clear width, threshold height, closing force)
- Maintenance and warranty tracking
- IFC mapping (IfcWindow, IfcDoor, IfcOpeningElement)

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique opening ID (`OPN-` prefix) | `"OPN-WIN-N-001"` |
| `entityType` | string | Must be `"opening"` | `"opening"` |
| `openingName` | string | Human-readable name | `"North Bedroom Window 01"` |
| `openingCategory` | string | Classification (see categories) | `"window"` |
| `envelopeId` | string | Parent envelope element | `"ENV-EW-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `openingTypeId` | string | Reference to opening_type for inherited specs |
| `levelId` | string | Level where this opening is located |
| `spaceIds` | array | Spaces accessed (1 for external, 2 for internal) |
| `dimensions` | object | Width, height, area |
| `sillHeight` | number | Sill height from floor finish in mm |
| `orientation` | string | Compass direction (N, NE, E, etc.) |
| `frameMaterial` | string | Frame material (pvc, aluminium, timber, steel, composite) |
| `glazingType` | string | Glazing type (single, double, triple, none) |
| `operability` | string | Operation type (fixed, tilt_turn, casement, etc.) |
| `thermalPerformance` | object | U-value, g-value |
| `acousticPerformance` | object | Rw, test certificate |
| `firePerformance` | object | Fire rating, smoke control, self-closing |
| `hardware` | object | Hinges, locks, closers, threshold |
| `accessibilityData` | object | Clear width, threshold height, closing force |
| `installationData` | object | Installation date, installer |
| `warranty` | object | Warranty start, end, provider |
| `maintenance` | object | Last service, next service due |
| `constructionPackageId` | string | Construction work package reference |
| `cost` | object | Installed cost |
| `ifcMapping` | object | IFC entity and GlobalId |

## Opening Categories

| Category | IFC Entity | Description |
|----------|-----------|-------------|
| `window` | IfcWindow | Standard windows |
| `door` | IfcDoor | Hinged, sliding doors |
| `glazed_door` | IfcDoor | Fully glazed doors |
| `rooflight` | IfcWindow | Roof-mounted windows |
| `skylight` | IfcWindow | Skylights |
| `vent` | IfcOpeningElement | Ventilation openings |
| `access_panel` | IfcOpeningElement | Service access panels |
| `curtain_wall_panel` | IfcWindow | Curtain wall panels |
| `louvre` | IfcOpeningElement | Louvres |

## Type / Instance Pattern

Define common specifications in an **Opening Type** (`opening_type`) and reference it from instances via `openingTypeId`. Instances inherit type properties but can override any field.

```yaml
# Opening Type (template)
entityType: opening_type
id: OT-INTERNORM-KF410
openingTypeName: "Internorm KF 410"
category: window
thermalPerformance:
  uValue: 0.90
  gValue: 0.50

# Opening Instance
entityType: opening
id: OPN-WIN-N-001
openingName: "North Bedroom Window 01"
openingCategory: window
openingTypeId: "OT-INTERNORM-KF410"
envelopeId: "ENV-EW-01"
dimensions:
  width: 1200
  height: 1500
```

## Safety-Critical: Fire Doors

Openings with `firePerformance` are tracked as **safety-critical** by the quality stage. The compiler flags fire-rated openings with confidence levels below `"measured"`.

```yaml
firePerformance:
  fireRating: "EI 30"
  smokeControl: true
  selfClosing: true
  testCertificate: "FR2024-5678"
firePerformance_meta:
  confidence: "measured"
  source: "FR2024-5678"
```

## Example

See the Green Terrace example: [Window N-001](/en/examples/green-terrace/openings/opn-win-n-001), [Fire Door](/en/examples/green-terrace/openings/opn-door-stair-01)

## Migration from Inline Openings

In v1.0, openings were defined inline within envelope files as `envelope.openings[]`. In v1.1, the compiler auto-migrates inline openings to standalone entities. The inline format is deprecated but still supported.
