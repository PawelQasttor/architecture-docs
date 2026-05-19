# Program Przestrzenny (Bilans Pomieszczeń)

## Czym To Jest

**Plik Programu Przestrzennego** definiuje ile pomieszczeń danego typu jest potrzebnych w budynku, zanim jeszcze rozpocznie się projektowanie. Pomyśl o tym jak o "liście zakupów" pomieszczeń: 50 sal chorych, 4 sale operacyjne, 2 poczekalnie. Kompilator automatycznie porównuje zaprojektowane z wymaganymi i raportuje zgodność.

::: tip Dla Architektów
**Problem:** Projektujesz szpital powiatowy. Inwestor wymaga 50 sal chorych po 20 m², 4 sale operacyjne po 45 m², 12 gabinetów lekarskich po 15 m². Jak sprawdzić, czy zaprojektowałeś wszystko co trzeba?

**Stary sposób:** Tabela w Excelu — "Bilans Pomieszczeń" — ręcznie aktualizowana. Porównujesz rysunki z tabelą na koniec każdej fazy. Ktoś zapomni dodać 2 gabinety, bo Excel nie sprawdza się automatycznie.

**Z Programem Przestrzennym:** Definiujesz wymagania w `program.md`. Tworzysz pliki pomieszczeń w `spaces/`. Kompilator automatycznie liczy: "Wymagane 50 sal chorych — zaprojektowano 48. Brakuje 2." Żadne pomieszczenie nie umknie uwadze.

**Jeden plik programu = automatyczny bilans pomieszczeń z walidacją.**
:::

**Program Przestrzenny** (Space Program) to encja definiująca wymagania ilościowe i powierzchniowe dla pomieszczeń przed rozpoczęciem projektowania. Kompilator porównuje zaprojektowane przestrzenie z wymaganiami programu i oblicza stopień zgodności.

## Przeznaczenie

Programy przestrzenne definiują:
- Ile pomieszczeń danego typu jest wymaganych (np. 50 sal chorych)
- Jaką łączną powierzchnię mają zajmować (np. 1000 m² na sale chorych)
- Jaka jest wymagana powierzchnia jednostkowa (np. 20 m² na salę)
- Priorytet każdego wymagania (krytyczne, ważne, standardowe)
- Automatyczny bilans: zaprojektowane vs wymagane
- Raport zgodności na poziomie budynku i działu

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator programu z prefiksem `PROG-` | `"PROG-SZPITAL-GL"` |
| `entityType` | string | Musi być `"space_program"` | `"space_program"` |
| `programName` | string | Nazwa czytelna dla ludzi | `"Program przestrzenny — Szpital Główny"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator programu z prefiksem `PROG-` (np. `PROG-SZPITAL-GL`)
- **programName**: Nazwa programu ("Program przestrzenny — Szpital Główny")
- **version**: Śledź zmiany — każda rewizja programu powinna zwiększać wersję

**Potrzebujesz TYLKO tych 3 pól.** Dodaj elementy programu (wymagane pomieszczenia) w tablicy `programItems`.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `buildingId` | string | Referencja do budynku, którego dotyczy program |
| `departmentId` | string | Referencja do działu/oddziału (jeśli program dotyczy jednego działu) |
| `programItems` | array | Elementy programu: wymagane typy pomieszczeń z ilościami i powierzchniami |
| `totalRequiredArea` | number | Łączna wymagana powierzchnia programu w m² |
| `totalDesignedArea` | number | Auto-obliczane: łączna zaprojektowana powierzchnia w m² |
| `overallCompliance` | object | Auto-obliczane: stopień zgodności projektu z programem |
| `approvalStatus` | string | Status zatwierdzenia programu: `draft`, `approved`, `revised` |
| `approvedBy` | string | Kto zatwierdził program |
| `approvalDate` | string | Data zatwierdzenia (ISO 8601) |
| `notes` | string | Uwagi i komentarze do programu |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Dla definicji wymagań:**
- **programItems** — Serce programu: lista wymaganych typów pomieszczeń z ilościami i powierzchniami
- **buildingId** — Łączy program z konkretnym budynkiem
- **departmentId** — Łączy z oddziałem szpitalnym lub działem organizacyjnym

**Dla śledzenia statusu:**
- **approvalStatus** — Czy inwestor zatwierdził program (`draft` → `approved`)
- **totalRequiredArea** — Łączna wymagana powierzchnia

**Auto-obliczane przez kompilator:**
- **totalDesignedArea** — Kompilator liczy z faktycznie zaprojektowanych przestrzeni
- **overallCompliance** — Procent zgodności (zaprojektowane / wymagane)

**Najczęściej:** Zacznij od buildingId i programItems. Dodaj approvalStatus po zatwierdzeniu przez inwestora.
:::

## Elementy Programu (programItems)

Każdy element programu opisuje jeden typ pomieszczenia:

```yaml
programItems:
  - spaceTypeId: "ST-SALA-CHORYCH"
    spaceType: "patient_room"
    label: "Sala chorych 2-łóżkowa"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "Minimum 50% sal z dostępem do balkonu"
