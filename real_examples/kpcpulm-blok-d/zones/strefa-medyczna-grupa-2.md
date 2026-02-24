---
documentType: "zone"
entityType: "zone"
id: "ZONE-MED-GRUPA-2"
zoneName: "Strefa medyczna grupa 2 (zagrożenie życia)"
zoneType: "security"
buildingId: "BLD-KPCPULM-BLOK-D"
version: "0.1.0"
---

# Strefa: Strefa medyczna grupa 2 (IEC 60364-7-710)

## Informacje podstawowe

**Typ encji:** Zone
**ID:** ZONE-MED-GRUPA-2
**Nazwa:** Strefa medyczna grupa 2 (zagrożenie życia)
**Typ strefy:** Medical Equipment Zone - Group 2
**Budynek:** `BLD-KPCPULM-BLOK-D`

## Opis

Strefa obejmuje pomieszczenia medyczne grupy 2 wg normy IEC 60364-7-710, w których przewiduje się kontakt części aplikacyjnych aparatów medycznych do zabiegów na sercu lub podtrzymanie życia, gdzie brak ciągłości zasilania może spowodować zagrożenie życia pacjenta. Jest to strefa o najwyższych wymaganiach elektrycznych i bezpieczeństwa w całym budynku.

## Klasyfikacja wg IEC 60364-7-710

### Grupa 2 - Definicja
Pomieszczenia medyczne, w których przewiduje się:
- Zabiegi inwazyjne na sercu (kardiochirurgia)
- Podtrzymanie życia pacjenta (OIOM, wentylacja mechaniczna)
- Kontakt części aplikacyjnych aparatów medycznych z obszarem serca pacjenta
- Zabiegi, gdzie przerwanie zasilania > 0,5s może spowodować śmierć pacjenta

### Charakterystyka
- **Najwyższa grupa bezpieczeństwa elektrycznego** w normie IEC 60364-7-710
- Dopuszczony **zamierzony lub niezamierzony** kontakt między pacjentem a częścią zestawu elektromedycznego
- Kontakt między pacjentem a personelem dotykającym zestaw elektromedyczny
- Wymagana **redundancja systemów zasilania** i **monitorowanie ciągłe**

## Pomieszczenia w strefie

### Blok operacyjny (I piętro)
- **Sala operacyjna 1 (2.46):** 45,85 m²
- **Sala operacyjna 2 (2.50):** 43,55 m²
- **Przygotowanie chorego 1 (2.44):** 13,10 m²
- **Przygotowanie chorego 2 (2.49):** 12,38 m²
- **Sala wybudzeń (2.59):** 35,48 m² (pacjenci po operacji, wentylacja mechaniczna)

### OIOM - Oddział Anestezjologii i Intensywnej Terapii (I piętro)
- **Sala chorych OIOM 1 (2.6):** 67,64 m² (ok. 4-5 łóżek)
- **Sala chorych OIOM 2 (2.9):** 48,56 m² (ok. 3-4 łóżka)
- **Izolatka OIOM (2.12):** 20,63 m² (1 łóżko, pacjent ciężki + izolacja)

**Łączna powierzchnia strefy:** ~287 m² (8 pomieszczeń)

## Wymagania elektryczne - Grupa 2

### System zasilania IT (transformator separacyjny)

#### Transformator izolacyjny
- **Typ:** transformator separacyjny (izolacyjny) dla każdej sali operacyjnej i sali OIOM osobno
- **Moc:** minimum 10 kVA (sala operacyjna), 20-30 kVA (sala OIOM)
- **Izolacja:** podwójna izolacja między uzwojeniem pierwotnym a wtórnym
- **Napięcie:** 230V AC (wejście i wyjście)
- **Uwagi:** **brak połączenia galwanicznego** z siecią TN-S

#### Monitoring izolacji
- **Urządzenie:** monitor izolacji (Insulation Monitoring Device - IMD)
- **Pomiar:** ciągły pomiar rezystancji izolacji sieci IT względem ziemi
- **Alarm:** wizualny (lampka) i dźwiękowy przy spadku izolacji < 50 kΩ (wg IEC 60364-7-710)
- **Lokalizacja alarmu:** w sali operacyjnej (widoczny dla anestezjologa), w dyżurce technicznej
- **Uwagi:** alarm **nie przerywa** zasilania (zabieg trwa dalej), informuje o pierwszym uszkodzeniu

### Zasilanie awaryjne

