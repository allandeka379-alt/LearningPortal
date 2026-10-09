# biology-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Biology family: ZIMSEC A-Level Biology (Forms 5-6, 2015-2022) — the
main product — and Cambridge International AS & A Level Biology 9700 (2025-2027). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow. **Scientific accuracy is the first rule**: a wrong fact,
number or mechanism is worse than a missing one. This is A-Level: molecular detail, data analysis and statistics are
expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX).
- `content/concepts/biology-a.json` (106 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." — and says exactly
  what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names. Stay inside it;
  when two concepts touch, give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/a-level/biology/2015-2022.json` (topics 1-13 of the topic list,
  sub-topics are the competency-matrix key concepts 8.1.1 …, plus our Practical skills node P for Paper 4) and
  `content/syllabi/cambridge/a-level/biology/2025-2027.json` (section **AS** = topics 1-11, Papers 1 and 2; section
  **A** = topics 12-19, A Level only, Paper 4; section **PS** = practical skills, P3 for Paper 3 and P5 for Paper 5;
  objectives carry the printed learning-outcome codes such as 16.2.5). Read the `notes` of both (assessment as read,
  gaps in the ZIMSEC copy, routes, statistics). ZIMSEC covers 88 concepts, Cambridge 93; 75 are shared.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items feed Paper 4. Respiration, photosynthesis, meiosis and genetic
  crosses are A Level only for Cambridge but Form 5 for ZIMSEC: write them once, at A Level depth.
- The O-level family `content/subjects/biology-o/` shows the house style (lesson structure, tone, question mix). Go
  well beyond it in depth.
- `.scratch/biology-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for LaTeX, `EXAM` plans, `checkExam`,
  and the **checked biology helpers**: `chk`, `rnd`, `sf`, `sfStr`, `dpStr`, `table`; statistics `mean`, `median`,
  `range`, `sd` (sample, n − 1), `se`, `ci95` (x̄ ± 2SE), `pctChange`, `pctError`, `chiSquared` (+ `expectedFromRatio`,
  `chiCrit`), `tTest` (+ `tCrit`), `pearson`, `spearman` (+ `ranks`, `SPEARMAN_CRIT_05`), `simpson`, `lincoln`,
  `hardyWeinberg`; cells `convert`, `magnification`, `actualSize`, `graticuleUnit`, `mitoticIndex`, `sav`;
  `zeroCrossing` (water potential of a tissue); `rq`, `rqFormula`, `capillaryVolume`, `rf`, `inverseSquare`,
  `cardiacOutput`, `pcrCopies`, `assortmentCombos`, `chargaff`, `complement`. Units for numerical answers are the keys
  of `UNITS` (µm, nm, mm, cm³, mm³/min, cm³/min, kJ/g, mV, mmHg, kPa, beats/min, mol/dm³, %, °C, s, min, …);
  magnifications use `prefix: "×"`. Critical values come from the helpers (checked against published tables at import).
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations
  teach, hints from difficulty 3); any `.scratch/geography/slices/g3a-*.mjs` or `.scratch/additional-mathematics/slices/`
  (numbers, stimulus tables, structured items with sub-parts); any lesson in `content/subjects/biology-o/lessons/`.

## What to produce per concept

