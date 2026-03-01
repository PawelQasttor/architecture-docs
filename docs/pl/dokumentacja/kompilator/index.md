# Przegląd kompilatora

**Kompilator SBM v1.0.0** przekształca tworzone przez człowieka encje (encja -- w tym standardzie nazywana kartą) Markdown w zwalidowany, odczytywalny maszynowo format JSON i generuje wiele celów kompilacji dla BIM, zgodności, zarządzania obiektami, integracji z cyfrowym bliźniakiem oraz **audytu jakości danych**.

## Co robi kompilator?

Kompilator łączy tworzenie przyjazne dla człowieka z maszynowo przetwarzalnymi danymi budynku:

**Wejście:**
- Pliki Markdown z nagłówkiem YAML (przestrzenie, strefy, wymagania, systemy, zasoby, **szablony typów**)
- Harmonogramy CSV (opcjonalne dane zbiorcze)
- Konfiguracja projektu

**Wyjście:**
- `sbm.json` - Zwalidowany kanoniczny model budynku ze śledzeniem proweniencji
- `bim_mapping.json` - Parametry Revit i zestawy właściwości IFC
- `compliance_report.json` - Śledzenie zgodności regulacyjnej
- `asset_register.json` - Dane zarządzania obiektami
- `twin_schema.json` - Powiązania czujników cyfrowego bliźniaka
- `quality_report.json` - **Audyt jakości danych i gotowość fazowa** 
## 5-etapowy potok

```
┌─────────────────────────────────────────────────┐
│ ETAP 1: PARSOWANIE                              │
│ • Wczytaj pliki Markdown z katalogu wejścia     │
│ • Wyodrębnij nagłówek YAML                      │
│ • Rozpoznaj 11 typów encji + 4 szablony typów   │
│ Wyjście: Surowa kolekcja encji                  │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ ETAP 2: NORMALIZACJA, WZBOGACANIE I ROZWIĄZANIE│
│ • Rozwiąż dziedziczenie typ→instancja           │
│   (Typ Przestrzeni → Przestrzeń, Typ Strefy →   │
│   Strefa, itd.)                                 │
│ • Rozwiąż dziedziczenie kondygnacja→przestrzeń  │
│   (typicalCeilingHeight, typicalFinishes, itd.)  │
│ • Śledź proweniencję dziedziczenia (_meta)       │
│ • Wczytaj pakiet jurysdykcji (globalny + kraj)  │
│ • Oblicz odwrotne relacje                        │
│ Wyjście: Znormalizowany graf encji z proweniencją│
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ ETAP 3: WALIDACJA                               │
│ • Walidacja schematu JSON (v0.2)                │
│ • Integralność referencyjna (czy ID istnieją?)  │
│ • Kontrole proweniencji danych                  │
│   - Źródło wymagane dla wysokiej pewności       │
│   - Pola null muszą mieć wyjaśnienie _meta     │
│ • Egzekwowanie bram fazowych                    │
│   - Faza 4+: ostrzeżenie dla pól 'assumed'     │
│   - Faza 5+: błąd dla pól 'assumed'            │
│   - Faza 7+: błąd dla 'estimated' na polach    │
│     krytycznych dla bezpieczeństwa              │
│ Wyjście: Raport walidacji + zwalidowany graf    │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ ETAP 3.5: PODSUMOWANIA JAKOŚCI                  │
│ • Oblicz blok _quality dla każdej encji         │
│   (rozkład pewności, kompletność, ostrzeżenia)  │
│ • Zidentyfikuj pola krytyczne dla bezpieczeństwa│
│ • Wygeneruj podsumowanie jakości całego projektu │
│ Wyjście: Encje wzbogacone o bloki _quality      │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ ETAP 4: KOMPILACJA CELÓW (Równolegle)           │
│ • Generowanie mapowania BIM                     │
│ • Generowanie raportu zgodności                 │
│ • Generowanie rejestru zasobów                  │
│ • Generowanie schematu cyfrowego bliźniaka      │
│ • Generowanie raportu jakości (audyt            │
│   bezpieczeństwa, luki proweniencji,            │
│   gotowość fazowa)                              │
│ Wyjście: 6 celów kompilacji                     │
└─────────────────────────────────────────────────┘
```

## Podstawowe użycie

```bash
# Kompilacja projektu (domyślnie Faza 3)
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/green-terrace \
  --output build/green-terrace \
  --country PL \
  --verbose

# Kompilacja ze ścisłym egzekwowaniem Fazy 5
node scripts/compiler/index.mjs compile \
  --input project/entities \
  --output build/project \
  --phase 5 --country PL --verbose

# Wygenerowane pliki wyjściowe:
# build/green-terrace/sbm.json
# build/green-terrace/bim_mapping.json
# build/green-terrace/compliance_report.json
# build/green-terrace/asset_register.json
# build/green-terrace/twin_schema.json
# build/green-terrace/quality_report.json
```

