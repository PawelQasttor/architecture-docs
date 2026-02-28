---
entityType: "zone_type"
id: "ZT-ACOUSTIC-NIGHT"
typeName: "Acoustic Zone - Night (Sleeping Spaces)"
zoneType: "acoustic"
description: "Enhanced acoustic zone for sleeping spaces requiring high sound insulation per Polish standards"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-ACOUSTIC-PARTITION-001"
  - "REQ-ACOUSTIC-FLOOR-IMPACT-001"

# ACOUSTIC ZONE PROPERTIES
properties:
  acousticClass: "B"
  usageType: "sleeping_spaces"
  soundInsulationRequirement: "Rw ≥ 52 dB"
  impactSoundRequirement: "Ln,w ≤ 53 dB"
  backgroundNoiseLimit: "NR 25"
  reverbTimeTarget: "0.5s"
  externalNoiseProtection: "Rw ≥ 30 dB"

version: "1.0.0"
tags:
  - "acoustic"
  - "sleeping"
  - "class-b"
  - "residential"
---

# Typ Strefy: Strefa Akustyczna - Noc (Przestrzenie Sypialne)

## Opis

Podwyższona strefa akustyczna dla przestrzeni sypialnych (sypialnie) wymagająca wysokiej izolacyjności akustycznej. Zaprojektowana w celu zapewnienia komfortu akustycznego podczas nocnego wypoczynku w budynkach mieszkalnych, z ochroną przed hałasem zewnętrznym, hałasem międzymieszkaniowym oraz dźwiękami uderzeniowymi ze stropów powyżej.

## Cel Projektowy

Ten typ strefy zapewnia:
- Izolacyjność od dźwięków powietrznych >=52 dB między mieszkaniami
- Izolacyjność od dźwięków uderzeniowych <=53 dB ze stropów powyżej
- Poziom hałasu tła <=NR 25 dla niezakłóconego snu
- Ochronę przed hałasem zewnętrznym >=30 dB przez fasadę
- Klasę Akustyczną B zgodnie z polskimi normami (podwyższony komfort)

## Klasyfikacja

**Klasa Akustyczna:** B (Podwyższony Komfort Akustyczny)

Zgodnie z PN-B-02151-3:2015, polska klasyfikacja akustyczna:
- **Klasa A:** Wyjątkowy komfort (szpitale, studia nagrań)
- **Klasa B:** Podwyższony komfort (sypialnie, ciche biura) <- **Ten typ**
- **Klasa C:** Standardowy komfort (pokoje dzienne, biura ogólne)
- **Klasa D:** Podstawowa zgodność (korytarze, pomieszczenia techniczne)

**Typ Użytkowania:** Przestrzenie sypialne
- Sypialnie (jednoosobowe, dwuosobowe, dziecięce)
- Strefy sypialne w kawalerkach
- Sypialnie gościnne
- Przestrzenie przeznaczone do nocnego wypoczynku

## Wymagania Akustyczne

### REQ-ACOUSTIC-SLEEPING-001: Izolacyjność od Dźwięków Powietrznych
**Kryterium:** Izolacyjność akustyczna między oddzielnymi lokalami mieszkalnymi
**Zgodność:**
- **Między mieszkaniami:** R'w >= 52 dB (pomiar in-situ)
- **Od korytarzy/klatek schodowych:** R'w >= 47 dB
- **Od pomieszczeń technicznych:** R'w >= 57 dB
- **Między sypialniami (to samo mieszkanie):** Rw >= 32 dB

**Konstrukcja:**
- Ściany międzymieszkaniowe: >=220 kg/m² masy LUB przegroda dwuwarstwowa z izolacją
- Przykład: beton 200mm + wełna mineralna 100mm + płyta gipsowa 12,5mm (Rw ~55 dB)
- Alternatywa: Podwójne murowane (150mm + szczelina + 150mm) z izolacją akustyczną

**Weryfikacja:** Pomiary akustyczne po zakończeniu budowy zgodnie z PN-EN ISO 16283-1

### REQ-PL-ACOUSTIC-PARTITION-001: Parametry Przegród
**Kryterium:** Parametry akustyczne ścian działowych zgodnie z WT 2021 § 323
**Zgodność:**
- Minimalna masa: 220 kg/m² dla ścian międzymieszkaniowych
- Brak sztywnych połączeń między warstwami ścian (w przypadku przegród dwuwarstwowych)
- Uszczelnienie akustyczne wszystkich przejść (gniazdka, rury, kanały)
- Uszczelki drzwiowe: Rw >= 32 dB minimum

