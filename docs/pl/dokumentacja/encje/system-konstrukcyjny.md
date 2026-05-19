# System Konstrukcyjny (Dokumentacja Strukturalna)

## Czym To Jest

**Plik Systemu Konstrukcyjnego** opisuje konfigurację nośną budynku: typ ustroju, fundamenty, system stabilizacji bocznej, obciążenia, projektowanie sejsmiczne. Przykłady: „Szkielet żelbetowy z fundamentami ławowymi", „Konstrukcja stalowa z rdzeniem żelbetowym".

::: tip Dla Architektów
**Problem:** Inżynier konstrukcji przesyła obliczenia w PDF, schemat siatki słupów w DWG, a specyfikację stali w arkuszu Excel. Koordynacja zmian (np. zmiana rozstawu słupów z 6m na 7.2m) wymaga aktualizacji 4 różnych dokumentów i 3 branż.

**Stary sposób:** Informacje konstrukcyjne rozproszone po rysunkach branżowych, obliczeniach statycznych, specyfikacjach i kartach obciążeń. Sprawdzenie, czy strop spełnia wymagania obciążeń użytkowych, wymaga przeszukania 3 plików.

**Z Systemem Konstrukcyjnym:** Jeden plik na podsystem konstrukcyjny (nadbudowa, fundament, strop). Parametry obliczeniowe, obciążenia, siatka słupów i materiały w jednym miejscu. Kompilator automatycznie łączy system z budynkiem, kondygnacjami i typami materiałów.

**Jeden plik systemu konstrukcyjnego = kompletna specyfikacja strukturalna z parametrami obliczeniowymi.**
:::

**System Konstrukcyjny** reprezentuje podsystem nośny budynku — od fundamentów przez ustrój główny po dach. Zawiera parametry projektowe, obciążenia, siatkę konstrukcyjną i odwołania do materiałów. Umożliwia koordynację między architektem a inżynierem konstrukcji w jednym modelu danych.

## Przeznaczenie

