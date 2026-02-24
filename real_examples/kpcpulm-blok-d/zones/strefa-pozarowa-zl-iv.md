---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
zoneName: "Strefa pożarowa ZL IV"
zoneType: "fire"
buildingId: "BLD-KPCPULM-BLOK-D"
version: "0.1.0"
---

# Strefa: Strefa pożarowa ZL IV

## Informacje podstawowe

**Typ encji:** Zone
**ID:** ZONE-FIRE-ZL-IV
**Nazwa:** Strefa pożarowa ZL IV
**Typ strefy:** Fire Zone
**Budynek:** `BLD-KPCPULM-BLOK-D`

## Opis

Strefa pożarowa obejmująca cały budynek Bloku D (wszystkie kondygnacje od piwnic do III piętra). Klasyfikacja ZL IV oznacza budynek średniowysokie (wysokość max 25m), zlokalizowany w obszarze zurbanizowanym z dostępem do drogi pożarowej.

## Klasyfikacja pożarowa

### Klasa strefy pożarowej
- **Oznaczenie:** ZL IV
- **Wysokość budynku:** ~15-17m (4 kondygnacje naziemne + piwnice)
- **Powierzchnia strefy:** ~8 067 m² (powierzchnia całkowita)

### Kategoria zagrożenia ludzi
- **ZL IV:** Budynek opieki zdrowotnej (szpital)
- **Uwagi:** Budynek z pacjentami o ograniczonej zdolności do samodzielnej ewakuacji (pacjenci leżący, OIOM, blok operacyjny)

## Parametry ochrony pożarowej

### Odporność ogniowa elementów konstrukcyjnych
- **Ściany zewnętrzne nośne:** REI 60 (żelbet, bloczki SILKA z ociepleniem)
- **Ściany wewnętrzne nośne:** REI 60 (żelbet, bloczki SILKA)
- **Stropy:** REI 60 (stropy żelbetowe monolityczne)
- **Dach:** RE 30 (konstrukcja drewniana lub stalowa, krycie papą)
- **Klatki schodowe (ściany):** EI 60 (ściany oddzieleń pożarowych)
- **Drzwi klatek schodowych:** EI 30 (drzwi dymoszczelne, samozamykacze)

### Odległość od obiektów sąsiednich
- **Budynek A (istniejący):** połączony łącznikiem
- **Budynek C (istniejący):** połączony łącznikiem
- **Droga pożarowa:** 5,0m od budynku (plac manewrowy 20m × 20m)

### Wymagania dotyczące dróg ewakuacyjnych

#### Drogi ewakuacyjne poziome
- **Korytarze:** szerokość min. 2,0m (spełnione: 2,5-3,0m)
- **Długość dojścia do wyjścia ewakuacyjnego:** max 40m (dla ZL IV z pacjentami)

#### Drogi ewakuacyjne pionowe
- **Liczba klatek schodowych:** 3 klatki (spełnia wymaganie minimum 2)
- **Typ klatek:** klatki osłonięte (ściany EI 60, drzwi EI 30)
- **Szerokość biegów:** min. 1,20m (spełnione: 1,50m)
- **Nadciśnienie w klatkach:** system oddymiania z nadciśnieniem +50 Pa (aktywny przy pożarze)

#### Ewakuacja pozioma
- **Dla pacjentów leżących:** ewakuacja pozioma do sąsiedniej strefy pożarowej (przez drzwi dymoszczelne EI 30)
- **Zasada:** ewakuacja pacjentów leżących na tym samym poziomie do bezpiecznej strefy, a dopiero później ewakuacja pionowa (schodami lub dźwigami pożarowymi)

### Dźwigi

#### Dźwigi szpitalne
- **Liczba:** 3 dźwigi szpitalne
- **Funkcja pożarowa:** dźwigi mogą być używane przez straż pożarną (sterowanie uprzywilejowane)
- **Szybkość:** max 1,6 m/s
- **Nośność:** 1600 kg (transport łóżek szpitalnych)

