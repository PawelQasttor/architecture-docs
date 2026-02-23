# Informacje o Budynku w Plikach Tekstowych

## Problem, Który To Rozwiązuje

Kiedy dokumentujesz projekt budowlany, informacje kończą rozrzucone:

- **Wymiary pomieszczeń** → AutoCAD
- **Zestawienie pomieszczeń** → Excel
- **Odporności ogniowe** → Specyfikacja Word
- **Specyfikacje wyposażenia** → Wątki e-mailowe
- **Informacje o konserwacji** → ??? (powodzenia w odnalezieniu ich po 2 latach)

Zmieniasz wysokość pomieszczenia? Aktualizuj 5 różnych plików i miej nadzieję, że niczego nie pominiesz.

**Ten standard to naprawia.** Każde pomieszczenie, każda strefa pożarowa, każde urządzenie ma **jeden plik tekstowy** zawierający wszystko o nim.

::: tip Dla Architektów
Pomyśl o tym w ten sposób: Zamiast rozsiewać informacje o pomieszczeniu między CAD, Excel i Word, masz **jeden plik na pomieszczenie**. Ten plik jest jednocześnie czyteln

ym dokumentem (dla ludzi) i danymi strukturalnymi (dla komputerów).
:::

---

## Czym Jest Semantyczny Model Budynku (SBM)?

**Prosta wersja:** Sposób na organizację informacji o budynku w plikach tekstowych, tak aby zarówno ludzie, jak i komputery mogły je czytać.

**Dłuższa wersja:** Każde pomieszczenie, strefa, instalacja i urządzenie jest opisane w prostym pliku tekstowym z dwiema częściami:

1. **Tabela danych** (u góry) — Łatwa do odczytania przez komputery
2. **Normalny tekst** (poniżej) — Łatwy do odczytania przez ludzi

Ten sam plik służy:
- ✅ Architektom (czytelna dokumentacja)
- ✅ Oprogramowaniu BIM (parametry Revit, właściwości IFC)
- ✅ Inspektorom (raporty zgodności)
- ✅ Zarządcom (harmonogramy konserwacji)

---

## Jak To Działa (Prosta Wersja)

### Krok 1: Piszesz Pliki Tekstowe

Tworzysz jeden plik na pomieszczenie w folderze:

```
moj-projekt/
├── spaces/
│   ├── sypialnia-01.md
│   ├── sypialnia-02.md
│   └── kuchnia-01.md
├── zones/
│   └── strefa-pozarowa-zl-iv.md
└── requirements/
    └── wysokosc-min.md
```

### Krok 2: Każdy Plik Ma Dwie Części

**Część 1: Dane strukturalne** (góra pliku — jak wypełnianie formularza)

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
---
```

**Część 2: Opis dla ludzi** (reszta pliku — jak dokument Word)

```markdown
# Sypialnia 01

Standardowa sypialnia z oknem od strony północnej.
Spełnia minimum WT 2021 (2,50m) z marginesem 20cm.
```

### Krok 3: System Sprawdza Twoją Pracę (Opcjonalne)

Uruchom narzędzie walidacyjne (nazywamy je "kompilatorem", ale nie przejmuj się tą nazwą). Ono:

- ✅ Sprawdza, czy Sypialnia 01 odwołuje się do strefy pożarowej, która faktycznie istnieje
- ✅ Weryfikuje, czy wysokość pomieszczenia spełnia wymaganie (2,70m >= 2,50m minimum)
- ✅ Znajduje zerwane linki zanim staną się problemem

### Krok 4: Otrzymujesz Automatyczne Wyniki

Te same pliki generują:

| Wynik | Co Robi | Zastosowanie |
|-------|---------|--------------|
| **Parametry BIM** | Wypełnia właściwości Revit/ArchiCAD | Koordynacja projektu |
| **Raport zgodności** | Pokazuje, które pomieszczenia przechodzą/nie przechodzą przepisów | Złożenie pozwolenia |
| **Rejestr wyposażenia** | Listuje wszystkie zainstalowane urządzenia z harmonogramami konserwacji | Zarządzanie obiektem |
| **Zestawienia pomieszczeń** | Tabele w stylu Excel wszystkich pomieszczeń | Dokumentacja |

**Jedno źródło. Wiele wyników. Zero przepisywania danych.**

---

## Trzy Warstwy (Do Wiadomości)

Nie martw się o zrozumienie tego diagramu teraz. Pokazuje, jak przepływają informacje:

```
┌─────────────────────────────────────┐
│ Warstwa 1: Twoje Pliki Tekstowe    │  ← Ty je piszesz
│ (Jeden plik na pomieszczenie/strefę)│
└──────────────┬──────────────────────┘
               │ Narzędzie walidacyjne je sprawdza
               ▼
