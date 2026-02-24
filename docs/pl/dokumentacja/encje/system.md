# System (Dokumentacja Instalacji MEP)

## Czym To Jest

**Plik Systemu** dokumentuje jedną instalację MEP (HVAC, elektryczną, hydrauliczną, ochrony przeciwpożarowej). Przykłady: „System HVAC 01 obsługujący północne sypialnie", „Rozdzielnica elektryczna 1A".

::: tip Dla Architektów
**Problem:** Konsultant MEP pyta „Które pomieszczenia obsługuje system HVAC?" lub „Jaka jest moc chłodnicza dla strefy północnej?"

**Stary sposób:** Szukaj na rysunkach MEP, sprawdzaj zestawienia pomieszczeń, wymiana e-maili z inżynierem MEP.

**Z systemami:** Otwórz `systems/sys-hvac-01.md` — wyświetla wszystkie obsługiwane pomieszczenia, moce, wymagania. **Koordynacja MEP w jednym pliku.**

**Jeden plik systemu = wszystkie obsługiwane pomieszczenia, urządzenia i wymagania automatycznie śledzone.**
:::

**System** reprezentuje techniczny system budynkowy (HVAC, elektryczny, hydrauliczny, ochrony przeciwpożarowej), który zawiera i koordynuje wiele instancji zasobów. Systemy umożliwiają zarządzanie cyklem życia, analizę energetyczną i monitoring operacyjny.

## Przeznaczenie

Systemy definiują:
- Hierarchie system&oacute;w MEP (centrale wentylacyjne, dystrybucja, elementy końcowe)
- Wymagania wydajnościowe na poziomie systemu
- Cele zużycia energii
- Koordynację konserwacji między zasobami
- Punkty integracji z BMS

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator systemu | `"SYS-HVAC-01"` |
| `entityType` | string | Musi być `"system"` | `"system"` |
| `documentType` | string | Musi być `"system"` | `"system"` |
| `systemName` | string | Nazwa czytelna dla ludzi | `"HVAC System 01 - North Zone"` |
| `systemCategory` | string | Kategoria systemu (patrz wyliczenie poniżej) | `"hvac"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator systemu (np. `SYS-HVAC-01`)
- **systemName**: Jak to nazywasz („System HVAC Strefa Północna", „Rozdzielnica 1A")
- **systemCategory**: Typ — `hvac`, `electrical`, `plumbing`, `fire_safety`
- **buildingId**: Który budynek
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 5 pól.** System automatycznie śledzi, które pomieszczenia i urządzenia obsługuje ten system (nie wypisujesz ich ręcznie).
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `systemTypeId` | string | Odniesienie do system_type dla właściwości szablonowych |
| `assetInstanceIds` | array | Identyfikatory instancji zasob&oacute;w (obliczane automatycznie) |
| `servedZoneIds` | array | Identyfikatory stref obsługiwanych przez system |
| `servedSpaceIds` | array | Identyfikatory przestrzeni obsługiwanych bezpośrednio przez system |
| `systemType` | string | Konkretny typ systemu (np. "variable_air_volume") |
| `capacity` | object | Wydajność systemu (chłodzenie, ogrzewanie, moc) |
| `efficiency` | object | Wsp&oacute;łczynniki sprawności (COP, SEER, EER) |
| `energySource` | string | Podstawowe źr&oacute;dło energii |
| `controlStrategy` | string | Strategia sterowania (BMS, lokalna, ręczna) |
| `maintenanceSchedule` | object | Plan konserwacji na poziomie systemu |
| `designCriteria` | object | Parametry i cele projektowe |
| `requirements` | array | Identyfikatory wymagań mających zastosowanie do systemu |
| `requirementOverrides` | array | Dodatkowe wymagania poza typem systemu |
| `performance` | object | Dane wydajności specyficzne dla instancji |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla koordynacji MEP (najważniejsze):**
- **servedZoneIds** — Które strefy/strefy pożarowe obsługuje ten system
- **servedSpaceIds** — Które pomieszczenia obsługuje ten system
- **capacity** — Moc systemu (chłodzenie/ogrzewanie kW, elektryczna kW, przepływ wody L/min)
- **requirements** — Wymagania wydajnościowe, które system musi spełnić

**Dla pozwolenia/zgodności energetycznej:**
- **efficiency** — Współczynniki COP, SEER, EER dla HVAC
- **energySource** — Co zasila system (prąd, gaz, słońce)
- **designCriteria** — Parametry projektowe (krotność wymiany powietrza, nastawy temperatury)

**Dla zarządzania obiektem:**
- **maintenanceSchedule** — Kiedy serwisować urządzenia
- **controlStrategy** — Jak jest sterowany (BMS, lokalnie, ręcznie)

**Uwaga:** `assetInstanceIds` jest **obliczane automatycznie**. Nie wypisujesz tu urządzeń — urządzenia wskazują system, a system śledzi relację odwrotną.
:::

## Kategorie Systemów (Wyliczenie)

```typescript
type SystemCategory =
  | "hvac"              // Ogrzewanie, wentylacja, klimatyzacja
  | "electrical"        // Dystrybucja energii, oświetlenie
  | "plumbing"          // Woda użytkowa, kanalizacja
  | "fire_safety"       // Alarm pożarowy, gaszenie, kontrola dymu
  | "security"          // Kontrola dostępu, monitoring, wykrywanie włamań
  | "lighting"          // Systemy sterowania oświetleniem
  | "communications"    // Dane, telefonia, audio-wideo
  | "vertical_transport" // Windy, schody ruchome
  | "renewable_energy"  // Fotowoltaika, wiatr, geotermia
  // Nowe wartości v0.3.0:
  | "medical_gas"       // Gazy medyczne (tlen, podtlenek azotu, próżnia, sprężone powietrze)
  | "nurse_call"        // System przyzywowy dla personelu medycznego
  | "pneumatic_tube"    // Poczta pneumatyczna (transport próbek, leków)
  | "medical_waste"     // System gospodarki odpadami medycznymi
  | "it_network";       // Sieć informatyczna (LAN, WLAN, data center)
