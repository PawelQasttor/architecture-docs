# Plan Realizacji BIM (BEP)

Plan Realizacji BIM to podstawowy dokument definiujacy sposob wykorzystania modelowania informacji o budynku w projekcie. Okresla oczekiwania, przypisuje odpowiedzialnosci i ustala procedury pracy przed rozpoczeciem modelowania.

## Kiedy opracowac BEP

BEP powinien byc przygotowany w wersji roboczej podczas [fazy Rozpoczecia](/pl/fazy/rozpoczecie) i sfinalizowany najpozniej w [fazie Koncepcji](/pl/fazy/koncepcja). Opoznienie zwieksza ryzyko koordynacyjne, ktore staje sie kosztowne do rozwiazania.

::: tip
Rozpocznij prace nad BEP w momencie zebrania zespolu projektowego. Doprecyzuj dokument w miare ustalania zakresu, oprogramowania i struktury zespolu.
:::

## Cel dokumentu

BEP realizuje trzy cele:

1. **Uzgodnienie** -- wszystkie strony akceptuja standardy modelowania, produkty koncowe i formaty wymiany danych przed rozpoczeciem pracy.
2. **Odpowiedzialnosc** -- role i obowiazki sa udokumentowane i identyfikowalne.
3. **Kontrola jakosci** -- harmonogramy wykrywania kolizji, wymagania LOD i kamienie milowe przegladow sa zdefiniowane z gory.

## Zawartosc BEP

### 1. Informacje o projekcie

| Pole | Opis | Przyklad |
|---|---|---|
| Nazwa projektu | Oficjalna nazwa uzywana we wszystkich dokumentach | Rozbudowa Biblioteki Miejskiej |
| Numer projektu | Unikatowy identyfikator | 2025-ARC-0042 |
| Inwestor | Organizacja zlecajaca | Gmina Zielonogorsk |
| Lokalizacja | Adres dzialki lub wspolrzedne | ul. Parkowa 12, Zielonogorsk |
| Typ projektu | Nowy budynek, remont, rozbudowa, aranzacja wnetrz | Rozbudowa |
| Powierzchnia uzytkowa | Przyblizona powierzchnia w m2 | 4 200 m2 |
| Planowane fazy | Ktore fazy obejmuje ten BEP | Od Koncepcji do Projektu Wykonawczego |

### 2. Role i odpowiedzialnosci

| Rola | Odpowiedzialnosc | Typowe przypisanie |
|---|---|---|
| Menedzer BIM | Nadzoruje caly proces BIM, utrzymuje standardy, zarzadza CDE | Wiodaca pracownia projektowa |
| Koordynator BIM | Koordynuje modele w ramach jednej branzy, przeprowadza wykrywanie kolizji | Lider kazdej branzy |
| Menedzer Informacji | Zapewnia jakosc danych i zgodnosc z BEP | Strona inwestora lub firma PM |
| Autor Modelu | Tworzy i utrzymuje zawartosc modelu | Poszczegolni projektanci |

::: info
W projektach wielobranzowych kazda firma powinna wyznaczyc wlasnego Koordynatora BIM. Menedzer BIM stoi nad wszystkimi koordynatorami i rozwiazuje problemy miedzybranzowe.
:::

### 3. Oprogramowanie i wersje

Wykaz wszystkich narzedzi programowych, ktore beda tworzyc lub wykorzystywac dane BIM:

| Branza | Oprogramowanie | Wersja | Format plikow |
|---|---|---|---|
| Architektura | Revit | 2024 | .rvt, .ifc |
| Konstrukcja | Tekla Structures | 2024 | .ifc |
| Instalacje | Revit MEP | 2024 | .rvt, .ifc |
| Koordynacja | Navisworks | 2024 | .nwd, .nwf |
| Kosztorysowanie | Norma PRO / CostX | 2024 / 8.1 | .ifc import |

### 4. Formaty wymiany danych

Wszystkie wymiany modeli miedzy branzami powinny wykorzystywac otwarte formaty tam, gdzie to mozliwe. IFC (Industry Foundation Classes) jest podstawowym formatem wymiany. Szczegoly mapowania -- patrz [Mapowanie IFC](/pl/integracja-bim/encje-ifc).

| Typ wymiany | Format | Czestotliwosc |
|---|---|---|
| Koordynacja miedzybranzowa | IFC 4.0 | Co tydzien |
| Wymiana wewnatrz branzy | Natywny (.rvt, .pln) | Wg potrzeb |
| Produkty dla inwestora | IFC + PDF | Na kamien milowy |
| Przedmiary | IFC lub .xlsx | Na faze |

### 5. Konwencja nazewnictwa

Spojna konwencja nazewnictwa zapobiega pomylkom i wspiera automatyczne procesy w [CDE](/pl/integracja-bim/cde).

**Wzor nazwy pliku:**

```
[Projekt]-[Branza]-[Strefa]-[Kondygnacja]-[Typ]-[Status]-[Rewizja]
```

| Skladnik | Wartosci | Przyklad |
|---|---|---|
| Projekt | Kod projektu | RBM |
| Branza | ARC, KON, INS, KRA | ARC |
| Strefa | ST01, ST02 lub ALL | ST01 |
| Kondygnacja | K00, K01, KDA | K01 |
| Typ | MOD (model), RYS (rysunek), ZES (zestawienie) | MOD |
| Status | WIP, SHR, PUB, ARC | SHR |
| Rewizja | P01, P02 (wstepna) / W01 (wykonawcza) | P03 |

