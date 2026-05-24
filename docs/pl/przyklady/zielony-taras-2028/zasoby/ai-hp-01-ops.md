---
entityType: "asset"
id: "AST-HP-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "Pompa ciepła 01 (eksploatacja)"
assetTypeId: "AT-BOSCH-COMPRESS-7000I"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-12-10"
commissioningDate: "2026-02-12"
warrantyExpiry: "2028-02-12"

operationalHistory:
  runtimeHours: 18420
  runtimeHoursAsOf: "2028-01-31"
  cycleCount: 14672
  energyConsumed_kWh: 11250

  servicedAt:
    - date: "2026-09-15"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Filtry czyste; ładunek czynnika nominalny; zmierzone COP 3,55."
      cost_eur: 180
    - date: "2027-03-22"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Poziomy dźwięku wzrosły ~3 dBA od bazowego; ładunek czynnika nominalny; COP 3,42."
      cost_eur: 180
    - date: "2027-05-04"
      type: "warranty_repair"
      technician: "Autoryzowany serwis Bosch (Marek Kałuża)"
      findings: |
        Zatarcie sprężarki w 14 miesiącu (4 500 godzin kumulatywnie). Przyczyna
        źródłowa: potwierdzony przez producenta defekt partii sprężarek
        Generation 3 wyprodukowanych Q3 2025. Wymieniono w ramach gwarancji
        bezkosztowo dla inwestora. Po wymianie: COP zmierzono 3,50, ~0,05
        poniżej bazowego sprzed awarii.
      cost_eur: 0
      relatedIssueId: "ISS-WARRANTY-HP-001"
    - date: "2027-09-18"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "COP zmierzono 3,38; ciśnienie czynnika lekko niskie; uzupełniono 80 g R-32. Zalecam ponowny test przy następnej kwartalnej."
      cost_eur: 220
    - date: "2027-12-19"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "COP zmierzono 3,34; ciśnienie czynnika stabilne od uzupełnienia; badanie ścieżki wycieku. Zabrudzenie wymiennika 8 % — w progu serwisowym 10 %."
      cost_eur: 240

  performanceTrend:
    baselineCOP: 3.60
    postCommissioningCOP: 3.55
    currentCOP: 3.34
    deltaPct: -7.2
    notes: "Stały spadek po wymianie sprężarki spójny z wyciekiem czynnika; aktywne dochodzenie."

  dataSource: "zewnętrzny CSV: telemetry/AST-HP-01-runtime-and-cop-2026-04-to-2028-01.csv"

activeIssueIds:
  - "ISS-WARRANTY-HP-001"

tags:
  - "operation-phase-example"
  - "po-gwarancji"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zasób w fazie eksploatacji — 22 miesiące pracy, 5 zdarzeń serwisowych, wymiana sprężarki w ramach gwarancji, spadek wydajności po-gwarancyjnej"
---

# Pompa ciepła AST-HP-01 — zapis eksploatacyjny (styczeń 2028)

Pompa ciepła Bosch Compress 7000i po 22 miesiącach i 18 420 godzinach pracy.
Po gwarancji (wygasła luty 2028). Obecnie pracuje **7,2 % poniżej projektowego
celu COP**, ze stałym spadkiem od gwarancyjnej wymiany sprężarki w 14 miesiącu.

| Metryka | Wartość |
|---|---|
| Godziny pracy | 18 420 |
| Liczba cykli | 14 672 |
| Zużyta energia | 11 250 kWh |
| Zdarzenia serwisowe | 5 (4 planowe + 1 naprawa gwarancyjna) |
| Bieżący COP | 3,34 (cel 3,6, bazowy 3,55) |
| Status gwarancji | **WYGASŁA** (luty 2028) |
| Aktywne zgłoszenie | [ISS-WARRANTY-HP-001](../zgloszenia/ISS-WARRANTY-HP-001) |

## Trend wydajności

| Data | Godziny | COP | Uwagi |
|---|---|---|---|
| 2026-02-12 (rozruch) | 0 | 3,55 | Przy przekazaniu — lekko poniżej projektowego 3,6 |
| 2026-09-15 (mies. 6) | ~4 200 | 3,55 | Pierwsza kwartalna inspekcja — stabilnie |
| 2027-03-22 (mies. 12) | ~8 400 | 3,42 | Wzrost dźwięku odnotowany; ładunek nominalny |
| 2027-05-04 (mies. 14) | ~9 800 | — | **Awaria sprężarki; wymiana gwarancyjna** |
| 2027-05-04 (po naprawie) | 9 800 | 3,50 | Bazowy po wymianie |
| 2027-09-18 (mies. 18) | ~13 200 | 3,38 | Uzupełnienie 80 g R-32 |
| 2027-12-19 (mies. 21) | ~16 800 | 3,34 | Ciśnienie stabilne; badanie wycieku |
| 2028-01-31 (teraz) | 18 420 | 3,34 | Bieżąco |

## Co umożliwia ta encja

Cel kompilatora dla **schematu cyfrowego bliźniaka** podchwytuje
referencje `operationalHistory` do danych czujnikowych; cel **rejestru zasobów**
sumuje godziny pracy i koszty serwisu we wszystkich zasobach;
cel **eksportu CMMS** generuje kalendarz konserwacji.

Czego kompilator **jeszcze nie potrafi** (patrz [SCHEMA-GAPS](../SCHEMA-GAPS)):
wykryć trendu spadku COP automatycznie. Blok `performanceTrend` jest
ludzkim podsumowaniem z zewnętrznego CSV; encja `telemetry_stream`
w v2.2 pozwoliłaby kompilatorowi samemu podnieść ostrzeżenie, gdy spadek
COP przekroczy próg.

## Powiązane

- [System `SYS-HVAC-01`](../systemy/sys-hvac-01) — system, do którego należy ten zasób
- [Zgłoszenie `ISS-WARRANTY-HP-001`](../zgloszenia/ISS-WARRANTY-HP-001) — narracja wymiany gwarancyjnej
- Odpowiednik z fazy projektowej: [`AST-HP-01` w modelu projektowym](/pl/przyklady/zielony-taras/zasoby/ai-hp-01)
