# Działka (Teren Inwestycji)

## Czym To Jest

**Plik Działki** opisuje teren, na którym stoi budynek: powierzchnia działki, odległości od granic, przyłącza mediów, warunki gruntowe, ograniczenia zabudowy. Tworzysz **jeden plik działki na projekt** (lub na działkę, jeśli projekt obejmuje wiele parcel).

::: tip Dla Architektów
**Problem:** Dane o terenie rozproszone po mapach katastralnych, opiniach geotechnicznych, decyzjach o warunkach zabudowy, badaniach przyłączy.

**Stary sposób:** Szukaj w 6 różnych PDF-ach odległości od granicy lub nośności gruntu.

**Z plikiem działki:** Wszystkie ograniczenia terenu, przyłącza i topografia w jednym miejscu. Kompilator automatycznie łączy budynki z ich działką.

**Jeden plik działki = wszystkie dane o terenie w jednym miejscu.**
:::

**Działka** (Site) reprezentuje parcelę gruntową — fizyczny kontekst, na którym umieszczane są budynki. Zawiera ograniczenia zabudowy, dostępność mediów, topografię i lokalizację geograficzną.

## Przeznaczenie

Działki definiują:
- Granice i powierzchnie działki (całkowita, zabudowy, zieleni)
- Ograniczenia zabudowy (odległości od granic, limity wysokości, współczynniki zabudowy)
- Przyłącza mediów na granicy działki
- Topografię i dane geotechniczne
- Współrzędne geograficzne i adres
- Oznaczenie w planie miejscowym (MPZP, WZ, plan zagospodarowania)

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator działki | `"SITE-GREEN-TERRACE"` |
| `entityType` | string | Musi być `"site"` | `"site"` |
| `siteName` | string | Nazwa czytelna dla ludzi | `"Działka Green Terrace"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator działki z prefiksem `SITE-`
- **siteName**: Nazwa terenu inwestycji („Działka Green Terrace")
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 3 pól.** Dodaj adres, powierzchnię, ograniczenia w miarę zbierania danych.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `address` | object | Adres (street, city, postalCode, region, country) |
| `location` | object | Współrzędne GPS (latitude, longitude, elevation) |
| `siteArea` | number | Całkowita powierzchnia działki w m² |
| `buildableArea` | number | Powierzchnia zabudowy w m² |
| `greenArea` | number | Wymagana powierzchnia zieleni w m² |
| `buildingIds` | array | Auto-obliczane: budynki na tej działce |
| `siteConstraints` | array | Odległości, służebności, strefy ochronne, tereny zalewowe |
| `utilities` | array | Przyłącza: woda, kanalizacja, prąd, gaz |
| `topography` | object | Rzędna, nachylenie, typ gruntu, nośność, poziom wód gruntowych |
| `zoningDesignation` | object | Oznaczenie w planie miejscowym (MPZP, WZ, itp.) |
| `cost` | object | Koszty związane z terenem |
| `ifcMapping` | object | Mapowanie IFC (IfcSite) |
| `tags` | array | Dowolne tagi klasyfikujące |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Do pozwolenia na budowę:**
- **address** — Adres do korespondencji urzędowej
- **siteArea** — Powierzchnia działki (z pomiaru katastralnego)
- **buildableArea** — Powierzchnia zabudowy po odległościach
- **zoningDesignation** — Numer MPZP lub WZ
- **siteConstraints** — Odległości od granic wg MPZP

**Do projektowania:**
- **topography** — Rzędna, nachylenie, typ gruntu
- **utilities** — Co jest dostępne na granicy
- **location** — Współrzędne GPS do analiz nasłonecznienia

**Najczęściej:** Zacznij od adresu, siteArea i siteConstraints. Dodaj topografię i przyłącza po dostarczeniu badań geotechnicznych i uzgodnień gestorów sieci.
:::

## Ograniczenia Zabudowy

Ograniczenia opisują co limituje Twój projekt:

```yaml
siteConstraints:
  - type: "setback"
    direction: "north"
    distance: 4.0
    regulation: "MPZP §12.3"

  - type: "height_limit"
    value: "25m"
    regulation: "MPZP §8.1"

  - type: "coverage_limit"
    value: "40%"
    regulation: "MPZP §9.2"

  - type: "heritage_zone"
    description: "Strefa buforowa konserwatora - 50m od zabytku"
    regulation: "WKZ/2024/1234"
