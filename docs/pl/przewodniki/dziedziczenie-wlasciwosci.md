# Dziedziczenie Właściwości: Jak Wartości Przepływają Przez Hierarchie

::: tip Czego Dotyczy Ten Przewodnik
Jak pole `_meta` śledzi pochodzenie danych oraz jak kompilator oblicza wartości dziedziczone z Kondygnacji → Przestrzeni lub Typu Przestrzeni → Przestrzeni.
:::

## Czym Jest Dziedziczenie Właściwości?

**Dziedziczenie właściwości** oznacza, że przestrzeń może **automatycznie przejąć wartości** z:
- **Kondygnacji nadrzędnej** (np. `typicalCeilingHeight` z kondygnacji → `designHeight` przestrzeni)
- **Typu Przestrzeni** (np. wymagania, wykończenia, wyposażenie z szablonu typu)

**Dlaczego to jest przydatne:**
- ✅ Zdefiniuj raz typową wysokość sufitu dla kondygnacji → dotyczy wszystkich pomieszczeń
- ✅ Zdefiniuj raz wykończenia w typie przestrzeni → dotyczy wszystkich instancji
- ✅ Nadpisz w konkretnym pomieszczeniu gdy potrzeba (np. łazienka ma 2,40 m zamiast 2,70 m)

---

## Szybki Przykład

**Kondygnacja:**
```yaml
# levels/level-01.md
typicalCeilingHeight: 2.70
typicalFinishes:
  floor: "Deska dębowa lakierowana"
  walls: "Tynk malowany biały"
```

**Przestrzeń (dziedziczy):**
```yaml
# spaces/bedroom-01.md
levelId: "LVL-01"
# Brak designHeight → kompilator ustawia 2.70 z kondygnacji
# Brak finishes → kompilator ustawia wykończenia z kondygnacji
```

**Przestrzeń (nadpisuje):**
```yaml
# spaces/bathroom-01.md
levelId: "LVL-01"
designHeight: 2.40  # Jawne → ignoruje typicalCeilingHeight kondygnacji
finishes:
  floor: "Płytki ceramiczne"  # Nadpisuje tylko podłogę, ściany z kondygnacji
```

---

## Zasady Pierwszeństwa

Gdy pole może pochodzić z wielu źródeł, kompilator używa tej hierarchii pierwszeństwa:

### Pierwszeństwo (od najwyższego do najniższego)

1. **Jawna wartość w instancji** (przestrzeń)
2. **Wartość z typu** (typ przestrzeni)
3. **Wartość kondygnacji** (kondygnacja nadrzędna)
4. **Wartość budynku** (budynek nadrzędny — dla niektórych pól)
5. **Wartość działki** (działka nadrzędna — dla niektórych pól)

**Reguła:** Bardziej specyficzne (instancja) wygrywa z bardziej ogólnym (typ, kondygnacja, budynek, działka).

---

## Mapowanie Pól: Kondygnacja → Przestrzeń

Kompilator automatycznie mapuje te pola z kondygnacji do przestrzeni:

| Pole Kondygnacji | Pole Przestrzeni | Jak Działa |
|------------------|------------------|------------|
| `typicalCeilingHeight` | `designHeight` | Jeśli przestrzeń nie ma `designHeight`, użyj wartości z kondygnacji |
| `typicalFinishes` | `finishes` | **Scalanie obiektów**: przestrzeń może nadpisać niektóre wykończenia, zachowując inne |
| `typicalEquipment` | `equipment` | **Scalanie obiektów**: przestrzeń dziedziczy wyposażenie kondygnacji |

### Przykład: Skalanie Obiektów

**Kondygnacja:**
```yaml
typicalFinishes:
  floor: "Deska dębowa"
  walls: "Tynk biały"
  ceiling: "Sufit napinany"
```

**Przestrzeń (częściowe nadpisanie):**
```yaml
finishes:
  floor: "Płytki ceramiczne"  # Nadpisuje podłogę
  # walls i ceiling dziedziczone z kondygnacji
```

**Skompilowany Wynik:**
```json
{
  "finishes": {
    "floor": "Płytki ceramiczne",  // Z przestrzeni
    "walls": "Tynk biały",          // Z kondygnacji
    "ceiling": "Sufit napinany"     // Z kondygnacji
  }
}
```

---

## Mapowanie Pól: Typ Przestrzeni → Przestrzeń

Kompilator automatycznie mapuje te pola z typu przestrzeni do instancji przestrzeni:

