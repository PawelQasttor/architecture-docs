---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

# Basic Properties
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

# Spatial Data
designArea: 14.5
designHeight: 2.70
designVolume: 39.15
unit: "m"

# Requirements
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-THERMAL-COMFORT-001"
  - "REQ-VENTILATION-OCCUPIED-001"
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

# Occupancy Profile
occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

# FM/Maintenance
maintenanceZone: "MAINT-ZONE-RESIDENTIAL"
accessRestrictions: "tenant_only"

# Relationships
adjacentSpaces:
  - id: "SP-BLD-01-L01-002"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

# BIM Mapping
ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxQ"
  objectType: "Bedroom"

# Metadata
version: "1.0.0"
lastReviewed: "2026-02-20"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Przestrzeń: Sypialnia 01

## Opis

Standardowa sypialnia w lokalu mieszkalnym nr 01 na pierwszym piętrze budynku mieszkalnego Zielony Taras. Pomieszczenie od strony północnej z pojedynczym oknem (1200×1400 mm) zapewniającym naturalne oświetlenie dzienne i wentylację. Przestrzeń jest częścią mieszkania 2-pokojowego zaprojektowanego dla małej rodziny.

## Zamysł Projektowy

Sypialnia została zaprojektowana tak, aby zapewnić komfortowe i zdrowe środowisko do snu:

- **Oświetlenie dzienne i widoki:** Okno od strony północnej zapewnia równomierne światło naturalne bez bezpośredniego nasłonecznienia, z widokiem na zagospodarowany dziedziniec
- **Prywatność akustyczna:** Wzmocniona izolacja akustyczna od korytarza i sąsiednich mieszkań zapewnia niezakłócony sen
- **Komfort cieplny:** Ogrzewanie podłogowe w połączeniu z wentylacją mechaniczną z odzyskiem ciepła (MVHR) utrzymuje komfortową temperaturę przez cały rok
- **Jakość powietrza:** Ciągły dopływ świeżego powietrza przez system MVHR zapewnia zdrową jakość powietrza wewnętrznego
- **Bezpieczeństwo pożarowe:** Część chronionej strefy pożarowej ZL-IV z drogą ewakuacyjną przez chroniony korytarz do klatki schodowej

## Wykończenia

- **Podłoga:** Deska inżynierska dębowa, wykończenie naturalne (MAT-FLOOR-OAK-01)
  - Grubość: 14 mm
  - Podkład akustyczny: 3 mm izolacja od dźwięków uderzeniowych

- **Ściany:** Malowana płyta gipsowo-kartonowa, biała RAL 9010 (MAT-WALL-PAINT-WHITE)
  - Wykończenie: Farba emulsyjna matowa
  - Klasa ogniowa: A2-s1, d0

- **Sufit:** Malowana płyta gipsowo-kartonowa, biała RAL 9010 (MAT-CEILING-PAINT-WHITE)
  - Wykończenie: Farba emulsyjna matowa
  - Wysokość: 2,70 m w świetle

- **Drzwi:** Drzwi wewnętrzne akustyczne (DOOR-INT-AC-01)
  - Wymiary: 830×2050 mm
  - Izolacyjność akustyczna: Rw = 38 dB
  - Klasa ogniowa: EI 30

- **Okno:** Okno PVC z podwójnym szkleniem (WINDOW-TYPE-A)
  - Wymiary: 1200×1400 mm
  - Wartość U: 0,9 W/(m²·K)
  - Izolacyjność akustyczna: Rw = 36 dB

## Wyposażenie i Osprzęt

- **Bezpieczeństwo:** Optyczny czujnik dymu (montaż sufitowy, zasilanie sieciowe z baterią rezerwową)
- **Sterowanie ogrzewaniem:** Indywidualny termostat pokojowy dla ogrzewania podłogowego
- **Wentylacja:** Nawiewnik MVHR (montaż sufitowy, regulowany)
- **Instalacja elektryczna:**
  - 2× podwójne gniazda wtyczkowe (przy łóżku)
  - 1× podwójne gniazdo wtyczkowe (strefa biurka)
  - 1× oprawa sufitowa
  - 1× kinkiet do czytania (opcjonalnie)

## Podsumowanie Wymagań

Ta przestrzeń musi spełniać następujące wymagania dotyczące parametrów:

### Wymagania Ogólne

- **REQ-DAYLIGHT-SLEEPING-001:** Minimalny współczynnik oświetlenia dziennego 2%
  - Status: Do weryfikacji poprzez symulację (DIVA for Rhino)
  - Cel: DF ≥ 2,0% w centrum pomieszczenia, na wysokości płaszczyzny roboczej (0,85 m)

- **REQ-ACOUSTIC-SLEEPING-001:** Izolacja akustyczna klasy B
  - Status: Do weryfikacji poprzez badanie
  - Cel: Rw ≥ 50 dB od sąsiednich mieszkań

- **REQ-THERMAL-COMFORT-001:** Zakres komfortu cieplnego
  - Status: Zgodny z projektem
  - Cel: 21-24°C w zimie, regulacja za pomocą termostatu pokojowego