```

**Typy ograniczeń:** `setback` (odległość od granicy), `easement` (służebność), `heritage_zone` (strefa konserwatorska), `flood_zone` (teren zalewowy), `environmental` (środowiskowe), `height_limit` (limit wysokości), `coverage_limit` (limit zabudowy), `other` (inne)

## Przyłącza Mediów

Śledź co jest dostępne na granicy działki:

```yaml
utilities:
  - type: "water"
    connectionPoint: "granica_północna"
    capacity: "DN100"
    provider: "MPWiK Warszawa"
    status: "available"

  - type: "electrical"
    connectionPoint: "granica_wschodnia"
    capacity: "40kW"
    provider: "innogy Stoen"
    status: "available"

  - type: "district_heating"
    connectionPoint: "granica_zachodnia"
    capacity: "120 kW"
    provider: "Veolia Warszawa"
    status: "requires_extension"
```

**Typy mediów:** `water` (woda), `sewage` (kanalizacja), `stormwater` (deszczówka), `electrical` (prąd), `gas` (gaz), `district_heating` (ciepło sieciowe), `telecom` (telekomunikacja), `fiber` (światłowód)

**Statusy:** `available` (dostępne), `planned` (planowane), `requires_extension` (wymaga rozbudowy), `unavailable` (niedostępne)

## Oznaczenie w Planie

Dla projektów w Polsce — typowo MPZP lub decyzja WZ:

```yaml
zoningDesignation:
  planType: "mpzp"
  planReference: "MPZP Mokotów Stegny, Uchwała Nr XLII/1234/2023"
  allowedUse:
    - "residential_multifamily"
    - "services"
  maxHeight: 25
  maxCoverage: 0.4
  maxFAR: 2.5
  minGreenRatio: 0.25
```

**Typy planów:** `mpzp` (plan miejscowy), `wz` (warunki zabudowy), `zoning_ordinance`, `development_plan`, `other`

## Przykład: Minimalny Plik Działki

```markdown
Plik: site.md

---
id: "SITE-GREEN-TERRACE"
entityType: "site"
siteName: "Działka Green Terrace"
siteArea: 1250
address:
  street: "ul. Słoneczna 45"
  city: "Warszawa"
  postalCode: "02-495"
  country: "PL"
version: "1.0.0"
---

# Działka: Green Terrace

Działka 1 250 m² przy ul. Słonecznej, Warszawa.
```

## Jak Działka Łączy Się z Innymi Encjami

```
Działka (Green Terrace)
  └─ Budynek (Green Terrace Apartments)  ← przez building.siteId
      └─ Kondygnacja (Parter)
          └─ Przestrzeń (Sypialnia 01)
```

Budynki odwołują się do swojej działki polem `siteId`:

```yaml
# W building.md
---
id: "BLD-01"
entityType: "building"
siteId: "SITE-GREEN-TERRACE"  # ← łączy z działką
buildingName: "Green Terrace Apartments"
---
```

Kompilator automatycznie oblicza odwrotność: tablica `buildingIds` działki zawiera wszystkie budynki, które się do niej odwołują.

## Mapowanie BIM

Działki mapują się na encje **IfcSite**:

| Pole SBM | Właściwość IFC |
|----------|---------------|
| `id` | `Pset_SBM_Site.SBM_ID` |
| `siteName` | `Name` |
| `siteArea` | `Pset_SiteCommon.TotalArea` |
| `location.latitude` | `RefLatitude` |
| `location.longitude` | `RefLongitude` |
| `location.elevation` | `RefElevation` |

## Śledzenie Kosztów

Kompilator wykonuje hierarchiczny zbiorczy koszt:

```
przestrzenie → kondygnacje → budynki → działki → projekt
```

Jeśli działka ma budynki ze zbiorczymi kosztami, suma działki jest obliczana automatycznie.

## Zobacz Też

- **[Budynek](/pl/dokumentacja/encje/budynek)** — Budynki należą do działek
- **[Kondygnacja](/pl/dokumentacja/encje/poziom)** — Kondygnacje należą do budynków
- **[Kompilator](/pl/dokumentacja/kompilator/)** — Kompilacja na poziomie działki
