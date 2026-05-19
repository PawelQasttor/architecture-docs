# Budowa

::: tip Faza: `construction` — 6 z 10
**Co robisz:** Budujesz. Administrujesz umową: RFI, zlecenia zmian,
odbiory, postęp, jakość.
**Typowy LOD BIM:** LOD 400 — wykonawczy, stopniowo powykonawczy
**Kluczowe produkty:** Dziennik RFI/zmian, protokoły odbiorów, raporty
postępu, zapisy jakości
**Zastępuje (starsze):** *Faza budowy*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> **construction** → commissioning → operation → renovation →
> decommissioned. [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Administruj robotami: polecenia, postęp, płatności.
2. Zarządzaj **RFI i zleceniami zmian** jako encjami `issue`.
3. Prowadź odbiory i punkty kontrolne; zapisuj wyniki.
4. Gromadź zapisy jakości i zgodności materiałów.
5. Rozpocznij stopniowe gromadzenie danych powykonawczych (zasila `commissioning`).

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `construction` |
|-------|------------------------------|
| `issue` | RFI, zlecenia zmian, odbiory, NCR, usterki |
| `construction_package` | Rzeczywisty postęp, koszt zaangażowany/wydany |
| `asset` | Status dostarczono/zamontowano, numery seryjne |
| `commissioning_test` | Zaplanowane; wczesne próby rozpoczęte |
| `requirement` | Narastające dowody zgodności |

```yaml
entityType: "issue"
projectPhase: "construction"
issueType: "rfi"
status: "open"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 400

Model LOD 400 jest utrzymywany; odchylenia rejestruje się jako encje
`issue` i odzwierciedla jako podstawę dokumentacji powykonawczej.

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- Formalności fazy budowy, dziennik budowy.
- Odbiory i obowiązkowe punkty kontrolne.
- Kontrola zmian względem zatwierdzonego projektu.

[Formalności budowlane →](/pl/przepisy/formalnosci-budowlane)

---

## Kompilator i bramka jakości

Twardy błąd `assumed` pozostaje w mocy (od `bidding_procurement`). Nowe
dane budowy (postęp, zamontowane urządzenia) należy zapisywać z pewnością
`measured`/`specified` i źródłami (zapisy z budowy, dokumenty dostaw).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase construction
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 06-budowa && cd 06-budowa
# dziennik-rfi.md, zlecenia-zmian/, odbiory/, postep/
git add . && git commit -m "Budowa — postęp + dziennik RFI/zmian"
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[encja zgłoszenia →](/pl/dokumentacja/encje/zgloszenie)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `commissioning`:

- [ ] RFI i zlecenia zmian zapisane i rozwiązane (encje `issue`)
- [ ] Odbiory i punkty kontrolne zapisane
- [ ] Jakość / zgodność materiałów udokumentowana
- [ ] Dane powykonawcze gromadzone stopniowo
- [ ] Formalności fazy budowy utrzymane
- [ ] Przegląd bramki przedodbiorowej zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `bidding_procurement`](/pl/fazy/przetarg) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`commissioning` →](/pl/fazy/odbiory)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
