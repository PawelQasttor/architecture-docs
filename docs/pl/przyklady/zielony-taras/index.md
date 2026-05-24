# Zielony Taras — przewodnik

Kompletny, prawdziwy Semantyczny Model Budynku: **Zielony Taras**,
6-kondygnacyjny budynek mieszkalny z 18 lokalami w Warszawie. Zamiast
listy ~60 plików, ta strona **prowadzi przez jedną sypialnię**, byś
zobaczył, jak elementy się łączą — i kończy na raporcie, który kompilator
z nich generuje.

**Budynek:** [`BLD-01`](/pl/przyklady/zielony-taras/budynek) ·
1 800 m² · 6 kondygnacji (`LVL-00`–`LVL-05`) · 18 lokali · kategoria
ZL IV (WT 2021) · kompilowane `--country PL`.

**Pozycja w cyklu życia:** Zielony Taras znajduje się obecnie w fazie
**`construction_documents`** (dokumentacja wykonawcza, LOD 400) — projekt
zamknięty, przetarg rozstrzygnięty, a przykład niesie artefakty ze wszystkich
wcześniejszych faz oraz pierwsze zgłoszenia z fazy budowy i zaplanowane
testy rozruchowe. Patrz [Przewodnik po cyklu życia](#przewodnik-po-cyklu-zycia) poniżej.

---

## Śledź Sypialnię 01

### 1. Pomieszczenie podaje tylko to, co dla niego specyficzne

Otwórz [**`przestrzenie/sypialnia-01`**](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01).
Deklaruje powierzchnię, budynek/kondygnację i strefy — i niemal nic
więcej. Bez wykończeń, bez wysokości, bez przepisanej listy wymagań. To
jest **dziedziczone**, nie powtarzane.

### 2. ← Dziedziczy z typu i kondygnacji

- [**Typ Przestrzeni `ST-BEDROOM-STANDARD-A`**](/pl/przyklady/zielony-taras/typy-przestrzeni/ST-BEDROOM-STANDARD-A)
  — szablon: standardowe wykończenia, profil użytkowania, zestaw wymagań
  wspólny dla *każdej* standardowej sypialni. Zmień raz — zmienia się
  wszędzie.
- [**Kondygnacja `LVL-01`**](/pl/przyklady/zielony-taras/poziomy/poziom-01)
  — kaskaduje typową wysokość, wykończenia i wymagania na każdą przestrzeń
  piętra.

To wzorzec typ/instancja: plik pomieszczenia pozostaje mały; wspólna
prawda jest w jednym miejscu.

### 3. → Należy do stref

To samo pomieszczenie jest jednocześnie w trzech nakładających się
[strefach](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv):

- [**Strefa pożarowa `ZL-IV`**](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv) — strefa pożarowa / ewakuacja
- [**Strefa HVAC Północ**](/pl/przyklady/zielony-taras/strefy/strefa-hvac-polnoc) — grupowanie wentylacji
- [**Strefa akustyczna Noc**](/pl/przyklady/zielony-taras/strefy/strefa-akustyczna-noc) — nocne kryteria akustyczne

Jedno pomieszczenie, trzy niezależne grupowania — bez powielania geometrii.

### 4. → Musi spełniać wymagania

Wymagania nie są wklejone do pomieszczenia. **Kaskadują** z kondygnacji,
typu przestrzeni i pakietu jurysdykcji Polska (WT 2021), np.
[**czas ewakuacji**](/pl/przyklady/zielony-taras/wymagania/REQ-FIRE-EGRESS-TIME-001)
i [**klasa akustyczna B**](/pl/przyklady/zielony-taras/wymagania/REQ-LEVEL-ACOUSTIC-B).
Kompilator rozstrzyga, które dotyczą sypialni, a które nie.

### 5. → Jej koszt się sumuje

Pomieszczenie niesie koszt; kompilator agreguje przestrzeń → kondygnacja
→ budynek → budżet projektu, więc zmiana jednego pomieszczenia
odzwierciedla się w sumie projektu automatycznie.
([Pustka klatki schodowej](/pl/przyklady/zielony-taras/przestrzenie/pustka-klatki-schodowej)
pokazuje przypadek odwrotny — jawnie zero, koszt ujęty w konstrukcji.)

### 6. → To wszystko staje się raportem

Uruchom `npm run sbm:report`, a cały model — gotowość fazowa, postęp
weryfikacji wymagań, jakość danych i zgodność z WT 2021 — renderuje się
jako jedna strona do druku:

**[→ Zobacz wygenerowany raport](/green-terrace-report.html)**

To jest sedno: pliki tekstowe na wejściu, raport gotowy dla klienta na
wyjściu, bez ponownego wprowadzania danych.

---

## Teraz zwiedzaj resztę

Pełny model jest w menu bocznym. Pogrupowane punkty wejścia:

| Obszar | Zacznij tu |
|--------|-----------|
| Działka i budynek | [`SITE-GREEN-TERRACE`](/pl/przyklady/zielony-taras/dzialka) · [`BLD-01`](/pl/przyklady/zielony-taras/budynek) |
| Przestrzenie | [Sypialnia 01](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01) · [Korytarz](/pl/przyklady/zielony-taras/przestrzenie/korytarz) |
| Strefy i typy | [Pożarowa ZL-IV](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv) · [Typ HVAC](/pl/przyklady/zielony-taras/typy-stref/strefa-hvac-mieszkalna) |
| Systemy i zasoby | [System HVAC](/pl/przyklady/zielony-taras/systemy/sys-hvac-01) · [Pompa ciepła](/pl/przyklady/zielony-taras/zasoby/ai-hp-01) |
| Przegrody i otwory | [Ściana zewnętrzna](/pl/przyklady/zielony-taras/przegroda-sciana-zewnetrzna-typ-a) · [Typ okna](/pl/przyklady/zielony-taras/typy-otworow/okno-internorm-kf410) |
| Pakiety budowlane | [Konstrukcja](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-konstrukcja) · [Instalacje](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-instalacje) |
| Brief i konstrukcja | [Program przestrzeni](/pl/przyklady/zielony-taras/programy-przestrzeni/PROG-BEDROOM-STANDARD) · [System konstrukcyjny](/pl/przyklady/zielony-taras/systemy-konstrukcyjne/STR-GREEN-TERRACE) · [Materiały](/pl/przyklady/zielony-taras/materialy/MT-CONCRETE-C30-37) |
| Ewakuacja i koordynacja | [Droga ewakuacji](/pl/przyklady/zielony-taras/drogi-cyrkulacji/CR-FIRE-EGRESS-L01) · [Aneks do przetargu](/pl/przyklady/zielony-taras/zgloszenia/ISS-BID-001) · [RFI z budowy](/pl/przyklady/zielony-taras/zgloszenia/ISS-RFI-001) |
| Rozruch | [Regulacja MVHR](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-MVHR-001) · [Szczelność powietrzna](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-AIRTIGHTNESS-001) · [Próbna ewakuacja](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-FIRE-DRILL-001) |

## Przewodnik po cyklu życia

Prawdziwy projekt nie żyje w jednej fazie cyklu — gromadzi artefakty
z każdej wcześniejszej fazy, w miarę jak postępuje. Zielony Taras
obecnie jest w fazie **`construction_documents`**. Oto co wniosła każda faza:

| Faza | Co wnosi ta faza | Przykładowa encja |
|---|---|---|
| **`concept`** | Brief klienta — co projekt musi dostarczyć, wyrażone jako mierzalne cele, zanim powstanie geometria | [`PROG-BEDROOM-STANDARD`](/pl/przyklady/zielony-taras/programy-przestrzeni/PROG-BEDROOM-STANDARD) — 27 sypialni standardowych po ~15 m² |
| **`schematic_design`** | Odpowiedź na działkę, masing, strategia konstrukcyjna, strategia pożarowa — zgrubne, ale spójne | Zawarte pośrednio w [`SITE-GREEN-TERRACE`](/pl/przyklady/zielony-taras/dzialka) i [`BLD-01`](/pl/przyklady/zielony-taras/budynek); [symulacja ewakuacji Pathfinder](/pl/przyklady/zielony-taras/wymagania/REQ-FIRE-EGRESS-TIME-001) zaczyna się tutaj |
| **`design_development`** | Szczegółowe typy, dobór konstrukcji, specyfikacje materiałowe, cele energetyczne i akustyczne | [`STR-GREEN-TERRACE`](/pl/przyklady/zielony-taras/systemy-konstrukcyjne/STR-GREEN-TERRACE), [`MT-CONCRETE-C30-37`](/pl/przyklady/zielony-taras/materialy/MT-CONCRETE-C30-37), wszystkie pliki kondygnacji + przestrzeni + systemów |
| **`construction_documents`** | Skoordynowana dokumentacja gotowa do budowy — detale przegród, trasy MEP, drogi ewakuacji, pakiety wykonawcze | [`CR-FIRE-EGRESS-L01`](/pl/przyklady/zielony-taras/drogi-cyrkulacji/CR-FIRE-EGRESS-L01), [`ENV-EW-01`](/pl/przyklady/zielony-taras/przegroda-sciana-zewnetrzna-typ-a), [`CP-STRUCTURE`](/pl/przyklady/zielony-taras/pakiety-budowlane/cp-konstrukcja) i pozostałe CP |
| **`bidding_procurement`** | Wyjaśnienia przetargowe + aneksy wydane w okresie ofertowym | [`ISS-BID-001`](/pl/przyklady/zielony-taras/zgloszenia/ISS-BID-001) — wyjaśnienie kotew szczeliny |
| **`construction`** | RFI, zmiany, karty materiałowe, obserwacje terenowe | [`ISS-RFI-001`](/pl/przyklady/zielony-taras/zgloszenia/ISS-RFI-001) (krawędź stropu), [`ISS-CO-001`](/pl/przyklady/zielony-taras/zgloszenia/ISS-CO-001) (substytucja PIR), zasoby MEP [`AI-HP-01`](/pl/przyklady/zielony-taras/zasoby/ai-hp-01), [`AI-MVHR-01`](/pl/przyklady/zielony-taras/zasoby/ai-mvhr-01) |
| **`commissioning`** | Weryfikowalne wyniki testów: regulacja, szczelność, próbna ewakuacja | [`CT-MVHR-001`](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-MVHR-001), [`CT-AIRTIGHTNESS-001`](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-AIRTIGHTNESS-001), [`CT-FIRE-DRILL-001`](/pl/przyklady/zielony-taras/testy-rozruchowe/CT-FIRE-DRILL-001) — wszystkie zaplanowane |
| **`operation`** | Zapisy konserwacji, dane czujników, problemy operacyjne, retro-commissioning | *Jeszcze nie opracowane — Zielony Taras nie został jeszcze przekazany* |
| **`renovation`** | Przyszłe modernizacje (np. instalacja PV, wymiana MVHR po okresie życia) | *Faza przyszła — do dodania gdy zaplanowana* |
| **`decommissioned`** | Koniec życia: plan rozbiórki, odzysk materiałów, rozliczenie śladu węglowego końca życia | *Faza przyszła — 50+ lat dla tego budynku* |

### Co oznacza w praktyce "obecnie w CD"

- **Budynek, kondygnacje, przestrzenie, systemy i zasoby** noszą `projectPhase: design_development`, ponieważ ich projekt był w znacznym stopniu ukończony pod koniec DD — faza CD dodała koordynację i detale, nie nowe encje.
- **Droga cyrkulacji i przegroda** noszą `projectPhase: construction_documents`, ponieważ stają się spójne dopiero po zamknięciu projektu.
- **Zgłoszenia z fazy budowy** są częściowe — trzy rzeczywiste wpisy z prowadzonej budowy — i będą rosnąć w miarę kontynuacji.
- **Testy rozruchowe** są *zaplanowane* (status `planned`/`scheduled`), nie wykonane. Ich bloki `results.measured` są `null` aż wykonawca i świadkowie je przeprowadzą.

Kompilator traktuje ten zrzut jako uprawnione wejście v2.0 — każda faza,
która powinna mieć encje do CD, je ma, a brama fazowa (patrz
[Fazy cyklu życia](/pl/fazy/)) potwierdza, że projekt jest gotowy do dalszego kroku.

## Co pokazuje ten przykład

- **Dziedziczenie typ/instancja** — małe pliki instancji, wspólna prawda w typach
- **Wielokondygnacyjny budynek** z sumowaniem kosztów do budżetu projektu
- **Nakładające się strefy** (pożar / HVAC / akustyka) bez powielania geometrii
- **Zgodność sterowana jurysdykcją** — wymagania WT 2021 stosowane automatycznie
- **Kontrola brief-do-projektu** — encje Programu Przestrzeni weryfikują ilości i powierzchnie względem briefu klienta
- **Ciągłość cyklu życia** — artefakty od koncepcji do rozruchu żyją razem w jednym modelu możliwym do zapytania
- **Jedno źródło, wiele wyjść** — mapowanie BIM, rejestr zasobów, zgodność i raport HTML

Nowy temat? Zacznij od [Czym jest SBM?](/pl/standardy/wprowadzenie) lub
[5-minutowego szybkiego startu](/pl/standardy/szybki-start).
