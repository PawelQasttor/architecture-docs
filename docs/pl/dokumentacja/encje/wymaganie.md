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
| `requirementName` | string | Nazwa czytelna dla ludzi | `"Minimalny współczynnik światła dziennego dla przestrzeni do spania"` |
| `requirementType` | string | Typ (patrz wyliczenie poniżej) | `"performance"` |
| `metric` | string | **[v0.3.0: OPCJONALNE]** Mierzalna metryka | `"daylight_factor"` |
| `operator` | string | **[v0.3.0: OPCJONALNE]** Operator por&oacute;wnania | `">="`, `"<="`, `"=="`, `"range"` |
| `value` | number/object | **[v0.3.0: OPCJONALNE]** Wartość docelowa lub zakres | `2.0` lub `{ "min": 20, "max": 26 }` |
| `unit` | string | Jednostka miary | `"%"`, `"m"`, `"dB"`, `"°C"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: warning Zmiana w v0.3.0: Wymagania numeryczne i jakościowe
Pola `metric`, `operator` i `value` są teraz **opcjonalne**. Wymagania mogą być:
- **Numeryczne** (jak dotychczas) — z `metric`, `operator`, `value`
- **Jakościowe** (NOWOŚĆ v0.3.0) — z `qualitativeDescription`, `acceptanceCriteria`, `evidenceRequired`

Dodano nową wartość `requirementType`: `"qualitative"`.
:::

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator wymagania (np. `REQ-PL-WT-ROOM-HEIGHT-001`)
- **requirementName**: Opis po polsku („Minimalna wysokość pomieszczenia wg WT 2021")
- **requirementType**: Kategoria — `performance`, `dimensional`, `regulatory`, `safety`, `qualitative` (NOWOŚĆ v0.3.0)
- **metric**: Co mierzysz (np. `height`, `daylight_factor`, `fire_resistance`) — **opcjonalne od v0.3.0**
- **operator**: Jak porównać — `>=` (większe lub równe), `<=` (mniejsze lub równe), `==` (równa się), `range` (pomiędzy min i max) — **opcjonalne od v0.3.0**
- **value**: Wartość docelowa (np. `2.5` dla 2,50m) lub zakres (np. `{min: 20, max: 26}` dla temperatury) — **opcjonalne od v0.3.0**
- **unit**: Jaka jednostka (np. `"m"` dla metrów, `"%"` dla procentów, `"°C"` dla stopni Celsjusza)

**Przykład numeryczny:** Wysokość pomieszczenia >= 2,50m staje się:
```yaml
metric: "height"
operator: ">="
value: 2.5
unit: "m"
```

**Przykład jakościowy (NOWOŚĆ v0.3.0):** Wymaganie organizacyjne bez wartości liczbowej:
```yaml
requirementType: "qualitative"
qualitativeDescription: "Sala operacyjna musi mieć wydzielony ciąg czysty i brudny"
acceptanceCriteria:
  - "Ciąg czysty oddzielony od brudnego fizyczną barierą"
  - "Personel wchodzi przez śluzę z przebieralnią"
  - "Materiały czyste dostarczane osobnym korytarzem"
evidenceRequired:
  - "Zatwierdzony rysunek technologiczny"
  - "Opinia sanitarno-epidemiologiczna"
  - "Protokół odbioru technicznego"
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
| `qualitativeDescription` | string | **[NOWOŚĆ v0.3.0]** Opis wymagania jakościowego (zamiast metric/operator/value) |
| `acceptanceCriteria` | array | **[NOWOŚĆ v0.3.0]** Kryteria akceptacji (lista warunków do spełnienia) |
| `evidenceRequired` | array | **[NOWOŚĆ v0.3.0]** Wymagane dowody (dokumenty, protokoły, opinie) |
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
  | "sustainability"  // Cele wydajności środowiskowej
  | "qualitative";    // NOWOŚĆ v0.3.0: Wymagania jakościowe (bez wartości liczbowej)
```

## Przykład 1: Proste Wymaganie (Minimalne)

**Najprostsze wymaganie — minimalna wysokość pomieszczenia:**

::: code-group

```yaml [Markdown]
---
id: "REQ-PL-WT-ROOM-HEIGHT-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalna wysokość pomieszczenia wg WT 2021"
requirementType: "dimensional"
metric: "height"
operator: ">="
value: 2.5
unit: "m"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 132"
    article: "Minimalna wysokość pomieszczenia"
