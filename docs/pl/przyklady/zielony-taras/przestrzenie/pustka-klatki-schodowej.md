---
entityType: "space"
id: "SP-BLD-01-VOID-STAIR"

spaceName: "Stairwell Void"
spaceType: "staircase"
levelId: "LVL-01"
levelIds:
  - "LVL-01"
  - "LVL-00"
buildingId: "BLD-01"

zoneIds:
  - "ZONE-FIRE-ZL-IV"

designArea: 8.4
designHeight: 6.0
designVolume: 50.4
unit: "m2"

constructionPackageId: "CP-STRUCTURE"

version: "1.0.0"
tags:
  - "multi-level"
  - "void"
  - "stairwell"
  - "fire-safety"
---

# Pustka klatki schodowej

**Przestrzeń wielokondygnacyjna** obejmująca Poziom 00 (parter) i Poziom 01 (pierwsze piętro).

Ta pustka tworzy otwór komunikacji pionowej dla głównej klatki schodowej [VC-STAIR-A](../klatka-schodowa-a.md), zapewniając wizualne połączenie między piętrami przy zachowaniu podziału na strefy pożarowe.

## Konfiguracja wielokondygnacyjna

| Właściwość | Wartość |
|------------|---------|
| **Poziom główny** | LVL-01 (do celów dziedziczenia i zestawienia kosztów) |
| **Wszystkie poziomy** | LVL-00, LVL-01 |
| **isMultiLevel** | `true` (obliczane automatycznie) |
| **Całkowita wysokość** | 6,0 m (2 kondygnacje) |
| **Powierzchnia podłogi** | 8,4 m² (na kondygnację) |

## Bezpieczeństwo pożarowe

- **Strefa pożarowa:** ZONE-FIRE-ZL-IV
- **Oddymianie:** Wentylacja naturalna przez klapę dachową
- **Odporność ogniowa:** REI 120 (ściany obudowy klatki schodowej)
- **Kurtyny dymowe:** Na każdym spoczynku kondygnacyjnym

## Powiązane encje

- **Komunikacja pionowa:** [VC-STAIR-A](../klatka-schodowa-a.md)
- **Poziom 00:** Parter
- **Poziom 01:** [Poziom 01](../poziomy/poziom-01)
- **Pakiet budowlany:** CP-STRUCTURE

---

**Ostatnia aktualizacja:** 2026-02-28
