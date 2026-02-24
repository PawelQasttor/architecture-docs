---
documentType: "space"
entityType: "space"
id: "SPC-KPCPULM-D-0-01"
spaceName: "Klatka schodowa"
roomNumber: "0.1"
buildingId: "BLD-KPCPULM-BLOK-D"
levelId: "LVL-KPCPULM-D-PIWNICA"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
lifecycleState: "planned"
version: "0.1.0"
---

# Przestrzeń: 0.1 - Klatka schodowa

## Informacje podstawowe

**Typ encji:** Space
**ID:** `SPC-KPCPULM-D-0-01`
**Numer pomieszczenia:** 0.1
**Nazwa:** Klatka schodowa
**Poziom:** `LVL-KPCPULM-D-PIWNICA`
**Budynek:** `BLD-KPCPULM-BLOK-D`

## Funkcja

**Typ funkcji:** Komunikacja pionowa
**Kategoria:** Circulation - Vertical
**Opis:** Główna klatka schodowa łącząca wszystkie kondygnacje budynku od piwnic do III piętra.

## Wymiary

- **Powierzchnia użytkowa:** 22,91 m²

## Wykończenie

> Dane z tabeli wykończeń (sekcja 4.5 opisu technicznego).

### Podłogi
- **Materiał:** gres V klasa ścieralności
- **Izolacja:** przeciwwilgociowa

### Ściany
- **Wykończenie:** malowanie farbą lateksową

### Sufity
- **Wykończenie:** malowany farbą lateksową

### Stolarka
- **Balustrady:** obustronne balustrady stalowo-szklane, wysokość 110 cm, słupki i elementy mocujące ze stali kwasoodpornej lub chromowanej z wypełnieniem ze szkła hartowanego (sekcja 4.8)

## Konstrukcja

- **Schody i spoczniki:** żelbetowe, wylewane na mokro z betonu B25, stali AIIIN (sekcja 4.2)

## Strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Funkcja ewakuacyjna:** Droga ewakuacyjna

## Bezpieczeństwo elektryczne

- **Grupa wg IEC 60364-7-710:** Grupa 0

## Dostępność

- **Typ dostępu:** Publiczny (personel + pacjenci + goście)
- **Dostępność dla niepełnosprawnych:** Alternatywa: dźwigi szpitalne

## Stan cyklu życia

- **Status:** planned (projektowany)

## Proweniencja danych (v0.2.0)

> **Źródło:** PULM-PW-04.05.11 — Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii

| Pole | Pewność | Źródło | Referencja |
|------|---------|--------|------------|
| Powierzchnia (22,91 m2) | `specified` | PULM-PW-04.05.11 | sekcja 4.1.2.1, tabela pomieszczeń piwnica |
| Podłoga (gres V klasa) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń piwnica |
| Ściany (farba lateksowa) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń piwnica |
| Balustrady (stalowo-szklane) | `specified` | PULM-PW-04.05.11 | sekcja 4.8 |
| Konstrukcja (B25, AIIIN) | `specified` | PULM-PW-04.05.11 | sekcja 4.2 |
| Wysokość pomieszczenia | `unknown` | — | Nie określono per-pomieszczenie; brak typicalCeilingHeight na poziomie piwnic |

## Metadane

- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.2.0
