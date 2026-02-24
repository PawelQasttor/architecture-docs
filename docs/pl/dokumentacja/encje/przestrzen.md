# Przestrzeń (Dokumentacja Pomieszczeń)

## Czym To Jest

**Plik Przestrzeni** dokumentuje jedno pomieszczenie lub obszar funkcjonalny w Twoim budynku. Pomyśl o tym jak o cyfrowej karcie pomieszczenia, która zawiera wszystko o tym pokoju: wymiary, przypisanie do strefy pożarowej, wymagania zgodności i wyposażenie.

::: tip Dla Architektów
Zamiast utrzymywać informacje o pomieszczeniu w:
- AutoCAD (geometria)
- Excel (zestawienie pomieszczeń)
- Word (specyfikacje)
- E-mail (notatki koordynacyjne)

...tworzysz **jeden plik na pomieszczenie**. Ten plik jest jednocześnie czytelnym dokumentem i danymi strukturalnymi.

**Przykład:** `spaces/sypialnia-01.md` zawiera wszystko o Sypialni 01 w jednym miejscu.
:::

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

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator pomieszczenia (jak numer rysunku, ale dla pomieszczenia)
- **spaceName**: Jak to nazywasz ("Sypialnia 01", "Kuchnia", "Korytarz A")
- **spaceType**: Kategoria z listy poniżej (sypialnia, biuro, korytarz, itd.)
- **buildingId**: Który budynek (ważne dla projektów wielobudynkowych)
- **levelId**: Które piętro (Parter = LVL-01, Piętro 1 = LVL-02, itd.)
- **version**: Śledź zmiany (1.0.0 = pierwsza wersja, 1.1.0 = drobna aktualizacja)

**Potrzebujesz TYLKO tych 6 pól, aby stworzyć prawidłowy plik przestrzeni.** Wszystko inne jest opcjonalne.
:::

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
| `designHeight` | number | **[DZIEDZICZONE v0.1.4]** Wysokość w świetle (m) — dziedziczy z `Level.typicalCeilingHeight` |
| `designVolume` | number | Objętość (m&sup3;) |
| `unit` | string | Jednostka miary (`"m"`, `"mm"`) |
| `finishes` | object | **[DZIEDZICZONE v0.1.4]** Wykończenia (podłoga, ściany, sufit) — dziedziczy z `Level.typicalFinishes`. **[v0.3.0]** Akceptuje string LUB obiekt strukturalny |
| `requirements` | array | **[DZIEDZICZONE v0.1.4]** Identyfikatory wymagań — scalane z `Level.levelRequirements` |
| `requirementOverrides` | array | Dodatkowe wymagania poza typem |
| `occupancy` | object | Dane o użytkowaniu (maxOccupants, bedCount, usagePattern) |
| `environmentalConditions` | object | **[DZIEDZICZONE v0.1.4]** Temperatura, wilgotność, wentylacja, ciśnienie — dziedziczy z `Level.typicalEnvironmentalConditions`. **[v0.3.0]** Rozszerzone o 6 nowych pól |
| `electricalSafetyGroup` | string | IEC 60364-7-710: `standard` / `group_0` / `group_1` / `group_2` |
| `regulatoryReferences` | array | Odniesienia do przepis&oacute;w z statusem zgodności |
| `lifecycleState` | string | `planned` / `design` / `under_construction` / `operational` / `renovation` / `decommissioned` |
| `finishOverrides` | object | Nadpisanie wybranych wykończeń z typu |
| `shielding` | object | **[NOWOŚĆ v0.3.0]** Ekranowanie radiologiczne, RF i izolacja akustyczna |
| `maintenanceZone` | string | Strefa konserwacji FM |
| `accessRestrictions` | string | Poziom kontroli dostępu |
| `adjacentSpaces` | array | Relacje sąsiadujących przestrzeni. **[v0.3.0]** Rozszerzone o nowe relacje i pola |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Których Pól Opcjonalnych Użyć?

**DZIEDZICZENIE (v0.1.4): NIE PODAWAJ tych pól, jeśli są wspólne dla całego piętra**
- **designHeight** — dziedziczy z poziomu (ustaw raz w `level-XX.md`)
- **finishes** — dziedziczy z poziomu (dąb/farba/sufit wspólne dla piętra)
- **environmentalConditions** — dziedziczy z poziomu (20-24°C dla całego piętra)
- **requirements** — scalane z poziomu (wymagania piętra + wymagania pokoju)

