# Słownik: Kluczowe Terminy SBM v1.1.0

Ten słownik definiuje terminy używane w Semantycznym Modelu Budynku (SBM). Skorzystaj z niego gdy napotkasz nieznany termin w dokumentacji lub przykładach.

---

## Typy Encji (19 Typów)

### Działka
Parcelateren z granicami prawnymi, na której znajduje się budynek.

**Przykład**: "Działka przy ul. Słonecznej 45, 1250 m², parcela nr 123/4"

**Format ID**: `SITE-{descriptor}` (np. `SITE-MAIN`, `SITE-NORTH`)

### Budynek
Konstrukcja budowlana z dachem i ścianami.

**Przykład**: "Zielony Taras, ul. Słoneczna 45, Warszawa — budynek mieszkalny 6-kondygnacyjny"

**Format ID**: `BLD-{number}` (np. `BLD-01`, `BLD-02`)

### Kondygnacja
Jedno piętro budynku na określonej wysokości.

**Przykład**: "Kondygnacja 01 (Parter), +0,00 m, powierzchnia 450 m²"

**Format ID**: `LVL-{number}` (np. `LVL-00`, `LVL-01`, `LVL-02`)

### Przestrzeń
Pojedyncze pomieszczenie lub obszar funkcjonalny wewnątrz budynku.

**Przykład**: "Sypialnia 01, 14,5 m², wysokość 2,70 m, południowa ekspozycja"

**Kluczowe rozróżnienie:**
- **`spaceType` (enum)**: Kategoria funkcjonalna (np. `sleeping_space`, `kitchen`, `bathroom`) — z góry zdefiniowanej listy
- **`spaceTypeId` (referencja)**: ID szablonu typu przestrzeni (np. `ST-BEDROOM-STANDARD-A`) — odnosi się do konkretnego dokumentu szablonu

**Format ID**: `SP-{building}-{level}-{number}` (np. `SP-BLD-01-L01-001`)

### Typ Przestrzeni
Szablon wielokrotnego użytku definiujący wspólne specyfikacje dla podobnych przestrzeni.

**Przykład**: "Typ Sypialnia Standard A — światło dzienne >= 2%, izolacja akustyczna Rw >= 52 dB, wykończenia: podłoga dębowa + ściany malowane"

**Kiedy używać**: Gdy masz 20 identycznych sypialni — zdefiniuj specyfikacje raz w typie, utwórz 20 lekkich instancji

**Format ID**: `ST-{category}-{descriptor}` (np. `ST-BEDROOM-STANDARD-A`)

### Przegroda
Ściana, dach, strop lub podłoga z warstwami materiałowymi i właściwościami termicznymi/akustycznymi/pożarowymi.

**Przykład**: "Ściana zewnętrzna typ A — U=0,18 W/(m²·K), REI 90, izolacja 25 cm wełny mineralnej"

**Format ID**: `ENV-{type}-{descriptor}` (np. `ENV-WALL-EXT-A`, `ENV-ROOF-MAIN`)

### Otwór
Okno, drzwi lub świetlik w przegrodzie z wymiarami, właściwościami termicznymi i specyfikacją produktu.

**Przykład**: "Okno sypialni W-01, 1,20×1,50 m, PVC trójszybowe, U=0,8 W/(m²·K)"

**Format ID**: `OPN-{descriptor}` (np. `OPN-WIN-01`, `OPN-DOOR-MAIN`)

### Typ Otworu
Szablon specyfikacji dla okien, drzwi lub świetlików o tych samych właściwościach.

**Przykład**: "Typ Okna PVC Trójszybowego — U=0,8, Rw=32 dB, profil 70mm, wypełnienie Ar 90%"

**Kiedy używać**: Gdy masz 50 identycznych okien — zdefiniuj specyfikacje produktu raz, utwórz 50 instancji z konkretnymi lokalizacjami

**Format ID**: `OT-{category}-{descriptor}` (np. `OT-WINDOW-PVC-TRIPLE`, `OT-DOOR-FIRE-EI60`)

### Komunikacja Pionowa
Element łączący kondygnacje: klatka schodowa, winda, rampa, schody ruchome lub dźwig.

