# Przegląd Integracji BIM

Standard Dokumentacji Architektonicznej integruje się płynnie z przepływami pracy Building Information Modeling (BIM), umożliwiając dwukierunkową synchronizację między czytelną dla człowieka dokumentacją markdown a modelami BIM opartymi na IFC.

## Strategia Integracji

### Hybrydowa Synchronizacja Metadanych

- **Narzędzia BIM** (Revit, ArchiCAD) = Źródło prawdy dla **geometrii/projektu**
- **Dokumentacja Markdown** = Źródło prawdy dla **specyfikacji/zgodności/wymagań**
- **Synchronizacja właściwości i metadanych**, nie geometrii

To podejście umożliwia:
- ✅ Modele BIM pozostają autorytatywne dla geometrii 3D
- ✅ Dokumentacja zapewnia czytelne specyfikacje
- ✅ Zmiany w którymkolwiek systemie mogą aktualizować drugi
- ✅ Pełna ścieżka audytu poprzez Git dla zmian w dokumentacji

---

## Tekstowa Reprezentacja Danych BIM

Zamiast wymagać oprogramowania BIM do przeglądania specyfikacji, reprezentuj dane budowlane w markdown:

```markdown
## Element Budynku: Ściana Zewnętrzna Typ A

**Mapowanie IFC:**
- Obiekt: `IfcWallStandardCase`
- ObjectType: `ScianZewnetrzna_TypA`
- GUID: `3vB2YO$rLBxv3VxEu2LPxQ`

**Właściwości (Pset_WallCommon):**
| Właściwość | Wartość | Jednostka |
|-----------|---------|-----------|
| LoadBearing | Tak | - |
| IsExternal | Tak | - |
| ThermalTransmittance | 0.24 | W/m²K |
| FireRating | REI 60 | - |

**Struktura Warstw:**
1. Tynk zewnętrzny (15mm)
2. Bloczek betonowy (200mm)
3. Izolacja XPS (150mm)
4. Szczelina powietrzna (40mm)
5. Płyta gipsowa (12.5mm)
```

Ten format jest:
- ✅ Czytelny dla człowieka
- ✅ Parsowalny przez AI
- ✅ Kontrolowalny wersjonowanie (Git)
- ✅ Kompatybilny z BIM (odniesienia IFC)

---

## Przepływy Pracy Dwukierunkowej Synchronizacji

### BIM → Markdown (Eksport)

Wyodrębnianie danych z modeli BIM do tworzenia/aktualizacji dokumentacji:

```bash
# Eksport IFC z Revit/ArchiCAD
Plik > Eksport > IFC 4.0

# Uruchom skrypt synchronizacji
python bim-sync/ifc-to-markdown.py building.ifc

# Przejrzyj zmiany w Git
git diff

# Zatwierdź zaktualizowaną dokumentację
git add . && git commit -m "Aktualizacja specyfikacji z modelu BIM"
```

**Przypadki użycia:**
- Generowanie dokumentacji z istniejących modeli BIM
- Aktualizacja specyfikacji po zmianach projektowych
- Tworzenie dokumentacji powykonawczej
- Wyodrębnianie ilości i właściwości

### Markdown → BIM (Import)

Aktualizacja właściwości modelu BIM ze specyfikacji w dokumentacji:

```bash
# Edytuj specyfikacje w markdown
vim docs/specifications/wall-type-a.md

# Wygeneruj aktualizację właściwości IFC
python bim-sync/markdown-to-ifc.py wall-type-a.md

# Importuj do Revit/ArchiCAD
# (Właściwości zaktualizowane, geometria niezmieniona)
```

**Przypadki użycia:**
- Aktualizacja właściwości BIM z obliczeń
- Dodawanie klas ogniowych z certyfikatów
- Aktualizacja specyfikacji materiałowych
- Dodawanie danych zgodności z przepisami

### SBM → IFC (Generowanie)

