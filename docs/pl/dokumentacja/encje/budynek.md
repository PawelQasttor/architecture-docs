# Budynek (Informacje o Projekcie)

## Czym To Jest

**Plik Budynku** zawiera informacje o projekcie: nazwa budynku, adres, powierzchnia, liczba kondygnacji. Tworzysz **jeden plik budynku na projekt**.

::: tip Dla Architektów
**Problem:** Podstawowe informacje o projekcie rozproszone po tabelach tytułowych, stronach tytułowych, zestawieniach Excel.

**Stary sposób:** Aktualizuj nazwę budynku w 6 różnych miejscach gdy klient zmienia nazwę projektu.

**Z plikiem budynku:** Zmień raz w `building.md` — wszystkie raporty, zestawienia pomieszczeń i dokumentacja aktualizują się automatycznie.

**Jeden plik budynku = wszystkie metadane projektu w jednym miejscu.**
:::

**Budynek** reprezentuje kontener najwyższego poziomu dla wszystkich kart budynkowych. Dostarcza metadane na poziomie projektu, informacje o lokalizacji i kontekst regulacyjny.

## Przeznaczenie

Budynki definiują:
- Identyfikację projektu i metadane
- Lokalizację geograficzną i dane klimatyczne
- Jurysdykcję regulacyjną (kraj, region)
- Klasyfikację i typ użytkowania budynku
- Fazę projektu i status realizacji

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator budynku | `"BLD-01"` |
| `entityType` | string | Musi być `"building"` | `"building"` |
| `documentType` | string | Musi być `"building"` | `"building"` |
| `buildingName` | string | Nazwa czytelna dla ludzi | `"Green Terrace Apartments"` |
| `buildingType` | string | Typ użytkowania budynku (patrz wyliczenie poniżej) | `"residential_multifamily"` |
| `country` | string | Kod kraju ISO 3166-1 alpha-2 | `"PL"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator budynku (np. `BLD-01`)
- **buildingName**: Nazwa projektu („Green Terrace Apartments")
- **buildingType**: Typ użytkowania — `residential_multifamily`, `office`, `retail`, `healthcare`
- **country**: Kod kraju — `PL` (Polska), `DE` (Niemcy), `GB` (UK), `US` (USA)
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 5 pól.** Kod kraju automatycznie ładuje właściwe przepisy budowlane (WT 2021 dla Polski, Building Regulations dla UK, itp.).
:::

## Pola Opcjonalne

### Dane podstawowe

| Pole | Typ | Opis |
|------|-----|------|
| `siteId` | string | Referencja do nadrzędnej encji działki |
| `campusId` | string | **[NOWOŚĆ v2.0]** Referencja do kampusu (dla zespołów budynków) |
| `address` | object | Adres (ulica, miasto, kod pocztowy) |
| `location` | object | Współrzędne geograficzne |
| `buildingType` | string | Typ użytkowania budynku (patrz wyliczenie poniżej) |
| `yearBuilt` | integer | Rok budowy/oddania |
| `yearRenovated` | integer | **[NOWOŚĆ v2.0]** Rok ostatniego remontu generalnego |

### Parametry budynku (NOWOŚĆ v2.0)

| Pole | Typ | Opis |
|------|-----|------|
| `grossFloorArea` | number | **Powierzchnia Użytkowa Budynku (PUB)** w m² — do ścian zewnętrznych |
| `netFloorArea` | number | **Powierzchnia Użytkowa Mieszkań (PUM)** w m² — bez konstrukcji, ścian, komunikacji |
| `rentableArea` | number | Powierzchnia najmu w m² (biura, handel) |
| `footprintArea` | number | Powierzchnia zabudowy w m² — rzut parteru |
| `numberOfStoreys` | object | Liczba kondygnacji: `aboveGround`, `belowGround`, `total` |
| `buildingHeight` | number | Całkowita wysokość budynku w m (od terenu do najwyższego punktu) |
| `eaveHeight` | number | Wysokość okapu/attyki w m (do warunków zabudowy) |
| `floorAreaRatio` | number | **Intensywność zabudowy** (PUB / powierzchnia działki) |
| `buildingCoverageRatio` | number | **Powierzchnia zabudowy** (rzut / powierzchnia działki, 0-1) |

### Klasyfikacja budowlana (NOWOŚĆ v2.0)

| Pole | Typ | Opis |
|------|-----|------|
| `occupancyClassification` | string | Kategoria zagrożenia ludzi: `ZL_I` - `ZL_V`, `PM`, `IN` (WT 2021) |
| `constructionClass` | string | Klasa odporności pożarowej: `A` - `E` (WT 2021 § 212) |
| `accessibilityCompliance` | string | Poziom dostępności: `standard`, `enhanced`, `full_universal_design` |

### System konstrukcyjny (NOWOŚĆ v2.0)

| Pole | Typ | Opis |
|------|-----|------|
| `structuralSystem.type` | string | Typ konstrukcji: `reinforced_concrete_frame`, `masonry_loadbearing`, `steel_frame`, `timber_frame`, `clt`, `hybrid` |
| `structuralSystem.lateralSystem` | string | System stabilizujący: `shear_walls`, `braced_frame`, `moment_frame`, `core_walls` |
| `structuralSystem.foundationType` | string | Typ fundamentów: `strip`, `pad`, `raft`, `piled` |
| `structuralSystem.designLife` | integer | Projektowany okres użytkowania w latach |

### Zrównoważoność (NOWOŚĆ v2.0)

| Pole | Typ | Opis |
|------|-----|------|
| `sustainability.energyPerformance.epcClass` | string | Klasa energetyczna: `A+` do `G` (świadectwo charakterystyki energetycznej) |
| `sustainability.energyPerformance.primaryEnergyDemand` | number | Zapotrzebowanie na energię pierwotną EP w kWh/(m²·rok) |
| `sustainability.energyPerformance.nearlyZeroEnergyBuilding` | boolean | Spełnia wymagania nZEB |
| `sustainability.embodiedCarbon.perM2KgCO2e` | number | Ślad węglowy wbudowany w kgCO2e/m² |
| `sustainability.embodiedCarbon.lcaStages` | string | Etapy LCA: `A1-A3`, `A1-A5`, `A1-C4`, `A1-D` (EN 15978) |
| `sustainability.certifications` | array | Certyfikaty: BREEAM, LEED, DGNB, WELL, Passive House |
| `sustainability.circularEconomy.designForDisassembly` | boolean | Projektowanie do demontażu |

### Klasyfikacja i odpowiedzialność (NOWOŚĆ v2.0)

| Pole | Typ | Opis |
|------|-----|------|
| `classification.uniclass` | string | Kod Uniclass 2015 |
| `classification.omniclass` | string | Kod OmniClass |
| `classification.csiDivision` | string | Numer działu CSI MasterFormat |
| `responsibility.discipline` | string | Dyscyplina: `architectural`, `structural`, `mechanical` |
| `responsibility.organization` | string | Nazwa firmy projektowej |

### Pozostałe

| Pole | Typ | Opis |
|------|-----|------|
| `departments` | array | Działy/oddziały z lokalizacją i personelem |
| `ifcMapping` | object | Mapowanie IFC (IfcBuilding) |
| `cost` | object | Koszty na poziomie budynku |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla warunków zabudowy / pozwolenia na budowę:**
- **grossFloorArea** — PUB/PUM w m² (wymagane w każdym wniosku)
- **numberOfStoreys** — Liczba kondygnacji nadziemnych i podziemnych
- **buildingHeight** / **eaveHeight** — Wysokość budynku i okapu
- **floorAreaRatio** — Intensywność zabudowy (porównaj z MPZP/WZ)
- **buildingCoverageRatio** — Powierzchnia zabudowy (porównaj z MPZP/WZ)
- **occupancyClassification** — Kategoria ZL (I-V) lub PM/IN
- **constructionClass** — Klasa odporności pożarowej (A-E)

**Dla świadectwa energetycznego (EPBD):**
- **sustainability.energyPerformance** — EP, klasa energetyczna, nZEB
- **sustainability.embodiedCarbon** — Ślad węglowy (coraz częściej wymagany w UE)
- **sustainability.certifications** — BREEAM, LEED, Passive House

**Dla studium wykonalności:**
- **structuralSystem** — Typ konstrukcji i fundamentów
- **footprintArea** — Powierzchnia zabudowy
- **yearBuilt** / **yearRenovated** — Dla budynków istniejących

**Najczęściej:** Wypełnij `grossFloorArea`, `numberOfStoreys`, `buildingHeight`, `occupancyClassification`. Resztę można dodać gdy pojawią się wymagania.
:::

## Typy Budynków (Wyliczenie v2.0)

```typescript
type BuildingType =
  | "residential_single_family"   // Dom jednorodzinny
  | "residential_multifamily"     // Budynek wielorodzinny
  | "residential_mixed"           // Mieszkaniowy mieszany
  | "office"                      // Biurowy
  | "commercial"                  // Handlowy
  | "retail"                      // Handel detaliczny
  | "industrial"                  // Przemysłowy
  | "warehouse"                   // Magazynowy
  | "healthcare"                  // Opieka zdrowotna
  | "hospital"                    // Szpital
  | "clinic"                      // Przychodnia
  | "educational"                 // Edukacyjny
  | "university"                  // Uczelnia
  | "school"                      // Szkoła
  | "hotel"                       // Hotel
  | "hospitality"                 // Gastronomia
  | "cultural"                    // Kulturalny
  | "religious"                   // Sakralny
  | "civic"                       // Użyteczności publicznej
  | "transportation"              // Transportowy
  | "parking_structure"           // Parking wielopoziomowy
  | "mixed_use"                   // Mieszany
  | "other";                      // Inny
