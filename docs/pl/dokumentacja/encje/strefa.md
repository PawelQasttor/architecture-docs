# Strefa (Grupowanie Pomieszczeń Według Reguł)

## Czym To Jest

**Strefa** grupuje pomieszczenia, które mają wspólną charakterystykę. Najczęstszy przykład: **strefa pożarowa** grupuje wszystkie pomieszczenia, które mają tę samą klasyfikację bezpieczeństwa pożarowego.

::: tip Dla Architektów
**Problem:** Inspektor budowlany pyta "Które pomieszczenia są w Strefie Pożarowej ZL-IV?"

**Stary sposób:** Przeszukuj rysunki, sprawdzaj zestawienia pomieszczeń, miej nadzieję, że niczego nie pominąłeś.

**Ze strefami:** Otwórz `zones/strefa-pozarowa-zl-iv.md` — automatycznie listuje wszystkie pomieszczenia, które się do niej odwołują.

**Jeden plik strefy = wszystkie pomieszczenia w tej strefie automatycznie śledzone.**
:::

**Strefa** grupuje przestrzenie według kryteriów funkcjonalnych (ochrona przeciwpożarowa, HVAC, obróbka akustyczna, kontrola dostępu). Strefy umożliwiają śledzenie zgodności regulacyjnej i projektowanie systemów budynkowych.

## Przeznaczenie

Strefy definiują:
- Strefy pożarowe (ZL-IV, strefy kontroli dymu)
- Strefy dystrybucji HVAC (kontrola cieplna)
- Strefy obr&oacute;bki akustycznej (wymagania izolacji dźwiękowej)
- Strefy dostępu bezpieczeństwa (poziomy kontroli dostępu)
- Strefy konserwacyjne (zarządzanie obiektem)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator strefy | `"ZONE-FIRE-ZL-IV"` |
| `entityType` | string | Musi być `"zone"` | `"zone"` |
| `documentType` | string | Musi być `"zone"` | `"zone"` |
| `zoneName` | string | Nazwa czytelna dla ludzi | `"Fire Zone ZL-IV (Residential)"` |
| `zoneType` | string | Typ funkcjonalny (patrz wyliczenie poniżej) | `"fire"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator strefy (np. `ZONE-FIRE-ZL-IV`)
- **zoneName**: Jak to nazywasz ("Strefa Pożarowa ZL-IV", "Strefa HVAC Północ")
- **zoneType**: Kategoria — `fire`, `hvac`, `acoustic`, `security`, `maintenance`
- **buildingId**: Który budynek
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 5 pól.** System automatycznie śledzi, które pomieszczenia są w tej strefie (nie wypisujesz ich ręcznie).
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `zoneTypeId` | string | Odniesienie do zone_type dla właściwości szablonowych |
| `levelIds` | array | ID poziomów, gdzie istnieje ta strefa |
| `spaceIds` | array | Identyfikatory przestrzeni w tej strefie (obliczane automatycznie) |
| `requirements` | array | Identyfikatory wymagań mających zastosowanie do tej strefy |
| `requirementOverrides` | array | Dodatkowe wymagania poza typem strefy |
| `properties` | object | Właściwości specyficzne dla strefy (różne w zależności od zoneType) |
| `zoneClassification` | string | Klasyfikacja regulacyjna (np. "ZL-IV") |
| `fireRating` | string | Klasa odporności ogniowej (np. "REI 60") |
| `hvacSystemId` | string | System HVAC obsługujący tę strefę |
| `acousticClass` | string | Klasa wydajności akustycznej (np. "Class B") |
| `securityLevel` | string | Poziom kontroli dostępu |
| `description` | string | Szczegółowy opis |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

## Typy Stref (Wyliczenie)

```typescript
type ZoneType =
  | "fire"                  // Strefy pożarowe, kontrola dymu
  | "hvac"                  // Strefy termiczne HVAC
  | "acoustic"              // Strefy obr&oacute;bki akustycznej
  | "security"              // Strefy kontroli dostępu
  | "maintenance"           // Strefy zarządzania obiektem
  | "lighting"              // Strefy sterowania oświetleniem
  | "ventilation"           // Strefy wentylacji naturalnej/mechanicznej
  | "plumbing"              // Piony i dystrybucja hydrauliczna
  | "electrical"            // Strefy dystrybucji elektrycznej
  // Nowe wartości v0.3.0:
  | "medical_electrical"    // Strefy bezpieczeństwa elektrycznego w medycynie
  | "radiation_protection"  // Strefy ochrony radiologicznej
  | "cleanroom"             // Strefy pomieszczeń czystych
  | "infection_control"     // Strefy kontroli zakażeń
  | "pressure_cascade";     // Strefy kaskady ciśnieniowej
