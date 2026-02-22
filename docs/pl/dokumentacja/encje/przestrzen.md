# Karta Przestrzeń

**Przestrzeń** reprezentuje pomieszczenie lub obszar funkcjonalny wewnątrz budynku. Przestrzenie są podstawową jednostką przestrzenną dla wymagań projektowych, sprawdzania zgodności i monitorowania operacyjnego.

## Przeznaczenie

Przestrzenie definiują:
- Obszary funkcjonalne (sypialnie, biura, korytarze)
- Parametry projektowe (powierzchnia, wysokość, objętość)
- Wymagania wydajnościowe (doświetlenie, akustyka, komfort cieplny)
- Przypisania do stref (pożarowa, HVAC, akustyczna)
- Relacje sąsiedztwa (drzwi, wsp&oacute;lne ściany)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator przestrzeni | `"SP-BLD-01-L01-001"` |
| `entityType` | string | Musi być `"space"` | `"space"` |
| `documentType` | string | Musi być `"space"` | `"space"` |
| `spaceName` | string | Nazwa czytelna dla ludzi | `"Bedroom 01"` |
| `spaceType` | string | Typ funkcjonalny (patrz wyliczenie poniżej) | `"sleeping_space"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `levelId` | string | ID poziomu nadrzędnego | `"LVL-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `spaceTypeId` | string | **Referencja do Typu Przestrzeni** (dziedziczy specyfikacje) |
| `roomNumber` | string | Numer pomieszczenia z rysunk&oacute;w (np. `"0.06.1"`) |
| `accessibilityLevel` | string | Dostępność: `standard` / `mobility` / `visual` / `hearing` / `full` |
| `parentSpaceId` | string | Przestrzeń nadrzędna (np. łazienka → sypialnia) |
| `departmentId` | string | Grupa departamentu/działu (np. `"DEPT-SPA"`) |
| `zoneIds` | array | Identyfikatory stref pożarowych, HVAC, akustycznych |
| `designArea` | number | Powierzchnia podłogi (m&sup2;) |
| `designHeight` | number | Wysokość w świetle (m) |
| `designVolume` | number | Objętość (m&sup3;) |
| `unit` | string | Jednostka miary (`"m"`, `"mm"`) |
| `requirements` | array | Identyfikatory wymagań mających zastosowanie do tej przestrzeni |
| `requirementOverrides` | array | Dodatkowe wymagania poza typem |
| `occupancy` | object | Dane o użytkowaniu (maxOccupants, bedCount, usagePattern) |
| `environmentalConditions` | object | Temperatura, wilgotność, wentylacja, ciśnienie |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `regulatoryReferences` | array | Odniesienia do przepis&oacute;w z statusem zgodności |
| `lifecycleState` | string | `planned` / `design` / `under_construction` / `operational` / `renovation` / `decommissioned` |
| `finishOverrides` | object | Nadpisanie wybranych wykończeń z typu |
| `maintenanceZone` | string | Strefa konserwacji FM |
| `accessRestrictions` | string | Poziom kontroli dostępu |
| `adjacentSpaces` | array | Relacje sąsiadujących przestrzeni |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

## Typy Przestrzeni (Wyliczenie)

```typescript
type SpaceType =
  | "sleeping_space"
  | "bedroom"
  | "living_space"
  | "living_room"
  | "dining_space"
  | "dining_room"
  | "kitchen"
  | "bathroom"
  | "wet_room"
  | "corridor"
  | "staircase"
  | "storage"
  | "technical"
  | "office"
  | "meeting_room"
  | "open_office"
  | "break_room"
  | "elevator_lobby"
  | "entrance"
  | "classroom"
  | "retail"
  | "healthcare"
  | "assembly";
```

## Przykład: Źr&oacute;dło Markdown

**Plik:** `docs/en/examples/green-terrace/spaces/bedroom-01.md`

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

designArea: 14.5
designHeight: 2.70
designVolume: 39.15
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

maintenanceZone: "MAINT-ZONE-RESIDENTIAL"
accessRestrictions: "tenant_only"

adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "north-facing"
---

# Przestrzeń: Bedroom 01

Standardowa sypialnia z oknem p&oacute;łnocnym zapewniającym naturalne doświetlenie.

## Parametry Projektowe

- Powierzchnia podłogi: 14.5 m&sup2;
- Wysokość w świetle: 2.70 m
- Objętość: 39.15 m&sup3;

## Wymagania

