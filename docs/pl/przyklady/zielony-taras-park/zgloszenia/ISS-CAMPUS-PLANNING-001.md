---
entityType: "issue"
id: "ISS-CAMPUS-PLANNING-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "Warunek planistyczny 14b — schemat oznakowania nawigacji Fazy 2"
issueType: "design_clarification"
issueNumber: "PC-14B"
status: "responded"
priority: "medium"

description: |
  Warszawski warunek planistyczny 14b (dołączony do zatwierdzenia planu generalnego
  kampusu, 2024-11-20) wymaga skoordynowanego schematu oznakowania nawigacji
  obejmującego wszystkie 4 budynki kampusu + wspólne udogodnienia, do przedłożenia
  do zatwierdzenia przed przekazaniem budynku Fazy 2a (BLD-02). Schemat musi
  używać pojedynczej tożsamości wizualnej we wszystkich budynkach, być zgodny
  z piktogramami PN-EN ISO 7010 i adresować dostępność wg WT 2021 § 56.

  To jest **zgłoszenie o zasięgu kampusu** — wpływa na wszystkie 4 budynki,
  ale nie należy do żadnego z nich indywidualnie. Encja Kampusu jest właściwym właścicielem.

campusId: "CAM-GREEN-TERRACE-PARK"
relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"
  - "SF-PLAYGROUND"
  - "SF-BIKE-STORAGE"
  - "SF-EV-HUB"
  - "SF-COMMUNAL-GARDEN"

initiatedBy:
  name: "Wydział Architektury i Budownictwa, m.st. Warszawa"
  organization: "Urząd m.st. Warszawy"
  role: "organ planistyczny"
  date: "2024-11-20"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "koordynator projektu kampusu"
dueDate: "2027-06-30"
responseDate: "2027-04-15"

response:
  respondedBy: "Anna Nowak + agencja brandingowa (Studio Marka)"
  responseDate: "2027-04-15"
  responseText: |
    Skoordynowany schemat oznakowania nawigacji złożony do Wydziału Architektury 2027-04-15.
    Schemat używa tożsamości marki Zielony Taras (zieleń szałwiowa + ciemne drewno)
    konsekwentnie we wszystkich 4 budynkach. Piktogramy PN-EN ISO 7010 użyte
    wszędzie. Oznakowanie dotykowe + Braille'a w punktach decyzyjnych
    dostępnej drogi (zgodne z WT 2021 § 56). Oczekiwanie na zatwierdzenie.

costImpact:
  estimatedDeltaEur: 14500
  appliesTo: "operations_budget"
  notes: "Koszt projektu + produkcji rozłożony na 4 budynki"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Warunek planistyczny zawsze był wewnątrz ścieżki krytycznej rozruchu BLD-02; brak poślizgu."

sources:
  - id: "SRC-ISS-CAMPUS-PC-14B-01"
    title: "Decyzja o pozwoleniu na budowę — Zielony Taras Park, warunek 14b"
    type: "regulatory_code"
    documentType: "planning_decision"
    date: "2024-11-20"
    author: "Wydział Architektury, m.st. Warszawa"

tags:
  - "campus-example"
  - "campus-scope-issue"
  - "regulacyjne"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Warunek planistyczny o zasięgu kampusu — demonstruje Zgłoszenie należące do Kampusu, nie do żadnego pojedynczego Budynku"
---

# Zgłoszenie — Warunek planistyczny 14b, oznakowanie nawigacji (ISS-CAMPUS-PLANNING-001)

**Zgłoszenie o zasięgu kampusu** — wpływa na wszystkie 4 budynki, ale nie
należy do żadnego z nich indywidualnie. Warszawski urząd planistyczny
dołączył skoordynowany warunek nawigacji do zatwierdzenia planu generalnego;
odpowiedzią jest pojedynczy schemat oznakowania obejmujący cały kampus.

| Pole | Wartość |
|---|---|
| Typ | Wyjaśnienie projektowe (warunek planistyczny) |
| Status | Odpowiedziano (oczekiwanie na zatwierdzenie) |
| Zgłoszono | 2024-11-20 (decyzja planistyczna) |
| Odpowiedziano | 2027-04-15 (schemat złożony) |
| Termin | 2027-06-30 (przed przekazaniem BLD-02) |
| Koszt | €14 500 (rozłożony na 4 budynki) |