**Zacznij od tych (najbardziej przydatne do pozwoleń i koordynacji):**
- **designArea** — Powierzchnia pomieszczenia w m² (wymagana do zestawień)
- **zoneIds** — Które strefy pożarowe/akustyczne/HVAC (wymagane do pozwoleń)

**Dodaj te, gdy masz informacje:**
- **roomNumber** — Numer pomieszczenia z rysunków (np. "1.01", "0.06")
- **occupancy** — Ilu ludzi, wzorzec użytkowania (do obliczeń MEP)
- **accessibilityLevel** — Wymagania dostępności (standard, mobility, full)

**Zaawansowane pola (użyj gdy potrzebne):**
- **spaceTypeId** — Odniesienie do szablonu (jeśli masz 20 identycznych sypialni)
- **parentSpaceId** — Dla zagnieżdżonych przestrzeni (łazienka w sypialni)
- **electricalSafetyGroup** — Dla opieki zdrowotnej/pomieszczeń mokrych (IEC 60364-7-710)

**Możesz dodawać te pola stopniowo.** Zacznij prosto, dodawaj szczegóły w miarę postępu projektu.
:::

## Typy Przestrzeni (Wyliczenie)

```typescript
type SpaceType =
  // Mieszkalne
  | "sleeping_space"
  | "bedroom"
  | "living_space"
  | "living_room"
  | "dining_space"
  | "dining_room"
  | "kitchen"
  | "bathroom"
  | "wet_room"
  // Komunikacja
  | "corridor"
  | "staircase"
  | "elevator_lobby"
  | "entrance"
  // Ogólne
  | "storage"
  | "technical"
  | "office"
  | "meeting_room"
  | "open_office"
  | "break_room"
  | "classroom"
  | "retail"
  | "healthcare"
  | "assembly"
  // Opieka zdrowotna (NOWOŚĆ v0.3.0)
  | "operating_room"
  | "icu"
  | "patient_room"
  | "examination_room"
  | "treatment_room"
  | "diagnostic_imaging"
  | "laboratory"
  | "sterilization"
  | "pharmacy"
  | "clean_room"
  | "isolation_room"
  | "nursing_station"
  | "waiting_area"
  | "emergency_room"
  | "autopsy"
  | "medical_storage"
  | "decontamination"
  // Infrastruktura (NOWOŚĆ v0.3.0)
  | "server_room"
  | "workshop"
  | "loading_dock"
  | "parking"
  | "mechanical_room"
  | "electrical_room"
  | "generator_room"
  | "water_treatment"
  | "waste_management"
  | "chapel"
  | "cafeteria"
  | "laundry"
  | "reception";
```

::: tip Nowe typy przestrzeni w v0.3.0
**Opieka zdrowotna (17 nowych typów):** Sale operacyjne, oddziały intensywnej terapii, sale pacjentów, gabinety badań, diagnostyka obrazowa, laboratoria, sterylizatornie, apteki, pomieszczenia czyste, izolatki, dyżurki pielęgniarek, poczekalnie, izby przyjęć, prosektoria, magazyny medyczne, dekontaminacja.

**Infrastruktura (13 nowych typów):** Serwerownie, warsztaty, rampy załadunkowe, parkingi, maszynownie, rozdzielnie elektryczne, generatorownie, stacje uzdatniania wody, pomieszczenia gospodarki odpadami, kaplice, stołówki, pralnie, recepcje.
:::

## Przykład 1: Twój Pierwszy Plik Przestrzeni (Minimalny)

**Najprostszy możliwy plik przestrzeni** — tylko 6 wymaganych pól:

```markdown
Plik: spaces/sypialnia-01.md

---
id: "SP-BLD-01-L01-001"
entityType: "space"
documentType: "space"
spaceName: "Sypialnia 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
version: "1.0.0"
---

# Sypialnia 01

Standardowa sypialnia na parterze.
```

**To wszystko.** To jest prawidłowy plik przestrzeni. Możesz dodać więcej szczegółów później.

