---
title: Zarządzanie ryzykiem
description: Rejestr ryzyk, macierz oceny, strategie łagodzenia i monitorowanie ryzyk w polskich projektach architektonicznych.
---

# Zarządzanie ryzykiem

Każdy projekt architektoniczny niesie ze sobą ryzyka --- od opóźnień administracyjnych, przez nieprzewidziane warunki gruntowe, po zmiany w przepisach. Zarządzanie ryzykiem w standardzie SP-BLD to systematyczny proces identyfikacji, oceny i łagodzenia zagrożeń, powiązany z dokumentacją projektową i [bramkami fazowymi](/pl/jakosc/bramki-fazowe).

## Typowe ryzyka polskich projektów architektonicznych

| ID | Ryzyko | Opis | Typowa faza |
|---|---|---|---|
| R-01 | **Opóźnienie pozwolenia na budowę** | Przedłużająca się procedura administracyjna, wezwania do uzupełnienia dokumentacji | [Projekt budowlany](/pl/fazy/budowlany) |
| R-02 | **Przekroczenie budżetu** | Wzrost cen materiałów, niedoszacowanie kosztów, zmiany inwestora | Wszystkie fazy |
| R-03 | **Niekorzystne warunki gruntowe** | Wysoki poziom wód gruntowych, słaba nośność, zanieczyszczenia | [Koncepcja](/pl/fazy/koncepcja), [Budowa](/pl/fazy/budowa) |
| R-04 | **Spory z wykonawcą** | Różnice interpretacyjne dokumentacji, roszczenia finansowe | [Budowa](/pl/fazy/budowa) |
| R-05 | **Zmiany w przepisach** | Nowelizacja Warunków Technicznych, zmiana norm | Wszystkie fazy |
| R-06 | **Ograniczenia MPZP** | Niezgodność zamierzenia z planem miejscowym, konieczność uzyskania WZ | [Rozpoczęcie](/pl/fazy/rozpoczecie), [Koncepcja](/pl/fazy/koncepcja) |
| R-07 | **Kolizje międzybranżowe** | Niespójności między branżami wykryte zbyt późno | [Projekt wykonawczy](/pl/fazy/wykonawczy) |
| R-08 | **Opóźnienia uzgodnień gestorów** | Przedłużające się warunki przyłączenia do sieci | [Projekt budowlany](/pl/fazy/budowlany) |
| R-09 | **Zmiana zakresu przez inwestora** | Rozszerzenie programu funkcjonalnego w trakcie projektowania | [Projekt wstępny](/pl/fazy/wstepny), [Projekt wykonawczy](/pl/fazy/wykonawczy) |
| R-10 | **Utrata kluczowego członka zespołu** | Odejście głównego projektanta w trakcie projektu | Wszystkie fazy |
| R-11 | **Wymagania konserwatora zabytków** | Nieprzewidziane ograniczenia przy obiektach w strefie ochrony | [Koncepcja](/pl/fazy/koncepcja), [Projekt budowlany](/pl/fazy/budowlany) |
| R-12 | **Błędy w dokumentacji** | Niespójności między rysunkami a opisem, braki w specyfikacjach | [Budowa](/pl/fazy/budowa) |

## Rejestr ryzyk --- szablon

Rejestr ryzyk jest centralnym dokumentem zarządzania ryzykiem. Powinien być aktualizowany co najmniej przy każdej [bramce fazowej](/pl/jakosc/bramki-fazowe).

