# Struktura Dokumentu

> **Uwaga:** Ta strona opisuje tradycyjny przepływ pracy oparty na fazach projektu. Informacje o dokumentacji opartej na kartach z wykorzystaniem Semantycznego Modelu Budynku znajdują się w [Przeglądzie SBM](/pl/dokumentacja/przeglad).

## Kompletny Przepływ Pracy Architekta

Standard Dokumentacji Architektonicznej jest zorganizowany zgodnie z rzeczywistym przepływem pracy architekta - od rozpoczęcia projektu do dokumentacji konserwacyjnej.

---

## Fazy Projektu

### 1. Rozpoczęcie Projektu
**Co robisz:** Rozpoczynasz nowy projekt architektoniczny

**Dokumenty do stworzenia:**
- Brief projektu
- Wstępna analiza miejsca
- Program funkcjonalno-użytkowy
- Wstępny budżet

**W tym standardzie:**
```yaml
documentType: "project_brief"
projectPhase: "initiation"
```

*Dokumentacja briefu projektu -- zobacz [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/).*

---

### 2. Projekt Koncepcyjny (LOD 100)
**Co robisz:** Podstawowe bryły, orientacyjne wymiary, koncepcja

**Dokumenty:**
- Koncepcja architektoniczna
- Studium masy i skali
- Wstępna zgodność z przepisami
- Szacunkowe koszty

**BIM:**
- LOD 100 - Symboliczna reprezentacja
- Geometria orientacyjna
- Parametry ogólne

**Przepisy do sprawdzenia:**
- Prawo budowlane Art. 5
- Plan zagospodarowania przestrzennego
- Warunki zabudowy

```yaml
documentType: "conceptual_design"
projectPhase: "concept"
bimLOD: "LOD_100"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
```

*Dokumentacja projektu koncepcyjnego -- zobacz [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/).*

---

### 3. Projekt Wstępny (LOD 200)
**Co robisz:** Projekt schematyczny, układy funkcjonalne, systemy ogólne

**Dokumenty:**
- Rzuty kondygnacji (1:100)
- Przekroje (1:100)
- Elewacje (1:100)
- Wstępne specyfikacje materiałów
- Specyfikacje systemów (ogólne)

**BIM:**
- LOD 200 - Przybliżone kształty
- Ogólne systemy
- Podstawowe właściwości

**Przepisy:**
- WT 2021 § 328 (docelowe wartości U)
- WT 2021 § 234 (wymagania pożarowe)
- WT 2021 § 55 (dostępność)

```yaml
documentType: "schematic_design"
projectPhase: "schematic"
bimLOD: "LOD_200"
regulatoryCompliance:
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55"]
```

**Eksport dokumentów:**
- Rzuty → PDF
- Specyfikacje → PDF dla klienta

*Dokumentacja projektu wstępnego -- zobacz [Szablon przestrzeni](/pl/szablony/szablon-przestrzeni) i [Szablon strefy](/pl/szablony/szablon-strefy).*

---

### 4. Projekt Budowlany (LOD 300)
**Co robisz:** Szczegółowe projekty, pozwolenie na budowę

**Dokumenty WYMAGANE:**
- Projekt architektoniczny (szczegółowy)
- Projekt konstrukcyjny
- Projekty instalacji
- Specyfikacje techniczne wszystkich elementów
- Obliczenia (cieplne, akustyczne, konstrukcyjne)
- **Lista kontrolna zgodności**

**BIM:**
- LOD 300 - Precyzyjne geometrie
- Konkretne zespoły
- Szczegółowe właściwości

**Przepisy - PEŁNA ZGODNOŚĆ:**
- Prawo budowlane Art. 34 (zakres projektu)
- WT 2021 wszystkie wymagane paragrafy
- PN-EN normy dla konstrukcji

```yaml
documentType: "building_permit_set"
projectPhase: "design_development"
bimLOD: "LOD_300"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    status: "compliant"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234", "§ 55", "§ 206", "§ 132"]
    status: "verified"
```

**Eksport:**
- Komplet PDF dla urzędu
- Obliczenia PDF
- Lista kontrolna zgodności

*Dokumentacja projektu budowlanego -- zobacz [Szablon wymagania](/pl/szablony/szablon-wymagania).*
*Weryfikacja regulacyjna -- zobacz [Karta wymagania](/pl/dokumentacja/encje/wymaganie).*

