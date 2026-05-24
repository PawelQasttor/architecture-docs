# Powdrożeniowa weryfikacja energetyczna — Zielony Taras, rok 2027

Nie-encyjny dokument narracyjny podsumowujący roczną weryfikację energetyczną
2027 dla Zielonego Tarasu. Owija referencję do zewnętrznego CSV z danymi
licznikowymi.

> **Luka schematu.** SBM v2.0 nie ma jeszcze encji pierwszej klasy dla
> *weryfikacji energetycznej w użyciu* (odrębnej od projektowej symulacji
> energetycznej). Najbliższe dopasowanie to rozszerzenie encji
> `commissioning_test` o wariant roczny, lub wprowadzenie nowej encji
> `energy_verification_record`. Patrz [SCHEMA-GAPS](./SCHEMA-GAPS) §4
> dla proponowanego kształtu.

## Wynik nagłówkowy

| Metryka | Cel projektowy | Zmierzone 2027 | Status |
|---|---|---|---|
| Roczne zapotrzebowanie na ogrzewanie | 45 kWh/(m²·rok) | **47 kWh/(m²·rok)** | Klasa B potwierdzona; margines projektowy węższy niż oczekiwano |
| Roczne zapotrzebowanie na chłodzenie | 15 kWh/(m²·rok) | 13 kWh/(m²·rok) | Lepiej niż projektowo |
| Energia pierwotna | 85 kWh/(m²·rok) | 88 kWh/(m²·rok) | W paśmie Klasy B |
| Klasa energetyczna | B | **B (potwierdzona)** | Zaliczone |
| Generacja odnawialna | 15 kWh/(m²·rok) | 14 kWh/(m²·rok) | Lekko poniżej projektowej |
| Zużycie energii netto | 65 kWh/(m²·rok) | 70 kWh/(m²·rok) | W paśmie Klasy B |

## Metoda

- **Zmierzona energia**: pełny rok danych rozliczeniowych ciepła miejskiego (sty-gru 2027) + danych rozliczeniowych elektrycznych
- **Znormalizowana** dla rzeczywistych liczb mieszkańców, rzeczywistych temperatur zewnętrznych, rzeczywistego zużycia ciepłej wody
- **Porównana** z projektowym wynikiem symulacji EnergyPlus 45 kWh/(m²·rok)

## Dlaczego wynik jest 2 kWh/m²/rok powyżej projektowego

Trzy czynniki w przybliżeniu w równym stopniu:

1. **Spadek COP pompy ciepła** — zmierzona średnia COP 3,4 vs projektowa 3,6 (patrz [AST-HP-01](./zasoby/ai-hp-01-ops))
2. **Spadek odzysku ciepła MVHR** — zmierzony 83 % vs projektowy 85 % (patrz [AST-MVHR-01](./zasoby/ai-mvhr-01-ops))
3. **Poślizg szczelności powietrznej** — zmierzony n50 1,7 vs projektowy 1,5 (patrz [CT-AIRTIGHTNESS](./testy-rozruchowe/CT-AIRTIGHTNESS-001))

Żaden samodzielnie nie jest alarmujący; kumulatywny efekt to dokładnie
obserwowany przekraczanie 2 kWh/m²/rok. Otwarte prace nad wszystkimi
trzema są śledzone przez zgłoszenia fazy eksploatacji (patrz [indeks](./)).

## Dane referencyjne

Podstawowe dane licznikowe: `telemetry/BLD-01-energy-meters-2027-annual.csv`
(plik zewnętrzny; nie część modelu SBM).

## Metadane dokumentu

| Pole | Wartość |
|---|---|
| Okres | 2027-01-01 → 2027-12-31 |
| Przygotował | Jan Wiśniewski (Projektant MEP odpowiedzialny) |
| Przejrzeli | Anna Nowak (Architekt odpowiedzialny) + GreenFM |
| Wydany | 2028-02-10 |
| Status | Końcowy |
