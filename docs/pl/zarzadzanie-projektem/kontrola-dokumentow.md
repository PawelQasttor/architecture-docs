---
title: Kontrola dokumentów
description: Struktura folderów, nazewnictwo plików, rewizje, statusy i bramki zatwierdzania dokumentacji w standardzie SP-BLD.
---

# Kontrola dokumentów

Projekt architektoniczny generuje setki plików --- od kart Pomieszczeń, przez rysunki branżowe, po protokoły uzgodnień. Bez spójnych zasad kontroli dokumentów pojawia się ryzyko pracy na nieaktualnych wersjach, gubienia uzgodnień i chaosu rewizyjnego na budowie.

## Struktura folderów projektu

Zalecana struktura oparta jest na podziale branżowo-fazowym i jest spójna z organizacją [wspólnego środowiska danych (CDE)](/pl/integracja-bim/cde).

```
PROJEKT_NAZWA/
├── 00_ADMINISTRACJA/
│   ├── umowy/
│   ├── korespondencja/
│   ├── rejestry/            (decyzje, ryzyka, zmiany)
│   └── protokoly/
├── 01_WYTYCZNE/
│   ├── mpzp/
│   ├── warunki-techniczne/
│   └── uzgodnienia-gestorzy/
├── 02_KONCEPCJA/
├── 03_PROJEKT_WSTEPNY/
├── 04_PROJEKT_BUDOWLANY/
├── 05_PROJEKT_WYKONAWCZY/
│   ├── architektura/
│   ├── konstrukcja/
│   ├── instalacje-sanitarne/
│   ├── instalacje-elektryczne/
│   └── inne-branze/
├── 06_BIM/
│   ├── modele/
│   └── eksporty-ifc/
├── 07_BUDOWA/
│   ├── dziennik-budowy/
│   └── nadzor-autorski/
├── 08_POWYKONAWCZA/
└── 09_SZABLONY/
```

::: tip Zgodność z CDE
Jeżeli projekt korzysta ze [wspólnego środowiska danych](/pl/integracja-bim/cde), powyższa struktura może być odwzorowana jako przestrzenie lub kontenery w platformie CDE. Najważniejsze, by zachować spójność logiczną podziału.
:::

## Konwencja nazewnictwa plików

Każdy plik dokumentacji w standardzie SP-BLD powinien być nazwany według schematu:

```
{STANDARD}-{TYP}-{NR_BUDYNKU}-{KONDYGNACJA}-{NR_SEQ}_{nazwa-opisowa}_{wersja}.md
```

### Elementy nazwy

| Segment | Opis | Przykładowe wartości |
|---|---|---|
| `STANDARD` | Prefiks standardu | `SP` |
| `TYP` | Typ dokumentu | `BLD` (Budynek), `FLR` (Kondygnacja), `ZON` (Strefa), `ROM` (Pomieszczenie), `SYS` (Instalacja), `EQP` (Urządzenie), `REQ` (Wymaganie) |
| `NR_BUDYNKU` | Numer budynku w zespole | `01`, `02` |
| `KONDYGNACJA` | Oznaczenie kondygnacji | `L00` (parter), `L01` (piętro 1), `L-1` (podziemie) |
| `NR_SEQ` | Numer kolejny | `001`, `002`, ... |
| `nazwa-opisowa` | Czytelna nazwa (małe litery, myślniki) | `sypialnia-01`, `kotlownia` |
| `wersja` | Numer wersji | `v1.0`, `v2.1` |

### Przykłady nazw plików

| Plik | Znaczenie |
|---|---|
| `SP-BLD-01-L00-001_budynek-mieszkalny_v1.0.md` | Budynek nr 01, karta ogólna, wersja 1.0 |
| `SP-ROM-01-L01-003_sypialnia-01_v2.0.md` | Pomieszczenie --- sypialnia nr 1, piętro 1, wersja 2.0 |
| `SP-SYS-01-L00-001_instalacja-co_v1.2.md` | Instalacja centralnego ogrzewania, parter |
| `SP-REQ-01-L00-005_wymaganie-akustyka_v1.0.md` | Wymaganie akustyczne, parter |
| `SP-ZON-01-L01-002_strefa-dzienna_v1.1.md` | Strefa dzienna, piętro 1 |

::: warning Ważne
Nie używaj polskich znaków diakrytycznych w nazwach plików. Zamiast `łazienka` stosuj `lazienka`. Zapewnia to kompatybilność ze wszystkimi systemami operacyjnymi i platformami CDE.
:::

## Śledzenie rewizji

### Schemat numeracji wersji