---

### 5. Projekt Wykonawczy (LOD 400)
**Co robisz:** Dokumentacja dla wykonawcy, detale montażowe

**Dokumenty:**
- Szczegółowe rysunki wykonawcze
- Detale konstrukcyjne
- **Specyfikacje elementów** (każdy typ!)
- Specyfikacje materiałów (producenci, kody produktów)
- Instrukcje montażu
- Kontrola jakości

**BIM:**
- LOD 400 - Geometria do produkcji
- Kompletne specyfikacje
- Wszystkie właściwości
- Producenci i kody

**Dla KAŻDEGO elementu:**

```yaml
documentType: "element_specification"
bimLOD: "LOD_400"
ifcMapping:
  ifcEntity: "IfcWall"
  objectType: "ScianZewnetrzna_TypA"
  globalId: "..."
```

**Przykładowe elementy do udokumentowania:**
- Wszystkie typy ścian (zewnętrzne, wewnętrzne)
- Wszystkie typy stropów
- Wszystkie typy okien i drzwi
- Schody
- Dach
- Posadzki
- Sufity

[Szablon przestrzeni (specyfikacja elementu)](/pl/szablony/szablon-przestrzeni) | [Tworzenie kart](/pl/dokumentacja/tworzenie/tworzenie-encji)
[Szablon zasobu (specyfikacja materiału)](/pl/szablony/szablon-zasobu)

**Synchronizacja BIM:**
```bash
# Eksport IFC z Revit/ArchiCAD
# Generuj dokumentację
python bim-sync/ifc-to-markdown.py projekt.ifc
```

---

### 6. Faza Budowy
**Co robisz:** Nadzór autorski, dziennik budowy, zmiany

**Dokumenty:**
- Protokoły z narad
- Dziennik nadzoru
- Odpowiedzi na zapytania wykonawcy (RFI)
- Dokumentacja zmian
- Protokoły odbioru etapów

```yaml
documentType: "construction_supervision"
projectPhase: "construction"
```

**Dokumentacja zmian:**
```yaml
documentType: "change_order"
changeNumber: "CO-001"
dateIssued: "2026-03-15"
impact:
  cost: "+5000 PLN"
  schedule: "+3 dni"
  regulatory: "brak wpływu"
```

*Dokumentacja fazy budowy -- zobacz [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/).*

---

### 7. Dokumentacja Powykonawcza (LOD 500)
**Co robisz:** Dokumentujesz stan faktyczny po budowie

**Dokumenty:**
- Model BIM powykonawczy (zweryfikowany)
- Rysunki powykonawcze
- **Zweryfikowane specyfikacje**
- Protokoły badań i testów
- Certyfikaty materiałów
- Instrukcje obsługi

**BIM:**
- LOD 500 - Zweryfikowane wymiary
- Rzeczywiście zainstalowane produkty
- Numery partii materiałów
- Daty instalacji

```yaml
documentType: "as_built_documentation"
bimLOD: "LOD_500"
asBuiltVerification:
  method: "pomiar_terenowy"
  date: "2026-06-15"
  verifiedBy: "Jan Kowalski, architekt"
```

**Weryfikacja:**
- Termowizja (izolacja)
- Test szczelności (blower door)
- Pomiary akustyczne
- Badania konstrukcyjne

*Dokumentacja powykonawcza -- użyj szablonów kart SBM: [Pomieszczenie](/pl/szablony/szablon-przestrzeni), [Instalacja](/pl/szablony/szablon-systemu), [Urządzenie](/pl/szablony/szablon-zasobu).*

---

### 8. Przekazanie i Konserwacja
**Co robisz:** Przekazujesz obiekt, dokumentujesz konserwację

**Dokumenty:**
- Instrukcja obsługi budynku (OOM)
- Plan konserwacji
- Harmonogramy przeglądów
- Gwarancje i certyfikaty
- Kontakty do dostawców
- Dokumentacja BIM dla FM

```yaml
documentType: "building_manual"
purpose: "operation_maintenance"
```

**Zawartość instrukcji:**
- Opis systemów budynku
- Harmonogramy konserwacji
- Procedury awaryjne
- Dane kontaktowe
- Gwarancje

