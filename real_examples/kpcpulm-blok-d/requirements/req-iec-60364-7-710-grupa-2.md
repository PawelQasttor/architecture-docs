---
documentType: "requirement"
entityType: "requirement"
id: "REQ-IEC-60364-7-710-GR2"
requirementName: "Instalacje elektryczne w pomieszczeniach medycznych - Grupa 2"
requirementType: "safety"
countryScope: "global"
scope:
  entityType: "space"
metric: "electrical_safety_group"
operator: "=="
value: "group_2"
verification:
  method: "inspection"
  phase:
    - "construction"
    - "as_built"
version: "0.1.0"
---

# Wymaganie: IEC 60364-7-710 Grupa 2 - Bezpieczeństwo elektryczne

## Informacje podstawowe

**Typ encji:** Requirement
**ID:** REQ-IEC-60364-7-710-GR2
**Nazwa:** Instalacje elektryczne w pomieszczeniach medycznych - Grupa 2
**Typ wymagania:** Regulatory - Electrical Safety
**Status:** Obowiązkowy (mandatory)

## Źródło wymagania

### Norma
- **Oznaczenie:** IEC 60364-7-710 (PN-HD 60364-7-710)
- **Tytuł:** Instalacje elektryczne niskiego napięcia - Część 7-710: Wymagania dotyczące specjalnych instalacji lub lokalizacji - Pomieszczenia medyczne
- **Wydanie:** 2. wydanie 2012-10 (IEC), polskie tłumaczenie PN-HD 60364-7-710:2014-03
- **Status:** Norma międzynarodowa (IEC), europejska (HD), polska (PN)

### Zakres zastosowania
- Instalacje elektryczne w pomieszczeniach medycznych w obiektach opieki zdrowotnej
- Pomieszczenia, w których używana jest aparatura medyczna elektryczna
- Ochrona pacjentów przed porażeniem prądem elektrycznym

## Opis wymagania

### Grupa 2 - Definicja
Pomieszczenia medyczne, w których przewiduje się zastosowanie części aplikacyjnych aparatów medycznych do zabiegów wewnątrzserowych lub w celu podtrzymania życia, gdzie brak ciągłości zasilania może spowodować zagrożenie życia pacjenta.

### Charakterystyka grupy 2
- **Zabiegi inwazyjne na sercu** (kardiochirurgia, kardiologia inwazyjna)
- **Podtrzymanie życia** (OIOM, respiratory, wentylacja mechaniczna)
- **Kontakt części aplikacyjnych z obszarem serca** (elektrody wewnątrzsercowe)
- **Krytyczność zasilania:** przerwanie > 0,5s może spowodować śmierć pacjenta

### Pomieszczenia w grupie 2 (w projekcie Bloku D)
1. Sale operacyjne (2.46, 2.50)
2. Sale przygotowania pacjenta (2.44, 2.49)
3. Sala wybudzeń (2.59)
4. Sale chorych OIOM (2.6, 2.9, 2.12)

## Wymagania techniczne

### 1. System zasilania IT (transformator separacyjny)

#### 1.1. Transformator izolacyjny
- **Typ:** transformator separacyjny (izolacyjny) dla każdego pomieszczenia grupy 2 osobno
- **Moc znamionowa:** minimum 10 kVA (zależnie od obciążenia pomieszczenia)
- **Napięcie:** 230V AC (wejście i wyjście)
- **Izolacja:** podwójna izolacja między uzwojeniem pierwotnym a wtórnym
- **Lokalizacja:** pomieszczenie techniczne (blisko pomieszczenia medycznego, ale poza nim)
- **Norma:** IEC 61558-2-15 (transformatory dla zastosowań medycznych)

#### 1.2. Brak połączenia galwanicznego z ziemią
- Sieć IT: **brak bezpośredniego uziemienia** punktu neutralnego
- Przewód PE (ochronny) jest podłączony, ale **nie przewodzi prądu roboczego**
- Pierwsze uszkodzenie izolacji (faza → PE) **nie powoduje** przerwania zasilania (prąd uszkodzeniowy pomijalnie mały)

#### 1.3. Zakaz współdzielenia transformatora
- **Każde pomieszczenie grupy 2** ma osobny transformator IT
- **Zakaz:** jeden transformator dla 2 sal operacyjnych (ryzyko propagacji uszkodzenia)
- **Wyjątek:** sala operacyjna + bezpośrednio sąsiadujące pomieszczenia pomocnicze (np. przygotowanie lekarzy) - jeśli spełniają warunki

