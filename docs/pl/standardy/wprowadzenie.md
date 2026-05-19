# Czym jest Semantyczny Model Budynku?

**Semantyczny Model Budynku (SBM) to standard dokumentacji projektów budowlanych.** Opisujesz każde pomieszczenie, strefę, instalację i urządzenie w prostych plikach tekstowych. Te same pliki służą architektom, inżynierom, wykonawcom, inspektorom i zarządcom budynków.

Bez specjalnego oprogramowania. Bez bazy danych. Tylko foldery i pliki tekstowe.

---

## Cała Idea w 30 Sekund

Oto cały koncept:

1. **Jeden plik na element** — każde pomieszczenie ma swój plik, każda strefa pożarowa ma plik, każdy kocioł ma plik
2. **Dwie części w jednym pliku** — dane strukturalne na górze (dla komputerów), opis dla ludzi poniżej (dla Ciebie)
3. **Pliki odwołują się do siebie** — Sypialnia 01 mówi, że należy do Strefy Pożarowej ZL-IV. System zna to powiązanie.
4. **Kompilator sprawdza wszystko** — brakujące odniesienia, niekompletne dane, zgodność z przepisami. Łapie błędy zanim trafią na budowę.
5. **Automatyczne raporty** — parametry BIM, raporty zgodności, rejestry wyposażenia, zestawienia pomieszczeń. Generowane z Twoich plików. Bez przepisywania danych.

To tyle. Reszta to szczegóły.

---

## Dla Kogo To Jest?

SBM jest stworzony dla każdego, kto ma do czynienia z dokumentacją budowlaną:

| Rola | Co daje Ci SBM |
|------|----------------|
| **Architekci** | Jedno miejsce na specyfikacje pomieszczeń, wykończenia, status zgodności. Koniec z rozrzuconymi Word/Excel/AutoCAD. |
| **Inżynierowie konstrukcji** | Jasne dane budynku i kondygnacji, pakiety budowlane z harmonogramem. |
| **Inżynierowie instalacji** | Dokumentacja systemów i urządzeń powiązana z pomieszczeniami, które obsługują. |
| **Wykonawcy** | Jeden plik na pomieszczenie ze wszystkim: wymiary, wykończenia, wyposażenie, strefa pożarowa. Bez szukania w e-mailach. |
| **Inspektorzy** | Automatyczne raporty zgodności z WT 2021, Prawem Budowlanym i innymi przepisami. |
| **Zarządcy budynków** | Rejestry wyposażenia, harmonogramy konserwacji, numery seryjne — z tych samych plików, które powstały podczas projektowania. |

Nie musisz umieć programować. Jeśli potrafisz edytować plik tekstowy i zapisać go w folderze, poradzisz sobie z SBM.

---

## Dlaczego To Powstało

Jeśli pracowałeś przy projekcie budowlanym, znasz te problemy:

- **Dane pomieszczenia żyją w 5 miejscach** — AutoCAD, Excel, Word, e-maile, foldery odbiorowe. Zmienisz jedno, zapomnisz o reszcie.
- **Dokumenty sobie przeczą** — rysunki mówią 2,70m, specyfikacja 2,80m, nikt nie wie co jest prawdą.
- **Zgodność odkrywa się, a nie planuje** — trzy tygodnie przed złożeniem pozwolenia ktoś odkrywa, że strefy pożarowe nie zostały udokumentowane.
- **Te same dane wpisujesz w kółko** — powierzchnię do AutoCAD, potem do Excel, potem do Word, potem e-mailem do instalatora, a potem wykonawca pyta jeszcze raz.
- **Po odbiorze informacje znikają** — dwa lata później zarządca dzwoni z pytaniem o numer seryjny kotła. Powodzenia w szukaniu.

SBM rozwiązuje to, umieszczając wszystkie informacje w jednym miejscu, w jednym formacie, który każdy może przeczytać.

---

## Jak Wygląda Plik

Każdy plik SBM ma dwie części. Oto sypialnia:

```markdown
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
requirements: ["REQ-HEIGHT-MIN-250"]
---

# Sypialnia 01

Standardowa sypialnia, okno od strony północnej, strefa pożarowa ZL-IV.
Wysokość 2,70m spełnia minimum WT 2021 (2,50m).

Wykończenia: podłoga dębowa, ściany malowane, sufit akustyczny.
```

**Górna sekcja** (między znacznikami `---`): dane strukturalne, które czytają komputery. Powierzchnia, wysokość, przypisanie do strefy — zawsze w tych samych polach, więc oprogramowanie może je niezawodnie znaleźć.

