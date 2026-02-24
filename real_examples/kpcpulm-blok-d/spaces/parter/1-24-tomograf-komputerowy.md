---
documentType: "space"
entityType: "space"
id: "SPC-KPCPULM-D-1-24"
spaceName: "Pracownia tomografu komputerowego (CT)"
roomNumber: "1.24"
buildingId: "BLD-KPCPULM-BLOK-D"
levelId: "LVL-KPCPULM-D-PARTER"
departmentId: "DEPT-DIAGNOSTYKA-OBRAZOWA"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
lifecycleState: "planned"
electricalSafetyGroup: "group_1"
version: "0.1.0"
---

# Przestrzeń: 1.24 - Pracownia tomografu komputerowego (CT)

## Informacje podstawowe

**Typ encji:** Space
**ID:** `SPC-KPCPULM-D-1-24`
**Numer pomieszczenia:** 1.24
**Nazwa:** Pracownia tomografu komputerowego (CT)
**Poziom:** `LVL-KPCPULM-D-PARTER`
**Budynek:** `BLD-KPCPULM-BLOK-D`
**Dział:** `DEPT-DIAGNOSTYKA-OBRAZOWA`

## Funkcja

**Typ funkcji:** Medyczna - Diagnostyka obrazowa
**Kategoria:** Medical - Diagnostic Imaging (CT)
**Opis:** Pracownia tomografii komputerowej do wykonywania badań obrazowych. Część działu diagnostyki obrazowej o łącznej powierzchni 359,55 m².

## Wymiary

- **Powierzchnia użytkowa:** 30,45 m²

## Wysokość

Dziedziczone z poziomu `LVL-KPCPULM-D-PARTER`:

- **Wysokość pomieszczeń w świetle:** 3,30 m (typowa dla pomieszczeń medycznych)

## Wykończenie

> Dane z tabeli wykończeń (sekcja 4.5 opisu technicznego), pomieszczenia nr 1.24, 1.25, 1.26.

### Podłogi
- **Materiał:** wykładzina rulonowa PCV higieniczna, termozgrzewalna, prądoprzewodząca
- **Antyelektrostatyczność:** 5×10⁴ – 1×10⁶ ohm (np. Polyflor)
- **Uwagi:** z wyoblonymi cokołami i narożnikami

### Ściany
- **Materiał:** płytki ceramiczne ścienne przy umywalce h=160 cm z kołnierzem 50 cm po obu stronach
- **Pozostałe ściany:** malowanie farbą lateksową

### Sufity
- **Wykończenie:** malowanie farbą lateksową

### Stolarka
- **Drzwi:** ze świadectwem dopuszczenia do stosowania dla RTG, otwieralne, jednoskrzydłowe, w kolorze RAL 7013 (sekcja 4.7)
- **Drzwi do kabiny sterowni (1.25):** z osłoną równoważną grubości 0,5 mm Pb (sekcja 4.7)

## Osłony radiologiczne

> Dane z sekcji 4.4.3 opisu technicznego.

- **Ściana między pracownią CT a biurem/pom. kierownika:** osłona o równoważniku grubości ołowiu **0,3 mm Pb** (np. barybeton gr. 3,0 mm, ścianka z płyty GK z rdzeniem Pb gr. 0,3 mm, lub tynk barytowy SURICO)
- **Okno podglądowe do sterowni (1.25):** szkło o odpowiedniku grubości **0,5 mm Pb** (sekcja 4.6)

## Strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Strefa funkcjonalna:** Diagnostyka obrazowa
- **Strefa kontrolowana (radiologiczna):** Tak (promieniowanie jonizujące)

## Bezpieczeństwo elektryczne

- **Grupa wg IEC 60364-7-710:** **Grupa 1** (kontakt z aparaturą medyczną, aplikacja zewnętrzna/wewnętrzna)

Dziedziczone z poziomu `LVL-KPCPULM-D-PARTER` (wymagania Grupy 1):
- Zasilanie awaryjne z agregatu (przełączenie < 15s)
- Wyrównanie potencjałów

## Dostęp

- **Typ dostępu:** Ograniczony (pacjenci z personelem, dostęp przez sterownię 1.25 lub bezpośrednio z korytarza)

## Powiązane pomieszczenia

- **Sterownia:** 1.25 (11,13 m²)
- **Pomieszczenie techniczne:** 1.26 (2,53 m²)
- **Przygotowanie pacjenta:** 1.23 (13,06 m²)
- **WC pacjentów:** 1.27 (3,60 m²)
- **Komunikacja:** 1.4 (65,21 m²)

## Stan cyklu życia

- **Status:** planned (projektowany)

## Proweniencja danych (v0.2.0)

> **Źródło:** PULM-PW-04.05.11 — Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii

| Pole | Pewność | Źródło | Referencja |
|------|---------|--------|------------|
| Powierzchnia (30,45 m2) | `specified` | PULM-PW-04.05.11 | sekcja 4.1.2.2, tabela pomieszczeń parter |
| Podłoga (PCV prądoprzewodząca) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń parter, poz. 1.24 |
| Ściany (płytki + farba lateksowa) | `specified` | PULM-PW-04.05.11 | sekcja 4.5, tabela wykończeń parter, poz. 1.24 |
| Drzwi (z atestem RTG, RAL 7013) | `specified` | PULM-PW-04.05.11 | sekcja 4.7 |
| Osłona ściany (0,3 mm Pb) | `specified` | PULM-PW-04.05.11 | **sekcja 4.4.3** |
| Osłona okna (0,5 mm Pb) | `specified` | PULM-PW-04.05.11 | **sekcja 4.6** |
| Grupa elektryczna (Grupa 1) | `specified` | PULM-PW-04.05.11 | sekcja 4, linia 130 |
| Wysokość (3,30 m) | `inherited` | LVL-KPCPULM-D-PARTER | typicalCeilingHeight |
| Zasilanie awaryjne | `inherited` | LVL-KPCPULM-D-PARTER | typicalElectricalRequirements |

::: warning Pole krytyczne dla bezpieczeństwa
Osłona radiologiczna ściany: **0,3 mm Pb** (sekcja 4.4.3). Wcześniejsza wersja zawierała błędną wartość 2,0 mm Pb (7x zawyżona). Zawsze weryfikuj wartości krytyczne bezpośrednio ze źródła.
:::

## Metadane

- **Dział:** Diagnostyka obrazowa
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.2.0
