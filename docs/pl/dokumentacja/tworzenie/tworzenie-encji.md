# Tworzenie kart

Ten przewodnik przeprowadzi Cię przez tworzenie każdego typu karty SBM z przykładami z rzeczywistych projektów.

## Tworzenie budynku

Karta budynku definiuje metadane na poziomie projektu i jurysdykcję regulacyjną.

### Kiedy tworzyć

- Na początku każdego projektu
- Jeden budynek na projekt (projekty wielobudynkowe używają wielu kart budynków)

### Krok po kroku

**1. Utwórz plik:** `building.md`

**2. Dodaj metadane:**
```yaml
---
documentType: "building"
entityType: "building"
id: "BLD-01"
projectPhase: "design_development"

buildingName: "Green Terrace Apartments"
buildingType: "residential_multifamily"
country: "PL"  # ← Uruchamia wczytywanie pakietu jurysdykcji

address:
  street: "ul. Słoneczna 42"
  city: "Warsaw"
  postalCode: "00-001"

grossFloorArea: 4850
numberOfLevels: 4
numberOfUnits: 32

version: "1.0.0"
---
```

**3. Skompiluj i zweryfikuj:**
```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

---

## Tworzenie kondygnacji

Kondygnacje organizują przestrzenie w pionie i definiują **typowe właściwości**, które kaskadowo przekazują się do wszystkich przestrzeni na tym piętrze.

### Kiedy tworzyć

- Po utworzeniu budynku
- Jedna kondygnacja na piętro

### Krok po kroku

**1. Utwórz plik:** `levels/level-01.md`

**2. Dodaj dane kondygnacji z właściwościami dziedziczonymi:**
```yaml
---
documentType: "level"
entityType: "level"
id: "LVL-01"

levelName: "Level 01 (Ground)"
buildingId: "BLD-01"
levelNumber: 0

elevation: 0.0
elevationUnit: "m"

levelHeight: 3.20
levelHeightUnit: "m"

# Dziedziczenie właściwości (v0.1.4) - Zdefiniuj raz, dziedź we wszystkich przestrzeniach
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Deska inżynierska dębowa 3-warstwowa 15mm"
  walls: "Farba akrylowa biała RAL 9010"
  ceiling: "Farba akrylowa biała RAL 9010"
  baseboard: "Listwa MDF biała 80mm"

typicalEnvironmentalConditions:
  temperatureRange:
    min: 20.0
    max: 24.0
    unit: "C"
  humidityRange:
    min: 40
    max: 60
  ventilationRate:
    value: 0.5
    unit: "ACH"
  pressurization: "neutral"

levelRequirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
  - "REQ-LEVEL-FIRE-RATING"
  - "REQ-LEVEL-ACOUSTIC-B"

grossFloorArea: 1250
areaUnit: "m2"

