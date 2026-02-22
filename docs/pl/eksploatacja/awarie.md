# Zarządzanie awariami

Awarie w budynkach są nieuniknione -- nawet przy najlepszym programie konserwacji prewencyjnej. Skuteczne zarządzanie awariami wymaga jasnych procedur, szybkiej reakcji i rzetelnej dokumentacji, która zapobiega powtarzaniu się tych samych problemów.

## Co liczy się jako awaria

Awaria to każde nieplanowane zdarzenie, które powoduje utratę funkcjonalności, zagrożenie bezpieczeństwa lub pogorszenie komfortu użytkowników budynku.

| Kategoria | Przykłady | Typowe przyczyny |
|-----------|-----------|------------------|
| **Awaria urządzenia** | Zatrzymanie centrali wentylacyjnej, awaria kotła, uszkodzenie pompy | Zużycie eksploatacyjne, brak konserwacji, wada fabryczna |
| **Wyciek wody** | Pęknięcie rury, nieszczelność dachu, awaria zaworu | Korozja, zamarzanie, uszkodzenie mechaniczne |
| **Awaria HVAC** | Brak ogrzewania/chłodzenia, niewłaściwa temperatura | Awaria sprężarki, wyciek czynnika, uszkodzenie sterowania |
| **Problem konstrukcyjny** | Pęknięcia ścian, ugięcia stropów, osiadanie | Przeciążenie, błędy projektowe, zmiany gruntowe |
| **Awaria elektryczna** | Zanik zasilania, zwarcie, uszkodzenie rozdzielnicy | Przeciążenie obwodów, starzenie izolacji, wilgoć |
| **Awaria ppoż.** | Fałszywy alarm, niesprawność systemu oddymiania | Uszkodzenie czujki, brak konserwacji, sabotaż |

::: warning Awarie zagrażające życiu
Awarie konstrukcyjne, gazowe i elektryczne zagrażające życiu wymagają natychmiastowej ewakuacji i wezwania odpowiednich służb. Procedury zarządzania awariami opisane poniżej dotyczą sytuacji, w których nie ma bezpośredniego zagrożenia życia.
:::

## Przepływ zgłaszania i obsługi awarii

Każda awaria powinna przejść przez pięć etapów:

### 1. Wykrycie

Awaria może zostać wykryta przez:
- Użytkownika budynku (zgłoszenie ustne, e-mail, system ticketowy)
- System BMS / automatykę budynkową (alert z [czujników IoT](/pl/integracja-bim/czujniki-iot))
- Personel techniczny podczas obchodu
- Przegląd okresowy (kontrola stanu technicznego)

### 2. Zgłoszenie

Każde zgłoszenie powinno zawierać:
- Datę i godzinę wykrycia
- Lokalizację (Budynek, Kondygnacja, Pomieszczenie lub Strefa)
- Opis objawów
- Identyfikator zgłaszającego
- Zdjęcie dokumentujące (jeśli możliwe)

### 3. Ocena i klasyfikacja

Osoba odpowiedzialna ocenia ważność awarii i przypisuje poziom pilności (patrz tabela poniżej). Na tym etapie identyfikuje się, które Urządzenie lub Instalacja jest dotknięta.

### 4. Naprawa

- Wyznaczenie wykonawcy (personel wewnętrzny lub serwis zewnętrzny)
- Wykonanie naprawy lub zabezpieczenia tymczasowego
- Weryfikacja skuteczności naprawy
- W przypadku urządzeń gwarancyjnych -- zgłoszenie reklamacji

### 5. Dokumentacja

- Aktualizacja karty Urządzenia (status, historia napraw)
- Wpis do karty Instalacji (jeśli awaria dotyczyła systemu)
- Zamknięcie zgłoszenia w systemie ticketowym
- Analiza przyczyn źródłowych (dla awarii poważnych i powtarzających się)

## Poziomy ważności awarii i czasy reakcji

| Poziom | Nazwa | Opis | Czas reakcji | Czas naprawy | Przykład |
|--------|-------|------|--------------|--------------|---------|
| **P1** | Krytyczna | Zagrożenie bezpieczeństwa lub całkowita utrata funkcji budynku | 30 min | 4 h | Zanik zasilania, wyciek gazu, awaria windy z pasażerami |
| **P2** | Pilna | Poważne ograniczenie funkcjonalności, wpływ na wielu użytkowników | 2 h | 24 h | Brak ogrzewania zimą, zalanie piętra, awaria SSP |
| **P3** | Standardowa | Ograniczenie funkcjonalności pojedynczej strefy lub systemu | 8 h | 72 h | Awaria klimatyzacji w jednym pomieszczeniu, niesprawne oświetlenie |
| **P4** | Niska | Usterka kosmetyczna lub niewielka niedogodność | 24 h | 2 tyg. | Cieknący kran, zarysowanie posadzki, luźna klamka |

::: info Dostosowanie do obiektu
Powyższe czasy reakcji są orientacyjne. Zarządca powinien ustalić własne SLA dostosowane do rodzaju budynku (biurowy, mieszkalny, szpital, szkoła) i warunków umowy z właścicielem.
:::

## Analiza przyczyn źródłowych

Dla awarii o poziomie P1 i P2 oraz dla awarii powtarzających się zaleca się przeprowadzenie analizy przyczyn źródłowych (Root Cause Analysis).

### Metoda 5 Dlaczego

Prosta technika polegająca na wielokrotnym zadawaniu pytania "dlaczego?" aż do dotarcia do przyczyny fundamentalnej.

