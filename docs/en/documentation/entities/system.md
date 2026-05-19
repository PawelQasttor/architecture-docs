# System (MEP Systems Documentation)

## What This Is

A **System** file documents one MEP system (HVAC, electrical, plumbing, fire safety). Examples: "HVAC System 01 serving north bedrooms", "Electrical distribution panel 1A".

::: tip For Architects
**Problem:** MEP consultant asks "What rooms does the HVAC system serve?" or "What's the cooling capacity for the north zone?"

**Old way:** Hunt through MEP drawings, check room schedules, email back and forth with MEP engineer.

**With systems:** Open `systems/sys-hvac-01.md` — it lists all served rooms, capacities, requirements. **MEP coordination in one file.**

**One system file = all served rooms, equipment, and requirements automatically tracked.**
:::

A **System** represents a building technical system (HVAC, electrical, plumbing, fire safety) that contains and coordinates multiple asset instances. Systems enable lifecycle management, energy analysis, and operational monitoring.

## Purpose

Systems define:
- MEP system hierarchies (AHUs, distribution, terminals)
- System-level performance requirements
- Energy consumption targets
- Maintenance coordination across assets
- BMS integration points

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique system identifier | `"SYS-HVAC-01"` |
| `entityType` | string | Must be `"system"` | `"system"` |
| `documentType` | string | Must be `"system"` | `"system"` |
| `systemName` | string | Human-readable name | `"HVAC System 01 - North Zone"` |
| `systemCategory` | string | System category (see enum below) | `"hvac"` |
| `buildingId` | string | Parent building ID | `"BLD-01"` |
| `version` | string | Semantic version | `"1.0.0"` |

::: tip For Architects: What These Required Fields Mean
- **id**: System identifier (e.g., `SYS-HVAC-01`)
- **systemName**: What you call it ("HVAC System North Zone", "Electrical Panel 1A")
- **systemCategory**: Type — `hvac`, `electrical`, `plumbing`, `fire_safety`
- **buildingId**: Which building
- **version**: Track changes

