---
entityType: "occupant_survey"
id: "SURVEY-BLD-01-IEQ-2027"
version: "2.3.0"
projectPhase: "operation"

surveyType: "ieq_satisfaction"
surveyTitle: "Zielony Taras 2027 roczna ankieta IEQ"
buildingId: "BLD-01"

period:
  start: "2027-09-01"
  end: "2027-10-15"

responseRate:
  invited: 18
  returned: 12
  percent: 67

dimensions:
  - name: "overall_satisfaction"
    scaleMax: 5
    meanScore: 4.3
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "thermal_comfort_winter"
    scaleMax: 5
    meanScore: 4.4
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "thermal_comfort_summer"
    scaleMax: 5
    meanScore: 3.7
    percentSatisfied: 67
    flagged: true
    satisfactionThreshold: 4
  - name: "indoor_air_quality"
    scaleMax: 5
    meanScore: 4.0
    percentSatisfied: 75
    flagged: false
    satisfactionThreshold: 4
  - name: "acoustic_privacy"
    scaleMax: 5
    meanScore: 4.5
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4
  - name: "daylight"
    scaleMax: 5
    meanScore: 4.6
    percentSatisfied: 100
    flagged: false
    satisfactionThreshold: 4
  - name: "lighting_artificial"
    scaleMax: 5
    meanScore: 4.3
    percentSatisfied: 92
    flagged: false
    satisfactionThreshold: 4

freeTextHighlights:
  - text: "Sypialnia robi się duszna w nocy, szczególnie latem"
    respondentApartmentId: "APT-4.02-ANON"
    affectedEntityId: "SP-BLD-01-L04-002"
    affectedEntityType: "space"
    triggeredIssueId: "ISS-ANOMALY-CO2-001"
  - text: "Lato jest za ciepłe — temperatura popołudniowa sięga 26-27 °C"
    respondentApartmentId: "APT-4.01-4.02-4.03-CLUSTER-ANON"
    affectedEntityId: "LVL-04"
    affectedEntityType: "level"
    triggeredIssueId: null
  - text: "Pompa ciepła wydaje hałas przy uruchamianiu"
    respondentApartmentId: "APT-3.04-ANON"
    affectedEntityId: "AST-HP-01"
    affectedEntityType: "asset"
    triggeredIssueId: "ISS-WARRANTY-HP-001"

methodology:
  scale: "5-punktowa skala Likerta"
  conductor: "GreenFM Sp. z o.o."
  incentive: "brak"
  deliveryMethod: "hybrid"

dataReference:
  protocol: "file_csv"
  path: "surveys/BLD-01-IEQ-2027-responses.csv"

preparedBy: "GreenFM Sp. z o.o."
reviewedBy: "Anna Nowak (Architekt odpowiedzialny)"

tags:
  - "operation-phase-example"
  - "opinie-mieszkancow"
  - "v2-3-feature"

changelog:
  - version: "2.3.0"
    date: "2026-05-24"
    description: "Pierwsza encja occupant_survey w przykładzie — zastępuje narracyjne podsumowanie ankiety encją zapytywalną v2.3."
---

# Ankieta mieszkańców — Zielony Taras 2027 roczna IEQ (SURVEY-BLD-01-IEQ-2027)

Encja `occupant_survey` (**nowość w SBM v2.3**) opakowująca wyniki
rocznej ankiety IEQ 2027. Zastępuje narrację v2.0/v2.2
[podsumowanie-ankiety-mieszkancow](../podsumowanie-ankiety-mieszkancow)
(która pozostaje jako czytelna strona-towarzysz) encją pierwszej klasy
zapytywalną maszynowo.

| Pole | Wartość |
|---|---|
| Typ ankiety | Zadowolenie IEQ |
| Okres | 2027-09-01 → 2027-10-15 |
| Wskaźnik odpowiedzi | **12 z 18 mieszkań** (67 %) |
| Ocenione wymiary | 7 |
| Oznaczone wymiary | 1 (thermal_comfort_summer — 67 % zadowolonych, poniżej progu 75 %) |
| Wskazania tekstu wolnego | 3, każde powiązane z dotkniętą encją + wywołanym zgłoszeniem |
| Wykonawca | GreenFM Sp. z o.o. |

## Co umożliwia v2.3

Każdy wpis `freeTextHighlights` niesie `affectedEntityId` + `triggeredIssueId`
— więc odpowiedź ankietowa skarżąca się na "duszną sypialnię" jest teraz
maszynowo powiązana z przestrzenią `SP-BLD-01-L04-002` i zgłoszeniem
`ISS-ANOMALY-CO2-001`.

## Powiązane

- [Narracja podsumowania ankiety](../podsumowanie-ankiety-mieszkancow) — strona-towarzysz
- [`SP-BLD-01-L04-002`](../przestrzenie/sypialnia-402) — dotknięta przestrzeń
- [`ISS-ANOMALY-CO2-001`](../zgloszenia/ISS-ANOMALY-CO2-001) — wywołane przez tę ankietę
- [`RCX-MVHR-001`](../rekomendacje-retrocx/RCX-MVHR-001) — retro-cx odpowiedź
