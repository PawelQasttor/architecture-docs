/**
 * Tests for Stage 2: Normalize & Enrich
 *
 * Verifies entity grouping, type-to-instance inheritance, level-to-space
 * inheritance, reverse relationship computation, multi-level resolution,
 * system hierarchy, and cost rollup.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalize } from '../stages/normalize.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DIR = path.join(__dirname, 'fixtures');

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
 * Helper: create a standard set of options for normalize().
 * The input path points to fixtures/minimal-project so the jurisdiction pack
 * enricher resolves paths relative to the compiler scripts directory.
 */
function createOptions(overrides = {}) {
  return {
    country: 'PL',
    phase: 3,
    input: path.join(FIXTURES_DIR, 'minimal-project'),
    ...overrides
  };
}

/**
 * Helper: build a minimal parsed entity array that represents
 * a project, building, level, and one space.
 */
function createMinimalEntities() {
  return [
    {
      entityType: 'project_specification',
      documentType: 'project_specification',
      id: 'PRJ-TEST',
      projectName: 'Test Project',
      country: 'PL',
      version: '1.0.0',
      _metadata: { sourceFile: 'project.md', parsedAt: new Date().toISOString() }
    },
    {
      entityType: 'building',
      documentType: 'building',
      id: 'BLD-TEST',
      name: 'Test Building',
      version: '1.0.0',
      _metadata: { sourceFile: 'building.md', parsedAt: new Date().toISOString() }
    },
    {
      entityType: 'level',
      documentType: 'level',
      id: 'LVL-TEST-01',
      buildingId: 'BLD-TEST',
      levelName: 'Ground Floor',
      levelNumber: 0,
      version: '1.0.0',
      _metadata: { sourceFile: 'level.md', parsedAt: new Date().toISOString() }
    },
    {
      entityType: 'space',
      documentType: 'space',
      id: 'SP-TEST-001',
      spaceName: 'Test Room',
      spaceType: 'bedroom',
      buildingId: 'BLD-TEST',
      levelId: 'LVL-TEST-01',
      area: 15.0,
      version: '1.0.0',
      _metadata: { sourceFile: 'space.md', parsedAt: new Date().toISOString() }
    }
  ];
}

