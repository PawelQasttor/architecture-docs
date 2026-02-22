---
title: Zarządzanie zmianami
description: Procedury obsługi zmian projektowych — wnioski, analiza wpływu, zatwierdzanie i aktualizacja dokumentacji w standardzie SP-BLD.
---

# Zarządzanie zmianami

Zmiany są nieodłączną częścią każdego projektu architektonicznego. Kluczowe jest nie ich eliminowanie, lecz kontrolowane wprowadzanie --- tak, aby każda zmiana była świadomą decyzją, a nie źródłem chaosu dokumentacyjnego.

## Źródła zmian

Zmiany w projekcie architektonicznym wynikają z różnych przyczyn. Ich rozpoznanie pozwala wcześniej przygotować procedury reakcji.

| Źródło zmiany | Przykład | Typowa faza |
|---|---|---|
| **Życzenia inwestora** | Zmiana liczby pokoi, dodanie garażu podziemnego | [Koncepcja](/pl/fazy/koncepcja), [Projekt wstępny](/pl/fazy/wstepny) |
| **Warunki gruntowe** | Odkrycie wysokiego poziomu wód gruntowych | [Projekt budowlany](/pl/fazy/budowlany), [Budowa](/pl/fazy/budowa) |
| **Zmiany przepisów** | Nowelizacja Warunków Technicznych, zmiana MPZP | Każda faza |
| **Ograniczenia budżetowe** | Konieczność obniżenia kosztów o 15% | [Projekt wykonawczy](/pl/fazy/wykonawczy) |
| **Kolizje międzybranżowe** | Kanał wentylacyjny koliduje z belką konstrukcyjną | [Projekt wykonawczy](/pl/fazy/wykonawczy) |
| **Warunki na budowie** | Odkrycie niezinwentaryzowanej infrastruktury podziemnej | [Budowa](/pl/fazy/budowa) |
| **Uzgodnienia gestorów sieci** | Zmiana trasy przyłącza przez gestora | [Projekt budowlany](/pl/fazy/budowlany) |
| **Decyzje konserwatorskie** | Wymagania konserwatora dotyczące elewacji | [Projekt wstępny](/pl/fazy/wstepny), [Projekt budowlany](/pl/fazy/budowlany) |

::: warning Uwaga
Im późniejsza faza, tym wyższy koszt wprowadzenia zmiany. Zmiana w fazie koncepcji to godziny pracy, zmiana na budowie --- tygodnie opóźnień i dodatkowe nakłady finansowe. Dlatego standard SP-BLD kładzie nacisk na wczesne wykrywanie problemów poprzez [bramki fazowe](/pl/jakosc/bramki-fazowe).
:::

## Wniosek o zmianę

Każda zmiana musi być formalnie zgłoszona za pomocą wniosku o zmianę (WoZ). Zapewnia to śledzalność i świadome podejmowanie decyzji.

### Szablon wniosku o zmianę

| Pole | Opis | Przykład |
|---|---|---|
| **ID zmiany** | Unikalny identyfikator | ZM-2025-012 |
| **Data zgłoszenia** | Data złożenia wniosku | 2025-05-10 |
| **Zgłaszający** | Osoba inicjująca zmianę | arch. Anna Nowak |
| **Źródło zmiany** | Przyczyna (inwestor, przepisy, budowa...) | Życzenie inwestora |
| **Faza projektu** | Aktualna faza | Projekt wykonawczy |
| **Priorytet** | Krytyczny / Wysoki / Średni / Niski | Wysoki |
| **Opis zmiany** | Co dokładnie ma się zmienić | Powiększenie salonu o 8 m2 kosztem gabinetu |
| **Uzasadnienie** | Dlaczego zmiana jest potrzebna | Zmiana sposobu użytkowania przez inwestora |
| **Dotknięte dokumenty** | Lista kart i rysunków do aktualizacji | SP-ROM-01-L00-001, SP-ROM-01-L00-003, SP-ZON-01-L00-001 |
| **Szacowany wpływ na koszt** | Wzrost / spadek kosztów | +15 000 PLN (materiały + robocizna) |
| **Szacowany wpływ na harmonogram** | Opóźnienie / bez wpływu | +5 dni roboczych |
| **Status** | Zgłoszony / W analizie / Zatwierdzony / Odrzucony | Zgłoszony |

### Priorytety zmian

| Priorytet | Definicja | Czas reakcji |
|---|---|---|
| **Krytyczny** | Blokuje dalsze prace, zagraża bezpieczeństwu lub zgodności z prawem | Natychmiast (1 dzień roboczy) |
| **Wysoki** | Istotny wpływ na zakres, koszt lub harmonogram | 3 dni robocze |
| **Średni** | Zmiana poprawiająca jakość, bez wpływu na harmonogram | 5 dni roboczych |
| **Niski** | Korekta kosmetyczna, drobne usprawnienie | Do końca bieżącej fazy |

## Analiza wpływu

