# geography-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Geography family: ZIMSEC A-Level Geography (Forms 5-6, 2015-2022) — the
main product — and Cambridge International AS & A Level Geography 9696 (2027-2029). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow. **Geographical accuracy is the first rule**: a wrong fact,
figure, place or process is worse than a missing one. This is A-Level: explanation, data handling, evaluation and
supported judgement are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX).
- `content/concepts/geography-a.json` (111 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only, Paper 3 option).", "ZIMSEC only (Form 6)." — and
  says exactly what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names.
  Stay inside it; when two concepts touch, give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/a-level/geography/2015-2022.json` (topics 1-15 of the topic list,
  sub-topics 1.1 … are our codes for the competency-matrix key concepts, plus our node P for map interpretation and
  answering skills) and `content/syllabi/cambridge/a-level/geography/2027-2029.json` (section **AS** = topics 1-6,
  Papers 1 and 2; section **A** = topics 7-14, Paper 3 options 7-10 and Paper 4 options 11-14, each an option group;
  section **SK** = skills; objectives carry the printed content-heading codes such as 5.2.3). Read the `notes` of both
  (assessment as read, gaps in the ZIMSEC copy, routes). ZIMSEC covers 83 concepts, Cambridge 71; 43 are shared, 40 are
  ZIMSEC only (GIS, remote sensing, statistics, mining, agriculture, industry, transport, Zimbabwean trade, regional
  inequalities, EIA projects, biogeography, settlement detail) and 28 are Cambridge only (the Paper 3 and Paper 4
  options, water resources, disease).
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level only,
  Paper 3 / Paper 4 option". AS items feed Papers 1 and 2; Paper 3 and 4 items feed the options. ZIMSEC teaches some of
  the same ideas in Forms 5-6: write them once, at A Level depth.
- The O-level family `content/subjects/geography-o/` shows the house style (lesson structure, tone, question mix). Go
  well beyond it in depth, evaluation and data.
- `.scratch/geography-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for LaTeX and text with line breaks (see
  below), `EXAM` plans, `checkExam`, `geographyLevels(total)` (levels of response for 8-20 mark answers), and the
  **checked geography helpers**: `chk`, `rnd`, `sf`, `sfStr`, `dpStr`, `table`; statistics `mean`, `median`, `mode`,
  `quartiles`, `range`, `sd` (sample, n − 1), `sdPopulation`, `skewIndicator`, `chiSquared` (+ `expectedFromRatio`,
  `chiCrit`), `chiSquaredTable` (contingency table), `tTest` (+ `tCrit`), `pearson`, `spearman` (+ `ranks`,
  `SPEARMAN_CRIT_05`), `regression`, `gini`; spatial `nearestNeighbour`, `moransI`, `gearysC`, `idw`, `haversineKm`,
  `dmsToDecimal`, `minutesPerLongitude`, `rmse`; maps `groundKm`, `mapCm`, `gradient`, `sinuosity`; hydrology
  `drainageDensity`, `bifurcationRatio`, `discharge`, `hydraulicRadius`, `lagTime`, `recurrenceInterval`,
  `waterBalance`; atmosphere `tempAtHeight`, `magnitudeRatios`; population `per1000`, `naturalIncreasePct`,
  `dependencyRatio`, `doublingTime`, `projectPopulation`, `rankSize`, `breakingPoint`; networks `betaIndex`,
  `gammaIndex`, `alphaIndex`, `cyclomatic`; `simpson`. Units for numerical answers are the keys of `UNITS` (m, km, km²,
  ha, m/s, m³/s, km/km², °C, °C per 1000 m, %, per 1000, people/km², years, MW, GWh, hPa, ppm, US$, US$ million, …).
  Critical values come from the helpers (checked against published tables at import).
