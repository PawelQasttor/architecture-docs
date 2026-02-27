# How the SBM Compiler Works

**SBM Compiler v0.3.0** - Complete technical explanation

---

## Overview

The SBM Compiler transforms **Markdown files with YAML frontmatter** into a **unified semantic building model** (JSON) plus specialized outputs for BIM, compliance, IoT, and quality assurance.

**Think of it as:** A build tool for buildings (like webpack for code, but for architecture)

---

## Compilation Pipeline

The compiler runs in **5 stages:**

```
Stage 1: Parse          → Extract YAML from Markdown files
Stage 2: Normalize      → Resolve inheritance, enrich data, load requirements
Stage 3: Validate       → Check schema, integrity, provenance, phase gates
Stage 3.5: Quality      → Compute completeness, confidence levels
Stage 4: Generate       → Create 5 specialized output formats
```

---

## Stage 1: Parse

**Purpose:** Read all Markdown files and extract YAML frontmatter

**Input:**
```
docs/en/examples/green-terrace/
  ├── spaces/
  │   ├── bedroom-01.md      ← YAML frontmatter + prose
  │   ├── bedroom-02.md
  │   └── corridor.md
  ├── levels/
  │   └── level-01.md
  ├── zones/
  │   ├── fire-zone-zl-iv.md
  │   └── ...
  └── systems/
      └── sys-hvac-01.md
```

**What it does:**

1. **Recursively scans directory** for .md files
2. **Extracts YAML frontmatter** between `---` delimiters
3. **Parses YAML** to JavaScript objects
4. **Filters** by documentType (space, zone, level, etc.)
5. **Returns** array of raw entity objects

**Example input file (bedroom-01.md):**
```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
designArea: 14.5
cost:
  totalCost: 25085
  currency: "EUR"
---

# Space: Bedroom 01
Prose content here...
```

**Output of Stage 1:**
```javascript
[
  {
    documentType: "space",
    entityType: "space",
    id: "SP-BLD-01-L01-001",
    spaceName: "Bedroom 01",
    designArea: 14.5,
    cost: { totalCost: 25085, currency: "EUR" }
  },
  // ... 14 more entities
]
```

**For Green Terrace:**
- Input: 17 Markdown files
- Parsed: 15 entities (2 skipped - no frontmatter)
- Types: space (3), level (1), zone (3), zone_type (3), system (1), system_type (1), asset_instance (1), asset_type (1), element_specification (1)

---

## Stage 2: Normalize & Enrich

**Purpose:** Transform raw entities into a complete, interconnected semantic model

**What it does:**

### 2.1 Group by Type
Organizes entities into collections:
```javascript
{
  spaces: [...],
  levels: [...],
  zones: [...],
  zone_types: [...],
  systems: [...],
  requirements: [...]
}
```

### 2.2 Resolve Type → Instance Inheritance

**Pattern:** Space instances inherit from space types

**Example:**
```yaml
# ST-BEDROOM-STANDARD-A.md (space type)
occupancyProfile:
  maxOccupants: 2
  usagePattern: "sleeping"
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"

# bedroom-01.md (space instance)
spaceTypeId: "ST-BEDROOM-STANDARD-A"
designArea: 14.5  # Instance-specific
```

**After inheritance:**
```javascript
{
  id: "SP-BLD-01-L01-001",
  spaceTypeId: "ST-BEDROOM-STANDARD-A",
  designArea: 14.5,
  // INHERITED from type:
  occupancy: { maxOccupants: 2, usagePattern: "sleeping" },
  requirements: ["REQ-DAYLIGHT-SLEEPING-001", "REQ-ACOUSTIC-SLEEPING-001"]
}
```

**For Green Terrace:** 1 type→instance inheritance resolved

### 2.3 Resolve Level → Space Inheritance

**Pattern:** Spaces inherit typical properties from their level

