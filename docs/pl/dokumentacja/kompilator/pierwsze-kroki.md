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
- `js-yaml` - Parsowanie nagłówka YAML
- `ajv` / `ajv-formats` - Walidacja schematu JSON

### 3. Zweryfikuj instalację

```bash
node scripts/compiler/index.mjs version
```

Oczekiwane wyjście:
```
Semantic Building Model Compiler v1.0.0
```

## Twoja pierwsza kompilacja

Skompilujmy dołączony przykładowy projekt Green Terrace.

### Krok 1: Zbadaj dane wejściowe

Przykładowy projekt znajduje się w:
```
docs/en/examples/green-terrace/
├── project-specification.md
├── levels/
│   └── level-01.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   └── corridor.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   ├── acoustic-zone-night.md
│   └── hvac-zone-north.md
├── zone-types/
│   ├── fire-zone-zl-iv.md
│   ├── acoustic-zone-night.md
│   └── hvac-zone-residential.md
├── systems/
│   └── sys-hvac-01.md
├── system-types/
│   └── hvac-residential-mvhr.md
├── assets/
│   └── ai-hp-01.md
└── asset-types/
    └── bosch-heat-pump-7000i.md
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
- `--input` - Katalog zawierający pliki encji Markdown
- `--output` - Gdzie zapisać skompilowane wyniki
- `--country PL` - Wczytaj pakiet jurysdykcji dla Polski (WT 2021)
- `--verbose` - Pokaż szczegółowe logowanie

### Krok 3: Sprawdź wynik

Oczekiwane wyjście konsoli:
```
ℹ️  Semantic Building Model Compiler v1.0.0
ℹ️  Input: docs/en/examples/green-terrace
ℹ️  Output: build/green-terrace
ℹ️  Country: PL
ℹ️  Phase: 3

📍 Stage 1: Parse
✅ Parsed 16 entities

📍 Stage 2: Normalize, Enrich & Resolve Inheritance
✅ Normalized 3 spaces, 3 zones, 7 requirements

📍 Stage 3: Validate
✅ Validation passed - no errors

📍 Stage 3.5: Quality Summaries
✅ Quality: avg completeness 1, 21 entities analyzed

📍 Stage 4: Compile Targets
✅ Generated 5 compilation targets
✅ Generated: build/green-terrace/sbm.json
✅ Generated: build/green-terrace/quality_report.json
...

✨ Compilation complete in 0.13s
✅ Phase readiness: Project is ready to advance to Phase 4
```

### Krok 4: Zbadaj wyniki

**Kanoniczny SBM:**
```bash
node -e "const s = require('./build/green-terrace/sbm.json'); console.log('Version:', s.sbm_version, '| Entities:', Object.keys(s.entities).join(', '))"
```

**Raport jakości (podsumowanie):**
```bash
node -e "const q = require('./build/green-terrace/quality_report.json'); console.log('Phase readiness:', q.phaseReadiness.summary); console.log('Safety audit:', q.safetyAudit.totalFields, 'fields,', q.safetyAudit.verified, 'verified')"
```

**Raport zgodności (podsumowanie):**
```bash
node -e "console.log(JSON.stringify(require('./build/green-terrace/compliance_report.json').summary, null, 2))"
```

## Zrozumienie wyników kompilatora

### 1. sbm.json (Model kanoniczny)

Zwalidowany, wzbogacony model budynku ze śledzeniem proweniencji:

```json
{
  "sbm_version": "0.2",
  "compiler": { "version": "0.2.0", "mode": "production" },
  "project": {
    "id": "PRJ-GREEN-TERRACE-2026",
    "name": "Residential Building Green Terrace",
    "country": "PL",
    "phase": 3
  },
  "entities": {
    "levels": [...],
    "spaces": [...],      // Każda z blokiem _quality
    "zones": [...],
    "systems": [...],
    "zone_types": [...],  // Szablony typów
    "system_types": [...],
    "asset_types": [...]
  }
}
```

Przestrzenie zawierają odziedziczone wartości ze śledzeniem proweniencji:
```json
{
  "id": "SP-BLD-01-L01-001",
  "designHeight": 2.7,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "inherited",
    "inheritedFrom": "LVL-01",
    "inheritedField": "typicalCeilingHeight"
  },
  "_quality": {
    "totalFields": 26,
    "completeness": 1.0,
    "lowestConfidence": "specified"
  }
}
```

### 2. quality_report.json 
Audyt jakości danych:

```json
{
  "phaseReadiness": {
    "currentPhase": 3,
    "ready": true,
    "summary": "Project is ready to advance to Phase 4"
  },
  "safetyAudit": {
    "totalFields": 3,
    "verified": 3,
    "unverified": 0
  },
  "recommendations": [
    {
      "priority": "high",
      "message": "269 field(s) have values but no provenance tracking",
      "action": "Add _meta annotations with confidence level and source reference"
    }
  ]
}
```

### 3-6. Pozostałe cele

Szczegółowe informacje o `bim_mapping.json`, `compliance_report.json`, `asset_register.json` i `twin_schema.json` znajdziesz w [Przeglądzie kompilatora](/pl/dokumentacja/kompilator/).

## Przepływ bramek fazowych

Użyj opcji `--phase`, aby wymusić standardy jakości danych:

```bash
# Faza 3 (rozwój projektu) - dopuszczalna
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 3

