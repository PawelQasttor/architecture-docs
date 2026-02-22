# Faza 6: Faza Budowy

::: tip Przegląd Fazy
**Co robisz:** Nadzór autorski, dziennik budowy, odpowiedzi na RFI, dokumentowanie zmian
**BIM LOD:** LOD 400 (aktualizowany w miarę zmian)
**Czas trwania:** Zależny od projektu (typowo 6-18 miesięcy)
**Dokumenty:** Protokoły z narad, dziennik nadzoru, RFI, zmiany projektowe, protokoły odbioru etapów
:::

---

## Co dzieje się w tej fazie

Faza Budowy to etap, w którym:
1. Nadzorujesz budowę w celu zapewnienia zgodności z projektem
2. Prowadzisz dziennik budowy
3. Odpowiadasz na zapytania wykonawców (RFI - Requests for Information)
4. Sprawdzasz i zatwierdzasz rysunki warsztatowe
5. Dokumentujesz wszystkie zmiany w projekcie
6. Przeprowadzasz odbiory etapowe i wydajesz protokoły
7. Koordynujesz pracę z konsultantami

**Twoja rola:** Nadzór autorski - zapewnienie zgodności budowy z zamierzeniami projektowymi

---

## Dokumenty do stworzenia

### 1. Dziennik nadzoru autorskiego
**Cel:** Rejestrowanie wszystkich wizyt na budowie i obserwacji

**Struktura YAML:**
```yaml
---
documentType: "construction_supervision"
projectPhase: "construction"
visitNumber: 15
visitDate: "2026-05-10"
attendees:
  - "Imię Architekta - architekt"
  - "Kierownik budowy - wykonawca"
weather:
  conditions: "słonecznie"
  temperature: "18°C"
---

## Postęp budowy

**Aktualny etap:** Ściany zewnętrzne - kondygnacja 3

**Obserwacje:**
- Montaż ściany zewnętrznej Typ A przebiega zgodnie ze specyfikacją
- Izolacja prawidłowo zamontowana ze strzałkowaniem styków
- Łączniki mechaniczne zamontowane zgodnie ze specyfikacją

**Zidentyfikowane problemy:**
- Opóźnienie dostawy okien Typ A
- Proponowana alternatywa: Okno Typ B (równoważne parametry)
- Decyzja: Zatwierdzono pod warunkiem potwierdzenia przez klienta

**Następna wizyta:** 2026-05-17
```

---

### 2. Protokoły z narad
**Cel:** Dokumentowanie decyzji z narad koordynacyjnych

```yaml
---
documentType: "meeting_minutes"
projectPhase: "construction"
meetingNumber: 8
meetingDate: "2026-05-05"
meetingType: "coordination"
attendees:
  - name: "Imię Architekta"
    role: "Nadzór autorski"
  - name: "Imię Inżyniera"
    role: "Nadzór konstrukcyjny"
  - name: "Imię Wykonawcy"
    role: "Generalny wykonawca"
---

## Punkty agendy

### 1. Przegląd postępów
- Fundamenty ukończone
- Konstrukcja nośna na kondygnacji 3
- Harmonogram: Zgodny z planem

### 2. Zatwierdzenia materiałowe
- Zatwierdzone: Izolacja XPS - Styrodur 3035 CS
- Oczekujące: Próbki okien do badań

### 3. RFI
- RFI-005: Konflikt wymiarów klatki schodowej - ROZWIĄZANY
- RFI-006: Detal balustrady balkonu - OCZEKUJE na odpowiedź architekta

### Punkty do realizacji
- [ ] Architekt odpowiada na RFI-006 do 2026-05-08
- [ ] Wykonawca dostarcza próbki okien do 2026-05-12
```

---

### 3. Odpowiedzi na RFI (Zapytania o informację)
**Cel:** Odpowiadanie na pytania wykonawcy dotyczące budowy