| Pole | Opis | Przykład |
|---|---|---|
| **ID ryzyka** | Unikalny identyfikator | R-2025-003 |
| **Data identyfikacji** | Kiedy ryzyko zostało rozpoznane | 2025-02-15 |
| **Faza** | W której fazie zidentyfikowano | Projekt wstępny |
| **Kategoria** | Administracyjne / Techniczne / Finansowe / Prawne / Organizacyjne | Techniczne |
| **Opis ryzyka** | Zwięzły opis zagrożenia | Badania geologiczne wskazują na kurzawkę na głębokości 3 m |
| **Prawdopodobieństwo** | Niskie (1) / Średnie (2) / Wysokie (3) / Bardzo wysokie (4) | 3 (Wysokie) |
| **Wpływ** | Niski (1) / Średni (2) / Wysoki (3) / Krytyczny (4) | 4 (Krytyczny) |
| **Ocena ryzyka** | Prawdopodobieństwo x Wpływ | 12 |
| **Strategia łagodzenia** | Unikanie / Redukcja / Transfer / Akceptacja | Redukcja |
| **Działania łagodzące** | Konkretne kroki zmniejszające ryzyko | Zlecenie dodatkowych badań geotechnicznych, projekt alternatywnego fundamentowania |
| **Właściciel ryzyka** | Osoba odpowiedzialna za monitorowanie | inż. Jan Kowalski (projektant konstrukcji) |
| **Status** | Otwarte / W realizacji / Zamknięte | Otwarte |
| **Powiązane dokumenty** | Karty i dokumenty, których dotyczy ryzyko | SP-REQ-01-L-1-002, raport geotechniczny |

::: tip Powiązanie z szablonami
Gotowy formularz rejestru ryzyk w formacie tabelarycznym znajdziesz w sekcji [Szablony](/pl/szablony/). Rejestr można również prowadzić jako arkusz kalkulacyjny zsynchronizowany z [CDE](/pl/integracja-bim/cde).
:::

## Macierz oceny ryzyka

Macierz łączy prawdopodobieństwo wystąpienia z potencjalnym wpływem na projekt. Wynik określa priorytet reakcji.

| | Wpływ: Niski (1) | Wpływ: Średni (2) | Wpływ: Wysoki (3) | Wpływ: Krytyczny (4) |
|---|:---:|:---:|:---:|:---:|
| **Bardzo wysokie (4)** | 4 --- Średnie | 8 --- Wysokie | 12 --- Krytyczne | 16 --- Krytyczne |
| **Wysokie (3)** | 3 --- Niskie | 6 --- Średnie | 9 --- Wysokie | 12 --- Krytyczne |
| **Średnie (2)** | 2 --- Niskie | 4 --- Średnie | 6 --- Średnie | 8 --- Wysokie |
| **Niskie (1)** | 1 --- Niskie | 2 --- Niskie | 3 --- Niskie | 4 --- Średnie |

### Zasady reakcji według poziomu ryzyka

| Poziom | Zakres oceny | Wymagana reakcja |
|---|---|---|
| **Krytyczne** | 9--16 | Natychmiastowe działanie. Eskalacja do inwestora. Możliwe wstrzymanie prac do czasu rozwiązania. |
| **Wysokie** | 6--8 | Plan łagodzenia w ciągu 5 dni roboczych. Raportowanie na spotkaniach koordynacyjnych. |
| **Średnie** | 3--5 | Monitorowanie. Działania prewencyjne przy kolejnej bramce fazowej. |
| **Niskie** | 1--2 | Akceptacja. Przegląd przy zmianie fazy. |

## Ryzyka specyficzne dla faz

Każda faza projektu generuje inne zagrożenia. Poniższe zestawienie pomaga w proaktywnej identyfikacji ryzyk.

### Fazy wczesne

| Faza | Kluczowe ryzyka | Działania prewencyjne |
|---|---|---|
| [Rozpoczęcie](/pl/fazy/rozpoczecie) | Niejasne wymagania inwestora, brak budżetu | Szczegółowy brief, wstępna analiza kosztów |
| [Koncepcja](/pl/fazy/koncepcja) | Niezgodność z MPZP, ograniczenia działki | Analiza MPZP, wizja lokalna, warunki zabudowy |
| [Projekt wstępny](/pl/fazy/wstepny) | Nierealistyczny program funkcjonalny, brak uzgodnień wstępnych | Weryfikacja powierzchni, konsultacje z gestorami |

