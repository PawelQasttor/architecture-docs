# Guides

Step-by-step guides for using the Architecture Documentation Standard in your projects.

## Getting Started

### [PDF Export Guide →](./pdf-export)

Learn how to convert markdown documentation to professional PDF documents.

**What you'll learn:**
- Install Pandoc and LaTeX
- Export single documents
- Batch export multiple files
- Customize PDF output
- Troubleshoot common issues

**Perfect for:**
- Building permit submissions
- Client presentations
- Official documentation

---

## Advanced Workflows

### BIM Integration

Learn how to synchronize between BIM models and markdown documentation.

**IFC to Markdown:**
- [Bi-directional Sync →](/en/bim-integration/bidirectional-sync)
- Extract element data from IFC files
- Update documentation from BIM models
- Version control BIM data

**Topics covered:**
- IFC export from Revit/ArchiCAD
- Python sync scripts
- Property set extraction
- Material layer documentation

---

## Project Workflows

### Starting a New Project

1. **Choose a template** from [Templates →](/en/templates/)
2. **Copy to your project** folder
3. **Update frontmatter** with project details
4. **Write specifications** following the standard
5. **Export to PDF** for submissions

### Documenting Existing Buildings

1. **Export IFC** from BIM model
2. **Run sync script** to generate markdown
3. **Enhance documentation** with compliance info
4. **Version control** with Git
5. **Export PDFs** as needed

### Compliance Documentation

1. **Review regulations** in [Regulations →](/en/regulations/)
2. **Use compliance checklist** template
3. **Reference requirements** in frontmatter
4. **Document verification** in content
5. **Export** for regulatory review

---

## Tools & Scripts

### Validation

**Validate frontmatter:**
```bash
npm run validate path/to/document.md
```

**Validate all examples:**
```bash
npm run validate:examples
```

### BIM Sync

**Extract from IFC:**
```bash
cd bim-sync/
python ifc-to-markdown.py building.ifc
```

### PDF Export

**Single document:**
```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex
```

**Batch export:**
```bash
./build-pdf.sh
```

---

## Tips & Best Practices

### Documentation

✅ **Use consistent naming**
- Match BIM element names
- Use descriptive file names
- Follow naming conventions

✅ **Version everything**
- Git commit regularly
- Tag releases
- Document changes

✅ **Validate frequently**
- Run validation before commits
- Check frontmatter structure
- Verify required fields

### BIM Integration

✅ **Maintain property sets**
- Fill in all Psets
- Use consistent values
- Keep BIM model updated

✅ **Sync regularly**
- Weekly during design
- As-needed during construction
- Final sync for as-built

### PDF Export

✅ **Review before submitting**
- Check all pages
- Verify Polish characters
- Ensure tables fit
- Test hyperlinks

---

## Common Workflows

### Weekly Design Review

```bash
# 1. Export latest IFC
# (from Revit/ArchiCAD)

# 2. Update documentation
cd bim-sync/
python ifc-to-markdown.py latest-model.ifc

# 3. Review changes
git diff

# 4. Commit
git commit -m "Weekly sync from BIM v1.3"

# 5. Export PDFs for review
cd ../docs/
./build-pdf.sh
```

### Building Permit Submission

```bash
# 1. Finalize documentation
# Edit all required documents

# 2. Validate
npm run validate:examples

# 3. Export to PDF
cd docs/permit-submission/
./build-pdf.sh

# 4. Review PDFs
# Check all documents

# 5. Submit
# Upload PDFs to permit portal
```

### As-Built Documentation

```bash
# 1. Export final IFC
# (verified as-built model)

# 2. Generate documentation
python ifc-to-markdown.py as-built.ifc -o docs/as-built/

# 3. Add verification data
# Fill in test results, certificates

# 4. Export PDFs
cd docs/as-built/
./build-pdf.sh

# 5. Archive
git tag v-as-built
git archive -o project-archive.zip HEAD
```

---

## Troubleshooting

### Common Issues

**Problem:** Validation fails
**Solution:** Check [frontmatter requirements](/en/standards/frontmatter-schema)

**Problem:** PDF export errors
**Solution:** See [PDF Export Guide](/en/guides/pdf-export#troubleshooting)

**Problem:** IFC sync fails
**Solution:** See [Bi-directional Sync](/en/bim-integration/bidirectional-sync#troubleshooting)

**Problem:** Polish characters broken
**Solution:** Use XeLaTeX: `--pdf-engine=xelatex`

---

## Video Tutorials

*(future)*

- Getting Started (10 min)
- BIM to Markdown Workflow (15 min)
- PDF Export Mastery (10 min)
- Full Project Walkthrough (30 min)

---

## Need Help?

- 📖 [Documentation](/en/standards/)
- 💬 [GitHub Discussions](https://github.com/architecture-docs/standard/discussions)
- 🐛 [Report Issues](https://github.com/architecture-docs/standard/issues)
- 📧 [Contact](mailto:support@architecture-docs.org)

---

## Next Steps

- [View Examples →](/en/examples/)
- [Browse Templates →](/en/templates/)
- [Learn BIM Integration →](/en/bim-integration/)
