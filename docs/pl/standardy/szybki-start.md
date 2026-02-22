# Szybki Start: Twoje Pierwsze Pomieszczenie

::: tip Przewodnik na 5 minut
Stwórz swoją pierwszą kartę pomieszczenia i zobacz standard w akcji.
:::

## Co stworzysz

W tym przewodniku stworzysz **kartę Pomieszczenia** -- sypialnię -- opisaną za pomocą ustrukturyzowanego nagłówka YAML wewnątrz pliku Markdown. Pomieszczenia są podstawowymi elementami **Semantycznego Modelu Budynku (SBM)**. Każdy pokój, korytarz i obszar w budynku ma swoją kartę.

Na koniec będziesz mieć dwa połączone dokumenty i jasny obraz tego, jak działa cały standard.

**Oto gotowy plik, który stworzysz:**

```markdown
spaces/bedroom-01.md
```

**A oto co kompilator z niego wygeneruje:**

```json
{
  "documentType": "space",
  "id": "SP-BLD-01-L01-001",
  "spaceName": "Bedroom 01",
  "designArea": 14.5,
  "zones": ["ZONE-FIRE-ZL-IV"],
  "requirements": ["REQ-PL-WT-ROOM-HEIGHT-001"],
  "complianceStatus": "pass"
}
```

Jeden plik źródłowy. Dwie grupy odbiorców -- ludzie i maszyny.

---

## Wymagania wstępne

- **Edytor tekstu** -- VS Code, Sublime Text, Notepad++ lub dowolny, z którym czujesz się komfortowo
- **Node.js** (opcjonalnie) -- potrzebny tylko jeśli chcesz uruchomić kompilator do walidacji
- **Podstawowa znajomość Markdown** -- nagłówki, listy, tabele i bloki kodu

::: info Nie potrzebujesz specjalnych narzędzi
Standard jest zbudowany na zwykłym tekście Markdown. Nie potrzebujesz żadnego zastrzeżonego oprogramowania ani wtyczek, aby zacząć.
:::

---

## Krok 1: Skonfiguruj swój projekt

Stwórz prostą strukturę folderów. Każdy rodzaj karty ma swój własny katalog:

```bash
mkdir my-project
mkdir my-project/spaces
mkdir my-project/zones
mkdir my-project/requirements
```

Twój projekt powinien wyglądać tak:

```
my-project/
├── spaces/          # karty pomieszczeń
├── zones/           # karty stref
└── requirements/    # karty wymagań
```

To wszystko, czego potrzebujesz. Żadnych plików konfiguracyjnych, żadnych narzędzi do budowania -- tylko foldery i pliki Markdown.

---

## Krok 2: Utwórz kartę pomieszczenia

Utwórz nowy plik w lokalizacji `spaces/bedroom-01.md` i wklej następującą zawartość:

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
designArea: 14.5
designHeight: 2.70
unit: "m"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Pomieszczenie: Sypialnia 01

Standardowa sypialnia na pierwszym piętrze z oknem od strony północnej.

## Parametry projektowe

| Parametr | Wartość | Jednostka |
|----------|---------|-----------|
| Powierzchnia podłogi | 14.5 | m² |
| Wysokość w świetle | 2.70 | m |
| Powierzchnia okna | 3.2 | m² |

## Wymagania

- Wysokość pomieszczenia >= 2.50 m (WT 2021 § 132)
- Wymagane naturalne oświetlenie dzienne
- Izolacyjność akustyczna Klasa B
```

### Objaśnienie pól YAML

Każde pole w nagłówku pełni określoną funkcję:

| Pole | Co oznacza | Przykład |
|------|-----------|----------|
| `entityType` | Rodzaj karty (space, zone, system itp.) | `"space"` |
| `id` | Unikalny identyfikator wg wzorca `SP-{budynek}-{kondygnacja}-{numer}` | `"SP-BLD-01-L01-001"` |
| `spaceName` | Nazwa pomieszczenia | `"Bedroom 01"` |
| `spaceType` | Klasyfikacja ze słownika standardu | `"sleeping_space"` |
| `buildingId` | Do którego budynku należy to pomieszczenie | `"BLD-01"` |
| `levelId` | Na której kondygnacji się znajduje | `"LVL-01"` |
| `zoneIds` | Lista stref, do których należy (pożarowa, akustyczna, HVAC itp.) | `["ZONE-FIRE-ZL-IV"]` |
| `designArea` | Projektowana powierzchnia podłogi | `14.5` |
| `designHeight` | Projektowana wysokość w świetle | `2.70` |
| `requirements` | Lista wymagań dotyczących tego pomieszczenia | `["REQ-PL-WT-ROOM-HEIGHT-001"]` |
| `version` | Wersja do śledzenia zmian | `"1.0.0"` |
| `tags` | Dowolne etykiety do filtrowania i wyszukiwania | `["residential", "sleeping"]` |

---

## Krok 3: Zrozum strukturę

Każdy plik składa się z dwóch odrębnych części:

### Nagłówek YAML (dla maszyn)

Zawartość między znacznikami `---` to ustrukturyzowane dane. To właśnie je odczytuje kompilator, narzędzia AI i oprogramowanie BIM. Nagłówek przestrzega ścisłego schematu, dzięki czemu narzędzia mogą niezawodnie wyodrębniać dane budynku.

```yaml
---
entityType: "space"
id: "SP-BLD-01-L01-001"
designArea: 14.5
# ... więcej pól
---
```

### Treść Markdown (dla ludzi)

Wszystko po zamykającym `---` to standardowy Markdown. To właśnie czytają architekci, inżynierowie i klienci. Zapewnia kontekst, wyjaśnienia i wizualne tabele.

```markdown
# Pomieszczenie: Sypialnia 01