# Faza 5 (dokumentacja wykonawcza) - rygorystyczna
# Zwróci BŁĄD jeśli jakiekolwiek pole ma pewność 'assumed'
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 5

# Faza 7 (dokumentacja powykonawcza) - najrygorystyczniejsza
# Zwróci BŁĄD jeśli pola krytyczne dla bezpieczeństwa mają pewność 'estimated'
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ --phase 7
```

## Rozwiązywanie problemów

### Błąd: "No entities found in input directory"

**Rozwiązanie:** Sprawdź, czy ścieżka wejściowa jest poprawna, pliki mają rozszerzenie `.md` i zawierają nagłówek YAML z polem `documentType`.

### Błędy walidacji schematu

**Rozwiązanie:** Sprawdź dokumentację encji pod kątem wymaganych pól. Często brakujące pola:
- Level: `buildingId`, `version`
- Space: `buildingId`, `levelId`, `version`
- Wszystkie encje: `id`, `entityType`

### Ostrzeżenie: "Field has 'specified' confidence but no source reference"

**Rozwiązanie:** Dodaj `source` i `sourceRef` do bloku `_meta` danego pola:
```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "ARCH-001"
  sourceRef: "Room schedule, page 12"
```

### Błędy bramki fazowej na Fazie 5+

**Rozwiązanie:** Zweryfikuj dane (zmień pewność z `assumed` na `specified` z referencją do źródła) lub kompiluj na niższej fazie, dopóki dane są jeszcze zbierane.

## Przepływ pracy programistycznej

```bash
# 1. Utwórz/zmodyfikuj encje
vim project/spaces/bedroom-01.md

# 2. Skompiluj i sprawdź jakość
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ \
  --country PL --verbose

# 3. Przejrzyj raport jakości
node -e "const q = require('./build/quality_report.json'); \
  console.log(q.phaseReadiness.summary); \
  q.recommendations.forEach(r => console.log(r.priority, '-', r.message))"

# 4. Napraw problemy zgłoszone w raporcie jakości

# 5. Przejdź do wyższej fazy gdy dane są gotowe
node scripts/compiler/index.mjs compile \
  --input project/ --output build/ \
  --phase 5 --country PL
```

## Następne kroki

1. **[Zrozum potok](/pl/dokumentacja/kompilator/potok)** - Dowiedz się, jak działa każdy etap
2. **[Przewodnik proweniencji danych](/pl/przewodniki/proweniencja-danych)** - Jak śledzić źródła danych za pomocą `_meta`
3. **[Twórz własne encje](/pl/dokumentacja/tworzenie/)** - Zacznij tworzyć encje semantyczne
4. **[Typy encji](/pl/dokumentacja/encje/)** - Wszystkie 11 typów encji i 4 szablony typów
