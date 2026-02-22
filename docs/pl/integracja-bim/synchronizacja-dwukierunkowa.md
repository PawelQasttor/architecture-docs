# Przebieg synchronizacji dwukierunkowej

Kompletny przewodnik dotyczacy synchronizacji miedzy modelami BIM (IFC) a dokumentacja w formacie markdown.

## Przeglad

Standard Dokumentacji Architektonicznej umozliwia dwukierunkowy przeplyw danych:

- **BIM -> Markdown**: Ekstrakcja danych elementow z modeli IFC do dokumentacji
- **Markdown -> BIM** *(przyszla wersja)*: Aktualizacja wlasciwosci BIM na podstawie specyfikacji

Tworzy to jedno zrodlo prawdy istniejace w obu formatach:
- Modele BIM dla geometrii i koordynacji 3D
- Markdown dla specyfikacji i zgodnosci z przepisami

---

## Wymagania wstepne

### Wymagane oprogramowanie

**Dla BIM -> Markdown:**
- Python 3.8 lub nowszy
- Biblioteka IfcOpenShell
- Procesor YAML

**Instalacja:**
```bash
cd bim-sync/
pip install -r requirements.txt
```

**Dla modeli BIM:**
- Revit, ArchiCAD lub inne narzedzie BIM
- Mozliwosc eksportu IFC 4.0
- Konfiguracja zestawow wlasciwosci

---

## Przebieg 1: BIM -> Markdown (Ekstrakcja)

Ekstrakcja specyfikacji elementow budowlanych z modeli IFC do dokumentacji markdown.

### Krok 1: Przygotowanie modelu BIM

**W Revit:**
1. Upewnij sie, ze elementy maja prawidlowe nazwy typow
2. Uzupelnij zestawy wlasciwosci (Psets):
   - Pset_WallCommon
   - Pset_SlabCommon
   - Itp.
3. Dodaj warstwy materialowe
4. Zweryfikuj, czy obmiary sa obliczone

**W ArchiCAD:**
1. Skonfiguruj mapowanie wlasciwosci
2. Upewnij sie, ze klasyfikacje IFC sa ustawione
3. Uzupelnij wlasciwosci elementow
4. Skonfiguruj warstwy materialowe

### Krok 2: Eksport IFC

**Ustawienia eksportu:**
- **Format**: IFC 4.0 (lub IFC 2x3)
- **Dolacz**: Zestawy wlasciwosci
- **Dolacz**: Zestawy obmiarowe
- **Dolacz**: Definicje materialow
- **Dolacz**: Informacje o typach

**Eksport z Revit:**
```
Plik > Eksportuj > IFC
- Wersja IFC: IFC 4
- Zestawy wlasciwosci: Eksportuj zestawienia jako zestawy wlasciwosci
- Poziom szczegolow: Sredni lub Wysoki
```

**Eksport z ArchiCAD:**
```
Plik > Zapisz jako > IFC
- Wersja: IFC 4
- Translator: Upewnij sie, ze Psets sa mapowane
- Geometria: Szczegolowa
```

### Krok 3: Konwersja do Markdown

```bash
# Przejdz do katalogu bim-sync
cd bim-sync/

# Konwertuj wszystkie sciany, stropy, okna, drzwi
python ifc-to-markdown.py ../path/to/building.ifc

# Wynik: ./output/IfcWall/*.md, ./output/IfcSlab/*.md, itp.
```

**Opcje zaawansowane:**
```bash
# Tylko okreslone typy obiektów
python ifc-to-markdown.py building.ifc --entity IfcWall --entity IfcSlab

# Niestandardowy katalog wyjsciowy
python ifc-to-markdown.py building.ifc --output ../docs/elements/

# Uzycie niestandardowej konfiguracji
python ifc-to-markdown.py building.ifc --config my-config.yaml
```

### Krok 4: Przeglad wygenerowanej dokumentacji

Kazdy wygenerowany plik markdown zawiera:

**Naglowek YAML:**
```yaml
---
documentType: "element_specification"
elementType: "wall"
ifcMapping:
  ifcEntity: "IfcWall"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
thermalPerformance:
  calculatedUValue: 0.18
  unit: "W/(m²·K)"
---
```

**Tresc Markdown:**
- Informacje IFC (obiekt, GUID)
- Zestawy wlasciwosci (tabele)
- Obmiary (tabele)
- Warstwy materialowe (tabela)
- Pola zgodnosci z przepisami

### Krok 5: Wzbogacenie dokumentacji

Dodaj informacje niedostepne w modelu BIM:

1. **Zgodnosc z przepisami**:
   ```yaml
   regulatoryCompliance:
     - standard: "WT_2021"
       section: "§ 328"
       status: "compliant"
   ```

2. **Szczegolowe specyfikacje**:
   - Szczegoly producenta
   - Instrukcje montazu
   - Procedury kontroli jakosci
   - Certyfikaty badan

3. **Obliczenia**:
   - Obliczenia ochrony cieplnej
   - Weryfikacje konstrukcyjne
   - Dokumentacja odpornosci ogniowej

### Krok 6: Kontrola wersji

```bash
# Sprawdz, co sie zmienilo
git diff

# Przejrzyj zmiany
git status

# Zatwierdz zaktualizowana dokumentacje
git add docs/elements/
git commit -m "Aktualizacja specyfikacji z modelu BIM v2.3"

# Oznacz wersje
git tag -a v2.3 -m "Dokumentacja modelu BIM v2.3"
```

---

## Przebieg 2: Markdown -> BIM *(Przyszla wersja)*

Aktualizacja wlasciwosci modelu BIM na podstawie specyfikacji markdown.

### Koncepcja

```bash
# Parsowanie specyfikacji markdown
python markdown-to-ifc.py wall-spec.md

# Generowanie pliku aktualizacji wlasciwosci IFC
# Wynik: wall-updates.ifc

# Import do narzedzia BIM
# Wlasciwosci zaktualizowane, geometria bez zmian
```

**Przypadki uzycia:**
- Aktualizacja wspolczynnikow U z obliczen
- Dodanie klas odpornosci ogniowej z certyfikatow
- Aktualizacja specyfikacji materialowych
- Dodanie danych zgodnosci z przepisami

**Status:** Przyszla wersja

---

## Strategia synchronizacji dwukierunkowej

### Co gdzie sie znajduje

**Model BIM (autorytet geometrii):**
- Geometria 3D
- Relacje przestrzenne
- Obmiary (automatyczne)
- Podstawowe wlasciwosci (typ, wymiary)

**Dokumentacja Markdown (autorytet specyfikacji):**
- Szczegolowe specyfikacje
- Zgodnosc z przepisami
- Obliczenia i uzasadnienia
- Instrukcje montazu
- Procedury kontroli jakosci
- Certyfikaty badan i dopuszczenia

**Dane synchronizowane:**
- Specyfikacje materialowe
- Parametry cieplne (wspolczynniki U)
- Klasy odpornosci ogniowej
- Parametry akustyczne
- Podstawowe wlasciwosci elementow

### Czestotliwosc synchronizacji

**Zalecany przebieg pracy:**

| Faza projektu | Czestotliwosc synchronizacji | Kierunek |
|---------------|------------------------------|----------|
| **Projekt koncepcyjny** | Co tydzien | BIM -> MD (poczatkowa) |
| **Projekt schematyczny** | Co tydzien | BIM -> MD |
| **Projekt budowlany** | Co dwa tygodnie | BIM -> MD |
| **Dokumentacja wykonawcza** | W razie potrzeby | BIM -> MD |
| **Budowa** | Co miesiac | Oba kierunki |
| **Powykonawcza** | Koncowa | BIM -> MD (zweryfikowana) |

---

## Konfiguracja

### Ustawienia config.yaml

**Mapowanie obiektów:**
```yaml
entity_mappings:
  IfcWall:
    document_type: "element_specification"
    extract_properties:
      - Pset_WallCommon.LoadBearing
      - Pset_WallCommon.ThermalTransmittance
    extract_materials: true
    extract_layers: true
```

**Mapowanie przepisow:**
```yaml
regulatory_mappings:
  thermal_performance:
    ifc_property: "Pset_WallCommon.ThermalTransmittance"
    regulation: "WT_2021"
    section: "§ 328"
    max_value: 0.20
```

---

## Najlepsze praktyki

### 1. Stosowanie spojnego nazewnictwa

**W BIM:**
- Uzywaj znaczacych nazw typow: "ExternalWall_TypeA" a nie "Wall 1"
- Stosuj spojne typy obiektow
- Wypelniaj parametr Reference

**W Markdown:**
- Uzywaj tych samych nazw co w BIM
- Odwoluj sie do identyfikatorow GUID IFC
- Linkuj powiazane dokumenty

### 2. Utrzymanie zestawow wlasciwosci

**Niezbedne zestawy Pset:**
- Pset_WallCommon - Wszystkie sciany
- Pset_SlabCommon - Wszystkie stropy
- Pset_WindowCommon - Wszystkie okna
- Pset_DoorCommon - Wszystkie drzwi

