# Sample Building Project

This example demonstrates a complete architectural documentation workflow using the Architecture Documentation Standard.

## Project Overview

**Project Name:** Residential Building "Green Terrace"
**Location:** Warsaw, Poland
**Type:** Multi-family residential (6 stories)
**Building Class:** A (Residential)
**Height:** 18.5m
**Gross Floor Area:** 1,800 m²
**Units:** 18 apartments

## Documentation Structure

This sample project includes:

1. **Project Specification** (`project-specification.md`)
   - Overall project description
   - Regulatory framework
   - Design intent

2. **Element Specifications**
   - `external-wall-type-a.md` - External wall assembly
   - `floor-slab-type-a.md` - Typical floor slab
   - `window-type-a.md` - Window specification

3. **Material Specifications**
   - `materials.md` - Material properties and compliance

4. **Compliance Checklist**
   - `compliance-checklist.md` - Regulatory verification

5. **BIM Integration**
   - IFC property mappings
   - LOD 400 specifications

## Files in This Example

```
sample-building/
├── README.md (this file)
├── project-specification.md
├── external-wall-type-a.md
├── floor-slab-type-a.md
├── window-type-a.md
├── materials.md
├── compliance-checklist.md
└── build-pdf.sh (PDF export script)
```

## Usage

### 1. Read the Documentation

Browse the markdown files to see how a complete project is documented.

### 2. Export to PDF

Generate PDF documents for submission:

```bash
# Export single document
pandoc project-specification.md \
  -o project-specification.pdf \
  --template=../../pandoc/architectural-doc.latex \
  --pdf-engine=xelatex

# Or use the provided script
./build-pdf.sh
```

### 3. Adapt for Your Project

1. Copy this example folder
2. Update frontmatter with your project data
3. Modify content sections as needed
4. Export to PDF

## Key Features Demonstrated

- ✅ Structured YAML frontmatter
- ✅ IFC entity mappings
- ✅ Polish regulatory compliance (WT 2021, Prawo budowlane)
- ✅ BIM LOD 400 specifications
- ✅ Material specifications
- ✅ Thermal performance calculations
- ✅ Fire safety compliance
- ✅ Accessibility requirements
- ✅ Ready for PDF export

## Regulatory Compliance

This example demonstrates compliance with:

- **Prawo budowlane** (Construction Law)
  - Art. 5 - General requirements
  - Art. 34 - Technical documentation

- **WT 2021** (Technical Conditions)
  - § 328 - Thermal insulation
  - § 234 - Fire safety
  - § 55 - Accessibility

- **Standards**
  - PN-EN 1996 - Masonry structures
  - PN-EN 1992 - Concrete structures
  - PN-EN ISO 6946 - Thermal performance

## BIM Integration

All elements include:
- IFC entity references (IfcWall, IfcSlab, etc.)
- Property Sets (Psets)
- LOD 400 specifications
- Ready for bi-directional sync

## PDF Export

Documents can be exported to professional PDFs using:

- **Pandoc** - Document conversion
- **LaTeX templates** - Professional styling
- **XeLaTeX engine** - Unicode support for Polish characters

See `build-pdf.sh` for complete export workflow.

## License

This example is provided as reference material under the MIT License.