**Plan konserwacji:**
- Przeglądy roczne
- Przeglądy 5-letnie
- Konserwacja dachu
- Konserwacja elewacji
- Serwis instalacji

*Dokumentacja OOM i konserwacji -- zobacz [Szablon systemu](/pl/szablony/szablon-systemu) i [Szablon zasobu](/pl/szablony/szablon-zasobu).*

---

## Struktura Plików Projektu

```
moj-projekt/
├── 01-brief/
│   └── brief-projektu.md
├── 02-koncepcja/
│   ├── koncepcja.md
│   └── analiza-miejsca.md
├── 03-projekt-wstepny/
│   ├── projekt.md
│   ├── specyfikacje-ogolne.md
│   └── budżet.md
├── 04-projekt-budowlany/
│   ├── projekt-architektoniczny.md
│   ├── lista-kontrolna-zgodnosci.md
│   └── obliczenia/
├── 05-projekt-wykonawczy/
│   ├── specyfikacje/
│   │   ├── sciana-zewnetrzna-typ-a.md
│   │   ├── strop-typ-a.md
│   │   └── ...
│   ├── materialy/
│   └── detale/
├── 06-budowa/
│   ├── dziennik/
│   ├── zmiany/
│   └── protokoly/
├── 07-powykonawcza/
│   ├── model-as-built.ifc
│   ├── specyfikacje-zweryfikowane/
│   └── certyfikaty/
└── 08-przekazanie/
    ├── instrukcja-oom.md
    ├── plan-konserwacji.md
    └── gwarancje/
```

---

## Kontrola Wersji (Git)

```bash
# Tag dla każdej fazy
git tag concept-design-v1.0
git tag schematic-design-v1.0
git tag building-permit-v1.0
git tag construction-docs-v1.0
git tag as-built-v1.0
```

---

## Eksport do PDF - Różne Fazy

### Dla Klienta (Koncepcja)
```bash
pandoc 02-koncepcja/koncepcja.md -o prezentacja.pdf
```

### Dla Urzędu (Pozwolenie)
```bash
cd 04-projekt-budowlany/
./eksport-komplet-pdf.sh
# Generuje wszystkie wymagane PDF
```

### Dla Wykonawcy (Projekt Wykonawczy)
```bash
cd 05-projekt-wykonawczy/
./eksport-specyfikacje.sh
# Wszystkie specyfikacje → PDF
```

---

## Następne Kroki

**Jeśli zaczynasz nowy projekt:**
1. Zacznij od [Przewodnika tworzenia](/pl/dokumentacja/tworzenie/), aby stworzyć pierwsze karty
2. Zdefiniuj przestrzenie i strefy za pomocą [Szablonu przestrzeni](/pl/szablony/szablon-przestrzeni) i [Szablonu strefy](/pl/szablony/szablon-strefy)

**Jeśli jesteś w fazie projektowania:**
3. Dokumentuj wymagania za pomocą [Szablonu wymagania](/pl/szablony/szablon-wymagania)
4. Opisz systemy budynkowe za pomocą [Szablonu systemu](/pl/szablony/szablon-systemu)

**Jeśli przygotowujesz dokumentację wykonawczą:**
5. Twórz instancje zasobów za pomocą [Szablonu zasobu](/pl/szablony/szablon-zasobu)
6. [Integracja BIM](/pl/integracja-bim/) -- połącz z przepływami IFC

**Jeśli jesteś w fazie budowy:**
7. Śledź systemy i zasoby za pomocą kart SBM -- zobacz [Tworzenie kart](/pl/dokumentacja/tworzenie/tworzenie-encji)
8. Dokumentuj zmiany poprzez wersjonowanie plików kart

**Jeśli kończysz projekt:**
9. Zaktualizuj wersje kart, aby odzwierciedlić stan powykonawczy
10. Użyj szablonów [System](/pl/szablony/szablon-systemu) i [Zasób](/pl/szablony/szablon-zasobu) do przekazania dokumentacji eksploatacyjnej

---

## Zobacz Również

- [Przegląd Dokumentacji SBM](/pl/dokumentacja/przeglad) -- Wprowadzenie do Semantycznego Modelu Budynku
- [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/) -- Jak tworzyć i zarządzać kartami SBM
