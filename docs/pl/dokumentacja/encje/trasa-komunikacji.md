# Trasa Komunikacji (Drogi Ewakuacyjne i Dostępność)

## Czym To Jest

**Plik Trasy Komunikacji** dokumentuje jedną trasę ruchu pieszego w budynku — drogę ewakuacyjną, trasę dostępną, ciąg serwisowy. Opisuje sekwencję pomieszczeń i elementów komunikacji pionowej, przez które prowadzi trasa, wraz z odległościami, szerokościami i zgodnością z przepisami.

::: tip Dla Architektów
**Problem:** Inspektor PSP pyta "Jaka jest maksymalna odległość dojścia do klatki ewakuacyjnej z sali pacjenta 204?" lub "Czy trasa ewakuacyjna spełnia wymagania WT 2021 § 237?"

**Stary sposób:** Mierz na rysunkach, przeszukuj specyfikacje, sprawdzaj obliczenia w Excelu, szukaj protokołów z przeglądu pożarowego.

**Z trasą komunikacji:** Otwórz `routes/cr-ewakuacja-01.md` — punkty trasy (`waypoints`), odległości dojścia, szerokości, oznakowanie, zgodność z przepisami w jednym pliku. **Weryfikacja ewakuacji bez szukania.**

**Jeden plik trasy = kompletna dokumentacja drogi ewakuacyjnej/dostępnej do wniosku o pozwolenie.**
:::

**Trasa Komunikacji** reprezentuje logiczną ścieżkę ruchu pieszego łączącą pomieszczenia i elementy komunikacji pionowej. Trasy umożliwiają analizę ewakuacji, weryfikację dostępności, planowanie oznakowania i sprawdzanie zgodności z przepisami przeciwpożarowymi.

## Przeznaczenie

