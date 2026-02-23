# Karta Kondygnacja

**Poziom** reprezentuje kondygnację budynku. Poziomy organizują przestrzenie w pionie i dostarczają odniesienia wysokościowe dla element&oacute;w budynkowych.

## Przeznaczenie

Poziomy definiują:
- Rzędną i wysokość kondygnacji
- Nazewnictwo i numerację kondygnacji
- Organizację pionową przestrzeni
- Wymagania na poziomie kondygnacji (wysokości pomieszczeń, odporność ogniowa)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator poziomu | `"LVL-01"` |
| `entityType` | string | Musi być `"level"` | `"level"` |
| `documentType` | string | Musi być `"level"` | `"level"` |
| `levelName` | string | Nazwa czytelna dla ludzi | `"Level 01 (Ground)"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `elevation` | number | Rzędna poziomu | `0.0` |
| `elevationUnit` | string | Jednostka rzędnej | `"m"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `spaceIds` | array | Identyfikatory przestrzeni na tym poziomie (obliczane automatycznie) |
| `levelNumber` | number | Numeryczny indeks poziomu (0 = parter, ujemne = podziemie) |
| `levelHeight` | number | Wysokość kondygnacji (strop-strop) |
| `levelHeightUnit` | string | Jednostka wysokości |
| `typicalCeilingHeight` | number | **[DZIEDZICZONE PRZEZ PRZESTRZENIE]** Domyślna wysokość w świetle dla przestrzeni na tym poziomie |
| `typicalFinishes` | object | **[DZIEDZICZONE PRZEZ PRZESTRZENIE]** Domyślne wykończenia (podłoga, ściany, sufit, listwy) |
| `typicalEnvironmentalConditions` | object | **[DZIEDZICZONE PRZEZ PRZESTRZENIE]** Domyślne ustawienia HVAC (temperatura, wilgotność, wentylacja) |
| `levelRequirements` | array | **[DZIEDZICZONE PRZEZ PRZESTRZENIE]** Wymagania dotyczące wszystkich przestrzeni na tym poziomie |
| `grossFloorArea` | number | Całkowita PUM dla tego poziomu |
| `areaUnit` | string | Jednostka powierzchni |
| `levelType` | string | Typ poziomu (patrz wyliczenie poniżej) |
| `description` | string | Szczegółowy opis |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**⭐ NOWOŚĆ: Właściwości Dziedziczone (v0.1.4) — Zdefiniuj raz, dziedzicz wszędzie!**

Te pola automatycznie kaskadują do wszystkich pomieszczeń na tej kondygnacji:
- **typicalCeilingHeight** — Domyślna wysokość sufitu (np. 2,70m) → wszystkie sypialnie dziedziczą
- **typicalFinishes** — Standardowe wykończenia (podłoga dębowa, ściany malowane) → wszystkie pomieszczenia używają, chyba że nadpisane
- **typicalEnvironmentalConditions** — Ustawienia HVAC (20-26°C, 30-60% wilgotność) → wszystkie pomieszczenia dziedziczą
- **levelRequirements** — Wymagania ogólnokondygnacyjne → łączone z wymaganiami specyficznymi dla pomieszczenia

**Dlaczego to ważne:** Zamiast określać wysokość sufitu 50 razy dla 50 pokoi, określasz to RAZ tutaj. Pomieszczenia dziedziczą automatycznie, chyba że potrzebują czegoś innego (łazienka z obniżonym sufitem na 2,40m).

**Dla pozwolenia/zestawień powierzchni:**
- **grossFloorArea** — Całkowita powierzchnia kondygnacji w m²
- **levelHeight** — Wysokość kondygnacji (strop-strop) (np. 3,20m, różna od wysokości sufitu!)
- **levelNumber** — Indeks numeryczny (0 = parter, ujemne = podziemie)
- **levelType** — Kategoria: `ground`, `basement`, `typical`, `roof`

**Uwaga:** `spaceIds` jest **obliczane automatycznie**. Nie wypisujesz tu pomieszczeń — pomieszczenia wskazują poziom, a system śledzi relację odwrotną.
:::

