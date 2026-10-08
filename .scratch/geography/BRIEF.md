# geography-o — writing brief for content agents

You write ORIGINAL study content for the Geography family: ZIMSEC O-Level Geography (Forms 1-4, 2015-2022) and
Cambridge IGCSE Geography 0460 (2027-2029). Content is DEV preview only; a human reviews it later (§41), but write it
as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, tables, LaTeX).
- `content/concepts/geography-o.json` (111 concepts; each description says what is IN and what is OUT — stay inside it).
- The two syllabus files: `content/syllabi/zimsec/o-level/geography/2015-2022.json` and
  `content/syllabi/cambridge/igcse/geography/2027-2029.json` (which concepts each covers, objectives, notes).
  ZIMSEC covers 94 concepts, Cambridge 64; 47 are shared. If a concept is covered by only one board, write for that
  board (Zimbabwean depth for ZIMSEC-only, "detailed specific example" style for Cambridge-only).
- `.scratch/geography/lib.mjs` (builders: `mcq`, `tf`, `short`, `fib`, `match`, `num`, `calc`, `manualShort`, `ext`,
  `essay`, `struct`, `card`; `P.*` part builders; `geographyLevels(total)`; selectors `ZIM`, `CAM`; `t` for LaTeX).
  Builder style: the English worked example `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a
  rationale, explanations teach, hints from difficulty 3). A model lesson:
  `content/subjects/combined-science-o/lessons/physics/telecommunication.md` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/geography-o/lessons/<area>/<name>.md` (key `<area>.<name>`, e.g.
   `weather.precipitation`, where the concept key is `geo.<area>.<name>`), **900-1,600 words**, template of §6:
   `## Introduction` (why it matters, Zimbabwean or local hook), `## Key definitions` (`:::definition{term="…"}`),
   explanation sections with `:::example` blocks (worked map/graph calculations, annotated "diagrams in words",
   case-study boxes), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`, say which paper and
   command words), `## Summary` (one `:::summary`). Front matter: key, title (unique), summary, concepts ([the concept]),
   estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons your assignment names.