| Pole Typu | Pole Instancji | Jak Działa |
|-----------|----------------|------------|
| `requirements` | `requirements` | **Scalanie tablic**: instancja dziedziczy wymagania typu + może dodać własne |
| `finishes` | `finishes` | **Scalanie obiektów**: instancja może nadpisać niektóre wykończenia |
| `equipment` | `equipment` | **Scalanie obiektów**: instancja dziedziczy wyposażenie typu |
| `occupancyProfile` | `occupancyProfile` | **Scalanie obiektów**: instancja może nadpisać profil użytkowania |
| `areaGuidelines` | ` areaGuidelines` | **Dziedziczenie obiektu**: wytyczne powierzchni (minArea, maxArea, targetArea) |

### Przykład: Scalanie Tablic

**Typ Przestrzeni:**
```yaml
requirements:
  - "REQ-DAYLIGHT-BEDROOM"
  - "REQ-ACOUSTIC-BEDROOM"
  - "REQ-THERMAL-COMFORT"
```

**Instancja Przestrzeni:**
```yaml
spaceTypeId: "ST-BEDROOM-STANDARD-A"
requirements:
  - "REQ-ACCESSIBILITY-WHEELCHAIR"  # Dodatkowe wymaganie
```

**Skompilowany Wynik:**
```json
{
  "requirements": [
    "REQ-DAYLIGHT-BEDROOM",          // Z typu
    "REQ-ACOUSTIC-BEDROOM",          // Z typu
    "REQ-THERMAL-COMFORT",           // Z typu
    "REQ-ACCESSIBILITY-WHEELCHAIR"   // Z instancji
  ]
}
```

**Wynik:** Tablica zostaje scalona — instancja otrzymuje wymagania typu + własne wymagania.

---

## Scalanie vs Zastępowanie

Kompilator zachowuje się inaczej w zależności od typu pola:

### Scalanie Obiektów (Obiekty)

**Pola typu obiekt** (np. `finishes`, `equipment`, `occupancyProfile`) są **scalane** — można nadpisać niektóre klucze zachowując inne.

**Przykład:**
```yaml
# Typ definiuje
finishes:
  floor: "Deska dębowa"
  walls: "Tynk biały"
  ceiling: "Sufit napinany"

# Instancja nadpisuje
finishes:
  floor: "Płytki"  # Nadpisuje tylko podłogę

# Wynik: floor="Płytki", walls+ceiling z typu
```

### Scalanie Tablic (Tablice)

**Pola typu tablica** (np. `requirements`, `tags`) są **scalane** — instancja otrzymuje elementy typu + własne elementy.

**Przykład:**
```yaml
# Typ definiuje
requirements:
  - "REQ-DAYLIGHT"
  - "REQ-ACOUSTIC"

# Instancja dodaje
requirements:
  - "REQ-ACCESSIBILITY"

# Wynik: wszystkie 3 wymagania
```

### Zastępowanie Skalarów (Liczby, Stringi, Boole)

**Pola skalarne** (np. `designHeight`, `designArea`, `spaceType`) są **zastępowane** — jawna wartość w instancji całkowicie zastępuje wartość typu lub kondygnacji.

**Przykład:**
```yaml
# Kondygnacja definiuje
typicalCeilingHeight: 2.70

# Przestrzeń nadpisuje
designHeight: 2.40  # Całkowicie zastępuje 2.70

# Wynik: designHeight = 2.40 (jawna wartość wygrywa)
```

---

## Pełne Drzewo Pierwszeństwa z Przykładami

### Przykład 1: Wysokość (Skalar)

**Kolejność pierwszeństwa (od najwyższego):**
1. **Instancja Przestrzeni** → `designHeight: 2.40`
2. Typ Przestrzeni → brak `areaGuidelines.targetHeight`
3. **Kondygnacja** → `typicalCeilingHeight: 2.70`
4. Budynek → brak `typicalCeilingHeight`
5. Działka → nie dotyczy

**Wynik:** Używany `designHeight: 2.40` (jawna wartość instancji wygrywa).

### Przykład 2: Wykończenia (Obiekt)

**Kolejność pierwszeństwa:**
1. **Instancja Przestrzeni** → `finishes.floor: "Płytki"`
2. **Typ Przestrzeni** → `finishes.floor: "Deska dębowa"`, `finishes.walls: "Tynk biały"`
3. **Kondygnacja** → `typicalFinishes.ceiling: "Sufit napinany"`

**Wynik (scalony obiekt):**
```json
{
  "floor": "Płytki",          // Instancja nadpisuje
  "walls": "Tynk biały",      // Z typu (instancja nie nadpisuje)
  "ceiling": "Sufit napinany" // Z kondygnacji (typ nie definiuje)
}
```

