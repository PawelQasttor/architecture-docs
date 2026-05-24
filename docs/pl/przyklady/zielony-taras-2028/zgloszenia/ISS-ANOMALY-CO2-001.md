---
entityType: "issue"
id: "ISS-ANOMALY-CO2-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Anomalia czujnika CO₂ — Sypialnia 01 mieszkania 4.02 konsekwentnie powyżej celu projektowego"
issueType: "field_observation"
issueNumber: "ANOM-CO2-001"
status: "under_review"
priority: "medium"

description: |
  Czujnik CO₂ BMS-CO2-402-001 w Sypialni 01 mieszkania 4.02 rejestrował
  90-dniową średnią kroczącą 1 180 ppm, wobec celu projektowego ≤ 1 000 ppm
  (regulacyjny limit twardy 1 500 ppm — budynek jest zgodny). Mieszkaniec
  niezależnie zgłosił "duszne powietrze nocą" w ankiecie IEQ z 2027,
  korroborując dane z czujnika.

  Hipoteza przyczyny źródłowej: **niewystarczający nawiew MVHR** do tej
  sypialni — pierwotny test rozruchowy (CT-MVHR-001) potwierdził nawiew
  na 54 m³/h (10 % poniżej projektowych 60 m³/h), na dolnej granicy pasma
  tolerancji ±10 %. Patrz powiązane zalecenie retro-commissioning
  ISS-RETROCX-MVHR-001.

buildingId: "BLD-01"
relatedEntityIds:
  - "SP-BLD-01-L04-002"
  - "AST-MVHR-01"
  - "SYS-HVAC-01"

initiatedBy:
  name: "Analityka BMS GreenFM"
  organization: "GreenFM Sp. z o.o."
  role: "automatyczne wykrywanie anomalii (90-dniowy próg kroczący)"
  date: "2027-07-15"
assignedTo:
  name: "Jan Wiśniewski + Krzysztof Wójcik"
  organization: "Projektant MEP odpowiedzialny + VentBalance"
  role: "dochodzenie diagnostyczne"

dueDate: "2027-09-30"

costImpact:
  estimatedDeltaEur: 1200
  appliesTo: "operations_budget"
  notes: "Koszt rebalansowania — patrz ISS-RETROCX-MVHR-001 dla wykonania"

tags:
  - "operation-phase-example"
  - "anomalia-czujnika"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Anomalia fazy eksploatacji — czujnik CO2 konsekwentnie powyżej celu projektowego, powiązany z marginalnym nawiewem MVHR; wywołało zalecenie retro-cx"
---

# Zgłoszenie — Anomalia CO₂, Sypialnia 01 mieszkania 4.02 (ISS-ANOMALY-CO2-001)

**Sterowane czujnikiem** zgłoszenie z fazy eksploatacji: automatyczne
wykrywanie średniej kroczącej 90-dniowej oznakowało tę sypialnię jako
systemowo powyżej projektowego celu CO₂. Odpowiedź ankietowa mieszkańca
2 miesiące później korroborowała.

| Pole | Wartość |
|---|---|
| Typ | Obserwacja terenowa (anomalia czujnika) |
| Status | W przeglądzie (rebalansowanie wykonane; oczekiwanie na 1-miesięczny ponowny pomiar) |
| Zgłoszono | 2027-07-15 (analityka BMS) |
| Termin | 2027-09-30 |
| Powiązane z | [CT-MVHR-001 warunkowe zaliczenie](../testy-rozruchowe/CT-MVHR-001), [ankieta mieszkańców](../podsumowanie-ankiety-mieszkancow), [ISS-RETROCX-MVHR-001](./ISS-RETROCX-MVHR-001) |

## Co pokazuje to zgłoszenie

Łańcuch dowodów to **co czyni SBM użytecznym w eksploatacji**:
- Pierwotny test rozruchowy oznaczył to mieszkanie na dolnej granicy pasma tolerancji.
- BMS wykrył konsekwencję (spadek CO₂) 16 miesięcy później.
- Ankieta mieszkańca niezależnie korroborowała 2 miesiące potem.
- Zgłoszenie retro-cx podniesione do rebalansowania; rebalansowanie wykonane; oczekiwanie na weryfikację.

Bez referencji międzyencyjnych byłyby to trzy odłączone obserwacje.
Z nimi jest to jedna diagnostyczna historia.
