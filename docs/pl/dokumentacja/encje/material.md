# Materiał (Dokumentacja Zastosowań Materiałowych)

## Czym To Jest

**Plik Materiału** dokumentuje konkretne zastosowanie materiału w projekcie. Przykłady: "200 m² wełny mineralnej na ścianach zewnętrznych", "450 m² płytek gresowych w holach". Każdy plik śledzi ilość, dostawcę, termin dostawy i status zamówienia.

::: tip Dla Architektów
**Problem:** Kierownik budowy pyta "Ile wełny mineralnej potrzebujemy zamówić?" lub "Jaki jest status dostawy płytek na piętro 2?"

**Stary sposób:** Szukaj w przedmiarach, sprawdzaj zestawienia materiałów w Excelu, dzwoń do dostawcy, przeszukuj e-maile z ofertami.

**Z materiałami:** Otwórz `materials/mat-welna-ew-01.md` — ilość (200 m²), dostawca (Rockwool), status zamówienia (ordered), termin dostawy (2026-07-15) w jednym pliku. **Śledzenie zamówień bez szukania.**

**Jeden plik materiału = ilość + dostawca + status zamówienia + powiązanie z przegrodami.**
:::

**Materiał** reprezentuje konkretne zastosowanie materiału budowlanego w projekcie. Materiały umożliwiają agregację zamówień, śledzenie dostaw, kontrolę kosztów oraz raportowanie zrównoważoności. Każdy materiał odnosi się do typu materiału (szablonu) i wskazuje, do których encji jest zastosowany.

## Przeznaczenie

Materiały definiują:
- Konkretne zastosowania materiałów (izolacja ścian, posadzki, wykończenia)
- Ilości i jednostki (m², m³, kg, szt.)
- Dane zamówieniowe (dostawca, termin dostawy, status)
- Powiązania z encjami (przegrody, pomieszczenia, systemy)
- Koszty materiałowe i logistykę dostaw
- Klasyfikację (UniClass, Omniclass, kody CPV)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator z prefiksem `MAT-` | `"MAT-WELNA-EW-01"` |
| `entityType` | string | Musi być `"material"` | `"material"` |
| `materialName` | string | Nazwa czytelna dla ludzi | `"Wełna mineralna Rockwool Frontrock Max E"` |
| `materialTypeId` | string | Referencja do typu materiału | `"MT-WELNA-MINERALNA"` |
| `version` | string | Wersja semantyczna | `"2.0.0"` |

::: tip Dla Architektów: Co Oznaczają Wymagane Pola
- **id**: Identyfikator materiału z prefiksem `MAT-`. Używaj opisowych sufiksów: `MAT-WELNA-EW-01` (wełna na ściany zewnętrzne), `MAT-GRES-HOL-01` (gres w holach)
- **materialName**: Konkretny produkt z nazwą producenta i modelem
- **materialTypeId**: Odniesienie do szablonu typu materiału (`MT-WELNA-MINERALNA`) — definiuje wspólne właściwości dla wszystkich zastosowań tego materiału
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 4 pól.** Dodawaj ilości, dostawcę i śledzenie zamówień w miarę rozwoju projektu.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `buildingId` | string | Budynek, w którym zastosowano materiał |
| `application` | string | Opis zastosowania ("Izolacja termiczna ścian zewnętrznych") |
| `appliedToEntityIds` | string[] | Identyfikatory encji, do których materiał jest zastosowany |
| `quantity` | object | Ilość: `value` (liczba) + `unit` (jednostka) |
| `supplier` | object | Dane dostawcy: nazwa, kontakt, numer oferty |
| `leadTime` | string | Czas realizacji zamówienia (np. "4 tygodnie") |
| `deliveryDate` | string | Planowana data dostawy (ISO 8601) |
| `procurementStatus` | enum | Status zamówienia (patrz wyliczenie poniżej) |
| `constructionPackageId` | string | Odniesienie do pakietu robót budowlanych |
| `cost` | object | Koszt materiału (jednostkowy, całkowity, waluta) |
| `classification` | object | Klasyfikacja (UniClass, Omniclass, CPV) |
| `ifcMapping` | object | Mapowanie IFC (IfcMaterial, IfcMaterialLayerSetUsage) |
| `tags` | string[] | Etykiety do filtrowania |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla zarządzania zamówieniami (najważniejsze):**
- **quantity** — Ile materiału potrzeba (np. `{ value: 200, unit: "m2" }`)
- **supplier** — Kto dostarcza materiał (nazwa firmy, kontakt)
- **procurementStatus** — Aktualny status: `not_specified`, `specified`, `quoted`, `ordered`, `delivered`, `installed`
- **deliveryDate** — Kiedy materiał ma być na budowie

