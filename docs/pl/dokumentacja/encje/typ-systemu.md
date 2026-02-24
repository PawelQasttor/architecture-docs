# Typ Systemu

**Typ Systemu** to szablon wielokrotnego użytku definiujący wspólne specyfikacje dla podobnych systemów MEP. Instancje systemów odwołują się do typu, aby dziedziczyć wymagania, komponenty i charakterystyki wydajności.

::: tip Kiedy używać
Używaj Typów Systemów gdy masz **wiele podobnych systemów** (np. identyczne systemy HVAC w budynkach, standardowe systemy dystrybucji elektrycznej na każdym piętrze). Zdefiniuj specyfikacje raz w typie, a następnie twórz lekkie instancje, które się do niego odnoszą.

**Korzyści:**
- ✅ Definiowanie komponentów, kryteriów wydajności, wymagań jeden raz
- ✅ Gwarantowana spójność we wszystkich instancjach systemów
- ✅ Aktualizacja jednego pliku → wpływa na wszystkie instancje systemów
- ✅ Uproszczone specyfikacje systemów w projektach
:::

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator typu | `"SYT-HVAC-RESIDENTIAL"` |
| `entityType` | string | Musi być `"system_type"` | `"system_type"` |
| `typeName` | string | Nazwa typu | `"Standardowy System HVAC - Mieszkaniowy"` |
| `systemCategory` | string | Kategoria systemu (patrz wyliczenie) | `"hvac"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

### Wyliczenie Kategorii Systemu

| Wartość | Cel | Typowe Komponenty |
|---------|-----|-------------------|
| `hvac` | Ogrzewanie, wentylacja, klimatyzacja | Centrale, kotły, pompy ciepła, przewody, sterowanie |
| `electrical` | Dystrybucja energii elektrycznej | Rozdzielnice, panele, kable, gniazdka, oświetlenie |
| `plumbing` | Doprowadzenie wody i kanalizacja | Pompy, rury, armatura, podgrzewacze wody, odpływ |
| `fire_safety` | Wykrywanie i tłumienie pożaru | Czujki, alarmy, tryskacze, gaśnice |
| `security` | Bezpieczeństwo i kontrola dostępu | Kamery, kontrola dostępu, wykrywanie włamania |
| `communication` | Sieci danych i komunikacji | Okablowanie strukturalne, Wi-Fi, telekom, AV |
| `bms` | Systemy zarządzania budynkiem | Sterowniki, czujniki, siłowniki, oprogramowanie |
| `renewable_energy` | Systemy energii odnawialnej | Fotowoltaika, wiatr, geotermia, magazynowanie energii |
| `medical_gas` | **[v0.3.0]** Gazy medyczne | Centrala gazów, panele przyłóżkowe, reduktory, alarmy |
| `nurse_call` | **[v0.3.0]** System przyzywowy | Przyciski przyzywowe, terminale, wyświetlacze, serwer |
| `pneumatic_tube` | **[v0.3.0]** Poczta pneumatyczna | Stacje nadawcze/odbiorcze, rurociąg, dmuchawy |
| `medical_waste` | **[v0.3.0]** Odpady medyczne | Pojemniki, wagi, system śledzenia, dezynfekcja |
| `it_network` | **[v0.3.0]** Sieć informatyczna | Przełączniki, routery, serwery, punkty dostępowe |

## Pola Szablonowe

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis typu systemu i cel |
| `requirements` | array | ID wymagań stosowanych do WSZYSTKICH instancji systemów |
| `components` | array | Lista standardowych komponentów (kategoria, opis, specyfikacja, ilość) |
| `typicalPerformance` | object | Charakterystyki wydajności (różne w zależności od systemCategory) |
| `tags` | array | Tagi klasyfikacyjne |

## Struktura Tablicy Components

```yaml
components:
  - category: "air_handling"           # Kategoria komponentu
    description: "Jednostka odzysku ciepła"
    specification: "MVHR 90% efektywności"
    quantity: 1
```

### Kategorie Komponentów według Typu Systemu

**Systemy HVAC:**
- `air_handling`, `heating`, `cooling`, `ventilation`, `controls`

**Systemy Elektryczne:**
- `distribution`, `protection`, `wiring`, `lighting`, `power`

**Systemy Wodne:**
- `water_supply`, `drainage`, `fixtures`, `heating`, `treatment`

## Struktura Obiektu Typical Performance

### Wydajność HVAC

```yaml
typicalPerformance:
  heatingCapacity: "12 kW"
  coolingCapacity: "10 kW"
  ventilationRate: "0.5 ACH"
  heatRecovery: "90%"
  energyEfficiency: "A+++"
  copHeating: 4.2
  noiseLevel: "35 dB(A)"
```

### Wydajność Elektryczna

```yaml
typicalPerformance:
  totalLoad: "50 kW"
  voltage: "230/400V"
  phases: 3
  frequency: "50 Hz"
  powerFactor: 0.95
```

## Przykład: Typ Systemu HVAC

```markdown
---
documentType: "system_type"
id: "SYT-HVAC-RESIDENTIAL-MVHR"
typeName: "Mieszkaniowy HVAC - MVHR + Pompa Ciepła"
systemCategory: "hvac"

requirements:
  - "REQ-HVAC-VENTILATION-RATE"
  - "REQ-HVAC-HEAT-RECOVERY"

components:
  - category: "air_handling"
    description: "Jednostka MVHR"
    specification: "90% odzysk ciepła"
  - category: "heating"
    description: "Pompa ciepła powietrze-woda"
    specification: "12 kW, COP 4.2"

typicalPerformance:
  heatingCapacity: "12 kW"
  heatRecovery: "90%"
  copHeating: 4.2

version: "1.0.0"
---
```

## Skompilowane Wyjście

```json
{
  "system_types": [{
    "id": "SYT-HVAC-RESIDENTIAL-MVHR",
    "components": [/* komponenty */],
    "typicalPerformance": {/* wydajność */}
  }],
  "systems": [{
    "id": "SYS-HVAC-01",
    "systemTypeId": "SYT-HVAC-RESIDENTIAL-MVHR",
    "assetInstanceIds": ["AI-MVHR-01", "AI-HP-01"]
  }]
}
```

## Mechanizmy Nadpisywania

Instancje systemów mogą nadpisywać specyfikacje typu:

```yaml
---
systemName: "System HVAC Budynek 02 (Większy)"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"

performanceOverrides:
  heatingCapacity: "18 kW"  # Większe niż 12 kW typu
---
```

## Zobacz Również

- **[System](/pl/dokumentacja/encje/system)** - Instancje systemów odwołujące się do typów
- **[Typ Zasobu](/pl/dokumentacja/encje/typ-zasobu)** - Szablony produktów/urządzeń
- **[Instancja Zasobu](/pl/dokumentacja/encje/instancja-zasobu)** - Urządzenia w systemach
- **Schema:** `sbm-schema-v0.2.json` - Definicja Typu Systemu