```

### Nowe kategorie systemów (v0.3.0)

| Wartość | Cel | Typowe komponenty |
|---------|-----|-------------------|
| `medical_gas` | Gazy medyczne | Centrala gazów, panele przyłóżkowe, reduktory, alarmy |
| `nurse_call` | System przyzywowy | Przyciski przyzywowe, terminale, wyświetlacze, serwer |
| `pneumatic_tube` | Poczta pneumatyczna | Stacje nadawcze/odbiorcze, rurociąg, dmuchawy, sterowanie |
| `medical_waste` | Gospodarka odpadami medycznymi | Pojemniki, wagi, system śledzenia, dezynfekcja |
| `it_network` | Sieć informatyczna | Przełączniki, routery, serwery, punkty dostępowe, okablowanie |

## Przykład 1: Pierwszy Plik Systemu (Minimalny)

**Najprostszy system HVAC dla koordynacji MEP:**

```markdown
Plik: systems/sys-hvac-01.md

---
id: "SYS-HVAC-01"
entityType: "system"
documentType: "system"
systemName: "System HVAC Strefa Północna"
systemCategory: "hvac"
buildingId: "BLD-01"
version: "1.0.0"

# Dla koordynacji MEP
servedZoneIds:
  - "ZONE-HVAC-NORTH"
capacity:
  cooling: 85
  heating: 75
  unit: "kW"
---

# System HVAC Strefa Północna

