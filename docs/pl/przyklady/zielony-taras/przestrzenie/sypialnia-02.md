---
entityType: "space"
id: "SP-BLD-01-L01-002"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 02"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
  - "ZONE-ACOUSTIC-NIGHT"

designArea: 12.8
designHeight: 2.70
designVolume: 34.6
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"
  - "REQ-THERMAL-COMFORT-001"

occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"
  hoursPerDay: 8
  daysPerWeek: 7

maintenanceZone: "MZ-RESIDENTIAL-01"
accessRestrictions: "private"

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "shares_wall"
  - id: "SP-BLD-01-L01-CORR"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxR"
  objectType: "Bedroom"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
  - "north-facing"
---

# Przestrzeń: Sypialnia 02

Druga sypialnia na pierwszym piętrze, od strony północnej z naturalnym oświetleniem dziennym.

## Wymiary

- **Powierzchnia podłogi:** 12,8 m²
- **Wysokość w świetle:** 2,70 m
- **Kubatura:** 34,6 m³

## Funkcja

Standardowa sypialnia odpowiednia dla 1-2 osób. Część mieszkania na pierwszym piętrze.

## Podsumowanie Wymagań

| Wymaganie | Wartość docelowa | Metoda weryfikacji |
|-----------|-----------------|-------------------|
| Wysokość pomieszczenia | ≥ 2,50 m | Pomiar (WT 2021 § 132) |
| Współczynnik oświetlenia dziennego | ≥ 2% | Symulacja |
| Izolacja akustyczna | Klasa B (R'w ≥ 52 dB) | Badanie |
| Komfort cieplny | 20-26°C | Monitoring |

## Sąsiedztwo

- **Wschód:** Wspólna ściana z Sypialnią 01 (wymagana przegroda akustyczna)
- **Zachód:** Korytarz (wymagane drzwi akustyczne)
- **Powyżej:** Nieużytkowane poddasze
- **Poniżej:** Salon na parterze

## Instalacje

- **Ogrzewanie:** Ogrzewanie podłogowe (część SYS-HVAC-UFH-01)
- **Wentylacja:** Mechaniczna nawiewno-wywiewna (część SYS-HVAC-VENT-01)
- **Oświetlenie:** Naturalne (okno od północy) + sztuczne LED
- **Instalacja elektryczna:** Standardowe gniazda mieszkalne

## Wykończenia

- **Podłoga:** Deska inżynierska dębowa na podkładzie akustycznym
- **Ściany:** Malowany tynk gipsowy
- **Sufit:** Malowany tynk gipsowy
- **Okno:** Podwójne szklenie w ramie PVC
