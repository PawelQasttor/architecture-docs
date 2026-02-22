---
documentType: "project_specification"
projectName: "Residential Building Green Terrace"
projectLocation: "Warsaw, Poland"
projectPhase: "construction_documentation"
buildingClassification:
  category: "A"
  type: "residential_multi_family"
  description: "Apartment building"
buildingData:
  height: 18.5
  floors: 6
  grossFloorArea: 1800
  usableArea: 1620
  dwellingUnits: 18
  estimatedOccupants: 54
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    articles: ["Art. 5", "Art. 20", "Art. 34"]
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
  - standard: "PN-EN_1996"
  - standard: "PN-EN_1992"
bimLOD: "LOD_400"
version: "2.0.0"
lastReviewed: "2026-02-20"
authors:
  - name: "Anna Nowak"
    role: "lead_architect"
    license: "IARP 5678"
  - name: "Piotr Kowalski"
    role: "structural_engineer"
    license: "PZITB 1234"
---

# Specyfikacja Projektu: Budynek Mieszkalny "Zielony Taras"

## 1. Przegląd Projektu

### 1.1 Informacje Ogólne

**Nazwa projektu:** Budynek Mieszkalny "Zielony Taras"
**Lokalizacja:** ul. Słoneczna 45, 02-495 Warszawa, Polska
**Powierzchnia działki:** 1 250 m²
**Powierzchnia zabudowy:** 450 m²

**Inwestor:** Green Development Sp. z o.o.
**Główny Architekt:** Anna Nowak, IARP #5678
**Inżynier Konstruktor:** Piotr Kowalski, PZITB #1234

### 1.2 Dane Budynku

| Parametr | Wartość | Jednostka |
|----------|---------|-----------|
| **Wysokość budynku** | 18,5 | m |
| **Liczba kondygnacji** | 6 | - |
| **Powierzchnia całkowita** | 1 800 | m² |
| **Powierzchnia użytkowa** | 1 620 | m² |
| **Lokale mieszkalne** | 18 | mieszkań |
| **Szacowana liczba mieszkańców** | 54 | osób |
| **Miejsca parkingowe** | 22 | (2 dla niepełnosprawnych) |

### 1.3 Klasyfikacja Budynku

**Wg Prawa budowlanego:**
- **Kategoria:** A - Mieszkalna
- **Typ:** Budynek mieszkalny wielorodzinny
- **Kategoria wysokości:** Średniowysoki (12-25 m)
- **Klasa bezpieczeństwa pożarowego:** ZL III

---

## 2. Ramy Regulacyjne

### 2.1 Obowiązujące Przepisy

**Przepisy podstawowe:**

- **Prawo budowlane** (Dz.U. 1994 Nr 89 poz. 414)
  - Art. 5 - Wymagania ogólne
  - Art. 20 - Wymagania dotyczące dokumentacji technicznej
  - Art. 34 - Zawartość dokumentacji projektowej
  - Art. 41 - Realizacja budowy
  - Art. 57 - Zakończenie budowy

- **WT 2021** (Warunki Techniczne)
  - § 328 - Wymagania izolacji termicznej
  - § 234 - Wymagania bezpieczeństwa pożarowego
  - § 55 - Wymagania dostępności
  - § 206 - Urządzenia sanitarne
  - § 132 - Wysokości pomieszczeń

### 2.2 Normy Techniczne

**Normy Europejskie (PN-EN):**
- PN-EN 1996 - Projektowanie konstrukcji murowych
- PN-EN 1992 - Projektowanie konstrukcji betonowych
- PN-EN ISO 6946 - Obliczenia parametrów termicznych
- PN-EN 13501 - Klasyfikacja ogniowa

**Normy ISO:**
- PN-ISO 9001 - Zarządzanie jakością
- PN-ISO 19650 - Zarządzanie informacją BIM

---

## 3. Opis Projektu

### 3.1 Koncepcja Architektoniczna

