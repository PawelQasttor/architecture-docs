---
title: Gospodarka wodna
description: Retencja wód opadowych, nawierzchnie przepuszczalne, zielona infrastruktura, armatura wodooszczędna, odzysk wody szarej — dokumentacja w standardzie architektonicznym.
---

# Gospodarka wodna

Gospodarka wodna w projektach budowlanych obejmuje dwa cele: **zagospodarowanie wód opadowych na działce** (retencja, infiltracja, kontrolowane odprowadzanie) oraz **ograniczenie zużycia wody pitnej** (armatura wodooszczędna, zbieranie deszczówki, odzysk wody szarej). Polskie przepisy wymagają uwzględnienia obu tych aspektów, a ich prawidłowe udokumentowanie jest niezbędne do uzyskania pozwolenia na budowę.

## Wymagania retencji wód opadowych

### Ramy prawne

| Przepis | Zakres | Główne wymaganie |
|---|---|---|
| Prawo wodne | Odprowadzanie wód opadowych | Zagospodarowanie na działce; odprowadzanie do kanalizacji wymaga pozwolenia wodnoprawnego |
| [WT 2021](/pl/przepisy/wt-2021) | Odwodnienie terenu | Wymagania dotyczące odprowadzania wód i powierzchni biologicznie czynnej |
| MPZP / decyzja WZ | Warunki zabudowy | Minimalny udział powierzchni przepuszczalnych, max zabudowa działki |
| Prawo budowlane | Pozwolenie na budowę | Wniosek musi obejmować rozwiązania odprowadzania wód opadowych |
| Przepisy lokalne (gminy) | Taryfy i limity | Opłaty za odprowadzanie wód do kanalizacji, dopuszczalny odpływ |

::: warning
Od 2018 r. odprowadzanie wód opadowych do kanalizacji ogólnospławnej podlega opłatom naliczanym od m³. Retencja na działce to dziś nie tylko wymóg prawny, ale i ekonomiczny. Sprawdź lokalne taryfy przy kalkulacji kosztów projektu.
:::

### Wymagania lokalne

Wymagania retencji mogą się znacząco różnić w zależności od gminy. Przed rozpoczęciem projektu ustal:

1. **Dopuszczalny odpływ** — od zarządcy sieci kanalizacyjnej lub organu wodnego
2. **Minimalną powierzchnię biologicznie czynną** — z MPZP lub decyzji WZ
3. **Opad miarodajny** — natężenie i prawdopodobieństwo (zwykle p=20% lub p=10%)
4. **Zdolność infiltracyjną gruntu** — z badania geotechnicznego

::: info
Powierzchnie częściowo przepuszczalne (kostka ażurowa, żwir, dachy zielone) mogą być częściowo zaliczane do powierzchni biologicznie czynnej. Dachy zielone z substratem ≥ 20 cm uwzględnia się zwykle w 50–80%. Potwierdź interpretację w urzędzie planistycznym.
:::

## Efektywność wodna: armatura

Dobieraj armaturę ograniczającą zużycie wody pitnej bez obniżania komfortu użytkownika:

| Armatura | Standardowy przepływ | Wariant wodooszczędny | Oszczędność |
|---|---|---|---|
| WC — podwójny spłuk | 6 / 9 litrów | 3 / 4,5 litra | 40–50% |
| Bateria umywalkowa | 12 l/min | 5 l/min (napowietrzana) | 55–60% |
| Bateria kuchenna | 12 l/min | 7 l/min (napowietrzana) | 40% |
| Słuchawka prysznicowa | 12 l/min | 7–8 l/min | 35–40% |
| Pisuar | 3 l/spłukiwanie | 1 l lub bezwodny | 65–100% |

Specyfikację armatury dokumentuj w kartach Instalacji (instalacja wodno-kanalizacyjna) z odwołaniem do kart Urządzeń dla poszczególnych punktów czerpalnych.

## Zarządzanie wodami opadowymi

### Nawierzchnie przepuszczalne

| Typ nawierzchni | Infiltracja (mm/h) | Współczynnik spływu (phi) | Koszt |
|---|---|---|---|
| Trawnik / grunt naturalny | 10–50 | 0,10–0,20 | Niski |
| Żwir / kruszywo | 30–100 | 0,05–0,15 | Niski |
| Kostka ażurowa | 20–80 | 0,20–0,40 | Średni |
| Asfalt porowaty | 15–40 | 0,30–0,50 | Średni–wysoki |
| Asfalt / beton tradycyjny | 0 | 0,85–0,95 | Referencyjny |

