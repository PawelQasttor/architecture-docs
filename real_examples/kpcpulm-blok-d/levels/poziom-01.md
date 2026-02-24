---
documentType: "level"
entityType: "level"
id: "LVL-KPCPULM-D-PIETRO-01"
levelName: "I Piętro (First Floor)"
buildingId: "BLD-KPCPULM-BLOK-D"
levelNumber: 1
version: "0.1.0"
---

# Poziom: I Piętro - Blok D

## Informacje podstawowe

**Typ encji:** Level
**ID:** LVL-KPCPULM-D-PIETRO-01
**Nazwa:** I Piętro (First Floor)
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Numer poziomu:** 1
**Rzędna:** ~73,7-75,1 m n.p.m.

## Opis

Poziom I piętra zawiera najbardziej krytyczne funkcje medyczne: Oddział Anestezjologii i Intensywnej Terapii (OIOM) z 3 salami chorych, Blok Operacyjny z 2 salami operacyjnymi, oraz Aptekę Szpitalną. To poziom o najwyższych wymaganiach technicznych i instalacyjnych.

## Dane techniczne

### Powierzchnie
- **Powierzchnia użytkowa poziomu:** 1 497,03 m²
- **Liczba pomieszczeń:** 92 (2.1 - 2.92)

### Wysokości
- **Wysokość kondygnacji:** 4,50 m
- **Wysokość pomieszczeń w świetle:**
  - Sale operacyjne: 3,50 m
  - Sale chorych OIOM: 3,20 m
  - Pozostałe pomieszczenia medyczne: 3,00 m

### Konstrukcja
- **Ściany zewnętrzne:** bloczki SILKA gr. 24cm, ocieplone wełną mineralną gr. 15cm
- **Ściany wewnętrzne konstrukcyjne:** bloczki SILKA gr. 24cm
- **Ściany oddzielające sale operacyjne:** wzmocnione akustycznie
- **Stropy:** żelbetowe monolityczne

## Właściwości dziedziczone dla przestrzeni

### Wykończenie typowe (OIOM, blok operacyjny - pomieszczenia medyczne)

#### Podłogi
- **Materiał:** wykładzina PCW przewodząca elektrostatycznie (sale operacyjne, OIOM) lub płytki ceramiczne (korytarze, pozostałe pomieszczenia)
- **Parametry:**
  - Bezspoinowa (sale operacyjne)
  - Antypoślizgowa
  - Klasa ścieralności IV
  - Odporna na dezynfekcję (aldehydy, chlor)
  - Antyelektrostatyczna (opór powierzchniowy 10⁴-10⁶ Ω)
- **Uwagi:** fugi epoksydowe (płytki), wykończenie cokolika bezprogowe

#### Ściany
- **Materiał:**
  - Sale operacyjne: płytki ceramiczne glazurowane do sufitu, naroża zaokrąglone
  - OIOM sale chorych: płytki ceramiczne do wysokości 2,0m, powyżej tynk gładki, farba zmywalna
  - Korytarze: tynk gładki, farba zmywalna, osłony antyzderz.
- **Parametry:**
  - Jasne kolory (biały, kremowy, zielony pastelowy w bloku operacyjnym)
  - Powierzchnia gładka, bezprzewodowa (sale operacyjne)
  - Łatwość czyszczenia i dezynfekcji
  - Odporność na uderzenia (korytarze)

#### Sufity
- **Materiał:**
  - Sale operacyjne: sufit podwieszany modułowy szczelny z panelami laminarnego przepływu powietrza (LAF) nad stołem operacyjnym
  - OIOM: sufit podwieszany modułowy (płyty 60×60cm)
  - Pozostałe: sufit podwieszany standardowy
- **Parametry:**
  - Biały
  - Klasa czystości medycznej
  - Dostęp do instalacji (rewizje)
  - Szyny sufitowe dla aparatury (sale operacyjne, OIOM)

### Wykończenie apteki

#### Podłogi (apteka)
- **Materiał:** płytki ceramiczne lub tarkett medyczny
- **Parametry:** łatwość czyszczenia, odporność chemiczna

#### Ściany (pracownie apteczne)
- **Materiał:** płytki ceramiczne do wysokości 2,0m lub całkowicie (w zależności od funkcji)
- **Parametry:** odporne na substancje chemiczne

### Warunki środowiskowe

#### Temperatura
- **Sale operacyjne:** 20-24°C (regulowana indywidualnie, zgodnie z typem zabiegu)
- **Sale chorych OIOM:** 22-24°C
- **Przygotowanie pacjenta, wybudzenia:** 24-26°C
- **Korytarze bloku operacyjnego:** 22-24°C
- **Apteka:** 20-22°C (pracownie), 18-22°C (magazyny)

#### Wilgotność
- **Sale operacyjne:** 40-60% RH (kontrolowana ściśle)
- **OIOM:** 40-60% RH
- **Apteka:** 40-60% RH (magazyny leków)