```

| Pole elementu | Typ | Opis |
|---------------|-----|------|
| `spaceTypeId` | string | Referencja do Typu Przestrzeni (opcjonalnie) |
| `spaceType` | string | Typ funkcjonalny pomieszczenia |
| `label` | string | Czytelna etykieta |
| `requiredQuantity` | number | Wymagana liczba pomieszczeń |
| `designedQuantity` | number | Auto-obliczane: ile faktycznie zaprojektowano |
| `requiredAreaPerUnit` | number | Wymagana powierzchnia jednego pomieszczenia w m² |
| `requiredTotalArea` | number | Wymagana łączna powierzchnia w m² |
| `designedTotalArea` | number | Auto-obliczane: łączna zaprojektowana powierzchnia w m² |
| `compliance` | object | Auto-obliczane: `{ quantityMet: true, areaMet: false, percentage: 96 }` |
| `priority` | string | `critical`, `important`, `standard`, `optional` |
| `departmentId` | string | Dział, do którego należą te pomieszczenia |
| `levelPreference` | array | Preferowane kondygnacje |
| `notes` | string | Uwagi (np. wymagania szczegółowe) |

## Przykład 1: Pierwszy Plik Programu (Minimalny)

**Najprostszy program przestrzenny na start:**

::: code-group

```md [Markdown]
Plik: program.md

---
id: "PROG-SZPITAL-GL"
entityType: "space_program"
programName: "Program przestrzenny — Szpital Główny"
buildingId: "BLD-SZPITAL-GL"

programItems:
  - spaceType: "patient_room"
    label: "Sala chorych"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    priority: "critical"

  - spaceType: "operating_room"
    label: "Sala operacyjna"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    priority: "critical"

  - spaceType: "consultation_room"
    label: "Gabinet lekarski"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    priority: "important"

version: "1.0.0"
---

# Program Przestrzenny — Szpital Główny

Bilans pomieszczeń dla szpitala powiatowego:
- 50 sal chorych (po 20 m²)
- 4 sale operacyjne (po 45 m²)
- 12 gabinetów lekarskich (po 15 m²)
```

```yaml [YAML]
id: "PROG-SZPITAL-GL"
entityType: "space_program"
programName: "Program przestrzenny — Szpital Główny"
buildingId: "BLD-SZPITAL-GL"

programItems:
  - spaceType: "patient_room"
    label: "Sala chorych"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    priority: "critical"

  - spaceType: "operating_room"
    label: "Sala operacyjna"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    priority: "critical"

  - spaceType: "consultation_room"
    label: "Gabinet lekarski"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    priority: "important"

version: "1.0.0"
```

```json [JSON]
{
  "id": "PROG-SZPITAL-GL",
  "entityType": "space_program",
  "programName": "Program przestrzenny — Szpital Główny",
  "buildingId": "BLD-SZPITAL-GL",
  "programItems": [
    {
      "spaceType": "patient_room",
      "label": "Sala chorych",
      "requiredQuantity": 50,
      "requiredAreaPerUnit": 20,
      "priority": "critical"
    },
    {
      "spaceType": "operating_room",
      "label": "Sala operacyjna",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 45,
      "priority": "critical"
    },
    {
      "spaceType": "consultation_room",
      "label": "Gabinet lekarski",
      "requiredQuantity": 12,
      "requiredAreaPerUnit": 15,
      "priority": "important"
    }
  ],
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "programName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^PROG-" },
    "entityType": { "const": "space_program" },
    "programName": { "type": "string" },
    "buildingId": { "type": "string" },
    "programItems": { "type": "array" },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Kompilator automatycznie policzy zaprojektowane pomieszczenia i porówna z wymaganiami.

