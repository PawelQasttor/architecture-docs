# Semantic Building Model (SBM):

# Strukturalny Język Opisu Budynku

## jako fundament danych dla platform projektowych nowej generacji

---

Czytajac wizje platformy SmartHUB, od razu widac, ze jej serce stanowi jedno wielkie,
nierozwiazane dotad pytanie: **w jakim formacie opisac budynek tak, zeby kazdy modul platformy
mogl te dane odczytac, przetworzyc i na nich pracowac?**

Wizualizacje potrzebuja bryl i materialow. Modul prawny potrzebuje stref pozarowych i wysokosci
pomieszczen. Wykonawca potrzebuje specyfikacji przegrod i harmonogramu. Zarzadca obiektu
potrzebuje rejestru urzadzen z datami przegladow. Kazdy z tych modulow czyta **te same dane
o tym samym budynku** -- ale dzis te dane sa rozsiane po CAD-ach, Excelach, PDF-ach, mailach
i katalogach na dysku.

Wlasnie dlatego tworzymy **Semantic Building Model (SBM)** -- otwarty standard opisu budynku,
ktory jest tym "wspolnym jezykiem" miedzy wszystkimi modulami, branzystamiinwestorami.

---

## Czym jest SBM w 30 sekund

SBM to sposob na zapisanie **wszystkich informacji o budynku** w prostych plikach tekstowych,
ktore jednoczesnie:

1. **Czlowiek moze przeczytac** -- wyglada jak dokument z tabelami i opisami
2. **Komputer moze przetworzyc** -- dane sa ustrukturyzowane, walidowane, polaczone referencjami
3. **Kazdy branzysta edytuje w tym samym formacie** -- architekt, konstruktor, instalator, inspektor

Jeden plik na pomieszczenie. Jeden plik na strefe pozarowa. Jeden plik na kociol.
Pliki lacza sie miedzy soba referencjami -- sypialnia mowi "naleze do strefy pozarowej ZL-IV",
a system automatycznie wie, ze strefa ZL-IV zawiera te sypialniew.

---

## Jak to sie ma do SmartHUB?

SmartHUB to **platforma** -- interfejs, narzedziaa wizualizacje, AI, komunikacja, podpisy.
SBM to **standard danych** -- wspolny jezyk, ktorym ta platforma by "mowila" o budynku.

Wyobrazmy sobie to tak:

| SmartHUB | SBM |
|----------|-----|
| Samochod (kierownica, fotele, klimatyzacja, silnik) | Mapa drogowa + przepisy ruchu drogowego |
| Platforma (UI, moduly, AI, wizualizacje) | Standard danych (co opisujemy, jak, w jakim formacie) |

Bez mapy i przepisow samochod moze jezdzic, ale nie wie **dokad** i **jak bezpiecznie**.
Bez standardu danych platforma moze wyswietlac okna i przyciski, ale nie wie **co znaczy
"sypialnia"**, **jak policzyc koszt budynku**, ani **czy wysokosc spelnia normy WT 2021**.

---

## Co SBM juz dzis opisuje -- i co z tego wynika dla SmartHUB

### 1. Dzialka i otoczenie

**Wizja SmartHUB:** *Wskazujemy na mapie dzialki, platforma pobiera uwarunkowania prawne,
MPZP, tereny zalewowe, konserwatorskie...*

**Co robi SBM:** Definiujemy encje **Site** (dzialka) z polami takimi jak:
- `siteArea` -- powierzchnia dzialki
- `buildableArea` -- powierzchnia zabudowy
- `greenArea` -- powierzchnia biologicznie czynna
- `siteConstraints` -- ograniczenia (strefy ochronne, tereny gornicze, zalewowe)
- `utilities` -- dostepne media (woda, gaz, pradu kanalizacja)
- `topography` -- uksztaltowanie terenu
- `zoningDesignation` -- przeznaczenie w MPZP

