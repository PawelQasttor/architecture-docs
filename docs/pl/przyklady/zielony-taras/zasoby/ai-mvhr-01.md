---
entityType: "asset"
id: "AST-MVHR-01"
assetName: "MVHR Unit - Level 01"
projectPhase: "construction"
bimLOD: "LOD_400"

assetTypeId: "AT-MVHR-RESIDENTIAL"
category: "hvac"

# Instance identifiers
identifiers:
  assetTag: "MVHR-01"
  serial: "MVHR-2024-L01-789"
  barcode: "7612345678918"

# Location
buildingId: "BLD-01"
locatedInSpaceId: "SP-BLD-01-L01-TECH"
systemId: "SYS-HVAC-01"

# Technical Specifications
specifications:
  airflow: 300  # m³/h at design conditions
  heatRecoveryEfficiency: 92  # %
  filterClass: "F7 / G4"
  powerConsumption: 65  # W at medium speed
  soundPressureLevel: 28  # dB(A) at 3m
  dimensions:
    width: 800
    depth: 600
    height: 400
    unit: "mm"

# Installation data
installationData:
  installationDate: "2024-05-10"
  installedBy: "Ventilation Systems Sp. z o.o."
  installer: "Piotr Nowak (certified MVHR installer #VT-5678)"
  commissioningDate: "2024-05-15"
  commissionedBy: "Ventilation Systems Sp. z o.o."
  commissioningNotes: |
    - Airflow balanced to 300 m³/h
    - Heat recovery efficiency tested: 92.3%
    - Pressure tested, no leaks detected
    - All ductwork sealed and insulated
    - Bypass damper operation verified

# Warranty and service
warranty:
  warrantyStart: "2024-05-10"
  warrantyEnd: "2029-05-10"
  warrantyProvider: "MVHR Manufacturer"
  warrantyTerms: "5 years parts and labor, extended heat exchanger warranty (10 years)"

maintenance:
  lastServiceDate: "2024-11-10"
  nextServiceDue: "2025-05-10"
  maintenanceContractor: "Ventilation Systems Sp. z o.o."
  serviceIntervalMonths: 6
  maintenanceSchedule:
    - interval: "3 months"
      task: "Filter inspection and cleaning (user)"
    - interval: "6 months"
      task: "Filter replacement (G4 supply filter)"
    - interval: "12 months"
      task: "Filter replacement (F7 extract filter), heat exchanger inspection, fan cleaning"
  expectedLifetimeYears: 15

# Service history
serviceHistory:
  - date: "2024-05-15"
    type: "commissioning"
    performedBy: "Ventilation Systems Sp. z o.o."
    notes: "Initial commissioning - heat recovery efficiency 92.3%, all tests passed"
  - date: "2024-08-10"
    type: "filter_replacement"
    performedBy: "Building Manager"
    notes: "G4 supply filter replaced (3-month interval)"
  - date: "2024-11-10"
    type: "annual_service"
    performedBy: "Ventilation Systems Sp. z o.o."
    notes: "F7 extract filter replaced, heat exchanger cleaned, fan inspected - no issues"

# Spare parts
spareParts:
  - partName: "G4 Supply Filter 800x600"
    partNumber: "MVHR-F-G4-800x600"
    quantity: 2
    location: "Technical room shelf"
  - partName: "F7 Extract Filter 800x600"
    partNumber: "MVHR-F-F7-800x600"
    quantity: 1
    location: "Technical room shelf"

# Performance data
performanceData:
  measuredEfficiency: 92.3  # %
  measuredAirflow: 305  # m³/h (supply)
  extractAirflow: 300  # m³/h
  powerDraw: 62  # W at medium speed
  measuredDate: "2024-05-15"

# BIM Integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "3M4vK1$tNCzw5XzGw4NRaU"
    ifcEntity: "IfcFlowMovingDevice"

    ifcExtractedProperties:
      nominalAirflow: 300
      dimensions: [800, 600, 400]
      lastExtracted: "2026-02-27T10:30:00Z"

    validation:
      locationMatch: true
      dimensionsMatch: true
      lastValidated: "2026-02-27T10:30:00Z"

# Digital Twin Integration
iotDevices:
  - deviceId: "sensor_mvhr01_supply_temp"
    type: "temperature_sensor"
    location: "supply_duct"
    dataPoint: "supply_air_temperature"
  - deviceId: "sensor_mvhr01_extract_temp"
    type: "temperature_sensor"
    location: "extract_duct"
    dataPoint: "extract_air_temperature"
  - deviceId: "sensor_mvhr01_outdoor_temp"
    type: "temperature_sensor"
    location: "outdoor_intake"
    dataPoint: "outdoor_air_temperature"
  - deviceId: "sensor_mvhr01_exhaust_temp"
    type: "temperature_sensor"
    location: "exhaust_duct"
    dataPoint: "exhaust_air_temperature"
  - deviceId: "sensor_mvhr01_supply_pressure"
    type: "pressure_sensor"
    location: "supply_duct"
    dataPoint: "supply_duct_pressure"
  - deviceId: "sensor_mvhr01_extract_pressure"
    type: "pressure_sensor"
    location: "extract_duct"
    dataPoint: "extract_duct_pressure"