```yaml
---
documentType: "rfi_response"
rfiNumber: "RFI-006"
dateReceived: "2026-05-03"
dateResponded: "2026-05-07"
subject: "Balustrada balkonu - Szkło vs Metal"
status: "closed"
---

## Pytanie od wykonawcy

"Rysunek A-301 pokazuje balustradę szklaną dla balkonów. Lokalny dostawca
nie może dostarczyć szkła o wymaganej grubości (12mm hartowane).
Alternatywne opcje:
- Opcja A: Szkło hartowane 10mm + dodatkowe słupki
- Opcja B: Balustrada metalowa zgodna z wymaganiami normy

Proszę o decyzję."

## Odpowiedź architekta

**Decyzja:** Opcja A - Szkło hartowane 10mm z dodatkowymi słupkami

**Uzasadnienie:**
- Zachowuje zamierzenie projektowe (przezroczysta balustrada)
- Spełnia wymagania bezpieczeństwa z dodatkowymi słupkami
- Opcja B znacząco zmieniłaby wygląd wizualny

**Wymagania:**
- Zastosować szkło hartowane bezpieczne 10mm (EN 12150)
- Dodać słupek pośredni co 800mm (zamiast 1200mm)
- Przedstawić poprawione rysunki warsztatowe do zatwierdzenia

**Zatwierdzone przez:** [Imię architekta i numer uprawnień]
**Data:** 2026-05-07
```

Szablon odpowiedzi na RFI (planowane)

---

### 4. Zmiany projektowe
**Cel:** Dokumentowanie zmian w stosunku do pierwotnego projektu

```yaml
---
documentType: "change_order"
changeNumber: "CO-001"
dateIssued: "2026-05-15"
status: "approved"
initiatedBy: "contractor"
reason: "unforeseen_conditions"
projectPhase: "construction"

impact:
  cost: "+5 000 EUR"
  schedule: "+3 dni"
  regulatory: "brak wpływu"
---

## Opis zmiany

**Pierwotny projekt:**
Fundament Typ A - ławy fundamentowe na głębokości 1,2m

**Zmieniono na:**
Fundament Typ B - ławy fundamentowe na głębokości 1,8m z dodatkowym zbrojeniem

**Przyczyna:**
Poziom wód gruntowych wyższy niż wskazano w dokumentacji geotechnicznej.
Wymaga głębszych fundamentów i membrany hydroizolacyjnej.

## Analiza wpływu

**Wpływ na koszt:** +5 000 EUR
- Dodatkowe wykopy: 1 500 EUR
- Dodatkowy beton: 2 000 EUR
- Membrana hydroizolacyjna: 1 500 EUR

**Wpływ na harmonogram:** +3 dni
- Dodatkowy czas na wykopy: 2 dni
- Dojrzewanie betonu: 1 dzień

**Wpływ regulacyjny:** Brak
- Zaktualizowany projekt fundamentów sprawdzony przez konstruktora
- Spełnia wszystkie wymagania przepisów budowlanych

## Zatwierdzenia
- [x] Zatwierdzenie architekta
- [x] Zatwierdzenie konstruktora
- [x] Zatwierdzenie klienta (wzrost kosztów)
- [x] Powiadomienie organu nadzoru budowlanego (jeśli wymagane)
```

Szablon zmiany projektowej (planowane)

---

### 5. Protokoły odbioru etapów
**Cel:** Dokumentowanie ukończenia etapów budowy

```yaml
---
documentType: "stage_completion_protocol"
projectPhase: "construction"
stage: "structural_frame"
completionDate: "2026-06-01"
---

## Etap: Konstrukcja nośna

**Zakres:**
- Fundamenty ukończone
- Słupy i belki konstrukcyjne zamontowane (wszystkie kondygnacje)
- Płyty stropowe zabetonowane (wszystkie poziomy)
- Konstrukcja dachu ukończona

**Przeprowadzone inspekcje:**
- [x] Badania wytrzymałości betonu - wszystkie pozytywne
- [x] Inspekcja zbrojenia - zatwierdzona
- [x] Pomiar kontrolny wymiarów - w granicach tolerancji
- [x] Zatwierdzenie konstruktora

**Kontrola jakości:**
- Beton: C30/37 - wyniki badań zgodne
- Zbrojenie: Zgodne z rysunkami konstrukcyjnymi
- Dokładność wymiarowa: ±15mm (dopuszczalna)

**Usterki/Lista poprawek:**
- Brak zidentyfikowanych

**Status:** ZATWIERDZONY do następnego etapu

**Podpisano:**
- Architekt: [Imię, Data]
- Konstruktor: [Imię, Data]
- Wykonawca: [Imię, Data]
```

