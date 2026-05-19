# Szybki Przegląd: Wszystkie 27 Typów Encji

::: tip Do Czego Służy Ta Strona
Jednostronicowy przegląd wszystkich typów encji SBM — kluczowe pola, formaty ID i kiedy używać każdego typu. Używaj jako ściągawki podczas tworzenia plików encji.
:::

---

## Drzewo Decyzyjne: Który Typ Encji?

```
Co dokumentujesz?

TEREN I BUDYNEK
├─ Działka/parcela → DZIAŁKA (Site)
├─ Całe budynki → BUDYNEK (Building)
└─ Pojedyncze piętro → KONDYGNACJA (Level)

POMIESZCZENIA I OBSZARY
├─ Pojedyncze pomieszczenie → PRZESTRZEŃ (Space)
├─ Szablon dla podobnych pomieszczeń → TYP PRZESTRZENI (Space Type)
├─ Grupa pomieszczeń (pożar/akustyka/HVAC) → STREFA (Zone)
└─ Szablon strefy → TYP STREFY (Zone Type)

KONSTRUKCJA I OBUDOWA
├─ Ściana/dach/strop → PRZEGRODA (Envelope)
├─ Okno/drzwi w przegrodzie → OTWÓR (Opening)
├─ Szablon okna/drzwi → TYP OTWORU (Opening Type)
├─ Klatka/winda/rampa → KOMUNIKACJA PIONOWA (Vertical Circulation)
├─ Krajobraz/parking/tereny zielone → ELEMENT TERENU (Site Feature)
└─ Szablon elementu terenu → TYP ELEMENTU TERENU (Site Feature Type)

SYSTEMY I WYPOSAŻENIE
├─ System MEP (HVAC/elektryczny/wod.-kan.) → INSTALACJA (System)
├─ Szablon systemu → TYP SYSTEMU (System Type)
├─ Kocioł/pompa/panel → ZASÓB (Asset)
└─ Szablon produktu → TYP ZASOBU (Asset Type)

KONSTRUKCJA NOŚNA (NOWOŚĆ v2.0)
├─ Ustrój konstrukcyjny → SYSTEM KONSTRUKCYJNY (Structural System)
├─ Specyfikacja materiału → TYP MATERIAŁU (Material Type)
└─ Konkretne zastosowanie materiału → MATERIAŁ (Material)

WYMAGANIA I PRZEPISY
├─ Reguła wydajności/przepis → WYMAGANIE (Requirement)
└─ Faza budowy → PAKIET BUDOWLANY (Construction Package)

ADMINISTRACJA BUDOWY (NOWOŚĆ v2.0)
├─ RFI/zmiana/usterka → ZGŁOSZENIE (Issue)
├─ Test odbiorowy → TEST ODBIORU (Commissioning Test)
└─ Trasa ewakuacji/dostępności → TRASA KOMUNIKACJI (Circulation Route)

PLANOWANIE (NOWOŚĆ v2.0)
├─ Program funkcjonalny → PROGRAM PRZESTRZENNY (Space Program)
└─ Zespół budynków → KAMPUS (Campus)
```

---

## Encje Terenu i Budynku

### Działka (Site)

**Co to jest**: Parcela/teren z granicami prawnymi

**Kluczowe pola**:
- `siteArea` — Powierzchnia działki (m²)
- `address` — Adres działki
- `legalDescription` — Opis prawny parceli

**Format ID**: `SITE-{descriptor}` (np. `SITE-MAIN`)

**Kiedy używać**: Masz teren z granicami, współrzędnymi GPS, dokumentacją geodezyjną

---

### Budynek (Building)

**Co to jest**: Cała konstrukcja budowlana z dachem i ścianami

**Kluczowe pola**:
- `buildingName` — Nazwa budynku
- `totalFloorArea` — Łączna powierzchnia (m²)
- `numberOfStoreys` — Liczba kondygnacji

**Format ID**: `BLD-{number}` (np. `BLD-01`, `BLD-02`)

