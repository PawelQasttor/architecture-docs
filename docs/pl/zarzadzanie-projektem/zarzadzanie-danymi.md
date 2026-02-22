---
title: Zarządzanie danymi
description: Jak przechwytywać, przetwarzać i śledzić surowe dane projektowe z e-maili, PDF-ów, nagrań audio, pomiarów geodezyjnych i innych źródeł do strukturyzowanych encji SBM.
---

# Zarządzanie danymi

Model SBM jest tak wiarygodny, jak dane, które go zasilają. W praktyce dane budowlane nie pojawiają się w postaci uporządkowanego YAML -- przychodzą jako e-maile od klientów, programy funkcjonalno-użytkowe w PDF, nagrania audio z wizyt na budowie, zeskanowane raporty konsultantów i zdjęcia robione telefonem. Bez jasnych zasad przechwytywania, katalogowania i śledzenia tych surowych danych, błędy wkradają się do systemu i nikt nie jest w stanie wskazać, skąd pochodzi dana wartość po sześciu miesiącach.

Ta strona definiuje, jak surowe dane projektowe trafiają do systemu dokumentacji, jak są przetwarzane w encje SBM i jak każdy punkt danych pozostaje identyfikowalny do swojego źródła.

## Typy źródeł danych

| Źródło | Typowy format | Pochodzenie | Główne fazy | Cel w SBM |
|--------|--------------|-------------|-------------|-----------|
| Brief klienta | PDF, Word | Klient / inwestor | Inicjacja | Przestrzenie, Wymagania, Budynek |
| Zestawienie pomieszczeń | Excel, PDF | Klient / architekt | Inicjacja, Koncepcja | Przestrzenie (masowo) |
| Pomiar geodezyjny | DWG, PDF, chmura punktów | Geodeta | Inicjacja, Powykonawcza | Budynek, Kondygnacje, Przestrzenie |
| Spotkanie projektowe | Audio, notatki odręczne | Zespół projektowy | Wszystkie fazy | Wymagania, decyzje projektowe |
| Raport konsultanta | PDF | Konstrukcja / MEP / p.poż. | Schematyczna, Rozwój | Strefy, Systemy, Wymagania |
| Karta katalogowa producenta | PDF | Dostawca / dystrybutor | Rozwój projektu | Typy zasobów, Zasoby |
| Korespondencja e-mail | EML, MSG, druk PDF | Każdy interesariusz | Wszystkie fazy | Wymagania, wnioski o zmiany |
| Zdjęcia / wideo z budowy | JPG, MP4 | Zespół na budowie | Budowa, Powykonawcza | Dowody weryfikacji |
| Dokumenty regulacyjne | PDF | Urząd / organ normalizacyjny | Inicjacja, Schematyczna | Wymagania |
| Model BIM | IFC, RVT, PLN | Zespół BIM | Od fazy schematycznej | Przestrzenie, Strefy (przez bim-sync) |
| LiDAR / skan 3D | LAS, E57, RCP | Zespół geodezyjny | Powykonawcza | Zweryfikowane wymiary |

::: tip
Nie każdy projekt wymaga wszystkich typów źródeł. Dostosuj ten framework do skali projektu. Mały projekt mieszkaniowy może wymagać tylko briefu klienta, e-maili i zdjęć. Projekt szpitalny wykorzysta wszystkie powyższe.
:::

## Standardy zbierania danych według typu źródła

### Dokumenty tekstowe (briefy, raporty, zestawienia)

**Konwencja nazewnictwa:** `{RRRR-MM-DD}_{źródło}_{opis}.{roz}`

Przykłady:
- `2026-01-15_klient_program-funkcjonalny-v2.pdf`
- `2026-02-10_konstrukcja_raport-siatka-slupow.pdf`
- `2026-03-01_mep_obliczenia-obciazen-hvac.xlsx`

**Przechowywanie:** `raw-data/client-briefs/` lub `raw-data/consultant-reports/{dyscyplina}/`

**Lista kontrolna ekstrakcji:**

| Typ dokumentu | Dane do wyodrębnienia | Docelowa encja SBM |
|---------------|----------------------|---------------------|
| Brief klienta | Nazwa projektu, zakres, budżet, harmonogram | Budynek, metadane projektu |
| Zestawienie pomieszczeń | Nazwy pomieszczeń, powierzchnie, wysokości, funkcje | Przestrzenie (jedna karta na pomieszczenie) |
| Program funkcjonalny | Wymagania użytkowe, sąsiedztwa | Przestrzenie, Wymagania |
| Raport konstrukcyjny | Strefy nośne, siatki słupów | Strefy, Wymagania |
| Raport MEP | Strefy HVAC, obciążenia elektryczne, instalacje | Systemy, Strefy |
| Raport p.poż. | Strefy pożarowe, drogi ewakuacyjne, odporność ogniowa | Strefy, Wymagania |