**Co to daje SmartHUB:** Modul "uwarunkowania prawne" mialby gotowa strukture,
do ktorej wrzuca pobrane dane. Nie luzy tekst z PDF-a, ale **ustrukturyzowane pola**,
na ktorych AI moze pracowac -- np. porownac `buildableArea` z zaprojektowanym obrysem
i automatycznie sprawdzic, czy sie miescimy.

Ponadto SBM definiuje **Site Feature** (elementy zagospodarowania terenu) -- parking,
zielony dach, infrastrukture deszczowa, place zabaw. Kazdy z tych elementow ma swoj plik
z parametrami, kosztami, powiazaniem z dzialka.

---

### 2. Budynek, kondygnacje, pomieszczenia

**Wizja SmartHUB:** *Platforma proponuje uklad budynkow na dzialce, z podzialem na
kondygnacje i pomieszczenia, z zachowaniem przepisowych wymiarow...*

**Co robi SBM:** Hierarchia encji:

```
Site (dzialka)
  +-- Building (budynek)
       +-- Level (kondygnacja)
            +-- Space (pomieszczenie)
                 +-- naleze do Zone (strefa pozarowa, akustyczna, HVAC)
                 +-- mam Requirement (wymaganie: wysokosc >= 2.50m)
                 +-- zawiera Asset (grzejnik, czujnik dymu)
```

Kazdy **Space** (pomieszczenie) to osobny plik z danymi:

```yaml
---
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
designArea: 14.5
designHeight: 2.70
zoneIds: ["ZONE-FIRE-ZL-IV"]
requirements: ["REQ-PL-WT-ROOM-HEIGHT-001"]
---

# Sypialnia 01

Standardowa sypialnia, okno polnocne, strefa pozarowa ZL-IV.
Wysokosc sufitu 2.70m spelnia minimum WT 2021 (2.50m).
```

**Co to daje SmartHUB:** Kiedy AI platformy generuje uklad pomieszczen, wynikiem nie jest
obraz ani luzy model 3D -- jest to **zestaw plikow SBM** z konkretnymi wartosciami.
Kazde pomieszczenie ma ID, wymiary, przypisanie do strefy, wymagania. Mozna je zwalidowac
automatycznie, wyeksportowac do BIM, wygenerowac raport zgodnosci -- wszystko z tych samych danych.

---

### 3. Szablony i powtarzalnosc (wzorzec Typ/Instancja)

**Wizja SmartHUB:** *Wskazalabym strukture mieszkan oraz preferowane wielkosci...*

**Co robi SBM:** Wzorzec **Type/Instance** -- definiujesz specyfikacje raz w szablonie,
a potem tworzysz instancje, ktore dziedzicza wszystkie parametry:

**Space Type** (szablon -- 1 plik):
```yaml
id: "ST-BEDROOM-STANDARD"
typeName: "Sypialnia Standardowa"
requirements: ["REQ-HEIGHT-MIN-250", "REQ-DAYLIGHT-SLEEPING"]
finishes:
  floor: "Dab inzynieryjny"
  walls: "Farba biala"
occupancyProfile:
  maxOccupants: 2
```

**Space** (instancja -- 20 plikow, kazdy krotki):
```yaml
id: "SP-BLD-01-L01-001"
spaceName: "Sypialnia 01"
spaceTypeId: "ST-BEDROOM-STANDARD"   # <-- dziedziczy wszystko z szablonu
designArea: 14.5
levelId: "LVL-01"
```

**Efekt:** 20 sypialni = 1 szablon + 20 krotkich plikow. Zmiana w szablonie automatycznie
aktualizuje wszystkie 20 instancji. **26-33% mniej dokumentacji.**

Ten sam wzorzec dziala dla:
- **Zone Type** -- szablony stref pozarowych (ZL-IV, ZL-V...)
- **System Type** -- szablony systemow instalacyjnych (HVAC z rekuperacja...)
- **Asset Type** -- szablony urzadzen (model kotla, pompy ciepla...)
- **Opening Type** -- szablony okien i drzwi (Internorm KF410...)
- **Site Feature Type** -- szablony elementow terenu (nawierzchnia przepuszczalna...)