**Example:**
```yaml
# level-01.md
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Oak engineered 3-layer 15mm"
  walls: "Acrylic paint white RAL 9010"
typicalEnvironmentalConditions:
  temperatureRange: { min: 20, max: 24 }

# bedroom-01.md (space on this level)
levelId: "LVL-01"
designArea: 14.5
# NO ceiling height specified - will inherit
```

**After inheritance:**
```javascript
{
  id: "SP-BLD-01-L01-001",
  levelId: "LVL-01",
  designArea: 14.5,
  // INHERITED from level:
  ceilingHeight: 2.70,
  finishes: {
    floor: "Oak engineered 3-layer 15mm",
    walls: "Acrylic paint white RAL 9010"
  },
  environmentalConditions: {
    temperatureRange: { min: 20, max: 24 }
  }
}
```

**For Green Terrace:** 12 level→space inheritances resolved

### 2.4 Load Jurisdiction Pack

**Purpose:** Auto-load country-specific building codes

**Example:**
```javascript
// Input: --country PL
// Loads: requirements/jurisdiction/pl/*.json

// Loaded:
REQ-PL-WT-132-001: "Minimum room height 2.50m (WT 2021 § 132)"
REQ-PL-WT-076-001: "Minimum bedroom area 9m² (WT 2021 § 76)"
// ... 27 more Polish requirements
```

**For Green Terrace:**
- 4 global requirements
- 27 Poland-specific (WT 2021 + Rozporządzenie Ministra Zdrowia)
- **Total: 31 requirements**

### 2.5 Auto-Assign Requirements

**Purpose:** Match requirements to spaces by scope

**Example:**
```javascript
// REQ-PL-WT-076-001.json
{
  "id": "REQ-PL-WT-076-001",
  "scope": {
    "spaceTypes": ["bedroom", "sleeping"]  // Matches bedrooms
  },
  "metric": "designArea",
  "operator": ">=",
  "value": 9
}

// Auto-assigned to:
// - SP-BLD-01-L01-001 (bedroom, 14.5m² ✅)
// - SP-BLD-01-L01-002 (bedroom, 12.8m² ✅)
```

**For Green Terrace:** 3 requirements auto-assigned to spaces

### 2.6 Compute Reverse Relationships

**Purpose:** Build bidirectional links

**Example:**
```javascript
// Input: Space references zone
space: {
  id: "SP-BLD-01-L01-001",
  zoneIds: ["ZONE-FIRE-ZL-IV"]
}

// Computed: Zone references spaces
zone: {
  id: "ZONE-FIRE-ZL-IV",
  spaceIds: ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002", "SP-BLD-01-L01-CORR"]  // Auto-computed
}
```

**Output of Stage 2:**
```javascript
{
  project: {
    id: "PRJ-UNKNOWN",  // No project.md found
    name: "Unnamed Project",
    country: "PL",
    phase: 3
  },
  entities: {
    levels: [1 level],
    spaces: [3 spaces],  // With inherited properties
    zones: [3 zones],    // With reverse spaceIds
    requirements: [31 requirements]  // From jurisdiction pack
    // ... other types
  }
}
```

---

## Stage 3: Validate

**Purpose:** Ensure data integrity, schema compliance, and phase readiness

**What it does:**

### 3.1 JSON Schema Validation

**Uses:** `schemas/sbm-schema-v0.3.json` (or v0.4)

**Checks:**
- Required fields present
- Data types correct (string, number, array, object)
- Enum values valid
- Pattern matching (IDs, units)
- Array constraints (min/max items)

**Example check:**
```javascript
// Schema says:
{
  "properties": {
    "designArea": {
      "type": "number",
      "minimum": 0
    },
    "spaceType": {
      "type": "string",
      "enum": ["bedroom", "kitchen", "bathroom", ...]
    }
  }
}

// Validates:
{ designArea: 14.5, spaceType: "bedroom" } ✅

// Rejects:
{ designArea: -5 } ❌ "must be >= 0"
{ spaceType: "invalid" } ❌ "must be one of allowed values"
```

