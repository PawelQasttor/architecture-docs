---
documentType: "regulatory_reference"
regulation: "Prawo_budowlane"
jurisdiction: "Poland"
lastUpdated: "2024-01-01"
officialSource: "https://isap.sejm.gov.pl/"
language: "pl"
---

# Prawo Budowlane

**Prawo budowlane** (Ustawa z dnia 7 lipca 1994 r. - Prawo budowlane) stanowi podstawowe ramy prawne regulujace dzialalnosc budowlana w Polsce.

## Kluczowe artykuly dla dokumentacji

### Art. 5 - Wymagania ogolne

**Wymagania dotyczace budynkow:**

Budynki musza byc projektowane i budowane zgodnie z:
- Przeznaczeniem obiektu
- Przepisami techniczno-budowlanymi
- Zasadami wiedzy technicznej
- Wymaganiami bezpieczenstwa

**Mapowanie na standard dokumentacji:**

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Budynek zaprojektowany zgodnie z przeznaczeniem i przepisami technicznymi"
    verification: "Weryfikacja projektu zakonczona"
    status: "compliant"
```

**Lista kontrolna:**
- [ ] Projekt zgodny z przeznaczeniem obiektu
- [ ] Przestrzeganie przepisow technicznych (WT 2021)
- [ ] Bezpieczenstwo konstrukcji zweryfikowane
- [ ] Wymagania bezpieczenstwa pozarowego spelnione
- [ ] Standardy higieny i zdrowia zachowane

---

### Art. 20 - Dokumentacja techniczna

**Wymagana dokumentacja do pozwolenia na budowe:**

1. **Projekt architektoniczno-budowlany** obejmujacy:
   - Plan zagospodarowania dzialki
   - Rysunki architektoniczne
   - Rysunki konstrukcyjne
   - Rysunki instalacji budowlanych

2. **Opisy techniczne** obejmujace:
   - Rozwiazania projektowe
   - Materialy i wyroby budowlane
   - Systemy budynkowe

3. **Specyfikacje** obejmujace:
   - Specyfikacje materialowe
   - Wymagania techniczne
   - Standardy jakosciowe

**Mapowanie na standard dokumentacji:**

```yaml
documentType: "project_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 20"
    requirement: "Kompletna dokumentacja techniczna"
projectDocuments:
  - type: "architectural_design"
    status: "complete"
  - type: "structural_design"
    status: "complete"
  - type: "technical_specifications"
    status: "complete"
```

---

### Art. 34 - Wymagania projektowe

**Dokumentacja projektowa musi zawierac:**

1. **Dane techniczne:**
   - Wymiary budynku
   - Obliczenia powierzchni
   - Obliczenia kubatury
   - Liczba uzytkownikow

2. **Rozwiazania techniczne:**
   - System konstrukcyjny
   - Materialy
   - Przegrody zewnetrzne
   - Instalacje budowlane (MEP)

3. **Oswiadczenia o zgodnosci:**
   - Przepisy budowlane
   - Normy techniczne
   - Wymagania srodowiskowe

**Przyklad standardu dokumentacji:**

```markdown
---
documentType: "technical_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Kompletne dane techniczne i rozwiazania"
---

## Dane techniczne budynku

**Wymiary:**
- Calkowita wysokosc: 24,5 m
- Powierzchnia zabudowy: 450 m2
- Powierzchnia calkowita brutto: 1 800 m2
- Powierzchnia uzytkowa: 1 620 m2

**Uzytkowanie:**
- Klasa budynku: Mieszkalny
- Liczba lokali mieszkalnych: 18
- Szacunkowa liczba mieszkancow: 54

**System konstrukcyjny:**
- Fundamenty: Stopy fundamentowe zelbetowe
- Sciany nosne: Zelbetowe
- Stropy: Plyty zelbetowe
- Dach: Konstrukcja wiazarowa drewniana

**Zgodnosc:**
- Zgodnosc z Art. 34 - Kompletne dane techniczne dostarczone
- Zgodnosc z WT 2021 - Warunki techniczne spelnione
```

---

### Art. 41 - Prowadzenie robot budowlanych

**Wymagania podczas budowy:**

1. Budowa musi przebiegac zgodnie z zatwierdzonym projektem
2. Zmiany wymagaja aktualizacji projektu
3. Dziennik budowy musi byc prowadzony
4. Wymagana kontrola jakosci

**Mapowanie na standard dokumentacji:**

```yaml
documentType: "as_built_documentation"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 41"
    requirement: "Wykonanie zgodne z zatwierdzonym projektem"
