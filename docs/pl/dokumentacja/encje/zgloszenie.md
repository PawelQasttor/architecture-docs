# Zgloszenie (Administracja Budowy)

## Czym To Jest

**Plik Zgloszenia** dokumentuje jedno zdarzenie administracyjne na budowie: zapytanie informacyjne (RFI), polecenie zmiany, przedlozenie, kontrole, usterke odbiorcza. Przyklady: "RFI-007: Uklad warstw sciany piwnicznej", "CO-003: Zmiana specyfikacji okien".

::: tip Dla Architektow
**Problem:** Inspektor nadzoru pyta "Ile RFI jest otwartych?" lub "Czy zmiana okien wplywa na harmonogram?" — szukasz w e-mailach, arkuszach Excel, platformie PlanGrid.

**Stary sposob:** Oddzielne logi RFI w Excelu, polecenia zmian w PDF, usterki na papierowych listach. Kazdy uczestnik ma inna wersje stanu.

**Ze zgloszeniami:** Otworz `issues/iss-rfi-007.md` — status, przypisanie, odpowiedz, wplyw kosztowy i terminowy w jednym pliku. **Jedno zrodlo prawdy dla calej administracji budowy.**

**Jeden plik zgloszenia = pelna historia sprawy od zgloszenia do zamkniecia.**
:::

**Zgloszenie** reprezentuje formalne zdarzenie administracyjne w procesie budowlanym. Obejmuje zapytania informacyjne (RFI), polecenia zmian, przedlozenia, kontrole, usterki odbiorowe, obserwacje terenowe, niezgodnosci i wyjasnienia projektowe. Zgloszenia umozliwiaja sledzenie korespondencji, wplywu kosztowego i terminowego oraz integracje z formatem BCF dla koordynacji BIM.

## Przeznaczenie

Zgloszenia definiuja:
- Formalna korespondencje budowlana (RFI, polecenia zmian, przedlozenia)
- Sledzenie statusu i przypisania odpowiedzialnosci
- Wplyw kosztowy i terminowy zmian
- Kontrole i protokoly odbiorow
- Usterki i uwagi odbiorowe (punch list)
- Obserwacje terenowe i niezgodnosci
- Integracje z BCF (BIM Collaboration Format) dla koordynacji modeli

## Pola Wymagane

| Pole | Typ | Opis | Przyklad |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator zgloszenia | `"ISS-RFI-007"` |
| `entityType` | string | Musi byc `"issue"` | `"issue"` |
| `issueTitle` | string | Tytul zgloszenia czytelny dla ludzi | `"Uklad warstw sciany piwnicznej"` |
| `issueType` | string | Typ zgloszenia (patrz wyliczenie ponizej) | `"rfi"` |
| `status` | string | Biezacy status (patrz wyliczenie ponizej) | `"submitted"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektow: Co Oznaczaja Te Wymagane Pola
- **id**: Identyfikator zgloszenia z prefiksem `ISS-` (np. `ISS-RFI-007`, `ISS-CO-003`, `ISS-PL-012`)
- **issueTitle**: Krotki, opisowy tytul ("Uklad warstw sciany piwnicznej", "Zmiana specyfikacji okien")
- **issueType**: Kategoria — `rfi` (zapytanie), `change_order` (zmiana), `submittal` (przedlozenie), `inspection` (kontrola), `punch_list` (usterka)
- **status**: Biezacy stan — `draft`, `submitted`, `under_review`, `responded`, `approved`, `rejected`, `closed`, `void`
- **version**: Sledz zmiany

**Potrzebujesz TYLKO tych 5 pol.** Przypisanie, odpowiedz, wplyw kosztowy — to wszystko opcjonalne, dodawane w miare rozwoju sprawy.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `issueNumber` | number | Numer kolejny w ramach typu (np. 7 dla RFI-007) |
| `priority` | string | Priorytet: `low`, `medium`, `high`, `critical` |
| `description` | string | Szczegolowy opis zgloszenia |
| `buildingId` | string | Referencja do budynku |
| `relatedEntityIds` | array | ID powiazanych encji (przestrzeni, systemow, zasobow) |
| `constructionPackageId` | string | Odniesienie do pakietu robot budowlanych |
| `initiatedBy` | object | Kto zglosil (name, organization, role, date) |
| `assignedTo` | object | Kto jest odpowiedzialny (name, organization, role) |
| `dueDate` | string | Termin odpowiedzi/realizacji (ISO 8601) |
| `response` | object | Odpowiedz (respondedBy, responseDate, responseText) |
| `costImpact` | object | Wplyw kosztowy (estimatedCost, approvedCost, currency) |
| `scheduleImpact` | object | Wplyw terminowy (estimatedDays, criticalPath) |
| `bcfReference` | object | Referencja BCF (topicGuid, viewpointGuid, serverUrl) |
| `attachments` | array | Zalaczniki (fileName, fileType, url, description) |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektow: Ktore Pola Opcjonalne Sa Najwazniejsze?

**Dla sledzenia korespondencji (najwazniejsze):**
- **initiatedBy** — Kto zglosil i kiedy (imie, organizacja, rola, data)
- **assignedTo** — Kto jest odpowiedzialny za odpowiedz
- **dueDate** — Termin na odpowiedz
- **response** — Tresc odpowiedzi z data i autorem

**Dla kontroli zmian:**
- **costImpact** — Szacowany i zatwierdzony koszt zmiany
- **scheduleImpact** — Ile dni opoznienia, czy na sciezce krytycznej
- **constructionPackageId** — Ktorego pakietu robot dotyczy

**Dla koordynacji BIM:**
- **bcfReference** — Powiazanie z tematem BCF w modelu BIM
- **relatedEntityIds** — Powiazane przestrzenie, systemy, zasoby

**Najczesciej:** Wypelnij `initiatedBy`, `assignedTo`, `dueDate`. Reszte dodawaj gdy sprawa sie rozwija.
:::

## Typy Zgloszen (Wyliczenie)

```typescript
type IssueType =
  | "rfi"                    // Zapytanie informacyjne (Request for Information)
  | "change_order"           // Polecenie zmiany
  | "submittal"              // Przedlozenie (material, urzadzenie do zatwierdzenia)
  | "inspection"             // Kontrola / inspekcja
  | "punch_list"             // Usterka / uwaga odbiorowa
  | "field_observation"      // Obserwacja terenowa
  | "non_conformance"        // Niezgodnosc z projektem/specyfikacja
  | "design_clarification";  // Wyjasnienie projektowe
