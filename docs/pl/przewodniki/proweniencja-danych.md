---
title: Proweniencja danych
description: Jak śledzić źródło każdego punktu danych w modelu SBM za pomocą adnotacji na poziomie pól, poziomów pewności i referencji do źródeł.
---

# Przewodnik po proweniencji danych

**SBM v0.2.0** wprowadza model proweniencji, który odpowiada na pytanie, którego boi się każdy architekt: *"Skąd pochodzi ta liczba?"*

Bez proweniencji każde pole w modelu wygląda na równie wiarygodne. Wartość osłony radiologicznej 0,3 mm Pb (z opisu technicznego architekta) wygląda identycznie jak 2,0 mm Pb (zgadnięta przez kogoś, kto nigdy nie czytał źródła). W projekcie szpitalnym ten 7-krotny błąd jest krytyczny dla bezpieczeństwa.

Ten przewodnik wyjaśnia, jak adnotować encje SBM, aby każdy punkt danych był możliwy do prześledzenia do źródła.

## Problem

W rzeczywistym polskim projekcie szpitalnym (KPC Pulmonologii Blok D) architekt przeglądał automatycznie wygenerowane pliki pomieszczeń i znalazł:

- **Osłona radiologiczna pracowni CT** udokumentowana jako 2,0 mm Pb, gdy dokument źródłowy mówi **0,3 mm Pb** (błąd 7x)
- **Ściany sali operacyjnej** udokumentowane jako płytki ceramiczne, gdy źródło określa **panele ze stali nierdzewnej dla pomieszczeń czystych**
- **Ściany sali sekcyjnej** udokumentowane jako ceramika szkliwiona, gdy źródło określa **okładzinę PCV termozgrzewalną**

Żaden z tych błędów nie był wykrywalny z samych plików SBM, ponieważ nie było mechanizmu rozróżniania danych zweryfikowanych od wymyślonych.

## Trzy warstwy proweniencji

### Warstwa 1: Adnotacje na poziomie pól (piszesz Ty)

Dla dowolnego pola `X` dodaj towarzyszący obiekt `X_meta`:

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter"
  extractedBy: "auto-generator"
  extractedDate: "2026-02-23"
```

Dla nieznanych wartości użyj `null` z wyjaśnieniem:

```yaml
designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Nie określono dla pomieszczenia. Typowa wysokość poziomu (3,30 m) dostępna przez dziedziczenie."
```

### Warstwa 2: Proweniencja dziedziczenia (generowana przez kompilator)

Gdy kompilator rozwiązuje odziedziczone wartości, adnotuje skompilowane dane wyjściowe:

```yaml
# Skompilowane dane wyjściowe dla Przestrzeni 3.25
designHeight: 3.00
designHeight_meta:
  confidence: specified
  resolution: inherited
  inheritedFrom: "LVL-KPCPULM-D-PIETRO-02"
  inheritedField: "typicalCeilingHeight"
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.4"
```

### Warstwa 3: Podsumowanie jakości encji (generowane przez kompilator)

Każda skompilowana encja otrzymuje blok `_quality`:

```yaml
_quality:
  totalFields: 14
  fieldsByConfidence:
    measured: 0
    calculated: 0
    specified: 8
    estimated: 2
    assumed: 3
    unknown: 1
  completeness: 0.93
  lowestConfidence: assumed
  unresolvedFields: ["designHeight"]
  warnings:
    - "3 pola mają pewność 'assumed' -- wymagają weryfikacji przed fazą 5"
```

## Poziomy pewności

| Poziom | Etykieta | Znaczenie | Wymagane źródło? | Przykład |
|--------|----------|-----------|------------------|---------|
| 1 | `measured` | Pomiar zweryfikowany w terenie | Tak | Geodeta zmierzył pomieszczenie: 30,45 m2 |
| 2 | `calculated` | Obliczone z danych pomiarowych | Tak | Kubatura = 30,45 m2 x 3,30 m |
| 3 | `specified` | Z dokumentu autorytatywnego | Tak | Program funkcjonalny: 30,45 m2 |
| 4 | `estimated` | Osąd profesjonalny | Nie | "Około 30 m2" |
| 5 | `assumed` | Brak źródła, rozsądne założenie | Nie | Domyślna wartość z podobnych pomieszczeń |
| 6 | `unknown` | Wartość niedostępna | Nie | Pole ustawione na `null` |

**Kluczowa zasada:** `measured`, `calculated` i `specified` wymagają pól `source` i `sourceRef`. `estimated` i `assumed` nie wymagają (ale są oznaczane do weryfikacji). `unknown` oznacza, że wartość jawnie nie jest dostępna.

## Referencje do źródeł

### Deklarowanie źródeł dokumentów

Każda encja może zadeklarować źródła w tablicy `sources`:

```yaml
sources:
  - id: "PULM-PW-04.05.11"
    title: "Opis techniczny do projektu wykonawczego rozbudowy KPC Pulmonologii"
    type: architectural_description
    date: "2011-05-04"
    author: "Projektant"
