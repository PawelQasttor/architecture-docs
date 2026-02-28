# Faza 7: Dokumentacja Powykonawcza (LOD 500)

::: tip Przegląd Fazy
**Co robisz:** Dokumentujesz rzeczywisty stan wybudowanego obiektu
**BIM LOD:** LOD 500 - Zweryfikowane pomiary powykonawcze, faktycznie zamontowane produkty
**Czas trwania:** 2-4 tygodnie po zakończeniu budowy
**Dokumenty:** Model BIM powykonawczy, rysunki powykonawcze, zweryfikowane specyfikacje, protokoły badań, certyfikaty
:::

::: info Dlaczego dokumentacja powykonawcza?
Dokumentacja powykonawcza odzwierciedla **rzeczywistość**, a nie projekt. Budowa zawsze różni się od rysunków projektowych z powodu:
- Warunków terenowych
- Zamienników materiałowych
- Zmian projektowych
- Różnic montażowych
:::

---

## Co dzieje się w tej fazie

Dokumentacja Powykonawcza to etap, w którym:
1. Aktualizujesz model BIM o rzeczywiste wymiary po budowie
2. Dokumentujesz wszystkie zamontowane produkty (producenci, numery seryjne, numery partii)
3. Weryfikujesz specyfikacje z tym, co faktycznie zostało zamontowane
4. Zbierasz wszystkie wyniki badań i certyfikaty
5. Tworzysz końcowy zestaw rysunków powykonawczych
6. Przygotowujesz dokumentację do przekazania budynku

**Ta dokumentacja jest kluczowa dla:**
- Eksploatacji i konserwacji budynku
- Przyszłych remontów
- Roszczeń gwarancyjnych
- Weryfikacji zgodności z przepisami

---

## Wymagania BIM - LOD 500

### Poziom szczegółowości
**LOD 500 = Zweryfikowane pomiary powykonawcze, faktycznie zamontowane produkty**

Na tym poziomie elementy BIM reprezentują:
- **Geometria:** Zweryfikowane wymiary z pomiarów powykonawczych
- **Właściwości:** Faktycznie zamontowane produkty z numerami seryjnymi/partii
- **Daty:** Daty montażu
- **Weryfikacja:** Dane pomiarowe, zdjęcia, certyfikaty

```yaml
bimLOD: "LOD_500"
asBuiltVerification:
  method: "field_survey"
  date: "2026-06-15"
  verifiedBy: "Jan Kowalski, architekt"
  surveyAccuracy: "±5mm"

elements:
  externalWall_TypeA:
    ifcEntity: "IfcWallStandardCase"
    objectType: "ExternalWall_TypeA"
    globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
    asBuilt: true
    verifiedDimensions:
      thickness: 417  # mm (zmierzone, projektowe 415mm)
      height: 2985    # mm (zmierzone)
    installedMaterials:
      - layer: "XPS Insulation"
        manufacturer: "BASF Polska"
        productCode: "STY-3035-CS-150"
        batchNumber: "20260515-A"
        installationDate: "2026-05-20"
        certificate: "cert-xps-20260515.pdf"
    verification:
      thermalTesting:
        method: "Thermography"
        date: "2026-06-10"
        result: "Brak wykrytych mostków termicznych"
        report: "thermography-report-2026-06-10.pdf"
```