Przed zatwierdzeniem zmiany należy przeprowadzić analizę wpływu obejmującą następujące obszary:

| Obszar analizy | Pytania kontrolne |
|---|---|
| **Koszt** | Jak zmiana wpływa na budżet? Czy wymaga dodatkowych nakładów? |
| **Harmonogram** | Czy zmiana opóźnia [bramkę fazową](/pl/jakosc/bramki-fazowe)? O ile dni/tygodni? |
| **Zgodność z przepisami** | Czy zmiana wymaga ponownego uzgodnienia z organem? Czy narusza [wymagania](/pl/przepisy/)? |
| **Model BIM** | Które elementy modelu wymagają aktualizacji? Czy powstaną nowe kolizje? Szczegóły w [BEP](/pl/integracja-bim/bep) |
| **Dokumentacja SP-BLD** | Które karty (Pomieszczenie, Strefa, Instalacja, Wymaganie) wymagają nowej rewizji? |
| **Inne branże** | Czy zmiana w jednej branży powoduje konieczność zmian w pozostałych? |
| **Bezpieczeństwo ppoż.** | Czy zmiana wpływa na drogi ewakuacyjne, odporność ogniową, strefy pożarowe? |
| **Pozwolenie na budowę** | Czy zmiana wymaga projektu zamiennego i nowego pozwolenia? |

::: info Projekt zamienny
Zgodnie z Prawem budowlanym, istotne odstąpienie od zatwierdzonego projektu budowlanego wymaga uzyskania decyzji o zmianie pozwolenia na budowę. Architekt prowadzący kwalifikuje, czy zmiana jest istotna czy nieistotna. Szczegóły w sekcji [Przepisy](/pl/przepisy/).
:::

## Przepływ zatwierdzania zmian

```
Zgłoszenie zmiany (WoZ)
    │
    ▼
Rejestracja w rejestrze zmian
    │
    ▼
Analiza wpływu (architekt prowadzący + branżyści)
    │
    ├── Zmiana nieistotna ──► Zatwierdzenie: architekt prowadzący
    │                              │
    │                              ▼
    │                         Aktualizacja dokumentacji
    │
    └── Zmiana istotna ──► Recenzja: inwestor + projektanci branżowi
                                │
                        ┌───────┴───────┐
                        ▼               ▼
                   Zatwierdzenie    Odrzucenie
                        │               │
                        ▼               ▼
                   Aktualizacja    Archiwizacja WoZ
                   dokumentacji   ze statusem "Odrzucony"
                   + nowa wersja
```

### Kto recenzuje, kto zatwierdza?

| Typ zmiany | Recenzent | Zatwierdzający |
|---|---|---|
| Zmiana funkcjonalna (układ pomieszczeń) | Architekt prowadzący | Inwestor |
| Zmiana konstrukcyjna | Projektant konstrukcji | Architekt prowadzący + Inwestor |
| Zmiana instalacyjna | Projektant instalacji | Architekt prowadzący |
| Zmiana wpływająca na pozwolenie | Architekt prowadzący | Organ administracji (projekt zamienny) |
| Zmiana kosztowa powyżej progu | Architekt prowadzący | Inwestor |
| Zmiana na budowie | Kierownik budowy | Inspektor nadzoru + architekt (nadzór autorski) |

## Aktualizacja dokumentacji po zmianie

Po zatwierdzeniu zmiany należy wykonać następujące kroki:

1. **Podbić wersję** dotkniętych kart (np. `v1.0` → `v2.0` dla zmian istotnych)
2. **Zaktualizować nagłówek YAML** --- pola `version`, `status`, `last_updated`, `updated_by` oraz wpis w `revision_history` z odwołaniem do numeru WoZ
3. **Nadać status `S4` (Zastąpiony)** poprzedniej wersji dokumentu
4. **Zaktualizować model BIM** --- zgodnie z procedurami [Planu realizacji BIM](/pl/integracja-bim/bep)
5. **Przeprowadzić kontrolę kolizji** po aktualizacji modelu
6. **Poinformować zespół** o zaktualizowanych dokumentach --- poprzez [CDE](/pl/integracja-bim/cde) lub kanał komunikacji projektu
7. **Zaktualizować rejestr zmian** --- nadać status `Zatwierdzony` i uzupełnić datę wdrożenia

::: tip Powiązanie z szablonami
Gotowy formularz wniosku o zmianę oraz szablon rejestru zmian znajdziesz w sekcji [Szablony](/pl/szablony/).
:::

## Lista kontrolna --- zarządzanie zmianami

- [ ] Wdrożono procedurę zgłaszania zmian (formularz WoZ)
- [ ] Ustalono progi zatwierdzania (kto zatwierdza jaki typ zmiany)
- [ ] Utworzono rejestr zmian
- [ ] Przeszkolono zespół z procedury analizy wpływu
- [ ] Zdefiniowano zasady kwalifikacji zmian istotnych i nieistotnych
- [ ] Ustalono powiązanie zmian z rewizjami dokumentów i modelu BIM
