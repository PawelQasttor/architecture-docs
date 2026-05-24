---
entityType: "building"
id: "BLD-01"
name: "Budynek mieszkalny Zielony Taras (w eksploatacji)"
version: "2.1.0"
projectPhase: "operation"
bimLOD: "LOD_500"

siteId: "SITE-GREEN-TERRACE"
usage: "residential"
buildingType: "residential_multifamily"

grossFloorArea: 1800
netFloorArea: 1620
footprintArea: 320

numberOfStoreys:
  aboveGround: 6
  belowGround: 0
  total: 6
buildingHeight: 18.0
eaveHeight: 16.0
unit: "m"

occupancyClassification: "ZL_IV"
constructionClass: "C"
accessibilityCompliance: "standard"

operationalStatus:
  handoverDate: "2026-03-15"
  occupiedSince: "2026-04-01"
  monthsInOperation: 22
  occupancyRate: 1.0
  notes: "Pełne wynajęcie od 2 miesiąca; jedna krótka rotacja najemcy w mieszkaniu 3.04 (miesiąc 11→12)."

cost:
  totalCost: 1745800
  currency: "EUR"
  basis: "as_built"
  _meta:
    confidence: "measured"
    source: "final_cost_account_2026-04"

tags:
  - "operation-phase-example"
  - "flagship-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zrzut z fazy eksploatacji BLD-01 — ten sam budynek co w przykładzie projektowym, 22 miesiące po przekazaniu"
---

# Zielony Taras BLD-01 — faza eksploatacji (styczeń 2028)

Ten sam sześciokondygnacyjny budynek mieszkalny z 18 lokalami z
[przykładu projektowego](/pl/przyklady/zielony-taras/budynek), teraz
22 miesiące zasiedlonej eksploatacji. Końcowy koszt powykonawczy €1 745 800
(prognoza €1 750 000; budżet €1 800 000 — wylądował 3,0 % poniżej budżetu).

| Właściwość | Wartość |
|---|---|
| Status eksploatacji | Zasiedlony od 2026-04-01 (22 miesiące) |
| Współczynnik zasiedlenia | 100 % (18 / 18 mieszkań wynajętych) |
| Koszt powykonawczy | €1 745 800 (poniżej budżetu o €54 200) |
| LOD BIM | 500 (model powykonawczy) |
| Wszystkie inne właściwości | Dziedziczone z [modelu projektowego](/pl/przyklady/zielony-taras/budynek) |

## Co się zmieniło względem encji projektowej

Tylko dwie grupy pól różnią się od encji budynku w fazie projektowej:

1. **`projectPhase: operation`** (było `design_development` / `construction_documents`)
2. **Nowy blok `operationalStatus`** — data przekazania, współczynnik zasiedlenia, miesiące eksploatacji
3. **`cost.basis: as_built`** z `confidence: measured` (było `project_budget` / `estimated`)
4. **`bimLOD: LOD_500`** — Powykonawczy model rejestrowy (było LOD 400)

Wszystko inne — powierzchnie, kondygnacje, klasyfikacja użytkowania,
klasa konstrukcyjna — pozostaje niezmienione względem modelu projektowego.
To właśnie jest sedno: *tożsamość* budynku nie zmienia się przy przekazaniu,
zmienia się tylko jego *kontekst fazy* i dane, które niesie.
