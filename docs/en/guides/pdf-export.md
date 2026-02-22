# PDF Export Guide

Complete guide to generating professional PDF documents from markdown documentation.

## Overview

The Architecture Documentation Standard uses **Pandoc** and **LaTeX** to convert markdown files into professional, print-ready PDFs suitable for:

- 📄 Building permit submissions
- 👥 Client presentations
- 🏗️ Contractor documentation
- ⚖️ Regulatory reviews
- 📁 Official archiving

---

## Prerequisites

### 1. Install Pandoc

Pandoc is a universal document converter.

**Windows:**
```powershell
# Using Chocolatey
choco install pandoc

# Or download installer from https://pandoc.org/installing.html
```

**macOS:**
```bash
brew install pandoc
```

**Linux:**
```bash
sudo apt-get install pandoc
```

**Verify installation:**
```bash
pandoc --version
```

### 2. Install LaTeX

LaTeX is required for PDF generation.

**Windows - MiKTeX (Recommended):**
1. Download from https://miktex.org/download
2. Run installer
3. Choose "Install missing packages automatically"

**macOS - MacTeX:**
```bash
brew install --cask mactex
```

**Linux - TeX Live:**
```bash
sudo apt-get install texlive-full
```

**Verify installation:**
```bash
xelatex --version
```

---

## Quick Start

### Basic PDF Export

```bash
pandoc document.md -o document.pdf
```

### With Our Template

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

### With Table of Contents

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

---

## Document Metadata

Add metadata to your markdown file's frontmatter:

### Example Metadata

```yaml
---
title: "External Wall - Type A"
subtitle: "Technical Specification"
author: "Anna Nowak, Architect IARP #5678"
date: "2026-02-20"
project-name: "Green Terrace Residential Building"
document-reference: "EW-01"
document-type: "Element Specification"
version: "1.5.0"
bim-lod: "LOD 400"
toc: true
number-sections: true
---
```

### Metadata Fields

| Field | Description | Example |
|-------|-------------|---------|
| **title** | Document title | "External Wall Type A" |
| **subtitle** | Subtitle/description | "Technical Specification" |
| **author** | Author name and credentials | "Anna Nowak, IARP #5678" |
| **date** | Document date | "2026-02-20" |
| **project-name** | Project name | "Green Terrace" |
| **document-reference** | Document ID | "EW-01" |
| **document-type** | Type of document | "Element Specification" |
| **version** | Document version | "1.5.0" |
| **bim-lod** | BIM Level of Development | "LOD 400" |
| **toc** | Include table of contents | true/false |
| **number-sections** | Number sections | true/false |

---

## Export Examples

### Example 1: Project Specification

**Markdown file:** `project-specification.md`

```yaml
---
title: "Project Specification"
subtitle: "Residential Building Green Terrace"
author: "Anna Nowak, Lead Architect"
date: "2026-02-20"
project-name: "Green Terrace"
document-type: "Project Specification"
version: "2.0.0"
toc: true
number-sections: true
---

# Your content here...
```

**Export command:**
```bash
pandoc project-specification.md -o project-spec.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

**Result:** Professional PDF with:
- Title page
- Table of contents
- Numbered sections
- Headers/footers with metadata
- Page numbers

### Example 2: Element Specification

**Markdown file:** `external-wall-type-a.md`

```yaml
---
title: "External Wall - Type A"
document-reference: "EW-01"
author: "Anna Nowak"
project-name: "Green Terrace"
version: "1.5.0"
bim-lod: "LOD 400"
signatures:
  - role: "Architect"
    name: "Anna Nowak"
  - role: "Structural Engineer"
    name: "Piotr Kowalski"
---
```

**Export command:**
```bash
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc
```

**Result:** Professional specification with signature page.

### Example 3: Compliance Checklist

**Markdown file:** `compliance-checklist.md`

```yaml
---
title: "Regulatory Compliance Checklist"
project-name: "Green Terrace"
document-type: "Compliance Checklist"
author: "Anna Nowak"
---
```

**Export command:**
```bash
pandoc compliance-checklist.md -o compliance.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

---

## Batch Export

### Export All Documents

**Unix/Linux/macOS:**
```bash
#!/bin/bash
for md in *.md; do
  if [ "$md" != "README.md" ]; then
    pandoc "$md" -o "${md%.md}.pdf" \
      --template=../../templates/pandoc/architectural-doc.latex \
      --pdf-engine=xelatex \
      --toc \
      --number-sections
  fi
done
```

**Windows PowerShell:**
```powershell
Get-ChildItem *.md | Where-Object { $_.Name -ne "README.md" } | ForEach-Object {
    $output = $_.BaseName + ".pdf"
    pandoc $_.Name -o $output `
        --template=..\..\templates\pandoc\architectural-doc.latex `
        --pdf-engine=xelatex `
        --toc `
        --number-sections
}
```

### Using Makefile

Create `Makefile` in your project:

