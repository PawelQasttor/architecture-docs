---
entityType: opening
id: OPN-WIN-N-002
openingName: "Okno Salonu Północne"
openingCategory: window
envelopeId: "ENV-EW-01"
openingTypeId: "OT-INTERNORM-KF410"
levelId: "LVL-01"
spaceIds:
  - "SP-BLD-01-L01-001"

dimensions:
  width: 1800
  height: 1500
  area: 2.7

sillHeight: 900
orientation: "N"

thermalPerformance:
  uValue: 0.90
  uValueRequired: 0.90
  gValue: 0.50
thermalPerformance_meta:
  confidence: "specified"
  source: "manufacturer_datasheet"

acousticPerformance:
  rw: 35
  rwRequired: 25

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-08-11"
  installedBy: "Okna Plus Sp. z o.o."
  commissioningDate: "2024-08-12"

warranty:
  warrantyStart: "2024-08-11"
  warrantyEnd: "2034-08-11"
  warrantyProvider: "Internorm"

manufacturer: "Internorm"
productCode: "KF410-TT-1800x1500"

cost:
  totalCost: 1350
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcWindow
  globalId: "2xB3YO$rLBxv3VxEu2WIN2"
  objectType: "Window_Internorm_KF410_1800x1500"

version: "1.0.0"
tags:
  - "okno"
  - "elewacja-polnocna"
  - "salon"
  - "poziom-01"
---

# Otwór: Okno Salonu Północne

Duże okno uchylno-rozwierne z potrójnym oszkleniem na elewacji północnej, zapewniające naturalne oświetlenie salonu.

## Parametry

- **Typ:** [Internorm KF 410](../typy-otworow/okno-internorm-kf410)
- **Wymiary:** 1800 x 1500 mm (2,7 m2)
- **Wysokość parapetu:** 900 mm
- **Orientacja:** Północ
- **Wartość U:** 0,90 W/(m2K)
- **Wartość g:** 0,50
- **Rw:** 35 dB

## Lokalizacja

- **Przegroda:** [Ściana Zewnętrzna Typ A](../przegroda-sciana-zewnetrzna-typ-a)
- **Kondygnacja:** [Poziom 01](../poziomy/poziom-01)

## Montaż

- **Zamontowano:** 2024-08-11 przez Okna Plus Sp. z o.o.
- **Gwarancja:** 10 lat (Internorm), wygasa 2034-08-11

---

**Status:** Zamontowane
**Ostatnia aktualizacja:** 2026-03-01
