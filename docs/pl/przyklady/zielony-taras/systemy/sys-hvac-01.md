---
entityType: "system"
id: "SYS-HVAC-01"
projectPhase: "design_development"
bimLOD: "LOD_300"

systemName: "HVAC System Building 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL-MVHR"
systemCategory: "hvac"
buildingId: "BLD-01"

# Served zones
servedZoneIds:
  - "ZONE-HVAC-NORTH"

# Asset instances in this system
assetIds:
  - "AST-MVHR-01"
  - "AST-HP-01"
  - "AST-UFH-MANIFOLD-01"

# Instance-specific performance
performance:
  installedHeatingCapacity: "12 kW"
  actualHeatRecovery: "92%"
  measuredCOP: 4.3
  servedArea: 95.0
  unit: "m2"

version: "1.0.0"
tags:
  - "hvac"
  - "heat-pump"
  - "mvhr"
  - "building-01"
---

# System: System HVAC Budynek 01

**Typ:** [HVAC Mieszkalny - MVHR + Pompa Ciepła](../typy-systemow/hvac-mieszkalny-mvhr.md)

Zintegrowany system HVAC obsługujący mieszkania na pierwszym piętrze Budynku 01, zapewniający ogrzewanie przez pompę ciepła i dystrybucję podłogową oraz ciągłą wentylację mechaniczną z odzyskiem ciepła.

## Przegląd Systemu

- **Budynek:** BLD-01 (Zielony Taras)
- **Obsługiwane Strefy:** ZONE-HVAC-NORTH (skrzydło północne, pierwsze piętro)
- **Obsługiwana Powierzchnia:** 95 m² (2 × sypialnie + korytarz + łazienka + salon)
- **Obłożenie:** Do 4 osób

## Zainstalowane Urządzenia

### Urządzenia Główne

1. **Centrala MVHR** (AST-MVHR-01)
   - Lokalizacja: Przestrzeń sufitowa nad korytarzem
   - Model: Systemair SAVE VTR 300
   - Odzysk ciepła: 92% (zmierzony)

2. **Pompa Ciepła** ([AST-HP-01](../zasoby/ai-hp-01.md))
   - Lokalizacja: Ściana zewnętrzna (strona północna, parter)
   - Model: Bosch Compress 7000i AW 12kW
   - COP: 4.3 (zmierzony przy A7/W35)

3. **Rozdzielacz Ogrzewania Podłogowego** (AST-UFH-MANIFOLD-01)
   - Lokalizacja: Szafka instalacyjna, korytarz pierwszego piętra
   - Strefy: 5 obwodów (sypialnia 01, sypialnia 02, korytarz, łazienka, salon)

## Dane Wydajności

**Ogrzewanie:**
- Zainstalowana moc: 12 kW
- Zmierzony COP: 4.3 w warunkach projektowych
- Temperatura zasilania: 35°C (ogrzewanie podłogowe)
- Projektowe obciążenie cieplne: 4750W (obliczone)

**Wentylacja:**
- Sprawność odzysku ciepła: 92% (zmierzona po instalacji)
- Całkowity przepływ powietrza: 220 m³/h projektowy (0,53 ACH)
- Nawiew: Sypialnie + salon (świeże powietrze)
- Wywiew: Kuchnia + łazienka (zużyte powietrze)

## Obsługiwane Przestrzenie

- SP-BLD-01-L01-001 (Sypialnia 01): 60 m³/h nawiew
- SP-BLD-01-L01-002 (Sypialnia 02): 60 m³/h nawiew
- Kuchnia: 70 m³/h wywiew
- Łazienka: 50 m³/h wywiew

## Wyniki Uruchomienia

- **Data:** 2024-06-20
- **Inżynier uruchomienia:** HVAC Services Ltd.
- **Wyniki:** Wszystkie cele wydajności osiągnięte
  - Przepływ powietrza w zakresie ±8% od projektowego
  - Odzysk ciepła 92% (przekracza cel 90%)
  - Poziom akustyczny ≤24 dB(A) w sypialniach (przekracza cel ≤25 dB(A))
  - COP 4.3 (przekracza cel 4.2)

**Certyfikat:** HVAC-COMM-BLD-01-2024-06-20

## Harmonogram Konserwacji

- **Następny przegląd:** 2025-06-20 (roczny)
- **Wymiana filtrów:** Co 6 miesięcy (styczeń, lipiec)
- **Ostatnia inspekcja:** 2024-12-15 (przegląd okresowy)

## Powiązana Dokumentacja

- **Typ Systemu:** [SYT-HVAC-RESIDENTIAL-MVHR](../typy-systemow/hvac-mieszkalny-mvhr.md)
- **Strefy:** [ZONE-HVAC-NORTH](../strefy/strefa-hvac-polnoc.md)
- **Zasoby:** AST-MVHR-01, [AST-HP-01](../zasoby/ai-hp-01.md), AST-UFH-MANIFOLD-01
- **Budynek:** [BLD-01](../specyfikacja-projektu.md)

---

**Status:** Operacyjny
**Data Instalacji:** 2024-06-15
**Gwarancja Wygasa:** 2029-06-15 (5 lat)
**Ostatnia Aktualizacja:** 2026-02-22
