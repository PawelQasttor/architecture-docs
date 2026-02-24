# Typ Strefy

**Typ Strefy** to szablon wielokrotnego użytku definiujący wspólne specyfikacje dla podobnych stref. Instancje stref odwołują się do typu, aby dziedziczyć wymagania, właściwości i granice.

::: tip Kiedy używać
Używaj Typów Stref gdy masz **wiele podobnych stref** (np. identyczne strefy pożarowe na każdym piętrze, strefy HVAC w wielu budynkach). Zdefiniuj specyfikacje raz w typie, a następnie twórz lekkie instancje, które się do niego odnoszą.

**Korzyści:**
- ✅ Definiowanie wymagań, właściwości, granic jeden raz
- ✅ Gwarantowana spójność we wszystkich strefach
- ✅ Aktualizacja jednego pliku → wpływa na wszystkie instancje
- ✅ Uproszczone zarządzanie strefami na piętrach/budynkach
:::

## Cel

Typy Stref definiują **specyfikacje szablonowe** stosowane do wszystkich instancji stref:
- Wymagania (bezpieczeństwo pożarowe, akustyka, wydajność HVAC, bezpieczeństwo)
- Właściwości (parametry specyficzne dla strefy i progi)
- Granice i ograniczenia przestrzenne
- Kryteria wydajności

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator typu | `"ZT-FIRE-ZL-IV"` |
| `entityType` | string | Musi być `"zone_type"` | `"zone_type"` |
| `documentType` | string | Musi być `"zone_type"` | `"zone_type"` |
| `typeName` | string | Nazwa typu czytelna dla człowieka | `"Strefa Pożarowa ZL-IV Standard"` |
| `zoneType` | string | Kategoria strefy (patrz wyliczenie) | `"fire"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

### Wyliczenie Typu Strefy

Pole `zoneType` musi mieć jedną z następujących wartości:

| Wartość | Cel | Typowe Właściwości |
|---------|-----|-------------------|
| `fire` | Strefy bezpieczeństwa pożarowego | Odporność ogniowa, odległość ewakuacji, kompartmentacja |
| `acoustic` | Strefy kontroli akustycznej | Wymagania izolacji dźwiękowej, limity hałasu tła |
| `hvac` | Strefy kontroli klimatu | Nastawy temperatury, współczynniki wentylacji, wilgotność |
| `security` | Strefy bezpieczeństwa | Poziomy kontroli dostępu, wymagania monitoringu |
| `lighting` | Strefy oświetlenia | Poziomy natężenia, integracja światła dziennego, sterowanie |
| `thermal` | Strefy termiczne | Wymagania izolacji, masa termiczna, kontrola zysków słonecznych |
| `access_control` | Strefy ograniczonego dostępu | Poziomy bezpieczeństwa, metody uwierzytelniania, rejestrowanie |
| `medical_electrical` | **[v0.3.0]** Strefy bezpieczeństwa elektrycznego medycznego | Grupa bezpieczeństwa IEC 60364-7-710, typ IT/TN |
| `radiation_protection` | **[v0.3.0]** Strefy ochrony radiologicznej | Materiał ekranujący, grubość Pb, kierunki chronione |
| `cleanroom` | **[v0.3.0]** Strefy pomieszczeń czystych | Klasa ISO 14644, klasa filtracji, wymiana powietrza |
| `infection_control` | **[v0.3.0]** Strefy kontroli zakażeń | Reżim izolacji, typ wentylacji, procedury dekontaminacji |
| `pressure_cascade` | **[v0.3.0]** Strefy kaskady ciśnieniowej | Różnica ciśnień Pa, kierunek przepływu, klasa filtracji |

## Pola Szablonowe

Pola definiujące **specyfikacje szablonowe** dziedziczone przez wszystkie instancje stref:

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis typu i cel |
| `requirements` | array | ID wymagań stosowanych do WSZYSTKICH instancji stref |
| `properties` | object | Właściwości specyficzne dla strefy (różne w zależności od zoneType) |
| `tags` | array | Tagi klasyfikacyjne |

## Struktura Obiektu Properties

Obiekt `properties` różni się w zależności od typu strefy:

### Właściwości Strefy Pożarowej

```yaml
properties:
  fireResistance: "REI 60"          # Klasa odporności ogniowej
  maxEscapeDistance: 10.0           # Maksymalna odległość ewakuacji (m)
  compartmentationRequired: true    # Wymagana kompartmentacja?
  smokeControlStrategy: "natural"   # naturalna, mechaniczna, nadciśnieniowa
  evacuationStrategy: "single_stage" # single_stage, fazowa
  fireDetectionType: "smoke"        # dymowa, cieplna, płomieniowa
