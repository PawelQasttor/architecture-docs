---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-CORR"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "First Floor Corridor"
spaceType: "corridor"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"

designArea: 8.2
designHeight: 2.70
designVolume: 22.1
unit: "m"

requirements:
  - "REQ-PL-WT-CORRIDOR-WIDTH-001"
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-PL-FIRE-SEPARATION-001"

occupancy:
  maxOccupants: 4
  usagePattern: "circulation"
  hoursPerDay: 2
  daysPerWeek: 7

maintenanceZone: "MZ-RESIDENTIAL-01"
accessRestrictions: "residents"

adjacentSpaces:
  - id: "SP-BLD-01-L01-001"
    relationship: "connects_via_door"
  - id: "SP-BLD-01-L01-002"
    relationship: "connects_via_door"

ifcMapping:
  ifcEntity: "IfcSpace"
  globalId: "2O3fG9$rLBxv3VxEu2LPxS"
  objectType: "Corridor"

version: "1.0.0"
tags:
  - "circulation"
  - "fire-egress"
  - "protected"
---

# Przestrzeń: Korytarz na Pierwszym Piętrze

Chroniona przestrzeń komunikacyjna łącząca sypialnie z klatką schodową.

## Wymiary

- **Powierzchnia podłogi:** 8,2 m²
- **Szerokość w świetle:** ≥ 1,20 m (zgodna z WT 2021 § 69)
- **Wysokość w świetle:** 2,70 m
- **Długość:** Około 6,5 m

## Funkcja

Korytarz wewnętrzny zapewniający dostęp do:
- Sypialni 01 (wschód)
- Sypialni 02 (zachód)
- Klatki schodowej na parter (południe)
- Łazienki (jeszcze nie zamodelowana)

## Rola w Bezpieczeństwie Pożarowym

Ten korytarz jest częścią chronionej drogi ewakuacyjnej z sypialni do klatki schodowej.

### Wymagania Ochrony Przeciwpożarowej

- **Drzwi przeciwpożarowe:** Wszystkie drzwi do sypialni muszą być EI 30 z samozamykaczami
- **Konstrukcja ścian:** Przegrody o odporności ogniowej (REI 60)
- **Detekcja dymu:** Wymagany automatyczny czujnik dymu
- **Oświetlenie awaryjne:** Oprawy LED z baterią o autonomii 90 minut
- **Maksymalna droga ewakuacji:** 40 m do chronionej klatki schodowej (zgodna)

## Podsumowanie Wymagań

| Wymaganie | Wartość docelowa | Metoda weryfikacji |
|-----------|-----------------|-------------------|
| Szerokość korytarza | ≥ 1,20 m | Pomiar (WT 2021 § 69) |
| Klasa drzwi pożarowych | EI 30 | Certyfikacja |
| Oświetlenie awaryjne | Autonomia 90 min | Badanie |
| Detekcja dymu | Automatyczna | Inspekcja |

## Instalacje

- **Detekcja pożaru:** Optyczny czujnik dymu (część SYS-FIRE-ALARM-01)
- **Oświetlenie awaryjne:** Oprawy awaryjne LED z centralną baterią
- **Wentylacja:** Wentylacja naturalna przez otwieralne okno na końcu korytarza
- **Instalacja elektryczna:** Minimalna liczba gniazd (do sprzątania)

## Wykończenia

- **Podłoga:** Płytki ceramiczne (antypoślizgowe, łatwe w czyszczeniu)
- **Ściany:** Malowany tynk gipsowy na konstrukcji o odporności ogniowej
- **Sufit:** Malowany tynk gipsowy
- **Drzwi:** Drzwi drewniane o odporności ogniowej z przeszkleniami

## Dostępność

- **Dostęp bezprogowy:** Brak stopni i progów
- **Szerokość drzwi:** 90 cm w świetle (dostęp dla wózków inwalidzkich)
- **Przestrzeń manewrowa:** Odpowiednia przestrzeń manewrowa przy otwarciu drzwi
