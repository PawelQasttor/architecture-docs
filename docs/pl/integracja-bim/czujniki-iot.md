# Czujniki i IoT

Wspolczesne budynki generuja dane przez caly okres eksploatacji. Ta strona wyjasnia, jak systemy czujnikow, urzadzenia IoT i systemy zarzadzania budynkiem (BMS) lacza sie ze standardem dokumentacji architektonicznej -- zapewniajac plynne przejscie od projektowania do eksploatacji.

## Dlaczego czujniki maja znaczenie dla architektury

Czujniki i urzadzenia IoT sa komponentami budynku, tak samo jak sciany i okna. Musza byc:

- **Wyspecyfikowane** w trakcie projektowania (od [Projektu Budowlanego](/pl/fazy/budowlany) wzwyz)
- **Udokumentowane** w modelu BIM (na poziomie [LOD 500](/pl/integracja-bim/lod-loi) dla dokumentacji powykonawczej)
- **Zmapowane** do systemow zarzadzania budynkiem w trakcie [Budowy](/pl/fazy/budowa)
- **Przekazane** z kompletnymi danymi jako czesc produktow fazy [Przekazania](/pl/fazy/przekazanie)

::: info
Standard traktuje czujniki jako wyposazenie. Kazdy czujnik jest dokumentowany za pomoca karty Urzadzenia w bazie danych projektu, powiazanej z jego lokalizacja (Pomieszczenie, Strefa, Kondygnacja) i systemem, ktory obsluguje (Instalacja).
:::

## Typy czujnikow w budynkach

| Typ czujnika | Co mierzy | Typowa lokalizacja | Powiazany system |
|---|---|---|---|
| Czujnik temperatury | Temperatura powietrza lub powierzchni (C) | Pomieszczenia, kanaly, powierzchnie rur | HVAC |
| Czujnik wilgotnosci | Wilgotnosc wzgledna (%) | Pomieszczenia, centrale wentylacyjne | HVAC |
| Czujnik CO2 | Stezenie dwutlenku wegla (ppm) | Sale konferencyjne, open space, sale lekcyjne | Wentylacja |
| Czujnik obecnosci | Wykrywanie obecnosci lub liczba osob | Pomieszczenia, korytarze, wejscia | Oswietlenie, HVAC, ochrona |
| Czujnik natezenia swiatla | Natezenie oswietlenia (lux) | Stanowiska pracy, fasady | Sterowanie oswietleniem |
| Licznik energii | Zuzycie energii elektrycznej (kWh) | Tablice rozdzielcze, poszczegolne obwody | Elektryczny |
| Wodomierz | Przeplyw wody (m3/h lub litry) | Przylocze glowne, piony, pomieszczenia techniczne | Sanitarny |
| Gazomierz | Zuzycie gazu (m3/h) | Wejscie przylocza gazowego, kotlownia | Ogrzewanie |
| Czujnik cisnienia | Cisnienie powietrza lub wody (Pa lub bar) | Kanaly wentylacyjne, instalacje rurowe | HVAC, sanitarny |
| Czujka dymu | Czastki dymu | Wszystkie pomieszczenia uzytkowe wg przepisow ppoz. | Ochrona ppoz. |
| Czujnik ruchu | Wykrywanie ruchu | Korytarze, tereny zewnetrzne | Ochrona, oswietlenie |
| Kontaktron okna/drzwi | Stan otwarty/zamkniety | Okna otwierane, drzwi zewnetrzne | Ochrona, HVAC |

## Integracja z BMS

System Zarzadzania Budynkiem (BMS) zbiera dane z czujnikow, steruje systemami budynkowymi i zapewnia widocznosc operacyjna. Dokumentacja architektoniczna musi wspierac integracje z BMS.

### Co dostarcza architekt

| Produkt | Faza | Opis |
|---|---|---|
| Plany lokalizacji czujnikow | [Projekt Budowlany](/pl/fazy/budowlany) | Rzuty kondygnacji z pozycjami czujnikow wedlug typow |
| Zestawienie czujnikow | [Projekt Wykonawczy](/pl/fazy/wykonawczy) | Tabela z kazdym czujnikiem: typ, lokalizacja, system, ID punktu danych |
| Koordynacja tras kablowych | [Projekt Wykonawczy](/pl/fazy/wykonawczy) | Skoordynowane z przebiegami instalacji w modelu BIM |
| Model powykonawczy czujnikow | [Powykonawcza](/pl/fazy/powykonawcza) | Model BIM ze wszystkimi czujnikami na poziomie LOD 500 |
| Przekazanie danych o wyposazeniu | [Przekazanie](/pl/fazy/przekazanie) | Kompletne karty Urzadzen dla wszystkich czujnikow i miernikow |

### Mapowanie punktow danych

Kazdy czujnik generuje jeden lub wiecej punktow danych. Musza byc zmapowane w dokumentacji:

