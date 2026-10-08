# Economics (O-Level / IGCSE) — `economics-o`

Study content for two syllabi that share one concept registry (`content/concepts/economics-o.json`, 92 `econ.*`
concepts):

- **ZIMSEC O-Level Economics** (Forms 1–4 syllabus, 2015-2022) — `content/syllabi/zimsec/o-level/economics/2015-2022.json`
- **Cambridge IGCSE Economics 0455** (2027-2029) — `content/syllabi/cambridge/igcse/economics/2027-2029.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief:
`.scratch/economics/` (`build-syllabi.mjs`, `lib.mjs` with checked schedule, cost, index and trade helpers,
`tables/*.mjs`, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in
`.scratch/tools/`.

> **Review status.** Written on 2026-10-08/09 by eight AI writer agents (Claude Opus, medium effort) working to
> `.scratch/economics/BRIEF.md`; every figure was computed in code. Checked by the validator (strict: 0 errors, 0
> warnings), `content:check` (no findings), the length-cue check (0 flagged) and the marking harness. **No independent
> AI review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0455 |
| --- | --- | --- | --- |
| Concepts covered | 92 | 82 | 70 |
| Lessons (free preview) | 92 (8) | | |
| Questions | 1,741 | 1,523 | 1,236 |
| Flashcards | 808 | | |
| Topic tests | 14 | 8 | 6 |
| Mock exams | 5 | Papers 1, 2 and 3 | Papers 1 and 2 |
| Images | 0 | | |

Questions by type: MCQ 692, structured 236, true/false 190, short answer 163, numerical 152, calculation 124,
matching 93, fill-in-the-blank 90, extended response 1. Difficulty 1: 225, 2: 623, 3: 463, 4: 365, 5: 65. 237 are
exam-style; 206 may be daily questions. 49% of marks are self-marked (explain, analyse and discuss parts). Diagrams
(demand and supply, PPC, cost curves) are described precisely in words and tables of values: there are no images.

Free-preview lessons: opportunity cost, the law of demand, money, business organisations, measuring national income,
inflation, population growth and distribution, comparative advantage.

## Assessments

Built by `.scratch/economics/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes;
ZIMSEC's 18 topics are grouped into eight tests.

- **ZIMSEC Paper 1** (75 min, 40 marks): 40 MCQs over every topic.
- **ZIMSEC Paper 2** (75 min, 40 marks): two compulsory 20-mark data-response questions, drawn only from the Paper 2
  topics.
- **ZIMSEC Paper 3** (75 min as in the syllabus table, 40 marks): ten 10-mark essays (4 + 6), answer four.
- **0455 Paper 1** (60 min, 40 marks): 40 MCQs.
- **0455 Paper 2** (120 min, 80 marks): one compulsory 20-mark question on unseen information (Section A) and four
  20-mark questions in Section B, answer three (parts 2/4/6/8: our convention).

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`): 2 syllabus versions (102 and 92 topics), 92 lessons, 1,741 questions, 808 flashcards and 19 tests; 2,660 items published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts economics-o`: **56/56 checks passed**.

## Known gaps

1. **No diagrams as images**: diagram skills are taught and tested through verbal descriptions and tables.
2. **Length cue (milder form)**: the key is the single longest option in 45% of single-answer MCQs (chance: 25%).
3. **Difficulty**: 4-5 items are about 25% of the bank, a little below the brief's 30%.
4. **ZIMSEC paper details**: Paper 3 is printed as 1 h 15 min in the assessment table and 2 hours in the text; marks per
   essay are not stated (10 assumed); topic 6.18 (market failure) has no content pages and was built from glossary
   terms; the ZIMSEC code (commonly 4048) is not printed.
5. **Cambridge 2027-2029 only**; the Section B part marks are our convention (no 2027 specimen paper was available).

## Needs a specialist teacher's check

Zimbabwe facts used without statistics: the 2008 hyperinflation, the 2009 move to foreign currencies, the 2019 return
of a local currency, ZiG (April 2024), land reform from 2000, Cyclone Idai (2019) and Pfumvudza/Intwasa. Check the
ZIMSEC tree against a clean copy of the document (the column layout was scrambled in the copy read).

## Maintenance

- Rebuild questions and flashcards: `node .scratch/economics/build-content.mjs` (deterministic). Syllabi and
  registry: `node .scratch/economics/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts economics-o .scratch/economics/inventory.json`
  then `node .scratch/economics/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- economics-o --strict`, `npm run content:check -- economics-o`,
  `node .scratch/tools/length-cue.mjs economics-o`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts economics-o`.
