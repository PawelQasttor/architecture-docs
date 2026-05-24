---
entityType: "construction_package"
id: "CP-SITE-INFRASTRUCTURE"
version: "2.1.0"
projectPhase: "construction"

packageName: "Kampusowa infrastruktura terenowa"
sequence: 1   # Campus-spanning, runs ahead of per-building CPs
campusId: "CAM-GREEN-TERRACE-PARK"

description: |
  Ogólnokampusowe roboty ziemne + zakopane sieci: magistrale ciepłownicze,
  sieć deszczowa SuDS, wspólny parking + rury dla ładowania EV,
  światłowodowa sieć danych. Wyłącza specyficzne dla budynku połączenia
  (te są w CP każdego budynku).

scope: "Zakopane magistrale ciepłownicze (DN200 stal preizolowana, ~280 m), sieć deszczowa SuDS (niecki + nawierzchnia przepuszczalna + podziemny zbiornik), powierzchnia wspólnego parkingu (64 miejsca) + korytka kabli ładowania EV, sieć światłowodowa od centrum kampusu do każdego pionu budynku, hardscaping ogrodu wspólnotowego + podniesione grzędy działkowe, podbudowa placu zabaw + nawierzchnia amortyzująca EN 1177, zadaszenie schowka na rowery + płyta betonowa."

plannedStart: "2025-03-01"
plannedEnd: "2029-09-30"
status: "in_progress"
percentComplete: 65

cost:
  totalCost: 320000
  currency: "EUR"
  basis: "construction_contract"

relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
  - "SYS-DH-LOOP-CAMPUS"
  - "SF-PLAYGROUND"
  - "SF-EV-HUB"
  - "SF-BIKE-STORAGE"
  - "SF-COMMUNAL-GARDEN"

tags:
  - "campus-example"
  - "cross-building"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Ogólnokampusowy CP infrastruktury terenowej — dodany z przykładem Kampusu, demonstruje Pakiet Wykonawczy obejmujący wiele budynków"
---

# CP infrastruktury terenowej (CP-SITE-INFRASTRUCTURE)

**Kampusowo-obejmujący Pakiet Wykonawczy** dla całej infrastruktury terenowej,
która nie należy do żadnego pojedynczego Budynku. Trwa od 2025-03 (z robotami
ziemnymi BLD-01) do 2029-09 (przed końcowym podłączeniem BLD-04).

| Właściwość | Wartość |
|---|---|
| Faza | `construction` (65% ukończone) |
| Start | 2025-03-01 |
| Oczekiwany koniec | 2029-09-30 |
| Koszt | €320 000 |

## Dlaczego ten CP istnieje na zakresie kampusu

W projekcie jednobudynkowym każdy CP należy do jednego Budynku. W kampusie
wielobudynkowym *terenowe* CP obsługują wiele budynków — a model SBM
traktuje je jako należące do Kampusu, nie do Budynku.
