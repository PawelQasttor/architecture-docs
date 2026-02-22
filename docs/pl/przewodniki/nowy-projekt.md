# Rozpoczynanie nowego projektu

Ten przewodnik przeprowadzi Cię krok po kroku przez proces uruchamiania nowego projektu architektonicznego zgodnie ze standardem dokumentacji. Postępuj zgodnie z kolejnością kroków, aby niczego nie pominąć i zapewnić projektowi solidne podstawy.

::: info Wymagania wstępne
Przed rozpoczęciem upewnij się, że masz dostęp do [biblioteki szablonów](/pl/szablony/) oraz zapoznaj się z [przewodnikiem szybkiego startu](/pl/standardy/szybki-start).
:::

## Krok 1: Utwórz strukturę folderów

Przygotuj ustandaryzowaną hierarchię katalogów dla projektu. Spójne nazewnictwo pozwala każdemu członkowi zespołu szybko odnaleźć potrzebne dokumenty.

| Folder | Przeznaczenie |
|---|---|
| `01_ADMIN` | Umowy, korespondencja, notatki ze spotkań |
| `02_BRIEF` | Brief klienta, program funkcjonalno-użytkowy |
| `03_PROJEKT` | Rysunki, modele, specyfikacje |
| `04_KONSULTANCI` | Konstrukcja, instalacje, opracowania branżowe |
| `05_INWENTARYZACJA` | Pomiary geodezyjne, geotechnika, środowisko |
| `06_FORMALNOSCI` | Decyzje o warunkach zabudowy, pozwolenia |
| `07_JAKOSC` | Listy kontrolne, protokoły przeglądów, audyty |
| `08_BIM` | Modele BIM, raporty kolizji, BEP |

Szczegółowe zasady nazewnictwa i kontroli wersji znajdziesz w rozdziale [Kontrola dokumentów](/pl/zarzadzanie-projektem/kontrola-dokumentow).

## Krok 2: Ustal zasady zarządzania projektem

Określ, kto jest odpowiedzialny, decyzyjny, konsultowany i informowany w każdym obszarze projektu.

1. **Przygotuj macierz RACI** obejmującą wszystkie fazy projektu i kluczowe produkty.
2. **Opracuj plan komunikacji** -- częstotliwość spotkań, kanały raportowania, ścieżki eskalacji.
3. **Przypisz role projektowe**: architekt prowadzący, kierownik projektu, koordynator BIM, odpowiedzialny za jakość.

Szablony RACI i definicje ról znajdziesz w rozdziale [Zarządzanie projektem](/pl/zarzadzanie-projektem/zarzadzanie).

## Krok 3: Utwórz Kartę Budynku

Karta Budynku to centralny zapis metadanych projektu. Uzupełnij następujące informacje:

1. Nazwa projektu i unikalny identyfikator
2. Adres działki i współrzędne geograficzne
3. Typologia i klasa funkcji budynku
4. Szacunkowa powierzchnia całkowita brutto
5. Liczba kondygnacji (nadziemnych i podziemnych)
6. Kluczowe daty: rozpoczęcie projektu, planowane zakończenie

::: tip
Zacznij od tego, co wiesz. Karta Budynku jest uzupełniana na każdym etapie -- nie musisz wypełniać wszystkich pól pierwszego dnia.
:::

## Krok 4: Napisz brief projektowy

Udokumentuj wymagania, ograniczenia i oczekiwania inwestora. Brief powinien obejmować:

1. Cele projektu i kryteria sukcesu
2. Profil użytkowników i scenariusze użytkowania
3. Ramowy budżet i harmonogram finansowania
4. Uwarunkowania i potencjał działki
5. Cele zrównoważonego rozwoju i planowane certyfikacje

Powiąż brief z Kartą Budynku, aby oba dokumenty pozostawały ze sobą spójne przez cały cykl życia projektu.

## Krok 5: Sprawdź uwarunkowania planistyczne (MPZP/WZ)

Przed rozpoczęciem prac projektowych potwierdź ramy formalnoprawne:

1. Sprawdź, czy działka jest objęta Miejscowym Planem Zagospodarowania Przestrzennego (MPZP).
2. Jeśli MPZP nie obowiązuje, ustal, czy konieczne jest uzyskanie Decyzji o Warunkach Zabudowy (WZ).
3. Odnotuj obowiązujące parametry: wysokość zabudowy, linia zabudowy, wskaźnik powierzchni zabudowy, wskaźnik intensywności zabudowy.

::: warning
Weryfikacja uwarunkowań planistycznych leży na ścieżce krytycznej. Opóźnienia w uzyskaniu decyzji WZ mogą zablokować cały projekt. Rozpocznij ten krok jak najwcześniej.
:::