┌─────────────────────────────────────┐
│ Warstwa 2: Model BIM (Revit/ArchiCAD)│ ← Otrzymuje parametry
│ (Geometria + Właściwości)           │    z Twoich plików
└──────────────┬──────────────────────┘
               │ Budynek działa
               ▼
┌─────────────────────────────────────┐
│ Warstwa 3: Żywy Budynek             │  ← Wykorzystuje info
│ (Czujniki + Konserwacja)            │     o wyposażeniu
└─────────────────────────────────────┘
```

**Kluczowa kwestia:** Pracujesz tylko w Warstwie 1 (pliki tekstowe). Warstwy 2 i 3 wykorzystują dane z Twoich plików.

---

## 11 Typów Informacji o Budynku

Standard definiuje **11 typów kart**. Każdy opisuje inny aspekt Twojego budynku:

| Typ | Co Opisujesz | Przykład |
|-----|--------------|----------|
| **Budynek** | Cały budynek | "Zielony Taras, ul. Słoneczna 45, Warszawa" |
| **Kondygnacja** | Piętro | "Parter, +0,00m" |
| **Pomieszczenie** | Pokój | "Sypialnia 01, 14,5m², wysokość 2,70m" |
| **Typ Przestrzeni** | Szablon dla podobnych pomieszczeń | "Standardowy szablon sypialni (użyj dla wszystkich sypialni)" |
| **Strefa** | Grupa pomieszczeń o wspólnej charakterystyce | "Strefa pożarowa ZL-IV, kondygnacje 1-6" |
| **Typ Strefy** | Szablon dla konfiguracji stref | "Standard strefy pożarowej ZL-IV (budynek mieszkalny)" |
| **Instalacja** | System budynku | "Centralne ogrzewanie z kotłem gazowym" |
| **Typ Systemu** | Szablon dla instalacji MEP | "Mieszkalna instalacja HVAC z odzyskiem ciepła" |
| **Urządzenie** | Konkretne wyposażenie | "Kocioł #12345, zainstalowany 2024-03-15" |
| **Typ Zasobu** | Specyfikacja produktu | "Vaillant ecoTEC plus 306 (specyfikacja ogólna)" |
| **Wymaganie** | Przepis do spełnienia | "Wysokość pomieszczenia >= 2,50m wg WT 2021 §132" |

::: tip Szablony vs Konkretne Rzeczy
**Typy** = Szablony (definiuj specyfikacje raz)
**Instancje** = Konkretne rzeczy (odwołują się do szablonu, dodają lokalizację)

Jeśli masz 20 identycznych sypialni, stwórz **1 Typ Przestrzeni** (szablon) i **20 Przestrzeni** (konkretne pomieszczenia).
Zaktualizuj szablon → wszystkie 20 pokoi aktualizuje się automatycznie. **26-33% mniej dokumentacji.**
:::

---

## Kluczowe Zasady

### 1. Przyjazne Pisanie Dla Człowieka

Piszesz w normalnym Markdown z tabelą danych u góry. Jeśli potrafisz edytować plik tekstowy, poradzisz sobie.

**Przykład:** Plik sypialni

```markdown
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Pomieszczenie: Sypialnia 01

Standardowa sypialnia z oknem od północy.
Podłoga: dąb, Ściany: malowane na biało, Sufit: gładki.
```

### 2. Automatyczne Sprawdzanie Spójności

Narzędzie walidacyjne czyta wszystkie Twoje pliki i sprawdza:

- ✅ Czy Sypialnia 01 odwołuje się do strefy pożarowej, która istnieje?
- ✅ Czy 2,70m sufitu spełnia wymaganie 2,50m?
- ✅ Czy są jakieś zerwane linki między plikami?

**Rezultat:** Wychwytuje błędy przed budową, nie podczas inspekcji.

### 3. Działa Na Całym Świecie (Ale Zna Polskie Przepisy)

System automatycznie ładuje przepisy na podstawie lokalizacji projektu:

- **Polska:** WT 2021, Prawo budowlane ładują się automatycznie
- **Inne kraje:** Dodaj pliki dla Niemiec (`/requirements/de/`), Francji (`/requirements/fr/`), itd.
- **Standardy globalne:** EN, ISO, ASHRAE dostępne niezależnie od lokalizacji

---

## Co Otrzymujesz (Wyniki)

### 1. Parametry BIM

**Czym to jest:** Plik danych, który Revit/ArchiCAD może zaimportować

**Zastosowanie:** Zamiast ręcznie wpisywać powierzchnie pomieszczeń do Revit, importuj je z plików tekstowych. Jedno kliknięcie, wszystkie parametry wypełnione.

### 2. Raport Zgodności

**Czym to jest:** Pokazuje, które pomieszczenia przechodzą/nie przechodzą wymagań przepisów

**Przykład:**
```
Sypialnia 01: ✅ PRZESZŁO
- Wysokość: 2,70m (>= 2,50m wymagane przez WT 2021 §132)
- Światło dzienne: 3,2m² okno (spełnia wymaganie)