version: "1.0.0"
---

# Wymaganie: Minimalna Wysokość Pomieszczenia wg WT 2021

Każde pomieszczenie mieszkalne musi mieć wysokość >= 2,50m.
```

```yaml [YAML]
id: "REQ-PL-WT-ROOM-HEIGHT-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalna wysokość pomieszczenia wg WT 2021"
requirementType: "dimensional"
metric: "height"
operator: ">="
value: 2.5
unit: "m"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 132"
    article: "Minimalna wysokość pomieszczenia"
version: "1.0.0"
```

```json [JSON]
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

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "metric": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

**Co to robi:**
- Każde pomieszczenie, które odwołuje się do `REQ-PL-WT-ROOM-HEIGHT-001` jest automatycznie sprawdzane
- Jeśli wysokość pomieszczenia < 2,5m → **NIEZALICZONE**
- Jeśli wysokość pomieszczenia >= 2,5m → **ZALICZONE**
- Raport zgodności generowany automatycznie

---

**Plik:** `scripts/requirements/global/req-daylight-sleeping-001.json`

::: code-group

```yaml [Markdown]
---
id: "REQ-DAYLIGHT-SLEEPING-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalny współczynnik światła dziennego dla przestrzeni do spania"
requirementType: "performance"
countryScope: "global"
scope:
  entityType: "space"
  spaceTypes: ["sleeping_space", "bedroom"]
metric: "daylight_factor"
operator: ">="
value: 2.0
unit: "%"
verification:
  method: "simulation"
  tool: "DIVA, Ladybug, Radiance"
  standard: "EN_17037"
  phase: ["schematic", "design_development"]
  responsible: "lighting_designer"
technicalBasis:
  - standard: "EN_17037:2018"
    section: "5.2"
    description: "Daylight in Buildings - Minimum recommendation"
    url: "https://standards.cen.eu"
  - standard: "BREEAM_HEA_01"
    section: "Daylighting"
    description: "Średni współczynnik światła dziennego 2% dla przestrzeni mieszkalnych"
  - standard: "WELL_L03"
    section: "Circadian Lighting Design"
    description: "Dostęp do światła dziennego dla regulacji rytmu snu i czuwania"
description: "Przestrzenie do spania wymagają minimalnego współczynnika światła dziennego 2% dla wsparcia regulacji rytmu okołodobowego i komfortu wizualnego. Weryfikowane symulacją na etapie projektu."
version: "1.0.0"
tags: ["daylight", "performance", "global", "circadian_health"]
---

# Requirement: Minimum Daylight Factor for Sleeping Spaces

Sleeping spaces require minimum 2% daylight factor.
```

```yaml [YAML]
id: "REQ-DAYLIGHT-SLEEPING-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalny współczynnik światła dziennego dla przestrzeni do spania"
requirementType: "performance"
countryScope: "global"
scope:
  entityType: "space"
  spaceTypes: ["sleeping_space", "bedroom"]
metric: "daylight_factor"
operator: ">="
value: 2.0
unit: "%"
verification:
  method: "simulation"
  tool: "DIVA, Ladybug, Radiance"
  standard: "EN_17037"
  phase: ["schematic", "design_development"]
  responsible: "lighting_designer"
technicalBasis:
  - standard: "EN_17037:2018"
    section: "5.2"
    description: "Daylight in Buildings - Minimum recommendation"
    url: "https://standards.cen.eu"
  - standard: "BREEAM_HEA_01"
    section: "Daylighting"
    description: "Średni współczynnik światła dziennego 2% dla przestrzeni mieszkalnych"
  - standard: "WELL_L03"
    section: "Circadian Lighting Design"
    description: "Dostęp do światła dziennego dla regulacji rytmu snu i czuwania"
description: "Przestrzenie do spania wymagają minimalnego współczynnika światła dziennego 2% dla wsparcia regulacji rytmu okołodobowego i komfortu wizualnego. Weryfikowane symulacją na etapie projektu."
version: "1.0.0"
tags: ["daylight", "performance", "global", "circadian_health"]
```