**Typowe Rozwiązania:**
- Żelbet 200mm
- Pustak ceramiczny 240mm (wypełniony)
- Dwuwarstwowa: 100mm + szczelina 50mm + 100mm z wełną mineralną

**Weryfikacja:** Certyfikaty produktowe, kontrola wykonania, pomiary akustyczne

### REQ-ACOUSTIC-FLOOR-IMPACT-001: Izolacyjność od Dźwięków Uderzeniowych
**Kryterium:** Ochrona przed hałasem kroków i uderzeń z góry
**Zgodność:**
- **Poziom dźwięków uderzeniowych:** L'n,w <= 53 dB (pomiar in-situ)
- **Konstrukcja podłogi:** Podłoga pływająca z warstwą sprężystą
- **Warstwa sprężysta:** Minimalna sztywność dynamiczna s' <= 15 MN/m³

**Konstrukcja Podłogi Pływającej:**
```
Finish layer (wood, tiles, etc.)
Screed: 45-60mm cement screed OR dry screed system
Resilient layer: 3-5mm rubber/polyethylene (s' ≤ 15 MN/m³)
Structural slab: 180-200mm concrete
Ceiling finish: Gypsum plaster or suspended ceiling
```

**Istotne Szczegóły:**
- Izolacja obwodowa: Taśmy sprężyste przy wszystkich ścianach
- Brak sztywnych mostków przez warstwę sprężystą
- Przejścia instalacyjne: Owinięte akustycznie i uszczelnione

**Weryfikacja:** Pomiary dźwięków uderzeniowych zgodnie z PN-EN ISO 16283-2

## Objaśnienie Właściwości