#### Agregat prądotwórczy
- **Przełączenie:** < 0,5s (wymaganie dla grupy 2)
- **Typ:** automatyczna stacja zasilania awaryjnego (SZR) z agregatem spalinowym
- **Test:** automatyczny test raz w tygodniu (bez przełączenia, tylko rozruch agregatu)
- **Paliwo:** zbiornik ON min. 8h pracy przy 100% obciążeniu

#### UPS (Uninterruptible Power Supply)
- **Moc:** 5-10 kVA na salę operacyjną / salę OIOM
- **Czas podtrzymania:** minimum 30 minut (dla aparatury podtrzymującej życie)
- **Zasilanie:** aparatura anestezjologiczna, respiratory, monitory pacjenta, pompy infuzyjne
- **Typ:** UPS online (double-conversion), brak przerwy zasilania

#### Redundancja
- **Dwa niezależne źródła zasilania:**
  1. Sieć energetyczna (TN-S) → transformator IT → sala operacyjna/OIOM
  2. Agregat prądotwórczy → transformator IT → sala operacyjna/OIOM
- **Przełączenie:** automatyczne przy zaniku sieci (< 0,5s dla grupy 2)

### Wyrównanie potencjałów

#### Szyna EPR (Equipotential Bonding Rail)
- **Lokalizacja:** w każdej sali operacyjnej i sali OIOM (na ścianie, oznakowana)
- **Materiał:** szyna miedziana, przekrój min. 10 mm²
- **Połączenia:** wszystkie metalowe części w pomieszczeniu:
  - Stół operacyjny
  - Lampy operacyjne (konstrukcje metalowe)
  - Obudowy aparatury medycznej
  - Rury instalacyjne (woda, gazy medyczne)
  - Konstrukcje sufitowe (szyny sufitowe)
  - Ekrany elektromagnetyczne (jeśli są)

#### Rezystancja połączeń
- **Wymaganie:** rezystancja między szyną EPR a każdym metalowym elementem < 0,2 Ω
- **Pomiar:** raz w roku (przegląd techniczny)

### Osobne obiegi elektryczne

#### Izolacja obiegów
- **Zasada:** każda sala operacyjna i sala OIOM ma **osobny transformator IT**
- **Zakaz współdzielenia:** **brak wspólnego transformatora** dla 2 sal operacyjnych (ryzyko propagacji uszkodzenia)
- **Przykład:**
  - Sala operacyjna 1 (2.46) → Transformator IT-1 (10 kVA)
  - Sala operacyjna 2 (2.50) → Transformator IT-2 (10 kVA)
  - Sala OIOM 1 (2.6) → Transformator IT-3 (20 kVA)
  - Sala OIOM 2 (2.9) → Transformator IT-4 (20 kVA)
  - Izolatka OIOM (2.12) → Transformator IT-5 (10 kVA)

## Aparatura medyczna w strefie grupy 2

### Blok operacyjny
- **Stół operacyjny:** zasilanie 230V, regulacja elektryczna/hydrauliczna
- **Lampy operacyjne:** 2 lampy bezcieniowe, zasilanie 230V
- **Elektrokauter (diatermia):** monopolarna/bipolarna, wysokie napięcie RF
- **Aparat anestezjologiczny:** respirator, monitorowanie gazów, zasilanie 230V + UPS
- **Monitor pacjenta:** EKG, SpO₂, NIBP, temperatura, kapnografia - **części aplikacyjne na pacjencie**
- **Pompy infuzyjne:** 2-4 pompy, leki podtrzymujące życie (wazopresory, inotropi)

### OIOM
- **Respiratory:** wentylacja mechaniczna, podtrzymanie życia, zasilanie 230V + UPS
- **Monitor pacjenta:** ciągłe monitorowanie EKG, SpO₂, NIBP, temperatura, CVP (centralne ciśnienie żylne)
- **Pompy infuzyjne:** leki podtrzymujące życie (wazopresory, inotropi, sedacja)
- **Aparat do hemofilt racji/dializy:** (opcjonalnie, dla pacjentów z niewydolnością nerek)
- **Aparat ECMO (opcjonalnie):** pozaustrojowe utlenowanie krwi (ekstremalne wsparcie życia)

## Instalacje gazów medycznych