```

### Cytowanie źródeł w _meta

Odwołuj się do `id` źródła w `_meta` na poziomie pola:

```yaml
designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter, poz. 1.24"
```

## Reguły walidacji kompilatora

### Reguła 1: Źródło wymagane dla wysokiej pewności

Jeśli `confidence` to `measured`, `calculated` lub `specified`, to `source` i `sourceRef` muszą być obecne. Kompilator emituje ostrzeżenie, jeśli brakuje.

### Reguła 2: Wykrywanie duplikacji dziedziczenia

Jeśli przestrzeń jawnie ustawia wartość identyczną z odziedziczoną z poziomu, kompilator ostrzega:

```
OSTRZEŻENIE: designHeight w SPC-xxx (3,00 m) odpowiada odziedziczonej wartości z LVL-xxx.
Rozważ usunięcie na rzecz dziedziczenia.
```

### Reguła 3: Bramki fazowe

| Faza | Reguła |
|------|--------|
| 1-3 (Rozpoczęcie do Projektu Wstępnego) | Wszystkie poziomy pewności akceptowane |
| 4 (Projekt Budowlany) | Ostrzeżenie dla pól `assumed` |
| 5 (Projekt Wykonawczy) | Błąd dla pól `assumed` na wymaganych właściwościach |
| 7+ (Powykonawcza) | Błąd dla pól `estimated` na właściwościach krytycznych dla bezpieczeństwa |

### Reguła 4: Śledzenie pól null

- `null` z `confidence: unknown` jest prawidłowe, ale śledzone w podsumowaniu jakości
- `null` BEZ `_meta` emituje ostrzeżenie: "Pole X jest null bez wyjaśnienia"

### Reguła 5: Dziedziczenie pewności

Gdy wartość jest dziedziczona, pewność jest również dziedziczona. Jeśli encja nadrzędna nie ma metadanych pewności, domyślnie `estimated`.

## Przykład: Pracownia CT z pełną proweniencją

```yaml
id: SPC-KPCPULM-D-1-24
entityType: Space
spaceName: "Pracownia tomografu komputerowego (CT)"
roomNumber: "1.24"
levelId: LVL-KPCPULM-D-PARTER

sources:
  - id: "PULM-PW-04.05.11"
    title: "Opis techniczny do projektu wykonawczego"
    type: architectural_description
    date: "2011-05-04"

designArea: 30.45
designArea_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4.1.2.2, tabela pomieszczeń parter"

designHeight: null
designHeight_meta:
  confidence: unknown
  note: "Nie określono dla pomieszczenia. Typowa wysokość poziomu: 3,30 m."

radiologicalShielding:
  wallEquivalent_mmPb: 0.3
  wallEquivalent_mmPb_meta:
    confidence: specified
    source: "PULM-PW-04.05.11"
    sourceRef: "sekcja 4.4.3"
  windowEquivalent_mmPb: 0.5
  windowEquivalent_mmPb_meta:
    confidence: specified
    source: "PULM-PW-04.05.11"
    sourceRef: "sekcja 4.6, okno podglądowe do sterowni"

electricalSafetyGroup: group_1
electricalSafetyGroup_meta:
  confidence: specified
  source: "PULM-PW-04.05.11"
  sourceRef: "sekcja 4, linia 130"
```

## Migracja z v0.1.x

Istniejące encje v0.1.x działają bez zmian. Proweniencja jest addytywna:

1. **Brak pól `_meta`** -- Encja działa jak wcześniej, ale podsumowanie jakości pokazuje wszystkie pola jako "brak proweniencji"
2. **Dodaj tablicę `sources`** -- Zadeklaruj dokumenty, z których pochodzą dane encji
3. **Dodaj `_meta` do pól krytycznych** -- Zacznij od pól krytycznych dla bezpieczeństwa
4. **Dodaj `_meta` do pozostałych pól** -- Stopniowo adnotuj wszystkie pola

## Zobacz również

- [Zarządzanie danymi](/pl/zarzadzanie-projektem/zarzadzanie-danymi) -- Pipeline przechwytywania i przetwarzania surowych danych
- [Pomieszczenie](/pl/dokumentacja/encje/przestrzen) -- Encja przestrzeni z sekcją proweniencji
- [Kondygnacja](/pl/dokumentacja/encje/poziom) -- Encja poziomu z proweniencją dziedziczenia
- [Rodzaje kart](/pl/dokumentacja/encje/) -- Przegląd wszystkich typów encji
