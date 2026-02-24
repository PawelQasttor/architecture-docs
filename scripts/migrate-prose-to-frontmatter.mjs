#!/usr/bin/env node

/**
 * Migration Script: Prose Markdown → YAML Frontmatter
 *
 * Converts hospital project files from bold-label prose format to
 * YAML frontmatter that the SBM Compiler v0.2.0 can parse.
 *
 * Usage:
 *   node scripts/migrate-prose-to-frontmatter.mjs --input real_examples/kpcpulm-blok-d
 *   node scripts/migrate-prose-to-frontmatter.mjs --input real_examples/kpcpulm-blok-d --dry-run
 */

import fs from 'fs/promises';
import path from 'path';

// --- CLI ---
function parseArgs(args) {
  const options = { input: null, dryRun: false };
  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) { options.input = args[i + 1]; i++; }
    if (args[i] === '--dry-run') { options.dryRun = true; }
  }
  return options;
}

// --- File Discovery ---
async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// --- Regex Extractors ---

function extractField(content, pattern) {
  const m = content.match(pattern);
  return m ? m[1].trim() : null;
}

function extractBacktickField(content, pattern) {
  const m = content.match(pattern);
  if (!m) return null;
  // Strip backticks from value
  return m[1].replace(/`/g, '').trim();
}

function stripBackticks(val) {
  return val ? val.replace(/`/g, '').trim() : null;
}

function euroDecimalToNumber(val) {
  if (!val) return null;
  // "45,85" → 45.85; "1 487,70" → 1487.70
  const cleaned = val.replace(/\s/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

// --- Entity Detection ---
function detectEntityType(content) {
  const typeMatch = content.match(/\*\*Typ encji:\*\*\s+(.+?)$/m);
  if (!typeMatch) return null;
  const raw = typeMatch[1].trim().toLowerCase();
  const map = {
    'space': 'space',
    'level': 'level',
    'building': 'building',
    'zone': 'zone',
    'requirement': 'requirement',
  };
  return map[raw] || null;
}

// --- Space Extraction ---
function extractSpace(content) {
  const fm = {
    documentType: 'space',
    entityType: 'space',
  };

  // ID
  const idMatch = content.match(/\*\*ID:\*\*\s+`([^`]+)`/);
  if (idMatch) fm.id = idMatch[1];

  // Name
  const nameMatch = content.match(/\*\*Nazwa:\*\*\s+(.+?)$/m);
  if (nameMatch) fm.spaceName = nameMatch[1].trim();

  // Room number
  const roomMatch = content.match(/\*\*Numer pomieszczenia:\*\*\s+([\d.]+)/);
  if (roomMatch) fm.roomNumber = roomMatch[1];

  // Building
  const bldMatch = content.match(/\*\*Budynek:\*\*\s+`([^`]+)`/);
  if (bldMatch) fm.buildingId = bldMatch[1];

  // Level
  const lvlMatch = content.match(/\*\*Poziom:\*\*\s+`([^`]+)`/);
  if (lvlMatch) fm.levelId = lvlMatch[1];

  // Department
  const deptMatch = content.match(/\*\*Dzia[łl]?:\*\*\s+(?:`([^`]+)`|(.+?))$/m);
  if (deptMatch) {
    const dept = deptMatch[1] || deptMatch[2];
    if (dept && dept.startsWith('DEPT-')) {
      fm.departmentId = dept.trim();
    }
  }

  // Area
  const areaMatch = content.match(/\*\*Powierzchnia\s+\w+:\*\*\s+([\d\s,]+)\s*m/);
  if (areaMatch) {
    const area = euroDecimalToNumber(areaMatch[1]);
    if (area) fm.designArea = area;
  }

  // Zone IDs - extract all backtick-wrapped ZONE- references from Strefy section
  const zoneIds = [];
  const zoneRegex = /`(ZONE-[^`]+)`/g;
  let zm;
  while ((zm = zoneRegex.exec(content)) !== null) {
    if (!zoneIds.includes(zm[1])) zoneIds.push(zm[1]);
  }
  if (zoneIds.length > 0) fm.zoneIds = zoneIds;

  // Lifecycle state
  if (/\*\*Status:\*\*\s+planned/i.test(content)) {
    fm.lifecycleState = 'planned';
  } else if (/\*\*Status:\*\*\s+design/i.test(content)) {
    fm.lifecycleState = 'design';
  }

  // Electrical safety group (IEC 60364-7-710)
  const iecMatch = content.match(/Grupa\s+(\d)\s*\*?\*?\s*\(?\s*(?:zagro[żz]enie|kontakt|bez)/i)
    || content.match(/\*\*Grupa\s+(\d)\*\*/);
  if (iecMatch) {
    const groupMap = { '0': 'group_0', '1': 'group_1', '2': 'group_2' };
    fm.electricalSafetyGroup = groupMap[iecMatch[1]] || 'standard';
  }

  // Version
  fm.version = '0.1.0';

  return fm;
}

// --- Level Extraction ---
function extractLevel(content) {
  const fm = {
    documentType: 'level',
    entityType: 'level',
  };

  // ID
  const idMatch = content.match(/\*\*ID:\*\*\s+(?:`([^`]+)`|([A-Z][A-Z0-9-]+))/);
  if (idMatch) fm.id = idMatch[1] || idMatch[2];

  // Name
  const nameMatch = content.match(/\*\*Nazwa:\*\*\s+(.+?)$/m);
  if (nameMatch) fm.levelName = nameMatch[1].trim();

  // Building
  const bldMatch = content.match(/\*\*Budynek:\*\*\s+`([^`]+)`/);
  if (bldMatch) fm.buildingId = bldMatch[1];

  // Level number
  const numMatch = content.match(/\*\*Numer poziomu:\*\*\s+(-?\d+)/);
  if (numMatch) fm.levelNumber = parseInt(numMatch[1]);

  // Typical ceiling height - extract from "Wysokość pomieszczeń w świetle"
  const heightMatch = content.match(/Wysoko[śs][ćc]\s+pomieszcze[ńn]\s+w\s+[śs]wietle:\*?\*?\s+([\d,]+)\s*m/i);
  if (heightMatch) {
    fm.typicalCeilingHeight = euroDecimalToNumber(heightMatch[1]);
  }

  fm.version = '0.1.0';
  return fm;
}

// --- Building Extraction ---
function extractBuilding(content) {
  const fm = {
    documentType: 'building',
    entityType: 'building',
  };

  // ID
  const idMatch = content.match(/\*\*ID:\*\*\s+(?:`([^`]+)`|([A-Z][A-Z0-9-]+))/);
  if (idMatch) fm.id = idMatch[1] || idMatch[2];

  // Name
  const nameMatch = content.match(/\*\*Nazwa:\*\*\s+(.+?)$/m);
  if (nameMatch) fm.name = nameMatch[1].trim();

  // If no **Nazwa:**, try extracting from the H1 heading
  if (!fm.name) {
    const h1Match = content.match(/^#\s+(?:Budynek:\s+)?(.+?)$/m);
    if (h1Match) fm.name = h1Match[1].trim();
  }

  fm.version = '0.1.0';
  return fm;
}

