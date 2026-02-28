---
entityType: "asset_type"
id: "AT-BOSCH-COMPRESS-7000I-12KW"
typeName: "Bosch Compress 7000i AW 12kW Heat Pump"
category: "hvac"
description: "Air-to-water heat pump for residential heating, 12 kW capacity, inverter-driven, R-32 refrigerant"

manufacturer: "Bosch Thermotechnology"
model: "Compress 7000i AW"
productCode: "8738207145"

# Technical specifications
specifications:
  heatingCapacity: "12 kW"
  refrigerant: "R-32"
  refrigerantCharge: "1.8 kg"
  flowTemperatureRange: "25-55°C"
  powerInput: "2.8 kW"
  soundPressureLevel: "35 dB(A)"
  dimensions: "800×600×1200 mm"
  weight: "85 kg"
  ipRating: "IP24"
  ambientTempRange: "-20°C to +35°C"

# Performance data
performanceData:
  copHeating: 4.2
  energyClass: "A+++"
  seasonalCOP: 4.5
  maxWorkingPressure: "30 bar"
  modulationRange: "20-100%"

# Maintenance profile
maintenanceProfile:
  serviceIntervalMonths: 12
  expectedLifetimeYears: 15
  warrantyYears: 5
  sparePartsRequired:
    - "Filter set (annual)"
    - "Pressure sensor"
    - "Flow switch"
  maintenanceProcedures:
    - "Annual service: filter, pressure check"
    - "Check refrigerant pressure"
    - "Clean heat exchanger coils"
    - "Test safety cutouts"

requirements:
  - "REQ-HVAC-HEAT-PUMP-INSTALLATION"
  - "REQ-REFRIGERANT-HANDLING"

cost:
  purchasePrice: 8500
  installationCost: 1200
  currency: "EUR"

version: "1.0.0"
tags:
  - "heat-pump"
  - "r32"
  - "residential"
---

# Asset Type: Bosch Compress 7000i AW 12kW

Air-to-water heat pump for residential heating. Inverter-driven, R-32 refrigerant, COP 4.2, suitable for underfloor heating and low-temp radiators.

See full documentation: [Asset Type Documentation](/en/documentation/entities/asset-type)
