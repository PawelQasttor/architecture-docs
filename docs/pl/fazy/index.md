# Cykl życia SBM — 10 ujednoliconych faz

Semantyczny Model Budynku używa **jednego** słownika faz w całym
standardzie: dokumentacja, schema i kompilator mówią tymi samymi
dziesięcioma fazami. Nie ma osobnej „fazy LOD", „etapu RIBA" ani fazy
numerycznej do uzgadniania — ta strona jest jedynym źródłem prawdy.

::: tip Jeden słownik, wszędzie
Bieżąca faza projektu jest deklarowana raz (`projectPhase:` na encjach,
`phase:` na projekcie), a kompilator egzekwuje bramki jakości danych
względem niej. Zobacz [Bramki faz kompilatora](#bramki-faz-kompilatora).
:::

---

## Dziesięć faz

| # | Faza | Czego dotyczy | Typowy LOD BIM |
|---|------|----------------|-----------------|
| 1 | [`concept`](/pl/fazy/koncepcja) | Założenia, studium wykonalności, bryła, koncepcje | LOD 100 |
| 2 | [`schematic_design`](/pl/fazy/projekt-wstepny) | Układ przestrzenny, strategia instalacji i konstrukcji | LOD 200 |
| 3 | [`design_development`](/pl/fazy/projekt-budowlany) | Skoordynowany projekt, projekt budowlany | LOD 300 |
| 4 | [`construction_documents`](/pl/fazy/projekt-wykonawczy) | Projekt wykonawczy, pełne specyfikacje | LOD 400 |
| 5 | [`bidding_procurement`](/pl/fazy/przetarg) | Przetarg, ocena ofert, wybór wykonawcy | LOD 400 |
| 6 | [`construction`](/pl/fazy/budowa) | Realizacja, RFI, zmiany, odbiory częściowe | LOD 400 |
| 7 | [`commissioning`](/pl/fazy/odbiory) | Próby, rozruch, dokumentacja powykonawcza, odbiór | LOD 500 |
| 8 | [`operation`](/pl/fazy/eksploatacja) | Przekazanie, eksploatacja, konserwacja, monitoring | LOD 500 |
| 9 | [`renovation`](/pl/fazy/modernizacja) | Modernizacja, przebudowa, zmiana sposobu użytkowania | LOD 300–500 |
| 10 | [`decommissioned`](/pl/fazy/wycofanie) | Koniec życia, rozbiórka, odzysk materiałów | — |

Fazy tworzą **uporządkowany cykl życia**. Projekt przechodzi przez nie
kolejno; dojrzałość danych i rygor kompilatora rosną wraz z postępem.

---

## Migracja ze starego modelu 8-fazowego

Przed v2.0 standard używał 8-stopniowego słownika opartego na LOD.
Te stopnie mapują się na ujednolicone fazy następująco:

| Stara faza (przed v2.0) | Faza ujednolicona |
|--------------------------|-------------------|
| Rozpoczęcie projektu | wchłonięte do **`concept`** |
| Projekt koncepcyjny (LOD 100) | **`concept`** |
| Projekt wstępny (LOD 200) | **`schematic_design`** |
| Projekt budowlany (LOD 300) | **`design_development`** |
| Projekt wykonawczy (LOD 400) | **`construction_documents`** |
| Faza budowy | **`construction`** |
| Dokumentacja powykonawcza (LOD 500) | **`commissioning`** |
| Przekazanie i konserwacja | **`operation`** |
| *(nowa)* | **`bidding_procurement`** |
| *(nowa)* | **`renovation`** |
| *(nowa)* | **`decommissioned`** |

Starsze fazy numeryczne (`phase: 1`–`8`) są nadal akceptowane przez
kompilator i mapowane automatycznie — nowe projekty powinny używać nazw
ujednoliconych.

---

## Bramki faz kompilatora

Kompilator zaostrza wymagania jakości danych wraz z dojrzewaniem
projektu. Uruchom go z `--phase <nazwa>` (lub polegaj na `projectPhase:`):

| Od fazy | Bramka |
|---------|--------|
| przed `construction_documents` | akceptowane wszystkie poziomy pewności |
| od `construction_documents` | ostrzeżenie dla pewności `assumed` |
| od `bidding_procurement` | błąd dla pewności `assumed` |
| od `commissioning` | błąd dla `estimated` w polach krytycznych dla bezpieczeństwa |

```bash
node scripts/compiler/index.mjs validate \
  --input docs/en/examples/green-terrace \
  --country PL --phase design_development
```

Zobacz [dokumentację kompilatora](/pl/dokumentacja/kompilator/).

---

## Dalej

Zacznij od [`concept`](/pl/fazy/koncepcja) lub przejdź do dowolnej fazy
powyżej. Pełny przepływ pracy dokument po dokumencie znajdziesz w
[Kompletnym przepływie pracy](/pl/standardy/struktura-dokumentu).
