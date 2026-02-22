# Planowanie konserwacji

Konserwacja budynku to zbiór działań mających na celu utrzymanie obiektu w stanie technicznym zapewniającym bezpieczeństwo, funkcjonalność i komfort użytkowników. Dobrze zaplanowana konserwacja obniża koszty eksploatacji o 15--30% w porównaniu z podejściem wyłącznie reaktywnym.

## Konserwacja prewencyjna vs reaktywna

| Aspekt | Prewencyjna | Reaktywna |
|--------|-------------|-----------|
| Podejście | Zaplanowane przeglądy i wymiany | Naprawa po wystąpieniu awarii |
| Koszty jednostkowe | Niższe, przewidywalne | Wyższe, nieprzewidywalne |
| Przestoje | Minimalne, zaplanowane | Nagłe, często długie |
| Żywotność urządzeń | Wydłużona o 20--40% | Skrócona |
| Wymagana dokumentacja | Harmonogramy, karty Urządzeń | Raporty z awarii |
| Optymalny udział | 70--80% działań konserwacyjnych | 20--30% działań konserwacyjnych |

::: tip Konserwacja predykcyjna
Kolejnym krokiem po konserwacji prewencyjnej jest konserwacja predykcyjna oparta na danych z [czujników IoT](/pl/integracja-bim/czujniki-iot). Zamiast serwisować urządzenie co 6 miesięcy, monitorujemy jego stan i serwisujemy, gdy parametry wskazują na zbliżające się zużycie.
:::

## Książka Obiektu Budowlanego (KOB)

Zgodnie z art. 64 Prawa budowlanego, właściciel lub zarządca obiektu jest zobowiązany do prowadzenia Książki Obiektu Budowlanego. Od 2023 roku funkcjonuje system c-KOB -- cyfrowa Książka Obiektu Budowlanego prowadzona w systemie GUNB.

### Wymagania KOB

- Wpisy o przeprowadzonych kontrolach stanu technicznego (art. 62 Prawa budowlanego)
- Protokoły z przeglądów okresowych (rocznych i pięcioletnich)
- Informacje o remontach i przebudowach
- Dokumenty dotyczące obiektu: pozwolenie na budowę, projekt, protokoły odbioru
- Dane o zmianach sposobu użytkowania

::: warning Obowiązek cyfrowej KOB
System c-KOB jest obowiązkowy dla nowych budynków oddawanych do użytkowania. Właściciele istniejących obiektów powinni przygotować się na migrację danych do systemu cyfrowego. Więcej o wymaganiach prawnych w sekcji [Odbiory i użytkowanie](/pl/przepisy/odbiory-uzytkowanie).
:::

## Karty Urządzeń w planowaniu konserwacji

Każda [karta Urządzenia](/pl/dokumentacja/encje/instancja-zasobu) w standardzie zawiera pola bezpośrednio przydatne w planowaniu konserwacji:

```yaml
urzadzenie:
  id: "HVAC-AHU-001"
  nazwa: "Centrala wentylacyjna N1"
  producent: "Systemair"
  model: "Topvex SR11"
  data_instalacji: "2024-03-15"
  gwarancja_do: "2027-03-15"
  interwal_serwisowy_miesiace: 6
  ostatni_serwis: "2025-09-20"
  nastepny_serwis: "2026-03-20"
  kontakt_serwis: "Systemair Serwis, tel. 22 123 45 67"
  uwagi: "Wymiana filtrów co 3 miesiące"
```

Dane te pozwalają automatycznie generować harmonogramy konserwacji i alerty o zbliżających się terminach przeglądów. Szablon danych opisany jest w [Szablonie Urządzenia](/pl/szablony/szablon-zasobu).

## Karty Instalacji w planowaniu konserwacji

[Karta Instalacji](/pl/dokumentacja/encje/system) opisuje cały system budynkowy i jego wymagania konserwacyjne:

```yaml
instalacja:
  id: "SYS-HVAC-01"
  nazwa: "Instalacja wentylacji mechanicznej"
  typ: "HVAC"
  urzadzenia:
    - "HVAC-AHU-001"
    - "HVAC-AHU-002"
    - "HVAC-VRF-001"
  konserwacja:
    - czynnosc: "Wymiana filtrów"
      interwal: "co 3 miesiące"
      wykonawca: "wewnętrzny"
    - czynnosc: "Przegląd centrali wentylacyjnej"
      interwal: "co 6 miesięcy"
      wykonawca: "serwis producenta"
    - czynnosc: "Czyszczenie kanałów wentylacyjnych"
      interwal: "co 2 lata"
      wykonawca: "firma specjalistyczna"
```

Szczegóły struktury opisuje [Szablon Instalacji](/pl/szablony/szablon-systemu).

## Elementy konserwacji wg systemu budynkowego

