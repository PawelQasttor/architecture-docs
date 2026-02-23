/**
 * Stage 1: Parse
 *
 * Reads Markdown files with YAML frontmatter and extracts semantic entities.
 */

import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Recursively find all Markdown files in a directory
 */
async function findMarkdownFiles(dir, fileList = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .vitepress, public
      if (!['node_modules', '.vitepress', 'public'].includes(entry.name)) {
        await findMarkdownFiles(fullPath, fileList);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

/**
 * Extract YAML frontmatter from Markdown content
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  try {
    const frontmatter = yaml.load(match[1]);
    return frontmatter;
  } catch (error) {
    throw new Error(`Failed to parse YAML frontmatter: ${error.message}`);
  }
}

/**
 * Parse a single Markdown file
 */
async function parseFile(filePath, inputDir) {
  const content = await fs.readFile(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content);

  if (!frontmatter) {
    return null; // No frontmatter, skip
  }

  // Only parse semantic entities and legacy document types
  const validTypes = [
    'space', 'zone', 'system', 'asset_instance', 'requirement',
    'building', 'level',
    'space_type', 'zone_type', 'system_type', 'asset_type',
    'element_specification', 'project_specification'
  ];

  if (!validTypes.includes(frontmatter.documentType)) {
    return null; // Not a semantic entity or legacy doc
  }

  // Add metadata
  const relativePath = path.relative(inputDir, filePath);
  const entity = {
    ...frontmatter,
    _metadata: {
      sourceFile: relativePath,
      parsedAt: new Date().toISOString()
    }
  };

  return entity;
}

/**
 * Main parse function
 *
 * @param {string} inputDir - Directory to scan for Markdown files
 * @param {object} logger - Logger instance
 * @returns {Promise<Array>} - Array of parsed entities
 */
export async function parseInput(inputDir, logger) {
  logger.debug(`Scanning directory: ${inputDir}`);

  // Find all Markdown files
  const files = await findMarkdownFiles(inputDir);
  logger.debug(`Found ${files.length} Markdown files`);

  // Parse each file
  const entities = [];
  let skipped = 0;

  for (const file of files) {
    try {
      const entity = await parseFile(file, inputDir);
      if (entity) {
        entities.push(entity);
        logger.debug(`  ✓ ${entity._metadata.sourceFile} (${entity.documentType})`);
      } else {
        skipped++;
      }
    } catch (error) {
      logger.warn(`Failed to parse ${file}: ${error.message}`);
    }
  }

  if (skipped > 0) {
    logger.debug(`Skipped ${skipped} files (no frontmatter or non-entity documents)`);
  }

  return entities;
}