**Co to daje SmartHUB:** Kiedy w platformie uzytkownik mowi "chce 20 standardowych sypialni",
platforma tworzy 1 Type + 20 instancji. Zmiana specyfikacji w jednym miejscu propaguje sie
wszedzie. To fundament, na ktorym opiera sie "inteligentne" generowanie layoutow.

---

### 4. Przegrody budowlane i otwory

**Wizja SmartHUB:** *Moglibysmyy uszczegolawiac wynik, dodajac struktury scian,
zmieniajac wielkosci stolarki okiennej i drzwiowej...*

**Co robi SBM:**

**Envelope** (przegroda) -- sciana, dach, strop:
```yaml
id: "ENV-EW-01"
envelopeName: "Sciana zewnetrzna typ A"
envelopeType: "external_wall"
layers:
  - material: "Tynk silikonowy"
    thickness: 0.005
  - material: "Styropian grafitowy"
    thickness: 0.200
  - material: "Pustak ceramiczny"
    thickness: 0.250
thermalPerformance:
  uValue: 0.18
firePerformance:
  fireResistanceClass: "REI 60"
```

**Opening** (otwor -- okno, drzwi, swietlik):
```yaml
id: "OPN-N-001"
openingName: "Okno N-001"
openingTypeId: "OT-INTERNORM-KF410"
envelopeId: "ENV-EW-01"
dimensions:
  width: 1.5
  height: 2.0
```

**Co to daje SmartHUB:** Przesuwamy sciane w modelu graficznym -- platforma aktualizuje
`layers`, `uValue`, wymiary otwrow. Zmieniamy typ okna -- platforma podmienia `openingTypeId`
i automatycznie przelicza wspolczynnik przenikania ciepla. Dane sa ustrukturyzowane,
wiec kazda zmiana moze byc **walidowana w czasie rzeczywistym**: "Uwaga -- po tej zmianie
U-value sciany przekracza dopuszczalne 0.20 W/(m2K) wg WT 2021".

---

### 5. Zgodnosc z przepisami

**Wizja SmartHUB:** *Platforma automatycznie pobieralaby uwarunkowania prawne...
juz na tym etapie dawala ostrzezenie...*

**Co robi SBM:** Encja **Requirement** -- maszynowo czytelne wymaganie prawne:

```yaml
id: "REQ-PL-WT-ROOM-HEIGHT-001"
requirementName: "Minimalna wysokosc pomieszczenia"
standard: "WT_2021"
section: "par. 72"
metric: "designHeight"
operator: ">="
value: 2.50
unit: "m"
jurisdictionId: "pl"
```

W Polsce mamy juz **27 plikow wymagani prawnych** z rozporzadzenia WT 2021 i Rozporzadzenia
Ministra Zdrowia -- gotowych do automatycznej walidacji.

**Kompilator SBM** czyta wszystkie pomieszczenia i sprawdza:
- Czy `designHeight: 2.70` >= `value: 2.50`? --> PASS
- Czy `designHeight: 2.40` >= `value: 2.50`? --> FAIL

**Co to daje SmartHUB:** Modul prawny platformy nie musi "rozumiec" przepisow -- wystarczy,
ze je odpyta w formacie SBM. Wymagania to pliki z konkretnymi wartosciami, operatorami
i odwolaniami do paragrafow. Komunikat "ta wysokosc nie spelnia norm" generuje sie
automatycznie, z podaniem dokladnego paragrafu i wymaganej wartosci.

---

### 6. Systemy instalacyjne i urzadzenia

**Wizja SmartHUB:** *Gotowe biblioteki od dostawcow materialow, urzadzen...
platforma automatycznie sprawdza zgodnosc z normami...*

**Co robi SBM:**

