---
documentType: "technical_reference"
subject: "BIM_LOD"
standard: "AIA_G202_2013"
lastUpdated: "2026-02-20"
language: "pl"
---

# Definicje poziomu rozwoju (LOD)

Specyfikacje LOD okreslaja poziom kompletnosci i szczegolowosci, z jakim element budowlany jest modelowany i dokumentowany na roznych etapach procesu projektowania i budowy.

## Przeglad LOD

| LOD | Nazwa | Geometria | Informacje | Dokumentacja | Typowa faza |
|-----|-------|-----------|------------|--------------|-------------|
| **100** | Koncepcyjny | Symboliczna | Ogolne | Wysokopoziomowa | Projekt koncepcyjny |
| **200** | Przyblizony | Przyblizony rozmiar/ksztalt | Ogolne systemy | Specyfikacje typow | Projekt schematyczny |
| **300** | Precyzyjny | Dokladny rozmiar/ksztalt | Konkretne zespoly | Szczegolowe specyfikacje | Projekt budowlany |
| **400** | Wykonawczy | Precyzyjna reprezentacja | Pelne specyfikacje | Dokumentacja wykonawcza | Dokumentacja budowy |
| **500** | Powykonawczy | Zweryfikowane wymiary | Zweryfikowane dane | Dokumentacja powykonawcza | Po zakonczeniu budowy |

---

## LOD 100 - Koncepcyjny

### Opis

Elementy sa modelowane jako **symbole lub ogolne obiekty zastepce** reprezentujace istnienie i przyblizony polozenie komponentow budynku.

### Charakterystyka

**Geometria:**
- Symboliczna lub ogolna reprezentacja
- Nie w skali
- Przyblizony polozenie i orientacja
- Proste bryly lub symbole 2D

**Informacje:**
- Tylko informacje ogolne
- Brak konkretnych wlasciwosci
- Szacunki kosztow oparte na powierzchni/kubaturze
- Parametry koncepcyjne

### Wymagania dokumentacyjne

```yaml
bimLOD: "LOD_100"
geometryDetail: "symbolic"
informationDetail: "generic"
```

### Przyklad: Sciana na poziomie LOD 100

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_100"
projectPhase: "concept_design"
ifcMapping:
  ifcEntity: "IfcWall"
---

## Sciana zewnetrzna (Koncepcyjna)

### Informacje LOD 100

**Reprezentacja:** Ogolna linia sciany
**Grubosc:** Przyblizony (400 mm typowa)
**Wysokosc:** Kondygnacja do kondygnacji

**Wlasciwosci:**
- Typ: Sciana zewnetrzna (ocieplona)
- Przyblizony wspolczynnik U: 0,20 W/(m2·K) (wartosc docelowa)
- Szacunek kosztow: 120 EUR/m2 (orientacyjny)

