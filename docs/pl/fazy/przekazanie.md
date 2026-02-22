# Faza 8: Przekazanie i Konserwacja

::: tip Przegląd Fazy
**Co robisz:** Przekazujesz budynek klientowi/właścicielowi, dostarczasz instrukcje obsługi, ustalasz plany konserwacji
**BIM LOD:** LOD 500 (dla Zarządzania Obiektem)
**Czas trwania:** 1-2 tygodnie
**Dokumenty:** Instrukcja OOM (Obsługi i Konserwacji), plan konserwacji, gwarancje, model BIM do zarządzania obiektem, szkolenie
:::

::: success Faza końcowa
To jest ostatnia faza przepływu pracy architekta. Po przekazaniu budynek wchodzi w fazę eksploatacji i konserwacji z okresowymi przeglądami.
:::

---

## Co dzieje się w tej fazie

Przekazanie i Konserwacja to etap, w którym:
1. Przygotowujesz kompleksową instrukcję obsługi budynku (Instrukcja OOM)
2. Tworzysz plan konserwacji z harmonogramem przeglądów
3. Kompletujesz wszystkie gwarancje i poręczenia
4. Przygotowujesz model BIM do zarządzania obiektem
5. Dostarczasz dane kontaktowe dostawców
6. Szkolisz operatorów budynku/zarządców obiektu
7. Ustalasz harmonogram okresowych przeglądów

**Ta dokumentacja umożliwia:**
- Prawidłową eksploatację budynku
- Konserwację zapobiegawczą
- Efektywność energetyczną
- Długą żywotność budynku
- Planowanie przyszłych remontów

---

## Dokumenty do stworzenia

### 1. Instrukcja Obsługi i Konserwacji Budynku (OOM)
**Cel:** Kompleksowy przewodnik dla operatorów budynku