Systemy Konstrukcyjne definiują:
- Typ ustroju nośnego (szkielet żelbetowy, stalowy, drewniany, murowany)
- Parametry projektowe (żywotność, klasa ważności, klasa ekspozycji, odporność ogniowa)
- Obciążenia obliczeniowe (stałe, użytkowe, śniegowe, wiatrowe)
- Siatkę konstrukcyjną (rozstawy słupów, moduły)
- Fundamenty (typ, głębokość posadowienia, nośność gruntu)
- Odwołania do typów materiałów
- Kategorię sejsmiczną (jeśli dotyczy)
- Powiązania z kondygnacjami i pakietami robót

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator systemu konstrukcyjnego | `"STR-FRAME-01"` |
| `entityType` | string | Musi być `"structural_system"` | `"structural_system"` |
| `systemName` | string | Nazwa czytelna dla ludzi | `"Szkielet żelbetowy - budynek główny"` |
| `structuralCategory` | string | Kategoria systemu (patrz wyliczenie) | `"superstructure"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"2.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator z prefiksem `STR-`. Używaj opisowych sufiksów: `STR-FRAME-01` (szkielet), `STR-FOUND-01` (fundament), `STR-ROOF-01` (konstrukcja dachu)
- **systemName**: Jak to nazywasz („Szkielet żelbetowy", „Ławy fundamentowe", „Konstrukcja dachu drewniana")
- **structuralCategory**: Kategoria — `superstructure`, `foundation`, `lateral_system`, `roof_structure`
- **buildingId**: Który budynek
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 6 pól.** Parametry obliczeniowe, obciążenia i siatkę dodajesz w miarę postępu projektu.
:::

### Wyliczenie Kategorii Systemu Konstrukcyjnego

| Wartość | Cel | Przykłady |
|---------|-----|-----------|
| `superstructure` | Ustrój nośny nadziemny | Szkielet żelbetowy, stalowy, drewniany, murowany |
| `foundation` | Fundamenty i posadowienie | Ławy, stopy, płyty, pale, ściany fundamentowe |
| `lateral_system` | System stabilizacji bocznej | Rdzeń żelbetowy, ściany usztywniające, ramy portalowe |
| `roof_structure` | Konstrukcja dachu | Więźba dachowa, płatwie, dźwigary, dach płaski |
| `floor_structure` | Konstrukcja stropów | Stropy żelbetowe, stalowo-betonowe, sprężone |
| `retaining` | Konstrukcje oporowe | Ściany oporowe, mury oporowe, gabiony |
| `other` | Inne systemy konstrukcyjne | Konstrukcje specjalne, tymczasowe |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis systemu konstrukcyjnego i cel |
| `parentStructuralSystemId` | string | ID nadrzędnego systemu konstrukcyjnego |
| `structuralType` | string | Konkretny typ ustroju (patrz wyliczenie) |
| `designParameters` | object | Parametry projektowe (żywotność, klasa, ekspozycja) |
| `loads` | object | Obciążenia obliczeniowe (stałe, użytkowe, śniegowe, wiatrowe) |
| `foundationDetails` | object | Szczegóły posadowienia (typ, głębokość, nośność gruntu) |
| `gridSystem` | object | Siatka konstrukcyjna (osie, rozstawy) |
| `materialTypeIds` | array | ID typów materiałów użytych w konstrukcji |
| `servedLevelIds` | array | ID kondygnacji obsługiwanych przez system |
| `requirements` | array | ID wymagań konstrukcyjnych |
| `constructionPackageId` | string | ID pakietu robót budowlanych |
| `responsibility` | object | Odpowiedzialność (projektant, weryfikator) |
| `cost` | object | Śledzenie kosztów (entityCost) |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla koordynacji z inżynierem konstrukcji:**
- **structuralType** — Typ ustroju (`reinforced_concrete_frame`, `steel_frame`, `timber_frame`)
- **designParameters** — Żywotność projektowa, klasa ważności, klasa ekspozycji
- **loads** — Obciążenia: stałe, użytkowe, śniegowe, wiatrowe (kPa)
- **gridSystem** — Siatka słupów (rozstawy, osie)

**Dla pozwolenia na budowę:**
- **designParameters.fireResistance** — Wymagana odporność ogniowa (R 60, R 120)
- **designParameters.seismicDesignCategory** — Kategoria sejsmiczna (jeśli dotyczy)
- **foundationDetails** — Typ i głębokość fundamentów

**Dla kosztorysowania:**
- **materialTypeIds** — Odwołania do typów materiałów (beton, stal, drewno)
- **cost** — Koszty elementów konstrukcyjnych
- **constructionPackageId** — Powiązanie z pakietem robót

**Większość architektów wypełnia:** typ ustroju, siatkę słupów, obciążenia, materiały. Szczegóły obliczeniowe uzupełnia inżynier konstrukcji.
:::

### Wyliczenie Typu Ustroju Konstrukcyjnego

| Wartość | Opis |
|---------|------|
| `reinforced_concrete_frame` | Szkielet żelbetowy (słupy + belki + stropy) |
| `precast_concrete_frame` | Szkielet prefabrykowany żelbetowy |
| `steel_frame` | Szkielet stalowy |
| `timber_frame` | Szkielet drewniany (tradycyjny) |
| `clt_panel` | Panele z drewna klejonego krzyżowo (CLT) |
| `glulam_frame` | Szkielet z drewna klejonego warstwowo (GL) |
| `masonry_loadbearing` | Mury nośne (ceramika, silikaty, beton komórkowy) |
| `composite_steel_concrete` | Ustrój zespolony stalowo-betonowy |
| `reinforced_concrete_wall` | Ściany żelbetowe nośne |
| `hybrid` | Ustrój mieszany (np. szkielet stalowy + rdzeń żelbetowy) |

## Struktura Obiektu Design Parameters

```yaml
designParameters:
  designLife: 50                     # Żywotność projektowa w latach
  importanceClass: "II"              # Klasa ważności budynku (I-IV)
  exposureClass: "XC1"               # Klasa ekspozycji betonu wg PN-EN 206
  fireResistance: "R 120"            # Wymagana odporność ogniowa
  seismicDesignCategory: "A"         # Kategoria sejsmiczna (A-F)
  seismicZone: null                  # Strefa sejsmiczna (jeśli dotyczy)
  groundType: "B"                    # Typ gruntu wg Eurokodu 8
  reliabilityClass: "RC2"            # Klasa niezawodności wg PN-EN 1990