**Przykład:**
1. Dlaczego zalano piętro? -- Bo pękła rura zasilająca.
2. Dlaczego pękła rura? -- Bo zamarzła woda w rurze.
3. Dlaczego zamarzła woda? -- Bo rura przebiega przez nieogrzewaną przestrzeń.
4. Dlaczego rura jest w nieogrzewanej przestrzeni? -- Bo podczas przebudowy zmieniono trasę bez zabezpieczenia termicznego.
5. Dlaczego nie zabezpieczono rury? -- Bo zmiany nie zostały udokumentowane i nie zaktualizowano karty Instalacji.

**Wniosek:** Przyczyna źródłowa to brak aktualizacji dokumentacji po przebudowie. Działanie naprawcze: procedura obowiązkowej aktualizacji kart Instalacji przy każdej zmianie trasy rurociągów.

### Diagram Ishikawy (rybiej ości)

Dla złożonych awarii warto wykorzystać diagram przyczynowo-skutkowy grupujący przyczyny w kategorie:

- **Ludzie** -- błędy obsługi, brak przeszkolenia, brak procedur
- **Maszyny** -- zużycie, wady fabryczne, nieodpowiedni dobór
- **Materiały** -- jakość materiałów, degradacja, niezgodność
- **Metody** -- niewłaściwe procedury konserwacji, brak harmonogramów
- **Środowisko** -- warunki pogodowe, obciążenia nietypowe
- **Pomiary** -- brak monitoringu, błędne odczyty czujników

## Jak awarie aktualizują dokumentację

Każda awaria powinna skutkować aktualizacją odpowiednich kart w standardzie:

| Zdarzenie | Aktualizacja karty Urządzenia | Aktualizacja karty Instalacji |
|-----------|-------------------------------|-------------------------------|
| Naprawa urządzenia | Wpis do historii napraw, zmiana statusu | Notatka o przestoju systemu |
| Wymiana urządzenia | Nowa karta Urządzenia, archiwizacja starej | Aktualizacja listy urządzeń w systemie |
| Zmiana trasy / konfiguracji | -- | Aktualizacja schematu, opis zmiany |
| Zmiana parametrów pracy | Aktualizacja nastaw | Aktualizacja parametrów systemowych |

Struktura kart opisana jest w [katalogu kart dokumentacji](/pl/dokumentacja/encje/). Aktualizacja powinna być wykonana niezwłocznie po zakończeniu naprawy.

## Reklamacje gwarancyjne

Dane gwarancyjne przechowywane w kartach Urządzeń umożliwiają szybkie ustalenie, czy awaria podlega reklamacji.

### Lista kontrolna reklamacji gwarancyjnej

- [ ] Sprawdzenie daty gwarancji w karcie Urządzenia
- [ ] Weryfikacja warunków gwarancji (czy nie naruszono warunków użytkowania)
- [ ] Dokumentacja fotograficzna awarii
- [ ] Zgłoszenie do producenta / dostawcy w wymaganym terminie
- [ ] Archiwizacja korespondencji i protokołów serwisowych
- [ ] Aktualizacja karty Urządzenia o status reklamacji
- [ ] Wpis do [Książki Obiektu Budowlanego](./konserwacja)

::: tip Okres gwarancji a rękojmia
W prawie polskim rękojmia na roboty budowlane wynosi 5 lat (art. 568 KC). Gwarancja producenta może być krótsza lub dłuższa. Obie daty powinny być zapisane w karcie Urządzenia.
:::

## Szablon raportu z awarii

Poniższe pola powinien zawierać każdy raport z awarii:

| Pole | Opis | Przykład |
|------|------|---------|
| Nr zgłoszenia | Unikalny identyfikator | AWR-2026-0042 |
| Data wykrycia | Data i godzina | 2026-01-15, 08:30 |
| Zgłaszający | Imię, rola | Jan Kowalski, ochrona |
| Lokalizacja | Budynek / Kondygnacja / Pomieszczenie | B1 / Piętro 2 / Pom. 2.14 |
| Urządzenie / Instalacja | ID karty | HVAC-AHU-001 / SYS-HVAC-01 |
| Opis awarii | Objawy | Centrala wentylacyjna nie uruchamia się, alarm na BMS |
| Poziom ważności | P1--P4 | P2 |
| Przyczyna | Ustalona po diagnozie | Uszkodzenie łożyska wentylatora |
| Działanie naprawcze | Co wykonano | Wymiana łożyska, wyważenie wirnika |
| Wykonawca | Firma / osoba | Systemair Serwis |
| Data naprawy | Data zakończenia | 2026-01-15, 14:00 |
| Koszt | Wartość naprawy | 3 200 PLN (gwarancja) |
| Gwarancja | Czy objęte gwarancją | Tak -- reklamacja nr RG-2026-008 |
| Działania zapobiegawcze | Jak uniknąć powtórzenia | Skrócenie interwału przeglądu do 3 mies. |

## Powiązane sekcje

- [Eksploatacja budynku -- przegląd](./) -- kontekst zarządzania awariami
- [Planowanie konserwacji](./konserwacja) -- konserwacja prewencyjna zapobiegająca awariom
- [Modernizacja](./modernizacja) -- gdy powtarzające się awarie wskazują na potrzebę modernizacji
- [Karta Urządzenia](/pl/dokumentacja/encje/instancja-zasobu) -- struktura danych urządzenia
- [Karta Instalacji](/pl/dokumentacja/encje/system) -- struktura danych systemu
