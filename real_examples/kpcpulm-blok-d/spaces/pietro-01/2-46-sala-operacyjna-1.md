---
documentType: "space"
entityType: "space"
id: "SPC-KPCPULM-D-2-46"
spaceName: "Sala operacyjna 1"
roomNumber: "2.46"
buildingId: "BLD-KPCPULM-BLOK-D"
levelId: "LVL-KPCPULM-D-PIETRO-01"
departmentId: "DEPT-BLOK-OPERACYJNY"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
lifecycleState: "planned"
electricalSafetyGroup: "group_2"
version: "0.1.0"
---

# Przestrzeń: 2.46 - Sala operacyjna 1

## Informacje podstawowe

**Typ encji:** Space
**ID:** `SPC-KPCPULM-D-2-46`
**Numer pomieszczenia:** 2.46
**Nazwa:** Sala operacyjna 1
**Poziom:** `LVL-KPCPULM-D-PIETRO-01`
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Dział:** `DEPT-BLOK-OPERACYJNY`

## Funkcja

**Typ funkcji:** Medyczna - Blok operacyjny
**Kategoria:** Medical - Operating Room
**Opis:** Sala operacyjna w bloku operacyjnym o łącznej powierzchni 525,40 m². Jedna z dwóch sal operacyjnych na I piętrze (druga: 2.50, 43,55 m²).

## Wymiary

- **Powierzchnia użytkowa:** 45,85 m²

## Wysokość

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-01`:

- **Wysokość pomieszczeń w świetle:** 3,50 m (sale operacyjne)

## Wykończenie

> Dane z tabeli wykończeń (sekcja 4.5 opisu technicznego), pomieszczenia nr 2.46, 2.50.

### Podłogi
- **Materiał:** wykładzina rulonowa PCV higieniczna, jednorodna, bezspoinowa, termozgrzewalna
- **Klasa ścieralności:** P (silnie eksploatowane, duże natężenie ruchu)
- **Klasa użytkowa:** 34/43
- **Antyelektrostatyczność:** prądoprzewodząca 5×10⁴ – 1×10⁶ ohm (np. Polyflor)
- **Uwagi:** z wyoblonymi cokołami i narożnikami

### Ściany
- **Materiał:** recyrkulacyjny system ścianek dedykowanych dla pomieszczeń czystych
- **Opcje materiałowe:**
  - Stal nierdzewna z powłoką z jonów srebra, lub
  - Laminat wysokociśnieniowy (HPL), lub
  - PCV z atestem dla sal operacyjnych
- **Wysokość:** do wysokości stropu podwieszonego h=3,00 m
- **Uwagi:** z wyoblonymi narożnikami

### Sufity
- **Materiał:** sufit podwieszony higieniczny, szczelny
- **Standard:** zgodnie z VDI 2167, DIN 1946-4, HTM 03-01, SNIP
- **Typ:** np. Armstrong Parafon Hygien
- **Parametry (z sekcji 4.5.3):**
  - Wskaźnik pochłaniania dźwięku (αw): 0,95
  - Odporność na wilgotność względną powietrza RH: 95%
  - Współczynnik odbicia światła: 84%

### Stolarka
- **Drzwi:** otwierane automatycznie, zawiasowe ze stali kwasoodpornej 304 lub 316L z klamką ze stali KO, ościeżnicą ze stali KO, z przeszkleniami — ze świadectwem dopuszczenia do stosowania dla sal operacyjnych, w kolorze RAL 7013 (sekcja 4.7)

## Warunki środowiskowe

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-01`:

### Temperatura
- **Sale operacyjne:** 20-24°C (regulowana indywidualnie, zgodnie z typem zabiegu)

### Wilgotność
- **Wartość:** 40-60% RH (kontrolowana)

### Wentylacja
- **Nadciśnienie:** +15 Pa względem korytarza
- **Filtracja:** HEPA (H14)
- **Wymiana powietrza:** 20-25 wymian/h
- **Przepływ laminarny (LAF):** klasa ISO 5 nad stołem operacyjnym
- **Powietrze:** 100% świeże (bez recyrkulacji)

