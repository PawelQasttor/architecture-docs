---
entityType: "issue"
id: "ISS-RFI-001"
version: "2.1.0"
projectPhase: "construction"

issueTitle: "RFI 001 — krawędź stropu na attyce tarasu zielonego Poziom 05"
issueType: "rfi"
issueNumber: "RFI-001"
status: "responded"
priority: "high"

description: |
  Podczas montażu szalunków na Poziomie 05 (kondygnacja tarasu zielonego)
  wykonawca szalunków zidentyfikował, że dokumentacja wykonawcza pokazuje
  attykę krawędzi stropu o wysokości 300 mm (Detal 12/A-503), natomiast
  rysunki konstrukcyjne pokazują 250 mm (Detal S-403). Rozbieżność wpływa
  na zestawienie zbrojenia i detal odwodnienia dachu zielonego. Budowa
  obecnie wstrzymana na betonowaniu attyki w oczekiwaniu na wyjaśnienie.

buildingId: "BLD-01"
constructionPackageId: "CP-STRUCTURE"
relatedEntityIds:
  - "STR-GREEN-TERRACE"
  - "ENV-EW-01"

initiatedBy:
  name: "Marek Nowicki"
  organization: "Budimex S.A. (generalny wykonawca)"
  role: "Inżynier kontraktu"
  date: "2026-04-22"
assignedTo:
  name: "Anna Nowak"
  organization: "Nowak Architecture"
  role: "Architekt odpowiedzialny"
dueDate: "2026-04-25"
responseDate: "2026-04-24"

response:
  respondedBy: "Anna Nowak (architektura) + Piotr Kowalski (konstrukcja)"
  responseDate: "2026-04-24"
  responseText: |
    Prawidłowa wysokość attyki to 300 mm, zgodnie z detalem architektonicznym.
    Rysunek konstrukcyjny S-403 zostanie zrewidowany (data wydania 2026-04-26).
    Uzasadnienie: wysokość 300 mm wymuszona przez warstwy odwodnienia dachu
    zielonego (75 mm drenaż + 150 mm substrat + 75 mm zapas ponad warstwą
    wegetacyjną) — jest wymiarowo zdeterminowana i nie może być obniżona.
    Kontynuować szalowanie i zbrojenie do 300 mm. Wpływ kosztowy i harmonogramowy
    oceniony jako zerowy (szalunki jeszcze nie zdjęte; zestawienie zbrojenia
    zrewidowane przed produkcją prętów).
  attachments:
    - "RFI-001-Odpowiedz-Szkic.pdf"
    - "S-403-Rew-B.pdf"

costImpact:
  estimatedDeltaEur: 0
  appliesTo: "structural_subcontract"
  notes: "Brak dodatkowych kosztów — zmiana zbrojenia wchłonięta przez biuro detalujące."

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Rozwiązane w ciągu 48 h; brak wpływu na ścieżkę krytyczną."

sources:
  - id: "SRC-ISS-RFI-001-01"
    title: "Zielony Taras — RFI 001"
    type: "other"
    documentType: "rfi"
    date: "2026-04-22"
    author: "Budimex S.A."

tags:
  - "artefakt-fazy-budowy"

notes: |
  Demonstruje wartość koordynacji międzybranżowej w fazie odkrywania
  dokumentacji w przykładzie: wykonawca zgłosił niezgodność, którą
  projektanci przeoczyli, a odpowiedź referuje zarówno do encji
  architektonicznej, jak i konstrukcyjnej, aby federacja BIM mogła być
  zaktualizowana spójnie.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — pierwsze RFI z fazy budowy"
---

# Zgłoszenie — RFI 001: wysokość attyki krawędzi stropu (ISS-RFI-001)

**Zapytanie o informację z fazy budowy**. Wykonawca zidentyfikował
niezgodność między detalami architektonicznymi i konstrukcyjnymi.
Rozwiązane w 48 godzin bez wpływu kosztowego ani harmonogramowego.

| Pole | Wartość |
|---|---|
| Typ | RFI |
| Numer | RFI-001 |
| Status | Odpowiedziano |
| Zgłoszono | 2026-04-22 (inżynier kontraktu Budimex) |
| Odpowiedziano | 2026-04-24 |
| Wpływ kosztowy | €0 |
| Wpływ harmonogramowy | 0 dni |

## Powiązane

- [System konstrukcyjny `STR-GREEN-TERRACE`](../systemy-konstrukcyjne/STR-GREEN-TERRACE)
- [Przegroda `ENV-EW-01`](../przegroda-sciana-zewnetrzna-typ-a)
- [Pakiet wykonawczy `CP-STRUCTURE`](../pakiety-budowlane/cp-konstrukcja)
