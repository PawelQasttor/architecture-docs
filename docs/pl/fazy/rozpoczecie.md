# Faza 1: Rozpoczęcie Projektu

::: tip Przegląd Fazy
**Co robisz:** Rozpoczynasz nowy projekt architektoniczny, zbierasz wymagania, analizujesz teren
**Czas trwania:** 1-2 tygodnie
**Dokumenty:** Brief projektu, analiza terenu, program funkcjonalny, wstępny budżet
:::

---

## Co dzieje się w tej fazie

W fazie rozpoczęcia projektu:
1. Spotykasz się z klientem aby zrozumieć jego potrzeby
2. Analizujesz teren i jego kontekst
3. Definiujesz program funkcjonalny (wymagania przestrzenne)
4. Ustalasz wstępne ograniczenia budżetowe
5. Sprawdzasz przepisy dotyczące zagospodarowania
6. Określasz cele projektu i kryteria sukcesu

---

## Dokumenty do stworzenia

### Brief Projektu
**Cel:** Określenie zakresu, celów i ograniczeń projektu

**Konfiguracja YAML:**
```yaml
---
documentType: "project_brief"
projectPhase: "initiation"
version: "1.0.0"
lastReviewed: "2026-02-20"
projectInfo:
  name: "Nazwa Twojego Projektu"
  location: "Miasto, Polska"
  clientName: "Nazwa Klienta"
authors:
  - name: "Imię Architekta"
    role: "architekt prowadzący"
    license: "IARP XXXX"
---
```

**Kluczowe sekcje:**
- Wymagania i wizja klienta
- Lokalizacja i charakterystyka terenu
- Program funkcjonalny (pomieszczenia, powierzchnie, przeznaczenie)
- Zakres budżetowy
- Oczekiwania dotyczące harmonogramu
- Specjalne wymagania lub ograniczenia

Szablon briefu projektu (planowane)

---

### Analiza Terenu
**Cel:** Dokumentacja istniejących warunków terenu

**Co dokumentować:**
- Wymiary i topografia terenu
- Istniejące budynki lub roślinność
- Dojazdy i media
- Nasłonecznienie
- Sąsiednie budynki
- Ograniczenia środowiskowe

---

### Program Funkcjonalno-Użytkowy
**Cel:** Określenie wymagań przestrzennych

**Przykładowa struktura:**
```yaml
---
documentType: "functional_program"
projectPhase: "initiation"
spaces:
  - name: "Salon"
    area: "35 m²"
    requirements: ["światło naturalne", "południowa ekspozycja"]
  - name: "Kuchnia"
    area: "15 m²"
    requirements: ["wentylacja", "media"]
---
```

---

## Przepisy do sprawdzenia

Na tym wczesnym etapie zweryfikuj:

### Wymagania Zagospodarowania
- **Co sprawdzić:** Miejscowy plan zagospodarowania (MPZP) lub warunki zabudowy (WZ)
- **Dlaczego:** Określa co można zbudować na terenie
- **Kluczowe parametry:**
  - Dozwolone typy zabudowy
  - Maksymalna wysokość
  - Wskaźnik zabudowy
  - Odległość od granic działki

### Pozwolenie na Budowę
- **Prawo budowlane Art. 29** - Kiedy wymagane pozwolenie?
- **Prawo budowlane Art. 30** - Kiedy wystarczy zgłoszenie?

[Czytaj więcej o Prawie budowlanym →](/pl/przepisy/prawo-budowlane)

---

## Wymagania BIM

### LOD: Nie dotyczy jeszcze
Na tym etapie modelowanie BIM zazwyczaj nie jest rozpoczęte. Skup się na:
- Kontekst terenu (można użyć prostych brył 2D/3D)
- Koncepcyjne diagramy przestrzenne
- Diagramy analizy terenu

---

## Przepływ pracy Git

