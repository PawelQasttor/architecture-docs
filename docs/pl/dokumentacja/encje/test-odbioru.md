# Test Odbioru (Komisjonowanie i Odbiory)

## Czym To Jest

**Plik Testu Odbioru** dokumentuje jeden test komisjonowania lub odbioru technicznego. Przyklady: "Blower door test — szczelnosc powietrzna budynku", "Pomiar akustyczny miedzy mieszkaniami M-01 i M-02".

::: tip Dla Architektow
**Problem:** Inspektor PINB pyta "Czy budynek przeszedl test szczelnosci?" lub "Gdzie jest protokol pomiaru akustycznego?" — szukasz w segregatorach, e-mailach od laboratorium, skanach PDF.

**Stary sposob:** Protokoly badan w papierowych teczkach, wyniki pomiarow w Excelu, certyfikaty w PDF-ach. Kazdy podwykonawca dostarcza dokumenty w innym formacie.

**Z testami odbioru:** Otworz `tests/ct-airtight-01.md` — procedura, wyniki, porownanie z wymaganiami, certyfikat w jednym pliku. **Pelna sciezka audytu od planowania testu do certyfikatu.**

**Jeden plik testu = kompletna dokumentacja badania od procedury do wyniku.**
:::

**Test Odbioru** reprezentuje formalne badanie komisjonowania lub odbioru technicznego przeprowadzone na budynku, instalacji lub elemencie budowlanym. Laczy wyniki pomiarow z wymaganiami, ktore weryfikuje, sledzi statusy zaliczenia/niezaliczenia, rejestruje usterki i certyfikaty. Kluczowy dla procesu przekazania budynku do uzytkowania.

## Przeznaczenie

Testy odbioru definiuja:
- Wyniki badan komisjonowania instalacji (rozruch, regulacja, rownowazenie)
- Pomiary wydajnosciowe (szczelnosc, akustyka, termowizja)
- Weryfikacje wymagan regulacyjnych (odpornosc ogniowa, obciazenia)
- Protokoly prob cisnieniowych i wodnych
- Sledzenie zaliczenia/niezaliczenia z odchyleniami
- Usterki wykryte podczas testow z powiazaniem do zgloszen
- Certyfikaty i swiadectwa z badan
- Harmonogramowanie testow i retestow

## Pola Wymagane

