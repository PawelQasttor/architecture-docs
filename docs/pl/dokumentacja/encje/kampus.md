# Kampus (Zespół Wieloobiektowy)

## Czym To Jest

**Plik Kampusu** opisuje zespół wieloobiektowy: kompleks szpitalny, kampus uniwersytecki, osiedle deweloperskie lub park biurowy. Grupuje wiele działek ze wspólną infrastrukturą. Tworzysz **jeden plik kampusu na zespół obiektów**.

::: tip Dla Architektów
**Problem:** Projektujesz kompleks szpitalny z 5 budynkami na 3 działkach. Wspólna sieć ciepłownicza, drogi wewnętrzne, parking wielopoziomowy — ale każdy budynek ma osobnego projektanta. Dane o wspólnej infrastrukturze rozproszone po 5 różnych opracowaniach.

**Stary sposób:** Każdy zespół projektowy prowadzi własne zestawienia. Nikt nie wie, ile łącznie PUM ma cały kompleks. Wspólne koszty infrastruktury dzielone "na oko" w Excelu.

**Z plikiem kampusu:** Jeden plik `campus.md` grupuje wszystkie działki. Kompilator automatycznie zbiera budynki, sumuje powierzchnie, agreguje koszty. Wspólna infrastruktura udokumentowana raz — widoczna dla wszystkich zespołów.

**Jeden plik kampusu = jeden punkt prawdy dla całego zespołu wieloobiektowego.**
:::

**Kampus** (Campus) reprezentuje kontener nadrzędny wobec działek (Site). Umożliwia modelowanie projektów wieloobiektowych, gdzie wiele działek współdzieli infrastrukturę, zarządzanie i tożsamość inwestycyjną.

## Przeznaczenie

Kampusy definiują:
- Grupowanie wielu działek w jedną inwestycję
- Wspólną infrastrukturę (drogi, media, sieci, parkingi)
- Zbiorczą powierzchnię i PUM dla całego zespołu
- Plan generalny (master plan) z fazowaniem realizacji
- Podział kosztów wspólnych między budynki/działki
- Strukturę organizacyjną i odpowiedzialność za zarządzanie

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator kampusu z prefiksem `CAM-` | `"CAM-SZPITAL-POWIATOWY"` |
| `entityType` | string | Musi być `"campus"` | `"campus"` |
| `campusName` | string | Nazwa czytelna dla ludzi | `"Kampus Szpitala Powiatowego"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

::: tip Dla Architektów: Co Oznaczają Te Wymagane Pola
- **id**: Identyfikator kampusu z prefiksem `CAM-` (np. `CAM-SZPITAL-POWIATOWY`)
- **campusName**: Nazwa zespołu obiektów („Kampus Szpitala Powiatowego")
- **version**: Śledź zmiany

**Potrzebujesz TYLKO tych 3 pól.** Dodaj działki, infrastrukturę i plan generalny w miarę rozwoju projektu.
:::

## Pola Opcjonalne

| Pole | Typ | Opis |
|------|-----|------|
| `campusType` | string | Typ kampusu: `hospital_complex`, `university`, `mixed_use_estate`, `industrial_park`, `business_park`, `military`, `residential_estate`, `other` |
| `siteIds` | array | Auto-obliczane: działki należące do kampusu |
| `totalArea` | number | Łączna powierzchnia terenu kampusu w m² |
| `totalGFA` | number | Łączna powierzchnia użytkowa brutto (PUM) w m² |
| `sharedInfrastructure` | array | Wspólna infrastruktura (drogi, sieci, parkingi) |
| `masterPlan` | object | Plan generalny: fazy, harmonogram, docelowa zabudowa |
| `location` | object | Współrzędne GPS (latitude, longitude) |
| `address` | object | Adres (street, city, postalCode, region, country) |
| `classification` | object | Klasyfikacja funkcjonalna i administracyjna |
| `responsibility` | object | Zarządzanie: inwestor, administrator, operator |
| `cost` | object | Koszty zbiorcze kampusu (budynki + infrastruktura wspólna) |
| `ifcMapping` | object | Mapowanie IFC |
| `tags` | array | Dowolne tagi klasyfikacyjne |

::: tip Dla Architektów: Które Pola Opcjonalne Są Najważniejsze?

**Do planowania generalnego:**
- **campusType** — Typ kampusu (kompleks szpitalny, uniwersytet, osiedle)
- **totalArea** — Łączna powierzchnia terenu
- **totalGFA** — Łączna PUM (kompilator może obliczać automatycznie z działek)
- **masterPlan** — Fazy realizacji i harmonogram

**Do koordynacji infrastruktury:**
- **sharedInfrastructure** — Drogi, sieci ciepłownicze, parkingi, oświetlenie
- **responsibility** — Kto zarządza, kto odpowiada za utrzymanie

**Do dokumentacji administracyjnej:**
- **address** — Adres główny zespołu
- **classification** — Oznaczenie w planie miejscowym

**Najczęściej:** Zacznij od campusType, totalArea i sharedInfrastructure. Resztę dodaj w miarę rozwoju master planu.
:::

## Wspólna Infrastruktura

Dokumentuj zasoby współdzielone przez działki kampusu:

```yaml
sharedInfrastructure:
  - type: "road_network"
    name: "Drogi wewnętrzne kampusu"
    description: "2,4 km dróg wewnętrznych z oświetleniem LED"
    servingSiteIds: ["SITE-SZPITAL-GL", "SITE-SZPITAL-TECH", "SITE-PARKING"]
    cost:
      estimatedTotal: 3200000
      currency: "PLN"

  - type: "district_heating"
    name: "Sieć ciepłownicza kampusu"
    description: "Centralna kotłownia gazowa 2.4 MW"
    servingSiteIds: ["SITE-SZPITAL-GL", "SITE-SZPITAL-TECH"]

  - type: "parking"
    name: "Parking wielopoziomowy P1"
    description: "320 miejsc, 4 kondygnacje"
    capacity: 320
    servingSiteIds: ["SITE-SZPITAL-GL", "SITE-SZPITAL-TECH"]

  - type: "green_area"
    name: "Park rekreacyjny"
    description: "Ogród terapeutyczny i alejki spacerowe"
    area: 4500
