---
entityType: "issue"
id: "ISS-RETROCX-MVHR-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Zalecenie retro-commissioning — rebalansowanie nawiewu MVHR dla mieszkań Poziomu 04"
issueType: "design_clarification"
issueNumber: "RCX-001"
status: "responded"
priority: "medium"

description: |
  W następstwie anomalii CO₂ (ISS-ANOMALY-CO2-001) w mieszkaniu 4.02 oraz
  korroborujących opinii mieszkańców z ankiety IEQ z 2027, GreenFM i
  Projektant MEP odpowiedzialny wspólnie zalecają częściowe retro-commissioning
  nawiewu MVHR do trzech mieszkań od południa na Poziomie 04 (4.01, 4.02, 4.03).

  Propozycja: zwiększyć nawiew z nawiewników sypialni w tych mieszkaniach
  z pierwotnych 60 m³/h do 70 m³/h (17 % wzrost). SFP całobudynkowy
  ponownie sprawdzony.

buildingId: "BLD-01"
relatedEntityIds:
  - "AST-MVHR-01"
  - "SYS-HVAC-01"
  - "SP-BLD-01-L04-002"

initiatedBy:
  name: "Jan Wiśniewski + GreenFM"
  organization: "Projektant MEP + wykonawca FM"
  role: "wspólne zalecenie"
  date: "2027-08-04"
assignedTo:
  name: "Krzysztof Wójcik"
  organization: "VentBalance Sp. z o.o."
  role: "wykonawca rebalansowania"
dueDate: "2027-09-15"
responseDate: "2027-08-30"

response:
  respondedBy: "Krzysztof Wójcik (VentBalance)"
  responseDate: "2027-08-30"
  responseText: |
    Pełne rebalansowanie wykonano 2027-08-30 wg zalecenia. Nawiew z nawiewników
    sypialni zwiększony z 60 do 70 m³/h w mieszkaniach 4.01, 4.02, 4.03.
    SFP całobudynkowy ponownie sprawdzony przy 0,48 W/(l/s) — lekko powyżej
    projektowego 0,45, ale w limicie regulacyjnym 0,5. Koszt €1 200.

    Oczekiwanie na 1-miesięczny ponowny pomiar poziomów CO₂ w Sypialni 01
    mieszkania 4.02 by potwierdzić rozwiązanie anomalii.

costImpact:
  estimatedDeltaEur: 1200
  appliesTo: "operations_budget"

scheduleImpact:
  estimatedDelayDays: 0

tags:
  - "operation-phase-example"
  - "retro-commissioning"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zalecenie retro-cx, które stało się rebalansowaniem — demonstruje pętlę akcji w fazie eksploatacji"
---

# Zgłoszenie — Zalecenie retro-commissioning, rebalansowanie MVHR (ISS-RETROCX-MVHR-001)

**Zalecenie retro-commissioning** — wzorzec fazy eksploatacji, w którym
zmierzona wydajność wywołuje korekcyjną interwencję bez żadnej zmiany sprzętu.

| Pole | Wartość |
|---|---|
| Typ | Wyjaśnienie projektowe (retro-cx) |
| Status | Odpowiedziano (rebalansowanie wykonane; oczekiwanie na ponowny pomiar) |
| Zgłoszono | 2027-08-04 (wspólne MEP + FM) |
| Wykonano | 2027-08-30 |
| Koszt | €1 200 |

## Aspekt luki schematu

Retro-commissioning niezgrabnie pasuje do typu encji `issue` — to ani
RFI (brak pytania), ani zmiana (brak zmiany projektu), ani niezgodność
(budynek nie jest poza specyfikacją). Encja pierwszej klasy
`retrocx_recommendation` w v2.2 miałaby pola wyzwalające, oczekiwany
wynik i plan weryfikacji.

Patrz [SCHEMA-GAPS](../SCHEMA-GAPS) dla proponowanego kształtu.
