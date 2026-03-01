---
entityType: opening_type
id: OT-INTERNORM-KF410
openingTypeName: "Okno Internorm KF 410 potrójne szyby"
category: window
description: "Wysokowydajny system okienny PVC z potrójnym oszkleniem i funkcją uchylno-rozwieralną. Odpowiedni do budynków pasywnych, Uw 0,90 W/(m2K)."

frameMaterial: pvc
glazingType: triple
operability: tilt_turn

thermalPerformance:
  uValue: 0.90
  gValue: 0.50
  psiInstallation: 0.04

acousticPerformance:
  rw: 35

securityRating: "RC2"

accessibilityCompliance:
  clearWidth: 900
  threshold: flush
  closingForce: 30

manufacturer: "Internorm"
modelNumber: "KF 410"
productCode: "KF410-TT-1200x1500"
expectedLifeYears: 40

cost:
  totalCost: 850
  currency: "EUR"
  basis: "manufacturer_list_price"

ifcMapping:
  ifcEntity: IfcWindowType
  objectType: "Internorm_KF410_Triple"

version: "1.0.0"
tags:
  - "okno"
  - "potrojne-szyby"
  - "dom-pasywny"
  - "pvc"
---

# Typ Otworu: Okno Internorm KF 410

Wysokowydajny system okienny PVC z potrójnym oszkleniem, stosowany w całym budynku Zielony Taras. Funkcja uchylno-rozwierna, odpowiedni do budynków pasywnych.

## Kluczowe Parametry

- **Rama:** PVC, profil 6-komorowy
- **Oszklenie:** Potrójne (4/16Ar/4/16Ar/4)
- **Wartość U:** 0,90 W/(m2K) (wymagana: 0,90)
- **Wartość g:** 0,50
- **Izolacyjność akustyczna:** Rw 35 dB
- **Bezpieczeństwo:** klasa RC2
- **Trwałość:** 40 lat

## Zastosowanie

Wszystkie standardowe otwory okienne w projekcie Zielony Taras odwołują się do tego typu. Poszczególne instancje mogą nadpisać wymiary i orientację.

Zobacz: [Dokumentacja encji](/pl/dokumentacja/encje/)