```

**Typy infrastruktury:** `road_network` (drogi), `district_heating` (ciepło), `electrical_grid` (sieć elektryczna), `water_network` (wodociąg), `sewage_network` (kanalizacja), `stormwater` (odwodnienie), `parking` (parkingi), `green_area` (zieleń), `security` (ochrona), `telecom` (telekomunikacja), `waste_management` (odpady), `other` (inne)

## Przykład 1: Pierwszy Plik Kampusu (Minimalny)

**Najprostszy plik kampusu na start:**

::: code-group

```md [Markdown]
Plik: campus.md

---
id: "CAM-SZPITAL-POWIATOWY"
entityType: "campus"
campusName: "Kampus Szpitala Powiatowego w Krakowie"
campusType: "hospital_complex"
totalArea: 42000
address:
  street: "ul. Medyczna 15"
  city: "Kraków"
  postalCode: "30-001"
  country: "PL"
version: "1.0.0"
---

# Kampus Szpitala Powiatowego w Krakowie

Kompleks szpitalny na działce 4,2 ha z budynkiem głównym, centrum diagnostycznym i parkingiem.
```

```yaml [YAML]
id: "CAM-SZPITAL-POWIATOWY"
entityType: "campus"
campusName: "Kampus Szpitala Powiatowego w Krakowie"
campusType: "hospital_complex"
totalArea: 42000
address:
  street: "ul. Medyczna 15"
  city: "Kraków"
  postalCode: "30-001"
  country: "PL"
