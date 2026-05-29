---
entityType: "approval_gate"
id: "GATE-CAMPUS-PLANNING"
version: "2.4.0"
projectPhase: "design_development"

gateType: "planning_path_confirmed"
gateTitle: "Ścieżka planistyczna kampusu potwierdzona — etapowanie i sekwencja wspólnej infrastruktury"
gatePhase: "concept"
status: "in_progress"
decisionOwner:
  role: "investor"
  name: "Zielony Taras Park Development"
prerequisites:
  - description: "Decyzja środowiskowa dla kampusu uzyskana"
    met: true
    evidenceRef: "PERMIT-CAMPUS-MASTER"
  - description: "Potwierdzona wydajność wspólnej pętli ciepłowniczej dla 4 budynków"
    met: true
    evidenceRef: "SYS-DH-LOOP-CAMPUS"
  - description: "Uzgodniona kolejność etapowania budynków (które pozwolenia w jakiej kolejności)"
    met: false
  - description: "Pakiet budowy wspólnej infrastruktury terenu zsekwencjonowany"
    met: false
    evidenceRef: "CP-SITE-INFRASTRUCTURE"
deliverableRefs:
  - "PERMIT-CAMPUS-MASTER"
  - "CP-SITE-INFRASTRUCTURE"
blockingIssueIds:
  - "ISS-CAMPUS-PLANNING-001"
relatedPermitIds:
  - "PERMIT-CAMPUS-MASTER"
relatedEntityIds:
  - "CAM-GREEN-TERRACE-PARK"
authors:
  - name: "Anna Nowak"
    role: "architect"
    license: "IARP 5678"
---

# Bramka zatwierdzenia: Potwierdzenie ścieżki planistycznej kampusu

Bramka koordynacji na poziomie kampusu, która musi zostać domknięta, zanim
cztery budynki ruszą po swoich niezależnych ścieżkach
pozwoleniowych/budowlanych.

## Decyzja

**Status: W TOKU** — dwa warunki nadal otwarte, a bramka jest **zablokowana**
przez otwarte zgłoszenie planowania kampusu.

| Warunek | Spełniony |
|---------|-----------|
| [Decyzja środowiskowa kampusu](../pozwolenia/PERMIT-CAMPUS-MASTER) | ✅ |
| Wydajność wspólnej pętli ciepłowniczej | ✅ |
| Kolejność etapowania budynków uzgodniona | ⏳ otwarte |
| Wspólna infrastruktura terenu zsekwencjonowana | ⏳ otwarte |

Bramkę utrzymuje otwartą [ISS-CAMPUS-PLANNING-001](../zgloszenia/ISS-CAMPUS-PLANNING-001),
pokazując jak `approval_gate` łączy blokujące `issue` i wspólne `permit`
w wielobudynkowym kampusie.