### 2. Monitoring izolacji

#### 2.1. Urządzenie monitorujące (IMD - Insulation Monitoring Device)
- **Funkcja:** ciągły pomiar rezystancji izolacji sieci IT względem ziemi
- **Próg alarmowy:** spadek izolacji < 50 kΩ (dla 230V, wg IEC 60364-7-710)
- **Alarm wizualny:** lampka LED (zielona = OK, żółta = ostrzeżenie, czerwona = alarm)
- **Alarm dźwiękowy:** sygnał dźwiękowy (możliwość wyciszenia, ale lampka świeci)
- **Lokalizacja alarmu:** widoczna w pomieszczeniu medycznym (dla personelu) + dyżurka techniczna

#### 2.2. Test przed zabiegiem (sala operacyjna)
- **Procedura:** test przycisku TEST na urządzeniu IMD przed każdym zabiegiem
- **Oczekiwany wynik:** lampka zielona (izolacja > 50 kΩ), brak alarmu
- **Jeśli alarm:** sprawdzenie instalacji przez elektryka, zabieg po usunięciu uszkodzenia

#### 2.3. Postępowanie przy alarmie podczas zabiegu
- **Nie przerywać zabiegu** (system IT nadal zapewnia bezpieczeństwo)
- **Odłączać aparaty po kolei** (identyfikacja uszkodzonego aparatu)
- **Powiadomić służby techniczne** (naprawa po zakończeniu zabiegu)

### 3. Zasilanie awaryjne

#### 3.1. Czas przełączenia
- **Wymaganie dla grupy 2:** przełączenie < 0,5s
- **Metoda:** automatyczna stacja zasilania awaryjnego (SZR) z agregatem prądotwórczym
- **Norma:** IEC 60364-7-710, klauzula 710.560.5

#### 3.2. Agregat prądotwórczy
- **Typ:** agregat spalinowy (diesel lub gaz) z automatycznym rozruchem
- **Czas rozruchu:** < 15s (od zaniku sieci do stabilnego napięcia agregatu)
- **Przełączenie:** automatyczne (SZR), bez udziału operatora
- **Moc:** pokrycie 100% mocy wszystkich obwodów grupy 2 + 50% rezerwy
- **Test:** automatyczny test raz w tygodniu (rozruch bez przełączenia obciążenia)

#### 3.3. UPS (Uninterruptible Power Supply)
- **Funkcja:** zasilanie awaryjne aparatury podtrzymującej życie (0-0,5s, do momentu uruchomienia agregatu)
- **Moc:** 5-10 kVA na pomieszczenie grupy 2
- **Czas podtrzymania:** minimum 30 minut przy pełnym obciążeniu
- **Typ:** UPS online (double-conversion, brak przerwy zasilania)
- **Aparatura zasilana z UPS:**
  - Respiratory (OIOM)
  - Monitory pacjenta (EKG, SpO₂, NIBP)
  - Pompy infuzyjne (leki podtrzymujące życie)
  - Aparat anestezjologiczny (blok operacyjny)

#### 3.4. Redundancja zasilania
- **Schemat zasilania:**
  1. Sieć energetyczna (główna) → UPS → transformator IT → pomieszczenie grupy 2
  2. Agregat prądotwórczy (awaryjna) → UPS → transformator IT → pomieszczenie grupy 2
- **Przełączenie:** automatyczne przy zaniku sieci (< 0,5s dla grupy 2)

### 4. Wyrównanie potencjałów

#### 4.1. Szyna EPR (Equipotential Bonding Rail)
- **Lokalizacja:** w każdym pomieszczeniu grupy 2 (na ścianie, wysokość 0,3-0,5m)
- **Materiał:** szyna miedziana, przekrój min. 10 mm² (zalecane 25 mm²)
- **Oznakowanie:** tabliczka "SZYNA WYRÓWNANIA POTENCJAŁÓW" (trójkąt ostrzegawczy)
- **Połączenia:** wszystkie metalowe części w pomieszczeniu:
  - Stół operacyjny (metalowa konstrukcja)
  - Lampy operacyjne (metalowe ramiona)
  - Obudowy aparatury medycznej (jeśli metalowe)
  - Rury instalacyjne (woda, gazy medyczne, jeśli metalowe)
  - Konstrukcje sufitowe (szyny sufitowe, konstrukcje nośne lamp)
  - Ekrany elektromagnetyczne (jeśli są)

