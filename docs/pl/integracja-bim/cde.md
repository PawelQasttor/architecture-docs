# Wspolne Srodowisko Danych (CDE)

Wspolne Srodowisko Danych to jedno zrodlo prawdy dla wszystkich informacji projektowych. Jest to uzgodniona przestrzen cyfrowa, w ktorej modele, rysunki, dokumenty i dane sa przechowywane, zarzadzane i udostepniane przez caly cykl zycia projektu.

## Dlaczego CDE ma znaczenie

Bez CDE zespoly projektowe polegaja na zalacznikach e-mail, dyskach lokalnych i nieformalnym udostepnianiu plikow. Prowadzi to do konfliktow wersji, zagubionych dokumentow i bledow koordynacyjnych. CDE eliminuje te ryzyka zapewniajac:

- **Jedno zrodlo prawdy** -- wszyscy korzystaja z tych samych aktualnych plikow
- **Kontrolowany dostep** -- uprawnienia zapewniaja, ze odpowiednie osoby widza odpowiednie dokumenty
- **Sciezka audytowa** -- kazde wgranie, przeglad i zatwierdzenie jest rejestrowane
- **Sledzenie statusu** -- dokumenty przechodza przez zdefiniowane stany obiegu

::: tip
Wdroz CDE podczas [fazy Rozpoczecia](/pl/fazy/rozpoczecie), zanim powstana jakiekolwiek pliki projektowe. Powinno to byc zdefiniowane w [Planie Realizacji BIM](/pl/integracja-bim/bep).
:::

## Struktura folderow

CDE jest zorganizowane w cztery glowne obszary, zgodnie z zasadami ISO 19650:

| Obszar | Cel | Kto ma dostep | Typowa zawartosc |
|---|---|---|---|
| **Robocze (WIP)** | Aktywny obszar roboczy kazdej branzy | Tylko czlonkowie zespolu branzowego | Wersje robocze modeli, szkice, obliczenia wewnetrzne |
| **Udostepnione (SHR)** | Obszar koordynacji miedzybranzowej | Wszyscy czlonkowie zespolu projektowego | Skoordynowane modele, rysunki udostepnione, raporty kolizji |
| **Opublikowane (PUB)** | Zatwierdzone produkty dla inwestora i organow | Inwestor, kierownik projektu, organy | Zatwierdzone rysunki, raporty, wnioski |
| **Archiwum (ARC)** | Zastapione wersje zachowane do audytu | Menedzer BIM, Menedzer Informacji | Poprzednie rewizje, zamkniete dokumenty |

### Szczegolowa hierarchia folderow

W ramach kazdego obszaru pliki organizowane sa wedlug branzy i typu:

```
WIP/
  ARC/          (Architektura)
    Modele/
    Rysunki/
    Zestawienia/
  KON/          (Konstrukcja)
    Modele/
    Obliczenia/
  INS/          (Instalacje)
    Modele/
    Specyfikacje/
  KRA/          (Krajobraz)
SHR/
  Koordynacja/
    Raporty kolizji/
    Modele laczne/
  Spotkania/
PUB/
  Produkty dla inwestora/
  Wnioski do organow/
  BEP/
ARC/
  Zastapione/
  Zamkniete/
```

::: warning
Nigdy nie przechowuj plikow poza zdefiniowana struktura folderow. Pliki bez przypisania podwazaja cel CDE i wprowadzaja zamieszanie co do statusu dokumentow.
:::

## Uprawnienia dostepu wedlug roli

| Rola | WIP (wlasna branza) | WIP (inne branze) | Udostepnione | Opublikowane | Archiwum |
|---|---|---|---|---|---|
| Menedzer BIM | Pelny dostep | Odczyt | Pelny dostep | Pelny dostep | Pelny dostep |
| Koordynator BIM | Pelny dostep | Odczyt | Wgrywanie + odczyt | Odczyt | Odczyt |
| Autor Modelu | Pelny dostep | Brak dostepu | Odczyt | Odczyt | Brak dostepu |
| Kierownik Projektu | Odczyt | Odczyt | Odczyt | Pelny dostep | Odczyt |
| Inwestor | Brak dostepu | Brak dostepu | Brak dostepu | Odczyt | Odczyt |
| Wykonawca | Brak dostepu | Brak dostepu | Odczyt (wybrane) | Odczyt | Brak dostepu |

::: info
Uprawnienia dostepu powinny byc przegladane przy kazdej bramce fazowej. Gdy projekt przechodzi z [Projektu Budowlanego](/pl/fazy/budowlany) do [Projektu Wykonawczego](/pl/fazy/wykonawczy), wykonawcy moga potrzebowac szerszego dostepu do obszaru Udostepnione.
:::

## Nazewnictwo plikow w CDE

Wszystkie pliki w CDE musza byc zgodne z konwencja nazewnictwa zdefiniowana w [BEP](/pl/integracja-bim/bep). Standardowy wzor:

```
[Projekt]-[Branza]-[Strefa]-[Kondygnacja]-[Typ]-[Status]-[Rewizja]
```

**Kody statusu stosowane w CDE:**

| Kod | Status | Znaczenie |
|---|---|---|
| S0 | Roboczy | W opracowaniu, nie do koordynacji |
| S1 | Koordynacja | Odpowiedni do przegladu miedzybranzowego |
| S2 | Informacja | Tylko do wiadomosci, nie do projektowania |
| S3 | Przeglad i uwagi | Wydany do formalnego przegladu |
| S4 | Zatwierdzony | Formalnie zatwierdzony na biezacy etap |
| S5 | Budowa | Zatwierdzony do realizacji |
| S6 | Powykonawczy | Odzwierciedla stan zbudowanego obiektu |
| S7 | Zarchiwizowany | Zastapiony, zachowany w dokumentacji |

