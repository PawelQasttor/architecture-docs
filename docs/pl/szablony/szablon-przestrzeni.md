# Szablon Karty Pomieszczenia

Uzyj tego szablonu do dokumentowania poszczegolnych pomieszczen i przestrzeni w projekcie budowlanym.

## Plik szablonu

**Wzorzec nazwy pliku:** `spaces/[nazwa-przestrzeni].md`
**Przyklad:** `spaces/sypialnia-01.md`, `spaces/sala-konferencyjna-a.md`

---

## Szablon frontmatter YAML

```yaml
---
# Identyfikacja dokumentu
documentType: "space"
entityType: "space"
id: "SP-[BLD-ID]-[LEVEL]-[SEQ]"  # Przyklad: SP-BLD-01-L00-001
projectPhase: "design_development"  # concept | schematic | design_development | construction_documentation
bimLOD: "LOD_300"  # LOD_100 | LOD_200 | LOD_300 | LOD_400 | LOD_500

# Podstawowe wlasciwosci
spaceName: "Nazwa przestrzeni"
spaceType: "typ_przestrzeni"  # Zobacz sekcje Typy przestrzeni ponizej
buildingId: "BLD-01"
levelId: "LVL-00"

# Przypisania stref
zoneIds:
  - "ZONE-FIRE-[ID]"
  - "ZONE-HVAC-[ID]"

# Dane przestrzenne
designArea: 0.0
designHeight: 0.0
unit: "m"

# Wymagania
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Profil uzytkowania
occupancy:
  maxOccupants: 0
  usagePattern: "uzytkowanie"

# Mapowanie BIM
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "GENERATE_ON_IMPORT"

# Metadane
version: "1.0.0"
lastReviewed: "YYYY-MM-DD"
authors:
  - name: "Imie Architekta"
    role: "architect"
---

# Przestrzen: [Nazwa Przestrzeni]

[Opis i tresc tutaj...]
```

---

## Typy przestrzeni

### Mieszkalne
- `sleeping_space` / `bedroom` - przestrzen sypialna / sypialnia
- `living_space` / `living_room` - przestrzen dzienna / salon
- `kitchen` - kuchnia
- `bathroom` - lazienka

### Biurowe
- `office` - biuro
- `meeting_room` - sala konferencyjna
- `open_office` - biuro typu open space

### Komunikacja
- `corridor` - korytarz
- `staircase` - klatka schodowa
- `entrance` - wejscie

---

## Przyklad: Sypialnia

Zobacz [Przyklad Green Terrace](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01) dla kompletnego dzialajacego przykladu.