#### 4.2. Rezystancja połączeń
- **Wymaganie:** rezystancja między szyną EPR a każdym metalowym elementem < 0,2 Ω
- **Pomiar:** miernik rezystancji (micro-ohmmeter), metoda 4-przewodowa
- **Częstotliwość pomiarów:** raz w roku (przegląd techniczny) + po każdej zmianie wyposażenia

#### 4.3. Przekroje przewodów wyrównania potencjałów
- **Szyna EPR → metalowe części stałe (stół, lampy):** min. 6 mm² Cu
- **Szyna EPR → aparatura medyczna przenośna:** min. 2,5 mm² Cu (jeśli nie ma połączenia przez wtyk Schuko)

### 5. Gniazdka elektryczne

#### 5.1. Gniazdka w pomieszczeniach grupy 2
- **Typ:** gniazdka z uziemieniem (Schuko) lub gniazdka specjalne (IEC 60320 C13/C19)
- **Kolor:** zielony (dla gniazdek zasilanych z systemu IT z monitoringiem izolacji)
- **Oznakowanie:** etykieta "System IT - Grupa 2"
- **Liczba:** min. 16-24 gniazdek na salę operacyjną/OIOM (zależnie od wyposażenia)

#### 5.2. Rozmieszczenie gniazdek
- **Wokół stołu operacyjnego/łóżka:** 8-12 gniazdek (dla aparatury medycznej)
- **Ściany boczne:** 4-8 gniazdek (dla aparatury pomocniczej)
- **Sufitowe (opcjonalnie):** gniazdka na szynach sufitowych (dla lamp, aparatury podwieszonej)

### 6. Oświetlenie

#### 6.1. Oświetlenie awaryjne
- **Zasilanie:** UPS (minimum 30 minut)
- **Poziom oświetlenia awaryjnego:** min. 50% oświetlenia roboczego (minimum 500 lx w sali operacyjnej)
- **Funkcja:** umożliwienie dokończenia zabiegu w razie zaniku sieci

### 7. Dokumentacja i testy

#### 7.1. Dokumentacja wymagana
- **Schematy instalacji elektrycznych:** rozmieszczenie transformatorów IT, UPS, agregatu, obiegów IT
- **Protokoły pomiarów:** wyrównanie potencjałów (< 0,2 Ω), izolacja sieci IT (> 50 kΩ)
- **Instrukcje:** instrukcje bezpieczeństwa elektrycznego dla personelu medycznego i technicznego

#### 7.2. Testy okresowe
- **Wyrównanie potencjałów:** raz w roku (pomiar rezystancji < 0,2 Ω)
- **Monitoring izolacji:** test przed każdym zabiegiem (sala operacyjna), raz dziennie (OIOM)
- **UPS:** test raz w miesiącu (symulacja zaniku sieci, pomiar czasu podtrzymania)
- **Agregat:** test raz w tygodniu (automatyczny rozruch bez przełączenia)

#### 7.3. Rejestr testów
- **Forma:** dziennik testów (papierowy lub elektroniczny)
- **Zawartość:** data testu, typ testu, wynik, uwagi, osoba przeprowadzająca
- **Przechowywanie:** minimum 5 lat

## Uzasadnienie wymagania

### Ochrona pacjenta przed porażeniem prądem
- **Prąd uszkodzeniowy:** w systemie TN-S przy uszkodzeniu izolacji (faza → obudowa) prąd uszkodzeniowy może wynieść **kilka amperów** (I = 230V / Z_pętli)
- **Ryzyko dla pacjenta:** pacjent pod narkozą, zwiotczenie mięśni, brak możliwości oderwania się od źródła prądu
- **Prąd fibrylacji komór serca:** **< 10 mA** (dla prądu AC 50 Hz bezpośrednio do serca)
- **System IT:** przy pierwszym uszkodzeniu izolacji prąd uszkodzeniowy jest **pomijalnie mały** (< 1 mA), dzięki braku uziemienia punktu neutralnego

### Ciągłość zasilania
- **Aparatura podtrzymująca życie:** respiratory (OIOM), pompy infuzyjne (leki wazopresory)
- **Przerwanie zasilania > 0,5s:** może spowodować śmierć pacjenta (zatrzymanie krążenia, niedotlenienie mózgu)
- **Zasilanie awaryjne < 0,5s:** zapewnia ciągłość zasilania aparatury podtrzymującej życie

## Pomieszczenia objęte wymaganiem

### Blok D - I Piętro