Ta przestrzeń musi spełniać:
- Minimalny wsp&oacute;łczynnik doświetlenia 2% (EN 17037)
- Izolacja akustyczna klasy B (ISO 140-4)
- Wysokość pomieszczenia ≥ 2.50 m (WT 2021 &sect; 132)
- Komfort cieplny 20-26&deg;C (EN 16798-1)

## Przypisania do Stref

- **Strefa pożarowa:** ZL-IV (niskie obciążenie ogniowe, mieszkalna)
- **Strefa HVAC:** P&oacute;łnocna (wentylacja mechaniczna nawiewno-wywiewna)
- **Strefa akustyczna:** Nocna (zwiększona ochrona akustyczna)
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "spaces": [
      {
        "documentType": "space",
        "entityType": "space",
        "id": "SP-BLD-01-L01-001",
        "spaceName": "Bedroom 01",
        "spaceType": "sleeping_space",
        "buildingId": "BLD-01",
        "levelId": "LVL-01",
        "zoneIds": [
          "ZONE-FIRE-ZL-IV",
          "ZONE-HVAC-NORTH",
          "ZONE-ACOUSTIC-NIGHT"
        ],
        "designArea": 14.5,
        "designHeight": 2.7,
        "designVolume": 39.15,
        "unit": "m",
        "requirements": [
          "REQ-DAYLIGHT-SLEEPING-001",
          "REQ-ACOUSTIC-SLEEPING-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-PL-WT-ROOM-HEIGHT-001"
        ],
        "occupancy": {
          "maxOccupants": 2,
          "usagePattern": "residential_sleeping",
          "hoursPerDay": 8,
          "daysPerWeek": 7
        },
        "adjacentSpaces": [
          {
            "id": "SP-BLD-01-L01-002",
            "relationship": "shares_wall"
          },
          {
            "id": "SP-BLD-01-L01-CORR",
            "relationship": "connects_via_door"
          }
        ],
        "ifcMapping": {
          "ifcEntity": "IfcSpace",
          "globalId": "2O3fG9$rLBxv3VxEu2LPxQ",
          "objectType": "Bedroom"
        },
        "version": "1.0.0",
        "tags": ["residential", "sleeping", "north-facing"]
      }
    ]
  }
}
```

## Relacje Sąsiedztwa

Przestrzenie mogą odwoływać się do sąsiadujących przestrzeni z określonym typem relacji:

```yaml
adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"      # Dzieli ścianę działową
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door" # Połączone drzwiami
  - id: "SP-BLD-01-L02-001"
    relationship: "above"             # Przestrzeń powyżej
  - id: "SP-BLD-01-L00-001"
    relationship: "below"             # Przestrzeń poniżej
```

## Mapowanie BIM

Przestrzenie mapują się na obiekty **IfcSpace** oraz Pomieszczenia w Revit:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Space.SBM_ID` |
| `spaceName` | `Name` | `Name` |
| `spaceType` | `SBM_Space_Type` | `Pset_SBM_Space.SBM_SpaceType` |
| `designArea` | `Area` | `Pset_SBM_Space.SBM_DesignArea` |
| `designHeight` | `Limit Offset` | `Pset_SBM_Space.SBM_DesignHeight` |
| `requirements` | `SBM_Requirements` | `Pset_SBM_Space.SBM_Requirements` |
| `zoneIds` | `SBM_Zone_IDs` | `Pset_SBM_Space.SBM_ZoneIds` |

## Sprawdzanie Zgodności

Kompilator waliduje przestrzenie względem przypisanych wymagań:

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
      "margin": 0.20
    }
  ]
}
```

## Integracja z Cyfrowym Bliźniakiem

Czujniki są powiązane z identyfikatorami przestrzeni w celu monitorowania w czasie rzeczywistym:

```json
{
  "spaceSensorBindings": [
    {
      "entityId": "SP-BLD-01-L01-001",
      "entityName": "Bedroom 01",
      "sensors": [
        {
          "sensorType": "temperature",
          "sensorId": "TEMP-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-TEMP",
          "thresholds": { "min": 18, "max": 26 }
        },
        {
          "sensorType": "co2",
          "sensorId": "CO2-SP-BLD-01-L01-001",
          "dataPoint": "AI-SP-BLD-01-L01-001-CO2",
          "thresholds": { "min": 400, "max": 1000 }
        }
      ]
    }
  ]
}
```

## Mechanizm Nadpisywania

Instancje przestrzeni mogą nadpisywać wybrane właściwości z typu, zachowując pozostałe specyfikacje:

**Typ Przestrzeni (Definicja Standardowa):**
```yaml
# standard-bedroom-type-a.md
---
id: "ST-BEDROOM-STANDARD-A"
typeName: "Sypialnia Standard A"
spaceCategory: "bedroom"
finishes:
  floor: "MAT-FLOOR-OAK-01"        # Dąb inżynieryjny
  walls: "MAT-WALL-PAINT-WHITE"    # Farba biała
  door: "MAT-DOOR-INTERIOR-80"     # Drzwi standardowe