---

## Przykład 2: Praktyczny Plik Przestrzeni (Gotowy Na Pozwolenie)

**Dodanie pól potrzebnych do złożenia pozwolenia:**

```markdown
Plik: spaces/sypialnia-01.md

---
id: "SP-BLD-01-L01-001"
entityType: "space"
documentType: "space"
spaceName: "Sypialnia 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
version: "1.0.0"

# Dodane dla zgodności z pozwoleniem
designArea: 14.5
designHeight: 2.70
unit: "m"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Sypialnia 01

Standardowa sypialnia, parter, okno od północy.
Powierzchnia: 14,5 m², Wysokość: 2,70 m.
Strefa pożarowa ZL-IV. Spełnia minimum WT 2021 (2,50 m).
```

**Zastosowanie:** Ten plik teraz generuje:
- ✅ Wpis do zestawienia pomieszczeń (powierzchnia, wysokość)
- ✅ Przypisanie do strefy pożarowej (do rysunków pozwolenia)
- ✅ Sprawdzenie zgodności (wysokość vs wymaganie WT 2021)

---

## Przykład 3: Kompletny Plik Przestrzeni (Pełne Szczegóły)

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
  # Nowe relacje v0.3.0:
  - id: "SP-BLD-01-L01-AIRLOCK"
    relationship: "connects_via_airlock"     # Połączone przez śluzę
    boundaryType: "pressure_boundary"        # Typ granicy (NOWOŚĆ v0.3.0)
    fireRating: "EI 60"                      # Odporność ogniowa (NOWOŚĆ v0.3.0)
  - id: "SP-BLD-01-L01-PASS"
    relationship: "connects_via_pass_through" # Połączone przez podajnik
  - id: "SP-BLD-01-L01-CLEAN-CORR"
    relationship: "clean_supply_to"           # Dostawa czysta do
  - id: "SP-BLD-01-L01-DIRTY-CORR"
    relationship: "dirty_return_from"         # Powrót brudny z
  - id: "SP-BLD-01-L01-PATIENT-CORR"
    relationship: "patient_flow_to"           # Przepływ pacjentów do
  - id: "SP-BLD-01-L01-SHAFT"
    relationship: "vertical_shaft"            # Szyb pionowy
```

### Nowe typy relacji (v0.3.0)

| Relacja | Opis | Typowe zastosowanie |
|---------|------|---------------------|
| `connects_via_airlock` | Połączone przez śluzę powietrzną | Sale operacyjne, pomieszczenia czyste, izolatki |
| `connects_via_pass_through` | Połączone przez podajnik | Sterylizatornie, laboratoria |
| `clean_supply_to` | Trasa dostawy czystej | Ciągi czyste w szpitalach |
| `dirty_return_from` | Trasa powrotu brudnego | Ciągi brudne w szpitalach |
| `patient_flow_to` | Przepływ pacjentów | Ciągi pacjenckie |
| `staff_flow_to` | Przepływ personelu | Ciągi personelu medycznego |
| `visitor_flow_to` | Przepływ odwiedzających | Ciągi odwiedzających |
| `material_flow_to` | Przepływ materiałów | Logistyka szpitalna |
| `vertical_shaft` | Szyb pionowy | Szyby instalacyjne, windowe |

### Nowe pola relacji (v0.3.0)

| Pole | Typ | Opis |
|------|-----|------|
| `boundaryType` | string | Typ granicy: np. `"pressure_boundary"`, `"fire_boundary"`, `"acoustic_boundary"` |
| `fireRating` | string | Odporność ogniowa przegrody: np. `"EI 30"`, `"EI 60"`, `"REI 120"` |

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

## Dziedziczenie Właściwości (Poziom → Przestrzeń)

**Wprowadzone w v0.1.4:** Przestrzenie dziedziczą typowe właściwości z poziomu (piętra), redukując powtórzenia o 90%.

### Jak To Działa

Zamiast definiować tę samą wysokość sufitu, wykończenia i warunki środowiskowe w **każdym pokoju**, definiujesz je **raz na poziomie** i wszystkie przestrzenie na tym piętrze dziedziczą automatycznie.

### Właściwości Dziedziczone

| Właściwość Poziomu | Dziedziczy do Przestrzeni | Opis |
|-------------------|---------------------------|------|
| `typicalCeilingHeight` | `designHeight` | Domyślna wysokość w świetle |
| `typicalFinishes` | `finishes` | Domyślne wykończenia (podłoga/ściany/sufit) |
| `typicalEnvironmentalConditions` | `environmentalConditions` | Domyślne ustawienia HVAC |
| `levelRequirements` | `requirements` | Wymagania dotyczące wszystkich przestrzeni (scalane) |

### Kolejność Rozwiązywania Dziedziczenia

Gdy kompilator rozwiązuje właściwość przestrzeni:

1. **Wartość jawna na przestrzeni** (najwyższy priorytet) — zawsze wygrywa
2. **Szablon typu przestrzeni** — jeśli przestrzeń odwołuje się do `spaceTypeId`
3. **Dziedziczenie z poziomu** — z właściwości `typical*` poziomu
4. **Brak domyślnej** — ostrzeżenie walidacji, jeśli pole wymagane

### Przykład 1: Dziedziczenie Wysokości Sufitu

**Przed (v0.1.3): Powtórzenia**
```yaml
# sypialnia-01.md
---
designHeight: 2.70  # ← POWTÓRZONE
---

