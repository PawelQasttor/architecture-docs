# Mapowanie IFC: Łączenie SBM z Modelami BIM

::: tip Czego Dotyczy Ten Przewodnik
Jak pole `ifcMapping` łączy Twoje encje SBM z właściwościami IFC do importu/eksportu Revit/ArchiCAD.
:::

## Czym Jest Mapowanie IFC?

**IFC (Industry Foundation Classes)** to standardowy format wymiany danych BIM. Gdy eksportujesz z Revit lub ArchiCAD, otrzymujesz plik IFC.

**`ifcMapping`** mówi kompilatorowi SBM:
- Której klasie IFC odpowiada ta encja
- Które zestawy właściwości IFC (Psets) wypełnić
- Które pola SBM mapować do których właściwości IFC

**Wynik**: Twoja dokumentacja Markdown → automatycznie generuje dane kompatybilne z IFC → importuje do Revit/ArchiCAD z wypełnionymi parametrami.

---

## Podstawowa Struktura

Każda encja może mieć pole `ifcMapping`:

```yaml
ifcMapping:
  ifcClass: "IfcSpace"           # Która klasa IFC
  psetName: "Pset_SpaceCommon"   # Który zestaw właściwości
  properties:                     # Mapowania pól
    - name: "NetFloorArea"
      source: "designArea"
    - name: "FinishCeilingHeight"
      source: "designHeight"
```

**Jak to czytać**:
- Ta encja mapuje na **IfcSpace** (klasa IFC dla pomieszczeń)
- Właściwości idą do **Pset_SpaceCommon** (standardowy zestaw właściwości)
- `designArea` SBM → `NetFloorArea` IFC
- `designHeight` SBM → `FinishCeilingHeight` IFC

---

## Pełny Przykład: Przestrzeń

```yaml
# spaces/sypialnia-01.md
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
spaceType: "sleeping_space"

ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "NetFloorArea"
      source: "designArea"
      unit: "m²"
    - name: "FinishCeilingHeight"
      source: "designHeight"
      unit: "m"
    - name: "Category"
      source: "spaceType"
    - name: "Reference"
      source: "id"
---

# Sypialnia 01
...
```

**Po skompilowaniu**, wyjście mapowania BIM zawiera:

```json
{
  "ifcEntity": {
    "type": "IfcSpace",
    "globalId": "generated-guid",
    "name": "Sypialnia 01",
    "properties": {
      "Pset_SpaceCommon": {
        "NetFloorArea": { "value": 14.5, "unit": "m²" },
        "FinishCeilingHeight": { "value": 2.70, "unit": "m" },
        "Category": "sleeping_space",
        "Reference": "SP-BLD-01-L01-001"
      }
    }
  }
}
```

**Ten JSON** jest używany przez skrypty eksportu IFC do wypełnienia parametrów Revit/ArchiCAD.

---

## Typowe Klasy IFC według Typu Encji

| Encja SBM | Klasa IFC | Wspólny Pset |
|-----------|-----------|--------------|
| **Działka** | `IfcSite` | `Pset_SiteCommon` |
| **Budynek** | `IfcBuilding` | `Pset_BuildingCommon` |
| **Kondygnacja** | `IfcBuildingStorey` | `Pset_BuildingStoreyCommon` |
| **Przestrzeń** | `IfcSpace` | `Pset_SpaceCommon` |
| **Przegroda** (ściana) | `IfcWall` | `Pset_WallCommon` |
| **Przegroda** (strop) | `IfcSlab` | `Pset_SlabCommon` |
| **Przegroda** (dach) | `IfcRoof` | `Pset_RoofCommon` |
| **Otwór** (okno) | `IfcWindow` | `Pset_WindowCommon` |
| **Otwór** (drzwi) | `IfcDoor` | `Pset_DoorCommon` |
| **Komunikacja Pionowa** (klatka) | `IfcStair` | `Pset_StairCommon` |
| **Instalacja** (HVAC) | `IfcSystem` | `Pset_SystemCommon` |
| **Zasób** (wyposażenie) | `IfcDistributionElement` | Zależy od typu |
| **Strefa** | `IfcZone` | `Pset_ZoneCommon` |

---

## Wzorce Mapowania Właściwości

### Wzorzec 1: Mapowanie Bezpośrednie (1:1)

**Pole SBM** → **właściwość IFC** (ta sama koncepcja, inna nazwa)

```yaml
ifcMapping:
  properties:
    - name: "NetFloorArea"      # Nazwa właściwości IFC
      source: "designArea"      # Nazwa pola SBM
      unit: "m²"
```

### Wzorzec 2: Stała Wartość

**Stała wartość** → **właściwość IFC** (nie z pola SBM)

```yaml
ifcMapping:
  properties:
    - name: "IsExternal"
      value: false              # ← Stała, nie z pola
```

### Wzorzec 3: Wartość Obliczona

**Wyrażenie** → **właściwość IFC** (obliczane z wielu pól)

```yaml
ifcMapping:
  properties:
    - name: "Volume"
      expression: "designArea * designHeight"  # ← Obliczone
      unit: "m³"
```