Szczegółowe wytyczne znajdziesz w rozdziale [Przepisy planistyczne (MPZP/WZ)](/pl/przepisy/mpzp-wz).

## Krok 6: Opracuj program funkcjonalno-użytkowy

Przełóż brief na mierzalne wymagania przestrzenne:

1. Wymień wszystkie wymagane funkcje i aktywności.
2. Przypisz docelowe powierzchnie do każdej funkcji.
3. Określ wymagania sąsiedztwa i separacji pomieszczeń.
4. Utwórz wstępne **Karty Pomieszczeń** dla głównych przestrzeni, zapisując nazwę, docelową powierzchnię i wymagania funkcjonalne.

## Krok 7: Przygotuj Plan Realizacji BIM

Ustal zasady pracy w BIM przed rozpoczęciem modelowania:

1. Określ wymagania LOD dla poszczególnych faz.
2. Uzgodnij oprogramowanie, formaty plików i protokoły wymiany danych.
3. Skonfiguruj Wspólne Środowisko Danych (CDE).
4. Przypisz role i odpowiedzialności w zakresie BIM.

Skorzystaj z szablonu [Plan Realizacji BIM (BEP)](/pl/integracja-bim/bep).

## Krok 8: Wdróż procedury zapewnienia jakości

Kontrola jakości zapobiega kosztownym poprawkom:

1. Wybierz odpowiednie listy kontrolne z rozdziału [Jakość](/pl/jakosc/).
2. Zdefiniuj obiegi przeglądów i zatwierdzeń dla każdego typu dokumentu.
3. Zaplanuj przeglądy bramek fazowych zgodnie z kamieniami milowymi projektu.

Kryteria przeglądów na poszczególnych etapach opisuje rozdział [Bramki fazowe](/pl/jakosc/bramki-fazowe).

## Krok 9: Utwórz rejestr ryzyk

Identyfikuj i oceniaj ryzyka od samego początku:

1. Przeprowadź sesję identyfikacji ryzyk w kategoriach: działka, przepisy, projekt, budżet, harmonogram, interesariusze.
2. Oceń każde ryzyko pod kątem prawdopodobieństwa i wpływu.
3. Wyznacz właścicieli ryzyk i określ działania mitygacyjne.
4. Zaplanuj regularne przeglądy rejestru ryzyk.

Skorzystaj z ramowej metodyki i szablonów z rozdziału [Zarządzanie ryzykiem](/pl/zarzadzanie-projektem/zarzadzanie-ryzykiem).

## Krok 10: Pierwszy zapis i przegląd bramki fazowej

Zamknij fazę inicjacji:

1. Zatwierdź wszystkie dokumenty w repozytorium projektu z odpowiednimi oznaczeniami wersji.
2. Przeprowadź przegląd bramki [fazy Rozpoczęcia](/pl/fazy/rozpoczecie).
3. Uzyskaj akceptację inwestora i kierownictwa projektu.
4. Przejdź do fazy koncepcji projektowej.

---

## Lista kontrolna uruchomienia projektu

Użyj tej listy, aby zweryfikować kompletność przygotowań przed przejściem do kolejnej fazy.

| # | Zadanie | Status |
|---|---|---|
| 1 | Struktura folderów utworzona zgodnie ze standardem | :white_large_square: |
| 2 | Macierz RACI i plan komunikacji zatwierdzone | :white_large_square: |
| 3 | Karta Budynku utworzona z podstawowymi metadanymi | :white_large_square: |
| 4 | Brief projektowy napisany i zaakceptowany przez inwestora | :white_large_square: |
| 5 | Status planistyczny zweryfikowany (MPZP lub WZ) | :white_large_square: |
| 6 | Program funkcjonalny opracowany, wstępne Karty Pomieszczeń utworzone | :white_large_square: |
| 7 | Plan Realizacji BIM uzgodniony ze wszystkimi stronami | :white_large_square: |
| 8 | Procedury jakości i listy kontrolne wybrane | :white_large_square: |
| 9 | Rejestr ryzyk uzupełniony, właściciele wyznaczeni | :white_large_square: |
| 10 | Przegląd bramki fazy inicjacji przeprowadzony | :white_large_square: |

::: info Kolejne kroki
Po ukończeniu listy kontrolnej przejdź do dokumentacji [fazy Rozpoczęcia](/pl/fazy/rozpoczecie), aby rozpocząć prace koncepcyjne. Bieżące zasady prowadzenia projektu opisuje rozdział [Zarządzanie projektem](/pl/zarzadzanie-projektem/).
:::
