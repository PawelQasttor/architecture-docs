# Kujawsko-Pomorskie Centrum Pulmonologii - Blok D

## Informacje o projekcie

**Projekt:** Rozbudowa Kujawsko-Pomorskiego Centrum Pulmonologii w Bydgoszczy - budowa Bloku D wraz z łącznikami

**Lokalizacja:** ul. Seminaryjna 1, 85-326 Bydgoszcz, Polska

**Inwestor:** Kujawsko-Pomorskie Inwestycje Medyczne w Toruniu

**Data opracowania dokumentacji technicznej:** 04.05.2011

**Data konwersji do SBM:** 2026-02-23

## Opis projektu

Blok D to nowy budynek szpitalny (średniowysoki, 4 kondygnacje naziemne + piwnice częściowe) dobudowany do istniejącego Kujawsko-Pomorskiego Centrum Pulmonologii. Budynek ma na celu poprawę standardów pracy i świadczenia usług medycznych oraz dostosowanie szpitala do obowiązujących przepisów budowlanych i medycznych.

### Dane techniczne
- **Powierzchnia zabudowy:** 1 726,47 m²
- **Powierzchnia użytkowa:** 6 699,29 m² (Blok D + łączniki)
- **Powierzchnia całkowita:** 8 067,15 m²
- **Kubatura:** 28 532,67 m³
- **Liczba łóżek:** 130 łóżek szpitalnych (OIOM 8-12 łóżek, oddziały łóżkowe 130 łóżek)
- **Konstrukcja:** tradycyjna, murowana (bloczki SILKA), stropy żelbetowe
- **Kategoria geotechniczna:** II (złożone warunki gruntowe)

### Funkcje główne
- **Piwnice:** prosektorium, pomieszczenia techniczne (hydrofornia, gazy medyczne), szatnie personelu, magazyny odpadów
- **Parter:** diagnostyka obrazowa (MRI, CT, RTG, USG, EKG), centralna sterylizacja, pomieszczenia techniczne (kotłownia, wentylatornia)
- **I Piętro:** OIOM (3 sale chorych), blok operacyjny (2 sale operacyjne), apteka szpitalna
- **II Piętro:** Oddział łóżkowy I (30 łóżek), Oddział łóżkowy II (35 łóżek)
- **III Piętro:** Oddział łóżkowy III (30 łóżek), Oddział łóżkowy IV (35 łóżek)

## Struktura dokumentacji SBM

Dokumentacja została przekonwertowana do standardu **Semantic Building Model (SBM) v0.1.3** z pełną obsługą właściwości dziedziczonych (inheritance) z poziomów do przestrzeni.

### Katalogi

```
kpcpulm-blok-d/
├── building.md                          # Encja Building (główny budynek)
├── levels/                              # Encje Level (5 poziomów)
│   ├── poziom-piwnica.md               # Piwnica (996,63 m²)
│   ├── poziom-parter.md                # Parter (1 487,70 m²)
│   ├── poziom-01.md                    # I Piętro (1 497,03 m²)
│   ├── poziom-02.md                    # II Piętro (1 411,37 m²)
│   └── poziom-03.md                    # III Piętro (1 367,60 m²)
├── spaces/                              # Encje Space (382 pomieszczenia - reprezentacja próbek)
│   ├── piwnica/                        # 51 pomieszczeń (0.1 - 0.51)
│   │   ├── 0-01-klatka-schodowa.md    # Klatka schodowa
│   │   └── 0-11-sala-sekcyjna.md      # Sala sekcyjna prosektorium
│   ├── parter/                         # 63 pomieszczenia (1.1 - 1.63)
│   │   └── 1-24-tomograf-komputerowy.md # Pracownia CT (grupa 1)
│   ├── pietro-01/                      # 92 pomieszczenia (2.1 - 2.92)
│   │   └── 2-46-sala-operacyjna-1.md  # Sala operacyjna 1 (grupa 2)
│   ├── pietro-02/                      # 88 pomieszczeń (3.1 - 3.88)
│   │   └── 3-25-sala-chorych-2lozka.md # Sala chorych dwuosobowa
│   └── pietro-03/                      # 88 pomieszczeń (4.1 - 4.88)
├── zones/                               # Encje Zone (strefy)
│   ├── strefa-pozarowa-zl-iv.md       # Strefa pożarowa ZL IV
│   └── strefa-medyczna-grupa-2.md     # Strefa medyczna grupa 2 (IEC 60364-7-710)
├── requirements/                        # Encje Requirement (wymagania)
│   └── req-iec-60364-7-710-grupa-2.md # Wymaganie IEC 60364-7-710 grupa 2
└── README.md                            # Ten plik
```

