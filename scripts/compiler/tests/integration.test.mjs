/**
 * Integration Tests for the SBM Compiler
 *
 * Tests end-to-end compilation by chaining parse -> normalize -> validate -> quality,
 * and also tests the exported compile() function.
 *
 * Pipeline order (matches compiler index.mjs):
 *   1. Parse
 *   2. Normalize
 *   3. Validate (against schema - BEFORE quality adds _quality blocks)
 *   3.5. Quality (adds _quality blocks AFTER validation)
 *   4. Compile targets
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { parseInput } from '../stages/parse.mjs';
import { normalize } from '../stages/normalize.mjs';
import { validate } from '../stages/validate.mjs';
import { generateQuality } from '../stages/quality.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const MINIMAL_PROJECT = path.join(FIXTURES_DIR, 'minimal-project');

// Resolve the project root (4 levels up from tests dir: tests -> compiler -> scripts -> project-root)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');
const GREEN_TERRACE = path.join(PROJECT_ROOT, 'docs', 'en', 'examples', 'green-terrace');

/** Mock logger that silently discards all output */
function createMockLogger() {
  return {
    info: () => {},
    success: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
    stage: () => {}
  };
}

/**
 * Helper: run parse + normalize + build SBM structure (stages 1-2).
 * Returns the SBM object ready for validation.
 */
async function buildSbm(inputDir, options, logger) {
  const rawEntities = await parseInput(inputDir, logger);
  const normalized = await normalize(rawEntities, options, logger);
  return {
    sbm_version: '1.1',
    generatedAt: new Date().toISOString(),
    compiler: { version: '1.1.0', mode: 'production' },
    ...normalized
  };
}

describe('Integration: minimal-project end-to-end', () => {
  const logger = createMockLogger();
  const options = {
    country: 'PL',
    phase: 3,
    input: MINIMAL_PROJECT,
    mode: 'production',
    verbose: false
  };

  let sbm;
  let validationResult;

  before(async () => {
    // Stages 1-2: Parse + Normalize
    sbm = await buildSbm(MINIMAL_PROJECT, options, logger);

    // Stage 3: Validate (BEFORE quality, matching real pipeline)
    validationResult = await validate(sbm, logger);

    // Stage 3.5: Quality (AFTER validation, matching real pipeline)
    generateQuality(sbm, logger);
  });

  it('should have sbm_version field', () => {
    assert.equal(sbm.sbm_version, '1.1');
  });

  it('should have generatedAt timestamp', () => {
    assert.ok(sbm.generatedAt, 'should have generatedAt');
    const date = new Date(sbm.generatedAt);
    assert.ok(!isNaN(date.getTime()), 'generatedAt should be valid ISO date');
  });

  it('should have compiler metadata', () => {
    assert.ok(sbm.compiler, 'should have compiler');
    assert.ok(sbm.compiler.version, 'should have compiler version');
    assert.ok(sbm.compiler.mode, 'should have compiler mode');
  });

  it('should have project metadata', () => {
    assert.ok(sbm.project, 'should have project');
    assert.equal(sbm.project.id, 'PRJ-TEST');
    assert.equal(sbm.project.name, 'Test Project');
    assert.equal(sbm.project.country, 'PL');
  });

  it('should have entities object with correct arrays', () => {
    assert.ok(sbm.entities, 'should have entities');
    assert.ok(Array.isArray(sbm.entities.buildings), 'buildings should be array');
    assert.ok(Array.isArray(sbm.entities.levels), 'levels should be array');
    assert.ok(Array.isArray(sbm.entities.spaces), 'spaces should be array');
    assert.ok(Array.isArray(sbm.entities.zones), 'zones should be array');

    assert.equal(sbm.entities.buildings.length, 1);
    assert.equal(sbm.entities.levels.length, 1);
    assert.equal(sbm.entities.spaces.length, 1);
    assert.equal(sbm.entities.zones.length, 1);
  });

  it('should have metadata with entity counts', () => {
    assert.ok(sbm.metadata, 'should have metadata');
    assert.ok(sbm.metadata.totalEntities > 0, 'should have totalEntities > 0');
    assert.ok(sbm.metadata.entitiesByType, 'should have entitiesByType');
  });

  it('should pass schema validation (before quality stage)', () => {
    assert.equal(
      validationResult.valid, true,
      `validation should pass, errors: ${JSON.stringify(validationResult.errors)}`
    );
  });

  it('should have _quality blocks on entities after quality stage', () => {
    for (const space of sbm.entities.spaces) {
      assert.ok(space._quality, `space ${space.id} should have _quality`);
      assert.ok(typeof space._quality.completeness === 'number', 'completeness should be number');
      assert.ok(typeof space._quality.totalFields === 'number', 'totalFields should be number');
    }
  });

  it('should compute reverse relationships correctly', () => {
    // Zone should have received spaceIds from spaces that reference it
    const zone = sbm.entities.zones.find(z => z.id === 'ZONE-TEST-01');
    assert.ok(zone, 'zone should exist');
    assert.ok(Array.isArray(zone.spaceIds), 'zone should have spaceIds');
    assert.ok(zone.spaceIds.includes('SP-TEST-001'), 'zone should include the test space');

    // Level should have received spaceIds
    const level = sbm.entities.levels.find(l => l.id === 'LVL-TEST-01');
    assert.ok(level, 'level should exist');
    assert.ok(Array.isArray(level.spaceIds), 'level should have spaceIds');
    assert.ok(level.spaceIds.includes('SP-TEST-001'), 'level should include the test space');
  });
});

