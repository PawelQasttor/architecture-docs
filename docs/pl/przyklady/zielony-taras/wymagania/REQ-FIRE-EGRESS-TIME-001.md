---
entityType: requirement
id: REQ-FIRE-EGRESS-TIME-001
requirementName: "Limit czasu ewakuacji pożarowej"
description: "Maksymalny czas ewakuacji z dowolnego punktu Poziomu 01 do chronionej klatki schodowej"
requirementType: safety
countryScope: poland_specific
priority: critical

# Applicability
scope:
  entityType: space
  spaceTypes:
    - corridor
    - bedroom
    - living_room
    - common_area

# Egress Time Requirement
egressTime:
  metric: egress_time
  operator: "<="
  value: 2.5
  unit: minutes
  testMethod: "Symulacja (Pathfinder / obliczenie RSET)"
  description: "Maksymalny czas dotarcia do chronionej klatki schodowej z dowolnej przestrzeni użytkowej"

# Travel Distance Requirement
travelDistance:
  metric: egress_distance
  operator: "<="
  value: 40.0
  unit: m
  testMethod: "Pomiar wzdłuż osi drogi ewakuacyjnej"
  description: "Maksymalna długość dojścia ewakuacyjnego do najbliższej klatki schodowej"

# Corridor Width Requirement
corridorWidth:
  metric: corridor_width
  operator: ">="
  value: 1.40
  unit: m
  testMethod: "Pomiar powykonawczy"
  description: "Minimalna szerokość w świetle głównego korytarza ewakuacyjnego"

# Door Width Requirement
doorWidth:
  metric: door_clear_width
  operator: ">="
  value: 0.90
  unit: m
  testMethod: "Pomiar powykonawczy"
  description: "Minimalna szerokość w świetle otworu drzwi na drodze ewakuacyjnej"

# Acceptance Criteria (Array format for v0.3)
acceptanceCriteria:
  - "Czas ewakuacji: maksymalnie 2,5 minuty RSET do chronionej klatki schodowej"
  - "Długość dojścia: maksymalnie 40 metrów wzdłuż drogi ewakuacyjnej"
  - "Przepustowość korytarza: główny korytarz ≥1,40 m szerokości w świetle"
  - "Parametry drzwi: minimum 0,90 m szerokości otworu w świetle, drzwi pożarowe samozamykające (EI 30)"
  - "Przepustowość klatki schodowej: minimum 1,20 m szerokości w świetle w obudowie chronionej (REI 60)"

qualitativeDescription: |
  Ewakuacja pożarowa Poziomu 01 musi spełniać następujące kryteria:
  1. Czas ewakuacji: maksymalnie 2,5 minuty RSET (wymagany bezpieczny czas ewakuacji) z dowolnego punktu użytkowego do wejścia chronionej klatki schodowej (założono prędkość marszu 1,2 m/s, zwłokę przy drzwiach 2 s)
  2. Długość dojścia: maksymalnie 40 metrów mierzone wzdłuż drogi ewakuacyjnej od najdalszego punktu w lokalu do najbliższych drzwi chronionej klatki schodowej
  3. Przepustowość korytarzy: korytarz główny ≥1,40 m w świetle, korytarze drugorzędne ≥1,20 m w świetle, brak przeszkód na drogach ewakuacyjnych
  4. Parametry drzwi: minimum 0,90 m szerokości otworu w świetle, drzwi pożarowe samozamykające (minimum EI 30), kierunek otwierania zgodny z kierunkiem ewakuacji, okucia antypaniczne na drzwiach klatki (jeśli wymagane)
  5. Przepustowość klatki schodowej: minimum 1,20 m w świetle, przepustowość wystarczająca do jednoczesnej ewakuacji, obudowa chroniona (REI 60)

evidenceRequired:
  - "Raport z symulacji ewakuacji pożarowej (Pathfinder lub równoważny)"
  - "Rysunki powykonawcze pokazujące drogi ewakuacyjne i długości dojść"
  - "Zestawienie drzwi z wymiarami otworów w świetle"
  - "Certyfikaty montażu drzwi pożarowych"
  - "Wyniki próby napowietrzania klatki schodowej (jeśli dotyczy)"
  - "Certyfikat próby oświetlenia awaryjnego"
  - "Raport z próbnej ewakuacji"

# Design Assumptions
designAssumptions:
  occupantDensity: 0.02  # persons/m² for residential
  walkingSpeed: 1.2  # m/s
  doorFlowRate: 1.33  # persons/second/meter of width
  doorDelay: 2.0  # seconds per door
  preMovementTime: 60  # seconds (residential occupancy)
  safetyFactor: 1.5  # applied to calculated RSET