**Kiedy używać**: Dla każdego fizycznego budynku na działce

---

### Kondygnacja (Level)

**Co to jest**: Jedno piętro budynku na określonej wysokości

**Kluczowe pola**:
- `levelElevation` — Wysokość kondygnacji (m)
- `typicalCeilingHeight` — Typowa wysokość sufitu (m)
- `floorArea` — Powierzchnia kondygnacji (m²)

**Format ID**: `LVL-{number}` (np. `LVL-00`, `LVL-01`)

**Kiedy używać**: Dla każdego piętra (parter, piętro 1, piętro 2, itp.)

**Wskazówka**: Ustaw `typicalCeilingHeight` — pomieszczenia dziedziczą jako `designHeight`

---

## Encje Pomieszczeń i Obszarów

### Przestrzeń (Space)

**Co to jest**: Pojedyncze pomieszczenie lub obszar funkcjonalny

**Kluczowe pola**:
- `spaceName` — Nazwa pomieszczenia
- `designArea` — Powierzchnia projektowa (m²)
- `designHeight` — Wysokość projektowa (m)
- `spaceType` — Kategoria funkcjonalna (enum: `sleeping_space`, `kitchen`, itp.)
- `spaceTypeId` — ID szablonu typu przestrzeni (opcjonalne)

**Format ID**: `SP-{building}-{level}-{number}` (np. `SP-BLD-01-L01-001`)

**Kiedy używać**: Dla każdego pomieszczenia (sypialnia, kuchnia, łazienka, biuro, itp.)

**Kluczowe rozróżnienie**:
- `spaceType` (enum) = kategoria funkcjonalna z listy
- `spaceTypeId` (referencja) = odnosi się do szablonu typu przestrzeni

---

### Typ Przestrzeni (Space Type)

**Co to jest**: Szablon dla podobnych pomieszczeń

**Kluczowe pola**:
- `typeName` — Nazwa typu
- `spaceType` — Kategoria funkcjonalna
- `requirements` — Wymagania stosowane do wszystkich instancji
- `finishes` — Standardowe wykończenia
- `equipment` — Standardowe wyposażenie

**Format ID**: `ST-{category}-{descriptor}` (np. `ST-BEDROOM-STANDARD-A`)

**Kiedy używać**: Gdy masz 5+ podobnych pomieszczeń (np. 20 identycznych sypialni)

**Korzyści**: Zdefiniuj specyfikacje raz → wszystkie instancje dziedziczą

---

### Strefa (Zone)

**Co to jest**: Grupa pomieszczeń o wspólnej charakterystyce

**Kluczowe pola**:
- `zoneName` — Nazwa strefy
- `zoneType` — Kategoria (enum: `fire`, `acoustic`, `hvac`, `security`, itp.)
- `zoneTypeId` — ID szablonu typu strefy (opcjonalne)
- `spaceIds` — AUTO-OBLICZANE (nie pisz ręcznie!)

**Format ID**: `ZONE-{type}-{descriptor}` (np. `ZONE-FIRE-NORTH-L01`)

**Kiedy używać**: Strefy pożarowe, strefy akustyczne, strefy HVAC, strefy bezpieczeństwa

**Wskazówka**: Napisz `zoneIds` w plikach przestrzeni → kompilator wypełnia `spaceIds`

---

### Typ Strefy (Zone Type)

**Co to jest**: Szablon dla podobnych stref

**Kluczowe pola**:
- `typeName` — Nazwa typu
- `zoneType` — Kategoria strefy
- `requirements` — Wymagania stosowane do wszystkich instancji
- `properties` — Właściwości specyficzne dla strefy (fireResistance, maxEscapeDistance, itp.)

**Format ID**: `ZT-{type}-{descriptor}` (np. `ZT-FIRE-ZL-IV`)

**Kiedy używać**: Identyczne strefy pożarowe na wielu piętrach lub identyczne strefy HVAC w wielu budynkach

---