Szablon protokołu odbioru (planowane)

---

## Aktualizacje BIM podczas budowy

### Aktualizacja modelu BIM przy zmianach:

Gdy podczas budowy zachodzą zmiany, zaktualizuj model BIM:

```yaml
# Najpierw udokumentuj zmianę w markdown
---
documentType: "change_order"
changeNumber: "CO-003"
elementAffected: "ExternalWall_TypeA"
change: "Grubość izolacji XPS zwiększona ze 150mm do 200mm"
---

# Następnie zaktualizuj model BIM
# Zaktualizuj ścianę Typ A w Revit/ArchiCAD
# Wyeksportuj zaktualizowany IFC

# Zsynchronizuj zmiany ze specyfikacjami markdown
python ../bim-sync/markdown-to-ifc.py \
  --update specifications/external-wall-type-a.md

# Zatwierdź zmiany
git add .
git commit -m "CO-003: External wall insulation increased to 200mm"
```

**Utrzymuj model BIM na bieżąco** - stanowi on podstawę dokumentacji powykonawczej (Faza 7)

---

## Przepływ pracy Git

```bash
# Utwórz folder budowy
mkdir 06-construction
cd 06-construction

# Utwórz strukturę podfolderów
mkdir diary
mkdir meetings
mkdir rfis
mkdir changes
mkdir protocols

# Dodawaj dokumenty w miarę postępu budowy
touch diary/visit-001-2026-04-15.md
touch meetings/meeting-001-2026-04-10.md
touch rfis/rfi-001.md
touch changes/co-001.md

# Zatwierdzaj regularnie (zalecane co tydzień)
git add diary/visit-001-2026-04-15.md
git commit -m "Site visit #1 - foundation excavation"

git add changes/co-001.md
git commit -m "Change Order CO-001 - deeper foundations"

# Śledź postęp
git log --oneline 06-construction/
```

---

## Przepisy podczas budowy

### Wymagania Prawa budowlanego

**Dziennik budowy:**
- Wymagany dla wszystkich inwestycji budowlanych
- Musi być przechowywany na budowie
- Wszystkie inspekcje rejestrowane
- Kontrole organu nadzoru udokumentowane

**Nadzór autorski:**
- Architekt musi nadzorować budowę
- Zapewnienie zgodności z zatwierdzonym projektem
- Dokumentowanie wszystkich zmian
- Podpisywanie protokołów odbioru etapów

**Kontrole inspektora nadzoru budowlanego:**
- Dokumentowanie wszystkich oficjalnych inspekcji
- Rozwiązywanie wszelkich niezgodności
- Uzyskiwanie wymaganych zatwierdzeń dla etapów

[Dowiedz się o Prawie budowlanym →](/pl/przepisy/prawo-budowlane)

---

## Karty SBM w tej fazie

[Semantyczny Model Budynku (SBM)](/pl/dokumentacja/przeglad) jest aktualizowany w trakcie budowy w miarę dokumentowania rzeczywistych warunków. Karty ewoluują od specyfikacji projektowych do odzwierciedlenia faktycznie zamontowanych elementów i urządzeń.

### Aktualizacja Kart Instancji Zasobu
W miarę montażu urządzeń na budowie, Karty Instancji Zasobu uzupełnia się o numery seryjne, daty montażu i dane z uruchomienia. Dzięki temu każde urządzenie ma kompletną historię od zamówienia do odbioru.

[Dowiedz się o Kartach Instancji Zasobu →](/pl/dokumentacja/encje/instancja-zasobu)

