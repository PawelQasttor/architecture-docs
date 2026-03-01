---
entityType: construction_package
id: CP-FINISHES
packageName: "Wykończenia Wewnętrzne i Zagospodarowanie Terenu"
description: "Wykończenia wewnętrzne (podłogi, ściany, sufity), kuchnie, łazienki, zagospodarowanie terenu, parking i roboty zewnętrzne."
sequence: 4
scope: "Zabudowa g-k, tynkowanie, malowanie, wykończenia podłogowe, montaż kuchni i łazienek, zagospodarowanie terenu, kostka przepuszczalna, meble zewnętrzne."

status: "planned"
plannedStart: "2024-11-01"
plannedEnd: "2025-03-31"

duration:
  planned: 105

progress:
  percentComplete: 0
  plannedValue: 250000

dependencies:
  - packageId: "CP-ENVELOPE"
    type: "finish_to_start"
    lag: 0
  - packageId: "CP-MEP"
    type: "finish_to_start"
    lag: -15

contractor:
  company: "WykDom Sp. z o.o."
  contact: "Anna Zielinska, +48 22 777 8899"
  contractRef: "GT-2024-FIN-001"
  contractValue: 250000

costBreakdown:
  labor: 110000
  materials: 105000
  equipment: 10000
  overhead: 12000
  contingency: 13000
  total: 250000
  currency: "EUR"

buildingId: "BLD-01"

cost:
  totalCost: 250000
  currency: "EUR"
  basis: "contract_value"

ifcMapping:
  ifcEntity: IfcWorkSchedule
  globalId: "6xCP-FINISH-001"

version: "1.0.0"
tags:
  - "wykonczenie"
  - "zagospodarowanie"
  - "wyposazenie"
  - "planowane"
---

# Pakiet Budowlany: Wykończenia Wewnętrzne i Zagospodarowanie Terenu

Wszystkie prace wykończeniowe wewnętrzne i zagospodarowanie terenu.

## Zakres

- **Wnętrza:** Zabudowa g-k, tynkowanie, malowanie, deska inżynierska, płytki
- **Kuchnie:** Zabudowa meblowa, blaty, sprzęt AGD
- **Łazienki:** Ceramika, płytki, akcesoria
- **Zieleń:** [Ogród Północny](../elementy-terenu/sf-ogrod-polnocny), nasadzenia
- **Zewnętrzne:** [Parking](../elementy-terenu/sf-parking), ogrodzenie, meble zewnętrzne

## Zależności

- Zależy od: **CP-ENVELOPE** (zakończenie-rozpoczęcie)
- Zależy od: **CP-MEP** (zakończenie-rozpoczęcie, 15 dni wyprzedzenia dla drugiej fazy)

## Harmonogram

| | Plan |
|---|------|
| Rozpoczęcie | 2024-11-01 |
| Zakończenie | 2025-03-31 |
| Czas trwania | 105 dni |

## Koszty

- **Wartość kontraktu:** 250 000 EUR
- **Wykonawca:** WykDom Sp. z o.o.

## Status

Planowane. Oczekuje na zakończenie pakietów przegród i instalacji.

---

**Ostatnia aktualizacja:** 2026-03-01