```

### Nowe typy stref (v0.3.0)

| Wartość | Cel | Typowe zastosowanie |
|---------|-----|---------------------|
| `medical_electrical` | Strefy bezpieczeństwa elektrycznego w lokalizacjach medycznych wg IEC 60364-7-710 | Grupowanie pomieszczeń medycznych wg grupy bezpieczeństwa (Grupa 0/1/2) |
| `radiation_protection` | Strefy ochrony radiologicznej | Pracownie RTG, CT, radioterapii, medycyny nuklearnej |
| `cleanroom` | Strefy pomieszczeń czystych wg ISO 14644 | Sale operacyjne, laboratoria, apteki |
| `infection_control` | Strefy kontroli zakażeń szpitalnych | Izolatki, oddziały zakaźne, strefy kwarantanny |
| `pressure_cascade` | Strefy kaskady ciśnieniowej | Ciągi czyste → brudne w szpitalach, bloki operacyjne |

## Przykład: Źr&oacute;dło Markdown

**Plik:** `docs/en/examples/green-terrace/zones/fire-zone-zl-iv.md`

```markdown
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-ZL-IV-001"

description: >
  Residential fire zone with low fire load (ZL-IV per WT 2021 &sect; 234).
  Requires REI 60 walls and floors, EI 30 fire doors.

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P5hJ2$sNDxw4YzFv3MQyR"
  objectType: "FireZone"

version: "1.0.0"
tags:
  - "fire_safety"
  - "residential"
  - "zl_iv"
---

# Strefa pożarowa: ZL-IV (Mieszkalna)

Strefa mieszkalna o niskim obciążeniu ogniowym zgodnie z wymaganiami WT 2021.

## Wymagania Ochrony Przeciwpożarowej

- **Odporność ogniowa:** REI 60 dla ścian i strop&oacute;w
- **Klasa drzwi:** EI 30 dla drzwi przeciwpożarowych
- **Kontrola dymu:** Wentylacja naturalna przez okna
- **Ewakuacja:** Maksymalna odległość dr&oacute;g ewakuacyjnych 40m do chronionej klatki schodowej

## Podstawa Prawna

- **WT 2021 &sect; 234:** Wymagania dotyczące oddzielenia pożarowego
- **WT 2021 &sect; 235:** Odporność ogniowa element&oacute;w budowlanych
- **Prawo budowlane Art. 5:** Przepisy ochrony przeciwpożarowej

## Przestrzenie w Strefie

Strefa obejmuje wszystkie przestrzenie mieszkalne na kondygnacjach L00-L02:
- Sypialnie, pokoje dzienne, kuchnie
- Wyłączone: klatki schodowe (osobna strefa pożarowa)
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "zones": [
      {
        "documentType": "zone",
        "entityType": "zone",
        "id": "ZONE-FIRE-ZL-IV",
        "zoneName": "Fire Zone ZL-IV (Residential)",
        "zoneType": "fire",
        "buildingId": "BLD-01",
        "zoneClassification": "ZL-IV",
        "fireRating": "REI 60",
        "requirements": [
          "REQ-PL-FIRE-SEPARATION-001",
          "REQ-FIRE-ZL-IV-001"
        ],
        "description": "Residential fire zone with low fire load (ZL-IV per WT 2021 &sect; 234). Requires REI 60 walls and floors, EI 30 fire doors.",
        "spaceIds": [
          "SP-BLD-01-L01-001",
          "SP-BLD-01-L01-002",
          "SP-BLD-01-L01-003",
          "SP-BLD-01-L02-001",
          "SP-BLD-01-L02-002"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcZone",
          "globalId": "3P5hJ2$sNDxw4YzFv3MQyR",
          "objectType": "FireZone"
        },
        "version": "1.0.0",
        "tags": ["fire_safety", "residential", "zl_iv"]
      }
    ]
  }
}
```

## Relacje Odwrotne

Kompilator **automatycznie oblicza** `zone.spaceIds` na podstawie odwołań z przestrzeni:

**Wejście:** Przestrzenie odwołują się do stref
```yaml
# bedroom-01.md
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

# bedroom-02.md
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
```

**Wynik:** Strefa automatycznie zawiera listę przestrzeni
```json
{
  "id": "ZONE-FIRE-ZL-IV",
  "spaceIds": [
    "SP-BLD-01-L01-001",  // bedroom-01
    "SP-BLD-01-L01-002"   // bedroom-02
  ]
}
```

**Dlaczego to ważne:** Architekci tworzą relacje przestrzeń → strefa (naturalny tok pracy). Kompilator automatycznie oblicza relację strefa → przestrzenie (na potrzeby raportów zgodności).

## Wzorzec Typ/Instancja

Strefy mogą odwoływać się do **Typów Stref**, aby dziedziczyć standardowe właściwości i wymagania:

**Typ Strefy (Szablon):**
```yaml
# fire-zone-zl-iv-type.md
---
id: "ZT-FIRE-ZL-IV"
typeName: "Strefa Pożarowa ZL-IV Standard"
zoneType: "fire"
requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
properties:
  fireResistance: "REI 60"
  maxEscapeDistance: 40.0