```

## Statusy Zgloszen (Wyliczenie)

```typescript
type IssueStatus =
  | "draft"          // Szkic — nie wyslany
  | "submitted"      // Wyslany — oczekuje na przegad
  | "under_review"   // W trakcie przegadu
  | "responded"      // Odpowiedz udzielona
  | "approved"       // Zatwierdzony (dla zmian, przedlozen)
  | "rejected"       // Odrzucony
  | "closed"         // Zamkniety — sprawa rozwiazana
  | "void";          // Anulowany — nie dotyczy
```

## Przyklad 1: Pierwszy Plik Zgloszenia (Minimalny)

**Najprostsze zgloszenie — RFI dotyczace detalu konstrukcyjnego:**

::: code-group

```md [Markdown]
Plik: issues/iss-rfi-007.md

---
id: "ISS-RFI-007"
entityType: "issue"
issueTitle: "Uklad warstw sciany piwnicznej"
issueType: "rfi"
status: "submitted"
version: "1.0.0"

# Kontekst
issueNumber: 7
priority: "high"
description: "Prosze o potwierdzenie ukladu warstw sciany piwnicznej przy styku z plyta fundamentowa. Rysunki A-201 i S-105 pokazuja rozne rozwiazania."
buildingId: "BLD-01"

initiatedBy:
  name: "Jan Kowalski"
  organization: "Budimex S.A."
  role: "kierownik budowy"
  date: "2026-09-15"

assignedTo:
  name: "Anna Nowak"
  organization: "Pracownia Architektoniczna XYZ"
  role: "projektant"

dueDate: "2026-09-22"
---

# RFI-007: Uklad Warstw Sciany Piwnicznej

Prosze o potwierdzenie ukladu warstw sciany piwnicznej.
Rysunki A-201 i S-105 pokazuja rozne rozwiazania.
```

```yaml [YAML]
id: "ISS-RFI-007"
entityType: "issue"
issueTitle: "Uklad warstw sciany piwnicznej"
issueType: "rfi"
status: "submitted"
version: "1.0.0"
issueNumber: 7
priority: "high"
description: "Prosze o potwierdzenie ukladu warstw sciany piwnicznej przy styku z plyta fundamentowa. Rysunki A-201 i S-105 pokazuja rozne rozwiazania."
buildingId: "BLD-01"
initiatedBy:
  name: "Jan Kowalski"
  organization: "Budimex S.A."
  role: "kierownik budowy"
  date: "2026-09-15"
