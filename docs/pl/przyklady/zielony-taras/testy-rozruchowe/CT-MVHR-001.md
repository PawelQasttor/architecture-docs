---
entityType: "commissioning_test"
id: "CT-MVHR-001"
version: "2.1.0"
projectPhase: "commissioning"

testName: "Wydatki MVHR + sprawność odzysku ciepła — bilans całego budynku"
testCategory: "balancing"
status: "scheduled"

buildingId: "BLD-01"
testedEntityIds:
  - "SYS-HVAC-MVHR-01"
  - "AI-MVHR-01"
requirementIds:
  - "REQ-VENTILATION-OCCUPIED-001"

testProcedure:
  standard: "PN-EN 12599 (regulacja HVAC) + ISO 5801 (badania wentylatorów)"
  method: |
    Pomiar nawiewu/wyciągu w każdym lokalu na każdej kratce za pomocą
    kalibrowanego balometru (TSI 8380). Sprawność odzysku ciepła całego
    budynku mierzona parami czujników temperatury i wilgotności przed/za
    rekuperatorem przez 24-godzinny okres zimowy (cel Δt > 15 °C na jednostce).
    System następnie zrównoważony względem schematu projektowego i wydany
    raport jako-zrównoważone.
  equipment:
    - "Balometr TSI 8380 (ważna kalibracja 2026-12)"
    - "Sondy Vaisala HMP155 T/RH (×4)"
    - "Miernik wielofunkcyjny TESTO 480"
  conditions: |
    Temperatura zewnętrzna ≤ 5 °C dla 24-godzinnego pomiaru odzysku ciepła.
    Wszystkie drzwi lokali zamknięte. Wyciągi łazienkowe w pełni otwarte.
    Sekwencja testowa powtarzana w 6 losowych lokalach + najgorszy lokal
    (najwyższe piętro, ekspozycja północna).

scheduledDate: "2026-02-15"
executedBy:
  name: "Krzysztof Wójcik"
  organization: "VentBalance Sp. z o.o."
  qualification: "Certyfikowany regulator TR/TR 2/2018"
  certificationNumber: "TR-1234"
witnessedBy:
  - name: "Jan Wiśniewski"
    organization: "Projektant MEP odpowiedzialny"
    role: "przedstawiciel projektu"
  - name: "Inżynier kontraktu (TBC)"
    organization: "Budimex S.A."
    role: "przedstawiciel wykonawcy"

results:
  expected:
    perApartmentSupply: 60
    perApartmentExtract: 110
    heatRecoveryEfficiency: 85
    specificFanPower: 0.45
  measured: null
  passCriteria:
    airflowTolerance: 10
    heatRecoveryMinimum: 80
    specificFanPowerMax: 0.5
  outcome: "pending"

constructionPackageId: "CP-MEP"

sources:
  - id: "SRC-CT-MVHR-001-01"
    title: "Zielony Taras — Plan rozruchu §5.3 (MVHR)"
    type: "other"
    documentType: "commissioning_plan"
    date: "2026-01-15"
    author: "Jan Wiśniewski + VentBalance Sp. z o.o."

tags:
  - "artefakt-fazy-rozruchu"

notes: |
  Ten test weryfikuje **założenie projektowe** z encji sypialnia-01:
  60 m³/h nawiewu świeżego powietrza na osobę. Jeśli zmierzony wydatek
  jest poniżej tolerancji 10 %, system wymaga ponownego zrównoważenia
  przed końcowym odbiorem.

  Sprawność odzysku ciepła poniżej 80 % wywołuje zgłoszenie niezgodności
  (encja `issue`, typ `non_conformance`) i ponowny test po naprawieniu.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — pierwszy test z fazy rozruchu w przykładzie"
---

# Test rozruchowy — regulacja MVHR (CT-MVHR-001)

Test **regulacji całobudynkowej MVHR** zaplanowany na fazę rozruchu.
Weryfikuje, czy zamontowany system wentylacji mechanicznej dostarcza
przepływy powietrza i sprawność odzysku ciepła założone w projekcie.

| Pole | Wartość |
|---|---|
| Kategoria | Regulacja (PN-EN 12599) |
| Status | Zaplanowano (2026-02-15) |
| Testowana encja | SYS-HVAC-MVHR-01 + asset AI-MVHR-01 |
| Weryfikuje | REQ-VENTILATION-OCCUPIED-001 (60 m³/h na osobę) |
| Kryteria zaliczenia | Wydatki ±10 %, η ≥ 80 %, SFP ≤ 0,5 W/(l/s) |
| Wynik | W oczekiwaniu — wypełniany po teście |

## Powiązane

- [System `SYS-HVAC-MVHR-01`](../systemy/sys-hvac-01-wentylacja) — system wentylacji MVHR
- [Zasób `AI-MVHR-01`](../zasoby/ai-mvhr-01) — zamontowana jednostka MVHR
- [Pakiet wykonawczy `CP-MEP`](../pakiety-budowlane/cp-instalacje)
