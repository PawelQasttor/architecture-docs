---
entityType: "issue"
id: "ISS-BID-001"
version: "2.1.0"
projectPhase: "bidding_procurement"

issueTitle: "Aneks do przetargu 01 — wyjaśnienie kotew szczeliny wentylowanej dla Ściany Zewnętrznej Typ A"
issueType: "design_clarification"
issueNumber: "BA-001"
status: "closed"
priority: "medium"

description: |
  W otwartym okresie składania ofert dwóch z trzech wybranych podwykonawców
  przegród zapytało, jaki system kotew szczeliny wentylowanej był zakładany
  w obliczeniach konstrukcyjnych dla rainscreen Ściany Zewnętrznej Typ A.
  Dokumentacja wykonawcza wskazywała "stalowe nierdzewne kotwy spiralne
  zgodnie ze specyfikacją producenta" bez nazwy producenta, co zmusiło
  oferentów do wyceniania trzech różnych produktów o istotnie różnych
  kosztach i tempie montażu.

  Aneks 01 rozwiązuje niejednoznaczność, wskazując Halfen HK4 jako produkt
  bazowy projektu, jednocześnie wyraźnie dopuszczając produkty równoważne
  pod warunkiem zatwierdzenia przez konstruktora. To wyrównuje pole
  startowe oferentów bez wiązania kontraktu z jednym dostawcą.

buildingId: "BLD-01"
constructionPackageId: "CP-ENVELOPE"
relatedEntityIds:
  - "ENV-EW-01"

initiatedBy:
  name: "Podwykonawcy przetargowi (PolFasada Sp. z o.o. i Stylbud Sp. z o.o.)"
  organization: "Zewnętrzni — okres ofertowy"
  role: "oferent"
  date: "2026-03-08"
assignedTo:
  name: "Piotr Kowalski"
  organization: "Kowalski Structural Engineering"
  role: "Konstruktor odpowiedzialny"
dueDate: "2026-03-15"
responseDate: "2026-03-12"
closedDate: "2026-03-15"

response:
  respondedBy: "Piotr Kowalski"
  responseDate: "2026-03-12"
  responseText: |
    Produkt bazowy projektu to Halfen HK4 — stalowa nierdzewna kotwa
    spiralna szczeliny w rozstawie 600 mm poziomo × 450 mm pionowo
    (dodatkowe kotwy przy otworach wg detalu 04/A-501). Produkty równoważne
    od Ancon, Wienerberger lub innych producentów są akceptowalne pod
    warunkiem: (a) deklarowanej charakterystycznej nośności na rozciąganie
    i ściskanie ≥ wartości Halfen HK4 wg ETA-12/0260, (b) klasy stali
    nierdzewnej A4 (lub równoważnej), (c) przedłożenia ETA zgodnej z EAD
    + instrukcji montażu producenta w ramach kart materiałowych podwykonawcy.
  attachments:
    - "Aneks-01-KotwySzczeliny.pdf"
    - "Detal-04-A-501-Aktualizacja.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "envelope_subcontract"
  notes: "Wyrównuje oferty — nie zmienia budżetu projektu."

scheduleImpact:
  estimatedDelayDays: 0

sources:
  - id: "SRC-ISS-BID-001-01"
    title: "Zielony Taras — Aneks do przetargu 01"
    type: "other"
    documentType: "addendum"
    date: "2026-03-12"
    author: "Architekt prowadzący (Anna Nowak) + Konstruktor (Piotr Kowalski)"

tags:
  - "artefakt-fazy-przetargowo-zakupowej"

notes: |
  Wydany w 3-tygodniowym okresie otwartego przetargu (2026-03-01 → 2026-03-22).
  Rozwiązany przed terminem składania ofert, więc nie wymagał przedłużenia.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — pierwszy artefakt fazy przetargowej w przykładzie"
---

# Zgłoszenie — Aneks do przetargu 01: kotwy szczeliny (ISS-BID-001)

**Wyjaśnienie projektowe z fazy przetargowej** wywołane pytaniami
podwykonawców. Rozwiązane w okresie ofertowym bez opóźnienia harmonogramu
ani zmiany budżetu.

| Pole | Wartość |
|---|---|
| Typ | Wyjaśnienie projektowe (Aneks) |
| Numer | BA-001 |
| Status | Zamknięte |
| Zgłoszono | 2026-03-08 (zapytanie podwykonawcze w okresie ofertowym) |
| Odpowiedziano | 2026-03-12 |
| Zamknięto | 2026-03-15 |
| Wpływ kosztowy | €0 — wyrównuje oferty |
| Wpływ harmonogramowy | 0 dni |

## Powiązane

- [Przegroda `ENV-EW-01`](../przegroda-sciana-zewnetrzna-typ-a)
- [Pakiet wykonawczy `CP-ENVELOPE`](../pakiety-budowlane/cp-przegroda)
