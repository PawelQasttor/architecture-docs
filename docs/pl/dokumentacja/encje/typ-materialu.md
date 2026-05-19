# Typ Materiału (Specyfikacja Materiałowa)

## Czym To Jest

**Plik Typu Materiału** definiuje specyfikację materiału budowlanego wielokrotnego użytku: właściwości fizyczne, ogniowe i zrównoważonego rozwoju. Przykłady: „Beton C30/37", „Wełna mineralna 035 (Isover)".

::: tip Dla Architektów
**Problem:** Specyfikacja betonu C30/37 powtórzona w 12 plikach przegród — ścianach, stropach, fundamentach. Zmiana klasy ekspozycji? Edytuj 12 plików i miej nadzieję, że nic nie pominiesz.

**Stary sposób:** Każda przegroda zawiera pełną specyfikację materiału inline — gęstość, przewodność cieplna, klasa reakcji na ogień, producent, kod produktu. 12 przegród × 15 linii materiału = **180 linii** powtórzeń.

**Z Typem Materiału:** **Jeden szablon** (60 linii) definiuje wszystkie właściwości betonu C30/37. 12 przegród odwołuje się do `MT-CONCRETE-C30-37` w tablicy `materialTypeIds`. To **67% mniej dokumentacji**. Zmiana klasy ekspozycji? Edytuj jeden plik — wpływa na wszystkie przegrody.

**Jeden typ materiału = kompletna specyfikacja (fizyczna, ogniowa, środowiskowa) zdefiniowana raz.**
:::

**Typ Materiału** reprezentuje szablon specyfikacji materiału budowlanego. Definiuje właściwości fizyczne, parametry ogniowe, dane środowiskowe i informacje o kosztach. Przegrody, systemy konstrukcyjne i wykończenia odwołują się do typów materiałów zamiast powielać specyfikacje.

## Przeznaczenie

Typy Materiałów definiują:
- Właściwości fizyczne materiału (gęstość, przewodność cieplna, wytrzymałość)
- Parametry ogniowe (reakcja na ogień, odporność ogniowa)
- Dane zrównoważonego rozwoju (ślad węglowy, EPD, zawartość recyklingu)
- Informacje o producencie i kodzie produktu
- Zgodność z normami (PN-EN, ASTM)
- Koszty jednostkowe z walutą

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator typu materiału | `"MT-CONCRETE-C30-37"` |
| `entityType` | string | Musi być `"material_type"` | `"material_type"` |
| `materialName` | string | Nazwa materiału | `"Beton C30/37"` |
| `materialCategory` | string | Kategoria materiału (patrz wyliczenie) | `"concrete"` |
| `version` | string | Wersja semantyczna | `"2.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator z prefiksem `MT-`. Używaj opisowych sufiksów: `MT-CONCRETE-C30-37` (beton), `MT-MW-035` (wełna mineralna), `MT-STEEL-S355` (stal)
- **materialName**: Pełna nazwa handlowa lub techniczna
- **materialCategory**: Kategoria materiału — `concrete`, `steel`, `timber`, `insulation`, `glass`
- **version**: Śledź zmiany specyfikacji

**Potrzebujesz TYLKO tych 5 pól.** Dodawaj właściwości fizyczne, ogniowe i środowiskowe w miarę postępu projektu.
:::

### Wyliczenie Kategorii Materiału

| Wartość | Cel | Przykłady |
|---------|-----|-----------|
| `concrete` | Betony i zaprawy | Beton C30/37, C25/30, beton lekki |
| `steel` | Stale konstrukcyjne | S235, S355, stal nierdzewna |
| `timber` | Drewno i materiały drewnopochodne | Drewno klejone GL24h, CLT, LVL |
| `masonry` | Mury i bloczki | Cegła ceramiczna, bloczki silikatowe, Ytong |
| `glass` | Szkło budowlane | Szkło hartowane, zespolone, laminowane |
| `insulation` | Izolacje termiczne i akustyczne | Wełna mineralna, XPS, EPS, PIR |
| `membrane` | Membrany i folie | Membrana dachowa, folia PE, paroizolacja |
| `plaster` | Tynki i wyprawy | Tynk gipsowy, cementowo-wapienny |
| `paint` | Farby i powłoki | Farba lateksowa, emulsyjna, ogniochronna |
| `stone` | Kamień naturalny i sztuczny | Granit, marmur, piaskowiec |
| `ceramic` | Ceramika budowlana | Płytki gresowe, klinkier, terakota |
| `composite` | Materiały kompozytowe | Laminaty HPL, panele kompozytowe |
| `plastic` | Tworzywa sztuczne | PVC, HDPE, poliwęglan |
| `metal` | Metale niestopowe i stopy | Aluminium, miedź, cynk, tytan |
| `bitumen` | Materiały bitumiczne | Papa termozgrzewalna, SBS, asfalt |
| `other` | Inne materiały | Materiały specjalne, nietypowe |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis materiału i zastosowania |
| `manufacturer` | string | Producent materiału |
| `productCode` | string | Kod produktu / SKU producenta |
| `standard` | string | Norma techniczna (np. PN-EN 206, PN-EN 1992-1-1) |
| `physicalProperties` | object | Właściwości fizyczne (gęstość, przewodność, wytrzymałość) |
| `fireProperties` | object | Parametry ogniowe (reakcja na ogień, odporność ogniowa) |
| `sustainability` | object | Dane zrównoważonego rozwoju (ślad węglowy, EPD, recykling) |
| `cost` | object | Cena jednostkowa z walutą |
| `classification` | object | Klasyfikacja (Uniclass, OmniClass, kod CPV) |
| `tags` | array | Tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla specyfikacji technicznej:**
- **physicalProperties** — Gęstość, przewodność cieplna, wytrzymałość na ściskanie
- **standard** — Norma (PN-EN 206 dla betonu, PN-EN 10025 dla stali)
- **manufacturer** + **productCode** — Identyfikacja konkretnego produktu

**Dla ochrony przeciwpożarowej:**
- **fireProperties** — Reakcja na ogień (A1, A2-s1,d0), odporność ogniowa (REI 120)

**Dla certyfikatów zrównoważonego rozwoju (BREEAM, LEED):**
- **sustainability** — Ślad węglowy (kgCO2e/kg), deklaracja EPD, zawartość recyklingu

**Dla kosztorysowania:**
- **cost** — Cena jednostkowa za m³, m², kg z walutą

**Większość architektów zaczyna od:** nazwy, kategorii, przewodności cieplnej i klasy ogniowej. Pełne EPD i koszty dodaje się w późniejszych fazach.
:::

## Struktura Obiektu Physical Properties

```yaml
physicalProperties:
  density: 2400                    # kg/m³
  thermalConductivity: 1.70        # W/(m·K)
  specificHeatCapacity: 1000       # J/(kg·K)
  compressiveStrength: 30          # MPa (klasa C30)
  tensileStrength: 2.9             # MPa
  elasticModulus: 33000            # MPa
  porosity: 0.15                   # 0-1
  waterAbsorption: 5               # % masy
  vapourResistanceFactor: 130      # mu (-)