**Atrybucja źródła w YAML:**

```yaml
dataSource:
  type: "document"
  file: "raw-data/client-briefs/2026-01-15_klient_program-funkcjonalny-v2.pdf"
  page: 12
  extractedBy: "Jan Kowalski"
  extractedDate: "2026-01-20"
```

### Nagrania audio (wizje lokalne, spotkania)

**Konwencja nazewnictwa:** `{RRRR-MM-DD}_{typ}_{opis}.{roz}`

Przykłady:
- `2026-03-15_wizja-lokalna_inspekcja-poziom-01.m4a`
- `2026-03-20_spotkanie-projektowe_strefowanie-hvac.m4a`

**Przechowywanie:** `raw-data/meeting-notes/audio/` z transkrypcjami w `raw-data/meeting-notes/transcripts/`

**Wymagania nagrywania:**
- Na początku nagrania podaj datę, godzinę, lokalizację i uczestników
- Podczas rejestracji warunków na budowie podaj ID przestrzeni lub numer pomieszczenia
- Maksymalnie 60 minut na plik -- dłuższe sesje dziel na części

**Przepływ transkrypcji:**
1. Nagraj audio podczas spotkania lub wizji lokalnej
2. Transkrybuj (ręcznie lub z pomocą AI)
3. Zweryfikuj transkrypcję pod kątem dokładności -- oznacz niepewne fragmenty
4. Wyodrębnij dane do dziennika ekstrakcji
5. Utwórz lub zaktualizuj encje SBM z wyodrębnionymi danymi
6. Wskaż plik transkrypcji w YAML encji

**Szablon dziennika ekstrakcji:**

| Znacznik czasu | Mówca | Punkt danych | Pewność | Docelowa encja | Akcja |
|---------------|-------|-------------|---------|----------------|-------|
| 00:12:30 | Architekt | "Sypialnia wymaga minimum 14 m2" | Wysoka | SP-BLD-01-L01-001 | Aktualizuj designArea |
| 00:15:45 | Inż. ppoż. | "Ten korytarz to ZL-IV" | Wysoka | ZONE-FIRE-ZL-IV | Utwórz kartę strefy |
| 00:22:10 | Klient | "Może 3 sypialnie, może 4" | Niska | -- | Zapisz jako otwarte pytanie |

**Atrybucja źródła:**

```yaml
dataSource:
  type: "audio"
  file: "raw-data/meeting-notes/audio/2026-03-15_wizja-lokalna_inspekcja-poziom-01.m4a"
  transcript: "raw-data/meeting-notes/transcripts/2026-03-15_wizja-lokalna_inspekcja-poziom-01.md"
  timestamp: "00:12:30"
  speaker: "Architekt"
  extractedBy: "Anna Nowak"
  extractedDate: "2026-03-16"
```

### Korespondencja e-mail

**Przepływ archiwizacji:**
1. Zapisz e-mail jako PDF lub EML do `raw-data/correspondence/emails/`
2. Nazwa: `{RRRR-MM-DD}_{nazwisko-nadawcy}_{temat-slug}.pdf`
3. Jeśli e-mail zawiera załączniki z danymi projektowymi, zapisz je osobno w odpowiednim podfolderze `raw-data/`

Przykłady:
- `2026-02-05_kowalski_aktualizacja-zestawienia-pomieszczen.pdf`
- `2026-02-05_kowalski_zestawienie-pomieszczen-v3.xlsx` (załącznik, zapisany do `raw-data/client-briefs/`)

**Co wyodrębniać:** Decyzje, zmiany wymagań, dane wymiarowe, potwierdzenia akceptacji, zmiany zakresu.

::: warning
E-maile są z natury nieformalne. Zawsze potwierdzaj ustne lub mailowe ustalenia w formalnym dokumencie (protokół spotkania, wniosek o zmianę) przed aktualizacją encji SBM. Dane pozyskane z e-maili oznaczaj poziomem pewności `stated` lub `estimated` do czasu formalnego potwierdzenia.
:::

**Atrybucja źródła:**

