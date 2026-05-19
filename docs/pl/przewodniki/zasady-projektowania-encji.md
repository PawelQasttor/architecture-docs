# Zasady Projektowania Encji: Kiedy Dzielić vs Zachować Inline

::: tip Czego Dotyczy Ten Przewodnik
Jak zdecydować, czy podzielić coś na osobną encję (przestrzeń, strefa, zasób) czy zachować to jako pole inline. Ta decyzja wpływa na łatwość konserwacji, możliwość ponownego użycia i złożoność.
:::

## Problem

Podczas dokumentowania budynku często stoisz przed tym wyborem:

**Opcja A: Osobna encja** (własny plik)
```yaml
# spaces/bedroom-01.md
finishes:
  floor: "Zobacz finish-floor-oak-01.md"

# finishes/finish-floor-oak-01.md
---
id: "FINISH-FLOOR-OAK-01"
entityType: "finish"
name: "Deska dębowa lakierowana"
manufacturer: "Barlinek"
...
```

**Opcja B: Inline** (w tym samym pliku)
```yaml
# spaces/bedroom-01.md
finishes:
  floor: "Deska dębowa lakierowana, Barlinek, grubość 14mm"
```

**Która jest lepsza?** To zależy. Ten przewodnik pomoże Ci zdecydować.

---

## Reguła Trzech Kryteriów

Podziel na osobną encję gdy **WSZYSTKIE trzy** są prawdziwe:

### 1. **Możliwość Ponownego Użycia**
Czy ta rzecz jest używana w wielu miejscach?

**TAK → Osobna encja** (zdefiniuj raz, używaj wszędzie)
**NIE → Inline** (jeśli jest unikalna, zachowaj prostotę)

**Przykład TAK**:
- 50 identycznych pomp ciepła → **Typ Zasobu** (jedna definicja, 50 instancji)
- Standardowe wykończenie podłogi w 30 sypialniach → **Typ Przestrzeni** (dziedziczy wykończenia)

**Przykład NIE**:
- Niestandardowy mural w jednej sali konferencyjnej → inline w `finishes.walls`
- Nietypowy kolor farby w jednej łazience → inline w `finishes.walls`

---

### 2. **Cykl Życia**
Czy ma własny harmonogram konserwacji, wymian lub aktualizacji?

**TAK → Osobna encja** (śledzenie konserwacji, historii, kosztów)
**NIE → Inline** (jeśli nigdy nie wymaga osobnego śledzenia)

**Przykład TAK**:
- Kocioł → **Zasób** (instalacja, konserwacja, wymiany, historia serwisowa)
- Panel PV → **Zasób** (monitoring wydajności, serwis, gwarancja)

**Przykład NIE**:
- Farba na ścianie → inline (nie śledzi się jej oddzielnie, część ściany)
- Płytki podłogowe → inline (nie serwisuje się ich oddzielnie)

---

### 3. **Relacje**
Czy odnosi się lub jest referowany przez wiele innych encji?

**TAK → Osobna encja** (umożliwia dwukierunkowe relacje)
**NIE → Inline** (jeśli żadne inne encje nie muszą się do tego odnosić)

**Przykład TAK**:
- Strefa pożarowa → **Strefa** (12 pomieszczeń odnosi się do niej)
- System HVAC → **System** (30 zasobów należy do niego)

**Przykład NIE**:
- Uwaga o kolorze dla jednego pomieszczenia → inline w `notes`
- Jednorazowe wymaganie specyficzne dla pomieszczenia → inline w `requirements`

---

## Drzewo Decyzyjne

```
Czy ta rzecz jest używana w wielu miejscach?
├─ NIE → Czy ma własny cykl życia (konserwacja/wymiany)?
│   ├─ NIE → Czy inne encje muszą się do niej odnosić?
│   │   ├─ NIE → ✅ ZACHOWAJ INLINE
│   │   └─ TAK → ⚠️  Rozważ osobną encję
│   └─ TAK → ✅ UTWÓRZ OSOBNĄ ENCJĘ (do śledzenia aktywów)
└─ TAK → ✅ UTWÓRZ OSOBNĄ ENCJĘ (możliwość ponownego użycia)
```

**Reguła kciuka**: Jeśli odpowiedziałeś TAK na 2 lub więcej kryteriów → osobna encja.

---

## Rzeczywiste Przykłady Decyzji

### Przykład 1: Pompa Ciepła (50 Identycznych Jednostek)

