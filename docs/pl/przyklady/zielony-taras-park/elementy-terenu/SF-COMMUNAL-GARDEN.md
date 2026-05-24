---
entityType: "site_feature"
id: "SF-COMMUNAL-GARDEN"
version: "2.1.0"
projectPhase: "construction"

featureName: "Ogród wspólnotowy kampusu"
featureType: "garden"
featureCategory: "vegetation"
campusId: "CAM-GREEN-TERRACE-PARK"
siteId: "SITE-GTP-PHASE-2"

description: |
  Ogród wspólnotowy z natywnymi nasadzeniami + podniesione grzędy
  działkowe łączące 4 budynki kampusu. ~800 m² łącznie, z 24 grzędami
  działkowymi (jedna na mieszkanie dla mniejszych budynków, dwupoziomowa
  lista oczekujących dla większych). Gatunki natywne odporne na suszę
  redukują nawadnianie do <5 L/m²/tydzień latem.

area: 800
allotmentBeds: 24
unit: "m"

biodiversityFeatures:
  - "20% natywnych gatunków kwitnących dla zapylaczy"
  - "Hotel dla owadów + budka dla nietoperzy na płocie północnym"
  - "Karmnik dla ptaków + stacje kąpieli (obsługiwane przez komitet mieszkańców)"
  - "System kompostowania (3 zasoby, rotacyjne)"

maintenanceResponsibility: "Komitet ogrodowy mieszkańców + wizyty wykonawcy krajobrazowego raz na kwartał"
expectedAnnualOpex: 4200

servedBuildingIds:
  - "BLD-01"
  - "BLD-02"
  - "BLD-03"
  - "BLD-04"

constructionPackageId: "CP-SITE-INFRASTRUCTURE"

cost:
  totalCost: 42000
  currency: "EUR"
  basis: "tender_award"

tags:
  - "campus-example"
  - "shared-amenity"
  - "bioroznorodnosc"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Ogród wspólnotowy kampusu — dodany z przykładem Kampusu"
---

# Ogród wspólnotowy kampusu (SF-COMMUNAL-GARDEN)

~800 m² wspólny ogród z 24 grzędami działkowymi, natywnym nasadzeniem
i cechami bioróżnorodności.

| Właściwość | Wartość |
|---|---|
| Powierzchnia | 800 m² |
| Grzędy działkowe | 24 |
| Konserwacja | Komitet mieszkańców + kwartalny kontrakt krajobrazowy |
| Roczne OPEX | €4 200 |
| Koszt (kapitałowy) | €42 000 |