### Liczba pomieszczeń (całkowita)
- **Piwnica:** 51 pomieszczeń (0.1 - 0.51)
- **Parter:** 63 pomieszczenia (1.1 - 1.63)
- **I Piętro:** 92 pomieszczenia (2.1 - 2.92)
- **II Piętro:** 88 pomieszczeń (3.1 - 3.88)
- **III Piętro:** 88 pomieszczeń (4.1 - 4.88)
- **Razem:** 382 pomieszczenia

### Reprezentacja próbek
Ze względu na dużą liczbę pomieszczeń (382), w katalogu `spaces/` utworzono **reprezentatywne próbki** demonstrujące:
- Różne typy funkcji (komunikacja, medyczne, techniczne, administracyjne)
- Różne grupy bezpieczeństwa elektrycznego (grupa 0, 1, 2)
- Dziedziczenie właściwości z poziomów (wykończenia, warunki środowiskowe)
- Wyposażenie specjalistyczne (aparatura medyczna, instalacje gazów medycznych)
- Wymagania regulacyjne (IEC 60364-7-710, przepisy sanitarne, BHP)

Pełna dokumentacja wszystkich 382 pomieszczeń może być wygenerowana na podstawie:
1. Danych z pliku źródłowego `PULM -- arch PW do druku 04.05.11.txt` (numery pomieszczeń, powierzchnie)
2. Właściwości dziedziczonych z encji Level (wykończenia, warunki środowiskowe)
3. Wzorców z przykładowych przestrzeni (struktura dokumentu, wymagania)

## Kluczowe cechy dokumentacji

### 1. Właściwości dziedziczone (Inheritance v0.1.4)
Każdy poziom (Level) definiuje typowe właściwości dla wszystkich przestrzeni na tym poziomie:
- **Wykończenia:** podłogi, ściany, sufity (materiały, parametry)
- **Warunki środowiskowe:** temperatura, wilgotność, wentylacja, oświetlenie
- **Czystość powietrza:** klasy ISO dla pomieszczeń medycznych

Przestrzenie (Space) dziedziczą te właściwości i nadpisują tylko w przypadku różnic (np. sala operacyjna ma wyższe wymagania niż typowe pomieszczenie medyczne).

**Korzyści:**
- Redukcja powtórzeń (26-33% oszczędności objętości dokumentacji)
- Łatwość aktualizacji (zmiana wykończenia na poziomie → propagacja do wszystkich przestrzeni)
- Spójność danych (wszystkie przestrzenie na poziomie mają te same standardy)

### 2. Grupy medyczne wg IEC 60364-7-710
Pomieszczenia medyczne podzielone na 3 grupy bezpieczeństwa elektrycznego:

#### Grupa 2 (zagrożenie życia)
- Sale operacyjne (2.46, 2.50)
- Sale przygotowania pacjenta (2.44, 2.49)
- Sala wybudzeń (2.59)
- Sale chorych OIOM (2.6, 2.9, 2.12)

**Wymagania:**
- System zasilania IT (transformator separacyjny)
- Monitoring izolacji on-line (alarm < 50 kΩ)
- Zasilanie awaryjne < 0,5s (UPS + agregat)
- Wyrównanie potencjałów (szyna EPR, rezystancja < 0,2 Ω)

