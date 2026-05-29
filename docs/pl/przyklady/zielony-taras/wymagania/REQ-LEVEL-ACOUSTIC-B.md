---
entityType: requirement
id: REQ-LEVEL-ACOUSTIC-B
requirementName: "Izolacyjność akustyczna — klasa B"
description: "Podwyższone wymagania izolacyjności akustycznej dla przestrzeni mieszkalnych na Poziomie 01"
requirementType: performance
countryScope: poland_specific
priority: high

# Applicability
scope:
  entityType: space
  spaceTypes:
    - bedroom
    - living_room
    - bathroom

# Airborne Sound Insulation (between units)
airborneInsulation:
  metric: airborne_sound_insulation
  operator: ">="
  value: 52
  unit: dB
  testMethod: "PN-EN ISO 717-1"
  description: "Ważony wskaźnik izolacyjności od dźwięków powietrznych (Rw) między lokalami"

# Impact Sound Insulation (floor/ceiling)
impactInsulation:
  metric: impact_sound_insulation
  operator: "<="
  value: 53
  unit: dB
  testMethod: "PN-EN ISO 717-2"
  description: "Ważony wskaźnik poziomu uderzeniowego (L'nw) dla stropów"

# Façade Sound Insulation
facadeInsulation:
  metric: facade_sound_insulation
  operator: ">="
  value: 33
  unit: dB
  testMethod: "PN-EN ISO 717-1"
  description: "Ważona izolacyjność przegrody zewnętrznej (D2m,nT,w) od hałasu zewnętrznego"

# Background Noise Limits
backgroundNoise:
  metric: background_noise_level
  operator: "<="
  value: 30
  unit: dBA
  testMethod: "PN-EN ISO 1996-2"
  description: "Maksymalny poziom tła akustycznego w sypialniach w porze nocnej"

# Acceptance Criteria (array format)
acceptanceCriteria:
  - "Izolacyjność od dźwięków powietrznych (między lokalami): Rw ≥ 52 dB"
  - "Izolacyjność od dźwięków uderzeniowych (stropy): L'nw ≤ 53 dB"
  - "Izolacyjność przegrody zewnętrznej: D2m,nT,w ≥ 33 dB"
  - "Tło akustyczne: ≤ 30 dBA w sypialniach, ≤ 35 dBA w pokojach dziennych"

qualitativeDescription: |
  Przestrzenie mieszkalne Poziomu 01 muszą osiągnąć akustykę klasy B:
  1. Izolacyjność od dźwięków powietrznych (między lokalami): Rw ≥ 52 dB (przekracza minimum WT 2021 wynoszące 50 dB)
  2. Izolacyjność od dźwięków uderzeniowych (stropy): L'nw ≤ 53 dB (przekracza minimum WT 2021 wynoszące 58 dB)
  3. Izolacyjność przegrody zewnętrznej: D2m,nT,w ≥ 33 dB (właściwa dla lokalizacji podmiejskiej)
  4. Tło akustyczne (HVAC, instalacje): ≤ 30 dBA w sypialniach, ≤ 35 dBA w pokojach dziennych

evidenceRequired:
  - "Raporty z badań akustycznych (badania przedodbiorowe wg PN-B-02151-4)"
  - "Karty techniczne produktów dla przegród o określonej izolacyjności"
  - "Detale konstrukcyjne pokazujące rozdział akustyczny"
  - "Raport z obliczeń hałasu instalacji HVAC"
  - "Końcowy raport z odbioru akustycznego"

# Construction Requirements
constructionRequirements:
  partitions:
    description: "Ściany na podwójnym ruszcie lub z bloczków betonowych z obróbką akustyczną"
    specification: "Rw ≥ 52 dB"

  floors:
    description: "Płyta żelbetowa z podłogą pływającą i warstwą sprężystą"
    specification: "L'nw ≤ 53 dB"

  windows:
    description: "Szyby zespolone ze szkłem laminowanym i asymetryczną komorą"
    specification: "Rw ≥ 33 dB"

  doors:
    description: "Drzwi pełne z uszczelkami akustycznymi"
    specification: "Rw ≥ 32 dB"

# Phase Requirements
phases:
  - phase: design_development
    status: completed
    deliverable: "Obliczenia akustyczne i specyfikacje przegród"

  - phase: construction_documents
    status: completed
    deliverable: "Detale konstrukcyjne z ciągłością uszczelnień akustycznych"

  - phase: construction
    status: in_progress
    deliverable: "Karty materiałowe i nadzór nad montażem"

  - phase: commissioning
    status: pending
    deliverable: "Raporty z odbiorowych badań akustycznych"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 323"
    description: "Ochrona przed hałasem w budynkach mieszkalnych"
    status: applicable

  - code: "PN-B-02151-4"
    section: "Building acoustics"
    description: "Wymagania izolacyjności akustycznej w budynkach"
    status: applicable

# Verification Method
verification:
  method: testing
  phase:
    - design_development
    - construction
    - commissioning
  frequency: pre_completion
  standard: "PN-B-02151-4"
  responsible: "Konsultant ds. akustyki"

# Related Requirements
relatedRequirements:
  - REQ-BEDROOM-MIN-AREA
  - REQ-HVAC-NOISE-LEVEL

# Cost Impact
estimatedCostImpact:
  description: "Podwyższona akustyka zwiększa koszt ścian i stropów o ok. 5–7% względem minimum kodeksowego"
  magnitude: medium
  value: 15000
  currency: EUR

# Performance Class
performanceClass:
  standard: "PN-B-02151-4"
  class: "B"
  description: "Podwyższony komfort akustyczny — odpowiedni dla budownictwa mieszkalnego wysokiej jakości"

# Notes
notes: |
  Akustyka klasy B przekracza minimalne wymagania polskiego prawa
  budowlanego (klasa C), zapewniając podwyższony komfort mieszkalny.

  Kluczowe ulepszenia względem minimum kodeksowego:
  - Izolacyjność powietrzna: 52 dB wobec minimum 50 dB (+2 dB)
  - Izolacyjność uderzeniowa: 53 dB wobec maksimum 58 dB (poprawa o 5 dB)

  Protokół badań:
  - Badania przedodbiorowe na 10% lokali (minimum 2 lokale)
  - Każde niespełnienie wymaga naprawy i ponownego badania
  - Odbiór końcowy wymaga 100% wyników pozytywnych

createdBy: "Konsultant ds. akustyki"
lastModified: "2026-02-27"
version: "2.1.0"
---

# Izolacyjność akustyczna - klasa B

To wymaganie definiuje podwyższone standardy izolacji akustycznej dla przestrzeni mieszkalnych na Poziomie 01, przekraczające minimalne wymagania kodeksowe w celu zapewnienia wyższego komfortu akustycznego.