System pompy ciepła obsługujący sypialnie i salony w strefie północnej.
```

**To wszystko.** Gdy urządzenia odwołują się do `SYS-HVAC-01`, automatycznie pojawiają się na liście urządzeń tego systemu.

---

## Przykład 2: Pełny System (Wszystkie Szczegóły)

**Plik:** `docs/en/examples/green-terrace/systems/sys-hvac-01.md`

```markdown
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System 01 - North Zone"
systemCategory: "hvac"
systemType: "variable_air_volume"
buildingId: "BLD-01"

servedZoneIds:
  - "ZONE-HVAC-NORTH"

capacity:
  cooling: 85
  heating: 75
  unit: "kW"

efficiency:
  cooling_cop: 3.2
  heating_cop: 3.8
  seer: 16.5

energySource: "electricity_heat_pump"
controlStrategy: "bms_ddc"

designCriteria:
  outdoorAirRate: 30
  outdoorAirRateUnit: "m3/h/person"
  minFreshAir: 0.5
  minFreshAirUnit: "ACH"
  supplyAirTemp: 16
  supplyAirTempUnit: "&deg;C"

maintenanceSchedule:
  filterReplacement: "quarterly"
  annualInspection: true
  predictiveMaintenance: true

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC-001"

ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "1N2eH8$qKAxt2WxDu1LNyP"
  objectType: "HVAC"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
  - "variable_air_volume"
  - "energy_efficient"
---

# System HVAC 01: Strefa P&oacute;łnocna

System zmiennoprzepływowy (VAV) z pompą ciepła obsługujący przestrzenie mieszkalne strefy p&oacute;łnocnej.

## Opis Systemu

- **Typ:** VAV z pompą ciepła
- **Wydajność chłodzenia:** 85 kW
- **Wydajność grzania:** 75 kW
- **Sprawność:** SEER 16.5, COP 3.2 (chłodzenie) / 3.8 (grzanie)
- **Źr&oacute;dło energii:** Pompa ciepła powietrze-woda

## Obsługiwane Obszary

- Strefa: HVAC-NORTH
- Przestrzenie: Sypialnie, pokoje dzienne (p&oacute;łnocna ekspozycja)
- Całkowita powierzchnia: 450 m&sup2;
- Obliczeniowa liczba użytkownik&oacute;w: 180 os&oacute;b (szczyt)

## Dystrybucja

- **Centrala wentylacyjna:** AHU-01 (dach)
- **Skrzynki VAV:** 12 element&oacute;w końcowych z dogrzewaniem
- **Kanały:** Blacha stalowa ocynkowana, izolowana
- **Sterowanie:** BACnet DDC przez centralny BMS

## Konserwacja

- Wymiana filtr&oacute;w: Co kwartał
- Przegląd roczny: Pełny test wydajności systemu
- Konserwacja predykcyjna: Monitoring drgań kompresor&oacute;w
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "systems": [
      {
        "documentType": "system",
        "entityType": "system",
        "id": "SYS-HVAC-01",
        "systemName": "HVAC System 01 - North Zone",
        "systemCategory": "hvac",
        "systemType": "variable_air_volume",
        "buildingId": "BLD-01",
        "servedZoneIds": ["ZONE-HVAC-NORTH"],
        "capacity": {
          "cooling": 85,
          "heating": 75,
          "unit": "kW"
        },
        "efficiency": {
          "cooling_cop": 3.2,
          "heating_cop": 3.8,
          "seer": 16.5
        },
        "energySource": "electricity_heat_pump",
        "controlStrategy": "bms_ddc",
        "designCriteria": {
          "outdoorAirRate": 30,
          "outdoorAirRateUnit": "m3/h/person",
          "minFreshAir": 0.5,
          "minFreshAirUnit": "ACH",
          "supplyAirTemp": 16,
          "supplyAirTempUnit": "&deg;C"
        },
        "maintenanceSchedule": {
          "filterReplacement": "quarterly",
          "annualInspection": true,
          "predictiveMaintenance": true
        },
        "requirements": [
          "REQ-VENTILATION-OCCUPIED-001",
          "REQ-THERMAL-COMFORT-001",
          "REQ-ENERGY-EFFICIENCY-HVAC-001"
        ],
        "assetInstanceIds": [
          "AI-AHU-01",
          "AI-VAV-NORTH-01",
          "AI-VAV-NORTH-02",
          "AI-VAV-NORTH-03"
        ],
        "ifcMapping": {
          "ifcEntity": "IfcSystem",
          "globalId": "1N2eH8$qKAxt2WxDu1LNyP",
          "objectType": "HVAC"
        },
        "version": "1.0.0",
        "tags": ["hvac", "heat_pump", "variable_air_volume", "energy_efficient"]
      }
    ]
  }
}
```

## Relacje Odwrotne

Kompilator **automatycznie oblicza** `system.assetInstanceIds` na podstawie odwołań z zasob&oacute;w:

**Wejście:** Zasoby odwołują się do system&oacute;w
```yaml
# ai-ahu-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-01.md
systemId: "SYS-HVAC-01"

