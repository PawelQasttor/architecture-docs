# Faza 2: Projekt Koncepcyjny (LOD 100)

::: tip Przegląd Fazy
**Co robisz:** Podstawowe studia bryły budynku, przybliżone wymiary, koncepcja projektowa
**BIM LOD:** LOD 100 - Reprezentacja symboliczna
**Czas trwania:** 2-3 tygodnie
**Dokumenty:** Koncepcja architektoniczna, modele brył, wstępna zgodność z przepisami, szacunek kosztów
:::

---

## Co dzieje się w tej fazie

W fazie projektu koncepcyjnego:
1. Opracowujesz 2-3 koncepcje projektowe na podstawie briefu
2. Tworzysz studia brył (kubatura i forma budynku)
3. Ustalasz przybliżone wymiary
4. Sprawdzasz koncepcje pod kątem wymagań zagospodarowania
5. Przygotowujesz wstępne szacunki kosztów
6. Prezentujesz koncepcje klientowi do wyboru

---

## Wymagania BIM - LOD 100

### Poziom Rozwoju
**LOD 100 = Reprezentacja symboliczna**

Na tym poziomie elementy BIM to:
- **Geometria:** Przybliżony rozmiar i lokalizacja
- **Właściwości:** Ogólne, niespecyficzne
- **Cel:** Studia kubaturowe, relacje przestrzenne
- **Przykład:** Prosta bryła reprezentująca budynek

### Co modelować:
```yaml
bimLOD: "LOD_100"
elements:
  - type: "Building Volume"
    geometry: "Approximate massing"
    dimensions: "Overall height, width, length"
    properties: "Generic"
```

**Przykład w BIM:**
- Ściany: Proste płaszczyzny pokazujące obrys budynku
- Stropy: Płaszczyzny poziome na właściwych rzędnych
- Dach: Podstawowy kształt (płaski, dwuspadowy itp.)
- Brak detali, brak konkretnych materiałów

[Dowiedz się więcej o definicjach LOD →](/pl/integracja-bim/definicje-lod)

---

## Dokumenty do stworzenia

### Dokument Koncepcji Projektowej
**Cel:** Przedstawienie koncepcji projektowej i jej uzasadnienia

**Konfiguracja YAML:**
```yaml
---
documentType: "conceptual_design"
projectPhase: "concept"
bimLOD: "LOD_100"
version: "1.0.0"
designConcept:
  name: "Koncepcja A - Budynek z Dziedzińcem"
  mainIdea: "Budynek zorganizowany wokół centralnego zielonego dziedzińca"
regulatoryCompliance:
  - regulation: "Construction_Law"
    article: "Art. 5"
    status: "preliminary_check"
---
```

**Kluczowe sekcje:**
- Opis koncepcji projektowej i jej uzasadnienie
- Diagramy brył (widoki 3D, przekroje)
- Przybliżone powierzchnie kondygnacji
- Organizacja przestrzenna
- Analizy nasłonecznienia
- Wstępna koncepcja materiałowa

[Szablon karty Pomieszczenia →](/pl/szablony/szablon-przestrzeni)

---

### Studia Brył
**Cel:** Analiza formy i kubatury budynku

**Co zawrzeć:**
- Kilka wariantów koncepcji (zazwyczaj 2-3)
- Modele brył 3D
- Kontekst terenu z sąsiednią zabudową
- Wysokość budynku i powierzchnia zabudowy
- Przybliżona PUC (Powierzchnia Użytkowa Całkowita)

**Przykładowa dokumentacja:**
```markdown
## Wariant Bryły A

**Powierzchnia zabudowy:** 450 m²
**Wysokość:** 18,5 m (6 kondygnacji)
**Całkowita PUC:** ~1 800 m²
**Wskaźnik zabudowy:** 37,5%

**Koncepcja formy:**
Prostopadłościenna bryła z centralnym dziedzińcem zapewniającym
światło naturalne i wentylację wszystkich mieszkań.
```