**System** -- instalacja budowlana (hierarchicznie):
```
SYS-HVAC-01 (Centralne ogrzewanie i wentylacja)
  +-- SYS-HVAC-HEATING-01 (Ogrzewanie -- podsystem)
  +-- SYS-HVAC-VENT-01 (Wentylacja -- podsystem)
       +-- AST-AHU-01 (Centrala wentylacyjna -- konkretne urzadzenie)
```

**Asset** (urzadzenie) -- z numerem seryjnym, data instalacji, harmonogramem przegladow:
```yaml
id: "AST-HP-01"
assetName: "Pompa ciepla #1"
assetTypeId: "AT-VAILLANT-ECOTEC-306"
serialNumber: "12345-67890"
installationDate: "2024-03-15"
warrantyExpiry: "2029-03-15"
maintenanceSchedule:
  interval: "annual"
  nextService: "2025-03-15"
```

**Asset Type** (karta katalogowa -- od dostawcy):
```yaml
id: "AT-VAILLANT-ECOTEC-306"
manufacturer: "Vaillant"
modelName: "ecoTEC plus 306"
nominalPower: 26.4
energyClass: "A+"
```

**Co to daje SmartHUB:** Biblioteki dostawcow to po prostu pliki **Asset Type** w formacie SBM.
Dostawca dostarcza plik z parametrami produktu. Platforma sprawdza, czy format jest poprawny.
Projektant przeciaga produkt do projektu -- tworzaca sie encja **Asset** z referencja do typu.
Po zakonczeniu budowy -- te same pliki staja sie rejestrem srodkow trwalych z harmonogramem
konserwacji.

---

### 7. Fazy projektu i bramki jakosciowe

**Wizja SmartHUB:** *Mamy aktualny, "ostateczny" stan naszych materialow...
Inwestor zatwierdza koncepcje podpisem elektronicznym...*

**Co robi SBM:** 8 faz projektu, od inicjacji do przekazania:

| Faza | Co sie dokumentuje | Przyklad |
|------|-------------------|----------|
| 1. Inicjacja | Brief, notatki z wizji lokalnej | Dzialka, wstepne zalozenia |
| 2. Koncepcja | Bryly, wstepny program | Budynki, kondygnacje, lista pomieszczen |
| 3. Projekt schematyczny | Plany, strefy | Wymiary pomieszczen, strefy pozarowe |
| 4. Projekt budowlany | Pelne specyfikacje | Walidacja zgodnosci, przegrody |
| 5. Projekt wykonawczy | Detale, urzadzenia | Specyfikacje MEP, konkretne produkty |
| 6. Budowa | Nadzor | Zmiany, notatki z budowy |
| 7. Powwykonawczy | Pomiary | Zweryfikowane wymiary, stany rzeczywiste |
| 8. Przekazanie | Klucze | Rejestr urzadzen, instrukcje |

Kazda faza ma **bramke jakosciowa** (phase gate). Kompilator sprawdza:
- W Fazie 4: ostrzega, jesli dane sa "zalozone" (`assumed`) zamiast "potwierdzone"
- W Fazie 5+: blokuje, jesli dane krytyczne (np. ognioodopornosc) nie sa zweryfikowane
- W Fazie 7+: wymaga, zeby dane o bezpieczenstwie mialy `confidence: measured`

**Co to daje SmartHUB:** Kiedy Inwestor klika "zatwierdz koncepcje" -- platforma wie,
ze w Fazie 2 powinny istniec pliki Building, Level i Space. Jesli ich brakuje -- komunikat.
Kiedy projekt idzie do urzedu (Faza 4) -- platforma automatycznie sprawdza, czy wszystkie
pomieszczenia maja zwalidowane wymagania. Nie "moze" sprawdzic -- **musi**, bo bramki
jakosciowe sa wbudowane w standard.

---

### 8. Sledzenie zrodla danych (Data Provenance)

**Wizja SmartHUB:** *Historia wykonanych przez nas ruchow, zadanych promptow...
zmiany nanosilby Wykonawca, ale nie zmienialyby projektu zatwierdzonego w urzedzie...*

