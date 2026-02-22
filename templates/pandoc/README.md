# PDF Export Templates

Pandoc/LaTeX templates for generating professional PDF documents from markdown.

## Prerequisites

### 1. Install Pandoc

**Windows:**
```bash
choco install pandoc
# or download from https://pandoc.org/installing.html
```

**macOS:**
```bash
brew install pandoc
```

**Linux:**
```bash
sudo apt-get install pandoc
```

### 2. Install LaTeX (for PDF generation)

**Windows:**
- Install MiKTeX: https://miktex.org/download
- Or TeX Live: https://www.tug.org/texlive/

**macOS:**
```bash
brew install --cask mactex
```

**Linux:**
```bash
sudo apt-get install texlive-full
```

## Quick Start

### Basic PDF Export

```bash
# Single document
pandoc document.md -o document.pdf --template=architectural-doc.latex

# With table of contents
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --toc \
  --number-sections
```

### With Metadata

Add metadata to your markdown file:

```markdown
---
title: "External Wall Type A - Technical Specification"
subtitle: "Green Terrace Residential Building"
author: "Anna Nowak, Architect IARP #5678"
date: "2026-02-20"
project-name: "Green Terrace"
document-reference: "EW-01"
document-type: "Element Specification"
version: "1.5.0"
bim-lod: "LOD 400"
---

# Your content here...
```

### Export with Custom Options

```bash
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --variable geometry:margin=2.5cm \
  --variable fontsize=11pt \
  --variable papersize=a4
```

## Template Features

### ✅ Polish Character Support

Full UTF-8 support with proper Polish fonts:
- ą, ć, ę, ł, ń, ó, ś, ź, ż
- Proper hyphenation
- Polish babel support

### ✅ Professional Layout

- A4 paper size (configurable)
- 2.5cm margins (configurable)
- Headers with project name and document reference
- Footers with author, page numbers, date
- Professional title page
- Table of contents

### ✅ Styled Elements

- Color-coded section headings (architecture blue)
- Professional table formatting
- Code blocks with syntax highlighting
- Hyperlinks (clickable in PDF)
- Lists and bullet points

### ✅ Document Metadata Box

Automatically displays:
- Document type
- Reference number
- Version
- Date
- Author
- Project name
- BIM LOD

### ✅ Signature Page

Add signatures with metadata:

```yaml
signatures:
  - role: "Lead Architect"
    name: "Anna Nowak"
  - role: "Structural Engineer"
    name: "Piotr Kowalski"
```

## Advanced Usage

### Custom Geometry

```bash
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --variable geometry:"top=3cm,bottom=3cm,left=2cm,right=2cm"
```

### Different Paper Sizes

```bash
# A3
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --variable papersize=a3

# Letter (US)
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --variable papersize=letter
```

### Font Customization

```bash
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --variable fontsize=12pt \
  --variable fontfamily=times
```

### Suppress Title Page

```bash
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --variable title-page=false
```

## Batch Export

### Export All Documents in Directory

**Unix/macOS/Linux:**
```bash
#!/bin/bash
for md in *.md; do
    pandoc "$md" -o "${md%.md}.pdf" \
        --template=architectural-doc.latex \
        --toc \
        --number-sections
done
```

**Windows (PowerShell):**
```powershell
Get-ChildItem *.md | ForEach-Object {
    $output = $_.BaseName + ".pdf"
    pandoc $_.Name -o $output `
        --template=architectural-doc.latex `
        --toc `
        --number-sections
}
```

### Export with Makefile

Create `Makefile`:

```makefile
# Makefile for PDF export

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

Then:
```bash
make        # Export all
make clean  # Remove PDFs
```

## Examples

### Example 1: Project Specification

```yaml
---
title: "Project Specification"
subtitle: "Residential Building Green Terrace"
author: "Anna Nowak, Lead Architect"
project-name: "Green Terrace"
document-type: "Project Specification"
version: "2.0.0"
bim-lod: "LOD 400"
toc: true
number-sections: true
---
```

Export:
```bash
pandoc project-specification.md -o project-spec.pdf \
  --template=architectural-doc.latex \
  --toc \
  --number-sections
```

### Example 2: Element Specification

```yaml
---
title: "External Wall - Type A"
subtitle: "Technical Specification"
document-reference: "EW-01"
author: "Anna Nowak"
project-name: "Green Terrace"
document-type: "Element Specification"
version: "1.5.0"
bim-lod: "LOD 400"
show-metadata: true
signatures:
  - role: "Architect"
    name: "Anna Nowak"
  - role: "Structural Engineer"
    name: "Piotr Kowalski"
---
```

Export:
```bash
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=architectural-doc.latex \
  --toc \
  --number-sections
```

### Example 3: Compliance Checklist

```yaml
---
title: "Regulatory Compliance Checklist"
project-name: "Green Terrace"
document-type: "Compliance Checklist"
version: "1.0.0"
author: "Anna Nowak"
date: "2026-02-20"
---
```

Export:
```bash
pandoc compliance-checklist.md -o compliance.pdf \
  --template=architectural-doc.latex
```

## Troubleshooting

### "pandoc: command not found"

Install Pandoc (see Prerequisites above).

### "! LaTeX Error: File `babel.sty' not found"

Install full LaTeX distribution:
```bash
# macOS
brew install --cask mactex

# Linux
sudo apt-get install texlive-full
```

### Polish Characters Not Displaying

Ensure you're using XeLaTeX:
```bash
pandoc document.md -o document.pdf \
  --template=architectural-doc.latex \
  --pdf-engine=xelatex
```

### "pdflatex not found in PATH"

LaTeX not installed or not in PATH:
- Windows: Reinstall MiKTeX and add to PATH
- macOS: `export PATH="/Library/TeX/texbin:$PATH"`
- Linux: Install texlive

## Customization

### Modify Template

Edit `architectural-doc.latex`:

**Change colors:**
```latex
\definecolor{archblue}{RGB}{44,90,160}    % Section headings
\definecolor{archgray}{RGB}{100,100,100}  % Secondary text
```

**Change fonts:**
```latex
\usepackage{times}      % Times New Roman
\usepackage{palatino}   % Palatino
\usepackage{helvet}     % Helvetica
```

**Change margins:**
```latex
\geometry{
  a4paper,
  left=3cm,    % Adjust margins
  right=3cm,
  top=3.5cm,
  bottom=3.5cm
}
```

## Integration with Standard

### From Sample Building Project

```bash
cd templates/examples/sample-building/

# Export project specification
pandoc project-specification.md -o project-spec.pdf \
  --template=../../pandoc/architectural-doc.latex \
  --toc --number-sections

# Export wall specification
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=../../pandoc/architectural-doc.latex \
  --toc --number-sections
```

### Automated Export Script

Use the provided `build-pdf.sh` script:

```bash
chmod +x build-pdf.sh
./build-pdf.sh                    # Export all
./build-pdf.sh project-specification  # Export one
```

## Resources

- **Pandoc Manual**: https://pandoc.org/MANUAL.html
- **LaTeX Documentation**: https://www.latex-project.org/help/documentation/
- **Polish LaTeX**: http://www.latex.gda.pl/

## License

MIT License
