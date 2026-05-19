# Odbiory i rozruch

::: tip Faza: `commissioning` — 7 z 10
**Co robisz:** Testujesz, równoważysz i potwierdzasz budynek; tworzysz
dokumentację powykonawczą; uzyskujesz odbiór.
**Typowy LOD BIM:** LOD 500 — zweryfikowany powykonawczy
**Kluczowe produkty:** Wyniki prób, model i zapisy powykonawcze, lista
usterek, protokół odbioru
**Zastępuje (starsze):** *Dokumentacja powykonawcza (LOD 500)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → **commissioning** → operation → renovation →
> decommissioned. [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Uruchom systemy: próby funkcjonalne, równoważenie, potwierdzenie parametrów.
2. Przeprowadź próby odbiorowe (szczelność, termowizja, woda, systemy ppoż.).
3. Utwórz **dokumentację powykonawczą** — model i dokumenty zgodne z rzeczywistością.
4. Zarządzaj listą usterek do zamknięcia.
5. Uzyskaj formalny odbiór i podstawę pozwolenia na użytkowanie.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `commissioning` |
|-------|-------------------------------|
| `commissioning_test` | Wyniki z pass/fail, certyfikaty |
| `asset` | Jak zamontowano: numery seryjne, dane prób |
| `envelope` / `space` | Zweryfikowane wymiary powykonawcze |
| `issue` | Usterki śledzone do zamknięcia |
| pola krytyczne dla bezpieczeństwa | Muszą być `measured`/`calculated`/`specified` |

```yaml
entityType: "commissioning_test"
projectPhase: "commissioning"
result: "pass"
certificateRef: "SZCZELNOSC-2026-014"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 500

LOD 500 = **zweryfikowany powykonawczy** — geometria i dane potwierdzone
w terenie, gotowe do przekazania i eksploatacji.

```yaml
bimLOD: "LOD_500"
```

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- Formalności odbioru i pozwolenia na użytkowanie.
- Obowiązkowe próby odbiorowe i certyfikaty.
- Odbiór systemów przeciwpożarowych.

[Odbiory i użytkowanie →](/pl/przepisy/odbiory-uzytkowanie)

---

## Kompilator i bramka jakości

**Najostrzejsza bramka.** Od `commissioning` kompilator **zgłasza błąd dla
`estimated` w polach krytycznych dla bezpieczeństwa** (oprócz błędu
`assumed` obowiązującego od `bidding_procurement`). Dane krytyczne muszą
być `measured`/`calculated`/`specified` — poparte dowodami z prób.

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase commissioning
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 07-odbiory && cd 07-odbiory
# wyniki-prob/, powykonawcza/, lista-usterek.md, protokol-odbioru.md
git add . && git commit -m "Odbiory — próby zaliczone, powykonawcza utworzona"
git tag odbior-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[encja testu odbioru →](/pl/dokumentacja/encje/test-odbioru)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `operation`:

- [ ] Wszystkie systemy uruchomione i zrównoważone
- [ ] Próby odbiorowe zaliczone (szczelność, termowizja, ppoż., woda)
- [ ] Model i zapisy powykonawcze zgodne z rzeczywistością (LOD 500)
- [ ] Lista usterek zamknięta
- [ ] Dane krytyczne `measured`/`calculated`/`specified`
- [ ] Protokół odbioru / pozwolenie na użytkowanie uzyskane
- [ ] Przegląd bramki odbioru zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `construction`](/pl/fazy/budowa) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`operation` →](/pl/fazy/eksploatacja)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
