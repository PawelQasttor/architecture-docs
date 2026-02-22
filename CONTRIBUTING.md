# Contributing to Architecture Documentation Standard

Thank you for your interest in contributing! This standard is a community effort to improve architectural documentation for the AI age.

## Ways to Contribute

### 1. Report Issues

Found a problem? Let us know:

- **Documentation errors** - Typos, unclear explanations, broken links
- **Technical issues** - BIM sync bugs, PDF export problems
- **Regulatory updates** - Changes to Polish building codes
- **Feature requests** - Ideas for improvements

[Open an issue →](https://github.com/architecture-docs/standard/issues)

### 2. Improve Documentation

Help make the docs better:

- Fix typos and grammar
- Clarify confusing sections
- Add examples
- Translate to Polish
- Add diagrams and illustrations

### 3. Add Examples

Share real-world projects (anonymized):

- Complete building documentation
- Element specifications
- Compliance checklists
- BIM integration workflows

### 4. Update Regulations

Keep regulatory content current:

- Polish building codes (Prawo budowlane, WT 2021)
- International standards (PN-EN, PN-ISO)
- New requirements
- Interpretation clarifications

### 5. Improve Tools

Enhance the tooling:

- BIM sync scripts
- PDF templates
- Validation scripts
- CI/CD workflows

### 6. Spread the Word

Help others discover the standard:

- Write blog posts
- Give presentations
- Share on social media
- Teach workshops

---

## Getting Started

### Prerequisites

- Git
- Node.js 18+ (for website)
- Python 3.8+ (for BIM sync tools)
- Basic markdown knowledge

### Setup

```bash
# Clone repository
git clone https://github.com/architecture-docs/standard.git
cd standard

# Install dependencies
npm install

# Start development server
npm run docs:dev

# Open http://localhost:5174
```

---

## Making Changes

### Documentation

1. **Find the file** to edit in `docs/en/` or `docs/pl/`
2. **Edit the markdown** file
3. **Preview changes** in browser (auto-reloads)
4. **Commit** with clear message

```bash
# Edit file
vim docs/en/regulations/wt-2021.md

# Preview at http://localhost:5174

# Commit
git add docs/en/regulations/wt-2021.md
git commit -m "Update WT 2021 thermal requirements"
```

### Examples

1. **Create folder** in `docs/en/examples/`
2. **Add markdown files** with proper frontmatter
3. **Update navigation** in `docs/.vitepress/config.ts`
4. **Validate** frontmatter

```bash
# Create example
mkdir docs/en/examples/my-project/
vim docs/en/examples/my-project/index.md

# Validate
npm run validate docs/en/examples/my-project/

# Test locally
npm run docs:dev
```

### BIM Sync Tools

1. **Edit Python scripts** in `bim-sync/`
2. **Test with sample IFC** files
3. **Update tests** if needed
4. **Document changes** in README

```bash
# Edit script
vim bim-sync/ifc-to-markdown.py

# Test
cd bim-sync/
python ifc-to-markdown.py test-files/sample.ifc

# Update docs
vim bim-sync/README.md
```

### PDF Templates

1. **Edit LaTeX template** in `templates/pandoc/`
2. **Test export** with sample documents
3. **Verify** Polish characters render correctly
4. **Document** changes

```bash
# Edit template
vim templates/pandoc/architectural-doc.latex

# Test
pandoc test.md -o test.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex

# Check PDF
open test.pdf
```

---

## Code Style

### Markdown

- Use **ATX-style headers** (`#` not `===`)
- **One sentence per line** (easier Git diffs)
- **Wrap at 80 characters** when possible
- **Use semantic line breaks**

**Good:**
```markdown
# Section Title

This is a sentence.
This is another sentence.

- List item one
- List item two
```

**Avoid:**
```markdown
Section Title
=============

This is a sentence. This is another sentence that goes on and on and wraps to multiple lines making diffs hard to read.

* List item one
* List item two
```

### YAML Frontmatter

- **Use 2-space indentation**
- **Quote strings with special characters**
- **Use arrays for lists**
- **Follow schema conventions**

**Good:**
```yaml
---
documentType: "element_specification"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
version: "1.0.0"
---
```

### Python

- Follow **PEP 8** style guide
- Use **meaningful variable names**
- **Document functions** with docstrings
- **Type hints** where helpful

**Good:**
```python
def extract_properties(element: any) -> dict:
    """Extract property sets from an IFC element.

    Args:
        element: IFC element to extract from

    Returns:
        Dictionary of property sets
    """
    psets = ifcopenshell.util.element.get_psets(element)
    return psets
```

### JavaScript/TypeScript

- Use **2-space indentation**
- **Semicolons required**
- **Single quotes** for strings
- **Descriptive names**

---

## Commit Messages

### Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **docs:** Documentation changes
- **feat:** New feature
- **fix:** Bug fix
- **refactor:** Code refactoring
- **test:** Add/update tests
- **chore:** Build, dependencies, etc.

### Examples

**Good:**
```
docs: update WT 2021 fire safety requirements

Added clarification for REI ratings in buildings over 25m.
Updated table with correct values from latest regulation.

Fixes #123
```

```
feat: add IFC 4.3 support to sync script

- Added IFC 4.3 schema support
- Updated property set mappings
- Backward compatible with IFC 4.0

Closes #45
```

**Avoid:**
```
updated stuff
```

```
fixes
```

---

## Pull Request Process

### Before Submitting

1. ✅ **Test your changes** locally
2. ✅ **Validate** frontmatter if applicable
3. ✅ **Build** successfully (`npm run docs:build`)
4. ✅ **Update** documentation
5. ✅ **Write clear** commit messages

### Submitting

1. **Fork** the repository
2. **Create branch** from `main`
3. **Make changes** and commit
4. **Push** to your fork
5. **Open pull request**

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/standard.git
cd standard
git checkout -b feature/my-improvement

# Make changes
git add .
git commit -m "docs: improve BIM sync guide"
git push origin feature/my-improvement

# Open PR on GitHub
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Documentation update
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Checklist
- [ ] Tested locally
- [ ] Documentation updated
- [ ] Frontmatter validated (if applicable)
- [ ] No breaking changes (or documented)

## Related Issues
Fixes #123
```

### Review Process

- Maintainers will review within **7 days**
- Address **feedback** in new commits
- Once approved, we'll **merge**
- Your contribution is **credited**

---

## Translation

Help translate to Polish!

### What to Translate

**Priority:**
- Homepage
- Standards overview
- Regulations (already Polish, needs review)
- Common templates

**Nice to have:**
- Examples
- Guides
- Technical references

### Process

1. **Copy** English file to Polish folder
2. **Translate** content
3. **Keep** frontmatter keys in English
4. **Translate** frontmatter values
5. **Update** navigation in config.ts

**Example:**
```bash
# Copy
cp docs/en/guides/pdf-export.md docs/pl/przewodniki/eksport-pdf.md

# Translate
vim docs/pl/przewodniki/eksport-pdf.md

# Update navigation
vim docs/.vitepress/config.ts
```

---

## Review Criteria

We review contributions for:

### Content

- ✅ **Accuracy** - Technically correct
- ✅ **Clarity** - Easy to understand
- ✅ **Completeness** - Covers the topic
- ✅ **Examples** - Practical demonstrations

### Code

- ✅ **Functionality** - Works as intended
- ✅ **Style** - Follows conventions
- ✅ **Documentation** - Well-documented
- ✅ **Tests** - Includes tests where appropriate

### Documentation

- ✅ **Grammar** - Proper spelling and grammar
- ✅ **Formatting** - Consistent markdown style
- ✅ **Structure** - Logical organization
- ✅ **Links** - All links work

---

## Questions?

- 💬 [GitHub Discussions](https://github.com/architecture-docs/standard/discussions)
- 📧 Email: contribute@architecture-docs.org
- 🐛 [GitHub Issues](https://github.com/architecture-docs/standard/issues)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

**Unacceptable behavior:**
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement

Violations can be reported to conduct@architecture-docs.org.
Maintainers will review and take appropriate action.

---

## Recognition

Contributors are recognized in:

- GitHub contributors page
- Release notes
- Annual contributor highlights
- Website credits (if desired)

Thank you for making architectural documentation better! 🏗️
