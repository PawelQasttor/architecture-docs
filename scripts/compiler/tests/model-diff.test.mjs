/**
 * Tests for the semantic model-diff (v2.7).
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { diffModels } from '../model-diff.mjs';

function model(spaces, extra = {}) {
  return {
    sbm_version: '2.5',
    project: { id: 'PRJ-D' },
    entities: { spaces, ...extra },
    metadata: { entitiesByType: { spaces: spaces.length, ...(extra._counts || {}) } }
  };
}

describe('model-diff', () => {
  it('reports no changes when diffing a model against itself', () => {
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', designArea: 10 }]);
    const d = diffModels(a, a);
    assert.equal(d.summary.entitiesAdded, 0);
    assert.equal(d.summary.entitiesRemoved, 0);
    assert.equal(d.summary.entitiesChanged, 0);
  });

  it('detects added and removed entities', () => {
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A' }]);
    const b = model([{ id: 'SP-2', entityType: 'space', spaceName: 'B' }]);
    const d = diffModels(a, b);
    assert.equal(d.summary.entitiesAdded, 1);
    assert.equal(d.summary.entitiesRemoved, 1);
    assert.equal(d.entitiesAdded[0].id, 'SP-2');
    assert.equal(d.entitiesRemoved[0].id, 'SP-1');
  });

  it('detects a changed field with from/to', () => {
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', designArea: 14.5 }]);
    const b = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', designArea: 16.0 }]);
    const d = diffModels(a, b);
    assert.equal(d.summary.entitiesChanged, 1);
    const change = d.entitiesChanged[0].changes.find(c => c.path === 'designArea');
    assert.equal(change.from, 14.5);
    assert.equal(change.to, 16.0);
  });

  it('ignores denylisted derived keys (_quality)', () => {
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', _quality: { completeness: 0.5 } }]);
    const b = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', _quality: { completeness: 0.9 } }]);
    const d = diffModels(a, b);
    assert.equal(d.summary.entitiesChanged, 0);
  });

  it('detects edge changes (a new requirement attachment)', () => {
    const reqs = [{ id: 'REQ-1', entityType: 'requirement', requirementName: 'R' }];
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A' }], { requirements: reqs });
    const b = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A', requirements: ['REQ-1'] }], { requirements: reqs });
    const d = diffModels(a, b);
    const added = d.edgesAdded.find(e => e.from === 'SP-1' && e.to === 'REQ-1' && e.type === 'must_satisfy');
    assert.ok(added, 'should detect the new must_satisfy edge');
  });

  it('reports entity-type count deltas', () => {
    const a = model([{ id: 'SP-1', entityType: 'space', spaceName: 'A' }]);
    const b = model([
      { id: 'SP-1', entityType: 'space', spaceName: 'A' },
      { id: 'SP-2', entityType: 'space', spaceName: 'B' }
    ]);
    const d = diffModels(a, b);
    assert.equal(d.rollupDeltas.entitiesByType.spaces.delta, 1);
  });
});