Trasy komunikacji definiują:
- Drogi ewakuacyjne (główne, zapasowe, pożarowe)
- Trasy dostępne dla osób z niepełnosprawnościami
- Ciągi serwisowe i dostawcze
- Ciągi komunikacyjne pacjentów, personelu, odwiedzających
- Sekwencje przejścia przez pomieszczenia i klatki schodowe
- Odległości dojścia i czasy ewakuacji
- Zgodność z przepisami (WT 2021, Prawo budowlane)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator z prefiksem `CR-` | `"CR-EWAK-01"` |
| `entityType` | string | Musi byc `"circulation_route"` | `"circulation_route"` |
| `routeName` | string | Nazwa czytelna dla ludzi | `"Droga ewakuacyjna z sali pacjenta do klatki A"` |
| `routeType` | enum | Typ trasy (patrz wyliczenie ponizej) | `"primary_egress"` |
| `buildingId` | string | Referencja do budynku nadrzednego (`BLD-xx`) | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"2.0.0"` |

::: tip Dla Architektów: Co Oznaczają Wymagane Pola
- **id**: Identyfikator trasy z prefiksem `CR-`. Uzywaj opisowych sufiksów: `CR-EWAK-01` (ewakuacja), `CR-DOST-01` (dostepność), `CR-SERW-01` (serwis)
- **routeName**: Jak to nazywasz ("Droga ewakuacyjna z sali 204 do klatki A")
- **routeType**: Kategoria trasy — `primary_egress`, `accessible_route`, `service_route` itd.
- **buildingId**: Którego budynku dotyczy
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 5 pól.** Dodawaj waypoints, odległości i zgodność z przepisami w miarę rozwoju projektu.
:::

## Typy Tras (Wyliczenie)

| Wartość | Opis |
|---------|------|
| `primary_egress` | Główna droga ewakuacyjna |
| `secondary_egress` | Zapasowa droga ewakuacyjna |
| `fire_escape` | Droga pożarowa (klatka ewakuacyjna) |
| `accessible_route` | Trasa dostępna dla osób z niepełnosprawnościami |
| `service_route` | Ciąg serwisowy/techniczny |
| `patient_evacuation` | Trasa ewakuacji pacjentów (szpitale) |
| `visitor_circulation` | Ciąg komunikacyjny odwiedzających |
| `staff_circulation` | Ciąg komunikacyjny personelu |
| `goods_delivery` | Trasa dostawcza/towarowa |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `levelIds` | string[] | Kondygnacje, przez które przebiega trasa |
| `waypoints` | array | Uporządkowana sekwencja punktów trasy (patrz niżej) |
| `totalTravelDistance` | number | Całkowita długość trasy w metrach |
| `maxTravelDistance` | number | Maksymalna dopuszczalna odległość dojścia wg przepisów (m) |
| `minimumWidth` | number | Najwęższa szerokość na trasie w mm |
| `requiredWidth` | number | Wymagana minimalna szerokość wg przepisów w mm |
| `isAccessible` | boolean | Trasa spełnia wymagania dostępności |
| `isFireEscape` | boolean | Trasa jest wyznaczoną drogą ewakuacji pożarowej |
| `occupantCapacity` | number | Maksymalna liczba osób ewakuowanych tą trasą |
| `estimatedEvacuationTime` | number | Szacowany czas ewakuacji w minutach |
| `obstacles` | array | Przeszkody na trasie: `step`, `narrow_point`, `heavy_door`, `level_change` |
| `signage` | object | Oznakowanie: exitSigns, photoluminescent, emergencyLighting |
| `regulatoryCompliance` | array | Weryfikacja przepisów (rozporządzenie, paragraf, status) |
| `requirements` | string[] | Identyfikatory wymagań mających zastosowanie do trasy |
| `cost` | object | Śledzenie kosztów (oznakowanie, oświetlenie awaryjne) |
| `tags` | string[] | Etykiety do filtrowania |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla wniosku o pozwolenie na budowę (najważniejsze):**
- **waypoints** — Sekwencja punktów trasy (sale, korytarze, klatki schodowe)
- **totalTravelDistance** + **maxTravelDistance** — Odległość dojścia vs. dopuszczalna wg WT 2021
- **minimumWidth** + **requiredWidth** — Najwęższe miejsce vs. wymagana szerokość
- **regulatoryCompliance** — Weryfikacja zgodności z WT 2021 § 237-256

**Dla bezpieczeństwa pożarowego:**
- **isFireEscape** — Czy to wyznaczona droga ewakuacji
- **occupantCapacity** — Ile osób ewakuuje się tą trasą
- **estimatedEvacuationTime** — Szacowany czas ewakuacji
- **obstacles** — Przeszkody utrudniające ewakuację

**Dla dostępności:**
- **isAccessible** — Czy trasa jest dostępna dla osób z niepełnosprawnościami
- **obstacles** — Stopnie, zwężenia, ciężkie drzwi

**Większość architektów wypełnia:** waypoints, totalTravelDistance, minimumWidth i regulatoryCompliance. Reszta przy szczegółowym projekcie pożarowym.
:::

## Waypoints (Punkty Trasy)

Tablica `waypoints` opisuje uporządkowaną sekwencję punktów, przez które przebiega trasa:

```yaml
waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-KORYTARZ"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "VC-KLATKA-A"
    entityType: "vertical_circulation"
    sequence: 3
    isDecisionPoint: false
```

**Zasady waypoints:**
- `sequence` — numer porządkowy (od 1)
- `entityType` — typ encji punktu: `"space"` lub `"vertical_circulation"`
- `isDecisionPoint` — punkt, w którym ewakuowany podejmuje decyzję o kierunku (np. korytarz z rozgałęzieniem)

## Przykład 1: Pierwszy Plik Trasy (Minimalny)

**Najprostsza trasa ewakuacyjna dla wniosku o pozwolenie:**

::: code-group

```yaml [Markdown]
---
id: "CR-EWAK-01"
entityType: "circulation_route"
routeName: "Droga ewakuacyjna z sali pacjenta 204 do klatki A"
routeType: "primary_egress"
buildingId: "BLD-01"
isFireEscape: true
isAccessible: false
totalTravelDistance: 28.5
maxTravelDistance: 40.0
minimumWidth: 1400
requiredWidth: 1200
version: "2.0.0"
---

# Droga Ewakuacyjna z Sali 204 do Klatki A

