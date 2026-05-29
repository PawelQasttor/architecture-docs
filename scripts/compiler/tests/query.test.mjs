/**
 * Tests for the query layer (v2.7).
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { runQuery, getByPath } from '../query.mjs';

function sbm() {
  return {
    sbm_version: '2.5',
    project: { id: 'PRJ-Q', name: 'Q' },
    entities: {
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'Tower' }],
      requirements: [
        { id: 'REQ-1', entityType: 'requirement', requirementName: 'Daylight' },
        { id: 'REQ-2', entityType: 'requirement', requirementName: 'Acoustic' }
      ],
      spaces: [
        { id: 'SP-1', entityType: 'space', spaceName: 'Big', buildingId: 'BLD-01', designArea: 16, requirements: ['REQ-1', 'REQ-2'], cost: { totalCost: 25000 } },
        { id: 'SP-2', entityType: 'space', spaceName: 'Small', buildingId: 'BLD-01', designArea: 11, requirements: ['REQ-1'], cost: { totalCost: 18000 } }
      ]
    },
    metadata: {}
  };
}

describe('getByPath', () => {
  it('resolves nested dotted paths', () => {
    assert.equal(getByPath({ cost: { totalCost: 5 } }, 'cost.totalCost'), 5);
    assert.equal(getByPath({ a: 1 }, 'a.b.c'), undefined);
  });
});

describe('query: list / count', () => {
  it('lists all entities of a type', () => {
    const r = runQuery(sbm(), 'list spaces');
    assert.equal(r.matchCount, 2);
    assert.deepEqual(r.results.map(x => x.id).sort(), ['SP-1', 'SP-2']);
  });

  it('filters with a numeric where clause', () => {
    const r = runQuery(sbm(), 'list spaces where designArea > 14');
    assert.equal(r.matchCount, 1);
    assert.equal(r.results[0].id, 'SP-1');
    assert.equal(r.results[0].designArea, 16); // queried field surfaced
  });

  it('supports dot-path filters', () => {
    const r = runQuery(sbm(), 'list spaces where cost.totalCost >= 20000');
    assert.equal(r.matchCount, 1);
    assert.equal(r.results[0].id, 'SP-1');
  });

  it('supports contains on arrays', () => {
    const r = runQuery(sbm(), 'list spaces where requirements contains REQ-2');
    assert.equal(r.matchCount, 1);
    assert.equal(r.results[0].id, 'SP-1');
  });

  it('counts matches', () => {
    const r = runQuery(sbm(), 'count spaces where designArea < 14');
    assert.equal(r.results[0].count, 1);
  });

  it('accepts singular or plural type tokens', () => {
    assert.equal(runQuery(sbm(), 'list space').matchCount, 2);
    assert.equal(runQuery(sbm(), 'list spaces').matchCount, 2);
  });

  it('errors on unknown entity type', () => {
    const r = runQuery(sbm(), 'list widgets');
    assert.ok(r.error);
  });
});

describe('query: get / neighbors (graph-backed)', () => {
  it('gets an entity with its outgoing edges', () => {
    const r = runQuery(sbm(), 'get SP-1');
    assert.equal(r.matchCount, 1);
    const reqEdges = r.results[0].outgoing.filter(e => e.type === 'must_satisfy');
    assert.equal(reqEdges.length, 2);
  });

  it('lists neighbours filtered by relationship type and direction', () => {
    const r = runQuery(sbm(), 'neighbors SP-1 must_satisfy out');
    assert.equal(r.matchCount, 2);
    assert.ok(r.results.every(x => x.relation === 'must_satisfy' && x.direction === 'out'));
    assert.deepEqual(r.results.map(x => x.id).sort(), ['REQ-1', 'REQ-2']);
  });

  it('errors on a missing id for get', () => {
    assert.ok(runQuery(sbm(), 'get SP-NOPE').error);
  });

  it('errors on an unknown command', () => {
    assert.ok(runQuery(sbm(), 'frobnicate spaces').error);
  });
});
