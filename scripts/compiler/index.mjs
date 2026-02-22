#!/usr/bin/env node

/**
 * Semantic Building Model (SBM) Compiler
 *
 * Compiles Markdown + YAML semantic entities into a unified building knowledge model.
 *
 * Usage:
 *   node scripts/compiler/index.mjs compile --input docs/en/examples/green-terrace --output build/green-terrace --country PL
 */

import { parseInput } from './stages/parse.mjs';
import { normalize } from './stages/normalize.mjs';
import { validate } from './stages/validate.mjs';
import { generateBimMapping } from './targets/bim-mapping.mjs';
import { generateComplianceReport } from './targets/compliance-report.mjs';
import { generateAssetRegister } from './targets/asset-register.mjs';
import { generateDigitalTwinSchema } from './targets/twin-schema.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '0.1.0';

// CLI argument parsing
function parseArgs(args) {
  const options = {
    command: args[2] || 'compile',
    input: null,
    output: null,
    country: 'PL',
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
  logger.info(`Mode: ${options.mode}\n`);

  const startTime = Date.now();

  try {
    // Stage 1: Parse
    logger.stage(1, 'Parse');
    logger.debug('Reading Markdown files and extracting YAML frontmatter...');
    const rawEntities = await parseInput(options.input, logger);
    logger.success(`Parsed ${rawEntities.length} entities`);
    logger.debug(`Entity types: ${[...new Set(rawEntities.map(e => e.documentType))].join(', ')}`);

    // Stage 2: Normalize
    logger.stage(2, 'Normalize & Enrich');
    logger.debug('Normalizing units, computing relationships, injecting jurisdiction pack...');
    const normalized = await normalize(rawEntities, options, logger);
    logger.success(`Normalized ${normalized.entities.spaces?.length || 0} spaces, ${normalized.entities.zones?.length || 0} zones, ${normalized.entities.requirements?.length || 0} requirements`);

    // Build SBM structure
    const sbm = {
      sbm_version: '0.1',
      generatedAt: new Date().toISOString(),
      compiler: {
        version: VERSION,
        mode: options.mode
      },
      ...normalized
    };

    // Stage 3: Validate
    logger.stage(3, 'Validate');
    logger.debug('Validating against JSON schema and checking referential integrity...');
    const validationResult = await validate(sbm, logger);

    if (validationResult.valid) {
      logger.success('Validation passed - no errors');
    } else {
      logger.error(`Validation failed with ${validationResult.errors.length} errors`);
      validationResult.errors.slice(0, 5).forEach(err => {
        logger.error(`  ${err.path}: ${err.message}`);
      });
      if (validationResult.errors.length > 5) {
        logger.warn(`  ... and ${validationResult.errors.length - 5} more errors`);
      }
      throw new Error('Validation failed');
    }

    // Stage 4: Compile Targets
    logger.stage(4, 'Compile Targets');
    logger.debug('Generating BIM mapping, compliance report, asset register, digital twin schema...');

    const bimMapping = generateBimMapping(sbm, logger);
    const complianceReport = generateComplianceReport(sbm, logger);
    const assetRegister = generateAssetRegister(sbm, logger);
    const digitalTwinSchema = generateDigitalTwinSchema(sbm, logger);

    logger.success('Generated 4 compilation targets');

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
    const bimMappingPath = path.join(options.output, 'bim_mapping.json');
    await fs.writeFile(
      bimMappingPath,
      JSON.stringify(bimMapping, null, 2),
      'utf-8'
    );
    logger.success(`Generated: ${bimMappingPath}`);

    const complianceReportPath = path.join(options.output, 'compliance_report.json');
    await fs.writeFile(
      complianceReportPath,
      JSON.stringify(complianceReport, null, 2),
      'utf-8'
    );
    logger.success(`Generated: ${complianceReportPath}`);

    const assetRegisterPath = path.join(options.output, 'asset_register.json');
    await fs.writeFile(
      assetRegisterPath,
      JSON.stringify(assetRegister, null, 2),
      'utf-8'
    );
    logger.success(`Generated: ${assetRegisterPath}`);

    const twinSchemaPath = path.join(options.output, 'twin_schema.json');
    await fs.writeFile(
      twinSchemaPath,
      JSON.stringify(digitalTwinSchema, null, 2),
      'utf-8'
    );
    logger.success(`Generated: ${twinSchemaPath}`);

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
      console.log('Usage: node scripts/compiler/index.mjs compile --input <path> --output <path> [--country <code>] [--verbose]');
      process.exit(1);
    }

    if (!options.output) {
      console.error('Error: --output is required');
      console.log('Usage: node scripts/compiler/index.mjs compile --input <path> --output <path> [--country <code>] [--verbose]');
      process.exit(1);
    }

    await compile(options);

  } else if (options.command === 'version') {
    console.log(`Semantic Building Model Compiler v${VERSION}`);

  } else if (options.command === 'help') {
    console.log(`
Semantic Building Model (SBM) Compiler v${VERSION}

USAGE:
  node scripts/compiler/index.mjs <command> [options]

COMMANDS:
  compile     Compile semantic entities to SBM JSON
  version     Show compiler version
  help        Show this help message

OPTIONS:
  --input <path>      Input directory containing Markdown entities (required)
  --output <path>     Output directory for sbm.json (required)
  --country <code>    ISO country code for jurisdiction pack (default: PL)
  --mode <mode>       Compilation mode: development | production (default: production)
  --verbose, -v       Enable verbose logging

EXAMPLES:
  # Compile Green Terrace example
  node scripts/compiler/index.mjs compile \\
    --input docs/en/examples/green-terrace \\
    --output build/green-terrace \\
    --country PL

  # Verbose compilation
  node scripts/compiler/index.mjs compile \\
    --input docs/en/examples/green-terrace \\
    --output build/green-terrace \\
    --verbose
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
