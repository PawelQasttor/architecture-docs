---
documentType: "element_specification"
elementType: "external_wall"
elementReference: "EW-01"
projectName: "Residential Building Green Terrace"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
  materialLayerSet: "ExternalWall_TypeA_Layers"
bimLOD: "LOD_400"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Safe and durable construction"
    status: "compliant"
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Complete technical specification"
    status: "compliant"
  - standard: "WT_2021"
    section: "§ 328"
    requirement: "U-value ≤ 0.20 W/(m²·K)"
    status: "compliant"
  - standard: "WT_2021"
    section: "§ 234"
    requirement: "Fire rating REI 60 (building height 18.5m)"
    status: "compliant"
  - standard: "PN-EN_1996"
    description: "Masonry structures design"
    status: "verified"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  unit: "W/(m²·K)"
  status: "compliant"
  margin: 0.02
  calculationMethod: "PN-EN ISO 6946"
fireResistance:
  requiredRating: "REI 60"
  designRating: "REI 90"
  testCertificate: "FR2024-1234"
  status: "compliant"
acousticPerformance:
  soundInsulation: 55
  unit: "dB"
  testCertificate: "AC2024-5678"
version: "1.5.0"
lastReviewed: "2026-02-20"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Ściana Zewnętrzna - Typ A

## 1. Przegląd Elementu

**Oznaczenie elementu:** EW-01
**Typ elementu:** Zewnętrzna ściana nośna
**Lokalizacja:** Wszystkie elewacje zewnętrzne
**Typowa wysokość:** 2,70 m (od podłogi do sufitu)
**Powierzchnia całkowita:** ~1 245 m²

---

## 2. Informacje BIM

### 2.1 Mapowanie IFC

**Klasa IFC:** `IfcWallStandardCase`
**Typ obiektu:** ExternalWall_TypeA
**Identyfikator globalny (GUID):** `3vB2YO$rLBxv3VxEu2LPxQ`
**Zestaw warstw materiałowych:** ExternalWall_TypeA_Layers

**LOD:** 400 (Dokumentacja wykonawcza)

### 2.2 Właściwości IFC (Pset_WallCommon)

| Właściwość | Wartość | Jednostka | Uwagi |
|------------|---------|-----------|-------|
| **LoadBearing** | Yes | - | Ściana konstrukcyjna |
| **IsExternal** | Yes | - | Obudowa budynku |
| **FireRating** | REI 90 | - | Przekracza wymaganie REI 60 |
| **ThermalTransmittance** | 0,18 | W/(m²·K) | Wartość U |
| **AcousticRating** | 55 | dB | Rw |
| **Reference** | EW-01 | - | Oznaczenie typu |
| **Status** | NEW | - | Nowa budowa |
| **ExtendToStructure** | true | - | Dochodzi do stropu powyżej |

### 2.3 Ilości (Qto_WallBaseQuantities)

| Właściwość | Wartość | Jednostka |
|------------|---------|-----------|
| **Length** | Zmienna | m |
| **Width** | 0,4475 | m |
| **Height** | 2,70 | m (typowa) |
| **GrossSideArea** | 1 245 | m² (łącznie) |
| **NetSideArea** | 1 050 | m² (po odliczeniu otworów) |
| **GrossVolume** | 557 | m³ (łącznie) |
| **NetVolume** | 470 | m³ |

---

## 3. Specyfikacja Warstw Materiałowych

### 3.1 Układ Warstw (IfcMaterialLayerSet)

**Grubość całkowita:** 447,5 mm

| Warstwa | Materiał | Grubość | λ [W/(m·K)] | Producent | Kod produktu |
|---------|----------|---------|-------------|-----------|--------------|
| **1** | Tynk mineralny | 15 mm | 0,82 | Baumit | MVR Uni |
| **2** | Bloczek betonowy (drążony) | 200 mm | 0,55 | Ytong | PP4/0.6 |
| **3** | Płyta izolacyjna XPS | 180 mm | 0,035 | BASF Styrodur | 3035 CS |
| **4** | Przestrzeń wentylowana | 40 mm | - | - | - |
| **5** | Płyta gipsowo-kartonowa | 12,5 mm | 0,21 | Rigips | RB 12.5mm |

