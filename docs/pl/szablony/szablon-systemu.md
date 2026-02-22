# Szablon Karty Instalacji

Uzyj tego szablonu do dokumentowania systemow budynkowych (HVAC, elektrycznych, wodno-kanalizacyjnych, przeciwpozarowych itp.).

## Plik szablonu

**Wzorzec nazwy pliku:** `systems/sys-[typ-systemu]-[nazwa].md`
**Przyklad:** `systems/sys-hvac-01.md`, `systems/sys-electrical-main.md`

---

## Szablon frontmatter YAML

```yaml
---
documentType: "system"
entityType: "system"
id: "SYS-[CATEGORY]-[SEQ]"  # Przyklad: SYS-HVAC-01
projectPhase: "construction_documentation"
bimLOD: "LOD_400"

# Wlasciwosci systemu
systemName: "Nazwa Systemu"
systemType: "typ_systemu"  # hvac_ventilation | hvac_heating | hvac_cooling | electrical_power | plumbing_water | itp.
systemCategory: "kategoria"  # hvac | electrical | plumbing | fire_safety | security | communication | bms
buildingId: "BLD-01"

# Obslugiwane strefy i przestrzenie
servedZoneIds:
  - "ZONE-[TYPE]-[ID]"
servedSpaceIds:
  - "SP-[SPACE-ID]"

# Instancje zasobow (urzadzenia w tym systemie)
assetInstanceIds:
  - "AI-[ASSET-ID]"

# Specyfikacje wydajnosciowe (opcjonalnie)
performance:
  # Dodaj dane wydajnosciowe specyficzne dla systemu
  # Dla HVAC: przeplywy powietrza, wydajnosc, itp.
  # Dla elektrycznych: napiecie, pojemnosc, itp.

# Wymagania
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Zgodnosc regulacyjna
regulatoryCompliance:
  - regulation: "Nazwa przepisu"
    section: "Sekcja"
    requirement: "Opis wymagania"
    status: "compliant"

# Mapowanie BIM
ifcMapping:
  ifcEntity: "IfcSystem"
  globalId: "GENERATE_ON_IMPORT"
  objectType: "System_Type"

# Metadane
version: "1.0.0"
---

# System: [Nazwa Systemu]

## Przeglad systemu

Opis przeznaczenia, funkcji i roli systemu w budynku.

## Glowne komponenty

1. Komponent 1
2. Komponent 2

## Strategia eksploatacji

- Parametry normalnej pracy
- Logika sterowania
- Nastawy i harmonogramy

## Wymagania konserwacyjne

- Rutynowe zadania konserwacyjne
- Okresy serwisowe
- Odpowiedzialne strony

## Powiazana dokumentacja

- Link do instancji zasobow
- Link do obslugiwanych przestrzeni/stref
- Link do wymagan
```

---

## Kategorie systemow

- `hvac` - Ogrzewanie, wentylacja, klimatyzacja
- `electrical` - Zasilanie elektryczne i oswietlenie
- `plumbing` - Zaopatrzenie w wode, kanalizacja, instalacje sanitarne
- `fire_safety` - Gasenie pozarow, detekcja, alarmy
- `security` - Kontrola dostepu, CCTV, alarmy
- `communication` - Systemy danych, telekomunikacji, AV
- `bms` - System zarzadzania budynkiem
- `renewable_energy` - Energia sloneczna, geotermalna, wiatrowa

---

## Typy systemow

### HVAC
- `hvac_ventilation` - wentylacja
- `hvac_heating` - ogrzewanie
- `hvac_cooling` - chlodzenie
- `hvac_heat_recovery` - odzysk ciepla

### Elektryczne
- `electrical_power_main` - zasilanie glowne
- `electrical_lighting` - oswietlenie
- `electrical_emergency` - zasilanie awaryjne

### Wodno-kanalizacyjne
- `plumbing_water_supply` - zaopatrzenie w wode
- `plumbing_drainage` - kanalizacja
- `plumbing_hvac_piping` - rurociagi HVAC