version: "1.0.0"
```

```json [JSON]
{
  "id": "CAM-SZPITAL-POWIATOWY",
  "entityType": "campus",
  "campusName": "Kampus Szpitala Powiatowego w Krakowie",
  "campusType": "hospital_complex",
  "totalArea": 42000,
  "address": {
    "street": "ul. Medyczna 15",
    "city": "Kraków",
    "postalCode": "30-001",
    "country": "PL"
  },
  "version": "1.0.0"
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "campusName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CAM-" },
    "entityType": { "const": "campus" },
    "campusName": { "type": "string" },
    "campusType": { "type": "string" },
    "totalArea": { "type": "number" },
    "version": { "type": "string" }
  }
}
```

:::

**To wszystko.** Infrastrukturę wspólną, master plan i koszty można dodać później.

---

## Przykład 2: Pełny Kampus (Wszystkie Szczegóły)

**Kampus uniwersytecki z wieloma działkami, wspólną infrastrukturą i planem generalnym:**

::: code-group

```md [Markdown]
---
id: "CAM-POLITECHNIKA-WROC"
entityType: "campus"
campusName: "Kampus Politechniki Wrocławskiej — Plac Grunwaldzki"
campusType: "university"

address:
  street: "Plac Grunwaldzki 11"
  city: "Wrocław"
  postalCode: "50-377"
  region: "Dolnośląskie"
  country: "PL"

location:
  latitude: 51.1099
  longitude: 17.0594

totalArea: 85000
totalGFA: 62000

sharedInfrastructure:
  - type: "road_network"
    name: "Drogi wewnętrzne kampusu"
    description: "1,8 km dróg i chodników z oświetleniem"
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]
    cost:
      estimatedTotal: 2800000
      currency: "PLN"

  - type: "district_heating"
    name: "Węzeł ciepłowniczy kampusu"
    description: "Centralne zasilanie z sieci miejskiej, 4.8 MW"
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]

  - type: "parking"
    name: "Parking podziemny P1"
    description: "180 miejsc pod Biblioteką Główną"
    capacity: 180
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]

  - type: "green_area"
    name: "Dziedziniec kampusu"
    description: "Centralny plac z alejkami i terenami zielonymi"
    area: 6200

  - type: "security"
    name: "System kontroli dostępu"
    description: "Monitoring CCTV, szlabany wjazdowe, ochrona 24/7"

masterPlan:
  totalPhases: 3
  currentPhase: 2
  phases:
    - phase: 1
      name: "Modernizacja Wydziału Architektury"
      status: "completed"
      completionDate: "2025-06-30"
      siteIds: ["SITE-WYDZ-ARCH"]

    - phase: 2
      name: "Nowy budynek Wydziału Mechanicznego"
      status: "in_progress"
      targetDate: "2027-12-31"
      siteIds: ["SITE-WYDZ-MECH"]

    - phase: 3
      name: "Rozbudowa Biblioteki Głównej"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-BIBLIOTEKA"]

classification:
  primaryUse: "educational"
  secondaryUse: "research"
  administrativeCategory: "uczelnia_publiczna"

responsibility:
  investor: "Politechnika Wrocławska"
  administrator: "Dział Infrastruktury PWr"
  operator: "Administracja Kampusu Plac Grunwaldzki"

cost:
  estimatedTotal: 185000000
  currency: "PLN"
  breakdown:
    - category: "buildings"
      amount: 142000000
    - category: "shared_infrastructure"
      amount: 28000000
    - category: "landscaping"
      amount: 15000000

ifcMapping:
  ifcEntity: "IfcProject"
  objectType: "CampusDevelopment"
  description: "Agregacja IfcSite na poziomie kampusu"

version: "2.0.0"
tags:
  - "uniwersytet"
  - "kampus"
  - "wrocław"
  - "edukacja"
  - "wieloobiektowy"
---

# Kampus Politechniki Wrocławskiej — Plac Grunwaldzki

Kampus uniwersytecki o łącznej powierzchni 8,5 ha z trzema wydziałami
i biblioteką główną. Modernizacja w 3 fazach do 2029 roku.

## Przegląd

