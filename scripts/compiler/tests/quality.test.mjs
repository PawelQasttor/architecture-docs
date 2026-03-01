/**
 * Tests for Stage 3.5: Quality Summary Generation
 *
 * Verifies weighted completeness, profile completeness,
 * safety-critical tracking, and per-entity quality blocks.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateQuality } from '../stages/quality.mjs';

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
 * Helper: build a minimal SBM structure for quality testing
 */
function createTestSbm(entities = {}) {
  return {
    sbm_version: '1.1',
    generatedAt: new Date().toISOString(),
    compiler: { version: '1.1.0', mode: 'production' },
    project: {
      id: 'PRJ-QUALITY-TEST',
      name: 'Quality Test Project',
      country: 'PL',
      phase: 3
    },
    entities: {
      spaces: [],
      ...entities
    },
    metadata: { totalEntities: 0 }
  };
}

describe('generateQuality', () => {
  const logger = createMockLogger();

  describe('basic quality computation', () => {
    it('should attach _quality blocks to entities', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-Q-001',
          entityType: 'space',
          spaceName: 'Test Room',
          spaceType: 'bedroom',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          area: 15.0,
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);

      assert.ok(sbm.entities.spaces[0]._quality, 'space should have _quality block');
      assert.ok(typeof sbm.entities.spaces[0]._quality.completeness === 'number', 'completeness should be a number');
      assert.ok(typeof sbm.entities.spaces[0]._quality.totalFields === 'number', 'totalFields should be a number');
    });

    it('should return project quality summary', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-Q-002',
          entityType: 'space',
          spaceName: 'Room',
          spaceType: 'office',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          version: '1.0.0'
        }]
      });

      const projectQuality = generateQuality(sbm, logger);

      assert.ok(projectQuality, 'should return project quality');
      assert.equal(projectQuality.totalEntities, 1, 'should count 1 entity');
      assert.ok(typeof projectQuality.averageCompleteness === 'number');
      assert.ok(projectQuality.fieldsByConfidence, 'should have fieldsByConfidence');
    });
  });

  describe('weighted completeness (v1.1)', () => {
    it('should compute weightedCompleteness for spaces', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-WC-001',
          entityType: 'space',
          spaceName: 'Room A',
          spaceType: 'bedroom',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          area: 15.0,
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.spaces[0]._quality;

      assert.ok(typeof quality.weightedCompleteness === 'number', 'should have weightedCompleteness');
      assert.ok(quality.weightedCompleteness >= 0 && quality.weightedCompleteness <= 1, 'should be between 0 and 1');
    });

    it('should weight critical fields higher', () => {
      // Space with all critical fields but missing important ones
      const sbmComplete = createTestSbm({
        spaces: [{
          id: 'SP-CRIT-001',
          entityType: 'space',
          spaceName: 'Complete Critical',
          spaceType: 'bedroom',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          version: '1.0.0'
        }]
      });

      // Space missing critical fields
      const sbmMissing = createTestSbm({
        spaces: [{
          id: 'SP-MISS-001',
          entityType: 'space',
          spaceName: null,  // Critical field is null
          spaceType: null,  // Critical field is null
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          area: 15.0,
          version: '1.0.0'
        }]
      });

      generateQuality(sbmComplete, logger);
      generateQuality(sbmMissing, logger);

      const completeWC = sbmComplete.entities.spaces[0]._quality.weightedCompleteness;
      const missingWC = sbmMissing.entities.spaces[0]._quality.weightedCompleteness;

      assert.ok(completeWC > missingWC, 'missing critical fields should lower weighted completeness significantly');
    });
  });

  describe('profile completeness (v1.1)', () => {
    it('should compute profileCompleteness for spaces', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-PC-001',
          entityType: 'space',
          spaceName: 'Room B',
          spaceType: 'office',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          area: 20.0,
          requirements: ['REQ-1'],
          cost: { totalCost: 10000 },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.spaces[0]._quality;

      assert.ok(typeof quality.profileCompleteness === 'number', 'should have profileCompleteness');
      assert.ok(quality.profileCompleteness >= 0 && quality.profileCompleteness <= 1, 'should be between 0 and 1');
    });

    it('should report missingExpected fields', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-ME-001',
          entityType: 'space',
          spaceName: 'Room C',
          spaceType: 'office',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          // Missing: area, designArea, zoneIds, requirements, cost
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.spaces[0]._quality;

      assert.ok(quality.missingExpected, 'should have missingExpected');
      assert.ok(Array.isArray(quality.missingExpected), 'missingExpected should be array');
      assert.ok(quality.missingExpected.length > 0, 'should have some missing expected fields');
    });

    it('should not have missingExpected when all profile fields are present', () => {
      const sbm = createTestSbm({
        buildings: [{
          id: 'BLD-FULL',
          entityType: 'building',
          name: 'Full Building',
          buildingName: 'Full Building',
          siteId: 'SITE-X',
          classification: 'residential',
          grossFloorArea: 1000,
          cost: { totalCost: 500000 },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.buildings[0]._quality;

      assert.equal(quality.missingExpected, undefined, 'should have no missing expected fields');
      assert.equal(quality.profileCompleteness, 1.0, 'profile completeness should be 1.0');
    });
  });

  describe('project quality summary (v1.1)', () => {
    it('should include averageWeightedCompleteness', () => {
      const sbm = createTestSbm({
        spaces: [
          {
            id: 'SP-AVG-001',
            entityType: 'space',
            spaceName: 'Room 1',
            spaceType: 'bedroom',
            buildingId: 'BLD-X',
            levelId: 'LVL-X',
            area: 15.0,
            version: '1.0.0'
          },
          {
            id: 'SP-AVG-002',
            entityType: 'space',
            spaceName: 'Room 2',
            spaceType: 'office',
            buildingId: 'BLD-X',
            levelId: 'LVL-X',
            version: '1.0.0'
          }
        ]
      });

      const projectQuality = generateQuality(sbm, logger);

      assert.ok(typeof projectQuality.averageWeightedCompleteness === 'number', 'should have averageWeightedCompleteness');
    });
  });

  describe('safety-critical field tracking', () => {
    it('should track safety-critical fields', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-SC-001',
          entityType: 'space',
          spaceName: 'Lab',
          spaceType: 'laboratory',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          fireRating: 'REI60',
          fireRating_meta: { confidence: 'specified', source: 'fire_report' },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.spaces[0]._quality;

      assert.ok(quality.safetyCritical, 'should have safetyCritical');
      const fireField = quality.safetyCritical.find(f => f.field === 'fireRating');
      assert.ok(fireField, 'should track fireRating as safety-critical');
      assert.equal(fireField.confidence, 'specified');
    });

    it('should include firePerformance as safety-critical (v1.1)', () => {
      const sbm = createTestSbm({
        openings: [{
          id: 'OPN-SC-001',
          entityType: 'opening',
          openingName: 'Fire Door',
          openingCategory: 'door',
          envelopeId: 'ENV-X',
          firePerformance: { fireRating: 'EI60', selfClosing: true },
          firePerformance_meta: { confidence: 'assumed', source: 'draft' },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.openings[0]._quality;

      assert.ok(quality.safetyCritical, 'should have safetyCritical');
      const fpField = quality.safetyCritical.find(f => f.field === 'firePerformance');
      assert.ok(fpField, 'should track firePerformance as safety-critical');
      assert.equal(fpField.confidence, 'assumed');
    });
  });

  describe('quality profiles for new entity types (v1.1)', () => {
    it('should compute profile for openings', () => {
      const sbm = createTestSbm({
        openings: [{
          id: 'OPN-PROF-01',
          entityType: 'opening',
          openingName: 'Test Window',
          openingCategory: 'window',
          envelopeId: 'ENV-X',
          dimensions: { width: 1200, height: 1500 },
          thermalPerformance: { uValue: 0.9 },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.openings[0]._quality;

      assert.ok(typeof quality.profileCompleteness === 'number', 'should have profileCompleteness for openings');
    });

    it('should compute profile for site features', () => {
      const sbm = createTestSbm({
        site_features: [{
          id: 'SF-PROF-01',
          entityType: 'site_feature',
          featureName: 'Garden',
          featureCategory: 'vegetation',
          siteId: 'SITE-X',
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.site_features[0]._quality;

      assert.ok(typeof quality.profileCompleteness === 'number', 'should have profileCompleteness for site features');
    });

    it('should compute profile for construction packages', () => {
      const sbm = createTestSbm({
        construction_packages: [{
          id: 'CP-PROF-01',
          entityType: 'construction_package',
          packageName: 'Foundation',
          sequence: 1,
          status: 'planned',
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.construction_packages[0]._quality;

      assert.ok(typeof quality.profileCompleteness === 'number', 'should have profileCompleteness for construction packages');
    });
  });

  describe('confidence level tracking', () => {
    it('should track fields by confidence level', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-CONF-001',
          entityType: 'space',
          spaceName: 'Measured Room',
          spaceType: 'office',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          area: 15.0,
          area_meta: { confidence: 'measured', source: 'survey' },
          designHeight: 2700,
          designHeight_meta: { confidence: 'assumed', source: 'brief' },
          version: '1.0.0'
        }]
      });

      generateQuality(sbm, logger);
      const quality = sbm.entities.spaces[0]._quality;

      assert.equal(quality.fieldsByConfidence.measured, 1, 'should count 1 measured field');
      assert.equal(quality.fieldsByConfidence.assumed, 1, 'should count 1 assumed field');
      assert.equal(quality.lowestConfidence, 'assumed', 'lowest confidence should be assumed');
    });

    it('should track unverified safety-critical fields in project summary', () => {
      const sbm = createTestSbm({
        spaces: [{
          id: 'SP-UNVER-001',
          entityType: 'space',
          spaceName: 'Unverified Room',
          spaceType: 'laboratory',
          buildingId: 'BLD-X',
          levelId: 'LVL-X',
          fireRating: 'REI120',
          fireRating_meta: { confidence: 'assumed', source: 'guess' },
          version: '1.0.0'
        }]
      });

      const projectQuality = generateQuality(sbm, logger);

      assert.ok(projectQuality.safetyCriticalFields, 'should have safetyCriticalFields in summary');
      assert.ok(projectQuality.safetyCriticalFields.unverified > 0, 'should have unverified safety-critical fields');
    });
  });
});
