---
entityType: "zone_type"
id: "ZT-HVAC-RESIDENTIAL"
typeName: "HVAC Zone - Residential Standard"
zoneType: "hvac"
description: "Standard residential HVAC zone with underfloor heating and mechanical ventilation for thermal comfort"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-PL-THERMAL-WALLS-001"
  - "REQ-ENERGY-EFFICIENCY-HVAC"

# HVAC ZONE PROPERTIES
properties:
  heatingSystem: "underfloor_heating"
  coolingSystem: "mechanical_ventilation"
  ventilationStrategy: "balanced_mechanical"
  heatingSetpoint: 21.0
  coolingSetpoint: 26.0
  airChangeRate: 0.5
  controlStrategy: "individual_room_thermostats"
  occupancyControl: false
  nightSetback: 18.0

version: "1.0.0"
tags:
  - "hvac"
  - "residential"
  - "thermal-comfort"
  - "underfloor-heating"
---

# Typ Strefy: Strefa HVAC - Standard Mieszkalny

## Opis

Standardowa mieszkalna strefa HVAC zapewniająca komfort cieplny poprzez ogrzewanie podłogowe i wentylację mechaniczną z odzyskiem ciepła (MVHR). Zaprojektowana dla budynków wielorodzinnych z ciągłym nawiewem świeżego powietrza, indywidualną regulacją temperatury w pomieszczeniach oraz wysoką efektywnością energetyczną.

## Cel Projektowy

Ten typ strefy zapewnia:
- Komfort cieplny zgodnie z PN-EN 16798-1 (Kategoria II)
- Ciągły nawiew świeżego powietrza (minimum 0,5 ACH)
- Indywidualną regulację temperatury w pomieszczeniach
- Energooszczędną eksploatację (odzysk ciepła, ogrzewanie niskotemperaturowe)
- Cichą pracę odpowiednią do użytku mieszkalnego

## Klasyfikacja

**Typ Systemu:** Ogrzewanie niskotemperaturowe + wentylacja mechaniczna
**Zastosowanie:** Mieszkalne (apartamenty, domy)
**Kontrola Klimatu:**
- Zima: Ogrzewanie przez system podłogowy
- Lato: Chłodzenie pasywne przez wentylację mechaniczną (bez aktywnego chłodzenia)
- Cały rok: Świeże powietrze przez MVHR

## Wymagania HVAC

### REQ-THERMAL-COMFORT-001: Komfort Cieplny
**Kryterium:** Utrzymanie komfortowych temperatur zgodnie z PN-EN 16798-1
**Zgodność:**
- **Sezon grzewczy (paź-kwi):** 20-22°C (temperatura operatywna)
- **Sezon chłodniczy (maj-wrz):** 23-26°C (pasywnie, bez aktywnego chłodzenia)
- **Równomierność temperatury:** <=3°C gradient pionowy (podłoga do głowy)
- **Asymetria promieniowania:** <=10°C (podłoga vs sufit)

**Sterowanie:**
- Indywidualne termostaty pokojowe (programowalne)
- Kompensacja pogodowa dla pompy ciepła/kotła
- Obniżenie nocne: 18°C (23:00-06:00)

**Weryfikacja:** Badanie komfortu po zasiedleniu, punktowe pomiary temperatury

### REQ-VENTILATION-OCCUPIED-001: Wydajność Wentylacji
**Kryterium:** Minimalny nawiew świeżego powietrza zgodnie z WT 2021 § 134
**Zgodność:**
- **Sypialnie:** 30 m³/h na osobę (minimum)
- **Pokoje dzienne:** 30 m³/h na osobę
- **Kuchnie:** 70 m³/h (wywiew)
- **Łazienki:** 50 m³/h (wywiew)
- **Wentylacja ciągła:** Minimum 0,5 ACH (24/7)

**System:**
- Wentylacja mechaniczna nawiewno-wywiewna (nawiew + wywiew)
- Sprawność odzysku ciepła >=85%
- Filtracja: Minimum F7 (ochrona przed PM2.5)

**Weryfikacja:** Pomiary przepływu powietrza, raport z rozruchu, coroczna konserwacja

### REQ-PL-THERMAL-WALLS-001: Izolacja Cieplna
**Kryterium:** Ściany zewnętrzne spełniają wymagania WT 2021 § 328
**Zgodność:**
- **Ściany zewnętrzne:** U <= 0,20 W/(m²·K)
- **Dach:** U <= 0,15 W/(m²·K)
- **Podłoga na gruncie:** U <= 0,30 W/(m²·K)
- **Okna:** Uw <= 0,9 W/(m²·K)
- **Mostki cieplne:** Wartości psi zminimalizowane, brak ryzyka kondensacji

