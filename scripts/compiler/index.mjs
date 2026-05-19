#!/usr/bin/env node

/**
 * Semantic Building Model (SBM) Compiler v2.0.0
 *
 * Compiles Markdown + YAML semantic entities into a unified building knowledge model.
 * Supports data provenance tracking, quality summaries, phase gate enforcement,
 * cost rollup, simulation tracking, and BIM integration.
 *
 * Usage:
 *   node scripts/compiler/index.mjs compile --input docs/en/examples/green-terrace --output build/green-terrace --country PL
 *   node scripts/compiler/index.mjs compile --input project/ --output build/ --phase bidding_procurement --verbose
 */

import { parseInput } from './stages/parse.mjs';
import { normalize } from './stages/normalize.mjs';
import { validate } from './stages/validate.mjs';
import { generateQuality } from './stages/quality.mjs';
import { generateBimMapping } from './targets/bim-mapping.mjs';
import { generateComplianceReport } from './targets/compliance-report.mjs';
import { generateAssetRegister } from './targets/asset-register.mjs';
import { generateDigitalTwinSchema } from './targets/twin-schema.mjs';
import { generateQualityReport } from './targets/quality-report.mjs';
import { generateHtmlReport } from './targets/html-report.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '2.0.0';

// CLI argument parsing
function parseArgs(args) {
  const options = {
    command: args[2] || 'compile',
    input: null,
    output: null,
    country: 'PL',
    phase: 'design_development',
    verbose: false,
    mode: 'production'
  };

  for (let i = 3; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    if (arg === '--input' && next) {
      options.input = next;
      i++;
    } else if (arg === '--output' && next) {
      options.output = next;
      i++;
    } else if (arg === '--country' && next) {
      options.country = next;
      i++;
    } else if (arg === '--phase' && next) {
      // Accept a unified phase name or a legacy numeric phase (1-8).
      options.phase = /^\d+$/.test(next) ? Number(next) : next;
      i++;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--mode' && next) {
      options.mode = next;
      i++;
    }
  }

  return options;
}

// Logger utility
function createLogger(verbose) {
  return {
    info: (msg) => console.log(`ℹ️  ${msg}`),
    success: (msg) => console.log(`✅ ${msg}`),
    warn: (msg) => console.warn(`⚠️  ${msg}`),
    error: (msg) => console.error(`❌ ${msg}`),
    debug: (msg) => verbose && console.log(`🔍 ${msg}`),
    stage: (num, name) => console.log(`\n📍 Stage ${num}: ${name}`)
  };
}

