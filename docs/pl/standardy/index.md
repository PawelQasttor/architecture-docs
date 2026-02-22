# Przegląd Standardów

Standard Dokumentacji Architektonicznej definiuje ustrukturyzowaną metodologię tworzenia dokumentacji architektonicznej, która jest jednocześnie czytelna dla ludzi, parsowalna przez AI, kompatybilna z BIM i zgodna z przepisami.

## Podstawowe Zasady

### 1. Markdown na Pierwszym Miejscu

Cała dokumentacja jest pisana w **czystym Markdown** z ustrukturyzowanym frontmatter YAML. To zapewnia:

- ✅ Czytelność dla ludzi - Nie wymagane specjalne narzędzia
- ✅ Kontrola wersji - Przyjazny dla Git czysty tekst
- ✅ Przyszłościowe rozwiązanie - Otwarty format, szeroko wspierany
- ✅ Łatwa edycja - Działa dowolny edytor tekstu

### 2. Ustrukturyzowane Metadane

Każdy dokument zawiera **frontmatter YAML** ze standardowymi polami:

```yaml
---
documentType: "specyfikacja_techniczna"
projectPhase: "projekt_wykonawczy"
bimLOD: "LOD_400"
regulatoryCompliance:
  - standard: "PN-ISO_9001"
    section: "4.2.3"
ifcMapping:
  ifcEntity: "IfcWall"
  properties:
    - Pset_WallCommon
version: "1.2.0"
lastReviewed: "2026-02-15"
authors:
  - name: "Jan Kowalski"
    role: "architekt"
    license: "IARP 1234"
---
```

### 3. Struktura Parsowalna przez AI

Standard obejmuje:

- **Schematy JSON** - Definiują prawidłowe struktury frontmatter
- **Spójne formatowanie** - Tabele, listy, nagłówki
- **Znaczniki semantyczne** - Jasna hierarchia i relacje
- **Eksporty czytelne maszynowo** - JSON/XML dla konsumpcji AI

### 4. Integracja BIM

Dokumentacja odnosi się do **klas IFC** i **zestawów właściwości**:

```markdown
**Mapowanie IFC:**
- Klasa: `IfcWall`
- ObjectType: `ScianZewnetrzna_TypA`
- Właściwości: `Pset_WallCommon`
```

### 5. Zgodność z Przepisami

Wbudowane odniesienia do:

- Polskie przepisy (Prawo budowlane, WT 2021)
- Standardy międzynarodowe (PN-ISO, PN-EN)
- Listy kontrolne zgodności

## Semantyczny Model Budynku (SBM)

**Semantyczny Model Budynku (SBM)** jest obecnie podstawowym ustrukturyzowanym modelem danych dla dokumentacji architektonicznej. SBM organizuje informacje o budynku w **7 rodzajów kart**:

| Rodzaj Karty | Wzorzec ID | Opis |
|-----------|-----------|------|
| Budynek | `BLD-*` | Karta budynku najwyższego poziomu |
| Kondygnacja | `LVL-*` | Kondygnacje w budynku |
| Strefa | `ZONE-*` | Grupowania stref: pożarowe, akustyczne, HVAC, bezpieczeństwa i inne |
| Przestrzeń | `SP-*` | Pojedyncze pomieszczenia i obszary |
| Instalacja | `SYS-*` | Systemy MEP i budynkowe (HVAC, elektryczne, sanitarne itd.) |
| Urządzenie | `AI-*` | Pojedyncze zainstalowane urządzenia i komponenty |
| Wymaganie | `REQ-*` | Wymagania wydajnościowe, wymiarowe, regulacyjne i bezpieczeństwa |

Kompilator SBM waliduje pliki źródłowe Markdown względem schematu i generuje zunifikowany model JSON całego budynku. Model ten jest czytelny maszynowo, kompatybilny z BIM i uwzględnia przepisy.

Pełne wprowadzenie znajduje się w [Przeglądzie Dokumentacji SBM](/pl/dokumentacja/przeglad).

---

## Typy Dokumentów

Standard wspiera różne dokumenty architektoniczne:

| Typ Dokumentu | Opis | Szablon / Odniesienie |
|--------------|------|----------------------|
| `specyfikacja_techniczna` | Szczegółowe specyfikacje techniczne | (Zobacz szablony kart SBM: [Pomieszczenie](/pl/szablony/szablon-przestrzeni), [Instalacja](/pl/szablony/szablon-systemu)) |
| `specyfikacja_materialow` | Właściwości materiałów | (Zobacz szablony kart SBM: [Urządzenie](/pl/szablony/szablon-zasobu)) |
| `lista_kontrolna_zgodnosci` | Zgodność z przepisami | (Zobacz [Szablon wymagania](/pl/szablony/szablon-wymagania)) |
| `specyfikacja_projektu` | Ogólne specyfikacje projektu | [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/) |
| `dokumentacja_powykonawcza` | Zapisy powykonawcze | [Przewodnik tworzenia](/pl/dokumentacja/tworzenie/) |

## Następne Kroki

- [Struktura Dokumentu](/pl/standardy/struktura-dokumentu) - Poznaj standardowy format oparty na fazach
- [Schema Frontmatter](/pl/standardy/schema-frontmatter) - Zrozum pola metadanych i schemat SBM
- [Szablony](/pl/szablony/) - Zacznij z gotowymi szablonami kart SBM
- [Integracja BIM](/pl/integracja-bim/) - Połącz z przepływami BIM
- [Dokumentacja SBM](/pl/dokumentacja/przeglad) - Poznaj Semantyczny Model Budynku i jego kompilator
