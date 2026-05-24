import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Semantic Building Model (SBM)",
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
      title: 'Semantic Building Model (SBM)',
      description: 'AI-ready documentation standard for architects',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Start',
            items: [
              { text: '💡 What is SBM?', link: '/en/standards/introduction' },
              { text: '🚀 Quick Start (5 min)', link: '/en/standards/quick-start' },
              { text: '🧭 How It Works', link: '/en/standards/how-it-works' },
              { text: 'Glossary', link: '/en/standards/glossary' },
              { text: 'Complete Workflow', link: '/en/standards/document-structure' }
            ]
          },
          {
            text: 'Model',
            items: [
              { text: 'Document Types (27)', link: '/en/documentation/entities/' },
              { text: 'System Overview', link: '/en/documentation/overview' },
              { text: 'Templates', link: '/en/templates/' },
              { text: 'Entity Design Principles', link: '/en/guides/entity-design-principles' },
              { text: 'Property Inheritance', link: '/en/guides/property-inheritance' }
            ]
          },
          { text: 'Lifecycle', link: '/en/phases/' },
          { text: 'Compiler', link: '/en/documentation/compiler/' },
          { text: 'Example', link: '/en/examples/' },
          {
            text: 'Reference',
            items: [
              { text: 'Polish Regulations', link: '/en/regulations/' },
              { text: 'BIM Integration', link: '/en/bim-integration/' },
              { text: 'Project Management', link: '/en/project-management/' },
              { text: 'Quality Assurance', link: '/en/quality/' },
              { text: 'Building Operations', link: '/en/operations/' },
              { text: 'Sustainability', link: '/en/sustainability/' },
              { text: 'Guides & Tools', link: '/en/guides/' }
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
                { text: 'Quick Reference (All 19 Types)', link: '/en/documentation/entities/quick-reference' },
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
                { text: 'Construction Package', link: '/en/documentation/entities/construction-package' },
                { text: 'Campus', link: '/en/documentation/entities/campus' },
                { text: 'Space Program', link: '/en/documentation/entities/space-program' },
                { text: 'Material Type', link: '/en/documentation/entities/material-type' },
                { text: 'Material', link: '/en/documentation/entities/material' },
                { text: 'Structural System', link: '/en/documentation/entities/structural-system' },
                { text: 'Issue', link: '/en/documentation/entities/issue' },
                { text: 'Commissioning Test', link: '/en/documentation/entities/commissioning-test' },
                { text: 'Circulation Route', link: '/en/documentation/entities/circulation-route' }
              ]
            },
            {
              text: 'Compiler',
              items: [
                { text: 'Compiler Overview', link: '/en/documentation/compiler/' },
                { text: 'Getting Started', link: '/en/documentation/compiler/getting-started' },
                { text: 'Compilation Pipeline', link: '/en/documentation/compiler/pipeline' },
                { text: 'Error Reference', link: '/en/documentation/compiler/error-reference' }
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
                { text: 'What is SBM?', link: '/en/standards/introduction' },
                { text: 'Quick Start', link: '/en/standards/quick-start' },
                { text: 'How It All Fits Together', link: '/en/standards/how-it-works' },
                { text: 'Standards Overview', link: '/en/standards/' },
                { text: 'Complete Workflow', link: '/en/standards/document-structure' },
                { text: 'Glossary of Terms', link: '/en/standards/glossary' },
                { text: 'Dual-Format Docs', link: '/en/standards/dual-format' },
                { text: 'Frontmatter Schema', link: '/en/standards/frontmatter-schema' }
              ]
            }
          ],
          '/en/phases/': [
            {
              text: 'SBM Lifecycle',
              items: [
                { text: 'The 10-Phase Lifecycle', link: '/en/phases/' },
                { text: '1. Concept', link: '/en/phases/concept' },
                { text: '2. Schematic Design', link: '/en/phases/schematic-design' },
                { text: '3. Design Development', link: '/en/phases/design-development' },
                { text: '4. Construction Documents', link: '/en/phases/construction-documents' },
                { text: '5. Bidding & Procurement', link: '/en/phases/bidding-procurement' },
                { text: '6. Construction', link: '/en/phases/construction' },
                { text: '7. Commissioning', link: '/en/phases/commissioning' },
                { text: '8. Operation', link: '/en/phases/operation' },
                { text: '9. Renovation', link: '/en/phases/renovation' },
                { text: '10. Decommissioned', link: '/en/phases/decommissioned' }
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Complete Workflow', link: '/en/standards/document-structure' },
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
                { text: 'Entity Design Principles', link: '/en/guides/entity-design-principles' },
                { text: 'Property Inheritance', link: '/en/guides/property-inheritance' },
                { text: 'IFC Mapping', link: '/en/guides/ifc-mapping' },
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
                    { text: 'CP: Finishes', link: '/en/examples/green-terrace/construction-packages/cp-finishes' },
                    { text: 'Program: Standard Bedrooms (Brief)', link: '/en/examples/green-terrace/space-programs/PROG-BEDROOM-STANDARD' },
                    { text: 'Structural System', link: '/en/examples/green-terrace/structural-systems/STR-GREEN-TERRACE' },
                    { text: 'Material: Concrete C30/37', link: '/en/examples/green-terrace/materials/MT-CONCRETE-C30-37' },
                    { text: 'Material: PIR Insulation 150', link: '/en/examples/green-terrace/materials/MT-INSULATION-PIR-150' },
                    { text: 'Circulation Route: Fire Egress L01', link: '/en/examples/green-terrace/circulation-routes/CR-FIRE-EGRESS-L01' },
                    { text: 'Issue: Bid Addendum 01', link: '/en/examples/green-terrace/issues/ISS-BID-001' },
                    { text: 'Issue: RFI 001', link: '/en/examples/green-terrace/issues/ISS-RFI-001' },
                    { text: 'Issue: Change Order 001', link: '/en/examples/green-terrace/issues/ISS-CO-001' },
                    { text: 'Test: MVHR Balancing', link: '/en/examples/green-terrace/commissioning-tests/CT-MVHR-001' },
                    { text: 'Test: Air-tightness', link: '/en/examples/green-terrace/commissioning-tests/CT-AIRTIGHTNESS-001' },
                    { text: 'Test: Fire Drill', link: '/en/examples/green-terrace/commissioning-tests/CT-FIRE-DRILL-001' }
                  ]
                },
                {
                  text: 'Green Terrace 2028 (Operation Phase)',
                  collapsed: true,
                  items: [
                    { text: 'Operation Phase Overview', link: '/en/examples/green-terrace-2028/' },
                    { text: 'Building (in operation)', link: '/en/examples/green-terrace-2028/building' },
                    { text: 'Site', link: '/en/examples/green-terrace-2028/site' },
                    { text: 'Level 04 (ops issues cluster)', link: '/en/examples/green-terrace-2028/levels/level-04' },
                    { text: 'Bedroom 4.02 (CO₂ anomaly)', link: '/en/examples/green-terrace-2028/spaces/bedroom-402' },
                    { text: 'System: HVAC (operational)', link: '/en/examples/green-terrace-2028/systems/sys-hvac-01' },
                    { text: 'Heat pump (operational)', link: '/en/examples/green-terrace-2028/assets/ai-hp-01-ops' },
                    { text: 'MVHR (operational)', link: '/en/examples/green-terrace-2028/assets/ai-mvhr-01-ops' },
                    { text: 'UFH manifold (operational)', link: '/en/examples/green-terrace-2028/assets/ai-ufh-manifold-01-ops' },
                    { text: 'Test: MVHR — executed (cond. pass)', link: '/en/examples/green-terrace-2028/commissioning-tests/CT-MVHR-001' },
                    { text: 'Test: Air-tightness — executed + retest', link: '/en/examples/green-terrace-2028/commissioning-tests/CT-AIRTIGHTNESS-001' },
                    { text: 'Test: Fire drill — executed (pass)', link: '/en/examples/green-terrace-2028/commissioning-tests/CT-FIRE-DRILL-001' },
                    { text: 'Issue: Heat pump warranty', link: '/en/examples/green-terrace-2028/issues/ISS-WARRANTY-HP-001' },
                    { text: 'Issue: Tenant maintenance request', link: '/en/examples/green-terrace-2028/issues/ISS-TENANT-MR-001' },
                    { text: 'Issue: CO₂ sensor anomaly', link: '/en/examples/green-terrace-2028/issues/ISS-ANOMALY-CO2-001' },
                    { text: 'Issue: Retro-cx MVHR rebalance', link: '/en/examples/green-terrace-2028/issues/ISS-RETROCX-MVHR-001' },
                    { text: 'Issue: Fire inspection finding', link: '/en/examples/green-terrace-2028/issues/ISS-INSPECTION-FD-001' },
                    { text: 'Issue: Air-tightness NCR', link: '/en/examples/green-terrace-2028/issues/ISS-NC-AIRTIGHTNESS-001' },
                    { text: 'Energy verification 2027', link: '/en/examples/green-terrace-2028/energy-verification' },
                    { text: 'Tenant IEQ survey 2027', link: '/en/examples/green-terrace-2028/tenant-survey-summary' },
                    { text: 'SCHEMA-GAPS (input to v2.2)', link: '/en/examples/green-terrace-2028/SCHEMA-GAPS' },
                    { text: 'Telemetry: CO₂ in Bedroom 4.02 (v2.2)', link: '/en/examples/green-terrace-2028/telemetry-streams/TEL-CO2-402-001' },
                    { text: 'Telemetry: Heat pump COP (v2.2)', link: '/en/examples/green-terrace-2028/telemetry-streams/TEL-HP-COP-001' },
                    { text: 'Occupant Survey 2027 IEQ (v2.3)', link: '/en/examples/green-terrace-2028/occupant-surveys/SURVEY-BLD-01-IEQ-2027' },
                    { text: 'Energy Verification 2027 (v2.3)', link: '/en/examples/green-terrace-2028/energy-verification-records/EVR-BLD-01-2027' },
                    { text: 'Retro-cx: MVHR rebalance (v2.3)', link: '/en/examples/green-terrace-2028/retrocx-recommendations/RCX-MVHR-001' }
                  ]
                },
                {
                  text: 'Green Terrace Park (Campus showcase)',
                  collapsed: true,
                  items: [
                    { text: 'Campus Overview', link: '/en/examples/green-terrace-park/' },
                    { text: 'Campus entity', link: '/en/examples/green-terrace-park/campus' },
                    { text: 'Site (Phase 2)', link: '/en/examples/green-terrace-park/site' },
                    { text: 'BLD-02 Sunny Crescent (construction)', link: '/en/examples/green-terrace-park/buildings/BLD-02-sunny-crescent' },
                    { text: 'BLD-03 Linden Court (DD)', link: '/en/examples/green-terrace-park/buildings/BLD-03-linden-court' },
                    { text: 'BLD-04 Oak Pavilion (SD)', link: '/en/examples/green-terrace-park/buildings/BLD-04-oak-pavilion' },
                    { text: 'District heating loop', link: '/en/examples/green-terrace-park/systems/SYS-DH-LOOP-CAMPUS' },
                    { text: 'Playground', link: '/en/examples/green-terrace-park/site-features/SF-PLAYGROUND' },
                    { text: 'EV charging hub', link: '/en/examples/green-terrace-park/site-features/SF-EV-HUB' },
                    { text: 'Bike storage', link: '/en/examples/green-terrace-park/site-features/SF-BIKE-STORAGE' },
                    { text: 'Communal garden', link: '/en/examples/green-terrace-park/site-features/SF-COMMUNAL-GARDEN' },
                    { text: 'Site infrastructure CP', link: '/en/examples/green-terrace-park/construction-packages/CP-SITE-INFRASTRUCTURE' },
                    { text: 'Issue: Campus planning condition', link: '/en/examples/green-terrace-park/issues/ISS-CAMPUS-PLANNING-001' }
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
      title: 'Semantyczny Model Budynku (SBM)',
      description: 'Standard dokumentacji gotowy na AI dla architektów',
      themeConfig: {
        nav: [
          { text: 'Strona główna', link: '/pl/' },
          {
            text: 'Start',
            items: [
              { text: '💡 Czym jest SBM?', link: '/pl/standardy/wprowadzenie' },
              { text: '🚀 Szybki Start (5 min)', link: '/pl/standardy/szybki-start' },
              { text: '🧭 Jak to działa', link: '/pl/standardy/jak-to-dziala' },
              { text: 'Słownik', link: '/pl/standardy/slownik' },
              { text: 'Kompletny przepływ pracy', link: '/pl/standardy/struktura-dokumentu' }
            ]
          },
          {
            text: 'Model',
            items: [
              { text: 'Rodzaje kart (27)', link: '/pl/dokumentacja/encje/' },
              { text: 'Przegląd systemu', link: '/pl/dokumentacja/przeglad' },
              { text: 'Szablony', link: '/pl/szablony/' },
              { text: 'Zasady projektowania encji', link: '/pl/przewodniki/zasady-projektowania-encji' },
              { text: 'Dziedziczenie właściwości', link: '/pl/przewodniki/dziedziczenie-wlasciwosci' }
            ]
          },
          { text: 'Cykl życia', link: '/pl/fazy/' },
          { text: 'Kompilator', link: '/pl/dokumentacja/kompilator/' },
          { text: 'Przykład', link: '/pl/przyklady/' },
          {
            text: 'Materiały Pomocnicze',
            items: [
              { text: 'Polskie Przepisy', link: '/pl/przepisy/' },
              { text: 'Integracja BIM', link: '/pl/integracja-bim/' },
              { text: 'Zarządzanie Projektem', link: '/pl/zarzadzanie-projektem/' },
              { text: 'Zapewnienie Jakości', link: '/pl/jakosc/' },
              { text: 'Eksploatacja Budynku', link: '/pl/eksploatacja/' },
              { text: 'Zrównoważone budownictwo', link: '/pl/zrownowazonosc/' },
              { text: 'Przewodniki i Narzędzia', link: '/pl/przewodniki/' }
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
                { text: 'Szybki przegląd', link: '/pl/dokumentacja/encje/szybki-przeglad' },
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
                { text: 'Pakiet Budowlany', link: '/pl/dokumentacja/encje/pakiet-budowlany' },
                { text: 'Kampus', link: '/pl/dokumentacja/encje/kampus' },
                { text: 'Program Przestrzenny', link: '/pl/dokumentacja/encje/program-przestrzenny' },
                { text: 'Typ Materiału', link: '/pl/dokumentacja/encje/typ-materialu' },
                { text: 'Materiał', link: '/pl/dokumentacja/encje/material' },
                { text: 'System Konstrukcyjny', link: '/pl/dokumentacja/encje/system-konstrukcyjny' },
                { text: 'Zgłoszenie', link: '/pl/dokumentacja/encje/zgloszenie' },
                { text: 'Test Odbioru', link: '/pl/dokumentacja/encje/test-odbioru' },
                { text: 'Trasa Komunikacji', link: '/pl/dokumentacja/encje/trasa-komunikacji' }
              ]
            },
            {
              text: 'Kompilator',
              items: [
                { text: 'Przegląd Kompilatora', link: '/pl/dokumentacja/kompilator/' },
                { text: 'Pierwsze Kroki', link: '/pl/dokumentacja/kompilator/pierwsze-kroki' },
                { text: 'Potok Kompilacji', link: '/pl/dokumentacja/kompilator/potok' },
                { text: 'Referencja Bledow', link: '/pl/dokumentacja/kompilator/bledy' }
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
                { text: 'Czym jest SBM?', link: '/pl/standardy/wprowadzenie' },
                { text: 'Szybki Start', link: '/pl/standardy/szybki-start' },
                { text: 'Jak to działa', link: '/pl/standardy/jak-to-dziala' },
                { text: 'Przegląd', link: '/pl/standardy/' },
                { text: 'Słownik', link: '/pl/standardy/slownik' },
                { text: 'Kompletny przepływ pracy', link: '/pl/standardy/struktura-dokumentu' },
                { text: 'Dokumenty dwuformatowe', link: '/pl/standardy/dual-format' },
                { text: 'Schema frontmatter', link: '/pl/standardy/schema-frontmatter' }
              ]
            }
          ],
          '/pl/fazy/': [
            {
              text: 'Cykl życia SBM',
              items: [
                { text: 'Cykl życia (10 faz)', link: '/pl/fazy/' },
                { text: '1. Koncepcja', link: '/pl/fazy/koncepcja' },
                { text: '2. Projekt wstępny', link: '/pl/fazy/projekt-wstepny' },
                { text: '3. Projekt budowlany', link: '/pl/fazy/projekt-budowlany' },
                { text: '4. Projekt wykonawczy', link: '/pl/fazy/projekt-wykonawczy' },
                { text: '5. Przetarg i zamówienie', link: '/pl/fazy/przetarg' },
                { text: '6. Budowa', link: '/pl/fazy/budowa' },
                { text: '7. Odbiory i rozruch', link: '/pl/fazy/odbiory' },
                { text: '8. Eksploatacja', link: '/pl/fazy/eksploatacja' },
                { text: '9. Modernizacja', link: '/pl/fazy/modernizacja' },
                { text: '10. Wycofanie', link: '/pl/fazy/wycofanie' }
              ]
            },
            {
              text: 'Materiały Pomocnicze',
              items: [
                { text: 'Kompletny przepływ pracy', link: '/pl/standardy/struktura-dokumentu' },
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
                { text: 'Dziedziczenie właściwości', link: '/pl/przewodniki/dziedziczenie-wlasciwosci' },
                { text: 'Zasady projektowania encji', link: '/pl/przewodniki/zasady-projektowania-encji' },
                { text: 'Mapowanie IFC', link: '/pl/przewodniki/mapowanie-ifc' },
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
                    { text: 'PB: Wykończenia', link: '/pl/przyklady/zielony-taras/pakiety-budowlane/cp-wykonczenie' },
                    { text: 'Program: Sypialnie standardowe (brief)', link: '/pl/przyklady/zielony-taras/programy-przestrzeni/PROG-BEDROOM-STANDARD' },
                    { text: 'System konstrukcyjny', link: '/pl/przyklady/zielony-taras/systemy-konstrukcyjne/STR-GREEN-TERRACE' },
                    { text: 'Materiał: Beton C30/37', link: '/pl/przyklady/zielony-taras/materialy/MT-CONCRETE-C30-37' },
                    { text: 'Materiał: Izolacja PIR 150', link: '/pl/przyklady/zielony-taras/materialy/MT-INSULATION-PIR-150' },
                    { text: 'Droga cyrkulacji: Ewakuacja poż. L01', link: '/pl/przyklady/zielony-taras/drogi-cyrkulacji/CR-FIRE-EGRESS-L01' },
                    { text: 'Zgłoszenie: Aneks przetargowy 01', link: '/pl/przyklady/zielony-taras/zgloszenia/ISS-BID-001' },
                    { text: 'Zgłoszenie: RFI 001', link: '/pl/przyklady/zielony-taras/zgloszenia/ISS-RFI-001' },
                    { text: 'Zgłoszenie: Zmiana 001', link: '/pl/przyklady/zielony-taras/zgloszenia/ISS-CO-001' },
                    { text: 'Test: Regulacja MVHR', link: '/pl/przyklady/zielony-taras/testy-rozruchowe/CT-MVHR-001' },
                    { text: 'Test: Szczelność powietrzna', link: '/pl/przyklady/zielony-taras/testy-rozruchowe/CT-AIRTIGHTNESS-001' },
                    { text: 'Test: Próbna ewakuacja', link: '/pl/przyklady/zielony-taras/testy-rozruchowe/CT-FIRE-DRILL-001' }
                  ]
                },
                {
                  text: 'Zielony Taras 2028 (faza eksploatacji)',
                  collapsed: true,
                  items: [
                    { text: 'Przegląd fazy eksploatacji', link: '/pl/przyklady/zielony-taras-2028/' },
                    { text: 'Budynek (w eksploatacji)', link: '/pl/przyklady/zielony-taras-2028/budynek' },
                    { text: 'Działka', link: '/pl/przyklady/zielony-taras-2028/dzialka' },
                    { text: 'Poziom 04 (skupisko ops)', link: '/pl/przyklady/zielony-taras-2028/poziomy/poziom-04' },
                    { text: 'Sypialnia 4.02 (anomalia CO₂)', link: '/pl/przyklady/zielony-taras-2028/przestrzenie/sypialnia-402' },
                    { text: 'System: HVAC (eksploatacja)', link: '/pl/przyklady/zielony-taras-2028/systemy/sys-hvac-01' },
                    { text: 'Pompa ciepła (eksploatacja)', link: '/pl/przyklady/zielony-taras-2028/zasoby/ai-hp-01-ops' },
                    { text: 'MVHR (eksploatacja)', link: '/pl/przyklady/zielony-taras-2028/zasoby/ai-mvhr-01-ops' },
                    { text: 'Rozdzielacz UFH (eksploatacja)', link: '/pl/przyklady/zielony-taras-2028/zasoby/ai-ufh-manifold-01-ops' },
                    { text: 'Test: MVHR — wykonano (war. zal.)', link: '/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-MVHR-001' },
                    { text: 'Test: Szczelność — wykonano + powtórny', link: '/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-AIRTIGHTNESS-001' },
                    { text: 'Test: Próbna ewakuacja — zaliczono', link: '/pl/przyklady/zielony-taras-2028/testy-rozruchowe/CT-FIRE-DRILL-001' },
                    { text: 'Zgłoszenie: Gwarancja pompy ciepła', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-WARRANTY-HP-001' },
                    { text: 'Zgłoszenie: Konserwacja mieszkańca', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-TENANT-MR-001' },
                    { text: 'Zgłoszenie: Anomalia CO₂', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-ANOMALY-CO2-001' },
                    { text: 'Zgłoszenie: Retro-cx MVHR', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-RETROCX-MVHR-001' },
                    { text: 'Zgłoszenie: Inspekcja pożarowa', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-INSPECTION-FD-001' },
                    { text: 'Zgłoszenie: NCR szczelności', link: '/pl/przyklady/zielony-taras-2028/zgloszenia/ISS-NC-AIRTIGHTNESS-001' },
                    { text: 'Weryfikacja energetyczna 2027', link: '/pl/przyklady/zielony-taras-2028/weryfikacja-energetyczna' },
                    { text: 'Ankieta IEQ mieszkańców 2027', link: '/pl/przyklady/zielony-taras-2028/podsumowanie-ankiety-mieszkancow' },
                    { text: 'SCHEMA-GAPS (wejście do v2.2)', link: '/pl/przyklady/zielony-taras-2028/SCHEMA-GAPS' },
                    { text: 'Telemetria: CO₂ w Sypialni 4.02 (v2.2)', link: '/pl/przyklady/zielony-taras-2028/strumienie-telemetrii/TEL-CO2-402-001' },
                    { text: 'Telemetria: COP pompy ciepła (v2.2)', link: '/pl/przyklady/zielony-taras-2028/strumienie-telemetrii/TEL-HP-COP-001' },
                    { text: 'Ankieta mieszkańców IEQ 2027 (v2.3)', link: '/pl/przyklady/zielony-taras-2028/ankiety-mieszkancow/SURVEY-BLD-01-IEQ-2027' },
                    { text: 'Weryfikacja energetyczna 2027 (v2.3)', link: '/pl/przyklady/zielony-taras-2028/zapisy-weryfikacji-energetycznej/EVR-BLD-01-2027' },
                    { text: 'Retro-cx: Rebalans MVHR (v2.3)', link: '/pl/przyklady/zielony-taras-2028/rekomendacje-retrocx/RCX-MVHR-001' }
                  ]
                },
                {
                  text: 'Zielony Taras Park (przykład Kampusu)',
                  collapsed: true,
                  items: [
                    { text: 'Przegląd Kampusu', link: '/pl/przyklady/zielony-taras-park/' },
                    { text: 'Encja Kampus', link: '/pl/przyklady/zielony-taras-park/kampus' },
                    { text: 'Działka (Faza 2)', link: '/pl/przyklady/zielony-taras-park/dzialka' },
                    { text: 'BLD-02 Słoneczny Półksiężyc (budowa)', link: '/pl/przyklady/zielony-taras-park/budynki/BLD-02-sloneczny-polksiezyc' },
                    { text: 'BLD-03 Dziedziniec Lipowy (DD)', link: '/pl/przyklady/zielony-taras-park/budynki/BLD-03-dziedziniec-lipowy' },
                    { text: 'BLD-04 Pawilon Dębowy (SD)', link: '/pl/przyklady/zielony-taras-park/budynki/BLD-04-pawilon-debowy' },
                    { text: 'Pętla ciepłownicza', link: '/pl/przyklady/zielony-taras-park/systemy/SYS-DH-LOOP-CAMPUS' },
                    { text: 'Plac zabaw', link: '/pl/przyklady/zielony-taras-park/elementy-terenu/SF-PLAYGROUND' },
                    { text: 'Hub ładowania EV', link: '/pl/przyklady/zielony-taras-park/elementy-terenu/SF-EV-HUB' },
                    { text: 'Schowek na rowery', link: '/pl/przyklady/zielony-taras-park/elementy-terenu/SF-BIKE-STORAGE' },
                    { text: 'Ogród wspólnotowy', link: '/pl/przyklady/zielony-taras-park/elementy-terenu/SF-COMMUNAL-GARDEN' },
                    { text: 'CP infrastruktury terenowej', link: '/pl/przyklady/zielony-taras-park/pakiety-budowlane/CP-SITE-INFRASTRUCTURE' },
                    { text: 'Zgłoszenie: Warunek planistyczny kampusu', link: '/pl/przyklady/zielony-taras-park/zgloszenia/ISS-CAMPUS-PLANNING-001' }
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
