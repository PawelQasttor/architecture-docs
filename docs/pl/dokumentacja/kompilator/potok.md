# Potok kompilacji

Kompilator SBM przetwarza encje (encja -- w tym standardzie nazywana kartą) budynku przez 4-etapowy potok. Ten dokument szczegółowo opisuje każdy etap.

## Przegląd potoku

```
Pliki Markdown → Parsowanie → Normalizacja → Walidacja → Kompilacja → 5 wyników
   (Wejście)        ↓             ↓             ↓           ↓        (Cele)
                  Etap 1        Etap 2        Etap 3      Etap 4
```

## Etap 1: Parsowanie

**Cel:** Wczytanie i wyodrębnienie danych encji z plików Markdown

**Wejście:**
- Katalog zawierający pliki `.md` z nagłówkiem YAML
- Harmonogramy CSV (opcjonalne)

**Proces:**
1. Rekurencyjne skanowanie katalogu wejściowego w poszukiwaniu plików `.md`
2. Odczyt każdego pliku i wyodrębnienie nagłówka YAML
3. Parsowanie nagłówka za pomocą `gray-matter`
4. Grupowanie encji według `entityType`
5. Śledzenie ścieżek plików na potrzeby raportowania błędów

**Wyjście:**
```javascript
{
  spaces: [...],
  zones: [...],
  systems: [...],
  assetInstances: [...],
  requirements: [...],
  buildings: [...],
  levels: [...]
}
```

**Implementacja:** `scripts/compiler/stages/parse.mjs`

### Przykładowy przebieg parsowania

**Plik wejściowy:** `bedroom-01.md`
```markdown
---
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
designArea: 14.5
---

# Bedroom 01
Content here...
```

**Sparsowane wyjście:**
```javascript
{
  entityType: "space",
  id: "SP-BLD-01-L01-001",
  spaceName: "Bedroom 01",
  spaceType: "sleeping_space",
  designArea: 14.5,
  _sourcePath: "spaces/bedroom-01.md"  // Dodane przez parser
}
```

### Logowanie etapu parsowania

```
🔍 Scanning for entity files...
   Found: spaces/bedroom-01.md
   Found: spaces/bedroom-02.md
   Found: zones/fire-zone-zl-iv.md
✓ Parsed 3 spaces, 2 zones, 1 building, 1 level
```

---

## Etap 2: Normalizacja i wzbogacanie

**Cel:** Standaryzacja danych i dodanie obliczonych relacji

**Wejście:** Surowa kolekcja encji z Etapu 1

**Proces:**
1. **Wczytanie pakietu jurysdykcji** na podstawie `project.country`
   - Zawsze wczytuj `scripts/requirements/global/`
   - Wczytaj `scripts/requirements/{kraj}/` jeśli kraj jest określony
2. **Normalizacja jednostek** (konwersja na standardowe jednostki)
3. **Generowanie brakujących ID** (deterministyczna wartość zastępcza)
4. **Normalizacja enumów** (małe litery, podkreślenie)
5. **Obliczanie odwrotnych relacji**:
   - `space.zoneIds` → `zone.spaceIds`
   - `asset.systemId` → `system.assetInstanceIds`
   - `space.levelId` → `level.spaceIds`
6. **Scalanie wymagań** z pakietu jurysdykcji + Markdown

**Wyjście:**
```javascript
{
  spaces: [...],        // Znormalizowane
  zones: [...],         // Ze obliczonymi spaceIds
  systems: [...],       // Ze obliczonymi assetInstanceIds
  assetInstances: [...],
  requirements: [...],  // Globalne + krajowe + projektowe
  buildings: [...],
  levels: [...]         // Ze obliczonymi spaceIds
}
```

**Implementacja:** `scripts/compiler/stages/normalize.mjs`

### Wczytywanie pakietu jurysdykcji

```javascript
// Budynek definiuje kraj
{
  "country": "PL"
}

// Etap 2 automatycznie wczytuje:
// 1. scripts/requirements/global/ (zawsze)
//    - REQ-DAYLIGHT-SLEEPING-001
//    - REQ-ACOUSTIC-SLEEPING-001
//    - REQ-THERMAL-COMFORT-001
//    - REQ-VENTILATION-OCCUPIED-001
//
// 2. scripts/requirements/pl/ (ponieważ country = "PL")
//    - REQ-PL-WT-ROOM-HEIGHT-001
//    - REQ-PL-WT-CORRIDOR-WIDTH-001
//    - REQ-PL-FIRE-SEPARATION-001
```

### Obliczanie odwrotnych relacji

**Przed normalizacją:**
```javascript
// Przestrzenie odwołują się do stref
{
  id: "SP-BLD-01-L01-001",
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
}

// Strefa nie ma spaceIds
{
  id: "ZONE-FIRE-ZL-IV",
  spaceIds: []  // Puste
}
```