### Wzorzec 4: Pole Zagnieżdżone

**Obiekt zagnieżdżony SBM** → **właściwość IFC**

```yaml
# SBM ma:
cost:
  design: 50000

# Mapuj do IFC:
ifcMapping:
  properties:
    - name: "DesignCost"
      source: "cost.design"     # ← Notacja kropkowa dla zagnieżdżonych
      unit: "EUR"
```

---

## Przykładowe Mapowania według Typu Encji

### Przestrzeń (Pomieszczenie)

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "NetFloorArea"
      source: "designArea"
      unit: "m²"
    - name: "FinishCeilingHeight"
      source: "designHeight"
      unit: "m"
    - name: "GrossFloorArea"
      source: "grossArea"
      unit: "m²"
    - name: "OccupancyType"
      source: "spaceType"
```

### Przegroda (Ściana Zewnętrzna)

```yaml
ifcMapping:
  ifcClass: "IfcWall"
  psetName: "Pset_WallCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "IsExternal"
      value: true                # ← Stała
    - name: "ThermalTransmittance"
      source: "uValue"
      unit: "W/(m²·K)"
    - name: "FireRating"
      source: "fireRating"
    - name: "LoadBearing"
      source: "isLoadBearing"
```

### Instalacja (HVAC)

```yaml
ifcMapping:
  ifcClass: "IfcSystem"
  psetName: "Pset_SystemCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "SystemCategory"
      source: "systemCategory"
    - name: "HeatingCapacity"
      source: "capacity.heatingCapacityKW"
      unit: "kW"
    - name: "CoolingCapacity"
      source: "capacity.coolingCapacityKW"
      unit: "kW"
```

### Zasób (Pompa Ciepła)

```yaml
ifcMapping:
  ifcClass: "IfcUnitaryEquipment"
  psetName: "Pset_UnitaryEquipmentTypeCommon"
  properties:
    - name: "Reference"
      source: "id"
    - name: "SerialNumber"
      source: "serialNumber"
    - name: "Manufacturer"
      source: "manufacturer"
    - name: "ModelReference"
      source: "model"
    - name: "InstallationDate"
      source: "installationDate"
    - name: "NominalCapacity"
      source: "capacity.heatingCapacityKW"
      unit: "kW"
```

---

## Niestandardowe Zestawy Właściwości

Możesz zdefiniować **niestandardowe zestawy właściwości** (nie standard IFC):

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  customPsets:
    - name: "Pset_CustomProjectInfo"    # ← Niestandardowy Pset
      properties:
        - name: "ProjectPhase"
          source: "lifecycle.phase"
        - name: "QualityScore"
          source: "_quality.completeness"
        - name: "DataConfidence"
          source: "designArea_meta.confidence"
```

**Przypadek użycia**: Przekazywanie danych specyficznych dla SBM (wyniki jakości, proweniencja, status zgodności) do modelu BIM dla raportowania.

---

## Wiele Zestawów Właściwości

Jedna encja może wypełnić **wiele Psetów**:

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psets:
    - name: "Pset_SpaceCommon"
      properties:
        - name: "NetFloorArea"
          source: "designArea"
    - name: "Pset_SpaceFireSafetyRequirements"
      properties:
        - name: "FireRating"
          source: "fireRating"
        - name: "SprinklerProtection"
          source: "sprinklerProtected"
    - name: "Pset_SpaceThermalRequirements"
      properties:
        - name: "SpaceTemperatureMin"
          source: "environmentalConditions.temperature.min"
        - name: "SpaceTemperatureMax"
          source: "environmentalConditions.temperature.max"
```

---

## Kiedy Używać ifcMapping

### ✅ Używaj Gdy:

1. **Eksportujesz do Revit/ArchiCAD** — Mapowanie IFC zapewnia poprawne wypełnienie parametrów
2. **Koordynacja BIM** — Architekci, inżynierowie MEP dzielą się modelami IFC
3. **Klient wymaga rezultatów BIM** — Wielu klientów wymaga modeli IFC
4. **Integracja z digital twin** — Systemy zarządzania budynkiem czytają IFC

### ❌ Pomiń Gdy:

1. **Nie używasz narzędzi BIM** — Jeśli Twój przepływ pracy to czysta dokumentacja, pomiń `ifcMapping`
2. **Faza wczesnej koncepcji** — Poczekaj do projektu wstępnego (LOD 200+)
3. **Brak planowanego eksportu IFC** — Dodawaj tylko jeśli faktycznie eksportujesz do IFC

---

## Jak Kompilator Używa ifcMapping

Gdy uruchamiasz:
```bash
npm run compile -- bim-mapping
```

Kompilator:
1. **Czyta** wszystkie pliki encji
2. **Znajduje** pola `ifcMapping`
3. **Generuje** `output/bim-mapping.json` ze strukturą kompatybilną z IFC
4. **Skrypt Pythona** (`bim-sync/export-to-ifc.py`) czyta ten JSON → tworzy plik IFC
5. **Importuj** plik IFC do Revit/ArchiCAD → parametry auto-wypełnione

---

## Przepływ Pracy Eksportu IFC

```
┌──────────────────────┐
│ Pliki Markdown SBM   │
│ (z ifcMapping)       │
└──────────┬───────────┘
           │
           │ npm run compile -- bim-mapping
           ▼
