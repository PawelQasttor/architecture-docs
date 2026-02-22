---
documentType: "asset_instance"
entityType: "asset_instance"
id: "AI-HP-01"
projectPhase: "construction"
bimLOD: "LOD_400"

assetTypeId: "AT-BOSCH-COMPRESS-7000I-12KW"
category: "hvac"

# Instance identifiers
identifiers:
  assetTag: "HP-01"
  serial: "BCS7000i-2024-001234"
  barcode: "7612345678901"

# Location
buildingId: "BLD-01"
locatedInSpaceId: "SP-EXTERNAL-NORTH"
systemId: "SYS-HVAC-01"

# Installation data
installationData:
  installationDate: "2024-06-15"
  installedBy: "HVAC Services Ltd."
  installer: "Jan Kowalski (MCS #12345)"
  commissioningDate: "2024-06-20"
  commissionedBy: "HVAC Services Ltd."

# Warranty and service
warranty:
  warrantyStart: "2024-06-15"
  warrantyEnd: "2029-06-15"
  warrantyProvider: "Bosch Thermotechnology"

maintenance:
  lastServiceDate: "2024-12-15"
  nextServiceDue: "2025-06-15"
  maintenanceContractor: "HVAC Services Ltd."

version: "1.0.0"
tags:
  - "heat-pump"
  - "building-01"
  - "commissioned"
---

# Instancja Zasobu: Pompa Ciepła HP-01

**Typ:** [Bosch Compress 7000i AW 12kW](../typy-zasobow/pompa-ciepla-bosch-7000i.md)

Pompa ciepła obsługująca system HVAC Budynku 01, zainstalowana w czerwcu 2024.

## Szczegóły Instalacji

- **Numer Seryjny:** BCS7000i-2024-001234
- **Tag Zasobu:** HP-01
- **Lokalizacja:** Zewnętrzna ściana północna, parter
- **System:** [SYS-HVAC-01](../systemy/sys-hvac-01.md)
- **Data Instalacji:** 2024-06-15
- **Instalator:** HVAC Services Ltd. (Jan Kowalski, MCS #12345)

## Wydajność

- **Zmierzony COP:** 4.3 przy A7/W35 (przekracza znamionowe 4.2)
- **Moc grzewcza:** 12 kW
- **Temperatura zasilania:** 35°C (ogrzewanie podłogowe)

## Historia Serwisowa

| Data | Typ | Wykonał | Uwagi |
|------|-----|---------|-------|
| 2024-06-20 | Uruchomienie | HVAC Services Ltd. | COP 4.3 zmierzony, wszystkie testy pozytywne |
| 2024-12-15 | Inspekcja 6-miesięczna | HVAC Services Ltd. | Ciśnienie czynnika OK, brak problemów |
| 2025-06-15 | Przegląd roczny (planowany) | - | Wymiana filtrów, pełna inspekcja |

## Gwarancja

- **Początek:** 2024-06-15
- **Koniec:** 2029-06-15 (5 lat)
- **Dostawca:** Bosch Thermotechnology

---

**Status:** Operacyjny
**Ostatnia Aktualizacja:** 2026-02-22
