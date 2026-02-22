---
documentType: "zone"
entityType: "zone"
id: "ZONE-ACOUSTIC-NIGHT"
projectPhase: "design_development"
bimLOD: "LOD_300"

zoneName: "Acoustic Zone - Night"
zoneType: "acoustic"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"

properties:
  acousticClass: "B"
  usageType: "sleeping_spaces"
  soundInsulationRequirement: 52
  impactSoundRequirement: 53
  unit: "dB"

requirements:
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-ACOUSTIC-PARTITION-001"

ifcMapping:
  ifcEntity: "IfcZone"
  globalId: "3P4gH0$sLByv4WyFv3MQyT"

version: "1.0.0"
tags:
  - "acoustic"
  - "sleeping"
  - "class-b"
---

# Strefa Akustyczna: Noc (Przestrzenie do Spania)

Strefa akustyczna grupująca sypialnie wymagające wzmocnionej izolacji dźwiękowej.

## Klasyfikacja Akustyczna

- **Klasa:** B (Podwyższony komfort akustyczny wg PN-B-02151-3)
- **Typ użytkowania:** Przestrzenie do spania (sypialnie)
- **Poziom ochrony:** Wysoki (użytkowanie nocne)

## Wymagania Izolacji Dźwiękowej

### Izolacyjność od Dźwięków Powietrznych (R'w)
- **Między mieszkaniami:** ≥ 52 dB
- **Od hałasu zewnętrznego:** ≥ 30 dB (Rw elewacji)
- **Od źródeł wewnętrznych (korytarze, klatki schodowe):** ≥ 47 dB

### Izolacyjność od Dźwięków Uderzeniowych (L'n,w)
- **Z przestrzeni powyżej:** ≤ 53 dB
- **Konstrukcja podłogi:** Podłoga pływająca z warstwą elastyczną

## Wymagania Konstrukcyjne

### Ściany Działowe
- Masa: ≥ 220 kg/m² (mur dwuwarstwowy lub równoważny)
- Brak sztywnych połączeń między warstwami ściany
- Uszczelnienie akustyczne przy wszystkich przejściach

### Drzwi
- Drzwi akustyczne z uszczelkami (Rw ≥ 32 dB)
- Brak podcięć

### Okna
- Minimum podwójne szklenie: 6 mm + 16 mm powietrze + 6 mm
- Szkło laminowane dla elewacji zewnętrznych

## Zgodność z Przepisami

- **PN-B-02151-3:2015:** Ochrona akustyczna w budynkach - Wymagania dla przestrzeni mieszkalnych
- **WT 2021 § 323:** Wymagania izolacji akustycznej
- **Wytyczne WHO dotyczące hałasu nocnego:** Hałas tła ≤ 30 dB(A)
