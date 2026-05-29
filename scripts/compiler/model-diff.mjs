/**
 * Semantic model diff (v2.7 tooling) — an entity- and relationship-aware diff
 * of two compiled sbm.json snapshots (e.g. SD vs CD, git rev N vs N+1, baseline
 * vs a re-compile). Unlike git's line diff, this understands entities, their
 * fields, and the graph edges between them. Pairs with revisionHistory: that
 * records WHY something changed; this computes WHAT actually changed.
 *
 * Fully deterministic and offline.
 */

import { generateKnowledgeGraph } from './targets/knowledge-graph.mjs';

const SILENT = { info() {}, success() {}, warn() {}, error() {}, debug() {}, stage() {} };

// Derived/volatile keys excluded from field-change comparison to cut noise.
const DENYLIST = new Set(['_quality', 'generatedAt', 'changelog']);

function indexById(sbm) {
  const map = new Map();
  for (const list of Object.values(sbm?.entities || {})) {
    if (Array.isArray(list)) for (const e of list) if (e?.id) map.set(e.id, e);
  }
  return map;
}

/** Flatten an object to dotted leaf paths → primitive/JSON-string values. */
function flatten(obj, prefix = '', out = {}) {
  if (obj == null || typeof obj !== 'object') { out[prefix] = obj; return out; }
  if (Array.isArray(obj)) { out[prefix] = JSON.stringify(obj); return out; } // compare arrays whole
  for (const [k, v] of Object.entries(obj)) {
    if (DENYLIST.has(k)) continue;
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, path, out);
    else if (Array.isArray(v)) out[path] = JSON.stringify(v);
    else out[path] = v;
  }
  return out;
}

function diffEntityFields(a, b) {
  const fa = flatten(a), fb = flatten(b);
  const changes = [];
  const keys = new Set([...Object.keys(fa), ...Object.keys(fb)]);
  for (const k of keys) {
    if (k === 'id' || k === 'entityType') continue;
    if (JSON.stringify(fa[k]) !== JSON.stringify(fb[k])) {
      changes.push({ path: k, from: fa[k] ?? null, to: fb[k] ?? null });
    }
  }
  return changes;
}

function edgeKey(e) { return `${e.from}|${e.type}|${e.to}`; }

/**
 * Diff two compiled sbm objects.
 * @returns structured diff
 */
export function diffModels(sbmA, sbmB, opts = {}) {
  const logger = opts.logger || SILENT;
  const a = indexById(sbmA), b = indexById(sbmB);

  const entitiesAdded = [];
  const entitiesRemoved = [];
  const entitiesChanged = [];

  for (const [id, eb] of b) {
    if (!a.has(id)) entitiesAdded.push({ id, type: eb.entityType });
  }
  for (const [id, ea] of a) {
    if (!b.has(id)) { entitiesRemoved.push({ id, type: ea.entityType }); continue; }
    const changes = diffEntityFields(ea, b.get(id));
    if (changes.length) entitiesChanged.push({ id, type: ea.entityType, changes });
  }

  // edge-set diff via the knowledge graph
  const ga = generateKnowledgeGraph(sbmA, logger);
  const gb = generateKnowledgeGraph(sbmB, logger);
  const ka = new Set(ga.edges.map(edgeKey));
  const kb = new Set(gb.edges.map(edgeKey));
  const edgesAdded = gb.edges.filter(e => !ka.has(edgeKey(e)));
  const edgesRemoved = ga.edges.filter(e => !kb.has(edgeKey(e)));

  // rollup deltas: entity-type counts
  const countsA = sbmA?.metadata?.entitiesByType || {};
  const countsB = sbmB?.metadata?.entitiesByType || {};
  const countDeltas = {};
  for (const k of new Set([...Object.keys(countsA), ...Object.keys(countsB)])) {
    const d = (countsB[k] || 0) - (countsA[k] || 0);
    if (d !== 0) countDeltas[k] = { from: countsA[k] || 0, to: countsB[k] || 0, delta: d };
  }

  logger.debug(`Diff: +${entitiesAdded.length}/-${entitiesRemoved.length} entities, ${entitiesChanged.length} changed, +${edgesAdded.length}/-${edgesRemoved.length} edges`);

  return {
    version: '1.0',
    from: { projectId: sbmA?.project?.id, sbmVersion: sbmA?.sbm_version },
    to: { projectId: sbmB?.project?.id, sbmVersion: sbmB?.sbm_version },
    summary: {
      entitiesAdded: entitiesAdded.length,
      entitiesRemoved: entitiesRemoved.length,
      entitiesChanged: entitiesChanged.length,
      edgesAdded: edgesAdded.length,
      edgesRemoved: edgesRemoved.length
    },
    entitiesAdded,
    entitiesRemoved,
    entitiesChanged,
    edgesAdded,
    edgesRemoved,
    rollupDeltas: { entitiesByType: countDeltas }
  };
}

/** Render a diff as a readable text summary. */
export function formatDiffText(diff) {
  const L = [
    `Model diff  (${diff.from.projectId || '?'} → ${diff.to.projectId || '?'})`,
    `  entities: +${diff.summary.entitiesAdded}  -${diff.summary.entitiesRemoved}  ~${diff.summary.entitiesChanged} changed`,
    `  edges:    +${diff.summary.edgesAdded}  -${diff.summary.edgesRemoved}`,
    ''
  ];
  if (diff.entitiesAdded.length) L.push('Added:', ...diff.entitiesAdded.map(e => `  + ${e.id} (${e.type})`), '');
  if (diff.entitiesRemoved.length) L.push('Removed:', ...diff.entitiesRemoved.map(e => `  - ${e.id} (${e.type})`), '');
  if (diff.entitiesChanged.length) {
    L.push('Changed:');
    for (const e of diff.entitiesChanged) {
      L.push(`  ~ ${e.id} (${e.type})`);
      for (const c of e.changes.slice(0, 12)) L.push(`      ${c.path}: ${JSON.stringify(c.from)} → ${JSON.stringify(c.to)}`);
    }
    L.push('');
  }
  const cd = Object.entries(diff.rollupDeltas.entitiesByType);
  if (cd.length) {
    L.push('Count deltas:');
    for (const [k, v] of cd) L.push(`  ${k}: ${v.from} → ${v.to}  (${v.delta > 0 ? '+' : ''}${v.delta})`);
  }
  return L.join('\n');
}
