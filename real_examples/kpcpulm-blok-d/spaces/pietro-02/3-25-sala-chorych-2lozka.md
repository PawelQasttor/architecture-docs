---
documentType: "space"
entityType: "space"
id: "SPC-KPCPULM-D-3-25"
spaceName: "Sala chorych"
roomNumber: "3.25"
buildingId: "BLD-KPCPULM-BLOK-D"
levelId: "LVL-KPCPULM-D-PIETRO-02"
departmentId: "DEPT-ODDZIAL-LOZKOWY-1"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
lifecycleState: "planned"
electricalSafetyGroup: "group_0"
version: "0.1.0"
---

# Przestrzeń: 3.25 - Sala chorych

## Informacje podstawowe

**Typ encji:** Space
**ID:** `SPC-KPCPULM-D-3-25`
**Numer pomieszczenia:** 3.25
**Nazwa:** Sala chorych
**Poziom:** `LVL-KPCPULM-D-PIETRO-02`
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Dział:** `DEPT-ODDZIAL-LOZKOWY-1`

## Funkcja

**Typ funkcji:** Medyczna - Hospitalizacja
**Kategoria:** Medical - Patient Room (Inpatient)
**Opis:** Sala chorych na oddziale łóżkowym 1 (30 łóżek, 803,91 m²). Oddział pulmonologiczny. Jedna z 12 sal chorych na oddziale (pomieszczenia: 3.22, 3.25, 3.27, 3.29, 3.31, 3.33, 3.35, 3.37, 3.39, 3.41, 3.43, 3.45).

## Wymiary

- **Powierzchnia użytkowa:** 22,77 m²

## Wysokość

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-02`:

- **Wysokość pomieszczeń w świetle:** 3,00 m (typowa dla sal chorych)

## Wykończenie

> Dane z tabeli wykończeń (sekcja 4.5 opisu technicznego, II Piętro), pomieszczenia sal chorych.

### Podłogi
- **Materiał:** wykładzina rulonowa PCV higieniczna, termozgrzewalna, homogeniczna
- **Klasa ścieralności:** P lub M
- **Klasa użytkowa:** 34/43, z atestem dla obiektów służby zdrowia
- **Uwagi:** z wyoblonymi cokołami i narożnikami

### Ściany
- **Wykończenie:** malowanie farbą lateksową
- **Odbojnice:** h=70 do 90 cm

### Sufity
- **Wykończenie:** malowanie farbą lateksową

### Stolarka
- **Drzwi:** pełne, wzmocnione konstrukcyjnie, o izolacyjności akustycznej 32 dB, z płyty wiórowej laminowanej w kolorze RAL 7013 z atestem dla obiektów służby zdrowia, ościeżnice stalowe (sekcja 4.7)

## Warunki środowiskowe

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-02`:

### Temperatura
- **Wartość:** 22-24°C (regulowana dla komfortu pacjentów)

### Wilgotność
- **Wartość:** 40-60% RH

### Wentylacja
- **Typ:** nawiewno-wywiewna
- **Wymiana powietrza:** 6-8 wymian/h
- **Uwagi:** możliwość otwierania okien (wentylacja naturalna wspomagająca)

### Czystość powietrza
- **Filtracja:** F7 (bez wymagań szczególnych — sala standardowa, nie izolatka)

## Strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Strefa funkcjonalna:** Oddział łóżkowy - strefa hospitalizacji

## Bezpieczeństwo elektryczne

- **Grupa wg IEC 60364-7-710:** **Grupa 0** (brak zabiegów inwazyjnych, brak aparatury z częściami aplikacyjnymi)

Dziedziczone z poziomu `LVL-KPCPULM-D-PIETRO-02`:
- Instalacje gazów medycznych (tlen, ssanie) w każdej sali chorego
- Zasilanie awaryjne dla oświetlenia korytarzy

## Dostęp

- **Typ dostępu:** Pacjenci + odwiedzający (w godzinach odwiedzin) + personel medyczny (24/7)

## Powiązane pomieszczenia

- **Łazienka pacjentów:** 3.26 (3,29 m²)
- **Komunikacja:** 3.20 (147,52 m²)
- **Gabinet diagnostyczno-zabiegowy:** 3.24 (19,31 m²)
- **Brudownik:** 3.50 (5,93 m²)
- **Magazyn czysty:** 3.52 (5,75 m²)

## Stan cyklu życia

- **Status:** planned (projektowany)

## Proweniencja danych (v0.2.0)

> **Źródło:** PULM-PW-04.05.11 — Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii

| Pole | Pewność | Źródło | Referencja |
|------|---------|--------|------------|
| Powierzchnia (22,77 m2) | `specified` | PULM-PW-04.05.11 | sekcja 4.1.2.4, tabela pomieszczeń II piętro |
| Podłoga (PCV P/M, kl. 34/43) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń II piętro |
| Ściany (farba lateksowa + odbojnice) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń II piętro |
| Drzwi (32 dB, RAL 7013) | `specified` | PULM-PW-04.05.11 | sekcja 4.7 |
| Grupa elektryczna (Grupa 0) | `specified` | PULM-PW-04.05.11 | sekcja 4, opis grup elektrycznych |
| Wysokość (3,00 m) | `inherited` | LVL-KPCPULM-D-PIETRO-02 | typicalCeilingHeight |
| Temperatura (22-24°C) | `inherited` | LVL-KPCPULM-D-PIETRO-02 | typicalEnvironmentalConditions |
| Wentylacja (6-8 wym/h) | `inherited` | LVL-KPCPULM-D-PIETRO-02 | typicalEnvironmentalConditions |
| Gazy medyczne | `inherited` | LVL-KPCPULM-D-PIETRO-02 | typicalMedicalInstallations |
| Liczba łóżek | `unknown` | — | Nie określono w źródle per-sala |

## Metadane

- **Dział:** Oddział łóżkowy 1
- **Profil medyczny:** Pulmonologia
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.2.0