**Dolna sekcja**: normalny tekst, który czytają ludzie. Intencja projektowa, kontekst, uwagi — rzeczy, których same liczby nie opowiedzą.

**Jeden plik. Dwie grupy odbiorców. Zero duplikowania.**

---

## Co Obejmuje Standard

SBM definiuje **19 typów informacji o budynku** — gotowe szablony, które mówią Ci co dokumentować i jak:

| Kategoria | Typy encji |
|-----------|------------|
| **Struktura fizyczna** | Działka, Budynek, Kondygnacja, Przegroda, Otwór, Komunikacja Pionowa |
| **Pomieszczenia i strefy** | Przestrzeń, Strefa (pożarowa, akustyczna, HVAC itp.) |
| **Instalacje budynkowe** | System (HVAC, elektryka, hydraulika), Zasób (konkretne zainstalowane urządzenie) |
| **Szablony** | Typ Przestrzeni, Typ Strefy, Typ Systemu, Typ Zasobu, Typ Otworu, Typ Elementu Terenu |
| **Teren i budowa** | Element Terenu, Pakiet Budowlany |
| **Zgodność** | Wymaganie (powiązane z konkretnymi przepisami) |

Każdy typ ma szablon. Kopiujesz go, wpisujesz swoje dane, zapisujesz plik. Struktura jest już gotowa — wypełniasz pola, jak w formularzu.

---

## Jak Poruszać Się Po Tej Stronie

W zależności od tego, na czym Ci zależy, wybierz ścieżkę:

### "Chcę po prostu zrozumieć ogólny obraz"

Przeczytaj [Jak to wszystko działa](/pl/standardy/jak-to-dziala) — 10-minutowy przegląd trzech filarów: **Fazy** (kiedy piszesz), **Typy dokumentów** (co opisujesz) i **Integracja BIM** (jak to łączy się z modelem).

### "Chcę to od razu wypróbować"

Przejdź [Szybki Start](/pl/standardy/szybki-start) — stwórz swój pierwszy plik pomieszczenia w 5 minut. Bez instalacji, wystarczy edytor tekstu.

### "Chcę zobaczyć jak wygląda prawdziwy projekt"

Przeglądaj [Przykład Zielony Taras](/pl/przyklady/zielony-taras/) — kompletny budynek mieszkalny z 69 udokumentowanymi encjami: pomieszczenia, strefy pożarowe, systemy HVAC, wyposażenie, pakiety budowlane i więcej.

### "Chcę zacząć używać tego w moim projekcie"

Przeczytaj [Rozpoczynanie nowego projektu](/pl/przewodniki/nowy-projekt) — instrukcja krok po kroku jak ustawić SBM na prawdziwym projekcie, od struktury folderów po pierwszą kompilację.

---

## Kluczowe Koncepty w Pigułce

Trzy idee organizują cały standard:

**1. Fazy mówią Ci KIEDY** — 8 faz projektu od rozpoczęcia po przekazanie. Każda faza ma listę kontrolną tego, co powinno być udokumentowane. Zawsze wiesz, czego się oczekuje. [Zobacz wszystkie 8 faz](/pl/standardy/struktura-dokumentu)

**2. Typy encji mówią Ci CO** — 19 szablonów na pomieszczenia, strefy, instalacje, wyposażenie i więcej. Każdy szablon ma tę samą strukturę, więc informacje są zawsze łatwe do znalezienia. [Zobacz wszystkie typy encji](/pl/dokumentacja/encje/)

**3. Integracja BIM mówi Ci JAK** — Twoje pliki tekstowe mapują się na właściwości IFC. Eksport do Revit, import z ArchiCAD. Dokumentacja i model opowiadają tę samą historię. [Zobacz integrację BIM](/pl/integracja-bim/)

---

## Gotowy?

| Czas | Krok |
|------|------|
| **3 min** | Właśnie przeczytałeś tę stronę. Wiesz czym jest SBM. |
| **5 min** | [Stwórz swój pierwszy plik pomieszczenia](/pl/standardy/szybki-start) |
| **10 min** | [Zrozum pełny obraz](/pl/standardy/jak-to-dziala) |
| **20 min** | [Przejdź przez prawdziwy budynek](/pl/przyklady/zielony-taras/) |
| **1 godz** | Udokumentuj mały budynek z własnej praktyki |

Zacznij od tego, co Ci najbardziej odpowiada. Standard rośnie razem z Twoim projektem — nie musisz uczyć się wszystkiego pierwszego dnia.