version: "1.0.0"
---
```

**Ważne:**
- `elevation` jest względne do punktu bazowego budynku
- `levelHeight` to wysokość od podłogi do podłogi (nie wysokość sufitu)
- Numeracja kondygnacji: Parter = 0, Piwnica = -1, Pierwsze piętro = 1

**NOWOŚĆ w v0.1.4: Właściwości dziedziczone**
- `typicalCeilingHeight` - Wszystkie przestrzenie na tym poziomie dziedziczą jako `designHeight` (chyba że jawnie nadpisane)
- `typicalFinishes` - Wszystkie przestrzenie dziedziczą te wykończenia (chyba że nadpisane przez `finishOverrides`)
- `typicalEnvironmentalConditions` - Wszystkie przestrzenie dziedziczą ustawienia HVAC (chyba że jawnie określone)
- `levelRequirements` - Scalane z wymaganiami przestrzeni (nie zastępowane)

**Kiedy definiować typowe właściwości:**
- ✅ **Tak, jeśli 80%+ pomieszczeń ma tę samą wartość** (np. wszystkie sypialnie mają sufit 2,70m)
- ✅ **Tak, dla standardowych pięter mieszkalnych/biurowych** (spójne wykończenia na piętrze)
- ❌ **Nie, jeśli każde pomieszczenie jest inne** (piętra wielofunkcyjne z różnymi wysokościami)

---

## Tworzenie przestrzeni

Przestrzenie to pomieszczenia i obszary funkcjonalne. **Większość właściwości dziedziczy z kondygnacji** - określaj tylko to, co jest inne.

### Kiedy tworzyć

- Po utworzeniu kondygnacji
- Jedna przestrzeń na pomieszczenie/obszar

### Typowe typy przestrzeni

- **Mieszkalne:** `bedroom`, `living_room`, `kitchen`, `bathroom`
- **Komercyjne:** `office`, `meeting_room`, `break_room`
- **Komunikacyjne:** `corridor`, `staircase`, `elevator_lobby`
- **Pomocnicze:** `storage`, `technical`

### Wzorzec dziedziczenia właściwości (v0.1.4)

::: tip Zasada kluczowa: Nie powtarzaj się
Jeśli właściwość jest taka sama dla większości pomieszczeń na piętrze, zdefiniuj ją **raz na kondygnacji** - wszystkie przestrzenie dziedziczą automatycznie.
:::

**Matryca decyzyjna:**

| Właściwość | Definiować na kondygnacji? | Nadpisać w przestrzeni? |
|-----------|---------------------------|------------------------|
| Wysokość sufitu (2.70m dla wszystkich sypialni) | ✅ Tak (`typicalCeilingHeight`) | Tylko jeśli inna (np. łazienka 2.40m) |
| Wykończenia (dąb dla wszystkich) | ✅ Tak (`typicalFinishes`) | Tylko jeśli inne (np. płytki w łazience) |
| Warunki środowiskowe (20-24°C) | ✅ Tak (`typicalEnvironmentalConditions`) | Tylko jeśli inne (np. serwerownia) |
| Powierzchnia | ❌ Nie | ✅ Zawsze określ (unikalne dla pokoju) |
| Przypisania stref | ❌ Nie | ✅ Określ per pomieszczenie (różne) |

### Przykład krok po kroku: Sypialnia (z dziedziczeniem)

**1. Utwórz plik:** `spaces/bedroom-01.md`

**2. Zdefiniuj przestrzeń (tylko dane specyficzne dla instancji):**
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"

# Dane przestrzenne specyficzne dla instancji
designArea: 14.5
# designHeight: 2.70  ← DZIEDZICZONE z LVL-01.typicalCeilingHeight
# finishes ← DZIEDZICZONE z LVL-01.typicalFinishes
# environmentalConditions ← DZIEDZICZONE z LVL-01.typicalEnvironmentalConditions
designVolume: 39.15
unit: "m"

zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Sypialnia 01

Standardowa sypialnia z oknem od strony północnej.

::: tip Dziedziczy z kondygnacji
Zobacz `levels/level-01.md` dla dziedziczonej wysokości sufitu, wykończeń, warunków środowiskowych i wymagań bazowych.
:::

## Wymagania
- Minimalny współczynnik oświetlenia dziennego 2%
- Izolacja akustyczna klasy B
- Wysokość pomieszczenia ≥ 2,50 m (WT 2021 § 132)
```

**3. Skompiluj, aby zweryfikować relacje:**
```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL
```

**4. Sprawdź, czy referencje stref zostały rozwiązane:**
```bash
cat build/my-project/sbm.json | jq '.entities.zones[] | select(.id == "ZONE-FIRE-ZL-IV") | .spaceIds'
```

Oczekiwane wyjście:
```json
[
  "SP-BLD-01-L01-001"
]
```

---

### Przykład nadpisania: Łazienka (inny sufit i wykończenia)

Gdy przestrzeń potrzebuje **innych wartości** niż wartości domyślne z kondygnacji, użyj jawnych właściwości lub `finishOverrides`:

**1. Utwórz plik:** `spaces/bathroom-01.md`

**2. Nadpisz to, co jest inne:**
```yaml
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-002"

spaceName: "Łazienka 01"
spaceType: "bathroom"
buildingId: "BLD-01"
levelId: "LVL-01"

designArea: 4.2
designHeight: 2.40  # ← NADPISANIE: Obniżony sufit (nie 2.70m z kondygnacji)

# Nadpisanie wykończeń (łazienka potrzebuje płytek, nie dębu z kondygnacji)
finishOverrides:
  floor: "Płytki ceramiczne 30x60 antypoślizgowe"
  walls: "Płytki ceramiczne 30x60 połysk"
  # ceiling: farba biała ← DZIEDZICZONE z kondygnacji
  # baseboard: listwa MDF biała ← DZIEDZICZONE z kondygnacji

# environmentalConditions ← DZIEDZICZONE z kondygnacji (20-24°C jest OK)

version: "1.0.0"
---

# Łazienka 01

::: tip Dziedziczy z kondygnacji (częściowo)
Zobacz `levels/level-01.md` - dziedziczy wykończenie sufitu, warunki środowiskowe.
Nadpisania: wysokość sufitu (2.40m), wykończenia podłogi/ścian (płytki ceramiczne).
:::
```

**Rezultat:**
- Wysokość sufitu: 2.40m (nadpisane)
- Podłoga: Płytki ceramiczne (nadpisane)
- Ściany: Płytki ceramiczne (nadpisane)
- Sufit: Farba biała (dziedziczone z kondygnacji)
- Warunki środowiskowe: 20-24°C (dziedziczone z kondygnacji)

---

## Tworzenie stref

Strefy grupują przestrzenie według kryteriów funkcjonalnych (pożarowe, HVAC, akustyczne, bezpieczeństwa).

