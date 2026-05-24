# Zielony Taras, styczeń 2028 — faza eksploatacji

Ten sam budynek z [przykładu projektowego Zielony Taras](/pl/przyklady/zielony-taras/),
22 miesiące po przekazaniu. Zasiedlony od marca 2026. Ten przykład pokazuje,
co model SBM niesie, gdy projekt wchodzi w fazę **`operation`**:
zmierzone wyniki testów rozruchowych, historię eksploatacji zasobów,
rzeczywiste zgłoszenia (gwarancja, konserwacja od mieszkańców, anomalie
czujników), zalecenia retro-commissioningu i powdrożeniową weryfikację
energii.

**Budynek:** [`BLD-01`](/pl/przyklady/zielony-taras-2028/budynek) — ten sam
sześciokondygnacyjny budynek mieszkalny, teraz zasiedlony. Pełny model
projektowy w [przykładzie projektowym](/pl/przyklady/zielony-taras/).

**Pozycja w cyklu życia:** `operation` — wszystkie artefakty projektowe
i wykonawcze są dziedziczone (tylko do odczytu) z modelu projektowego;
encje fazy eksploatacji to nowa warstwa.

---

## Co pokazuje ten przykład

- **Wyniki testów rozruchowych — wypełnione.** Trzy testy zaplanowane
  w modelu projektowym ([regulacja MVHR](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-MVHR-001),
  [szczelność powietrzna](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-AIRTIGHTNESS-001),
  [próbna ewakuacja](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-FIRE-DRILL-001))
  zostały wykonane. Bloki `results.measured` teraz noszą rzeczywiste liczby,
  a jeden test zakończył się **warunkowym zaliczeniem**, które uruchomiło
  wynikłe zgłoszenie niezgodności.
- **Historia eksploatacji zasobów.** [Pompa ciepła `AST-HP-01`](/pl/przyklady/zielony-taras-2028/zasoby/ai-hp-01-ops)
  zarejestrowała ~18 000 godzin pracy, miała jedną wymianę sprężarki
  w ramach gwarancji i wykazuje 7 % spadek sprawności wymagający
  zbadania. MVHR + rozdzielacz UFH podobnie noszą historię serwisową.
- **Sześć rzeczywistych zgłoszeń z fazy eksploatacji** — pokrywających
  gwarancję, konserwację od mieszkańców, anomalie czujników, retro-cx,
  roczną inspekcję pożarową i niezgodność wynikającą z testu szczelności.
- **Weryfikacja klasy energetycznej, powdrożeniowa.** Zmierzone 47 kWh/m²/rok
  wobec projektowych 45 — nadal klasa B, ale margines projektowy
  węższy niż oczekiwano.
- **Opinie mieszkańców o komforcie.** 12 z 18 mieszkań zwróciło ankietę
  IEQ z 2027 r.; ogólne zadowolenie wysokie, jedno skupisko mieszkań
  zgłasza spójny problem przegrzewania związany z elewacją południową
  latem.
- **Inwentaryzacja `SCHEMA-GAPS.md`.** Schemat v2.0 pokrywa większość
  powyższego, ale faza eksploatacji ujawnia luki, które uzasadniają
  dyskusję v2.2: telemetria czasowa jako encja pierwszej klasy, ankiety
  mieszkańców, struktura historii eksploatacji zasobów, cykl życia
  retro-cx odrębny od zgłoszeń.

## Przewodnik — co zmieniło się przez 22 miesiące

| Aspekt | Przy przekazaniu (marzec 2026) | Styczeń 2028 (teraz) | Co pokazuje |
|---|---|---|---|
| Regulacja MVHR | Zaplanowano | **Wykonano** — η 83 % wobec celu 85 %, warunkowe zaliczenie po regulacji | `commissioning_test.results.measured` wypełnione |
| Szczelność powietrzna | Zaplanowano | **Warunkowe zaliczenie** — n50 1,7 wobec celu 1,5, regulacyjne n50 ≤ 2,5 spełnione | Następcze NCR podniesione |
| Próbna ewakuacja | Zaplanowano | **Zaliczono** — 2,3 min wobec limitu 2,5 (Pathfinder przewidywał 2,1) | Symulacja projektowa vs rzeczywistość, 0,2 min różnica — w tolerancji |
| Godziny pracy pompy ciepła | 0 h | **18 420 h**, 1 wymiana sprężarki w ramach gwarancji w 14 miesiącu | Historia eksploatacji zasobu |
| Klasa energetyczna | Projektowa B (45 kWh/m²/rok) | Zmierzona B (47 kWh/m²/rok) | Weryfikacja powdrożeniowa węższa niż margines projektowy |
| Opinie mieszkańców | n/d | 12/18 mieszkań ankietowanych | Powdrożeniowa IEQ |
| Otwarte zgłoszenia | 0 | 4 z 6 wciąż otwarte (1 rozwiązane, 1 zamknięte z zaleceniem) | Cykl życia zgłoszeń z fazy eksploatacji |

