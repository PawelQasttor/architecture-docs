# Typ Przestrzeni

**Typ Przestrzeni** to szablon wielokrotnego użytku definiujący wspólne specyfikacje dla podobnych przestrzeni. Instancje przestrzeni odwołują się do typu, aby dziedziczyć wymagania, wykończenia, wyposażenie i profile użytkowania.

::: tip Kiedy używać
Używaj Typów Przestrzeni gdy masz **wiele podobnych przestrzeni** (np. 20 identycznych sypialni, 50 biurek w open space). Zdefiniuj specyfikacje raz w typie, a następnie twórz lekkie instancje, które się do niego odnoszą.

**Korzyści:**
- ✅ Definiowanie wymagań, wykończeń, wyposażenia jeden raz
- ✅ Gwarantowana spójność we wszystkich instancjach
- ✅ Aktualizacja jednego pliku → wpływa na wszystkie instancje
- ✅ Redukcja dokumentacji o 26-33% dla powtarzających się elementów
:::

## Cel

Typy Przestrzeni definiują **specyfikacje szablonowe** stosowane do wszystkich instancji:
- Wymagania (światło dzienne, akustyka, komfort termiczny, przepisy)
- Wykończenia (podłoga, ściany, sufit, drzwi, okna)
- Wyposażenie (bezpieczeństwo, klimatyzacja, instalacje elektryczne)
- Profile użytkowania (typowe wzorce użytkowania)
- Wytyczne powierzchni i wysokości

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator typu | `"ST-BEDROOM-STANDARD-A"` |
| `entityType` | string | Musi być `"space_type"` | `"space_type"` |
| `documentType` | string | Musi być `"space_type"` | `"space_type"` |
| `typeName` | string | Nazwa typu czytelna dla człowieka | `"Sypialnia Standard - Typ A"` |
| `spaceType` | string | Kategoria funkcjonalna | `"sleeping_space"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Pola Szablonowe

Pola definiujące **specyfikacje szablonowe** dziedziczone przez wszystkie instancje:

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis typu i cel |
| `requirements` | array | ID wymagań stosowanych do WSZYSTKICH instancji |
| `finishes` | object | Standardowe wykończenia (podłoga, ściany, sufit, drzwi, okno) |
| `equipment` | array | Standardowa lista wyposażenia ze specyfikacjami |
| `accessibilityLevel` | string | Domyślna dostępność: `standard` / `mobility` / `visual` / `hearing` / `full` |
| `occupancyProfile` | object | Typowe użytkowanie (maxOccupants, bedCount, usagePattern, hours) |
| `environmentalConditions` | object | Szablon warunk&oacute;w środowiskowych (temperatura, wilgotność, wentylacja) |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `typicalArea` | object | Wytyczne powierzchni (min, max, typowa w m²) |
| `typicalHeight` | object | Wytyczne wysokości (min, typowa w m) |
| `tags` | array | Tagi klasyfikacyjne |

## Struktura Obiektu Finishes

```yaml
finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Dąb inżynieryjny"
    thickness: "14mm"
  walls:
    material: "MAT-WALL-PAINT-WHITE"
    description: "Malowane płyty gipsowo-kartonowe"
  ceiling:
    material: "MAT-CEILING-PAINT-WHITE"
  door:
    specification: "DOOR-INT-AC-01"
    size: "830×2050mm"
    soundReduction: "Rw = 38 dB"
  window:
    specification: "WINDOW-TYPE-A"
    size: "1200×1400mm"
    uValue: "0.9 W/(m²·K)"
```

## Struktura Tablicy Equipment

```yaml
equipment:
  - category: "safety"
    description: "Optyczny czujnik dymu (montaż sufitowy)"
    quantity: 1
  - category: "climate"
    description: "Termostat pokojowy ogrzewania podłogowego"
    quantity: 1
  - category: "ventilation"
    description: "Nawiewnik MVHR"
    quantity: 1
  - category: "electrical"
    description: "Gniazdo podwójne (przy łóżku)"
    quantity: 2
```

## Struktura Occupancy Profile

```yaml
occupancyProfile:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7
```

## Przykład: Definicja Typu Przestrzeni

```markdown
---
documentType: "space_type"
id: "ST-BEDROOM-STANDARD-A"
typeName: "Sypialnia Standard - Typ A"
spaceType: "sleeping_space"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"

finishes:
  floor:
    material: "MAT-FLOOR-OAK-01"
    description: "Dąb inżynieryjny"
  walls:
    material: "MAT-WALL-PAINT-WHITE"
  door:
    specification: "DOOR-INT-AC-01"

equipment:
  - category: "safety"
    description: "Czujnik dymu"
    quantity: 1

