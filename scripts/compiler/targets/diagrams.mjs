/**
 * Compilation Target: Project-at-a-glance Diagrams (SVG)
 *
 * Three schematic SVGs derivable from current SBM data — no schema
 * extensions required:
 *
 *   1. Massing (LOD 100) — extruded-box axonometric of the building from
 *      footprintArea / buildingHeight / numberOfStoreys + level elevations
 *   2. Stacking — vertical bands per level (elevation, space count, area,
 *      colour by predominant space type)
 *   3. Adjacency & connections — space node-link graph from
 *      openings.spaceIds, with zone-membership chips per space
 *
 * Localised via project.language (en/pl). Designed to embed inside
 * html-report.mjs as a "Project at a glance" panel.
 */

const I18N = {
  en: {
    sectionTitle: 'Project at a glance',
    massingTitle: 'Massing — LOD 100',
    stackingTitle: 'Stacking',
    adjacencyTitle: 'Adjacency & connections',
    spaces: 'spaces',
    footprint: 'footprint',
    gfa: 'GFA',
    storeys: 'storeys',
    eave: 'eave',
    noSpacesDetailed: '(no detailed spaces modelled at this level)',
    noAdjacency: '(no spaces or connections to display)',
    schematicNote: 'Schematic — derived from semantic data, not a survey of the building.',
    fireZone: 'Fire',
    hvacZone: 'HVAC',
    acousticZone: 'Acoustic',
    healthTitle: 'Operation-phase health (v2.2/v2.3)',
    healthTelemetry: 'Telemetry streams',
    healthSurvey: 'Survey dimensions flagged',
    healthRetrocx: 'Retrocx awaiting verification',
    healthEvr: 'Energy class',
    healthNone: 'no signals',
  },
  pl: {
    sectionTitle: 'Projekt w skrócie',
    massingTitle: 'Bryła — LOD 100',
    stackingTitle: 'Stos kondygnacji',
    adjacencyTitle: 'Sąsiedztwa i połączenia',
    spaces: 'przestrzeni',
    footprint: 'zabudowa',
    gfa: 'PUM',
    storeys: 'kondygnacji',
    eave: 'okap',
    noSpacesDetailed: '(brak szczegółowych przestrzeni na tej kondygnacji)',
    noAdjacency: '(brak przestrzeni lub połączeń do pokazania)',
    schematicNote: 'Schemat — wygenerowany z danych semantycznych, nie z pomiaru budynku.',
    fireZone: 'Pożarowa',
    hvacZone: 'HVAC',
    acousticZone: 'Akustyczna',
    healthTitle: 'Zdrowie fazy eksploatacji (v2.2/v2.3)',
    healthTelemetry: 'Strumienie telemetrii',
    healthSurvey: 'Oznaczone wymiary ankiety',
    healthRetrocx: 'Retrocx oczek. weryfikacji',
    healthEvr: 'Klasa energetyczna',
    healthNone: 'brak sygnałów',
  },
};

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pickZoneColor(zoneId) {
  const z = String(zoneId).toLowerCase();
  if (z.includes('fire') || z.includes('pozar')) return { fill: '#fcdfdc', label: 'fire' };
  if (z.includes('hvac')) return { fill: '#dde9f6', label: 'hvac' };
  if (z.includes('acoust') || z.includes('akust')) return { fill: '#e7e0f0', label: 'acoustic' };
  return { fill: '#eef1f6', label: 'other' };
}