// Main compile function
async function compile(options) {
  const logger = createLogger(options.verbose);

  logger.info(`Semantic Building Model Compiler v${VERSION}`);
  logger.info(`Input: ${options.input}`);
  logger.info(`Output: ${options.output}`);
  logger.info(`Country: ${options.country}`);
  logger.info(`Phase: ${options.phase}`);
  logger.info(`Mode: ${options.mode}\n`);

  const startTime = Date.now();

  try {
    // Stage 1: Parse
    logger.stage(1, 'Parse');
    logger.debug('Reading Markdown files and extracting YAML frontmatter...');
    const rawEntities = await parseInput(options.input, logger);
    logger.success(`Parsed ${rawEntities.length} entities`);
    logger.debug(`Entity types: ${[...new Set(rawEntities.map(e => e.documentType))].join(', ')}`);

    // Stage 2: Normalize & Resolve Inheritance
    logger.stage(2, 'Normalize, Enrich & Resolve Inheritance');
    logger.debug('Normalizing units, resolving type/level inheritance, computing relationships...');
    const normalized = await normalize(rawEntities, options, logger);
    logger.success(`Normalized ${normalized.entities.spaces?.length || 0} spaces, ${normalized.entities.zones?.length || 0} zones, ${normalized.entities.requirements?.length || 0} requirements`);
    if (normalized.entities.space_types?.length) {
      logger.success(`Type entities: ${normalized.entities.space_types.length} space types, ${normalized.entities.zone_types?.length || 0} zone types, ${normalized.entities.system_types?.length || 0} system types, ${normalized.entities.asset_types?.length || 0} asset types`);
    }

    // Build SBM structure
    const sbm = {
      sbm_version: '2.0',
      generatedAt: new Date().toISOString(),
      compiler: {
        version: VERSION,
        mode: options.mode
      },
      ...normalized
    };

    // Stage 3: Validate
    logger.stage(3, 'Validate');
    logger.debug('Validating against JSON schema v1.0, checking integrity, provenance, and phase gates...');
    const validationResult = await validate(sbm, logger);

    if (validationResult.valid) {
      logger.success('Validation passed - no errors');
    } else {
      logger.error(`Validation failed with ${validationResult.errors.length} errors`);
      validationResult.errors.slice(0, 10).forEach(err => {
        logger.error(`  ${err.path}: ${err.message}`);
      });
      if (validationResult.errors.length > 10) {
        logger.warn(`  ... and ${validationResult.errors.length - 10} more errors`);
      }
      throw new Error('Validation failed');
    }

    if (validationResult.warnings.length > 0) {
      logger.warn(`${validationResult.warnings.length} validation warnings`);
      validationResult.warnings.slice(0, 5).forEach(w => {
        logger.warn(`  ${w.path}: ${w.message}`);
      });
      if (validationResult.warnings.length > 5) {
        logger.warn(`  ... and ${validationResult.warnings.length - 5} more warnings`);
      }
    }

    // Stage 3.5: Quality Summaries
    logger.stage('3.5', 'Quality Summaries');
    logger.debug('Computing per-entity quality summaries and project quality...');
    const projectQuality = generateQuality(sbm, logger);
    logger.success(`Quality: avg completeness ${projectQuality.averageCompleteness}, ${projectQuality.totalEntities} entities analyzed`);

    // Stage 4: Compile Targets
    logger.stage(4, 'Compile Targets');
    logger.debug('Generating BIM mapping, compliance report, asset register, digital twin schema, quality report...');

    const bimMapping = generateBimMapping(sbm, logger);
    const complianceReport = generateComplianceReport(sbm, logger);
    const assetRegister = generateAssetRegister(sbm, logger);
    const digitalTwinSchema = generateDigitalTwinSchema(sbm, logger);
    const qualityReport = generateQualityReport(sbm, projectQuality, logger);
    const htmlReport = generateHtmlReport(
      sbm, projectQuality, complianceReport, qualityReport,
      Number(((Date.now() - startTime) / 1000).toFixed(2))
    );

    logger.success('Generated 6 compilation targets (5 JSON + HTML report)');

    // Ensure output directory exists
    await fs.mkdir(options.output, { recursive: true });

    // Write sbm.json
    const outputPath = path.join(options.output, 'sbm.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(sbm, null, 2),
      'utf-8'
    );
    logger.success(`Generated: ${outputPath}`);

    // Write compilation targets
    const targets = [
      ['bim_mapping.json', bimMapping],
      ['compliance_report.json', complianceReport],
      ['asset_register.json', assetRegister],
      ['twin_schema.json', digitalTwinSchema],
      ['quality_report.json', qualityReport]
    ];

    for (const [filename, data] of targets) {
      const targetPath = path.join(options.output, filename);
      await fs.writeFile(
        targetPath,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      logger.success(`Generated: ${targetPath}`);
    }

    // Write the human-readable HTML report (raw string, not JSON)
    const htmlPath = path.join(options.output, 'report.html');
    await fs.writeFile(htmlPath, htmlReport, 'utf-8');
    logger.success(`Generated: ${htmlPath}  ← open this one`);

    // Write validation report (if there were warnings)
    if (validationResult.warnings?.length > 0) {
      const warningsPath = path.join(options.output, 'warnings.json');
      await fs.writeFile(
        warningsPath,
        JSON.stringify({ warnings: validationResult.warnings }, null, 2),
        'utf-8'
      );
      logger.warn(`Warnings logged to: ${warningsPath}`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.success(`\n✨ Compilation complete in ${duration}s`);
    logger.info(`Output: ${options.output}/sbm.json`);
    logger.info(`Quality: ${options.output}/quality_report.json`);

    // Print phase readiness summary
    if (qualityReport.phaseReadiness) {
      const pr = qualityReport.phaseReadiness;
      if (pr.ready) {
        logger.success(`Phase readiness: ${pr.summary}`);
      } else {
        logger.warn(`Phase readiness: ${pr.summary}`);
      }
    }

    return sbm;

  } catch (error) {
    logger.error(`Compilation failed: ${error.message}`);
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Main CLI handler
async function main() {
  const options = parseArgs(process.argv);

  if (options.command === 'compile') {
    if (!options.input) {
      console.error('Error: --input is required');
      console.log('Usage: node scripts/compiler/index.mjs compile --input <path> --output <path> [--country <code>] [--phase <phase>] [--verbose]');
      process.exit(1);
    }

    if (!options.output) {
      console.error('Error: --output is required');
      console.log('Usage: node scripts/compiler/index.mjs compile --input <path> --output <path> [--country <code>] [--phase <phase>] [--verbose]');
      process.exit(1);
    }

    await compile(options);

  } else if (options.command === 'validate') {
    if (!options.input) {
      console.error('Error: --input is required');
      console.log('Usage: node scripts/compiler/index.mjs validate --input <path> [--country <code>] [--phase <phase>] [--verbose]');
      process.exit(1);
    }

    const logger = createLogger(options.verbose);
    logger.info(`Semantic Building Model Compiler v${VERSION} — Validate Mode`);
    logger.info(`Input: ${options.input}`);
    logger.info(`Country: ${options.country}`);
    logger.info(`Phase: ${options.phase}\n`);

    try {
      // Stage 1: Parse
      logger.stage(1, 'Parse');
      const rawEntities = await parseInput(options.input, logger);
      logger.success(`Parsed ${rawEntities.length} entities`);

      // Stage 2: Normalize
      logger.stage(2, 'Normalize');
      const normalized = await normalize(rawEntities, options, logger);
      logger.success(`Normalized ${normalized.entities.spaces?.length || 0} spaces, ${normalized.entities.zones?.length || 0} zones`);

      // Build SBM structure
      const sbm = {
        sbm_version: '2.0',
        generatedAt: new Date().toISOString(),
        compiler: { version: VERSION, mode: options.mode },
        ...normalized
      };

      // Stage 3: Validate
      logger.stage(3, 'Validate');
      const validationResult = await validate(sbm, logger);

      if (validationResult.valid) {
        logger.success('Validation passed — no errors');
      } else {
        logger.error(`Validation failed with ${validationResult.errors.length} errors`);
        validationResult.errors.forEach(err => {
          logger.error(`  ${err.path}: ${err.message}`);
        });
      }

      if (validationResult.warnings?.length > 0) {
        logger.warn(`${validationResult.warnings.length} warnings`);
        validationResult.warnings.forEach(w => {
          logger.warn(`  ${w.path}: ${w.message}`);
        });
      }

      if (!validationResult.valid) {
        process.exit(1);
      }

      logger.success('\nValidation complete — project is valid');

    } catch (error) {
      console.error(`Validation failed: ${error.message}`);
      if (options.verbose) console.error(error.stack);
      process.exit(1);
    }

  } else if (options.command === 'version') {
    console.log(`Semantic Building Model Compiler v${VERSION}`);

  } else if (options.command === 'help') {
    console.log(`
Semantic Building Model (SBM) Compiler v${VERSION}

USAGE:
  node scripts/compiler/index.mjs <command> [options]

COMMANDS:
  compile     Compile semantic entities to SBM JSON
  validate    Validate entities without generating output files
  version     Show compiler version
  help        Show this help message

OPTIONS:
  --input <path>      Input directory containing Markdown entities (required)
  --output <path>     Output directory for sbm.json (required for compile)
  --country <code>    ISO country code for jurisdiction pack (default: PL)
  --phase <name>      Unified lifecycle phase for gate enforcement
                      (default: design_development). Accepts a unified phase
                      name (concept … decommissioned) or a legacy number 1-8.
  --mode <mode>       Compilation mode: development | production (default: production)
  --verbose, -v       Enable verbose logging

UNIFIED PHASES (canonical lifecycle order):
  concept · schematic_design · design_development · construction_documents ·
  bidding_procurement · construction · commissioning · operation ·
  renovation · decommissioned

PHASE GATES (confidence strictness):
  before construction_documents  All confidence levels accepted
  from   construction_documents  Warns for 'assumed' confidence fields
  from   bidding_procurement     Errors for 'assumed' confidence on any field
  from   commissioning           Errors for 'estimated' on safety-critical fields

EXAMPLES:
  # Compile Green Terrace example (design_development, default)
  node scripts/compiler/index.mjs compile \\
    --input docs/en/examples/green-terrace \\
    --output build/green-terrace \\
    --country PL

  # Compile with bidding_procurement enforcement (strict)
  node scripts/compiler/index.mjs compile \\
    --input project/entities \\
    --output build/project \\
    --phase bidding_procurement --verbose

  # Compile hospital project (construction_documents — warns on assumed data)
  node scripts/compiler/index.mjs compile \\
    --input real_examples/kpcpulm-blok-d \\
    --output build/kpcpulm \\
    --phase construction_documents --country PL --verbose
    `);

  } else {
    console.error(`Unknown command: ${options.command}`);
    console.log('Run "node scripts/compiler/index.mjs help" for usage information');
    process.exit(1);
  }
}

// Run CLI if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

export { compile };