**Weryfikacja:** Obliczenia cieplne zgodnie z PN-EN ISO 13789, świadectwo charakterystyki energetycznej

### REQ-ENERGY-EFFICIENCY-HVAC: Efektywność Energetyczna
**Kryterium:** Wysoko sprawne systemy HVAC
**Zgodność:**
- **COP pompy ciepła:** >=4,0 przy A7/W35 (jeśli stosowana pompa ciepła)
- **Sprawność kotła:** >=92% (jeśli stosowany kocioł gazowy)
- **Odzysk ciepła:** >=85% sprawności (MVHR)
- **Pompy obiegowe:** Klasa A (wysoka sprawność)
- **Sterowanie:** Kompensacja pogodowa, regulacja pokojowa

**Weryfikacja:** Certyfikaty produktowe, obliczenia charakterystyki energetycznej

## Objaśnienie Właściwości

### System Grzewczy: Ogrzewanie Podłogowe
**Zalety:**
- Niska temperatura zasilania (35-40°C) -> wysoka sprawność pompy ciepła
- Komfortowe ogrzewanie promieniujące (równomierne rozkład temperatury)
- Brak grzejników -> więcej użytecznej powierzchni ścian
- Cicha praca
- Odpowiednie dla budynków niskoenergetycznych

**Typowa Konfiguracja:**
- Rozdzielacz z zaworami strefowymi (jeden na pomieszczenie lub grupę pomieszczeń)
- Rury PE-Xa średnica 16-20mm, rozstaw 100-150mm
- Grubość jastrychu: 45-60mm (dystrybucja ciepła)
- Temperatura powierzchni: 23-29°C (zależna od wykończenia podłogi)

**Sterowanie:**
- Termostaty pokojowe -> zawory strefowe rozdzielacza
- Kompensacja pogodowa -> punkt nastawy pompy ciepła/kotła
- Dostępne obniżenie nocne

### Strategia Wentylacji: Nawiewno-Wywiewna Mechaniczna
**Wentylacja Mechaniczna z Odzyskiem Ciepła (MVHR):**
- Powietrze nawiewne: Filtrowane świeże powietrze z zewnątrz
- Powietrze wywiewne: Zużyte powietrze z pomieszczeń mokrych (kuchnia, łazienka)
- Odzysk ciepła: 85-92% sprawności (zimą ciepło, latem bypass)
- Dystrybucja powietrza: Nawiew do pomieszczeń suchych (sypialnie, pokój dzienny), wywiew z pomieszczeń mokrych

**Korzyści:**
- Ciągły nawiew świeżego powietrza (bez konieczności otwierania okien)
- Odzysk ciepła oszczędza energię
- Filtrowane powietrze (ochrona przed alergenami, PM2.5)
- Kontrolowana jakość powietrza wewnętrznego (CO2, wilgotność)

**Praca Letnia:**
- Tryb bypass: Świeże powietrze nie jest podgrzewane (chłodzenie swobodne)
- Chłodzenie nocne: Zwiększony przepływ powietrza w nocy
- Brak aktywnego chłodzenia mechanicznego

### Krotność Wymian Powietrza: 0,5 ACH
**0,5 ACH** = Wymiany Powietrza na Godzinę
- Cała objętość powietrza w strefie wymieniana co 2 godziny
- Spełnia normy wentylacji mieszkalnej
- Równoważy nawiew świeżego powietrza z efektywnością energetyczną

**Przykład:**
- Sypialnia 14,5 m² x 2,7m = 39 m³
- Wymagany przepływ: 39 m³ x 0,5 ACH = 19,5 m³/h
- Dla 2 użytkowników: 2 x 30 m³/h = 60 m³/h
- **Stosować wyższą wartość:** 60 m³/h (na podstawie liczby użytkowników)

### Strategia Sterowania: Indywidualne Termostaty Pokojowe
**Regulacja Pokojowa:**
- Bezprzewodowe termostaty programowalne (jeden na pomieszczenie lub strefę)
- Sterowanie zaworami strefowymi rozdzielacza (ogrzewanie podłogowe)
- Programowalne harmonogramy (różne dla sypialni vs pomieszczeń dziennych)
- Możliwość ręcznego nadpisania

