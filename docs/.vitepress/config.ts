import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Architecture Documentation Standard",
  description: "AI-ready documentation standard for Polish architects",

  // Output directory
  outDir: '../dist',

  // Clean URLs
  cleanUrls: true,

  // Internationalization
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Architecture Documentation Standard',
      description: 'AI-ready documentation standard for architects',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Get Started',
            items: [
              { text: '🚀 Quick Start (5 min)', link: '/en/standards/quick-start' },
              { text: '🧭 How It Works', link: '/en/standards/how-it-works' },
              { text: 'Complete Workflow', link: '/en/standards/document-structure' }
            ]
          },
          { text: 'Examples', link: '/en/examples/' },
          {
            text: '8 Project Phases',
            items: [
              { text: '1. Project Initiation', link: '/en/phases/initiation' },
              { text: '2. Concept Design (LOD 100)', link: '/en/phases/concept' },
              { text: '3. Schematic Design (LOD 200)', link: '/en/phases/schematic' },
              { text: '4. Design Development (LOD 300)', link: '/en/phases/design-development' },
              { text: '5. Construction Docs (LOD 400)', link: '/en/phases/construction-docs' },
              { text: '6. Construction Phase', link: '/en/phases/construction' },
              { text: '7. As-Built (LOD 500)', link: '/en/phases/as-built' },
              { text: '8. Handover & Maintenance', link: '/en/phases/handover' }
            ]
          },
          {
            text: 'Learn the System',
            items: [
              { text: 'Document Types', link: '/en/documentation/entities/' },
              { text: 'Templates', link: '/en/templates/' },
              { text: 'BIM Integration', link: '/en/bim-integration/' },
              { text: 'System Overview', link: '/en/documentation/overview' }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'Polish Regulations', link: '/en/regulations/' },
              { text: 'Project Management', link: '/en/project-management/' },
              { text: 'Quality Assurance', link: '/en/quality/' },
              { text: 'Building Operations', link: '/en/operations/' },
              { text: 'Sustainability', link: '/en/sustainability/' },
              { text: 'Tools & Guides', link: '/en/guides/' }
            ]
          }
        ],
        sidebar: {
          '/en/documentation/': [
            {
              text: 'Semantic Building Model',
              items: [
                { text: 'Overview', link: '/en/documentation/overview' }
              ]
            },
            {
              text: 'Document Types',
              items: [
                { text: 'Document Types Overview', link: '/en/documentation/entities/' },
                { text: 'Space', link: '/en/documentation/entities/space' },
                { text: 'Space Type', link: '/en/documentation/entities/space-type' },
                { text: 'Zone', link: '/en/documentation/entities/zone' },
                { text: 'Zone Type', link: '/en/documentation/entities/zone-type' },
                { text: 'Requirement', link: '/en/documentation/entities/requirement' },
                { text: 'System', link: '/en/documentation/entities/system' },
                { text: 'System Type', link: '/en/documentation/entities/system-type' },
                { text: 'Asset', link: '/en/documentation/entities/asset' },
                { text: 'Asset Type', link: '/en/documentation/entities/asset-type' },
                { text: 'Envelope', link: '/en/documentation/entities/envelope' },
                { text: 'Opening', link: '/en/documentation/entities/opening' },
                { text: 'Vertical Circulation', link: '/en/documentation/entities/vertical-circulation' },
                { text: 'Site', link: '/en/documentation/entities/site' },
                { text: 'Site Feature', link: '/en/documentation/entities/site-feature' },
                { text: 'Building', link: '/en/documentation/entities/building' },
                { text: 'Level', link: '/en/documentation/entities/level' },
                { text: 'Construction Package', link: '/en/documentation/entities/construction-package' }
              ]
            },
            {
              text: 'Compiler',
              items: [
                { text: 'Compiler Overview', link: '/en/documentation/compiler/' },
                { text: 'Getting Started', link: '/en/documentation/compiler/getting-started' },
                { text: 'Compilation Pipeline', link: '/en/documentation/compiler/pipeline' }
              ]
            },
            {
              text: 'Authoring Guide',
              items: [
                { text: 'Authoring Overview', link: '/en/documentation/authoring/' },
                { text: 'Creating Documents', link: '/en/documentation/authoring/creating-entities' },
                { text: 'Document Templates', link: '/en/documentation/authoring/templates' }
              ]
            }
          ],
          '/en/standards/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Quick Start', link: '/en/standards/quick-start' },
                { text: 'How It All Fits Together', link: '/en/standards/how-it-works' },
                { text: 'Standards Overview', link: '/en/standards/' },
                { text: 'Complete Workflow', link: '/en/standards/document-structure' },
                { text: 'Dual-Format Docs', link: '/en/standards/dual-format' },
                { text: 'Frontmatter Schema', link: '/en/standards/frontmatter-schema' }
              ]
            }
          ],
          '/en/phases/': [
            {
              text: 'Architect Workflow',
              items: [
                { text: 'Complete Overview', link: '/en/standards/document-structure' }
              ]
            },
            {
              text: 'Project Phases',
              items: [
                { text: '1. Project Initiation', link: '/en/phases/initiation' },
                { text: '2. Concept Design (LOD 100)', link: '/en/phases/concept' },
                { text: '3. Schematic Design (LOD 200)', link: '/en/phases/schematic' },
                { text: '4. Design Development (LOD 300)', link: '/en/phases/design-development' },
                { text: '5. Construction Docs (LOD 400)', link: '/en/phases/construction-docs' },
                { text: '6. Construction Phase', link: '/en/phases/construction' },
                { text: '7. As-Built (LOD 500)', link: '/en/phases/as-built' },
                { text: '8. Handover & Maintenance', link: '/en/phases/handover' }
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Regulations', link: '/en/regulations/' },
                { text: 'IFC Entities', link: '/en/bim-integration/ifc-entities' },
                { text: 'LOD Definitions', link: '/en/bim-integration/lod-definitions' }
              ]
            }
          ],
          '/en/project-management/': [
            {
              text: 'Project Management',
              items: [
                { text: 'Overview', link: '/en/project-management/' },
                { text: 'Governance', link: '/en/project-management/governance' },
                { text: 'Document Control', link: '/en/project-management/document-control' },
                { text: 'Change Management', link: '/en/project-management/change-management' },
                { text: 'Risk Management', link: '/en/project-management/risk-management' },
                { text: 'Data Governance', link: '/en/project-management/data-governance' }
              ]
            }
          ],
          '/en/quality/': [
            {
              text: 'Quality Assurance',
              items: [
                { text: 'Overview', link: '/en/quality/' },
                { text: 'Phase Gate Checklists', link: '/en/quality/phase-gates' },
                { text: 'Review Procedures', link: '/en/quality/review-procedures' }
              ]
            }
          ],
          '/en/sustainability/': [
            {
              text: 'Sustainability',
              items: [
                { text: 'Overview', link: '/en/sustainability/' },
                { text: 'Energy & Carbon', link: '/en/sustainability/energy-carbon' },
                { text: 'Indoor Environment', link: '/en/sustainability/indoor-quality' },
                { text: 'Water Management', link: '/en/sustainability/water' }
              ]
            }
          ],
          '/en/operations/': [
            {
              text: 'Building Operations',
              items: [
                { text: 'Overview', link: '/en/operations/' },
                { text: 'Maintenance Planning', link: '/en/operations/maintenance' },
                { text: 'Incident Management', link: '/en/operations/incidents' },
                { text: 'Retrofit & Upgrades', link: '/en/operations/retrofit' }
              ]
            }
          ],
          '/en/regulations/': [
            {
              text: 'Polish Regulations',
              items: [
                { text: 'Overview', link: '/en/regulations/' },
                { text: 'Prawo Budowlane', link: '/en/regulations/prawo-budowlane' },
                { text: 'WT 2021', link: '/en/regulations/wt-2021' }
              ]
            },
            {
              text: 'Procedures',
              items: [
                { text: 'Zoning: MPZP & WZ', link: '/en/regulations/zoning-mpzp-wz' },
                { text: 'Building Permit', link: '/en/regulations/building-permit' },
                { text: 'Construction Formalities', link: '/en/regulations/construction-formalities' },
                { text: 'Completion & Occupancy', link: '/en/regulations/completion-occupancy' },
                { text: 'Administrative Fees', link: '/en/regulations/fees' }
              ]
            }
          ],
          '/en/bim-integration/': [
            {
              text: 'BIM Integration',
              items: [
                { text: 'Overview', link: '/en/bim-integration/' },
                { text: 'IFC Entities', link: '/en/bim-integration/ifc-entities' },
                { text: 'LOD Definitions', link: '/en/bim-integration/lod-definitions' },
                { text: 'Bi-directional Sync', link: '/en/bim-integration/bidirectional-sync' }
              ]
            },
            {
              text: 'BIM Management',
              items: [
                { text: 'BIM Execution Plan', link: '/en/bim-integration/bep' },
                { text: 'Common Data Environment', link: '/en/bim-integration/cde' },
                { text: 'LOD/LOI Matrix', link: '/en/bim-integration/lod-loi' },
                { text: 'Sensors & IoT', link: '/en/bim-integration/sensors-iot' }
              ]
            }
          ],
          '/en/guides/': [
            {
              text: 'Guides',
              items: [
                { text: 'Overview', link: '/en/guides/' },
                { text: 'Data Provenance', link: '/en/guides/data-provenance' },
                { text: 'PDF Export', link: '/en/guides/pdf-export' },
                { text: 'Starting a New Project', link: '/en/guides/new-project' },
                { text: 'Existing Buildings', link: '/en/guides/existing-buildings' }
              ]
            }
          ],
          '/en/templates/': [
            {
              text: 'Templates',
              items: [
                { text: 'Overview', link: '/en/templates/' },
                { text: 'Space Template', link: '/en/templates/space-template' },
                { text: 'Zone Template', link: '/en/templates/zone-template' },
                { text: 'Requirement Template', link: '/en/templates/requirement-template' },
                { text: 'System Template', link: '/en/templates/system-template' },
                { text: 'Asset Template', link: '/en/templates/asset-template' }
              ]
            }
          ],
          '/en/examples/': [
            {
              text: 'Examples',
              items: [
                { text: 'Overview', link: '/en/examples/' },
                {
                  text: 'Green Terrace Building',
                  collapsed: false,
                  items: [
                    { text: 'Project Overview', link: '/en/examples/green-terrace/' },
                    { text: 'Site', link: '/en/examples/green-terrace/site' },
                    { text: 'Project Specification', link: '/en/examples/green-terrace/project-specification' },
                    { text: 'Staircase A', link: '/en/examples/green-terrace/staircase-a' },
                    { text: 'Envelope: External Wall', link: '/en/examples/green-terrace/envelope-external-wall-type-a' },
                    { text: 'External Wall Type A (Legacy)', link: '/en/examples/green-terrace/external-wall-type-a' },
                    { text: 'Bedroom 01', link: '/en/examples/green-terrace/spaces/bedroom-01' },
                    { text: 'Bedroom 02', link: '/en/examples/green-terrace/spaces/bedroom-02' },
                    { text: 'Corridor', link: '/en/examples/green-terrace/spaces/corridor' },
                    { text: 'Stairwell Void', link: '/en/examples/green-terrace/spaces/stairwell-void' },
                    { text: 'Space Type: Bedroom A', link: '/en/examples/green-terrace/space-types/ST-BEDROOM-STANDARD-A' },
                    { text: 'Fire Zone ZL-IV', link: '/en/examples/green-terrace/zones/fire-zone-zl-iv' },
                    { text: 'HVAC Zone North', link: '/en/examples/green-terrace/zones/hvac-zone-north' },
                    { text: 'Acoustic Zone Night', link: '/en/examples/green-terrace/zones/acoustic-zone-night' },
                    { text: 'Acoustic Zone Type', link: '/en/examples/green-terrace/zone-types/acoustic-zone-night' },
                    { text: 'Fire Zone Type ZL-IV', link: '/en/examples/green-terrace/zone-types/fire-zone-zl-iv' },
                    { text: 'HVAC Zone Type', link: '/en/examples/green-terrace/zone-types/hvac-zone-residential' },
                    { text: 'HVAC System Type (MVHR)', link: '/en/examples/green-terrace/system-types/hvac-residential-mvhr' },
                    { text: 'HVAC System', link: '/en/examples/green-terrace/systems/sys-hvac-01' },
                    { text: 'Heating Subsystem', link: '/en/examples/green-terrace/systems/sys-hvac-01-heating' },
                    { text: 'Ventilation Subsystem', link: '/en/examples/green-terrace/systems/sys-hvac-01-vent' },
                    { text: 'Heat Pump (Asset Type)', link: '/en/examples/green-terrace/asset-types/bosch-heat-pump-7000i' },
                    { text: 'Heat Pump HP-01', link: '/en/examples/green-terrace/assets/ai-hp-01' },
                    { text: 'MVHR Unit', link: '/en/examples/green-terrace/assets/ai-mvhr-01' },
                    { text: 'UFH Manifold', link: '/en/examples/green-terrace/assets/ai-ufh-manifold-01' },
                    { text: 'REQ: Fire Egress', link: '/en/examples/green-terrace/requirements/REQ-FIRE-EGRESS-TIME-001' },
                    { text: 'REQ: Acoustic', link: '/en/examples/green-terrace/requirements/REQ-LEVEL-ACOUSTIC-B' },
                    { text: 'REQ: Fire Rating', link: '/en/examples/green-terrace/requirements/REQ-LEVEL-FIRE-RATING' },
                    { text: 'Level 01', link: '/en/examples/green-terrace/levels/level-01' },
                    { text: 'Window Type: Internorm KF410', link: '/en/examples/green-terrace/opening-types/internorm-kf410-window' },
                    { text: 'Door Type: Fire EI30', link: '/en/examples/green-terrace/opening-types/fire-door-ei30' },
                    { text: 'Window N-001', link: '/en/examples/green-terrace/openings/opn-win-n-001' },
                    { text: 'Window N-002', link: '/en/examples/green-terrace/openings/opn-win-n-002' },
                    { text: 'Fire Door Stair-01', link: '/en/examples/green-terrace/openings/opn-door-stair-01' },
                    { text: 'Site Feature Type: Paving', link: '/en/examples/green-terrace/site-feature-types/sft-permeable-paving' },
                    { text: 'North Garden', link: '/en/examples/green-terrace/site-features/sf-north-garden' },
                    { text: 'Parking Area', link: '/en/examples/green-terrace/site-features/sf-parking' },
                    { text: 'CP: Structure', link: '/en/examples/green-terrace/construction-packages/cp-structure' },
                    { text: 'CP: Envelope', link: '/en/examples/green-terrace/construction-packages/cp-envelope' },
                    { text: 'CP: MEP', link: '/en/examples/green-terrace/construction-packages/cp-mep' },
                    { text: 'CP: Finishes', link: '/en/examples/green-terrace/construction-packages/cp-finishes' }
                  ]
                }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/architecture-docs/standard' }
        ]
      }
    },
    pl: {
      label: 'Polski',
      lang: 'pl',
      title: 'Standard Dokumentacji Architektonicznej',
      description: 'Standard dokumentacji gotowy na AI dla architektów',
      themeConfig: {
        nav: [
          { text: 'Strona główna', link: '/pl/' },
          {
            text: 'Jak Zacząć',
            items: [
              { text: '🚀 Szybki Start (5 min)', link: '/pl/standardy/szybki-start' },
              { text: '🧭 Jak to działa', link: '/pl/standardy/jak-to-dziala' },
              { text: 'Kompletny przepływ pracy', link: '/pl/standardy/struktura-dokumentu' }
            ]
          },
          { text: 'Przykłady', link: '/pl/przyklady/' },
          {
            text: '8 Faz Projektu',
            items: [
              { text: '1. Rozpoczęcie Projektu', link: '/pl/fazy/rozpoczecie' },
              { text: '2. Projekt Koncepcyjny (LOD 100)', link: '/pl/fazy/koncepcja' },
              { text: '3. Projekt Wstępny (LOD 200)', link: '/pl/fazy/wstepny' },
              { text: '4. Projekt Budowlany (LOD 300)', link: '/pl/fazy/budowlany' },
              { text: '5. Projekt Wykonawczy (LOD 400)', link: '/pl/fazy/wykonawczy' },
              { text: '6. Faza Budowy', link: '/pl/fazy/budowa' },
              { text: '7. Dokumentacja Powykonawcza (LOD 500)', link: '/pl/fazy/powykonawcza' },
              { text: '8. Przekazanie i Konserwacja', link: '/pl/fazy/przekazanie' }
            ]
          },
          {
            text: 'Poznaj System',
            items: [
              { text: 'Rodzaje kart', link: '/pl/dokumentacja/encje/' },
              { text: 'Szablony', link: '/pl/szablony/' },
              { text: 'Integracja BIM', link: '/pl/integracja-bim/' },
              { text: 'Przegląd systemu', link: '/pl/dokumentacja/przeglad' }
            ]
          },
          {
            text: 'Materiały Pomocnicze',
            items: [
              { text: 'Polskie Przepisy', link: '/pl/przepisy/' },
              { text: 'Zarządzanie Projektem', link: '/pl/zarzadzanie-projektem/' },
              { text: 'Zapewnienie Jakości', link: '/pl/jakosc/' },
              { text: 'Eksploatacja Budynku', link: '/pl/eksploatacja/' },
              { text: 'Zrównoważone budownictwo', link: '/pl/zrownowazonosc/' },
              { text: 'Narzędzia i Przewodniki', link: '/pl/przewodniki/' }
            ]
          }
        ],
        sidebar: {
          '/pl/dokumentacja/': [
            {
              text: 'Semantyczny Model Budynku',
              items: [
                { text: 'Przegląd', link: '/pl/dokumentacja/przeglad' }
              ]
            },
            {
              text: 'Rodzaje kart',
              items: [
                { text: 'Przegląd kart', link: '/pl/dokumentacja/encje/' },
                { text: 'Pomieszczenie', link: '/pl/dokumentacja/encje/przestrzen' },
                { text: 'Typ Przestrzeni', link: '/pl/dokumentacja/encje/typ-przestrzeni' },
                { text: 'Strefa', link: '/pl/dokumentacja/encje/strefa' },
                { text: 'Typ Strefy', link: '/pl/dokumentacja/encje/typ-strefy' },
                { text: 'Wymaganie', link: '/pl/dokumentacja/encje/wymaganie' },
                { text: 'Instalacja', link: '/pl/dokumentacja/encje/system' },
                { text: 'Typ Systemu', link: '/pl/dokumentacja/encje/typ-systemu' },
                { text: 'Urządzenie', link: '/pl/dokumentacja/encje/zasob' },
                { text: 'Typ Zasobu', link: '/pl/dokumentacja/encje/typ-zasobu' },
                { text: 'Przegroda', link: '/pl/dokumentacja/encje/przegroda' },
                { text: 'Otwór', link: '/pl/dokumentacja/encje/otwor' },
                { text: 'Komunikacja Pionowa', link: '/pl/dokumentacja/encje/komunikacja-pionowa' },
                { text: 'Działka', link: '/pl/dokumentacja/encje/dzialka' },
                { text: 'Element Terenu', link: '/pl/dokumentacja/encje/element-terenu' },
                { text: 'Budynek', link: '/pl/dokumentacja/encje/budynek' },
                { text: 'Kondygnacja', link: '/pl/dokumentacja/encje/poziom' },
                { text: 'Pakiet Budowlany', link: '/pl/dokumentacja/encje/pakiet-budowlany' }
              ]
            },
            {
              text: 'Kompilator',
              items: [
                { text: 'Przegląd Kompilatora', link: '/pl/dokumentacja/kompilator/' },
                { text: 'Pierwsze Kroki', link: '/pl/dokumentacja/kompilator/pierwsze-kroki' },
                { text: 'Potok Kompilacji', link: '/pl/dokumentacja/kompilator/potok' }
              ]
            },
            {
              text: 'Przewodnik Tworzenia',
              items: [
                { text: 'Przegląd Tworzenia', link: '/pl/dokumentacja/tworzenie/' },
                { text: 'Tworzenie kart', link: '/pl/dokumentacja/tworzenie/tworzenie-encji' },
                { text: 'Szablony kart', link: '/pl/dokumentacja/tworzenie/szablony' }
              ]
            }
          ],
          '/pl/standardy/': [
            {
              text: 'Jak zacząć',
              items: [
                { text: 'Szybki Start', link: '/pl/standardy/szybki-start' },
                { text: 'Jak to działa', link: '/pl/standardy/jak-to-dziala' },
                { text: 'Przegląd', link: '/pl/standardy/' },
                { text: 'Kompletny przepływ pracy', link: '/pl/standardy/struktura-dokumentu' },
                { text: 'Dokumenty dwuformatowe', link: '/pl/standardy/dual-format' },
                { text: 'Schema frontmatter', link: '/pl/standardy/schema-frontmatter' }
              ]
            }
          ],
          '/pl/fazy/': [
            {
              text: 'Przepływ pracy architekta',
              items: [
                { text: 'Kompletny przegląd', link: '/pl/standardy/struktura-dokumentu' }
              ]
            },
            {
              text: 'Fazy Projektu',
              items: [
                { text: '1. Rozpoczęcie Projektu', link: '/pl/fazy/rozpoczecie' },
                { text: '2. Projekt Koncepcyjny (LOD 100)', link: '/pl/fazy/koncepcja' },
                { text: '3. Projekt Wstępny (LOD 200)', link: '/pl/fazy/wstepny' },
                { text: '4. Projekt Budowlany (LOD 300)', link: '/pl/fazy/budowlany' },
                { text: '5. Projekt Wykonawczy (LOD 400)', link: '/pl/fazy/wykonawczy' },
                { text: '6. Faza Budowy', link: '/pl/fazy/budowa' },
                { text: '7. Dokumentacja Powykonawcza (LOD 500)', link: '/pl/fazy/powykonawcza' },
                { text: '8. Przekazanie i Konserwacja', link: '/pl/fazy/przekazanie' }
              ]
            },
            {
              text: 'Materiały Pomocnicze',
              items: [
                { text: 'Przepisy', link: '/pl/przepisy/' },
                { text: 'Obiekty IFC', link: '/pl/integracja-bim/encje-ifc' },
                { text: 'Definicje LOD', link: '/pl/integracja-bim/definicje-lod' }
              ]
            }
          ],
          '/pl/zarzadzanie-projektem/': [
            {
              text: 'Zarządzanie Projektem',
              items: [
                { text: 'Przegląd', link: '/pl/zarzadzanie-projektem/' },
                { text: 'Nadzór i organizacja', link: '/pl/zarzadzanie-projektem/zarzadzanie' },
                { text: 'Kontrola dokumentów', link: '/pl/zarzadzanie-projektem/kontrola-dokumentow' },
                { text: 'Zarządzanie zmianami', link: '/pl/zarzadzanie-projektem/zarzadzanie-zmianami' },
                { text: 'Zarządzanie ryzykiem', link: '/pl/zarzadzanie-projektem/zarzadzanie-ryzykiem' },
                { text: 'Zarządzanie danymi', link: '/pl/zarzadzanie-projektem/zarzadzanie-danymi' }
              ]
            }
          ],
          '/pl/jakosc/': [
            {
              text: 'Zapewnienie Jakości',
              items: [
                { text: 'Przegląd', link: '/pl/jakosc/' },
                { text: 'Bramki fazowe', link: '/pl/jakosc/bramki-fazowe' },
                { text: 'Procedury przeglądów', link: '/pl/jakosc/procedury-przegladow' }
              ]
            }
          ],
          '/pl/zrownowazonosc/': [
            {
              text: 'Zrównoważone budownictwo',
              items: [
                { text: 'Przegląd', link: '/pl/zrownowazonosc/' },
                { text: 'Energia i ślad węglowy', link: '/pl/zrownowazonosc/energia-karbon' },
                { text: 'Jakość środowiska wewnętrznego', link: '/pl/zrownowazonosc/jakosc-wnetrz' },
                { text: 'Gospodarka wodna', link: '/pl/zrownowazonosc/woda' }
              ]
            }
          ],
          '/pl/eksploatacja/': [
            {
              text: 'Eksploatacja Budynku',
              items: [
                { text: 'Przegląd', link: '/pl/eksploatacja/' },
                { text: 'Planowanie konserwacji', link: '/pl/eksploatacja/konserwacja' },
                { text: 'Zarządzanie awariami', link: '/pl/eksploatacja/awarie' },
                { text: 'Modernizacja', link: '/pl/eksploatacja/modernizacja' }
              ]
            }
          ],
          '/pl/przepisy/': [
            {
              text: 'Polskie przepisy',
              items: [
                { text: 'Przegląd', link: '/pl/przepisy/' },
                { text: 'Prawo Budowlane', link: '/pl/przepisy/prawo-budowlane' },
                { text: 'WT 2021', link: '/pl/przepisy/wt-2021' }
              ]
            },
            {
              text: 'Procedury',
              items: [
                { text: 'MPZP i WZ', link: '/pl/przepisy/mpzp-wz' },
                { text: 'Pozwolenie na budowę', link: '/pl/przepisy/pozwolenie-na-budowe' },
                { text: 'Formalności budowlane', link: '/pl/przepisy/formalnosci-budowlane' },
                { text: 'Odbiory i użytkowanie', link: '/pl/przepisy/odbiory-uzytkowanie' },
                { text: 'Opłaty administracyjne', link: '/pl/przepisy/oplaty' }
              ]
            }
          ],
          '/pl/integracja-bim/': [
            {
              text: 'Integracja BIM',
              items: [
                { text: 'Przegląd', link: '/pl/integracja-bim/' },
                { text: 'Obiekty IFC', link: '/pl/integracja-bim/encje-ifc' },
                { text: 'Definicje LOD', link: '/pl/integracja-bim/definicje-lod' },
                { text: 'Synchronizacja dwukierunkowa', link: '/pl/integracja-bim/synchronizacja-dwukierunkowa' }
              ]
            },
            {
              text: 'Zarządzanie BIM',
              items: [
                { text: 'Plan Realizacji BIM (BEP)', link: '/pl/integracja-bim/bep' },
                { text: 'Wspólne Środowisko Danych', link: '/pl/integracja-bim/cde' },
                { text: 'Matryca LOD/LOI', link: '/pl/integracja-bim/lod-loi' },
                { text: 'Czujniki i IoT', link: '/pl/integracja-bim/czujniki-iot' }
              ]
            }
          ],
          '/pl/przewodniki/': [
            {
              text: 'Przewodniki',
              items: [
                { text: 'Przegląd', link: '/pl/przewodniki/' },
                { text: 'Proweniencja danych', link: '/pl/przewodniki/proweniencja-danych' },
                { text: 'Eksport PDF', link: '/pl/przewodniki/eksport-pdf' },
                { text: 'Nowy projekt', link: '/pl/przewodniki/nowy-projekt' },
                { text: 'Istniejące budynki', link: '/pl/przewodniki/istniejace-budynki' }
              ]
            }
          ],
          '/pl/szablony/': [
            {
              text: 'Szablony',
              items: [
                { text: 'Przegląd', link: '/pl/szablony/' },
                { text: 'Szablon Przestrzeni', link: '/pl/szablony/szablon-przestrzeni' },
                { text: 'Szablon Strefy', link: '/pl/szablony/szablon-strefy' },
                { text: 'Szablon Wymagania', link: '/pl/szablony/szablon-wymagania' },
                { text: 'Szablon Systemu', link: '/pl/szablony/szablon-systemu' },
                { text: 'Szablon Zasobu', link: '/pl/szablony/szablon-zasobu' }
              ]
            }
          ],
          '/pl/przyklady/': [
            {
              text: 'Przykłady',
              items: [
                { text: 'Przegląd', link: '/pl/przyklady/' },
                {
                  text: 'Budynek Zielony Taras',
                  collapsed: false,
                  items: [
                    { text: 'Przegląd Projektu', link: '/pl/przyklady/zielony-taras/' },
                    { text: 'Działka', link: '/pl/przyklady/zielony-taras/dzialka' },
                    { text: 'Specyfikacja Projektu', link: '/pl/przyklady/zielony-taras/specyfikacja-projektu' },
                    { text: 'Klatka Schodowa A', link: '/pl/przyklady/zielony-taras/klatka-schodowa-a' },
                    { text: 'Przegroda: Ściana Zewnętrzna', link: '/pl/przyklady/zielony-taras/przegroda-sciana-zewnetrzna-typ-a' },
                    { text: 'Ściana Zewnętrzna Typ A (Legacy)', link: '/pl/przyklady/zielony-taras/sciana-zewnetrzna-typ-a' },
                    { text: 'Sypialnia 01', link: '/pl/przyklady/zielony-taras/przestrzenie/sypialnia-01' },
                    { text: 'Sypialnia 02', link: '/pl/przyklady/zielony-taras/przestrzenie/sypialnia-02' },
                    { text: 'Korytarz', link: '/pl/przyklady/zielony-taras/przestrzenie/korytarz' },
                    { text: 'Pustka Klatki Schodowej', link: '/pl/przyklady/zielony-taras/przestrzenie/pustka-klatki-schodowej' },
                    { text: 'Typ Przestrzeni: Sypialnia A', link: '/pl/przyklady/zielony-taras/typy-przestrzeni/ST-BEDROOM-STANDARD-A' },
                    { text: 'Strefa Pożarowa ZL-IV', link: '/pl/przyklady/zielony-taras/strefy/strefa-pozarowa-zl-iv' },
                    { text: 'Strefa HVAC Północ', link: '/pl/przyklady/zielony-taras/strefy/strefa-hvac-polnoc' },
                    { text: 'Strefa Akustyczna Noc', link: '/pl/przyklady/zielony-taras/strefy/strefa-akustyczna-noc' },
                    { text: 'Typ Strefy Akustycznej', link: '/pl/przyklady/zielony-taras/typy-stref/strefa-akustyczna-noc' },
                    { text: 'Typ Strefy Pożarowej ZL-IV', link: '/pl/przyklady/zielony-taras/typy-stref/strefa-pozarowa-zl-iv' },
                    { text: 'Typ Strefy HVAC', link: '/pl/przyklady/zielony-taras/typy-stref/strefa-hvac-mieszkalna' },
                    { text: 'Typ Systemu HVAC (MVHR)', link: '/pl/przyklady/zielony-taras/typy-systemow/hvac-mieszkalny-mvhr' },
                    { text: 'System HVAC', link: '/pl/przyklady/zielony-taras/systemy/sys-hvac-01' },
                    { text: 'Podsystem Ogrzewania', link: '/pl/przyklady/zielony-taras/systemy/sys-hvac-01-ogrzewanie' },
                    { text: 'Podsystem Wentylacji', link: '/pl/przyklady/zielony-taras/systemy/sys-hvac-01-wentylacja' },
                    { text: 'Pompa Ciepła (Typ Zasobu)', link: '/pl/przyklady/zielony-taras/typy-zasobow/pompa-ciepla-bosch-7000i' },
                    { text: 'Pompa Ciepła HP-01', link: '/pl/przyklady/zielony-taras/zasoby/ai-hp-01' },
                    { text: 'Jednostka MVHR-01', link: '/pl/przyklady/zielony-taras/zasoby/ai-mvhr-01' },
                    { text: 'Rozdzielacz UFH-01', link: '/pl/przyklady/zielony-taras/zasoby/ai-ufh-manifold-01' },
                    { text: 'WYM: Czas Ewakuacji', link: '/pl/przyklady/zielony-taras/wymagania/REQ-FIRE-EGRESS-TIME-001' },
                    { text: 'WYM: Akustyka', link: '/pl/przyklady/zielony-taras/wymagania/REQ-LEVEL-ACOUSTIC-B' },
                    { text: 'WYM: Odporność Ogniowa', link: '/pl/przyklady/zielony-taras/wymagania/REQ-LEVEL-FIRE-RATING' },
                    { text: 'Poziom 01', link: '/pl/przyklady/zielony-taras/poziomy/poziom-01' },
                    { text: 'Typ Okna: Internorm KF410', link: '/pl/przyklady/zielony-taras/typy-otworow/okno-internorm-kf410' },
                    { text: 'Typ Drzwi: Pożarowe EI30', link: '/pl/przyklady/zielony-taras/typy-otworow/drzwi-pozarowe-ei30' },
                    { text: 'Okno N-001', link: '/pl/przyklady/zielony-taras/otwory/opn-win-n-001' },
                    { text: 'Okno N-002', link: '/pl/przyklady/zielony-taras/otwory/opn-win-n-002' },
                    { text: 'Drzwi Poż. Klatka-01', link: '/pl/przyklady/zielony-taras/otwory/opn-door-stair-01' },
                    { text: 'Typ Elementu: Nawierzchnia', link: '/pl/przyklady/zielony-taras/typy-elementow-terenu/sft-nawierzchnia-przepuszczalna' },
                    { text: 'Ogród Północny', link: '/pl/przyklady/zielony-taras/elementy-terenu/sf-ogrod-polnocny' },
                    { text: 'Parking', link: '/pl/przyklady/zielony-taras/elementy-terenu/sf-parking' },
                    { text: 'PB: Konstrukcja', link: '/pl/przyklady/zielony-taras/pakiety-budowlane/cp-konstrukcja' },
                    { text: 'PB: Przegrody', link: '/pl/przyklady/zielony-taras/pakiety-budowlane/cp-przegroda' },
                    { text: 'PB: Instalacje', link: '/pl/przyklady/zielony-taras/pakiety-budowlane/cp-instalacje' },
                    { text: 'PB: Wykończenia', link: '/pl/przyklady/zielony-taras/pakiety-budowlane/cp-wykonczenie' }
                  ]
                }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/architecture-docs/standard' }
        ],
        // Polish UI translations
        outline: {
          label: 'Na tej stronie'
        },
        returnToTopLabel: 'Powrót do góry',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Motyw',
        lightModeSwitchTitle: 'Przełącz na tryb jasny',
        darkModeSwitchTitle: 'Przełącz na tryb ciemny'
      }
    }
  },

  themeConfig: {
    // Search
    search: {
      provider: 'local'
    }
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