**Przyklad:** `RBM-ARC-ST01-K01-MOD-SHR-P03.ifc`

### 6. Harmonogram wykrywania kolizji

| Faza | Czestotliwosc | Zakres | Prowadzacy |
|---|---|---|---|
| [Koncepcja](/pl/fazy/koncepcja) | Co dwa tygodnie | Architektura vs. Konstrukcja | Menedzer BIM |
| [Projekt Wstepny](/pl/fazy/wstepny) | Co tydzien | Wszystkie branze | Menedzer BIM |
| [Projekt Budowlany](/pl/fazy/budowlany) | Co tydzien | Wszystkie branze + teren | Koordynator BIM per branza |
| [Projekt Wykonawczy](/pl/fazy/wykonawczy) | Dwa razy w tygodniu | Pelny model z detalami | Menedzer BIM |

::: warning
Wykrywanie kolizji nie jest opcjonalne. Nierozwiazane kolizje na koniec kazdej fazy musza byc udokumentowane jako otwarte problemy w systemie sledzenia. Staja sie one blokadami dla podpisania fazy.
:::

### 7. Wymagania LOD na faze

BEP musi odwolywac sie do projektowych [definicji LOD](/pl/integracja-bim/definicje-lod) i okreslac wymagany poziom rozwoju dla kazdej kategorii elementow w kazdej fazie. Szczegolowa tabelka -- patrz [Matryca LOD/LOI](/pl/integracja-bim/lod-loi).

| Faza | Elementy architektoniczne | Elementy konstrukcyjne | Elementy instalacyjne |
|---|---|---|---|
| Koncepcja | LOD 100 | LOD 100 | -- |
| Projekt Wstepny | LOD 200 | LOD 200 | LOD 100 |
| Projekt Budowlany | LOD 300 | LOD 300 | LOD 200 |
| Projekt Wykonawczy | LOD 350 | LOD 400 | LOD 300 |
| Powykonawcza | LOD 500 | LOD 500 | LOD 500 |

### 8. Produkty koncowe na faze

| Faza | Produkty | Format |
|---|---|---|
| [Rozpoczecie](/pl/fazy/rozpoczecie) | Wersja robocza BEP, konfiguracja CDE | .docx / CDE |
| [Koncepcja](/pl/fazy/koncepcja) | Model brylowy, model kontekstu | .ifc, .pdf |
| [Projekt Wstepny](/pl/fazy/wstepny) | Skoordynowany model, wstepny raport kolizji | .ifc, .bcf, .pdf |
| [Projekt Budowlany](/pl/fazy/budowlany) | Model szczegolowy, specyfikacje, raport kolizji | .ifc, .xlsx, .pdf |
| [Projekt Wykonawczy](/pl/fazy/wykonawczy) | Model wykonawczy, pelny zestaw rysunkow, przedmiary | .ifc, .pdf, .xlsx |
| [Budowa](/pl/fazy/budowa) | Zaktualizowany model ze zmianami, rejestr RFI | .ifc, .bcf |
| [Powykonawcza](/pl/fazy/powykonawcza) | Model powykonawczy odzwierciedlajacy stan zbudowany | .ifc |
| [Przekazanie](/pl/fazy/przekazanie) | Finalny model, dane o wyposazeniu, instrukcje O&M | .ifc, .cobie, .pdf |

## Lista kontrolna BEP

Uzyj tej listy, aby zweryfikowac kompletnosc BEP przed finalizacja:

- [ ] Sekcja informacji o projekcie wypelniona
- [ ] Wszystkie role zespolowe przypisane do osob z imienia i nazwiska
- [ ] Lista oprogramowania i wersji potwierdzona przez wszystkie strony
- [ ] Konwencja nazewnictwa uzgodniona i udokumentowana
- [ ] Harmonogram wykrywania kolizji ustalony
- [ ] Wymagania LOD na faze zdefiniowane
- [ ] Lista produktow koncowych na faze uzgodniona
- [ ] Struktura folderow CDE i prawa dostepu skonfigurowane (patrz [CDE](/pl/integracja-bim/cde))
- [ ] Punkt bazowy modelu i uklad wspolrzednych zdefiniowane
- [ ] Procedura przegladu i zatwierdzania udokumentowana

## Utrzymanie BEP

BEP to dokument zywy. Przegladaj go przy kazdej bramce fazowej. Aktualizuj, gdy:

- Nowe branze dolaczaja do projektu
- Zmieniaja sie wersje oprogramowania
- Zakres modelowania zmienia sie istotnie
- Procesy wykrywania kolizji wymagaja dostosowania

::: info
Przechowuj biezacy BEP w obszarze Opublikowane w [CDE](/pl/integracja-bim/cde). Poprzednie wersje umieszczaj w obszarze Archiwum dla zachowania sciezki audytowej.
:::

## Powiazane strony

- [Wspolne Srodowisko Danych (CDE)](/pl/integracja-bim/cde)
- [Matryca LOD/LOI](/pl/integracja-bim/lod-loi)
- [Mapowanie IFC](/pl/integracja-bim/encje-ifc)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Integracja BIM -- przeglad](/pl/integracja-bim/)