# sypialnia-02.md
---
designHeight: 2.70  # ← POWTÓRZONE
---

# sypialnia-03.md
---
designHeight: 2.70  # ← POWTÓRZONE (50 razy dla 50 pokoi!)
---
```

**Po (v0.1.4): DRY (Don't Repeat Yourself)**
```yaml
# poziom-02.md (DEFINICJA RAZ)
---
typicalCeilingHeight: 2.70
---

# sypialnia-01.md (DZIEDZICZY)
---
levelId: "LVL-02"
# designHeight: 2.70  ← DZIEDZICZONE z poziomu ✓
---

# sypialnia-02.md (DZIEDZICZY)
---
levelId: "LVL-02"
# designHeight: 2.70  ← DZIEDZICZONE z poziomu ✓
---

# lazienka-01.md (NADPISANIE TYLKO WYJĄTKÓW)
---
levelId: "LVL-02"
designHeight: 2.40  # ← NADPISANIE: obniżony sufit
---
```

**Rezultat:** 50 sypialni dziedziczy automatycznie, tylko 2 łazienki wymagają nadpisania. **Redukcja powtórzeń o 90%.**

### Przykład 2: Dziedziczenie Wykończeń

```yaml
# poziom-02.md
---
typicalFinishes:
  floor: "dąb inżynieryjny 3-warstwowy"
  walls: "farba akrylowa biała"
  ceiling: "farba akrylowa biała"
  baseboard: "listwa MDF biała 80mm"
---

# sypialnia-01.md
---
levelId: "LVL-02"
# finishes dziedziczone z poziomu ✓
---

# lazienka-01.md
---
levelId: "LVL-02"
finishOverrides:
  floor: "płytki ceramiczne 30x60"    # ← NADPISANIE: tylko podłoga
  walls: "płytki ceramiczne 30x60"    # ← NADPISANIE: tylko ściany
  # ceiling: farba biała  ← DZIEDZICZONE z poziomu ✓
  # baseboard: listwa MDF ← DZIEDZICZONE z poziomu ✓
---
```

### Przykład 3: Dziedziczenie Warunków Środowiskowych

```yaml
# poziom-02.md
---
typicalEnvironmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 0.5
    unit: "ACH"
  pressurization: "neutral"
---

# sypialnia-01.md
---
levelId: "LVL-02"
# environmentalConditions dziedziczone z poziomu ✓
---

# sypialnia-02.md
---
levelId: "LVL-02"
# environmentalConditions dziedziczone z poziomu ✓
---
```

### Przykład 4: Scalanie Wymagań (Specjalne Zachowanie)

**Wymagania są SCALANE, nie zastępowane** — wszystkie wymagania (z typu + poziomu + przestrzeni) są łączone.

```yaml
# typ-przestrzeni-sypialnia.md
---
requirements:
  - "REQ-BEDROOM-GENERAL"
---

