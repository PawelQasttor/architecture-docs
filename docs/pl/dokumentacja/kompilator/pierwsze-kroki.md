# Pierwsze kroki z kompilatorem

Ten przewodnik przeprowadzi Cię przez instalację i pierwsze uruchomienie kompilatora SBM.

## Wymagania wstępne

- **Node.js** 18.0 lub wyższy
- **npm** lub **yarn**
- Edytor kodu (zalecany VS Code)
- Podstawowa znajomość wiersza poleceń

## Instalacja

### 1. Sklonuj lub pobierz repozytorium

```bash
git clone https://github.com/architecture-docs/standard.git
cd standard
```

### 2. Zainstaluj zależności

```bash
npm install
```

Instaluje zależności kompilatora:
- `gray-matter` - Parsowanie nagłówka YAML
- `ajv` - Walidacja schematu JSON
- `fast-glob` - Dopasowywanie wzorców plików

### 3. Zweryfikuj instalację

```bash
node scripts/compiler/index.mjs --version
```

Oczekiwane wyjście:
```
SBM Compiler v0.1.0
```

## Twoja pierwsza kompilacja

Skompilujmy dołączony przykładowy projekt Green Terrace.

### Krok 1: Zbadaj dane wejściowe

Przykładowy projekt znajduje się w:
```
docs/en/examples/green-terrace/
├── building.md
├── levels/
│   └── level-01.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   └── living-room-01.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   └── hvac-zone-north.md
└── systems/
    └── sys-hvac-01.md
```

### Krok 2: Uruchom kompilator

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose
```

**Co oznaczają te opcje:**
- `compile` - Uruchom pełny potok kompilacji
- `--input` - Katalog zawierający pliki encji (encja -- w tym standardzie nazywana kartą) Markdown
- `--output` - Gdzie zapisać skompilowane wyniki
- `--country PL` - Wczytaj pakiet jurysdykcji dla Polski (WT 2021)
- `--verbose` - Pokaż szczegółowe logowanie

### Krok 3: Sprawdź wynik

Oczekiwane wyjście konsoli:
```
🚀 SBM Compiler v0.1.0

📂 Input:  docs/en/examples/green-terrace
📂 Output: build/green-terrace
🌍 Country: PL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 1: PARSE
🔍 Scanning for entity files...
✓ Found 3 spaces, 2 zones, 1 system, 1 building, 1 level

STAGE 2: NORMALIZE & ENRICH
🔍 Loading jurisdiction pack...
✓ Loaded 4 global requirements
✓ Loaded 3 PL-specific requirements
✓ Auto-computed reverse relationships

STAGE 3: VALIDATE
✓ JSON Schema validation passed
✓ Referential integrity checks passed
✓ Business rules validation passed

STAGE 4: COMPILE TARGETS
✓ Generated BIM mapping (12.5 KB)
✓ Generated compliance report (45.3 KB)
✓ Generated asset register (8.2 KB)
✓ Generated digital twin schema (15.7 KB)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Compilation complete in 0.12s

📦 Outputs:
   build/green-terrace/sbm.json
   build/green-terrace/bim_mapping.json
   build/green-terrace/compliance_report.json
   build/green-terrace/asset_register.json
   build/green-terrace/twin_schema.json
```

### Krok 4: Zbadaj wyniki

**Kanoniczny SBM:**
```bash
cat build/green-terrace/sbm.json
```

**Raport zgodności (podsumowanie):**
```bash
node -e "console.log(JSON.stringify(require('./build/green-terrace/compliance_report.json').summary, null, 2))"
```

Oczekiwane wyjście:
```json
{
  "totalRequirements": 7,
  "globalRequirements": 4,
  "polandSpecificRequirements": 3,
  "verified": 5,
  "pendingVerification": 2,
  "complianceRate": 71.4
}
```

## Typowe scenariusze pracy

### Walidacja bez kompilacji

Sprawdź błędy bez generowania wyników:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --country PL \
  --validate-only
```

### Generowanie tylko określonych celów

Wygeneruj tylko mapowanie BIM i raport zgodności:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --targets bim,compliance
```

### Tryb nasłuchiwania (programowanie)

Automatyczna rekompilacja przy zmianach plików:

```bash
# Użycie nodemon (najpierw zainstaluj: npm install -g nodemon)
nodemon --watch docs/en/examples/green-terrace \
  --exec "node scripts/compiler/index.mjs compile --input docs/en/examples/green-terrace --output build/green-terrace --country PL"
