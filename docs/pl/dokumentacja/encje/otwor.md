# Otwór (Okno / Drzwi / Świetlik)

## Czym Jest

Plik **Otworu** opisuje pojedyncze okno, drzwi, świetlik, nawiew lub panel rewizyjny w elemencie przegrody. Otwory zostały przeniesione z tablic wbudowanych w plikach przegród do samodzielnych encji w wersji 1.1.

::: tip Dla Architektów
**Problem:** Zestawienia okien, zestawienia drzwi i protokoły przeglądów drzwi pożarowych są w oddzielnych arkuszach. Gdy inspektor pożarowy pyta "Które drzwi mają EI 30 i kiedy były ostatnio sprawdzone?" — szukasz w wielu dokumentach.

**Stary sposób:** Zestawienie okien w Excelu, zestawienie drzwi w kolejnym Excelu, certyfikaty drzwi pożarowych w folderze, wartości U w obliczeniach energetycznych.

**Z otworami:** Jeden plik na otwór. Parametry termiczne, akustyczne, pożarowe, osprzęt, dostępność, konserwacja — wszystko w jednym miejscu. Kompilator łączy go z przegrodą, kondygnacją i pomieszczeniami.

**Jeden plik otworu = kompletna specyfikacja okna/drzwi ze śledzeniem konserwacji.**
:::

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|---------|
| `id` | string | Unikalny ID otworu (prefiks `OPN-`) | `"OPN-WIN-N-001"` |
| `entityType` | string | Musi być `"opening"` | `"opening"` |
| `openingName` | string | Czytelna nazwa | `"Okno Sypialni Północne 01"` |
| `openingCategory` | string | Klasyfikacja | `"window"` |
| `envelopeId` | string | Nadrzędna przegroda | `"ENV-EW-01"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

## Kategorie Otworów

| Kategoria | Encja IFC | Opis |
|-----------|-----------|------|
| `window` | IfcWindow | Okna standardowe |
| `door` | IfcDoor | Drzwi rozwierne, przesuwne |
| `glazed_door` | IfcDoor | Drzwi w pełni przeszklone |
| `rooflight` | IfcWindow | Okna dachowe |
| `skylight` | IfcWindow | Świetliki |
| `vent` | IfcOpeningElement | Otwory wentylacyjne |
| `access_panel` | IfcOpeningElement | Panele rewizyjne |
| `louvre` | IfcOpeningElement | Żaluzje |

## Wzorzec Typ / Instancja

Zdefiniuj wspólne specyfikacje w **Typie Otworu** (`opening_type`) i odwołuj się z instancji przez `openingTypeId`. Instancje dziedziczą właściwości typu, ale mogą nadpisać każde pole.

```yaml
# Typ Otworu (szablon)
entityType: opening_type
id: OT-INTERNORM-KF410
openingTypeName: "Internorm KF 410"
category: window

# Instancja Otworu
entityType: opening
id: OPN-WIN-N-001
openingName: "Okno Sypialni Północne 01"
openingCategory: window
openingTypeId: "OT-INTERNORM-KF410"
envelopeId: "ENV-EW-01"
```

## Bezpieczeństwo Pożarowe: Drzwi Przeciwpożarowe

Otwory z polem `firePerformance` są śledzone jako **krytyczne dla bezpieczeństwa** przez etap jakości. Kompilator oznacza otwory z oceną ogniową o poziomie pewności poniżej `"measured"`.

## Przykład

Zobacz przykład Zielony Taras: [Okno N-001](/pl/przyklady/zielony-taras/otwory/opn-win-n-001), [Drzwi Pożarowe](/pl/przyklady/zielony-taras/otwory/opn-door-stair-01)
