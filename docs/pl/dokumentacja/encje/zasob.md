# Zasob (Dokumentacja Urządzeń)

## Czym To Jest

**Plik Zasobu** dokumentuje jedno urządzenie fizyczne. Przykłady: "Centrala wentylacyjna 01 (Serial: SR11-2026-04782)", "Winda 1A".

::: tip Dla Architektów
**Problem:** Zarządca obiektu pyta "Kiedy kończy się gwarancja na AHU-01?" lub "Jakie filtry trzeba zamówić?"

**Stary sposób:** Szukaj w dokumentacji powykonawczej, sprawdzaj instrukcje O&M, e-mail do wykonawcy branży sanitarnej.

**Z zasobami:** Otwórz `assets/ast-ahu-01.md` — data gwarancji, części zamienne, harmonogram konserwacji w jednym pliku. **Bez szukania.**

**Jeden plik urządzenia = wszystkie info (gwarancja, konserwacja, specyfikacja) śledzone automatycznie.**
:::

**Zasób** reprezentuje konkretne urządzenie fizyczne z danymi konserwacyjnymi, informacjami gwarancyjnymi i monitoringiem operacyjnym. Zasoby umożliwiają zarządzanie obiektem, integrację z CMMS oraz monitoring w czasie rzeczywistym przez Cyfrowego Bliźniaka.

## Przeznaczenie

Zasoby śledzą:
- Tożsamość urządzeń fizycznych (producent, model, numer seryjny)
- Lokalizację instalacji (przestrzeń, poziom, budynek)
- Harmonogramy konserwacji i historię serwisową
- Informacje gwarancyjne i dane cyklu życia
- Inwentarz części zamiennych
- Powiązania czujników IoT do monitoringu w czasie rzeczywistym

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator zasobu | `"AST-AHU-01"` |
| `entityType` | string | Musi być `"asset"` | `"asset"` |
| `assetName` | string | Nazwa czytelna dla ludzi | `"Air Handling Unit 01"` |
| `assetType` | string | Typ urządzenia (patrz kategorie poniżej) | `"ahu"` |
| `systemId` | string | ID systemu nadrzędnego | `"SYS-HVAC-01"` |
| `buildingId` | string | ID budynku nadrzędnego | `"BLD-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator urządzenia (np. `AST-AHU-01`)
- **assetName**: Jak to nazywasz ("Centrala wentylacyjna 01", "Winda 1A")
- **assetType**: Kategoria urządzenia — `ahu`, `pump`, `elevator`, `fire_alarm_panel`
- **systemId**: Do którego systemu MEP to należy (np. `SYS-HVAC-01`)
- **buildingId**: Który budynek
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 6 pól.** Reszta (gwarancja, konserwacja, specyfikacja) jest opcjonalna, ale przydatna dla zarządzania obiektem.
:::

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
| `constructionPackageId` | string | **[v0.6]** Odniesienie do pakietu robót budowlanych |
| `ifcMapping` | object | Mapowanie obiektu IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla przekazania do zarządzania (najważniejsze):**
- **manufacturer** + **modelNumber** + **serialNumber** — Identyfikacja dokładnego urządzenia
- **installationDate** + **warrantyExpiry** — Śledzenie gwarancji
- **maintenanceSchedule** — Kiedy serwisować urządzenie (kwartalne wymiany filtrów, roczne przeglądy)
- **assetTag** — Fizyczna etykieta na urządzeniu (dla kodów QR)

**Dla śledzenia kosztów:**
- **cost** — Koszty zakupu i instalacji
- **expectedLifespan** — Jak długo do wymiany

**Dla części zamiennych:**
- **spareParts** — Jakie części trzymać na magazynie (filtry, paski, itp.)
- **supplier** — Do kogo zadzwonić po serwis

**Dla zgodności energetycznej:**
- **specifications** — Specyfikacja techniczna (moc, zużycie energii)
- **energyRating** — Klasa efektywności energetycznej

**Większość architektów wypełnia tylko:** producent, model, numer seryjny, data instalacji, gwarancja. Resztę wypełnia zespół zarządzania obiektem.
:::

## Kategorie Typów Zasobów

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
  | "generator"        // Agregat prądotwórczy
  | "lighting_fixture"; // Oprawa oświetleniowa

// Urządzenia hydrauliczne
type PlumbingAssetType =
  | "water_heater"     // Podgrzewacz wody
  | "domestic_pump"    // Pompa wody użytkowej
  | "pressure_tank"    // Zbiornik ciśnieniowy
  | "backflow_preventer"; // Zawór zwrotny

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

## Przykład 1: Pierwszy Plik Urządzenia (Minimalny)

**Najprostszy plik urządzenia dla przekazania:**

```markdown
Plik: assets/ast-ahu-01.md

