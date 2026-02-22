# Szablony Kart

Szablony to gotowe do skopiowania pliki Markdown z ustrukturyzowanym frontmatterem YAML dla kazdego rodzaju karty SBM (Semantyczny Model Budynku). Kazdy szablon zawiera poprawny schemat, wymagane pola i wbudowane wskazowki, dzieki czemu mozesz dokumentowac karty budynku w sposob spojny i bez zgadywania.

Wszystkie szablony stosuja ten sam wzorzec: blok frontmatter YAML definiujacy dane ustrukturyzowane, a nastepnie tresc Markdown do opisu w formie dowolnej i notatek.

::: tip Zanim Zaczniesz
Jesli po raz pierwszy pracujesz z kartami SBM, przeczytaj [Szybki Start](/pl/standardy/szybki-start), aby zrozumiec ogolny przeplyw pracy przed przejsciem do szablonow.
:::

---

## Dostepne Szablony

### Szablon Przestrzeni

**Do czego sluzy:** Dokumentowanie pomieszczen i obszarow funkcjonalnych -- sypialni, biur, korytarzy, kuchni, pomieszczen gospodarczych i dowolnych zdefiniowanych jednostek przestrzennych w budynku.

**Kiedy uzywac:** Programowanie architektoniczne, planowanie przestrzeni, rozwoj projektu i dokumentacja powykonawcza.

**Odnosnik:** [Szablon Przestrzeni](/pl/szablony/szablon-przestrzeni)

```yaml
---
entity: space
name: "Nazwa Pomieszczenia"
space_code: "SP-001"
floor: "Poziom 1"
area_m2: 0.0
function: "residential | office | circulation | service"
zone_refs: []
---
```

---

### Szablon Strefy

**Do czego sluzy:** Dokumentowanie stref nakladkowych, ktore grupuja przestrzenie wedlug kryteriow regulacyjnych lub srodowiskowych -- strefy pozarowe, akustyczne, HVAC, oswietleniowe i bezpieczenstwa.

**Kiedy uzywac:** Planowanie bezpieczenstwa pozarowego, projektowanie akustyczne, strefowanie HVAC i dokumentacja zgodnosci z przepisami.

**Odnosnik:** [Szablon Strefy](/pl/szablony/szablon-strefy)

```yaml
---
entity: zone
name: "Nazwa Strefy"
zone_code: "ZN-001"
zone_type: "fire | acoustic | hvac | lighting | security"
classification: ""
space_refs: []
requirement_refs: []
---
```

---

### Szablon Wymagania

**Do czego sluzy:** Dokumentowanie regul wydajnosciowych, ograniczen regulacyjnych i kryteriow projektowych, ktore musza spelniac przestrzenie, strefy lub systemy -- klasy odpornosci ogniowej, limity akustyczne, wskazniki wentylacji i klauzule przepisow budowlanych.

**Kiedy uzywac:** Analiza regulacyjna, definiowanie zalozen projektowych, sledzenie zgodnosci i dokumentacja przekazania.

**Odnosnik:** [Szablon Wymagania](/pl/szablony/szablon-wymagania)

```yaml
---
entity: requirement
name: "Nazwa Wymagania"
requirement_code: "REQ-001"
category: "fire | acoustic | thermal | ventilation | structural"
source: "Przepisy budowlane / Odniesienie do normy"
target_value: ""
unit: ""
---
```

---

### Szablon Systemu

**Do czego sluzy:** Dokumentowanie systemow MEP (mechanicznych, elektrycznych, wodno-kanalizacyjnych) i ich parametrow projektowych -- dystrybucja HVAC, obwody elektryczne, sieci wodno-kanalizacyjne i systemy gasnicze.

**Kiedy uzywac:** Projektowanie MEP, specyfikacja systemow, planowanie odbioru i dokumentacja eksploatacyjna.

**Odnosnik:** [Szablon Systemu](/pl/szablony/szablon-systemu)

```yaml
---
entity: system
name: "Nazwa Systemu"
system_code: "SYS-001"
system_type: "hvac | electrical | plumbing | fire_suppression"
serving_zones: []
asset_refs: []
requirement_refs: []
---
```

---

### Szablon Zasobu

**Do czego sluzy:** Dokumentowanie pojedynczych instancji urzadzen z danymi eksploatacyjnymi i konserwacyjnymi -- kotly, centrale wentylacyjne, pompy, rozdzielnice i dowolne urzadzenia serwisowalne zainstalowane w budynku.

**Kiedy uzywac:** Specyfikacja urzadzen, zamowienia, odbiory, zarzadzanie zasobami i planowanie konserwacji.

