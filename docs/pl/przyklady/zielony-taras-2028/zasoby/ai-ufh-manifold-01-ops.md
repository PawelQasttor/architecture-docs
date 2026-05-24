---
entityType: "asset"
id: "AST-UFH-MANIFOLD-01"
version: "2.1.0"
projectPhase: "operation"

assetName: "Rozdzielacz UFH 01 (eksploatacja)"
assetTypeId: "AT-UFH-MANIFOLD-12-ZONE"
systemId: "SYS-HVAC-01"
buildingId: "BLD-01"

installationDate: "2025-11-20"
commissioningDate: "2026-02-10"
warrantyExpiry: "2028-02-10"

operationalHistory:
  runtimeHours: 6200
  runtimeHoursAsOf: "2028-01-31"
  zoneValveCycles: 89000
  energyConsumed_kWh: 95
  zoneValveReplacements: 2

  servicedAt:
    - date: "2026-09-15"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Wszystkie 12 stref cyklujące poprawnie. Ciśnienie 1,2 bar."
      cost_eur: 90
    - date: "2027-02-08"
      type: "zone_valve_replacement"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: |
        Aktuator strefy 6 (łazienka mieszkania 3.02) nie zamykał się
        po zakończeniu wezwania ogrzewania. Wymieniono w ramach gwarancji.
        ~4 500 cykli przed awarią — normalny zakres końca życia to 30 000+ cykli,
        więc to wczesna awaria (prawdopodobny defekt fabryczny).
      cost_eur: 0
      relatedIssueId: null
    - date: "2027-09-18"
      type: "planned_inspection"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: "Strefy cyklujące poprawnie. Ciśnienie 1,2 bar. Brak uwag."
      cost_eur: 90
    - date: "2027-11-30"
      type: "zone_valve_replacement"
      technician: "Krzysztof Wójcik (BoschService PL #BS-2451)"
      findings: |
        Aktuator strefy 11 (łazienka mieszkania 5.03) zacinający się.
        Wymieniono. W ramach gwarancji (~7 200 cykli — również wczesna awaria).
        Bosch bada jakość partii aktuatorów.
      cost_eur: 0

  performanceTrend:
    notes: |
      Wydajność hydrauliczna stabilna. Dwie wczesne awarie zaworów strefowych
      z tej samej partii aktuatorów mogą wskazywać szerszy problem jakości —
      Bosch monitoruje. Brak wpływu na widoczną dla klientów wydajność ogrzewania,
      ponieważ awarie zostały wykryte i wymienione zanim doszło do pogorszenia
      temperatury mieszkania.

  dataSource: "zewnętrzny CSV: telemetry/AST-UFH-MANIFOLD-01-cycles-2026-04-to-2028-01.csv"

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Zapis rozdzielacza UFH w fazie eksploatacji — 6 200 godzin pracy, 2 wczesne awarie zaworów strefowych z tej samej partii"
---

# Rozdzielacz UFH AST-UFH-MANIFOLD-01 — zapis eksploatacyjny (styczeń 2028)

12-strefowy rozdzielacz ogrzewania podłogowego po dwóch sezonach grzewczych.
Wydajność hydrauliczna stabilna; **dwie wczesne awarie zaworów strefowych**
z tej samej partii aktuatorów, obie wymienione w ramach gwarancji.

| Metryka | Wartość |
|---|---|
| Godziny pracy | 6 200 (tylko sezon grzewczy) |
| Cykle zaworów strefowych (suma) | 89 000 |
| Zużyta energia (sterowanie/pompy) | 95 kWh |
| Wymiany zaworów strefowych | 2 (strefy 6 i 11) — obie wczesne awarie |
| Zdarzenia serwisowe | 4 (2 planowe + 2 wymiany) |
| Całkowity koszt serwisu | €180 (wymiany były gwarancyjne) |

## Co mówi nam ten zasób

Dwie awarie zaworów strefowych przy ~4 500 i ~7 200 cyklach są **obie znacznie
poniżej normalnego progu końca życia 30 000+ cykli**, i obie pochodziły z tej
samej partii fabrycznej aktuatorów. Bosch monitoruje szerszą jakość partii.
Z perspektywy eksploatacji budynku awarie zostały wykryte przez rutynową
inspekcję zanim doszło do widocznego dla mieszkańców problemu z ogrzewaniem —
ale encja `telemetry_stream` (patrz [SCHEMA-GAPS](../SCHEMA-GAPS)) pozwoliłaby
BMS wykrywać zdarzenia "zawór nie zamknął się po zakończeniu wezwania ciepła"
w czasie rzeczywistym, zamiast polegać na kwartalnych inspekcjach.

## Powiązane

- [System `SYS-HVAC-01`](../systemy/sys-hvac-01)
- Odpowiednik z fazy projektowej: [`AST-UFH-MANIFOLD-01` w modelu projektowym](/pl/przyklady/zielony-taras/zasoby/ai-ufh-manifold-01)