```

### Właściwości Strefy Akustycznej

```yaml
properties:
  acousticClass: "A"                # Klasyfikacja akustyczna
  soundInsulationRequirement: "Rw ≥ 52 dB"  # Izolacja dźwięku powietrznego
  impactSoundRequirement: "Ln,w ≤ 53 dB"    # Izolacja dźwięku uderzeniowego
  backgroundNoiseLimit: "NR 25"     # Wskaźnik hałasu tła
  reverbTimeTarget: "0.5s"          # Czas pogłosu (s)
```

### Właściwości Strefy HVAC

```yaml
properties:
  heatingSetpoint: 21.0             # Nastawa grzania (°C)
  coolingSetpoint: 24.0             # Nastawa chłodzenia (°C)
  ventilationRate: "0.5 ACH"        # Wymiana powietrza na godzinę
  humidityRange: "40-60%"           # Zakres wilgotności względnej
  controlStrategy: "VAV"            # VAV, CAV, VRF, itp.
  occupancyControl: true            # Sterowanie oparte na obecności?
```

## Przykład: Definicja Typu Strefy

**Plik:** `templates/zone-types/fire-zone-zl-iv.md`

```markdown
---
documentType: "zone_type"
entityType: "zone_type"
id: "ZT-FIRE-ZL-IV"
typeName: "Strefa Pożarowa ZL-IV Standard"
zoneType: "fire"
description: "Standardowa strefa bezpieczeństwa pożarowego dla budynków mieszkalnych zgodnie z polskimi przepisami (kategoria ZL-IV)"

# WYMAGANIA (stosowane do WSZYSTKICH instancji)
requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-COMPARTMENTATION-001"
  - "REQ-FIRE-DETECTION-001"

# WŁAŚCIWOŚCI STREFY POŻAROWEJ
properties:
  fireResistance: "REI 60"
  maxEscapeDistance: 10.0
  compartmentationRequired: true
  smokeControlStrategy: "natural"
  evacuationStrategy: "single_stage"
  fireDetectionType: "smoke"

version: "1.0.0"
tags:
  - "bezpieczenstwo-pozarowe"
  - "mieszkaniowe"
  - "polski-kod"
---

# Typ Strefy: Strefa Pożarowa ZL-IV Standard

## Opis

Standardowa strefa bezpieczeństwa pożarowego dla budynków mieszkalnych zgodnie z polskimi przepisami budowlanymi. Kategoria ZL-IV (Kategoria Zagrożenia Ludzi) dotyczy budynków mieszkalnych z mieszkańcami zdolnymi do samodzielnej ewakuacji.

## Intencja Projektowa

Ten typ strefy zapewnia:
- Maksymalną odległość ewakuacji 10 metrów do chronionego korytarza lub klatki schodowej
- Odporność ogniową REI 60 dla elementów kompartmentacji
- Automatyczną detekcję dymu we wszystkich pomieszczeniach mieszkalnych
- Naturalną kontrolę dymu (okna otwierane w drogach ewakuacyjnych)
- Strategię chronionej ewakuacji

## Zgodność z Przepisami

**Polskie Przepisy:**
- **WT 2021 § 234:** Wymagania dotyczące separacji stref pożarowych
- **WT 2021 § 271:** Drogi ewakuacyjne
- **Prawo Budowlane Art. 5:** Bezpieczeństwo pożarowe budynków

## Wytyczne Użycia

### Kiedy Używać Tego Typu
- ✅ Budynki mieszkalne (apartamenty, domy)
- ✅ Budynki do 25m wysokości
- ✅ Mieszkańcy zdolni do samodzielnej ewakuacji
- ✅ Wymagana zgodność z polskim prawem budowlanym

