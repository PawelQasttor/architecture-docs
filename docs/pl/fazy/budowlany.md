# Faza 4: Projekt Budowlany / Pozwolenie na Budowę (LOD 300)

::: tip Przegląd Fazy
**Co robisz:** Tworzysz szczegółowy projekt do wniosku o pozwolenie na budowę
**BIM LOD:** LOD 300 - Precyzyjna geometria, konkretne zestawy
**Czas trwania:** 6-8 tygodni
**Dokumenty:** Kompletny zestaw do pozwolenia, obliczenia, dokumentacja zgodności, szczegółowe specyfikacje
:::

::: danger Faza Krytyczna
Ta faza tworzy **dokumenty prawnie wiążące** do pozwolenia na budowę. Wszystkie projekty muszą być zgodne z Prawem budowlanym i Warunkami Technicznymi (WT 2021).
:::

---

## Co dzieje się w tej fazie

W fazie projektu budowlanego / pozwolenia na budowę:
1. Tworzysz kompletny projekt architektoniczny z precyzyjnymi wymiarami
2. Koordynujesz prace z inżynierami konstruktorami i instalatorami
3. Opracowujesz szczegółowe specyfikacje wszystkich elementów
4. Wykonujesz szczegółowe obliczenia zgodności (cieplne, akustyczne, konstrukcyjne)
5. Przygotowujesz kompletną dokumentację do pozwolenia na budowę
6. Składasz wniosek do organu administracji architektoniczno-budowlanej

**To jest faza o największym nakładzie dokumentacji.**

---

## Wymagania BIM - LOD 300

### Poziom Rozwoju
**LOD 300 = Precyzyjna geometria z konkretnymi zestawami**

Na tym poziomie elementy BIM to:
- **Geometria:** Precyzyjne wymiary i lokalizacje
- **Właściwości:** Konkretne zestawy i produkty
- **Cel:** Koordynacja budowy, dokumentacja do pozwolenia
- **Dokładność:** Geometria gotowa do realizacji

### Co modelować:

```yaml
bimLOD: "LOD_300"
elements:
  walls:
    type: "specific"
    layers: "Detailed layer build-up"
    example: "External wall Type A: render 15mm + concrete block 200mm + XPS 150mm + air gap 40mm + gypsum 12.5mm"
    uValue: "Calculated: 0.18 W/(m²·K)"

  floors:
    type: "specific"
    layers: "Detailed construction"
    example: "Floor Type A: tiles 10mm + screed 50mm + insulation 100mm + RC slab 200mm + ceiling 15mm"

  windows:
    type: "specific"
    manufacturer: "Specific or equivalent"
    properties: "Full technical specs (U-value, Rw, fire rating)"
    example: "PVC window 120x150cm, U=0.80 W/(m²·K), Rw=35dB"

  systems:
    structural: "Specific concrete grades, rebar details"
    mechanical: "Specific equipment with capacities"
    electrical: "Specific panel schedules and loads"
```

**Mapowanie IFC:**
```yaml
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  properties:
    - Pset_WallCommon:
        LoadBearing: true
        IsExternal: true
        ThermalTransmittance: 0.18
        FireRating: "REI 60"
```

