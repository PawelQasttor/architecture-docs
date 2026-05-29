/**
 * Tests for the option-comparison target (v2.5).
 *
 * Verifies per-option rollups (baseline + that option's tagged entities),
 * the selected-option flag, and the null-when-no-options behaviour.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateOptionComparison } from '../targets/option-comparison.mjs';

function createMockLogger() {
  return { info: () => {}, success: () => {}, warn: () => {}, error: () => {}, debug: () => {}, stage: () => {} };
}
const logger = createMockLogger();

function sbmWith(entities) {
  return { project: { id: 'PRJ-OPT', name: 'Opt Test', budget: { currency: 'EUR' } }, entities };
}

describe('option-comparison target', () => {
  it('returns null when there are no design_options', () => {
    const result = generateOptionComparison(sbmWith({ spaces: [{ id: 'SP-1', entityType: 'space', cost: { totalCost: 100 } }] }), logger);
    assert.equal(result, null);
  });

  it('rolls up baseline + each option\'s tagged entities', () => {
    const sbm = sbmWith({
      design_options: [
        { id: 'OPT-A', entityType: 'design_option', optionName: 'Scheme A', status: 'selected', version: '2.5.0' },
        { id: 'OPT-B', entityType: 'design_option', optionName: 'Scheme B', status: 'rejected', version: '2.5.0' }
      ],
      spaces: [
        { id: 'SP-BASE', entityType: 'space', spaceName: 'Shared', designArea: 10, cost: { totalCost: 100 } },
        { id: 'SP-A', entityType: 'space', spaceName: 'A room', designOptionId: 'OPT-A', designArea: 5, cost: { totalCost: 50 } },
        { id: 'SP-B', entityType: 'space', spaceName: 'B room', designOptionId: 'OPT-B', designArea: 8, cost: { totalCost: 80 } }
      ]
    });
    const result = generateOptionComparison(sbm, logger);

    assert.equal(result.optionCount, 2);
    assert.equal(result.selectedOptionId, 'OPT-A');

    // baseline excludes tagged variants
    assert.equal(result.baseline.totalCost, 100);
    assert.equal(result.baseline.totalArea, 10);
    assert.equal(result.baseline.spaceCount, 1);

    const a = result.options.find(o => o.id === 'OPT-A');
    const b = result.options.find(o => o.id === 'OPT-B');
    // baseline + that option
    assert.equal(a.rollup.totalCost, 150);
    assert.equal(a.rollup.totalArea, 15);
    assert.equal(a.rollup.spaceCount, 2);
    assert.equal(a.taggedEntityCount, 1);
    assert.equal(b.rollup.totalCost, 180);
    assert.equal(b.rollup.totalArea, 18);
  });

  it('computes deltas relative to the selected option', () => {
    const sbm = sbmWith({
      design_options: [
        { id: 'OPT-A', entityType: 'design_option', optionName: 'A', status: 'selected', version: '2.5.0' },
        { id: 'OPT-B', entityType: 'design_option', optionName: 'B', status: 'rejected', version: '2.5.0' }
      ],
      spaces: [
        { id: 'SP-A', entityType: 'space', designOptionId: 'OPT-A', cost: { totalCost: 50 } },
        { id: 'SP-B', entityType: 'space', designOptionId: 'OPT-B', cost: { totalCost: 80 } }
      ]
    });
    const result = generateOptionComparison(sbm, logger);
    const b = result.comparison.find(c => c.id === 'OPT-B');
    assert.equal(b.deltaCostVsReference, 30); // 80 vs selected 50
  });

  it('aggregates embodied carbon from space performance targets', () => {
    const sbm = sbmWith({
      design_options: [{ id: 'OPT-A', entityType: 'design_option', optionName: 'A', status: 'selected', version: '2.5.0' }],
      spaces: [
        { id: 'SP-A', entityType: 'space', designOptionId: 'OPT-A', performanceTargets: { embodiedCarbon: { wholeLife: { total: 1200 } } } }
      ]
    });
    const result = generateOptionComparison(sbm, logger);
    assert.equal(result.options[0].rollup.totalEmbodiedCarbon, 1200);
  });
});