**Po normalizacji:**
```javascript
// Przestrzeń bez zmian
{
  id: "SP-BLD-01-L01-001",
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
}

// Strefa automatycznie wypełniona spaceIds
{
  id: "ZONE-FIRE-ZL-IV",
  spaceIds: [
    "SP-BLD-01-L01-001",
    "SP-BLD-01-L01-002",
    "SP-BLD-01-L01-003"
  ]  // Obliczone automatycznie!
}
```

### Logowanie etapu normalizacji

```
🔍 Loading jurisdiction pack...
   ✓ Loaded 4 global requirements
   ✓ Loaded 3 PL-specific requirements
🔧 Normalizing entities...
   ✓ Generated 2 missing IDs
   ✓ Normalized 12 units
🔗 Computing relationships...
   ✓ Computed zone.spaceIds (2 zones)
   ✓ Computed system.assetInstanceIds (1 system)
   ✓ Computed level.spaceIds (4 levels)
✓ Normalized 3 spaces, 2 zones, 7 requirements
```

---

## Etap 3: Walidacja

**Cel:** Zapewnienie integralności danych i zgodności ze schematem

**Wejście:** Znormalizowany graf encji z Etapu 2

**Proces:**

### 3.1 Walidacja schematu JSON
- Walidacja każdej encji względem `schemas/sbm-schema-v0.1.json`
- Sprawdzanie wymaganych pól, typów danych, wartości enum
- Używa walidatora Ajv (JSON Schema Draft 07)

### 3.2 Integralność referencyjna
- Weryfikacja, że wszystkie referencje ID istnieją
- Sprawdzenia:
  - `space.zoneIds` → strefy istnieją
  - `space.levelId` → kondygnacja istnieje
  - `space.buildingId` → budynek istnieje
  - `space.requirements` → wymagania istnieją
  - `asset.systemId` → system istnieje

### 3.3 Reguły biznesowe
- Czy wymagania dotyczą właściwego zakresu?
  ```javascript
  // Przykład: Wymaganie dotyczące przestrzeni sypialnej
  requirement: {
    id: "REQ-DAYLIGHT-SLEEPING-001",
    scope: {
      entityType: "space",
      spaceTypes: ["sleeping_space", "bedroom"]
    }
  }

  // ✓ Poprawne: Sypialnia odwołuje się do tego wymagania
  space: {
    id: "SP-BLD-01-L01-001",
    spaceType: "bedroom",
    requirements: ["REQ-DAYLIGHT-SLEEPING-001"]
  }

  // ✗ Niepoprawne: Biuro odwołuje się do wymagania sypialnego
  space: {
    id: "SP-BLD-01-L02-001",
    spaceType: "office",
    requirements: ["REQ-DAYLIGHT-SLEEPING-001"]  // Błąd!
  }
  ```

**Wyjście:**
```javascript
{
  valid: true/false,
  errors: [...],
  warnings: [...]
}
```

**Implementacja:** `scripts/compiler/stages/validate.mjs`

### Typy błędów walidacji

**Błędy schematu:**
```
[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
  - Invalid value for designArea: "14.5" (expected number)
  - Invalid enum value for unit: "meter" (expected "m", "mm", "cm")
```

**Błędy integralności referencyjnej:**
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid zoneId reference: ZONE-FIRE-INVALID (does not exist)
  - Invalid levelId reference: LVL-99 (does not exist)
```

**Błędy reguł biznesowych:**
```
[ERROR] Space SP-BLD-01-L02-001 (Office):
  - Requirement REQ-DAYLIGHT-SLEEPING-001 not applicable
    (requires spaceType: sleeping_space or bedroom)
```

### Ostrzeżenia walidacji

Niekrytyczne problemy, które nie blokują kompilacji:

```
[WARNING] Space SP-BLD-01-L01-001:
  - No requirements assigned
  - designVolume not provided (recommend calculating from area × height)

[WARNING] Requirement REQ-CUSTOM-001:
  - No spaces reference this requirement (unused)
```

### Logowanie etapu walidacji

```
🔍 Validating entities...
   ✓ JSON Schema validation: 0 errors
   ✓ Referential integrity: 0 errors
   ✓ Business rules: 0 errors
   ⚠ 2 warnings (non-blocking)
