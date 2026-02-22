# Przewodnik tworzenia

Semantyczny Model Budynku wykorzystuje **przyjazny dla człowieka Markdown z nagłówkiem YAML** do tworzenia kart budynku. Ten przewodnik pokazuje, jak tworzyć przestrzenie, strefy, wymagania, systemy i zasoby.

## Dlaczego Markdown + YAML?

Tradycyjne tworzenie BIM odbywa się całkowicie w narzędziach wizualnych (Revit, ArchiCAD). SBM oddziela **intencję semantyczną** (co budynek powinien robić) od **implementacji geometrycznej** (jak wygląda).

**Korzyści:**
- **Przyjazność dla kontroli wersji** - Śledź zmiany za pomocą Git
- **Odczytywalność przez AI** - Modele LLM mogą generować i modyfikować karty
- **Czytelność dla człowieka** - Architekci mogą bezpośrednio czytać i edytować
- **Napędzane kompilatorem** - Automatyczna walidacja i synchronizacja z BIM

## Przepływ pracy tworzenia

```
1. Wybierz typ karty
   ↓
2. Skopiuj szablon
   ↓
3. Wypełnij nagłówek YAML
   ↓
4. Dodaj opis Markdown
   ↓
5. Skompiluj i zwaliduj
   ↓
6. Przejrzyj wyniki
```

## Szybki start

Stwórzmy przestrzeń sypialni:

### Krok 1: Utwórz plik

```bash
# Utwórz plik w swoim projekcie
touch docs/en/examples/my-project/spaces/bedroom-01.md
```

### Krok 2: Dodaj nagłówek YAML

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
projectPhase: "design_development"
bimLOD: "LOD_300"

spaceName: "Bedroom 01"
spaceType: "sleeping_space"
buildingId: "BLD-01"
levelId: "LVL-01"
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

designArea: 14.5
designHeight: 2.70
unit: "m"

requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"

version: "1.0.0"
tags:
  - "residential"
  - "sleeping"
---

# Bedroom 01

Standard bedroom with north-facing window providing natural daylight.

## Design Parameters

- Floor area: 14.5 m²
- Clear height: 2.70 m
- Window area: 3.2 m² (22% of floor area)

## Requirements

This space must satisfy:
- Minimum daylight factor 2% (EN 17037)
- Acoustic Class B insulation (ISO 140-4)
- Room height ≥ 2.50 m (WT 2021 § 132)
```

### Krok 3: Skompiluj

```bash
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --output build/my-project \
  --country PL \
  --verbose
```

### Krok 4: Przejrzyj wyniki

```bash
# Sprawdź model kanoniczny
cat build/my-project/sbm.json | jq '.entities.spaces[0]'

