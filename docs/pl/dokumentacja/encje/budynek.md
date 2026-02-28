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

| Pole | Typ | Opis |
|------|-----|------|
| `siteId` | string | Referencja do nadrzędnej encji działki |
| `projectId` | string | Identyfikator projektu |
| `address` | object | Adres |
| `location` | object | Wsp&oacute;łrzędne geograficzne |
| `climateZone` | string | Klasyfikacja klimatyczna |
| `grossFloorArea` | number | Całkowita PUM w m&sup2; |
| `numberOfLevels` | number | Łączna liczba kondygnacji |
| `numberOfUnits` | number | Lokale mieszkalne (jeśli dotyczy) |
| `occupancyType` | string | Klasyfikacja użytkowania |
| `constructionType` | string | Typ konstrukcji budynku |
| `yearBuilt` | number | Rok budowy/oddania |
| `projectPhase` | string | Bieżąca faza projektu |
| `certifications` | array | Certyfikaty zrównoważonego budownictwa |
| `departments` | array | **[NOWOŚĆ v0.3.0]** Działy/oddziały z lokalizacją i personelem |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla pozwolenia na budowę:**
- **address** — Adres: ulica, miasto, kod pocztowy
- **grossFloorArea** — Całkowita PUM w m²
- **numberOfLevels** — Liczba kondygnacji
- **numberOfUnits** — Liczba lokali/mieszkań (dla budynków mieszkalnych)
- **occupancyType** — Klasyfikacja użytkowania (R-2, B, M, itp.)
- **constructionType** — Typ konstrukcji (Type_VA, Type_IIA, itp.)

**Dla zgodności energetycznej:**
- **climateZone** — Klasyfikacja klimatyczna (wpływa na wymagania izolacyjne)
- **certifications** — Cele BREEAM, LEED, WELL

**Dla lokalizacji/kontekstu:**
- **location** — Współrzędne GPS (szerokość, długość geograficzna)
- **yearBuilt** — Rok budowy

**Najczęściej:** Po prostu wypełnij adres, PUM, liczbę kondygnacji. Resztę można dodać później w razie potrzeby.
:::

## Typy Budynków (Wyliczenie)

```typescript
type BuildingType =
  | "residential_single_family"
  | "residential_multifamily"
  | "residential_mixed_use"
  | "office"
  | "retail"
  | "industrial"
  | "warehouse"
  | "educational"
  | "healthcare"
  | "hospitality"
  | "assembly"
  | "government"
  | "mixed_use";
```

## Przykład 1: Pierwszy Plik Budynku (Minimalny)

**Najprostszy plik budynku na start:**

```markdown
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

**To wszystko.** Certyfikaty energetyczne, strefę klimatyczną i współrzędne GPS można dodać później.

---

## Przykład 2: Pełny Budynek (Wszystkie Szczegóły)

**Plik:** `docs/en/examples/green-terrace/building.md`

```markdown
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

```yaml
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