// ──────────────────────────────────────────────────────────────────────
// 1. Massing — cabinet/oblique projection of an extruded box
// ──────────────────────────────────────────────────────────────────────
function massingSvg(sbm, L) {
  const building = (sbm.entities?.buildings || [])[0];
  if (!building) return '';

  const footprintArea = Number(building.footprintArea) || 0;
  const H = Number(building.buildingHeight) || 0;
  const storeys =
    building.numberOfStoreys?.total
    || building.numberOfStoreys?.aboveGround
    || (sbm.entities?.levels || []).length
    || 1;
  if (!footprintArea || !H) return '';

  // Square footprint assumption (LOD 100 — we only have area, not aspect)
  const W = Math.sqrt(footprintArea);
  const D = W;

  const scale = 7;                      // px/m
  const obliqueX = D * 0.45 * scale;    // depth horizontal offset
  const obliqueY = D * 0.35 * scale;    // depth vertical offset

  const padLeft = 40, padTop = 30, padRight = 170, padBottom = 56;
  const baseY = padTop + obliqueY + H * scale;
  const totalW = padLeft + W * scale + obliqueX + padRight;
  const totalH = baseY + padBottom;

  // 8 corners (front bottom/top L/R, back bottom/top L/R)
  const fbl = [padLeft,                  baseY];
  const fbr = [padLeft + W * scale,      baseY];
  const ftr = [padLeft + W * scale,      baseY - H * scale];
  const ftl = [padLeft,                  baseY - H * scale];
  const bbl = [fbl[0] + obliqueX, fbl[1] - obliqueY];
  const bbr = [fbr[0] + obliqueX, fbr[1] - obliqueY];
  const btr = [ftr[0] + obliqueX, ftr[1] - obliqueY];
  const btl = [ftl[0] + obliqueX, ftl[1] - obliqueY];

  const levels = (sbm.entities?.levels || [])
    .filter(l => !l.buildingId || l.buildingId === building.id)
    .slice().sort((a, b) => (b.elevation || 0) - (a.elevation || 0));

  const parts = [];
  parts.push(`<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block">`);

  // Back-edges (dashed, behind faces)
  parts.push(`<line x1="${bbl[0]}" y1="${bbl[1]}" x2="${bbr[0]}" y2="${bbr[1]}" stroke="#1f5fbf" stroke-width="0.8" stroke-dasharray="3 3"/>`);
  parts.push(`<line x1="${bbl[0]}" y1="${bbl[1]}" x2="${btl[0]}" y2="${btl[1]}" stroke="#1f5fbf" stroke-width="0.8" stroke-dasharray="3 3"/>`);

  // Top face (roof)
  parts.push(`<polygon points="${ftl[0]},${ftl[1]} ${ftr[0]},${ftr[1]} ${btr[0]},${btr[1]} ${btl[0]},${btl[1]}" fill="#e7eef7" stroke="#1f5fbf" stroke-width="1.2"/>`);
  // Right face
  parts.push(`<polygon points="${fbr[0]},${fbr[1]} ${ftr[0]},${ftr[1]} ${btr[0]},${btr[1]} ${bbr[0]},${bbr[1]}" fill="#d3def0" stroke="#1f5fbf" stroke-width="1.2"/>`);
  // Front face
  parts.push(`<polygon points="${fbl[0]},${fbl[1]} ${fbr[0]},${fbr[1]} ${ftr[0]},${ftr[1]} ${ftl[0]},${ftl[1]}" fill="#f6f8fb" stroke="#1f5fbf" stroke-width="1.4"/>`);

  // Floor lines on the front face + level labels on the right
  for (const lvl of levels) {
    const z = Number(lvl.elevation || 0);
    if (z < 0 || z > H + 0.01) continue;
    const yFront = baseY - z * scale;
    const yRightBack = yFront - obliqueY;
    // line on front face
    parts.push(`<line x1="${fbl[0]}" y1="${yFront}" x2="${fbr[0]}" y2="${yFront}" stroke="#9ab" stroke-dasharray="3 3" stroke-width="0.8"/>`);
    // line on right face (front-right to back-right at this elevation)
    parts.push(`<line x1="${fbr[0]}" y1="${yFront}" x2="${bbr[0]}" y2="${yRightBack}" stroke="#9ab" stroke-dasharray="3 3" stroke-width="0.7"/>`);
    // label outside the right edge
    const labelX = bbr[0] + 8;
    const labelY = (yFront + yRightBack) / 2 + 4;
    parts.push(`<text x="${labelX}" y="${labelY}" font-size="10" fill="#5b6675" font-family="sans-serif">${esc(lvl.id)} · ${z.toFixed(1)} m</text>`);
  }

  // Eave marker
  if (building.eaveHeight && building.eaveHeight < H) {
    const eaveY = baseY - Number(building.eaveHeight) * scale;
    parts.push(`<line x1="${fbl[0] - 8}" y1="${eaveY}" x2="${fbl[0]}" y2="${eaveY}" stroke="#5b6675" stroke-width="1"/>`);
    parts.push(`<text x="${fbl[0] - 10}" y="${eaveY + 4}" text-anchor="end" font-size="10" fill="#5b6675" font-family="sans-serif">${esc(L.eave)} ${Number(building.eaveHeight).toFixed(1)} m</text>`);
  }

  // Footer summary below the box
  const lY = baseY + 22;
  parts.push(`<text x="${padLeft}" y="${lY}" font-size="12" fill="#1a2230" font-family="sans-serif" font-weight="600">${esc(building.name || building.id)}</text>`);
  const gfa = Number(building.grossFloorArea) || 0;
  const summary = `${W.toFixed(1)}×${D.toFixed(1)}×${H.toFixed(1)} m · ${storeys} ${L.storeys} · ${L.footprint} ${footprintArea.toFixed(0)} m²${gfa ? ` · ${L.gfa} ${gfa.toFixed(0)} m²` : ''}`;
  parts.push(`<text x="${padLeft}" y="${lY + 16}" font-size="10" fill="#5b6675" font-family="sans-serif">${esc(summary)}</text>`);

  parts.push(`</svg>`);
  return parts.join('\n');
}