Standard SP-BLD stosuje numerację dwupoziomową: **główna.poboczna** (np. `v1.0`, `v1.3`, `v2.0`).

| Zmiana | Wersja główna (X.0) | Wersja poboczna (X.n) |
|---|---|---|
| Kiedy podbijać? | Zmiana zakresu, nowa faza, zmiana zatwierdzona przez inwestora | Korekty redakcyjne, uzupełnienia, poprawki wewnętrzne |
| Przykład | `v1.0` → `v2.0` po zatwierdzeniu zmiany konstrukcji dachu | `v1.0` → `v1.1` po korekcie wymiarów okien |
| Wymaga zatwierdzenia? | Tak --- zgodnie z bramką zatwierdzania | Nie --- zatwierdzenie wewnętrzne zespołu |

### Nagłówek YAML --- pola rewizyjne

Każda karta w standardzie SP-BLD zawiera w nagłówku YAML pola do śledzenia wersji:

```yaml
---
version: "2.1"
status: "Zatwierdzony"
last_updated: "2025-04-10"
updated_by: "arch. Anna Nowak"
revision_history:
  - version: "1.0"
    date: "2025-01-15"
    author: "arch. Anna Nowak"
    description: "Wersja początkowa"
  - version: "2.0"
    date: "2025-03-20"
    author: "arch. Anna Nowak"
    description: "Zmiana układu funkcjonalnego (ZM-2025-003)"
  - version: "2.1"
    date: "2025-04-10"
    author: "arch. Piotr Wiśniewski"
    description: "Korekta powierzchni po pomiarach"
---
```

## Kody statusu dokumentu

Każdy dokument w projekcie ma przypisany status określający jego aktualny stan w procesie zatwierdzania.

| Kod | Status | Opis | Kolor znacznika |
|---|---|---|---|
| `S1` | **Roboczy** | Dokument w opracowaniu, nie do rozpowszechniania | Szary |
| `S2` | **Do przeglądu** | Gotowy do weryfikacji przez recenzenta lub inwestora | Żółty |
| `S3` | **Zatwierdzony** | Formalnie zatwierdzony, obowiązujący | Zielony |
| `S4` | **Zastąpiony** | Nieaktualny, zastąpiony nowszą wersją | Czerwony |

::: info Przepływ statusów
Dokument przechodzi kolejno: `S1` → `S2` → `S3`. Status `S4` nadawany jest automatycznie poprzedniej wersji po zatwierdzeniu nowej. Dokument w statusie `S4` nie może być podstawą do realizacji na budowie.
:::

## Bramki zatwierdzania

Zatwierdzanie dokumentów odbywa się na zakończenie każdej fazy. Poniższa tabela wskazuje, kto odpowiada za zatwierdzenie w poszczególnych fazach.

| Faza | Zatwierdza | Weryfikuje | Uwagi |
|---|---|---|---|
| [Koncepcja](/pl/fazy/koncepcja) | Inwestor | Architekt prowadzący | Zatwierdzenie programu funkcjonalnego |
| [Projekt wstępny](/pl/fazy/wstepny) | Inwestor | Architekt + projektanci branżowi | Zatwierdzenie rozwiązań technicznych |
| [Projekt budowlany](/pl/fazy/budowlany) | Organ administracji | Architekt prowadzący | Pozwolenie na budowę |
| [Projekt wykonawczy](/pl/fazy/wykonawczy) | Architekt prowadzący | Projektanci branżowi, koordynator BIM | Kompletność i spójność dokumentacji |
| [Budowa](/pl/fazy/budowa) | Kierownik budowy | Inspektor nadzoru, architekt (nadzór autorski) | Zgodność realizacji z projektem |
| [Dokumentacja powykonawcza](/pl/fazy/powykonawcza) | Inspektor nadzoru | Kierownik budowy, architekt | Zgodność ze stanem faktycznym |

Szczegółowe wymagania bramek opisano w sekcji [Bramki fazowe](/pl/jakosc/bramki-fazowe).

## Lista kontrolna --- kontrola dokumentów

- [ ] Wdrożono strukturę folderów zgodną ze standardem
- [ ] Uzgodniono konwencję nazewnictwa z zespołem projektowym
- [ ] Skonfigurowano pola rewizyjne w nagłówkach YAML
- [ ] Ustalono kody statusu i zasady ich stosowania
- [ ] Wyznaczono osoby zatwierdzające dla każdej fazy
- [ ] Przeszkolono zespół z procedur kontroli dokumentów
- [ ] Zarchiwizowano [szablony](/pl/szablony/) kart w strukturze projektu