### 3.2 Referential Integrity

**Checks:** All ID references point to existing entities

**Example:**
```javascript
// Space references level
space: { id: "SP-001", levelId: "LVL-01" }

// Check: Does LVL-01 exist?
levels.find(l => l.id === "LVL-01")  ✅

// If not found:
// Warning: "Referenced level 'LVL-01' does not exist"
```

**For Green Terrace:**
- 45 unique IDs indexed
- All references validated
- 11 warnings (missing space type, missing some requirements)

### 3.3 Provenance Checks

**Checks:** Field-level data quality and confidence

**Example:**
```javascript
space: {
  designArea: 14.5,
  _meta: {
    designArea: {
      confidence: "measured",  // Good!
      source: "laser_scan_2026-02-15",
      measuredBy: "surveyor@example.com"
    }
  }
}

// Phase 5 check:
// ✅ designArea has "measured" confidence (acceptable)

space: {
  designArea: 14.5  // No _meta
}
// ⚠️  Warning: "Field has value but no _meta provenance"
```

**For Green Terrace:**
- 559 provenance gaps (fields without _meta)
- 3 fields with confidence but no source

### 3.4 Phase Gate Enforcement

**Purpose:** Ensure data quality increases with project phase

**Rules:**
```
Phase 1-3:  All confidence levels accepted
Phase 4:    Warns for 'assumed' confidence
Phase 5+:   Errors for 'assumed' confidence
Phase 7+:   Errors for 'estimated' on safety-critical fields
```

**Example:**
```javascript
// Phase 3 (Design Development):
space: {
  designArea: 14.5,
  _meta: {
    designArea: {
      confidence: "assumed"  // ✅ Accepted (warning only)
    }
  }
}

// Phase 5 (Construction Docs):
space: {
  designArea: 14.5,
  _meta: {
    designArea: {
      confidence: "assumed"  // ❌ ERROR: Must be specified/measured
    }
  }
}
```

**For Green Terrace (Phase 3):**
- All confidence levels accepted ✅
- Ready to advance to Phase 4

**Output of Stage 3:**
```javascript
{
  valid: true,  // or false if errors
  errors: [],   // Schema/integrity errors
  warnings: [   // Non-critical issues
    { path: "spaces/SP-001/spaceTypeId", message: "Referenced space type 'ST-BEDROOM-A' does not exist" }
  ]
}
```

---

## Stage 3.5: Quality Summaries

**Purpose:** Compute data quality metrics

**What it computes:**

### 3.5.1 Per-Entity Quality

**For each entity:**
```javascript
entity._quality = {
  completeness: 0.85,  // 85% of fields populated
  confidence: "specified",  // Lowest confidence level
  fieldCount: {
    total: 20,
    populated: 17,
    withMeta: 5
  }
}
```

### 3.5.2 Project Quality

**Aggregate metrics:**
```javascript
{
  totalEntities: 45,
  averageCompleteness: 1.0,  // 100%
  fieldsByConfidence: {
    measured: 0,
    calculated: 0,
    specified: 13,
    estimated: 0,
    assumed: 0,
    unknown: 0
  },
  safetyCriticalFields: {
    total: 3,
    verified: 3,  // All pressurization fields specified
    unverified: 0
  }
}
```

**For Green Terrace:**
- 45 entities analyzed
- Average completeness: **1.0 (100%)**
- Safety-critical: **3/3 verified** ✅

---

## Stage 4: Generate Targets

**Purpose:** Transform SBM into specialized formats for different use cases

### Target 1: sbm.json (123 KB)

**The main output** - Complete semantic building model

