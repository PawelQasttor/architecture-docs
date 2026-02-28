# Faza 5: Projekt Wykonawczy (LOD 400)

::: tip Przegląd Fazy
**Co robisz:** Tworzysz szczegółowe rysunki wykonawcze i specyfikacje dla wykonawców
**BIM LOD:** LOD 400 - Geometria gotowa do realizacji, kompletne specyfikacje
**Czas trwania:** 4-6 tygodni
**Dokumenty:** Rysunki szczegółowe, specyfikacje elementów, specyfikacje materiałowe, instrukcje montażu
:::

---

## Co dzieje się w tej fazie

Dokumentacja Wykonawcza to etap, w którym:
1. Tworzysz szczegóły gotowe do realizacji dla wszystkich elementów budynku
2. Dokumentujesz każdy typ ściany, podłogi, okna, drzwi
3. Określasz dokładnych producentów i kody produktów
4. Przygotowujesz instrukcje montażu dla wykonawców
5. Tworzysz procedury kontroli jakości
6. Przygotowujesz dokumentację przetargową

**Ta dokumentacja trafia do wykonawców w celu wyceny i realizacji.**

---

## Wymagania BIM - LOD 400

### Poziom szczegółowości
**LOD 400 = Geometria do realizacji z kompletnymi specyfikacjami**

Na tym poziomie elementy BIM zawierają:
- **Geometria:** Gotowa do realizacji, dokładne wymiary
- **Właściwości:** Kompletne specyfikacje, producenci, kody produktów
- **Przeznaczenie:** Budowa, zamówienia, prefabrykacja
- **Szczegółowość:** Wystarczająca, aby wykonawca mógł zamówić i zamontować

```yaml
bimLOD: "LOD_400"
elements:
  externalWall_TypeA:
    ifcEntity: "IfcWallStandardCase"
    objectType: "ExternalWall_TypeA"
    globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
    layers:
      - material: "Ceresit CT 60 render"
        manufacturer: "Henkel Polska"
        productCode: "CT-60-WHITE"
        thickness: 15
        unit: "mm"
      - material: "Solbet AAC block"
        manufacturer: "Solbet"
        productCode: "SOLBET-400-200"
        thickness: 200
        unit: "mm"
    properties:
      Pset_WallCommon:
        LoadBearing: true
        IsExternal: true
        ThermalTransmittance: 0.18
        FireRating: "REI 60"
        AcousticRating: "Rw 55 dB"
```

