---
title: Jakość środowiska wewnętrznego
description: Wymagania dotyczące oświetlenia dziennego, wentylacji, komfortu cieplnego i akustyki w dokumentacji projektowej wg WT 2021 — mapowanie na karty Pomieszczeń i Stref.
---

# Jakość środowiska wewnętrznego

Jakość środowiska wewnętrznego (IEQ) obejmuje cztery obszary bezpośrednio wpływające na zdrowie, komfort i wydajność użytkowników: **światło dzienne**, **wentylację**, **komfort cieplny** i **akustykę**. Polskie przepisy — przede wszystkim [WT 2021](/pl/przepisy/wt-2021) — określają minimalne wymagania dla każdego z tych obszarów. Na tej stronie znajdziesz wskazówki, jak dokumentować te wymagania w kartach Pomieszczeń i Stref.

## Światło dzienne

### Wymagania wg [WT 2021](/pl/przepisy/wt-2021)

Podstawowe wymaganie dotyczące oświetlenia dziennego w polskich przepisach:

- **Minimalny stosunek powierzchni okien do powierzchni podłogi: 1:8** — powierzchnia oszklona w pomieszczeniu przeznaczonym na pobyt ludzi musi wynosić co najmniej 1/8 powierzchni podłogi.
- Stosunek odnosi się do **powierzchni przepuszczającej światło** (szkło, bez ramy), choć w praktyce stosuje się powierzchnię otworu okiennego z odpowiednim współczynnikiem korekcyjnym.

### Współczynnik oświetlenia dziennego (DF)

Oprócz prostego stosunku powierzchni, dobrą praktyką jest weryfikacja **współczynnika światła dziennego (DF)** — stosunku natężenia oświetlenia wewnątrz do natężenia na zewnątrz przy zachmurzonym niebie.

| Typ pomieszczenia | Minimalny DF (zalecany) | Docelowy DF (dobra praktyka) |
|---|---|---|
| Pokój dzienny | 1,0% | 2,0% |
| Sypialnia | 0,5% | 1,5% |
| Kuchnia | 1,0% | 2,0% |
| Sala lekcyjna | 2,0% | 3,0% |
| Biuro — ogólne | 2,0% | 3,0% |
| Biuro — głębokie (> 6 m) | 1,5% | 2,5% |
| Sala szpitalna | 1,0% | 2,0% |

::: info
Współczynnik DF to miara statyczna. Pełniejszy obraz daje modelowanie oparte na danych klimatycznych (CBDM), uwzględniające orientację i zmienność sezonową. CBDM jest wymagane przy certyfikacji BREEAM i LEED. Wyniki symulacji oświetlenia zapisuj w karcie Pomieszczenia.
:::

### Dokumentowanie w karcie Pomieszczenia

Dla każdego pomieszczenia przeznaczonego na pobyt ludzi zapisz:

1. Powierzchnię okien i podłogi (z obliczeniem stosunku)
2. Orientację okien i ewentualne przesłanianie przez sąsiednią zabudowę
3. Obliczony współczynnik DF (w projektach z symulacją)
4. Ocenę olśnienia dla przeszkleń od strony południowej i zachodniej
5. Strategię zacieniania (zewnętrzne żaluzje, markizy, szklenie selektywne)

## Wentylacja

### Wentylacja naturalna vs mechaniczna

| Cecha | Wentylacja grawitacyjna | Wentylacja mechaniczna |
|---|---|---|
| Siła napędowa | Różnica temperatur, wiatr | Wentylatory |
| Dopływ powietrza | Nawiewniki okienne, mikrowentylacja | Kanały z filtracją |
| Odzysk ciepła | Niemożliwy | Sprawność 70–90% (wymiennik) |
| Sterowanie | Ograniczone (pogoda) | Precyzyjne (czujniki, automatyka) |
| Filtracja | Brak | Klasa filtrów M5–F7 |
| Status w WT 2021 | Dopuszczalna (budynki mieszkalne) | Wymagana, gdy grawitacyjna niewystarczająca |

::: warning
Wentylacja grawitacyjna wymaga odpowiedniej wysokości kanałów. W budynkach poniżej 3 kondygnacji może nie zapewniać dostatecznego przepływu latem. Udokumentuj obliczenia potwierdzające zgodność w warunkach najmniej korzystnych. Monitoring CO₂ ([czujniki IoT](/pl/integracja-bim/czujniki-iot)) pozwala weryfikować skuteczność wentylacji w fazie [eksploatacji](/pl/eksploatacja/).
:::

### Minimalne wydajności wentylacji