## Typy Poziomów (Wyliczenie)

```typescript
type LevelType =
  | "basement"      // Poniżej poziomu terenu
  | "ground"        // Poziom terenu
  | "typical"       // Kondygnacja typowa
  | "roof"          // Poziom dachu
  | "mechanical"    // Maszynownia
  | "parking";      // Kondygnacja parkingowa
```

## Dziedziczenie Właściwości (Poziom → Przestrzeń)

**NOWOŚĆ w v0.1.4:** Poziomy mogą definiować typowe właściwości, które automatycznie kaskadują do wszystkich przestrzeni na tej kondygnacji. Eliminuje to powtórzenia — zdefiniuj wysokość sufitu raz, nie 50 razy.

### Kolejność Rozwiązywania Dziedziczenia

Gdy kompilator rozwiązuje właściwość dla przestrzeni:

1. **Wartość jawna w przestrzeni** (najwyższy priorytet) — zawsze wygrywa
2. **Szablon typu przestrzeni** — jeśli przestrzeń odwołuje się do `spaceTypeId`
3. **Dziedziczenie z poziomu** — z `level.typicalCeilingHeight`, `level.typicalFinishes` itp.
4. **Brak domyślnej** — ostrzeżenie walidacji, jeśli brak wymaganego pola

### Przykład: Dziedziczenie Wysokości Sufitu

```yaml
# Poziom definiuje typową wysokość sufitu
LVL-02:
  id: "LVL-02"
  levelName: "Kondygnacja 02"
  elevation: 3.20
  levelHeight: 3.00                 # strop-strop
  typicalCeilingHeight: 2.70        # ← DOMYŚLNA dla wszystkich pomieszczeń na tej kondygnacji

# Większość pomieszczeń dziedziczy automatycznie
sypialnia-01:
  id: "SP-BLD-01-L02-001"
  levelId: "LVL-02"
  # designHeight: 2.70  ← DZIEDZICZONE z poziomu, nie trzeba określać!

sypialnia-02:
  id: "SP-BLD-01-L02-002"
  levelId: "LVL-02"
  # designHeight: 2.70  ← DZIEDZICZONE z poziomu

salon:
  id: "SP-BLD-01-L02-003"
  levelId: "LVL-02"
  # designHeight: 2.70  ← DZIEDZICZONE z poziomu

# Pomieszczenia wyjątkowe nadpisują
lazienka-01:
  id: "SP-BLD-01-L02-004"
  levelId: "LVL-02"
  designHeight: 2.40  # ← NADPISANIE: obniżony sufit dla kanałów
```

**Rezultat:** 3 pomieszczenia dziedziczą 2,70m automatycznie, tylko 1 pomieszczenie wymaga jawnego nadpisania.

### Przykład: Dziedziczenie Wykończeń

```yaml
# Poziom definiuje typowe wykończenia
LVL-02:
  id: "LVL-02"
  typicalFinishes:
    floor: "deska_inzynierska_dab_naturalny"
    walls: "farba_biala_matowa"
    ceiling: "farba_biala_matowa"
    baseboard: "mdf_bialy_120mm"

# Większość pomieszczeń dziedziczy wykończenia
sypialnia-01:
  levelId: "LVL-02"
  # Wszystkie wykończenia dziedziczone z poziomu

sypialnia-02:
  levelId: "LVL-02"
  # Wszystkie wykończenia dziedziczone z poziomu

# Łazienka nadpisuje tylko to, co się różni
lazienka-01:
  levelId: "LVL-02"
  finishOverrides:
    floor: "plytki_ceramiczne_300x600_szare"     # nadpisz tylko podłogę
    walls: "plytki_ceramiczne_300x600_szare"     # nadpisz tylko ściany
    # sufit i listwy dziedziczone z poziomu
```

