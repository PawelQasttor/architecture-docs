# Wycofanie z eksploatacji

::: tip Faza: `decommissioned` — 10 z 10
**Co robisz:** Koniec życia: wyłączenie, rozbiórka, odzysk materiałów,
archiwizacja zapisu.
**Typowy LOD BIM:** — (model staje się zapisem historycznym i materiałowym)
**Kluczowe produkty:** Plan wycofania, audyt przedrozbiórkowy, zapis
odzysku materiałów, zarchiwizowany model końcowy
**Zastępuje (starsze):** *(nowa faza)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation →
> **decommissioned**. [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Bezpiecznie wyłącz systemy (odetnij, opróżnij, zabezpiecz).
2. Przeprowadź **audyt przedrozbiórkowy / przeddekonstrukcyjny**.
3. Zaplanuj odzysk i ponowne użycie materiałów (gospodarka obiegu zamkniętego).
4. Zdekonstruuj; zapisz rzeczywiste odzyskanie z odpadów.
5. Zarchiwizuj model końcowy jako trwały zapis.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `decommissioned` |
|-------|--------------------------------|
| `material` | Status odzysku/ponownego użycia, stopień odzysku |
| `asset` | Wyłączony / usunięty / odzyskany |
| `building` | Status końcowy; zamknięcie zrównoważoności |
| `issue` | Ustalenia o materiałach niebezpiecznych, zamknięcia |

```yaml
entityType: "material"
projectPhase: "decommissioned"
endOfLife:
  route: "reuse"
  diversionFromLandfill: 0.82
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM

Brak nowego modelowania. Model powykonawczy jest zamrożony i
zarchiwizowany; pełni rolę **paszportu materiałowego** dla odzysku i
przyszłego odniesienia.

---

## Zakres regulacyjny

- Pozwolenie / zgłoszenie rozbiórki.
- Obowiązki inwentaryzacji i usunięcia materiałów niebezpiecznych (np. azbest).
- Sprawozdawczość gospodarki odpadami i obiegu zamkniętego.

[Formalności budowlane →](/pl/przepisy/formalnosci-budowlane)

---

## Kompilator i bramka jakości

Obowiązuje najostrzejszy reżim: zapisane dane końca życia muszą być
`measured` ze źródłami (raporty audytu, karty przekazania odpadów). Zamyka
to łańcuch proweniencji danych rozpoczęty w `concept`.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase decommissioned
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 10-wycofanie && cd 10-wycofanie
# plan-wycofania.md, audyt-przedrozbiorkowy.md, odzysk-materialow.md
git add . && git commit -m "Wycofanie — audyt + zapis odzysku materiałów"
git tag wycofanie-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[encja materiału →](/pl/dokumentacja/encje/material)

---

## Lista kontrolna bramki fazowej

Zamknięcie końca życia:

- [ ] Systemy bezpiecznie wyłączone
- [ ] Audyt przedrozbiórkowy kompletny
- [ ] Plan odzysku / ponownego użycia materiałów wykonany
- [ ] Rzeczywisty stopień odzysku zapisany (`measured`)
- [ ] Materiały niebezpieczne zinwentaryzowane i usunięte
- [ ] Model końcowy zarchiwizowany jako trwały zapis
- [ ] Przegląd zamknięcia zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `renovation`](/pl/fazy/modernizacja) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
*(koniec cyklu życia)*

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