```

## Struktura Obiektu Loads

```yaml
loads:
  deadLoadKPa: 5.5                   # Obciążenie stałe (kN/m²)
  liveLoadKPa: 2.0                   # Obciążenie użytkowe (kN/m²)
  snowLoadKPa: 1.2                   # Obciążenie śniegowe (kN/m²)
  windPressureKPa: 0.75              # Ciśnienie wiatru (kN/m²)
  imposedRoofLoadKPa: 0.4            # Obciążenie użytkowe dachu (kN/m²)
  partitionAllowanceKPa: 0.8         # Narzut na ścianki działowe (kN/m²)
  loadCombination: "PN-EN 1990"      # Norma kombinacji obciążeń
```

## Struktura Obiektu Foundation Details

```yaml
foundationDetails:
  foundationType: "strip"             # Typ: strip, pad, raft, piled, combined
  foundationDepth: 1.2                # Głębokość posadowienia (m)
  bearingCapacity: 200                # Nośność gruntu (kPa)
  groundwaterLevel: 3.5               # Poziom wody gruntowej (m p.p.t.)
  soilType: "Glina piaszczysta"       # Rodzaj gruntu
  frostDepth: 1.0                     # Głębokość przemarzania (m)
  waterproofing: "bitumiczna"         # Typ hydroizolacji
```

## Struktura Obiektu Grid System

```yaml
gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]     # Rozstawy w metrach
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"
```

## Struktura Obiektu Responsibility

```yaml
responsibility:
  structuralEngineer: "mgr inż. Jan Kowalski"
  designCompany: "Biuro Projektów Konstrukcyjnych Sp. z o.o."
  verifier: "dr inż. Anna Nowak"
  designDate: "2026-03-15"
  lastReviewDate: "2026-06-01"
```

## Przykład 1: Pierwszy Plik Systemu Konstrukcyjnego (Minimalny)

**Najprostszy plik systemu konstrukcyjnego na start:**

::: code-group

```markdown [Markdown]
Plik: structural-systems/str-frame-01.md

---
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "Szkielet żelbetowy - budynek główny"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

# Podstawowe parametry
structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  fireResistance: "R 120"
  exposureClass: "XC1"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
---

# Szkielet żelbetowy - budynek główny

Monolityczny szkielet żelbetowy z betonem C30/37 i stalą B500SP.
Siatka słupów 6.0 × 5.4 m, 4 kondygnacje nadziemne.
```

```yaml [YAML]
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "Szkielet żelbetowy - budynek główny"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  fireResistance: "R 120"
  exposureClass: "XC1"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
```

```json [JSON]
{
  "id": "STR-FRAME-01",
  "entityType": "structural_system",
  "systemName": "Szkielet żelbetowy - budynek główny",
  "structuralCategory": "superstructure",
  "buildingId": "BLD-01",
  "version": "2.0.0",
  "structuralType": "reinforced_concrete_frame",
  "designParameters": {
    "designLife": 50,
    "fireResistance": "R 120",
    "exposureClass": "XC1"
  },
  "loads": {
    "deadLoadKPa": 5.5,
    "liveLoadKPa": 2.0,
    "snowLoadKPa": 1.2
  }
}
```

```json [Schema]
{
  "required": ["id", "entityType", "systemName", "structuralCategory", "buildingId", "version"]
}
```

:::

**To wszystko.** Siatkę słupów, fundamenty i szczegóły materiałowe dodaje inżynier konstrukcji w późniejszych fazach.

---

## Przykład 2: Pełny System Konstrukcyjny (Wszystkie Szczegóły)

**Plik:** `structural-systems/str-frame-01-full.md`

::: code-group

```markdown [Markdown]
---
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "Szkielet żelbetowy - budynek główny"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

