---
entityType: "issue"
id: "ISS-INSPECTION-FD-001"
version: "2.1.0"
projectPhase: "operation"

issueTitle: "Roczna inspekcja pożarowa — degradacja uszczelki obwodowej drzwi pożarowych Poziomu 02"
issueType: "inspection"
issueNumber: "INSP-2027-04"
status: "responded"
priority: "high"

description: |
  Roczna inspekcja pożarowa przeprowadzona przez Komendę Miejską PSP Warszawa
  Stacja 12 dnia 2027-11-15 zidentyfikowała zużycie uszczelki obwodowej
  na drzwiach pożarowych EI 30 przy wejściu do klatki schodowej Poziomu 02
  (drzwi OPN-DOOR-STAIR-02). Ściśliwość uszczelki zmierzona na 40 %
  wartości jak-zamontowanej, obniżając efektywną odporność ogniową drzwi
  z EI 30 do szacowanych EI 20 (poniżej minimum regulacyjnego).

  Zamienna uszczelka zamówiona + zainstalowana w ciągu 14 dni;
  re-inspekcja zaplanowana w celu potwierdzenia przywrócenia do EI 30.

buildingId: "BLD-01"
relatedEntityIds:
  - "OPN-DOOR-STAIR-01"
  - "VC-STAIR-A"
  - "CR-FIRE-EGRESS-L01"

initiatedBy:
  name: "Kapitan Krzysztof Borowski"
  organization: "Komenda Miejska PSP Warszawa — Stacja 12"
  role: "inspektor regulacyjny"
  date: "2027-11-15"
assignedTo:
  name: "GreenFM Sp. z o.o."
  organization: "Wykonawca FM"
  role: "remediacja"
dueDate: "2027-11-29"
responseDate: "2027-11-28"

response:
  respondedBy: "GreenFM Sp. z o.o."
  responseDate: "2027-11-28"
  responseText: |
    Zamienny zestaw uszczelki obwodowej EI 30 zamówiony od oryginalnego
    producenta drzwi 2027-11-16. Zainstalowany 2027-11-26. Ściśliwość
    uszczelki ponownie zmierzona po montażu: wartość nominalna jak-zamontowana.
    Re-inspekcja przez KM PSP Warszawa zaplanowana 2027-12-10.

costImpact:
  estimatedDeltaEur: 320
  appliesTo: "operations_budget"

scheduleImpact:
  estimatedDelayDays: 0
  notes: "Rozwiązane w regulacyjnym oknie remediacji 14 dni."

tags:
  - "operation-phase-example"
  - "inspekcja-regulacyjna"
  - "krytyczne-bezpieczeństwo"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Wynik rocznej inspekcji pożarowej — zużycie uszczelki, wymieniona w oknie regulacyjnym. Demonstruje cykl regularnych inspekcji."
---

# Zgłoszenie — Roczna inspekcja pożarowa, degradacja uszczelki drzwi pożarowych (ISS-INSPECTION-FD-001)

**Inspekcja regulacyjna**. Roczna inspekcja straży pożarnej znalazła
degradację komponentu, która, choć niekatastroficzna, zawiodłaby test
ognia. Wyremediowano w regulacyjnym oknie 14 dni.

| Pole | Wartość |
|---|---|
| Typ | Inspekcja (regulacyjna) |
| Status | Odpowiedziano (re-inspekcja zaplanowana) |
| Zgłoszono | 2027-11-15 (KM PSP Warszawa) |
| Rozwiązano | 2027-11-28 |
| Koszt | €320 (zestaw uszczelki + robocizna) |

## Co pokazuje to zgłoszenie

Modele fazy eksploatacji muszą uchwycić **zdarzenia inspekcji regulacyjnej**,
nie tylko odkryte defekty. Roczna inspekcja pożarowa to *zaplanowane*
zdarzenie, które może lub nie wygenerować wyników; to wygenerowało.
Zgłoszenie referuje zarówno do dotkniętego otworu, jak i do drogi cyrkulacji
upstream — więc zapytanie "jakie zgłoszenia kiedykolwiek wpływały na naszą
główną drogę ewakuacji pożarowej?" zwraca ten zapis.
