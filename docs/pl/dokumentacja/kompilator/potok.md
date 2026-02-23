# Potok kompilacji

Kompilator SBM v0.2.0 przetwarza encje budynku przez 5-etapowy potok. Ten dokument szczegółowo opisuje każdy etap.

## Przegląd potoku

```
Pliki Markdown → Parsowanie → Normalizacja → Walidacja → Jakość → Kompilacja → 6 wyników
   (Wejście)        ↓             ↓             ↓           ↓         ↓        (Cele)
                  Etap 1        Etap 2        Etap 3     Etap 3.5   Etap 4
```

## Etap 1: Parsowanie

**Cel:** Wczytanie i wyodrębnienie danych encji z plików Markdown

**Wejście:**
- Katalog zawierający pliki `.md` z nagłówkiem YAML

**Proces:**
1. Rekurencyjne skanowanie katalogu wejściowego w poszukiwaniu plików `.md`
2. Odczyt każdego pliku i wyodrębnienie nagłówka YAML
3. Filtrowanie według prawidłowego `documentType` (11 typów encji + 4 szablony typów + starsze)
4. Śledzenie ścieżek plików na potrzeby raportowania błędów

**Rozpoznawane typy encji:**
- Instancje: `space`, `zone`, `system`, `asset_instance`, `requirement`, `building`, `level`
- Szablony typów: `space_type`, `zone_type`, `system_type`, `asset_type`
- Starsze: `element_specification`, `project_specification`

**Implementacja:** `scripts/compiler/stages/parse.mjs`

### Przykładowy przebieg parsowania