---

## Przykład 2: Pełny Program Przestrzenny (Wszystkie Szczegóły)

**Program przestrzenny szpitala z podziałem na oddziały, priorytetami i statusem zatwierdzenia:**

::: code-group

```md [Markdown]
---
id: "PROG-SZPITAL-POWIATOWY"
entityType: "space_program"
programName: "Program Funkcjonalno-Użytkowy — Szpital Powiatowy w Krakowie"
buildingId: "BLD-SZPITAL-GL"

approvalStatus: "approved"
approvedBy: "Dyrekcja Szpitala Powiatowego"
approvalDate: "2026-01-15"

programItems:
  # --- Oddział Chirurgii ---
  - spaceTypeId: "ST-SALA-OPERACYJNA"
    spaceType: "operating_room"
    label: "Sala operacyjna"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    requiredTotalArea: 180
    priority: "critical"
    departmentId: "DEPT-SURGERY"
    levelPreference: ["LVL-02"]
    notes: "W tym 1 sala hybrydowa z angiografem"

  - spaceType: "pre_op_room"
    label: "Sala przygotowań przedoperacyjnych"
    requiredQuantity: 2
    requiredAreaPerUnit: 25
    requiredTotalArea: 50
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceType: "recovery_room"
    label: "Sala wybudzeń"
    requiredQuantity: 1
    requiredAreaPerUnit: 60
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  # --- Oddział Internistyczny ---
  - spaceTypeId: "ST-SALA-CHORYCH"
    spaceType: "patient_room"
    label: "Sala chorych 2-łóżkowa"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "Minimum 50% sal z dostępem do balkonu"

  - spaceType: "patient_room_single"
    label: "Sala chorych 1-łóżkowa (izolacja)"
    requiredQuantity: 8
    requiredAreaPerUnit: 18
    requiredTotalArea: 144
    priority: "important"
    departmentId: "DEPT-INTERNAL"
    notes: "Sale izolacyjne z przedsionkiem i własną łazienką"

  # --- SOR ---
  - spaceType: "triage_room"
    label: "Sala triażu"
    requiredQuantity: 2
    requiredAreaPerUnit: 12
    requiredTotalArea: 24
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "resuscitation_bay"
    label: "Stanowisko resuscytacyjne"
    requiredQuantity: 2
    requiredAreaPerUnit: 30
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "examination_room"
    label: "Gabinet badań"
    requiredQuantity: 6
    requiredAreaPerUnit: 15
    requiredTotalArea: 90
    priority: "important"
    departmentId: "DEPT-EMERGENCY"

  # --- Diagnostyka ---
  - spaceType: "ct_room"
    label: "Pracownia tomografii komputerowej"
    requiredQuantity: 2
    requiredAreaPerUnit: 40
    requiredTotalArea: 80
    priority: "critical"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Osłony radiologiczne wg normy PN-EN 61331"

  - spaceType: "mri_room"
    label: "Pracownia rezonansu magnetycznego"
    requiredQuantity: 1
    requiredAreaPerUnit: 55
    requiredTotalArea: 55
    priority: "important"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Klatka Faradaya, wymagania fundamentowe (wibracje)"

  # --- Administracja ---
  - spaceType: "consultation_room"
    label: "Gabinet lekarski"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    requiredTotalArea: 180
    priority: "important"
    departmentId: "DEPT-ADMIN"

  - spaceType: "office"
    label: "Biuro administracyjne"
    requiredQuantity: 6
    requiredAreaPerUnit: 18
    requiredTotalArea: 108
    priority: "standard"
    departmentId: "DEPT-ADMIN"

  # --- Pomieszczenia wspólne ---
  - spaceType: "waiting_area"
    label: "Poczekalnia"
    requiredQuantity: 4
    requiredAreaPerUnit: 35
    requiredTotalArea: 140
    priority: "important"

  - spaceType: "staff_room"
    label: "Pokój socjalny personelu"
    requiredQuantity: 3
    requiredAreaPerUnit: 20
    requiredTotalArea: 60
    priority: "standard"

totalRequiredArea: 2231
notes: "Program zatwierdzony przez Dyrekcję Szpitala. Rewizja po zakończeniu fazy koncepcyjnej."

version: "2.0.0"
tags:
  - "szpital"
  - "program"
  - "bilans-pomieszczeń"
  - "kraków"
---

# Program Funkcjonalno-Użytkowy — Szpital Powiatowy w Krakowie

Bilans pomieszczeń zatwierdzony przez Dyrekcję Szpitala 2026-01-15.

## Podsumowanie

| Oddział | Wymagane pomieszczenia | Wymagana powierzchnia |
|---------|----------------------|----------------------|
| Chirurgia | 7 | 290 m² |
| Oddział Internistyczny | 58 | 1 144 m² |
| SOR | 10 | 174 m² |
| Diagnostyka | 3 | 135 m² |
| Administracja | 18 | 288 m² |
| Wspólne | 7 | 200 m² |
| **Razem** | **103** | **2 231 m²** |

## Status

- **Zatwierdzenie:** Tak (2026-01-15, Dyrekcja Szpitala)
- **Następna rewizja:** Po zakończeniu fazy koncepcyjnej
```

