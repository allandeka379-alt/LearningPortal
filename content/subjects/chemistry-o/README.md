# Chemistry (O-Level / IGCSE) — `chemistry-o`

Original study content for **ZIMSEC O-Level Chemistry (Forms 3–4 syllabus, 2015-2022)** and **Cambridge IGCSE
Chemistry (0620, syllabus 2026-2028)**, written once per concept and tagged to both syllabi through the concept registry
(`content/concepts/chemistry-o.json`). Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`.

> **Review status.** Every item was written by AI writing agents and checked by **two** independent AI review passes
> (statistics below). **No human has reviewed it yet.** On 2026-10-08 the family was imported into the DEV database and
> published there **for a local preview only** (`--approver demo.admin@example.test`, with a note on every approval
> that it is not a human attestation). Production publishing requires a human reviewer (§41): review at
> `/admin/review/topics`, then `npm run content:publish -- --approver <reviewer email>`.

## At a glance

| | Total | ZIMSEC O-Level | Cambridge 0620 |
| --- | --- | --- | --- |
| Concepts with content | 104 of 104 | 97 of 97 covered | 86 of 86 covered |
| Lessons (free preview) | 104 (14) | 97 (14) | 86 (14) |
| Questions | 2,114 | 1,944 | 1,657 |
| Flashcards | 1,056 | 973 | 823 |
| Topic tests | 35 | 23 | 12 |
| Mock exams | 5 | Paper 1, Paper 2 | Paper 2, Paper 4, Paper 6 |
| Images | 0 | | |

Questions by type: 1,006 multiple choice (31 of them "select all that apply"), 188 true/false, 217 numerical or
calculation, 102 short answer, 108 fill-in-the-blank, 101 matching, 301 structured (multi-part) and 91 extended
response. By difficulty (1 recall … 5 top-grade problem): 195 / 718 / 705 / 412 / 84. 449 questions are marked
exam-style (the theory mocks draw these) and 312 are daily-question eligible (free tier). 609 questions write formulae
and equations with mhchem (`\ce{…}`). Written explanations are marked by the student against our mark-scheme points
while AI marking is switched off: 338 questions contain such parts, worth 1,119 of the bank's 4,452 marks (25 %); 92
of them (mostly the 91 extended responses) are marked entirely that way.

Board scope (by the objectives each lesson is tagged to): 76 lessons serve both boards. 18 are ZIMSEC only (Group II,
types of fuels, fuel efficiency and heating values, fuels from coal, wood and biomass, measuring enthalpy changes,
simple cells and the lead-acid battery, the Ostwald process, lime, liquefaction of air, processing coal and diamonds,
mineral ores, mineral processing and beneficiation, hard and soft water, the ozone layer, types of waste, waste disposal
and recycling, soaps and herbs) and 10 Cambridge only (physical and chemical changes, giant covalent structures, Group
I, enthalpy changes from bond energies, electrolysis principles and molten compounds, hydrogen–oxygen fuel cells,
proton transfer and strong and weak acids, hydrated salts, rusting, and extracting aluminium); some of these still
appear under a ZIMSEC topic through the concept registry, which is why the ZIMSEC column counts 97 lessons. For board-specific
depth inside shared concepts, 90 questions carry `applies: ["zimsec"]` and 29 a Cambridge-only `applies`, and 646
questions label Cambridge Supplement-only content "(Supplement)" in the stem, a part or a note.

Lessons run to roughly 800–1,650 words of text (median about 1,140), each with key definitions, worked examples
(mole, titration, energy and electrolysis calculations, equations with state symbols), common mistakes, exam tips and a
summary. Zimbabwean context is used throughout: Sable Chemicals (Kwekwe) and fertilisers, the Great Dyke's chrome,
platinum and lithium, Murowa and Marange diamonds, Hwange coal, Lowveld sugar-cane ethanol, Lake Chivero water
quality, Harare's altitude (water boils at about 95 °C), LPG stoves and local herbs (zumbani).

Validation: `npm run content:validate -- chemistry-o --strict --no-cache` gives **0 errors and 0 warnings** (330
files, 3,274 items), which includes rendering every lesson, question and flashcard, marking every `modelResponse` (full
marks) and every `wrongResponse` (less) with the real marking engine, and proving every assessment blueprint can be
filled from the bank for its syllabus. `npm run content:check -- chemistry-o` leaves 319 advisory findings (184
LESSON_REUSE, 135 QUESTION_REUSE), almost all shared standard data (see "Needs a specialist teacher's check").

## Coverage by syllabus topic

Columns: lessons (of which free preview), questions, questions by type (MCQ, true/false, numerical or calculation,
short answer, fill-in-the-blank, matching, structured, extended response), questions by difficulty d1–d5, exam-style
questions, flashcards, and whether the topic has a topic test. ZIMSEC section rows (7.1.0 … 7.4.0) and each topic
count the items of their subtopics. Cambridge subtopics marked *(Supplement)* are examined only on the Extended papers
(2, 4 and 6 with 4).

#### ZIMSEC O-Level Chemistry — version 2015-2022

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **7.1.0 PHYSICAL CHEMISTRY** | **56 (9)** | **1123** | 531 | 93 | 131 | 53 | 61 | 52 | 159 | 43 | 100 | 392 | 368 | 218 | 45 | 251 | **564** |  |
| **7.1.1 Laboratory techniques** | **11 (1)** | **217** | 104 | 20 | 24 | 9 | 10 | 11 | 31 | 8 | 16 | 77 | 74 | 40 | 10 | 37 | **108** | yes |
| &nbsp;&nbsp;Measuring instruments | 3 (1) | 60 | 27 | 6 | 9 | 2 | 3 | 3 | 9 | 1 | 6 | 26 | 16 | 9 | 3 | 9 | 30 |  |
| &nbsp;&nbsp;Separation techniques (Form 3) | 2 (0) | 40 | 18 | 4 | 4 | 2 | 2 | 2 | 6 | 2 | 2 | 14 | 14 | 8 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;Volumetric analysis | 2 (0) | 41 | 16 | 3 | 10 | 1 | 2 | 2 | 6 | 1 | 1 | 13 | 17 | 7 | 3 | 7 | 20 |  |
| &nbsp;&nbsp;Separation techniques (Form 4) | 1 (0) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 6 | 9 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;Qualitative analysis | 3 (0) | 56 | 33 | 5 | 0 | 3 | 2 | 3 | 7 | 3 | 6 | 18 | 18 | 13 | 1 | 9 | 28 |  |
| **7.1.2 Matter** | **4 (1)** | **80** | 43 | 8 | 2 | 5 | 4 | 4 | 11 | 3 | 7 | 34 | 22 | 13 | 4 | 38 | **41** | yes |
| &nbsp;&nbsp;States of matter | 2 (1) | 40 | 22 | 4 | 1 | 2 | 2 | 2 | 5 | 2 | 3 | 17 | 13 | 5 | 2 | 23 | 21 |  |
| &nbsp;&nbsp;Heating and cooling curves | 2 (0) | 40 | 21 | 4 | 1 | 3 | 2 | 2 | 6 | 1 | 4 | 17 | 9 | 8 | 2 | 15 | 20 |  |
| **7.1.3 Atoms, elements and compounds** | **4 (1)** | **71** | 34 | 6 | 4 | 6 | 6 | 4 | 7 | 4 | 9 | 32 | 20 | 9 | 1 | 29 | **36** | yes |
| &nbsp;&nbsp;Atomic structure | 1 (1) | 20 | 10 | 1 | 2 | 1 | 2 | 1 | 2 | 1 | 4 | 7 | 7 | 1 | 1 | 8 | 10 |  |
| &nbsp;&nbsp;Elements and compounds | 3 (0) | 51 | 24 | 5 | 2 | 5 | 4 | 3 | 5 | 3 | 5 | 25 | 13 | 8 | 0 | 21 | 26 |  |
| **7.1.4 Chemical bonding** | **4 (0)** | **80** | 44 | 8 | 2 | 4 | 5 | 4 | 9 | 4 | 8 | 30 | 24 | 14 | 4 | 37 | **40** | yes |
| &nbsp;&nbsp;Covalent bonding | 2 (0) | 40 | 23 | 4 | 1 | 2 | 2 | 2 | 4 | 2 | 5 | 14 | 12 | 7 | 2 | 20 | 20 |  |
| &nbsp;&nbsp;Ionic bonding | 1 (0) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 7 | 6 | 4 | 1 | 10 | 10 |  |
| &nbsp;&nbsp;Metallic bonding | 1 (0) | 20 | 11 | 2 | 0 | 1 | 2 | 1 | 2 | 1 | 1 | 9 | 6 | 3 | 1 | 7 | 10 |  |
| **7.1.5 The mole concept** | **5 (1)** | **102** | 23 | 6 | 41 | 4 | 5 | 5 | 18 | 0 | 7 | 32 | 36 | 22 | 5 | 18 | **50** | yes |
| &nbsp;&nbsp;Mole concept | 3 (1) | 61 | 15 | 3 | 27 | 0 | 3 | 3 | 10 | 0 | 4 | 22 | 19 | 13 | 3 | 10 | 30 |  |
| &nbsp;&nbsp;Percentage composition | 1 (0) | 21 | 4 | 1 | 6 | 4 | 1 | 1 | 4 | 0 | 1 | 5 | 9 | 5 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;Molar gas volume | 1 (0) | 20 | 4 | 2 | 8 | 0 | 1 | 1 | 4 | 0 | 2 | 5 | 8 | 4 | 1 | 4 | 10 |  |
| **7.1.6 Stoichiometry** | **4 (1)** | **83** | 25 | 8 | 18 | 3 | 7 | 3 | 18 | 1 | 7 | 27 | 27 | 18 | 4 | 19 | **40** | yes |
| &nbsp;&nbsp;Chemical equations | 3 (1) | 63 | 21 | 6 | 10 | 3 | 6 | 2 | 15 | 0 | 6 | 21 | 20 | 13 | 3 | 14 | 30 |  |
| &nbsp;&nbsp;Percentage yield and purity | 1 (0) | 20 | 4 | 2 | 8 | 0 | 1 | 1 | 3 | 1 | 1 | 6 | 7 | 5 | 1 | 5 | 10 |  |
| **7.1.7 Acids, bases and salts** | **5 (1)** | **105** | 59 | 9 | 5 | 7 | 5 | 4 | 11 | 5 | 11 | 40 | 31 | 23 | 0 | 15 | **52** | yes |
| &nbsp;&nbsp;Properties of acids and bases | 3 (1) | 63 | 34 | 5 | 3 | 5 | 3 | 2 | 8 | 3 | 7 | 25 | 17 | 14 | 0 | 10 | 32 |  |
| &nbsp;&nbsp;Preparation of salts | 2 (0) | 42 | 25 | 4 | 2 | 2 | 2 | 2 | 3 | 2 | 4 | 15 | 14 | 9 | 0 | 5 | 20 |  |
| **7.1.8 Electrochemistry** | **7 (1)** | **139** | 74 | 10 | 12 | 6 | 7 | 6 | 18 | 6 | 13 | 50 | 45 | 25 | 6 | 19 | **73** | yes |
| &nbsp;&nbsp;Redox reactions | 1 (0) | 21 | 11 | 1 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 9 | 5 | 4 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Cells and batteries | 1 (0) | 21 | 12 | 1 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 7 | 8 | 3 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Electrolysis of acidified water | 2 (1) | 34 | 17 | 3 | 3 | 2 | 2 | 1 | 5 | 1 | 3 | 14 | 9 | 7 | 1 | 5 | 19 |  |
| &nbsp;&nbsp;Redox equations | 1 (0) | 21 | 12 | 1 | 2 | 0 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Electrolytic purification of copper and aluminium | 2 (0) | 42 | 22 | 4 | 4 | 2 | 2 | 2 | 4 | 2 | 4 | 14 | 15 | 7 | 2 | 5 | 21 |  |
| **7.1.9 Chemical energetics** | **3 (1)** | **60** | 24 | 6 | 10 | 2 | 3 | 2 | 10 | 3 | 6 | 18 | 17 | 16 | 3 | 13 | **30** | yes |
| &nbsp;&nbsp;Endothermic and exothermic reactions | 1 (1) | 20 | 11 | 2 | 0 | 1 | 1 | 0 | 4 | 1 | 2 | 6 | 6 | 5 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;Energy profile diagrams | 1 (0) | 20 | 7 | 3 | 3 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 6 | 5 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;Enthalpy changes | 1 (0) | 20 | 6 | 1 | 7 | 0 | 1 | 1 | 3 | 1 | 2 | 6 | 5 | 6 | 1 | 4 | 10 |  |
| **7.1.10 Equilibria** | **7 (0)** | **145** | 78 | 10 | 9 | 6 | 7 | 7 | 21 | 7 | 12 | 40 | 57 | 29 | 7 | 21 | **74** | yes |
| &nbsp;&nbsp;Reversible reactions | 1 (0) | 21 | 13 | 1 | 0 | 1 | 1 | 1 | 3 | 1 | 2 | 7 | 7 | 4 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;Dynamic equilibrium | 1 (0) | 21 | 12 | 2 | 0 | 1 | 1 | 1 | 3 | 1 | 1 | 4 | 10 | 5 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Haber process | 1 (0) | 21 | 11 | 1 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Contact process | 1 (0) | 21 | 11 | 1 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Ostwald process | 1 (0) | 21 | 11 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;Production of fertilisers | 1 (0) | 20 | 9 | 2 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 3 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Industrial applications of reaction kinetics and equilibria | 1 (0) | 20 | 11 | 1 | 2 | 0 | 1 | 1 | 3 | 1 | 1 | 5 | 8 | 5 | 1 | 3 | 10 |  |
| **7.1.11 Reaction kinetics** | **2 (1)** | **41** | 23 | 2 | 4 | 1 | 2 | 2 | 5 | 2 | 4 | 12 | 15 | 9 | 1 | 5 | **20** | yes |
| &nbsp;&nbsp;Rates of reaction | 1 (0) | 20 | 11 | 1 | 3 | 0 | 1 | 1 | 2 | 1 | 2 | 6 | 7 | 5 | 0 | 2 | 9 |  |
| &nbsp;&nbsp;Factors affecting rates of reaction | 1 (1) | 21 | 12 | 1 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 11 |  |
| **7.2.0 INORGANIC CHEMISTRY** | **15 (2)** | **298** | 156 | 29 | 19 | 15 | 13 | 15 | 35 | 16 | 27 | 112 | 93 | 58 | 8 | 54 | **149** |  |
| **7.2.1 Periodic table** | **4 (1)** | **80** | 38 | 8 | 5 | 4 | 4 | 5 | 12 | 4 | 7 | 33 | 23 | 13 | 4 | 24 | **40** | yes |
| &nbsp;&nbsp;Periodic trends | 1 (1) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 4 | 7 | 5 | 3 | 1 | 11 | 10 |  |
| &nbsp;&nbsp;Group trends (Groups II and VII) | 2 (0) | 40 | 19 | 4 | 3 | 2 | 2 | 2 | 6 | 2 | 2 | 18 | 11 | 7 | 2 | 9 | 20 |  |
| &nbsp;&nbsp;Transition elements | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 2 | 3 | 1 | 1 | 8 | 7 | 3 | 1 | 4 | 10 |  |
| **7.2.2 Metals and non-metals** | **11 (1)** | **218** | 118 | 21 | 14 | 11 | 9 | 10 | 23 | 12 | 20 | 79 | 70 | 45 | 4 | 30 | **109** | yes |
| &nbsp;&nbsp;Properties of metals and non-metals | 1 (0) | 22 | 13 | 2 | 0 | 1 | 1 | 1 | 3 | 1 | 2 | 10 | 5 | 5 | 0 | 3 | 10 |  |
| &nbsp;&nbsp;Reactivity series | 1 (1) | 21 | 13 | 2 | 1 | 1 | 1 | 0 | 2 | 1 | 1 | 8 | 6 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;Lime in agriculture and construction | 1 (0) | 21 | 10 | 2 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 4 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;Composition of mineral ores | 1 (0) | 21 | 10 | 2 | 4 | 1 | 1 | 1 | 1 | 1 | 2 | 8 | 7 | 4 | 0 | 2 | 10 |  |
| &nbsp;&nbsp;Extraction of metals | 4 (0) | 85 | 50 | 8 | 4 | 5 | 3 | 4 | 6 | 5 | 8 | 31 | 28 | 18 | 0 | 9 | 40 |  |
| &nbsp;&nbsp;Processing of diamond and coal | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 4 | 1 | 2 | 6 | 7 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;Liquefaction and fractional distillation of air | 2 (0) | 28 | 13 | 3 | 2 | 1 | 1 | 2 | 4 | 2 | 3 | 10 | 9 | 5 | 1 | 5 | 18 |  |
| **7.3.0 ORGANIC CHEMISTRY** | **17 (1)** | **340** | 140 | 34 | 32 | 22 | 17 | 17 | 62 | 16 | 37 | 106 | 117 | 63 | 17 | 78 | **170** |  |
| **7.3.1 Fuels** | **4 (0)** | **80** | 33 | 8 | 9 | 4 | 4 | 4 | 14 | 4 | 8 | 26 | 27 | 15 | 4 | 18 | **40** | yes |
| &nbsp;&nbsp;Types of fuels | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 4 | 1 | 3 | 7 | 6 | 3 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;Production of fuels | 2 (0) | 40 | 17 | 4 | 3 | 2 | 2 | 2 | 8 | 2 | 4 | 13 | 14 | 7 | 2 | 10 | 20 |  |
| &nbsp;&nbsp;Fuel efficiency | 1 (0) | 20 | 7 | 2 | 5 | 1 | 1 | 1 | 2 | 1 | 1 | 6 | 7 | 5 | 1 | 3 | 10 |  |
| **7.3.2 Classification and nomenclature of organic compounds** | **3 (1)** | **60** | 26 | 6 | 4 | 6 | 3 | 3 | 10 | 2 | 7 | 20 | 20 | 10 | 3 | 12 | **30** | yes |
| &nbsp;&nbsp;Homologous series | 2 (1) | 40 | 18 | 4 | 2 | 4 | 2 | 2 | 7 | 1 | 6 | 13 | 13 | 6 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;Isomerism | 1 (0) | 20 | 8 | 2 | 2 | 2 | 1 | 1 | 3 | 1 | 1 | 7 | 7 | 4 | 1 | 4 | 10 |  |
| **7.3.3 Hydrocarbons** | **3 (0)** | **60** | 24 | 6 | 7 | 4 | 3 | 3 | 10 | 3 | 6 | 20 | 20 | 11 | 3 | 13 | **30** | yes |
| &nbsp;&nbsp;Alkanes and alkenes | 3 (0) | 60 | 24 | 6 | 7 | 4 | 3 | 3 | 10 | 3 | 6 | 20 | 20 | 11 | 3 | 13 | 30 |  |
| **7.3.4 Alcohols** | **2 (0)** | **40** | 15 | 4 | 4 | 3 | 2 | 2 | 8 | 2 | 5 | 12 | 13 | 8 | 2 | 10 | **20** | yes |
| &nbsp;&nbsp;Fermentation | 1 (0) | 20 | 7 | 2 | 2 | 2 | 1 | 1 | 4 | 1 | 3 | 5 | 7 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;Properties of ethanol | 1 (0) | 20 | 8 | 2 | 2 | 1 | 1 | 1 | 4 | 1 | 2 | 7 | 6 | 4 | 1 | 5 | 10 |  |
| **7.3.5 Carboxylic acids** | **2 (0)** | **40** | 16 | 4 | 4 | 2 | 2 | 2 | 8 | 2 | 4 | 10 | 16 | 8 | 2 | 10 | **20** | yes |
| &nbsp;&nbsp;Chemistry of carboxylic acids | 2 (0) | 40 | 16 | 4 | 4 | 2 | 2 | 2 | 8 | 2 | 4 | 10 | 16 | 8 | 2 | 10 | 20 |  |
| **7.3.6 Polymers** | **3 (0)** | **60** | 26 | 6 | 4 | 3 | 3 | 3 | 12 | 3 | 7 | 18 | 21 | 11 | 3 | 15 | **30** | yes |
| &nbsp;&nbsp;Synthetic polymers | 2 (0) | 40 | 18 | 4 | 2 | 2 | 2 | 2 | 8 | 2 | 5 | 12 | 14 | 7 | 2 | 10 | 20 |  |
| &nbsp;&nbsp;Natural polymers | 1 (0) | 20 | 8 | 2 | 2 | 1 | 1 | 1 | 4 | 1 | 2 | 6 | 7 | 4 | 1 | 5 | 10 |  |
| **7.4.0 ENVIRONMENTAL CHEMISTRY** | **9 (2)** | **183** | 96 | 18 | 10 | 8 | 9 | 9 | 24 | 9 | 18 | 56 | 66 | 37 | 6 | 30 | **90** |  |
| **7.4.1 Waste management** | **4 (0)** | **81** | 39 | 8 | 6 | 3 | 4 | 4 | 13 | 4 | 8 | 24 | 30 | 15 | 4 | 15 | **40** | yes |
| &nbsp;&nbsp;Classification of waste | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 4 | 1 | 2 | 8 | 5 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;Effects of waste on the environment | 2 (0) | 41 | 21 | 4 | 4 | 1 | 2 | 2 | 5 | 2 | 4 | 11 | 17 | 7 | 2 | 5 | 20 |  |
| &nbsp;&nbsp;Waste disposal methods | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 4 | 1 | 2 | 5 | 8 | 4 | 1 | 5 | 10 |  |
| **7.4.2 Pollution** | **1 (1)** | **21** | 11 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 5 | 9 | 4 | 1 | 3 | **11** | yes |
| &nbsp;&nbsp;Sources of pollutants | 1 (1) | 21 | 11 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 5 | 9 | 4 | 1 | 3 | 11 |  |
| **7.4.3 Water purification** | **3 (1)** | **61** | 36 | 6 | 3 | 3 | 3 | 3 | 4 | 3 | 6 | 21 | 20 | 14 | 0 | 7 | **29** | yes |
| &nbsp;&nbsp;Quality of water from different sources | 2 (1) | 42 | 25 | 4 | 2 | 2 | 2 | 2 | 3 | 2 | 4 | 15 | 14 | 9 | 0 | 5 | 20 |  |
| &nbsp;&nbsp;Purification of water | 1 (0) | 19 | 11 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 6 | 6 | 5 | 0 | 2 | 9 |  |
| **7.4.4 Herbs** | **1 (0)** | **20** | 10 | 2 | 0 | 1 | 1 | 1 | 4 | 1 | 2 | 6 | 7 | 4 | 1 | 5 | **10** | yes |
| &nbsp;&nbsp;Herbs in health and agriculture | 1 (0) | 20 | 10 | 2 | 0 | 1 | 1 | 1 | 4 | 1 | 2 | 6 | 7 | 4 | 1 | 5 | 10 |  |
| **All topics (distinct items)** | **97 (14)** | **1944** | 923 | 174 | 192 | 98 | 100 | 93 | 280 | 84 | 182 | 666 | 644 | 376 | 76 | 413 | **973** |  |


#### Cambridge IGCSE Chemistry (0620) — version 2026-2028

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 States of matter** | **3 (1)** | **60** | 33 | 5 | 2 | 4 | 3 | 3 | 7 | 3 | 5 | 26 | 16 | 10 | 3 | 34 | **31** | yes |
| &nbsp;&nbsp;1.1 Solids, liquids and gases | 2 (1) | 40 | 22 | 3 | 1 | 3 | 2 | 2 | 5 | 2 | 4 | 18 | 9 | 7 | 2 | 24 | 21 |  |
| &nbsp;&nbsp;1.2 Diffusion | 1 (0) | 20 | 11 | 2 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 8 | 7 | 3 | 1 | 10 | 10 |  |
| **2 Atoms, elements and compounds** | **8 (1)** | **160** | 80 | 15 | 11 | 10 | 11 | 8 | 17 | 8 | 17 | 62 | 50 | 25 | 6 | 70 | **80** | yes |
| &nbsp;&nbsp;2.1 Elements, compounds and mixtures | 1 (0) | 20 | 10 | 2 | 0 | 2 | 2 | 1 | 2 | 1 | 2 | 10 | 5 | 3 | 0 | 9 | 10 |  |
| &nbsp;&nbsp;2.2 Atomic structure and the Periodic Table | 2 (1) | 40 | 20 | 3 | 3 | 3 | 3 | 2 | 4 | 2 | 5 | 16 | 13 | 5 | 1 | 16 | 20 |  |
| &nbsp;&nbsp;2.3 Isotopes | 1 (0) | 20 | 6 | 2 | 6 | 1 | 1 | 1 | 2 | 1 | 2 | 6 | 8 | 3 | 1 | 8 | 10 |  |
| &nbsp;&nbsp;2.4 Ions and ionic bonds | 1 (0) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 2 | 7 | 6 | 4 | 1 | 10 | 10 |  |
| &nbsp;&nbsp;2.5 Simple molecules and covalent bonds | 1 (0) | 20 | 11 | 2 | 1 | 1 | 1 | 1 | 2 | 1 | 2 | 7 | 6 | 4 | 1 | 10 | 10 |  |
| &nbsp;&nbsp;2.6 Giant covalent structures | 1 (0) | 20 | 12 | 2 | 0 | 1 | 1 | 1 | 2 | 1 | 3 | 7 | 6 | 3 | 1 | 10 | 10 |  |
| &nbsp;&nbsp;2.7 Metallic bonding (Supplement) | 1 (0) | 20 | 11 | 2 | 0 | 1 | 2 | 1 | 2 | 1 | 1 | 9 | 6 | 3 | 1 | 7 | 10 |  |
| **3 Stoichiometry** | **10 (2)** | **205** | 52 | 16 | 68 | 7 | 13 | 9 | 39 | 1 | 14 | 64 | 72 | 44 | 11 | 41 | **100** | yes |
| &nbsp;&nbsp;3.1 Formulae | 2 (1) | 42 | 16 | 4 | 2 | 3 | 5 | 2 | 10 | 0 | 5 | 14 | 13 | 8 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;3.2 Relative masses of atoms and molecules | 1 (0) | 21 | 5 | 1 | 9 | 0 | 1 | 1 | 4 | 0 | 2 | 9 | 5 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;3.3 The mole and the Avogadro constant | 7 (1) | 142 | 31 | 11 | 57 | 4 | 7 | 6 | 25 | 1 | 7 | 41 | 54 | 32 | 8 | 29 | 70 |  |
| **4 Electrochemistry** | **4 (1)** | **83** | 42 | 6 | 8 | 4 | 4 | 4 | 11 | 4 | 7 | 28 | 27 | 17 | 4 | 11 | **43** | yes |
| &nbsp;&nbsp;4.1 Electrolysis | 3 (1) | 63 | 32 | 5 | 5 | 3 | 3 | 3 | 9 | 3 | 5 | 21 | 21 | 13 | 3 | 9 | 33 |  |
| &nbsp;&nbsp;4.2 Hydrogen–oxygen fuel cells | 1 (0) | 20 | 10 | 1 | 3 | 1 | 1 | 1 | 2 | 1 | 2 | 7 | 6 | 4 | 1 | 2 | 10 |  |
| **5 Chemical energetics** | **3 (1)** | **60** | 23 | 7 | 11 | 2 | 3 | 2 | 10 | 2 | 5 | 16 | 19 | 16 | 4 | 14 | **30** | yes |
| &nbsp;&nbsp;5.1 Exothermic and endothermic reactions | 3 (1) | 60 | 23 | 7 | 11 | 2 | 3 | 2 | 10 | 2 | 5 | 16 | 19 | 16 | 4 | 14 | 30 |  |
| **6 Chemical reactions** | **10 (1)** | **195** | 110 | 13 | 14 | 6 | 10 | 9 | 25 | 8 | 18 | 64 | 70 | 34 | 9 | 27 | **97** | yes |
| &nbsp;&nbsp;6.1 Physical and chemical changes | 1 (0) | 20 | 11 | 3 | 0 | 1 | 1 | 1 | 2 | 1 | 2 | 10 | 6 | 2 | 0 | 4 | 10 |  |
| &nbsp;&nbsp;6.2 Rate of reaction | 2 (1) | 42 | 23 | 2 | 4 | 1 | 2 | 2 | 6 | 2 | 4 | 12 | 15 | 9 | 2 | 6 | 21 |  |
| &nbsp;&nbsp;6.3 Reversible reactions and equilibrium | 5 (0) | 91 | 53 | 6 | 6 | 3 | 5 | 4 | 11 | 3 | 8 | 27 | 36 | 15 | 5 | 11 | 44 |  |
| &nbsp;&nbsp;6.4 Redox | 2 (0) | 42 | 23 | 2 | 4 | 1 | 2 | 2 | 6 | 2 | 4 | 15 | 13 | 8 | 2 | 6 | 22 |  |
| **7 Acids, bases and salts** | **7 (1)** | **144** | 76 | 13 | 11 | 8 | 7 | 6 | 16 | 7 | 15 | 54 | 41 | 33 | 1 | 21 | **71** | yes |
| &nbsp;&nbsp;7.1 The characteristic properties of acids and bases | 3 (1) | 62 | 33 | 5 | 2 | 5 | 3 | 3 | 8 | 3 | 7 | 24 | 16 | 15 | 0 | 10 | 32 |  |
| &nbsp;&nbsp;7.2 Oxides | 1 (0) | 21 | 13 | 2 | 1 | 1 | 1 | 0 | 2 | 1 | 2 | 7 | 7 | 5 | 0 | 3 | 10 |  |
| &nbsp;&nbsp;7.3 Preparation of salts | 3 (0) | 61 | 30 | 6 | 8 | 2 | 3 | 3 | 6 | 3 | 6 | 23 | 18 | 13 | 1 | 8 | 29 |  |
| **8 The Periodic Table** | **5 (1)** | **85** | 42 | 9 | 6 | 3 | 4 | 4 | 12 | 5 | 9 | 35 | 25 | 13 | 3 | 29 | **44** | yes |
| &nbsp;&nbsp;8.1 Arrangement of elements | 1 (1) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 4 | 7 | 5 | 3 | 1 | 11 | 10 |  |
| &nbsp;&nbsp;8.2 Group I properties | 1 (0) | 20 | 10 | 2 | 2 | 1 | 1 | 1 | 2 | 1 | 2 | 9 | 6 | 3 | 0 | 8 | 10 |  |
| &nbsp;&nbsp;8.3 Group VII properties | 1 (0) | 20 | 10 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 9 | 6 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;8.4 Transition elements | 1 (0) | 17 | 9 | 2 | 1 | 0 | 1 | 0 | 3 | 1 | 1 | 6 | 6 | 3 | 1 | 4 | 6 |  |
| &nbsp;&nbsp;8.5 Noble gases | 1 (0) | 8 | 3 | 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 4 | 2 | 1 | 0 | 2 | 8 |  |
| **9 Metals** | **7 (1)** | **134** | 81 | 12 | 7 | 4 | 7 | 5 | 12 | 6 | 13 | 47 | 43 | 28 | 3 | 15 | **62** | yes |
| &nbsp;&nbsp;9.1 Properties of metals | 1 (0) | 22 | 13 | 2 | 0 | 1 | 1 | 1 | 3 | 1 | 2 | 10 | 5 | 5 | 0 | 3 | 10 |  |
| &nbsp;&nbsp;9.2 Uses of metals | 1 (0) | 12 | 7 | 1 | 0 | 0 | 1 | 1 | 2 | 0 | 2 | 4 | 3 | 3 | 0 | 1 | 5 |  |
| &nbsp;&nbsp;9.3 Alloys and their properties | 1 (0) | 17 | 9 | 2 | 2 | 0 | 1 | 0 | 2 | 1 | 2 | 6 | 5 | 4 | 0 | 2 | 7 |  |
| &nbsp;&nbsp;9.4 Reactivity series | 1 (1) | 20 | 12 | 2 | 1 | 1 | 1 | 0 | 2 | 1 | 1 | 8 | 5 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;9.5 Corrosion of metals | 1 (0) | 21 | 15 | 1 | 1 | 0 | 1 | 1 | 1 | 1 | 2 | 5 | 9 | 4 | 1 | 2 | 10 |  |
| &nbsp;&nbsp;9.6 Extraction of metals | 2 (0) | 42 | 25 | 4 | 3 | 2 | 2 | 2 | 2 | 2 | 4 | 14 | 16 | 7 | 1 | 4 | 20 |  |
| **10 Chemistry of the environment** | **5 (2)** | **96** | 51 | 10 | 7 | 5 | 4 | 5 | 11 | 3 | 10 | 29 | 38 | 16 | 3 | 11 | **48** | yes |
| &nbsp;&nbsp;10.1 Water | 2 (1) | 34 | 21 | 4 | 2 | 2 | 1 | 2 | 2 | 0 | 4 | 13 | 13 | 4 | 0 | 2 | 16 |  |
| &nbsp;&nbsp;10.2 Fertilisers | 1 (0) | 20 | 9 | 2 | 2 | 1 | 1 | 1 | 3 | 1 | 2 | 6 | 8 | 3 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;10.3 Air quality and climate | 2 (1) | 42 | 21 | 4 | 3 | 2 | 2 | 2 | 6 | 2 | 4 | 10 | 17 | 9 | 2 | 6 | 21 |  |
| **11 Organic chemistry** | **13 (1)** | **218** | 96 | 21 | 18 | 14 | 11 | 10 | 39 | 9 | 28 | 71 | 72 | 35 | 12 | 48 | **110** | yes |
| &nbsp;&nbsp;11.1 Formulae, functional groups and terminology | 2 (1) | 32 | 14 | 3 | 2 | 3 | 2 | 1 | 5 | 2 | 4 | 12 | 9 | 5 | 2 | 7 | 17 |  |
| &nbsp;&nbsp;11.2 Naming organic compounds | 1 (0) | 16 | 7 | 2 | 0 | 2 | 1 | 1 | 3 | 0 | 3 | 6 | 4 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;11.3 Fuels | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 4 | 1 | 2 | 7 | 7 | 3 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;11.4 Alkanes | 1 (0) | 20 | 8 | 2 | 2 | 1 | 1 | 1 | 4 | 1 | 2 | 5 | 8 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;11.5 Alkenes | 2 (0) | 40 | 16 | 4 | 5 | 3 | 2 | 2 | 6 | 2 | 4 | 15 | 12 | 7 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;11.6 Alcohols | 2 (0) | 24 | 12 | 1 | 4 | 1 | 1 | 1 | 3 | 1 | 5 | 7 | 8 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;11.7 Carboxylic acids | 1 (0) | 18 | 7 | 2 | 2 | 1 | 1 | 1 | 4 | 0 | 2 | 4 | 8 | 3 | 1 | 4 | 9 |  |
| &nbsp;&nbsp;11.8 Polymers | 3 (0) | 48 | 23 | 5 | 2 | 2 | 2 | 2 | 10 | 2 | 6 | 15 | 16 | 8 | 3 | 12 | 24 |  |
| **12 Experimental techniques and chemical analysis** | **11 (1)** | **217** | 111 | 19 | 15 | 10 | 11 | 11 | 32 | 8 | 18 | 80 | 70 | 40 | 9 | 37 | **107** | yes |
| &nbsp;&nbsp;12.1 Experimental design | 3 (1) | 60 | 27 | 6 | 9 | 2 | 3 | 3 | 9 | 1 | 6 | 26 | 16 | 9 | 3 | 9 | 30 |  |
| &nbsp;&nbsp;12.2 Acid–base titrations | 1 (0) | 21 | 12 | 1 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 8 | 8 | 3 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;12.3 Chromatography | 1 (0) | 18 | 8 | 1 | 2 | 1 | 1 | 1 | 3 | 1 | 1 | 6 | 6 | 4 | 1 | 4 | 9 |  |
| &nbsp;&nbsp;12.4 Separation and purification | 3 (0) | 57 | 28 | 6 | 3 | 3 | 3 | 3 | 9 | 2 | 4 | 20 | 21 | 9 | 3 | 11 | 28 |  |
| &nbsp;&nbsp;12.5 Identification of ions and gases | 3 (0) | 61 | 36 | 5 | 0 | 3 | 3 | 3 | 8 | 3 | 6 | 20 | 19 | 15 | 1 | 10 | 30 |  |
| **All topics (distinct items)** | **86 (14)** | **1657** | 797 | 146 | 178 | 77 | 88 | 76 | 231 | 64 | 159 | 576 | 543 | 311 | 68 | 358 | **823** |  |

## Assessments

All tests are blueprints: each attempt draws fresh questions from the published bank, so the tests grow with it.
Files: `assessments/topic-tests/*.json` and `assessments/mocks/*.json`.

**Topic tests (35)** — one per topic per syllabus (23 ZIMSEC topics 7.1.1–7.4.4, 12 Cambridge topics including
Experimental techniques and chemical analysis):

- Section A: one-mark questions (difficulty 1–3: multiple choice, true/false, short answer, numerical), spread over
  every subtopic of the topic.
- Section B: one to three medium or exam-style questions (difficulty 2–5) whose mark values were chosen per topic from
  what the bank holds.
- 26 tests are 20 marks in 25 minutes (11–13 questions); 7 large topics (ZIMSEC Laboratory techniques and Metals and
  non-metals; Cambridge Atoms, elements and compounds, Stoichiometry, Chemical reactions, Organic chemistry and
  Experimental techniques) are 25 marks in 30 minutes (14–15 questions); the two single-concept ZIMSEC topics
  (7.4.2 Pollution, 7.4.4 Herbs) are 15 marks in 20 minutes.
- Cambridge descriptions say when a test includes Supplement content (Stoichiometry: "many of its questions").

**Mock exams (5)** — full-length papers labelled "Mock exam in the style of …", each stating that it is an original
practice paper, not an official paper:

| Mock | Time | Marks | Structure |
| --- | --- | --- | --- |
| ZIMSEC Paper 1 (multiple choice) | 1 h | 40 | 40 multiple-choice questions over all 23 topics (1–4 per topic, in proportion to the syllabus). |
| ZIMSEC Paper 2 (theory) | 2 h | 100 | Section A: 7 compulsory exam-style questions of 5–8 marks (bonding, mole concept, acids, electrochemistry, kinetics, metals, hydrocarbons; 40 marks). Section B: twelve 6-mark exam-style questions across the other topics and environmental chemistry, answer any ten (60 marks; the best ten count). |
| Cambridge Paper 2 (multiple choice, Extended) | 45 min | 40 | 40 multiple-choice questions of difficulty 2–5 from all 12 topics (2–5 per topic). |
| Cambridge Paper 4 (theory, Extended) | 1 h 15 min | 80 | 14 exam-style questions of 4–8 marks covering all 11 theory topics (two each from stoichiometry, chemical reactions and organic chemistry). |
| Cambridge Paper 6 (Alternative to Practical) | 1 h | 40 | 8 questions: an 8-mark rate-of-reaction experiment, a 6-mark identification of ions and gases, four exam-style planning, analysis and evaluation questions (6, 7, 5 and 4 marks) and two 2-mark calculations from data. |

Mocks shuffle answer options; topic tests show them in stored order (key positions were balanced, see below). The real
ZIMSEC Paper 2 has five 8-mark compulsory questions and a choice of four from five 15-mark questions; the mock keeps the
time, total marks and choice with the bank's shorter questions and says so in its instructions. Paper names, durations
and marks follow the Cambridge 0620 2026-2028 assessment overview and the assessment section of the ZIMSEC 2015-2022
syllabus as read (unverified, see gap 8). The validator confirms every rule of every blueprint can be filled for its
syllabus without overlapping rules.

## Review statistics

The content was written in five slices of about 21 concepts. Each slice was then reviewed **twice** by independent
"adversarial examiner" agents that solved every question from its stem (numerical answers recomputed with code),
checked every distractor, equation balance, explanation, marking spec and lesson fact, and fixed errors in place. (The
second pass happened because the workflow resumed after a crash and re-ran the reviews; it found a further 204
defects.)

| Slice | Items checked | Pass 1 errors fixed | Pass 2 errors fixed |
| --- | --- | --- | --- |
| 1 Matter, atoms, bonding, the Periodic Table, separation and chromatography | 638 | 59 | 20 |
| 2 Energetics, stoichiometry and the mole, titration, hydrated salts and practical skills | 657 | 14 | 23 |
| 3 Redox, electrochemistry, rates, equilibrium, industrial processes and the atmosphere | 680 | 30 | 22 |
| 4 Acids, bases and salts, qualitative analysis, metals and water | 679 | 57 | 43 |
| 5 Fuels, organic chemistry, polymers, waste and herbs | 620 | 97 | 96 |
| **Total** | **3,274** | **257** | **204** |

Typical fixes: wrong keys (Group VIII "same outer electrons"), unbalanced or wrongly "unbalanced" equations in options,
mhchem hyphens displaying bonds as charges (59 places), correct answers scored 0 ("2-8-6", "iron II sulfate", "CO2
gas", unit spellings such as "moldm-3"), tolerances that rejected correct roundings, keyword specs that credited wrong
answers ("green to orange"), two defensible answers, a "select all" item whose ⇌ arrows gave the answer away, practice
questions that copied a lesson's worked example, lesson facts (copper and dilute nitric acid, diffusion timescales,
pure water boiling at 100 °C regardless of pressure, Murowa's location) and missing Cambridge Supplement labels (over
130 mole-calculation items). One reviewer also found the key at option A in every MCQ of slice 4 and the key being the
longest option in 63 MCQs of slice 5, and fixed both in that slice.

In the assemble step the MCQ answer positions of the whole family were balanced (414 questions changed by
`.scratch/chem-assemble2/rebalance-mcq.cjs`, which also scans stems and explanations for letter references): single-
answer keys are now A 280, B 236, C 228, D 231.

## DEV preview (2026-10-08)

- **Import and publish:** both syllabus versions (91 and 61 topics) and every item were imported with 0 errors and
  published in DEV with `npm run content:publish -- --approver demo.admin@example.test --family chemistry-o` and the
  note "DEV PREVIEW ONLY … This is NOT a human review attestation (section 41)", making both chemistry subjects
  AVAILABLE in the DEV catalogue.
- **Answer-position rebalance:** after publishing, the 414 rebalanced questions were re-imported (414 conflicts:
  published revisions kept, draft copies created) and DEV-published as the next revision (414 published, 0 failed).
- **Smoke test** (`.scratch/chem-assemble2/smoke.ts`: a fresh full-access student per board, using the real enrolment,
  lesson, practice and exam services), last run after the rebalance: **37 of 37 checks passed** — catalogue status,
  pinned syllabus version, topic tree, every tagged lesson opening and rendering, practice drawing and marking model
  responses, every topic test listed, a topic test and every mock starting with its full blueprint and earning every
  automatically marked mark, multiple-choice mocks drawing only MCQs and theory/practical mocks none.

## Known gaps

1. **No diagrams.** The family has no images. Apparatus, particle diagrams, energy profiles, electrolysis cells and
   graphs are described in words or given as tables (e.g. "a dot-and-cross diagram shows one sulfur atom sharing …");
   no question refers to a picture that is not there. Images would most help apparatus and separation set-ups, chromatograms, particle
   and bonding diagrams, energy-level diagrams, electrolysis and electroplating cells, the blast furnace and
   aluminium cell, rate graphs, titration curves and displayed formulae of organic molecules.
2. **Self-marked written answers.** With AI marking switched off, 25 % of the bank's marks are marked by students
   against our mark-scheme points. Automatic marking covers multiple choice, numbers and keyed short answers.
3. **Length cue in MCQs (mostly fixed 2026-10-08).** In 286 single-answer MCQs and MCQ parts the key was at least
   1.3 times and 12 characters longer than every distractor, so a student could guess by length. All were edited in
   the JSON (tighter keys, distractors of comparable length; the reviewed rationales kept). A milder cue remains:
   the key is still the single longest option in 419 of 975 single-answer MCQs (43 %, against about 25 % by chance).
   The DEV database has the old wording until the family is re-imported and published.
4. **Mock question length.** The bank's exam-style questions are mostly 4–7 marks (only 21 are worth 8–10), so the
   theory mocks use more, shorter questions than the real papers (see Assessments).
5. **Thin topics** (fewer than 20 questions): Cambridge 8.5 Noble gases (8), 9.2 Uses of metals (12), 11.2 Naming
   organic compounds (16), 8.4 Transition elements and 9.3 Alloys (17 each), 11.7 Carboxylic acids and 12.3
   Chromatography (18); ZIMSEC Purification of water (19). Several are thin for Cambridge because some of the concept's
   items are ZIMSEC-only.
6. **No Core-route or practical-test mocks.** Blueprint rules cannot filter on Supplement content, so there is no
   Cambridge Core mock (Papers 1 and 3); Cambridge Paper 5 and ZIMSEC Paper 3 are practical examinations. The 31
   "select all" items can be drawn into the multiple-choice mocks (the instructions warn students).
7. **Rounding policy.** Numerical answers expect 3 significant figures by default and several reject a 2 s.f. answer
   when the data are 2 s.f. (e.g. `energetics.exo-endo` q18(b), `fuels.efficiency` q10, `stoichiometry.yield-purity`
   q12); some "correct answer" displays show the unrounded stored value. A family-wide decision is needed.
8. **ZIMSEC syllabus unverified.** The official 2015-2022 document was read from an unofficial copy; headings,
   objectives and the paper format must be checked against a clean copy. The subject code is unknown (null). Under the
   Heritage-Based Curriculum (2024-2030) November 2026 and later candidates may sit a new syllabus: add a new version
   file when it is obtained (docs/CONTENT_PIPELINE.md §13).
9. **Difficulty spread.** 496 of 2,114 questions (23 %) are difficulty 4–5, below the guide's 30 %.

## Needs a specialist teacher's check

**Syllabus alignment:**

- Whether ZIMSEC Forms 3–4 examine relative atomic mass from isotope abundances (those items are Cambridge-only) and
  the electrolytic extraction of aluminium (registry: "to confirm"); diamond and graphite tagged to ZIMSEC covalent
  bonding although the matrix does not name them.
- Supplement labelling: mole calculations in shared concepts (reacting masses, gas volumes, yield) are labelled; the
  registry still calls weak acids in `chem.organic.carboxylic-acids-and-esters` Cambridge Core (they are Supplement
  7.1.12).
- `matter.heating-curves` q17 (boiling point at altitude) goes slightly beyond both syllabi.

**Local and current facts** (hidden reviewer comments remain in the lessons for the approver): ZiG as "Zimbabwe Gold"
(April 2024); Redcliff/ZISCO cited as history; the Great Dyke about 550 km long with lithium at Bikita; ferrochrome,
lithium and PGM beneficiation policy; Sable Chemicals at Kwekwe; Lowveld ethanol; herb names and traditional uses in
the herbs lesson; the Shona and Ndebele grain names in `organic.making-ethanol` q15.

**Marking judgement calls left as they are:** Cr³⁺(aq) given as green; calorimetry items penalise "kJ" where kJ/mol
is expected while bond-energy items accept it; `stoichiometry.purity` q18 is keyword-marked; mean titres require 2
d.p.; three d5 MCQs (`tests-for-cations` q20, `reactivity-series` q20, `corrosion` q21) could be d4.

**Content:** the 319 `content:check` findings share standard data (Ar values, bond energies, the 24 dm³ molar volume,
boiling points); a few share lesson data deliberately (`metals.mineral-ores` q18 compares two minerals the lesson
works out; `choosing-conditions` q05–q07 and `cells-and-batteries` q08/q09 share one data table each). The full list
of review notes is `.scratch/chem-assemble2/review-unresolved.txt`.

## Maintenance

- The files in this directory are the source of truth. The writers' generator scripts (`.scratch/chem-slice*/`, on
  the owner's PC only) do not all include the review fixes and the assemble rebalance: **do not re-run them**.
- Topic tests and mocks were generated by `.scratch/chem-assemble2/build-assessments.mjs` (pool statistics:
  `stats.cjs`; mark values: `optimise.cjs`). Edit the JSON directly and run `npm run content:validate -- chemistry-o`,
  which re-proves every blueprint. A changed blueprint of a published test is imported as a draft copy.
- When adding MCQs, vary the key position (or run `.scratch/tools/rebalance-mcq.mjs`) and keep keys no longer than the
  distractors; set `examStyle` on exam-format items; label Supplement-only items "(Supplement)"; restrict
  board-specific depth with `applies`.