**Struktura YAML:**
```yaml
---
documentType: "building_manual"
purpose: "operation_maintenance"
projectPhase: "handover"
buildingInfo:
  name: "Budynek Zielona Tarasa"
  address: "ul. Przykładowa 10, Warszawa"
  completionDate: "2026-06-01"
  certificateOfOccupancy: "CO/2026/1234"
  totalArea: "1 800 m²"
  buildingUse: "Mieszkalny (18 mieszkań)"
owner:
  name: "Imię Właściciela"
  contact: "+48 XX XXX XXXX"
facilityManager:
  name: "Firma Zarządzająca"
  contact: "+48 XX XXX XXXX"
version: "1.0.0"
---

# Instrukcja Obsługi i Konserwacji Budynku

## 1. Charakterystyka budynku

**Opis budynku:**
6-kondygnacyjny budynek mieszkalny z 18 mieszkaniami, parkingiem podziemnym
i tarasem na dachu. Konstrukcja żelbetowa z energooszczędną
obudową.

**Podstawowe dane budynku:**
- Powierzchnia całkowita: 1 800 m²
- Ogrzewanie: Centralna kotłownia gazowa
- Wentylacja: Naturalna + mechaniczna w pomieszczeniach mokrych
- Ciepła woda: Centralna kotłownia gazowa
- Elektryczność: Przyłącze 3x63A

## 2. Instalacje budynku

### 2.1 Konstrukcja nośna
- Żelbetowy układ szkieletowy
- Nie wymaga specjalnej konserwacji
- Okresowy przegląd: Co 5 lat

### 2.2 Obudowa budynku
- Ściany zewnętrzne: System z bloczków betonowych z izolacją
- Okna: PCV trójszybowe
- Dach: Dach płaski z hydroizolacją membranową
- **Konserwacja:** Patrz rozdział 3.1

### 2.3 Instalacja grzewcza
- Typ: Centralna kotłownia gazowa, grzejniki
- Kocioł: [Producent, Model, Nr seryjny]
- Moc: 120 kW
- **Konserwacja:** Wymagany coroczny serwis
- **Serwisant:** [Nazwa firmy, kontakt]

### 2.4 Wentylacja
- Wentylacja naturalna przez okna
- Mechaniczny wyciąg w łazienkach i kuchniach
- **Konserwacja:** Czyszczenie filtrów co kwartał

### 2.5 Instalacja elektryczna
- Główna rozdzielnia: Kondygnacja 0
- Podrozdzielnie: Każda kondygnacja
- Oświetlenie awaryjne: Zasilanie bateryjne
- **Konserwacja:** Coroczna inspekcja

## 3. Procedury konserwacji

### 3.1 Konserwacja dachu
**Częstotliwość:** Co 6 miesięcy

**Lista kontrolna przeglądu:**
- [ ] Sprawdzenie membrany hydroizolacyjnej pod kątem uszkodzeń
- [ ] Oczyszczenie odpływów i rynien
- [ ] Inspekcja przejść dachowych (wentylatory, rury)
- [ ] Sprawdzenie dylatacji
- [ ] Inspekcja obróbek attyk
- [ ] Udokumentowanie uszkodzeń zdjęciami

**Ważne:** Dach musi być sprawdzony po większych burzach

### 3.2 Konserwacja elewacji
**Częstotliwość:** Co roku

**Lista kontrolna przeglądu:**
- [ ] Sprawdzenie tynku pod kątem pęknięć
- [ ] Inspekcja uszczelek okiennych
- [ ] Sprawdzenie hydroizolacji balkonów
- [ ] Inspekcja balustrad balkonowych pod kątem korozji
- [ ] Czyszczenie okien i ram

### 3.3 Konserwacja instalacji MEP
**Patrz szczegółowe harmonogramy w Rozdziale 4**

## 4. Harmonogramy przeglądów

**Przeglądy roczne:**
- Serwis instalacji grzewczej
- Inspekcja instalacji elektrycznej
- Sprzęt przeciwpożarowy
- Inspekcja windy
- Inspekcja elewacji

**Przeglądy 5-letnie:**
- Przegląd konstrukcyjny
- Inspekcja membrany dachowej
- Termowizja obudowy budynku

## 5. Procedury awaryjne

### 5.1 Wyciek wody
1. Zlokalizować i zamknąć zawór odcinający wodę (Kondygnacja 0, Pomieszczenie 01)
2. Kontakt z hydraulikiem: [Kontakt awaryjny]
3. Udokumentować szkody zdjęciami
4. Powiadomić właściciela budynku

### 5.2 Awaria ogrzewania
1. Sprawdzić kod błędu kotła
2. Kontakt z serwisem grzewczym: [Kontakt awaryjny]
3. Jeśli zima, zorganizować ogrzewanie tymczasowe

### 5.3 Awaria elektryczna
1. Sprawdzić główne wyłączniki (Kondygnacja 0)
2. Jeśli awaria zasilania głównego, kontakt: [Zakład energetyczny]
3. Elektryk awaryjny: [Kontakt]

## 6. Dane kontaktowe

**Służby ratunkowe:**
- Straż pożarna: 998
- Policja: 997
- Pogotowie: 999

**Serwis budynku:**
- Serwis grzewczy: [Firma, telefon]
- Serwis elektryczny: [Firma, telefon]
- Serwis hydrauliczny: [Firma, telefon]
- Serwis windy: [Firma, telefon]

**Dostawcy:**
- Producent okien: [Firma, telefon]
- Membrana dachowa: [Firma, telefon]
- Producent kotła: [Firma, telefon]

## 7. Gwarancje

**Patrz osobny folder dokumentacji gwarancyjnej**

- Konstrukcja: 10 lat (wygasa 2036-06-01)
- Hydroizolacja dachu: 5 lat (wygasa 2031-06-01)
- Okna: 5 lat (wygasa 2031-06-01)
- Kocioł grzewczy: 2 lata (wygasa 2028-06-01)
- Winda: 2 lata (wygasa 2028-06-01)
```

Szablon instrukcji OOM (planowane)

---

### 2. Plan konserwacji
**Cel:** Szczegółowy harmonogram wszystkich czynności konserwacyjnych