**Rozdzielacz Strefowy:**
- Centralny rozdzielacz (zazwyczaj w pomieszczeniu technicznym lub suficie korytarza)
- Zmotoryzowane zawory strefowe (24V, normalnie zamknięte)
- Zawór mieszający do regulacji temperatury zasilania
- Przepływomierz na strefę

### Punkty Nastawy Ogrzewania/Chłodzenia

**Punkt Nastawy Ogrzewania: 21°C**
- Temperatura projektowa na sezon grzewczy
- Zakres komfortu: 20-22°C
- Obniżenie nocne: 18°C (oszczędność energii, użytkownicy pod kołdrami)

**Punkt Nastawy Chłodzenia: 26°C**
- Brak aktywnego chłodzenia (pasywny projekt budynku)
- Dopuszczalna górna granica zgodnie z PN-EN 16798-1
- Kontrolowane poprzez:
  - Osłony zewnętrzne (zapobieganie zyskom słonecznym)
  - Wentylację nocną (schładzanie w nocy)
  - Masę termiczną (opóźnienie wzrostu temperatury)

**Ryzyko Przegrzewania:**
- Sypialnie od północy: Niskie ryzyko
- Pokoje dzienne od południa: Umiarkowane ryzyko (wymagane osłony)
- Mieszkania na ostatnim piętrze: Wyższe ryzyko (izolacja dachu krytyczna)

## Konfiguracja Systemu

### Komponenty Systemu Grzewczego

**Źródło Ciepła (Poziom Budynku):**
Opcja 1 - Pompa Ciepła Powietrze-Woda:
- Moc: 12-16 kW (zależna od wielkości budynku)
- COP: 4,0-4,5 przy A7/W35
- Temperatura zasilania: 35-40°C (ogrzewanie podłogowe)
- Sprężarka modulująca (20-100%)

Opcja 2 - Kocioł Gazowy Kondensacyjny:
- Sprawność: 92-96%
- Palnik modulujący
- Temperatura zasilania: 35-45°C (tryb kondensacji)

**Dystrybucja (Poziom Strefy):**
- Rozdzielacz ogrzewania podłogowego (zazwyczaj 8-12 stref)
- Pompa obiegowa (regulacja prędkości z kompensacją pogodową)
- Zawór mieszający (jeśli źródło wysokotemperaturowe)
- Zawory strefowe (siłowniki termiczne, 24V)

**Sterowanie (Poziom Pomieszczenia):**
- Bezprzewodowe termostaty pokojowe
- Programowalne harmonogramy
- Ręczne nadpisanie

### Komponenty Systemu Wentylacji

**Centrala MVHR (Poziom Budynku):**
- Sprawność odzysku ciepła: 85-92%
- Przepływ powietrza: 0,5-0,7 ACH przy projektowym obłożeniu
- Filtry F7 (strona nawiewna)
- Wentylatory EC (wysoka sprawność, zmienna prędkość)
- Przepustnica bypass letni

**Kanały (Poziom Strefy):**
- Kanały nawiewne do sypialni, pokoju dziennego
- Kanały wywiewne z kuchni, łazienek
- Izolacja akustyczna (hałas <25 dB(A))
- Połączenia szczelne

**Elementy Końcowe (Poziom Pomieszczenia):**
- Nawiewniki: Regulowane, sufitowe lub ścienne
- Kratki wywiewne: Kuchnia (70 m³/h), łazienki (50 m³/h)

## Charakterystyka Cieplna

### Warunki Projektowe

**Zima (Ogrzewanie):**
- Na zewnątrz: -20°C (temperatura obliczeniowa dla regionu warszawskiego)
- Wewnątrz: 21°C (punkt nastawy)
- Straty ciepła: ~50 W/m² (budynek dobrze ocieplony)

**Lato (Bez Chłodzenia):**
- Na zewnątrz: 30°C (temperatura obliczeniowa)
- Wewnątrz: 26°C (dopuszczalna granica)
- Strategie chłodzenia pasywnego: Osłony, wentylacja nocna, masa termiczna

### Obliczenie Obciążenia Cieplnego

**Przykładowa Sypialnia (14,5 m²):**
- Straty przez przenikanie: 350W (ściana zewnętrzna, okno)
- Straty wentylacyjne: 150W (świeże powietrze)
- **Całkowite straty ciepła:** 500W
- **Jednostkowe straty ciepła:** 34 W/m²