**Co robi SBM:** Kazde pole w kazdym pliku moze miec metadane o pochodzeniu:

```yaml
designArea: 30.45
designArea_meta:
  confidence: measured          # zmierzone / obliczone / zalozone / nieznane
  source: "mapa-geoprzest-01"  # skad te dane
  sourceRef: "sekcja 4.1"      # gdzie dokladnie
  verifiedBy: "Jan Kowalski"
  verifiedDate: "2024-06-15"
```

6 poziomow pewnosci: `measured` > `calculated` > `specified` > `estimated` > `assumed` > `unknown`

**Co to daje SmartHUB:** Platforma wie, ze `designArea: 30.45` to **pomiar geodezyjny**,
a nie "cos co ktos kiedys wpisal". W widoku projektu moglibysmy kolorami oznaczac pola:
zielone (zmierzone), zolte (oszacowane), czerwone (zalozone). Inspektor w urzedzie widzi,
ze dane sa wiarygodne. Wykonawca nanoszacy zmiane powykonawcza -- jego dane maja inna
`confidence` niz oryginalny projekt.

---

### 9. Koszty i harmonogram

**Wizja SmartHUB:** *Modul do zarzadzania budzetem i kosztami inwestycji...
automatycznie aktualizowaloby informacje...*

**Co robi SBM:** Hierarchiczny **rollup kosztow**:

```
Pomieszczenia --> Kondygnacje --> Budynki --> Dzialki --> Projekt
Urzadzenia --> Systemy --> Projekt
Pakiety budowlane --> Projekt
```

Kazde pomieszczenie moze miec `estimatedCost`. Kompilator sumuje koszty w gore hierarchii
z pelnym sledzeniem zrodla (`confidence: calculated, source: compiler_cost_rollup`).

**Construction Package** (pakiet budowlany) -- faza budowy:
```yaml
id: "CP-01"
packageName: "Konstrukcja"
startDate: "2024-01-15"
endDate: "2024-06-30"
estimatedCost: 450000
currency: "EUR"
assignedEntityIds: ["SP-BLD-01-L01-001", "SYS-HVAC-01"]
```

**Co to daje SmartHUB:** Zmiana materialu sciany automatycznie przelicza koszt
pomieszczenia, kondygnacji, budynku i calego projektu. Harmonogram budowy to pliki
Construction Package z datami i przypisanymi encjami. Modul finansowy platformy
czyta te same pliki co modul projektowy.

---

### 10. Integracja z BIM

**Wizja SmartHUB:** *Architekci beda mogli tworzyc projekty w pelni cyfrowym srodowisku,
korzystajac z zaawansowanych narzedzi do modelowania 3D i BIM...*

**Co robi SBM:** Mapowanie do IFC (Industry Foundation Classes):

| Encja SBM | Klasa IFC | Property Set |
|-----------|-----------|--------------|
| Space | IfcSpace | Pset_SpaceCommon |
| Zone | IfcZone | Pset_SBM_Zone |
| System | IfcSystem | Pset_SBM_System |
| Asset | IfcDistributionElement | Pset_SBM_Asset |
| Envelope | IfcWall / IfcSlab / IfcRoof | Pset_SBM_Envelope |
| Opening | IfcWindow / IfcDoor | Pset_SBM_Opening |

Kierunek przeplywu:
- **Eksport:** plik SBM --> parametry IFC --> import do Revit/ArchiCAD
- **Import:** model IFC --> skrypt aktualizuje pliki SBM o geometrie

Poziomy dokladnosci (LOD) sa zsynchronizowane z fazami projektu:
- Koncepcja: LOD 100 (przyblizona geometria)
- Projekt budowlany: LOD 300 (dokladne wymiary, realne materialy)
- Powykonawczy: LOD 500 (zweryfikowane z wykonaniem)