```

## Klasyfikacja Zagrożenia Ludzi (WT 2021)

| Kategoria | Opis | Przykłady |
|-----------|------|-----------|
| `ZL_I` | Budynki użyteczności publicznej | Biura, handel, galerie |
| `ZL_II` | Budynki przeznaczone do użytku przez osoby o ograniczonej możliwości poruszania | Szpitale, przedszkola, domy opieki |
| `ZL_III` | Budynki użyteczności publicznej nieklasyfikowane jako ZL I i ZL II | Szkoły, uczelnie, muzea |
| `ZL_IV` | Budynki mieszkalne | Mieszkania, hotele, internaty |
| `ZL_V` | Budynki zamieszkania zbiorowego | Areszty, koszary |
| `PM` | Budynki produkcyjno-magazynowe | Fabryki, magazyny |
| `IN` | Budynki inwentarskie | Obory, stajnie |

## Klasa Odporności Pożarowej (WT 2021 § 212)

| Klasa | Wymagana odporność ogniowa | Typowe zastosowanie |
|-------|----------------------------|---------------------|
| `A` | REI 240 | Budynki wysokie (>55m), szpitale |
| `B` | REI 120 | Budynki średniowysokie (25-55m) |
| `C` | REI 60 | Budynki niskie (do 12m), ZL I-III |
| `D` | REI 30 | Budynki niskie, ZL IV |
| `E` | Brak wymagań | Budynki jednokondygnacyjne PM |

## Przykład 1: Pierwszy Plik Budynku (Minimalny)

**Najprostszy plik budynku na start:**

::: code-group

```md [Markdown]
Plik: building.md