```yaml
dataSource:
  type: "email"
  file: "raw-data/correspondence/emails/2026-02-05_kowalski_aktualizacja-zestawienia-pomieszczen.pdf"
  sender: "Jan Kowalski"
  date: "2026-02-05"
  subject: "Zaktualizowane zestawienie pomieszczeń dla poziomu 01"
  extractedBy: "Anna Nowak"
  extractedDate: "2026-02-06"
```

### Pliki PDF i dokumenty skanowane

**Wymagania OCR:** Dokumenty skanowane muszą przejść OCR przed katalogowaniem. Zapisz wersję OCR obok oryginału skanu. Nazwij wersję OCR z sufiksem `_ocr`.

**Konwencja katalogowania:**
- Karty producenta: `raw-data/manufacturer-specs/{producent}_{produkt}.pdf`
- Regulacje: `raw-data/regulatory/{przepis}_{sekcja}.pdf`
- Konsultant: `raw-data/consultant-reports/{dyscyplina}/{data}_{opis}.pdf`

**Lista kontrolna ekstrakcji według typu:**

| Typ PDF | Kluczowe dane do wyodrębnienia |
|---------|-------------------------------|
| Karta producenta | Numer modelu, wymiary, waga, moc, interwały konserwacji, gwarancja |
| Dokument regulacyjny | Numery sekcji, wartości graniczne, metody weryfikacji, typy pomieszczeń |
| Raport konsultanta | Granice stref, wydajności systemów, wartości obciążeń, status zgodności |
| Rysunek powykonawczy | Zweryfikowane wymiary, specyfikacje materiałów, szczegóły montażu |

### Zdjęcia, wideo i skany obiektów

**Nazewnictwo zdjęć:** `{RRRR-MM-DD}_{budynek}_{kondygnacja}_{przestrzeń}_{seq}.jpg`

Przykłady:
- `2026-06-10_BLD-01_L01_SP-001_01.jpg`
- `2026-06-10_BLD-01_L01_SP-001_02.jpg`
- `2026-06-10_BLD-01_L01_korytarz_01.jpg`

**Minimalne metadane:**
- Data i godzina (osadzone w EXIF lub w nazwie pliku)
- Identyfikator budynku i kondygnacji
- Identyfikator przestrzeni lub strefy
- Imię i nazwisko fotografa (w dzienniku ekstrakcji lub pliku towarzyszącym)

**Skany 360 stopni:** Przechowuj w `raw-data/site-surveys/scans/` z towarzyszącym plikiem JSON lub CSV łączącym pozycje skanów z ID przestrzeni SBM.

### Chmury punktów i dane geodezyjne

**Formaty plików:** LAS, LAZ (skompresowany), E57, RCP (Autodesk Recap)

**Przechowywanie:** `raw-data/site-surveys/point-clouds/`

**Dokumentacja dokładności:** Każdy zbiór danych pomiarowych musi zawierać:
- Użyty sprzęt (model skanera, tachimetr)
- Specyfikację dokładności (np. +/- 2mm na 10m)
- Datę pomiaru i imię/nazwisko geodety
- Układ współrzędnych i datum

**Jak dane geodezyjne zasilają SBM:**
- `designArea` i `designHeight` przestrzeni aktualizowane z wartości pomiarowych
- `lifecycleState` przestrzeni zmieniony z `design` na `operational` lub `as_built`
- Poziom pewności ustawiony na `measured`

## Potok przetwarzania danych

```
Surowe źródła                           Strukturyzowany SBM
(e-maile, PDF, audio, zdjęcia)          (Markdown + YAML)

  1. PRZECHWYCENIE
     Zapisz do folderu raw-data/
     Zastosuj konwencję nazewnictwa
     ↓
  2. EKSTRAKCJA
     Wyodrębnij ustrukturyzowane dane
     Wypełnij dziennik ekstrakcji
     Przypisz poziom pewności
     ↓
  3. TWORZENIE
     Utwórz/zaktualizuj karty SBM
     Dodaj referencję dataSource
     Ustaw poziom pewności
     ↓
  4. WALIDACJA
     Uruchom kompilator (--validate-only)
     Sprawdź wymagane pola
     Zweryfikuj relacje
     ↓
  5. PRZEGLĄD
     Recenzja nowych/zmienionych kart
     Weryfikacja atrybucji źródła
     Podpis bramki QA
     ↓
  6. KOMPILACJA
     Pełna kompilacja → sbm.json
     Generacja produktów wyjściowych
```