```

## Struktura Obiektu Fire Properties

```yaml
fireProperties:
  reactionToFire: "A1"             # Euroklasa (A1, A2-s1,d0, B-s1,d0, ...)
  fireResistance: "REI 120"        # Klasa odporności ogniowej
  meltingPoint: null               # °C (jeśli dotyczy)
  smokeProduction: "s1"            # s1, s2, s3
  flamingDroplets: "d0"            # d0, d1, d2
```

## Struktura Obiektu Sustainability

```yaml
sustainability:
  embodiedCarbonKgCO2ePerKg: 0.13  # kgCO2e na kg materiału
  embodiedCarbonKgCO2ePerM3: 312   # kgCO2e na m³
  epdReference: "EPD-XYZ-2025-001" # Numer deklaracji EPD
  epdUrl: "https://epd-online.com/..."
  recycledContent: 0.30            # 0-1 (30% zawartości z recyklingu)
  recyclability: 0.85              # 0-1 (85% możliwości recyklingu)
  renewableContent: 0.0            # 0-1
  biogenicCarbonKgCO2ePerKg: 0.0   # kgCO2e biogeniczny
  lifeCycleStage: "A1-A3"          # Etapy cyklu życia wg EN 15804
```

## Struktura Obiektu Cost

```yaml
cost:
  unitPrice: 450                   # Cena jednostkowa
  unit: "m3"                       # Jednostka: m3, m2, kg, szt
  currency: "PLN"                  # Waluta ISO 4217
  priceDate: "2026-01"             # Data obowiązywania ceny
```

## Przykład 1: Pierwszy Plik Typu Materiału (Minimalny)

**Najprostszy plik typu materiału na start:**

::: code-group

```markdown [Markdown]
Plik: material-types/mt-concrete-c30-37.md

---
id: "MT-CONCRETE-C30-37"
entityType: "material_type"
materialName: "Beton C30/37"
materialCategory: "concrete"
version: "2.0.0"

# Podstawowe właściwości
physicalProperties:
  density: 2400
  thermalConductivity: 1.70
  compressiveStrength: 30

