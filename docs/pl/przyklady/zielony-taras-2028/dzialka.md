---
entityType: "site"
id: "SITE-GREEN-TERRACE"
version: "2.1.0"
projectPhase: "operation"

siteName: "Działka Zielony Taras"
country: "PL"
address:
  street: "ul. Słoneczna 45"
  city: "Warszawa"
  postalCode: "02-495"
  country: "PL"

buildingIds:
  - "BLD-01"

plotArea: 1250
buildingFootprint: 320

operationalStatus:
  handoverDate: "2026-03-15"
  monthsInOperation: 22

tags:
  - "operation-phase-example"

changelog:
  - version: "2.1.0"
    date: "2026-05-24"
    description: "Encja działki w fazie eksploatacji — minimalny kontekst dla przykładu 2028"
---

# Działka Zielony Taras — faza eksploatacji

Ta sama działka co w [przykładzie projektowym](/pl/przyklady/zielony-taras/dzialka).
Umieszczona tu tylko po to, by kompilator mógł rozwiązać `BLD-01.siteId`
i wygenerować wyjścia fazy eksploatacji.
