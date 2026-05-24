# SBM v2.2 — luki schematu ujawnione przez przykład fazy eksploatacji

Budowa przykładu Zielony Taras 2028 ujawniła pięć miejsc, w których
schemat v2.0 nie modeluje czysto tego, czego potrzebuje faza eksploatacji.
Żadne nie jest krytyczne — każda luka ma wykonalną reprezentację v2.0
— ale każda jest na tyle nośna, że właściwe rozszerzenie encji lub pola
w v2.2 poprawiłoby zarówno ergonomię autoringu, jak i możliwości kompilatora.

Ten dokument jest **listą wejściową dla przeglądu standardu v2.2**. Każda
luka ma: (1) co to jest, (2) gdzie w przykładzie 2028 ugryzła, (3) obejście
v2.0 użyte tutaj, (4) proponowany kształt v2.2.

---

## 1. Telemetria czasowa / dane czujnikowe

### Co to jest

Ciągłe strumienie danych numerycznych z BMS, podliczników, urządzeń IoT —
surowe pomiary, z których korzystają analitycy fazy eksploatacji.

### Gdzie ugryzła

Niemal wszędzie w tym przykładzie:
- [`AST-HP-01`](./zasoby/ai-hp-01-ops): COP i godziny pracy przez 22 miesiące
- [`AST-MVHR-01`](./zasoby/ai-mvhr-01-ops): trend sprawności odzysku ciepła
- [`SP-BLD-01-L04-002`](./przestrzenie/sypialnia-402): średnia krocząca CO₂ 90-dniowa
- [`SYS-HVAC-01`](./systemy/sys-hvac-01): czas pracy całego systemu + COP
- Dokument weryfikacji energetycznej: miesięczne odczyty liczników za rok

### Obejście v2.0

Pole `dataSource` wskazujące na ścieżkę zewnętrznego pliku CSV, ze statystykami
podsumowującymi (średnie, trendy) asercjonowanymi przez człowieka w encji.
Kompilator nie może walidować danych źródłowych, nie może sam obliczać
podsumowań i nie może wykrywać przekroczeń progów.

### Proponowany kształt v2.2

```yaml
entityType: "telemetry_stream"
id: "TEL-CO2-402-001"
sensorChannel: "co2_ppm"
sourceDeviceId: "BMS-CO2-402-001"
measuredEntityId: "SP-BLD-01-L04-002"
measuredEntityType: "space"
samplingFrequency: "5min"
unit: "ppm"
dataReference:
  protocol: "file_csv"
  path: "telemetry/SP-BLD-01-L04-002-co2-2026-04-to-2028-01.csv"
  fingerprint: "sha256:abc..."
  rowCountAsOf: 184320
  periodStart: "2026-04-01T00:00:00Z"
  periodEnd: "2028-01-31T23:59:59Z"
summaryStatistics:
  basis: "human_asserted"
  rollingMeans:
    - window: "90d"
      value: 1180
      asOf: "2028-01-31"
  thresholds:
    - kind: "design_target"
      operator: "<="
      value: 1000
      currentlyExceeded: true
    - kind: "regulatory_limit"
      operator: "<="
      value: 1500
      currentlyExceeded: false
```

Kompilator może wtedy: walidować stan przekroczenia progów we wszystkich
strumieniach telemetrii, generować raporty zgodności fazy eksploatacji
z rzeczywistych danych, rysować trendy w raporcie HTML.

---

## 2. Historia eksploatacji zasobu

### Co to jest

Zapisy kluczowane czasowo godzin pracy, zdarzeń serwisowych, parametrów
wydajności, wymiany części przez życie zasobu.

### Gdzie ugryzła

Wszystkie trzy zasoby fazy eksploatacji:
- [`AST-HP-01`](./zasoby/ai-hp-01-ops) — 5 zdarzeń serwisowych + trend COP
- [`AST-MVHR-01`](./zasoby/ai-mvhr-01-ops) — 5 zdarzeń + trend odzysku ciepła
- [`AST-UFH-MANIFOLD-01`](./zasoby/ai-ufh-manifold-01-ops) — 4 zdarzenia + 2 awarie zaworów

### Obejście v2.0

Niestandardowy blok `operationalHistory` dodany do encji `asset` (schemat
pozwala na `additionalProperties: true` na `asset`, więc blok waliduje
jako nieprzezroczyste dane). Kompilator nie rozumie jego treści.

### Proponowany kształt v2.2

Rozszerzyć definicję schematu `asset` o jawny pod-schemat
`operationalHistory` (patrz wersja EN dla pełnego JSON Schema YAML).

Z tym, cel rejestru zasobów kompilatora może: obliczać całkowity koszt
konserwacji na zasób, oznaczać zasoby zbliżające się do końca życia
według liczby cykli, krzyżowo łączyć zdarzenia serwisowe ze zgłoszeniami,
które rozwiązały.