[Dowiedz się o LOD 400 →](/pl/integracja-bim/definicje-lod#lod-400)

---

## Dokumenty do stworzenia

### Specyfikacje elementów
**Cel:** Szczegółowa specyfikacja dla KAŻDEGO typu elementu budowlanego

**Dokumentuj każdy element:**
- Wszystkie typy ścian (ściany zewnętrzne, wewnętrzne, działowe)
- Wszystkie typy stropów/sufitów
- Wszystkie typy okien
- Wszystkie typy drzwi
- Klatki schodowe
- Konstrukcja dachu
- Szczegóły fundamentów

**Przykładowa struktura:**

```yaml
---
documentType: "element_specification"
elementType: "external_wall"
elementName: "External Wall Type A"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
version: "1.0.0"
---
```

**Zawartość każdej specyfikacji:**
1. Opis elementu
2. Mapowanie IFC (typ IFC, GUID, właściwości)
3. Układ warstw z producentami
4. Parametry techniczne (termiczne, ogniowe, akustyczne)
5. Instrukcje montażu
6. Kryteria kontroli jakości
7. Powiązane detale i rysunki

[Zobacz kompletny przykład specyfikacji elementu →](/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a)
[Szablon Karty Przestrzeni →](/pl/szablony/szablon-przestrzeni)

---

### Specyfikacje materiałowe
**Cel:** Szczegółowe specyfikacje dla wszystkich materiałów

**Struktura YAML:**
```yaml
---
documentType: "material_specification"
materialName: "XPS Insulation - Styrodur 3035 CS"
bimLOD: "LOD_400"
version: "1.0.0"

manufacturer:
  name: "BASF Polska"
  website: "https://www.basf.com"
  contact: "+48 22 XXX XXXX"

product:
  productName: "Styrodur 3035 CS"
  productCode: "STY-3035-CS-150"
  standard: "PN-EN 13164"

technical:
  thermalConductivity: 0.034  # W/(m·K)
  compressiveStrength: 300    # kPa
  waterAbsorption: "< 0.2%"
  fireClass: "E"

procurement:
  supplierRecommended: "Nazwa dostawcy"
  leadTime: "2 tygodnie"
  costPerSqm: "45 PLN/m²"
---
```

[Szablon Karty Zasobu →](/pl/szablony/szablon-zasobu)

---

### Detale konstrukcyjne
**Cel:** Rysunki detali w dużej skali pokazujące połączenia

**Typowe wymagane detale:**
- Połączenie ściana-fundament
- Połączenie ściana-strop
- Połączenie ściana-dach
- Detal montażu okna
- Detal montażu drzwi
- Połączenie balkonu
- Detale hydroizolacji
- Eliminacja mostków termicznych

**Skala:** Zazwyczaj 1:5 lub 1:10

---

### Instrukcje montażu
**Cel:** Wytyczne dla wykonawców dotyczące prawidłowego montażu

**Przykład dla ściany zewnętrznej:**

```markdown
## Procedura montażu - Ściana zewnętrzna Typ A

### 1. Przygotowanie
- Sprawdź czy fundament jest wypoziomowany i czysty
- Sprawdź czy izolacja przeciwwilgociowa jest na miejscu

### 2. Montaż bloczków
- Muruj bloczki Solbet AAC na zaprawie cienkowarstwowej
- Maksymalna grubość spoiny: 3mm
- Zapewnij pionowość i poziomowanie

### 3. Montaż izolacji
- Zamocuj płyty Styrodur XPS klejem PU
- Mocowanie mechaniczne: 6 łączników na m²
- Układaj ze strzałkowaniem styków

### 4. Nakładanie tynku
- Nałóż tynk Ceresit CT 60
- Minimalna grubość: 15mm
- Czas schnięcia: 7 dni przed malowaniem

### 5. Kontrola jakości
- Sprawdź montaż pod kątem mostków termicznych
- Skontroluj hydroizolację we wszystkich przejściach
- Zalecana inspekcja termowizyjna
```

---

### Procedury kontroli jakości
**Cel:** Określenie wymagań dotyczących inspekcji i badań

```yaml
---
documentType: "quality_control"
projectPhase: "construction_docs"

inspections:
  - stage: "Fundamenty"
    tests:
      - "Badanie wytrzymałości betonu"
      - "Inspekcja zbrojenia"
    frequency: "Każde betonowanie"

  - stage: "Ściany zewnętrzne"
    tests:
      - "Inspekcja mostków termicznych"
      - "Test szczelności powietrznej (blower door)"
    frequency: "Po zakończeniu"

  - stage: "Okna"
    tests:
      - "Kontrola jakości montażu"
      - "Test wodoszczelności (próbka)"
    frequency: "Każda kondygnacja"
---
```

---

## Przepływ pracy BIM - LOD 400

### Tworzenie modelu gotowego do realizacji:

**W Revit:**
1. Wszystkie typy ścian z dokładnymi grubościami warstw
2. Konkretne rodziny producentów dla okien/drzwi
3. Szczegółowe połączenia i zestawy
4. Kompletne zestawy właściwości (Psets)
5. Specyfikacje materiałowe w modelu
6. Eksport do IFC 4.0

### Synchronizacja BIM → Markdown:

```bash
# Eksport IFC z narzędzia BIM
# Plik > Eksport > IFC 4.0 > construction-docs.ifc

# Generowanie specyfikacji elementów
python ../bim-sync/ifc-to-markdown.py \
  --input construction-docs.ifc \
  --output 05-construction-docs/specifications/ \
  --lod LOD_400 \
  --include-all-properties \
  --include-manufacturers

# Przegląd wygenerowanych specyfikacji
cd 05-construction-docs/specifications/
ls -l
# external-wall-type-a.md
# external-wall-type-b.md
# floor-slab-type-a.md
# window-type-a.md
# ...

# Przegląd i zatwierdzenie
git diff
git add .
git commit -m "Sync BIM specifications to markdown - LOD 400"
```

[Dowiedz się o synchronizacji BIM z Markdown →](/pl/integracja-bim/synchronizacja-dwukierunkowa)

---

## Eksport dla wykonawców

### Eksport PDF do przetargu:
```bash
cd 05-construction-docs/

# Eksport wszystkich specyfikacji
for file in specifications/*.md; do
  pandoc "$file" -o "specifications/$(basename "$file" .md).pdf" \
    --template=../templates/pandoc/architectural-doc.latex \
    --pdf-engine=xelatex
done

# Stworzenie kompletnej księgi specyfikacji
pdftk specifications/*.pdf cat output specification-book.pdf
```

[Kompletny przewodnik eksportu PDF →](/pl/przewodniki/eksport-pdf)

---

## Przepływ pracy Git

```bash
# Utwórz folder projektu wykonawczego
mkdir 05-construction-docs
cd 05-construction-docs

# Utwórz strukturę
mkdir specifications
mkdir materials
mkdir details
mkdir bim

# Utwórz specyfikacje dla WSZYSTKICH elementów
touch specifications/external-wall-type-a.md
touch specifications/external-wall-type-b.md
touch specifications/floor-slab-type-a.md
touch specifications/floor-slab-type-b.md
touch specifications/window-type-a.md
touch specifications/door-type-a.md
touch specifications/stairs.md
touch specifications/roof-assembly.md
# ... itd. dla WSZYSTKICH typów elementów

# Utwórz specyfikacje materiałowe
touch materials/concrete-c3037.md
touch materials/xps-insulation.md
touch materials/window-pvc-profile.md
# ... itd.

# Zatwierdzaj stopniowo
git add specifications/external-wall-type-a.md
git commit -m "Add external wall type A specification - LOD 400"

# Końcowe zatwierdzenie po ukończeniu
git add .
git commit -m "Construction documentation complete - all elements at LOD 400"
git tag construction-docs-v1.0
```

---

## Przykładowy Projekt

**Budynek Zielona Tarasa - Dokumentacja Wykonawcza**
- [Ściana zewnętrzna Typ A →](/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a)
- [Kompletne specyfikacje →](/pl/przyklady/zielony-taras/)

[Zobacz kompletny projekt Zielona Tarasa →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

[Semantyczny Model Budynku (SBM)](/pl/dokumentacja/przeglad) osiąga pełną głębokość specyfikacji podczas Dokumentacji Wykonawczej. Na tym etapie karty zawierają dane gotowe do realizacji -- wymiary montażowe, kody produktów i parametry potrzebne do zamówień i budowy.

### Karty Zasobu
Każde urządzenie (kocioł, centrala wentylacyjna, rozdzielnia) otrzymuje własną kartę z pełną specyfikacją: producent, model, kod produktowy i warunki dostawy. Karty Zasobu tworzy się dla wszystkich urządzeń mechanicznych, elektrycznych i sanitarnych (MEP).

[Dowiedz się o Kartach Zasobu →](/pl/dokumentacja/encje/zasob)

### Karty Systemów
Karty Systemów dla instalacji HVAC, elektrycznych i sanitarnych zawierają kompletne listy komponentów, obliczenia wymiarowania i wymagania dotyczące wydajności. Dzięki temu wykonawca widzi cały system w jednym miejscu.

[Dowiedz się o Kartach Systemów →](/pl/dokumentacja/encje/system)

### Karty Przestrzeni na poziomie LOD 400
Karty Przestrzeni zawierają specyfikacje gotowe do realizacji, w tym dokładne wykończenia, wymagania dotyczące wydajności i zestawienia urządzeń przypisanych do danego pomieszczenia.

### Wyjście Kompilatora
Kompilator SBM generuje `bim_mapping.json` z parametrami współdzielonymi Revit, umożliwiając bezpośrednią synchronizację BIM z definicji kart.

[Dowiedz się o kompilatorze SBM →](/pl/dokumentacja/kompilator/)

### Przykład: Karta Zasobu

```yaml
entity: asset
id: asset-boiler-01
name: "Centralny Kocioł Gazowy"
system: system-heating-central
location: space-technical-room-01

manufacturer:
  name: "Viessmann"
  model: "Vitodens 200-W"
  productCode: "B2HF-120"
  capacity: "120 kW"
  efficiency: "98%"

specifications:
  fuelType: "natural_gas"
  flowTemperature: "80°C"
  returnTemperature: "60°C"
  electricalSupply: "230V/50Hz"
  flueType: "concentric"
  weight: "89 kg"

procurement:
  leadTime: "4 weeks"
  supplier: "Viessmann Polska"
  estimatedCost: "€8,500"

compliance:
  standard: "PN-EN 15502"
  certification: "CE"
  energyLabel: "A"
```

[Zobacz dokumentację kart SBM →](/pl/dokumentacja/encje/)
[Zobacz przewodnik tworzenia SBM →](/pl/dokumentacja/tworzenie/)

---

## Kontrola projektu w tej fazie

### Kontrola jakości rysunków
Wszystkie rysunki wykonawcze muszą przejść przegląd QA. Sprawdź wymiary, opisy, odwołania.
- [Procedury przeglądów →](/pl/jakosc/procedury-przegladow)
- [Kontrola dokumentów →](/pl/zarzadzanie-projektem/kontrola-dokumentow)

### Wsparcie przetargowe
Przygotuj przedmiary i pakiety specyfikacji z dokumentacji.
- [Kontrola dokumentów →](/pl/zarzadzanie-projektem/kontrola-dokumentow)

### Śledzenie pozwolenia
Monitoruj status wniosku o pozwolenie na budowę. Reaguj na zapytania organu bezzwłocznie.
- [Pozwolenie na budowę →](/pl/przepisy/pozwolenie-na-budowe)

### Weryfikacja LOD/LOI
Sprawdź czy model BIM spełnia wymagania LOD 400 z konkretnymi produktami.
- [Matryca LOD/LOI →](/pl/integracja-bim/lod-loi)

---

## Następne kroki

Po ukończeniu dokumentacji wykonawczej:

**Kontynuuj do Fazy 6:**
[→ Faza Budowy](/pl/fazy/budowa)

**Lub wróć:**
[← Faza 4: Projekt Budowlany](/pl/fazy/budowlany)

**Zobacz kompletny przepływ pracy:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed przekazaniem wykonawcom:

- [ ] Specyfikacja stworzona dla KAŻDEGO użytego typu elementu
- [ ] Wszystkie specyfikacje zawierają producentów i kody produktów
- [ ] Model BIM ukończony na poziomie LOD 400
- [ ] Wszystkie specyfikacje materiałowe udokumentowane
- [ ] Instrukcje montażu dostarczone dla elementów krytycznych
- [ ] Procedury kontroli jakości zdefiniowane
- [ ] Wszystkie detale narysowane w odpowiedniej skali (1:5, 1:10)
- [ ] BIM zsynchronizowany ze specyfikacjami markdown
- [ ] Wszystkie specyfikacje wyeksportowane do PDF
- [ ] Kompletna księga specyfikacji złożona
- [ ] Wszystkie dokumenty sprawdzone przez konsultantów
- [ ] Dokumenty gotowe do przetargu
