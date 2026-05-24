---
entityType: "issue"
id: "ISS-CO-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "Zmiana 001 — substytucja produktu izolacji PIR"
issueType: "change_order"
issueNumber: "CO-001"
status: "approved"
priority: "medium"

description: |
  Podwykonawca przegród zaproponował substytucję wyspecyfikowanej izolacji
  Kingspan Kooltherm K15 PIR (`MT-INSULATION-PIR-150`) na Recticel
  Powerline-PIR-DUR o tej samej grubości 150 mm. Oba produkty noszą
  deklarację PN-EN 13165; Recticel jest dostępny 4 tygodnie wcześniej
  od polskiego dystrybutora, i o około €3,40/m² taniej. Proponowana
  alternatywa ma równą lub lepszą deklarowaną λ (0,022 W/(m·K)), równą
  klasę reakcji na ogień (B-s1,d0) i opublikowane EPD.

  Architekt i konstruktor przeanalizowali substytucję pod kątem obliczeń
  U-wartości przegrody i raportu strategii pożarowej. Zatwierdzone
  z warunkami wskazanymi w odpowiedzi.

buildingId: "BLD-01"
constructionPackageId: "CP-ENVELOPE"
relatedEntityIds:
  - "ENV-EW-01"
  - "MT-INSULATION-PIR-150"

initiatedBy:
  name: "Tomasz Maj"
  organization: "PolFasada Sp. z o.o. (podwykonawca przegród)"
  role: "Kierownik projektu"
  date: "2026-04-30"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "Architekt odpowiedzialny"
dueDate: "2026-05-07"
responseDate: "2026-05-06"
closedDate: "2026-05-06"

response:
  respondedBy: "Anna Nowak"
  responseDate: "2026-05-06"
  responseText: |
    Substytucja ZATWIERDZONA pod warunkiem:
    (a) złożenia pełnej ETA + EPD przed dostawą,
    (b) aktualizacji encji materiałowej `MT-INSULATION-PIR-150` do referencji
        EPD Recticel zamiast EPD Kingspan (kompilator przeliczy ślad węglowy —
        zweryfikować, że suma projektowa pozostaje w celu),
    (c) detal odwodnienia dachu zielonego sprawdzony pod kątem kompatybilności
        (brak wpływu na wymiary; ta sama grubość 150 mm),
    (d) kredyt €3,40/m² × 1 245 m² powierzchni brutto ściany = około
        €4 230 do odzwierciedlenia w kolejnym kosztorysie miesięcznym.
  attachments:
    - "Recticel-EPD-2024.pdf"
    - "ETA-13-0142-Powerline.pdf"
    - "CO-001-List-Zatwierdzajacy.pdf"

costImpact:
  estimatedDeltaEur: -4230
  appliesTo: "envelope_subcontract"
  notes: "Kredyt dla inwestora — odzwierciedlony w kosztorysie z maja 2026."

scheduleImpact:
  estimatedDelayDays: -28
  notes: "Oszczędza 4 tygodnie czasu dostawy względem oryginalnego dostawcy Kingspan."

sources:
  - id: "SRC-ISS-CO-001-01"
    title: "Zielony Taras — Zmiana 001"
    type: "other"
    documentType: "change_order"
    date: "2026-05-06"
    author: "PolFasada Sp. z o.o. + Nowak Architecture"

tags:
  - "artefakt-fazy-budowy"

notes: |
  Ta zmiana ma efekt downstream, który kompilator może śledzić automatycznie:
  gdy `MT-INSULATION-PIR-150` zostanie zaktualizowany do wskazania EPD Recticel,
  ponowne obliczenie śladu węglowego przegrody kaskaduje do całościowego
  raportu zrównoważoności budynku. To międzyencyjne falowanie jest właśnie
  powodem, dla którego zgłoszenia referują zarówno do **pakietu wykonawczego**,
  jak i do **konkretnych encji**, na które wpływają.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — demonstruje zmianę z fazy budowy ze skutkami materiałowo-zrównoważoności"
---

# Zgłoszenie — Zmiana 001: substytucja izolacji PIR (ISS-CO-001)

**Zmiana z fazy budowy**, która wymienia jeden produkt PIR na inny, by
uchwycić 4-tygodniową oszczędność czasu dostawy i kredyt €4 230. Zatwierdzona
z warunkami dokumentacyjnymi.

| Pole | Wartość |
|---|---|
| Typ | Zmiana |
| Numer | CO-001 |
| Status | Zatwierdzone + zamknięte |
| Zgłoszono | 2026-04-30 (podwykonawca przegród) |
| Zatwierdzono | 2026-05-06 |
| Wpływ kosztowy | **−€4 230** (kredyt dla inwestora) |
| Wpływ harmonogramowy | **−28 dni** (oszczędność czasu dostawy) |

## Powiązane

- [Przegroda `ENV-EW-01`](../przegroda-sciana-zewnetrzna-typ-a) — układ ściany, którego dotyczy
- [Materiał `MT-INSULATION-PIR-150`](../materialy/MT-INSULATION-PIR-150) — encja do aktualizacji o referencję EPD Recticel
- [Pakiet wykonawczy `CP-ENVELOPE`](../pakiety-budowlane/cp-przegroda)