### Kiedy tworzyć

- Po zaplanowaniu układu przestrzeni
- Twórz strefy przed odwoływaniem się do nich w przestrzeniach

### Typowe typy stref

- **Strefy pożarowe:** `"fire"` - Strefy pożarowe, kontrola dymu
- **Strefy HVAC:** `"hvac"` - Obszary kontroli termicznej
- **Strefy akustyczne:** `"acoustic"` - Obszary izolacji akustycznej
- **Strefy bezpieczeństwa:** `"security"` - Poziomy kontroli dostępu

### Przykład krok po kroku: Strefa pożarowa

**1. Utwórz plik:** `zones/fire-zone-zl-iv.md`

**2. Zdefiniuj strefę:**
```yaml
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"

zoneName: "Fire Zone ZL-IV (Residential)"
zoneType: "fire"
buildingId: "BLD-01"

zoneClassification: "ZL-IV"
fireRating: "REI 60"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"

description: >
  Residential fire zone with low fire load (ZL-IV per WT 2021 § 234).
  Requires REI 60 walls and floors, EI 30 fire doors.

version: "1.0.0"
tags:
  - "fire_safety"
  - "residential"
---

# Fire Zone ZL-IV

Low fire load residential zone per WT 2021 requirements.

## Fire Safety Requirements
- **Fire resistance:** REI 60 for walls and floors
- **Door rating:** EI 30 for fire doors
- **Egress:** Maximum travel distance 40m
```

**Uwaga:** Pole `spaceIds` zostanie obliczone automatycznie podczas kompilacji.

---

## Tworzenie systemów

Systemy reprezentują systemy MEP (HVAC, elektryczny, hydrauliczny).

### Kiedy tworzyć

- Podczas opracowania projektu (LOD 300)
- Po zdefiniowaniu stref (systemy zazwyczaj obsługują strefy)

### Typowe kategorie systemów

- `"hvac"` - Ogrzewanie, wentylacja, klimatyzacja
- `"electrical"` - Dystrybucja energii, oświetlenie
- `"plumbing"` - Zaopatrzenie w wodę, kanalizacja
- `"fire_safety"` - Alarm pożarowy, gaśnice

### Przykład krok po kroku: System HVAC

**1. Utwórz plik:** `systems/sys-hvac-01.md`

**2. Zdefiniuj system:**
```yaml
---
documentType: "system"
entityType: "system"
id: "SYS-HVAC-01"

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

energySource: "electricity_heat_pump"

requirements:
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-THERMAL-COMFORT-001"

version: "1.0.0"
tags:
  - "hvac"
  - "heat_pump"
---

# HVAC System 01

VAV heat pump system serving north zone.

## System Components
- **AHU:** Rooftop air handling unit (AI-AHU-01)
- **VAV boxes:** 12 terminal units
- **Controls:** BACnet DDC via BMS
```

---

## Tworzenie instancji zasobów

Instancje zasobów to fizyczne urządzenia z danymi konserwacyjnymi.

### Kiedy tworzyć

- Podczas dokumentacji wykonawczej (LOD 400)
- Gdy urządzenia są specyfikowane/zamawiane

### Typowe typy zasobów

- **HVAC:** `"ahu"`, `"vav_box"`, `"heat_pump"`, `"pump"`
- **Elektryczne:** `"transformer"`, `"panel_board"`, `"ups"`
- **Hydrauliczne:** `"water_heater"`, `"pump"`
- **Pożarowe:** `"fire_alarm_panel"`, `"smoke_detector"`

### Przykład krok po kroku: Centrala wentylacyjna

**1. Utwórz plik:** `assets/ai-ahu-01.md`

**2. Zdefiniuj zasób:**
```yaml
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-AHU-01"

assetName: "Air Handling Unit 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
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

maintenanceSchedule:
  tasks:
    - taskId: "MAINT-AHU-FILTER"
      taskName: "Replace air filters"
      frequency: "quarterly"
      estimatedDuration: 2
      durationUnit: "hours"

spareParts:
  - partName: "Air filter F7"
    partNumber: "SF-F7-600x600"
    quantity: 4
    reorderLevel: 2
    unitCost: 145
    currency: "PLN"

version: "1.0.0"
---

# Air Handling Unit 01

Rooftop AHU serving north zone HVAC system.

## Maintenance Schedule
### Quarterly
- Replace air filters

### Annual
- Full performance test
- Calibrate sensors
```

---

## Tworzenie wymagań

Wymagania definiują reguły wydajnościowe, regulacyjne lub projektowe.

### Kiedy tworzyć

Większość wymagań pochodzi z pakietów jurysdykcji (globalne + krajowe).

**Twórz własne wymagania dla:**
- Wymagań klienta specyficznych dla projektu
- Specjalnych celów wydajnościowych
- Własnych standardów projektowych