#### Wentylacja
- **Sale operacyjne:**
  - Nadciśnienie: +15 Pa względem korytarza
  - Filtracja: HEPA (H14)
  - Wymiana powietrza: 20-25 wymian/h
  - Przepływ laminarny (LAF) nad stołem operacyjnym: klasa ISO 5
  - 100% powietrze świeże (bez recyrkulacji)
- **OIOM sale chorych:**
  - Nadciśnienie: +10 Pa względem korytarza
  - Filtracja: HEPA (H13)
  - Wymiana powietrza: 12-15 wymian/h
- **Przygotowanie pacjenta, wybudzenia:**
  - Nadciśnienie: +10 Pa
  - Filtracja: HEPA (H13)
  - 12 wymian/h
- **Korytarze bloku operacyjnego:**
  - Nadciśnienie: +5 Pa względem klatek schodowych
  - Filtracja: F7
  - 8-10 wymian/h
- **Apteka:**
  - Preparatyka cytostatyków: podciśnienie -15 Pa, komora laminarna klasy II
  - Pozostałe pomieszczenia: 6-8 wymian/h

#### Ciśnienie
- Schemat kaskady ciśnień (blok operacyjny):
  - Sala operacyjna: +15 Pa
  - Śluza materiałowa / przygotowanie lekarzy: +10 Pa
  - Korytarz strefy czystej: +5 Pa
  - Klatka schodowa: 0 Pa (referencja)
  - Strona brudna bloku: -5 Pa

#### Oświetlenie
- **Naturalne:** ograniczone (okna w korytarzach i pomieszczeniach pomocniczych)
- **Sztuczne:**
  - Sale operacyjne: oświetlenie ogólne 1000 lx, lampy operacyjne bezcieniowe 100 000 lx (pole operacyjne)
  - OIOM: 500 lx (praca), 50 lx (noc, nad łóżkiem regulowane)
  - Korytarze: 300 lx
  - Apteka: 500 lx (pracownie), 300 lx (magazyny)

### Czystość powietrza
- **Sale operacyjne - strefa operacyjna (LAF):** klasa ISO 5 (wg ISO 14644-1)
- **Sale operacyjne - strefa ogólna:** klasa ISO 7
- **OIOM:** klasa ISO 8
- **Korytarze bloku:** klasa ISO 8
- **Apteka - preparatyka:** klasa II komory LAF

## Funkcje główne

### Oddział Anestezjologii i Intensywnej Terapii - OIOM (394,76 m²)
- 3 sale chorych (łącznie ~8-12 łóżek intensywnej terapii)
- Pokoje przygotowania pielęgniarek
- Pokoje lekarzy (anestezjolodzy, ordynator, oddzia łowa)
- Brudowniki, magazyny, pomieszczenia pomocnicze
- WC dla odwiedzających, WC dla personelu
- Śluza pacjentów (wejście kontrolowane)

### Blok operacyjny (525,40 m²)
- 2 sale operacyjne (45,85 m² i 43,55 m²)
- Sale przygotowania pacjenta (przed operacją)
- Sale przygotowania lekarzy (mycie chirurgiczne)
- Sala wybudzeń (35,48 m²)
- Śluza pacjentów (wejście i wyjście)
- Szatnie personelu (rozdzielone na damskie i męskie, z łazienkami)
- Magazyny sterylne, magazyn sprzętu i aparatury
- Strona brudna bloku (ekspedycja brudna, śluza)
- Pokoje administracyjne i socjalne
- Pomieszczenie podtlenku azotu (8,24 m²)

### Apteka szpitalna (276,01 m², częściowo w bloku C)
- Ekspedycja z magazynem leków doustnych
- Magazyn płynów infuzyjnych i ampułek
- Receptura (przygotowanie leków)
- Preparatyka cytostatyków (komora laminarna klasy II)
- Pracownia żywienia dojelitowego
- Destylatornia
- Magazyny (opatrunki, jednorazówki)
- Pokoje opisów, pokój kierownika
- Pokój socjalny, łazienka
- Komora dostaw (dostawa farmaceutyków)

## Strefy

### Strefa pożarowa
- **ID:** `ZONE-FIRE-ZL-IV`
- **Klasa:** ZL IV

### Strefy medyczne wg IEC 60364-7-710

#### Grupa 2 (zagrożenie życia - zabiegi na sercu, podtrzymanie życia)
- Sala operacyjna 1 (2.46)
- Sala operacyjna 2 (2.50)
- Przygotowanie chorego 1 (2.44)
- Przygotowanie chorego 2 (2.49)
- Sala wybudzeń (2.59)
- Sala chorych OIOM 1 (2.6)
- Sala chorych OIOM 2 (2.9)
- Sala chorych OIOM 3 (2.12)

**Wymagania grupa 2:**
- System zasilania IT (transformator separacyjny) z monitoringiem izolacji
- Zasilanie awaryjne z agregatu (przełączenie < 0,5s)
- UPS dla aparatury podtrzymującej życie
- Osobne obiegi dla każdej sali
- Wyrównanie potencjałów, szyna EPR

#### Grupa 1 (kontakt z aparaturą medyczną, aplikacja zewnętrzna/wewnętrzna)
- Śluza pacjenta 1 (2.3)
- Śluza pacjenta 2 (2.64)