✅ Validation passed
```

---

## Etap 4: Kompilacja celów

**Cel:** Generowanie praktycznych wyników dla BIM, zgodności, FM i cyfrowego bliźniaka

**Wejście:** Zwalidowany graf encji z Etapu 3

**Proces:**

Cele są generowane **równolegle** dla wydajności:

```javascript
await Promise.all([
  generateBimMapping(entities, options),
  generateComplianceReport(entities, options),
  generateAssetRegister(entities, options),
  generateTwinSchema(entities, options)
]);
```

### 4.1 Cel mapowania BIM

**Generator:** `scripts/compiler/targets/bim-mapping.mjs`

**Wyjście:** `bim_mapping.json`

**Zawartość:**
- Definicje współdzielonych parametrów Revit
- Definicje zestawów właściwości IFC (Pset_SBM_*)
- Reguły mapowania właściwości (SBM → Revit → IFC)

**Przypadki użycia:**
- Import parametrów do Revit
- Konfiguracja eksportu IFC
- Wypełnianie właściwości przez Dynamo

### 4.2 Cel raportu zgodności

**Generator:** `scripts/compiler/targets/compliance-report.mjs`

**Wyjście:** `compliance_report.json`

**Zawartość:**
- Podsumowanie (łączna liczba wymagań, wskaźnik zgodności)
- Wymagania pogrupowane według regulacji
- Podział sekcji WT 2021 dla Polski
- Szczegóły zgodności przestrzeń po przestrzeni
- Status weryfikacji i metody

**Przypadki użycia:**
- Składanie wniosków o pozwolenie na budowę
- Audyty regulacyjne
- Panele zgodności

### 4.3 Cel rejestru zasobów

**Generator:** `scripts/compiler/targets/asset-register.mjs`

**Wyjście:** `asset_register.json`

**Zawartość:**
- Inwentarz zasobów z numerami seryjnymi
- 24-miesięczny kalendarz konserwacji
- Inwentarz części zamiennych
- Śledzenie gwarancji
- Eksport gotowy do CMMS

**Przypadki użycia:**
- Import do CMMS (Maximo, SAP PM)
- Planowanie konserwacji
- Analiza kosztów cyklu życia

### 4.4 Cel schematu cyfrowego bliźniaka

**Generator:** `scripts/compiler/targets/twin-schema.mjs`

**Wyjście:** `twin_schema.json`

**Zawartość:**
- Powiązania czujników (przestrzeń → czujniki)
- Integracja BMS (rejestr urządzeń BACnet)
- Reguły ewaluacji wymagań w czasie rzeczywistym
- Konfiguracja alarmów i progów

**Przypadki użycia:**
- Konfiguracja BMS
- Wdrożenie czujników IoT
- Monitorowanie zgodności w czasie rzeczywistym

### Logowanie etapu kompilacji

```
🔧 Generating compilation targets...
   ✓ BIM mapping (12.5 KB)
   ✓ Compliance report (45.3 KB)
   ✓ Asset register (8.2 KB)
   ✓ Digital twin schema (15.7 KB)
✅ 4 targets generated in 0.08s
```

---

## Wydajność potoku

Pomierzone na przykładzie Green Terrace (3 przestrzenie, 2 strefy, 1 system, 7 wymagań):

| Etap | Czas | Procentowo |
|------|------|------------|
| Parsowanie | 15ms | 12,5% |
| Normalizacja | 25ms | 20,8% |
| Walidacja | 30ms | 25,0% |
| Kompilacja | 50ms | 41,7% |
| **Łącznie** | **120ms** | **100%** |

**Możliwości optymalizacji:**
- Cachowanie sparsowanych encji (pominięcie ponownego parsowania niezmienionych plików)
- Równoległa walidacja niezależnych typów encji
- Kompilacja przyrostowa (regeneracja tylko zmienionych celów)

## Odzyskiwanie po błędach

Kompilator dostarcza jasne komunikaty o błędach na każdym etapie:

### Błędy parsowania

```
[ERROR] Failed to parse spaces/bedroom-01.md:
  - Invalid YAML frontmatter (line 3: unexpected token)

🔧 Fix: Check YAML syntax, ensure proper indentation
```

### Błędy normalizacji

```
[ERROR] Failed to load jurisdiction pack for country "XX":
  - Directory scripts/requirements/xx/ does not exist

🔧 Fix: Use supported country code (PL, DE, GB, US) or create custom pack
```

### Błędy walidacji

```
[ERROR] Validation failed with 3 errors (see above)

🔧 Fix errors and re-run compilation
```

### Błędy kompilacji

```
[ERROR] Failed to generate compliance report:
  - No requirements loaded (check jurisdiction pack)

🔧 Fix: Ensure country is specified or add custom requirements
```

## Kompilacja przyrostowa (planowana)

Planowana optymalizacja dla dużych projektów:

```bash
# Pierwsza kompilacja: Pełna
node scripts/compiler/index.mjs compile --input ... --output ...
# Czas: 5.2s (200 encji)

# Modyfikacja jednej przestrzeni
vim spaces/bedroom-01.md

# Kompilacja przyrostowa: Tylko zmienione encje
node scripts/compiler/index.mjs compile --input ... --output ... --incremental
# Czas: 0.3s (1 encja zmieniona, relacje przeliczone, cele zregenerowane)
```

**Jak to działa:**
1. Hashowanie każdego pliku źródłowego (MD5)
2. Porównanie z hashami poprzedniej kompilacji
3. Ponowne parsowanie tylko zmienionych plików
4. Przeliczenie dotkniętych relacji
5. Regeneracja tylko dotkniętych celów

## Zobacz także

- **[Przegląd kompilatora](/pl/dokumentacja/kompilator/)** - Architektura wysokiego poziomu
- **[Pierwsze kroki](/pl/dokumentacja/kompilator/pierwsze-kroki)** - Pierwsza kompilacja
- **Cele kompilacji** - Głębokie zanurzenie w wyniki
- **[Typy encji](/pl/dokumentacja/encje/)** - Encje (karty), które mogą być kompilowane
