# Zapewnienie jakości

System zapewnienia jakości (QA) stanowi fundament rzetelnej dokumentacji architektonicznej. Dzięki ustrukturyzowanym procedurom kontrolnym wykrywamy błędy na wczesnych etapach projektu -- zanim staną się kosztowne w realizacji.

## Dlaczego zapewnienie jakości ma znaczenie

Praktyka projektowa w Polsce jednoznacznie potwierdza: **błąd wykryty na etapie koncepcji kosztuje kilkaset złotych, ten sam błąd odkryty na budowie -- kilkadziesiąt tysięcy**. Najczęstsze konsekwencje braku kontroli jakości:

- **Opóźnienia w uzyskaniu pozwolenia na budowę** -- niekompletna dokumentacja wraca z urzędu do poprawy, co wydłuża proces o tygodnie lub miesiące.
- **Kolizje międzybranżowe** -- brak koordynacji między architekturą, konstrukcją i instalacjami prowadzi do kosztownych zmian na placu budowy.
- **Niezgodność z przepisami** -- pominięcie wymagań Warunków Technicznych, norm pożarowych lub akustycznych skutkuje koniecznością przeprojektowania.
- **Utrata zaufania inwestora** -- powtarzające się błędy podważają wiarygodność biura projektowego.

::: tip Zasada 1:10:100
Koszt naprawy błędu rośnie wykładniczo z każdą fazą projektu. Wczesna kontrola to najlepsza inwestycja w jakość dokumentacji.
:::

## Trzy warstwy kontroli jakości

System QA opiera się na trzech uzupełniających się warstwach:

| Warstwa | Kto wykonuje | Kiedy | Cel |
|---------|-------------|-------|-----|
| **Autokontrola** | Autor dokumentu | Na bieżąco, przed przekazaniem | Sprawdzenie kompletności, poprawności oznaczeń, zgodności z szablonem |
| **Przegląd koleżeński** | Inny projektant z zespołu | Po zakończeniu opracowania danego zakresu | Weryfikacja merytoryczna, wyłapanie pominięć, świeże spojrzenie |
| **Bramka fazowa** | Kierownik projektu / główny projektant | Przed przejściem do kolejnej fazy | Formalna akceptacja kompletności i jakości całego etapu |

::: info Warstwy działają kumulacyjnie
Każda kolejna warstwa zakłada, że poprzednia została wykonana. Bramka fazowa nie zastępuje autokontroli -- uzupełnia ją o perspektywę całego projektu.
:::

## Powiązanie z fazami projektu

System QA jest zintegrowany z [8 fazami dokumentacji](/pl/fazy/rozpoczecie). Każda faza kończy się bramką, której przejście wymaga spełnienia określonych kryteriów. Poniższa tabela przedstawia główne czynności kontrolne w poszczególnych fazach:

| Faza | Czynności QA | Kluczowe dokumenty do weryfikacji |
|------|-------------|-----------------------------------|
| [Rozpoczęcie](/pl/fazy/rozpoczecie) | Weryfikacja danych wejściowych, sprawdzenie warunków zabudowy / MPZP | Karta Budynku, dane geodezyjne |
| [Koncepcja](/pl/fazy/koncepcja) | Przegląd wariantów, zgodność z wytycznymi inwestora | Karty Stref, schematy funkcjonalne |
| [Projekt wstępny](/pl/fazy/wstepny) | Przegląd koordynacyjny międzybranżowy, wstępna kontrola przepisów | Karty Pomieszczeń, Karty Instalacji |
| [Projekt budowlany](/pl/fazy/budowlany) | Pełna kontrola zgodności z WT, przegląd dokumentacji do pozwolenia | Karty Wymagań, projekt zagospodarowania |
| [Projekt wykonawczy](/pl/fazy/wykonawczy) | Kontrola detali, sprawdzenie specyfikacji materiałowych | Karty Urządzeń, detale architektoniczne |
| [Budowa](/pl/fazy/budowa) | Nadzór autorski, weryfikacja zmian projektowych | Protokoły nadzoru, karty zmian |
| [Dokumentacja powykonawcza](/pl/fazy/powykonawcza) | Sprawdzenie zgodności z realizacją, aktualizacja modelu | Karty powykonawcze, pomiary |
| [Przekazanie](/pl/fazy/przekazanie) | Kompletność dokumentacji przekazanej, archiwizacja | Dokumentacja użytkowa, instrukcje |

## Struktura sekcji Jakość

Szczegółowe procedury znajdziesz na podstronach:

- **[Bramki fazowe](./bramki-fazowe)** -- listy kontrolne dla każdej z 8 bramek, gotowe do wydruku i użycia w praktyce.
- **[Procedury przeglądów](./procedury-przegladow)** -- zasady prowadzenia przeglądów wewnętrznych, koordynacyjnych i z inwestorem.

## Powiązania z innymi sekcjami

System QA nie działa w izolacji. Łączy się z pozostałymi obszarami standardu:

- **[Zarządzanie projektem](/pl/zarzadzanie-projektem/)** -- bramki fazowe są elementem harmonogramu i [kontroli dokumentów](/pl/zarzadzanie-projektem/kontrola-dokumentow).
- **[Integracja BIM](/pl/integracja-bim/)** -- kontrola modelu BIM stanowi część każdej bramki fazowej, zgodnie z [Planem Realizacji BIM (BEP)](/pl/integracja-bim/bep).
- **[Przepisy](/pl/przepisy/)** -- weryfikacja zgodności z obowiązującymi normami i rozporządzeniami jest stałym elementem przeglądów.

::: warning Odpowiedzialność
Każdy członek zespołu projektowego odpowiada za jakość swojej pracy. System QA wspiera tę odpowiedzialność, ale jej nie zastępuje. Główny projektant odpowiada za koordynację i ostateczną weryfikację całości dokumentacji.
:::

## Najczęstsze błędy w dokumentacji

Na podstawie doświadczeń polskich biur projektowych, najczęściej wykrywane uchybienia to:

| Kategoria | Przykłady | Warstwa wykrycia |
|-----------|-----------|-----------------|
| Kompletność | Brak kart Pomieszczeń dla całych stref, pominięte Kondygnacje | Autokontrola |
| Spójność | Rozbieżności wymiarów między rzutem a przekrojem, niezgodne oznaczenia | Przegląd koleżeński |
| Zgodność z przepisami | Niedotrzymanie szerokości dróg ewakuacyjnych, przekroczenie wskaźnika intensywności zabudowy | Bramka fazowa |
| Koordynacja | Kolizja trasy wentylacji z konstrukcją, brak miejsca na rozdzielnie | Przegląd koordynacyjny |
| Metadane | Niekompletne nagłówki YAML, brak powiązań między kartami | Autokontrola |

Systematyczne stosowanie procedur QA opisanych w tej sekcji pozwala ograniczyć liczbę tych błędów i podnieść jakość dokumentacji projektowej.
