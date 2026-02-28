# Szablon Karty Urządzenia

Uzyj tego szablonu do dokumentowania poszczegolnych elementow wyposazenia wraz z danymi konserwacyjnymi.

## Plik szablonu

**Wzorzec nazwy pliku:** `assets/ast-[typ-zasobu]-[nazwa].md`
**Przyklad:** `assets/ast-ahu-01.md`, `assets/ast-boiler-main.md`

---

## Szablon frontmatter YAML

```yaml
---
documentType: "asset"
entityType: "asset"
id: "AST-[ASSET-TYPE]-[SEQ]"  # Przyklad: AST-AHU-01
projectPhase: "construction_documentation"
bimLOD: "LOD_400"

# Wlasciwosci zasobu
assetName: "Nazwa Zasobu"
assetTypeId: "AT-[ASSET-TYPE]"  # Referencja do definicji typu zasobu
systemId: "SYS-[SYSTEM-ID]"
buildingId: "BLD-01"
locatedInSpaceId: "SP-[SPACE-ID]"

# Identyfikacja
identifiers:
  tag: "TAG-001"  # Numer znacznika zasobu
  serial: "TBD_ON_INSTALLATION"
  barcode: "TBD_ON_INSTALLATION"  # Opcjonalnie

# Specyfikacja produktu
manufacturer: "Nazwa Producenta"
model: "Numer Modelu"
productCode: "Kod Produktu"

# Dane wydajnosciowe (opcjonalnie)
performanceData:
  # Dodaj specyfikacje wydajnosciowe specyficzne dla urzadzenia

# Dane FM
maintenanceData:
  serviceIntervalMonths: 6
  expectedLifetimeYears: 15
  warrantyYears: 2
  sparePartsRequired:
    - "Nazwa czesci 1"
    - "Nazwa czesci 2"

# Wymagania
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Mapowanie BIM
ifcMapping:
  ifcEntity: "IfcBuildingElement"  # Lub konkretny typ elementu
  globalId: "GENERATE_ON_IMPORT"

# Dane instalacyjne
installation:
  installationDate: "TBD"
  installer: "TBD"
  commissioningDate: "TBD"
  commissioningReport: "TBD"

# Metadane
version: "1.0.0"
---

# Zasób: [Nazwa Zasobu]

## Opis urzadzenia

Krotki opis urzadzenia, jego funkcji i roli w systemie.

## Specyfikacja techniczna

- Kluczowe specyfikacje techniczne
- Parametry wydajnosciowe
- Parametry operacyjne

## Wymagania instalacyjne

- Wymagania montazowe
- Przestrzenie dostepowe
- Podlaczenia zasilania/mediow
- Integracja z systemem sterowania

## Harmonogram konserwacji

### Co [okres]
- Zadanie konserwacyjne 1
- Zadanie konserwacyjne 2

### Rocznie
- Roczne zadania konserwacyjne

## Informacje o dostawcy

- Nazwa i dane kontaktowe dostawcy
- Kontakt do wsparcia technicznego
- Dostepnosc czesci zamiennych

## Dokumentacja

- Link do instrukcji montazu
- Link do instrukcji obslugi i konserwacji
- Link do katalogu czesci zamiennych
```

---

## Prefiksy typow zasobow

### HVAC
- `AST-AHU-` - Centrale wentylacyjne
- `AST-HRV-` - Rekuperatory
- `AST-BOILER-` - Kotly
- `AST-CHILLER-` - Agregaty chlodnicze
- `AST-PUMP-` - Pompy
- `AST-FAN-` - Wentylatory

### Elektryczne
- `AST-PANEL-` - Rozdzielnice elektryczne
- `AST-TRANS-` - Transformatory
- `AST-GEN-` - Agregaty pradotworcze
- `AST-UPS-` - Systemy UPS

### Wodno-kanalizacyjne
- `AST-TANK-` - Zbiorniki wodne
- `AST-HEATER-` - Podgrzewacze wody
- `AST-PUMP-` - Pompy

### Bezpieczenstwo pozarowe
- `AST-SPRINKLER-` - Systemy tryskaczowe
- `AST-ALARM-` - Centrale sygnalizacji pozarowej
- `AST-EXTINGUISHER-` - Gasnice