# poziom-02.md
---
levelRequirements:
  - "REQ-LEVEL-FIRE-RATING"
  - "REQ-LEVEL-ACOUSTIC-B"
---

# sypialnia-03.md
---
levelId: "LVL-02"
spaceTypeId: "ST-BEDROOM-STANDARD"
requirements:
  - "REQ-ACCESSIBILITY-WHEELCHAIR"
---

# WYNIK KOMPILATORA (SCALENIE):
{
  "requirements": [
    "REQ-BEDROOM-GENERAL",           // z typu
    "REQ-LEVEL-FIRE-RATING",         // z poziomu
    "REQ-LEVEL-ACOUSTIC-B",          // z poziomu
    "REQ-ACCESSIBILITY-WHEELCHAIR"   // z przestrzeni
  ]
}
```

### Przykład 5: Łączenie Dziedziczenia (Typ + Poziom)

Przestrzeń może dziedziczyć **zarówno z typu przestrzeni, jak i z poziomu** jednocześnie:

```yaml
# typ-przestrzeni-sypialnia.md
---
id: "ST-BEDROOM-STANDARD"
finishes:
  floor: "wykładzina dywanowa"
requirements:
  - "REQ-BEDROOM-GENERAL"
---

# poziom-02.md
---
id: "LVL-02"
typicalCeilingHeight: 2.70
levelRequirements:
  - "REQ-LEVEL-FIRE-RATING"
---

# sypialnia-01.md
---
levelId: "LVL-02"
spaceTypeId: "ST-BEDROOM-STANDARD"
# ↓ NIE TRZEBA PODAWAĆ NICZEGO WIĘCEJ ↓
---

# WYNIK KOMPILATORA (POŁĄCZENIE):
{
  "designHeight": 2.70,                  // z poziomu
  "finishes": {
    "floor": "wykładzina dywanowa"       // z typu
  },
  "requirements": [
    "REQ-BEDROOM-GENERAL",               // z typu
    "REQ-LEVEL-FIRE-RATING"              // z poziomu (SCALONE)
  ]
}
```

### Korzyści

1. **Redukcja powtórzeń o 90%** dla typowych właściwości
2. **Gwarancja spójności** na całym piętrze
3. **Łatwe aktualizacje** — zmień raz w poziomie, wszystkie pokoje się zaktualizują
4. **Znany wzorzec** — działa jak dziedziczenie klas OOP
5. **Elastyczne nadpisania** — pokoje mogą być wyjątkami, gdy potrzeba
6. **Zgodność wsteczna** — istniejące pliki bez dziedziczenia nadal działają

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
  # Nowe pola v0.3.0:
  airChangesPerHour: 20               # Wymiana powietrza na godzinę (liczba)
  freshAirPercentage: 100             # Procent świeżego powietrza (0-100)
  filtrationClass: "HEPA H14"         # Klasa filtracji
  pressureDifferentialPa: 15          # Różnica ciśnień w Pa
  laminarFlow: true                   # Przepływ laminarny (boolean)
  operatingRoomClass: "class_ia"      # Klasa sali operacyjnej wg DIN 1946-4
```

### Nowe pola warunków środowiskowych (v0.3.0)

| Pole | Typ | Opis |
|------|-----|------|
| `airChangesPerHour` | number | Wymiana powietrza na godzinę (ACH) |
| `freshAirPercentage` | number | Procent świeżego powietrza (0-100) |
| `filtrationClass` | string | Klasa filtracji (np. `"HEPA H14"`, `"F7"`, `"ISO ePM1 55%"`) |
| `pressureDifferentialPa` | number | Różnica ciśnień w Paskalach |
| `laminarFlow` | boolean | Czy wymagany jest przepływ laminarny |
| `operatingRoomClass` | enum | Klasa sali operacyjnej wg DIN 1946-4: `class_ia` / `class_ib` / `class_ii` / `not_applicable` |

### Klasy sali operacyjnej (DIN 1946-4)

| Klasa | Opis | Zastosowanie |
|-------|------|-------------|
| `class_ia` | Przepływ laminarny, najwyższe wymagania | Operacje ortopedyczne, transplantacje |
| `class_ib` | Przepływ laminarny, wysokie wymagania | Operacje kardiochirurgiczne, neurochirurgiczne |
| `class_ii` | Przepływ turbulentny, standardowe wymagania | Operacje ogólnochirurgiczne |
| `not_applicable` | Nie dotyczy | Pomieszczenia niechirurgiczne |

