# Referencja Bledow

Kompilator SBM emituje **bledy** (blokujace kompilacje) i **ostrzezenia** (informacyjne, nie blokuja). Ta strona wymienia wszystkie kody bledow i ostrzezen wedlug kategorii.

## Bledy Walidacji Schematu

Emitowane gdy frontmatter encji nie przechodzi walidacji JSON Schema wzgledem `schemas/sbm-schema-v1.1.json`.

| Blad | Przyczyna | Rozwiazanie |
|------|-----------|-------------|
| Brak wymaganego pola | Wymagane pole jest nieobecne we frontmatter | Dodaj pole. Sprawdz dokumentacje encji |
| Nieprawidlowy typ | Wartosc pola ma zly typ danych | Popraw typ wartosci |
| Nieprawidlowa wartosc enum | Wartosc spoza dozwolonego zbioru | Sprawdz schemat |
| Nieprawidlowy wzorzec ID | ID nie pasuje do oczekiwanego prefiksu | Uzyj poprawnego prefiksu: `SP-`, `AST-`, `OPN-`, `CP-`, itp. |
| Dodatkowe wlasciwosci | Nieznane pole we frontmatter | Usun lub zmien nazwe pola |

**Przyklad:**
```
ERROR [schema] SP-BLD-01-L01-001: must have required property 'spaceName'
```

---

## Bledy Integralnosci Referencyjnej

Emitowane gdy encja odwoluje sie do ID, ktore nie istnieje w skompilowanym modelu.

| Sprawdzenie | Pole/Pola | Opis |
|-------------|-----------|------|
| Przestrzen → Typ | `spaceTypeId` | Typ przestrzeni musi istniec |
| Przestrzen → Kondygnacja | `levelId` | Kondygnacja musi istniec |
| Przestrzen → Budynek | `buildingId` | Budynek musi istniec |
| Przestrzen → Strefy | `zoneIds[]` | Kazda strefa musi istniec |
| Strefa → Typ | `zoneTypeId` | Typ strefy musi istniec |
| System → Typ | `systemTypeId` | Typ systemu musi istniec |
| Zasob → Typ | `assetTypeId` | Typ zasobu musi istniec |
| Zasob → System | `systemId` | System musi istniec |
| Otwor → Przegroda | `envelopeId` | Przegroda musi istniec |
| Otwor → Typ | `openingTypeId` | Typ otworu musi istniec |
| Element Terenu → Dzialka | `siteId` | Dzialka musi istniec |
| Element Terenu → Typ | `siteFeatureTypeId` | Typ elementu terenu musi istniec |
| Pakiet Budowlany | `dependencies[].packageId` | Pakiet zaleznosci musi istniec |
| Dowolna → Pakiet | `constructionPackageId` | Pakiet budowlany musi istniec |

**Przyklad:**
```
ERROR [ref] Opening OPN-WIN-N-001 references envelope ENV-MISSING which does not exist
```

---

## Ostrzezenia Regul Biznesowych

Ostrzezenia o potencjalnych problemach z jakoscia danych. Nie blokuja kompilacji.

| Ostrzezenie | Opis | Rozwiazanie |
|-------------|------|-------------|
| Brak przypisania strefy | Przestrzen nie ma `zoneIds` | Przypisz przestrzen do strefy |
| Brak wymagan | Przestrzen nie ma wymagan | Dodaj wymagania |
| Koszt bez powierzchni | Przestrzen ma powierzchnie, ale brak kosztorysu | Dodaj dane kosztowe |
| Duplikat w strefie | Przestrzen w wielu strefach tego samego typu | Przejrzyj przypisania stref |

---

## Bledy Cyklicznych Zaleznosci

Emitowane przy wykryciu odwolan cyklicznych.

| Sprawdzenie | Opis |
|-------------|------|
| Hierarchia systemow | Lancuch cykliczny `parentSystemId` → `subsystemIds` |
| Pakiety budowlane | Lancuch cykliczny `dependencies[].packageId` |

Kompilator raportuje sciezke cyklu: np. `CP-A → CP-B → CP-C → CP-A`.

---

## Ostrzezenia Proweniencji

Emitowane gdy sledzenie proweniencji danych jest niekompletne.

| Ostrzezenie | Warunek | Rozwiazanie |
|-------------|---------|-------------|
| Wymagane zrodlo | `_meta.confidence` to `measured`/`calculated`/`specified`, ale brak `_meta.source` | Dodaj `source` do `_meta` |
| Null bez wyjasnienia | Pole ma wartosc `null` bez adnotacji `_meta` | Dodaj `_meta` z `confidence: "unknown"` |

---

## Bledy Bramek Fazowych

Wymuszane na podstawie `projectPhase` projektu. Scislosc rosnie w pozniejszych fazach.

| Faza | Regula | Waznosc |
|------|--------|---------|
| 1-3 (Inicjacja → Szkic) | Akceptowane wszystkie poziomy pewnosci | -- |
| 4 (Projekt Budowlany) | Pola `assumed` oznaczane | Ostrzezenie |
| 5-6 (Dokumentacja/Budowa) | Pola `assumed` blokowane | **Blad** |
| 7-8 (Powyk./Przekazanie) | `estimated` na polach bezpieczenstwa blokowane | **Blad** |

**Pola krytyczne dla bezpieczenstwa** (z `scripts/compiler/constants.mjs`):
- `electricalSafetyGroup`, `radiologicalShielding`, `fireRating`, `structuralLoad`, `pressurization`, `shielding`, `firePerformance`
- Srodowiskowe: `pressurization`, `cleanlinessClass`, `pressureDifferentialPa`, `filtrationClass`, `airChangesPerHour`

---

## Zobacz takze

- **[Potok Kompilacji](/pl/dokumentacja/kompilator/potok)** - Pelna dokumentacja potoku
- **[Przeglad Kompilatora](/pl/dokumentacja/kompilator/)** - Architektura wysokiego poziomu
- **[Pierwsze Kroki](/pl/dokumentacja/kompilator/pierwsze-kroki)** - Pierwsza kompilacja
