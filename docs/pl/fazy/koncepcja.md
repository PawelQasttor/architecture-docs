# Koncepcja

::: tip Faza: `concept` — 1 z 10
**Co robisz:** Ustalasz założenia, badasz wykonalność, opracowujesz 2–3
koncepcje i studia bryły, sprawdzasz zgodność z planem miejscowym.
**Typowy LOD BIM:** LOD 100 — symboliczna bryła
**Kluczowe produkty:** Założenia projektowe, notatka wykonalności,
warianty bryły, wstępne sprawdzenie przepisów i kosztów, wybrana koncepcja
**Zastępuje (starsze):** *Rozpoczęcie projektu* + *Projekt koncepcyjny (LOD 100)*
:::

> Cykl życia SBM ma 10 ujednoliconych faz: **concept** → schematic_design →
> design_development → construction_documents → bidding_procurement →
> construction → commissioning → operation → renovation → decommissioned.
> [Zobacz pełny cykl życia →](/pl/fazy/)

---

## Cel i działania

Faza `concept` prowadzi projekt od „mamy działkę i zamiar" do „mamy
wybrany kierunek projektowy".

**Rozpoczęcie i założenia** (wchłonięte z dawnej osobnej fazy)

- Zbierz założenia klienta: cel, program, budżet, harmonogram.
- Potwierdź fakty o działce: plan miejscowy (MPZP/WZ), ograniczenia, media.
- Zapisz stanowisko wykonalności: czy program jest realizowalny na tej działce w budżecie?

**Projekt koncepcyjny**

1. Opracuj 2–3 koncepcje odpowiadające założeniom.
2. Wykonaj studia bryły (kubatura, forma, orientacja).
3. Ustal przybliżone wymiary i powierzchnię całkowitą.
4. Sprawdź koncepcje względem planu (wysokość, intensywność, linie zabudowy).
5. Przygotuj szacunki kosztów rzędu wielkości (±30%).
6. Zaprezentuj koncepcje; zapisz wybór klienta i uzasadnienie.

---

## Encje SBM w tej fazie

Model jest tu celowo zgrubny — szerokość ważniejsza niż głębia:

| Encja | Dojrzałość w `concept` |
|-------|------------------------|
| `project` | Założenia, kraj, budżet, `phase: concept` |
| `site` | Działka, plan miejscowy, kluczowe ograniczenia |
| `building` | Przybliżona PUM, kondygnacje, wysokość, zamierzone przeznaczenie |
| `level` | Utworzone z przybliżonymi rzędnymi |
| `space` | Zgrubne pomieszczenia z `designArea`, przypisany typ |
| `zone` | Wstępne strefy pożarowe / HVAC |
| `requirement` | Pojawia się kontekst regulacyjny |

```yaml
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "concept"
spaceName: "Sypialnia 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"
designArea: 14.5            # przybliżone — confidence: assumed jest tu OK
unit: "m"
```

[Poznaj definicje encji SBM →](/pl/dokumentacja/encje/)

---

## Wymagania BIM — LOD 100

LOD 100 jest **symboliczny**: przybliżony rozmiar i lokalizacja, ogólne
właściwości. Bryły, płaszczyzny kondygnacji, podstawowa forma dachu — bez
konkretnych materiałów i detali.

```yaml
bimLOD: "LOD_100"
```

[Definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Zakres regulacyjny

- **Prawo budowlane, art. 5** — wstępne sprawdzenie wymagań konstrukcyjnych,
  pożarowych, bezpieczeństwa, dostępności i energetycznych.
- **Plan miejscowy (MPZP / WZ)** — wysokość, intensywność, linie zabudowy,
  miejsca postojowe, powierzchnia biologicznie czynna.

[Prawo budowlane →](/pl/przepisy/prawo-budowlane) ·
[MPZP i WZ →](/pl/przepisy/mpzp-wz)

---

## Kompilator i bramka jakości

W `concept` kompilator akceptuje **wszystkie poziomy pewności** — dane
`assumed` są na tym etapie oczekiwane. Bramki zaostrzają się dopiero od
`construction_documents` (zob. [tabela bramek](/pl/fazy/#bramki-faz-kompilatora)).

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase concept
```

Zasada tej fazy: **uczciwie oznaczaj pewność** (`_meta.confidence: assumed`)
zamiast zawyżać precyzję.

---

## Przepływ pracy

```bash
mkdir 01-koncepcja && cd 01-koncepcja
git add . && git commit -m "Koncepcja — 3 warianty, wybór zapisany"
git tag koncepcja-v1.0
```

[Eksport PDF →](/pl/przewodniki/eksport-pdf)

---

## Przykład — Zielony Taras

[Projekt Zielony Taras →](/pl/przyklady/zielony-taras/) ·
[przestrzeń w dojrzałym modelu →](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)

---

## Lista kontrolna bramki fazowej

Przed przejściem do `schematic_design`:

- [ ] Założenia i program zapisane
- [ ] Stanowisko wykonalności udokumentowane
- [ ] Klient wybrał preferowaną koncepcję (decyzja w dzienniku)
- [ ] Model bryły utworzony (LOD 100)
- [ ] Przybliżone wymiary i PUM ustalone
- [ ] Wstępna zgodność z planem zweryfikowana
- [ ] Szacunek kosztów rzędu wielkości przygotowany
- [ ] Pewność uczciwie oznaczona na wczesnych danych
- [ ] Przegląd bramki koncepcji zaliczony — [listy kontrolne →](/pl/jakosc/bramki-fazowe)

---

## Nawigacja

← *(początek cyklu)* ·
[**Przegląd cyklu życia**](/pl/fazy/) ·
[`schematic_design` →](/pl/fazy/projekt-wstepny)

[Kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)