- **Lokalizacja:** Plac Grunwaldzki, Wrocław
- **Typ:** Kampus uniwersytecki
- **Łączna powierzchnia terenu:** 85 000 m²
- **Łączna PUM:** 62 000 m²
- **Działki:** 3 (Wydział Architektury, Wydział Mechaniczny, Biblioteka)
- **Fazy realizacji:** 3 (faza 1 zakończona, faza 2 w toku)

## Infrastruktura Wspólna

- Drogi wewnętrzne 1,8 km z oświetleniem
- Węzeł ciepłowniczy 4,8 MW
- Parking podziemny 180 miejsc
- Monitoring i kontrola dostępu 24/7
```

```yaml [YAML]
id: "CAM-POLITECHNIKA-WROC"
entityType: "campus"
campusName: "Kampus Politechniki Wrocławskiej — Plac Grunwaldzki"
campusType: "university"

address:
  street: "Plac Grunwaldzki 11"
  city: "Wrocław"
  postalCode: "50-377"
  region: "Dolnośląskie"
  country: "PL"

location:
  latitude: 51.1099
  longitude: 17.0594

totalArea: 85000
totalGFA: 62000

sharedInfrastructure:
  - type: "road_network"
    name: "Drogi wewnętrzne kampusu"
    description: "1,8 km dróg i chodników z oświetleniem"
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]
    cost:
      estimatedTotal: 2800000
      currency: "PLN"

  - type: "district_heating"
    name: "Węzeł ciepłowniczy kampusu"
    description: "Centralne zasilanie z sieci miejskiej, 4.8 MW"
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]

  - type: "parking"
    name: "Parking podziemny P1"
    description: "180 miejsc pod Biblioteką Główną"
    capacity: 180
    servingSiteIds: ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]

  - type: "green_area"
    name: "Dziedziniec kampusu"
    description: "Centralny plac z alejkami i terenami zielonymi"
    area: 6200

  - type: "security"
    name: "System kontroli dostępu"
    description: "Monitoring CCTV, szlabany wjazdowe, ochrona 24/7"

masterPlan:
  totalPhases: 3
  currentPhase: 2
  phases:
    - phase: 1
      name: "Modernizacja Wydziału Architektury"
      status: "completed"
      completionDate: "2025-06-30"
      siteIds: ["SITE-WYDZ-ARCH"]

    - phase: 2
      name: "Nowy budynek Wydziału Mechanicznego"
      status: "in_progress"
      targetDate: "2027-12-31"
      siteIds: ["SITE-WYDZ-MECH"]

    - phase: 3
      name: "Rozbudowa Biblioteki Głównej"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-BIBLIOTEKA"]

classification:
  primaryUse: "educational"
  secondaryUse: "research"
  administrativeCategory: "uczelnia_publiczna"

responsibility:
  investor: "Politechnika Wrocławska"
  administrator: "Dział Infrastruktury PWr"
  operator: "Administracja Kampusu Plac Grunwaldzki"

cost:
  estimatedTotal: 185000000
  currency: "PLN"
  breakdown:
    - category: "buildings"
      amount: 142000000
    - category: "shared_infrastructure"
      amount: 28000000
    - category: "landscaping"
      amount: 15000000

ifcMapping:
  ifcEntity: "IfcProject"
  objectType: "CampusDevelopment"
  description: "Agregacja IfcSite na poziomie kampusu"

version: "2.0.0"
tags:
  - "uniwersytet"
  - "kampus"
  - "wrocław"
  - "edukacja"
  - "wieloobiektowy"