**Structure:**
```javascript
{
  "sbm_version": "0.3",
  "generatedAt": "2026-02-27T11:30:34.597Z",
  "compiler": { "version": "0.3.0", "mode": "production" },

  "project": {
    "id": "PRJ-UNKNOWN",
    "name": "Unnamed Project",
    "country": "PL",
    "phase": 3
  },

  "entities": {
    "levels": [
      {
        "id": "LVL-01",
        "levelName": "First Floor",
        "elevation": 3.2,
        "typicalCeilingHeight": 2.7,
        // All v0.4 fields preserved:
        "bimIntegration": {
          "geometryReference": {
            "ifcGlobalId": "2P3gH0$sLByv4WyFv3MQzT",
            "ifcExtractedProperties": { "elevation": 3.2 },
            "validation": { "elevationMatch": true }
          }
        }
      }
    ],

    "spaces": [
      {
        "id": "SP-BLD-01-L01-001",
        "spaceName": "Bedroom 01",
        "designArea": 14.5,
        // INHERITED properties:
        "ceilingHeight": 2.7,  // from level
        "finishes": { "floor": "Oak..." },  // from level
        // v0.4 fields preserved:
        "cost": { "totalCost": 25085 },
        "performanceTargets": { "daylighting": {...} },
        "simulations": [...]
      }
      // ... 2 more spaces
    ],

    "zones": [
      {
        "id": "ZONE-FIRE-ZL-IV",
        "zoneName": "Fire Zone ZL-IV",
        // COMPUTED reverse relationship:
        "spaceIds": ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002", "SP-BLD-01-L01-CORR"]
      }
      // ... 2 more zones
    ],

    "requirements": [
      {
        "id": "REQ-PL-WT-132-001",
        "requirementName": "Minimum room height per WT 2021",
        "metric": "ceilingHeight",
        "operator": ">=",
        "value": 2.5,
        "unit": "m"
      }
      // ... 30 more requirements
    ]
  }
}
```

**Use cases:**
- Complete building knowledge graph
- Query with jq/JavaScript
- Import into databases
- Feed to AI agents
- API data source

---

### Target 2: bim_mapping.json (20 KB)

**Purpose:** Configure Revit/IFC parameter mapping

**What it generates:**

#### 2.1 Revit Shared Parameters

**Groups parameters for Revit:**
```javascript
{
  "revitSharedParameters": [
    {
      "group": "SBM_Space",
      "description": "Semantic Building Model space properties",
      "parameters": [
        {
          "name": "SBM_SpaceID",
          "type": "Text",
          "description": "Unique semantic space identifier"
        },
        {
          "name": "SBM_DesignArea",
          "type": "Area",
          "description": "Design area for compliance checking"
        },
        {
          "name": "SBM_CeilingHeight",
          "type": "Length",
          "description": "Clear ceiling height"
        },
        {
          "name": "SBM_Requirements",
          "type": "Text",
          "description": "Comma-separated requirement IDs"
        }
      ]
    },
    {
      "group": "SBM_Zone",
      "parameters": [...]
    }
  ]
}
```

**Generated: 5 parameter groups**

#### 2.2 IFC Property Sets

**Maps to IFC format:**
```javascript
{
  "ifcPropertySets": [
    {
      "name": "Pset_SBM_Space",
      "applicableEntities": ["IfcSpace"],
      "properties": [
        {
          "name": "SBM_ID",
          "type": "IfcIdentifier",
          "description": "Semantic space ID"
        },
        {
          "name": "DesignArea",
          "type": "IfcAreaMeasure",
          "unit": "SQUARE_METRE"
        },
        {
          "name": "SpaceType",
          "type": "IfcLabel"
        }
      ]
    }
  ]
}
```

**Generated: 4 IFC property sets**

#### 2.3 Parameter Mappings

**How to extract SBM → Revit/IFC:**
```javascript
{
  "parameterMappings": {
    "spaces": {
      "id": "SBM_SpaceID",
      "spaceName": "Name",
      "designArea": "SBM_DesignArea",
      "spaceType": "SBM_SpaceType",
      "requirements": "SBM_Requirements"  // Joined array
    },
    "zones": {...},
    "levels": {...}
  }
}
```

**Use cases:**
- Dynamo scripts to populate Revit parameters
- IFC export configuration
- BIM 360 field templates
- Automated model checking