**Zamysł projektowy:**
Współczesny budynek mieszkalny z naciskiem na:
- Efektywność energetyczną
- Światło naturalne
- Zielone tarasy na wyższych kondygnacjach
- Projektowanie dostępne dla wszystkich użytkowników

**Kompozycja elewacji:**
- Okładzina z ciepłej szarej cegły
- Duże okna zapewniające światło naturalne
- Zintegrowane balkony
- Zielony taras na 6. kondygnacji

### 3.2 Układ Konstrukcyjny

**Fundamenty:**
- Ławy fundamentowe żelbetowe
- Głębokość: 1,8 m poniżej terenu
- Nośność: 250 kPa
- Projekt fundamentów wg PN-EN 1997

**Układ nośny:**
- Ściany żelbetowe (200 mm)
- Stropy żelbetowe (200 mm)
- Projekt wg PN-EN 1992-1-1

**Dach:**
- Dach płaski z attyką
- System dachu zielonego (ekstensywny)
- Hydroizolacja: membrana PVC

### 3.3 Obudowa Budynku

**Ściany zewnętrzne:**
- Typ A: System murowy z ociepleniem
- Grubość całkowita: 447,5 mm
- Wartość U: 0,18 W/(m²·K)
- Klasa odporności ogniowej: REI 60
- Zobacz [Specyfikacja Ściany Zewnętrznej Typ A](sciana-zewnetrzna-typ-a.md)

**Dach:**
- Konstrukcja dachu zielonego
- Wartość U: 0,14 W/(m²·K)
- Hydroizolacja + izolacja termiczna + drenaż + roślinność

**Posadzka na gruncie:**
- Płyta betonowa na gruncie z izolacją
- Wartość U: 0,28 W/(m²·K)

**Okna:**
- Typ A: Ramy PVC, podwójne szklenie
- Uw = 0,85 W/(m²·K)
- Zobacz Specyfikacja Okna Typ A

### 3.4 Układ Mieszkań

**Struktura mieszkań:**
- 6× mieszkania jednopokojowe (45 m² każde)
- 9× mieszkania dwupokojowe (65 m² każde)
- 3× mieszkania trzypokojowe (85 m² każde)

**Wszystkie mieszkania zawierają:**
- Salon z kuchnią
- Sypialnia/Sypialnie
- Łazienka
- Dostęp do balkonu lub tarasu

---

## 4. Instalacje Techniczne

### 4.1 Instalacja HVAC

**Ogrzewanie:**
- Przyłącze do sieci ciepłowniczej
- Indywidualne opomiarowanie mieszkań
- Ogrzewanie podłogowe w łazienkach
- Grzejniki w pozostałych pomieszczeniach

**Wentylacja:**
- Wentylacja mechaniczna z odzyskiem ciepła (MVHR)
- Nawiew i wywiew w każdym mieszkaniu
- Sprawność odzysku ciepła: 85%

**Chłodzenie:**
- Chłodzenie pasywne przez wentylację nocną
- Opcjonalne klimatyzatory split (przygotowana instalacja)

### 4.2 Instalacja Wodno-Kanalizacyjna

**Zaopatrzenie w wodę:**
- Przyłącze do sieci miejskiej
- Indywidualne opomiarowanie mieszkań
- Ciepła woda: Centralny kocioł gazowy

**Kanalizacja sanitarna:**
- System kanalizacji grawitacyjnej
- Przyłącze do kanalizacji miejskiej

**Wody opadowe:**
- Retencja na dachu zielonym
- Przelew do miejskiej kanalizacji deszczowej

### 4.3 Instalacja Elektryczna

**Zasilanie:**
- Przyłącze 3-fazowe 400V
- Rozdzielnica główna w piwnicy
- Rozdzielnice piętrowe

**Oświetlenie:**
- Oświetlenie LED w całym budynku
- Czujniki dziennego światła i ruchu w częściach wspólnych

**Instalacje niskoprądowe:**
- Okablowanie strukturalne (Cat 6)
- Światłowód do każdego mieszkania
- System widedomofonu

---

## 5. Zgodność z Przepisami

