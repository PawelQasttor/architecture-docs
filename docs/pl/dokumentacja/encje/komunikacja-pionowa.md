# Komunikacja Pionowa

Encja **Komunikacja Pionowa** opisuje element budynku łączący kondygnacje: klatki schodowe, windy, rampy, schody ruchome, dźwigi towarowe i klatki ewakuacyjne. Dokumentuje wymiary fizyczne, cechy dostępności, właściwości ewakuacyjne, specyfikacje wind i obliczenia zdolności ewakuacji.

## Kiedy Używać Tej Encji

- Potrzebujesz udokumentować klatki schodowe, windy, rampy lub schody ruchome
- Analiza bezpieczeństwa pożarowego wymaga dokumentacji dróg ewakuacji z odległościami dojścia i zdolnością ewakuacji
- Audyty dostępności wymagają udokumentowania tras dostępnych dla wózków inwalidzkich
- Budynki szpitalne/opiekuńcze wymagają dokumentacji wind przystosowanych do noszy
- Wnioski o pozwolenie na budowę wymagają szczegółów komunikacji pionowej

::: tip Zacznij Prosto
W większości projektów mieszkalnych potrzebujesz 1-2 plików komunikacji pionowej (jedna klatka schodowa, jedna winda). Dodaj szczegóły ewakuacji i obliczenia przepustowości przy przygotowaniu wniosku o pozwolenie.
:::

---

## Pola Wymagane

| Pole | Typ | Opis |
|------|-----|------|
| `id` | string | Unikalny ID z prefiksem `VC-` (np. `VC-KLATKA-A`) |
| `entityType` | string | Musi być `"vertical_circulation"` |
| `circulationName` | string | Czytelna nazwa (np. "Klatka schodowa A") |
| `circulationType` | enum | Jedno z: `staircase`, `elevator`, `escalator`, `ramp`, `ladder`, `service_lift`, `dumbwaiter`, `fire_escape_stair` |
| `buildingId` | string | Referencja do budynku nadrzędnego (`BLD-xx`) |
| `connectedLevelIds` | array | ID kondygnacji łączonych przez ten element (minimum 2) |
| `version` | string | Wersja semantyczna (np. `"1.0.0"`) |

---

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `servedSpaceIds` | tablica stringów | ID pomieszczeń holów, spoczników, przedsionków obsługiwanych |
| `isFireEscape` | boolean | Wyznaczona droga ewakuacji |
| `isAccessible` | boolean | Spełnia wymagania dostępności dla wózków inwalidzkich |
| `isStretcher` | boolean | Przystosowana do transportu na noszach (budynki szpitalne) |
| `isEvacuationLift` | boolean | Winda przystosowana do ewakuacji |
| `fireProperties` | object | Bezpieczeństwo pożarowe: klatka chroniona, odporność ogniowa, nadciśnienie, oddymianie, oświetlenie awaryjne |
| `dimensions` | object | Szerokość biegu, głębokość spocznika, wysokość, stopnie, pochylenie, wymiary szybu |
| `elevatorProperties` | object | Udźwig, prędkość, wymiary kabiny, typ napędu, przystanki |
| `accessibility` | object | Poręcze, oznaczenia dotykowe, Braille, komunikaty głosowe, pole manewrowe |
| `egressCapacity` | object | Zdolność ewakuacji, przepływ osób, czas ewakuacji |
| `regulatoryCompliance` | array | Kontrole przepisów (rozporządzenie, paragraf, wymaganie, status) |
| `cost` | object | Śledzenie kosztów (estimatedTotal, currency, breakdown) |
| `ifcMapping` | object | Mapowanie IFC (IfcStairFlight, IfcStair, IfcTransportElement, IfcRamp) |
| `tags` | tablica stringów | Etykiety do filtrowania |

---

## Minimalny Przykład (Klatka Schodowa)

```yaml
---
id: "VC-KLATKA-A"
entityType: "vertical_circulation"
circulationName: "Klatka schodowa A"
circulationType: "staircase"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
isFireEscape: true
isAccessible: false
version: "1.0.0"
---

# Klatka Schodowa A

Główna klatka schodowa obsługująca wszystkie kondygnacje mieszkalne.
```