**Odnosnik:** [Szablon Zasobu](/pl/szablony/szablon-zasobu)

```yaml
---
entity: asset
name: "Nazwa Zasobu"
asset_code: "AST-001"
asset_type: "boiler | ahu | pump | switchboard"
manufacturer: ""
model: ""
system_ref: ""
location_space_ref: ""
---
```

---

## Ktory Szablon?

Uzyj ponizszej tabeli, aby znalezc odpowiedni szablon do dokumentowania danego elementu.

| Potrzebuje udokumentowac... | Uzyj tego szablonu |
|---|---|
| Pomieszczenie, sypialnię, biuro, korytarz | [Szablon Przestrzeni](/pl/szablony/szablon-przestrzeni) |
| Strefę pożarową, akustyczną, HVAC | [Szablon Strefy](/pl/szablony/szablon-strefy) |
| Regułę wydajnościową lub przepis | [Szablon Wymagania](/pl/szablony/szablon-wymagania) |
| System HVAC, elektryczny lub wodno-kanalizacyjny | [Szablon Systemu](/pl/szablony/szablon-systemu) |
| Konkretne urządzenie (kocioł, centrala, pompa) | [Szablon Zasobu](/pl/szablony/szablon-zasobu) |

::: tip Odniesienia Między Kartami
Karty odwoluja sie do siebie za pomoca pol `_refs`. Na przyklad Strefa odwoluje sie do swoich Pomieszczen przez `space_refs`, a Instalacja odwoluje sie do swoich Urzadzen przez `asset_refs`. Te odniesienia sa walidowane przez kompilator w celu zapewnienia spojnosci w calym projekcie.
:::

---

## Jak Uzywac Szablonu

Wykonaj te cztery kroki, aby utworzyc nowa karte z dowolnego szablonu.

**Krok 1 -- Skopiuj plik szablonu.**
Skopiuj plik Markdown szablonu do odpowiedniego folderu w swoim projekcie. Zmien jego nazwe, aby odpowiadala Twojej karcie (np. `bedroom-01.md`, `fire-zone-zl-iv.md`).

**Krok 2 -- Wypelnij pola frontmatter YAML.**
Zastap wartosci zastępcze swoimi rzeczywistymi danymi. Wymagane pola sa wskazane w kazdym szablonie. Uzyj odniesienia [Schema Frontmatter](/pl/standardy/schema-frontmatter) dla definicji pol i dozwolonych wartosci.

**Krok 3 -- Dodaj opis Markdown ponizej frontmattera.**
Napisz opis karty w jezyku naturalnym. Uwzglednij zamierzenia projektowe, istotne ograniczenia, odpowiednie zdjecia lub dowolny kontekst, ktorego same pola ustrukturyzowane nie sa w stanie oddac.

**Krok 4 -- Zwaliduj kompilatorem.**
Uruchom kompilator SBM na swoim projekcie, aby sprawdzic, czy wszystkie wymagane pola sa obecne, odniesienia krzyzowe sa poprawne, a wartosci sa zgodne ze schematem.

::: tip Walidacja Wychwytuje Bledy Wczesnie
Zawsze waliduj po dodaniu lub modyfikacji karty. Kompilator wykryje brakujace wymagane pola, uszkodzone odniesienia krzyzowe i nieprawidlowe wartosci wyliczeniowe, zanim spowoduja problemy na dalszych etapach.
:::

---

## Przyklady w Praktyce

Zobacz ukonczone karty zbudowane na podstawie tych szablonow w przykladowym projekcie Zielony Taras.

| Szablon | Przykladowa Karta |
|---|---|
| Przestrzen | [Sypialnia 01 (Zielony Taras)](/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01) |
| Strefa | [Strefa Pozarowa ZL-IV (Zielony Taras)](/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv) |

Te przyklady przedstawiaja rzeczywiste wartosci frontmatter, poprawnie sformulowane odniesienia krzyzowe i opisowa tresc Markdown zgodna z konwencjami [Przewodnika Tworzenia](/pl/dokumentacja/tworzenie/).

---

## Powiazane Zasoby

| Zasob | Opis |
|---|---|
| [Szybki Start](/pl/standardy/szybki-start) | Utworz swoja pierwsza karte od podstaw |
| [Przewodnik Tworzenia](/pl/dokumentacja/tworzenie/) | Szczegolowe instrukcje pisania i konwencje |
| [Schema Frontmatter](/pl/standardy/schema-frontmatter) | Kompletne odniesienie pol dla wszystkich rodzajow kart |
| [Przewodnik Eksportu PDF](/pl/przewodniki/eksport-pdf) | Generuj profesjonalne pliki PDF z Twoich kart |
