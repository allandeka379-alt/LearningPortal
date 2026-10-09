# Additional Mathematics (O-Level / IGCSE) — `additional-mathematics-o`

Study content for two syllabi that share one concept registry (`content/concepts/additional-mathematics-o.json`):

- **ZIMSEC O-Level Additional Mathematics** (2015-2022) — `content/syllabi/zimsec/o-level/additional-mathematics/2015-2022.json`
  (Pure Mathematics, Probability and Statistics, Mechanics)
- **Cambridge IGCSE Additional Mathematics 0606** (2025-2027) — `content/syllabi/cambridge/igcse/additional-mathematics/2025-2027.json`

Generators and the writers' brief: `.scratch/additional-mathematics/` (`build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
worked-example checks, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in
`.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/additional-mathematics/BRIEF.md`; every answer was computed or asserted in code (counting answers and
> inequality solution sets also brute-forced). Checked by the validator (strict: 0 errors, 0 warnings), `content:check`
> (no findings), the length-cue checks (0 flagged; key is the unique longest option in 14% of MCQs) and the marking
> harness. **No independent AI review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0606 |
| --- | --- | --- | --- |
| Lessons (free preview) | 89 (11) | | |
| Questions | 1,767 | 1,360 | 1,084 |
| Flashcards | 766 | | |
| Topic tests | 31 | 18 | 13 |
| Mock exams | 4 | Paper 1, Paper 2 | Paper 1, Paper 2 |

Difficulty 1: 150, 2: 528, 3: 589, 4: 412, 5: 88. 281 exam-style items, 180 daily-question candidates. 15% of marks are
self-marked (proofs and explanations).

## Assessments

`.scratch/additional-mathematics/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes;
small topics are merged (ZIMSEC coordinate geometry + functions + quadratics; normal distribution + sampling +
estimation; 0606 equations + simultaneous equations).

- **ZIMSEC Paper 1** (Pure, 150 min, 100): four compulsory 13-mark questions and four 12-mark questions from six.
- **ZIMSEC Paper 2** (Mechanics and Statistics, 150 min, 100): two mechanics and two statistics 10-mark questions,
  then five 12-mark questions from fourteen (seven mechanics, seven statistics).
- **0606 Paper 1** (120 min, 80, no calculator): ten 8-mark questions. **Paper 2** (120 min, 80): eight 10-mark questions.

The marks per question are our convention; real papers vary question by question.

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`):
89 lessons, 1,767 questions, 766 flashcards and 35 tests; 2,657 items published, 0 failed; both subjects became
AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts additional-mathematics-o`:
**88/88 checks passed**.

## Known gaps

1. ZIMSEC paper structure (four 13-mark Section A questions; Paper 2 sections) is our reading of the syllabus; to confirm.
2. ZIMSEC calculator rules are not stated; items assume a calculator unless exact working is the point.
3. Volumes of revolution exclude rotation about the y-axis (concept registry note, to confirm against ZIMSEC).
4. ZIMSEC code and the Heritage-Based Curriculum version to confirm.

## Needs a specialist teacher's check

Exam-item part splits and mark allocations; the `$^{n}P_{r}$` notation as rendered; the tow-bar (rigid connection)
question in Newton's laws; normal-table answers (both four-figure table and calculator values accepted); estimate
questions that deliberately mark the calculator value wrong because they ask for the series value; one 0606 Paper 2
integral (x cos x) that relies on reversing the product rule.

## Maintenance

- Rebuild: `node .scratch/additional-mathematics/build-content.mjs`. Syllabi: `node .scratch/additional-mathematics/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts additional-mathematics-o .scratch/additional-mathematics/inventory.json`
  then `node .scratch/additional-mathematics/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- additional-mathematics-o --strict`, `npm run content:check -- additional-mathematics-o`,
  `node .scratch/tools/length-cue.mjs additional-mathematics-o`, `node .scratch/tools/longest-key.mjs additional-mathematics-o`.
  Smoke: `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts additional-mathematics-o`.
