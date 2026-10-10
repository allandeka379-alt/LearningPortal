# Mathematics (A-Level) — `mathematics-a`

Study content for four syllabi that share one concept registry (`content/concepts/mathematics-a.json`):

- **ZIMSEC A-Level Pure Mathematics** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/pure-mathematics/2015-2022.json`
- **ZIMSEC A-Level Statistics** (2015-2022) — `content/syllabi/zimsec/a-level/statistics/2015-2022.json`
- **ZIMSEC A-Level Mechanics** (the Ministry's "Mechanical Mathematics", 2015-2022) — `content/syllabi/zimsec/a-level/mechanics/2015-2022.json`
- **Cambridge International AS & A Level Mathematics 9709** (2026-2027; Pure 1, Pure 2/3, Mechanics, Statistics 1 and 2) —
  `content/syllabi/cambridge/a-level/mathematics/2026-2027.json`

Generators and the writers' brief: `.scratch/mathematics-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`,
`tables/*.mjs` worked-example checks, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared
tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09/10 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/mathematics-a/BRIEF.md`; every answer computed or asserted in code (derivatives checked numerically, integrals
> by Simpson's rule or differentiation, statistical tables and test outcomes computed by the kit). Checked by the
> validator (strict: 0 errors, 0 warnings), `content:check` (no findings), the length-cue checks (0 flagged; key is the
> unique longest option in 15% of MCQs) and the marking harness. **No independent AI review and no human review yet.**
> Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC Pure | ZIMSEC Statistics | ZIMSEC Mechanics | 9709 |
| --- | --- | --- | --- | --- | --- |
| Lessons (free preview) | 110 (15) | | | | |
| Questions | 2,262 | 1,154 | 616 | 413 | 1,550 |
| Flashcards | 944 | | | | |
| Topic tests | 43 | 7 | 7 | 5 | 24 |
| Mock exams | 12 | Papers 1-2 | Papers 1-2 | Papers 1-2 | Papers 1-6 |

Difficulty 1: 149, 2: 635, 3: 852, 4: 534, 5: 92. 18% of marks are self-marked (proofs and explanations).

## Assessments

`.scratch/mathematics-a/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes; small topics
are merged (for example 9709 quadratics + functions, ZIMSEC mechanics in four groups). The exam banks are thin, so mocks
may draw every exam item of a topic (`examSpread … full: true`): repeated attempts show more repeats.

- **9709**: P1 Pure 1 (110 min, 75: five 6-mark and five 9-mark questions); P2 Pure 2 (75 min, 50); P3 Pure 3 (110 min,
  75); P4 Mechanics, P5 Probability & Statistics 1 and P6 Probability & Statistics 2 (75 min, 50 each).
- **ZIMSEC Pure and Statistics**: P1 twelve compulsory 10-mark questions (180 min, 120); P2 five 8-mark questions and
  five 16-mark questions from seven (180 min, 120). The Pure paper structure is not printed in its syllabus: its mocks
  assume the Statistics pattern (owner to confirm).
- **ZIMSEC Mechanics**: P1 ten 7-mark and five 6-mark questions (180 min, 100); P2 five 20-mark questions from eight
  (180 min, 100).

The marks per question are our convention; real papers vary question by question.

## DEV preview

Imported in the DEV database on 2026-10-10 (110 lessons, 2,262 questions, 944 flashcards, 55 tests). Publishing and the
smoke test (`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts mathematics-a`): see `.scratch/mathematics-a/smoke.log`.

## Known gaps

1. ZIMSEC Pure Mathematics paper format, the "Mechanics" vs "Mechanical Mathematics" name and the ZIMSEC codes to confirm.
2. ZIMSEC coverage of the harmonic form, inverse-trigonometric derivatives and ∫1/(x²+a²) is marked "confirm": tagged
   per the concept descriptions (tan⁻¹ derivatives Cambridge only).
3. MCQs are 11–26% of each concept's questions (the brief aimed at about 30%); matrices operations has 2 of 19.

## Needs a specialist teacher's check

Exam-item part splits and mark allocations; which formulae the MF19 list prints (taken from the copy in `sources/`); a
trapezium-rule item asking why the error is largest near x = 2; data sets adjusted away from rounding boundaries; the
mechanics exam items' ZIMSEC topic wording.

## Maintenance

- Rebuild: `node .scratch/mathematics-a/build-content.mjs`. Syllabi: `node .scratch/mathematics-a/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts mathematics-a .scratch/mathematics-a/inventory.json`
  then `node .scratch/mathematics-a/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- mathematics-a --strict`, `npm run content:check -- mathematics-a`,
  `node .scratch/tools/length-cue.mjs mathematics-a`, `node .scratch/tools/longest-key.mjs mathematics-a`.