```yaml [YAML]
id: "PROG-SZPITAL-POWIATOWY"
entityType: "space_program"
programName: "Program Funkcjonalno-Użytkowy — Szpital Powiatowy w Krakowie"
buildingId: "BLD-SZPITAL-GL"

approvalStatus: "approved"
approvedBy: "Dyrekcja Szpitala Powiatowego"
approvalDate: "2026-01-15"

programItems:
  - spaceTypeId: "ST-SALA-OPERACYJNA"
    spaceType: "operating_room"
    label: "Sala operacyjna"
    requiredQuantity: 4
    requiredAreaPerUnit: 45
    requiredTotalArea: 180
    priority: "critical"
    departmentId: "DEPT-SURGERY"
    levelPreference: ["LVL-02"]
    notes: "W tym 1 sala hybrydowa z angiografem"

  - spaceType: "pre_op_room"
    label: "Sala przygotowań przedoperacyjnych"
    requiredQuantity: 2
    requiredAreaPerUnit: 25
    requiredTotalArea: 50
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceType: "recovery_room"
    label: "Sala wybudzeń"
    requiredQuantity: 1
    requiredAreaPerUnit: 60
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-SURGERY"

  - spaceTypeId: "ST-SALA-CHORYCH"
    spaceType: "patient_room"
    label: "Sala chorych 2-łóżkowa"
    requiredQuantity: 50
    requiredAreaPerUnit: 20
    requiredTotalArea: 1000
    priority: "critical"
    departmentId: "DEPT-INTERNAL"
    levelPreference: ["LVL-02", "LVL-03", "LVL-04"]
    notes: "Minimum 50% sal z dostępem do balkonu"

  - spaceType: "patient_room_single"
    label: "Sala chorych 1-łóżkowa (izolacja)"
    requiredQuantity: 8
    requiredAreaPerUnit: 18
    requiredTotalArea: 144
    priority: "important"
    departmentId: "DEPT-INTERNAL"
    notes: "Sale izolacyjne z przedsionkiem i własną łazienką"

  - spaceType: "triage_room"
    label: "Sala triażu"
    requiredQuantity: 2
    requiredAreaPerUnit: 12
    requiredTotalArea: 24
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "resuscitation_bay"
    label: "Stanowisko resuscytacyjne"
    requiredQuantity: 2
    requiredAreaPerUnit: 30
    requiredTotalArea: 60
    priority: "critical"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "examination_room"
    label: "Gabinet badań"
    requiredQuantity: 6
    requiredAreaPerUnit: 15
    requiredTotalArea: 90
    priority: "important"
    departmentId: "DEPT-EMERGENCY"

  - spaceType: "ct_room"
    label: "Pracownia tomografii komputerowej"
    requiredQuantity: 2
    requiredAreaPerUnit: 40
    requiredTotalArea: 80
    priority: "critical"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Osłony radiologiczne wg normy PN-EN 61331"

  - spaceType: "mri_room"
    label: "Pracownia rezonansu magnetycznego"
    requiredQuantity: 1
    requiredAreaPerUnit: 55
    requiredTotalArea: 55
    priority: "important"
    departmentId: "DEPT-RADIOLOGY"
    notes: "Klatka Faradaya, wymagania fundamentowe (wibracje)"

  - spaceType: "consultation_room"
    label: "Gabinet lekarski"
    requiredQuantity: 12
    requiredAreaPerUnit: 15
    requiredTotalArea: 180
    priority: "important"
    departmentId: "DEPT-ADMIN"

  - spaceType: "office"
    label: "Biuro administracyjne"
    requiredQuantity: 6
    requiredAreaPerUnit: 18
    requiredTotalArea: 108
    priority: "standard"
    departmentId: "DEPT-ADMIN"

  - spaceType: "waiting_area"
    label: "Poczekalnia"
    requiredQuantity: 4
    requiredAreaPerUnit: 35
    requiredTotalArea: 140
    priority: "important"

  - spaceType: "staff_room"
    label: "Pokój socjalny personelu"
    requiredQuantity: 3
    requiredAreaPerUnit: 20
    requiredTotalArea: 60
    priority: "standard"

totalRequiredArea: 2231
notes: "Program zatwierdzony przez Dyrekcję Szpitala. Rewizja po zakończeniu fazy koncepcyjnej."

version: "2.0.0"
tags:
  - "szpital"
  - "program"
  - "bilans-pomieszczeń"
  - "kraków"
```