**Skompilowane wyjście dla lazienka-01:**
```json
{
  "id": "SP-BLD-01-L02-004",
  "finishes": {
    "floor": "plytki_ceramiczne_300x600_szare",  // z nadpisania
    "walls": "plytki_ceramiczne_300x600_szare",  // z nadpisania
    "ceiling": "farba_biala_matowa",             // dziedziczone z poziomu
    "baseboard": "mdf_bialy_120mm"               // dziedziczone z poziomu
  }
}
```

### Przykład: Dziedziczenie Warunków Środowiskowych

```yaml
# Poziom definiuje typowe ustawienia HVAC
LVL-02:
  typicalEnvironmentalConditions:
    temperatureRange:
      min: 20
      max: 26
      unit: "C"
    humidityRange:
      min: 30
      max: 60
    ventilationRate:
      value: 30
      unit: "m3/h/osoba"

# Wszystkie pomieszczenia mieszkalne dziedziczą te ustawienia
sypialnia-01:
  levelId: "LVL-02"
  # environmentalConditions dziedziczone z poziomu

# Serwerownia nadpisuje
serwerownia:
  levelId: "LVL-02"
  environmentalConditions:    # całkowite nadpisanie
    temperatureRange:
      min: 18
      max: 22
      unit: "C"
    humidityRange:
      min: 40
      max: 50
```

### Przykład: Łączenie Wymagań

```yaml
# Wymagania ogólnokondygnacyjne (dotyczą WSZYSTKICH pomieszczeń)
LVL-02:
  levelRequirements:
    - "REQ-PL-WT-ROOM-HEIGHT-001"      # min 2,50m sufit
    - "REQ-FIRE-FLOOR-RATING-REI-60"   # REI 60 strop

# Pomieszczenie dodaje specyficzne wymagania
sypialnia-01:
  levelId: "LVL-02"
  requirements:
    - "REQ-DAYLIGHT-SLEEPING-001"      # doświetlenie dla sypialni

# Skompilowane: połączone wymagania
# sypialnia-01 ma WSZYSTKIE TRZY wymagania:
# 1. REQ-PL-WT-ROOM-HEIGHT-001 (z poziomu)
# 2. REQ-FIRE-FLOOR-RATING-REI-60 (z poziomu)
# 3. REQ-DAYLIGHT-SLEEPING-001 (z przestrzeni)
```

---

## Przykład 1: Pierwszy Plik Poziomu (Minimalny)

**Najprostszy plik poziomu — parter:**

```markdown
Plik: levels/level-01.md

---
id: "LVL-01"
entityType: "level"
documentType: "level"
levelName: "Kondygnacja 01 (Parter)"
buildingId: "BLD-01"
elevation: 0.0
elevationUnit: "m"
version: "1.0.0"

# Dla pozwolenia/zestawień
levelNumber: 0
levelHeight: 3.20
grossFloorArea: 1250
---

# Kondygnacja 01: Parter

Kondygnacja wejściowa główna z holem i lokalami mieszkalnymi.
```

**To wszystko.** Gdy pomieszczenia odwołują się do `LVL-01`, automatycznie pojawiają się na liście pomieszczeń tej kondygnacji.

---

## Przykład 2: Poziom z Właściwościami Dziedziczonymi (Zalecane)

**Zdefiniuj typowe właściwości raz — wszystkie pomieszczenia dziedziczą:**

