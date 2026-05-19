# Przetarg i zamówienie

::: tip Faza: `bidding_procurement` — 5 z 10
**Co robisz:** Wydajesz przetarg, oceniasz oferty, udzielasz zamówienia —
projekt jest zamrożony; ta faza jest handlowa, nie projektowa.
**Typowy LOD BIM:** LOD 400 — wydany zestaw wykonawczy, bez zmian
**Kluczowe produkty:** Pakiet przetargowy, ocena ofert, wybór wykonawcy,
podpisana umowa, harmonogram zamówień
**Zastępuje (starsze):** *(nowa faza — dawniej domyślna między PW a budową)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → **bidding_procurement** →
> construction → commissioning → operation → renovation → decommissioned.
> [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Wydaj pakiet przetargowy oferentom.
2. Prowadź proces pytań i wyjaśnień (RFI) podczas przetargu.
3. Oceń oferty — cena, harmonogram, kompetencje, zgodność.
4. Udziel zamówienia; zapisz decyzję i uzasadnienie.
5. Ustal harmonogram zamówień dla elementów o długim terminie.

Projekt **nie zmienia się** tutaj. Każda zmiana to udokumentowany wyjątek
zawracany przez `design_development` / `construction_documents`.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `bidding_procurement` |
|-------|-------------------------------------|
| `construction_package` | Wyceniony; zapisany wybrany wykonawca |
| `material` / `asset` | Status zamówienia, terminy dostaw |
| `issue` | Wyjaśnienia przetargowe jako RFI |
| `requirement` | Zamrożone — zweryfikowane, nigdy `assumed` |

```yaml
entityType: "construction_package"
projectPhase: "bidding_procurement"
procurement:
  status: "awarded"
  leadTimeWeeks: 12
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 400

Brak nowego modelowania — wydany zestaw LOD 400 jest podstawą umowną.
Wykonawcy mogą tworzyć własne modele wykonawcze LOD 400 po udzieleniu
zamówienia.

---

## Zakres regulacyjny

- Zasady zamówień publicznych (PZP) gdy dotyczą.
- Forma umowy i obowiązki zgodności ustalone.

[Formalności budowlane →](/pl/przepisy/formalnosci-budowlane)

---

## Kompilator i bramka jakości

**Bramka twardnieje tutaj.** Od `bidding_procurement` kompilator
**zgłasza błąd dla każdego pola `assumed`** — nie można przetargować ani
zawierać umowy na danych założonych. Model musi być w pełni zweryfikowany
przed udzieleniem zamówienia.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase bidding_procurement
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 05-przetarg && cd 05-przetarg
# pakiet-przetargowy/, ocena-ofert.md, decyzja-o-wyborze.md
git add . && git commit -m "Przetarg i zamówienie — udzielono zamówienia"
git tag udzielenie-zamowienia-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[pakiety budowlane →](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-instalacje)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `construction`:

- [ ] Pakiet przetargowy wydany
- [ ] Wyjaśnienia przetargowe zapisane jako encje `issue` (RFI)
- [ ] Oferty ocenione wg ceny/harmonogramu/kompetencji
- [ ] Zamówienie udzielone; decyzja zapisana
- [ ] Harmonogram zamówień długoterminowych ustalony
- [ ] Brak błędów `assumed` (bramka jest tu twarda)
- [ ] Przegląd bramki wyboru zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `construction_documents`](/pl/fazy/projekt-wykonawczy) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`construction` →](/pl/fazy/budowa)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