constructionDiary:
  maintained: true
  lastEntry: "2026-02-20"
qualityControl:
  inspections: 15
  nonConformances: 0
```

---

### Art. 57 - Zakonczenie budowy

**Wymagania do pozwolenia na uzytkowanie:**

1. Budynek wzniesiony zgodnie z zatwierdzonym projektem
2. Wszystkie wymagane kontrole zakonczone
3. Dokumentacja powykonawcza przygotowana
4. Zgodnosc z przepisami budowlanymi potwierdzona

**Przyklad standardu dokumentacji:**

```markdown
---
documentType: "completion_certificate"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 57"
    requirement: "Budynek gotowy do uzytkowania"
inspections:
  - type: "structural"
    date: "2026-01-15"
    result: "passed"
  - type: "fire_safety"
    date: "2026-01-20"
    result: "passed"
  - type: "electrical"
    date: "2026-01-22"
    result: "passed"
---

## Swiadectwo zakonczenia budowy

**Projekt:** Budynek mieszkalny - ul. Glowna 123

**Weryfikacja zgodnosci:**
- Budowa zgodna z zatwierdzonym projektem (Art. 41)
- Wszystkie kontrole zakonczone pozytywnie
- Dokumentacja powykonawcza kompletna
- Zgodnosc z bezpieczenstwem pozarowym potwierdzona
- Stabilnosc konstrukcji potwierdzona
- Gotowy do uzytkowania (Art. 57)
```

---

## Typowe wymagania zgodnosci

### Klasyfikacja budynkow

Zgodnie z Prawem budowlanym, budynki sa klasyfikowane wedlug:

| Kategoria | Typ | Przyklady |
|-----------|-----|-----------|
| **A** | Mieszkalne | Domy, mieszkania |
| **B** | Zamieszkania zbiorowego | Hotele, akademiki |
| **C** | Uzytecznosci publicznej | Szkoly, szpitale |
| **D** | Handlowe | Sklepy, biura |
| **E** | Przemyslowe | Fabryki, magazyny |

**Dokumentowanie klasy budynku:**

```yaml
buildingClassification:
  category: "A"
  type: "residential_multi_family"
  description: "Budynek mieszkalny wielorodzinny"
```

---

### Odwolania do wymagan technicznych

Prawo budowlane odwoluje sie do szczegolowych wymagan zawartych w:

- **WT 2021** - Warunki Techniczne
- **PN-EN** - Normy europejskie przyjete w Polsce
- **PN-ISO** - Normy ISO przyjete w Polsce

**Powiazanie wymagan w dokumentacji:**

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
  - standard: "WT_2021"
    sections: ["§ 328", "§ 234"]
  - standard: "PN-EN_1996"
    description: "Konstrukcje murowe"
```

---

## Zastosowanie w dokumentacji

### Przyklad: Specyfikacja sciany

```markdown
---
documentType: "element_specification"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
    requirement: "Bezpieczna i trwala konstrukcja"
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Kompletna specyfikacja techniczna"
---

## Sciana zewnetrzna typ A - Specyfikacja techniczna

**Podstawa prawna:**
- Prawo budowlane Art. 5 - Ogolne wymagania bezpieczenstwa
- Prawo budowlane Art. 34 - Wymagania specyfikacji technicznej
- WT 2021 § 328 - Ochrona cieplna
- PN-EN 1996 - Projektowanie konstrukcji

**Status zgodnosci:**
- Wszystkie wymagania regulacyjne spelnione
- Specyfikacje techniczne kompletne
- Weryfikacja projektowa przeprowadzona
```

---

## Zasoby

- **Tekst ujednolicony:** [ISAP - Prawo budowlane](https://isap.sejm.gov.pl/)
- **Nadzor budowlany:** Powiatowe inspektoraty nadzoru budowlanego (starostwa powiatowe)
- **Normy techniczne:** Polski Komitet Normalizacyjny (PKN)

---

## Powiazana dokumentacja

- [WT 2021 Warunki Techniczne](/pl/przepisy/wt-2021)
- [Szablon strefy](/pl/szablony/szablon-strefy)
- [Szablon przestrzeni](/pl/szablony/szablon-przestrzeni)
