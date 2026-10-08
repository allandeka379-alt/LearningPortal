# Physics (O-Level / IGCSE) — `physics-o`

Original study content for **ZIMSEC O-Level Physics (Forms 3–4 syllabus, 2015-2022)** and **Cambridge IGCSE Physics
(0625, syllabus 2026-2028)**, written once per concept and tagged to both syllabi through the concept registry
(`content/concepts/physics-o.json`). Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`.

> **Review status.** Every item was written by an AI author (the main Claude session, not a workflow) and checked
> automatically: the validator (rendering, marking every model and wrong response with the real marking engine,
> blueprint feasibility) and the self-check (no practice item reuses a lesson example's numbers). Unlike mathematics,
> biology and chemistry, **physics has not had a second, independent AI review pass**, and **no human has reviewed
> it yet**. On 2026-10-08 the family was imported into the DEV database and published there **for a local preview
> only** (`--approver demo.admin@example.test`, with a note on every approval that it is not a human attestation).
> Production publishing requires a human reviewer (§41): review at `/admin/review/topics`, then
> `npm run content:publish -- --approver <reviewer email>`.

## At a glance

| | Total | ZIMSEC O-Level | Cambridge 0625 |
| --- | --- | --- | --- |
| Concepts with content | 92 of 92 | 82 of 82 covered | 76 of 76 covered |
| Lessons (free preview) | 92 (15) | 82 (14) | 76 (13) |
| Questions | 1,186 | 974 | 955 |
| Flashcards | 641 | 541 | 507 |
| Topic tests | 21 | 12 | 9 |
| Mock and practice exams | 3 | whole-syllabus practice exam | Paper 2, Paper 4 |
| Images | 0 | | |

Questions by type: 609 multiple choice (20 of them "select all that apply", worth 2 marks, all or nothing), 96
true/false, 228 numerical or calculation, 41 short answer, 38 fill-in-the-blank, 66 matching and 108 structured
(multi-part). By difficulty (1 recall … 5 top-grade problem): 175 / 577 / 368 / 65 / 1. 105 questions are marked
exam-style (the theory mock and the long topic-test questions draw these) and 170 are daily-question eligible (free
tier). Written explanations are marked by the student against our mark-scheme points while AI marking is switched off:
70 questions contain such parts, worth 177 of the bank's 1,781 marks (10 %).

Board scope: 65 concepts are shared. 16 are ZIMSEC only (equations of motion, atmospheric pressure, simple machines,
the four structures topics, thermometers, specific latent heat, the four-stroke engine, fuels, primary and secondary
cells, thermionic emission, rectification, electronic components, logic gates) and 11 Cambridge only (communication
with electromagnetic waves, fission and fusion, background radiation and detection, radioactive decay, half-life and
the five space-physics concepts). Efficiency is shared: ZIMSEC tags it under 4.1 Simple machines. For board-specific
depth inside shared concepts, 231 questions carry `applies: ["zimsec"]` and 177 `applies: ["cambridge"]` (for example
apparent depth and mirages for ZIMSEC; n = 1/sin c, electric fields and deflection of radiation for Cambridge).

Lessons run to roughly 480–1,160 words of text (median about 710), each with key definitions, worked examples (every
quantitative lesson) or illustrative examples, common mistakes, exam tips and a summary. Zimbabwean context is used
where it is natural: Kariba and Hwange power stations, prepaid electricity meters, solar home systems and load-shedding,
granite kopjes and the Matobo Hills, borehole pumps, kombis, the 50 Hz mains, Victoria Falls rainbows.

Validation: `npm run content:validate -- physics-o --strict --no-cache` gives **0 errors and 0 warnings**, which
includes rendering every lesson, question and flashcard, marking every `modelResponse` (full marks) and every
`wrongResponse` (less) with the real marking engine, and proving every assessment blueprint can be filled from the bank
for its syllabus. `npm run content:check -- physics-o` reports **no findings**.

Sources: the questions and flashcards are generated from `.scratch/physics/slices/*.mjs` by
`node .scratch/physics/build-content.mjs` (the JSON files in `content/` are the source of truth for import); the
syllabus files and concept registry from `.scratch/physics/{concepts,cambridge,zimsec}.mjs` by
`node .scratch/physics/build-syllabi.mjs`; the assessments by `node .scratch/physics/build-assessments.mjs --write`.

## Coverage by syllabus topic

Columns: lessons (of which free preview), questions, questions by type (MCQ, true/false, numerical or calculation,
short answer, fill-in-the-blank, matching, structured, extended response), questions by difficulty d1–d5, exam-style
questions, flashcards, and whether the topic has a topic test. Each top-level topic also counts the items of its
subtopics.

#### ZIMSEC O-Level Physics — version 2015-2022

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two
topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Measurement and physical quantities** | **4 (1)** | **64** | 20 | 6 | 21 | 3 | 4 | 2 | 8 | 0 | 10 | 30 | 19 | 5 | 0 | 7 | **38** | yes |
| &nbsp;&nbsp;1.1 Measurements | 3 (1) | 48 | 14 | 4 | 17 | 2 | 3 | 2 | 6 | 0 | 7 | 23 | 15 | 3 | 0 | 5 | 29 |  |
| &nbsp;&nbsp;1.2 Scalars and vectors | 1 (0) | 16 | 6 | 2 | 4 | 1 | 1 | 0 | 2 | 0 | 3 | 7 | 4 | 2 | 0 | 2 | 9 |  |
| **2 Kinematics** | **5 (1)** | **76** | 21 | 6 | 28 | 4 | 2 | 4 | 11 | 0 | 8 | 30 | 27 | 11 | 0 | 9 | **44** | yes |
| &nbsp;&nbsp;2.1 Speed, velocity and acceleration | 3 (1) | 45 | 9 | 3 | 19 | 2 | 2 | 2 | 8 | 0 | 5 | 18 | 15 | 7 | 0 | 6 | 25 |  |
| &nbsp;&nbsp;2.2 Graphs of motion | 1 (0) | 16 | 6 | 1 | 5 | 1 | 0 | 1 | 2 | 0 | 2 | 6 | 5 | 3 | 0 | 2 | 10 |  |
| &nbsp;&nbsp;2.3 Motion under gravity | 1 (0) | 15 | 6 | 2 | 4 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 7 | 1 | 0 | 1 | 9 |  |
| **3 Forces** | **10 (1)** | **121** | 49 | 13 | 26 | 9 | 4 | 8 | 12 | 0 | 15 | 62 | 30 | 14 | 0 | 12 | **71** | yes |
| &nbsp;&nbsp;3.1 Effect of force on shape and size of materials | 1 (0) | 14 | 3 | 2 | 5 | 1 | 0 | 1 | 2 | 0 | 2 | 7 | 3 | 2 | 0 | 2 | 8 |  |
| &nbsp;&nbsp;3.2 Effect of force on motion | 3 (1) | 36 | 13 | 4 | 9 | 2 | 3 | 2 | 3 | 0 | 5 | 20 | 8 | 3 | 0 | 3 | 19 |  |
| &nbsp;&nbsp;3.3 Friction and circular motion | 2 (0) | 22 | 11 | 3 | 2 | 2 | 0 | 2 | 2 | 0 | 3 | 12 | 4 | 3 | 0 | 2 | 13 |  |
| &nbsp;&nbsp;3.4 Turning effect of a force | 1 (0) | 13 | 5 | 1 | 4 | 1 | 1 | 0 | 1 | 0 | 2 | 6 | 3 | 2 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;3.5 Centre of mass | 1 (0) | 11 | 6 | 1 | 0 | 1 | 0 | 1 | 2 | 0 | 1 | 5 | 4 | 1 | 0 | 2 | 7 |  |
| &nbsp;&nbsp;3.6 Pressure | 2 (0) | 25 | 11 | 2 | 6 | 2 | 0 | 2 | 2 | 0 | 2 | 12 | 8 | 3 | 0 | 2 | 16 |  |
| **4 Machines** | **2 (1)** | **24** | 8 | 2 | 8 | 2 | 0 | 1 | 3 | 0 | 3 | 12 | 6 | 3 | 0 | 3 | **13** | yes |
| &nbsp;&nbsp;4.1 Simple machines | 2 (1) | 24 | 8 | 2 | 8 | 2 | 0 | 1 | 3 | 0 | 3 | 12 | 6 | 3 | 0 | 3 | 13 |  |
| **5 Mechanical structures** | **4 (0)** | **43** | 28 | 4 | 0 | 3 | 0 | 4 | 4 | 0 | 6 | 25 | 10 | 2 | 0 | 4 | **28** | yes |
| &nbsp;&nbsp;5.1 Beams | 1 (0) | 11 | 7 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 3 | 1 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;5.2 Trusses | 1 (0) | 11 | 8 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 3 | 5 | 3 | 0 | 0 | 1 | 7 |  |
| &nbsp;&nbsp;5.3 Joining materials | 1 (0) | 10 | 6 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 7 | 2 | 0 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;5.4 Large structures | 1 (0) | 11 | 7 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 7 | 2 | 1 | 0 | 1 | 7 |  |
| **6 Work, energy and power** | **5 (1)** | **53** | 19 | 5 | 16 | 2 | 3 | 3 | 5 | 0 | 8 | 26 | 14 | 5 | 0 | 5 | **31** | yes |
| &nbsp;&nbsp;6.1 Work | 1 (0) | 11 | 3 | 1 | 4 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 3 | 1 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;6.2 Energy | 3 (1) | 31 | 13 | 3 | 7 | 1 | 2 | 2 | 3 | 0 | 5 | 16 | 7 | 3 | 0 | 3 | 19 |  |
| &nbsp;&nbsp;6.3 Power | 1 (0) | 11 | 3 | 1 | 5 | 0 | 1 | 0 | 1 | 0 | 2 | 4 | 4 | 1 | 0 | 1 | 6 |  |
| **7 Thermal physics** | **12 (1)** | **105** | 57 | 11 | 14 | 3 | 3 | 6 | 11 | 0 | 12 | 61 | 27 | 4 | 1 | 11 | **72** | yes |
| &nbsp;&nbsp;7.1 The kinetic theory of matter | 3 (1) | 30 | 15 | 3 | 6 | 1 | 1 | 2 | 2 | 0 | 4 | 17 | 8 | 1 | 0 | 2 | 21 |  |
| &nbsp;&nbsp;7.2 Thermal properties | 5 (0) | 45 | 23 | 4 | 8 | 1 | 1 | 2 | 6 | 0 | 5 | 23 | 13 | 3 | 1 | 6 | 31 |  |
| &nbsp;&nbsp;7.3 Heat transfer | 4 (0) | 30 | 19 | 4 | 0 | 1 | 1 | 2 | 3 | 0 | 3 | 21 | 6 | 0 | 0 | 3 | 20 |  |
| **8 Internal combustion engines** | **2 (0)** | **20** | 12 | 2 | 0 | 2 | 0 | 2 | 2 | 0 | 2 | 12 | 5 | 1 | 0 | 2 | **14** | yes |
| &nbsp;&nbsp;8.1 Four stroke engine | 1 (0) | 11 | 7 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 3 | 1 | 0 | 1 | 8 |  |
| &nbsp;&nbsp; Social and economic considerations of using fuels | 1 (0) | 9 | 5 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 2 | 0 | 0 | 1 | 6 |  |
| **9 Waves** | **5 (1)** | **58** | 24 | 5 | 17 | 2 | 3 | 2 | 5 | 0 | 14 | 30 | 13 | 1 | 0 | 5 | **31** | yes |
| &nbsp;&nbsp;9.1 Mechanical wave properties | 2 (1) | 22 | 7 | 2 | 8 | 1 | 1 | 1 | 2 | 0 | 5 | 11 | 6 | 0 | 0 | 2 | 12 |  |
| &nbsp;&nbsp;9.2 Sound | 2 (0) | 24 | 11 | 2 | 7 | 1 | 1 | 0 | 2 | 0 | 6 | 12 | 5 | 1 | 0 | 2 | 13 |  |
| &nbsp;&nbsp;9.3 Electromagnetic waves | 1 (0) | 12 | 6 | 1 | 2 | 0 | 1 | 1 | 1 | 0 | 3 | 7 | 2 | 0 | 0 | 1 | 6 |  |
| **10 Optics** | **5 (1)** | **63** | 33 | 5 | 11 | 1 | 5 | 4 | 4 | 0 | 9 | 38 | 15 | 1 | 0 | 4 | **32** | yes |
| &nbsp;&nbsp;10.1 Reflection of light | 1 (1) | 14 | 4 | 1 | 6 | 0 | 1 | 1 | 1 | 0 | 2 | 7 | 4 | 1 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;10.2 Refraction of light | 2 (0) | 25 | 14 | 2 | 4 | 1 | 2 | 1 | 1 | 0 | 3 | 16 | 6 | 0 | 0 | 1 | 13 |  |
| &nbsp;&nbsp;10.3 Lenses | 1 (0) | 14 | 9 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 2 | 9 | 3 | 0 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;10.4 Dispersion of light | 1 (0) | 10 | 6 | 1 | 0 | 0 | 1 | 1 | 1 | 0 | 2 | 6 | 2 | 0 | 0 | 1 | 5 |  |
| **11 Electricity** | **9 (1)** | **117** | 58 | 9 | 31 | 1 | 4 | 6 | 8 | 0 | 18 | 64 | 32 | 3 | 0 | 8 | **54** | yes |
| &nbsp;&nbsp;11.1 Electrostatics | 1 (1) | 12 | 9 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 7 | 4 | 0 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;11.2 Primary and secondary cells | 2 (0) | 25 | 13 | 2 | 7 | 0 | 0 | 2 | 1 | 0 | 4 | 16 | 5 | 0 | 0 | 1 | 11 |  |
| &nbsp;&nbsp;11.3 Current electricity | 4 (0) | 54 | 24 | 4 | 19 | 0 | 2 | 2 | 3 | 0 | 7 | 29 | 15 | 3 | 0 | 3 | 23 |  |
| &nbsp;&nbsp;11.4 Electric circuits | 2 (0) | 25 | 10 | 2 | 7 | 1 | 2 | 1 | 2 | 0 | 5 | 12 | 6 | 2 | 0 | 2 | 11 |  |
| &nbsp;&nbsp;11.5 Electricity in the home | 2 (0) | 27 | 12 | 2 | 9 | 0 | 0 | 2 | 2 | 0 | 4 | 15 | 8 | 0 | 0 | 2 | 14 |  |
| **12 Magnetism** | **2 (1)** | **26** | 19 | 2 | 0 | 1 | 0 | 2 | 2 | 0 | 5 | 13 | 8 | 0 | 0 | 2 | **14** | yes |
| &nbsp;&nbsp;12.1 Magnetic properties | 1 (1) | 14 | 11 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 3 | 7 | 4 | 0 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;12.2 Application of magnetism | 1 (0) | 12 | 8 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 2 | 6 | 4 | 0 | 0 | 1 | 6 |  |
| **13 Electromagnetism** | **6 (1)** | **71** | 47 | 6 | 6 | 3 | 2 | 2 | 5 | 0 | 12 | 33 | 26 | 0 | 0 | 5 | **36** | yes |
| &nbsp;&nbsp;13.1 Magnetic effect of an electric current | 1 (1) | 11 | 6 | 1 | 0 | 1 | 1 | 1 | 1 | 0 | 3 | 5 | 3 | 0 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;13.2 Force on a current-carrying conductor in a magnetic field | 3 (1) | 35 | 24 | 3 | 0 | 2 | 1 | 2 | 3 | 0 | 7 | 16 | 12 | 0 | 0 | 3 | 18 |  |
| &nbsp;&nbsp;13.3 Electromagnetic induction | 2 (0) | 23 | 16 | 2 | 2 | 1 | 1 | 0 | 1 | 0 | 3 | 12 | 8 | 0 | 0 | 1 | 11 |  |
| &nbsp;&nbsp;13.4 Transformers | 1 (0) | 13 | 7 | 1 | 4 | 0 | 0 | 0 | 1 | 0 | 2 | 5 | 6 | 0 | 0 | 1 | 7 |  |
| **14 Electronics** | **6 (1)** | **75** | 47 | 4 | 11 | 1 | 1 | 6 | 5 | 0 | 12 | 35 | 26 | 2 | 0 | 5 | **35** | yes |
| &nbsp;&nbsp;14.1 Thermionic emission | 1 (1) | 13 | 8 | 1 | 2 | 0 | 0 | 1 | 1 | 0 | 2 | 5 | 6 | 0 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;14.2 Diodes | 1 (0) | 12 | 6 | 1 | 2 | 1 | 0 | 1 | 1 | 0 | 2 | 6 | 3 | 1 | 0 | 1 | 6 |  |
| &nbsp;&nbsp;14.3 Rectification | 1 (0) | 13 | 8 | 1 | 2 | 0 | 0 | 1 | 1 | 0 | 2 | 6 | 5 | 0 | 0 | 1 | 4 |  |
| &nbsp;&nbsp;14.4 Electronic components | 2 (0) | 23 | 14 | 1 | 5 | 0 | 0 | 2 | 1 | 0 | 4 | 10 | 9 | 0 | 0 | 1 | 13 |  |
| &nbsp;&nbsp; Logic gates | 1 (0) | 14 | 11 | 0 | 0 | 0 | 1 | 1 | 1 | 0 | 2 | 8 | 3 | 1 | 0 | 1 | 6 |  |
| **15 Atomic and nuclear physics** | **4 (1)** | **43** | 27 | 4 | 4 | 1 | 1 | 3 | 3 | 0 | 13 | 20 | 10 | 0 | 0 | 3 | **20** | yes |
| &nbsp;&nbsp;15.1 Atomic model | 2 (1) | 18 | 8 | 2 | 4 | 1 | 1 | 1 | 1 | 0 | 7 | 9 | 2 | 0 | 0 | 1 | 9 |  |
| &nbsp;&nbsp;15.2 Radioactivity | 2 (0) | 25 | 19 | 2 | 0 | 0 | 0 | 2 | 2 | 0 | 6 | 11 | 8 | 0 | 0 | 2 | 11 |  |
| **Experimental skills** | **1 (1)** | **15** | 12 | 0 | 2 | 0 | 0 | 0 | 1 | 0 | 4 | 8 | 3 | 0 | 0 | 1 | **8** |  |
| **All topics (distinct items)** | **82 (14)** | **974** | 481 | 84 | 195 | 38 | 32 | 55 | 89 | 0 | 151 | 499 | 271 | 52 | 1 | 86 | **541** |  |

#### Cambridge IGCSE Physics (0625) — version 2026-2028

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two
topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Motion, forces and energy** | **23 (4)** | **304** | 110 | 29 | 87 | 17 | 13 | 13 | 35 | 0 | 39 | 139 | 90 | 36 | 0 | 33 | **179** |  |
| &nbsp;&nbsp;1.1 Physical quantities and measurement techniques | 3 (1) | 45 | 14 | 5 | 14 | 3 | 3 | 2 | 4 | 0 | 7 | 23 | 12 | 3 | 0 | 4 | 28 |  |
| &nbsp;&nbsp;1.2 Motion | 4 (1) | 62 | 20 | 5 | 20 | 4 | 2 | 3 | 8 | 0 | 7 | 26 | 21 | 8 | 0 | 7 | 36 |  |
| &nbsp;&nbsp;1.3 Mass and weight | 1 (1) | 15 | 5 | 2 | 4 | 1 | 1 | 1 | 1 | 0 | 3 | 7 | 4 | 1 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;1.4 Density | 1 (0) | 16 | 5 | 1 | 6 | 0 | 1 | 0 | 3 | 0 | 2 | 6 | 6 | 2 | 0 | 2 | 9 |  |
| &nbsp;&nbsp;1.5 Forces | 6 (0) | 74 | 33 | 8 | 14 | 4 | 2 | 3 | 10 | 0 | 9 | 34 | 20 | 11 | 0 | 10 | 44 |  |
| &nbsp;&nbsp;1.6 Momentum (Supplement) | 1 (0) | 13 | 4 | 1 | 6 | 0 | 1 | 0 | 1 | 0 | 1 | 5 | 4 | 3 | 0 | 1 | 8 |  |
| &nbsp;&nbsp;1.7 Energy, work and power | 6 (1) | 66 | 24 | 6 | 19 | 4 | 3 | 3 | 7 | 0 | 9 | 32 | 18 | 7 | 0 | 7 | 38 |  |
| &nbsp;&nbsp;1.8 Pressure | 1 (0) | 13 | 5 | 1 | 4 | 1 | 0 | 1 | 1 | 0 | 1 | 6 | 5 | 1 | 0 | 1 | 8 |  |
| **2 Thermal physics** | **10 (1)** | **89** | 53 | 9 | 9 | 1 | 3 | 6 | 8 | 0 | 10 | 48 | 28 | 3 | 0 | 8 | **61** | yes |
| &nbsp;&nbsp;2.1 Kinetic particle model of matter | 3 (1) | 27 | 15 | 3 | 5 | 0 | 1 | 2 | 1 | 0 | 4 | 15 | 8 | 0 | 0 | 1 | 17 |  |
| &nbsp;&nbsp;2.2 Thermal properties and temperature | 3 (0) | 27 | 15 | 2 | 4 | 0 | 1 | 2 | 3 | 0 | 3 | 13 | 9 | 2 | 0 | 3 | 19 |  |
| &nbsp;&nbsp;2.3 Transfer of thermal energy | 4 (0) | 35 | 23 | 4 | 0 | 1 | 1 | 2 | 4 | 0 | 3 | 20 | 11 | 1 | 0 | 4 | 25 |  |
| **3 Waves** | **11 (2)** | **143** | 69 | 13 | 28 | 4 | 8 | 10 | 11 | 0 | 27 | 79 | 35 | 2 | 0 | 11 | **73** | yes |
| &nbsp;&nbsp;3.1 General properties of waves | 2 (1) | 27 | 11 | 3 | 6 | 2 | 1 | 2 | 2 | 0 | 7 | 14 | 6 | 0 | 0 | 2 | 14 |  |
| &nbsp;&nbsp;3.2 Light | 5 (1) | 64 | 31 | 5 | 13 | 1 | 5 | 4 | 5 | 0 | 9 | 38 | 16 | 1 | 0 | 5 | 32 |  |
| &nbsp;&nbsp;3.3 Electromagnetic spectrum | 2 (0) | 25 | 14 | 3 | 2 | 0 | 1 | 3 | 2 | 0 | 5 | 13 | 7 | 0 | 0 | 2 | 14 |  |
| &nbsp;&nbsp;3.4 Sound | 2 (0) | 27 | 13 | 2 | 7 | 1 | 1 | 1 | 2 | 0 | 6 | 14 | 6 | 1 | 0 | 2 | 13 |  |
| **4 Electricity and magnetism** | **18 (3)** | **234** | 132 | 18 | 40 | 7 | 8 | 11 | 18 | 0 | 38 | 117 | 75 | 4 | 0 | 18 | **111** |  |
| &nbsp;&nbsp;4.1 Simple phenomena of magnetism | 2 (1) | 25 | 18 | 2 | 0 | 1 | 0 | 2 | 2 | 0 | 5 | 13 | 7 | 0 | 0 | 2 | 13 |  |
| &nbsp;&nbsp;4.2 Electrical quantities | 5 (1) | 67 | 30 | 5 | 19 | 1 | 3 | 4 | 5 | 0 | 10 | 37 | 20 | 0 | 0 | 5 | 29 |  |
| &nbsp;&nbsp;4.3 Electric circuits | 4 (0) | 54 | 26 | 4 | 12 | 2 | 3 | 3 | 4 | 0 | 9 | 26 | 16 | 3 | 0 | 4 | 25 |  |
| &nbsp;&nbsp;4.4 Electrical safety | 1 (0) | 12 | 9 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 2 | 6 | 4 | 0 | 0 | 1 | 7 |  |
| &nbsp;&nbsp;4.5 Electromagnetic effects | 6 (1) | 76 | 49 | 6 | 8 | 3 | 2 | 2 | 6 | 0 | 12 | 35 | 28 | 1 | 0 | 6 | 37 |  |
| **5 Nuclear physics** | **8 (1)** | **105** | 62 | 8 | 16 | 1 | 4 | 6 | 8 | 0 | 19 | 45 | 38 | 3 | 0 | 8 | **49** | yes |
| &nbsp;&nbsp;5.1 The nuclear model of the atom | 3 (1) | 39 | 22 | 3 | 6 | 1 | 1 | 3 | 3 | 0 | 9 | 17 | 13 | 0 | 0 | 3 | 18 |  |
| &nbsp;&nbsp;5.2 Radioactivity | 5 (0) | 66 | 40 | 5 | 10 | 0 | 3 | 3 | 5 | 0 | 10 | 28 | 25 | 3 | 0 | 5 | 31 |  |
| **6 Space physics** | **5 (1)** | **65** | 41 | 5 | 11 | 0 | 1 | 2 | 5 | 0 | 13 | 26 | 23 | 3 | 0 | 5 | **26** | yes |
| &nbsp;&nbsp;6.1 Earth and the Solar System | 2 (1) | 29 | 18 | 2 | 6 | 0 | 0 | 1 | 2 | 0 | 5 | 13 | 9 | 2 | 0 | 2 | 11 |  |
| &nbsp;&nbsp;6.2 Stars and the Universe | 3 (0) | 36 | 23 | 3 | 5 | 0 | 1 | 1 | 3 | 0 | 8 | 13 | 14 | 1 | 0 | 3 | 15 |  |
| **Experimental skills (Papers 5 and 6)** | **1 (1)** | **15** | 12 | 0 | 2 | 0 | 0 | 0 | 1 | 0 | 4 | 8 | 3 | 0 | 0 | 1 | **8** |  |
| **All topics (distinct items)** | **76 (13)** | **955** | 479 | 82 | 193 | 30 | 37 | 48 | 86 | 0 | 150 | 462 | 292 | 51 | 0 | 84 | **507** |  |

## Assessments

All assessments are blueprints: every attempt draws a fresh set of questions from the bank. The builder checks that
every rule has enough candidates after the earlier rules have taken theirs (the validator's "guaranteed" condition).

- **Topic tests (21):** 20 marks in 25 minutes. Section A has 10–13 one-mark questions (difficulty 1–3) spread over
  the subtopics; Section B has one medium question (2–4 marks, difficulty 2–4) and one exam-style structured question
  (4–6 marks, difficulty 3–5). Cambridge (9): measurement and motion; mass, weight, density, forces, momentum and
  pressure; energy, work and power; thermal physics; waves, light and sound; electrical quantities, circuits and
  safety; magnetism and electromagnetic effects; nuclear physics; space physics. ZIMSEC (12): measurement;
  kinematics; forces; structures; machines, energy and engines; thermal physics; waves and sound; optics;
  electricity; magnetism and electromagnetism; electronics; atomic and nuclear physics.
- **Cambridge Paper 2 mock:** 40 one-mark multiple-choice questions in 45 minutes, spread over the six topics
  (13 / 5 / 7 / 9 / 4 / 2). "Select all" questions are worth 2 marks, so they are never drawn.
- **Cambridge Paper 4 mock:** 17 exam-style structured questions, 80 marks, 75 minutes, spread over the six topics.
- **ZIMSEC practice exam:** 40 multiple-choice questions and 10 structured questions, 88 marks, 2 hours, over the
  whole syllabus. It is a `SUBJECT_TEST`, not a mock of a named paper, because our ZIMSEC syllabus file does not
  contain a confirmed assessment section.

## DEV import, preview publish and smoke test (2026-10-08)

- **Import:** the first run created both syllabus versions (65 ZIMSEC and 78 Cambridge topics) and 1,943 item rows
  (1,186 questions, 92 lessons, 641 flashcards, 24 test rows) with 0 errors; the second run reported every row
  unchanged. Two later edits (efficiency also tagged to ZIMSEC 4.1, and the practice exam's g value) went through the
  normal draft-copy path and were re-published as revision 2; the final import reports that the database matches.
- **Publish (DEV preview only):** `npm run content:publish -- --approver demo.admin@example.test --family physics-o`
  with the note "DEV PREVIEW ONLY … NOT a human review attestation (section 41)" published both syllabus versions as
  CURRENT and all 1,943 items (0 failed), and made both physics subjects AVAILABLE in the DEV catalogue.
- **Smoke test** (`.scratch/physics/smoke.ts`: a fresh full-access student per board, using the real enrolment,
  lesson, practice and exam services): 30 of 30 checks passed.
  - ZIMSEC 2015-2022: the enrolment pins 2015-2022; the topic tree shows the 16 top-level topics (65 nodes); all 82
    lessons tagged to ZIMSEC open unlocked and render; practice on 11.3 Current electricity and 10.2 Refraction drew
    10 new questions each and marked all 20 model responses correct; all 12 topic tests are listed; the Electricity
    topic test (15 questions, 20 marks, 25 minutes) and the practice exam (50 questions, 88 marks, 120 minutes)
    started with their full blueprint and, answered with the model responses and submitted, earned every
    automatically marked mark.
  - Cambridge 2026-2028: the enrolment pins 2026-2028; the topic tree shows the 7 top-level topics (78 nodes); all 76
    lessons render; practice on 3.2 Light and 5.2 Radioactivity marked 20 of 20 model responses correct; all 9 topic
    tests are listed; the Waves topic test (14 questions, 20 marks, 25 minutes), Paper 2 (40 multiple-choice
    questions, 45 minutes) and Paper 4 (17 structured questions, 80 marks, 75 minutes) started and earned every
    automatically marked mark. Paper 2 drew only multiple-choice questions and Paper 4 only structured questions; in
    the drawn Paper 4, 45 of the 80 marks were marked automatically and the rest are written answers that students
    mark themselves.

## Known gaps

- **No diagrams.** The family has 0 media files. Circuit symbols, ray diagrams, field patterns, wave diagrams and
  graphs are described in words and tables. A diagram pass (drawn SVG rendered to PNG, `media/media.json`) is
  planned, starting with circuit symbols and ray diagrams.
- **Too few hard questions.** Difficulty 4–5 make up only 6 % of the bank (66 questions), and most concepts have one
  exam-style structured question. Long-question pools are therefore thin: several topic tests and Paper 4 rules have
  only 1–3 candidates for their structured question, so repeat attempts often meet the same long question. A deepening
  pass (more exam-style, multi-step questions, aiming at 16–20 questions per concept) is planned.
- **No Cambridge Paper 6 (Alternative to Practical) mock and no Core-route mocks (Papers 1 and 3).** The experimental
  skills pool has 15 questions, and blueprint rules cannot filter on Core or Supplement tier.
- **Supplement content is not labelled in question stems.** Cambridge Core candidates may meet Supplement questions in
  practice and topic tests (the topic test descriptions say so). Lessons label Supplement sections in their headings.
- **Lessons are shorter than in the other families** (median about 710 words against about 1,200 in biology), though
  each covers its syllabus statements with definitions, worked examples, mistakes and tips.

- **Answer positions fixed, length cue remains (2026-10-08).** The key was almost always option A, and the player shows
  options in stored order. `.scratch/physics/build-content.mjs` now balances key positions before writing (469 keys
  moved; four-option keys A 167, B 169, C 169, D 168), and text fill-in blanks ignore punctuation (7 files changed).
  The DEV database has the old order until the family is re-imported and published. Still open: in 243 of the 589
  single-answer MCQs the key is at least 1.3 times and 12 characters longer than every distractor, so a student can
  often guess by length; many rationales are only "Correct." Both need an editing pass of the slices.

## Needs a specialist teacher's check

- **ZIMSEC syllabus alignment.** The ZIMSEC tree was transcribed from the official 2015-2022 syllabus (competency
  matrix to 14.4); topic 15 (atomic and nuclear physics) and the logic-gates objective come from the scope-and-sequence
  chart only, and the assessment section was not readable. In particular, half-life, decay equations and the detection
  of radiation are tagged to Cambridge only because our ZIMSEC tree does not list them; ZIMSEC candidates may need
  them. Confirm against a clean copy of the syllabus, and check which syllabus is examined from November 2026
  (Heritage-Based Curriculum).
- **Conventions to agree:** the bank uses g = 9.8 N/kg, stated in the stem wherever it is needed (ZIMSEC papers have
  often used g = 10 N/kg: confirm which to use for ZIMSEC items); mains described as 220–240 V, 50 Hz (worked
  examples use 230 V); circuit symbol descriptions follow the IEC/Cambridge forms.
- **Local and current facts to confirm:** prepaid metering wording; the Radiation Protection Authority of
  Zimbabwe licensing statement; Koeberg as an example nuclear power station; Kariba (hydro) and Hwange (coal)
  generation; radiocarbon dating at Great Zimbabwe; granite and background radiation; the planetary data table (NASA
  fact-sheet values).
- **Marking judgement calls:** numerical tolerances accept answers correct to 2 or 3 significant figures; a few
  short-answer items accept synonyms (for example "fibrescope" for endoscope); "select all" questions are all or
  nothing.