requirements:
  - "REQ-BEDROOM-BASIC"
---
```

**Instancja Przestrzeni (Dostępna Sypialnia - Nadpisanie):**
```yaml
---
id: "SP-BLD-01-L01-003"
spaceName: "Sypialnia 03 (Dostępna)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"

# Nadpisanie wykończenia podłogi dla dostępności
finishOverrides:
  floor: "MAT-FLOOR-TILE-01"       # Płytki ceramiczne (łatwiejszy dostęp wózkiem)

# Dodatkowe wymaganie poza typem
requirementOverrides:
  - "REQ-ACCESSIBILITY-WHEELCHAIR-001"
---
```

**Wynik Scalenia Kompilatora:**
```json
{
  "id": "SP-BLD-01-L01-003",
  "spaceName": "Sypialnia 03 (Dostępna)",
  "finishes": {
    "floor": "MAT-FLOOR-TILE-01",       // Nadpisane (płytki zamiast dębu)
    "walls": "MAT-WALL-PAINT-WHITE",    // Z typu (niezmienione)
    "door": "MAT-DOOR-INTERIOR-80"      // Z typu (niezmienione)
  },
  "requirements": [
    "REQ-BEDROOM-BASIC",                 // Z typu
    "REQ-ACCESSIBILITY-WHEELCHAIR-001"   // Dodatkowe
  ]
}
```

**Wytyczne:**
- Używaj nadpisań dla **niewielkich modyfikacji** (jedno-dwa wykończenia)
- Dla **znaczących zmian** (>50% właściwości) tw&oacute;rz nowy typ przestrzeni

## Przestrzenie Nadrzędne/Podrzędne

Przestrzenie mogą tworzyć hierarchie nadrzędne/podrzędne za pomocą `parentSpaceId`. Typowe zastosowanie: łazienki, przedpokoje, garderoby przypisane do pokoju głównego.

```yaml
# Pokój nadrzędny
---
id: "SP-BLD-01-L00-006-1"
spaceName: "Pok&oacute;j 0.06.1"
roomNumber: "0.06.1"
spaceType: "sleeping_space"
designArea: 18.5
---

# Łazienka przypisana (przestrzeń podrzędna)
---
id: "SP-BLD-01-L00-006-2"
spaceName: "Łazienka 0.06.2"
roomNumber: "0.06.2"
spaceType: "bathroom"
parentSpaceId: "SP-BLD-01-L00-006-1"  # ← Referencja do pokoju nadrzędnego
designArea: 4.2
---
```

Kompilator automatycznie oblicza `childSpaceIds` na przestrzeni nadrzędnej:

```json
{
  "id": "SP-BLD-01-L00-006-1",
  "spaceName": "Pok&oacute;j 0.06.1",
  "childSpaceIds": ["SP-BLD-01-L00-006-2"]
}
```

## Dostępność

Pole `accessibilityLevel` klasyfikuje przestrzenie według wymagań dostępności:

| Poziom | Opis | Typowe zastosowanie |
|--------|------|---------------------|
| `standard` | Brak specjalnych wymagań (domyślny) | Standardowe pomieszczenia |
| `mobility` | Dostępność dla os&oacute;b na w&oacute;zkach | Szerokie drzwi, brak prog&oacute;w, uchwyty |
| `visual` | Udogodnienia dla os&oacute;b niedowidzących | Oznaczenia dotykowe, kontrastowe znaki |
| `hearing` | Udogodnienia dla os&oacute;b niedosłyszących | Alarmy wizualne, pętle indukcyjne |
| `full` | Pełna dostępność | Pokoje uniwersalnego projektowania |

```yaml
---
spaceName: "Sypialnia 03 (NPS)"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
accessibilityLevel: "mobility"
roomNumber: "0.06.3"
departmentId: "DEPT-RESIDENTIAL-A"
---
```

## Departamenty

Pole `departmentId` grupuje przestrzenie według działu funkcjonalnego:

```yaml
# Oddział szpitalny
departmentId: "DEPT-OIOM"           # Oddział intensywnej terapii

