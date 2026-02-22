# Architecture Documentation Standard

> AI-ready documentation standard for modern architects

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

This project defines and documents a **new standard for architectural documentation** that is:

- 📝 **Human-readable** - Written in plain Markdown
- 🤖 **AI-parseable** - Structured YAML frontmatter and JSON schemas
- 🏗️ **BIM-compatible** - IFC entity references and bi-directional sync
- ✅ **Regulation-compliant** - Polish building codes and international standards
- 🔄 **Version-controllable** - Git-friendly plain text format
- 📄 **PDF-exportable** - Professional output via Pandoc templates

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- (Optional) Python 3.8+ for BIM sync tools

### Installation

```bash
# Clone the repository
git clone https://github.com/architecture-docs/standard.git
cd architecture-docs

# Install dependencies
npm install

# Start development server
npm run docs:dev
```

Visit http://localhost:5173 to view the documentation.

### Build for Production

```bash
npm run docs:build
npm run docs:preview
```

## Deployment

The documentation website can be deployed to various platforms:

### GitHub Pages (Recommended)

**Automatic deployment via GitHub Actions:**

1. Push to `main` branch
2. GitHub Actions builds the site
3. Deploys to `gh-pages` branch
4. Available at `https://yourusername.github.io/architecture-docs/`

**Manual deployment:**

```bash
npm run docs:build
cd docs/.vitepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:yourusername/architecture-docs.git main:gh-pages
```

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run docs:build`
3. Publish directory: `docs/.vitepress/dist`
4. Deploy!

### Vercel

1. Import your GitHub repository
2. Framework preset: VitePress
3. Build command: `npm run docs:build`
4. Output directory: `docs/.vitepress/dist`
5. Deploy!

### Custom Server

```bash
npm run docs:build
# Upload docs/.vitepress/dist/ to your server
```

## Project Structure

```
architecture-docs/
├── docs/                      # Documentation content
│   ├── .vitepress/           # VitePress configuration
│   │   ├── config.ts         # Site config with i18n
│   │   ├── theme/            # Custom theme
│   │   └── schemas/          # JSON schemas
│   ├── en/                   # English documentation
│   ├── pl/                   # Polish documentation
│   └── public/               # Static assets
├── bim-sync/                 # BIM sync scripts
├── templates/                # PDF export templates
└── scripts/                  # Build scripts
```

## Features

### For Architects
- Write documentation in simple markdown
- Export to professional PDFs for submissions
- Version control with Git
- Collaborate easily with teams
- Built-in regulatory compliance templates

### For AI Integration
- Structured YAML frontmatter
- Machine-readable JSON schemas
- Semantic HTML output
- Full-text search capability

### For BIM Workflows
- IFC entity documentation
- Property Set (Pset) references
- LOD (Level of Development) definitions
- Bi-directional sync with Revit/ArchiCAD

## Documentation Sections

- **Standards** - Document structure and schema definitions
- **Regulations** - Polish building codes (Prawo budowlane, WT 2021)
- **BIM Integration** - IFC entities, LOD, and sync workflows
- **Templates** - Reusable templates for common documents

## Example Document

```markdown
---
documentType: "technical_specification"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWall"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
---

## External Wall - Type A

**Properties:**
| Property | Value |
|----------|-------|
| ThermalTransmittance | 0.24 W/m²K |
| FireRating | REI 60 |

**Compliance:**
- ✅ WT 2021 § 328
```

## Technology Stack

- **VitePress** - Fast static site generator
- **Vue 3** - Interactive components
- **TypeScript** - Type safety
- **IfcOpenShell** - IFC parsing (Python)
- **Pandoc** - PDF export

## Roadmap

- [x] Phase 1: Foundation setup (VitePress + i18n)
- [ ] Phase 2: Pilot content creation
  - [ ] Polish regulations (Prawo budowlane, WT 2021)
  - [ ] IFC wall/slab documentation
  - [ ] Sample project template
  - [ ] BIM LOD definitions
- [ ] Phase 3: BIM sync tools
- [ ] Phase 4: PDF export templates
- [ ] Phase 5: Public launch

## Contributing

Contributions are welcome! This is an open standard meant to serve the architecture community.

## License

MIT License - See [LICENSE](LICENSE) for details

## Contact

- Issues: [GitHub Issues](https://github.com/architecture-docs/standard/issues)
- Discussions: [GitHub Discussions](https://github.com/architecture-docs/standard/discussions)

---

**Languages:** [English](/) | [Polski](/pl/)
