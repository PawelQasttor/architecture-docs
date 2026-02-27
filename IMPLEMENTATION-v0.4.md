# SBM v0.4.0 Implementation Plan

## Overview

This document outlines the implementation work required to support SBM v0.4.0 semantic model and BIM integration.

**Total estimated effort**: 18-22 weeks (~4.5-5.5 months)

---

## Phase 1: Schema & Core Compiler (Weeks 1-4)

### **Milestone 1.1: Schema Finalization**
**Duration**: 1 week
**Owner**: Schema designer

**Tasks**:
- [x] Complete JSON schema v0.4.0 (`sbm-schema-v0.4.json`)
- [x] Create example files demonstrating all features
- [x] Write migration guide (v0.3 → v0.4)
- [ ] Review schema with architects for feedback
- [ ] Finalize field names and enumerations
- [ ] Generate JSON Schema documentation

**Deliverables**:
- `schemas/sbm-schema-v0.4.json`
- `examples/v0.4/bedroom-01-complete.md`
- `MIGRATION-v0.3-to-v0.4.md`

### **Milestone 1.2: Compiler Core Updates**
**Duration**: 2 weeks
**Owner**: Compiler developer

**Tasks**:
- [ ] Update parser to handle v0.4 entities (site, space_program)
- [ ] Update validator to validate against v0.4 schema
- [ ] Add backward compatibility (auto-detect v0.3 vs v0.4)
- [ ] Update normalize stage for cost rollup
- [ ] Update quality stage for performance metrics
- [ ] Add version migration utility (auto-upgrade v0.3 → v0.4)

**Code changes**:
```javascript
// scripts/compiler/stages/parse.mjs
export const ENTITY_TYPES = [
  // Existing...
  'site',           // NEW
  'space_program'   // NEW
];

// scripts/compiler/stages/validate.mjs
import schemaV03 from '../../schemas/sbm-schema-v0.3.json';
import schemaV04 from '../../schemas/sbm-schema-v0.4.json';

export function validate(entity) {
  const schema = entity.version === '0.4.0' ? schemaV04 : schemaV03;
  return ajv.validate(schema, entity);
}
```

**Deliverables**:
- Updated `scripts/compiler/stages/parse.mjs`
- Updated `scripts/compiler/stages/validate.mjs`
- Updated `scripts/compiler/stages/normalize.mjs`

### **Milestone 1.3: Testing & Documentation**
**Duration**: 1 week
**Owner**: QA + Documentation

**Tasks**:
- [ ] Update entity documentation (EN + PL) with v0.4 fields
- [ ] Create cost tracking examples
- [ ] Create performance targets examples
- [ ] Create simulation integration examples
- [ ] Update compiler documentation
- [ ] Write test suite for v0.4 entities

**Deliverables**:
- Updated `docs/en/documentation/entities/*.md`
- Updated `docs/pl/dokumentacja/encje/*.md`
- Test suite in `scripts/compiler/tests/v0.4/`

---

## Phase 2: Cost Tracking (Weeks 5-7)

### **Milestone 2.1: Cost Rollup Engine**
**Duration**: 1.5 weeks
**Owner**: Compiler developer

**Tasks**:
- [ ] Implement cost calculation in normalize stage
- [ ] Aggregate space costs → level → building → project
- [ ] Calculate cost from space type if not overridden
- [ ] Handle currency conversions (if needed)
- [ ] Track cost variances (budget vs forecast vs actual)

**Code**:
```javascript
// scripts/compiler/stages/normalize.mjs
export function calculateSpaceCost(space, spaceType) {
  if (space.cost?.override) {
    return space.cost;
  }

  const area = space.designArea;
  const costPerM2 = spaceType.costProfile?.totalCostPerM2 || 0;

  return {
    totalCost: area * costPerM2,
    currency: spaceType.costProfile?.currency || 'EUR',
    basis: 'calculated_from_type',
    breakdown: {
      construction: area * (spaceType.costProfile?.constructionCostPerM2 || 0),
      fitout: area * (spaceType.costProfile?.fitoutCostPerM2 || 0),
      equipment: area * (spaceType.costProfile?.equipmentCostPerM2 || 0)
    }
  };
}
```

**Deliverables**:
- Cost calculation logic in normalize stage
- Cost rollup to project level

### **Milestone 2.2: Cost Reporting Target**
**Duration**: 1.5 weeks
**Owner**: Compiler developer

