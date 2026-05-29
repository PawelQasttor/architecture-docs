/**
 * Option-comparison target (v2.5) — for each design_option, roll up the model
 * as "baseline (untagged entities) + that option's tagged entities" and present
 * the alternatives side by side. This is the payoff of the design-options axis:
 * "Scheme A vs Scheme B on cost / area / embodied carbon."
 *
 * Mirrors the compiler's double-count guard: the WHOLE-MODEL rollups in
 * normalize.mjs already exclude designOptionId-tagged entities, so the baseline
 * here is exactly those untagged entities, and each option layers its own
 * tagged entities on top.
 *
 * Returns null when the model has no design_options (design-phase models that
 * don't explore alternatives), so downstream consumers can skip the section.
 */

// Leaf cost carriers (parents like building/level/site/system receive cost via
// rollup, so summing them too would double-count).
const COST_LEAF_BUCKETS = [
  'spaces', 'envelopes', 'assets', 'openings', 'site_features', 'materials', 'structural_systems'
];

function spaceCarbon(space) {
  const ec = space.performanceTargets?.embodiedCarbon;
  if (!ec) return 0;
  return ec.wholeLife?.total ?? ec.construction?.total ?? 0;
}

/**
 * Aggregate cost / area / carbon / counts over entities matching `belongs`.
 */
function aggregate(sbm, belongs) {
  let totalCost = 0, totalArea = 0, totalEmbodiedCarbon = 0, spaceCount = 0;
  for (const bucket of COST_LEAF_BUCKETS) {
    for (const e of (sbm.entities[bucket] || [])) {
      if (!belongs(e)) continue;
      if (e.cost?.totalCost) totalCost += e.cost.totalCost;
    }
  }
  for (const space of (sbm.entities.spaces || [])) {
    if (!belongs(space)) continue;
    spaceCount++;
    if (space.designArea) totalArea += space.designArea;
    totalEmbodiedCarbon += spaceCarbon(space);
  }
  return {
    totalCost: Math.round(totalCost),
    totalArea: Math.round(totalArea * 100) / 100,
    totalEmbodiedCarbon: Math.round(totalEmbodiedCarbon),
    spaceCount
  };
}

export function generateOptionComparison(sbm, logger) {
  const options = sbm.entities?.design_options || [];
  if (options.length === 0) {
    logger.debug('No design_options — skipping option comparison');
    return null;
  }

  const currency = sbm.project?.budget?.currency || 'EUR';

  // Baseline = entities common to all options (no designOptionId).
  const isBaseline = (e) => !e.designOptionId;
  const baseline = aggregate(sbm, isBaseline);

  const optionRollups = options.map(opt => {
    const belongs = (e) => !e.designOptionId || e.designOptionId === opt.id;
    const rollup = aggregate(sbm, belongs);
    // count entities tagged specifically to this option
    let taggedEntityCount = 0;
    for (const list of Object.values(sbm.entities)) {
      if (Array.isArray(list)) taggedEntityCount += list.filter(e => e.designOptionId === opt.id).length;
    }
    return {
      id: opt.id,
      optionName: opt.optionName,
      status: opt.status,
      decisionDate: opt.decisionDate || null,
      taggedEntityCount,
      authoredComparison: opt.comparison || null, // headline metrics the author supplied
      rollup                                       // compiler-computed: baseline + this option
    };
  });

  const selected = optionRollups.find(o => o.status === 'selected') || null;

  // Side-by-side delta vs the selected option (or vs the first option).
  const reference = selected || optionRollups[0];
  const comparison = optionRollups.map(o => ({
    id: o.id,
    optionName: o.optionName,
    status: o.status,
    totalCost: o.rollup.totalCost,
    totalArea: o.rollup.totalArea,
    totalEmbodiedCarbon: o.rollup.totalEmbodiedCarbon,
    spaceCount: o.rollup.spaceCount,
    deltaCostVsReference: o.rollup.totalCost - reference.rollup.totalCost,
    deltaAreaVsReference: Math.round((o.rollup.totalArea - reference.rollup.totalArea) * 100) / 100
  }));

  logger.debug(`Option comparison: ${options.length} options, selected=${selected?.id || 'none'}`);

  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    projectId: sbm.project?.id,
    projectName: sbm.project?.name,
    currency,
    optionCount: options.length,
    selectedOptionId: selected?.id || null,
    baseline,
    options: optionRollups,
    comparison
  };
}