## Encje Konstrukcji i Obudowy

### Przegroda (Envelope)

**Co to jest**: Ściana, dach, strop lub podłoga z warstwami materiałowymi

**Kluczowe pola**:
- `envelopeName` — Nazwa przegrody
- `envelopeType` — Typ (enum: `external_wall`, `internal_wall`, `roof`, `floor`, `ceiling`)
- `uValue` — Współczynnik przenikania ciepła (W/(m²·K))
- `fireRating` — Klasa ognioodporności (REI 60, REI 90, itp.)

**Format ID**: `ENV-{type}-{descriptor}` (np. `ENV-WALL-EXT-A`, `ENV-ROOF-MAIN`)

**Kiedy używać**: Ściany zewnętrzne, dachy, przegrody pożarowe, ściany akustyczne

---

### Otwór (Opening)

**Co to jest**: Okno, drzwi lub świetlik w przegrodzie

**Kluczowe pola**:
- `openingName` — Nazwa otworu
- `openingType` — Typ (enum: `window`, `door`, `skylight`, `curtain_wall`, itp.)
- `openingTypeId` — ID szablonu typu otworu (opcjonalne)
- `width`, `height` — Wymiary (m)
- `uValue` — Współczynnik przenikania ciepła

**Format ID**: `OPN-{descriptor}` (np. `OPN-WIN-01`, `OPN-DOOR-MAIN`)

**Kiedy używać**: Okna, drzwi, świetliki wymagające śledzenia właściwości termicznych/akustycznych/pożarowych

---

### Typ Otworu (Opening Type)

**Co to jest**: Szablon specyfikacji dla okien/drzwi

**Kluczowe pola**:
- `typeName` — Nazwa typu produktu
- `openingType` — Kategoria
- `manufacturer` — Producent
- `uValue`, `acousticRating`, `fireRating` — Właściwości

**Format ID**: `OT-{category}-{descriptor}` (np. `OT-WINDOW-PVC-TRIPLE`)

**Kiedy używać**: 10+ identycznych okien lub drzwi

---

### Komunikacja Pionowa (Vertical Circulation)

**Co to jest**: Klatka schodowa, winda, rampa łącząca kondygnacje

**Kluczowe pola**:
- `circulationName` — Nazwa
- `circulationType` — Typ (enum: `staircase`, `elevator`, `ramp`, `escalator`, itp.)
- `connectedLevelIds` — Kondygnacje łączone (minimum 2)
- `isFireEscape` — Czy droga ewakuacji?

**Format ID**: `VC-{type}-{descriptor}` (np. `VC-STAIR-A`, `VC-ELEV-01`)

**Kiedy używać**: Klatki schodowe, windy, rampy, schody ruchome

---

### Element Terenu (Site Feature)

**Co to jest**: Krajobraz, parking, chodnik, tereny zielone na działce

**Kluczowe pola**:
- `featureName` — Nazwa elementu
- `featureType` — Typ (enum: `walkway`, `parking`, `green_infrastructure`, `landscaping`, itp.)
- `area` — Powierzchnia (m²)

**Format ID**: `SF-{descriptor}` (np. `SF-WALKWAY-MAIN`, `SF-PARKING-VISITORS`)

**Kiedy używać**: Chodniki, parkingi, ogrody, dachy zielone, elementy odwodnienia

---

### Typ Elementu Terenu (Site Feature Type)

**Co to jest**: Szablon dla podobnych elementów terenu

**Kluczowe pola**:
- `typeName` — Nazwa typu
- `featureType` — Kategoria
- `constructionDetails` — Szczegóły konstrukcyjne

**Format ID**: `SFT-{category}-{descriptor}` (np. `SFT-WALKWAY-CONCRETE`)

**Kiedy używać**: Standardowe elementy powtarzane na terenie

---

## Encje Systemów i Wyposażenia

### Instalacja (System)

**Co to jest**: System techniczny budynku (HVAC, elektryczny, wod.-kan., pożarowy, BMS)

