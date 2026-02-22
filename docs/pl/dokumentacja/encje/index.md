# Typy Kart

SBM definiuje ustrukturyzowane typy kart, kt&oacute;re reprezentują r&oacute;żne aspekty budynku. Każdy typ karty ma określone przeznaczenie i zestaw wymaganych p&oacute;l.

## Podstawowe Typy Kart

### Karty Przestrzenne

- **[Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Pomieszczenia i obszary funkcjonalne
- **[Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** - Szablony przestrzeni dla powtarzających się typów pomieszczeń
- **[Strefa](/pl/dokumentacja/encje/strefa)** - Strefy funkcjonalne (pożarowe, akustyczne, HVAC, bezpieczeństwa)
- **[Typ Strefy](/pl/dokumentacja/encje/typ-strefy)** - Szablony stref dla standardowych konfiguracji
- **[Kondygnacja](/pl/dokumentacja/encje/poziom)** - Kondygnacje budynku
- **[Budynek](/pl/dokumentacja/encje/budynek)** - Metadane na poziomie budynku

### Karty Techniczne

- **[Instalacja](/pl/dokumentacja/encje/system)** - Systemy MEP (HVAC, elektryczne, hydrauliczne, ochrony przeciwpożarowej)
- **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** - Szablony systemów dla standardowych konfiguracji
- **[Urządzenie](/pl/dokumentacja/encje/instancja-zasobu)** - Urządzenia fizyczne z danymi konserwacyjnymi
- **[Typ Zasobu](/pl/dokumentacja/encje/typ-zasobu)** - Specyfikacje produktów i szablony

### Karty Zarządcze

- **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Reguły wydajnościowe i regulacyjne

## Hierarchia Kart

```
Project
  └─ Building
      ├─ Level
      │   └─ Space ← odwołuje się do Space Type (szablon)
      │       ├─ Child Space (parentSpaceId → nadrzędna)
      │       └─ Asset Instance ← odwołuje się do Asset Type (szablon)
      ├─ Zone (grupuje Przestrzenie) ← odwołuje się do Zone Type (szablon)
      └─ System (zawiera Instancje Zasob&oacute;w) ← odwołuje się do System Type (szablon)
```

## Wsp&oacute;lne Pola

Wszystkie karty dzielą następujące wsp&oacute;lne pola:

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `id` | string | ✅ | Unikalny identyfikator (format hierarchiczny) |
| `entityType` | string | ✅ | Nazwa typu karty |
| `documentType` | string | ✅ | Typ dokumentu (zazwyczaj taki sam jak entityType) |
| `version` | string | ✅ | Wersja semantyczna (np. "1.0.0") |
| `tags` | array | ❌ | Dowolne tagi do klasyfikacji |
| `ifcMapping` | object | ❌ | Mapowanie obiektu IFC |

## Konwencje Nazewnictwa ID

SBM używa hierarchicznych, czytelnych dla ludzi identyfikator&oacute;w:

| Karta | Format | Przykład |
|-------|--------|----------|
| Budynek | `BLD-{sekwencja}` | `BLD-01` |
| Kondygnacja | `LVL-{sekwencja}` | `LVL-01` |
| Przestrzeń | `SP-{budynek}-{poziom}-{sekwencja}` | `SP-BLD-01-L01-001` |
| Typ Przestrzeni | `ST-{deskryptor}` | `ST-BEDROOM-STANDARD-A` |
| Strefa | `ZONE-{typ}-{deskryptor}` | `ZONE-FIRE-ZL-IV` |
| Typ Strefy | `ZT-{typ}-{deskryptor}` | `ZT-FIRE-ZL-IV` |
| Instalacja | `SYS-{kategoria}-{sekwencja}` | `SYS-HVAC-01` |
| Typ Systemu | `SYT-{kategoria}-{deskryptor}` | `SYT-HVAC-RESIDENTIAL-MVHR` |
| Urządzenie | `AI-{typ}-{sekwencja}` | `AI-AHU-01` |
| Typ Zasobu | `AT-{producent}-{model}` | `AT-BOSCH-HP-300` |
| Wymaganie | `REQ-{zakres}-{deskryptor}-{sekwencja}` | `REQ-DAYLIGHT-SLEEPING-001` |

## Relacje

Karty odwołują się do siebie nawzajem za pomocą identyfikator&oacute;w:

```yaml
# Przestrzeń odwołuje się do Strefy, Poziomu, Budynku, Wymagań
space:
  id: "SP-BLD-01-L01-001"
  buildingId: "BLD-01"
  levelId: "LVL-01"
  zoneIds: ["ZONE-FIRE-ZL-IV", "ZONE-HVAC-NORTH"]
  requirements: ["REQ-DAYLIGHT-SLEEPING-001"]

# Strefa odwołuje się do Budynku (relacja odwrotna obliczana automatycznie)
zone:
  id: "ZONE-FIRE-ZL-IV"
  buildingId: "BLD-01"
  spaceIds: []  # Automatycznie obliczane przez kompilator
```

Kompilator automatycznie oblicza **relacje odwrotne**:
- `space.zoneIds` → `zone.spaceIds`
- `space.parentSpaceId` → `space.childSpaceIds`
- `asset.systemId` → `system.assetInstanceIds`

## Następne Kroki

- **[Karta Przestrzeń](/pl/dokumentacja/encje/przestrzen)** - Poznaj karty pomieszczeń/obszar&oacute;w
- **[Karta Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Poznaj reguły i ograniczenia
- **[Przewodnik Tworzenia](/pl/dokumentacja/tworzenie/)** - Stw&oacute;rz swoją pierwszą kartę
