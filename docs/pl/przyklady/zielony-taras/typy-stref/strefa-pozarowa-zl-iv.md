---
documentType: "zone_type"
entityType: "zone_type"
id: "ZT-FIRE-ZL-IV"
typeName: "Fire Zone ZL-IV Standard"
zoneType: "fire"
description: "Standard fire safety zone for residential buildings per Polish regulations (ZL-IV category)"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-PL-FIRE-SEPARATION-001"
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-FIRE-COMPARTMENTATION-001"
  - "REQ-FIRE-DETECTION-SMOKE-001"

# FIRE ZONE PROPERTIES
properties:
  fireResistanceClass: "ZL-IV"
  fireResistanceRating: "REI 60"
  maxEscapeDistance: 40.0
  compartmentationRequired: true
  smokeControlStrategy: "natural"
  evacuationStrategy: "protected_egress"
  fireDetectionType: "smoke"
  emergencyLightingRequired: true
  fireLoadCategory: "low"

version: "1.0.0"
tags:
  - "fire-safety"
  - "residential"
  - "polish-code"
  - "zl-iv"
---

# Typ Strefy: Strefa Pożarowa ZL-IV Standard

## Opis

Standardowa strefa bezpieczeństwa pożarowego dla budynków mieszkalnych zgodnie z polskimi przepisami budowlanymi. Kategoria ZL-IV (Kategoria Zagrożenia Ludzi IV) dotyczy budynków mieszkalnych z użytkownikami zdolnymi do samodzielnej ewakuacji, typowa dla budynków mieszkalnych wielorodzinnych o średniej wysokości.

## Cel Projektowy

Ten typ strefy zapewnia:
- Maksymalną odległość ewakuacyjną 40 metrów do chronionego korytarza lub klatki schodowej
- Odporność ogniową REI 60 dla elementów oddzielenia przeciwpożarowego
- Automatyczną detekcję dymu we wszystkich pomieszczeniach mieszkalnych
- Naturalną kontrolę dymu (otwieralne okna w drogach ewakuacyjnych)
- Strategię ewakuacji z chronionymi drogami ewakuacyjnymi

## Klasyfikacja

**Kategoria Obciążenia Ogniowego:** ZL-IV (Niskie obciążenie ogniowe)
- Funkcja mieszkalna (przestrzenie sypialne)
- Użytkownicy zdolni do samodzielnej ewakuacji
- Niska gęstość obciążenia ogniowego (meble, tekstylia)
- Ewakuacja jedno- lub kilkuetapowa

**Budynki Objęte:**
- Budynki mieszkalne (apartamenty, akademiki)
- Budynki, w których użytkownicy znają drogi ewakuacyjne
- Budynki mieszkalne niskie i średniowysokie (zazwyczaj do 25m)

## Wymagania Bezpieczeństwa Pożarowego

### REQ-PL-FIRE-SEPARATION-001: Oddzielenie Przeciwpożarowe
**Kryterium:** Granice strefy muszą zapewniać odporność ogniową REI 60
**Zgodność:**
- Ściany: REI 60 (murowane lub betonowe)
- Stropy: REI 60
- Drzwi przeciwpożarowe: EI2 60-C (samozamykające z uszczelkami dymowymi)
- Przejścia instalacyjne: Zabezpieczenie ppoż. zachowujące klasę odporności

**Weryfikacja:** Specyfikacje produktowe, certyfikaty montażu, kontrola przeciwpożarowa

### REQ-FIRE-EGRESS-TIME-001: Odległość Ewakuacyjna
**Kryterium:** Maksymalna odległość przejścia do chronionego wyjścia
**Zgodność:**
- Z dowolnego punktu strefy: <= 40m do chronionego korytarza lub klatki schodowej
- Mierzona wzdłuż najkrótszej drogi przejścia
- Droga chroniona: Korytarz/klatka schodowa o wymaganej odporności ogniowej

**Weryfikacja:** Analiza rzutów, schematy dróg ewakuacyjnych, zatwierdzenie organów