```markdown
Plik: levels/level-02.md

---
id: "LVL-02"
entityType: "level"
documentType: "level"
levelName: "Kondygnacja 02"
buildingId: "BLD-01"
elevation: 3.20
elevationUnit: "m"
version: "1.0.0"

levelNumber: 1
levelHeight: 3.00
grossFloorArea: 1200

# ⭐ Właściwości dziedziczone (NOWOŚĆ v0.1.4)
typicalCeilingHeight: 2.70    # Wszystkie pomieszczenia dziedziczą to jako designHeight
typicalFinishes:
  floor: "deska_inzynierska_dab_naturalny"
  walls: "farba_biala_matowa"
  ceiling: "farba_biala_matowa"
  baseboard: "mdf_bialy_120mm"

typicalEnvironmentalConditions:
  temperatureRange:
    min: 20
    max: 26
    unit: "C"
  humidityRange:
    min: 30
    max: 60

levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
  - "REQ-FIRE-FLOOR-RATING-REI-60"
---

# Kondygnacja 02: Typowa Kondygnacja Mieszkalna

Standardowa kondygnacja mieszkalna z 8 lokalami.

Wszystkie pomieszczenia na tej kondygnacji automatycznie otrzymują:
- Wysokość sufitu 2,70m (chyba że nadpisane)
- Podłoga dębowa i ściany malowane (chyba że nadpisane)
- Zakres temperatury 20-26°C
- Wymagania ogólnokondygnacyjne (odporność ogniowa, minimalna wysokość)

Tylko pomieszczenia wymagające czegoś innego (jak łazienki z płytkami ceramicznymi) określają nadpisania.
```

**Korzyść:** Zamiast określać wysokość sufitu i wykończenia w 40 plikach pomieszczeń, określasz raz tutaj. Oszczędza 90% powtórzeń.

---

## Przykład 3: Pełny Poziom (Wszystkie Szczegóły)

**Plik:** `docs/en/examples/green-terrace/levels/level-01.md`

**Plik:** `docs/en/examples/green-terrace/levels/level-01.md`

```markdown
---
documentType: "level"
entityType: "level"
id: "LVL-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
levelNumber: 0

elevation: 0.0
elevationUnit: "m"

levelHeight: 3.20
levelHeightUnit: "m"

grossFloorArea: 1250
areaUnit: "m2"

levelType: "ground"

description: >
  Ground floor with main entrance, lobby, and 8 residential units.
  Includes bike storage and mail room.

ifcMapping:
  ifcEntity: "IfcBuildingStorey"
  globalId: "2L3gI9$sNEyv4XzGv2MPzR"
  objectType: "Ground Floor"

version: "1.0.0"
tags:
  - "ground_floor"
  - "entrance"
  - "residential"
---

# Kondygnacja 01: Parter

Kondygnacja wejściowa gł&oacute;wna z holem i lokalami mieszkalnymi.

## Dane Kondygnacji

- **Rzędna:** 0.00 m (poziom terenu)
- **Wysokość kondygnacji (strop-strop):** 3.20 m
- **Powierzchnia użytkowa brutto:** 1 250 m&sup2;
- **Lokale:** 8 lokali mieszkalnych

## Przestrzenie na Tej Kondygnacji

- **Hol wejściowy:** 45 m&sup2;
- **Pomieszczenie poczty:** 12 m&sup2;
- **Przechowalnia rower&oacute;w:** 35 m&sup2;
- **Lokale mieszkalne:** 8 lokali (900 m&sup2; łącznie)
- **Korytarze:** 120 m&sup2;
- **Klatki schodowe:** 2 &times; 15 m&sup2; = 30 m&sup2;
- **Hol windowy:** 18 m&sup2;

## Komunikacja Pionowa

- **Klatki schodowe:** 2 chronione klatki schodowe (o odporności ogniowej)
- **Windy:** 1 winda obsługująca wszystkie kondygnacje
- **Dostęp:** Wejście gł&oacute;wne z poziomu ulicy
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "levels": [
      {
        "documentType": "level",
        "entityType": "level",
        "id": "LVL-01",
        "levelName": "Level 01 (Ground)",
        "buildingId": "BLD-01",
        "levelNumber": 0,
        "elevation": 0.0,
        "elevationUnit": "m",
        "levelHeight": 3.20,
        "levelHeightUnit": "m",
        "grossFloorArea": 1250,
        "areaUnit": "m2",
        "levelType": "ground",
        "description": "Ground floor with main entrance, lobby, and 8 residential units. Includes bike storage and mail room.",
        "spaceIds": [
          "SP-BLD-01-L01-001",
          "SP-BLD-01-L01-002",
          "SP-BLD-01-L01-003",
          "SP-BLD-01-L01-LOBBY",
          "SP-BLD-01-L01-MAIL",
          "SP-BLD-01-L01-BIKE",
          "SP-BLD-01-L01-CORR"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcBuildingStorey",
          "globalId": "2L3gI9$sNEyv4XzGv2MPzR",
          "objectType": "Ground Floor"
        },
        "version": "1.0.0",
        "tags": ["ground_floor", "entrance", "residential"]
      }
    ]
  }
}
```