```

## Zrozumienie wyników kompilatora

### 1. sbm.json (Model kanoniczny)

Zwalidowany, wzbogacony model budynku:

```json
{
  "version": "0.1",
  "metadata": {
    "compiledAt": "2026-02-20T14:32:15Z",
    "compiler": "SBM Compiler v0.1.0",
    "projectId": "PRJ-GREEN-TERRACE-2026",
    "country": "PL"
  },
  "entities": {
    "buildings": [ {...} ],
    "levels": [ {...} ],
    "spaces": [ {...} ],
    "zones": [ {...} ],
    "systems": [ {...} ],
    "assetInstances": [ {...} ],
    "requirements": [ {...} ]
  }
}
```

**Użyj tego do:**
- Zapytań AI/LLM o budynek
- Własnych skryptów analitycznych
- Integracji z innymi narzędziami

### 2. bim_mapping.json

Mapowania właściwości Revit i IFC:

```json
{
  "revitSharedParameters": {
    "file": "SBM_SharedParameters.txt",
    "groups": [
      {
        "name": "SBM_Identification",
        "parameters": [
          { "name": "SBM_Space_ID", "dataType": "Text" },
          { "name": "SBM_Zone_ID", "dataType": "Text" }
        ]
      }
    ]
  },
  "customPropertySets": [
    {
      "name": "Pset_SBM_Space",
      "applicableTo": "IfcSpace",
      "properties": [...]
    }
  ]
}
```

**Użyj tego do:**
- Importu parametrów do Revit
- Konfiguracji eksportów IFC
- Skryptów Dynamo/Grasshopper

### 3. compliance_report.json

Śledzenie zgodności regulacyjnej:

```json
{
  "polandSpecificCompliance": {
    "regulation": "WT_2021",
    "sections": [
      {
        "section": "§ 132",
        "description": "Wysokość pomieszczeń",
        "requirements": [...],
        "status": "compliant"
      }
    ]
  },
  "spaceComplianceDetails": [...]
}
```

**Użyj tego do:**
- Wniosków o pozwolenie na budowę
- Paneli zgodności
- Audytów regulacyjnych

### 4. asset_register.json

Dane zarządzania obiektami:

```json
{
  "assetInventory": [...],
  "maintenanceCalendar": [
    {
      "month": "2026-03",
      "tasks": [
        {
          "assetId": "AI-AHU-01",
          "taskName": "Replace air filters",
          "scheduledDate": "2026-03-15"
        }
      ]
    }
  ],
  "sparePartsInventory": [...]
}
```

**Użyj tego do:**
- Importu do CMMS (Maximo, SAP PM)
- Planowania konserwacji
- Analizy kosztów cyklu życia

### 5. twin_schema.json

Konfiguracja cyfrowego bliźniaka:

```json
{
  "spaceSensorBindings": [
    {
      "entityId": "SP-BLD-01-L01-001",
      "sensors": [
        {
          "sensorType": "temperature",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP",
          "thresholds": { "min": 18, "max": 26 }
        }
      ]
    }
  ],
  "runtimeEvaluationRules": [...]
}
```

**Użyj tego do:**
- Konfiguracji BMS
- Wdrożenia czujników IoT
- Monitorowania zgodności w czasie rzeczywistym

## Rozwiązywanie problemów

### Błąd: "No entities found in input directory"

**Problem:** Kompilator nie może znaleźć plików Markdown

**Rozwiązanie:**
- Sprawdź, czy ścieżka wejściowa jest poprawna
- Upewnij się, że pliki mają rozszerzenie `.md`
- Sprawdź, czy pliki zawierają nagłówek YAML z polem `entityType`

### Błąd: "Missing required field: spaceType"

**Problem:** Encja nie zawiera wymaganych pól

**Rozwiązanie:**
- Sprawdź dokumentację encji pod kątem wymaganych pól
- Dodaj brakujące pola do nagłówka YAML
- Przykład:
  ```yaml
  ---
  entityType: "space"
  spaceType: "bedroom"  # Dodaj to
  ---
  ```

### Błąd: "Invalid reference: ZONE-FIRE-001 (does not exist)"

**Problem:** Encja odwołuje się do nieistniejącego ID

**Rozwiązanie:**
- Sprawdź, czy referencjonowana encja istnieje
- Zweryfikuj, czy pisownia ID dokładnie się zgadza
- Encja musi znajdować się w katalogu wejściowym

### Ostrzeżenie: "Requirement REQ-DAYLIGHT-001 not found (may be in jurisdiction pack)"

**Problem:** Przestrzeń odwołuje się do wymagania, które nie jest wczytane

**Rozwiązanie:**
- Wymaganie może znajdować się w pakiecie jurysdykcji dla innego kraju
- Dodaj własne wymaganie do projektu
- Lub usuń referencję, jeśli nie jest potrzebna

### Problemy z wydajnością

**Problem:** Kompilacja trwa zbyt długo

**Rozwiązanie:**
- Użyj `--targets`, aby generować tylko potrzebne wyniki
- Podziel duże projekty na podprojekty
- Użyj kompilacji przyrostowej (przyszła funkcja)

## Następne kroki

Teraz, gdy pomyślnie skompilowałeś swój pierwszy projekt:

1. **[Zrozum potok](/pl/dokumentacja/kompilator/potok)** - Dowiedz się, jak działa każdy etap
2. **[Twórz własne encje](/pl/dokumentacja/tworzenie/)** - Zacznij tworzyć encje semantyczne
3. **Poznaj cele kompilacji** - Głębokie zanurzenie w każdy format wyjściowy
4. **[Dodaj własne wymagania](/pl/dokumentacja/tworzenie/tworzenie-encji)** - Twórz reguły specyficzne dla projektu

## Przepływ pracy programistycznej

Zalecany przepływ pracy z kompilatorem:

```bash
# 1. Utwórz/zmodyfikuj encje
vim docs/en/examples/my-project/spaces/bedroom-01.md

# 2. Zwaliduj zmiany
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only

# 3. Jeśli poprawne, wygeneruj pełne wyniki
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose

# 4. Przejrzyj wyniki
cat build/my-project/compliance_report.json | jq '.summary'
```

## Uzyskiwanie pomocy

- **Dokumentacja:** [Przegląd kompilatora](/pl/dokumentacja/kompilator/)
- **Przykłady:** Zobacz `docs/en/examples/green-terrace/`
- **Problemy:** Zgłaszaj błędy w GitHub Issues
- **Społeczność:** Dołącz do dyskusji na GitHub Discussions
