---
documentType: "level"
entityType: "level"
id: "LVL-KPCPULM-D-PARTER"
levelName: "Parter (Ground Floor)"
buildingId: "BLD-KPCPULM-BLOK-D"
levelNumber: 0
typicalCeilingHeight: 3.3
version: "0.1.0"
---

# Poziom: Parter - Blok D

## Informacje podstawowe

**Typ encji:** Level
**ID:** LVL-KPCPULM-D-PARTER
**Nazwa:** Parter (Ground Floor)
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Numer poziomu:** 0
**Rzędna:** ~69,5-70,9 m n.p.m.

## Opis

Poziom parteru zawiera główne funkcje diagnostyczne (diagnostyka obrazowa: MRI, CT, RTG, USG, EKG) oraz centralną sterylizację i dezynfekcję. Pomieszczenia techniczne (kotłownia, wentylatornia) obsługują cały budynek. To główny poziom dostępu pacjentów do diagnostyki.

## Dane techniczne

### Powierzchnie
- **Powierzchnia użytkowa poziomu:** 1 487,70 m²
- **Liczba pomieszczeń:** 63 (1.1 - 1.63)

### Wysokości
- **Wysokość kondygnacji:** 4,20 m (typowa)
- **Wysokość pomieszczeń w świetle:** 3,30 m (typowa, pomieszczenia medyczne)
- **Wysokość wentylatorni:** 6,50 m (większa wysokość)

### Konstrukcja
- **Ściany zewnętrzne:** bloczki SILKA gr. 24cm, ocieplone wełną mineralną gr. 15cm
- **Ściany wewnętrzne konstrukcyjne:** bloczki SILKA gr. 24cm
- **Stropy:** żelbetowe monolityczne

## Właściwości dziedziczone dla przestrzeni

### Wykończenie typowe (pomieszczenia medyczne diagnostyczne)

#### Podłogi
- **Materiał:** płytki ceramiczne, antypoślizgowe
- **Parametry:** klasa ścieralności IV, szczelne, odporne na dezynfekcję
- **Uwagi:** fugi epoksydowe, wodoodporne

#### Ściany
- **Materiał:** płytki ceramiczne glazurowane do wysokości 2,0m, powyżej tynk gładki malowany farbą zmywalną
- **Parametry:** jasne kolory (biały, kremowy), łatwość czyszczenia i dezynfekcji
- **Uwagi:** w pracowniach RTG, CT, MRI - ściany z osłonami ołowianymi wg projektu fizyki medycznej

#### Sufity
- **Materiał:** sufit podwieszany modułowy (płyty 60×60cm)
- **Parametry:** biały, klasa czystości medycznej, dostęp do instalacji
- **Uwagi:** w pracowniach obrazowania - sufity z szynami sufitowymi dla aparatury

### Wykończenie specjalne (sterylizatornia)

#### Podłogi (strefa czysta sterylizatorni)
- **Materiał:** wykładzina PCW przewodząca elektrostatycznie
- **Parametry:** szczelna, bezprogowa, odporna na dezynfekcję, antyelektrostatyczna

#### Ściany (sterylizatornia)
- **Materiał:** płytki ceramiczne do sufitu
- **Parametry:** szczelne, odporne na parę wodną i dezynfekcję

#### Sufity (sterylizatornia)
- **Materiał:** sufit podwieszany szczelny, odporny na wilgoć
- **Parametry:** biały, gładki, bez szczelin

### Warunki środowiskowe

#### Temperatura
- **Pomieszczenia medyczne:** 22-24°C
- **Sterylizatornia:** 22-26°C (strefa brudna), 20-22°C (strefa czysta)
- **Pomieszczenia techniczne:** 18-22°C
- **Kotłownia:** wentylacja intensywna, temperatura robocza

#### Wilgotność
- **Pomieszczenia medyczne:** 40-60% RH
- **Sterylizatornia:** 40-60% RH (strefa czysta), kontrolowana

#### Wentylacja
- **Pomieszczenia medyczne:** nawiewno-wywiewna, 6-8 wymian/h
- **Sterylizatornia strefa czysta:** nadciśnienie +15 Pa, filtracja HEPA, 20 wymian/h
- **Sterylizatornia strefa brudna:** podciśnienie -10 Pa, 12 wymian/h
- **Pracownie obrazowania:** klimatyzacja precyzyjna (wymagania aparatury)
- **Kotłownia, wentylatornia:** wywiew intensywny

#### Oświetlenie
- **Naturalne:** okna w korytarzach i pomieszczeniach administracyjnych
- **Sztuczne:**
  - Pomieszczenia medyczne: 500 lx
  - Sterylizatornia: 500 lx (strefa czysta), 300 lx (strefa brudna)
  - Pracownie obrazowania: 300 lx, przyciemnione podczas badań
  - Korytarze: 200 lx

### Czystość powietrza
- **Sterylizatornia strefa czysta:** klasa ISO 8 (wg ISO 14644-1)
- **Sterylizatornia strefa brudna:** bez wymagań szczególnych
- **Pracownie diagnostyczne:** filtracja standardowa

## Funkcje główne