### Zbiorniki retencyjne

Wymiarowanie zbiornika retencyjnego:

**V = (A x q x t x phi) - (Q_odp x t)**

Gdzie: V = pojemność retencji (m³), A = powierzchnia zlewni (m²), q = natężenie opadu (l/s/m²), t = czas trwania opadu (s), phi = współczynnik spływu, Q_odp = dopuszczalny odpływ (m³/s).

Typy zbiorników:

- **Zbiornik retencyjny podziemny** — skrzynki rozsączające lub zbiornik betonowy; nie zajmuje terenu
- **Zbiornik retencyjny naziemny** — może pełnić funkcję krajobrazową
- **Zbiornik opóźniający** — suchy basen napełniający się tymczasowo; może być rekreacyjny
- **Rów infiltracyjny** — odpowiedni przy dobrej przepuszczalności gruntu

### Dachy zielone

| Parametr | Ekstensywny | Półintensywny | Intensywny |
|---|---|---|---|
| Grubość substratu | 60–150 mm | 150–300 mm | > 300 mm |
| Ciężar (nasycony) | 60–150 kg/m² | 150–300 kg/m² | > 300 kg/m² |
| Retencja roczna | 30–50% | 40–60% | 50–80% |
| Konserwacja | Niska (2x/rok) | Średnia (4x/rok) | Wysoka (regularna) |
| Wpływ na konstrukcję | Minimalny | Umiarkowany | Znaczący |

::: tip
Dachy zielone przyczyniają się do poprawy efektywności termicznej (zmniejszenie obciążeń chłodniczych latem) i wydłużenia trwałości membrany dachowej. Udokumentuj dodatkowe korzyści energetyczne w [sekcji energetycznej](./energia-karbon) i uwzględnij w obliczeniach EP.
:::

### Ogrody deszczowe i bioretencja

- Płytkie, obsadzone roślinami zagłębienia zbierające i infiltrujące spływ powierzchniowy
- Typowa głębokość: 150–300 mm spiętrzenia, 300–600 mm substratu filtracyjnego
- Nasadzenia: gatunki rodzime tolerujące okresowe zalanie i suszę
- Odpowiednie do parkingów, krawędzi dróg, terenów rekreacyjnych

## Recykling wody szarej

Woda szara (z pryszniców, umywalek i wanien — z wyłączeniem toalet i kuchni) może być uzdatniona i ponownie wykorzystana do spłukiwania toalet i podlewania.

| Parametr | Typowa wartość |
|---|---|
| Produkcja wody szarej | 50–80 l/osobę/dzień |
| Stopień odzysku po uzdatnieniu | 70–85% |
| Ponowne zastosowanie | Spłukiwanie toalet, podlewanie |
| Wymagane uzdatnianie | Filtracja, oczyszczanie biologiczne, dezynfekcja |
| Okres zwrotu | 8–15 lat (mieszkaniowe), 5–8 lat (komercyjne) |

::: info
Odzysk wody szarej jest najbardziej opłacalny w dużych zespołach mieszkaniowych (powyżej 50 lokali), hotelach i obiektach sportowych. W domach jednorodzinnych bardziej praktyczne jest zbieranie wody deszczowej.
:::

::: warning
Instalacja wody szarej i deszczowej musi być całkowicie oddzielona od instalacji wody pitnej i wyraźnie oznakowana „woda niepitna". Polskie przepisy sanitarne zabraniają jakiegokolwiek połączenia krzyżowego. Udokumentuj rozdzielenie na rysunkach instalacyjnych i w kartach Instalacji.
:::

## Mapowanie na dokumentację

Gospodarka wodna obejmuje kilka typów kart w standardzie:

| Element | Typ karty | Pole YAML | Przykład |
|---|---|---|---|
| System wodociągowy | Instalacja | `typ: woda_pitna` | Instalacja wody zimnej i ciepłej |
| System kanalizacji deszczowej | Instalacja | `typ: kanalizacja_deszczowa` | Odprowadzanie wód opadowych |
| System retencji | Instalacja | `typ: retencja` | Zbiornik retencyjny 25 m³ |
| System wody szarej | Instalacja | `typ: woda_szara` | Uzdatnianie i recyrkulacja |
| Strefa odwadniania | Strefa | `typ: odwadnianie` | Zlewnia parkingu północnego |
| Strefa dachu zielonego | Strefa | `typ: dach_zielony` | Dach zielony — budynek A |
| Armatura wodooszczędna | Urządzenie | `przeplyw_l_min`, `splukiwanie_l` | Bateria umywalkowa 5 l/min |
| Zbiornik retencyjny | Urządzenie | `pojemnosc_m3`, `odpływ_max` | Skrzynki rozsączające 25 m³ |
| Wymaganie retencji | Wymaganie | `retencja_min_m3`, `odpływ_dopuszczalny` | V ≥ 25 m³, Q ≤ 5 l/s |