## Opcje wiersza poleceń

| Opcja | Opis | Domyślna | Przykład |
|-------|------|----------|---------|
| `--input` | Katalog wejściowy z plikami Markdown | *(wymagana)* | `docs/en/examples/green-terrace` |
| `--output` | Katalog wyjściowy dla skompilowanych plików | *(wymagana)* | `build/green-terrace` |
| `--country` | Kod kraju ISO 3166-1 (uruchamia pakiet jurysdykcji) | `PL` | `PL`, `DE`, `GB`, `US` |
| `--phase` | Faza projektu 1-8 dla egzekwowania bram fazowych | `3` | `5` |
| `--verbose` | Pokaż szczegółowe logowanie | `false` | `--verbose` |
| `--mode` | Tryb kompilacji | `production` | `development` |

## Egzekwowanie bram fazowych

Opcja `--phase` kontroluje, jak rygorystycznie kompilator waliduje pewność danych:

| Faza | Zachowanie |
|------|------------|
| 1-3 | Wszystkie poziomy pewności akceptowane |
| 4 | Ostrzega przy polach z pewnością `assumed` |
| 5-6 | **Błąd** przy polach z pewnością `assumed` |
| 7-8 | **Błąd** przy polach `estimated` krytycznych dla bezpieczeństwa |

**Pola krytyczne dla bezpieczeństwa** z surowszym egzekwowaniem od Fazy 7:
- `electricalSafetyGroup` (grupa wg IEC 60364-7-710)
- `radiologicalShielding` (ochrona radiologiczna)
- `fireRating` (odporność ogniowa)
- `structuralLoad` (nośność konstrukcyjna)

## Cele kompilacji

### 1. Mapowanie BIM (`bim_mapping.json`)

Mapuje encje SBM na platformy BIM:

**Przypadki użycia:**
- Generowanie współdzielonych parametrów Revit
- Konfiguracja zestawów właściwości eksportu IFC
- Wypełnianie właściwości BIM przez Dynamo/Grasshopper

### 2. Raport zgodności (`compliance_report.json`)

Śledzi zgodność regulacyjną:

**Przypadki użycia:**
- Dokumentacja do pozwolenia na budowę
- Audyty regulacyjne
- Panele zgodności projektu

### 3. Rejestr zasobów (`asset_register.json`)

Dane zarządzania obiektami:

**Przypadki użycia:**
- Import do CMMS (Maximo, SAP PM, Archibus)
- Planowanie konserwacji
- Analiza kosztów cyklu życia

### 4. Schemat cyfrowego bliźniaka (`twin_schema.json`)

Konfiguracja monitorowania w czasie rzeczywistym:

**Przypadki użycia:**
- Integracja BMS (BACnet, Modbus, MQTT)
- Powiązanie czujników IoT
- Monitorowanie zgodności w czasie rzeczywistym

### 5. Raport jakości (`quality_report.json`) 
Audyt jakości danych i ocena gotowości fazowej:

**Przypadki użycia:**
- Przegląd architekta przed awansem fazy
- Audyt pól krytycznych dla bezpieczeństwa
- Analiza luk proweniencji (jakie dane nie mają referencji źródłowych?)
- Planowanie zbierania danych (co zmierzyć/zweryfikować w następnej kolejności?)

**Kluczowe sekcje:**
- **Gotowość fazowa** - Czy projekt może przejść do następnej fazy?
- **Audyt bezpieczeństwa** - Lista wszystkich pól krytycznych z poziomami pewności
- **Luki proweniencji** - Pola bez adnotacji `_meta` lub referencji źródłowych
- **Karty encji** - Rozbicie jakości per encja (posortowane od najgorszej)
- **Rekomendacje** - Priorytetyzowana lista kolejnych kroków naprawczych

## Rozwiązywanie dziedziczenia typ/instancja

Kompilator rozwiązuje dwa łańcuchy dziedziczenia podczas normalizacji:

### Typ → Instancja

Gdy Przestrzeń odwołuje się do `spaceTypeId`, kompilator kopiuje pola szablonu do instancji (jeśli nie zostały jawnie ustawione):