### Dział diagnostyki obrazowej (359,55 m²)
- Pracownia rezonansu magnetycznego (MRI) z sterowniami
- Pracownia tomografu komputerowego (CT) z sterowniami
- Pracownia RTG z sterowniami
- Pracownia USG
- Pracownia EKG
- Rejestracja, pokoje lekarzy, pokoje opisów

### Centralna sterylizacja i dezynfekcja (492,09 m²)
- Strefa brudna: przyjęcie do dezynfekcji, sterylizatornia brudna
- Strefa czysta: sterylizatornia czysta, ekspedycja, magazyn sterylny
- Sterylizacja gazowa
- Sterylizacja endoskopów
- Wytwornica pary
- Zaplecze: szatnie, biuro, magazyny

### Pomieszczenia techniczne (294,28 m²)
- Wentylatornia (152,16 m²)
- Kotłownia (80,80 m²)
- Magazyn oleju (9,94 m²)
- Komunikacja techniczna

## Strefy

### Strefa pożarowa
- **ID:** `ZONE-FIRE-ZL-IV`
- **Klasa:** ZL IV

### Strefy medyczne wg IEC 60364-7-710

#### Grupa 1 (kontakt z aparaturą medyczną)
- Pracownia rezonansu magnetycznego (1.19)
- Pracownia tomografu komputerowego (1.24)
- Pracownia RTG (1.28)

#### Grupa 0 (bez kontaktu z aparaturą aplikacyjną)
- Pozostałe pomieszczenia medyczne (USG, EKG, rejestracja)
- Sterylizatornia (obszar technologiczny, brak pacjentów)

### Strefy funkcjonalne
- Strefa diagnostyki obrazowej (dostęp pacjentów)
- Strefa sterylizacji (dostęp tylko personel)
- Strefa techniczna (dostęp ograniczony)

### Strefy czystości (sterylizatornia)
- Strefa brudna (przyjęcie materiału, mycie)
- Strefa czysta (sterylizacja, pakowanie, ekspedycja)
- Przepływ jednokierunkowy: brudna → czysta

## Dostęp

- **Główne wejście:** od strony południowej (pacjenci ambulatoryjni)
- **Dostęp dla pacjentów szpitalnych:** dźwigami z wyższych kondygnacji
- **Dostęp techniczny sterylizatorni:** osobny, od strony zachodniej
- **Komunikacja pionowa:** 3 klatki schodowe, dźwigi szpitalne

## Wymagania regulacyjne

### Bezpieczeństwo elektryczne (IEC 60364-7-710)
- **Grupa 1:** pracownie MRI, CT, RTG (osobne obiegi IT,監視 izolacji)
- **Grupa 0:** pozostałe pomieszczenia

### Przepisy radiologiczne
- Osłony przeciwradiacyjne w pracowniach RTG i CT
- Oznakowanie stref kontrolowanych
- Dozory radiologiczne dla personelu
- Zgodność z Prawem Atomowym

### Przepisy dot. rezonansu magnetycznego
- Strefa kontrolowana (pole magnetyczne > 0,5 mT)
- Kontrola dostępu (wykrywacze metalu)
- Oznakowanie niebezpieczeństwa pola magnetycznego
- Pomieszczenie techniczne ekranowane RF

### Przepisy dot. sterylizacji
- Separacja stref brudnej i czystej
- Przepływ jednokierunkowy materiału
- Pomieszczenia śluzy dla personelu
- Kontrola parametrów sterylizacji
- Zgodność z normami PN-EN (sterylizacja medyczna)

### Przepisy BHP
- Wentylacja awaryjna kotłowni
- Oznakowanie stref niebezpiecznych (MRI, RTG, kotłownia)
- Wyjścia ewakuacyjne

## Przestrzenie na poziomie

Lista 63 pomieszczeń (pliki w katalogu `/spaces/parter/`):

**Komunikacja i wejścia:**
- 1.1 - Przedsionek (3,11 m²)
- 1.2 - Klatka schodowa (22,92 m²)
- 1.3, 1.3a, 1.3b - Komunikacja (292,98 m² łącznie)

**Diagnostyka obrazowa (359,55 m²):**
- 1.4-1.30 - Pracownie MRI, CT, RTG, USG, EKG, sterownie, pokoje lekarzy

**Sterylizacja (492,09 m²):**
- 1.31-1.57 - Strefa brudna, strefa czysta, sterylizacja gazowa, endoskopowa

**Pomieszczenia techniczne (294,28 m²):**
- 1.58-1.63 - Wentylatornia, kotłownia, magazyn oleju

## Metadane

- **Poziom funkcjonalny:** Diagnostyczny, technologiczny
- **Dostęp publiczny:** Częściowy (diagnostyka obrazowa), ograniczony (sterylizatornia, pomieszczenia techniczne)
- **Godziny pracy:**
  - Diagnostyka: 7:00-19:00 (poniedziałek-piątek), dyżury w weekendy
  - Sterylizatornia: 6:00-18:00 (poniedziałek-piątek)
  - Pomieszczenia techniczne: 24/7

---

**Wersja schematu SBM:** v0.1.3
**Data utworzenia dokumentu:** 2026-02-23
