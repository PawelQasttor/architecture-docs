---
entityType: "asset"
id: "AST-UFH-MANIFOLD-01"
assetName: "Underfloor Heating Manifold - Level 01"
projectPhase: "construction"
bimLOD: "LOD_400"

assetTypeId: "AT-UFH-MANIFOLD-12ZONE"
category: "hvac"

# Instance identifiers
identifiers:
  assetTag: "UFH-MAN-01"
  serial: "UFH-MAN-2024-001567"
  barcode: "7612345678925"

# Location
buildingId: "BLD-01"
locatedInSpaceId: "SP-BLD-01-L01-CORR"
systemId: "SYS-HVAC-01"

# Technical Specifications
specifications:
  zones: 12  # Number of controlled zones
  flowTemperature: 35  # °C design flow temperature
  maxFlowRate: 1200  # L/h total
  pipeConnections: "3/4 inch Euroconus"
  actuatorType: "230V NC (normally closed)"
  mixingValveType: "3-way thermostatic"
  pumpType: "Wilo Yonos PARA RS 25/6"
  dimensions:
    width: 850
    depth: 150
    height: 600
    unit: "mm"

# Zone Configuration
zoneConfiguration:
  - zoneNumber: 1
    zoneName: "Bedroom 01"
    spaceId: "SP-BLD-01-L01-001"
    loopLength: 80  # m
    flowRate: 100  # L/h
    actuatorId: "ACT-UFH-Z01"
    thermostatId: "TSTAT-ROOM-001"

  - zoneNumber: 2
    zoneName: "Bedroom 02"
    spaceId: "SP-BLD-01-L01-002"
    loopLength: 75  # m
    flowRate: 95  # L/h
    actuatorId: "ACT-UFH-Z02"
    thermostatId: "TSTAT-ROOM-002"

  - zoneNumber: 3
    zoneName: "Corridor"
    spaceId: "SP-BLD-01-L01-CORR"
    loopLength: 120  # m
    flowRate: 150  # L/h
    actuatorId: "ACT-UFH-Z03"
    thermostatId: "TSTAT-CORR-001"

  # Zones 4-12 for other units (not detailed in this example)

# Installation data
installationData:
  installationDate: "2024-04-20"
  installedBy: "Heating Solutions Sp. z o.o."
  installer: "Marek Wiśniewski (certified plumber #PL-8901)"
  commissioningDate: "2024-04-25"
  commissionedBy: "Heating Solutions Sp. z o.o."
  commissioningNotes: |
    - All 12 zones pressure tested (6 bar, 24 hours) - no leaks
    - Flow rates balanced to design values
    - Actuators tested and calibrated
    - Mixing valve set to 35°C
    - Pump speed optimized for flow distribution
    - All thermostats paired and tested

# Warranty and service
warranty:
  warrantyStart: "2024-04-20"
  warrantyEnd: "2029-04-20"
  warrantyProvider: "Heating Solutions Sp. z o.o."
  warrantyTerms: "5 years parts and labor, 2-year pump warranty"

maintenance:
  lastServiceDate: "2024-10-20"
  nextServiceDue: "2025-04-20"
  maintenanceContractor: "Heating Solutions Sp. z o.o."
  serviceIntervalMonths: 12
  maintenanceSchedule:
    - interval: "12 months"
      task: "Actuator operation test, pump inspection, mixing valve check, pressure test"
    - interval: "24 months"
      task: "Full system flush and cleaning, pump replacement (if needed)"
  expectedLifetimeYears: 20

# Service history
serviceHistory:
  - date: "2024-04-25"
    type: "commissioning"
    performedBy: "Heating Solutions Sp. z o.o."
    notes: "Initial commissioning - all zones balanced, 6-bar pressure test passed"
  - date: "2024-10-20"
    type: "6month_inspection"
    performedBy: "Heating Solutions Sp. z o.o."
    notes: "All actuators operating correctly, pump performance good, no leaks detected"

# Spare parts
spareParts:
  - partName: "Actuator 230V NC"
    partNumber: "ACT-UFH-NC-230V"
    quantity: 2
    location: "Manifold cabinet"
  - partName: "Pump Wilo RS 25/6"
    partNumber: "WILO-RS-25-6"
    quantity: 0
    notes: "Order when needed (24-hour delivery)"

# Performance data
performanceData:
  supplyTemperature: 35.2  # °C (measured at manifold)
  returnTemperature: 30.8  # °C (measured at manifold)
  deltaT: 4.4  # °C
  totalFlowRate: 1180  # L/h (measured)
  pumpSpeed: 3  # speed setting (1-6)
  powerDraw: 35  # W
  measuredDate: "2024-10-20"