**Typowe wartości wg typu przestrzeni:**

| Przestrzeń | Temperatura | Wilgotność | Wentylacja | Ciśnienie | Klasa filtracji | Przepływ laminarny |
|------------|-------------|------------|------------|-----------|-----------------|-------------------|
| Sala operacyjna Kl. Ia | 18-24°C | 30-60% | 20 ACH | +15 Pa | HEPA H14 | Tak |
| Sala operacyjna Kl. II | 18-24°C | 30-60% | 15 ACH | +10 Pa | HEPA H13 | Nie |
| Oddział OIOM | 20-24°C | 30-60% | 6 ACH | +5 Pa | F9 | Nie |
| Pok&oacute;j pacjenta | 20-24°C | 30-70% | 2 ACH | neutralne | F7 | Nie |
| Izolatka | 20-24°C | 30-60% | 12 ACH | -10 Pa | HEPA H13 | Nie |
| Sypialnia mieszkalna | 18-22°C | 40-60% | 0.5 ACH | neutralne | F7 | Nie |

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

## Ekranowanie (v0.3.0)

**NOWOŚĆ w v0.3.0:** Opcjonalny obiekt `shielding` definiuje wymagania dotyczące ekranowania radiologicznego, RF i izolacji akustycznej. Kluczowy dla diagnostyki obrazowej, radioterapii, serwerowni i pomieszczeń wymagających izolacji akustycznej.

```yaml
shielding:
  radiological:
    required: true
    material: "lead"
    thicknessMm: 2.0
    equivalentPbMm: 2.0
    protectedDirections:
      - "north"
      - "east"
      - "south"
      - "west"
      - "floor"
      - "ceiling"
  rfShielding:
    required: true
    attenuationDb: 100
    frequencyRangeMhz:
      min: 1
      max: 300
  acousticIsolation:
    requiredRw: 55
    impactSoundLn: 48
```

### Pola ekranowania radiologicznego

| Pole | Typ | Opis |
|------|-----|------|
| `required` | boolean | Czy ekranowanie radiologiczne jest wymagane |
| `material` | string | Materiał ekranujący (np. `"lead"`, `"barium_plaster"`, `"concrete"`) |
| `thicknessMm` | number | Grubość materiału ekranującego w mm |
| `equivalentPbMm` | number | Równoważnik ołowiu w mm Pb |
| `protectedDirections` | array | Kierunki chronione (np. `["north", "east", "floor", "ceiling"]`) |

### Pola ekranowania RF

| Pole | Typ | Opis |
|------|-----|------|
| `required` | boolean | Czy ekranowanie RF jest wymagane |
| `attenuationDb` | number | Wymagane tłumienie w dB |
| `frequencyRangeMhz` | object | Zakres częstotliwości w MHz (`min`, `max`) |

### Pola izolacji akustycznej

| Pole | Typ | Opis |
|------|-----|------|
| `requiredRw` | number | Wymagana izolacyjność akustyczna właściwa Rw w dB |
| `impactSoundLn` | number | Wymagany poziom dźwięku uderzeniowego Ln,w w dB |

### Przykład: Sala operacyjna z ekranowaniem (v0.3.0)