```json [JSON]
{
  "id": "REQ-DAYLIGHT-SLEEPING-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimalny współczynnik światła dziennego dla przestrzeni do spania",
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
      "description": "Średni współczynnik światła dziennego 2% dla przestrzeni mieszkalnych"
    },
    {
      "standard": "WELL_L03",
      "section": "Circadian Lighting Design",
      "description": "Dostęp do światła dziennego dla regulacji rytmu snu i czuwania"
    }
  ],
  "description": "Przestrzenie do spania wymagają minimalnego współczynnika światła dziennego 2% dla wsparcia regulacji rytmu okołodobowego i komfortu wizualnego. Weryfikowane symulacją na etapie projektu.",
  "version": "1.0.0",
  "tags": ["daylight", "performance", "global", "circadian_health"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "metric": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    },
    "scope": {
      "type": "object"
    },
    "verificationMethod": {
      "type": "string"
    },
    "source": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

## Wzorce: Numeryczne vs Jakościowe (v0.3.0)

Od wersji v0.3.0 wymagania mogą przyjmować dwie formy:

### Wzorzec numeryczny (metric + operator + value)

Wymaganie z mierzalną wartością docelową — system automatycznie sprawdza zgodność:

::: code-group

```yaml [Markdown]
---
id: "REQ-OR-PRESSURE-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Nadciśnienie sali operacyjnej"
requirementType: "performance"
metric: "pressure_differential"
operator: ">="
value: 15
unit: "Pa"
version: "1.0.0"
---

# Wymaganie: Nadciśnienie Sali Operacyjnej