### REQ-FIRE-COMPARTMENTATION-001: Podział na Strefy Pożarowe
**Kryterium:** Strefy pożarowe oddzielone konstrukcją o wymaganej odporności ogniowej
**Zgodność:**
- Oddzielenie pionowe: Stropy REI 60
- Oddzielenie poziome: Ściany REI 60
- Przejścia instalacyjne: Zabezpieczenie ppoż. (EI 60)

**Weryfikacja:** Rysunki konstrukcyjne, harmonogram zabezpieczeń ppoż., kontrola

### REQ-FIRE-DETECTION-SMOKE-001: Detekcja Dymu
**Kryterium:** Optyczne czujki dymu we wszystkich pomieszczeniach mieszkalnych
**Zgodność:**
- Optyczne czujki dymu montowane na suficie
- Zasilanie sieciowe z baterią rezerwową
- Połączone z systemem alarmowym budynku
- Zasięg: Wszystkie sypialnie, pomieszczenia mieszkalne, korytarze

**Weryfikacja:** Projekt systemu sygnalizacji pożarowej, certyfikaty montażu, protokoły badań

## Objaśnienie Właściwości

### Klasa Odporności Ogniowej: ZL-IV
Polska klasyfikacja bezpieczeństwa pożarowego na podstawie przeznaczenia i zdolności ewakuacyjnej:
- **ZL-I:** Szpitale, domy opieki (najwyższa ochrona)
- **ZL-II:** Hotele, szkoły (wysoka ochrona)
- **ZL-III:** Biura, handel (średnia ochrona)
- **ZL-IV:** Mieszkania (standardowa ochrona) <- **Ten typ**
- **ZL-V:** Przemysłowe, magazynowe (ochrona zmienna)

### Klasa Odporności Ogniowej: REI 60
- **R** - Nośność ogniowa: 60 minut
- **E** - Szczelność ogniowa (brak płomieni/gorących gazów): 60 minut
- **I** - Izolacyjność ogniowa (przyrost temperatury): 60 minut

### Maksymalna Odległość Ewakuacyjna: 40m
Zgodnie z WT 2021 § 234, maksymalna odległość z dowolnego punktu do:
- Chronionego korytarza (o wymaganej odporności ogniowej)
- Chronionej klatki schodowej (o wymaganej odporności ogniowej i obudowanej)
- Wyjścia zewnętrznego (bezpośrednio na zewnątrz)

### Strategia Kontroli Dymu: Naturalna
- Otwieralne okna w korytarzach i klatkach schodowych
- Klapy dymowe w górnej części
- Naturalny przepływ powietrza zapobiegający gromadzeniu się dymu
- Brak wymogu mechanicznego oddymiania dla ZL-IV

### Strategia Ewakuacji: Chronione Drogi Ewakuacyjne
- Korytarze o wymaganej odporności ogniowej stanowią chronione drogi ewakuacyjne
- Chronione klatki schodowe (obudowane, o wymaganej odporności ogniowej)
- Oświetlenie awaryjne i oznakowanie
- Ewakuacja jednoetapowa (wszyscy użytkownicy ewakuują się jednocześnie)

## Typowa Konfiguracja Strefy

**Pomieszczenia Wchodzące w Skład:**
- Sypialnie
- Pokoje dzienne
- Kuchnie (jeśli nie otwarte na korytarz)
- Łazienki
- Korytarze (w obrębie strefy)
- Pomieszczenia magazynowe

**Pomieszczenia Wyłączone (Oddzielne Strefy Pożarowe):**
- Chronione klatki schodowe (oddzielna strefa pożarowa)
- Pomieszczenia techniczne (mechaniczne, elektryczne)
- Pomieszczenia na odpady
- Garaż (jeśli dotyczy)

## Wymagania Graniczne

**Granice Pionowe:**
- Stropy: Minimum REI 60
- Piony instalacyjne: Zabezpieczenie ppoż. w miejscach przejść przez stropy

**Granice Poziome:**
- Ściany do innych stref: REI 60
- Ściany do chronionego korytarza: REI 60
- Drzwi wejściowe do mieszkań: Minimum EI2 30-C (często EI2 60-C)