**Zastosowanie:** Projekt koncepcyjny, studia kubaturowe, obliczenia powierzchni
```

### Typowe zastosowania

- Projektowanie koncepcyjne
- Modele kubaturowe
- Obliczenia powierzchni i kubatury
- Wstepne szacunki kosztow
- Planowanie zagospodarowania terenu

---

## LOD 200 - Przyblizony

### Opis

Elementy sa modelowane jako **uogolnione systemy lub zespoly** z przyblizzonymi ilosciami, rozmiarem, ksztaltem, polozeniem i orientacja.

### Charakterystyka

**Geometria:**
- Przyblizony rozmiar i ksztalt
- Prawidlowe polozenie i orientacja
- Ogolna reprezentacja typu
- Glowne wymiary wskazane

**Informacje:**
- Ogolne informacje o typie systemu
- Przyblizzone dane wydajnosciowe
- Szacunki kosztow wedlug typu systemu
- Ogolne typy materialow

### Wymagania dokumentacyjne

```yaml
bimLOD: "LOD_200"
geometryDetail: "approximate"
informationDetail: "generic_systems"
```

### Przyklad: Sciana na poziomie LOD 200

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_200"
projectPhase: "schematic_design"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_Generic"
---

## Sciana zewnetrzna - Typ A (Schematyczna)

### Informacje LOD 200

**Geometria:**
- Grubosc: 450 mm
- Wysokosc: Kondygnacja do kondygnacji (2,70 m typowa)
- Lokalizacja: Wg rysunkow projektowych

**Ogolne wlasciwosci:**
| Wlasciwosc | Wartosc | Uwagi |
|-------------|---------|-------|
| Typ sciany | Mur ocieplony | System ogolny |
| Docelowy wspolczynnik U | <= 0,20 W/(m2·K) | Wymaganie WT 2021 |
| Klasa odpornosci ogniowej | REI 60 | Wymaganie przepisow |
| Przyblizony koszt | 180 EUR/m2 | Z wykonczeniem |

**Koncepcja materialowa:**
- Zewnatrz: Tynk
- Konstrukcja: Mur
- Izolacja: Do osiagniecia wymaganego U
- Wewnatrz: Tynk

**Zastosowanie:** Projekt schematyczny, weryfikacja zgodnosci z przepisami, wstepne szacunki kosztow
```

### Typowe zastosowania

- Projektowanie schematyczne
- Porownanie wariantow projektowych
- Weryfikacja zgodnosci z przepisami
- Wstepne szacunki kosztow
- Koordynacja systemow

---

## LOD 300 - Precyzyjny

### Opis

Elementy sa modelowane jako **konkretne zespoly** z dokladnymi ilosciami, rozmiarem, ksztaltem, polozeniem i orientacja.

### Charakterystyka

**Geometria:**
- Konkretny rozmiar, ksztalt i polozenie
- Prawidlowe wymiary
- Rzeczywista reprezentacja zespolu
- Polaczenia i interfejsy pokazane

**Informacje:**
- Konkretne typy produktow lub zespolow
- Szczegolowe dane wydajnosciowe
- Informacje o producencie (ogolne)
- Konkretne materialy i grubosci

### Wymagania dokumentacyjne

```yaml
bimLOD: "LOD_300"
geometryDetail: "specific"
informationDetail: "detailed_assemblies"
```

### Przyklad: Sciana na poziomie LOD 300

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_300"
projectPhase: "design_development"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
---

## Sciana zewnetrzna - Typ A (Projekt budowlany)

### Informacje LOD 300

**Geometria:**
- Calkowita grubosc: 447,5 mm
- Wysokosc: 2 700 mm (podloga-sufit)
- Zamodelowana z dokladna geometria

**Warstwy materialowe:**

| Warstwa | Material | Grubosc | lambda [W/(m·K)] |
|---------|----------|---------|-------------------|
| 1 | Tynk mineralny | 15 mm | 0,82 |
| 2 | Bloczek betonowy (drazony) | 200 mm | 0,55 |
| 3 | Plyty izolacyjne XPS | 180 mm | 0,035 |
| 4 | Szczelina powietrzna (wentylowana) | 40 mm | - |
| 5 | Plyta gipsowo-kartonowa | 12,5 mm | 0,21 |

**Obliczone parametry:**
- Wspolczynnik U: 0,18 W/(m2·K) (wymagane: <= 0,20)
- Klasa odpornosci ogniowej: REI 60
- Izolacyjnosc akustyczna: 55 dB

**Otwory:**
- Parapety okienne i nadproza uszczegolowione
- Oscie i glifty okreslone
- Detale mostkow termicznych pokazane

