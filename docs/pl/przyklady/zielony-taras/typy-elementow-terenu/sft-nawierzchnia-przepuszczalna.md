---
entityType: site_feature_type
id: SFT-PERMEABLE-PAVING
featureTypeName: "Kostka brukowa przepuszczalna"
featureCategory: hardscape
description: "Przepuszczalna kostka brukowa betonowa do nawierzchni pieszych i lekkich pojazdów. Umożliwia infiltrację wody deszczowej, redukując spływ powierzchniowy."

materials:
  - material: "Kostka brukowa betonowa (80mm)"
    quantity: 1
    unit: "m2"
  - material: "Kruszywo do spoin (żwir 2-5mm)"
    quantity: 0.01
    unit: "m3/m2"
  - material: "Warstwa podsypki (grys 4-6mm)"
    quantity: 0.05
    unit: "m3/m2"
  - material: "Podbudowa (kruszywo łamane)"
    quantity: 0.25
    unit: "m3/m2"

manufacturer: "Semmelrock"
expectedLifeYears: 30

maintenanceRequirements:
  frequency: "annual"
  tasks:
    - "Kontrola osiadania i wypiętrzeń"
    - "Wyrównanie przemieszczonych elementów"
    - "Czyszczenie kruszywa spoinnowego"
    - "Sprawdzenie odpływów"
  seasonalTasks:
    - "Wiosna: usunięcie zimowych zanieczyszczeń, kontrola uszkodzeń mrozowych"
    - "Jesień: usunięcie liści ze spoin"

sustainabilityMetrics:
  permeability: 0.85
  biodiversityValue: "low"
  heatIslandReduction: true

cost:
  totalCost: 65
  currency: "EUR"
  basis: "per_m2_installed"

ifcMapping:
  ifcEntity: IfcCivilElement
  globalId: "4xSFT-PERM-PAVE-001"

version: "1.0.0"
tags:
  - "nawierzchnia"
  - "przepuszczalna"
  - "suds"
  - "utwardzenie"
---

# Typ Elementu Terenu: Kostka Brukowa Przepuszczalna

Kostka brukowa betonowa zaprojektowana do infiltracji wody deszczowej. Stosowana na chodnikach i nawierzchniach dla lekkich pojazdów w projekcie Zielony Taras.

## Kluczowe Parametry

- **Materiał:** Kostka brukowa betonowa 80 mm
- **Przepuszczalność:** 85% infiltracja powierzchniowa
- **Klasa obciążenia:** Piesi + lekkie pojazdy
- **Trwałość:** 30 lat
- **Producent:** Semmelrock

## Zrównoważony Rozwój

- Redukcja spływu powierzchniowego o 85%
- Przyczynia się do redukcji wyspy cieplnej
- Kwalifikuje się jako element SuDS wg WT 2021