### Przykład 3: Wymagania (Tablica)

**Kolejność pierwszeństwa:**
1. **Instancja Przestrzeni** → `requirements: ["REQ-ACCESSIBILITY"]`
2. **Typ Przestrzeni** → `requirements: ["REQ-DAYLIGHT", "REQ-ACOUSTIC"]`
3. Kondygnacja → brak pola requirements
4. Budynek → `requirements: ["REQ-FIRE-SAFETY"]`

**Wynik (scalona tablica):**
```json
{
  "requirements": [
    "REQ-DAYLIGHT",       // Z typu
    "REQ-ACOUSTIC",       // Z typu
    "REQ-ACCESSIBILITY",  // Z instancji
    "REQ-FIRE-SAFETY"     // Z budynku
  ]
}
```

**Kolejność scalania:** Typ → Instancja → Budynek (najbardziej specyficzne pierwsze).

---

## Śledzenie Pochodzenia: Pole `_meta`

Dla każdej wartości dziedziczonej, kompilator dodaje pole `_meta` aby śledzić **skąd wartość pochodzi**.

### Przykład Pochodzenia

**Przestrzeń:**
```yaml
# spaces/bedroom-01.md
levelId: "LVL-01"
# Brak jawnego designHeight
```

**Skompilowana Przestrzeń:**
```json
{
  "id": "SP-BLD-01-L01-001",
  "designHeight": 2.70,
  "designHeight_meta": {
    "confidence": "specified",
    "source": "LVL-01",
    "sourceFile": "levels/level-01.md",
    "sourceField": "typicalCeilingHeight",
    "inheritanceChain": ["level"]
  }
}
```

**Interpretacja:**
- `designHeight: 2.70` przyszło z `LVL-01` (kondygnacja nadrzędna)
- Oryginalne pole to `typicalCeilingHeight` w `levels/level-01.md`
- `inheritanceChain: ["level"]` oznacza wartość odziedziczoną z kondygnacji

---

## Kiedy NIE Dziedziczyć

Czasem chcesz **zapobiec dziedziczeniu** i wymusić jawną wartość. Użyj tych wzorców:

### Wzorzec 1: Jawne Null

Ustaw pole na `null` aby jawnie oznaczyć "brak wartości" (zapobiega dziedziczeniu z typu lub kondygnacji).

```yaml
# spaces/storage-room.md
designHeight: null  # Jawnie brak wysokości (nie dziedziczy z kondygnacji)
```

**Wynik:** Pole `designHeight` nie zostanie wypełnione (pozostaje puste, nie dziedziczy).

### Wzorzec 2: Jawna Pusta Tablica

Ustaw tablicę na `[]` aby wyczyścić odziedziczone elementy tablicy.

```yaml
# spaces/minimal-space.md
requirements: []  # Jawnie brak wymagań (nie dziedziczy z typu)
```

**Wynik:** Pole `requirements` pozostaje puste (nie scalane z typem).

---

## Wspólne Wzorce

### Wzorzec 1: Standardowe Pomieszczenia + Wyjątki

**Użycie:** 50 sypialni z tą samą wysokością sufitu, ale łazienki mają 2,40 m.

**Podejście:**
1. Ustaw `typicalCeilingHeight: 2.70` na kondygnacji
2. Wszystkie sypialnie dziedziczą automatycznie
3. Nadpisz `designHeight: 2.40` w plikach łazienek

**Przykład:**
```yaml
# levels/level-01.md
typicalCeilingHeight: 2.70

# spaces/bedroom-01.md → bedroom-50.md
levelId: "LVL-01"
# Dziedziczy designHeight: 2.70

# spaces/bathroom-01.md
levelId: "LVL-01"
designHeight: 2.40  # Nadpisuje dla łazienki
```

### Wzorzec 2: Szablon Typu + Indywidualne Dostosowania

**Użycie:** 20 biur o standardowych wykończeniach, ale pokój konferencyjny potrzebuje wykładziny akustycznej.

**Podejście:**
1. Zdefiniuj `ST-OFFICE-STANDARD` z typowymi wykończeniami
2. Wszystkie biura odnoszą się do typu
3. Nadpisz `finishes.walls` w pokoju konferencyjnym

**Przykład:**
```yaml
# templates/space-types/office-standard.md
finishes:
  floor: "Wykładzina szara"
  walls: "Tynk biały"
  ceiling: "Płyty akustyczne"

# spaces/office-01.md → office-20.md
spaceTypeId: "ST-OFFICE-STANDARD"
# Dziedziczy wszystkie wykończenia

# spaces/conference-room.md
spaceTypeId: "ST-OFFICE-STANDARD"
finishes:
  walls: "Panele akustyczne"  # Nadpisuje tylko ściany
# floor + ceiling z typu
```