### 3.2 Szczegóły Warstw

#### Warstwa 1: Tynk Zewnętrzny

**Produkt:** Tynk mineralny Baumit MVR Uni
**Grubość:** 15 mm (±2 mm)
**Kolor:** Ciepły szary (niestandardowy odcień)
**Wykończenie:** Faktura drapanego tynku, ziarno 2,0 mm
**Aplikacja:** System dwuwarstwowy na siatce
- Warstwa podkładowa: 10 mm z wtopioną siatką
- Warstwa wykończeniowa: 5 mm

**Właściwości:**
- Przepuszczalność pary wodnej: sd < 0,5 m
- Odporność na cykle zamrażania-rozmrażania
- Stabilność UV

#### Warstwa 2: Mur Konstrukcyjny

**Produkt:** Bloczki z autoklawizowanego betonu komórkowego Ytong PP4/0.6
**Wymiary:** 200×240×599 mm (W×Sz×D)
**Wytrzymałość na ściskanie:** 4,0 MPa
**Gęstość objętościowa:** 600 kg/m³
**Przewodność cieplna:** λ = 0,55 W/(m·K)

**Zaprawa:**
- Typ: Zaprawa cienkowarstwowa (Ytong)
- Grubość spoiny: 2-3 mm
- Klasa wytrzymałości: M5

**Wykonanie:**
- Pierwsza warstwa: Na wodoszczelnej izolacji przeciwwilgociowej
- Spoiny pionowe: Na pióro i wpust (bez zaprawy)
- Spoiny poziome: Zaprawa cienkowarstwowa
- Kotwy ścienne: Ze stali nierdzewnej, 4 szt./m²

#### Warstwa 3: Izolacja Termiczna

**Produkt:** Polistyren ekstrudowany (XPS) BASF Styrodur 3035 CS
**Grubość:** 180 mm (2× 90 mm warstwy z przesunięciem spoin)
**Przewodność cieplna:** λD = 0,035 W/(m·K)
**Wytrzymałość na ściskanie:** 300 kPa
**Nasiąkliwość:** < 0,7% objętościowo

**Mocowanie:**
- Typ: Łączniki izolacji Fischer DIPK 8/60-90
- Gęstość: 6 łączników na m²
- Dodatkowo: Klej (2-3 placki na płytę)

**Montaż:**
- Przesunąć spoiny pionowo i poziomo
- Szczelne dopasowanie, bez szczelin
- Płyty ciąć, nie ściskać

#### Warstwa 4: Przestrzeń Wentylowana

**Szerokość:** 40 mm
**Typ:** Przestrzeń wentylowana
**Funkcja:**
- Odprowadzanie wilgoci
- Wyrównywanie ciśnienia
- Wentylacja

**Otwory wentylacyjne:**
- Na dole: Otwory odpływowe, średnica 10 mm, co 450 mm
- Na górze: Ciągły pas wentylacyjny pod okapem

#### Warstwa 5: Wykończenie Wewnętrzne

**Produkt:** Standardowa płyta gipsowo-kartonowa Rigips RB
**Grubość:** 12,5 mm
**Wymiary:** Arkusze 1 200×2 600 mm

**Montaż:**
- Placki klejowe (Rigips Rimano) na murze
- Rozstaw 300 mm pionowo i poziomo
- Spoiny: Taśmowane i szpachlowane (Rigips Vario)

**Wykończenie:**
- Grunt: Rigips Latex primer
- Farba: Lateksowa wewnętrzna (przez innych)

---

## 4. Specyfikacje Parametrów

### 4.1 Parametry Termiczne

**Obliczenia wg PN-EN ISO 6946:**