::: info
Kroki 1-2 (Przechwycenie i Ekstrakcja) to miejsce, gdzie zarządzanie danymi przynosi wartość. Kroki 3-6 są opisane w [Przewodniku tworzenia](/pl/dokumentacja/tworzenie/), [Kompilatorze](/pl/dokumentacja/kompilator/) i [Procedurach przeglądów](/pl/jakosc/procedury-przegladow).
:::

## Ramowy system jakości danych

| Wymiar | Definicja | Jak weryfikować |
|--------|----------|-----------------|
| **Dokładność** | Dane odpowiadają rzeczywistości fizycznej lub deklarowanej intencji | Porównanie z dokumentami źródłowymi; weryfikacja geodezyjna wymiarów |
| **Kompletność** | Wszystkie wymagane pola są wypełnione | Walidacja kompilatora; listy kontrolne bramek fazowych |
| **Spójność** | Brak sprzeczności między encjami | Kontrole krzyżowe kompilatora; przeglądy koordynacyjne |
| **Aktualność** | Dane odzwierciedlają bieżący stan, nie przestarzałe informacje | Sprawdzenie dat `lastReviewed`; flagowanie danych starszych niż próg fazy |
| **Identyfikowalność** | Źródło udokumentowane dla każdego punktu danych | Weryfikacja obecności pola `dataSource`; audyt ścieżki danych |

### Poziomy pewności

Przypisz poziom pewności do danych na podstawie sposobu ich pozyskania:

| Poziom | Etykieta | Opis | Przykład |
|--------|---------|------|---------|
| 1 | **Pomiar** | Zweryfikowane pomiarem fizycznym lub geodezyjnym | Inwentaryzacja: powierzchnia = 14,32 m2 |
| 2 | **Obliczenie** | Wyznaczone z danych pomiarowych za pomocą znanych wzorów | Kubatura = powierzchnia x wysokość |
| 3 | **Specyfikacja** | Podane w formalnych dokumentach projektowych | Brief klienta: "sypialnia min. 14 m2" |
| 4 | **Szacunek** | Osąd zawodowy, nie udokumentowany formalnie | Estymacja architekta: "około 15 m2" |
| 5 | **Założenie** | Wartość zastępcza oczekująca potwierdzenia | Domyślnie: standardowa sypialnia = 14 m2 |

**W nagłówku YAML:**

```yaml
designArea: 14.5
dataConfidence:
  designArea: "specified"    # Z briefu klienta
  designHeight: "measured"   # Z pomiaru geodezyjnego
  maxOccupants: "assumed"    # Oczekuje na dane od inżyniera ppoż.
```

::: warning
Dane na poziomie pewności 4 (szacunek) lub 5 (założenie) muszą być oznaczone do weryfikacji przed przejściem projektu przez odpowiednią bramkę fazową. Żadne dane na poziomie "założenie" nie powinny pozostać po fazie Dokumentacji Wykonawczej.
:::

## Identyfikowalność danych

Każda encja SBM powinna być identyfikowalna do źródła. Pole `dataSource` w nagłówku YAML łączy encję z surowymi danymi.

**Przykład: Śledzenie wartości powierzchni przestrzeni**

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
dataSource:
  type: "document"
  file: "raw-data/client-briefs/2026-01-15_klient_program-funkcjonalny-v2.pdf"
  page: 12
  extractedBy: "Jan Kowalski"
  extractedDate: "2026-01-20"
dataConfidence:
  designArea: "specified"
---
```

**Ścieżka audytu:** Gdy dane są aktualizowane, poprzednie źródło powinno być zapisane w historii wersji:

```yaml
version: "1.2"
version_history:
  - version: "1.2"
    date: "2026-06-15"
    author: "Anna Nowak"
    note: "Aktualizacja designArea z 14.5 na 14.32 na podstawie inwentaryzacji geodezyjnej"
    dataSource:
      type: "survey"
      file: "raw-data/site-surveys/point-clouds/2026-06-10_BLD-01_L01.las"
  - version: "1.0"
    date: "2026-01-20"
    author: "Jan Kowalski"
    note: "Utworzenie na podstawie programu funkcjonalnego klienta"