#### Wymagania dźwigów pożarowych
- **Szyb dźwigowy:** ściany REI 60
- **Drzwi szybu:** EI 30 (dymoszczelne)
- **Zasilanie awaryjne:** dźwigi przełączają się na zasilanie awaryjne (agregat) przy pożarze
- **Sterowanie:** klucz strażacki (przejęcie sterowania przez straż pożarną)

## System sygnalizacji pożarowej (SSP)

### Typ systemu
- **System:** Instalacja systemu sygnalizacji pożarowej (SSP) wg PN-EN 54
- **Centrala:** centrala analogowo-adresowalna z wydrukiem zdarzeń
- **Zasięg:** cały budynek (wszystkie kondygnacje)

### Czujki
- **Korytarze, sale chorych:** czujki optyczne dymu
- **Pomieszczenia techniczne (kotłownia):** czujki temperatury
- **Kuchnie oddziałowe:** czujki ciepła (unikanie fałszywych alarmów)
- **Blok operacyjny:** czujki dymu (z opóźnieniem alarmu, aby uniknąć przerywania zabiegów)

### Alarmy
- **Sygnalizacja dźwiękowa:** syreny w korytarzach, klatkach schodowych
- **Sygnalizacja świetlna:** lampki stroboskopowe (dla osób niedosłyszących)
- **Przekaz do straży pożarnej:** automatyczny (transmisja cyfrowa do PSP)

### Sterowanie
- **Oddymianie klatek schodowych:** automatyczne uruchomienie nadciśnienia +50 Pa
- **Sterowanie dźwigami:** dźwigi jadą do poziomu parteru i otwierają drzwi (przejęcie przez straż)
- **Sterowanie drzwiami przeciwpożarowymi:** zamknięcie drzwi dymoszczelnych (samozamykacze)

## System oddymiania

### Klatki schodowe
- **Typ:** system nadciśnieniowy +50 Pa (przy pożarze)
- **Wentylatory:** wentylatory nadciśnieniowe na każdej klatce schodowej
- **Uruchomienie:** automatyczne (SSP) lub ręczne (przyciski ROP - Ręcznych Ostrzegaczy Pożarowych)

### Korytarze
- **Typ:** grawitacyjne oddymianie (klapy dymowe w sufitach, otwierane automatycznie)
- **Uruchomienie:** automatyczne (SSP)

## Hydranty i sprzęt gaśniczy

### Hydranty wewnętrzne (HW)
- **Lokalizacja:** na każdej kondygnacji, w korytarzach (max co 30m)
- **Typ:** hydranty 25mm z wężem półsztywnym 30m
- **Zasilanie:** z hydroforni (piwnice, 0.34) + zbiornik wyrównawczy

### Gaśnice
- **Typ:** gaśnice proszkowe ABC 6kg, gaśnice CO₂ 5kg (pomieszczenia techniczne, serwerownia)
- **Lokalizacja:** na każdej kondygnacji, przy wyjściach ewakuacyjnych, w pomieszczeniach technicznych
- **Rozstaw:** max co 30m

### Hydranty zewnętrzne
- **Lokalizacja:** droga pożarowa od strony południowo-zachodniej
- **Typ:** hydranty nadziemne DN 80
- **Zasięg:** max 75m od budynku

## Dostęp dla straży pożarnej

### Droga pożarowa
- **Lokalizacja:** od strony południowo-zachodniej, wewnątrzszpitalna droga dojazdowa
- **Plac manewrowy:** 20m × 20m w odległości 5,0m od budynku
- **Nośność:** min. 10 ton/oś
- **Szerokość:** min. 4,0m

### Wejścia dla straży
- **Główne wejście:** od strony południowej (parter)
- **Dostęp do piwnic:** od strony północno-wschodniej (dojazd techniczny)
- **Klatki schodowe:** 3 klatki dostępne z zewnątrz (drzwi otwierane przez straż)

## Przestrzenie w strefie