#### Blok operacyjny
- `SPC-KPCPULM-D-2-46` - Sala operacyjna 1 (45,85 m²)
- `SPC-KPCPULM-D-2-50` - Sala operacyjna 2 (43,55 m²)
- `SPC-KPCPULM-D-2-44` - Przygotowanie chorego 1 (13,10 m²)
- `SPC-KPCPULM-D-2-49` - Przygotowanie chorego 2 (12,38 m²)
- `SPC-KPCPULM-D-2-59` - Sala wybudzeń (35,48 m²)

#### OIOM
- `SPC-KPCPULM-D-2-6` - Sala chorych OIOM 1 (67,64 m²)
- `SPC-KPCPULM-D-2-9` - Sala chorych OIOM 2 (48,56 m²)
- `SPC-KPCPULM-D-2-12` - Izolatka OIOM (20,63 m²)

## Strefy objęte wymaganiem

- `ZONE-MED-GRUPA-2` - Strefa medyczna grupa 2 (IEC 60364-7-710)

## Sankcje za niespełnienie wymagania

### Prawne
- **Brak możliwości uzyskania pozwolenia na użytkowanie** (obiekt niespełniający norm bezpieczeństwa)
- **Odpowiedzialność karna:** w przypadku wypadku (porażenie prądem, śmierć pacjenta z powodu zaniku zasilania)

### Finansowe
- **Koszty naprawy:** demontaż instalacji TN-S, montaż instalacji IT (transformatory, monitoring, UPS)
- **Opóźnienie uruchomienia** szpitala (brak certyfikacji, przeglądy)

### Medyczne
- **Zagrożenie życia pacjentów:** brak ochrony przed porażeniem prądem, brak ciągłości zasilania aparatury podtrzymującej życie
- **Utrata akredytacji:** szpital może stracić akredytację (niespełnienie standardów bezpieczeństwa)

## Odpowiedzialność za spełnienie wymagania

### Projektant instalacji elektrycznych
- Opracowanie projektu instalacji IT dla pomieszczeń grupy 2
- Dobór transformatorów IT, urządzeń monitoringu izolacji, UPS, agregatu
- Obliczenia obciążeń, spadków napięć, prądów zwarciowych

### Wykonawca instalacji elektrycznych
- Wykonanie instalacji IT zgodnie z projektem
- Montaż transformatorów IT, urządzeń monitoringu, UPS, agregatu
- Wykonanie wyrównania potencjałów (szyna EPR, połączenia)

### Inspektor nadzoru budowlanego
- Kontrola zgodności wykonania z projektem
- Odbiór instalacji (próby, pomiary)

### Użytkownik (szpital)
- Przeprowadzanie testów okresowych (wyrównanie potencjałów, monitoring izolacji, UPS, agregat)
- Szkolenie personelu (obsługa systemu IT, postępowanie przy alarmach)
- Prowadzenie rejestru testów

## Powiązane normy i przepisy

### Normy IEC
- **IEC 60364-7-710:** Instalacje elektryczne w pomieszczeniach medycznych
- **IEC 61558-2-15:** Transformatory separacyjne dla zastosowań medycznych
- **IEC 60601 (seria):** Wyroby medyczne elektryczne (aparatura medyczna)

### Przepisy polskie
- **Rozporządzenie Ministra Zdrowia** w sprawie wymagań, jakim powinny odpowiadać pomieszczenia i urządzenia podmiotu wykonującego działalność leczniczą
- **Prawo budowlane** (ustawa z dnia 7 lipca 1994 r.)

## Stan cyklu życia

- **Status:** Obowiązkowy (mandatory), planned (projektowany)

## Metadane

- **Grupa bezpieczeństwa:** Grupa 2 (najwyższa)
- **Norma:** IEC 60364-7-710
- **Koszty:** Wysokie (transformatory IT, UPS, agregat, monitoring izolacji)
- **Priorytet:** Krytyczny (brak spełnienia = brak możliwości użytkowania sal operacyjnych/OIOM)
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.1.3

---

**Uwagi:** Wymaganie IEC 60364-7-710 grupa 2 jest **obowiązkowe** dla wszystkich pomieszczeń, w których przewiduje się zabiegi inwazyjne na sercu lub podtrzymanie życia pacjenta. System zasilania IT z monitoringiem izolacji, zasilanie awaryjne < 0,5s oraz wyrównanie potencjałów są **kluczowe** dla bezpieczeństwa pacjentów. Projektant, wykonawca i użytkownik muszą ściśle współpracować, aby zapewnić spełnienie wszystkich wymagań normy.
