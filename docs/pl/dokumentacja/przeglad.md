# Przegląd

**Semantyczny Model Budynku (SBM)** to ustrukturyzowany, odczytywalny maszynowo format definiowania intencji budynku, wymagań i relacji w całym cyklu życia budynku.

## Czym jest SBM?

SBM oddziela **intencję semantyczną** (co budynek powinien robić) od **implementacji geometrycznej** (jak wygląda w BIM). Tworzy to jedno źródło prawdy, które:

- Przetrwa zmiany projektowe i renowacje
- Napędza BIM, raporty zgodności, rejestry zasobów i cyfrowe bliźniaki
- Umożliwia rozumowanie AI o budynkach
- Zapewnia śledzenie zgodności regulacyjnej

## Trzy warstwy

```
┌─────────────────────────────────────┐
│ Warstwa 1: Semantyczny Model       │  ← Źródło prawdy
│ Budynku (Markdown + YAML → JSON)   │     (Intencja, Reguły, Wymagania)
└──────────────┬──────────────────────┘
               │ Kompilator
               ▼
┌─────────────────────────────────────┐
│ Warstwa 2: BIM (Revit/ArchiCAD/IFC)│  ← Skompilowane wyjście
│ (Geometria + Właściwości)           │     (Implementacja projektu)
└──────────────┬──────────────────────┘
               │ Runtime
               ▼
┌─────────────────────────────────────┐
│ Warstwa 3: Cyfrowy Bliźniak        │  ← Stan operacyjny
│ (Czujniki) (Monit. + BMS)          │     (Walidacja wydajności)
└─────────────────────────────────────┘
```

## Kluczowe zasady

### 1. Tworzenie przyjazne dla człowieka

Architekci piszą **Markdown** ze strukturalnym nagłówkiem YAML:

```markdown
---
documentType: "space"
entityType: "space"
id: "SP-BLD-01-L01-001"
spaceName: "Bedroom 01"
spaceType: "sleeping_space"
designArea: 14.5
designHeight: 2.70
unit: "m"
requirements:
  - "REQ-DAYLIGHT-SLEEPING-001"
  - "REQ-PL-WT-ROOM-HEIGHT-001"
---

# Space: Bedroom 01

Standard bedroom with north-facing window...
```

### 2. Kompilowalność maszynowa

Kompilator przekształca Markdown → JSON → cele kompilacji:

```
Karty Markdown
    ↓ (Parsowanie)
Surowe karty JSON
    ↓ (Normalizacja)
Wzbogacony graf SBM
    ↓ (Walidacja)
Zwalidowany SBM
    ↓ (Kompilacja)
├─→ Mapowanie BIM
├─→ Raport zgodności
├─→ Rejestr zasobów
└─→ Schemat cyfrowego bliźniaka
```

### 3. Świadomość jurysdykcji

Wymagania ładowane są automatycznie na podstawie kraju projektu:

- **Wymagania globalne**: Nasłonecznienie, komfort cieplny, wentylacja (EN, ISO, ASHRAE)
- **Wymagania dla Polski**: WT 2021, Prawo budowlane (ładowane automatycznie gdy `project.country = "PL"`)
- **Inne kraje**: Dodaj `/requirements/de/`, `/requirements/fr/`, itd.

## Typy kart

SBM definiuje **7 podstawowych typów kart**:

| Typ karty | Przeznaczenie | Przykładowy ID |
|-----------|---------------|----------------|
| **Przestrzeń** | Pomieszczenia i obszary funkcjonalne | `SP-BLD-01-L01-001` |
| **Strefa** | Strefy pożarowe, akustyczne, HVAC, bezpieczeństwa | `ZONE-FIRE-ZL-IV` |
| **Instalacja** | Systemy MEP (HVAC, elektryczny, hydrauliczny) | `SYS-HVAC-01` |
| **Urządzenie** | Fizyczne urządzenia z danymi konserwacyjnymi | `AI-AHU-01` |
| **Wymaganie** | Reguły wydajnościowe i regulacyjne | `REQ-DAYLIGHT-SLEEPING-001` |
| **Budynek** | Metadane na poziomie budynku | `BLD-01` |
| **Kondygnacja** | Informacje o piętrze/kondygnacji | `LVL-01` |

> **Uwaga terminologiczna:** W standardzie SBM każdy zapis dokumentujący element budynku (przestrzeń, strefę, wymaganie itd.) nazywamy **kartą**.