# Cost data
cost:
  purchasePrice: 3500
  installationCost: 1200
  totalCost: 4700
  currency: "EUR"

version: "1.0.0"
tags:
  - "mvhr"
  - "ventilation"
  - "heat-recovery"
  - "building-01"
  - "level-01"
  - "commissioned"
---

# Instancja zasobu: Centrala wentylacyjna MVHR - Poziom 01

**Typ:** Centrala wentylacyjna z odzyskiem ciepła (MVHR)
**Kategoria:** HVAC - Wentylacja
**System:** [SYS-HVAC-01](../systemy/sys-hvac-01.md)

Centrala MVHR obsługująca wszystkie 18 lokali mieszkalnych na Poziomie 01, zapewniająca ciągły nawiew świeżego powietrza z odzyskiem ciepła.

## Szczegóły instalacji

- **Numer seryjny:** MVHR-2024-L01-789
- **Tag zasobu:** MVHR-01
- **Lokalizacja:** Pomieszczenie techniczne, Poziom 01
- **Data instalacji:** 2024-05-10
- **Instalator:** Ventilation Systems Sp. z o.o. (Piotr Nowak #VT-5678)
- **Data uruchomienia:** 2024-05-15

## Specyfikacja techniczna

| Parametr | Wartość | Jednostka |
|----------|---------|-----------|
| **Przepływ powietrza (projektowy)** | 300 | m³/h |
| **Sprawność odzysku ciepła** | 92% | - |
| **Klasa filtrów** | F7 / G4 | - |
| **Pobór mocy** | 65 | W (średnie obroty) |
| **Poziom hałasu** | 28 | dB(A) w odległości 3 m |
| **Wymiary** | 800×600×400 | mm (S×G×W) |

## Wydajność

- **Zmierzona sprawność:** 92,3% (przekracza znamionowe 92%)
- **Przepływ nawiewu:** 305 m³/h (zmierzony)
- **Przepływ wywiewu:** 300 m³/h (zmierzony)
- **Pobór mocy:** 62 W przy średnich obrotach

## Zasada działania

### Droga przepływu powietrza
1. **Czerpnia powietrza zewnętrznego** → filtr G4 → wymiennik ciepła (ogrzanie) → wentylator nawiewny → **Nawiew do lokali mieszkalnych**
2. **Wywiew z lokali mieszkalnych** → wentylator wywiewny → filtr F7 → wymiennik ciepła (schłodzenie) → **Wyrzutnia na zewnątrz**

### Odzysk ciepła
- Przeciwprądowy wymiennik ciepła
- Ciepło z ciepłego powietrza wywiewanego przekazywane do zimnego powietrza nawiewanego
- Sprawność: 92% (warunki zimowe)
- Klapa obejściowa (bypass) do nocnego chłodzenia latem

## Harmonogram konserwacji

| Interwał | Czynność | Odpowiedzialny |
|----------|----------|----------------|
| **3 miesiące** | Przegląd/czyszczenie filtra nawiewnego G4 | Zarządca budynku |
| **6 miesięcy** | Wymiana filtra G4 | Zarządca budynku |
| **12 miesięcy** | Wymiana filtra F7, przegląd wymiennika ciepła, czyszczenie wentylatorów | Wykonawca serwisowy |

## Historia serwisowa

| Data | Typ | Wykonawca | Uwagi |
|------|-----|-----------|-------|
| 2024-05-15 | Uruchomienie | Ventilation Systems | Sprawność 92,3%, wszystkie testy zaliczone |
| 2024-08-10 | Wymiana filtra | Zarządca budynku | Wymieniono filtr nawiewny G4 |
| 2024-11-10 | Serwis roczny | Ventilation Systems | Wymieniono filtr F7, wyczyszczono wymiennik ciepła |
| 2025-05-10 | Serwis roczny (planowany) | - | Zaplanowany pełny przegląd |

## Części zamienne na miejscu

- **Filtr nawiewny G4 800×600** (szt.: 2) - Lokalizacja: Półka w pomieszczeniu technicznym
- **Filtr wywiewny F7 800×600** (szt.: 1) - Lokalizacja: Półka w pomieszczeniu technicznym

## Gwarancja

- **Początek:** 2024-05-10
- **Koniec:** 2029-05-10 (5 lat na części i robociznę)
- **Wymiennik ciepła:** Rozszerzona gwarancja 10 lat
- **Gwarant:** Producent centrali MVHR

## Integracja z cyfrowym bliźniakiem

**6 czujników podłączonych:**
- Temperatura powietrza nawiewanego
- Temperatura powietrza wywiewanego
- Temperatura powietrza zewnętrznego
- Temperatura powietrza wyrzucanego
- Ciśnienie w kanale nawiewnym
- Ciśnienie w kanale wywiewnym

**Rejestracja danych:** Wszystkie parametry zapisywane co 5 minut do systemu BMS

## Podsumowanie kosztów

| Pozycja | Koszt (EUR) |
|---------|-------------|
| Urządzenie | 3 500 EUR |
| Instalacja | 1 200 EUR |
| **Razem** | **4 700 EUR** |

---

**Status:** Operacyjny
**Następny serwis:** 2025-05-10
**Oczekiwana żywotność:** 15 lat (do ok. 2039)
**Ostatnia aktualizacja:** 2026-02-27