```yaml
---
documentType: "maintenance_plan"
projectPhase: "handover"
buildingName: "Budynek Zielona Tarasa"
version: "1.0.0"
---

# Plan konserwacji

## Zadania miesięczne

**Instalacja grzewcza (w sezonie grzewczym):**
- Sprawdzenie ciśnienia w kotle
- Weryfikacja prawidłowej pracy
- Sprawdzenie szczelności

**Winda:**
- Inspekcja wizualna
- Zgłaszanie nietypowych dźwięków

**Części wspólne:**
- Sprzątanie wszystkich części wspólnych
- Sprawdzenie oświetlenia
- Inspekcja drzwi wejściowych

## Zadania kwartalne

**Wentylacja:**
- Czyszczenie/wymiana filtrów wentylacji mechanicznej
- Sprawdzenie pracy wentylatorów

**Bezpieczeństwo pożarowe:**
- Test systemu alarmowego
- Sprawdzenie ciśnienia gaśnic
- Inspekcja oświetlenia awaryjnego

## Zadania półroczne (co 6 miesięcy)

**Dach:**
- Kompletna inspekcja dachu (patrz instrukcja OOM)
- Czyszczenie rynien i odpływów
- Sprawdzenie szczelności hydroizolacji

**Odwodnienie:**
- Czyszczenie odpływów deszczowych
- Sprawdzenie drożności

## Zadania roczne

**Instalacja grzewcza:**
- Profesjonalny serwis przez certyfikowanego technika
- Test sprawności kotła
- Inspekcja bezpieczeństwa
- Czyszczenie i konserwacja

**Instalacja elektryczna:**
- Inspekcja przez certyfikowanego elektryka
- Test wyłączników różnicowo-prądowych (RCD)
- Inspekcja rozdzielnicy głównej
- Test oświetlenia awaryjnego

**Elewacja:**
- Kompletna inspekcja elewacji
- Sprawdzenie stanu tynku
- Inspekcja uszczelek okiennych
- Sprawdzenie stanu balkonów

**Winda:**
- Roczna inspekcja bezpieczeństwa (wymagana prawem)
- Konserwacja przez certyfikowanego technika

## Zadania 5-letnie

**Konstrukcja:**
- Przegląd konstrukcyjny przez inżyniera
- Sprawdzenie pod kątem pęknięć lub osiadania
- Inspekcja elementów nośnych

**Dach:**
- Profesjonalna inspekcja dachu
- Ocena stanu membrany hydroizolacyjnej
- Rozważenie odnowienia powłoki

**Obudowa budynku:**
- Inspekcja termowizyjna
- Sprawdzenie parametrów izolacji
- Identyfikacja ewentualnych mostków termicznych

**Elewacja:**
- Szczegółowa inspekcja elewacji
- Rozważenie czyszczenia/malowania

## Zadania 10-letnie

**Przegląd głównych instalacji:**
- Ocena stanu instalacji grzewczej pod kątem wymiany
- Ocena stanu okien
- Planowanie wymiany membrany dachowej

**Przegląd efektywności budynku:**
- Analiza zużycia energii
- Rozważenie modernizacji energetycznej
```

[Szablon Karty Zasobu →](/pl/szablony/szablon-zasobu) *(zawiera harmonogramy konserwacji)*

---

### 3. Dokumentacja gwarancyjna
**Cel:** Zebranie wszystkich gwarancji w jednym miejscu

**Organizacja gwarancji:**
```
08-handover/
└── warranties/
    ├── structural-warranty.pdf (10 lat)
    ├── roof-waterproofing-warranty.pdf (5 lat)
    ├── windows-warranty.pdf (5 lat)
    ├── heating-boiler-warranty.pdf (2 lata)
    ├── elevator-warranty.pdf (2 lata)
    ├── insulation-manufacturer-warranty.pdf
    └── paint-warranty.pdf
```

