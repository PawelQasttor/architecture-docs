# Karta Urządzenie

**Instancja Zasobu** reprezentuje konkretne urządzenie fizyczne z danymi konserwacyjnymi, informacjami gwarancyjnymi i monitoringiem operacyjnym. Instancje zasob&oacute;w umożliwiają zarządzanie obiektem, integrację z CMMS oraz monitoring w czasie rzeczywistym przez Cyfrowego Bliźniaka.

## Przeznaczenie

Instancje zasob&oacute;w śledzą:
- Tożsamość urządzeń fizycznych (producent, model, numer seryjny)
- Lokalizację instalacji (przestrzeń, poziom, budynek)
- Harmonogramy konserwacji i historię serwisową
- Informacje gwarancyjne i dane cyklu życia
- Inwentarz części zamiennych
- Powiązania czujnik&oacute;w IoT do monitoringu w czasie rzeczywistym

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator zasobu | `"AI-AHU-01"` |
| `entityType` | string | Musi być `"asset_instance"` | `"asset_instance"` |
| `documentType` | string | Musi być `"asset_instance"` | `"asset_instance"` |
| `assetName` | string | Nazwa czytelna dla ludzi | `"Air Handling Unit 01"` |
| `assetType` | string | Typ urządzenia (patrz kategorie poniżej) | `"ahu"` |
| `systemId` | string | ID systemu nadrzędnego | `"SYS-HVAC-01"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `spaceId` | string | ID przestrzeni instalacji |
| `levelId` | string | ID poziomu instalacji |
| `manufacturer` | string | Producent urządzenia |
| `modelNumber` | string | Numer modelu/katalogowy |
| `serialNumber` | string | Numer seryjny |
| `installationDate` | string | Data instalacji (ISO 8601) |
| `warrantyExpiry` | string | Data końca gwarancji (ISO 8601) |
| `expectedLifespan` | number | Oczekiwana żywotność w latach |
| `maintenanceSchedule` | object | Zadania konserwacyjne i częstotliwości |
| `spareParts` | array | Zalecany inwentarz części zamiennych |
| `specifications` | object | Specyfikacja techniczna |
| `supplier` | object | Dane kontaktowe dostawcy |
| `assetTag` | string | Fizyczna etykieta zasobu/kod QR |
| `cost` | object | Koszt zakupu i instalacji |
| `energyRating` | string | Klasa efektywności energetycznej |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

## Kategorie Typ&oacute;w Zasob&oacute;w

```typescript
// Urządzenia HVAC
type HVACAssetType =
  | "ahu"              // Centrala wentylacyjna
  | "fcu"              // Klimakonwektor
  | "vav_box"          // Skrzynka VAV
  | "exhaust_fan"      // Wentylator wywiewny
  | "heat_pump"        // Pompa ciepła
  | "chiller"          // Agregat chłodniczy
  | "boiler"           // Kocioł
  | "pump"             // Pompa
  | "cooling_tower";   // Wieża chłodnicza

// Urządzenia elektryczne
type ElectricalAssetType =
  | "transformer"      // Transformator
  | "switchgear"       // Rozdzielnica
  | "panel_board"      // Tablica rozdzielcza
  | "ups"              // Zasilacz awaryjny UPS
  | "generator"        // Agregat prądotw&oacute;rczy
  | "lighting_fixture"; // Oprawa oświetleniowa

// Urządzenia hydrauliczne
type PlumbingAssetType =
  | "water_heater"     // Podgrzewacz wody
  | "domestic_pump"    // Pompa wody użytkowej
  | "pressure_tank"    // Zbiornik ciśnieniowy
  | "backflow_preventer"; // Zaw&oacute;r zwrotny

// Urządzenia ochrony przeciwpożarowej
type FireSafetyAssetType =
  | "fire_alarm_panel" // Centrala sygnalizacji pożarowej
  | "smoke_detector"   // Czujka dymu
  | "heat_detector"    // Czujka ciepła
  | "sprinkler_head"   // Głowica tryskaczowa
  | "fire_pump"        // Pompa pożarowa
  | "fire_extinguisher"; // Gaśnica

// Transport pionowy
type VerticalTransportAssetType =
  | "elevator"         // Winda
  | "escalator";       // Schody ruchome
```

## Przykład: Źr&oacute;dło Markdown

**Plik:** `docs/en/examples/green-terrace/assets/ai-ahu-01.md`

```markdown
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-AHU-01"
projectPhase: "construction"
bimLOD: "LOD_350"

assetName: "Air Handling Unit 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
spaceId: "SP-BLD-01-ROOF-MECH"
levelId: "LVL-ROOF"