**Analiza**:
- ✅ **Możliwość ponownego użycia**: 50 identycznych jednostek
- ✅ **Cykl życia**: Roczna konserwacja, 15-letnia żywotność, wymiany
- ✅ **Relacje**: Każda należy do systemu HVAC, lokalizowana w pomieszczeniu

**Decyzja**: **Typ Zasobu + Instancje Zasobu**

**Implementacja**:
```yaml
# templates/asset-types/bosch-hp-300.md (350 linii - RAZ)
manufacturer: "Bosch"
model: "HP-300"
maintenanceProfile:
  serviceIntervalMonths: 12
  expectedLifetimeYears: 15

# assets/hp-01.md (90 linii)
assetTypeId: "AT-BOSCH-HP-300"
serialNumber: "HP300-2024-001234"
installationDate: "2024-06-15"
locatedInSpaceId: "SP-PLANT-ROOM"

# assets/hp-02.md... hp-50.md (po 90 linii każdy)
```

**Wynik**: 350 + (50 × 90) = 4850 linii vs 50 × 280 = 14000 linii (-66%)

---

### Przykład 2: Niestandardowy Kolor Farby (Jeden Pokój Konferencyjny)

**Analiza**:
- ❌ **Możliwość ponownego użycia**: Używany tylko w 1 pomieszczeniu
- ❌ **Cykl życia**: Nie wymaga osobnej konserwacji (część ściany)
- ❌ **Relacje**: Żadne inne pomieszczenia się nie odnoszą

**Decyzja**: **Inline**

**Implementacja**:
```yaml
# spaces/conference-room.md
finishes:
  walls: "Farba Dulux Deep Teal (kod: 70GG 19/227), matowa, 2 warstwy"
```

**Wynik**: Prosto, brak zbędnych plików.

---

### Przykład 3: Strefa Pożarowa (12 Pomieszczeń, 2 Piętra)

**Analiza**:
- ✅ **Możliwość ponownego użycia**: Identyczne strefy pożarowe na 2 piętrach
- ✅ **Cykl życia**: Wymaga weryfikacji zgodności, przeglądów
- ✅ **Relacje**: 12 pomieszczeń odwołuje się poprzez `zoneIds`

**Decyzja**: **Typ Strefy + Instancje Stref**

**Implementacja**:
```yaml
# templates/zone-types/fire-zl-iv.md (250 linii - RAZ)
fireResistance: "REI 60"
maxEscapeDistance: 10.0
requirements:
  - "REQ-FIRE-ZL-IV-001"
  - "REQ-FIRE-DETECTION-001"

# zones/fire-north-l01.md (80 linii)
zoneTypeId: "ZT-FIRE-ZL-IV"
levelIds: ["LVL-01"]
spaceIds: []  # Auto-obliczone z space.zoneIds

# zones/fire-north-l02.md... (po 80 linii każdy)
```

**Wynik**: 250 + (12 × 80) = 1210 linii vs 12 × 180 = 2160 linii (-44%)

---

### Przykład 4: Wykończenia (30 Identycznych Sypialni)

**Analiza**:
- ✅ **Możliwość ponownego użycia**: 30 sypialni z tymi samymi wykończeniami
- ❌ **Cykl życia**: Nie wymaga osobnego śledzenia (część pomieszczenia)
- ❌ **Relacje**: Wykończenia należą do pomieszczenia, nie są referowane

**Decyzja**: **Typ Przestrzeni** (nie osobna encja "wykończenia")

**Implementacja**:
```yaml
# templates/space-types/bedroom-standard.md
finishes:
  floor: "Deska dębowa lakierowana"
  walls: "Tynk malowany biały"
  ceiling: "Sufit napinany biały"

# spaces/bedroom-01.md
spaceTypeId: "ST-BEDROOM-STANDARD"
# Dziedziczy wykończenia z typu
```

**Dlaczego NIE osobna encja wykończenia**: Wykończenia nie mają własnego cyklu życia i są nierozdzielnie związane z pomieszczeniem. Używanie typu przestrzeni unika nadmiernej fragmentacji przy zachowaniu możliwości ponownego użycia.

---

## Anty-Wzorce (Czego Unikać)

### ❌ Anty-Wzorzec 1: Nadmierna Fragmentacja

**Problem**: Tworzenie osobnych encji dla wszystkiego.

**Przykład (ZŁY)**:
```yaml
# finishes/finish-floor-bedroom-01.md
color: "Naturalny dąb"
manufacturer: "Barlinek"

# finishes/finish-wall-bedroom-01.md
color: "Biały"
type: "Tynk malowany"

# finishes/finish-ceiling-bedroom-01.md
color: "Biały"
type: "Sufit napinany"
```

