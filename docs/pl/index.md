---
layout: home

hero:
  name: "Standard Dokumentacji Architektonicznej"
  text: "Dokumentacja Gotowa na AI dla Nowoczesnych Architektów"
  tagline: Pisz dokumentację budowlaną w Markdown. Ustrukturyzowana dla AI, kompatybilna z BIM, zgodna z przepisami.
  actions:
    - theme: brand
      text: Szybki Start
      link: /pl/standardy/szybki-start
    - theme: alt
      text: Jak to działa
      link: /pl/standardy/jak-to-dziala
    - theme: alt
      text: English
      link: /

features:
  - icon: 📝
    title: Oparte na Markdown
    details: Pisz dokumentację w prostym markdown - łatwa edycja, kontrola wersji i przyszłościowe rozwiązanie
  - icon: 🤖
    title: Odczytywalne przez AI
    details: Ustrukturyzowany nagłówek YAML i schematy JSON umożliwiają narzędziom AI rozumienie i przetwarzanie dokumentacji
  - icon: 🏗️
    title: Kompatybilne z BIM
    details: Dwukierunkowa synchronizacja z narzędziami BIM (Revit, ArchiCAD) przez właściwości IFC
  - icon: ✅
    title: Zgodne z Przepisami
    details: Wbudowane wsparcie dla polskich przepisów budowlanych (Prawo budowlane, WT 2021) i standardów międzynarodowych
  - icon: 📄
    title: Eksport do PDF
    details: Profesjonalne generowanie PDF przy użyciu szablonów Pandoc - gotowe do oficjalnych zgłoszeń
  - icon: 🔄
    title: Kontrola Wersji
    details: Format czystego tekstu przyjazny dla Git umożliwia pełną historię wersji i współpracę zespołową
---

## Czym jest ten standard?

**Standard Dokumentacji Architektonicznej** to sposób na tworzenie dokumentacji budowlanej, która jest jednocześnie **czytelna dla ludzi**, **odczytywalna maszynowo** i **kompatybilna z BIM**.

Piszesz dokumentację w prostym Markdown z ustrukturyzowanym nagłówkiem YAML. Ten sam plik służy architektom (czytelny tekst), narzędziom AI (ustrukturyzowane dane), oprogramowaniu BIM (właściwości IFC) i urzędom (eksport PDF).

## Trzy filary

Standard opiera się na trzech prostych zasadach:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   FAZY          │  │  KARTY          │  │  BIM            │
│   (Kiedy)       │  │  OBIEKTÓW       │  │  (Jak)          │
│                 │  │  (Co)           │  │                 │
│ 8 faz projektu  │  │ 7 rodzajów kart │  │ Synchronizacja  │
│ od briefu       │  │ opisujących     │  │ IFC, poziomy    │
│ do przekazania  │  │ każdy aspekt    │  │ LOD, Revit/     │
│                 │  │ budynku         │  │ ArchiCAD        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

- **[Fazy](/pl/standardy/struktura-dokumentu)** definiują 8 etapów projektu - od briefu klienta do przekazania budynku
- **[Karty obiektów](/pl/dokumentacja/przeglad)** definiują 7 rodzajów dokumentów - pomieszczenia, strefy, instalacje, wymagania i więcej
- **[Integracja BIM](/pl/integracja-bim/)** łączy dokumentację z Revit, ArchiCAD i IFC

[Dowiedz się jak to działa →](/pl/standardy/jak-to-dziala)

## Jak wygląda dokument?

Każdy dokument ma dwie części: **nagłówek YAML** (dla maszyn) i **treść Markdown** (dla ludzi).

```yaml
---
documentType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
spaceType: "sleeping_space"
designArea: 14.5
designHeight: 2.70
unit: "m"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
requirements:
  - "REQ-PL-WT-ROOM-HEIGHT-001"
version: "1.0.0"
---
```

```markdown
# Pomieszczenie: Sypialnia 01

Standardowa sypialnia na pierwszym piętrze z oknem od strony północnej.

## Parametry projektowe

| Parametr | Wartość | Jednostka |
|----------|---------|-----------|
| Powierzchnia | 14.5 | m² |
| Wysokość | 2.70 | m |
| Powierzchnia okna | 3.2 | m² |

## Wymagania

- Wysokość pomieszczenia >= 2.50 m (WT 2021 § 132) -- Zgodne
- Wymagane oświetlenie naturalne -- Zweryfikowane
```