## Relacje Odwrotne

Kompilator **automatycznie oblicza** `level.spaceIds` na podstawie odwołań z przestrzeni:

**Wejście:** Przestrzenie odwołują się do poziom&oacute;w
```yaml
# bedroom-01.md
levelId: "LVL-01"

# bedroom-02.md
levelId: "LVL-01"

# lobby.md
levelId: "LVL-01"
```

**Wynik:** Poziom automatycznie zawiera listę przestrzeni
```json
{
  "id": "LVL-01",
  "spaceIds": [
    "SP-BLD-01-L01-001",  // bedroom-01
    "SP-BLD-01-L01-002",  // bedroom-02
    "SP-BLD-01-L01-LOBBY" // lobby
  ]
}
```

## Konwencja Numerowania Kondygnacji

Zalecana numeracja kondygnacji:

| Numer Kondygnacji | Nazwa Kondygnacji | Typowe Użycie |
|-------------------|-------------------|---------------|
| `-2` | Podziemie 02 | Parking głęboki, maszynownia |
| `-1` | Podziemie 01 | Parking, magazyn |
| `0` | Parter | Wejście, hol, handel |
| `1` | Kondygnacja 01 | Pierwsza kondygnacja nadziemna |
| `2` | Kondygnacja 02 | Druga kondygnacja |
| `...` | ... | Kondygnacje typowe |
| `ROOF` | Dach | Wyjście na dach, maszynownia |

**Uwaga:** Numeracja parteru r&oacute;żni się w zależności od regionu:
- **Europa:** Parter = 0, pierwsze piętro = 1
- **Ameryka P&oacute;łnocna:** Parter = 1, pierwsze piętro = 1

## Mapowanie BIM

Kondygnacje mapują się na obiekty **IfcBuildingStorey** oraz Poziomy w Revit:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Level.SBM_ID` |
| `levelName` | `Name` | `Name` |
| `elevation` | `Elevation` | `Elevation` |
| `levelHeight` | `Height` | `Pset_BuildingStoreyCommon.NominalHeight` |
| `grossFloorArea` | `Gross Area` | `Pset_BuildingStoreyCommon.GrossFloorArea` |
| `levelNumber` | `SBM_Level_Number` | `Pset_SBM_Level.LevelNumber` |
| `spaceIds` | `SBM_Space_IDs` | `Pset_SBM_Level.SpaceIDs` |

## Odniesienie Wysokościowe

Wszystkie rzędne są relatywne do bazowego punktu projektu:

```yaml
# Budynek ustala punkt bazowy
building:
  id: "BLD-01"
  location:
    elevation: 100  # metr&oacute;w nad poziomem morza

# Poziomy są relatywne do bazy budynku
level:
  id: "LVL-01"
  elevation: 0.0  # parter = 100m n.p.m.

level:
  id: "LVL-02"
  elevation: 3.20  # 103.20m n.p.m.

level:
  id: "LVL-B01"
  elevation: -3.50  # podziemie = 96.50m n.p.m.
```

## Wysokość Kondygnacji (Strop-Strop)

**Wysokość kondygnacji** = odległość od tego poziomu do poziomu powyżej:

```yaml
LVL-01:
  elevation: 0.0
  levelHeight: 3.20  # 3.20m do LVL-02

LVL-02:
  elevation: 3.20
  levelHeight: 3.00  # 3.00m do LVL-03

LVL-03:
  elevation: 6.20
  levelHeight: 3.00  # 3.00m do LVL-04
```

R&oacute;żni się to od **wysokości pomieszczenia w świetle** (space.designHeight):

```yaml
# Przestrzeń na LVL-02
SP-BLD-01-L02-001:
  levelId: "LVL-02"
  designHeight: 2.70  # wysokość w świetle (sufit-podłoga)