| Warstwa | Materiał | d [m] | λ [W/(m·K)] | R [m²·K/W] |
|---------|----------|-------|-------------|------------|
| Rsi | Powierzchnia wewnętrzna | - | - | 0,13 |
| 5 | Płyta gipsowa | 0,0125 | 0,21 | 0,06 |
| 4 | Przestrzeń powietrzna | 0,040 | - | 0,18 |
| 3 | Izolacja XPS | 0,180 | 0,035 | 5,14 |
| 2 | Bloczek betonowy | 0,200 | 0,55 | 0,36 |
| 1 | Tynk mineralny | 0,015 | 0,82 | 0,02 |
| Rse | Powierzchnia zewnętrzna | - | - | 0,04 |
| **Razem** | | | **RT** | **5,93** |

**Wartość U:** U = 1 / RT = **0,17 W/(m²·K)**

**Zgodność:**
- **Obliczona:** 0,17 W/(m²·K)
- **Projektowa (z marginesem bezpieczeństwa):** 0,18 W/(m²·K)
- **Wymagana (WT § 328):** ≤ 0,20 W/(m²·K)
- **Status:** ✅ **Zgodny** (margines: 0,02 W/(m²·K))

**Redukcja mostków termicznych:**
- Ciągła warstwa izolacji
- Brak przejść przez izolację
- Montaż okien w płaszczyźnie izolacji
- Szczegół przejścia przy fundamentach: Patrz DT-001

### 4.2 Odporność Ogniowa

**Wymagana klasa (WT § 234):** REI 60 (wysokość budynku 18,5 m)
**Klasa projektowa:** REI 90

**Klasyfikacja ogniowa materiałów:**

| Warstwa | Materiał | Euroklasa | Udział |
|---------|----------|-----------|--------|
| 1 | Tynk mineralny | A1 | Niepalny |
| 2 | Bloczki z betonu komórkowego | A1 | Niepalny |
| 3 | Izolacja XPS | E | Palny (zabezpieczony) |
| 5 | Płyta gipsowa | A2-s1,d0 | Niepalny |

**Badanie ogniowe:**
- Certyfikat: FR2024-1234
- Norma badawcza: PN-EN 13501-2
- Data badania: 2024-06-15
- Wynik: REI 90

**Przegrody ogniowe:**
- Bariery ogniowe w przestrzeni na każdej kondygnacji
- Uszczelnienie ogniochronne przy przejściach

### 4.3 Parametry Akustyczne

**Izolacyjność akustyczna:** Rw = 55 dB

**Pomiar:**
- Norma badawcza: PN-EN ISO 140-3
- Certyfikat badania: AC2024-5678
- Data badania: 2024-07-20

**Czynniki wpływające:**
- Masa warstwy murowej: 120 kg/m²
- Przestrzeń powietrzna: Odsprzęgnięcie
- Wielowarstwowość: Absorpcja dźwięku

### 4.4 Ochrona Przed Wilgocią

**Ochrona przed wodą opadową:**
- Zasada ekranu przeciwdeszczowego
- Odprowadzanie wody z przestrzeni wentylowanej
- Otwory odpływowe u podstawy
- Wodoszczelna izolacja przeciwwilgociowa przy fundamentach

**Kontrola dyfuzji pary:**
- Dyfuzyjnie otwarty od zewnątrz (tynk, sd < 0,5 m)
- Obliczenia dyfuzji wg PN-EN ISO 13788
- Brak ryzyka kondensacji
- Diagram Glasera: Dostępny w teczce obliczeń

**Szczelność powietrzna:**
- Cel: 0,6 ACH przy 50 Pa (standard domu pasywnego)
- Ciągła bariera powietrzna: Tynk wewnętrzny + uszczelnione spoiny
- Przejścia: Uszczelnione pianką rozprężną + taśmą

---

## 5. Szczegóły Wykonawcze

### 5.1 Połączenia

