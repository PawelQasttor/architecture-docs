---
entityType: construction_package
id: CP-MEP
packageName: "Instalacje MEP"
description: "Instalacje mechaniczne, elektryczne i wodno-kanalizacyjne: HVAC, dystrybucja elektryczna, zaopatrzenie w wodę, kanalizacja, systemy bezpieczeństwa pożarowego."
sequence: 3
scope: "Pompa ciepła i system UFH, wentylacja MVHR, dystrybucja elektryczna i oświetlenie, zaopatrzenie w wodę i kanalizacja, detekcja pożaru i alarm."

status: "in_progress"
plannedStart: "2024-07-01"
plannedEnd: "2024-12-15"
actualStart: "2024-07-10"

duration:
  planned: 120

progress:
  percentComplete: 85
  earnedValue: 272000
  plannedValue: 320000
  actualCost: 285000

dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"
    lag: 0

contractor:
  company: "HVAC Services Ltd."
  contact: "Jan Kowalski, +48 22 555 1234"
  contractRef: "GT-2024-MEP-001"
  contractValue: 320000

costBreakdown:
  labor: 130000
  materials: 145000
  equipment: 25000
  overhead: 10000
  contingency: 10000
  total: 320000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 320000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-MEP-001"

version: "1.0.0"
tags:
  - "instalacje"
  - "hvac"
  - "elektryka"
  - "wod-kan"
  - "w-trakcie"
---

# Pakiet Budowlany: Instalacje MEP

Wszystkie instalacje mechaniczne, elektryczne i wodno-kanalizacyjne budynku Zielony Taras.

## Zakres

- **HVAC:** Pompa ciepła ([AST-HP-01](../zasoby/ai-hp-01)), ogrzewanie podłogowe, wentylacja MVHR
- **Elektryka:** Rozdzielnice, okablowanie, oświetlenie, ładowanie EV
- **Wod-kan:** Zaopatrzenie w wodę, kanalizacja, retencja deszczówki
- **Bezpieczeństwo pożarowe:** Detekcja, alarm, oświetlenie awaryjne

## Zależności

- Zależy od: **CP-STRUCTURE** (zakończenie-rozpoczęcie)

## Harmonogram

| | Plan | Realizacja |
|---|------|-----------|
| Rozpoczęcie | 2024-07-01 | 2024-07-10 |
| Zakończenie | 2024-12-15 | W trakcie |
| Czas trwania | 120 dni | - |

## Postęp

- **85% ukończone** (stan na 2026-03-01)
- Pompa ciepła i UFH: Odebrane
- MVHR: Zamontowana, odbiór oczekujący
- Elektryka: Pierwsza faza zakończona, druga faza 70%
- Wod-kan: Zakończone

## Koszty

- **Wartość kontraktu:** 320 000 EUR
- **Wydano do tej pory:** 285 000 EUR

---

**Ostatnia aktualizacja:** 2026-03-01
