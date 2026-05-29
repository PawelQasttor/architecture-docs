/**
 * Tests for the knowledge-graph target (v2.5 tooling).
 *
 * Verifies node generation, typed-edge derivation, dangling-edge prevention,
 * summary integrity, and the JSON-LD projection.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateKnowledgeGraph } from '../targets/knowledge-graph.mjs';

function createMockLogger() {
  return { info: () => {}, success: () => {}, warn: () => {}, error: () => {}, debug: () => {}, stage: () => {} };
}
const logger = createMockLogger();

function createSbm(entities = {}) {
  return {
    sbm_version: '2.4',
    project: { id: 'PRJ-GRAPH-TEST', name: 'Graph Test' },
    entities,
    metadata: {}
  };
}

describe('knowledge-graph target', () => {
  it('creates one node per entity with id, type and label', () => {
    const sbm = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'Tower A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'Bedroom', buildingId: 'BLD-01' }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    assert.equal(g.nodes.length, 2);
    const bld = g.nodes.find(n => n.id === 'BLD-01');
    assert.equal(bld.type, 'building');
    assert.equal(bld.label, 'Tower A');
    const sp = g.nodes.find(n => n.id === 'SP-1');
    assert.equal(sp.label, 'Bedroom');
  });

  it('derives a part_of edge from a containment field (buildingId)', () => {
    const sbm = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'Tower A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'Bedroom', buildingId: 'BLD-01' }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    const e = g.edges.find(x => x.from === 'SP-1' && x.to === 'BLD-01');
    assert.ok(e, 'expected an edge SP-1 -> BLD-01');
    assert.equal(e.type, 'part_of');
  });

  it('maps zoneIds to in_zone, spaceTypeId to instance_of, requirements to must_satisfy', () => {
    const sbm = createSbm({
      zones: [{ id: 'ZONE-1', entityType: 'zone', zoneName: 'Fire' }],
      space_types: [{ id: 'ST-1', entityType: 'space_type', name: 'Bedroom Type' }],
      requirements: [{ id: 'REQ-1', entityType: 'requirement', requirementName: 'Daylight' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'Bedroom', spaceTypeId: 'ST-1', zoneIds: ['ZONE-1'], requirements: ['REQ-1'] }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    const types = g.edges.filter(e => e.from === 'SP-1').reduce((m, e) => (m[e.type] = e.to, m), {});
    assert.equal(types.in_zone, 'ZONE-1');
    assert.equal(types.instance_of, 'ST-1');
    assert.equal(types.must_satisfy, 'REQ-1');
  });

  it('derives adjacent_to edges with the relationship as subtype', () => {
    const sbm = createSbm({
      spaces: [
        { id: 'SP-1', entityType: 'space', spaceName: 'A', adjacentSpaces: [{ id: 'SP-2', relationship: 'shares_wall' }] },
        { id: 'SP-2', entityType: 'space', spaceName: 'B' }
      ]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    const e = g.edges.find(x => x.from === 'SP-1' && x.to === 'SP-2');
    assert.equal(e.type, 'adjacent_to');
    assert.equal(e.subtype, 'shares_wall');
  });

  it('does NOT create edges to non-existent targets (no dangling edges)', () => {
    const sbm = createSbm({
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'A', buildingId: 'BLD-MISSING', zoneIds: ['ZONE-MISSING'] }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    assert.equal(g.edges.length, 0, 'edges to missing ids should be dropped');
    // and every edge in a richer graph resolves to a real node
    const sbm2 = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'A', buildingId: 'BLD-01' }]
    });
    const g2 = generateKnowledgeGraph(sbm2, logger);
    const ids = new Set(g2.nodes.map(n => n.id));
    assert.ok(g2.edges.every(e => ids.has(e.from) && ids.has(e.to)));
  });

  it('ignores _meta and own id fields when building edges', () => {
    const sbm = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'A', buildingId: 'BLD-01', buildingId_meta: { confidence: 'specified' } }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    // only the real buildingId edge, not one from buildingId_meta
    assert.equal(g.edges.filter(e => e.from === 'SP-1').length, 1);
  });

  it('summary counts match the nodes and edges arrays', () => {
    const sbm = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'A', buildingId: 'BLD-01' }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    assert.equal(g.summary.nodeCount, g.nodes.length);
    assert.equal(g.summary.edgeCount, g.edges.length);
    assert.equal(g.summary.nodesByType.space, 1);
    assert.equal(g.summary.nodesByType.building, 1);
  });

  it('maps designOptionId to in_option and variantOf to variant_of (v2.5)', () => {
    const sbm = createSbm({
      design_options: [{ id: 'OPT-A', entityType: 'design_option', optionName: 'A' }],
      spaces: [
        { id: 'SP-1', entityType: 'space', spaceName: 'Base' },
        { id: 'SP-1-A', entityType: 'space', spaceName: 'Variant', designOptionId: 'OPT-A', variantOf: 'SP-1' }
      ]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    const edges = g.edges.filter(e => e.from === 'SP-1-A').reduce((m, e) => (m[e.type] = e.to, m), {});
    assert.equal(edges.in_option, 'OPT-A');
    assert.equal(edges.variant_of, 'SP-1');
  });

  it('emits a JSON-LD @graph with @context and grouped outgoing edges', () => {
    const sbm = createSbm({
      buildings: [{ id: 'BLD-01', entityType: 'building', name: 'A' }],
      spaces: [{ id: 'SP-1', entityType: 'space', spaceName: 'Bedroom', buildingId: 'BLD-01' }]
    });
    const g = generateKnowledgeGraph(sbm, logger);
    assert.ok(g.jsonld['@context']);
    const node = g.jsonld['@graph'].find(n => n['@id'] === 'SP-1');
    assert.equal(node['@type'], 'space');
    assert.equal(node['rdfs:label'], 'Bedroom');
    assert.deepEqual(node.part_of, [{ '@id': 'BLD-01' }]);
  });
});