---
```

**Instancja Strefy (Odnosi się do Typu):**
```yaml
---
id: "ZONE-FIRE-NORTH"
zoneName: "Strefa Pożarowa Północne Skrzydło"
zoneTypeId: "ZT-FIRE-ZL-IV"  # Dziedziczy wymagania i właściwości
buildingId: "BLD-01"
levelIds: ["LVL-01", "LVL-02"]
---
```

**Korzyści:** Definiuj właściwości raz, wielokrotnie używaj, aktualizuj typ → wszystkie instancje dziedziczą zmiany. Redukcja dokumentacji o 20-60%.

Zobacz [Typ Strefy](/pl/dokumentacja/encje/typ-strefy).

## Mapowanie BIM

Strefy mapują się na obiekty **IfcZone** oraz Strefy Systemowe w Revit:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Zone.SBM_ID` |
| `zoneName` | `Name` | `Name` |
| `zoneType` | `SBM_Zone_Type` | `Pset_SBM_Zone.SBM_ZoneType` |
| `zoneClassification` | `SBM_Zone_Classification` | `Pset_SBM_Zone.Classification` |
| `fireRating` | `Fire Rating` | `Pset_FireProtectionCommon.FireRating` |
| `requirements` | `SBM_Requirements` | `Pset_SBM_Zone.SBM_Requirements` |
| `spaceIds` | `SBM_Space_IDs` | `Pset_SBM_Zone.SBM_SpaceIDs` |

## Typy Stref wg Dyscypliny

### Strefy Ochrony Przeciwpożarowej
- **Przeznaczenie:** Strefy pożarowe, kontrola dymu
- **Wymagania:** Klasy odporności ogniowej, odległości ewakuacyjne, oddymianie
- **Normy:** WT 2021 &sect; 234-235, Prawo budowlane Art. 5

### Strefy HVAC
- **Przeznaczenie:** Obszary kontroli cieplnej
- **Wymagania:** Zakresy temperatur, krotności wymiany powietrza, kontrola wilgotności
- **Normy:** EN 16798-1, WT 2021 &sect; 328

### Strefy Akustyczne
- **Przeznaczenie:** Obszary izolacji dźwiękowej
- **Wymagania:** Klasy izolacji dźwięku powietrznego/uderzeniowego
- **Normy:** ISO 140-4, EN 12354-1

### Strefy Bezpieczeństwa
- **Przeznaczenie:** Poziomy kontroli dostępu
- **Wymagania:** Dostęp kartą, strefa zastrzeżona, monitoring
- **Normy:** Specyficzne dla projektu polityki bezpieczeństwa

## Sprawdzanie Zgodności

Kompilator waliduje strefy względem przypisanych wymagań:

```json
{
  "zoneComplianceDetails": [
    {
      "requirementId": "REQ-PL-FIRE-SEPARATION-001",
      "zoneId": "ZONE-FIRE-ZL-IV",
      "zoneName": "Fire Zone ZL-IV (Residential)",
      "metric": "fire_resistance_rating",
      "targetValue": "REI 60",
      "measuredValue": "REI 60",
      "operator": ">=",
      "status": "compliant"
    }
  ]
}
```

## Integracja z Cyfrowym Bliźniakiem

Strefy mogą agregować dane z czujnik&oacute;w ze wszystkich zawartych przestrzeni:

```json
{
  "zoneAggregations": [
    {
      "entityId": "ZONE-HVAC-NORTH",
      "entityName": "HVAC Zone North",
      "aggregatedMetrics": [
        {
          "metric": "average_temperature",
          "sourceSpaces": [
            "SP-BLD-01-L01-001",
            "SP-BLD-01-L01-002",
            "SP-BLD-01-L01-003"
          ],
          "aggregationMethod": "mean",
          "currentValue": 21.5,
          "threshold": { "min": 20, "max": 26 }
        },
        {
          "metric": "max_co2",
          "sourceSpaces": [
            "SP-BLD-01-L01-001",
            "SP-BLD-01-L01-002",
            "SP-BLD-01-L01-003"
          ],
          "aggregationMethod": "max",
          "currentValue": 850,
          "threshold": { "max": 1000 }
        }
      ]
    }
  ]
}
```

## Zobacz Także

- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie należą do stref
- **[Karta Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Definiowanie wymagań dla stref
- **[Szablon Tworzenia](/pl/dokumentacja/tworzenie/)** - Szablon Markdown dla Stref