Główna droga ewakuacyjna z sali pacjenta przez korytarz do klatki schodowej A.
Odległość dojścia 28,5 m (dopuszczalna 40 m wg WT 2021 § 237).
```

```yaml [YAML]
id: "CR-EWAK-01"
entityType: "circulation_route"
routeName: "Droga ewakuacyjna z sali pacjenta 204 do klatki A"
routeType: "primary_egress"
buildingId: "BLD-01"
isFireEscape: true
isAccessible: false
totalTravelDistance: 28.5
maxTravelDistance: 40.0
minimumWidth: 1400
requiredWidth: 1200
version: "2.0.0"
```

```json [JSON]
{
  "id": "CR-EWAK-01",
  "entityType": "circulation_route",
  "routeName": "Droga ewakuacyjna z sali pacjenta 204 do klatki A",
  "routeType": "primary_egress",
  "buildingId": "BLD-01",
  "isFireEscape": true,
  "isAccessible": false,
  "totalTravelDistance": 28.5,
  "maxTravelDistance": 40.0,
  "minimumWidth": 1400,
  "requiredWidth": 1200,
  "version": "2.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "routeName", "routeType", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CR-" },
    "entityType": { "const": "circulation_route" },
    "routeName": { "type": "string" },
    "routeType": {
      "type": "string",
      "enum": [
        "primary_egress", "secondary_egress", "fire_escape",
        "accessible_route", "service_route", "patient_evacuation",
        "visitor_circulation", "staff_circulation", "goods_delivery"
      ]
    },
    "buildingId": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Dodawaj waypoints i zgodność z przepisami w miarę rozwoju projektu.

---

## Przykład 2: Pełna Trasa Ewakuacyjna (Wszystkie Szczegóły)

**Pełna dokumentacja drogi ewakuacyjnej z waypoints i zgodnością z WT 2021:**

::: code-group

```yaml [Markdown]
---
id: "CR-EWAK-01"
entityType: "circulation_route"
routeName: "Droga ewakuacyjna z sali pacjenta 204 do klatki A"
routeType: "primary_egress"
buildingId: "BLD-01"

levelIds:
  - "LVL-02"
  - "LVL-01"
  - "LVL-00"

waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-KORYTARZ"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "SP-BLD-01-L02-HOL-A"
    entityType: "space"
    sequence: 3
    isDecisionPoint: false
  - entityId: "VC-KLATKA-A"
    entityType: "vertical_circulation"
    sequence: 4
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L00-WYJSCIE"
    entityType: "space"
    sequence: 5
    isDecisionPoint: false

totalTravelDistance: 28.5
maxTravelDistance: 40.0
minimumWidth: 1400
requiredWidth: 1200
isAccessible: false
isFireEscape: true
occupantCapacity: 45
estimatedEvacuationTime: 3.5

obstacles:
  - type: "heavy_door"
    location: "Drzwi przeciwpożarowe EI 30 przy klatce A"
    entityId: "OPN-DRZWI-PP-A"
  - type: "level_change"
    location: "Schody z poziomu 2 na parter (3 kondygnacje)"
    entityId: "VC-KLATKA-A"

signage:
  exitSigns: true
  photoluminescent: true
  emergencyLighting: true

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 237"
    requirement: "Maksymalna długość dojścia w strefie pożarowej ZL II"
    status: "compliant"
    note: "28,5 m < 40 m (dopuszczalne)"
  - regulation: "WT 2021"
    section: "§ 242"
    requirement: "Minimalna szerokość drogi ewakuacyjnej"
    status: "compliant"
    note: "1400 mm > 1200 mm (wymagane)"
  - regulation: "WT 2021"
    section: "§ 256"
    requirement: "Oświetlenie awaryjne na drogach ewakuacyjnych"
    status: "compliant"

requirements:
  - "REQ-PL-WT-EGRESS-DISTANCE-001"
  - "REQ-PL-WT-EGRESS-WIDTH-001"

cost:
  estimatedTotal: 12500
  currency: "PLN"
  breakdown:
    - item: "Oznakowanie ewakuacyjne"
      cost: 3500
    - item: "Oświetlenie awaryjne"
      cost: 9000

version: "2.0.0"
tags:
  - "ewakuacja"
  - "przeciwpożarowe"
  - "ZL-II"
  - "klatka-A"
---

# Droga Ewakuacyjna z Sali 204 do Klatki A

Główna droga ewakuacyjna prowadząca z sali pacjenta 204 (piętro 2) przez korytarz
i hol do chronionej klatki schodowej A, a następnie na parter do wyjścia ewakuacyjnego.

## Przebieg Trasy

1. **Sala pacjenta 204** (start) → drzwi do korytarza
2. **Korytarz piętro 2** (punkt decyzyjny) → w kierunku klatki A
3. **Hol przy klatce A** → drzwi przeciwpożarowe EI 30
4. **Klatka schodowa A** (chroniona, REI 120) → 3 kondygnacje w dół
5. **Wyjście ewakuacyjne** (parter) → na zewnątrz budynku

## Weryfikacja Zgodności

- Odległość dojścia: **28,5 m** (dopuszczalna: 40 m wg WT 2021 § 237) — ZGODNE
- Szerokość minimalna: **1400 mm** (wymagana: 1200 mm wg WT 2021 § 242) — ZGODNE
- Oświetlenie awaryjne: TAK (wg WT 2021 § 256) — ZGODNE
```

