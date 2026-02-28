---
entityType: "zone_type"
id: "ZT-ACOUSTIC-NIGHT"
typeName: "Acoustic Zone - Night (Sleeping Spaces)"
zoneType: "acoustic"
description: "Enhanced acoustic zone for sleeping spaces requiring high sound insulation per Polish standards"

# REQUIREMENTS (applies to ALL instances)
requirements:
  - "REQ-ACOUSTIC-SLEEPING-001"
  - "REQ-PL-ACOUSTIC-PARTITION-001"
  - "REQ-ACOUSTIC-FLOOR-IMPACT-001"

# ACOUSTIC ZONE PROPERTIES
properties:
  acousticClass: "B"
  usageType: "sleeping_spaces"
  soundInsulationRequirement: "Rw ≥ 52 dB"
  impactSoundRequirement: "Ln,w ≤ 53 dB"
  backgroundNoiseLimit: "NR 25"
  reverbTimeTarget: "0.5s"
  externalNoiseProtection: "Rw ≥ 30 dB"

version: "1.0.0"
tags:
  - "acoustic"
  - "sleeping"
  - "class-b"
  - "residential"
---

# Zone Type: Acoustic Zone - Night (Sleeping Spaces)

## Description

Enhanced acoustic zone for sleeping spaces (bedrooms) requiring high sound insulation. Designed to provide acoustic comfort for nighttime rest in residential buildings, with protection from external noise, inter-apartment noise, and impact sound from floors above.

## Design Intent

This zone type ensures:
- Airborne sound insulation ≥52 dB between apartments
- Impact sound insulation ≤53 dB from floors above
- Background noise ≤NR 25 for undisturbed sleep
- External noise protection ≥30 dB through facade
- Acoustic Class B per Polish standards (enhanced comfort)

## Classification

**Acoustic Class:** B (Enhanced Acoustic Comfort)

Per PN-B-02151-3:2015, Polish acoustic classification:
- **Class A:** Exceptional comfort (hospitals, recording studios)
- **Class B:** Enhanced comfort (bedrooms, quiet offices) ← **This type**
- **Class C:** Standard comfort (living rooms, general offices)
- **Class D:** Basic compliance (corridors, service spaces)