```json [JSON]
{
  "id": "PROG-SZPITAL-POWIATOWY",
  "entityType": "space_program",
  "programName": "Program Funkcjonalno-Użytkowy — Szpital Powiatowy w Krakowie",
  "buildingId": "BLD-SZPITAL-GL",
  "approvalStatus": "approved",
  "approvedBy": "Dyrekcja Szpitala Powiatowego",
  "approvalDate": "2026-01-15",
  "programItems": [
    {
      "spaceTypeId": "ST-SALA-OPERACYJNA",
      "spaceType": "operating_room",
      "label": "Sala operacyjna",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 45,
      "requiredTotalArea": 180,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY",
      "levelPreference": ["LVL-02"],
      "notes": "W tym 1 sala hybrydowa z angiografem"
    },
    {
      "spaceType": "pre_op_room",
      "label": "Sala przygotowań przedoperacyjnych",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 25,
      "requiredTotalArea": 50,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY"
    },
    {
      "spaceType": "recovery_room",
      "label": "Sala wybudzeń",
      "requiredQuantity": 1,
      "requiredAreaPerUnit": 60,
      "requiredTotalArea": 60,
      "priority": "critical",
      "departmentId": "DEPT-SURGERY"
    },
    {
      "spaceTypeId": "ST-SALA-CHORYCH",
      "spaceType": "patient_room",
      "label": "Sala chorych 2-łóżkowa",
      "requiredQuantity": 50,
      "requiredAreaPerUnit": 20,
      "requiredTotalArea": 1000,
      "priority": "critical",
      "departmentId": "DEPT-INTERNAL",
      "levelPreference": ["LVL-02", "LVL-03", "LVL-04"],
      "notes": "Minimum 50% sal z dostępem do balkonu"
    },
    {
      "spaceType": "patient_room_single",
      "label": "Sala chorych 1-łóżkowa (izolacja)",
      "requiredQuantity": 8,
      "requiredAreaPerUnit": 18,
      "requiredTotalArea": 144,
      "priority": "important",
      "departmentId": "DEPT-INTERNAL",
      "notes": "Sale izolacyjne z przedsionkiem i własną łazienką"
    },
    {
      "spaceType": "triage_room",
      "label": "Sala triażu",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 12,
      "requiredTotalArea": 24,
      "priority": "critical",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "resuscitation_bay",
      "label": "Stanowisko resuscytacyjne",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 30,
      "requiredTotalArea": 60,
      "priority": "critical",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "examination_room",
      "label": "Gabinet badań",
      "requiredQuantity": 6,
      "requiredAreaPerUnit": 15,
      "requiredTotalArea": 90,
      "priority": "important",
      "departmentId": "DEPT-EMERGENCY"
    },
    {
      "spaceType": "ct_room",
      "label": "Pracownia tomografii komputerowej",
      "requiredQuantity": 2,
      "requiredAreaPerUnit": 40,
      "requiredTotalArea": 80,
      "priority": "critical",
      "departmentId": "DEPT-RADIOLOGY",
      "notes": "Osłony radiologiczne wg normy PN-EN 61331"
    },
    {
      "spaceType": "mri_room",
      "label": "Pracownia rezonansu magnetycznego",
      "requiredQuantity": 1,
      "requiredAreaPerUnit": 55,
      "requiredTotalArea": 55,
      "priority": "important",
      "departmentId": "DEPT-RADIOLOGY",
      "notes": "Klatka Faradaya, wymagania fundamentowe (wibracje)"
    },
    {
      "spaceType": "consultation_room",
      "label": "Gabinet lekarski",
      "requiredQuantity": 12,
      "requiredAreaPerUnit": 15,
      "requiredTotalArea": 180,
      "priority": "important",
      "departmentId": "DEPT-ADMIN"
    },
    {
      "spaceType": "office",
      "label": "Biuro administracyjne",
      "requiredQuantity": 6,
      "requiredAreaPerUnit": 18,
      "requiredTotalArea": 108,
      "priority": "standard",
      "departmentId": "DEPT-ADMIN"
    },
    {
      "spaceType": "waiting_area",
      "label": "Poczekalnia",
      "requiredQuantity": 4,
      "requiredAreaPerUnit": 35,
      "requiredTotalArea": 140,
      "priority": "important"
    },
    {
      "spaceType": "staff_room",
      "label": "Pokój socjalny personelu",
      "requiredQuantity": 3,
      "requiredAreaPerUnit": 20,
      "requiredTotalArea": 60,
      "priority": "standard"
    }
  ],
  "totalRequiredArea": 2231,
  "notes": "Program zatwierdzony przez Dyrekcję Szpitala. Rewizja po zakończeniu fazy koncepcyjnej.",
  "version": "2.0.0",
  "tags": ["szpital", "program", "bilans-pomieszczeń", "kraków"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "programName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^PROG-" },
    "entityType": { "const": "space_program" },
    "programName": { "type": "string" },
    "buildingId": { "type": "string" },
    "programItems": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "spaceType": { "type": "string" },
          "requiredQuantity": { "type": "integer" },
          "requiredAreaPerUnit": { "type": "number" },
          "priority": { "type": "string", "enum": ["critical", "important", "standard", "optional"] }
        }
      }
    },
    "version": { "type": "string" }
  }
}
```