### Fazy projektowe

| Faza | Kluczowe ryzyka | Działania prewencyjne |
|---|---|---|
| [Projekt budowlany](/pl/fazy/budowlany) | Odmowa pozwolenia, braki formalne, protesty sąsiadów | Checklista kompletności, analiza stron postępowania |
| [Projekt wykonawczy](/pl/fazy/wykonawczy) | Kolizje międzybranżowe, przekroczenie budżetu | Regularna kontrola kolizji w [modelu BIM](/pl/integracja-bim/), kosztorysy aktualizowane |

### Fazy realizacyjne

| Faza | Kluczowe ryzyka | Działania prewencyjne |
|---|---|---|
| [Budowa](/pl/fazy/budowa) | Warunki gruntowe, opóźnienia dostaw, spory z wykonawcą | Harmonogram dostaw, umowa z jasnym zakresem, nadzór autorski |
| [Dokumentacja powykonawcza](/pl/fazy/powykonawcza) | Niezgodność wykonania z projektem, braki dokumentacyjne | Bieżąca dokumentacja fotograficzna, inwentaryzacja |
| [Przekazanie](/pl/fazy/przekazanie) | Usterki uniemożliwiające odbiór, brak wymaganych dokumentów | Lista kontrolna odbiorowa, próby instalacji |

## Powiązanie ryzyk z dokumentacją

Ryzyka nie istnieją w próżni --- są bezpośrednio powiązane z dokumentami projektowymi i kartami standardu SP-BLD.

| Typ ryzyka | Powiązane karty i dokumenty | Działanie w dokumentacji |
|---|---|---|
| Ryzyko konstrukcyjne | Wymaganie (karta wymagań konstrukcyjnych), Budynek | Aktualizacja wymagań nośności, dodanie warunków specjalnych |
| Ryzyko ppoż. | Wymaganie (karta wymagań ppoż.), Strefa, Pomieszczenie | Weryfikacja klas odporności, dróg ewakuacyjnych |
| Ryzyko instalacyjne | Instalacja, Urządzenie | Kontrola parametrów, sprawdzenie zgodności z [przepisami](/pl/przepisy/) |
| Ryzyko budżetowe | Wszystkie karty (pole `estimated_cost` w YAML) | Aktualizacja szacunków kosztowych |
| Ryzyko formalne | Wymaganie (karta zgodności z MPZP/WT) | Kontrola zgodności, dokumentacja uzgodnień |

::: warning Uwaga
Ryzyka o statusie "Otwarte" i ocenie "Krytyczne" powinny blokować przejście przez [bramkę fazową](/pl/jakosc/bramki-fazowe). Nie należy rozpoczynać kolejnej fazy bez planu łagodzenia ryzyk krytycznych.
:::

::: info Przegląd ryzyk
Przegląd rejestru ryzyk powinien odbywać się co najmniej raz w miesiącu na spotkaniu koordynacyjnym oraz obowiązkowo przy każdej bramce fazowej. Szczegóły procedury przeglądów w sekcji [Procedury przeglądów](/pl/jakosc/procedury-przegladow).
:::

## Lista kontrolna --- zarządzanie ryzykiem

- [ ] Przeprowadzono wstępną identyfikację ryzyk (warsztat z zespołem)
- [ ] Utworzono rejestr ryzyk z przypisanymi właścicielami
- [ ] Wypełniono macierz oceny ryzyka dla wszystkich zidentyfikowanych zagrożeń
- [ ] Opracowano plany łagodzenia dla ryzyk krytycznych i wysokich
- [ ] Ustalono harmonogram przeglądów rejestru ryzyk
- [ ] Powiązano ryzyka z kartami dokumentacji (Wymagania, Pomieszczenia, Instalacje)
- [ ] Zdefiniowano próg eskalacji ryzyk do inwestora
- [ ] Uwzględniono ryzyka w kryteriach [bramek fazowych](/pl/jakosc/bramki-fazowe)
