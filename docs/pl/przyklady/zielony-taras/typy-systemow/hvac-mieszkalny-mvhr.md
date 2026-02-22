---
documentType: "system_type"
entityType: "system_type"
id: "SYT-HVAC-RESIDENTIAL-MVHR"
typeName: "Residential HVAC - MVHR + Heat Pump"
systemCategory: "hvac"
description: "Standard residential HVAC system combining mechanical ventilation with heat recovery (MVHR), air-to-water heat pump heating, and underfloor heating distribution for energy-efficient residential buildings"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-HVAC-VENTILATION-RATE"
  - "REQ-HVAC-HEAT-RECOVERY"
  - "REQ-ENERGY-EFFICIENCY-HVAC"
  - "REQ-ACOUSTIC-HVAC-NOISE"
  - "REQ-THERMAL-COMFORT-001"

# COMPONENTS (standard configuration)
components:
  - category: "air_handling"
    description: "Heat recovery ventilation unit (MVHR)"
    specification: "MVHR with 90% heat recovery efficiency, EC fans, F7 filters"
    quantity: 1

  - category: "heating"
    description: "Air-to-water heat pump"
    specification: "12 kW heating capacity, COP 4.2 at A7/W35, R-32 refrigerant"
    quantity: 1

  - category: "heating"
    description: "Underfloor heating manifold with zone valves"
    specification: "8-zone manifold with thermostatic controls, mixing valve"
    quantity: 1

  - category: "heating"
    description: "Circulation pump (heating)"
    specification: "Class A high-efficiency pump, variable speed"
    quantity: 1

  - category: "ventilation"
    description: "Supply air diffusers"
    specification: "Ceiling-mounted adjustable diffusers, low-noise"
    quantity: 8

  - category: "ventilation"
    description: "Extract air grilles"
    specification: "Bathroom/kitchen extract grilles with acoustic dampers"
    quantity: 4

  - category: "controls"
    description: "Room thermostats"
    specification: "Wireless programmable thermostats, LCD display"
    quantity: 8

  - category: "controls"
    description: "MVHR control panel"
    specification: "Wall-mounted with boost/holiday/night modes"
    quantity: 1

  - category: "controls"
    description: "Weather compensation controller"
    specification: "Outdoor sensor + controller for heat pump optimization"
    quantity: 1

# TYPICAL PERFORMANCE
typicalPerformance:
  heatingCapacity: "12 kW"
  ventilationRate: "0.5 ACH"
  heatRecovery: "90%"
  energyEfficiency: "A+++"
  copHeating: 4.2
  noiseLevel: "25 dB(A)"
  designTemperatureHeating: "21-24°C"
  relativeHumidity: "40-60%"
  flowTemperatureUFH: "35°C"
  returnTemperatureUFH: "30°C"

version: "1.0.0"
tags:
  - "residential"
  - "mvhr"
  - "heat-pump"
  - "underfloor-heating"
  - "energy-efficient"
---

# Typ Systemu: HVAC Mieszkalny - MVHR + Pompa Ciepła

## Przegląd

Zintegrowany system HVAC dla budynków mieszkalnych łączący:
- **Wentylacja Mechaniczna z Odzyskiem Ciepła (MVHR)** - Ciągłe dostarczanie świeżego powietrza z 90% odzyskiem ciepła
- **Pompa Ciepła Powietrze-Woda** - Wydajne ogrzewanie niskotemperaturowe
- **Ogrzewanie Podłogowe** - Dystrybucja ciepła przez promieniowanie
- **Indywidualne Sterowanie Strefowe** - Programowalne termostaty dla każdej strefy

**Docelowe Zastosowanie:** Energooszczędne mieszkania i domy o wysokim standardzie izolacji.

## Opis Systemu

### Główne Funkcje

1. **Wentylacja:**
   - Ciągła wentylacja nawiewno-wywiewna (nawiew + wywiew)
   - 90% sprawność odzysku ciepła
   - Filtracja F7 (ochrona przed PM2.5)
   - Minimum 0,5 ACH (standard mieszkalny)

2. **Ogrzewanie:**
   - Pompa ciepła powietrze-woda (moc 12 kW)
   - Dystrybucja niskotemperaturowa (temperatura zasilania 35°C)
   - Ogrzewanie podłogowe we wszystkich pomieszczeniach użytkowych
   - Indywidualna regulacja temperatury w każdym pomieszczeniu

3. **Komfort Letni:**
   - Tryb bypass MVHR (chłodzenie pasywne)
   - Wentylacja nocna chłodząca
   - Brak aktywnego chłodzenia mechanicznego

## Szczegóły Komponentów

### 1. Centrala MVHR

