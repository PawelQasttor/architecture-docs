---
documentType: "regulatory_reference"
regulation: "Prawo_budowlane"
jurisdiction: "Poland"
lastUpdated: "2024-01-01"
officialSource: "https://isap.sejm.gov.pl/"
---

# Prawo Budowlane (Construction Law)

The **Construction Law** (Ustawa z dnia 7 lipca 1994 r. - Prawo budowlane) is the fundamental legal framework governing construction activities in Poland.

## Key Articles for Documentation

### Art. 5 - General Requirements

**Requirements for buildings:**

Buildings must be designed and constructed in accordance with:
- Intended use
- Technical and building regulations
- Principles of technical knowledge
- Safety requirements

**Documentation Standard Mapping:**

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Building designed per intended use and technical regulations"
    verification: "Design review completed"
    status: "compliant"
```

**Checklist:**
- [ ] Design complies with intended use
- [ ] Technical regulations followed (WT 2021)
- [ ] Structural safety verified
- [ ] Fire safety requirements met
- [ ] Health and hygiene standards satisfied

---

### Art. 20 - Technical Documentation

**Required documentation for building permit:**

1. **Architectural and construction design** including:
   - Site plan
   - Architectural drawings
   - Structural drawings
   - Building services drawings

2. **Technical descriptions** including:
   - Design solutions
   - Materials and products
   - Building systems

3. **Specifications** including:
   - Material specifications
   - Technical requirements
   - Quality standards

**Documentation Standard Mapping:**

```yaml
documentType: "project_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 20"
    requirement: "Complete technical documentation"
projectDocuments:
  - type: "architectural_design"
    status: "complete"
  - type: "structural_design"
    status: "complete"
  - type: "technical_specifications"
    status: "complete"
```

---

### Art. 34 - Design Requirements

**Design documentation must include:**

1. **Technical data:**
   - Building dimensions
   - Area calculations
   - Volume calculations
   - Number of users

2. **Technical solutions:**
   - Structural system
   - Materials
   - Building envelope
   - MEP systems

3. **Compliance statements:**
   - Building regulations
   - Technical standards
   - Environmental requirements

**Documentation Standard Example:**

```markdown
---
documentType: "technical_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Complete technical data and solutions"
---

## Building Technical Data

**Dimensions:**
- Total height: 24.5 m
- Building footprint: 450 m²
- Gross floor area: 1,800 m²
- Usable area: 1,620 m²

**Occupancy:**
- Building class: Residential
- Number of dwelling units: 18
- Estimated occupants: 54

**Structural System:**
- Foundation: Reinforced concrete footings
- Load-bearing walls: Reinforced concrete
- Floors: Reinforced concrete slabs
- Roof: Timber truss system

**Compliance:**
- ✅ Art. 34 - Complete technical data provided
- ✅ WT 2021 - Technical conditions satisfied
```

---

### Art. 41 - Construction Execution

**Requirements during construction:**

1. Construction must follow approved design
2. Changes require design updates
3. Construction diary must be maintained
4. Quality control required

**Documentation Standard Mapping:**

```yaml
documentType: "as_built_documentation"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 41"
    requirement: "As-built matches approved design"
constructionDiary:
  maintained: true
  lastEntry: "2026-02-20"
qualityControl:
  inspections: 15
  nonConformances: 0
```

---

### Art. 57 - Building Completion

**Occupancy permit requirements:**

1. Building constructed per approved design
2. All required inspections completed
3. As-built documentation prepared
4. Building regulations compliance verified

**Documentation Standard Example:**

```markdown
---
documentType: "completion_certificate"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 57"
    requirement: "Building ready for occupancy"
inspections:
  - type: "structural"
    date: "2026-01-15"
    result: "passed"
  - type: "fire_safety"
    date: "2026-01-20"
    result: "passed"
  - type: "electrical"
    date: "2026-01-22"
    result: "passed"
---

## Building Completion Certificate

**Project:** Residential Building - 123 Main Street

**Compliance Verification:**
- ✅ Construction per approved design (Art. 41)
- ✅ All inspections passed
- ✅ As-built documentation complete
- ✅ Fire safety compliance verified
- ✅ Structural stability confirmed
- ✅ Ready for occupancy (Art. 57)
```

---

## Common Compliance Requirements

### Building Classification

Per Prawo budowlane, buildings are classified by:

| Category | Type | Examples |
|----------|------|----------|
| **A** | Residential | Houses, apartments |
| **B** | Collective residence | Hotels, dormitories |
| **C** | Public services | Schools, hospitals |
| **D** | Commercial | Shops, offices |
| **E** | Industrial | Factories, warehouses |

**Document building class:**

```yaml
buildingClassification:
  category: "A"
  type: "residential_multi_family"
  description: "Apartment building"
```

---

### Technical Requirements Reference

Prawo budowlane references detailed requirements in:

- **WT 2021** - Technical Conditions (Warunki Techniczne)
- **PN-EN Standards** - European standards adopted in Poland
- **PN-ISO Standards** - ISO standards adopted in Poland

**Link requirements in documentation:**

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234"]
  - standard: "PN-EN_1996"
    description: "Masonry structures"
```

---

## Using in Documentation

### Example: Wall Specification

```markdown
---
documentType: "element_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Safe and durable construction"
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Complete technical specification"
---

## External Wall Type A - Technical Specification

**Regulatory Basis:**
- Prawo budowlane Art. 5 - General safety requirements
- Prawo budowlane Art. 34 - Technical specification requirements
- WT 2021 § 328 - Thermal performance
- PN-EN 1996 - Structural design

**Compliance Status:**
- ✅ All regulatory requirements satisfied
- ✅ Technical specifications complete
- ✅ Design verification performed
```

---

## Resources

- **Official Text:** [ISAP - Prawo budowlane](https://isap.sejm.gov.pl/)
- **Building Control:** Local building control offices (starostwa powiatowe)
- **Technical Standards:** Polish Committee for Standardization (PKN)

---

## Related Documentation

- [WT 2021 Technical Conditions →](/en/regulations/wt-2021)
- [SBM Compiler - Compliance Report →](/en/documentation/compiler/)
- [Green Terrace Project Specification →](/en/examples/green-terrace/project-specification)