- **Text with line breaks:** `t` turns a typed backslash-n (not followed by a lower-case letter, so `\nu`, `\neq`,
  `\newline` stay LaTeX) into a real line break. In ordinary "…" strings and template literals a backslash-n is already
  a real newline. Never put the two characters backslash and n inside a `String.raw` text, or a literal "\n" shows on
  screen. Check the build with `node .scratch/tools/literal-newlines.mjs geography-a`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations
  teach, hints from difficulty 3); any `.scratch/geography/slices/g3a-*.mjs` or `.scratch/biology-a/slices/` (numbers,
  stimulus tables, structured items with sub-parts); any lesson in `content/subjects/geography-o/lessons/`.

## What to produce per concept

1. **One lesson** `content/subjects/geography-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `ageo.<area>.<name>`; e.g. `ageo.hydro.hydrographs-morphometry` → `lessons/hydro/hydrographs-morphometry.md`, key
   `hydro.hydrographs-morphometry`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why
   it matters, a hook — a Zimbabwean or southern African context where it is natural and accurate — and what the student
   should know already), `## Key definitions` (`:::definition{term="…"}` in precise examinable wording of your own;
   `:::keyfact` for values and rules to learn), explanation sections in a logical order (processes as numbered stages;
   places and features part by part; causes → effects → responses), **at least two worked examples** (`:::worked-solution`
   for every calculation: gradient, scale, drainage density, Spearman, chi-squared, nearest neighbour, dependency ratio,
   Moran's I, network indices, RMSE; `:::example` for resource interpretation: describing and explaining a graph, a
   described map extract, a photograph described in words, a data table; and a mini case study where the concept calls
   for one), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers test it — ZIMSEC
   Papers 1-3, Cambridge Papers 1-4 — and how *state, describe, explain, compare, suggest, assess, evaluate, to what
   extent* are answered for this concept), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title (unique),
   summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons
   named in your assignment. Do not add `objectives`. Where the boards differ in depth or terms, add a short
   `:::keyfact{title="ZIMSEC and Cambridge"}` saying who needs what (e.g. "Moran's I: ZIMSEC only"; "Detailed specific
   example: Cambridge").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/geography-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 35%; four options, 1 mark, topic-test material: neither board sets a multiple-choice
     paper), numerical/calculation (`b.num` / `b.calc`) wherever the concept has numbers, true/false, matching (process ↔
     landform, term ↔ meaning, place ↔ feature), fill-in-the-blank (with `choices` drop-downs for terms), closed `short`
     answers (a term, a landform, a feature — list every acceptable form), 4-6 self-marked `manualShort` items
     (describe / explain / suggest, 2-6 marks, one tickable point per mark) and 2-4 **practice structured** items
     (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12, 14 or 16 — never 10, 15, 20 or 25, see reserved
     marks) on an original resource (data table, described graph, described map extract or photograph, passage) with
     sub-parts where natural. A self-marked `ext` of 8-9 marks or 12 marks with `geographyLevels` is good practice for
     "assess/evaluate" (never 10, 15, 20 or 25 marks, which are exam-format).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content (a ZIMSEC-detail part such as Peltier diagrams, morphometry or
     growth points inside a shared concept → ZIM; a detailed-specific-example style essay → CAM). Single-board concepts
     are tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("What does the Saffir-
     Simpson scale measure?").

## Geography quality rules (non-negotiable)

- **Facts are right or absent.** Processes, landforms, definitions, places and dates must be standard A-Level
  knowledge (as in the major A-Level textbooks, but in your own words). If you are not sure, leave it out or say it
  generally. Typical values are labelled "about" and must be realistic: lapse rates about 10 °C per 1 000 m (dry
  adiabatic), about 5-9 °C per 1 000 m (saturated, varies), environmental lapse rate about 6.5 °C per 1 000 m on
  average; Earth's tilt about 23.5°; wind and wave terms as in standard texts; Richter and moment magnitudes
  logarithmic (each whole step ≈ 10 × amplitude, ≈ 32 × energy); Saffir-Simpson categories 1-5; tropical cyclone sea
  temperature threshold about 26.5 °C; DTM stages 1-4 (stage 5 optional, say so). No invented statistics, prevalence
  figures, death tolls, GDP figures, populations or "studies show".
- **Data and case studies.** Everything you invent is **original, plausible and labelled** ("illustrative data" or "data
  invented for this exercise"). Real figures (a census count, a gauged discharge, a hazard death toll) only when you are
  certain, rounded, dated, and attributed to the source in a short note ("ZimStat census 2022, rounded"). Detailed specific
  examples ("case studies": Cambridge requires them; ZIMSEC uses Zimbabwean and southern African ones) must be real
  places and events from CE 2000 onwards where possible, described at the level you are sure of, with the year; leave a
  figure out rather than guess it. Name only established examples: Kariba and Hwange, the Zambezi and Limpopo, the
  Eastern Highlands, Matobo dwalas, Great Dyke, Tokwe-Mukosi flooding (2014), Cyclone Idai (March 2019), Marange
  diamonds, the 2008-09 cholera epidemic, Lake Chivero — and only the facts you can defend. A reviewer will check every
  named case.
- **Every number is computed in code.** Build data tables and answers with the helpers (they throw on impossible data:
  expected values below 5 in χ², a χ² or rs right on the critical value, a table with ties wrongly ranked) and pass the
  **exact** value to `b.num` / `b.calc`; never type a computed answer by hand (`chk` any value you also write in
  prose). Lesson tables and worked statistics: print them from a script in `.scratch/geography-a/tables/<prefix><name>.mjs`
  (never in `slices/`, which the build imports) and paste the output. Re-derive every worked example from its data.
- **Statistics as the boards set them.** ZIMSEC Paper 3 Section A is a compulsory statistics question (the syllabus names
  mean, median, mode, quartiles, standard deviation, probability, normality, hypothesis testing, Spearman and Pearson
  correlation, simple linear regression, nearest neighbour, Moran's I and Geary's C, inverse distance weighting).
  Cambridge sets no statistical test. Always state the null hypothesis, give the critical value in the stem ("the
  critical value at the 0.05 level is 0.738"), and conclude in words ("there is a significant positive relationship"; "the
  pattern is clustered"). Spearman for 5-20 pairs with the formula rs = 1 − 6Σd² / (n³ − n); chi-squared with expected
  values at least 5 and df stated; sample SD with n − 1; regression equations to a stated number of decimal places with a
  warning about extrapolation.
- **Numerical answers:** state the unit and the rounding in the stem ("in km², to one decimal place") and pass `unit` (a
  UNITS key) and `dp` or `sf` to match. The default accepts 3 s.f. or better. Add 1-3 `wrong` values that are real
  mistakes (scale misread; area in the wrong units; n instead of n − 1; vertical and horizontal swapped; rate per 100
  instead of per 1 000) and say why in the explanation. `b.calc` items need a numbered `workedSolution` (it defaults to
  the explanation, so write the explanation as the full calculation).
- **Maps, photographs, satellite images and graphs are described in words and tables, never images** (only uploaded
  images are possible and you cannot make them). A map extract becomes a short description plus a table (grid reference |
  feature | height or detail) and a stated scale; a photograph is described ("a photograph taken looking north shows …");
  a graph is a data table plus a sentence on its shape; a diagram is numbered steps or a table. Questions ask "Which
  feature …", give a labelled description, or ask the student to describe what a graph or sketch would show; never
  "draw" (self-marked "describe the sketch map you would draw" is fine) and never "the map below" or "Figure 1" unless
  the table or description is there in the stem.
- **Notation.** British spelling (rainforest, kilometre, colour, programme), SI units with correct symbols (km, m,
  m³/s, °C, hPa); US$ for economic data as Cambridge does (write `US\$` in a normal string; a bare dollar starts maths);
  coordinates as 17°50′S 31°03′E style or decimal degrees stated; grid references as six figures; dates as 7 October
  2026; "Gersmehl" (ZIMSEC prints "Gerschmel"), "Moran's I", "von Thünen", "Peltier". Terms of the **boards**: use both
  names the first time (see the table below).
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho,
  Thandeka), places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Hwange, Kariba, Beitbridge, the Eastern Highlands, the
  lowveld), crops (maize, sorghum, groundnuts, cotton, tobacco, horticulture), minerals (gold, platinum, chrome, coal,
  lithium, diamonds, nickel — claims general unless sure), institutions (ZimStat, EMA, ZINWA, ZESA/ZETDC, ZIMSEC, ZTA,
  Civil Protection Department). Neutral wording on policy and politics (land reform, indigenisation, sanctions, mining
  law, population policy); describe positions as held by groups ("supporters argue …"), never invent quotations.
- **Sensitive topics** (HIV/AIDS, cholera, Ebola, cancer, migration and xenophobia, refugees, hazards with deaths):
  factual, respectful, non-judgemental, no stigma; no medical or legal advice; death tolls only if you are certain,
  rounded and sourced.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: a real
  misconception — confusing mitigation with adaptation, weathering with erosion, push with pull factors); never
  "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly the longest
  option; check with `node .scratch/tools/length-cue.mjs geography-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as A-Level mark schemes award; points add up to the marks;
  example answer complete. *Explain* needs a reason linked to the process, *describe* data needs a trend plus quoted
  figures with units, *suggest* accepts any valid answer (list the main ones inside points as "A or B"), *assess /
  evaluate / to what extent* needs both sides, a judgement and (for essays) a located example.
- **Original wording** (no textbook, past-paper or mark-scheme text), British English.

### Terminology between the boards

| ZIMSEC (syllabus / usage) | Cambridge 9696 |
|---|---|
| Physical component (Paper 1), Human component (Paper 2) | Physical Geography (Paper 1), Human Geography (Paper 2), Global Environments (Paper 3), Global Themes (Paper 4) |
| Hydrology and fluvial processes | Hydrology, river processes and hazards |
| Atmospheric processes and phenomena; weather and climatic hazards | Atmospheric processes and global climate change; tropical cyclone and wildfire hazards |
| Geomorphology (plate tectonics, weathering, slopes, tropical landforms, mass movements) | Earth processes and mass movements; tropical, coastal, arid landforms |
| Gerschmel diagram (printed) | Gersmehl diagram |
| Settlement dynamics (hierarchy, growth points, urbanisation, CBD) | Urban areas and management (urban growth, structure, sustainable development) |
| Population indicators; pro- and anti-natalist policies | Components of population change; population policies |
| Mitigation measures (hazards), mitigation and adaptation (climate) | Management strategies; mitigation and adaptation |
| Agro-ecological regions (natural regions) | (no equivalent) |
| Hurricanes, typhoons, cyclones | Tropical cyclones (cyclones, hurricanes, typhoons) |
| Dwala, ruware, kopje, inselberg | Bornhardts (dwala, ruware), kopjes (koppies), tors; inselbergs |

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Paper 1"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to).
STRUCTURED rows: wrap the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs`,
`applies: EXAM.X.applies`. ESSAY rows are single `b.ext` items of type EXTENDED_RESPONSE with `marks`, `examStyle: true`,
`skill: "EVALUATION"`, `applies: CAM`, `levels: geographyLevels(15 or 20)`, one point per mark, `modelAnswer` and
`wordLimit`. The builder refuses a STRUCTURED or EXTENDED_RESPONSE item worth 10, 15, 20 or 25 marks that does not match a
plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`, `(ii)` one level deep via `P.group`, or `(1)`, `(2)` with
sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects it). The mocks draw by type + marks + skill (+ topic), so
these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| **ZIMSEC Paper 1** (physical, topics 3-7: ten structured questions of 25 marks, answer any four) and **Paper 2** (human, topics 8-15: ten structured, free-response and data-response questions of 25 marks, each topic at least one, answer any four) | `EXAM.ZIM_STRUCT25` | STRUCTURED, 25, APPLICATION | ZIM | an original resource (data table, described graph, described map or photograph, short passage) and 4-5 lettered parts of 3-9 marks from *state/identify* through *calculate/explain* to a final *assess/evaluate/discuss* part (8-10 marks, `EXTENDED_RESPONSE` with points, `modelAnswer` and `geographyLevels`); knowledge about 25%, skills and application about 50%, judgement about 25% of the marks; at least 8 marks auto-marked; Zimbabwean or southern African context; difficulty 4-5 | 10 physical (2 per topic 3-7) + 10 human (2 each for topics 8 and 9, 1 each for 10-15; see assignments) |
| **ZIMSEC Paper 3** (practical, 75 marks: Section A compulsory statistics question; Section B topographical map, GIS or remote sensing, choose one; Section C research techniques — physical, human, mitigation and adaptation — choose one) | `EXAM.ZIM_P3` | STRUCTURED, 25, ANALYSIS | ZIM | **statistics**: invented dataset (rainfall, stream widths, pH, settlement populations, pedestrian counts), descriptive statistics, a test (Spearman, chi-squared, regression or nearest neighbour; critical value in the stem), conclusion — at least 15 marks auto-marked; **topographic map**: a described 1:50 000 extract with a feature table, grid references, scale, distance, gradient, cross-section and interpretation; **GIS**: coordinate systems, projections, georeferencing with RMSE, vector/raster choice, digitising errors, described layouts; **remote sensing**: a described image and reflectance table, bands, resolution, colour composite, interpretation; **research techniques**: an enquiry set in a Zimbabwean context — hypothesis, sampling, instruments, results table, presentation, analysis, evaluation; the mitigation-and-adaptation variant plans a response to a hazard or climate risk | 9 (statistics 2, topographic map 2, GIS 1, remote sensing 1, research: physical 1, human 1, mitigation and adaptation 1) |
| **Cambridge Papers 1 and 2, Section A** (15 marks each, resource-based, one per topic) | `EXAM.CAM_SECTION_A` | STRUCTURED, 15, ANALYSIS | CAM | resources described in an "insert" in the stem (data table, graph described by a table, photograph or map described in words, extract); parts (a) 2-4 marks *describe/identify/calculate* from the resource, (b) 4-5 marks *explain*, (c) 6-8 marks *assess/to what extent* (`EXTENDED_RESPONSE`, `geographyLevels`); at least 5 marks auto-marked; AO1 about 53%, AO2 35%, AO3 12% | 6 (one per AS topic 1-6) |
| **Cambridge Papers 1 and 2, Section B** (one 15-mark essay per topic, candidates choose one of three) | `EXAM.CAM_ESSAY15` | EXTENDED_RESPONSE, 15, EVALUATION | CAM | an evaluative question ("Assess …", "To what extent …") with 15 points, a levels grid (`geographyLevels(15)`), a full model answer using examples and a conclusion, `wordLimit` about 400-600 words | 6 (one per AS topic) |
| **Cambridge Papers 3 and 4: compulsory structured question of a chosen topic** (10 marks, resource-based) | `EXAM.CAM_STRUCT10` | STRUCTURED, 10, ANALYSIS | CAM | resource in the stem; (a) 2-3 marks *describe/identify/calculate*, (b) 3 marks *explain*, (c) 4 marks *suggest/assess*; at least 4 marks auto-marked | 16 (2 per topic 7-14) |
| **Cambridge Papers 3 and 4: essay** (20 marks, one of two per chosen topic) | `EXAM.CAM_ESSAY20` | EXTENDED_RESPONSE, 20, EVALUATION | CAM | a question that needs a detailed specific example and a judgement; 20 points, `geographyLevels(20)`, model answer, `wordLimit` about 600-800 words | 16 (2 per topic 7-14) |

Each 25- and 20-mark item: difficulty 4-5; each 15- and 10-mark item: difficulty 3-5. Self-marked parts have line-by-line
points. The part splits are our conventions (the syllabi give only paper totals, question counts and section marks); a
reviewer must check them against recent and specimen papers. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>zimsec", keyPrefix: "exam.<prefix>zimsec" }, …)` for the
ZIMSEC rows (`applies: ZIM`) and `exam/<prefix>cambridge` (`applies: CAM`) for the Cambridge rows, using the prefix of
your assignment (e.g. `exam/w2a-zimsec`, key prefix `exam.w2a-zimsec`).