## Cele kompilacji

Kompilator generuje **4 praktyczne wyniki**:

### 1. Mapowanie BIM (`bim_mapping.json`)

- Współdzielone parametry Revit
- Zestawy właściwości IFC (Pset_SBM_Space, Pset_SBM_Zone, itd.)
- Reguły mapowania parametrów (SBM → Revit → IFC)

**Przypadki użycia:** Import parametrów do Revit, konfiguracja eksportów IFC, wypełnianie właściwości przez Dynamo

### 2. Raport Zgodności (`compliance_report.json`)

- Wymagania pogrupowane według regulacji (WT 2021, Prawo budowlane, normy EN)
- Kontrole zgodności przestrzeń po przestrzeni
- Status weryfikacji i metody
- Podział sekcji WT 2021 dla Polski (§ 132, § 234, § 69, itd.)

**Przypadki użycia:** Dokumentacja do pozwolenia na budowę, audyty regulacyjne, panele zgodności

### 3. Rejestr Zasobów (`asset_register.json`)

- Inwentarz zasobów z harmonogramami konserwacji
- 24-miesięczny kalendarz konserwacji
- Inwentarz części zamiennych
- Eksport gotowy do CMMS (kompatybilny z Maximo, SAP PM)

**Przypadki użycia:** Zarządzanie obiektami, planowanie konserwacji, analiza kosztów cyklu życia

### 4. Schemat Cyfrowego Bliźniaka (`twin_schema.json`)

- Powiązania czujników (przestrzeń → czujniki)
- Integracja BMS (rejestr urządzeń BACnet, mapowanie punktów)
- Reguły ewaluacji wymagań w czasie rzeczywistym
- Rejestr urządzeń IoT

**Przypadki użycia:** Konfiguracja BMS, wdrożenie cyfrowego bliźniaka, monitorowanie zgodności w czasie rzeczywistym

## Integracja z procesem pracy

### Faza projektowa

1. Architekt tworzy karty przestrzeni w Markdown
2. Kompilator waliduje względem wymagań
3. Mapowanie BIM wypełnia parametry Revit
4. Raport zgodności sprawdza sekcje WT 2021

### Faza budowy

1. Pomiary powykonawcze aktualizują karty przestrzeni
2. Urządzenia dodawane podczas montażu
3. Numery seryjne i tagi rejestrowane
4. Raport zgodności śledzi postęp weryfikacji

### Faza eksploatacji

1. Cyfrowy bliźniak wiąże czujniki z ID przestrzeni
2. Monitorowanie w czasie rzeczywistym waliduje wymagania
3. Kalendarz konserwacji wyzwala zdarzenia serwisowe
4. Rejestr zasobów śledzi cykl życia urządzeń

## Kompatybilność wsteczna

SBM współistnieje ze starszymi typami dokumentów:

- `element_specification` (np. specyfikacje ścian zewnętrznych)
- `project_specification` (metadane projektu)

Oba formaty kompilują się do tego samego wyjścia `sbm.json`.

## Pierwsze kroki

1. **[Referencja typów kart](/pl/dokumentacja/encje/)** - Poznaj przestrzenie, strefy, wymagania
2. **[Przewodnik tworzenia](/pl/dokumentacja/tworzenie/)** - Napisz swoją pierwszą kartę Markdown
3. **[Przewodnik kompilatora](/pl/dokumentacja/kompilator/)** - Uruchom potok kompilacji
4. **[Przykłady](/pl/przyklady/)** - Zobacz przykładowy projekt Green Terrace

## Wersja

**Aktualna wersja:** SBM v0.1.3

- Schemat JSON: `sbm-schema-v0.1.json`
- Kompilator: `v0.1.0`
- **v0.1.3 (2026-02-22):** Warunki środowiskowe, grupy bezpieczeństwa elektrycznego (IEC 60364-7-710), odniesienia regulacyjne, stan cyklu życia
- **v0.1.2 (2026-02-22):** Numery pomieszczeń, poziomy dostępności, przestrzenie nadrzędne/podrzędne, departamenty, liczba łóżek
- **v0.1.1 (2026-02-22):** Wzorzec typ/instancja dla przestrzeni, stref, systemów, zasobów
- **v0.1.0:** Pierwsze stabilne wydanie z podstawowymi typami kart