# ai-vav-north-02.md
systemId: "SYS-HVAC-01"
```

**Wynik:** System automatycznie zawiera listę zasob&oacute;w
```json
{
  "id": "SYS-HVAC-01",
  "assetInstanceIds": [
    "AI-AHU-01",
    "AI-VAV-NORTH-01",
    "AI-VAV-NORTH-02"
  ]
}
```

## Wzorzec Typ/Instancja

Systemy mogą odwoływać się do **Typ&oacute;w System&oacute;w**, aby dziedziczyć standardowe komponenty, wymagania i charakterystyki wydajności:

**Typ Systemu (Szablon):**
```yaml
# hvac-residential-mvhr-type.md
---
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
---
```

**Instancja Systemu (Odnosi się do Typu):**
```yaml
---
id: "SYS-HVAC-01"
systemName: "System HVAC Budynek 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"  # Dziedziczy komponenty i wydajność
buildingId: "BLD-01"
assetInstanceIds:
  - "AI-MVHR-01"
  - "AI-HP-01"
---
```

**Korzyści:** Definiuj komponenty i specyfikacje raz, wielokrotnie używaj. Redukcja dokumentacji o 50-90%. Aktualizacja typu → wszystkie instancje dziedziczą zmiany.

Zobacz [Typ Systemu](/pl/dokumentacja/encje/typ-systemu).

## Mapowanie BIM

Systemy mapują się na obiekty **IfcSystem** oraz Systemy MEP w Revit:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_System.SBM_ID` |
| `systemName` | `System Name` | `Name` |
| `systemCategory` | `System Classification` | `Pset_SBM_System.Category` |
| `systemType` | `System Type` | `Pset_SBM_System.SystemType` |
| `capacity` | `SBM_Capacity` | `Pset_SBM_System.Capacity` |
| `efficiency` | `SBM_Efficiency` | `Pset_SBM_System.Efficiency` |
| `energySource` | `SBM_Energy_Source` | `Pset_SBM_System.EnergySource` |

## Kategorie System&oacute;w wg Dyscypliny

### Systemy HVAC
- **Typy:** VAV, CAV, klimakonwektory, promienniowe, VRF, pompy ciepła
- **Wydajność:** Chłodzenie/ogrzewanie w kW lub tonach
- **Sprawność:** COP, SEER, EER, AFUE
- **Normy:** EN 16798-1, ASHRAE 90.1, WT 2021 &sect; 328

### Systemy Elektryczne
- **Typy:** Dystrybucja gł&oacute;wna, sterowanie oświetleniem, zasilanie awaryjne
- **Wydajność:** Moc w kW lub kVA
- **Napięcie:** 230V, 400V itp.
- **Normy:** IEC 60364, NEC, WT 2021 &sect; 192

