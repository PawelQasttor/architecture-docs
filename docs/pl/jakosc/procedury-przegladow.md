# Procedury przeglądów

Przeglądy stanowią kluczowy mechanizm kontroli jakości dokumentacji architektonicznej. Ta strona opisuje pięć typów przeglądów stosowanych w standardzie, zasady ich prowadzenia oraz wzorcową listę kontrolną.

Przeglądy są powiązane z [bramkami fazowymi](./bramki-fazowe) -- każda bramka wymaga przeprowadzenia odpowiednich przeglądów przed dopuszczeniem projektu do kolejnej fazy.

---

## 1. Wewnętrzny przegląd projektowy

Przegląd prowadzony wewnątrz zespołu branżowego -- tzw. przegląd koleżeński. Jego celem jest merytoryczna weryfikacja opracowania przez osobę, która nie jest jego autorem.

### Kto uczestniczy

| Rola | Zadanie |
|------|---------|
| **Autor** | Przedstawia opracowanie, wyjaśnia przyjęte rozwiązania |
| **Recenzent** (inny projektant z zespołu) | Sprawdza poprawność merytoryczną, spójność, kompletność |
| **Kierownik zespołu** (opcjonalnie) | Nadzoruje proces, rozstrzyga wątpliwości |

### Co sprawdzać

- **Kompletność** -- czy wszystkie wymagane karty (Pomieszczenia, Strefy, Kondygnacje) zostały opracowane
- **Spójność wymiarowa** -- czy rzuty, przekroje i elewacje są wzajemnie zgodne
- **Oznaczenia** -- czy numeracja osi, poziomów i pomieszczeń jest jednolita
- **Rozwiązania materiałowe** -- czy są realistyczne, dostępne na rynku, zgodne z budżetem
- **Zgodność z wytycznymi inwestora** -- czy program funkcjonalny jest spełniony
- **Czytelność rysunków** -- czy skala, opisy i legenda są poprawne

::: tip Zasada przeglądu koleżeńskiego
Przegląd koleżeński to nie krytyka -- to współpraca. Recenzent szuka błędów, których autor mógł nie zauważyć. Uwagi formułujemy konstruktywnie, z propozycją rozwiązania.
:::

---

## 2. Przegląd koordynacyjny międzybranżowy

Najważniejszy przegląd z punktu widzenia zapobiegania kolizjom na budowie. Obejmuje sprawdzenie spójności między branżami: architekturą, konstrukcją, instalacjami sanitarnymi, elektrycznymi i teletechnicznymi.

### Uczestnicy

- Główny projektant (prowadzi spotkanie)
- Projektant architektury
- Projektant konstrukcji
- Projektant instalacji sanitarnych (wod.-kan., HVAC, gaz)
- Projektant instalacji elektrycznych
- Koordynator BIM (jeśli projekt prowadzony w BIM)

### Zakres kontroli

| Obszar | Przykłady sprawdzeń |
|--------|---------------------|
| **Architektura -- Konstrukcja** | Zgodność osi i poziomów, otwory w stropach i ścianach, grubości elementów |
| **Architektura -- Instalacje** | Przestrzeń na szachty, prowadzenie tras pod sufitami podwieszonymi, lokalizacja rozdzielni |
| **Konstrukcja -- Instalacje** | Przejścia przez elementy nośne, obciążenia od urządzeń, podwieszenia |
| **Instalacje -- Instalacje** | Kolizje tras (np. wentylacja vs. kable), wspólne szachty, priorytet prowadzenia |
| **Wysokości pomieszczeń** | Weryfikacja, czy po uwzględnieniu sufitów podwieszonych i instalacji zachowane są minimalne wysokości z WT |

::: warning Najczęstsze kolizje
Z doświadczenia polskich biur projektowych, najkosztowniejsze kolizje występują między trasami instalacji wentylacji mechanicznej a belkami konstrukcyjnymi. Weryfikacja tych punktów powinna mieć najwyższy priorytet.
:::

### Wynik przeglądu

Po spotkaniu koordynacyjnym sporządza się protokół zawierający:
- Listę wykrytych kolizji z priorytetem (krytyczna / ważna / drobna)
- Odpowiedzialnego za usunięcie każdej kolizji
- Termin usunięcia
- Datę przeglądu kontrolnego

