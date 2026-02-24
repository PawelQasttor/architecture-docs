---
documentType: "level"
entityType: "level"
id: "LVL-KPCPULM-D-PIWNICA"
levelName: "Piwnica"
buildingId: "BLD-KPCPULM-BLOK-D"
levelNumber: -1
typicalCeilingHeight: 3
version: "0.1.0"
---

# Poziom: Piwnica - Blok D

## Informacje podstawowe

**Typ encji:** Level
**ID:** LVL-KPCPULM-D-PIWNICA
**Nazwa:** Piwnica
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Numer poziomu:** -1
**Rzędna:** ~65,5-66,9 m n.p.m.

## Opis

Poziom piwnic Bloku D zawiera pomieszczenia techniczne, zaplecze sanitarne dla personelu, prosektorium, magazyny i spedycję odpadów medycznych, oraz pomieszczenia dla gazów medycznych. Piwnice są częściowo zagłębione, posadowione na rzędnych 65,5-66,9 m n.p.m., powyżej poziomu wód gruntowych (63-64 m n.p.m.).

## Dane techniczne

### Powierzchnie
- **Powierzchnia użytkowa poziomu:** 996,63 m²
- **Liczba pomieszczeń:** 51 (0.1 - 0.51)

### Wysokości
- **Wysokość kondygnacji:** 3,80 m (typowa)
- **Wysokość pomieszczeń w świetle:** 3,00 m (typowa)

### Konstrukcja
- **Ściany zewnętrzne:** żelbetowe gr. 24cm (beton B25), ocieplone styropianem ekstrudowanym gr. 8cm (poniżej terenu) lub wełną mineralną gr. 15cm (powyżej terenu)
- **Ściany wewnętrzne konstrukcyjne:** bloczki SILKA gr. 24cm
- **Stropy:** żelbetowe monolityczne
- **Izolacja przeciwwodna:** szczelny beton lub ciężka izolacja (strefa wód gruntowych)

## Właściwości dziedziczone dla przestrzeni

### Wykończenie typowe (pomieszczenia techniczne i magazyny)

#### Podłogi
- **Materiał:** posadzka przemysłowa, epoksydowa, chemoodporna
- **Parametry:** antypoślizgowa, łatwa w utrzymaniu czystości
- **Uwagi:** odporna na chemikalia (chlorownia, magazyny odpadów)

#### Ściany
- **Materiał:** tynk cementowo-wapienny, powłoka zmywalna
- **Parametry:** odporność na wilgoć, łatwość czyszczenia
- **Uwagi:** w pomieszczeniach mokrych (chlorownia, hydrofornia) - płytki ceramiczne do sufitu

#### Sufity
- **Materiał:** tynk cementowo-wapienny, malowany farbą emulsyjną
- **Parametry:** biały, odporność na wilgoć

### Wykończenie specjalne (prosektorium, pomieszczenia sanitarne)

#### Podłogi (prosektorium, łazienki)
- **Materiał:** płytki ceramiczne, antypoślizgowe
- **Parametry:** szczelne, odporne na dezynfekcję

#### Ściany (prosektorium, łazienki)
- **Materiał:** płytki ceramiczne do wysokości sufitu
- **Parametry:** szczelne, odporne na dezynfekcję, łatwe w utrzymaniu czystości

### Warunki środowiskowe

#### Temperatura
- **Typowa:** 18-20°C (pomieszczenia techniczne, magazyny)
- **Szatnie, sanitariaty:** 22-24°C
- **Prosektorium:** 16-18°C (sala sekcyjna), 4-8°C (chłodnia zwłok)

#### Wentylacja
- **Typ:** mechaniczna wywiewna lub nawiewno-wywiewna
- **Parametry:**
  - Pomieszczenia techniczne: 2-4 wymian/h
  - Szatnie, łazienki: 6-10 wymian/h
  - Prosektorium: wywiew miejscowy, nadciśnienie ujemne
  - Chlorownia, magazyny gazów: intensywna wentylacja awaryjna

#### Oświetlenie
- **Naturalne:** ograniczone (okna w części wschodniej i zachodniej)
- **Sztuczne:** LED, 150-300 lx (pomieszczenia techniczne), 500 lx (prosektorium, szatnie)

## Funkcje główne

### Prosektorium (143,49 m²)
Pomieszczenia: poczekalnia, kancelaria, WC interesantów, śluzy, łazienka, sala sekcyjna, chłodnia zwłok, przygotowanie i wydawanie zwłok, zaplecze, pomieszczenie dostawy.

### Szatnie personelu medycznego
Szatnia damska (172,58 m²), szatnia męska (30,29 m²) z łazienkami i natryskami.

### Spedycja i magazyny
- Spedycja bielizny brudnej
- Magazyny odpadów: chemiczne, zakaźne, niebezpieczne, specjalne
- Mycie i suszenie środków transportu

### Pomieszczenia techniczne
- Hydrofornia (140,66 m²)
- Rozprężalnia gazów medycznych (19,14 m²)
- Sprężalnia gazów medycznych (24,88 m²)
- Serwerownia (27,85 m²)
- Pomieszczenie chloratora (7,79 m²)
- Rozdzielnia elektryczna (9,70 m²)

### Utrzymanie czystości
Magazyny środków czystości, mycie i suszenie mopów, garaż wózków.

## Strefy

### Strefa pożarowa
- **ID:** `ZONE-FIRE-ZL-IV`
- **Klasa:** ZL IV

### Strefy funkcjonalne
- Strefa techniczna (hydrofornia, gazy medyczne, kotłownia dostęp z parteru)
- Strefa prosektorium (dostęp kontrolowany)
- Strefa logistyczna (spedycja, magazyny odpadów)
- Strefa personelu (szatnie, sanitariaty)

## Dostęp

- **Dojazd techniczny:** od strony północno-wschodniej (dostawy, odbiór odpadów, odbiór zwłok)
- **Komunikacja pionowa:** 3 klatki schodowe, dźwigi szpitalne
- **Dostęp dla personelu:** z poziomu parteru schodami

## Wymagania regulacyjne

### Bezpieczeństwo elektryczne (IEC 60364-7-710)
- **Grupa 0:** wszystkie pomieszczenia (brak aparatury medycznej z częściami aplikacyjnymi)

### Przepisy sanitarne
- Prosektorium: zgodność z przepisami dotyczącymi zakładów patomorfologii
- Magazyny odpadów: segregacja i przechowywanie zgodnie z przepisami o odpadach medycznych
- Chlorownia: wentylacja awaryjna, wykrywacze chloru

### Przepisy BHP
- Dostęp do pomieszczeń technicznych: tylko personel upoważniony
- Oznakowanie pomieszczeń z gazami medycznymi
- Wyjścia ewakuacyjne z prosektorium

## Przestrzenie na poziomie

Lista 51 pomieszczeń (pliki w katalogu `/spaces/piwnica/`):

- 0.1 - Klatka schodowa (22,91 m²)
- 0.2 - Komunikacja (45,08 m²)
- 0.3 - Maszynownia (5,53 m²)
- 0.4 - Komunikacja (20,70 m²)
- 0.5 - Poczekalnia (12,79 m²)
- ... (pełna lista w plikach przestrzeni)

## Metadane

- **Poziom funkcjonalny:** Techniczny, logistyczny, zaplecze
- **Dostęp publiczny:** Ograniczony (tylko prosektorium - strefa kontrolowana)
- **Godziny pracy:** 24/7 (pomieszczenia techniczne), 8:00-16:00 (prosektorium)

---

**Wersja schematu SBM:** v0.1.3
**Data utworzenia dokumentu:** 2026-02-23