```yaml
---
id: "SP-BLD-01-L02-OR-01"
entityType: "space"
documentType: "space"
spaceName: "Sala Operacyjna 01"
spaceType: "operating_room"
buildingId: "BLD-01"
levelId: "LVL-02"
departmentId: "DEPT-SURGERY"
version: "1.0.0"

designArea: 42.0
designHeight: 3.00
unit: "m"

electricalSafetyGroup: "group_2"

environmentalConditions:
  temperatureRange:
    min: 18
    max: 24
    unit: "C"
  humidityRange:
    min: 30
    max: 60
  pressurization: "positive"
  cleanlinessClass: "ISO 7"
  airChangesPerHour: 20
  freshAirPercentage: 100
  filtrationClass: "HEPA H14"
  pressureDifferentialPa: 15
  laminarFlow: true
  operatingRoomClass: "class_ia"

shielding:
  radiological:
    required: false
  rfShielding:
    required: false
  acousticIsolation:
    requiredRw: 50
    impactSoundLn: 53

adjacentSpaces:
  - id: "SP-BLD-01-L02-PREP-01"
    relationship: "connects_via_airlock"
    boundaryType: "pressure_boundary"
    fireRating: "EI 60"
  - id: "SP-BLD-01-L02-CLEAN-CORR"
    relationship: "clean_supply_to"
  - id: "SP-BLD-01-L02-DIRTY-CORR"
    relationship: "dirty_return_from"
  - id: "SP-BLD-01-L02-STAFF-CORR"
    relationship: "staff_flow_to"

finishes:
  floor:
    material: "PVC-CONDUCT-01"
    seamless: true
    antimicrobial: true
    esdProtection: true
    chemicalResistance: true
    cleanability: "cleanroom"
  walls:
    material: "HPL-PANEL-SURGICAL"
    seamless: true
    antimicrobial: true
    cleanability: "cleanroom"
  ceiling:
    material: "LAMINAR-FLOW-CEILING-01"
    seamless: true
    cleanability: "cleanroom"

requirements:
  - "REQ-OR-HVAC-CLASS-IA"
  - "REQ-OR-ELECTRICAL-GROUP-2"
  - "REQ-OR-LIGHTING-100KLUX"
  - "REQ-OR-UPS-BACKUP"

zoneIds:
  - "ZONE-FIRE-SURGERY"
  - "ZONE-HVAC-OR"
  - "ZONE-CLEANROOM-ISO7"

tags:
  - "healthcare"
  - "surgical"
  - "class_ia"
  - "laminar_flow"
---

# Sala Operacyjna 01

Sala operacyjna klasy Ia z przepływem laminarnym dla operacji ortopedycznych.

## Parametry

- Powierzchnia: 42,0 m², Wysokość: 3,00 m
- Klasa czystości: ISO 7, Klasa sali: Ia (DIN 1946-4)
- Nadciśnienie: +15 Pa, Filtracja: HEPA H14
- Wymiana powietrza: 20 ACH, 100% świeżego powietrza
- Przepływ laminarny: Tak
- Grupa bezpieczeństwa elektrycznego: Grupa 2 (IEC 60364-7-710)
```

## Proweniencja danych (v0.2.0)

**NOWOŚĆ w v0.2.0:** Każde pole przestrzeni może mieć towarzyszącą adnotację `_meta` śledzącą źródło danych.

### Dlaczego to ważne

W rzeczywistym polskim projekcie szpitalnym osłona radiologiczna pracowni CT była udokumentowana jako 2,0 mm Pb, gdy dokument źródłowy określał 0,3 mm Pb -- 7-krotny błąd krytyczny dla bezpieczeństwa. Bez proweniencji nie było sposobu, aby odróżnić wartości ze źródła od zgadniętych.

### Adnotacje na poziomie pól

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter"
```

### Poziomy pewności

| Poziom | Etykieta | Kiedy używać |
|--------|----------|-------------|
| 1 | `measured` | Pomiar zweryfikowany w terenie |
| 2 | `calculated` | Obliczone z danych pomiarowych |
| 3 | `specified` | Z dokumentu autorytatywnego |
| 4 | `estimated` | Osąd profesjonalny |
| 5 | `assumed` | Placeholder, brak źródła |
| 6 | `unknown` | Wartość niedostępna (używaj z `null`) |

### Jawnie nieznane wartości

```yaml
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Nie określono dla pomieszczenia. Typowa wysokość poziomu: 3,30 m."
```

Pełny przewodnik: [Proweniencja danych](/pl/przewodniki/proweniencja-danych)

## Zobacz Także

- **[Karta Strefa](/pl/dokumentacja/encje/strefa)** - Grupowanie przestrzeni w strefy funkcjonalne
- **[Karta Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Definiowanie wymagań dla przestrzeni
- **[Proweniencja danych](/pl/przewodniki/proweniencja-danych)** - Pełny przewodnik śledzenia źródeł danych
- **[Szablon Tworzenia](/pl/dokumentacja/tworzenie/)** - Szablon Markdown dla Przestrzeni
