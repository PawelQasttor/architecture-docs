# Matryca LOD/LOI

Strona zawiera szczegolowa matryca mapujaca wymagania Poziomu Rozwoju (LOD) i Poziomu Informacji (LOI) na poszczegolne fazy projektu i typy elementow. Matryca sluzy do ustalania oczekiwan w [Planie Realizacji BIM](/pl/integracja-bim/bep) oraz weryfikacji produktow modelowych na kazdej bramce fazowej.

## Definicje

**Poziom Rozwoju (LOD -- Level of Development)** opisuje kompletnosc geometryczna i wiarygodnosc elementu modelu. Siega od koncepcyjnego symbolu zastepczego (LOD 100) do zweryfikowanej reprezentacji powykonawczej (LOD 500).

**Poziom Informacji (LOI -- Level of Information)** opisuje dane niegeometryczne dolaczone do elementu modelu -- specyfikacje, dane wydajnosciowe, dane producenta, harmonogramy konserwacji i podobne atrybuty.

::: info
LOD i LOI rozwijaja sie rownolegle, ale sa sledzone oddzielnie. Element moze miec szczegolowa geometrie (wysoki LOD), ale brak danych konserwacyjnych (nizszy LOI), jesli projekt nie osiagnal jeszcze etapu przekazania.
:::

## Skala LOD -- przeglad

| LOD | Nazwa | Opis | Typowa faza |
|---|---|---|---|
| LOD 100 | Koncepcyjny | Symboliczna reprezentacja, przyblizony rozmiar i lokalizacja | [Koncepcja](/pl/fazy/koncepcja) |
| LOD 200 | Przyblizony | Generyczny element z przyblizanymi wymiarami, ksztaltem i orientacja | [Projekt Wstepny](/pl/fazy/wstepny) |
| LOD 300 | Dokladny | Konkretny element z dokladnymi wymiarami, ksztaltem i pozycja | [Projekt Budowlany](/pl/fazy/budowlany) |
| LOD 350 | Gotowy do realizacji | LOD 300 plus interfejsy i polaczenia z innymi elementami | [Projekt Wykonawczy](/pl/fazy/wykonawczy) |
| LOD 400 | Produkcyjny | Na tyle szczegolowy, by umozliwic produkcje lub zamowienie | [Budowa](/pl/fazy/budowa) |
| LOD 500 | Powykonawczy | Zweryfikowana terenowo reprezentacja zainstalowanego elementu | [Powykonawcza](/pl/fazy/powykonawcza) |

## Skala LOI -- przeglad

| Poziom LOI | Zakres danych | Przyklady |
|---|---|---|
| LOI Podstawowy | Tylko typ i funkcja | Typ sciany: zewnetrzna nosna |
| LOI Zdefiniowany | Material i kluczowe wartosci wydajnosciowe | Wspolczynnik U, klasa odpornosci ogniowej, izolacyjnosc akustyczna |
| LOI Szczegolowy | Konkretne wybory produktow i dane zgodnosci | Producent, kod produktu, numer swiadectwa badawczego |
| LOI Kompletny | Pelne dane cyklu zycia obejmujace konserwacje i eksploatacje | Okres gwarancji, czestotliwosc konserwacji, koszt wymiany, mapowanie czujnikow |

## Pelna matryca LOD/LOI wedlug typu elementu

### Sciany

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Bryly lub liniowe symbole zastepce | Podstawowy | Oznaczenie wewnetrzna / zewnetrzna, przyblizana wysokosc |
| Projekt Wstepny | 200 | Generyczna sciana z przyblizana gruboscia | Zdefiniowany | Typ sciany, docelowy wspolczynnik U, klasa odpornosci ogniowej |
| Projekt Budowlany | 300 | Dokladna grubosc, pozycje otworow, uklad warstw | Szczegolowy | Warstwy materialowe, potwierdzony wspolczynnik U, parametry akustyczne, specyfikacja produktu |
| Projekt Wykonawczy | 350 | Polaczenia ze stropami, dachem i scianami sasiednimi | Szczegolowy | Detale mocowania, dylatacje, bariery ogniochronne |
| Budowa | 400 | Poziom rysunkow warsztatowych w razie potrzeby | Kompletny | Dostawca, harmonogram dostaw, metoda montazu |
| Powykonawcza | 500 | Zweryfikowana geometria odpowiadajaca stanowi zainstalowanemu | Kompletny | Zainstalowany produkt, wyniki badan, gwarancja |