manufacturer: "Systemair"
modelNumber: "Topvex SR11 EL"
serialNumber: "SR11-2026-04782"
assetTag: "GT-AHU-001"

installationDate: "2026-08-15"
warrantyExpiry: "2028-08-15"
expectedLifespan: 20

specifications:
  airflow: 12000
  airflowUnit: "m3/h"
  coolingCapacity: 85
  heatingCapacity: 75
  capacityUnit: "kW"
  filterClass: "F7"
  powerConsumption: 15.5
  powerUnit: "kW"
  weight: 1850
  weightUnit: "kg"
  dimensions:
    length: 4200
    width: 2100
    height: 2400
    unit: "mm"

maintenanceSchedule:
  tasks:
    - taskId: "MAINT-AHU-FILTER"
      taskName: "Replace air filters"
      frequency: "quarterly"
      estimatedDuration: 2
      durationUnit: "hours"
      skillRequired: "HVAC technician"

    - taskId: "MAINT-AHU-ANNUAL"
      taskName: "Annual inspection and performance test"
      frequency: "yearly"
      estimatedDuration: 8
      durationUnit: "hours"
      skillRequired: "Certified HVAC engineer"

    - taskId: "MAINT-AHU-BEARING"
      taskName: "Lubricate fan bearings"
      frequency: "semi_annual"
      estimatedDuration: 1
      durationUnit: "hours"
      skillRequired: "HVAC technician"

spareParts:
  - partName: "Air filter F7"
    partNumber: "SF-F7-600x600"
    quantity: 4
    reorderLevel: 2
    unitCost: 145
    currency: "PLN"

  - partName: "Fan belt"
    partNumber: "BELT-SR11-STD"
    quantity: 2
    reorderLevel: 1
    unitCost: 89
    currency: "PLN"

supplier:
  name: "Systemair Polska Sp. z o.o."
  contact: "serwis@systemair.pl"
  phone: "+48 22 123 4567"
  emergencyPhone: "+48 22 123 4568"

cost:
  purchase: 125000
  installation: 18000
  total: 143000
  currency: "PLN"

energyRating: "A+"

ifcMapping:
  ifcEntity: "IfcUnitaryEquipment"
  globalId: "0M1dG7$pJ9ws1VwCt0KMyO"
  objectType: "AirHandlingUnit"

version: "1.0.0"
tags:
  - "hvac"
  - "air_handling_unit"
  - "rooftop"
  - "high_efficiency"
---

# Zas&oacute;b: Centrala Wentylacyjna 01

Dachowa centrala wentylacyjna obsługująca system HVAC strefy p&oacute;łnocnej.

## Dane Urządzenia

- **Producent:** Systemair
- **Model:** Topvex SR11 EL
- **Numer seryjny:** SR11-2026-04782
- **Etykieta zasobu:** GT-AHU-001
- **Lokalizacja:** Maszynownia dachowa

## Specyfikacja Techniczna

- **Przepływ powietrza:** 12 000 m&sup3;/h
- **Chłodzenie:** 85 kW
- **Ogrzewanie:** 75 kW
- **Filtr:** Klasa F7 (4x 600x600mm)
- **Moc:** 15.5 kW
- **Klasa energetyczna:** A+

## Konserwacja

### Kwartalnie (4x rocznie)
- Wymiana filtr&oacute;w powietrza
- Sprawdzenie pracy przepustnic
- Kontrola odpływu skroplin

### P&oacute;łrocznie (2x rocznie)
- Smarowanie łożysk wentylatora
- Kontrola naciągu pask&oacute;w
- Czyszczenie wymiennik&oacute;w ciepła

### Rocznie (1x rocznie)
- Pełny test wydajności
- Kalibracja czujnik&oacute;w
- Weryfikacja sekwencji sterowania
- Kontrola połączeń elektrycznych

## Gwarancja

- **Instalacja:** 2026-08-15
- **Gwarancja wygasa:** 2028-08-15 (2 lata)
- **Oczekiwana żywotność:** 20 lat (wymiana ok. 2046)

## Inwentarz Części Zamiennych

