---
title: Energia i ślad węglowy
description: Dokumentacja efektywności energetycznej, wskaźnik EP, wymagania dotyczące współczynnika U, ocena śladu węglowego, analiza cyklu życia i budynki nZEB.
---

# Energia i ślad węglowy

Dokumentacja energetyczno-węglowa obejmuje dwa odrębne, ale powiązane zagadnienia: **energię operacyjną** (ile energii budynek zużywa w trakcie eksploatacji) i **węgiel zawarty w materiałach** (emisje CO₂ związane z produkcją materiałów, budową i rozbiórką). Współczesna dokumentacja projektowa musi uwzględniać oba te aspekty — od [etapu koncepcji](/pl/fazy/koncepcja) po [przekazanie do eksploatacji](/pl/fazy/przekazanie).

## Energia operacyjna: wskaźnik EP

Podstawowym miernikiem efektywności energetycznej budynku w Polsce jest **wskaźnik EP** — wyrażony w kWh na metr kwadratowy powierzchni użytkowej na rok (kWh/m²·rok). Składa się z:

- **EP<sub>H+W</sub>** — energia na ogrzewanie i ciepłą wodę użytkową
- **EP<sub>C</sub>** — energia na chłodzenie
- **EP<sub>L</sub>** — energia na oświetlenie (budynki użyteczności publicznej)

Wskaźnik EP oblicza się zgodnie z rozporządzeniem w sprawie metodologii określania charakterystyki energetycznej budynku. Stanowi podstawę świadectwa energetycznego i jest weryfikowany na [bramkach fazowych](/pl/jakosc/bramki-fazowe).

::: info
Wskaźnik EP opiera się na **energii pierwotnej**, nie energii dostarczonej. Źródło energii ma znaczenie: pompa ciepła zasilana energią z sieci ma inny współczynnik nakładu energii pierwotnej (w_i) niż kocioł gazowy. Fotowoltaika obniża EP, bo zmniejsza zapotrzebowanie na energię z sieci.
:::

### Wartości graniczne EP wg [WT 2021](/pl/przepisy/wt-2021)

| Typ budynku | EP<sub>H+W</sub> max (kWh/m²·rok) | Uwagi |
|---|---|---|
| Budynek jednorodzinny | 70 | Łącznie z ciepłą wodą użytkową |
| Budynek wielorodzinny | 65 | Łącznie z ciepłą wodą użytkową |
| Budynek biurowy | 65 | Bez energii na oświetlenie |
| Budynek oświatowy | 80 | Łącznie z energią na wentylację |
| Budynek opieki zdrowotnej | 290 | Wyższy z uwagi na pracę całodobową |
| Magazyn / budynek przemysłowy | 70 | Tylko przestrzenie ogrzewane |

## Współczynnik przenikania ciepła U

Współczynnik U określa, ile ciepła przechodzi przez przegrodę budowlaną. Niższe wartości oznaczają lepszą izolację. [WT 2021](/pl/przepisy/wt-2021) wyznacza wartości maksymalne dla wszystkich przegród zewnętrznych.

### Maksymalne wartości U (WT 2021, obowiązujące)

| Przegroda | U-max (W/m²·K) | Cel praktyczny | Typowy układ warstw |
|---|---|---|---|
| Ściana zewnętrzna | 0,20 | 0,15–0,18 | Ceramika + 18 cm EPS/wełna |
| Dach / stropodach | 0,15 | 0,10–0,13 | 25–30 cm wełny mineralnej |
| Podłoga na gruncie | 0,30 | 0,20–0,25 | 12–15 cm XPS |
| Okna | 0,90 | 0,70–0,80 | Pakiet trzyszybowy, ramka ciepła |
| Okna dachowe | 1,10 | 0,90–1,00 | Pakiet trzyszybowy |
| Drzwi zewnętrzne | 1,30 | 1,00–1,10 | Drzwi z rdzeniem termicznym |

::: tip
Kolumna „Cel praktyczny" pokazuje wartości, które w praktyce pozwalają komfortowo spełnić wymagania EP. Projektowanie na granicy U-max nie pozostawia marginesu na mostki termiczne i tolerancje wykonawcze.
:::

### Dokumentowanie wartości U

Dla każdej przegrody zewnętrznej w dokumentacji (karta Budynku lub odrębna karta Wymagania) zapisz:

1. **Układ warstw** — materiał, grubość, współczynnik przewodzenia ciepła (lambda)
2. **Obliczony współczynnik U** — zgodnie z PN-EN ISO 6946
3. **Ocena mostków termicznych** — liniowy współczynnik przenikania ciepła (psi)
4. **Sprawdzenie kondensacji** — współczynnik temperaturowy fRsi

## Strategie projektowania pasywnego

Decyzje projektowe wpływające na EP — dokumentuj je w karcie Budynku od fazy koncepcji:

| Strategia | Wpływ na EP | Gdzie dokumentować |
|---|---|---|
| Orientacja budynku (oś wschód–zachód) | Redukcja EP o 5–15% | Karta Budynku — orientacja |
| Zwartość bryły (niski A/V) | Redukcja EP o 10–20% | Karta Budynku — współczynnik kształtu |
| Przeszklenie od południa + zacienianie | Optymalizacja zysków solarnych | Karta Pomieszczenia — stosunek okien, współczynnik g |
| Masa termiczna (ciężkie ściany wewnętrzne) | Stabilizacja temperatury, mniejsze chłodzenie | Karta Strefy — masa termiczna |
| Szczelność powietrzna (n50 ≤ 1,5 1/h) | Redukcja strat wentylacyjnych | Karta Budynku — szczelność |

## Świadectwo charakterystyki energetycznej

Każdy nowy budynek w Polsce wymaga świadectwa przed oddaniem do użytkowania. Proces wygląda następująco:

1. **[Projekt budowlany](/pl/fazy/budowlany)** — architekt oblicza wstępny EP na podstawie dokumentacji
2. **Budowa** — wykonawca realizuje obiekt zgodnie ze specyfikacją; zmiany dokumentowane w modelu as-built
3. **[Przekazanie](/pl/fazy/przekazanie)** — osoba uprawniona sporządza świadectwo na podstawie stanu faktycznego
4. **Rejestracja** — świadectwo w centralnym rejestrze charakterystyki energetycznej

::: warning
Świadectwo musi odzwierciedlać **stan faktyczny** budynku, a nie zamierzenia projektowe. Każda zmiana materiałów lub instalacji w trakcie budowy wymaga aktualizacji dokumentacji. Rozbieżność między projektem a wykonaniem to najczęstsza przyczyna problemów przy odbiorze.
:::

## Budynki o niemal zerowym zużyciu energii (nZEB)

Od 2021 r. wszystkie nowe budynki w Polsce muszą spełniać standard nZEB. W praktyce oznacza to:

- Spełnienie wartości granicznych EP wg WT 2021 (tabela powyżej)
- Spełnienie wartości granicznych U dla przegród (tabela powyżej)
- Udział energii ze źródeł odnawialnych (OZE) — nie jest jednoznacznie określony przepisami, ale wymagany pośrednio przez niskie limity EP

::: info
Standard nZEB w Polsce opiera się na obowiązujących wartościach EP i U z WT 2021. Nie ma odrębnej procedury certyfikacji nZEB — budynek spełniający WT 2021 automatycznie spełnia wymóg nZEB. Nadchodzący standard ZEB (budynki zeroemisyjne, EPBD recast) będzie wymagał dalszego obniżenia EP i dokumentowania śladu węglowego.
:::

## Ślad węglowy wbudowany (embodied carbon)

Węgiel zawarty w materiałach obejmuje emisje CO₂ związane z całym cyklem życia materiałów — od wydobycia surowców po rozbiórkę. W dobrze izolowanych budynkach węgiel wbudowany stanowi 30–50% łącznych emisji w cyklu życia.

### Etapy analizy cyklu życia (LCA) wg EN 15978

| Etap | Kod | Opis | Rola architekta |
|---|---|---|---|
| Produkt | A1–A3 | Pozyskanie surowców, transport, produkcja | Wybór materiałów o niskim śladzie węglowym |
| Budowa | A4–A5 | Transport na budowę, montaż | Koordynacja z wykonawcą |
| Użytkowanie | B1–B7 | Eksploatacja, [konserwacja](/pl/eksploatacja/konserwacja), naprawy, energia | Trwałe materiały, sprawne instalacje |
| Koniec życia | C1–C4 | Rozbiórka, transport, przetwarzanie | Projektowanie z myślą o demontażu |
| Poza cyklem | D | Ponowne użycie, odzysk, recykling | Dokumentowanie możliwości recyklingu |

