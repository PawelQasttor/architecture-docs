---
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
buildingId: "BLD-01"
levelIds:
  - "LVL-00"
  - "LVL-01"

properties:
  fireResistanceClass: "ZL-IV"
  evacuationStrategy: "protected_egress"
  fireLoadDensity: "low"
  compartmentArea: 450
  maxTravelDistance: 40
  unit: "m"

requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-EGRESS-TIME-001"

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P4gH0$sLByv4WyFv3MQyR"

version: "1.0.0"
tags:
  - "fire-safety"
  - "zl-iv"
  - "residential"
---

# Strefa Pożarowa: ZL-IV (Kategoria IV)

Strefa bezpieczeństwa pożarowego obejmująca przestrzenie mieszkalne na parterze i pierwszym piętrze.

## Klasyfikacja

- **Kategoria obciążenia ogniowego:** ZL-IV (Niskie obciążenie ogniowe)
- **Typ użytkowania:** Mieszkalny (przestrzenie do spania)
- **Wymaganie odporności ogniowej:** REI 60 (drzwi), EI 60 (ściany)

## Granice

- **Kondygnacje:** Parter (L00) i Pierwsze piętro (L01)
- **Powierzchnia:** Około 450 m²
- **Przestrzenie zawarte:** Sypialnie, korytarze, łazienki

## Strategia Bezpieczeństwa Pożarowego

- Chronione drogi ewakuacyjne przez korytarze o odporności ogniowej
- Maksymalna odległość do chronionej klatki schodowej: 40 m (zgodna z WT 2021 § 234)
- Automatyczna detekcja dymu we wszystkich przestrzeniach
- Oświetlenie awaryjne w korytarzach

## Zgodność z Przepisami

- **WT 2021 § 234:** Wymagania separacji stref pożarowych
- **WT 2021 § 271:** Drogi ewakuacyjne
- **Prawo budowlane Art. 5:** Bezpieczeństwo pożarowe budynków
