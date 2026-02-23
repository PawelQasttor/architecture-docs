---
layout: home

hero:
  name: "Dokumentuj 10x Szybciej"
  text: "Przestań Tracić Informacje Między AutoCAD, Excel i E-mailami"
  tagline: Jeden plik na pomieszczenie. Jeden plik na strefę pożarową. Pliki tekstowe, które automatycznie się nie rozjeżdżają. Bez specjalnego oprogramowania.
  actions:
    - theme: brand
      text: Szybki Start (5 min)
      link: /pl/standardy/szybki-start
    - theme: alt
      text: Zobacz Prawdziwy Przykład
      link: /pl/przyklady/zielony-taras/
    - theme: alt
      text: English
      link: /

features:
  - icon: ⚡
    title: 10x Szybsza Dokumentacja
    details: "To, co zajmowało 5 dni, teraz zajmuje 5 minut. Raport zgodności pożarowej? Automatyczny. Rejestr wyposażenia? Automatyczny. Zestawienie pomieszczeń? Automatyczne."
  - icon: ✅
    title: Jeden Plik. Jedna Prawda.
    details: Każde pomieszczenie w jednym pliku tekstowym. Powierzchnia, wysokość, wykończenia, wyposażenie, zgodność—wszystko w jednym miejscu. Zmienisz raz, poprawne wszędzie.
  - icon: 😤
    title: Koniec z Rozjeżdżającymi Się Danymi
    details: "Rysunki mówią 2,70m, specyfikacja 2,80m, Excel 2,75m. Która wartość jest poprawna? Z tym standardem: niemożliwy problem. Jeden plik = jedna wartość."
  - icon: 📧
    title: Odpowiadasz Raz, Nie Pięć Razy
    details: "Wykonawca pyta o wykończenia. Zamiast szukać w AutoCAD, Excel, Word—wysyłasz jeden plik. Wszystko, czego potrzebuje, w jednym miejscu."
  - icon: 📝
    title: Działa z Narzędziami, Które Już Masz
    details: Bez specjalnego oprogramowania. Edytujesz w Notatniku, przechowujesz w Google Drive. Przyszłościowy czysty tekst. Bez uzależnienia od dostawcy.
  - icon: 🤝
    title: Czytają Ludzie I Komputery
    details: Ten sam plik służy architektom (czytelny dokument), Revit (parametry BIM), inspektorom (raporty zgodności), zarządcom (harmonogramy konserwacji).
---

## Problem, Który Już Znasz

Jeśli pracowałeś przy projekcie budowlanym, znasz tę frustrację:

**Informacje rozsiane wszędzie:**
- Geometria pomieszczeń w AutoCAD
- Zestawienie pomieszczeń w Excel
- Odporności ogniowe w dokumencie Word
- Specyfikacje wyposażenia w e-mailach, których nie możesz znaleźć
- Instrukcje konserwacji w ??? (powodzenia w ich odnalezieniu po 2 latach)

**Wszystko się rozjeżdża:**
- Rysunki pokazują jedną wysokość pomieszczenia
- Specyfikacja mówi co innego
- Excel ma trzecią wartość
- Nikt nie wie, która jest poprawna

**Wpisujesz te same dane pięć razy:**
- Wpisujesz powierzchnię do AutoCAD
- Kopiujesz do Excel
- Wklejasz do Word
- Wysyłasz e-mailem do inżyniera instalacji
- A potem wykonawca pyta jeszcze raz

**Zgodność z przepisami to zagadka:**
- 3 tygodnie przed złożeniem pozwolenia na budowę
- Odkrywasz, że nikt nie udokumentował, które pomieszczenia są w której strefie pożarowej
- Panika

**Brzmi znajomo? Ten standard to naprawia.**

---

## Co To Zmienia

Wyobraź sobie, że każde pomieszczenie, każda strefa pożarowa, każde urządzenie żyje w **jednym prostym pliku tekstowym**:

**✅ Możesz edytować w Notatniku** — Bez licencji AutoCAD, bez subskrypcji Revit, bez specjalnego oprogramowania

**✅ Przechowywane w Google Drive lub Dropbox** — Tylko foldery i pliki, dokładnie tak jak już pracujesz

**✅ Ludzie mogą to czytać** — Wygląda jak dokument z tabelami i opisami

**✅ Komputery mogą to czytać** — Ten sam plik generuje parametry BIM, raporty zgodności, rejestry wyposażenia

**✅ Automatycznie spójne** — Jeśli Sypialnia 01 mówi, że jest w Strefie Pożarowej ZL-IV, a ta strefa nie istnieje, system Ci o tym powie

**✅ Rośnie z projektem** — Zacznij od wstępnego zestawienia pomieszczeń w fazie koncepcji, dodawaj szczegóły w trakcie, skończ z kompletną dokumentacją powykonawczą