fireProperties:
  reactionToFire: "A1"

standard: "PN-EN 206"
---

# Beton C30/37

Beton towarowy klasy C30/37 do elementów konstrukcyjnych.
Klasa ekspozycji: XC1.
```

```yaml [YAML]
id: "MT-CONCRETE-C30-37"
entityType: "material_type"
materialName: "Beton C30/37"
materialCategory: "concrete"
version: "2.0.0"

physicalProperties:
  density: 2400
  thermalConductivity: 1.70
  compressiveStrength: 30

fireProperties:
  reactionToFire: "A1"

standard: "PN-EN 206"
```

```json [JSON]
{
  "id": "MT-CONCRETE-C30-37",
  "entityType": "material_type",
  "materialName": "Beton C30/37",
  "materialCategory": "concrete",
  "version": "2.0.0",
  "physicalProperties": {
    "density": 2400,
    "thermalConductivity": 1.70,
    "compressiveStrength": 30
  },
  "fireProperties": {
    "reactionToFire": "A1"
  },
  "standard": "PN-EN 206"
}
```

```json [Schema]
{
  "required": ["id", "entityType", "materialName", "materialCategory", "version"]
}
```

:::

**To wszystko.** Dane EPD, koszty i szczegółowe właściwości fizyczne można dodać w późniejszych fazach projektu.

---

## Przykład 2: Pełny Typ Materiału (Wszystkie Szczegóły)

**Plik:** `material-types/mt-mw-035-isover.md`

::: code-group

```markdown [Markdown]
---
id: "MT-MW-035-ISOVER"
entityType: "material_type"
materialName: "Wełna mineralna Isover Uni-Mata 035"
materialCategory: "insulation"
version: "2.0.0"

description: "Mata z wełny mineralnej szklanej do izolacji termicznej i akustycznej ścian, dachów i stropów. Lambda deklarowana 0.035 W/(m·K)."

manufacturer: "Isover Saint-Gobain"
productCode: "UNI-MATA-035-150"
standard: "PN-EN 13162"

physicalProperties:
  density: 18
  thermalConductivity: 0.035
  specificHeatCapacity: 840
  vapourResistanceFactor: 1
  waterAbsorption: 1

fireProperties:
  reactionToFire: "A1"
  smokeProduction: "s1"
  flamingDroplets: "d0"
  meltingPoint: 1000

sustainability:
  embodiedCarbonKgCO2ePerKg: 1.35
  epdReference: "EPD-ISV-2025-042"
  recycledContent: 0.80
  recyclability: 0.90
  lifeCycleStage: "A1-A3"

cost:
  unitPrice: 28
  unit: "m2"
  currency: "PLN"
  priceDate: "2026-01"

classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"

tags:
  - "izolacja-termiczna"
  - "welna-mineralna"
  - "isover"
  - "a1-niepalna"
---

# Wełna mineralna Isover Uni-Mata 035

Mata z wełny mineralnej szklanej do izolacji termicznej i akustycznej.
Lambda deklarowana: 0.035 W/(m·K). Klasa reakcji na ogień: A1.
```

```yaml [YAML]
id: "MT-MW-035-ISOVER"
entityType: "material_type"
materialName: "Wełna mineralna Isover Uni-Mata 035"
materialCategory: "insulation"
version: "2.0.0"

description: "Mata z wełny mineralnej szklanej do izolacji termicznej i akustycznej ścian, dachów i stropów. Lambda deklarowana 0.035 W/(m·K)."

manufacturer: "Isover Saint-Gobain"
productCode: "UNI-MATA-035-150"
standard: "PN-EN 13162"

physicalProperties:
  density: 18
  thermalConductivity: 0.035
  specificHeatCapacity: 840
  vapourResistanceFactor: 1
  waterAbsorption: 1

fireProperties:
  reactionToFire: "A1"
  smokeProduction: "s1"
  flamingDroplets: "d0"
  meltingPoint: 1000

sustainability:
  embodiedCarbonKgCO2ePerKg: 1.35
  epdReference: "EPD-ISV-2025-042"
  recycledContent: 0.80
  recyclability: 0.90
  lifeCycleStage: "A1-A3"

cost:
  unitPrice: 28
  unit: "m2"
  currency: "PLN"
  priceDate: "2026-01"

classification:
  uniclass: "Pr_25_71_52_49"
  omniclass: "23-13 21 17"

tags:
  - "izolacja-termiczna"
  - "welna-mineralna"
  - "isover"
  - "a1-niepalna"