## Obieg przegladow

Dokumenty przechodza przez CDE zgodnie ze zdefiniowanym procesem przegladu:

### Standardowy obieg przegladu

```
Autor wgrywa do Roboczego (S0)
    |
Autor sprawdza i przenosi do Udostepnione (S1)
    |
Koordynator BIM sprawdza zgodnosc branzowa
    |
    +-- Odrzucone: wraca do Roboczego z uwagami
    |
    +-- Zaakceptowane: Menedzer BIM sprawdza koordynacje miedzybranzowa
            |
            +-- Odrzucone: wraca do Udostepnione z uwagami
            |
            +-- Zaakceptowane: przeniesione do Opublikowane (S4 lub S5)
```

### Odpowiedzialnosci za przeglad

| Etap przegladu | Recenzent | Sprawdza |
|---|---|---|
| Autokontrola | Autor Modelu | Kompletnosc, zgodnosc nazewnictwa, osiagniecie LOD |
| Kontrola branzowa | Koordynator BIM | Spojnosc wewnetrzna, zgodnosc ze standardami |
| Kontrola koordynacyjna | Menedzer BIM | Kolizje miedzybranzowe, kompletnosc danych |
| Przeglad inwestora | Kierownik Projektu / Inwestor | Zgodnosc z zamierzeniem projektowym |
| Wniosek do organow | Menedzer Informacji | Zgodnosc z przepisami, format wniosku |

### Terminy przegladow

| Typ dokumentu | Okres przegladu | Eskalacja po |
|---|---|---|
| Pliki modeli | 5 dni roboczych | 7 dniach roboczych |
| Rysunki | 3 dni robocze | 5 dniach roboczych |
| Specyfikacje | 5 dni roboczych | 7 dniach roboczych |
| Raporty kolizji | 2 dni robocze | 3 dniach roboczych |
| RFI (zapytania) | 3 dni robocze | 5 dniach roboczych |

::: warning
Przeglady przekraczajace termin eskalacji musza byc zglaszane w systemie sledzenia projektu. Powtarzajace sie opoznienia powinny byc omawiane na najblizszym spotkaniu projektowym.
:::

## Popularne platformy CDE

| Platforma | Mocne strony | Uwagi |
|---|---|---|
| Autodesk Construction Cloud (BIM 360) | Gleboka integracja z Revit, solidne wykrywanie kolizji | Koszty licencji, glownie ekosystem Autodesk |
| Trimble Connect | Dobra obsluga IFC, dzialanie miedzyplatformowe | Mniejszy udzial w rynku, mniej integracji |
| Dalux | Mocne zarzadzanie na budowie, latwy dostep mobilny | Mniej odpowiedni dla duzych zlozonych modeli |
| Aconex (Oracle) | Rozbudowana kontrola dokumentow, mocny w infrastrukturze | Zlozona konfiguracja, wyzszy naklad administracyjny |
| PlanRadar | Popularny w Polsce, dobry do zarzadzania usterkami | Ograniczone mozliwosci modelowania BIM |

::: info
Wybor platformy CDE powinien byc uzgodniony w [BEP](/pl/integracja-bim/bep) podczas [fazy Rozpoczecia](/pl/fazy/rozpoczecie). Nalezy wziac pod uwage ekosystem oprogramowania juz uzywany oraz mozliwosci techniczne wszystkich uczestnikow projektu.
:::

## Polaczenie CDE z kontrola dokumentow

Standard traktuje CDE jako szkielet kontroli dokumentow projektu. Kazdy dokument wskazany w produktach fazowych (patrz [przeglad faz](/pl/fazy/rozpoczecie)) musi istniec w CDE z prawidlowymi kodami statusu.

Kluczowe punkty integracji:

- **Bramki fazowe** -- tylko dokumenty ze statusem Opublikowane (S4+) licza sie jako produkty koncowe
- **Wykrywanie kolizji** -- raporty sa przechowywane w obszarze Udostepnione i powiazane z wersjami modeli
- **[Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)** -- dane wymieniane miedzy modelami BIM a baza danych standardu podlegaja zasadom nazewnictwa i wersjonowania CDE
- **[Dane o wyposazeniu](/pl/integracja-bim/czujniki-iot)** -- dane czujnikow i urzadzen mapowane podczas przekazania sa archiwizowane w CDE na potrzeby zarzadzania obiektem

## Lista kontrolna konfiguracji CDE

- [ ] Platforma wybrana i licencje zakupione
- [ ] Struktura folderow utworzona wedlug standardowej hierarchii
- [ ] Uprawnienia dostepu skonfigurowane dla wszystkich czlonkow zespolu
- [ ] Konwencja nazewnictwa udokumentowana i zakomunikowana
- [ ] Obieg przegladow skonfigurowany na platformie
- [ ] Kody statusu zmapowane na stany obiegu platformy
- [ ] Szkolenie przeprowadzone dla wszystkich uzytkownikow
- [ ] BEP zaktualizowany o szczegoly CDE
- [ ] Plan awaryjny i odtwarzania danych potwierdzony

## Powiazane strony

- [Plan Realizacji BIM (BEP)](/pl/integracja-bim/bep)
- [Matryca LOD/LOI](/pl/integracja-bim/lod-loi)
- [Mapowanie IFC](/pl/integracja-bim/encje-ifc)
- [Synchronizacja dwukierunkowa](/pl/integracja-bim/synchronizacja-dwukierunkowa)
- [Integracja BIM -- przeglad](/pl/integracja-bim/)