---

## 3. Ankiety mieszkańców / opinie IEQ

### Co to jest

Strukturalne odpowiedzi kwestionariuszowe od mieszkańców budynku, ocenione
w wielu wymiarach komfortu/zadowolenia.

### Gdzie ugryzła

[Podsumowanie ankiety mieszkańców](./podsumowanie-ankiety-mieszkancow) —
12 z 18 mieszkań zwróciło 12-wymiarowe odpowiedzi w skali Likerta.

### Obejście v2.0

Dokument markdown narracyjny z tabelą podsumowującą; brak wsparcia encji.
Kompilator nie może agregować, krzyżowo referować ani trendować ocen
ankiet między latami.

### Proponowany kształt v2.2

Nowa encja `occupant_survey` z polami: identyfikator, typ ankiety, budynek,
okres, wskaźnik odpowiedzi, wymiary (każdy z meanScore, percentSatisfied,
flagged), wskazania tekstu wolnego z referencjami do dotkniętych encji
i wywołanych zgłoszeń, referencja danych do zewnętrznego CSV, metodologia.

Z tym kompilator może: generować raporty trendów rok-do-roku, łączyć
oznaczone wymiary z wywołanymi zgłoszeniami, identyfikować skupiska
przestrzeni z wspólnymi skargami.

---

## 4. Weryfikacja energetyczna w użyciu

### Co to jest

Roczne uzgodnienie energetyczne: zmierzone zużycie energii vs prognoza
projektowa, znormalizowane dla rzeczywistego zasiedlenia/pogody, z werdyktem
o klasie energetycznej.

### Gdzie ugryzła

[Dokument weryfikacji energetycznej](./weryfikacja-energetyczna) —
odrębny od projektowej symulacji EnergyPlus, odrębny od testu szczelności
fazy rozruchu.

### Obejście v2.0

Dokument markdown narracyjny. Najbliższym pojęciem rozpoznawanym przez
schemat jest projektowa `simulationStrategy` w `project-specification`,
ale to przechwytuje *prognozy projektowe*, nie *zmierzone weryfikacje*.

### Proponowany kształt v2.2

Nowa encja `energy_verification_record` z polami: identyfikator, budynek,
okres, normalizacja, zmierzone wartości, cele projektowe, werdykt, analiza
delty z wkładami każdego czynnika i przypisaniem do zasobów/encji.

---

## 5. Zalecenie retro-commissioning jako cykl życia pierwszej klasy

### Co to jest

Wzorzec fazy eksploatacji "zmierzona wydajność wywołuje korekcyjną
interwencję bez zmiany projektu sprzętu". Siedzi w niezgrabnej przestrzeni
między Zgłoszeniem, Zmianą a Testem Rozruchowym.

### Gdzie ugryzła

[`ISS-RETROCX-MVHR-001`](./zgloszenia/ISS-RETROCX-MVHR-001) — obecnie
wciśnięte do ogólnej encji `issue` z `issueType: design_clarification`.

### Obejście v2.0

Użyj encji `issue` z `issueType: "design_clarification"` i narracji wyjaśniającej.
Traci strukturalne pola, które uczyniłyby retro-cx zapytywalnym.

### Proponowany kształt v2.2

Albo nowa encja `retrocx_recommendation` z polami: identyfikator, wyzwalające
zgłoszenia, wyzwalająca ankieta, dotknięte systemy/przestrzenie, proponowana
interwencja, oczekiwany wynik z metryką i celem, plan weryfikacji,
szacowany koszt, status, daty.

Albo jako pod-typ `issue` z strukturalnym pod-blokiem `retrocx`.

---

## Podsumowanie

| # | Luka | Priorytet dla v2.2 | Koszt obejścia w v2.0 |
|---|---|---|---|
| 1 | Telemetria czasowa | **Wysoki** — wszystko od tego zależy | Luźne referencje do plików zewnętrznych; brak walidacji kompilatora |
| 2 | Historia eksploatacji zasobu | **Wysoki** — dotyka każdego zasobu operacyjnego | Nieprzezroczysty obiekt; traci podsumowania rejestru zasobów kompilatora |
| 3 | Ankiety mieszkańców | Średni | Tylko narracja; brak trendowania między latami |
| 4 | Weryfikacja energetyczna w użyciu | Średni | Tylko narracja; brak auto-wyprowadzonej analizy delty |
| 5 | Retro-cx jako cykl życia pierwszej klasy | Niski-średni | Ogólne Zgłoszenie działa, ale traci strukturalne krzyżowe linki |

Pozycje 1 i 2 to **nośne** luki — ograniczają wszystko inne. Wydanie
standardu v2.2 adresujące tylko te dwie przeniosłoby modelowanie
fazy eksploatacji z "narracji + plików zewnętrznych" do "kompilowalne
+ zapytywalne".
