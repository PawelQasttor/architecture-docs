# Projekt wykonawczy

::: tip Faza: `construction_documents` — 4 z 10
**Co robisz:** Sporządzasz kompletny zestaw przetargowy/wykonawczy —
każdy detal i specyfikację potrzebną wykonawcy do wyceny i budowy.
**Typowy LOD BIM:** LOD 400 — poziom detalu wykonawczego
**Kluczowe produkty:** Pełne specyfikacje, detale, zestawienia, eksport
IFC, specyfikacje elementów
**Zastępuje (starsze):** *Projekt wykonawczy (LOD 400)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → **construction_documents** → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Sporządź detale i połączenia na poziomie wykonawczym.
2. Ukończ wszystkie specyfikacje i zestawienia.
3. Sfinalizuj specyfikacje elementów (każdy typ ściany/stropu/otworu).
4. Wyeksportuj skoordynowany IFC zestawu wykonawczego.
5. Wydaj dokumentację przetargową/wykonawczą.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `construction_documents` |
|-------|----------------------------------------|
| `envelope` / `opening` | Poziom wykonawczy, konkretny produkt |
| `construction_package` | Zakres, sekwencja, koszt |
| `material` | Finalne produkty z danymi zakupowymi |
| `asset` / `asset_type` | Określone wybory urządzeń |
| każde wymaganie | Zweryfikowane — `assumed` daje teraz **ostrzeżenia** |

```yaml
entityType: "construction_package"
projectPhase: "construction_documents"
bimLOD: "LOD_400"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 400

LOD 400 = **wykonawczy**: detalowanie, montaż i informacje instalacyjne
wystarczające do prefabrykacji i budowy.

```yaml
bimLOD: "LOD_400"
```

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- Specyfikacje przywołują obowiązujące normy/klauzule.
- Wykazane detale przeciwpożarowe, akustyczne i cieplne.
- Dowody zgodności spakowane z zestawem wykonawczym.

[WT 2021 →](/pl/przepisy/wt-2021)

---

## Kompilator i bramka jakości

**Pierwsza bramka włącza się tutaj.** Od `construction_documents`
kompilator **ostrzega o każdym polu `assumed`** — zestaw przetargowy nie
może opierać się na założeniach. Przesuń pozostałe dane `assumed` ku
`estimated`/`specified`/`measured`.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase construction_documents
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 04-projekt-wykonawczy && cd 04-projekt-wykonawczy
# eksport IFC 4.0 z narzędzia BIM; generacja specyfikacji elementów
git add . && git commit -m "Projekt wykonawczy — pełny zestaw"
git tag projekt-wykonawczy-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[pakiety budowlane →](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-konstrukcja)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `bidding_procurement`:

- [ ] Detale na poziomie wykonawczym kompletne
- [ ] Wszystkie specyfikacje i zestawienia sfinalizowane
- [ ] Specyfikacje elementów wydane
- [ ] Skoordynowany IFC wyeksportowany
- [ ] Brak nierozwiązanych ostrzeżeń `assumed`
- [ ] Zestaw przetargowy/wykonawczy wydany
- [ ] Przegląd bramki wykonawczej zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `design_development`](/pl/fazy/projekt-budowlany) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`bidding_procurement` →](/pl/fazy/przetarg)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