```yaml [YAML]
id: "CR-EWAK-01"
entityType: "circulation_route"
routeName: "Droga ewakuacyjna z sali pacjenta 204 do klatki A"
routeType: "primary_egress"
buildingId: "BLD-01"
levelIds:
  - "LVL-02"
  - "LVL-01"
  - "LVL-00"
waypoints:
  - entityId: "SP-BLD-01-L02-204"
    entityType: "space"
    sequence: 1
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L02-KORYTARZ"
    entityType: "space"
    sequence: 2
    isDecisionPoint: true
  - entityId: "SP-BLD-01-L02-HOL-A"
    entityType: "space"
    sequence: 3
    isDecisionPoint: false
  - entityId: "VC-KLATKA-A"
    entityType: "vertical_circulation"
    sequence: 4
    isDecisionPoint: false
  - entityId: "SP-BLD-01-L00-WYJSCIE"
    entityType: "space"
    sequence: 5
    isDecisionPoint: false
totalTravelDistance: 28.5
maxTravelDistance: 40.0
minimumWidth: 1400
requiredWidth: 1200
isAccessible: false
isFireEscape: true
occupantCapacity: 45
estimatedEvacuationTime: 3.5
obstacles:
  - type: "heavy_door"
    location: "Drzwi przeciwpożarowe EI 30 przy klatce A"
    entityId: "OPN-DRZWI-PP-A"
  - type: "level_change"
    location: "Schody z poziomu 2 na parter (3 kondygnacje)"
    entityId: "VC-KLATKA-A"
signage:
  exitSigns: true
  photoluminescent: true
  emergencyLighting: true
regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 237"
    requirement: "Maksymalna długość dojścia w strefie pożarowej ZL II"
    status: "compliant"
    note: "28,5 m < 40 m (dopuszczalne)"
  - regulation: "WT 2021"
    section: "§ 242"
    requirement: "Minimalna szerokość drogi ewakuacyjnej"
    status: "compliant"
    note: "1400 mm > 1200 mm (wymagane)"
  - regulation: "WT 2021"
    section: "§ 256"
    requirement: "Oświetlenie awaryjne na drogach ewakuacyjnych"
    status: "compliant"
requirements:
  - "REQ-PL-WT-EGRESS-DISTANCE-001"
  - "REQ-PL-WT-EGRESS-WIDTH-001"
cost:
  estimatedTotal: 12500
  currency: "PLN"
  breakdown:
    - item: "Oznakowanie ewakuacyjne"
      cost: 3500
    - item: "Oświetlenie awaryjne"
      cost: 9000
version: "2.0.0"
tags:
  - "ewakuacja"
  - "przeciwpożarowe"
  - "ZL-II"
  - "klatka-A"
```