| Pole punktu danych | Opis | Przyklad |
|---|---|---|
| ID punktu | Unikatowy identyfikator w BMS | CW-01.TNP |
| Opis | Czytelna nazwa | Temperatura Nawiewu, Centrala Wentylacyjna 1 |
| Jednostka | Jednostka pomiaru | Celsjusz |
| Zakres | Oczekiwany zakres wartosci | 10 -- 35 |
| Alarm dolny | Prog alarmu niskiego | 14 |
| Alarm gorny | Prog alarmu wysokiego | 30 |
| Czestotliwosc odczytu | Jak czesto wartosc jest odczytywana | 60 sekund |
| Odniesienie lokalizacyjne | Powiazanie z karta Pomieszczenia lub Strefy | Pomieszczenie 2.14, Strefa B |
| Odniesienie do Urzadzenia | Powiazanie z karta Urzadzenia danego czujnika | URZ-TEMP-0042 |

::: tip
Uzgodnij konwencje nazewnictwa punktow danych podczas [fazy Projektu Budowlanego](/pl/fazy/budowlany). Stosowanie spojnej konwencji (np. System-Urzadzenie-Parametr) pozwala uniknac kosztownego przemapowania podczas rozruchu.
:::

## Koncepcja blizniak cyfrowego

Blizniak cyfrowy to cyfrowa replika fizycznego budynku zasilana danymi z czujnikow w czasie rzeczywistym. Standard wspiera procesy blizniak cyfrowego zapewniajac:

1. **Kazdy czujnik ma karte Urzadzenia** -- dokumentujaca typ, lokalizacje, producenta, date instalacji, harmonogram kalibracji i mapowanie punktow danych.
2. **Karty Urzadzen sa powiazane z elementami BIM** -- czujnik w modelu 3D jest polaczony z karta Urzadzenia w bazie danych poprzez [synchronizacje dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa).
3. **Punkty danych sa znormalizowane** -- spojna konwencja nazw i jednostek pozwala pulpitom nawigacyjnym i narzedziom analitycznym pobierac dane bez recznego przeksztalcania.
4. **Eksport IFC zawiera dane czujnikow** -- czujniki sa eksportowane jako elementy IfcSensor z zestawami wlasciwosci odpowiadajacymi mapowaniu punktow danych. Patrz [Mapowanie IFC](/pl/integracja-bim/encje-ifc).

### Poziomy dojrzalosci blizniak cyfrowego

| Poziom | Nazwa | Opis | Wsparcie standardu |
|---|---|---|---|
| Poziom 0 | Model statyczny | Model 3D bez danych na zywo | Tak -- poprzez model BIM |
| Poziom 1 | Model polaczony | Model polaczony z danymi czujnikow na zywo | Tak -- poprzez karty Urzadzen i mapowanie punktow danych |
| Poziom 2 | Blizniak analityczny | Model z analiza danych historycznych i prognozami | Czesciowo -- struktura danych wspiera analizy |
| Poziom 3 | Blizniak autonomiczny | Samooptymalizujace sie systemy budynkowe | Tylko fundament -- wymaga specjalistycznych platform |

## Jak karty Urzadzen dokumentuja czujniki

Kazdy czujnik lub urzadzenie IoT w budynku otrzymuje wlasna karte Urzadzenia w bazie danych standardu. Karta Urzadzenia zawiera:

| Pole | Opis | Przyklad |
|---|---|---|
| ID Urzadzenia | Unikatowy identyfikator | URZ-TEMP-0042 |
| Nazwa Urzadzenia | Nazwa opisowa | Czujnik temperatury, Pomieszczenie 2.14 |
| Typ Urzadzenia | Kategoria z taksonomii standardu | Czujnik temperatury |
| Producent | Producent urzadzenia | Siemens |
| Model | Numer modelu produktu | QAM2120.040 |
| Numer seryjny | Unikatowy numer seryjny producenta | SN-29847561 |
| Data instalacji | Kiedy zainstalowano na miejscu | 2025-06-14 |
| Lokalizacja -- Budynek | Powiazanie z karta Budynku | Budynek Glowny Biblioteki |
| Lokalizacja -- Kondygnacja | Powiazanie z karta Kondygnacji | Kondygnacja 2 |
| Lokalizacja -- Pomieszczenie | Powiazanie z karta Pomieszczenia | Pomieszczenie 2.14 -- Czytelnia |
| Lokalizacja -- Strefa | Powiazanie z karta Strefy | Strefa B -- Obszary publiczne |
| Obslugiwany system | Powiazanie z karta Instalacji | CW-01 -- Centrala Wentylacyjna 1 |
| ID punktow danych | Lista punktow danych BMS | CW-01.TNP, CW-01.TNP.AL |
| Czestotliwosc kalibracji | Wymagana czestotliwosc kalibracji | 12 miesiecy |
| Nastepna kalibracja | Planowana data kalibracji | 2026-06-14 |
| Wygasniecie gwarancji | Koniec gwarancji producenta | 2028-06-14 |
| Instrukcja O&M | Odniesienie do instrukcji eksploatacji | Ref. dok.: IO-HVAC-042 |

