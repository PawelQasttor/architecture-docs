---
documentType: "technical_reference"
subject: "IFC_entities"
ifcVersion: "IFC4"
lastUpdated: "2026-02-20"
language: "pl"
---

# Referencja obiektów IFC

Kompleksowa dokumentacja referencyjna najczesciej stosowanych obiektów IFC (Industry Foundation Classes) w architektonicznych modelach BIM.

## Przeglad

Obiekty IFC reprezentuja komponenty budynku w ustandaryzowanym, maszynowo-czytelnym formacie. Niniejsza dokumentacja przedstawia sposob opisywania tych obiektów w formacie markdown zapewniajacym czytelnosc dla czlowieka przy jednoczesnym zachowaniu kompatybilnosci z BIM.

---

## IfcWall / IfcWallStandardCase

Reprezentuje sciany w modelach budynkow.

### Hierarchia obiektów

```
IfcRoot
  └─ IfcObjectDefinition
      └─ IfcObject
          └─ IfcProduct
              └─ IfcElement
                  └─ IfcBuildingElement
                      └─ IfcWall
                          └─ IfcWallStandardCase
```

### Typowe zestawy wlasciwosci (Psets)

#### Pset_WallCommon

Standardowe wlasciwosci dla wszystkich scian:

| Wlasciwosc | Typ | Opis | Przyklad |
|-------------|-----|------|----------|
| **LoadBearing** | Boolean | Czy sciana jest nosna? | true |
| **IsExternal** | Boolean | Czy sciana jest zewnetrzna? | true |
| **FireRating** | String | Klasa odpornosci ogniowej | "REI 60" |
| **ThermalTransmittance** | Real | Wspolczynnik U [W/(m2·K)] | 0,18 |
| **AcousticRating** | Integer | Izolacyjnosc akustyczna [dB] | 55 |
| **Reference** | String | Referencja typu sciany | "EW-01" |
| **Status** | Enum | Status budowy | "EXISTING" |
| **ExtendToStructure** | Boolean | Przedluzenie do konstrukcji powyzej? | true |

### Szablon dokumentacji

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
---

## Sciana zewnetrzna - Typ A

### Wlasciwosci IFC

**Obiekt:** `IfcWallStandardCase`
**Typ obiektu:** ExternalWall_TypeA
**GUID:** 3vB2YO$rLBxv3VxEu2LPxQ

### Pset_WallCommon

| Wlasciwosc | Wartosc | Jednostka |
|-------------|---------|-----------|
| LoadBearing | Tak | - |
| IsExternal | Tak | - |
| FireRating | REI 60 | - |
| ThermalTransmittance | 0,18 | W/(m2·K) |
| AcousticRating | 55 | dB |
| Reference | EW-01 | - |

### Zestaw warstw materialowych

**IfcMaterialLayerSet:** ExternalWall_TypeA_Layers

| Warstwa # | Material | Grubosc | Lambda cieplna |
|-----------|----------|---------|----------------|
| 1 | Tynk zewnetrzny | 15 mm | 0,82 W/(m·K) |
| 2 | Bloczek betonowy | 200 mm | 0,55 W/(m·K) |
| 3 | Izolacja XPS | 180 mm | 0,035 W/(m·K) |
| 4 | Szczelina powietrzna | 40 mm | - |
| 5 | Plyta gipsowo-kartonowa | 12,5 mm | 0,21 W/(m·K) |

**Calkowita grubosc:** 447,5 mm
```

### Wlasciwosci zaawansowane

#### Obmiary (Qto_WallBaseQuantities)

| Wlasciwosc | Typ | Opis |
|-------------|-----|------|
| **Length** | Real | Dlugosc sciany [m] |
| **Width** | Real | Grubosc sciany [m] |
| **Height** | Real | Wysokosc sciany [m] |
| **GrossFootprintArea** | Real | Powierzchnia rzutu brutto [m2] |
| **NetFootprintArea** | Real | Powierzchnia rzutu netto (po odliczeniu otworow) [m2] |
| **GrossSideArea** | Real | Calkowita powierzchnia boczna [m2] |
| **NetSideArea** | Real | Powierzchnia boczna netto [m2] |
| **GrossVolume** | Real | Objetosc calkowita [m3] |
| **NetVolume** | Real | Objetosc netto [m3] |

---

## IfcSlab / IfcSlabStandardCase

Reprezentuje stropy, dachy i spoczniki schodowe.

### Hierarchia obiektów

```
IfcRoot
  └─ IfcObjectDefinition
      └─ IfcObject
          └─ IfcProduct
              └─ IfcElement
                  └─ IfcBuildingElement
                      └─ IfcSlab
                          └─ IfcSlabStandardCase