# Poziom
LVL-02:
  levelHeight: 3.00  # wysokość strop-strop

# R&oacute;żnica: 3.00 - 2.70 = 0.30m (grubość stropu + wykończenia)
```

## Obliczenia Powierzchni

Powierzchnia brutto kondygnacji powinna odpowiadać sumie powierzchni przestrzeni:

```javascript
// Sprawdzenie walidacyjne podczas kompilacji
const levelArea = level.grossFloorArea;
const spacesOnLevel = spaces.filter(s => s.levelId === level.id);
const sumSpaceAreas = spacesOnLevel.reduce((sum, s) => sum + s.designArea, 0);

if (Math.abs(levelArea - sumSpaceAreas) > tolerance) {
  warnings.push(`Level ${level.id} area mismatch: ${levelArea} vs ${sumSpaceAreas}`);
}
```

## Sprawdzanie Zgodności

Wymagania specyficzne dla kondygnacji (odporność ogniowa, obciążenie stropu):

```json
{
  "levelComplianceDetails": [
    {
      "requirementId": "REQ-FIRE-FLOOR-RATING",
      "levelId": "LVL-01",
      "levelName": "Level 01 (Ground)",
      "metric": "floor_fire_rating",
      "targetValue": "REI 60",
      "measuredValue": "REI 90",
      "operator": ">=",
      "status": "compliant"
    }
  ]
}
```

## Kondygnacje Typowe a Niestandardowe

**Kondygnacje typowe** dzielą wsp&oacute;lne cechy:

```yaml
# Tworzenie szablonu dla typowych kondygnacji mieszkalnych
typical_residential_level:
  levelHeight: 3.00
  levelHeightUnit: "m"
  levelType: "typical"
  grossFloorArea: 1200
  areaUnit: "m2"

# Zastosowanie do wielu kondygnacji
LVL-02:
  <<: *typical_residential_level
  levelName: "Level 02"
  elevation: 3.20

LVL-03:
  <<: *typical_residential_level
  levelName: "Level 03"
  elevation: 6.20
```

**Kondygnacje niestandardowe** mają unikalne właściwości:

```yaml
LVL-ROOF:
  levelName: "Roof"
  levelType: "roof"
  elevation: 12.20
  levelHeight: 2.50
  description: "Mechanical penthouse and rooftop access"
```

## Proweniencja dziedziczenia (v0.2.0)

**NOWOŚĆ w v0.2.0:** Gdy kompilator rozwiązuje odziedziczone wartości z poziomu do przestrzeni, adnotuje skompilowane dane wyjściowe ze śledzeniem proweniencji.

### Jak działa proweniencja dziedziczenia

```yaml
# Skompilowane dane wyjściowe dla Przestrzeni 3.25
designHeight: 3.00
designHeight_meta:
  confidence: specified
  resolution: inherited
  inheritedFrom: "LVL-KPCPULM-D-PIETRO-02"
  inheritedField: "typicalCeilingHeight"
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.4"
```

Pole `resolution` informuje, jak wartość została uzyskana:

| Rozwiązanie | Znaczenie |
|------------|-----------|
| `explicit` | Wartość ustawiona bezpośrednio na przestrzeni |
| `inherited` | Wartość z pól `typical*` tego poziomu |
| `type_default` | Wartość z szablonu Typu Przestrzeni |
| `merged` | Wymagania scalone z wielu źródeł |

Pełny przewodnik: [Proweniencja danych](/pl/przewodniki/proweniencja-danych)

## Zobacz Także

- **[Karta Budynek](/pl/dokumentacja/encje/budynek)** - Kondygnacje należą do budynk&oacute;w
- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie należą do kondygnacji
- **[Proweniencja danych](/pl/przewodniki/proweniencja-danych)** - Pełny przewodnik śledzenia źródeł danych
- **Mapowanie BIM** - Mapowanie Poziom-IFC
