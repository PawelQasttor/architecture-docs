---
entityType: "commissioning_test"
id: "CT-MVHR-001"
version: "2.1.0"
projectPhase: "operation"

testName: "Wydatki MVHR + sprawność odzysku ciepła — bilans całego budynku (WYKONANO)"
testCategory: "balancing"
status: "conditional_pass"

buildingId: "BLD-01"
testedEntityIds:
  - "SYS-HVAC-01"
  - "AST-MVHR-01"
requirementIds:
  - "REQ-VENTILATION-OCCUPIED-001"

testProcedure:
  standard: "PN-EN 12599 + ISO 5801"
  method: "Wg harmonogramu — patrz CT-MVHR-001 z fazy projektowej."

scheduledDate: "2026-02-15"
executedDate: "2026-02-15"
executedBy:
  name: "Krzysztof Wójcik"
  organization: "VentBalance Sp. z o.o."
  qualification: "Certyfikowany regulator TR/TR 2/2018"
  certificationNumber: "TR-1234"
witnessedBy:
  - name: "Jan Wiśniewski"
    organization: "Projektant MEP odpowiedzialny"
    role: "przedstawiciel projektu"
  - name: "Maciej Szymański"
    organization: "Budimex S.A."
    role: "przedstawiciel wykonawcy"

results:
  expected:
    perApartmentSupply: 60
    perApartmentExtract: 110
    heatRecoveryEfficiency: 85
    specificFanPower: 0.45
  measured:
    perApartmentSupply_min: 54
    perApartmentSupply_avg: 58.5
    perApartmentSupply_max: 63
    perApartmentExtract_min: 102
    perApartmentExtract_avg: 108
    perApartmentExtract_max: 116
    heatRecoveryEfficiency: 83
    specificFanPower: 0.47
    measurementDate: "2026-02-15"
    notes: "Nawiew do mieszkania 4.02 10 % niżej niż projektowo; zalecono dalsze badanie."
  passCriteria:
    airflowTolerance: 10
    heatRecoveryMinimum: 80
    specificFanPowerMax: 0.5
  outcome: "conditional_pass"
  outcomeNotes: |
    Wszystkie mieszkania w tolerancji ±10 % dla wydatku. Odzysk ciepła 83 %
    przekracza minimum zaliczenia 80 %, ale nie osiąga celu projektowego 85 %.
    SFP 0,47 lekko powyżej projektowego 0,45, ale w limicie regulacyjnym 0,5 W/(l/s).

    Mieszkanie 4.02 — nawiew na dolnej granicy tolerancji (60 - 10 % = 54 m³/h,
    zmierzono dokładnie 54). To okaże się być mieszkaniem, które później
    ujawnia anomalię CO₂ (patrz ISS-ANOMALY-CO2-001) i zostało zrebalansowane
    18 miesięcy później pod ISS-RETROCX-MVHR-001.

constructionPackageId: "CP-MEP"

followUpIssueIds:
  - "ISS-RETROCX-MVHR-001"
  - "ISS-ANOMALY-CO2-001"

sources:
  - id: "SRC-CT-MVHR-001-OPS-01"
    title: "Zielony Taras — Raport testu rozruchowego MVHR, 2026-02-15"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-15"
    author: "Krzysztof Wójcik / VentBalance Sp. z o.o."

tags:
  - "operation-phase-example"
  - "wykonany-test"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Wykonanie CT-MVHR-001 w fazie eksploatacji — warunkowe zaliczenie, ujawnia słabość mieszkania 4.02, która staje się anomalią CO2 21 miesięcy później"
---

# CT-MVHR-001 — wykonano (2026-02-15) — warunkowe zaliczenie

Test regulacji MVHR zaplanowany w [modelu projektowym](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-MVHR-001),
**teraz wykonany**. Warunkowe zaliczenie: wszystkie 6 testowanych mieszkań
w tolerancji, ale mieszkanie 4.02 jest na dolnej granicy pasma, a odzysk
ciepła (83 %) przekracza minimum regulacyjne 80 %, ale nie osiąga celu
projektowego 85 %.

| Metryka | Cel projektowy | Kryterium zaliczenia | Zmierzone | Wynik |
|---|---|---|---|---|
| Nawiew do mieszkania | 60 m³/h | ±10 % (54-66) | 54-63 (śr. 58,5) | w tolerancji |
| Wyciąg z mieszkania | 110 m³/h | ±10 % (99-121) | 102-116 (śr. 108) | w tolerancji |
| Odzysk ciepła | 85 % | ≥ 80 % | **83 %** | zaliczone (poniżej celu projektowego) |
| Specyficzna moc wentylatora | 0,45 W/(l/s) | ≤ 0,5 | 0,47 | zaliczone |

## Co ten test wyprodukował

Dwa **następcze zgłoszenia z fazy eksploatacji**:

1. **[ISS-RETROCX-MVHR-001](../zgloszenia/ISS-RETROCX-MVHR-001)** — zalecenie retro-cx 18 miesięcy później, by zrebalansować mieszkanie 4.02 wyżej. Rebalansowanie wykonano 2027-08-30.
2. **[ISS-ANOMALY-CO2-001](../zgloszenia/ISS-ANOMALY-CO2-001)** — odczyty CO₂ w Sypialni 01 mieszkania 4.02 powyżej celu projektowego, prześledzone z powrotem do niskiego nawiewu tego testu.

Kompilator może teraz pokazać pełny łańcuch: **test wykonano (war. zal.) → skarga mieszkańca ujawnia się 21 miesięcy później → zgłoszenie anomalii CO₂ → zgłoszenie retro-cx → rebalansowanie wykonane → ponowny pomiar w oczekiwaniu**. Ta międzyencyjna linia pochodzenia jest dokładnie tym, do czego model SBM jest zbudowany.
