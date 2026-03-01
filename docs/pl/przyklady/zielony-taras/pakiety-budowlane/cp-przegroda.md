---
entityType: construction_package
id: CP-ENVELOPE
packageName: "Przegrody i Elewacja"
description: "Ściany zewnętrzne, izolacja, tynk, okna, drzwi, pokrycie dachowe i wszystkie elementy ochrony przed warunkami atmosferycznymi."
sequence: 2
scope: "Mur z bloczków AAC, izolacja XPS, tynk mineralny, wszystkie okna i drzwi zewnętrzne, membrana dachowa i izolacja, hydroizolacja."

status: "completed"
plannedStart: "2024-05-01"
plannedEnd: "2024-09-30"
actualStart: "2024-05-15"
actualEnd: "2024-10-10"

duration:
  planned: 110
  actual: 108

progress:
  percentComplete: 100
  earnedValue: 350000
  plannedValue: 350000
  actualCost: 362000

dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"
    lag: -30

contractor:
  company: "FasadPol Sp. z o.o."
  contact: "Maria Kowalska, +48 22 987 6543"
  contractRef: "GT-2024-ENV-001"
  contractValue: 350000

costBreakdown:
  labor: 120000
  materials: 185000
  equipment: 20000
  overhead: 12000
  contingency: 13000
  total: 350000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 350000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-ENVLP-001"

version: "1.0.0"
tags:
  - "przegroda"
  - "elewacja"
  - "okna"
  - "izolacja"
  - "zakonczone"
---

# Pakiet Budowlany: Przegrody i Elewacja

Wszystkie elementy obudowy zewnętrznej budynku: ściany, izolacja, okna, drzwi i dach.

## Zakres

- Mur z bloczków AAC (ściany zewnętrzne)
- Izolacja XPS (180mm)
- Tynk mineralny (wykończenie zewnętrzne)
- Wszystkie okna ([Internorm KF 410](../typy-otworow/okno-internorm-kf410))
- Drzwi zewnętrzne i przeciwpożarowe
- Membrana dachowa i izolacja
- Hydroizolacja

## Zależności

- Zależy od: **CP-STRUCTURE** (zakończenie-rozpoczęcie, 30 dni wyprzedzenia)

## Harmonogram

| | Plan | Realizacja |
|---|------|-----------|
| Rozpoczęcie | 2024-05-01 | 2024-05-15 |
| Zakończenie | 2024-09-30 | 2024-10-10 |
| Czas trwania | 110 dni | 108 dni |

## Koszty

- **Wartość kontraktu:** 350 000 EUR
- **Koszt rzeczywisty:** 362 000 EUR (+3,4%)
- **Wykonawca:** FasadPol Sp. z o.o.

## Status

Zakończone. Test szczelności zdany (0,55 ACH @ 50 Pa).

---

**Ostatnia aktualizacja:** 2026-03-01