| Pole | Typ | Opis | Przyklad |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator testu | `"CT-AIRTIGHT-01"` |
| `entityType` | string | Musi byc `"commissioning_test"` | `"commissioning_test"` |
| `testName` | string | Nazwa testu czytelna dla ludzi | `"Blower door test — szczelnosc powietrzna"` |
| `testCategory` | string | Kategoria testu (patrz wyliczenie ponizej) | `"air_tightness"` |
| `status` | string | Biezacy status (patrz wyliczenie ponizej) | `"passed"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektow: Co Oznaczaja Te Wymagane Pola
- **id**: Identyfikator testu z prefiksem `CT-` (np. `CT-AIRTIGHT-01`, `CT-ACOUSTIC-M01-M02`, `CT-FIRE-EW01`)
- **testName**: Czytelna nazwa ("Blower door test", "Pomiar akustyczny miedzy mieszkaniami")
- **testCategory**: Co badasz — `air_tightness` (szczelnosc), `acoustic_measurement` (akustyka), `pressure_test` (cisnienie), `fire_test` (ogien)
- **status**: Stan testu — `planned`, `scheduled`, `passed`, `failed`, `conditional_pass`
- **version**: Sledz zmiany

**Potrzebujesz TYLKO tych 5 pol.** Wyniki pomiarow, certyfikaty i usterki dodajesz po przeprowadzeniu testu.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `buildingId` | string | Referencja do budynku |
| `testedEntityIds` | array | ID testowanych encji (przestrzeni, systemow, przegrod) |
| `requirementIds` | array | ID wymagan weryfikowanych przez ten test |
| `testProcedure` | object | Procedura testowa (standard, method, equipment) |
| `scheduledDate` | string | Planowana data testu (ISO 8601) |
| `executedDate` | string | Faktyczna data wykonania testu (ISO 8601) |
| `executedBy` | object | Kto wykonal test (name, organization, qualification) |
| `witnessedBy` | array | Swiadkowie testu (name, organization, role) |
| `results` | object | Wyniki pomiaru (measuredValue, requiredValue, unit, passed, deviation) |
| `deficiencies` | array | Usterki wykryte podczas testu (description, severity, issueId) |
| `certificate` | object | Certyfikat/swiadectwo (number, issuedBy, issuedDate) |
| `retestRequired` | boolean | Czy wymagany retest |
| `retestDate` | string | Data rettestu (ISO 8601) |
| `attachments` | array | Zalaczniki (protokoly, zdjecia, raporty) |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektow: Ktore Pola Opcjonalne Sa Najwazniejsze?

**Dla dokumentacji odbiorowej (najwazniejsze):**
- **results** — Wynik pomiaru vs wymaganie (np. n50 = 0.4 h-1 vs wymagane <= 0.6 h-1)
- **certificate** — Numer certyfikatu, kto wydal, kiedy
- **executedBy** — Kto wykonal test (kwalifikacje sa wazne dla waznosci badania)
- **requirementIds** — Ktore wymagania ten test weryfikuje

**Dla sledzenia procesu:**
- **scheduledDate** / **executedDate** — Planowanie i realizacja testow
- **deficiencies** — Usterki wykryte podczas testu (powiazane ze zgloszeniami)
- **retestRequired** — Czy trzeba powtorzyc test po naprawie usterek

**Dla audytu:**
- **testProcedure** — Wedlug jakiej normy, jaka metoda, jakim sprzetem
- **witnessedBy** — Kto byl swiadkiem (inspektor nadzoru, inwestor)

**Najczesciej:** Wypelnij `results`, `executedBy`, `executedDate`, `certificate`. Reszte dodawaj w miare potrzeb.
:::

## Kategorie Testow (Wyliczenie)

```typescript
type TestCategory =
  | "functional_performance"     // Test wydajnosci funkcjonalnej
  | "pressure_test"              // Proba cisnieniowa
  | "air_tightness"              // Test szczelnosci powietrznej (blower door)
  | "acoustic_measurement"       // Pomiar akustyczny
  | "thermal_imaging"            // Termowizja
  | "fire_test"                  // Test ogniowy / odpornosci ogniowej
  | "electrical_test"            // Pomiary elektryczne (izolacja, uziemienie)
  | "water_test"                 // Proba wodna (instalacja, hydroizolacja)
  | "commissioning_sequence"     // Sekwencja rozruchowa systemu
  | "balancing"                  // Rownowazenie instalacji (wentylacja, CO)
  | "controls_verification"      // Weryfikacja automatyki / BMS
  | "emergency_systems"          // Test systemow awaryjnych (SAP, DSO, oswietlenie)
  | "accessibility_audit"        // Audyt dostepnosci
  | "environmental_measurement"  // Pomiar srodowiskowy (halas, zanieczyszczenia)
  | "structural_load_test"       // Proba obciazeniowa konstrukcji
  | "other";                     // Inny typ testu
```

## Statusy Testow (Wyliczenie)

```typescript
type TestStatus =
  | "planned"           // Zaplanowany — jeszcze nie umowiony
  | "scheduled"         // Umowiony — data i wykonawca ustaleni
  | "in_progress"       // W trakcie wykonywania
  | "passed"            // Zaliczony — wyniki spelniaja wymagania
  | "failed"            // Niezaliczony — wymagany retest
  | "conditional_pass"  // Warunkowo zaliczony — drobne odchylenia
  | "deferred"          // Odroczony — przyczyna udokumentowana
  | "cancelled";        // Anulowany — nie dotyczy