**Przykład**: "Klatka schodowa A — chroniona REI 60, 6 kondygnacji, szerokość 1,20m, przepustowość ewakuacji 120 osób"

**Format ID**: `VC-{type}-{descriptor}` (np. `VC-STAIR-A`, `VC-ELEV-01`)

### Element Terenu
Krajobraz, parking, chodnik, tereny zielone lub infrastruktura na działce.

**Przykład**: "Chodnik betonowy — 45 m², nawierzchnia przepuszczalna, grubość 8 cm, agregat na podbudowie"

**Format ID**: `SF-{descriptor}` (np. `SF-WALKWAY-MAIN`, `SF-PARKING-VISITORS`)

### Typ Elementu Terenu
Szablon specyfikacji dla elementów terenu o tych samych właściwościach konstrukcyjnych/materiałowych.

**Przykład**: "Standardowy Chodnik Betonowy — nawierzchnia przepuszczalna, grubość 8 cm, obciążenie pieszych"

**Format ID**: `SFT-{category}-{descriptor}` (np. `SFT-WALKWAY-CONCRETE`, `SFT-GREEN-ROOF`)

### Strefa
Grupa przestrzeni o wspólnej charakterystyce (pożarowej, akustycznej, HVAC, bezpieczeństwa, oświetlenia).

**Przykład**: "Strefa pożarowa ZL-IV północ — obejmuje 12 pomieszczeń na kondygnacjach 1-3, maks. odległość ewakuacji 10m"

**Kluczowe rozróżnienie:**
- **`zoneType` (enum)**: Kategoria strefy (np. `fire`, `acoustic`, `hvac`) — z góry zdefiniowanej listy
- **`zoneTypeId` (referencja)**: ID szablonu typu strefy (np. `ZT-FIRE-ZL-IV`) — odnosi się do konkretnego dokumentu szablonu

**Format ID**: `ZONE-{type}-{descriptor}` (np. `ZONE-FIRE-NORTH-L01`, `ZONE-HVAC-WEST`)

### Typ Strefy
Szablon wielokrotnego użytku definiujący wspólne wymagania i właściwości stref.

**Przykład**: "Strefa Pożarowa ZL-IV Standard — REI 60, maks. odległość ewakuacji 10m, wykrywanie dymu, kompartmentacja"

**Kiedy używać**: Gdy masz identyczne strefy pożarowe na 6 piętrach — zdefiniuj wymagania raz, utwórz 12 instancji stref (po 2 na piętro)

**Format ID**: `ZT-{type}-{descriptor}` (np. `ZT-FIRE-ZL-IV`, `ZT-ACOUSTIC-RESIDENTIAL`)

### Wymaganie
Reguła wydajności, ograniczenie regulacyjne lub kryterium projektowe, które encje muszą spełniać.

**Typy**:
- **Liczbowe**: Mierzalne (np. wysokość >= 2,50 m, współczynnik światła dziennego >= 2%)
- **Jakościowe**: Proceduralne lub koncepcyjne (np. przepływy czyste/brudne nie mogą się krzyżować)

**Format ID**: `REQ-{scope}-{descriptor}-{number}` (np. `REQ-PL-WT-HEIGHT-001`)

### Instalacja
System techniczny budynku (HVAC, elektryczny, wodno-kanalizacyjny, bezpieczeństwo pożarowe, BMS).

**Przykład**: "System HVAC Budynek 01 — rekuperacja 90%, pompa ciepła 12kW, ogrzewanie podłogowe 8 stref"

**Kluczowe rozróżnienie:**
- **`systemCategory` (enum)**: Kategoria systemu (np. `hvac`, `electrical`, `plumbing`) — z góry zdefiniowanej listy
- **`systemTypeId` (referencja)**: ID szablonu typu systemu (np. `SYT-HVAC-RESIDENTIAL-MVHR`) — odnosi się do konkretnego dokumentu szablonu

**Format ID**: `SYS-{category}-{descriptor}` (np. `SYS-HVAC-01`, `SYS-ELEC-BLD-01`)