// ──────────────────────────────────────────────────────────────────────
// 2. Stacking — horizontal bands per level
// ──────────────────────────────────────────────────────────────────────
function bandFillForLevel(spaces) {
  if (!spaces.length) return '#eef1f6';
  const counts = {};
  for (const s of spaces) counts[s.spaceType] = (counts[s.spaceType] || 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  if (top === 'bedroom' || top === 'living_room' || top === 'sleeping_space' || top === 'dining_room' || top === 'kitchen') return '#dff0e1';
  if (top === 'corridor' || top === 'common_area' || top === 'lobby') return '#e7eef7';
  if (top === 'staircase') return '#f0e7e0';
  if (top === 'plant_room' || top === 'mechanical') return '#ececec';
  return '#f3eedb';
}

function stackingSvg(sbm, L) {
  const building = (sbm.entities?.buildings || [])[0];
  if (!building) return '';
  const levels = (sbm.entities?.levels || [])
    .filter(l => !l.buildingId || l.buildingId === building.id)
    .slice().sort((a, b) => (b.elevation || 0) - (a.elevation || 0));
  if (!levels.length) return '';

  const spacesByLevel = {};
  for (const s of (sbm.entities?.spaces || [])) {
    (spacesByLevel[s.levelId] = spacesByLevel[s.levelId] || []).push(s);
  }

  const bandH = 44;
  const bandW = 330;
  const left = 90;
  const top = 30;
  const totalH = top + levels.length * bandH + 16;
  const totalW = left + bandW + 220;

  const parts = [];
  parts.push(`<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block">`);

  levels.forEach((lvl, i) => {
    const y = top + i * bandH;
    const ss = spacesByLevel[lvl.id] || [];
    const fill = bandFillForLevel(ss);
    parts.push(`<rect x="${left}" y="${y}" width="${bandW}" height="${bandH - 4}" fill="${fill}" stroke="#1f5fbf" stroke-width="0.8"/>`);
    // elevation on the left
    parts.push(`<text x="${left - 10}" y="${y + bandH / 2 + 2}" text-anchor="end" font-size="11" fill="#5b6675" font-family="sans-serif">${Number(lvl.elevation || 0).toFixed(2)} m</text>`);
    // level name inside
    parts.push(`<text x="${left + 12}" y="${y + 17}" font-size="12" fill="#1a2230" font-family="sans-serif" font-weight="600">${esc(lvl.id)} · ${esc(lvl.levelName || '')}</text>`);
    // right summary
    const totalArea = ss.reduce((a, s) => a + (Number(s.designArea) || 0), 0);
    const summary = ss.length > 0
      ? `${ss.length} ${L.spaces} · ${totalArea.toFixed(0)} m²`
      : L.noSpacesDetailed;
    parts.push(`<text x="${left + 12}" y="${y + 32}" font-size="10" fill="#5b6675" font-family="sans-serif">${esc(summary)}</text>`);
  });

  parts.push(`</svg>`);
  return parts.join('\n');
}

// ──────────────────────────────────────────────────────────────────────
// 3. Adjacency — node-link graph with zone chips
// ──────────────────────────────────────────────────────────────────────
function adjacencySvg(sbm, L) {
  const spaces = sbm.entities?.spaces || [];
  if (!spaces.length) return '';

  // Edges from openings that connect two or more spaces
  const edges = [];
  for (const op of (sbm.entities?.openings || [])) {
    if (Array.isArray(op.spaceIds) && op.spaceIds.length >= 2) {
      for (let i = 0; i < op.spaceIds.length - 1; i++) {
        for (let j = i + 1; j < op.spaceIds.length; j++) {
          edges.push({ from: op.spaceIds[i], to: op.spaceIds[j], label: op.openingTypeId || op.id });
        }
      }
    }
  }

  // Grid layout
  const cols = Math.max(2, Math.ceil(Math.sqrt(spaces.length)));
  const rows = Math.ceil(spaces.length / cols);
  const cellW = 180, cellH = 90;
  const boxW = 150, boxH = 60;
  const left = 30, top = 30, bottomPad = 36;
  const totalW = left * 2 + cols * cellW;
  const totalH = top + rows * cellH + bottomPad;

  const posById = {};
  spaces.forEach((s, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    posById[s.id] = {
      cx: left + col * cellW + cellW / 2,
      cy: top + row * cellH + cellH / 2,
    };
  });

  const parts = [];
  parts.push(`<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block">`);

  // Edges (under nodes)
  for (const e of edges) {
    const a = posById[e.from], b = posById[e.to];
    if (!a || !b) continue;
    parts.push(`<line x1="${a.cx}" y1="${a.cy}" x2="${b.cx}" y2="${b.cy}" stroke="#1f5fbf" stroke-width="1.4" opacity="0.7"/>`);
    if (e.label) {
      const mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
      const labelW = Math.min(120, esc(e.label).length * 6 + 10);
      parts.push(`<rect x="${mx - labelW / 2}" y="${my - 9}" width="${labelW}" height="14" rx="3" fill="#fff" stroke="#cdd5e0" stroke-width="0.5"/>`);
      parts.push(`<text x="${mx}" y="${my + 1}" text-anchor="middle" font-size="9" fill="#5b6675" font-family="sans-serif">${esc(e.label)}</text>`);
    }
  }

  // Nodes
  for (const s of spaces) {
    const p = posById[s.id];
    const x = p.cx - boxW / 2, y = p.cy - boxH / 2;
    parts.push(`<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="6" fill="#fff" stroke="#1f5fbf" stroke-width="1.2"/>`);
    parts.push(`<text x="${p.cx}" y="${y + 19}" text-anchor="middle" font-size="11" fill="#1a2230" font-family="sans-serif" font-weight="600">${esc(s.spaceName || s.id)}</text>`);
    const sub = `${s.spaceType || ''}${s.designArea ? ` · ${Number(s.designArea).toFixed(1)} m²` : ''}`;
    parts.push(`<text x="${p.cx}" y="${y + 34}" text-anchor="middle" font-size="9" fill="#5b6675" font-family="sans-serif">${esc(sub)}</text>`);
    // zone chips along the bottom edge
    const zones = (s.zoneIds || []).slice(0, 4);
    if (zones.length) {
      const innerW = boxW - 8;
      const chipW = innerW / zones.length;
      zones.forEach((zid, i) => {
        const c = pickZoneColor(zid);
        parts.push(`<rect x="${x + 4 + i * chipW}" y="${y + boxH - 11}" width="${chipW - 2}" height="7" rx="2" fill="${c.fill}"/>`);
      });
    }
  }

  // Legend
  const lgY = totalH - 12;
  let lgX = left;
  for (const [labelKey, color] of [[L.fireZone, '#fcdfdc'], [L.hvacZone, '#dde9f6'], [L.acousticZone, '#e7e0f0']]) {
    parts.push(`<rect x="${lgX}" y="${lgY - 9}" width="14" height="9" rx="2" fill="${color}"/>`);
    parts.push(`<text x="${lgX + 18}" y="${lgY - 1}" font-size="10" fill="#5b6675" font-family="sans-serif">${esc(labelKey)}</text>`);
    lgX += 18 + 14 + String(labelKey).length * 6.5 + 16;
  }

  parts.push(`</svg>`);
  return parts.join('\n');
}

// ──────────────────────────────────────────────────────────────────────
// Combined panel for embedding in the HTML report
// ──────────────────────────────────────────────────────────────────────
/**
 * v2.2/v2.3 operation-phase health overlay.
 * Renders a small 4-tile SVG with status counts when the model has any
 * operation-phase entities. Returns null for design-phase projects.
 */
function operationHealthSvg(sbm, L) {
  const telemetry = sbm.entities.telemetry_streams || [];
  const surveys = sbm.entities.occupant_surveys || [];
  const evrs = sbm.entities.energy_verification_records || [];
  const retrocx = sbm.entities.retrocx_recommendations || [];

  if (telemetry.length === 0 && surveys.length === 0 && evrs.length === 0 && retrocx.length === 0) {
    return null;
  }

  // Telemetry: count breaching design target
  const telBreach = telemetry.filter(t =>
    (t.summaryStatistics?.thresholds || []).some(th => th.kind === 'design_target' && th.currentlyExceeded)
  ).length;

  // Surveys: count flagged dimensions across all surveys
  const surveyFlagged = surveys.reduce(
    (n, s) => n + (s.dimensions || []).filter(d => d.flagged).length,
    0
  );

  // EVR: most recent verdict
  const latestEvr = evrs.length
    ? evrs.reduce((a, b) => ((a.period?.end || '') > (b.period?.end || '') ? a : b))
    : null;
  const evrClassMatched = latestEvr?.measured?.energyClass === latestEvr?.designTargets?.energyClass;
  const evrLabel = latestEvr
    ? `${latestEvr.measured?.energyClass || '—'} ${evrClassMatched ? '✓' : '↓'}`
    : '—';

  // Retro-cx: count awaiting verification
  const rcxAwaiting = retrocx.filter(r => r.status === 'executed_awaiting_verification').length;

  // Choose colour per tile (green = clean, amber = attention)
  const tileBg = (warn) => warn ? '#fdf3df' : '#e7f5ee';
  const tileInk = (warn) => warn ? '#9a6a00' : '#1a7f4b';

  const tile = (x, label, big, warn) =>
    `<g transform="translate(${x},0)">
       <rect width="155" height="92" rx="8" fill="${tileBg(warn)}" stroke="${tileInk(warn)}" stroke-width="1.5"/>
       <text x="77" y="46" text-anchor="middle" font-family="-apple-system,Segoe UI,sans-serif"
             font-size="28" font-weight="700" fill="${tileInk(warn)}">${esc(big)}</text>
       <text x="77" y="72" text-anchor="middle" font-family="-apple-system,Segoe UI,sans-serif"
             font-size="11" fill="${tileInk(warn)}">${esc(label)}</text>
     </g>`;

  return `<svg viewBox="0 0 660 92" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;height:auto">
    ${tile(0,   `${L.healthTelemetry}` + (telemetry.length ? ` (of ${telemetry.length})` : ''), telBreach || '0', telBreach > 0)}
    ${tile(168, L.healthSurvey,    surveyFlagged || '0', surveyFlagged > 0)}
    ${tile(336, L.healthRetrocx,   rcxAwaiting   || '0', rcxAwaiting > 0)}
    ${tile(504, L.healthEvr,       evrLabel,     latestEvr && !evrClassMatched)}
  </svg>`;
}

export function generateDiagrams(sbm, language = 'en') {
  const lang = String(language || 'en').toLowerCase().startsWith('pl') ? 'pl' : 'en';
  const L = I18N[lang];

  const m = massingSvg(sbm, L);
  const s = stackingSvg(sbm, L);
  const a = adjacencySvg(sbm, L);
  const h = operationHealthSvg(sbm, L);

  if (!m && !s && !a && !h) return ''; // no data → no panel

  const cell = (title, svg, full = false) => svg
    ? `<div style="${full ? 'grid-column:1 / -1;' : ''}">
         <div class="diag-title">${esc(title)}</div>
         ${svg}
       </div>`
    : '';

  return `
<h2>${esc(L.sectionTitle)}</h2>
<div class="panel" style="background:#fff">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 24px;align-items:start">
    ${cell(L.massingTitle, m)}
    ${cell(L.stackingTitle, s)}
    ${cell(L.adjacencyTitle, a, true)}
    ${cell(L.healthTitle, h, true)}
  </div>
  <p style="margin:14px 0 0;color:var(--mut);font-size:12px;font-style:italic">${esc(L.schematicNote)}</p>
</div>`;
}