---

### Target 3: compliance_report.json (37 KB)

**Purpose:** Regulatory compliance checking

**What it generates:**

#### 3.1 Summary
```javascript
{
  "summary": {
    "totalRequirements": 31,
    "globalRequirements": 4,
    "countrySpecificRequirements": 27,
    "verified": 3,      // Compliance confirmed
    "pendingVerification": 9,  // Awaiting data
    "reviewRequired": 3,       // Manual check needed
    "complianceRate": 20,      // 20%
    "complianceChecksPerformed": 15
  }
}
```

#### 3.2 Poland WT 2021 Compliance

**Organized by regulation sections:**
```javascript
{
  "polandSpecificCompliance": {
    "regulation": "WT_2021",
    "sections": [
      {
        "section": "§ 132",
        "description": "Minimalna wysokość pomieszczeń",
        "requirements": [
          {
            "id": "REQ-PL-WT-132-001",
            "requirementName": "Minimum room height 2.50m",
            "status": "verified",
            "checks": [
              {
                "entityId": "SP-BLD-01-L01-001",
                "entityName": "Bedroom 01",
                "target": 2.5,
                "actual": 2.7,
                "status": "compliant",  // ✅
                "margin": 0.2
              }
            ]
          }
        ],
        "status": "verified"
      },
      {
        "section": "§ 76",
        "description": "Minimalna powierzchnia sypialni",
        "requirements": [
          {
            "id": "REQ-PL-WT-076-001",
            "requirementName": "Minimum bedroom area 9m²",
            "status": "verified",
            "checks": [
              {
                "entityId": "SP-BLD-01-L01-001",
                "target": 9,
                "actual": 14.5,
                "status": "compliant",  // ✅ 14.5 > 9
                "margin": 5.5
              },
              {
                "entityId": "SP-BLD-01-L01-002",
                "target": 9,
                "actual": 12.8,
                "status": "compliant",  // ✅ 12.8 > 9
                "margin": 3.8
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**Use cases:**
- Automated code compliance checking
- Permit application documentation
- Quality assurance dashboards
- Authority submission reports

---

### Target 4: asset_register.json (4.8 KB)

**Purpose:** Asset management and maintenance planning

**What it generates:**

#### 4.1 Asset Inventory
```javascript
{
  "inventory": [
    {
      "id": "AI-HP-01",
      "assetName": "Heat Pump Bosch 7000i",
      "assetType": "heat_pump",
      "manufacturer": "Bosch",
      "model": "Compress 7000i AW",
      "serialNumber": "HP-2026-001",
      "location": "Basement mechanical room",
      "installDate": "2026-01-15",
      "warrantyExpiry": "2031-01-15",
      "maintenanceSchedule": "annual",
      "criticality": "high"
    }
  ]
}
```

#### 4.2 Maintenance Calendar
```javascript
{
  "maintenanceCalendar": {
    "2026-01": {
      "tasks": [
        {
          "assetId": "AI-HP-01",
          "taskType": "annual_service",
          "description": "Heat pump annual maintenance",
          "scheduledDate": "2026-01-15",
          "estimatedDuration": 240,  // minutes
          "contractor": "Bosch Service"
        }
      ]
    }
  }
}
```

#### 4.3 CMMS Export
```javascript
{
  "cmmsExport": [
    {
      "equipmentId": "AI-HP-01",
      "equipmentName": "Heat Pump",
      "location": "Basement",
      "category": "HVAC",
      "criticality": "High",
      "maintenanceType": "Preventive",
      "frequency": "Annual"
    }
  ]
}
```

**Use cases:**
- Facility management systems
- Maintenance planning
- Warranty tracking
- CMMS integration (Maximo, SAP)

---

### Target 5: twin_schema.json (28 KB)

**Purpose:** Digital twin and IoT integration

**What it generates:**

#### 5.1 Sensor Bindings
```javascript
{
  "spaces": [
    {
      "id": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "sensors": {
        "temperature": {
          "deviceId": "sensor_bedroom01_temp",
          "protocol": "BACnet",
          "dataPoint": "AI_1",
          "unit": "C",
          "sampleRate": 60  // seconds
        },
        "humidity": {
          "deviceId": "sensor_bedroom01_hum",
          "protocol": "BACnet",
          "dataPoint": "AI_2",
          "unit": "%"
        },
        "co2": {
          "deviceId": "sensor_bedroom01_co2",
          "protocol": "BACnet",
          "dataPoint": "AI_3",
          "unit": "ppm"
        }
      }
    }
  ]
}
```

#### 5.2 BMS Integration
```javascript
{
  "bmsIntegration": {
    "protocol": "BACnet/IP",
    "devices": [
      {
        "deviceId": "SYS-HVAC-01-controller",
        "deviceName": "HVAC Controller",
        "ipAddress": "192.168.1.100",
        "bacnetId": 100,
        "points": [
          { "pointId": "AI_1", "description": "Bedroom 01 temperature", "type": "analog_input" },
          { "pointId": "AI_2", "description": "Bedroom 01 humidity", "type": "analog_input" },
          { "pointId": "AO_1", "description": "Heat pump setpoint", "type": "analog_output" }
          // ... 10 more points
        ]
      }
    ]
  }
}
```

**Total: 13 BMS control points configured**

#### 5.3 IoT Device Registry
```javascript
{
  "iotDeviceRegistry": [
    {
      "deviceId": "sensor_bedroom01_temp",
      "deviceType": "temperature_sensor",
      "manufacturer": "Siemens",
      "model": "QAA2061",
      "location": "SP-BLD-01-L01-001",
      "installDate": "2026-02-01",
      "networkAddress": "192.168.1.101",
      "status": "active"
    }
    // ... 12 more devices
  ]
}
```

**Use cases:**
- Building automation systems
- IoT platform configuration
- Real-time monitoring dashboards
- Predictive maintenance
- Energy optimization

---

### Target 6: quality_report.json (34 KB)

**Purpose:** Data quality and phase readiness assessment

**What it generates:**

#### 6.1 Project Quality Summary
```javascript
{
  "projectQuality": {
    "totalEntities": 45,
    "averageCompleteness": 1.0,  // 100%
    "fieldsByConfidence": {
      "measured": 0,
      "calculated": 0,
      "specified": 13,
      "estimated": 0,
      "assumed": 0,
      "unknown": 0
    },
    "entitiesByLowestConfidence": {
      "none": 41,       // No provenance annotations
      "specified": 4
    }
  }
}
```

#### 6.2 Safety Audit
```javascript
{
  "safetyAudit": {
    "totalFields": 3,
    "verified": 3,
    "unverified": 0,
    "fields": [
      {
        "entityId": "SP-BLD-01-L01-001",
        "entityType": "spaces",
        "field": "environmentalConditions.pressurization",
        "value": "neutral",
        "confidence": "specified",
        "verified": true  // ✅
      }
      // ... 2 more
    ]
  }
}
```

**All safety-critical fields verified** ✅

#### 6.3 Provenance Gaps
```javascript
{
  "provenanceGaps": {
    "totalGaps": 559,
    "byIssue": {
      "no_meta": 556,        // Fields without _meta annotation
      "no_source": 3,        // Specified confidence without source
      "null_unexplained": 0
    },
    "gaps": [
      {
        "entityId": "LVL-01",
        "entityType": "levels",
        "field": "levelName",
        "issue": "no_meta",
        "description": "Field has a value but no _meta provenance annotation"
      }
      // ... 558 more gaps
    ]
  }
}
```

#### 6.4 Phase Readiness
```javascript
{
  "phaseReadiness": {
    "currentPhase": 3,      // Design Development
    "nextPhase": 4,         // Construction Documentation
    "ready": true,          // ✅ Ready to advance
    "blockers": [],         // No blockers
    "warnings": [],         // No warnings
    "summary": "Project is ready to advance to Phase 4"
  }
}
```

**Use cases:**
- Quality dashboards
- Phase gate reviews
- Data governance audits
- Continuous improvement tracking

---

### Target 7: warnings.json (2.5 KB)

**Purpose:** Log non-critical validation warnings

**Example:**
```javascript
{
  "warnings": [
    {
      "path": "spaces/SP-BLD-01-L01-001/spaceTypeId",
      "message": "Referenced space type 'ST-BEDROOM-STANDARD-A' does not exist"
    },
    {
      "path": "spaces/SP-BLD-01-L01-001/requirements",
      "message": "Referenced requirement 'REQ-LEVEL-FIRE-RATING' does not exist (may be in jurisdiction pack)"
    },
    {
      "path": "systems/SYS-HVAC-01/assetInstanceIds",
      "message": "Referenced asset 'AI-MVHR-01' does not exist (may not be defined yet)"
    }
  ]
}
```

**All warnings are non-critical** - compilation succeeds despite warnings

---

## Summary: What the Compiler Created

### For Green Terrace (15 input files):

**Main Output (sbm.json - 123 KB):**
- ✅ 45 entities (15 from Markdown + 31 from jurisdiction pack)
- ✅ Property inheritance resolved (13 resolutions)
- ✅ Reverse relationships computed
- ✅ All v0.4 fields preserved
- ✅ Complete semantic building knowledge graph

**Specialized Outputs:**
1. **BIM mapping** (20 KB) - 5 Revit parameter groups, 4 IFC property sets
2. **Compliance report** (37 KB) - 31 requirements, 15 checks, 20% compliance rate
3. **Asset register** (4.8 KB) - 1 asset, maintenance calendar, CMMS export
4. **Digital twin** (28 KB) - 3 spaces with sensors, 13 BMS points, 13 IoT devices
5. **Quality report** (34 KB) - 100% completeness, 3/3 safety fields verified, ready for Phase 4
6. **Warnings** (2.5 KB) - 14 non-critical warnings

**Total compilation time:** 0.11 seconds ⚡

---

## Use Cases

**Architecture Teams:**
- Complete building documentation in JSON
- BIM parameter automation
- Code compliance verification

**BIM Coordinators:**
- Revit parameter templates
- IFC property set configuration
- Model quality checking

**Facility Managers:**
- Asset inventory and maintenance schedules
- CMMS integration data
- Lifecycle planning

**IoT Engineers:**
- Sensor-to-space mappings
- BMS point configurations
- Device registry

**Project Managers:**
- Quality metrics and phase readiness
- Compliance status tracking
- Data governance audits

---

## Key Features

**✅ Property Inheritance**
- Type → Instance (define once, reuse)
- Level → Space (90% data reduction)

**✅ Jurisdiction Packs**
- Auto-load country building codes
- Auto-assign requirements by scope

**✅ Data Provenance**
- Track confidence levels (measured → assumed)
- Phase gate enforcement
- Quality metrics

**✅ Multiple Output Formats**
- Semantic model (JSON)
- BIM integration (Revit/IFC)
- Compliance (regulatory)
- Operations (FM/IoT)
- Quality (governance)

**✅ Fast Compilation**
- 0.11s for 15 entities
- Scales to 400+ entities (hospital project: 0.5s)

---

## Architecture Summary

```
Input: Markdown + YAML
    ↓
Stage 1: Parse (extract YAML)
    ↓
Stage 2: Normalize (inheritance, relationships, requirements)
    ↓
Stage 3: Validate (schema, integrity, provenance)
    ↓
Stage 3.5: Quality (completeness, confidence)
    ↓
Stage 4: Generate (6 specialized outputs)
    ↓
Output: JSON files (260 KB total)
```

**The compiler transforms human-readable building documentation into machine-readable semantic models ready for BIM, compliance, operations, and analytics.** 🏗️
