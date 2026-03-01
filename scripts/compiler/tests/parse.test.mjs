/**
 * Tests for Stage 1: Parse
 *
 * Verifies that parseInput correctly reads Markdown files with YAML frontmatter,
 * extracts entity data, and handles edge cases.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { parseInput } from '../stages/parse.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const MINIMAL_PROJECT = path.join(FIXTURES_DIR, 'minimal-project');

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

describe('parseInput', () => {
  const logger = createMockLogger();

  describe('valid Markdown files with YAML frontmatter', () => {
    let entities;

    before(async () => {
      entities = await parseInput(MINIMAL_PROJECT, logger);
    });

    it('should return an array of parsed entities', () => {
      assert.ok(Array.isArray(entities), 'entities should be an array');
      assert.ok(entities.length > 0, 'entities array should not be empty');
    });

    it('should parse all 5 entity files from minimal-project', () => {
      assert.equal(entities.length, 5, 'should have parsed 5 entities (project, building, level, space, zone)');
    });

    it('should extract id from each entity', () => {
      const ids = entities.map(e => e.id);
      assert.ok(ids.includes('PRJ-TEST'), 'should include project');
      assert.ok(ids.includes('BLD-TEST'), 'should include building');
      assert.ok(ids.includes('LVL-TEST-01'), 'should include level');
      assert.ok(ids.includes('SP-TEST-001'), 'should include space');
    });

    it('should set documentType on each entity', () => {
      for (const entity of entities) {
        assert.ok(entity.documentType, `entity ${entity.id} should have documentType`);
      }
    });

    it('should set entityType on each entity', () => {
      for (const entity of entities) {
        assert.ok(entity.entityType, `entity ${entity.id} should have entityType`);
      }
    });

    it('should add _metadata with sourceFile and parsedAt', () => {
      for (const entity of entities) {
        assert.ok(entity._metadata, `entity ${entity.id} should have _metadata`);
        assert.ok(entity._metadata.sourceFile, `entity ${entity.id} should have _metadata.sourceFile`);
        assert.ok(entity._metadata.parsedAt, `entity ${entity.id} should have _metadata.parsedAt`);
      }
    });

    it('should preserve frontmatter fields on the entity object', () => {
      const space = entities.find(e => e.id === 'SP-TEST-001');
      assert.ok(space, 'space entity should exist');
      assert.equal(space.spaceName, 'Test Room');
      assert.equal(space.spaceType, 'bedroom');
      assert.equal(space.buildingId, 'BLD-TEST');
      assert.equal(space.levelId, 'LVL-TEST-01');
      assert.equal(space.area, 15.0);
      assert.deepEqual(space.zoneIds, ['ZONE-TEST-01']);
    });

    it('should set sourceFile as a relative path from inputDir', () => {
      const building = entities.find(e => e.id === 'BLD-TEST');
      assert.ok(building._metadata.sourceFile, 'should have sourceFile');
      // sourceFile should be relative, not absolute
      assert.ok(
        !path.isAbsolute(building._metadata.sourceFile),
        'sourceFile should be a relative path'
      );
    });
  });

  describe('entity type handling', () => {
    let tempDir;

    before(async () => {
      tempDir = path.join(__dirname, 'fixtures', '_temp_entity_types');
      await fs.mkdir(tempDir, { recursive: true });
    });

    after(async () => {
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should handle all known entity types', async () => {
      const types = [
        { entityType: 'space', id: 'SP-ET-001', spaceName: 'S', buildingId: 'BLD-X', levelId: 'LVL-X' },
        { entityType: 'zone', id: 'ZONE-ET-001' },
        { entityType: 'system', id: 'SYS-ET-001', systemName: 'S', systemCategory: 'hvac', buildingId: 'BLD-X' },
        { entityType: 'asset', id: 'AST-ET-001', assetName: 'A' },
        { entityType: 'requirement', id: 'REQ-ET-001' },
        { entityType: 'building', id: 'BLD-ET-001', name: 'B' },
        { entityType: 'level', id: 'LVL-ET-001', buildingId: 'BLD-ET-001' },
        { entityType: 'space_type', id: 'ST-ET-001' },
        { entityType: 'zone_type', id: 'ZT-ET-001' },
        { entityType: 'system_type', id: 'SYT-ET-001' },
        { entityType: 'asset_type', id: 'AT-ET-001' },
        { entityType: 'project_specification', id: 'PRJ-ET', projectName: 'Test' },
        { entityType: 'element_specification', id: 'ES-ET-001' }
      ];

      for (let i = 0; i < types.length; i++) {
        const data = { ...types[i], version: '1.0.0' };
        const yamlLines = Object.entries(data).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
        const content = `---\n${yamlLines.join('\n')}\n---\n\n# Entity ${i}\n`;
        await fs.writeFile(path.join(tempDir, `entity-${i}.md`), content, 'utf-8');
      }

      const entities = await parseInput(tempDir, logger);
      assert.equal(entities.length, types.length, `should parse all ${types.length} entity types`);

      const parsedTypes = entities.map(e => e.entityType);
      // asset_instance gets normalized to asset, but we used 'asset' directly
      assert.ok(parsedTypes.includes('space'), 'should include space');
      assert.ok(parsedTypes.includes('zone'), 'should include zone');
      assert.ok(parsedTypes.includes('system'), 'should include system');
      assert.ok(parsedTypes.includes('asset'), 'should include asset');
      assert.ok(parsedTypes.includes('building'), 'should include building');
      assert.ok(parsedTypes.includes('level'), 'should include level');
      assert.ok(parsedTypes.includes('space_type'), 'should include space_type');
      assert.ok(parsedTypes.includes('zone_type'), 'should include zone_type');
      assert.ok(parsedTypes.includes('system_type'), 'should include system_type');
      assert.ok(parsedTypes.includes('asset_type'), 'should include asset_type');
      assert.ok(parsedTypes.includes('element_specification'), 'should include element_specification');
    });

    it('should normalize asset_instance to asset', async () => {
      const content = `---\nentityType: "asset_instance"\nid: "AST-LEGACY-001"\nassetName: "Legacy Asset"\nversion: "1.0.0"\n---\n\n# Legacy Asset\n`;
      await fs.writeFile(path.join(tempDir, 'legacy-asset.md'), content, 'utf-8');

      const entities = await parseInput(tempDir, logger);
      const legacyAsset = entities.find(e => e.id === 'AST-LEGACY-001');
      assert.ok(legacyAsset, 'legacy asset should be parsed');
      assert.equal(legacyAsset.entityType, 'asset', 'entityType should be normalized from asset_instance to asset');
      assert.equal(legacyAsset.documentType, 'asset', 'documentType should be normalized from asset_instance to asset');
    });
  });

  describe('entityType vs documentType precedence', () => {
    let tempDir;

    before(async () => {
      tempDir = path.join(__dirname, 'fixtures', '_temp_precedence');
      await fs.mkdir(tempDir, { recursive: true });
    });

    after(async () => {
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should prefer entityType over documentType when both are present', async () => {
      const content = [
        '---',
        'entityType: "building"',
        'documentType: "space"',
        'id: "BLD-PREC-001"',
        'name: "Precedence Test"',
        'version: "1.0.0"',
        '---',
        '',
        '# Precedence Test'
      ].join('\n');

      await fs.writeFile(path.join(tempDir, 'precedence.md'), content, 'utf-8');
      const entities = await parseInput(tempDir, logger);

      assert.equal(entities.length, 1, 'should parse one entity');
      assert.equal(entities[0].entityType, 'building', 'entityType should take precedence');
      assert.equal(entities[0].documentType, 'building', 'documentType should be set to normalized entityType');
    });

    it('should fall back to documentType when entityType is not present', async () => {
      const content = [
        '---',
        'documentType: "building"',
        'id: "BLD-FALLBACK-001"',
        'name: "Fallback Test"',
        'version: "1.0.0"',
        '---',
        '',
        '# Fallback Test'
      ].join('\n');

      await fs.writeFile(path.join(tempDir, 'fallback.md'), content, 'utf-8');
      const entities = await parseInput(tempDir, logger);

      const entity = entities.find(e => e.id === 'BLD-FALLBACK-001');
      assert.ok(entity, 'should parse entity with documentType fallback');
      assert.equal(entity.entityType, 'building', 'entityType should be set from documentType');
    });
  });

  describe('files without YAML frontmatter', () => {
    let tempDir;

    before(async () => {
      tempDir = path.join(__dirname, 'fixtures', '_temp_no_frontmatter');
      await fs.mkdir(tempDir, { recursive: true });

      // File without frontmatter
      await fs.writeFile(
        path.join(tempDir, 'no-frontmatter.md'),
        '# Just a plain Markdown file\n\nNo YAML here.\n',
        'utf-8'
      );

      // File with valid entity
      await fs.writeFile(
        path.join(tempDir, 'valid.md'),
        '---\nentityType: "building"\nid: "BLD-NF-001"\nname: "Test"\nversion: "1.0.0"\n---\n\n# Test\n',
        'utf-8'
      );
    });

    after(async () => {
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should skip files without YAML frontmatter', async () => {
      const entities = await parseInput(tempDir, logger);
      assert.equal(entities.length, 1, 'should only parse the valid entity file');
      assert.equal(entities[0].id, 'BLD-NF-001');
    });
  });

  describe('files with non-entity frontmatter', () => {
    let tempDir;

    before(async () => {
      tempDir = path.join(__dirname, 'fixtures', '_temp_non_entity');
      await fs.mkdir(tempDir, { recursive: true });

      // VitePress page with non-entity frontmatter
      await fs.writeFile(
        path.join(tempDir, 'page.md'),
        '---\ntitle: "About Page"\nlayout: home\n---\n\n# About\n',
        'utf-8'
      );

      // Valid entity
      await fs.writeFile(
        path.join(tempDir, 'building.md'),
        '---\nentityType: "building"\nid: "BLD-NE-001"\nname: "Test"\nversion: "1.0.0"\n---\n\n# Test\n',
        'utf-8'
      );
    });

    after(async () => {
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should skip files with frontmatter that lack a recognized entity type', async () => {
      const entities = await parseInput(tempDir, logger);
      assert.equal(entities.length, 1, 'should only parse the valid entity file');
      assert.equal(entities[0].id, 'BLD-NE-001');
    });
  });

  describe('entity structure', () => {
    it('should return entities with correct structure', async () => {
      const entities = await parseInput(MINIMAL_PROJECT, logger);

      for (const entity of entities) {
        // Each parsed entity must have these fields
        assert.ok('id' in entity, `entity should have id`);
        assert.ok('documentType' in entity, `entity ${entity.id} should have documentType`);
        assert.ok('entityType' in entity, `entity ${entity.id} should have entityType`);
        assert.ok('version' in entity, `entity ${entity.id} should have version`);
        assert.ok('_metadata' in entity, `entity ${entity.id} should have _metadata`);

        // documentType and entityType should match
        assert.equal(
          entity.documentType,
          entity.entityType,
          `entity ${entity.id}: documentType should equal entityType`
        );
      }
    });
  });
});