description: "Monolityczny szkielet żelbetowy z siatką słupów 6.0 × 5.4 m. 4 kondygnacje nadziemne + 1 podziemna. Beton C30/37, stal B500SP."

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  importanceClass: "II"
  exposureClass: "XC1"
  fireResistance: "R 120"
  reliabilityClass: "RC2"
  seismicDesignCategory: "A"
  groundType: "B"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
  windPressureKPa: 0.75
  partitionAllowanceKPa: 0.8
  loadCombination: "PN-EN 1990"

gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"

materialTypeIds:
  - "MT-CONCRETE-C30-37"
  - "MT-STEEL-B500SP"

servedLevelIds:
  - "LVL-B1"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"

requirements:
  - "REQ-STRUCT-FIRE-R120"
  - "REQ-STRUCT-DEFLECTION"

constructionPackageId: "CP-STRUCTURE"

responsibility:
  structuralEngineer: "mgr inż. Jan Kowalski"
  designCompany: "Biuro Projektów Konstrukcyjnych Sp. z o.o."
  verifier: "dr inż. Anna Nowak"
  designDate: "2026-03-15"

cost:
  totalCost: 2850000
  currency: "PLN"
  basis: "kosztorys_konstruktor_faza_4"

ifcMapping:
  ifcEntity: "IfcStructuralAnalysisModel"
  globalId: "2Xk9pM$rNCxv3WxEt2MOwR"
  objectType: "ReinforcedConcreteFrame"

tags:
  - "szkielet-zelbetowy"
  - "monolityczny"
  - "budynek-01"
  - "konstrukcja"
---

# Szkielet żelbetowy - budynek główny

Monolityczny szkielet żelbetowy z siatką słupów 6.0 × 5.4 m.
4 kondygnacje nadziemne + 1 podziemna.
Beton C30/37, stal B500SP. Odporność ogniowa R 120.
```

```yaml [YAML]
id: "STR-FRAME-01"
entityType: "structural_system"
systemName: "Szkielet żelbetowy - budynek główny"
structuralCategory: "superstructure"
buildingId: "BLD-01"
version: "2.0.0"

description: "Monolityczny szkielet żelbetowy z siatką słupów 6.0 × 5.4 m. 4 kondygnacje nadziemne + 1 podziemna. Beton C30/37, stal B500SP."

structuralType: "reinforced_concrete_frame"

designParameters:
  designLife: 50
  importanceClass: "II"
  exposureClass: "XC1"
  fireResistance: "R 120"
  reliabilityClass: "RC2"
  seismicDesignCategory: "A"
  groundType: "B"

loads:
  deadLoadKPa: 5.5
  liveLoadKPa: 2.0
  snowLoadKPa: 1.2
  windPressureKPa: 0.75
  partitionAllowanceKPa: 0.8
  loadCombination: "PN-EN 1990"

gridSystem:
  axes:
    - direction: "x"
      labels: ["A", "B", "C", "D", "E"]
      spacings: [6.0, 6.0, 6.0, 6.0]
    - direction: "y"
      labels: ["1", "2", "3", "4"]
      spacings: [5.4, 5.4, 5.4]
  columnSize: "400x400 mm"
  beamDepth: "600 mm"

materialTypeIds:
  - "MT-CONCRETE-C30-37"
  - "MT-STEEL-B500SP"

servedLevelIds:
  - "LVL-B1"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"

requirements:
  - "REQ-STRUCT-FIRE-R120"
  - "REQ-STRUCT-DEFLECTION"

constructionPackageId: "CP-STRUCTURE"