**Reserved mark values.** STRUCTURED and EXTENDED_RESPONSE worth **10, 15, 20 or 25** marks are only for the exam-format
items above. Practice STRUCTURED items use 6, 8, 12, 14 or 16 marks; practice extended responses use other values (4-9,
12).

Mock exams (built later by the lead, not by writers): ZIMSEC P1 10 × ZIM_STRUCT25 physical (two per topic 3-7; answer
any four; 180 min); ZIMSEC P2 10 × ZIM_STRUCT25 human (at least one per topic 8-15; answer any four; 180 min); ZIMSEC P3
ZIM_P3 × 7 (statistics ×1 compulsory; topographic map, GIS, remote sensing — answer one; physical, human, mitigation —
answer one; 75 marks, 180 min); Cambridge P1 3 × CAM_SECTION_A (topics 1-3) + 3 × CAM_ESSAY15 (answer one; 60 marks, 90
min); Cambridge P2 the same for topics 4-6; Cambridge P3 and P4: all four topics each with CAM_STRUCT10 + two CAM_ESSAY20,
answer two topics (60 marks, 90 min). Continuous assessment (ZIMSEC research and community projects) and fieldwork are not
simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): gis, rs, stats, skills, env, energy, atmos, climate, hydro, water, bio, tectonics,
  geomorph, tropical, coastal, hazard, arid, pop, disease, settle, urban, agri, mining, industry, tourism, transport,
  trade, dev.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/geography-a/tables/<prefix><name>.mjs` (never in `slices/`).

## Commands (repo root)

- Build your slices only: `node .scratch/geography-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- geography-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- geography-a` → fix findings in your files.
- Length cue: see the MCQ rule above.
- Literal line breaks: `node .scratch/tools/literal-newlines.mjs geography-a` → no findings in your files (a literal
  backslash-n in a `String.raw` or `t` text shows as "\n" on screen).

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing unit or helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check, length-cue and literal-newline results, any fact or case study you left out or want
  a reviewer to check.

## Proposed split into 8 writer assignments

111 concepts; 13-14 per assignment plus exam rows of roughly equal weight (a 25-mark item counts about 1.2 concepts, a
Cambridge essay about 0.6-0.8). Concept keys below drop the `ageo.` prefix. ★ = `freePreview: true` (at most one lesson
per top-level topic of each syllabus; a shared concept counts for both; the 22 chosen are listed here and no other
lesson is free). Each assignment lists its **exam rows**; counts add up to the totals at the end.

**W1a — prefix `w1a-`** (14; practical geography: GIS, remote sensing, statistics, maps and enquiry; ZIMSEC topics 1-2 and
Paper 3)
gis.coordinates-projections ★, gis.data-models-georeferencing, gis.gps-field-capture, rs.system-reflectance,
rs.resolution-interpretation, stats.descriptive, stats.hypothesis-testing, stats.correlation-regression,
stats.spatial-analysis, skills.topographic-maps, skills.research-techniques, skills.graphs-maps-resources ★,
settle.sphere-cbd, transport.network-indices-enterprise.
Folders: `gis/ rs/ stats/ skills/` (topographic-maps, research-techniques, graphs-maps-resources) plus
`settle/sphere-cbd` and `transport/network-indices-enterprise`. The statistics concepts are the reference for every
writer's statistics: finish them early. Exam rows: ZIM_P3 ×6 (statistics ×2, topographic map ×2, GIS ×1, remote sensing
×1). ★ skills.graphs-maps-resources serves ZIMSEC 2.4 and Cambridge S1.

**W1b — prefix `w1b-`** (13; atmosphere, climate and answering skills)
atmos.energy-budget ★, atmos.global-transfers, atmos.moisture-precipitation, atmos.air-masses-pressure-systems,
atmos.microclimates, atmos.climate-evidence-causes, climate.projections-environments ★, climate.tipping-points,
climate.impacts-vulnerability, climate.mitigation-adaptation-governance, hazard.weather-climatic, skills.extended-writing,
agri.threats-responses.
Folders: `atmos/ climate/`, `hazard/weather-climatic`, `skills/extended-writing`, `agri/threats-responses`. Exam rows:
ZIM_STRUCT25 ×2 (atmospheric processes, topic 4), CAM_SECTION_A ×1 and CAM_ESSAY15 ×1 (Cambridge topic 2),
CAM_STRUCT10 ×2 and CAM_ESSAY20 ×2 (Cambridge topic 11, climate change impacts and governance). The extended-writing
lesson serves both boards with neutral examples from several topics.

**W2a — prefix `w2a-`** (14; Earth processes, hydrology, water resources; ZIMSEC topics 5-6, Cambridge 1, 3, 5)
tectonics.plates-evidence ★, tectonics.processes-landforms, geomorph.weathering, geomorph.slopes, geomorph.mass-movements,
tropical.landforms-granite-karst, hydro.drainage-basin-system ★, hydro.hydrographs-morphometry,
hydro.river-processes-landforms, hydro.river-floods, hydro.flood-management, water.global-resources ★,
water.supply-demand-security, water.management-strategies.
Folders: `tectonics/ geomorph/ hydro/ water/`, `tropical/landforms-granite-karst`. Exam rows: ZIM_STRUCT25 ×4
(geomorphology ×2, hydrology ×2), CAM_SECTION_A ×3 and CAM_ESSAY15 ×3 (Cambridge topics 1, 3 and 5). The hydrology
numbers (hydrographs, morphometry, drainage density, discharge) come from the helpers.

**W2b — prefix `w2b-`** (14; biogeography, environmental management, energy, mining legislation and impacts; ZIMSEC topics
3, 7, 11, 13, Cambridge 12)
bio.vegetation-biomes, bio.plant-succession ★, bio.nutrient-cycles, bio.biodiversity-ecosystems, bio.soils,
env.pollution, env.degradation, env.eia-projects ★, energy.sources-patterns ★, energy.zimbabwe-clean-green,
energy.transition-security, mining.legislation-policy ★, mining.prospecting-mineralogy, mining.enterprises-impacts-safety.
Folders: `bio/ env/ energy/ mining/` (legislation-policy, prospecting-mineralogy, enterprises-impacts-safety). Exam rows:
ZIM_STRUCT25 ×5 (environmental management ×2, biogeography ×2, energy ×1), CAM_STRUCT10 ×2 and CAM_ESSAY20 ×2
(Cambridge topic 12, environmental issues and management). Name only mining laws you are sure of and say "to be verified
against current law".

**W3a — prefix `w3a-`** (14; Cambridge Paper 3 options: tropical, coastal and arid environments)
tropical.climates ★, tropical.vegetation-soils, tropical.challenges, coastal.waves-erosion-transport ★,
coastal.erosional-landforms, coastal.depositional-landforms, coastal.dunes-saltmarsh-mangrove, coastal.coral-reefs,
coastal.management-case, arid.climates-causes ★, arid.weathering-wind, arid.water-landforms, arid.vegetation-soils,
arid.challenges.
Folders: `tropical/ (except landforms-granite-karst) coastal/ arid/`. Exam rows: CAM_STRUCT10 ×6 and CAM_ESSAY20 ×6 (2 each
for Cambridge topics 7, 8 and 10). All three topics are Cambridge A Level only; detailed specific examples (a coastline,
a rainforest or savanna ecosystem, an arid environment) are real, dated and factual, with no invented figures.

**W3b — prefix `w3b-`** (14; hazardous environments, disease and geography, development indicators; Cambridge topics 9
and 14, ZIMSEC topic 15 and 8 health)
hazard.earthquakes ★, hazard.volcanoes, hazard.eq-volcano-management, hazard.tropical-cyclones, hazard.wildfires,
hazard.multi-hazard-case, disease.geography-patterns ★, disease.influenza, disease.cholera, disease.malaria,
disease.zimbabwe-health, disease.monitoring-response, disease.pandemic-eradication, dev.indicators-sectors ★.
Folders: `hazard/ (except weather-climatic) disease/`, `dev/indicators-sectors`. Exam rows: CAM_STRUCT10 ×4 and
CAM_ESSAY20 ×4 (Cambridge topics 9 and 14, 2 each), ZIM_P3 ×2 (research techniques: physical component ×1, mitigation and
adaptation ×1). Sensitive topics: see the quality rules. Disease and pandemic cases name only established events.

**W4a — prefix `w4a-`** (14; population, settlement and urban areas; ZIMSEC topics 8-9 and 15, Cambridge topics 4 and 6)
pop.distribution-growth, pop.indicators-components ★, pop.structure-dtm, pop.policies, pop.migration-types-patterns,
pop.migration-causes-impacts, settle.site-location-functions, settle.hierarchy-theories, settle.growth-points,
settle.land-reform-resettlement, urban.urbanisation-processes ★, urban.structure-change, urban.sustainability-management,
dev.regional-inequalities.
Folders: `pop/ settle/ (except sphere-cbd) urban/`, `dev/regional-inequalities`. Exam rows: ZIM_STRUCT25 ×5 (population
×2, settlement ×2, regional inequalities ×1), CAM_SECTION_A ×2 and CAM_ESSAY15 ×2 (Cambridge topics 4 and 6). Nearest
neighbour analysis, rank-size and dependency calculations come from the helpers.

**W4b — prefix `w4b-`** (14; agriculture, industry, tourism, transport and trade; ZIMSEC topics 10, 11-12, 14, Cambridge
topic 13)
agri.factors-location ★, agri.farming-systems-green-revolution, agri.land-reform-food-security,
agri.value-addition-agribusiness, mining.beneficiation-marketing, industry.location-linkages ★, industry.smes-hightech,
tourism.patterns-trends, tourism.impacts-management, transport.distribution-factors, trade.zimbabwe-policy-opportunities,
trade.global-flows-balance ★, trade.global-factors-cases, trade.igos-aid.
Folders: `agri/ (except threats-responses) industry/ tourism/ transport/ (except network-indices-enterprise) trade/`,
`mining/beneficiation-marketing`. Exam rows: ZIM_STRUCT25 ×4 (agriculture ×1, mining ×1, industry ×1, transport and trade
×1), ZIM_P3 ×1 (research techniques, human component), CAM_STRUCT10 ×2 and CAM_ESSAY20 ×2 (Cambridge topic 13, trade, aid
and tourism). Trade and policy wording is neutral; published figures are labelled and rounded.

Totals: 111 concepts, 22 free-preview lessons; ZIM_STRUCT25 20 (physical 10, human 10), ZIM_P3 9, CAM_SECTION_A 6,
CAM_ESSAY15 6, CAM_STRUCT10 16, CAM_ESSAY20 16.
