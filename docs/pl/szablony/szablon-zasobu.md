# Szablon Karty Urządzenia

Uzyj tego szablonu do dokumentowania poszczegolnych elementow wyposazenia wraz z danymi konserwacyjnymi.

## Plik szablonu

**Wzorzec nazwy pliku:** `assets/ai-[typ-zasobu]-[nazwa].md`
**Przyklad:** `assets/ai-ahu-01.md`, `assets/ai-boiler-main.md`

---

## Szablon frontmatter YAML

```yaml
---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-[ASSET-TYPE]-[SEQ]"  # Przyklad: AI-AHU-01
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

# Instancja Zasobu: [Nazwa Zasobu]

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
- `AI-AHU-` - Centrale wentylacyjne
- `AI-HRV-` - Rekuperatory
- `AI-BOILER-` - Kotly
- `AI-CHILLER-` - Agregaty chlodnicze
- `AI-PUMP-` - Pompy
- `AI-FAN-` - Wentylatory

### Elektryczne
- `AI-PANEL-` - Rozdzielnice elektryczne
- `AI-TRANS-` - Transformatory
- `AI-GEN-` - Agregaty pradotworcze
- `AI-UPS-` - Systemy UPS

### Wodno-kanalizacyjne
- `AI-TANK-` - Zbiorniki wodne
- `AI-HEATER-` - Podgrzewacze wody
- `AI-PUMP-` - Pompy

### Bezpieczenstwo pozarowe
- `AI-SPRINKLER-` - Systemy tryskaczowe
- `AI-ALARM-` - Centrale sygnalizacji pozarowej
- `AI-EXTINGUISHER-` - Gasnice
