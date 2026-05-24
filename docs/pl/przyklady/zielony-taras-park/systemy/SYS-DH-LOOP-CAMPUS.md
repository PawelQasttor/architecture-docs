---
entityType: "system"
id: "SYS-DH-LOOP-CAMPUS"
version: "2.1.0"
projectPhase: "construction"

systemName: "Kampusowa pętla ciepłownicza"
systemCategory: "hvac"

campusId: "CAM-GREEN-TERRACE-PARK"
buildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

description: |
  Centralna pompa ciepła powietrze-woda + zakopane magistrale preizolowane
  zasilające wszystkie 4 budynki Zielony Taras Park. Jednostka wymiarowana
  na 320 kW nominalnie z hydrauliczną pojemnością dla 400 kW, by
  podłączenie BLD-04 mogło być wykonane w 2029 bez wymiany głównej jednostki.

configuration:
  plantType: "air_source_heat_pump_cascade"
  plantLocation: "Centralna kotłownia, częściowo zagłębiona pod wspólnym parkingiem"
  nominalCapacityKW: 320
  expandableCapacityKW: 400
  primaryFlowTempC: 65
  primaryReturnTempC: 45
  secondaryFlowTempC: 55
  ductMaterial: "Stal preizolowana, 200 mm DN"
  serviceLifeYears: 25

buildingConnections:
  - buildingId: "BLD-01"
    status: "connected_operational"
    connectionDate: "2026-02-12"
    designLoadKW: 75
  - buildingId: "BLD-02"
    status: "connected_pending_commissioning"
    expectedConnectionDate: "2027-08-01"
    designLoadKW: 90
  - buildingId: "BLD-03"
    status: "design_phase"
    expectedConnectionDate: "2028-05-01"
    designLoadKW: 80
  - buildingId: "BLD-04"
    status: "scope_pending"
    expectedConnectionDate: "2029-10-01"
    designLoadKW: 60

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

tags:
  - "campus-example"
  - "cross-building-system"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Ogólnokampusowy system ciepłowniczy — dodany z przykładem Kampusu. Demonstruje System z wieloma buildingIds."
---

# Pętla ciepłownicza — ogólnokampusowa (SYS-DH-LOOP-CAMPUS)

**Pojedynczy System obejmujący wszystkie 4 budynki** w kampusie Zielony
Taras Park. Centralna pompa ciepła powietrze-woda + zakopane magistrale
preizolowane dostarczające pierwotny przepływ 65 °C do per-budynkowych podstacji.

| Parametr | Wartość |
|---|---|
| Typ jednostki | Kaskada pompy ciepła powietrze-woda |
| Pojemność nominalna | 320 kW termicznie |
| Pojemność rozszerzalna | 400 kW (dla podłączenia BLD-04 w 2029) |
| Temperatura pierwotna zasilania | 65 °C |
| Trwałość projektowa | 25 lat |
| Obsługiwane budynki | 4 (1 operacyjny, 1 oczekujący rozruchu, 1 w DD, 1 w SD) |

## Co demonstruje ta encja

Większość Systemów należy do **jednego** Budynku. Ten należy do **czterech**.
Tablica `buildingIds` schematu (vs pojedyncze `buildingId` na
specyficznych dla budynku systemach) jest tym, co sprawia, że to czysto działa.
