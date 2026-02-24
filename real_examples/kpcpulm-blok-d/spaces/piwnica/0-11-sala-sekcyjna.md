---
documentType: "space"
entityType: "space"
id: "SPC-KPCPULM-D-0-11"
spaceName: "Sala sekcyjna"
roomNumber: "0.11"
buildingId: "BLD-KPCPULM-BLOK-D"
levelId: "LVL-KPCPULM-D-PIWNICA"
departmentId: "DEPT-PROSEKTORIUM"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
lifecycleState: "planned"
version: "0.1.0"
---

# Przestrzeń: 0.11 - Sala sekcyjna (Prosektorium)

## Informacje podstawowe

**Typ encji:** Space
**ID:** `SPC-KPCPULM-D-0-11`
**Numer pomieszczenia:** 0.11
**Nazwa:** Sala sekcyjna
**Poziom:** `LVL-KPCPULM-D-PIWNICA`
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Dział:** `DEPT-PROSEKTORIUM`

## Funkcja

**Typ funkcji:** Medyczna - Prosektorium
**Kategoria:** Medical - Autopsy
**Opis:** Sala sekcyjna do przeprowadzania sekcji zwłok (autopsji). Część zespołu pomieszczeń prosektorium o łącznej powierzchni 143,49 m².

## Wymiary

- **Powierzchnia użytkowa:** 20,07 m²

## Wykończenie

> Dane z tabeli wykończeń (sekcja 4.5 opisu technicznego), pomieszczenie nr 0.11.

### Podłogi
- **Materiał:** płytki ceramiczne podłogowe V klasa ścieralności
- **Izolacja:** przeciwwilgociowa
- **Uwagi:** z wyoblonymi cokołami i narożnikami

### Ściany
- **Materiał:** okładzina PCV termozgrzewalna z atestem do sal operacyjnych (np. Polyflor, Gamrat, Tarkett)
- **Wykonanie:** bezspoinowe do wysokości 3,00 m
- **Uwagi:** z wyoblonymi narożnikami

### Sufity
- **Materiał:** sufit podwieszony higieniczny, szczelny
- **Standard:** zgodnie z VDI 2167, DIN 1946-4, HTM 03-01, SNIP
- **Typ:** np. Armstrong Parafon Hygien

### Stolarka
- **Drzwi:** otwierane automatycznie, zawiasowe ze stali kwasoodpornej 304 lub 316L z klamką ze stali KO, ościeżnicą ze stali KO, z przeszkleniami — ze świadectwem dopuszczenia do stosowania dla sal operacyjnych (sekcja 4.7)

## Warunki środowiskowe

Dziedziczone z poziomu `LVL-KPCPULM-D-PIWNICA`:

### Temperatura
- **Wartość:** 16-18°C (prosektorium — wg poziomu piwnic)

## Strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Strefa funkcjonalna:** Prosektorium (dostęp kontrolowany)

## Bezpieczeństwo elektryczne

- **Grupa wg IEC 60364-7-710:** Grupa 0 (brak aparatury z częściami aplikacyjnymi na żywych pacjentach)

## Dostęp

- **Typ dostępu:** Ograniczony (tylko personel uprawniony)

## Powiązane pomieszczenia

- **Chłodnia:** Chłodnia zwłok (0.12) — 13,06 m²
- **Przygotowanie:** Przygotowanie i wydawanie zwłok (0.14) — 13,48 m²
- **Kancelaria:** Kancelaria Prosektorium (0.6) — 10,69 m²
- **Śluzy:** 0.8 (2,58 m²), 0.10 (2,64 m²)
- **Poczekalnia:** 0.5 — 12,79 m²
- **Zaplecze:** 0.16 — 6,44 m²

## Stan cyklu życia

- **Status:** planned (projektowany)

## Proweniencja danych (v0.2.0)

> **Źródło:** PULM-PW-04.05.11 — Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii

| Pole | Pewność | Źródło | Referencja |
|------|---------|--------|------------|
| Powierzchnia (20,07 m2) | `specified` | PULM-PW-04.05.11 | sekcja 4.1.2.1, tabela pomieszczeń piwnica |
| Podłoga (płytki V klasa) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń piwnica, poz. 0.11 |
| Ściany (PCV termozgrzewalna) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń piwnica, poz. 0.11 |
| Sufit (Armstrong Parafon Hygien) | `specified` | PULM-PW-04.05.11 | sekcja 4.5.3 |
| Drzwi (stal kwasoodporna 304/316L) | `specified` | PULM-PW-04.05.11 | sekcja 4.7 |
| Temperatura (16-18°C) | `inherited` | LVL-KPCPULM-D-PIWNICA | typicalEnvironmentalConditions |
| Wysokość pomieszczenia | `unknown` | — | Nie określono per-pomieszczenie |

## Metadane

- **Dział:** Prosektorium
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.2.0
