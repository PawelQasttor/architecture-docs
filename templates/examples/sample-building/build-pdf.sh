#!/bin/bash
#
# PDF Export Script for Sample Building Project
# Converts markdown documentation to professional PDF using Pandoc
#
# Requirements:
#   - Pandoc (https://pandoc.org/)
#   - XeLaTeX (for PDF generation with Unicode support)
#   - LaTeX templates in ../../pandoc/
#
# Usage:
#   ./build-pdf.sh [document-name]
#
# Examples:
#   ./build-pdf.sh project-specification
#   ./build-pdf.sh external-wall-type-a
#   ./build-pdf.sh  (exports all documents)

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TEMPLATE_DIR="../../pandoc"
OUTPUT_DIR="./pdf-output"
TEMPLATE="architectural-doc.latex"  # Will be created in Phase 3

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to convert single document
convert_document() {
    local input_file="$1"
    local base_name=$(basename "$input_file" .md)
    local output_file="$OUTPUT_DIR/${base_name}.pdf"

    echo -e "${BLUE}Converting:${NC} $input_file"
    echo -e "${BLUE}Output:${NC} $output_file"

    # Check if Pandoc template exists
    if [ ! -f "$TEMPLATE_DIR/$TEMPLATE" ]; then
        echo -e "${YELLOW}Warning: Pandoc template not found. Using default template.${NC}"
        echo -e "${YELLOW}Template will be created in Phase 3.${NC}"

        # Use Pandoc with default template for now
        pandoc "$input_file" \
            -o "$output_file" \
            --pdf-engine=xelatex \
            --variable mainfont="DejaVu Sans" \
            --variable sansfont="DejaVu Sans" \
            --variable monofont="DejaVu Sans Mono" \
            --variable fontsize=11pt \
            --variable geometry:margin=2.5cm \
            --variable colorlinks=true \
            --variable linkcolor=blue \
            --variable urlcolor=blue \
            --variable toccolor=black \
            --toc \
            --number-sections
    else
        # Use custom template
        pandoc "$input_file" \
            -o "$output_file" \
            --template="$TEMPLATE_DIR/$TEMPLATE" \
            --pdf-engine=xelatex \
            --toc \
            --number-sections
    fi

    echo -e "${GREEN}✓ Generated:${NC} $output_file"
    echo ""
}

# Main execution
if [ $# -eq 0 ]; then
    # No arguments - convert all markdown files
    echo -e "${BLUE}=== Exporting All Documents to PDF ===${NC}"
    echo ""

    for md_file in *.md; do
        # Skip README
        if [ "$md_file" != "README.md" ]; then
            convert_document "$md_file"
        fi
    done

    echo -e "${GREEN}=== All documents exported ===${NC}"
    echo -e "${GREEN}Output directory:${NC} $OUTPUT_DIR"

else
    # Convert specified document
    input_file="$1"

    # Add .md extension if not present
    if [[ ! "$input_file" =~ \.md$ ]]; then
        input_file="${input_file}.md"
    fi

    if [ ! -f "$input_file" ]; then
        echo -e "${YELLOW}Error: File not found: $input_file${NC}"
        exit 1
    fi

    convert_document "$input_file"
fi

# List generated PDFs
echo -e "${BLUE}Generated PDFs:${NC}"
ls -lh "$OUTPUT_DIR"/*.pdf 2>/dev/null || echo "No PDFs generated"