## Strategie gospodarki wodnej i ich dokumentacja

| Strategia | Jednorodzinny | Wielorodzinny | Biurowiec | Handel | Dokumentacja |
|---|---|---|---|---|---|
| Nawierzchnia przepuszczalna | Zalecane | Wymagane | Wymagane | Wymagane | Plan zagospodarowania, karta Strefy |
| Dach zielony | Opcjonalne | Zalecane | Zalecane | Zalecane | Karta Strefy + karta Instalacji |
| Bioretencja | Zalecane | Zalecane | Zalecane | Wymagane | Plan zagospodarowania |
| Zbiornik retencyjny | Wg działki | Wymagane | Wymagane | Wymagane | Karta Urządzenia + obliczenia |
| Zbieranie deszczówki | Zalecane | Zalecane | Zalecane | Zalecane | Karta Instalacji |
| Odzysk wody szarej | Rzadko | Powyżej 50 lokali | Opłacalny | Duże obiekty | Karta Instalacji |
| Armatura wodooszczędna | Wymagane | Wymagane | Wymagane | Wymagane | Karty Urządzeń |

Dane o gospodarce wodnej mogą być synchronizowane z modelem [BIM](/pl/integracja-bim/) — zbiorniki, trasy rurociągów i strefy odwadniania jako obiekty w modelu. [Czujniki IoT](/pl/integracja-bim/czujniki-iot) (wodomierze, czujniki poziomu w zbiornikach) umożliwiają monitoring w [fazie eksploatacji](/pl/eksploatacja/).

## Lista kontrolna: dokumentacja wodna wg fazy

### [Koncepcja](/pl/fazy/koncepcja)
- [ ] Wstępna analiza warunków gruntowo-wodnych (infiltracja, poziom wód gruntowych)
- [ ] Ustalenie wymagań MPZP dotyczących powierzchni biologicznie czynnej
- [ ] Wstępna strategia retencji (typ zbiornika, lokalizacja)
- [ ] Identyfikacja możliwości zbierania deszczówki i odzysku wody szarej

### [Projekt wstępny](/pl/fazy/wstepny)
- [ ] Obliczenie powierzchni nieprzepuszczalnych i współczynników spływu
- [ ] Obliczenie pojemności retencji z parametrami opadu miarodajnego
- [ ] Uzyskanie informacji o dopuszczalnym odpływie od zarządcy sieci
- [ ] Koncepcja zielonej infrastruktury na planie zagospodarowania

### [Projekt budowlany](/pl/fazy/budowlany)
- [ ] Wymiarowanie zbiornika retencyjnego (obliczenia hydrauliczne)
- [ ] Projekt nawierzchni przepuszczalnych z bilansem powierzchni
- [ ] Projekt dachu zielonego (jeśli dotyczy) — substrat, roślinność, retencja
- [ ] Karty Instalacji dla systemów wodnych (wodociąg, kanalizacja, retencja)
- [ ] Zestawienie armatury wodooszczędnej w kartach Urządzeń
- [ ] Rozdzielenie instalacji wody pitnej i niepitnej na rysunkach

### [Projekt wykonawczy](/pl/fazy/wykonawczy)
- [ ] Szczegóły montażowe zbiorników retencyjnych i skrzynek rozsączających
- [ ] Specyfikacja automatyki przełączania (deszczówka / wodociąg)
- [ ] Oznakowanie instalacji wody niepitnej

### [Przekazanie](/pl/fazy/przekazanie)
- [ ] Dokumentacja powykonawcza systemów retencji (rzeczywiste pojemności)
- [ ] Instrukcja [konserwacji](/pl/eksploatacja/konserwacja) filtrów, zbiorników, pomp
- [ ] Plan monitoringu zużycia wody w [fazie eksploatacji](/pl/eksploatacja/)
- [ ] [Bramka fazowa](/pl/jakosc/bramki-fazowe) — potwierdzenie zgodności z wymaganiami retencji i zużycia wody