Kompilator odczytuje te pliki i generuje:
- **Parametry BIM** dla Revit/ArchiCAD
- **Raporty zgodności** dla wniosków o pozwolenie
- **Rejestry wyposażenia** dla zarządzania nieruchomościami
- **Schematy cyfrowego bliźniaka** dla systemów zarządzania budynkiem

## Przepływ pracy projektu

Standard obejmuje wszystkie 8 faz pracy architektonicznej:

| Faza | Co robisz | BIM LOD |
|------|-----------|---------|
| [1. Rozpoczęcie](/pl/fazy/rozpoczecie) | Brief klienta, analiza terenu, program funkcjonalny | -- |
| [2. Koncepcja (LOD 100)](/pl/fazy/koncepcja) | Studium masy, projekt wstępny | LOD 100 |
| [3. Projekt wstępny (LOD 200)](/pl/fazy/wstepny) | Rzuty, przekroje, elewacje | LOD 200 |
| [4. Projekt budowlany (LOD 300)](/pl/fazy/budowlany) | Dokumentacja na pozwolenie na budowę | LOD 300 |
| [5. Projekt wykonawczy (LOD 400)](/pl/fazy/wykonawczy) | Specyfikacje gotowe do realizacji | LOD 400 |
| [6. Budowa](/pl/fazy/budowa) | Nadzór, RFI, zmiany projektowe | LOD 400 |
| [7. Powykonawcza (LOD 500)](/pl/fazy/powykonawcza) | Zweryfikowany stan faktyczny | LOD 500 |
| [8. Przekazanie](/pl/fazy/przekazanie) | Instrukcje OOM, plany konserwacji | LOD 500 |

Każda faza mówi Ci jakie dokumenty stworzyć, jakie karty wypełnić i jakie przepisy sprawdzić.

[Zobacz kompletny przepływ pracy →](/pl/standardy/struktura-dokumentu)

## Semantyczny Model Budynku

**Semantyczny Model Budynku (SBM)** organizuje wszystkie informacje o budynku w 7 rodzajów kart:

| Karta | Co opisuje | Przykład |
|-------|-----------|---------|
| **Pomieszczenie** | Pokoje i obszary funkcjonalne | Sypialnia, biuro, korytarz |
| **Strefa** | Grupy: pożarowe, akustyczne, HVAC | Strefa pożarowa ZL-IV |
| **Wymaganie** | Przepisy do spełnienia | Wysokość pomieszczenia >= 2.50 m |
| **Instalacja** | Systemy techniczne | Ogrzewanie centralne, wentylacja |
| **Urządzenie** | Zainstalowane produkty | Kocioł, centrala wentylacyjna |
| **Budynek** | Dane budynku | Nazwa, lokalizacja, klasyfikacja |
| **Kondygnacja** | Informacje o piętrze | Parter, Piętro 1 |

Karty odwołują się do siebie nawzajem (Pomieszczenie należy do Stref, ma Wymagania, zawiera Urządzenia), tworząc połączony model całego budynku.

[Dowiedz się o SBM →](/pl/dokumentacja/przeglad)

## Rozpocznij

Wybierz swoją ścieżkę:

| Chcę... | Przejdź tutaj |
|---------|---------------|
| **Spróbować teraz** (5 minut) | [Szybki Start](/pl/standardy/szybki-start) |
| **Zrozumieć cały obraz** | [Jak to działa](/pl/standardy/jak-to-dziala) |
| **Podążać za przepływem pracy** | [Przepływ 8 faz](/pl/standardy/struktura-dokumentu) |
| **Zobaczyć prawdziwy przykład** | [Budynek Zielony Taras](/pl/przyklady/zielony-taras/) |
| **Użyć szablonów** | [Szablony](/pl/szablony/) |
| **Zintegrować z BIM** | [Integracja BIM](/pl/integracja-bim/) |
| **Sprawdzić polskie przepisy** | [Przepisy](/pl/przepisy/) |
| **Eksportować do PDF** | [Przewodnik eksportu PDF](/pl/przewodniki/eksport-pdf) |

---

**Język:** [English](/) | [Polski](/pl/)
