# Budynek Mieszkalny Zielony Taras

Kompletny, praktyczny przykład demonstrujący Standard Dokumentacji Architektonicznej dla 6-kondygnacyjnego budynku mieszkalnego w Warszawie, Polska.

## Przegląd Projektu

**Nazwa projektu:** Budynek Mieszkalny "Zielony Taras"
**Lokalizacja:** ul. Słoneczna 45, Warszawa, Polska
**Klasa budynku:** A (Budynek wielorodzinny)
**Wysokość:** 18,5 m (6 kondygnacji)
**Powierzchnia całkowita:** 1 800 m²
**Lokale mieszkalne:** 18 mieszkań
**BIM LOD:** 400 (Dokumentacja wykonawcza)

---

## Zestaw Dokumentacji

Ten przykład zawiera kompletną dokumentację wykonawczą zgodną ze Standardem Dokumentacji Architektonicznej:

### 1. Dokumentacja Projektowa

#### [Specyfikacja Projektu →](./specyfikacja-projektu)
Kompletny przegląd projektu i opis techniczny
- Dane budynku i klasyfikacja
- Ramy regulacyjne (Prawo budowlane, WT 2021)
- Projekt architektoniczny i konstrukcyjny
- Instalacje techniczne (HVAC, wodno-kanalizacyjne, elektryczne)
- Pełna weryfikacja zgodności
- Integracja BIM (IFC 4.0, LOD 400)
- Kosztorys i harmonogram

### 2. Specyfikacje Elementów

#### [Ściana Zewnętrzna - Typ A →](./sciana-zewnetrzna-typ-a)
Szczegółowa specyfikacja ściany zewnętrznej murowanej z ociepleniem
- Kompletne mapowanie IFC (IfcWallStandardCase)
- Specyfikacja 5 warstw materiałowych
- Parametry termiczne: U = 0,18 W/(m²·K) ✅
- Odporność ogniowa: REI 90 ✅
- Parametry akustyczne: Rw = 55 dB ✅
- Szczegóły wykonawcze i procedury kontroli jakości

#### Strop - Typ A
Specyfikacja stropu żelbetowego
- Mapowanie IFC (IfcSlabStandardCase)
- Warstwy materiałowe i zbrojenie
- Odporność ogniowa: REI 60 ✅
- Parametry akustyczne: Rw = 58 dB ✅

#### Okno - Typ A
Specyfikacja okna PVC
- Mapowanie IFC (IfcWindow)
- Parametry termiczne: Uw = 0,85 W/(m²·K) ✅
- Izolacyjność akustyczna: 35 dB

---

## Prezentowane Kluczowe Cechy

### ✅ Ustrukturyzowane Metadane (Odczytywalne przez AI)

Każdy dokument zawiera kompleksowy nagłówek YAML:

```yaml
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "compliant"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  status: "compliant"
---
```

### ✅ Zgodność z Polskimi Przepisami

**Prawo budowlane:**
- Art. 5 - Wymagania ogólne ✅
- Art. 20 - Dokumentacja techniczna ✅
- Art. 34 - Wymagania projektowe ✅

**WT 2021 (Warunki Techniczne):**
- § 328 - Izolacja termiczna ✅
- § 234 - Bezpieczeństwo pożarowe ✅
- § 55 - Dostępność ✅
- § 206 - Urządzenia sanitarne ✅
- § 132 - Wysokości pomieszczeń ✅

### ✅ Integracja BIM (IFC 4.0)

**Klasy IFC:**
- IfcBuilding: "GreenTerrace"
- IfcWallStandardCase - Ściany zewnętrzne
- IfcSlabStandardCase - Stropy
- IfcWindow - Okna i drzwi

**Zestawy właściwości:**
- Pset_WallCommon - Właściwości ścian
- Pset_SlabCommon - Właściwości stropów
- Pset_WindowCommon - Właściwości okien
- Qto_*BaseQuantities - Zestawienia ilościowe

**Specyfikacje LOD 400:**
- Szczegółowość na poziomie produkcji
- Kompletne specyfikacje
- Wszystkie produkty określone
- Instrukcje montażu

### ✅ Jakość Profesjonalna

**Kompletność na potrzeby budowy:**
- Specyfikacje materiałowe z produktami
- Informacje o dostawcach
- Kolejność montażu
- Procedury kontroli jakości
- Przywołane certyfikaty badań

**Gotowość do pozwolenia:**
- Wszystkie wymagania regulacyjne zweryfikowane
- Obliczenia udokumentowane
- Przejrzysty status zgodności
- Profesjonalne formatowanie

---

## Weryfikacja Zgodności

### Podsumowanie Parametrów Termicznych

| Element | Wartość U | Wymagana (WT § 328) | Status |
|---------|-----------|---------------------|--------|
| Ściany zewnętrzne | 0,18 W/(m²·K) | ≤ 0,20 W/(m²·K) | ✅ Zgodny |
| Dach | 0,14 W/(m²·K) | ≤ 0,15 W/(m²·K) | ✅ Zgodny |
| Posadzka na gruncie | 0,28 W/(m²·K) | ≤ 0,30 W/(m²·K) | ✅ Zgodny |
| Okna | 0,85 W/(m²·K) | ≤ 0,90 W/(m²·K) | ✅ Zgodny |

**Charakterystyka energetyczna:**
- Roczne zapotrzebowanie na ogrzewanie: 45 kWh/(m²·rok)
- Klasa energetyczna: B

### Podsumowanie Bezpieczeństwa Pożarowego

Wysokość budynku 18,5 m wymaga REI 60:

| Element | Wymagane | Zaprojektowane | Status |
|---------|----------|----------------|--------|
| Ściany nośne | REI 60 | REI 90 | ✅ Zgodny |
| Stropy | REI 60 | REI 90 | ✅ Zgodny |
| Klatka schodowa | REI 60 | REI 120 | ✅ Zgodny |

### Podsumowanie Dostępności

- ✅ Wejście bezprogowe z poziomu ulicy
- ✅ Winda na wszystkie kondygnacje (110×145 cm)
- ✅ Szerokość korytarza: minimum 140 cm
- ✅ Miejsca parkingowe dla osób niepełnosprawnych: 2 miejsca

---

## Jak Korzystać z Tego Przykładu

### Do Nauki

1. **Zapoznaj się ze strukturą** - Zobacz jak zorganizowana jest dokumentacja
2. **Przejrzyj nagłówki** - Zrozum strukturę metadanych
3. **Sprawdź zgodność** - Zobacz jak weryfikowane są przepisy
4. **Zbadaj dane BIM** - Poznaj integrację IFC

### Dla Twojego Projektu

1. **Skopiuj jako szablon** - Użyj jako punkt wyjścia
2. **Zaktualizuj metadane** - Zmień dane projektu w nagłówkach
3. **Dostosuj treść** - Zmodyfikuj pod swój budynek
4. **Zweryfikuj zgodność** - Zaktualizuj pod swoje wymagania
5. **Eksportuj do PDF** - Wygeneruj dokumenty do złożenia

### Kluczowe Wnioski

**Ze Specyfikacji Projektu:**
- Jak strukturyzować przegląd projektu
- Konfiguracja ram regulacyjnych
- Organizacja modelu BIM
- Integracja kosztów i harmonogramu

**Ze Specyfikacji Elementów:**
- Dokumentacja warstw materiałowych
- Obliczenia parametrów
- Mapowanie właściwości IFC
- Procedury kontroli jakości

---

## Najważniejsze Aspekty Techniczne

### Specyfikacje Materiałowe

Wszystkie materiały w pełni wyspecyfikowane z:
- Producentem i kodami produktów
- Właściwościami technicznymi
- Certyfikatami badań
- Wymaganiami montażowymi

**Przykład - Ściana Zewnętrzna:**
- Tynk mineralny Baumit MVR Uni
- Bloczki z betonu komórkowego Ytong PP4/0.6
- Izolacja XPS BASF Styrodur 3035 CS
- Płyta gipsowo-kartonowa Rigips RB

### Obliczenia Parametrów

**Termiczne:** wg PN-EN ISO 6946
```
U = 1 / RT = 1 / 5,93 = 0,17 W/(m²·K)
Wartość projektowa (z marginesem): 0,18 W/(m²·K)
```

**Pożarowe:** wg PN-EN 13501-2
- Certyfikat badania: FR2024-1234
- Wynik: REI 90

**Akustyczne:** wg PN-EN ISO 140-3
- Certyfikat badania: AC2024-5678
- Wynik: Rw = 55 dB

---

## Informacje o Modelu BIM

**Pliki IFC:**
- `green-terrace-architecture.ifc` - Model architektoniczny
- `green-terrace-structure.ifc` - Model konstrukcyjny
- `green-terrace-mep.ifc` - Model instalacji

**Statystyki modelu:**
- Łączna liczba elementów: 3 450
- Ściany: 245
- Stropy: 42
- Okna: 126
- Drzwi: 95

**Synchronizacja dwukierunkowa:**
- IFC → Markdown: Ekstrakcja właściwości
- Markdown → IFC: Aktualizacja specyfikacji
- Kontrola wersji przez Git

---

## Eksport do PDF

Wszystkie dokumenty można wyeksportować do profesjonalnych plików PDF:

```bash
# Pojedynczy dokument
pandoc project-specification.md -o project-spec.pdf

# Wszystkie dokumenty
./build-pdf.sh
```

Wygenerowane pliki PDF są gotowe do:
- Wniosków o pozwolenie na budowę
- Prezentacji dla inwestora
- Dokumentacji przetargowej
- Przeglądów regulacyjnych

---

## Zespół Projektowy

| Rola | Imię i nazwisko | Uprawnienia |
|------|-----------------|-------------|
| **Główny Architekt** | Anna Nowak | IARP #5678 |
| **Inżynier Konstruktor** | Piotr Kowalski | PZITB #1234 |
| **Inżynier Instalacji** | Jan Wiśniewski | PZITB #5678 |
| **Inwestor** | Green Development Sp. z o.o. | - |

---

## Powiązana Dokumentacja

**Normy i przepisy:**
- [Prawo Budowlane →](/pl/przepisy/prawo-budowlane)
- [WT 2021 →](/pl/przepisy/wt-2021)
- [Przegląd Standardów →](/pl/standardy/)

**Integracja BIM:**
- [Klasy IFC →](/pl/integracja-bim/encje-ifc)
- [Definicje LOD →](/pl/integracja-bim/definicje-lod)
- [Synchronizacja Dwukierunkowa →](/pl/integracja-bim/synchronizacja-dwukierunkowa)

**Szablony:**
- [Szablon Przestrzeni →](/pl/szablony/szablon-przestrzeni)
- [Szablon Wymagania →](/pl/szablony/szablon-wymagania)
- [Szablon Strefy →](/pl/szablony/szablon-strefy)

---

## Pobieranie

Chcesz wykorzystać ten przykład w swoim projekcie?

- Pobierz wszystkie pliki (ZIP) -- (dostępne w przyszłej wersji)
- Zobacz na GitHub -- (dostępne w przyszłej wersji)
- Sklonuj repozytorium -- (dostępne w przyszłej wersji)

---

**Status:** Dokumentacja wykonawcza (LOD 400)
**Ostatnia aktualizacja:** 2026-02-20
**Wersja:** 2.0.0