---
id: "AST-AHU-01"
entityType: "asset"
assetName: "Centrala wentylacyjna 01"
assetType: "ahu"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"
version: "1.0.0"

# Dla przekazania do zarządzania
manufacturer: "Systemair"
modelNumber: "Topvex SR11 EL"
serialNumber: "SR11-2026-04782"
installationDate: "2026-08-15"
warrantyExpiry: "2028-08-15"
---

# Centrala wentylacyjna 01

Centrala dachowa obsługująca strefę północną.
Gwarancja kończy się 2028-08-15.
```

**To wszystko.** Zespół zarządzania może dodać harmonogramy konserwacji i części zamienne później.

---

## Przykład 2: Pełne Urządzenie (Wszystkie Szczegóły)

**Plik:** `docs/en/examples/green-terrace/assets/ast-ahu-01.md`

```markdown
---
entityType: "asset"
id: "AST-AHU-01"
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

version: "1.0.0"
tags:
  - "hvac"
  - "air_handling_unit"
  - "rooftop"
  - "high_efficiency"
---

# Zasób: Centrala Wentylacyjna 01

Dachowa centrala wentylacyjna obsługująca system HVAC strefy północnej.
```

## Przykład: Skompilowany JSON

**Wynik:** `build/green-terrace/sbm.json` (fragment)

```json
{
  "entities": {
    "assets": [
      {
        "entityType": "asset",
        "id": "AST-AHU-01",
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
        "expectedLifespan": 20
      }
    ]
  }
}
```

## Mapowanie BIM

Zasoby mapują się na konkretne obiekty urządzeń IFC:

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

## Integracja z Rejestrem Zasobów

Zasoby wypełniają cel kompilacji **rejestr zasobów**:

```json
{
  "assetInventory": [
    {
      "assetId": "AST-AHU-01",
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

Zasoby eksportowane są do formatów **CMMS** (Komputerowy System Zarządzania Konserwacją):

**Format Maximo:**
```csv
ASSETNUM,DESCRIPTION,ASSETTYPE,LOCATION,MANUFACTURER,MODELNUM,SERIALNUM,INSTALLDATE,WARRANTY,REPLACECOST
AST-AHU-01,Air Handling Unit 01,AHU,ROOF-MECH,Systemair,Topvex SR11 EL,SR11-2026-04782,2026-08-15,2028-08-15,125000
```

**Format SAP PM:**
```xml
<Equipment>
  <EquipmentNumber>AST-AHU-01</EquipmentNumber>
  <Description>Air Handling Unit 01</Description>
  <TechnicalIdentNo>SR11-2026-04782</TechnicalIdentNo>
  <Manufacturer>Systemair</Manufacturer>
  <Model>Topvex SR11 EL</Model>
  <FunctionalLocation>BLD-01/ROOF/MECH</FunctionalLocation>
</Equipment>
```

## Zobacz Także

- **[Instalacja](/pl/dokumentacja/encje/system)** - Urządzenia należą do systemów
- **[Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Lokalizacje instalacji urządzeń
- **[Kompilator](/pl/dokumentacja/kompilator/)** - Kompilacja zasobów i generowanie powiązań czujników