**Specyfikacja:**
- Typ: Płytowy wymiennik ciepła (przeciwprądowy)
- Sprawność odzysku ciepła: 90% (wg EN 13141-7)
- Zakres przepływu powietrza: 100-350 m³/h (modulowany)
- Wentylatory: Technologia EC (wysoka sprawność, niski hałas)
- Filtry: F7 nawiew, G4 wywiew
- Bypass letni: Automatyczna przepustnica
- Odszranianie: Nagrzewnica elektryczna (praca zimowa)

**Typowy produkt:** Systemair SAVE VTR 300 lub odpowiednik

**Wydajność:**
- Pobór mocy: 40-80W (zależnie od przepływu powietrza)
- Poziom hałasu: <25 dB(A) w odległości 1m
- Ciśnienie dyspozycyjne: 150-200 Pa
- Odzysk ciepła: 315W przy 0°C na zewnątrz, 21°C wywiew, 350 m³/h

### 2. Pompa Ciepła Powietrze-Woda

**Specyfikacja:**
- Typ: Powietrze-woda, sterowana falownikiem
- Moc grzewcza: 12 kW przy A7/W35
- COP: 4,2 przy A7/W35 (współczynnik wydajności)
- Czynnik chłodniczy: R-32 (niski GWP)
- Zakres modulacji: 20-100%
- Temperatura zasilania: 25-55°C (maks.)
- Zakres temperatur zewnętrznych: -20°C do +35°C

**Typowy produkt:** Bosch Compress 7000i AW lub Daikin Altherma 3

**Wydajność w warunkach projektowych:**
- A7/W35: 12 kW grzania, COP 4,2
- A-7/W35: 9,5 kW grzania, COP 3,0
- A-15/W35: 7,2 kW grzania, COP 2,3 (może być wymagane źródło biwalentne)

### 3. Rozdzielacz Ogrzewania Podłogowego

**Specyfikacja:**
- Strefy: 8 obiegów
- Rozdzielacz: Ze stali nierdzewnej z przepływomierzami
- Zawory strefowe: Siłowniki termiczne 230V (NC)
- Zawór mieszający: 3-drogowy z napędem silnikowym (kompensacja pogodowa)
- Pompa obiegowa: Klasa A, prędkość zmienna (Wilo Yonos PARA lub odpowiednik)
- Czujnik temperatury zasilania
- Czujnik temperatury powrotu

**Sterowanie:**
- Kompensacja pogodowa: Czujnik zewnętrzny reguluje temperaturę zasilania
- Termostaty pokojowe: Sterowanie zaworami strefowymi w każdym pomieszczeniu
- Prędkość pompy: Modulacja w zależności od liczby otwartych stref

### 4. Kanały i Nawiewniki

**Dystrybucja Powietrza Nawiewanego:**
- Kanały: Sztywne okrągłe (Ø125-160mm), izolacja akustyczna
- Nawiewniki: 8 szt., sufitowe regulowane (sypialnie, pokoje dzienne)
- Regulacja przepływu: Przepustnice przy każdym nawiewniku

**Powietrze Wywiewane:**
- Kanały: Sztywne okrągłe (Ø100-125mm)
- Kratki: Kuchnia (Ø125mm, 70 m³/h), 2 łazienki (Ø100mm, po 50 m³/h)
- Przepustnice zwrotne: Zapobiegają cofaniu przepływu przy wyłączonej centrali MVHR

### 5. Sterowanie i Czujniki

**Sterowanie Pokojowe:**
- 8 × Bezprzewodowe programowalne termostaty
- Wyświetlacz LCD, programowanie 7-dniowe
- Funkcja ręcznego zwiększenia wydajności
- Zasilanie bateryjne (2 × AA)

**Panel Sterowania MVHR:**
- Montaż naścienny (typowo w korytarzu lub kuchni)
- Tryby: Auto, Boost (wysoki przepływ), Urlop (niski przepływ), Noc (obniżony)
- Wskaźnik wymiany filtrów (czujnik różnicy ciśnień)
- Alarmy awarii

**Kompensacja Pogodowa:**
- Czujnik temperatury zewnętrznej
- Regulacja temperatury zasilania pompy ciepła na podstawie warunków zewnętrznych
- Krzywa grzewcza: 35°C przy 7°C na zewnątrz, 40°C przy -15°C na zewnątrz

## Charakterystyka Wydajności

### Wydajność Grzewcza

**Projektowe Obciążenie Cieplne:**
- Powierzchnia mieszkania: 80-120 m²
- Straty ciepła: 50-60 W/m² (budynek dobrze ocieplony)
- Całkowite obciążenie cieplne: 4 000-7 200 W
- Moc pompy ciepła: 12 000 W (odpowiednia z marginesem)