// --- Zone Extraction ---
function extractZone(content, filePath) {
  const fm = {
    documentType: 'zone',
    entityType: 'zone',
  };

  // ID
  const idMatch = content.match(/\*\*ID:\*\*\s+(?:`([^`]+)`|([A-Z][A-Z0-9-]+))/);
  if (idMatch) fm.id = idMatch[1] || idMatch[2];

  // Name
  const nameMatch = content.match(/\*\*Nazwa:\*\*\s+(.+?)$/m);
  if (nameMatch) fm.zoneName = nameMatch[1].trim();

  // If no **Nazwa:**, try H1
  if (!fm.zoneName) {
    const h1Match = content.match(/^#\s+(?:Strefa:\s+)?(.+?)$/m);
    if (h1Match) fm.zoneName = h1Match[1].trim();
  }

  // Zone type inference
  const fname = path.basename(filePath).toLowerCase();
  if (fname.includes('pozarowa') || fname.includes('fire') || (fm.zoneName && fm.zoneName.toLowerCase().includes('po\u017car'))) {
    fm.zoneType = 'fire';
  } else if (fname.includes('medyczn') || fname.includes('grupa')) {
    // Medical zones - closest match in schema is "security" or generic
    // Actually IEC 60364-7-710 medical zones are closest to "security" in our enum
    // But let's be pragmatic and pick the closest
    fm.zoneType = 'security';
  } else {
    fm.zoneType = 'fire'; // default fallback
  }

  // Building
  const bldMatch = content.match(/\*\*Budynek:\*\*\s+`([^`]+)`/);
  if (bldMatch) fm.buildingId = bldMatch[1];

  // If no building in content, default to known building
  if (!fm.buildingId) fm.buildingId = 'BLD-KPCPULM-BLOK-D';

  fm.version = '0.1.0';
  return fm;
}

// --- Requirement Extraction ---
function extractRequirement(content) {
  const fm = {
    documentType: 'requirement',
    entityType: 'requirement',
  };

  // ID
  const idMatch = content.match(/\*\*ID:\*\*\s+(?:`([^`]+)`|([A-Z][A-Z0-9-]+))/);
  if (idMatch) fm.id = idMatch[1] || idMatch[2];

  // Name
  const nameMatch = content.match(/\*\*Nazwa:\*\*\s+(.+?)$/m);
  if (nameMatch) {
    fm.requirementName = nameMatch[1].trim();
  } else {
    // Try H1
    const h1Match = content.match(/^#\s+(?:Wymaganie:\s+)?(.+?)$/m);
    if (h1Match) fm.requirementName = h1Match[1].trim();
  }

  // For hospital IEC requirement, set structured fields
  fm.requirementType = 'safety';
  fm.countryScope = 'global';
  fm.scope = {
    entityType: 'space',
  };
  fm.metric = 'electrical_safety_group';
  fm.operator = '==';
  fm.value = 'group_2';
  fm.verification = {
    method: 'inspection',
    phase: ['construction', 'as_built'],
  };

  fm.version = '0.1.0';
  return fm;
}

// --- YAML Serializer (simple, no external deps) ---
function toYaml(obj, indent = 0) {
  const prefix = '  '.repeat(indent);
  let yaml = '';

  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) continue;

    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      // Check if array of objects or primitives
      if (typeof val[0] === 'object' && val[0] !== null) {
        yaml += `${prefix}${key}:\n`;
        for (const item of val) {
          const entries = Object.entries(item);
          yaml += `${prefix}  - ${entries[0][0]}: ${quote(entries[0][1])}\n`;
          for (let i = 1; i < entries.length; i++) {
            yaml += `${prefix}    ${entries[i][0]}: ${quote(entries[i][1])}\n`;
          }
        }
      } else {
        yaml += `${prefix}${key}:\n`;
        for (const item of val) {
          yaml += `${prefix}  - ${quote(item)}\n`;
        }
      }
    } else if (typeof val === 'object') {
      yaml += `${prefix}${key}:\n`;
      yaml += toYaml(val, indent + 1);
    } else {
      yaml += `${prefix}${key}: ${quote(val)}\n`;
    }
  }

  return yaml;
}

function quote(val) {
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'string') {
    // Quote strings that could be misinterpreted
    if (/[:{}\[\],&*?|>!%@`#]/.test(val) || val === '' || val === 'true' || val === 'false' || val === 'null') {
      return `"${val.replace(/"/g, '\\"')}"`;
    }
    // Quote strings that start/end with spaces or look like numbers
    if (/^\d/.test(val) || /^\s/.test(val) || /\s$/.test(val)) {
      return `"${val.replace(/"/g, '\\"')}"`;
    }
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  return String(val);
}