```makefile
TEMPLATE = ../../templates/pandoc/architectural-doc.latex
PANDOC = pandoc
PFLAGS = --template=$(TEMPLATE) --toc --number-sections --pdf-engine=xelatex

SOURCES = $(wildcard *.md)
PDFS = $(SOURCES:.md=.pdf)

all: $(PDFS)

%.pdf: %.md
	$(PANDOC) $< -o $@ $(PFLAGS)

clean:
	rm -f $(PDFS)

.PHONY: all clean
```

**Usage:**
```bash
make        # Export all markdown to PDF
make clean  # Remove all PDFs
```

---

## Customization

### Custom Page Size

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable papersize=a3
```

**Options:** a4, a3, letter, legal

### Custom Margins

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable geometry:"top=3cm,bottom=3cm,left=2.5cm,right=2.5cm"
```

### Custom Font Size

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable fontsize=12pt
```

**Options:** 10pt, 11pt, 12pt, 14pt

### Suppress Title Page

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable title-page=false
```

---

## PDF Features

### What's Included

✅ **Professional Layout**
- A4 paper (or custom size)
- Proper margins (2.5cm default)
- Headers with project name and document reference
- Footers with author, page numbers, date

✅ **Polish Character Support**
- Full UTF-8 encoding
- Proper rendering of ą, ć, ę, ł, ń, ó, ś, ź, ż
- Polish hyphenation

✅ **Typography**
- Professional fonts
- Proper spacing
- Section numbering
- Table of contents with links

✅ **Tables**
- Professional formatting
- Proper alignment
- Row/column spanning
- Caption support

✅ **Code Blocks**
- Syntax highlighting
- Monospace font
- Light gray background
- Line wrapping

✅ **Hyperlinks**
- Clickable links in PDF
- Internal references
- External URLs
- Color-coded (blue)

✅ **Images**
- Full support for PNG, JPG, PDF
- Captions and numbering
- Proper sizing

---

## Troubleshooting

### "pandoc: command not found"

**Solution:** Install Pandoc (see Prerequisites)

### "! LaTeX Error: File not found"

**Solution:** Install full LaTeX distribution
```bash
# macOS
brew install --cask mactex

# Linux
sudo apt-get install texlive-full

# Windows
# Reinstall MiKTeX with full packages
```

### Polish Characters Not Showing

**Solution:** Use XeLaTeX engine
```bash
pandoc document.md -o document.pdf \
  --pdf-engine=xelatex
```

### "pdflatex not found in PATH"

**Windows:**
1. Reinstall MiKTeX
2. Add to PATH: `C:\Program Files\MiKTeX\miktex\bin\x64`

**macOS:**
```bash
export PATH="/Library/TeX/texbin:$PATH"
```

### Large Tables Don't Fit

**Solution:** Use smaller font or landscape orientation
```bash
pandoc document.md -o document.pdf \
  --variable fontsize=10pt
```

### Images Too Large

**Solution:** Resize in markdown
```markdown
![Image caption](image.png){width=50%}
```

---

## Integration with Standard

### From Example Project

```bash
cd docs/en/examples/green-terrace/

# Export project specification
pandoc project-specification.md -o project-spec.pdf \
  --template=../../../../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections

# Export wall specification
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=../../../../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

### Automated Export

Add to `package.json`:

```json
{
  "scripts": {
    "pdf:examples": "cd docs/en/examples/green-terrace && ./build-pdf.sh"
  }
}
```

Run with:
```bash
npm run pdf:examples
```

---

## Best Practices

### 1. Always Use XeLaTeX

For Polish character support:
```bash
--pdf-engine=xelatex
```

### 2. Include Table of Contents

For documents over 3 pages:
```bash
--toc --number-sections
```

### 3. Version Your PDFs

Name files with versions:
```bash
pandoc spec.md -o "EW-01_v1.5.0.pdf"
```

### 4. Review Before Submitting

Always check:
- Title page shows correct information
- Table of contents is accurate
- Tables fit on pages
- Images display correctly
- Polish characters render properly
- Page numbers are correct

### 5. Archive Source + PDF

Keep both:
```
project/
├── specs/
│   ├── wall-spec.md      # Source (version controlled)
│   └── wall-spec.pdf     # Export (for submissions)
```

---

## Advanced Features

### Custom LaTeX Template

Edit `templates/pandoc/architectural-doc.latex` to customize:

**Colors:**
```latex
\definecolor{archblue}{RGB}{44,90,160}
\definecolor{archgray}{RGB}{100,100,100}
```

**Fonts:**
```latex
\usepackage{times}      % Times New Roman
\usepackage{palatino}   % Palatino
```

**Headers/Footers:**
```latex
\fancyhead[L]{Custom header}
\fancyfoot[C]{Custom footer}
```

### Include Only Specific Sections

Using Pandoc filters (advanced):
```bash
pandoc document.md -o document.pdf \
  --lua-filter=section-filter.lua
```

---

## Resources

- **Pandoc Manual**: https://pandoc.org/MANUAL.html
- **LaTeX Documentation**: https://www.latex-project.org/
- **Our Templates**: `/templates/pandoc/`
- **Example Scripts**: `/templates/examples/sample-building/build-pdf.sh`

---

## Next Steps

- [View Example Building →](/en/examples/green-terrace/)
- [BIM Integration →](/en/bim-integration/)
- [Templates →](/en/templates/)