### Systemy Hydrauliczne
- **Typy:** Ciepła woda użytkowa, zimna woda, kanalizacja, woda deszczowa
- **Wydajność:** Przepływy w L/min lub m&sup3;/h
- **Ciśnienie:** Ciśnienie robocze w bar lub PSI
- **Normy:** EN 806, WT 2021 &sect; 145

### Systemy Ochrony Przeciwpożarowej
- **Typy:** Alarm pożarowy, tryskacze, kontrola dymu, gaszenie
- **Pokrycie:** Strefy detekcji, strefy tryskaczowe
- **Normy:** EN 54, NFPA, WT 2021 &sect; 234-235

## Integracja z Rejestrem Zasob&oacute;w

Systemy agregują dane zasob&oacute;w na potrzeby zarządzania obiektem:

```json
{
  "systemSummary": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "totalAssets": 15,
      "assetBreakdown": {
        "ahu": 1,
        "vav_box": 12,
        "pump": 2
      },
      "maintenanceCalendar": [
        {
          "taskType": "filter_replacement",
          "frequency": "quarterly",
          "affectedAssets": ["AI-AHU-01"],
          "nextDue": "2026-04-01"
        },
        {
          "taskType": "annual_inspection",
          "frequency": "yearly",
          "affectedAssets": ["AI-AHU-01", "AI-VAV-NORTH-*"],
          "nextDue": "2026-06-15"
        }
      ],
      "totalMaintenanceCost": {
        "annual": 4500,
        "currency": "PLN"
      }
    }
  ]
}
```

## Integracja z Cyfrowym Bliźniakiem

Systemy umożliwiają zagregowany monitoring i sterowanie:

```json
{
  "systemMonitoring": [
    {
      "systemId": "SYS-HVAC-01",
      "systemName": "HVAC System 01 - North Zone",
      "bmsIntegration": {
        "protocol": "BACnet",
        "deviceId": "BACnet:201",
        "objectIdentifier": "device,201"
      },
      "kpis": [
        {
          "metric": "system_cop",
          "dataPoints": [
            "AI-AHU-01-POWER-IN",
            "AI-AHU-01-COOLING-OUT",
            "AI-AHU-01-HEATING-OUT"
          ],
          "calculation": "(cooling_out + heating_out) / power_in",
          "target": 3.2,
          "currentValue": 3.15
        },
        {
          "metric": "total_energy_consumption",
          "dataPoints": ["AI-AHU-01-ENERGY"],
          "aggregation": "sum",
          "period": "daily",
          "target": 850,
          "targetUnit": "kWh/day"
        }
      ],
      "alarms": [
        {
          "alarmId": "SYS-HVAC-01-LOW-COP",
          "condition": "system_cop < 2.5",
          "severity": "warning",
          "action": "notify_facilities_team"
        }
      ]
    }
  ]
}
```

## Analiza Energetyczna

Systemy z danymi o wydajności i sprawności umożliwiają modelowanie energetyczne:

```json
{
  "energyModel": {
    "systemId": "SYS-HVAC-01",
    "annualEnergyUse": {
      "cooling": 45000,
      "heating": 38000,
      "fans": 12000,
      "total": 95000,
      "unit": "kWh/year"
    },
    "peakDemand": {
      "cooling": 85,
      "heating": 75,
      "unit": "kW"
    },
    "operatingHours": {
      "cooling": 1500,
      "heating": 2200,
      "unit": "hours/year"
    },
    "energyCost": {
      "annual": 38000,
      "currency": "PLN"
    }
  }
}
```

## Zobacz Także

- **[Karta Urządzenie](/pl/dokumentacja/encje/instancja-zasobu)** - Urządzenia należą do system&oacute;w
- **[Karta Strefa](/pl/dokumentacja/encje/strefa)** - Systemy obsługują strefy
- **Rejestr Zasob&oacute;w** - Planowanie konserwacji system&oacute;w
- **Schemat Cyfrowego Bliźniaka** - Monitoring system&oacute;w