### Kiedy NIE Używać
- ❌ Budynki wysokie (>25m) - użyj ZL-III
- ❌ Domy opieki, szpitale - użyj ZL-II lub ZL-I
- ❌ Budynki komercyjne, biurowe - inne kategorie stref pożarowych
- ❌ Budynki przemysłowe - odrębne przepisy bezpieczeństwa pożarowego
```

## Konwencja Nazewnictwa ID

| Wzorzec | Przykład | Opis |
|---------|----------|------|
| `ZT-{TYP}-{DESKRYPTOR}` | `ZT-FIRE-ZL-IV` | Typ strefy + kod/standard |
| `ZT-{TYP}-{POZIOM}` | `ZT-SECURITY-HIGH` | Typ strefy + poziom bezpieczeństwa |
| `ZT-{TYP}-{WARIANT}` | `ZT-HVAC-RESIDENTIAL-A` | Typ strefy + typ budynku + wariant |

## Skompilowane Wyjście

Gdy skompilowane, Typy Stref są przechowywane oddzielnie od instancji stref:

```json
{
  "entities": {
    "zone_types": [
      {
        "id": "ZT-FIRE-ZL-IV",
        "entityType": "zone_type",
        "typeName": "Strefa Pożarowa ZL-IV Standard",
        "zoneType": "fire",
        "requirements": ["REQ-PL-FIRE-SEPARATION-001"],
        "properties": {
          "fireResistance": "REI 60",
          "maxEscapeDistance": 10.0
        }
      }
    ],
    "zones": [
      {
        "id": "ZONE-FIRE-NORTH-L01",
        "zoneName": "Strefa Pożarowa Północne Skrzydło Poziom 01",
        "zoneTypeId": "ZT-FIRE-ZL-IV",
        "levelIds": ["LVL-01"]
        // Kompilator scala specyfikacje typu tutaj
      }
    ]
  }
}
```

## Zachowanie Kompilatora

Kompilator **rozwiązuje odniesienia do typów** i scala specyfikacje:

1. **Wczytuje definicję typu** z `zoneTypeId`
2. **Scala specyfikacje typu** do instancji strefy:
   - Wymagania: `type.requirements` + `instance.requirementOverrides`
   - Właściwości: `type.properties` + `instance.propertyOverrides`
3. **Waliduje instancję strefy** względem ograniczeń typu
4. **Wyprowadza kompletną strefę** ze wszystkimi scalonymi właściwościami

## Reguły Walidacji

| Reguła | Sprawdzenie | Ważność |
|--------|-------------|---------|
| Istnienie typu | `zoneTypeId` musi odwoływać się do prawidłowego zone_type | Błąd |
| Zgodność typu strefy | `zoneType` instancji powinien być zgodny z `zoneType` typu | Ostrzeżenie |
| Kompatybilność wersji | Wersje instancji i typu powinny być wyrównane | Info |
| Brak konfliktów | Nadpisania instancji nie mogą kolidować z ograniczeniami typu | Błąd |

## Mechanizmy Nadpisywania

Instancje stref mogą nadpisywać specyfikacje typu gdy jest to potrzebne:

```yaml
---
zoneName: "Strefa Pożarowa Klatka Schodowa A"
zoneTypeId: "ZT-FIRE-ZL-IV"

# Dodatkowe wymaganie poza typem
requirementOverrides:
  - "REQ-FIRE-STAIR-PRESSURIZATION-001"

# Bardziej restrykcyjna właściwość
propertyOverrides:
  smokeControlStrategy: "pressurization"  # Nadpisanie z "natural" na "pressurization"
  maxEscapeDistance: 8.0                   # Bardziej restrykcyjne niż 10.0m typu
---
```

## Strategia Wersjonowania

| Typ Zmiany | Zmiana Wersji | Przykład |
|------------|---------------|----------|
| Doprecyzowanie właściwości | Patch (1.0.0 → 1.0.1) | Dodanie właściwości oświetlenia awaryjnego |
| Zmiana właściwości | Minor (1.0.1 → 1.1.0) | Zmiana maksymalnej odległości ewakuacji |
| Dodanie wymagania | Minor (1.1.0 → 1.2.0) | Dodanie nowego wymagania bezpieczeństwa pożarowego |
| Przeprojektowanie | Major (1.2.0 → 2.0.0) | Całkowite przebudowanie typu strefy |

## Zobacz Również

- **[Strefa](/pl/dokumentacja/encje/strefa)** - Instancje stref odwołujące się do typów
- **[Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** - Szablony przestrzeni (podobny wzorzec)
- **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** - Szablony systemów
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Wymagania odwoływane przez strefy
- **Schema:** `sbm-schema-v0.2.json` - Definicja Typu Strefy