**Rejestr gwarancji:**
```yaml
---
documentType: "warranty_tracker"
projectPhase: "handover"
---

# Rejestr gwarancji

| Pozycja | Producent | Okres gwarancji | Data wygaśnięcia | Kontakt |
|---------|-----------|-----------------|-------------------|---------|
| Konstrukcja | - | 10 lat | 2036-06-01 | Wykonawca |
| Membrana dachowa | BASF | 5 lat | 2031-06-01 | +48 XX XXX |
| Okna | WindowCo | 5 lat | 2031-06-01 | +48 XX XXX |
| Kocioł grzewczy | BoilerCo | 2 lata | 2028-06-01 | +48 XX XXX |
| Winda | ElevatorCo | 2 lata | 2028-06-01 | +48 XX XXX |
```

---

### 4. Kontakty dostawców i serwisantów
**Cel:** Szybki dostęp do danych kontaktowych wszystkich usługodawców

```markdown
# Lista kontaktów dostawców i serwisantów

## Producenci

**Okna - WindowCo Poland**
- Kontakt: Jan Kowalski
- Telefon: +48 22 XXX XXXX
- Email: service@windowco.pl
- Produkt: Okna PCV, trójszybowe
- Gwarancja: 5 lat

**Membrana dachowa - BASF Polska**
- Kontakt: Anna Nowak
- Telefon: +48 22 XXX XXXX
- Email: technical@basf.pl
- Produkt: Membrana hydroizolacyjna
- Gwarancja: 5 lat

**Kocioł - BoilerCo**
- Kontakt: Pomoc techniczna
- Telefon: +48 22 XXX XXXX
- Email: support@boilerco.pl
- Produkt: Kocioł gazowy 120kW
- Gwarancja: 2 lata

## Serwisanci

**Serwis instalacji grzewczej**
- Firma: HVAC Service Sp. z o.o.
- Telefon: +48 XXX XXX XXX (24/7)
- Email: emergency@hvacservice.pl
- Umowa: Roczna konserwacja

**Serwis elektryczny**
- Firma: Electric Pro
- Telefon: +48 XXX XXX XXX (24/7)
- Email: service@electricpro.pl
- Uprawnienia: EEE/1234/2025

**Serwis windy**
- Firma: ElevatorCo Service
- Telefon: +48 XXX XXX XXX (24/7)
- Email: service@elevatorco.pl
- Umowa: Roczna inspekcja + konserwacja

**Serwis hydrauliczny**
- Firma: PlumbPro
- Telefon: +48 XXX XXX XXX (24/7)
- Email: emergency@plumbpro.pl
```

---

### 5. Model BIM do Zarządzania Obiektem
**Cel:** Dostarczenie modelu BIM do bieżącego zarządzania obiektem

**Przygotowanie modelu BIM gotowego do zarządzania:**
```yaml
---
documentType: "bim_for_fm"
bimLOD: "LOD_500"
purpose: "facility_management"
---

# Model BIM do Zarządzania Obiektem

**Plik modelu:** as-built-model-fm.ifc (IFC 4.0)

**Dodane właściwości do zarządzania:**

**Urządzenia:**
- Kocioł: Producent, model, numer seryjny, data montażu, wygaśnięcie gwarancji
- Winda: Producent, model, numer seryjny, data montażu, daty przeglądów
- Gaśnice: Lokalizacje, daty ważności

**Strefy konserwacji:**
- Zdefiniowane strefy dachowe
- Strefy konserwacji elewacji
- Strefy części wspólnych

**Informacje o dostępie:**
- Kody dostępu do pomieszczeń technicznych
- Lokalizacje kluczy
- Lokalizacje zaworów odcinających media

**Harmonogramy serwisowe:**
- Powiązane z planem konserwacji
- Terminy przeglądów

**Użycie:**
Zaimportuj model IFC do oprogramowania do zarządzania obiektem (np. Autodesk BIM 360, Archibus, Spacewell)
do bieżącego zarządzania.
```

---

## Szkolenie i spotkanie przekazujące

### Szkolenie zarządcy obiektu
**Cel:** Przeszkolenie operatorów budynku w zakresie systemów i konserwacji