### Wzorzec 3: Łączenie Kondygnacji + Typ

**Użycie:** Kondygnacja definiuje wysokość, typ przestrzeni definiuje wykończenia i wymagania.

**Kolejność pierwszeństwa:**
1. Instancja przestrzeni (najwyższe)
2. Typ przestrzeni
3. Kondygnacja
4. Budynek
5. Działka (najniższe)

**Przykład:**
```yaml
# levels/level-01.md
typicalCeilingHeight: 2.70
typicalFinishes:
  ceiling: "Sufit napinany"

# templates/space-types/bedroom-a.md
finishes:
  floor: "Deska dębowa"
  walls: "Tynk biały"
requirements:
  - "REQ-DAYLIGHT"
  - "REQ-ACOUSTIC"

# spaces/bedroom-01.md
spaceTypeId: "ST-BEDROOM-A"
levelId: "LVL-01"
requirements:
  - "REQ-ACCESSIBILITY"  # Dodatkowe wymaganie

# Skompilowany wynik:
# - designHeight: 2.70 (z kondygnacji)
# - finishes.floor: "Deska dębowa" (z typu)
# - finishes.walls: "Tynk biały" (z typu)
# - finishes.ceiling: "Sufit napinany" (z kondygnacji)
# - requirements: wszystkie 3 (2 z typu + 1 z instancji)
```

---

## Rozwiązywanie Problemów

### Problem: Nie widzę dziedziczonej wartości

**Możliwe przyczyny:**
1. Pole kondygnacji ma inną nazwę (np. `typicalCeilingHeight` → `designHeight`)
2. Instancja ma jawną wartość (nawet `null` zapobiega dziedziczeniu)
3. `levelId` jest nieprawidłowy (wskazuje na nieistniejącą kondygnację)
4. Pole nie jest w mapie dziedziczenia (np. `roomNumber` nie dziedziczy)

**Rozwiązanie:**
- Sprawdź `_meta.inheritanceChain` w skompilowanym wyjściu
- Zweryfikuj mapę pól w tym przewodniku
- Upewnij się, że `levelId` pasuje do `level.id`

### Problem: Wartość typu nadpisuje wartość kondygnacji

**Przyczyna:** Pierwszeństwo — **typ przestrzeni** > **kondygnacja**.

**Przykład:**
```yaml
# Kondygnacja
typicalCeilingHeight: 2.70

# Typ przestrzeni
areaGuidelines:
  targetHeight: 2.40  # To wygrywa

# Instancja
spaceTypeId: "ST-BATHROOM"
levelId: "LVL-01"

# Wynik: designHeight = 2.40 (typ > kondygnacja)
```

**Rozwiązanie:** Jeśli potrzebujesz wartości kondygnacji, nie definiuj `targetHeight` w typie lub jawnie ustaw `designHeight` w instancji.

### Problem: Scalanie tablic duplikuje wymagania

**Przyczyna:** To samo `requirementId` występuje zarówno w typie, jak i instancji.

**Przykład:**
```yaml
# Typ
requirements:
  - "REQ-DAYLIGHT"

# Instancja
requirements:
  - "REQ-DAYLIGHT"  # Duplikat!

# Wynik: ["REQ-DAYLIGHT", "REQ-DAYLIGHT"] (duplikat)
```

**Rozwiązanie:** Kompilator **nie** deduplikuje tablic. Unikaj powtarzania wymagań typu w instancji.

---

## Zobacz Także

- **[Słownik](/pl/standardy/slownik)** — Definicje `instanceValue`, `typeValue`, `levelValue`, `merged`
- **[Proweniencja Danych](/pl/przewodniki/proweniencja-danych)** — Śledzenie pochodzenia wartości z `_meta`
- **[Dokumentacja Przestrzeni](/pl/dokumentacja/encje/przestrzen)** — Jak przestrzenie dziedziczą z kondygnacji
- **[Dokumentacja Typu Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** — Jak przestrzenie dziedziczą z typów

::: tip Kluczowe Wnioski
1. **Jawna > Odziedziczona** — wartość instancji zawsze wygrywa
2. **Typ > Kondygnacja** — typ przestrzeni ma wyższe pierwszeństwo niż kondygnacja
3. **Obiekty skalają, skalary zastępują** — obiekty i tablice scalają się, liczby/stringi zastępują
4. **Sprawdź `_meta`** — pokazuje skąd wartość pochodzi i łańcuch dziedziczenia
:::