```

```json [JSON]
{
  "id": "CAM-POLITECHNIKA-WROC",
  "entityType": "campus",
  "campusName": "Kampus Politechniki Wrocławskiej — Plac Grunwaldzki",
  "campusType": "university",
  "address": {
    "street": "Plac Grunwaldzki 11",
    "city": "Wrocław",
    "postalCode": "50-377",
    "region": "Dolnośląskie",
    "country": "PL"
  },
  "location": {
    "latitude": 51.1099,
    "longitude": 17.0594
  },
  "totalArea": 85000,
  "totalGFA": 62000,
  "sharedInfrastructure": [
    {
      "type": "road_network",
      "name": "Drogi wewnętrzne kampusu",
      "description": "1,8 km dróg i chodników z oświetleniem",
      "servingSiteIds": ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"],
      "cost": {
        "estimatedTotal": 2800000,
        "currency": "PLN"
      }
    },
    {
      "type": "district_heating",
      "name": "Węzeł ciepłowniczy kampusu",
      "description": "Centralne zasilanie z sieci miejskiej, 4.8 MW",
      "servingSiteIds": ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]
    },
    {
      "type": "parking",
      "name": "Parking podziemny P1",
      "description": "180 miejsc pod Biblioteką Główną",
      "capacity": 180,
      "servingSiteIds": ["SITE-WYDZ-ARCH", "SITE-WYDZ-MECH", "SITE-BIBLIOTEKA"]
    },
    {
      "type": "green_area",
      "name": "Dziedziniec kampusu",
      "description": "Centralny plac z alejkami i terenami zielonymi",
      "area": 6200
    },
    {
      "type": "security",
      "name": "System kontroli dostępu",
      "description": "Monitoring CCTV, szlabany wjazdowe, ochrona 24/7"
    }
  ],
  "masterPlan": {
    "totalPhases": 3,
    "currentPhase": 2,
    "phases": [
      {
        "phase": 1,
        "name": "Modernizacja Wydziału Architektury",
        "status": "completed",
        "completionDate": "2025-06-30",
        "siteIds": ["SITE-WYDZ-ARCH"]
      },
      {
        "phase": 2,
        "name": "Nowy budynek Wydziału Mechanicznego",
        "status": "in_progress",
        "targetDate": "2027-12-31",
        "siteIds": ["SITE-WYDZ-MECH"]
      },
      {
        "phase": 3,
        "name": "Rozbudowa Biblioteki Głównej",
        "status": "planned",
        "targetDate": "2029-06-30",
        "siteIds": ["SITE-BIBLIOTEKA"]
      }
    ]
  },
  "classification": {
    "primaryUse": "educational",
    "secondaryUse": "research",
    "administrativeCategory": "uczelnia_publiczna"
  },
  "responsibility": {
    "investor": "Politechnika Wrocławska",
    "administrator": "Dział Infrastruktury PWr",
    "operator": "Administracja Kampusu Plac Grunwaldzki"
  },
  "cost": {
    "estimatedTotal": 185000000,
    "currency": "PLN",
    "breakdown": [
      { "category": "buildings", "amount": 142000000 },
      { "category": "shared_infrastructure", "amount": 28000000 },
      { "category": "landscaping", "amount": 15000000 }
    ]
  },
  "ifcMapping": {
    "ifcEntity": "IfcProject",
    "objectType": "CampusDevelopment",
    "description": "Agregacja IfcSite na poziomie kampusu"
  },
  "version": "2.0.0",
  "tags": ["uniwersytet", "kampus", "wrocław", "edukacja", "wieloobiektowy"]
}
```

```json [Schema]
{
  "type": "object",
  "required": ["id", "entityType", "campusName", "version"],
  "properties": {
    "id": { "type": "string", "pattern": "^CAM-" },
    "entityType": { "const": "campus" },
    "campusName": { "type": "string" },
    "campusType": { "type": "string" },
    "totalArea": { "type": "number" },
    "totalGFA": { "type": "number" },
    "sharedInfrastructure": { "type": "array" },
    "masterPlan": { "type": "object" },
    "version": { "type": "string" }
  }
}
```

:::

## Zachowanie Kompilatora

Kompilator SBM obsługuje encje kampusu następująco:

| Funkcja | Zachowanie |
|---------|-----------|
| **Parsowanie** | Rozpoznaje typ encji `campus` z prefiksem ID `CAM-` |
| **Grupowanie** | Zbiera do tablicy `entities.campuses` |
| **Relacje zwrotne** | Kampus otrzymuje auto-obliczaną tablicę `siteIds` ze wszystkich działek z `campusId` |
| **Agregacja powierzchni** | `totalGFA` obliczane automatycznie z sumy PUM działek (jeśli nie podane jawnie) |
| **Agregacja kosztów** | Koszty kampusu = suma kosztów działek + koszty infrastruktury wspólnej |
| **Integralność referencyjna** | Ostrzega, gdy `sharedInfrastructure[].servingSiteIds` odwołuje się do brakujących działek |

## Jak Kampus Łączy Się z Innymi Encjami

```
Kampus (CAM-SZPITAL-POWIATOWY)
  ├─ Działka (SITE-SZPITAL-GL)        ← przez site.campusId
  │    ├─ Budynek (BLD-SZPITAL-GL)
  │    │    ├─ Kondygnacja (LVL-00) ... (LVL-04)
  │    │    └─ Przestrzenie (sale, gabinety, ...)
  │    └─ Element Terenu (SF-OGROD-01)
  ├─ Działka (SITE-SZPITAL-TECH)
  │    └─ Budynek (BLD-CENTRUM-DIAG)
  └─ Działka (SITE-PARKING)
       └─ Budynek (BLD-PARKING-P1)
