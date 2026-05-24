# Zielony Taras Park — przykład Kampusu

**Wielobudynkowe osiedle mieszkaniowe** z Zielonym Tarasem BLD-01 jako
jednym z czterech siostrzanych bloków. Demonstruje **encję Campus**
(ostatnią z 27 typów encji SBM v2.0 otrzymującą działający przykład)
oraz wspólną infrastrukturę terenową, systemy międzybudynkowe i
**rodzeństwo w różnych fazach cyklu życia**.

**Kampus:** [`CAM-GREEN-TERRACE-PARK`](/pl/przyklady/zielony-taras-park/kampus) ·
4 budynki · ~7 200 m² łącznego GFA · ~72 mieszkania · wspólna pętla
ciepłownicza · ogród wspólnotowy, plac zabaw, hub ładowania EV, schowek na rowery.

**Pozycja w cyklu życia:** mieszana — budynki są w różnych fazach
w miarę rozwoju kampusu:

| Budynek | Faza | Uwagi |
|---|---|---|
| **BLD-01 — Zielony Taras** | `commissioning` / `operation` | Flagowy — patrz przykład [projektowy](/pl/przyklady/zielony-taras/) i [eksploatacyjny](/pl/przyklady/zielony-taras-2028/) |
| **BLD-02 — Słoneczny Półksiężyc** | `construction` | Blok rodzinny, 24 lokale, konstrukcja zakończona |
| **BLD-03 — Dziedziniec Lipowy** | `design_development` | Blok o podwyższonej dostępności, 18 lokali |
| **BLD-04 — Pawilon Dębowy** | `schematic_design` | Blok 1-pokojowy, 12 lokali, oczekuje zatwierdzenia planistycznego |

---

## Co pokazuje ten przykład

- **Encja `Campus`** — szczyt hierarchii. Agreguje działki, wspólną
  infrastrukturę i systemy obejmujące cały kampus.
- **Rollup faz w rodzeństwie** — Kampus niesie budynki w czterech różnych
  fazach jednocześnie. Kompilator raportuje gotowość kampusu jako
  *minimum* gotowości jego dzieci.
- **Systemy międzybudynkowe** — jedna pętla ciepłownicza z wieloma
  `buildingIds`, demonstrująca jak System może obejmować budynki.
- **Wspólna infrastruktura terenowa** — plac zabaw, hub EV, schowek na
  rowery, ogród wspólnotowy — referowane z Kampusu, nie z któregokolwiek Budynku.
- **Rodzeństwo Pakietu Wykonawczego** — `CP-SITE-INFRASTRUCTURE` obejmuje
  ogólnokampusowe roboty ziemne + magistrale DH, odrębne od per-budynkowych CP.
- **Zgłoszenie o zasięgu kampusu** — warunek planistyczny wpływający na
  wszystkie 4 budynki, własność Kampusu, nie Budynku.

## Nawigacja

| Obszar | Zacznij tu |
|------|-----------|
| Korzeń kampusu | [`CAM-GREEN-TERRACE-PARK`](/pl/przyklady/zielony-taras-park/kampus) |
| Budynki | [BLD-01 (flagowy)](/pl/przyklady/zielony-taras/budynek) · [BLD-02 Słoneczny Półksiężyc](/pl/przyklady/zielony-taras-park/budynki/BLD-02-sloneczny-polksiezyc) · [BLD-03 Dziedziniec Lipowy](/pl/przyklady/zielony-taras-park/budynki/BLD-03-dziedziniec-lipowy) · [BLD-04 Pawilon Dębowy](/pl/przyklady/zielony-taras-park/budynki/BLD-04-pawilon-debowy) |
| Wspólny system | [Pętla ciepłownicza](/pl/przyklady/zielony-taras-park/systemy/SYS-DH-LOOP-CAMPUS) |
| Wspólne elementy terenu | [Plac zabaw](/pl/przyklady/zielony-taras-park/elementy-terenu/SF-PLAYGROUND) · [Ładowanie EV](/pl/przyklady/zielony-taras-park/elementy-terenu/SF-EV-HUB) · [Schowek na rowery](/pl/przyklady/zielony-taras-park/elementy-terenu/SF-BIKE-STORAGE) · [Ogród wspólnotowy](/pl/przyklady/zielony-taras-park/elementy-terenu/SF-COMMUNAL-GARDEN) |
| Wspólny CP | [CP infrastruktury terenowej](/pl/przyklady/zielony-taras-park/pakiety-budowlane/CP-SITE-INFRASTRUCTURE) |
| Zgłoszenie kampusu | [Warunek planistyczny](/pl/przyklady/zielony-taras-park/zgloszenia/ISS-CAMPUS-PLANNING-001) |

## Dlaczego to osobny przykład

Pojedynczo-budynkowe przykłady Zielonego Tarasu (projektowy + eksploatacja)
celowo pozostają ciasno zakresione. Kampus pokazuje *różne* mechaniki:
- Hierarchię wielobudynkową
- Systemy międzybudynkowe
- Infrastrukturę terenową, która nie należy do żadnego pojedynczego budynku
- Wariancję faz w rodzeństwie

Próba wciśnięcia tego do przykładu projektowego albo go rozdęłaby, albo
zaciemniła narrację dydaktyczną typ/instancja ("Śledź Sypialnię 01"),
która sprawia, że to działa.

## Uwagi o danych

To jest **szkieletowy** przykład — BLD-02/03/04 niosą minimalne dane,
wystarczająco, by skompilować i zademonstrować mechaniki Kampusu.
Flagowy budynek (BLD-01) to przykład głębokościowy; pozostałe to
szerokościowe rodzeństwo. Jeśli potrzebujesz zobaczyć, jak wygląda pełna
per-budynkowa szczegółowość, [projektowy przykład Zielonego Tarasu](/pl/przyklady/zielony-taras/)
jest właściwym miejscem.