1. **One lesson** `content/subjects/biology-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `abio.<area>.<name>`; e.g. `abio.respiration.glycolysis-krebs` → `lessons/respiration/glycolysis-krebs.md`, key
   `respiration.glycolysis-krebs`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why
   it matters, a hook — a Zimbabwean context where it is natural and accurate — and what the student should know
   already), `## Key definitions` (`:::definition{term="…"}` in precise examinable wording of your own;
   `:::keyfact` for values to learn), explanation sections in a logical order (mechanisms step by step; processes as
   numbered stages; structures part by part with function), **at least two worked examples** (`:::worked-solution` for
   every calculation: magnification, water potential, RQ, Rf, cardiac output, chi-squared, t-test, Hardy-Weinberg,
   Simpson, Lincoln, correlation; `:::example` for data interpretation: describing and explaining a graph given as a
   table, predicting a result, interpreting a genetic diagram), `## Common mistakes` (`:::mistake{title="…"}`),
   `## Exam tips` (`:::exam-tip`: which papers test it — ZIMSEC Papers 1-4, Cambridge Papers 1-5 — and how *state,
   describe, explain, suggest, calculate, compare, discuss* are answered for this concept), `## Summary` (one
   `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the concept]), estimatedMinutes
   (honest), level "core"; `freePreview: true` ONLY on the lessons named in your assignment. Do not add `objectives`.
   Where the boards differ in depth or terms, add a short `:::keyfact{title="ZIMSEC and Cambridge"}` saying who needs
   what (e.g. "C4 plants: ZIMSEC only"; "Km and immobilised enzymes: Cambridge").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/biology-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark, exam-worthy: they feed ZIMSEC Paper 1 and Cambridge
     Paper 1), numerical/calculation (`b.num` / `b.calc`) wherever the concept has numbers, true/false, matching
     (structure ↔ function, enzyme ↔ role, pathogen ↔ disease, hormone ↔ effect, stage ↔ event), fill-in-the-blank
     (with `choices` drop-downs for terms), closed `short` answers (a term, a structure, a base sequence — list every
     acceptable form), 3-5 self-marked `manualShort` items (describe / explain / suggest, 2-6 marks, one tickable point
     per mark) and 2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12,
     14 or 16 — never 10, 15, 20 or 25, see reserved marks) on an original data stimulus (results table, described
     graph, micrograph described in words, genetic cross, base sequence) with sub-parts where natural.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content (a ZIMSEC-detail part such as myoglobin, Meselson-Stahl or
     C4 inside a shared concept → ZIM; Km, rice, the Venus fly trap detail inside a shared concept → CAM). Single-board
     concepts are tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("Where in the
     mitochondrion does the Krebs cycle take place?").

## Biology quality rules (non-negotiable)

- **Facts are right or absent.** Mechanisms, structures, names and values must be standard A-Level knowledge (as in
  the major A-Level textbooks, but in your own words). If you are not sure, leave it out or say it generally. Typical
  values are labelled "about" and must be realistic: resting potential about −70 mV, action potential peak about
  +30 to +40 mV; light microscope resolution about 200 nm, TEM about 0.5 nm (textbooks vary — no MCQ may hinge on an
  exact limit); ribosomes 80S cytoplasmic and 70S in prokaryotes, mitochondria and chloroplasts; bacteria about
  1-5 µm; a typical red blood cell about 7-8 µm; resting heart rate about 60-80 beats/min; blood pressure about
  120/80 mmHg in a healthy young adult; RQ of carbohydrate 1.0, lipid about 0.7, protein about 0.9; energy about
  16-17 kJ/g for carbohydrate and protein and about 37-39 kJ/g for lipid; PCR steps about 95 °C, 50-65 °C, 72 °C;
  normal blood glucose about 4-6 mmol/dm³ (about 0.8-1.1 g/dm³) when fasting. No invented statistics, prevalence
  figures or "studies show".
- **Every number is computed in code.** Build data tables and answers with the helpers (they throw on impossible data:
  totals that differ, expected values below 5 in χ², a χ² or t right on the critical value, an Rf above 1) and pass
  the **exact** value to `b.num` / `b.calc`; never type a computed answer by hand (`chk` any value you also write in
  prose). Lesson tables and worked statistics: print them from a script in `.scratch/biology-a/tables/<prefix><name>.mjs`
  (never in `slices/`, which the build imports) and paste the output. Re-derive every worked example from its data.
- **Statistics as the boards set them.** Formulae are provided in Cambridge papers (write them in the stem with LaTeX
  when a question uses them); degrees of freedom are not (χ²: classes − 1; t-test: n1 + n2 − 2). Always state the
  null hypothesis, give the critical value in the stem ("the critical value at p = 0.05 is 7.81"), and conclude in
  words ("the difference is not significant; it is due to chance; accept the null hypothesis"). Chi-squared on one
  row of data only; sample standard deviation (n − 1); 95% CI as x̄ ± 2SE; Spearman for 5-20 pairs. ZIMSEC Paper 4
  needs understanding of χ², not detailed computation, but ZIMSEC theory items may calculate it.
- **Numerical answers:** state the unit and the rounding in the stem ("in µm, to three significant figures", "to two
  decimal places") and pass `unit` (a UNITS key) and `dp` or `sf` to match. The default accepts 3 s.f. or better.
  Add 1-3 `wrong` values that are real mistakes (mm not converted to µm; magnification inverted; n instead of n − 1;
  df = classes; RQ inverted) and say why in the explanation. `b.calc` items need a numbered `workedSolution` (it
  defaults to the explanation, so write the explanation as the full calculation). Significant figures: as Cambridge
  requires, the same as or one more than the least precise data.
- **Notation.** British spelling (haemoglobin, oesophagus, foetus or fetus consistently: use *fetus*, *fetal*), SI
  units with correct symbols (µm, cm³, mol dm⁻³ or mol/dm³, kPa, mV; °C). Genus and species names in italics with a
  capital genus (*Plasmodium falciparum*, *Vibrio cholerae*; *P. falciparum* after first use). Alleles in genetic
  diagrams with LaTeX superscripts (`$I^A I^B$`, `$X^H X^h$`, `$Hb^A Hb^S$`) or single letters (`T`, `t`) defined in
  the text; set every genetic diagram out as Parent phenotypes / Parent genotypes / Gametes / a Punnett-square table /
  Offspring genotypes and phenotypes / Ratio. Base sequences in capitals with 5' and 3' ends marked when direction
  matters. Chemical formulae with subscripts (CO₂, C₆H₁₂O₆) or LaTeX.
- **Diagrams in words and tables, never images** (only uploaded images are possible and you cannot make them).
  Describe structures in order with labels and functions, electron micrographs as "an electron micrograph shows …",
  graphs as data tables plus a sentence on the shape ("rises steeply, then levels off at about …"), cycles and
  pathways as numbered steps or a table (substrate → product, carbons, what is produced). Questions ask "Which
  structure …", give a labelled description, or ask the student to describe what a graph or drawing would show; never
  "draw" (self-marked "describe the drawing you would make" is fine for the practical rows) and never "the diagram
  below" unless the table is there.
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho,
  Thandeka), places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Hwange, Kariba, the Zambezi valley, the Eastern
  Highlands), crops (maize, sorghum, groundnuts, soya beans, tobacco, cotton), wildlife (elephant, white and black
  rhino, kapenta), health (malaria in the lowveld, cholera, TB, HIV, sickle cell). Well-established facts only; no
  statistics presented as real; neutral wording on policy (GMOs, land, wildlife trade, ivory).
- **Sensitive topics** (HIV, drug abuse, contraception, abortion, cancer, genetic disease, screening, gene therapy):
  factual, respectful, non-judgemental; no stigma; ethical questions presented with balanced views attributed to
  groups ("some religious groups argue…"), never to invented individuals; no medical or legal advice to the reader.
- **Animals and practical work:** humane handling (respirometer invertebrates returned unharmed), safety precautions
  stated (eye protection, hot water baths, Benedict's and biuret reagents, ethanol flammable), risk assessed as low,
  medium or high as Cambridge requires.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: a real
  misconception — confusing resolution with magnification, PSI with PSII, codon with anticodon); never "all/none of
  the above", never refer to options by letter. **No length cue** — the key must not be clearly the longest option;
  check with `node .scratch/tools/length-cue.mjs biology-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as A-Level mark schemes award; points add up to the marks;
  example answer complete. *Explain* needs a reason linked to the mechanism, *describe* data needs a trend plus quoted
  figures with units, *suggest* accepts any valid answer (list the main ones inside points as "A or B").
- **Original wording** (no textbook, past-paper or mark-scheme text), British English, dates as 7 October 2026.

### Terminology between the boards

| ZIMSEC (syllabus / usage) | Cambridge 9700 |
|---|---|
| Five kingdoms: Prokaryotae, Protista, Fungi, Plantae, Animalia | Three domains (Archaea, Bacteria, Eukarya); kingdoms Protoctista, Fungi, Plantae, Animalia |
| Energetics (ATP, photosynthesis, respiration) | Energy and respiration; Photosynthesis |
| Active uptake | Active transport |
| Election (sic) transport chain; oxidative phosphorylation | Oxidative phosphorylation, electron transport chain |
| Bohr effect | Bohr shift |
| Messelson (sic) and Stahl experiment | (not named) |
| Genetic fingerprinting | Gel electrophoresis (fingerprinting not named) |
| Pacemaker, myogenic control | Sinoatrial node, atrioventricular node, Purkyne tissue |
| Chi-squared test (Paper 4: understanding only) | Chi-squared test (formula provided, calculation expected) |

In a shared concept use both names the first time ("the Bohr shift (Bohr effect)").

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Paper 2"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to).
Wrap the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs` (and
`applies: EXAM.X.applies` where the plan has one). The builder refuses a STRUCTURED item worth 10, 15, 20 or 25 marks
that does not match a plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`, `(ii)` one level deep via `P.group`,
or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects it). The mocks draw by type + marks +
skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 and Cambridge P1: 40 four-option multiple-choice items | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs; Cambridge P1 draws AS concepts only | ≥ 80 per syllabus for two mocks (plenty) |
| **Theory structured** — ZIMSEC P2 (compulsory structured questions, 60 marks), Cambridge P2 (AS content, 60 marks) and Cambridge P4 (A Level content, 100 marks): one structured question on one area | `EXAM.THEORY10` | STRUCTURED, 10, APPLICATION | none when every concept is covered by both syllabi and the wording suits both; otherwise ZIM or CAM | an original stimulus (data table, described micrograph or graph, genetic cross, base sequence); parts (a), (b), (c) … of 1-4 marks from *state/name* through *calculate* to *explain/suggest*, sub-parts allowed; at least 4 marks auto-marked; difficulty 3-4 | 6 per writer (48); mocks need 12 ZIMSEC, 12 Cambridge AS, 20 Cambridge A |
| **ZIMSEC P3**: short free-response essay (answer 5 of 7, 20 marks each) | `EXAM.ZIM_P3_ESSAY` | STRUCTURED, 20, EVALUATION | ZIM | (a) 8 *describe/outline* and (b) 12 *explain/discuss*, both `P.manual({ type: "EXTENDED_RESPONSE", points, modelAnswer, wordLimit })` with one point per mark and a full model answer; difficulty 4-5 | 3 per writer (24); mocks need 14 |
| **ZIMSEC P4** question 1 style: an investigation (written) | `EXAM.ZIM_P4_INVESTIGATION` | STRUCTURED, 20, ANALYSIS | ZIM | method given in steps with original results; parts on variables, recording a results table (self-marked description of headings/units), processing (auto-marked calculations), describing a graph (self-marked), conclusion, errors, improvements | 4 (see assignments) |
| **Cambridge P3** question 1 style: an investigation | `EXAM.CAM_P3_INVESTIGATION` | STRUCTURED, 25, ANALYSIS | CAM | as above at Paper 3 standard: independent/dependent/standardised variables, ≥ 5 values, replicates, table conventions, processing to correct s.f., graph description, anomalies, systematic and random errors, improvements; AS contexts | 4 |
| **Practical microscopy** (ZIMSEC P4 and Cambridge P3 question 2 style) | `EXAM.PRACTICAL_MICROSCOPY` | STRUCTURED, 15, APPLICATION | none (both) unless board-specific | a slide or photomicrograph described in words; plan-diagram and cell-drawing conventions (self-marked "describe what your drawing would show"), measuring with a graticule or scale bar, magnification and actual size (auto-marked), observable differences between two specimens in a table; concepts include `abio.skills.biological-drawing` | 6 |
| **Planning** (ZIMSEC P4 planning and Cambridge P5 question 1 style) | `EXAM.PLANNING` | STRUCTURED, 15, EVALUATION | none (both) unless board-specific | a context and hypothesis; prediction, variables, method with concentrations (serial or proportional dilution), controls, replicates, risk assessment, how to process and assess the results; mostly self-marked with tickable points; concepts include `abio.skills.planning-evaluation` | 6 |
| **Cambridge P5** question 2 style: analysis and evaluation | `EXAM.CAM_P5_ANALYSIS` | STRUCTURED, 15, ANALYSIS | CAM | given data (with SD/SE or raw values); choose and justify a statistical test, null hypothesis, calculation (auto-marked, computed with the helpers), interpretation against a critical value, conclusion, evaluation of the data and method; concepts include `abio.skills.descriptive-statistics` or the statistics concept used | 6 |