```

**Referencje do przodu (piszesz Ty):**
- Działki odwołują się do kampusu polem `campusId`

**Referencje zwrotne (kompilator oblicza):**
- Kampus otrzymuje `siteIds` z listą wszystkich działek

Przykład odwołania z pliku działki:

```yaml
# W site.md
---
id: "SITE-SZPITAL-GL"
entityType: "site"
campusId: "CAM-SZPITAL-POWIATOWY"  # ← łączy z kampusem
siteName: "Działka Szpitala Głównego"
---
```

## Plan Generalny (Master Plan)

Plan generalny pozwala dokumentować fazowanie realizacji:

```yaml
masterPlan:
  totalPhases: 3
  currentPhase: 1
  phases:
    - phase: 1
      name: "Budynek główny szpitala"
      status: "in_progress"
      targetDate: "2027-06-30"
      siteIds: ["SITE-SZPITAL-GL"]
      budget: 95000000

    - phase: 2
      name: "Centrum diagnostyczne"
      status: "planned"
      targetDate: "2028-12-31"
      siteIds: ["SITE-SZPITAL-TECH"]

    - phase: 3
      name: "Parking i zagospodarowanie terenu"
      status: "planned"
      targetDate: "2029-06-30"
      siteIds: ["SITE-PARKING"]
```

**Statusy faz:** `planned` (planowana), `in_progress` (w toku), `completed` (zakończona), `on_hold` (wstrzymana)

## Mapowanie BIM

Kampusy nie mają bezpośredniego odpowiednika IFC. Mapowane przez agregację obiektów IfcProject lub IfcSite:

| Pole SBM | Właściwość IFC |
|----------|---------------|
| `id` | `Pset_SBM_Campus.SBM_ID` |
| `campusName` | `IfcProject.Name` lub `Pset_SBM_Campus.CampusName` |
| `campusType` | `Pset_SBM_Campus.CampusType` |
| `totalArea` | `Pset_SBM_Campus.TotalArea` |
| `totalGFA` | `Pset_SBM_Campus.TotalGFA` |
| `siteIds` | Agregacja `IfcSite` w ramach `IfcProject` |

::: tip Dla Architektów: Mapowanie BIM w Praktyce
W Revit/ArchiCAD kampus modeluje się jako projekt (IfcProject) zawierający wiele obiektów IfcSite. Pole `Pset_SBM_Campus.SBM_ID` pozwala zachować powiązanie między modelem BIM a dokumentacją SBM.
:::

## Zobacz Także

- **[Działka](/pl/dokumentacja/encje/dzialka)** — Działki należą do kampusów
- **[Budynek](/pl/dokumentacja/encje/budynek)** — Budynki należą do działek w ramach kampusu
- **[Pakiet Budowlany](/pl/dokumentacja/encje/pakiet-budowlany)** — Fazowanie realizacji na poziomie pakietów