---

### Wstępna Zgodność z Przepisami
**Cel:** Weryfikacja zgodności koncepcji z podstawowymi wymaganiami

**Co zweryfikować:**

#### Zgodność z zagospodarowaniem
```yaml
regulatoryCompliance:
  - regulation: "Local_Zoning_Plan"
    parameters:
      maxHeight: "20 m"
      actualHeight: "18.5 m"
      status: "compliant"
      maxCoverage: "40%"
      actualCoverage: "37.5%"
      status: "compliant"
```

#### Prawo budowlane - Art. 5
Podstawowe wymagania dla budynków:
- Bezpieczeństwo konstrukcji (wstępna weryfikacja)
- Bezpieczeństwo pożarowe (podstawowa zgodność)
- Bezpieczeństwo użytkowania
- Dostępność (jeśli dotyczy)

[Przejrzyj wymagania Prawa budowlanego →](/pl/przepisy/prawo-budowlane)

---

### Szacunek Kosztów
**Cel:** Wstępna weryfikacja budżetu

**Metoda szacowania na poziomie LOD 100:**
- Koszt za m² w zależności od typu budynku
- Przybliżony rząd wielkości (±30%)

**Przykład:**
```yaml
costEstimate:
  method: "cost_per_sqm"
  gfa: "1800 m²"
  costPerSqm: "4500 PLN/m²"
  totalEstimate: "8,100,000 PLN"
  accuracy: "±30%"
  currency: "PLN"
```

---

## Przepisy do sprawdzenia

### Prawo budowlane
**Artykuł 5 - Ogólne wymagania techniczne**
- Nośność i stateczność konstrukcji
- Bezpieczeństwo pożarowe
- Bezpieczeństwo i higiena użytkowania
- Dostępność
- Efektywność energetyczna (podstawowe uwagi)

