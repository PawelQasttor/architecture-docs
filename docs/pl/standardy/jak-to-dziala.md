# Jak to działa

Ten standard pomaga Ci pisać dokumentację budowlaną w plikach Markdown. Ale w przeciwieństwie do pustego dokumentu Word, każdy plik ma jasną strukturę. Ta struktura opiera się na trzech prostych zasadach.

## Trzy filary

- **Fazy** mówią Ci **kiedy** pisać dany dokument
- **Karty obiektów** mówią Ci **co** opisać w każdym dokumencie
- **Integracja BIM** mówi Ci **jak** dokument łączy się z Twoim modelem w Revit lub ArchiCAD

To cała idea. Reszta tej strony wyjaśnia każdy z tych trzech filarów.

---

## Filar 1: Fazy — Kiedy piszesz

Każdy projekt architektoniczny przechodzi przez etapy: brief, koncepcja, projekt budowlany, pozwolenie, budowa, przekazanie. Już tak pracujesz.

Standard formalizuje to w **8 faz**:

| Faza | Co robisz | Co piszesz |
|------|-----------|------------|
| 1. Rozpoczęcie | Spotykasz się z klientem, odwiedzasz działkę | Brief projektowy, notatki z wizji |
| 2. Koncepcja | Szkicujesz bryłę, szukasz kierunku | Opis budynku, wstępny program pomieszczeń |
| 3. Projekt wstępny | Rysujesz rzuty, przekroje, elewacje | Wymiary pomieszczeń, strefy pożarowe i akustyczne |
| 4. Projekt budowlany | Przygotowujesz dokumenty do pozwolenia | Pełne specyfikacje, weryfikacja zgodności |
| 5. Projekt wykonawczy | Opracowujesz szczegóły dla wykonawcy | Specyfikacje wyposażenia, detale montażowe |
| 6. Budowa | Nadzorujesz plac budowy | Zapisy zmian, notatki powykonawcze |
| 7. Powykonawczy | Mierzysz co faktycznie zbudowano | Zweryfikowane wymiary, stan rzeczywisty |
| 8. Przekazanie | Przekazujesz klucze właścicielowi | Instrukcje obsługi, rejestry wyposażenia |

**Dlaczego to ważne:** Każda faza ma listę kontrolną. Wiesz dokładnie, jakie dokumenty powinny istnieć, zanim przejdziesz dalej. Koniec z odkrywaniem brakujących specyfikacji w trakcie budowy.

[Zobacz pełny przepływ 8 faz →](/pl/standardy/struktura-dokumentu)

---

## Filar 2: Karty obiektów — Co opisujesz

Kiedy tworzysz dokument w tym standardzie, opisujesz coś konkretnego: pomieszczenie, strefę pożarową, instalację grzewczą, kocioł. Standard definiuje **11 rodzajów kart** — gotowych szablonów, które mówią Ci co wpisać:

| Karta | Co opisujesz | Przykład |
|-------|-------------|---------|
| **Budynek** | Cały obiekt budowlany | "Zielony Taras, ul. Słoneczna 45, Warszawa" |
| **Kondygnacja** | Jedno piętro | "Parter, +0,00 m" |
| **Pomieszczenie** | Pokój lub obszar funkcjonalny | "Sypialnia 01, 14,5 m², wysokość 2,70 m" |
| **Typ Pomieszczenia** | Szablon dla podobnych pomieszczeń | "Typ standardowej sypialni A" |
| **Strefa** | Grupa pomieszczeń o wspólnej charakterystyce | "Strefa pożarowa ZL-IV, kondygnacje 1-6" |
| **Typ Strefy** | Szablon konfiguracji stref | "Strefa pożarowa ZL-IV standard" |
| **Wymaganie** | Konkretny przepis prawny do spełnienia | "Wysokość pomieszczenia >= 2,50 m wg WT 2021 §132" |
| **Instalacja** | System techniczny budynku | "Ogrzewanie centralne, kocioł gazowy, grzejniki" |
| **Typ Instalacji** | Szablon konfiguracji instalacji | "Klimatyzacja mieszkalna z rekuperacją MVHR" |
| **Urządzenie** | Konkretny zainstalowany produkt | "Vaillant ecoTEC plus 306, nr seryjny #12345" |
| **Typ Urządzenia** | Szablon specyfikacji produktu | "Bosch Compress 7000i 12kW" |

Każda karta to **gotowy szablon do wypełnienia**. Dzięki temu każdy opis sypialni ma tę samą strukturę, każda strefa pożarowa te same pola, a każde urządzenie jest dokumentowane w ten sam sposób.

**Dlaczego to ważne:** Spójna struktura oznacza, że każdy w zespole może szybko znaleźć odporność ogniową dowolnej ściany, powierzchnię dowolnego pomieszczenia albo harmonogram konserwacji dowolnego kotła — bez przeszukiwania 200-stronicowych PDF-ów.

[Zobacz wszystkie rodzaje kart →](/pl/dokumentacja/encje/)
[Skorzystaj z szablonów →](/pl/szablony/)

---

## Filar 3: Integracja BIM — Jak to łączy się z modelem

Twoje pliki Markdown nie są oderwane od modelu BIM. Każda karta mapuje się na właściwości IFC, więc informacje płyną między dokumentacją a Revit/ArchiCAD.

**W praktyce:**

- Eksportujesz plik IFC z Revit → skrypt odczytuje go i aktualizuje Twoje pliki Markdown najnowszą geometrią i właściwościami
- Aktualizujesz specyfikację ściany w Markdown → skrypt generuje aktualizację właściwości IFC, którą importujesz z powrotem do Revit

