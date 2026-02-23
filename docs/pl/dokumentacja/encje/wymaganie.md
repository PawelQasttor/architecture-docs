# Wymaganie (Reguły i Przepisy)

## Czym To Jest

**Plik Wymagania** dokumentuje jedną regułę, której Twój budynek musi przestrzegać. Przykłady: „Wysokość sufitu w sypialni musi być >= 2,50m" (WT 2021), „Salon wymaga minimum 2% współczynnika doświetlenia" (EN 17037).

::: tip Dla Architektów
**Problem:** Inspektor pyta „Czy ta sypialnia spełnia wymaganie WT 2021 §132 dotyczące wysokości?"

**Stary sposób:** Szukaj w specyfikacjach, miej nadzieję że to udokumentowałeś, ręcznie sprawdzaj czy 2,70m >= 2,50m.

**Z wymaganiami:** System automatycznie sprawdza każdą sypialnię względem `REQ-PL-WT-ROOM-HEIGHT-001` i mówi Ci zaliczone/niezaliczone. **Bez ręcznego sprawdzania.**

**Jeden plik wymagania = automatyczne sprawdzanie zgodności dla każdego odpowiedniego pomieszczenia.**
:::

**Wymaganie** definiuje regułę wydajnościową, regulacyjną lub projektową, którą dokumenty muszą spełniać. Wymagania napędzają sprawdzanie zgodności, planowanie weryfikacji oraz monitorowanie w czasie rzeczywistym przez Cyfrowego Bliźniaka.

## Przeznaczenie

Wymagania określają:
- Cele wydajnościowe (wsp&oacute;łczynnik doświetlenia, komfort cieplny, izolacja akustyczna)
- Zgodność regulacyjną (WT 2021, Prawo budowlane, normy EN)
- Ograniczenia wymiarowe (wysokości pomieszczeń, szerokości korytarzy)
- Wydajność system&oacute;w (krotności wentylacji, odporność ogniowa)
- Metody weryfikacji i odpowiedzialności

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator wymagania | `"REQ-DAYLIGHT-SLEEPING-001"` |
| `entityType` | string | Musi być `"requirement"` | `"requirement"` |
| `documentType` | string | Musi być `"requirement"` | `"requirement"` |
| `requirementName` | string | Nazwa czytelna dla ludzi | `"Minimum daylight factor for sleeping spaces"` |
| `requirementType` | string | Typ (patrz wyliczenie poniżej) | `"performance"` |
| `metric` | string | Mierzalna metryka | `"daylight_factor"` |
| `operator` | string | Operator por&oacute;wnania | `">="`, `"<="`, `"=="`, `"range"` |
| `value` | number/object | Wartość docelowa lub zakres | `2.0` lub `{ "min": 20, "max": 26 }` |
| `unit` | string | Jednostka miary | `"%"`, `"m"`, `"dB"`, `"°C"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator wymagania (np. `REQ-PL-WT-ROOM-HEIGHT-001`)
- **requirementName**: Opis po polsku („Minimalna wysokość pomieszczenia wg WT 2021")
- **requirementType**: Kategoria — `performance`, `dimensional`, `regulatory`, `safety`
- **metric**: Co mierzysz (np. `height`, `daylight_factor`, `fire_resistance`)
- **operator**: Jak porównać — `>=` (większe lub równe), `<=` (mniejsze lub równe), `==` (równa się), `range` (pomiędzy min i max)
- **value**: Wartość docelowa (np. `2.5` dla 2,50m) lub zakres (np. `{min: 20, max: 26}` dla temperatury)
- **unit**: Jaka jednostka (np. `"m"` dla metrów, `"%"` dla procentów, `"°C"` dla stopni Celsjusza)

**Przykład:** Wysokość pomieszczenia >= 2,50m staje się:
```yaml
metric: "height"
operator: ">="
value: 2.5
unit: "m"
```
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `countryScope` | string | "global" lub "poland_specific" itp. |
| `scope` | object | Zakres stosowania (typy kart, typy przestrzeni) |
| `verification` | object | Metoda weryfikacji, narzędzia, faza, osoba odpowiedzialna |
| `legalBasis` | array | Odniesienia prawne (rozporządzenie, paragraf, artykuł) |
| `technicalBasis` | array | Odniesienia do norm technicznych (EN, ISO, ASHRAE) |
| `description` | string | Szczegółowe wyjaśnienie |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla zgodności z pozwoleniem:**
- **legalBasis** — Która ustawa/rozporządzenie (np. WT 2021 §132, Prawo Budowlane Art. 5)
- **scope** — Których pomieszczeń to dotyczy (np. tylko sypialni, tylko przestrzeni mieszkalnych)
- **description** — Prosty opis dla inspektorów

**Dla weryfikacji projektu:**
- **verification** — Jak to sprawdzić (symulacja, obliczenia, pomiar)
- **technicalBasis** — Która norma techniczna (np. EN 17037, ISO 140-4)

**Dla raportów zgodności:**
- **countryScope** — „poland_specific" (ładuje tylko dla polskich projektów) lub „global" (zawsze ładowane)

**Najczęściej:** Po prostu dodaj `legalBasis` i `scope`. System zajmie się resztą.
:::

## Typy Wymagań (Wyliczenie)

```typescript
type RequirementType =
  | "performance"     // Cele wydajności funkcjonalnej
  | "dimensional"     // Ograniczenia wymiarów, wysokości, szerokości
  | "regulatory"      // Wymagania zgodności prawnej
  | "design"          // Standardy i wytyczne projektowe
  | "operational"     // Wymagania operacyjne w czasie użytkowania
  | "safety"          // Wymagania bezpieczeństwa i higieny
  | "sustainability"; // Cele wydajności środowiskowej
