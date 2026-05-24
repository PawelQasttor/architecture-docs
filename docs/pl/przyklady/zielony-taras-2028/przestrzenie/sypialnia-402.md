---
entityType: "space"
id: "SP-BLD-01-L04-002"
version: "2.1.0"
projectPhase: "operation"

spaceName: "Sypialnia 01 w mieszkaniu 4.02"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
roomNumber: "4.02.1"
accessibilityLevel: "standard"

buildingId: "BLD-01"
levelId: "LVL-04"
# Przynależność do stref dziedziczona z modelu projektowego — nie powielana tutaj.
# Przykład eksploatacji skupia się na tym, co zmienia się w eksploatacji,
# nie na tym, co zostało wyspecyfikowane w projekcie.

designArea: 14.5
designVolume: 39.15
unit: "m"

operationalData:
  occupancyStartDate: "2026-04-15"
  monthsOccupied: 21
  measuredEnvironment:
    avgCO2_ppm: 1180
    avgCO2_basis: "kroczący 90-dniowy średni z czujnika BMS BMS-CO2-402-001"
    avgWinterTemp_C: 21.3
    avgSummerTemp_C: 25.8
    measurementPeriod: "2026-06 do 2028-01"
    dataSource: "zewnętrzny CSV: telemetry/SP-BLD-01-L04-002-bms-2026-06-to-2028-01.csv"
  occupantFeedback:
    surveyDate: "2027-09"
    overallSatisfaction: 4
    flaggedConcerns:
      - "duszne_powietrze_nocą"
      - "letnie_przegrzewanie"
    notes: "Mieszkaniec zgłasza budzenie z bólem głowy 2-3 razy w miesiącu, konsekwentnie po cieplejszych dniach."

activeIssueIds:
  - "ISS-ANOMALY-CO2-001"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Sypialnia w fazie eksploatacji — przestrzeń kotwicząca dla anomalii CO2 i narracji opinii mieszkańca"
---

# Sypialnia 01, mieszkanie 4.02 — faza eksploatacji

Sypialnia, która wywołała **anomalię czujnika CO₂** z fazy eksploatacji
oraz **opinię mieszkańca o dusznym powietrzu**. Ten sam typ przestrzeni
co [Sypialnia 01 z przykładu projektowego](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)
(obie dziedziczą z `ST-BEDROOM-STANDARD-A`).

| Właściwość | Wartość |
|---|---|
| Miesiące zasiedlenia | 21 |
| Średni CO₂ (BMS, 90-dniowy kroczący) | **1 180 ppm** (cel: ≤ 1 000) |
| Średnia temperatura zimą | 21,3 °C (cel: 21-24) |
| Średnia temperatura latem | 25,8 °C (cel: 21-24 — przekracza) |
| Zadowolenie mieszkańca | 4 / 5 |
| Zgłoszone obawy | Duszne powietrze nocą, letnie przegrzewanie |
| Aktywne zgłoszenie | [ISS-ANOMALY-CO2-001](../zgloszenia/ISS-ANOMALY-CO2-001) |

## Dlaczego to ma znaczenie

Pomieszczenie **mieści się w obwiedni regulacyjnej** (CO₂ < 1 500 ppm
limit twardy), ale **nie osiąga celu projektowego** (≤ 1 000 ppm).
Zalecenie retro-commissioning ([`ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001))
proponuje zwiększenie nawiewu MVHR do tego klastra mieszkań o 15 %
i ponowny pomiar wyniku przez miesiąc.

## Luka w kształcie telemetrii

Pole `operationalData.measuredEnvironment.dataSource` referuje do
**zewnętrznego pliku CSV**, ponieważ SBM v2.0 nie ma encji pierwszej klasy
dla telemetrii czasowej. Właściwa encja `telemetry_stream` (proponowana
w [SCHEMA-GAPS](../SCHEMA-GAPS)) pozwoliłaby kompilatorowi:

- Wyliczać 90-dniowe średnie kroczące samodzielnie zamiast czytać nasze podsumowanie
- Wykrywać przekroczenia progów automatycznie
- Renderować linie trendów w raporcie HTML

Na razie statystyki podsumowujące w `measuredEnvironment` są
asercją ludzką z zewnętrznego CSV.