### Kaskada ciśnień (blok operacyjny)
- Sala operacyjna: +15 Pa
- Śluza materiałowa / przygotowanie lekarzy: +10 Pa
- Korytarz strefy czystej: +5 Pa
- Klatka schodowa: 0 Pa (referencja)
- Strona brudna bloku: -5 Pa

### Czystość powietrza
- **Strefa operacyjna (LAF):** klasa ISO 5 (wg ISO 14644-1)
- **Strefa ogólna sali:** klasa ISO 7

## Strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Strefa funkcjonalna:** Blok operacyjny - strefa aseptyczna (ultra-czysta)
- **Strefa medyczna (IEC 60364-7-710):** **Grupa 2** (zagrożenie życia, podtrzymanie życia)

## Bezpieczeństwo elektryczne

### Grupa wg IEC 60364-7-710: **Grupa 2**

Pomieszczenia medyczne, w których przewiduje się kontakt części aplikacyjnych aparatów medycznych do zabiegów na sercu lub podtrzymanie życia, gdzie brak ciągłości zasilania może spowodować zagrożenie życia.

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-01` (wymagania Grupy 2):
- System zasilania IT (transformator separacyjny) z monitoringiem izolacji
- Zasilanie awaryjne z agregatu (przełączenie < 0,5s)
- UPS dla aparatury podtrzymującej życie
- Osobne obiegi dla każdej sali
- Wyrównanie potencjałów, szyna EPR

## Dostęp

- **Typ dostępu:** Wyłącznie personel bloku operacyjnego (chirurdzy, anestezjolodzy, pielęgniarki operacyjne)
- **Pacjent:** wprowadzany przez przygotowanie chorego (2.44), wyprowadzany do pokoju wybudzeniowego (2.59)

## Powiązane pomieszczenia

- **Przygotowanie chorego:** 2.44 (13,10 m²)
- **Przygotowanie lekarzy:** 2.45 (7,07 m²)
- **Magazyn sterylny:** 2.47 (8,48 m²)
- **Pokój wybudzeniowy:** 2.59 (35,48 m²)
- **Śluza materiałowa:** 2.36 (13,06 m²)
- **Komunikacja bloku:** 2.37 (137,27 m²)

## Stan cyklu życia

- **Status:** planned (projektowany)

## Proweniencja danych (v0.2.0)

> **Źródło:** PULM-PW-04.05.11 — Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii

| Pole | Pewność | Źródło | Referencja |
|------|---------|--------|------------|
| Powierzchnia (45,85 m2) | `specified` | PULM-PW-04.05.11 | sekcja 4.1.2.3, tabela pomieszczeń I piętro |
| Podłoga (PCV prądoprzewodząca) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń I piętro, poz. 2.46 |
| Ściany (system pomieszczeń czystych) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń I piętro, poz. 2.46 |
| Sufit (Armstrong, αw: 0,95) | `specified` | PULM-PW-04.05.11 | sekcja 4.5.3 |
| Drzwi (stal KO 304/316L) | `specified` | PULM-PW-04.05.11 | sekcja 4.7 |
| Grupa elektryczna (Grupa 2) | `specified` | PULM-PW-04.05.11 | sekcja 4, opis grup elektrycznych |
| Wysokość (3,50 m) | `inherited` | LVL-KPCPULM-D-PIETRO-01 | typicalCeilingHeight (sale operacyjne) |
| Wentylacja (HEPA H14, 20-25 wym/h) | `inherited` | LVL-KPCPULM-D-PIETRO-01 | typicalEnvironmentalConditions |
| Kaskada ciśnień (+15 Pa) | `inherited` | LVL-KPCPULM-D-PIETRO-01 | typicalEnvironmentalConditions |
| Zasilanie IT, UPS, EPR | `inherited` | LVL-KPCPULM-D-PIETRO-01 | typicalElectricalRequirements (Grupa 2) |

## Metadane

- **Dział:** Blok operacyjny
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.2.0