**Wypelnij kluczowe wlasciwosci:**
- LoadBearing
- IsExternal
- FireRating
- ThermalTransmittance

### 3. Wersjonowanie wszystkiego

**Modele BIM:**
```
building_v1.0.ifc
building_v1.1.ifc
building_v2.0.ifc
```

**Dokumentacja:**
```bash
git tag v1.0 -m "Dokumentacja projektu schematycznego"
git tag v2.0 -m "Dokumentacja projektu budowlanego"
```

### 4. Przeglad przed zatwierdzeniem

```bash
# Zawsze przegladaj zmiany
git diff

# Sprawdz poprawnosc naglowkow YAML
npm run validate:examples

# Zweryfikuj listy kontrolne zgodnosci
# Upewnij sie, ze obliczenia sa zaktualizowane
```

### 5. Oddzielenie edycji recznych

**Strategia:**
- Sekcje generowane automatycznie: Moga byc nadpisywane
- Sekcje reczne: Przechowuj w oddzielnych plikach lub wyraznie oznaczonych blokach

**Przyklad:**
```markdown
<!-- AUTO-GENERATED: Nie edytuj ponizej tej linii -->
## Wlasciwosci IFC
[Tresc generowana automatycznie]

<!-- TRESC RECZNA: Edytuj ponizej -->
## Instrukcje montazu
[Tresc reczna chroniona przed regeneracja]
```

---

## Rozwiazywanie problemow

### "Nie znaleziono elementow w IFC"

**Sprawdz:**
- Plik IFC jest prawidlowy (otworz w przegladarce)
- Nazwa typu obiektu jest poprawna (IfcWall a nie Ifc_Wall)
- Elementy faktycznie istnieja w modelu
- Ustawienia eksportu obejmowaly elementy

### "Brakujace zestawy wlasciwosci"

**Napraw w narzedziu BIM:**
- Revit: Uzupelnij wlasciwosci typow
- ArchiCAD: Sprawdz mapowanie wlasciwosci
- Upewnij sie, ze eksport Pset jest wlaczony

### "Warstwy materialowe nie zostaly wyodrebnione"

**Wymagania:**
- Material musi byc typu IfcMaterialLayerSet
- Warstwy musza miec grubosci
- Material musi byc przypisany do typu

### "Zmiany utracone po regeneracji"

**Rozwiazanie:**
- Nie edytuj sekcji generowanych automatycznie
- Dodawaj tresc reczna w oddzielnych sekcjach
- Uzywaj Git do sledzenia i laczenia zmian
- Rozwazyj selektywna regeneracje

---

## Zaawansowane przebiegi pracy

### Selektywna synchronizacja

```bash
# Aktualizuj tylko sciany, ktore sie zmienily
python ifc-to-markdown.py building.ifc \
  --entity IfcWall \
  --filter "ExternalWall_Type*"

# Tylko konkretna kondygnacja
python ifc-to-markdown.py building.ifc \
  --entity IfcWall \
  --filter-story "Level 1"
```

### Aktualizacje oparte na porownaniu

```bash
# Eksportuj biezaca wersje
python ifc-to-markdown.py building_v1.ifc -o v1/

# Eksportuj nowa wersje
python ifc-to-markdown.py building_v2.ifc -o v2/

# Porownaj
diff -r v1/ v2/

# Polacz istotne zmiany
```

### Integracja z CI/CD

```yaml
# .github/workflows/sync-bim.yml
name: Synchronizacja dokumentacji BIM
on:
  push:
    paths:
      - '**.ifc'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Konfiguracja Python
        uses: actions/setup-python@v2
      - name: Instalacja zaleznosci
        run: pip install -r bim-sync/requirements.txt
      - name: Synchronizacja dokumentacji
        run: python bim-sync/ifc-to-markdown.py models/*.ifc
      - name: Zatwierdzenie zmian
        run: |
          git add docs/
          git commit -m "Automatyczna synchronizacja z modelu BIM"
          git push
```

---

## Nastepne kroki

- [Referencja obiektów IFC](/pl/integracja-bim/encje-ifc)
- [Definicje LOD](/pl/integracja-bim/definicje-lod)
- [Przyklad: Budynek Zielony Taras](/pl/przyklady/zielony-taras/)

---

## Zasoby

- **IfcOpenShell**: http://ifcopenshell.org/
- **Specyfikacja IFC**: https://standards.buildingsmart.org/IFC/
- **Narzedzia synchronizacji BIM**: katalog `/bim-sync/` w repozytorium