```

## Przyklad 1: Pierwszy Plik Testu (Minimalny)

**Najprostszy test — blower door test szczelnosci powietrznej:**

::: code-group

```md [Markdown]
Plik: tests/ct-airtight-01.md

---
id: "CT-AIRTIGHT-01"
entityType: "commissioning_test"
testName: "Blower door test — szczelnosc powietrzna budynku"
testCategory: "air_tightness"
status: "passed"
version: "1.0.0"

# Kontekst
buildingId: "BLD-01"
requirementIds:
  - "REQ-PL-WT-AIRTIGHT-001"

testProcedure:
  standard: "PN-EN ISO 9972:2015"
  method: "Metoda B — badanie obudowy budynku"
  equipment: "Minneapolis Blower Door Model 4"

executedDate: "2026-11-20"
executedBy:
  name: "Tomasz Zielinski"
  organization: "Laboratorium Badan Budowlanych Sp. z o.o."
  qualification: "Certyfikowany operator blower door nr BD-2024-0156"

results:
  measuredValue: 0.4
  requiredValue: 0.6
  unit: "h-1"
  metric: "n50"
  passed: true
  deviation: -0.2

certificate:
  number: "LBB/BD/2026/0847"
  issuedBy: "Laboratorium Badan Budowlanych Sp. z o.o."
  issuedDate: "2026-11-22"
---

# Blower Door Test — Szczelnosc Powietrzna

Test szczelnosci powietrznej budynku wg PN-EN ISO 9972.
Wynik: n50 = 0,4 h-1 (wymaganie: <= 0,6 h-1) — **ZALICZONY**.
```

```yaml [YAML]
id: "CT-AIRTIGHT-01"
entityType: "commissioning_test"
testName: "Blower door test — szczelnosc powietrzna budynku"
testCategory: "air_tightness"
status: "passed"
version: "1.0.0"
buildingId: "BLD-01"
requirementIds:
  - "REQ-PL-WT-AIRTIGHT-001"
testProcedure:
  standard: "PN-EN ISO 9972:2015"
  method: "Metoda B — badanie obudowy budynku"
  equipment: "Minneapolis Blower Door Model 4"
executedDate: "2026-11-20"
executedBy:
  name: "Tomasz Zielinski"
  organization: "Laboratorium Badan Budowlanych Sp. z o.o."
  qualification: "Certyfikowany operator blower door nr BD-2024-0156"
results:
  measuredValue: 0.4
  requiredValue: 0.6
  unit: "h-1"
  metric: "n50"
  passed: true
  deviation: -0.2
certificate:
  number: "LBB/BD/2026/0847"
  issuedBy: "Laboratorium Badan Budowlanych Sp. z o.o."
  issuedDate: "2026-11-22"