### 5.1 Parametry Termiczne (WT 2021 § 328)

Wszystkie elementy obudowy spełniają lub przekraczają wymagania:

| Element | Wartość U | Wymagane | Status |
|---------|-----------|----------|--------|
| Ściany zewnętrzne | 0,18 W/(m²·K) | ≤ 0,20 | ✅ Zgodny |
| Dach | 0,14 W/(m²·K) | ≤ 0,15 | ✅ Zgodny |
| Posadzka na gruncie | 0,28 W/(m²·K) | ≤ 0,30 | ✅ Zgodny |
| Okna | 0,85 W/(m²·K) | ≤ 0,90 | ✅ Zgodny |
| Drzwi wejściowe | 1,20 W/(m²·K) | ≤ 1,30 | ✅ Zgodny |

**Charakterystyka energetyczna:**
- Roczne zapotrzebowanie na ogrzewanie: 45 kWh/(m²·rok)
- Klasa energetyczna: B

### 5.2 Bezpieczeństwo Pożarowe (WT 2021 § 234)

Wysokość budynku 18,5 m wymaga:

| Element | Wymagana klasa | Zaprojektowana | Status |
|---------|---------------|----------------|--------|
| Ściany nośne | REI 60 | REI 90 | ✅ Zgodny |
| Stropy | REI 60 | REI 90 | ✅ Zgodny |
| Obudowa klatki schodowej | REI 60 | REI 120 | ✅ Zgodny |

**Elementy bezpieczeństwa pożarowego:**
- Dwie niezależne drogi ewakuacyjne
- Chroniona klatka schodowa z drzwiami przeciwpożarowymi
- Oddymianie korytarzy
- System detekcji i sygnalizacji pożaru

### 5.3 Dostępność (WT 2021 § 55)

**Cechy projektowania uniwersalnego:**
- ✅ Wejście bezprogowe z poziomu ulicy
- ✅ Winda na wszystkie kondygnacje (kabina 110×145 cm)
- ✅ Szerokość korytarza: minimum 140 cm
- ✅ Szerokość przejścia w drzwiach: 95 cm w świetle
- ✅ Miejsca parkingowe dla niepełnosprawnych: 2 miejsca (szerokość 360 cm)
- ✅ Toaleta dostępna na parterze

**Winda:**
- Producent: KONE
- Typ: MonoSpace 500
- Udźwig: 630 kg (8 osób)
- Prędkość: 1,0 m/s

### 5.4 Wymagania dla Pomieszczeń

**Wysokości (WT 2021 § 132):**
- Pokoje dzienne: 2,70 m ✅ (min 2,50 m)
- Sypialnie: 2,70 m ✅ (min 2,50 m)
- Kuchnie: 2,50 m ✅ (min 2,20 m)
- Łazienki: 2,40 m ✅ (min 2,20 m)

**Urządzenia sanitarne (WT 2021 § 206):**
Na mieszkanie:
- ✅ 1× WC z wentylacją mechaniczną
- ✅ 1× Łazienka z wentylacją mechaniczną
- ✅ Kuchnia z wentylacją mechaniczną

---

## 6. Integracja BIM

### 6.1 Informacje o Modelu IFC

**Wersja IFC:** IFC 4.0
**LOD (Poziom Szczegółowości):** LOD 400
**Organizacja modelu:**
- IfcBuilding: "GreenTerrace"
- IfcBuildingStorey: Kondygnacje 0-6
- IfcSpace: Poszczególne pomieszczenia
- IfcBuildingElement: Ściany, stropy itp.

**Kluczowe klasy IFC:**
- IfcWallStandardCase - Ściany zewnętrzne i wewnętrzne
- IfcSlabStandardCase - Stropy
- IfcWindow - Okna
- IfcDoor - Drzwi
- IfcColumn - Słupy konstrukcyjne
- IfcStair - Klatki schodowe

### 6.2 Zestawy Właściwości