accessibilityLevel: "standard"

occupancyProfile:
  maxOccupants: 2
  bedCount: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8

typicalArea:
  min: 10.0
  max: 18.0
  typical: 14.0
  unit: "m2"

version: "1.0.0"
---
```

## Skompilowane Wyjście

```json
{
  "space_types": [{
    "id": "ST-BEDROOM-STANDARD-A",
    "requirements": [/* wymagania */],
    "finishes": {/* wykończenia */}
  }],
  "spaces": [{
    "id": "SP-BLD-01-L01-001",
    "spaceName": "Sypialnia 01",
    "spaceTypeId": "ST-BEDROOM-STANDARD-A",
    "designArea": 14.5
  }]
}
```

## Zachowanie Kompilatora

Kompilator **rozwiązuje odniesienia do typów** i scala specyfikacje:

1. **Wczytuje definicję typu** z `spaceTypeId`
2. **Scala specyfikacje typu** do instancji:
   - Wymagania: `type.requirements` + `instance.requirementOverrides`
   - Wykończenia: `type.finishes` + `instance.finishOverrides`
   - Wyposażenie: `type.equipment`
3. **Waliduje instancję** względem ograniczeń typu
4. **Wyprowadza kompletną przestrzeń** ze wszystkimi scalonymi właściwościami

## Mechanizmy Nadpisywania

Instancje mogą nadpisywać specyfikacje typu:

```yaml
---
spaceName: "Sypialnia 02 (Dostępna)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"

finishOverrides:
  floor:
    material: "MAT-FLOOR-TILE-01"
    description: "Płytki ceramiczne (dostęp wózkiem)"

requirementOverrides:
  - "REQ-ACCESSIBILITY-WHEELCHAIR-001"
---
```

## Katalog Typów Przestrzeni - Przykłady

| ID Typu | Nazwa | Cel | Typowa Powierzchnia |
|---------|-------|-----|---------------------|
| `ST-BEDROOM-STANDARD-A` | Sypialnia Standard A | Sypialnie mieszkalne | 10-18 m² |
| `ST-CORRIDOR-RESIDENTIAL` | Korytarz Mieszkalny | Korytarze apartamentowe | 10-40 m² |
| `ST-BATHROOM-STANDARD` | Łazienka Standard | Łazienki mieszkalne | 4-8 m² |
| `ST-OFFICE-SINGLE` | Biuro Pojedyncze | Biura indywidualne | 9-15 m² |
| `ST-MEETING-ROOM-SMALL` | Mała Sala Konferencyjna | Spotkania 4-6 osób | 12-18 m² |

## Strategia Wersjonowania

| Typ Zmiany | Zmiana Wersji | Przykład |
|------------|---------------|----------|
| Dodanie wyposażenia | Patch (1.0.0 → 1.0.1) | Dodanie lampki do czytania |
| Zmiana wykończenia | Minor (1.0.1 → 1.1.0) | Zmiana drzwi na Rw 40 dB |
| Zmiana wymagań | Minor (1.1.0 → 1.2.0) | Dodanie nowego wymagania |
| Przeprojektowanie | Major (1.2.0 → 2.0.0) | Całkowite przebudowanie typu |

## Warunki Środowiskowe i Bezpieczeństwo Elektryczne

Typy Przestrzeni mogą definiować szablonowe warunki środowiskowe i klasyfikację bezpieczeństwa elektrycznego dziedziczone przez wszystkie instancje:

```yaml
# Przykład opieki zdrowotnej: Typ oddziału OIOM
---
id: "ST-ICU-WARD-STANDARD"
typeName: "Oddział OIOM - Standard"
spaceType: "healthcare"
accessibilityLevel: "full"
electricalSafetyGroup: "group_2"  # Sprzęt krytyczny dla życia

environmentalConditions:
  temperatureRange: { min: 20, max: 24, unit: "C" }
  humidityRange: { min: 30, max: 60 }
  ventilationRate: { value: 6, unit: "ACH" }
  pressurization: "positive"

occupancyProfile:
  maxOccupants: 2
  bedCount: 1
---
```

Instancje dziedziczą te wartości i mogą je nadpisywać (np. izolatka z podciśnieniem).

## Zobacz Również

- **[Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Instancje przestrzeni odwołujące się do typów
- **[Typ Strefy](/pl/dokumentacja/encje/typ-strefy)** - Szablony stref
- **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** - Szablony systemów
- **[Typ Zasobu](/pl/dokumentacja/encje/typ-zasobu)** - Szablony produktów/urządzeń
- **Schema:** `sbm-schema-v0.2.json` - Definicja Typu Przestrzeni
