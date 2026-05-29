/**
 * Knowledge-graph target (v2.5 tooling) — emit the whole SBM model as a
 * linked-data knowledge graph: typed nodes (one per entity) + typed edges
 * (derived from the relationship fields the normalize stage already resolved),
 * plus a JSON-LD `@graph` form.
 *
 * This is the "AI-ready" projection of the model: the node/edge shape is what
 * graph databases, RAG pipelines, and LLM tools consume best. No schema change —
 * it is a pure read-only projection over the compiled sbm.json, so every
 * existing (v2.0–v2.4) model produces a graph for free.
 */

// Fields that name a single related entity → controlled relationship verb.
// Anything ending in Id/Ids/Refs that resolves to a known entity but is not
// listed here falls back to `references`.
const REL_TYPES = {
  // containment / hierarchy
  campusId: 'part_of', siteId: 'part_of', buildingId: 'part_of',
  levelId: 'part_of', spaceId: 'part_of', departmentId: 'in_department',
  levelIds: 'spans_levels', connectedLevelIds: 'connects_levels',
  // zones
  zoneId: 'in_zone', zoneIds: 'in_zone',
  // type / instance
  spaceTypeId: 'instance_of', zoneTypeId: 'instance_of', systemTypeId: 'instance_of',
  assetTypeId: 'instance_of', openingTypeId: 'instance_of',
  siteFeatureTypeId: 'instance_of', materialTypeId: 'instance_of',
  // systems
  systemId: 'served_by_system', parentSystemId: 'subsystem_of',
  subsystemIds: 'has_subsystem', affectedSystemIds: 'affects_system',
  // packaging
  constructionPackageId: 'in_package', materialIds: 'uses_material',
  // requirements / verification
  requirements: 'must_satisfy', requirementIds: 'verifies', requirementId: 'verifies',
  // operation-phase links (v2.2/v2.3)
  measuredEntityId: 'measures', affectedEntityId: 'affects',
  triggeredByIssueIds: 'triggered_by', triggeredBySurveyId: 'triggered_by',
  triggeredByTelemetryStreamId: 'triggered_by', triggeredIssueId: 'triggered',
  // delivery & approval (v2.4)
  relatedPermitIds: 'depends_on_permit', supersedesPermitId: 'supersedes',
  appealOfPermitId: 'appeal_of', blockingIssueIds: 'blocked_by',
  deliverableRefs: 'delivers',
  // reverse containment (a parent listing its children)
  buildingIds: 'contains', siteFeatureIds: 'contains', openingIds: 'contains',
  envelopeIds: 'contains', verticalCirculationIds: 'contains',
  structuralSystemIds: 'contains', spaceIds: 'contains', assetIds: 'contains',
  // misc spatial / assignment
  boundarySpaceIds: 'bounds', servedZoneIds: 'serves_zone',
  locatedInSpaceId: 'located_in', envelopeId: 'has_envelope',
  assignedEntityIds: 'assigned_to',
  // design options / variants (v2.5)
  designOptionId: 'in_option', variantOf: 'variant_of', supersededByOptionId: 'superseded_by',
  // generic
  relatedEntityIds: 'related_to', relatedIssueIds: 'related_to',
  testedEntityIds: 'tests', certificationIds: 'certified_by'
};
const DEFAULT_REL = 'references';

// Name fields checked (in order) to produce a human-readable node label.
const LABEL_FIELDS = [
  'spaceName', 'buildingName', 'levelName', 'zoneName', 'systemName', 'assetName',
  'siteName', 'campusName', 'envelopeName', 'circulationName', 'routeName',
  'testName', 'issueTitle', 'recommendationTitle', 'permitTitle', 'gateTitle',
  'inspectionTitle', 'surveyTitle', 'requirementName', 'materialName',
  'programName', 'name', 'title'
];

function labelOf(entity) {
  for (const f of LABEL_FIELDS) {
    if (typeof entity[f] === 'string' && entity[f].trim()) return entity[f];
  }
  return entity.id;
}

function relType(field) {
  return REL_TYPES[field] || DEFAULT_REL;
}

/**
 * Generate the knowledge graph from a compiled sbm.json object.
 */