---

## 3. Przegląd dokumentacji

Przegląd formalny sprawdzający kompletność i poprawność dokumentacji jako zbioru plików Markdown z nagłówkami YAML. Wykonuje go kierownik projektu lub wyznaczony koordynator dokumentacji.

### Lista kontrolna przeglądu dokumentacji

**Nagłówki YAML (frontmatter):**
- [ ] Każdy plik posiada poprawny nagłówek YAML
- [ ] Pola wymagane wypełnione: tytuł, typ dokumentu, faza, status, autor, data
- [ ] Status dokumentu aktualny (roboczy / do przeglądu / zatwierdzony)
- [ ] Wersja dokumentu zgodna z [kontrolą dokumentów](/pl/zarzadzanie-projektem/kontrola-dokumentow)

**Odwołania i powiązania:**
- [ ] Karty Pomieszczeń powiązane z odpowiednimi Strefami
- [ ] Karty Instalacji powiązane z Urządzeniami
- [ ] Karty Kondygnacji zawierają odniesienia do Pomieszczeń
- [ ] Budynek posiada kompletną hierarchię: Budynek → Kondygnacje → Strefy → Pomieszczenia
- [ ] Wszystkie odwołania prowadzą do istniejących dokumentów (brak martwych linków)

**Kompletność:**
- [ ] Wszystkie 7 typów dokumentów zastosowane odpowiednio do fazy
- [ ] Brak kart z pustą treścią (tylko nagłówek bez opisu)
- [ ] Załączniki graficzne dołączone i poprawnie podlinkowane

::: info Automatyzacja
Część kontroli dokumentacji można zautomatyzować -- walidacja nagłówków YAML i sprawdzanie martwych linków mogą być wykonywane skryptem przy każdej aktualizacji repozytorium.
:::

---

## 4. Koordynacja BIM

Przegląd modelu BIM stanowi techniczne uzupełnienie przeglądu koordynacyjnego. Wykonywany jest na modelu federacyjnym (złożonym ze wszystkich branż) przy użyciu narzędzi do wykrywania kolizji.

### Zakres kontroli modelu

| Kontrola | Opis | Częstotliwość |
|----------|------|---------------|
| **Wykrywanie kolizji (clash detection)** | Automatyczne sprawdzenie przecięć geometrii między branżami | Co 2 tygodnie w fazie projektowej |
| **Kontrola poziomu LOD** | Weryfikacja, czy elementy modelu mają wymagany poziom szczegółowości | Na każdej [bramce fazowej](./bramki-fazowe) |
| **Walidacja klasyfikacji** | Sprawdzenie poprawności oznaczeń i klasyfikacji elementów | Na każdej bramce fazowej |
| **Kontrola przestrzenna** | Weryfikacja wysokości, odległości, gabarytów z wymaganiami | Przed bramką projektu budowlanego |
| **Eksport IFC** | Sprawdzenie poprawności eksportu do formatu wymiany | Przed przekazaniem modelu |

### Raport z kontroli modelu

Raport powinien zawierać:
- Datę kontroli i wersję modelu
- Liczbę wykrytych kolizji w podziale na typy (twarde / miękkie / lekkie)
- Status kolizji (nowa / w trakcie usuwania / usunięta / zaakceptowana)
- Wizualizacje najważniejszych kolizji
- Porównanie z poprzednim raportem (trend)

Szczegółowe wymagania BIM opisano w sekcji [Integracja BIM](/pl/integracja-bim/) oraz w szablonie [Planu Realizacji BIM (BEP)](/pl/integracja-bim/bep).

---

## 5. Przegląd z inwestorem

Przegląd z inwestorem (lub jego przedstawicielem) ma charakter prezentacyjno-decyzyjny. Jego celem jest uzyskanie akceptacji dla dotychczasowych rozwiązań i zebranie uwag przed dalszymi pracami.

### Co prezentować

