# Ankieta IEQ mieszkańców 2027 — Zielony Taras

Nie-encyjny dokument narracyjny podsumowujący Ankietę Jakości Środowiska
Wewnętrznego 2027 zwróconą przez 12 z 18 mieszkań (67 % wskaźnik odpowiedzi).

> **Luka schematu.** SBM v2.0 nie ma jeszcze encji pierwszej klasy dla
> *opinii mieszkańców / ankiet IEQ*. Najbliższe dopasowanie to rozszerzenie
> `commissioning_test` o wariant ankiety, lub wprowadzenie nowej encji
> `occupant_survey`. Patrz [SCHEMA-GAPS](./SCHEMA-GAPS) §3 dla proponowanego
> kształtu.

## Wyniki nagłówkowe (n = 12 z 18 mieszkań)

| Wymiar | Średnia ocena (1-5) | % zadowolonych (≥ 4) | Uwagi |
|---|---|---|---|
| Ogólne zadowolenie z mieszkania | 4,3 | 92 % | Wysokie |
| Komfort termiczny, zima | 4,4 | 92 % | Wysoki |
| Komfort termiczny, lato | 3,7 | 67 % | **Oznaczone** — mieszkania od południa się przegrzewają |
| Jakość powietrza wewnętrznego | 4,0 | 75 % | Ogólnie dobra; mieszkanie 4.02 zgłasza "duszność" |
| Prywatność akustyczna | 4,5 | 92 % | Projektowa Klasa B opłaca się |
| Światło dzienne | 4,6 | 100 % | Najlepiej oceniany wymiar |
| Oświetlenie (sztuczne) | 4,3 | 92 % | Strefy wspólne dobrze ocenione |

## Oznaczone obawy (dosłownie, zanonimizowane)

1. **"Sypialnia robi się duszna w nocy, szczególnie latem"** — mieszkanie 4.02
   (korroboruje [anomalię czujnika CO₂](./zgloszenia/ISS-ANOMALY-CO2-001))
2. **"Lato jest za ciepłe — temperatura popołudniowa sięga 26-27 °C"** —
   mieszkania 4.01, 4.02, 4.03 (od południa Poziomu 04)
3. **"Pompa ciepła wydaje hałas przy uruchamianiu"** — mieszkanie 3.04
   (po wymianie gwarancyjnej; spójne z [ISS-WARRANTY-HP-001](./zgloszenia/ISS-WARRANTY-HP-001))

## Co zostało wykonane

- Opinia o CO₂ + dusznym powietrzu wywołała [zgłoszenie retro-cx](./zgloszenia/ISS-RETROCX-MVHR-001) — MVHR zrebalansowane 2027-08-30.
- Opinia o letnim przegrzewaniu wywołała studium (zlecone 2027-10) możliwej modernizacji zewnętrznego zacienienia. Studium trwa.
- Opinia o hałasie pompy ciepła była śledzona pod istniejącym zgłoszeniem gwarancyjnym; nie nowa akcja.

## Co jeszcze nie (jeszcze)

- Skupisko letniego przegrzewania na Poziomie 04 może wymagać albo zewnętrznego zacienienia (koszt kapitałowy), albo regulacji operacyjnej (wolne chłodzenie przez nocne przewietrzanie — wymaga zmiany sterowania). Brak decyzji.

## Metoda

- Ankieta papierowa + online, dystrybuowana 2027-09-01, data zamknięcia 2027-10-15
- 5-punktowa skala Likerta na 12 wymiarach, plus tekst wolny "największa obawa"
- Przeprowadzona przez niezależnego FM (GreenFM) — brak oferowanej zachęty

## Dane referencyjne

Podstawowe zanonimizowane odpowiedzi: `surveys/BLD-01-IEQ-2027-responses.csv`
(plik zewnętrzny; nie część modelu SBM).

## Metadane dokumentu

| Pole | Wartość |
|---|---|
| Okres ankiety | 2027-09-01 → 2027-10-15 |
| Przygotował | GreenFM Sp. z o.o. |
| Przejrzała | Anna Nowak (Architekt odpowiedzialny) |
| Wydany | 2027-11-30 |
| Status | Końcowy |
