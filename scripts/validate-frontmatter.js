#!/usr/bin/env node
/**
 * YAML Frontmatter Validator
 * Validates markdown files for proper frontmatter structure and required fields
 *
 * Usage:
 *   node validate-frontmatter.js <file>
 *   node validate-frontmatter.js <directory>
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Required fields for different document types
const REQUIRED_FIELDS = {
  'element_specification': [
    'documentType',
    'elementType',
    'ifcMapping',
    'bimLOD',
    'version',
    'lastReviewed'
  ],
  'project_specification': [
    'documentType',
    'projectName',
    'buildingClassification',
    'regulatoryCompliance',
    'version',
    'lastReviewed'
  ],
  'compliance_checklist': [
    'documentType',
    'projectName',
    'regulatoryCompliance',
    'version'
  ],
  'material_specification': [
    'documentType',
    'materialType',
    'version'
  ]
};

// Valid BIM LOD values
const VALID_LOD = ['LOD_100', 'LOD_200', 'LOD_300', 'LOD_400', 'LOD_500'];

// Valid IFC entities
const VALID_IFC_ENTITIES = [
  'IfcWall',
  'IfcWallStandardCase',
  'IfcSlab',
  'IfcSlabStandardCase',
  'IfcWindow',
  'IfcDoor',
  'IfcColumn',
  'IfcBeam',
  'IfcStair',
  'IfcRoof',
  'IfcCovering'
];

class FrontmatterValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.filesValidated = 0;
    this.filesPassed = 0;
    this.filesFailed = 0;
  }

  /**
   * Extract frontmatter from markdown file
   */
  extractFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      return null;
    }
    return match[1];
  }

  /**
   * Parse YAML frontmatter
   */
  parseFrontmatter(yamlContent) {
    try {
      return yaml.load(yamlContent);
    } catch (e) {
      this.errors.push(`YAML parsing error: ${e.message}`);
      return null;
    }
  }

  /**
   * Validate required fields
   */
  validateRequiredFields(frontmatter) {
    const docType = frontmatter.documentType;
    const requiredFields = REQUIRED_FIELDS[docType];

    if (!requiredFields) {
      this.warnings.push(`Unknown document type: ${docType}`);
      return true; // Don't fail on unknown types
    }

    let valid = true;
    for (const field of requiredFields) {
      if (!this.hasField(frontmatter, field)) {
        this.errors.push(`Missing required field: ${field}`);
        valid = false;
      }
    }

    return valid;
  }

  /**
   * Check if nested field exists
   */
  hasField(obj, path) {
    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
      if (!current || typeof current !== 'object' || !(part in current)) {
        return false;
      }
      current = current[part];
    }

    return current !== null && current !== undefined;
  }

  /**
   * Validate BIM LOD
   */
  validateLOD(frontmatter) {
    if (!frontmatter.bimLOD) return true;

    if (!VALID_LOD.includes(frontmatter.bimLOD)) {
      this.errors.push(
        `Invalid BIM LOD: ${frontmatter.bimLOD}. Must be one of: ${VALID_LOD.join(', ')}`
      );
      return false;
    }

    return true;
  }

  /**
   * Validate IFC mapping
   */
  validateIFCMapping(frontmatter) {
    if (!frontmatter.ifcMapping) return true;

    const ifcEntity = frontmatter.ifcMapping.ifcEntity;
    if (!ifcEntity) {
      this.errors.push('ifcMapping.ifcEntity is required when ifcMapping is present');
      return false;
    }

    if (!VALID_IFC_ENTITIES.includes(ifcEntity)) {
      this.warnings.push(
        `Unknown IFC entity: ${ifcEntity}. Expected one of: ${VALID_IFC_ENTITIES.join(', ')}`
      );
    }

    // Check for globalId
    if (!frontmatter.ifcMapping.globalId) {
      this.warnings.push('ifcMapping.globalId is recommended for BIM integration');
    }

    return true;
  }

  /**
   * Validate version format
   */
  validateVersion(frontmatter) {
    if (!frontmatter.version) return true;

    const version = frontmatter.version;
    const semverPattern = /^\d+\.\d+\.\d+$/;

    if (!semverPattern.test(version)) {
      this.warnings.push(
        `Version should follow semantic versioning (e.g., 1.0.0): ${version}`
      );
    }

    return true;
  }

  /**
   * Validate date format
   */
  validateDate(frontmatter) {
    if (!frontmatter.lastReviewed) return true;

    const date = frontmatter.lastReviewed;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(date)) {
      this.errors.push(
        `lastReviewed must be in YYYY-MM-DD format: ${date}`
      );
      return false;
    }

    return true;
  }

  /**
   * Validate regulatory compliance
   */
  validateRegulatoryCompliance(frontmatter) {
    if (!frontmatter.regulatoryCompliance) return true;

    if (!Array.isArray(frontmatter.regulatoryCompliance)) {
      this.errors.push('regulatoryCompliance must be an array');
      return false;
    }

    let valid = true;
    for (const item of frontmatter.regulatoryCompliance) {
      if (!item.regulation && !item.standard) {
        this.errors.push(
          'Each regulatoryCompliance item must have either "regulation" or "standard"'
        );
        valid = false;
      }
    }

    return valid;
  }

  /**
   * Validate a single markdown file
   */
  validateFile(filePath) {
    console.log(`\n📄 Validating: ${filePath}`);
    this.errors = [];
    this.warnings = [];

    // Read file
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.log(`❌ Error reading file: ${e.message}`);
      this.filesFailed++;
      return false;
    }

    // Extract frontmatter
    const yamlContent = this.extractFrontmatter(content);
    if (!yamlContent) {
      console.log('❌ No frontmatter found');
      this.errors.push('Missing frontmatter (expected --- at start of file)');
      this.filesFailed++;
      return false;
    }

    // Parse frontmatter
    const frontmatter = this.parseFrontmatter(yamlContent);
    if (!frontmatter) {
      console.log('❌ Invalid YAML');
      this.filesFailed++;
      return false;
    }

    // Run validations
    let valid = true;
    valid = this.validateRequiredFields(frontmatter) && valid;
    valid = this.validateLOD(frontmatter) && valid;
    valid = this.validateIFCMapping(frontmatter) && valid;
    valid = this.validateVersion(frontmatter) && valid;
    valid = this.validateDate(frontmatter) && valid;
    valid = this.validateRegulatoryCompliance(frontmatter) && valid;

    // Report results
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(err => console.log(`  - ${err}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warn => console.log(`  - ${warn}`));
    }

    if (valid && this.warnings.length === 0) {
      console.log('✅ Valid!');
      this.filesPassed++;
    } else if (valid) {
      console.log('✅ Valid (with warnings)');
      this.filesPassed++;
    } else {
      console.log('❌ Invalid');
      this.filesFailed++;
    }

    this.filesValidated++;
    return valid;
  }

  /**
   * Validate all markdown files in a directory
   */
  validateDirectory(dirPath) {
    const files = this.findMarkdownFiles(dirPath);

    console.log(`\n🔍 Found ${files.length} markdown files in ${dirPath}`);

    for (const file of files) {
      this.validateFile(file);
    }
  }

  /**
   * Find all markdown files in directory recursively
   */
  findMarkdownFiles(dirPath) {
    const files = [];

    const scan = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules, .git, etc.
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            scan(fullPath);
          }
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Skip README files
          if (entry.name !== 'README.md') {
            files.push(fullPath);
          }
        }
      }
    };

    scan(dirPath);
    return files;
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files validated: ${this.filesValidated}`);
    console.log(`✅ Passed: ${this.filesPassed}`);
    console.log(`❌ Failed: ${this.filesFailed}`);
    console.log('='.repeat(60) + '\n');
  }
}

// Main
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node validate-frontmatter.js <file-or-directory>');
    console.log('\nExamples:');
    console.log('  node validate-frontmatter.js document.md');
    console.log('  node validate-frontmatter.js docs/en/examples/');
    process.exit(1);
  }

  const target = args[0];
  const validator = new FrontmatterValidator();

  // Check if target exists
  if (!fs.existsSync(target)) {
    console.log(`❌ Error: File or directory not found: ${target}`);
    process.exit(1);
  }

  // Validate file or directory
  const stats = fs.statSync(target);
  if (stats.isDirectory()) {
    validator.validateDirectory(target);
  } else {
    validator.validateFile(target);
  }

  // Print summary
  validator.printSummary();

  // Exit with error code if any files failed
  process.exit(validator.filesFailed > 0 ? 1 : 0);
}

// Only run if called directly
if (require.main === module) {
  main();
}

module.exports = FrontmatterValidator;
