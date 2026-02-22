# Dokumentacja Podwojnego Formatu

::: tip Zasada podstawowa
Kazdy dokument architektoniczny istnieje w **DWOCH FORMATACH**:
1. **Czytelny dla czlowieka** - Markdown z frontmatter YAML (dla architektow)
2. **Czytelny dla maszyny** - Czysty JSON (dla AI i oprogramowania)
:::

---

## Dlaczego dwa formaty?

Tradycyjna dokumentacja wymusza wybor:
- **Czytelna dla czlowieka** (Word, PDF) - Dobra dla ludzi, nieprzejrzysta dla maszyn
- **Czytelna dla maszyny** (XML, JSON) - Dobra dla oprogramowania, trudna dla ludzi

**Ten standard zapewnia oba** - napisz raz, konsumuj na wiele sposobow.

---

## Architektura

### Format zrodlowy: Markdown + YAML

**Co pisza architekci:**

```markdown
---
# Metadane czytelne maszynowo (YAML)
documentType: "element_specification"
elementType: "external_wall"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWallStandardCase"
  objectType: "ExternalWall_TypeA"
  globalId: "3vB2YO$rLBxv3VxEu2LPxQ"
regulatoryCompliance:
  - standard: "WT_2021"
    section: "§ 328"
    status: "compliant"
thermalPerformance:
  calculatedUValue: 0.18
  maxAllowedUValue: 0.20
  unit: "W/(m²·K)"
version: "1.0.0"
---

# Sciana zewnetrzna Typ A

## Uklad warstw

**Warstwy (od zewnatrz do wewnatrz):**
1. Tynk zewnetrzny, 15mm - Ceresit CT 60
2. Bloczek betonowy, 200mm - Solbet klasa 400
3. Izolacja XPS, 150mm - Styrodur 3035 CS
4. Szczelina powietrzna, 40mm
5. Plyta gipsowo-kartonowa, 12,5mm - Rigips RB

## Parametry cieplne

Obliczona wartosc U: **0,18 W/(m²·K)**
Wymagana maksymalna wartosc U: 0,20 W/(m²·K) (WT 2021 § 328)

**Status: Zgodny**

## Odpornosc ogniowa

Wymagana: REI 60 (budynek klasy ZL III)
Zapewniona: REI 90 (system certyfikowany)

**Status: Zgodny**
```

### Format pochodny: Czysty JSON

**Co konsumuje AI/oprogramowanie:**

```json
{
  "_metadata": {
    "sourceFile": "examples/green-terrace/external-wall-type-a.md",
    "extractedAt": "2026-02-20T20:35:00.000Z",
    "format": "yaml-frontmatter"
  },
  "documentType": "element_specification",
  "elementType": "external_wall",
  "bimLOD": "LOD_400",
  "ifcMapping": {
    "ifcEntity": "IfcWallStandardCase",
    "objectType": "ExternalWall_TypeA",
    "globalId": "3vB2YO$rLBxv3VxEu2LPxQ"
  },
  "regulatoryCompliance": [
    {
      "standard": "WT_2021",
      "section": "§ 328",
      "status": "compliant"
    }
  ],
  "thermalPerformance": {
    "calculatedUValue": 0.18,
    "maxAllowedUValue": 0.20,
    "unit": "W/(m²·K)"
  },
  "version": "1.0.0"
}
```

---

## Proces ekstrakcji

### Automatyczna ekstrakcja

Ekstrakcja frontmatter YAML z wszystkich plikow markdown do JSON:

```bash
# Ekstrakcja calej dokumentacji do JSON
npm run extract:json

# Ekstrakcja tylko przykladow
npm run extract:examples

# Budowanie strony + ekstrakcja JSON
npm run build:all
```

**Struktura wyjsciowa:**
```
docs/public/json/
├── index.json                    # Indeks glowny
├── all-documents.json            # Wszystkie frontmatter w jednym pliku
├── by-document-type.json         # Pogrupowane wg typu dokumentu
├── by-project-phase.json         # Pogrupowane wg fazy projektu
└── en/
    └── examples/
        └── green-terrace/
            ├── project-specification.json
            └── external-wall-type-a.json
```

---

## Scenariusze uzycia

### Dla architektow