```

### Typy plyt (PredefinedType)

| Typ | Opis |
|-----|------|
| **FLOOR** | Standardowa plyta stropowa |
| **ROOF** | Plyta dachowa |
| **LANDING** | Spocznik schodowy |
| **BASESLAB** | Plyta fundamentowa |
| **APPROACH_SLAB** | Plyta najazdowa lub rampowa |

### Typowe zestawy wlasciwosci

#### Pset_SlabCommon

| Wlasciwosc | Typ | Opis | Przyklad |
|-------------|-----|------|----------|
| **LoadBearing** | Boolean | Czy plyta jest nosna? | true |
| **IsExternal** | Boolean | Czy plyta jest zewnetrzna? | false |
| **FireRating** | String | Odpornosc ogniowa | "REI 60" |
| **ThermalTransmittance** | Real | Wspolczynnik U [W/(m2·K)] | 0,14 |
| **AcousticRating** | Integer | Izolacyjnosc akustyczna [dB] | 58 |
| **Reference** | String | Referencja typu stropu | "FL-01" |
| **PitchAngle** | Real | Kat spadku [stopnie] | 0,0 |

### Szablon dokumentacji

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcSlabStandardCase"
  objectType: "FloorSlab_TypeA"
  predefinedType: "FLOOR"
bimLOD: "LOD_400"
---

## Strop - Typ A (Kondygnacja typowa)

### Wlasciwosci IFC

**Obiekt:** `IfcSlabStandardCase`
**Typ predefiniowany:** FLOOR
**Typ obiektu:** FloorSlab_TypeA

### Pset_SlabCommon

| Wlasciwosc | Wartosc | Jednostka |
|-------------|---------|-----------|
| LoadBearing | Tak | - |
| IsExternal | Nie | - |
| FireRating | REI 60 | - |
| ThermalTransmittance | N/D | - |
| AcousticRating | 58 | dB |
| Reference | FL-01 | - |

### Zestaw warstw materialowych

**IfcMaterialLayerSet:** FloorSlab_TypeA_Layers

| Warstwa # | Material | Grubosc |
|-----------|----------|---------|
| 1 | Plytki ceramiczne | 10 mm |
| 2 | Wylewka cementowa | 50 mm |
| 3 | Izolacja akustyczna | 30 mm |
| 4 | Zelbetowa plyta stropowa | 200 mm |
| 5 | Tynk sufitowy | 15 mm |

**Calkowita grubosc:** 305 mm
```

### Zbrojenie (dla stropow zelbetowych)

```markdown
### Specyfikacja zbrojenia

**Wlasciwosci IfcReinforcingBar:**

| Warstwa | Srednica pretu | Rozstaw | Kierunek |
|---------|---------------|---------|----------|
| Dolna | fi 12 mm | co 150 mm | Podluzny |
| Dolna | fi 12 mm | co 200 mm | Poprzeczny |
| Gorna | fi 10 mm | co 200 mm | Podluzny |
| Gorna | fi 10 mm | co 250 mm | Poprzeczny |

**Otulina:** 25 mm (dol), 20 mm (gora)
**Klasa betonu:** C30/37
```

---

## IfcWindow

Reprezentuje okna w modelach budynkow.

### Typowe wlasciwosci

#### Pset_WindowCommon

| Wlasciwosc | Typ | Opis | Przyklad |
|-------------|-----|------|----------|
| **Reference** | String | Referencja typu okna | "W-01" |
| **FireRating** | String | Odpornosc ogniowa | "E 30" |
| **AcousticRating** | Integer | Izolacyjnosc akustyczna [dB] | 35 |
| **ThermalTransmittance** | Real | Wspolczynnik U [W/(m2·K)] | 0,80 |
| **GlazingAreaFraction** | Real | Udzial powierzchni przeszklenia | 0,75 |
| **IsExternal** | Boolean | Czy jest zewnetrzne? | true |

### Szablon dokumentacji

