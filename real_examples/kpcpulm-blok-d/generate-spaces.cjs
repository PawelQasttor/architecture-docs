/**
 * generate-spaces.cjs
 *
 * Parses the PULM architectural specification and generates SBM Space markdown
 * files for all rooms in KPCPULM Blok D.
 *
 * Source: ../PULM -- arch PW do druku 04.05.11.txt
 * Output: spaces/{floor-folder}/{number-slug}.md
 */

const fs = require('fs');
const path = require('path');

// --- Configuration ---

const SOURCE_FILE = path.join(__dirname, '..', 'PULM -- arch PW do druku 04.05.11.txt');
const OUTPUT_DIR = path.join(__dirname, 'spaces');

// Room numbers to skip (already have detailed hand-written versions)
// We match by room number rather than slug because source names differ from existing filenames
const SKIP_ROOM_NUMBERS = new Set([
  '0.1',   // 0-01-klatka-schodowa.md
  '0.11',  // 0-11-sala-sekcyjna.md
  '1.24',  // 1-24-tomograf-komputerowy.md
  '2.46',  // 2-46-sala-operacyjna-1.md
  '3.25',  // 3-25-sala-chorych-2lozka.md
]);

// Floor prefix -> folder name
const FLOOR_FOLDERS = {
  '0': 'piwnica',
  '1': 'parter',
  '2': 'pietro-01',
  '3': 'pietro-02',
  '4': 'pietro-03',
};

// Floor prefix -> level ID
const LEVEL_IDS = {
  '0': 'LVL-KPCPULM-D-PIWNICA',
  '1': 'LVL-KPCPULM-D-PARTER',
  '2': 'LVL-KPCPULM-D-PIETRO-01',
  '3': 'LVL-KPCPULM-D-PIETRO-02',
  '4': 'LVL-KPCPULM-D-PIETRO-03',
};

// Floor prefix -> floor display name
const FLOOR_NAMES = {
  '0': 'Piwnica',
  '1': 'Parter',
  '2': 'I Pietro',
  '3': 'II Pietro',
  '4': 'III Pietro',
};

// --- Helper functions ---

/**
 * Slugify a Polish room name for use in filenames.
 * Converts to lowercase, replaces spaces/special chars with dashes,
 * removes non-alphanumeric chars except dashes.
 */