[Dowiedz się więcej o LOD 300 →](/pl/integracja-bim/definicje-lod#lod-300)
[Zobacz karty IFC →](/pl/integracja-bim/encje-ifc)

---

## Wymagane dokumenty

### 1. Projekt architektoniczny
**Wymóg prawny:** Prawo budowlane Art. 34

**Konfiguracja YAML:**
```yaml
---
documentType: "building_permit_set"
projectPhase: "design_development"
bimLOD: "LOD_300"
version: "1.0.0"
permitApplication:
  submissionDate: "2026-03-15"
  authority: "Urząd Miejski w Warszawie"
  applicationNumber: "BP/2026/1234"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 34"
    status: "compliant"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
    status: "verified"
  - standard: "PN-EN_1992"
    description: "Eurocode 2 - Concrete structures"
    status: "compliant"
---
```

**Zawartość:**
- Strona tytułowa z numerem uprawnień architekta
- Plan sytuacyjny z pomiarami geodezyjnymi
- Rzuty wszystkich kondygnacji - precyzyjne wymiary
- Rzut dachu
- Wszystkie elewacje (wszystkie strony)
- Przekroje budynku (minimum 2, przez wszystkie kondygnacje)
- Przekroje detali (kluczowe złącza)
- Zestawienie stolarki okiennej i drzwiowej
- Zestawienie wykończeń

[Szablon karty Wymagania →](/pl/szablony/szablon-wymagania)

---

### 2. Projekt konstrukcyjny
**Wykonawca:** Inżynier konstruktor
**Musi zawierać:**
- Projekt fundamentów
- Obliczenia konstrukcji nośnej
- Projekt stropów
- Konstrukcja dachu
- Analiza sejsmiczna (jeśli dotyczy)

---

### 3. Projekty branżowe (MEP)
**Wykonawcy:** Inżynierowie branżowi

**Wymagane projekty:**
- Instalacje sanitarne i wod-kan
- Instalacje HVAC (ogrzewanie, wentylacja)
- Instalacje elektryczne
- Instalacje przeciwpożarowe
- Pozostałe (gaz, teletechnika itp.)

---

### 4. Specyfikacje techniczne
**Cel:** Szczegółowe specyfikacje wszystkich elementów budynku

**Co dokumentować:**
- Typy ścian (wszystkie warianty)
- Typy stropów (wszystkie warianty)
- Konstrukcja dachu
- Specyfikacje okien i drzwi
- Specyfikacje wykończeń
- Specyfikacje materiałowe z producentami

**Przykładowa struktura:**
```markdown
## Ściana Typ A - Ściana Zewnętrzna

**Mapowanie IFC:**
- Typ IFC: `IfcWallStandardCase`
- ObjectType: `ExternalWall_TypeA`
- GUID: `3vB2YO$rLBxv3VxEu2LPxQ`

**Układ warstw (od zewnątrz do wewnątrz):**
1. Tynk zewnętrzny, 15mm - Ceresit CT 60
2. Bloczek betonowy, 200mm - Solbet klasa 400
3. Izolacja XPS, 150mm - Styrodur 3035 CS
4. Szczelina powietrzna, 40mm
5. Płyta gipsowo-kartonowa, 12,5mm - Rigips RB

**Parametry cieplne:**
- Obliczona wartość U: 0,18 W/(m²·K)
- Wymagana maks. wartość U: 0,20 W/(m²·K) (WT 2021 § 328)
- Status: Zgodny

**Odporność ogniowa:**
- Wymagana: REI 60 (klasa budynku ZL III)
- Zapewniona: REI 90 (system certyfikowany)
- Status: Zgodny
```

[Zobacz kompletny przykład specyfikacji ściany →](/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a)

---

### 5. Obliczenia

#### Obliczenia cieplne
**Wymagane przez:** WT 2021 § 328

**Co obliczyć:**
- Wartości U dla wszystkich elementów obudowy (ściany, dach, podłoga, okna)
- Roczne zapotrzebowanie na ciepło
- Weryfikacja zgodności

**Przykład:**
```yaml
thermalCalculations:
  standard: "WT_2021"
  section: "§ 328"
  elements:
    externalWall_TypeA:
      layers:
        - {material: "Render", thickness: 0.015, lambda: 0.82}
        - {material: "Concrete", thickness: 0.200, lambda: 0.55}
        - {material: "XPS", thickness: 0.150, lambda: 0.034}
        - {material: "Air gap", thickness: 0.040, R: 0.18}
        - {material: "Gypsum", thickness: 0.0125, lambda: 0.25}
      calculatedU: 0.18
      maxAllowedU: 0.20
      status: "compliant"
```

Szablon obliczeń cieplnych (planowane)

---

#### Obliczenia akustyczne
**Wymagane przez:** WT 2021 § 323, § 324

**Co obliczyć:**
- Izolacyjność akustyczna od dźwięków powietrznych (R'w) ścian i stropów
- Izolacyjność od dźwięków uderzeniowych (L'n,w) stropów
- Parametry akustyczne okien

---

#### Obliczenia konstrukcyjne
**Wykonawca:** Inżynier konstruktor
**Wymagane:** Dla wszystkich elementów nośnych

---

### 6. Lista kontrolna zgodności
**Cel:** Systematyczna weryfikacja wszystkich wymagań przepisów

```yaml
---
documentType: "compliance_checklist"
projectPhase: "design_development"
verificationDate: "2026-03-10"

compliance:
  constructionLaw:
    - article: "Art. 5"
      requirement: "Ogólne wymagania techniczne"
      status: "verified"
      verifiedBy: "Imię architekta"

    - article: "Art. 34"
      requirement: "Zakres projektu"
      status: "complete"
      documentsProvided:
        - "Projekt architektoniczny"
        - "Projekt konstrukcyjny"
        - "Projekty branżowe"

  wt2021:
    - section: "§ 328"
      requirement: "Izolacyjność cieplna"
      status: "compliant"
      calculation: "obliczenia-cieplne-2026-03.pdf"

    - section: "§ 234"
      requirement: "Bezpieczeństwo pożarowe"
      status: "compliant"
      fireClass: "ZL III"
      requiredResistance: "REI 60"
---
```

[Kompilator SBM - Raport Zgodności →](/pl/dokumentacja/kompilator/)

---

## Przepisy - wymagana PEŁNA ZGODNOŚĆ

### Prawo budowlane

**Art. 34 - Wymagania dotyczące projektu**

Projekt budowlany do pozwolenia na budowę musi zawierać:
1. Projekt architektoniczny
2. Projekt konstrukcyjny
3. Projekty branżowe (sanitarne, elektryczne, HVAC itp.)
4. Koncepcję bezpieczeństwa pożarowego
5. Specyfikacje techniczne
6. Kosztorys

[Czytaj Prawo budowlane Art. 34 →](/pl/przepisy/prawo-budowlane#art-34)

---

### WT 2021 - Wszystkie wymagane działy

**§ 328 - Izolacyjność cieplna**
- Maksymalne wartości U dla wszystkich elementów obudowy
- Obliczenie rocznego zapotrzebowania na energię
- **Status:** Wymagane obowiązkowe obliczenia

**§ 234 - Ochrona przeciwpożarowa**
- Wymagania odporności ogniowej wg klasy budynku
- Wymagania dotyczące dróg ewakuacyjnych
- Wymagania dotyczące oddzielenia pożarowego
- **Status:** Wymagana pełna weryfikacja zgodności

**§ 55 - Dostępność**
- Dostęp dla osób z niepełnosprawnościami (jeśli dotyczy)
- Wymagania dotyczące wind
- Specyfikacje dostępnych toalet
- **Status:** Wymagana zgodność jeśli budynek jest użyteczności publicznej

**§ 206 - Pomieszczenia sanitarne**
- Minimalne wymagania dotyczące toalet i umywalek
- Wymagania wentylacyjne

**§ 132 - Wysokości pomieszczeń**
- Minimalne wymagania wysokości w świetle wg typu pomieszczenia

[Kompletne odniesienie do WT 2021 →](/pl/przepisy/wt-2021)

---

### Normy PN-EN dla konstrukcji

**Wymagane normy:**
- PN-EN 1992 (Eurokod 2) - Konstrukcje betonowe
- PN-EN 1993 (Eurokod 3) - Konstrukcje stalowe
- PN-EN 1997 (Eurokod 7) - Projektowanie geotechniczne
- PN-EN 1991 (Eurokod 1) - Oddziaływania na konstrukcje

---

## Eksport kompletnego zestawu do pozwolenia w PDF

```bash
cd 04-projekt-budowlany/

# Eksport głównego projektu architektonicznego
pandoc projekt-architektoniczny.md -o projekt-architektoniczny.pdf \
  --template=../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex

# Eksport wszystkich obliczeń
pandoc obliczenia/cieplne.md -o obliczenia/cieplne.pdf
pandoc obliczenia/akustyczne.md -o obliczenia/akustyczne.pdf

# Eksport listy kontrolnej zgodności
pandoc lista-kontrolna-zgodnosci.md -o lista-kontrolna-zgodnosci.pdf

# Utwórz kompletny zestaw
pdftk projekt-architektoniczny.pdf \
      obliczenia/*.pdf \
      lista-kontrolna-zgodnosci.pdf \
      cat output kompletny-zestaw-pozwolenia.pdf
```

[Kompletny przewodnik eksportu PDF →](/pl/przewodniki/eksport-pdf)

---

## Przepływ pracy BIM - LOD 300

### Tworzenie szczegółowego modelu:

**Przepływ pracy w Revit:**
1. Utwórz konkretne typy ścian z dokładnymi warstwami
2. Dodaj precyzyjne wymiary
3. Utwórz szczegółowe rzuty
4. Dodaj wszystkie okna/drzwi ze specyfikacjami
5. Skoordynuj z modelem konstrukcyjnym
6. Skoordynuj z modelami instalacyjnymi
7. Przeprowadź wykrywanie kolizji
8. Eksportuj do IFC 4.0

### Eksport BIM do dokumentacji:
```bash
# Eksportuj IFC z Revit/ArchiCAD
# Plik > Eksport > IFC 4.0

# Wygeneruj specyfikacje z IFC
python ../bim-sync/ifc-to-markdown.py \
  --input model-budowlany.ifc \
  --output 04-projekt-budowlany/specyfikacje/ \
  --lod LOD_300 \
  --include-properties Pset_WallCommon,Pset_SlabCommon

# Sprawdź wygenerowany markdown
git diff
```

[Dowiedz się więcej o synchronizacji BIM z Markdown →](/pl/integracja-bim/synchronizacja-dwukierunkowa)

---

## Przepływ pracy Git

```bash
# Utwórz folder projektu budowlanego
mkdir 04-projekt-budowlany
cd 04-projekt-budowlany

# Utwórz strukturę podfolderów
mkdir obliczenia
mkdir specyfikacje
mkdir bim

# Utwórz główne dokumenty
touch projekt-architektoniczny.md
touch lista-kontrolna-zgodnosci.md
touch obliczenia/cieplne.md
touch obliczenia/akustyczne.md

# Zatwierdzaj regularnie w trakcie pracy
git add .
git commit -m "Projekt budowlany - obliczenia cieplne ukończone"

# Ostateczne zatwierdzenie i tag gdy gotowe do złożenia
git add .
git commit -m "Projekt budowlany kompletny - gotowy do złożenia wniosku"
git tag projekt-budowlany-v1.0
```

---

## Przykładowy Projekt

**Budynek Zielony Taras - Projekt Budowlany**
- [Kompletny zestaw do pozwolenia →](/pl/przyklady/zielony-taras/specyfikacja-projektu)
- [Specyfikacja ściany zewnętrznej →](/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a)
- [Strefa pożarowa Zielony Taras →](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

W fazie projektu budowlanego Semantyczny Model Budynku osiąga pełną specyfikację. Wszystkie siedem typów kart jest obecnych i szczegółowo opisanych:

- **Karty Pomieszczeń** — w pełni uszczegółowione z dokładnymi powierzchniami, precyzyjnymi wysokościami pomieszczeń i wszystkimi powiązanymi wymaganiami
- **Karty Stref** — kompletne z zweryfikowanymi klasyfikacjami stref pożarowych, wszystkie pomieszczenia przypisane do odpowiednich stref
- **Karty Wymagań** — zweryfikowane poprzez kontrole zgodności z WT 2021, normami EN i Prawem budowlanym
- **Karty Systemów** — utworzone dla instalacji HVAC, elektrycznych i wod-kan z wydajnościami i koncepcjami tras
- **Karty Instancji Zasobów** — zaczynają się pojawiać w miarę dobierania konkretnych produktów i zestawów
- **Karty Budynku i Kondygnacji** — sfinalizowane z potwierdzonymi wymiarami i rzędnymi

Kompilator SBM może teraz generować artefakty wyjściowe takie jak `compliance_report.json` i `bim_mapping.json`.

**Przykład: w pełni wyspecyfikowana karta Pomieszczenia**
```yaml
entity: Space
id: space-bedroom-01
name: "Sypialnia 01"
spaceType: "bedroom"
level: level-01
area: "14.72 m²"
ceilingHeight: "2.70 m"
zones:
  - zone-fire-zl-iv
  - zone-hvac-north
  - zone-acoustic-night
requirements:
  - req-thermal-wall-ext
  - req-fire-rei60
  - req-acoustic-rw50
systems:
  - system-hvac-central
  - system-electrical-floor1
finishes:
  floor: "Parkiet dębowy 15mm"
  walls: "Tynk gipsowy, malowany"
  ceiling: "Płyta gipsowo-kartonowa 12,5mm, malowana"
projectPhase: "design_development"
```

Dowiedz się więcej o [Semantycznym Modelu Budynku](/pl/dokumentacja/przeglad) i poznaj [dokumentację Kompilatora SBM](/pl/dokumentacja/kompilator/).

---

## Kontrola projektu w tej fazie

### Detekcja kolizji i koordynacja
Prowadź systematyczną detekcję kolizji między modelami architektonicznym, konstrukcyjnym i instalacyjnym.
- [Koordynacja BIM →](/pl/jakosc/procedury-przegladow)
- [Matryca LOD/LOI →](/pl/integracja-bim/lod-loi)

### Przygotowanie pozwolenia na budowę
Przygotuj komplet dokumentacji: projekt architektoniczny, konstrukcyjny, instalacyjny, ppoż.
- [Pozwolenie na budowę →](/pl/przepisy/pozwolenie-na-budowe)
- [MPZP i WZ →](/pl/przepisy/mpzp-wz)

### Bramka projektu budowlanego
Najważniejsza bramka — cała zgodność musi być zweryfikowana przed złożeniem wniosku o pozwolenie.
- [Listy kontrolne bramek fazowych →](/pl/jakosc/bramki-fazowe)

### Zarządzanie zmianami
Ustal formalne zarządzanie zmianami — zmiany po tej fazie są kosztowne.
- [Zarządzanie zmianami →](/pl/zarzadzanie-projektem/zarzadzanie-zmianami)

---

## Następne kroki

Po uzyskaniu pozwolenia na budowę:

**Kontynuuj do Fazy 5:**
[→ Projekt Wykonawczy (LOD 400)](/pl/fazy/wykonawczy)

**Lub wróć:**
[← Faza 3: Projekt Wstępny](/pl/fazy/wstepny)

**Zobacz kompletny przepływ:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed złożeniem wniosku o pozwolenie na budowę:

- [ ] Kompletny projekt architektoniczny ze wszystkimi wymaganymi rysunkami
- [ ] Projekt konstrukcyjny wykonany przez uprawnionego inżyniera
- [ ] Wszystkie projekty branżowe wykonane przez uprawnionych inżynierów
- [ ] Obliczenia cieplne kompletne i zgodne z przepisami
- [ ] Obliczenia akustyczne kompletne (jeśli wymagane)
- [ ] Zgodność z wymaganiami bezpieczeństwa pożarowego zweryfikowana
- [ ] Zgodność z wymaganiami dostępności zweryfikowana (jeśli dotyczy)
- [ ] Kompletna lista kontrolna zgodności przygotowana
- [ ] Wszystkie specyfikacje udokumentowane
- [ ] Model BIM na poziomie LOD 300 ukończony
- [ ] Wszystkie dokumenty wyeksportowane do PDF
- [ ] Kompletny zestaw do pozwolenia sprawdzony przez wszystkich projektantów
- [ ] Formularze wniosku wypełnione
- [ ] Wszystkie dokumenty podpisane i opieczętowane przez uprawnionych projektantów
- [ ] Gotowe do złożenia w organie administracji architektoniczno-budowlanej