### Wymaganie Izolacyjności Akustycznej: Rw >= 52 dB
**Rw** = Ważony Wskaźnik Izolacyjności Akustycznej Właściwej
- Ocena laboratoryjna izolacyjności od dźwięków powietrznych
- Pomiar in-situ (R'w) zazwyczaj o 2-5 dB niższy niż Rw
- 52 dB zapewnia dobrą prywatność rozmów i redukuje hałas TV/muzyki do komfortowego poziomu

**Efekt Subiektywny:**
- **40 dB:** Głośna mowa słyszalna, niewystarczające dla snu
- **45 dB:** Normalna mowa słyszalna, ale stłumiona
- **50 dB:** Głośna mowa ledwo słyszalna
- **52 dB:** Dobra prywatność, tylko bardzo głośne dźwięki ledwo słyszalne <- **Ten poziom**
- **55+ dB:** Doskonała prywatność, minimalne zakłócenia

### Wymaganie Izolacji od Dźwięków Uderzeniowych: Ln,w <= 53 dB
**Ln,w** = Ważony Znormalizowany Poziom Dźwięków Uderzeniowych
- Im niższy, tym lepiej (odwrotnie niż Rw)
- 53 dB to poziom podwyższony dla przestrzeni sypialnych

**Efekt Subiektywny:**
- **65 dB:** Wysoki poziom dźwięków uderzeniowych, bardzo uciążliwy
- **58 dB:** Poziom standardowy (minimum WT 2021)
- **53 dB:** Poziom podwyższony, komfortowy dla snu <- **Ten poziom**
- **48 dB:** Doskonały, minimalne dźwięki uderzeniowe

### Limit Hałasu Tła: NR 25
**NR** = Noise Rating (Krzywa Oceny Hałasu)
- Im niższy, tym ciszej
- NR 25 jest odpowiedni dla sypialni (zalecenie WHO: <=30 dB(A))

**Kontrolowane Źródła:**
- Hałas instalacji HVAC
- Hałas instalacji wodno-kanalizacyjnych (przepływ wody, kanalizacja)
- Maszynownia windy
- Hałas zewnętrzny (poprzez izolację fasady)

### Ochrona przed Hałasem Zewnętrznym: Rw >= 30 dB
Fasada (ściany + okna) musi zapewnić redukcję minimum 30 dB:
- **Hałas zewnętrzny:** 65 dB(A) typowy miejski
- **Po redukcji:** <=35 dB(A) wewnątrz
- **Wytyczne WHO:** <=30 dB(A) dla snu

**Typowa Konstrukcja:**
- Ściana zewnętrzna: U <= 0,20 W/(m²·K), Rw właściwe ~45-50 dB
- Okna: Szyba zespolona dwukomorowa 6-16-6mm minimum, Rw ~32-36 dB
- Łączne Rw fasady ~30-35 dB (okno jest najsłabszym punktem)

## Szczegóły Konstrukcyjne

### Ściany Działowe

**Między Mieszkaniami (Ściany Międzymieszkaniowe):**
Opcja 1 - Żelbet:
```
200mm reinforced concrete (density ~2400 kg/m³)
= 480 kg/m² → Rw ~54 dB
```

Opcja 2 - Podwójne Murowane:
```
150mm ceramic hollow block
50mm cavity with 50mm mineral wool (ρ=30 kg/m³)
150mm ceramic hollow block
= ~220 kg/m² total → Rw ~55 dB
```

Opcja 3 - Podwójna Ściana Szkieletowa:
```
12.5mm gypsum board
100mm metal studs (staggered) + 100mm mineral wool
12.5mm gypsum board | 12.5mm gypsum board
100mm metal studs (separate frame) + 100mm mineral wool
12.5mm gypsum board
= Rw ~58 dB (excellent but expensive)
```

**Od Korytarzy/Klatek Schodowych:**
- Dopuszczalna lżejsza konstrukcja (Rw >=47 dB)
- Mur 180mm LUB beton 150mm
- Drzwi o podwyższonej izolacyjności akustycznej: Rw >=32 dB z uszczelkami

### Drzwi

**Specyfikacja Drzwi Akustycznych:**
- Drzwi z litym rdzeniem drewnianym LUB metalowe drzwi akustyczne
- Uszczelki obwodowe: Guma lub neopren
- Uszczelka opadająca w progu (automatyczna)
- Brak szczelin podcinania
- Rw >=32 dB minimum (sypialnia do korytarza)

**Istotne Wymagania Montażowe:**
- Ościeżnica prawidłowo uszczelniona do ściany
- Brak szczelin wokół obwodu ościeżnicy
- Wrzutnik na listy (jeśli występuje): Typ uszczelniony akustycznie

### Okna

**Specyfikacja Okien Akustycznych:**
Opcja 1 - Standardowa Szyba Zespolona Dwukomorowa:
```
6mm laminated glass (outer)
16mm argon-filled cavity
6mm laminated glass (inner)
= Rw ~34 dB
```

Opcja 2 - Szyba Asymetryczna (Wyższa Wydajność):
```
8mm laminated glass (outer)
16mm argon-filled cavity
6mm laminated glass (inner)
= Rw ~36-38 dB
```

**Montaż:**
- Prawidłowe uszczelnienie do otworu w ścianie
- Brak mostków akustycznych przez ramę
- Nawiewniki: Nawiewniki akustyczne, jeśli wymagane

### Podłogi (Dźwięki Uderzeniowe)

**System Podłogi Pływającej:**
1. **Płyta Stropowa:** Beton 180-200mm (minimum dla nośności + masy akustycznej)
2. **Warstwa Sprężysta:**
   - Pianka z polietylenu sieciowanego (XLPE) 3-5mm LUB
   - Mata z granulatu gumowego 5mm LUB
   - Wełna mineralna 20mm (wysoka gęstość, p=140 kg/m³)
   - Sztywność dynamiczna s' <=15 MN/m³
3. **Jastrych:** Jastrych cementowy 45-60mm (zbrojony siatką)
4. **Izolacja Obwodowa:** Taśma sprężysta 10mm grubości, na pełną wysokość jastrychu
5. **Wykończenie:** Drewno, płytki, winyl (akustycznie neutralne)

**Istotne Szczegóły:**
- Brak sztywnych mostków (rury, przewody muszą być owinięte)
- Taśma obwodowa ciągła, bez przerw
- Przejścia instalacyjne: Owinięte akustycznie i uszczelnione
- Ściany wznoszone po wykonaniu podłogi (jastrych odizolowany od ścian)

## Integracja Instalacji

### Instalacje HVAC
- Kanały wentylacyjne: Wykładzina akustyczna lub tłumiki
- Nawiewniki: Typ niskoszumowy, NR <=25 przy projektowym przepływie
- Izolacja antywibracyjna: Urządzenia HVAC na sprężynach/podkładkach

### Instalacje Wodno-Kanalizacyjne
- Kanalizacja: Rury owinięte akustycznie (szczególnie piony)
- Instalacja wodna: Regulacja ciśnienia w celu uniknięcia hałasu
- Toalety: Podwieszane lub odizolowane od konstrukcji

### Instalacje Elektryczne
- Gniazdka elektryczne: Puszki uszczelnione akustycznie (nie montowane naprzeciwko siebie przez ściany międzymieszkaniowe)
- Przejścia kablowe: Uszczelnione akustycznie

## Odniesienia do Przepisów

**Polskie Normy:**
- **PN-B-02151-3:2015:** Ochrona akustyczna w budynkach - Wymagania dla budownictwa mieszkaniowego
- **WT 2021 § 323:** Wymagania izolacyjności akustycznej
- **PN-EN ISO 717-1:** Ocena izolacyjności od dźwięków powietrznych
- **PN-EN ISO 717-2:** Ocena izolacyjności od dźwięków uderzeniowych

**Normy Badawcze:**
- **PN-EN ISO 16283-1:** Pomiary terenowe izolacyjności od dźwięków powietrznych
- **PN-EN ISO 16283-2:** Pomiary terenowe izolacyjności od dźwięków uderzeniowych

**Wytyczne:**
- **Wytyczne WHO dotyczące hałasu nocnego:** Hałas tła <=30 dB(A) dla snu
- **Wytyczne WHO dotyczące hałasu środowiskowego (2018):** Ekspozycja nocna w budynkach mieszkalnych

## Wytyczne Użycia

### Kiedy Używać Tego Typu
- Sypialnie w budynkach mieszkalnych (apartamenty, domy)
- Strefy sypialne wymagające wysokiego komfortu akustycznego
- Budynki, w których hałas nocny stanowi problem
- Lokalizacje miejskie z hałasem zewnętrznym >55 dB(A)
- Budynki wielorodzinne (mieszkania powyżej/poniżej/obok)

### Kiedy NIE Używać
- Pokoje dzienne - zastosować niższą klasyfikację (Klasa C może wystarczyć)
- Kuchnie, łazienki - zastosować niższą klasyfikację
- Korytarze, magazyny - wystarczająca podstawowa zgodność
- Domy jednorodzinne wolnostojące - przegrody wewnętrzne mogą być lżejsze
- Lokalizacje wiejskie z niskim hałasem zewnętrznym - standardowa konstrukcja może wystarczyć

## Przykładowe Instancje

Ten typ strefy może być użyty dla:

**Strefa Sypialna Pierwszego Piętra:**
```yaml
id: "ZONE-ACOUSTIC-NIGHT-L01"
zoneTypeId: "ZT-ACOUSTIC-NIGHT"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002"]  # Bedrooms 01, 02
properties:
  externalNoiseLevelActual: 62  # dB(A), measured external
  facadeReductionActual: 33     # dB, achieved Rw
  internalNoiseLevelExpected: 29  # dB(A), calculated
```

**Strefa Sypialna Parteru:**
```yaml
id: "ZONE-ACOUSTIC-NIGHT-L00"
zoneTypeId: "ZT-ACOUSTIC-NIGHT"
levelIds: ["LVL-00"]
spaceIds: ["SP-BLD-01-L00-003", "SP-BLD-01-L00-004"]
properties:
  noImpactSoundFromAbove: false  # Has spaces above
  impactSoundTestRequired: true
```

## Weryfikacja i Badania

**Etap Projektowania:**
- Obliczenia akustyczne (predykcyjne)
- Certyfikaty produktowe materiałów
- Przegląd szczegółów konstrukcyjnych

**Etap Budowy:**
- Kontrola montażu warstwy sprężystej
- Kontrola uszczelnień akustycznych
- Weryfikacja braku sztywnych mostków

**Po Zakończeniu Budowy:**
- Pomiary izolacyjności od dźwięków powietrznych (R'w)
- Pomiary izolacyjności od dźwięków uderzeniowych (L'n,w)
- Pomiary poziomu hałasu tła
- Certyfikacja: Wynik pozytywny/negatywny względem wymagań

---

**Status Dokumentu:** Szablon Typu Strefy
**Wersja:** 1.0.0
**Obowiązujące Normy:** PN-B-02151-3:2015, WT 2021
**Ostatni Przegląd:** 2026-02-22
**Następny Przegląd:** Aktualizacja normy lub zmiana wymagań projektowych
