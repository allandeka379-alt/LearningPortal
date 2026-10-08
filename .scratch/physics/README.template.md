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

{{COVERAGE}}

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

{{SMOKE}}

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
