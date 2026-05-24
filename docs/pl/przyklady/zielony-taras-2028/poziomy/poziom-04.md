---
entityType: "level"
id: "LVL-04"
version: "2.1.0"
projectPhase: "operation"

levelName: "Poziom 04 — czwarta kondygnacja"
levelNumber: 4
elevation: 12.20
buildingId: "BLD-01"

typicalCeilingHeight: 2.70
unit: "m"

operationalNotes: |
  Poziom 04 jest źródłem ponad połowy zgłoszeń z fazy eksploatacji
  do tej pory: mieszkania od południa (4.01, 4.02, 4.03) zgłaszają
  przegrzewanie latem, roszczenie gwarancyjne pompy ciepła pochodziło
  ze strefy Poziomu 04, a anomalia CO2 jest w Sypialni 01 mieszkania 4.02.
  Czy to problem Poziomu 04, czy efekt "wierzchołka stosu" (Poziom 05
  ma dach zielony), pozostaje przedmiotem badania.

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Poziom 04 w fazie eksploatacji — dodano, by dać przykładowi eksploatacji kontekst kondygnacji, w której skupiają się zgłoszenia"
---

# Poziom 04 — faza eksploatacji

Poziom 04 niesie większość zgłoszeń z fazy eksploatacji w tym przykładzie.
Pełny model projektowy kondygnacji w [Poziomie 01 z fazy projektowej](/pl/przyklady/zielony-taras/poziomy/poziom-01)
(LVL-04 jest identyczny w projekcie — różni się tylko kontekst eksploatacyjny).

## Dlaczego akurat Poziom 04

Ankieta IEQ z lata 2027 zwróciła skupisko skarg na przegrzewanie z mieszkań
od południa na tym piętrze. Anomalia czujnika CO₂ jest w mieszkaniu 4.02
tego piętra. Roszczenie gwarancyjne pompy ciepła pochodziło z centrali
obsługującej Poziom 04. Czy to "problem Poziomu 04", czy efekt
"wierzchołka stosu" z dachem zielonym Poziomu 05 działającym jako masa
termiczna — na to pytanie odpowiada zgłoszenie retro-commissioning
tego przykładu ([`ISS-RETROCX-MVHR-001`](../zgloszenia/ISS-RETROCX-MVHR-001)).
