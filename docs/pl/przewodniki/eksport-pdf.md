# Przewodnik eksportu PDF

Kompletny przewodnik po generowaniu profesjonalnych dokumentow PDF z dokumentacji markdown.

## Przeglad

Standard Dokumentacji Architektonicznej wykorzystuje **Pandoc** i **LaTeX** do konwersji plikow markdown na profesjonalne, gotowe do druku pliki PDF odpowiednie do:

- Wniosków o pozwolenie na budowe
- Prezentacji dla klientow
- Dokumentacji wykonawczej
- Przegladow regulacyjnych
- Oficjalnej archiwizacji

---

## Wymagania wstepne

### 1. Instalacja Pandoc

Pandoc to uniwersalny konwerter dokumentow.

**Windows:**
```powershell
# Za pomoca Chocolatey
choco install pandoc

# Lub pobierz instalator z https://pandoc.org/installing.html
```

**macOS:**
```bash
brew install pandoc
```

**Linux:**
```bash
sudo apt-get install pandoc
```

**Weryfikacja instalacji:**
```bash
pandoc --version
```

### 2. Instalacja LaTeX

LaTeX jest wymagany do generowania PDF.

**Windows - MiKTeX (zalecany):**
1. Pobierz z https://miktex.org/download
2. Uruchom instalator
3. Wybierz "Install missing packages automatically"

**macOS - MacTeX:**
```bash
brew install --cask mactex
```

**Linux - TeX Live:**
```bash
sudo apt-get install texlive-full
```

**Weryfikacja instalacji:**
```bash
xelatex --version
```

---

## Szybki start

### Podstawowy eksport PDF

```bash
pandoc document.md -o document.pdf
```

### Z naszym szablonem

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

### Ze spisem tresci

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

---

## Metadane dokumentu

Dodaj metadane do frontmatter pliku markdown:

### Przyklad metadanych

```yaml
---
title: "Sciana zewnetrzna - Typ A"
subtitle: "Specyfikacja techniczna"
author: "Anna Nowak, Architekt IARP #5678"
date: "2026-02-20"
project-name: "Budynek mieszkalny Zielony Taras"
document-reference: "EW-01"
document-type: "Specyfikacja elementu"
version: "1.5.0"
bim-lod: "LOD 400"
toc: true
number-sections: true
---
```

### Pola metadanych

| Pole | Opis | Przyklad |
|------|------|---------|
| **title** | Tytul dokumentu | "Sciana zewnetrzna Typ A" |
| **subtitle** | Podtytul/opis | "Specyfikacja techniczna" |
| **author** | Imie autora i uprawnienia | "Anna Nowak, IARP #5678" |
| **date** | Data dokumentu | "2026-02-20" |
| **project-name** | Nazwa projektu | "Zielony Taras" |
| **document-reference** | Identyfikator dokumentu | "EW-01" |
| **document-type** | Typ dokumentu | "Specyfikacja elementu" |
| **version** | Wersja dokumentu | "1.5.0" |
| **bim-lod** | Poziom szczegolowosci BIM | "LOD 400" |
| **toc** | Dolacz spis tresci | true/false |
| **number-sections** | Numeruj sekcje | true/false |

---

## Przyklady eksportu

### Przyklad 1: Specyfikacja projektu

**Plik markdown:** `project-specification.md`

```yaml
---
title: "Specyfikacja projektu"
subtitle: "Budynek mieszkalny Zielony Taras"
author: "Anna Nowak, Glowny Architekt"
date: "2026-02-20"
project-name: "Zielony Taras"
document-type: "Specyfikacja projektu"
version: "2.0.0"
toc: true
number-sections: true
---

# Tresc tutaj...
```

**Polecenie eksportu:**
```bash
pandoc project-specification.md -o project-spec.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

**Wynik:** Profesjonalny PDF z:
- Strona tytulowa
- Spis tresci
- Numerowane sekcje
- Naglowki/stopki z metadanymi
- Numery stron

### Przyklad 2: Specyfikacja elementu

**Plik markdown:** `external-wall-type-a.md`

```yaml
---
title: "Sciana zewnetrzna - Typ A"
document-reference: "EW-01"
author: "Anna Nowak"
project-name: "Zielony Taras"
version: "1.5.0"
bim-lod: "LOD 400"
signatures:
  - role: "Architekt"
    name: "Anna Nowak"
  - role: "Inzynier konstruktor"
    name: "Piotr Kowalski"