**Kluczowe pola**:
- `systemName` — Nazwa systemu
- `systemCategory` — Kategoria (enum: `hvac`, `electrical`, `plumbing`, `fire_safety`, itp.)
- `systemTypeId` — ID szablonu typu systemu (opcjonalne)
- `assetIds` — AUTO-OBLICZANE (nie pisz ręcznie!)

**Format ID**: `SYS-{category}-{descriptor}` (np. `SYS-HVAC-01`)

**Kiedy używać**: Dla każdego głównego systemu MEP

**Wskazówka**: Napisz `systemId` w plikach zasobów → kompilator wypełnia `assetIds`

---

### Typ Systemu (System Type)

**Co to jest**: Szablon dla podobnych systemów

**Kluczowe pola**:
- `typeName` — Nazwa typu
- `systemCategory` — Kategoria systemu
- `requirements` — Wymagania stosowane do wszystkich instancji
- `components` — Standardowa lista komponentów
- `typicalPerformance` — Charakterystyki wydajności

**Format ID**: `SYT-{category}-{descriptor}` (np. `SYT-HVAC-RESIDENTIAL-MVHR`)

**Kiedy używać**: Identyczne systemy w wielu budynkach lub na wielu piętrach

---

### Zasób (Asset)

**Co to jest**: Konkretny zainstalowany produkt (kocioł, pompa ciepła, panel, czujnik)

**Kluczowe pola**:
- `assetName` — Nazwa zasobu
- `assetTypeId` — ID szablonu typu zasobu (opcjonalne)
- `serialNumber` — Numer seryjny
- `installationDate` — Data instalacji
- `systemId` — System nadrzędny

**Format ID**: `AST-{category}-{number}` (np. `AST-HP-01`)

**Kiedy używać**: Wyposażenie wymagające śledzenia konserwacji, wymian, gwarancji

---

### Typ Zasobu (Asset Type)

**Co to jest**: Szablon specyfikacji produktu

**Kluczowe pola**:
- `typeName` — Nazwa produktu
- `category` — Kategoria (hvac, electrical, plumbing, itp.)
- `manufacturer`, `model` — Dane producenta
- `specifications` — Specyfikacje techniczne
- `maintenanceProfile` — Harmonogram konserwacji

**Format ID**: `AT-{manufacturer}-{model}` (np. `AT-BOSCH-HP-300`)

**Kiedy używać**: 5+ identycznych produktów (np. 50 pomp ciepła)

---

## Encje Wymagań i Fazowania

### Wymaganie (Requirement)

**Co to jest**: Reguła wydajności, przepis lub kryterium projektowe

**Typy**:
- **Liczbowe**: `metric`, `operator`, `value`, `unit` (np. wysokość >= 2,50 m)
- **Jakościowe**: `qualitativeDescription`, `acceptanceCriteria`

**Kluczowe pola**:
- `requirementName` — Nazwa wymagania
- `jurisdictionCode` — Kod jurysdykcji (PL, UK, EU, itp.)
- `scope` — Zakres (fire_safety, accessibility, daylight, itp.)

**Format ID**: `REQ-{jurisdiction}-{scope}-{number}` (np. `REQ-PL-WT-HEIGHT-001`)

**Kiedy używać**: Przepisy budowlane, normy wydajności, kryteria klienta

**Drzewo decyzyjne**:
- Czy możesz wyrazić jako [metryka] [operator] [wartość]? → Liczbowe
- W przeciwnym razie → Jakościowe

---

### Pakiet Budowlany (Construction Package)

**Co to jest**: Faza budowy z harmonogramem i kosztami

**Kluczowe pola**:
- `packageName` — Nazwa pakietu
- `startDate`, `endDate` — Harmonogram
- `estimatedCost` — Szacunkowy koszt
- `dependencies` — Zależności od innych pakietów

**Format ID**: `CP-{descriptor}` (np. `CP-STRUCTURE`, `CP-ENVELOPE`)

