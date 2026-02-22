# Przegląd kompilatora

**Kompilator SBM** przekształca tworzone przez człowieka encje (encja -- w tym standardzie nazywana kartą) Markdown w zwalidowany, odczytywalny maszynowo format JSON i generuje wiele celów kompilacji dla BIM, zgodności, zarządzania obiektami i integracji z cyfrowym bliźniakiem.

## Co robi kompilator?

Kompilator łączy tworzenie przyjazne dla człowieka z maszynowo przetwarzalnymi danymi budynku:

**Wejście:**
- Pliki Markdown z nagłówkiem YAML (przestrzenie, strefy, wymagania, systemy, zasoby)
- Harmonogramy CSV (opcjonalne dane zbiorcze)
- Konfiguracja projektu

**Wyjście:**
- `sbm.json` - Zwalidowany kanoniczny model budynku
- `bim_mapping.json` - Parametry Revit i zestawy właściwości IFC
- `compliance_report.json` - Śledzenie zgodności regulacyjnej
- `asset_register.json` - Dane zarządzania obiektami
- `twin_schema.json` - Powiązania czujników cyfrowego bliźniaka

## 4-etapowy potok

```
┌─────────────────────────────────────────────┐
│ ETAP 1: PARSOWANIE                          │
│ • Wczytaj pliki Markdown z katalogu wejścia │
│ • Wyodrębnij nagłówek YAML                  │
│ • Grupuj encje według typu                  │
│ Wyjście: Surowa kolekcja encji              │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ ETAP 2: NORMALIZACJA I WZBOGACANIE         │
│ • Automatyczne generowanie brakujących ID   │
│ • Normalizacja jednostek (m, m², m³, °C)    │
│ • Wczytanie pakietu jurysdykcji (global +   │
│   kraj)                                     │
│ • Obliczenie odwrotnych relacji              │
│   - space.zoneIds → zone.spaceIds           │
│   - asset.systemId → system.assetInstanceIds│
│ Wyjście: Znormalizowany graf encji          │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ ETAP 3: WALIDACJA                           │
│ • Walidacja schematu JSON                   │
│ • Integralność referencyjna (czy ID istnieją│
│   ?)                                        │
│ • Walidacja reguł biznesowych               │
│   - Czy wymagania dotyczą zakresu?          │
│   - Czy wymagane pola są obecne?            │
│ Wyjście: Raport walidacji + zwalidowany graf│
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ ETAP 4: KOMPILACJA CELÓW (Równolegle)      │
│ • Generowanie mapowania BIM                 │
│ • Generowanie raportu zgodności             │
│ • Generowanie rejestru zasobów              │
│ • Generowanie schematu cyfrowego bliźniaka  │
│ Wyjście: 5 celów kompilacji                │
└─────────────────────────────────────────────┘
```

## Podstawowe użycie

```bash
# Kompilacja projektu
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose

# Wygenerowane pliki wyjściowe:
# build/green-terrace/sbm.json
# build/green-terrace/bim_mapping.json
# build/green-terrace/compliance_report.json
# build/green-terrace/asset_register.json
# build/green-terrace/twin_schema.json
```

## Opcje wiersza poleceń

| Opcja | Opis | Przykład |
|-------|------|---------|
| `--input` | Katalog wejściowy z plikami Markdown | `docs/en/examples/green-terrace` |
| `--output` | Katalog wyjściowy dla skompilowanych plików | `build/green-terrace` |
| `--country` | Kod kraju ISO 3166-1 (uruchamia pakiet jurysdykcji) | `PL`, `DE`, `GB`, `US` |
| `--verbose` | Pokaż szczegółowe logowanie | `--verbose` |
| `--validate-only` | Uruchom walidację bez generowania celów | `--validate-only` |
| `--targets` | Generuj tylko określone cele | `--targets bim,compliance` |

## Cele kompilacji

### 1. Mapowanie BIM (`bim_mapping.json`)

Mapuje encje SBM na platformy BIM:

**Przypadki użycia:**
- Generowanie współdzielonych parametrów Revit
- Konfiguracja zestawów właściwości eksportu IFC
- Wypełnianie właściwości BIM przez Dynamo/Grasshopper

**Kluczowe funkcje:**
- Definicje parametrów Revit
- Definicje Pset IFC (Pset_SBM_Space, Pset_SBM_Zone, itd.)
- Reguły mapowania właściwości (SBM → Revit → IFC)

### 2. Raport Zgodności (`compliance_report.json`)

Śledzi zgodność regulacyjną:

**Przypadki użycia:**
- Dokumentacja do pozwolenia na budowę
- Audyty regulacyjne
- Panele zgodności projektu

**Kluczowe funkcje:**
- Wymagania pogrupowane według regulacji (WT 2021, Prawo budowlane, normy EN)
- Kontrole zgodności przestrzeń po przestrzeni
- Podział sekcji WT 2021 dla Polski (§ 132, § 234, § 69, itd.)
- Status weryfikacji i metody

### 3. Rejestr Zasobów (`asset_register.json`)

Dane zarządzania obiektami:

**Przypadki użycia:**
- Import do CMMS (Maximo, SAP PM, Archibus)
- Planowanie konserwacji
- Analiza kosztów cyklu życia
- Inwentarz części zamiennych

