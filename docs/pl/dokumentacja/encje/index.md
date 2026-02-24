# Typy Kart: Jakie Pliki Potrzebujesz?

## Pytanie, Które Zadajesz

"Chcę udokumentować mój projekt budowlany. Jakie pliki utworzyć?"

Ta strona na to odpowiada. Istnieje **11 typów plików**, które możesz stworzyć. Każdy typ opisuje inny aspekt Twojego budynku.

::: tip Nie Potrzebujesz Wszystkich 11 Typów
Większość projektów zaczyna od 3-4 typów:
- **Pomieszczenia** (pokoje)
- **Strefy** (strefy pożarowe, akustyczne)
- **Wymagania** (przepisy jak minimalna wysokość sufitu)
- **Budynek** (metadane projektu)

To wystarczy na start. Dodaj inne typy, gdy ich potrzebujesz.
:::

---

## 11 Typów Kart (Uporządkowanych Według Tego, Co Opisują)

### **Opisywanie Przestrzeni (Gdzie Są Ludzie)**

| Typ | Kiedy Używasz | Przykładowy Plik |
|-----|--------------|------------------|
| **[Pomieszczenie](/pl/dokumentacja/encje/przestrzen)** | Każdy pokój, korytarz, obszar | `spaces/sypialnia-01.md` |
| **[Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** | Szablon dla podobnych pomieszczeń (np. "standardowa sypialnia") | `space-types/sypialnia-standardowa.md` |
| **[Kondygnacja](/pl/dokumentacja/encje/poziom)** | Każde piętro w budynku | `levels/parter.md` |
| **[Budynek](/pl/dokumentacja/encje/budynek)** | Cały budynek | `buildings/zielony-taras.md` |

**Zacznij tutaj:** Jeśli jesteś nowy, zacznij od **Pomieszczenia** (jeden plik na pokój). Dodaj **Kondygnację** i **Budynek**, gdy masz wiele pięter lub budynków.

---

### **Opisywanie Reguł & Grupowań**

| Typ | Kiedy Używasz | Przykładowy Plik |
|-----|--------------|------------------|
| **[Strefa](/pl/dokumentacja/encje/strefa)** | Grupa pomieszczeń o wspólnej charakterystyce (strefa pożarowa, akustyczna, HVAC) | `zones/strefa-pozarowa-zl-iv.md` |
| **[Typ Strefy](/pl/dokumentacja/encje/typ-strefy)** | Szablon dla konfiguracji stref | `zone-types/strefa-poz-zl-iv-standard.md` |
| **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** | Przepis lub reguła, która musi być spełniona | `requirements/wysokosc-min-250cm.md` |

**Kiedy potrzebujesz stref:** Złożenie pozwolenia (strefy pożarowe wymagane), koordynacja MEP (strefy HVAC), projekt akustyczny

---

### **Opisywanie Systemów & Wyposażenia**

| Typ | Kiedy Używasz | Przykładowy Plik |
|-----|--------------|------------------|
| **[Instalacja](/pl/dokumentacja/encje/system)** | Instalacja budowlana (ogrzewanie, wentylacja, hydraulika) | `systems/ogrzewanie-centralne.md` |
| **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** | Szablon dla konfiguracji instalacji MEP | `system-types/hvac-mieszkalny-mvhr.md` |
| **[Urządzenie](/pl/dokumentacja/encje/instancja-zasobu)** | Konkretne zainstalowane urządzenie | `assets/kociol-hp-01.md` |
| **[Typ Zasobu](/pl/dokumentacja/encje/typ-zasobu)** | Specyfikacja produktu (model, wydajność, konserwacja) | `asset-types/vaillant-ecotec-306.md` |

**Kiedy ich potrzebujesz:** Faza budowy (urządzenia instalowane), odbiór (zarządca potrzebuje rejestru wyposażenia)

---

## Jak Pliki Łączą Się Ze Sobą

Pliki odwołują się do siebie używając ID. Pomyśl o tym jak o hiperlinkach między dokumentami:

```
Budynek (Zielony Taras)
  └─ Kondygnacja (Parter)
      └─ Pomieszczenie (Sypialnia 01)
          ├─ należy do Strefy (Strefa Pożarowa ZL-IV)
          ├─ musi spełniać Wymaganie (wysokość >= 2,50m)
          └─ zawiera Urządzenie (Grzejnik RAD-01)
```

**Przykład:** Plik Sypialni 01 mówi "Jestem w Strefie Pożarowej ZL-IV". System automatycznie aktualizuje Strefę Pożarową ZL-IV, aby mówiła "Sypialnia 01 jest we mnie". Piszesz link tylko raz; link zwrotny jest obliczany automatycznie.

---

## Szablony vs Konkretne Rzeczy (Wzorzec Typ/Instancja)

To jest **opcjonalne**, ale bardzo przydatne, jeśli masz wiele podobnych pomieszczeń.

### Problem

Masz 20 sypialni. Wszystkie potrzebują:
- Tej samej minimalnej wysokości (2,50m)
- Tego samego wymagania światła dziennego
- Tej samej specyfikacji drzwi przeciwpożarowych
- Tego samego czujnika dymu

**Stary sposób:** Napisz te specyfikacje 20 razy (raz na plik sypialni)
**Nowy sposób:** Napisz specyfikacje raz w pliku **Typu**, odwołaj się do niego z 20 plików **Instancji**

### Rozwiązanie

**Krok 1: Stwórz Typ Przestrzeni** (szablon - zdefiniuj raz)

```markdown
Plik: space-types/sypialnia-standardowa.md
---
id: "ST-SYPIALNIA-STANDARD-A"
requirements:
  - "REQ-HEIGHT-MIN-250"
  - "REQ-DAYLIGHT-SLEEPING"
  - "REQ-FIRE-DOOR-EI30"
equipment:
  - "Czujnik dymu"
  - "Grzejnik"
---

# Typ Przestrzeni: Sypialnia Standardowa A

Wszystkie sypialnie mieszkalne podlegają tej specyfikacji.
```

**Krok 2: Stwórz 20 Instancji Przestrzeni** (odwołaj się do szablonu)

```markdown
Plik: spaces/sypialnia-01.md
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
spaceTypeId: "ST-SYPIALNIA-STANDARD-A"  # ← Dziedziczy wszystkie spec z szablonu!
designArea: 14.5  # Specyficzne dla instancji: rzeczywista powierzchnia
levelId: "LVL-01"  # Specyficzne dla instancji: które piętro
---

# Sypialnia 01

Sypialnia od północy na parterze.
```

**Rezultat:**
- ✅ Zdefiniuj specyfikacje raz (w pliku Typu)
- ✅ Zaktualizuj Typ → wszystkie 20 sypialni aktualizuje się automatycznie
- ✅ **26-33% mniej dokumentacji** dla projektów z powtarzającymi się pomieszczeniami

**Kiedy używać typów:** Projekty z >5 podobnymi pomieszczeniami/strefami/instalacjami

---

## Nazewnictwo Plików (Jak Działają ID)

Każdy plik potrzebuje unikalnego ID. Oto wzorzec:

| Typ Karty | Format ID | Przykład |
|-----------|-----------|----------|
| **Budynek** | `BLD-{numer}` | `BLD-01` |
| **Kondygnacja** | `LVL-{numer}` | `LVL-01` (parter) |
| **Pomieszczenie** | `SP-{budynek}-{poziom}-{numer}` | `SP-BLD-01-L01-001` |
| **Typ Przestrzeni** | `ST-{deskryptor}` | `ST-SYPIALNIA-STANDARD-A` |
| **Strefa** | `ZONE-{typ}-{deskryptor}` | `ZONE-FIRE-ZL-IV` |
| **Typ Strefy** | `ZT-{deskryptor}` | `ZT-FIRE-ZL-IV` |
| **Instalacja** | `SYS-{kategoria}-{numer}` | `SYS-HVAC-01` |
| **Typ Systemu** | `SYT-{deskryptor}` | `SYT-HVAC-MIESZKALNY-MVHR` |
| **Urządzenie** | `AI-{typ}-{numer}` | `AI-HP-01` (pompa ciepła 01) |
| **Typ Zasobu** | `AT-{deskryptor}` | `AT-VAILLANT-ECOTEC-306` |
| **Wymaganie** | `REQ-{zakres}-{deskryptor}-{numer}` | `REQ-PL-WT-HEIGHT-001` |

::: tip Dlaczego Te ID?
- **Czytelne dla ludzi:** `SP-BLD-01-L01-001` oznacza "Pomieszczenie w Budynku 01, Poziom 01, numer 001"
- **Sortowalne:** Pliki sortują się logicznie (wszystkie pomieszczenia Poziomu 01 grupują się razem)
- **Śledzone:** Możesz zobaczyć budynek/poziom/sekwencję z samego ID
:::

---

## Pola, Które Ma Każdy Plik

Niezależnie od typu, każdy plik zawiera te podstawowe pola:

```yaml
---
id: "SP-BLD-01-L01-001"  # Unikalny identyfikator
entityType: "space"  # Jaki typ pliku to jest
documentType: "space"  # Zazwyczaj takie samo jak entityType
version: "1.0.0"  # Wersja semantyczna (inkrementuj przy aktualizacji)
tags: ["mieszkalny", "sypialny"]  # Opcjonalne: etykiety do filtrowania
---
```

**Dlaczego wersje?** Śledź zmiany w czasie. `1.0.0` = projekt początkowy, `1.1.0` = drobna aktualizacja, `2.0.0` = większe przeprojektowanie

---

## Twoje Następne Kroki

**Wybierz w zależności od tego, co chcesz zrobić:**

| Chcę... | Idź tutaj |
|---------|-----------|
| **Udokumentować wszystkie pomieszczenia w moim projekcie** | [Dokumentacja Pomieszczenia](/pl/dokumentacja/encje/przestrzen) |
| **Ustawić strefy pożarowe na pozwolenie** | [Dokumentacja Strefy](/pl/dokumentacja/encje/strefa) |
| **Śledzić przepisy budowlane** | [Dokumentacja Wymagania](/pl/dokumentacja/encje/wymaganie) |
| **Udokumentować instalacje MEP** | [Dokumentacja Instalacji](/pl/dokumentacja/encje/system) |
| **Śledzić zainstalowane wyposażenie** | [Dokumentacja Urządzenia](/pl/dokumentacja/encje/instancja-zasobu) |
| **Zobaczyć wszystkie 11 typów z przykładami** | Przewiń w dół, aby zobaczyć pełną listę poniżej |

---

## Pełna Lista Wszystkich 11 Typów Kart

Kliknij dowolny typ, aby zobaczyć szczegółową dokumentację:

### Przestrzenne
1. **[Budynek](/pl/dokumentacja/encje/budynek)** - Metadane poziomu budynku (nazwa, adres, klasyfikacja)
2. **[Kondygnacja](/pl/dokumentacja/encje/poziom)** - Informacje o piętrze (wysokość, powierzchnia brutto)
3. **[Pomieszczenie](/pl/dokumentacja/encje/przestrzen)** - Pokoje i obszary funkcjonalne (sypialnie, biura, korytarze)
4. **[Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni)** - Szablony dla powtarzających się typów pomieszczeń

### Strefowanie
5. **[Strefa](/pl/dokumentacja/encje/strefa)** - Grupowania funkcjonalne (pożarowe, akustyczne, HVAC, bezpieczeństwa)
6. **[Typ Strefy](/pl/dokumentacja/encje/typ-strefy)** - Szablony dla standardowych konfiguracji stref

### Systemy Techniczne
7. **[Instalacja](/pl/dokumentacja/encje/system)** - Systemy MEP (HVAC, elektryczne, hydrauliczne)
8. **[Typ Systemu](/pl/dokumentacja/encje/typ-systemu)** - Szablony dla standardowych konfiguracji systemów
9. **[Urządzenie](/pl/dokumentacja/encje/instancja-zasobu)** - Fizyczne wyposażenie (kotły, pompy, czujniki)
10. **[Typ Zasobu](/pl/dokumentacja/encje/typ-zasobu)** - Specyfikacje produktów i szablony

### Zarządcze
11. **[Wymaganie](/pl/dokumentacja/encje/wymaganie)** - Reguły wydajnościowe i regulacyjne (minimalne wysokości, odporności ogniowe, światło dzienne)

---

## Jak Działają Odniesienia (Za Kulisami)

Kiedy piszesz plik Pomieszczenia, odwołujesz się do innych plików przez ID:

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
buildingId: "BLD-01"  # Który budynek
levelId: "LVL-01"  # Które piętro
zoneIds:  # Które strefy
  - "ZONE-FIRE-ZL-IV"
  - "ZONE-HVAC-NORTH"
requirements:  # Które przepisy
  - "REQ-HEIGHT-MIN-250"
---
```

System automatycznie oblicza **relacje zwrotne**:

- Ty piszesz: `sypialnia-01.md` mówi "Jestem w Strefie FIRE-ZL-IV"
- System oblicza: `strefa-pozarowa-zl-iv.md` jest aktualizowane, aby mówiło "Sypialnia 01 jest we mnie"

**Rezultat:** Nigdy ręcznie nie utrzymujesz "które pomieszczenia są w tej strefie" — jest obliczane z plików pomieszczeń.

---

## Często Zadawane Pytania

**"Czy muszę utworzyć wszystkie 11 typów?"**
Nie. Zacznij od 3-4 typów (Pomieszczenie, Strefa, Wymaganie, Budynek). Dodaj inne, gdy ich potrzebujesz.

**"Co jeśli mam 50 identycznych sypialni?"**
Użyj wzorca Typ/Instancja. Stwórz 1 Typ Przestrzeni (szablon), 50 Instancji Przestrzeni (rzeczywiste pokoje).

**"Czy mogę dodać własne niestandardowe pola?"**
Tak. Schemat jest rozszerzalny. Dodaj niestandardowe pola w obiekcie `properties`.

**"Co jeśli popełnię błąd w ID?"**
Narzędzie walidacyjne powie Ci, jeśli odwołujesz się do ID, które nie istnieje. Napraw to zanim stanie się problemem.

**"Skąd wiem, którego typu użyć?"**
Zapytaj: "Czy opisuję fizyczny pokój?" → **Pomieszczenie**
"Czy opisuję grupę pomieszczeń?" → **Strefa**
"Czy opisuję wyposażenie?" → **Urządzenie**
"Czy opisuję regułę?" → **Wymaganie**

---

## Zmiany w v0.3.0

**SBM v0.3.0** wprowadza znaczące rozszerzenia dla budynków opieki zdrowotnej, infrastruktury i zaawansowanego modelowania danych. Oto podsumowanie zmian:

### Nowe typy przestrzeni (30 nowych wartości)
Rozszerzono wyliczenie `spaceType` o przestrzenie opieki zdrowotnej (`operating_room`, `icu`, `patient_room`, `examination_room`, `clean_room`, `isolation_room` i inne) oraz infrastrukturalne (`server_room`, `workshop`, `loading_dock`, `parking`, `mechanical_room` i inne). Szczegóły: [Przestrzeń](/pl/dokumentacja/encje/przestrzen) i [Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni).

### Nowe typy stref (5 nowych wartości)
Dodano `medical_electrical`, `radiation_protection`, `cleanroom`, `infection_control`, `pressure_cascade`. Szczegóły: [Strefa](/pl/dokumentacja/encje/strefa) i [Typ Strefy](/pl/dokumentacja/encje/typ-strefy).

### Nowe kategorie systemów (5 nowych wartości)
Dodano `medical_gas`, `nurse_call`, `pneumatic_tube`, `medical_waste`, `it_network`. Szczegóły: [Instalacja](/pl/dokumentacja/encje/system) i [Typ Systemu](/pl/dokumentacja/encje/typ-systemu).

### Wykończenia strukturalne
Pola wykończeń (`floor`, `walls`, `ceiling` itp.) akceptują teraz ALBO prosty string, ALBO obiekt strukturalny z: `material`, `productCode`, `fireClass`, `slipResistance`, `antimicrobial`, `esdProtection`, `chemicalResistance`, `cleanability`, `coveBase`, `seamless`. Szczegóły: [Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni), [Przestrzeń](/pl/dokumentacja/encje/przestrzen), [Kondygnacja](/pl/dokumentacja/encje/poziom).

### Rozszerzone warunki środowiskowe
6 nowych pól: `airChangesPerHour`, `freshAirPercentage`, `filtrationClass`, `pressureDifferentialPa`, `laminarFlow`, `operatingRoomClass`. Szczegóły: [Przestrzeń](/pl/dokumentacja/encje/przestrzen), [Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni), [Kondygnacja](/pl/dokumentacja/encje/poziom).

### Ekranowanie (nowy obiekt)
Nowy opcjonalny obiekt `shielding` z ekranowaniem radiologicznym, RF i izolacją akustyczną. Szczegóły: [Przestrzeń](/pl/dokumentacja/encje/przestrzen) i [Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni).

### Wymagania jakościowe
Pola `metric`, `operator`, `value` są teraz opcjonalne. Nowy typ `qualitative` z polami `qualitativeDescription`, `acceptanceCriteria`, `evidenceRequired`. Szczegóły: [Wymaganie](/pl/dokumentacja/encje/wymaganie).

### Działy/Oddziały
Nowa opcjonalna tablica `departments` w projekcie z polami: `id`, `name`, `description`, `levelIds`, `headOfDepartment`, `operatingHours`, `staffCount`. Szczegóły: [Budynek](/pl/dokumentacja/encje/budynek).

### Rozszerzone relacje sąsiedztwa
Nowe typy relacji: `connects_via_airlock`, `connects_via_pass_through`, `clean_supply_to`, `dirty_return_from`, `patient_flow_to`, `staff_flow_to`, `visitor_flow_to`, `material_flow_to`, `vertical_shaft`. Nowe pola: `boundaryType`, `fireRating`. Szczegóły: [Przestrzeń](/pl/dokumentacja/encje/przestrzen).

---

::: tip Gotowy Stworzyć Swój Pierwszy Plik?
Przejdź do [Szybki Start](/pl/standardy/szybki-start), aby stworzyć swój pierwszy plik Pomieszczenia w 5 minut.

Lub przeglądaj [Szablony](/pl/szablony/), aby kopiować gotowe przykłady.
:::