**Dlaczego zły**: Trzy pliki dla informacji używanych tylko w jednym pomieszczeniu. Nadmierne skomplikowanie bez korzyści.

**Lepiej**:
```yaml
# spaces/bedroom-01.md
finishes:
  floor: "Deska dębowa lakierowana, Barlinek, naturalny"
  walls: "Tynk malowany biały"
  ceiling: "Sufit napinany biały"
```

---

### ❌ Anty-Wzorzec 2: Powtarzanie Specyfikacji

**Problem**: Kopiowanie tych samych specyfikacji w wielu plikach.

**Przykład (ZŁY)**:
```yaml
# assets/hp-01.md (280 linii)
manufacturer: "Bosch"
model: "HP-300"
heatingCapacity: "12 kW"
maintenanceProfile:
  serviceIntervalMonths: 12
  ...
# (pełne specyfikacje)

# assets/hp-02.md (280 linii - IDENTYCZNE)
manufacturer: "Bosch"
model: "HP-300"
# ... (ta sama pełna specyfikacja)
```

**Dlaczego zły**: 50 identycznych plików × 280 linii = 14 000 linii powtórzeń.

**Lepiej**:
```yaml
# templates/asset-types/bosch-hp-300.md (350 linii - RAZ)
manufacturer: "Bosch"
model: "HP-300"
# ... (pełne specyfikacje)

# assets/hp-01.md (90 linii - TYLKO DANE INSTANCJI)
assetTypeId: "AT-BOSCH-HP-300"
serialNumber: "HP300-2024-001234"
installationDate: "2024-06-15"
```

---

### ❌ Anty-Wzorzec 3: Wymuszanie Relacji Gdy Ich Nie Ma

**Problem**: Tworzenie osobnych encji tylko dla "czystości" gdy nie ma rzeczywistych relacji.

**Przykład (ZŁY)**:
```yaml
# notes/note-conference-room-color.md
noteId: "NOTE-001"
content: "Klient poprosił o Deep Teal dla poczucia spokoju"

# spaces/conference-room.md
noteIds: ["NOTE-001"]  # Wymuszony odnośnik
```

**Dlaczego zły**: Brak innych encji odnoszących się do notatki. Nie ma rzeczywistej relacji do śledzenia.

**Lepiej**:
```yaml
# spaces/conference-room.md
notes: "Klient poprosił o kolor Deep Teal dla poczucia spokoju"
```

---

## Wzorce Złożoności

### Poziom 1: Proste Inline (< 5 Pól)

**Użyj dla**: Wartości tekstowych, proste atrybuty

```yaml
finishes:
  floor: "Deska dębowa"
  walls: "Tynk biały"
```

**Kiedy uaktualnić**: Gdy te same wykończenia pojawią się w 5+ pomieszczeniach → Typ Przestrzeni

---

### Poziom 2: Strukturyzowane Inline (5-10 Pól)

**Użyj dla**: Specyfikacje używane tylko raz

```yaml
environmentalConditions:
  temperature:
    min: 18.0
    max: 24.0
    unit: "°C"
  humidity:
    min: 40
    max: 60
    unit: "%"
  ventilationRate: "0.5 ACH"
```

**Kiedy uaktualnić**: Gdy identyczne warunki pojawią się w 10+ pomieszczeniach → Typ Przestrzeni

---

### Poziom 3: Typ + Instancje (10+ Użyć)

**Użyj dla**: Powtarzające się specyfikacje z zmianami specyficznymi dla instancji

```yaml
# templates/space-types/operating-room-a.md (800 linii)
# ... (pełne specyfikacje)

# spaces/or-01.md (120 linii)
spaceTypeId: "ST-OR-A"
roomNumber: "OR-01"
surgeryType: "general"
# (dodatkowe dane specyficzne dla instancji)
```

**Kiedy uaktualnić**: Gdy cykl życia staje się krytyczny → rozważ osobne encje (np. wyposażenie jako zasoby)

---

### Poziom 4: Hierarchia Pełnych Encji (Złożone Systemy)

**Użyj dla**: Systemy wymagające śledzenia cyklu życia i relacji

```yaml
# systems/hvac-01.md
systemName: "System HVAC Budynek 01"
systemTypeId: "SYT-HVAC-RESIDENTIAL"
assetIds: ["AST-HP-01", "AST-MVHR-01"]

# assets/hp-01.md
assetName: "Pompa Ciepła HP-01"
assetTypeId: "AT-BOSCH-HP-300"
systemId: "SYS-HVAC-01"
maintenanceSchedule: ...
```

---

## Wytyczne Specyficzne dla Encji