---

## Kompletny Przykład (Winda)

```yaml
---
id: "VC-WINDA-01"
entityType: "vertical_circulation"
circulationName: "Winda osobowa 1"
circulationType: "elevator"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
isAccessible: true
isStretcher: true

dimensions:
  shaftWidth: 1800
  shaftDepth: 2100
  pitDepth: 1200
  overrun: 3600

elevatorProperties:
  loadCapacity: 1000
  personCapacity: 13
  speed: 1.0
  cabWidth: 1100
  cabDepth: 1400
  cabHeight: 2200
  doorWidth: 900
  doorHeight: 2100
  driveType: "mrl"
  doorType: "center_opening"
  stops: 6
  manufacturer: "KONE"
  model: "MonoSpace 500"

accessibility:
  handrails: "both_sides"
  brailleControls: true
  audioAnnouncements: true
  turningCircle: 1500

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 54"
    requirement: "Winda wymagana w budynkach > 4 kondygnacji"
    status: "compliant"

cost:
  estimatedTotal: 85000
  currency: "EUR"

ifcMapping:
  ifcEntity: "IfcTransportElement"
  objectType: "WindaOsobowa_01"
  predefinedType: "ELEVATOR"

version: "1.0.0"
tags: ["dostępność", "nosze", "mieszkalny"]
---

# Winda Osobowa 1

Winda KONE MonoSpace 500 bez maszynowni, obsługująca wszystkie kondygnacje.
```

---

## Zachowanie Kompilatora

Kompilator SBM obsługuje encje komunikacji pionowej następująco:

| Funkcja | Zachowanie |
|---------|-----------|
| **Parsowanie** | Rozpoznaje typ encji `vertical_circulation` z prefiksem ID `VC-` |
| **Grupowanie** | Zbiera do tablicy `entities.vertical_circulations` |
| **Relacje zwrotne** | Budynek otrzymuje automatycznie obliczaną tablicę `verticalCirculationIds` |
| **Integralność referencyjna** | Ostrzega, gdy `buildingId`, `connectedLevelIds` lub `servedSpaceIds` odwołują się do brakujących encji |
| **Agregacja kosztów** | Koszty komunikacji pionowej uwzględnione w agregacji na poziomie budynku |
| **Mapowanie IFC** | Mapuje na IfcStairFlight, IfcStair, IfcTransportElement, IfcRamp |

---

## Relacje

```
Budynek (BLD-01)
  ├─ Komunikacja Pionowa (VC-KLATKA-A)
  │    ├─ łączy Kondygnację (LVL-00)
  │    ├─ łączy Kondygnację (LVL-01)
  │    └─ łączy Kondygnację (LVL-02)
  ├─ Komunikacja Pionowa (VC-WINDA-01)
  │    ├─ łączy Kondygnację (LVL-00) ... (LVL-05)
  │    └─ obsługuje Pomieszczenie (SP-BLD-01-L00-HOL)
  └─ Kondygnacja (LVL-01)
       └─ Pomieszczenie (Sypialnia 01)
```

**Referencje do przodu (piszesz Ty):**
- `buildingId` → do którego budynku należy ten element
- `connectedLevelIds` → które kondygnacje łączy
- `servedSpaceIds` → które hole/spoczniki obsługuje

**Referencje zwrotne (kompilator oblicza):**
- Budynek otrzymuje `verticalCirculationIds` z listą wszystkich elementów komunikacji

---

::: tip Kiedy Dodawać Pliki Komunikacji Pionowej
- **Faza 2 (Koncepcja):** Stwórz pliki klatek/wind z podstawowym typem i połączonymi kondygnacjami
- **Faza 3 (Projekt wstępny):** Dodaj wymiary, flagi dostępności
- **Faza 4 (Projekt budowlany):** Dodaj właściwości pożarowe, obliczenia ewakuacji, zgodność z przepisami
- **Faza 5 (Projekt wykonawczy):** Dodaj specyfikacje wind (producent, model, wymiary kabiny)
:::