| Faza | Zakres prezentacji |
|------|-------------------|
| [Koncepcja](/pl/fazy/koncepcja) | Warianty koncepcyjne, bilans powierzchni, wizualizacje, szacunek kosztów |
| [Projekt wstępny](/pl/fazy/wstepny) | Układ funkcjonalny, rzuty z metrażami, wstępne rozwiązania materiałowe |
| [Projekt budowlany](/pl/fazy/budowlany) | Elewacje, przekroje, zestawienie powierzchni, zgodność z przepisami |
| [Projekt wykonawczy](/pl/fazy/wykonawczy) | Detale wykończeniowe, specyfikacja materiałów, harmonogram realizacji |

### Zasady prowadzenia przeglądu z inwestorem

1. **Przygotowanie** -- materiały prezentacyjne wysłane inwestorowi minimum 3 dni robocze przed spotkaniem.
2. **Prowadzenie** -- główny projektant prezentuje, protokolant notuje uwagi.
3. **Uwagi** -- każda uwaga inwestora zapisana z numerem, treścią i priorytetem.
4. **Decyzje** -- jasne rozstrzygnięcia: zatwierdzono / do poprawy / odrzucono.
5. **Protokół** -- podpisany przez obie strony, stanowi podstawę dalszych prac.

::: warning Uwagi nieformalne
Uwagi przekazane telefonicznie, e-mailem lub w rozmowie kuluarowej powinny zostać formalnie potwierdzone na protokole przeglądu. Niezaprotokołowane uwagi nie stanowią podstawy do zmian w projekcie.
:::

---

## Wzorcowa lista kontrolna przeglądu

Poniższy szablon można stosować do dowolnego typu przeglądu:

### Dane przeglądu

| Pole | Wartość |
|------|---------|
| **Nazwa projektu** | _________________________ |
| **Faza** | _________________________ |
| **Typ przeglądu** | wewnętrzny / koordynacyjny / dokumentacji / BIM / z inwestorem |
| **Data przeglądu** | _________________________ |
| **Prowadzący** | _________________________ |
| **Uczestnicy** | _________________________ |

### Lista kontrolna ogólna

- [ ] Dokumentacja kompletna na daną fazę
- [ ] Nagłówki YAML poprawne i aktualne
- [ ] Oznaczenia i numeracja spójne
- [ ] Zgodność z wytycznymi inwestora potwierdzona
- [ ] Zgodność z [obowiązującymi przepisami](/pl/przepisy/) zweryfikowana
- [ ] Model BIM aktualny i zgodny z dokumentacją (jeśli dotyczy)
- [ ] Koordynacja międzybranżowa sprawdzona
- [ ] Poprzednie uwagi z przeglądów uwzględnione

### Rejestr uwag

| Nr | Opis uwagi | Priorytet | Odpowiedzialny | Termin | Status |
|----|-----------|-----------|----------------|--------|--------|
| 1 | | krytyczny / ważny / drobny | | | otwarty / zamknięty |
| 2 | | krytyczny / ważny / drobny | | | otwarty / zamknięty |
| 3 | | krytyczny / ważny / drobny | | | otwarty / zamknięty |

### Decyzja

- [ ] Przegląd zaliczony -- przejście do kolejnego etapu
- [ ] Przegląd warunkowy -- wymagane poprawki przed przejściem
- [ ] Przegląd niezaliczony -- wymagany ponowny przegląd po poprawkach

**Podpis prowadzącego:** _________________________ **Data:** _____________

---

## Harmonogram przeglądów

Zalecaną częstotliwość przeglądów w projekcie przedstawia poniższa tabela:

| Typ przeglądu | Częstotliwość | Obowiązkowy na bramce |
|---------------|--------------|----------------------|
| Wewnętrzny projektowy | Po zakończeniu każdego opracowania | Tak |
| Koordynacyjny międzybranżowy | Co 2-4 tygodnie w fazach projektowych | Tak (bramki 3-5) |
| Przegląd dokumentacji | Przed każdą bramką fazową | Tak |
| Koordynacja BIM | Co 2 tygodnie (fazy 3-5) | Tak (bramki 3-8) |
| Przegląd z inwestorem | Na każdej bramce fazowej | Tak (bramki 1-5) |

Więcej o zarządzaniu harmonogramem -- zobacz [Zarządzanie projektem](/pl/zarzadzanie-projektem/zarzadzanie).
