---
entityType: "system"
id: "SYS-HVAC-01"
version: "2.1.0"
projectPhase: "operation"

systemName: "System HVAC — główny"
systemTypeId: "SYS-HVAC-RESIDENTIAL-MVHR"
buildingId: "BLD-01"
systemCategory: "hvac"

operationalSummary:
  monthsOperational: 22
  measuredEfficiency:
    heatPumpAvgCOP: 3.4
    mvhrAvgHeatRecovery: 83
    overallSystemUptime: 99.2
  serviceEvents:
    plannedMaintenance: 4
    unplannedInterventions: 2
    rebalancingEvents: 1
  dataSource: "zewnętrzny CSV: telemetry/SYS-HVAC-01-bms-2026-04-to-2028-01.csv"

activeIssueIds:
  - "ISS-WARRANTY-HP-001"
  - "ISS-RETROCX-MVHR-001"
  - "ISS-ANOMALY-CO2-001"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "System HVAC w fazie eksploatacji — niesie zmierzoną sprawność, zliczenia zdarzeń serwisowych i ref. do aktywnych zgłoszeń"
---

# System HVAC (faza eksploatacji) — SYS-HVAC-01

22 miesiące wydajności operacyjnej dla budynkowego systemu HVAC.
Projekt systemu w [przykładzie projektowym](/pl/przyklady/zielony-taras/systemy/sys-hvac-01).

| Metryka | Zmierzone (22 mies.) | Cel projektowy | Różnica |
|---|---|---|---|
| Średni COP pompy ciepła | 3,4 | 3,6 | −5,5 % |
| Średni odzysk ciepła MVHR | 83 % | 85 % | −2 pp |
| Ogólny czas pracy systemu | 99,2 % | (brak) | n/d |
| Konserwacja planowa | 4 kwartalne inspekcje | 8 przez 22 mies. | pół-tempa (po okresie gwarancyjnym zmniejszone) |
| Interwencje nieplanowe | 2 | (cel 0) | 1 gwarancja + 1 wezwanie mieszkańca |
| Zdarzenia rebalansowania | 1 (w 18 miesiącu) | (brak) | powiązane z ISS-RETROCX |

## Co mówią liczby

System **działa w tolerancji** pod względem czasu pracy i odzysku ciepła,
ale COP pompy ciepła jest **5,5 % poniżej celu projektowego**. 7 % spadek
sprawności samej pompy ciepła (patrz [`AST-HP-01`](../zasoby/ai-hp-01-ops))
wyjaśnia większość tej luki; gwarancyjna wymiana sprężarki po fakcie
prawdopodobnie wprowadziła anomalię ładowania czynnika chłodniczego,
która wymaga zbadania.

## Źródło telemetrii

Zmierzone wartości sprawności to 90-dniowe średnie kroczące z BMS,
eksportowane jako CSV pod ścieżką pliku w `operationalSummary.dataSource`.
Schemat SBM v2.0 nie modeluje natywnie szeregów czasowych — patrz
[SCHEMA-GAPS](../SCHEMA-GAPS) dla proponowanej encji `telemetry_stream`,
która zastąpiłaby referencję do pliku zewnętrznego.