### Stropy i plyty

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Zarys plyty, rzedna poziomu | Podstawowy | Oznaczenie konstrukcyjny / niekonstrukcyjny |
| Projekt Wstepny | 200 | Generyczna plyta o nominalnej grubosci | Zdefiniowany | Typ systemu konstrukcyjnego, docelowa nosnosc |
| Projekt Budowlany | 300 | Dokladny uklad warstw, otwory, krawedzie | Szczegolowy | Klasa betonu, typ zbrojenia, specyfikacja wykonczenia |
| Projekt Wykonawczy | 350 | Polaczenia z belkami, slupami i scianami | Szczegolowy | Kolejnosc betonowania, lokalizacja przerw roboczych |
| Budowa | 400 | Rozmieszczenie zbrojenia, lokalizacja osadzonych elementow | Kompletny | Zestawienie zbrojenia, dostawca, protokoly betonowania |
| Powykonawcza | 500 | Geometria powykonawcza zweryfikowana geodezyjnie | Kompletny | Swiadectwa badan betonu, rzedne powykonawcze |

### Dachy

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Zarys dachu i ogolna forma (plaski, spadzisty) | Podstawowy | Klasyfikacja typu dachu |
| Projekt Wstepny | 200 | Przyblizony ksztalt ze spadkiem i okapem | Zdefiniowany | Strategia hydroizolacji, docelowy wspolczynnik U |
| Projekt Budowlany | 300 | Pelny uklad warstw, punkty odwodnienia, swietliki | Szczegolowy | Typ membrany, typ izolacji, obliczenia odwodnienia |
| Projekt Wykonawczy | 350 | Detale krawedziowe, interfejsy przejsc, dylatacje | Szczegolowy | Rysunki detaliczne, specyfikacje obrobek blacharskich |
| Budowa | 400 | Kolejnosc montazu, wymagania robot tymczasowych | Kompletny | Producent, instrukcja montazu |
| Powykonawcza | 500 | Zweryfikowana geometria dachu i zainstalowane materialy | Kompletny | Swiadectwa gwarancyjne, protokoly kontroli |

### Drzwi

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Otwor zaznaczony w scianie, brak detalu skrzydla | Podstawowy | Funkcja drzwi (wejsciowe, wewnetrzne, przeciwpozarowe) |
| Projekt Wstepny | 200 | Generyczny panel drzwiowy z przyblizanymi wymiarami | Zdefiniowany | Typ drzwi, odpornosc ogniowa, przyblizony rozmiar |
| Projekt Budowlany | 300 | Dokladne wymiary, kierunek otwierania, oscieznica | Szczegolowy | Material, typ przeszklenia, zestaw okucia, izolacyjnosc akustyczna |
| Projekt Wykonawczy | 350 | Polaczenie oscieznicy ze sciana, detale progu | Szczegolowy | Zestawienie drzwi, zestawienie okucia |
| Budowa | 400 | Pelny zestaw drzwiowy z pozycjami okucia | Kompletny | Producent, kod produktu, termin dostawy |
| Powykonawcza | 500 | Zainstalowane drzwi zweryfikowane na miejscu | Kompletny | Numer seryjny, data montazu, gwarancja |

### Okna

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Otwor zaznaczony, przyblizony rozmiar | Podstawowy | Funkcja okna (stale, otwierane) |
| Projekt Wstepny | 200 | Generyczna rama ze strefa przeszklenia | Zdefiniowany | Docelowy wspolczynnik U (rama + szyba), docelowe zyski sloneczne |
| Projekt Budowlany | 300 | Dokladne wymiary, uklad slupkow, typ otwierania | Szczegolowy | Specyfikacja szkla, material ramy, potwierdzony U i g |
| Projekt Wykonawczy | 350 | Interfejs rama-sciana, detale parapetu i nadproza | Szczegolowy | Metoda montazu, specyfikacja uszczelek |
| Budowa | 400 | Detal gotowy do produkcji z okuciami | Kompletny | Producent, kod produktu, termin dostawy |
| Powykonawcza | 500 | Zainstalowane okno zweryfikowane | Kompletny | Swiadectwa badan, gwarancja, instrukcja konserwacji |

### Instalacje (Mechaniczne, Elektryczne, Sanitarne)

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | -- | Zwykle nie modelowane | -- | -- |
| Projekt Wstepny | 100 | Schemat ukladu, przydzialy strefowe, pozycje pionow | Podstawowy | Typ systemu (HVAC, elektryczny, sanitarny) |
| Projekt Budowlany | 200 | Przyblizany przebieg, symbole urzadzen ze strefami swobodnymi | Zdefiniowany | Wymagania wydajnosciowe, docelowe parametry systemu |
| Projekt Wykonawczy | 300 | Dokladny przebieg kanalow/rur/korytek, urzadzenia z wymiarami | Szczegolowy | Zestawienia urzadzen, straty cisnienia, schematy obwodow |
| Budowa | 400 | Detal produkcyjny, rysunki prefabrykatow, tablice rozdzielcze | Kompletny | Dostawca, numer modelu, kolejnosc montazu |
| Powykonawcza | 500 | Zweryfikowane zainstalowane pozycje i polaczenia | Kompletny | Dane rozruchowe, ID czujnikow (patrz [Czujniki i IoT](/pl/integracja-bim/czujniki-iot)), dane O&M |