2. **16-22 questions + 8-10 flashcards** per concept in your slice file(s)
   `.scratch/geography/slices/<prefix><name>.mjs` using `concept(...)` (one `concept()` call per concept, `file:`
   `<area>/<name>`, `keyPrefix:` `<area>.<name>`):
   - Mix: MCQ (about 40-50%; four options), numerical (`num`/`calc`) wherever the concept has numbers (map scale,
     distance, gradient, bearings, grid references, time from longitude, climate statistics, population rates, density,
     transport indices, discharge), short answer only for CLOSED answers (name the landform, a six-figure grid
     reference — list every acceptable form), fill-in-the-blank, matching (process ↔ landform, region ↔ farming),
     true/false, self-marked `manualShort` (describe/explain, 2-4 marks, mark points a student can tick) and 1-3 longer
     `ext` items (evaluate/discuss/"to what extent", 6-9 marks, indicative points + `levels: geographyLevels(marks)`).
     Add 2-4 practice `struct` items per concept built on a fictional data table or described resource (marks NOT
     in the reserved list below).
   - Difficulty spread: ~25% d1-2, ~45% d2-3, ~30% d3-5. `daily: true` only on 2-3 auto-marked items of difficulty 2-3.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION.
   - `applies`: omit when the item suits both boards; `applies: ZIM` for Zimbabwe-specific syllabus content (natural
     regions, CAMPFIRE, ZIMSEC map conventions) and `applies: CAM` for Cambridge-only framing (HIC/MIC/LIC, "detailed
     specific example"). An item can only be tagged where its concept is covered, so for a single-board concept
     `applies` changes nothing.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, VOCABULARY, CONCEPT, FACT.

## Subject quality rules (non-negotiable)

- **Facts must be right.** Zimbabwean case studies must be accurate: natural regions I-V (IIa/IIb), Kariba, the Great
  Dyke, the Save, Runde, Limpopo and Zambezi basins, climate, settlement, mining, agriculture, industry, tourism. If you
  are not sure of a fact, leave it out or put it in the lesson as a general statement without the detail. Never invent
  names of mines, schemes, companies or dates. Land reform and other political topics: neutral, factual, no judgement
  of parties or people.
- **Numbers.** Every statistic in a question or lesson is EITHER clearly from a fictional source ("a survey by a
  Form 4 class (fictional data)", "Table 1 shows rainfall at a fictional station") OR a well-known value labelled as
  approximate ("about 108 m", "roughly 550 km"). Never present an invented figure as real. Compute every answer
  (gradient, scale, mean, density, rates, time zones, grid references, indices) with code before you write it;
  answers must match exactly. Use `num` with a sensible `tol` (distance measured on a map: allow ±0.1 km or as the
  scale requires; gradients: accept a range with `tol`), `prefix: "1 in"` for gradients, `unit` from the UNITS table.
- **Some approximate reference values** (still label as approximate; check against a textbook if you rely on them):
  natural regions by mean annual rainfall: I more than about 1,000 mm (Eastern Highlands); II about 750-1,000 mm
  (IIa more reliable than IIb); III about 650-800 mm; IV about 450-650 mm; V less than about 450-650 mm (Zambezi valley
  and the Lowveld) — textbooks differ at the boundaries, so do not set MCQs that hinge on an exact boundary.
  Seasons: hot wet season about November to March; cool dry season about May to August; hot dry season about
  September to October. Victoria Falls on the Zambezi: about 1.7 km wide and about 100 m high (World Heritage Site).
  The Great Dyke: about 550 km long, a few km wide, running roughly NNE-SSW (platinum, chrome, nickel). Kariba dam:
  completed 1959 on the Zambezi (HEP for Zimbabwe and Zambia). Mount Nyangani: highest point, about 2,590 m. Cyclone
  Idai: March 2019, Chimanimani and Chipinge districts. Hwange: coal mining and a coal-fired power station; Hwange
  National Park is Zimbabwe's largest national park.
- **No images.** Only uploaded images are possible and you cannot make them. Describe diagrams in words (numbered
  stages of formation, "imagine a cross-section…") and give data as Markdown tables. Never write "the graph/map/photo
  below shows" unless the table is there. Graph questions give the data as a table and ask what the graph would show,
  or ask for values read/derived from the table.
- **Map extracts as grid tables.** Use one convention throughout: a caption with scale, grid size and contour
  interval and "(fictional area)"; columns are eastings, rows are northings with the HIGHEST northing at the top; each
  cell lists the features in that square with their position in tenths where needed. Example:

  | N \ E | 32 | 33 | 34 |
  |---|---|---|---|
  | 87 | Spot height 1342 m at 325 873; dense contours on east side | School at 331 876; road runs W-E | Dam wall at 347 871 |
  | 86 | River flows SE; 1280 m contour along north bank | Bridge at 336 864 | Clinic at 341 862 |

  The four-figure reference of a square is easting then northing of its SOUTH-WEST corner (the square right of
  line 33 and above line 86 is 3386). Six-figure references add tenths (easting first). Verify every reference,
  distance and bearing with code. Bearings are three-figure, clockwise from grid north. Short-answer grid references:
  list both "336864" and "336 864" in `accepted` (normalising collapses repeated spaces but does not remove them).
- **Case studies** are named as such ("Case study: …", or for Cambridge "Detailed specific example: …") and use
  real places with facts you are sure of; otherwise use a clearly fictional example and say so.
- **Original wording** only (never copy textbooks, revision sites, past papers, mark schemes); British English; SI
  units; 24-hour times; `US\$` for dollars. One defensible answer per MCQ; distractors definitely wrong (say why).
  Never "all/none of the above" or option letters in text. **No length cue**: check with
  `node .scratch/tools/length-cue.mjs geography-o questions/<your folder>/` → `# 0 flagged`.
- Short answers: `normalise` defaults (trim, lowercase, collapse spaces, strip punctuation). List spelling variants
  (levée/levee, kopje/koppie, oxbow/ox-bow). If you cannot list every correct answer, use `manualShort`.
- Self-marked items: points add up to the marks and are tickable ("States that the ITCZ moves south in January",
  not "Good answer"). Extended answers: indicative points + `geographyLevels(marks)` + a `modelAnswer`.
- Command words as the boards use them: state/name/give/identify, define, describe, explain, suggest, compare,
  calculate/estimate, evaluate/assess/discuss/"to what extent", justify, predict, plot, sketch.

## Exam-format items (only the agents whose assignment names them)

`examStyle: true`, the exact `applies`, type and marks below, `paper:` set (e.g. `"Paper 2"`), and `concepts` listing
the concepts the question draws on (all covered by that syllabus). Mocks draw them by type + marks, so these must be
EXACT. Put them in `questions/exam/<paper>-<topic>.json` (slice `file: "exam/zim-p2-a-weather"` etc.).

| Paper item | type | marks | applies | how many |
|---|---|---|---|---|
| ZIMSEC Paper 1: multiple choice (1 hour 30 minutes, 40 items) | MULTIPLE_CHOICE (single answer) | 1 | omit or ZIM | Every ordinary 1-mark MCQ counts. Each mock draws 12 map work (topic 7.6), 13 physical (7.1-7.3, 7.8), 8 economic (7.4, 7.5, 7.7, 7.9, 7.10), 7 population/settlement/transport/trade (7.11, 7.12); map-work concepts need at least 8 MCQs each |
| ZIMSEC Paper 2 Section A (physical environment): structured free-response and data-response question | STRUCTURED | 25 | ZIM | ≥ 6 |
| ZIMSEC Paper 2 Section B (economic geography) | STRUCTURED | 25 | ZIM | ≥ 6 |
| ZIMSEC Paper 2 Section C (population, settlement, transport and trade) | STRUCTURED | 25 | ZIM | ≥ 6 |
| Cambridge Paper 1 Physical Geography: Section A / B question (topics 1-5) | STRUCTURED | 25 | CAM | ≥ 2 per topic (10) |
| Cambridge Paper 2 Human Geography: Section A / B question (topics 6-10) | STRUCTURED | 25 | CAM | ≥ 2 per topic (10) |
| Cambridge Paper 4 Geographical Investigations | STRUCTURED | 30 | CAM | ≥ 6 (3 physical, 3 human) |

- **ZIMSEC Paper 2 question (25 marks):** a resource first (fictional data table, described map or diagram), then
  parts (a), (b), (c)… mixing auto-marked parts (MCQ, numerical, short closed answers) with self-marked describe/
  explain parts, ending with one longer part of 6-9 marks (explain/evaluate with reference to a named Zimbabwean or
  African example) using `geographyLevels`. Parts sum to exactly 25.
- **Cambridge Paper 1/2 question (25 marks):** source-based short-answer parts (1-4 marks) building to an extended
  part of 6-7 marks that asks for a **detailed specific example** (`geographyLevels`). Paper 1 questions stay within one
  of topics 1-5, Paper 2 within one of topics 6-10. Use LIC/MIC/HIC.
- **Cambridge Paper 4 question (30 marks):** a fieldwork investigation (hypotheses; equipment and method; sampling;
  a fictional results table; completing calculations from it; describing what a chosen graph would show; analysing
  results against the hypothesis; conclusion; evaluating reliability and suggesting improvements). Physical contexts:
  river, beach, vegetation or microclimate; human: questionnaires, traffic/pedestrian counts, environmental quality,
  land use. Concepts: `geo.fieldwork.*` plus the topic concept.

**Reserved mark values.** Items that are NOT exam-format items must never be STRUCTURED worth 25 or 30 marks. Practice
structured items use other totals (e.g. 6, 8, 10, 12, 15, 20).

## Folders and keys

Lessons `lessons/<area>/<name>.md` (key `<area>.<name>`); questions and flashcards `questions/<area>/<name>.json` and
`flashcards/<area>/<name>.json` (key prefix `<area>.<name>`, items numbered `.q01`, `.c01` by the builder); exam
items `questions/exam/...` (key prefix `exam.<paper>-<topic>`, e.g. `exam.zim-p2-a-weather`). Areas: weather,
climate-change, landforms, tectonics, rivers, coasts, ecosystems, resources, energy, maps, skills, fieldwork, mining,
environment, agriculture, food, industry, tourism, settlement, population, transport, trade, development.

## Commands (repo root)

- Build your slices only: `node .scratch/geography/build-content.mjs <your-prefix>` (e.g. `g1-`; it selects slice
  files whose names START with the prefix).
- Validate: `npm run content:validate -- geography-o --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family at the same time: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- geography-o` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your lesson folder files and the question/flashcard JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry or syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a missing unit, a concept description) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or Workflows.
- Final report (under 300 words): files written; counts per concept (lessons, questions by type, cards); exam items;
  validation and content:check results; anything unfinished or uncertain (facts you left out, values to check).

## Proposed split into 4 writer assignments

Roughly equal effort (concepts + exam items; map work counts heavier). Lessons with `freePreview: true` (one per
top-level topic of each syllabus) are marked ★.

**G1 — Atmosphere and biosphere** (slice prefix `g1-`; 27 concepts)
- weather: elements-instruments ★, synoptic-forecasting, climate-graphs, precipitation, hazards, zimbabwe-climate,
  air-masses, world-climates, depressions-fronts, tropical-cyclones
- climate-change: causes-evidence, impacts, responses
- ecosystems: components ★, nutrient-cycles, biodiversity, conservation-restoration, wetlands, rainforest,
  rainforest-threats, savanna-desert, antarctic, antarctic-threats, soils
- resources: types-exploitation ★, conservation, wildlife-campfire
- Exam rows: ZIMSEC P2 Section A ×3 (weather/climate ×2, ecosystems ×1); Cambridge P1 topic 3 ×2 and topic 5 ×2.

**G2 — Landforms, water, environment and energy** (prefix `g2-`; 29 concepts)
- landforms: landscapes, rocks, weathering-mass-wasting, arid-wind
- tectonics: earth-structure-plates, plate-boundaries, folding-faulting, volcanoes, earthquakes, hazard-impacts,
  hazard-management
- rivers: drainage-basin, processes ★, landforms-upper, landforms-lower, flooding, pollution
- coasts: processes ★, landforms, management, coral-mangroves
- environment: management-laws, land-degradation, pollution-waste ★, eia-land-use
- energy: types-sources ★, power-generation, supply-demand, management
- Exam rows: ZIMSEC P2 Section A ×3 (landforms/tectonics, rivers, environment); ZIMSEC P2 Section B ×2 (energy);
  Cambridge P1 topics 1, 2 and 4 ×2 each.

**G3 — Map work, skills, fieldwork, mining, agriculture, transport and trade** (prefix `g3-`; 29 concepts)
- maps: map-basics, thematic-maps, location-coordinates ★, scale-distance, direction-bearings, relief-contours,
  gradient-cross-sections, land-use-patterns, photos-remote-sensing, gps-gis (at least 8 MCQs each for Paper 1)
- skills: graphs, data-analysis
- fieldwork: enquiry-process, human-fieldwork, physical-fieldwork
- mining: minerals-distribution ★, factors-methods, small-scale, processing-beneficiation, environment-sustainability
- agriculture: systems-factors, natural-regions ★, farming-types, land-tenure-reform, climate-pests, urban-agribusiness
- transport: modes ★, networks; trade: patterns-blocs
- Exam rows: Cambridge P4 ×6; ZIMSEC P2 Section B ×4 (mining ×2, agriculture ×2); ZIMSEC P2 Section C ×2
  (transport and trade).

**G4 — Food, industry, tourism, settlement, population and development** (prefix `g4-`; 26 concepts)
- food: global-patterns, food-security
- industry: classification-employment ★, location-factors, zimbabwe-industry, small-informal, globalisation, tncs
- tourism: growth-management, zimbabwe
- settlement: types-site-patterns, urbanisation, urban-land-use, urban-challenges, urban-management, unplanned
- population: terms-data, structure, distribution-density, growth-dtm ★, policies, migration, diseases
- development: measuring ★, uneven, sustainable
- Exam rows: Cambridge P2 ×10 (two per topic 6-10); ZIMSEC P2 Section C ×4 (settlement ×2, population ×2).

ZIMSEC P2 Section B therefore has 6 (G2 ×2, G3 ×4); if G4 finishes early it adds 2 industry/tourism Section B items.