| System | Elementy konserwacji | Częstotliwość | Wykonawca |
|--------|----------------------|---------------|-----------|
| **HVAC** | Wymiana filtrów, czyszczenie wymienników, kontrola czynnika chłodniczego | 3--6 mies. | Serwis HVAC |
| **Elektryka** | Pomiary ochronne, przegląd rozdzielnic, test oświetlenia awaryjnego | 12 mies. / 5 lat | Elektryk z uprawnieniami |
| **Hydraulika** | Kontrola szczelności, odkamienianie, przegląd zaworów | 12 mies. | Hydraulik |
| **Powłoka budynku** | Kontrola pokrycia dachu, rynien, szczelności okien, elewacji | 12 mies. / 5 lat | Specjalista budowlany |
| **Ppoż.** | Test systemu sygnalizacji pożaru, przegląd gaśnic, hydrantów | 12 mies. | Firma ppoż. z uprawnieniami |
| **Dźwigi** | Przegląd techniczny, test bezpieczeństwa, konserwacja | 1 mies. / 12 mies. | Uprawniony konserwator |
| **BMS/automatyka** | Kalibracja czujników, aktualizacja oprogramowania, testy scenariuszy | 6--12 mies. | Integrator BMS |

## Kalendarz konserwacji sezonowej

### Wiosna (marzec--maj)

- [ ] Przegląd pokrycia dachowego po sezonie zimowym
- [ ] Kontrola i czyszczenie rynien i odpływów
- [ ] Przegląd elewacji -- pęknięcia, odspojenia
- [ ] Uruchomienie systemów chłodzenia
- [ ] Przegląd terenów zielonych i dróg dojazdowych
- [ ] Kontrola stanu nawierzchni i odprowadzenia wód opadowych

### Lato (czerwiec--sierpień)

- [ ] Kontrola wydajności systemów chłodzenia
- [ ] Przegląd instalacji odgromowej przed sezonem burzowym
- [ ] Sprawdzenie szczelności okien i drzwi
- [ ] Konserwacja urządzeń zewnętrznych (jednostki zewnętrzne klimatyzacji)
- [ ] Kontrola ochrony przeciwsłonecznej (żaluzje, rolety)

### Jesień (wrzesień--listopad)

- [ ] Przegląd i uruchomienie instalacji grzewczej
- [ ] Odpowietrzenie grzejników
- [ ] Czyszczenie i kontrola rynien przed zimą
- [ ] Sprawdzenie szczelności przegród zewnętrznych
- [ ] Zabezpieczenie instalacji wodnych narażonych na mróz
- [ ] Przegląd oświetlenia zewnętrznego (krótsze dni)

### Zima (grudzień--luty)

- [ ] Monitorowanie zużycia energii cieplnej
- [ ] Kontrola odśnieżania dachu (obciążenie śniegiem)
- [ ] Sprawdzenie drożności odpływów i rynien (oblodzenie)
- [ ] Utrzymanie ciągów komunikacyjnych zewnętrznych (posypywanie)
- [ ] Kontrola temperatury w pomieszczeniach technicznych (ochrona przed zamarzaniem)

::: info Powiązanie z danymi energetycznymi
Dane o sezonowym zużyciu energii pomagają optymalizować harmonogram konserwacji. Więcej o monitoringu energetycznym w sekcji [Energia i ślad węglowy](/pl/zrownowazonosc/energia-karbon).
:::

## Szablon harmonogramu konserwacji

Poniższy szablon można dostosować do konkretnego budynku. Każdy wiersz powinien być powiązany z odpowiednią kartą Urządzenia lub kartą Instalacji.

| Lp. | System / Urządzenie | Czynność | Częstotliwość | Miesiąc wykonania | Wykonawca | Karta |
|-----|----------------------|----------|---------------|---------------------|-----------|-------|
| 1 | Centrala went. N1 | Wymiana filtrów | Co 3 mies. | III, VI, IX, XII | Serwis wew. | HVAC-AHU-001 |
| 2 | Centrala went. N1 | Przegląd pełny | Co 6 mies. | III, IX | Systemair | HVAC-AHU-001 |
| 3 | Kocioł gaz. K1 | Przegląd serwisowy | Co 12 mies. | IX | Serwis Viessmann | HEAT-BLR-001 |
| 4 | Rozdzielnica gł. | Pomiary ochronne | Co 5 lat | V | Elektryk uprawn. | ELEC-MSB-001 |
| 5 | System SSP | Test pełny | Co 12 mies. | VI | Firma ppoż. | FIRE-FAS-001 |
| 6 | Dźwig osobowy | Konserwacja | Co 1 mies. | I--XII | Konserwator | LIFT-PAS-001 |

## Powiązane sekcje

- [Eksploatacja budynku -- przegląd](./) -- kontekst planowania konserwacji
- [Zarządzanie awariami](./awarie) -- co robić, gdy konserwacja nie zapobiegła problemowi
- [Faza przekazania](/pl/fazy/przekazanie) -- przekazanie dokumentacji konserwacyjnej
- [Dokumentacja powykonawcza](/pl/fazy/powykonawcza) -- źródło danych technicznych dla konserwacji