**Odczyt/Zapis:** Pliki markdown
**Narzedzia:** Dowolny edytor tekstu (VS Code, Notepad++, vim)
**Kontrola wersji:** Git
**Eksport:** PDF przez Pandoc

```bash
# Edycja dokumentacji
code docs/en/examples/green-terrace/external-wall-type-a.md

# Zatwierdzenie w kontroli wersji
git add .
git commit -m "Aktualizacja specyfikacji sciany"

# Eksport do PDF
pandoc external-wall-type-a.md -o external-wall-type-a.pdf
```

---

### Dla agentow AI

**Odczyt:** Pliki JSON
**Dostep:** HTTP/system plikow
**Parsowanie:** Standardowe parsery JSON

```javascript
// Pobierz JSON bezposrednio
const response = await fetch('/json/en/examples/green-terrace/external-wall-type-a.json');
const wallSpec = await response.json();

// Dostep do danych strukturalnych
console.log(wallSpec.thermalPerformance.calculatedUValue); // 0.18
console.log(wallSpec.bimLOD); // "LOD_400"
console.log(wallSpec.ifcMapping.ifcEntity); // "IfcWallStandardCase"
```

---

### Dla oprogramowania BIM

**Odczyt:** Pliki JSON
**Import:** Aktualizacje wlasciwosci do modeli IFC

```python
import json
import ifcopenshell

# Odczytaj specyfikacje z JSON
with open('external-wall-type-a.json') as f:
    spec = json.load(f)

# Otworz model IFC
ifc = ifcopenshell.open('building.ifc')

# Znajdz sciane po GlobalId
wall = ifc.by_guid(spec['ifcMapping']['globalId'])

# Zaktualizuj wlasciwosci z JSON
pset = ifcopenshell.api.run("pset.add_pset", ifc,
    product=wall,
    name="Pset_WallCommon"
)

# Ustaw przewodnosc cieplna ze specyfikacji
ifcopenshell.api.run("pset.edit_pset", ifc,
    pset=pset,
    properties={
        "ThermalTransmittance": spec['thermalPerformance']['calculatedUValue']
    }
)
```

---

### Dla kontroli jakosci

**Odczyt:** Pliki indeksu JSON
**Walidacja:** Wzgledem schematow

```javascript
// Zaladuj wszystkie dokumenty
const allDocs = await fetch('/json/all-documents.json').then(r => r.json());

// Znajdz wszystkie specyfikacje LOD 400
const lod400Specs = allDocs.filter(doc => doc.bimLOD === 'LOD_400');

// Sprawdz status zgodnosci
const nonCompliant = allDocs.filter(doc =>
  doc.regulatoryCompliance?.some(c => c.status !== 'compliant')
);

console.log(`Lacznie specyfikacji LOD 400: ${lod400Specs.length}`);
console.log(`Dokumenty niezgodne: ${nonCompliant.length}`);
```

---

## Pliki indeksu JSON

### index.json
Glowny indeks wszystkich wyekstrahowanych dokumentow:

```json
{
  "generatedAt": "2026-02-20T20:35:00.000Z",
  "totalDocuments": 24,
  "documents": [
    {
      "file": "en/examples/green-terrace/project-specification.json",
      "documentType": "project_specification",
      "projectPhase": "design_development",
      "title": "Green Terrace Building - Project Specification"
    }
  ]
}
```

### by-document-type.json
Dokumenty pogrupowane wg typu:

```json
{
  "element_specification": [
    {
      "sourceFile": "en/examples/green-terrace/external-wall-type-a.md",
      "projectPhase": "construction_docs",
      "bimLOD": "LOD_400"
    }
  ],
  "project_specification": [...],
  "material_specification": [...]
}
```

### by-project-phase.json
Dokumenty pogrupowane wg fazy:

```json
{
  "initiation": [...],
  "concept": [...],
  "schematic": [...],
  "design_development": [...],
  "construction_docs": [
    {
      "sourceFile": "en/examples/green-terrace/external-wall-type-a.md",
      "documentType": "element_specification",
      "bimLOD": "LOD_400"
    }
  ]
}
```

---

## Korzysci z podwojnego formatu