**Dla koordynacji projektu:**
- **appliedToEntityIds** — Do których przegród/pomieszczeń zastosowany (np. `["ENV-EW-01", "ENV-EW-02"]`)
- **constructionPackageId** — W którym pakiecie robót (np. `"CP-IZOLACJA"`)
- **application** — Słowny opis zastosowania

**Dla kosztorysowania:**
- **cost** — Cena jednostkowa i całkowita
- **quantity** — Ilość do wyceny

**Większość architektów wypełnia:** quantity, supplier, procurementStatus i appliedToEntityIds. Reszta w fazie realizacji.
:::

## Statusy Zamówienia (Wyliczenie)

| Wartość | Opis |
|---------|------|
| `not_specified` | Materiał jeszcze nie wyspecyfikowany |
| `specified` | Materiał wyspecyfikowany w projekcie |
| `quoted` | Oferta otrzymana od dostawcy |
| `ordered` | Zamówienie złożone |
| `delivered` | Materiał dostarczony na budowę |
| `installed` | Materiał zamontowany/zastosowany |

## Przykład 1: Pierwszy Plik Materiału (Minimalny)

**Najprostszy plik materiału do śledzenia zamówień:**

::: code-group

```yaml [Markdown]
---
id: "MAT-WELNA-EW-01"
entityType: "material"
materialName: "Wełna mineralna Rockwool Frontrock Max E 180mm"
materialTypeId: "MT-WELNA-MINERALNA"
buildingId: "BLD-01"
application: "Izolacja termiczna ścian zewnętrznych"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
procurementStatus: "ordered"
version: "2.0.0"
---

# Wełna Mineralna Rockwool Frontrock Max E 180mm

Izolacja termiczna ścian zewnętrznych Budynku 01.
200 m², zamówienie złożone.
```

```yaml [YAML]
id: "MAT-WELNA-EW-01"
entityType: "material"
materialName: "Wełna mineralna Rockwool Frontrock Max E 180mm"
materialTypeId: "MT-WELNA-MINERALNA"
buildingId: "BLD-01"
application: "Izolacja termiczna ścian zewnętrznych"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
procurementStatus: "ordered"
version: "2.0.0"
```

```json [JSON]
{
  "id": "MAT-WELNA-EW-01",
  "entityType": "material",
  "materialName": "Wełna mineralna Rockwool Frontrock Max E 180mm",
  "materialTypeId": "MT-WELNA-MINERALNA",
  "buildingId": "BLD-01",
  "application": "Izolacja termiczna ścian zewnętrznych",
  "appliedToEntityIds": ["ENV-EW-01", "ENV-EW-02"],
  "quantity": {
    "value": 200,
    "unit": "m2"
  },
  "procurementStatus": "ordered",
  "version": "2.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "materialName", "materialTypeId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^MAT-" },
    "entityType": { "const": "material" },
    "materialName": { "type": "string" },
    "materialTypeId": { "type": "string", "pattern": "^MT-" },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Dodawaj dane dostawcy i koszty w miarę postępu zamówień.

---

## Przykład 2: Pełny Materiał (Wszystkie Szczegóły)

**Kompletna dokumentacja materiału z zamówieniem i klasyfikacją:**

::: code-group

```yaml [Markdown]
---
id: "MAT-WELNA-EW-01"
entityType: "material"
materialName: "Wełna mineralna Rockwool Frontrock Max E 180mm"
materialTypeId: "MT-WELNA-MINERALNA"
buildingId: "BLD-01"

application: "Izolacja termiczna ścian zewnętrznych typ A i B"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"

quantity:
  value: 200
  unit: "m2"

supplier:
  name: "Hurtownia Budowlana MaxBud"
  contactPerson: "Jan Kowalski"
  phone: "+48 600 123 456"
  email: "jan.kowalski@maxbud.pl"
  quoteReference: "OF/2026/04/1234"