```

```json [JSON]
{
  "id": "MT-MW-035-ISOVER",
  "entityType": "material_type",
  "materialName": "Wełna mineralna Isover Uni-Mata 035",
  "materialCategory": "insulation",
  "version": "2.0.0",
  "description": "Mata z wełny mineralnej szklanej do izolacji termicznej i akustycznej ścian, dachów i stropów. Lambda deklarowana 0.035 W/(m·K).",
  "manufacturer": "Isover Saint-Gobain",
  "productCode": "UNI-MATA-035-150",
  "standard": "PN-EN 13162",
  "physicalProperties": {
    "density": 18,
    "thermalConductivity": 0.035,
    "specificHeatCapacity": 840,
    "vapourResistanceFactor": 1,
    "waterAbsorption": 1
  },
  "fireProperties": {
    "reactionToFire": "A1",
    "smokeProduction": "s1",
    "flamingDroplets": "d0",
    "meltingPoint": 1000
  },
  "sustainability": {
    "embodiedCarbonKgCO2ePerKg": 1.35,
    "epdReference": "EPD-ISV-2025-042",
    "recycledContent": 0.80,
    "recyclability": 0.90,
    "lifeCycleStage": "A1-A3"
  },
  "cost": {
    "unitPrice": 28,
    "unit": "m2",
    "currency": "PLN",
    "priceDate": "2026-01"
  },
  "classification": {
    "uniclass": "Pr_25_71_52_49",
    "omniclass": "23-13 21 17"
  },
  "tags": [
    "izolacja-termiczna",
    "welna-mineralna",
    "isover",
    "a1-niepalna"
  ]
}
```

```json [Schema]
{
  "required": ["id", "entityType", "materialName", "materialCategory", "version"]
}
```

:::

## Skompilowane Wyjście

```json
{
  "entities": {
    "material_types": [
      {
        "id": "MT-CONCRETE-C30-37",
        "entityType": "material_type",
        "materialName": "Beton C30/37",
        "materialCategory": "concrete",
        "physicalProperties": {
          "density": 2400,
          "thermalConductivity": 1.70,
          "compressiveStrength": 30
        },
        "fireProperties": {
          "reactionToFire": "A1"
        }
      },
      {
        "id": "MT-MW-035-ISOVER",
        "entityType": "material_type",
        "materialName": "Wełna mineralna Isover Uni-Mata 035",
        "materialCategory": "insulation",
        "sustainability": {
          "embodiedCarbonKgCO2ePerKg": 1.35,
          "recycledContent": 0.80
        }
      }
    ]
  }
}
```

## Integracja z Przegrodami

Przegrody odwołują się do typów materiałów w warstwach konstrukcyjnych:

```yaml
# Przegroda z referencjami do typów materiałów
construction:
  layers:
    - order: 1
      materialTypeId: "MT-PLASTER-CEMENT-LIME"
      thickness: 15
      function: "finish"
    - order: 2
      materialTypeId: "MT-CONCRETE-C30-37"
      thickness: 200
      function: "structural"
    - order: 3
      materialTypeId: "MT-MW-035-ISOVER"
      thickness: 180
      function: "insulation"
```

**Korzyści:**
- Zmiana specyfikacji materiału → automatycznie wpływa na wszystkie przegrody
- Obliczenia LCA na poziomie projektu (sumowanie śladu węglowego)
- Spójne dane ogniowe we wszystkich elementach budynku

## Mapowanie BIM

Typy Materiałów mapują się na obiekty materiałowe IFC:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_MaterialType.SBM_ID` |
| `materialName` | `Material Name` | `IfcMaterial.Name` |
| `materialCategory` | `Material Class` | `IfcMaterial.Category` |
| `physicalProperties.density` | `Density` | `IfcMaterialProperties.MassDensity` |
| `physicalProperties.thermalConductivity` | `Thermal Conductivity` | `IfcMaterialProperties.ThermalConductivity` |
| `fireProperties.reactionToFire` | `Fire Rating` | `Pset_MaterialFire.ReactionToFire` |
| `sustainability.embodiedCarbonKgCO2ePerKg` | `Embodied Carbon` | `Pset_EnvironmentalImpact.TotalPrimaryEnergyConsumption` |

## Zobacz Także

- **[Przegroda](/pl/dokumentacja/encje/przegroda)** - Przegrody korzystające z typów materiałów w warstwach
- **[System Konstrukcyjny](/pl/dokumentacja/encje/system-konstrukcyjny)** - Systemy konstrukcyjne odwołujące się do materiałów
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Wymagania dotyczące parametrów materiałów
- **Schema:** `sbm-schema-v2.0.json` - Definicja Typu Materiału
