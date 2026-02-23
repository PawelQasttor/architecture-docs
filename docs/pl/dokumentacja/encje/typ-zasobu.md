# Typ Zasobu

**Typ Zasobu** to szablon specyfikacji produktu definiujący wspólne specyfikacje dla urządzeń i zasobów. Instancje zasobów odwołują się do typu, aby dziedziczyć dane producenta, specyfikacje, dane wydajności i profile konserwacji.

::: tip Kiedy używać
Używaj Typów Zasobów gdy masz **wiele identycznych elementów wyposażenia** (np. 50 identycznych pomp ciepła, 100 identycznych czujników dymu). Zdefiniuj specyfikacje produktu raz w typie, a następnie twórz lekkie instancje dodając numery seryjne, lokalizacje i dane instalacyjne.

**Korzyści:**
- ✅ Definiowanie specyfikacji produktu, harmonogramów konserwacji, kosztów jeden raz
- ✅ Gwarantowana spójność dla identycznego sprzętu
- ✅ Aktualizacja informacji o produkcie → wpływa na wszystkie instancje
- ✅ Uproszczone zamówienia zbiorcze
- ✅ Scentralizowane części zamienne i procedury konserwacji
:::

## Pola Wymagane

| Pole | Typ | Opis | Przykład |
|------|-----|------|----------|
| `id` | string | Unikalny identyfikator typu | `"AT-BOSCH-HP-300"` |
| `entityType` | string | Musi być `"asset_type"` | `"asset_type"` |
| `typeName` | string | Nazwa produktu | `"Pompa Ciepła Bosch HP-300"` |
| `category` | string | Kategoria zasobu | `"hvac"` |
| `version` | string | Wersja semantyczna | `"1.0.0"` |

### Kategoria Zasobu

| Kategoria | Cel | Przykłady |
|-----------|-----|-----------|
| `hvac` | Urządzenia HVAC | Pompy ciepła, centrale, kotły, chillery |
| `electrical` | Urządzenia elektryczne | Rozdzielnice, transformatory, UPS, panele |
| `plumbing` | Urządzenia wodno-kanalizacyjne | Pompy, podgrzewacze wody, zbiorniki ciśnieniowe |
| `fire_safety` | Ochrona przeciwpożarowa | Czujki, gaśnice, tryskacze, alarmy |
| `security` | Urządzenia bezpieczeństwa | Kamery, kontrola dostępu, czujki włamania |
| `lighting` | Oprawy oświetleniowe | Oprawy LED, oświetlenie awaryjne, sterowanie |

## Pola Szablonowe

| Pole | Typ | Opis |
|------|-----|------|
| `description` | string | Opis produktu i cel |
| `manufacturer` | string | Nazwa producenta |
| `model` | string | Numer/oznaczenie modelu |
| `productCode` | string | Kod produktu/SKU producenta |
| `specifications` | object | Specyfikacje techniczne (różne w zależności od kategorii) |
| `performanceData` | object | Charakterystyki wydajności |
| `maintenanceProfile` | object | Interwały serwisowe, żywotność, gwarancja, procedury |
| `requirements` | array | ID wymagań instalacji/eksploatacji |
| `cost` | object | Cena zakupu, koszt instalacji, waluta |
| `tags` | array | Tagi klasyfikacyjne |

## Struktura Obiektu Specifications

### Specyfikacje Zasobu HVAC

```yaml
specifications:
  heatingCapacity: "12 kW"
  refrigerant: "R-32"
  powerInput: "2.8 kW"
  soundPressureLevel: "35 dB(A)"
  dimensions: "800×600×1200 mm"
  weight: "85 kg"
  ipRating: "IP24"
```

## Struktura Maintenance Profile

```yaml
maintenanceProfile:
  serviceIntervalMonths: 12
  expectedLifetimeYears: 15
  warrantyYears: 5
  sparePartsRequired:
    - "Zestaw filtrów (wymiana roczna)"
    - "Czujnik ciśnienia"
  maintenanceProcedures:
    - "Roczny serwis: filtry, sprawdzenie ciśnienia"
    - "Czyszczenie wymiennika ciepła"
```

## Struktura Cost

```yaml
cost:
  purchasePrice: 8500
  installationCost: 1200
  currency: "PLN"
```

## Przykład: Typ Zasobu Pompy Ciepła

```markdown
---
documentType: "asset_type"
id: "AT-BOSCH-COMPRESS-7000I-12KW"
typeName: "Pompa Ciepła Bosch Compress 7000i 12kW"
category: "hvac"

manufacturer: "Bosch Thermotechnology"
model: "Compress 7000i AW"
productCode: "8738207145"

specifications:
  heatingCapacity: "12 kW"
  refrigerant: "R-32"
  copHeating: 4.2
  energyClass: "A+++"

maintenanceProfile:
  serviceIntervalMonths: 12
  expectedLifetimeYears: 15
  warrantyYears: 5

cost:
  purchasePrice: 36000
  installationCost: 5000
  currency: "PLN"

version: "1.0.0"
---
```

## Skompilowane Wyjście

```json
{
  "asset_types": [{
    "id": "AT-BOSCH-COMPRESS-7000I-12KW",
    "manufacturer": "Bosch",
    "specifications": {/* specyfikacje */}
  }],
  "asset_instances": [{
    "id": "AI-HP-01",
    "assetTypeId": "AT-BOSCH-COMPRESS-7000I-12KW",
    "serial": "BCS7000i-2024-001234",
    "installationDate": "2024-06-15"
  }]
}
```

## Korzyści

| Podejście | 50 Pomp Ciepła | Zmiana Produktu |
|-----------|----------------|-----------------|
| **Bez typów** | 50 plików z pełnymi specyfikacjami | Aktualizacja 50 plików |
| **Z typami** | 1 typ + 50 instancji | Aktualizacja 1 pliku typu |

## Zobacz Również

- **[Instancja Zasobu](/pl/dokumentacja/encje/instancja-zasobu)** - Instancje zasobów odwołujące się do typów
- **[System](/pl/dokumentacja/encje/system)** - Systemy zawierające zasoby
- **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** - Szablony systemów
- **Schema:** `sbm-schema-v0.2.json` - Definicja Typu Zasobu