**You only NEED these 5 fields.** The system automatically tracks which rooms and equipment this system serves (you don't manually list them).
:::

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `systemTypeId` | string | Reference to system_type for template properties |
| `assetIds` | array | Asset IDs (auto-computed) |
| `servedZoneIds` | array | Zone IDs served by this system |
| `servedSpaceIds` | array | Space IDs served by this system |
| `systemType` | string | Specific system type (e.g., "variable_air_volume") |
| `requirementOverrides` | array | Additional requirements beyond system type |
| `performance` | object | Instance-specific performance data (overrides type) |
| `capacity` | object | System capacity (cooling, heating, power) |
| `efficiency` | object | Efficiency ratings (COP, SEER, EER) |
| `energySource` | string | Primary energy source |
| `controlStrategy` | string | Control approach (BMS, local, manual) |
| `maintenanceSchedule` | object | System-level maintenance plan |
| `designCriteria` | object | Design parameters and targets |
| `parentSystemId` | string | **[v0.6]** Reference to parent system for hierarchical decomposition |
| `subsystemIds` | array | **[v0.6]** Auto-computed: child system IDs |
| `constructionPackageId` | string | **[v0.6]** Reference to construction work package |
| `requirements` | array | Requirement IDs applicable to system |
| `ifcMapping` | object | IFC mapping |
| `tags` | array | Free-form classification tags |

::: tip For Architects: Which Optional Fields Matter Most?

**For MEP coordination (most important):**
- **servedZoneIds** — Which zones/fire zones this system serves
- **servedSpaceIds** — Which rooms this system serves
- **capacity** — System capacity (cooling/heating kW, electrical kW, water flow L/min)
- **requirements** — Performance requirements this system must meet

**For permit/energy compliance:**
- **efficiency** — COP, SEER, EER ratings for HVAC
- **energySource** — What powers it (electricity, gas, solar)
- **designCriteria** — Design parameters (air change rate, temperature setpoints)

**For facilities management:**
- **maintenanceSchedule** — When to service equipment
- **controlStrategy** — How it's controlled (BMS, local, manual)

**Note:** `assetIds` is **automatically computed**. You don't list equipment here — equipment lists the system, and the system tracks the reverse relationship.
:::

---

## System Hierarchies

::: tip Introduced in SBM v0.6.0
Break complex systems into parent-child hierarchies for better organization and automatic cost/performance rollup.
:::

### Why Use System Hierarchies?

Large systems are often composed of subsystems. Example: A central HVAC system has separate heating, cooling, and ventilation subsystems.

**Without hierarchy:**
- All subsystems are flat, no relationship shown
- Cost and performance data scattered
- Hard to understand system composition

**With hierarchy:**
- Parent system aggregates child costs/performance
- Clear organizational structure
- Easier maintenance planning

### How It Works

**You define**: Child systems reference their parent via `parentSystemId`

**Compiler computes**: Parent system's `subsystemIds` array is auto-populated

### Example: Multi-Level HVAC System

```
SYS-HVAC-01 (Central HVAC System)
  ├─ SYS-HVAC-01-HEATING (Heating Subsystem)
  │    ├─ AST-HP-01 (Heat Pump)
  │    └─ AST-UFH-MANIFOLD-01 (Underfloor Heating Manifold)
  │
  └─ SYS-HVAC-01-VENT (Ventilation Subsystem)
       └─ AST-MVHR-01 (MVHR Unit)
```

### File Structure

#### Parent System

```yaml
# systems/sys-hvac-01.md
---
id: "SYS-HVAC-01"
systemName: "Central HVAC System"
systemCategory: "hvac"
buildingId: "BLD-01"

# No parentSystemId (this is the top level)
# subsystemIds is auto-computed by compiler

cost:
  design: 85000  # Total for entire HVAC
  actual: 87500

capacity:
  heatingCapacityKW: 12
  coolingCapacityKW: 10
  ventilationRateM3h: 450
---

# Central HVAC System

Integrated heating, cooling, and ventilation for the entire building.

## Subsystems

See:
- [Heating Subsystem](./sys-hvac-01-heating.md)
- [Ventilation Subsystem](./sys-hvac-01-vent.md)
```

#### Child System 1: Heating

```yaml
# systems/sys-hvac-01-heating.md
---
id: "SYS-HVAC-01-HEATING"
systemName: "Heating Subsystem"
systemCategory: "hvac"
buildingId: "BLD-01"

parentSystemId: "SYS-HVAC-01"  # ← References parent

cost:
  design: 45000
  actual: 46500

capacity:
  heatingCapacityKW: 12
---

# Heating Subsystem

Air-to-water heat pump with underfloor heating distribution.

## Assets

- [Heat Pump HP-01](../assets/ai-hp-01.md)
- [UFH Manifold](../assets/ai-ufh-manifold-01.md)
```

#### Child System 2: Ventilation

```yaml
# systems/sys-hvac-01-vent.md
---
id: "SYS-HVAC-01-VENT"
systemName: "Ventilation Subsystem"
systemCategory: "hvac"
buildingId: "BLD-01"

parentSystemId: "SYS-HVAC-01"  # ← References parent

cost:
  design: 40000
  actual: 41000

capacity:
  ventilationRateM3h: 450
  heatRecoveryEfficiency: 0.92
---

# Ventilation Subsystem

Mechanical ventilation with heat recovery (MVHR).

## Assets

- [MVHR Unit](../assets/ai-mvhr-01.md)
```

### Compiler Output (Auto-Computed Relationships)

After compilation, the parent system's `subsystemIds` is populated:

```json
{
  "id": "SYS-HVAC-01",
  "systemName": "Central HVAC System",
  "subsystemIds": [
    "SYS-HVAC-01-HEATING",  // ← Compiler found this child
    "SYS-HVAC-01-VENT"      // ← Compiler found this child
  ],
  "cost": {
    "design": 85000,
    "actual": 87500,
    "_rollup": {
      "subsystemsDesign": 85000,  // 45000 + 40000
      "subsystemsActual": 87500   // 46500 + 41000
    }
  }
}
```

### Cost and Performance Rollup

The compiler **automatically aggregates** costs and performance from child systems to parent:

| Metric | Heating | Ventilation | Parent (Rollup) |
|--------|---------|-------------|-----------------|
| Design Cost | €45,000 | €40,000 | **€85,000** |
| Actual Cost | €46,500 | €41,000 | **€87,500** |
| Heating Capacity | 12 kW | — | **12 kW** |
| Ventilation Rate | — | 450 m³/h | **450 m³/h** |

**Result**: Update a child system's cost → parent's rolled-up total updates automatically.

### Use Cases

#### Use Case 1: Large Building with Multiple HVAC Zones

```
SYS-HVAC (Building-Wide)
  ├─ SYS-HVAC-NORTH (North Zone)
  ├─ SYS-HVAC-SOUTH (South Zone)
  └─ SYS-HVAC-CORE (Core Zone)
```

#### Use Case 2: Electrical System by Floor

```
SYS-ELEC (Main Distribution)
  ├─ SYS-ELEC-L01 (Level 01 Distribution)
  ├─ SYS-ELEC-L02 (Level 02 Distribution)
  └─ SYS-ELEC-L03 (Level 03 Distribution)
```

#### Use Case 3: Plumbing with Hot/Cold/Drainage

```
SYS-PLUMB (Plumbing System)
  ├─ SYS-PLUMB-COLD (Cold Water)
  ├─ SYS-PLUMB-HOT (Hot Water)
  └─ SYS-PLUMB-DRAIN (Drainage)
```

### When to Use Hierarchies

| Scenario | Use Hierarchy? | Why? |
|----------|----------------|------|
| **Simple system (1 boiler, 1 set of radiators)** | ❌ No | One system file is enough |
| **Multi-zone HVAC (3 air handlers)** | ✅ Yes | Each zone is a subsystem |
| **Building-wide electrical (multiple panels)** | ✅ Yes | Main panel → sub-panels → circuits |
| **Complex facility (hospital, airport)** | ✅ Yes | Central plant → distribution → zones |

**Rule of thumb**: If you have 3+ related systems that share costs/performance, use hierarchy.

### Validation

The compiler checks:
- ✅ `parentSystemId` references an existing system
- ✅ No circular references (A → B → A)
- ✅ Hierarchy depth < 10 levels (performance limit)
- ❌ Error if orphan systems reference non-existent parents

### Troubleshooting

**Problem:** "My parent system has no subsystemIds"

**Checklist:**
1. ✅ Do child systems specify `parentSystemId`?
2. ✅ Is the parent system ID exactly correct? (case-sensitive)
3. ✅ Did you run the compiler? (`npm run compile`)

**Problem:** "Cost rollup doesn't match"

**Checklist:**
1. ✅ Do all child systems have `cost.design` and `cost.actual`?
2. ✅ Are costs numeric (not strings)?
3. ✅ Check compiler output for rollup warnings

---

## System Categories (Enum)

```typescript
type SystemCategory =
  | "hvac"              // Heating, ventilation, air conditioning
  | "electrical"        // Power distribution, lighting
  | "plumbing"          // Domestic water, drainage
  | "fire_safety"       // Fire alarm, suppression, smoke control
  | "security"          // Access control, surveillance, intrusion detection
  | "lighting"          // Lighting control systems
  | "communications"    // Data, voice, audio-visual
  | "vertical_transport" // Elevators, escalators
  | "renewable_energy"  // Solar PV, wind, geothermal
  // v0.3.0 additions:
  | "medical_gas"       // Medical gas distribution (O2, N2O, vacuum, compressed air)
  | "nurse_call"        // Nurse call and patient alert systems
  | "pneumatic_tube"    // Pneumatic tube transport systems
  | "medical_waste"     // Medical waste collection and disposal systems
  | "it_network";       // IT network infrastructure (structured cabling, Wi-Fi, servers)
```

### Healthcare & Infrastructure System Categories (v0.3.0)

| Category | Purpose | Typical Components |
|----------|---------|-------------------|
| `medical_gas` | Medical gas distribution for patient care | O2 outlets, vacuum outlets, N2O manifolds, AGSS, zone valves |
| `nurse_call` | Patient-staff communication and alerts | Call stations, corridor lights, staff terminals, integration with BMS |
| `pneumatic_tube` | Automated transport of samples and medications | Stations, blowers, diverters, carrier sensors |
| `medical_waste` | Safe collection and disposal of clinical waste | Sharps containers, segregation bins, autoclaves, collection points |
| `it_network` | Data network infrastructure | Patch panels, switches, Wi-Fi APs, server racks, UPS |

## Example 1: Your First System File (Minimal)

**The simplest HVAC system for MEP coordination:**

::: code-group

```markdown [Markdown]
File: systems/sys-hvac-01.md

---
id: "SYS-HVAC-01"
entityType: "system"
documentType: "system"
systemName: "HVAC System North Zone"
systemCategory: "hvac"
buildingId: "BLD-01"
version: "1.0.0"

# For MEP coordination
servedZoneIds:
  - "ZONE-HVAC-NORTH"
capacity:
  cooling: 85
  heating: 75
  unit: "kW"
---

# HVAC System North Zone

Heat pump system serving north zone bedrooms and living rooms.
```

```yaml [YAML]
id: "SYS-HVAC-01"
entityType: "system"
documentType: "system"
systemName: "HVAC System North Zone"
systemCategory: "hvac"
buildingId: "BLD-01"
version: "1.0.0"
servedZoneIds:
  - "ZONE-HVAC-NORTH"
capacity:
  cooling: 85
  heating: 75
  unit: "kW"
```

```json [JSON]
{
  "id": "SYS-HVAC-01",
  "entityType": "system",
  "documentType": "system",
  "systemName": "HVAC System North Zone",
  "systemCategory": "hvac",
  "buildingId": "BLD-01",
  "version": "1.0.0",
  "servedZoneIds": [
    "ZONE-HVAC-NORTH"
  ],
  "capacity": {
    "cooling": 85,
    "heating": 75,
    "unit": "kW"
  }
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "systemName", "systemCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^SYS-[A-Z0-9-]+$" },
    "entityType": { "const": "system" },
    "systemName": { "type": "string" },
    "systemCategory": {
      "type": "string",
      "enum": ["hvac", "electrical", "plumbing", "fire_safety", "security", "lighting", "communications", "vertical_transport", "renewable_energy", "medical_gas", "nurse_call", "pneumatic_tube", "medical_waste", "it_network"]
    },
    "buildingId": { "type": "string" },
    "servedZoneIds": { "type": "array" },
    "capacity": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

**That's it.** When equipment references `SYS-HVAC-01`, it automatically appears in this system's equipment list.

---

## Example 2: Complete System (Full Details)

**File:** `docs/en/examples/green-terrace/systems/sys-hvac-01.md`

::: code-group

```markdown [Markdown]
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"
systemType: "variable_air_volume"
buildingId: "BLD-01"

servedZoneIds:
  - "ZONE-HVAC-NORTH"

capacity:
  cooling: 85
  heating: 75
  unit: "kW"

efficiency:
  cooling_cop: 3.2
  heating_cop: 3.8
  seer: 16.5

energySource: "electricity_heat_pump"
controlStrategy: "bms_ddc"

designCriteria:
  outdoorAirRate: 30
  outdoorAirRateUnit: "m3/h/person"
  minFreshAir: 0.5
  minFreshAirUnit: "ACH"
  supplyAirTemp: 16
  supplyAirTempUnit: "°C"

maintenanceSchedule:
  filterReplacement: "quarterly"
  annualInspection: true
  predictiveMaintenance: true

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC-001"

ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "1N2eH8$qKAxt2WxDu1LNyP"
  objectType: "HVAC"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
  - "variable_air_volume"
  - "energy_efficient"
---

# HVAC System 01: North Zone

Variable air volume (VAV) heat pump system serving north zone residential spaces.

## System Description

- **Type:** VAV with heat pump
- **Cooling capacity:** 85 kW
- **Heating capacity:** 75 kW
- **Efficiency:** SEER 16.5, COP 3.2 (cooling) / 3.8 (heating)
- **Energy source:** Air-source heat pump

## Served Areas

- Zone: HVAC-NORTH
- Spaces: Bedrooms, living rooms (north-facing)
- Total floor area: 450 m²
- Design occupancy: 180 people (peak)

## Distribution

- **Air handling unit:** AHU-01 (rooftop)
- **VAV boxes:** 12 terminal units with reheat
- **Ductwork:** Galvanized steel, insulated
- **Controls:** BACnet DDC via central BMS

## Maintenance

- Filter replacement: Quarterly
- Annual inspection: Full system performance test
- Predictive maintenance: Vibration monitoring on compressors
```

```yaml [YAML]
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"
systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"
systemType: "variable_air_volume"
buildingId: "BLD-01"
servedZoneIds:
  - "ZONE-HVAC-NORTH"
capacity:
  cooling: 85
  heating: 75
  unit: "kW"
efficiency:
  cooling_cop: 3.2
  heating_cop: 3.8
  seer: 16.5
energySource: "electricity_heat_pump"
controlStrategy: "bms_ddc"
designCriteria:
  outdoorAirRate: 30
  outdoorAirRateUnit: "m3/h/person"
  minFreshAir: 0.5
  minFreshAirUnit: "ACH"
  supplyAirTemp: 16
  supplyAirTempUnit: "°C"
maintenanceSchedule:
  filterReplacement: "quarterly"
  annualInspection: true
  predictiveMaintenance: true
requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC-001"
ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "1N2eH8$qKAxt2WxDu1LNyP"
  objectType: "HVAC"
version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
  - "variable_air_volume"
  - "energy_efficient"
```

```json [JSON]
{
  "documentType": "system",
  "entityType": "system",
  "id": "SYS-HVAC-01",
  "projectPhase": "design_development",
  "bimLOD": "LOD_300",
  "systemName": "HVAC System 01 - North Zone",
  "systemCategory": "hvac",
  "systemType": "variable_air_volume",
  "buildingId": "BLD-01",
  "servedZoneIds": [
    "ZONE-HVAC-NORTH"
  ],
  "capacity": {
    "cooling": 85,
    "heating": 75,
    "unit": "kW"
  },
  "efficiency": {
    "cooling_cop": 3.2,
    "heating_cop": 3.8,
    "seer": 16.5
  },
  "energySource": "electricity_heat_pump",
  "controlStrategy": "bms_ddc",
  "designCriteria": {
    "outdoorAirRate": 30,
    "outdoorAirRateUnit": "m3/h/person",
    "minFreshAir": 0.5,
    "minFreshAirUnit": "ACH",
    "supplyAirTemp": 16,
    "supplyAirTempUnit": "°C"
  },
  "maintenanceSchedule": {
    "filterReplacement": "quarterly",
    "annualInspection": true,
    "predictiveMaintenance": true
  },
  "requirements": [
    "REQ-VENTILATION-OCCUPIED-001",
    "REQ-THERMAL-COMFORT-001",
    "REQ-ENERGY-EFFICIENCY-HVAC-001"
  ],
  "ifcMapping": {
    "ifcEntity": "IfcSystem",
    "globalId": "1N2eH8$qKAxt2WxDu1LNyP",
    "objectType": "HVAC"
  },
  "version": "1.0.0",
  "tags": [
    "hvac",
    "heat_pump",
    "variable_air_volume",
    "energy_efficient"
  ]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "systemName", "systemCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^SYS-[A-Z0-9-]+$" },
    "entityType": { "const": "system" },
    "systemName": { "type": "string" },
    "systemCategory": {
      "type": "string",
      "enum": ["hvac", "electrical", "plumbing", "fire_safety", "security", "lighting", "communications", "vertical_transport", "renewable_energy", "medical_gas", "nurse_call", "pneumatic_tube", "medical_waste", "it_network"]
    },
    "systemTypeId": { "type": "string" },
    "buildingId": { "type": "string" },
    "servedZoneIds": { "type": "array" },
    "servedSpaceIds": { "type": "array" },
    "performance": { "type": "object" },
    "cost": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

## Example: Compiled JSON

**Output:** `build/green-terrace/sbm.json` (excerpt)

```json
{
  "entities": {
    "systems": [
      {
        "documentType": "system",
        "entityType": "system",
        "id": "SYS-HVAC-01",
        "systemName": "HVAC System 01 - North Zone",
        "systemCategory": "hvac",
        "systemType": "variable_air_volume",
        "buildingId": "BLD-01",
        "servedZoneIds": ["ZONE-HVAC-NORTH"],
        "capacity": {
          "cooling": 85,
          "heating": 75,
          "unit": "kW"
        },
        "efficiency": {
          "cooling_cop": 3.2,
          "heating_cop": 3.8,
          "seer": 16.5
        },
        "energySource": "electricity_heat_pump",
        "controlStrategy": "bms_ddc",
        "designCriteria": {
          "outdoorAirRate": 30,
          "outdoorAirRateUnit": "m3/h/person",
          "minFreshAir": 0.5,
          "minFreshAirUnit": "ACH",
          "supplyAirTemp": 16,
          "supplyAirTempUnit": "°C"
        },
        "maintenanceSchedule": {
          "filterReplacement": "quarterly",
          "annualInspection": true,
          "predictiveMaintenance": true
        },
        "requirements": [
          "REQ-VENTILATION-OCCUPIED-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-ENERGY-EFFICIENCY-HVAC-001"
        ],
        "assetIds": [
          "AST-AHU-01",
          "AST-VAV-NORTH-01",
          "AST-VAV-NORTH-02",
          "AST-VAV-NORTH-03"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcSystem",
          "globalId": "1N2eH8$qKAxt2WxDu1LNyP",
          "objectType": "HVAC"
        },
        "version": "1.0.0",
        "tags": ["hvac", "heat_pump", "variable_air_volume", "energy_efficient"]
      }
    ]
  }
}
```

## Reverse Relationships

The compiler **auto-computes** `system.assetIds` from asset references:

**Input:** Assets reference systems
```yaml
# ai-ahu-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-02.md
systemId: "SYS-HVAC-01"
```

**Output:** System automatically contains asset list
```json
{
  "id": "SYS-HVAC-01",
  "assetIds": [
    "AST-AHU-01",
    "AST-VAV-NORTH-01",
    "AST-VAV-NORTH-02"
  ]
}
```

## Type/Instance Pattern

Systems can reference **System Types** to inherit standard components, performance characteristics, and requirements:

**System Type (Template):**
```yaml
# hvac-residential-mvhr-type.md
---
id: "SYT-HVAC-RESIDENTIAL-MVHR"
entityType: "system_type"
typeName: "Residential HVAC - MVHR + Heat Pump"
systemCategory: "hvac"
requirements:
  - "REQ-HVAC-VENTILATION-RATE"
  - "REQ-HVAC-HEAT-RECOVERY"
  - "REQ-ENERGY-EFFICIENCY-HVAC"
components:
  - category: "air_handling"
    description: "MVHR unit"
    specification: "90% heat recovery efficiency"
  - category: "heating"
    description: "Air-to-water heat pump"
    specification: "12 kW, COP 4.2"
typicalPerformance:
  heatingCapacity: "12 kW"
  heatRecovery: "90%"
  copHeating: 4.2
---
```

**System Instance (References Type):**

::: code-group

```yaml [Markdown]
# sys-hvac-01.md
---
id: "SYS-HVAC-01"
entityType: "system"
systemName: "HVAC System Building 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"  # Inherits components & performance
systemCategory: "hvac"
buildingId: "BLD-01"

# Instance-specific data
servedZoneIds: ["ZONE-HVAC-NORTH"]
assetIds: ["AST-MVHR-01", "AST-HP-01"]
performance:
  measuredCOP: 4.3  # Override: actual measured performance
---
```

```yaml [YAML]
id: "SYS-HVAC-01"
entityType: "system"
systemName: "HVAC System Building 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"
systemCategory: "hvac"
buildingId: "BLD-01"
servedZoneIds: ["ZONE-HVAC-NORTH"]
assetIds: ["AST-MVHR-01", "AST-HP-01"]
performance:
  measuredCOP: 4.3
```

```json [JSON]
{
  "id": "SYS-HVAC-01",
  "entityType": "system",
  "systemName": "HVAC System Building 01",
  "systemTypeId": "SYT-HVAC-RESIDENTIAL-MVHR",
  "systemCategory": "hvac",
  "buildingId": "BLD-01",
  "servedZoneIds": ["ZONE-HVAC-NORTH"],
  "assetIds": ["AST-MVHR-01", "AST-HP-01"],
  "performance": {
    "measuredCOP": 4.3
  }
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "systemName", "systemCategory", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^SYS-[A-Z0-9-]+$" },
    "entityType": { "const": "system" },
    "systemName": { "type": "string" },
    "systemTypeId": { "type": "string" },
    "systemCategory": {
      "type": "string",
      "enum": ["hvac", "electrical", "plumbing", "fire_safety", "security", "lighting", "communications", "vertical_transport", "renewable_energy", "medical_gas", "nurse_call", "pneumatic_tube", "medical_waste", "it_network"]
    },
    "buildingId": { "type": "string" },
    "parentSystemId": { "type": "string" },
    "subsystemIds": { "type": "array" },
    "servedZoneIds": { "type": "array" },
    "servedSpaceIds": { "type": "array" },
    "performance": { "type": "object" },
    "cost": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

**Compiled Output:**
```json
{
  "id": "SYS-HVAC-01",
  "systemName": "HVAC System Building 01",
  "systemCategory": "hvac",
  "requirements": [
    "REQ-HVAC-VENTILATION-RATE",      // From type
    "REQ-HVAC-HEAT-RECOVERY",          // From type
    "REQ-ENERGY-EFFICIENCY-HVAC"       // From type
  ],
  "components": [                       // From type
    {"category": "air_handling", "description": "MVHR unit"},
    {"category": "heating", "description": "Air-to-water heat pump"}
  ],
  "performance": {
    "heatingCapacity": "12 kW",        // From type
    "heatRecovery": "90%",             // From type
    "measuredCOP": 4.3                 // Instance override
  },
  "assetIds": ["AST-MVHR-01", "AST-HP-01"]  // Instance-specific
}
```

**Benefits:**
- Define system configuration once (SYT-HVAC-RESIDENTIAL-MVHR)
- Reuse across multiple buildings with same system type
- Update type → all instances inherit changes
- Reduce documentation by 50-90% for repeating systems

See [System Type](/en/documentation/entities/system-type) for complete documentation.

## BIM Mapping

Systems map to **IfcSystem** entities and Revit MEP Systems:

| SBM Field | Revit Parameter | IFC Property |
|-----------|-----------------|--------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_System.SBM_ID` |
| `systemName` | `System Name` | `Name` |
| `systemCategory` | `System Classification` | `Pset_SBM_System.Category` |
| `systemType` | `System Type` | `Pset_SBM_System.SystemType` |
| `capacity` | `SBM_Capacity` | `Pset_SBM_System.Capacity` |
| `efficiency` | `SBM_Efficiency` | `Pset_SBM_System.Efficiency` |
| `energySource` | `SBM_Energy_Source` | `Pset_SBM_System.EnergySource` |

## System Categories by Discipline

### HVAC Systems
- **Types:** VAV, CAV, fan coil, radiant, VRF, heat pump
- **Capacity:** Cooling/heating in kW or tons
- **Efficiency:** COP, SEER, EER, AFUE
- **Standards:** EN 16798-1, ASHRAE 90.1, WT 2021 § 328

### Electrical Systems
- **Types:** Main distribution, lighting control, emergency power
- **Capacity:** Power in kW or kVA
- **Voltage:** 230V, 400V, etc.
- **Standards:** IEC 60364, NEC, WT 2021 § 192

### Plumbing Systems
- **Types:** Domestic hot water, cold water, drainage, rainwater
- **Capacity:** Flow rates in L/min or m³/h
- **Pressure:** Operating pressure in bar or PSI
- **Standards:** EN 806, WT 2021 § 145

### Fire Safety Systems
- **Types:** Fire alarm, sprinkler, smoke control, fire suppression
- **Coverage:** Detection zones, sprinkler zones
- **Standards:** EN 54, NFPA, WT 2021 § 234-235

### Medical Gas Systems (v0.3.0)
- **Types:** Oxygen, nitrous oxide, medical air, vacuum, AGSS
- **Components:** Zone valve assemblies, manifolds, outlets, alarms
- **Standards:** HTM 02-01 (UK), EN ISO 7396-1 (EU), NFPA 99 (US)

### Nurse Call Systems (v0.3.0)
- **Types:** Patient call, staff emergency, bathroom pull cord, bed exit
- **Components:** Call stations, corridor displays, staff terminals, integration
- **Standards:** HTM 08-03 (UK), EN 50134, VDE 0834 (DE)

### Pneumatic Tube Systems (v0.3.0)
- **Types:** Sample transport, pharmacy delivery, document transfer
- **Components:** Stations, blowers, diverters, carrier detection sensors
- **Capacity:** Carrier diameter (110-160mm), speed (5-8 m/s), throughput

### Medical Waste Systems (v0.3.0)
- **Types:** Sharps disposal, clinical waste, pharmaceutical waste, cytotoxic
- **Components:** Segregation bins, collection trolleys, autoclaves, compactors
- **Standards:** Directive 2008/98/EC, national clinical waste regulations

### IT Network Systems (v0.3.0)
- **Types:** Structured cabling, Wi-Fi, server infrastructure, PACS
- **Components:** Patch panels, switches, Wi-Fi APs, server racks, UPS
- **Standards:** EN 50173, TIA-942 (data centers), HIPAA (healthcare IT)

## Asset Register Integration

Systems aggregate asset data for facilities management:

```json
{
  "systemSummary": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "totalAssets": 15,
      "assetBreakdown": {
        "ahu": 1,
        "vav_box": 12,
        "pump": 2
      },
      "maintenanceCalendar": [
        {
          "taskType": "filter_replacement",
          "frequency": "quarterly",
          "affectedAssets": ["AST-AHU-01"],
          "nextDue": "2026-04-01"
        },
        {
          "taskType": "annual_inspection",
          "frequency": "yearly",
          "affectedAssets": ["AST-AHU-01", "AST-VAV-NORTH-*"],
          "nextDue": "2026-06-15"
        }
      ],
      "totalMaintenanceCost": {
        "annual": 4500,
        "currency": "PLN"
      }
    }
  ]
}
```

## Digital Twin Integration

Systems enable aggregated monitoring and control:

```json
{
  "systemMonitoring": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "bmsIntegration": {
        "protocol": "BACnet",
        "deviceId": "BACnet:201",
        "objectIdentifier": "device,201"
      },
      "kpis": [
        {
          "metric": "system_cop",
          "dataPoints": [
            "AI-AHU-01-POWER-IN",
            "AI-AHU-01-COOLING-OUT",
            "AI-AHU-01-HEATING-OUT"
          ],
          "calculation": "(cooling_out + heating_out) / power_in",
          "target": 3.2,
          "currentValue": 3.15
        },
        {
          "metric": "total_energy_consumption",
          "dataPoints": ["AI-AHU-01-ENERGY"],
          "aggregation": "sum",
          "period": "daily",
          "target": 850,
          "targetUnit": "kWh/day"
        }
      ],
      "alarms": [
        {
          "alarmId": "SYS-HVAC-01-LOW-COP",
          "condition": "system_cop < 2.5",
          "severity": "warning",
          "action": "notify_facilities_team"
        }
      ]
    }
  ]
}
```

## Energy Analysis

Systems with capacity and efficiency data enable energy modeling:

```json
{
  "energyModel": {
    "systemId": "SYS-HVAC-01",
    "annualEnergyUse": {
      "cooling": 45000,
      "heating": 38000,
      "fans": 12000,
      "total": 95000,
      "unit": "kWh/year"
    },
    "peakDemand": {
      "cooling": 85,
      "heating": 75,
      "unit": "kW"
    },
    "operatingHours": {
      "cooling": 1500,
      "heating": 2200,
      "unit": "hours/year"
    },
    "energyCost": {
      "annual": 38000,
      "currency": "PLN"
    }
  }
}
```

## System Hierarchy (v0.6)

Systems can be decomposed into parent/child hierarchies using `parentSystemId`. The compiler auto-computes `subsystemIds` as the reverse relationship.

**Key rules:**
- `parentSystemId` references a parent system (e.g., HVAC → Heating, Ventilation)
- `subsystemIds` is auto-computed (lists children)
- Cost rollup: assets → leaf systems → parent systems → project (no double-counting)
- Only **root systems** (no `parentSystemId`) contribute to project-level cost aggregation
- Circular hierarchies are detected and reported as errors

```yaml
# Parent system (root)
---
entityType: "system"
id: "SYS-HVAC-01"
systemName: "HVAC System Building 01"
# subsystemIds auto-computed: ["SYS-HVAC-01-HEATING", "SYS-HVAC-01-VENT"]
---

# Child system (subsystem)
---
entityType: "system"
id: "SYS-HVAC-01-HEATING"
systemName: "Heating Subsystem"
parentSystemId: "SYS-HVAC-01"
assetIds:
  - "AST-HP-01"
  - "AST-UFH-MANIFOLD-01"
---
```

## Construction Phasing (v0.6)

Systems can be tagged with a `constructionPackageId` to associate them with a construction work package:

```yaml
constructionPackageId: "CP-MEP"
```

## See Also

- **[Asset](/en/documentation/entities/asset)** - Assets belong to systems
- **[Zone](/en/documentation/entities/zone)** - Systems serve zones
- **[Compiler Guide](/en/documentation/compiler/)** - System maintenance planning and monitoring