Standard definiuje też **poziomy LOD** (Level of Development) dla każdej fazy, żeby szczegółowość modelu była zsynchronizowana z dokumentacją:

| Faza | BIM LOD | Co to oznacza |
|------|---------|---------------|
| Koncepcja | LOD 100 | Przybliżona geometria, obiekty zastępcze |
| Projekt wstępny | LOD 200 | Poprawne rozmiary i lokalizacje |
| Projekt budowlany | LOD 300 | Dokładna geometria, przypisane materiały |
| Projekt wykonawczy | LOD 400 | Gotowe do produkcji, konkretne produkty |
| Powykonawczy | LOD 500 | Zweryfikowane z tym, co faktycznie zbudowano |

**Dlaczego to ważne:** Twoja dokumentacja i model BIM mówią to samo. Zmień jedno, zaktualizuj drugie. Koniec z rozbieżnościami między rysunkami a specyfikacjami.

[Dowiedz się o integracji BIM →](/pl/integracja-bim/)
[Zobacz definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Jak trzy filary współdziałają

Oto konkretny przykład. Jesteś w **Fazie 4 (Projekt budowlany)**, przygotowujesz dokumenty do pozwolenia.

Faza mówi Ci: "Wszystkie pomieszczenia muszą mieć zweryfikowaną zgodność z przepisami."

Otwierasz więc **kartę Pomieszczenia** dla Sypialni 01. Szablon mówi, co wypełnić: powierzchnia, wysokość, rozmiar okna, przypisanie strefy pożarowej.

Wpisujesz: wysokość = 2,70 m. **Karta Wymagania** dla WT 2021 §132 mówi, że minimalna wysokość to 2,50 m. Twoja dokumentacja teraz udowadnia zgodność.

**Integracja BIM** mapuje tę wysokość na właściwość IFC (`Pset_SpaceCommon.Height`), więc Revit pokazuje tę samą wartość.

Jedno pomieszczenie. Trzy filary działające razem: faza powiedziała Ci *kiedy*, karta powiedziała *co*, a mapowanie BIM powiedziało *jak* to łączy się z modelem.

---

## Kiedy poszczególne karty pojawiają się w projekcie

Nie wszystko dokumentujesz od pierwszego dnia. Proste rzeczy powstają najpierw, szczegóły przychodzą później:

```
Faza:        1         2         3         4         5         6-8
             Brief     Koncepcja Wstępny   Budowlany Wykonawczy...

Budynek      ●─────────────────────────────────────────────────>
Kondygnacja            ●────────────────────────────────────────>
Pomieszczenie●─────────────────────────────────────────────────>
Strefa                 ●────────────────────────────────────────>
Wymaganie                        ●──────────────────────────────>
Instalacja                                 ●────────────────────>
Urządzenie                                           ●──────────>

BIM LOD:     —         100       200       300       400     500
```

**●** = pierwsza wersja. **→** = uzupełniane w kolejnych fazach.

Karty Budynku i Pomieszczeń zaczynają jako szkice w Fazie 1 i stają się coraz bardziej szczegółowe. Karty Urządzeń pojawiają się dopiero gdy projekt jest na tyle szczegółowy, by specyfikować konkretne produkty.

::: info Ten sam plik rośnie z projektem
Nie tworzysz nowego pliku w każdej fazie. Ten sam plik `sypialnia-01.md` zyskuje więcej szczegółów w miarę postępu projektu — przybliżona powierzchnia staje się dokładnymi wymiarami, puste pola się wypełniają, status zgodności zostaje zweryfikowany.
:::

---

## Kompilator (opcjonalna automatyzacja)

Jeśli chcesz, narzędzie kompilatora może odczytać Twoje pliki Markdown i automatycznie wygenerować:

- **Plik parametrów BIM** — do importu do Revit/ArchiCAD
- **Raport zgodności** — pokazujący które wymagania są spełnione, a które nie
- **Rejestr wyposażenia** — listę wszystkich zainstalowanych produktów i ich lokalizacji
- **Schemat cyfrowego bliźniaka** — do podłączenia z systemem zarządzania budynkiem (BMS)

To jest opcjonalne. Twoje pliki Markdown doskonale działają same jako dokumentacja czytelna dla ludzi. Kompilator tylko dodaje wyniki odczytywalne maszynowo.

---

## Gdzie iść dalej

| Chcę... | Przejdź tutaj |
|---------|---------------|
| Spróbować w praktyce (5 minut) | [Szybki Start](/pl/standardy/szybki-start) |
| Prześledzić pełny przepływ projektu | [Przepływ 8 faz](/pl/standardy/struktura-dokumentu) |
| Zobaczyć prawdziwy przykład budynku | [Projekt Zielony Taras](/pl/przyklady/zielony-taras/) |
| Przejrzeć rodzaje kart | [Dokumentacja kart](/pl/dokumentacja/encje/) |
| Zacząć używać szablonów | [Szablony](/pl/szablony/) |
| Zintegrować z BIM | [Integracja BIM](/pl/integracja-bim/) |
| Sprawdzić polskie przepisy | [Przepisy](/pl/przepisy/) |
| Eksportować do PDF | [Przewodnik eksportu PDF](/pl/przewodniki/eksport-pdf) |

::: tip Nie wiesz od czego zacząć?
Zacznij od [Szybkiego Startu](/pl/standardy/szybki-start). Stworzysz swój pierwszy plik pomieszczenia w 5 minut.
:::