::: warning
Brakujace karty Urzadzen przy przekazaniu tworza dlugoterminowe problemy. Zespoly eksploatacyjne nie moga utrzymywac czujnikow, o ktorych nie wiedza. Upewnij sie, ze kazdy czujnik jest udokumentowany przed podpisaniem [Przekazania](/pl/fazy/przekazanie).
:::

## Przyklady pulpitow nawigacyjnych

Dobrze udokumentowane dane czujnikowe umozliwiaja tworzenie pulpitow operacyjnych. Typowe widoki obejmuja:

### Pulpit przegladu Budynku

| Widok | Zrodlo danych | Cel |
|---|---|---|
| Mapa cieplna rzutu | Czujniki temperatury na Pomieszczenie | Wizualizacja komfortu cieplnego w calym budynku |
| Wykres zuzycia energii | Liczniki energii na Kondygnacje/Strefe | Sledzenie dziennego, tygodniowego, miesiecznego zuzycia energii |
| Podsumowanie oblozeniosci | Czujniki obecnosci na Strefe | Pokazanie biezacych i historycznych wzorcow oblozeniosci |
| Lista alarmow | Wszystkie czujniki z aktywnymi alarmami | Wyroznienie systemow wymagajacych uwagi |
| Status systemow | Stan kontrolerow BMS | Potwierdzenie dzialania wszystkich systemow |

### Pulpit poziomu Strefy

| Widok | Zrodlo danych | Cel |
|---|---|---|
| Trend temperatury | Czujniki temperatury Strefy | Temperatura w czasie z nakladka zadanej wartosci |
| Trend wilgotnosci | Czujniki wilgotnosci Strefy | Monitorowanie wilgotnosci ze znacznikami zakresu komfortu |
| Poziom CO2 | Czujniki CO2 Strefy | Kontrola, czy wentylacja spelnia normy jakosci powietrza |
| Status oswietlenia | Czujniki natezenia swiatla + sterowanie | Biezace poziomy oswietlenia i tryb sterowania |
| Liczba osob | Czujniki obecnosci Strefy | Biezaca zajetosc a pojemnosc |

## Protokoly komunikacji IoT

| Protokol | Typowe zastosowanie | Uwagi |
|---|---|---|
| BACnet | HVAC, oswietlenie, systemy ppoz. | Najczesciej spotykany w budynkach uzytkowych |
| Modbus | Urzadzenia przemyslowe, starsze systemy | Powszechnie wspierany, prostszy protokol |
| KNX | Oswietlenie, zaluzje, automatyka pokojowa | Popularny w Europie w budownictwie komercyjnym i mieszkaniowym |
| MQTT | Czujniki IoT, urzadzenia polaczone z chmura | Lekki, odpowiedni dla duzej ilosci danych |
| LoRaWAN | Czujniki bezprzewodowe w duzych budynkach | Dlugi zasieg, niskie zuzycie energii, dobry do modernizacji |
| Zigbee / Z-Wave | Mala automatyka budynkowa | Czesciej spotykany w budownictwie mieszkaniowym |

::: info
Protokol komunikacji uzywany przez kazdy czujnik powinien byc zapisany w karcie Urzadzenia. Ta informacja jest niezbedna dla zespolow eksploatacyjnych przy diagnostyce lub rozbudowie systemu zarzadzania budynkiem.
:::

## Lista kontrolna dokumentacji czujnikow

- [ ] Typy czujnikow zidentyfikowane na Pomieszczenie i Strefe
- [ ] Zestawienie czujnikow utworzone z mapowaniem punktow danych
- [ ] Konwencja nazewnictwa punktow danych uzgodniona z integratorem BMS
- [ ] Czujniki uwzglednione w modelu BIM na odpowiednim LOD (patrz [Matryca LOD/LOI](/pl/integracja-bim/lod-loi))
- [ ] Karty Urzadzen utworzone dla wszystkich czujnikow i miernikow
- [ ] Karty Urzadzen powiazane z kartami Pomieszczenia, Strefy, Kondygnacji i Instalacji
- [ ] Eksport IFC zawiera elementy IfcSensor z zestawami wlasciwosci
- [ ] Dane rozruchowe zapisane w kartach Urzadzen
- [ ] Instrukcje O&M powiazane z kartami Urzadzen
- [ ] Wymagania pulpitu nawigacyjnego zdefiniowane z zespolem eksploatacyjnym

## Powiazane strony

- [Plan Realizacji BIM (BEP)](/pl/integracja-bim/bep)
- [Matryca LOD/LOI](/pl/integracja-bim/lod-loi)
- [Mapowanie IFC](/pl/integracja-bim/encje-ifc)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Faza Przekazania](/pl/fazy/przekazanie)
- [Integracja BIM -- przeglad](/pl/integracja-bim/)