Standardowa sypialnia na pierwszym piętrze z oknem od strony północnej.
```

::: tip Główna zasada
Pisz raz, obsługuj zarówno ludzi, jak i maszyny. Nagłówek YAML i treść Markdown znajdują się w jednym pliku. Nie ma duplikacji i nie ma rozbieżności między tym, co wie maszyna, a tym, co czyta człowiek.
:::

---

## Krok 4: Dodaj kartę strefy

Dokumenty stają się naprawdę użyteczne, gdy odwołują się do siebie nawzajem. Utwórz drugi plik w lokalizacji `zones/fire-zone-zl-iv.md`:

```markdown
---
documentType: "zone"
entityType: "zone"
id: "ZONE-FIRE-ZL-IV"
zoneName: "Fire Zone ZL-IV"
zoneType: "fire"
levelIds:
  - "LVL-01"
  - "LVL-02"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 234"
    requirement: "Odporność ogniowa REI 60"
version: "1.0.0"
---

# Strefa: Strefa Pożarowa ZL-IV

Klasyfikacja mieszkalnej strefy pożarowej dla głównej bryły budynku.

## Wymagania pożarowe

| Element | Wymagana klasa | Norma |
|---------|---------------|-------|
| Ściany nośne | REI 60 | WT 2021 § 234 |
| Stropy | REI 60 | WT 2021 § 234 |
| Ściany klatki schodowej | REI 120 | WT 2021 § 234 |
```

### Jak te dwa dokumenty są ze sobą połączone?

Spójrz na kartę Sypialni 01. Pole `zoneIds` zawiera `"ZONE-FIRE-ZL-IV"` -- to jest `id` strefy, którą właśnie utworzyłeś. To odwołanie mówi kompilatorowi, że Sypialnia 01 należy do Strefy Pożarowej ZL-IV.

Kompilator automatycznie tworzy również relację odwrotną: Strefa Pożarowa ZL-IV **zawiera** Sypialnię 01. Deklarujesz połączenie tylko w jednym miejscu, a kompletny model jest budowany automatycznie.

::: info Odwołania dwukierunkowe
Nie musisz ręcznie wymieniać każdego pomieszczenia wewnątrz strefy. Kompilator odczytuje `zoneIds` z każdego pomieszczenia i sam tworzy kompletną listę. Eliminuje to duplikację i zapobiega niespójnościom.
:::

---

## Krok 5: Zobacz całość

Mając zaledwie dwa pliki, zbudowałeś już mały fragment Semantycznego Modelu Budynku:

```
Budynek (BLD-01)
└── Kondygnacja 01 (LVL-01)
    └── Sypialnia 01 (SP-BLD-01-L01-001)
        ├── Strefa: Strefa Pożarowa ZL-IV
        └── Wymaganie: Wysokość Pomieszczenia WT 2021
```

To jest **Semantyczny Model Budynku (SBM)** w akcji. Każde pomieszczenie, strefa, instalacja i wymaganie to ustrukturyzowany dokument, który odwołuje się do innych dokumentów za pomocą identyfikatora. W miarę dodawania kolejnych plików -- kolejnych pomieszczeń, stref, instalacji, urządzeń -- model rośnie.

### Co generuje kompilator

Gdy uruchomisz kompilator na swoim projekcie, zwaliduje on wszystkie odwołania i wygeneruje kilka plików wyjściowych:

| Wynik | Cel |
|-------|-----|
| `bim_mapping.json` | Parametry gotowe do importu do Revit, ArchiCAD i innych narzędzi BIM |
| `compliance_report.json` | Status zgodności z przepisami dla każdego dokumentu i wymagania |
| `asset_register.json` | Dane o wyposażeniu i konserwacji do zarządzania obiektem |
| `twin_schema.json` | Powiązania czujników cyfrowego bliźniaka i mapowania danych na żywo |

::: warning Uszkodzone odwołania
Jeśli Sypialnia 01 odwołuje się do identyfikatora strefy, który nie istnieje w żadnym pliku, kompilator oznaczy to jako błąd. Jest to celowe -- wychwytuje pomyłki wcześnie, zanim trafią na plac budowy.
:::

---

## Co dalej

Utworzyłeś swoją pierwszą kartę pomieszczenia i połączyłeś ją ze strefą pożarową. Oto dokąd udać się dalej:

- [Jak to działa](/pl/standardy/jak-to-dziala) -- Zrozum pełny obraz standardu i trzy filary
- [Wszystkie rodzaje kart](/pl/dokumentacja/encje/) -- Poznaj wszystkie 7 rodzajów: Budynek, Kondygnacja, Pomieszczenie, Strefa, Instalacja, Urządzenie, Wymaganie
- [Przeglądaj szablony](/pl/szablony/) -- Gotowe szablony do skopiowania dla każdego rodzaju karty
- [Zobacz kompletny przykład](/pl/przyklady/zielony-taras/) -- Projekt budynku Zielony Taras z dziesiątkami połączonych dokumentów
- [Poznaj fazy projektu](/pl/standardy/struktura-dokumentu) -- 8-fazowy proces od briefu do przekazania

::: tip Kontynuuj
Najlepszym sposobem nauki standardu jest opisanie prawdziwego pomieszczenia z projektu, nad którym pracujesz. Wybierz pokój, utwórz plik i połącz go ze strefą. Struktura szybko stanie się naturalna.
:::