```

## Przykład 1: Proste Wymaganie (Minimalne)

**Najprostsze wymaganie — minimalna wysokość pomieszczenia:**

```yaml
Plik: requirements/pl/room-height-min.json

{
  "id": "REQ-PL-WT-ROOM-HEIGHT-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimalna wysokość pomieszczenia wg WT 2021",
  "requirementType": "dimensional",

  "metric": "height",
  "operator": ">=",
  "value": 2.5,
  "unit": "m",

  "legalBasis": [
    {
      "regulation": "WT_2021",
      "section": "§ 132",
      "article": "Minimalna wysokość pomieszczenia"
    }
  ],

  "version": "1.0.0"
}
```

**Co to robi:**
- Każde pomieszczenie, które odwołuje się do `REQ-PL-WT-ROOM-HEIGHT-001` jest automatycznie sprawdzane
- Jeśli wysokość pomieszczenia < 2,5m → **NIEZALICZONE**
- Jeśli wysokość pomieszczenia >= 2,5m → **ZALICZONE**
- Raport zgodności generowany automatycznie

---

**Plik:** `scripts/requirements/global/req-daylight-sleeping-001.json`

```json
{
  "id": "REQ-DAYLIGHT-SLEEPING-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimum daylight factor for sleeping spaces",
  "requirementType": "performance",
  "countryScope": "global",

  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom"]
  },

  "metric": "daylight_factor",
  "operator": ">=",
  "value": 2.0,
  "unit": "%",

  "verification": {
    "method": "simulation",
    "tool": "DIVA, Ladybug, Radiance",
    "standard": "EN_17037",
    "phase": ["schematic", "design_development"],
    "responsible": "lighting_designer"
  },

  "technicalBasis": [
    {
      "standard": "EN_17037:2018",
      "section": "5.2",
      "description": "Daylight in Buildings - Minimum recommendation",
      "url": "https://standards.cen.eu"
    },
    {
      "standard": "BREEAM_HEA_01",
      "section": "Daylighting",
      "description": "2% average daylight factor for living spaces"
    },
    {
      "standard": "WELL_L03",
      "section": "Circadian Lighting Design",
      "description": "Daylight access for sleep-wake cycle regulation"
    }
  ],

  "description": "Sleeping spaces require minimum 2% daylight factor to support circadian rhythm regulation and visual comfort. Verified through simulation at design stage.",

  "version": "1.0.0",
  "tags": ["daylight", "performance", "global", "circadian_health"]
}
```

## Przykład: Wymaganie Specyficzne dla Polski

**Plik:** `scripts/requirements/pl/req-pl-wt-room-height-001.json`

```json
{
  "id": "REQ-PL-WT-ROOM-HEIGHT-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimum room height per WT 2021",
  "requirementType": "dimensional",
  "countryScope": "poland_specific",

  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom", "living_space", "living_room", "kitchen"]
  },

  "metric": "room_height_clear",
  "operator": ">=",
  "value": 2.50,
  "unit": "m",

  "verification": {
    "method": "measurement",
    "tool": "Laser distance meter",
    "standard": "WT_2021",
    "phase": ["design_development", "as_built"],
    "responsible": "architect"
  },

  "legalBasis": [
    {
      "regulation": "WT_2021",
      "section": "&sect; 132",
      "article": "ust. 1",
      "description": "Wysokość pomieszczeń mieszkalnych",
      "fullText": "Wysokość pomieszczeń w budynkach mieszkalnych, mierzona od podłogi do najniższego elementu stropu lub konstrukcji dachu, nie może być mniejsza niż 2,50 m",
      "effectiveDate": "2021-09-20"
    },
    {
      "regulation": "Prawo_budowlane",
      "section": "Art. 7",
      "article": "ust. 1 pkt 1",
      "description": "Wymagania podstawowe dotyczące obiekt&oacute;w budowlanych"
    }
  ],

  "technicalBasis": [
    {
      "standard": "EN_16798-1",
      "section": "6.4",
      "description": "Room height for adequate air quality and thermal comfort"
    }
  ],

  "description": "Residential rooms (bedrooms, living rooms, kitchens) must have clear height ≥ 2.50 m per WT 2021 &sect; 132. Measured from floor to lowest ceiling or roof structure element.",

  "version": "1.0.0",
  "tags": ["dimensional", "poland", "wt_2021", "regulatory"]
}
```

## Definicja Zakresu

Wymagania używają `scope` do określenia stosowalności:

```json
{
  "scope": {
    "entityType": "space",
    "spaceTypes": ["sleeping_space", "bedroom"],
    "conditions": {
      "buildingType": "residential",
      "occupancyCategory": "R-2"
    }
  }
}
```

**Logika dopasowania zakresu:**
- `entityType`: Do jakiego typu karty odnosi się wymaganie
- `spaceTypes`: Konkretne typy przestrzeni (dla wymagań dotyczących przestrzeni)
- `zoneTypes`: Konkretne typy stref (dla wymagań dotyczących stref)
- `conditions`: Dodatkowe filtry (typ budynku, kategoria użytkowania itp.)

## Metody Weryfikacji

Wymagania określają spos&oacute;b weryfikacji zgodności:

| Metoda | Opis | Typowa Faza | Przykład |
|--------|------|-------------|----------|
| `simulation` | Analiza obliczeniowa | Koncepcja, Projekt wstępny | Symulacja doświetlenia |
| `calculation` | Obliczenia wg wzorow | Projekt wstępny, budowlany | Obliczenie wsp&oacute;łczynnika U |
| `measurement` | Pomiar fizyczny | Powykonawcza, eksploatacja | Pomiar wysokości pomieszczenia |
| `testing` | Badania laboratoryjne/terenowe | Budowa | Badania akustyczne |
| `certification` | Certyfikacja przez stronę trzecią | Budowa | Certyfikacja drzwi pożarowych |
| `inspection` | Oględziny wizualne | Powykonawcza | Weryfikacja instalacji |
| `monitoring` | Ciągłe dane z czujnik&oacute;w | Eksploatacja | Monitoring temperatury |

## Operatory i Wartości

### Proste Por&oacute;wnanie

```json
{
  "metric": "room_height_clear",
  "operator": ">=",
  "value": 2.50,
  "unit": "m"
}
```

### Zakres

```json
{
  "metric": "operative_temperature",
  "operator": "range",
  "value": { "min": 20, "max": 26 },
  "unit": "&deg;C"
}
```

### R&oacute;wność

```json
{
  "metric": "fire_resistance_rating",
  "operator": "==",
  "value": "REI 60",
  "unit": null
}
```

## Sprawdzanie Zgodności

Kompilator ocenia wymagania względem kart:

```json
{
  "spaceComplianceDetails": [
    {
      "requirementId": "REQ-PL-WT-ROOM-HEIGHT-001",
      "spaceId": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "metric": "room_height_clear",
      "targetValue": 2.50,
      "measuredValue": 2.70,
      "operator": ">=",
      "status": "compliant",
      "margin": 0.20,
      "unit": "m"
    },
    {
      "requirementId": "REQ-DAYLIGHT-SLEEPING-001",
      "spaceId": "SP-BLD-01-L01-001",
      "spaceName": "Bedroom 01",
      "metric": "daylight_factor",
      "targetValue": 2.0,
      "measuredValue": null,
      "operator": ">=",
      "status": "pending_verification",
      "verificationMethod": "simulation",
      "unit": "%"
    }
  ]
}
```

## Pakiety Jurysdykcyjne

Wymagania są zorganizowane w pakiety jurysdykcyjne:

```
scripts/requirements/
├── global/                    # Standardy międzynarodowe (zawsze ładowane)
│   ├── req-daylight-sleeping-001.json
│   ├── req-acoustic-sleeping-001.json
│   ├── req-thermal-comfort-001.json
│   └── req-ventilation-occupied-001.json
│
├── pl/                        # Specyficzne dla Polski (ładowane gdy country = "PL")
│   ├── req-pl-wt-room-height-001.json
│   ├── req-pl-wt-corridor-width-001.json
│   ├── req-pl-fire-separation-001.json
│   └── req-pl-thermal-walls-001.json
│
├── de/                        # Niemcy (przyszłość)
│   └── req-de-enev-...json
│
└── gb/                        # Wielka Brytania (przyszłość)
    └── req-gb-building-regs-...json