**Wymagania grupa 1:**
- Zasilanie awaryjne z agregatu (przełączenie < 15s)
- Wyrównanie potencjałów

#### Grupa 0 (bez kontaktu z aparaturą aplikacyjną)
- Apteka (wszystkie pomieszczenia)
- Pomieszczenia pomocnicze OIOM i bloku (pokoje lekarzy, magazyny, itp.)

### Strefy funkcjonalne

#### Blok operacyjny - strefy czystości:
- **Strefa aseptyczna (ultra-czysta):** sale operacyjne
- **Strefa czysta:** korytarz wewnętrzny bloku, przygotowanie lekarzy, śluza materiałowa
- **Strefa brudna:** strona brudna bloku, ekspedycja brudna
- **Przepływ:** jednokierunkowy (czysta → brudna)

#### OIOM - strefy dostępu:
- **Strefa intensywnej opieki:** sale chorych (dostęp ograniczony)
- **Strefa wsparcia:** pokoje lekarzy, przygotowania pielęgniarek
- **Strefa pomocnicza:** magazyny, brudowniki

## Dostęp

### Blok operacyjny
- **Dostęp pacjentów (czysta strona):** śluza pacjentów (2.62), dźwig szpitalny
- **Dostęp personelu:** szatnie (2.29-2.35), przejście przez śluzy
- **Dostęp materiałów sterylnych:** śluza materiałowa (2.36)
- **Wyjście (brudna strona):** śluza brudna (2.51, 2.54), ekspedycja (2.55)

### OIOM
- **Dostęp pacjentów:** śluza pacjentów (2.3), dźwig szpitalny
- **Dostęp odwiedzających:** kontrolowany, wydzielona poczekalnia
- **Dostęp personelu:** przez korytarz główny

### Apteka
- **Dostęp personelu:** przez korytarz główny, klatka schodowa
- **Dostęp dostaw:** komora dostaw (2.86), dźwig towarowy
- **Ekspedycja leków:** hol ekspedycyjny (2.91)

## Wymagania regulacyjne

### Bezpieczeństwo elektryczne (IEC 60364-7-710)
- **Grupa 2:** system IT, monitoring izolacji, zasilanie awaryjne < 0,5s, UPS
- **Grupa 1:** zasilanie awaryjne < 15s, wyrównanie potencjałów
- Osobne obiegi elektryczne dla każdej sali operacyjnej i OIOM
- System redundantny (dwa niezależne źródła)

### Przepisy dot. bloków operacyjnych
- Wentylacja laminarna nad stołem operacyjnym (ISO 5)
- Kaskada ciśnień (nadciśnienie sale → korytarz → strona brudna)
- Wykończenia bezprzewodowe, antyelektrostatyczne
- Kontrola temperatury i wilgotności (±1°C, ±5% RH)
- Systemy alarmowe (temperatura, wilgotność, ciśnienie, filtry)

### Przepisy dot. OIOM
- Wentylacja HEPA (ISO 8)
- Nadciśnienie w salach chorych
- Monitorowanie pacjentów 24/7
- Centrala pielęgniarska z widokiem na sale
- Instalacje gazów medycznych (tlen, powietrze medyczne, ssanie, N₂O)

### Przepisy dot. aptek szpitalnych
- Separacja stref (przygotowanie cytostatyków - komora laminarna)
- Kontrola temperatury (magazyny leków)
- Systemy alarmowe (temperatura magazynów)
- Zgodność z Prawem Farmaceutycznym

### Przepisy BHP
- Monitoring gazów medycznych (alarm przy nieszczelności)
- Wyjścia ewakuacyjne z bloku operacyjnego (minimum 2)
- System sygnalizacji pożarowej
- Oznakowanie stref niebezpiecznych

## Przestrzenie na poziomie

Lista 92 pomieszczeń (pliki w katalogu `/spaces/pietro-01/`):

**Komunikacja:**
- 2.1, 2.2, 2.2a, 2.2b - Klatka schodowa i komunikacja (317,24 m²)

**OIOM (394,76 m²):**
- 2.3-2.28 - Śluza, sale chorych (3), pokoje lekarzy, brudowniki, magazyny

**Blok operacyjny (525,40 m²):**
- 2.29-2.64 - Szatnie, sale operacyjne (2), przygotowanie, wybudzenia, magazyny

**Apteka (276,01 m²):**
- 2.65-2.92 - Ekspedycja, magazyny, preparatyka, pracownie

## Metadane

- **Poziom funkcjonalny:** Medyczny krytyczny (highest acuity)
- **Dostęp publiczny:** Brak (dostęp tylko dla pacjentów, personelu, odwiedzających z kontrolą)
- **Godziny pracy:**
  - Blok operacyjny: 7:00-18:00 (zabiegi planowane), dyżury 24/7 (zabiegi pilne)
  - OIOM: 24/7
  - Apteka: 7:00-19:00 (poniedziałek-piątek), dyżury w weekendy

---

**Wersja schematu SBM:** v0.1.3
**Data utworzenia dokumentu:** 2026-02-23
