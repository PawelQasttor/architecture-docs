# Przegroda (Ściana / Dach / Strop)

## Czym jest ta karta

Plik **Przegrody** opisuje fizyczny element budowlany oddzielający przestrzenie: ściany, dachy, stropy, ściany osłonowe, ściany podziemne. Każdy plik zawiera pełną specyfikację przegrody — warstwa po warstwie — plus parametry cieplne, akustyczne i ogniowe.

::: tip Dla Architektów
**Problem:** Przekroje ścian, obliczenia U, klasy odporności ogniowej rozrzucone po różnych arkuszach, PDF-ach i modelach BIM. Sprawdzenie, czy fasada spełnia WT 2021 § 328, wymaga przeszukania 3 różnych plików.

**Stary sposób:** Specyfikacja odwołuje się do detalu rysunkowego, który odwołuje się do arkusza obliczeniowego, który odwołuje się do karty katalogowej.

**Z kartą przegrody:** Jeden plik na typ elementu. Wszystkie warstwy, wartości parametrów i weryfikacje zgodności w jednym miejscu. Kompilator automatycznie łączy przegrodę z pomieszczeniami i budynkiem.

**Jedna karta przegrody = kompletna specyfikacja konstrukcji.**
:::

**Przegroda** reprezentuje fizyczny element konstrukcyjny — zestaw materiałów tworzących ściany, dachy, stropy i elewacje. Zawiera informacje o składzie, parametrach i pomieszczeniach, które rozdziela.

## Cel

Przegrody definiują:
- Układ warstw konstrukcyjnych (materiały, grubości, przewodność cieplna)
- Parametry cieplne (obliczone U vs. wymagane U)
- Parametry akustyczne (Rw, izolacyjność od dźwięków uderzeniowych Ln,w)
- Odporność ogniowa (klasa projektowa vs. wymagana)
- Kontrola wilgoci (bariera parowa, szczelność, hydroizolacja)
- Otwory (okna, drzwi z własnymi parametrami)
- Pomieszczenia graniczne (po obu stronach przegrody)
- Mapowanie IFC (IfcWallStandardCase, IfcSlab, IfcRoof, IfcCurtainWall)

## Wymagane pola

| Pole | Typ | Opis | Przykład |
|------|-----|------|---------|
| `id` | string | Unikalny identyfikator | `"ENV-EW-01"` |
| `entityType` | string | Musi być `"envelope"` | `"envelope"` |
| `envelopeName` | string | Czytelna nazwa | `"Ściana zewnętrzna typ A"` |
| `envelopeType` | string | Klasyfikacja | `"external_wall"` |
| `buildingId` | string | Referencja do budynku | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co oznaczają wymagane pola
- **id**: Identyfikator z prefiksem `ENV-`. Używaj opisowych sufiksów: `ENV-EW-01` (ściana zewnętrzna), `ENV-RF-01` (dach), `ENV-FS-GF` (płyta fundamentowa)
- **envelopeType**: Rodzaj elementu — patrz lista poniżej
- **buildingId**: Do którego budynku należy

**Potrzebujesz TYLKO tych pól.** Dodawaj warstwy i parametry w miarę rozwoju projektu.
:::

## Typy przegród

| Wartość | Opis | Encja IFC |
|---------|------|-----------|
| `external_wall` | Ściana zewnętrzna nośna lub nienośna | `IfcWallStandardCase` |
| `internal_wall` | Ściana wewnętrzna między pomieszczeniami | `IfcWallStandardCase` |
| `partition` | Nienośna ściana działowa | `IfcWall` |
| `roof` | Dach skośny | `IfcRoof` |
| `flat_roof` | Dach płaski | `IfcRoof` |
| `green_roof` | Dach zielony | `IfcRoof` |
| `floor_slab` | Strop międzykondygnacyjny | `IfcSlab` |
| `ground_floor_slab` | Płyta na gruncie | `IfcSlab` |
| `curtain_wall` | Ściana osłonowa (fasada szklana) | `IfcCurtainWall` |
| `below_grade_wall` | Ściana piwniczna / oporowa | `IfcWall` |

## Pola opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `boundarySpaceIds` | string[] | ID pomieszczeń po każdej stronie (1 dla zewn., 2 dla wewn.) |
| `levelIds` | string[] | Kondygnacje, które obejmuje element |
| `orientation` | string | Orientacja: N, NE, E, SE, S, SW, W, NW, horizontal |
| `isExternal` | boolean | True jeśli część zewnętrznej obudowy budynku |
| `isLoadBearing` | boolean | True jeśli element nośny |
| `grossArea` | number | Powierzchnia brutto w m² (przed odliczeniem otworów) |
| `netArea` | number | Powierzchnia netto w m² (po odliczeniu otworów) |
| `totalThickness` | number | Całkowita grubość przegrody w mm |
| `construction` | object | Specyfikacja warstwa po warstwie (patrz niżej) |
| `thermalPerformance` | object | Wartość U, ryzyko kondensacji, mostki cieplne |
| `acousticPerformance` | object | Rw, dźwięki uderzeniowe, certyfikaty |
| `firePerformance` | object | Klasa odporności ogniowej, reakcja na ogień |
| `moistureControl` | object | Bariera parowa, szczelność, hydroizolacja |
| `openings` | array | Okna, drzwi, świetliki w tym elemencie |
| `glazingRatio` | number | Stosunek powierzchni przeszklonej do ściany (0-1) |
| `regulatoryCompliance` | array | Weryfikacja przepisów ze statusem |
| `cost` | object | Śledzenie kosztów (entityCost v0.4) |
| `ifcMapping` | object | Encja IFC, globalId, materialLayerSet |
| `tags` | string[] | Etykiety do filtrowania |