---
```

**Polecenie eksportu:**
```bash
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc
```

**Wynik:** Profesjonalna specyfikacja ze strona podpisow.

### Przyklad 3: Lista kontrolna zgodnosci

**Plik markdown:** `compliance-checklist.md`

```yaml
---
title: "Lista kontrolna zgodnosci regulacyjnej"
project-name: "Zielony Taras"
document-type: "Lista kontrolna zgodnosci"
author: "Anna Nowak"
---
```

**Polecenie eksportu:**
```bash
pandoc compliance-checklist.md -o compliance.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex
```

---

## Eksport wsadowy

### Eksport wszystkich dokumentow

**Unix/Linux/macOS:**
```bash
#!/bin/bash
for md in *.md; do
  if [ "$md" != "README.md" ]; then
    pandoc "$md" -o "${md%.md}.pdf" \
      --template=../../templates/pandoc/architectural-doc.latex \
      --pdf-engine=xelatex \
      --toc \
      --number-sections
  fi
done
```

**Windows PowerShell:**
```powershell
Get-ChildItem *.md | Where-Object { $_.Name -ne "README.md" } | ForEach-Object {
    $output = $_.BaseName + ".pdf"
    pandoc $_.Name -o $output `
        --template=..\..\templates\pandoc\architectural-doc.latex `
        --pdf-engine=xelatex `
        --toc `
        --number-sections
}
```

### Uzycie Makefile

Utwórz `Makefile` w swoim projekcie:

```makefile
TEMPLATE = ../../templates/pandoc/architectural-doc.latex
PANDOC = pandoc
PFLAGS = --template=$(TEMPLATE) --toc --number-sections --pdf-engine=xelatex

SOURCES = $(wildcard *.md)
PDFS = $(SOURCES:.md=.pdf)

all: $(PDFS)

%.pdf: %.md
	$(PANDOC) $< -o $@ $(PFLAGS)

clean:
	rm -f $(PDFS)

.PHONY: all clean
```

**Uzycie:**
```bash
make        # Eksportuj wszystkie markdown do PDF
make clean  # Usun wszystkie PDF-y
```

---

## Personalizacja

### Niestandardowy rozmiar strony

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable papersize=a3
```

**Opcje:** a4, a3, letter, legal

### Niestandardowe marginesy

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable geometry:"top=3cm,bottom=3cm,left=2.5cm,right=2.5cm"
```

### Niestandardowy rozmiar czcionki

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable fontsize=12pt
```

**Opcje:** 10pt, 11pt, 12pt, 14pt

### Wylaczenie strony tytulowej

```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex \
  --variable title-page=false
```

---

## Funkcje PDF

### Co jest zawarte

**Profesjonalny uklad**
- Papier A4 (lub niestandardowy rozmiar)
- Odpowiednie marginesy (domyslnie 2,5 cm)
- Naglowki z nazwa projektu i referencja dokumentu
- Stopki z autorem, numerami stron, data

**Obsluga polskich znakow**
- Pelne kodowanie UTF-8
- Prawidlowe renderowanie liter: a, c, e, l, n, o, s, z, z
- Polska dzielenie wyrazow

**Typografia**
- Profesjonalne czcionki
- Prawidlowe odstepy
- Numeracja sekcji
- Spis tresci z linkami

**Tabele**
- Profesjonalne formatowanie
- Prawidlowe wyrownanie
- Laczenie wierszy/kolumn
- Obsluga podpisow

**Bloki kodu**
- Podswietlanie skladni
- Czcionka o stalej szerokosci
- Jasnoszare tlo
- Zawijanie wierszy

**Hiperlinki**
- Klikalne linki w PDF
- Odwolania wewnetrzne
- Zewnetrzne adresy URL
- Oznaczone kolorem (niebieski)

**Obrazy**
- Pelna obsluga PNG, JPG, PDF
- Podpisy i numeracja
- Prawidlowe rozmiary

---

## Rozwiazywanie problemow

### "pandoc: command not found"

**Rozwiazanie:** Zainstaluj Pandoc (zobacz Wymagania wstepne)

### "! LaTeX Error: File not found"

