---
title: Nadzór i organizacja
description: Macierz RACI, plan komunikacji, rejestr decyzji i zarządzanie interesariuszami w polskim projekcie architektonicznym.
---

# Nadzór i organizacja

Skuteczny nadzór nad projektem architektonicznym wymaga jasnego podziału odpowiedzialności, regularnej komunikacji i systematycznego dokumentowania decyzji. Ten rozdział definiuje narzędzia organizacyjne stosowane przez cały cykl życia projektu.

## Macierz RACI

Macierz RACI przypisuje każdemu zadaniu cztery poziomy zaangażowania:

- **R** --- Odpowiedzialny (Responsible) --- wykonuje zadanie
- **A** --- Akceptujący (Accountable) --- zatwierdza wynik, ponosi odpowiedzialność
- **C** --- Konsultowany (Consulted) --- udziela opinii przed decyzją
- **I** --- Informowany (Informed) --- otrzymuje informację po decyzji

| Zadanie | Inwestor | Architekt prowadzący | Projektant konstrukcji | Projektant instalacji | Kierownik budowy | Koordynator BIM |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Zatwierdzenie koncepcji | **A** | **R** | C | C | I | I |
| Opracowanie projektu budowlanego | I | **A** | **R** | **R** | I | C |
| Koordynacja międzybranżowa | I | **A** | C | C | I | **R** |
| Złożenie wniosku o pozwolenie | **A** | **R** | C | C | I | I |
| Nadzór autorski na budowie | I | **A/R** | C | C | **R** | I |
| Aktualizacja modelu BIM | I | **A** | C | C | I | **R** |
| Odbiór końcowy | **A** | C | C | C | **R** | I |
| Zatwierdzenie zmian projektowych | **A** | **R** | C | C | C | I |
| Kontrola kosztów | **A** | C | I | I | **R** | I |
| Dokumentacja powykonawcza | I | C | C | C | **A/R** | **R** |

::: tip Dostosowanie macierzy
Powyższa macierz dotyczy typowego projektu kubaturowego. W przypadku projektów specjalistycznych (np. obiekty zabytkowe, budynki wysokościowe) należy rozszerzyć ją o dodatkowe role: konserwator zabytków, rzeczoznawca ppoż., audytor energetyczny.
:::

## Plan komunikacji

Regularność i przewidywalność komunikacji zapobiega opóźnieniom decyzyjnym. Zalecany harmonogram:

| Rodzaj spotkania | Częstotliwość | Uczestnicy | Produkt spotkania |
|---|---|---|---|
| Rada projektu | Co miesiąc | Inwestor, architekt prowadzący, koordynator | Protokół decyzji strategicznych |
| Koordynacja międzybranżowa | Co 2 tygodnie | Projektanci wszystkich branż, koordynator BIM | Lista kolizji, ustalenia techniczne |
| Przegląd postępu | Co tydzień | Architekt prowadzący, zespół projektowy | Raport postępu, aktualizacja harmonogramu |
| Narada budowy | Co tydzień (faza budowy) | Kierownik budowy, inspektor nadzoru, architekt | Wpis do dziennika budowy |
| Bramka fazowa | Na zakończenie fazy | Wszyscy kluczowi interesariusze | Protokół bramki, lista uwag |

::: warning Uwaga
Każde spotkanie powinno mieć wyznaczonego protokolanta. Ustalenia bez protokołu nie mają mocy wiążącej w procesie projektowym. Protokoły należy przesyłać do uczestników w ciągu 2 dni roboczych.
:::

### Kanały komunikacji

| Kanał | Zastosowanie | Uwagi |
|---|---|---|
| Spotkania formalne | Decyzje projektowe, bramki fazowe | Zawsze z protokołem |
| Poczta elektroniczna | Korespondencja formalna, przesyłanie dokumentów | Archiwizacja w folderze projektu |
| Wspólne środowisko danych ([CDE](/pl/integracja-bim/cde)) | Wymiana modeli i dokumentacji | Jedno źródło prawdy |
| Komunikator zespołowy | Bieżąca koordynacja operacyjna | Nie zastępuje decyzji formalnych |

