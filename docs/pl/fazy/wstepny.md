# Faza 3: Projekt Wstępny (LOD 200)

::: tip Przegląd Fazy
**Co robisz:** Opracowanie rzutów, przekrojów, elewacji z przybliżonymi wymiarami
**BIM LOD:** LOD 200 - Przybliżona geometria, ogólne systemy
**Czas trwania:** 3-4 tygodnie
**Dokumenty:** Rzuty (1:100), przekroje, elewacje, wstępne specyfikacje, koncepcje instalacji
:::

---

## Co dzieje się w tej fazie

W fazie projektu wstępnego:
1. Opracowujesz szczegółowe rzuty z układami pomieszczeń
2. Tworzysz przekroje i elewacje budynku
3. Definiujesz ogólne systemy budynku (koncepcje konstrukcji i instalacji)
4. Ustalasz przybliżone wymiary (nie ostateczne)
5. Dobierasz wstępne materiały i wykończenia
6. Weryfikujesz zgodność z przepisami cieplnymi i pożarowymi
7. Uściślasz szacunki kosztów

---

## Wymagania BIM - LOD 200

### Poziom Rozwoju
**LOD 200 = Przybliżona geometria z ogólnymi systemami**

Na tym poziomie elementy BIM to:
- **Geometria:** Przybliżony rozmiar, kształt, lokalizacja
- **Właściwości:** Ogólne typy systemów
- **Cel:** Rozwój projektu, koordynacja
- **Wymiary:** Przybliżone, nieprzygotowane do produkcji

### Co modelować:

```yaml
bimLOD: "LOD_200"
elements:
  walls:
    type: "generic"
    thickness: "approximate"
    example: "External wall - 350mm (generic layers)"
  floors:
    type: "generic"
    thickness: "approximate"
    example: "Floor slab - 250mm (generic)"
  windows:
    type: "generic"
    size: "approximate"
    example: "Window 120x150cm (generic type)"
  systems:
    structural: "Generic concrete frame"
    mechanical: "Generic HVAC zones"
    electrical: "Generic distribution concept"
```

**Przykład w BIM:**
- Ściany: Ogólne typy ścian z przybliżoną grubością
- Stropy: Ogólne typy stropów
- Okna/Drzwi: Ogólne rodziny z przybliżonymi wymiarami
- Konstrukcja: Ogólne słupy i belki (przybliżona lokalizacja)
- MEP: Strefy i koncepcje instalacji (bez szczegółowego trasowania)