Sala operacyjna wymaga nadciśnienia >= 15 Pa.
```

```yaml [YAML]
id: "REQ-OR-PRESSURE-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Nadciśnienie sali operacyjnej"
requirementType: "performance"
metric: "pressure_differential"
operator: ">="
value: 15
unit: "Pa"
version: "1.0.0"
```

```json [JSON]
{
  "id": "REQ-OR-PRESSURE-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Nadciśnienie sali operacyjnej",
  "requirementType": "performance",
  "metric": "pressure_differential",
  "operator": ">=",
  "value": 15,
  "unit": "Pa",
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "metric": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

### Wzorzec jakościowy (qualitativeDescription + acceptanceCriteria + evidenceRequired)

Wymaganie organizacyjne lub proceduralne, bez wartości liczbowej:

::: code-group

```yaml [Markdown]
---
id: "REQ-OR-CLEAN-DIRTY-SEPARATION-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Separacja ciągów czystych i brudnych w bloku operacyjnym"
requirementType: "qualitative"
qualitativeDescription: "Blok operacyjny musi zapewniać pełną separację ciągów czystych i brudnych zgodnie z wymaganiami sanitarno-epidemiologicznymi"
acceptanceCriteria:
  - "Materiały sterylne dostarczane wyłącznie ciągiem czystym"
  - "Odpady i brudna bielizna usuwane wyłącznie ciągiem brudnym"
  - "Personel wchodzi do sali przez śluzę z przebieralnią"
  - "Pacjent transportowany dedykowanym ciągiem pacjenckim"
  - "Brak krzyżowania się ciągów czystych i brudnych"
evidenceRequired:
  - "Zatwierdzony rysunek technologiczny bloku operacyjnego"
  - "Opinia sanitarno-epidemiologiczna WSSE"
  - "Protokół odbioru technicznego"
  - "Schemat przepływów (clean/dirty flow diagram)"
scope:
  entityType: "space"
  spaceTypes: ["operating_room", "sterilization", "clean_room"]
legalBasis:
  - regulation: "Dz.U. 2012 poz. 739"
    section: "§ 37"
    description: "Wymagania dla pomieszczeń bloku operacyjnego"
version: "1.0.0"
tags: ["qualitative", "healthcare", "infection_control", "surgical"]
---

# Wymaganie: Separacja Ciągów Czystych i Brudnych

Blok operacyjny musi zapewniać pełną separację ciągów czystych i brudnych.
```

```yaml [YAML]
id: "REQ-OR-CLEAN-DIRTY-SEPARATION-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Separacja ciągów czystych i brudnych w bloku operacyjnym"
requirementType: "qualitative"
qualitativeDescription: "Blok operacyjny musi zapewniać pełną separację ciągów czystych i brudnych zgodnie z wymaganiami sanitarno-epidemiologicznymi"
acceptanceCriteria:
  - "Materiały sterylne dostarczane wyłącznie ciągiem czystym"
  - "Odpady i brudna bielizna usuwane wyłącznie ciągiem brudnym"
  - "Personel wchodzi do sali przez śluzę z przebieralnią"
  - "Pacjent transportowany dedykowanym ciągiem pacjenckim"
  - "Brak krzyżowania się ciągów czystych i brudnych"
evidenceRequired:
  - "Zatwierdzony rysunek technologiczny bloku operacyjnego"
  - "Opinia sanitarno-epidemiologiczna WSSE"
  - "Protokół odbioru technicznego"
  - "Schemat przepływów (clean/dirty flow diagram)"
scope:
  entityType: "space"
  spaceTypes: ["operating_room", "sterilization", "clean_room"]
legalBasis:
  - regulation: "Dz.U. 2012 poz. 739"
    section: "§ 37"
    description: "Wymagania dla pomieszczeń bloku operacyjnego"
version: "1.0.0"
tags: ["qualitative", "healthcare", "infection_control", "surgical"]
```

```json [JSON]
{
  "id": "REQ-OR-CLEAN-DIRTY-SEPARATION-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Separacja ciągów czystych i brudnych w bloku operacyjnym",
  "requirementType": "qualitative",
  "qualitativeDescription": "Blok operacyjny musi zapewniać pełną separację ciągów czystych i brudnych zgodnie z wymaganiami sanitarno-epidemiologicznymi",
  "acceptanceCriteria": [
    "Materiały sterylne dostarczane wyłącznie ciągiem czystym",
    "Odpady i brudna bielizna usuwane wyłącznie ciągiem brudnym",
    "Personel wchodzi do sali przez śluzę z przebieralnią",
    "Pacjent transportowany dedykowanym ciągiem pacjenckim",
    "Brak krzyżowania się ciągów czystych i brudnych"
  ],
  "evidenceRequired": [
    "Zatwierdzony rysunek technologiczny bloku operacyjnego",
    "Opinia sanitarno-epidemiologiczna WSSE",
    "Protokół odbioru technicznego",
    "Schemat przepływów (clean/dirty flow diagram)"
  ],
  "scope": {
    "entityType": "space",
    "spaceTypes": ["operating_room", "sterilization", "clean_room"]
  },
  "legalBasis": [
    {
      "regulation": "Dz.U. 2012 poz. 739",
      "section": "§ 37",
      "description": "Wymagania dla pomieszczeń bloku operacyjnego"
    }
  ],
  "version": "1.0.0",
  "tags": ["qualitative", "healthcare", "infection_control", "surgical"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "qualitativeDescription": {
      "type": "string"
    },
    "acceptanceCriteria": {
      "type": "array"
    },
    "evidenceRequired": {
      "type": "array"
    },
    "scope": {
      "type": "object"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

**Kiedy używać wzorca jakościowego:**
- Wymagania organizacyjne (separacja ciągów, procedury)
- Wymagania dotyczące wyposażenia (obecność elementów bez wartości liczbowej)
- Wymagania procedualne (szkolenia, certyfikacje personelu)
- Wymagania estetyczne lub funkcjonalne trudne do zmierzenia

---

## Przykład: Wymaganie Specyficzne dla Polski

**Plik:** `scripts/requirements/pl/req-pl-wt-room-height-001.json`

::: code-group

```yaml [Markdown]
---
id: "REQ-PL-WT-ROOM-HEIGHT-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalna wysokość pomieszczenia wg WT 2021"
requirementType: "dimensional"
countryScope: "poland_specific"
scope:
  entityType: "space"
  spaceTypes: ["sleeping_space", "bedroom", "living_space", "living_room", "kitchen"]
metric: "room_height_clear"
operator: ">="
value: 2.50
unit: "m"
verification:
  method: "measurement"
  tool: "Laser distance meter"
  standard: "WT_2021"
  phase: ["design_development", "as_built"]
  responsible: "architect"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 132"
    article: "ust. 1"
    description: "Wysokość pomieszczeń mieszkalnych"
    fullText: "Wysokość pomieszczeń w budynkach mieszkalnych, mierzona od podłogi do najniższego elementu stropu lub konstrukcji dachu, nie może być mniejsza niż 2,50 m"
    effectiveDate: "2021-09-20"
  - regulation: "Prawo_budowlane"
    section: "Art. 7"
    article: "ust. 1 pkt 1"
    description: "Wymagania podstawowe dotyczące obiektów budowlanych"
technicalBasis:
  - standard: "EN_16798-1"
    section: "6.4"
    description: "Wysokość pomieszczenia dla odpowiedniej jakości powietrza i komfortu cieplnego"
description: "Pomieszczenia mieszkalne (sypialnie, pokoje dzienne, kuchnie) muszą mieć wysokość w świetle ≥ 2,50 m wg WT 2021 § 132. Mierzona od podłogi do najniższego elementu sufitu lub konstrukcji dachu."
version: "1.0.0"
tags: ["dimensional", "poland", "wt_2021", "regulatory"]
---

# Wymaganie: Minimalna Wysokość Pomieszczenia wg WT 2021

Pomieszczenia mieszkalne muszą mieć wysokość >= 2,50 m wg WT 2021 § 132.
```

```yaml [YAML]
id: "REQ-PL-WT-ROOM-HEIGHT-001"
entityType: "requirement"
documentType: "requirement"
requirementName: "Minimalna wysokość pomieszczenia wg WT 2021"
requirementType: "dimensional"
countryScope: "poland_specific"
scope:
  entityType: "space"
  spaceTypes: ["sleeping_space", "bedroom", "living_space", "living_room", "kitchen"]
metric: "room_height_clear"
operator: ">="
value: 2.50
unit: "m"
verification:
  method: "measurement"
  tool: "Laser distance meter"
  standard: "WT_2021"
  phase: ["design_development", "as_built"]
  responsible: "architect"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 132"
    article: "ust. 1"
    description: "Wysokość pomieszczeń mieszkalnych"
    fullText: "Wysokość pomieszczeń w budynkach mieszkalnych, mierzona od podłogi do najniższego elementu stropu lub konstrukcji dachu, nie może być mniejsza niż 2,50 m"
    effectiveDate: "2021-09-20"
  - regulation: "Prawo_budowlane"
    section: "Art. 7"
    article: "ust. 1 pkt 1"
    description: "Wymagania podstawowe dotyczące obiektów budowlanych"
technicalBasis:
  - standard: "EN_16798-1"
    section: "6.4"
    description: "Wysokość pomieszczenia dla odpowiedniej jakości powietrza i komfortu cieplnego"
description: "Pomieszczenia mieszkalne (sypialnie, pokoje dzienne, kuchnie) muszą mieć wysokość w świetle ≥ 2,50 m wg WT 2021 § 132. Mierzona od podłogi do najniższego elementu sufitu lub konstrukcji dachu."
version: "1.0.0"
tags: ["dimensional", "poland", "wt_2021", "regulatory"]
```

```json [JSON]
{
  "id": "REQ-PL-WT-ROOM-HEIGHT-001",
  "entityType": "requirement",
  "documentType": "requirement",
  "requirementName": "Minimalna wysokość pomieszczenia wg WT 2021",
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
      "section": "§ 132",
      "article": "ust. 1",
      "description": "Wysokość pomieszczeń mieszkalnych",
      "fullText": "Wysokość pomieszczeń w budynkach mieszkalnych, mierzona od podłogi do najniższego elementu stropu lub konstrukcji dachu, nie może być mniejsza niż 2,50 m",
      "effectiveDate": "2021-09-20"
    },
    {
      "regulation": "Prawo_budowlane",
      "section": "Art. 7",
      "article": "ust. 1 pkt 1",
      "description": "Wymagania podstawowe dotyczące obiektów budowlanych"
    }
  ],
  "technicalBasis": [
    {
      "standard": "EN_16798-1",
      "section": "6.4",
      "description": "Wysokość pomieszczenia dla odpowiedniej jakości powietrza i komfortu cieplnego"
    }
  ],
  "description": "Pomieszczenia mieszkalne (sypialnie, pokoje dzienne, kuchnie) muszą mieć wysokość w świetle ≥ 2,50 m wg WT 2021 § 132. Mierzona od podłogi do najniższego elementu sufitu lub konstrukcji dachu.",
  "version": "1.0.0",
  "tags": ["dimensional", "poland", "wt_2021", "regulatory"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "metric": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    },
    "scope": {
      "type": "object"
    },
    "verificationMethod": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

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

