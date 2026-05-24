---
entityType: "asset"
id: "AST-MVHR-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "Jednostka MVHR 01 (eksploatacja)"
assetTypeId: "AT-MVHR-RESIDENTIAL"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-12-08"
commissioningDate: "2026-02-15"
warrantyExpiry: "2028-02-15"

operationalHistory:
  runtimeHours: 19200
  runtimeHoursAsOf: "2028-01-31"
  filterChangeCount: 5
  energyConsumed_kWh: 1480

  servicedAt:
    - date: "2026-06-15"
      type: "filter_change"
      technician: "Konserwacja budynku (Adam Lis)"
      findings: "Pierwsza planowa wymiana filtra F7 po 4 miesiącach. Filtry umiarkowanie zabrudzone. Zmierzony odzysk ciepła 84,2 %."
      cost_eur: 65
    - date: "2026-12-04"
      type: "filter_change"
      technician: "Konserwacja budynku (Adam Lis)"
      findings: "Kwartalna wymiana F7. Odzysk ciepła 83,9 %."
      cost_eur: 65
    - date: "2027-03-22"
      type: "filter_change"
      technician: "Konserwacja budynku (Adam Lis)"
      findings: "Wymiana filtra + inspekcja kanałów. Znaleziono luźną izolację na kanale do mieszkania 4.02 — zabezpieczono."
      cost_eur: 110
    - date: "2027-08-30"
      type: "rebalancing"
      technician: "VentBalance Sp. z o.o. (Krzysztof Wójcik, TR-1234)"
      findings: |
        Pełne rebalansowanie systemu wg ISS-RETROCX-MVHR-001. Nawiew
        do mieszkania 4.02 zwiększony z 60 do 70 m³/h na nawiewnikach sypialni;
        SFP całobudynkowy ponownie sprawdzony przy 0,48 W/(l/s) (lekko powyżej
        projektowego 0,45).
      cost_eur: 1200
      relatedIssueId: "ISS-RETROCX-MVHR-001"
    - date: "2027-12-04"
      type: "filter_change"
      technician: "Konserwacja budynku (Adam Lis)"
      findings: "Wymiana filtra. Odzysk ciepła 83,1 % (niżej niż bazowy). Zalecana inspekcja powierzchni wymiennika przy 36-miesięcznym serwisie."
      cost_eur: 65

  performanceTrend:
    baselineHeatRecovery: 85
    postCommissioningHR: 84.2
    currentHR: 83.1
    deltaPct: -2.2
    notes: "Ogólnie w tolerancji. Lekki trend spadkowy; podejrzenie zabrudzenia wymiennika. Głębokie czyszczenie zaplanowane na 36-miesięczny serwis."

  dataSource: "zewnętrzny CSV: telemetry/AST-MVHR-01-airflow-and-hr-2026-04-to-2028-01.csv"

activeIssueIds:
  - "ISS-RETROCX-MVHR-001"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zapis MVHR w fazie eksploatacji — 19 200 godzin pracy, 4 wymiany filtra + 1 rebalansowanie, odzysk ciepła trendujący -2 % od bazowego"
---

# MVHR AST-MVHR-01 — zapis eksploatacyjny (styczeń 2028)

Jednostka MVHR po 22 miesiącach i 19 200 godzinach pracy. Odzysk ciepła
trendujący **2,2 % poniżej celu projektowego** z jednym rebalansowaniem
w 18 miesiącu.

| Metryka | Wartość |
|---|---|
| Godziny pracy | 19 200 (niemal ciągle) |
| Wymiany filtra | 5 |
| Zużyta energia | 1 480 kWh |
| Zdarzenia serwisowe | 5 (4 wymiany filtra + 1 rebalansowanie) |
| Bieżący odzysk ciepła | 83,1 % (cel 85, bazowy 84,2) |
| Całkowity koszt serwisu (22 mies.) | €1 505 |
| Aktywne zgłoszenie | [ISS-RETROCX-MVHR-001](../zgloszenia/ISS-RETROCX-MVHR-001) |

## Trend wydajności

Powolny spadek odzysku ciepła (84,2 → 83,1 % przez 18 miesięcy) jest
spójny z **zabrudzeniem powierzchni wymiennika** mimo filtracji F7 przed
nim. Głębokie czyszczenie zaplanowane na 36-miesięczny serwis.

Rebalansowanie w 18 miesiącu ([`ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001))
zwiększyło nawiew do mieszkań na Poziomie 04, gdzie mieszkańcy zgłaszali
duszne powietrze — adresując anomalię CO₂ u źródła, podczas gdy dochodzenie
w sprawie odzysku ciepła trwa.

## Powiązane

- [System `SYS-HVAC-01`](../systemy/sys-hvac-01)
- [Zgłoszenie `ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001)
- Odpowiednik z fazy projektowej: [`AST-MVHR-01` w modelu projektowym](/pl/przyklady/zielony-taras/zasoby/ai-mvhr-01)
