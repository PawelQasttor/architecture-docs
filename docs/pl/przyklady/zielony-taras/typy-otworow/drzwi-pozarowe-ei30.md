---
entityType: opening_type
id: OT-FIRE-DOOR-EI30
openingTypeName: "Drzwi Przeciwpożarowe EI 30 - Rama Stalowa"
category: door
description: "Drzwi przeciwpożarowe w ramie stalowej z uszczelkami pęczniejącymi, samozamykaczem i kontrolą dymu. Stosowane do drzwi wejściowych mieszkań i dostępu do klatki schodowej."

frameMaterial: steel
glazingType: none
operability: hinged

firePerformance:
  fireRating: "EI 30"
  smokeControl: true
  selfClosing: true

acousticPerformance:
  rw: 37

securityRating: "RC3"

accessibilityCompliance:
  clearWidth: 900
  threshold: flush
  closingForce: 22
  visionPanel: true

manufacturer: "Hormann"
modelNumber: "T30-1 H8-5"
productCode: "HOR-T30-1-900"
expectedLifeYears: 30

cost:
  totalCost: 1200
  currency: "EUR"
  basis: "manufacturer_list_price"

ifcMapping:
  ifcEntity: IfcDoorType
  objectType: "FireDoor_EI30_Steel"

version: "1.0.0"
tags:
  - "drzwi-pozarowe"
  - "ei30"
  - "stal"
  - "samozamykacz"
---

# Typ Otworu: Drzwi Przeciwpożarowe EI 30

Drzwi przeciwpożarowe w ramie stalowej, stosowane do wejść mieszkaniowych i punktów dostępu do klatki schodowej. Zapewniają 30-minutową odporność ogniową z kontrolą dymu.

## Kluczowe Parametry

- **Rama:** Stalowa
- **Odporność ogniowa:** EI 30
- **Kontrola dymu:** Tak (uszczelki pęczniejące + uszczelki dymoszczelne)
- **Samozamykacz:** Tak (zamknięty samozamykacz sufitowy, EN 1154)
- **Izolacyjność akustyczna:** Rw 37 dB
- **Bezpieczeństwo:** klasa RC3
- **Szerokość przejścia:** 900 mm (dostępne)
- **Trwałość:** 30 lat

## Zgodność

- WT 2021 § 232: Odporność ogniowa drzwi mieszkaniowych
- WT 2021 § 256: Separacja ogniowa klatki schodowej
- PN-EN 1634-1: Badanie odporności ogniowej

Zobacz: [Dokumentacja encji](/pl/dokumentacja/encje/)
