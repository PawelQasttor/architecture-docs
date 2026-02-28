---
entityType: "level"
id: "LVL-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

levelName: "First Floor"
levelNumber: 1
buildingId: "BLD-01"

# Spatial data
elevation: 3.20
floorToFloorHeight: 3.20
clearHeight: 2.70
unit: "m"

# Spaces on this level
spaceIds:
  - "SP-BLD-01-L01-001"  # Bedroom 01
  - "SP-BLD-01-L01-002"  # Bedroom 02
  - "SP-BLD-01-L01-CORR" # Corridor

# Zones spanning this level
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-ACOUSTIC-NIGHT"
  - "ZONE-HVAC-NORTH"

ifcMapping:
  ifcEntity: "IfcBuildingStorey"
  globalId: "2P3gH0$sLByv4WyFv3MQzT"
  name: "Level 01"

version: "1.0.0"
tags:
  - "residential"
  - "first-floor"
---

# Poziom: Pierwsze Piętro

Pierwsze piętro Budynku 01 zawierające mieszkania.

## Dane Poziomu

- **Rzędna:** +3,20m nad poziomem terenu
- **Wysokość Kondygnacji:** 3,20m
- **Wysokość w Świetle:** 2,70m (po wykończeniu sufitu)
- **Powierzchnia:** Około 450 m²

## Przestrzenie

- [Sypialnia 01](../przestrzenie/sypialnia-01.md) - 14,5 m²
- [Sypialnia 02](../przestrzenie/sypialnia-02.md) - 12,8 m²
- [Korytarz](../przestrzenie/korytarz.md) - Cyrkulacja komunikacyjna

## Strefy

- [Strefa Pożarowa ZL-IV](../strefy/strefa-pozarowa-zl-iv.md) - Podział na strefy pożarowe
- [Strefa Akustyczna Noc](../strefy/strefa-akustyczna-noc.md) - Zwiększony komfort akustyczny
- [Strefa HVAC Północ](../strefy/strefa-hvac-polnoc.md) - Sterowanie cieplne i wentylacyjne

## Konstrukcja

- **Konstrukcja Stropu:** Płyta żelbetowa 200mm
- **Sufit:** Podwieszany gipsowo-kartonowy, 2,70m w świetle
- **Nośność:** 2,0 kN/m² (mieszkalna)

---

**Status Dokumentu:** Projekt Budowlany (LOD 300)
**Ostatnia Aktualizacja:** 2026-02-22