**Plik wejściowy:** `bedroom-01.md`
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
levelId: "LVL-01"
buildingId: "BLD-01"
designArea: 14.5
version: "2.0.0"
---
```

**Sparsowane wyjście:**
```javascript
{
  documentType: "space",
  entityType: "space",
  id: "SP-BLD-01-L01-001",
  spaceName: "Bedroom 01",
  spaceTypeId: "ST-BEDROOM-STANDARD-A",
  levelId: "LVL-01",
  designArea: 14.5,
  // ... inne pola z nagłówka
}
```

---

## Etap 2: Normalizacja, wzbogacanie i rozwiązywanie dziedziczenia

**Cel:** Grupowanie encji, rozwiązywanie łańcuchów dziedziczenia, obliczanie relacji, wczytywanie pakietu jurysdykcji

**Wejście:** Surowa kolekcja encji z Etapu 1

**Proces:**

### 2.1 Grupowanie encji według typu

Encje są grupowane w 11 tablic: `buildings`, `levels`, `spaces`, `zones`, `systems`, `asset_instances`, `requirements`, `space_types`, `zone_types`, `system_types`, `asset_types`.

### 2.2 Rozwiązywanie dziedziczenia Typ → Instancja

Dla każdej instancji z `typeId` kopiowane są pola szablonu z encji typu, jeśli nie zostały jawnie ustawione na instancji.

**Typ Przestrzeni → Przestrzeń:**
- Dziedziczone pola: `designArea`, `designHeight`, `spaceType`, `electricalSafetyGroup`, `accessibilityLevel`
- Dziedziczone obiekty: `finishes`, `environmentalConditions`, `occupancy`
- Wymagania: **scalane** (wymagania typu dodawane do wymagań instancji)

**Typ Strefy → Strefa:** `zoneCategory`, `regulatoryBasis`

**Typ Systemu → System:** `systemCategory`, `designLifeYears`

**Typ Zasobu → Instancja Zasobu:** `manufacturer`, `modelNumber`, `expectedLifeYears`

Dziedziczone pola otrzymują `_meta` z `resolution: "type_default"`:
```json
{
  "designHeight": 2.70,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "type_default",
    "inheritedFrom": "ST-BEDROOM-STANDARD-A",
    "inheritedField": "designHeight"
  }
}
```

### 2.3 Rozwiązywanie dziedziczenia Kondygnacja → Przestrzeń

Dla każdej przestrzeni z `levelId` dziedziczone są typowe właściwości kondygnacji:

| Pole kondygnacji | Pole przestrzeni | Zachowanie |
|------------------|-----------------|------------|
| `typicalCeilingHeight` | `designHeight` | Kopiowane, jeśli nie ustawione przez typ lub jawnie |
| `typicalFinishes` | `finishes` | Kopiowane, jeśli nie ustawione |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Kopiowane, jeśli nie ustawione |
| `levelRequirements` | `requirements` | **Scalane** (dodawane, nie zastępowane) |

**Kolejność rozwiązywania:** (1) Jawna wartość, (2) Szablon typu, (3) Dziedziczenie z kondygnacji, (4) Brak wartości domyślnej.

Dziedziczone pola otrzymują `_meta` z `resolution: "inherited"`:
```json
{
  "designHeight": 2.70,
  "designHeight_meta": {
    "confidence": "specified",
    "resolution": "inherited",
    "inheritedFrom": "LVL-01",
    "inheritedField": "typicalCeilingHeight"
  }
}
```

Gdy wymagania są scalane z wielu źródeł, `_meta` śledzi łańcuch scalania:
```json
{
  "requirements_meta": {
    "confidence": "specified",
    "resolution": "merged",
    "mergedFrom": [
      { "source": "SP-BLD-01-L01-001", "type": "explicit" },
      { "source": "ST-BEDROOM-STANDARD-A", "type": "type_default", "added": ["REQ-1"] },
      { "source": "LVL-01", "type": "inherited", "added": ["REQ-2", "REQ-3"] }
    ]
  }
}
```

### 2.4 Obliczanie odwrotnych relacji
- `space.zoneIds` → `zone.spaceIds`
- `asset.systemId` → `system.assetInstanceIds`

### 2.5 Wczytywanie pakietu jurysdykcji
- Zawsze wczytuj `scripts/requirements/global/`
- Wczytaj `scripts/requirements/{kraj}/` jeśli kraj jest określony
- Scalanie z wymaganiami z plików Markdown (wersja Markdown wygrywa w przypadku konfliktu ID)

### 2.6 Wyodrębnianie metadanych projektu
- Odczyt z encji `project_specification` lub konstrukcja z opcji CLI
- Zawiera: identyfikator projektu, nazwę, kraj, fazę, język, jednostki

**Implementacja:** `scripts/compiler/stages/normalize.mjs`

---

## Etap 3: Walidacja

**Cel:** Zapewnienie integralności danych, proweniencji i jakości odpowiedniej do fazy

**Wejście:** Znormalizowany graf encji z Etapu 2

**Proces:**

### 3.1 Walidacja schematu JSON
- Walidacja względem `schemas/sbm-schema-v0.2.json`
- Używa AJV z walidacją formatów
- Sprawdzanie wymaganych pól, typów danych, wartości enum, wzorców ID

### 3.2 Integralność referencyjna
- Wszystkie referencje ID muszą istnieć
- Sprawdzenia: `spaceTypeId`, `levelId`, `buildingId`, `zoneIds`, `systemTypeId`, `zoneTypeId`, `assetTypeId`
- Brakujące zasoby referencjonowane przez systemy generują ostrzeżenia (mogą nie być jeszcze zdefiniowane)

### 3.3 Reguły biznesowe
- Każda przestrzeń powinna mieć co najmniej jedno przypisanie strefy
- Każda przestrzeń powinna mieć co najmniej jedno wymaganie

### 3.4 Proweniencja danych <Badge type="tip" text="v0.2.0" />

**Reguła 1: Źródło wymagane dla wysokiego poziomu pewności**
Jeśli `_meta.confidence` to `measured`, `calculated` lub `specified`, a `_meta.source` jest brakujące (i pole nie jest dziedziczone), emitowane jest ostrzeżenie.

**Reguła 2: Null bez wyjaśnienia**
Jeśli pole ma wartość null bez adnotacji `_meta`, emitowane jest ostrzeżenie. Pola powinny mieć wartość lub posiadać `_meta` z `confidence: "unknown"` wyjaśniającym przyczynę.

### 3.5 Wymuszanie bramek fazowych <Badge type="tip" text="v0.2.0" />

| Faza | Reguła | Ważność |
|------|--------|---------|
| 1-3 | Akceptowane wszystkie poziomy pewności | - |
| 4 | Pola `assumed` oznaczane | Ostrzeżenie |
| 5-6 | Pola `assumed` blokowane | **Błąd** |
| 7-8 | `estimated` na polach bezpieczeństwa blokowane | **Błąd** |

Pola krytyczne dla bezpieczeństwa: `electricalSafetyGroup`, `radiologicalShielding`, `fireRating`, `structuralLoad`.

**Implementacja:** `scripts/compiler/stages/validate.mjs`

---

## Etap 3.5: Podsumowania jakości <Badge type="tip" text="v0.2.0" />

**Cel:** Obliczanie bloków jakości per encja i podsumowania jakości całego projektu

**Wejście:** Zwalidowany graf encji z Etapu 3

**Proces:**

Dla każdej encji:
1. Zliczanie wszystkich pól z adnotacjami `_meta`
2. Grupowanie według poziomu pewności (`measured`, `calculated`, `specified`, `estimated`, `assumed`, `unknown`)
3. Obliczanie kompletności (pola z wartością / łączna liczba pól)
4. Wyznaczanie najniższego poziomu pewności
5. Identyfikacja pól krytycznych dla bezpieczeństwa i ich pewności
6. Generowanie ostrzeżeń

**Blok `_quality` per encja:**
```json
{
  "_quality": {
    "totalFields": 26,
    "fieldsByConfidence": {
      "measured": 0, "calculated": 0, "specified": 4,
      "estimated": 0, "assumed": 0, "unknown": 0
    },
    "completeness": 1.0,
    "lowestConfidence": "specified",
    "safetyCritical": [
      {
        "field": "environmentalConditions.pressurization",
        "value": "neutral",
        "confidence": "specified"
      }
    ]
  }
}
```

**Podsumowanie jakości całego projektu:**
```json
{
  "totalEntities": 21,
  "averageCompleteness": 1.0,
  "fieldsByConfidence": { "specified": 84, ... },
  "safetyCriticalFields": {
    "total": 3, "verified": 3, "unverified": 0
  }
}
```

**Implementacja:** `scripts/compiler/stages/quality.mjs`

---

## Etap 4: Kompilacja celów

**Cel:** Generowanie praktycznych wyników dla BIM, zgodności, FM, cyfrowego bliźniaka i zapewnienia jakości

**Wejście:** Zwalidowany graf encji z blokami `_quality` z Etapu 3.5

### 4.1 Cel mapowania BIM
**Generator:** `scripts/compiler/targets/bim-mapping.mjs`
**Wyjście:** `bim_mapping.json`

### 4.2 Cel raportu zgodności
**Generator:** `scripts/compiler/targets/compliance-report.mjs`
**Wyjście:** `compliance_report.json`

### 4.3 Cel rejestru zasobów
**Generator:** `scripts/compiler/targets/asset-register.mjs`
**Wyjście:** `asset_register.json`

### 4.4 Cel schematu cyfrowego bliźniaka
**Generator:** `scripts/compiler/targets/twin-schema.mjs`
**Wyjście:** `twin_schema.json`

### 4.5 Cel raportu jakości <Badge type="tip" text="v0.2.0" />

**Generator:** `scripts/compiler/targets/quality-report.mjs`
**Wyjście:** `quality_report.json`

**Sekcje:**
- **Gotowość fazowa** - Blokady i ostrzeżenia przed przejściem do następnej fazy
- **Audyt bezpieczeństwa** - Każde pole krytyczne dla bezpieczeństwa z poziomem pewności i źródłem
- **Luki proweniencji** - Pola bez `_meta` lub bez referencji źródłowych
- **Karty encji** - Podział jakości per encja (sortowany od najgorszych)
- **Rekomendacje** - Priorytetyzowana lista poprawek (krytyczne → wysokie → średnie)

```json
{
  "phaseReadiness": {
    "currentPhase": 3,
    "nextPhase": 4,
    "ready": true,
    "blockers": [],
    "warnings": [
      {
        "rule": "Pola assumed generują ostrzeżenia od Fazy 4",
        "count": 5,
        "action": "Zaplanuj weryfikację dla 5 pól assumed"
      }
    ]
  },
  "safetyAudit": {
    "totalFields": 3,
    "verified": 3,
    "unverified": 0
  },
  "recommendations": [
    {
      "priority": "high",
      "category": "provenance",
      "message": "269 pól ma wartości, ale brak śledzenia proweniencji",
      "action": "Dodaj adnotacje _meta z poziomem pewności i referencją źródłową"
    }
  ]
}
```

---

## Wydajność potoku

Pomierzone na przykładzie Green Terrace (16 encji: 3 przestrzenie, 3 strefy, 1 system, 3 typy stref, 1 typ systemu, 1 typ zasobu, 1 instancja zasobu, 1 kondygnacja, 7 wymagań jurysdykcyjnych):

| Etap | Opis |
|------|------|
| Parsowanie | ~15ms |
| Normalizacja + Dziedziczenie | ~25ms |
| Walidacja + Proweniencja + Bramki fazowe | ~30ms |
| Podsumowania jakości | ~5ms |
| Kompilacja 5 celów | ~55ms |
| **Łącznie** | **~130ms** |

## Zobacz także

- **[Przegląd kompilatora](/pl/dokumentacja/kompilator/)** - Architektura wysokiego poziomu
- **[Pierwsze kroki](/pl/dokumentacja/kompilator/pierwsze-kroki)** - Pierwsza kompilacja
- **[Przewodnik proweniencji danych](/pl/przewodniki/proweniencja-danych)** - Jak śledzić źródła danych za pomocą `_meta`
- **[Typy encji](/pl/dokumentacja/encje/)** - Encje, które mogą być kompilowane