**Kluczowe funkcje:**
- Inwentarz zasobów z numerami seryjnymi i tagami
- 24-miesięczny kalendarz konserwacji
- Inwentarz części zamiennych
- Śledzenie gwarancji
- Formaty eksportu gotowe do CMMS

### 4. Schemat Cyfrowego Bliźniaka (`twin_schema.json`)

Konfiguracja monitorowania w czasie rzeczywistym:

**Przypadki użycia:**
- Integracja BMS (BACnet, Modbus, MQTT)
- Powiązanie czujników IoT
- Monitorowanie zgodności w czasie rzeczywistym
- Analityka wydajności budynku

**Kluczowe funkcje:**
- Powiązania czujników (przestrzeń → czujniki)
- Rejestr urządzeń BMS i mapowanie punktów
- Reguły ewaluacji wymagań w czasie rzeczywistym
- Konfiguracja alarmów i progów

## Pakiety jurysdykcji

Kompilator automatycznie wczytuje wymagania na podstawie kraju projektu:

```javascript
// Projekt definiuje kraj
{
  "country": "PL"
}

// Kompilator automatycznie wczytuje:
// - scripts/requirements/global/ (zawsze)
// - scripts/requirements/pl/ (specyficzne dla Polski)
```

**Dostępne pakiety:**
- **Globalny** (4 wymagania) - Nasłonecznienie, akustyka, komfort cieplny, wentylacja
- **Polska** (3 wymagania) - WT 2021 § 132, § 234, § 69

**Dodawanie nowych krajów:**
1. Utwórz `scripts/requirements/{kod_kraju}/`
2. Dodaj wymagania jako pliki JSON
3. Kompilator automatycznie wczyta je gdy `project.country` pasuje

## Warstwy walidacji

Kompilator waliduje na trzech poziomach:

### 1. Walidacja schematu JSON
- Waliduje strukturę encji względem `schemas/sbm-schema-v0.1.json`
- Sprawdza wymagane pola, typy danych, wartości enum
- Szybka, automatyczna walidacja

### 2. Integralność referencyjna
- Wszystkie referencje ID muszą istnieć
- Przykład: `space.zoneIds` musi odwoływać się do istniejących stref
- Wykrywa uszkodzone referencje i osierocone encje

### 3. Reguły biznesowe
- Wymagania muszą być odpowiednie dla swojego zakresu
- Przykład: Wymaganie dotyczące przestrzeni sypialnej dotyczy tylko sypialni
- Zapobiega błędom logicznym w modelu

## Obsługa błędów

Kompilator dostarcza jasne, wykonalne komunikaty o błędach:

```bash
❌ Walidacja nie powiodła się z 3 błędami:

[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
  - Invalid zoneId reference: ZONE-FIRE-INVALID (does not exist)

[ERROR] Requirement REQ-DAYLIGHT-SLEEPING-001:
  - Scope mismatch: Applied to office space (requires sleeping_space)

🔧 Fix these errors and re-run compilation
```

## Wydajność

Cele wydajnościowe kompilatora:

| Rozmiar projektu | Liczba encji | Czas kompilacji |
|-------------------|--------------|-----------------|
| Mały | < 50 encji | < 1 sekunda |
| Średni | 50-200 encji | 1-5 sekund |
| Duży | 200-1000 encji | 5-15 sekund |
| Bardzo duży | > 1000 encji | 15-60 sekund |

**Techniki optymalizacji:**
- Kompilacja przyrostowa (tylko zmienione pliki)
- Równoległe generowanie celów
- Cachowanie encji
- Leniwe ładowanie pakietów jurysdykcji

## Ciągła integracja

Integracja kompilatora z potokami CI/CD:

```yaml
# GitHub Actions example
name: Validate SBM
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: |
          node scripts/compiler/index.mjs compile \
            --input docs/en/examples/green-terrace \
            --output build/green-terrace \
            --country PL \
            --validate-only
```

## Architektura kompilatora

```
scripts/compiler/
├── index.mjs                  # Główny punkt wejścia, CLI
├── stages/
│   ├── parse.mjs              # Etap 1: Parsowanie Markdown
│   ├── normalize.mjs          # Etap 2: Normalizacja i wzbogacanie
│   ├── validate.mjs           # Etap 3: Walidacja
│   └── compile.mjs            # Etap 4: Generowanie celów
├── targets/
│   ├── bim-mapping.mjs        # Generator mapowania BIM
│   ├── compliance-report.mjs  # Generator raportu zgodności
│   ├── asset-register.mjs     # Generator rejestru zasobów
│   └── twin-schema.mjs        # Generator schematu cyfrowego bliźniaka
├── enrichers/
│   └── jurisdiction-pack.mjs  # Loader pakietów jurysdykcji
└── utils/
    ├── logger.mjs             # Narzędzia logowania
    ├── file-utils.mjs         # Helpery I/O plików
    └── id-generator.mjs       # Deterministyczne generowanie ID
```

## Zobacz także

- **[Pierwsze kroki](/pl/dokumentacja/kompilator/pierwsze-kroki)** - Instalacja i pierwsza kompilacja
- **[Potok kompilacji](/pl/dokumentacja/kompilator/potok)** - Szczegółowa dokumentacja potoku
- **[Typy encji](/pl/dokumentacja/encje/)** - Encje (karty), które mogą być kompilowane
- **[Przewodnik tworzenia](/pl/dokumentacja/tworzenie/)** - Tworzenie kompilowalnych encji (kart)