:::

## Zachowanie Kompilatora

Kompilator SBM obsługuje encje programu przestrzennego następująco:

| Funkcja | Zachowanie |
|---------|-----------|
| **Parsowanie** | Rozpoznaje typ encji `space_program` z prefiksem ID `PROG-` |
| **Grupowanie** | Zbiera do tablicy `entities.space_programs` |
| **Zliczanie zaprojektowanych** | Liczy przestrzenie (Space) pasujące do każdego `spaceType` w `programItems` i ustawia `designedQuantity` |
| **Obliczanie powierzchni** | Sumuje `netArea` pasujących przestrzeni do `designedTotalArea` |
| **Zgodność** | Oblicza `compliance` per element: `quantityMet`, `areaMet`, `percentage` |
| **Ogólna zgodność** | Oblicza `overallCompliance` z wagami priorytetów (critical 3x, important 2x, standard 1x) |
| **Integralność referencyjna** | Ostrzega, gdy `buildingId`, `departmentId` lub `spaceTypeId` odwołuje się do brakujących encji |

## Raport Zgodności Programu

Po kompilacji kompilator generuje raport porównujący wymagania z projektem:

```json
{
  "programCompliance": {
    "programId": "PROG-SZPITAL-GL",
    "overallPercentage": 94,
    "status": "partial",
    "items": [
      {
        "spaceType": "patient_room",
        "label": "Sala chorych",
        "required": 50,
        "designed": 48,
        "quantityMet": false,
        "deficit": 2,
        "requiredArea": 1000,
        "designedArea": 972,
        "areaMet": false,
        "priority": "critical"
      },
      {
        "spaceType": "operating_room",
        "label": "Sala operacyjna",
        "required": 4,
        "designed": 4,
        "quantityMet": true,
        "deficit": 0,
        "requiredArea": 180,
        "designedArea": 185,
        "areaMet": true,
        "priority": "critical"
      }
    ]
  }
}
```

