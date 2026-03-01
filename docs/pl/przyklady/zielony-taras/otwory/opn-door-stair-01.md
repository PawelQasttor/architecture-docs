---
entityType: opening
id: OPN-DOOR-STAIR-01
openingName: "Drzwi Pożarowe Klatki Schodowej - Poziom 01"
openingCategory: door
envelopeId: "ENV-EW-01"
openingTypeId: "OT-FIRE-DOOR-EI30"
levelId: "LVL-01"
spaceIds:
  - "SP-STAIRWELL-VOID"
  - "SP-BLD-01-L01-CORR"

dimensions:
  width: 1000
  height: 2100
  area: 2.1

orientation: "not_applicable"
frameMaterial: steel
glazingType: none
operability: hinged

firePerformance:
  fireRating: "EI 30"
  fireRatingRequired: "EI 30"
  smokeControl: true
  selfClosing: true
  testCertificate: "FR2024-5678"
firePerformance_meta:
  confidence: "measured"
  source: "FR2024-5678"
  sourceRef: "Badanie ogniowe wg PN-EN 1634-1"

acousticPerformance:
  rw: 37
  rwRequired: 30
  testCertificate: "AC2024-9012"

hardware:
  hingeType: "concealed_3d_adjustable"
  lockType: "panic_bar_EN1125"
  handleType: "lever_handle_stainless"
  closerType: "concealed_overhead_EN1154"
  threshold: "flush_intumescent"
  holdOpen: false
  intumescentStrip: true

accessibilityData:
  clearWidth: 900
  thresholdHeight: 0
  closingForce: 22
  visionPanelHeight: 800
  automatedOpener: false

constructionPackageId: "CP-ENVELOPE"

installationData:
  installationDate: "2024-07-20"
  installedBy: "Doors & More Sp. z o.o."
  commissioningDate: "2024-07-22"

warranty:
  warrantyStart: "2024-07-20"
  warrantyEnd: "2029-07-20"
  warrantyProvider: "Hormann"

maintenance:
  lastServiceDate: "2024-12-20"
  nextServiceDue: "2025-06-20"
  maintenanceContractor: "Doors & More Sp. z o.o."

manufacturer: "Hormann"
productCode: "HOR-T30-1-1000"

cost:
  totalCost: 1450
  currency: "EUR"
  basis: "installed_cost"

ifcMapping:
  ifcEntity: IfcDoor
  globalId: "2xB3YO$rLBxv3VxEu2DR01"
  objectType: "FireDoor_EI30_Stairwell_L01"

version: "1.0.0"
tags:
  - "drzwi-pozarowe"
  - "klatka-schodowa"
  - "ei30"
  - "poziom-01"
  - "bezpieczenstwo"
---

# Otwór: Drzwi Pożarowe Klatki Schodowej - Poziom 01

Drzwi przeciwpożarowe oddzielające korytarz Poziomu 01 od chronionej klatki schodowej. Zapewniają 30-minutową odporność ogniową z kontrolą dymu i samozamykaczem.

## Parametry

- **Typ:** [Drzwi Przeciwpożarowe EI 30](../typy-otworow/drzwi-pozarowe-ei30)
- **Wymiary:** 1000 x 2100 mm
- **Odporność ogniowa:** EI 30 (badanie wg PN-EN 1634-1)
- **Kontrola dymu:** Uszczelki pęczniejące + uszczelki dymoszczelne
- **Samozamykacz:** Zamknięty samozamykacz sufitowy (EN 1154)
- **Izolacyjność akustyczna:** Rw 37 dB
- **Bezpieczeństwo:** RC3

## Dostępność

- **Szerokość przejścia:** 900 mm (zgodne z WT 2021 § 55)
- **Próg:** Zlicowany z uszczelką pęczniejącą
- **Siła zamykania:** 22 N (poniżej max. 30 N)
- **Panel wizyjny:** 800 mm

## Lokalizacja

- **Przegroda:** [Ściana Zewnętrzna Typ A](../przegroda-sciana-zewnetrzna-typ-a)
- **Kondygnacja:** [Poziom 01](../poziomy/poziom-01)
- **Łączy:** [Klatkę schodową](../przestrzenie/pustka-klatki-schodowej) z [Korytarzem](../przestrzenie/korytarz)

## Historia Serwisowa

| Data | Typ | Wykonawca | Uwagi |
|------|-----|-----------|-------|
| 2024-07-22 | Odbiór | Doors & More | Wszystkie testy zdane |
| 2024-12-20 | Przegląd 6-mies. | Doors & More | Regulacja samozamykacza, uszczelki OK |
| 2025-06-20 | Przegląd roczny (planowany) | - | Pełna kontrola osprzętu |

---

**Status:** Eksploatacja
**Ostatnia aktualizacja:** 2026-03-01
