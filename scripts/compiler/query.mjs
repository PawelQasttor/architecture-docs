/**
 * Query layer (v2.7 tooling) — a small, deterministic, offline query DSL over a
 * compiled sbm.json. Attribute filters run over the full entities; relationship
 * traversal runs over the knowledge graph (built internally). No LLM, no network
 * — this is the substrate an external agent (or a human) uses to ask the model
 * "what is X / what connects to X / which entities match Y".
 *
 * DSL (parser-free, tokenised on whitespace; quote multi-word values):
 *   list <entityType> [where <path> <op> <value>]
 *   count <entityType> [where <path> <op> <value>]
 *   get <id>
 *   neighbors <id> [<relType>] [in|out]
 *
 * ops: =  !=  >  <  >=  <=  contains  exists
 */

import { generateKnowledgeGraph } from './targets/knowledge-graph.mjs';

const SILENT = { info() {}, success() {}, warn() {}, error() {}, debug() {}, stage() {} };

/** Resolve a dotted path (e.g. "cost.totalCost") against an object. */
export function getByPath(obj, path) {
  if (!path) return undefined;
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

/** Map an entityType (singular, e.g. "space") or a bucket name (plural) to the bucket key. */
function resolveBucket(entities, typeToken) {
  if (entities[typeToken]) return typeToken;               // already a bucket name
  const plural = typeToken.endsWith('s') ? typeToken : `${typeToken}s`;
  if (entities[plural]) return plural;
  // fall back: find a bucket whose items declare this entityType
  for (const [bucket, list] of Object.entries(entities)) {
    if (Array.isArray(list) && list.some(e => e?.entityType === typeToken)) return bucket;
  }
  return null;
}

function tokenize(expr) {
  // split on whitespace but keep "quoted phrases" together
  const tokens = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while ((m = re.exec(expr)) !== null) tokens.push(m[1] ?? m[2] ?? m[3]);
  return tokens;
}

function applyOp(actual, op, expected) {
  switch (op) {
    case 'exists': return actual !== undefined && actual !== null;
    case '=': case '==': return String(actual) === expected;
    case '!=': return String(actual) !== expected;
    case 'contains':
      if (Array.isArray(actual)) return actual.map(String).includes(expected);
      return String(actual ?? '').toLowerCase().includes(String(expected).toLowerCase());
    case '>': case '<': case '>=': case '<=': {
      const a = Number(actual), b = Number(expected);
      if (Number.isNaN(a) || Number.isNaN(b)) return false;
      return op === '>' ? a > b : op === '<' ? a < b : op === '>=' ? a >= b : a <= b;
    }
    default: return false;
  }
}

function parseWhere(tokens, startIdx) {
  // tokens[startIdx] should be "where"; returns { path, op, value } or null
  if (tokens[startIdx] !== 'where') return null;
  const path = tokens[startIdx + 1];
  const op = tokens[startIdx + 2];
  const value = tokens.slice(startIdx + 3).join(' ');
  return { path, op, value };
}

function filterEntities(list, where) {
  if (!where) return list;
  return list.filter(e => applyOp(getByPath(e, where.path), where.op, where.value));
}

function trim(entity, where) {
  const out = { id: entity.id, type: entity.entityType, label: entity.spaceName || entity.name || entity.optionName || entity.permitTitle || entity.issueTitle || entity.id };
  if (where?.path) out[where.path] = getByPath(entity, where.path);
  return out;
}

/**
 * Run a query against a compiled sbm object.
 * @returns { query, command, matchCount, results, error? }
 */
export function runQuery(sbm, expr, opts = {}) {
  const logger = opts.logger || SILENT;
  const entities = sbm?.entities || {};
  const tokens = tokenize((expr || '').trim());
  const fail = (msg) => ({ query: expr, error: msg, matchCount: 0, results: [] });

  if (tokens.length === 0) return fail('empty query');
  const command = tokens[0].toLowerCase();

  if (command === 'list' || command === 'count') {
    const typeToken = tokens[1];
    if (!typeToken) return fail(`${command} requires an entity type`);
    const bucket = resolveBucket(entities, typeToken);
    if (!bucket) return fail(`unknown entity type "${typeToken}"`);
    const where = parseWhere(tokens, 2);
    if (tokens[2] && !where) return fail(`expected "where" after "${command} ${typeToken}"`);
    const matched = filterEntities(entities[bucket] || [], where);
    logger.debug(`${command} ${bucket}: ${matched.length} match`);
    if (command === 'count') return { query: expr, command, matchCount: matched.length, results: [{ count: matched.length }] };
    return { query: expr, command, matchCount: matched.length, results: matched.map(e => trim(e, where)) };
  }

  // graph-backed commands
  const graph = generateKnowledgeGraph(sbm, logger);
  const nodeById = new Map(graph.nodes.map(n => [n.id, n]));

  if (command === 'get') {
    const id = tokens[1];
    if (!id) return fail('get requires an id');
    // find the full entity
    let entity = null;
    for (const list of Object.values(entities)) {
      if (Array.isArray(list)) { const hit = list.find(e => e?.id === id); if (hit) { entity = hit; break; } }
    }
    if (!entity) return fail(`entity "${id}" not found`);
    const out = graph.edges.filter(e => e.from === id);
    const incoming = graph.edges.filter(e => e.to === id);
    return {
      query: expr, command, matchCount: 1,
      results: [{ id, type: entity.entityType, label: nodeById.get(id)?.label,
        outgoing: out.map(e => ({ type: e.type, to: e.to })),
        incoming: incoming.map(e => ({ type: e.type, from: e.from })),
        entity }]
    };
  }

  if (command === 'neighbors') {
    const id = tokens[1];
    if (!id) return fail('neighbors requires an id');
    const relType = tokens[2] && tokens[2] !== 'in' && tokens[2] !== 'out' ? tokens[2] : null;
    const dir = tokens.includes('in') ? 'in' : tokens.includes('out') ? 'out' : 'both';
    let edges = graph.edges.filter(e => e.from === id || e.to === id);
    if (relType) edges = edges.filter(e => e.type === relType);
    if (dir === 'out') edges = edges.filter(e => e.from === id);
    if (dir === 'in') edges = edges.filter(e => e.to === id);
    const results = edges.map(e => {
      const otherId = e.from === id ? e.to : e.from;
      return { id: otherId, type: nodeById.get(otherId)?.type, label: nodeById.get(otherId)?.label, relation: e.type, direction: e.from === id ? 'out' : 'in' };
    });
    return { query: expr, command, matchCount: results.length, results };
  }

  return fail(`unknown command "${command}" (expected list | count | get | neighbors)`);
}

/** Render a query result as a readable text table. */
export function formatQueryText(result) {
  if (result.error) return `Query error: ${result.error}`;
  const lines = [`Query: ${result.query}`, `Matches: ${result.matchCount}`, ''];
  for (const r of result.results) {
    if (r.count !== undefined) { lines.push(`count = ${r.count}`); continue; }
    if (r.relation) { lines.push(`  ${r.direction === 'out' ? '→' : '←'} ${r.relation}  ${r.id}  (${r.type || '?'})  ${r.label || ''}`); continue; }
    if (r.outgoing) {
      lines.push(`${r.id}  (${r.type})  ${r.label || ''}`);
      r.outgoing.forEach(e => lines.push(`  → ${e.type}  ${e.to}`));
      r.incoming.forEach(e => lines.push(`  ← ${e.type}  ${e.from}`));
      continue;
    }
    const extra = Object.entries(r).filter(([k]) => !['id', 'type', 'label'].includes(k)).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join('  ');
    lines.push(`  ${r.id}  (${r.type || '?'})  ${r.label || ''}${extra ? '  ' + extra : ''}`);
  }
  return lines.join('\n');
}