**Wydajność Ogrzewania Podłogowego:**
- Temperatura podłogi: 26°C (powierzchnia)
- Temperatura pomieszczenia: 21°C (punkt nastawy)
- Wydajność: 35-40 W/m² (wystarczająca dla dobrze ocieplonych pomieszczeń)

### Wydajność Wentylacji

**Przykład Odzysku Ciepła:**
- Powietrze zewnętrzne: -20°C
- Powietrze wywiewne: 21°C
- Sprawność odzysku ciepła: 90%
- Powietrze nawiewne po odzysku ciepła: +17°C (w przybliżeniu)
- Dogrzewanie: System podłogowy (+17°C -> +21°C)

**Oszczędności Energetyczne:**
- Bez odzysku ciepła: Podgrzanie powietrza z -20°C do +21°C = wzrost o 41°C
- Z odzyskiem 90%: Podgrzanie z +17°C do +21°C = wzrost o 4°C
- **Zaoszczędzona energia:** 90% strat ciepła na wentylację

## Odniesienia do Przepisów

**Polskie Przepisy:**
- **WT 2021 § 134:** Wymagania wentylacyjne (krotności wymian powietrza)
- **WT 2021 § 328:** Wymagania izolacji cieplnej
- **WT 2021 § 267:** Wymagania dotyczące systemów grzewczych

**Normy Europejskie:**
- **PN-EN 16798-1:** Parametry środowiska wewnętrznego (komfort cieplny)
- **PN-EN 1264:** Systemy ogrzewania podłogowego
- **PN-EN 13141-7:** Elementy wentylacji (centrale MVHR)
- **PN-EN ISO 13789:** Obliczenia charakterystyki cieplnej

**Efektywność Energetyczna:**
- **Dyrektywa UE 2010/31/EU:** Charakterystyka energetyczna budynków
- **Polska metodologia charakterystyki energetycznej:** Zgodnie z WT 2021 Załącznik 2

## Wytyczne Użycia

### Kiedy Używać Tego Typu
- Mieszkania w budynkach wielorodzinnych (nowe budownictwo)
- Budynki niskoenergetyczne (wysoka izolacja)
- Budynki z ogrzewaniem pompą ciepła
- Wymaganie wentylacji ciągłej (konstrukcja szczelna)
- Priorytet cichej pracy (bez klimakonwektorów, cichy MVHR)

### Kiedy NIE Używać
- Budynki z wysokim obciążeniem chłodniczym (stosować typ z aktywnym chłodzeniem)
- Istniejące budynki z grzejnikami (stosować inny typ strefy)
- Preferowana wentylacja naturalna (stosować typ systemu hybrydowego)
- Budynki komercyjne (inne wzorce użytkowania)

## Przykładowe Instancje

Ten typ strefy może być użyty dla:

**Strefa Północna:**
```yaml
id: "ZONE-HVAC-NORTH-L01"
zoneTypeId: "ZT-HVAC-RESIDENTIAL"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002"]
properties:
  orientation: "north"
  heatingLoad: 1200  # W, calculated
  overheatingRisk: "low"
```

**Strefa Południowa (Wyższe Zyski Słoneczne):**
```yaml
id: "ZONE-HVAC-SOUTH-L01"
zoneTypeId: "ZT-HVAC-RESIDENTIAL"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-003", "SP-BLD-01-L01-004"]
properties:
  orientation: "south"
  heatingLoad: 900   # W, lower due to solar gains
  overheatingRisk: "moderate"
  shadingRequired: true
```

## Uruchomienie i Konserwacja

**Uruchomienie:**
- Ogrzewanie podłogowe: Próba ciśnieniowa, wyważenie przepływów, weryfikacja temperatury
- MVHR: Pomiary przepływu powietrza, test sprawności odzysku ciepła, test hałasu
- Sterowanie: Kalibracja termostatów, programowanie harmonogramów

**Konserwacja Roczna:**
- MVHR: Wymiana filtrów (F7 co 6-12 miesięcy)
- MVHR: Czyszczenie wentylatorów, inspekcja wymiennika ciepła
- Ogrzewanie: Kontrola ciśnienia w systemie, kontrola sprawności pompy
- Sterowanie: Wymiana baterii w termostatach, przegląd harmonogramów

---

**Status Dokumentu:** Szablon Typu Strefy
**Wersja:** 1.0.0
**Obowiązujące Normy:** WT 2021, PN-EN 16798-1
**Ostatni Przegląd:** 2026-02-22
**Następny Przegląd:** Aktualizacja przepisów energetycznych lub zmiana technologii systemów
