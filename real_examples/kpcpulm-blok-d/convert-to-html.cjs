const fs = require('fs');
const path = require('path');

// ─── UTILITIES ───────────────────────────────────────────

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// ─── HIERARCHICAL DOCUMENT TREE ──────────────────────────
// Mirrors actual building structure: Building → Levels → Spaces

// Auto-discover space files from a floor directory
function discoverSpaces(floorDir) {
    const dirPath = path.join(__dirname, 'spaces', floorDir);
    if (!fs.existsSync(dirPath)) return [];

    return fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.md'))
        .sort((a, b) => {
            // Sort by room number numerically
            const numA = parseFloat(a.replace(/-/g, '.'));
            const numB = parseFloat(b.replace(/-/g, '.'));
            return numA - numB;
        })
        .map(f => {
            // Extract title from first line of the file
            const content = fs.readFileSync(path.join(dirPath, f), 'utf-8');
            const titleMatch = content.match(/^#\s+.*?:\s*(.+)/m);
            const title = titleMatch ? titleMatch[1].trim() : f.replace('.md', '');
            return { path: `spaces/${floorDir}/${f}`, title };
        });
}

const docTree = [
    { path: 'inwestycja.md', title: 'Opis Inwestycji' },
    {
        path: 'budynek.md', title: 'Budynek', children: [
            {
                title: 'Strefy', type: 'group', children: [
                    { path: 'zones/strefa-pozarowa-zl-iv.md', title: 'Strefa pożarowa ZL-IV' },
                    { path: 'zones/strefa-medyczna-grupa-2.md', title: 'Strefa medyczna Grupa 2' },
                ]
            },
            {
                title: 'Wymagania', type: 'group', children: [
                    { path: 'requirements/req-iec-60364-7-710-grupa-2.md', title: 'IEC 60364-7-710 Grupa 2' },
                ]
            },
            {
                path: 'levels/poziom-piwnica.md', title: 'Piwnica',
                children: discoverSpaces('piwnica'),
            },
            {
                path: 'levels/poziom-parter.md', title: 'Parter',
                children: discoverSpaces('parter'),
            },
            {
                path: 'levels/poziom-01.md', title: 'Piętro I',
                children: discoverSpaces('pietro-01'),
            },
            {
                path: 'levels/poziom-02.md', title: 'Piętro II',
                children: discoverSpaces('pietro-02'),
            },
            {
                path: 'levels/poziom-03.md', title: 'Piętro III',
                children: discoverSpaces('pietro-03'),
            },
        ]
    },
];

// ─── INHERITANCE DATA EXTRACTION ─────────────────────────
// Parse level files for inheritable properties to embed in space sections

function extractLevelInheritance(markdown) {
    const data = { height: null, finishes: { floors: null, walls: null, ceilings: null } };

    // Extract typical room height
    const heightMatch = markdown.match(/Wysokość pomieszczeń w świetle:\*\*\s*(.+)/);
    if (heightMatch) data.height = heightMatch[1].trim();

    // Extract typical finishes from "Właściwości dziedziczone" section
    const lines = markdown.split('\n');
    let section = null;
    let subsection = null;

    for (const line of lines) {
        if (line.includes('Właściwości dziedziczone')) section = 'inherited';
        if (section !== 'inherited') continue;

        // Track subsection (Podłogi, Ściany, Sufity)
        if (line.match(/^####\s+Podłogi\s*$/)) subsection = 'floors';
        else if (line.match(/^####\s+Ściany\s*$/)) subsection = 'walls';
        else if (line.match(/^####\s+Sufity\s*$/)) subsection = 'ceilings';
        else if (line.match(/^###/)) { subsection = null; }

        // Extract material info
        const materialMatch = line.match(/\*\*Materiał:\*\*\s*(.+)/);
        if (materialMatch && subsection && data.finishes[subsection] === null) {
            data.finishes[subsection] = materialMatch[1].trim();
        }
    }

    return data;
}

// ─── HEADER EXTRACTION & TREE BUILDING ───────────────────

function extractHeaders(markdown, sectionPrefix) {
    const headers = [];
    const lines = markdown.split('\n');

    lines.forEach(line => {
        const match = line.match(/^(#{2,4})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2];
            const id = `${sectionPrefix}-${slugify(text)}`;
            headers.push({ level, text, id });
        }
    });

    return headers;
}

function buildHeaderTree(headers) {
    const tree = [];
    const stack = [{ level: 1, children: tree }];

    headers.forEach(header => {
        const node = { ...header, children: [] };
        while (stack.length > 1 && stack[stack.length - 1].level >= header.level) {
            stack.pop();
        }
        stack[stack.length - 1].children.push(node);
        stack.push(node);
    });

    return tree;
}

// ─── MARKDOWN TO HTML ────────────────────────────────────

function markdownToHtml(markdown, headerIds = []) {
    let html = markdown
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gm, (match, text) => {
            const h = headerIds.find(h => h.level === 4 && h.text === text && !h.used);
            if (h) { h.used = true; return `<h4 id="${h.id}">${text}</h4>`; }
            return `<h4>${text}</h4>`;
        })
        .replace(/^### (.*$)/gm, (match, text) => {
            const h = headerIds.find(h => h.level === 3 && h.text === text && !h.used);
            if (h) { h.used = true; return `<h3 id="${h.id}">${text}</h3>`; }
            return `<h3>${text}</h3>`;
        })
        .replace(/^## (.*$)/gm, (match, text) => {
            const h = headerIds.find(h => h.level === 2 && h.text === text && !h.used);
            if (h) { h.used = true; return `<h2 id="${h.id}">${text}</h2>`; }
            return `<h2>${text}</h2>`;
        })
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/```yaml([\s\S]*?)```/g, '<pre><code class="yaml">$1</code></pre>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\|(.+)\|/g, function(match) {
            const cells = match.split('|').filter(c => c.trim());
            return '<tr>' + cells.map(c => '<td>' + c.trim() + '</td>').join('') + '</tr>';
        });

    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[123456]>)/g, '$1');
    html = html.replace(/(<\/h[123456]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');

    return html;
}

// ─── RECURSIVE TREE PROCESSING ───────────────────────────

let sectionCounter = 0;
const levelInheritanceCache = {};

// Collect all content sections from tree (depth-first)
function collectContent(nodes, baseDir) {
    let content = '';

    for (const node of nodes) {
        if (node.path) {
            const filePath = path.join(baseDir, node.path);
            if (fs.existsSync(filePath)) {
                const markdown = fs.readFileSync(filePath, 'utf-8');
                const anchor = `section-${sectionCounter}`;
                node._anchor = anchor;
                sectionCounter++;

                const headers = extractHeaders(markdown, anchor);
                node._headers = headers;
                const html = markdownToHtml(markdown, headers);

                // If this is a level file, cache inheritance data
                if (node.path.startsWith('levels/')) {
                    const inheritance = extractLevelInheritance(markdown);
                    levelInheritanceCache[node.path] = inheritance;
                    node._inheritance = inheritance;
                }

                // If this is a space file, attach parent level's inheritance data
                let inheritAttrs = '';
                if (node.path.startsWith('spaces/')) {
                    const levelPath = findParentLevelPath(node, nodes);
                    if (levelPath && levelInheritanceCache[levelPath]) {
                        const inh = levelInheritanceCache[levelPath];
                        inheritAttrs = ` data-inherited-height="${escAttr(inh.height || '')}"`;
                        inheritAttrs += ` data-inherited-floor="${escAttr(inh.finishes.floors || '')}"`;
                        inheritAttrs += ` data-inherited-walls="${escAttr(inh.finishes.walls || '')}"`;
                        inheritAttrs += ` data-inherited-ceiling="${escAttr(inh.finishes.ceilings || '')}"`;
                    }
                }

                content += `<div id="${anchor}" class="doc-section"${inheritAttrs}>\n${html}\n</div>\n`;
                content += `<hr style="margin: 50px 0; border: none; border-top: 2px solid #eee;">\n`;

                // Create individual HTML file
                const individualHtml = createHtmlPage(node.title, html);
                const outputPath = path.join(baseDir, node.path.replace('.md', '.html'));
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                fs.writeFileSync(outputPath, individualHtml, 'utf-8');
                console.log(`  ✅ ${node.path.replace('.md', '.html')}`);
            }
        }

        if (node.children) {
            content += collectContent(node.children, baseDir);
        }
    }

    return content;
}

function escAttr(s) { return s.replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

function findParentLevelPath(spaceNode, allNodes) {
    // Find which level node contains this space as a child
    // Simple approach: match by folder name
    const spaceFolder = spaceNode.path.split('/')[1]; // e.g. "parter", "piwnica"
    const folderToLevel = {
        'piwnica': 'levels/poziom-piwnica.md',
        'parter': 'levels/poziom-parter.md',
        'pietro-01': 'levels/poziom-01.md',
        'pietro-02': 'levels/poziom-02.md',
        'pietro-03': 'levels/poziom-03.md',
    };
    return folderToLevel[spaceFolder] || null;
}

// ─── RECURSIVE NAVIGATION RENDERER ──────────────────────

function renderNavHtml(nodes, depth = 0) {
    let html = `<ul class="nav-tree nav-depth-${depth}">`;

    for (const node of nodes) {
        const hasChildren = node.children && node.children.length > 0;
        const hasHeaderChildren = node._headers && node._headers.length > 0;
        const isExpandable = hasChildren || hasHeaderChildren;
        const isGroup = node.type === 'group';

        const classes = [
            'nav-node',
            `nav-d${depth}`,
            isExpandable ? 'has-children collapsed' : '',
            isGroup ? 'nav-group' : '',
        ].filter(Boolean).join(' ');

        html += `<li class="${classes}">`;

        // Toggle arrow for expandable nodes
        if (isExpandable) {
            html += `<span class="toggle">&#9654;</span>`;
        } else {
            html += `<span class="toggle-spacer"></span>`;
        }

        // Node label: link if it has content, plain text if it's a group
        if (isGroup) {
            html += `<span class="nav-group-label">${node.title}</span>`;
        } else if (node._anchor) {
            html += `<a href="#${node._anchor}">${node.title}</a>`;
        } else {
            html += `<span class="nav-label">${node.title}</span>`;
        }

        // Nested children (document tree children)
        if (hasChildren) {
            html += renderNavHtml(node.children, depth + 1);
        }

        // Nested headers (within-document h2/h3/h4 tree)
        if (hasHeaderChildren && !hasChildren) {
            const headerTree = buildHeaderTree(node._headers);
            html += renderHeaderNav(headerTree, depth + 1);
        }

        html += '</li>';
    }

    html += '</ul>';
    return html;
}

function renderHeaderNav(tree, depth) {
    if (!tree || tree.length === 0) return '';

    let html = `<ul class="nav-tree nav-depth-${depth}">`;

    for (const node of tree) {
        const hasChildren = node.children && node.children.length > 0;
        const classes = `nav-node nav-d${depth} nav-header ${hasChildren ? 'has-children collapsed' : ''}`;

        html += `<li class="${classes}">`;

        if (hasChildren) {
            html += `<span class="toggle">&#9654;</span>`;
        } else {
            html += `<span class="toggle-spacer"></span>`;
        }

        html += `<a href="#${node.id}">${node.text}</a>`;

        if (hasChildren) {
            html += renderHeaderNav(node.children, depth + 1);
        }

        html += '</li>';
    }

    html += '</ul>';
    return html;
}

// ─── HTML PAGE TEMPLATE ──────────────────────────────────

function createHtmlPage(title, content, nav = '') {
    return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Kujawsko-Pomorskie Centrum Pulmonologii</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }
        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            display: flex;
        }

        /* ── SIDEBAR ────────────────────────── */
        .sidebar {
            width: 420px;
            min-width: 420px;
            flex-shrink: 0;
            background: #1e293b;
            color: #e2e8f0;
            padding: 20px 15px;
            position: sticky;
            top: 0;
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            font-size: 13px;
        }
        .sidebar-title {
            color: #60a5fa;
            font-size: 1.15em;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #334155;
        }

        /* ── NAV TREE ───────────────────────── */
        .nav-tree {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .nav-node {
            position: relative;
            margin: 1px 0;
        }

        /* Toggle arrow */
        .toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            font-size: 9px;
            color: #64748b;
            cursor: pointer;
            border-radius: 3px;
            transition: all 0.15s ease;
            vertical-align: middle;
            flex-shrink: 0;
        }
        .toggle:hover { color: #e2e8f0; background: #334155; }
        .toggle-spacer { display: inline-block; width: 20px; flex-shrink: 0; }

        /* Expanded state */
        .has-children:not(.collapsed) > .toggle {
            transform: rotate(90deg);
        }
        .has-children.collapsed > .nav-tree {
            display: none;
        }

        /* Links */
        .nav-node a {
            color: #cbd5e1;
            text-decoration: none;
            padding: 5px 8px;
            border-radius: 4px;
            display: inline-block;
            transition: all 0.15s ease;
            vertical-align: middle;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .nav-node a:hover { color: #fff; background: #334155; }

        /* Group labels (non-clickable) */
        .nav-group-label {
            color: #94a3b8;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85em;
            letter-spacing: 0.5px;
            padding: 8px 8px 4px;
            display: inline-block;
            vertical-align: middle;
        }

        /* Depth indentation */
        .nav-depth-0 > .nav-node { padding-left: 0; }
        .nav-depth-1 > .nav-node { padding-left: 16px; }
        .nav-depth-2 > .nav-node { padding-left: 32px; }
        .nav-depth-3 > .nav-node { padding-left: 48px; }
        .nav-depth-4 > .nav-node { padding-left: 64px; }

        /* Depth-0 items (Inwestycja, Budynek) */
        .nav-d0 > a {
            font-weight: 700;
            font-size: 1.05em;
            color: #f1f5f9;
            padding: 8px 10px;
            background: #334155;
            border-left: 3px solid #3b82f6;
            margin: 4px 0;
            width: calc(100% - 25px);
        }
        .nav-d0 > a:hover { background: #475569; }

        /* Depth-1 items (Strefy, Levels, etc.) */
        .nav-d1 > a {
            font-weight: 600;
            color: #e2e8f0;
        }
        .nav-d1.nav-group > .nav-group-label {
            margin-top: 10px;
        }

        /* Depth-2 items (individual spaces, zones) */
        .nav-d2 > a {
            font-size: 0.92em;
            color: #94a3b8;
        }
        .nav-d2 > a:hover { color: #e2e8f0; }

        /* Header nav items (within-document) */
        .nav-header > a {
            font-size: 0.88em;
            color: #64748b;
            font-style: italic;
        }
        .nav-header > a:hover { color: #cbd5e1; }

        /* ── CONTENT AREA ───────────────────── */
        .content {
            flex: 1;
            padding: 40px 60px;
            max-width: 1000px;
        }
        h1 {
            color: #1e293b;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 15px;
            margin-bottom: 30px;
            font-size: 2em;
        }
        h2 {
            color: #334155;
            margin-top: 35px;
            margin-bottom: 15px;
            font-size: 1.6em;
        }
        h3 {
            color: #475569;
            margin-top: 25px;
            margin-bottom: 12px;
            font-size: 1.3em;
        }
        h4 {
            color: #64748b;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul, ol {
            margin-left: 30px;
            margin-bottom: 15px;
        }
        li { margin-bottom: 8px; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background: #3b82f6;
            color: white;
            font-weight: 600;
        }
        tr:nth-child(even) { background: #f9f9f9; }
        code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        pre {
            background: #f1f5f9;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 15px 0;
            border-left: 4px solid #3b82f6;
        }
        pre code { background: none; padding: 0; }

        /* ── PRINT BUTTON ───────────────────── */
        .print-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: all 0.3s;
            z-index: 100;
        }
        .print-btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        /* ── INHERITANCE PANEL ──────────────── */
        .inh-toggle {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #3b82f6;
            color: white;
            border: none;
            padding: 15px 8px;
            border-radius: 8px 0 0 8px;
            font-size: 13px;
            cursor: pointer;
            z-index: 999;
            writing-mode: vertical-rl;
            letter-spacing: 1px;
            box-shadow: -2px 0 8px rgba(0,0,0,0.15);
        }
        .inh-toggle:hover { background: #2563eb; padding: 15px 12px; }

        .inh-panel {
            position: fixed;
            right: -420px;
            top: 0;
            width: 400px;
            height: 100vh;
            background: #fff;
            border-left: 3px solid #3b82f6;
            box-shadow: -4px 0 20px rgba(0,0,0,0.15);
            transition: right 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
        }
        .inh-panel.open { right: 0; }
        .inh-panel-header {
            background: #1e293b;
            color: white;
            padding: 18px 20px;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1;
        }
        .inh-panel-close {
            cursor: pointer;
            font-size: 1.5em;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .inh-panel-close:hover { opacity: 1; }
        .inh-panel-body { padding: 20px; }
        .inh-panel-body h4 {
            color: #1e293b;
            margin: 20px 0 10px;
            padding-bottom: 6px;
            border-bottom: 2px solid #e2e8f0;
            font-size: 1em;
        }
        .inh-panel-body h4:first-child { margin-top: 0; }
        .inh-row {
            padding: 10px 12px;
            background: #f8fafc;
            margin-bottom: 4px;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
            font-size: 0.9em;
        }
        .inh-row strong {
            color: #334155;
            display: block;
            font-size: 0.85em;
            margin-bottom: 2px;
        }
        .inh-row .val { color: #1e293b; }
        .inh-empty {
            color: #94a3b8;
            font-style: italic;
            padding: 30px 20px;
            text-align: center;
        }
        .inh-hint {
            margin-top: 15px;
            padding: 12px;
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            font-size: 0.85em;
            border-radius: 0 6px 6px 0;
            color: #1e40af;
        }

        /* ── PRINT / RESPONSIVE ─────────────── */
        @media print {
            .sidebar, .print-btn, .inh-toggle, .inh-panel { display: none; }
            .content { padding: 20px; max-width: 100%; }
        }
        @media (max-width: 900px) {
            .container { flex-direction: column; }
            .sidebar { width: 100%; min-width: 100%; height: auto; position: relative; max-height: 50vh; }
            .content { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${nav ? `<div class="sidebar"><div class="sidebar-title">Spis Treści</div>${nav}</div>` : ''}
        <div class="content">
            ${content}
        </div>
    </div>
    <button class="print-btn" onclick="window.print()">Drukuj / PDF</button>

    <button class="inh-toggle" id="inhToggle">Dziedziczenie</button>
    <div class="inh-panel" id="inhPanel">
        <div class="inh-panel-header">
            <span>Właściwości Dziedziczone</span>
            <span class="inh-panel-close" id="inhClose">&times;</span>
        </div>
        <div class="inh-panel-body" id="inhBody">
            <p class="inh-empty">Przewiń do sekcji pomieszczenia, aby zobaczyć dziedziczone właściwości z kondygnacji.</p>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // ── TREE EXPAND/COLLAPSE ──
        document.querySelectorAll('.toggle').forEach(function(icon) {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                this.parentElement.classList.toggle('collapsed');
            });
        });

        document.querySelectorAll('.nav-node a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var li = this.parentElement;
                if (li.classList.contains('has-children') && li.classList.contains('collapsed')) {
                    li.classList.remove('collapsed');
                    // Let navigation happen
                }
            });
        });

        // Start: expand depth 0, collapse everything else
        document.querySelectorAll('.has-children').forEach(function(el) {
            if (!el.classList.contains('nav-d0')) {
                el.classList.add('collapsed');
            } else {
                el.classList.remove('collapsed');
            }
        });

        // ── INHERITANCE PANEL ──
        var inhToggle = document.getElementById('inhToggle');
        var inhPanel = document.getElementById('inhPanel');
        var inhClose = document.getElementById('inhClose');
        var inhBody = document.getElementById('inhBody');
        var isOpen = false;

        inhToggle.addEventListener('click', function() {
            isOpen = !isOpen;
            inhPanel.classList.toggle('open', isOpen);
            if (isOpen) updateInheritancePanel();
        });

        inhClose.addEventListener('click', function() {
            isOpen = false;
            inhPanel.classList.remove('open');
        });

        // Update panel based on which section is in view
        var debounce = null;
        window.addEventListener('scroll', function() {
            if (!isOpen) return;
            clearTimeout(debounce);
            debounce = setTimeout(updateInheritancePanel, 150);
        });

        function updateInheritancePanel() {
            var sections = document.querySelectorAll('.doc-section[data-inherited-height]');
            var best = null;
            var bestDist = Infinity;

            sections.forEach(function(sec) {
                var rect = sec.getBoundingClientRect();
                var dist = Math.abs(rect.top);
                if (rect.top < window.innerHeight && rect.bottom > 0 && dist < bestDist) {
                    best = sec;
                    bestDist = dist;
                }
            });

            if (best) {
                var h1 = best.querySelector('h1');
                var name = h1 ? h1.textContent : 'Pomieszczenie';
                var height = best.dataset.inheritedHeight;
                var floor = best.dataset.inheritedFloor;
                var walls = best.dataset.inheritedWalls;
                var ceiling = best.dataset.inheritedCeiling;

                var html = '<h4>' + name + '</h4>';
                html += '<div class="inh-hint">Poniższe wartości są dziedziczone z dokumentu kondygnacji i obowiązują dla tego pomieszczenia, chyba że nadpisane powyżej.</div>';
                html += '<h4>Z kondygnacji</h4>';

                if (height) {
                    html += '<div class="inh-row"><strong>Wysokość w świetle</strong><span class="val">' + height + '</span></div>';
                }
                if (floor) {
                    html += '<div class="inh-row"><strong>Podłogi (typowe)</strong><span class="val">' + floor + '</span></div>';
                }
                if (walls) {
                    html += '<div class="inh-row"><strong>Ściany (typowe)</strong><span class="val">' + walls + '</span></div>';
                }
                if (ceiling) {
                    html += '<div class="inh-row"><strong>Sufity (typowe)</strong><span class="val">' + ceiling + '</span></div>';
                }

                if (!height && !floor && !walls && !ceiling) {
                    html += '<p class="inh-empty">Brak danych o dziedziczeniu z kondygnacji.</p>';
                }

                inhBody.innerHTML = html;
            } else {
                inhBody.innerHTML = '<p class="inh-empty">Przewiń do sekcji pomieszczenia, aby zobaczyć dziedziczone właściwości z kondygnacji.</p>';
            }
        }
    });
    </script>
</body>
</html>`;
}

// ─── MAIN ────────────────────────────────────────────────

console.log('Konwersja dokumentacji do HTML...\n');

const baseDir = __dirname;

// Step 1: Collect content (processes all files, caches inheritance data)
const masterContent = collectContent(docTree, baseDir);

// Step 2: Build navigation from annotated tree
const navHtml = renderNavHtml(docTree);

// Step 3: Create master HTML
const masterHtml = createHtmlPage(
    'Dokumentacja Kompletna',
    '<h1>Kujawsko-Pomorskie Centrum Pulmonologii - Blok D</h1>' +
    '<p><strong>Dokumentacja Techniczna - Semantic Building Model</strong></p>' +
    '<p>Adres: ul. Seminaryjna 1, 85-326 Bydgoszcz</p>' +
    '<p>Inwestor: Kujawsko-Pomorskie Inwestycje Medyczne w Toruniu</p>' +
    '<hr style="margin: 30px 0;">' +
    masterContent,
    navHtml
);

const masterPath = path.join(baseDir, 'dokumentacja-kompletna.html');
fs.writeFileSync(masterPath, masterHtml, 'utf-8');

console.log(`\n  ✅ dokumentacja-kompletna.html\n`);
console.log('Konwersja zakończona!\n');
console.log('Otwórz dokumentacja-kompletna.html w przeglądarce.\n');