Generowanie prawidłowego pliku IFC4 ze skompilowanych danych SBM JSON, możliwego do otwarcia w dowolnej przeglądarce IFC:

```bash
# Wygeneruj IFC z danych SBM
python bim-sync/sbm-to-ifc.py \
  --input build/green-terrace/sbm.json \
  --output build/green-terrace/green-terrace.ifc
```

**Co generuje:**
- Hierarchia przestrzenna: IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey
- IfcSpace z geometrią wielokąta (z danych `geometry.outline`)
- IfcWall wzdłuż granic pomieszczeń (ściany wewnętrzne/zewnętrzne wykrywane automatycznie)
- IfcSlab — płyta podłogowa pokrywająca obrys kondygnacji
- IfcDoor + IfcOpeningElement dla połączeń między przestrzeniami
- IfcZone grupujące przestrzenie, zestawy właściwości (Pset_SBM_Space, Pset_SBM_Zone)

**Przypadki użycia:**
- Wizualizacja danych przestrzennych SBM w 3D
- Walidacja układów pomieszczeń i sąsiedztw
- Generowanie IFC do koordynacji z narzędziami BIM
- Szybkie prototypowanie przed szczegółowym modelowaniem BIM

---

## Wsparcie Obiektów IFC

Standard zawiera kompleksową dokumentację dla typowych obiektów IFC:

- **IfcWall** / IfcWallStandardCase
- **IfcSlab** / IfcSlabStandardCase
- **IfcBeam** / IfcColumn
- **IfcWindow** / IfcDoor
- **IfcSpace** / IfcZone
- **IfcMaterial** / IfcMaterialLayerSet

Każdy obiekt zawiera:
- Zestawy właściwości (Psets)
- Wspólne atrybuty
- Relacje
- Przykładowe reprezentacje markdown

---

## Poziom Rozwoju (LOD)

Standard mapuje wymagania dokumentacji do poziomów LOD BIM:

| LOD | Geometria | Informacja | Poziom Dokumentacji |
|-----|-----------|------------|---------------------|
| **LOD 100** | Koncepcyjna | Ogólna | Specyfikacje wysokiego poziomu |
| **LOD 200** | Przybliżona | Systemy ogólne | Specyfikacje typów |
| **LOD 300** | Precyzyjna | Konkretne zespoły | Szczegółowe specyfikacje |
| **LOD 400** | Wykonawcza | Kompletne specyfikacje | Dokumentacja budowlana |
| **LOD 500** | Powykonawcza | Zweryfikowane dane | Zapisy powykonawcze |

[Szczegółowe definicje LOD →](/pl/integracja-bim/definicje-lod)

---

## Narzędzia i Skrypty

### IfcOpenShell (Python)

Standardowa biblioteka branżowa do parsowania IFC:

```python
import ifcopenshell

# Otwórz plik IFC
ifc_file = ifcopenshell.open("building.ifc")

# Pobierz wszystkie ściany
walls = ifc_file.by_type("IfcWall")

# Wyodrębnij właściwości
for wall in walls:
    psets = ifcopenshell.util.element.get_psets(wall)
    # Generuj markdown...
```

### IFC.js (JavaScript/Web)

Przeglądarka IFC oparta na przeglądarce dla dokumentacji:

```vue
<template>
  <IFCViewer :src="/examples/building.ifc" />
</template>
```

---

## Następne Kroki

- 📖 [Obiekty IFC →](/pl/integracja-bim/encje-ifc)
- 📏 [Definicje LOD →](/pl/integracja-bim/definicje-lod)
- 🔄 [Synchronizacja Dwukierunkowa →](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- Konfiguracja Narzędzi (planowane)

---

## Zasoby

- **IfcOpenShell**: http://ifcopenshell.org/
- **Specyfikacja IFC**: https://standards.buildingsmart.org/IFC/
- **Narzędzia Synchronizacji BIM**: katalog `/bim-sync/` w repozytorium