### Typ Systemu
Szablon wielokrotnego użytku definiujący wspólne specyfikacje dla podobnych systemów MEP.

**Przykład**: "System HVAC Mieszkaniowy MVHR — rekuperacja 90%, pompa ciepła COP 4,2, ogrzewanie podłogowe, 8-strefowe sterowanie"

**Kiedy używać**: Gdy masz identyczne systemy HVAC w 10 budynkach — zdefiniuj komponenty/wymagania raz, utwórz 10 instancji systemów

**Format ID**: `SYT-{category}-{descriptor}` (np. `SYT-HVAC-RESIDENTIAL-MVHR`, `SYT-ELECTRICAL-STANDARD`)

### Zasób
Konkretny zainstalowany produkt: kocioł, pompa ciepła, winda, czujnik dymu, panel rozdzielniczy.

**Przykład**: "Pompa ciepła HP-01 — Vaillant ecoTEC plus, numer seryjny #12345, zainstalowano 2024-06-15, lokalizacja: pomieszczenie techniczne"

**Format ID**: `AST-{category}-{number}` (np. `AST-HP-01`, `AST-PUMP-CIRC-02`)

### Typ Zasobu
Szablon specyfikacji produktu definiujący wspólne specyfikacje dla urządzeń i zasobów.

**Przykład**: "Pompa Ciepła Bosch HP-300 — 12kW ogrzewanie, COP 4,2, czynnik R-32, gwarancja 5 lat, serwis co 12 miesięcy"

**Kiedy używać**: Gdy masz 50 identycznych pomp ciepła — zdefiniuj specyfikacje produktu raz, utwórz 50 instancji z numerami seryjnymi/lokalizacjami

**Format ID**: `AT-{manufacturer}-{model}` (np. `AT-BOSCH-HP-300`, `AT-SYSTEMAIR-MVHR-350`)

### Pakiet Budowlany
Faza budowy z harmonogramem, podziałem prac i podsumowaniami kosztów.

**Przykład**: "Pakiet 1: Fundamenty i konstrukcja — 6 tygodni, 150.000 zł, rozpoczęcie 2024-04-01"

**Format ID**: `CP-{descriptor}` (np. `CP-STRUCTURE`, `CP-ENVELOPE`)

---

## Relacje i Referencje

### Referencja Wprost
Odnośnik z jednej encji do drugiej, zapisany jawnie w pliku źródłowym.

**Przykład**: Plik przestrzeni mówi `zoneIds: ["ZONE-FIRE-ZL-IV"]` (referencja wprost z Przestrzeni → Strefy)

### Referencja Wsteczna (Auto-Obliczana)
Przeciwny kierunek referencji wprost, automatycznie obliczany przez kompilator.

**Przykład**: Kompilator czyta wszystkie pliki Przestrzeni → wypełnia tablicę `spaceIds` Strefy automatycznie (referencja wsteczna ze Strefy ← Przestrzeni)

**Kluczowy punkt**: **Nigdy ręcznie nie piszesz** referencji wstecznych. Kompilator je utrzymuje.

### Referencja Dwukierunkowa
Para referencji wprost i wstecznej łącząca dwie encje w obu kierunkach.

**Przykład**: `Space.zoneIds` (wprost) ↔ `Zone.spaceIds` (wstecz)

---

## Jakość Danych i Proweniencja

### Proweniencja
Pochodzenie i historia wartości danych. Śledzi skąd dane pochodzą, kto je wyekstrahował i jak bardzo jesteśmy pewni.

**Przechowywane w**: Pola towarzyszące `{field}_meta` (np. `designArea: 30.45` ma `designArea_meta: { confidence: "measured", source: "PW-04.05.11" }`)

### Poziomy Pewności
6-poziomowa skala wskazująca jakość danych:

| Poziom | Znaczenie | Przykład |
|--------|-----------|----------|
| `measured` | Fizycznie zmierzone na miejscu | Wymiar powykonawczy ze skanowania laserowego |
| `calculated` | Wyprowadzone z wartości mierzonych | Powierzchnia obliczona z mierzonych wymiarów |
| `specified` | Z oficjalnej specyfikacji | Wysokość pomieszczenia z zatwierdzonych rysunków architektonicznych |
| `estimated` | Wykwalifikowane przypuszczenie eksperta | Szacunkowa waga wyposażenia na podstawie podobnych modeli |
| `assumed` | Przyjęty placeholder | Tymczasowa wartość do późniejszej weryfikacji |
| `unknown` | Nie wiadomo | Brak danych o pochodzeniu |

**Użycie**: Oznacz pewność dla każdego pola aby kompilator mógł wyliczyć wyniki jakości.

### Blok Jakości Encji
Automatyczne podsumowanie kompletności i pewności encji, generowane przez kompilator.

**Przykład**:
```json
{
  "_quality": {
    "completeness": 85.3,
    "weightedCompleteness": 88.7,
    "totalFields": 15,
    "filledFields": 13,
    "criticalFieldsFilled": 8,
    "criticalFieldsTotal": 8,
    "confidence": {
      "measured": 3,
      "calculated": 2,
      "specified": 6,
      "estimated": 2,
      "assumed": 0,
      "unknown": 0
    }
  }
}
```

**Interpretacja**:
- **completeness**: 85,3% pól wypełnionych (13/15)
- **weightedCompleteness**: 88,7% z wagami pól krytycznych (3x), ważnych (2x), standardowych (1x)
- **criticalFieldsFilled**: Wszystkie 8 pól krytycznych wypełnionych (100%)
- **confidence**: 11 pól z określonym pochodzeniem, 0 assumed/unknown

---

## Wzorzec Typ/Instancja

**Typy** definiują **szablony** (specyfikacje produktu, wymagania, wykończenia).
**Instancje** odnoszą się do typów i dodają dane specyficzne dla instancji (lokalizacja, numery seryjne, odchylenia).

### Typ Przestrzeni (Szablon)
```yaml
id: "ST-BEDROOM-STANDARD-A"
typeName: "Sypialnia Standard — Typ A"
requirements:
  - "REQ-DAYLIGHT-BEDROOM"
  - "REQ-ACOUSTIC-BEDROOM"
finishes:
  floor: "Deska dębowa"
  walls: "Tynk malowany biały"
```

### Przestrzeń (Instancja)
```yaml
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
spaceTypeId: "ST-BEDROOM-STANDARD-A"  # Odnosi się do typu
designArea: 14.5  # Specyficzne dla instancji
# Dziedziczy wymagania + wykończenia z typu
```

**Wynik**: Przestrzeń otrzymuje wymagania + wykończenia typu, plus własną powierzchnię.

---

## Dziedziczenie Właściwości

Wartości mogą **przepływać w dół** przez hierarchię:

**Działka** → **Budynek** → **Kondygnacja** → **Przestrzeń**

**Przykład**:
- Kondygnacja definiuje `typicalCeilingHeight: 2.70`
- Wszystkie przestrzenie na tej kondygnacji dziedziczą `designHeight: 2.70` (chyba że nadpiszą)

**Zasada pierwszeństwa**: Instancja > Typ > Kondygnacja > Budynek > Działka (bardziej specyficzne wygrywa)

**Zobacz**: [Przewodnik Dziedziczenia Właściwości](/pl/przewodniki/dziedziczenie-wlasciwosci) dla pełnych szczegółów.

---

## Integracja BIM i IFC

### IFC (Industry Foundation Classes)
Standardowy format dla wymiany danych BIM. Używany przez Revit, ArchiCAD, Solibri, itp.

**SBM → IFC**: Kompilator generuje dane kompatybilne z IFC z plików Markdown → import do Revit wypełnia parametry.

### Mapowanie IFC
Pole `ifcMapping` w encji określa jak pola SBM mapują się na właściwości IFC:

```yaml
ifcMapping:
  ifcClass: "IfcSpace"
  psetName: "Pset_SpaceCommon"
  properties:
    - name: "NetFloorArea"
      source: "designArea"
      unit: "m²"
```

**Zobacz**: [Przewodnik Mapowania IFC](/pl/przewodniki/mapowanie-ifc) dla pełnych szczegółów.

