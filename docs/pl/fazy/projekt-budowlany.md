# Projekt budowlany

::: tip Faza: `design_development` — 3 z 10
**Co robisz:** Koordynujesz wszystkie branże w projekt gotowy do pozwolenia.
**Typowy LOD BIM:** LOD 300 — elementy konkretne, precyzyjna geometria
**Kluczowe produkty:** Skoordynowany projekt, projekt budowlany, pełna
zgodność z przepisami, obliczenia
**Zastępuje (starsze):** *Projekt budowlany / Pozwolenie (LOD 300)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> **design_development** → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

Schemat staje się w pełni skoordynowanym projektem do wniosku o pozwolenie
na budowę.

1. Skoordynuj architekturę, konstrukcję i instalacje (bez kolizji).
2. Doprecyzuj typy elementów (ściany, stropy, dach, otwory).
3. Wykonaj obliczenia przepisowe (energia, akustyka, pożar).
4. Sporządź **projekt budowlany**.
5. Osiągnij **pełną zgodność z przepisami** — nie wstępną.
6. Zablokuj plan kosztów (±10%).

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `design_development` |
|-------|------------------------------------|
| `envelope` | Konkretne układy warstw, U, parametry |
| `opening` / `opening_type` | Określone produkty/typy |
| `structural_system` | Wymiarowane elementy, fundamenty, obciążenia |
| `requirement` | Pełna zgodność zweryfikowana, nie `assumed` |
| `material` / `material_type` | Określone z danymi technicznymi |

```yaml
entityType: "envelope"
projectPhase: "design_development"
bimLOD: "LOD_300"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 300

LOD 300 = elementy **konkretne**: precyzyjna geometria, określone
przegrody, dokładne ilości do pozwolenia i koordynacji.

```yaml
bimLOD: "LOD_300"
```

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny — wymagana pełna zgodność

- WT 2021: wymiary pomieszczeń, doświetlenie, cieplne, akustyczne, pożarowe.
- Prawo budowlane: kompletna dokumentacja do pozwolenia.
- Podstawa świadectwa charakterystyki energetycznej.

[WT 2021 →](/pl/przepisy/wt-2021) ·
[Pozwolenie na budowę →](/pl/przepisy/pozwolenie-na-budowe)

---

## Kompilator i bramka jakości

`design_development` to **ostatnia faza akceptująca wszystkie poziomy
pewności** — bramka zaostrza się zaraz potem. Usuń tu pola `assumed`; od
`construction_documents` generują one ostrzeżenia.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase design_development
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 03-projekt-budowlany && cd 03-projekt-budowlany
git add . && git commit -m "Projekt budowlany — skoordynowany zestaw do pozwolenia"
git tag projekt-budowlany-v1.0
```

[Eksport PDF projektu →](/pl/przewodniki/eksport-pdf)

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[przegroda: ściana zewnętrzna →](/pl/przyklady/zielony-taras/przegroda-sciana-zewnetrzna-typ-a)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `construction_documents`:

- [ ] Wszystkie branże skoordynowane (bez kolizji)
- [ ] Typy elementów określone (przegrody, otwory, konstrukcja)
- [ ] Obliczenia przepisowe kompletne
- [ ] Projekt budowlany sporządzony
- [ ] Pełna zgodność z przepisami (bez `assumed` na wymaganiach)
- [ ] Plan kosztów zablokowany (±10%)
- [ ] Przegląd bramki pozwolenia zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `schematic_design`](/pl/fazy/projekt-wstepny) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`construction_documents` →](/pl/fazy/projekt-wykonawczy)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