[Dowiedz się więcej o LOD 200 →](/pl/integracja-bim/definicje-lod#lod-200)

---

## Dokumenty do stworzenia

### Dokument Projektu Wstępnego
**Cel:** Przedstawienie szczegółowego projektu z rzutami i elewacjami

**Konfiguracja YAML:**
```yaml
---
documentType: "schematic_design"
projectPhase: "schematic"
bimLOD: "LOD_200"
version: "1.0.0"
drawingScale: "1:100"
regulatoryCompliance:
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55"]
    status: "preliminary_compliance"
---
```

**Kluczowe sekcje:**
- Rzuty wszystkich kondygnacji w skali 1:100
- Przekroje budynku (minimum 2-3)
- Wszystkie elewacje (północna, południowa, wschodnia, zachodnia)
- Rzut dachu
- Plan sytuacyjny z kontekstem

---

### Wstępne Specyfikacje Materiałowe
**Cel:** Określenie ogólnych wyborów materiałowych

**Przykład:**
```yaml
---
documentType: "material_specification"
projectPhase: "schematic"
specificationType: "preliminary"

materials:
  externalWalls:
    type: "generic"
    system: "Bloczki betonowe z ociepleniem zewnętrznym"
    thermalResistance: "R = 5.0 m²K/W (przybliżone)"

  roofing:
    type: "generic"
    system: "Dach płaski z hydroizolacją"
    thermalResistance: "R = 6.0 m²K/W (przybliżone)"

  windows:
    type: "generic"
    system: "Okna PVC, trójszybowe"
    uValue: "U ≤ 0.9 W/m²K"
---
```

---

### Specyfikacje Instalacji (Ogólne)
**Cel:** Określenie koncepcji systemów budynku

**System konstrukcyjny:**
```markdown
## Koncepcja Konstrukcji

**Typ systemu:** Żelbetowa konstrukcja szkieletowa
**Siatka słupów:** ~5m x 5m (przybliżona)
**System stropowy:** Stropy płaskie żelbetowe, 250mm (ogólne)
**Fundamenty:** Ławy fundamentowe lub płyta fundamentowa (do ustalenia po badaniu gruntu)
```

**Koncepcja instalacji MEP:**
```markdown
## Instalacje Sanitarne

**Ogrzewanie:** Centralna kotłownia gazowa z grzejnikami
**Wentylacja:** Naturalna + mechaniczna w pomieszczeniach mokrych
**Chłodzenie:** Nie wymagane (budynek mieszkalny)

## Instalacje Elektryczne

**Rozdzielnia:** Główna + podrozdzielnie na kondygnacjach
**Obciążenie:** ~15 kW na mieszkanie (wstępne)
```

---

## Przepisy do sprawdzenia

### WT 2021 - Wymagania cieplne
**§ 328 - Wymagania izolacyjności cieplnej**

Weryfikacja wartości U dla wszystkich elementów obudowy:

| Element | Maks. U (WT 2021) | Typowa wartość projektowa |
|---------|----------------------|---------------------|
| Ściany zewnętrzne | 0,20 W/(m²·K) | 0,18 W/(m²·K) |
| Dach | 0,15 W/(m²·K) | 0,13 W/(m²·K) |
| Strop nad przestrzenią nieogrzewaną | 0,25 W/(m²·K) | 0,22 W/(m²·K) |
| Okna | 0,90 W/(m²·K) | 0,80 W/(m²·K) |

**Na poziomie LOD 200:** Stosuj obliczenia ogólne, bez szczegółowej analizy warstw

[Czytaj wymagania WT 2021 § 328 →](/pl/przepisy/wt-2021#328-izolacyjnosc-cieplna)

---

### WT 2021 - Bezpieczeństwo pożarowe
**§ 234 - Wymagania pożarowe**

Weryfikacja odporności ogniowej dla klasy budynku:

**Przykład: Budynek mieszkalny, wysokość 18,5 m (ZL III)**

| Element | Wymagana odporność ogniowa |
|---------|-------------------------|
| Ściany nośne | REI 60 |
| Stropy | REI 60 |
| Klatki schodowe / drogi ewakuacyjne | REI 60 |
| Ściany nienośne | EI 30 |

**Na poziomie LOD 200:** Weryfikuj zgodność ogólnych systemów, nie konkretnych produktów

[Czytaj wymagania WT 2021 § 234 →](/pl/przepisy/wt-2021#234-ochrona-przeciwpozarowa)

---

### WT 2021 - Dostępność
**§ 55 - Wymagania dostępności**

Jeśli budynek wymaga zapewnienia dostępności:
- Pochylnie wejściowe (maks. nachylenie 6%)
- Wymiary windy (min. kabina 110 x 140 cm)
- Szerokość drzwi (min. 90 cm w świetle)
- Wymiary dostępnej toalety

[Czytaj wymagania WT 2021 § 55 →](/pl/przepisy/wt-2021#55-dostepnosc)

---

## Uściślenie Szacunku Kosztów

**Metoda szacowania na poziomie LOD 200:**
- Szczegółowy obmiar na podstawie rzutów
- Koszt za m² uściślony według systemów budynku
- Dokładność: ±20%

**Przykład:**
```yaml
costEstimate:
  method: "detailed_takeoff"
  breakdown:
    structure: "2,500,000 PLN"
    envelope: "1,800,000 PLN"
    interior: "1,200,000 PLN"
    mep: "1,600,000 PLN"
    sitework: "400,000 PLN"
    softCosts: "600,000 PLN"
  totalEstimate: "8,100,000 PLN"
  accuracy: "±20%"
  priceDate: "2026-02-20"
```

---

## Eksport dokumentów do PDF

### Dla prezentacji klienta:
```bash
cd 03-wstepny/
pandoc projekt-wstepny.md -o projekt-wstepny-prezentacja.pdf \
  --template=../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

### Dla przeglądu wewnętrznego:
```bash
# Eksport wszystkich specyfikacji
pandoc specyfikacja-ogolna.md -o specyfikacja.pdf
pandoc budzet.md -o budzet.pdf
```

[Kompletny przewodnik eksportu PDF →](/pl/przewodniki/eksport-pdf)

---

## Przepływ pracy BIM

### Tworzenie modelu wstępnego (LOD 200):

**W Revit:**
1. Utwórz ogólne typy ścian (przybliżone warstwy)
2. Rozmieść ściany z przybliżonymi grubościami
3. Utwórz rzuty w skali 1:100
4. Wygeneruj przekroje i elewacje
5. Dodaj ogólne okna/drzwi
6. Eksportuj do IFC 4.0

**W ArchiCAD:**
1. Utwórz ściany wielowarstwowe (ogólne warstwy)
2. Opracuj rzuty
3. Wygeneruj przekroje/elewacje
4. Dodaj ogólne obiekty biblioteczne
5. Eksportuj do IFC 4.0

### Eksport BIM do dokumentacji:
```bash
# Eksportuj IFC z narzędzia BIM
# Plik > Eksport > IFC 4.0

# Wygeneruj markdown z IFC
python ../bim-sync/ifc-to-markdown.py \
  --input model-wstepny.ifc \
  --output 03-wstepny/specyfikacje/ \
  --lod LOD_200
```

[Dowiedz się więcej o synchronizacji BIM →](/pl/integracja-bim/synchronizacja-dwukierunkowa)

---

## Przepływ pracy Git

```bash
# Utwórz folder fazy projektu wstępnego
mkdir 03-wstepny
cd 03-wstepny

# Utwórz dokumenty
touch projekt-wstepny.md
touch specyfikacja-ogolna.md
touch budzet.md

# Dodaj rysunki/BIM (jeśli potrzebne)
mkdir rysunki
mkdir bim

# Zatwierdź
git add .
git commit -m "Projekt wstępny ukończony - wszystkie rysunki w skali 1:100"
git tag projekt-wstepny-v1.0
```

---

## Przykładowy Projekt

**Budynek Zielony Taras - Projekt Wstępny**
- [Przestrzenie Zielony Taras →](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)
- [Ściana Zewnętrzna Typ A →](/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

W fazie projektu wstępnego Semantyczny Model Budynku staje się dobrze zdefiniowany:

- **Karty Pomieszczeń** — uściślone z potwierdzonymi powierzchniami, wysokościami pomieszczeń i konkretnymi typami przestrzeni
- **Karty Stref** — szczegółowo zdefiniowane: strefy pożarowe sklasyfikowane wg WT 2021, strefy HVAC zmapowane do koncepcji instalacji mechanicznych, strefy akustyczne zidentyfikowane dla obszarów wrażliwych na hałas
- **Karty Wymagań** — zastosowane z konkretnymi normami powiązanymi z pomieszczeniami (wymagania cieplne i pożarowe WT 2021, normy akustyczne EN)

**Przykład: karta Strefy w fazie projektu wstępnego**
```yaml
entity: Zone
id: zone-fire-zl-iv
name: "Strefa Pożarowa ZL IV"
zoneType: "fire"
classification: "ZL IV"
fireResistance: "REI 60"
standard: "WT 2021 § 234"
spaces:
  - space-bedroom-01
  - space-bedroom-02
  - space-corridor
projectPhase: "schematic"
```

Dowiedz się więcej o [Semantycznym Modelu Budynku](/pl/dokumentacja/przeglad) i zobacz [Szablon karty Strefy](/pl/szablony/szablon-strefy).

---

## Kontrola projektu w tej fazie

### Plan Realizacji BIM
Ustal BEP przed rozpoczęciem szczegółowego modelowania: role, oprogramowanie, konwencje nazewnictwa.
- [Plan Realizacji BIM →](/pl/integracja-bim/bep)
- [Wspólne Środowisko Danych →](/pl/integracja-bim/cde)

### Bramka projektu wstępnego
Zweryfikuj: wszystkie pomieszczenia zdefiniowane, strefy przypisane, wstępna zgodność sprawdzona.
- [Listy kontrolne bramek fazowych →](/pl/jakosc/bramki-fazowe)

### Planowanie środowiska wewnętrznego
Określ wymagania nasłonecznienia, wentylacji i akustyki dla każdego typu pomieszczenia.
- [Jakość środowiska wewnętrznego →](/pl/zrownowazonosc/jakosc-wnetrz)

### Kontrola dokumentów
Upewnij się że pliki stosują konwencje nazewnictwa i śledzenie rewizji jest aktywne.
- [Kontrola dokumentów →](/pl/zarzadzanie-projektem/kontrola-dokumentow)

---

## Następne kroki

Po zatwierdzeniu projektu wstępnego:

**Kontynuuj do Fazy 4:**
[→ Projekt Budowlany / Pozwolenie na Budowę (LOD 300)](/pl/fazy/budowlany)

**Lub wróć:**
[← Faza 2: Projekt Koncepcyjny](/pl/fazy/koncepcja)

**Zobacz kompletny przepływ:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed przejściem do Projektu Budowlanego:

- [ ] Wszystkie rzuty ukończone w skali 1:100
- [ ] Przekroje budynku (minimum 2) ukończone
- [ ] Wszystkie elewacje ukończone
- [ ] Ogólny model BIM utworzony (LOD 200)
- [ ] Wstępna zgodność cieplna zweryfikowana (WT 2021 § 328)
- [ ] Wstępna zgodność pożarowa zweryfikowana (WT 2021 § 234)
- [ ] Ogólne specyfikacje materiałowe udokumentowane
- [ ] Szacunek kosztów uściślony (dokładność ±20%)
- [ ] Wszystkie dokumenty zatwierdzone w Git
- [ ] Zgoda klienta na przejście do projektu budowlanego