```markdown
---
documentType: "element_specification"
ifcMapping:
  ifcEntity: "IfcWindow"
  objectType: "Window_TypeA"
---

## Okno - Typ A

### Wlasciwosci IFC

**Obiekt:** `IfcWindow`
**Typ obiektu:** Window_TypeA

### Pset_WindowCommon

| Wlasciwosc | Wartosc | Jednostka |
|-------------|---------|-----------|
| Reference | W-01 | - |
| ThermalTransmittance | 0,80 | W/(m2·K) |
| AcousticRating | 35 | dB |
| GlazingAreaFraction | 0,75 | - |
| IsExternal | Tak | - |

### Wymiary

- **Szerokosc:** 1 200 mm
- **Wysokosc:** 1 400 mm
- **Glebokosc ramy:** 70 mm

### Przeszklenie

- **Typ:** Szyba dwukomorowa, niskoemisyjna
- **Szyba:** 4 mm + 16 mm argon + 4 mm
- **Wspolczynnik U (srodek):** 1,1 W/(m2·K)
- **Wspolczynnik U (cala jednostka):** 0,80 W/(m2·K)
```

---

## IfcDoor

Reprezentuje drzwi w modelach budynkow.

### Typowe wlasciwosci

#### Pset_DoorCommon

| Wlasciwosc | Typ | Opis |
|-------------|-----|------|
| **Reference** | String | Referencja typu drzwi |
| **FireRating** | String | Odpornosc ogniowa |
| **AcousticRating** | Integer | Izolacyjnosc akustyczna [dB] |
| **ThermalTransmittance** | Real | Wspolczynnik U [W/(m2·K)] |
| **IsExternal** | Boolean | Czy jest zewnetrzne? |
| **HandicapAccessible** | Boolean | Dostepne dla wozka inwalidzkiego? |

---

## Wykorzystanie obiektów IFC w dokumentacji

### Kompletny przyklad elementu budowlanego

```markdown
---
documentType: "element_specification"
elementType: "external_wall"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "WT_2021"
    section: "§ 234"
---

## Sciana zewnetrzna - Typ A

### Informacje BIM

**Obiekt IFC:** `IfcWallStandardCase`
**Typ obiektu:** ExternalWall_TypeA
**GUID:** 3vB2YO$rLBxv3VxEu2LPxQ
**LOD:** 400 (Dokumentacja wykonawcza)

### Wlasciwosci (Pset_WallCommon)

| Wlasciwosc | Wartosc | Jednostka | Zgodnosc |
|-------------|---------|-----------|----------|
| LoadBearing | Tak | - | - |
| IsExternal | Tak | - | - |
| ThermalTransmittance | 0,18 | W/(m2·K) | WT § 328 (<=0,20) |
| FireRating | REI 60 | - | WT § 234 |
| AcousticRating | 55 | dB | - |

### Warstwy materialowe (IfcMaterialLayerSet)

| # | Material | Grubosc | lambda [W/(m·K)] | Funkcja |
|---|----------|---------|-------------------|---------|
| 1 | Tynk zewnetrzny | 15 mm | 0,82 | Ochrona |
| 2 | Bloczek betonowy | 200 mm | 0,55 | Konstrukcja |
| 3 | Izolacja XPS | 180 mm | 0,035 | Cieplna |
| 4 | Szczelina powietrzna | 40 mm | - | Wentylacja |
| 5 | Plyta gipsowo-kartonowa | 12,5 mm | 0,21 | Wykonczenie |

**Razem:** 447,5 mm

### Obmiary (Qto_WallBaseQuantities)

- **Dlugosc:** Zmienna w zaleznosci od wystapienia
- **Szerokosc:** 447,5 mm
- **Wysokosc:** 2 700 mm (typowa)
- **Objetosc netto:** ~1,2 m3 na metr biezacy

### Zgodnosc z przepisami

- **WT 2021 § 328** - Cieplna: U = 0,18 <= 0,20 W/(m2·K)
- **WT 2021 § 234** - Pozarowa: REI 60 (dla budynku o wysokosci 18,5 m)
- **PN-EN 1996** - Projektowanie konstrukcji zweryfikowane

### Integracja BIM

**Eksport z Revit/ArchiCAD:**
- Format IFC 4.0
- Dolaczenie Pset_WallCommon
- Dolaczenie informacji o warstwach materialowych
- Dolaczenie reprezentacji geometrycznej

**Import do dokumentacji:**
```bash
python bim-sync/ifc-to-markdown.py building.ifc --filter IfcWall
```
```

---

## Zasoby IFC

- **Oficjalna specyfikacja:** [Dokumentacja IFC buildingSMART](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/)
- **Zestawy wlasciwosci:** [Definicje Pset IFC](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/annex/annex-b/alphabeticalorder_psets.htm)
- **Biblioteka Python:** [IfcOpenShell](http://ifcopenshell.org/)
- **Biblioteka JavaScript:** [IFC.js](https://ifcjs.github.io/info/)

---

## Powiazana dokumentacja

- [Definicje LOD](/pl/integracja-bim/definicje-lod)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Szablony elementow](/pl/szablony/)
