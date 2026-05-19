# Eksploatacja

::: tip Faza: `operation` — 8 z 10
**Co robisz:** Przekazujesz i prowadzisz budynek: eksploatacja,
konserwacja, monitoring, zarządzanie zasobami.
**Typowy LOD BIM:** LOD 500 — utrzymywany powykonawczy / cyfrowy bliźniak
**Kluczowe produkty:** Instrukcja eksploatacji, plan konserwacji, rejestr
zasobów, gwarancje, monitoring parametrów
**Zastępuje (starsze):** *Przekazanie i konserwacja*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: concept → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → **operation** → renovation →
> decommissioned. [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

1. Przekaż: instrukcja eksploatacji, szkolenie, gwarancje, dostęp.
2. Prowadź **plan konserwacji** (planowa + reaktywna).
3. Utrzymuj **rejestr zasobów** (numery seryjne, historia serwisu).
4. Monitoruj parametry (energia, komfort, awarie) względem celów.
5. Utrzymuj model powykonawczy jako żywego cyfrowego bliźniaka.

---

## Encje SBM w tej fazie

| Encja | Dojrzałość w `operation` |
|-------|---------------------------|
| `asset` | Żywy rejestr: historia serwisu, stan |
| `system` | Parametry pracy, monitorowane osiągi |
| `commissioning_test` | Okresowe ponowne próby / równoważenie |
| `issue` | Awarie eksploatacyjne i naprawy |
| `requirement` | Bieżąca zgodność (przeglądy, certyfikaty) |

```yaml
entityType: "asset"
projectPhase: "operation"
serviceHistory:
  - date: "2026-09-01"
    type: "planned_maintenance"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 500

Model LOD 500 staje się eksploatacyjnym cyfrowym bliźniakiem —
utrzymywanym na bieżąco wraz z serwisem, wymianą lub modyfikacją zasobów.

[Czujniki i IoT →](/pl/integracja-bim/czujniki-iot)

---

## Zakres regulacyjny

- Obowiązkowe przeglądy okresowe (budynek, ppoż., instalacje).
- Ponowna certyfikacja charakterystyki energetycznej.
- Ustawowe prowadzenie zapisów.

[Eksploatacja budynku →](/pl/eksploatacja/) ·
[Planowanie konserwacji →](/pl/eksploatacja/konserwacja)

---

## Kompilator i bramka jakości

Najostrzejszy reżim pozostaje w mocy (od `commissioning`): błędy
`assumed` oraz błędy `estimated` w polach krytycznych. Dane eksploatacyjne
powinny być `measured` z datowanymi źródłami (zapisy serwisowe, logi BMS).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase operation
```

[Tabela bramek →](/pl/fazy/#bramki-faz-kompilatora)

---

## Przepływ pracy

```bash
mkdir 08-eksploatacja && cd 08-eksploatacja
# instrukcja-eksploatacji.md, plan-konserwacji.md, rejestr-zasobow.md, gwarancje.md
git add . && git commit -m "Eksploatacja — pakiet przekazania + plan konserwacji"
git tag przekazanie-v1.0
```

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[wynik rejestru zasobów →](/pl/dokumentacja/kompilator/)

---

## Lista kontrolna bramki fazowej

Gotowość eksploatacyjna:

- [ ] Instrukcja eksploatacji wydana i klient przeszkolony
- [ ] Plan konserwacji aktywny (planowa + reaktywna)
- [ ] Rejestr zasobów żywy z numerami seryjnymi i gwarancjami
- [ ] Monitoring parametrów względem celów projektowych
- [ ] Harmonogram przeglądów ustawowych działa
- [ ] Cyfrowy bliźniak utrzymywany na bieżąco
- [ ] Ustalona kadencja przeglądów eksploatacyjnych — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

[← `commissioning`](/pl/fazy/odbiory) ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`renovation` →](/pl/fazy/modernizacja)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
