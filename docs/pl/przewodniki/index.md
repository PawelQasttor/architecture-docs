# Przewodniki

Instrukcje krok po kroku dotyczące korzystania ze Standardu Dokumentacji Architektonicznej w Twoich projektach.

## Rozpoczynanie pracy

### [Przewodnik eksportu PDF →](./eksport-pdf)

Dowiedz sie, jak konwertowac dokumentacje markdown do profesjonalnych dokumentow PDF.

**Czego sie nauczysz:**
- Instalacja Pandoc i LaTeX
- Eksport pojedynczych dokumentow
- Eksport wsadowy wielu plikow
- Dostosowywanie wynikow PDF
- Rozwiazywanie typowych problemow

**Idealny do:**
- Wniosków o pozwolenie na budowe
- Prezentacji dla klientow
- Oficjalnej dokumentacji

---

## Zaawansowane przeplywy pracy

### Integracja BIM

Dowiedz sie, jak synchronizowac modele BIM z dokumentacja markdown.

**IFC do Markdown:**
- [Synchronizacja dwukierunkowa →](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- Ekstrakcja danych elementow z plikow IFC
- Aktualizacja dokumentacji z modeli BIM
- Kontrola wersji danych BIM

**Omawiane tematy:**
- Eksport IFC z Revit/ArchiCAD
- Skrypty synchronizacji Python
- Ekstrakcja zestawow wlasciwosci (Property Sets)
- Dokumentacja warstw materialowych

---

## Przeplywy pracy projektowej

### Rozpoczynanie nowego projektu

1. **Wybierz szablon** z [Szablonow →](/pl/szablony/)
2. **Skopiuj do folderu projektu**
3. **Zaktualizuj frontmatter** danymi projektu
4. **Napisz specyfikacje** zgodnie ze standardem
5. **Eksportuj do PDF** w celu zlozenia dokumentow

### Dokumentowanie istniejacych budynkow

1. **Eksportuj IFC** z modelu BIM
2. **Uruchom skrypt synchronizacji** w celu wygenerowania markdown
3. **Wzbogac dokumentacje** o informacje o zgodnosci
4. **Kontrola wersji** za pomoca Git
5. **Eksportuj PDF** w razie potrzeby

### Dokumentacja zgodnosci

1. **Przejrzyj przepisy** w [Przepisach →](/pl/przepisy/)
2. **Uzyj szablonu listy kontrolnej zgodnosci**
3. **Odwolaj sie do wymagan** we frontmatter
4. **Udokumentuj weryfikacje** w tresci
5. **Eksportuj** do przegladu regulacyjnego

---

## Narzedzia i skrypty

### Walidacja

**Walidacja frontmatter:**
```bash
npm run validate path/to/document.md
```

**Walidacja wszystkich przykladow:**
```bash
npm run validate:examples
```

### Synchronizacja BIM

**Ekstrakcja z IFC:**
```bash
cd bim-sync/
python ifc-to-markdown.py building.ifc
```

### Eksport PDF

**Pojedynczy dokument:**
```bash
pandoc document.md -o document.pdf \
  --template=templates/pandoc/architectural-doc.latex
```

**Eksport wsadowy:**
```bash
./build-pdf.sh
```

---

## Wskazowki i najlepsze praktyki

### Dokumentacja

- **Stosuj spojne nazewnictwo**
  - Dopasuj nazwy elementow BIM
  - Uzywaj opisowych nazw plikow
  - Przestrzegaj konwencji nazewnictwa

- **Wersjonuj wszystko**
  - Regularnie wykonuj commity Git
  - Taguj wydania
  - Dokumentuj zmiany

- **Waliduj czesto**
  - Uruchom walidacje przed commitami
  - Sprawdz strukture frontmatter
  - Zweryfikuj wymagane pola

### Integracja BIM

- **Utrzymuj zestawy wlasciwosci**
  - Wypelnij wszystkie Psets
  - Uzywaj spojnych wartosci
  - Aktualizuj model BIM

- **Synchronizuj regularnie**
  - Co tydzien podczas projektowania
  - W miare potrzeb podczas budowy
  - Koncowa synchronizacja do dokumentacji powykonawczej

### Eksport PDF

- **Przejrzyj przed wyslaniem**
  - Sprawdz wszystkie strony
  - Zweryfikuj polskie znaki
  - Upewnij sie, ze tabele mieszcza sie na stronach
  - Przetestuj hiperlinki

---

## Typowe przeplywy pracy

### Cotygodniowy przeglad projektu

```bash
# 1. Eksportuj najnowszy IFC
# (z Revit/ArchiCAD)

# 2. Zaktualizuj dokumentacje
cd bim-sync/
python ifc-to-markdown.py latest-model.ifc

# 3. Przejrzyj zmiany
git diff

# 4. Zatwierdz
git commit -m "Cotygodniowa synchronizacja z BIM v1.3"

# 5. Eksportuj PDF do przegladu
cd ../docs/
./build-pdf.sh
```

### Wniosek o pozwolenie na budowe

```bash
# 1. Sfinalizuj dokumentacje
# Edytuj wszystkie wymagane dokumenty

# 2. Zwaliduj
npm run validate:examples

# 3. Eksportuj do PDF
cd docs/permit-submission/
./build-pdf.sh

# 4. Przejrzyj PDF-y
# Sprawdz wszystkie dokumenty

# 5. Zloz wniosek
# Wgraj PDF-y do portalu pozwolen
```

### Dokumentacja powykonawcza

```bash
# 1. Eksportuj koncowy IFC
# (zweryfikowany model powykonawczy)

# 2. Wygeneruj dokumentacje
python ifc-to-markdown.py as-built.ifc -o docs/as-built/

# 3. Dodaj dane weryfikacyjne
# Wypelnij wyniki testow, certyfikaty

# 4. Eksportuj PDF-y
cd docs/as-built/
./build-pdf.sh

# 5. Zarchiwizuj
git tag v-as-built
git archive -o project-archive.zip HEAD
```

---

## Rozwiazywanie problemow

### Typowe problemy

**Problem:** Walidacja nie powiodla sie
**Rozwiazanie:** Sprawdz [wymagania frontmatter](/pl/standardy/schema-frontmatter)

**Problem:** Bledy eksportu PDF
**Rozwiazanie:** Zobacz [Przewodnik eksportu PDF](/pl/przewodniki/eksport-pdf#rozwiazywanie-problemow)

**Problem:** Synchronizacja IFC nie powiodla sie
**Rozwiazanie:** Zobacz [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa#rozwiazywanie-problemow)

**Problem:** Polskie znaki sa uszkodzone
**Rozwiazanie:** Uzyj XeLaTeX: `--pdf-engine=xelatex`

---

## Samouczki wideo

*(Wkrotce)*

- Rozpoczynanie pracy (10 min)
- Przeplyw pracy BIM do Markdown (15 min)
- Opanowanie eksportu PDF (10 min)
- Kompletny przeglad projektu (30 min)

---

## Potrzebujesz pomocy?

- [Dokumentacja](/pl/standardy/)
- [Dyskusje GitHub](https://github.com/architecture-docs/standard/discussions)
- [Zglos problem](https://github.com/architecture-docs/standard/issues)
- [Kontakt](mailto:support@architecture-docs.org)

---

## Nastepne kroki

- [Zobacz przyklady →](/pl/przyklady/)
- [Przegladaj szablony →](/pl/szablony/)
- [Poznaj integracje BIM →](/pl/integracja-bim/)