describe('normalize', () => {
  const logger = createMockLogger();
  const options = createOptions();

  describe('entity grouping', () => {
    it('should group entities by type into correct categories', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      assert.ok(result.entities.buildings, 'should have buildings array');
      assert.ok(result.entities.levels, 'should have levels array');
      assert.ok(result.entities.spaces, 'should have spaces array');
      assert.equal(result.entities.buildings.length, 1);
      assert.equal(result.entities.levels.length, 1);
      assert.equal(result.entities.spaces.length, 1);
    });

    it('should remove _metadata from normalized entities', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      for (const space of result.entities.spaces) {
        assert.equal(space._metadata, undefined, 'space should not have _metadata after normalization');
      }
      for (const building of result.entities.buildings) {
        assert.equal(building._metadata, undefined, 'building should not have _metadata after normalization');
      }
    });

    it('should include project metadata in output', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      assert.ok(result.project, 'should have project');
      assert.equal(result.project.id, 'PRJ-TEST');
      assert.equal(result.project.name, 'Test Project');
      assert.equal(result.project.country, 'PL');
    });

    it('should include metadata summary with entity counts', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      assert.ok(result.metadata, 'should have metadata');
      assert.equal(result.metadata.totalEntities, 4);
      assert.ok(result.metadata.entitiesByType, 'should have entitiesByType');
      assert.equal(result.metadata.entitiesByType.buildings, 1);
      assert.equal(result.metadata.entitiesByType.levels, 1);
      assert.equal(result.metadata.entitiesByType.spaces, 1);
    });

    it('should omit empty entity arrays from output', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      // No zones, systems, assets in minimal set
      assert.equal(result.entities.zones, undefined, 'zones should be omitted when empty');
      assert.equal(result.entities.systems, undefined, 'systems should be omitted when empty');
      assert.equal(result.entities.assets, undefined, 'assets should be omitted when empty');
    });
  });

  describe('type to instance inheritance', () => {
    it('should resolve space_type fields into space instances', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'space_type',
          documentType: 'space_type',
          id: 'ST-BEDROOM-A',
          designArea: 18.0,
          designHeight: 2800,
          spaceType: 'bedroom',
          accessibilityLevel: 'standard',
          finishes: { floor: 'hardwood', walls: 'paint', ceiling: 'plaster' },
          version: '1.0.0',
          _metadata: { sourceFile: 'space-type.md', parsedAt: new Date().toISOString() }
        }
      ];

      // Add spaceTypeId to the space
      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.spaceTypeId = 'ST-BEDROOM-A';
      // Remove fields that should be inherited
      delete space.spaceType;

      const result = await normalize(entities, options, logger);
      const resolvedSpace = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.ok(resolvedSpace, 'space should exist in output');
      assert.equal(resolvedSpace.designArea, 18.0, 'designArea should be inherited from type');
      assert.equal(resolvedSpace.designHeight, 2800, 'designHeight should be inherited from type');
      assert.equal(resolvedSpace.spaceType, 'bedroom', 'spaceType should be inherited from type');
      assert.equal(resolvedSpace.accessibilityLevel, 'standard', 'accessibilityLevel should be inherited from type');
      assert.deepEqual(resolvedSpace.finishes, { floor: 'hardwood', walls: 'paint', ceiling: 'plaster' }, 'finishes should be inherited');
    });

    it('should not overwrite explicitly set fields on instances', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'space_type',
          documentType: 'space_type',
          id: 'ST-BEDROOM-B',
          designArea: 18.0,
          designHeight: 2800,
          version: '1.0.0',
          _metadata: { sourceFile: 'space-type-b.md', parsedAt: new Date().toISOString() }
        }
      ];

      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.spaceTypeId = 'ST-BEDROOM-B';
      space.designArea = 20.0; // Explicit value - should NOT be overwritten

      const result = await normalize(entities, options, logger);
      const resolvedSpace = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.equal(resolvedSpace.designArea, 20.0, 'explicit designArea should NOT be overwritten by type');
      assert.equal(resolvedSpace.designHeight, 2800, 'designHeight should be inherited since not explicit');
    });

    it('should add _meta provenance for inherited fields', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'space_type',
          documentType: 'space_type',
          id: 'ST-BEDROOM-C',
          designArea: 18.0,
          version: '1.0.0',
          _metadata: { sourceFile: 'space-type-c.md', parsedAt: new Date().toISOString() }
        }
      ];

      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.spaceTypeId = 'ST-BEDROOM-C';

      const result = await normalize(entities, options, logger);
      const resolvedSpace = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.ok(resolvedSpace.designArea_meta, 'should have _meta for inherited designArea');
      assert.equal(resolvedSpace.designArea_meta.resolution, 'type_default');
      assert.equal(resolvedSpace.designArea_meta.inheritedFrom, 'ST-BEDROOM-C');
    });
  });

  describe('reverse relationships', () => {
    it('should compute zone.spaceIds from space.zoneIds', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'zone',
          documentType: 'zone',
          id: 'ZONE-TEST-01',
          zoneName: 'Fire Zone 1',
          version: '1.0.0',
          _metadata: { sourceFile: 'zone.md', parsedAt: new Date().toISOString() }
        }
      ];

      // Give the space a zone reference
      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.zoneIds = ['ZONE-TEST-01'];

      const result = await normalize(entities, options, logger);
      const zone = result.entities.zones.find(z => z.id === 'ZONE-TEST-01');

      assert.ok(zone, 'zone should exist');
      assert.ok(Array.isArray(zone.spaceIds), 'zone should have spaceIds array');
      assert.ok(zone.spaceIds.includes('SP-TEST-001'), 'zone.spaceIds should include the space');
    });

    it('should compute level.spaceIds from space.levelId', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      const level = result.entities.levels.find(l => l.id === 'LVL-TEST-01');
      assert.ok(level, 'level should exist');
      assert.ok(Array.isArray(level.spaceIds), 'level should have spaceIds array');
      assert.ok(level.spaceIds.includes('SP-TEST-001'), 'level.spaceIds should include the space');
    });

    it('should compute system.assetIds from asset.systemId', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'system',
          documentType: 'system',
          id: 'SYS-HVAC-01',
          systemName: 'HVAC System',
          systemCategory: 'hvac',
          buildingId: 'BLD-TEST',
          version: '1.0.0',
          _metadata: { sourceFile: 'system.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'asset',
          documentType: 'asset',
          id: 'AST-MVHR-01',
          assetName: 'MVHR Unit',
          systemId: 'SYS-HVAC-01',
          version: '1.0.0',
          _metadata: { sourceFile: 'asset.md', parsedAt: new Date().toISOString() }
        }
      ];

      const result = await normalize(entities, options, logger);
      const system = result.entities.systems.find(s => s.id === 'SYS-HVAC-01');

      assert.ok(system, 'system should exist');
      assert.ok(Array.isArray(system.assetIds), 'system should have assetIds array');
      assert.ok(system.assetIds.includes('AST-MVHR-01'), 'system.assetIds should include the asset');
    });
  });

  describe('multi-level space resolution', () => {
    it('should set isMultiLevel: true when space has multiple levelIds', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'level',
          documentType: 'level',
          id: 'LVL-TEST-02',
          buildingId: 'BLD-TEST',
          levelName: 'First Floor',
          levelNumber: 1,
          version: '1.0.0',
          _metadata: { sourceFile: 'level-02.md', parsedAt: new Date().toISOString() }
        }
      ];

      // Make the space span two levels
      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.levelIds = ['LVL-TEST-01', 'LVL-TEST-02'];

      const result = await normalize(entities, options, logger);
      const resolvedSpace = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.equal(resolvedSpace.isMultiLevel, true, 'space spanning 2 levels should be isMultiLevel: true');
      assert.deepEqual(resolvedSpace.levelIds, ['LVL-TEST-01', 'LVL-TEST-02']);
    });

    it('should set isMultiLevel: false when space has single level', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      const space = result.entities.spaces.find(s => s.id === 'SP-TEST-001');
      assert.equal(space.isMultiLevel, false, 'space on one level should be isMultiLevel: false');
    });

    it('should auto-compute levelIds from levelId when not explicitly set', async () => {
      const entities = createMinimalEntities();
      const result = await normalize(entities, options, logger);

      const space = result.entities.spaces.find(s => s.id === 'SP-TEST-001');
      assert.deepEqual(space.levelIds, ['LVL-TEST-01'], 'levelIds should be auto-computed from levelId');
    });
  });

  describe('system hierarchy', () => {
    it('should compute subsystemIds on parent system', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'system',
          documentType: 'system',
          id: 'SYS-HVAC-PARENT',
          systemName: 'HVAC Parent',
          systemCategory: 'hvac',
          buildingId: 'BLD-TEST',
          version: '1.0.0',
          _metadata: { sourceFile: 'sys-parent.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'system',
          documentType: 'system',
          id: 'SYS-HVAC-CHILD',
          systemName: 'HVAC Child',
          systemCategory: 'hvac',
          buildingId: 'BLD-TEST',
          parentSystemId: 'SYS-HVAC-PARENT',
          version: '1.0.0',
          _metadata: { sourceFile: 'sys-child.md', parsedAt: new Date().toISOString() }
        }
      ];

      const result = await normalize(entities, options, logger);
      const parent = result.entities.systems.find(s => s.id === 'SYS-HVAC-PARENT');

      assert.ok(parent, 'parent system should exist');
      assert.ok(Array.isArray(parent.subsystemIds), 'parent should have subsystemIds');
      assert.ok(parent.subsystemIds.includes('SYS-HVAC-CHILD'), 'parent.subsystemIds should include child');
    });
  });

  describe('cost rollup', () => {
    it('should roll up asset costs to their parent system', async () => {
      const entities = [
        ...createMinimalEntities(),
        {
          entityType: 'system',
          documentType: 'system',
          id: 'SYS-COST-01',
          systemName: 'Cost System',
          systemCategory: 'hvac',
          buildingId: 'BLD-TEST',
          version: '1.0.0',
          _metadata: { sourceFile: 'sys-cost.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'asset',
          documentType: 'asset',
          id: 'AST-COST-01',
          assetName: 'Asset One',
          systemId: 'SYS-COST-01',
          cost: { totalCost: 5000, currency: 'PLN' },
          version: '1.0.0',
          _metadata: { sourceFile: 'asset-cost-1.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'asset',
          documentType: 'asset',
          id: 'AST-COST-02',
          assetName: 'Asset Two',
          systemId: 'SYS-COST-01',
          cost: { totalCost: 3000, currency: 'PLN' },
          version: '1.0.0',
          _metadata: { sourceFile: 'asset-cost-2.md', parsedAt: new Date().toISOString() }
        }
      ];

      const result = await normalize(entities, options, logger);
      const system = result.entities.systems.find(s => s.id === 'SYS-COST-01');

      assert.ok(system.cost, 'system should have rolled-up cost');
      assert.equal(system.cost.totalCost, 8000, 'system cost should be sum of asset costs');
      assert.equal(system.cost.currency, 'PLN');
      assert.equal(system.cost.basis, 'rollup_from_assets');
      assert.ok(system.cost._meta, 'should have cost _meta provenance');
      assert.equal(system.cost._meta.source, 'compiler_cost_rollup');
    });

    it('should roll up space costs to levels and project budget', async () => {
      const entities = createMinimalEntities();
      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.cost = { totalCost: 10000, currency: 'PLN' };

      const result = await normalize(entities, options, logger);
      const level = result.entities.levels.find(l => l.id === 'LVL-TEST-01');

      assert.ok(level.cost, 'level should have rolled-up cost from spaces');
      assert.equal(level.cost.totalCost, 10000, 'level cost should equal space cost');
      assert.equal(level.cost.basis, 'rollup_from_spaces');
    });
  });

  describe('construction package cost aggregation', () => {
    it('should aggregate costs per construction package', async () => {
      const entities = [
        {
          entityType: 'project_specification',
          documentType: 'project_specification',
          id: 'PRJ-PKG',
          projectName: 'Pkg Test',
          country: 'PL',
          constructionPackages: [
            { id: 'PKG-01', name: 'Package One' },
            { id: 'PKG-02', name: 'Package Two' }
          ],
          version: '1.0.0',
          _metadata: { sourceFile: 'project.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'building',
          documentType: 'building',
          id: 'BLD-PKG',
          name: 'Building',
          version: '1.0.0',
          _metadata: { sourceFile: 'building.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'level',
          documentType: 'level',
          id: 'LVL-PKG-01',
          buildingId: 'BLD-PKG',
          levelName: 'GF',
          version: '1.0.0',
          _metadata: { sourceFile: 'level.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'space',
          documentType: 'space',
          id: 'SP-PKG-001',
          spaceName: 'Room 1',
          spaceType: 'bedroom',
          buildingId: 'BLD-PKG',
          levelId: 'LVL-PKG-01',
          constructionPackageId: 'PKG-01',
          cost: { totalCost: 5000, currency: 'PLN' },
          version: '1.0.0',
          _metadata: { sourceFile: 'space1.md', parsedAt: new Date().toISOString() }
        },
        {
          entityType: 'space',
          documentType: 'space',
          id: 'SP-PKG-002',
          spaceName: 'Room 2',
          spaceType: 'bedroom',
          buildingId: 'BLD-PKG',
          levelId: 'LVL-PKG-01',
          constructionPackageId: 'PKG-01',
          cost: { totalCost: 3000, currency: 'PLN' },
          version: '1.0.0',
          _metadata: { sourceFile: 'space2.md', parsedAt: new Date().toISOString() }
        }
      ];

      const result = await normalize(entities, options, logger);

      const pkg01 = result.project.constructionPackages.find(p => p.id === 'PKG-01');
      assert.ok(pkg01.costSummary, 'PKG-01 should have costSummary');
      assert.equal(pkg01.costSummary.totalCost, 8000, 'PKG-01 total cost should be 8000');
      assert.equal(pkg01.costSummary.entityCount, 2, 'PKG-01 should have 2 entities');

      const pkg02 = result.project.constructionPackages.find(p => p.id === 'PKG-02');
      assert.equal(pkg02.costSummary, undefined, 'PKG-02 should have no costSummary (no tagged entities)');
    });
  });

  describe('level to space inheritance', () => {
    it('should inherit typicalCeilingHeight as designHeight', async () => {
      const entities = createMinimalEntities();
      const level = entities.find(e => e.id === 'LVL-TEST-01');
      level.typicalCeilingHeight = 2700;

      const result = await normalize(entities, options, logger);
      const space = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.equal(space.designHeight, 2700, 'designHeight should be inherited from level typicalCeilingHeight');
      assert.ok(space.designHeight_meta, 'should have _meta for inherited field');
      assert.equal(space.designHeight_meta.resolution, 'inherited');
      assert.equal(space.designHeight_meta.inheritedFrom, 'LVL-TEST-01');
      assert.equal(space.designHeight_meta.inheritedField, 'typicalCeilingHeight');
    });

    it('should inherit typicalFinishes as finishes', async () => {
      const entities = createMinimalEntities();
      const level = entities.find(e => e.id === 'LVL-TEST-01');
      level.typicalFinishes = { floor: 'parquet', walls: 'paint' };

      const result = await normalize(entities, options, logger);
      const space = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.deepEqual(space.finishes, { floor: 'parquet', walls: 'paint' });
      assert.ok(space.finishes_meta, 'should have finishes_meta');
      assert.equal(space.finishes_meta.resolution, 'inherited');
    });

    it('should not overwrite explicit space values with level defaults', async () => {
      const entities = createMinimalEntities();
      const level = entities.find(e => e.id === 'LVL-TEST-01');
      level.typicalCeilingHeight = 2700;

      const space = entities.find(e => e.id === 'SP-TEST-001');
      space.designHeight = 3000; // Explicit value

      const result = await normalize(entities, options, logger);
      const resolvedSpace = result.entities.spaces.find(s => s.id === 'SP-TEST-001');

      assert.equal(resolvedSpace.designHeight, 3000, 'explicit designHeight should NOT be overwritten');
    });
  });
});