```

**Logika automatycznego ładowania:**
```javascript
// Wymagania globalne zawsze ładowane
const globalReqs = await loadRequirements('global');

// Wymagania specyficzne dla kraju ładowane na podstawie project.country
if (project.country === 'PL') {
  const plReqs = await loadRequirements('pl');
  allRequirements = [...globalReqs, ...plReqs];
}
```

## Integracja z Raportem Zgodności

Wymagania wypełniają raport zgodności sekcjami regulacyjnymi:

```json
{
  "polandSpecificCompliance": {
    "regulation": "WT_2021",
    "sections": [
      {
        "section": "&sect; 132",
        "description": "Wysokość pomieszczeń",
        "requirements": [
          {
            "id": "REQ-PL-WT-ROOM-HEIGHT-001",
            "status": "verified",
            "affectedSpaces": 54,
            "verifiedSpaces": 54,
            "failedSpaces": 0
          }
        ],
        "status": "compliant"
      }
    ]
  }
}
```

## Ewaluacja w Czasie Rzeczywistym przez Cyfrowego Bliźniaka

Wymagania z weryfikacją typu `monitoring` generują reguły ewaluacji w czasie rzeczywistym:

```json
{
  "runtimeEvaluationRules": [
    {
      "requirementId": "REQ-THERMAL-COMFORT-001",
      "metric": "operative_temperature",
      "operator": "range",
      "targetRange": { "min": 20, "max": 26 },
      "unit": "&deg;C",
      "evaluationFrequency": "5min",
      "applicableSpaces": [
        {
          "spaceId": "SP-BLD-01-L01-001",
          "sensorId": "TEMP-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP"
        }
      ],
      "alertThresholds": {
        "warning": { "min": 18, "max": 28 },
        "critical": { "min": 16, "max": 30 }
      }
    }
  ]
}
```

## Tworzenie Wymagań

### Wymagania Globalne (JSON)
Umieszczaj w `scripts/requirements/global/` - automatycznie ładowane dla wszystkich projekt&oacute;w.

### Wymagania Specyficzne dla Kraju (JSON)
Umieszczaj w `scripts/requirements/{kod_kraju}/` - ładowane gdy `project.country` odpowiada kodowi.

### Wymagania Specyficzne dla Projektu (Markdown)
Umieszczaj w `docs/en/examples/{projekt}/requirements/` - ładowane tylko dla danego projektu.

```markdown
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-PROJECT-CUSTOM-001"
requirementName: "Project-specific ceiling height"
requirementType: "dimensional"
metric: "room_height_clear"
operator: ">="
value: 3.00
unit: "m"
scope:
  entityType: "space"
  spaceTypes: ["office"]
verification:
  method: "measurement"
  phase: ["as_built"]
  responsible: "contractor"
version: "1.0.0"
---

# Wymaganie Niestandardowe: Wysokość Sufitu w Biurach

Klient wymaga 3.00 m wysokości w świetle dla wszystkich przestrzeni biurowych (przekracza minimum kodowe 2.50 m).
```

## Zobacz Także

- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie odwołują się do wymagań
- **[Karta Strefa](/pl/dokumentacja/encje/strefa)** - Strefy odwołują się do wymagań
- **[Przewodnik Kompilatora](/pl/dokumentacja/kompilator/)** - Logika ewaluacji wymagań
- **Raport Zgodności** - Wyniki sprawdzania zgodności