**Ściana-Fundament:**
- Szczegół: DT-001
- Izolacja przeciwwilgociowa: Membrana bitumiczna, zakład 150 mm
- Pierwsza warstwa: Wypoziomowana na warstwie zaprawy
- Izolacja: Ciągłość z izolacją fundamentów

**Ściana-Strop:**
- Szczegół: DT-002
- Oparcie: Na pełnej szerokości bloczka (200 mm)
- Bariera ogniowa: W przestrzeni, na każdej kondygnacji
- Izolacja akustyczna: Podkładka elastyczna pod stropem

**Ściana-Dach:**
- Szczegół: DT-003
- Wysokość attyki: 600 mm ponad dachem
- Daszek: Aluminiowy, ze spadkiem
- Obróbka: Pod daszkiem, na izolacji

**Narożniki:**
- Szczegół: DT-004
- Mur: Wiązanie na zakład
- Izolacja: Ciągła, zawinięta na narożnikach
- Siatka tynkarska: Zawinięta na narożnikach + narożnik ochronny

**Integracja okien:**
- Szczegóły: DT-005, DT-006, DT-007
- Parapet: Prefabrykowany betonowy ze spadkiem
- Ościeżnica: Rama okna w płaszczyźnie izolacji
- Nadproże: Prefabrykowane, z przerwaniem mostka termicznego

### 5.2 Kolejność Montażu

1. **Przygotowanie podłoża**
   - Oczyszczenie wierzchu fundamentu
   - Montaż membrany przeciwwilgociowej
   - Wypoziomowanie warstwą zaprawy (w razie potrzeby)

2. **Wykonanie muru**
   - Ułożenie pierwszej warstwy: Kontrola poziomu i pionu
   - Kolejne warstwy: Zaprawa cienkowarstwowa
   - Montaż kotew ściennych 4 szt./m²
   - Nadproża okienne/drzwiowe: Wg rysunków konstrukcyjnych

3. **Montaż izolacji**
   - Oczyszczenie powierzchni muru
   - Nałożenie placków klejowych
   - Montaż pierwszej warstwy: Przesunięcie spoin
   - Montaż drugiej warstwy: Offsetowanie spoin względem pierwszej
   - Łączniki mechaniczne: 6 szt./m²
   - Docinanie przy otworach

4. **Warstwa podkładowa tynku**
   - Siatka: Wtopiona w warstwę podkładową
   - Grubość: 10 mm
   - Schnięcie: Minimum 48 godzin

5. **Warstwa wykończeniowa tynku**
   - Grubość: 5 mm
   - Faktura: Drapana, 2,0 mm
   - Schnięcie: Wg producenta

6. **Wykończenie wewnętrzne**
   - Płyty gipsowo-kartonowe: Na plackach klejowych
   - Obróbka spoin
   - Gruntowanie i malowanie (przez innych)

### 5.3 Kontrola Jakości

**Wymagane kontrole:**

| Etap | Kontrola | Wymaganie | Odpowiedzialny |
|------|----------|-----------|----------------|
| Fundamenty | Montaż izolacji przeciwwilgociowej | Ciągła, z zakładem | Kierownik budowy |
| Mur | Pion i linia | ±5 mm na 3 m | Inżynier budowy |
| Mur | Spoiny zaprawowe | Grubość 2-3 mm | Kierownik budowy |
| Izolacja | Ciągłość warstwy | Brak szczelin > 2 mm | Specjalista ds. termiki |
| Izolacja | Łączniki | 6 szt./m², lico z powierzchnią | Kierownik budowy |
| Tynk | Grubość | 15 mm ±2 mm | Wykonawca tynku |
| Szczelność | Badanie Blower Door | ≤ 0,6 ACH przy 50 Pa | Firma badawcza |

**Badania:**
- Termowizja: Po izolacji, przed tynkiem
- Badanie Blower Door: Przed wykończeniami wewnętrznymi
- Kontrola wzrokowa: Na każdym etapie

