# Agriculture (O-Level / IGCSE) — `agriculture-o`

Study content for two syllabi that share one concept registry (`content/concepts/agriculture-o.json`, 102 `agri.*`
concepts):

- **ZIMSEC O-Level Agriculture** (Forms 1–4, 2015-2022) — `content/syllabi/zimsec/o-level/agriculture/2015-2022.json`
- **Cambridge IGCSE Agriculture 0600** (2027-2028) — `content/syllabi/cambridge/igcse/agriculture/2027-2028.json`

Generators and the writers' brief: `.scratch/agriculture/` (`build-syllabi.mjs`, `lib.mjs` with checked fertiliser,
plant-population, seed-rate, Pearson-square, feed-conversion, gross-margin, stocking-rate, fencing, dilution,
sprayer and genetic-cross helpers, `tables/*.mjs`, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`,
`BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by eight AI writer agents (Claude Opus, medium effort); every figure was
> computed in code and prices, doses and rates are labelled as assumed. Checked by the validator (strict: 0 errors, 0
> warnings), `content:check` (one advisory reuse finding), the length-cue checks (0 flagged; key is the unique longest
> option in 15% of MCQs) and the marking harness. **No independent AI review and no human review yet.** Production
> publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0600 |
| --- | --- | --- | --- |
| Concepts covered | 102 | 94 | 74 |
| Lessons (free preview) | 102 (9) | | |
| Questions | 2,052 | 1,870 | 1,469 |
| Flashcards | 902 | | |
| Topic tests | 15 | 6 | 9 |
| Mock exams | 3 | Paper 1, Paper 2 | Paper 1 |

Difficulty 1: 223, 2: 809, 3: 548, 4: 382, 5: 90. 281 exam-style items, 229 daily-question candidates. 47% of marks
are self-marked. Free-preview lessons: natural regions, modern production, soil types, fencing, photosynthesis,
cotton and tobacco, livestock digestion, grazing management, budgets.

## Assessments

`.scratch/agriculture/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes.

- **ZIMSEC Paper 1** (60 min, 40): 40 MCQs. **Paper 2** (120 min, 100): six compulsory 10-mark questions (Section A)
  and one crop-production and one animal-husbandry 20-mark question chosen from three each (Section B).
- **0600 Paper 1** (105 min, 100): seven 10-mark questions (Section A) and two 15-mark questions from five
  (Section B). Coursework (ZIMSEC Paper 3, Cambridge Component 2) is not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`): 2 syllabus versions (46 and 41 topics), 102 lessons, 2,052 questions, 902 flashcards and 18 tests; 3,074 items published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts agriculture-o`: **54/54 checks passed**.

## Known gaps

1. **Source defects**: in the ZIMSEC copy the crop-husbandry scope page repeats the soil-and-water page and the Form 4
   crop-production entry is missing, so ZIMSEC names no cash crops: tobacco and cotton are covered for Cambridge only.
2. **Mark splits** in all exam items are our convention (the syllabi give only paper totals).
3. **Difficulty** in livestock concepts leans easy (difficulty 4-5 about 19%).
4. **ZIMSEC code** not printed; Heritage-Based Curriculum version to confirm.

## Needs a specialist teacher's check

Protected species list (Parks and Wild Life Act); natural-region rainfall bands; A2 99-year leases and the 1992 Land
Acquisition Act; CAMPFIRE dates; National Tree Planting Day; Pfumvudza spacing and plot figures (AGRITEX); Water Act,
ZINWA and EMA roles; contour-ridge standards; ox-plough adjustments; tobacco curing temperatures; cotton stalk
destruction and closed season; pesticide classes; Nkone, Mashona goat and Sabi sheep descriptions; butterfat figures;
dipping frequency; tick life cycles; notifiable diseases; GMB and TIMB roles. Values in questions are labelled as
assumed where they are not established facts.

## Maintenance

- Rebuild: `node .scratch/agriculture/build-content.mjs`. Syllabi: `node .scratch/agriculture/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts agriculture-o .scratch/agriculture/inventory.json`
  then `node .scratch/agriculture/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- agriculture-o --strict`, `npm run content:check -- agriculture-o`,
  `node .scratch/tools/length-cue.mjs agriculture-o`, `node .scratch/tools/longest-key.mjs agriculture-o`. Smoke:
  `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts agriculture-o`.