leadTime: "3 tygodnie"
deliveryDate: "2026-07-15"
procurementStatus: "ordered"

constructionPackageId: "CP-IZOLACJA"

cost:
  unitCost: 85.00
  totalCost: 17000.00
  currency: "PLN"
  basis: "oferta OF/2026/04/1234"

classification:
  uniclass: "Pr_25_71_50_49"
  omniclass: "23-13 21 11"
  cpv: "44111520-2"

ifcMapping:
  ifcEntity: "IfcMaterialLayerSetUsage"
  materialName: "RockwoolFrontrockMaxE180"
  layerSetName: "ExternalWallInsulation"

version: "2.0.0"
tags:
  - "izolacja"
  - "welna-mineralna"
  - "sciana-zewnetrzna"
  - "rockwool"
---

# Wełna Mineralna Rockwool Frontrock Max E 180mm

Izolacja termiczna ścian zewnętrznych typ A i B w Budynku 01.

## Specyfikacja

- **Producent:** Rockwool
- **Produkt:** Frontrock Max E
- **Grubość:** 180 mm
- **Przewodność cieplna:** λ = 0,036 W/(m·K)
- **Klasa reakcji na ogień:** A1 (niepalna)
- **Gęstość:** 80 kg/m³

## Zastosowanie

- Ściana zewnętrzna typ A (ENV-EW-01): 120 m²
- Ściana zewnętrzna typ B (ENV-EW-02): 80 m²
- **Razem:** 200 m²

## Zamówienie

- **Dostawca:** MaxBud (oferta OF/2026/04/1234)
- **Status:** Zamówione
- **Termin dostawy:** 2026-07-15
- **Koszt:** 17 000 PLN (85 PLN/m²)
```

```yaml [YAML]
id: "MAT-WELNA-EW-01"
entityType: "material"
materialName: "Wełna mineralna Rockwool Frontrock Max E 180mm"
materialTypeId: "MT-WELNA-MINERALNA"
buildingId: "BLD-01"
application: "Izolacja termiczna ścian zewnętrznych typ A i B"
appliedToEntityIds:
  - "ENV-EW-01"
  - "ENV-EW-02"
quantity:
  value: 200
  unit: "m2"
supplier:
  name: "Hurtownia Budowlana MaxBud"
  contactPerson: "Jan Kowalski"
  phone: "+48 600 123 456"
  email: "jan.kowalski@maxbud.pl"
  quoteReference: "OF/2026/04/1234"
leadTime: "3 tygodnie"
deliveryDate: "2026-07-15"
procurementStatus: "ordered"
constructionPackageId: "CP-IZOLACJA"
cost:
  unitCost: 85.00
  totalCost: 17000.00
  currency: "PLN"
  basis: "oferta OF/2026/04/1234"
classification:
  uniclass: "Pr_25_71_50_49"
  omniclass: "23-13 21 11"
  cpv: "44111520-2"
ifcMapping:
  ifcEntity: "IfcMaterialLayerSetUsage"
  materialName: "RockwoolFrontrockMaxE180"
  layerSetName: "ExternalWallInsulation"
version: "2.0.0"
tags:
  - "izolacja"
  - "welna-mineralna"
  - "sciana-zewnetrzna"
  - "rockwool"