**Otwory:**
- Wszystkie drzwi w ścianach o wymaganej odporności ogniowej: O wymaganej klasie i samozamykające
- Przeszklenia (jeśli wymagane): Szkło ogniochronne EI 60
- Kanały wentylacyjne: Klapy pożarowe (EI 60) na granicach stref

## Odniesienia do Przepisów

**Polskie Przepisy:**
- **WT 2021 (Warunki Techniczne) § 234:** Wymagania dotyczące oddzielenia stref pożarowych
- **WT 2021 § 235:** Odporność ogniowa elementów budynku
- **WT 2021 § 271:** Drogi ewakuacyjne i odległości ewakuacyjne
- **Prawo Budowlane art. 5:** Bezpieczeństwo pożarowe budynków
- **PN-B-02852:** Ochrona przeciwpożarowa budynków - Kontrola dymu

**Normy Europejskie:**
- **EN 1991-1-2:** Oddziaływania na konstrukcje - Oddziaływania w warunkach pożaru
- **EN 13501-2:** Klasyfikacja ogniowa - Klasyfikacja na podstawie badań odporności ogniowej

## Wytyczne Użycia

### Kiedy Używać Tego Typu
- Budynki mieszkalne wielorodzinne (typowe)
- Funkcja mieszkalna, gdzie mieszkańcy znają budynek
- Budynki z odległościami ewakuacyjnymi <= 40m
- Budynki mieszkalne niskie do średniowysokich (parter do ~8 kondygnacji)
- Wymagana zgodność z polskimi przepisami budowlanymi

### Kiedy NIE Używać
- Budynki mieszkalne wysokie (>25m wysokości) - stosować ZL-III z surowszymi wymaganiami
- Domy opieki, mieszkania wspomagane - stosować ZL-II (wyższa ochrona)
- Hotele, pensjonaty - stosować ZL-II (użytkownicy nie znają budynku)
- Budynki z odległościami ewakuacyjnymi >40m - wymaga dodatkowych stref lub chronionych dróg
- Budynki komercyjne, biurowe, handlowe - stosować ZL-III

## Przykładowe Instancje

Ten typ strefy może być użyty dla:

**Strefa Pożarowa Parteru:**
```yaml
id: "ZONE-FIRE-GROUND"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-00"]
properties:
  compartmentArea: 380  # m²
  maxTravelDistance: 35  # Actual measured distance
```

**Strefa Pożarowa Pierwszego Piętra:**
```yaml
id: "ZONE-FIRE-FIRST"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-01"]
properties:
  compartmentArea: 450  # m²
  maxTravelDistance: 40  # Actual measured distance
```

**Strefa Wielopoziomowa (Mieszkania Dwupoziomowe):**
```yaml
id: "ZONE-FIRE-DUPLEX"
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-02", "LVL-03"]
properties:
  compartmentArea: 520  # m² (two levels)
  internalStairNotProtected: true  # Internal stairs within apartment
```

## Konserwacja i Badania

**Przegląd Roczny:**
- Mechanizmy samozamykające drzwi pożarowych
- Uszczelki i paski pęczniejące drzwi pożarowych
- Zabezpieczenia ppoż. w przejściach instalacyjnych
- Test funkcjonalny oświetlenia awaryjnego

**System Detekcji Dymu:**
- Co tydzień: Kontrola wskaźników wizualnych
- Co miesiąc: Test funkcjonalny czujek
- Co rok: Pełny test systemu i certyfikacja

**Przegląd Pięcioletni:**
- Integralność odporności ogniowej elementów
- Przegląd zgodności z przepisami
- Aktualizacja w związku ze zmianami przepisów

---

**Status Dokumentu:** Szablon Typu Strefy
**Wersja:** 1.0.0
**Obowiązujące Przepisy:** WT 2021, Prawo Budowlane
**Ostatni Przegląd:** 2026-02-22
**Następny Przegląd:** Aktualizacja przepisów lub zmiana regulacji budowlanych