Strefa obejmuje **wszystkie kondygnacje** budynku Bloku D:

### Piwnice (LVL-KPCPULM-D-PIWNICA)
- Powierzchnia: 996,63 m²
- 51 pomieszczeń (0.1 - 0.51)
- Funkcje: prosektorium, pomieszczenia techniczne, szatnie, magazyny

### Parter (LVL-KPCPULM-D-PARTER)
- Powierzchnia: 1 487,70 m²
- 63 pomieszczenia (1.1 - 1.63)
- Funkcje: diagnostyka obrazowa, sterylizacja, pomieszczenia techniczne

### I Piętro (LVL-KPCPULM-D-PIETRO-01)
- Powierzchnia: 1 497,03 m²
- 92 pomieszczenia (2.1 - 2.92)
- Funkcje: OIOM, blok operacyjny, apteka

### II Piętro (LVL-KPCPULM-D-PIETRO-02)
- Powierzchnia: 1 411,37 m²
- 88 pomieszczeń (3.1 - 3.88)
- Funkcje: oddziały łóżkowe (2 oddziały, 65 łóżek)

### III Piętro (LVL-KPCPULM-D-PIETRO-03)
- Powierzchnia: 1 367,60 m²
- 88 pomieszczeń (4.1 - 4.88)
- Funkcje: oddziały łóżkowe (2 oddziały, 65 łóżek)

## Wymagania regulacyjne

### Przepisy dot. ochrony przeciwpożarowej
- **Rozporządzenie Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie**
- **PN-B-02851-1:** Ochrona przeciwpożarowa budynków - Odporność ogniowa elementów konstrukcji
- **PN-EN 54:** System sygnalizacji pożarowej

### Przepisy dot. budynków opieki zdrowotnej
- **Rozporządzenie Ministra Zdrowia w sprawie wymagań, jakim powinny odpowiadać pomieszczenia i urządzenia podmiotu wykonującego działalność leczniczą**
- Ewakuacja pozioma dla pacjentów leżących
- Drogi ewakuacyjne dostosowane do transportu łóżek szpitalnych

## Instrukcje i procedury

### Instrukcja bezpieczeństwa pożarowego (IBP)
- Dokument wymagany dla budynku (opracowany przez projektanta/inspektora ochrony przeciwpożarowej)
- Zawiera: zasady ewakuacji, rozmieszczenie sprzętu gaśniczego, schematy dróg ewakuacyjnych

### Procedury ewakuacji
- **Alarmu:** sygnał dźwiękowy (syreny) + komunikat głosowy (opcjonalnie)
- **Ewakuacja personelu:** przez klatki schodowe
- **Ewakuacja pacjentów leżących:** ewakuacja pozioma → ewakuacja pionowa (jeśli konieczne)
- **Pacjenci OIOM i bloku operacyjnego:** zabezpieczenie aparatury podtrzymującej życie, transport z aparaturą przenośną

### Oznakowanie
- Plany ewakuacyjne na każdej kondygnacji (przy wejściach do klatek schodowych)
- Znaki ewakuacyjne fotoluminescencyjne (kierunki ewakuacji)
- Oznakowanie hydrantów, gaśnic, ROP (Ręcznych Ostrzegaczy Pożarowych)

## Stan cyklu życia

- **Status:** planned (projektowany)

## Metadane

- **Kategoria budynku:** ZL (Zamieszkania Ludzi - budynek opieki zdrowotnej)
- **Wysokość budynku:** ~15-17m (średniowysoki)
- **Najbliższa jednostka PSP:** ~5km (centrum Bydgoszczy)
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.1.3

---

**Uwagi:** Strefa pożarowa ZL IV obejmuje cały budynek Bloku D. Ze względu na specyfikę szpitala (pacjenci leżący, blok operacyjny, OIOM) wymagana jest szczególna dbałość o drogi ewakuacyjne, system sygnalizacji pożarowej oraz procedury ewakuacji poziomej dla pacjentów o ograniczonej mobilności.
