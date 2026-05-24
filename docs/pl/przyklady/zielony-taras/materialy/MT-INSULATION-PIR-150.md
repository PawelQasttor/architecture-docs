---
entityType: "material_type"
id: "MT-INSULATION-PIR-150"
version: "2.1.0"
projectPhase: "design_development"

materialName: "Płyta izolacyjna PIR sztywna, 150 mm"
materialCategory: "insulation"
description: |
  Polizocyjanurat (PIR) — sztywna płyta izolacyjna z okładzinami z włókna
  mineralnego, grubość 150 mm. Stosowana jako podstawowa warstwa izolacji
  w ścianie zewnętrznej typu A oraz jako izolacja dachowa pod warstwami
  dachu zielonego. Wybrana ze względu na połączenie niskiej wartości U,
  stabilność wymiarów i kompatybilność z konstrukcją z wentylowaną szczeliną.

manufacturer: "Kingspan Insulation"
productCode: "Kooltherm K15 — 150 mm"
standard: "PN-EN 13165"

physicalProperties:
  density: 35
  thermalConductivity: 0.022
  specificHeatCapacity: 1400
  vaporResistanceFactor: 60
  waterAbsorption: 0.5

fireProperties:
  reactionToFire: "B-s1,d0"

sustainability:
  embodiedCarbonKgCO2ePerM3: 280
  epdReference: "Kingspan EPD-KOOLTHERM-K15-2024"
  recycledContent: 0
  responsibleSourcing: "Kingspan IMS — ISO 14001 + ISO 50001"
  endOfLife: "Pilotażowy program recyklingu mechanicznego; ścieżka domyślna to odzysk energii"

constructionPackageId: "CP-ENVELOPE"

sources:
  - id: "SRC-MT-INSULATION-PIR-150-01"
    title: "Zielony Taras — Spec. przegród §4.1, Ściana zewnętrzna typ A"
    type: "other"
    documentType: "envelope_specification"
    date: "2026-01-20"
    author: "Anna Nowak"
  - id: "SRC-MT-INSULATION-PIR-150-02"
    title: "EPD Kingspan Kooltherm K15"
    type: "manufacturer_spec"
    documentType: "manufacturer_epd"
    date: "2024-09-01"
    author: "Kingspan Insulation"

tags:
  - "artefakt-fazy-projektu-budowlanego"

notes: |
  Wkład w U-wartość ściany: przy λ = 0,022 W/(m·K) i grubości 150 mm
  sama warstwa PIR daje R = 6,82 m²K/W — około 90 % całkowitego oporu
  cieplnego przegrody. Klasa reakcji na ogień B-s1,d0 spełnia wymagania
  WT 2021 dla 6-kondygnacyjnego budynku mieszkalnego z wentylowaną
  szczeliną (wysokość < 25 m).

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — wydobywa izolację przegród jako encję materiału wielokrotnego użytku"
---

# Płyta izolacyjna PIR, 150 mm (MT-INSULATION-PIR-150)

Dominująca warstwa termiczna przegrody Zielonego Tarasu. Ta encja
`material_type` pozwala każdemu układowi przegrody i każdemu zestawieniu
zakupowemu referować do tej samej specyfikacji produktu, EPD i wartości
śladu węglowego.

| Właściwość | Wartość |
|---|---|
| Grubość | 150 mm |
| Gęstość | 35 kg/m³ |
| Przewodność cieplna (λD) | 0,022 W/(m·K) |
| Opór cieplny | R = 6,82 m²K/W |
| Opór dyfuzyjny (µ) | 60 |
| Reakcja na ogień | B-s1,d0 |
| Ślad węglowy | 280 kgCO₂e/m³ (A1-A3) |

## Używana przez

- [Przegroda `ENV-EW-01`](../przegroda-sciana-zewnetrzna-typ-a) — Ściana zewnętrzna typ A
- [Pakiet wykonawczy `CP-ENVELOPE`](../pakiety-budowlane/cp-przegroda)
- Układ warstw dachowych (osobna encja przegrody dachu nie została jeszcze opracowana)