### LOD (Poziom Rozwoju)
Zakres szczegółowości modelu BIM:

| LOD | Nazwa | Kiedy | Co |
|-----|-------|-------|-----|
| **100** | Koncepcyjny | Inicjacja, Koncepcja | Bryła, ogólne wymiary |
| **200** | Przybliżony | Projekt Wstępny | Rzuty, przekroje, wstępne wymiary |
| **300** | Precyzyjny | Projekt Budowlany | Dokładne wymiary, specyfikacje materiałów |
| **350** | Budowa | Projekt Wykonawczy | Szczegóły montażowe, sekwencja budowy |
| **400** | Powykonawczy | Powykonawczy | Zmierzone wymiary, stan rzeczywisty |
| **500** | Eksploatacja | Przekazanie | Dokumentacja eksploatacyjna, harmonogramy konserwacji |

---

## Akronimy i Skróty

| Skrót | Pełna Nazwa | Znaczenie |
|-------|-------------|-----------|
| **SBM** | Semantic Building Model | Semantyczny Model Budynku (ten standard) |
| **IFC** | Industry Foundation Classes | Standardowy format danych BIM |
| **MEP** | Mechanical, Electrical, Plumbing | Instalacje (mech., elektr., wod.-kan.) |
| **HVAC** | Heating, Ventilation, Air Conditioning | Ogrzewanie, wentylacja, klimatyzacja |
| **BIM** | Building Information Modeling | Modelowanie Informacji o Budynku |
| **LOD** | Level of Development | Poziom Rozwoju (szczegółowość modelu BIM) |
| **REI** | Résistance, Étanchéité, Isolation | Ocena ognioodporności (np. REI 60) |
| **WT 2021** | Warunki Techniczne 2021 | Polskie przepisy techniczne budowlane |
| **ZL-IV** | Strefa Liniowa IV | Polska klasyfikacja stref pożarowych (wg wysokości) |
| **COP** | Coefficient of Performance | Wskaźnik efektywności pompy ciepła |
| **SEER** | Seasonal Energy Efficiency Ratio | Sezonowy wskaźnik efektywności chłodzenia |
| **MVHR** | Mechanical Ventilation with Heat Recovery | Wentylacja mechaniczna z rekuperacją ciepła |
| **UFH** | Underfloor Heating | Ogrzewanie podłogowe |

---

## Konwencje Nazewnictwa Pól

### Prefiksy design* vs actual*

| Prefiks | Kiedy Używać | Przykład |
|---------|--------------|----------|
| `design*` | Wartości planowane/określone podczas faz projektowych | `designArea`, `designHeight` |
| `actual*` | Wartości zweryfikowane w terenie po budowie | `actualArea`, `actualHeight` |

### Liczba Pojedyncza vs Mnoga

| Forma | Kiedy Używać | Przykład |
|-------|--------------|----------|
| **Pojedyncza** | Referencja do jednej encji (wiele-do-jednego) | `levelId`, `buildingId`, `spaceId` |
| **Mnoga** | Referencje do wielu encji (wiele-do-wielu lub jeden-do-wielu) | `zoneIds`, `requirements`, `spaceIds` |

**Wyjątek**: `spaceIds` jest w liczbie mnogiej ponieważ strefa może zawierać wiele przestrzeni (jeden-do-wielu).

---

## Zobacz Także

- [Przewodnik Dziedziczenia Właściwości](/pl/przewodniki/dziedziczenie-wlasciwosci) — Jak wartości przepływają przez hierarchie
- [Przewodnik Proweniencji Danych](/pl/przewodniki/proweniencja-danych) — Śledzenie jakości i źródeł danych
- [Referencja Typów Encji](/pl/dokumentacja/encje/) — Kompletna lista wszystkich 19 typów encji
- [Przegląd Kompilatora](/pl/dokumentacja/kompilator/) — Jak działa kompilator

::: tip Nadal Niejasne?
Jeśli termin nie jest wymieniony tutaj lub potrzebuje więcej wyjaśnień, proszę otwórz issue na GitHub.
:::