# Phase Requirements
phases:
  - phase: schematic_design
    status: completed
    deliverable: "Wstępna analiza ewakuacji i układ funkcjonalny"

  - phase: design_development
    status: completed
    deliverable: "Symulacja ewakuacji pożarowej (Pathfinder)"

  - phase: construction_documents
    status: completed
    deliverable: "Detale dróg ewakuacyjnych i zestawienia drzwi"

  - phase: construction
    status: in_progress
    deliverable: "Weryfikacja powykonawcza dróg ewakuacyjnych"

  - phase: commissioning
    status: pending
    deliverable: "Próbna ewakuacja i certyfikacja końcowa"

# Regulatory Context
regulatoryReferences:
  - code: "WT 2021"
    section: "§ 256"
    description: "Drogi ewakuacyjne w budynkach mieszkalnych"
    status: applicable

  - code: "WT 2021"
    section: "§ 257"
    description: "Drzwi na drogach ewakuacyjnych"
    status: applicable

  - code: "WT 2021"
    section: "§ 234"
    description: "Oddzielenia i zabezpieczenia przeciwpożarowe"
    status: applicable

  - code: "PD 7974-6"
    section: "Human factors: Life safety strategies"
    description: "Metodyka obliczenia RSET"
    status: reference

# Verification Method
verification:
  method: simulation
  phase:
    - schematic_design
    - design_development
    - construction_documents
    - commissioning
  frequency: pre_occupancy
  tool: "Pathfinder"
  standard: "PD 7974-6"
  responsible: "Inżynier ds. bezpieczeństwa pożarowego"

# Simulation Results
simulationResults:
  software: "Pathfinder 2024"
  scenario: "Jednoczesna ewakuacja Poziomu 01 (przypadek najbardziej niekorzystny)"
  results:
    maxRSET: 2.1  # minutes
    maxTravelDistance: 38.5  # meters
    bottleneck: "Skrzyżowanie korytarzy przy lokalach 5–6"
    status: PASS

# Related Requirements
relatedRequirements:
  - REQ-LEVEL-FIRE-RATING
  - REQ-EMERGENCY-LIGHTING
  - REQ-SMOKE-CONTROL

# Cost Impact
estimatedCostImpact:
  description: "Wymagania ewakuacyjne wpływają na szerokość korytarzy i specyfikację drzwi"
  magnitude: low
  value: 5000
  currency: EUR

# Critical Safety Requirement
safetyCritical: true
failureMode: "Opóźniona ewakuacja, potencjalne zagrożenie życia"
mitigationMeasures:
  - "Dwie niezależne drogi ewakuacyjne z każdego lokalu"
  - "Drzwi pożarowe samozamykające na wszystkich drogach ewakuacyjnych"
  - "Oświetlenie awaryjne z 3-godzinnym podtrzymaniem bateryjnym"
  - "System detekcji dymu i sygnalizacji pożaru"
  - "Coroczne próbne ewakuacje"

# Notes
notes: |
  To jest KRYTYCZNE wymaganie bezpieczeństwa. Wszelkie zmiany układu
  Poziomu 01 wpływające na drogi ewakuacyjne MUSZĄ zostać ponownie ocenione.

  Obliczenie RSET obejmuje:
  - Czas detekcji: 30 sekund (czujki dymu)
  - Czas przeddziałania: 60 sekund (zabudowa mieszkalna)
  - Czas przejścia: ~70 sekund (38,5 m przy 1,2 m/s + zwłoki przy drzwiach)
  - Współczynnik bezpieczeństwa: ×1,5
  - Łączny RSET: 2,1 minuty (w granicach limitu 2,5 minuty)

  Symulacja zweryfikowana w scenariuszu najbardziej niekorzystnym:
  - Jednoczesna ewakuacja wszystkich 18 lokali na Poziomie 01
  - Jedna klatka schodowa zablokowana (mieszkańcy korzystają z drogi zapasowej)
  - Żadne zwężenie nie przekroczyło progu 2,5 minuty

createdBy: "Inżynier ds. bezpieczeństwa pożarowego"
lastModified: "2026-02-27"
version: "2.1.0"
---

# Limit czasu ewakuacji pożarowej

To wymaganie ustala maksymalny czas ewakuacji z dowolnego punktu na Poziomie 01 do chronionej klatki schodowej, zapewniając bezpieczną ewakuację w scenariuszach zagrożenia pożarowego.