**Tasks**:
- [ ] Create `scripts/compiler/targets/cost-summary.mjs`
- [ ] Generate cost breakdown by system
- [ ] Generate cost breakdown by level
- [ ] Generate cost breakdown by department
- [ ] Export to Excel (optional)
- [ ] Variance tracking (budget vs forecast vs actual)

**Output format**:
```json
{
  "project": {
    "totalBudget": 5000000,
    "totalForecast": 4940000,
    "totalActual": 0,
    "variance": 60000,
    "status": "under_budget"
  },
  "breakdown": {
    "structure": { "budget": 1800000, "forecast": 1750000, "variance": 50000 },
    "hvac": { "budget": 650000, "forecast": 680000, "variance": -30000 }
  },
  "byLevel": [...]
}
```

**Deliverables**:
- `scripts/compiler/targets/cost-summary.mjs`
- `build/cost-summary.json`
- Optional: `build/cost-summary.xlsx`

---

## Phase 3: BIM Integration (Weeks 8-13)

### **Milestone 3.1: IFC Reading & Validation**
**Duration**: 2 weeks
**Owner**: BIM integration developer

**Tasks**:
- [ ] Install IfcOpenShell Python library
- [ ] Create IFC reader utility (`scripts/ifc-utils/ifc-reader.py`)
- [ ] Extract properties by GlobalId
- [ ] Compare SBM specs vs IFC properties
- [ ] Generate validation report

**Dependencies**:
```bash
pip install ifcopenshell
```

**Code**:
```python
# scripts/ifc-utils/ifc-reader.py
import ifcopenshell

def extract_space_properties(ifc_file, global_id):
    ifc = ifcopenshell.open(ifc_file)
    space = ifc.by_guid(global_id)

    if not space:
        return None

    # Extract properties
    area = get_property(space, "Pset_SpaceCommon", "NetFloorArea")
    height = get_property(space, "Pset_SpaceCommon", "Height")

    return {
        "area": area,
        "height": height,
        "volume": area * height if area and height else None
    }

def get_property(element, pset_name, prop_name):
    for definition in element.IsDefinedBy:
        if definition.is_a('IfcRelDefinesByProperties'):
            pset = definition.RelatingPropertyDefinition
            if pset.Name == pset_name:
                for prop in pset.HasProperties:
                    if prop.Name == prop_name:
                        return prop.NominalValue.wrappedValue
    return None
```

**Deliverables**:
- `scripts/ifc-utils/ifc-reader.py`
- `scripts/compiler/targets/ifc-validator.mjs` (calls Python script)

### **Milestone 3.2: IDS Export**
**Duration**: 2 weeks
**Owner**: BIM integration developer

**Tasks**:
- [ ] Study IDS 1.0 specification
- [ ] Create IDS generator (`scripts/compiler/targets/ids-export.mjs`)
- [ ] Map SBM requirements → IDS applicability + requirements
- [ ] Generate valid IDS XML
- [ ] Test with IfcTester