```yaml
# Typ Przestrzeni definiuje wartości domyślne
id: ST-BEDROOM-STANDARD-A
designArea: 14.5
designHeight: 2.70

# Przestrzeń odwołuje się do typu
id: SP-BLD-01-L01-001
spaceTypeId: ST-BEDROOM-STANDARD-A
# designArea i designHeight dziedziczone automatycznie
```

Odziedziczone pola otrzymują `_meta` z `resolution: "type_default"`.

### Kondygnacja → Przestrzeń

Gdy Przestrzeń odwołuje się do `levelId`, kompilator dziedziczy typowe właściwości kondygnacji:

| Pole Kondygnacji | Pole Przestrzeni | Zachowanie |
|-------------------|-----------------|------------|
| `typicalCeilingHeight` | `designHeight` | Kopiowane jeśli nie ustawione |
| `typicalFinishes` | `finishes` | Kopiowane jeśli nie ustawione |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Kopiowane jeśli nie ustawione |
| `levelRequirements` | `requirements` | **Łączone** (dodawane, nie zastępowane) |

Odziedziczone pola otrzymują `_meta` z `resolution: "inherited"`.

**Kolejność rozwiązywania:** (1) Jawna wartość na encji, (2) Szablon typu, (3) Dziedziczenie z kondygnacji, (4) Brak wartości domyślnej.

## Pakiety jurysdykcji

Kompilator automatycznie wczytuje wymagania na podstawie kraju projektu:

**Dostępne pakiety:**
- **Globalny** (4 wymagania) - Nasłonecznienie, akustyka, komfort cieplny, wentylacja
- **Polska** (3 wymagania) - WT 2021 § 132, § 234, § 69

**Dodawanie nowych krajów:**
1. Utwórz `scripts/requirements/{kod_kraju}/`
2. Dodaj wymagania jako pliki JSON
3. Kompilator automatycznie wczyta je gdy `project.country` pasuje

## Warstwy walidacji

Kompilator waliduje na pięciu poziomach:

### 1. Walidacja schematu JSON
- Waliduje strukturę encji względem `schemas/sbm-schema-v1.1.json`
- Sprawdza wymagane pola, typy danych, wartości enum

### 2. Integralność referencyjna
- Wszystkie referencje ID muszą istnieć
- Sprawdza: `spaceTypeId`, `levelId`, `zoneIds`, `systemTypeId`, `assetTypeId`

### 3. Reguły biznesowe
- Wymagania muszą być odpowiednie dla swojego zakresu
- Przestrzenie powinny mieć strefy i wymagania

### 4. Proweniencja danych - Pola z pewnością `measured`/`calculated`/`specified` muszą mieć referencję `source`
- Pola null bez wyjaśnienia `_meta` generują ostrzeżenia
- Zapewnia kompletność śledzenia jakości danych

### 5. Bramy fazowe - Egzekwuje wymagania pewności na podstawie fazy projektu
- Zapobiega awansowaniu projektów z niezweryfikowanymi danymi
- Pola krytyczne dla bezpieczeństwa mają surowsze egzekwowanie

## Architektura kompilatora

```
scripts/compiler/
├── index.mjs                  # Główny punkt wejścia, CLI (v1.0.0)
├── stages/
│   ├── parse.mjs              # Etap 1: Parsowanie Markdown (11 typów encji)
│   ├── normalize.mjs          # Etap 2: Normalizacja, dziedziczenie, relacje
│   ├── validate.mjs           # Etap 3: Schemat v0.2, proweniencja, bramy fazowe
│   └── quality.mjs            # Etap 3.5: Generowanie podsumowań jakości
├── targets/
│   ├── bim-mapping.mjs        # Generator mapowania BIM
│   ├── compliance-report.mjs  # Generator raportu zgodności
│   ├── asset-register.mjs     # Generator rejestru zasobów
│   ├── twin-schema.mjs        # Generator schematu cyfrowego bliźniaka
│   └── quality-report.mjs     # Generator raportu jakości
├── enrichers/
│   └── jurisdiction-pack.mjs  # Loader pakietów jurysdykcji
```

## Zobacz także

- **[Pierwsze kroki](/pl/dokumentacja/kompilator/pierwsze-kroki)** - Instalacja i pierwsza kompilacja
- **[Potok kompilacji](/pl/dokumentacja/kompilator/potok)** - Szczegółowa dokumentacja potoku
- **[Przewodnik proweniencji danych](/pl/przewodniki/proweniencja-danych)** - Jak śledzić źródła danych
- **[Typy encji](/pl/dokumentacja/encje/)** - Encje (karty), które mogą być kompilowane
- **[Przewodnik tworzenia](/pl/dokumentacja/tworzenie/)** - Tworzenie kompilowalnych encji (kart)
