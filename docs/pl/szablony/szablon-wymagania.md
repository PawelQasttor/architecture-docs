# Szablon Karty Wymagania

Uzyj tego szablonu do dokumentowania wymagan wydajnosciowych, ograniczen regulacyjnych i zasad projektowych.

## Plik szablonu

**Wzorzec nazwy pliku:** `requirements/[zakres]/req-[nazwa].md`
**Przyklad:** `requirements/global/req-daylight-sleeping-001.md`
**Przyklad:** `requirements/pl/req-pl-wt-room-height-001.md`

**Zakresy:**
- `global/` - Wymagania uniwersalne, majace zastosowanie we wszystkich krajach
- `pl/` - Wymagania specyficzne dla Polski (WT 2021, Prawo budowlane)
- `de/` - Wymagania specyficzne dla Niemiec (w przyszlosci)
- `fr/` - Wymagania specyficzne dla Francji (w przyszlosci)

---

## Szablon frontmatter YAML

```yaml
---
documentType: "requirement"
entityType: "requirement"
id: "REQ-[SCOPE]-[NAME]-[SEQ]"  # Przyklad: REQ-DAYLIGHT-SLEEPING-001

# Identyfikacja wymagania
requirementName: "Opisowa nazwa wymagania"
requirementType: "typ"  # performance | dimensional | operational | regulatory | safety | functional
countryScope: "global"  # global | poland_specific | eu_specific

# Zastosowalnosc
scope:
  entityType: "rodzaj_karty"  # space | zone | system | asset | element
  spaceTypes:  # Jesli dotyczy konkretnych typow przestrzeni
    - "typ_przestrzeni_1"
    - "typ_przestrzeni_2"
  # LUB
  spaceIds:  # Jesli dotyczy konkretnych przestrzeni
    - "SP-[SPACE-ID]"

# Kryteria wydajnosciowe
metric: "nazwa_metryki"  # daylight_factor_percent | room_height_clear | temperature | itp.
operator: ">="  # >= | <= | == | > | < | != | in_range
value: 0.0  # Wartosc liczbowa, lancuch znakow lub obiekt z min/max
unit: "jednostka"  # %, m, C, dB, W/m2K, itp.
tolerance: 0.0  # Opcjonalna tolerancja

# Weryfikacja
verification:
  method: "metoda"  # simulation | calculation | measurement | inspection | testing | certification | sensor
  tool: "Nazwa narzedzia (opcjonalnie)"
  standard: "Referencja standardu"  # EN_17037, WT_2021, itp.
  phase:
    - "concept"
    - "design_development"
  frequency: "czestotliwosc"  # once_per_design_revision | annually | itp.
  responsible: "rola"  # architect | engineer | consultant | contractor

# Podstawa prawna/techniczna
legalBasis:  # Opcjonalnie
  - regulation: "Nazwa przepisu"
    section: "Sekcja"
    article: "Artykul"
    description: "Opis"

technicalBasis:  # Opcjonalnie
  - standard: "Nazwa standardu"
    section: "Sekcja"
    description: "Opis"

# Metadane
version: "1.0.0"
---

# Wymaganie: [Nazwa Wymagania]

## Cel

Wyjasnienie, dlaczego to wymaganie istnieje i co ma na celu osiagnac.

## Cel wydajnosciowy

- Jasne okreslenie kryteriow wydajnosciowych
- Mierzone w [lokalizacja/warunki]
- W warunkach [konkretne warunki]

## Metoda weryfikacji

1. Procedura weryfikacji krok po kroku
2. Wymagane narzedzia lub metody
3. Kryteria akceptacji

## Strategie naprawcze

Jesli wymaganie nie jest spelnione:
- Strategia 1
- Strategia 2
- Strategia 3

## Referencje

- Link do odpowiednich standardow
- Link do przewodnikow projektowych
- Link do metod obliczeniowych
```
