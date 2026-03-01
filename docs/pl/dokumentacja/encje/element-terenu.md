# Element Terenu (Krajobraz / Parking / Zielona Infrastruktura)

## Czym Jest

Plik **Elementu Terenu** opisuje element krajobrazowy, parking, zieloną infrastrukturę, element odwodnienia lub inny element na poziomie działki. Elementy terenu są powiązane z nadrzędną działką i mogą odwoływać się do typu elementu terenu.

::: tip Dla Architektów
**Problem:** Plany zagospodarowania terenu, układy parkingów i obliczenia odwodnienia są na oddzielnych rysunkach. Gdy audytor zrównoważonego rozwoju pyta "Jaka jest łączna powierzchnia przepuszczalna?" — mierzysz z wielu rysunków.

**Stary sposób:** Plan zagospodarowania (PDF), układ parkingu (DWG), obliczenia odwodnienia (Excel), schemat nasadzeń (Word).

**Z elementami terenu:** Jeden plik na element. Powierzchnia, materiały, wskaźniki zrównoważonego rozwoju, harmonogram konserwacji — wszystko ustrukturyzowane i odczytywalne maszynowo.

**Jeden plik elementu terenu = kompletna specyfikacja z danymi o zrównoważonym rozwoju.**
:::

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|---------|
| `id` | string | Unikalny ID (prefiks `SF-`) | `"SF-GARDEN-01"` |
| `entityType` | string | Musi być `"site_feature"` | `"site_feature"` |
| `featureName` | string | Czytelna nazwa | `"Ogród Północny"` |
| `featureCategory` | string | Klasyfikacja | `"vegetation"` |
| `siteId` | string | Nadrzędna działka | `"SITE-GREEN-TERRACE"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Kategorie Elementów Terenu

| Kategoria | Opis |
|-----------|------|
| `vegetation` | Ogrody, nasadzenia, drzewa, trawniki |
| `hardscape` | Nawierzchnie, chodniki, tarasy |
| `water_feature` | Stawy, fontanny, ogrody deszczowe |
| `parking` | Parkingi |
| `playground` | Place zabaw |
| `fencing` | Ogrodzenia i bramy |
| `drainage` | Odwodnienie powierzchniowe, kanały |
| `lighting` | Oświetlenie zewnętrzne |
| `suds` | Systemy zrównoważonego odwodnienia |
| `green_infrastructure` | Zielone dachy, żywe ściany, bioswale |

## Wzorzec Typ / Instancja

Zdefiniuj wspólne specyfikacje w **Typie Elementu Terenu** (`site_feature_type`) i odwołuj się z instancji przez `siteFeatureTypeId`.

## Przykład

Zobacz przykład Zielony Taras: [Ogród Północny](/pl/przyklady/zielony-taras/elementy-terenu/sf-ogrod-polnocny), [Parking](/pl/przyklady/zielony-taras/elementy-terenu/sf-parking)