::: tip
Dla elementow instalacyjnych na poziomie LOD 500 upewnij sie, ze wszystkie czujniki i mierniki sa oznaczone unikalnymi identyfikatorami zgodnymi z systemem zarzadzania budynkiem (BMS). Umozliwia to funkcjonalnosc [blizniak cyfrowego](/pl/integracja-bim/czujniki-iot) po przekazaniu obiektu.
:::

### Elementy konstrukcyjne (belki, slupy, fundamenty)

| Faza | LOD | Szczegol geometrii | LOI | Wymagane informacje |
|---|---|---|---|---|
| Koncepcja | 100 | Siatka konstrukcyjna i orientacyjne rozpietosci | Podstawowy | Typ systemu konstrukcyjnego (stal, beton, drewno) |
| Projekt Wstepny | 200 | Generyczne elementy o przyblizonych rozmiarach na siatce | Zdefiniowany | Klasa materialu, przyblizane rozmiary, docelowa nosnosc |
| Projekt Budowlany | 300 | Dokladne przekroje, polaczenia zaznaczone | Szczegolowy | Potwierdzone rozmiary, typy polaczen, obciazenia projektowe |
| Projekt Wykonawczy | 350 | Detale polaczen, zarysy zbrojenia, lokalizacje kotwien | Szczegolowy | Zestawienia polaczen, zestawienia zbrojenia |
| Budowa | 400 | Detal produkcyjny: zestawienia giecia pretow, modele produkcyjne stali | Kompletny | Producent, rysunki warsztatowe, kolejnosc montazu |
| Powykonawcza | 500 | Geometria powykonawcza zweryfikowana geodezyjnie | Kompletny | Swiadectwa badan materialow, protokoly kontroli, odchylki powykonawcze |

## Tabela zbiorcza: faza a LOD

| Typ elementu | Koncepcja | Wstepny | Budowlany | Wykonawczy | Budowa | Powykonawcza |
|---|---|---|---|---|---|---|
| Sciany | 100 | 200 | 300 | 350 | 400 | 500 |
| Stropy | 100 | 200 | 300 | 350 | 400 | 500 |
| Dachy | 100 | 200 | 300 | 350 | 400 | 500 |
| Drzwi | 100 | 200 | 300 | 350 | 400 | 500 |
| Okna | 100 | 200 | 300 | 350 | 400 | 500 |
| Instalacje | -- | 100 | 200 | 300 | 400 | 500 |
| Konstrukcja | 100 | 200 | 300 | 350 | 400 | 500 |

## Jak korzystac z tej matrycy

1. **Przy przygotowaniu BEP** -- odwolaj sie do matrycy, aby ustanowic oczekiwania LOD/LOI dla kazdej branzy. Patrz [Plan Realizacji BIM](/pl/integracja-bim/bep).
2. **Na bramkach fazowych** -- sprawdz dostarczone modele pod katem wymaganego LOD/LOI. Modele nieosiagajace wymaganego poziomu musza byc zwrocone do poprawy przed podpisaniem fazy.
3. **Przy eksporcie IFC** -- upewnij sie, ze informacje wymagane na kazdym poziomie LOI sa zmapowane na zestawy wlasciwosci IFC. Patrz [Mapowanie IFC](/pl/integracja-bim/encje-ifc).
4. **Przy [synchronizacji dwukierunkowej](/pl/integracja-bim/synchronizacja-dwukierunkowa)** -- poziom LOI okresla, ktore pola danych sa synchronizowane miedzy modelem BIM a baza danych standardu.

::: warning
Nie prze-modelowuj. Dostarczanie detalu LOD 400 w fazie Projektu Wstepnego marnuje wysilek i moze przedwczesnie zamknac decyzje projektowe. Stosuj sie do matrycy, aby utrzymac naklad modelowania w zgodzie z postepem projektu.
:::

## Powiazane strony

- [Plan Realizacji BIM (BEP)](/pl/integracja-bim/bep)
- [Definicje LOD](/pl/integracja-bim/definicje-lod)
- [Mapowanie IFC](/pl/integracja-bim/encje-ifc)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Czujniki i IoT](/pl/integracja-bim/czujniki-iot)