**Usage Type:** Sleeping spaces
- Bedrooms (single, double, children's)
- Bedroom areas in studios
- Guest bedrooms
- Spaces designated for nighttime rest

## Acoustic Requirements

### REQ-ACOUSTIC-SLEEPING-001: Airborne Sound Insulation
**Criterion:** Sound insulation between separate living units
**Compliance:**
- **Between apartments:** R'w ≥ 52 dB (measured in-situ)
- **From corridors/stairs:** R'w ≥ 47 dB
- **From technical rooms:** R'w ≥ 57 dB
- **Between bedrooms (same apartment):** Rw ≥ 32 dB

**Construction:**
- Party walls: ≥220 kg/m² mass OR double-leaf with isolation
- Example: 200mm concrete + 100mm mineral wool + 12.5mm gypsum (Rw ~55 dB)
- Alternative: Double masonry (150mm + cavity + 150mm) with acoustic insulation

**Verification:** Post-construction acoustic testing per PN-EN ISO 16283-1

### REQ-PL-ACOUSTIC-PARTITION-001: Partition Performance
**Criterion:** Acoustic performance of partition walls per WT 2021 § 323
**Compliance:**
- Minimum mass: 220 kg/m² for party walls
- No rigid connections between wall leaves (if double-leaf)
- Acoustic sealing at all penetrations (outlets, pipes, ducts)
- Door seals: Rw ≥ 32 dB minimum

**Common Solutions:**
- 200mm reinforced concrete
- 240mm hollow clay block (filled)
- Double-leaf: 100mm + 50mm cavity + 100mm with mineral wool

**Verification:** Product certification, construction inspection, acoustic testing

### REQ-ACOUSTIC-FLOOR-IMPACT-001: Impact Sound Insulation
**Criterion:** Protection from footfall and impact noise from above
**Compliance:**
- **Impact sound level:** L'n,w ≤ 53 dB (measured in-situ)
- **Floor construction:** Floating floor with resilient layer
- **Resilient layer:** Minimum dynamic stiffness s' ≤ 15 MN/m³

**Floating Floor Construction:**
```
Finish layer (wood, tiles, etc.)
Screed: 45-60mm cement screed OR dry screed system
Resilient layer: 3-5mm rubber/polyethylene (s' ≤ 15 MN/m³)
Structural slab: 180-200mm concrete
Ceiling finish: Gypsum plaster or suspended ceiling
```

**Critical Details:**
- Perimeter isolation: Resilient strips at all walls
- No rigid bridges through resilient layer
- Service penetrations: Acoustic wrapped and sealed

**Verification:** Impact sound testing per PN-EN ISO 16283-2

## Properties Explained

### Sound Insulation Requirement: Rw ≥ 52 dB
**Rw** = Weighted Sound Reduction Index
- Laboratory rating for airborne sound insulation
- In-situ measurement (R'w) typically 2-5 dB lower than Rw
- 52 dB provides good speech privacy and reduces TV/music noise to comfortable levels

**Subjective Effect:**
- **40 dB:** Loud speech audible, insufficient for sleeping
- **45 dB:** Normal speech audible but muffled
- **50 dB:** Loud speech faintly audible
- **52 dB:** Good privacy, only very loud sounds barely audible ← **This level**
- **55+ dB:** Excellent privacy, minimal disturbance

### Impact Sound Requirement: Ln,w ≤ 53 dB
**Ln,w** = Weighted Normalized Impact Sound Level
- Lower is better (opposite to Rw)
- 53 dB is enhanced level for sleeping spaces

**Subjective Effect:**
- **65 dB:** High impact noise, very disturbing
- **58 dB:** Standard level (WT 2021 minimum)
- **53 dB:** Enhanced level, comfortable for sleeping ← **This level**
- **48 dB:** Excellent, minimal impact noise

### Background Noise Limit: NR 25
**NR** = Noise Rating
- Lower is quieter
- NR 25 is appropriate for bedrooms (WHO recommendation: ≤30 dB(A))

**Sources Controlled:**
- HVAC system noise
- Plumbing noise (water flow, drainage)
- Lift machinery
- External traffic (via facade insulation)

### External Noise Protection: Rw ≥ 30 dB
Facade (walls + windows) must provide minimum 30 dB reduction:
- **External noise:** 65 dB(A) typical urban
- **After reduction:** ≤35 dB(A) internal
- **WHO guideline:** ≤30 dB(A) for sleep

**Typical Construction:**
- External wall: U ≤ 0.20 W/(m²·K), inherent Rw ~45-50 dB
- Windows: Double glazing 6-16-6mm minimum, Rw ~32-36 dB
- Combined facade Rw ~30-35 dB (window is weak point)

## Construction Details

### Partition Walls

**Between Apartments (Party Walls):**
Option 1 - Concrete:
```
200mm reinforced concrete (density ~2400 kg/m³)
= 480 kg/m² → Rw ~54 dB
```

Option 2 - Double Masonry:
```
150mm ceramic hollow block
50mm cavity with 50mm mineral wool (ρ=30 kg/m³)
150mm ceramic hollow block
= ~220 kg/m² total → Rw ~55 dB
```

Option 3 - Double Stud Wall:
```
12.5mm gypsum board
100mm metal studs (staggered) + 100mm mineral wool
12.5mm gypsum board | 12.5mm gypsum board
100mm metal studs (separate frame) + 100mm mineral wool
12.5mm gypsum board
= Rw ~58 dB (excellent but expensive)
```

**From Corridors/Stairs:**
- Lighter construction acceptable (Rw ≥47 dB)
- 180mm masonry OR 150mm concrete
- Acoustic-rated doors: Rw ≥32 dB with seals

### Doors

**Acoustic Door Specification:**
- Solid core timber OR metal acoustic door
- Perimeter seals: Rubber or neoprene
- Drop seal at threshold (automatic)
- No undercut gaps
- Rw ≥32 dB minimum (bedroom to corridor)

**Critical Installation:**
- Frame properly sealed to wall
- No gaps around frame perimeter
- Letterbox (if any): Acoustic sealed type

### Windows

**Acoustic Window Specification:**
Option 1 - Standard Double Glazing:
```
6mm laminated glass (outer)
16mm argon-filled cavity
6mm laminated glass (inner)
= Rw ~34 dB
```

Option 2 - Asymmetric Glazing (Higher Performance):
```
8mm laminated glass (outer)
16mm argon-filled cavity
6mm laminated glass (inner)
= Rw ~36-38 dB
```

**Installation:**
- Proper sealing to wall opening
- No acoustic bridging through frame
- Opening vents: Acoustic trickle vents if required

### Floors (Impact Sound)

**Floating Floor System:**
1. **Structural Slab:** 180-200mm concrete (minimum for structural + acoustic mass)
2. **Resilient Layer:**
   - 3-5mm cross-linked polyethylene (XLPE) foam OR
   - 5mm rubber granulate mat OR
   - 20mm mineral wool (high-density, ρ=140 kg/m³)
   - Dynamic stiffness s' ≤15 MN/m³
3. **Screed:** 45-60mm cement screed (reinforced with mesh)
4. **Perimeter Isolation:** Resilient strip 10mm thick, full height of screed
5. **Finish:** Wood, tile, vinyl (acoustically neutral)

**Critical Details:**
- No rigid bridges (pipes, conduits must be wrapped)
- Perimeter strip continuous, no gaps
- Service penetrations: Acoustic wrapped and sealed
- Walls constructed after floor (screed isolated from walls)

## Service Integration

### HVAC Systems
- Ductwork: Acoustic lining or silencers
- Diffusers: Low-noise type, NR ≤25 at design flow
- Vibration isolation: HVAC equipment on springs/pads

### Plumbing
- Drainage: Acoustic-wrapped pipes (especially vertical stacks)
- Water supply: Pressure regulation to avoid noise
- Toilets: Wall-hung or isolated from structure

### Electrical
- Socket outlets: Acoustic-sealed boxes (not back-to-back through party walls)
- Cable penetrations: Acoustic sealed

## Compliance References

**Polish Standards:**
- **PN-B-02151-3:2015:** Acoustic protection in buildings - Requirements for residential
- **WT 2021 § 323:** Sound insulation requirements
- **PN-EN ISO 717-1:** Airborne sound insulation rating
- **PN-EN ISO 717-2:** Impact sound insulation rating

**Testing Standards:**
- **PN-EN ISO 16283-1:** Field measurement of airborne sound insulation
- **PN-EN ISO 16283-2:** Field measurement of impact sound insulation

**Guidelines:**
- **WHO Night Noise Guidelines:** Background noise ≤30 dB(A) for sleep
- **WHO Environmental Noise Guidelines (2018):** Residential night exposure

## Usage Guidelines

### When to Use This Type
- ✅ Bedrooms in residential buildings (apartments, houses)
- ✅ Sleeping areas requiring high acoustic comfort
- ✅ Buildings where nighttime noise is a concern
- ✅ Urban locations with external noise >55 dB(A)
- ✅ Multi-family buildings (apartments above/below/adjacent)

### When NOT to Use
- ❌ Living rooms - use lower classification (Class C may suffice)
- ❌ Kitchens, bathrooms - use lower classification
- ❌ Corridors, storage - basic compliance sufficient
- ❌ Single-family detached houses - internal partitions can be lighter
- ❌ Rural locations with low external noise - standard construction may suffice

## Example Instances

This zone type can be used for:

**First Floor Bedroom Zone:**
```yaml
id: "ZONE-ACOUSTIC-NIGHT-L01"
zoneTypeId: "ZT-ACOUSTIC-NIGHT"
levelIds: ["LVL-01"]
spaceIds: ["SP-BLD-01-L01-001", "SP-BLD-01-L01-002"]  # Bedrooms 01, 02
properties:
  externalNoiseLevelActual: 62  # dB(A), measured external
  facadeReductionActual: 33     # dB, achieved Rw
  internalNoiseLevelExpected: 29  # dB(A), calculated
```

**Ground Floor Bedroom Zone:**
```yaml
id: "ZONE-ACOUSTIC-NIGHT-L00"
zoneTypeId: "ZT-ACOUSTIC-NIGHT"
levelIds: ["LVL-00"]
spaceIds: ["SP-BLD-01-L00-003", "SP-BLD-01-L00-004"]
properties:
  noImpactSoundFromAbove: false  # Has spaces above
  impactSoundTestRequired: true
```

## Verification and Testing

**Design Stage:**
- Acoustic calculations (predictive)
- Product certifications for materials
- Construction details reviewed

**Construction Stage:**
- Inspection of resilient layer installation
- Inspection of acoustic sealing
- No rigid bridges verification

**Post-Completion:**
- Airborne sound insulation testing (R'w)
- Impact sound insulation testing (L'n,w)
- Background noise measurement
- Certification: Pass/Fail against requirements

---

**Document Status:** Zone Type Template
**Version:** 1.0.0
**Applicable Standards:** PN-B-02151-3:2015, WT 2021
**Last Review:** 2026-02-22
**Next Review:** Standard update or project-specific requirements change