**Kiedy używać**: Wielofazowa budowa, harmonogram wykonania, śledzenie budżetu

---

## Podsumowanie Formatów ID

| Typ Encji | Prefiks | Przykład |
|-----------|---------|----------|
| Działka | `SITE-` | `SITE-MAIN` |
| Budynek | `BLD-` | `BLD-01` |
| Kondygnacja | `LVL-` | `LVL-01` |
| Przestrzeń | `SP-` | `SP-BLD-01-L01-001` |
| Typ Przestrzeni | `ST-` | `ST-BEDROOM-A` |
| Przegroda | `ENV-` | `ENV-WALL-EXT-A` |
| Otwór | `OPN-` | `OPN-WIN-01` |
| Typ Otworu | `OT-` | `OT-WINDOW-PVC` |
| Komunikacja Pionowa | `VC-` | `VC-STAIR-A` |
| Element Terenu | `SF-` | `SF-WALKWAY-01` |
| Typ Elementu Terenu | `SFT-` | `SFT-WALKWAY-CONCRETE` |
| Strefa | `ZONE-` | `ZONE-FIRE-NORTH` |
| Typ Strefy | `ZT-` | `ZT-FIRE-ZL-IV` |
| Wymaganie | `REQ-` | `REQ-PL-WT-001` |
| Instalacja | `SYS-` | `SYS-HVAC-01` |
| Typ Systemu | `SYT-` | `SYT-HVAC-RESIDENTIAL` |
| Zasób | `AST-` | `AST-HP-01` |
| Typ Zasobu | `AT-` | `AT-BOSCH-HP-300` |
| Pakiet Budowlany | `CP-` | `CP-STRUCTURE` |

---

## Kluczowe Rozróżnienia

### spaceType (enum) vs spaceTypeId (referencja)

- **`spaceType`**: Kategoria funkcjonalna z listy (np. `sleeping_space`, `kitchen`)
- **`spaceTypeId`**: ID szablonu typu przestrzeni (np. `ST-BEDROOM-STANDARD-A`)

**Analogicznie**:
- `zoneType` (enum) vs `zoneTypeId` (referencja)
- `systemCategory` (enum) vs `systemTypeId` (referencja)

### Referencje Wprost vs Wsteczne

**Referencje wprost (TY piszesz)**:
- `Space.zoneIds` → które strefy
- `Space.levelId` → która kondygnacja
- `Asset.systemId` → który system

**Referencje wsteczne (KOMPILATOR oblicza)**:
- `Zone.spaceIds` ← z `Space.zoneIds`
- `Level.spaceIds` ← z `Space.levelId`
- `System.assetIds` ← z `Asset.systemId`

**Zasada**: **Nigdy ręcznie nie piszesz** referencji wstecznych.

---

## Wzorzec Typ/Instancja

**Typy** (Szablony):
- Space Type, Zone Type, System Type, Asset Type, Opening Type, Site Feature Type

**Kiedy używać typów**:
- ✅ 5+ podobnych instancji
- ✅ Chcesz gwarantowanej spójności
- ✅ Aktualizacja w jednym miejscu → wpływa na wszystkie

**Korzyści**:
- Zdefiniuj raz (wymagania, wykończenia, specyfikacje)
- Wszystkie instancje dziedziczą
- Redukcja dokumentacji o 26-66%

---

## Encje v2.0: Konstrukcja, Materiały, Administracja

### Kampus (Campus) — NOWOŚĆ v2.0

**Co to jest**: Kontener dla zespołu budynków na wielu działkach
| Pole | Przykład |
|------|----------|
| `id` | `"CAM-HOSPITAL-COMPLEX"` |
| `entityType` | `"campus"` |
| `campusName` | `"Kompleks Szpitalny Mokotów"` |
| `campusType` | `"hospital_complex"` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/kampus)**

### Program Przestrzenny (Space Program) — NOWOŚĆ v2.0

