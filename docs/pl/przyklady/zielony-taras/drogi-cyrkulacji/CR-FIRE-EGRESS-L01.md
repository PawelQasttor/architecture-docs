---
entityType: "circulation_route"
id: "CR-FIRE-EGRESS-L01"
version: "2.1.0"
projectPhase: "construction_documents"

routeName: "Główna droga ewakuacji pożarowej — Poziom 01"
routeType: "primary_egress"
buildingId: "BLD-01"
levelIds:
  - "LVL-01"

waypoints:
  - sequence: 1
    entityId: "SP-BLD-01-L01-001"
    entityType: "space"
    isDecisionPoint: false
  - sequence: 2
    entityId: "OPN-DOOR-CORR-001"
    entityType: "opening"
    isDecisionPoint: false
  - sequence: 3
    entityId: "SP-BLD-01-L01-CORR"
    entityType: "space"
    isDecisionPoint: true
  - sequence: 4
    entityId: "OPN-DOOR-STAIR-01"
    entityType: "opening"
    isDecisionPoint: false
  - sequence: 5
    entityId: "VC-STAIR-A"
    entityType: "vertical_circulation"
    isDecisionPoint: false

totalTravelDistance: 38.5
maxTravelDistance: 40.0
minimumWidth: 1400
requiredWidth: 1400
isAccessible: true
isFireEscape: true
occupantCapacity: 54
estimatedEvacuationTime: 2.1

requirementIds:
  - "REQ-FIRE-EGRESS-TIME-001"
  - "REQ-PL-WT-256-001"
  - "REQ-PL-WT-CORRIDOR-WIDTH-001"

verification:
  method: "simulation"
  tool: "Pathfinder 2024"
  standard: "PD 7974-6"
  responsible: "Inżynier ds. bezpieczeństwa pożarowego (Anna Zielińska)"
  lastVerified: "2026-02-10"
  result: "ZALICZONE — RSET 2,1 min wobec limitu 2,5 min; droga 38,5 m wobec limitu 40 m"

regulatoryReferences:
  - code: "WT 2021"
    section: "§ 256"
    description: "Maksymalna długość drogi ewakuacyjnej w budynkach mieszkalnych"
  - code: "WT 2021"
    section: "§ 257"
    description: "Drzwi na drogach ewakuacyjnych"

sources:
  - id: "SRC-CR-FIRE-EGRESS-L01-01"
    title: "Zielony Taras — Strategia bezpieczeństwa pożarowego, Rew. B"
    type: "other"
    documentType: "fire_safety_report"
    date: "2026-02-10"
    author: "Anna Zielińska, inżynier ds. bezpieczeństwa pożarowego"
  - id: "SRC-CR-FIRE-EGRESS-L01-02"
    title: "Symulacja Pathfinder — najgorszy scenariusz ewakuacji Poziomu 01"
    type: "other"
    documentType: "egress_simulation"
    date: "2026-02-08"
    author: "Pracownia ds. bezpieczeństwa pożarowego"

tags:
  - "artefakt-dokumentacji-wykonawczej"
  - "krytyczne-bezpieczeństwo"

notes: |
  To jest **najgorszy scenariusz** ścieżki ewakuacji z Poziomu 01: z najdalej
  położonej sypialni (Sypialnia 01, północny koniec korytarza) do najbliższej
  chronionej klatki schodowej. Droga ma 38,5 m drogi ewakuacyjnej wobec
  regulacyjnego limitu 40 m, dając zapas 1,5 m — wystarczająco wąski,
  by każda przyszła zmiana układu na Poziomie 01 musiała zweryfikować tę drogę ponownie.

  Symulacja Pathfinder (2026-02-08) potwierdziła RSET 2,1 minuty przy
  jednoczesnej ewakuacji wszystkich 18 lokali, przy założeniu zablokowania
  jednej klatki schodowej (najgorsze założenie wykraczające poza wymagania kodeksu).

  Inne kondygnacje mają podobną topologię, ale każda musi być modelowana
  osobno, ponieważ układy pokoi i długości korytarzy są różne.

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Dodano w ramach odświeżenia przykładu v2.1.0 — wydobywa drogę ewakuacji z narracji REQ do encji drogi cyrkulacji"
---

# Droga cyrkulacji — główna ewakuacja pożarowa, Poziom 01 (CR-FIRE-EGRESS-L01)

**Najgorszy scenariusz** ścieżki ewakuacji z Poziomu 01: z Sypialni 01
(najdalej położonej od którejkolwiek klatki schodowej) do chronionej
klatki schodowej A.

| Właściwość | Wartość |
|---|---|
| Typ drogi | Główna ewakuacja |
| Długość drogi | **38,5 m** (limit: 40 m wg WT 2021 § 256) |
| Najwęższy odcinek | 1 400 mm (zgodny z minimum regulacyjnym) |
| Szacowany RSET | **2,1 min** (limit: 2,5 min) |
| Dostępność dla wózków | Tak |
| Pojemność osobowa | 54 osoby (pełne obciążenie budynku) |
| Weryfikacja | Symulacja Pathfinder 2024, 2026-02-10 — ZALICZONE |

## Ścieżka, krok po kroku

1. **[Sypialnia 01](../przestrzenie/sypialnia-01)** — najgorsze miejsce pochodzenia
2. **[Drzwi akustyczne (OPN-DOOR-CORR-001)](../otwory/opn-door-stair-01)** — z sypialni do korytarza
3. **[Korytarz (SP-BLD-01-L01-CORR)](../przestrzenie/korytarz)** — punkt decyzji: dostępna którakolwiek z klatek
4. **[Drzwi pożarowe EI 30 (OPN-DOOR-STAIR-01)](../otwory/opn-door-stair-01)** — do strefy chronionej
5. **[Klatka schodowa A (VC-STAIR-A)](../klatka-schodowa-a)** — chroniona droga ewakuacji, obudowa REI 120

## Dlaczego ta encja istnieje

Przed v2.1 droga ewakuacji była opisana **prozą** wewnątrz
`REQ-FIRE-EGRESS-TIME-001` — tekst typu "z Sypialni 01 przez korytarz do
chronionej klatki schodowej, 38,5 m łącznie". To w porządku dla architekta
czytającego wymaganie; jest bezużyteczne dla kompilatora próbującego:

- **Zweryfikować**, że każdy punkt drogi istnieje i jest osiągalny
- **Ponownie sprawdzić** długość drogi automatycznie po zmianie układu kondygnacji
- **Otagować** otwory na drodze wymaganiami odporności ogniowej
- **Wystawić** drogę w federacji BIM jako jawną encję IFC

Wydobycie drogi jako encji `circulation_route` sprawia, że każdy punkt
staje się referencjonowanym ID Przestrzeni / Otworu / Komunikacji Pionowej,
a kompilator może zgłosić regresję w momencie zmiany jednego z tych ID.

## Weryfikuje

- [`REQ-FIRE-EGRESS-TIME-001`](../wymagania/REQ-FIRE-EGRESS-TIME-001) — limit RSET 2,5 min (zaliczone przy 2,1 min)
- WT 2021 § 256 — maksymalna długość drogi 40 m (zaliczone przy 38,5 m)
- WT 2021 § 257 — minimalna szerokość drzwi 900 mm (zaliczone)
