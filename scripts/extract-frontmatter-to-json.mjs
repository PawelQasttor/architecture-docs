#!/usr/bin/env node

/**
 * Extract YAML Frontmatter to JSON
 *
 * This script extracts YAML frontmatter from all markdown files
 * and generates standalone JSON files for AI/machine consumption.
 *
 * Usage:
 *   node extract-frontmatter-to-json.mjs [input-dir] [output-dir]
 *
 * Example:
 *   node extract-frontmatter-to-json.mjs docs/en/examples docs/public/json
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const inputDir = args[0] || 'docs';
const outputDir = args[1] || 'docs/public/json';

/**
 * Extract YAML frontmatter from markdown content
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  try {
    return yaml.load(match[1]);
  } catch (e) {
    console.error('Error parsing YAML:', e.message);
    return null;
  }
}

/**
 * Process a single markdown file
 */
function processMarkdownFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatter = extractFrontmatter(content);

  if (!frontmatter) {
    return null;
  }

  // Add metadata about the source file
  const enrichedData = {
    _metadata: {
      sourceFile: relativePath,
      extractedAt: new Date().toISOString(),
      format: 'yaml-frontmatter'
    },
    ...frontmatter
  };

  return enrichedData;
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir, baseDir = dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .vitepress
      if (item !== 'node_modules' && item !== '.vitepress' && item !== 'public') {
        findMarkdownFiles(fullPath, baseDir, files);
      }
    } else if (item.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

/**
 * Extract title from markdown or frontmatter
 */
function extractTitle(filePath, frontmatter) {
  if (frontmatter.title) {
    return frontmatter.title;
  }

  // Try to extract from first H1 in markdown
  const content = fs.readFileSync(filePath, 'utf8');
  const h1Match = content.match(/^#\s+(.+)$/m);

  return h1Match ? h1Match[1] : path.basename(filePath, '.md');
}

/**
 * Generate index organized by document type
 */
function generateTypeIndex(documents, outputDir) {
  const byType = {};

  for (const doc of documents) {
    const type = doc.documentType || 'unknown';
    if (!byType[type]) {
      byType[type] = [];
    }
    byType[type].push({
      sourceFile: doc._metadata.sourceFile,
      projectPhase: doc.projectPhase,
      bimLOD: doc.bimLOD
    });
  }

  const typeIndexPath = path.join(outputDir, 'by-document-type.json');
  fs.writeFileSync(typeIndexPath, JSON.stringify(byType, null, 2));
  console.log(`📊 Type index: ${typeIndexPath}`);

  // Generate by-phase index
  const byPhase = {};

  for (const doc of documents) {
    const phase = doc.projectPhase || 'unknown';
    if (!byPhase[phase]) {
      byPhase[phase] = [];
    }
    byPhase[phase].push({
      sourceFile: doc._metadata.sourceFile,
      documentType: doc.documentType,
      bimLOD: doc.bimLOD
    });
  }

  const phaseIndexPath = path.join(outputDir, 'by-project-phase.json');
  fs.writeFileSync(phaseIndexPath, JSON.stringify(byPhase, null, 2));
  console.log(`📊 Phase index: ${phaseIndexPath}`);
}

/**
 * Main extraction process
 */
function extractAll() {
  console.log(`🔍 Scanning for markdown files in: ${inputDir}`);

  const markdownFiles = findMarkdownFiles(inputDir);
  console.log(`📄 Found ${markdownFiles.length} markdown files`);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const extractedData = [];
  const index = {
    generatedAt: new Date().toISOString(),
    totalDocuments: 0,
    documents: []
  };

  for (const { fullPath, relativePath } of markdownFiles) {
    const data = processMarkdownFile(fullPath, relativePath);

    if (data) {
      // Create JSON file with same structure as markdown
      const jsonPath = relativePath.replace(/\.md$/, '.json');
      const outputPath = path.join(outputDir, jsonPath);

      // Create subdirectories if needed
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Write individual JSON file
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`✅ Extracted: ${relativePath} → ${jsonPath}`);

      // Add to collection
      extractedData.push(data);

      // Add to index
      index.documents.push({
        file: jsonPath,
        documentType: data.documentType || 'unknown',
        projectPhase: data.projectPhase || 'unknown',
        title: extractTitle(fullPath, data)
      });
    }
  }

  // Write aggregated data
  const aggregatedPath = path.join(outputDir, 'all-documents.json');
  fs.writeFileSync(aggregatedPath, JSON.stringify(extractedData, null, 2));
  console.log(`\n📦 Aggregated data: ${aggregatedPath}`);

  // Write index
  index.totalDocuments = index.documents.length;
  const indexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`📇 Index created: ${indexPath}`);

  // Generate by-type index
  generateTypeIndex(extractedData, outputDir);

  console.log(`\n✨ Extraction complete!`);
  console.log(`   ${index.totalDocuments} documents extracted`);
  console.log(`   Output directory: ${outputDir}`);
}

// Run extraction
try {
  extractAll();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
