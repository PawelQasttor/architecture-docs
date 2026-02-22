---
title: Zrównoważone budownictwo
description: Dokumentacja zrównoważonego projektowania — efektywność energetyczna, ślad węglowy, jakość środowiska wewnętrznego i gospodarka wodna w standardzie dokumentacji architektonicznej.
---

# Zrównoważone budownictwo

Zrównoważone projektowanie to dziś wymóg prawny, a nie wybór. Przepisy europejskie i polskie nakładają na architektów obowiązek dokumentowania efektywności energetycznej, wpływu na środowisko, jakości wnętrz oraz gospodarki wodnej na każdym etapie projektu. W tej sekcji znajdziesz praktyczne wytyczne, jak spełnić te wymagania w dokumentacji projektowej zgodnej ze standardem.

## Dlaczego zrównoważoność ma znaczenie

Sektor budowlany odpowiada za ok. 40% zużycia energii i 36% emisji CO₂ w Unii Europejskiej. Cele klimatyczne UE (redukcja emisji o 55% do 2030 r.) bezpośrednio przekładają się na wymagania wobec nowych budynków. Jednocześnie inwestorzy i instytucje finansowe coraz częściej wymagają raportowania ESG, a zielone finansowanie (taksonomia UE) stawia konkretne kryteria techniczne.

Dobra dokumentacja w zakresie zrównoważonego rozwoju:

- Potwierdza zgodność z przepisami na etapie pozwolenia na budowę
- Stanowi podstawę do sporządzenia świadectwa charakterystyki energetycznej
- Spełnia wymagania inwestorów i instytucji finansowych w zakresie ESG
- Umożliwia rzetelną ocenę budynku po oddaniu do użytkowania
- Ułatwia planowanie przyszłych modernizacji i [konserwacji](/pl/eksploatacja/konserwacja)

::: tip
Dokumentację zrównoważonego rozwoju rozpocznij na [etapie koncepcji](/pl/fazy/koncepcja). Wczesne decyzje dotyczące orientacji budynku, bryły i przegród mają największy wpływ na efektywność energetyczną — a ich zmiana w późniejszych fazach jest kosztowna.
:::

## Kontekst regulacyjny

### Unia Europejska

| Regulacja | Zakres | Główne wymaganie |
|---|---|---|
| EPBD (Dyrektywa o efektywności energetycznej budynków) | Wszystkie państwa UE | Standard nZEB; od 2030 r. budynki zeroemisyjne (ZEB) |
| Taksonomia UE | Projekty ubiegające się o zielone finansowanie | Kryteria techniczne łagodzenia zmian klimatu |
| Dyrektywa EED | Budynki publiczne, duże obiekty komercyjne | Strategie renowacji, audyty energetyczne |
| Rozporządzenie CPR | Materiały budowlane | Deklaracje środowiskowe produktów (EPD) |

### Polska

- **[Warunki Techniczne (WT 2021)](/pl/przepisy/wt-2021)** — graniczne wartości U, dopuszczalne EP, wymagania dotyczące oświetlenia dziennego, wentylacji i akustyki.
- **Ustawa o charakterystyce energetycznej budynków** — zasady sporządzania świadectw energetycznych.
- **Prawo wodne** — obowiązki w zakresie retencji wód opadowych i odprowadzania ścieków.
- **Ustawa o efektywności energetycznej** — wymogi dla sektora publicznego i dużych przedsiębiorstw.

::: info
Nowelizacja EPBD wprowadza standard budynków zeroemisyjnych (ZEB) — od 2028 r. dla budynków publicznych, od 2030 r. dla wszystkich nowych budynków. Warto już teraz dokumentować ścieżkę dojścia do zgodności.
:::

## Integracja ze standardem dokumentacji

Dane środowiskowe zapisujesz w metadanych YAML (frontmatter) każdej karty. Dzięki temu cele i parametry zrównoważoności są czytelne maszynowo, spójne między fazami i mogą być automatycznie walidowane przez [bramki fazowe](/pl/jakosc/bramki-fazowe).

```yaml
zrownowazonosc:
  energia:
    ep_cel: 55            # kWh/m²·rok — cel projektowy
    ep_max_wt: 70          # kWh/m²·rok — limit WT 2021
  przegrody:
    sciana_u: 0.18         # W/m²·K
    dach_u: 0.12           # W/m²·K
  woda:
    retencja_m3: 25        # m³ — pojemność retencji
    armatura: "wodooszczędna"
  ieq:
    wentylacja: "nawiewno-wywiewna z odzyskiem ciepła"
    akustyka_klasa: "II"
```

Parametry zrównoważoności pojawiają się w różnych typach kart w standardzie:

| Typ karty | Dane środowiskowe | Przykład |
|---|---|---|
| Budynek | Wskaźnik EP, klasa energetyczna, cel węglowy (LCA) | EP = 55 kWh/m²·rok |
| Kondygnacja | Bilans energetyczny piętra, strefy termiczne | Strefa ogrzewana / nieogrzewana |
| Pomieszczenie | Oświetlenie dzienne, wentylacja, akustyka, komfort cieplny | DF = 2,0%, 30 m³/h na osobę |
| Strefa | Strefowanie termiczne, akustyczne, wentylacyjne | Strefa HVAC „Północ" |
| Instalacja | Sprawność, źródło energii, OZE | Pompa ciepła COP 4,2 |
| Urządzenie | Klasa energetyczna, moc, zużycie wody | Bateria 5 l/min |
| Wymaganie | Powiązanie z normami i przepisami (WT 2021, PN-EN) | U_max = 0,20 W/m²·K |

## Trzy obszary tematyczne

### 1. [Energia i ślad węglowy](./energia-karbon)

Wskaźnik EP, wymagania dotyczące współczynnika U, świadectwa energetyczne, węgiel zawarty w materiałach, analiza cyklu życia (LCA), budynki nZEB.

**Kluczowe pytanie:** Ile energii zużyje ten budynek i jaki ślad węglowy mają zastosowane materiały?

### 2. [Jakość środowiska wewnętrznego](./jakosc-wnetrz)

Dostęp do światła dziennego, wymiana powietrza, komfort cieplny i akustyka — w odniesieniu do wymagań [WT 2021](/pl/przepisy/wt-2021).

**Kluczowe pytanie:** Czy użytkownicy będą mieli zapewniony komfort, zdrowe warunki i odpowiednie środowisko pracy?

### 3. [Gospodarka wodna](./woda)

Retencja wód opadowych, powierzchnie przepuszczalne, zielona infrastruktura, armatura wodooszczędna, odzysk wody szarej.

**Kluczowe pytanie:** Jak projekt zarządza wodą opadową i ogranicza zużycie wody pitnej?

## Zagadnienia zrównoważoności wg fazy projektu

| Faza | Działania | Wynik dokumentacyjny |
|---|---|---|
| [Koncepcja](/pl/fazy/koncepcja) | Analiza terenu i orientacji, warianty bryły, wstępne cele energetyczne, strategia wodna | Założenia zrównoważoności w karcie Budynku, wstępny szacunek EP |
| [Projekt wstępny](/pl/fazy/wstepny) | Dobór przegród, wstępny model energetyczny, koncepcja wentylacji | Uzupełnione karty Stref, wstępne bilanse |
| [Projekt budowlany](/pl/fazy/budowlany) | Specyfikacja przegród i instalacji, symulacja oświetlenia, obliczenia retencji | Model energetyczny, karty Instalacji z danymi środowiskowymi |
| [Projekt wykonawczy](/pl/fazy/wykonawczy) | Analiza mostków termicznych, specyfikacja szczelności, detale akustyczne | Kompletne karty Pomieszczeń z parametrami IEQ |
| [Przekazanie](/pl/fazy/przekazanie) | Weryfikacja as-built, świadectwo energetyczne, instrukcje eksploatacji | Dokumentacja powykonawcza, plan monitoringu |

::: warning
Dane o zrównoważonym rozwoju w modelu [BIM](/pl/integracja-bim/) muszą być spójne z wartościami w dokumentacji regulacyjnej. Ustal jeden obieg informacji, aby uniknąć rozbieżności między modelem a wnioskiem o świadectwo energetyczne. Dane z [czujników IoT](/pl/integracja-bim/czujniki-iot) mogą później weryfikować założenia projektowe.
:::

## Szybki przegląd: kluczowe wartości graniczne (WT 2021)

| Parametr | Budynek mieszkalny | Biurowiec | Budynek oświatowy |
|---|---|---|---|
| Wskaźnik EP (kWh/m²·rok) | 70 | 65 | 80 |
| Ściana zewnętrzna U (W/m²·K) | 0,20 | 0,20 | 0,20 |
| Dach U (W/m²·K) | 0,15 | 0,15 | 0,15 |
| Okno U (W/m²·K) | 0,90 | 0,90 | 0,90 |
| Światło dzienne — stosunek okien do podłogi | 1:8 | 1:8 | 1:8 |

::: tip
Powyższe wartości to wymagania minimalne. Wielu inwestorów oraz systemy certyfikacji (BREEAM, LEED, HQE) wymaga wartości o 20–40% lepszych od minimów regulacyjnych. Projektowanie na granicy przepisów nie pozostawia marginesu na tolerancje wykonawcze.
:::

## Lista kontrolna — kompletność dokumentacji zrównoważoności

- [ ] Określone cele energetyczne (wskaźnik EP) w karcie Budynku
- [ ] Współczynniki U określone dla wszystkich przegród
- [ ] Przygotowany wniosek o świadectwo charakterystyki energetycznej
- [ ] Analiza nasłonecznienia dla pomieszczeń na pobyt ludzi
- [ ] Strategia wentylacji z wydajnościami w kartach Pomieszczeń
- [ ] Wymagania akustyczne przypisane do poszczególnych Stref
- [ ] Strategia retencji wód opadowych w karcie Instalacji
- [ ] Armatura wodooszczędna dobrana i udokumentowana
- [ ] Dobór materiałów z danymi środowiskowymi (EPD)
- [ ] Plan monitoringu pouzytkowniczego na [etapie eksploatacji](/pl/eksploatacja/)
