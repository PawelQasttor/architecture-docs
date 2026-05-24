---
entityType: "retrocx_recommendation"
id: "RCX-MVHR-001"
version: "2.3.0"
projectPhase: "operation"

recommendationTitle: "Rebalansowanie nawiewu MVHR dla mieszkań od południa Poziomu 04"
buildingId: "BLD-01"

triggeredByIssueIds:
  - "ISS-ANOMALY-CO2-001"
triggeredBySurveyId: "SURVEY-BLD-01-IEQ-2027"
triggeredByTelemetryStreamId: "TEL-CO2-402-001"

affectedSystemIds:
  - "SYS-HVAC-01"
affectedSpaceIds:
  - "SP-BLD-01-L04-002"
affectedAssetIds:
  - "AST-MVHR-01"

proposedIntervention: |
  Zwiększyć nawiew z nawiewników sypialni w mieszkaniach 4.01, 4.02, 4.03
  (klaster od południa Poziomu 04) z oryginalnych 60 m³/h do 70 m³/h
  (17 % wzrost). Brak zmiany sprzętu — wyłącznie regulacja sterowania
  i ustawień przepustnic wykonana przez wykonawcę rebalansowania.

expectedOutcome:
  metric: "co2_90day_mean"
  affectedSpaceIds:
    - "SP-BLD-01-L04-002"
  currentValue: 1180
  targetValue: 1000
  unit: "ppm"

verificationPlan:
  method: |
    Ponowny pomiar 90-dniowej kroczącej średniej CO2 w Sypialni 01
    mieszkania 4.02 jeden miesiąc po rebalansowaniu. Jeśli nadal > 1000 ppm,
    eskalować do głębszego dochodzenia.
  verificationTestId: null
  verificationDueDate: "2027-09-30"

costEstimate_eur: 1200

status: "executed_awaiting_verification"
proposedDate: "2027-08-04"
executedDate: "2027-08-30"

tags:
  - "operation-phase-example"
  - "retrocx"
  - "v2-3-feature"

changelog:
  - version: "2.3.0"
    date: "2026-05-24"
    description: "Pierwsza encja retrocx_recommendation — zastępuje niezgrabne użycie ogólnego Zgłoszenia (issueType: design_clarification) właściwą encją cyklu życia retro-cx."
---

# Rekomendacja retro-cx — Rebalansowanie MVHR (RCX-MVHR-001)

Encja `retrocx_recommendation` (**nowość w SBM v2.3**) dla wzorca fazy
eksploatacji, w którym zmierzona wydajność wywołuje korekcyjną interwencję
bez zmiany sprzętu. Zastępuje niezgrabne użycie ogólnego `issue` w
[`ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001) celową encją cyklu życia.

| Pole | Wartość |
|---|---|
| Status | Wykonane, oczekiwanie na weryfikację |
| Zaproponowane | 2027-08-04 |
| Wykonane | 2027-08-30 |
| Weryfikacja do | 2027-09-30 |
| Koszt | €1 200 |

## Pełny łańcuch przyczynowy (możliwy dopiero w v2.3)

```
TEL-CO2-402-001  ← strumień telemetrii oznaczył przekroczenie progu (cze 2027)
       │
       ↓ wywołało
ISS-ANOMALY-CO2-001  ← analityka BMS podniosła anomalię (lip 2027)
       │
       ↓ korroborowane przez
SURVEY-BLD-01-IEQ-2027  ← ankieta mieszkańców zwróciła skargę "duszne" (wrz 2027)
       │
       ↓ wywołało
RCX-MVHR-001 (ta encja)  ← rekomendacja retro-cx (sie 2027)
       │
       ↓ wykonane przez
[zlecenie pracy VentBalance]  ← fizyczna interwencja (sie 2027)
       │
       ↓ do weryfikacji przez
[1-miesięczny ponowny pomiar CO2]  ← oczekiwanie (do 2027-09-30)
```

## Powiązane

- [`ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001) — narracja zlecenia pracy
- [`TEL-CO2-402-001`](../strumienie-telemetrii/TEL-CO2-402-001) — źródło telemetrii
- [`SURVEY-BLD-01-IEQ-2027`](../ankiety-mieszkancow/SURVEY-BLD-01-IEQ-2027) — korroboracja ankiety
- [`SP-BLD-01-L04-002`](../przestrzenie/sypialnia-402) — dotknięta przestrzeń
