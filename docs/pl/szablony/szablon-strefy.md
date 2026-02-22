# Szablon Karty Strefy

Uzyj tego szablonu do dokumentowania stref pozarowych, akustycznych, HVAC i innych stref budynku.

## Plik szablonu

**Wzorzec nazwy pliku:** `zones/[typ-strefy]-[nazwa-strefy].md`
**Przyklad:** `zones/fire-zone-zl-iv.md`, `zones/hvac-zone-north.md`

---

## Szablon frontmatter YAML

```yaml
---
documentType: "zone"
entityType: "zone"
id: "ZONE-[TYPE]-[ID]"  # Przyklad: ZONE-FIRE-ZL-IV
projectPhase: "design_development"

# Wlasciwosci strefy
zoneName: "Nazwa Strefy"
zoneType: "typ_strefy"  # fire | acoustic | hvac | security | lighting | thermal
buildingId: "BLD-01"
levelIds:  # Strefy moga obejmowac wiele poziomow
  - "LVL-00"
  - "LVL-01"

# Przestrzenie w tej strefie
spaceIds:
  - "SP-[SPACE-ID-1]"
  - "SP-[SPACE-ID-2]"

# Wlasciwosci specyficzne dla strefy
properties:
  # Dodaj wlasciwosci specyficzne dla strefy tutaj
  # Dla stref pozarowych: fireClassification, requiredRating, maxEvacuationDistance
  # Dla stref HVAC: temperatureSetpoint, ventilationRate
  # Dla stref akustycznych: soundTransmissionClass, impactInsulationClass

# Wymagania
requirements:
  - "REQ-[REQUIREMENT-ID]"

# Zgodnosc regulacyjna
regulatoryCompliance:
  - regulation: "Nazwa przepisu"
    section: "Sekcja"
    requirement: "Opis wymagania"
    status: "compliant"  # compliant | non_compliant | pending
    countryScope: "poland_specific"  # global | poland_specific

# Mapowanie BIM
ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "GENERATE_ON_IMPORT"

# Metadane
version: "1.0.0"
---

# Strefa: [Nazwa Strefy]

[Opis i tresc tutaj...]
```

---

## Typy stref

- `fire` - Strefy bezpieczenstwa pozarowego
- `acoustic` - Strefy separacji akustycznej
- `hvac` - Strefy klimatyzacji i wentylacji
- `security` - Strefy kontroli dostepu i bezpieczenstwa
- `lighting` - Strefy sterowania oswietleniem
- `thermal` - Strefy termiczne

---

## Przyklad: Strefa pozarowa

Zobacz [Przyklad Green Terrace](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv) dla kompletnego dzialajacego przykladu.
