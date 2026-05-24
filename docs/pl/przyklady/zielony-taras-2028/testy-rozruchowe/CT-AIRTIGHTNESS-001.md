---
entityType: "commissioning_test"
id: "CT-AIRTIGHTNESS-001"
version: "2.1.0"
projectPhase: "operation"

testName: "Test szczelności powietrznej całego budynku (blower-door) — WYKONANO + PONOWNY TEST"
testCategory: "air_tightness"
status: "conditional_pass"

buildingId: "BLD-01"
testedEntityIds:
  - "ENV-EW-01"
requirementIds:
  - "REQ-PL-WT-328-001"
  - "REQ-ENERGY-PERFORMANCE-001"

testProcedure:
  standard: "PN-EN ISO 9972"
  method: "Metoda 1 — budynek w użyciu. Dwa cykle testowe: wstępny (2026-02-20) i 18-miesięczny powtórny (2027-08-25)."

scheduledDate: "2026-02-20"
executedDate: "2026-02-20"
executedBy:
  name: "Marek Lis"
  organization: "PowietrzPro Sp. z o.o."
  qualification: "Tester szczelności poziomu 2 ATTMA"
  certificationNumber: "ATTMA-2456"
witnessedBy:
  - name: "Anna Nowak"
    organization: "Nowak Architecture"
    role: "Architekt odpowiedzialny"

results:
  expected:
    n50: 1.5
    aT50: 1.2
  measured:
    n50_initial: 1.6
    n50_retest: 1.7
    aT50_initial: 1.28
    aT50_retest: 1.36
    retestDate: "2027-08-25"
    retestReason: "Rutynowa weryfikacja 18-miesięczna wg planu rozruchu. Wynik wywołał NCR."
    measurementDate: "2026-02-20"
    notes: |
      Test wstępny 1,6 ACH przy przekazaniu — przekracza cel projektowy 1,5,
      ale komfortowo w limicie regulacyjnym 2,5. 18-miesięczny powtórny test
      pokazał spadek do 1,7 ACH, prześledzony do zużycia uszczelek obwodowych
      na ościeżach okien południowych Poziomu 04 (spójne ze stresem
      cyklowania termicznego latem).
  passCriteria:
    n50Max: 2.5
    targetN50: 1.5
  outcome: "conditional_pass"
  outcomeNotes: |
    Zaliczenie regulacyjne (1,7 ACH < 2,5 limit). Niezaliczenie celu projektowego (1,7 > 1,5).
    NCR podniesione — patrz ISS-NC-AIRTIGHTNESS-001.

constructionPackageId: "CP-ENVELOPE"

followUpIssueIds:
  - "ISS-NC-AIRTIGHTNESS-001"

sources:
  - id: "SRC-CT-AIRTIGHTNESS-001-OPS-01"
    title: "Zielony Taras — Raport wstępnego testu szczelności powietrznej"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2026-02-20"
    author: "Marek Lis / PowietrzPro Sp. z o.o."
  - id: "SRC-CT-AIRTIGHTNESS-001-OPS-02"
    title: "Zielony Taras — Raport 18-miesięcznego powtórnego testu szczelności"
    type: "other"
    documentType: "commissioning_test_report"
    date: "2027-08-25"
    author: "Marek Lis / PowietrzPro Sp. z o.o."

tags:
  - "operation-phase-example"
  - "wykonany-test"
  - "charakterystyka-energetyczna"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Wykonanie CT-AIRTIGHTNESS-001 w fazie eksploatacji — wstępnie 1,6 ACH, 18-miesięczny powtórny 1,7 ACH, NCR podniesione"
---

# CT-AIRTIGHTNESS-001 — wykonano (2026-02-20) + powtórny test (2027-08-25) — warunkowe zaliczenie

Test szczelności powietrznej całego budynku zaplanowany w
[modelu projektowym](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-AIRTIGHTNESS-001).
**Warunkowe zaliczenie**: budynek spełnia WT 2021 § 328 z marginesem,
ale zarówno test wstępny (1,6 ACH), jak i powtórny po 18 miesiącach
(1,7 ACH) przekraczają cel projektowy 1,5 ACH potrzebny do utrzymania
Klasy Energetycznej B z oryginalnym marginesem.

| Pomiar | Cel projektowy | Zaliczenie | Limit regulacyjny | Wynik |
|---|---|---|---|---|
| n50 przy przekazaniu (2026-02) | 1,5 | warunkowe | ≤ 2,5 | **1,6** — zal. reg., przekr. proj. |
| n50 po 18 miesiącach (2027-08) | 1,5 | warunkowe | ≤ 2,5 | **1,7** — zal. reg., przekr. proj. (gorzej niż wstępnie) |

## Dlaczego to ma znaczenie

Budynek nadal **spełnia regulację** (n50 < 2,5), ale **margines projektowy
się skompresował**. Oryginalne obliczenie energetyczne zakładało n50 = 1,5
dla dostarczenia 45 kWh/m²/rok. Zmierzone 47 kWh/m²/rok
([weryfikacja energetyczna](../weryfikacja-energetyczna)) odzwierciedla
ten poślizg szczelności.

Powtórny test po 18 miesiącach pokazał też **spadek** — 0,1 ACH gorzej
niż liczba przy przekazaniu — co prześledzono do zużycia uszczelek
obwodowych na ościeżach okien południowych Poziomu 04. Zgłoszenie
niezgodności ([ISS-NC-AIRTIGHTNESS-001](../zgloszenia/ISS-NC-AIRTIGHTNESS-001))
wymaga, by podwykonawca przegród przeprowadził remediację przed
ponownym testem po 36 miesiącach.