**Jeden plik. Jedna prawda. Zero problemów z synchronizacją.**

---

## Przed i Po: Prawdziwy Przykład

### Stary Sposób (To, Co Pewnie Robisz Teraz)

**Dokumentowanie Sypialni 01 wymaga:**

1. **Rysunek AutoCAD** — geometria, wymiary, numer pomieszczenia "1.01"
2. **Zestawienie Excel** — powierzchnia, wysokość, wykończenia (osobny plik, może być nieaktualne)
3. **Specyfikacja Word** — odporność ogniowa, wymagania akustyczne (osobny plik, może się nie zgadzać z Excel)
4. **E-mail do instalacji** — "Sypialnia 01 potrzebuje ogrzewania, zobacz załącznik" (kolejna kopia danych)
5. **Folder odbioru** — instrukcja konserwacji wspomina "sypialnie", ale bez powiązania z konkretnym pomieszczeniem

**Rezultat:** 5 plików z nakładającymi się informacjami. Zmieniasz wysokość pomieszczenia? Aktualizuj 5 plików i miej nadzieję, że niczego nie pominiesz.

### Nowy Sposób (Z Tym Standardem)

**Jeden plik: `spaces/sypialnia-01.md`**

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
Wysokość 2,70m spełnia minimum WT 2021 (2,50m) z marginesem 20cm.

Wykończenia: podłoga dębowa, ściany malowane, sufit akustyczny.
```

**Co robi ten jeden plik:**

- ✅ Zasila AutoCAD/Revit (przez eksport)
- ✅ Generuje zestawienie pomieszczeń automatycznie
- ✅ Pokazuje przypisanie do strefy pożarowej (linkuje do pliku strefy)
- ✅ Inżynier instalacji czyta ten sam plik
- ✅ Zarządca znajduje info o konserwacji z tego pliku

**Jedno źródło. Jedna prawda. Pięć zastosowań.**

---

## Co Zyskujesz: 10x Przyśpieszenie

| Problem, Z Którym Się Mierzysz | Jak To Rozwiązuje | Przyśpieszenie |
|--------------------------------|-------------------|----------------|
| **"Które pomieszczenia potrzebują drzwi p.poż?"** | Przeszukaj pliki po `ZONE-FIRE-ZL-IV`. Zajmuje 2 sekundy. | **30 min → 2 sek** (900x szybciej) |
| **"Wygeneruj raport zgodności pożarowej"** | System czyta strefy, sprawdza pomieszczenia, generuje raport. | **5 dni → 5 minut** (1440x szybciej) |
| **"Stwórz rejestr wyposażenia"** | Wszystkie urządzenia już w plikach. Przycisk eksport. Gotowe. | **2 tygodnie → 30 sek** (40320x szybciej) |
| **"Zaktualizuj zestawienie po zmianie projektu"** | Zmień plik pomieszczenia. Zestawienie regeneruje się automatycznie. | **3 godz → 30 sek** (360x szybciej) |
| **"Wykonawca pyta o wykończenia"** | Wyślij `sypialnia-01.md`. Jeden plik ze wszystkim. Bez szukania. | **5 e-maili → 1 plik** |
| **"Konflikt spec vs rysunki"** | Niemożliwe. Jeden plik = jedna wartość. Eksport do BIM, PDF—ta sama liczba. | **Zero konfliktów** |

**Średnie oszczędności:** Architekci raportują **10x szybszą dokumentację** i **20-40% mniej czasu** na koordynację w projekcie.

**W typowym projekcie:**
- Raport zgodności pożarowej: 5 dni → 5 minut
- Rejestr wyposażenia: 2 tygodnie → 30 sekund
- Dokumentacja powykonawcza: 2 tygodnie → już gotowa (pliki aktualizowane podczas budowy)

---

## Pomyśl o Tym Jak...

| Już To Znasz | Jak To Się Ma |
|--------------|---------------|
| **Warstwy AutoCAD** | Tak jak warstwy organizują geometrię, to organizuje informacje. Pomieszczenia w jednym folderze, strefy pożarowe w drugim, wyposażenie w trzecim. |
| **Arkusz Excel** | Każde pomieszczenie mogłoby być wierszem w Excel. Tu każde pomieszczenie to osobny plik. Edytujesz jeden bez otwierania ogromnego arkusza. |
| **Dokumenty Google** | Piszesz tekst, który czytają ludzie. Ale komputer może też automatycznie wyciągnąć dane strukturalne (powierzchnia, wysokość, strefa). |
| **Foldery na komputerze** | To dokładnie to. Folder `spaces/`, folder `zones/`, wypełnione plikami `.md`. Bez bazy danych, bez usługi w chmurze. |

---

## Jak To Działa (Prosta Wersja)

Każdy dokument budowlany to **plik tekstowy** z dwoma częściami:

### Część 1: Tabela Danych (Góra Pliku)

Pomyśl o tym jak o wypełnianiu formularza:

```yaml
---
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
---
```

**Kto to czyta:** Komputery (żeby generować raporty), Ty (żeby szybko sprawdzić wartości)

### Część 2: Opis dla Ludzi (Reszta Pliku)

Normalny tekst, jak w dokumencie Word:

```markdown
# Sypialnia 01

