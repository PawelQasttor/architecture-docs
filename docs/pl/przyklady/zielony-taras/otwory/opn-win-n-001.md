---
entityType: opening
id: OPN-WIN-N-001
openingName: "Okno Sypialni Północne 01"
openingCategory: window
envelopeId: "ENV-EW-01"
openingTypeId: "OT-INTERNORM-KF410"
levelId: "LVL-01"
spaceIds:
  - "SP-BLD-01-L01-001"

dimensions:
  width: 1200
  height: 1500
  area: 1.8

sillHeight: 900
orientation: "N"

thermalPerformance:
  uValue: 0.90
  uValueRequired: 0.90
  gValue: 0.50
thermalPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"
  sourceRef: "Internorm KF 410 dane produktowe"

acousticPerformance:
  rw: 35
  rwRequired: 25
acousticPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-08-10"
  installedBy: "Okna Plus Sp. z o.o."
  commissioningDate: "2024-08-12"

warranty:
  warrantyStart: "2024-08-10"
  warrantyEnd: "2034-08-10"
  warrantyProvider: "Internorm"

manufacturer: "Internorm"
productCode: "KF410-TT-1200x1500"

cost:
  totalCost: 950
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcWindow
  globalId: "2xB3YO$rLBxv3VxEu2WIN1"
  objectType: "Window_Internorm_KF410_1200x1500"

version: "1.0.0"
tags:
  - "okno"
  - "elewacja-polnocna"
  - "sypialnia"
  - "poziom-01"
---

# Otwór: Okno Sypialni Północne 01

Okno uchylno-rozwierne z potrójnym oszkleniem na elewacji północnej, obsługujące Sypialnię 01.

## Parametry

- **Typ:** [Internorm KF 410](../typy-otworow/okno-internorm-kf410)
- **Wymiary:** 1200 x 1500 mm (1,8 m2)
- **Wysokość parapetu:** 900 mm
- **Orientacja:** Północ
- **Wartość U:** 0,90 W/(m2K)
- **Wartość g:** 0,50
- **Rw:** 35 dB

## Lokalizacja

- **Przegroda:** [Ściana Zewnętrzna Typ A](../przegroda-sciana-zewnetrzna-typ-a)
- **Kondygnacja:** [Poziom 01](../poziomy/poziom-01)
- **Pomieszczenie:** [Sypialnia 01](../przestrzenie/sypialnia-01)

## Montaż

- **Zamontowano:** 2024-08-10 przez Okna Plus Sp. z o.o.
- **Gwarancja:** 10 lat (Internorm), wygasa 2034-08-10

---

**Status:** Zamontowane
**Ostatnia aktualizacja:** 2026-03-01