Each 20- and 25-mark item: difficulty 4-5; each 15- and 10-mark item: difficulty 3-5. Self-marked parts have
line-by-line points. The 10-mark size, the ZIMSEC essay split and all part structures are our conventions (the
syllabi give only paper totals); a reviewer must check them against recent papers. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>theory", keyPrefix: "exam.<prefix>theory" }, …)` for the
10-mark items (set `applies` per item), `exam/<prefix>zimsec` (`applies: ZIM`) for ZIMSEC-only rows,
`exam/<prefix>cambridge` (`applies: CAM`) for Cambridge-only rows and `exam/<prefix>practical` for the both-board
practical rows (e.g. `exam/w2a-practical`, key prefix `exam.w2a-practical`).

**Reserved mark values.** STRUCTURED worth **10, 15, 20 or 25** marks is only for the exam-format items above.
Practice structured items use 6, 8, 12, 14 or 16 marks.

Mock exams (built later by the lead, not by writers): ZIMSEC P1 40 × MCQ (60 min); ZIMSEC P2 6 × THEORY10 (90 min);
ZIMSEC P3 7 × ZIM_P3_ESSAY, answer 5 (120 min); ZIMSEC P4 skills paper ZIM_P4_INVESTIGATION + PRACTICAL_MICROSCOPY +
PLANNING (50 marks, 150 min); Cambridge P1 40 × MCQ on AS topics (75 min); Cambridge P2 6 × THEORY10 on AS topics
(75 min); Cambridge P3 skills paper CAM_P3_INVESTIGATION + PRACTICAL_MICROSCOPY (40 marks, 120 min); Cambridge P4
10 × THEORY10 on A Level topics (120 min); Cambridge P5 PLANNING + CAM_P5_ANALYSIS (30 marks, 75 min). Continuous
assessment (ZIMSEC) and the hands-on practical work are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): cells, molecules, enzymes, membranes, division, nucleic, plant-transport,
  mammal-transport, gas-exchange, disease, immunity, respiration, photosynthesis, homeostasis, coordination,
  inheritance, evolution, biodiversity, ecology, conservation, genetech, reproduction, skills.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/biology-a/tables/<prefix><name>.mjs` (never in `slices/`).

## Commands (repo root)

- Build your slices only: `node .scratch/biology-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- biology-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- biology-a` → fix findings in your files.
- Length cue: see the MCQ rule above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing unit or helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

106 concepts; 12-14 per assignment plus exam rows of roughly equal weight (the practical rows count about as much as a
concept each). Concept keys below drop the `abio.` prefix. ★ = `freePreview: true` (at most one lesson per top-level
topic of each syllabus; a shared concept counts for both). Every writer also owns **6 THEORY10** and **3 ZIM_P3_ESSAY**
items on their own concepts (THEORY10 on Cambridge AS concepts for W1a-W2b, on A Level concepts for W3a-W4b; ZIMSEC
essays only on concepts ZIMSEC covers).

**W1a — prefix `w1a-`** (14; cells, biological molecules, enzymes — ZIMSEC topics 1-2, Cambridge 1-3, AS)
cells.microscopy ★, cells.slides-and-cells, cells.eukaryotic-ultrastructure, cells.prokaryotes-viruses,
molecules.tests, molecules.carbohydrates, molecules.polysaccharides, molecules.lipids, molecules.protein-structure,
molecules.haemoglobin-collagen, molecules.water, enzymes.mode-of-action ★, enzymes.factors,
enzymes.inhibition-kinetics.
Folders: `cells/ molecules/ enzymes/`. Practical rows: ZIM_P4_INVESTIGATION ×1 (enzymes or a semi-quantitative food
test), CAM_P3_INVESTIGATION ×1 (enzyme rate with catalase or amylase), PRACTICAL_MICROSCOPY ×1 (onion epidermis or
cheek cells, graticule).

**W1b — prefix `w1b-`** (13; membranes, cell and nuclear division, nucleic acids)
membranes.fluid-mosaic, membranes.diffusion-osmosis, membranes.active-transport-bulk, membranes.surface-area-volume,
division.chromosomes-cell-cycle, division.mitosis ★, division.cancer, division.meiosis, division.genetic-variation,
nucleic.dna-structure ★, nucleic.dna-replication, nucleic.transcription, nucleic.translation.
Folders: `membranes/ division/`, `nucleic/` (except gene-mutation). Practical rows: CAM_P3_INVESTIGATION ×1 (water
potential of potato tissue or agar blocks and SA:V), PRACTICAL_MICROSCOPY ×1 (root tip squash, mitotic index).
Meiosis and genetic variation are Cambridge A Level only: their THEORY10 items count towards Paper 4.

**W2a — prefix `w2a-`** (12; transport, gas exchange, practical skills)
nucleic.gene-mutation, plant-transport.tissues, plant-transport.water-uptake, plant-transport.transpiration ★,
plant-transport.translocation, mammal-transport.circulation-vessels, mammal-transport.gas-transport,
mammal-transport.heart, mammal-transport.blood-pressure-exercise, gas-exchange.system ★,
skills.practical-investigation ★, skills.biological-drawing.
Folders: `plant-transport/ mammal-transport/ gas-exchange/`, `nucleic/gene-mutation`,
`skills/practical-investigation|biological-drawing`. Practical rows (the main practical owner): ZIM_P4_INVESTIGATION
×2 (potometer and a factor affecting water uptake; pulse rate before and after exercise), CAM_P3_INVESTIGATION ×2
(mass lost by leaves over time under different conditions; movement of a dye up cut stems at different
temperatures), PRACTICAL_MICROSCOPY ×4 (stem or root TS plan diagram, xerophyte leaf, artery and vein, trachea
or alveoli). The two skills lessons serve both boards: teach with neutral examples and show both papers' styles.

**W2b — prefix `w2b-`** (14; disease, immunity, sexual reproduction — mostly human biology)
disease.cholera-tb, disease.malaria ★, disease.hiv-aids, disease.global-distribution, disease.antibiotics,
disease.drug-substance-abuse, immunity.immune-response, immunity.antibodies, immunity.vaccination,
reproduction.flowering-plants, reproduction.gametogenesis, reproduction.menstrual-cycle,
reproduction.fertilisation-placenta ★, reproduction.contraception-ivf.
Folders: `disease/ immunity/ reproduction/`. Practical rows: PLANNING ×1 (e.g. antimicrobial effect of plant extracts
on bacterial growth, or a pollen-germination investigation). Reproduction is ZIMSEC only: its essays are a good fit.

**W3a — prefix `w3a-`** (13; energy, respiration, photosynthesis, homeostasis)
respiration.atp ★, respiration.glycolysis-krebs, respiration.oxidative-phosphorylation, respiration.anaerobic,
respiration.substrates-rq, photosynthesis.chloroplasts-pigments, photosynthesis.light-dependent,
photosynthesis.calvin-c4, photosynthesis.limiting-factors, homeostasis.principles ★, homeostasis.kidney,
homeostasis.blood-glucose, homeostasis.stomata.
Folders: `respiration/ photosynthesis/ homeostasis/`. Practical rows: ZIM_P4_INVESTIGATION ×1 (yeast fermentation
rate or respirometer), PLANNING ×2 (light intensity and an aquatic plant; temperature and yeast respiration with
DCPIP or methylene blue).

**W3b — prefix `w3b-`** (13; control and coordination, inheritance)
coordination.nervous-endocrine, coordination.action-potential ★, coordination.impulse-transmission,
coordination.synapses, coordination.muscle-contraction, coordination.plant-responses, inheritance.genes-phenotype,
inheritance.monohybrid ★, inheritance.sex-linkage, inheritance.dihybrid, inheritance.linkage-epistasis,
inheritance.chi-squared, inheritance.gene-control.
Folders: `coordination/ inheritance/`. Practical rows: CAM_P5_ANALYSIS ×1 (a chi-squared analysis of a dihybrid or
linkage cross).

**W4a — prefix `w4a-`** (13; selection and evolution, classification and biodiversity, statistics and planning)
evolution.variation, evolution.t-test ★, evolution.natural-selection, evolution.allele-frequencies,
evolution.artificial-selection, evolution.speciation, biodiversity.classification-hierarchy ★, biodiversity.kingdoms,
biodiversity.economic-importance, biodiversity.sampling, biodiversity.diversity-statistics,
skills.planning-evaluation, skills.descriptive-statistics.
Folders: `evolution/ biodiversity/`, `skills/planning-evaluation|descriptive-statistics`. Practical rows: PLANNING ×2
(e.g. a transect along a gradient; comparing leaf lengths in sun and shade), CAM_P5_ANALYSIS ×4 (t-test; Spearman or
Pearson; Simpson's index; SD/SE error bars). The statistics concepts are the reference for every writer's statistics:
finish them early.

**W4b — prefix `w4b-`** (14; ecology, conservation, genetic technology)
ecology.levels-organisation, ecology.nitrogen-cycle ★, ecology.human-impact, conservation.threats-strategies,
conservation.elephant-rhino, conservation.organisations-invasives, genetech.recombinant-dna ★,
genetech.insulin-recombinant-proteins, genetech.pcr-electrophoresis-fingerprinting,
genetech.microarrays-bioinformatics, genetech.genetic-screening, genetech.gene-therapy, genetech.gmo-agriculture,
genetech.ethics.
Folders: `ecology/ conservation/ genetech/`. Practical rows: PLANNING ×1 (e.g. the effect of nitrate concentration or
legume inoculation on plant growth), CAM_P5_ANALYSIS ×1 (e.g. Lincoln index and population estimates, or gel band
data). Elephant and rhino population data must be original or clearly labelled as approximate and illustrative.

Totals: THEORY10 48 (24 on Cambridge AS concepts, 24 on A Level concepts; most also serve ZIMSEC P2), ZIM_P3_ESSAY
24, ZIM_P4_INVESTIGATION 4, CAM_P3_INVESTIGATION 4, PRACTICAL_MICROSCOPY 6, PLANNING 6, CAM_P5_ANALYSIS 6.