- **REQ-VENTILATION-OCCUPIED-001:** Wentylacja świeżym powietrzem
  - Status: Zgodny z projektem
  - Cel: 30 m³/h na osobę (60 m³/h łącznie dla 2 osób)

### Wymagania Specyficzne dla Polski (WT 2021)

- **REQ-PL-WT-ROOM-HEIGHT-001:** Minimalna wysokość pomieszczenia wg WT 2021 § 132
  - Status: Zgodny
  - Wymaganie: ≥ 2,50 m wysokości w świetle
  - Projekt: 2,70 m wysokości w świetle (margines 0,20 m)

- **REQ-FIRE-ZL-IV-001:** Wymagania strefy pożarowej ZL-IV wg WT 2021 § 234
  - Status: Zgodny
  - Wymaganie: Separacja REI 60, max 10 m do chronionej drogi ewakuacyjnej
  - Projekt: Ściany REI 90, 6 m do korytarza/klatki schodowej

## Użytkowanie i Zajętość Przestrzeni

- **Użytkowanie główne:** Sen (pora nocna)
- **Użytkowanie dodatkowe:** Ubieranie się, czytanie, czynności osobiste
- **Zajętość:** Maksymalnie 2 osoby
- **Schemat użytkowania:** 8 godzin/dzień (typowo 22:00-06:00)
- **Częstotliwość:** 7 dni/tydzień
- **Dostęp:** Prywatny (tylko najemca)

## Konserwacja i Eksploatacja

- **Strefa konserwacji:** Mieszkalna (standardowy harmonogram sprzątania)
- **Dostęp do konserwacji:** Przez wejście do mieszkania (wymagana koordynacja z najemcą)
- **Instalacje krytyczne:**
  - Czujnik dymu: Miesięczna kontrola wzrokowa, coroczna wymiana baterii
  - Termostat: Coroczna kontrola kalibracji
  - Nawiewnik MVHR: Wymiana filtrów co 6 miesięcy (na poziomie systemu)
  - Uszczelki okienne: Kontrola co 5 lat

## Powiązana Dokumentacja

### Relacje Przestrzenne
- Lokal Mieszkalny 01 - Lokal nadrzędny
- Salon - Przestrzeń sąsiednia
- Korytarz - Droga dostępu

### Strefy
- [Strefa Pożarowa ZL-IV](../strefy/strefa-pozarowa-zl-iv.md) - Strefa bezpieczeństwa pożarowego
- [Strefa HVAC Północ](../strefy/strefa-hvac-polnoc.md) - Strefa klimatyzacji
- [Strefa Akustyczna Noc](../strefy/strefa-akustyczna-noc.md) - Strefa izolacji akustycznej

### Instalacje
- Instalacja HVAC 01 - Wentylacja mechaniczna
- Instalacja grzewcza - Ogrzewanie podłogowe

### Wymagania
- Ogólne: Oświetlenie dzienne dla sypialni
- Ogólne: Izolacja akustyczna
- Polska: Wysokość pomieszczeń WT 2021

### Specyfikacje Materiałowe
- Podłoga: Deska dębowa inżynierska
- Farba ścienna: Biała RAL 9010
- Drzwi: Wewnętrzne akustyczne
- Okno: PVC podwójne szklenie Typ A

## Uwagi Dotyczące Zgodności Projektowej

**Analiza oświetlenia dziennego:** Symulacja w trakcie realizacji na etapie projektu budowlanego. Rozmiar okna (1200×1400 mm = 1,68 m²) zapewnia stosunek okna do podłogi 11,6%, co typowo pozwala osiągnąć współczynnik oświetlenia dziennego 2-3% dla pomieszczeń od strony północnej. Ostateczna weryfikacja poprzez symulację DIVA planowana na marzec 2026.

**Projekt akustyczny:** Konstrukcja ściany międzymieszkaniowej (bloczek betonowy 200 mm + izolacja akustyczna 100 mm + przestrzeń powietrzna + płyta gipsowo-kartonowa) zaprojektowana tak, aby przekroczyć wymaganie Rw 50 dB. Drzwi określone jako akustyczne Rw 38 dB. Badania wymagane po zakończeniu budowy.

**Bezpieczeństwo pożarowe:** Wszystkie wykończenia określone jako A2-s1, d0 lub lepsze. Drzwi EI 30 zgodne z wymaganiami dla budynków mieszkalnych. Odległość ewakuacji 6 m do chronionego korytarza, znacznie poniżej maksymalnych 10 m dla strefy ZL-IV.

**Parametry termiczne:** Ogrzewanie podłogowe z indywidualną regulacją pokojową zapewnia elastyczny komfort cieplny. System MVHR utrzymuje świeże powietrze bez strat ciepła. Wartości U ściany zewnętrznej (0,18 W/m²·K) i okna (0,9 W/m²·K) przekraczają wymagania WT 2021.

---

**Status dokumentu:** Projekt budowlany (LOD 300)
**Ostatni przegląd:** 2026-02-20
**Następny przegląd:** Zamrożenie projektu przed fazą dokumentacji wykonawczej
**Status zgodności:** Wszystkie wymagania na dobrej drodze; parametry oświetlenia dziennego i akustyczne do weryfikacji poprzez symulację/badania