**Agenda szkolenia:**
1. **Obchód budynku** - Pokazanie wszystkich pomieszczeń technicznych, zaworów odcinających
2. **Obsługa instalacji** - Demonstracja kotła, sterowania wentylacją
3. **Przegląd instrukcji OOM** - Omówienie kluczowych rozdziałów
4. **Procedury awaryjne** - Ćwiczenie wyłączeń awaryjnych
5. **Przegląd harmonogramu konserwacji** - Wyjaśnienie zadań okresowych
6. **Demonstracja modelu BIM** - Pokazanie obsługi modelu do zarządzania (jeśli dotyczy)
7. **Sesja pytań i odpowiedzi**

**Dokumentacja szkolenia:**
```yaml
---
documentType: "training_record"
trainingDate: "2026-06-25"
attendees:
  - "Imię Zarządcy Obiektu"
  - "Właściciel Budynku"
  - "Architekt (szkolący)"
topics:
  - "Przegląd instalacji budynku"
  - "Przegląd instrukcji OOM"
  - "Procedury awaryjne"
  - "Harmonogramy konserwacji"
  - "Informacje gwarancyjne"
completionStatus: "complete"
---
```

---

## Przepływ pracy Git

```bash
# Utwórz folder przekazania
mkdir 08-handover
cd 08-handover

# Utwórz dokumenty
touch om-manual.md
touch maintenance-plan.md
touch supplier-contacts.md
touch warranty-tracker.md
touch training-record.md

# Utwórz folder gwarancji
mkdir warranties
# Dodaj wszystkie PDF-y gwarancyjne

# Dodaj model BIM do zarządzania
mkdir bim
cp ../07-as-built/bim/as-built-model.ifc bim/as-built-model-fm.ifc

# Zatwierdź dokumentację przekazania
git add .
git commit -m "Handover documentation complete - O&M manual and maintenance plan"
git tag handover-v1.0

# Końcowe zatwierdzenie projektu
cd ..
git commit -m "Project complete - all phases documented"
git tag project-complete-v1.0
```

---

## Przykładowy Projekt