responsibility:
  structuralEngineer: "mgr inż. Jan Kowalski"
  designCompany: "Biuro Projektów Konstrukcyjnych Sp. z o.o."
  verifier: "dr inż. Anna Nowak"
  designDate: "2026-03-15"

cost:
  totalCost: 2850000
  currency: "PLN"
  basis: "kosztorys_konstruktor_faza_4"

ifcMapping:
  ifcEntity: "IfcStructuralAnalysisModel"
  globalId: "2Xk9pM$rNCxv3WxEt2MOwR"
  objectType: "ReinforcedConcreteFrame"

tags:
  - "szkielet-zelbetowy"
  - "monolityczny"
  - "budynek-01"
  - "konstrukcja"
```

```json [JSON]
{
  "id": "STR-FRAME-01",
  "entityType": "structural_system",
  "systemName": "Szkielet żelbetowy - budynek główny",
  "structuralCategory": "superstructure",
  "buildingId": "BLD-01",
  "version": "2.0.0",
  "description": "Monolityczny szkielet żelbetowy z siatką słupów 6.0 × 5.4 m. 4 kondygnacje nadziemne + 1 podziemna. Beton C30/37, stal B500SP.",
  "structuralType": "reinforced_concrete_frame",
  "designParameters": {
    "designLife": 50,
    "importanceClass": "II",
    "exposureClass": "XC1",
    "fireResistance": "R 120",
    "reliabilityClass": "RC2",
    "seismicDesignCategory": "A",
    "groundType": "B"
  },
  "loads": {
    "deadLoadKPa": 5.5,
    "liveLoadKPa": 2.0,
    "snowLoadKPa": 1.2,
    "windPressureKPa": 0.75,
    "partitionAllowanceKPa": 0.8,
    "loadCombination": "PN-EN 1990"
  },
  "gridSystem": {
    "axes": [
      {
        "direction": "x",
        "labels": ["A", "B", "C", "D", "E"],
        "spacings": [6.0, 6.0, 6.0, 6.0]
      },
      {
        "direction": "y",
        "labels": ["1", "2", "3", "4"],
        "spacings": [5.4, 5.4, 5.4]
      }
    ],
    "columnSize": "400x400 mm",
    "beamDepth": "600 mm"
  },
  "materialTypeIds": [
    "MT-CONCRETE-C30-37",
    "MT-STEEL-B500SP"
  ],
  "servedLevelIds": [
    "LVL-B1",
    "LVL-01",
    "LVL-02",
    "LVL-03",
    "LVL-04"
  ],
  "requirements": [
    "REQ-STRUCT-FIRE-R120",
    "REQ-STRUCT-DEFLECTION"
  ],
  "constructionPackageId": "CP-STRUCTURE",
  "responsibility": {
    "structuralEngineer": "mgr inż. Jan Kowalski",
    "designCompany": "Biuro Projektów Konstrukcyjnych Sp. z o.o.",
    "verifier": "dr inż. Anna Nowak",
    "designDate": "2026-03-15"
  },
  "cost": {
    "totalCost": 2850000,
    "currency": "PLN",
    "basis": "kosztorys_konstruktor_faza_4"
  },
  "ifcMapping": {
    "ifcEntity": "IfcStructuralAnalysisModel",
    "globalId": "2Xk9pM$rNCxv3WxEt2MOwR",
    "objectType": "ReinforcedConcreteFrame"
  },
  "tags": [
    "szkielet-zelbetowy",
    "monolityczny",
    "budynek-01",
    "konstrukcja"
  ]
}
```

```json [Schema]
{
  "required": ["id", "entityType", "systemName", "structuralCategory", "buildingId", "version"]
}
```

:::

## Skompilowane Wyjście

```json
{
  "entities": {
    "structural_systems": [
      {
        "id": "STR-FRAME-01",
        "entityType": "structural_system",
        "systemName": "Szkielet żelbetowy - budynek główny",
        "structuralCategory": "superstructure",
        "buildingId": "BLD-01",
        "structuralType": "reinforced_concrete_frame",
        "designParameters": {
          "designLife": 50,
          "fireResistance": "R 120"
        },
        "loads": {
          "deadLoadKPa": 5.5,
          "liveLoadKPa": 2.0,
          "snowLoadKPa": 1.2
        },
        "materialTypeIds": [
          "MT-CONCRETE-C30-37",
          "MT-STEEL-B500SP"
        ]
      }
    ]
  }
}
```

## Hierarchia Systemów Konstrukcyjnych

Systemy konstrukcyjne mogą tworzyć hierarchie za pomocą `parentStructuralSystemId`:

```yaml
# System nadrzędny: cały ustrój nośny
---
id: "STR-MAIN-01"
entityType: "structural_system"
systemName: "Ustrój nośny budynku głównego"
structuralCategory: "superstructure"
buildingId: "BLD-01"
---

