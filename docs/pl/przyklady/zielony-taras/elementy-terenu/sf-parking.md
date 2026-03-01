---
entityType: site_feature
id: SF-PARKING-01
featureName: "Parking Mieszkańców"
featureCategory: parking
siteId: "SITE-GREEN-TERRACE"
siteFeatureTypeId: "SFT-PERMEABLE-PAVING"

location:
  description: "Południowo-zachodni narożnik działki, wjazd z ul. Słonecznej"
  zone: "parking"

dimensions:
  length: 30
  width: 12
  area: 360

materials:
  - material: "Przepuszczalna kostka brukowa (80mm)"
    quantity: 360
    unit: "m2"
    supplier: "Semmelrock"
  - material: "Farba do znakowania (termoplastyczna)"
    quantity: 1
    unit: "komplet"
  - material: "Słupki (stalowe, odblaskowe)"
    quantity: 6
    unit: "szt."

condition: "new"

installationData:
  installationDate: "2024-09-01"
  installedBy: "BudDrog Sp. z o.o."
  supplier: "Semmelrock"

maintenanceSchedule:
  frequency: "quarterly"
  lastMaintenance: "2025-01-10"
  nextMaintenance: "2025-04-10"
  contractor: "BudDrog Sp. z o.o."

sustainabilityMetrics:
  permeability: 0.85
  biodiversityScore: "none"
  rainfallRetention: 25

constructionPackageId: "CP-FINISHES"

cost:
  totalCost: 28000
  currency: "EUR"
  basis: "contractor_quote"
cost_meta:
  confidence: "estimated"
  source: "contractor_quote"

ifcMapping:
  ifcEntity: IfcCivilElement
  globalId: "5xSF-PARKING-SW-001"

version: "1.0.0"
tags:
  - "parking"
  - "nawierzchnia-przepuszczalna"
  - "dostepny"
---

# Element Terenu: Parking Mieszkańców

Parking z przepuszczalną kostką brukową dla 18 mieszkańców plus 2 miejsca dostępne, w południowo-zachodnim narożniku działki.

## Układ

- **Powierzchnia:** 360 m2 (30m x 12m)
- **Miejsca:** 18 standardowych + 2 dostępne (WT 2021 § 55)
- **Nawierzchnia:** [Kostka Brukowa Przepuszczalna](../typy-elementow-terenu/sft-nawierzchnia-przepuszczalna)
- **Wjazd:** z ul. Słonecznej przez obniżony krawężnik

## Dostępność

- 2 miejsca dostępne (3,6m szerokości) najbliżej wejścia
- Zlicowane przejścia krawężnikowe
- Nawierzchnia dotykowa na przejściach pieszych

## Zrównoważony Rozwój

- **Przepuszczalność:** 85% (zgodne z SuDS)
- **Retencja wody deszczowej:** 25 litrów/m2

## Utrzymanie

Przegląd kwartalny i czyszczenie. Coroczne uzupełnianie kruszywa spoinnowego.

---

**Status:** Eksploatacja
**Ostatnia aktualizacja:** 2026-03-01