export function generateKnowledgeGraph(sbm, logger) {
  logger.debug('Generating knowledge graph...');

  const buckets = sbm.entities || {};

  // 1. Index every entity by id (for edge target validation)
  const byId = new Map();
  for (const list of Object.values(buckets)) {
    if (!Array.isArray(list)) continue;
    for (const e of list) {
      if (e && e.id) byId.set(e.id, e);
    }
  }

  // 2. Nodes
  const nodes = [];
  for (const list of Object.values(buckets)) {
    if (!Array.isArray(list)) continue;
    for (const e of list) {
      if (!e || !e.id) continue;
      nodes.push({
        id: e.id,
        type: e.entityType || e.documentType || 'unknown',
        label: labelOf(e),
        phase: e.projectPhase || null,
        completeness: e._quality?.completeness ?? null
      });
    }
  }

  // 3. Edges — derive from relationship-bearing fields, only when the target
  //    id resolves to a real node (no dangling edges).
  const edges = [];
  const addEdge = (from, to, type, subtype) => {
    if (!to || !byId.has(to) || to === from) return;
    const edge = { from, to, type };
    if (subtype) edge.subtype = subtype;
    edges.push(edge);
  };

  for (const e of byId.values()) {
    for (const [key, value] of Object.entries(e)) {
      if (key === 'id' || key.endsWith('_meta') || key === 'sources') continue;

      // single ref: *Id (plus variantOf, which doesn't follow the *Id suffix)
      if ((key.endsWith('Id') || key === 'variantOf') && typeof value === 'string') {
        addEdge(e.id, value, relType(key));
        continue;
      }
      // array refs: *Ids / *Refs / requirements
      if ((key.endsWith('Ids') || key.endsWith('Refs') || key === 'requirements') && Array.isArray(value)) {
        for (const v of value) {
          if (typeof v === 'string') addEdge(e.id, v, relType(key));
        }
        continue;
      }
      // adjacency: array of { id, relationship }
      if (key === 'adjacentSpaces' && Array.isArray(value)) {
        for (const a of value) {
          if (a && typeof a.id === 'string') addEdge(e.id, a.id, 'adjacent_to', a.relationship);
        }
        continue;
      }
      // inspection deficiencies referencing issues
      if (key === 'result' && value && Array.isArray(value.deficiencies)) {
        for (const d of value.deficiencies) {
          if (d && typeof d.relatedIssueId === 'string') addEdge(e.id, d.relatedIssueId, 'raises_issue');
        }
      }
    }
  }

  // 4. Summaries
  const nodesByType = {};
  for (const n of nodes) nodesByType[n.type] = (nodesByType[n.type] || 0) + 1;
  const edgesByType = {};
  for (const ed of edges) edgesByType[ed.type] = (edgesByType[ed.type] || 0) + 1;

  logger.debug(`Knowledge graph: ${nodes.length} nodes, ${edges.length} edges (${Object.keys(edgesByType).length} relationship types)`);

  // 5. JSON-LD projection: one object per node, outgoing edges grouped by
  //    relationship type as arrays of { "@id": targetId }.
  const VOCAB = 'https://sbm.architecture/vocab#';
  const outByNode = new Map();
  for (const ed of edges) {
    if (!outByNode.has(ed.from)) outByNode.set(ed.from, {});
    const grp = outByNode.get(ed.from);
    (grp[ed.type] ||= []).push({ '@id': ed.to });
  }
  const graph = nodes.map(n => {
    const obj = { '@id': n.id, '@type': n.type, 'rdfs:label': n.label };
    if (n.phase) obj['sbm:phase'] = n.phase;
    const out = outByNode.get(n.id);
    if (out) Object.assign(obj, out);
    return obj;
  });

  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    projectId: sbm.project?.id,
    projectName: sbm.project?.name,
    sbmVersion: sbm.sbm_version,
    summary: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      relationshipTypes: Object.keys(edgesByType).length,
      nodesByType,
      edgesByType
    },
    nodes,
    edges,
    jsonld: {
      '@context': {
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        sbm: VOCAB,
        '@vocab': VOCAB
      },
      '@graph': graph
    }
  };
}