## Rejestr decyzji

Rejestr decyzji dokumentuje wszystkie istotne rozstrzygnięcia podjęte w toku projektu. Stanowi źródło wiedzy o tym, dlaczego projekt przyjął określony kształt.

### Szablon wpisu w rejestrze decyzji

| Pole | Opis | Przykład |
|---|---|---|
| **ID** | Numer kolejny | DEC-2025-014 |
| **Data** | Data podjęcia decyzji | 2025-03-15 |
| **Faza** | Faza projektu | Projekt wstępny |
| **Temat** | Zwięzły opis zagadnienia | Wybór systemu ogrzewania |
| **Decyzja** | Treść podjętej decyzji | Pompa ciepła powietrze-woda zamiast kotła gazowego |
| **Uzasadnienie** | Dlaczego podjęto taką decyzję | Wymagania WT 2025, niższe koszty eksploatacji |
| **Podjęta przez** | Kto podjął decyzję | Inwestor na podstawie rekomendacji projektanta instalacji |
| **Wpływ** | Konsekwencje dla projektu | Zmiana karty Instalacji IS-HVAC-01, aktualizacja bilansu mocy |
| **Powiązane dokumenty** | Odnośniki do kart i dokumentów | WYM-EN-003, ZM-2025-007 |

::: info Kiedy rejestrować decyzję?
Rejestruj każdą decyzję, która wpływa na zakres, koszt, harmonogram lub zgodność z przepisami. Drobne ustalenia techniczne (np. kolor fugi) nie wymagają wpisu, chyba że wynikają z wymagań inwestora.
:::

## Rejestr interesariuszy

Rejestr interesariuszy identyfikuje wszystkie osoby i instytucje mające wpływ na projekt lub zainteresowane jego wynikiem.

| Pole | Opis |
|---|---|
| **Nazwa / Funkcja** | Osoba lub instytucja (np. Jan Kowalski --- Inwestor) |
| **Organizacja** | Firma lub urząd (np. Wydział Architektury UM Kraków) |
| **Rola w projekcie** | Np. zamawiający, organ administracji, gestora sieci |
| **Poziom wpływu** | Wysoki / Średni / Niski |
| **Poziom zainteresowania** | Wysoki / Średni / Niski |
| **Oczekiwania** | Czego interesariusz oczekuje od projektu |
| **Strategia komunikacji** | Jak i jak często informować |

### Typowi interesariusze w polskim projekcie architektonicznym

- Inwestor (zamawiający)
- Użytkownicy końcowi budynku
- Organ administracji architektoniczno-budowlanej (starostwo / urząd miasta)
- Gestorzy sieci (gazownia, wodociągi, energetyka, telekomunikacja)
- Zarządca drogi (uzgodnienie zjazdu)
- Konserwator zabytków (jeśli dotyczy)
- Rzeczoznawca ds. zabezpieczeń ppoż.
- Sąsiedzi (w przypadku procedury WZ lub oddziaływania na działki sąsiednie)
- Wykonawca generalny (od fazy [budowy](/pl/fazy/budowa))

::: tip Powiązanie z bramkami fazowymi
Lista interesariuszy powinna być aktualizowana przy każdej [bramce fazowej](/pl/jakosc/bramki-fazowe). Nowi interesariusze pojawiają się zwłaszcza przy przejściu do fazy budowlanej (rzeczoznawcy) i do fazy budowy (wykonawca, inspektor nadzoru).
:::

## Lista kontrolna --- nadzór i organizacja

- [ ] Opracowano i uzgodniono macierz RACI
- [ ] Zatwierdzono plan komunikacji z harmonogramem spotkań
- [ ] Wyznaczono protokolantów dla spotkań formalnych
- [ ] Założono rejestr decyzji
- [ ] Sporządzono rejestr interesariuszy
- [ ] Ustalono kanały komunikacji i zasady archiwizacji
- [ ] Skonfigurowano [wspólne środowisko danych (CDE)](/pl/integracja-bim/cde)