# Sprawdź zgodność
cat build/my-project/compliance_report.json | jq '.summary'
```

## Typy kart

Wybierz odpowiedni typ karty dla tego, co dokumentujesz:

| Typ karty | Kiedy używać | Szablon |
|-----------|--------------|---------|
| **Przestrzeń** | Pomieszczenia, obszary funkcjonalne | [Szablon Przestrzeni](/pl/dokumentacja/tworzenie/szablony#space) |
| **Strefa** | Strefy pożarowe, HVAC, akustyczne, bezpieczeństwa | [Szablon Strefy](/pl/dokumentacja/tworzenie/szablony#zone) |
| **Wymaganie** | Reguły wydajnościowe, zgodność regulacyjna | [Szablon Wymagania](/pl/dokumentacja/tworzenie/szablony#requirement) |
| **Instalacja** | Systemy MEP (HVAC, elektryczny, hydrauliczny) | [Szablon Instalacji](/pl/dokumentacja/tworzenie/szablony#system) |
| **Urządzenie** | Fizyczne urządzenia z danymi konserwacyjnymi | [Szablon Urządzenia](/pl/dokumentacja/tworzenie/szablony#asset-instance) |
| **Budynek** | Metadane na poziomie budynku | [Szablon Budynku](/pl/dokumentacja/tworzenie/szablony#building) |
| **Kondygnacja** | Informacje o piętrze/kondygnacji | [Szablon Kondygnacji](/pl/dokumentacja/tworzenie/szablony#level) |

## Reguły nagłówka YAML

### Wymagane pola

Każda karta **musi** zawierać:

```yaml
---
documentType: "space"   # Kategoria karty
entityType: "space"     # Typ karty
id: "SP-BLD-01-L01-001" # Unikalny identyfikator
version: "1.0.0"        # Wersja semantyczna
---
```

### Konwencje nazewnictwa ID

Używaj hierarchicznych, czytelnych ID:

| Karta | Format | Przykład |
|-------|--------|---------|
| Budynek | `BLD-{seq}` | `BLD-01` |
| Kondygnacja | `LVL-{seq}` | `LVL-01` |
| Przestrzeń | `SP-{budynek}-{kondygnacja}-{seq}` | `SP-BLD-01-L01-001` |
| Strefa | `ZONE-{typ}-{deskryptor}` | `ZONE-FIRE-ZL-IV` |
| Instalacja | `SYS-{kategoria}-{seq}` | `SYS-HVAC-01` |
| Urządzenie | `AI-{typ}-{seq}` | `AI-AHU-01` |
| Wymaganie | `REQ-{zakres}-{deskryptor}-{seq}` | `REQ-DAYLIGHT-SLEEPING-001` |

### Typy danych

```yaml
# String
spaceName: "Bedroom 01"

# Liczba
designArea: 14.5

# Boolean
maintenanceRequired: true

# Tablica
zoneIds:
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"

# Obiekt
occupancy:
  maxOccupants: 2
  usagePattern: "residential_sleeping"

# Data (ISO 8601)
installationDate: "2026-08-15"
```

### Jednostki

Zawsze podawaj jednostki dla pomiarów:

```yaml
# Długość
designHeight: 2.70
unit: "m"  # lub "mm", "cm"

# Powierzchnia
designArea: 14.5
areaUnit: "m2"  # lub "m²", "ft2"

# Objętość
designVolume: 39.15
volumeUnit: "m3"  # lub "m³", "ft3"

# Temperatura
temperature: 21.5
temperatureUnit: "C"  # lub "°C", "F"
```

## Treść Markdown

Po nagłówku dodaj dokumentację czytelną dla człowieka:

```markdown
---
# Nagłówek YAML tutaj
---

# Nazwa karty

Krótki opis karty.

## Sekcja 1

Szczegóły dotyczące karty...

## Sekcja 2

Więcej szczegółów...
```

**Najlepsze praktyki:**
- **Nagłówek 1 (`#`)** - Nazwa karty
- **Nagłówek 2 (`##`)** - Główne sekcje
- **Punktory** - Listy wymagań, cech
- **Tabele** - Specyfikacje techniczne
- **Linki** - Odwołania do innych kart lub dokumentów zewnętrznych

## Relacje między kartami

Karty odwołują się do siebie za pomocą ID:

### Referencje wprzód (definiujesz sam)

```yaml
# Przestrzeń odwołuje się do rodzica i stref
space:
  id: "SP-BLD-01-L01-001"
  buildingId: "BLD-01"           # Budynek nadrzędny
  levelId: "LVL-01"              # Kondygnacja nadrzędna
  zoneIds:                       # Strefy zawierające tę przestrzeń
    - "ZONE-FIRE-ZL-IV"
    - "ZONE-HVAC-NORTH"
  requirements:                  # Wymagania dla tej przestrzeni
    - "REQ-DAYLIGHT-SLEEPING-001"

# Zasób odwołuje się do systemu nadrzędnego
asset:
  id: "AI-AHU-01"
  systemId: "SYS-HVAC-01"        # System nadrzędny
```

### Referencje wsteczne (obliczane automatycznie)

Kompilator automatycznie oblicza odwrotne relacje:

```yaml
# Strefa automatycznie otrzymuje listę zawartych przestrzeni
zone:
  id: "ZONE-FIRE-ZL-IV"
  spaceIds:  # Obliczone automatycznie z space.zoneIds
    - "SP-BLD-01-L01-001"
    - "SP-BLD-01-L01-002"

# System automatycznie otrzymuje listę zasobów
system:
  id: "SYS-HVAC-01"
  assetInstanceIds:  # Obliczone automatycznie z asset.systemId
    - "AI-AHU-01"
    - "AI-VAV-01"

# Kondygnacja automatycznie otrzymuje listę przestrzeni
level:
  id: "LVL-01"
  spaceIds:  # Obliczone automatycznie z space.levelId
    - "SP-BLD-01-L01-001"
    - "SP-BLD-01-L01-002"
```

**Dlaczego to ważne:** Definiujesz naturalne relacje (przestrzeń → strefa), a kompilator automatycznie wypełnia odwrotne wyszukiwania.

## Organizacja plików

Organizuj karty według typu w podkatalogach:

```
docs/en/examples/my-project/
├── building.md                 # Metadane budynku
├── levels/
│   ├── level-01.md
│   ├── level-02.md
│   └── level-roof.md
├── spaces/
│   ├── bedroom-01.md
│   ├── bedroom-02.md
│   ├── living-room-01.md
│   └── kitchen-01.md
├── zones/
│   ├── fire-zone-zl-iv.md
│   ├── hvac-zone-north.md
│   └── acoustic-zone-night.md
├── systems/
│   ├── sys-hvac-01.md
│   ├── sys-elec-01.md
│   └── sys-plumbing-01.md
└── assets/
    ├── ai-ahu-01.md
    ├── ai-vav-01.md
    └── ai-pump-01.md
```

**Korzyści:**
- Łatwe znajdowanie kart
- Przejrzysta struktura projektu
- Przyjazność dla Git (jedna karta na plik = minimalne konflikty przy scalaniu)

## Walidacja podczas tworzenia

Użyj flagi `--validate-only` kompilatora, aby sprawdzić błędy bez generowania wyników.

> **Uwaga terminologiczna:** W standardzie SBM każdy zapis dokumentujący element budynku (przestrzeń, strefę, wymaganie itd.) nazywamy **kartą**.

```bash
# Szybkie sprawdzenie walidacji
node scripts/compiler/index.mjs compile \
  --input docs/en/examples/my-project \
  --country PL \
  --validate-only
```

**Typowe błędy walidacji:**

### Brakujące wymagane pola
```
[ERROR] Space SP-BLD-01-L01-001:
  - Missing required field: spaceType
```

**Poprawka:** Dodaj wymagane pole:
```yaml
spaceType: "sleeping_space"
```

### Nieprawidłowe referencje
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid zoneId: ZONE-FIRE-INVALID (does not exist)
```

**Poprawka:** Użyj poprawnego ID strefy lub utwórz referencjonowaną kartę strefy.

### Nieprawidłowe wartości enum
```
[ERROR] Space SP-BLD-01-L01-001:
  - Invalid spaceType: "dormitory" (expected one of: sleeping_space, bedroom, ...)
```

**Poprawka:** Użyj prawidłowej wartości enum z dokumentacji kart.

## Wersjonowanie kart

Używaj wersjonowania semantycznego dla kart:

```yaml
version: "1.0.0"  # Major.Minor.Patch
```

**Kiedy inkrementować:**
- **Major (1.0.0 → 2.0.0)** - Zmiany łamiące (zmiana ID, zmiana typu karty)
- **Minor (1.0.0 → 1.1.0)** - Dodane nowe pola
- **Patch (1.0.0 → 1.0.1)** - Korekty, poprawki literówek

## Następne kroki

- **[Tworzenie kart](/pl/dokumentacja/tworzenie/tworzenie-encji)** - Szczegółowy przewodnik dla każdego typu karty
- **[Szablony kart](/pl/dokumentacja/tworzenie/szablony)** - Szablony do kopiowania
- **[Referencja kart](/pl/dokumentacja/encje/)** - Pełna dokumentacja pól
- **[Przewodnik kompilatora](/pl/dokumentacja/kompilator/)** - Kompilowanie kart