### Typowy ślad węglowy materiałów

| Materiał | kgCO₂e/kg | Alternatywa o niższej emisji |
|---|---|---|
| Beton (standardowy) | 0,10–0,15 | Beton niskocementowy, geopolimerowy |
| Stal (z rudy) | 1,50–2,00 | Stal z recyklingu (0,40–0,80) |
| Aluminium (z rudy) | 8,00–12,00 | Aluminium z recyklingu (0,50–1,50) |
| Cegła ceramiczna | 0,20–0,30 | Drewno konstrukcyjne, bloczki silikatowe |
| Drewno (iglaste, certyfikowane) | −1,00 do −0,50 | Magazynuje węgiel; preferuj FSC/PEFC |
| Izolacja EPS | 3,00–4,00 | Wełna mineralna (1,00), celuloza (0,10) |

## Kluczowe parametry energetyczne w dokumentacji

| Parametr | Typ karty | Pole YAML | Faza wprowadzenia |
|---|---|---|---|
| Wskaźnik EP (kWh/m²·rok) | Budynek | `zrownowazonosc.energia.ep_cel` | [Koncepcja](/pl/fazy/koncepcja) |
| Współczynnik U przegród | Budynek / Wymaganie | `zrownowazonosc.przegrody.sciana_u` | [Projekt wstępny](/pl/fazy/wstepny) |
| Źródło energii | Instalacja | `zrodlo_energii`, `udzial_oze` | [Projekt budowlany](/pl/fazy/budowlany) |
| Szczelność n50 | Budynek | `zrownowazonosc.przegrody.szczelnosc_n50` | [Projekt wykonawczy](/pl/fazy/wykonawczy) |
| Ślad węglowy (kgCO₂e/m²) | Budynek | `zrownowazonosc.weglowy.cel_embodied` | [Projekt budowlany](/pl/fazy/budowlany) |
| Klasa energetyczna (A–G) | Budynek | `klasa_energetyczna` | [Przekazanie](/pl/fazy/przekazanie) |
| Sprawność odzysku ciepła | Instalacja | `sprawnosc_odzysku` | [Projekt budowlany](/pl/fazy/budowlany) |

Dane energetyczne osadzone w kartach mogą być synchronizowane z modelem [BIM](/pl/integracja-bim/) i weryfikowane przez [czujniki IoT](/pl/integracja-bim/czujniki-iot) w fazie eksploatacji.

## Lista kontrolna: dokumentacja energetyczna wg fazy

### [Koncepcja](/pl/fazy/koncepcja)
- [ ] Wstępne cele EP zapisane w karcie Budynku
- [ ] Analiza orientacji i współczynnika kształtu (A/V)
- [ ] Wstępna strategia energetyczna (źródło ciepła, OZE)

### [Projekt wstępny](/pl/fazy/wstepny)
- [ ] Współczynniki U dla wszystkich przegród — obliczenia wg PN-EN ISO 6946
- [ ] Wstępny model energetyczny (obliczenie EP)
- [ ] Koncepcja instalacji HVAC w kartach Instalacji

### [Projekt budowlany](/pl/fazy/budowlany)
- [ ] Kompletne obliczenia EP z uwzględnieniem mostków termicznych
- [ ] Specyfikacja przegród z układami warstw
- [ ] Dane środowiskowe materiałów (EPD) — wstępna analiza LCA
- [ ] Projekt instalacji OZE (fotowoltaika, pompa ciepła)

### [Projekt wykonawczy](/pl/fazy/wykonawczy)
- [ ] Detale mostków termicznych z wartościami psi
- [ ] Specyfikacja szczelności powietrznej z protokołem badania
- [ ] Karty Urządzeń z parametrami energetycznymi

### [Przekazanie](/pl/fazy/przekazanie)
- [ ] Świadectwo charakterystyki energetycznej (stan as-built)
- [ ] Dokumentacja powykonawcza z rzeczywistymi wartościami U i EP
- [ ] Plan monitoringu energetycznego na [etapie eksploatacji](/pl/eksploatacja/)

::: warning
Nie polegaj wyłącznie na zgodności współczynników U. Budynek może spełniać wszystkie wartości graniczne U, a mimo to przekroczyć dopuszczalny EP, jeśli współczynnik kształtu jest niekorzystny lub mostki termiczne są nadmierne. Zawsze weryfikuj EP jako wskaźnik całościowy.
:::