[Czytaj Prawo budowlane Art. 5 →](/pl/przepisy/prawo-budowlane#art-5)

### Wymagania zagospodarowania
Zweryfikuj koncepcję pod kątem:
- Ograniczeń wysokości zabudowy
- Wskaźnika zabudowy
- Odległości od granic działki
- Odległości od budynków sąsiednich
- Wymagań dotyczących miejsc parkingowych
- Wymagań dotyczących terenów zielonych

---

## Prezentacja dla Klienta

### Materiały prezentacyjne:
1. **Plansze koncepcyjne** - Wizualna prezentacja każdego wariantu
2. **Wizualizacje 3D** - Fotorealistyczne lub szkicowe
3. **Plany sytuacyjne** - Pokazujące lokalizację budynku
4. **Matryca porównawcza** - Porównanie wariantów koncepcyjnych

### Eksport do PDF:
```bash
cd 02-koncepcja/
pandoc koncepcja.md -o koncepcja-prezentacja.pdf \
  --template=../templates/pandoc/architectural-doc.latex
```

[Dowiedz się więcej o eksporcie PDF →](/pl/przewodniki/eksport-pdf)

---

## Przepływ pracy Git

```bash
# Utwórz folder fazy koncepcyjnej
mkdir 02-koncepcja
cd 02-koncepcja

# Utwórz dokumenty
touch koncepcja.md
touch studia-bryl.md
touch zgodnosc-z-przepisami.md

# Dodaj pliki BIM (jeśli używasz)
mkdir bim
# Dodaj pliki .rvt, .pln lub .ifc

# Zatwierdź
git add .
git commit -m "Projekt koncepcyjny - opracowano 3 warianty"
git tag koncepcja-v1.0
```

---

## Przykładowy Projekt

Zobacz jak ta faza została wykonana:

**Budynek Zielony Taras - Projekt Koncepcyjny**
- [Projekt Zielony Taras →](/pl/przyklady/zielony-taras/)
- [Przestrzenie Zielony Taras →](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Narzędzia dla tej fazy

### Oprogramowanie BIM (LOD 100):
- **Revit:** Rodziny brył koncepcyjnych (Conceptual Mass)
- **ArchiCAD:** Narzędzie Morph do brył
- **SketchUp:** Szybkie studia brył
- **Rhino:** Złożone formy

### Wizualizacja:
- **Enscape:** Renderowanie w czasie rzeczywistym z Revit/ArchiCAD
- **Lumion:** Szybkie wizualizacje
- **Blender:** Darmowy, zaawansowany rendering

### Diagramy:
- **Adobe Illustrator / Inkscape:** Tworzenie diagramów
- **Grasshopper (Rhino):** Parametryczne studia brył

---

## Karty SBM w tej fazie

W fazie projektu koncepcyjnego Semantyczny Model Budynku znacząco się rozrasta:

- **Karta Budynku** — uściślona o szczegóły lokalizacji, klasyfikację i wysokość całkowitą
- **Karty Kondygnacji** — tworzone z wysokościami między kondygnacjami i przybliżonymi rzędnymi
- **Karty Pomieszczeń** — tworzone dla poszczególnych pomieszczeń z przybliżonymi powierzchniami i przypisanymi typami przestrzeni
- **Karty Stref** — rozpoczynane dla wstępnych stref pożarowych i stref HVAC
- **Karty Wymagań** — zaczynają być powiązywane w miarę wyjaśniania się kontekstu przepisów

**Przykład: karta Pomieszczenia w fazie koncepcyjnej**
```yaml
entity: Space
id: space-bedroom-01
name: "Sypialnia 01"
spaceType: "bedroom"
level: level-01
approximateArea: "14.5 m²"
requirements:
  - "światło naturalne"
  - "minimum 8 m² wg WT 2021"
projectPhase: "concept"
```

Dowiedz się więcej o [Semantycznym Modelu Budynku](/pl/dokumentacja/przeglad) i poznaj [definicje kart SBM](/pl/dokumentacja/encje/).

---

## Kontrola projektu w tej fazie

### Przegląd wariantów projektowych
Dokumentuj alternatywy projektowe i uzasadnienie wybranego kierunku. Zapisuj decyzje w rejestrze.
- [Rejestr decyzji →](/pl/zarzadzanie-projektem/zarzadzanie)

### Wczesna koordynacja międzybranżowa
Rozpocznij koordynację: wykonalność konstrukcji, koncepcje tras instalacji, strategia pożarowa.
- [Procedury przeglądów →](/pl/jakosc/procedury-przegladow)

### Cele zrównoważonego rozwoju
Ustaw cele efektywności energetycznej i cele środowiskowe wcześnie — kształtują cały projekt.
- [Zrównoważone budownictwo →](/pl/zrownowazonosc/)
- [Energia i ślad węglowy →](/pl/zrownowazonosc/energia-karbon)

### Bramka koncepcji
Przed przejściem do projektu wstępnego przeprowadź formalny przegląd bramki koncepcji.
- [Listy kontrolne bramek fazowych →](/pl/jakosc/bramki-fazowe)

---

## Następne kroki

Po zatwierdzeniu koncepcji przez klienta:

**Kontynuuj do Fazy 3:**
[→ Projekt Wstępny (LOD 200)](/pl/fazy/wstepny)

**Lub wróć:**
[← Faza 1: Rozpoczęcie Projektu](/pl/fazy/rozpoczecie)

**Zobacz kompletny przepływ:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed przejściem do Projektu Wstępnego:

- [ ] Klient wybrał preferowaną koncepcję
- [ ] Model bryły utworzony (LOD 100)
- [ ] Przybliżone wymiary ustalone
- [ ] Wstępna zgodność z zagospodarowaniem zweryfikowana
- [ ] Wstępny szacunek kosztów przygotowany
- [ ] Koncepcja projektowa udokumentowana w markdown
- [ ] Wszystkie materiały zatwierdzone w Git
- [ ] Zgoda klienta na wybraną koncepcję
