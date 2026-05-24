---
entityType: "issue"
id: "ISS-TENANT-MR-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Zgłoszenie mieszkańca — wyciek z odpływu łazienki, mieszkanie 4.02"
issueType: "field_observation"
issueNumber: "TMR-001"
status: "closed"
priority: "medium"

description: |
  Mieszkaniec mieszkania 4.02 zgłosił powolny wyciek z rury odpływu łazienki
  na styku podłoga-ściana. Wniknięcie wody niewidoczne dla mieszkań poniżej
  (zatrzymane przez membranę przeciwwilgociową). Podwykonawca hydrauliczny
  wrócił w ramach 12-miesięcznej gwarancji wykonawczej.

buildingId: "BLD-01"
relatedEntityIds:
  - "SP-BLD-01-L04-002"
  - "SYS-HVAC-01"

initiatedBy:
  name: "Mieszkaniec (mieszkanie 4.02)"
  organization: "Rezydent"
  role: "mieszkaniec"
  date: "2026-09-08"
assignedTo:
  name: "PlumbingPro Sp. z o.o."
  organization: "Pierwotny podwykonawca hydrauliczny"
  role: "12-miesięczna gwarancja wykonawcza"
dueDate: "2026-09-15"
responseDate: "2026-09-11"
closedDate: "2026-09-12"

response:
  respondedBy: "PlumbingPro Sp. z o.o."
  responseDate: "2026-09-11"
  responseText: |
    Inspekcja łazienki mieszkania 4.02 2026-09-09. Potwierdzono powolny
    wyciek na połączeniu syfonu (nieprawidłowe zaciskanie podczas montażu).
    Połączenie przerobione + test ciśnieniowy. Brak prac naprawczych
    membrany — wyciek wychwycony przed jakimkolwiek przebiciem strukturalnym.
    Naprawa pokryta 12-miesięczną gwarancją wykonawczą.

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "12_month_warranty"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Rozwiązane w 3 dni. Łazienka mieszkania 4.02 wyłączona z użytku przez 2 godziny podczas naprawy."

tags:
  - "operation-phase-example"
  - "zgloszenie-mieszkanca"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zgłoszenie konserwacji mieszkańca — wyciek z odpływu łazienki, rozwiązane w ramach 12-miesięcznej gwarancji wykonawczej"
---

# Zgłoszenie — Konserwacja od mieszkańca, mieszkanie 4.02 (ISS-TENANT-MR-001)

Rutynowe **mieszkańcze** zgłoszenie z fazy eksploatacji. Wychwycone
wcześnie przez mieszkańca, rozwiązane w ramach gwarancji wykonawczej,
brak szkód downstream.

| Pole | Wartość |
|---|---|
| Typ | Obserwacja terenowa / zgłoszenie mieszkańca |
| Status | Zamknięte |
| Zgłoszono | 2026-09-08 (mieszkaniec) |
| Zamknięto | 2026-09-12 |
| Koszt | €0 (12-miesięczna gwarancja) |

Przykład zawiera to zgłoszenie, by zademonstrować, że **zgłoszenia konserwacji
od mieszkańców** to encje pierwszej klasy fazy eksploatacji — należą do
modelu obok roszczeń gwarancyjnych i niezgodności. W rzeczywistym budynku
takie kumulują się dziesiątkami rocznie.