# Podsystem: fundamenty
---
id: "STR-FOUND-01"
entityType: "structural_system"
systemName: "Fundamenty - ławy żelbetowe"
structuralCategory: "foundation"
parentStructuralSystemId: "STR-MAIN-01"
buildingId: "BLD-01"
---

# Podsystem: konstrukcja dachu
---
id: "STR-ROOF-01"
entityType: "structural_system"
systemName: "Konstrukcja dachu - więźba drewniana"
structuralCategory: "roof_structure"
parentStructuralSystemId: "STR-MAIN-01"
buildingId: "BLD-01"
---
```

**Korzyści:**
- Dekompozycja złożonej konstrukcji na logiczne podsystemy
- Osobne śledzenie kosztów i materiałów per podsystem
- Niezależne fazy realizacji (fundamenty → szkielet → dach)
- Koordynacja z pakietami robót budowlanych

## Integracja z Typami Materiałów

Systemy konstrukcyjne odwołują się do typów materiałów przez `materialTypeIds`:

```yaml
# System konstrukcyjny korzysta z typów materiałów
materialTypeIds:
  - "MT-CONCRETE-C30-37"    # Beton na słupy i belki
  - "MT-STEEL-B500SP"       # Stal zbrojeniowa
  - "MT-CONCRETE-C25-30"    # Beton na stropy

# Kompilator automatycznie:
# 1. Weryfikuje istnienie każdego materialTypeId
# 2. Pobiera dane ogniowe z typów materiałów
# 3. Uwzględnia ślad węglowy w obliczeniach LCA
```

## Mapowanie BIM

Systemy Konstrukcyjne mapują się na modele analizy strukturalnej IFC:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_StructuralSystem.SBM_ID` |
| `systemName` | `Structural System Name` | `IfcStructuralAnalysisModel.Name` |
| `structuralCategory` | `SBM_Structural_Category` | `Pset_SBM_StructuralSystem.Category` |
| `structuralType` | `Structural Type` | `IfcStructuralAnalysisModel.PredefinedType` |
| `designParameters.fireResistance` | `Fire Rating` | `Pset_StructuralMember.FireRating` |
| `loads.deadLoadKPa` | `Dead Load` | `Pset_StructuralSurfaceMember.SelfWeightLoad` |
| `loads.liveLoadKPa` | `Live Load` | `Pset_StructuralSurfaceMember.ImposedLoad` |
| `gridSystem` | `Grid` | `IfcGrid` |

## Zobacz Także

- **[Budynek](/pl/dokumentacja/encje/budynek)** - Budynki zawierające systemy konstrukcyjne
- **[Typ Materiału](/pl/dokumentacja/encje/typ-materialu)** - Materiały użyte w konstrukcji
- **[Kondygnacja](/pl/dokumentacja/encje/poziom)** - Kondygnacje obsługiwane przez system
- **[Przegroda](/pl/dokumentacja/encje/przegroda)** - Elementy obudowy współpracujące z konstrukcją
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Wymagania konstrukcyjne i ogniowe
- **Schema:** `sbm-schema-v2.0.json` - Definicja Systemu Konstrukcyjnego