| Typ pomieszczenia | Wydajność wywiewu / nawiewu | Krotność wymiany (wym./h) | Uwagi |
|---|---|---|---|
| Kuchnia (kuchenka gazowa) | 70 m³/h | — | Ciągle lub z okresowym zwiększeniem |
| Kuchnia (kuchenka elektryczna) | 50 m³/h | — | Ciągle lub z okresowym zwiększeniem |
| Łazienka (z WC) | 50 m³/h | — | Praca ciągła |
| Oddzielne WC | 30 m³/h | — | Ciągle lub okresowo |
| Pokój dzienny / sypialnia | 20 m³/h na osobę | min. 0,5 | Powietrze nawiewane |
| Biuro — na osobę | 30 m³/h na osobę | — | Wg PN-EN 16798-1, Kategoria II |
| Sala lekcyjna | 20–30 m³/h na osobę | min. 4,0 | Wysoka gęstość użytkowania |
| Sala konferencyjna | 30 m³/h na osobę | min. 5,0 | Szczytowe obciążenie |

### Monitoring CO₂

Stężenie CO₂ to najprostszy wskaźnik jakości powietrza wewnętrznego. Zapisuj progi alarmowe w kartach Stref:

| Kategoria (EN 16798-1) | Stężenie CO₂ ponad poziom zewnętrzny | Zastosowanie |
|---|---|---|
| Kategoria I | ≤ 550 ppm | Szpitale, żłobki |
| Kategoria II | ≤ 800 ppm | Biura, szkoły, mieszkania |
| Kategoria III | ≤ 1350 ppm | Obiekty tymczasowe |

## Komfort cieplny

### Zakresy temperatury operacyjnej

Dla budynków klimatyzowanych stosuj stałe nastawy; dla budynków wentylowanych naturalnie — model adaptacyjny (EN 16798-1):

| Sezon | Nastawa ogrzewania | Nastawa chłodzenia | Swobodny bieg |
|---|---|---|---|
| Zima | 20–22°C | — | — |
| Lato | — | 24–26°C | — |
| Okres przejściowy | — | — | 20–24°C |

| Kategoria komfortu | Dopuszczalny zakres | Zastosowanie |
|---|---|---|
| Kategoria I (wysokie oczekiwania) | ±2°C od optymalnej | Szpitale, domy opieki |
| Kategoria II (normalne) | ±3°C od optymalnej | Biura, szkoły, mieszkania |
| Kategoria III (umiarkowane) | ±4°C od optymalnej | Obiekty tymczasowe |

### Ryzyko przegrzewania

Przegrzewanie to narastający problem w dobrze izolowanych budynkach z dużymi przeszkleniami. Dokumentuj strategię zapobiegania w karcie Pomieszczenia lub Strefy:

- **Zacienianie zewnętrzne** — najskuteczniejsze; ogranicza zyski solarne przed wejściem do budynku
- **Specyfikacja szyb** — współczynnik g poniżej 0,35 dla elewacji S i W
- **Wentylacja nocna** — odprowadzanie ciepła z masy termicznej
- **Orientacja przeszkleń** — ograniczenie przeszkleń od zachodu

::: tip
WT 2021 nie określa wprost limitów przegrzewania, ale nowelizacja EPBD i certyfikacje (BREEAM, LEED) coraz częściej wymagają oceny ryzyka przegrzania. Udokumentuj strategię już teraz — budynek będzie eksploatowany przez dekady.
:::

## Izolacyjność akustyczna

### Klasy akustyczne wg [WT 2021](/pl/przepisy/wt-2021)

Wymagania akustyczne wyrażone są przez odwołanie do normy PN-B-02151:

| Parametr | Mieszkalny (między lokalami) | Biurowy | Sala lekcyjna |
|---|---|---|---|
| Izolacyjność od dźwięków powietrznych R'w | ≥ 50 dB | ≥ 45 dB | ≥ 50 dB |
| Poziom uderzeniowy L'n,w | ≤ 58 dB | ≤ 58 dB | ≤ 55 dB |
| Izolacyjność elewacji R'A,2 | Wg strefy hałasu | Wg strefy hałasu | Wg strefy hałasu |
| Czas pogłosu T | — | ≤ 0,8 s (open space) | ≤ 0,6 s |
| Hałas tła LA,eq | ≤ 30 dB(A) noc | ≤ 40 dB(A) | ≤ 35 dB(A) |

### Dopuszczalne poziomy hałasu wg poziomu hałasu zewnętrznego

| Hałas zewnętrzny przy elewacji | Wymagane R'A,2 elewacji (mieszkalny) |
|---|---|
| ≤ 55 dB(A) | ≥ 20 dB |
| 56–60 dB(A) | ≥ 25 dB |
| 61–65 dB(A) | ≥ 30 dB |
| 66–70 dB(A) | ≥ 33 dB |
| 71–75 dB(A) | ≥ 35 dB |
| > 75 dB(A) | Indywidualna ocena akustyczna |

## Mapowanie wymagań IEQ na karty Pomieszczeń i Stref

Parametry IEQ zapisuj w odpowiednim typie karty:

| Parametr | Typ karty | Pole YAML | Uwagi |
|---|---|---|---|
| Stosunek okien do podłogi | Pomieszczenie | `ieq.swiatlo.stosunek_okien` | Obliczenie dla każdego pomieszczenia |
| Współczynnik DF | Pomieszczenie | `ieq.swiatlo.df` | Z symulacji lub obliczeń |
| Wydajność wentylacji (m³/h) | Pomieszczenie | `ieq.wentylacja.wydajnosc` | Na osobę lub na pomieszczenie |
| Krotność wymiany powietrza | Strefa | `ieq.wentylacja.krotnosc` | Na poziomie strefy wentylacyjnej |
| Próg CO₂ | Strefa | `ieq.wentylacja.co2_max` | Kategoria EN 16798-1 |
| Zakres temperatury | Pomieszczenie / Strefa | `ieq.komfort.temp_min`, `temp_max` | Sezonowo |
| Klasa akustyczna R'w | Strefa | `ieq.akustyka.rw` | Między strefami |
| Hałas tła | Pomieszczenie | `ieq.akustyka.halas_tla_max` | dB(A) |

## Zestawienie wymagań wg typu pomieszczenia

| Typ pomieszczenia | DF min | Wentylacja (m³/h) | Temp. (°C) | R'w (dB) | Hałas tła dB(A) |
|---|---|---|---|---|---|
| Pokój dzienny | 1,0% | 20/osobę | 20–26 | ≥ 50 | 35 |
| Sypialnia | 0,5% | 20/osobę | 18–26 | ≥ 50 | 25 (noc) |
| Kuchnia | 1,0% | 50–70 | 18–26 | ≥ 50 | 40 |
| Łazienka | — | 50 | 24–28 | ≥ 50 | 40 |
| Biuro | 2,0% | 30/osobę | 20–26 | ≥ 45 | 40 |
| Sala lekcyjna | 2,0% | 20–30/osobę | 20–26 | ≥ 50 | 35 |
| Sala szpitalna | 1,0% | 40/osobę | 22–26 | ≥ 50 | 30 |
| Korytarz | — | bez wymagań | 16–22 | ≥ 45 | 45 |
| Sala konferencyjna | 1,5% | 30/osobę | 20–26 | ≥ 45 | 35 |

::: tip
Parametry IEQ oddziałują na siebie wzajemnie i na efektywność energetyczną. Duże okna poprawiają doświetlenie, ale mogą powodować przegrzewanie i osłabiać akustykę. Dokumentuj kompromisy i uzasadnienia decyzji projektowych w karcie Pomieszczenia. Więcej o integracji danych IEQ z modelem budynku — w sekcji [Integracja BIM](/pl/integracja-bim/).
:::

## Lista kontrolna: dokumentacja IEQ wg fazy

### [Koncepcja](/pl/fazy/koncepcja)
- [ ] Cele IEQ zapisane w założeniach (kategoria komfortu, strategia wentylacji)
- [ ] Wstępna analiza orientacji budynku pod kątem doświetlenia

### [Projekt wstępny](/pl/fazy/wstepny)
- [ ] Stosunek okien do podłogi obliczony dla pomieszczeń na pobyt ludzi
- [ ] Koncepcja wentylacji (grawitacyjna / mechaniczna) z uzasadnieniem
- [ ] Strefowanie akustyczne — identyfikacja stref wymagających podwyższonej izolacji

### [Projekt budowlany](/pl/fazy/budowlany)
- [ ] Symulacja oświetlenia dziennego (DF) dla kluczowych pomieszczeń
- [ ] Obliczenia wentylacji z wydajnościami dla każdego pomieszczenia
- [ ] Analiza komfortu cieplnego z oceną ryzyka przegrzewania
- [ ] Specyfikacja akustyczna przegród wewnętrznych (R'w, L'n,w)
- [ ] Karty Pomieszczeń uzupełnione o parametry IEQ

### [Projekt wykonawczy](/pl/fazy/wykonawczy)
- [ ] Specyfikacja przeszkleń (U, g, Rw) w kartach Urządzeń
- [ ] Szczegółowa specyfikacja instalacji wentylacyjnej w kartach Instalacji
- [ ] Detale przegród akustycznych z obliczeniami

### [Przekazanie](/pl/fazy/przekazanie)
- [ ] Pomiary akustyczne przegród (protokoły R'w, L'n,w)
- [ ] Badanie szczelności powietrznej (test blower door)
- [ ] Plan monitoringu IEQ w [fazie eksploatacji](/pl/eksploatacja/) — [czujniki IoT](/pl/integracja-bim/czujniki-iot) (CO₂, temperatura, wilgotność)
- [ ] [Bramka fazowa](/pl/jakosc/bramki-fazowe) — potwierdzenie zgodności z wymaganiami IEQ
