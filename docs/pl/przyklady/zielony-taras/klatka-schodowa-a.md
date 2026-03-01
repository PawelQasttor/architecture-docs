---
id: "VC-STAIR-A"
entityType: "vertical_circulation"
circulationName: "Staircase A"
circulationType: "staircase"
buildingId: "BLD-01"
connectedLevelIds:
  - "LVL-00"
  - "LVL-01"
  - "LVL-02"
  - "LVL-03"
  - "LVL-04"
  - "LVL-05"
isFireEscape: true
isAccessible: false
isStretcher: false

fireProperties:
  isProtectedStaircase: true
  fireRating: "REI 60"
  pressurization: false
  smokeVentilation: "natural"
  emergencyLighting: true
  maxTravelDistance: 30.0
  vestibuleRequired: false
  fireRating_meta:
    confidence: "specified"
    source: "ARCH-GT-05"
    sourceRef: "section 3.4 Fire Strategy"

dimensions:
  flightWidth: 1200
  flightWidthRequired: 1200
  landingDepth: 1500
  headroom: 2200
  riserHeight: 169
  goingDepth: 290
  totalRise: 2700
  numberOfFlights: 2
  numberOfSteps: 16
  flightWidth_meta:
    confidence: "specified"
    source: "ARCH-GT-03"
    sourceRef: "drawing A-301 Staircase Plan"

accessibility:
  handrails: "both_sides"
  handrailHeight: 900
  tactileWarnings: true
  contrastNosings: true

egressCapacity:
  occupantCapacity: 80
  flowRate: 50
  evacuationTime: 3.2
  requiredCapacity: 60
  evacuationTime_meta:
    confidence: "calculated"
    source: "FIRE-GT-01"
    sourceRef: "Appendix B Egress Calculation"

regulatoryCompliance:
  - regulation: "WT 2021"
    section: "§ 68"
    requirement: "Minimum stair width 1.2m in residential buildings > 3 stories"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 69"
    requirement: "Maximum riser height 175mm, minimum going 250mm"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 242"
    requirement: "Escape route width >= 1.2m for buildings with >50 occupants"
    status: "compliant"
  - regulation: "WT 2021"
    section: "§ 256"
    requirement: "Protected staircase with fire-rated enclosure"
    status: "compliant"

cost:
  estimatedTotal: 42000
  currency: "EUR"
  breakdown:
    structure: 28000
    finishes: 8000
    handrails: 4000
    fire_protection: 2000
  cost_meta:
    confidence: "estimated"
    source: "QS-GT-01"
    sourceRef: "Preliminary Cost Estimate Rev.2"

ifcMapping:
  ifcEntity: "IfcStair"
  objectType: "Staircase_A_Protected"
  globalId: "2xYzPQ$rLBxv5TxEu4MPwR"
  predefinedType: "STRAIGHT_RUN"

sources:
  - id: "ARCH-GT-03"
    title: "Architectural Drawings Package"
    author: "Green Terrace Architects"
    date: "2025-11-15"
    type: "structural_drawing"
  - id: "FIRE-GT-01"
    title: "Fire Safety Strategy Report"
    author: "ABC Fire Consultants"
    date: "2025-10-20"
    type: "other"

version: "1.0.0"
tags: ["fire-escape", "protected", "residential"]
---

# Klatka schodowa A

Główna chroniona klatka schodowa obsługująca wszystkie 6 kondygnacji budynku mieszkalnego Green Terrace. Zlokalizowana centralnie, przylegająca do szybu windowego, zapewniająca zarówno codzienny dostęp, jak i drogę ewakuacyjną.

## Podsumowanie projektu

- **Typ:** Dwubiegowa klatka schodowa z pośrednimi spocznikami
- **Obudowa:** Ściany o odporności ogniowej REI 60 ze wszystkich stron
- **Kontrola dymu:** Wentylacja naturalna przez klapę dymową na dachu (1,0 m² powierzchni czynnej)
- **Oświetlenie awaryjne:** Oprawy LED na każdym spoczynku i biegu
- **Poręcze:** Ze stali nierdzewnej, po obu stronach, ciągłe od parteru do ostatniego piętra
- **Wykończenia:** Antypoślizgowe płytki ceramiczne na stopniach, tynk malowany na ścianach
- **Geometria stopni:** 169 mm podstopnica x 290 mm stopnica (2R + G = 628 mm, w zakresie komfortu 600-640 mm)

## Obliczenia ewakuacyjne

| Parametr | Wartość | Wymaganie | Status |
|----------|---------|-----------|--------|
| Szerokość biegu | 1 200 mm | >= 1 200 mm (WT §68) | Zgodny |
| Wysokość podstopnicy | 169 mm | <= 175 mm (WT §69) | Zgodny |
| Głębokość stopnicy | 290 mm | >= 250 mm (WT §69) | Zgodny |
| Wysokość w świetle | 2 200 mm | >= 2 000 mm (WT §68) | Zgodny |
| Maks. długość dojścia | 30,0 m | <= 60 m (WT §256, strefa pożarowa ZL-IV) | Zgodny |
| Czas ewakuacji | 3,2 min | < 5 min (cel) | Zgodny |