describe('Integration: Green Terrace example', () => {
  const logger = createMockLogger();
  let greenTerraceExists = false;

  before(async () => {
    try {
      await fs.access(GREEN_TERRACE);
      greenTerraceExists = true;
    } catch {
      greenTerraceExists = false;
    }
  });

  it('should compile Green Terrace without validation errors', async () => {
    if (!greenTerraceExists) {
      // Skip if the example directory does not exist
      return;
    }

    const options = {
      country: 'PL',
      phase: 3,
      input: GREEN_TERRACE,
      mode: 'production',
      verbose: false
    };

    // Stages 1-2: Parse + Normalize
    const sbm = await buildSbm(GREEN_TERRACE, options, logger);

    // Stage 3: Validate (BEFORE quality, matching compiler pipeline)
    const result = await validate(sbm, logger);

    assert.equal(result.valid, true, `Green Terrace should pass validation. Errors: ${JSON.stringify(result.errors)}`);

    // Should have key entity types (Green Terrace has no building entity, but has site/levels/spaces)
    assert.ok(sbm.entities.levels?.length > 0, 'should have levels');
    assert.ok(sbm.entities.spaces?.length > 0, 'should have spaces');
    assert.ok(sbm.entities.zones?.length > 0, 'should have zones');
  });

  it('should generate quality summaries for Green Terrace entities', async () => {
    if (!greenTerraceExists) {
      return;
    }

    const options = {
      country: 'PL',
      phase: 3,
      input: GREEN_TERRACE,
      mode: 'production',
      verbose: false
    };

    // Stages 1-2: Parse + Normalize
    const sbm = await buildSbm(GREEN_TERRACE, options, logger);

    // Stage 3: Validate first (matching pipeline order)
    const valResult = await validate(sbm, logger);
    assert.equal(valResult.valid, true, 'should pass validation before quality');

    // Stage 3.5: Generate quality
    const projectQuality = generateQuality(sbm, logger);

    assert.ok(projectQuality, 'should generate project quality');
    assert.ok(projectQuality.totalEntities > 0, 'should have totalEntities > 0');
    assert.ok(typeof projectQuality.averageCompleteness === 'number', 'averageCompleteness should be number');
    assert.ok(projectQuality.fieldsByConfidence, 'should have fieldsByConfidence');
  });
});

describe('Integration: compile() function', () => {
  let tempOutput;

  before(async () => {
    tempOutput = path.join(__dirname, 'fixtures', '_temp_compile_output');
  });

  after(async () => {
    try {
      await fs.rm(tempOutput, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should compile minimal-project and produce output files', async () => {
    const { compile } = await import('../index.mjs');

    // Override process.exit to prevent test runner from exiting on failure
    const originalExit = process.exit;
    let exitCode = null;
    process.exit = (code) => {
      exitCode = code;
      // Throw to break out of the compile function without actually exiting
      throw new Error(`process.exit(${code}) intercepted`);
    };

    let result;
    try {
      result = await compile({
        input: MINIMAL_PROJECT,
        output: tempOutput,
        country: 'PL',
        phase: 3,
        mode: 'production',
        verbose: false
      });
    } catch (err) {
      // If process.exit was called, the error message will contain the exit code
      if (!err.message.includes('process.exit')) {
        throw err; // Re-throw unexpected errors
      }
    } finally {
      process.exit = originalExit;
    }

    // If compilation succeeded, result is the SBM object and exitCode is null
    if (exitCode !== null) {
      assert.fail(`compile() called process.exit(${exitCode}) - compilation failed`);
    }

    assert.ok(result, 'compile should return SBM object');
    assert.equal(result.sbm_version, '1.1');

    // Check output files were created
    const sbmJsonPath = path.join(tempOutput, 'sbm.json');
    const sbmContent = await fs.readFile(sbmJsonPath, 'utf-8');
    const sbmData = JSON.parse(sbmContent);

    assert.equal(sbmData.sbm_version, '1.1');
    assert.ok(sbmData.project, 'output should have project');
    assert.ok(sbmData.entities, 'output should have entities');

    // Check target files were created
    const expectedTargets = [
      'bim_mapping.json',
      'compliance_report.json',
      'asset_register.json',
      'twin_schema.json',
      'quality_report.json'
    ];

    for (const target of expectedTargets) {
      const targetPath = path.join(tempOutput, target);
      const exists = await fs.access(targetPath).then(() => true).catch(() => false);
      assert.ok(exists, `${target} should be created in output directory`);
    }
  });
});