**Budynek Zielony Taras - Przekazanie**
- [Projekt Zielony Taras →](/pl/przyklady/zielony-taras/)
- [Projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

[Semantyczny Model Budynku (SBM)](/pl/dokumentacja/przeglad) dostarcza pełną wartość w fazie Przekazania. Kompilator SBM tworzy ustrukturyzowane wyjścia, które integrują się bezpośrednio z systemami zarządzania obiektem, platformami BMS i archiwami regulacyjnymi.

### Kompletny Rejestr Zasobów
Kompilator generuje `asset_register.json` zawierający każdą Kartę Instancji Zasobu z danymi producenta, numerami seryjnymi, datami gwarancji i harmonogramami konserwacji. Ten plik importuje się bezpośrednio do platform CMMS.

[Dowiedz się o Kartach Instancji Zasobu →](/pl/dokumentacja/encje/instancja-zasobu)

### Wygenerowany Schemat Cyfrowego Bliźniaka
Kompilator tworzy `twin_schema.json` z powiązaniami czujników i punktami integracji BMS (System Zarządzania Budynkiem), umożliwiając monitorowanie systemów budynku w czasie rzeczywistym.

### Pełna Weryfikacja Zgodności
Wyjście `compliance_report.json` pokazuje pełny status weryfikacji dla każdej Karty Wymagania, z linkami do raportów z badań i certyfikatów.

### Cele kompilacji dla Przekazania

Kompilator SBM tworzy cztery kluczowe wyjścia wspierające różne potrzeby przekazania:

| Plik wyjściowy | Cel | Odbiorca |
|---|---|---|
| `bim_mapping.json` | Parametry współdzielone Revit, mapowania właściwości IFC | Zespół FM ładuje do narzędzi BIM |
| `compliance_report.json` | Weryfikacja wymagań ze zmierzonymi wartościami | Dokumentacja regulacyjna |
| `asset_register.json` | Kompletny rejestr urządzeń z danymi konserwacji | Import CMMS (Maximo, SAP PM) |
| `twin_schema.json` | Powiązania czujników, punkty integracji BMS | Konfiguracja BMS, cyfrowy bliźniak |

[Dowiedz się o kompilatorze SBM →](/pl/dokumentacja/kompilator/)

### Przykład: Polecenie kompilacji

```yaml
# Kompilacja wszystkich kart SBM do przekazania
sbm compile \
  --source ./entities/ \
  --target bim_mapping \
  --target compliance_report \
  --target asset_register \
  --target twin_schema \
  --output ./08-handover/compiled/ \
  --format json \
  --verify true

# Pliki wyjściowe:
# ./08-handover/compiled/bim_mapping.json
# ./08-handover/compiled/compliance_report.json
# ./08-handover/compiled/asset_register.json
# ./08-handover/compiled/twin_schema.json
```

[Zobacz dokumentację kart SBM →](/pl/dokumentacja/encje/)
[Zobacz przewodnik tworzenia SBM →](/pl/dokumentacja/tworzenie/)

---

## Po przekazaniu

### Przeglądy okresowe
**Zalecany harmonogram:**
- **Przegląd roczny:** Sprawdzenie wszystkich instalacji, usunięcie usterek
- **Przegląd 5-letni:** Główny przegląd instalacji, aktualizacja planu konserwacji
- **Przegląd 10-letni:** Planowanie generalnego remontu

### Monitoring efektywności budynku
- Śledzenie zużycia energii
- Monitorowanie kosztów konserwacji
- Porównanie efektywności budynku z projektem

### Przyszłe remonty
- Cała dokumentacja powykonawcza (model BIM LOD 500) służy jako podstawa
- Powrót do odpowiedniej fazy w zależności od zakresu remontu

---

## Kontrola projektu w tej fazie

### Procedury odbioru
Zawiadomienie o zakończeniu budowy lub pozwolenie na użytkowanie.
- [Odbiory i użytkowanie →](/pl/przepisy/odbiory-uzytkowanie)
- [Opłaty administracyjne →](/pl/przepisy/oplaty)

### Ewaluacja poużytkownikowa
Zaplanuj POE na 3-6 miesięcy po przekazaniu.
- [Eksploatacja budynku →](/pl/eksploatacja/)
- [Czujniki i IoT →](/pl/integracja-bim/czujniki-iot)

### Książka obiektu budowlanego
Przygotuj książkę obiektu z harmonogramami konserwacji.
- [Planowanie konserwacji →](/pl/eksploatacja/konserwacja)

### Bramka przekazania
Ostatnia bramka jakości.
- [Bramki fazowe →](/pl/jakosc/bramki-fazowe)

---

## Kompletny przepływ pracy

**Gratulacje! Ukończono wszystkie 8 faz przepływu pracy architekta.**

**Przejrzyj kompletny przepływ pracy:**
[← Zobacz wszystkie fazy od początku do końca](/pl/standardy/struktura-dokumentu)

**Rozpocznij nowy projekt:**
[→ Zacznij od Fazy 1: Rozpoczęcie Projektu](/pl/fazy/rozpoczecie)

**Materiały referencyjne:**
- [Przepisy →](/pl/przepisy/)
- [Integracja BIM →](/pl/integracja-bim/)
- [Szablony →](/pl/szablony/)
- [Przykłady →](/pl/przyklady/)

---

## Lista kontrolna końcowa

Przed zakończeniem projektu:

- [ ] Instrukcja OOM ukończona i przekazana klientowi
- [ ] Plan konserwacji ze wszystkimi harmonogramami ukończony
- [ ] Wszystkie gwarancje zebrane i uporządkowane
- [ ] Lista kontaktów dostawców dostarczona
- [ ] Model BIM do zarządzania obiektem przygotowany (LOD 500)
- [ ] Szkolenie zarządcy obiektu przeprowadzone
- [ ] Protokół szkolenia udokumentowany
- [ ] Pozwolenie na użytkowanie uzyskane
- [ ] Końcowa płatność od klienta otrzymana
- [ ] Cała dokumentacja zatwierdzona w Git
- [ ] Projekt zarchiwizowany do przyszłego wykorzystania
- [ ] Roczny przegląd zaplanowany w kalendarzu

**Projekt ukończony!**