```json [JSON]
{
  "id": "CR-EWAK-01",
  "entityType": "circulation_route",
  "routeName": "Droga ewakuacyjna z sali pacjenta 204 do klatki A",
  "routeType": "primary_egress",
  "buildingId": "BLD-01",
  "levelIds": ["LVL-02", "LVL-01", "LVL-00"],
  "waypoints": [
    {
      "entityId": "SP-BLD-01-L02-204",
      "entityType": "space",
      "sequence": 1,
      "isDecisionPoint": false
    },
    {
      "entityId": "SP-BLD-01-L02-KORYTARZ",
      "entityType": "space",
      "sequence": 2,
      "isDecisionPoint": true
    },
    {
      "entityId": "SP-BLD-01-L02-HOL-A",
      "entityType": "space",
      "sequence": 3,
      "isDecisionPoint": false
    },
    {
      "entityId": "VC-KLATKA-A",
      "entityType": "vertical_circulation",
      "sequence": 4,
      "isDecisionPoint": false
    },
    {
      "entityId": "SP-BLD-01-L00-WYJSCIE",
      "entityType": "space",
      "sequence": 5,
      "isDecisionPoint": false
    }
  ],
  "totalTravelDistance": 28.5,
  "maxTravelDistance": 40.0,
  "minimumWidth": 1400,
  "requiredWidth": 1200,
  "isAccessible": false,
  "isFireEscape": true,
  "occupantCapacity": 45,
  "estimatedEvacuationTime": 3.5,
  "obstacles": [
    {
      "type": "heavy_door",
      "location": "Drzwi przeciwpożarowe EI 30 przy klatce A",
      "entityId": "OPN-DRZWI-PP-A"
    },
    {
      "type": "level_change",
      "location": "Schody z poziomu 2 na parter (3 kondygnacje)",
      "entityId": "VC-KLATKA-A"
    }
  ],
  "signage": {
    "exitSigns": true,
    "photoluminescent": true,
    "emergencyLighting": true
  },
  "regulatoryCompliance": [
    {
      "regulation": "WT 2021",
      "section": "§ 237",
      "requirement": "Maksymalna długość dojścia w strefie pożarowej ZL II",
      "status": "compliant",
      "note": "28,5 m < 40 m (dopuszczalne)"
    },
    {
      "regulation": "WT 2021",
      "section": "§ 242",
      "requirement": "Minimalna szerokość drogi ewakuacyjnej",
      "status": "compliant",
      "note": "1400 mm > 1200 mm (wymagane)"
    },
    {
      "regulation": "WT 2021",
      "section": "§ 256",
      "requirement": "Oświetlenie awaryjne na drogach ewakuacyjnych",
      "status": "compliant"
    }
  ],
  "requirements": [
    "REQ-PL-WT-EGRESS-DISTANCE-001",
    "REQ-PL-WT-EGRESS-WIDTH-001"
  ],
  "cost": {
    "estimatedTotal": 12500,
    "currency": "PLN",
    "breakdown": [
      { "item": "Oznakowanie ewakuacyjne", "cost": 3500 },
      { "item": "Oświetlenie awaryjne", "cost": 9000 }
    ]
  },
  "version": "2.0.0",
  "tags": ["ewakuacja", "przeciwpożarowe", "ZL-II", "klatka-A"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "routeName", "routeType", "buildingId", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CR-" },
    "entityType": { "const": "circulation_route" },
    "routeName": { "type": "string" },
    "routeType": {
      "type": "string",
      "enum": [
        "primary_egress", "secondary_egress", "fire_escape",
        "accessible_route", "service_route", "patient_evacuation",
        "visitor_circulation", "staff_circulation", "goods_delivery"
      ]
    },
    "buildingId": { "type": "string" },
    "waypoints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "entityId": { "type": "string" },
          "entityType": { "type": "string", "enum": ["space", "vertical_circulation"] },
          "sequence": { "type": "integer" },
          "isDecisionPoint": { "type": "boolean" }
        }
      }
    },
    "totalTravelDistance": { "type": "number" },
    "maxTravelDistance": { "type": "number" },
    "minimumWidth": { "type": "number" },
    "requiredWidth": { "type": "number" },
    "isAccessible": { "type": "boolean" },
    "isFireEscape": { "type": "boolean" },
    "occupantCapacity": { "type": "integer" },
    "estimatedEvacuationTime": { "type": "number" },
    "version": { "type": "string" }
  }
}
```

:::

---

## Zachowanie Kompilatora

Kompilator SBM obsługuje encje tras komunikacji następująco:

| Funkcja | Zachowanie |
|---------|-----------|
| **Parsowanie** | Rozpoznaje typ encji `circulation_route` z prefiksem ID `CR-` |
| **Grupowanie** | Zbiera do tablicy `entities.circulation_routes` |
| **Relacje zwrotne** | Budynek otrzymuje automatycznie obliczaną tablicę `circulationRouteIds` |
| **Integralność referencyjna** | Ostrzega, gdy `buildingId`, `levelIds` lub `waypoints[].entityId` odwołują się do brakujących encji |
| **Walidacja waypoints** | Sprawdza kolejność `sequence`, poprawność `entityType` w waypoints |
| **Agregacja kosztów** | Koszty tras uwzględnione w agregacji na poziomie budynku |

---

## Relacje

```
Budynek (BLD-01)
  ├─ Trasa Komunikacji (CR-EWAK-01)
  │    ├─ waypoint 1: Pomieszczenie (SP-BLD-01-L02-204)
  │    ├─ waypoint 2: Pomieszczenie (SP-BLD-01-L02-KORYTARZ)
  │    ├─ waypoint 3: Pomieszczenie (SP-BLD-01-L02-HOL-A)
  │    ├─ waypoint 4: Komunikacja Pionowa (VC-KLATKA-A)
  │    └─ waypoint 5: Pomieszczenie (SP-BLD-01-L00-WYJSCIE)
  ├─ Trasa Komunikacji (CR-DOST-01)
  │    └─ ...
  └─ Kondygnacja (LVL-02)
       └─ Pomieszczenie (Sala pacjenta 204)
```

**Referencje do przodu (piszesz Ty):**
- `buildingId` → do którego budynku należy trasa
- `levelIds` → przez które kondygnacje przebiega
- `waypoints[].entityId` → przez które pomieszczenia/klatki prowadzi trasa
- `requirements` → które wymagania muszą być spełnione

**Referencje zwrotne (kompilator oblicza):**
- Budynek otrzymuje `circulationRouteIds` z listą wszystkich tras

---

## Mapowanie BIM

Trasy komunikacji nie mają bezpośredniego odpowiednika w IFC. Są obliczane na podstawie relacji między encjami IFC:

| Pole SBM | Źródło IFC | Opis |
|----------|-----------|------|
| `waypoints` (space) | `IfcSpace` | Pomieszczenia na trasie |
| `waypoints` (vertical_circulation) | `IfcStair` / `IfcTransportElement` | Klatki schodowe i windy na trasie |
| `minimumWidth` | `IfcDoor.OverallWidth` / `IfcSpace` | Najmniejsza szerokość na trasie |
| `totalTravelDistance` | Obliczane z geometrii | Suma odległości między waypoints |

::: tip Mapowanie BIM
Trasy komunikacji są encjami **analitycznymi** — nie istnieją jako osobne obiekty w modelu IFC. Są rekonstruowane z relacji `IfcSpace` → `IfcRelSpaceBoundary` → `IfcDoor` → `IfcSpace` oraz powiązań z `IfcStair`/`IfcTransportElement`. Kompilator SBM generuje je jako osobne encje na potrzeby analizy ewakuacji i dostępności.
:::

---

::: tip Kiedy Dodawać Pliki Tras Komunikacji
- **Faza 2 (Koncepcja):** Zidentyfikuj główne trasy ewakuacyjne, określ odległości dojścia
- **Faza 3 (Projekt wstępny):** Dodaj waypoints, szerokości, flagi dostępności
- **Faza 4 (Projekt budowlany):** Dodaj pełną zgodność z WT 2021 § 237-256, obliczenia ewakuacji
- **Faza 5 (Projekt wykonawczy):** Dodaj oznakowanie, oświetlenie awaryjne, koszty
:::

---

## Zobacz Także

- **[Komunikacja Pionowa](/pl/dokumentacja/encje/komunikacja-pionowa)** — Klatki schodowe i windy na trasach
- **[Przestrzeń](/pl/dokumentacja/encje/przestrzen)** — Pomieszczenia jako punkty trasy
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** — Przepisy dotyczące dróg ewakuacyjnych
- **[Otwór](/pl/dokumentacja/encje/otwor)** — Drzwi przeciwpożarowe na trasach