Sypialnia 02: ❌ NIE PRZESZŁO
- Wysokość: 2,40m (< 2,50m wymagane przez WT 2021 §132)
```

**Zastosowanie:** Dołącz do wniosku o pozwolenie, pokaż inspektorowi podczas zatwierdzenia

### 3. Rejestr Wyposażenia

**Czym to jest:** Lista wszystkich zainstalowanych urządzeń z harmonogramami konserwacji

**Przykład:**
```
Kocioł HP-01 (Vaillant ecoTEC plus 306)
- Lokalizacja: Piwnica, Pomieszczenie 0.01
- Nr seryjny: 12345-67890
- Zainstalowany: 2024-03-15
- Następny serwis: 2025-03-15 (przegląd roczny)
```

**Zastosowanie:** Przekaż zarządcy przy odbiorze budynku. Wie, jakie wyposażenie istnieje, gdzie jest, kiedy je serwisować.

### 4. Schemat Cyfrowego Bliźniaka

**Czym to jest:** Łączy czujniki budynku z pomieszczeniami

**Zastosowanie:** Czujnik temperatury w Sypialni 01 loguje dane. System wie "ten czujnik należy do Sypialni 01" i może sprawdzić, czy temperatura spełnia wymagania.

---

## Kiedy Używasz Tego W Swoim Projekcie

### Faza Projektowa
1. Tworzysz pliki przestrzeni w Markdown (jeden plik na pomieszczenie)
2. Narzędzie walidacyjne sprawdza, czy spełniasz wymagania WT 2021
3. Eksportujesz parametry BIM do Revit
4. Generujesz raport zgodności do złożenia pozwolenia

### Faza Budowy
1. Aktualizujesz pliki pomiarami powykonawczymi
2. Dodajesz pliki wyposażenia, gdy kocioł/HVAC są instalowane
3. Rejestrujesz numery seryjne i daty instalacji
4. Raport zgodności śledzi, co zostało zweryfikowane

### Faza Eksploatacji (Po Odbiorze)
1. Zarządca ma rejestr wyposażenia z harmonogramami konserwacji
2. Czujniki budynku połączone z ID pomieszczeń
3. Zdarzenia konserwacyjne śledzone względem oryginalnych specyfikacji
4. Cykl życia wyposażenia rejestrowany od instalacji do wymiany

---

## Pierwsze Kroki

**Wybierz swoją ścieżkę:**

| Chcę... | Idź tutaj |
|---------|-----------|
| **Zrozumieć, jakie typy plików tworzyć** | [Typy Kart](/pl/dokumentacja/encje/) |
| **Stworzyć mój pierwszy plik** | [Szybki Start](/pl/standardy/szybki-start) |
| **Zobaczyć kompletny przykład** | [Budynek Zielony Taras](/pl/przyklady/zielony-taras/) |
| **Użyć gotowych szablonów** | [Szablony](/pl/szablony/) |
| **Dowiedzieć się o walidacji** | [Przewodnik Kompilatora](/pl/dokumentacja/kompilator/) |

---

## Aktualna Wersja

**SBM v0.1.3** (2026-02-22)

Najnowsze dodatki:
- Warunki środowiskowe (temperatura, wilgotność, jakość powietrza)
- Grupy bezpieczeństwa elektrycznego (IEC 60364-7-710)
- Śledzenie odniesień do przepisów
- Stany cyklu życia budynku
- Numery pomieszczeń, poziomy dostępności, przestrzenie nadrzędne/podrzędne
- System szablonów (Typy Przestrzeni, Typy Stref, Typy Systemów, Typy Zasobów)

**Co się zmieniło:** Więcej pól do śledzenia danych z rzeczywistych projektów. Jeśli dopiero zaczynasz, ignoruj te zaawansowane funkcje, dopóki ich nie potrzebujesz.

::: tip Zacznij Prosto
Nie musisz używać każdego pola. Zacznij od:
- Nazwa pomieszczenia, powierzchnia, wysokość
- Jedna strefa pożarowa
- Jedno wymaganie (minimum wysokości)

To wystarczy na pierwszy plik. Dodaj złożoność, gdy Twój projekt tego potrzebuje.
:::