**Wydajność Sezonowa:**
- SCOP (Sezonowy COP): 4,5 (zastosowanie średniotemperaturowe)
- Roczne zapotrzebowanie na energię grzewczą: ~3 500 kWh (dla mieszkania 100 m²)
- Zużycie energii elektrycznej: ~780 kWh/rok (tylko ogrzewanie)
- Klasa energetyczna: A+++

### Wydajność Wentylacji

**Przepływy Powietrza:**
- Projektowa liczba osób: 4
- Sypialnia 1: 60 m³/h (2 osoby × 30 m³/h)
- Sypialnia 2: 60 m³/h (2 osoby × 30 m³/h)
- Pokój dzienny: 60 m³/h (2 osoby × 30 m³/h)
- Wywiew kuchenny: 70 m³/h
- Wywiew łazienka 1: 50 m³/h
- Wywiew łazienka 2: 50 m³/h
- **Razem:** ~350 m³/h w trybie boost

**Odzysk Ciepła:**
- Zima (-10°C na zewnątrz): Odzyskuje ~2 800W
- Roczna oszczędność ciepła: ~4 200 kWh
- Zużycie energii elektrycznej (wentylatory): ~350 kWh/rok
- Oszczędność energii netto: ~3 850 kWh/rok

### Wydajność Akustyczna

**Poziomy Hałasu:**
- Centrala MVHR: <30 dB(A) w odległości 1m
- W sypialniach: <25 dB(A) (z kanałami akustycznymi)
- Jednostka zewnętrzna pompy ciepła: 35 dB(A) w odległości 1m
- Ogrzewanie podłogowe: Bezgłośne (brak ruchomych części w pomieszczeniach)

## Podsumowanie Wymagań

### REQ-HVAC-VENTILATION-RATE
- Minimum 0,5 ACH w trybie ciągłym
- Na podstawie liczby osób: 30 m³/h na osobę
- Wywiew kuchenny: 70 m³/h
- Wywiew łazienkowy: 50 m³/h

### REQ-HVAC-HEAT-RECOVERY
- Minimalna sprawność odzysku ciepła 85%
- Ten system: 90% (przekracza wymagania)

### REQ-ENERGY-EFFICIENCY-HVAC
- COP pompy ciepła ≥4,0 przy A7/W35
- Ten system: COP 4,2 (przekracza wymagania)
- Pompy obiegowe: Klasa A
- Wentylatory MVHR: Technologia EC

### REQ-ACOUSTIC-HVAC-NOISE
- Sypialnie: ≤30 dB(A)
- Pokoje dzienne: ≤35 dB(A)
- Ten system: ≤25 dB(A) w sypialniach (przekracza wymagania)

### REQ-THERMAL-COMFORT-001
- Sezon grzewczy: 20-22°C
- Równomierność temperatury: ≤3°C gradient pionowy
- Ten system: Ogrzewanie podłogowe zapewnia doskonałą równomierność

## Wytyczne Montażu

### Lokalizacja Centrali MVHR
- Pomieszczenie techniczne, gospodarcze lub poddasze
- Montaż poziomy (krytyczny dla odprowadzania kondensatu)
- Dostęp do wymiany filtrów
- Odprowadzanie kondensatu do kanalizacji lub na zewnątrz

### Lokalizacja Pompy Ciepła
- Jednostka zewnętrzna: Ściana zewnętrzna lub płyta fundamentowa
- Odległości: 500mm z przodu, 300mm po bokach, 600mm z tyłu
- Osłona przed wiatrem dominującym
- Unikać bezpośredniego widoku z sypialni (hałas)
- Instalacja chłodnicza: <15m aby uniknąć strat sprawności

### Ogrzewanie Podłogowe
- Rozdzielacz: Pomieszczenie techniczne, szafka lub przestrzeń podsufitowa
- Dostępny do konserwacji
- Rozstaw rur: 100-150mm (sypialnie), 150-200mm (pokoje dzienne)
- Grubość jastrychu: 45-60mm ponad rurami
- Izolacja krawędziowa: Listwy obwodowe 10mm grubości

### Trasa Kanałów
- Ukryte w przestrzeniach podsufitowych lub szachtach instalacyjnych
- Wykładzina akustyczna w kanałach nawiewnych do sypialni
- Połączenia szczelne (minimalizacja nieszczelności)
- Izolacja termiczna w przestrzeniach nieogrzewanych

## Wymagania Uruchomienia

**MVHR:**
- Pomiary przepływu powietrza na każdym nawiewniku (±10% wartości projektowej)
- Próby ciśnieniowe (szczelność kanałów)
- Test sprawności odzysku ciepła
- Pomiary hałasu w pomieszczeniach użytkowych
- Kontrola montażu filtrów