```bash
# Rozpocznij nowy projekt
mkdir moj-projekt
cd moj-projekt
git init

# Utwórz folder fazy
mkdir 01-rozpoczecie
cd 01-rozpoczecie

# Utwórz dokumenty
touch brief-projektu.md
touch analiza-terenu.md
touch program-funkcjonalny.md

# Zatwierdź
git add .
git commit -m "Początkowa dokumentacja projektu"
git tag rozpoczecie-v1.0
```

---

## Przykładowy Projekt

Zobacz jak ta faza została wykonana w naszym przykładowym projekcie:

**Budynek Zielony Taras - Rozpoczęcie Projektu**
- [Projekt Zielony Taras →](/pl/przyklady/zielony-taras/specyfikacja-projektu)
- [Przykład Zielony Taras →](/pl/przyklady/zielony-taras/)

[Zobacz kompletny projekt Zielony Taras →](/pl/przyklady/zielony-taras/)

---

## Karty SBM w tej fazie

W fazie rozpoczęcia projektu Semantyczny Model Budynku zaczyna nabierać kształtu z podstawowymi kartami:

- **Karta Budynku** — tworzona z podstawowymi metadanymi projektu (nazwa, lokalizacja, klient, typ budynku)
- **Karty Pomieszczeń** — opracowywane jako część wstępnego programu przestrzennego, z przybliżonymi powierzchniami i planowanym przeznaczeniem

Te karty tworzą zarodek SBM i będą stopniowo uściślane w kolejnych fazach.

**Przykład: karta Budynku w fazie rozpoczęcia**
```yaml
entity: Building
id: building-001
name: "Budynek Mieszkalny Zielony Taras"
location:
  city: "Warszawa"
  country: "Polska"
  coordinates:
    lat: 52.2297
    lon: 21.0122
buildingType: "residential"
client: "Green Development Sp. z o.o."
projectPhase: "initiation"
```

Dowiedz się więcej o [Semantycznym Modelu Budynku](/pl/dokumentacja/przeglad).

---

## Kontrola projektu w tej fazie

### Ustalenie zasad nadzoru
Ustal zasady zarządzania projektem od pierwszego dnia. Określ role, kanały komunikacji i sposób podejmowania decyzji.
- [Macierz RACI i plan komunikacji →](/pl/zarzadzanie-projektem/zarzadzanie)
- [Procedury kontroli dokumentów →](/pl/zarzadzanie-projektem/kontrola-dokumentow)

### Analiza interesariuszy
Zidentyfikuj wszystkich interesariuszy: inwestor, organy administracji, sąsiedzi, gestorzy sieci.
- [Rejestr interesariuszy →](/pl/zarzadzanie-projektem/zarzadzanie)

### Weryfikacja MPZP / WZ
Sprawdź plan miejscowy lub złóż wniosek o warunki zabudowy zanim zainwestujesz w projektowanie.
- [Przewodnik MPZP i WZ →](/pl/przepisy/mpzp-wz)

### Rejestr ryzyk
Stwórz początkowy rejestr ryzyk obejmujący ryzyka planistyczne, budżetowe i geotechniczne.
- [Zarządzanie ryzykiem →](/pl/zarzadzanie-projektem/zarzadzanie-ryzykiem)

---

## Następne kroki

Po ukończeniu rozpoczęcia projektu:

**Kontynuuj do Fazy 2:**
[→ Projekt Koncepcyjny (LOD 100)](/pl/fazy/koncepcja)

**Lub przejrzyj kompletny przepływ:**
[← Zobacz wszystkie fazy](/pl/standardy/struktura-dokumentu)

---

## Lista kontrolna

Przed przejściem do Projektu Koncepcyjnego:

- [ ] Zakończony brief projektu z akceptacją klienta
- [ ] Analiza terenu ze zdjęciami i pomiarami
- [ ] Program funkcjonalny z wymaganiami przestrzennymi
- [ ] Wstępne oszacowanie budżetu
- [ ] Weryfikacja zagospodarowania ukończona
- [ ] Wszystkie dokumenty zatwierdzone w Git
- [ ] Zgoda klienta na przejście do projektu koncepcyjnego