**Statusy zgodności:** `full` (100% wymagań spełnionych), `partial` (>80%), `insufficient` (<80%)

## Jak Program Przestrzenny Łączy Się z Innymi Encjami

```
Program Przestrzenny (PROG-SZPITAL-GL)
  ├─ Budynek (BLD-SZPITAL-GL)          ← przez buildingId
  ├─ wymaga: Typ Przestrzeni (ST-SALA-OPERACYJNA)  ← przez spaceTypeId
  ├─ wymaga: Typ Przestrzeni (ST-SALA-CHORYCH)
  └─ kompilator porównuje z:
       ├─ Przestrzeń (SP-...-OR-01)    ← spaceType = "operating_room"
       ├─ Przestrzeń (SP-...-OR-02)    ← spaceType = "operating_room"
       ├─ Przestrzeń (SP-...-PAT-01)   ← spaceType = "patient_room"
       ├─ ... (48 sal chorych)
       └─ Przestrzeń (SP-...-PAT-48)
```

**Referencje do przodu (piszesz Ty):**
- `buildingId` → do którego budynku dotyczy program
- `programItems[].spaceTypeId` → referencja do Typu Przestrzeni
- `programItems[].departmentId` → referencja do działu

**Referencje zwrotne (kompilator oblicza):**
- `designedQuantity` — ile pomieszczeń danego typu faktycznie istnieje
- `designedTotalArea` — łączna powierzchnia zaprojektowanych pomieszczeń
- `compliance` — obiekt ze statusem zgodności

::: tip Kiedy Dodawać Program Przestrzenny
- **Faza 1 (Inicjacja):** Stwórz wstępny program z wymaganiami inwestora (requiredQuantity, priority)
- **Faza 2 (Koncepcja):** Uzupełnij o powierzchnie (requiredAreaPerUnit) i preferencje kondygnacji
- **Faza 3 (Projekt wstępny):** Program zatwierdzony przez inwestora. Kompilator zaczyna raportować zgodność
- **Faza 4-5 (Projekt budowlany/wykonawczy):** Weryfikuj, że designed >= required. Rewizja programu jeśli wymagania się zmieniły
:::

## Mapowanie BIM

Program Przestrzenny nie ma bezpośredniego odpowiednika IFC — to encja informacyjna do walidacji projektu:

| Pole SBM | Właściwość IFC |
|----------|---------------|
| `id` | Brak odpowiednika — encja czysto informacyjna |
| `programName` | Brak — program istnieje wyłącznie w SBM |
| `programItems[].spaceType` | Powiązanie przez `IfcSpace.ObjectType` zaprojektowanych przestrzeni |
| `compliance` | Brak — obliczane po stronie SBM, może być eksportowane do raportu |

::: tip Dla Architektów: Dlaczego Brak Mapowania IFC?
Program przestrzenny to narzędzie przedprojektowe — definiuje **co ma powstać**, nie **co istnieje** w modelu BIM. Mapowanie IFC dotyczy zaprojektowanych przestrzeni (IfcSpace), a nie wymagań programowych. Kompilator porównuje program z faktycznymi IfcSpace w modelu.
:::

## Zobacz Także

- **[Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** — Szablony specyfikacji dla typów pomieszczeń
- **[Przestrzeń](/pl/dokumentacja/encje/przestrzen)** — Zaprojektowane pomieszczenia, które kompilator porównuje z programem
- **[Budynek](/pl/dokumentacja/encje/budynek)** — Budynek, do którego odnosi się program (z polem departments)