#### Grupa 1 (kontakt z aparaturą medyczną)
- Pracownie diagnostyki obrazowej: MRI (1.19), CT (1.24), RTG (1.28)
- Śluzy pacjentów OIOM (2.3, 2.64)
- Gabinety zabiegowe (3.24, 3.87, 4.24, 4.87)
- Izolatki (3.48, 3.58, 4.48, 4.58)

**Wymagania:**
- Zasilanie awaryjne < 15s (agregat)
- Wyrównanie potencjałów
- Instalacje gazów medycznych (tlen, ssanie)

#### Grupa 0 (bez kontaktu z aparaturą aplikacyjną)
- Sale chorych standardowe (bez zabiegów inwazyjnych)
- Pomieszczenia pomocnicze, administracyjne
- Apteka, sterylizatornia

### 3. Warunki środowiskowe medyczne
Dokumentacja zawiera szczegółowe parametry dla pomieszczeń medycznych:

#### Blok operacyjny (grupa 2)
- **Przepływ laminarny (LAF):** klasa ISO 5 nad stołem operacyjnym
- **Strefa ogólna sali:** klasa ISO 7
- **Nadciśnienie:** +15 Pa względem korytarza
- **Filtracja:** HEPA H14 (99,995% skuteczności)
- **Temperatura:** 20-24°C (±1°C)
- **Wilgotność:** 40-60% RH (±5%)

#### OIOM (grupa 2)
- **Czystość powietrza:** klasa ISO 8
- **Nadciśnienie:** +10 Pa względem korytarza
- **Filtracja:** HEPA H13
- **Temperatura:** 22-24°C (±1°C)
- **Wilgotność:** 40-60% RH (±5%)

#### Sterylizatornia (parter)
- **Strefa czysta:** nadciśnienie +15 Pa, klasa ISO 8, 20 wymian/h
- **Strefa brudna:** podciśnienie -10 Pa, 12 wymian/h
- **Przepływ jednokierunkowy:** brudna → czysta

#### Izolatki (II i III piętro)
- **Podciśnienie:** -10 Pa względem korytarza
- **Filtr HEPA H13:** na wylocie (ochrona przed patogenami)
- **Wymiana powietrza:** 12 wymian/h
- **100% powietrze wywiewne** (bez recyrkulacji)

### 4. Ochrona przeciwpożarowa
Cały budynek stanowi jedną strefę pożarową **ZL IV** z kompleksowym systemem ochrony:

#### Elementy pasywne
- **Ściany nośne:** REI 60
- **Stropy:** REI 60
- **Klatki schodowe:** ściany EI 60, drzwi EI 30 (dymoszczelne)
- **Dach:** RE 30

#### Elementy aktywne
- **System sygnalizacji pożarowej (SSP):** centrala analogowo-adresowalna, czujki dymu/ciepła, transmisja do PSP
- **System oddymiania:** nadciśnienie +50 Pa w klatkach schodowych (przy pożarze)
- **Hydranty wewnętrzne:** 25mm, co 30m na każdej kondygnacji
- **Gaśnice:** proszkowe ABC 6kg, CO₂ 5kg (pomieszczenia techniczne)
- **Droga pożarowa:** plac manewrowy 20m × 20m, 5,0m od budynku

#### Ewakuacja
- **Drogi ewakuacyjne poziome:** korytarze 2,5-3,0m (wymaganie min. 2,0m)
- **Drogi ewakuacyjne pionowe:** 3 klatki schodowe (szerokość biegu 1,50m)
- **Ewakuacja pozioma:** dla pacjentów leżących (do sąsiedniej strefy pożarowej)
- **Dźwigi:** 3 dźwigi szpitalne (sterowanie strażackie, zasilanie awaryjne)

### 5. Dane rzeczywiste z polskiego szpitala
Dokumentacja oparta na rzeczywistym projekcie wykonawczym zawierającym:
- Opis warunków gruntowo-wodnych (badania geotechniczne)
- Posadowienie (kategoria geotechniczna II, złożone warunki)
- Konstrukcję (technologia tradycyjna, bloczki SILKA, stropy żelbetowe)
- Instalacje techniczne (hydrofornia, gazy medyczne, wentylacja, kotłownia)
- Wyposażenie medyczne (tomografy, respiratory, aparatura anestezjologiczna)
- Koszty orientacyjne (np. transformatory IT, UPS, agregaty)