### Typy wymagań

- `"performance"` - Cele funkcjonalne (nasłonecznienie, komfort cieplny)
- `"dimensional"` - Ograniczenia wymiarowe (wysokość pomieszczenia, szerokość korytarza)
- `"regulatory"` - Zgodność prawna (WT 2021, przepisy budowlane)
- `"design"` - Standardy projektowe

### Przykład krok po kroku: Własne wymaganie klienta

**1. Utwórz plik:** `requirements/req-client-ceiling-height-001.md`

**2. Zdefiniuj wymaganie:**
```yaml
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-CLIENT-CEILING-HEIGHT-001"

requirementName: "Client-specified office ceiling height"
requirementType: "dimensional"
countryScope: "project_specific"

scope:
  entityType: "space"
  spaceTypes: ["office", "meeting_room"]

metric: "room_height_clear"
operator: ">="
value: 3.00
unit: "m"

verification:
  method: "measurement"
  phase: ["as_built"]
  responsible: "contractor"

description: >
  Client requires 3.00m clear height for all office spaces
  (exceeds code minimum of 2.50m) to allow for exposed
  mechanical systems with dropped ceilings.

version: "1.0.0"
tags:
  - "dimensional"
  - "client_requirement"
---

# Client Requirement: Office Ceiling Height

Custom requirement exceeding building code minimum.

## Justification
Exposed mechanical systems require additional clearance
above dropped ceiling for maintenance access.
```

**3. Odwołaj się w przestrzeniach:**
```yaml
# office-01.md
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"  # Minimum kodowe (2.50m)
  - "REQ-CLIENT-CEILING-HEIGHT-001"  # Wymaganie klienta (3.00m)
```

---

## Przepływ pracy: Budowanie kompletnego projektu

### 1. Zacznij od budynku

```bash
# Utwórz kartę budynku
vim docs/en/examples/my-project/building.md
```

### 2. Dodaj kondygnacje

```bash
# Utwórz kondygnacje
vim docs/en/examples/my-project/levels/level-01.md
vim docs/en/examples/my-project/levels/level-02.md
```

### 3. Zaplanuj strefy

```bash
# Utwórz strefy
vim docs/en/examples/my-project/zones/fire-zone-zl-iv.md
vim docs/en/examples/my-project/zones/hvac-zone-north.md
```

### 4. Utwórz przestrzenie

```bash
# Utwórz przestrzenie z referencjami do stref
vim docs/en/examples/my-project/spaces/bedroom-01.md
vim docs/en/examples/my-project/spaces/living-room-01.md
```

### 5. Dodaj systemy (opracowanie projektu)

```bash
# Utwórz systemy
vim docs/en/examples/my-project/systems/sys-hvac-01.md
```

### 6. Dodaj zasoby (dokumentacja wykonawcza)

```bash
# Utwórz instancje zasobów
vim docs/en/examples/my-project/assets/ai-ahu-01.md
```

### 7. Skompiluj i zwaliduj

```bash
# Pełna kompilacja
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose
```

### 8. Przejrzyj wyniki

```bash
# Sprawdź zgodność
cat build/my-project/compliance_report.json | jq '.summary'

# Sprawdź mapowanie BIM
cat build/my-project/bim_mapping.json | jq '.revitSharedParameters'

# Sprawdź rejestr zasobów
cat build/my-project/asset_register.json | jq '.assetInventory | length'
```

---

## Wskazówki dla efektywnego tworzenia

### Używaj szablonów

Kopiuj szablony z istniejących kart:

```bash
# Skopiuj szablon przestrzeni
cp docs/en/examples/green-terrace/spaces/bedroom-01.md \
   docs/en/examples/my-project/spaces/bedroom-02.md

# Edytuj kopię
vim docs/en/examples/my-project/spaces/bedroom-02.md
```

### Waliduj często

Uruchamiaj walidację po utworzeniu każdej karty:

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

### Używaj spójnych ID

Przestrzegaj konwencji nazewnictwa:
- Przestrzenie: `SP-{budynek}-{kondygnacja}-{seq}`
- Strefy: `ZONE-{typ}-{deskryptor}`
- Systemy: `SYS-{kategoria}-{seq}`
- Zasoby: `AI-{typ}-{seq}`

### Integracja z kontrolą wersji

Commituj karty do Git w miarę ich tworzenia:

```bash
git add docs/en/examples/my-project/spaces/bedroom-01.md
git commit -m "Add bedroom 01 space entity"
```

---

## Zobacz także

- **[Szablony kart](/pl/dokumentacja/tworzenie/szablony)** - Szablony do kopiowania
- **[Referencja kart](/pl/dokumentacja/encje/)** - Pełna dokumentacja pól
- **[Przewodnik kompilatora](/pl/dokumentacja/kompilator/)** - Kompilowanie kart
