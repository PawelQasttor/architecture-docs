# Pakiet Budowlany (Pakiet Robót)

## Czym Jest

Plik **Pakietu Budowlanego** opisuje pakiet robót do etapowej realizacji budowy. Śledzi zakres, harmonogram, koszty, zależności i informacje o wykonawcy. Encje odwołują się do pakietu budowlanego przez `constructionPackageId`.

::: tip Dla Architektów
**Problem:** Kierownik projektu pyta "Ile z pakietu przegród jest zrobione?" — porównujesz harmonogram Gantta z raportem kosztowym i roszczeniami wykonawcy.

**Stary sposób:** Program w Primavera/MS Project, raport kosztowy w Excelu, zakres w umowie, postęp w protokołach narad.

**Z pakietami budowlanymi:** Jeden plik na pakiet robót. Zakres, harmonogram, zestawienie kosztów, zależności, postęp — wszystko powiązane z rzeczywistymi encjami budynku przypisanymi do tego pakietu. Kompilator automatycznie oblicza, które encje należą do każdego pakietu i agreguje koszty.

**Jeden plik pakietu = zakres + harmonogram + koszty + postęp w jednym miejscu.**
:::

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|---------|
| `id` | string | Unikalny ID pakietu (prefiks `CP-`) | `"CP-STRUCTURE"` |
| `entityType` | string | Musi być `"construction_package"` | `"construction_package"` |
| `packageName` | string | Czytelna nazwa | `"Roboty Konstrukcyjne"` |
| `sequence` | integer | Kolejność realizacji (1 = pierwszy) | `1` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Zależności

Zależności między pakietami używają standardowych relacji harmonogramowania:

```yaml
dependencies:
  - packageId: "CP-STRUCTURE"
    type: "finish_to_start"  # Najczęstsza
    lag: -30                  # 30-dniowe wyprzedzenie
```

| Typ | Opis |
|-----|------|
| `finish_to_start` | B rozpoczyna się po zakończeniu A (najczęstszy) |
| `start_to_start` | B rozpoczyna się gdy rozpoczyna się A |
| `finish_to_finish` | B kończy się gdy kończy się A |
| `start_to_finish` | B kończy się gdy rozpoczyna się A (rzadki) |

Kompilator waliduje odwołania zależności i wykrywa cykliczne zależności.

## Pola Automatycznie Obliczane

Kompilator automatycznie oblicza:
- **`assignedEntityIds`** — Wszystkie encje odwołujące się do tego pakietu przez `constructionPackageId`
- **`costSummary`** — Zagregowane koszty z przypisanych encji

## Migracja z Pakietów Wbudowanych

W v1.0 pakiety budowlane były definiowane wbudowane jako `project.constructionPackages[]`. W v1.1 są samodzielnymi encjami. Kompilator automatycznie migruje pakiety wbudowane do samodzielnych encji z flagą `_migrated: true`.

## Przykład

Zobacz przykład Zielony Taras: [Konstrukcja](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-konstrukcja), [Przegrody](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-przegroda), [Instalacje](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-instalacje), [Wykończenia](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-wykonczenie)
