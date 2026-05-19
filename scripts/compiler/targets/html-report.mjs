/**
 * Compilation Target: Human-Readable HTML Report
 *
 * A single self-contained, printable page combining phase readiness,
 * requirement-verification progress, data quality and regulatory
 * compliance — written for a principal/client to read, not a developer.
 *
 * Deliberately reframes the numbers: at early lifecycle phases most
 * requirements are *defined but not yet verified*. That is expected and
 * healthy — it is verification PROGRESS, not a compliance failure score.
 */

import { UNIFIED_PHASES, phaseRank } from '../constants.mjs';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pct(n) {
  return `${Math.round((n || 0) * 100)}%`;
}

function phaseStrip(current) {
  const cur = phaseRank(current);
  return UNIFIED_PHASES.map((p, i) => {
    const cls = i < cur ? 'done' : i === cur ? 'now' : 'todo';
    return `<li class="${cls}"><span>${i + 1}</span>${esc(p)}</li>`;
  }).join('');
}

export function generateHtmlReport(sbm, projectQuality, complianceReport, qualityReport, durationSec) {
  const project = sbm.project || {};
  const pq = projectQuality || {};
  const cs = complianceReport?.summary || {};
  const pr = qualityReport?.phaseReadiness || {};
  const conf = pq.fieldsByConfidence || {};

  const entityCount = Object.values(sbm.entities || {})
    .reduce((n, v) => n + (Array.isArray(v) ? v.length : 0), 0);

  const verified = cs.verified || 0;
  const pending = cs.pendingVerification || 0;
  const review = cs.reviewRequired || 0;
  const totalReq = cs.totalRequirements || (verified + pending + review) || 0;
  const beforeCD = phaseRank(pr.currentPhase) < phaseRank('construction_documents');

  const recs = (qualityReport?.recommendations || []).slice(0, 5);
  const plSections = complianceReport?.polandSpecificCompliance?.sections || [];

  const blockers = pr.blockers || [];
  const readyBadge = blockers.length === 0
    ? `<span class="badge ok">READY</span>`
    : `<span class="badge warn">${blockers.length} BLOCKER(S)</span>`;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SBM Report — ${esc(project.name || project.id || 'Project')}</title>
<style>
  :root{--ink:#1a2230;--mut:#5b6675;--line:#e3e8ef;--ok:#1a7f4b;--okbg:#e7f5ee;
        --warn:#9a6a00;--warnbg:#fdf3df;--accent:#1f5fbf;--bg:#f6f8fb}
  *{box-sizing:border-box}
  body{font:15px/1.55 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
       color:var(--ink);margin:0;background:var(--bg)}
  .wrap{max-width:920px;margin:0 auto;padding:40px 28px}
  header{border-bottom:3px solid var(--accent);padding-bottom:18px;margin-bottom:8px}
  h1{font-size:24px;margin:0 0 4px}
  .sub{color:var(--mut);font-size:14px}
  h2{font-size:16px;margin:34px 0 12px;letter-spacing:.02em;text-transform:uppercase;color:var(--mut)}
  .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:18px 0}
  .card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:16px}
  .card .n{font-size:26px;font-weight:700}
  .card .l{color:var(--mut);font-size:12px;text-transform:uppercase;letter-spacing:.03em}
  .badge{display:inline-block;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px}
  .badge.ok{background:var(--okbg);color:var(--ok)} .badge.warn{background:var(--warnbg);color:var(--warn)}
  .panel{background:#fff;border:1px solid var(--line);border-radius:10px;padding:18px 20px}
  .note{background:var(--okbg);border-left:4px solid var(--ok);padding:12px 16px;border-radius:6px;font-size:14px;color:#244}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:10px;overflow:hidden}
  th,td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--line);font-size:14px}
  th{background:#fafbfd;color:var(--mut);font-size:12px;text-transform:uppercase;letter-spacing:.03em}
  tr:last-child td{border-bottom:0}
  ol.phases{list-style:none;display:flex;flex-wrap:wrap;gap:6px;padding:0;margin:14px 0}
  ol.phases li{font-size:12px;padding:6px 10px;border-radius:7px;border:1px solid var(--line);color:var(--mut);background:#fff}
  ol.phases li span{display:inline-block;width:18px;height:18px;line-height:18px;text-align:center;
       border-radius:50%;background:#eef1f6;margin-right:7px;font-weight:700}
  ol.phases li.done{color:var(--ok);border-color:var(--okbg)} ol.phases li.done span{background:var(--okbg);color:var(--ok)}
  ol.phases li.now{color:#fff;background:var(--accent);border-color:var(--accent);font-weight:700}
  ol.phases li.now span{background:#fff;color:var(--accent)}
  .bar{height:10px;border-radius:999px;background:#eef1f6;overflow:hidden;margin:8px 0}
  .bar i{display:block;height:100%;background:var(--ok)}
  footer{margin-top:40px;color:var(--mut);font-size:12px;border-top:1px solid var(--line);padding-top:14px}
  @media print{body{background:#fff}.wrap{max-width:none;padding:0}}
</style></head>
<body><div class="wrap">

<header>
  <h1>${esc(project.name || 'Semantic Building Model')}</h1>
  <div class="sub">Semantic Building Model report · project <strong>${esc(project.id || '—')}</strong>
   · phase <strong>${esc(pr.currentPhase || project.phase || '—')}</strong>
   · generated ${esc(new Date(complianceReport?.generatedAt || Date.now()).toISOString().slice(0, 16).replace('T', ' '))} UTC</div>
</header>

<div class="cards">
  <div class="card"><div class="n">${entityCount}</div><div class="l">Entities modelled</div></div>
  <div class="card"><div class="n">${totalReq}</div><div class="l">Requirements tracked</div></div>
  <div class="card"><div class="n">${pct(pq.averageWeightedCompleteness ?? pq.averageCompleteness)}</div><div class="l">Avg. completeness</div></div>
  <div class="card"><div class="n">${durationSec != null ? durationSec + 's' : '—'}</div><div class="l">Compiled in</div></div>
</div>

<h2>Lifecycle position</h2>
<div class="panel">
  <p style="margin:0 0 4px">Current phase <strong>${esc(pr.currentPhase || '—')}</strong> ${readyBadge}
     ${pr.nextPhase && pr.nextPhase !== pr.currentPhase ? `→ next: <strong>${esc(pr.nextPhase)}</strong>` : ''}</p>
  <ol class="phases">${phaseStrip(pr.currentPhase || project.phase)}</ol>
  ${blockers.length ? `<table><tr><th>Blocker</th><th>Action</th></tr>${
    blockers.map(b => `<tr><td>${esc(b.rule)}</td><td>${esc(b.action)}</td></tr>`).join('')}</table>`
    : `<p style="margin:0;color:var(--ok)"><strong>No blockers</strong> — data quality is sufficient to advance.</p>`}
</div>

<h2>Requirement verification progress</h2>
<div class="panel">
  <div class="bar"><i style="width:${totalReq ? Math.round(verified / totalReq * 100) : 0}%"></i></div>
  <table>
    <tr><th>Verified</th><th>Pending verification</th><th>Review required</th><th>Total</th></tr>
    <tr><td>${verified}</td><td>${pending}</td><td>${review}</td><td>${totalReq}</td></tr>
  </table>
  ${beforeCD ? `<p class="note" style="margin-top:14px">Verification happens progressively through the
    lifecycle. Before <strong>construction_documents</strong> most requirements are
    <em>defined but not yet verified</em> — ${pending} pending here is expected and healthy,
    not a compliance shortfall.</p>` : ''}
</div>

${plSections.length ? `<h2>Regulatory compliance — ${esc(complianceReport.polandSpecificCompliance.regulation)}</h2>
<table>
  <tr><th>Section</th><th>Description</th><th>Status</th></tr>
  ${plSections.slice(0, 12).map(s => `<tr><td>${esc(s.section)}</td><td>${esc(s.description)}</td><td>${esc(s.status)}</td></tr>`).join('')}
</table>` : ''}

<h2>Data quality</h2>
<table>
  <tr><th>Confidence</th><th>Fields</th></tr>
  ${['measured', 'calculated', 'specified', 'estimated', 'assumed', 'unknown']
      .filter(k => conf[k]).map(k => `<tr><td>${k}</td><td>${conf[k]}</td></tr>`).join('') || '<tr><td colspan="2">—</td></tr>'}
</table>

${recs.length ? `<h2>Top recommendations</h2><div class="panel"><ol style="margin:0;padding-left:18px">${
  recs.map(r => `<li style="margin:6px 0">${esc(r.action || r.rule || r)}</li>`).join('')}</ol></div>` : ''}

<footer>
  Generated by the Semantic Building Model compiler
  v${esc(sbm.compiler?.version || '2.0.0')} · ${esc(sbm.sbm_version ? 'SBM ' + sbm.sbm_version : '')} ·
  This page is produced automatically from plain-text entity files.
</footer>

</div></body></html>`;
}
