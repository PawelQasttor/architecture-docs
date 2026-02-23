# Referencja Schematu Frontmatter

Semantyczny Model Budynku (SBM) wykorzystuje **frontmatter YAML** na początku każdego dokumentu karty Markdown. Frontmatter dostarcza ustrukturyzowane metadane, które kompilator SBM waliduje, indeksuje i kompiluje do zunifikowanego modelu budynku.

Kanoniczna definicja schematu jest utrzymywana jako plik JSON Schema:

**Plik schematu:** [`schemas/sbm-schema-v0.2.json`](/schemas/sbm-schema-v0.2.json)

---

## Pola Wspólne

Każda karta SBM zawiera następujące wspólne pola frontmatter:

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | Unikalny identyfikator z prefiksem rodzaju karty (np. `SP-001`, `ZONE-FIRE-01`) |
| `entityType` | `string` | Tak | Jeden z: `building`, `level`, `zone`, `space`, `system`, `asset_instance`, `requirement` |
| `version` | `string` | Tak | Wersja semantyczna w formacie `MAJOR.MINOR.PATCH` (np. `1.0.0`) |
| `tags` | `string[]` | Nie | Dowolne tagi do kategoryzacji i filtrowania |
| `ifcMapping` | `object` | Nie | Mapowanie klasy IFC (zobacz [Mapowanie IFC](#mapowanie-ifc) poniżej) |

### Mapowanie IFC

Obiekt `ifcMapping` łączy dokument z danymi BIM:

```yaml
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "3cUkl32yn9qRSPvBJKz_12"
  objectType: "Office_TypeA"
```

| Pod-pole | Typ | Opis |
|----------|-----|------|
| `ifcEntity` | `string` | Klasa IFC (np. `IfcSpace`, `IfcZone`, `IfcSystem`) |
| `globalId` | `string` | IFC GlobalId do powiązania z konkretnym obiektem BIM |
| `objectType` | `string` | Klasyfikacja IFC ObjectType |

---

## Pola Specyficzne dla Rodzaju Karty

### Budynek

Reprezentuje budynek najwyższego poziomu w projekcie.

**Wzorzec ID:** `BLD-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `BLD-MAIN` |
| `entityType` | `string` | Tak | Musi być `"building"` |
| `name` | `string` | Tak | Czytelna nazwa budynku |
| `siteId` | `string` | Nie | Odniesienie do identyfikatora działki |
| `usage` | `string` | Nie | Główne przeznaczenie budynku (np. `"residential"`, `"office"`) |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Przykład:**

```yaml
---
id: "BLD-MAIN"
entityType: "building"
name: "Główny Budynek Biurowy"
siteId: "SITE-01"
usage: "office"
version: "1.0.0"
tags: ["biuro", "siedziba"]
---
```

---

### Kondygnacja

Reprezentuje kondygnację w budynku.

**Wzorzec ID:** `LVL-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `LVL-GF` |
| `entityType` | `string` | Tak | Musi być `"level"` |
| `name` | `string` | Tak | Nazwa poziomu (np. `"Parter"`) |
| `buildingId` | `string` | Tak | Odniesienie do budynku nadrzędnego |
| `order` | `integer` | Tak | Kolejność sortowania (0 = parter, -1 = piwnica, 1 = pierwsze piętro itd.) |
| `elevation` | `number` | Nie | Rzędna poziomu w jednostkach projektowych |
| `height` | `number` | Nie | Wysokość kondygnacji |
| `unit` | `string` | Nie | Jednostka miary (np. `"mm"`) |
| `version` | `string` | Tak | Wersja semantyczna |

**Przykład:**

```yaml
---
id: "LVL-GF"
entityType: "level"
name: "Parter"
buildingId: "BLD-MAIN"
order: 0
elevation: 0
height: 3500
unit: "mm"
version: "1.0.0"
---
```

---

### Przestrzeń

Reprezentuje pojedyncze pomieszczenie lub obszar w budynku.

**Wzorzec ID:** `SP-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `SP-101` |
| `entityType` | `string` | Tak | Musi być `"space"` |
| `spaceName` | `string` | Tak | Nazwa pomieszczenia lub przestrzeni |
| `spaceType` | `string` | Tak | Klasyfikacja typu (dozwolone wartości poniżej) |
| `buildingId` | `string` | Tak | Odniesienie do budynku nadrzędnego |
| `levelId` | `string` | Tak | Odniesienie do poziomu nadrzędnego |
| `zoneIds` | `string[]` | Nie | Strefy, do których należy ta przestrzeń |
| `designArea` | `number` | Nie | Projektowana powierzchnia (minimum 0) |
| `designHeight` | `number` | Nie | Projektowana wysokość sufitu (minimum 0) |
| `designVolume` | `number` | Nie | Projektowana kubatura (minimum 0) |
| `unit` | `string` | Nie | Jednostka miary |
| `requirements` | `string[]` | Nie | Identyfikatory wymagań dotyczących tej przestrzeni |
| `occupancy` | `object` | Nie | Szczegóły obłożenia (zobacz poniżej) |
| `maintenanceZone` | `string` | Nie | Przypisanie do strefy konserwacyjnej |
| `accessRestrictions` | `string` | Nie | Opis ograniczeń dostępu |
| `adjacentSpaces` | `object[]` | Nie | Relacje z sąsiednimi przestrzeniami |
| `ifcMapping` | `object` | Nie | Mapowanie IFC |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Dozwolone wartości `spaceType`:** `sleeping_space`, `bedroom`, `living_space`, `living_room`, `dining_space`, `dining_room`, `kitchen`, `bathroom`, `wet_room`, `corridor`, `staircase`, `storage`, `technical`, `office`, `meeting_room`, `open_office`, `break_room`, `elevator_lobby`, `entrance`, `classroom`, `retail`, `healthcare`, `assembly`

**Obiekt occupancy:**

| Pod-pole | Typ | Opis |
|----------|-----|------|
| `maxOccupants` | `integer` | Maksymalna liczba użytkowników |
| `usagePattern` | `string` | Opis wzorca użytkowania |
| `hoursPerDay` | `number` | Godziny pracy (0--24) |
| `daysPerWeek` | `integer` | Dni pracy (0--7) |

**Przykład:**

```yaml
---
id: "SP-101"
entityType: "space"
spaceName: "Biuro Otwarte"
spaceType: "open_office"
buildingId: "BLD-MAIN"
levelId: "LVL-01"
zoneIds: ["ZONE-HVAC-01", "ZONE-FIRE-01"]
designArea: 120.5
designHeight: 2800
unit: "mm"
requirements: ["REQ-TEMP-01", "REQ-LIGHT-01"]
occupancy:
  maxOccupants: 25
  usagePattern: "standard_office"
  hoursPerDay: 10
  daysPerWeek: 5
ifcMapping:
  ifcEntity: "IfcSpace"
  objectType: "OpenOffice_TypeA"
version: "1.0.0"
tags: ["biuro", "open-plan"]
---
```

**Szablon:** [Szablon przestrzeni](/pl/szablony/szablon-przestrzeni) | **Dokumentacja karty:** [Pomieszczenie](/pl/dokumentacja/encje/przestrzen)

---

### Strefa

Reprezentuje grupowanie przestrzeni według funkcji (pożarowa, akustyczna, HVAC itd.).

**Wzorzec ID:** `ZONE-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `ZONE-FIRE-01` |
| `entityType` | `string` | Tak | Musi być `"zone"` |
| `zoneName` | `string` | Tak | Nazwa strefy |
| `zoneType` | `string` | Tak | Klasyfikacja strefy (dozwolone wartości poniżej) |
| `buildingId` | `string` | Tak | Odniesienie do budynku nadrzędnego |
| `levelIds` | `string[]` | Nie | Poziomy objęte tą strefą |
| `spaceIds` | `string[]` | Nie | Przestrzenie zawarte w tej strefie |
| `requirements` | `string[]` | Nie | Identyfikatory wymagań |
| `properties` | `object` | Nie | Dowolne właściwości specyficzne dla strefy |
| `ifcMapping` | `object` | Nie | Mapowanie IFC |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Dozwolone wartości `zoneType`:** `fire`, `acoustic`, `hvac`, `security`, `lighting`, `thermal`, `access_control`

**Przykład:**

```yaml
---
id: "ZONE-FIRE-01"
entityType: "zone"
zoneName: "Strefa Pożarowa A - Parter"
zoneType: "fire"
buildingId: "BLD-MAIN"
levelIds: ["LVL-GF"]
spaceIds: ["SP-001", "SP-002", "SP-003"]
requirements: ["REQ-FIRE-01"]
properties:
  fireRating: "REI 60"
  maxArea: 2500
ifcMapping:
  ifcEntity: "IfcZone"
version: "1.0.0"
tags: ["bezpieczenstwo-pozarowe", "parter"]
---
```

**Szablon:** [Szablon strefy](/pl/szablony/szablon-strefy) | **Dokumentacja karty:** [Strefa](/pl/dokumentacja/encje/strefa)

---

### Instalacja

Reprezentuje system budynkowy (HVAC, elektryczny, sanitarny itd.).

**Wzorzec ID:** `SYS-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `SYS-HVAC-01` |
| `entityType` | `string` | Tak | Musi być `"system"` |
| `systemName` | `string` | Tak | Nazwa systemu |
| `systemType` | `string` | Tak | Typ systemu |
| `systemCategory` | `string` | Tak | Kategoria (dozwolone wartości poniżej) |
| `buildingId` | `string` | Tak | Odniesienie do budynku nadrzędnego |
| `servedZoneIds` | `string[]` | Nie | Strefy obsługiwane przez ten system |
| `servedSpaceIds` | `string[]` | Nie | Przestrzenie obsługiwane przez ten system |
| `assetInstanceIds` | `string[]` | Nie | Zasoby należące do tego systemu |
| `requirements` | `string[]` | Nie | Identyfikatory wymagań |
| `performance` | `object` | Nie | Dowolne dane wydajnościowe |
| `ifcMapping` | `object` | Nie | Mapowanie IFC |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Dozwolone wartości `systemCategory`:** `hvac`, `electrical`, `plumbing`, `fire_safety`, `security`, `communication`, `bms`, `renewable_energy`

**Przykład:**

```yaml
---
id: "SYS-HVAC-01"
entityType: "system"
systemName: "Centrala Wentylacyjna 1"
systemType: "air_handling_unit"
systemCategory: "hvac"
buildingId: "BLD-MAIN"
servedZoneIds: ["ZONE-HVAC-01"]
servedSpaceIds: ["SP-101", "SP-102", "SP-103"]
assetInstanceIds: ["AI-AHU-01", "AI-FILTER-01"]
requirements: ["REQ-TEMP-01", "REQ-VENT-01"]
performance:
  airflowRate: 5000
  airflowUnit: "m3/h"
  coolingCapacity: 50
  coolingUnit: "kW"
ifcMapping:
  ifcEntity: "IfcSystem"
  objectType: "AHU_TypeA"
version: "1.0.0"
tags: ["hvac", "ahu", "centrala"]
---
```

**Szablon:** [Szablon systemu](/pl/szablony/szablon-systemu) | **Dokumentacja karty:** [Instalacja](/pl/dokumentacja/encje/system)

---

### Urządzenie

Reprezentuje pojedynczy zainstalowany komponent lub urządzenie.

**Wzorzec ID:** `AI-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `AI-AHU-01` |
| `entityType` | `string` | Tak | Musi być `"asset_instance"` |
| `assetName` | `string` | Tak | Nazwa zasobu |
| `assetTypeId` | `string` | Nie | Odniesienie do wpisu w katalogu typów zasobów |
| `systemId` | `string` | Tak | Odniesienie do systemu nadrzędnego |
| `buildingId` | `string` | Tak | Odniesienie do budynku nadrzędnego |
| `locatedInSpaceId` | `string` | Nie | Przestrzeń, w której zasób jest fizycznie zlokalizowany |
| `identifiers` | `object` | Nie | Tag, numer seryjny, kod kreskowy |
| `manufacturer` | `string` | Nie | Nazwa producenta |
| `model` | `string` | Nie | Model produktu |
| `productCode` | `string` | Nie | Kod produktu producenta |
| `maintenanceData` | `object` | Nie | Interwały serwisowe, żywotność, gwarancja, części zamienne |
| `requirements` | `string[]` | Nie | Identyfikatory wymagań |
| `ifcMapping` | `object` | Nie | Mapowanie IFC |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Obiekt identifiers:**

| Pod-pole | Typ | Opis |
|----------|-----|------|
| `tag` | `string` | Tag urządzenia (np. `AHU-01`) |
| `serial` | `string` | Numer seryjny |
| `barcode` | `string` | Kod kreskowy lub kod QR |

**Obiekt maintenanceData:**

| Pod-pole | Typ | Opis |
|----------|-----|------|
| `serviceIntervalMonths` | `integer` | Interwał serwisowy w miesiącach |
| `expectedLifetimeYears` | `integer` | Oczekiwany czas eksploatacji |
| `warrantyYears` | `integer` | Okres gwarancji w latach |
| `sparePartsRequired` | `string[]` | Lista wymaganych części zamiennych |

**Przykład:**

```yaml
---
id: "AI-AHU-01"
entityType: "asset_instance"
assetName: "Centrala Wentylacyjna - Główna"
assetTypeId: "ATYPE-AHU-DAIKIN-D-AHU"
systemId: "SYS-HVAC-01"
buildingId: "BLD-MAIN"
locatedInSpaceId: "SP-TECH-01"
identifiers:
  tag: "AHU-01"
  serial: "DK-2026-00142"
  barcode: "4901234567890"
manufacturer: "Daikin"
model: "D-AHU P500"
productCode: "DAHU-P500-EU"
maintenanceData:
  serviceIntervalMonths: 6
  expectedLifetimeYears: 20
  warrantyYears: 5
  sparePartsRequired: ["filter_F7", "belt_V_A68"]
ifcMapping:
  ifcEntity: "IfcUnitaryEquipment"
  objectType: "AHU_Daikin_P500"
version: "1.0.0"
tags: ["hvac", "ahu", "daikin"]
---
```

**Szablon:** [Szablon zasobu](/pl/szablony/szablon-zasobu) | **Dokumentacja karty:** [Urządzenie](/pl/dokumentacja/encje/instancja-zasobu)

---

### Wymaganie

Reprezentuje wymaganie wydajnościowe, wymiarowe, regulacyjne lub bezpieczeństwa.

**Wzorzec ID:** `REQ-[A-Z0-9-]+`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | `string` | Tak | np. `REQ-TEMP-01` |
| `entityType` | `string` | Tak | Musi być `"requirement"` |
| `requirementName` | `string` | Tak | Czytelna nazwa wymagania |
| `requirementType` | `string` | Tak | Klasyfikacja (dozwolone wartości poniżej) |
| `countryScope` | `string` | Tak | Zasięg geograficzny (dozwolone wartości poniżej) |
| `scope` | `object` | Tak | Do czego odnosi się to wymaganie |
| `metric` | `string` | Tak | Mierzona wielkość (np. `"indoor_temperature"`) |
| `operator` | `string` | Tak | Operator porównania |
| `value` | `number / string / boolean / object` | Tak | Wartość docelowa lub zakres |
| `unit` | `string` | Nie | Jednostka miary |
| `tolerance` | `number` | Nie | Dopuszczalna tolerancja |
| `verification` | `object` | Tak | Sposób weryfikacji zgodności |
| `legalBasis` | `object[]` | Nie | Odniesienia do ustaw i rozporządzeń |
| `technicalBasis` | `object[]` | Nie | Odniesienia do norm technicznych |
| `version` | `string` | Tak | Wersja semantyczna |
| `tags` | `string[]` | Nie | Tagi |

**Dozwolone wartości `requirementType`:** `performance`, `dimensional`, `operational`, `regulatory`, `safety`, `functional`

**Dozwolone wartości `countryScope`:** `global`, `poland_specific`, `eu_specific`

**Dozwolone wartości `operator`:** `>=`, `<=`, `==`, `>`, `<`, `!=`, `in_range`

**Obiekt scope:**

| Pod-pole | Typ | Wymagane | Opis |
|----------|-----|----------|------|
| `entityType` | `string` | Tak | Rodzaj karty, którego dotyczy wymaganie |
| `spaceTypes` | `string[]` | Nie | Typy przestrzeni, których dotyczy |
| `spaceIds` | `string[]` | Nie | Konkretne identyfikatory przestrzeni |

**Obiekt verification:**

| Pod-pole | Typ | Wymagane | Opis |
|----------|-----|----------|------|
| `method` | `string` | Tak | Jeden z: `simulation`, `calculation`, `measurement`, `inspection`, `testing`, `certification`, `sensor` |
| `tool` | `string` | Nie | Narzędzie lub oprogramowanie do weryfikacji |
| `standard` | `string` | Nie | Norma referencyjna |
| `phase` | `string[]` | Tak | Fazy projektu: `concept`, `schematic`, `design_development`, `construction_documentation`, `construction`, `as_built`, `operation` |
| `frequency` | `string` | Nie | Częstotliwość weryfikacji (np. `"annual"`) |
| `responsible` | `string` | Nie | Strona odpowiedzialna |

**Przykład:**

```yaml
---
id: "REQ-TEMP-01"
entityType: "requirement"
requirementName: "Zakres Temperatury Wewnętrznej Biura"
requirementType: "performance"
countryScope: "eu_specific"
scope:
  entityType: "space"
  spaceTypes: ["office", "open_office", "meeting_room"]
metric: "indoor_temperature"
operator: "in_range"
value:
  min: 20
  max: 26
unit: "C"
tolerance: 1.0
verification:
  method: "sensor"
  tool: "BMS temperature sensors"
  standard: "PN-EN 16798-1"
  phase: ["design_development", "as_built", "operation"]
  frequency: "continuous"
  responsible: "facilities_manager"
legalBasis:
  - regulation: "WT_2021"
    section: "§ 134"
    description: "Warunki cieplne w budynkach"
technicalBasis:
  - standard: "PN-EN 16798-1"
    section: "Table NA.2"
    description: "Parametry wejściowe środowiska wewnętrznego"
version: "1.0.0"
tags: ["cieplne", "komfort", "biuro"]
---
```

**Szablon:** [Szablon wymagania](/pl/szablony/szablon-wymagania) | **Dokumentacja karty:** [Wymaganie](/pl/dokumentacja/encje/wymaganie)

---

## Walidacja

Kompilator SBM waliduje frontmatter każdej karty względem schematu JSON przed kompilacją. Typowe kontrole walidacji obejmują:

- **Format ID** -- Każdy rodzaj karty ma wymagany wzorzec (np. prefiks `SP-` dla przestrzeni)
- **Pola wymagane** -- Brakujące pola wymagane powodują błąd kompilacji
- **Integralność referencji** -- `buildingId`, `levelId`, `systemId` i inne odniesienia muszą wskazywać na istniejące karty
- **Wartości enum** -- Pola takie jak `spaceType`, `zoneType`, `systemCategory` i `operator` muszą używać dozwolonych wartości
- **Format wersji** -- Musi odpowiadać wzorcowi `MAJOR.MINOR.PATCH`

Szczegóły uruchamiania kompilatora znajdują się w [Pierwsze kroki z kompilatorem](/pl/dokumentacja/kompilator/pierwsze-kroki).

---

## Dalsze Materiały

- [Przegląd Dokumentacji SBM](/pl/dokumentacja/przeglad) -- Wprowadzenie do Semantycznego Modelu Budynku
- [Referencja kart](/pl/dokumentacja/encje/) -- Szczegółowa dokumentacja każdego rodzaju karty
- [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/) -- Jak tworzyć i zarządzać kartami SBM
- [Szablony](/pl/szablony/) -- Gotowe szablony dla każdego rodzaju karty