```

```json [JSON]
{
  "id": "MAT-WELNA-EW-01",
  "entityType": "material",
  "materialName": "Wełna mineralna Rockwool Frontrock Max E 180mm",
  "materialTypeId": "MT-WELNA-MINERALNA",
  "buildingId": "BLD-01",
  "application": "Izolacja termiczna ścian zewnętrznych typ A i B",
  "appliedToEntityIds": ["ENV-EW-01", "ENV-EW-02"],
  "quantity": {
    "value": 200,
    "unit": "m2"
  },
  "supplier": {
    "name": "Hurtownia Budowlana MaxBud",
    "contactPerson": "Jan Kowalski",
    "phone": "+48 600 123 456",
    "email": "jan.kowalski@maxbud.pl",
    "quoteReference": "OF/2026/04/1234"
  },
  "leadTime": "3 tygodnie",
  "deliveryDate": "2026-07-15",
  "procurementStatus": "ordered",
  "constructionPackageId": "CP-IZOLACJA",
  "cost": {
    "unitCost": 85.00,
    "totalCost": 17000.00,
    "currency": "PLN",
    "basis": "oferta OF/2026/04/1234"
  },
  "classification": {
    "uniclass": "Pr_25_71_50_49",
    "omniclass": "23-13 21 11",
    "cpv": "44111520-2"
  },
  "ifcMapping": {
    "ifcEntity": "IfcMaterialLayerSetUsage",
    "materialName": "RockwoolFrontrockMaxE180",
    "layerSetName": "ExternalWallInsulation"
  },
  "version": "2.0.0",
  "tags": ["izolacja", "welna-mineralna", "sciana-zewnetrzna", "rockwool"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "materialName", "materialTypeId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^MAT-" },
    "entityType": { "const": "material" },
    "materialName": { "type": "string" },
    "materialTypeId": { "type": "string", "pattern": "^MT-" },
    "buildingId": { "type": "string" },
    "application": { "type": "string" },
    "appliedToEntityIds": { "type": "array", "items": { "type": "string" } },
    "quantity": {
      "type": "object",
      "properties": {
        "value": { "type": "number" },
        "unit": { "type": "string" }
      }
    },
    "supplier": { "type": "object" },
    "leadTime": { "type": "string" },
    "deliveryDate": { "type": "string", "format": "date" },
    "procurementStatus": {
      "type": "string",
      "enum": ["not_specified", "specified", "quoted", "ordered", "delivered", "installed"]
    },
    "constructionPackageId": { "type": "string" },
    "cost": { "type": "object" },
    "classification": { "type": "object" },
    "ifcMapping": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

---

## Zachowanie Kompilatora

Kompilator SBM obsługuje encje materiałów następująco:

| Funkcja | Zachowanie |
|---------|-----------|
| **Parsowanie** | Rozpoznaje typ encji `material` z prefiksem ID `MAT-` |
| **Grupowanie** | Zbiera do tablicy `entities.materials` |
| **Relacje zwrotne** | Budynek otrzymuje automatycznie obliczaną tablicę `materialIds` |
| **Integralność referencyjna** | Ostrzega, gdy `materialTypeId`, `buildingId`, `appliedToEntityIds` lub `constructionPackageId` odwołują się do brakujących encji |
| **Agregacja kosztów** | Koszty materiałów uwzględnione w agregacji na poziomie budynku i pakietu robót |
| **Agregacja zamówień** | Materiały o tym samym `materialTypeId` mogą być agregowane w raporcie zamówień |

---

## Relacje

```
Budynek (BLD-01)
  ├─ Materiał (MAT-WELNA-EW-01)
  │    ├─ typ: Typ Materiału (MT-WELNA-MINERALNA)
  │    ├─ zastosowany do: Przegroda (ENV-EW-01)
  │    ├─ zastosowany do: Przegroda (ENV-EW-02)
  │    └─ pakiet robót: Pakiet Budowlany (CP-IZOLACJA)
  ├─ Materiał (MAT-GRES-HOL-01)
  │    ├─ typ: Typ Materiału (MT-GRES)
  │    └─ zastosowany do: Pomieszczenie (SP-BLD-01-L00-HOL)
  └─ Przegroda (ENV-EW-01)
       └─ warstwa izolacji → Materiał (MAT-WELNA-EW-01)
```

**Referencje do przodu (piszesz Ty):**
- `materialTypeId` → szablon typu materiału
- `buildingId` → do którego budynku należy
- `appliedToEntityIds` → do których przegród/pomieszczeń zastosowany
- `constructionPackageId` → w którym pakiecie robót

**Referencje zwrotne (kompilator oblicza):**
- Budynek otrzymuje `materialIds` z listą wszystkich materiałów
- Pakiet robót otrzymuje `materialIds` z listą materiałów w pakiecie

---

## Wzorzec Typ/Instancja

Materiały odwołują się do **Typów Materiałów**, aby dziedziczyć wspólne właściwości fizyczne:

**Typ Materiału (Szablon):**
```yaml
# MT-WELNA-MINERALNA
---
id: "MT-WELNA-MINERALNA"
entityType: "material_type"
typeName: "Wełna mineralna fasadowa"
category: "insulation"
thermalConductivity: 0.036
fireClass: "A1"
density: 80
---
```

**Instancja Materiału (Odnosi się do Typu):**
```yaml
---
id: "MAT-WELNA-EW-01"
entityType: "material"
materialName: "Wełna mineralna Rockwool Frontrock Max E 180mm"
materialTypeId: "MT-WELNA-MINERALNA"  # Dziedziczy λ, klasę ogniową, gęstość
quantity:
  value: 200
  unit: "m2"
---
```

**Korzyści:** Właściwości fizyczne (λ, klasa ogniowa, gęstość) definiujesz raz w typie. Każda instancja dodaje tylko dane specyficzne: ilość, dostawcę, zastosowanie.

## Mapowanie BIM

Materiały mapują się na obiekty materiałowe IFC:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Material.SBM_ID` |
| `materialName` | `Material Name` | `IfcMaterial.Name` |
| `materialTypeId` | `Material Type` | `IfcMaterialDefinition.Category` |
| `quantity.value` | `SBM_Quantity` | `IfcQuantityArea.AreaValue` / `IfcQuantityVolume.VolumeValue` |
| `supplier` | `SBM_Supplier` | `Pset_SBM_Material.Supplier` |
| `procurementStatus` | `SBM_Procurement_Status` | `Pset_SBM_Material.ProcurementStatus` |
| `cost.totalCost` | `SBM_Material_Cost` | `Pset_SBM_Material.TotalCost` |

---

## Raport Zamówień Materiałowych

Materiały umożliwiają generowanie zagregowanego raportu zamówień:

```json
{
  "procurementSummary": [
    {
      "materialTypeId": "MT-WELNA-MINERALNA",
      "typeName": "Wełna mineralna fasadowa",
      "totalQuantity": 450,
      "unit": "m2",
      "instances": [
        { "id": "MAT-WELNA-EW-01", "quantity": 200, "status": "ordered" },
        { "id": "MAT-WELNA-EW-02", "quantity": 150, "status": "quoted" },
        { "id": "MAT-WELNA-DACH-01", "quantity": 100, "status": "specified" }
      ],
      "totalCost": 38250,
      "currency": "PLN",
      "earliestDelivery": "2026-07-15",
      "latestDelivery": "2026-08-20"
    }
  ]
}
```

---

::: tip Kiedy Dodawać Pliki Materiałów
- **Faza 3 (Projekt wstępny):** Zidentyfikuj główne materiały (izolacje, konstrukcja), podaj typy i szacunkowe ilości
- **Faza 4 (Projekt budowlany):** Dodaj dokładne ilości, specyfikacje produktów, klasyfikację
- **Faza 5 (Projekt wykonawczy):** Dodaj dane dostawców, oferty, koszty
- **Faza 6 (Realizacja):** Aktualizuj statusy zamówień (ordered → delivered → installed)
:::

---

## Typowe Błędy

### Nie mylić Materiału z Typem Materiału

**Problem**: Tworzenie materiału z właściwościami fizycznymi (λ, gęstość) zamiast odniesienia do typu.

**Rozwiązanie**: Właściwości fizyczne idą do **Typu Materiału** (`MT-`), dane projektowe do **Materiału** (`MAT-`).

```yaml
# Złe: Właściwości fizyczne w instancji
id: "MAT-WELNA-EW-01"
thermalConductivity: 0.036  # To powinno być w typie!
density: 80                  # To powinno być w typie!

# Dobre: Odniesienie do typu + dane projektowe
id: "MAT-WELNA-EW-01"
materialTypeId: "MT-WELNA-MINERALNA"  # Właściwości fizyczne w typie
quantity:
  value: 200
  unit: "m2"
supplier:
  name: "MaxBud"
```

---

## Zobacz Także

- **[Typ Materiału](/pl/dokumentacja/encje/typ-zasobu)** — Szablony właściwości materiałowych
- **[Przegroda](/pl/dokumentacja/encje/przegroda)** — Przegrody zawierające warstwy materiałowe
- **[Pakiet Budowlany](/pl/dokumentacja/encje/pakiet-budowlany)** — Pakiety robót grupujące materiały
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** — Wymagania dotyczące materiałów (klasa ogniowa, parametry cieplne)