### Dla architektow
- Pisz w prostym, czytelnym markdown
- Przyjaznosc dla kontroli wersji (czysty tekst)
- Latwa wspolpraca (Git)
- Eksport do PDF w razie potrzeby
- Nie wymaga specjalnego oprogramowania

### Dla AI
- Latwe parsowanie danych strukturalnych
- Zapytania i filtrowanie dokumentow
- Walidacja wzgledem schematow
- Wydajne indeksowanie i wyszukiwanie
- Automatyczne generowanie raportow

### Dla integracji BIM
- Aktualizacja wlasciwosci IFC z JSON
- Synchronizacja dokumentacji z modelem
- Zautomatyzowane sprawdzanie zgodnosci
- Walidacja zestawow wlasciwosci
- Przeplywy pracy z obiegiem zwrotnym

### Dla kontroli jakosci
- Zautomatyzowana walidacja
- Sprawdzanie zgodnosci
- Weryfikacja kompletnosci
- Egzekwowanie spojnosci
- Sciezka audytu przez Git

---

## Walidacja schematow JSON

Waliduj JSON wzgledem schematow, aby zapewnic jakosc danych:

```bash
# Walidacja wyekstrahowanego JSON
npm run validate:json
```

**Przyklad schematu:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["documentType", "bimLOD", "version"],
  "properties": {
    "documentType": {
      "type": "string",
      "enum": ["element_specification", "material_specification", "project_specification"]
    },
    "bimLOD": {
      "type": "string",
      "enum": ["LOD_100", "LOD_200", "LOD_300", "LOD_400", "LOD_500"]
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    }
  }
}
```

---

## Punkty koncowe API (w przyszlosci)

Pliki JSON moga byc serwowane przez HTTP w celu dostepu API:

```
GET /json/index.json
GET /json/all-documents.json
GET /json/by-document-type.json
GET /json/by-project-phase.json
GET /json/en/examples/green-terrace/external-wall-type-a.json
```

**Przyklady zapytan:**
```bash
# Pobierz wszystkie specyfikacje LOD 400
curl https://docs.example.com/json/all-documents.json | \
  jq '.[] | select(.bimLOD == "LOD_400")'

# Pobierz wszystkie dokumenty fazy budowy
curl https://docs.example.com/json/by-project-phase.json | \
  jq '.construction_docs'

# Pobierz konkretna specyfikacje sciany
curl https://docs.example.com/json/en/examples/green-terrace/external-wall-type-a.json
```

---

## Najlepsze praktyki

### 1. Zawsze pisz frontmatter
Kazdy dokument markdown powinien miec frontmatter YAML:

```yaml
---
documentType: "element_specification"
bimLOD: "LOD_400"
version: "1.0.0"
# ... wiecej metadanych
---
```

### 2. Ekstrahuj przed publikacja
Zawsze ekstrahuj JSON przed wdrozeniem:

```bash
npm run build:all
```

### 3. Waliduj wyekstrahowany JSON
Zapewnij jakosc danych:

```bash
npm run extract:json
npm run validate:json
```

### 4. Wersjonuj oba formaty
Zatwierdzaj zarowno markdown, jak i JSON w Git:

```bash
git add docs/en/examples/*.md
git add docs/public/json/**/*.json
git commit -m "Aktualizacja specyfikacji sciany"
```

---

## Nastepne kroki

- **Do pisania dokumentow:** [Uzyj szablonow](/pl/szablony/)
- **Do ekstrakcji:** Zobacz skrypt w `scripts/extract-frontmatter-to-json.js`
- **Do walidacji:** [Schemat frontmatter](/pl/standardy/schema-frontmatter)
- **Do synchronizacji BIM:** [Przewodnik synchronizacji dwukierunkowej](/pl/integracja-bim/synchronizacja-dwukierunkowa)

---

## Podsumowanie

**Podejscie podwojnego formatu umozliwia:**

```
Markdown + YAML          →  Zrodlo czytelne dla czlowieka
      ↓ (ekstrakcja)
   Czysty JSON           →  Dane czytelne dla maszyny
      ↓ (konsumpcja)
Wiele scenariuszy uzycia:
  - Parsowanie AI
  - Integracja BIM
  - Kontrola jakosci
  - Dostep API
  - Zautomatyzowana walidacja
```

**Napisz raz w markdown, konsumuj wszedzie jako JSON.**