## Nawigacja

| Obszar | Zacznij tu |
|------|-----------|
| Budynek i kontekst | [`BLD-01` (faza eksploatacji)](/pl/przyklady/zielony-taras-2028/budynek) · [Poziom 04 (najwięcej zgłoszeń ops)](/pl/przyklady/zielony-taras-2028/poziomy/poziom-04) |
| Zasoby eksploatacyjne | [Zapis eksploatacji pompy ciepła](/pl/przyklady/zielony-taras-2028/zasoby/ai-hp-01-ops) · [MVHR](/pl/przyklady/zielony-taras-2028/zasoby/ai-mvhr-01-ops) · [Rozdzielacz UFH](/pl/przyklady/zielony-taras-2028/zasoby/ai-ufh-manifold-01-ops) |
| Wyniki rozruchu | [MVHR — wykonano](/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-MVHR-001) · [Szczelność — warunkowe zaliczenie](/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-AIRTIGHTNESS-001) · [Próbna ewakuacja — zaliczono](/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-FIRE-DRILL-001) |
| Zgłoszenia z fazy eksploatacji | [Gwarancja pompy ciepła](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-WARRANTY-HP-001) · [Zgłoszenie mieszkańca](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-TENANT-MR-001) · [Anomalia CO₂](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-ANOMALY-CO2-001) · [Retro-cx](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-RETROCX-MVHR-001) · [Inspekcja pożarowa](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-INSPECTION-FD-001) · [NCR szczelności](/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-NC-AIRTIGHTNESS-001) |
| Raporty powdrożeniowe | [Weryfikacja energetyczna 2027](/pl/przyklady/zielony-taras-2028/weryfikacja-energetyczna) · [Ankieta IEQ mieszkańców](/pl/przyklady/zielony-taras-2028/podsumowanie-ankiety-mieszkancow) |
| Dla standardu v2.2 | [Luki schematu ujawnione przez ten przykład](/pl/przyklady/zielony-taras-2028/SCHEMA-GAPS) |

## Dlaczego to osobny przykład (a nie aktualizacja w miejscu)

[Projektowy Zielony Taras](/pl/przyklady/zielony-taras/) to artefakt
dydaktyczny utrzymany w fazie `construction_documents`. Awansowanie go
w miejscu do `operation` zniszczyłoby ten artefakt. Obok siebie oba przykłady
odpowiadają na różne pytania:

- **zielony-taras/** — "Jak wygląda model SBM na końcu projektu?"
- **zielony-taras-2028/** — "Jak wygląda po 22 miesiącach eksploatacji?"

Ten sam budynek, dwa zrzuty, dwie fazy. Rzeczywiste projekty gromadzą oba —
model SBM jest trwałym nośnikiem całego cyklu życia.

## Uwagi o danych

Ten przykład jest **syntetyczny, ale ugruntowany** — zmierzone liczby
są wiarygodne dla mieszkaniowego budynku z MVHR + pompą ciepła w warszawskim
klimacie, a zgłoszenia to rodzaje rzeczy, które naprawdę zdarzają się
w pierwszych dwóch latach po przekazaniu. Wszystkie nazwy + organizacje
pasują do przykładu projektowego.

Telemetria czujników i odpowiedzi ankietowe są reprezentowane jako
**podsumowania narracyjne z referencjami do plików zewnętrznych**
(eksportów CSV); schemat SBM v2.0 nie ma jeszcze encji pierwszej klasy
dla szeregów czasowych ani opinii mieszkańców. Patrz [SCHEMA-GAPS](/pl/przyklady/zielony-taras-2028/SCHEMA-GAPS)
dla proponowanych kształtów v2.2.