**Zastosowanie:** Projekt budowlany, szczegolowe szacunki kosztow, wnioski o pozwolenie na budowe
```

### Typowe zastosowania

- Projekt budowlany
- Wnioski o pozwolenie na budowe
- Szczegolowe szacunki kosztow
- Wstepne planowanie budowy
- Rysunki koordynacyjne

---

## LOD 400 - Wykonawczy

### Opis

Elementy sa modelowane z **wystarczajacym poziomem szczegolowosci i dokladnosci** do produkcji i montazu komponentu.

### Charakterystyka

**Geometria:**
- Precyzyjne wymiary do produkcji
- Kompletne detale zespolu
- Wszystkie polaczenia uszczegolowione
- Poziom szczegolow rysunkow warsztatowych

**Informacje:**
- Konkretne produkty i producenci
- Kompletne specyfikacje
- Detale montazowe
- Informacje produkcyjne
- Wszystkie wymagane wlasciwosci

### Wymagania dokumentacyjne

```yaml
bimLOD: "LOD_400"
geometryDetail: "fabrication"
informationDetail: "complete_specifications"
```

### Przyklad: Sciana na poziomie LOD 400

```markdown
---
documentType: "element_specification"
bimLOD: "LOD_400"
projectPhase: "construction_documentation"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "WT_2021"
    section: "§ 234"
---

## Sciana zewnetrzna - Typ A (Dokumentacja wykonawcza)

### Informacje LOD 400

**Geometria:**
- Calkowita grubosc: 447,5 mm (z tolerancjami)
- Wysokosc: 2 700 mm podloga-sufit
- Kompletny model 3D ze wszystkimi detalami

**Warstwy materialowe (okreslone produkty):**

| Warstwa | Specyfikacja produktu | Grubosc | lambda [W/(m·K)] | Dostawca |
|---------|----------------------|---------|-------------------|----------|
| 1 | Baumit MVR Uni tynk mineralny | 15 mm | 0,82 | Baumit |
| 2 | Ytong PP4/0,6 bloczki betonowe | 200 mm | 0,55 | Ytong |
| 3 | Styrodur 3035 CS plyty XPS | 180 mm | 0,035 | BASF |
| 4 | Szczelina powietrzna wentylowana | 40 mm | - | - |
| 5 | Rigips RB 12,5 mm plyta g-k | 12,5 mm | 0,21 | Rigips |

**Polaczenia:**
- Sciana-fundament: Patrz detal DT-001
- Sciana-strop: Patrz detal DT-002
- Sciana-dach: Patrz detal DT-003
- Narozniki: Patrz detal DT-004

**Laczniki i akcesoria:**
- Kolki do izolacji: Fischer DIPK 8/60-90
- Siatka zbrojaca: Baumit StarTex (wlokno szklane)
- Paroizolacja: Gdzie wymagane wg rysunkow

**Kolejnosc montazu:**
1. Murowanie bloczkami betonowymi (zaprawa: M5)
2. Plyty izolacyjne XPS (spoiny na mijank)
3. Mocowanie mechaniczne
4. Siatka zbrojaca
5. Warstwa podkladowa
6. Warstwa wykonczeniowa

**Kontrola jakosci:**
- Badanie termowizyjne po ociepleniu
- Badanie szczelnosci (blower door test)
- Kontrola wizualna wg PN-B-10425