Wszystkie elementy zawierają:
- **Pset_WallCommon** - Właściwości ścian
- **Pset_SlabCommon** - Właściwości stropów
- **Pset_WindowCommon** - Właściwości okien
- **Qto_*BaseQuantities** - Zestawienia ilościowe

**Niestandardowe zestawy właściwości:**
- Pset_GreenTerrace_Thermal - Dane parametrów termicznych
- Pset_GreenTerrace_Compliance - Zgodność z przepisami
- Pset_GreenTerrace_Materials - Specyfikacje materiałowe

### 6.3 Pliki Modelu

**Lokalizacja:** `/bim/green-terrace/`
- `green-terrace-architecture.ifc` - Model architektoniczny
- `green-terrace-structure.ifc` - Model konstrukcyjny
- `green-terrace-mep.ifc` - Model instalacji
- `green-terrace-federated.ifc` - Model skoordynowany

---

## 7. Zrównoważony Rozwój

### 7.1 Efektywność Energetyczna

- Zapotrzebowanie na ogrzewanie: 45 kWh/(m²·rok)
- Energia pierwotna: 85 kWh/(m²·rok)
- Klasa energetyczna: B
- System MVHR: 85% odzysku ciepła

### 7.2 Rozwiązania Proekologiczne

- Dach zielony (ekstensywny): 450 m²
- Retencja wody deszczowej: 50 m³
- Rodzime gatunki roślin
- Wspieranie bioróżnorodności

### 7.3 Materiały

- Materiały o niskiej emisji LZO
- Zawartość recyklingowa tam, gdzie to możliwe
- Preferencja materiałów lokalnych

---

## 8. Harmonogram Budowy

| Faza | Czas trwania | Terminy |
|------|-------------|---------|
| **Wykopy i fundamenty** | 6 tygodni | Marzec-Kwiecień 2025 |
| **Konstrukcja (do dachu)** | 20 tygodni | Kwiecień-Wrzesień 2025 |
| **Obudowa budynku** | 12 tygodni | Wrzesień-Listopad 2025 |
| **Instalacje (stan surowy)** | 8 tygodni | Październik-Listopad 2025 |
| **Wykończenia** | 12 tygodni | Grudzień 2025-Luty 2026 |
| **Rozruch** | 4 tygodnie | Luty 2026 |
| **Zakończenie** | - | Marzec 2026 |

**Łączny czas trwania:** 52 tygodnie

---

## 9. Kosztorys

| Kategoria | Koszt | % |
|-----------|-------|---|
| **Fundamenty i konstrukcja** | 540 000 € | 30% |
| **Obudowa budynku** | 360 000 € | 20% |
| **Instalacje** | 450 000 € | 25% |
| **Wykończenia** | 270 000 € | 15% |
| **Prace zewnętrzne** | 90 000 € | 5% |
| **Rezerwa** | 90 000 € | 5% |
| **Razem** | **1 800 000 €** | **100%** |

**Koszt za m² (brutto):** 1 000 €/m²

---

## 10. Powiązana Dokumentacja

- [Ściana Zewnętrzna Typ A →](sciana-zewnetrzna-typ-a.md)
- Strop Typ A
- Okno Typ A
- Specyfikacja Materiałowa
- Lista Kontrolna Zgodności

---

## 11. Zatwierdzenia

| Rola | Imię i nazwisko | Uprawnienia | Podpis | Data |
|------|-----------------|-------------|--------|------|
| **Główny Architekt** | Anna Nowak | IARP #5678 | [Cyfrowy] | 2026-02-20 |
| **Inżynier Konstruktor** | Piotr Kowalski | PZITB #1234 | [Cyfrowy] | 2026-02-20 |
| **Inżynier Instalacji** | Jan Wiśniewski | PZITB #5678 | [Cyfrowy] | 2026-02-20 |
| **Zatwierdzenie Inwestora** | Green Development | - | [Cyfrowy] | 2026-02-20 |

---

**Wersja dokumentu:** 2.0.0
**Ostatnia aktualizacja:** 2026-02-20
**Status:** Dokumentacja wykonawcza (LOD 400)