# BIM Integration
bimIntegration:
  geometryReference:
    primarySource: "ifc"
    ifcSource: "../bim/Green-Terrace-2026-02-27.ifc"
    ifcGlobalId: "2N5wL2$uMDax6YaHx5OSbV"
    ifcEntity: "IfcFlowController"

    ifcExtractedProperties:
      numberOfZones: 12
      dimensions: [850, 150, 600]
      lastExtracted: "2026-02-27T10:30:00Z"

    validation:
      locationMatch: true
      dimensionsMatch: true
      zoneCountMatch: true
      lastValidated: "2026-02-27T10:30:00Z"

# Digital Twin Integration
iotDevices:
  - deviceId: "sensor_ufh_manifold_supply_temp"
    type: "temperature_sensor"
    location: "supply_header"
    dataPoint: "manifold_supply_temperature"
  - deviceId: "sensor_ufh_manifold_return_temp"
    type: "temperature_sensor"
    location: "return_header"
    dataPoint: "manifold_return_temperature"
  - deviceId: "sensor_ufh_manifold_supply_pressure"
    type: "pressure_sensor"
    location: "supply_header"
    dataPoint: "manifold_supply_pressure"
  - deviceId: "sensor_ufh_manifold_return_pressure"
    type: "pressure_sensor"
    location: "return_header"
    dataPoint: "manifold_return_pressure"
  - deviceId: "flowmeter_ufh_manifold_total"
    type: "flow_meter"
    location: "supply_header"
    dataPoint: "total_flow_rate"

# Actuator devices (12 zones)
actuators:
  - actuatorId: "ACT-UFH-Z01"
    zone: 1
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_01"
  - actuatorId: "ACT-UFH-Z02"
    zone: 2
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_02"
  - actuatorId: "ACT-UFH-Z03"
    zone: 3
    type: "230V_NC_thermal"
    controlSignal: "BMS_Zone_03"
  # Actuators 4-12 for other zones

# Cost data
cost:
  purchasePrice: 2800  # Manifold + actuators + pump
  installationCost: 1500  # Labor + materials
  totalCost: 4300
  currency: "EUR"

version: "1.0.0"
tags:
  - "underfloor-heating"
  - "manifold"
  - "distribution"
  - "building-01"
  - "level-01"
  - "commissioned"
---

# Instancja zasobu: Rozdzielacz ogrzewania podłogowego - Poziom 01

**Typ:** Rozdzielacz ogrzewania podłogowego (12 stref)
**Kategoria:** HVAC - Dystrybucja ogrzewania
**System:** [SYS-HVAC-01](../systemy/sys-hvac-01.md)

Centralny rozdzielacz sterujący 12 strefami ogrzewania podłogowego na Poziomie 01, odbierający podgrzaną wodę z pompy ciepła i dystrybuujący ją do poszczególnych lokali mieszkalnych.

## Szczegóły instalacji

