# Zielony Taras — przewodnik

Kompletny, prawdziwy Semantyczny Model Budynku: **Zielony Taras**,
6-kondygnacyjny budynek mieszkalny z 18 lokalami w Warszawie. Zamiast
listy ~50 plików, ta strona **prowadzi przez jedną sypialnię**, byś
zobaczył, jak elementy się łączą — i kończy na raporcie, który kompilator
z nich generuje.

**Budynek:** [`BLD-01`](/pl/przyklady/zielony-taras/budynek) ·
1 800 m² · 6 kondygnacji (`LVL-00`–`LVL-05`) · 18 lokali · kategoria
ZL IV (WT 2021) · kompilowane `--country PL`.

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

## Co pokazuje ten przykład

- **Dziedziczenie typ/instancja** — małe pliki instancji, wspólna prawda w typach
- **Wielokondygnacyjny budynek** z sumowaniem kosztów do budżetu projektu
- **Nakładające się strefy** (pożar / HVAC / akustyka) bez powielania geometrii
- **Zgodność sterowana jurysdykcją** — wymagania WT 2021 stosowane automatycznie
- **Jedno źródło, wiele wyjść** — mapowanie BIM, rejestr zasobów, zgodność i raport HTML

Nowy temat? Zacznij od [Czym jest SBM?](/pl/standardy/wprowadzenie) lub
[5-minutowego szybkiego startu](/pl/standardy/szybki-start).