**Pompa Ciepła:**
- Weryfikacja napełnienia czynnikiem chłodniczym
- Weryfikacja temperatury zasilania i powrotu
- Pomiar COP w warunkach projektowych
- Test cyklu odszraniania
- Testy zabezpieczeń (wysokie/niskie ciśnienie, ochrona przed zamarzaniem)

**Ogrzewanie Podłogowe:**
- Próba ciśnieniowa przed jastrychem (6 bar, 24 godziny)
- Regulacja przepływów na rozdzielaczu
- Weryfikacja temperatury (powierzchnia podłogi, zasilanie/powrót)
- Weryfikacja sekwencji sterowania

**Sterowanie:**
- Kalibracja termostatów
- Regulacja krzywej kompensacji pogodowej
- Kontrola działania zaworów strefowych
- Testy blokad (pompa, zawory, czujniki)

## Harmonogram Konserwacji

**Co miesiąc:**
- Oględziny centrali MVHR i pompy ciepła
- Kontrola nietypowych hałasów lub wycieków

**Co 6 miesięcy:**
- Wymiana filtrów MVHR (F7 nawiew, G4 wywiew)
- Czyszczenie jednostki zewnętrznej pompy ciepła (wężownica, wentylator)

**Co rok:**
- Pełny przegląd MVHR: Czyszczenie wentylatorów, inspekcja wymiennika ciepła, odprowadzanie kondensatu
- Przegląd pompy ciepła: Kontrola ciśnienia czynnika chłodniczego, połączenia elektryczne, testy bezpieczeństwa
- Ogrzewanie podłogowe: Ciśnienie w instalacji, sprawność pompy, regulacja przepływów
- Sterowanie: Wymiana baterii (termostaty), aktualizacje oprogramowania

**Co 3 lata:**
- Inspekcja i czyszczenie kanałów (w razie potrzeby)
- Głębokie czyszczenie wymiennika ciepła (MVHR)

**Co 5 lat:**
- Test szczelności czynnika chłodniczego (rozporządzenie F-gas)
- Kompleksowy test wydajności systemu
- Weryfikacja efektywności energetycznej

## Typowe Koszty (2026, EUR)

**Wyposażenie:**
- Centrala MVHR: €2 500
- Pompa ciepła (12 kW): €8 500
- Ogrzewanie podłogowe (8 stref): €2 000
- Kanały i nawiewniki: €1 500
- Sterowanie: €1 000
- **Suma wyposażenie:** €15 500

**Montaż:**
- Montaż centrali MVHR: €2 000
- Montaż pompy ciepła: €1 200
- Montaż ogrzewania podłogowego: €3 500
- Montaż kanałów: €2 500
- Uruchomienie: €800
- **Suma montaż:** €10 000

**Całkowity koszt systemu:** ~€25 500 (dla mieszkania 100 m²)

**Roczne Koszty Eksploatacji:**
- Energia elektryczna na ogrzewanie: €170 (780 kWh × €0,22/kWh)
- Energia elektryczna na wentylację: €75 (350 kWh × €0,22/kWh)
- Konserwacja (roczny przegląd): €250
- **Suma roczna:** ~€495

## Wytyczne Użycia

### Kiedy Stosować Ten Typ Systemu
- Nowe budynki mieszkalne (mieszkania, domy)
- Wysoki standard izolacji (U-values ≤0,20 W/(m²·K))
- Wymóg ciągłej wentylacji (konstrukcja szczelna)
- Możliwość ogrzewania niskotemperaturowego (podłogowe, grzejniki niskotemperaturowe)
- Priorytet efektywności energetycznej

### Kiedy NIE Stosować
- Budynki istniejące z grzejnikami wysokotemperaturowymi (użyj innego typu systemu)
- Budynki wymagające aktywnego chłodzenia (dodaj agregat chłodniczy lub użyj systemu VRF)
- Bardzo duże budynki (>500 m²) - rozważ wiele systemów
- Budynki ze słabą izolacją (pompa ciepła może nie być wydajna)

## Warianty Systemu

**Wariant A: Standardowy (Ten Typ)**
- Pompa ciepła 12 kW, ogrzewanie podłogowe 8 stref, MVHR 90%

**Wariant B: Większa Moc**
- Pompa ciepła 16 kW, ogrzewanie podłogowe 12 stref, MVHR 90%
- Dla większych mieszkań (120-150 m²)

**Wariant C: Z Ciepłą Wodą Użytkową**
- Dodaje zasobnik CWU 200L
- Pompa ciepła zapewnia CWU + ogrzewanie
- Sterowanie priorytetowe (CWU pierwszeństwo)

---

**Status Dokumentu:** Szablon Typu Systemu
**Wersja:** 1.0.0
**Docelowe Zastosowanie:** Budynki mieszkalne 80-120 m²
**Klasa Energetyczna:** A+++
**Ostatni Przegląd:** 2026-02-22