- **Numer seryjny:** UFH-MAN-2024-001567
- **Tag zasobu:** UFH-MAN-01
- **Lokalizacja:** Szafka techniczna na korytarzu, Poziom 01
- **Data instalacji:** 2024-04-20
- **Instalator:** Heating Solutions Sp. z o.o. (Marek Wiśniewski #PL-8901)
- **Data uruchomienia:** 2024-04-25

## Specyfikacja techniczna

| Parametr | Wartość | Jednostka |
|----------|---------|-----------|
| **Liczba stref** | 12 | - |
| **Temperatura zasilania** | 35 | °C |
| **Maks. przepływ** | 1 200 | L/h |
| **Przyłącza rurowe** | 3/4" Euroconus | - |
| **Siłowniki** | 230V NC (normalnie zamknięte) | - |
| **Pompa** | Wilo Yonos PARA RS 25/6 | - |
| **Wymiary** | 850×150×600 | mm (S×G×W) |

## Konfiguracja stref

| Strefa | Pomieszczenie | ID przestrzeni | Długość pętli | Przepływ | Siłownik | Termostat |
|--------|---------------|----------------|---------------|----------|----------|-----------|
| 1 | Sypialnia 01 | SP-BLD-01-L01-001 | 80 m | 100 L/h | ACT-UFH-Z01 | TSTAT-ROOM-001 |
| 2 | Sypialnia 02 | SP-BLD-01-L01-002 | 75 m | 95 L/h | ACT-UFH-Z02 | TSTAT-ROOM-002 |
| 3 | Korytarz | SP-BLD-01-L01-CORR | 120 m | 150 L/h | ACT-UFH-Z03 | TSTAT-CORR-001 |
| 4-12 | Pozostałe lokale | - | - | - | - | - |

**Całkowity przepływ (12 stref):** 1 180 L/h (zmierzony)

## Zasada działania

### Droga przepływu
1. **Pompa ciepła** (AST-HP-01) → obieg pierwotny @ 35°C
2. **Zawór mieszający** → utrzymuje temperaturę zasilania 35°C
3. **Kolektor zasilający rozdzielacza** → rozdziela na 12 stref
4. **Siłowniki strefowe** → otwierają/zamykają w zależności od zapotrzebowania termostatu pokojowego
5. **Pętle podłogowe** → przekazywanie ciepła do płyty podłogowej
6. **Kolektor powrotny rozdzielacza** → zbiera wodę powrotną (~31°C)
7. **Pompa** → wymusza cyrkulację wody w obiegu dystrybucyjnym
8. Powrót do pompy ciepła

### Logika sterowania
- **Termostaty pokojowe** zgłaszają zapotrzebowanie na ciepło → otwarcie siłownika strefowego
- **Zawór mieszający** utrzymuje temperaturę zasilania 35°C
- **Pompa** pracuje, gdy dowolna strefa jest otwarta
- **Monitoring BMS** rejestruje temperatury, ciśnienia, przepływy

## Wydajność

| Parametr | Projektowy | Zmierzony | Status |
|----------|-----------|-----------|--------|
| Temperatura zasilania | 35,0°C | 35,2°C | OK |
| Temperatura powrotu | 31,0°C | 30,8°C | OK |
| Delta T | 4,0°C | 4,4°C | OK |
| Całkowity przepływ | 1 200 L/h | 1 180 L/h | OK |
| Bieg pompy | 3 | 3 | OK |
| Pobór mocy | - | 35 W | OK |

## Harmonogram konserwacji

| Interwał | Czynność | Odpowiedzialny |
|----------|----------|----------------|
| **12 miesięcy** | Test siłowników, przegląd pompy, kontrola zaworu mieszającego, próba ciśnieniowa | Wykonawca serwisowy |
| **24 miesiące** | Pełne płukanie i czyszczenie instalacji | Wykonawca serwisowy |

## Historia serwisowa

| Data | Typ | Wykonawca | Uwagi |
|------|-----|-----------|-------|
| 2024-04-25 | Uruchomienie | Heating Solutions | Próba ciśnieniowa 6 bar zaliczona, wszystkie strefy wyważone |
| 2024-10-20 | Przegląd 6-miesięczny | Heating Solutions | Siłowniki sprawne, pompa w dobrym stanie, brak wycieków |
| 2025-04-20 | Serwis roczny (planowany) | - | Zaplanowany pełny przegląd |

## Części zamienne na miejscu

- **Siłownik 230V NC** (szt.: 2) - Lokalizacja: Szafka rozdzielacza
- **Pompa Wilo RS 25/6** - Zamówienie w razie potrzeby (dostawa 24h)

## Gwarancja

- **Początek:** 2024-04-20
- **Koniec:** 2029-04-20 (5 lat na części i robociznę)
- **Pompa:** 2-letnia gwarancja producenta
- **Gwarant:** Heating Solutions Sp. z o.o.

## Integracja z cyfrowym bliźniakiem

**5 czujników podłączonych:**
- Temperatura zasilania rozdzielacza
- Temperatura powrotu rozdzielacza
- Ciśnienie w kolektorze zasilającym
- Ciśnienie w kolektorze powrotnym
- Całkowity przepływ

**12 punktów sterowania siłownikami** (sterowane przez BMS, jeden na strefę)

**Rejestracja danych:** Wszystkie parametry zapisywane co 5 minut do systemu BMS

## Podsumowanie kosztów

| Pozycja | Koszt (EUR) |
|---------|-------------|
| Rozdzielacz + siłowniki + pompa | 2 800 EUR |
| Instalacja | 1 500 EUR |
| **Razem** | **4 300 EUR** |

## Integracja z pompą ciepła

Rozdzielacz otrzymuje podgrzaną wodę z **pompy ciepła Bosch Compress 7000i** (AST-HP-01):
- Pompa ciepła zapewnia temperaturę zasilania 35°C (niskotemperaturowa konstrukcja)
- COP ~4,3 przy tych warunkach pracy (bardzo wydajna)
- Moc grzewcza pompy ciepła: 12 kW (wystarczająca dla wszystkich 12 stref)

---

**Status:** Operacyjny
**Następny serwis:** 2025-04-20
**Oczekiwana żywotność:** 20 lat (do ok. 2044)
**Ostatnia aktualizacja:** 2026-02-27