```

## Wymagania danych według fazy

| Faza | Główne źródła danych | Kluczowe dane do zebrania | Odpowiedzialny |
|------|----------------------|--------------------------|----------------|
| 1. Inicjacja | Brief klienta, pomiar geodezyjny | Zakres projektu, ograniczenia terenu, program funkcjonalny | Kierownik projektu |
| 2. Koncepcja | Warsztaty projektowe, szkice | Program przestrzenny, kubatury, wstępne powierzchnie | Architekt |
| 3. Schematyczna | Raporty konsultantów, analiza przepisów | Definicje stref, wymagania systemów, referencje regulacyjne | Zespół projektowy |
| 4. Rozwój projektu | Karty producenta, spotkania koordynacyjne | Specyfikacje zasobów, szczegółowy projekt systemów | Liderzy dyscyplin |
| 5. Dokumentacja budowlana | Specyfikacje końcowe, koordynacja | Kompletny SBM ze wszystkimi relacjami | Koordynator BIM |
| 6. Budowa | Zdjęcia z budowy, pomiary polowe, RFI | Weryfikacja postępu, dokumentacja problemów | Kierownik budowy |
| 7. Powykonawcza | Dane geodezyjne, chmury punktów, odbiory | Zweryfikowane wymiary, dane zainstalowanych urządzeń | Geodeta + FM |
| 8. Przekazanie | Instrukcje O&M, świadectwa odbiorów | Rejestr zasobów, harmonogramy konserwacji, gwarancje | Menedżer FM |

## Struktura folderów surowych danych

```
raw-data/
├── client-briefs/                    # Dokumenty dostarczone przez klienta
├── consultant-reports/               # Raporty zewnętrzne
│   ├── structural/                   # Konstrukcja
│   ├── mep/                          # Instalacje
│   ├── fire-safety/                  # Pożarowe
│   └── acoustic/                     # Akustyka
├── meeting-notes/                    # Zapisy ze spotkań
│   ├── audio/                        # Nagrania audio
│   └── transcripts/                  # Transkrypcje tekstowe
├── site-surveys/                     # Pomiary i dane geodezyjne
│   ├── dwg/                          # Rysunki CAD
│   ├── point-clouds/                 # Dane LiDAR / skany 3D
│   ├── photos/                       # Zdjęcia z budowy
│   └── scans/                        # Skany 360 stopni
├── manufacturer-specs/               # Karty katalogowe produktów
├── regulatory/                       # Dokumenty regulacyjne
└── correspondence/                   # Korespondencja projektowa
    └── emails/                       # Zarchiwizowane wątki e-mail
```

::: tip
Utwórz tę strukturę folderów na starcie projektu w Fazie 1 (Inicjacja). Dodaj ją do rejestru [Kontroli dokumentów](./kontrola-dokumentow), aby wszyscy członkowie zespołu wiedzieli, gdzie katalogować napływające dane.
:::

## Lista kontrolna zarządzania danymi

Użyj tej listy kontrolnej na starcie projektu i weryfikuj na każdej bramce fazowej:

- [ ] Struktura folderów surowych danych utworzona i udostępniona zespołowi
- [ ] Konwencje nazewnictwa plików udokumentowane i uzgodnione
- [ ] Atrybucja źródła danych (pole `dataSource`) wymagana we wszystkich encjach SBM
- [ ] Protokół nagrywania audio zdefiniowany (nazewnictwo, przechowywanie, transkrypcja)
- [ ] Przepływ archiwizacji e-maili udokumentowany
- [ ] Standardy nazewnictwa i metadanych zdjęć ustalone
- [ ] Poziomy pewności zdefiniowane i oznaczanie uzgodnione
- [ ] Krok przeglądu jakości danych włączony do [list kontrolnych bramek fazowych](/pl/jakosc/bramki-fazowe)
- [ ] Role przypisane: kto przechwytuje, kto wyodrębnia, kto weryfikuje
- [ ] Polityka kopii zapasowych i retencji surowych danych ustalona

## Powiązane strony

- [Kontrola dokumentów](./kontrola-dokumentow) -- Nazewnictwo plików, wersjonowanie i bramki akceptacji
- [Nadzór i organizacja](./zarzadzanie) -- Macierz RACI definiująca kto przechwytuje i weryfikuje dane
- [Zarządzanie zmianami](./zarzadzanie-zmianami) -- Jak zmiany danych uruchamiają wnioski o zmianę
- [Procedury przeglądów](/pl/jakosc/procedury-przegladow) -- Recenzja obejmuje weryfikację źródeł danych
- [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/) -- Jak tworzyć karty encji SBM z wyodrębnionych danych
- [Kompilator](/pl/dokumentacja/kompilator/) -- Potok walidacji i kompilacji