```

```json [JSON]
{
  "id": "CT-AIRTIGHT-01",
  "entityType": "commissioning_test",
  "testName": "Blower door test — szczelnosc powietrzna budynku",
  "testCategory": "air_tightness",
  "status": "passed",
  "version": "1.0.0",
  "buildingId": "BLD-01",
  "requirementIds": ["REQ-PL-WT-AIRTIGHT-001"],
  "testProcedure": {
    "standard": "PN-EN ISO 9972:2015",
    "method": "Metoda B — badanie obudowy budynku",
    "equipment": "Minneapolis Blower Door Model 4"
  },
  "executedDate": "2026-11-20",
  "executedBy": {
    "name": "Tomasz Zielinski",
    "organization": "Laboratorium Badan Budowlanych Sp. z o.o.",
    "qualification": "Certyfikowany operator blower door nr BD-2024-0156"
  },
  "results": {
    "measuredValue": 0.4,
    "requiredValue": 0.6,
    "unit": "h-1",
    "metric": "n50",
    "passed": true,
    "deviation": -0.2
  },
  "certificate": {
    "number": "LBB/BD/2026/0847",
    "issuedBy": "Laboratorium Badan Budowlanych Sp. z o.o.",
    "issuedDate": "2026-11-22"
  }
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "testName", "testCategory", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CT-" },
    "entityType": { "const": "commissioning_test" },
    "testName": { "type": "string" },
    "testCategory": {
      "type": "string",
      "enum": ["functional_performance", "pressure_test", "air_tightness", "acoustic_measurement", "thermal_imaging", "fire_test", "electrical_test", "water_test", "commissioning_sequence", "balancing", "controls_verification", "emergency_systems", "accessibility_audit", "environmental_measurement", "structural_load_test", "other"]
    },
    "status": {
      "type": "string",
      "enum": ["planned", "scheduled", "in_progress", "passed", "failed", "conditional_pass", "deferred", "cancelled"]
    },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Test zaplanowany, wykonany, wynik udokumentowany. Usterki i retesty dodasz jesli beda potrzebne.

---

## Przyklad 2: Pelny Test (Pomiar Akustyczny z Usterkami)

**Plik:** `tests/ct-acoustic-m01-m02.md`

::: code-group

```md [Markdown]
---
entityType: "commissioning_test"
id: "CT-ACOUSTIC-M01-M02"
testName: "Pomiar izolacyjnosci akustycznej miedzy mieszkaniami M-01 i M-02"
testCategory: "acoustic_measurement"
status: "failed"
version: "1.0.0"

buildingId: "BLD-01"
testedEntityIds:
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
  - "ENV-IW-01"
requirementIds:
  - "REQ-PL-WT-ACOUSTIC-WALL-001"

testProcedure:
  standard: "PN-EN ISO 16283-1:2014"
  method: "Pomiar izolacyjnosci od dzwiekow powietrznych in situ"
  equipment: "Sonometr Bruel & Kjaer 2270, zrodlo dzwieku Bruel & Kjaer 4292"

scheduledDate: "2026-11-10"
executedDate: "2026-11-12"

executedBy:
  name: "dr inz. Maria Lewandowska"
  organization: "Akustyka Budowlana Sp. z o.o."
  qualification: "Biegly rzeczoznawca akustyki budowlanej PZITB nr 0234/2020"

witnessedBy:
  - name: "Krzysztof Mazur"
    organization: "Nadzor Inwestorski ABC"
    role: "inspektor nadzoru"
  - name: "Agnieszka Dabrowska"
    organization: "Spoldzielnia Mieszkaniowa Green Terrace"
    role: "przedstawiciel inwestora"

results:
  measuredValue: 48
  requiredValue: 52
  unit: "dB"
  metric: "R'w"
  passed: false
  deviation: -4

deficiencies:
  - description: "Niedostateczna izolacyjnosc akustyczna sciany miedzylokalowej — R'w = 48 dB vs wymagane 52 dB. Prawdopodobna przyczyna: mostek akustyczny w miejscu przejscia instalacji wod-kan przez sciane."
    severity: "major"
    issueId: "ISS-NCR-008"
  - description: "Widoczna szczelina miedzy sciana a sufitem w mieszkaniu M-02 (ok. 3 mm). Moze byc dodatkowa sciezka przeplywu dzwieku."
    severity: "minor"
    issueId: "ISS-PL-015"

retestRequired: true
retestDate: "2026-12-15"

attachments:
  - fileName: "protokol-akustyczny-m01-m02.pdf"
    fileType: "application/pdf"
    description: "Pelny protokol pomiaru akustycznego z wykresami czestotliwosciowymi"
  - fileName: "zdjecia-mostki-akustyczne.zip"
    fileType: "application/zip"
    description: "Dokumentacja fotograficzna wykrytych mostkow akustycznych"

tags:
  - "acoustic"
  - "failed"
  - "retest_required"
  - "inter_apartment_wall"
---

# Pomiar Akustyczny M-01 / M-02

Pomiar izolacyjnosci akustycznej sciany miedzylokalowej miedzy mieszkaniami M-01 i M-02.

## Wynik

- **Zmierzone:** R'w = 48 dB
- **Wymagane:** R'w >= 52 dB (WT 2021 § 326)
- **Status:** NIEZALICZONY (odchylenie: -4 dB)

## Usterki

1. Mostek akustyczny w miejscu przejscia instalacji wod-kan
2. Szczelina miedzy sciana a sufitem w M-02

## Dalsze Kroki

- Naprawa mostkow akustycznych do 2026-12-01
- Retest zaplanowany na 2026-12-15
```

```yaml [YAML]
entityType: "commissioning_test"
id: "CT-ACOUSTIC-M01-M02"
testName: "Pomiar izolacyjnosci akustycznej miedzy mieszkaniami M-01 i M-02"
testCategory: "acoustic_measurement"
status: "failed"
version: "1.0.0"
buildingId: "BLD-01"
testedEntityIds:
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
  - "ENV-IW-01"
requirementIds:
  - "REQ-PL-WT-ACOUSTIC-WALL-001"
testProcedure:
  standard: "PN-EN ISO 16283-1:2014"
  method: "Pomiar izolacyjnosci od dzwiekow powietrznych in situ"
  equipment: "Sonometr Bruel & Kjaer 2270, zrodlo dzwieku Bruel & Kjaer 4292"
scheduledDate: "2026-11-10"
executedDate: "2026-11-12"
executedBy:
  name: "dr inz. Maria Lewandowska"
  organization: "Akustyka Budowlana Sp. z o.o."
  qualification: "Biegly rzeczoznawca akustyki budowlanej PZITB nr 0234/2020"
witnessedBy:
  - name: "Krzysztof Mazur"
    organization: "Nadzor Inwestorski ABC"
    role: "inspektor nadzoru"
  - name: "Agnieszka Dabrowska"
    organization: "Spoldzielnia Mieszkaniowa Green Terrace"
    role: "przedstawiciel inwestora"
results:
  measuredValue: 48
  requiredValue: 52
  unit: "dB"
  metric: "R'w"
  passed: false
  deviation: -4
deficiencies:
  - description: "Niedostateczna izolacyjnosc akustyczna sciany miedzylokalowej — R'w = 48 dB vs wymagane 52 dB. Prawdopodobna przyczyna: mostek akustyczny w miejscu przejscia instalacji wod-kan przez sciane."
    severity: "major"
    issueId: "ISS-NCR-008"
  - description: "Widoczna szczelina miedzy sciana a sufitem w mieszkaniu M-02 (ok. 3 mm). Moze byc dodatkowa sciezka przeplywu dzwieku."
    severity: "minor"
    issueId: "ISS-PL-015"
retestRequired: true
retestDate: "2026-12-15"
attachments:
  - fileName: "protokol-akustyczny-m01-m02.pdf"
    fileType: "application/pdf"
    description: "Pelny protokol pomiaru akustycznego z wykresami czestotliwosciowymi"
  - fileName: "zdjecia-mostki-akustyczne.zip"
    fileType: "application/zip"
    description: "Dokumentacja fotograficzna wykrytych mostkow akustycznych"
tags:
  - "acoustic"
  - "failed"
  - "retest_required"
  - "inter_apartment_wall"
```

```json [JSON]
{
  "entityType": "commissioning_test",
  "id": "CT-ACOUSTIC-M01-M02",
  "testName": "Pomiar izolacyjnosci akustycznej miedzy mieszkaniami M-01 i M-02",
  "testCategory": "acoustic_measurement",
  "status": "failed",
  "version": "1.0.0",
  "buildingId": "BLD-01",
  "testedEntityIds": ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002", "ENV-IW-01"],
  "requirementIds": ["REQ-PL-WT-ACOUSTIC-WALL-001"],
  "testProcedure": {
    "standard": "PN-EN ISO 16283-1:2014",
    "method": "Pomiar izolacyjnosci od dzwiekow powietrznych in situ",
    "equipment": "Sonometr Bruel & Kjaer 2270, zrodlo dzwieku Bruel & Kjaer 4292"
  },
  "scheduledDate": "2026-11-10",
  "executedDate": "2026-11-12",
  "executedBy": {
    "name": "dr inz. Maria Lewandowska",
    "organization": "Akustyka Budowlana Sp. z o.o.",
    "qualification": "Biegly rzeczoznawca akustyki budowlanej PZITB nr 0234/2020"
  },
  "witnessedBy": [
    {
      "name": "Krzysztof Mazur",
      "organization": "Nadzor Inwestorski ABC",
      "role": "inspektor nadzoru"
    },
    {
      "name": "Agnieszka Dabrowska",
      "organization": "Spoldzielnia Mieszkaniowa Green Terrace",
      "role": "przedstawiciel inwestora"
    }
  ],
  "results": {
    "measuredValue": 48,
    "requiredValue": 52,
    "unit": "dB",
    "metric": "R'w",
    "passed": false,
    "deviation": -4
  },
  "deficiencies": [
    {
      "description": "Niedostateczna izolacyjnosc akustyczna sciany miedzylokalowej — R'w = 48 dB vs wymagane 52 dB. Prawdopodobna przyczyna: mostek akustyczny w miejscu przejscia instalacji wod-kan przez sciane.",
      "severity": "major",
      "issueId": "ISS-NCR-008"
    },
    {
      "description": "Widoczna szczelina miedzy sciana a sufitem w mieszkaniu M-02 (ok. 3 mm). Moze byc dodatkowa sciezka przeplywu dzwieku.",
      "severity": "minor",
      "issueId": "ISS-PL-015"
    }
  ],
  "retestRequired": true,
  "retestDate": "2026-12-15",
  "attachments": [
    {
      "fileName": "protokol-akustyczny-m01-m02.pdf",
      "fileType": "application/pdf",
      "description": "Pelny protokol pomiaru akustycznego z wykresami czestotliwosciowymi"
    },
    {
      "fileName": "zdjecia-mostki-akustyczne.zip",
      "fileType": "application/zip",
      "description": "Dokumentacja fotograficzna wykrytych mostkow akustycznych"
    }
  ],
  "tags": ["acoustic", "failed", "retest_required", "inter_apartment_wall"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "testName", "testCategory", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CT-" },
    "entityType": { "const": "commissioning_test" },
    "testName": { "type": "string" },
    "testCategory": {
      "type": "string",
      "enum": ["functional_performance", "pressure_test", "air_tightness", "acoustic_measurement", "thermal_imaging", "fire_test", "electrical_test", "water_test", "commissioning_sequence", "balancing", "controls_verification", "emergency_systems", "accessibility_audit", "environmental_measurement", "structural_load_test", "other"]
    },
    "status": {
      "type": "string",
      "enum": ["planned", "scheduled", "in_progress", "passed", "failed", "conditional_pass", "deferred", "cancelled"]
    },
    "results": {
      "type": "object",
      "properties": {
        "measuredValue": { "type": "number" },
        "requiredValue": { "type": "number" },
        "unit": { "type": "string" },
        "metric": { "type": "string" },
        "passed": { "type": "boolean" },
        "deviation": { "type": "number" }
      }
    },
    "version": { "type": "string" }
  }
}
```

:::

## Przeplyw Statusow

Typowy przeplyw statusow testu odbioru:

```
planned → scheduled → in_progress → passed → (zamkniety)
                                   → failed → (retest) → passed
                                   → conditional_pass → (zamkniety)
                      (w dowolnym momencie) → deferred
                      (w dowolnym momencie) → cancelled
```

**Test zaliczony:** `planned` → `scheduled` → `in_progress` → `passed`

**Test niezaliczony z retestem:** `planned` → `scheduled` → `in_progress` → `failed` → (naprawa usterek) → nowy test `CT-*-RETEST` → `passed`

**Test warunkowo zaliczony:** `planned` → `scheduled` → `in_progress` → `conditional_pass` (drobne odchylenia zaakceptowane)

## Powiazanie z Wymaganiami

Testy odbioru zamykaja petle weryfikacji wymagan:

```yaml
# Wymaganie definiuje CEL
# (wymaganie.md)
id: "REQ-PL-WT-AIRTIGHT-001"
metric: "n50"
operator: "<="
value: 0.6
unit: "h-1"
verification:
  method: "testing"
  standard: "PN-EN ISO 9972"

# Test odbioru dostarcza DOWOD
# (ct-airtight-01.md)
id: "CT-AIRTIGHT-01"
requirementIds: ["REQ-PL-WT-AIRTIGHT-001"]
results:
  measuredValue: 0.4
  requiredValue: 0.6
  passed: true
```

**Logika kompilatora:** Gdy test jest `passed` i `requirementIds` zawiera dane wymaganie, kompilator oznacza to wymaganie jako **zweryfikowane** w raporcie zgodnosci.

## Powiazanie z Zgloszeniami

Usterki wykryte podczas testow tworza powiazania ze zgloszeniami:

```yaml
deficiencies:
  - description: "Mostek akustyczny przy przejsciu instalacji"
    severity: "major"
    issueId: "ISS-NCR-008"  # Powiazanie ze zgloszeniem niezgodnosci
```

**Przeplyw:** Test `failed` → usterka z `issueId` → zgloszenie `ISS-NCR-008` (status: `submitted`) → naprawa → retest `CT-ACOUSTIC-M01-M02-R1` → `passed` → zgloszenie `closed`.

## Integracja z Raportem Zgodnosci

Testy odbioru wypelniaja sekcje weryfikacji w raporcie zgodnosci:

```json
{
  "verificationResults": [
    {
      "requirementId": "REQ-PL-WT-AIRTIGHT-001",
      "requirementName": "Szczelnosc powietrzna budynku",
      "testId": "CT-AIRTIGHT-01",
      "testDate": "2026-11-20",
      "measuredValue": 0.4,
      "requiredValue": 0.6,
      "unit": "h-1",
      "status": "verified",
      "certificateNumber": "LBB/BD/2026/0847"
    },
    {
      "requirementId": "REQ-PL-WT-ACOUSTIC-WALL-001",
      "requirementName": "Izolacyjnosc akustyczna sciany miedzylokalowej",
      "testId": "CT-ACOUSTIC-M01-M02",
      "testDate": "2026-11-12",
      "measuredValue": 48,
      "requiredValue": 52,
      "unit": "dB",
      "status": "failed",
      "retestRequired": true,
      "retestDate": "2026-12-15"
    }
  ]
}
```

## Mapowanie BIM

Testy odbioru nie maja bezposredniego odpowiednika w IFC — lacza sie z modelem poprzez weryfikacje wymagan:

| Pole SBM | Relacja IFC | Opis |
|----------|-------------|------|
| `testedEntityIds` | Referencje do encji IFC | Testowane elementy (przestrzenie, przegrody, systemy) |
| `requirementIds` | `IfcConstraint` | Wymagania weryfikowane przez test |
| `results.metric` | `IfcPropertySingleValue` | Zmierzona wartosc jako wlasciwosc IFC |
| `certificate.number` | `IfcDocumentInformation` | Certyfikat jako dokument powiazany |

**Uwaga:** Standard IFC nie definiuje dedykowanej encji dla testow komisjonowania. Wyniki testow przechowywane sa jako wlasciwosci niestandardowe (`Pset_SBM_CommissioningTest`) powiazane z testowanymi elementami.

## Zobacz Takze

- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** — Testy weryfikuja spelnienie wymagan
- **[Zgloszenie](/pl/dokumentacja/encje/zgloszenie)** — Usterki z testow tworza zgloszenia
- **[Instalacja](/pl/dokumentacja/encje/system)** — Komisjonowanie dotyczy systemow MEP
- **[Przegroda](/pl/dokumentacja/encje/przegroda)** — Testy akustyczne i termiczne dotycza przegrod
- **[Pakiet Budowlany](/pl/dokumentacja/encje/pakiet-budowlany)** — Testy powiazane z pakietami robot
