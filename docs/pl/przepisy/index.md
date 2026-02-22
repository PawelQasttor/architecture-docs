# Przegląd Przepisów Polskich

Standard Dokumentacji Architektonicznej zawiera kompleksowe odniesienia do polskich przepisów budowlanych i standardów międzynarodowych, umożliwiając architektom tworzenie dokumentacji zgodnej z wymaganiami.

## Kluczowe Przepisy Polskie

### Prawo Budowlane (Ustawa Budowlana)

Podstawowe ramy prawne dla budownictwa w Polsce.

**Kluczowe artykuły:**
- **Art. 5** - Ogólne wymagania budowlane
- **Art. 34** - Wymagania dotyczące dokumentacji technicznej
- **Art. 62** - Warunki pozwolenia na budowę

[Dowiedz się więcej →](/pl/przepisy/prawo-budowlane)

---

### WT 2021 (Warunki Techniczne)

Warunki techniczne, jakim powinny odpowiadać budynki i ich usytuowanie.

**Kluczowe wymagania:**
- **§ 328** - Wymagania dotyczące izolacji termicznej
- **§ 234** - Przepisy przeciwpożarowe
- **§ 55** - Wymagania dotyczące dostępności

[Dowiedz się więcej →](/pl/przepisy/wt-2021)

---

## Standardy Międzynarodowe

### Normy PN-EN

Normy europejskie przyjęte w Polsce:

- **PN-EN 1996** - Projektowanie konstrukcji murowych
- **PN-EN 1992** - Projektowanie konstrukcji betonowych
- **PN-EN 1993** - Projektowanie konstrukcji stalowych
- **PN-EN 206** - Specyfikacje betonu

### Normy PN-ISO

Normy ISO przyjęte w Polsce:

- **PN-ISO 9001** - Systemy zarządzania jakością
- **PN-ISO 19650** - Zarządzanie informacją BIM

---

## Dokumentacja Zgodności

### Wbudowane Funkcje Zgodności

Standard ułatwia zgodność z przepisami:

#### 1. Ustrukturyzowane Odniesienia do Przepisów

```yaml
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 34"
    requirement: "Kompletność dokumentacji technicznej"
    status: "zgodny"

  - standard: "WT_2021"
    section: "§ 328"
    requirement: "U-value ≤ 0.25 W/m²K"
    status: "zgodny"
```

#### 2. Listy Kontrolne Zgodności

Gotowe listy kontrolne dla typowych wymagań:

- [ ] Charakterystyka cieplna (WT 2021 § 328)
- [ ] Bezpieczeństwo pożarowe (WT 2021 § 234)
- [ ] Projekt konstrukcyjny (PN-EN 1996)
- [ ] Dostępność (WT 2021 § 55)

[Zobacz szablon strefy →](/pl/szablony/szablon-strefy)

---

## Wymagania Dotyczące Charakterystyki Cieplnej

### WT 2021 § 328 - Wartości U

Maksymalne współczynniki przenikania ciepła (wartości U):

| Element | Maks U-value | Jednostka |
|---------|--------------|-----------|
| Ściany zewnętrzne | 0.20 | W/m²K |
| Dach | 0.15 | W/m²K |
| Podłoga | 0.30 | W/m²K |
| Okna | 0.90 | W/m²K |
| Drzwi | 1.30 | W/m²K |

**Dokumentacja zgodności:**

```markdown
**Charakterystyka cieplna:**
- Wartość U: 0.24 W/m²K
- Wymaganie: ≤ 0.25 W/m²K (WT 2021 § 328)
- Status: ✅ Zgodny
```

---

## Wymagania Bezpieczeństwa Pożarowego

### WT 2021 § 234 - Odporność Ogniowa

Klasy odporności ogniowej elementów budynku:

| Element | Min Klasa | Wysokość Budynku |
|---------|-----------|------------------|
| Ściany nośne | REI 60 | < 25m |
| Ściany nośne | REI 120 | ≥ 25m |
| Stropy | REI 60 | < 25m |

**Dokumentacja zgodności:**

```markdown
**Bezpieczeństwo pożarowe:**
- Klasa ogniowa: REI 60
- Wymaganie: REI 60 (WT 2021 § 234)
- Status: ✅ Zgodny
```

---

## Wykorzystanie Przepisów w Dokumentacji

### Przykład: Specyfikacja Ściany

```markdown
---
documentType: "specyfikacja_elementu"
regulatoryCompliance:
  - regulation: "Prawo_budowlane"
    article: "Art. 5"
  - standard: "WT_2021"
    section: "§ 328"
  - standard: "PN-EN_1996"
---

## Ściana Zewnętrzna Typ A

**Charakterystyka cieplna:**
- Wartość U: 0.23 W/m²K
- ✅ Zgodny z WT 2021 § 328 (maks 0.25 W/m²K)

**Bezpieczeństwo pożarowe:**
- Klasa ogniowa: REI 60
- ✅ Zgodny z WT 2021 § 234

**Projekt konstrukcyjny:**
- Projekt zgodnie z PN-EN 1996 (Konstrukcje murowe)
- ✅ Obliczenia zweryfikowane
```

---

## Powiązana Dokumentacja

- 📖 [Prawo Budowlane →](/pl/przepisy/prawo-budowlane)
- 🌡️ [WT 2021 →](/pl/przepisy/wt-2021)
- ✅ [Szablon Strefy →](/pl/szablony/szablon-strefy)
- 📝 [Standardy →](/pl/standardy/)