// --- Migration Logic ---
function hasYamlFrontmatter(content) {
  return /^---\n/.test(content);
}

function buildMigratedContent(frontmatter, originalContent) {
  const yaml = toYaml(frontmatter);
  return `---\n${yaml}---\n\n${originalContent}`;
}

// --- Main ---
async function main() {
  const opts = parseArgs(process.argv);
  if (!opts.input) {
    console.error('Usage: node scripts/migrate-prose-to-frontmatter.mjs --input <dir> [--dry-run]');
    process.exit(1);
  }

  const inputDir = path.resolve(opts.input);
  console.log(`\nMigration: Prose Markdown → YAML Frontmatter`);
  console.log(`Input: ${inputDir}`);
  console.log(`Mode: ${opts.dryRun ? 'DRY RUN' : 'WRITE'}\n`);

  const files = await findMarkdownFiles(inputDir);
  console.log(`Found ${files.length} Markdown files\n`);

  const stats = {
    total: files.length,
    skipped: 0,
    migrated: 0,
    alreadyHasFrontmatter: 0,
    noEntityType: 0,
    errors: 0,
    byType: {},
  };

  for (const filePath of files) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const relPath = path.relative(inputDir, filePath);

      // Skip files that already have frontmatter
      if (hasYamlFrontmatter(content)) {
        stats.alreadyHasFrontmatter++;
        continue;
      }

      // Detect entity type
      const entityType = detectEntityType(content);
      if (!entityType) {
        stats.noEntityType++;
        continue;
      }

      // Extract frontmatter based on type
      let frontmatter;
      switch (entityType) {
        case 'space':
          frontmatter = extractSpace(content);
          break;
        case 'level':
          frontmatter = extractLevel(content);
          break;
        case 'building':
          frontmatter = extractBuilding(content);
          break;
        case 'zone':
          frontmatter = extractZone(content, filePath);
          break;
        case 'requirement':
          frontmatter = extractRequirement(content);
          break;
        default:
          stats.noEntityType++;
          continue;
      }

      // Validate we got an ID
      if (!frontmatter.id) {
        console.warn(`  WARN: No ID found in ${relPath}, skipping`);
        stats.errors++;
        continue;
      }

      stats.byType[entityType] = (stats.byType[entityType] || 0) + 1;

      if (opts.dryRun) {
        console.log(`  [DRY] ${relPath} → ${entityType} (${frontmatter.id})`);
      } else {
        const migrated = buildMigratedContent(frontmatter, content);
        await fs.writeFile(filePath, migrated, 'utf-8');
      }

      stats.migrated++;
    } catch (err) {
      const relPath = path.relative(inputDir, filePath);
      console.error(`  ERROR: ${relPath}: ${err.message}`);
      stats.errors++;
    }
  }

  console.log(`\n--- Migration Summary ---`);
  console.log(`Total files:          ${stats.total}`);
  console.log(`Migrated:             ${stats.migrated}`);
  console.log(`Already frontmatter:  ${stats.alreadyHasFrontmatter}`);
  console.log(`No entity type:       ${stats.noEntityType}`);
  console.log(`Errors:               ${stats.errors}`);
  console.log(`\nBy entity type:`);
  for (const [type, count] of Object.entries(stats.byType)) {
    console.log(`  ${type}: ${count}`);
  }

  if (opts.dryRun) {
    console.log(`\n(Dry run - no files were modified)`);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