---
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"
country: "PL"
version: "1.0.0"

# Dla pozwolenia na budowę
address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32
---

# Green Terrace Apartments

Budynek mieszkalny 32-mieszkaniowy w Warszawie.
4 kondygnacje, 4 850 m² PUM.
```

```yaml [YAML]
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"
country: "PL"
version: "1.0.0"

address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32
```

```json [JSON]
{
  "id": "BLD-01",
  "entityType": "building",
  "documentType": "building",
  "buildingName": "Green Terrace Apartments",
  "buildingType": "residential_multifamily",
  "country": "PL",
  "version": "1.0.0",
  "address": {
    "street": "ul. Słoneczna 42",
    "city": "Warsaw",
    "postalCode": "00-001"
  },
  "grossFloorArea": 4850,
  "numberOfLevels": 4,
  "numberOfUnits": 32
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "name", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^BLD-" },
    "entityType": { "const": "building" },
    "name": { "type": "string" },
    "grossFloorArea": { "type": "number" },
    "numberOfLevels": { "type": "integer" },
    "buildingType": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Certyfikaty energetyczne, strefę klimatyczną i współrzędne GPS można dodać później.

---

## Przykład 2: Pełny Budynek (Wszystkie Szczegóły)

**Plik:** `docs/en/examples/green-terrace/building.md`

::: code-group

```md [Markdown]
---
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

projectId: "PRJ-GREEN-TERRACE-2026"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"

country: "PL"
address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
  region: "Mazowieckie"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100
  elevationUnit: "m"

climateZone: "Dfb"  # Klasyfikacja K&ouml;ppena
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

occupancyType: "R-2"  # Klasyfikacja IBC
constructionType: "Type_VA"
yearBuilt: 2026

certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
  - name: "LEED"
    level: "Silver"
    status: "planned"

ifcMapping:
  ifcEntity: "IfcBuilding"
  globalId: "3K4hJ1$rMCxv2WxEt1LNxQ"
  objectType: "Residential"

version: "1.0.0"
tags:
  - "residential"
  - "multifamily"
  - "sustainable"
  - "warsaw"
---

# Budynek: Green Terrace Apartments

Zr&oacute;wnoważony budynek mieszkalny wielorodzinny w centrum Warszawy.

## Przegląd Projektu

- **Lokalizacja:** Warszawa, Mazowieckie, Polska
- **Typ:** Budynek mieszkalny wielorodzinny (32 lokale)
- **Powierzchnia użytkowa brutto:** 4 850 m&sup2;
- **Kondygnacje:** 4 nadziemne, 1 podziemna
- **Zakończenie:** III kwartał 2026

## Zr&oacute;wnoważony Rozw&oacute;j

- **BREEAM:** Very Good (w toku)
- **LEED:** Silver (planowany)
- **Energia:** Budynek niemal zeroenergetyczny (nZEB) wg WT 2021
- **Odnawialne źr&oacute;dła:** Fotowoltaika dachowa (50 kWp)

## Kontekst Regulacyjny

- **Kraj:** Polska
- **Jurysdykcja:** Miasto Stołeczne Warszawa
- **Przepisy budowlane:** WT 2021 (Warunki Techniczne)
- **Planowanie:** Zatwierdzenie MPZP uzyskane 2025-11-15
```

```yaml [YAML]
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

projectId: "PRJ-GREEN-TERRACE-2026"
buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"

country: "PL"
address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"
  region: "Mazowieckie"

location:
  latitude: 52.2297
  longitude: 21.0122
  elevation: 100
  elevationUnit: "m"

climateZone: "Dfb"
grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

occupancyType: "R-2"
constructionType: "Type_VA"
yearBuilt: 2026

certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
  - name: "LEED"
    level: "Silver"
    status: "planned"

ifcMapping:
  ifcEntity: "IfcBuilding"
  globalId: "3K4hJ1$rMCxv2WxEt1LNxQ"
  objectType: "Residential"

version: "1.0.0"
tags:
  - "residential"
  - "multifamily"
  - "sustainable"
  - "warsaw"
```

```json [JSON]
{
  "documentType": "building",
  "entityType": "building",
  "id": "BLD-01",
  "projectPhase": "design_development",
  "bimLOD": "LOD_300",
  "projectId": "PRJ-GREEN-TERRACE-2026",
  "buildingName": "Green Terrace Apartments",
  "buildingType": "residential_multifamily",
  "country": "PL",
  "address": {
    "street": "ul. Słoneczna 42",
    "city": "Warsaw",
    "postalCode": "00-001",
    "region": "Mazowieckie"
  },
  "location": {
    "latitude": 52.2297,
    "longitude": 21.0122,
    "elevation": 100,
    "elevationUnit": "m"
  },
  "climateZone": "Dfb",
  "grossFloorArea": 4850,
  "numberOfLevels": 4,
  "numberOfUnits": 32,
  "occupancyType": "R-2",
  "constructionType": "Type_VA",
  "yearBuilt": 2026,
  "certifications": [
    {
      "name": "BREEAM",
      "level": "Very Good",
      "status": "in_progress"
    },
    {
      "name": "LEED",
      "level": "Silver",
      "status": "planned"
    }
  ],
  "ifcMapping": {
    "ifcEntity": "IfcBuilding",
    "globalId": "3K4hJ1$rMCxv2WxEt1LNxQ",
    "objectType": "Residential"
  },
  "version": "1.0.0",
  "tags": ["residential", "multifamily", "sustainable", "warsaw"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "name", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^BLD-" },
    "entityType": { "const": "building" },
    "name": { "type": "string" },
    "grossFloorArea": { "type": "number" },
    "numberOfLevels": { "type": "integer" },
    "buildingType": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

:::

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "buildings": [
      {
        "documentType": "building",
        "entityType": "building",
        "id": "BLD-01",
        "projectId": "PRJ-GREEN-TERRACE-2026",
        "buildingName": "Green Terrace Apartments",
        "buildingType": "residential_multifamily",
        "country": "PL",
        "address": {
          "street": "ul. Słoneczna 42",
          "city": "Warsaw",
          "postalCode": "00-001",
          "region": "Mazowieckie"
        },
        "location": {
          "latitude": 52.2297,
          "longitude": 21.0122,
          "elevation": 100,
          "elevationUnit": "m"
        },
        "climateZone": "Dfb",
        "grossFloorArea": 4850,
        "numberOfLevels": 4,
        "numberOfUnits": 32,
        "occupancyType": "R-2",
        "constructionType": "Type_VA",
        "yearBuilt": 2026,
        "projectPhase": "design_development",
        "certifications": [
          {
            "name": "BREEAM",
            "level": "Very Good",
            "status": "in_progress"
          },
          {
            "name": "LEED",
            "level": "Silver",
            "status": "planned"
          }
        ],
        "ifcMapping": {
          "ifcEntity": "IfcBuilding",
          "globalId": "3K4hJ1$rMCxv2WxEt1LNxQ",
          "objectType": "Residential"
        },
        "version": "1.0.0",
        "tags": ["residential", "multifamily", "sustainable", "warsaw"]
      }
    ]
  }
}
```

## Ładowanie Pakiet&oacute;w Jurysdykcyjnych

Pole `country` wyzwala **ładowanie pakiet&oacute;w jurysdykcyjnych**:

```javascript
// Budynek definiuje kraj
{
  "country": "PL"  // Kod ISO 3166-1 alpha-2
}

// Kompilator automatycznie ładuje:
// - scripts/requirements/global/ (zawsze)
// - scripts/requirements/pl/ (ponieważ country = "PL")
```

**Obsługiwane kody kraj&oacute;w:**
- `PL` → Polska (WT 2021, Prawo budowlane)
- `DE` → Niemcy (DIN, EnEV) - przyszłość
- `GB` → Wielka Brytania (Building Regulations) - przyszłość
- `US` → Stany Zjednoczone (IBC, ASHRAE) - przyszłość
- `FR` → Francja (RT 2020) - przyszłość

## Mapowanie BIM

Budynki mapują się na obiekty **IfcBuilding**:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Building.SBM_ID` |
| `buildingName` | `Building Name` | `Name` |
| `buildingType` | `SBM_Building_Type` | `Pset_SBM_Building.BuildingType` |
| `country` | `SBM_Country` | `Pset_SBM_Building.Country` |
| `grossFloorArea` | `Gross Building Area` | `Pset_BuildingCommon.GrossPlannedArea` |
| `numberOfLevels` | `Number of Storeys` | `Pset_BuildingCommon.NumberOfStoreys` |
| `yearBuilt` | `Year Constructed` | `Pset_BuildingCommon.YearOfConstruction` |

## Klasyfikacja Stref Klimatycznych

Stosowana jest klasyfikacja klimatyczna K&ouml;ppena:

| Strefa | Opis | Przykłady |
|--------|------|-----------|
| `Dfb` | Klimat kontynentalny wilgotny, ciepłe lato | Warszawa, Moskwa, Montreal |
| `Cfb` | Klimat oceaniczny, ciepłe lato | Londyn, Paryż, Bruksela |
| `Csa` | Klimat śr&oacute;dziemnomorski, gorące lato | Ateny, Rzym, Lizbona |
| `BSk` | Klimat p&oacute;łsuchy chłodny | Denver, interior Madrytu |
| `Dfc` | Klimat subarktyczny | Helsinki, Sztokholm |

Strefa klimatyczna wpływa na:
- Liczbę stopniodni grzania/chłodzenia
- Wymagania izolacyjne (WT 2021 &sect; 328)
- Potencjał energii odnawialnej
- Strategie zabezpieczeń przed warunkami atmosferycznymi

## Typ Użytkowania

Stosowana jest klasyfikacja użytkowania IBC (International Building Code):

| Kod | Opis | Przykłady |
|-----|------|-----------|
| `R-2` | Budynek mieszkalny wielorodzinny | Apartamenty, akademiki |
| `R-1` | Budynek mieszkalny tymczasowy | Hotele, motele |
| `B` | Budynek biurowy | Biura, banki |
| `M` | Budynek handlowy | Sklepy, targowiska |
| `A-1` | Budynek zgromadzeń, stałe miejsca | Teatry, sale koncertowe |
| `E` | Budynek edukacyjny | Szkoły, uczelnie |
| `I-2` | Budynek instytucjonalny, medyczny | Szpitale, domy opieki |

Typ użytkowania wpływa na:
- Wymagania ochrony przeciwpożarowej
- Wymagania ewakuacyjne
- Wymagania dostępności
- Projektowanie system&oacute;w MEP

## Typ Konstrukcji

Stosowana jest klasyfikacja typu konstrukcji IBC:

| Typ | Opis | Odporność Ogniowa |
|-----|------|--------------------|
| `Type_IA` | Ogniotrwała, niepalna | Wysoka |
| `Type_IB` | Ogniotrwała, niepalna | Wysoka |
| `Type_IIA` | Niepalna | Umiarkowana |
| `Type_IIB` | Niepalna | Niska |
| `Type_IIIA` | Zwykła, chroniona palna | Umiarkowana |
| `Type_IIIB` | Zwykła, niechroniona palna | Niska |
| `Type_VA` | Szkielet drewniany, chroniony | Umiarkowana |
| `Type_VB` | Szkielet drewniany, niechroniony | Niska |

## Certyfikaty

Śledzenie certyfikat&oacute;w zr&oacute;wnoważonego budownictwa:

```yaml
certifications:
  - name: "BREEAM"
    level: "Very Good"
    status: "in_progress"
    assessor: "BRE Global"
    targetScore: 65

  - name: "LEED"
    version: "v4.1 BD+C"
    level: "Silver"
    status: "planned"
    targetPoints: 55

  - name: "WELL"
    version: "v2"
    level: "Gold"
    status: "design_review"
```

## Integracja z Raportem Kompilacji

Metadane budynku wypełniają nagł&oacute;wek raportu zgodności:

```json
{
  "projectMetadata": {
    "projectId": "PRJ-GREEN-TERRACE-2026",
    "buildingName": "Green Terrace Apartments",
    "country": "PL",
    "jurisdiction": "WT_2021",
    "projectPhase": "design_development",
    "bimLOD": "LOD_300",
    "complianceDate": "2026-02-20"
  }
}
```

## Działy / Oddziały (v0.3.0)

**NOWOŚĆ w v0.3.0:** Opcjonalna tablica `departments` definiuje strukturę organizacyjną budynku. Każdy dział ma identyfikator, do którego odwołują się przestrzenie przez pole `departmentId`.

### Struktura obiektu departamentu

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator działu (format: `DEPT-XXX`) | `"DEPT-SURGERY"` |
| `name` | string | Nazwa działu czytelna dla ludzi | `"Oddział Chirurgii"` |
| `description` | string | Opis funkcji i zakresu działalności działu | `"Blok operacyjny z 4 salami"` |
| `levelIds` | array | Identyfikatory kondygnacji zajmowanych przez dział | `["LVL-02", "LVL-03"]` |
| `headOfDepartment` | string | Kierownik działu (imię i nazwisko lub stanowisko) | `"dr hab. Jan Kowalski"` |
| `operatingHours` | string | Godziny pracy działu | `"24/7"` lub `"07:00-15:00"` |
| `staffCount` | number | Liczba personelu przypisanego do działu | `45` |

### Przykład: Szpital z oddziałami

::: code-group

```yaml [Markdown]
---
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Szpital Powiatowy w Krakowie"
buildingType: "healthcare"
country: "PL"
version: "1.0.0"

departments:
  - id: "DEPT-SURGERY"
    name: "Oddział Chirurgii Ogólnej"
    description: "Blok operacyjny z 4 salami operacyjnymi i zapleczem"
    levelIds: ["LVL-02"]
    headOfDepartment: "dr hab. Jan Kowalski"
    operatingHours: "07:00-19:00"
    staffCount: 45

  - id: "DEPT-ICU"
    name: "Oddział Intensywnej Terapii"
    description: "12-łóżkowy OIOM z wydzieloną izolatką"
    levelIds: ["LVL-02"]
    headOfDepartment: "dr Anna Nowak"
    operatingHours: "24/7"
    staffCount: 38

  - id: "DEPT-EMERGENCY"
    name: "Szpitalny Oddział Ratunkowy"
    description: "SOR z triaż, salami zabiegowymi i poczekalniami"
    levelIds: ["LVL-01"]
    headOfDepartment: "dr Piotr Wiśniewski"
    operatingHours: "24/7"
    staffCount: 52

  - id: "DEPT-RADIOLOGY"
    name: "Zakład Diagnostyki Obrazowej"
    description: "Pracownie CT, MRI, RTG, USG"
    levelIds: ["LVL-01"]
    headOfDepartment: "dr Maria Lewandowska"
    operatingHours: "24/7"
    staffCount: 22

  - id: "DEPT-ADMIN"
    name: "Administracja"
    description: "Dyrekcja, kadry, księgowość, sekretariat"
    levelIds: ["LVL-03"]
    operatingHours: "07:30-15:30"
    staffCount: 18
---
```

```yaml [YAML]
id: "BLD-01"
entityType: "building"
documentType: "building"
buildingName: "Szpital Powiatowy w Krakowie"
buildingType: "healthcare"
country: "PL"
version: "1.0.0"

departments:
  - id: "DEPT-SURGERY"
    name: "Oddział Chirurgii Ogólnej"
    description: "Blok operacyjny z 4 salami operacyjnymi i zapleczem"
    levelIds: ["LVL-02"]
    headOfDepartment: "dr hab. Jan Kowalski"
    operatingHours: "07:00-19:00"
    staffCount: 45

  - id: "DEPT-ICU"
    name: "Oddział Intensywnej Terapii"
    description: "12-łóżkowy OIOM z wydzieloną izolatką"
    levelIds: ["LVL-02"]
    headOfDepartment: "dr Anna Nowak"
    operatingHours: "24/7"
    staffCount: 38

  - id: "DEPT-EMERGENCY"
    name: "Szpitalny Oddział Ratunkowy"
    description: "SOR z triaż, salami zabiegowymi i poczekalniami"
    levelIds: ["LVL-01"]
    headOfDepartment: "dr Piotr Wiśniewski"
    operatingHours: "24/7"
    staffCount: 52

  - id: "DEPT-RADIOLOGY"
    name: "Zakład Diagnostyki Obrazowej"
    description: "Pracownie CT, MRI, RTG, USG"
    levelIds: ["LVL-01"]
    headOfDepartment: "dr Maria Lewandowska"
    operatingHours: "24/7"
    staffCount: 22

  - id: "DEPT-ADMIN"
    name: "Administracja"
    description: "Dyrekcja, kadry, księgowość, sekretariat"
    levelIds: ["LVL-03"]
    operatingHours: "07:30-15:30"
    staffCount: 18
```

```json [JSON]
{
  "id": "BLD-01",
  "entityType": "building",
  "documentType": "building",
  "buildingName": "Szpital Powiatowy w Krakowie",
  "buildingType": "healthcare",
  "country": "PL",
  "version": "1.0.0",
  "departments": [
    {
      "id": "DEPT-SURGERY",
      "name": "Oddział Chirurgii Ogólnej",
      "description": "Blok operacyjny z 4 salami operacyjnymi i zapleczem",
      "levelIds": ["LVL-02"],
      "headOfDepartment": "dr hab. Jan Kowalski",
      "operatingHours": "07:00-19:00",
      "staffCount": 45
    },
    {
      "id": "DEPT-ICU",
      "name": "Oddział Intensywnej Terapii",
      "description": "12-łóżkowy OIOM z wydzieloną izolatką",
      "levelIds": ["LVL-02"],
      "headOfDepartment": "dr Anna Nowak",
      "operatingHours": "24/7",
      "staffCount": 38
    },
    {
      "id": "DEPT-EMERGENCY",
      "name": "Szpitalny Oddział Ratunkowy",
      "description": "SOR z triaż, salami zabiegowymi i poczekalniami",
      "levelIds": ["LVL-01"],
      "headOfDepartment": "dr Piotr Wiśniewski",
      "operatingHours": "24/7",
      "staffCount": 52
    },
    {
      "id": "DEPT-RADIOLOGY",
      "name": "Zakład Diagnostyki Obrazowej",
      "description": "Pracownie CT, MRI, RTG, USG",
      "levelIds": ["LVL-01"],
      "headOfDepartment": "dr Maria Lewandowska",
      "operatingHours": "24/7",
      "staffCount": 22
    },
    {
      "id": "DEPT-ADMIN",
      "name": "Administracja",
      "description": "Dyrekcja, kadry, księgowość, sekretariat",
      "levelIds": ["LVL-03"],
      "operatingHours": "07:30-15:30",
      "staffCount": 18
    }
  ]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "name", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^BLD-" },
    "entityType": { "const": "building" },
    "name": { "type": "string" },
    "buildingType": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

:::

### Odwoływanie się do działów z przestrzeni

Przestrzenie odwołują się do działów za pomocą pola `departmentId`:

```yaml
# Sala operacyjna przypisana do Oddziału Chirurgii
---
id: "SP-BLD-01-L02-OR-01"
spaceName: "Sala Operacyjna 01"
spaceType: "operating_room"
departmentId: "DEPT-SURGERY"
levelId: "LVL-02"
---

# Sala OIOM przypisana do Oddziału Intensywnej Terapii
---
id: "SP-BLD-01-L02-ICU-01"
spaceName: "Stanowisko OIOM 01"
spaceType: "icu"
departmentId: "DEPT-ICU"
levelId: "LVL-02"
---
```

**Korzyści:**
- Grupowanie przestrzeni wg struktury organizacyjnej (nie tylko lokalizacyjnej)
- Raportowanie powierzchni i wyposażenia per oddział
- Śledzenie personelu i godzin pracy
- Koordynacja przepływów pacjentów między oddziałami

## Relacja z Działką

Budynki mogą odwoływać się do nadrzędnej działki polem `siteId`:

```yaml
---
id: "BLD-01"
entityType: "building"
siteId: "SITE-GREEN-TERRACE"  # Łączy z nadrzędną działką
buildingName: "Green Terrace Apartments"
---
```

Kompilator automatycznie oblicza odwrotność: tablica `buildingIds` działki zawiera wszystkie budynki, które się do niej odwołują. Zbiorczy koszt przepływa: przestrzenie → kondygnacje → budynki → działki → projekt.

## Zobacz Także

- **[Działka](/pl/dokumentacja/encje/dzialka)** - Budynki należą do działek
- **[Karta Kondygnacja](/pl/dokumentacja/encje/poziom)** - Budynki zawierają kondygnacje
- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Przestrzenie należą do budynków
- **[Przewodnik Kompilatora](/pl/dokumentacja/kompilator/)** - Kompilacja na poziomie budynku
- **Pakiety Jurysdykcyjne** - Wymagania specyficzne dla kraju