### Przestrzenie
- **Inline**: Wykończenia specyficzne dla pomieszczenia, notatki, korekty wymiarów
- **Osobna encja**: Żadne (przestrzenie są już encjami!)
- **Typ Przestrzeni**: Gdy 5+ pomieszczeń dzieli specyfikacje

### Strefy
- **Inline**: Właściwości strefy (fireResistance, maxEscapeDistance)
- **Osobna encja**: Żadne (strefy są już encjami!)
- **Typ Strefy**: Gdy identyczne strefy istnieją na wielu piętrach/budynkach

### Systemy
- **Inline**: Dane o wydajności, konfiguracja
- **Osobna encja**: Zasoby (pompy ciepła, kotły, panele)
- **Typ Systemu**: Gdy identyczne systemy w wielu budynkach/piętrach

### Zasoby
- **Inline**: Dane instalacyjne (data, instalator, lokalizacja)
- **Osobna encja**: Żadne (zasoby są już encjami!)
- **Typ Zasobu**: Gdy 5+ identycznych produktów

### Przegrody
- **Inline**: Warstwy materiałowe (chyba że powtarzalne)
- **Osobna encja**: Otwory (okna, drzwi) jeśli wymaga śledzenia lub powtarzają się specyfikacje
- **Typ**: Standardowe typy ścian/dachów używane w wielu lokalizacjach

---

## Lista Kontrolna Decyzji

Przed utworzeniem nowej encji, zapytaj:

- [ ] Czy ta rzecz jest używana w 3+ miejscach? (możliwość ponownego użycia)
- [ ] Czy wymaga własnego harmonogramu konserwacji? (cykl życia)
- [ ] Czy 3+ inne encje muszą się do niej odnosić? (relacje)
- [ ] Czy korzyści przewyższają złożoność dodatkowego pliku?
- [ ] Czy istnieje istniejący wzorzec typu/instancji dla tego? (Typ Przestrzeni, Typ Zasobu)

**Jeśli 2+ TAK**: Rozważ osobną encję lub typ
**Jeśli 0-1 TAK**: Zachowaj inline

---

## Strategia Migracji

**Zacznij inline, uaktualnij gdy potrzebne:**

### Faza 1: Wszystko Inline (Wczesna Koncepcja)
```yaml
# spaces/bedroom-01.md
finishes:
  floor: "Deska dębowa"
```

### Faza 2: Powtarzanie się Wykryte (Projekt Wstępny)
Jeśli widzisz te same wykończenia w 20 sypialniach → **utwórz Typ Przestrzeni**

### Faza 3: Zarządzanie Cyklem Życia (Projekt Wykonawczy)
Jeśli określono kocioł → **utwórz Typ Zasobu + Instancje**

### Faza 4: Złożoność Systemów (Budowa/Eksploatacja)
Jeśli konserwacja staje się krytyczna → **w pełni modelowane systemy + zasoby**

**Kluczowy wniosek**: Nie próbuj modelować wszystkiego w dniu 1. Pozwól na ewolucję złożoności w oparciu o rzeczywiste potrzeby.

---

## Podsumowanie

### Utwórz Osobną Encję Gdy:
✅ Używane w wielu miejscach (możliwość ponownego użycia)
✅ Ma własny cykl życia (konserwacja, wymiany)
✅ Inne encje się do niej odnoszą (relacje)

### Zachowaj Inline Gdy:
✅ Używane tylko w jednym miejscu
✅ Nie wymaga osobnego śledzenia
✅ Żadne relacje do innych encji
✅ Prostota > formalna struktura

### Użyj Typu Gdy:
✅ 5+ instancji dzieli te same specyfikacje
✅ Chcesz gwarantowanej spójności
✅ Aktualizacja w jednym miejscu powinna wpływać na wszystkie

---

## Zobacz Także

- **[Słownik](/pl/standardy/slownik)** — Wzorzec typ/instancja, relacje, hierarchie
- **[Przewodnik Dziedziczenia Właściwości](/pl/przewodniki/dziedziczenie-wlasciwosci)** — Jak właściwości przepływają z typu do instancji
- **[Dokumentacja Typu Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** — Kiedy używać typów przestrzeni
- **[Dokumentacja Typu Zasobu](/pl/dokumentacja/encje/typ-zasobu)** — Kiedy używać typów zasobów

::: tip Złota Zasada
**Zacznij prosto** (inline), **uaktualnij gdy pojawi się powtarzanie lub złożoność** (typ/instancja). Lepiej refaktoryzować później niż przedwcześnie komplikować.
:::
