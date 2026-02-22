# Polish Regulations Overview

The Architecture Documentation Standard includes comprehensive references to Polish building regulations and international standards, enabling architects to create documentation that is compliant by design.

## Key Polish Regulations

### Prawo Budowlane (Construction Law)

The fundamental legal framework for construction in Poland.

**Key Articles:**
- **Art. 5** - General construction requirements
- **Art. 34** - Technical documentation requirements
- **Art. 62** - Building permit conditions

[Learn more →](/en/regulations/prawo-budowlane)

---

### WT 2021 (Technical Conditions)

Technical conditions that buildings and their location must satisfy.

**Key Requirements:**
- **§ 328** - Thermal insulation requirements
- **§ 234** - Fire safety regulations
- **§ 55** - Accessibility requirements

[Learn more →](/en/regulations/wt-2021)

---

## International Standards

### PN-EN Standards

European standards adopted in Poland:

- **PN-EN 1996** - Design of masonry structures
- **PN-EN 1992** - Design of concrete structures
- **PN-EN 1993** - Design of steel structures
- **PN-EN 206** - Concrete specifications

### PN-ISO Standards

ISO standards adopted in Poland:

- **PN-ISO 9001** - Quality management systems
- **PN-ISO 19650** - BIM information management

---

## Compliance Documentation

### Built-in Compliance Features

The standard makes regulatory compliance easier:

#### 1. Structured Compliance References

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Technical documentation completeness"
    status: "compliant"

  - standard: "WT_2021"
    section: "§ 328"
    requirement: "U-value ≤ 0.25 W/m²K"
    status: "compliant"
```

#### 2. Compliance Checklists

Pre-built checklists for common requirements:

- [ ] Thermal performance (WT 2021 § 328)
- [ ] Fire safety (WT 2021 § 234)
- [ ] Structural design (PN-EN 1996)
- [ ] Accessibility (WT 2021 § 55)

View Checklist Template (future)

#### 3. Automated Verification

Validate compliance during documentation creation:

```bash
npm run validate:compliance my-project/specs.md
```

---

## Thermal Performance Requirements

### WT 2021 § 328 - U-values

Maximum heat transfer coefficients (U-values):

| Element | Max U-value | Unit |
|---------|------------|------|
| External walls | 0.20 | W/m²K |
| Roof | 0.15 | W/m²K |
| Floor | 0.30 | W/m²K |
| Windows | 0.90 | W/m²K |
| Doors | 1.30 | W/m²K |

**Document compliance:**

```markdown
**Thermal Performance:**
- U-value: 0.24 W/m²K
- Requirement: ≤ 0.25 W/m²K (WT 2021 § 328)
- Status: ✅ Compliant
```

---

## Fire Safety Requirements

### WT 2021 § 234 - Fire Resistance

Building element fire ratings:

| Element | Min Rating | Building Height |
|---------|-----------|-----------------|
| Load-bearing walls | REI 60 | < 25m |
| Load-bearing walls | REI 120 | ≥ 25m |
| Floors | REI 60 | < 25m |

**Document compliance:**

```markdown
**Fire Safety:**
- Fire Rating: REI 60
- Requirement: REI 60 (WT 2021 § 234)
- Status: ✅ Compliant
```

---

## Using Regulations in Documentation

### Example: Wall Specification

```markdown
---
documentType: "element_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "PN-EN_1996"
---

## External Wall Type A

**Thermal Performance:**
- U-value: 0.23 W/m²K
- ✅ Compliant with WT 2021 § 328 (max 0.25 W/m²K)

**Fire Safety:**
- Fire Rating: REI 60
- ✅ Compliant with WT 2021 § 234

**Structural Design:**
- Design per PN-EN 1996 (Masonry structures)
- ✅ Calculations verified
```

---

## Regulatory Updates

The standard is designed to accommodate regulatory changes:

1. **Version control** - Track regulation versions
2. **Update notifications** - Flag outdated requirements
3. **Migration guides** - Update existing docs to new regs

---

## Next Steps

- 📖 [Prawo Budowlane](/en/regulations/prawo-budowlane) - Construction Law details
- 🌡️ [WT 2021](/en/regulations/wt-2021) - Technical Conditions guide
- ✅ [SBM Compiler](/en/documentation/compiler/) - Automated compliance checking
- 📝 [Standards](/en/standards/) - Learn the documentation standard