# Sekcje domu seniora
departmentId: "DEPT-SPA"            # Sekcja SPA/wellness
departmentId: "DEPT-ADMIN"          # Skrzydło administracyjne
departmentId: "DEPT-RESIDENTIAL-A"  # Skrzydło mieszkalne A
```

## Warunki Środowiskowe

Obiekt `environmentalConditions` określa wymagania dotyczące temperatury, wilgotności, wentylacji i ciśnienia powietrza. Może być zdefiniowany na Typie Przestrzeni (szablon) i nadpisany per instancja.

```yaml
environmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 6
    unit: "ACH"              # Wymiany powietrza na godzinę
  pressurization: "positive"  # positive/negative/neutral
  cleanlinessClass: "ISO 7"
```

**Typowe wartości wg typu przestrzeni:**

| Przestrzeń | Temperatura | Wilgotność | Wentylacja | Ciśnienie |
|------------|-------------|------------|------------|-----------|
| Sala operacyjna | 18-24°C | 30-60% | 20 ACH | nadciśnienie |
| Oddział OIOM | 20-24°C | 30-60% | 6 ACH | nadciśnienie |
| Pok&oacute;j pacjenta | 20-24°C | 30-70% | 2 ACH | neutralne |
| Sypialnia mieszkalna | 18-22°C | 40-60% | 0.5 ACH | neutralne |
| Izolatka | 20-24°C | 30-60% | 12 ACH | podciśnienie |

## Grupy Bezpieczeństwa Elektrycznego

Pole `electricalSafetyGroup` klasyfikuje przestrzenie wg IEC 60364-7-710 (instalacje elektryczne w lokalizacjach medycznych):

| Grupa | Opis | Przykładowe przestrzenie |
|-------|------|--------------------------|
| `standard` | Brak sprzętu medycznego (domyślne) | Biura, korytarze, mieszkalne |
| `group_0` | Lokalizacja medyczna, bez części aplikacyjnych | Poczekalnie, gabinety masażu |
| `group_1` | Części aplikacyjne, nie krytyczne dla życia | Gabinety badań, oddziały |
| `group_2` | Krytyczne dla życia | Sale operacyjne, OIOM |

```yaml
---
spaceName: "Sala Operacyjna 01"
spaceType: "healthcare"
electricalSafetyGroup: "group_2"
environmentalConditions:
  temperatureRange: { min: 18, max: 24, unit: "C" }
  ventilationRate: { value: 20, unit: "ACH" }
  pressurization: "positive"
  cleanlinessClass: "ISO 7"
---
```

## Odniesienia Regulacyjne

Tablica `regulatoryReferences` śledzi obowiązujące przepisy i ich status zgodności:

```yaml
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 132"
    description: "Minimalna wysokość pomieszczenia 2.50m"
    status: "compliant"
  - code: "PN-B-02151-3:2015"
    section: "Tabela 1"
    description: "Izolacja akustyczna Rw ≥ 50 dB między mieszkaniami"
    status: "compliant"
  - code: "Dz.U. 2012 poz. 1426"
    section: "§ 14"
    description: "Wymagania ochrony pożarowej dla budynk&oacute;w mieszkalnych"
    status: "applicable"
```

**Wartości statusu:**

| Status | Znaczenie |
|--------|-----------|
| `applicable` | Przepis obowiązuje, jeszcze niezweryfikowany |
| `compliant` | Zweryfikowana zgodność |
| `non_compliant` | Znana niezgodność (wymagana akcja) |
| `waiver_granted` | Niezgodny, ale uzyskano odstępstwo |
| `not_applicable` | Jawnie oznaczony jako nieobowiązujący |

## Stan Cyklu Życia

Pole `lifecycleState` śledzi bieżącą fazę przestrzeni:

| Stan | Opis |
|------|------|
| `planned` | W planie generalnym, jeszcze nie projektowany |
| `design` | Aktywna faza projektowa |
| `under_construction` | W trakcie budowy lub wykańczania |
| `operational` | W użytku, przekazany do eksploatacji |
| `renovation` | W trakcie remontu lub modernizacji |
| `decommissioned` | Wycofany z użytku |

```yaml
---
spaceName: "Sypialnia 01"
lifecycleState: "design"
---
```

## Zobacz Także

- **[Karta Strefa](/pl/dokumentacja/encje/strefa)** - Grupowanie przestrzeni w strefy funkcjonalne
- **[Karta Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Definiowanie wymagań dla przestrzeni
- **[Szablon Tworzenia](/pl/dokumentacja/tworzenie/)** - Szablon Markdown dla Przestrzeni