::: code-group

```yaml [Markdown]
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-PROJECT-CUSTOM-001"
requirementName: "Wysokość pomieszczenia specyficzna dla projektu"
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

```yaml [YAML]
documentType: "requirement"
entityType: "requirement"
id: "REQ-PROJECT-CUSTOM-001"
requirementName: "Wysokość pomieszczenia specyficzna dla projektu"
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
```

```json [JSON]
{
  "documentType": "requirement",
  "entityType": "requirement",
  "id": "REQ-PROJECT-CUSTOM-001",
  "requirementName": "Wysokość pomieszczenia specyficzna dla projektu",
  "requirementType": "dimensional",
  "metric": "room_height_clear",
  "operator": ">=",
  "value": 3.00,
  "unit": "m",
  "scope": {
    "entityType": "space",
    "spaceTypes": ["office"]
  },
  "verification": {
    "method": "measurement",
    "phase": ["as_built"],
    "responsible": "contractor"
  },
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "requirementName", "requirementType", "version"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^REQ-"
    },
    "entityType": {
      "const": "requirement"
    },
    "requirementName": {
      "type": "string"
    },
    "requirementType": {
      "type": "string",
      "enum": ["performance", "dimensional", "regulatory", "design", "operational", "safety", "sustainability", "qualitative"]
    },
    "metric": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    },
    "scope": {
      "type": "object"
    },
    "version": {
      "type": "string"
    }
  }
}
```

:::

---

## Typowe Błędy

### ❌ Błąd 1: Mieszanie Typów Liczbowych i Jakościowych

**Problem**: Wymaganie ma ZARÓWNO `metric/operator/value` (liczbowe) JAK I `qualitativeDescription` (jakościowe).

**Rozwiązanie**: Wybierz JEDEN typ — albo liczbowy albo jakościowy, nigdy oba.

```yaml
# ❌ Złe: Oba typy
metric: "height"
operator: ">="
value: 2.5
qualitativeDescription: "Przestrzeń musi mieć adekwatną wysokość"  # Konflikt!