[Dowiedz się o LOD 500 →](/pl/integracja-bim/definicje-lod#lod-500)

---

## Dokumenty do stworzenia

### 1. Rejestr dokumentacji powykonawczej
**Cel:** Dokument główny zawierający wykaz wszystkich aktualizacji powykonawczych

**Struktura YAML:**
```yaml
---
documentType: "as_built_documentation"
projectPhase: "as_built"
bimLOD: "LOD_500"
version: "1.0.0"
asBuiltVerification:
  method: "field_survey"
  surveyDate: "2026-06-15"
  verifiedBy: "Imię Architekta, IARP 1234"
  surveyFirm: "Firma Geodezyjna Sp. z o.o."
  accuracy: "±5mm"
completionDate: "2026-06-01"
certificateOfOccupancy:
  issued: "2026-06-20"
  authority: "Urząd Miejski w Warszawie"
  number: "CO/2026/1234"
---

## Pakiet dokumentacji powykonawczej

Ten pakiet zawiera zweryfikowane informacje o stanie wybudowanym:

### 1. Powykonawczy model BIM
- Plik: `as-built-model.ifc`
- LOD: 500 (zweryfikowane wymiary)
- Ostatnia aktualizacja: 2026-06-15

### 2. Rysunki powykonawcze
- Rzuty kondygnacji (wszystkie poziomy) - zweryfikowane wymiary
- Przekroje - zweryfikowane
- Elewacje - zweryfikowane
- Detale - zweryfikowane

### 3. Zweryfikowane specyfikacje
Wszystkie specyfikacje elementów zaktualizowane o:
- Faktycznie zamontowane produkty
- Numery partii/seryjne producenta
- Daty montażu
- Certyfikaty materiałowe

### 4. Wyniki badań
- Parametry termiczne (termowizja)
- Szczelność powietrzna (test blower door)
- Parametry akustyczne
- Badania konstrukcyjne

### 5. Certyfikaty materiałowe
- Certyfikaty badań betonu
- Certyfikaty izolacji
- Certyfikaty parametrów okien
- Wszystkie certyfikaty produktów
```

[Szablon Karty Przestrzeni →](/pl/szablony/szablon-przestrzeni) *(zaktualizuj wersję na powykonawczą)*

---

### 2. Raport z pomiarów powykonawczych
**Cel:** Dokumentacja metodyki weryfikacji

```markdown
## Raport z pomiarów powykonawczych

**Data pomiarów:** 2026-06-15
**Metoda pomiaru:** Tachimetr + pomiar laserowy
**Dokładność:** ±5mm
**Geodeta:** Firma Geodezyjna Sp. z o.o.

### Zmierzone elementy

**Elementy konstrukcyjne:**
- Wszystkie lokalizacje słupów zweryfikowane
- Wszystkie rzędne stropów zweryfikowane
- Wszystkie wymiary belek zweryfikowane
- Odchylenie od projektu: maks. 12mm (w granicach tolerancji)

**Elementy obudowy:**
- Wszystkie grubości ścian zmierzone
- Wszystkie lokalizacje okien zweryfikowane
- Wszystkie lokalizacje drzwi zweryfikowane

### Odchylenia od projektu

| Element | Wymiar projektowy | Wymiar powykonawczy | Odchylenie | Status |
|---------|------------------|---------------------|------------|--------|
| Ściana Typ A grubość | 415mm | 417mm | +2mm | Dopuszczalne |
| Kondygnacja 3 rzędna | +9,00m | +9,01m | +10mm | Dopuszczalne |
| Okno W01 szerokość | 1200mm | 1198mm | -2mm | Dopuszczalne |

**Wniosek:** Wszystkie odchylenia mieszczą się w dopuszczalnych tolerancjach.
```

---

### 3. Zaktualizowane specyfikacje elementów
**Cel:** Aktualizacja specyfikacji o faktycznie zamontowane produkty

**Przykład - Aktualizacja ściany zewnętrznej Typ A:**

```yaml
---
documentType: "element_specification"
elementType: "external_wall"
elementName: "External Wall Type A - AS-BUILT"
bimLOD: "LOD_500"
asBuilt: true
verificationDate: "2026-06-15"

ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
---

## POWYKONAWCZY układ ściany

**Zmierzona grubość całkowita:** 417mm (projekt: 415mm)

**Zamontowane warstwy (od zewnątrz do wewnątrz):**

1. **Tynk zewnętrzny**
   - Produkt: Ceresit CT 60 White
   - Partia: CT60-20260510-B
   - Zamontowano: 2026-05-25
   - Grubość: 16mm (zmierzona)
   - Certyfikat: cert-render-20260525.pdf

2. **Bloczek betonowy**
   - Produkt: Solbet AAC 400, 200mm
   - Partia: SOLBET-20260415-C
   - Zamontowano: 2026-04-20 do 2026-05-10
   - Grubość: 201mm (zmierzona)
   - Certyfikat: cert-solbet-20260420.pdf

3. **Izolacja XPS**
   - Produkt: BASF Styrodur 3035 CS, 150mm
   - Partia: 20260515-A
   - Zamontowano: 2026-05-20
   - Grubość: 151mm (zmierzona)
   - Certyfikat: cert-xps-20260515.pdf

4. **Pustka powietrzna**
   - Zmierzona: 38mm (projekt: 40mm)

5. **Płyta gipsowo-kartonowa**
   - Produkt: Rigips RB 12,5mm
   - Partia: RB-20260601-A
   - Zamontowano: 2026-06-01
   - Grubość: 11mm (zmierzona)

## Badania weryfikacyjne

**Parametry termiczne:**
- Metoda: Skanowanie termowizyjne
- Data: 2026-06-10
- Wynik: Brak wykrytych mostków termicznych
- Obliczona wartość U (powykonawcza): 0,17 W/(m2·K)
- Projektowa wartość U: 0,18 W/(m2·K)
- Status: Lepiej niż projekt

**Szczelność powietrzna:**
- Metoda: Test blower door
- Data: 2026-06-12
- Wynik: n50 = 0,8 h-1
- Wymagane: n50 <= 1,0 h-1
- Status: Zgodny
```

---

### 4. Protokoły badań i inspekcji

**Badania termowizyjne:**
```yaml
---
documentType: "test_protocol"
testType: "thermography"
testDate: "2026-06-10"
standard: "PN-EN 13187"
---

## Inspekcja termowizyjna

**Badano:** Całą obudowę budynku
**Warunki:**
- Temp. wewnętrzna: 20°C
- Temp. zewnętrzna: 5°C
- Pogoda: Czyste niebo, bezwietrznie

**Wyniki:**
- Brak znaczących mostków termicznych
- Drobna anomalia przy połączeniu balkonu (dopuszczalna)
- Wszystkie przegrody ścienne działają zgodnie z projektem

**Wniosek:** POZYTYWNY

**Raport:** thermography-full-report-20260610.pdf
```

**Test szczelności powietrznej (Blower Door):**
```yaml
---
documentType: "test_protocol"
testType: "blower_door"
testDate: "2026-06-12"
standard: "PN-EN 13829"
---

## Test szczelności powietrznej (Blower Door)

**Kubatura budynku:** 5 400 m3
**Powierzchnia obudowy:** 2 100 m2

**Wyniki badań:**
- Krotność wymiany powietrza przy 50 Pa: n50 = 0,8 h-1
- Wymagana: n50 <= 1,0 h-1
- Status: POZYTYWNY

**Zidentyfikowane punkty nieszczelności:**
- Drobne: Połączenia ram okiennych (uszczelnione podczas testu)
- Drobne: Przejścia instalacji elektrycznych (uszczelnione)

**Wniosek:** Budynek przekracza wymagania szczelności powietrznej

**Raport:** blower-door-report-20260612.pdf
```

---

### 5. Komplet certyfikatów materiałowych
**Cel:** Zebranie wszystkich certyfikatów produktów

**Organizacja certyfikatów:**
```
07-as-built/
└── certificates/
    ├── concrete/
    │   ├── foundation-c3037-batch-A.pdf
    │   ├── slab-c3037-batch-B.pdf
    │   └── columns-c3037-batch-C.pdf
    ├── insulation/
    │   ├── xps-styrodur-batch-20260515-A.pdf
    │   └── mineral-wool-batch-20260518-B.pdf
    ├── windows/
    │   ├── window-type-a-performance-cert.pdf
    │   └── window-type-b-performance-cert.pdf
    └── finishes/
        ├── render-ceresit-batch-CT60-20260510-B.pdf
        └── paint-batch-20260605-A.pdf
```

---

## Przepływ pracy BIM - Tworzenie modelu powykonawczego

### Aktualizacja modelu BIM danymi z pomiarów:

```bash
# 1. Pozyskanie danych z pomiarów powykonawczych
# Firma geodezyjna dostarcza: survey-data.csv

# 2. Aktualizacja modelu BIM w Revit/ArchiCAD
# - Import punktów pomiarowych
# - Dostosowanie wymiarów elementów do pomiarów
# - Aktualizacja właściwości produktów na faktycznie zamontowane
# - Dodanie numerów partii/seryjnych
# - Dodanie dat montażu

# 3. Eksport powykonawczego IFC
# Plik > Eksport > IFC 4.0 > as-built-model.ifc

# 4. Generowanie specyfikacji powykonawczych z IFC
python ../bim-sync/ifc-to-markdown.py \
  --input as-built-model.ifc \
  --output 07-as-built/specifications-verified/ \
  --lod LOD_500 \
  --as-built true

# 5. Przegląd wygenerowanych specyfikacji
cd 07-as-built/specifications-verified/
ls -l
# external-wall-type-a-as-built.md
# floor-slab-type-a-as-built.md
# itd.

# 6. Zatwierdzenie modelu powykonawczego
git add 07-as-built/
git commit -m "As-built documentation complete - LOD 500"
git tag as-built-v1.0
```

[Dowiedz się o synchronizacji BIM z Markdown →](/pl/integracja-bim/synchronizacja-dwukierunkowa)

---

## Przepisy - Zgodność końcowa

### Pozwolenie na użytkowanie
**Wymagane przez:** Prawo budowlane Art. 57

Przed zasiedleniem budynku należy uzyskać:
- Pozwolenie na użytkowanie
- Wymaga końcowej inspekcji organu nadzoru budowlanego
- Wymaga dokumentacji powykonawczej potwierdzającej zgodność

### Wymagane inspekcje końcowe:
- Końcowa inspekcja organu nadzoru budowlanego
- Inspekcja bezpieczeństwa pożarowego
- Inspekcja sanitarna (jeśli dotyczy)
- Odbiór instalacji elektrycznej
- Odbiór instalacji gazowej (jeśli dotyczy)

[Dowiedz się o inspekcjach końcowych →](/pl/przepisy/prawo-budowlane#final-inspections)

---

## Przepływ pracy Git

```bash
# Utwórz folder dokumentacji powykonawczej
mkdir 07-as-built
cd 07-as-built

# Utwórz strukturę
mkdir specifications-verified
mkdir certificates
mkdir test-reports
mkdir bim

# Skopiuj i zaktualizuj specyfikacje
cp ../05-construction-docs/specifications/*.md specifications-verified/
# Zaktualizuj każdy plik o informacje powykonawcze

# Dodaj raporty z badań
cp thermography-report.pdf test-reports/
cp blower-door-report.pdf test-reports/

# Dodaj certyfikaty
# Uporządkuj według typu materiału

# Dodaj powykonawczy model BIM
cp as-built-model.ifc bim/

# Zatwierdź dokumentację powykonawczą
git add .
git commit -m "As-built documentation complete - verified field conditions"
git tag as-built-v1.0
```

---

## Przykładowy Projekt

**Budynek Zielony Taras - Dokumentacja Powykonawcza**
- [Przestrzenie Zielony Taras →](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)
- [Projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

[Semantyczny Model Budynku (SBM)](/pl/dokumentacja/przeglad) osiąga stan zweryfikowany w fazie Powykonawczej. Wszystkie karty są walidowane względem rzeczywistych warunków po budowie, tworząc autorytatywny zapis budynku w formie gotowej do archiwizacji.

### Wszystkie karty zweryfikowane względem stanu powykonawczego
Każda karta SBM jest sprawdzana i aktualizowana, aby odzwierciedlać zweryfikowaną, wybudowaną rzeczywistość -- nie zamierzenia projektowe, lecz to, co faktycznie powstało na budowie.

### Aktualizacja Kart Przestrzeni
Karty Przestrzeni uzupełnia się o zmierzone powierzchnie, zweryfikowane wysokości pomieszczeń, potwierdzone wykończenia i faktyczne urządzenia obecne w każdej przestrzeni. Architekt porównuje projekt z pomiarem i odnotowuje odchylenia.

### Uzupełnienie Kart Zasobu
Karty Zasobu otrzymują zweryfikowane numery seryjne, końcowe wyniki badań, informacje gwarancyjne i potwierdzone parametry eksploatacyjne. Stanowią podstawę przyszłej konserwacji.

[Dowiedz się o Kartach Zasobu →](/pl/dokumentacja/encje/zasob)

### Weryfikacja Wymagań
Karty Wymagań są sprawdzane względem zmierzonych wartości -- parametry termiczne z termowizji, parametry akustyczne z badań i odporność ogniowa z certyfikatów. Każde wymaganie rejestruje swój status zgodności.

### Wyjście Kompilatora
Kompilator SBM generuje kompletny `compliance_report.json` ze statusem weryfikacji dla każdego wymagania, łącząc zmierzone wartości z odpowiednimi raportami z badań i certyfikatami.

[Dowiedz się o kompilatorze SBM →](/pl/dokumentacja/kompilator/)

### Przykład: Karta Przestrzeni z pomiarami powykonawczymi

```yaml
entity: space
id: space-bedroom-01
name: "Sypialnia 01"
level: level-02
zone_memberships:
  - zone-fire-zl-iv
  - zone-acoustic-night
  - zone-hvac-north

as_built:
  verificationDate: "2026-06-15"
  verifiedBy: "Jan Kowalski, architekt"
  surveyMethod: "laser_measurement"
  surveyAccuracy: "±5mm"

dimensions:
  designArea: 16.5     # m² (z projektu)
  measuredArea: 16.62  # m² (pomiar powykonawczy)
  designHeight: 2.80   # m
  measuredHeight: 2.79 # m
  deviation: "w granicach tolerancji"

finishes:
  floor:
    specified: "Deska inżynierska dębowa"
    installed: "Deska inżynierska dębowa"
    manufacturer: "Barlinek"
    batchNumber: "BRK-2026-0515-A"
    status: "zweryfikowane"
  walls:
    specified: "Płyta gipsowo-kartonowa, malowana"
    installed: "Płyta gipsowo-kartonowa, malowana"
    status: "zweryfikowane"
  ceiling:
    specified: "Płyta gipsowo-kartonowa, malowana"
    installed: "Płyta gipsowo-kartonowa, malowana"
    status: "zweryfikowane"

compliance:
  thermal:
    required: "U ≤ 0,18 W/(m²·K)"
    measured: "U = 0,17 W/(m²·K)"
    testReport: "thermography-report-20260610.pdf"
    status: "POZYTYWNY"
  acoustic:
    required: "Rw ≥ 50 dB"
    measured: "Rw = 55 dB"
    testReport: "acoustic-report-20260612.pdf"
    status: "POZYTYWNY"
```

[Zobacz Sypialnia 01 Zielony Taras →](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)
[Zobacz dokumentację kart SBM →](/pl/dokumentacja/encje/)

---

## Kontrola projektu w tej fazie

### Zbieranie poprawek powykonawczych
Zbierz oznaczenia zmian z budowy. Systematyczna weryfikacja pomieszczenie po pomieszczeniu: rzeczywiste vs projektowane wymiary.
- [Kontrola dokumentów →](/pl/zarzadzanie-projektem/kontrola-dokumentow)

### Aktualizacja modelu powykonawczego
Zaktualizuj model BIM do stanu faktycznego. Zweryfikuj wymagania LOD 500.
- [Matryca LOD/LOI →](/pl/integracja-bim/lod-loi)

### Weryfikacja zgodności
Ponownie zweryfikuj zgodność elementów zmienionych w trakcie budowy.
- [Bramki fazowe →](/pl/jakosc/bramki-fazowe)

---

## Następne kroki

Po ukończeniu dokumentacji powykonawczej:

**Kontynuuj do Fazy 8:**
[→ Przekazanie i Konserwacja](/pl/fazy/przekazanie)

**Lub wróć:**
[← Faza 6: Faza Budowy](/pl/fazy/budowa)

**Zobacz kompletny przepływ pracy:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed przekazaniem klientowi:

- [ ] Pomiary powykonawcze wykonane
- [ ] Model BIM zaktualizowany do LOD 500 (zweryfikowane wymiary)
- [ ] Wszystkie specyfikacje elementów zaktualizowane o dane powykonawcze
- [ ] Wszystkie numery partii/seryjne materiałów udokumentowane
- [ ] Wszystkie certyfikaty zebrane i uporządkowane
- [ ] Badania termiczne ukończone (termowizja)
- [ ] Badanie szczelności powietrznej ukończone (blower door)
- [ ] Badania akustyczne ukończone (jeśli wymagane)
- [ ] Badania konstrukcyjne ukończone (jeśli wymagane)
- [ ] Pozwolenie na użytkowanie uzyskane
- [ ] Komplet rysunków powykonawczych gotowy
- [ ] Cała dokumentacja zatwierdzona w Git
- [ ] Gotowość do przekazania klientowi