### Śledzenie Kart Przestrzeni
Karty Przestrzeni zaczynają śledzić pomiary powykonawcze w miarę postępu budowy. Rejestrowane są rzeczywiste wymiary, wykończenia i warunki panujące w pomieszczeniach.

### Aktualizacja Kart Systemów
Karty Systemów uzupełnia się o rzeczywiste trasy instalacji, połączenia i zweryfikowaną wydajność. Zmiany terenowe (np. zmiana trasy kanałów, zmiana średnicy rur) są na bieżąco odnotowywane.

[Dowiedz się o Kartach Systemów →](/pl/dokumentacja/encje/system)

### Przykład: Instancja Zasobu zaktualizowana danymi z montażu

```yaml
entity: asset_instance
id: asset-boiler-01
name: "Centralny Kocioł Gazowy"
system: system-heating-central
location: space-technical-room-01

manufacturer:
  name: "Viessmann"
  model: "Vitodens 200-W"
  productCode: "B2HF-120"

installation:
  serialNumber: "7846231-2026-PL"
  installationDate: "2026-05-15"
  installedBy: "HVAC Service Sp. z o.o."
  commissioningDate: "2026-05-18"
  commissioningReport: "commissioning-boiler-01-20260518.pdf"

commissioning:
  flowTemperatureVerified: "79.5°C"
  returnTemperatureVerified: "59.8°C"
  efficiencyMeasured: "97.5%"
  gasLeakTest: "PASS"
  safetyValveTest: "PASS"
  status: "operational"
```

[Zobacz dokumentację kart SBM →](/pl/dokumentacja/encje/)
[Zobacz przewodnik tworzenia SBM →](/pl/dokumentacja/tworzenie/)

---

## Kontrola projektu w tej fazie

### Przegląd rysunków warsztatowych
Sprawdzaj rysunki warsztatowe wykonawcy pod kątem zgodności z projektem.
- [Procedury przeglądów →](/pl/jakosc/procedury-przegladow)

### Protokoły niezgodności
Śledź odstępstwa od projektu. Oceń czy zmiana jest istotna (wymaga zmiany pozwolenia) czy nieistotna.
- [Zarządzanie zmianami →](/pl/zarzadzanie-projektem/zarzadzanie-zmianami)

### Formalności budowlane
Upewnij się że kierownik budowy jest powołany, dziennik budowy prowadzony, wszystkie zawiadomienia złożone.
- [Formalności budowlane →](/pl/przepisy/formalnosci-budowlane)

### Kontrola zmian na budowie
Wszystkie zmiany na budowie muszą być dokumentowane. Aktualizuj wersję dokumentacji i model BIM.
- [Zarządzanie zmianami →](/pl/zarzadzanie-projektem/zarzadzanie-zmianami)
- [Zarządzanie ryzykiem →](/pl/zarzadzanie-projektem/zarzadzanie-ryzykiem)

---

## Następne kroki

Po ukończeniu budowy:

**Kontynuuj do Fazy 7:**
[→ Dokumentacja Powykonawcza (LOD 500)](/pl/fazy/powykonawcza)

**Lub wróć:**
[← Faza 5: Projekt Wykonawczy](/pl/fazy/wykonawczy)

**Zobacz kompletny przepływ pracy:**
[Zobacz wszystkie fazy →](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Podczas fazy budowy:

- [ ] Wizytacje na budowie przeprowadzane regularnie
- [ ] Dziennik budowy prowadzony na bieżąco
- [ ] Wszystkie RFI rozpatrzone terminowo
- [ ] Wszystkie zmiany udokumentowane w postaci zmian projektowych
- [ ] Model BIM zaktualizowany o wszystkie zmiany
- [ ] Wszystkie inspekcje etapowe przeprowadzone
- [ ] Protokoły odbioru wydane
- [ ] Wszystkie dokumenty regularnie zatwierdzane w Git
- [ ] Gotowość do rozpoczęcia dokumentacji powykonawczej po zakończeniu budowy