Standardowa sypialnia z oknem od północy.
Spełnia wszystkie wymagania WT 2021 dla mieszkalnych przestrzeni sypialnych.
```

**Kto to czyta:** Architekci, inżynierowie, wykonawcy, klienci

**Magia:** Jeden plik służy wszystkim. Ludzie czytają opis. Komputery czytają tabelę. Nikt nie przepisuje danych.

---

## Twoja Ścieżka Naprzód

Wybierz ścieżkę w zależności od tego, ile masz czasu:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🚀 Chcę To Wypróbować
**5 minut**

Stwórz swój pierwszy plik pomieszczenia i zobacz jak to działa.

[→ Szybki Start](/pl/standardy/szybki-start)

</div>

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🧭 Chcę To Zrozumieć
**10 minut**

Zobacz pełny obraz: fazy, typy dokumentów, integracja BIM.

[→ Jak To Wszystko Działa](/pl/standardy/jak-to-dziala)

</div>

<div style="border: 2px solid #3eaf7c; border-radius: 8px; padding: 20px;">

### 🏢 Chcę Zobaczyć Prawdziwy Przykład
**20 minut**

Przejdź przez kompletny budynek: projekt mieszkalny Zielony Taras.

[→ Przykład Zielony Taras](/pl/przyklady/zielony-taras/)

</div>

</div>

---

## Często Zadawane Pytania

**"Czy muszę umieć programować?"**
Nie. Jeśli potrafisz edytować plik tekstowy i zapisać go w folderze, poradzisz sobie.

**"Czy potrzebuję specjalnego oprogramowania?"**
Nie. Działa z Notatnikiem, VS Code lub dowolnym edytorem tekstu. Przechowywane w zwykłych folderach.

**"A co z moim obecnym workflow AutoCAD/Revit?"**
Nadal używaj ich do rysunków. Używaj tego do strukturalnej dokumentacji. Współpracują ze sobą (eksportuj dane do BIM gdy będziesz gotowy).

**"Czy to zastępuje BIM?"**
Nie. To jest **dokumentacja**, która działa **z** BIM. Pomyśl o tym jak o strukturalnych specyfikacjach, które synchronizują się z Twoim modelem.

**"Co jeśli popełnię błąd?"**
Pliki tekstowe są wyrozumiałe. Zapisz kopię zapasową, spróbuj czegoś. Jeśli się zepsuje, narzędzie walidacji powie Ci dokładnie co jest nie tak.

**"Czy muszę nauczyć się wszystkiego naraz?"**
Nie. Zacznij od dokumentowania pomieszczeń. Dodaj strefy pożarowe gdy ich potrzebujesz. Dodaj instalacje gdy inżynier zapyta. Rośnie z Twoim projektem.

**"Jak długo trwa nauka?"**
5 minut na stworzenie pierwszego pliku. 1 godzina na udokumentowanie małego budynku. Jeden projekt żeby poczuć się komfortowo.

---

## Co Jest W Środku

Gdy będziesz gotowy zagłębić się bardziej:

| Temat | Czego Się Nauczysz |
|-------|-------------------|
| [8 Faz Projektu](/pl/standardy/struktura-dokumentu) | Kiedy tworzyć które dokumenty (od koncepcji do przekazania) |
| [Typy Dokumentów](/pl/dokumentacja/encje/) | 11 typów informacji o budynku (pomieszczenia, strefy, instalacje, wyposażenie) |
| [Integracja BIM](/pl/integracja-bim/) | Jak synchronizować z Revit, ArchiCAD i IFC |
| [Szablony](/pl/szablony/) | Szablony kopiuj-wklej dla każdego typu dokumentu |
| [Polskie Przepisy](/pl/przepisy/) | Wbudowane wsparcie dla WT 2021 i Prawa Budowlanego |
| [Eksport PDF](/pl/przewodniki/eksport-pdf) | Generuj profesjonalne PDF-y na pozwolenie na budowę |

---

**Gotowy zacząć?** [Stwórz swój pierwszy plik pomieszczenia w 5 minut →](/pl/standardy/szybki-start)

**Język:** [English](/) | [Polski](/pl/)