**Co to jest**: Ilościowy program funkcjonalny — ile pomieszczeń każdego typu potrzeba
| Pole | Przykład |
|------|----------|
| `id` | `"PROG-PATIENT-ROOMS"` |
| `entityType` | `"space_program"` |
| `requiredQuantity` | `50` |
| `designedQuantity` | `48` (auto) |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/program-przestrzenny)**

### Typ Materiału (Material Type) — NOWOŚĆ v2.0

**Co to jest**: Specyfikacja materiału z właściwościami fizycznymi, ogniowymi i zrównoważoności
| Pole | Przykład |
|------|----------|
| `id` | `"MT-CONCRETE-C30"` |
| `entityType` | `"material_type"` |
| `materialCategory` | `"concrete"` |
| `sustainability.embodiedCarbonKgCO2ePerKg` | `0.11` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/typ-materialu)**

### Materiał (Material) — NOWOŚĆ v2.0

**Co to jest**: Konkretne zastosowanie materiału w projekcie z ilością i stanem zamówienia
| Pole | Przykład |
|------|----------|
| `id` | `"MAT-EXT-INSULATION-001"` |
| `entityType` | `"material"` |
| `materialTypeId` | `"MT-MINERAL-WOOL-035"` |
| `procurementStatus` | `"ordered"` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/material)**

### System Konstrukcyjny (Structural System) — NOWOŚĆ v2.0

**Co to jest**: Opis ustroju konstrukcyjnego budynku — szkielet, fundamenty, obciążenia
| Pole | Przykład |
|------|----------|
| `id` | `"STR-SUPERSTRUCTURE-01"` |
| `entityType` | `"structural_system"` |
| `structuralCategory` | `"superstructure"` |
| `structuralType` | `"reinforced_concrete_frame"` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/system-konstrukcyjny)**

### Zgłoszenie (Issue) — NOWOŚĆ v2.0

**Co to jest**: Śledzenie spraw budowlanych — RFI, polecenia zmian, usterki, kontrole
| Pole | Przykład |
|------|----------|
| `id` | `"ISS-RFI-001"` |
| `entityType` | `"issue"` |
| `issueType` | `"rfi"` |
| `status` | `"under_review"` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/zgloszenie)**

### Test Odbioru (Commissioning Test) — NOWOŚĆ v2.0

**Co to jest**: Wyniki testów odbiorowych — szczelność, akustyka, termowizja, pożarowe
| Pole | Przykład |
|------|----------|
| `id` | `"CT-AIRTIGHT-001"` |
| `entityType` | `"commissioning_test"` |
| `testCategory` | `"air_tightness"` |
| `status` | `"passed"` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/test-odbioru)**

### Trasa Komunikacji (Circulation Route) — NOWOŚĆ v2.0

**Co to jest**: Trasa ewakuacji lub dostępności — łańcuch pomieszczeń i klatek schodowych
| Pole | Przykład |
|------|----------|
| `id` | `"CR-EGRESS-A"` |
| `entityType` | `"circulation_route"` |
| `routeType` | `"primary_egress"` |
| `totalTravelDistance` | `35.5` |

**[Pełna dokumentacja →](/pl/dokumentacja/encje/trasa-komunikacji)**

---

## Zobacz Także

- **[Pełne Opisy Encji](/pl/dokumentacja/encje/)** — Szczegółowa dokumentacja dla każdego typu
- **[Słownik](/pl/standardy/slownik)** — Definicje wszystkich terminów
- **[Przewodnik Dziedziczenia Właściwości](/pl/przewodniki/dziedziczenie-wlasciwosci)** — Jak wartości przepływają z typów
- **[Zasady Projektowania Encji](/pl/przewodniki/zasady-projektowania-encji)** — Kiedy używać każdego typu

::: tip Użyj Jako Ściągawki
Dodaj tę stronę do zakładek! Używaj podczas tworzenia plików encji aby szybko sprawdzić formaty ID, kluczowe pola i kiedy używać każdego typu.
:::