function slugify(text) {
  // Polish character replacements
  const polishMap = {
    '\u0105': 'a', '\u0107': 'c', '\u0119': 'e', '\u0142': 'l', '\u0144': 'n',
    '\u00f3': 'o', '\u015b': 's', '\u017a': 'z', '\u017c': 'z',
    '\u0104': 'A', '\u0106': 'C', '\u0118': 'E', '\u0141': 'L', '\u0143': 'N',
    '\u00d3': 'O', '\u015a': 'S', '\u0179': 'Z', '\u017b': 'Z',
  };

  let result = text.toLowerCase();

  // Replace Polish characters
  for (const [from, to] of Object.entries(polishMap)) {
    result = result.replace(new RegExp(from, 'g'), to);
  }

  // Replace common garbled encoding patterns with reasonable guesses
  // The source file has encoding issues - many Polish chars appear as single replacement chars
  result = result
    .replace(/[^\x20-\x7E]/g, '') // Remove any remaining non-ASCII
    .replace(/\s*\/\s*/g, '-')    // Replace / with dash
    .replace(/\s*\+\s*/g, '-')    // Replace + with dash
    .replace(/[().,;:!?'"]/g, '') // Remove punctuation
    .replace(/\s+/g, '-')         // Replace spaces with dashes
    .replace(/-+/g, '-')          // Collapse multiple dashes
    .replace(/^-|-$/g, '');       // Trim leading/trailing dashes

  return result;
}

/**
 * Normalize a room number: pad single digits after the dot with leading zero.
 * E.g., "0.1" -> "0-01", "1.3a" -> "1-03a", "036b" -> "036b"
 */
function roomNumberToSlug(num) {
  // Handle special cases like "036a", "036b" (no dot)
  if (!num.includes('.')) {
    return num.replace(/\./g, '-');
  }

  const parts = num.split('.');
  const floor = parts[0];
  const room = parts[1];

  // Extract numeric part and suffix letter
  const match = room.match(/^(\d+)([a-zA-Z]*)$/);
  if (match) {
    const roomNum = match[1].padStart(2, '0');
    const suffix = match[2].toLowerCase();
    return `${floor}-${roomNum}${suffix}`;
  }

  return `${floor}-${room}`;
}

/**
 * Get the floor prefix from a room number.
 * "0.1" -> "0", "1.3a" -> "1", "036b" -> "0"
 */
function getFloorPrefix(roomNumber) {
  if (roomNumber.includes('.')) {
    return roomNumber.split('.')[0];
  }
  // Special cases like "036a" - starts with 0
  if (roomNumber.startsWith('0')) return '0';
  if (roomNumber.startsWith('1')) return '1';
  if (roomNumber.startsWith('2')) return '2';
  if (roomNumber.startsWith('3')) return '3';
  if (roomNumber.startsWith('4')) return '4';
  return '0';
}

/**
 * Build a filename slug from room number and name.
 */
function buildFileSlug(roomNumber, name) {
  const numSlug = roomNumberToSlug(roomNumber);
  const nameSlug = slugify(name);
  if (!nameSlug) return numSlug;
  return `${numSlug}-${nameSlug}`;
}

// --- Parsing ---

/**
 * Parse room lines from the room list section.
 * Returns array of { roomNumber, name, area, department }
 */
function parseRoomList(lines) {
  const rooms = [];
  let currentDepartment = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect department/section headers
    // These are lines that have indented text followed by area, but no * prefix
    // Examples:
    //   "Pomieszczenia Prosektorium    143,49 m2, w tym:"
    //   "Dział diagnostyki obrazowej   359,55 m2, w tym:"
    //   "Centralna sterylizacja i dezynfekcja  492,09 m2, w tym:"
    //   "Oddział Anestezjologii i Intensywnej Terapii - 394,76 m2, w tym:"
    //   "Blok operacyjny    525,40 m2, w tym:"
    //   "Apteka    276,01 m2:"
    const deptMatch = line.match(/^\s{2,}(?!\*)(.+?)\s+[\d,.]+\s*m2/i);
    if (deptMatch && !line.trim().startsWith('*')) {
      const deptName = deptMatch[1]
        .replace(/[^\x20-\x7Ea-zA-Z\u0080-\uFFFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (deptName.length > 3) {
        currentDepartment = deptName;
      }
      continue;
    }

    // Floor section headers reset department
    if (line.match(/4\.1\.2\.\d+|^\s*4\.1\.2\.\d+/)) {
      currentDepartment = '';
      continue;
    }

    // Separator lines
    if (line.match(/^[\s*]*-{10,}/)) {
      // Don't reset department - separator usually comes before new department
      continue;
    }

    // Parse room lines
    // Pattern: "* {number} {separator} {name} {area} m2"
    // Separator can be: – (en-dash), - (hyphen), or garbled chars
    // Room number can be: 0.1, 1.3a, 036b, etc.
    // Area uses comma as decimal separator

    // Try multiple patterns for room lines
    let roomMatch = null;

    // Pattern 1: Standard "* N.N – Name    area m2" (with possible garbled dash)
    roomMatch = line.match(/^\s*\*\s*([\d.]+[a-zA-Z]?)\s*[-\u2013\u2014\u00ab\u00bb\ufffd\ufffe].?\s*(.+?)\s+([\d,.]+)\s*m2/);

    // Pattern 2: Comma instead of dot in number "* 1,13 – Name"
    if (!roomMatch) {
      roomMatch = line.match(/^\s*\*\s*(\d+),(\d+)\s*[-\u2013\u2014\u00ab\u00bb\ufffd\ufffe].?\s*(.+?)\s+([\d,.]+)\s*m2/);
      if (roomMatch) {
        // Fix: convert "1,13" to "1.13"
        const fixedNum = `${roomMatch[1]}.${roomMatch[2]}`;
        roomMatch = [roomMatch[0], fixedNum, roomMatch[3], roomMatch[4]];
      }
    }

    // Pattern 3: No standard dash - just "* 036a- Name  area m2"
    if (!roomMatch) {
      roomMatch = line.match(/^\s*\*\s*(0\d+[a-zA-Z])\s*-\s*(.+?)\s+([\d,.]+)\s*m2/);
    }

    // Pattern 4: Catch garbled characters between number and name
    if (!roomMatch) {
      roomMatch = line.match(/^\s*\*\s*([\d.]+[a-zA-Z]?)\s*[^a-zA-Z0-9\s]{1,3}\s*(.+?)\s{2,}([\d,.]+)\s*m2/);
    }

    // Pattern 5: Very loose - any line starting with * and a number
    if (!roomMatch) {
      roomMatch = line.match(/^\s*\*\s*([\d.]+[a-zA-Z]?)\s*[-\s].{0,3}\s*([A-Z\u0080-\uFFFF].+?)\s{2,}([\d,.]+)\s*m2/i);
    }

    if (roomMatch) {
      const roomNumber = roomMatch[1].replace(',', '.');
      let name = roomMatch[2]
        .replace(/\t+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const area = roomMatch[3].replace(/\s/g, '');

      // Clean up the name - remove leading/trailing non-alpha chars
      name = name.replace(/^[\s\-\u2013\u2014]+/, '').replace(/[\s\-\u2013\u2014]+$/, '').trim();

      // Skip if name is empty or just garbled
      if (name.length < 2) continue;

      rooms.push({
        roomNumber,
        name,
        area,
        department: currentDepartment,
      });
    }
  }

  return rooms;
}

/**
 * Parse the finishing table section.
 * Returns a map: roomNumber -> { floor, walls, ceiling }
 */
function parseFinishingTable(text) {
  const finishes = {};

  // The finishing table is a continuous block of text where room numbers
  // appear before their finish descriptions. We need to extract room-number
  // groups and their associated finishes.

  // Split by floor sections
  const sections = [
    { marker: 'PIWNICA', floor: '0' },
    { marker: 'Parter', floor: '1' },
    { marker: 'I Pi', floor: '2' },
    { marker: 'II Pi', floor: '3' },
    { marker: 'III Pi', floor: '4' },
  ];

  // Extract finish entries using a simplified approach:
  // Look for room number patterns followed by name and finish text

  // Room numbers in the finish table appear as: "0.11", "1.24", "2.46", etc.
  // Often grouped: "0.27, 0.28, 0.29, 0.30,"

  // We'll use a regex to find groups of room numbers followed by finish descriptions
  const roomGroupPattern = /(?:^|\s)([\d.]+(?:[a-zA-Z])?(?:\s*,\s*[\d.]+(?:[a-zA-Z])?)*)\s*([A-Z\u0080-\uFFFF][^0-9]*?)(?=\d+\.\d+|$)/g;

  // Simpler approach: extract key finish info per room from the long text blocks
  // For each floor section, parse out room-number-to-finish mappings

  const lines = text.split('\n');
  let currentFloor = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect floor headers
    if (line.includes('PIWNICA')) currentFloor = '0';
    else if (line.match(/Parter\s*-/i)) currentFloor = '1';
    else if (line.match(/I\s+Pi.*tro.*poziom\s*2/i) || line.match(/I Pi.*poziom 2/i)) currentFloor = '2';
    else if (line.match(/II\s+Pi.*tro/i) || line.match(/II Pi/i)) currentFloor = '3';
    else if (line.match(/III\s+Pi.*tro/i) || line.match(/III Pi/i)) currentFloor = '4';

    // Skip header lines
    if (line.match(/^Nr\s|wszystkie z|malowane w|malowane w kolorze/i)) continue;

    // Find room numbers in the line and extract finishes
    // Room numbers: sequences like "0.11" or "1.3, 1.3a, 1.58"
    const roomNumsInLine = [];
    const numPattern = /(\d+\.\d+[a-zA-Z]?)/g;
    let numMatch;
    while ((numMatch = numPattern.exec(line)) !== null) {
      roomNumsInLine.push(numMatch[1]);
    }
    // Also catch special patterns like "036a"
    const specialPattern = /\b(0\d{2}[a-zA-Z])\b/g;
    while ((numMatch = specialPattern.exec(line)) !== null) {
      roomNumsInLine.push(numMatch[1]);
    }

    if (roomNumsInLine.length === 0) continue;

    // Extract finish keywords from the line
    const finishInfo = extractFinishInfo(line);

    if (finishInfo.floor || finishInfo.walls || finishInfo.ceiling) {
      for (const rn of roomNumsInLine) {
        if (!finishes[rn]) {
          finishes[rn] = finishInfo;
        }
      }
    }
  }

  return finishes;
}

/**
 * Extract floor, wall, ceiling finish info from a text block.
 */
function extractFinishInfo(text) {
  const info = { floor: '', walls: '', ceiling: '' };

  // Floor keywords
  if (text.match(/gress\s+V\s+klasa/i)) {
    info.floor = 'Gres V klasa scieralnosci';
  } else if (text.match(/gress\s+IV\s+klasa/i)) {
    info.floor = 'Gres IV klasa scieralnosci';
  } else if (text.match(/PCV\s+.*?termozgrzewalna.*?pr.*?doprzewodz/i) || text.match(/PCV\s+higieniczna.*?pr.*?doprzewodz/i)) {
    info.floor = 'Wykladzina PCV higieniczna, antyelektrostatyczna (np. Polyflor)';
  } else if (text.match(/PCV\s+termozgrzewalna.*?homogeniczna.*?klasa.*?T/i)) {
    info.floor = 'Wykladzina PCV termozgrzewalna, homogeniczna, klasa T';
  } else if (text.match(/PCV\s+termozgrzewalna.*?homogeniczna.*?klasa.*?P/i)) {
    info.floor = 'Wykladzina PCV termozgrzewalna, homogeniczna, klasa P';
  } else if (text.match(/PCV\s+termozgrzewalna.*?homogeniczna.*?klasa.*?M/i)) {
    info.floor = 'Wykladzina PCV termozgrzewalna, homogeniczna, klasa M';
  } else if (text.match(/PCV\s+termozgrzewalna.*?homogeniczna/i)) {
    info.floor = 'Wykladzina PCV termozgrzewalna, homogeniczna';
  } else if (text.match(/PCV\s+higieniczna/i)) {
    info.floor = 'Wykladzina PCV higieniczna (np. Polyflor)';
  } else if (text.match(/ytki\s+ceramiczne\s+pod.*?ogowe/i) || text.match(/Plytki\s+ceramiczne\s+pod/i)) {
    info.floor = 'Plytki ceramiczne podlogowe';
  } else if (text.match(/posadzka\s+przemys/i)) {
    info.floor = 'Posadzka przemyslowa';
  } else if (text.match(/posadzka\s+podniesiona/i)) {
    info.floor = 'Posadzka podniesiona techniczna h=30cm';
  } else if (text.match(/kamionkowe\s+kwasoodporne/i)) {
    info.floor = 'Plytki kamionkowe kwasoodporne';
  }

  // Wall keywords
  if (text.match(/ytki\s+ceramiczne.*?ca.*?wysoko/i) || text.match(/ceramiczne\s+na\s+ca/i)) {
    info.walls = 'Plytki ceramiczne na cala wysokosc pomieszczenia';
  } else if (text.match(/PCV\s+z\s+atestem\s+dla\s+sal\s+operacyjnych/i) || text.match(/system.*?cianek\s+dedykowanych/i)) {
    info.walls = 'System scianek dla pomieszczen czystych (stal nierdzewna/HPL/PCV) h=3.0m';
  } else if (text.match(/poliuretanow.*?odka.*?aj/i) || text.match(/StoPuran\s+Color/i)) {
    info.walls = 'Farba poliuretanowa odkazajaca (np. StoPuran Color)';
  } else if (text.match(/lamperia\s+olejna/i)) {
    info.walls = 'Lamperia olejna h=2.05m, powyzej farba akrylowa';
  } else if (text.match(/lateksow.*?tapecie.*?kna\s+szklanego/i) || text.match(/farb.*?lateksow.*?tapecie/i)) {
    info.walls = 'Farba lateksowa na tapecie z wlokna szklanego';
  } else if (text.match(/malowanie\s+farb.*?lateksow/i) || text.match(/malowanie farb.*?lateksow/i)) {
    info.walls = 'Farba lateksowa';
  } else if (text.match(/malowanie\s+farb.*?akrylow/i) || text.match(/malowanie farb.*?akrylow/i)) {
    info.walls = 'Farba akrylowa';
  }

  // Ceiling keywords
  if (text.match(/Armstrong\s+Parafon\s+Hygien/i) || text.match(/sufit.*?higieniczny.*?szczelny/i)) {
    info.ceiling = 'Sufit podwieszony higieniczny szczelny (np. Armstrong Parafon Hygien)';
  } else if (text.match(/sufit\s+podwieszony.*?gipsowo.*?kartonowych.*?wilgo/i) || text.match(/bezspoinowy.*?gipsowo/i)) {
    info.ceiling = 'Sufit podwieszony bezspoinowy z plyt GK odpornych na wilgoc';
  } else if (text.match(/sufit\s+podwieszony.*?welny\s+mineralnej/i) || text.match(/prasowanych\s+we.*?ny\s+mineralnej/i)) {
    info.ceiling = 'Sufit podwieszony z plyt prasowanych welny mineralnej';
  } else if (text.match(/sufit\s+podwieszony.*?szczelny/i)) {
    info.ceiling = 'Sufit podwieszony szczelny';
  } else if (text.match(/malowany\s+farb.*?lateksow/i) || text.match(/malowany farb.*?lateksow/i)) {
    info.ceiling = 'Malowany farba lateksowa';
  } else if (text.match(/malowany\s+farb.*?akrylow/i) || text.match(/malowany farb.*?akrylow/i)) {
    info.ceiling = 'Malowany farba akrylowa';
  } else if (text.match(/malowany farb.*?silikonow/i)) {
    info.ceiling = 'Malowany farba silikonowa';
  }

  return info;
}

/**
 * Generate the markdown content for a room.
 */
function generateMarkdown(room, finishInfo) {
  const numSlug = roomNumberToSlug(room.roomNumber);
  const id = `SPC-KPCPULM-D-${numSlug.toUpperCase()}`;
  const floorPrefix = getFloorPrefix(room.roomNumber);
  const levelId = LEVEL_IDS[floorPrefix] || 'LVL-KPCPULM-D-UNKNOWN';

  let md = `# Przestrzen: ${room.roomNumber} - ${room.name}

## Informacje podstawowe

**Typ encji:** Space
**ID:** \`${id}\`
**Numer pomieszczenia:** ${room.roomNumber}
**Nazwa:** ${room.name}
**Poziom:** \`${levelId}\`
**Budynek:** \`BLD-KPCPULM-BLOK-D\`
`;

  if (room.department) {
    md += `**Dzial:** ${room.department}\n`;
  }

  md += `
## Wymiary

- **Powierzchnia uzytkowa:** ${room.area} m\u00B2
`;

  // Finishing section
  md += `\n## Wykonczenie\n\n`;

  if (finishInfo && (finishInfo.floor || finishInfo.walls || finishInfo.ceiling)) {
    if (finishInfo.floor) {
      md += `### Podlogi\n- **Material:** ${finishInfo.floor}\n\n`;
    }
    if (finishInfo.walls) {
      md += `### Sciany\n- **Wykonczenie:** ${finishInfo.walls}\n\n`;
    }
    if (finishInfo.ceiling) {
      md += `### Sufit\n- **Wykonczenie:** ${finishInfo.ceiling}\n\n`;
    }
  } else {
    md += `> Dane wykonczeniowe do uzupelnienia.\n\n`;
  }

  md += `## Strefy

- **Strefa pozarowa:** \`ZONE-FIRE-ZL-IV\`

## Stan cyklu zycia

- **Status:** planned (projektowany)

## Metadane

- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.1.4
`;

  return md;
}

// --- Main execution ---

function main() {
  console.log('=== KPCPULM Blok D - Space File Generator ===\n');

  // Read source file
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`ERROR: Source file not found: ${SOURCE_FILE}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(SOURCE_FILE, 'utf-8');
  const allLines = rawContent.split('\n');

  console.log(`Source file: ${SOURCE_FILE}`);
  console.log(`Total lines: ${allLines.length}\n`);

  // --- Step 1: Parse room list (lines ~155-575) ---
  console.log('--- Step 1: Parsing room list ---');
  const roomListLines = allLines.slice(155, 580);
  const rooms = parseRoomList(roomListLines);
  console.log(`Rooms parsed: ${rooms.length}\n`);

  // --- Step 2: Parse finishing table (lines ~800-905) ---
  console.log('--- Step 2: Parsing finishing table ---');
  const finishingText = allLines.slice(798, 910).join('\n');
  const finishes = parseFinishingTable(finishingText);
  console.log(`Finish entries: ${Object.keys(finishes).length}\n`);

  // --- Step 3: Generate markdown files ---
  console.log('--- Step 3: Generating space files ---');

  // Ensure output directories exist
  for (const folder of Object.values(FLOOR_FOLDERS)) {
    const dir = path.join(OUTPUT_DIR, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const stats = { total: 0, skipped: 0, created: 0, byFloor: {} };

  for (const room of rooms) {
    const floorPrefix = getFloorPrefix(room.roomNumber);
    const folder = FLOOR_FOLDERS[floorPrefix];
    if (!folder) {
      console.warn(`  WARN: Unknown floor for room ${room.roomNumber}, skipping`);
      stats.skipped++;
      continue;
    }

    // Check if should skip (detailed hand-written version exists)
    if (SKIP_ROOM_NUMBERS.has(room.roomNumber)) {
      console.log(`  SKIP: room ${room.roomNumber} - ${room.name} (detailed version exists)`);
      stats.skipped++;
      continue;
    }

    const fileSlug = buildFileSlug(room.roomNumber, room.name);

    // Look up finish info
    const finishInfo = finishes[room.roomNumber] || null;

    // Generate markdown
    const markdown = generateMarkdown(room, finishInfo);

    // Write file
    const filePath = path.join(OUTPUT_DIR, folder, `${fileSlug}.md`);
    fs.writeFileSync(filePath, markdown, 'utf-8');

    stats.total++;
    stats.created++;
    if (!stats.byFloor[folder]) stats.byFloor[folder] = 0;
    stats.byFloor[folder]++;
  }

  // --- Summary ---
  console.log('\n=== SUMMARY ===');
  console.log(`Total rooms parsed: ${rooms.length}`);
  console.log(`Files created: ${stats.created}`);
  console.log(`Files skipped: ${stats.skipped}`);
  console.log('');
  console.log('Per floor:');
  for (const [folder, count] of Object.entries(stats.byFloor).sort()) {
    console.log(`  ${folder}: ${count} files`);
  }
  console.log('');

  // Print any rooms that didn't get a finish entry
  let noFinish = 0;
  for (const room of rooms) {
    if (!finishes[room.roomNumber]) noFinish++;
  }
  console.log(`Rooms without finish data: ${noFinish}/${rooms.length}`);
}

main();