Utrzymywać minimalny zapas:
- Filtry powietrza F7: 2 komplety (po 4 filtry)
- Paski klinowe: 1 zapasowy
- Płyta sterująca: 1 zapasowa (kosztowna, zamawiać w razie awarii)
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "assetInstances": [
      {
        "documentType": "asset_instance",
        "entityType": "asset_instance",
        "id": "AI-AHU-01",
        "assetName": "Air Handling Unit 01",
        "assetType": "ahu",
        "systemId": "SYS-HVAC-01",
        "buildingId": "BLD-01",
        "spaceId": "SP-BLD-01-ROOF-MECH",
        "levelId": "LVL-ROOF",
        "manufacturer": "Systemair",
        "modelNumber": "Topvex SR11 EL",
        "serialNumber": "SR11-2026-04782",
        "assetTag": "GT-AHU-001",
        "installationDate": "2026-08-15",
        "warrantyExpiry": "2028-08-15",
        "expectedLifespan": 20,
        "specifications": {
          "airflow": 12000,
          "airflowUnit": "m3/h",
          "coolingCapacity": 85,
          "heatingCapacity": 75,
          "capacityUnit": "kW",
          "filterClass": "F7",
          "powerConsumption": 15.5,
          "powerUnit": "kW",
          "weight": 1850,
          "weightUnit": "kg",
          "dimensions": {
            "length": 4200,
            "width": 2100,
            "height": 2400,
            "unit": "mm"
          }
        },
        "maintenanceSchedule": {
          "tasks": [
            {
              "taskId": "MAINT-AHU-FILTER",
              "taskName": "Replace air filters",
              "frequency": "quarterly",
              "estimatedDuration": 2,
              "durationUnit": "hours",
              "skillRequired": "HVAC technician"
            }
          ]
        },
        "spareParts": [
          {
            "partName": "Air filter F7",
            "partNumber": "SF-F7-600x600",
            "quantity": 4,
            "reorderLevel": 2,
            "unitCost": 145,
            "currency": "PLN"
          }
        ],
        "supplier": {
          "name": "Systemair Polska Sp. z o.o.",
          "contact": "serwis@systemair.pl",
          "phone": "+48 22 123 4567",
          "emergencyPhone": "+48 22 123 4568"
        },
        "cost": {
          "purchase": 125000,
          "installation": 18000,
          "total": 143000,
          "currency": "PLN"
        },
        "energyRating": "A+",
        "ifcMapping": {
          "ifcEntity": "IfcUnitaryEquipment",
          "globalId": "0M1dG7$pJ9ws1VwCt0KMyO",
          "objectType": "AirHandlingUnit"
        },
        "version": "1.0.0",
        "tags": ["hvac", "air_handling_unit", "rooftop", "high_efficiency"]
      }
    ]
  }
}
```

## Mapowanie BIM

Instancje zasob&oacute;w mapują się na konkretne obiekty urządzeń IFC:

| Pole SBM | Parametr Revit | Właściwość IFC |
|----------|----------------|----------------|
| `id` | `SBM_Entity_ID` | `Pset_SBM_Asset.SBM_ID` |
| `assetName` | `Type Name` | `Name` |
| `assetType` | `Family` | `ObjectType` |
| `manufacturer` | `Manufacturer` | `Pset_ManufacturerTypeInformation.Manufacturer` |
| `modelNumber` | `Model` | `Pset_ManufacturerTypeInformation.ModelReference` |
| `serialNumber` | `Serial Number` | `Pset_ManufacturerOccurrence.SerialNumber` |
| `assetTag` | `Mark` | `Pset_SBM_Asset.AssetTag` |
| `installationDate` | `SBM_Installation_Date` | `Pset_ServiceLife.InstallationDate` |
| `warrantyExpiry` | `SBM_Warranty_Expiry` | `Pset_Warranty.WarrantyEndDate` |

## Integracja z Rejestrem Zasob&oacute;w

Instancje zasob&oacute;w wypełniają cel kompilacji **rejestr zasob&oacute;w**:

```json
{
  "assetInventory": [
    {
      "assetId": "AI-AHU-01",
      "assetName": "Air Handling Unit 01",
      "assetType": "ahu",
      "systemName": "HVAC System 01 - North Zone",
      "location": "Rooftop mechanical room",
      "manufacturer": "Systemair",
      "model": "Topvex SR11 EL",
      "serial": "SR11-2026-04782",
      "assetTag": "GT-AHU-001",
      "installationDate": "2026-08-15",
      "warrantyExpiry": "2028-08-15",
      "expectedReplacement": "2046-08-15",
      "purchaseCost": 125000,
      "replacementReserve": {
        "annualContribution": 6250,
        "currency": "PLN"
      }
    }
  ],

  "maintenanceCalendar": [
    {
      "month": "2026-03",
      "tasks": [
        {
          "assetId": "AI-AHU-01",
          "taskId": "MAINT-AHU-FILTER",
          "taskName": "Replace air filters",
          "scheduledDate": "2026-03-15",
          "estimatedDuration": 2,
          "skillRequired": "HVAC technician",
          "estimatedCost": 580
        }
      ]
    }
  ],

  "sparePartsInventory": [
    {
      "partNumber": "SF-F7-600x600",
      "partName": "Air filter F7",
      "applicableAssets": ["AI-AHU-01"],
      "currentStock": 8,
      "reorderLevel": 2,
      "unitCost": 145,
      "totalValue": 1160
    }
  ]
}
```

## Integracja z Cyfrowym Bliźniakiem

Instancje zasob&oacute;w powiązane są z czujnikami IoT i punktami BMS:

```json
{
  "assetSensorBindings": [
    {
      "entityId": "AI-AHU-01",
      "entityName": "Air Handling Unit 01",
      "bmsIntegration": {
        "protocol": "BACnet",
        "deviceId": "BACnet:201",
        "objectIdentifier": "device,201"
      },
      "sensors": [
        {
          "sensorType": "supply_air_temperature",
          "sensorId": "TEMP-AHU-01-SA",
          "dataPoint": "AI-AHU-01-SA-TEMP",
          "bacnetPoint": "analog-input,1",
          "unit": "&deg;C",
          "normalRange": { "min": 14, "max": 18 }
        },
        {
          "sensorType": "return_air_temperature",
          "sensorId": "TEMP-AHU-01-RA",
          "dataPoint": "AI-AHU-01-RA-TEMP",
          "bacnetPoint": "analog-input,2",
          "unit": "&deg;C"
        },
        {
          "sensorType": "supply_fan_status",
          "sensorId": "STATUS-AHU-01-SF",
          "dataPoint": "AI-AHU-01-SF-STATUS",
          "bacnetPoint": "binary-input,1",
          "values": { "0": "off", "1": "on" }
        },
        {
          "sensorType": "power_consumption",
          "sensorId": "POWER-AHU-01",
          "dataPoint": "AI-AHU-01-POWER",
          "bacnetPoint": "analog-input,10",
          "unit": "kW"
        },
        {
          "sensorType": "filter_pressure_drop",
          "sensorId": "PRESSURE-AHU-01-FILTER",
          "dataPoint": "AI-AHU-01-FILTER-DP",
          "bacnetPoint": "analog-input,5",
          "unit": "Pa",
          "alarmThreshold": { "max": 250 }
        }
      ],
      "alarms": [
        {
          "alarmId": "AI-AHU-01-FILTER-CLOGGED",
          "condition": "filter_pressure_drop > 250",
          "severity": "warning",
          "action": "schedule_filter_replacement"
        },
        {
          "alarmId": "AI-AHU-01-FAN-FAULT",
          "condition": "supply_fan_status == off AND hvac_system_enabled == true",
          "severity": "critical",
          "action": "notify_emergency_contact"
        }
      ]
    }
  ]
}
```

## Częstotliwości Konserwacji

Standardowe wartości częstotliwości konserwacji:

| Częstotliwość | Opis | Razy w roku |
|---------------|------|-------------|
| `daily` | Codziennie | 365 |
| `weekly` | Co tydzień | 52 |
| `monthly` | Co miesiąc | 12 |
| `quarterly` | Co 3 miesiące | 4 |
| `semi_annual` | Co 6 miesięcy | 2 |
| `yearly` | Raz w roku | 1 |
| `biennial` | Co 2 lata | 0.5 |
| `on_condition` | Gdy warunek wyzwala | Zmienna |

## Eksport CMMS

Instancje zasob&oacute;w eksportowane są do format&oacute;w **CMMS** (Komputerowy System Zarządzania Konserwacją):

**Format Maximo:**
```csv
ASSETNUM,DESCRIPTION,ASSETTYPE,LOCATION,MANUFACTURER,MODELNUM,SERIALNUM,INSTALLDATE,WARRANTY,REPLACECOST
AI-AHU-01,Air Handling Unit 01,AHU,ROOF-MECH,Systemair,Topvex SR11 EL,SR11-2026-04782,2026-08-15,2028-08-15,125000
```

**Format SAP PM:**
```xml
<Equipment>
  <EquipmentNumber>AI-AHU-01</EquipmentNumber>
  <Description>Air Handling Unit 01</Description>
  <TechnicalIdentNo>SR11-2026-04782</TechnicalIdentNo>
  <Manufacturer>Systemair</Manufacturer>
  <Model>Topvex SR11 EL</Model>
  <FunctionalLocation>BLD-01/ROOF/MECH</FunctionalLocation>
</Equipment>
```

## Zobacz Także

- **[Karta Instalacja](/pl/dokumentacja/encje/system)** - Urządzenia należą do system&oacute;w
- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Lokalizacje instalacji urządzeń
- **Rejestr Zasob&oacute;w** - Cel kompilacji dla zasob&oacute;w
- **Schemat Cyfrowego Bliźniaka** - Generowanie powiązań czujnik&oacute;w
