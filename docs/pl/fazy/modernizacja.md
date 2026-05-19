# Modernizacja

::: tip Faza: `renovation` — 9 z 10
**Co robisz:** Modernizujesz, przebudowujesz lub zmieniasz sposób
użytkowania — pętla projektowa na istniejącym, użytkowanym obiekcie.
**Typowy LOD BIM:** LOD 300–500 — inwentaryzacja istniejącego + nowy projekt
**Kluczowe produkty:** Inwentaryzacja stanu, zakres i projekt
modernizacji, pozwolenie (jeśli wymagane), zaktualizowany powykonawczy
**Zastępuje (starsze):** *(nowa faza)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → **renovation** →
> decommissioned. [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

`renovation` ponownie wchodzi w pętlę projekt→budowa→odbiór, ale
ograniczona istniejącym budynkiem i (często) trwającym użytkowaniem.

1. Zinwentaryzuj stan istniejący (model jest punktem odniesienia).
2. Określ zakres modernizacji (energia, zmiana użytkowania, remont).
3. Zaprojektuj i — gdy wymagane — ponownie uzyskaj pozwolenie.
4. Wykonaj i ponownie odbierz objęte części.
5. Zaktualizuj model powykonawczy / cyfrowego bliźniaka do nowego stanu.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `renovation` |
|-------|----------------------------|
| `building` / `space` | Stan istniejący vs proponowana zmiana |
| `envelope` / `system` | Specyfikacje modernizacji, lepsze osiągi |
| `commissioning_test` | Ponowne próby zmodyfikowanych systemów |
| `issue` | Ustalenia inwentaryzacji, odchylenia |
| `requirement` | Zgodność z obowiązującymi przepisami dla zakresu |

```yaml
entityType: "envelope"
projectPhase: "renovation"
renovation:
  baseline: "ENV-EW-01@operation"
  measure: "ocieplenie_sciany_zewnetrznej"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 300–500

Istniejąca substancja jest inwentaryzowana do zweryfikowanego
powykonawczego (LOD 500); zmiany projektuje się do LOD 300+ i po
wykonaniu doprowadza z powrotem do LOD 500.

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- Modernizacja może wyzwolić obowiązek dostosowania do obecnych przepisów.
- Pozwolenie/zgłoszenie zależnie od zakresu i zmiany użytkowania.
- Ograniczenia energetyczne i konserwatorskie, gdy dotyczą.

[Modernizacja →](/pl/eksploatacja/modernizacja) ·
[Pozwolenie na budowę →](/pl/przepisy/pozwolenie-na-budowe)

---

## Kompilator i bramka jakości

Obowiązuje ostry reżim (modernizacja działa na realnym obiekcie): błędy
`assumed` i błędy `estimated` w polach krytycznych. Dane z inwentaryzacji
muszą być `measured`; dane projektu proponowanego idą tą samą ścieżką
dojrzałości co nowy obiekt dla danego zakresu.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase renovation
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 09-modernizacja && cd 09-modernizacja
# inwentaryzacja-stanu.md, zakres-modernizacji.md, projekt/, ponowny-odbior.md
git add . && git commit -m "Modernizacja — inwentaryzacja + zakres"
git tag modernizacja-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[modernizacja →](/pl/eksploatacja/modernizacja)

---

## Lista kontrolna bramki fazowej

Przed powrotem do `operation` (lub przejściem do `decommissioned`):

- [ ] Inwentaryzacja stanu kompletna (zmierzony punkt odniesienia)
- [ ] Zakres modernizacji określony i uzasadniony
- [ ] Projekt (i pozwolenie jeśli wymagane) kompletny dla zakresu
- [ ] Roboty wykonane i zmodyfikowane systemy ponownie odebrane
- [ ] Model powykonawczy / cyfrowy bliźniak zaktualizowany
- [ ] Przegląd bramki modernizacji zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `operation`](/pl/fazy/eksploatacja) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`decommissioned` →](/pl/fazy/wycofanie)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