---

## 6. Podsumowanie Zgodności z Przepisami

| Wymaganie | Norma | Wartość wymagana | Wartość projektowa | Status |
|-----------|-------|------------------|-------------------|--------|
| **Izolacja termiczna** | WT § 328 | U ≤ 0,20 W/(m²·K) | U = 0,18 W/(m²·K) | ✅ Zgodny |
| **Odporność ogniowa** | WT § 234 | REI 60 | REI 90 | ✅ Zgodny |
| **Izolacja akustyczna** | PN-B-02151 | Rw ≥ 50 dB | Rw = 55 dB | ✅ Zgodny |
| **Projekt konstrukcyjny** | PN-EN 1996 | Zweryfikowany | Zweryfikowany | ✅ Zgodny |
| **Ochrona przed wilgocią** | PN-EN ISO 13788 | Brak kondensacji | Brak kondensacji | ✅ Zgodny |

---

## 7. Zrównoważony Rozwój

**Parametry środowiskowe:**
- Ślad węglowy: 85 kg CO₂e/m²
- Zawartość recyklingowa: 40% (beton komórkowy, XPS)
- Materiały lokalne: Bloczki (Polska), Izolacja (Niemcy)

**Trwałość:**
- Projektowy okres użytkowania: 50+ lat
- Tynk: 25 lat (konserwacja po 15 latach)
- Izolacja: Na cały okres użytkowania budynku
- Bloczki: Na cały okres użytkowania budynku

**Konserwacja:**
- Kontrola wzrokowa: Coroczna
- Tynk: Co 5 lat
- Gruntowny remont: 25-30 lat

---

## 8. Kosztorys

| Pozycja | Ilość | Jednostka | Cena jedn. | Koszt |
|---------|-------|-----------|------------|-------|
| **Mur** | 560 m² | m² | 45 € | 25 200 € |
| **Izolacja** | 1 245 m² | m² | 35 € | 43 575 € |
| **Tynk** | 1 245 m² | m² | 55 € | 68 475 € |
| **Wykończenie wewnętrzne** | 1 245 m² | m² | 25 € | 31 125 € |
| **Nadproża i elementy dod.** | 1 | kpl. | 15 000 € | 15 000 € |
| **Suma częściowa** | | | | **183 375 €** |
| **Rezerwa (5%)** | | | | 9 169 € |
| **Razem** | | | | **192 544 €** |

**Koszt za m²:** 155 €/m² (powierzchnia ściany brutto)

---

## 9. Powiązane Dokumenty

**Rysunki:**
- A-101: Rzuty kondygnacji
- A-201: Elewacje
- A-301: Przekroje
- A-401: Szczegóły ścian DT-001 do DT-007

**Specyfikacje:**
- [Specyfikacja Projektu](specyfikacja-projektu.md)
- Specyfikacja Materiałowa
- Okno Typ A

**Obliczenia:**
- TC-01: Obliczenie parametrów termicznych
- SC-01: Obliczenie nośności konstrukcji
- MC-01: Analiza wilgotnościowa (diagram Glasera)

**Certyfikaty:**
- FR2024-1234: Badanie odporności ogniowej
- AC2024-5678: Badanie parametrów akustycznych

**Model BIM:**
- `/bim/green-terrace/green-terrace-architecture.ifc`

---

## 10. Zatwierdzenia

| Rola | Imię i nazwisko | Uprawnienia | Podpis | Data |
|------|-----------------|-------------|--------|------|
| **Architekt** | Anna Nowak | IARP #5678 | [Cyfrowy] | 2026-02-20 |
| **Inżynier Konstruktor** | Piotr Kowalski | PZITB #1234 | [Cyfrowy] | 2026-02-20 |

---

**Wersja dokumentu:** 1.5.0
**Ostatnia aktualizacja:** 2026-02-20
**BIM LOD:** 400
**Status:** Dokumentacja wykonawcza
