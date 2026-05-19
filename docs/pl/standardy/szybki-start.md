# Szybki start (5 minut)

Od zera do gotowego raportu budynku w pięć minut. Nowy temat? Przeczytaj
najpierw **[Czym jest SBM?](/pl/standardy/wprowadzenie)** (2 min) — ta
strona jest wyłącznie praktyczna.

---

## 1. Jeden plik = jedna rzecz

Każde pomieszczenie, strefa, instalacja i urządzenie to **jeden plik
tekstowy**: blok strukturalny (dla komputerów) i opis dla ludzi poniżej.
Utwórz `sypialnia-01.md`:

```markdown
---
entityType: "space"
id: "SP-L01-001"
projectPhase: "concept"
spaceName: "Sypialnia 01"
buildingId: "BLD-01"
levelId: "LVL-01"
designArea: 14.5
unit: "m"
---

# Sypialnia 01

Dwuosobowa sypialnia od południa. Wykończenia i wymagania są dziedziczone
z kondygnacji i typu przestrzeni — ten plik podaje tylko to, co specyficzne
dla *tego* pomieszczenia.
```

To poprawna encja SBM. Bez bazy danych, bez specjalnego oprogramowania —
wystarczy Notatnik i folder.

## 2. Pliki odwołują się do siebie

`sypialnia-01.md` zawiera `buildingId: "BLD-01"`. Utwórz budynek, na który
wskazuje (`budynek.md`), oraz kondygnację (`poziom-01.md`):

```markdown
---
entityType: "building"
id: "BLD-01"
name: "Mój Budynek"
version: "2.0.0"
---
```
```markdown
---
entityType: "level"
id: "LVL-01"
buildingId: "BLD-01"
version: "2.0.0"
levelName: "First Floor"
---
```

Kompilator sam rozwiązuje powiązania, dziedziczenie i wymagania przepisowe.

## 3. Kompiluj → otrzymaj raport

Wskaż kompilatorowi folder:

```bash
node scripts/compiler/index.mjs compile \
  --input ./moj-projekt --output ./build --country PL
```

Waliduje wszystko, a następnie zapisuje cele JSON **oraz czytelny dla
człowieka `report.html`** — gotowość fazową, postęp weryfikacji, jakość
danych i zgodność na jednej stronie do druku.

> Chcesz zobaczyć bez tworzenia czegokolwiek? Uruchom `npm run sbm:report`
> i otwórz `build/green-terrace/report.html` lub zobacz
> [przykładowy raport](/green-terrace-report.html).

## 4. To cała pętla

Tworzysz czysty tekst → kompilujesz → otrzymujesz parametry BIM, raporty
zgodności, rejestry zasobów i raport HTML. Te same pliki służą architektom,
inżynierom, inspektorom i zarządcom. Zmieniasz wartość raz; jest poprawna
wszędzie.

---

## Co dalej

| Cel | Strona |
|-----|--------|
| Zrozumieć *dlaczego* to istnieje | [Czym jest SBM?](/pl/standardy/wprowadzenie) |
| Zobaczyć kompletny projekt | [Zielony Taras — przewodnik](/pl/przyklady/zielony-taras/) |
| 27 typów encji | [Typy dokumentów](/pl/dokumentacja/encje/) |
| Dziedziczenie typ/instancja | [Typ Przestrzeni](/pl/dokumentacja/encje/typ-przestrzeni) · [Dziedziczenie właściwości](/pl/przewodniki/dziedziczenie-wlasciwosci) |
| Kiedy co tworzyć | [Cykl życia (10 faz)](/pl/fazy/) |
| Jak działa kompilator | [Kompilator](/pl/dokumentacja/kompilator/) |

Utknąłeś? Każdy typ encji ma stronę referencyjną z gotowym szablonem w
sekcji [Typy dokumentów](/pl/dokumentacja/encje/).
