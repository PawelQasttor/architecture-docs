---
entityType: requirement
id: REQ-LEVEL-FIRE-RATING
requirementName: "Klasa odporności ogniowej kondygnacji"
description: "Klasa odporności ogniowej elementów konstrukcyjnych i podziału na strefy pożarowe na Poziomie 01"
requirementType: safety
countryScope: poland_specific
priority: high

# Applicability
scope:
  entityType: space
  spaceTypes:
    - bedroom
    - corridor
    - common_area

# Qualitative Description
qualitativeDescription: |
  Elementy konstrukcyjne i podział pożarowy Poziomu 01 muszą osiągnąć:
  - Płyta stropowa: REI 60 (60 minut odporności ogniowej)
  - Ściany korytarzy: EI 30 (30 minut szczelności i izolacyjności)
  - Ściany oddzielające lokale: REI 60 (60 minut pełnej ochrony)
  - Drzwi wejściowe do lokali: EI 30 (30 minut)
  - Drzwi pożarowe do klatki schodowej: EI 60-C (60 minut, samozamykające)

# Acceptance Criteria (Array format for v0.3)
acceptanceCriteria:
  - "Płyta stropowa: REI 60 (60 minut odporności ogniowej)"
  - "Ściany korytarzy: EI 30 (30 minut szczelności i izolacyjności)"
  - "Ściany oddzielające lokale: REI 60 (60 minut pełnej ochrony)"
  - "Drzwi wejściowe do lokali: EI 30 (30 minut)"
  - "Drzwi pożarowe do klatki schodowej: EI 60-C (60 minut, samozamykające)"

evidenceRequired:
  - "Karty techniczne produktów dla przegród o określonej odporności ogniowej"
  - "Raporty z badań niezależnej jednostki (PN-EN 13501-2)"
  - "Detale powykonawcze pokazujące ciągłość barier ogniowych"
  - "Certyfikaty montażu drzwi pożarowych"
  - "Zatwierdzenie kontroli budowlanej"

# Phase Requirements
phases:
  - phase: design_development
    status: specified
    deliverable: "Specyfikacje przegród o określonej odporności ogniowej"

  - phase: construction_documents
    status: specified
    deliverable: "Detale konstrukcyjne pokazujące rozwiązania barier ogniowych"

  - phase: construction
    status: specified
    deliverable: "Karty materiałowe i raporty z badań"

  - phase: commissioning
    status: pending
    deliverable: "Końcowa certyfikacja bezpieczeństwa pożarowego"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 234"
    description: "Wymagania oddzielenia pożarowego dla budynków mieszkalnych"
    status: applicable

  - code: "PN-EN 13501-2"
    section: "Classification of construction products"
    description: "Badanie i klasyfikacja odporności ogniowej"
    status: applicable

# Verification Method
verification:
  method: inspection
  phase:
    - construction_documents
    - construction
    - commissioning
  frequency: one_time
  standard: "PN-EN 13501-2"
  responsible: "Inżynier ds. bezpieczeństwa pożarowego / Inspektor budowlany"

# Related Requirements
relatedRequirements:
  - REQ-FIRE-EGRESS-TIME-001
  - REQ-SMOKE-CONTROL

# Cost Impact
estimatedCostImpact:
  description: "Konstrukcja o określonej odporności ogniowej zwiększa koszty konstrukcji i ścian o ok. 8–12%"
  magnitude: medium

# Notes
notes: |
  To wymaganie dotyczy wszystkich przestrzeni na Poziomie 01. Poszczególne
  przestrzenie mogą mieć dodatkowe wymagania pożarowe zależne od sposobu
  użytkowania.

  Klasy odporności ogniowej wg klasyfikacji europejskiej:
  - R: Nośność
  - E: Szczelność (brak płomieni/gorących gazów)
  - I: Izolacyjność (ograniczenie przyrostu temperatury)
  - C: Samozamykające (dla drzwi)

createdBy: "Inżynier ds. bezpieczeństwa pożarowego"
lastModified: "2026-02-27"
version: "2.1.0"
---

# Odporność ogniowa kondygnacji

To wymaganie definiuje klasę odporności ogniowej dla elementów konstrukcyjnych i podziału na strefy pożarowe na Poziomie 01 budynku Green Terrace.