assignedTo:
  name: "Anna Nowak"
  organization: "Pracownia Architektoniczna XYZ"
  role: "projektant"
dueDate: "2026-09-22"
```

```json [JSON]
{
  "id": "ISS-RFI-007",
  "entityType": "issue",
  "issueTitle": "Uklad warstw sciany piwnicznej",
  "issueType": "rfi",
  "status": "submitted",
  "version": "1.0.0",
  "issueNumber": 7,
  "priority": "high",
  "description": "Prosze o potwierdzenie ukladu warstw sciany piwnicznej przy styku z plyta fundamentowa. Rysunki A-201 i S-105 pokazuja rozne rozwiazania.",
  "buildingId": "BLD-01",
  "initiatedBy": {
    "name": "Jan Kowalski",
    "organization": "Budimex S.A.",
    "role": "kierownik budowy",
    "date": "2026-09-15"
  },
  "assignedTo": {
    "name": "Anna Nowak",
    "organization": "Pracownia Architektoniczna XYZ",
    "role": "projektant"
  },
  "dueDate": "2026-09-22"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "issueTitle", "issueType", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ISS-" },
    "entityType": { "const": "issue" },
    "issueTitle": { "type": "string" },
    "issueType": {
      "type": "string",
      "enum": ["rfi", "change_order", "submittal", "inspection", "punch_list", "field_observation", "non_conformance", "design_clarification"]
    },
    "status": {
      "type": "string",
      "enum": ["draft", "submitted", "under_review", "responded", "approved", "rejected", "closed", "void"]
    },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Odpowiedz, wplyw kosztowy i terminowy dodasz gdy sprawa sie rozwinie.

---

## Przyklad 2: Pelne Zgloszenie (Polecenie Zmiany)

**Plik:** `issues/iss-co-003.md`

::: code-group

```md [Markdown]
---
entityType: "issue"
id: "ISS-CO-003"
issueTitle: "Zmiana specyfikacji okien — strefa polnocna"
issueType: "change_order"
status: "approved"
version: "1.0.0"

issueNumber: 3
priority: "high"
description: "Zmiana specyfikacji okien w strefie polnocnej z aluminiowych na PVC ze wzgledu na wymagania termiczne WT 2021 i optymalizacje kosztowa. Dotyczy 24 okien na kondygnacjach 1-4."
buildingId: "BLD-01"
relatedEntityIds:
  - "ENV-EW-01"
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
constructionPackageId: "CP-FACADE"

initiatedBy:
  name: "Piotr Wisniewski"
  organization: "Pracownia Architektoniczna XYZ"
  role: "glowny projektant"
  date: "2026-08-20"

assignedTo:
  name: "Marek Jankowski"
  organization: "Budimex S.A."
  role: "kierownik budowy"

dueDate: "2026-09-03"

response:
  respondedBy:
    name: "Marek Jankowski"
    organization: "Budimex S.A."
  responseDate: "2026-08-28"
  responseText: "Zatwierdzono zmiane. Dostawca potwierdza dostepnosc profili PVC Schuco w terminie 3 tygodni. Koszt materialow nizszy o 18 000 PLN, robocizna bez zmian."

costImpact:
  estimatedCost: -18000
  approvedCost: -18000
  currency: "PLN"
  description: "Oszczednosc na materialach — profile PVC tansze niz aluminiowe"

scheduleImpact:
  estimatedDays: 5
  criticalPath: false
  description: "5 dni opoznienia dostawy profili PVC, ale nie na sciezce krytycznej"

bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  serverUrl: "https://bim.projekt-xyz.pl/bcf"

attachments:
  - fileName: "porownanie-okien-alu-vs-pvc.pdf"
    fileType: "application/pdf"
    description: "Analiza porownawcza aluminium vs PVC — parametry termiczne i kosztowe"
  - fileName: "karta-techniczna-schuco-pvc.pdf"
    fileType: "application/pdf"
    description: "Karta techniczna profili PVC Schuco"

tags:
  - "change_order"
  - "facade"
  - "windows"
  - "cost_saving"
  - "thermal_performance"
---

# Polecenie Zmiany CO-003: Zmiana Specyfikacji Okien

Zmiana specyfikacji okien w strefie polnocnej z aluminiowych na PVC.

## Uzasadnienie

- Poprawa parametrow termicznych (Uw z 1.3 na 0.9 W/m2K)
- Oszczednosc kosztowa 18 000 PLN na materialach
- Lepsza zgodnosc z WT 2021 § 328

## Zakres Zmiany

- 24 okna na kondygnacjach 1-4 w strefie polnocnej
- Profile aluminiowe → PVC Schuco
- Bez zmian w wymiarach otworow
```

```yaml [YAML]
entityType: "issue"
id: "ISS-CO-003"
issueTitle: "Zmiana specyfikacji okien — strefa polnocna"
issueType: "change_order"
status: "approved"
version: "1.0.0"
issueNumber: 3
priority: "high"
description: "Zmiana specyfikacji okien w strefie polnocnej z aluminiowych na PVC ze wzgledu na wymagania termiczne WT 2021 i optymalizacje kosztowa. Dotyczy 24 okien na kondygnacjach 1-4."
buildingId: "BLD-01"
relatedEntityIds:
  - "ENV-EW-01"
  - "SP-BLD-01-L01-001"
  - "SP-BLD-01-L01-002"
constructionPackageId: "CP-FACADE"
initiatedBy:
  name: "Piotr Wisniewski"
  organization: "Pracownia Architektoniczna XYZ"
  role: "glowny projektant"
  date: "2026-08-20"
assignedTo:
  name: "Marek Jankowski"
  organization: "Budimex S.A."
  role: "kierownik budowy"
dueDate: "2026-09-03"
response:
  respondedBy:
    name: "Marek Jankowski"
    organization: "Budimex S.A."
  responseDate: "2026-08-28"
  responseText: "Zatwierdzono zmiane. Dostawca potwierdza dostepnosc profili PVC Schuco w terminie 3 tygodni. Koszt materialow nizszy o 18 000 PLN, robocizna bez zmian."
costImpact:
  estimatedCost: -18000
  approvedCost: -18000
  currency: "PLN"
  description: "Oszczednosc na materialach — profile PVC tansze niz aluminiowe"
scheduleImpact:
  estimatedDays: 5
  criticalPath: false
  description: "5 dni opoznienia dostawy profili PVC, ale nie na sciezce krytycznej"
bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  serverUrl: "https://bim.projekt-xyz.pl/bcf"
attachments:
  - fileName: "porownanie-okien-alu-vs-pvc.pdf"
    fileType: "application/pdf"
    description: "Analiza porownawcza aluminium vs PVC — parametry termiczne i kosztowe"
  - fileName: "karta-techniczna-schuco-pvc.pdf"
    fileType: "application/pdf"
    description: "Karta techniczna profili PVC Schuco"
tags:
  - "change_order"
  - "facade"
  - "windows"
  - "cost_saving"
  - "thermal_performance"
```

```json [JSON]
{
  "entityType": "issue",
  "id": "ISS-CO-003",
  "issueTitle": "Zmiana specyfikacji okien — strefa polnocna",
  "issueType": "change_order",
  "status": "approved",
  "version": "1.0.0",
  "issueNumber": 3,
  "priority": "high",
  "description": "Zmiana specyfikacji okien w strefie polnocnej z aluminiowych na PVC ze wzgledu na wymagania termiczne WT 2021 i optymalizacje kosztowa. Dotyczy 24 okien na kondygnacjach 1-4.",
  "buildingId": "BLD-01",
  "relatedEntityIds": ["ENV-EW-01", "SP-BLD-01-L01-001", "SP-BLD-01-L01-002"],
  "constructionPackageId": "CP-FACADE",
  "initiatedBy": {
    "name": "Piotr Wisniewski",
    "organization": "Pracownia Architektoniczna XYZ",
    "role": "glowny projektant",
    "date": "2026-08-20"
  },
  "assignedTo": {
    "name": "Marek Jankowski",
    "organization": "Budimex S.A.",
    "role": "kierownik budowy"
  },
  "dueDate": "2026-09-03",
  "response": {
    "respondedBy": {
      "name": "Marek Jankowski",
      "organization": "Budimex S.A."
    },
    "responseDate": "2026-08-28",
    "responseText": "Zatwierdzono zmiane. Dostawca potwierdza dostepnosc profili PVC Schuco w terminie 3 tygodni. Koszt materialow nizszy o 18 000 PLN, robocizna bez zmian."
  },
  "costImpact": {
    "estimatedCost": -18000,
    "approvedCost": -18000,
    "currency": "PLN",
    "description": "Oszczednosc na materialach — profile PVC tansze niz aluminiowe"
  },
  "scheduleImpact": {
    "estimatedDays": 5,
    "criticalPath": false,
    "description": "5 dni opoznienia dostawy profili PVC, ale nie na sciezce krytycznej"
  },
  "bcfReference": {
    "topicGuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "serverUrl": "https://bim.projekt-xyz.pl/bcf"
  },
  "attachments": [
    {
      "fileName": "porownanie-okien-alu-vs-pvc.pdf",
      "fileType": "application/pdf",
      "description": "Analiza porownawcza aluminium vs PVC — parametry termiczne i kosztowe"
    },
    {
      "fileName": "karta-techniczna-schuco-pvc.pdf",
      "fileType": "application/pdf",
      "description": "Karta techniczna profili PVC Schuco"
    }
  ],
  "tags": ["change_order", "facade", "windows", "cost_saving", "thermal_performance"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "issueTitle", "issueType", "status", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^ISS-" },
    "entityType": { "const": "issue" },
    "issueTitle": { "type": "string" },
    "issueType": {
      "type": "string",
      "enum": ["rfi", "change_order", "submittal", "inspection", "punch_list", "field_observation", "non_conformance", "design_clarification"]
    },
    "status": {
      "type": "string",
      "enum": ["draft", "submitted", "under_review", "responded", "approved", "rejected", "closed", "void"]
    },
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"]
    },
    "issueNumber": { "type": "integer" },
    "buildingId": { "type": "string" },
    "constructionPackageId": { "type": "string" },
    "costImpact": { "type": "object" },
    "scheduleImpact": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

## Przeplyw Statusow

Typowy przeplyw statusow zgloszenia:

```
draft → submitted → under_review → responded → closed
                                  → approved → closed
                                  → rejected → closed
                       (w dowolnym momencie) → void
```

**Dla RFI:** `draft` → `submitted` → `under_review` → `responded` → `closed`

**Dla polecen zmian:** `draft` → `submitted` → `under_review` → `approved`/`rejected` → `closed`

**Dla usterek:** `draft` → `submitted` → `under_review` → `responded` (naprawiono) → `closed`

## Integracja z BCF

Zgloszenia moga byc powiazane z tematami BCF (BIM Collaboration Format) dla koordynacji modeli:

```yaml
bcfReference:
  topicGuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  viewpointGuid: "f9e8d7c6-b5a4-3210-fedc-ba0987654321"
  serverUrl: "https://bim.projekt-xyz.pl/bcf"
```

**Co to daje:**
- Klikniecie w zgloszenie otwiera odpowiedni widok w modelu BIM
- Kontekst geometryczny dla kazdego zgloszenia
- Synchronizacja statusow miedzy SBM a platforma BCF

## Sledzenie Wplywu Kosztowego

Zgloszenia typu `change_order` sledza wplyw na budzet:

```yaml
costImpact:
  estimatedCost: -18000      # Ujemny = oszczednosc
  approvedCost: -18000
  currency: "PLN"
  description: "Oszczednosc na materialach"
```

**Logika agregacji:** Kompilator sumuje `approvedCost` ze wszystkich zatwierdzonych polecen zmian i aktualizuje calkowity budzet projektu.

## Mapowanie BIM

Zgloszenia nie maja bezposredniego odpowiednika w IFC — lacza sie z modelem BIM poprzez format BCF:

| Pole SBM | Format BCF | Opis |
|----------|------------|------|
| `id` | `Topic.ReferenceLink` | Referencja do zgloszenia SBM |
| `issueTitle` | `Topic.Title` | Tytul tematu BCF |
| `issueType` | `Topic.TopicType` | Typ tematu |
| `status` | `Topic.TopicStatus` | Status tematu |
| `priority` | `Topic.Priority` | Priorytet |
| `assignedTo` | `Topic.AssignedTo` | Przypisanie |
| `dueDate` | `Topic.DueDate` | Termin |
| `description` | `Topic.Description` | Opis |
| `bcfReference.topicGuid` | `Topic.Guid` | Identyfikator tematu BCF |
| `bcfReference.viewpointGuid` | `Viewpoint.Guid` | Identyfikator widoku |

## Zobacz Takze

- **[Pakiet Budowlany](/pl/dokumentacja/encje/pakiet-budowlany)** — Zgloszenia dotycza pakietow robot
- **[Test Odbioru](/pl/dokumentacja/encje/test-odbioru)** — Testy weryfikuja wymagania, zgloszenia rejestruja problemy
- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** — Zgloszenia moga dotyczyc spelnienia wymagan
- **[Przegroda](/pl/dokumentacja/encje/przegroda)** — RFI czesto dotycza detali konstrukcyjnych
- **[Instalacja](/pl/dokumentacja/encje/system)** — Polecenia zmian moga dotyczyc systemow MEP