### Gazy w sali operacyjnej i OIOM
- **Tlen (O₂):** 2-3 punkty na salę, 4,0 bar (anestezja, wentylacja, resuscytacja)
- **Podtlenek azotu (N₂O):** 1 punkt (anestezja, tylko blok operacyjny)
- **Powietrze medyczne:** 2 punkty (respiratory, narzędzia pneumatyczne)
- **Ssanie:** 3 punkty (chirurgiczne, anestezjologiczne)
- **AGSS:** 1 punkt (odprowadzenie anetetyków wziewnych, tylko blok operacyjny)

### Redundancja zasilania gazów
- **Źródło główne:** butlebalony centralne (w piwnicy, 0.35, 0.36)
- **Źródło awaryjne:** butlegrupowe (automatyczne przełączenie przy spadku ciśnienia)
- **Alarm:** centralny alarm przy spadku ciśnienia < 3,5 bar (tlen, powietrze)

## Warunki środowiskowe

### Temperatura i wilgotność
- **Sale operacyjne:** 20-24°C (±1°C), 40-60% RH (±5%)
- **OIOM:** 22-24°C (±1°C), 40-60% RH (±5%)

### Wentylacja i czystość powietrza
- **Sale operacyjne:**
  - Przepływ laminarny LAF nad stołem operacyjnym: klasa ISO 5
  - Strefa ogólna sali: klasa ISO 7
  - Nadciśnienie +15 Pa względem korytarza
  - Filtracja HEPA H14
- **OIOM:**
  - Klasa ISO 8
  - Nadciśnienie +10 Pa względem korytarza
  - Filtracja HEPA H13

### Monitoring warunków środowiskowych
- **Ciągły monitoring:** temperatura, wilgotność, ciśnienie, filtracja (HEPA)
- **Alarmy:** przy przekroczeniu zakresów (widoczne w salach, dyżurce technicznej)

## Procedury i instrukcje

### Testy i przeglądy
- **Monitoring izolacji:** test przed każdym zabiegiem (sala operacyjna), raz dziennie (OIOM)
- **Wyrównanie potencjałów:** pomiar raz w roku (przegląd techniczny elektryczny)
- **UPS:** test raz w miesiącu (symulacja zaniku sieci)
- **Agregat:** test raz w tygodniu (automatyczny rozruch bez przełączenia obciążenia)

### Instrukcje dla personelu
- **Alarm monitoringu izolacji:** kontynuować zabieg, odłączyć aparaty po kolei (identyfikacja uszkodzenia)
- **Zanik zasilania:** przełączenie automatyczne na UPS/agregat (< 0,5s), sprawdzić aparaturę
- **Ewakuacja:** pacjent pod respiratorem → przełączenie na respirator przenośny (akumulatorowy)

## Wymagania regulacyjne

### Normy i przepisy
- **IEC 60364-7-710:** Instalacje elektryczne w pomieszczeniach medycznych
- **PN-EN 60601:** Wyroby medyczne elektryczne (aparatura medyczna)
- **Rozporządzenie Ministra Zdrowia:** Wymagania dla pomieszczeń i urządzeń leczniczych

### Dokumentacja
- **Protokoły pomiarów:** wyrównanie potencjałów, monitoring izolacji, testy UPS/agregatu
- **Instrukcje:** instrukcje bezpieczeństwa elektrycznego dla personelu
- **Schematy:** schematy instalacji elektrycznych IT, rozmieszczenie transformatorów, UPS

## Stan cyklu życia

- **Status:** planned (projektowany)

## Powiązane strefy

- **Strefa pożarowa:** `ZONE-FIRE-ZL-IV`
- **Strefa medyczna grupa 1:** `ZONE-MED-GRUPA-1` (gabinety diagnostyczne, gabinety zabiegowe)
- **Strefa medyczna grupa 0:** `ZONE-MED-GRUPA-0` (pozostałe pomieszczenia medyczne)

## Metadane

- **Grupa bezpieczeństwa:** Grupa 2 (najwyższa)
- **Norma:** IEC 60364-7-710
- **Krytyczność:** Maksymalna (podtrzymanie życia)
- **Data utworzenia:** 2026-02-23
- **Wersja schematu SBM:** v0.1.3

---

**Uwagi:** Strefa medyczna grupa 2 to obszar o najwyższych wymaganiach elektrycznych w całym szpitalu. System zasilania IT z monitoringiem izolacji, zasilanie awaryjne < 0,5s, UPS oraz wyrównanie potencjałów są **obowiązkowe** dla wszystkich pomieszczeń grupy 2. Personel medyczny i techniczny musi być przeszkolony w zakresie obsługi tych systemów oraz procedur postępowania w przypadku alarmów.