# ✅ Dobre: Tylko liczbowe
metric: "height"
operator: ">="
value: 2.5
unit: "m"

# LUB

# ✅ Dobre: Tylko jakościowe
qualitativeDescription: "Przepływy czyste i brudne nie mogą się krzyżować"
acceptanceCriteria:
  - "Osobne korytarze dla czystego i brudnego sprzętu"
```

---

### ❌ Błąd 2: Używanie Jakościowego Gdy Liczbowe Działałoby

**Problem**: `qualitativeDescription: "Wysokość przestrzeni musi być co najmniej 2,50 m"` (może być mierzalne).

**Rozwiązanie**: Jeśli możesz wyrazić jako [metryka] [operator] [wartość] → **używaj liczbowego**.

```yaml
# ❌ Złe: Jakościowe dla mierzalnego wymagania
qualitativeDescription: "Wysokość przestrzeni musi być co najmniej 2,50 m"

# ✅ Dobre: Liczbowe
metric: "height"
operator: ">="
value: 2.5
unit: "m"
```

**Kiedy używać jakościowego**: Wymagania, które **nie mogą** być wyrażone jako liczba (np. "przepływy czyste/brudne muszą być rozdzielone").

---

### ❌ Błąd 3: Brak Kontekstu Jurysdykcji

**Problem**: `requirementName: "Minimalna wysokość pomieszczenia >= 2,50 m"` (nie wiadomo skąd to wymaganie).

**Rozwiązanie**: Zawsze dołącz `jurisdictionCode` i `reference` do przepisu.

```yaml
# ❌ Złe: Brak kontekstu
requirementName: "Minimalna wysokość pomieszczenia >= 2,50 m"

# ✅ Dobre: Z jurysdykcją i referencją
requirementName: "Minimalna wysokość pomieszczenia >= 2,50 m (WT 2021 §132)"
jurisdictionCode: "PL"
reference:
  regulation: "WT 2021"
  section: "§132"
  article: "Pomieszczenia mieszkalne"
```

---

## Zobacz Także

- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie odwołują się do wymagań
- **[Karta Strefa](/pl/dokumentacja/encje/strefa)** - Strefy odwołują się do wymagań
- **[Przewodnik Kompilatora](/pl/dokumentacja/kompilator/)** - Logika ewaluacji wymagań
- **Raport Zgodności** - Wyniki sprawdzania zgodności