**Example output** (`build/requirements.ids`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS">
  <ids:specifications>
    <ids:specification name="Minimum room height (WT 2021 §132)" ifcVersion="IFC4">
      <ids:applicability>
        <ids:entity>
          <ids:name><ids:simpleValue>IfcSpace</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property>
          <ids:propertySet><ids:simpleValue>Pset_SpaceCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>Height</ids:simpleValue></ids:baseName>
          <ids:value>
            <xs:restriction>
              <xs:minInclusive value="2.50"/>
            </xs:restriction>
          </ids:value>
        </ids:property>
      </ids:requirements>
    </ids:specification>
  </ids:specifications>
</ids:ids>
```

**Deliverables**:
- `scripts/compiler/targets/ids-export.mjs`
- `build/requirements.ids`

### **Milestone 3.3: BCF Generation**
**Duration**: 1.5 weeks
**Owner**: BIM integration developer

**Tasks**:
- [ ] Study BCF 3.0 specification
- [ ] Create BCF generator (`scripts/compiler/targets/bcf-generator.mjs`)
- [ ] Generate BCF topics from validation issues
- [ ] Link to IFC elements via GlobalId
- [ ] Create BCFzip archive

**Example output** (`build/issues.bcfzip`):
```javascript
// BCF topic for non-compliant space
{
  "guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "title": "Room height below minimum (WT 2021 §132)",
  "description": "Space 'Bedroom 01' has height 2.45m, required minimum 2.50m",
  "priority": "error",
  "topic_type": "code_compliance",
  "reference_links": [{
    "guid": "2O3fG9$rLBxv3VxEu2LPxQ",  // IFC GlobalId
    "type": "ifc_guid"
  }],
  "labels": ["code_violation", "height", "WT_2021"]
}
```

**Deliverables**:
- `scripts/compiler/targets/bcf-generator.mjs`
- `build/issues.bcfzip`

### **Milestone 3.4: CLI Commands**
**Duration**: 1.5 weeks
**Owner**: CLI developer

**Tasks**:
- [ ] Add `sbm validate-ifc` command
- [ ] Add `sbm export --format ids` command
- [ ] Add `sbm export --format bcf` command
- [ ] Update help documentation
- [ ] Add progress indicators

**CLI examples**:
```bash
# Validate IFC
sbm validate-ifc ../bim/model.ifc
> Reading IFC file...
> Validating 23 spaces
> ✅ 21 passed, ⚠️  2 warnings
> Generated: build/ifc-validation-report.json

# Export IDS
sbm export --format ids --output requirements.ids
> Exported 45 requirements to IDS format
> Compatible with: IfcTester, Solibri, BIMcollab

# Export BCF
sbm export --format bcf --output issues.bcfzip
> Generated 2 BCF topics
> Compatible with: Revit, ArchiCAD, BIMcollab
```

**Deliverables**:
- Updated `scripts/compiler/index.mjs` with new commands
- Updated CLI documentation

---

## Phase 4: Simulation Integration (Weeks 14-17)

### **Milestone 4.1: gbXML Export**
**Duration**: 2 weeks
**Owner**: Simulation developer

**Tasks**:
- [ ] Study gbXML schema
- [ ] Create gbXML exporter (`scripts/compiler/targets/gbxml-export.mjs`)
- [ ] Export building geometry (simplified)
- [ ] Export thermal zones
- [ ] Export construction assemblies
- [ ] Export schedules (occupancy, HVAC)
- [ ] Test with EnergyPlus

**Deliverables**:
- `scripts/compiler/targets/gbxml-export.mjs`
- `build/energy-model.xml`

### **Milestone 4.2: Radiance Export**
**Duration**: 1.5 weeks
**Owner**: Simulation developer

**Tasks**:
- [ ] Study Radiance scene format
- [ ] Create Radiance exporter (`scripts/compiler/targets/radiance-export.mjs`)
- [ ] Export room geometry (from outline2D)
- [ ] Export materials with reflectances
- [ ] Export glazing with transmittance
- [ ] Export sky definition

**Deliverables**:
- `scripts/compiler/targets/radiance-export.mjs`
- `build/daylight-scene.rad`

### **Milestone 4.3: Simulation Result Import**
**Duration**: 1.5 weeks
**Owner**: Simulation developer

**Tasks**:
- [ ] Create result importer (`scripts/compiler/simulation-import.mjs`)
- [ ] Parse CSV/JSON results from EnergyPlus
- [ ] Parse CSV/JSON results from DIVA/Radiance
- [ ] Update space.simulations[].results
- [ ] Validate against targets
- [ ] Generate compliance report

**CLI**:
```bash
sbm import-simulation --type energyplus --file bedroom-01.csv
> Imported heating/cooling demand results
> Updated performanceTargets.energyPerformance
> ✅ Heating demand: 42.5 kWh/m²/year (target: 45)
> ✅ COMPLIANT
```

**Deliverables**:
- `scripts/compiler/simulation-import.mjs`
- Updated `build/project.json` with simulation results

---

## Phase 5: Database + CLI (Weeks 18-22)

### **Milestone 5.1: Database Schema**
**Duration**: 1.5 weeks
**Owner**: Database developer

**Tasks**:
- [ ] Design SQLite schema for all entities
- [ ] Create migration script (markdown → SQLite)
- [ ] Create export script (SQLite → markdown)
- [ ] Implement foreign key constraints
- [ ] Add indexes for performance

**Schema**:
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phase TEXT,
  country TEXT,
  total_budget REAL,
  -- ... all project fields
);

CREATE TABLE sites (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  latitude REAL,
  longitude REAL,
  -- ... all site fields
);

CREATE TABLE spaces (
  id TEXT PRIMARY KEY,
  building_id TEXT REFERENCES buildings(id),
  level_id TEXT REFERENCES levels(id),
  space_type_id TEXT REFERENCES space_types(id),
  name TEXT,
  area REAL,
  total_cost REAL,
  -- ... all space fields
);
```

**Deliverables**:
- `database/schema.sql`
- `database/import.mjs` (markdown → SQLite)
- `database/export.mjs` (SQLite → markdown)

### **Milestone 5.2: CLI Foundation**
**Duration**: 2 weeks
**Owner**: CLI developer

**Tasks**:
- [ ] Set up CLI framework (commander.js)
- [ ] Implement CRUD commands (create, list, show, update, delete)
- [ ] Implement query command (SQL passthrough)
- [ ] Implement import/export commands
- [ ] Add table formatting (ASCII tables)

**CLI commands**:
```bash
sbm create space bedroom-03 --area 14.5 --type bedroom
sbm list spaces --filter "area < 12"
sbm show space SP-001
sbm update space SP-001 --cost-per-m2 1200
sbm query "SELECT * FROM spaces WHERE cost > 50000"
```

**Deliverables**:
- `cli/index.js`
- `cli/commands/*.js`

### **Milestone 5.3: AI Agent Integration**
**Duration**: 1.5 weeks
**Owner**: AI integration developer

**Tasks**:
- [ ] Create agent scaffolding (`cli/agents/`)
- [ ] Implement space-planner agent
- [ ] Implement cost-optimizer agent
- [ ] Implement compliance-checker agent
- [ ] Connect agents to database

**CLI commands**:
```bash
sbm agent space-planner "Add 2BR apartment"
sbm agent cost-optimizer "Reduce budget by 10%"
sbm agent compliance-checker "WT 2021"
```

**Deliverables**:
- `cli/agents/space-planner.js`
- `cli/agents/cost-optimizer.js`
- `cli/agents/compliance-checker.js`

---

## Testing & Quality Assurance

### **Test Projects**

1. **Green Terrace** (residential, 21 entities)
   - Migrate to v0.4
   - Add cost tracking
   - Add site entity
   - Run daylighting simulation
   - Validate IFC

2. **Hospital** (healthcare, 404 entities)
   - Migrate to v0.4
   - Add cost tracking
   - Add performance targets
   - Run energy simulation
   - Generate IDS/BCF

### **Test Coverage**

- [ ] Unit tests for all compiler stages
- [ ] Integration tests for IFC validation
- [ ] Integration tests for IDS export
- [ ] Integration tests for BCF generation
- [ ] Integration tests for simulation export/import
- [ ] End-to-end tests for CLI commands
- [ ] Performance tests (1000+ entities)

---

## Documentation Updates

### **English Documentation**
- [ ] Update all entity docs with v0.4 fields
- [ ] Create cost tracking guide
- [ ] Create BIM integration guide
- [ ] Create simulation integration guide
- [ ] Update compiler documentation
- [ ] Update CLI documentation

### **Polish Documentation**
- [ ] Translate all v0.4 field documentation
- [ ] Create cost tracking guide (PL)
- [ ] Create BIM integration guide (PL)
- [ ] Create simulation integration guide (PL)

---

## Milestones Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 1: Schema & Core** | 4 weeks | v0.4 schema, updated compiler, migration guide |
| **Phase 2: Cost Tracking** | 3 weeks | Cost calculation, cost rollup, cost reports |
| **Phase 3: BIM Integration** | 6 weeks | IFC validation, IDS export, BCF generation |
| **Phase 4: Simulation** | 4 weeks | gbXML/Radiance export, result import |
| **Phase 5: Database + CLI** | 5 weeks | SQLite, CLI commands, AI agents |
| **Total** | **22 weeks** | Full v0.4 implementation |

---

## Success Criteria

✅ **Schema complete**: JSON schema v0.4 validates all entities
✅ **Backward compatible**: All v0.3 files compile without errors
✅ **BIM integration**: IFC validation, IDS export, BCF generation work
✅ **Cost tracking**: Project cost rollup calculates correctly
✅ **Simulation**: gbXML/Radiance export + result import work
✅ **Database**: Import/export markdown ↔ SQLite works
✅ **CLI**: All commands functional and documented
✅ **Documentation**: EN + PL docs complete
✅ **Tests**: 80%+ code coverage, 0 critical bugs
✅ **Performance**: Compiles 1000+ entities in <10 seconds

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| IFC complexity | Use IfcOpenShell library (mature, tested) |
| IDS specification gaps | Start with basic property checks, expand incrementally |
| Simulation format compatibility | Test with real EnergyPlus/DIVA projects early |
| Database performance at scale | Add indexes, benchmark with 10k+ entities |
| CLI UX complexity | Prototype with users, iterate on commands |

---

**Implementation ready to begin!** 🚀