┌──────────────────────┐
│ bim-mapping.json     │
│ (kompatybilny z IFC) │
└──────────┬───────────┘
           │
           │ python bim-sync/export-to-ifc.py
           ▼
┌──────────────────────┐
│ projekt.ifc          │
│ (IFC 2x3 / 4)        │
└──────────┬───────────┘
           │
           │ Import
           ▼
┌──────────────────────┐
│ Revit / ArchiCAD     │
│ (Parametry wypełnione)│
└──────────────────────┘
```

---

## Synchronizacja Dwukierunkowa (Zaawansowane)

**Scenariusz**: Aktualizujesz wymiary w Revit → chcesz zsynchronizować z powrotem do Markdown SBM.

**Rozwiązanie**: Skrypt importu IFC

```bash
# Eksport z Revit
# Plik → Eksport → IFC → projekt.ifc

# Synchronizacja z powrotem do Markdown
python bim-sync/import-from-ifc.py projekt.ifc

# Aktualizuje pliki Markdown z rzeczywistymi wymiarami
# Tworzy _meta proweniencji: { confidence: "measured", source: "Import IFC 2024-03-15" }
```

**Wynik**: `designArea` → `actualArea`, proweniencja śledzona.

---

## Standardowe Referencje Właściwości IFC

### Pset_SpaceCommon

| Właściwość IFC | Typowe Źródło SBM |
|----------------|-------------------|
| `Reference` | `id` |
| `NetFloorArea` | `designArea` |
| `GrossFloorArea` | `grossArea` |
| `FinishCeilingHeight` | `designHeight` |
| `FinishFloorHeight` | `floorElevation` |
| `IsExternal` | `isExternal` |
| `OccupancyType` | `spaceType` |
| `OccupancyNumber` | `occupancyProfile.maxOccupants` |

### Pset_WallCommon

| Właściwość IFC | Typowe Źródło SBM |
|----------------|-------------------|
| `Reference` | `id` |
| `IsExternal` | `isExternal` |
| `LoadBearing` | `isLoadBearing` |
| `ThermalTransmittance` | `uValue` |
| `FireRating` | `fireRating` |
| `AcousticRating` | `acousticRating` |

### Pset_DoorCommon

| Właściwość IFC | Typowe Źródło SBM |
|----------------|-------------------|
| `Reference` | `id` |
| `FireRating` | `fireRating` |
| `AcousticRating` | `acousticRating` |
| `IsExternal` | `isExternal` |
| `ThermalTransmittance` | `uValue` |

---

## Rozwiązywanie Problemów

### Problem: "Import IFC pokazuje puste parametry"

**Lista kontrolna**:
1. ✅ Czy zdefiniowałeś `ifcMapping` w plikach encji?
2. ✅ Czy uruchomiłeś `npm run compile -- bim-mapping`?
3. ✅ Czy skrypt Pythona działał pomyślnie?
4. ✅ Czy nazwy właściwości IFC są pisane dokładnie jak wymaga specyfikacja IFC?

**Naprawa**: Sprawdź `output/bim-mapping.json` — jeśli brakuje tam właściwości, mapowanie jest błędne.

### Problem: "Nieprawidłowa jednostka w Revit"

**Przyczyna**: Brak lub nieprawidłowa `unit` w `ifcMapping.properties`

**Naprawa**:
```yaml
# ❌ Nieprawidłowe (brak jednostki)
- name: "NetFloorArea"
  source: "designArea"

# ✅ Poprawne (jednostka określona)
- name: "NetFloorArea"
  source: "designArea"
  unit: "m²"
```

### Problem: "Kompilator ignoruje ifcMapping"

**Przyczyna**: Uruchomiłeś `npm run compile` bez `-- bim-mapping` celu

**Naprawa**:
```bash
# ❌ Nieprawidłowe (nie generuje mapowania BIM)
npm run compile

# ✅ Poprawne (generuje bim-mapping.json)
npm run compile -- bim-mapping
```

---

## Zobacz Także

- **[Przegląd Integracji BIM](/pl/integracja-bim/)** — Pełny przepływ pracy BIM
- **[Definicje LOD](/pl/integracja-bim/definicje-lod)** — Poziom Rozwoju według fazy
- **[Referencja Encji IFC](/pl/integracja-bim/encje-ifc)** — Pełne mapowanie klas IFC
- **[Przewodnik Synchronizacji Dwukierunkowej](/pl/integracja-bim/synchronizacja-dwukierunkowa)** — Synchronizacja Markdown ↔ IFC dwukierunkowa

::: tip Zacznij Prosto
Nie mapuj każdego pola do IFC w pierwszym dniu. Zacznij od niezbędnych (ID, powierzchnia, wysokość) i dodawaj więcej mapowań w miarę wzrostu potrzeb koordynacji BIM.
:::