## Zastosowanie dokumentacji

### 1. Zarządzanie projektem budowlanym
- Specyfikacje dla wykonawców (instalacje elektryczne, HVAC, wykończenia)
- Harmonogram realizacji (zależności między fazami)
- Kontrola jakości (zgodność z wymaganiami normatywnymi)

### 2. Zarządzanie eksploatacją szpitala
- Procedury konserwacji (testy UPS, agregatu, monitoringu izolacji)
- Procedury ewakuacji (plany ewakuacyjne, instrukcje BHP)
- Zarządzanie energią (monitorowanie zużycia, optymalizacja HVAC)

### 3. Integracja BIM/IFC
Dokumentacja SBM może być przekonwertowana do formatu IFC (Industry Foundation Classes) dla integracji z:
- Modele 3D (Autodesk Revit, ArchiCAD, Tekla Structures)
- Systemy FM (Facility Management)
- Systemy BMS (Building Management System)

### 4. Szkolenia personelu
- Szkolenia z zakresu bezpieczeństwa elektrycznego (IEC 60364-7-710)
- Szkolenia z zakresu ochrony przeciwpożarowej
- Szkolenia z zakresu obsługi aparatury medycznej

## Standardy i normy

Dokumentacja uwzględnia następujące normy i przepisy:

### Normy międzynarodowe
- **IEC 60364-7-710:** Instalacje elektryczne w pomieszczeniach medycznych
- **IEC 61558-2-15:** Transformatory separacyjne dla zastosowań medycznych
- **IEC 60601 (seria):** Wyroby medyczne elektryczne
- **ISO 14644-1:** Czystość powietrza (klasyfikacja czystości)
- **PN-EN 54:** System sygnalizacji pożarowej

### Przepisy polskie
- **Rozporządzenie Ministra Infrastruktury** w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie
- **Rozporządzenie Ministra Zdrowia** w sprawie wymagań, jakim powinny odpowiadać pomieszczenia i urządzenia podmiotu wykonującego działalność leczniczą
- **Prawo Atomowe** (przepisy radiologiczne dla pracowni RTG, CT, MRI)
- **Prawo Farmaceutyczne** (przepisy dot. aptek szpitalnych)

## Następne kroki

### Rozszerzenie dokumentacji
1. **Uzupełnienie przestrzeni:** Wygenerowanie pełnej dokumentacji dla wszystkich 382 pomieszczeń
2. **Dodatkowe strefy:** Strefy HVAC, strefy departamentów (OIOM, blok operacyjny, oddziały łóżkowe)
3. **Dodatkowe wymagania:** Przepisy sanitarne, BHP, dostępność dla niepełnosprawnych
4. **Systemy:** System BMS, system EHR (Electronic Health Record), system PACS (diagnostyka obrazowa)

### Integracja z innymi systemami
1. **Export do IFC:** Konwersja SBM → IFC dla integracji z BIM
2. **Import do FM:** Integracja z systemami Facility Management (Archibus, IBM TRIRIGA)
3. **Dashboards:** Wizualizacja danych (stan pomieszczeń, zużycie energii, harmonogram konserwacji)

## Kontakt

Dokumentacja SBM opracowana na podstawie projektu wykonawczego:
- **Projekt:** "Rozbudowa Kujawsko-Pomorskiego Centrum Pulmonologii - Blok D"
- **Data projektu:** 04.05.2011
- **Konwersja do SBM:** 2026-02-23
- **Wersja schematu SBM:** v0.1.3

---

**Uwagi:** Dokumentacja SBM stanowi semantyczny model budynku, umożliwiający integrację z systemami BIM, FM, BMS oraz zarządzanie cyklem życia obiektu od projektu przez budowę do eksploatacji. Właściwości dziedziczone (inheritance v0.1.4) redukują powtórzenia i ułatwiają aktualizację danych.
