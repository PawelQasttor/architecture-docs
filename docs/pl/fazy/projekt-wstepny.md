# Projekt wstępny

::: tip Faza: `schematic_design` — 2 z 10
**Co robisz:** Doprecyzowujesz układ przestrzenny, ustalasz koncepcję
konstrukcji, strategię instalacji, uściślasz koszt.
**Typowy LOD BIM:** LOD 200 — elementy ogólne, przybliżone ilości
**Kluczowe produkty:** Rozwinięty rzut/przekrój/elewacja, strategia
konstrukcji i instalacji, uściślony kosztorys (±20%)
**Zastępuje (starsze):** *Projekt wstępny (LOD 200)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → **schematic_design** →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

Wybrana koncepcja staje się spójnym, budowalnym schematem.

1. Rozwiń rzut, przekrój i elewację z wybranej koncepcji.
2. Ustal **koncepcję konstrukcji** (siatka, ustrój, główne rozpiętości).
3. Określ **strategię instalacji** (ogrzewanie/wentylacja/elektryka).
4. Potwierdź program przestrzenny względem założeń (powierzchnie, sąsiedztwa).
5. Uściślij kosztorys do ±20%.
6. Rozwiąż główne kwestie przepisowe (ewakuacja, zarys strategii pożarowej).

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `schematic_design` |
|-------|----------------------------------|
| `space` | Pewne powierzchnie, sąsiedztwa, typy potwierdzone |
| `zone` | Strefy pożarowe i HVAC z granicami |
| `system` / `system_type` | Systemy na poziomie strategii |
| `structural_system` | Koncepcja: ustrój, siatka, rozpiętości |
| `space_program` | Pierwsze sprawdzenie zgodności program–projekt |
| `requirement` | Kluczowe wymagania przepisowe dołączone |

```yaml
entityType: "space"
projectPhase: "schematic_design"
designArea: 14.2
unit: "m"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 200

LOD 200 = elementy **ogólne** o przybliżonym rozmiarze, kształcie i
lokalizacji. Ściany/stropy/dach jako ogólne przegrody; instalacje jako
trasy ogólne.

```yaml
bimLOD: "LOD_200"
```

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- Zarys strategii ewakuacji i długości dróg.
- Koncepcja stref pożarowych (kategoria ZL wg WT 2021).
- Sprawdzenie minimów doświetlenia / wymiarów pomieszczeń.

[WT 2021 →](/pl/przepisy/wt-2021) ·
[Prawo budowlane →](/pl/przepisy/prawo-budowlane)

---

## Kompilator i bramka jakości

`schematic_design` wciąż **akceptuje wszystkie poziomy pewności** — bramki
zaostrzają się od `construction_documents`. Wykorzystaj tę fazę, by
przesunąć pola `assumed` ku `estimated`/`specified` przed bramką.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase schematic_design
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 02-projekt-wstepny && cd 02-projekt-wstepny
git add . && git commit -m "Projekt wstępny — schemat + strategia konstrukcji/instalacji"
git tag projekt-wstepny-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[system konstrukcyjny →](/pl/dokumentacja/encje/system-konstrukcyjny)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `design_development`:

- [ ] Rzut/przekrój/elewacja rozwinięte i spójne
- [ ] Koncepcja konstrukcji ustalona (siatka, ustrój, rozpiętości)
- [ ] Strategia instalacji określona
- [ ] Zgodność programu przestrzennego sprawdzona
- [ ] Koszt uściślony do ±20%
- [ ] Zarys strategii pożarowej/ewakuacji
- [ ] Przegląd bramki projektu wstępnego zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `concept`](/pl/fazy/koncepcja) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`design_development` →](/pl/fazy/projekt-budowlany)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