**Weryfikacja parametrow:**
- Wspolczynnik U (obliczony): 0,18 W/(m2·K)
- Wspolczynnik U (badany): Wg PN-EN ISO 6946
- Odpornosc ogniowa: REI 60 (certyfikat badania #FR2024-1234)
- Akustyka: 55 dB (certyfikat badania #AC2024-5678)

**Zastosowanie:** Dokumentacja wykonawcza, rysunki warsztatowe, montaz, zamowienia
```

### Typowe zastosowania

- Dokumentacja wykonawcza
- Rysunki warsztatowe
- Produkcja
- Zamowienia (konkretne produkty)
- Instrukcje montazu
- Kontrola jakosci

---

## LOD 500 - Powykonawczy

### Opis

Elementy sa modelowane jako **zweryfikowane reprezentacje** rzeczywistych warunkow wykonania, uwzgledniajace wszystkie modyfikacje wprowadzone podczas budowy.

### Charakterystyka

**Geometria:**
- Rzeczywiste, zweryfikowane w terenie wymiary
- Warunki faktycznie wykonane
- Wszystkie zmiany wzgledem projektu udokumentowane
- Dokladnosc pomiaru geodezyjnego lub skanowania laserowego

**Informacje:**
- Zweryfikowane informacje o produktach
- Rzeczywisci producenci/modele zamontowane
- Informacje gwarancyjne
- Wymagania konserwacyjne
- Dane eksploatacyjne

### Wymagania dokumentacyjne

```yaml
bimLOD: "LOD_500"
geometryDetail: "as_built_verified"
informationDetail: "verified_complete"
asBuiltVerification:
  method: "field_survey"
  date: "2026-02-15"
  surveyedBy: "Jan Kowalski"
```

### Przyklad: Sciana na poziomie LOD 500

```markdown
---
documentType: "as_built_documentation"
bimLOD: "LOD_500"
projectPhase: "post_construction"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
asBuiltVerification:
  method: "field_measurement"
  date: "2026-02-15"
  verifiedBy: "Jan Kowalski, architekt"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "verified_compliant"
---

## Sciana zewnetrzna - Typ A (Powykonawcza)

### Informacje powykonawcze LOD 500

**Weryfikacja:**
- Data pomiaru: 2026-02-15
- Metoda pomiaru: Pomiar w terenie + termowizja
- Zweryfikowal: Jan Kowalski, architekt (IARP #1234)

**Wymiary po zamontowaniu:**
- Calkowita grubosc: 448 mm (odchylenie +-2 mm)
- Wysokosc: 2 698 mm (rzeczywista podloga-sufit)
- Powierzchnia: 1 245 m2 (calkowita powierzchnia scian zewnetrznych)

**Zamontowane materialy:**

| Warstwa | Zamontowany produkt | Grubosc | Partia/Seria | Data montazu |
|---------|---------------------|---------|-------------|--------------|
| 1 | Tynk Baumit MVR Uni | 15 mm | Partia #45678 | 2025-11-20 |
| 2 | Bloczki Ytong PP4/0,6 | 200 mm | Seria #YT-2025-234 | 2025-09-15 |
| 3 | Styrodur 3035 CS | 180 mm | Partia #ST-45-23 | 2025-10-10 |
| 4 | Szczelina powietrzna | 40 mm | - | - |
| 5 | Plyta g-k Rigips RB | 12,5 mm | Partia #RG-890 | 2025-11-05 |

**Zweryfikowane parametry:**
- **Wspolczynnik U:** 0,17 W/(m2·K) (badanie termowizyjne 2026-01-15)
  - Certyfikat: TH-2026-001
  - Status: Przekracza wymaganie (0,20)

- **Odpornosc ogniowa:** REI 60
  - Certyfikat: FR2024-1234
  - Weryfikacja: Kontrola wizualna + przeglad certyfikatow

- **Szczelnosc powietrzna:**
  - Badanie blower door: 0,8 ACH @ 50 Pa
  - Data: 2026-01-20
  - Certyfikat: BD-2026-045

**Odchylenia od projektu:**
- Brak istotnych odchylen
- Drobne: Grubosc izolacji 180 mm rzeczywista vs 180 mm projektowa (w granicach tolerancji)

**Gwarancje:**
- System tynkarski: 10 lat (gwarancja Baumit #W-2025-8901)
- Izolacja: 25 lat (gwarancja produktowa BASF)
- Plyty g-k: 2 lata (gwarancja standardowa Rigips)

**Wymagania konserwacyjne:**
- Kontrola wizualna: Corocznie
- Konserwacja tynku: Co 5 lat
- Oczekiwana trwalosc: 50+ lat

**Dokumentacja:**
- Zdjecia z budowy: Folder /photos/walls/
- Certyfikaty badan: Folder /certificates/walls/
- Dokumenty gwarancyjne: Folder /warranties/

**Zastosowanie:** Zarzadzanie nieruchomosciami, planowanie konserwacji, planowanie remontow, roszczenia gwarancyjne
```

### Typowe zastosowania

- Dokumentacja powykonawcza
- Przekazanie do zarzadzania nieruchomosciami (FM)
- Podreczniki eksploatacji i konserwacji (O&M)
- Planowanie przyszlych remontow
- Zarzadzanie gwarancjami
- Weryfikacja parametrow budynku

---

## Przyklad progresji LOD

### Sciana Typ A przez wszystkie poziomy LOD

| LOD | Grubosc | Materialy | Wspolczynnik U | Koszt | Dokumentacja |
|-----|---------|-----------|----------------|-------|--------------|
| **100** | ~400 mm | Ogolna sciana ocieplona | Docelowy: 0,20 | 120 EUR/m2 | Koncepcja |
| **200** | 450 mm | Mur ocieplony | <=0,20 | 180 EUR/m2 | Schematyczna |
| **300** | 447,5 mm | Okreslone warstwy | Obl.: 0,18 | 195 EUR/m2 | Specyfikacja PB |
| **400** | 447,5 mm | Okreslone produkty | Obl.: 0,18 | 198 EUR/m2 | Detale PW |
| **500** | 448 mm | Zamontowane produkty | Badany: 0,17 | Rzeczywisty: 196 EUR/m2 | Powykonawcza |

---

## Stosowanie LOD w dokumentacji

### Okreslenie LOD w naglowku YAML

```yaml
---
documentType: "element_specification"
bimLOD: "LOD_400"
lodRequirements:
  geometry: "fabrication_detail"
  information: "complete_specifications"
  uses: ["construction", "procurement", "installation"]
---
```

### Sledzenie progresji LOD

```markdown
## Sciana Typ A - Historia LOD

| Faza | LOD | Data | Autor | Uwagi |
|------|-----|------|-------|-------|
| Koncepcja | 100 | 2025-03-01 | A. Nowak | Koncepcja poczatkowa |
| Schematyczna | 200 | 2025-04-15 | A. Nowak | Wybrany system |
| Projekt budowlany | 300 | 2025-06-30 | A. Nowak | Szczegolowa specyfikacja |
| Dokumentacja wyk. | 400 | 2025-09-01 | A. Nowak | Do realizacji |
| Powykonawcza | 500 | 2026-02-15 | J. Kowalski | Pomiar zakonczony |
```

---

## Najlepsze praktyki LOD

### 1. Wczesne zdefiniowanie wymagan LOD

Ustalenie wymagan LOD w Planie Realizacji BIM (BEP):
- Jaki LOD dla kazdego elementu na kazdym etapie?
- Kto jest odpowiedzialny za modelowanie?
- Jakie informacje sa wymagane?

### 2. Jasne dokumentowanie LOD

Zawsze okreslaj LOD w dokumentacji:
- Uzyj pola `bimLOD` w naglowku YAML
- Okresla poziomy szczegolow geometrii i informacji
- Wyjasnij przewidywane zastosowania

### 3. LOD to nie poziom szczegolow

LOD to **Level of Development** (Poziom Rozwoju), a nie "Level of Detail" (Poziom Szczegolow):
- Rozwoj = kompletnosc i wiarygodnosc
- Szczegol = jedynie szczegol geometryczny
- LOD obejmuje zarowno geometrie, JAK I informacje

### 4. Logiczna progresja LOD

Nie pomijaj poziomow LOD:
- Kazdy LOD bazuje na poprzednim
- Informacje powinny stawac sie coraz bardziej szczegolowe
- Geometria powinna byc coraz bardziej precyzyjna

---

## Zasoby

- **AIA G202-2013:** Protokol modelowania informacji o budynku
- **Specyfikacja LOD BIMForum:** [bimforum.org/lod](https://bimforum.org/lod/)
- **buildingSMART:** Definicje LOD w standardzie IFC

---

## Powiazana dokumentacja

- [Obiekty IFC](/pl/integracja-bim/encje-ifc)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Szablony elementow](/pl/szablony/)