## Warstwy konstrukcyjne

Tablica `construction.layers` opisuje każdą warstwę od zewnątrz do wewnątrz:

```yaml
construction:
  assemblyType: "ventilated_cavity"
  layers:
    - order: 1
      material: "Tynk mineralny"
      thickness: 15
      thermalConductivity: 0.82
      function: "finish"
      fireClass: "A1"
    - order: 2
      material: "Bloczki z autoklawizowanego betonu komórkowego (Ytong PP4/0.6)"
      thickness: 200
      thermalConductivity: 0.55
      density: 600
      function: "structural"
      manufacturer: "Ytong"
      productCode: "PP4/0.6"
      fireClass: "A1"
    - order: 3
      material: "Izolacja XPS (Styrodur 3035 CS)"
      thickness: 180
      thermalConductivity: 0.035
      function: "insulation"
      manufacturer: "BASF"
      productCode: "3035 CS"
      fireClass: "E"
    - order: 4
      material: "Pustka wentylowana"
      thickness: 40
      function: "cavity"
    - order: 5
      material: "Płyta gipsowo-kartonowa (Rigips RB)"
      thickness: 12.5
      thermalConductivity: 0.21
      function: "finish"
      manufacturer: "Rigips"
      productCode: "RB 12.5mm"
      fireClass: "A2"
```

## Obiekty parametrów

### Parametry cieplne

```yaml
thermalPerformance:
  uValue: 0.18
  uValueRequired: 0.20
  calculationMethod: "PN-EN ISO 6946"
  condensationRisk: false
  thermalBridgePsi: 0.05
```

### Parametry akustyczne

```yaml
acousticPerformance:
  rw: 55
  rwRequired: 50
  testCertificate: "AC2024-5678"
```

### Parametry ogniowe

```yaml
firePerformance:
  fireRating: "REI 90"
  fireRatingRequired: "REI 60"
  reactionToFire: "A2-s1,d0"
  testCertificate: "FR2024-1234"
```

## Zachowanie kompilatora

| Etap | Co się dzieje |
|------|--------------|
| **Parse** | Wyodrębnia `entityType: "envelope"` z frontmatter YAML |
| **Normalize** | Grupuje przegrody, oblicza relację zwrotną budynek→przegrody (`building.envelopeIds`), agreguje koszty przegród do budynku |
| **Validate** | Sprawdza wzorzec ID `ENV-`, weryfikuje istnienie `buildingId`, `boundarySpaceIds`, `levelIds` |
| **Quality** | Generuje podsumowanie `_quality` per przegroda |
| **Targets** | Uwzględnia przegrody w mapowaniu BIM i schemacie cyfrowego bliźniaka |

## Mapowanie IFC

| Typ przegrody | Encja IFC | Pset |
|--------------|-----------|------|
| Ściana zewnętrzna | `IfcWallStandardCase` | `Pset_WallCommon` |
| Ściana wewnętrzna | `IfcWallStandardCase` | `Pset_WallCommon` |
| Ściana działowa | `IfcWall` | `Pset_WallCommon` |
| Dach | `IfcRoof` | `Pset_RoofCommon` |
| Strop | `IfcSlab` | `Pset_SlabCommon` |
| Ściana osłonowa | `IfcCurtainWall` | `Pset_CurtainWallCommon` |

## Kompletny przykład

```yaml
---
id: "ENV-EW-01"
entityType: "envelope"
envelopeName: "Ściana zewnętrzna typ A"
envelopeType: "external_wall"
buildingId: "BLD-01"
boundarySpaceIds:
  - "SP-BLD-01-L01-001"
orientation: "N"
isExternal: true
isLoadBearing: true
grossArea: 1245
netArea: 1050
totalThickness: 447.5
thermalPerformance:
  uValue: 0.18
  uValueRequired: 0.20
  calculationMethod: "PN-EN ISO 6946"
  condensationRisk: false
acousticPerformance:
  rw: 55
  rwRequired: 50
firePerformance:
  fireRating: "REI 90"
  fireRatingRequired: "REI 60"
cost:
  totalCost: 192544
  currency: "EUR"
  basis: "kosztorys_architekt_faza_4"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
version: "1.0.0"
tags:
  - "sciana-zewnetrzna"
  - "nosna"
  - "budynek-01"
---

# Ściana zewnętrzna typ A

Nośna ściana zewnętrzna z pustką wentylowaną, obejmująca wszystkie elewacje Budynku 01.
```

## Zobacz też

- [Budynek](/pl/dokumentacja/encje/budynek) — encja nadrzędna
- [Pomieszczenie](/pl/dokumentacja/encje/przestrzen) — pomieszczenia rozdzielone przegrodami
- [Kondygnacja](/pl/dokumentacja/encje/poziom) — kondygnacje, które obejmuje przegroda
- [Wymaganie](/pl/dokumentacja/encje/wymaganie) — przepisy dotyczące parametrów przegród
- [Integracja BIM](/pl/integracja-bim/) — mapowanie właściwości IFC
