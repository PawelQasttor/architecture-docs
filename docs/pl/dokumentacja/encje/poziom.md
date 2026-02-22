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
| `grossFloorArea` | number | Całkowita PUM dla tego poziomu |
| `areaUnit` | string | Jednostka powierzchni |
| `levelType` | string | Typ poziomu (patrz wyliczenie poniżej) |
| `description` | string | Szczeg&oacute;łowy opis |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

## Typy Poziom&oacute;w (Wyliczenie)

```typescript
type LevelType =
  | "basement"      // Poniżej poziomu terenu
  | "ground"        // Poziom terenu
  | "typical"       // Kondygnacja typowa
  | "roof"          // Poziom dachu
  | "mechanical"    // Maszynownia
  | "parking";      // Kondygnacja parkingowa
```

## Przykład: Źr&oacute;dło Markdown

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

## Zobacz Także

- **[Karta Budynek](/pl/dokumentacja/encje/budynek)** - Kondygnacje należą do budynk&oacute;w
- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie należą do kondygnacji
- **Mapowanie BIM** - Mapowanie Poziom-IFC
