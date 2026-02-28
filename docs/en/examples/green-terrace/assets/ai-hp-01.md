---
entityType: "asset"
id: "AST-HP-01"
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

# Asset Instance: Heat Pump HP-01

**Type:** [Bosch Compress 7000i AW 12kW](../asset-types/bosch-heat-pump-7000i.md)

Heat pump serving Building 01 HVAC system, installed June 2024.

## Installation Details

- **Serial Number:** BCS7000i-2024-001234
- **Asset Tag:** HP-01
- **Location:** External north wall, ground level
- **System:** [SYS-HVAC-01](../systems/sys-hvac-01.md)
- **Installation Date:** 2024-06-15
- **Installer:** HVAC Services Ltd. (Jan Kowalski, MCS #12345)

## Performance

- **Measured COP:** 4.3 at A7/W35 (exceeds rated 4.2)
- **Heating capacity:** 12 kW
- **Flow temperature:** 35°C (underfloor heating)

## Service History

| Date | Type | Performed By | Notes |
|------|------|--------------|-------|
| 2024-06-20 | Commissioning | HVAC Services Ltd. | COP 4.3 measured, all tests passed |
| 2024-12-15 | 6-month inspection | HVAC Services Ltd. | Refrigerant pressure OK, no issues |
| 2025-06-15 | Annual service (due) | - | Filter change, full inspection |

## Warranty

- **Start:** 2024-06-15
- **End:** 2029-06-15 (5 years)
- **Provider:** Bosch Thermotechnology

---

**Status:** Operational
**Last Updated:** 2026-02-22