**Rozwiazanie:** Zainstaluj pelna dystrybucje LaTeX
```bash
# macOS
brew install --cask mactex

# Linux
sudo apt-get install texlive-full

# Windows
# Zainstaluj ponownie MiKTeX z pelnym zestawem pakietow
```

### Polskie znaki sie nie wyswietlaja

**Rozwiazanie:** Uzyj silnika XeLaTeX
```bash
pandoc document.md -o document.pdf \
  --pdf-engine=xelatex
```

### "pdflatex not found in PATH"

**Windows:**
1. Zainstaluj ponownie MiKTeX
2. Dodaj do PATH: `C:\Program Files\MiKTeX\miktex\bin\x64`

**macOS:**
```bash
export PATH="/Library/TeX/texbin:$PATH"
```

### Duze tabele nie mieszcza sie na stronie

**Rozwiazanie:** Uzyj mniejszej czcionki lub orientacji poziomej
```bash
pandoc document.md -o document.pdf \
  --variable fontsize=10pt
```

### Obrazy sa za duze

**Rozwiazanie:** Zmien rozmiar w markdown
```markdown
![Podpis obrazu](image.png){width=50%}
```

---

## Integracja ze standardem

### Z przykladowego projektu

```bash
cd docs/en/examples/green-terrace/

# Eksportuj specyfikacje projektu
pandoc project-specification.md -o project-spec.pdf \
  --template=../../../../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections

# Eksportuj specyfikacje sciany
pandoc external-wall-type-a.md -o EW-01.pdf \
  --template=../../../../templates/pandoc/architectural-doc.latex \
  --pdf-engine=xelatex \
  --toc \
  --number-sections
```

### Zautomatyzowany eksport

Dodaj do `package.json`:

```json
{
  "scripts": {
    "pdf:examples": "cd docs/en/examples/green-terrace && ./build-pdf.sh"
  }
}
```

Uruchom poleceniem:
```bash
npm run pdf:examples
```

---

## Najlepsze praktyki

### 1. Zawsze uzywaj XeLaTeX

Dla obslugi polskich znakow:
```bash
--pdf-engine=xelatex
```

### 2. Dolaczaj spis tresci

Dla dokumentow dluzszych niz 3 strony:
```bash
--toc --number-sections
```

### 3. Wersjonuj swoje PDF-y

Nazywaj pliki z wersjami:
```bash
pandoc spec.md -o "EW-01_v1.5.0.pdf"
```

### 4. Przegladaj przed wyslaniem

Zawsze sprawdzaj:
- Strona tytulowa wyswietla prawidlowe informacje
- Spis tresci jest dokladny
- Tabele mieszcza sie na stronach
- Obrazy wyswietlaja sie prawidlowo
- Polskie znaki renderuja sie poprawnie
- Numery stron sa prawidlowe

### 5. Archiwizuj zrodlo i PDF

Zachowuj oba:
```
project/
├── specs/
│   ├── wall-spec.md      # Zrodlo (kontrola wersji)
│   └── wall-spec.pdf     # Eksport (do zlozen)
```

---

## Zaawansowane funkcje

### Niestandardowy szablon LaTeX

Edytuj `templates/pandoc/architectural-doc.latex`, aby dostosowac:

**Kolory:**
```latex
\definecolor{archblue}{RGB}{44,90,160}
\definecolor{archgray}{RGB}{100,100,100}
```

**Czcionki:**
```latex
\usepackage{times}      % Times New Roman
\usepackage{palatino}   % Palatino
```

**Naglowki/Stopki:**
```latex
\fancyhead[L]{Niestandardowy naglowek}
\fancyfoot[C]{Niestandardowa stopka}
```

### Dolaczanie tylko wybranych sekcji

Za pomoca filtrow Pandoc (zaawansowane):
```bash
pandoc document.md -o document.pdf \
  --lua-filter=section-filter.lua
```

---

## Zasoby

- **Podrecznik Pandoc**: https://pandoc.org/MANUAL.html
- **Dokumentacja LaTeX**: https://www.latex-project.org/
- **Nasze szablony**: `/templates/pandoc/`
- **Przykladowe skrypty**: `/templates/examples/sample-building/build-pdf.sh`

---

## Nastepne kroki

- [Zobacz przykladowy budynek →](/pl/przyklady/zielony-taras/)
- [Integracja BIM →](/pl/integracja-bim/)
- [Szablony →](/pl/szablony/)