**Co to daje SmartHUB:** Platforma nie musi wymyslac wlasnego formatu BIM.
Pliki SBM mapuja sie wprost na IFC, ktory jest standardem swiatowym.
Wizualizacja 3D w platformie czyta te same dane co walidator przepisow --
bo obie strony mowia jezykiem SBM/IFC.

---

## Co SBM NIE robi (i co SmartHUB musi dodac)

SBM jest **standardem danych**, nie platforma. Oto co lezy po stronie SmartHUB:

| Funkcja | SmartHUB (platforma) | SBM (dane) |
|---------|---------------------|------------|
| Interfejs graficzny / edycja 3D | SmartHUB | -- |
| Wizualizacje fotorealistyczne | SmartHUB | Dostarcza parametry bryl i materialow |
| AI generujace layouty | SmartHUB | Dostarcza format wejscia/wyjscia |
| Wideokonferencje / czat | SmartHUB | -- |
| Podpisy elektroniczne | SmartHUB | Dostarcza strukture dokumentow do podpisu |
| Komunikacja z urzedami | SmartHUB | Dostarcza raporty zgodnosci |
| Dziennik budowy | SmartHUB | Dostarcza dane o zmianach powykonawczych |
| Rendering filmow | SmartHUB | Dostarcza dane o brylach, materialach, otoczeniu |
| Marketplace modulow | SmartHUB | -- |

**Kluczowa mysl:** SmartHUB decyduje **jak** uzytkownik pracuje (interfejs, AI, komunikacja).
SBM decyduje **co** platforma wie o budynku (struktura, dane, walidacja).

---

## Przyklad z zycia: Zielony Taras

Mamy kompletny przyklad -- budynek mieszkalny "Zielony Taras" (Green Terrace) --
z pelna dokumentacja SBM. Obejmuje **69 encji**:

| Encja | Ile | Przyklad |
|-------|-----|----------|
| Projekt | 1 | Metadane calego przedsiewziecia |
| Dzialka (Site) | 1 | ul. Sloneczna 45, 1250 m2 |
| Budynek (Building) | 1 | Zielony Taras |
| Kondygnacja (Level) | 1 | Parter, +0.00m |
| Pomieszczenia (Space) | 4 | Sypialnia, salon, kuchnia, klatka schodowa (wielopoziomowa) |
| Komunikacja pionowa | 1 | Klatka schodowa A, REI 60 |
| Przegroda (Envelope) | 1 | Sciana zewnetrzna typ A, U=0.18 |
| Otwory (Opening) | 3 | Okna polnocne i poludniowe |
| Typy otwrow (Opening Type) | 2 | Internorm KF410, drzwi wejsciowe |
| Strefy (Zone) | 3 | Pozarowa ZL-IV, akustyczna, HVAC |
| Typy stref | 3 | Szablony stref |
| Systemy (System) | 3 | HVAC (nadrzedny) + ogrzewanie + wentylacja |
| Urzadzenia (Asset) | 3 | Pompa ciepla, centrala, grzejnik |
| Wymagania (Requirement) | 3 | Wysokosc, naswietlenie, akustyka |
| Typy przestrzeni / systemow / zasobow | 3 | Szablony |
| Elementy terenu (Site Feature) | 2 | Ogrod polnocny, nawierzchnia |
| Pakiety budowlane | 4 | Konstrukcja, instalacje, wykanczanie, teren |

Caly przyklad kompiluje sie z **0 bledami**. Kazda encja jest zwalidowana wzgledem schematu
JSON, referencje sa sprawdzone, koszty zagregowane, jakosc danych oceniona.

Dokumentacja dostepna jest w **dwoch jezykach** (PL i EN) -- z pelna paryteta tresci.

---

## Zagadnienia techniczne -- co juz dziala

### Kompilator SBM (v1.1.0)

Narzedzie wiersza polecen, ktore czyta pliki Markdown i:

1. **Parsuje** -- wyodrebnia dane z naglowka YAML (19 typow encji)
2. **Normalizuje** -- laczy relacje, dziedziczenie typow, rollup kosztow
3. **Waliduje** -- schemat JSON, integralnosc referencji, bramki fazowe
4. **Ocenia jakosc** -- wazona kompletnosc pol (krytyczne 3x, wazne 2x, standardowe 1x)

Generuje 5 raportow wyjsciowych:
- **BIM mapping** -- parametry do importu do Revit/ArchiCAD
- **Compliance report** -- zgodnosc z wymaganiami
- **Asset register** -- rejestr srodkow trwalych
- **Quality report** -- audyt jakosci danych, luki, gotowosc fazowa
- **Digital twin schema** -- powiazania czujnikow z pomieszczeniami

**104 testy automatyczne** pokrywajace parsowanie, normalizacje, walidacje, jakosc i integracje.

### Schemat JSON (v1.1.0)

Formalny schemat definiujacy wszystkie 19 typow encji, ich pola, typy danych,
wymagania i relacje. Mozliwy do walidacji przez dowolne narzedzie zgodne z JSON Schema.

### Pliki wymagani prawnych

27 plikow z polskimi wymaganiami (WT 2021 + Rozporzadzenie Ministra Zdrowia) --
kazde wymaganie to osobny plik z wartoscia, operatorem, paragrafem i jurysdykcja.
Struktura pozwala na dodawanie wymagani z dowolnego kraju.

---

## Co to oznacza dla tworcy SmartHUB

Jesli SmartHUB ma byc **jedna platforma do wszystkiego** -- od szkicu koncepcyjnego,
przez zatwierdzenie w urzedzie, az po ksiazke obiektu -- to potrzebuje wspolnego jezyka danych.
Tego jezyka nie trzeba wymyslac od zera. SBM go definiuje.

**Konkretne korzysci:**

1. **Nie trzeba projektowac modelu danych od nowa** -- SBM definiuje 19 typow encji,
   ich pola, relacje, walidacje. To lata pracy nad architektura danych budowlanych.

2. **Walidacja wbudowana** -- przepisy WT 2021 sa juz w formacie maszynowym.
   Modul prawny SmartHUB moze je wczytac i sprawdzac projekt w czasie rzeczywistym.

3. **BIM od razu** -- mapowanie SBM-->IFC jest zdefiniowane. Platforma nie musi
   wymyslac, jak przeslac dane do Revita.

4. **Rozszerzalnosc** -- nowe typy encji, nowe pola, nowe jurysdykcje -- wszystko
   dodaje sie bez przebudowy calego systemu.

5. **Otwartosc** -- SBM to pliki tekstowe. Zadnego vendor lock-in. Platforma moze
   je czytac, ale uzytkownik moze je tez otworzyc w Notatniku.

6. **Gotowy przyklad** -- Zielony Taras to kompletny budynek z 69 encjami.
   Mozna go uzyc jako baze testowa dla kazdego modulu platformy.

---

## Wspolna droga?

Wizja SmartHUB opisuje **platfomre**. SBM opisuje **dane**. To sa dwie strony tej samej monety.

SmartHUB bez SBM to interfejs bez wiedzy o budynku.
SBM bez SmartHUB to dane bez interfejsu.

Razem -- to jest ta wizja, o ktorej piszesz:

> Jedno miejsce. Wspolne dane. Kazdy uczestnik procesu budowlanego -- architekt, inwestor,
> wykonawca, inspektor, zarzadca -- widzi te same, aktualne, zwalidowane informacje.
> Zmiana w jednym miejscu propaguje sie wszedzie. Bledy sa wylapywane zanim trafie na budowe.

My ten fundament danych budujemy. Wy mozecie na nim postawic platforme.

---

*SBM v1.1.0 -- marzec 2026*
*19 typow encji | 104 testy | 69 encji w przykladzie | pelna dokumentacja PL/EN*
*Otwarty standard | Pliki tekstowe | JSON Schema | IFC mapping*
